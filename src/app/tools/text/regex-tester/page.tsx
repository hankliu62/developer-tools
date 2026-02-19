'use client';
import { Button, Checkbox, Input, message, Tag } from 'antd';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

interface MatchResult {
  index: number;
  match: string;
  groups?: string[];
}

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState({
    g: true,
    i: false,
    m: false,
    s: false,
    u: false,
  });
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const flagString = Object.entries(flags)
    .filter(([, v]) => v)
    .map(([k]) => k)
    .join('');

  const handleTest = useCallback(() => {
    if (!pattern) {
      message.error('请输入正则表达式');
      return;
    }
    if (!testString) {
      message.error('请输入测试文本');
      return;
    }
    setLoading(true);
    setError(null);
    setMatches([]);

    try {
      const regex = new RegExp(pattern, flagString);
      const results: MatchResult[] = [];

      if (flags.g) {
        let match: RegExpExecArray | null = regex.exec(testString);
        while (match !== null) {
          results.push({
            index: match.index,
            match: match[0],
            groups: match.slice(1),
          });
          match = regex.exec(testString);
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          results.push({
            index: match.index,
            match: match[0],
            groups: match.slice(1),
          });
        }
      }

      setMatches(results);
      message.success(`找到 ${results.length} 个匹配`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '正则表达式错误');
      message.error('正则表达式错误');
    } finally {
      setLoading(false);
    }
  }, [pattern, testString, flags, flagString]);

  const handleReplace = useCallback(() => {
    if (!pattern || !testString) {
      message.error('请输入正则表达式和测试文本');
      return;
    }
    setLoading(true);
    try {
      const regex = new RegExp(pattern, flagString);
      const replaced = testString.replace(regex, '<mark>$&</mark>');
      setTestString(replaced);
      message.success('高亮显示');
    } catch (_err) {
      message.error('替换失败');
    } finally {
      setLoading(false);
    }
  }, [pattern, testString, flagString]);

  const handleClear = () => {
    setPattern('');
    setTestString('');
    setMatches([]);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔤 正则测试工具</h1>
        <p className="text-gray-600">在线测试和调试正则表达式</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 正则选项</span>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={flags.g}
              onChange={(e) => setFlags({ ...flags, g: e.target.checked })}
            >
              全局 (g)
            </Checkbox>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={flags.i}
              onChange={(e) => setFlags({ ...flags, i: e.target.checked })}
            >
              忽略大小写 (i)
            </Checkbox>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={flags.m}
              onChange={(e) => setFlags({ ...flags, m: e.target.checked })}
            >
              多行模式 (m)
            </Checkbox>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={flags.s}
              onChange={(e) => setFlags({ ...flags, s: e.target.checked })}
            >
              单行模式 (s)
            </Checkbox>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={flags.u}
              onChange={(e) => setFlags({ ...flags, u: e.target.checked })}
            >
              Unicode (u)
            </Checkbox>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-800">🔍 正则表达式</span>
          <div className="text-sm text-gray-500">
            /{pattern || '...'}/{flagString}
          </div>
        </div>
        <Input
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="输入正则表达式，如 \d+ 或 [a-zA-Z]+"
          className="font-mono text-lg"
          status={error ? 'error' : undefined}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-800">📝 测试文本</span>
          <Button size="small" onClick={() => setTestString('')}>
            清空
          </Button>
        </div>
        <TextArea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="输入要测试的文本..."
          className="font-mono text-sm"
          rows={6}
        />
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          type="primary"
          size="large"
          onClick={handleTest}
          loading={loading}
          className="flex-1"
        >
          🚀 测试匹配
        </Button>
        <Button size="large" onClick={handleReplace}>
          🎨 高亮显示
        </Button>
        <Button size="large" onClick={handleClear}>
          🗑️ 清空
        </Button>
      </div>

      {matches.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📋 匹配结果 ({matches.length} 个)</span>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {matches.map((match, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Tag color="blue">#{idx + 1}</Tag>
                  <Tag color="green">位置: {match.index}</Tag>
                </div>
                <div className="font-mono text-sm text-gray-800">
                  <span className="text-green-600 font-bold">{match.match}</span>
                </div>
                {match.groups && match.groups.length > 0 && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">捕获组: </span>
                    {match.groups.map((g, i) => (
                      <Tag key={i} className="ml-1">
                        ${i + 1}: {g}
                      </Tag>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 正则元字符</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-blue-800">
          <div>
            <code>.</code> 任意字符
          </div>
          <div>
            <code>\d</code> 数字
          </div>
          <div>
            <code>\w</code> 单词字符
          </div>
          <div>
            <code>\s</code> 空白
          </div>
          <div>
            <code>^</code> 行首
          </div>
          <div>
            <code>$</code> 行尾
          </div>
          <div>
            <code>*</code> 0或更多
          </div>
          <div>
            <code>+</code> 1或更多
          </div>
          <div>
            <code>?</code> 0或1
          </div>
          <div>
            <code>{'{n}'}</code> 恰好n次
          </div>
          <div>
            <code>{'{n,m}'}</code> n到m次
          </div>
          <div>
            <code>[abc]</code> 字符集
          </div>
        </div>
      </div>
    </div>
  );
}
