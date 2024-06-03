import { FC, ReactNode } from 'react';

interface InfoDisplayerProps {
  label: string;
  value: string | number | ReactNode;
  direction?: 'row' | 'col';
}

export const InfoDisplayer: FC<InfoDisplayerProps> = ({
  label,
  value,
  direction = 'row',
}) => {
  return (
    <div className={`flex flex-${direction}  gap-1 justify-start `}>
      <p className="text-gray-90 font-semibold">{label} :</p>
      <p className="text-gray-90 text-center"> {value}</p>
    </div>
  );
};
