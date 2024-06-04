import React from 'react';
import { Box } from './Box';
import { Button } from '../../components/Button';

export function VoteSection({ campaign }) {
  return (
    <div className="flex flex-row w-full p-5  ">
      <div className="w-full">
        <Box className="!h-fit">
          <div>
            <h1>Active Proposal : Vote to lock next portion of money</h1>
            <div className="mt-2 flex flex-row w-[100%] gap-24">
              <div>
                <h1 className="text-[14px] font-medium text-light-blue ">
                  Total For Votes
                </h1>
                <h1 className="text-[14px] font-bold leading-[0.7rem] text-dark-gray">
                  254.99
                </h1>
              </div>
              <div>
                <h1 className="text-[14px] font-medium text-light-blue ">
                  Total Against Votes
                </h1>
                <h1 className="text-[14px] font-bold leading-[0.7rem] text-dark-gray">
                  254.99
                </h1>
              </div>
            </div>

            <div className="mt-6 flex flex-row w-[100%] gap-4 ">
              <Button className="bg-red-500 w-fit ">Vote Against</Button>
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
