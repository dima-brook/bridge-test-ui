import React, { useState, useEffect } from 'react';
import XPLogo from './assets/SVG/XPLogo';
import SwapChains from './SwapChains';
import Selector from './Selector';
import SendButton from './SendButton';
import MaxButton from './MaxButton';
import "./style.css";
import {
  HECOAccounts,
  ParachainAccounts,
  ParachainKeys,
  HECOKeys, url
} from './Config';

import {
  post,
  polkadot_req_data,
  elrd_req_data
} from './helper_functions'

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

/********************************************************
 *                    APP Component                     *
 ********************************************************/
function App() {

  // Information displayer helper function
  function update_tx(receiver, nw) {
    setNw(nw)
    setReceiver(receiver)
  }

  // =====================================================
  //                      S T A T E
  // =====================================================

  const Tokens = ['XPNET', 'HT']
  const Chains = ['XP.network', 'HECO']

  const [amount, setAmount] = useState(1000000000000000);

  const [token, setTokens] = useState(Tokens[0]);
  const [from, setFrom] = useState(Chains[0]);
  const [to, setTo] = useState(Chains[1]);

  const [fromAccts, setFromAccts] = useState(ParachainAccounts);
  const [toAccts, setToAccts] = useState(HECOAccounts);

  const [fromAcct, setFromAcct] = useState(fromAccts[0]);
  const [toAcct, setToAcct] = useState(toAccts[0]);

  const [nw, setNw] = useState('Info: ...');
  const [receiver, setReceiver] = useState('');

  const [sendInactive, setSendInactive] = useState(false);

  // =====================================================
  //                 DROPDOWNS POPULATION
  // =====================================================

  /**
   * Checks wich blockchain is the Source
   * 
   * Populates the FROM with the respective accounts
   */
  const populateFromAccounts = () => {
    switch (from) {
      case Chains[0]:
        setFromAccts(ParachainAccounts);
        break;
      case Chains[1]:
        setFromAccts(HECOAccounts);
        break;
      default:
        break;
    }
  }

  /**
   * Checks wich blockchain is the Target
   * 
   * Populates the FROM with the respective accounts
   */
  const populateToAccounts = () => {
    switch (to) {
      case Chains[0]:
        setToAccts(ParachainAccounts);
        break;
      case Chains[1]:
        setToAccts(HECOAccounts);
        break;
      default:
        break;
    }
  }

  /**
   * Checks the Source / Target blockchains
   * 
   * Defaults to the first accounts
   */
  const populateInitialAccounts = () => {
    if (!fromAcct && from === Chains[0]) {
      setFromAcct(Object.keys(ParachainAccounts)[0])
    } else if (!fromAcct && from === Chains[1]) {
      setFromAcct(Object.keys(HECOAccounts)[0])
    }

    if (!toAcct && to === Chains[0]) {
      setToAcct(Object.keys(ParachainAccounts)[0])
    } else if (!toAcct && to === Chains[1]) {
      setToAcct(Object.keys(HECOAccounts)[0])
    }
  }

  /**
   * Catches the change events and updates related fields
   */
  useEffect(() => {
    populateFromAccounts();
    populateToAccounts();
    populateInitialAccounts();
  }, [populateFromAccounts, populateToAccounts, populateInitialAccounts]);

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

    setFromAcct(fromAccts[0]);
    setToAcct(toAccts[0]);

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

    if (!fromAcct || !toAcct) {
      // Deafult to the first elements if accounts are empty
      populateInitialAccounts();
    }


    try {

      // Transfer direction XP.network => Elrond:
      if (from === Chains[0] && to === Chains[1]) {

        // Extract the signature by the Sender's name
        key = ParachainKeys[fromAcct];
        // Extract the account by the Sender's name
        acctAddress = ParachainAccounts[fromAcct];
        // Extract the address by the target user name
        targetWallet = HECOAccounts[toAcct];

        if (token === Tokens[0]) { // XPNET

          update_tx('', "please wait...")
          // Lock XPNET and mint wrapped XPNET in Elrond:
          const result = await post(`${url}/xpnet/transfer`, polkadot_req_data(acctAddress, key, targetWallet, amount));
          update_tx(targetWallet, `${JSON.stringify(result[0])}`);

        } else if (token === Tokens[1]) { // EGLD

          update_tx("please wait...")
          // Return wrapped EGLD from Parachain to Elrond:
          const result = await post(`${url}/ht/withdraw`, polkadot_req_data(acctAddress, key, targetWallet, amount));
          update_tx(targetWallet, `${JSON.stringify(result[0])}`)
        }

        // Transfer direction Elrond => XP.network:
      } else if (from === Chains[1] && to === Chains[0]) {

        // Extract the signature by the Sender's name
        key = HECOKeys[fromAcct];
        // Extract the account by the Sender's name
        acctAddress = HECOAccounts[fromAcct];
        // Extract the address by the target user name
        targetWallet = ParachainAccounts[toAcct]

        if (token === Tokens[0]) { // XPNET
          update_tx("", "please wait...")
          // Return wrapped XPNET from Elrond to the Parachain:
          const result = await post(`${url}/xpnet/withdraw`, elrd_req_data(key, targetWallet, amount));
          update_tx(targetWallet, `${JSON.stringify(result[0])}`)

        } else if (token === Tokens[1]) { // EGLD
          update_tx('', "please wait...")
          // Lock EGLD in Elrond & release wrapped EGLD in the Parachain:
          const result = await post(`${url}/ht/transfer`, elrd_req_data(key, targetWallet, amount));
          update_tx(targetWallet, `${JSON.stringify(result[0])}`);
        }
      }
      setSendInactive(false);

    } catch (error) {
      console.error(error)
      setSendInactive(false);
    }

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
    setFromAcct(fromAccts[0]);
  }

  /**
   * Target blockchain SELECT change event handler
   * @param {Select} value 
   */
  const handleToBlockchainChange = (value) => {
    setTo(value);
    populateToAccounts()
    setToAcct(toAccts[0]);
  }

  /**
   * Original Account SELECT event handler 
   * @param {String} value 
   */
  const handleFromAccountChange = (value) => {
    setFromAcct(value)
  }

  /**
   * Target Account SELECT event handler
   * @param {String} value 
   */
  const handleToAccountChange = (value) => {
    setToAcct(value)
  }

  const handleSelectClick = () => {
    console.log('select click')
  }

  /**
   * Retrieves the available amount of chosen tokens
   * 
   * And populates the Amount input field
   */
  const handleMaxButtonClick = () => {

    // Put your code for retrieving the data here

    // Example:
    const maxAmount = 5000000000000000;

    setAmount(maxAmount)

    console.log(amount);
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
                  data={Tokens}
                  onClick={handleSelectClick}
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
                  data={Chains}
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
                  data={Chains}
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
                  data={fromAccts}
                  onChange={handleFromAccountChange}
                />
              </XPColumn>

              <XPColumn>
                <XPLabel>To Account:</XPLabel>
                <Selector
                  value={toAcct}
                  data={toAccts}
                  onChange={handleToAccountChange}
                />
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

export default App;
