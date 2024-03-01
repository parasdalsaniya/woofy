/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'res.cloudinary.com',
        protocol: 'https',
        port: '',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['oslo'],
  },
  webpack: (config) => {
    config.externals.push('@node-rs/argon2', '@node-rs/bcrypt');
    return config;
  },
};

export default nextConfig;
