import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Satisfy Next.js 16 when webpack config is present (Turbopack is default)
  turbopack: {},
  webpack: (config) => {
    const existing = config.watchOptions ?? {};
    const ignored = existing.ignored ?? [];
    // Webpack watchOptions.ignored expects glob strings (non-empty), not RegExp
    const base = Array.isArray(ignored) ? ignored : [ignored];
    const valid = base.filter((x): x is string => typeof x === "string" && x.length > 0);
    if (valid.length > 0) {
      config.watchOptions = { ...existing, ignored: valid };
    }
    return config;
  },
};

export default nextConfig;
