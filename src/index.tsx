import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';
import locale from 'dayjs/locale/en-gb'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { ErrorPromptContextProvider } from './contexts/ErrorPromptContext';


dayjs.locale(locale)
dayjs.extend(customParseFormat)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode>
  <ErrorPromptContextProvider>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </ErrorPromptContextProvider>
  //</React.StrictMode>
);