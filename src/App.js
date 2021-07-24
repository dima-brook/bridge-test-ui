import React, { useCallback, useState, useEffect, useRef } from 'react';
import XPLogo from './assets/SVG/XPLogo';
import SwapChains from './SwapChains';
import Selector from './Selector';
import SendButton from './SendButton';
import MaxButton from './MaxButton';
import "./style.css";
import {
  HECOAccounts,
  HECOKeys,
  ChainConfig,
} from './Config';

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
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';


const Tokens = ['XPNET', 'HT']
const Chains = ['XP.network', 'HECO']

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


  let polkaExtInit = useRef(false);

  const [amount, setAmount] = useState(1000000000000000);

  const [token, setTokens] = useState(Tokens[0]);
  const [from, setFrom] = useState(Chains[0]);
  const [to, setTo] = useState(Chains[1]);

  const fromAccts = useRef([]);

  const [fromAcct, setFromAcct] = useState(undefined);
  const toAcct = useRef();

  const [nw, setNw] = useState('Info: ...');
  const [receiver, setReceiver] = useState('');

  const [sendInactive, setSendInactive] = useState(false);

  // =====================================================
  //                 DROPDOWNS POPULATION
  // =====================================================

  const polkadotAccounts = async () => {
    if (!polkaExtInit.current) {
      await web3Enable('XPNET Cross Chain Bridge');
      polkaExtInit.current = true;
    }

    return (await web3Accounts())
      .map((v) => v.address)
  }

  /**
   * Checks wich blockchain is the Source
   * 
   * Populates the FROM with the respective accounts
   */
  const populateFromAccounts = useCallback(async () => {
    switch (from) {
      case Chains[0]:
        fromAccts.current = await polkadotAccounts();
        break;
      case Chains[1]:
        fromAccts.current = HECOAccounts;
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
    if (from === Chains[0]) {
      setFromAcct(fromAccts.current[0])
    } else if (from === Chains[1]) {
      setFromAcct(Object.keys(HECOAccounts)[0])
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

  /// Get polkadot signer interface from polkadot{.js} extension
  const getSigner = async (address) => {
    const injector = await web3FromAddress(address);

    return { sender: address, options: { signer: injector.signer } };
  };

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
    const elrd = await ChainHandlers.elrd();


    try {

      update_tx('', "please wait...")
      let result;

      // Transfer direction XP.network => Elrond:
      if (from === Chains[0] && to === Chains[1]) {
        // Extract the signature by the Sender's name
        key = await getSigner(fromAcct);
        // Extract the account by the Sender's name
        acctAddress = fromAcct;
        // Extract the address by the target user name
        targetWallet = toAcct.current.value;

        if (token === Tokens[0]) { // XPNET
          // Lock XPNET and mint wrapped XPNET in Elrond:
          result = await polka.transferNativeToForeign(key, targetWallet, amount);
        } else if (token === Tokens[1]) { // EGLD
          // Return wrapped EGLD from Parachain to Elrond:
          result = await polka.unfreezeWrapped(key, targetWallet, amount);
        }
        // Transfer direction Elrond => XP.network:
      } else if (from === Chains[1] && to === Chains[0]) {
        // Extract the signature by the Sender's name
        key = HECOKeys[fromAcct];
        // Extract the account by the Sender's name
        acctAddress = HECOAccounts[fromAcct];
        // Extract the address by the target user name
        targetWallet = toAcct.current.value;

        if (token === Tokens[0]) { // XPNET
          // Return wrapped XPNET from Elrond to the Parachain:
          result = await elrd.unfreezeWrapped(key, targetWallet, amount);
        } else if (token === Tokens[1]) { // EGLD
          // Lock EGLD in Elrond & release wrapped EGLD in the Parachain:
          result = await elrd.transferNativeToForeign(key, targetWallet, amount);
        }
      }
      update_tx(targetWallet, `${JSON.stringify(result[0])}`);

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
   * 
   * And populates the Amount input field
   */
  const handleMaxButtonClick = async () => {

    // Put your code for retrieving the data here

    let chain;
    let acc;

    switch (from) {
      case Chains[0]:
        chain = await ChainHandlers.polka();
        acc = fromAcct;
        break;
      case Chains[1]:
        chain = await ChainHandlers.elrd();
        acc = HECOAccounts[fromAcct]
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
                  data={Tokens}
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

export default App;
