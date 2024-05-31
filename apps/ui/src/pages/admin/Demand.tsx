import { FC, useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { InfoDisplayer } from '../../components/InfoDisplayer';
import { Status } from '../../components/Status';
import { Avatar } from '../../components/Avatar';
import { ImagesModal } from './ImagesModal';
import { useParams } from 'react-router-dom';
import {
  DemandStatus,
  DemandType,
  numberToDemandStatusMapper,
} from '../../types/Demand';
import { contractAddress } from '../../constants';
import { Demand, Demand__factory } from '../../typechain-types';
import { ethers } from 'ethers';

export const DemandInfo: FC = () => {
  const [selectedImage, setSelectedImage] = useState<null | number>(null);
  const { index } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [{ association, status }, setDemand] = useState<DemandType>([]);
  const getDemand = async (index: number) => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const contract: Demand = new ethers.Contract(
        contractAddress,
        Demand__factory.abi,
        signer
      );
      try {
        const data = await contract.demands(index);
        console.log('Index ', index);

        setDemand({
          association: data[0],
          owner: data[1],
          status: numberToDemandStatusMapper[data[2]],
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Please Install MetaMask');
      //'Please install MetaMask'
      //Show TOAST
    }
  };
  useEffect(() => {
    if (index === undefined) return;
    getDemand(index);
  }, [index]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Card>
      <h1 className="text-2xl font-semibold text-gray-900">Demand Details</h1>
      <div className="flex flex-col gap-5 w-full items-start">
        <div className="flex flex-row gap-5 w-full justify-start items-center font-semibold ">
          <Avatar src="/images/default-avatar.png" />
          <p>{association.name}</p>
        </div>
        <div className="flex flex-row gap-5 w-full justify-start">
          <Status status={status} />
        </div>

        <div className="flex flex-row gap-5 w-full justify-start">
          <InfoDisplayer
            label="About"
            value={association.description}
            direction="col"
          />
        </div>
        <div className="flex flex-row gap-5 w-full justify-start">
          <InfoDisplayer label="Email" value={association.email} />
          <InfoDisplayer label="Phone Number" value={association.phoneNumber} />
          <InfoDisplayer label="Country" value={association.country} />
        </div>
        <div className="flex flex-row gap-5 w-full justify-start">
          <InfoDisplayer
            label="Street Address"
            value={association.streetAddress}
          />
          <InfoDisplayer label="City" value={association.city} />
          <InfoDisplayer label="State / Province" value={association.state} />
          <InfoDisplayer
            label="Zip / Postal Code"
            value={association.postalCode}
          />
        </div>
        <hr className="w-full border-1 border-gray rounded-lg my-2" />
        <div className="flex flex-row gap-5 w-full justify-start">
          <InfoDisplayer
            label="Creation Date"
            value={new Date(
              Number(association.creationDate)
            ).toLocaleDateString()}
          />

          <InfoDisplayer
            label="Association Size"
            value={String(association.size)}
          />
          <InfoDisplayer
            label="Association Domain"
            // value={association.domain}
            value="This value is hard coded"
          />
        </div>
        <div className="rounded-lg border-1 border-dashed border-black p-2  w-full text-gray-900  sm:text-sm sm:leading-6 flex flex-row items-center gap-4 flex-wrap">
          {Array.from({ length: 10 }).map((_, index) => (
            <img
              key={index}
              className="w-60 cursor-pointer"
              src="images/post-image.png"
              alt="files icon upload"
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {selectedImage != null && (
        <ImagesModal
          images={[
            'images/post-image.png',
            'images/post-image.png',
            'images/post-image.png',
            'images/post-image.png',
          ]}
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
      <div className="flex flex-row gap-3 w-full justify-end">
        <button
          className="bg-red-500 text-black py-3 px-4 text-xs font-semibold rounded-xl "
          type="button"
        >
          Refuse{' '}
        </button>
        <button
          className="bg-green-500 text-black py-3 px-4 text-xs font-semibold rounded-xl"
          type="button"
        >
          Approve{' '}
        </button>
      </div>
    </Card>
  );
};
