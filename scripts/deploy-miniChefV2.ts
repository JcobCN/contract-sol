import { ethers } from "hardhat";
import tokensInfo from "../lib/tokens-info";

async function main() {

  console.log(tokensInfo.SushiToken.bscTest.address)
  const MiniChef = await ethers.getContractFactory("MiniChefV2");
  const miniChef = await MiniChef.deploy(tokensInfo.SushiToken.bscTest.address);

  await miniChef.deployed();

  console.log(`MiniChefV2 Contract deployed on address:${miniChef.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
