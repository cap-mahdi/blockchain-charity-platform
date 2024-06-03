import React, { useEffect, useState } from 'react';
import { CompainLayout } from './CompainLayout';
import filesIcon from '../../assets/files-icon.png';
import { Button } from '../../components/Button';
import { ExchangeSection } from './ExchangeSection';

import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import useCampaignContext from '../../context/useCampaignContext';
import { useLaodContract } from '../../hooks/useLaodContract';
import {
  CharityCampaignDAO,
  CharityCampaignDAO__factory,
} from '../../typechain-types';

export function CompainDetails(props) {
  const { campaignAddress } = useParams();
  const [campaignState, setCampaignState] = useCampaignContext();
  useLaodContract({
    contractAddress: campaignAddress,
    abi: CharityCampaignDAO__factory.abi,
    contract: campaignState.contract,
    setContract: (contract: CharityCampaignDAO) => {
      setCampaignState((prev) => {
        return {
          ...prev,
          contract,
        };
      });
    },
  });

  const [campaign, setCampaign] = useState<CharityCampaign | null>(null);

  useEffect(() => {
    if (campaignState.contract) {
      const desc = async () => {
        const desc = await campaignState.contract?.description();
        setCampaign((prev) => {
          return {
            ...prev,
            description: desc,
          };
        });
        console.log('Contract loaded:', desc);
      };

      desc();
    }
  }, [campaignState.contract]);
  return (
    <CompainLayout>
      <div className=" w-full px-8 pb-8 ">
        <h1 className="text-3xl font-[500] mb-4">Description</h1>
        <p className="text-lg mb-12">{campaign?.description}</p>

        <h1 className="text-3xl font-[500] mb-4">Our Goal</h1>
        <p className="text-lg mb-12">{campaign?.description}</p>
        <div className="flex flex-row gap-4 justify-start items-center">
          <img src={filesIcon} className="w-20 h-20" alt="files" />
          <Button className="bg-orange">White papaer and documents</Button>
        </div>
        <ExchangeSection />
      </div>
    </CompainLayout>
  );
}
