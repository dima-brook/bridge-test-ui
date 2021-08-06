import Fungible from "./Fungible";
import NonFungible from './NonFungible';
import PredefinedNFTAccounts from './NFTAccountsForm';
import ElrondTxnHandler from "./ElrondTxnHandler"

export const routes = [
  {
    path: "/nft-bridge",
    component: NonFungible
  },
  {
    path: "/nft",
    component: PredefinedNFTAccounts
  },
  {
    path: "/transfer",
    component: Fungible
  },
  {
    path: "/processelrd",
    component: () => <ElrondTxnHandler redirect="/transfer" />
  },
  {
    path: "/processelrdnft",
    component: () => <ElrondTxnHandler redirect="/nft-bridge" />
  }
]