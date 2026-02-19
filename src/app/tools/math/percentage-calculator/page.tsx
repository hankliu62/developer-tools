'use client';
import { Button, InputNumber, message, Select, Space } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

type CalcType = 'whatIs' | 'isWhat' | 'change' | 'margin' | 'discount';

export default function PercentageCalculatorPage() {
  const [calcType, setCalcType] = useState<CalcType>('whatIs');
  const [valueA, setValueA] = useState<number>(25);
  const [valueB, setValueB] = useState<number>(200);
  const [result, setResult] = useState<string>('');

  const calculate = useCallback(() => {
    try {
      let res: number;
      switch (calcType) {
        case 'whatIs':
          res = (valueA / 100) * valueB;
          setResult(`${valueA}% of ${valueB} = ${Number(res.toFixed(10))}`);
          break;
        case 'isWhat':
          if (valueB === 0) {
            message.error('除数不能为 0');
            return;
          }
          res = (valueA / valueB) * 100;
          setResult(`${valueA} 是 ${valueB} 的 ${Number(res.toFixed(10))}%`);
          break;
        case 'change':
          if (valueA === 0) {
            message.error('原始值不能为 0');
            return;
          }
          res = ((valueB - valueA) / Math.abs(valueA)) * 100;
          setResult(
            `从 ${valueA} 到 ${valueB} 变化了 ${Number(res.toFixed(10))}%（${res >= 0 ? '增加' : '减少'}）`
          );
          break;
        case 'margin':
          if (valueB === 0) {
            message.error('售价不能为 0');
            return;
          }
          res = ((valueB - valueA) / valueB) * 100;
          setResult(`成本 ${valueA}，售价 ${valueB}，利润率 ${Number(res.toFixed(10))}%`);
          break;
        case 'discount':
          res = valueB * (1 - valueA / 100);
          setResult(`原价 ${valueB} 打 ${valueA}% 折 = ${Number(res.toFixed(10))}`);
          break;
      }
      message.success('计算成功');
    } catch {
      message.error('计算失败');
    }
  }, [calcType, valueA, valueB]);

  const labels: Record<CalcType, { a: string; b: string; desc: string }> = {
    whatIs: { a: '百分比 (%)', b: '总数值', desc: 'X% 的 Y 是多少？' },
    isWhat: { a: '部分值', b: '总值', desc: 'X 是 Y 的百分之几？' },
    change: { a: '原始值', b: '新值', desc: '从 X 到 Y 变化了百分之几？' },
    margin: { a: '成本', b: '售价', desc: '计算利润率' },
    discount: { a: '折扣 (%)', b: '原价', desc: '计算折后价' },
  };

  const currentLabel = labels[calcType];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 百分比计算器</h1>
        <p className="text-gray-600">多种百分比计算模式：求值、求比、变化率、利润率、折扣</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-3">⚙️ 计算类型</span>
        <Select
          value={calcType}
          onChange={(v) => {
            setCalcType(v);
            setResult('');
          }}
          className="w-full mb-4"
          size="large"
          options={[
            { value: 'whatIs', label: 'X% 的 Y 是多少' },
            { value: 'isWhat', label: 'X 是 Y 的百分之几' },
            { value: 'change', label: '百分比变化率' },
            { value: 'margin', label: '利润率计算' },
            { value: 'discount', label: '折扣计算' },
          ]}
        />
        <p className="text-sm text-gray-500 mb-4">{currentLabel.desc}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">{currentLabel.a}</label>
            <InputNumber
              value={valueA}
              onChange={(v) => setValueA(v ?? 0)}
              className="w-full"
              size="large"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">{currentLabel.b}</label>
            <InputNumber
              value={valueB}
              onChange={(v) => setValueB(v ?? 0)}
              className="w-full"
              size="large"
            />
          </div>
        </div>
      </div>

      <Space className="w-full mb-4">
        <Button type="primary" size="large" onClick={calculate}>
          🚀 计算
        </Button>
        <Button
          size="large"
          onClick={() => {
            setValueA(25);
            setValueB(200);
            setResult('');
          }}
        >
          🗑️ 重置
        </Button>
      </Space>

      {result && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <span className="font-semibold text-gray-800 block mb-4">📊 计算结果</span>
          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
            <span className="font-mono text-lg font-bold text-blue-600">{result}</span>
            <Button
              onClick={() => {
                copy(result);
                message.success('已复制');
              }}
            >
              复制
            </Button>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 「X% 的 Y」：如 25% 的 200 = 50</li>
          <li>• 「X 是 Y 的几%」：如 50 是 200 的 25%</li>
          <li>• 「百分比变化率」：如从 100 到 150 增加了 50%</li>
          <li>• 「利润率」：(售价 - 成本) / 售价 x 100%</li>
          <li>• 「折扣」：原价 x (1 - 折扣%)</li>
        </ul>
      </div>
    </div>
  );
}
