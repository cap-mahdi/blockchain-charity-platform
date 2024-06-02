// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RouterProvider } from 'react-router-dom';
import { router } from './pages';
import { MetamaskContext } from './context/metamaskContext';
import { ToastContainer } from 'react-toastify';

export function App() {
  return (
    <MetamaskContext>
      <RouterProvider router={router} />;
    </MetamaskContext>
  );
}

export default App;
