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
