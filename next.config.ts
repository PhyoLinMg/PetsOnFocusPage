import type { NextConfig } from "next";

// Set by the Pages workflow from actions/configure-pages:
// "" for a custom domain or <user>.github.io, "/<repo>" for a project site.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
