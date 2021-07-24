import { polkadotPalletHelperFactory } from 'testsuite-ts';
import  { web3HelperFactory } from 'testsuite-ts/dist/helpers/web3';
import { ChainConfig } from './Config';
import { abi } from './assets/Minter.json'
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';


export const ChainHandlers = {
    _polka: undefined,
    _web3: undefined,
    _web3Provider: undefined,
    async polka() {
        if (!this._polka) {
            this._polka = await polkadotPalletHelperFactory(
                ChainConfig.xpnode,
            );
        }

        return this._polka;
    },
    _w3eventsSetup() {
        const nullIt = () => this._web3 = undefined;
        this._web3Provider.provider.on('chainChanged', nullIt);
    },
    async _requireWeb3() {
        if (!this._web3) {
            const base = await detectEthereumProvider();
            if (!base) {
                throw Error("Metamask not installed!");
            }
            this._web3Provider = new ethers.providers.Web3Provider(base);
            this._web3 = await web3HelperFactory(
                this._web3Provider,
                ChainConfig.heco_minter,
                abi
            );
            this._w3eventsSetup();
        }
    },
    async web3() {
        await this._requireWeb3();

        return this._web3;
    },
    async innerWeb3() {
        await this._requireWeb3();

        return this._web3Provider;
    }
}