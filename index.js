(async () => {
    await populateElrond('elrond_accounts.json');
    await populatePolkadot('parachain_accounts.json');
})();

const url = "http://localhost:8080";

async function SendParachainElrond() {
    try {

        // HEX encoded Parachain keys:
        const paraKeys = {
            ALICE: "0x33a6f3093f158a7109f679410bef1a0c54168145e0cecb4df006c1c2fffb1f09925a225d97aa00682d6a59b95b18780c10d7032336e88f3442b42361f4a66011",
            ALICE_STASH: "0x7ca68c5cbb7ba996afccecd71a2371d1269bcdb82e5da5abd97caaf7b2b082085ce57f472f2573c8c13cfec0cf0dd8b669c83edacac0af901182852031c64e6b",
            BOB: "0x30ae9d12802481509031ea9e77505be8364a60d7d0095108727052c48485fc09820afe9e5afe56cc3d174972582aa9cee53bbad4aabae1284e95887f12c612bd",
            BOB_STASH: "0xbf8ca18f4888c4f901e09a94dadc4d6d725002163de70533d6fd068470205c087a8c072b5ac47c439fd514634dd5c2b33c995d23a87abe0cf5828c1f037446bf",
            CHARLIE: "0x51e53f70a1556a3cad946bff1ad4194c70395e2efb9673ffec6e3fb08151490fdf7e39ae8b840a9ea21ff70a6c22e5ece8ab236a3db44b0ac9ef6f5b692fe007",
            DAVE: "0xa5872b06d730f281b64041cb45904aa6fb0aba5619204223d1d0d1af1715fd0f4749d81426af6a83c9bb244d2e9b8bd49f632e52b539ae2f065bb51d23da13b2",
            EVE: "0xcdb9dae7074a4006f14f2f9543f02916ae84a493b27ab17250894db1850f710f853a102a727865ffa4e9e4129d9da700a666702bfbd8ec0a0e81e75d8b5d9e15",
            FERDIE: "0xcf40c8f89fb888e68595d3d7b94a89dc610dd193db26566d3c951f01d613f60cab89773e8c7a00bb0bab33b71227947ceac311015c845a1929bbcda0e0f51a69"

        }

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