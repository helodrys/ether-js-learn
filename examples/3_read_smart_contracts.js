require("dotenv").config()
const { ethers } = require("ethers")
const { promptForKey } = require("../helpers/prompt.js")

// Setup connection
const URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
const provider = new ethers.JsonRpcProvider(URL)

// Define "Application Binary Interface"
const ERC20_ABI = [
  "function name() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint256)",
]
// Setup contract
const ERC20_address = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
const contract = new ethers.Contract(ERC20_address, ERC20_ABI, provider)

async function main() {
  // Get contract state
  const address = await promptForKey("Enter the ERC20 contract address: ")
  const name = await contract.name()
  const totalSupply = await contract.totalSupply()
  const decimals = await contract.decimals()
  const symbol = await contract.symbol()

  // Log contract state
  console.log(`Reading from ${ERC20_address}`)
  console.log(`Name: ${name}`)
  console.log(`Total Supply: ${totalSupply}\n`)
  console.log(`Decimals: ${decimals}`)
  console.log(`Symbol: ${symbol}`)

  // Get ERC20 balance
  const balance = await contract.balanceOf(address)
  // Log ERC20 balance
  console.log(`Balance of ${address}: ${ethers.formatEther(balance, decimals)} ${symbol}`)
}

main()