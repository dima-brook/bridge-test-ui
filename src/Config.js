import { Keyring } from '@polkadot/keyring';

export const polkadotBlockPrefix = "https://explorer.xp.network/#/explorer/query";
export const elrondTxnPrefix = "https://devnet-explorer.elrond.com/transactions";

const keyring = new Keyring();

export const ChainConfig = {
    "xpnode": "ws://localhost:9944", //"wss://bridge.xp.network:443/node", //
    "elrond_node": "https://devnet-api.elrond.com",
    "elrond_minter": "erd1qqqqqqqqqqqqqpgqfy5zmm64avweyq3rcw65xczwkwedfz5zs3ysmja8la", //"erd1qqqqqqqqqqqqqpgq7ysztrj922cs53e5wh2vdmeds9pd69wms3ysy3tyy9", //
    "elrond_event_rest": "http://localhost:6644", //"https://bridge.xp.network/event_rest", //
    "elrond_esdt": "XPNET-274880", //"XPNET-cdf688", //
    "elrond_esdt_nft": "XPNFT-d19b90", //"XPNFT-ff3b98", //
    "validator_txn_socket": "ws://localhost:3001", //"wss://bridge.xp.network/", //
    "web3_minters": {
        'HECO': "0x768C888bDf319f2bA0e2642235C2967f4a47441a",
        "BSC": "0x471bF01b8C622C00652F336651747B1A5d37b5ea",
        "ROPSTEN": "0x66b07bC16F499a0e835c5b277AF19555a05578c1"
    }
};

export const walletConnectBridge = "https://bridge.walletconnect.org";
export const walletConnectDeepLink =
  "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/";


export const ElrondDappConfig = {
    id: "devnet",
    name: "Devnet",
    egldLabel: "xEGLD",
    walletAddress: "https://devnet-wallet.elrond.com",
    apiAddress: "https://devnet-api.elrond.com",
    gatewayAddress: "https://devnet-gateway.elrond.com",
    explorerAddress: "http://devnet-explorer.elrond.com/",  
};


