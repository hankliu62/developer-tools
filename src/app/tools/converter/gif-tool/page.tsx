'use client';

import { FileImageOutlined } from '@ant-design/icons';
import { Card, ConfigProvider, Tabs } from 'antd';
import { useState } from 'react';
import GifCompress from './components/GifCompress';
import GifDecompose from './components/GifDecompose';
import GifSynthesize from './components/GifSynthesize';

export default function GifToolPage() {
  const [activeTab, setActiveTab] = useState('decompose');

  const tabItems = [
    {
      key: 'decompose',
      label: 'GIF 分解',
      children: <GifDecompose />,
    },
    {
      key: 'synthesize',
      label: 'GIF 合成',
      children: <GifSynthesize />,
    },
    {
      key: 'compress',
      label: 'GIF 压缩',
      children: <GifCompress />,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#14b8a6', // teal-500
        },
        components: {
          Tabs: {
            itemSelectedColor: '#14b8a6',
            itemHoverColor: '#0d9488',
          },
          Switch: {
            colorPrimary: '#14b8a6',
          },
          Slider: {
            trackBg: '#14b8a6',
            trackHoverBg: '#0d9488',
            handleColor: '#14b8a6',
            handleActiveColor: '#0d9488',
          },
          Button: {
            primaryColor: '#ffffff',
          },
        },
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <span className="inline-flex items-center justify-center w-10 h-10 bg-teal-100 rounded-lg mr-2">
              <FileImageOutlined className="text-teal-600" />
            </span>
            GIF 工具
          </h1>
          <p className="text-gray-600">GIF 分解、合成、压缩一站式解决方案</p>
        </div>

        <Card>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            size="large"
            className="[&_.ant-tabs-ink-bar]:bg-teal-500"
          />
        </Card>
      </div>
    </ConfigProvider>
  );
}
