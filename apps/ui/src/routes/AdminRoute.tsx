import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMetaMask from '../context/metamaskContext';
import { toast } from 'react-toastify';
import { Spinner } from '../components/Spinner';

export const AdminRoute = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { connectedWallet, signBeforeSendTransaction } = useMetaMask();
  useEffect(() => {
    setIsLoading(true);
    if (!connectedWallet) return;
    signBeforeSendTransaction(true)
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.error(err);
        toast.error('An error has occured');
        navigate('/');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [connectedWallet]);

  if (isLoading) {
    return <Spinner />;
  }
  return <Outlet />;
};
