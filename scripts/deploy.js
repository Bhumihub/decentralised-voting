// const hre = require("hardhat");

// async function main() {
//   const Voting = await hre.ethers.getContractFactory("Voting");
//   const Voting_ = await Voting.deploy(["Mark", "Mike", "George"], 20);

//   await Voting_.deployed();

//   console.log(
//     Contract address : ${Voting_.address}
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const hre = require("hardhat");

async function main() {
  const Voting = await hre.ethers.getContractFactory("Voting");
  const Voting_ = await Voting.deploy(["Mark", "Mike", "George"], 20);

  await Voting_.deployed();

  console.log(`Contract address : ${Voting_.address}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
