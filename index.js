// Populate the dropdown boxws with user names
// & blockhain wallet addresses
(async () => {
    await populateElrond('elrond_accounts.json');
    await populatePolkadot('parachain_accounts.json');
})();


// Endpont url global constant:
const url = "http://localhost:8000";


// Send tokens from a Parachain to Elrond:
async function SendParachainElrond() {
    try {

        // HEX encoded Parachain keys:
        const paraKeys = await getParachainKeys('./parachain_keys.json');

        // Link DOM elements
        const polkadotwallet = document.getElementById("from-polkadot-address");
        const elrondWallet = document.getElementById('to-elrond-address');
        const token_ = document.getElementById("p2e-token");
        const amount = Number(document.getElementById("p2e-amount").value);

        // Extract values
        const acctName = polkadotwallet.options[polkadotwallet.selectedIndex].innerHTML;
        const acctAddress = polkadotwallet.value;
        const key = paraKeys[acctName];
        const targetWallet = elrondWallet.value;
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
            func = withdraw_egold_p2e;
        }

        // Chosen function call
        func(acctAddress, key, targetWallet, amount);

    } catch (error) {
        console.error(error);
    }
}

// Reads a text file
// returns its content in a string
async function SendElrondParachain() {
    try {
        // Link DOM elements
        const elrondWallet = document.getElementById("from-elrond-address");
        const polkadotWallet = document.getElementById("to-polkadot-address");
        const token_ = document.getElementById("e2p-token");
        const amount = Number(document.getElementById("e2p-amount").value);

        // Extract values
        const acctName = elrondWallet.options[elrondWallet.selectedIndex].innerHTML;
        const acctAddress = elrondWallet.value;
        const key = await fetch(`./elrond_keys/${acctName.toLowerCase()}.pem`)
            .then(response => response.text())
            .then(text => text)
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
        if (token === "EGLD") {
            func = transfer_egold_e2p;
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

function elrd_req_data(pem, dest, val) {
    return {
        "pem": pem,
        "destination": dest,
        "value": val
    }
}

function update_tx(nw) {
    const holder = document.getElementById("tx-hash");
    holder.innerText = nw;
}

// Return wrapped XPNET from Elrond -> Parachain
async function withdraw_xpnet_e2p(pem, destination, value) {
    update_tx("please wait...")
    const result = await post(`${url}/xpnet/withdraw`, elrd_req_data(pem, destination, value));
    update_tx(`${JSON.stringify(result[0])}`)
}

// Return wrapped eGold from Parachain -> Elrond
async function withdraw_egold_p2e(sender_addr, sender_key, destination, value) {
    update_tx("please wait...")
    const result = await post(`${url}/egld/withdraw`, polkadot_req_data(sender_addr, sender_key, destination, value));
    update_tx(`${JSON.stringify(result[0])}`)
}

// Freeze XPNET in a Parachain and release wrapped XPNET in Elrond
async function transfer_xpnet_p2e(sender_addr, sender_key, destination, value) {
    update_tx("please wait...")
    const result = await post(`${url}/xpnet/transfer`, polkadot_req_data(sender_addr, sender_key, destination, value));
    update_tx(`${JSON.stringify(result[0])}`);
}

// Freeze eGold in a Parachain and release wrapped eGold in Elrond
async function transfer_egold_e2p(pem, destination, value) {
    update_tx("please wait...")
    const result = await post(`${url}/egld/transfer`, elrd_req_data(pem, destination, value));
    update_tx(`${JSON.stringify(result[0])}`);
}


async function populateElrond(fileName) {
    const keys = await fetch(fileName)
        .then(response => response.json())
        .then(text => text)

    const to_elrond_address = document.getElementById('to-elrond-address');
    const from_elrond_address = document.getElementById('from-elrond-address');

    for (const key of Object.keys(keys)) {

        const opt1 = document.createElement('OPTION');
        opt1.value = keys[key];
        opt1.innerHTML = key;
        from_elrond_address.appendChild(opt1);

        const opt2 = document.createElement('OPTION');
        opt2.value = keys[key];
        opt2.innerHTML = key;
        to_elrond_address.appendChild(opt2);
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


async function getParachainKeys(fileName){
    const keys = await fetch(fileName)
        .then(response => response.json())
        .then(text => text)

    return keys;
}