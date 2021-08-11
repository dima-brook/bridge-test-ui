import { elrondHelperFactory, polkadotPalletHelperFactory, web3HelperFactory, txnSocketHelper } from 'testsuite-ts';
import { ChainConfig } from './Config';
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { chains, CHAIN_INFO } from './consts';
import { Base64 } from 'js-base64';
import { abi } from './assets/Minter.json'
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

/*const nft_info_encoded_t = new StructType('EncodedNft', [
    new StructFieldDefinition('token', '', new TokenIdentifierType()),
    new StructFieldDefinition('nonce', '', new U64Type())
]);*/

const fromHexString = hexString =>
  new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

const decoder = new TextDecoder();

export const txnSocket = txnSocketHelper(ChainConfig.validator_txn_socket, {
    path: "/txsocket/socket.io"
});

export const ChainHandlers = {
    _polka: undefined,
    _polkaExtInit: undefined,
    _elrd: undefined,
    _web3: undefined,
    _w3ExtInit: undefined,
    _web3Chain: undefined,
    _web3Provider: undefined,
    async _requirePolkadotExt() {
        if (!this._polkaExtInit) {
            await web3Enable('XPNET Cross Chain Bridge');
            this._polkaExtInit = true;
        }
    },
    async _requirePolka() {
        if (this._polka === undefined) {
            this._polka = await polkadotPalletHelperFactory(
                ChainConfig.xpnode,
                //ChainConfig.xp_freezer,
                //ChainConfig.xp_freezer
            );
        }
    },
    async polka() {
        await this._requirePolka();

        return this._polka;
    },
    async polkadotAccounts() {
        await this._requirePolkadotExt();

        return (await web3Accounts())
            .map((v) => v.address)
    },
    async polkadotSigner(address) {
        await this._requirePolkadotExt();

        const injector = await web3FromAddress(address);

        return { sender: address, options: { signer: injector.signer } };
    },
    async _requireElrd() {
        if (this._elrd === undefined) {
            this._elrd = await elrondHelperFactory(
                ChainConfig.elrond_node,
                ChainConfig.elrond_minter,
                ChainConfig.elrond_event_rest,
                ChainConfig.elrond_esdt,
                ChainConfig.elrond_esdt_nft
            );
        }
    },
    async elrd() {
        await this._requireElrd();

        return this._elrd;
    },
    _w3eventsSetup() {
        const nullIt = () => this._web3 = undefined;
        this._web3Provider.provider.on('chainChanged', nullIt);
    },
    async _metaChangeChain() {
        const info = CHAIN_INFO[this._web3Chain];
        const chainId = `0x${info.chainId.toString(16)}`;
        try {
            await this._web3Provider.provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId }]
            });
        } catch (err) {
            if (err.code === 4902) {
                await this._web3Provider.provider.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId,
                        chainName: this._web3Chain,
                        nativeCurrency: {
                            name: info.native,
                            symbol: info.native
                        },
                        rpcUrls: [info.rpcUrl]
                    }]
                });
            }
        }
    },
    async _requireWeb3() {
        if (!this._web3) {
            const base = await detectEthereumProvider();
            if (!base) {
                throw Error("Metamask not installed!");
            }
            this._web3Provider = new ethers.providers.Web3Provider(base);
            const { chainId } = await this._web3Provider.getNetwork();
            if (chainId !== CHAIN_INFO[this._web3Chain].chainId) {
                await this._metaChangeChain();
            }

            this._web3 = await web3HelperFactory(
                this._web3Provider,
                ChainConfig.web3_minters[this._web3Chain],
                abi
            );
            this._w3eventsSetup();
        }
    },
    setWeb3Chain(chain) {
        this._web3 = undefined;
        this._web3Chain = chain;
    },
    async web3() {
        await this._requireWeb3();

        return this._web3;
    },
    async w3Accounts() {
        await this._requireWeb3();
        if (!this._w3ExtInit) {
          await this._web3Provider.provider.request({ method: 'eth_requestAccounts' });
        }
        return await this._web3Provider.listAccounts();
    },
    async w3Signer(address) {
        await this._requireWeb3();
        return this._web3Provider.getSigner(address);
    },
    async checkWrappedOnPolkadot(_owner, ident) {
        return ident === ChainConfig.elrond_esdt_nft;
    },
    _tryDecodeWrappedOnElrond(nftDat /* Buffer */) {
        /// TokenLen(4 by), TokenIdent(TokenLen by), Nonce(8 by)
        /// BinaryCodec is broken for browsers. Decode manually :|
        if (nftDat.length < 12) {
            return undefined;
        }

        const tokenLen = (new Uint32Array(nftDat.slice(0, 4).reverse()))[0];
        if (nftDat.length !== 12 + tokenLen) {
            return undefined;
        }
        const token = decoder.decode(nftDat.slice(4, 4+tokenLen));
        // TODO: Consider LO
        // tfw js can't convert be bytes to u64
        const nonce = (new Uint32Array(nftDat.slice(4+tokenLen, 12 + tokenLen).reverse()))[0].toString(16);

        return { token, nonce };
    },
    async checkWrappedOnElrond(owner, ident) {
        await this._requireElrd();
        await this._requirePolka();

        const nfts = await this._polka.listNft(owner);
        const nftDat = fromHexString(nfts.get(ident).replace('0x', ''));

        const res = this._tryDecodeWrappedOnElrond(nftDat);
        if (res === undefined) {
            return false;
        }
        const { token, nonce } = res;

        const lockedNfts = await this._elrd.listNft(ChainConfig.elrond_minter);
        return lockedNfts.has(`${token}-0${nonce}`);
    },
    async tryFetchNftAsImg(owner, chain, ident, nft_dat) {
        let url;
        switch (chain) {
            case chains[0]: {
                const dat = fromHexString(nft_dat.replace('0x', ''));
                const res = this._tryDecodeWrappedOnElrond(dat);
                if (res === undefined) {
                    url = decoder.decode(dat);
                } else {
                    await this._requireElrd();
                    const nft_inf = await this._elrd.getLockedNft(res);
                    url = window.atob(nft_inf.uris[0]);
                }
                break;
            }
            case chains[1]: {
                const id = ident.split("-");
                id.pop();
                if (await this.checkWrappedOnPolkadot(owner, id.join("-"))) {
                    await this._requirePolka();
                    const hash = Base64.toUint8Array(nft_dat.uris[0]);
                    const hex = await this._polka.getLockedNft(hash);
                    url = `http${decoder.decode(hex).split("http")[1]}`; // hack to strip off invalid data
                } else {
                    url = window.atob(nft_dat.uris[0]);
                }
                break;
            }
            default:
                throw Error(`Unhandled chain: ${chain}`);
        }

        return url;
    }
}
