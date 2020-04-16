import * as bitcoinjs from "bitcoinjs-lib";
import axios from "axios";

import { getNetwork } from "../Network/bitcoin";

import Key, { seedToWif } from "../Key";
import config from "../config";

import { BitcoinTrezorAddressInfo } from "../types/bitcoin";
import { InvalidAddress } from "../Error";

export const generateAddress = (seed: string, isTestnet?: boolean): string => {
  Key.validateMnemonic(seed);

  const network = getNetwork(isTestnet);

  const wif = seedToWif(seed, network);

  const keyPair = bitcoinjs.ECPair.fromWIF(wif, network);

  const address = bitcoinjs.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: network,
  }).address!;

  return address;
};

export const validateAddress = (address: string, isTestnet?: boolean) => {
  const network = getNetwork(isTestnet);

  try {
    bitcoinjs.address.toOutputScript(address, network);
  } catch (err) {
    throw new InvalidAddress();
  }
};

export const getHumanBalance = async (
  address: string,
  isTestnet?: boolean
): Promise<string> => {
  validateAddress(address);

  const api = config.bitcoin.api;

  try {
    const res = await axios.get(api + "/address/" + address);
    const addressInfo = res.data as BitcoinTrezorAddressInfo;
    return addressInfo.balance;
  } catch (error) {
    return "0.0";
  }
};

export default {
  generateAddress,
  validateAddress,
  getHumanBalance,
};
