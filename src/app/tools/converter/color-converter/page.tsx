'use client';
import { Button, ColorPicker, Input, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';
import { convertColor } from '@/tools/converter';

export default function ColorConverterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [targetFormat, setTargetFormat] = useState<'hex' | 'rgb' | 'hsl'>('rgb');
  const [loading, setLoading] = useState(false);
  const [colorPickerValue, setColorPickerValue] = useState('#1677ff');

  const handleProcess = useCallback(() => {
    try {
      if (!input && !colorPickerValue) {
        message.error('请输入颜色或选择颜色');
        return;
      }
      setLoading(true);
      const color = input || colorPickerValue;
      const result = convertColor(color, targetFormat);
      setOutput(result);
      message.success('转换成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '转换失败');
    } finally {
      setLoading(false);
    }
  }, [input, colorPickerValue, targetFormat]);

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

  const handleColorPickerChange = (color: string) => {
    setColorPickerValue(color);
    try {
      const result = convertColor(color, targetFormat);
      setOutput(result);
      message.success('实时转换成功');
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎨 颜色转换</h1>
        <p className="text-gray-600">在 HEX、RGB、HSL 格式之间转换</p>
      </div>

      {/* Color Picker */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">🎯 选择颜色</span>
        <div className="flex items-center gap-6">
          <ColorPicker
            value={colorPickerValue}
            onChange={(_, hex) => handleColorPickerChange(hex)}
            size="large"
          />
          <div className="flex-1">
            <div
              className="h-16 rounded-lg border border-gray-200"
              style={{ backgroundColor: colorPickerValue }}
            />
          </div>
          <Input
            value={colorPickerValue}
            onChange={(e) => setColorPickerValue(e.target.value)}
            className="font-mono w-32"
            placeholder="#FFFFFF"
          />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-800">📝 输入颜色</span>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入颜色值，如 #FF0000, rgb(255,0,0), hsl(0,100%,50%)"
          className="font-mono text-lg"
          size="large"
        />
        <p className="text-xs text-gray-500 mt-2">支持 HEX、RGB、HSL 格式</p>
      </div>

      {/* Target Format */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 目标格式</span>
        <div className="flex gap-4">
          {(['hex', 'rgb', 'hsl'] as const).map((format) => (
            <Button
              key={format}
              type={targetFormat === format ? 'primary' : 'default'}
              onClick={() => setTargetFormat(format)}
              className="flex-1 h-12 text-base"
            >
              {format.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* Action */}
      <Button
        type="primary"
        size="large"
        block
        onClick={handleProcess}
        loading={loading}
        className="h-12 text-base font-medium mb-4"
      >
        🚀 开始转换
      </Button>

      {/* Output */}
      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📋 转换结果</span>
            <Button onClick={handleCopy}>📋 复制</Button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <pre className="font-mono text-lg text-gray-800">{output}</pre>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 格式说明</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>
            • <strong>HEX</strong>：十六进制颜色，如 #FF0000
          </li>
          <li>
            • <strong>RGB</strong>：红绿蓝，如 rgb(255, 0, 0)
          </li>
          <li>
            • <strong>HSL</strong>：色相饱和度亮度，如 hsl(0, 100%, 50%)
          </li>
        </ul>
      </div>
    </div>
  );
}
