'use client';
import { Button, Divider, Input, message, Select, Slider, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useEffect, useState } from 'react';
import { API_BASE_URL } from '@/config/api';

const { TextArea } = Input;

const OPTIMIZATION_PROMPT_STYLES = {
  clear: '请优化以下提示词，使其更加清晰、具体、有效。',
  professional: '请以专业、正式的风格优化以下提示词。',
  creative: '请以创意、活泼的风格优化以下提示词。',
  simple: '请用简洁易懂的表达优化以下提示词，去除冗余内容。',
};

const MODELS = [
  { label: '智谱 GLM-4-Flash (推荐)', value: 'glm-4-flash' },
  { label: 'Gemini 2.0 Flash', value: 'gemini-2.0-flash' },
  { label: 'Gemini 1.5 Flash', value: 'gemini-1.5-flash' },
];

const STYLE_OPTIONS = [
  { label: '🧹 清晰简洁', value: 'clear' },
  { label: '💼 专业正式', value: 'professional' },
  { label: '✨ 创意活泼', value: 'creative' },
  { label: '📝 简单直白', value: 'simple' },
];

export default function AIPromptOptimizerPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [selectedModel, setSelectedModel] = useState('glm-4-flash');
  const [optimizationStyle, setOptimizationStyle] = useState('clear');
  const [includeExamples, setIncludeExamples] = useState(true);
  const [includeExplanation, setIncludeExplanation] = useState(true);
  const [detailLevel, setDetailLevel] = useState(5);

  useEffect(() => {
    const savedKey = localStorage.getItem('ai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setShowSettings(false);
    }
  }, []);

  const getPrompt = useCallback(() => {
    const basePrompt =
      OPTIMIZATION_PROMPT_STYLES[optimizationStyle as keyof typeof OPTIMIZATION_PROMPT_STYLES];
    let prompt = `${basePrompt}\n\n请按照以下格式返回优化结果：\n\n`;

    prompt += '## 🎯 优化后的提示词\n[优化后的完整提示词]\n\n';

    if (includeExplanation) {
      const numPoints = Math.max(1, Math.min(5, Math.floor(detailLevel / 2)));
      prompt += `## 💡 优化说明\n`;
      for (let i = 1; i <= numPoints; i++) {
        prompt += `${i}. [第${i}条优化说明]\n`;
      }
      prompt += '\n';
    }

    if (includeExamples) {
      const numExamples = detailLevel > 7 ? 3 : detailLevel > 3 ? 2 : 1;
      prompt += `## ✨ 优化版本示例\n`;
      for (let i = 1; i <= numExamples; i++) {
        prompt += `### 版本 ${i}\n[示例内容]\n\n`;
      }
    }

    prompt += '请直接返回优化结果，不要有其他解释。';
    return prompt;
  }, [optimizationStyle, includeExamples, includeExplanation, detailLevel]);

  const handleOptimize = useCallback(async () => {
    if (!input.trim()) {
      message.error('请输入提示词');
      return;
    }

    const key = apiKey || localStorage.getItem('ai_api_key');
    if (!key) {
      message.error('请先设置 API Key');
      setShowSettings(true);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/tools?action=ai-prompt-optimizer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: key,
          model: selectedModel,
          prompt: getPrompt(),
          input,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error?.message || JSON.stringify(error));
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      if (!text) {
        throw new Error('No response from AI');
      }

      setOutput(text);
      message.success('优化完成');
    } catch (error) {
      console.error('AI optimization error:', error);
      if (error instanceof Error) {
        if (error.message.includes('API_KEY')) {
          message.error('API Key 无效，请检查后重试');
        } else if (error.message.includes('quota')) {
          message.error('API 配额已用尽，请更换 API Key 或稍后再试');
        } else {
          message.error(`优化失败: ${error.message}`);
        }
      } else {
        message.error('优化失败，请重试');
      }
    } finally {
      setLoading(false);
    }
  }, [input, apiKey, selectedModel, getPrompt]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('ai_api_key', apiKey.trim());
      message.success('API Key 已保存');
      setShowSettings(false);
    }
  };

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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">✨ AI 提示词优化</h1>
        <p className="text-gray-600">使用 AI 智能优化你的提示词，让 AI 输出更精准</p>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-amber-900">⚙️ API 配置</h3>
            <Button size="small" onClick={() => setShowSettings(false)}>
              收起
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">选择模型</label>
              <Select
                value={selectedModel}
                onChange={setSelectedModel}
                style={{ width: '100%' }}
                options={MODELS}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {selectedModel.startsWith('glm') ? '智谱 AI API Key' : 'Google AI API Key'}
              </label>
              <Input.Password
                placeholder="输入 API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          </div>
          <p className="text-xs text-amber-700 mt-3">
            {selectedModel.startsWith('glm') ? (
              <>
                获取 API Key:{' '}
                <a
                  href="https://open.bigmodel.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  智谱开放平台
                </a>{' '}
                (GLM-4-Flash 免费)
              </>
            ) : (
              <>
                获取 API Key:{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Google AI Studio
                </a>
              </>
            )}
          </p>
          <div className="mt-4 flex gap-2">
            <Button type="primary" onClick={handleSaveApiKey}>
              保存配置
            </Button>
            {!apiKey && <Button onClick={() => setShowSettings(false)}>稍后设置</Button>}
          </div>
        </div>
      )}

      {/* Input Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="font-semibold text-gray-800">📝 原始提示词</label>
          <div className="flex gap-2">
            {!showSettings && !apiKey && (
              <Button size="small" onClick={() => setShowSettings(true)}>
                🔑 设置 API Key
              </Button>
            )}
            <Button size="small" onClick={handleClear}>
              清空
            </Button>
          </div>
        </div>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入你需要优化的提示词..."
          className="font-mono text-sm"
          rows={6}
        />
      </div>

      {/* Options Section */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-gray-800">⚡ 优化参数</span>
          <Button
            type="link"
            onClick={() => setShowSettings(true)}
            size="small"
            className={apiKey ? 'text-green-600' : 'text-amber-600'}
          >
            {apiKey ? '✅ 已配置' : '⚠️ 未配置'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Style */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">优化风格</label>
            <Select
              value={optimizationStyle}
              onChange={setOptimizationStyle}
              style={{ width: '100%' }}
              options={STYLE_OPTIONS}
            />
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">AI 模型</label>
            <Select
              value={selectedModel}
              onChange={setSelectedModel}
              style={{ width: '100%' }}
              options={MODELS}
            />
          </div>
        </div>

        <Divider className="my-4" />

        {/* Toggles */}
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <Switch checked={includeExamples} onChange={setIncludeExamples} />
            <span className="text-sm text-gray-700">包含示例版本</span>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={includeExplanation} onChange={setIncludeExplanation} />
            <span className="text-sm text-gray-700">包含优化说明</span>
          </div>
        </div>

        {/* Detail Level */}
        {includeExplanation && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">详细程度</span>
              <span className="text-sm text-gray-500">
                {detailLevel <= 3 ? '简洁' : detailLevel <= 6 ? '一般' : '详细'}
              </span>
            </div>
            <Slider
              min={1}
              max={10}
              value={detailLevel}
              onChange={setDetailLevel}
              marks={{ 1: '简', 5: '中', 10: '详' }}
            />
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6">
          <Button
            type="primary"
            size="large"
            block
            onClick={handleOptimize}
            loading={loading}
            disabled={!input}
            className="h-12 text-base font-medium"
          >
            {loading ? '🚀 AI 正在优化中...' : '🚀 开始优化'}
          </Button>
        </div>
      </div>

      {/* Output Section */}
      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <label className="font-semibold text-gray-800">📋 优化结果</label>
            <div className="flex gap-2">
              <Button onClick={handleCopy}>📋 复制结果</Button>
              <Button
                onClick={() => {
                  setInput(output);
                  setOutput('');
                }}
              >
                📝 二次优化
              </Button>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 max-h-[500px] overflow-y-auto">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">{output}</pre>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 优化小贴士</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>
            • <strong>清晰简洁风格</strong>：适合日常对话、内容创作
          </li>
          <li>
            • <strong>专业正式风格</strong>：适合商务邮件、技术文档
          </li>
          <li>
            • <strong>创意活泼风格</strong>：适合社交媒体、营销文案
          </li>
          <li>• 使用「二次优化」按钮可以对优化结果进行进一步调整</li>
        </ul>
      </div>
    </div>
  );
}
