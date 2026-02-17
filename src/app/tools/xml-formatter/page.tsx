'use client';
import { Button, Input, message, Select, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

export default function XmlFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [indent, setIndent] = useState(2);
  const [compact, setCompact] = useState(false);
  const [declare, setDeclare] = useState(true);

  const formatXml = useCallback(
    (xml: string, options: { indent: number; compact: boolean; declare: boolean }) => {
      try {
        let formatted = xml;

        if (!options.declare && formatted.startsWith('<?xml')) {
          const endIdx = formatted.indexOf('?>');
          if (endIdx > 0) {
            formatted = formatted.substring(endIdx + 2).trim();
          }
        }

        if (options.compact) {
          formatted = formatted.replace(/>\s+</g, '><').trim();
        } else {
          let level = 0;
          const indentStr = ' '.repeat(options.indent);

          formatted = formatted
            .replace(/(>)(<)(\/*)/g, '$1\n$2$3')
            .split('\n')
            .map((line) => {
              const _pad = 0;
              if (line.match(/^<\/\w/)) {
                level--;
              } else if (line.match(/^<\w([^>]*[^/])?>.*$/)) {
                level++;
              }

              if (line.trim() === '') return '';

              return indentStr.repeat(level < 0 ? 0 : level) + line.trim();
            })
            .join('\n');
        }

        return formatted;
      } catch (_error) {
        throw new Error('XML 格式解析失败');
      }
    },
    []
  );

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      message.error('请输入 XML 内容');
      return;
    }
    setLoading(true);
    try {
      const result = formatXml(input, { indent, compact, declare });
      setOutput(result);
      message.success('格式化成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '格式化失败');
    } finally {
      setLoading(false);
    }
  }, [input, indent, compact, declare, formatXml]);

  const handleCompress = useCallback(() => {
    if (!input.trim()) {
      message.error('请输入 XML 内容');
      return;
    }
    setLoading(true);
    try {
      const compressed = input.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📜 XML 格式化</h1>
        <p className="text-gray-600">在线格式化、压缩 XML 数据</p>
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
            <span className="text-sm text-gray-600 block mb-2">保留 XML 声明</span>
            <Switch checked={declare} onChange={setDeclare} />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">紧凑模式</span>
            <Switch checked={compact} onChange={setCompact} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-800">📝 输入 XML</span>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="<?xml version=&quot;1.0&quot;?>
<root>
  <item>value</item>
</root>"
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
          <li>• 支持标准的 XML 格式数据</li>
          <li>• 缩进选项可以调整输出格式的缩进大小</li>
          <li>• 紧凑模式会移除元素之间的多余空白</li>
          <li>• 压缩模式会移除所有空白，包括内容中的空白</li>
        </ul>
      </div>
    </div>
  );
}
