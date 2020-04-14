import * as bip39 from "bip39";
import { InvalidMnemonic } from "../Error";

const generateMnemonic = (strength?: number): string => {
  const mnemonic = bip39.generateMnemonic(strength);
  return mnemonic;
};

const validateMnemonic = (mnemonic: string) => {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new InvalidMnemonic();
  }
};

export default {
  generateMnemonic,
  validateMnemonic,
};
