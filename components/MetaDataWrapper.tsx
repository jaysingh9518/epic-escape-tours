import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const MetaDataWrapper = ({ canonical, browserTitle, seoTitle, description, keywords, children }) => {
  return (
    <>
      <Helmet>
        {/* Title for browser tab */}
        <title>{browserTitle || 'Heaven of Holiday | Best Holiday Packages & Travel Deals'}</title>

        {/* Title for search engines */}
        <meta property="og:title" content={seoTitle || browserTitle || 'Heaven of Holiday | Your Journey Begins Here'} />
        
        {/* Meta tags for SEO */}
        <meta 
          name="description" 
          content={description || 'Discover exclusive travel deals and customized tours with Heaven of Holiday. Plan your dream vacation today!'} 
        />
        <meta 
          name="keywords" 
          content={keywords || 'holiday packages, travel deals, customized tours, group tours, corporate tours, Agra travel agency, best vacations, Heaven of Holiday'} 
        />

        {/* Canonical URL for search engines */}
        <link rel="canonical" href={canonical || 'https://heavenofholiday.com'} />

        {/* Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical || 'https://heavenofholiday.com'} />
        <meta property="og:title" content={seoTitle || browserTitle || 'Heaven of Holiday | Your Journey Begins Here'} />
        <meta property="og:description" content={description || 'Discover exclusive travel deals and customized tours with Heaven of Holiday. Plan your dream vacation today!'} />
        <meta property="og:image" content="https://heavenofholiday.com/images/og-image.png" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@heavenofholiday" />
        <meta name="twitter:title" content={seoTitle || browserTitle || 'Heaven ofHoliday | Your Journey Begins Here'} />
        <meta name="twitter:description" content={description || 'Discover exclusive travel deals and customized tours with Heaven of Holiday. Plan your dream vacation today!'} />
        <meta name="twitter:image" content="https://heavenofholiday.com/images/summary-large-image.png" />
        
      </Helmet>
      {children}
    </>
  );
};

// ✅ Add Prop Validation
MetaDataWrapper.propTypes = {
  browserTitle: PropTypes.string,
  canonical: PropTypes.string,
  seoTitle: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  children: PropTypes.node,
};

export default MetaDataWrapper;
