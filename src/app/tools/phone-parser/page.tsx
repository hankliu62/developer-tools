'use client';

import { Button, Input, message, Tabs } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

interface PhoneInfo {
  number: string;
  country: string;
  region: string;
  carrier: string;
  isValid: boolean;
  format: string;
}

const CHINA_MOBILE_PREFIXES = [
  { prefix: '134', carrier: '中国移动', regions: ['广东', '上海', '山东', '山西'] },
  { prefix: '135', carrier: '中国移动', regions: ['广东', '上海', '江苏', '浙江'] },
  { prefix: '136', carrier: '中国移动', regions: ['广东', '上海', '北京', '江苏'] },
  { prefix: '137', carrier: '中国移动', regions: ['广东', '福建', '湖南', '湖北'] },
  { prefix: '138', carrier: '中国移动', regions: ['广东', '上海', '北京', '江苏'] },
  { prefix: '139', carrier: '中国移动', regions: ['广东', '上海', '北京', '浙江'] },
  { prefix: '147', carrier: '中国移动', regions: ['全国'] },
  { prefix: '150', carrier: '中国移动', regions: ['广东', '上海', '江苏'] },
  { prefix: '151', carrier: '中国移动', regions: ['广东', '上海', '四川'] },
  { prefix: '152', carrier: '中国移动', regions: ['广东', '福建', '广西'] },
  { prefix: '157', carrier: '中国移动', regions: ['全国'] },
  { prefix: '158', carrier: '中国移动', regions: ['广东', '上海', '江苏'] },
  { prefix: '159', carrier: '中国移动', regions: ['广东', '上海', '江苏'] },
  { prefix: '170', carrier: '中国移动', regions: ['虚拟运营商'] },
  { prefix: '178', carrier: '中国移动', regions: ['4G号段'] },
  { prefix: '182', carrier: '中国移动', regions: ['全国'] },
  { prefix: '183', carrier: '中国移动', regions: ['全国'] },
  { prefix: '184', carrier: '中国移动', regions: ['全国'] },
  { prefix: '187', carrier: '中国移动', regions: ['上海', '江苏', '浙江', '广东'] },
  { prefix: '188', carrier: '中国移动', regions: ['上海', '江苏', '浙江', '北京'] },
  { prefix: '198', carrier: '中国移动', regions: ['5G号段'] },
];

const CHINA_UNICOM_PREFIXES = [
  { prefix: '130', carrier: '中国联通', regions: ['广东', '上海', '北京', '江苏'] },
  { prefix: '131', carrier: '中国联通', regions: ['广东', '上海', '北京', '山东'] },
  { prefix: '132', carrier: '中国联通', regions: ['广东', '上海', '北京', '四川'] },
  { prefix: '145', carrier: '中国联通', regions: ['联通GSM'] },
  { prefix: '155', carrier: '中国联通', regions: ['北方十省'] },
  { prefix: '156', carrier: '中国联通', regions: ['全国'] },
  { prefix: '166', carrier: '中国联通', regions: ['全国'] },
  { prefix: '170', carrier: '中国联通', regions: ['虚拟运营商'] },
  { prefix: '171', carrier: '中国联通', regions: ['虚拟运营商'] },
  { prefix: '175', carrier: '中国联通', regions: ['全国'] },
  { prefix: '176', carrier: '中国联通', regions: ['4G号段'] },
  { prefix: '185', carrier: '中国联通', regions: ['iPhone专用'] },
  { prefix: '186', carrier: '中国联通', regions: ['3G号段(WCDMA)'] },
  { prefix: '196', carrier: '中国联通', regions: ['5G号段'] },
];

const CHINA_TELECOM_PREFIXES = [
  { prefix: '133', carrier: '中国电信', regions: ['全国'] },
  { prefix: '149', carrier: '中国电信', regions: ['天翼'] },
  { prefix: '153', carrier: '中国电信', regions: ['上海', '四川', '陕西', '湖北'] },
  { prefix: '170', carrier: '中国电信', regions: ['虚拟运营商'] },
  { prefix: '173', carrier: '中国电信', regions: ['全国'] },
  { prefix: '177', carrier: '中国电信', regions: ['全国'] },
  { prefix: '180', carrier: '中国电信', regions: ['全国'] },
  { prefix: '181', carrier: '中国电信', regions: ['全国'] },
  { prefix: '189', carrier: '中国电信', regions: ['全国'] },
  { prefix: '191', carrier: '中国电信', regions: ['5G号段'] },
  { prefix: '193', carrier: '中国电信', regions: ['全国'] },
  { prefix: '199', carrier: '中国电信', regions: ['5G号段'] },
];

