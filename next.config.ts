const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This allows images from any host
      },
      {
        protocol: "http",
        hostname: "**", // This allows images from any host (not recommended for production)
      },
    ],
  },
};

export default nextConfig;
