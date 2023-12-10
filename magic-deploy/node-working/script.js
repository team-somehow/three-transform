require("dotenv").config();

const express = require("express");
const { ethers } = require("ethers");
const cors = require("cors");

const app = express();

app.use(cors());

const port = 3003;

app.use(express.json());

const privateKey = process.env.SECRET_KEY;

app.post("/deploy-contract", async (req, res) => {
  try {
    const { bytecode, abi, rpc, is_test } = req.body;

    if (is_test === true) {
      res.json({
        contractAddress: "0x59C39ea204283Da6Da83Fa6ca50ECdc9815e6C3f",
      });
    } else {
      const provider = new ethers.providers.JsonRpcProvider(rpc);
      // `https://polygon-mumbai.g.alchemy.com/v2/3wk4SXoy1syqjJAwuTlh0lzshqj8-ohH`
      // );

      const wallet = new ethers.Wallet(privateKey, provider);

      const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);

      const deployedContract = await contractFactory.deploy();

      await deployedContract.deployed();

      res.json({ contractAddress: deployedContract.address });
    }
  } catch (error) {
    console.error("Error deploying contract:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
