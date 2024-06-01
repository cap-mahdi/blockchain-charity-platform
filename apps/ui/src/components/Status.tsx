import { FC } from 'react';
import { DemandStatus } from '../types/Demand';

interface StatusProps {
  status: DemandStatus;
}
export const Status: FC<StatusProps> = ({ status }) => {
  console.log(status);
  console.log(DemandStatus.Pending);
  console.log(DemandStatus.Pending === status);
  return (
    <p
      className={`w-2/12 p-1 rounded-2xl h-12    flex justify-center items-center bg-${
        status === DemandStatus.Pending
          ? 'yellow-300 '
          : // : status === 'Accepted'
            // ? 'green-500'
            'red-500'
      }  font-bold `}
    >
      {status}
    </p>
  );
};
