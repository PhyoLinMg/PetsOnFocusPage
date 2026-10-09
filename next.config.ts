import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

// Set by the Pages workflow from actions/configure-pages:
// "" for a custom domain or <user>.github.io, "/<repo>" for a project site.
const basePath = process.env.PAGES_BASE_PATH ?? "";

// Dev only: let a phone on the same Wi-Fi open the dev server by this machine's LAN IP.
// Without it Next blocks the HMR socket from that origin and the page never hydrates.
const lanHosts = Object.values(networkInterfaces())
  .flat()
  .filter((net) => net?.family === "IPv4" && !net.internal)
  .map((net) => net!.address);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  allowedDevOrigins: lanHosts,
};

export default nextConfig;
