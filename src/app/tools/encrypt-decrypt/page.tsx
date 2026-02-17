'use client';
import { Button, Input, message, Select, Slider } from 'antd';
import copy from 'copy-to-clipboard';
import CryptoJS from 'crypto-js';
import { useState } from 'react';

const { TextArea } = Input;

const ALGORITHMS = [
  { value: 'AES', label: 'AES' },
  { value: 'DES', label: 'DES' },
  { value: 'RC4', label: 'RC4' },
];

const MODES = [
  { value: 'ECB', label: 'ECB (电码本)' },
  { value: 'CBC', label: 'CBC (密码块链接)' },
  { value: 'CFB', label: 'CFB (密码反馈)' },
  { value: 'OFB', label: 'OFB (输出反馈)' },
];

const KEY_LENGTHS: Record<string, number[]> = {
  AES: [128, 192, 256],
  DES: [64],
  RC4: [40, 128, 256],
};

function encryptText(
  text: string,
  key: string,
  algorithm: string,
  mode: string,
  keyLength: number
): string {
  const keyHex = CryptoJS.enc.Utf8.parse(key.padEnd(keyLength / 8, '0').slice(0, keyLength / 8));

  if (mode === 'ECB') {
    return (CryptoJS as any)[algorithm].encrypt(text, keyHex).toString();
  }

  const iv = CryptoJS.lib.WordArray.random(8);
  const encrypted = (CryptoJS as any)[algorithm].encrypt(text, keyHex, {
    mode: (CryptoJS as any)[mode],
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
  });

  return `${iv.toString()}:${encrypted.toString()}`;
}

function decryptText(
  encrypted: string,
  key: string,
  algorithm: string,
  mode: string,
  keyLength: number
): string {
  const keyHex = CryptoJS.enc.Utf8.parse(key.padEnd(keyLength / 8, '0').slice(0, keyLength / 8));

  if (mode === 'ECB') {
    const bytes = (CryptoJS as any)[algorithm].decrypt(encrypted, keyHex);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  const parts = encrypted.split(':');
  if (parts.length !== 2) {
    throw new Error('无效的密文格式');
  }

  const iv = CryptoJS.enc.Hex.parse(parts[0]);
  const cipherText = parts[1];

  const decrypted = (CryptoJS as any)[algorithm].decrypt(cipherText, keyHex, {
    mode: (CryptoJS as any)[mode],
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

export default function EncryptDecryptPage() {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [algorithm, setAlgorithm] = useState('AES');
  const [mode, setMode] = useState('CBC');
  const [keyLength, setKeyLength] = useState(256);
  const [output, setOutput] = useState('');
  const [processMode, setProcessMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const handleProcess = () => {
    try {
      if (!input || !key) {
        message.error('请输入内容和密钥');
        return;
      }
      const result =
        processMode === 'encrypt'
          ? encryptText(input, key, algorithm, mode, keyLength)
          : decryptText(input, key, algorithm, mode, keyLength);
      setOutput(result);
      message.success(processMode === 'encrypt' ? '加密成功' : '解密成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '处理失败');
    }
  };

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">文本加密解密</h1>
        <p className="text-gray-600 mt-1">对称加密解密文本</p>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          type={processMode === 'encrypt' ? 'primary' : 'default'}
          onClick={() => setProcessMode('encrypt')}
        >
          加密
        </Button>
        <Button
          type={processMode === 'decrypt' ? 'primary' : 'default'}
          onClick={() => setProcessMode('decrypt')}
        >
          解密
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="algorithm-select" className="font-medium text-gray-700 block mb-2">
              加密算法
            </label>
            <Select
              id="algorithm-select"
              value={algorithm}
              onChange={(value) => {
                setAlgorithm(value);
                setKeyLength(KEY_LENGTHS[value][0]);
              }}
              options={ALGORITHMS}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="mode-select" className="font-medium text-gray-700 block mb-2">
              加密模式
            </label>
            <Select
              id="mode-select"
              value={mode}
              onChange={setMode}
              options={MODES}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="key-length-slider" className="font-medium text-gray-700 block mb-2">
              密钥长度: {keyLength} 位
            </label>
            <Slider
              id="key-length-slider"
              min={KEY_LENGTHS[algorithm][0]}
              max={KEY_LENGTHS[algorithm][KEY_LENGTHS[algorithm].length - 1]}
              value={keyLength}
              onChange={setKeyLength}
              marks={KEY_LENGTHS[algorithm].reduce((acc, len) => ({ ...acc, [len]: `${len}` }), {})}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="key-input" className="font-medium text-gray-700 block mb-2">
            密钥
          </label>
          <Input.Password
            id="key-input"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="请输入密钥..."
          />
        </div>

        <div className="mb-4">
          <label htmlFor="input-textarea" className="font-medium text-gray-700 block mb-2">
            {processMode === 'encrypt' ? '明文' : '密文'}
          </label>
          <TextArea
            id="input-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={processMode === 'encrypt' ? '请输入明文...' : '请输入密文...'}
            className="font-mono text-sm"
            rows={6}
          />
        </div>

        <Button type="primary" onClick={handleProcess}>
          {processMode === 'encrypt' ? '加密' : '解密'}
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="output-textarea" className="font-medium text-gray-700">
            {processMode === 'encrypt' ? '密文' : '明文'}
          </label>
          <Button onClick={handleCopy} disabled={!output} size="small">
            复制
          </Button>
        </div>
        <TextArea
          id="output-textarea"
          value={output}
          readOnly
          className="font-mono text-sm bg-gray-50"
          rows={6}
          placeholder="输出结果..."
        />
      </div>

      <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
        <h3 className="font-medium text-blue-900 mb-2">使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• AES 支持 128/192/256 位密钥，DES 仅支持 64 位</li>
          <li>• ECB 模式不需要 IV，但安全性较低；CBC/CFB/OFB 需要 IV</li>
          <li>• 加密后的密文格式为: IV:密文 (CBC/CFB/OFB 模式)</li>
          <li>• 解密时需使用与加密相同的算法、模式和密钥长度</li>
        </ul>
      </div>
    </div>
  );
}
