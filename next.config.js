const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
    ],
  },
};

const withNextIntl = require("next-intl/plugin")();

module.exports = withNextIntl(nextConfig);
module.exports = withBundleAnalyzer(nextConfig);
