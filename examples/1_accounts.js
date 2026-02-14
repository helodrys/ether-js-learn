// Require packages
require("dotenv").config()
const { ethers } = require("ethers")

// Setup connection
const URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
const provider = new ethers.JsonRpcProvider(URL)

const address = "0x388C818CA8B9251b393131C08a736A67ccB19297" 
async function main() {
  // Get balance
  const balance = await provider.getBalance(address)
  // Log balance
  console.log(`Balance of address ${address} is: ${ethers.formatEther(balance)} ETH`)
}

main()