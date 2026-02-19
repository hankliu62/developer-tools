'use client';
import { Button, Card, Input, message, Select, Slider } from 'antd';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import { bcryptHash } from '@/tools/crypto';

const { TextArea } = Input;

export default function BcryptPage() {
  const [mode, setMode] = useState<'hash' | 'verify'>('hash');
  const [input, setInput] = useState('');
  const [hashInput, setHashInput] = useState('');
  const [output, setOutput] = useState('');
  const [rounds, setRounds] = useState(10);
  const [strength, setStrength] = useState<'low' | 'medium' | 'high'>('medium');
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    try {
      setLoading(true);
      if (!input) {
        message.error('请输入内容');
        return;
      }

      if (mode === 'hash') {
        const result = await bcryptHash(input, rounds);
        setOutput(result);
        message.success('加密成功');
      } else {
        if (!hashInput) {
          message.error('请输入哈希值');
          return;
        }
        const result = await bcryptHash(input, rounds);
        const isValid = result === hashInput;
        setOutput(isValid ? '验证通过' : '验证失败');
        message.success(isValid ? '验证通过' : '验证失败');
      }
    } catch (error) {
      message.error(error instanceof Error ? error.message : '处理失败');
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

  const handleStrengthChange = (value: 'low' | 'medium' | 'high') => {
    setStrength(value);
    const roundsMap = { low: 8, medium: 10, high: 12 };
    setRounds(roundsMap[value]);
  };

    return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mr-2">🔐</span>
          Bcrypt 加密
        </h1>
        <p className="text-gray-600">Bcrypt 加密和验证</p>
      </div>

      <Card className="mb-6">
        <div className="flex gap-2">
          <Button
            type={mode === 'hash' ? 'primary' : 'default'}
            onClick={() => {
              setMode('hash');
              setOutput('');
            }}
          >
            加密模式
          </Button>
          <Button
            type={mode === 'verify' ? 'primary' : 'default'}
            onClick={() => {
              setMode('verify');
              setOutput('');
            }}
          >
            验证模式
          </Button>
        </div>
      </Card>

      <Card className="mb-6">
        <div className="mb-4">
          <span className="font-medium text-gray-700 block mb-2">强度选择</span>
          <Select
            value={strength}
            onChange={handleStrengthChange}
            style={{ width: 200 }}
            options={[
              { value: 'low', label: '低 (8轮)' },
              { value: 'medium', label: '中 (10轮)' },
              { value: 'high', label: '高 (12轮)' },
            ]}
          />
        </div>
        <div className="mb-4">
          <span className="font-medium text-gray-700 block mb-2">轮数: {rounds}</span>
          <Slider
            min={4}
            max={15}
            value={rounds}
            onChange={setRounds}
            marks={{
              4: '4',
              8: '8',
              10: '10',
              12: '12',
              15: '15',
            }}
          />
        </div>
      </Card>

      <Card className="mb-6">
        <div className="mb-4">
          <span className="font-medium text-gray-700 block mb-2">
            {mode === 'hash' ? '明文' : '明文'}
          </span>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'hash' ? '请输入明文...' : '请输入明文...'}
            className="font-mono text-sm"
            rows={4}
          />
        </div>

        {mode === 'verify' && (
          <div className="mb-4">
            <span className="font-medium text-gray-700 block mb-2">哈希值</span>
            <TextArea
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              placeholder="请输入哈希值..."
              className="font-mono text-sm"
              rows={4}
            />
          </div>
        )}

        <Button type="primary" onClick={handleProcess} loading={loading}>
          {mode === 'hash' ? '加密' : '验证'}
        </Button>
      </Card>

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-gray-700">
            {mode === 'hash' ? '哈希结果' : '验证结果'}
          </span>
          <Button onClick={handleCopy} disabled={!output} size="small">
            复制
          </Button>
        </div>
        <TextArea
          value={output}
          readOnly
          className="font-mono text-sm bg-gray-50"
          rows={4}
          placeholder="输出结果..."
        />
      </Card>

      <Card title="使用提示">
        <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
          <li>Bcrypt 是一种基于 Blowfish 密码的密码哈希算法</li>
          <li>轮数越高越安全，但计算时间也越长</li>
          <li>建议生产环境使用 10-12 轮</li>
          <li>加密结果每次都不同，因为会自动生成随机盐值</li>
          <li>验证时需要提供原始明文和哈希值进行比对</li>
        </ul>
      </Card>
    </div>
  );
}
