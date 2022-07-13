import '@nomiclabs/hardhat-waffle';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

task('deploy', 'Deploy Om contract').setAction(
  // async (_, hre: HardhatRuntimeEnvironment): Promise<void> => {
  //   const Om = await hre.ethers.getContractFactory('Om');
  //   // const om = await Om.deploy();

  //   // await om.deployed();

  //   // console.log('Om deployed to:', om.address);
  // }
);
