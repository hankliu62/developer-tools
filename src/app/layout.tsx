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
    borderRadius: 6,
  },
  components: {
    Slider: {
      colorPrimary: '#14b8a6',
      colorPrimaryBorder: '#14b8a6',
      colorPrimaryBorderHover: '#0d9488',
      handleColor: '#14b8a6',
      handleActiveColor: '#0d9488',
      trackBg: '#14b8a6',
      trackHoverBg: '#0d9488',
      dotActiveBorderColor: '#14b8a6',
    },
    Switch: {
      colorPrimary: '#14b8a6',
      colorPrimaryHover: '#0d9488',
    },
    Select: {
      colorPrimary: '#14b8a6',
      colorPrimaryHover: '#0d9488',
      colorPrimaryActive: '#0d9488',
    },
    Button: {
      primaryColor: '#ffffff',
      colorPrimary: '#14b8a6',
      colorPrimaryHover: '#0d9488',
      colorPrimaryActive: '#0f766e',
    },
    Tabs: {
      colorPrimary: '#14b8a6',
      itemSelectedColor: '#14b8a6',
      itemHoverColor: '#0d9488',
      inkBarColor: '#14b8a6',
    },
    Input: {
      colorPrimary: '#14b8a6',
      colorPrimaryHover: '#0d9488',
      colorPrimaryActive: '#0f766e',
    },
    InputNumber: {
      colorPrimary: '#14b8a6',
      colorPrimaryHover: '#0d9488',
    },
    Checkbox: {
      colorPrimary: '#14b8a6',
      colorPrimaryHover: '#0d9488',
    },
    Radio: {
      colorPrimary: '#14b8a6',
      colorPrimaryHover: '#0d9488',
    },
    DatePicker: {
      colorPrimary: '#14b8a6',
      colorPrimaryHover: '#0d9488',
    },
    TimePicker: {
      colorPrimary: '#14b8a6',
      colorPrimaryHover: '#0d9488',
    },
    Upload: {
      colorPrimary: '#14b8a6',
    },
    Progress: {
      colorPrimary: '#14b8a6',
    },
    Steps: {
      colorPrimary: '#14b8a6',
    },
    Rate: {
      colorPrimary: '#14b8a6',
    },
    Spin: {
      colorPrimary: '#14b8a6',
    },
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
