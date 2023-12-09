const express = require("express");
const { ethers } = require("ethers");

const app = express();
const port = 3003;

app.use(express.json());

const privateKey =
  "c5258181b6b8eaf4ade774df62369acb154614aa2d28fd037afce84eaa3791a4";

// Ethereum network endpoint (Infura)
const provider = new ethers.providers.JsonRpcProvider(
  `https://polygon-mumbai.g.alchemy.com/v2/3wk4SXoy1syqjJAwuTlh0lzshqj8-ohH`
);

// Ethereum wallet
const wallet = new ethers.Wallet(privateKey, provider);

// API endpoint for deploying a Solidity contract
app.post("/deploy-contract", async (req, res) => {
  try {
    // Get contract data from the request body
    const { bytecode, abi } = req.body;

    // Create a contract factory
    const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);

    // Deploy the contract
    const deployedContract = await contractFactory.deploy();

    // Wait for the contract to be mined
    await deployedContract.deployed();

    // Respond with the deployed contract address
    res.json({ contractAddress: deployedContract.address });
  } catch (error) {
    console.error("Error deploying contract:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
