'use client';
import { Button, Input, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import { generateOpenGraph, type OpenGraphMeta } from '@/tools/web';

const { TextArea } = Input;

export default function OpenGraphPage() {
  const [meta, setMeta] = useState<OpenGraphMeta>({
    title: '',
    description: '',
    url: '',
    image: '',
    siteName: '',
    locale: 'zh_CN',
    type: 'website',
  });
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    try {
      if (!meta.title || !meta.description) {
        message.error('请填写标题和描述');
        return;
      }
      const result = generateOpenGraph(meta);
      setOutput(result);
      message.success('生成成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '生成失败');
    }
  };

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mr-2">
            📤
          </span>
          Open Graph 生成
        </h1>
        <p className="text-gray-600">生成 Open Graph 元标签</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="space-y-4">
            <div>
              <label className="font-medium text-gray-700 block mb-2">标题</label>
              <Input
                value={meta.title}
                onChange={(e) => setMeta({ ...meta, title: e.target.value })}
                placeholder="请输入标题..."
              />
            </div>
            <div>
              <label className="font-medium text-gray-700 block mb-2">描述</label>
              <TextArea
                value={meta.description}
                onChange={(e) => setMeta({ ...meta, description: e.target.value })}
                placeholder="请输入描述..."
                rows={3}
              />
            </div>
            <div>
              <label className="font-medium text-gray-700 block mb-2">URL</label>
              <Input
                value={meta.url}
                onChange={(e) => setMeta({ ...meta, url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="font-medium text-gray-700 block mb-2">图片 URL</label>
              <Input
                value={meta.image}
                onChange={(e) => setMeta({ ...meta, image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="font-medium text-gray-700 block mb-2">站点名称</label>
              <Input
                value={meta.siteName}
                onChange={(e) => setMeta({ ...meta, siteName: e.target.value })}
                placeholder="站点名称..."
              />
            </div>
            <Button type="primary" onClick={handleGenerate}>
              生成
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="font-medium text-gray-700">生成的 Meta 标签</label>
            <Button onClick={handleCopy} disabled={!output} size="small">
              复制
            </Button>
          </div>
          <TextArea
            value={output}
            readOnly
            className="font-mono text-sm bg-gray-50"
            rows={20}
            placeholder="生成的代码..."
          />
        </div>
      </div>
    </div>
  );
}
