import React, { useCallback, useState, useEffect } from 'react';
import XPLogo from './assets/SVG/XPLogo';
import SwapChains from './SwapChains';
import Selector from './Selector';
import SendButton from './SendButton';
import "./style.css";
import {
    PredefinedAccounts,
    ExplorerPrefix,
    ChainConfig
} from './Config';

import { chains, CHAIN_INFO, web3TokenStds } from './consts';
import {
    XPApp,
    XPMain,
    XPBoxCenter,
    XPFlexCenter,
    XPTitle,
    XPRow,
    XPColumn,
    XPLabel,
    XPTransaction,
    XPSpace
} from './StyledComponents'
import { ChainHandlers, txnSocket } from './helper_functions'
import SelectAssets from "./SelectAsset/index";
import Modal from 'react-modal';

import ElrondSVG from './assets/SVG/Elrond';
import Polka from './assets/SVG/substrateLogo';
import { decodeAddress } from '@polkadot/keyring';
import { Address, UserSigner } from '@elrondnetwork/erdjs/out';
import LoadingDots from './LoadingDots'
import { BigNumber } from "bignumber.js";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        backgroundColor: '#051937',
        padding: '80px 65px',
        marginRight: '-50%',
        borderRadius: '6px',
        transform: 'translate(-50%, -50%)',
        borderColor: '#374462'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.8)'
    }
};

