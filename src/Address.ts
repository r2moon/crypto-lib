import * as bitcoinjs from "bitcoinjs-lib";

import { seedToWif } from "./utils";
import { CoinType } from "./types";

export const generateBTCAddress = (seed: string, options?: any): string => {
  const wif = seedToWif(seed, options?.network);

  const keyPair = bitcoinjs.ECPair.fromWIF(wif, options?.network);
  const address = bitcoinjs.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: options?.network,
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

export default generateAddress;
