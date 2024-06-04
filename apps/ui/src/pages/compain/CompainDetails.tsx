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
import { FaLongArrowAltRight } from 'react-icons/fa';
import { VoteSection } from './VoteSection';

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

  const [campaign, setCampaign] = useState<CharityCampaignDAO | null>(null);

  useEffect(() => {
    if (campaignState.contract) {
      const getData = async () => {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send('eth_requestAccounts', []);
          const title = await campaignState.contract?.title();
          const description = await campaignState.contract?.description();
          const totalDonations = await campaignState.contract?.totalDonations();
          let numProposals = await campaignState.contract?.numProposals();
          console.log(numProposals);
          numProposals = parseInt(ethers.getBigInt(numProposals).toString());
          console.log(numProposals);
          // const latestBlock = await provider.getBlock('latest');
          // const timestamp =await campaignState.contract?.startTimeStamp()
          // const duration =
          //   latestBlock.timestamp -
          //   campaignState.contract?.;
          // console.log('duration', duration);
          // const percentage = (duration / 120) * 1;
          setCampaign((prev) => {
            return {
              ...prev,
              description,
              title,
              totalDonations,
              numProposals,
            };
          });
        }
      };

      getData();
    }
  }, [campaignState.contract]);
  return (
    <CompainLayout title={campaign?.title}>
      <div className=" w-full px-8 pb-8  ">
        <h1 className="text-3xl font-[500] mb-4">Description</h1>
        <p className="text-lg mb-12">{campaign?.description}</p>
        {/* <h1 className="text-3xl font-[500] mb-4">Our Goal</h1>
        <p className="text-lg mb-12">{campaign?.description}</p> */}
        <div className="flex flex-row gap-4 justify-start items-center">
          <img src={filesIcon} className="w-20 h-20" alt="files" />
          <Button className="bg-orange">White papaer and documents</Button>
        </div>
        <ExchangeSection />
        {!campaign?.numProposals ? (
          ''
        ) : campaign?.numProposals > 0 ? (
          <VoteSection campaign={campaignState.contract} />
        ) : (
          ''
        )}{' '}
        <Button
          onClick={async () => {
            const tx = await campaignState.contract?.withdrawFunds({
              gas: 1000000,
            });
            const txrec = await tx.wait();
            console.log(txrec);
          }}
        >
          Withdraw
        </Button>
      </div>
      <div className="w-full flex flex-row justify-end mr-4 mb-4">
        <Button className="bg-orange w-fit flex flex-row items-center gap-2">
          <p>Follow the news | Acess Feed</p>
          <FaLongArrowAltRight className="w-6 h-6" />
        </Button>
      </div>
    </CompainLayout>
  );
}
