'use client';

import { Button, Input, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';
import { parseJWT } from '@/tools/web';

const { TextArea } = Input;

export default function JwtParserPage() {
  const [input, setInput] = useState('');
  const [parsed, setParsed] = useState<{
    header: Record<string, unknown>;
    payload: Record<string, unknown>;
    signature: string;
  } | null>(null);

  const handleParse = useCallback(() => {
    try {
      const result = parseJWT(input.trim());
      setParsed(result);
      message.success('解析成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '解析失败');
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput('');
    setParsed(null);
  }, []);

  const copyToClipboard = useCallback((text: string) => {
    copy(text);
    message.success('已复制到剪贴板');
  }, []);

    return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mr-2">🎫</span>
          JWT 解析
        </h1>
        <p className="text-gray-600">解析 JWT Token</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
          <h2 className="text-white font-semibold text-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <title>Lock</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            输入 JWT Token
          </h2>
        </div>
        <div className="p-6">
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            className="font-mono text-sm"
            rows={4}
          />
          <div className="flex gap-3 mt-4">
            <Button
              type="primary"
              size="large"
              onClick={handleParse}
              disabled={!input}
              className="bg-indigo-600 hover:bg-indigo-700 border-0"
            >
              解析 JWT
            </Button>
            <Button size="large" onClick={handleClear}>
              清空
            </Button>
          </div>
        </div>
      </div>

      {parsed && (
        <div className="space-y-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-orange-50 px-6 py-3 border-b border-orange-100 flex items-center justify-between">
              <h3 className="font-semibold text-orange-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Header
              </h3>
              <Button
                type="text"
                size="small"
                onClick={() => copyToClipboard(JSON.stringify(parsed.header, null, 2))}
                className="text-orange-600 hover:text-orange-800"
              >
                复制
              </Button>
            </div>
            <div className="p-4 bg-orange-50/30">
              <pre className="font-mono text-sm text-orange-900 overflow-x-auto">
                {JSON.stringify(parsed.header, null, 2)}
              </pre>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-100 flex items-center justify-between">
              <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Payload
              </h3>
              <Button
                type="text"
                size="small"
                onClick={() => copyToClipboard(JSON.stringify(parsed.payload, null, 2))}
                className="text-emerald-600 hover:text-emerald-800"
              >
                复制
              </Button>
            </div>
            <div className="p-4 bg-emerald-50/30">
              <pre className="font-mono text-sm text-emerald-900 overflow-x-auto">
                {JSON.stringify(parsed.payload, null, 2)}
              </pre>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-blue-50 px-6 py-3 border-b border-blue-100 flex items-center justify-between">
              <h3 className="font-semibold text-blue-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Signature
              </h3>
              <Button
                type="text"
                size="small"
                onClick={() => copyToClipboard(parsed.signature)}
                className="text-blue-600 hover:text-blue-800"
              >
                复制
              </Button>
            </div>
            <div className="p-4 bg-blue-50/30">
              <pre className="font-mono text-sm text-blue-900 break-all">{parsed.signature}</pre>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Lightbulb</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          使用提示
        </h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-1">•</span>
            <span>
              JWT 由三部分组成：Header（头部）、Payload（负载）、Signature（签名），用{' '}
              <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">.</code> 分隔
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-1">•</span>
            <span>Header 和 Payload 采用 Base64URL 编码，可直接解码查看 JSON 内容</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-1">•</span>
            <span>Signature 用于验证消息完整性，需要密钥才能验证</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-1">•</span>
            <span>
              Payload 中的 <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">exp</code>、
              <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">iat</code>、
              <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">nbf</code>{' '}
              等字段为时间戳（Unix 时间）
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
