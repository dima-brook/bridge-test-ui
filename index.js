// =====================================================
//             GLOBAL CONSTANTS & VARIABLES
// =====================================================

// CONSTANTS
const url = "http://54.194.208.186:80";
const currencies = ['XPNET', 'EGLD']
const blockchains = ['XP.Network', 'Elrond']

// VARIABLES:
let directionFrom = blockchains[0];
let directionTo = blockchains[1];
let asset = currencies[0];
let amount = 1000000000000000;

// BUTTONS:
const swap_button = document.getElementById('swap-chains');
const send_button = document.getElementById('send-button');

// ASSET & AMOUNT:
const transfer_asset = document.getElementById('transfer-asset');
const transfer_amount = document.getElementById('transfer-amount');

// TO - FROM BLOCKCHAINS:
const to_blockchain = document.getElementById('to-blockchain');
const from_blockchain = document.getElementById('from-blockchain');

// FROM - TO ADDRESSES:
const from_account = document.getElementById('from-account');
const to_account = document.getElementById('to-account');

// TX INFORMATION:
const tx_hash = document.getElementById('transaction-hash');
const info = document.getElementById('info');

// =====================================================
//               POPULATION of the SELECTs
// =====================================================
(async () => {
    await populate ();
})();

// Aggregated population
async function populate(){
    populateTransferAsset();
    transfer_amount.value = amount;
    populateFromToBlockchains();
    populateAccounts(directionFrom, from_account);
    populateAccounts(directionTo, to_account);
}

// Populate the select with data
async function populateTransferAsset(){
    for (a of currencies){
        addToCustomSelect(a, transfer_asset);
    }
}

// Populate the select with data
async function populateFromToBlockchains(){
    for (a of blockchains){
        addToCustomSelect(a, to_blockchain);
        addToCustomSelect(a, from_blockchain);
    }
    // Initial setup:
    from_blockchain.value = blockchains[0];
    to_blockchain.value = blockchains[1];

}

// Populate the select with data
async function populateAccounts(direction, who){

    switch (direction) {
        case blockchains[0]:
            populateFromJSON('parachain_accounts.json',who);
            break;
        case blockchains[1]:
            populateFromJSON('elrond_accounts.json',who);
            break;
    
        default:
            break;
    }
    
}

// =====================================================
//                  UI events handlers
// =====================================================

// On change of the value in the select => change the variable
transfer_asset.addEventListener('change', () => {
    if(asset !== transfer_asset.value){
        asset = transfer_asset.value;
    }
})

// Binding the global variable to the UI element
transfer_amount.addEventListener('change', ()=>{
    if (amount !== Number(transfer_amount.value)){
        amount = Number(transfer_amount.value);
    }
})



// SWAP Button click
swap_button.addEventListener('click', () => {

    // Swap the internal data values and the UI selects
    [directionTo,directionFrom] = [from_blockchain.value, to_blockchain.value];
    [from_blockchain.value, to_blockchain.value] = [directionFrom, directionTo];

    // Clear the selects from the previous values
    from_account.textContent = '';
    to_account.textContent = '';

    // Fill the selects with the new values
    populateAccounts(directionFrom, from_account);
    populateAccounts(directionTo, to_account);
});

// SEND Button click
send_button.addEventListener('click', async () => {

    // Extract values
    const acctName = from_account.options[from_account.selectedIndex].innerHTML;
    const acctAddress = from_account.value;
    let key;
    const targetWallet = to_account.value;
    const token = asset;
    let func;

    // XP.network => Elrond
    if (directionFrom === blockchains[0] && directionTo === blockchains[1]){

        const keys = await getParachainKeys('./parachain_keys.json');
        key = keys[acctName];

        // Choice of the target function
        if (token === currencies[0]) { //XPNET
            func = transfer_xpnet_p2e;
        } else {
            func = withdraw_egold_p2e;
        }

    }else{ // Elrond => XP.network

        key = await fetch(`./elrond_keys/${acctName.toLowerCase()}.pem`)
            .then(response => response.text())
            .then(text => text)

        // Choice of the target function
        if (token === currencies[0]) { //XPNET
            func = transfer_xpnet_p2e;
        } else {
            func = withdraw_egold_p2e;
        }
    }

        // Check the extracted values
        // TODO: remove before production
        console.log("From:",acctName)
        console.log("Account:",acctAddress)
        console.log("Key:",key)
        console.log("To Account:",targetWallet)
        console.log("Token:", token);
        console.log(amount, typeof amount);

        
        // Chosen function call
        func(acctAddress, key, targetWallet, amount);
    
});

// =====================================================
//                      HELPER FUNCTIONS
// =====================================================

// Add another option to a select container
async function addToCustomSelect(option, select){
    const opt = document.createElement('OPTION');
    opt.value = option;
    opt.innerHTML = option;
    select.appendChild(opt);
}

// Populate a select from the JSON data
async function populateFromJSON(fileName, who) {

    const keys = await fetch(fileName)
        .then(response => response.json())
        .then(text => text)

    for (const key of Object.keys(keys)) {

        const opt = document.createElement('OPTION');
        opt.value = keys[key]; // Hash
        opt.innerHTML = key;   // User Name
        who.appendChild(opt);

    }

}

// Read the parachain keys into a variable
async function getParachainKeys(fileName){
    const keys = await fetch(fileName)
        .then(response => response.json())
        .then(text => text)

    return keys;
}

// The POST request helper function
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

// JS Object packer
function polkadot_req_data(addr, key, dest, val) {
    return {
        "sender_addr": addr,
        "sender_key": key,
        "destination": dest,
        "value": val
    }
}

// JS Object packer
function elrd_req_data(pem, dest, val) {
    return {
        "pem": pem,
        "destination": dest,
        "value": val
    }
}

// Information displayer
function update_tx(receiver, nw) {
    tx_hash.innerText = nw;
    info.innerHTML = receiver
}

// =====================================================
//                      TRANSACTIONS
// =====================================================

// Return wrapped XPNET from Elrond -> Parachain
async function withdraw_xpnet_e2p(pem, destination, value) {
    update_tx("", "please wait...")
    const result = await post(`${url}/xpnet/withdraw`, elrd_req_data(pem, destination, value));
    update_tx(destination, `${JSON.stringify(result[0])}`)
}

// Return wrapped eGold from Parachain -> Elrond
async function withdraw_egold_p2e(sender_addr, sender_key, destination, value) {
    update_tx("please wait...")
    const result = await post(`${url}/egld/withdraw`, polkadot_req_data(sender_addr, sender_key, destination, value));
    update_tx(destination, `${JSON.stringify(result[0])}`)
}

// Freeze XPNET in a Parachain and release wrapped XPNET in Elrond
async function transfer_xpnet_p2e(sender_addr, sender_key, destination, value) {
    update_tx('', "please wait...")
    const result = await post(`${url}/xpnet/transfer`, polkadot_req_data(sender_addr, sender_key, destination, value));
    update_tx(destination, `${JSON.stringify(result[0])}`);
}

// Freeze eGold in a Parachain and release wrapped eGold in Elrond
async function transfer_egold_e2p(pem, destination, value) {
    update_tx('', "please wait...")
    const result = await post(`${url}/egld/transfer`, elrd_req_data(pem, destination, value));
    update_tx(destination, `${JSON.stringify(result[0])}`);
}