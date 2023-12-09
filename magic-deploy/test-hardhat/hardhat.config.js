require("@nomicfoundation/hardhat-toolbox");

const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
const { MATIC_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: "https://polygon-testnet.public.blastapi.io",
      account: [`0x${MATIC_PRIVATE_KEY}`],
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io",
      accounts: [MATIC_PRIVATE_KEY],
    },
  },
  paths: {
    artifacts: "artifacts",
  },
};
