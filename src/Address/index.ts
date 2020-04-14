import bitcoin from "./bitcoin";

import { CoinType } from "../types";

const generateAddress = (
  seed: string,
  type: CoinType,
  options?: any,
  isTestnet?: boolean
): string => {
  if (type === "bitcoin") {
    return bitcoin.generateAddress(seed, isTestnet);
  } else {
    throw new Error("Unsupported coin type");
  }
};

const getHumanBalance = async (
  seed: string,
  type: CoinType,
  options?: any,
  isTestnet?: boolean
): Promise<string> => {
  if (type === "bitcoin") {
    return await bitcoin.getHumanBalance(seed, isTestnet);
  } else {
    throw new Error("Unsupported coin type");
  }
};

export default {
  generate: generateAddress,
  getBalance: getHumanBalance,
};
