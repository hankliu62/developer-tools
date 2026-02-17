'use client';
import { Button, InputNumber, message, Radio, Space } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

type TempUnit = 'celsius' | 'fahrenheit' | 'kelvin';

interface ConversionResult {
  celsius: number;
  fahrenheit: number;
  kelvin: number;
}

export default function TemperatureConverterPage() {
  const [inputValue, setInputValue] = useState<number>(0);
  const [fromUnit, setFromUnit] = useState<TempUnit>('celsius');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const convert = useCallback((value: number, unit: TempUnit): ConversionResult => {
    let celsius: number;

    switch (unit) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = ((value - 32) * 5) / 9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
    }

    return {
      celsius: Math.round(celsius * 100) / 100,
      fahrenheit: Math.round(((celsius * 9) / 5 + 32) * 100) / 100,
      kelvin: Math.round((celsius + 273.15) * 100) / 100,
    };
  }, []);

  const handleConvert = useCallback(() => {
    setLoading(true);
    try {
      const conversionResult = convert(inputValue, fromUnit);
      setResult(conversionResult);
      message.success('转换成功');
    } catch (_error) {
      message.error('转换失败');
    } finally {
      setLoading(false);
    }
  }, [inputValue, fromUnit, convert]);

  const handleSwap = useCallback(() => {
    if (!result) return;
    const newValue =
      result[
        fromUnit === 'celsius' ? 'fahrenheit' : fromUnit === 'fahrenheit' ? 'celsius' : 'celsius'
      ];
    const units: TempUnit[] = ['celsius', 'fahrenheit', 'kelvin'];
    const currentIndex = units.indexOf(fromUnit);
    const nextUnit = units[(currentIndex + 1) % units.length];

    setInputValue(newValue);
    setFromUnit(nextUnit);
    const newResult = convert(newValue, nextUnit);
    setResult(newResult);
    message.success('交换成功');
  }, [result, fromUnit, convert]);

  const handleCopy = (value: number, unit: string) => {
    copy(String(value));
    message.success(`${unit} 复制成功`);
  };

  const handleClear = () => {
    setInputValue(0);
    setFromUnit('celsius');
    setResult(null);
  };

  const _getUnitLabel = (unit: TempUnit): string => {
    switch (unit) {
      case 'celsius':
        return '摄氏度 (°C)';
      case 'fahrenheit':
        return '华氏度 (°F)';
      case 'kelvin':
        return '开尔文 (K)';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🌡️ 温度转换</h1>
        <p className="text-gray-600">摄氏度、华氏度、开尔文相互转换</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">📝 输入温度</span>
        <div className="flex items-center gap-4">
          <InputNumber
            value={inputValue}
            onChange={(value) => setInputValue(value || 0)}
            className="flex-1"
            size="large"
            placeholder="输入温度值"
          />
          <Radio.Group
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            buttonStyle="solid"
            size="large"
          >
            <Radio.Button value="celsius">°C</Radio.Button>
            <Radio.Button value="fahrenheit">°F</Radio.Button>
            <Radio.Button value="kelvin">K</Radio.Button>
          </Radio.Group>
        </div>
      </div>

      <Space className="w-full mb-4">
        <Button
          type="primary"
          size="large"
          onClick={handleConvert}
          loading={loading}
          className="flex-1"
        >
          🚀 开始转换
        </Button>
        <Button size="large" onClick={handleSwap} disabled={!result}>
          🔄 交换
        </Button>
        <Button size="large" onClick={handleClear}>
          🗑️ 重置
        </Button>
      </Space>

      {result && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <span className="font-semibold text-gray-800 block mb-4">📋 转换结果</span>

          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">摄氏度</div>
                <div className="font-mono text-xl text-blue-600">{result.celsius} °C</div>
              </div>
              <Button onClick={() => handleCopy(result.celsius, '摄氏度')}>📋 复制</Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">华氏度</div>
                <div className="font-mono text-xl text-red-600">{result.fahrenheit} °F</div>
              </div>
              <Button onClick={() => handleCopy(result.fahrenheit, '华氏度')}>📋 复制</Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">开尔文</div>
                <div className="font-mono text-xl text-green-600">{result.kelvin} K</div>
              </div>
              <Button onClick={() => handleCopy(result.kelvin, '开尔文')}>📋 复制</Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5 mb-4">
        <h3 className="font-semibold text-blue-900 mb-3">💡 温度说明</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>
            • <strong>摄氏度 (°C)</strong>：水的冰点为 0°C，沸点为 100°C
          </li>
          <li>
            • <strong>华氏度 (°F)</strong>：水的冰点为 32°F，沸点为 212°F
          </li>
          <li>
            • <strong>开尔文 (K)</strong>：绝对温标，0K 为绝对零度 (-273.15°C)
          </li>
        </ul>
      </div>

      <div className="bg-green-50 rounded-xl p-5">
        <h3 className="font-semibold text-green-900 mb-3">🔢 常用参考</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-green-800">
          <div>0°C = 32°F = 273.15K (冰点)</div>
          <div>20°C = 68°F = 293.15K (室温)</div>
          <div>37°C = 98.6°F = 310.15K (体温)</div>
          <div>100°C = 212°F = 373.15K (沸点)</div>
          <div>-40°C = -40°F = 233.15K (等值)</div>
        </div>
      </div>
    </div>
  );
}
