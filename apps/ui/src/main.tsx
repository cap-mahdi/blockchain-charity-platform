import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import Client from './services/api';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <StrictMode>
  <ApolloProvider client={Client}>
    <App />
  </ApolloProvider>
  // </StrictMode>
);
