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

  const {
    env: { TIANAPI_KEY, MXNZPAPI_KEY, MXNZPAPI_SECRET, ...envs },
    ...conf
  } = nextConfig;

  console.log('next config is:', { ...conf, env: { ...envs } });
}

export default nextConfig;
