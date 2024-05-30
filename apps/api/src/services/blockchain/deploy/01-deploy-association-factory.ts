import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
// import verify from '../utils/verify';
import { networkConfig } from '../../../../helper-hardhat-config';

const deployFundMe: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number = network.config.chainId!;

  log('----------------------------------------------------');
  log('Deploying AssociationFactory and waiting for confirmations...');
  const fundMe = await deploy('AssociationFactory', {
    from: deployer,
    log: false,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 0,
  });
  log(`Association Factory deployed at ${fundMe.address}`);
};
export default deployFundMe;
deployFundMe.tags = ['all', 'Association'];
