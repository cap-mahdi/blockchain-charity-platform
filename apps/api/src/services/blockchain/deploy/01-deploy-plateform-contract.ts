import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
// import verify from '../utils/verify';
import {
  developmentChains,
  networkConfig,
} from '../../../../helper-hardhat-config';
import verify from '../utils/verify';

const deployDemandContract: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number = network.config.chainId!;

  log('----------------------------------------------------');
  log('Deploying PlateformContract and waiting for confirmations...');
  const plateformContract = await deploy('PlateformContract', {
    from: deployer,
    log: false,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });
  log(`PlateformContract deployed at ${plateformContract.address}`);

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(plateformContract.address, []);
  }
};
export default deployDemandContract;
deployDemandContract.tags = ['all', 'Plateform'];
