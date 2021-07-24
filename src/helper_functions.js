import { polkadotPalletHelperFactory } from 'testsuite-ts';
import  { web3HelperFactory } from 'testsuite-ts/dist/helpers/web3';
import { ChainConfig } from './Config';
import { abi } from './assets/Minter.json'
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';


/**
 * Reads the parachain keys from a JSON file
 * @param {String} fileName 
 * @returns JS Object of keys like {KEY:"hex encoded strings"}
 */
export async function getKeys(fileName) {
    const keys = await fetch(fileName)
        .then(response => response.json())
        .then(text => text)

    return keys;
}

/**
 * POST request helper function
 * @param {String} route 
 * @param {Object} data 
 * @returns Success confirmation || Error message
 */
export async function post(route, data) {

    try {
        // Convert the JS Object into a string:
        const body = JSON.stringify(data);

        let err;
        // Save the result of the POST request
        const resp = await fetch(route,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body
            })
            .catch((e) => err = e);

        // On error -> print it in the console
        err && console.log(err);

        // Return the JSON formatted response
        return [await resp.json(), err];
    } catch (error) {
        // On error -> print it in the console
        console.error(error);
        // Retur the text of the error
        return [{}, error];
    }

}

/**
 * Maps the data to the required keys
 * @param {String} addr the address of origin
 * @param {String} key the signature key
 * @param {String} dest the target address
 * @param {String | Number} val the amount
 * @returns a JS Object required by the BE
 */
export function polkadot_req_data(addr, key, dest, val) {
    return {
        "sender_addr": addr,
        "sender_key": key,
        "destination": dest,
        "value": val
    }
}

/**
 * Maps the data to the required keys
 * @param {String} pem the key 
 * @param {String} dest the target address
 * @param {String | Number} val the amount
 * @returns a JS Object required by the BE
 */
export function elrd_req_data(pem, dest, val) {
    return {
        "sender_key": pem,
        "destination": dest,
        "value": val
    }
}

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