const ethers = require("ethers");

// Contract address and ABI
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = getTheAbi();

// Backend's private key
const backendPrivateKey = "BACKEND_PRIVATE_KEY";

// Connect to the Ethereum network
const provider = new ethers.providers.JsonRpcProvider("YOUR_RPC_PROVIDER_URL");
const wallet = new ethers.Wallet(backendPrivateKey, provider);

// Contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Function to set a user's name on behalf of the frontend
async function setNameOnBehalfOfUser(userAddress, userName) {
  // Call the contract function to set the user's name
  const setNameTransaction = await contract
    .connect(wallet)
    .setUserName(userAddress, userName);
  await setNameTransaction.wait();
}

// Example: Set the name for a user
const userAddress = "USER_ADDRESS";
const userName = "Jane";

setNameOnBehalfOfUser(userAddress, userName);

const getTheAbi = () => {
  try {
    const dir = path.resolve(
      __dirname,
      "./artifacts/contracts/Greeter.sol/Greeter.json"
    );
    const file = fs.readFileSync(dir, "utf8");
    const json = JSON.parse(file);
    const abi = json.abi;
    console.log(`abi`, abi);

    return abi;
  } catch (e) {
    console.log(`e`, e);
  }
};
