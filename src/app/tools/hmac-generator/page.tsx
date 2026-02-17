'use client';
import { Button, Card, Input, message, Select } from 'antd';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import { generateHmac } from '@/tools/crypto';

const { TextArea } = Input;

const algorithmOptions = [
  { value: 'SHA256', label: 'SHA256' },
  { value: 'SHA1', label: 'SHA1' },
  { value: 'SHA512', label: 'SHA512' },
  { value: 'MD5', label: 'MD5' },
];

export default function HmacGeneratorPage() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [algorithm, setAlgorithm] = useState('SHA256');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProcess = () => {
    try {
      if (!text) {
        message.error('请输入文本');
        return;
      }
      if (!key) {
        message.error('请输入密钥');
        return;
      }
      setLoading(true);
      const result = generateHmac(text, key, algorithm);
      setOutput(result);
      message.success('生成成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '生成失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  };

  const handleClear = () => {
    setText('');
    setKey('');
    setOutput('');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">HMAC 生成器</h1>
        <p className="text-gray-600 mt-1">生成 HMAC 消息认证码</p>
      </div>

      <Card className="mb-6">
        <div className="mb-4">
          <label className="font-medium text-gray-700 block mb-2" htmlFor="algorithm">
            算法
          </label>
          <Select
            id="algorithm"
            value={algorithm}
            onChange={setAlgorithm}
            style={{ width: 200 }}
            options={algorithmOptions}
          />
        </div>
        <div className="mb-4">
          <label className="font-medium text-gray-700 block mb-2" htmlFor="key">
            密钥
          </label>
          <Input
            id="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="请输入密钥..."
            className="font-mono text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="font-medium text-gray-700 block mb-2" htmlFor="text">
            文本
          </label>
          <TextArea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="请输入要生成 HMAC 的文本..."
            className="font-mono text-sm"
            rows={4}
          />
        </div>
        <div className="flex gap-2">
          <Button type="primary" onClick={handleProcess} loading={loading}>
            生成
          </Button>
          <Button onClick={handleClear}>清空</Button>
        </div>
      </Card>

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="font-medium text-gray-700" htmlFor="output">
            结果
          </label>
          <Button onClick={handleCopy} disabled={!output} size="small">
            复制
          </Button>
        </div>
        <TextArea
          id="output"
          value={output}
          readOnly
          className="font-mono text-sm bg-gray-50"
          rows={4}
          placeholder="输出结果..."
        />
      </Card>

      <Card title="使用提示">
        <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
          <li>HMAC (Hash-based Message Authentication Code) 是基于哈希函数的消息认证码</li>
          <li>密钥用于生成和验证 HMAC，请妥善保管</li>
          <li>SHA256 是最常用的算法，兼顾安全性和性能</li>
          <li>MD5 和 SHA1 已不再推荐用于安全场景，仅用于兼容性</li>
          <li>相同的文本和密钥会产生相同的 HMAC 值</li>
        </ul>
      </Card>
    </div>
  );
}
