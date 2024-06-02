import { Outlet, useNavigate } from 'react-router-dom';
import useMetaMask from '../hooks/useMetaMask';
import { useEffect, useState } from 'react';

export const AdminRoute = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [connectedWallet, _, signBeforeSendTransaction] = useMetaMask();
  useEffect(() => {
    signBeforeSendTransaction(true)
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.error(err);
        navigate('/');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <Outlet />;
};
