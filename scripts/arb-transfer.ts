import { ethers } from "hardhat";


const myaddr = '0xB1f19051b05011199e04bE75326D0f113B5b62CD'

// 0xcb063e339b301f26b4b2eae8e49ce8beb185a57d6f07ce24b67f52cb386328db 参考这个地址的交易

// https://arbiscan.io/tx/0x41eeb20c04443044d73cea3917162c9d5357b9f4c0f594ce0f0624637fc132bc 抢arb成功的交易
async function transferArb() {

  while(1){
    try {


      console.log("enter transfer")
        const [owner] = await ethers.getSigners();
      const arb = new ethers.Contract("0x912CE59144191C1204E64559FE8253a0e49E6548",
          ["function transfer(address to,uint256 amount)"],
          owner)

        const tx = await arb.transfer(myaddr, ethers.utils.parseEther("3250"))
        // const tx = await arb.transfer("0x3219623A3CD8511a0F58d2826D327Ece59E6D097", ethers.utils.formatEther("3250"))
        // const tx = await arb.callStatic.transfer("0x3219623A3CD8511a0F58d2826D327Ece59E6D097", ethers.utils.parseEther("3250"), {from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'})

        console.log(tx);
    }
    catch (error){
      console.log(error)
    }
  }
}

async function estimateTransferArbGas() {
  const [owner] = await ethers.getSigners();
  const arb = new ethers.Contract("0x912CE59144191C1204E64559FE8253a0e49E6548",
      ["function transfer(address to,uint256 amount)"],
      owner)

    const gas = await arb.estimateGas.transfer(myaddr, ethers.utils.parseEther("3250"))

    console.log("transfer gas:", gas)
}

async function transferEth() {
  while(1){
    console.log(Date() .toLocaleString(), "enter transferEth")
      try{

        const [owner] = await ethers.getSigners();

        // const gasPrice = ethers.utils.parseEther("0.0000144000")
        const gasPrice = await owner.getGasPrice()
          const gasLimit = ethers.BigNumber.from('350000'); // 固定 Gas Limit，适用于发送ETH交易
        const fee = gasLimit.mul(gasPrice)
          const balance = await owner.getBalance()
          const v = balance.sub(fee)

          //if( v.lte( ethers.utils.parseEther("0.0000265464"))) {
          //  continue
          //}

        const tx = await owner.sendTransaction({
to: myaddr,
value: v
//gasLimit: gasLimit,
// gasPrice: gasPrice.mul(1)
})

console.log("transfer tx:", tx)
console.log("v:", v)
} catch (error){
  console.log("transferEth:", error)
}
}
}

async function main(){


  const tasks = new Array()
    for (let index = 0; index < 5; index++) {
      // tasks.push(transferArb())
      tasks.push(transferEth())
    }
  await Promise.all(tasks)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

main().catch((error)=>{
    console.log(error)
    })
