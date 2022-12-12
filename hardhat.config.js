require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    ropsten: {
      url: "https://ropsten.infura.io/v3/9c15e1d0aa3a46518d75e4af59f98c5c",
      chainId: 3,
      accounts: ["0990487c3e54cc0b4f6922b6ef8b29277afdbfb2ae6cc4437a14d521f7bbae0f"],
      gas: 1000000,
      gasPrice: 8000000000
    },
  },
};
