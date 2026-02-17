'use client';
import { Button, Input, message, Select, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

interface BenchmarkTest {
  name: string;
  code: string;
}

export default function BenchmarkBuilderPage() {
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [framework, setFramework] = useState('benchmarkscript');
  const [iterations, setIterations] = useState(10000);
  const [warmup, _setWarmup] = useState(true);
  const [asyncMode, setAsyncMode] = useState(false);
  const [tests, setTests] = useState<BenchmarkTest[]>([
    { name: 'test1', code: '' },
    { name: 'test2', code: '' },
  ]);

  const generateBenchmark = useCallback(() => {
    let code = '';

    if (language === 'javascript') {
      if (framework === 'benchmarkscript') {
        code = `const { Benchmark } = require('benchmark');
const suite = new Benchmark.Suite();

`;
        tests.forEach((test, idx) => {
          if (test.code.trim()) {
            code += `suite.add('${test.name || `test${idx + 1}`}', function() {
${test.code}
});
`;
          }
        });

        code += `
suite.on('complete', function() {
  console.log('Results:');
  this.forEach(benchmark => {
    console.log(\`  \${benchmark.name}: \${benchmark.stats.mean * 1000}ms (±\${benchmark.stats.rme.toFixed(2)}%)\`);
  });
});

${
  warmup
    ? `suite.on('start', function() {
  console.log('Warming up...');
});`
    : ''
}

${asyncMode ? `suite.run({ async: true });` : `suite.run();`}
`;
      } else if (framework === 'console') {
        code = `function measure(fn, iterations = ${iterations}) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  return end - start;
}

`;
        tests.forEach((test, idx) => {
          if (test.code.trim()) {
            code += `// Test ${idx + 1}: ${test.name || `test${idx + 1}`}
function test${idx + 1}() {
${test.code}
}
const time${idx + 1} = measure(test${idx + 1});
console.log('${test.name || `test${idx + 1}`}:', time${idx + 1}.toFixed(2), 'ms');

`;
          }
        });
      }
    } else if (language === 'python') {
      if (framework === 'pytest') {
        code = `import pytest
import time

`;
        tests.forEach((test, idx) => {
          if (test.code.trim()) {
            const funcName = test.name?.replace(/[^a-zA-Z0-9_]/g, '_') || `test_${idx + 1}`;
            code += `def ${funcName}():
${test.code
  .split('\n')
  .map((line) => `    ${line}`)
  .join('\n')}

`;
          }
        });

        code += `
if __name__ == '__main__':
    pytest.main([__file__, '-v'])
`;
      } else if (framework === 'timeit') {
        code = `import timeit

`;
        tests.forEach((test, idx) => {
          if (test.code.trim()) {
            code += `# Test ${idx + 1}: ${test.name || `test${idx + 1}`}
setup${idx + 1} = """
${test.code
  .split('\n')
  .map((line) => `    ${line}`)
  .join('\n')}
"""
code${idx + 1} = """
${test.code
  .split('\n')
  .map((line) => `    ${line}`)
  .join('\n')}
"""
t${idx + 1} = timeit.timeit(code${idx + 1}, setup${idx + 1}, number=${iterations})
print('${test.name || `test${idx + 1}`}:', t${idx + 1}, 'seconds')

`;
          }
        });
      }
    } else if (language === 'go') {
      code = `package main

import (
\t"testing"
\t"time"
)

`;
      tests.forEach((test, idx) => {
        if (test.code.trim()) {
          const funcName = test.name?.replace(/[^a-zA-Z0-9_]/g, '_') || `test_${idx + 1}`;
          code += `func Benchmark${funcName.charAt(0).toUpperCase() + funcName.slice(1)}(b *testing.B) {
${test.code
  .split('\n')
  .map((line) => `\t${line}`)
  .join('\n')}
}

`;
        }
      });

      code += `\n// Run with: go test -bench=${tests[0]?.name || '.'} -benchmem`;
    }

    setOutput(code);
  }, [language, framework, tests, iterations, warmup, asyncMode]);

  const addTest = () => {
    setTests([...tests, { name: `test${tests.length + 1}`, code: '' }]);
  };

  const removeTest = (idx: number) => {
    if (tests.length > 1) {
      setTests(tests.filter((_, i) => i !== idx));
    }
  };

  const updateTest = (idx: number, field: keyof BenchmarkTest, value: string) => {
    const newTests = [...tests];
    newTests[idx] = { ...newTests[idx], [field]: value };
    setTests(newTests);
  };

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">⚡ 性能基准测试构建</h1>
        <p className="text-gray-600">生成代码进行性能测试</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 测试配置</span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <span className="text-sm text-gray-600 block mb-2">语言</span>
            <Select
              value={language}
              onChange={setLanguage}
              style={{ width: '100%' }}
              options={[
                { value: 'javascript', label: 'JavaScript' },
                { value: 'python', label: 'Python' },
                { value: 'go', label: 'Go' },
              ]}
            />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">框架</span>
            <Select
              value={framework}
              onChange={setFramework}
              style={{ width: '100%' }}
              options={
                language === 'javascript'
                  ? [
                      { value: 'benchmarkscript', label: 'Benchmark.js' },
                      { value: 'console', label: 'Console Time' },
                    ]
                  : language === 'python'
                    ? [
                        { value: 'pytest', label: 'pytest-benchmark' },
                        { value: 'timeit', label: 'timeit' },
                      ]
                    : [{ value: 'testing', label: 'testing.B' }]
              }
            />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">迭代次数</span>
            <Select
              value={iterations}
              onChange={setIterations}
              style={{ width: '100%' }}
              options={[
                { value: 1000, label: '1,000' },
                { value: 5000, label: '5,000' },
                { value: 10000, label: '10,000' },
                { value: 50000, label: '50,000' },
                { value: 100000, label: '100,000' },
              ]}
            />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">异步模式</span>
            <Switch
              checked={asyncMode}
              onChange={setAsyncMode}
              disabled={language !== 'javascript'}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-gray-800">📝 测试用例</span>
          <Button size="small" onClick={addTest}>
            + 添加测试
          </Button>
        </div>
        <div className="space-y-4">
          {tests.map((test, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Input
                  value={test.name}
                  onChange={(e) => updateTest(idx, 'name', e.target.value)}
                  placeholder="测试名称"
                  style={{ width: 150 }}
                  size="small"
                />
                {tests.length > 1 && (
                  <Button size="small" danger onClick={() => removeTest(idx)}>
                    删除
                  </Button>
                )}
              </div>
              <TextArea
                value={test.code}
                onChange={(e) => updateTest(idx, 'code', e.target.value)}
                placeholder="// 输入要测试的代码..."
                className="font-mono text-sm"
                rows={3}
              />
            </div>
          ))}
        </div>
      </div>

      <Button
        type="primary"
        size="large"
        block
        onClick={generateBenchmark}
        className="h-12 text-base font-medium mb-4"
      >
        🚀 生成基准测试代码
      </Button>

      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📋 生成代码</span>
            <Button onClick={handleCopy}>📋 复制</Button>
          </div>
          <pre className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto font-mono text-sm text-gray-800 whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 支持 JavaScript、Python、Go 三种语言的基准测试生成</li>
          <li>• 可添加多个测试用例进行对比测试</li>
          <li>• Benchmark.js 需要先安装：npm install benchmark</li>
          <li>• Python timeit 模块适合简单测试，pytest-benchmark 适合复杂场景</li>
          <li>• Go 使用内置 testing.B，运行命令：go test -bench=. -benchmem</li>
        </ul>
      </div>
    </div>
  );
}
