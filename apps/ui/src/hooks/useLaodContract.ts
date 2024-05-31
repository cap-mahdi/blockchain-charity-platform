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
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        // Load the contract
        const loadedContract = new ethers.Contract(
          contractAddress,
          abi,
          signer
        );

        setContract(loadedContract);
      } catch (error) {
        console.error('Error loading contract:', error);
      }
    }
    if (!contract && contractAddress) loadContract();
  }, [abi, contract, contractAddress, setContract]);
}
