import { Keyring } from '@polkadot/keyring';

export const url = "http://54.194.208.186:1000";

// export const ElrondAccounts = {
//     "XP-ALICE":"erd14jjddnkallyr5y4zsy5jwz507pq8gaanwk97ykq6lt94v4ke9mesqgdngj",
//     "XP-BOB":"erd14js0zjnej264rt0dqqtuf4jal3nwaxv5gmhn54psaru0aa8f44nqsd0k29",
//     "XP-CAROL":"erd1xwg525k3fhga5c62707g4k8lqpjv24ewjmgmzh4p59xw4e8nesvstwppfv",
//     "XP-DAN":"erd1p2jndnqn9stphpcm48kkwwu2k7w27awfcn4x6kkss6revrryl8hqz8nzew",
//     "XP-EVE":"erd1qxk7rhdgzeah7xxm4wx593mru7342w0nr9afftl058tr4gkmpq0qvz74uh"
// };

export const ElrondAccounts = {
    "ALICE":"erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th",
    "BOB":"erd1spyavw0956vq68xj8y4tenjpq2wd5a9p2c6j8gsz7ztyrnpxrruqzu66jx",
    "CAROL":"erd1k2s324ww2g0yj38qn2ch2jwctdy8mnfxep94q9arncc6xecg3xaq6mjse8",
}

export const ElrondKeys = {
    "ALICE": `-----BEGIN PRIVATE KEY for erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th-----
    NDEzZjQyNTc1ZjdmMjZmYWQzMzE3YTc3ODc3MTIxMmZkYjgwMjQ1ODUwOTgxZTQ4
    YjU4YTRmMjVlMzQ0ZThmOTAxMzk0NzJlZmY2ODg2NzcxYTk4MmYzMDgzZGE1ZDQy
    MWYyNGMyOTE4MWU2Mzg4ODIyOGRjODFjYTYwZDY5ZTE=
-----END PRIVATE KEY for erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th-----`,

    "BOB": `-----BEGIN PRIVATE KEY for erd1spyavw0956vq68xj8y4tenjpq2wd5a9p2c6j8gsz7ztyrnpxrruqzu66jx-----
    YjhjYTZmODIwM2ZiNGI1NDVhOGU4M2M1Mzg0ZGEwMzNjNDE1ZGIxNTViNTNmYjVi
    OGViYTdmZjVhMDM5ZDYzOTgwNDlkNjM5ZTVhNjk4MGQxY2QyMzkyYWJjY2U0MTAy
    OWNkYTc0YTE1NjM1MjNhMjAyZjA5NjQxY2MyNjE4Zjg=
-----END PRIVATE KEY for erd1spyavw0956vq68xj8y4tenjpq2wd5a9p2c6j8gsz7ztyrnpxrruqzu66jx-----`,

    "CAROL": `-----BEGIN PRIVATE KEY for erd1k2s324ww2g0yj38qn2ch2jwctdy8mnfxep94q9arncc6xecg3xaq6mjse8-----
    ZTI1M2E1NzFjYTE1M2RjMmFlZTg0NTgxOWY3NGJjYzk3NzNiMDU4NmVkZWFkMTVh
    OTRjYjcyMzVhNTAyNzQzNmIyYTExNTU1Y2U1MjFlNDk0NGUwOWFiMTc1NDlkODVi
    NDg3ZGNkMjZjODRiNTAxN2EzOWUzMWEzNjcwODg5YmE=
-----END PRIVATE KEY for erd1k2s324ww2g0yj38qn2ch2jwctdy8mnfxep94q9arncc6xecg3xaq6mjse8-----`
}

