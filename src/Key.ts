import * as bip39 from "bip39";

export const generateMnemonic = (strength?: number): string => {
  const mnemonic = bip39.generateMnemonic(strength);
  return mnemonic;
};
