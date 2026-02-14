require("dotenv").config()
const { ethers } = require("ethers")

// Import private key helper
const { promptForKey } = require("../helpers/prompt.js")
const { Wallet } = require("ethers")

// Setup connection
const URL = process.env.TENDERLY_RPC_URL
const provider = new ethers.JsonRpcProvider(URL)

const RECEIVER = "0xB11039e1Fb3a2a41c05655D68b980E7F7D8a1407" // Address 2 

async function main() {
  console.log(URL)
  const privateKey = await promptForKey()
  console.log(privateKey)

  // Setup wallet
  const wallet = new Wallet(privateKey, provider)
  // Get balances
  const senderBalanceBefore = await provider.getBalance(wallet.address)
  const receiverBalance = await provider.getBalance(RECEIVER)
  // Log balances
  console.log(`Sender balance before: ${ethers.formatEther(senderBalanceBefore, 18)} ETH`) // 18 = ยกกำลัง
  console.log(`Reciever balance before: ${ethers.formatEther(receiverBalance, 18)} ETH \n`)
  // Create transaction
  const transaction = await wallet.sendTransaction({
    to: RECEIVER,
    value: ethers.parseEther("1", 18),
  })
  // Wait transaction
  const receipt = await transaction.wait()

  console.log(transaction)
  console.log(receipt)
  // Get balances
  const senderBalanceAfter = await provider.getBalance(wallet.address)
  const receiverBalanceAfter = await provider.getBalance(RECEIVER)
  // Log balances
  console.log(`\nSender balance after: ${ethers.formatEther(senderBalanceAfter, 18)} ETH`) // 18 = ยกกำลัง
  console.log(`Reciever balance after: ${ethers.formatEther(receiverBalanceAfter, 18)} ETH`)
  }
main()