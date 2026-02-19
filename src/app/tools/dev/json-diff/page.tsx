'use client';
import { Button, Input, message, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

interface DiffResult {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
}

const computeDiff = (
  left: string,
  right: string,
  ignoreCase: boolean,
  ignoreWhitespace: boolean
): { leftLines: DiffResult[]; rightLines: DiffResult[] } => {
  const leftLines = left.split('\n');
  const rightLines = right.split('\n');

  let processedLeft = leftLines.map((l) => l);
  let processedRight = rightLines.map((l) => l);

  if (ignoreCase) {
    processedLeft = processedLeft.map((l) => l.toLowerCase());
    processedRight = processedRight.map((l) => l.toLowerCase());
  }

  if (ignoreWhitespace) {
    processedLeft = processedLeft.map((l) => l.trim());
    processedRight = processedRight.map((l) => l.trim());
  }

  const leftResults: DiffResult[] = leftLines.map((line, i) => ({
    type: processedLeft[i] === processedRight[i] ? 'unchanged' : 'removed',
    value: line,
  }));

  const rightResults: DiffResult[] = rightLines.map((line, i) => ({
    type: processedLeft[i] === processedRight[i] ? 'unchanged' : 'added',
    value: line,
  }));

  return { leftLines: leftResults, rightLines: rightResults };
};

export default function JsonDiffPage() {
  const [leftInput, setLeftInput] = useState('');
  const [rightInput, setRightInput] = useState('');
  const [diffResult, setDiffResult] = useState<{
    leftLines: DiffResult[];
    rightLines: DiffResult[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');

  const handleCompare = useCallback(() => {
    try {
      if (!leftInput || !rightInput) {
        message.error('请输入两段 JSON 内容');
        return;
      }
      setLoading(true);
      const leftParsed = JSON.parse(leftInput);
      const rightParsed = JSON.parse(rightInput);
      const leftStr = JSON.stringify(leftParsed, null, 2);
      const rightStr = JSON.stringify(rightParsed, null, 2);
      const result = computeDiff(leftStr, rightStr, ignoreCase, ignoreWhitespace);
      setDiffResult(result);
      message.success('对比完成');
    } catch (_error) {
      message.error('JSON 解析失败，请检查输入格式是否正确');
    } finally {
      setLoading(false);
    }
  }, [leftInput, rightInput, ignoreCase, ignoreWhitespace]);

  const handleCopy = (text: string) => {
    copy(text);
    message.success('复制成功');
  };

  const handleClear = () => {
    setLeftInput('');
    setRightInput('');
    setDiffResult(null);
  };

  const _renderDiffLine = (line: DiffResult) => {
    const bgClass = {
      added: 'bg-green-100',
      removed: 'bg-red-100',
      unchanged: '',
    }[line.type];

    const prefix = {
      added: '+ ',
      removed: '- ',
      unchanged: '  ',
    }[line.type];

    return (
      <div key={Math.random()} className={`px-2 py-0.5 font-mono text-sm ${bgClass}`}>
        <span className="text-gray-500 select-none w-6 inline-block">{prefix}</span>
        {line.value}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔍 JSON 对比工具</h1>
        <p className="text-gray-600">比较两个 JSON 对象的差异</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">忽略大小写</span>
            <Switch checked={ignoreCase} onChange={setIgnoreCase} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">忽略空白</span>
            <Switch checked={ignoreWhitespace} onChange={setIgnoreWhitespace} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">视图</span>
            <Button.Group>
              <Button
                type={viewMode === 'split' ? 'primary' : 'default'}
                onClick={() => setViewMode('split')}
              >
                分栏
              </Button>
              <Button
                type={viewMode === 'unified' ? 'primary' : 'default'}
                onClick={() => setViewMode('unified')}
              >
                合并
              </Button>
            </Button.Group>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📄 原始 JSON (左)</span>
            <Button size="small" onClick={() => setLeftInput('')}>
              清空
            </Button>
          </div>
          <TextArea
            value={leftInput}
            onChange={(e) => setLeftInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="font-mono text-sm"
            rows={10}
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📄 新 JSON (右)</span>
            <Button size="small" onClick={() => setRightInput('')}>
              清空
            </Button>
          </div>
          <TextArea
            value={rightInput}
            onChange={(e) => setRightInput(e.target.value)}
            placeholder='{"key": "new value"}'
            className="font-mono text-sm"
            rows={10}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          type="primary"
          size="large"
          onClick={handleCompare}
          loading={loading}
          className="flex-1"
        >
          🚀 开始对比
        </Button>
        <Button size="large" onClick={handleClear}>
          🗑️ 清空
        </Button>
      </div>

      {diffResult && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📊 对比结果</span>
            <Button size="small" onClick={() => handleCopy(JSON.stringify(diffResult, null, 2))}>
              复制结果
            </Button>
          </div>
          {viewMode === 'split' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-3 py-2 font-semibold text-sm">原始</div>
                <div className="max-h-96 overflow-auto">
                  {diffResult.leftLines.map((line, i) => (
                    <div
                      key={i}
                      className={`px-2 py-0.5 font-mono text-sm ${line.type === 'removed' ? 'bg-red-100' : ''}`}
                    >
                      {line.value || ' '}
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-3 py-2 font-semibold text-sm">新</div>
                <div className="max-h-96 overflow-auto">
                  {diffResult.rightLines.map((line, i) => (
                    <div
                      key={i}
                      className={`px-2 py-0.5 font-mono text-sm ${line.type === 'added' ? 'bg-green-100' : ''}`}
                    >
                      {line.value || ' '}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="max-h-96 overflow-auto">
                {diffResult.leftLines.map((line, i) => {
                  const rightLine = diffResult.rightLines[i];
                  if (line.type === 'unchanged' && rightLine?.type === 'unchanged') {
                    return (
                      <div key={i} className="px-2 py-0.5 font-mono text-sm">
                        {line.value || ' '}
                      </div>
                    );
                  }
                  if (line.type === 'removed') {
                    return (
                      <div key={i} className="px-2 py-0.5 font-mono text-sm bg-red-100">
                        - {line.value || ' '}
                      </div>
                    );
                  }
                  if (rightLine?.type === 'added') {
                    return (
                      <div key={i} className="px-2 py-0.5 font-mono text-sm bg-green-100">
                        + {rightLine.value || ' '}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 输入两段 JSON，系统会自动解析并对比差异</li>
          <li>• 绿色表示新增，红色表示删除</li>
          <li>• 支持忽略大小写和空白字符的对比模式</li>
          <li>• 分栏视图便于左右对比，合并视图便于查看整体变化</li>
        </ul>
      </div>
    </div>
  );
}
