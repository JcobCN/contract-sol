import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";


const myaddr = '0xB1f19051b05011199e04bE75326D0f113B5b62CD'
const gasLimit = ethers.BigNumber.from('550000'); // 固定 Gas Limit，适用于发送ETH交易
let gasPrice = ethers.utils.parseUnits("0.1", "gwei")
let  alice:SignerWithAddress
let fee = gasLimit.mul(gasPrice)
let balance:BigNumber
let transferValue:BigNumber


function run(){
    ethers.getSigners().then(v=>{
      console.log("run here?")
      alice = <SignerWithAddress>v.at(0)
      alice.getGasPrice().then(_gasPrice=>{

          gasPrice = _gasPrice.mul(12).div(10)
          fee = gasLimit.mul(gasPrice)
          console.log("gasPrice,fee:", ethers.utils.formatUnits(gasPrice, "gwei"), ethers.utils.formatUnits(fee, "gwei"))
        })

      alice.getBalance().then(_balance=>{
        balance = _balance
        transferValue = balance.sub(fee)
        console.log("balance,transferValue:", ethers.utils.formatUnits(balance, "gwei"), ethers.utils.formatUnits(transferValue, "gwei"))
      })

      if(transferValue){
        console.log(`${transferValue} is no undefined`)
      }

      if(transferValue && transferValue!.gte(0)){
      alice.sendTransaction({
        to: myaddr,
        // value: ethers.utils.parseUnits("1", "wei"),
        value: transferValue,
        gasLimit: gasLimit,
        gasPrice: gasPrice
      }).then(v=>{
        console.log("tx:", v)
      }).catch(e=>{
        console.log("sendTx error:", e)
      })
    }

    })
  

}

setInterval(run, 100)