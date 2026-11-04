/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // Uploaded product photos can be large; allow a bit more than the default body size.
  experimental: { serverActions: { bodySizeLimit: "6mb" } },
};

export default nextConfig;
