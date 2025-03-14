/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.epicescapetours.com', // Your website URL
  generateRobotsTxt: true, // Generates a robots.txt file
  sitemapSize: 5000,       // Number of URLs per sitemap file
  exclude: ['/admin', '/dashboard'], // Exclude certain pages from the sitemap
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
