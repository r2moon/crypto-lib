import * as bitcoinjs from "bitcoinjs-lib";
import { Network } from "bitcoinjs-lib/types";

import utils from "./utils";
import { CoinType } from "./types";

export const generateBTCAddress = (seed: string, options?: any): string => {
  let network: Network = bitcoinjs.networks.bitcoin;
  if (options && options.network) {
    network = options.network as Network;
  }

  const wif = utils.seedToWif(seed, network);

  const keyPair = bitcoinjs.ECPair.fromWIF(wif, network);

  const address = bitcoinjs.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: network,
  }).address!;

  return address;
};

const generateAddress = (
  seed: string,
  type: CoinType,
  options?: any
): string => {
  if (type === "bitcoin") {
    return generateBTCAddress(seed, options);
  } else {
    throw new Error("Unsupported coin type");
  }
};

export default {
  generate: generateAddress,
  generateBTCAddress,
};
