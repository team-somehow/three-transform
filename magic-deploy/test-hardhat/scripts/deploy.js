const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("VotingSystem");
  const con = await Contract.deploy();

  await con.deployed(); // Use deployed() instead of waitForDeployment()

  console.log(`deployed to ${con.address}`); // Fix the variable name here
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
