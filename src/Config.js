import { Keyring } from '@polkadot/keyring';
import { chains } from "./consts";

const polkadotBlockPrefix = "https://explorer.xp.network/#/explorer/query";
const elrondTxnPrefix = "https://devnet-explorer.elrond.com/transactions";

const keyring = new Keyring();

export const ChainConfig = {
    "xpnode": "ws://localhost:9944", //"wss://bridge.xp.network:443/node", //
    "elrond_node": "https://devnet-api.elrond.com",
    "elrond_minter": "erd1qqqqqqqqqqqqqpgqe8lzlc2husrrthhyavhcj50kpneqzf9ms3ys4anmfd", //"erd1qqqqqqqqqqqqqpgq7ysztrj922cs53e5wh2vdmeds9pd69wms3ysy3tyy9", //
    "elrond_event_rest": "http://localhost:3000", //"https://bridge.xp.network/event_rest", //
    "elrond_esdt": "XPNET-1dba6e", //"XPNET-cdf688", //
    "elrond_esdt_nft": "XPNFT-594a29", //"XPNFT-ff3b98", //
    "validator_txn_socket": "ws://localhost:3001/", //"wss://bridge.xp.network/", //
    "web3_minters": {
        'HECO': "0xEf5b44491d1da9E30803d666Fb7BdD06141f0b82",
        "BSC": "0x471bF01b8C622C00652F336651747B1A5d37b5ea",
        "ROPSTEN": "0x66b07bC16F499a0e835c5b277AF19555a05578c1"
    },
    "web3_erc1155": {
        "HECO": "0x65c823E97d61F5Db30a433612a4AF3CC26aeD4ba",
        "BSC": "0xaFFA531E294E8e4b6647F993c12216D8CFA90903",
        "ROPSTEN": "0x5d9f23f7253Efef3926E934829Ab65C0092E218B",
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


const NewElrondAccounts = {
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

const NewParachainAccounts = {
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

const Web3Accounts = {
    "ACC1": {
        name: "ACC1",
        account: "0x50aCEC08ce70aa4f2a8ab2F45d8dCd1903ea4E14",
        key: "0xbaedb25b3352638942e80aa3dbc2d54f2bab423849cce21a73c164f0c21103c8"
    },
    "ACC2": {
        name: "ACC2",
        account: "0xae87208a5204B6606d3AB177Be5fdf62267Cd499",
        key: "0xd32cb8a5e3541a3d4c33d7e0669371a4b5b5738400e85239760e51b67fb9207b"
    },
    "ACC3": {
        name: "ACC3",
        account: "0x5002258315873AdCbdEF25a8E71C715A4f701dF5",
        key: "0x03b1091c3158ec4a38185fb65a8f2159650396aa6efd3dec5b0fddd44375a0b1"
    }
}

export const ExplorerPrefix = Object.fromEntries(
    [
        [chains[0], polkadotBlockPrefix],
        [chains[1], elrondTxnPrefix],
        [chains[2], "heco/"],
        [chains[3], "bsc/"],
        [chains[4], "ropsten/"]
    ]
)

export const PredefinedAccounts = Object.fromEntries(
    [
        [chains[0], NewParachainAccounts],
        [chains[1], NewElrondAccounts],
        [chains[2], Web3Accounts],
        [chains[3], Web3Accounts],
        [chains[4], Web3Accounts]
    ]
)
