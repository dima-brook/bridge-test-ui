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
import { ChainHandlers } from './helper_functions'
import * as Elrond from "@elrondnetwork/dapp";
import SelectAssets from "./SelectAsset/index";
import ElrondSVG from './assets/SVG/Elrond';
import Polka from './assets/SVG/substrateLogo';


const PredefinedNFTAccounts = () => {


    // =====================================================
    //                      S T A T E
    // =====================================================

    const [sourceAcc, setSourceAcc] = useState(NewParachainAccounts['Alice_Stash'].name);
    const [targetAcc, setTargetAcc] = useState(NewElrondAccounts['Alice'].name);

    const [sourceAccounts, setSourceAccounts] = useState(Object.keys(NewParachainAccounts));
    const [targetAccounts, setTargetAccounts] = useState(Object.keys(NewElrondAccounts));

    const [from, setFrom] = useState(chains[0]);
    const [to, setTo] = useState(chains[1]);

    const [imgs, setImgs] = useState([]);

    const [nftToken, setNftToken] = useState('');

    const [nftNonce, setNftNonce] = useState();

    const [nonceDisplay, setNonceDisplay] = useState('none');

    const [sendInactive, setSendInactive] = useState(false);

    const [execResult, setExecResult] = useState('');

    // =====================================================
    //                        HOOKS
    // =====================================================

    useEffect(() => {
        if (from === chains[1]) {
            setNonceDisplay('flex');
        } else {
            setNonceDisplay('none');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from])

    // =====================================================
    //                    EVENT HANDLERS
    // =====================================================

    const handleFromChange = (newValue) => {

        console.log(newValue, from)
        if (newValue !== from) {
            handleSwapChains()
        }
    }


    const handleSwapChains = () => {
        const [
            _from,
            _to,
            _sourceAcc,
            _targetAcc,
            _sourceAccounts,
            _targetAccounts
        ] = [
                to,
                from,
                targetAcc,
                sourceAcc,
                targetAccounts,
                sourceAccounts
            ];

        setFrom(_from);
        setTo(_to);
        setSourceAcc(_sourceAcc);
        setTargetAcc(_targetAcc);
        setSourceAccounts(_sourceAccounts);
        setTargetAccounts(_targetAccounts);

    }

    const handleToChange = (newValue) => {

        console.log(newValue, to)
        if (newValue !== to) {
            handleSwapChains()
        }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNftChange = (e) => {
        setNftToken(e.target.value);
    }

    const handleNonceChange = (e) => {
        setNftNonce(e.target.value);
    }

    const handleFromAccountChange = (newValue) => {
        setSourceAcc(newValue);
    }

    const handleToAccountChange = newValue => {
        setTargetAcc(newValue);
    }

    const handleSendClick = async () => {
        setSendInactive(true);

        let info;
        let call;
        let chain;
        let sender;
        let res;

        try {
            // Execution code:




            res = 'success';
        } catch (error) {
            console.log("err", error);
            res = 'failure';
        } finally {
            setExecResult(res);

            await new Promise(r => setTimeout(r, 3000));
            setSendInactive(false);
            setExecResult('');
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
                            <div className="swap-button-absolute">
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

                        <SelectAssets imgs={imgs} cb={imageSelectCb} />
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
                        {/* ---------- The third Row of elements ------- */}
                        {/* -------------------------------------------- */}

                        <div className="from-to-style">

                            <XPColumn>
                                <XPLabel>Source Account</XPLabel>
                                <Selector
                                    img={from === chains[0] ? <Polka /> : <ElrondSVG />}
                                    value={sourceAcc}
                                    data={sourceAccounts}
                                    onChange={handleFromAccountChange}
                                />
                            </XPColumn>

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
                        {/* ---------- The fifth Row of elements ------- */}
                        {/* -------------------------------------------- */}


                        <XPLabel style={{ display: `${nonceDisplay}` }}>ESDT NFT nonce</XPLabel>
                        <XPRow
                            style={{ display: `${nonceDisplay}` }}
                        >
                            <XPTransaction
                                value={nftNonce}
                                onChange={handleNonceChange}
                            ></XPTransaction>

                        </XPRow>

                        <XPRow
                            style={{ display: `${nonceDisplay}` }}
                        >
                            <XPColumn>
                                <XPSpace />
                            </XPColumn>
                        </XPRow>


                        <SendButton
                            onClick={handleSendClick}
                            inactive={sendInactive}
                            state={execResult}
                        />



                    </XPFlexCenter>
                </XPBoxCenter>
            </XPMain>
        </XPApp>
    )

}

export default PredefinedNFTAccounts;