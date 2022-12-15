import '../styles/globals.css';
import { buildClient } from '../api/build-client';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header';

interface Props extends AppProps {
  currentUser: string;
}

export default function App({ Component, pageProps, currentUser }: Props) {
  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </>
  );
}

App.getInitialProps = async (appContext: any) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};
