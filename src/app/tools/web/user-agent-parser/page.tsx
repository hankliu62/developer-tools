'use client';
import { Button, Input, message, Switch, Tag } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

interface ParsedUA {
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  device: string;
  deviceType: string;
  engine: string;
  isMobile: boolean;
  isBot: boolean;
}

const browserPatterns: Array<{ pattern: RegExp; name: string }> = [
  { pattern: /Edg\/([\d.]+)/, name: 'Edge' },
  { pattern: /Chrome\/([\d.]+)/, name: 'Chrome' },
  { pattern: /Firefox\/([\d.]+)/, name: 'Firefox' },
  { pattern: /Safari\/([\d.]+)/, name: 'Safari' },
  { pattern: /OPR\/([\d.]+)/, name: 'Opera' },
  { pattern: /SamsungBrowser\/([\d.]+)/, name: 'Samsung Browser' },
  { pattern: /UCBrowser\/([\d.]+)/, name: 'UC Browser' },
  { pattern: /QQBrowser\/([\d.]+)/, name: 'QQ Browser' },
  { pattern: /BaiduBrowser\/([\d.]+)/, name: 'Baidu Browser' },
  { pattern: /WeChat\/([\d.]+)/, name: 'WeChat' },
];

const osPatterns: Array<{ pattern: RegExp; name: string }> = [
  { pattern: /Windows NT 10\.0/, name: 'Windows 10' },
  { pattern: /Windows NT 10/, name: 'Windows 10+' },
  { pattern: /Windows NT 6\.3/, name: 'Windows 8.1' },
  { pattern: /Windows NT 6\.2/, name: 'Windows 8' },
  { pattern: /Windows NT 6\.1/, name: 'Windows 7' },
  { pattern: /Mac OS X ([\d_]+)/, name: 'macOS' },
  { pattern: /iPhone OS ([\d_]+)/, name: 'iOS' },
  { pattern: /iPad.*OS ([\d_]+)/, name: 'iPadOS' },
  { pattern: /Android ([\d.]+)/, name: 'Android' },
  { pattern: /Linux/, name: 'Linux' },
  { pattern: /CrOS/, name: 'Chrome OS' },
];

const devicePatterns: Array<{ pattern: RegExp; name: string; type: string }> = [
  { pattern: /iPhone/, name: 'iPhone', type: 'Phone' },
  { pattern: /iPad/, name: 'iPad', type: 'Tablet' },
  { pattern: /Android.*Mobile/, name: 'Android Phone', type: 'Phone' },
  { pattern: /Android/, name: 'Android Tablet', type: 'Tablet' },
  { pattern: /Windows Phone/, name: 'Windows Phone', type: 'Phone' },
  { pattern: /Macintosh/, name: 'Mac', type: 'Desktop' },
  { pattern: /Linux.*x86_64/, name: 'Linux PC', type: 'Desktop' },
  { pattern: /Windows/, name: 'Windows PC', type: 'Desktop' },
];

const botPatterns = [
  /Googlebot/,
  /Bingbot/,
  /Slurp/,
  /DuckDuckBot/,
  /Baiduspider/,
  /YandexBot/,
  /Sogou/,
  /facebookexternalhit/,
  /Twitterbot/,
  /LinkedInBot/,
  /WhatsApp/,
  /TelegramBot/,
];

