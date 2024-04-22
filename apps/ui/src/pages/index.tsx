import { createBrowserRouter } from 'react-router-dom';
import { Register } from './register';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <div></div>,
  },
  {
    path: '',
    element: <Register />,
  },
]);
