import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    // sepolia: {
    //   url: "https://sepolia.infura.io/v3/324c605325d04c05ba2c6da352fda206",
    //   accounts: [
    //     "0x8a96689c1e1748e01c33c63a3cdae5e25a8b55ee042088e0790e5a474752becf",
    //   ], // Private key of your testnet account
    // },
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true,
      initialBaseFeePerGas: 0,
      gas: 10000000,
    },
  },
  sourcify: {
    enabled: true,
  },
};

export default config;
