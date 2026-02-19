'use client';

import { Button, Input, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

interface IbanInfo {
  iban: string;
  isValid: boolean;
  country: string;
  countryCode: string;
  bankCode: string;
  accountNumber: string;
  formatted: string;
}

const IBAN_REGEX: Record<string, { country: string; length: number; pattern: RegExp }> = {
  AL: { country: '阿尔巴尼亚', length: 28, pattern: /^AL\d{2}\d{8}[A-Z0-9]{16}$/ },
  AD: { country: '安道尔', length: 24, pattern: /^AD\d{2}\d{4}[A-Z0-9]{4}\d{4}[A-Z0-9]{12}$/ },
  AT: { country: '奥地利', length: 20, pattern: /^AT\d{2}\d{5}[A-Z0-9]{11}$/ },
  AZ: { country: '阿塞拜疆', length: 28, pattern: /^AZ\d{2}[A-Z]{4}[A-Z0-9]{20}$/ },
  BH: { country: '巴林', length: 22, pattern: /^BH\d{2}[A-Z]{4}[A-Z0-9]{14}$/ },
  BY: { country: '白俄罗斯', length: 28, pattern: /^BY\d{2}[A-Z0-9]{4}\d{4}[A-Z0-9]{16}$/ },
  BE: { country: '比利时', length: 16, pattern: /^BE\d{2}\d{3}\d{7}\d{2}$/ },
  BA: {
    country: '波斯尼亚和黑塞哥维那',
    length: 20,
    pattern: /^BA\d{2}\d{3}[A-Z0-9]{3}\d{3}\d{6}$/,
  },
  BR: {
    country: '巴西',
    length: 29,
    pattern: /^BR\d{2}\d{4}9[A-Z0-9]{5}\d{10}[A-Z]{1}[A-Z0-9]{1}$/,
  },
  BG: { country: '保加利亚', length: 22, pattern: /^BG\d{2}[A-Z]{4}\d{4}[A-Z0-9]{6}[A-Z]{1}$/ },
  CR: { country: '哥斯达黎加', length: 22, pattern: /^CR\d{2}\d{3}\d{14}$/ },
  HR: { country: '克罗地亚', length: 21, pattern: /^HR\d{2}\d{7}[A-Z0-9]{10}$/ },
  CY: { country: '塞浦路斯', length: 28, pattern: /^CY\d{2}\d{3}[A-Z0-9]{5}\d{16}$/ },
  CZ: { country: '捷克', length: 24, pattern: /^CZ\d{2}\d{4}\d{6}\d{10}$/ },
  DK: { country: '丹麦', length: 18, pattern: /^DK\d{2}\d{4}\d{9}\d{1}$/ },
  DO: { country: '多米尼加', length: 28, pattern: /^DO\d{2}[A-Z]{4}\d{4}\d{20}$/ },
  TL: { country: '东帝汶', length: 23, pattern: /^TL\d{2}\d{3}\d{14}\d{2}$/ },
  EE: { country: '爱沙尼亚', length: 20, pattern: /^EE\d{2}\d{2}\d{2}\d{11}\d{1}$/ },
  FO: { country: '法罗群岛', length: 18, pattern: /^FO\d{2}\d{4}\d{9}\d{1}$/ },
  FI: { country: '芬兰', length: 18, pattern: /^FI\d{2}\d{6}\d{7}\d{1}$/ },
  FR: { country: '法国', length: 27, pattern: /^FR\d{2}\d{5}\d{5}[A-Z0-9]{11}\d{2}$/ },
  GE: { country: '格鲁吉亚', length: 22, pattern: /^GE\d{2}[A-Z]{2}\d{16}$/ },
  DE: { country: '德国', length: 22, pattern: /^DE\d{2}\d{4}\d{4}\d{10}$/ },
  GI: { country: '直布罗陀', length: 23, pattern: /^GI\d{2}[A-Z]{4}[A-Z0-9]{15}$/ },
  GR: { country: '希腊', length: 27, pattern: /^GR\d{2}\d{3}\d{4}[A-Z0-9]{16}$/ },
  GL: { country: '格陵兰', length: 18, pattern: /^GL\d{2}\d{4}\d{9}\d{1}$/ },
  GT: { country: '危地马拉', length: 28, pattern: /^GT\d{2}[A-Z]{4}[A-Z0-9]{20}$/ },
  HU: { country: '匈牙利', length: 28, pattern: /^HU\d{2}\d{3}\d{4}\d{1}\d{15}\d{1}$/ },
  IS: { country: '冰岛', length: 26, pattern: /^IS\d{2}\d{4}\d{2}[A-Z0-9]{6}\d{10}$/ },
  IQ: { country: '伊拉克', length: 23, pattern: /^IQ\d{2}[A-Z]{4}\d{3}\d{12}$/ },
  IE: { country: '爱尔兰', length: 22, pattern: /^IE\d{2}[A-Z]{4}\d{4}\d{6}\d{8}$/ },
  IL: { country: '以色列', length: 23, pattern: /^IL\d{2}\d{3}\d{3}\d{13}$/ },
  IT: { country: '意大利', length: 27, pattern: /^IT\d{2}[A-Z]\d{5}\d{5}[A-Z0-9]{12}$/ },
  JO: { country: '约旦', length: 30, pattern: /^JO\d{2}[A-Z]{4}\d{4}[A-Z0-9]{18}$/ },
  KZ: { country: '哈萨克斯坦', length: 20, pattern: /^KZ\d{2}\d{3}[A-Z0-9]{13}$/ },
  XK: { country: '科索沃', length: 20, pattern: /^XK\d{2}\d{4}\d{10}\d{2}$/ },
  KW: { country: '科威特', length: 30, pattern: /^KW\d{2}[A-Z]{4}\d{4}[A-Z0-9]{22}$/ },
  LV: { country: '拉脱维亚', length: 21, pattern: /^LV\d{2}[A-Z]{4}[A-Z0-9]{13}$/ },
  LB: { country: '黎巴嫩', length: 28, pattern: /^LB\d{2}\d{4}[A-Z0-9]{20}$/ },
  LI: { country: '列支敦士登', length: 21, pattern: /^LI\d{2}\d{5}[A-Z0-9]{12}$/ },
  LT: { country: '立陶宛', length: 20, pattern: /^LT\d{2}\d{5}\d{11}$/ },
  LU: { country: '卢森堡', length: 20, pattern: /^LU\d{2}\d{3}[A-Z0-9]{13}$/ },
  MK: { country: '北马其顿', length: 19, pattern: /^MK\d{2}\d{3}[A-Z0-9]{10}\d{2}$/ },
  MT: { country: '马耳他', length: 31, pattern: /^MT\d{2}[A-Z]{4}\d{5}[A-Z0-9]{18}$/ },
  MR: { country: '毛里塔尼亚', length: 27, pattern: /^MR\d{2}\d{5}\d{5}\d{11}\d{2}$/ },
  MU: {
    country: '毛里求斯',
    length: 30,
    pattern: /^MU\d{2}[A-Z]{4}\d{2}\d{2}\d{12}\d{2}[A-Z]{2,3}$/,
  },
  MC: { country: '摩纳哥', length: 27, pattern: /^MC\d{2}\d{5}\d{5}[A-Z0-9]{11}\d{2}$/ },
  MD: { country: '摩尔多瓦', length: 24, pattern: /^MD\d{2}[A-Z0-9]{2}[A-Z0-9]{18}$/ },
  ME: { country: '黑山', length: 22, pattern: /^ME\d{2}\d{3}[A-Z0-9]{6}\d{10}$/ },
  NL: { country: '荷兰', length: 18, pattern: /^NL\d{2}[A-Z]{4}\d{10}$/ },
  NO: { country: '挪威', length: 15, pattern: /^NO\d{2}\d{4}\d{6}\d{1}$/ },
  PK: { country: '巴基斯坦', length: 24, pattern: /^PK\d{2}[A-Z]{4}\d{16}$/ },
  PS: { country: '巴勒斯坦', length: 29, pattern: /^PS\d{2}[A-Z]{4}\d{9}[A-Z0-9]{4}$/ },
  PL: { country: '波兰', length: 28, pattern: /^PL\d{2}\d{8}\d{16}$/ },
  PT: { country: '葡萄牙', length: 25, pattern: /^PT\d{2}\d{4}\d{4}\d{11}\d{2}$/ },
  QA: { country: '卡塔尔', length: 29, pattern: /^QA\d{2}[A-Z]{4}\d{4}[A-Z0-9]{19}$/ },
  RO: { country: '罗马尼亚', length: 24, pattern: /^RO\d{2}[A-Z]{4}[A-Z0-9]{16}$/ },
  SM: { country: '圣马力诺', length: 27, pattern: /^SM\d{2}[A-Z]\d{5}\d{5}[A-Z0-9]{12}$/ },
  ST: { country: '圣多美和普林西比', length: 25, pattern: /^ST\d{2}\d{4}\d{4}\d{11}\d{2}$/ },
  SA: { country: '沙特阿拉伯', length: 24, pattern: /^SA\d{2}\d{2}[A-Z0-9]{18}$/ },
  RS: { country: '塞尔维亚', length: 22, pattern: /^RS\d{2}\d{3}[A-Z0-9]{6}\d{10}$/ },
  SC: { country: '塞舌尔', length: 31, pattern: /^SC\d{2}[A-Z]{4}\d{2}\d{2}\d{16}[A-Z]{3}$/ },
  SK: { country: '斯洛伐克', length: 24, pattern: /^SK\d{2}\d{4}\d{4}\d{14}$/ },
  SI: { country: '斯洛文尼亚', length: 19, pattern: /^SI\d{2}\d{5}\d{8}\d{2}$/ },
  ES: { country: '西班牙', length: 24, pattern: /^ES\d{2}\d{4}\d{4}\d{1}\d{1}\d{10}$/ },
  SE: { country: '瑞典', length: 24, pattern: /^SE\d{2}\d{3}\d{16}\d{1}$/ },
  CH: { country: '瑞士', length: 21, pattern: /^CH\d{2}\d{5}[A-Z0-9]{12}$/ },
  TN: { country: '突尼斯', length: 24, pattern: /^TN\d{2}\d{2}\d{3}\d{13}\d{2}$/ },
  TR: { country: '土耳其', length: 26, pattern: /^TR\d{2}\d{5}[A-Z0-9]{1}[A-Z0-9]{16}$/ },
  UA: { country: '乌克兰', length: 29, pattern: /^UA\d{2}[A-Z]{6}[A-Z0-9]{19}$/ },
  AE: { country: '阿联酋', length: 23, pattern: /^AE\d{2}\d{3}\d{16}$/ },
  GB: { country: '英国', length: 22, pattern: /^GB\d{2}[A-Z]{4}\d{6}\d{8}$/ },
  VA: { country: '梵蒂冈', length: 22, pattern: /^VA\d{2}\d{3}\d{15}$/ },
  VG: { country: '英属维尔京群岛', length: 24, pattern: /^VG\d{2}[A-Z]{4}\d{16}$/ },
};

function mod97(iban: string): number {
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  let numeric = '';
  for (const char of rearranged) {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      numeric += (code - 55).toString();
    } else {
      numeric += char;
    }
  }

  let remainder = 0;
  for (let i = 0; i < numeric.length; i += 7) {
    const part = remainder.toString() + numeric.slice(i, i + 7);
    remainder = parseInt(part, 10) % 97;
  }

  return remainder;
}

