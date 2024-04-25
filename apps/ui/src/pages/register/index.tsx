import { FC } from 'react';
import { RegisterHeader } from './components/RegisterHeader';
import { RegisterForm } from './components/RegisterForm';

export const Register: FC = () => {
  return (
    <div className="flex justify-center items-start h-screen bg-gray-100 py-5">
      {/*MOVE IT TO LAYOUT ^ */}
      <div className="flex flex-col items-center gap-6  py-8 px-12 w-2/3 bg-white rounded-xl">
        <RegisterHeader />
        <RegisterForm />
      </div>
    </div>
  );
};
