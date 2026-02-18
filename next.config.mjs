/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@uiw/react-codemirror', 'antd', '@ant-design/icons'],
  images: {
    unoptimized: true,
  },
};

const isGithubActions = process.env.GITHUB_ACTIONS || false;

if (isGithubActions) {
  nextConfig.output = 'export';
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');
  nextConfig.assetPrefix = `/${repo}/`;
  nextConfig.basePath = `/${repo}`;
  nextConfig.env = {
    ROUTE_PREFIX: `/${repo}`,
  };
}

export default nextConfig;
