import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import Layout from './Layout';
import Head from 'next/head';
import './globals.css';
import { useMetadata } from '@/utils/useMetadata';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  const { title, description, canonical, openGraph, twitter } = useMetadata();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="@/public/images/favicon-2.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="@/public/images/favicon.png" />
        <link rel="canonical" href={canonical} />

        {/* Open Graph tags */}
        <meta property="og:title" content={openGraph.title} />
        <meta property="og:description" content={openGraph.description} />
        <meta property="og:url" content={openGraph.url} />
        <meta property="og:type" content={openGraph.type} />
        {openGraph.images?.map((image, index) => (
            <meta key={index} property="og:image" content={image.url} />
        ))}

        {/* Twitter meta tags */}
        <meta name="twitter:card" content={twitter.card} />
        <meta name="twitter:title" content={twitter.title} />
        <meta name="twitter:description" content={twitter.description} />
        {twitter.images?.map((image, index) => (
          <meta key={index} name="twitter:image" content={image} />
        ))}
      </Head>
      <SessionProvider session={session}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </>
  );
}
