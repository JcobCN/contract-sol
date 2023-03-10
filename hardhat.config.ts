import "dotenv/config"
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { HttpNetworkConfig } from "hardhat/types";

const accounts = {
  mnemonic: process.env.MNEMONIC || "test test test test test test test test test test test junk"
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{version: "0.8.17"}, {version: "0.6.12"}]
  },
  networks:{
    bsc_testnet: {
      url: `https://rpc.ankr.com/bsc_testnet_chapel/${process.env.API_KEY}`,
      accounts,
      chainId: 97,
    }
  }
};

task("accounts", "Prints the list of accounts", async (taskArgs, hre)=>{
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts){
    console.log(account.address)
  }
})

task("my_accounts", "Prints the list of accounts", async (taskArgs, hre)=>{
  const account = hre.ethers.Wallet.fromMnemonic(process.env.MNEMONIC as string).connect(new hre.ethers.providers.JsonRpcProvider(hre.config.networks["bsc_testnet"].url));
  console.log(account.address)
  console.log("balance:", hre.ethers.utils.formatEther(await account.getBalance()))
  console.log("chainId:", await account.getChainId())
})

export default config;
