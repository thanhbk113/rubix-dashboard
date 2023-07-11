import { ThemeProvider } from '@mui/material';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import '@/styles/globals.css';
import '@/styles/colors.css';

import { store } from '@/app/store';
import { ukoTheme } from '@/theme';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const appTheme = ukoTheme();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <ThemeProvider theme={appTheme}>
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
