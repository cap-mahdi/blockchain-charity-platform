import { FC } from 'react';
import { FormHeader } from '../../components/Form/FormHeader';
import { RegisterForm } from './components/RegisterForm';
import { Card } from '../../components/Card';

export const Register: FC = () => {
  return (
    <Card>
      <FormHeader
        title="        Register Association
"
        subTitle=" This information will be displayed publicly so be careful what you
        share."
      />
      <RegisterForm />
    </Card>
  );
};
