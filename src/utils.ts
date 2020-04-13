import * as bitcoinjs from "bitcoinjs-lib";

const bs58check = require("bs58check");
import bigi from "bigi";
import { sha256 } from "js-sha256";

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
