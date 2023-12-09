const { Web3 } = require("web3");
const provider = new Web3.providers.HttpProvider(
  "https://rpc-mumbai.maticvigil.com/"
);
const web3 = new Web3(provider);

const solc = require("solc");
const fs = require("fs");
const path = require("path");

const fileName = "Greeter.sol";
const contractName = "Greeter";

// Read the Solidity source code from the file system
const contractPath = path.join(__dirname, fileName);
const sourceCode = fs.readFileSync(contractPath, "utf8");

// solc compiler config
const input = {
  language: "Solidity",
  sources: {
    [fileName]: {
      content: sourceCode,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

// Compile the Solidity code using solc
const compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));

console.log(compiledCode);
// Get the bytecode from the compiled contract
const bytecode =
  compiledCode.contracts[fileName][contractName].evm.bytecode.object;

// Write the bytecode to a new file
const bytecodePath = path.join(__dirname, "MyContractBytecode.bin");
fs.writeFileSync(bytecodePath, bytecode);

// Log the compiled contract code to the console
console.log("Contract Bytecode:\n", bytecode);

// Get the ABI from the compiled contract
const abi = compiledCode.contracts[fileName][contractName].abi;

// Write the Contract ABI to a new file
const abiPath = path.join(__dirname, "MyContractAbi.json");
fs.writeFileSync(abiPath, JSON.stringify(abi, null, "\t"));

// Log the Contract ABI to the console
console.log("Contract ABI:\n", abi);

const privateKey =
  "0x96e2ee3510fb7814b8f07956122eb36790b1f9937625bef049e3920f9e52b1d7";
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

const contract = new web3.eth.Contract(abi);

contract
  .deploy({ data: bytecode })
  .send({ from: account.address, gas: 1000000 })
  .on("transactionHash", (hash) => {
    console.log("Transaction hash:", hash);
  })
  .on("receipt", (receipt) => {
    console.log("Contract deployed at address:", receipt.contractAddress);
  })
  .on("error", (error) => {
    console.error(error);
  });

function printManifestation() {
  console.log("We are going to win ETHIndia 2023");
}

printManifestation();