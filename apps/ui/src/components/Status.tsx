import { FC } from 'react';

interface StatusProps {
  //   status: 'Pending' | 'Accepted' | 'Refused';
  status: string;
}
export const Status: FC<StatusProps> = ({ status }) => {
  return (
    <p
      className={`w-2/12 p-1 rounded-2xl h-12 flex justify-center items-center bg-${
        status === 'Pending'
          ? 'yellow-500'
          : status === 'Accepted'
          ? 'green-500'
          : 'red-500'
      }  font-bold `}
    >
      {status}
    </p>
  );
};
