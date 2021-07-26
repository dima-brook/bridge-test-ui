import Fungible from "./Fungible";
import NonFungible from './NonFungible';

export const routes = [
  {
    path: "/transfer",
    component: Fungible
  },
  {
    path: "/nft",
    component: NonFungible
  }
]