/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.tesla.com',
        port: '',
        pathname: '/**',
      },
      // Add more hostnames as needed
      {
        protocol: 'https',
        hostname: '**', // Allows any hostname (not recommended for production)
      },
    ],
  },
};

export default nextConfig;
