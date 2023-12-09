require("@nomicfoundation/hardhat-toolbox");

const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
const { MATIC_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.17",
	networks: {
		mumbai: {
			url: "https://polygon-mumbai.g.alchemy.com/v2/3wk4SXoy1syqjJAwuTlh0lzshqj8-ohH",
			accounts: [`5c7b83eb113b1c8cea824737a41d6483b61151c20b4485f2239c9ad7819fc17e`],
		},
		scrollSepolia: {
			url: "https://sepolia-rpc.scroll.io",
			accounts:
				process.env.MATIC_PRIVATE_KEY !== undefined
					? [process.env.MATIC_PRIVATE_KEY]
					: [],
		},
	},
	paths: {
		artifacts: "artifacts",
	},
};
