/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  transpilePackages: ["@uiw/react-codemirror", "antd", "@ant-design/icons"],
  images: {
    unoptimized: true,
  },
};

const isGithubActions = process.env.GITHUB_ACTIONS || false;

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
  nextConfig.assetPrefix = `/${repo}/`;
  nextConfig.basePath = `/${repo}`;
  nextConfig.env = {
    ROUTE_PREFIX: `/${repo}`,
  };
}

export default nextConfig;
