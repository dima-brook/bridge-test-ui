
import {
    update_tx,
    post,
    polkadot_req_data,
    elrd_req_data
} from './helper_functions'

// Return wrapped XPNET from Elrond -> Parachain
export async function withdraw_xpnet_e2p(url, pem, destination, value) {
    update_tx("", "please wait...")
    const result = await post(`${url}/xpnet/withdraw`, elrd_req_data(pem, destination, value));
    update_tx(destination, `${JSON.stringify(result[0])}`)
}

// Return wrapped eGold from Parachain -> Elrond
export async function withdraw_egold_p2e(url, sender_addr, sender_key, destination, value) {
    update_tx("please wait...")
    const result = await post(`${url}/egld/withdraw`, polkadot_req_data(sender_addr, sender_key, destination, value));
    update_tx(destination, `${JSON.stringify(result[0])}`)
}

// Freeze XPNET in a Parachain and release wrapped XPNET in Elrond
export async function transfer_xpnet_p2e(url, sender_addr, sender_key, destination, value) {
    update_tx('', "please wait...")
    const result = await post(`${url}/xpnet/transfer`, polkadot_req_data(sender_addr, sender_key, destination, value));
    update_tx(destination, `${JSON.stringify(result[0])}`);
}

// Freeze eGold in a Parachain and release wrapped eGold in Elrond
export async function transfer_egold_e2p(url, pem, destination, value) {
    update_tx('', "please wait...")
    const result = await post(`${url}/egld/transfer`, elrd_req_data(pem, destination, value));
    update_tx(destination, `${JSON.stringify(result[0])}`);
}