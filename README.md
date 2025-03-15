# Epic Escape Tours

Epic Escape Tours is a modern travel platform designed to offer luxurious and memorable travel experiences worldwide. This project leverages cutting-edge technologies such as Next.js, Clerk for authentication, and MongoDB for database management.

## Features
- Seamless user authentication with Clerk
- MongoDB integration for scalable data storage
- Next.js for server-side rendering and fast performance
- Dynamic theming with `next-themes`
- Form handling with `react-hook-form` and `zod` for data validation
- Cloudinary for optimized image management

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20 or higher)
- [MongoDB](https://www.mongodb.com/)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/jaysingh9518/epic-escape-tours.git
   cd epic-escape-tours
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables by creating a `.env.local` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_SITE_URL=your_website_url
   ```

### Development
To start the development server:
```sh
npm run dev
```

### Build
To build the production-ready version:
```sh
npm run build
```

### Linting
To check for linting issues:
```sh
npm run lint
```

### Sitemap Generation
Generate the sitemap after build:
```sh
npm run postbuild
```

## Deployment
Epic Escape Tours can be deployed to Vercel, Netlify, or any platform that supports Next.js. Ensure you configure your environment variables correctly in your hosting platform.

## Contributing
Contributions are welcome! Please submit an issue or a pull request for any improvements.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For inquiries, contact [Jay Prakash](mailto:jaysingh9518@gmail.com).

