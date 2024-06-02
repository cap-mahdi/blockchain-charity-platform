import { FC, useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { Link } from 'react-router-dom';
import { TbListDetails } from 'react-icons/tb';
import { Pagination } from '../../components/Pagination';
import { Status } from '../../components/Status';
import { ethers } from 'ethers';
import { plateformContractAddress } from '../../constants';
import { DemandType, numberToDemandStatusMapper } from '../../types/Demand';
import {
  PlateformContract,
  PlateformContract__factory,
} from '../../typechain-types';
import { Spinner } from '../../components/Spinner';

export const Demands: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [demands, setDemands] = useState<DemandType[]>([]);
  const totalElementPerPage = 10;
  const pages = Math.ceil(demands.length / totalElementPerPage);
  const getDemands = async () => {
    console.log('Registering');
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const contract: PlateformContract = new ethers.Contract(
        plateformContractAddress,
        PlateformContract__factory.abi,
        signer
      );
      console.log('contract', contract);
      try {
        const data = await contract.getAllDemands();
        console.log('date', data);
        const demands: DemandType[] = data.map((proxy: any) => {
          return {
            association: proxy[0],
            owner: proxy[1],
            status: numberToDemandStatusMapper[proxy[2]],
          };
        });
        setDemands(demands);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Please Install MetaMask');
    }
  };
  useEffect(() => {
    getDemands();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Card className="items-start py-5">
      <h1 className="text-2xl font-extrabold">Demands</h1>
      <div className="flex flex-col w-full">
        <div className="flex flex-row py-2 px-3">
          <h3 className="w-1/12 p-1 font-extrabold">Name</h3>
          <h3 className="w-4/12 p-1  font-extrabold">About</h3>
          <h3 className="w-2/12 p-1 font-extrabold">Email</h3>
          <h3 className="w-2/12 p-1 font-extrabold">Country</h3>
          <h3 className="w-2/12 p-1 font-extrabold">Status</h3>
          <p className="w-1/12 p-1 font-extrabold"></p>
        </div>
        {demands
          .slice((page - 1) * totalElementPerPage, page * totalElementPerPage)
          .map(({ association, status }, index) => (
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
              <Status status={status} />
              <p className="w-1/12  p-1 flex justify-center text-lg">
                <Link
                  to={`/admin/demand/${
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
