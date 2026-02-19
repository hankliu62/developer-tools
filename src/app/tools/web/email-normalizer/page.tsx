'use client';
import { Button, Input, message, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

export default function EmailNormalizerPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lowercase, setLowercase] = useState(true);
  const [trim, setTrim] = useState(true);
  const [removeDots, setRemoveDots] = useState(false);
  const [removePlus, setRemovePlus] = useState(false);
  const [domain, setDomain] = useState('');

  const normalizeEmail = useCallback(
    (
      email: string,
      options: {
        lowercase: boolean;
        trim: boolean;
        removeDots: boolean;
        removePlus: boolean;
        domain: string;
      }
    ) => {
      let normalized = options.trim ? email.trim() : email;

      if (options.lowercase) {
        normalized = normalized.toLowerCase();
      }

      const atIndex = normalized.lastIndexOf('@');
      if (atIndex === -1) {
        throw new Error('无效的邮箱地址');
      }

      let localPart = normalized.substring(0, atIndex);
      let domainPart = normalized.substring(atIndex + 1);

      if (options.removeDots && domainPart === 'gmail.com') {
        localPart = localPart.replace(/\./g, '');
      }

      if (options.removePlus) {
        const plusIndex = localPart.indexOf('+');
        if (plusIndex > -1) {
          localPart = localPart.substring(0, plusIndex);
        }
      }

      if (options.domain) {
        domainPart = options.domain;
      }

      return `${localPart}@${domainPart}`;
    },
    []
  );

  const handleNormalize = useCallback(() => {
    if (!input.trim()) {
      message.error('请输入邮箱地址');
      return;
    }
    setLoading(true);
    try {
      const emails = input.split(/[\n,，]/).filter((e) => e.trim());
      const results = emails.map((email) =>
        normalizeEmail(email.trim(), { lowercase, trim, removeDots, removePlus, domain })
      );
      setOutput(results.join('\n'));
      message.success(`规范化成功，共 ${results.length} 个邮箱`);
    } catch (error) {
      message.error(error instanceof Error ? error.message : '规范化失败');
    } finally {
      setLoading(false);
    }
  }, [input, lowercase, trim, removeDots, removePlus, domain, normalizeEmail]);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📧 邮箱规范化</h1>
        <p className="text-gray-600">统一邮箱格式，处理 Gmail 点号和加号</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 规范化选项</span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-gray-600 block mb-2">转为小写</span>
            <Switch checked={lowercase} onChange={setLowercase} />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">去除首尾空白</span>
            <Switch checked={trim} onChange={setTrim} />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">移除 Gmail 点号</span>
            <Switch checked={removeDots} onChange={setRemoveDots} />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">移除 + 后缀</span>
            <Switch checked={removePlus} onChange={setRemovePlus} />
          </div>
          <div className="md:col-span-2">
            <span className="text-sm text-gray-600 block mb-2">自定义域名（留空使用原域名）</span>
            <Input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="例如: gmail.com"
              size="large"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-800">📝 输入邮箱（每行一个）</span>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="John.Doe@gmail.com
J.Ohn.Doe+test@googlemail.com
TEST@GMAIL.COM"
          className="font-mono text-sm"
          rows={8}
        />
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          type="primary"
          size="large"
          onClick={handleNormalize}
          loading={loading}
          className="flex-1"
        >
          🚀 规范化
        </Button>
        <Button size="large" onClick={handleCopy} disabled={!output}>
          📋 复制
        </Button>
      </div>

      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📋 规范化结果</span>
            <Button onClick={handleCopy}>📋 复制</Button>
          </div>
          <pre className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto font-mono text-sm text-gray-800 whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 支持批量输入，每行或逗号分隔多个邮箱</li>
          <li>• 移除 Gmail 点号：john.doe@gmail.com → johndoe@gmail.com</li>
          <li>• 移除 + 后缀：john+test@gmail.com → john@gmail.com</li>
          <li>• 自定义域名可统一修改所有邮箱的域名部分</li>
        </ul>
      </div>
    </div>
  );
}
