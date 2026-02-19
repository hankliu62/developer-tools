'use client';
import { Button, Input, message, Select, Space, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

const safeEval = (expr: string, useRadians: boolean): number => {
  const _sanitized = expr.replace(/[^0-9+\-*/().,%^√πe\s]/gi, (match) => {
    const _allowed = [
      'sin',
      'cos',
      'tan',
      'asin',
      'acos',
      'atan',
      'log',
      'ln',
      'sqrt',
      'abs',
      'ceil',
      'floor',
      'round',
      'pow',
      'min',
      'max',
      'PI',
      'E',
      'pi',
    ];
    return match;
  });

  let processed = expr
    .replace(/π/g, `(${Math.PI})`)
    .replace(/\bpi\b/gi, `(${Math.PI})`)
    .replace(/\be\b/g, `(${Math.E})`)
    .replace(/√(\d+)/g, 'Math.sqrt($1)')
    .replace(/(\d+)\^(\d+)/g, 'Math.pow($1,$2)')
    .replace(/\bsqrt\s*\(/g, 'Math.sqrt(')
    .replace(/\babs\s*\(/g, 'Math.abs(')
    .replace(/\bceil\s*\(/g, 'Math.ceil(')
    .replace(/\bfloor\s*\(/g, 'Math.floor(')
    .replace(/\bround\s*\(/g, 'Math.round(')
    .replace(/\bpow\s*\(/g, 'Math.pow(')
    .replace(/\bmin\s*\(/g, 'Math.min(')
    .replace(/\bmax\s*\(/g, 'Math.max(')
    .replace(/\bln\s*\(/g, 'Math.log(')
    .replace(/\blog\s*\(/g, 'Math.log10(')
    .replace(/(\d+)%/g, '($1/100)');

  if (useRadians) {
    processed = processed
      .replace(/\bsin\s*\(/g, 'Math.sin(')
      .replace(/\bcos\s*\(/g, 'Math.cos(')
      .replace(/\btan\s*\(/g, 'Math.tan(')
      .replace(/\basin\s*\(/g, 'Math.asin(')
      .replace(/\bacos\s*\(/g, 'Math.acos(')
      .replace(/\batan\s*\(/g, 'Math.atan(');
  } else {
    processed = processed
      .replace(/\bsin\s*\(/g, `Math.sin((Math.PI/180)*(`)
      .replace(/\bcos\s*\(/g, `Math.cos((Math.PI/180)*(`)
      .replace(/\btan\s*\(/g, `Math.tan((Math.PI/180)*(`)
      .replace(/\basin\s*\(/g, `(180/Math.PI)*Math.asin(`)
      .replace(/\bacos\s*\(/g, `(180/Math.PI)*Math.acos(`)
      .replace(/\batan\s*\(/g, `(180/Math.PI)*Math.atan(`);
    const sinCount = (processed.match(/Math\.PI\/180/g) || []).length;
    for (let i = 0; i < sinCount; i++) {
      processed += ')';
    }
  }

  if (/[a-zA-Z_$]/.test(processed.replace(/Math\.\w+/g, '').replace(/\d+e[+-]?\d+/gi, ''))) {
    throw new Error('表达式包含不允许的字符');
  }

  const fn = new Function(`"use strict"; return (${processed})`);
  const result = fn();
  if (typeof result !== 'number' || !Number.isFinite(result)) {
    throw new Error('计算结果无效');
  }
  return result;
};

export default function MathEvaluatorPage() {
  const [expression, setExpression] = useState('');
  const [precision, setPrecision] = useState(10);
  const [useRadians, setUseRadians] = useState(true);
  const [history, setHistory] = useState<{ expr: string; result: string }[]>([]);

  const evaluate = useCallback(() => {
    try {
      if (!expression.trim()) {
        message.error('请输入表达式');
        return;
      }
      const result = safeEval(expression.trim(), useRadians);
      const formatted = Number(result.toFixed(precision)).toString();
      setHistory((prev) => [{ expr: expression.trim(), result: formatted }, ...prev.slice(0, 19)]);
      message.success(`结果: ${formatted}`);
    } catch (e: any) {
      message.error(e.message || '计算失败');
    }
  }, [expression, precision, useRadians]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🧮 数学表达式计算器</h1>
        <p className="text-gray-600">支持基本运算、三角函数、对数等数学表达式求值</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-3">📝 输入表达式</span>
        <TextArea
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="例如: 2 * (3 + 4), sin(π/2), sqrt(144), 2^10"
          rows={3}
          className="font-mono text-lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">精度（小数位数）</label>
            <Select
              value={precision}
              onChange={setPrecision}
              className="w-full"
              options={[2, 4, 6, 8, 10, 15].map((n) => ({ value: n, label: `${n} 位` }))}
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">角度模式</label>
            <div className="pt-1">
              <Switch checked={useRadians} onChange={setUseRadians} />
              <span className="ml-2 text-gray-600">{useRadians ? '弧度制' : '角度制'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {['π', 'e', '√', '^', 'sin(', 'cos(', 'tan(', 'log(', 'ln(', 'abs(', 'ceil(', 'floor('].map(
          (fn) => (
            <Button
              key={fn}
              onClick={() => setExpression((prev) => prev + fn)}
              className="font-mono"
            >
              {fn}
            </Button>
          )
        )}
      </div>

      <Space className="w-full mb-4">
        <Button type="primary" size="large" onClick={evaluate}>
          🚀 计算
        </Button>
        <Button
          size="large"
          onClick={() => {
            setExpression('');
            setHistory([]);
          }}
        >
          🗑️ 清空
        </Button>
      </Space>

      {history.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <span className="font-semibold text-gray-800 block mb-4">📊 计算历史</span>
          <div className="space-y-2">
            {history.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <span className="font-mono text-gray-600">{item.expr}</span>
                  <span className="mx-2 text-gray-400">=</span>
                  <span className="font-mono text-lg font-bold text-blue-600">{item.result}</span>
                </div>
                <Button
                  size="small"
                  onClick={() => {
                    copy(item.result);
                    message.success('已复制');
                  }}
                >
                  复制
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 支持运算符: + - * / ^ % ( )</li>
          <li>• 三角函数: sin, cos, tan, asin, acos, atan</li>
          <li>• 数学函数: sqrt, abs, ceil, floor, round, pow, min, max</li>
          <li>• 对数: log (以10为底), ln (自然对数)</li>
          <li>• 常量: π (pi), e</li>
          <li>• 百分比: 50% 等价于 0.5</li>
        </ul>
      </div>
    </div>
  );
}
