import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
// import verify from '../utils/verify';
import {
  developmentChains,
  networkConfig,
} from '../../../../helper-hardhat-config';
import verify from '../utils/verify';
import { PlateformContract } from '../../../../typechain-types';
import { ethers } from 'hardhat';

const deployAssociationFactory: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number = network.config.chainId!;
  console.log('here', deployer);
  const plateformContract: PlateformContract = await ethers.getContract(
    'PlateformContract',
    deployer
  );
  console.log('here');
  const plateformContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  log('The Plateform contract address is:', plateformContractAddress);
  log('----------------------------------------------------');
  log('Deploying AssociationFactory and waiting for confirmations...');
  const associationFactory = await deploy('AssociationFactory', {
    from: deployer,
    log: false,
    args: [plateformContractAddress],
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 0,
  });
  log(`Association Factory deployed at ${associationFactory.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(associationFactory.address, [plateformContractAddress]);
  }
  await plateformContract.setAssociationFactory(associationFactory.address);
};

export default deployAssociationFactory;
deployAssociationFactory.tags = ['all', 'Association'];
