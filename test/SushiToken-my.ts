import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SUSHI Token", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const ONE_GWEI = 1_000_000_000;

    // Contracts are deployed using the first signer/account by default
    const [owner, bob, carol] = await ethers.getSigners();

    const SushiToken = await ethers.getContractFactory("SushiToken");
    const sushi = await SushiToken.deploy();

    return { sushi,  owner, bob, carol };
  }

  describe("Deployment", function () {
    it("Should be get right owner, symbol, name and decimals", async function () {
      const { sushi, owner } = await loadFixture(deployOneYearLockFixture);

      expect(await sushi.symbol()).to.equal("SUSHI");
      expect(await sushi.name()).to.equal("SushiToken");
      expect(await sushi.decimals()).to.equal(18);
      console.log("decimals pass..")
      expect(await sushi.owner()).to.equal(owner.address);
      expect(await sushi.totalSupply()).to.equal(0);
      console.log()
    });

    it("Allow mint", async function() {
      const { sushi, owner, bob, carol } = await loadFixture(deployOneYearLockFixture);

      await sushi.mint(owner.address, 100)
      await sushi.mint(bob.address, 100)
      expect(sushi.connect(bob).mint(carol.address, 1000, {from: owner.address})).to.be.revertedWith("Ownable: caller is not the owner");
    })

    it("Allow transfer", async function() {
      const { sushi, owner, bob, carol } = await loadFixture(deployOneYearLockFixture);
      
      await sushi.mint(owner.address, 100)
      await sushi.transfer(carol.address, 100)
      expect(await sushi.balanceOf(carol.address)).to.equal(100);
      expect(await sushi.balanceOf(owner.address)).to.equal(0);
    })

    it("Allow trasferFrom", async() => {
      const { sushi, owner, bob, carol } = await loadFixture(deployOneYearLockFixture);
      
      await sushi.mint(owner.address, 100)
      await sushi.approve(bob.address, 100)
      await sushi.connect(bob).transferFrom(owner.address, carol.address, 100)

      expect(await sushi.balanceOf(carol.address)).to.equal(100);
      expect(await sushi.balanceOf(owner.address)).to.equal(0);

    })
  });

});