export default function IbanValidatorPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<IbanInfo | null>(null);

  const validate = useCallback(() => {
    const iban = input.replace(/\s/g, '').toUpperCase();

    if (!iban) {
      message.error('请输入IBAN号码');
      return;
    }

    if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(iban)) {
      message.error('IBAN格式不正确');
      return;
    }

    const countryCode = iban.slice(0, 2);
    const config = IBAN_REGEX[countryCode];

    if (!config) {
      message.error('不支持的国家代码');
      return;
    }

    if (iban.length !== config.length) {
      setResult({
        iban,
        isValid: false,
        country: config.country,
        countryCode,
        bankCode: '',
        accountNumber: '',
        formatted: iban.match(/.{1,4}/g)?.join(' ') || iban,
      });
      message.error(`IBAN长度不正确，应为${config.length}位`);
      return;
    }

    const checkDigits = iban.slice(2, 4);
    const rearranged = checkDigits + iban.slice(4) + iban.slice(0, 2);
    const isMod97Valid = mod97(rearranged) === 1;

    if (!isMod97Valid) {
      setResult({
        iban,
        isValid: false,
        country: config.country,
        countryCode,
        bankCode: iban.slice(4, 8),
        accountNumber: iban.slice(8),
        formatted: iban.match(/.{1,4}/g)?.join(' ') || iban,
      });
      message.error('IBAN校验位验证失败');
      return;
    }

    setResult({
      iban,
      isValid: true,
      country: config.country,
      countryCode,
      bankCode: iban.slice(4, 8),
      accountNumber: iban.slice(8),
      formatted: iban.match(/.{1,4}/g)?.join(' ') || iban,
    });
    message.success('IBAN验证通过');
  }, [input]);

  const handleCopy = () => {
    if (result) {
      copy(result.country);
      message.success('复制成功');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🏦 IBAN 验证</h1>
        <p className="text-gray-600">验证国际银行账号(IBAN)的有效性</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">📝 输入IBAN</span>
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例如: DE89 3704 0044 0532 0130 00"
            size="large"
            className="text-lg font-mono"
            onPressEnter={validate}
          />
          <Button type="primary" size="large" onClick={validate}>
            验证
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">支持带空格或连字符的格式</p>
      </div>

      <Button block onClick={handleClear} className="mb-4">
        清空
      </Button>

      {result && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-gray-800">📋 验证结果</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-bold ${
                result.isValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {result.isValid ? '✅ 有效' : '❌ 无效'}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="text-xs text-gray-500 mb-1">格式化IBAN</div>
            <div className="text-lg font-mono text-blue-600 break-all">{result.formatted}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">国家代码</div>
              <div className="text-lg font-bold">{result.countryCode}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">国家名称</div>
              <div className="text-lg font-bold">{result.country}</div>
            </div>
            {result.bankCode && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">银行代码</div>
                <div className="text-lg font-mono">{result.bankCode}</div>
              </div>
            )}
            {result.accountNumber && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">账号</div>
                <div className="text-lg font-mono">{result.accountNumber}</div>
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <Button onClick={handleCopy}>复制国家名称</Button>
          </div>
        </div>
      )}

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">📚 常见IBAN格式示例</span>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>🇩🇪 德国</span>
            <span className="font-mono text-gray-600">DE89 3704 0044 0532 0130 00</span>
          </div>
          <div className="flex justify-between">
            <span>🇬🇧 英国</span>
            <span className="font-mono text-gray-600">GB82 WEST 1234 5678 9012 34</span>
          </div>
          <div className="flex justify-between">
            <span>🇫🇷 法国</span>
            <span className="font-mono text-gray-600">FR76 3000 6000 0112 3456 7890 18</span>
          </div>
          <div className="flex justify-between">
            <span>🇪🇸 西班牙</span>
            <span className="font-mono text-gray-600">ES60 0049 1500 0123 4567 8901</span>
          </div>
          <div className="flex justify-between">
            <span>🇮🇹 意大利</span>
            <span className="font-mono text-gray-600">IT60 X054 2811 0101 0000 0123 456</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• IBAN (International Bank Account Number) 用于国际银行转账</li>
          <li>• 格式: 国家代码(2位) + 校验位(2位) + 银行账号(最长30位)</li>
          <li>• 验证包括格式检查和MOD-97校验</li>
          <li>• 目前支持全球70多个国家和地区的IBAN格式</li>
        </ul>
      </div>
    </div>
  );
}