export default function PhoneParserPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<PhoneInfo | null>(null);

  const parse = useCallback(() => {
    const phone = input.replace(/\s/g, '').replace(/-/g, '');
    const phone11 = phone.replace(/^\+86/, '');

    if (!/^1[3-9]\d{9}$/.test(phone11)) {
      message.error('请输入有效的中国大陆手机号码');
      return;
    }

    const prefix = phone11.slice(0, 3);
    let carrier = '未知';
    let region = '未知';
    const country = '中国';

    const allPrefixes = [
      ...CHINA_MOBILE_PREFIXES,
      ...CHINA_UNICOM_PREFIXES,
      ...CHINA_TELECOM_PREFIXES,
    ];

    const matched = allPrefixes.find((p) => p.prefix === prefix);
    if (matched) {
      carrier = matched.carrier;
      region = matched.regions.join('、');
    }

    const format = phone11.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');

    setResult({
      number: phone11,
      country,
      region,
      carrier,
      isValid: true,
      format,
    });
    message.success('解析成功');
  }, [input]);

  const handleCopy = () => {
    if (result) {
      copy(result.carrier);
      message.success('复制成功');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  const formatType = (type: string) => {
    switch (type) {
      case '中国移动':
        return '📱';
      case '中国联通':
        return '📶';
      case '中国电信':
        return '📞';
      default:
        return '❓';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📱 电话号码解析</h1>
        <p className="text-gray-600">解析中国大陆手机号码的归属地和运营商</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">📝 输入电话号码</span>
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例如: 13812345678 或 +86 138 1234 5678"
            size="large"
            className="text-lg font-mono"
            onPressEnter={parse}
          />
          <Button type="primary" size="large" onClick={parse}>
            解析
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">支持多种格式: 13812345678, +86 138 1234 5678</p>
      </div>

      <Button block onClick={handleClear} className="mb-4">
        清空
      </Button>

      {result && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <span className="font-semibold text-gray-800 block mb-4">📋 解析结果</span>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">手机号码</div>
              <div className="text-xl font-mono font-bold text-blue-600">{result.number}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">格式化</div>
              <div className="text-xl font-mono font-bold text-green-600">{result.format}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">国家/地区</div>
              <div className="text-lg font-bold">{result.country}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">运营商</div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  {formatType(result.carrier)} {result.carrier}
                </span>
              </div>
            </div>
            <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">归属地</div>
              <div className="text-lg font-bold">{result.region}</div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleCopy}>复制运营商</Button>
          </div>
        </div>
      )}

      <Tabs
        className="mb-4"
        items={[
          {
            key: '1',
            label: '中国移动',
            children: (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-4 gap-2 text-sm">
                  {CHINA_MOBILE_PREFIXES.slice(0, 8).map((p) => (
                    <span key={p.prefix} className="bg-white p-2 rounded text-center">
                      {p.prefix}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">等号段...</p>
              </div>
            ),
          },
          {
            key: '2',
            label: '中国联通',
            children: (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-4 gap-2 text-sm">
                  {CHINA_UNICOM_PREFIXES.slice(0, 8).map((p) => (
                    <span key={p.prefix} className="bg-white p-2 rounded text-center">
                      {p.prefix}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">等号段...</p>
              </div>
            ),
          },
          {
            key: '3',
            label: '中国电信',
            children: (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-4 gap-2 text-sm">
                  {CHINA_TELECOM_PREFIXES.slice(0, 8).map((p) => (
                    <span key={p.prefix} className="bg-white p-2 rounded text-center">
                      {p.prefix}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">等号段...</p>
              </div>
            ),
          },
        ]}
      />

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 中国大陆手机号码均为11位，以1开头</li>
          <li>• 第2-3位表示运营商: 13x/14x/15x/17x/18x/19x</li>
          <li>• 此工具仅解析基础号段信息，详细信息需运营商查询</li>
          <li>• 部分虚拟运营商号段可能无法准确识别</li>
        </ul>
      </div>
    </div>
  );
}
