import { Demand } from '../typechain-types';

export enum DemandStatus {
  Pending = 'Pending',
  Refused = 'Refused',
}
export type DemandType = Demand.DemandStruct & { status: DemandStatus };

export const numberToDemandStatusMapper: Record<number, DemandStatus> = {
  0: DemandStatus.Pending,
  1: DemandStatus.Refused,
};
