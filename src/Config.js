import { Keyring } from '@polkadot/keyring';

export const url = "http://176.34.129.98:1000";

export const HECOAccounts = {
    "XP-ALICE":"0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    "XP-BOB":"0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
    "XP-CAROL":"0x90f79bf6eb2c4f870365e785982e1f101e93b906",
    "XP-DAN":"0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
    "XP-EVE":"0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc"
}


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


export const HECOKeys = {
    "XP-ALICE":"0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
    "XP-BOB":"0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
    "XP-CAROL":"0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6",
    "XP-DAN":"0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a",
    "XP-EVE":"0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba"
}


export const ChainConfig = {
    "xpnode": "ws://localhost:9944",
    "xp_faucet": ParachainKeys["ALICE"],
    "elrond_node": "http://localhost:7950",
    "elrond_faucet": ElrondKeys["ALICE"],
    "elrond_minter": "erd1qqqqqqqqqqqqqpgqygvvtlty3v7cad507v5z793duw9jjmlxd8sszs8a2y",
    "elrond_event_rest": "http://localhost:6644",
    "elrond_esdt": "XPNET-168307",
    "elrond_esdt_nft": "XPNFT-59b7ef"
};
