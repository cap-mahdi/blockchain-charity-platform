import { FC } from 'react';

export const RegisterHeader: FC = () => {
  return (
    <div className="flex flex-col items-center gap-2 w-full ">
      <h1 className="text-4xl font-bold underline underline-offset-8 decoration-2 uppercase">
        Register Association
      </h1>
      <p className="font-light text-sm">
        This information will be displayed publicly so be careful what you
        share.
      </p>
    </div>
  );
};
