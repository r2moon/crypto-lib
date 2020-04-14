import * as bitcoinjs from "bitcoinjs-lib";
import { Network } from "bitcoinjs-lib/types";

export const getNetwork = (isTestnet?: boolean): Network => {
  let network: Network = bitcoinjs.networks.bitcoin;
  if (isTestnet) {
    network = bitcoinjs.networks.testnet;
  }

  return network;
};
