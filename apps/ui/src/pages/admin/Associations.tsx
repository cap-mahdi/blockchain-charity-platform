import { FC, useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { Link } from 'react-router-dom';
import { TbListDetails } from 'react-icons/tb';
import { Pagination } from '../../components/Pagination';
import { Status } from '../../components/Status';
import { ethers } from 'ethers';
import { associationContractAddress } from '../../constants';
import { DemandType } from '../../types/Demand';
import {
  AssociationFactory,
  AssociationFactory__factory,
} from '../../typechain-types';
import {
  AssociationType,
  numberToAssociationEnumMapper,
} from '../../types/Association';
import { AssociationContract } from '../../typechain-types/Association.sol';
import { AssociationContract__factory } from '../../typechain-types/factories/Association.sol';

export const Associations: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [associations, setAssociations] = useState<AssociationType[]>([]);
  const totalElementPerPage = 10;
  const pages = Math.ceil(associations.length / totalElementPerPage);
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
            return {
              name: assoInfo[0],
              description: assoInfo[1],
              email: assoInfo[2],
              country: assoInfo[3],
              streetAddress: assoInfo[4],
              city: assoInfo[5],
              state: assoInfo[6],
              postalCode: assoInfo[7],
              creationDate: assoInfo[8],
              size: assoInfo[9],
              status: numberToAssociationEnumMapper[asso.status],
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
    return <p>Loading...</p>;
  }
  return (
    <Card className="items-start py-5">
      <h1 className="text-2xl font-extrabold">Associations</h1>
      <div className="flex flex-col w-full">
        <div className="flex flex-row py-2 px-3">
          <h3 className="w-1/12 p-1 font-extrabold">Name</h3>
          <h3 className="w-4/12 p-1  font-extrabold">About</h3>
          <h3 className="w-2/12 p-1 font-extrabold">Email</h3>
          <h3 className="w-2/12 p-1 font-extrabold">Country</h3>
          <h3 className="w-2/12 p-1 font-extrabold">Status</h3>
          <p className="w-1/12 p-1 font-extrabold"></p>
        </div>
        {associations
          .slice((page - 1) * totalElementPerPage, page * totalElementPerPage)
          .map((association, index) => (
            <div
              key={index}
              className={`flex flex-row justify-start ${
                index % 2 && 'bg-light-gray'
              } py-2 px-3`}
            >
              <p className="w-1/12 p-1">{association.name}</p>
              <p className="w-4/12 p-1">
                {association.description.length > 100
                  ? association.description.slice(0, 100) + '...'
                  : association.description}
              </p>
              <p className="w-2/12 p-1">{association.email}</p>
              <p className="w-2/12 p-1">{association.country}</p>
              <Status status={association.status} />
              <p className="w-1/12  p-1 flex justify-center text-lg">
                <Link
                  to={`/admin/association/${
                    index + (page - 1) * totalElementPerPage
                  }`}
                >
                  <TbListDetails />
                </Link>
              </p>
            </div>
          ))}
      </div>
      <Pagination
        selectedPage={page}
        totalPages={pages}
        onPageChange={(pageNumber) => {
          setPage(pageNumber);
        }}
      />
    </Card>
  );
};
