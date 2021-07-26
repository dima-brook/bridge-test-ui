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
    setExecResult(true);

    let info;
    let chain;

    if (from == chains[0]) {
        info = nft.current.token;
        chain = await ChainHandlers.polka();
    } else {
        info = nft.current;
        chain = await ChainHandlers.elrd();
    }

    try {
      await chain.transferNftToForeign(
          sender,
          targetAcc.current,
          info
      );

      // In case of success => display success for 3 sec.
      setExecResult('success');

    } catch (error) {
      // In case of an error => display error for 3 sec.
      setExecResult('failure'); // Failure

    }

    setTimeout(() => {
        setSendInactive(false);
        setExecResult('');
    }, 3000)
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
              color={execResult}
            />

          </XPFlexCenter>
        </XPBoxCenter>
      </XPMain>
    </XPApp>
  );
}

export default NonFungible;