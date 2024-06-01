import { ethers, getNamedAccounts } from 'hardhat';
import {
  AssociationFactory,
  PlateformContract,
} from '../../../../typechain-types';

async function main() {
  const { deployer } = await getNamedAccounts();
  const associationFactory: AssociationFactory = await ethers.getContract(
    'AssociationFactory',
    deployer
  );
  console.log(
    `Got contract AssociationFactory at ${associationFactory.address}`
  );
  const plateformContract: PlateformContract = await ethers.getContract(
    'PlateformContract',
    deployer
  );

  const admin = await plateformContract.admins(0);
  console.log('First Admin:', admin);
  console.log('Deployer:', deployer);
  const plateformContractAddress = await associationFactory.plateformAddress();
  console.log(
    'Plateform Contract Address from Contract:',
    plateformContractAddress
  );
  console.log('Plateform Contract Address:', plateformContract.address);
  const associationContractAddress =
    await plateformContract.getAssociationFactory();
  console.log(
    'Association Factory Address from Contract:',
    associationContractAddress
  );
  console.log('Association Factory Address:', associationFactory.address);

  // Add demand
  await plateformContract
    .addDemand(
      'name',
      'description',
      'email',
      'phoneNumber',
      'country',
      'streetAddress',
      'city',
      'state',
      'postalCode',
      BigInt(Date.now()),
      BigInt(100),
      'domain'
    )
    .then((tx) => tx.wait());
  console.log('Demand added');

  // Check demands length
  const demands = await plateformContract.getAllDemands();
  const demandsLength = demands.length;
  console.log('Total Demands:', demandsLength);

  // Accept the first demand if exists
  if (demandsLength > 0) {
    console.log('Accepting first demand...');
    const tx = await plateformContract.acceptDemand(0);
    await tx.wait();
    console.log('First demand accepted');

    // Retrieve the newly deployed association contract address
    const firstAssociation = await associationFactory.associationsArray(0);
    console.log('First Association:', firstAssociation);

    // Verify if the AssociationContract is deployed at the retrieved address
    const associationContractCode = await ethers.provider.getCode(
      firstAssociation
    );
    if (associationContractCode === '0x') {
      console.log(`No contract deployed at address ${firstAssociation}`);
    } else {
      console.log(`Contract found at address ${firstAssociation}`);
    }
  } else {
    console.log('No demands to accept.');
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