// export const ElrondKeys = {
//     "XP-ALICE":`-----BEGIN PRIVATE KEY for erd14jjddnkallyr5y4zsy5jwz507pq8gaanwk97ykq6lt94v4ke9mesqgdngj-----
//     ZWY1ZmY4MDJkYmIwNjJiYjg3ZDI0ZDAzZDM3ZDE2NTJmMDExOWJjNjUwZjQyOTg2
//     ZjcwNGM1MTY1NTczNDljNGFjYTRkNmNlZGRmZmM4M2ExMmEyODEyOTI3MGE4ZmYw
//     NDA3NDc3YjM3NThiZTI1ODFhZmFjYjU2NTZkOTJlZjM=
//     -----END PRIVATE KEY for erd14jjddnkallyr5y4zsy5jwz507pq8gaanwk97ykq6lt94v4ke9mesqgdngj-----`,
//     "XP-BOB":`-----BEGIN PRIVATE KEY for erd14js0zjnej264rt0dqqtuf4jal3nwaxv5gmhn54psaru0aa8f44nqsd0k29-----
//     YzJjYzg5ZDhhYjFlYjk5NDYyNmI1NGQyZGZkZmFjNjZmNTc2NmU0NjYyMTIxYTRk
//     ODg3ODBmY2ZlMDAzMWJhZGFjYTBmMTRhNzk5MmI1NTFhZGVkMDAxN2M0ZDY1ZGZj
//     NjZlZTk5OTQ0NmVmM2E1NDMwZThmOGZlZjRlOWFkNjY=
//     -----END PRIVATE KEY for erd14js0zjnej264rt0dqqtuf4jal3nwaxv5gmhn54psaru0aa8f44nqsd0k29-----`,
//     "XP-CAROL":`-----BEGIN PRIVATE KEY for erd1xwg525k3fhga5c62707g4k8lqpjv24ewjmgmzh4p59xw4e8nesvstwppfv-----
//     ZDVmOTcxMDZiN2ZjN2Q5ZDI5ZjUxM2U0YTMwNjdkNTlhMzExZDUzOTU5NWMxOGY5
//     NTljZDM4YmVjOTk3OTc1MDMzOTE0NTUyZDE0ZGQxZGE2MzRhZjNmYzhhZDhmZjAw
//     NjRjNTU3MmU5NmQxYjE1ZWExYTE0Y2VhZTRmM2NjMTk=
//     -----END PRIVATE KEY for erd1xwg525k3fhga5c62707g4k8lqpjv24ewjmgmzh4p59xw4e8nesvstwppfv-----`,
//     "XP-DAN":`-----BEGIN PRIVATE KEY for erd1p2jndnqn9stphpcm48kkwwu2k7w27awfcn4x6kkss6revrryl8hqz8nzew-----
//     OTZlMWEzZWI0ZTMwMTliMTA3ODMzNjI0NmVjZGNkYTViNDNmOWQyOTAwMGY4Yjk3
//     OGU3MTYwNTgxOWRhZmMxZjBhYTUzNmNjMTMyYzE2MWI4NzFiYTllZDY3M2I4YWI3
//     OWNhZjc1YzljNGVhNmQ1YWQwODY4Nzk2MGM2NGY5ZWU=
//     -----END PRIVATE KEY for erd1p2jndnqn9stphpcm48kkwwu2k7w27awfcn4x6kkss6revrryl8hqz8nzew-----`,
//     "XP-EVE":`-----BEGIN PRIVATE KEY for erd1qxk7rhdgzeah7xxm4wx593mru7342w0nr9afftl058tr4gkmpq0qvz74uh-----
//     Y2FjNjg1MDc4MWViZTgyOTMyYmUzZmI4OWM2Y2I4MDE5ZWY1NmZjOTJkYTg4OWE0
//     M2ZhZWUyMjY2MmU4ZjNmNzAxYWRlMWRkYTgxNjdiN2YxOGRiYWI4ZDQyYzc2M2U3
//     YTM1NTM5ZjMxOTdhOTRhZmVmYTFkNjNhYTJkYjA4MWU=
//     -----END PRIVATE KEY for erd1qxk7rhdgzeah7xxm4wx593mru7342w0nr9afftl058tr4gkmpq0qvz74uh-----`
// };

const keyring = new Keyring();

export const ParachainAccounts = {
    "ALICE": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    "BOB": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    "CHARLIE": "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
    "DAVE": "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy",
    "EVE": "5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw",
    "FERDIE": "5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL"
};

export const ParachainKeys = {
    "ALICE": () => keyring.createFromUri("//Alice", undefined, 'sr25519'),
    "BOB": () => keyring.createFromUri("//Bob", undefined, 'sr25519'),
    "CHARLIE": () => keyring.createFromUri("//Charlie", undefined, 'sr25519'),
    "DAVE": () => keyring.createFromUri("//Dave", undefined, 'sr25519'),
    "EVE": () => keyring.createFromUri("//Eve", undefined, 'sr25519'),
    "FERDIE": () => keyring.createFromUri("//Ferdie", undefined, 'sr25519')
};

export const ChainConfig = {
    "xpnode": "wss://34.246.187.188:443",
    "elrond_node": "https://testnet-api.elrond.com",
    "elrond_minter": "erd1qqqqqqqqqqqqqpgq45y5wwq3ljgvxfkhhd05h6dnkwdsvfcas3ysdmsj9r",
    "elrond_event_rest": "http://34.246.187.188:3033",
    "elrond_esdt": "XPNET-157cf1",
    "elrond_esdt_nft": "XPNFT-7cdd5c"
};

export const walletConnectBridge = "https://bridge.walletconnect.org";
export const walletConnectDeepLink =
  "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/";


export const ElrondDappConfig = {
    id: "devnet",
    name: "Devnet",
    egldLabel: "xEGLD",
    walletAddress: "https://testnet-wallet.elrond.com",
    apiAddress: "https://testnet-api.elrond.com",
    gatewayAddress: "https://testnet-gateway.elrond.com",
    explorerAddress: "http://testnet-explorer.elrond.com/",  
};


