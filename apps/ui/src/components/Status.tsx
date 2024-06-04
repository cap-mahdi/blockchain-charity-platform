import { FC } from 'react';
import { DemandStatus } from '../types/Demand';
import { AssociationStatus } from '../types/Association';

interface StatusProps {
  status: DemandStatus | AssociationStatus;
}
export const Status: FC<StatusProps> = ({ status }) => {
  console.log('status', status);
  console.log('DemandStatus', DemandStatus.Pending);

  return (
    <p
      className={`w-2/12 p-1 rounded-2xl h-12    flex justify-center items-center bg-${
        status === DemandStatus.Pending
          ? 'orange '
          : status === AssociationStatus.Active
          ? 'green-500'
          : 'red-500'
      }  font-bold `}
    >
      {status}
    </p>
  );
};
