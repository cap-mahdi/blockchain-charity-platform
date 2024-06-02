import { createBrowserRouter } from 'react-router-dom';
import { Register } from './register';

import { CompainCard } from '../components/compainCard/CompainCard';
import { Navbar } from '../components/navbar/Navbar';
import { Card } from '../components/Card';
import { StyledChart } from '../components/chart/StyledChart';
import { AppLayout } from '../layout/AppLayout';
import { HomePage } from './home';
import { FullBleedCarousel } from '../components/carousel/FullBleedCarousel';

import { CompainDetails } from './compain/CompainDetails';
import { CampaignProvider } from '../context/useCampaignContext';
import { AddCampaign } from './compain/AddCampaign';

import { CampaignFeed } from './compain/CompainFeed';
import { DemandInfo, Demands } from './admin';
import { Associations } from './admin/Associations';
import { AssociationInfo } from './admin/Association';
import { AdminRoute } from '../routes/AdminRoute';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <FullBleedCarousel />,
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
        </div>
      </div>
    ),
  },

  {
    path: '',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'admin',
        element: <AdminRoute />,
        children: [
          {
            path: 'associations',
            element: <Associations />,
          },
          {
            path: 'association/:index',
            element: <AssociationInfo />,
          },
          {
            path: 'demands',
            element: <Demands />,
          },
          {
            path: 'demand/:index',
            element: <DemandInfo />,
          },
        ],
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/create-campaign',
        element: <AddCampaign />,
      },
      {
        path: '/campaign/:campaignAddress',
        element: (
          <CampaignProvider>
            {' '}
            <CompainDetails />{' '}
          </CampaignProvider>
        ),
      },
      {
        path: '/campaign-feed',
        element: <CampaignFeed />,
      },
    ],
  },
]);
