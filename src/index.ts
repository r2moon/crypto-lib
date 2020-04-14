import Key from "./Key";
import utils from "./utils";
import Address from "./Address";

import { getHistory } from "./Transaction/bitcoin";

const test = async () => {
  const mnemonic =
    "high clog task open exchange course move wife advance glare near define";

  const address = Address.generate(mnemonic, "bitcoin");
  console.log(address);

  const balance = await Address.getBalance(address, "bitcoin");

  console.log(balance);

  const tx = await getHistory(address);
  console.log(tx);
};

test();
export * from "./types";

module.exports = {
  utils,
  Address,
  Key,
};
