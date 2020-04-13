import Key from "./Key";
import utils from "./utils";
import Address from "./Address";

const mnemonic = Key.generateMnemonic();

console.log(Address.generate(mnemonic, "bitcoin"));

export * from "./types";

module.exports = {
  utils,
  Address,
  Key,
};
