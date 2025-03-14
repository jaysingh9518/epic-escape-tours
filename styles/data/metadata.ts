interface Metadata {
    [key: string]: {
      title: string;
      description: string;
    };
  }
  
  export const siteDetails = {
    siteName: 'Epic Escape Tours',
    siteUrl: 'https://www.epicescapetours.com/',
    metadata: {
      title: 'Epic Escape Tours - Your Dream Vacation Starts Here!',
      description:
        'Discover the best holiday packages and customized tours for your next adventure. Plan your dream vacation today!',
    },
    language: 'en-us',
    locale: 'en-US',
    siteLogo: `${process.env.BASE_PATH || ''}/public/images/logo.png`,
  };
  
  const metadata: Metadata = {
    '/': {
      title: 'Epic Escape Tours - Home',
      description: 'Discover amazing travel packages and tours with Epic Escape Tours.',
    },
    '/profile': {
      title: 'Epic Escape Tours - Profile',
      description: 'Discover awesome travel packages and experiences with Epic Escape Tours.',
    },
    '/auth/login': {
      title: 'Login - Epic Escape Tours',
      description: 'Sign in to manage bookings, view travel history, and more.',
    },
    '/auth/register': {
      title: 'Register - Epic Escape Tours',
      description: 'Create an account with us to manage bookings, view travel history, and more.',
    },
    '/about': {
      title: 'About Us - Epic Escape Tours',
      description: 'Learn more about our travel agency and the amazing experiences we offer.',
    },
    '/packages': {
      title: 'Holiday Packages - Epic Escape Tours',
      description: 'Explore our wide range of holiday packages and customized tours.',
    },
    '/package/[_id]': {
      title: 'Holiday Package Details - Epic Escape Tours',
      description: 'Get detailed information about a specific holiday package.',
      },
    '/blogs': {
      title: 'Travel Blogs - Epic Escape Tours',
      description: 'Explore insightful travel blogs and tips for your next adventure.',
    },
    '/blog/[_id]': {
      title: 'Blog Details - Epic Escape Tours',
      description: 'Read in-depth travel guides, hidden gems, and expert insights in our detailed travel blog articles.',
    },
    '/contact': {
      title: 'Contact Us - Epic Escape Tours',
      description: 'Get in touch with us for inquiries, bookings, and support.',
    },
    '/privacy': {
        title: 'Privacy Policy - Epic Escape Tours',
        description: 'Learn about our data privacy policy and how we handle user information.',
    },
    '/terms': {
        title: 'Terms & Conditions - Epic Escape Tours',
        description: 'Understand our terms and conditions before booking your dream vacation. Know your rights, policies, and travel guidelines.',
    },
  };
  
  export default metadata;
  