/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.epicescapetours.com', // Change this to your site's URL
    generateRobotsTxt: true,                // Automatically generates robots.txt
    sitemapSize: 5000,                      // Maximum number of URLs per sitemap file
    exclude: ["/admin/**", "/dashboard/private", "/pages/api/**"], // Exclude specific routes
    robotsTxtOptions: {
      policies: [
        { userAgent: "*", allow: "/" },
        { userAgent: "Googlebot", allow: "/" }
      ]
    }
  };
  