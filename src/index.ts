import Key from "./Key";
import utils from "./utils";
import Address from "./Address";

const test = async () => {
  const mnemonic =
    "high clog task open exchange course move wife advance glare near define";

  const address = Address.generate(mnemonic, "bitcoin");
  console.log(address);

  const balance = await Address.getBalance(address, "bitcoin");

  console.log(balance);
};

test();
export * from "./types";

module.exports = {
  utils,
  Address,
  Key,
};
