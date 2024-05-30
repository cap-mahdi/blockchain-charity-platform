import React, { useEffect } from 'react';
import { CompainLayout } from './CompainLayout';
import filesIcon from '../../assets/files-icon.png';
import { Button } from '../../components/Button';
import { ExchangeSection } from './ExchangeSection';

import CharityCampaignAbi from '../../contracts/CharityCampain.abi';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import useCampaignContext from '../../context/useCampaignContext';
import { useLaodContract } from '../../hooks/useLaodContract';

export function CompainDetails(props) {
  const { campaignAddress } = useParams();
  const [campaignState, setCampaignState] = useCampaignContext();

  useLaodContract({
    contractAddress: campaignAddress,
    abi: CharityCampaignAbi,
    contract: campaignState.contract,
    setContract: (contract) => {
      setCampaignState((prev) => {
        return {
          ...prev,
          contract,
        };
      });
    },
  });

  useEffect(() => {
    if (campaignState.contract) {
      const desc = async () => {
        const desc = await campaignState.contract.description();
        console.log('Contract loaded:', desc);
      };

      desc();
    }
  }, [campaignState.contract]);
  return (
    <CompainLayout>
      <div className=" w-full px-8 pb-8 ">
        <h1 className="text-3xl font-[500] mb-4">Description</h1>
        <p className="text-lg mb-12">
          Le lorem ipsum est, en imprimerie, une suite de mots sans
          signification utilisée à titre provisoire pour calibrer une mise en
          page, le texte définitif venant remplacer le faux-texte dès qu'il est
          prêt ou que la mise en page est achevée. Généralement, on utilise un
          texte en faux latin, le Lorem ipsum ou Lipsum. 
        </p>

        <h1 className="text-3xl font-[500] mb-4">Our Goal</h1>
        <p className="text-lg mb-12">
          Le lorem ipsum est, en imprimerie, une suite de mots sans
          signification utilisée à titre provisoire pour calibrer une mise en
          page, le texte définitif venant remplacer le faux-texte dès qu'il est
          prêt ou que la mise en page est achevée. Généralement, on utilise un
          texte en faux latin, le Lorem ipsum ou Lipsum. 
        </p>
        <div className="flex flex-row gap-4 justify-start items-center">
          <img src={filesIcon} className="w-20 h-20" alt="files" />
          <Button className="bg-orange">White papaer and documents</Button>
        </div>
        <ExchangeSection />
      </div>
    </CompainLayout>
  );
}
