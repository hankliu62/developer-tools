'use client';
import { Button, Input, message, Radio, Select } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useMemo, useState } from 'react';
import { type FormatOptionsWithLanguage, format as formatSQL } from 'sql-formatter';

const { TextArea } = Input;

// SQL Dialect options - 13 dialects
const DIALECT_OPTIONS = [
  { value: 'sql', label: 'Standard SQL' },
  { value: 'bigquery', label: 'GCP BigQuery' },
  { value: 'db2', label: 'IBM DB2' },
  { value: 'hive', label: 'Apache Hive' },
  { value: 'mariadb', label: 'MariaDB' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'n1ql', label: 'Couchbase N1QL' },
  { value: 'plsql', label: 'Oracle PL/SQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'redshift', label: 'Amazon Redshift' },
  { value: 'spark', label: 'Spark' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'tsql', label: 'SQL Server T-SQL' },
];

// Keyword case options
const KEYWORD_CASE_OPTIONS = [
  { value: 'upper', label: '大写' },
  { value: 'lower', label: '小写' },
  { value: 'preserve', label: '保持原样' },
];

// Indent style options
const INDENT_STYLE_OPTIONS = [
  { value: 'standard', label: '标准' },
  { value: 'tabularLeft', label: '左对齐' },
  { value: 'tabularRight', label: '右对齐' },
];

export default function SqlFormatterPage() {
  // Configuration state
  const [config, setConfig] = useState<FormatOptionsWithLanguage>({
    keywordCase: 'upper',
    useTabs: false,
    language: 'sql',
    indentStyle: 'standard',
  });

  // Other states
  const [indentWidth, setIndentWidth] = useState<2 | 4>(2);
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Real-time formatted SQL using useMemo
  const formattedSQL = useMemo(() => {
    if (!input.trim()) return '';
    try {
      const result = formatSQL(input, {
        ...config,
        tabWidth: indentWidth,
      });
      setErrorMessage(null);
      return result;
    } catch (error: any) {
      setErrorMessage(error.message);
      return input; // Return original on error
    }
  }, [input, config, indentWidth]);

  // Handle copy
  const handleCopy = useCallback(() => {
    if (formattedSQL) {
      copy(formattedSQL);
      message.success('复制成功');
    }
  }, [formattedSQL]);

  // Handle clear
  const handleClear = useCallback(() => {
    setInput('');
    setErrorMessage(null);
  }, []);

  // Handle compress
  const handleCompress = useCallback(() => {
    if (!input) {
      message.error('请输入 SQL 语句');
      return;
    }
    try {
      const compressed = formatSQL(input, {
        ...config,
        tabWidth: 0,
        linesBetweenQueries: 0,
        expressionWidth: 999,
        denseOperators: true,
      });
      copy(compressed);
      message.success('压缩成功，已复制到剪贴板');
    } catch (_error) {
      message.error('压缩失败');
    }
  }, [input, config]);

  // Handle scroll to output
  const handleFormat = useCallback(() => {
    document.querySelector('#sql-output')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Update config helper
  const updateConfig = useCallback(
    <K extends keyof FormatOptionsWithLanguage>(key: K, value: FormatOptionsWithLanguage[K]) => {
      setConfig((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">💾 SQL 格式化工具</h1>
        <p className="text-slate-600">实时预览 · 多方言支持 · 智能格式化</p>
      </div>

      {/* Options Panel */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <svg
            className="w-5 h-5 text-slate-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="font-semibold text-slate-800">格式化选项</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* SQL Dialect */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-2 block">SQL 方言</label>
            <Select
              value={config.language}
              onChange={(value) => updateConfig('language', value)}
              style={{ width: '100%' }}
              options={DIALECT_OPTIONS}
              className="w-full"
            />
          </div>
          {/* Indent Style */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-2 block">缩进风格</label>
            <Select
              value={config.indentStyle}
              onChange={(value) => updateConfig('indentStyle', value as any)}
              style={{ width: '100%' }}
              options={INDENT_STYLE_OPTIONS}
              className="w-full"
            />
          </div>
          {/* Keyword Case */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-2 block">关键字风格</label>
            <Select
              value={config.keywordCase}
              onChange={(value) => updateConfig('keywordCase', value as any)}
              style={{ width: '100%' }}
              options={KEYWORD_CASE_OPTIONS}
              className="w-full"
            />
          </div>
          {/* Tab Width */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-2 block">缩进大小</label>
            <Radio.Group
              value={indentWidth}
              onChange={(e) => setIndentWidth(e.target.value)}
              className="flex gap-2"
            >
              <Radio.Button value={2} className="flex-1 text-center">
                2 空格
              </Radio.Button>
              <Radio.Button value={4} className="flex-1 text-center">
                4 空格
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
          <div className="flex items-start gap-3">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-amber-800 text-sm mb-1">格式化警告</h4>
              <p className="text-sm text-amber-700 break-all">{errorMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-amber-500 hover:text-amber-700 transition-colors"
              aria-label="关闭警告"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Input Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <span className="font-semibold text-slate-800">输入 SQL</span>
          </div>
          <Button
            size="small"
            onClick={handleClear}
            className="text-slate-500 hover:text-slate-700"
            type="default"
          >
            清空
          </Button>
        </div>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="SELECT * FROM users WHERE id = 1"
          className="font-mono text-sm !bg-slate-50 !border-slate-200 focus:!border-blue-400"
          rows={10}
          autoSize={{ minRows: 8, maxRows: 20 }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          type="primary"
          size="large"
          onClick={handleFormat}
          className="flex-1 sm:flex-none min-w-[120px]"
          icon={
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          }
        >
          格式化
        </Button>
        <Button
          size="large"
          onClick={handleCompress}
          className="flex-1 sm:flex-none min-w-[120px]"
          icon={
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          }
        >
          压缩
        </Button>
        <Button
          size="large"
          onClick={handleCopy}
          disabled={!formattedSQL}
          className="flex-1 sm:flex-none min-w-[120px]"
          icon={
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          }
        >
          复制
        </Button>
      </div>

      {/* Output Section */}
      <div
        id="sql-output"
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="font-semibold text-slate-800">格式化结果</span>
          </div>
          <Button
            onClick={handleCopy}
            disabled={!formattedSQL}
            size="small"
            className="text-slate-500 hover:text-slate-700"
          >
            复制
          </Button>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 max-h-[500px] overflow-auto border border-slate-100">
          <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800 leading-relaxed">
            {formattedSQL || (
              <span className="text-slate-400 italic">
                在左侧输入 SQL 语句，右侧将实时显示格式化结果
              </span>
            )}
          </pre>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <svg
            aria-hidden="true"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          使用提示
        </h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              支持 <strong>13 种 SQL 方言</strong>：PostgreSQL、MySQL、BigQuery、SQL Server 等
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>实时预览</strong>：输入即格式化，无需点击按钮
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>三种缩进风格</strong>：Standard、Tabular Left、Tabular Right
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>智能错误提示</strong>：即使 SQL 有小问题也能显示格式化结果
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              <strong>压缩功能</strong>：移除所有多余空白，生成紧凑的 SQL
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
