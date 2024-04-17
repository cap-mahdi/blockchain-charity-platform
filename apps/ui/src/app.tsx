// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RouterProvider } from 'react-router-dom';
import styles from './app.module.css';
import { router } from './pages';

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
