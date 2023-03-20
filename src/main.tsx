import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter } from 'react-router-dom';

import App from './App';

// styles
import './index.css';

import { CookiesProvider } from 'react-cookie';
import { GlobalStoreContext } from './Context/GlobalContext';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <GlobalStoreContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GlobalStoreContext>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
);
