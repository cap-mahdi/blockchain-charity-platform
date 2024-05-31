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

import { Association, Associations } from './admin';
import { CampaignFeed } from './compain/CompainFeed';


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
        children: [
          {
            path: 'associations',
            element: <Associations />,
          },
          {
            path: 'association/:address',
            element: <Association />,
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
