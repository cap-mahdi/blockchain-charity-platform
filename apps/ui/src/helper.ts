import axios from 'axios';
import { Provider, TransactionResponse } from 'ethers';

export function listenForTransactionMine(
  transactionResponse: TransactionResponse,
  provider: Provider
) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    try {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations. `
        );
        resolve('');
      });
    } catch (error) {
      reject(error);
    }
  });
}

const VITE_PINATA_JWT = import.meta.env.VITE_PINATA_JWT;
const JWT = `Bearer ${VITE_PINATA_JWT}`;

export const uploadToIpfs = (files: File[]) => {
  return Promise.all(
    files.map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pinataMetadata', JSON.stringify({ name: file.name }));
      formData.append('pinataOptions', JSON.stringify({ cidVersion: 0 }));
      return axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          maxBodyLength: 'Infinity',
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: JWT,
          },
        }
      );
    })
  );
};
