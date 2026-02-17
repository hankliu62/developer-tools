'use client';
import { Button, Input, message, Select, Tooltip } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useEffect, useState } from 'react';
import { decodeUrl, encodeUrl } from '@/tools/web';

const { TextArea } = Input;

type Mode = 'encode' | 'decode';
type EncodingLevel = 'all' | 'partial';

export default function UrlEncoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>('encode');
  const [encodingLevel, setEncodingLevel] = useState<EncodingLevel>('all');

  const processUrl = useCallback((text: string, encodeMode: Mode, level: EncodingLevel) => {
    if (!text) return '';
    try {
      if (encodeMode === 'encode') {
        if (level === 'all') {
          return encodeUrl(text);
        } else {
          return encodeURI(text);
        }
      } else {
        return decodeUrl(text);
      }
    } catch {
      throw new Error(encodeMode === 'decode' ? '解码失败，请检查输入是否正确' : '编码失败');
    }
  }, []);

  useEffect(() => {
    if (input) {
      const result = processUrl(input, mode, encodingLevel);
      setOutput(result);
    } else {
      setOutput('');
    }
  }, [input, mode, encodingLevel, processUrl]);

  const handleCopy = useCallback(() => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  }, [output]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
  }, []);

  const handleModeChange = useCallback((newMode: Mode) => {
    setMode(newMode);
    setOutput('');
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔗 URL 编码解码</h1>
        <p className="text-gray-600">URL 编码与解码工具，支持全部编码和部分编码</p>
      </div>

      <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl border border-violet-100 shadow-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            <button
              type="button"
              onClick={() => handleModeChange('encode')}
              className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
                mode === 'encode'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              🔐 编码
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('decode')}
              className={`px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
                mode === 'decode'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              🔓 解码
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">编码级别：</span>
            <Select
              value={encodingLevel}
              onChange={setEncodingLevel}
              disabled={mode === 'decode'}
              style={{ width: 140 }}
              options={[
                { value: 'all', label: '全部编码' },
                { value: 'partial', label: '部分编码' },
              ]}
            />
            <Tooltip
              title={
                mode === 'decode'
                  ? '解码模式无需选择编码级别'
                  : encodingLevel === 'all'
                    ? '对所有非安全字符进行编码（推荐）'
                    : '仅编码空格和少数特殊字符'
              }
            >
              <span className="text-gray-400 cursor-help">ⓘ</span>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="url-input" className="font-semibold text-gray-800">
            {mode === 'encode' ? '📝 原始 URL' : '📝 编码后的 URL'}
          </label>
          <div className="flex gap-2">
            <Button size="small" onClick={handleClear}>
              清空
            </Button>
          </div>
        </div>
        <TextArea
          id="url-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? '请输入要编码的 URL...' : '请输入要解码的 URL...'}
          className="font-mono text-sm"
          rows={5}
        />
        <div className="mt-2 text-xs text-gray-500">
          {mode === 'encode'
            ? `当前模式：${encodingLevel === 'all' ? 'encodeURIComponent（全部编码）' : 'encodeURI（部分编码）'}`
            : '自动检测并解码 URL 编码字符串'}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-800">
            {mode === 'encode' ? '🔤 编码结果' : '🔤 解码结果'}
          </span>
          <Button onClick={handleCopy} disabled={!output}>
            📋 复制结果
          </Button>
        </div>
        <div
          className={`min-h-[120px] rounded-lg p-4 transition-colors duration-200 ${
            output ? 'bg-gradient-to-br from-gray-50 to-slate-50' : 'bg-gray-50'
          }`}
        >
          {output ? (
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 break-all">
              {output}
            </pre>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              输入内容后实时显示结果...
            </div>
          )}
        </div>
        {output && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              字符数：{output.length} | 字节数：{new Blob([output]).size}
            </span>
            <span className="text-xs text-green-600 font-medium">✓ 实时预览</span>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100">
        <h3 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
          <span>💡</span> 使用提示
        </h3>
        <ul className="text-sm text-emerald-800 space-y-2.5">
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">•</span>
            <span>
              <strong className="font-medium">全部编码</strong>：使用{' '}
              <code className="bg-emerald-100 px-1.5 py-0.5 rounded text-xs">
                encodeURIComponent
              </code>
              ，编码所有非字母数字字符（推荐用于参数值）
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">•</span>
            <span>
              <strong className="font-medium">部分编码</strong>：使用{' '}
              <code className="bg-emerald-100 px-1.5 py-0.5 rounded text-xs">encodeURI</code>
              ，保留 URL 特殊字符（如 / ? : &amp; =）
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">•</span>
            <span>
              <strong className="font-medium">解码</strong>：自动检测编码字符并还原为原始内容
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">•</span>
            <span>
              <strong className="font-medium">常见场景</strong>：API 请求参数、URL
              跳转传参、特殊字符处理
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
