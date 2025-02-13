const todo = require("hardhat");
async function main() {
  // Get the ContractFactory and signers
  const [deployer] = await todo.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract to deploy
  const ETHcertify = await todo.ethers.getContractFactory("ETHcertifyPlatform");
  const ethCertify = await ETHcertify.deploy();

  console.log("TodoList contract deployed to:", ethCertify.address);
  // console.log(todoList);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
