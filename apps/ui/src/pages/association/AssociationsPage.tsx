import React, { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { FormHeader } from '../../components/Form/FormHeader';
import { AssociationCard } from './components/AssociationCard';
import { domain } from '@snapshot-labs/snapshot.js/dist/sign';
import {
  AssociationContract,
  AssociationFactory,
  AssociationFactory__factory,
  PlateformContract,
} from '../../typechain-types';
import { associationContractAddress } from '../../constants';
import { numberToAssociationEnumMapper } from '../../types/Association';
import { Spinner } from '../../components/Spinner';
import { ethers } from 'ethers';

export function AssociationsPage(props) {
  const [associations, setAssociations] = React.useState<
    PlateformContract.DemandStruct['association'][]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAssociations = async () => {
    console.log('Registering');
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const contract: AssociationFactory = new ethers.Contract(
        associationContractAddress,
        AssociationFactory__factory.abi,
        signer
      );

      console.log('contract', contract);
      try {
        const data = await contract.getAssociationsWithStatus();
        const associations = await Promise.all(
          data.map(async (asso: any) => {
            const associationContract: AssociationContract =
              new ethers.Contract(
                asso.associationAddress,
                AssociationContract__factory.abi,
                signer
              );

            const assoInfo = await associationContract.getAssociationDetails();
            console.log('assoInfo', assoInfo);

            return {
              name: assoInfo[0],
              description: assoInfo[1],
              email: assoInfo[2],
              phone: assoInfo[3],
              country: assoInfo[4],
              streetAddress: assoInfo[5],
              city: assoInfo[6],
              state: assoInfo[7],
              postalCode: assoInfo[8],
              creationDate: assoInfo[9],
              size: assoInfo[10],
              // domain: assoInfo[11],
            };
          })
        );
        console.log('associations', associations);

        setAssociations(associations);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Please Install MetaMask');
    }
  };
  useEffect(() => {
    getAssociations();
  }, []);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Card className="py-8 px-8 h-full overflow-y-auto">
      <FormHeader
        title="Associations"
        subTitle="Here you can go throught all the available associations"
      />

      <div
        style={{
          rowGap: '1rem',
        }}
        className=" w-[96.5%] flex flex-row justify-start items-start flex-wrap gap-[2%]  "
      >
        {' '}
        {associations.map((association) => (
          <AssociationCard association={association} />
        ))}
      </div>
    </Card>
  );
}
