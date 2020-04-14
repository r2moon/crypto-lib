export type BitcoinTrezorAddressInfo = {
  page: number;
  totalPages: number;
  itemsOnPage: number;
  addrStr: string;
  balance: string;
  totalReceived: string;
  totalSent: string;
  unconfirmedBalance: string;
  unconfirmedTxApperances: number;
  txApperances: number;
  transactions: string[];
};

export type Vin = {
  txid: string;
  vout: number;
  sequence: number;
  n: number;
  scriptSig: {
    hex: string;
  };
  addresses: string[];
  value: string;
};

export type Vout = {
  value: string;
  n: number;
  scriptPubKey: {
    hex: string;
    addresses: string[];
  };
  spent: boolean;
};

export type BitcoinTrezorTxResponse = {
  txid: string;
  version: number;
  vin: Vin[];
  vout: Vout[];
  blockhash: string;
  blockheight: number;
  confirmations: number;
  time: number;
  blocktime: number;
  valueOut: string;
  valueIn: string;
  fees: string;
  hex: string;
};
