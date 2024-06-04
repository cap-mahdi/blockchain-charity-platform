import { Outlet, createBrowserRouter } from 'react-router-dom';
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
import { AssociationsPage } from './association/AssociationsPage';
import { AssociationDetails } from './association/AssociationDetails';

export const router = createBrowserRouter([
  {
    path: '',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/admin',
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
            <Outlet />{' '}
          </CampaignProvider>
        ),
        children: [
          {
            path: '',
            element: <CompainDetails />,
          },
          {
            path: 'feed',
            element: <CampaignFeed />,
          },
        ],
      },

      {
        path: '/associations',
        element: <AssociationsPage />,
      },
      {
        path: '/association/:asssociationId',
        element: <AssociationDetails />,
      },
    ],
  },
]);
