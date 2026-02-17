'use client';

import {
  ArrowDownOutlined,
  InfoCircleOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Button, Card, Input, message, Radio, Space, Tag } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';
import { hashText } from '@/tools/crypto';

const { TextArea } = Input;

const hashAlgorithms = [
  { label: 'MD5', value: 'MD5', desc: '128位，已不建议用于安全场景', color: 'orange' },
  { label: 'SHA-1', value: 'SHA1', desc: '160位，已不建议用于安全场景', color: 'orange' },
  { label: 'SHA-256', value: 'SHA256', desc: '256位，推荐使用', color: 'green' },
  { label: 'SHA-512', value: 'SHA512', desc: '512位，高安全要求场景', color: 'blue' },
  { label: 'SHA3', value: 'SHA3', desc: '最新标准，更高安全性', color: 'purple' },
];

export default function HashTextPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('SHA256');
  const [loading, setLoading] = useState(false);

  const handleHash = useCallback(() => {
    if (!input.trim()) {
      message.warning('请输入要哈希的文本');
      return;
    }
    try {
      setLoading(true);
      const result = hashText(input, selectedAlgorithm);
      setOutput(result);
      message.success('哈希计算成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '哈希计算失败');
    } finally {
      setLoading(false);
    }
  }, [input, selectedAlgorithm]);

  const handleCopy = useCallback(() => {
    if (output) {
      copy(output);
      message.success('已复制到剪贴板');
    }
  }, [output]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
  }, []);

  const _selectedAlgo = hashAlgorithms.find((a) => a.value === selectedAlgorithm);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <SafetyCertificateOutlined className="text-emerald-600" />
          文本哈希
        </h1>
        <p className="text-gray-600 mt-1">将文本转换为固定长度的哈希值</p>
      </div>

      <Card className="mb-6" styles={{ body: { padding: 0 } }}>
        <div className="p-4 border-b border-gray-100">
          <label htmlFor="hash-input" className="font-medium text-gray-700 flex items-center gap-2">
            <span className="w-1 h-4 bg-emerald-500 rounded-full" />
            输入文本
          </label>
        </div>
        <TextArea
          id="hash-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="请输入要哈希的文本..."
          className="font-mono text-sm border-0 rounded-none focus:shadow-none"
          rows={6}
        />
      </Card>

      <div className="flex justify-center mb-6">
        <ArrowDownOutlined className="text-gray-300 text-xl" />
      </div>

      <Card className="mb-6" styles={{ body: { padding: 0 } }}>
        <div className="p-4 border-b border-gray-100">
          <span className="font-medium text-gray-700 flex items-center gap-2">
            <span className="w-1 h-4 bg-blue-500 rounded-full" />
            哈希算法
          </span>
        </div>
        <div className="p-4">
          <Radio.Group
            id="hash-algorithm"
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            className="w-full"
          >
            <Space orientation="vertical" className="w-full" size="middle">
              {hashAlgorithms.map((algo) => (
                <Radio key={algo.value} value={algo.value} className="w-full !m-0">
                  <div className="flex items-center justify-between w-full ml-2">
                    <div>
                      <span className="font-medium">{algo.label}</span>
                      <span className="text-gray-400 text-sm ml-2">{algo.desc}</span>
                    </div>
                    <Tag color={algo.color} className="ml-4">
                      {selectedAlgorithm === algo.value ? '已选择' : '可选'}
                    </Tag>
                  </div>
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </div>
      </Card>

      <div className="flex justify-center mb-6">
        <ArrowDownOutlined className="text-gray-300 text-xl" />
      </div>

      <div className="flex gap-3 justify-center mb-6">
        <Button
          type="primary"
          size="large"
          onClick={handleHash}
          loading={loading}
          disabled={!input.trim()}
          className="min-w-32"
        >
          计算哈希
        </Button>
        <Button size="large" onClick={handleClear} className="min-w-20">
          清空
        </Button>
      </div>

      {output && (
        <>
          <div className="flex justify-center mb-6">
            <ArrowDownOutlined className="text-gray-300 text-xl" />
          </div>

          <Card styles={{ body: { padding: 0 } }}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <label
                htmlFor="hash-output"
                className="font-medium text-gray-700 flex items-center gap-2"
              >
                <span className="w-1 h-4 bg-purple-500 rounded-full" />
                哈希结果
                <Tag color="purple" className="ml-2">
                  {selectedAlgorithm}
                </Tag>
              </label>
              <Button onClick={handleCopy} size="small">
                复制
              </Button>
            </div>
            <TextArea
              id="hash-output"
              value={output}
              readOnly
              className="font-mono text-sm bg-gray-50 border-0 rounded-none focus:shadow-none"
              rows={4}
            />
          </Card>
        </>
      )}

      <Card className="mt-6 bg-amber-50 border-amber-200" styles={{ body: { padding: 16 } }}>
        <div className="flex items-start gap-3">
          <InfoCircleOutlined className="text-amber-600 text-lg mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium mb-1">使用说明</p>
            <ul className="list-disc list-inside space-y-1 text-amber-700">
              <li>选择需要的哈希算法，不同算法输出的长度不同</li>
              <li>SHA-256 是最常用的平衡选择</li>
              <li>哈希是单向加密，无法从哈希值还原原始文本</li>
              <li>相同的输入总是产生相同的哈希值</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
