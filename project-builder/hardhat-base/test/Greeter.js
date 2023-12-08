const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Greeter", function () {
  let greeter;
  let owner;
  let user1;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();

    const Greeter = await ethers.getContractFactory("Greeter");
    greeter = await Greeter.deploy();
    await greeter.deployed();
  });

  it("should set the owner correctly", async function () {
    expect(await greeter.owner()).to.equal(owner.address);
  });

  it("should set user name", async function () {
    const newName = "Alice";
    await greeter.connect(user1).setUserName(newName);

    expect(await greeter.getUserName(user1.address)).to.equal(newName);

    // Check the event was emitted
    const tx = await greeter.connect(user1).setUserName(newName);
    const nameSetEvent = await tx.wait(1).then((receipt) => receipt.events[0]);
    expect(nameSetEvent.event).to.equal("NameSet");
    expect(nameSetEvent.args.user).to.equal(user1.address);
    expect(nameSetEvent.args.name).to.equal(newName);
  });
});
