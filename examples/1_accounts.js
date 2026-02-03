// Require packages
require("dotenv").config()
const { ethers } = require("ethers")

// Setup connection
const URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
const provider = new ethers.JsonRpcApiProvider(URL)

const address = "0x388C818CA8B9251b393131C08a736A67ccB19297" 
async function main() {
  // Get balance
  const balance = await provider.getBalance()
  // Log balance
}

main()