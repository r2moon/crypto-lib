import * as bip39 from "bip39";
import * as bitcoinjs from "bitcoinjs-lib";

const bs58check = require("bs58check");
import bigi from "bigi";
import { sha256 } from "js-sha256";

import { InvalidMnemonic } from "../Error";

export const generateMnemonic = (strength?: number): string => {
  const mnemonic = bip39.generateMnemonic(strength);
  return mnemonic;
};

export const validateMnemonic = (mnemonic: string) => {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new InvalidMnemonic();
  }
};

export const seedToWif = (
  seed: string,
  network?: bitcoinjs.Network
): string => {
  let isWif = false;

  try {
    bs58check.decode(seed);
    isWif = true;
    throw new Error("provided string is a WIF key");
  } catch (e) {
    if (!isWif) {
      const hash = sha256.create().update(seed);
      const bytes = hash.array();

      const d = bigi.fromBuffer(bytes).toBuffer(bytes.length);
      const keyPair = bitcoinjs.ECPair.fromPrivateKey(d, { network });
      return keyPair.toWIF();
    } else {
      throw new Error("provided string is a WIF key");
    }
  }
};

export default {
  generateMnemonic,
  validateMnemonic,
  seedToWif,
};
