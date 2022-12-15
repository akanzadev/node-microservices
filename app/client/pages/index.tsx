import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { buildClient } from '../api/build-client';
import { GetServerSideProps } from 'next';

interface HomeProps {
  currentUser: string;
}

export default function Home({ currentUser }: HomeProps) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {currentUser ? (
          <h1>You are signed in</h1>
        ) : (
          <h1>You are NOT signed in</h1>
        )}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = buildClient(context);
  const {
    data: { currentUser },
  } = await client.get('/api/users/currentuser');

  return {
    props: {
      currentUser: currentUser,
    },
  };
};

/* export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = buildClient(context);
  const auxURI = client.getUri() + '/api/users/currentuser';
  const headers = context.req.headers;
  console.log('headers', headers);
  const {
    data: { currentUser },
  } = await axios.get(auxURI, { headers: context.req.headers });
  console.log('currentUser1', currentUser);

  return {
    props: {
      currentUser: currentUser,
    },
  };
}; */

/* Home.getInitialProps = async (context: any) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
 console.log(context.req.headers);
  if (typeof window === 'undefined') {
    // we are on the server!
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: {
          Host: 'ticketing.dev'
        }
      }
    );
    return data;
  } else {
    // we are on the browser!
    const { data } = await axios.get('/api/users/currentuser');
    return data;
  }
};
*/