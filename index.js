// Populate the dropdown boxws with user names
// & blockhain wallet addresses
(async () => {
    await populateHeco('heco_accounts.json');
    await populatePolkadot('parachain_accounts.json');
})();


// Endpont url global constant:
const url = "http://localhost:8000";


// Send tokens from a Parachain to Heco:
async function SendParachainHeco() {
    try {

        // HEX encoded Parachain keys:
        const paraKeys = await fetchKeys('./parachain_keys.json');

        // Link DOM elements
        const polkadotwallet = document.getElementById("from-polkadot-address");
        const hecoWallet = document.getElementById('to-heco-address');
        const token_ = document.getElementById("p2e-token");
        const amount = Number(document.getElementById("p2e-amount").value);

        // Extract values
        const acctName = polkadotwallet.options[polkadotwallet.selectedIndex].innerHTML;
        const acctAddress = polkadotwallet.value;
        const key = paraKeys[acctName];
        const targetWallet = hecoWallet.value;
        const token = token_.value;

        // Check the extracted values
        // TODO: remove before production
        console.log("Account", acctName)
        console.log("From", acctAddress)
        console.log("KEY", key)
        console.log("Target Wallet", targetWallet)
        console.log("Token", token);
        console.log(amount, typeof amount);


        // Function variable
        let func;

        // Choice of the target function
        if (token === "XPNET") {
            func = transfer_xpnet_p2e;
        } else {
            func = withdraw_ht_p2e;
        }

        // Chosen function call
        func(acctAddress, key, targetWallet, amount);

    } catch (error) {
        console.error(error);
    }
}

// Reads a text file
// returns its content in a string
async function SendHecoParachain() {
    try {
        // Link DOM elements
        const hecoWallet = document.getElementById("from-heco-address");
        const polkadotWallet = document.getElementById("to-polkadot-address");
        const token_ = document.getElementById("e2p-token");
        const amount = Number(document.getElementById("e2p-amount").value);

        // Extract values
        const acctName = hecoWallet.options[hecoWallet.selectedIndex].innerHTML;
        const acctAddress = hecoWallet.value;
        const key = (await fetchKeys('./heco_keys.json'))[acctName]
        const targetWallet = polkadotWallet.value;
        const token = token_.value;


        // Check the extracted values
        // TODO: remove before production
        console.log(acctName)
        console.log(acctAddress)
        console.log(key)
        console.log(targetWallet)
        console.log(token);
        console.log(amount, typeof amount);


        // Function variable
        let func;

        // Choice of the target function
        if (token === "HT") {
            func = transfer_ht_e2p;
        } else {
            func = withdraw_xpnet_e2p;
        }

        // Chosen function call
        func(key, targetWallet, amount);

    } catch (error) {
        console.error(error);
    }

}

async function post(route, data) {
    const body = JSON.stringify(data);

    let err;
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

    err && console.log(err);

    return [await resp.json(), err];
}

function polkadot_req_data(addr, key, dest, val) {
    return {
        "sender_addr": addr,
        "sender_key": key,
        "destination": dest,
        "value": val
    }
}

function heco_req_data(key, dest, val) {
    return {
        "sender_key": key,
        "destination": dest,
        "value": val
    }
}

function update_tx(nw) {
    const holder = document.getElementById("tx-hash");
    holder.innerText = nw;
}

// Return wrapped XPNET from HECO -> Parachain
async function withdraw_xpnet_e2p(key, destination, value) {
    update_tx("please wait...")
    const result = await post(`${url}/xpnet/withdraw`, heco_req_data(key, destination, value));
    update_tx(`dest: ${destination}\n${JSON.stringify(result[0])}`)
}

// Return wrapped HT from Parachain -> HECO
async function withdraw_ht_p2e(sender_addr, sender_key, destination, value) {
    update_tx("please wait...")
    const result = await post(`${url}/ht/withdraw`, polkadot_req_data(sender_addr, sender_key, destination, value));
    update_tx(`dest: ${destination}\n${JSON.stringify(result[0])}`)
}

// Freeze XPNET in a Parachain and release wrapped XPNET in HECO
async function transfer_xpnet_p2e(sender_addr, sender_key, destination, value) {
    update_tx("please wait...")
    const result = await post(`${url}/xpnet/transfer`, polkadot_req_data(sender_addr, sender_key, destination, value));
    update_tx(`dest: ${destination}\n${JSON.stringify(result[0])}`);
}

// Freeze HT in a Heco and mint wrapped HT in Parachain
async function transfer_ht_e2p(key, destination, value) {
    update_tx("please wait...")
    const result = await post(`${url}/ht/transfer`, heco_req_data(key, destination, value));
    update_tx(`dest: ${destination}\n${JSON.stringify(result[0])}`);
}


async function populateHeco(fileName) {
    const keys = await fetch(fileName)
        .then(response => response.json())
        .then(text => text)

    const to_heco_address = document.getElementById('to-heco-address');
    const from_heco_address = document.getElementById('from-heco-address');

    for (const key of Object.keys(keys)) {

        const opt1 = document.createElement('OPTION');
        opt1.value = keys[key];
        opt1.innerHTML = key;
        from_heco_address.appendChild(opt1);

        const opt2 = document.createElement('OPTION');
        opt2.value = keys[key];
        opt2.innerHTML = key;
        to_heco_address.appendChild(opt2);
    }

}

async function populatePolkadot(fileName) {
    const keys = await fetch(fileName)
        .then(response => response.json())
        .then(text => text)

    const to_polkadot_address = document.getElementById('to-polkadot-address');
    const from_polkadot_address = document.getElementById('from-polkadot-address');

    for (const key of Object.keys(keys)) {

        const opt1 = document.createElement('OPTION');
        opt1.value = keys[key];
        opt1.innerHTML = key;
        to_polkadot_address.appendChild(opt1);

        const opt2 = document.createElement('OPTION');
        opt2.value = keys[key];
        opt2.innerHTML = key;
        from_polkadot_address.appendChild(opt2);
    }
}


async function fetchKeys(fileName){
    const keys = await fetch(fileName)
        .then(response => response.json())
        .then(text => text)

    return keys;
}