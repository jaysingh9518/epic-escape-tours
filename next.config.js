module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dkxmweeur/image/upload/**',
        search: '',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ttf|woff|woff2|eot|otf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name].[hash][ext]',
      },
    });

    return config;
  },
};
