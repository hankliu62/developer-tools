'use client';
import { Button, Input, message, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

export default function OutlookSafelinkPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [decodeAll, setDecodeAll] = useState(true);

  const decodeSafelink = useCallback((url: string, decodeAllUrls: boolean): string => {
    try {
      const urlObj = new URL(url);

      if (
        !urlObj.hostname.includes('safelinks.protection.outlook.com') &&
        !url.includes('safelinks')
      ) {
        return url;
      }

      const params = new URLSearchParams(urlObj.search);
      const urlParam = params.get('url');

      if (urlParam) {
        const decoded = decodeURIComponent(urlParam);
        return decoded;
      }

      return url;
    } catch {
      if (decodeAllUrls) {
        try {
          const decoded = decodeURIComponent(url);
          if (decoded.startsWith('http')) {
            return decoded;
          }
        } catch {}
      }
      return url;
    }
  }, []);

  const handleDecode = useCallback(() => {
    if (!input.trim()) {
      message.error('请输入 URL');
      return;
    }
    setLoading(true);
    try {
      const urls = input.split(/[\n,，]/).filter((u) => u.trim());
      const results = urls.map((url) => {
        const trimmed = url.trim();
        return decodeSafelink(trimmed, decodeAll);
      });
      setOutput(results.join('\n'));
      message.success(`解码成功，共 ${results.length} 个 URL`);
    } catch (_error) {
      message.error('解码失败');
    } finally {
      setLoading(false);
    }
  }, [input, decodeAll, decodeSafelink]);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔗 Outlook 安全链接解码</h1>
        <p className="text-gray-600">解码 Outlook/O365 安全链接还原真实 URL</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 解码选项</span>
        <div className="flex items-center gap-4">
          <div>
            <span className="text-sm text-gray-600 block mb-2">尝试解码所有 URL</span>
            <Switch checked={decodeAll} onChange={setDecodeAll} />
          </div>
          <div className="text-sm text-gray-500">关闭后仅解码特定格式的 safelinks</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-800">📝 输入 URL（每行一个）</span>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://eur01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fexample.com%2Fpage&data=..."
          className="font-mono text-sm"
          rows={6}
        />
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          type="primary"
          size="large"
          onClick={handleDecode}
          loading={loading}
          className="flex-1"
        >
          🚀 解码
        </Button>
        <Button size="large" onClick={handleCopy} disabled={!output}>
          📋 复制
        </Button>
      </div>

      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📋 解码结果</span>
            <Button onClick={handleCopy}>📋 复制</Button>
          </div>
          <pre className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto font-mono text-sm text-gray-800 whitespace-pre-wrap break-all">
            {output}
          </pre>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Outlook 安全链接 (safelinks) 用于保护邮件中的链接</li>
          <li>• 解码后可查看链接的真实目的地</li>
          <li>• 支持批量输入，每行或逗号分隔多个 URL</li>
          <li>• 注意：解码后请仔细检查链接是否安全</li>
        </ul>
      </div>
    </div>
  );
}
