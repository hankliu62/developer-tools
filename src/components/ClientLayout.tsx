'use client';

import { Watermark } from 'antd';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Watermark
      content="H.L 开发者小工具集"
      font={{ color: 'rgba(0, 0, 0, 0.08)' }}
      className="flex min-h-screen flex-col"
    >
      {children}
    </Watermark>
  );
}
