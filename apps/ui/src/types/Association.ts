import { PlateformContract } from '../typechain-types';

export enum AssociationStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}
export type AssociationType = PlateformContract.DemandStruct['association'] & {
  status: AssociationStatus;
};
export const numberToAssociationEnumMapper: Record<number, AssociationStatus> =
  {
    0: AssociationStatus.Active,
    1: AssociationStatus.Inactive,
  };
