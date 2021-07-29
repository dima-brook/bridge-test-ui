import { elrondHelperFactory, polkadotPalletHelperFactory } from 'testsuite-ts';
import { ChainConfig, ElrondKeys } from './Config';
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { UserSigner } from '@elrondnetwork/erdjs';
import { chains } from './consts';
import { data as crossXp } from "./assets/SVG/cross_chain.json";

/*const nft_info_encoded_t = new StructType('EncodedNft', [
    new StructFieldDefinition('token', '', new TokenIdentifierType()),
    new StructFieldDefinition('nonce', '', new U64Type())
]);*/

export const ChainHandlers = {
    _polka: undefined,
    _polkaExtInit: undefined,
    _elrd: undefined,
    async _requirePolkadotExt() {
        if (!this._polkaExtInit) {
            await web3Enable('XPNET Cross Chain Bridge');
            this._polkaExtInit = true;
        }
    },
    async _requirePolka() {
        if (!this._polka) {
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
        if (!this._elrd) {
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
    async elrondSigner(name) {
        return UserSigner.fromPem(ElrondKeys[name]);
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
        console.log(tokenLen);
        if (nftDat.length !== 12 + tokenLen) {
            return undefined;
        }
        const token = nftDat.slice(4, 4+tokenLen).toString('utf-8');
        // TODO: Consider LO
        // tfw js can't convert be bytes to u64
        const nonce = (new Uint32Array(nftDat.slice(4+tokenLen, 12 + tokenLen).reverse()))[0].toString(16);

        return { token, nonce };
    },
    async checkWrappedOnElrond(owner, ident) {
        await this._requireElrd();
        await this._requirePolka();

        const nfts = await this._polka.listNft(owner);
        const nftDat = Uint8Array.from(Buffer.from(nfts.get(ident).replace('0x', ''), 'hex'));

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
                const dat = Uint8Array.from(Buffer.from(nft_dat.replace('0x', ''), 'hex'));
                const res = this._tryDecodeWrappedOnElrond(dat);
                if (res === undefined) {
                    url = Buffer.from(dat).toString("utf-8");
                } else {
                    url = await this._elrd.getLockedNft(res);
                }
                break;
            }
            case chains[1]: {
                if (this.checkWrappedOnPolkadot(owner, ident)) {
                    url = crossXp; // TODO: Decode Name, fetch actual image
                } else {
                    url = nft_dat.uris[0];
                }
                break;
            }
            default:
                throw Error(`Unhandled chain: ${chain}`);
        }

        return url;
    }
}