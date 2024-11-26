import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';

const theme = createTheme({
  type: 'light', // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '#EF3D5B',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#6C0F13',
      primaryBorder: '#6C0F13',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',

      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});

ReactDOM.render(
  <React.StrictMode>
    <NextUIProvider theme={theme}>
      <ContextProvider>
        <Toaster position="top-right" />
        <App />
      </ContextProvider>
    </NextUIProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
