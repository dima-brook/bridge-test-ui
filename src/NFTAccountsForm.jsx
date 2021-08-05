import React, { useCallback, useState, useEffect } from 'react';
import XPLogo from './assets/SVG/XPLogo';
import SwapChains from './SwapChains';
import Selector from './Selector';
import SendButton from './SendButton';
import "./style.css";
import {
    NewElrondAccounts, NewParachainAccounts
} from './Config';

import { chains } from './consts';
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
// import { ChainHandlers } from './helper_functions'
// import * as Elrond from "@elrondnetwork/dapp";
import SelectAssets from "./SelectAsset/index";


const PredefinedNFTAccounts = () => {


    // =====================================================
    //                      S T A T E
    // =====================================================

    const [state, setState] = useState({
        // Accounts
        sourceAcc: NewParachainAccounts['Alice_Stash'].name,
        targetAcc: NewElrondAccounts['Alice'].name,

        sourceAccounts: Object.keys(NewParachainAccounts),
        targetAccounts: Object.keys(NewElrondAccounts),

        // Blockchains
        from: chains[0],
        to: chains[1],

        // NFT images
        imgs: [],

        nftToken: '',
        nftNonce: '',

        nonceDisplay: 'none',

        sendInactive: false,

        execResult: ''

    })

    // =====================================================
    //                        HOOKS
    // =====================================================

    useEffect(() => {
        if (state.from === chains[1]) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setState({ ...state, 
                nonceDisplay: 'flex' 
                
            })
        } else {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setState({ ...state, 
                nonceDisplay: 'none' 
            })
        }

        console.log(state.nonceDisplay)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.from])

    // =====================================================
    //                    EVENT HANDLERS
    // =====================================================

    const handleFromChange = (newValue) => {
        setState({ ...state, from: newValue })

        // Avoid the same source & target blockchains
        if (state.to === newValue) {
            chains.forEach(chain => {
                if (chain !== state.to) {
                    setState({ ...state, to: chain })
                    return state.from;
                }
            })
        }
    }


    const handleSwapChains = () => {
        const [from, to] = [state.to, state.from];
        setState({ ...state, from, to });
    }

    const handleToChange = (newValue) => {
        setState({ ...state, to: newValue })

        // Avoid the same source & target blockchains
        if (state.from === newValue) {
            chains.forEach(chain => {
                if (chain !== state.from) {
                    setState({ ...state, from: chain })
                }
            })
        }
    }

    const imageSelectCb = useCallback(hash => {
        switch (state.from) {
            case chains[0]: {
                setState({ ...state, nftToken: hash })
                break;
            }
            case chains[1]: {
                const parts = hash.split("-");
                setState({
                    ...state,
                    nftNonce: parseInt(parts.pop(), 16),
                    nftToken: parts.join("-")
                })
                break;
            }

            default:
                break;

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNftChange = (e) => {
        setState({ ...state, nftToken: e.target.value });
    }

    const handleNonceChange = (e) => {
        setState({ ...state, nftNonce: e.target.value })
    }

    const handleFromAccountChange = (e) => {
        setState({...state, sourceAcc:e})

        console.log(e, state.sourceAcc, state.sourceAccounts)
    }

    const handleSendClick = () => {

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
                                    value={state.from}
                                    data={chains}
                                    onChange={handleFromChange}
                                />
                            </XPColumn>
                            <div className="swap-button-absolute">
                                <SwapChains onClick={handleSwapChains} />
                            </div>
                            <XPColumn>
                                <XPLabel>To</XPLabel>
                                <Selector
                                    value={state.to}
                                    data={chains}
                                    onChange={handleToChange}
                                />
                            </XPColumn>
                        </div>

                        <SelectAssets imgs={state.imgs} cb={imageSelectCb} />
                        <XPRow>
                            <XPColumn>
                                <XPSpace />
                            </XPColumn>
                        </XPRow>

                        {/* -------------------------------------------- */}
                        {/* --------- The second Row of elements ------- */}
                        {/* -------------------------------------------- */}

                        <XPLabel>Non-Fungible Token</XPLabel>
                        <XPRow>
                            <XPTransaction
                                value={state.nftToken}
                                onChange={handleNftChange}
                            ></XPTransaction>

                        </XPRow>

                        <XPRow>
                            <XPColumn>
                                <XPSpace />
                            </XPColumn>
                        </XPRow>

                        {/* -------------------------------------------- */}
                        {/* ---------- The third Row of elements ------- */}
                        {/* -------------------------------------------- */}

                        <div className="from-to-style">

                            <XPColumn>
                                <XPLabel>Source Account</XPLabel>
                                <Selector
                                    value={state.sourceAcc}
                                    data={state.sourceAccounts}
                                    onChange={handleFromAccountChange}
                                />
                            </XPColumn>

                            <XPColumn>
                                <XPLabel>Target Account</XPLabel>
                                <Selector
                                    value={state.targetAcc}
                                    data={state.targetAccounts}
                                    onChange={handleToChange}
                                />
                            </XPColumn>
                        </div>

                        {/* -------------------------------------------- */}
                        {/* ---------- The fifth Row of elements ------- */}
                        {/* -------------------------------------------- */}


                        <XPLabel style={{ display: `${state.nonceDisplay}` }}>ESDT NFT nonce</XPLabel>
                        <XPRow
                            style={{ display: `${state.nonceDisplay}` }}
                        >
                            <XPTransaction
                                value={state.nftNonce}
                                onChange={handleNonceChange}
                            ></XPTransaction>

                        </XPRow>

                        <XPRow
                            style={{ display: `${state.nonceDisplay}` }}
                        >
                            <XPColumn>
                                <XPSpace />
                            </XPColumn>
                        </XPRow>


                        <SendButton
                            onClick={handleSendClick}
                            inactive={state.sendInactive}
                            state={state.execResult}
                        />



                    </XPFlexCenter>
                </XPBoxCenter>
            </XPMain>
        </XPApp>
    )

}

export default PredefinedNFTAccounts;