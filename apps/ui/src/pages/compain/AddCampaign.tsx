import React, { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { FormHeader } from '../../components/Form/FormHeader';
import { CampaignForm } from './CampaignForm';
import { useLaodContract } from '../../hooks/useLaodContract';
import {
  CharityCampaignFactory,
  CharityCampaignFactory__factory,
} from '../../typechain-types';
import FileUploadIPFS from '../../components/FileUploadIPFS';
import useMetaMask from '../../context/metamaskContext';

export function AddCampaign(props) {
  const { connectedWallet } = useMetaMask();
  const [campaignFactoryContract, setCampaignFactoryContract] =
    useState<CharityCampaignFactory | null>(null);
  useLaodContract({
    contractAddress: '0x912a059CF95E9b1caafdbd39E6B13201e169B458',
    abi: CharityCampaignFactory__factory.abi,
    contract: campaignFactoryContract,
    setContract: setCampaignFactoryContract,
  });

  const [ipfsHashes, setIpfsHashes] = useState([]);

  useEffect(() => {
    console.log('Campaign Factory Contract:', campaignFactoryContract);
  }, [campaignFactoryContract]);

  const handleSubmit = async (formData: { [key: string]: string }) => {
    console.log('Form Data:', formData);

    if (!campaignFactoryContract) {
      return;
    }

    const tx = await campaignFactoryContract.createCampaign(
      formData.name,
      formData.description,
      connectedWallet,
      100000,
      500,
      1000000000000,
      formData.tokenName,
      formData.tokenSymbol
    );
    const txrec = await tx.wait();
    console.log(txrec);
  };

  useEffect(() => {
    console.log(ipfsHashes);
  }, [ipfsHashes]);

  return (
    <Card>
      <FileUploadIPFS setIpfsHashes={setIpfsHashes} style={{}} />

      <FormHeader
        title="Create a New Campaign"
        subTitle="Help Save The World"
      />
      <CampaignForm onSubmit={handleSubmit} />
    </Card>
  );
}
