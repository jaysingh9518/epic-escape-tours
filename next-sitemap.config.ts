import type { IConfig } from 'next-sitemap';

const config: IConfig = {
  siteUrl: process.env.SITE_URL || 'https://epicescapetours.com/', // Your website URL
  generateRobotsTxt: true, // Generate robots.txt
  sitemapSize: 5000,       // Number of URLs per sitemap file
  exclude: ['/admin', '/dashboard'], // Exclude certain pages
  additionalPaths: async (config) => [
    { loc: '/special-offers', changefreq: 'daily', priority: 0.8 },
    { loc: '/exclusive-deals', changefreq: 'weekly', priority: 0.7 },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/dashboard'],
      },
    ],
  },
};

export default config;
