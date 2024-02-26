// index.js (or App.js)
import React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import App from './App';
import { Provider } from 'react-redux'; 
import theme from './theme';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';



import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
