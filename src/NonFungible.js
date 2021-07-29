import React, { useState, useEffect, useRef } from 'react';
import * as Elrond from "@elrondnetwork/dapp";

// Local imports
import XPLogo from './assets/SVG/XPLogo';
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
import SwapChains from './SwapChains';
import Selector from './Selector';
import SendButton from './SendButton';
import { ChainHandlers } from './helper_functions';
import { Address } from '@elrondnetwork/erdjs/out';
import SelectAssets from "./SelectAsset/index";


/********************************************************
 *                    APP Component                     *
 ********************************************************/
function NonFungible() {
  // =====================================================
  //                      S T A T E
  // =====================================================

  // Source blockchain
  const sourceAcc = useRef('');
  // Target Blockchain
  const targetAcc = useRef('');

  // Source blockchain
  const [from, setFrom] = useState(chains[0]);
  // Target Blockchain
  const [to, setTo] = useState(chains[1]);

  // NFT hash identifier
  const nft = useRef({token: '', nonce: 0});

  // ESDT NFT nonce
  const [nonceDisplay, setNonceDisplay] = useState('none');

  // Enabled / disaabled SEND button states
  const [sendInactive, setSendInactive] = useState(false);
  // SEND button states: Success = green, Failure = red
  const [execResult, setExecResult] = useState('');

  const sendElrdTx = Elrond.useSendTransaction();


  useEffect(() => {
    if (from === chains[1]) {
      setNonceDisplay('flex');
    }else{
      setNonceDisplay('none');
    }
  }, [from]);

  // =====================================================
  //                    EVENT HANDLERS
  // =====================================================

  /**
   * Swap To <=> From blockchains
   * 
   * button click handler
   */
  const handleSwapChains = () => {
    const temp_to = to;
    setTo(from);
    setFrom(temp_to);

  }

  /**
   * Mutates the source blockchain
   * @param {String} newValue 
   */
  const handleFromChange = (newValue) => {
    setFrom(newValue)

    // Avoid the same source & target blockchains
    if (to === newValue) {
      chains.forEach(chain => {
        if (chain !== to) {
          setTo(chain)
          return from;
        }
      })
    }

  }

  /**
   * Mutates the target blockchain
   * @param {String} newValue 
   */
  const handleToChange = (newValue) => {
    setTo(newValue)

    // Avoid the same source & target blockchains
    if (from === newValue) {
      chains.forEach(chain => {
        if (chain !== from) {
          setFrom(chain)
        }
      })
    }
  }

  /**
   * Mutates the NFT hash string
   * @param {Event} e an event linking to the triggering element
   */
  const handleNftChange = (e) => {
    nft.current.token = e.target.value;
  }

  const handleNonceChange = (e) => {
    nft.current.nonce = e.target.value;
  }

  const nftElrond = async () => {
    let txGen;
    let info;

    const elrd = await ChainHandlers.elrd();
  
    if (await ChainHandlers.checkWrappedOnPolkadot(sourceAcc.current.value, nft.current.token)) {
      txGen = elrd.unsignedUnfreezeNftTxn;
      info = nft.current.nonce;
    } else {
      txGen = elrd.unsignedTransferNftTxn;
      info = nft.current;
    }

    const tx = txGen(new Address(sourceAcc.current.value), targetAcc.current.value, info);
    setSendInactive(false);
    setExecResult('');

    sendElrdTx({
      transaction: tx,
      callbackRoute: "/processelrdnft",
    });
  }

  /**
   * SEND button onClick handler
   */
  const handleSendClick = async () => {
    setSendInactive(true);

    let info;
    let call;
    let chain;
    let sender;
    let res;
  
    if (from === chains[0]) {
        info = nft.current.token;
        chain = await ChainHandlers.polka();
        if (await ChainHandlers.checkWrappedOnElrond(sourceAcc.current.value, nft.current.token)) {
          call = chain.unfreezeWrappedNft;
        } else {
          call = chain.transferNftToForeign;
        }
        sender = await ChainHandlers.polkadotSigner(sourceAcc.current.value)
    } else {
        return await nftElrond();
    }

    try {
      console.log(call);
      await call(
          sender,
          targetAcc.current.value,
          info
      );

      res = 'success';
    } catch (error) {
      console.log("err", error);
      res = 'failure';
    }

    setExecResult(res);

    await new Promise(r => setTimeout(r, 3000));
    setSendInactive(false);
    setExecResult('');
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
                  value={to}
                  data={chains}
                  onChange={handleToChange}
                />
              </XPColumn>
            </div>

<SelectAssets/>
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

              <XPLabel>Source Account</XPLabel>
            <XPRow>
              <XPTransaction
                ref={sourceAcc}
              ></XPTransaction>

            </XPRow>

            <XPRow>
              <XPColumn>
                <XPSpace />
              </XPColumn>
            </XPRow>

            {/* -------------------------------------------- */}
            {/* --------- The fourth Row of elements ------- */}
            {/* -------------------------------------------- */}

              <XPLabel>Target Account</XPLabel>
            <XPRow>
              <XPTransaction
                ref={targetAcc}
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
  );
}

export default NonFungible;