export const NewElrondAccounts = {
    Alice: {
        name:"Alice",
        account: "erd192jvkmmd6neqallnftgjyxpml5t7juktu38nlvq8ar7hqn4amy0sufrwer",
        pem:`-----BEGIN PRIVATE KEY for erd192jvkmmd6neqallnftgjyxpml5t7juktu38nlvq8ar7hqn4amy0sufrwer-----
        ZjE4ODQwOGQ2YzJlYmRiZmQ3NDhjMDlkNTdjYzMxYTU5YzFmMmM0ZWI4ZTE2OTE1
        ZDdlZjNjYTYyOTM2NzY3MDJhYTRjYjZmNmRkNGYyMGVmZmYzNGFkMTIyMTgzYmZk
        MTdlOTcyY2JlNDRmM2ZiMDA3ZThmZDcwNGViZGQ5MWY=
        -----END PRIVATE KEY for erd192jvkmmd6neqallnftgjyxpml5t7juktu38nlvq8ar7hqn4amy0sufrwer-----`
    },
    Bob: {
        name:"Bob",
        account:"erd1fj9q2y5x9laqk3w0c5tu837ht8klnrwzh6hxwum7ac5jeagu8qxscsaw8r",
        pem:`-----BEGIN PRIVATE KEY for erd1fj9q2y5x9laqk3w0c5tu837ht8klnrwzh6hxwum7ac5jeagu8qxscsaw8r-----
        MGI1Y2FkOGRlOGUyZmE3OTJhZThhOTFkNTZlOWRhNWYyY2MzNDllYzIyYjVlMzll
        MGE0MjI1N2ExODFlZjE2ODRjOGEwNTEyODYyZmZhMGI0NWNmYzUxN2MzYzdkNzU5
        ZWRmOThkYzJiZWFlNjc3MzdlZWUyOTJjZjUxYzM4MGQ=
        -----END PRIVATE KEY for erd1fj9q2y5x9laqk3w0c5tu837ht8klnrwzh6hxwum7ac5jeagu8qxscsaw8r-----`
    },
    Carol: {
        name:"Carol",
        account:"erd1j7jm5tugxv3tmd7s30zks2sf37te07yyralkv22xvw2a6fp453hsyvyd0q",
        pem:`-----BEGIN PRIVATE KEY for erd1j7jm5tugxv3tmd7s30zks2sf37te07yyralkv22xvw2a6fp453hsyvyd0q-----
        MTdiYmNmMDRlYmQ0ZGE3ZGI4MTBjOTY3ZDk1ZjUwNmEwZGMxOWQ1YmI0ZDU0MTVi
        N2E4ODg2YTI1ZTFlZGI2ODk3YTViYTJmODgzMzIyYmRiN2QwOGJjNTY4MmEwOThm
        OTc5N2Y4ODQxZjdmNjYyOTQ2NjM5NWRkMjQzNWE0NmY=
        -----END PRIVATE KEY for erd1j7jm5tugxv3tmd7s30zks2sf37te07yyralkv22xvw2a6fp453hsyvyd0q-----`
    },
    Daniel: {
        name:"Daniel",
        account:"erd1cf07h6ne48s505cua626vwhsyskamkv8fslfpccz0jre4mvm53ls5dwyk4",
        pem:`-----BEGIN PRIVATE KEY for erd1cf07h6ne48s505cua626vwhsyskamkv8fslfpccz0jre4mvm53ls5dwyk4-----
        ZmRjNGNhOWM2MzMxZjI3MDUzNDJlOTU1Zjk1ZGNkNjgxZDcxNDIwNjhiZTFhZjVi
        MTI0MTExMGFmMGVkYTY4OWMyNWZlYmVhNzlhOWUxNDdkMzFjZWU5NWE2M2FmMDI0
        MmRkZGQ5ODc0YzNlOTBlMzAyN2M4NzlhZWQ5YmE0N2Y=
        -----END PRIVATE KEY for erd1cf07h6ne48s505cua626vwhsyskamkv8fslfpccz0jre4mvm53ls5dwyk4-----`
    },
    Eve: {
        name:"Eve",
        account:"erd1ld936834u3knmt8jx3xk2zjek7hk0ld0yfhg0ar3agxwck99c9kqd8lhlg",
        pem:`-----BEGIN PRIVATE KEY for erd1ld936834u3knmt8jx3xk2zjek7hk0ld0yfhg0ar3agxwck99c9kqd8lhlg-----
        NDgzOWU0Yjk5MzY3MzQ2NjJkYTFiZWY5N2U5MjdjZTAzMTJhOGE4ODU4ZGI3NWFh
        ZDk2YjYzZmViZDYwNjc3M2ZiNGIxZDFlMzVlNDZkM2RhY2YyMzQ0ZDY1MGE1OWI3
        YWY2N2ZkYWYyMjZlODdmNDcxZWEwY2VjNThhNWMxNmM=
        -----END PRIVATE KEY for erd1ld936834u3knmt8jx3xk2zjek7hk0ld0yfhg0ar3agxwck99c9kqd8lhlg-----`
    },
    Frank: {
        name:"Frank",
        account:"erd1q533cqtr8y4q0r2maavr0h47d5gqpqslc7fndaaqdzzjfttfv7ps284zhq",
        pem:`-----BEGIN PRIVATE KEY for erd1q533cqtr8y4q0r2maavr0h47d5gqpqslc7fndaaqdzzjfttfv7ps284zhq-----
        OWRmZGVhZWE1OTQ1OTE5MzI5ZWM1YmZlY2U3MjMzYjA1YmE3Nzk2MWQzMzhlZDc4
        MjZkM2QyNjAxMzViYTMzNzA1MjMxYzAxNjMzOTJhMDc4ZDViZWY1ODM3ZGViZTZk
        MTAwMDgyMWZjNzkzMzZmN2EwNjg4NTI0YWQ2OTY3ODM=
        -----END PRIVATE KEY for erd1q533cqtr8y4q0r2maavr0h47d5gqpqslc7fndaaqdzzjfttfv7ps284zhq-----`
    },
    Geoge: {
        name:"George",
        account:"erd1gqupqgwzt75m94emg9k2slqkpg2t3k5mxr4dazncecappt98gcnq66tphc",
        pem:`-----BEGIN PRIVATE KEY for erd1gqupqgwzt75m94emg9k2slqkpg2t3k5mxr4dazncecappt98gcnq66tphc-----
        MGUzNDY1MGQ1YzUyYjM2ZGMxZTQ5ZDU2YWRjYmNiMTNjZjljZmEwZDc1ZDg0Nzk0
        ZDc0NTVmYzUzMjNkM2EwZjQwMzgxMDIxYzI1ZmE5YjJkNzNiNDE2Y2E4N2MxNjBh
        MTRiOGRhOWIzMGVhZGU4YTc4Y2UzYTEwYWNhNzQ2MjY=
        -----END PRIVATE KEY for erd1gqupqgwzt75m94emg9k2slqkpg2t3k5mxr4dazncecappt98gcnq66tphc-----`
    },
    Hugo: {
        name:"Hugo",
        account:"erd18hq8hank5cwc85ek6g7xdxcerstu8dhv7d3kldcwkl75fcgtn9ts8ujjw0",
        pem:`-----BEGIN PRIVATE KEY for erd18hq8hank5cwc85ek6g7xdxcerstu8dhv7d3kldcwkl75fcgtn9ts8ujjw0-----
        NGJhMzk4YzkwYTZlY2EwNjEwNTJlMDk5ZTVlYWEzNGM4ZDEyNTI1ZDJmM2FiNzA1
        OTA1ZjU2YWNhYTcyOWE5YzNkYzA3YmY2NzZhNjFkODNkMzM2ZDIzYzY2OWIxOTFj
        MTdjM2I2ZWNmMzYzNmZiNzBlYjdmZDQ0ZTEwYjk5NTc=
        -----END PRIVATE KEY for erd18hq8hank5cwc85ek6g7xdxcerstu8dhv7d3kldcwkl75fcgtn9ts8ujjw0-----`
    },
    Ivar: {
        name:"Ivar",
        account:"erd1q83amu9dfv66kysnzpdg37la4jnnandxrxq7pjjngkdgghc3cyeqys3jx3",
        pem:`-----BEGIN PRIVATE KEY for erd1q83amu9dfv66kysnzpdg37la4jnnandxrxq7pjjngkdgghc3cyeqys3jx3-----
        NDI0MGYwZmZmN2ZjNmJlZDI4NmNiYzUxYzRjZGY0NzNjMDBmZDVlZGUzMWIzZTQz
        OTY2ZTJhYjFkOGY5NzY1ZTAxZTNkZGYwYWQ0YjM1YWIxMjEzMTA1YTg4ZmJmZGFj
        YTczZWNkYTYxOTgxZTBjYTUzNDU5YTg0NWYxMWMxMzI=
        -----END PRIVATE KEY for erd1q83amu9dfv66kysnzpdg37la4jnnandxrxq7pjjngkdgghc3cyeqys3jx3-----`
    },
    John: {
        name:"John",
        account:"erd18kaedtm0g7y6qxa5xyh07a2gjver4zszj04flgqwtqhl5vkd9k7sx947kn",
        pem:`-----BEGIN PRIVATE KEY for erd18kaedtm0g7y6qxa5xyh07a2gjver4zszj04flgqwtqhl5vkd9k7sx947kn-----
        Yzc2ZDkzNWEyMTcwMDUzNjllNTgwZjcyZTEzYmNkOGE4NjY3YjczZWYzZWIyMjdl
        OGUxYzYyOWVhZTc2MTkwZjNkYmI5NmFmNmY0Nzg5YTAxYmI0MzEyZWZmNzU0ODkz
        MzIzYThhMDI5M2VhOWZhMDBlNTgyZmZhMzJjZDJkYmQ=
        -----END PRIVATE KEY for erd18kaedtm0g7y6qxa5xyh07a2gjver4zszj04flgqwtqhl5vkd9k7sx947kn-----`
    },
    Zena: {
        name:"Zena",
        account:"erd1xgamt9gqengy3a77f6zz8xnx6metrytrfc9mkwrdk0fjc3huz8dqs6sdph",
        pem:`-----BEGIN PRIVATE KEY for erd1xgamt9gqengy3a77f6zz8xnx6metrytrfc9mkwrdk0fjc3huz8dqs6sdph-----
        MTZkYmQwNzk3ZTBjN2NkNjJlY2JhYjRmZTdhYTQ1ODI1ZTg3MTc4NjllYzE2Njkx
        ZDg5M2JkNTI2OGM3MGZmNzMyM2JiNTk1MDBjY2QwNDhmN2RlNGU4NDIzOWE2NmQ2
        ZjJiMTkxNjM0ZTBiYmIzODZkYjNkMzJjNDZmYzExZGE=
        -----END PRIVATE KEY for erd1xgamt9gqengy3a77f6zz8xnx6metrytrfc9mkwrdk0fjc3huz8dqs6sdph-----`
    }
}

export const NewParachainAccounts = {
    Alice_Stash:{
        name:"Alice_Stash",
        account: "5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY",
        key: () => keyring.createFromUri("//Alice//stash", undefined, 'sr25519')
    },
    Bob:{
        name:"Bob",
        account: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
        key:() => keyring.createFromUri("//Bob", undefined, 'sr25519')
    },
    Bob_Stash:{
        name:"Bob_Stash",
        account: "5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc",
        key:() => keyring.createFromUri("//Bob//stash", undefined, 'sr25519')
    }
}
