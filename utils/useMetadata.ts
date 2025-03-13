import { useRouter } from 'next/router';
import metadata, { siteDetails } from '@/data/metadata';

export const useMetadata = () => {
  const { pathname, query } = useRouter();
  const dynamicPath = pathname.replace(/\[.*?\]/g, '[_id]'); // Normalize dynamic routes
  const pageMetadata = metadata[dynamicPath] || {
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
  };

  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    canonical: `${siteDetails.siteUrl}${pathname}`,
    openGraph: {
      title: pageMetadata.title,
      description: pageMetadata.description,
      url: siteDetails.siteUrl,
      type: 'website',
      images: [
        {
          url: '/public/images/og-image.png',
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
      images: ['/public/images/summary-large-image.png'],
    },
  };
};
