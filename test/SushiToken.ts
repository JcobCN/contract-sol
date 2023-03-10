import { expect } from "chai";
import { ethers } from "hardhat";
import { SushiTokenFakeOwner__factory, SushiToken__factory } from "../typechain-types";

describe("SushiToken Testing", ()=>{
  before(async function () {
    this.SushiToken = await ethers.getContractFactory("SushiToken")
    this.signers = await ethers.getSigners()
    this.alice = this.signers[0]
    this.bob = this.signers[1]
    this.carol = this.signers[2]
  })

  beforeEach(async function () {
    this.sushi = await this.SushiToken.deploy()
    await this.sushi.deployed()
    console.log("deploy?")
  })

  it("Should get correct name and symbol and decimal", async function(){
    const name = await this.sushi.name()
    const symbol =  await this.sushi.symbol()
    const decimals = await this.sushi.decimals()
    expect(name, "SushiToken")
    expect(symbol, "SUSHI")
    expect(decimals, "18")
  })

  it("Do nothing", async function () {
    
  })

  it("Should only allow owner to mint token", async function(){
    await this.sushi.mint(this.alice.address, "100")
    await this.sushi.mint(this.bob.address, "1000")
    await expect(this.sushi.connect(this.bob).mint(this.carol.address, "1000")).to.be.revertedWith(
      "Ownable: caller is not the owner"
    )
  })

})