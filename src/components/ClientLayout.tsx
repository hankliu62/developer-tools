'use client';

import { Watermark } from 'antd';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Watermark
      content="H.L Developer Tools"
      font={{ color: 'rgba(0, 0, 0, 0.02)' }}
      className="flex min-h-screen flex-col"
    >
      {children}
    </Watermark>
  );
}
