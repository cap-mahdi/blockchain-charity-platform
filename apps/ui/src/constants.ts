export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'associationContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
    ],
    name: 'AssociationContractDeployed',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_email',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_phoneNumber',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_country',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_streetAddress',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_city',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_state',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_postalCode',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_creationDate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_size',
        type: 'uint256',
      },
    ],
    name: 'deployAssociationContract',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
export const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
