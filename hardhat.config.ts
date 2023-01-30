import "@nomicfoundation/hardhat-toolbox";
import invariant from "tiny-invariant";
import { HardhatUserConfig } from "hardhat/config";

import dotenv from "dotenv";
dotenv.config();

const ALCHEMY_KEY = process.env.ALCHEMY_KEY;
invariant(ALCHEMY_KEY, "ALCHEMY_KEY env variable not found. Add it to the .env file.");
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
invariant(GOERLI_PRIVATE_KEY, "GOERLI_PRIVATE_KEY env variable not found. Add it to the .env file.");

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
      accounts: ["0xccaff8e69792600ce341e55540935ed7bf55281258f22325788743caf376db16"]
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};

export default config;
