'use client';
import { Button, Input, message, Radio, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

interface DiffLine {
  type: 'same' | 'add' | 'remove';
  content: string;
}

const computeSimpleDiff = (
  left: string,
  right: string,
  ignoreCase: boolean,
  ignoreWhitespace: boolean
): { left: DiffLine[]; right: DiffLine[] } => {
  const leftLines = left.split('\n');
  const rightLines = right.split('\n');

  const leftProcessed = leftLines.map((l) => {
    let line = l;
    if (ignoreCase) line = line.toLowerCase();
    if (ignoreWhitespace) line = line.trim();
    return line;
  });

  const rightProcessed = rightLines.map((l) => {
    let line = l;
    if (ignoreCase) line = line.toLowerCase();
    if (ignoreWhitespace) line = line.trim();
    return line;
  });

  const leftResult: DiffLine[] = [];
  const rightResult: DiffLine[] = [];

  const maxLen = Math.max(leftProcessed.length, rightProcessed.length);

  for (let i = 0; i < maxLen; i++) {
    const leftLine = leftProcessed[i];
    const rightLine = rightProcessed[i];

    if (leftLine === rightLine) {
      leftResult.push({ type: 'same', content: leftLines[i] || '' });
      rightResult.push({ type: 'same', content: rightLines[i] || '' });
    } else {
      if (leftLine !== undefined) {
        leftResult.push({ type: 'remove', content: leftLines[i] });
      }
      if (rightLine !== undefined) {
        rightResult.push({ type: 'add', content: rightLines[i] });
      }
    }
  }

  return { left: leftResult, right: rightResult };
};

export default function TextDiffPage() {
  const [leftInput, setLeftInput] = useState('');
  const [rightInput, setRightInput] = useState('');
  const [diffResult, setDiffResult] = useState<{ left: DiffLine[]; right: DiffLine[] } | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');

  const handleCompare = useCallback(() => {
    if (!leftInput && !rightInput) {
      message.error('请输入两段文本');
      return;
    }
    setLoading(true);
    try {
      const result = computeSimpleDiff(leftInput, rightInput, ignoreCase, ignoreWhitespace);
      setDiffResult(result);
      message.success('对比完成');
    } catch (_error) {
      message.error('对比失败');
    } finally {
      setLoading(false);
    }
  }, [leftInput, rightInput, ignoreCase, ignoreWhitespace]);

  const handleCopy = () => {
    if (diffResult) {
      const text = ['--- 原始文本', leftInput, '+++ 新文本', rightInput].join('\n');
      copy(text);
      message.success('复制成功');
    }
  };

  const handleClear = () => {
    setLeftInput('');
    setRightInput('');
    setDiffResult(null);
  };

  const _renderDiffLine = (line: DiffLine, side: 'left' | 'right') => {
    let bgClass = '';
    let prefix = '  ';

    if (side === 'left') {
      if (line.type === 'remove') {
        bgClass = 'bg-red-100';
        prefix = '- ';
      }
    } else {
      if (line.type === 'add') {
        bgClass = 'bg-green-100';
        prefix = '+ ';
      }
    }

    if (line.type === 'same') {
      bgClass = '';
    }

    return (
      <div key={Math.random()} className={`px-2 py-0.5 font-mono text-sm ${bgClass}`}>
        <span className="text-gray-400 select-none inline-block w-5">{prefix}</span>
        {line.content || ' '}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 文本差异对比</h1>
        <p className="text-gray-600">比较两段文本的差异</p>
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
            <Radio.Group
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              buttonStyle="solid"
              size="small"
            >
              <Radio.Button value="split">分栏</Radio.Button>
              <Radio.Button value="unified">合并</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📄 原始文本 (左)</span>
            <Button size="small" onClick={() => setLeftInput('')}>
              清空
            </Button>
          </div>
          <TextArea
            value={leftInput}
            onChange={(e) => setLeftInput(e.target.value)}
            placeholder="输入原始文本..."
            className="font-mono text-sm"
            rows={10}
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📄 新文本 (右)</span>
            <Button size="small" onClick={() => setRightInput('')}>
              清空
            </Button>
          </div>
          <TextArea
            value={rightInput}
            onChange={(e) => setRightInput(e.target.value)}
            placeholder="输入新文本..."
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
        <Button size="large" onClick={handleCopy} disabled={!diffResult}>
          📋 复制
        </Button>
        <Button size="large" onClick={handleClear}>
          🗑️ 清空
        </Button>
      </div>

      {diffResult && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📊 对比结果</span>
          </div>

          {viewMode === 'split' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-red-50 px-3 py-2 font-semibold text-sm text-red-700">
                  原始 (删除: 红色)
                </div>
                <div className="max-h-96 overflow-auto">
                  {diffResult.left.map((line, i) => (
                    <div
                      key={i}
                      className={`px-2 py-0.5 font-mono text-sm ${line.type === 'remove' ? 'bg-red-100' : ''}`}
                    >
                      {line.content || ' '}
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-green-50 px-3 py-2 font-semibold text-sm text-green-700">
                  新 (新增: 绿色)
                </div>
                <div className="max-h-96 overflow-auto">
                  {diffResult.right.map((line, i) => (
                    <div
                      key={i}
                      className={`px-2 py-0.5 font-mono text-sm ${line.type === 'add' ? 'bg-green-100' : ''}`}
                    >
                      {line.content || ' '}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="max-h-96 overflow-auto">
                {diffResult.left.map((leftLine, i) => {
                  const rightLine = diffResult.right[i];
                  if (leftLine.type === 'same') {
                    return (
                      <div key={i} className="px-2 py-0.5 font-mono text-sm">
                        {leftLine.content || ' '}
                      </div>
                    );
                  }
                  if (leftLine.type === 'remove') {
                    return (
                      <div key={i} className="px-2 py-0.5 font-mono text-sm bg-red-100">
                        - {leftLine.content || ' '}
                      </div>
                    );
                  }
                  if (rightLine?.type === 'add') {
                    return (
                      <div key={i} className="px-2 py-0.5 font-mono text-sm bg-green-100">
                        + {rightLine.content || ' '}
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
          <li>• 红色表示原始文本中删除的内容</li>
          <li>• 绿色表示新文本中新增的内容</li>
          <li>• 分栏视图便于左右对比，合并视图便于查看整体变化</li>
          <li>• 忽略大小写和空白选项便于进行语义对比</li>
        </ul>
      </div>
    </div>
  );
}
