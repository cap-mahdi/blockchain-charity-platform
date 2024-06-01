/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "IERC1155Errors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155Errors__factory>;
    getContractFactory(
      name: "IERC20Errors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Errors__factory>;
    getContractFactory(
      name: "IERC721Errors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Errors__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "AssociationContract",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AssociationContract__factory>;
    getContractFactory(
      name: "AssociationFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AssociationFactory__factory>;
    getContractFactory(
      name: "Demand",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Demand__factory>;
    getContractFactory(
      name: "CharityCampaign",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CharityCampaign__factory>;
    getContractFactory(
      name: "CharityCampaignFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CharityCampaignFactory__factory>;
    getContractFactory(
      name: "Token",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Token__factory>;

    getContractAt(
      name: "Ownable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "IERC1155Errors",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155Errors>;
    getContractAt(
      name: "IERC20Errors",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Errors>;
    getContractAt(
      name: "IERC721Errors",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Errors>;
    getContractAt(
      name: "ERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "AssociationContract",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.AssociationContract>;
    getContractAt(
      name: "AssociationFactory",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.AssociationFactory>;
    getContractAt(
      name: "Demand",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Demand>;
    getContractAt(
      name: "CharityCampaign",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.CharityCampaign>;
    getContractAt(
      name: "CharityCampaignFactory",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.CharityCampaignFactory>;
    getContractAt(
      name: "Token",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Token>;

    deployContract(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "IERC1155Errors",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC1155Errors>;
    deployContract(
      name: "IERC20Errors",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Errors>;
    deployContract(
      name: "IERC721Errors",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Errors>;
    deployContract(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20>;
    deployContract(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Metadata>;
    deployContract(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "AssociationContract",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AssociationContract>;
    deployContract(
      name: "AssociationFactory",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AssociationFactory>;
    deployContract(
      name: "Demand",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Demand>;
    deployContract(
      name: "CharityCampaign",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CharityCampaign>;
    deployContract(
      name: "CharityCampaignFactory",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CharityCampaignFactory>;
    deployContract(
      name: "Token",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Token>;

    deployContract(
      name: "Ownable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "IERC1155Errors",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC1155Errors>;
    deployContract(
      name: "IERC20Errors",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Errors>;
    deployContract(
      name: "IERC721Errors",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Errors>;
    deployContract(
      name: "ERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20>;
    deployContract(
      name: "IERC20Metadata",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Metadata>;
    deployContract(
      name: "IERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "AssociationContract",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AssociationContract>;
    deployContract(
      name: "AssociationFactory",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AssociationFactory>;
    deployContract(
      name: "Demand",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Demand>;
    deployContract(
      name: "CharityCampaign",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CharityCampaign>;
    deployContract(
      name: "CharityCampaignFactory",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CharityCampaignFactory>;
    deployContract(
      name: "Token",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Token>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}
