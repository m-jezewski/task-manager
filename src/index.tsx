import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';
import locale from 'dayjs/locale/en-gb'
import dayjs from 'dayjs'

dayjs.locale(locale)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);