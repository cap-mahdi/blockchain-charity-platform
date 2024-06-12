import React, { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { FormHeader } from '../../components/Form/FormHeader';
import { InfoDisplayer } from '../../components/InfoDisplayer';
import { Button } from '../../components/Button';
import filesIcon from '../../assets/files-icon.png';
import { useParams } from 'react-router-dom';
import { AssociationContract } from '../../typechain-types';
import { useLaodContract } from '../../hooks/useLaodContract';
import { AssociationContract__factory } from '../../typechain-types/factories/src/services/blockchain/contracts/Association.sol';

const association = {
  name: 'Health Professionals Network',
  description:
    'An international organization focused on healthcare advancements and professional development.',
  email: 'info@healthpro.org',
  country: 'Canada',
  streetAddress: '5678 Wellness Ave',
  city: 'Toronto',
  state: 'Ontario',
  postalCode: 'M5G 1L5',
  creationDate: '2008-09-23',
  size: '3000',
  domain: 'Art & Culture',

  status: 'Active',
};

export function AssociationDetails(props) {
  const [associationContract, setAssociationContract] =
    useState<AssociationContract>();
  const [association, setAssociation] = useState({});
  const params = useParams();
  console.log('params', params);

  useLaodContract({
    contractAddress: params.asssociationId,
    abi: AssociationContract__factory.abi,
    contract: associationContract,
    setContract: setAssociationContract,
  });

  useEffect(() => {
    if (associationContract) {
      const getData = async () => {
        const data = await associationContract.getAssociationDetails();
        setAssociation({
          name: data[0],
          description: data[1],
          email: data[2],
          country: data[3],
          streetAddress: data[4],
          city: data[5],
          state: data[6],
          postalCode: data[7],
          creationDate: data[8],
          size: data[9],
          status: data[10],
        });
      };
      getData();
    }
  }, [associationContract]);

  return (
    <Card className="mt-10 py-8 px-8">
      <div className="relative  w-full h-full ">
        {/* Association Photo */}
        <div className="absolute w-full left-[97%] -translate-y-14 z-10">
          <img
            src="https://www.croissant-rouge.tn/logo.png"
            alt="Association"
            className="w-24 h-24 rounded-full  "
          />
        </div>
      </div>
      <FormHeader title={association?.name} subTitle={association?.domain} />
      <div className=" w-full px-8 pb-8 flex flex-col gap-6">
        <h1 className="text-2xl font-[500] mb-2">Description</h1>
        <p className="text-lg mb-6">{association?.description}</p>

        <h1 className="text-2xl font-[500] mb-2">Our Goal</h1>
        <p className="text-lg mb-6">{association?.description}</p>
        <div className="flex flex-row gap-8 flex-wrap">
          <div>
            <h1 className="text-2xl font-[500] mb-2">Email</h1>
            <p className="text-lg mb-6">{association?.email}</p>
          </div>
          <div>
            <h1 className="text-2xl font-[500] mb-2">Creation Date</h1>
            <p className="text-lg mb-6">{association?.creationDate}</p>
          </div>
          <div>
            <h1 className="text-2xl font-[500] mb-2">Size</h1>
            <p className="text-lg mb-6">{association?.size} Employee</p>
          </div>
          <div>
            <h1 className="text-2xl font-[500] mb-2">Country</h1>
            <p className="text-lg mb-6">{association?.country}</p>
          </div>

          <div>
            <h1 className="text-2xl font-[500] mb-2">City</h1>
            <p className="text-lg mb-6">{association?.city}</p>
          </div>

          <div>
            <h1 className="text-2xl font-[500] mb-2">State</h1>
            <p className="text-lg mb-6">{association?.state}</p>
          </div>
          <div>
            <h1 className="text-2xl font-[500] mb-2">Street Address</h1>
            <p className="text-lg mb-6">{association?.streetAddress}</p>
          </div>
          <div>
            <h1 className="text-2xl font-[500] mb-2">Postal Code</h1>
            <p className="text-lg mb-6">{association?.postalCode}</p>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-start items-center">
          <img src={filesIcon} className="w-20 h-20" alt="files" />
          <Button className="bg-orange">White papaer and documents</Button>
        </div>
      </div>
    </Card>
  );
}
