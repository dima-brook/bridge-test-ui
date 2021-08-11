import React, { useCallback, useState, useEffect, useRef } from 'react';
import XPLogo from './assets/SVG/XPLogo';
import SwapChains from './SwapChains';
import Selector from './Selector';
import SendButton from './SendButton';
import MaxButton from './MaxButton';
import "./style.css";

import { chains, CHAIN_INFO, tokens } from './consts';
import {
    XPApp,
    XPMain,
    XPBoxCenter,
    XPFlexCenter,
    XPTitle,
    XPRow,
    XPColumn,
    XPLabel,
    XPDiv,
    XPInput,
    XPTransaction,
    XPInfo
} from './StyledComponents'
import { ChainHandlers } from './helper_functions'
import * as Elrond from "@elrondnetwork/dapp";
import { useLocation } from 'react-router-dom';
import { Address } from '@elrondnetwork/erdjs/out';


function Fungible() {

  // Information displayer helper function
  function update_tx(receiver, nw) {
    setNw(nw)
    setReceiver(receiver)
  }

  // =====================================================
  //                      S T A T E
  // =====================================================
  const query = useRef(new URLSearchParams(useLocation().search));
  const [amount, setAmount] = useState(1000000000000000);

  const [token, setTokens] = useState(tokens[0]);
  const [from, setFrom] = useState(chains[0]);
  const [to, setTo] = useState(chains[1]);

  const fromAccts = useRef([]);

  const [fromAcct, setFromAcct] = useState(undefined);
  const toAcct = useRef();

  const [nw, setNw] = useState('Info: ...');
  const [receiver, setReceiver] = useState('');

  const [sendInactive, setSendInactive] = useState(false);

  const sendElrdTx = Elrond.useSendTransaction();

  // =====================================================
  //                 DROPDOWNS POPULATION
  // =====================================================

  /**
   * Checks wich blockchain is the Source
   * 
   * Populates the FROM with the respective accounts
   */
  const populateFromAccounts = useCallback(async () => {
    switch (from) {
      case chains[0]:
        fromAccts.current = await ChainHandlers.polkadotAccounts();
        break;
      case chains[1]:
        fromAccts.current = [query.current.get("address") || ""];
        break;
      case chains[2]:
      case chains[3]:
      case chains[4]:
        fromAccts.current = await ChainHandlers.w3Accounts();
        break;
      default:
        break;
    }
  }, [from]);

  /**
   * Checks the Source / Target blockchains
   * 
   * Defaults to the first accounts
   */
  const populateInitialAccounts = useCallback(() => {
    setFromAcct(fromAccts.current[0])

    toAcct.current.value = "";
  }, []);

  /**
   * Catches the change events and updates related fields
   */
  useEffect(() => {
    const populate = async () => {
      await populateFromAccounts();
      populateInitialAccounts();
    }
    populate()
  }, [populateFromAccounts, populateInitialAccounts]);

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

    setFromAcct(fromAccts.current[0]);
    toAcct.current.value = "";
  }

  const liqudityElrond = async () => {
    let tx;

    const elrd = await ChainHandlers.elrd();
  
    if (token === CHAIN_INFO[from].native) {
      tx = elrd.unsignedTransferTxn(CHAIN_INFO[to].nonce, toAcct.current.value, amount);
    } else {
      tx = elrd.unsignedUnfreezeTxn(CHAIN_INFO[to].nonce, new Address(fromAcct), toAcct.current.value, amount);
    }
    setSendInactive(false);

    sendElrdTx({
      transaction: tx,
      callbackRoute: "/processelrd",
    });
  }

  /**
    * Send liquidity
    * 
    * button click handler
    */
  const handleSendButtonClick = async () => {

    let chain;
    let key;
    let targetWallet;
    const chain_info = CHAIN_INFO[to];

    setSendInactive(true);

    if (!fromAcct) {
      // Deafult to the first elements if accounts are empty
      populateInitialAccounts();
    }

    switch (from) {
      case chains[0]: {
        chain = await ChainHandlers.polka();
        key = await ChainHandlers.polkadotSigner(fromAcct);
        targetWallet = toAcct.current.value;
        break;
      }
      case chains[1]: {
        return await liqudityElrond();
      }
      // All web3 chains should match here
      case chains[2]:
      case chains[3]:
      case chains[4]: {
        chain = await ChainHandlers.web3();
        key = await ChainHandlers.w3Signer(fromAcct);
        targetWallet = toAcct.current.value;
        break;
      }
      // All web3 chains end here
      default:
        throw Error(`unhandled chain: ${from}`);
    }
  
    try {

      update_tx('', "please wait...")
      let call;

      if (CHAIN_INFO[from].native === token) {
        call = await chain.transferNativeToForeign;
      } else if (CHAIN_INFO[to].native === token) {
        call = await chain.unfreezeWrapped;
      } else {
        throw Error("Invalid Target");
      }

      const result = await call(key, chain_info.nonce, targetWallet, amount);

      update_tx(targetWallet, `${JSON.stringify(result[0])}`);
    } catch (error) {
      console.error(error)
    }
    setSendInactive(false);
  }

  /**
   * Amount INPUT change event handler
   * @param {String | Number} value 
   */
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  }

  /**
   * Token SELECT change event handler
   * @param {String} value 
   */
  const handleTokenBlockchainChange = (value) => {
    setTokens(value)
  }

  /**
   * Original blockchain SELECT change event handler
   * @param {String} value 
   */
  const handleFromBlockchainChange = (value) => {
    setFrom(value);
    (CHAIN_INFO[value].chainId !== undefined) && ChainHandlers.setWeb3Chain(value);
    populateFromAccounts()
    setFromAcct(fromAccts.current[0]);
  }

  /**
   * Target blockchain SELECT change event handler
   * @param {Select} value 
   */
  const handleToBlockchainChange = (value) => {
    setTo(value);
    toAcct.current.value = "";
  }

  /**
   * Original Account SELECT event handler 
   * @param {String} value 
   */
  const handleFromAccountChange = (value) => {
    setFromAcct(value)
  }

  /**
   * Retrieves the available amount of chosen tokens
   * And populates the Amount input field
   */
  const handleMaxButtonClick = async () => {

    // Put your code for retrieving the data here

    let chain;
    // Example:
    switch (from) {
      case chains[0]:
        chain = await ChainHandlers.polka();
        break;
      case chains[1]:
        chain = await ChainHandlers.elrd();
        break;
      case chains[2]:
      case chains[3]:
      case chains[4]:
        chain = await ChainHandlers.web3();
        break;
      default:
        break;
    }
  
    console.log(chain)
    setAmount((await chain.balance(fromAcct)).toString())
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
            <XPTitle>Cross Chain Bridge</XPTitle>

            {/* -------------------------------------------- */}
            {/* ---------- The first Row of elements ------- */}
            {/* -------------------------------------------- */}

            <XPRow>
              <XPColumn>
                <XPLabel>Asset</XPLabel>
                <Selector
                  value={token}
                  data={tokens}
                  onClick={() => {}}
                  onChange={handleTokenBlockchainChange}
                />
              </XPColumn>

              <XPColumn>
                <XPLabel>Amount</XPLabel>
                <XPDiv>
                  <XPInput
                    type="text"
                    placeholder="Enter Amount"
                    id="transfer-amount"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                  {/* Extracts the sum total form the account */}
                  {/* P.S. Not implemented yet...             */}
                  <MaxButton onClick={handleMaxButtonClick}/>
                </XPDiv>
              </XPColumn>
            </XPRow>

            {/* -------------------------------------------- */}
            {/* --------- The second Row of elements ------- */}
            {/* -------------------------------------------- */}

            <div className="from-to-style">
                
              <XPColumn>
                <XPLabel>From</XPLabel>
                <Selector
                  value={from}
                  data={chains}
                  onChange={handleFromBlockchainChange}
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
                  onChange={handleToBlockchainChange}
                />
              </XPColumn>
            </div>            {/* -------------------------------------------- */}
            {/* ---------- The third Row of elements ------- */}
            {/* -------------------------------------------- */}

            <XPRow>
              <XPColumn>
                <XPLabel>From Account:</XPLabel>

                <Selector
                  value={fromAcct}
                  data={fromAccts.current}
                  onChange={handleFromAccountChange}
                />
              </XPColumn>

              <XPColumn>
                <XPLabel>To Account:</XPLabel>
                <XPTransaction ref={toAcct} type="text" />
              </XPColumn>
            </XPRow>

            {/* -------------------------------------------- */}
            {/* --------- The informational elements ------- */}
            {/* -------------------------------------------- */}

            <XPLabel>Transaction:</XPLabel>
            <XPTransaction value={receiver} />
            <XPInfo>{nw}</XPInfo>

            {/* -------------------------------------------- */}
            {/* --------------- The Send Button ------------ */}
            {/* -------------------------------------------- */}

            <SendButton onClick={handleSendButtonClick} inactive={sendInactive}/>

          </XPFlexCenter>
        </XPBoxCenter>
      </XPMain>
    </XPApp>
  );
}

export default Fungible;