
const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("Greeter");
  const con = await Contract.deploy();

  await con.deployed();

  console.log(`deployed to ${lock.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
