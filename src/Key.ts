import * as bip39 from "bip39";

const generateMnemonic = (strength?: number): string => {
  const mnemonic = bip39.generateMnemonic(strength);
  return mnemonic;
};

export default {
  generateMnemonic,
};
