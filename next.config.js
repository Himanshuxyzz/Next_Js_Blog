/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "0.0.0.0",
        protocol: "http",
      },
    ],
  },
  experimental: {
    serverActions: true,
    appDir: true,
  },
};

module.exports = nextConfig;
