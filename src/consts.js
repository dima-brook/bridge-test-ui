export const tokens = ['XPNET', 'EGLD', 'HT', "BNB", "ETH"];
export const chains = ['XP.network', 'Elrond', 'HECO', 'BSC', 'ROPSTEN'];
export const CHAIN_INFO = {
    'XP.network': { nonce: 1, native: 'XPNET' },
    'Elrond': { nonce: 2, native: 'EGLD' },
    'HECO': {
        nonce: 3,
        native: tokens[2],
        chainId: 256,
        rpcUrl: "https://http-testnet.hecochain.com"
    },
    'BSC': {
        nonce: 4,
        native: tokens[3],
        chainId: 97, 
        rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545"
    },
    'ROPSTEN': {
        nonce: 5,
        native: tokens[4],
        chainId: 3,
        rpcUrl: "https://ropsten.infura.io/v3/182b3d3fb2d14d5fbe7421348624d1ce"
    }
};
export const web3TokenStds = ["ERC721", "ERC1155"];
export const stateColors = {'success': '#28a745', 'failure': '#dc3545', 'disabled': '#374462', 'enabled': '#045adb'};
export const stateText = {
    'success': 'Success',
    'failure': 'Failure',
    'disabled': 'Executing',
    'enabled': 'Send'
}