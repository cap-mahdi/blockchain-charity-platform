/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../../../../common";
import type {
  CharityCampaign,
  CharityCampaignInterface,
} from "../../../../../../src/services/blockchain/contracts/Campaign/CharityCampaign";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "address",
        name: "_targetUser",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_targetAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_refundThreshold",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "donor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokensIssued",
        type: "uint256",
      },
    ],
    name: "DonationReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "donor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RefundProcessed",
    type: "event",
  },
  {
    inputs: [],
    name: "description",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "donate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "donations",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "refundThreshold",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "requestRefund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "targetAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "targetUser",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDonations",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620019ac380380620019ac83398181016040528101906200003791906200036c565b86600090816200004891906200069e565b5085600190816200005a91906200069e565b5084600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550836003819055508260058190555081600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050505050505062000785565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620001a28262000157565b810181811067ffffffffffffffff82111715620001c457620001c362000168565b5b80604052505050565b6000620001d962000139565b9050620001e7828262000197565b919050565b600067ffffffffffffffff8211156200020a576200020962000168565b5b620002158262000157565b9050602081019050919050565b60005b838110156200024257808201518184015260208101905062000225565b60008484015250505050565b6000620002656200025f84620001ec565b620001cd565b90508281526020810184848401111562000284576200028362000152565b5b6200029184828562000222565b509392505050565b600082601f830112620002b157620002b06200014d565b5b8151620002c38482602086016200024e565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620002f982620002cc565b9050919050565b6200030b81620002ec565b81146200031757600080fd5b50565b6000815190506200032b8162000300565b92915050565b6000819050919050565b620003468162000331565b81146200035257600080fd5b50565b60008151905062000366816200033b565b92915050565b600080600080600080600060e0888a0312156200038e576200038d62000143565b5b600088015167ffffffffffffffff811115620003af57620003ae62000148565b5b620003bd8a828b0162000299565b975050602088015167ffffffffffffffff811115620003e157620003e062000148565b5b620003ef8a828b0162000299565b9650506040620004028a828b016200031a565b9550506060620004158a828b0162000355565b9450506080620004288a828b0162000355565b93505060a06200043b8a828b016200031a565b92505060c06200044e8a828b016200031a565b91505092959891949750929550565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620004b057607f821691505b602082108103620004c657620004c562000468565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620005307fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620004f1565b6200053c8683620004f1565b95508019841693508086168417925050509392505050565b6000819050919050565b60006200057f62000579620005738462000331565b62000554565b62000331565b9050919050565b6000819050919050565b6200059b836200055e565b620005b3620005aa8262000586565b848454620004fe565b825550505050565b600090565b620005ca620005bb565b620005d781848462000590565b505050565b5b81811015620005ff57620005f3600082620005c0565b600181019050620005dd565b5050565b601f8211156200064e576200061881620004cc565b6200062384620004e1565b8101602085101562000633578190505b6200064b6200064285620004e1565b830182620005dc565b50505b505050565b600082821c905092915050565b6000620006736000198460080262000653565b1980831691505092915050565b60006200068e838362000660565b9150826002028217905092915050565b620006a9826200045d565b67ffffffffffffffff811115620006c557620006c462000168565b5b620006d1825462000497565b620006de82828562000603565b600060209050601f83116001811462000716576000841562000701578287015190505b6200070d858262000680565b8655506200077d565b601f1984166200072686620004cc565b60005b82811015620007505784890151825560018201915060208501945060208101905062000729565b868310156200077057848901516200076c601f89168262000660565b8355505b6001600288020188555050505b505050505050565b61121780620007956000396000f3fe6080604052600436106100a75760003560e01c8063c255343e11610064578063c255343e1461019a578063cc6cb19a146101c5578063d5cef13314610202578063de2ed89314610219578063ed88c68e14610244578063fc0c546a1461024e576100a7565b806306fdde03146100ac57806316fc4869146100d757806324600fc3146101025780637284e416146101195780638da5cb5b14610144578063953b8fb81461016f575b600080fd5b3480156100b857600080fd5b506100c1610279565b6040516100ce9190610ab4565b60405180910390f35b3480156100e357600080fd5b506100ec610307565b6040516100f99190610aef565b60405180910390f35b34801561010e57600080fd5b5061011761030d565b005b34801561012557600080fd5b5061012e61044f565b60405161013b9190610ab4565b60405180910390f35b34801561015057600080fd5b506101596104dd565b6040516101669190610b4b565b60405180910390f35b34801561017b57600080fd5b50610184610503565b6040516101919190610aef565b60405180910390f35b3480156101a657600080fd5b506101af610509565b6040516101bc9190610b4b565b60405180910390f35b3480156101d157600080fd5b506101ec60048036038101906101e79190610b97565b61052f565b6040516101f99190610aef565b60405180910390f35b34801561020e57600080fd5b50610217610547565b005b34801561022557600080fd5b5061022e610749565b60405161023b9190610aef565b60405180910390f35b61024c61074f565b005b34801561025a57600080fd5b50610263610902565b6040516102709190610c23565b60405180910390f35b6000805461028690610c6d565b80601f01602080910402602001604051908101604052809291908181526020018280546102b290610c6d565b80156102ff5780601f106102d4576101008083540402835291602001916102ff565b820191906000526020600020905b8154815290600101906020018083116102e257829003601f168201915b505050505081565b60055481565b6003546004541015610354576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161034b90610cea565b60405180910390fd5b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103db90610d7c565b60405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f1935050505015801561044c573d6000803e3d6000fd5b50565b6001805461045c90610c6d565b80601f016020809104026020016040519081016040528092919081815260200182805461048890610c6d565b80156104d55780601f106104aa576101008083540402835291602001916104d5565b820191906000526020600020905b8154815290600101906020018083116104b857829003601f168201915b505050505081565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60035481565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60086020528060005260406000206000915090505481565b6003546004541061058d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161058490610de8565b60405180910390fd5b6000600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541161060f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161060690610e54565b60405180910390fd5b6000600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080600460008282546106aa9190610ea3565b925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156106f7573d6000803e3d6000fd5b503373ffffffffffffffffffffffffffffffffffffffff167f3367befd2b2f39615cd79917c2153263c4af1d3945ec003e5d5bfc13a8d858338260405161073e9190610aef565b60405180910390a250565b60045481565b60003411610792576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078990610f49565b60405180910390fd5b600061079d34610928565b9050600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b81526004016107fc929190610f69565b6020604051808303816000875af115801561081b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061083f9190610fca565b5034600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461088f9190610ff7565b9250508190555034600460008282546108a89190610ff7565b925050819055503373ffffffffffffffffffffffffffffffffffffffff167f4b0304ab2f313234b1cea012339c8f8c3bf2c8bb357d81a579cfdb35d2e3d03034836040516108f792919061102b565b60405180910390a250565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806003541161096e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610965906110c6565b60405180910390fd5b6000600354600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156109e0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a049190611112565b84610a0f919061113f565b610a1991906111b0565b905080915050919050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610a5e578082015181840152602081019050610a43565b60008484015250505050565b6000601f19601f8301169050919050565b6000610a8682610a24565b610a908185610a2f565b9350610aa0818560208601610a40565b610aa981610a6a565b840191505092915050565b60006020820190508181036000830152610ace8184610a7b565b905092915050565b6000819050919050565b610ae981610ad6565b82525050565b6000602082019050610b046000830184610ae0565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610b3582610b0a565b9050919050565b610b4581610b2a565b82525050565b6000602082019050610b606000830184610b3c565b92915050565b600080fd5b610b7481610b2a565b8114610b7f57600080fd5b50565b600081359050610b9181610b6b565b92915050565b600060208284031215610bad57610bac610b66565b5b6000610bbb84828501610b82565b91505092915050565b6000819050919050565b6000610be9610be4610bdf84610b0a565b610bc4565b610b0a565b9050919050565b6000610bfb82610bce565b9050919050565b6000610c0d82610bf0565b9050919050565b610c1d81610c02565b82525050565b6000602082019050610c386000830184610c14565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610c8557607f821691505b602082108103610c9857610c97610c3e565b5b50919050565b7f54617267657420616d6f756e74206e6f74207265616368656400000000000000600082015250565b6000610cd4601983610a2f565b9150610cdf82610c9e565b602082019050919050565b60006020820190508181036000830152610d0381610cc7565b9050919050565b7f4f6e6c7920746865206f776e65722063616e2077697468647261772066756e6460008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b6000610d66602183610a2f565b9150610d7182610d0a565b604082019050919050565b60006020820190508181036000830152610d9581610d59565b9050919050565b7f54617267657420616d6f756e7420726561636865640000000000000000000000600082015250565b6000610dd2601583610a2f565b9150610ddd82610d9c565b602082019050919050565b60006020820190508181036000830152610e0181610dc5565b9050919050565b7f4e6f20646f6e6174696f6e7320746f20726566756e6400000000000000000000600082015250565b6000610e3e601683610a2f565b9150610e4982610e08565b602082019050919050565b60006020820190508181036000830152610e6d81610e31565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610eae82610ad6565b9150610eb983610ad6565b9250828203905081811115610ed157610ed0610e74565b5b92915050565b7f446f6e6174696f6e20616d6f756e74206d75737420626520677265617465722060008201527f7468616e207a65726f0000000000000000000000000000000000000000000000602082015250565b6000610f33602983610a2f565b9150610f3e82610ed7565b604082019050919050565b60006020820190508181036000830152610f6281610f26565b9050919050565b6000604082019050610f7e6000830185610b3c565b610f8b6020830184610ae0565b9392505050565b60008115159050919050565b610fa781610f92565b8114610fb257600080fd5b50565b600081519050610fc481610f9e565b92915050565b600060208284031215610fe057610fdf610b66565b5b6000610fee84828501610fb5565b91505092915050565b600061100282610ad6565b915061100d83610ad6565b925082820190508082111561102557611024610e74565b5b92915050565b60006040820190506110406000830185610ae0565b61104d6020830184610ae0565b9392505050565b7f54617267657420616d6f756e74206d757374206265206772656174657220746860008201527f616e207a65726f00000000000000000000000000000000000000000000000000602082015250565b60006110b0602783610a2f565b91506110bb82611054565b604082019050919050565b600060208201905081810360008301526110df816110a3565b9050919050565b6110ef81610ad6565b81146110fa57600080fd5b50565b60008151905061110c816110e6565b92915050565b60006020828403121561112857611127610b66565b5b6000611136848285016110fd565b91505092915050565b600061114a82610ad6565b915061115583610ad6565b925082820261116381610ad6565b9150828204841483151761117a57611179610e74565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006111bb82610ad6565b91506111c683610ad6565b9250826111d6576111d5611181565b5b82820490509291505056fea2646970667358221220ea56853245fc14268dbabb937ac03cbe0cbdef587c0ab79441d2e5ef9e25324164736f6c63430008140033";

type CharityCampaignConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CharityCampaignConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CharityCampaign__factory extends ContractFactory {
  constructor(...args: CharityCampaignConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _name: string,
    _description: string,
    _targetUser: AddressLike,
    _targetAmount: BigNumberish,
    _refundThreshold: BigNumberish,
    _owner: AddressLike,
    _tokenAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _name,
      _description,
      _targetUser,
      _targetAmount,
      _refundThreshold,
      _owner,
      _tokenAddress,
      overrides || {}
    );
  }
  override deploy(
    _name: string,
    _description: string,
    _targetUser: AddressLike,
    _targetAmount: BigNumberish,
    _refundThreshold: BigNumberish,
    _owner: AddressLike,
    _tokenAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _name,
      _description,
      _targetUser,
      _targetAmount,
      _refundThreshold,
      _owner,
      _tokenAddress,
      overrides || {}
    ) as Promise<
      CharityCampaign & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): CharityCampaign__factory {
    return super.connect(runner) as CharityCampaign__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CharityCampaignInterface {
    return new Interface(_abi) as CharityCampaignInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): CharityCampaign {
    return new Contract(address, _abi, runner) as unknown as CharityCampaign;
  }
}
