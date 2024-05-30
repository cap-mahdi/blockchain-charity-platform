import { ethers } from 'ethers';
import React, { useEffect } from 'react';

interface useLoadContractOptions {
  contractAddress: string | undefined;
  abi: any;
  contract: any;
  setContract: any;
}

export function useLaodContract({
  contractAddress,
  abi,
  contract,
  setContract,
}: useLoadContractOptions) {
  useEffect(() => {
    async function loadContract() {
      try {
        // Connect to Ethereum provider
        const provider = new ethers.InfuraProvider(
          'sepolia',
          'bdd74acc7435477ea4d463970034c98d',
          'qac8S7MMbsHiWiYL9GDGSw88GqZ/ReD3MuQahH7xi0UWv1xQ4RIscQ'
        );
        // Load the contract
        const loadedContract = new ethers.Contract(
          contractAddress,
          abi,
          provider
        );

        setContract(loadedContract);
      } catch (error) {
        console.error('Error loading contract:', error);
      }
    }
    if (!contract && contractAddress) loadContract();
  }, [abi, contract, contractAddress, setContract]);
}
