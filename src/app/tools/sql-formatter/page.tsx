'use client';
import { Button, Input, message, Radio, Select, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

export default function SqlFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [indentSize, setIndentSize] = useState<2 | 4>(2);
  const [uppercase, setUppercase] = useState(true);
  const [keywordCase, setKeywordCase] = useState<'upper' | 'lower' | 'capitalize'>('upper');

  const formatSql = useCallback(
    (sql: string) => {
      let formatted = sql
        .replace(/\s+/g, ' ')
        .replace(/\s*,\s*/g, ',\n')
        .replace(/\s*\(\s*/g, '(\n')
        .replace(/\s*\)\s*/g, '\n)')
        .replace(/\bSELECT\b/gi, 'SELECT')
        .replace(/\bFROM\b/gi, 'FROM')
        .replace(/\bWHERE\b/gi, 'WHERE')
        .replace(/\bAND\b/gi, 'AND')
        .replace(/\bOR\b/gi, 'OR')
        .replace(/\bJOIN\b/gi, 'JOIN')
        .replace(/\bLEFT\b/gi, 'LEFT')
        .replace(/\bRIGHT\b/gi, 'RIGHT')
        .replace(/\bINNER\b/gi, 'INNER')
        .replace(/\bOUTER\b/gi, 'OUTER')
        .replace(/\bON\b/gi, 'ON')
        .replace(/\bORDER BY\b/gi, 'ORDER BY')
        .replace(/\bGROUP BY\b/gi, 'GROUP BY')
        .replace(/\bHAVING\b/gi, 'HAVING')
        .replace(/\bLIMIT\b/gi, 'LIMIT')
        .replace(/\bINSERT INTO\b/gi, 'INSERT INTO')
        .replace(/\bVALUES\b/gi, 'VALUES')
        .replace(/\bUPDATE\b/gi, 'UPDATE')
        .replace(/\bSET\b/gi, 'SET')
        .replace(/\bDELETE FROM\b/gi, 'DELETE FROM')
        .replace(/\bCREATE TABLE\b/gi, 'CREATE TABLE')
        .replace(/\bALTER TABLE\b/gi, 'ALTER TABLE')
        .replace(/\bDROP TABLE\b/gi, 'DROP TABLE');

      if (uppercase && keywordCase === 'upper') {
        const keywords = [
          'SELECT',
          'FROM',
          'WHERE',
          'AND',
          'OR',
          'JOIN',
          'LEFT',
          'RIGHT',
          'INNER',
          'OUTER',
          'ON',
          'ORDER BY',
          'GROUP BY',
          'HAVING',
          'LIMIT',
          'INSERT INTO',
          'VALUES',
          'UPDATE',
          'SET',
          'DELETE FROM',
          'CREATE TABLE',
          'ALTER TABLE',
          'DROP TABLE',
          'AS',
          'IN',
          'NOT',
          'NULL',
          'IS',
          'LIKE',
          'BETWEEN',
          'EXISTS',
          'CASE',
          'WHEN',
          'THEN',
          'ELSE',
          'END',
          'UNION',
          'ALL',
          'DISTINCT',
        ];
        keywords.forEach((kw) => {
          const regex = new RegExp(`\\b${kw}\\b`, 'gi');
          formatted = formatted.replace(regex, kw);
        });
      } else if (keywordCase === 'lower') {
        formatted = formatted.toLowerCase();
      }

      const indent = ' '.repeat(indentSize);
      const lines = formatted.split('\n');
      let indentLevel = 0;
      const indentedLines = lines.map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith(')') || trimmed.startsWith('END')) {
          indentLevel = Math.max(0, indentLevel - 1);
        }
        const result = indent.repeat(indentLevel) + trimmed;
        if (trimmed.includes('(') && !trimmed.includes(')')) {
          indentLevel++;
        }
        return result;
      });

      return indentedLines.join('\n');
    },
    [indentSize, uppercase, keywordCase]
  );

  const handleFormat = useCallback(() => {
    if (!input) {
      message.error('请输入 SQL 语句');
      return;
    }
    setLoading(true);
    try {
      const result = formatSql(input);
      setOutput(result);
      message.success('格式化成功');
    } catch (_error) {
      message.error('格式化失败');
    } finally {
      setLoading(false);
    }
  }, [input, formatSql]);

  const handleCompress = useCallback(() => {
    if (!input) {
      message.error('请输入 SQL 语句');
      return;
    }
    setLoading(true);
    try {
      const compressed = input.replace(/\s+/g, ' ').trim();
      setOutput(compressed);
      message.success('压缩成功');
    } catch (_error) {
      message.error('压缩失败');
    } finally {
      setLoading(false);
    }
  }, [input]);

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
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 SQL 格式化</h1>
        <p className="text-gray-600">格式化与压缩 SQL 语句</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 格式化选项</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-gray-600 block mb-2">缩进大小</span>
            <Radio.Group value={indentSize} onChange={(e) => setIndentSize(e.target.value)}>
              <Radio.Button value={2}>2 空格</Radio.Button>
              <Radio.Button value={4}>4 空格</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">关键字大写</span>
            <Switch checked={uppercase} onChange={setUppercase} />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">关键字风格</span>
            <Select
              value={keywordCase}
              onChange={setKeywordCase}
              style={{ width: '100%' }}
              options={[
                { value: 'upper', label: '大写' },
                { value: 'lower', label: '小写' },
                { value: 'capitalize', label: '首字母大写' },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-800">📝 输入 SQL</span>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="SELECT * FROM users WHERE id = 1"
          className="font-mono text-sm"
          rows={8}
        />
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          type="primary"
          size="large"
          onClick={handleFormat}
          loading={loading}
          className="flex-1"
        >
          🚀 格式化
        </Button>
        <Button size="large" onClick={handleCompress}>
          📦 压缩
        </Button>
        <Button size="large" onClick={handleCopy} disabled={!output}>
          📋 复制
        </Button>
      </div>

      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📋 格式化结果</span>
            <Button onClick={handleCopy}>📋 复制</Button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">{output}</pre>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 支持 SELECT、INSERT、UPDATE、DELETE、CREATE 等常见 SQL 语句</li>
          <li>• 可选择缩进为 2 空格或 4 空格</li>
          <li>• 关键字风格可选择大写、小写或首字母大写</li>
          <li>• 压缩功能移除所有多余空白，生成紧凑的 SQL</li>
        </ul>
      </div>
    </div>
  );
}
