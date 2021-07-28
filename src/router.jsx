import Fungible from "./Fungible";
import NonFungible from './NonFungible';
import ElrondTxnHandler from "./ElrondTxnHandler"

export const routes = [
  {
    path: "/transfer",
    component: Fungible
  },
  {
    path: "/nft",
    component: NonFungible
  },
  {
    path: "/processelrd",
    component: ElrondTxnHandler
  }
]