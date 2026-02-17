'use client';
import { Button, Card, Input, message, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { marked } from 'marked';
import { useCallback, useRef, useState } from 'react';

export default function MarkdownToHtmlPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [gfm, setGfm] = useState(true);
  const [breaks, setBreaks] = useState(false);
  const [sanitizeMode, setSanitizeMode] = useState(false);

  const sanitizeModeRef = useRef(false);
  sanitizeModeRef.current = sanitizeMode;

  const handleConvert = useCallback(() => {
    try {
      if (!input.trim()) {
        message.error('请输入 Markdown 内容');
        return;
      }
      setLoading(true);

      marked.setOptions({
        gfm,
        breaks,
      });

      const html = marked.parse(input, { async: false }) as string;

      if (sanitizeModeRef.current) {
        // Simple sanitization - in production use DOMPurify
        const clean = html
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/on\w+="[^"]*"/gi, '')
          .replace(/on\w+='[^']*'/gi, '');
        setOutput(clean);
      } else {
        setOutput(html);
      }

      message.success('转换成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Markdown 解析失败');
    } finally {
      setLoading(false);
    }
  }, [input, gfm, breaks]);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 Markdown → HTML</h1>
        <p className="text-gray-600">将 Markdown 转换为 HTML</p>
      </div>

      <Card className="mb-4">
        <div className="mb-4 flex items-center justify-between">
          <label className="font-medium text-gray-700">输入 Markdown</label>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        <Input.TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="# 标题\n\n**粗体** 和 *斜体*\n\n- 列表项1\n- 列表项2"
          className="font-mono text-sm"
          rows={8}
        />
      </Card>

      <Card className="mb-4">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Switch checked={gfm} onChange={setGfm} />
            <span className="text-sm text-gray-700">GitHub 风格</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={breaks} onChange={setBreaks} />
            <span className="text-sm text-gray-700">换行符</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={sanitizeMode} onChange={setSanitizeMode} />
            <span className="text-sm text-gray-700">安全过滤</span>
          </div>
        </div>
      </Card>

      <Button
        type="primary"
        block
        size="large"
        onClick={handleConvert}
        loading={loading}
        className="mb-4"
      >
        转换为 HTML
      </Button>

      {output && (
        <Card className="mb-4">
          <div className="mb-3 flex items-center justify-between">
            <label className="font-medium text-gray-700">输出 HTML</label>
            <Button onClick={handleCopy}>复制</Button>
          </div>
          <Input.TextArea
            value={output}
            readOnly
            className="font-mono text-sm bg-gray-50"
            rows={10}
          />
        </Card>
      )}

      {output && (
        <Card className="mb-4">
          <div className="mb-3">
            <label className="font-medium text-gray-700">预览效果</label>
          </div>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: output }} />
        </Card>
      )}

      <Card>
        <h3 className="font-medium text-gray-700 mb-2">💡 使用提示</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Markdown 是一种轻量级标记语言</li>
          <li>• GitHub 风格支持表格、任务列表等扩展语法</li>
          <li>• 安全过滤可移除潜在的危险 HTML</li>
        </ul>
      </Card>
    </div>
  );
}
