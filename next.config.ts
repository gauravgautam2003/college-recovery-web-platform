import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Keep Turbopack scoped to this app even when parent folders contain lockfiles.
    root: __dirname,
  },
};

export default nextConfig;
