'use client';
import { Button, Input, message, Radio } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';
import { decodeBase64, encodeBase64 } from '@/tools/converter';

const { TextArea } = Input;

export default function Base64Page() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [loading, setLoading] = useState(false);

  const handleProcess = useCallback(() => {
    try {
      if (!input) {
        message.error('请输入内容');
        return;
      }
      setLoading(true);
      const result = mode === 'encode' ? encodeBase64(input) : decodeBase64(input);
      setOutput(result);
      message.success(mode === 'encode' ? '编码成功' : '解码成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '解码失败，请检查输入是否正确');
    } finally {
      setLoading(false);
    }
  }, [input, mode]);

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔐 Base64 编码解码</h1>
        <p className="text-gray-600">Base64 字符串编码与解码工具</p>
      </div>

      {/* Mode Selector */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 mb-6 flex justify-center">
        <Radio.Group
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            setOutput('');
          }}
          buttonStyle="solid"
          size="large"
        >
          <Radio.Button value="encode">🔒 编码</Radio.Button>
          <Radio.Button value="decode">🔓 解码</Radio.Button>
        </Radio.Group>
      </div>

      {/* Input */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-800">
            {mode === 'encode' ? '📝 原文' : '📝 Base64 字符串'}
          </span>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === 'encode' ? '请输入要编码的内容...' : '请输入要解码的 Base64 字符串...'
          }
          className="font-mono text-sm"
          rows={6}
        />
      </div>

      {/* Action */}
      <Button
        type="primary"
        size="large"
        block
        onClick={handleProcess}
        loading={loading}
        disabled={!input}
        className="h-12 text-base font-medium mb-4"
      >
        {mode === 'encode' ? '🔐 开始编码' : '🔓 开始解码'}
      </Button>

      {/* Output */}
      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">
              {mode === 'encode' ? '🔤 Base64 结果' : '🔤 解码结果'}
            </span>
            <Button onClick={handleCopy}>📋 复制结果</Button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 break-all">
              {output}
            </pre>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>
            • <strong>编码</strong>：将任意字符串转换为 Base64 格式，常用于 URL、JSON 传输
          </li>
          <li>
            • <strong>解码</strong>：将 Base64 字符串还原为原始内容
          </li>
          <li>• 注意：Base64 不是加密方式，仅用于编码，逆向可解密</li>
        </ul>
      </div>
    </div>
  );
}
