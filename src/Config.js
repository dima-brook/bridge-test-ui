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
    "xpnode": "ws://localhost:9944",
    "elrond_node": "https://testnet-api.elrond.com",
    "elrond_minter": "erd1qqqqqqqqqqqqqpgq7fzdnxa43vgau9myeasu2kw90fvpu40cs3ys5ez6s3",
    "elrond_event_rest": "http://localhost:6644",
    "elrond_esdt": "XPNET-054f6c",
    "elrond_esdt_nft": "XPNFT-57cb06"
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