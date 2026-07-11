import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@philo4all/content", "@philo4all/ui"],
  // The reader loads the curated Markdown collection with fs at runtime. Make
  // those dynamic files explicit deployment dependencies for every route.
  experimental: {
    outputFileTracingRoot: workspaceRoot,
    outputFileTracingIncludes: {
      "/*": ["../../content-index/documents.json", "../../content-markdown/mit-classics/**/*"]
    }
  }
};

export default nextConfig;
