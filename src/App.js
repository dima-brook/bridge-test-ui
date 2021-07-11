import React, { useState } from 'react';

import XPLogo from './XPLogo';
import SwapChains from './SwapChains';
import Selector from './Selector';
import SendButton from './SendButton';
import AccountSelect from './AccountSelect';
import './App.css';
import { ElrondAccounts, ParachainAccounts } from './Accounts';

function App() {

  // STATE

  const Tokens = ['XPNET', 'EGLD']
  const Chains = ['XP.Network', 'Elrond']

  const [url, setUrl] = useState("http://54.194.208.186:80");

  const [swapX, setSwapX] = useState(943);
  const [swapY, setSwapY] = useState(520);
  const [amount, setAmount] = useState(1000000000000000);

  const [token, setTokens] = useState(Tokens[0]);
  const [from, setFrom] = useState(Chains[0]);
  const [to, setTo] = useState(Chains[1]);

  // const [keysElrond, setElrondKeys] = useState(getKeys(''));
  // const [keysParachain, setParachainKeys] = useState(getKeys('./assets/data/parachain_keys.json')); 

  const [accountsElrond, setElrondAccounts] = useState(ElrondAccounts);
  const [accountsParachain, setParachainAccounts] = useState(ParachainAccounts);

  const [fromAccts, setFromAccts] = useState(accountsParachain);
  const [toAccts, setToAccts] = useState(accountsElrond);


  const handleSwapChains = () => {
    const temp_to = to;
    setTo(from);
    setFrom(temp_to);
  }

  const handleSendButtonClick = () => {
    alert("Send click")
  }

  const getXOffset = () =>  {
    return swapX;
  }
  const getYOffset = () =>  {
    return swapY;
  }

  const handleAmountChange = (value) => {
    setAmount(value);
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
                  tokens={Tokens}
                  chains={Chains}
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
                  onChange={e => handleAmountChange(e.target.value)}
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
                  tokens={Tokens}
                  chains={Chains}
                />
              </div>

              <SwapChains 
              onClick={handleSwapChains}
              x={getXOffset()}
              y={getYOffset()}
              />

              <div class="flex-box-column">
                <div class="title-input">To:</div>
                <Selector 
                  value={to}
                  tokens={Tokens}
                  chains={Chains}
                />
              </div>
            </div>

            {/* -------------------------------------------- */}

            <div class="flex-box-input">
              <div class="flex-box-column">
                <div class="title-input">From Account:</div>
                <AccountSelect 
                  accounts={fromAccts}
                />
              </div>

              <div class="flex-box-column">
                <div class="title-input">To Account:</div>
                <AccountSelect 
                  accounts={toAccts}
                />
              </div>
            </div>

            {/* -------------------------------------------- */}

            <div class="title-input">Transaction:</div>
            <input class="wallet-input" id="transaction-hash" />
            <div class="wallet-input-text" id="info">
              Info: ...
            </div>

            <SendButton onClick={handleSendButtonClick}/>


          </div>
        </div>
      </main>
    </div>
  );
}

export default App;