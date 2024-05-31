import { FC } from 'react';

interface FormHeaderProps {
  title: string;
  subTitle: string;
}

export const FormHeader = ({ title, subTitle }: FormHeaderProps) => {
  return (
    <div className="flex flex-col items-center gap-2 w-full ">
      <h1 className="text-4xl font-bold underline underline-offset-8 decoration-2 uppercase">
        {title}{' '}
      </h1>
      <p className="font-light text-sm">{subTitle}</p>
    </div>
  );
};
