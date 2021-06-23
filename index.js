// Populate the dropdown boxws with user names
// & blockhain wallet addresses
(async () => {
    await populateElrond('elrond_accounts.json');
    await populatePolkadot('parachain_accounts.json');
})();


// Endpont url global constant:
const url = "http://localhost:8080";


// Send tokens from a Parachain to Elrond:
async function SendParachainElrond() {
    try {

        // HEX encoded Parachain keys:
        const paraKeys = await getParachainKeys('./parachain_keys.json');

        const polkadotwallet = document.getElementById("from-elrond-address");
        const elrondWallet = document.getElementById('to-elrond-address');
        const token_ = document.getElementById("p2e-token");
        const amount = Number(document.getElementById("p2e-amount").value);

        const acctName = polkadotwallet.options[polkadotwallet.selectedIndex].innerHTML;
        const acctAddress = polkadotwallet.value;
        const key = paraKeys[acctName];
        const targetWallet = elrondWallet.value;
        const token = token_.value;

        console.log("Account", acctName)
        console.log("From", acctAddress)
        console.log("KEY", key)
        console.log("Target Wallet", targetWallet)
        console.log("Token", token);
        console.log(amount, typeof amount);


        let func;

        if (token === "XPNET") {
            func = transfer_xpnet_p2e;
        } else {
            func = withdraw_egold_p2e;
        }
        func(key, targetWallet, amount);

    } catch (error) {
        console.error(error);
    }
}

// Reads a text file
// returns its content in a string
async function SendElrondParachain() {
    try {

        const elrondWallet = document.getElementById("from-elrond-address");
        const polkadotWallet = document.getElementById("to-polkadot-address");
        const token_ = document.getElementById("e2p-token");
        const amount = Number(document.getElementById("e2p-amount").value);

        const acctName = elrondWallet.options[elrondWallet.selectedIndex].innerHTML;
        const acctAddress = elrondWallet.value;
        const key = await fetch(`./elrond_keys/${acctName.toLowerCase()}.pem`)
            .then(response => response.text())
            .then(text => text)
        const targetWallet = polkadotWallet.value;
        const token = token_.value;

        console.log(acctName)
        console.log(acctAddress)
        console.log(key)
        console.log(targetWallet)
        console.log(token);
        console.log(amount, typeof amount);


        let func;

        if (token === "EGLD") {
            func = transfer_egold_e2p;
        } else {
            func = withdraw_xpnet_e2p;
        }

        func(key, targetWallet, amount);

    } catch (error) {
        console.error(error);
    }

}

async function sendRequest(route, pem, sender_key, destination, value) {
    try {

        const body = JSON.stringify({ pem, sender_key, destination, value });
        console.log(body);

        const rawResp = await fetch(route,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body
            });
        const content = await rawResp.json();
        return content;
    } catch (error) {
        console.error(error);
    }

}


async function withdraw_xpnet_e2p(pem, destination, value) {
    const sender_key = pem;
    const result = await sendRequest(`${url}/xpnet/withdraw`, pem, sender_key, destination, value);
    console.log(result);
}

async function withdraw_egold_p2e(pem, destination, value) {
    const sender_key = pem;
    const result = await sendRequest(`${url}/egld/withdraw`, pem, sender_key, destination, value);
    console.log(result);
}

async function transfer_xpnet_p2e(pem, destination, value) {
    const sender_key = pem;
    const result = await sendRequest(`${url}/xpnet/transfer`, pem, sender_key, destination, value);
    console.log(result);
}

async function transfer_egold_e2p(pem, destination, value) {
    const sender_key = pem;
    const result = await sendRequest(`${url}/egld/transfer`, pem, sender_key, destination, value);
    console.log(result);
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