export const NewElrondAccounts = {
    Alice: {
        name:"",
        account: "erd192jvkmmd6neqallnftgjyxpml5t7juktu38nlvq8ar7hqn4amy0sufrwer",
        pem:`-----BEGIN PRIVATE KEY for erd192jvkmmd6neqallnftgjyxpml5t7juktu38nlvq8ar7hqn4amy0sufrwer-----
        ZjE4ODQwOGQ2YzJlYmRiZmQ3NDhjMDlkNTdjYzMxYTU5YzFmMmM0ZWI4ZTE2OTE1
        ZDdlZjNjYTYyOTM2NzY3MDJhYTRjYjZmNmRkNGYyMGVmZmYzNGFkMTIyMTgzYmZk
        MTdlOTcyY2JlNDRmM2ZiMDA3ZThmZDcwNGViZGQ5MWY=
        -----END PRIVATE KEY for erd192jvkmmd6neqallnftgjyxpml5t7juktu38nlvq8ar7hqn4amy0sufrwer-----`
    },
    Bob: {
        name:"",
        account:"erd1fj9q2y5x9laqk3w0c5tu837ht8klnrwzh6hxwum7ac5jeagu8qxscsaw8r",
        pem:`-----BEGIN PRIVATE KEY for erd1fj9q2y5x9laqk3w0c5tu837ht8klnrwzh6hxwum7ac5jeagu8qxscsaw8r-----
        MGI1Y2FkOGRlOGUyZmE3OTJhZThhOTFkNTZlOWRhNWYyY2MzNDllYzIyYjVlMzll
        MGE0MjI1N2ExODFlZjE2ODRjOGEwNTEyODYyZmZhMGI0NWNmYzUxN2MzYzdkNzU5
        ZWRmOThkYzJiZWFlNjc3MzdlZWUyOTJjZjUxYzM4MGQ=
        -----END PRIVATE KEY for erd1fj9q2y5x9laqk3w0c5tu837ht8klnrwzh6hxwum7ac5jeagu8qxscsaw8r-----`
    },
    Carol: {
        name:"",
        account:"erd1j7jm5tugxv3tmd7s30zks2sf37te07yyralkv22xvw2a6fp453hsyvyd0q",
        pem:`-----BEGIN PRIVATE KEY for erd1j7jm5tugxv3tmd7s30zks2sf37te07yyralkv22xvw2a6fp453hsyvyd0q-----
        MTdiYmNmMDRlYmQ0ZGE3ZGI4MTBjOTY3ZDk1ZjUwNmEwZGMxOWQ1YmI0ZDU0MTVi
        N2E4ODg2YTI1ZTFlZGI2ODk3YTViYTJmODgzMzIyYmRiN2QwOGJjNTY4MmEwOThm
        OTc5N2Y4ODQxZjdmNjYyOTQ2NjM5NWRkMjQzNWE0NmY=
        -----END PRIVATE KEY for erd1j7jm5tugxv3tmd7s30zks2sf37te07yyralkv22xvw2a6fp453hsyvyd0q-----`
    },
    // Daniel: {
    //     name:"",
    //     account:"erd1cf07h6ne48s505cua626vwhsyskamkv8fslfpccz0jre4mvm53ls5dwyk4",
    //     pem:``
    // },
    // Eve: {
    //     name:"",
    //     account:"erd1ld936834u3knmt8jx3xk2zjek7hk0ld0yfhg0ar3agxwck99c9kqd8lhlg",
    //     pem:``
    // },
    // Frank: {
    //     name:"",
    //     account:"erd1q533cqtr8y4q0r2maavr0h47d5gqpqslc7fndaaqdzzjfttfv7ps284zhq",
    //     pem:``
    // },
    // Geoge: {
    //     name:"",
    //     account:"erd1gqupqgwzt75m94emg9k2slqkpg2t3k5mxr4dazncecappt98gcnq66tphc",
    //     pem:``
    // },
    // Hugo: {
    //     name:"",
    //     account:"erd18hq8hank5cwc85ek6g7xdxcerstu8dhv7d3kldcwkl75fcgtn9ts8ujjw0",
    //     pem:``
    // },
    // Ivar: {
    //     name:"",
    //     account:"erd1q83amu9dfv66kysnzpdg37la4jnnandxrxq7pjjngkdgghc3cyeqys3jx3",
    //     pem:``
    // },
    // John: {
    //     name:"",
    //     account:"erd18kaedtm0g7y6qxa5xyh07a2gjver4zszj04flgqwtqhl5vkd9k7sx947kn",
    //     pem:``
    // },
    // Zena: {
    //     name:"",
    //     account:"erd1xgamt9gqengy3a77f6zz8xnx6metrytrfc9mkwrdk0fjc3huz8dqs6sdph",
    //     pem:``
    // },
}

export const NewParachainAccounts = {
    Alice_Stash:{
        name:"Alice_Stash",
        account: "5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY",
        key:``
    },
    Bob:{
        name:"Bob",
        account: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
        key:``
    },
    Bob_Stash:{
        name:"Bob_Stash",
        account: "5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc",
        key:``
    }
}
