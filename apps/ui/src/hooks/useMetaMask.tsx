import { useEffect, useState } from 'react';

export default function useMetaMask() {
  const [connectedWallet, setConnectedWallet] = useState('');
  useEffect(() => {
    getConnectedWallet();
  }, []);

  console.log('from meta : ', connectedWallet);

  const getConnectedWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        console.log('from get  : ', accounts);
        if (accounts[0]) setConnectedWallet(accounts[0]);
      } catch (err) {
        console.error(err);
      }

      window.ethereum.on('accountsChanged', (accounts) => {
        setConnectedWallet(accounts[0] || null);
      });
    } else {
      console.log('Install MetaMask');
    }
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setConnectedWallet(accounts[0]);
      } else {
        console.log('Install MetaMask');
      }
    } catch (err) {
      console.error(err);
    }
  };
  return [connectedWallet, connectWallet];
}
