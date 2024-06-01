export enum AssociationStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export const numberToAssociationEnumMapper: Record<number, AssociationStatus> =
  {
    0: AssociationStatus.Active,
    1: AssociationStatus.Inactive,
  };
