import type { Metadata } from 'next';
import './globals.css';
import AppLayout from '@/components/AppLayout';
import { getRoutePrefix } from '@/lib/route';

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
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
