import { generateAddress, getHumanBalance } from "../Address/bitcoin";
import { getHistory } from "../Transaction/bitcoin";

import { TxFilterOptions, TxInfo } from "../types";
import { BitcoinTrezorTxResponse } from "../types/bitcoin";

class Bitcoin {
  private readonly _mnemonic: string;
  public readonly address: string;
  public readonly isTestnet?: boolean;

  constructor(mnemonic: string, isTestnet?: boolean) {
    this._mnemonic = mnemonic;
    this.isTestnet = isTestnet;
    this.address = generateAddress(mnemonic, isTestnet);
  }

  async getBalance(address?: string): Promise<string> {
    return getHumanBalance(address ? address : this.address, this.isTestnet);
  }

  async getTxHistory(address?: string, options?: TxFilterOptions) {
    const addressToGet = address ? address : this.address;

    const txRes: BitcoinTrezorTxResponse[] = await getHistory(
      addressToGet,
      options,
      this.isTestnet
    );
  }

  async getOriginalTxHistory(
    address?: string,
    options?: TxFilterOptions
  ): Promise<BitcoinTrezorTxResponse[]> {
    const addressToGet = address ? address : this.address;

    return getHistory(addressToGet, options, this.isTestnet);
  }

  private _normalizeTx(tx: BitcoinTrezorTxResponse): TxInfo {
    let txInfo: TxInfo = {
      id: tx.txid,
      blockHash: tx.blockhash,
      blockNumber: tx.blockheight,
      confirmations: tx.confirmations,
      timestamp: tx.time,
      fee: tx.fees,
    };
    return txInfo;
  }
}

export default Bitcoin;
