import generateAddress, { generateBTCAddress } from "./Address";
import { generateMnemonic } from "./Key";
import { seedToWif } from "./utils";

const mnemonic = generateMnemonic();

console.log(generateAddress(mnemonic, "bitcoin"));

export * from "./Address";
export * from "./Key";
export * from "./utils";

export * from "./types";
