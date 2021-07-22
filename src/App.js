import React, { useState, useEffect } from 'react';
import XPLogo from './assets/SVG/XPLogo';
import SwapChains from './SwapChains';
import Selector from './Selector';
import SendButton from './SendButton';
import MaxButton from './MaxButton';
import "./style.css";
import {
  ChainConfig,
  ElrondAccounts,
  ElrondKeys
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
import { UserSigner, parseUserKey, ApiProvider } from '@elrondnetwork/erdjs'
import { elrondHelperFactory, polkadotPalletHelperFactory } from 'testsuite-ts';
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';

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

  const Tokens = ['XPNET', 'EGLD'];
  const Chains = ['XP.network', 'Elrond'];

  let polkaExtInit = false;

  const [amount, setAmount] = useState(1000000000000000);

  const [token, setTokens] = useState(Tokens[0]);
  const [from, setFrom] = useState(Chains[0]);
  const [to, setTo] = useState(Chains[1]);

  const [fromAccts, setFromAccts] = useState([]);
  const [toAccts, setToAccts] = useState([]);

  const [fromAcct, setFromAcct] = useState(fromAccts[0]);
  const [toAcct, setToAcct] = useState(toAccts[0]);

  const [nw, setNw] = useState('Info: ...');
  const [receiver, setReceiver] = useState('');

  const [sendInactive, setSendInactive] = useState(false);

  // =====================================================
  //                 DROPDOWNS POPULATION
  // =====================================================

  const polkadotAccounts = async () => {
    (await web3Accounts())
      .map((v) => v.address)
  }

  /**
   * Checks wich blockchain is the Source
   * 
   * Populates the FROM with the respective accounts
   */
  const populateFromAccounts = async () => {
    switch (from) {
      case Chains[0]:
        setFromAccts(await polkadotAccounts());
        break;
      case Chains[1]:
        setFromAccts(ElrondAccounts);
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
  const populateToAccounts = async () => {
    switch (to) {
      case Chains[0]:
        setToAccts(await polkadotAccounts());
        break;
      case Chains[1]:
        setToAccts(ElrondAccounts);
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
  const populateInitialAccounts = async () => {
    if (!fromAcct && from === Chains[0]) {
      setFromAcct(fromAccts[0])
    } else if (!fromAcct && from === Chains[1]) {
      setFromAcct(Object.keys(ElrondAccounts)[0])
    }

    if (!toAcct && to === Chains[0]) {
      setToAcct(fromAccts[0])
    } else if (!toAcct && to === Chains[1]) {
      setToAcct(Object.keys(ElrondAccounts)[0])
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

  const ChainHandlers = {
    _polka: undefined,
    _elrd: undefined,
    async polka() {
      if (!this._polka) {
        this._polka = await polkadotPalletHelperFactory(
          ChainConfig.xpnode,
          //ChainConfig.xp_freezer,
          //ChainConfig.xp_freezer
        );
      }

      return this._polka;
    },
    async elrd() {
      if (!this._elrd) {
        this._elrd = await elrondHelperFactory(
          ChainConfig.elrond_node,
          ChainConfig.elrond_faucet,
          ChainConfig.elrond_minter,
          ChainConfig.elrond_event_rest,
          ChainConfig.elrond_esdt,
          ChainConfig.elrond_esdt_nft
        );

        return this._elrd;
      }
    }
  }


  /// Get polkadot signer interface from polkadot{.js} extension
  const getSigner = async (address) => {
    if (!polkaExtInit) {
      await web3Enable('XPNET Cross Chain Bridge');
      polkaExtInit = true;
    }

    const injector = await web3FromAddress(address);

    return { sender: address, options: { signer: injector.signer } };
  }

  /**
    * Send liquidity
    * 
    * button click handler
    */
  handleSendButtonClick = async () => {

    let key;
    let acctAddress;
    let targetWallet;

    setSendInactive(true);

    if (!fromAcct || !toAcct) {
      // Deafult to the first elements if accounts are empty
      populateInitialAccounts();
    }

    const polka = await ChainHandlers.polka();
    const elrd = await ChainHandlers.elrd();


    try {

      update_tx('', "please wait...")
      let result;
      let key;

      // Transfer direction XP.network => Elrond:
      if (from === Chains[0] && to === Chains[1]) {
        // Extract the signature by the Sender's name
        key = getSigner(fromAcct);
        // Extract the account by the Sender's name
        acctAddress = fromAcct;
        // Extract the address by the target user name
        targetWallet = ElrondAccounts[toAcct];

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
        key = new UserSigner(parseUserKey(ElrondKeys[fromAcct]));
        // Extract the account by the Sender's name
        acctAddress = ElrondAccounts[fromAcct];
        // Extract the address by the target user name
        targetWallet = toAcct

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
      case Chains[0]:
        chain = await ChainHandlers.polka();
        acc = fromAcct;
        break;
      case Chains[1]:
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
