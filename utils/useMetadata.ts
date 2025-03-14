import { useRouter } from 'next/router';
import metadata, { siteDetails } from '@/data/metadata';

interface PageMetadata {
  title: string;
  description: string;
}

export const useMetadata = () => {
  const { pathname, query } = useRouter();
  
  // Normalize dynamic routes (better handling for nested dynamic paths)
  const dynamicPath = pathname.replace(/\[.*?\]/g, '[id]');
  
  const pageMetadata: Partial<PageMetadata> = metadata[dynamicPath] || {
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
  };

  // Construct canonical URL with query parameters if available
  const queryString = new URLSearchParams(query as Record<string, string>).toString();
  const canonicalUrl = `${siteDetails.siteUrl}${pathname}${queryString ? `?${queryString}` : ''}`;

  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    canonical: canonicalUrl,
    openGraph: {
      title: pageMetadata.title,
      description: pageMetadata.description,
      url: siteDetails.siteUrl,
      type: 'website',
      images: [
        {
          url: '/images/og-image.png', // Corrected public path
          width: 1200,
          height: 675,
          alt: siteDetails.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageMetadata.title,
      description: pageMetadata.description,
      images: ['/images/summary-large-image.png'], // Corrected public path
    },
  };
};
