// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

import { ethers, run, network } from 'hardhat';

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = ethers.utils.parseEther('0.0001');

//   const Lock = await ethers.getContractFactory('Lock');
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log('Lock with 1 ETH deployed to:', lock.address);
// }
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
  const SimpleStorage = await SimpleStorageFactory.deploy();
  await SimpleStorage.deployed();
  console.log('deployed to:', SimpleStorage.address);

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await SimpleStorage.deployTransaction.wait(6);
    await verify(SimpleStorage.address, []);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const verify = async (contractAddress: string, args: any[]) => {
  console.log('Verifying...');
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error: any) {
    if (error.message.toLowerCase().includes('already verified')) {
      console.log('already verified!');
    } else {
      console.error(error);
    }
  }
};
