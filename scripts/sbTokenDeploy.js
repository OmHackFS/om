const hre = require("hardhat");

async function main() {

  const OmSbToken = await hre.ethers.getContractFactory("OmSbToken");
  const omSbToken = await OmSbToken.deploy();

  await omSbToken.deployed();

  console.log("OmSbToken deployed to:", omSbToken.address);
  

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
