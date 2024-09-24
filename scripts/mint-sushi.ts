import { ethers  } from "hardhat";
import tokensInfo from "../lib/tokens-info";

async function main() {

 const [owner] = await ethers.getSigners();
 console.log(tokensInfo.SushiToken.bscTest.address)
 const sushi =  new ethers.Contract(tokensInfo.SushiToken.bscTest.address, 
  ["function mint(address _to, uint256 _amount)"],
  owner
  )

  const tx = await sushi.mint(owner.address, ethers.utils.parseEther("1"))

  console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
