'use client';

import { Button, Input, message, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';
import { parseUrl, type UrlParts } from '@/tools/web';

interface ParsedUrl extends UrlParts {
  queryParams: Record<string, string>;
}

function parseUrlWithQueryParams(url: string): ParsedUrl {
  const parts = parseUrl(url);
  const queryParams: Record<string, string> = {};

  if (parts.search) {
    const searchParams = new URLSearchParams(parts.search);
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
  }

  return { ...parts, queryParams };
}

const URL_FIELDS = [
  { key: 'protocol', label: 'Protocol' },
  { key: 'username', label: 'Username' },
  { key: 'password', label: 'Password' },
  { key: 'hostname', label: 'Hostname' },
  { key: 'port', label: 'Port' },
  { key: 'pathname', label: 'Path' },
  { key: 'hash', label: 'Hash' },
  { key: 'origin', label: 'Origin' },
];

interface QueryParamRow {
  key: string;
  param: string;
  value: string;
}

export default function UrlParserPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ParsedUrl | null>(null);
  const [error, setError] = useState('');

  const handleParse = useCallback(() => {
    if (!input.trim()) {
      setError('请输入 URL');
      setResult(null);
      return;
    }

    try {
      const parsed = parseUrlWithQueryParams(input.trim());
      setResult(parsed);
      setError('');
      message.success('解析成功');
    } catch {
      setError('无效的 URL 格式');
      setResult(null);
    }
  }, [input]);

  const handleCopy = useCallback((text: string) => {
    copy(text);
    message.success('复制成功');
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
    setResult(null);
    setError('');
  }, []);

  const queryParamColumns: ColumnsType<QueryParamRow> = [
    {
      title: '参数名',
      dataIndex: 'param',
      key: 'param',
      width: '40%',
      render: (text: string) => <span className="font-mono text-indigo-600">{text}</span>,
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
      render: (text: string) => <span className="font-mono">{text}</span>,
    },
    {
      title: '',
      key: 'action',
      width: 60,
      render: (_: unknown, record: QueryParamRow) => (
        <Button
          type="text"
          size="small"
          onClick={() => handleCopy(record.value)}
          className="text-gray-400 hover:text-indigo-600"
          title="复制"
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <title>复制</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          }
        />
      ),
    },
  ];

  const queryParamData: QueryParamRow[] = result
    ? Object.entries(result.queryParams).map(([key, value]) => ({
        key,
        param: key,
        value,
      }))
    : [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mr-2">
            🔗
          </span>
          URL 解析
        </h1>
        <p className="text-gray-600">解析 URL 的各个组成部分</p>
      </div>

      {/* Input */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <label htmlFor="url-input" className="font-medium text-gray-700 block mb-3">
          输入 URL
        </label>
        <Input
          id="url-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://me:pwd@it-tools.tech:3000/url-parser?name=John&age=30#section"
          size="large"
          onPressEnter={handleParse}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="flex gap-2 mt-4">
          <Button type="primary" onClick={handleParse}>
            解析
          </Button>
          <Button onClick={handleClear}>清空</Button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <>
          {/* Full URL */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-700">完整 URL</span>
              <Button
                size="small"
                type="text"
                onClick={() => handleCopy(result.href)}
                className="text-gray-400 hover:text-indigo-600"
                title="复制"
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <title>复制</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                }
              />
            </div>
            <div className="p-3 bg-gray-50 rounded-lg font-mono text-sm break-all">
              {result.href}
            </div>
          </div>

          {/* URL Parts Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200">
              <span className="font-medium text-gray-700">URL 组成部分</span>
            </div>
            <table className="w-full">
              <tbody>
                {URL_FIELDS.map((field) => {
                  const value = result[field.key as keyof UrlParts];
                  if (!value) return null;

                  return (
                    <tr key={field.key} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-3 bg-gray-50 w-1/3 font-medium text-gray-600">
                        {field.label}
                      </td>
                      <td className="px-4 py-3 font-mono text-sm text-gray-800">{String(value)}</td>
                      <td className="px-4 py-3 w-12">
                        <Button
                          type="text"
                          size="small"
                          onClick={() => handleCopy(String(value))}
                          className="text-gray-400 hover:text-indigo-600"
                          title="复制"
                          icon={
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <title>复制</title>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Query Parameters Table */}
          {Object.keys(result.queryParams).length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <span className="font-medium text-gray-700">查询参数 (Query Params)</span>
                <Button
                  size="small"
                  type="text"
                  onClick={() => handleCopy(JSON.stringify(result.queryParams, null, 2))}
                  className="text-gray-400 hover:text-indigo-600"
                >
                  复制 JSON
                </Button>
              </div>
              <Table
                columns={queryParamColumns}
                dataSource={queryParamData}
                pagination={false}
                size="small"
                locale={{ emptyText: '无查询参数' }}
              />
            </div>
          )}

          {/* No Query Parameters */}
          {Object.keys(result.queryParams).length === 0 && (
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-center text-gray-500">
              无查询参数
            </div>
          )}
        </>
      )}

      {/* Tips */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">使用提示</h3>
        <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
          <li>支持 HTTP、HTTPS、FTP 等多种协议</li>
          <li>可解析完整的 URL 包括协议、用户名、密码、主机、端口、路径、查询参数和锚点</li>
          <li>查询参数会自动解析为键值对形式</li>
          <li>点击复制图标可复制对应的值</li>
        </ul>
      </div>
    </div>
  );
}
