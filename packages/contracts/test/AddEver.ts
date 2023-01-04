import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("AddEver", function () {
  async function deployContract() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const AddEver = await ethers.getContractFactory("AddEver");
    const addEver = await AddEver.deploy();

    return { addEver, owner, otherAccount };
  }

  it("returns empty when there is no data", async function () {
    const { addEver, owner } = await loadFixture(deployContract);

    expect(await addEver.hosts(owner.address)).to.equal("");
  });

  it("returns the current host for an address", async function () {
    const { addEver, owner } = await loadFixture(deployContract);

    await addEver.setHost("https://example.com");

    expect(await addEver.hosts(owner.address)).to.equal("https://example.com");
  });

  it("does not return someone else's address", async function () {
    const { addEver, owner, otherAccount } = await loadFixture(deployContract);

    await addEver.connect(owner).setHost("https://example.com");

    expect(await addEver.hosts(otherAccount.address)).to.equal("");
  });
});
