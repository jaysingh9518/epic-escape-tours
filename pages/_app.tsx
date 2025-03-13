import React from "react";
import Layout from "@/components/Layout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";
import "@/styles/globals.css";
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useMetadata } from '@/utils/useMetadata';

export default function App({ Component, pageProps } : AppProps) {
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
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}