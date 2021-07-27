import React, { useState, useEffect, useRef } from 'react';

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

  /**
   * SEND button onClick handler
   */
  const handleSendClick = async () => {
    setSendInactive(true);

    let info;
    let call;
    let chain;
    let checkWrapped;
    let cbWrapped;
    let cbNormal;
    let sender;
    let res;

    const checkWrap = async () => {
      if (await checkWrapped(sourceAcc.current.value, nft.current.token)) {
        call = chain.unfreezeWrappedNft;
        cbWrapped && cbWrapped();
      } else {
        call = chain.transferNftToForeign;
        cbNormal && cbNormal();
      }
    };
  
    if (from === chains[0]) {
        info = nft.current.token;
        chain = await ChainHandlers.polka();
        checkWrapped = ChainHandlers.checkWrappedOnElrond.bind(ChainHandlers);
        sender = await ChainHandlers.polkadotSigner(sourceAcc.current.value)
    } else {
        chain = await ChainHandlers.elrd();
        checkWrapped = ChainHandlers.checkWrappedOnPolkadot;
        cbWrapped = () => info = nft.current.nonce;
        cbNormal = () => info = nft.current;
        sender = await ChainHandlers.elrondSigner(sourceAcc.current.value)
    }

    await checkWrap();

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

            <XPRow>
              <XPColumn>
                <XPSpace />
              </XPColumn>
            </XPRow>

            {/* -------------------------------------------- */}
            {/* --------- The second Row of elements ------- */}
            {/* -------------------------------------------- */}

            <XPRow>

              <XPLabel>Non-Fungible Token</XPLabel>
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

            <XPRow>
              <XPLabel>Source Account</XPLabel>
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

            <XPRow>
              <XPLabel>Target Account</XPLabel>
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

            <XPRow
              style={{ display: `${nonceDisplay}` }}
            >
              <XPLabel>ESDT NFT nonce</XPLabel>
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