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
};

module.exports = nextConfig;
