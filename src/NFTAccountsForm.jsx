import React, { useCallback, useState, useEffect } from 'react';
import XPLogo from './assets/SVG/XPLogo';
import SwapChains from './SwapChains';
import Selector from './Selector';
import SendButton from './SendButton';
import "./style.css";
import {
    elrondTxnPrefix,
    NewElrondAccounts, NewParachainAccounts, polkadotBlockPrefix
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
import { ChainHandlers, txnSocket } from './helper_functions'
import SelectAssets from "./SelectAsset/index";
import Modal from 'react-modal';

import ElrondSVG from './assets/SVG/Elrond';
import Polka from './assets/SVG/substrateLogo';
import { decodeAddress } from '@polkadot/keyring';
import { Address, UserSigner } from '@elrondnetwork/erdjs/out';
import LoadingDots from './LoadingDots'


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

    const [sourceAcc, setSourceAcc] = useState(NewParachainAccounts['Alice_Stash'].name);
    const [targetAcc, setTargetAcc] = useState(NewElrondAccounts['Alice'].name);
    const [isOpen, setOpen] = useState(false)
    const [sourceAccounts, setSourceAccounts] = useState(Object.keys(NewParachainAccounts));
    const [targetAccounts, setTargetAccounts] = useState(Object.keys(NewElrondAccounts));
    const toggle = () => {

        setOpen(!isOpen)
    }
    const [from, setFrom] = useState(chains[0]);
    const [to, setTo] = useState(chains[1]);

    const [imgs, setImgs] = useState([]);

    const [nftToken, setNftToken] = useState('');

    const [nftNonce, setNftNonce] = useState('');

    const [nonceDisplay, setNonceDisplay] = useState('none');

    const [sendInactive, setSendInactive] = useState(false);

    const [execResult, setExecResult] = useState('');

    const [txUrl, setTxUrl] = useState('');

    const [fromOpen, setFromOpen] = useState(false);

    const [toOpen, setToOpen] = useState(false);

    const [fromAccOpen, setFromAccOpen] = useState(false);

    const [toAccOpen, setToAccOpen] = useState(false);

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
    }, [from]);

    const clearNft = () => {
        setNftToken('');
        setNftNonce('');
    }

    const populateImages = useCallback(async () => {
        clearNft();

        let addressGetter;
        let address;
        let chain;

        setImgs([]);

        switch (from) {
            case chains[0]: {
                addressGetter = (addr) => {
                    decodeAddress(NewParachainAccounts[addr].account)

                    return NewParachainAccounts[addr].account;
                };
                chain = await ChainHandlers.polka();
                break;
            }
            case chains[1]: {
                addressGetter = (addr) => (new Address(NewElrondAccounts[addr].account)).toString(); // sanity check
                chain = await ChainHandlers.elrd();
                break;
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

        setImgs((await Promise.all(nft_imgs)).filter(({ url }) => url !== undefined));
    }, [from, sourceAcc]);

    useEffect(() => {
        (async () => {
            await populateImages();
        })();
    }, [populateImages]);

    // =====================================================
    //                    EVENT HANDLERS
    // =====================================================

    const outsideClick = () => {

        if (fromOpen) { setFromOpen(false) }
        if (toOpen) { setToOpen(false) }
        if (fromAccOpen) { setFromAccOpen(false) }
        if (toAccOpen) (setToAccOpen(false))

    }

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
        setExecResult('')
        setSendInactive(false)
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
    }, [from]);

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

    useEffect(() => {
        setTxUrl('');
    }, [from, to, sourceAcc, targetAcc, nftToken]);

    const clearFields = () => {

        setImgs([]);
        setFrom(chains[0]);
        setTo(chains[1]);
        setSourceAcc(NewParachainAccounts['Alice_Stash'].name);
        setTargetAcc(NewElrondAccounts['Alice'].name);
        setSourceAccounts(Object.keys(NewParachainAccounts));
        setTargetAccounts(Object.keys(NewElrondAccounts));

        clearNft();
    }

    const handleSendClick = async () => {
        setSendInactive(true);
        setTxUrl('');

        let info;
        let call;
        let sender;
        let res;
        let target;
        let prefix;
        let txWait;
        let url;

        if (from === chains[0]) {
            const acc = NewParachainAccounts[sourceAcc];
            info = nftToken;
            const polka = await ChainHandlers.polka();
            if (await ChainHandlers.checkWrappedOnElrond(acc.account, nftToken)) {
                call = polka.unfreezeWrappedNft;
            } else {
                call = polka.transferNftToForeign;
            }
            sender = { sender: acc.key() };
            target = NewElrondAccounts[targetAcc].account;

            // We are waiting for the action to execute on elrond
            prefix = elrondTxnPrefix;
            txWait = txnSocket.waitTxHashElrond;
        } else {
            const acc = NewElrondAccounts[sourceAcc];
            const elrd = await ChainHandlers.elrd();
            if (await ChainHandlers.checkWrappedOnPolkadot(acc.account, nftToken)) {
                call = elrd.unfreezeWrappedNft;
                info = nftNonce;
            } else {
                call = elrd.transferNftToForeign;
                info = { token: nftToken, nonce: nftNonce };
            }
            sender = UserSigner.fromPem(acc.pem);
            target = NewParachainAccounts[targetAcc].account;

            // We are waiting for the action to execute on polkadot
            prefix = polkadotBlockPrefix;
            txWait = txnSocket.waitTxHashPolkadot;
        }

        try {
            const [, id] = await call(
                sender,
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

            // await new Promise(r => setTimeout(r, 3000));
            // setSendInactive(false);
            // setExecResult('');
            clearFields();
            if (res === 'success') {
                toggle()
                setTxUrl(url);
            }
        }
    }

    // const [fromOpen, setFromOpen] = useState(false)
    // const [toOpen, setToOpen] = useState(false)
    // const [fromAccOpen, setFromAccOpen] = useState(false)
    // const [toAccOpen, setToAccOpen] = useState(false)


    // ==========================================================
    //                            J S X
    // ==========================================================

    return (
        <XPApp
            onClick={outsideClick}
        >
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
                                    open={fromOpen}
                                    informOpen={setFromOpen}
                                />
                            </XPColumn>
                            {window.innerWidth <= 600 ? <XPColumn>
                                <XPLabel>Source Account</XPLabel>
                                <Selector
                                    img={from === chains[0] ? <Polka /> : <ElrondSVG />}
                                    value={sourceAcc}
                                    data={sourceAccounts}
                                    onChange={handleFromAccountChange}
                                    open={toOpen}
                                    informOpen={setToOpen}
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
                                    open={toAccOpen}
                                    informOpen={setToAccOpen}
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
                                    open={fromAccOpen}
                                    informOpen={setFromAccOpen}
                                />
                            </XPColumn> : ''}

                            <XPColumn>
                                <XPLabel>Target Account</XPLabel>
                                <Selector
                                    img={to === chains[0] ? <Polka /> : <ElrondSVG />}
                                    value={targetAcc}
                                    data={targetAccounts}
                                    onChange={handleToAccountChange}
                                    open={toAccOpen}
                                    informOpen={setToAccOpen}
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
                        <Modal
                            isOpen={isOpen}
                            shouldCloseOnOverlayClick={true}
                            onRequestClose={toggle}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <a className="tx-link" href={txUrl} target="_blank" rel="noreferrer">View Transaction</a>
                        </Modal>

                        <XPRow style={{ flexDirection: 'column' }}>
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

                        <XPRow style={{ flexDirection: 'column' }}>

                            <XPLabel style={{ flexDirection: 'column', color: 'white', fontSize: '16px', fontWeight: 'bolder' }}>
                                {from === 'Elrond' && !execResult  && sendInactive ? 'Transferring NFTs from Elrond Devnet can take more than 30 seconds.' : ''}
                            </XPLabel>

                        </XPRow>

                    </XPFlexCenter>

                </XPBoxCenter>
            </XPMain>
        </XPApp>
    )

}

export default PredefinedNFTAccounts;
