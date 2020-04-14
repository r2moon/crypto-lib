import axios from "axios";

import { validateAddress } from "../Address/bitcoin";
import { encodeQueryData } from "../utils";

import config from "../config";
import { TxFilterOptions } from "../types";
import {
  BitcoinTrezorAddressInfo,
  BitcoinTrezorTxResponse,
} from "../types/bitcoin";

const api = config.bitcoin.api;

export const getTxIds = async (
  address: string,
  options?: TxFilterOptions,
  isTestnet?: boolean
): Promise<string[]> => {
  validateAddress(address);

  const query = options ? "?" + encodeQueryData(options) : "";

  const res = await axios.get(api + "/address/" + address + query);
  const addressInfo = res.data as BitcoinTrezorAddressInfo;

  return addressInfo.transactions;
};

export const getHistory = async (
  address: string,
  options?: TxFilterOptions,
  isTestnet?: boolean
) => {
  validateAddress(address);

  const txIds = await getTxIds(address, options, isTestnet);

  const promiseList = txIds.map((txId) => axios.get(api + "/tx/" + txId));

  const txsRes = await Promise.all(promiseList);
  const txRedableRes = txsRes.map(
    (txRes) => txRes.data as BitcoinTrezorTxResponse
  );
  return txRedableRes;
};

export default {
  getTxIds,
  getHistory,
};
