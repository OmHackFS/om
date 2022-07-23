import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

import "./tasks/deploy";

// import 'hardhat-dependency-compiler';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.4",

  paths: {
    artifacts: "./frontend-next/artifacts",
  },
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: 1000,
      },
      initialBaseFeePerGas: 0,
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.TEST_ETH_ACCOUNT_PRIVATE_KEY !== undefined
          ? [process.env.TEST_ETH_ACCOUNT_PRIVATE_KEY]
          : [],
      gas: 2100000,
      gasPrice: 8000000000,
    },
    rinkeby: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.TEST_ETH_ACCOUNT_PRIVATE_KEY !== undefined
          ? [process.env.TEST_ETH_ACCOUNT_PRIVATE_KEY]
          : [],
      gas: 2100000,
      gasPrice: 8000000000,
    },
    mumbai: {
      url: process.env.MUMBAI_URL || "",
      accounts:
        process.env.TEST_ETH_ACCOUNT_PRIVATE_KEY !== undefined
          ? [process.env.TEST_ETH_ACCOUNT_PRIVATE_KEY]
          : [],
      gas: 2100000,
      gasPrice: 8000000000,
    },
    mumbai2: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/0aWYomtIkhZ7DpFAZtNasdu74nL_ZlMf",
      chainId: 80001,
      accounts: [
        "e66c96225cd605559b10405b8c3acd03a43df3637f98a1ea60984e42e79dc015",
      ],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
