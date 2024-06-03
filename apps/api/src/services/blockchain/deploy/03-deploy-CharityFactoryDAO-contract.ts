import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
// import verify from '../utils/verify';
import {
  developmentChains,
  networkConfig,
} from '../../../../helper-hardhat-config';
import verify from '../utils/verify';
import { ethers } from 'hardhat';

const deployDemandContract: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number = network.config.chainId!;
  const associationFacortyContract = await ethers.getContract(
    'AssociationFactory',
    deployer
  );
  log('----------------------------------------------------');
  log('Deploying CharityCampaignFactoryDAO and waiting for confirmations...');
  const CharityCampaignFactoryDAO = await deploy('CharityCampaignFactoryDAO', {
    from: deployer,
    log: false,
    args: [associationFacortyContract.address],
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 0,
  });
  log(
    `CharityCampaignFactoryDAO deployed at ${CharityCampaignFactoryDAO.address}`
  );

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(CharityCampaignFactoryDAO.address, [
      associationFacortyContract.address,
    ]);
  }
};
export default deployDemandContract;
deployDemandContract.tags = ['all', 'CharityFactoryDAO'];
