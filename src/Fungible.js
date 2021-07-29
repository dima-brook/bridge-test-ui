import React, { useCallback, useState, useEffect, useRef } from 'react';
import XPLogo from './assets/SVG/XPLogo';
import SwapChains from './SwapChains';
import Selector from './Selector';
import SendButton from './SendButton';
import MaxButton from './MaxButton';
import "./style.css";
import {
  ElrondAccounts,
} from './Config';

import { chains, tokens } from './consts';
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


function Fungible() {

  // Information displayer helper function
  function update_tx(receiver, nw) {
    setNw(nw)
    setReceiver(receiver)
  }

  // =====================================================
  //                      S T A T E
  // =====================================================
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
        fromAccts.current = ElrondAccounts;
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
    if (from === chains[0]) {
      setFromAcct(fromAccts.current[0])
    } else if (from === chains[1]) {
      setFromAcct(Object.keys(ElrondAccounts)[0])
    }

    toAcct.current.value = "";
  }, [from]);

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
    let txGen;

    const elrd = await ChainHandlers.elrd();
  
    if (token === tokens[0]) {
      txGen = elrd.unsignedUnfreezeTxn;
    } else {
      txGen = elrd.unsignedTransferTxn;
    }

    const tx = txGen(toAcct.current.value, amount);
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

    let key;
    let acctAddress;
    let targetWallet;

    setSendInactive(true);

    if (!fromAcct) {
      // Deafult to the first elements if accounts are empty
      populateInitialAccounts();
    }

    const polka = await ChainHandlers.polka();

    try {

      update_tx('', "please wait...")
      let result;

      // Transfer direction XP.network => Elrond:
      if (from === chains[0] && to === chains[1]) {
        // Extract the signature by the Sender's name
        key = await ChainHandlers.polkadotSigner(fromAcct);
        // Extract the account by the Sender's name
        acctAddress = fromAcct;
        // Extract the address by the target user name
        targetWallet = toAcct.current.value;

        if (token === tokens[0]) { // XPNET
          // Lock XPNET and mint wrapped XPNET in Elrond:
          result = await polka.transferNativeToForeign(key, targetWallet, amount);
        } else if (token === tokens[1]) { // EGLD
          // Return wrapped EGLD from Parachain to Elrond:
          result = await polka.unfreezeWrapped(key, targetWallet, amount);
        }
        // Transfer direction Elrond => XP.network:
      } else if (from === chains[1] && to === chains[0]) {
        return await liqudityElrond();
      }
      update_tx(targetWallet, `${JSON.stringify(result[0])}`);
    } catch (error) {
      console.error(error)
    }
    setSendInactive(false);

    // Check the extracted values:
    console.log("From:", fromAcct)
    console.log("Account:", acctAddress)
    console.log("Key:", key)
    console.log("To Account:", targetWallet)
    console.log("Token:", token);
    console.log(amount, typeof amount);
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
    let acc;
    // Example:
    switch (from) {
      case chains[0]:
        chain = await ChainHandlers.polka();
        acc = fromAcct;
        break;
      case chains[1]:
        chain = await ChainHandlers.elrd();
        acc = ElrondAccounts[fromAcct]
        break;
      default:
        break;
    }
  
    console.log(chain)
    setAmount((await chain.balance(acc)).toString())
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