import React, { useState, useEffect } from 'react';

import XPLogo from './XPLogo';
import SwapChains from './SwapChains';
import Selector from './Selector';
import SendButton from './SendButton';
import './App.css';
import { ElrondAccounts, ParachainAccounts, ParachainKeys, ElrondKeys } from './Config';

import {
  post,
  polkadot_req_data,
  elrd_req_data
} from './helper_functions'


function App() {

// =====================================================
//                      TRANSACTIONS
// =====================================================

const url = "http://54.194.208.186:1000";

// Return wrapped XPNET from Elrond -> Parachain
async function withdraw_xpnet_e2p(pem, destination, value) {
  update_tx("", "please wait...")
  const result = await post(`${url}/xpnet/withdraw`, elrd_req_data(pem, destination, value));
  update_tx(destination, `${JSON.stringify(result[0])}`)
}

// Return wrapped eGold from Parachain -> Elrond
async function withdraw_egold_p2e(sender_addr, sender_key, destination, value) {
  update_tx("please wait...")
  const result = await post(`${url}/egld/withdraw`, polkadot_req_data(sender_addr, sender_key, destination, value));
  update_tx(destination, `${JSON.stringify(result[0])}`)
}

// Freeze XPNET in a Parachain and release wrapped XPNET in Elrond
async function transfer_xpnet_p2e(sender_addr, sender_key, destination, value) {
  update_tx('', "please wait...")
  const result = await post(`${url}/xpnet/transfer`, polkadot_req_data(sender_addr, sender_key, destination, value));
  update_tx(destination, `${JSON.stringify(result[0])}`);
}

// Freeze eGold in a Parachain and release wrapped eGold in Elrond
async function transfer_egold_e2p(pem, destination, value) {
  update_tx('', "please wait...")
  const result = await post(`${url}/egld/transfer`, elrd_req_data(pem, destination, value));
  update_tx(destination, `${JSON.stringify(result[0])}`);
}

// Information displayer
function update_tx(receiver, nw) {
  setNw(nw)
  setReceiver(receiver)

  console.log(nw);
  console.log(receiver);
}

  // STATE

  const Tokens = ['XPNET', 'EGLD']
  const Chains = ['XP.network', 'Elrond']

  const [amount, setAmount] = useState(1000000000000000);

  const [token, setTokens] = useState(Tokens[0]);
  const [from, setFrom] = useState(Chains[0]);
  const [to, setTo] = useState(Chains[1]);

  const [fromAccts, setFromAccts] = useState(ParachainAccounts);
  const [toAccts, setToAccts] = useState(ElrondAccounts);

  const [fromAcct, setFromAcct] = useState(fromAccts[0]);
  const [toAcct, setToAcct] = useState(toAccts[0]);

  const [nw, setNw] = useState('Info: ...');
  const [receiver, setReceiver] = useState('');


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
  }

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
  }

  const populateInitialAccounts = () => {
    if (!fromAcct && from === Chains[0]) {
      setFromAcct(Object.keys(ParachainAccounts)[0])
    } else if (!fromAcct && from === Chains[1]) {
      setFromAcct(Object.keys(ElrondAccounts)[0])
    }

    if (!toAcct && to === Chains[0]) {
      setToAcct(Object.keys(ParachainAccounts)[0])
    } else if (!toAcct && to === Chains[1]) {
      setToAcct(Object.keys(ElrondAccounts)[0])
    }
  }

  useEffect(() => {
    populateFromAccounts();
    populateToAccounts();
    populateInitialAccounts();
  }, [populateFromAccounts, populateToAccounts, populateInitialAccounts]);



  const handleSwapChains = () => {
    const temp_to = to;
    setTo(from);
    setFrom(temp_to);
    setFromAcct(fromAccts[0]);
    setToAcct(toAccts[0]);
  }

  const handleSendButtonClick = () => {

    let key;
    let acctAddress;
    let targetWallet;

    if (!fromAcct || !toAcct) {
      populateInitialAccounts();
      console.log("accounts are empty")
    }


    try {

      // Transfer direction XP.network => Elrond:
      if (from === Chains[0] && to === Chains[1]) {

        key = ParachainKeys[fromAcct];
        acctAddress = ParachainAccounts[fromAcct];
        targetWallet = ElrondAccounts[toAcct];

        if (token === Tokens[0]) { // XPNET
          transfer_xpnet_p2e(acctAddress, key, targetWallet, amount);
        } else if (token === Tokens[1]) { // EGLD
          withdraw_egold_p2e(acctAddress, key, targetWallet, amount);
        }

        // Transfer direction Elrond => XP.network:
      } else if (from === Chains[1] && to === Chains[0]) {
        key = ElrondKeys[fromAcct];
        acctAddress = ElrondAccounts[fromAcct];
        targetWallet = ParachainAccounts[toAcct]

        if (token === Tokens[0]) { // XPNET
          withdraw_xpnet_e2p(key, targetWallet, amount);
        } else if (token === Tokens[1]) { // EGLD
          transfer_egold_e2p(key, targetWallet, amount);
        }
      }

    } catch (error) {
      console.error(error)
    }

    // Check the extracted values
    // TODO: remove before production
    console.log("From:", fromAcct)
    console.log("Account:", acctAddress)
    console.log("Key:", key)
    console.log("To Account:", targetWallet)
    console.log("Token:", token);
    console.log(amount, typeof amount);
  }

  const handleAmountChange = (value) => {
    setAmount(value);
  }

  const handleTokenBlockchainChange = (value) => {
    setTokens(value)
  }

  const handleFromBlockchainChange = (value) => {
    setFrom(value);

  }

  const handleToBlockchainChange = (value) => {
    setTo(value);
  }

  const handleFromAccountChange = (value) => {
    setFromAcct(value)
  }

  const handleToAccountChange = (value) => {
    setToAcct(value)
  }

  return (
    <div className="App">
      <main>
        <div className="box-center">

          <div className="box-center-flexbox">
            <XPLogo />
            <div class="title-text-xp">Cross Chain Bridge</div>

            {/* -------------------------------------------- */}

            <div className="flex-box-input">
              <div className="flex-box-column">
                <div class="title-input">Asset</div>
                <Selector
                  value={token}
                  data={Tokens}
                  onClick={() => { }}
                  onChange={handleTokenBlockchainChange}
                />
              </div>

              <div className="flex-box-column">
                <div class="title-input">Amount</div>
                <div className="felx-box-input">
                  <input
                    className="input-style"
                    type="text"
                    placeholder="Enter Amount"
                    id="transfer-amount"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                  <button class="max-button">
                    <div class="max-button-text">MAX</div>
                  </button>
                </div>
              </div>
            </div>

            {/* -------------------------------------------- */}

            <div class="flex-box-input" >
              <div class="flex-box-column">
                <div class="title-input">From:</div>
                <Selector
                  value={from}
                  data={Chains}
                  onChange={handleFromBlockchainChange}
                />
              </div>

              <SwapChains
                onClick={handleSwapChains}
              />

              <div class="flex-box-column">
                <div class="title-input">To:</div>
                <Selector
                  value={to}
                  data={Chains}
                  onChange={handleToBlockchainChange}
                />
              </div>
            </div>

            {/* -------------------------------------------- */}

            <div class="flex-box-input">
              <div class="flex-box-column">
                <div class="title-input">From Account:</div>

                <Selector
                  value={fromAcct}
                  data={fromAccts}
                  onChange={handleFromAccountChange}
                />
              </div>

              <div class="flex-box-column">
                <div class="title-input">To Account:</div>
                <Selector
                  value={toAcct}
                  data={toAccts}
                  onChange={handleToAccountChange}
                />
              </div>
            </div>

            {/* -------------------------------------------- */}

            <div class="title-input">Transaction:</div>
            <input
              class="wallet-input"
              value={receiver}
            />
            <div class="wallet-input-text">
              {nw}
            </div>

            <SendButton onClick={handleSendButtonClick} />

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;