import { ExpiringSoon } from './components/ExpiringSoon';
import { AvailableCompain } from './components/AvailableCompain';
import { StyledChart } from '../../components/chart/StyledChart';
import { Card } from '../../components/Card';
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { CharityCampaignDAO } from '../../typechain-types';
import { CharityCampaignDAO__factory } from '../../typechain-types/factories/src/services/blockchain/contracts/DAO';
import { ethers } from 'ethers';

const GET_COMPAINS = gql`
  query GetCompains {
    campaignCreateds(orderBy: blockTimestamp) {
      id
      campaignAddress
      tokenAddress
      blockNumber
      blockTimestamp
    }
  }
`;

export function HomePage(props) {
  const [loadData, comapainsItems] = useLazyQuery(GET_COMPAINS);
  const [campaigns, setCampaigns] = useState([]);
  const getCampaigns = async (data) => {
    console.log('Registering');
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const latestBlock = await provider.getBlock('latest');

      const signer = await provider.getSigner();
      // const contract: AssociationFactory = new ethers.Contract(
      //   associationContractAddress,
      //   AssociationFactory__factory.abi,
      //   signer
      // );

      console.log('data', data);
      try {
        // const data = await contract.getAssociationsWithStatus();
        const campaigns = await Promise.all(
          data.map(async (cmp: any) => {
            const campaignContract: CharityCampaignDAO = new ethers.Contract(
              cmp.campaignAddress,
              CharityCampaignDAO__factory.abi,
              signer
            );

            const title = await campaignContract.title();
            const description = await campaignContract.description();
            let totalDonations = await campaignContract.totalDonations();
            // let duration = await campaignContract.duration();

            // console.log('duration', duration);
            const duration = latestBlock.timestamp - cmp.blockTimestamp;
            console.log('duration', duration);
            const percentage = (duration / 120) * 100;

            totalDonations = ethers.getBigInt(totalDonations);

            totalDonations = ethers.formatEther(totalDonations);

            return {
              campaignAddress: cmp.campaignAddress,
              title,
              description,
              totalDonations,
              percentage,
            };
          })
        );
        console.log('campaigns', campaigns);

        setCampaigns(campaigns);
        // setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Please Install MetaMask');
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log('compainsItems', comapainsItems.data);
    if (comapainsItems.data) {
      console.log('compainsItems', comapainsItems.data.campaignCreateds);
      getCampaigns(comapainsItems.data.campaignCreateds);
    }
  }, [comapainsItems]);

  return (
    <div className="flex flex-col gap-4 w-[100%] justify-center items-center">
      <Card className="h-[25rem] p-8">
        <StyledChart />
      </Card>
      <ExpiringSoon />
      <AvailableCompain campaigns={campaigns} />
    </div>
  );
}
