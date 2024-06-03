import snapshot from '@snapshot-labs/snapshot.js';
import { Web3Provider } from '@ethersproject/providers';

import { ethers } from 'ethers';

const hub = 'https://testnet.hub.snapshot.org'; // Snapshot hub URL
const client = new snapshot.Client712(hub);
const web3 = new Web3Provider(window.ethereum);

// export const getProposals = async (space) => {
//   const proposals = await client.getProposals(space);
//   return proposals;
// };

// export const getProposal = async (space, proposalId) => {
//   const proposal = await client.getProposal(space, proposalId);
//   return proposal;
// };

// export const createProposal = async (web3Provider, space, proposal) => {
//   const signer = web3Provider.getSigner();
//   const address = await signer.getAddress();
//   const msg = {
//     version: '0.1.3',
//     timestamp: (Date.now() / 1000).toFixed(),
//     space: space,
//     type: 'proposal',
//     title: proposal.title,
//     body: proposal.body,
//     choices: proposal.choices,
//     start: proposal.start,
//     end: proposal.end,
//     snapshot: proposal.snapshot,
//     network: proposal.network,
//     strategies: proposal.strategies,
//     plugins: proposal.plugins,
//     metadata: proposal.metadata,
//   };
//   const data = {
//     domain: {
//       name: 'snapshot',
//       version: '0.1.3',
//     },
//     message: msg,
//   };
//   const signData = await client.utils.sign(web3Provider, address, data);
//   const result = await client.broadcast(address, signData, hub);
//   return result;
// };

// export const vote = async (web3Provider, space, proposalId, choice) => {
//   const signer = web3Provider.getSigner();
//   const address = await signer.getAddress();
//   const msg = {
//     space,
//     proposal: proposalId,
//     choice,
//     metadata: {},
//   };
//   const data = {
//     domain: {
//       name: 'snapshot',
//       version: '0.1.3',
//     },
//     message: msg,
//   };
//   const signData = await client.utils.sign(web3Provider, address, data);
//   const result = await client.broadcast(address, signData, hub);
//   return result;
// };

export const vote = async (space, proposalId, choice) => {
  const [account] = await web3.listAccounts();
  const receipt = await client.vote(web3, account, {
    space: space,
    proposal: proposalId,
    type: 'single-choice',
    choice: choice,
    app: 'my-app',
  });

  console.log(receipt);
};

export const createProposal = async (space, proposal) => {
  const [account] = await web3.listAccounts();
  const receipt = await client.proposal(web3, account, {
    space: space,
    type: 'single-choice', // define the voting system
    title: 'Test proposal using Snapshot.js',
    body: 'This is the content of the proposal',
    choices: ['Yes', 'No', 'Abstantion'],
    start: 1636984800,
    end: 1637244000,
    snapshot: 13620822,
    plugins: JSON.stringify({}),
    app: 'my-app',
    discussion:
      'https://gov.yearn.finance/t/test-proposal-using-snapshot-js/1111',
  });

  console.log(receipt);
};

export const joinSpace = async (space) => {
  const [account] = await web3.listAccounts();

  const receipt = await client.follow(web3, account, {
    space: space,
  });
  console.log(receipt);
};

export const getVotingPower = async (space) => {
  const address = '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11';
  const network = '1';
  const strategies = [
    {
      name: 'erc20-balance-of',
      params: {
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        symbol: 'DAI',
        decimals: 18,
      },
    },
  ];
  const snapshotId = 11437846;
  //   const space = 'yam.eth';
  const delegation = false;
  const apiKey = 'your_api_key_here'; // get an API Key for higher limits
  const options = { url: `https://score.snapshot.org/?apiKey=${apiKey}` };

  snapshot.utils
    .getVp(address, network, strategies, snapshotId, space, delegation, options)
    .then((vp) => {
      console.log('Voting Power', vp);
    });
};
