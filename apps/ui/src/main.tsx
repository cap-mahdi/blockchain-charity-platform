import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <StrictMode>
  <>
    <ToastContainer
      position="bottom-left"
      // autoClose={5000}
      // hideProgressBar={false}
      // newestOnTop={false}
      // closeOnClick
      // rtl={false}
      // pauseOnFocusLoss
      // draggable
      // pauseOnHover
      // theme="light"
    />
    <App />
  </>
  // </StrictMode>
);
