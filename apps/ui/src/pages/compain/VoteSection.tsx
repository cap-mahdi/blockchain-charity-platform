import React, { useEffect, useState } from 'react';
import { Box } from './Box';
import { Button } from '../../components/Button';
import { ethers } from 'ethers';

export function VoteSection({ campaign }) {
  const [campaignState, setCampaignState] = useState();

  useEffect(() => {
    if (campaign) {
      const getData = async () => {
        let numProposals = await campaign.numProposals();
        numProposals = parseInt(ethers.getBigInt(numProposals).toString());
        console.log(numProposals);
        const proposal = await campaign.proposals(numProposals - 1);
        console.log(proposal);
        const proposalState = {
          numProposals,
          votesFor: parseInt(ethers.getBigInt(proposal[1]).toString()),
          votesAgainst: parseInt(ethers.getBigInt(proposal[2]).toString()),
        };
        setCampaignState((prev) => {
          return { ...prev, proposalState };
        });
      };
      getData();
    }
  }, []);

  return (
    <div className="flex flex-row w-full p-5  ">
      <div className="w-full">
        <Box className="!h-fit">
          <div>
            <h1>
              Active Proposal {campaignState?.proposalState?.numProposals} :
              Vote to lock next portion of money
            </h1>
            <div className="mt-2 flex flex-row w-[100%] gap-24">
              <div>
                <h1 className="text-[14px] font-medium text-light-blue ">
                  Total Against Votes
                </h1>
                <h1 className="text-[14px] font-bold leading-[0.7rem] text-dark-gray">
                  {campaignState?.proposalState?.votesAgainst}
                </h1>
              </div>
              <div>
                <h1 className="text-[14px] font-medium text-light-blue ">
                  Total For Votes
                </h1>
                <h1 className="text-[14px] font-bold leading-[0.7rem] text-dark-gray">
                  {campaignState?.proposalState?.votesFor}
                </h1>
              </div>
            </div>

            <div className="mt-6 flex flex-row w-[100%] gap-4 ">
              <Button
                className="bg-red-500 w-fit "
                onClick={async () => {
                  const tx = await campaign.voteOnProposal(false);
                  const txrec = await tx.wait();
                  console.log(txrec);
                }}
              >
                Vote Against
              </Button>
              <Button
                className="bg-green-500 w-fit "
                onClick={async () => {
                  const tx = await campaign.voteOnProposal(true);
                  const txrec = await tx.wait();
                  console.log(txrec);
                }}
              >
                Vote For
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
