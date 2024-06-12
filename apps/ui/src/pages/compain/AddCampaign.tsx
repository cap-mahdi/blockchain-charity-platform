import React, { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { FormHeader } from '../../components/Form/FormHeader';
import { CampaignForm } from './CampaignForm';
import { useLaodContract } from '../../hooks/useLaodContract';
import {
  CharityCampaignFactoryDAO,
  CharityCampaignFactoryDAO__factory,
} from '../../typechain-types';
import FileUploadIPFS from '../../components/FileUploadIPFS';
import useMetaMask from '../../context/metamaskContext';
import { constants } from 'buffer';
import { campaignFactoryContractAddress } from '../../constants';
import { toast } from 'react-toastify';
import { FaCloudUploadAlt, FaHourglassEnd } from 'react-icons/fa';
import { IoIosLogIn } from 'react-icons/io';
import { MdDomainVerification } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export function AddCampaign(props) {
  const {
    connectedWallet,
    defineSteps,
    nextStep,
    terminate,
    failedStep,
    connectWallet,
  } = useMetaMask();
  const navigate = useNavigate();
  const [campaignFactoryContract, setCampaignFactoryContract] =
    useState<CharityCampaignFactoryDAO | null>(null);
  useLaodContract({
    contractAddress: campaignFactoryContractAddress,
    abi: CharityCampaignFactoryDAO__factory.abi,
    contract: campaignFactoryContract,
    setContract: setCampaignFactoryContract,
  });

  const [ipfsHashes, setIpfsHashes] = useState([]);

  useEffect(() => {
    console.log('Campaign Factory Contract:', campaignFactoryContract);
  }, [campaignFactoryContract]);

  const handleSubmit = async (formData: { [key: string]: string }) => {
    if (!campaignFactoryContract) {
      return;
    }
    if (window.ethereum === undefined) {
      toast.error('Please install MetaMask');
      return;
    }
    try {
      defineSteps([
        {
          title: 'Step 1',
          description: 'Register with MetaMask',
          icon: <IoIosLogIn />,
        },
        {
          title: 'Step 2',
          description: 'Upload Documents to IPFS',
          icon: <FaCloudUploadAlt />,
        },
        {
          title: 'Step 3',
          description: 'Sending Transaction',
          icon: <FaHourglassEnd />,
        },
        {
          title: 'Step 4',
          description: 'Verification Transaction',
          icon: <MdDomainVerification />,
        },
      ]);
      if (connectedWallet === null) {
        await connectWallet();
      }
      nextStep();
      nextStep();
      const tx = await campaignFactoryContract.createCampaign(
        formData.name,
        formData.description,
        connectedWallet,
        BigInt('1000000000000000000'),
        500,
        BigInt('1000000000000000000'),
        formData.tokenName,
        formData.tokenSymbol
      );
      nextStep();
      const txrec = await tx.wait();
      nextStep();
      terminate(() => {
        navigate(`/`);
      });
      toast.success('Campaign created successfully');
      console.log(txrec);
    } catch (e) {
      failedStep();
      console.log(e);
      toast.error('Failed to create campaign');
    }
  };

  useEffect(() => {
    console.log(ipfsHashes);
  }, [ipfsHashes]);

  return (
    <Card>
      {/* <FileUploadIPFS setIpfsHashes={setIpfsHashes} style={{}} />*/}
      <FormHeader
        title="Create a New Campaign"
        subTitle="Help Save The World"
      />
      <CampaignForm onSubmit={handleSubmit} />
    </Card>
  );
}
