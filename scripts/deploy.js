const hre = require("hardhat");

const main = async () => {
  const Ecommerce = await hre.ethers.getContractFactory('Ecommerce')
  const ecommerce = await Ecommerce.deploy()

  await ecommerce.deployed()

  console.log('Ecommerce deployed to:', ecommerce.address)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain()