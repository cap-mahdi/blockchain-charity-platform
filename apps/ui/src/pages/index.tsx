import { createBrowserRouter } from 'react-router-dom';
import { CompainCard } from '../components/compainCard/CompainCard';
import { Navbar } from '../components/navbar/Navbar';
import { Card } from '../components/Card';
import { StyledChart } from '../components/chart/StyledChart';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <div></div>,
  },
  {
    path: '/card-test',
    element: (
      <Card>
        <StyledChart />
      </Card>
    ),
  },
  {
    path: '/nav-test',
    element: (
      <div>
        <Navbar />
        <div className="flex flex-row max-w-10  overflow-hidden justify-center ">
          <CompainCard />
          <CompainCard />
          <CompainCard />
          <CompainCard />
        </div>
      </div>
    ),
  },
]);
