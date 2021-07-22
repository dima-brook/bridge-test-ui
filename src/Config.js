import { Keyring } from '@polkadot/keyring';

export const url = "http://54.194.208.186:1000";

export const ElrondAccounts = {
    "XP-ALICE":"erd14jjddnkallyr5y4zsy5jwz507pq8gaanwk97ykq6lt94v4ke9mesqgdngj",
    "XP-BOB":"erd14js0zjnej264rt0dqqtuf4jal3nwaxv5gmhn54psaru0aa8f44nqsd0k29",
    "XP-CAROL":"erd1xwg525k3fhga5c62707g4k8lqpjv24ewjmgmzh4p59xw4e8nesvstwppfv",
    "XP-DAN":"erd1p2jndnqn9stphpcm48kkwwu2k7w27awfcn4x6kkss6revrryl8hqz8nzew",
    "XP-EVE":"erd1qxk7rhdgzeah7xxm4wx593mru7342w0nr9afftl058tr4gkmpq0qvz74uh"
};

export const ElrondKeys = {
    "XP-ALICE":`-----BEGIN PRIVATE KEY for erd14jjddnkallyr5y4zsy5jwz507pq8gaanwk97ykq6lt94v4ke9mesqgdngj-----
    ZWY1ZmY4MDJkYmIwNjJiYjg3ZDI0ZDAzZDM3ZDE2NTJmMDExOWJjNjUwZjQyOTg2
    ZjcwNGM1MTY1NTczNDljNGFjYTRkNmNlZGRmZmM4M2ExMmEyODEyOTI3MGE4ZmYw
    NDA3NDc3YjM3NThiZTI1ODFhZmFjYjU2NTZkOTJlZjM=
    -----END PRIVATE KEY for erd14jjddnkallyr5y4zsy5jwz507pq8gaanwk97ykq6lt94v4ke9mesqgdngj-----`,
    "XP-BOB":`-----BEGIN PRIVATE KEY for erd14js0zjnej264rt0dqqtuf4jal3nwaxv5gmhn54psaru0aa8f44nqsd0k29-----
    YzJjYzg5ZDhhYjFlYjk5NDYyNmI1NGQyZGZkZmFjNjZmNTc2NmU0NjYyMTIxYTRk
    ODg3ODBmY2ZlMDAzMWJhZGFjYTBmMTRhNzk5MmI1NTFhZGVkMDAxN2M0ZDY1ZGZj
    NjZlZTk5OTQ0NmVmM2E1NDMwZThmOGZlZjRlOWFkNjY=
    -----END PRIVATE KEY for erd14js0zjnej264rt0dqqtuf4jal3nwaxv5gmhn54psaru0aa8f44nqsd0k29-----`,
    "XP-CAROL":`-----BEGIN PRIVATE KEY for erd1xwg525k3fhga5c62707g4k8lqpjv24ewjmgmzh4p59xw4e8nesvstwppfv-----
    ZDVmOTcxMDZiN2ZjN2Q5ZDI5ZjUxM2U0YTMwNjdkNTlhMzExZDUzOTU5NWMxOGY5
    NTljZDM4YmVjOTk3OTc1MDMzOTE0NTUyZDE0ZGQxZGE2MzRhZjNmYzhhZDhmZjAw
    NjRjNTU3MmU5NmQxYjE1ZWExYTE0Y2VhZTRmM2NjMTk=
    -----END PRIVATE KEY for erd1xwg525k3fhga5c62707g4k8lqpjv24ewjmgmzh4p59xw4e8nesvstwppfv-----`,
    "XP-DAN":`-----BEGIN PRIVATE KEY for erd1p2jndnqn9stphpcm48kkwwu2k7w27awfcn4x6kkss6revrryl8hqz8nzew-----
    OTZlMWEzZWI0ZTMwMTliMTA3ODMzNjI0NmVjZGNkYTViNDNmOWQyOTAwMGY4Yjk3
    OGU3MTYwNTgxOWRhZmMxZjBhYTUzNmNjMTMyYzE2MWI4NzFiYTllZDY3M2I4YWI3
    OWNhZjc1YzljNGVhNmQ1YWQwODY4Nzk2MGM2NGY5ZWU=
    -----END PRIVATE KEY for erd1p2jndnqn9stphpcm48kkwwu2k7w27awfcn4x6kkss6revrryl8hqz8nzew-----`,
    "XP-EVE":`-----BEGIN PRIVATE KEY for erd1qxk7rhdgzeah7xxm4wx593mru7342w0nr9afftl058tr4gkmpq0qvz74uh-----
    Y2FjNjg1MDc4MWViZTgyOTMyYmUzZmI4OWM2Y2I4MDE5ZWY1NmZjOTJkYTg4OWE0
    M2ZhZWUyMjY2MmU4ZjNmNzAxYWRlMWRkYTgxNjdiN2YxOGRiYWI4ZDQyYzc2M2U3
    YTM1NTM5ZjMxOTdhOTRhZmVmYTFkNjNhYTJkYjA4MWU=
    -----END PRIVATE KEY for erd1qxk7rhdgzeah7xxm4wx593mru7342w0nr9afftl058tr4gkmpq0qvz74uh-----`
};

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
    "xp_faucet": ParachainKeys["ALICE"],
    "xp_freezer": "5HFujrmKZoF8iNNu3cM8y1S1x8ogfa1nzxueJvy11AFD8pJu",
    "elrond_node": "http://localhost:7950",
    "elrond_faucet": ElrondKeys["XP-ALICE"],
    "elrond_minter": "erd1qqqqqqqqqqqqqpgqygvvtlty3v7cad507v5z793duw9jjmlxd8sszs8a2y",
    "elrond_event_rest": "http://localhost:6644",
    "elrond_esdt": "XPNET-4e6ce6",
    "elrond_esdt_nft": "XPNFT-734aca"
};