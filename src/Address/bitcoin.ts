import * as bitcoinjs from "bitcoinjs-lib";
import axios from "axios";

import { getNetwork } from "../Network/bitcoin";

import Key from "../Key";
import utils from "../utils";
import config from "../config";

import { InvalidAddress } from "../Error";

const generateAddress = (seed: string, isTestnet?: boolean): string => {
  Key.validateMnemonic(seed);

  const network = getNetwork(isTestnet);

  const wif = utils.seedToWif(seed, network);

  const keyPair = bitcoinjs.ECPair.fromWIF(wif, network);

  const address = bitcoinjs.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: network,
  }).address!;

  return address;
};

const validateAddress = (address: string, isTestnet?: boolean) => {
  const network = getNetwork(isTestnet);

  try {
    bitcoinjs.address.toOutputScript(address, network);
  } catch (err) {
    throw new InvalidAddress();
  }
};

const getHumanBalance = async (
  address: string,
  isTestnet?: boolean
): Promise<string> => {
  validateAddress(address);

  const api = config.bitcoin.api;

  try {
    const res = await axios.get(api + "/address/" + address);
    return res.data.balance;
  } catch (error) {
    return "0.0";
  }
};

export default {
  generateAddress,
  validateAddress,
  getHumanBalance,
};
