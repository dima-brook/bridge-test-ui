import { elrondHelperFactory, polkadotPalletHelperFactory } from 'testsuite-ts';
import { ChainConfig } from './Config';


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
    _elrd: undefined,
    async polka() {
        if (!this._polka) {
        this._polka = await polkadotPalletHelperFactory(
            ChainConfig.xpnode,
            //ChainConfig.xp_freezer,
            //ChainConfig.xp_freezer
        );
        }

        return this._polka;
    },
    async elrd() {
        if (!this._elrd) {
        this._elrd = await elrondHelperFactory(
            ChainConfig.elrond_node,
            ChainConfig.elrond_faucet,
            ChainConfig.elrond_minter,
            ChainConfig.elrond_event_rest,
            ChainConfig.elrond_esdt,
            ChainConfig.elrond_esdt_nft
        );

        return this._elrd;
        }
    }
}