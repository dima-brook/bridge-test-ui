import React, { useState, useEffect } from "react";

import "./style.css";

import SwapChains from "./SwapChains";
import Selector from "./Selector";
import SendButton from "./SendButton";
import MaxButton from "./MaxButton";
import * as freezer_abi from "./assets/freezer.json";
import { Keyring } from "@polkadot/keyring";
import { UserSigner, parseUserKey } from "@elrondnetwork/erdjs";
import XPLogoSvg from "./assets/SVG/XPLogo.svg";

import {
  ElrondAccounts,
  ParachainAccounts,
  ParachainKeys,
  ElrondKeys,
  ChainConfig,
} from "./Config";

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
  XPInfo,
} from "./StyledComponents";
import { elrondHelperFactory, polkadotHelperFactory } from "testsuite-ts";

/********************************************************
 *                    APP Component                     *
 ********************************************************/
function App() {
  // Information displayer helper function
  function update_tx(receiver, nw) {
    setNw(nw);
    setReceiver(receiver);
  }

  // =====================================================
  //                      S T A T E
  // =====================================================

  const Tokens = ["XPNET", "EGLD"];
  const Chains = ["XP.network", "Elrond"];

  const [amount, setAmount] = useState("");

  const [token, setTokens] = useState(Tokens[0]);
  const [from, setFrom] = useState(Chains[0]);
  const [to, setTo] = useState(Chains[1]);

  const [fromAccts, setFromAccts] = useState(ParachainAccounts);
  const [toAccts, setToAccts] = useState(ElrondAccounts);

  const [fromAcct, setFromAcct] = useState(fromAccts[0]);
  const [toAcct, setToAcct] = useState(toAccts[0]);

  const [nw, setNw] = useState("Info: ...");
  const [receiver, setReceiver] = useState("");

  // Chain helpers
  let polka, elrd;
  const keyring = new Keyring();

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
        setFromAccts(ElrondAccounts);
        break;
      default:
        break;
    }
  };

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
        setToAccts(ElrondAccounts);
        break;
      default:
        break;
    }
  };

  /**
   * Checks the Source / Target blockchains
   *
   * Defaults to the first accounts
   */
  const populateInitialAccounts = () => {
    if (!fromAcct && from === Chains[0]) {
      setFromAcct(Object.keys(ParachainAccounts)[0]);
    } else if (!fromAcct && from === Chains[1]) {
      setFromAcct(Object.keys(ElrondAccounts)[0]);
    }

    if (!toAcct && to === Chains[0]) {
      setToAcct(Object.keys(ParachainAccounts)[0]);
    } else if (!toAcct && to === Chains[1]) {
      setToAcct(Object.keys(ElrondAccounts)[0]);
    }
  };

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
    let method;

    if (!(polka && elrd)) {
      polka = await polkadotHelperFactory(
        ChainConfig.xpnode,
        ChainConfig.xp_freezer,
        freezer_abi.default
      );

      elrd = await elrondHelperFactory(
        ChainConfig.elrond_node,
        ChainConfig.elrond_faucet,
        ChainConfig.elrond_minter,
        ChainConfig.elrond_event_rest,
        ChainConfig.elrond_esdt,
        ChainConfig.elrond_esdt_nft
      );
    }

    if (!fromAcct || !toAcct) {
      // Deafult to the first elements if accounts are empty
      populateInitialAccounts();
    }

    try {
      // Transfer direction XP.network => Elrond:
      if (from === Chains[0] && to === Chains[1]) {
        // Extract the signature by the Sender's name
        key = keyring.createFromUri("//Alice", undefined, "sr25519");
        // Extract the account by the Sender's name
        acctAddress = ParachainAccounts[fromAcct];
        // Extract the address by the target user name
        targetWallet = ElrondAccounts[toAcct];

        update_tx("", "please wait...");
        if (token === Tokens[0]) {
          // XPNET
          const result = await polka.transferNativeToForeign(
            key,
            targetWallet,
            amount
          );
          update_tx(targetWallet, `${JSON.stringify(result)}`);
        } else if (token === Tokens[1]) {
          // EGLD

          // Return wrapped EGLD from Parachain to Elrond:
          const result = await polka.unfreezeWrapped(key, targetWallet, amount);
          update_tx(targetWallet, `${JSON.stringify(result)}`);
        }

        // Transfer direction Elrond => XP.network:
      } else if (from === Chains[1] && to === Chains[0]) {
        // Extract the signature by the Sender's name
        console.log(ElrondKeys[fromAcct]);
        key = new UserSigner(parseUserKey(ElrondKeys[fromAcct]));
        // Extract the account by the Sender's name
        acctAddress = ElrondAccounts[fromAcct];
        // Extract the address by the target user name
        targetWallet = ParachainAccounts[toAcct];

        update_tx("", "please wait...");
        if (token === Tokens[0]) {
          // XPNET
          const result = await elrd.unfreezeWrapped(key, targetWallet, amount);
          update_tx(targetWallet, `${JSON.stringify(result)}`);
        } else if (token === Tokens[1]) {
          // EGLD
          // Return wrapped EGLD from Parachain to Elrond:
          const result = await elrd.transferNativeToForeign(
            key,
            targetWallet,
            amount
          );
          update_tx(targetWallet, `${JSON.stringify(result)}`);
        }
      }
    } catch (error) {
      console.error(error);
    }

    // Check the extracted values:
    console.log("From:", fromAcct);
    console.log("Account:", acctAddress);
    console.log("Key:", key);
    console.log("To Account:", targetWallet);
    console.log("Token:", token);
    console.log(amount, typeof amount);
  };

  /**
   * Amount INPUT change event handler
   * @param {String | Number} value
   */
  const handleAmountChange = (value) => {
    setAmount(value.vlaue);
  };

  /**
   * Token SELECT change event handler
   * @param {String} value
   */
  const handleTokenBlockchainChange = (value) => {
    setTokens(value);
  };

  /**
   * Original blockchain SELECT change event handler
   * @param {String} value
   */
  const handleFromBlockchainChange = (value) => {
    setFrom(value);
    populateFromAccounts();
    setFromAcct(fromAccts[0]);
  };

  /**
   * Target blockchain SELECT change event handler
   * @param {Select} value
   */
  const handleToBlockchainChange = (value) => {
    setTo(value);
    populateToAccounts();
    setToAcct(toAccts[0]);
  };

  /**
   * Original Account SELECT event handler
   * @param {String} value
   */
  const handleFromAccountChange = (value) => {
    setFromAcct(value);
  };

  /**
   * Target Account SELECT event handler
   * @param {String} value
   */
  const handleToAccountChange = (value) => {
    setToAcct(value);
  };

  // ==========================================================
  //                            J S X
  // ==========================================================

  return (
    <XPApp>
      <XPMain>
        <XPBoxCenter>
          <XPFlexCenter>
            <img src={XPLogoSvg} alt="XPLogoSvg" className="Xp-svg-logo" />
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
                  <MaxButton onClick={() => {}} />
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
            </div>

            {/* -------------------------------------------- */}
            {/* ---------- The third Row of elements ------- */}
            {/* -------------------------------------------- */}

            <XPRow>
              <XPColumn>
                <XPLabel>From Account</XPLabel>

                <Selector
                  value={fromAcct}
                  data={fromAccts}
                  onChange={handleFromAccountChange}
                />
              </XPColumn>

              <XPColumn>
                <XPLabel>To Account</XPLabel>
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

            <XPLabel>Transaction</XPLabel>
            <XPTransaction value={receiver} />
            <XPInfo>{nw}</XPInfo>

            {/* -------------------------------------------- */}
            {/* --------------- The Send Button ------------ */}
            {/* -------------------------------------------- */}

            <SendButton onClick={handleSendButtonClick} />
          </XPFlexCenter>
        </XPBoxCenter>
      </XPMain>
    </XPApp>
  );
}

export default App;
