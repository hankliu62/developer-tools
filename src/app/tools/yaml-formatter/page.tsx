'use client';
import { Button, Input, message, Select, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

export default function YamlFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [indent, setIndent] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [compact, setCompact] = useState(false);

  const formatYaml = useCallback(
    (yaml: string, options: { indent: number; sortKeys: boolean; compact: boolean }) => {
      try {
        const lines = yaml.split('\n');
        const result: string[] = [];
        let _inBlock = false;
        let _blockIndent = 0;

        for (let i = 0; i < lines.length; i++) {
          let line = lines[i];

          if (compact) {
            line = line.trim();
            if (!line) continue;
          }

          if (line.includes(':') && !line.includes(': ') && !line.startsWith('#')) {
            const _key = line.split(':')[0].trim();
            const value = line.substring(line.indexOf(':') + 1).trim();

            if (!value) {
              _inBlock = true;
              _blockIndent = line.length - line.trimStart().length;
              result.push(line);
            } else {
              _inBlock = false;
              result.push(line);
            }
          } else {
            result.push(line);
          }
        }

        let formatted = result.join('\n');

        if (options.sortKeys) {
          const yamlLines = formatted.split('\n');
          const sorted: string[] = [];
          const groups: Record<number, string[]> = {};
          let _currentIndent = -1;

          for (const line of yamlLines) {
            if (line.trim() === '') {
              sorted.push('');
              continue;
            }
            const indent = line.search(/\S/);
            if (indent === -1) continue;

            if (indent === 0) {
              _currentIndent = 0;
              if (!groups[0]) groups[0] = [];
              groups[0].push(line);
            } else {
              if (!groups[indent]) groups[indent] = [];
              groups[indent].push(line);
            }
          }

          for (const indentKey of Object.keys(groups)
            .map(Number)
            .sort((a, b) => a - b)) {
            const lines = groups[indentKey];
            if (indentKey === 0) {
              lines.sort((a, b) => {
                const keyA = a.split(':')[0].trim();
                const keyB = b.split(':')[0].trim();
                return keyA.localeCompare(keyB);
              });
            }
            sorted.push(...lines);
          }
          formatted = sorted.join('\n');
        }

        return formatted;
      } catch (_error) {
        throw new Error('YAML 格式解析失败');
      }
    },
    [compact]
  );

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      message.error('请输入 YAML 内容');
      return;
    }
    setLoading(true);
    try {
      const result = formatYaml(input, { indent, sortKeys, compact });
      setOutput(result);
      message.success('格式化成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '格式化失败');
    } finally {
      setLoading(false);
    }
  }, [input, indent, sortKeys, compact, formatYaml]);

  const handleCompress = useCallback(() => {
    if (!input.trim()) {
      message.error('请输入 YAML 内容');
      return;
    }
    setLoading(true);
    try {
      const lines = input.split('\n');
      const compressed = lines
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#'))
        .join('');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📄 YAML 格式化</h1>
        <p className="text-gray-600">在线格式化、排序、压缩 YAML 数据</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 格式化选项</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-gray-600 block mb-2">缩进空格数</span>
            <Select
              value={indent}
              onChange={setIndent}
              style={{ width: '100%' }}
              options={[
                { value: 2, label: '2 空格' },
                { value: 4, label: '4 空格' },
                { value: 1, label: '1 空格' },
              ]}
            />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">按 Key 排序</span>
            <Switch checked={sortKeys} onChange={setSortKeys} />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">紧凑模式</span>
            <Switch checked={compact} onChange={setCompact} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-800">📝 输入 YAML</span>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="name: john
age: 30
city: beijing"
          className="font-mono text-sm"
          rows={10}
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
          <pre className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto font-mono text-sm text-gray-800 whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 支持标准的 YAML 格式数据</li>
          <li>• 缩进选项可以调整输出格式的缩进大小</li>
          <li>• 按 Key 排序会将对象的键按字母顺序排列</li>
          <li>• 紧凑模式会移除所有多余空白</li>
        </ul>
      </div>
    </div>
  );
}