const PredefinedNFTAccounts = () => {


    // =====================================================
    //                      S T A T E
    // =====================================================

    const [sourceAcc, setSourceAcc] = useState("Alice_Stash");
    const [targetAcc, setTargetAcc] = useState("Alice");
    const [isOpen, setOpen] = useState(false)
    const [sourceAccounts, _setSourceAccounts] = useState(Object.keys(PredefinedAccounts[chains[0]]));
    const [targetAccounts, _setTargetAccounts] = useState(Object.keys(PredefinedAccounts[chains[1]]));
    const toggle = () => {

        setOpen(!isOpen)
    }
    const [from, _setFrom] = useState(chains[0]);
    const [to, _setTo] = useState(chains[1]);

    const [imgs, setImgs] = useState([]);

    const [nftToken, setNftToken] = useState('');
    const [nftNonce, setNftNonce] = useState('');
    const [contract, setContract] = useState('');
    const [web3Std, setWeb3Std] = useState(web3TokenStds[0]);

    const [sendInactive, setSendInactive] = useState(false);

    const [execResult, setExecResult] = useState('');

    const [txUrl, setTxUrl] = useState('');

    // =====================================================
    //                        HOOKS
    // =====================================================
    const setFrom = useCallback((newFrom) => {
        const fromAccs = Object.keys(PredefinedAccounts[newFrom]);

        _setFrom(newFrom);
        _setSourceAccounts(fromAccs);
        setSourceAcc(fromAccs[0]);

        (CHAIN_INFO[newFrom].chainId !== undefined) && ChainHandlers.setWeb3Chain(newFrom);
    }, [])

    const setTo = useCallback((newTo) => {
        const toAccs = Object.keys(PredefinedAccounts[newTo]);

        _setTo(newTo);
        _setTargetAccounts(toAccs);
        setTargetAcc(toAccs[0]);
    }, []);

    const nonceDisplay = useCallback(() => {
        return from === chains[1] ? "flex" : "none";
    }, [from]);

    const contractDisplay = useCallback(() => {
        return from === chains[2] || from === chains[3] || from === chains[4] ? "flex" : "none";
    }, [from]);

    const clearNft = () => {
        setNftToken('');
        setNftNonce('');
        setContract('');
    }

    const populateImages = useCallback(async () => {
        clearNft();

        let addressGetter;
        let address;
        let chain;

        if (PredefinedAccounts[from][sourceAcc] === undefined) {
            return;
        }

        setImgs([]);
        const addr_s = PredefinedAccounts[from][sourceAcc].account;

        switch (from) {
            case chains[0]: {
                addressGetter = () => {
                    decodeAddress(addr_s)

                    return addr_s;
                };
                chain = await ChainHandlers.polka();
                break;
            }
            case chains[1]: {
                addressGetter = () => (new Address(addr_s)).toString(); // sanity check
                chain = await ChainHandlers.elrd();
                break;
            }
            case chains[2]:
            case chains[3]:
            case chains[4]: { // TODO: impl
                return;
            }
            default:
                throw Error(`unhandled chain ${from}`);
        }

        try {
            address = addressGetter(sourceAcc);
        } catch (_) {
            return;
        }

        const nfts = await chain.listNft(address);
        const nft_imgs = Array.from(nfts.entries()).reverse().map(async ([hash, dat]) => {
            const url = await ChainHandlers.tryFetchNftAsImg(address, from, hash, dat);

            return { hash, url };
        });

        setImgs(await Promise.all(nft_imgs));
    }, [from, sourceAcc]);

    useEffect(() => {
        (async () => {
            await populateImages();
        })();
    }, [populateImages]);

    // =====================================================
    //                    EVENT HANDLERS
    // =====================================================

    const handleFromChange = (newValue) => {
        if (newValue === to) {
            handleSwapChains();
        } else {
            setFrom(newValue);
        }

        setExecResult('')
        setSendInactive(false)
    }


    const handleSwapChains = () => {
        const [
            _from,
            _to,
        ] = [
                to,
                from,
            ];

        setFrom(_from);
        setTo(_to);
    }

    const handleToChange = (newValue) => {
        if (newValue === from) {
            handleSwapChains();
        } else {
            setTo(newValue);
        }

        setExecResult('')
        setSendInactive(false)
    }

    const imageSelectCb = useCallback(hash => {
        switch (from) {
            case chains[0]: {
                setNftToken(hash)
                break;
            }
            case chains[1]: {
                const parts = hash.split("-");
                setNftNonce(parseInt(parts.pop(), 16));
                setNftToken(parts.join("-"))
                break;
            }

            default:
                break;

        }
    }, [from]);

    const handleNftChange = (e) => {
        setNftToken(e.target.value);
    }

    const handleNonceChange = (e) => {
        setNftNonce(e.target.value);
    }

    const handleContractChange = (e) => {
        setContract(e.target.value);
    }

    const handleToWeb3StdChange = (newValue) => {
        setWeb3Std(newValue);
    }

    const handleFromAccountChange = (newValue) => {
        setSourceAcc(newValue);
    }

    const handleToAccountChange = newValue => {
        setTargetAcc(newValue);
    }

    useEffect(() => {
        setTxUrl('');
    }, [from, to, sourceAcc, targetAcc, nftToken]);

    const handleSendClick = async () => {
        setSendInactive(true);
        setTxUrl('');

        let info;
        let call;
        let sender;
        let res;
        let txWait;
        let url;
        let wrap_check;
        let init_args = [];

        const acc = PredefinedAccounts[from][sourceAcc];
        const target = PredefinedAccounts[to][targetAcc].account;
        const prefix = ExplorerPrefix[to];

        const chain_nonce = CHAIN_INFO[to].nonce;
    
        switch (from) {
            case chains[0]: {
                info = nftToken;
                const polka = await ChainHandlers.polka();
                wrap_check = async () => {
                    if (await ChainHandlers.isWrappedPolkadotNft(acc.account, nftToken)) {
                        call = polka.unfreezeWrappedNft
                    } else {
                        init_args = [chain_nonce];
                        call = polka.transferNftToForeign;
                    }
                };
                sender = { sender: acc.key() };
                txWait = txnSocket.waitTxHashElrond;
                break;
            }
            case chains[1]: {
                const elrd = await ChainHandlers.elrd();
                wrap_check = async () => {
                    if (await ChainHandlers.isWrappedEsdtNft("", nftToken)) {
                        console.log("yes");
                        info = nftNonce;
                        call = elrd.unfreezeWrappedNft;
                    } else {
                        init_args = [chain_nonce];
                        info = { token: nftToken, nonce: nftNonce };
                        call = elrd.transferNftToForeign;
                    }
                }
                sender = UserSigner.fromPem(acc.pem);
                txWait = txnSocket.waitTxHashPolkadot;
                break;
            }
            case chains[2]:
            case chains[3]:
            case chains[4]: {
                info = nftToken;
                const w3 = await ChainHandlers.web3(false);
                wrap_check = async () => {
                    if (contract === ChainConfig.web3_erc1155[from]) {
                        console.log("from", from);
                        console.log("contract", contract);
                        console.log("conf", ChainConfig.web3_erc1155[from]);
                        info = nftToken;
                        call = w3.unfreezeWrappedNft;
                    } else {
                        init_args = [chain_nonce];
                        info = { contract_type: web3Std, contract, token: new BigNumber(nftToken) };
                        call = w3.transferNftToForeign;
                    }
                };
                sender = await ChainHandlers.web3AccountFromPkey(acc.key);
                txWait = new Promise(r => setTimeout(() => r(""), 10000));
                break;
            }
            default:
                throw Error(`unhandled chain ${from}`);
        }
        await wrap_check();

        try {
            const [, id] = await call(
                sender,
                ...init_args,
                target,
                info
            );

            console.log("ID is", id);

            const hash = await txWait(id.toString());

            url = `${prefix}/${hash}`;

            setTxUrl(url);
            res = 'success';
        } catch (error) {
            console.log("err", error);
            res = 'failure';
        } finally {
            setExecResult(res);
            await new Promise(r => setTimeout(r, 1500));
            setSendInactive(false);
            if (res === 'success') {
                toggle()
                setTxUrl(url);
            }
            clearNft();
        }
    }



    // ==========================================================
    //                            J S X
    // ==========================================================

    return (
        <XPApp>
            <XPMain>
                <XPBoxCenter>
                    <XPFlexCenter>
                        <XPLogo />
                        <XPTitle>NFT Bridge</XPTitle>
                        {/* -------------------------------------------- */}
                        {/* ---------- The first Row of elements ------- */}
                        {/* -------------------------------------------- */}

                        <div className="from-to-style">

                            <XPColumn>
                                <XPLabel>From</XPLabel>
                                <Selector
                                    img={from === chains[0] ? <Polka /> : <ElrondSVG />}
                                    value={from}
                                    data={chains}
                                    onChange={handleFromChange}
                                />
                            </XPColumn>
                            {window.innerWidth <= 600 ? <XPColumn>
                                <XPLabel>Source Account</XPLabel>
                                <Selector
                                    img={from === chains[0] ? <Polka /> : <ElrondSVG />}
                                    value={sourceAcc}
                                    data={sourceAccounts}
                                    onChange={handleFromAccountChange}
                                />
                            </XPColumn> : ''}
                            {window.innerWidth <= 600 ? <><XPLabel>Select asset</XPLabel>
                                <SelectAssets imgs={imgs} cb={imageSelectCb} /></> : ''}
                            <div style={{ marginTop: window.innerWidth <= 600 ? '20px' : '' }} className="swap-button-absolute">
                                <SwapChains onClick={handleSwapChains} />
                            </div>
                            <XPColumn>
                                <XPLabel>To</XPLabel>
                                <Selector
                                    img={to === chains[0] ? <Polka /> : <ElrondSVG />}
                                    value={to}
                                    data={chains}
                                    onChange={handleToChange}
                                />
                            </XPColumn>
                        </div>

                        {/* -------------------------------------------- */}
                        {/* --------- The second Row of elements ------- */}
                        {/* -------------------------------------------- */}


                        <div className="from-to-style">

                            {window.innerWidth > 600 ? <XPColumn>
                                <XPLabel>Source Account</XPLabel>
                                <Selector
                                    img={from === chains[0] ? <Polka /> : <ElrondSVG />}
                                    value={sourceAcc}
                                    data={sourceAccounts}
                                    onChange={handleFromAccountChange}
                                />
                            </XPColumn> : ''}

                            <XPColumn>
                                <XPLabel>Target Account</XPLabel>
                                <Selector
                                    img={to === chains[0] ? <Polka /> : <ElrondSVG />}
                                    value={targetAcc}
                                    data={targetAccounts}
                                    onChange={handleToAccountChange}
                                />
                            </XPColumn>
                        </div>

                        {/* -------------------------------------------- */}
                        {/* ---------- The third Row of elements ------- */}
                        {/* -------------------------------------------- */}

                        {window.innerWidth > 600 ? <><XPLabel>Select asset</XPLabel>
                            <SelectAssets imgs={imgs} cb={imageSelectCb} /></> : ''}

                        <XPRow>
                            <XPColumn>
                                <XPSpace />
                            </XPColumn>
                        </XPRow>


                        <XPLabel>Non-Fungible Token</XPLabel>
                        <XPRow>
                            <XPTransaction
                                value={nftToken}
                                onChange={handleNftChange}
                            ></XPTransaction>

                        </XPRow>

                        <XPRow>
                            <XPColumn>
                                <XPSpace />
                            </XPColumn>
                        </XPRow>

                        {/* -------------------------------------------- */}
                        {/* ---------- The fifth Row of elements ------- */}
                        {/* -------------------------------------------- */}


                        <XPLabel style={{ display: nonceDisplay() }}>ESDT NFT nonce</XPLabel>
                        <XPRow
                            style={{ display: nonceDisplay() }}
                        >
                            <XPTransaction
                                value={nftNonce}
                                onChange={handleNonceChange}
                            ></XPTransaction>

                        </XPRow>

                        <XPRow
                            style={{ display: nonceDisplay() }}
                        >
                            <XPColumn>
                                <XPSpace />
                            </XPColumn>
                        </XPRow>

                        <XPLabel style={{ display: contractDisplay() }}>NFT Contract Address</XPLabel>
                        <XPRow
                            style={{ display: contractDisplay() }}
                        >
                            <XPTransaction
                                value={contract}
                                onChange={handleContractChange}
                            ></XPTransaction>

                        </XPRow>

                        <XPRow
                            style={{ display: contractDisplay() }}
                        >
                            <XPColumn>
                                <XPSpace />
                            </XPColumn>
                        </XPRow>

                        <XPLabel style={{ display: contractDisplay() }}>NFT Contract Token</XPLabel>
                        <XPRow style={{ display: contractDisplay() }} >
                                <Selector
                                    value={web3Std}
                                    data={web3TokenStds}
                                    onChange={handleToWeb3StdChange}
                                />
                        </XPRow>

                        <XPRow
                            style={{ display: contractDisplay() }}
                        >
                            <XPColumn>
                                <XPSpace />
                            </XPColumn>
                        </XPRow>

                        <Modal
                            isOpen={isOpen}
                            shouldCloseOnOverlayClick={true}
                            onRequestClose={toggle}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <a className="tx-link" href={txUrl} target="_blank" rel="noreferrer">View Transaction</a>
                        </Modal>

                        <XPRow style={{flexDirection: 'column'}}>
                            {
                                sendInactive && !execResult
                                    ? <LoadingDots />
                                    : ''
                            }
                        </XPRow>


                        <SendButton
                            onClick={handleSendClick}
                            inactive={sendInactive}
                            state={execResult}
                            from={from}
                        />
                    </XPFlexCenter>
                </XPBoxCenter>
            </XPMain>
        </XPApp>
    )

}

export default PredefinedNFTAccounts;