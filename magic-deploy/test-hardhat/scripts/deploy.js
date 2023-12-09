const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("VotingSystem");
  const con = await Contract.deploy();

  await con.waitForDeployment();

  console.log(`deployed to ${lock.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
