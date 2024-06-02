import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useMetaMask() {
  const [connectedWallet, setConnectedWallet] = useState('');
  useEffect(() => {
    getConnectedWallet();
  }, []);

  const getConnectedWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
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

  const signBeforeSendTransaction = async (admin = false) => {
    if (!connectedWallet) {
      await connectWallet();
    }
    const selectedAddress = window.ethereum.selectedAddress;
    console.log('Get nonce');
    const {
      data: { nonce },
    } = await axios.get(
      `http://localhost:3000/api/auth/metamask/nonce?address=${selectedAddress}`
    );
    console.log('nonce', nonce);
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [nonce, selectedAddress],
    });
    if (admin) {
      return await axios.post(
        `http://localhost:3000/api/auth/metamask/admin/login?address=${selectedAddress}`,
        { signature }
      );
    }
    return await axios.post(
      `http://localhost:3000/api/auth/metamask/login?address=${selectedAddress}`,
      { signature }
    );
  };
  return [connectedWallet, connectWallet, signBeforeSendTransaction];
}
