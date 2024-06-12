import { FC, useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { InfoDisplayer } from '../../components/InfoDisplayer';
import { Avatar } from '../../components/Avatar';
import { ImagesModal } from './ImagesModal';
import { useParams } from 'react-router-dom';
import {
  PINATA_GATEWAY,
  associationContractAddress,
  plateformContractAddress,
} from '../../constants';
import { ethers } from 'ethers';
import {
  AssociationContract,
  AssociationContract__factory,
  AssociationFactory,
  AssociationFactory__factory,
  PlateformContract,
  PlateformContract__factory,
} from '../../typechain-types';
import {
  AssociationStatus,
  AssociationType,
  numberToAssociationEnumMapper,
} from '../../types/Association';
import { Status } from '../../components/Status';
import { Spinner } from '../../components/Spinner';
import useMetaMask from '../../context/metamaskContext';
import { toast } from 'react-toastify';
import { IoIosLogIn } from 'react-icons/io';
import { FaHourglassEnd } from 'react-icons/fa';
import { MdDomainVerification } from 'react-icons/md';

export const AssociationInfo: FC = () => {
  const [selectedImage, setSelectedImage] = useState<null | number>(null);
  const { index } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [association, setAssociation] = useState<AssociationType>(null);
  const [associationAddress, setAssociationAddress] = useState<string>('');
  const { defineSteps, nextStep, failedStep, terminate } = useMetaMask();
  const switchStatus = async () => {
    if (index === undefined) return;
    if (!association) return;
    if (typeof window.ethereum !== 'undefined') {
      try {
        defineSteps([
          {
            title: 'Step 1',
            description: 'Register with MetaMask',
            icon: <IoIosLogIn />,
          },
          {
            title: 'Step 2',
            description: 'Sending Transaction',
            icon: <FaHourglassEnd />,
          },
          {
            title: 'Step 3',
            description: 'Verification Transaction',
            icon: <MdDomainVerification />,
          },
        ]);
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        nextStep();
        const plateformContract: PlateformContract = new ethers.Contract(
          plateformContractAddress,
          PlateformContract__factory.abi,
          signer
        );
        const tx = await plateformContract.changeAssociationStatus(
          associationAddress,
          association.status === AssociationStatus.Active ? 1 : 0
        );
        nextStep();
        await tx.wait();
        nextStep();
        terminate();
        getAssociation(index);
      } catch (err) {
        console.log(err);
        failedStep();
        toast.error('An error occured,Please try again');
      }
    } else {
      toast.error('Please Install MetaMask');
    }
  };

  const getAssociation = async (index: string) => {
    if (index === undefined) return;
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const associationFactoryContract: AssociationFactory =
        new ethers.Contract(
          associationContractAddress,
          AssociationFactory__factory.abi,
          signer
        );
      console.log('index ', index);
      const data = await associationFactoryContract.getAssociationWithStatus(
        index
      );
      console.log('data', data[0]);
      setAssociationAddress(data[0]);

      const associationContract: AssociationContract = new ethers.Contract(
        data[0],
        AssociationContract__factory.abi,
        signer
      );

      const associationInfo = await associationContract.getAssociationDetails();
      console.log('images', associationInfo[12]);
      setAssociation({
        name: associationInfo[0],
        description: associationInfo[1],
        email: associationInfo[2],
        phoneNumber: associationInfo[3],
        country: associationInfo[4],
        streetAddress: associationInfo[5],
        city: associationInfo[6],
        state: associationInfo[7],
        postalCode: associationInfo[8],
        creationDate: associationInfo[9],
        size: associationInfo[10],
        domain: associationInfo[11],
        imagesHashes: associationInfo[12].map(
          (hash) => `${PINATA_GATEWAY}${hash}`
        ),
        status: numberToAssociationEnumMapper[Number(data[1])],
      });
      setIsLoading(false);
    } else {
      console.log('Please Install MetaMask');
    }
  };

  useEffect(() => {
    if (index === undefined) return;
    getAssociation(index);
  }, [index]);

  if (isLoading) {
    return <Spinner />;
  }
  if (association === null) return <p>Association not found</p>;
  return (
    <Card>
      <h1 className="text-2xl font-semibold text-gray-900">
        Association Details
      </h1>
      <div className="flex flex-col gap-5 w-full items-start">
        <div className="flex flex-row gap-5 w-full justify-start items-center font-semibold ">
          <Avatar src="/images/default-avatar.png" />
          <p>{association.name}</p>
        </div>
        <div className="flex flex-row gap-5 w-full justify-start">
          <Status status={association.status} />
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
            value={association.domain}
          />
        </div>
        <div className="rounded-lg border-1 border-dashed border-black p-2  w-full text-gray-900  sm:text-sm sm:leading-6 flex flex-row items-center gap-4 flex-wrap">
          {association.imagesHashes.map((hash, index) => (
            <img
              key={index}
              className="w-60 cursor-pointer"
              src={hash}
              alt="files icon upload"
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {selectedImage != null && (
        <ImagesModal
          images={association.imagesHashes}
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
      <div className="flex flex-row gap-3 w-full justify-end">
        {association.status === AssociationStatus.Active ? (
          <button
            className="bg-red-500 text-black py-3 px-4 text-xs font-semibold rounded-xl "
            type="button"
            onClick={switchStatus}
          >
            Make Inactive
          </button>
        ) : (
          <button
            className="bg-green-500 text-black py-3 px-4 text-xs font-semibold rounded-xl"
            type="button"
            onClick={() => switchStatus()}
          >
            Make Active
          </button>
        )}
      </div>
    </Card>
  );
};
