import React, { useEffect, useState } from 'react';
import { CompainLayout } from './CompainLayout';
import filesIcon from '../../assets/files-icon.png';
import { Button } from '../../components/Button';
import { ExchangeSection } from './ExchangeSection';

import { Link, useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import useCampaignContext from '../../context/useCampaignContext';
import { useLaodContract } from '../../hooks/useLaodContract';
import {
  AssociationFactory,
  AssociationFactory__factory,
  CharityCampaignDAO,
  CharityCampaignDAO__factory,
} from '../../typechain-types';
import { FaHourglassEnd, FaLongArrowAltRight } from 'react-icons/fa';
import { VoteSection } from './VoteSection';
import { associationContractAddress } from '../../constants';
import { AssociationContract__factory } from '../../typechain-types/factories/src/services/blockchain/contracts/Association.sol';
import { AssociationContract } from '../../typechain-types/src/services/blockchain/contracts/Association.sol';
import useMetaMask from '../../context/metamaskContext';
import { toast } from 'react-toastify';
import { IoIosLogIn } from 'react-icons/io';
import { MdDomainVerification } from 'react-icons/md';

export function CompainDetails(props) {
  const { campaignAddress } = useParams();
  const [campaignState, setCampaignState] = useCampaignContext();
  const {
    connectedWallet,
    defineSteps,
    nextStep,
    failedStep,
    terminate,
    connectWallet,
  } = useMetaMask();
  const [associationFactoryContract, setAssociationFactoryContract] =
    useState<AssociationFactory>();
  const [isAdmin, setIsAdmin] = useState(false);
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
  useLaodContract({
    contractAddress: associationContractAddress,
    abi: AssociationFactory__factory.abi,
    contract: associationFactoryContract,
    setContract: setAssociationFactoryContract,
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

  useEffect(() => {
    if (associationFactoryContract && campaignState.contract) {
      const getData = async () => {
        const data = await associationFactoryContract.isAssociationAdmin(
          connectedWallet
        );
        const owner = await campaignState?.contract.owner();
        console.log(data[1]);
        console.log(owner);
        setIsAdmin(data[1] === owner);
      };
      getData();
    }
  }, [associationFactoryContract, connectedWallet, campaignState.contract]);

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
        {isAdmin ? (
          <Button
            onClick={async () => {
              if (window.ethereum === 'undefined') {
                toast.error('Please Install MetaMask');
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
                    description: 'Sending Transaction',
                    icon: <FaHourglassEnd />,
                  },
                  {
                    title: 'Step 3',
                    description: 'Verification Transaction',
                    icon: <MdDomainVerification />,
                  },
                ]);
                if (!connectedWallet) await connectWallet();
                nextStep();
                const tx = await campaignState.contract?.withdrawFunds({
                  gas: 1000000,
                });
                nextStep();
                const txrec = await tx.wait();
                nextStep();
                terminate();
                toast.success('Funds withdrawn successfully');
                console.log(txrec);
              } catch (error) {
                console.log(error);
                failedStep();
                toast.error('An error occured while withdrawing funds');
              }
            }}
            className="bg-[#71B4AC] w-fit mx-5"
          >
            Withdraw
          </Button>
        ) : (
          ''
        )}
      </div>
      <div className="w-full flex flex-row justify-end mr-4 mb-4">
        <Link to="feed">
          <Button className="bg-orange w-fit flex flex-row items-center gap-2">
            <p>Follow the news | Acess Feed</p>
            <FaLongArrowAltRight className="w-6 h-6" />
          </Button>
        </Link>
      </div>
    </CompainLayout>
  );
}
