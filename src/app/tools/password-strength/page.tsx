'use client';

import { Card, Empty, Input, Progress, Tag } from 'antd';
import { useMemo, useState } from 'react';
import { analyzePasswordStrength } from '@/tools/crypto';

const { TextArea } = Input;

interface Dimension {
  label: string;
  key: string;
  check: (pwd: string) => boolean;
}

const dimensions: Dimension[] = [
  { label: '长度 ≥ 8', key: 'length8', check: (p) => p.length >= 8 },
  { label: '长度 ≥ 12', key: 'length12', check: (p) => p.length >= 12 },
  { label: '小写字母', key: 'lowercase', check: (p) => /[a-z]/.test(p) },
  { label: '大写字母', key: 'uppercase', check: (p) => /[A-Z]/.test(p) },
  { label: '数字', key: 'number', check: (p) => /[0-9]/.test(p) },
  { label: '特殊字符', key: 'special', check: (p) => /[^a-zA-Z0-9]/.test(p) },
];

const tips = [
  { id: 'tip-1', text: '使用至少 12 位字符的密码' },
  { id: 'tip-2', text: '混合使用大小写字母、数字和特殊字符' },
  { id: 'tip-3', text: '避免使用个人信息（生日、姓名等）' },
  { id: 'tip-4', text: '不要在多个网站使用相同密码' },
  { id: 'tip-5', text: '定期更换重要账户的密码' },
  { id: 'tip-6', text: '使用密码管理器生成和存储密码' },
];

export default function PasswordStrengthPage() {
  const [password, setPassword] = useState('');

  const result = useMemo(() => {
    return analyzePasswordStrength(password);
  }, [password]);

  const dimensionStatus = useMemo(() => {
    return dimensions.map((d) => ({
      ...d,
      passed: d.check(password),
    }));
  }, [password]);

  const strengthPercent = Math.round((result.score / 6) * 100);

  const getStrengthColor = (score: number) => {
    if (score <= 2) return '#ff4d4f';
    if (score <= 4) return '#faad14';
    return '#52c41a';
  };

  const getStrengthLabel = (level: string) => {
    switch (level) {
      case '弱':
        return { text: '弱', color: 'error' as const };
      case '中等':
        return { text: '中等', color: 'warning' as const };
      case '强':
        return { text: '强', color: 'success' as const };
      default:
        return { text: '未评估', color: 'default' as const };
    }
  };

  const strengthInfo = getStrengthLabel(result.level);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">密码强度分析</h1>
        <p className="text-gray-600 mt-1">实时分析密码强度并提供改进建议</p>
      </div>

      <div className="space-y-6">
        <Card>
          <div className="space-y-4">
            <div>
              <label htmlFor="password-input" className="font-medium text-gray-700 mb-2 block">
                输入密码
              </label>
              <TextArea
                id="password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入要分析的密码..."
                className="font-mono text-sm"
                rows={3}
                allowClear
              />
            </div>

            {password && (
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">整体强度</span>
                  <Tag color={strengthInfo.color} className="text-base">
                    {strengthInfo.text}
                  </Tag>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">得分: {result.score}/6</span>
                    <span className="text-sm text-gray-500">{strengthPercent}%</span>
                  </div>
                  <Progress
                    percent={strengthPercent}
                    showInfo={false}
                    strokeColor={getStrengthColor(result.score)}
                    trailColor="#f0f0f0"
                  />
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card title="评分维度">
          {password ? (
            <div className="grid grid-cols-2 gap-3">
              {dimensionStatus.map((d) => (
                <div
                  key={d.key}
                  className={`flex items-center gap-2 p-2 rounded ${
                    d.passed ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'
                  }`}
                >
                  <span className="text-lg">{d.passed ? '✓' : '○'}</span>
                  <span className="text-sm">{d.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="请输入密码以查看评分维度" />
          )}
        </Card>

        {password && result.suggestions.length > 0 && (
          <Card title="改进建议">
            <ul className="space-y-2">
              {result.suggestions.map((suggestion) => (
                <li key={suggestion} className="flex items-start gap-2 text-orange-600">
                  <span className="mt-1">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <Card title="使用提示">
          <ul className="space-y-2">
            {tips.map((tip) => (
              <li key={tip.id} className="flex items-start gap-2 text-gray-600">
                <span className="mt-1 text-blue-500">•</span>
                <span>{tip.text}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
