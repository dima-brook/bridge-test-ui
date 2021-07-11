// Read the parachain keys into a variable
export async function getKeys(fileName){
    const keys = await fetch(fileName)
        .then(response => response.json())
        .then(text => text)

    return keys;
}

// The POST request helper function
export async function post(route, data) {
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
export function polkadot_req_data(addr, key, dest, val) {
    return {
        "sender_addr": addr,
        "sender_key": key,
        "destination": dest,
        "value": val
    }
}

// JS Object packer
export function elrd_req_data(pem, dest, val) {
    return {
        "pem": pem,
        "destination": dest,
        "value": val
    }
}

// Information displayer
export function update_tx(receiver, nw) {
    // tx_hash.innerText = nw;
    // info.innerHTML = receiver
}


export async function populateFromJSON(fileName, who) {

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