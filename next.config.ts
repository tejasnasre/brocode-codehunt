
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["upload.wikimedia.org", "logos-world.net", "1000logos.net","images.unsplash.com","download.logo.wine","w7.pngwing.com"],
  },
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "*",
        port: "",
        pathname: "**",
      },
    ],
    domains: [
      "localhost",
      "127.0.0.1",
      "images.unsplash.com",
      "via.placeholder.com",
      "picsum.photos",
      "res.cloudinary.com",
      "storage.googleapis.com",
      "s3.amazonaws.com",
    ],
    unoptimized: process.env.NODE_ENV === "development",
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  reactStrictMode: true,
  swcMinify: true, // Move swcMinify here instead of inside compiler

};

module.exports = nextConfig;
