import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider} from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { neobrutalism } from '@clerk/themes'
import { ThemeProvider } from "next-themes";
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

export default function App({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  const { title, description, canonical, openGraph, twitter } = useMetadata();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="@/public/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="@/public/favicon.png" />
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
      <QueryClientProvider client={queryClient}>
        <ClerkProvider {...pageProps} appearance={{
        baseTheme: [neobrutalism],
      }}>
          <ThemeProvider attribute="class">
            {getLayout(<Component {...pageProps} />)}
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </QueryClientProvider>
    </>
  );
}
