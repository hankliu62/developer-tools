'use client';

import { Button, Card, message, Radio, Select, Space } from 'antd';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import { generateRSAKeyPair } from '@/tools/crypto';

type KeyLength = 1024 | 2048 | 4096;
type KeyFormat = 'PEM' | 'OpenSSH';

export default function RSAKeyPairPage() {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyLength, setKeyLength] = useState<KeyLength>(2048);
  const [keyFormat, setKeyFormat] = useState<KeyFormat>('PEM');

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const keyPair = await generateRSAKeyPair(keyLength, keyFormat);
      setPublicKey(keyPair.publicKey);
      setPrivateKey(keyPair.privateKey);
      message.success('生成成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '生成失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    if (text) {
      copy(text);
      message.success('复制成功');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">RSA 密钥对生成</h1>
        <p className="text-gray-600 mt-1">生成 RSA 密钥对</p>
      </div>

      <Card className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="font-medium text-gray-700 mb-2 block">密钥长度</label>
            <Radio.Group value={keyLength} onChange={(e) => setKeyLength(e.target.value)}>
              <Space>
                <Radio value={1024}>1024 位</Radio>
                <Radio value={2048}>2048 位</Radio>
                <Radio value={4096}>4096 位</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div>
            <label className="font-medium text-gray-700 mb-2 block">输出格式</label>
            <Select
              value={keyFormat}
              onChange={setKeyFormat}
              style={{ width: 200 }}
              options={[
                { label: 'PEM', value: 'PEM' },
                { label: 'OpenSSH', value: 'OpenSSH' },
              ]}
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-center mb-6">
        <Button
          type="primary"
          size="large"
          onClick={handleGenerate}
          loading={loading}
          className="min-w-40"
        >
          生成密钥对
        </Button>
      </div>

      <Card className="mb-6" styles={{ body: { padding: 0 } }}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <span className="w-1 h-4 bg-blue-500 rounded-full" />
              公钥
            </label>
            <Button onClick={() => handleCopy(publicKey)} disabled={!publicKey} size="small">
              复制
            </Button>
          </div>
        </div>
        <textarea
          value={publicKey}
          readOnly
          className="w-full h-48 p-4 font-mono text-sm bg-gray-50 border-0 rounded-none resize-none focus:shadow-none"
          placeholder="公钥..."
        />
      </Card>

      <Card className="mb-6" styles={{ body: { padding: 0 } }}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <span className="w-1 h-4 bg-emerald-500 rounded-full" />
              私钥
            </label>
            <Button onClick={() => handleCopy(privateKey)} disabled={!privateKey} size="small">
              复制
            </Button>
          </div>
        </div>
        <textarea
          value={privateKey}
          readOnly
          className="w-full h-48 p-4 font-mono text-sm bg-gray-50 border-0 rounded-none resize-none focus:shadow-none"
          placeholder="私钥..."
        />
      </Card>

      <Card title="使用提示">
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="mt-1 text-blue-500">•</span>
            <span>1024 位密钥已不再推荐用于安全场景，建议使用 2048 或 4096 位</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-blue-500">•</span>
            <span>PEM 格式是通用的密钥格式，广泛支持于各种语言和工具</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-blue-500">•</span>
            <span>OpenSSH 格式主要用于 Linux 服务器和 Git SSH 认证</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-blue-500">•</span>
            <span>生成的密钥对在浏览器本地生成，不会发送到服务器</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-blue-500">•</span>
            <span>请妥善保管私钥，泄露可能导致安全风险</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
