import { FC } from 'react';
import { RegisterHeader } from './components/RegisterHeader';
import { RegisterForm } from './components/RegisterForm';
import { Card } from '../../components/Card';

export const Register: FC = () => {
  return (
    <Card>
      <RegisterHeader />
      <RegisterForm />
    </Card>
  );
};
