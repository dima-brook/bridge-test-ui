import Fungible from "./Fungible";
import NonFungible from './NonFungible';
import ElrondTxnHandler from "./ElrondTxnHandler"

export const routes = [
  {
    path: "/nft",
    component: NonFungible
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
    component: () => <ElrondTxnHandler redirect="/nft" />
  }
]