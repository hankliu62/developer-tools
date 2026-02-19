'use client';
import { Button, Input, message, Select, Space, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

type ObfuscateMethod = 'unicode' | 'zeroWidth' | 'homoglyph' | 'reverse' | 'rot13' | 'hex';

const HOMOGLYPHS: Record<string, string> = {
  a: '\u0430',
  b: '\u0412',
  c: '\u0441',
  d: '\u0501',
  e: '\u0435',
  h: '\u04BB',
  i: '\u0456',
  j: '\u0458',
  k: '\u043A',
  l: '\u04CF',
  m: '\u043C',
  n: '\u0578',
  o: '\u043E',
  p: '\u0440',
  q: '\u0566',
  r: '\u0433',
  s: '\u0455',
  t: '\u0442',
  u: '\u057D',
  v: '\u0474',
  w: '\u0561',
  x: '\u0445',
  y: '\u0443',
  z: '\u0502',
  A: '\u0410',
  B: '\u0412',
  C: '\u0421',
  D: '\u0110',
  E: '\u0415',
  H: '\u041D',
  I: '\u0406',
  J: '\u0408',
  K: '\u041A',
  L: '\u04C0',
  M: '\u041C',
  N: '\u0578',
  O: '\u041E',
  P: '\u0420',
  Q: '\u051A',
  R: '\u042F',
  S: '\u0405',
  T: '\u0422',
  U: '\u054D',
  V: '\u0474',
  W: '\u051C',
  X: '\u0425',
  Y: '\u04AE',
  Z: '\u0536',
};

export default function StringObfuscatorPage() {
  const [input, setInput] = useState('');
  const [method, setMethod] = useState<ObfuscateMethod>('unicode');
  const [output, setOutput] = useState('');
  const [insertZeroWidth, setInsertZeroWidth] = useState(true);

  const obfuscate = useCallback(() => {
    try {
      if (!input.trim()) {
        message.error('请输入文本');
        return;
      }

      let result = '';
      switch (method) {
        case 'unicode':
          result = input
            .split('')
            .map((ch) => `\\u${ch.charCodeAt(0).toString(16).padStart(4, '0')}`)
            .join('');
          break;

        case 'zeroWidth':
          result = input
            .split('')
            .map((ch) => {
              const binary = ch.charCodeAt(0).toString(2);
              return `${binary
                .split('')
                .map((b) => (b === '0' ? '\u200B' : '\u200C'))
                .join('')}\u200D`;
            })
            .join('');
          break;

        case 'homoglyph':
          result = input
            .split('')
            .map((ch) => {
              if (HOMOGLYPHS[ch]) return HOMOGLYPHS[ch];
              return ch;
            })
            .join('');
          if (insertZeroWidth) {
            result = result.split('').join('\u200B');
          }
          break;

        case 'reverse':
          result = input.split('').reverse().join('');
          break;

        case 'rot13':
          result = input.replace(/[a-zA-Z]/g, (ch) => {
            const base = ch <= 'Z' ? 65 : 97;
            return String.fromCharCode(((ch.charCodeAt(0) - base + 13) % 26) + base);
          });
          break;

        case 'hex':
          result = input
            .split('')
            .map((ch) => `0x${ch.charCodeAt(0).toString(16).padStart(2, '0')}`)
            .join(' ');
          break;
      }

      setOutput(result);
      message.success('混淆成功');
    } catch {
      message.error('混淆失败');
    }
  }, [input, method, insertZeroWidth]);

  const deobfuscate = useCallback(() => {
    try {
      if (!output.trim()) {
        message.error('请先混淆文本');
        return;
      }

      let result = '';
      switch (method) {
        case 'unicode':
          result = output.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
            String.fromCharCode(parseInt(hex, 16))
          );
          break;

        case 'zeroWidth': {
          const chars = output.split('\u200D').filter(Boolean);
          result = chars
            .map((encoded) => {
              const binary = encoded
                .split('')
                .map((ch) => (ch === '\u200B' ? '0' : '1'))
                .join('');
              return String.fromCharCode(parseInt(binary, 2));
            })
            .join('');
          break;
        }

        case 'reverse':
          result = output.split('').reverse().join('');
          break;

        case 'rot13':
          result = output.replace(/[a-zA-Z]/g, (ch) => {
            const base = ch <= 'Z' ? 65 : 97;
            return String.fromCharCode(((ch.charCodeAt(0) - base + 13) % 26) + base);
          });
          break;

        case 'hex':
          result = output
            .split(/\s+/)
            .map((h) => String.fromCharCode(parseInt(h, 16)))
            .join('');
          break;

        default:
          message.warning('此混淆方法不支持直接还原');
          return;
      }

      setInput(result);
      message.success('还原成功');
    } catch {
      message.error('还原失败');
    }
  }, [output, method]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔒 字符串混淆器</h1>
        <p className="text-gray-600">多种方式混淆字符串：Unicode 转义、零宽字符、同形字替换等</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-3">⚙️ 混淆方式</span>
        <Select
          value={method}
          onChange={(v) => {
            setMethod(v);
            setOutput('');
          }}
          className="w-full mb-4"
          size="large"
          options={[
            { value: 'unicode', label: 'Unicode 转义 (\\uXXXX)' },
            { value: 'zeroWidth', label: '零宽字符编码' },
            { value: 'homoglyph', label: '同形字替换 (Homoglyph)' },
            { value: 'reverse', label: '字符反转' },
            { value: 'rot13', label: 'ROT13 替换' },
            { value: 'hex', label: '十六进制编码' },
          ]}
        />

        {method === 'homoglyph' && (
          <div className="mb-4">
            <Switch checked={insertZeroWidth} onChange={setInsertZeroWidth} />
            <span className="ml-2 text-gray-600">插入零宽字符增加混淆度</span>
          </div>
        )}

        <span className="font-semibold text-gray-800 block mb-2">📝 输入文本</span>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入要混淆的文本..."
          rows={4}
          className="font-mono mb-4"
        />

        <Space className="w-full mb-4">
          <Button type="primary" size="large" onClick={obfuscate}>
            🔒 混淆
          </Button>
          <Button size="large" onClick={deobfuscate}>
            🔓 还原
          </Button>
          <Button
            size="large"
            onClick={() => {
              setInput('');
              setOutput('');
            }}
          >
            🗑️ 清空
          </Button>
        </Space>

        <span className="font-semibold text-gray-800 block mb-2">📤 混淆结果</span>
        <TextArea
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          rows={4}
          className="font-mono"
          readOnly={method === 'zeroWidth'}
        />
        <div className="mt-2 text-right">
          <Button
            onClick={() => {
              copy(output);
              message.success('已复制');
            }}
            disabled={!output}
          >
            📋 复制结果
          </Button>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Unicode 转义：将字符转为 \uXXXX 格式，可用于代码中</li>
          <li>• 零宽字符：将文本编码为不可见字符，外表看起来为空</li>
          <li>• 同形字替换：用视觉相似的字符替换，肉眼难以区分</li>
          <li>• ROT13：字母移位 13 位，再次应用即可还原</li>
          <li>• 十六进制：将每个字符转为 0xXX 格式</li>
          <li>• 部分方法支持双向转换（混淆和还原）</li>
        </ul>
      </div>
    </div>
  );
}
