import * as Elrond from "@elrondnetwork/dapp";
import { ElrondDappConfig, walletConnectBridge, walletConnectDeepLink } from "./Config";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.css";
import { routes } from "./router"
import { ContextProvider } from "./context";
import Layout from "./LoginLayout";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ContextProvider>
        <Elrond.Context
          config={{
            network: ElrondDappConfig,
            walletConnectBridge,
            walletConnectDeepLink
          }}
        >
          <Layout>
            <Switch>
              <Route
                path="/unlock"
                component={() => (
                  <Elrond.Pages.Unlock
                    callbackRoute="/nft-bridge"
                    title="Elrond Login"
                    lead="Please select your login method:"
                    ledgerRoute="/ledger"
                    walletConnectRoute="/walletconnect"
                  />
                )}
                exact={true}
                />
              <Route
                path="/ledger"
                component={() => (
                  <Elrond.Pages.Ledger callbackRoute="/nft-bridge" />
                )}
                exact={true}
                />
              <Route
                path="/walletconnect"
                component={() => (
                  <Elrond.Pages.WalletConnect
                    callbackRoute="/nft-bridge"
                    logoutRoute="/unlock"
                    title="Maiar Login"
                    lead="Scan the QR code using Maiar"
                  />
                )}
                exact={true}
              />

              {routes.map((route, i) => (
                <Route
                  path={route.path}
                  key={route.path + i}
                  component={route.component}
                  exact={true}
                />
              ))}
            </Switch>
          </Layout>
        </Elrond.Context>
      </ContextProvider>
    </Router>
  )
}

export default App;
