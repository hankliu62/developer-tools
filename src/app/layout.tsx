import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import './globals.css';
import AppLayout from '@/components/AppLayout';
import ClientLayout from '@/components/ClientLayout';
import { getRoutePrefix } from '@/lib/route';

import '@hankliu/rc-footer/assets/index.css';
import '@hankliu/rc-exception/assets/index.css';

// Ant Design 主题配置
const themeConfig = {
  token: {
    colorPrimary: '#14b8a6',
    colorLink: '#14b8a6',
    colorLinkHover: '#0d9488',
  },
};

export const metadata: Metadata = {
  title: '开发者小工具集合 - H.L Developer Toolkits',
  description: 'A collection of useful developer tools',
  icons: {
    icon: `${getRoutePrefix()}/favicon.ico`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href={`${getRoutePrefix()}/favicon.ico`} />
      </head>
      <body>
        <ConfigProvider theme={themeConfig}>
          <ClientLayout>
            <AppLayout>{children}</AppLayout>
          </ClientLayout>
        </ConfigProvider>
      </body>
    </html>
  );
}