export default function UserAgentParserPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<ParsedUA | null>(null);
  const [loading, setLoading] = useState(false);
  const [jsonFormat, setJsonFormat] = useState(false);

  const parseUA = useCallback((ua: string): ParsedUA => {
    let browser = 'Unknown';
    let browserVersion = '';
    let os = 'Unknown';
    let osVersion = '';
    let device = 'Unknown';
    let deviceType = 'Desktop';
    let isMobile = /Mobile|Android|iPhone|iPad/i.test(ua);
    const isBot = botPatterns.some((bot) => bot.test(ua));

    for (const { pattern, name } of browserPatterns) {
      const match = ua.match(pattern);
      if (match) {
        browser = name;
        browserVersion = match[1] || '';
        break;
      }
    }

    for (const { pattern, name } of osPatterns) {
      if (pattern.test(ua)) {
        os = name;
        const verMatch = ua.match(pattern);
        if (verMatch?.[1]) {
          osVersion = verMatch[1].replace(/_/g, '.');
        }
        break;
      }
    }

    for (const { pattern, name, type } of devicePatterns) {
      if (pattern.test(ua)) {
        device = name;
        deviceType = type;
        break;
      }
    }

    if (isBot) {
      deviceType = 'Bot';
      isMobile = false;
    }

    return {
      browser,
      browserVersion,
      os,
      osVersion,
      device,
      deviceType,
      engine: '',
      isMobile,
      isBot,
    };
  }, []);

  const handleParse = useCallback(() => {
    if (!input.trim()) {
      message.error('请输入 User-Agent');
      return;
    }
    setLoading(true);
    try {
      const result = parseUA(input);
      setOutput(result);
      message.success('解析成功');
    } catch (_error) {
      message.error('解析失败');
    } finally {
      setLoading(false);
    }
  }, [input, parseUA]);

  const handleCopy = () => {
    if (!output) return;
    const content = jsonFormat
      ? JSON.stringify(output, null, 2)
      : `Browser: ${output.browser} ${output.browserVersion}
OS: ${output.os} ${output.osVersion}
Device: ${output.device} (${output.deviceType})
Mobile: ${output.isMobile ? 'Yes' : 'No'}
Bot: ${output.isBot ? 'Yes' : 'No'}`;
    copy(content);
    message.success('复制成功');
  };

  const handleClear = () => {
    setInput('');
    setOutput(null);
  };

  const handleSample = (sample: string) => {
    setInput(sample);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔍 User-Agent 解析</h1>
        <p className="text-gray-600">解析浏览器 User-Agent 字符串</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 输出选项</span>
        <div className="flex items-center gap-4">
          <div>
            <span className="text-sm text-gray-600 block mb-2">JSON 格式</span>
            <Switch checked={jsonFormat} onChange={setJsonFormat} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-800">📝 输入 User-Agent</span>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
          className="font-mono text-sm"
          rows={4}
        />
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          type="primary"
          size="large"
          onClick={handleParse}
          loading={loading}
          className="flex-1"
        >
          🚀 解析
        </Button>
        <Button size="large" onClick={handleCopy} disabled={!output}>
          📋 复制
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-sm text-gray-500">快速示例:</span>
        <Tag
          className="cursor-pointer"
          onClick={() =>
            handleSample(
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
            )
          }
        >
          Chrome/Edge
        </Tag>
        <Tag
          className="cursor-pointer"
          onClick={() =>
            handleSample(
              'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
            )
          }
        >
          iPhone Safari
        </Tag>
        <Tag
          className="cursor-pointer"
          onClick={() =>
            handleSample(
              'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
            )
          }
        >
          Android
        </Tag>
        <Tag
          className="cursor-pointer"
          onClick={() =>
            handleSample('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')
          }
        >
          Googlebot
        </Tag>
      </div>

      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📋 解析结果</span>
            <Button onClick={handleCopy}>📋 复制</Button>
          </div>
          {jsonFormat ? (
            <pre className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto font-mono text-sm text-gray-800 whitespace-pre-wrap">
              {JSON.stringify(output, null, 2)}
            </pre>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500">浏览器</div>
                  <div className="font-medium">
                    {output.browser} {output.browserVersion}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500">操作系统</div>
                  <div className="font-medium">
                    {output.os} {output.osVersion}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500">设备</div>
                  <div className="font-medium">{output.device}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500">设备类型</div>
                  <div className="font-medium">{output.deviceType}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Tag color={output.isMobile ? 'green' : 'default'}>
                  {output.isMobile ? '📱 移动设备' : '💻 桌面设备'}
                </Tag>
                <Tag color={output.isBot ? 'red' : 'default'}>
                  {output.isBot ? '🤖 爬虫' : '👤 用户'}
                </Tag>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 输入完整的 User-Agent 字符串进行分析</li>
          <li>• 支持识别主流浏览器：Chrome、Edge、Firefox、Safari、Opera 等</li>
          <li>• 可识别操作系统：Windows、macOS、iOS、Android、Linux 等</li>
          <li>• 支持检测移动设备、桌面设备和爬虫</li>
        </ul>
      </div>
    </div>
  );
}
