"use client";
import { useState, useCallback, useEffect } from "react";
import { Button, Input, message, Select, Tooltip } from "antd";
import copy from "copy-to-clipboard";
import { GoogleGenerativeAI } from "@google/generative-ai";

const { TextArea } = Input;

const OPTIMIZATION_PROMPT = `请优化以下提示词，使其更加清晰、具体、有效。

请按照以下格式返回优化结果：

## 🎯 优化后的提示词
[优化后的完整提示词]

## 💡 优化说明
1. [第一条优化说明]
2. [第二条优化说明]
3. [第三条优化说明]

## ✨ 优化版本示例
[提供1-2个不同风格的优化版本示例]

请直接返回优化结果，不要有其他解释。`;

export default function AIPromptOptimizerPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(true);
  const [selectedModel, setSelectedModel] = useState("gemini-2.0-flash");

  useEffect(() => {
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) {
      setApiKey(savedKey);
      setShowSettings(false);
    }
  }, []);

  const handleOptimize = useCallback(async () => {
    if (!input.trim()) {
      message.error("请输入提示词");
      return;
    }

    const key = apiKey || localStorage.getItem("gemini_api_key");
    if (!key) {
      message.error("请先设置 Google AI API Key");
      setShowSettings(true);
      return;
    }

    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: selectedModel });

      const result = await model.generateContent([
        OPTIMIZATION_PROMPT,
        `\n\n原始提示词：\n${input}`
      ]);

      const response = result.response;
      const text = response.text();
      
      setOutput(text);
      message.success("优化完成");
    } catch (error) {
      console.error("AI optimization error:", error);
      if (error instanceof Error) {
        if (error.message.includes("API_KEY")) {
          message.error("API Key 无效，请检查后重试");
        } else if (error.message.includes("quota")) {
          message.error("API 配额已用尽，请更换 API Key 或稍后再试");
        } else {
          message.error(`优化失败: ${error.message}`);
        }
      } else {
        message.error("优化失败，请重试");
      }
    } finally {
      setLoading(false);
    }
  }, [input, apiKey, selectedModel]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("gemini_api_key", apiKey.trim());
      message.success("API Key 已保存");
      setShowSettings(false);
    }
  };

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success("复制成功");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI 提示词优化</h1>
        <p className="text-gray-600 mt-1">使用 Google Gemini AI 优化你的提示词，提升输出质量</p>
      </div>

      {/* API Key Settings */}
      {showSettings && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-medium text-yellow-900 mb-3">⚙️ API 设置</h3>
          <div className="flex gap-3 items-start">
            <div className="flex-1">
              <Input.Password
                placeholder="输入 Google AI API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                size="large"
              />
              <p className="text-xs text-yellow-700 mt-2">
                获取 API Key: <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">https://aistudio.google.com/app/apikey</a>
              </p>
            </div>
            <Button type="primary" onClick={handleSaveApiKey}>
              保存
            </Button>
            <Button onClick={() => setShowSettings(false)}>
              隐藏
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="font-medium text-gray-700">原始提示词</label>
            <div className="flex gap-2">
              <Tooltip title="点击设置 API Key">
                <Button size="small" onClick={() => setShowSettings(true)}>
                  ⚙️
                </Button>
              </Tooltip>
              <Button size="small" onClick={handleClear}>
                清空
              </Button>
            </div>
          </div>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="请输入要优化的提示词..."
            className="font-mono text-sm"
            rows={12}
          />
          <div className="mt-3 flex items-center gap-3">
            <Select
              value={selectedModel}
              onChange={setSelectedModel}
              style={{ width: 200 }}
              options={[
                { label: "Gemini 2.0 Flash", value: "gemini-2.0-flash" },
                { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" },
                { label: "Gemini 1.5 Pro", value: "gemini-1.5-pro" },
              ]}
            />
            <Button
              type="primary"
              onClick={handleOptimize}
              loading={loading}
              disabled={!input}
            >
              {loading ? "优化中..." : "AI 优化"}
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="font-medium text-gray-700">优化结果</label>
            <Button onClick={handleCopy} disabled={!output} size="small">
              复制
            </Button>
          </div>
          <TextArea
            value={output}
            readOnly
            className="font-mono text-sm bg-gray-50"
            rows={12}
            placeholder="优化结果将显示在这里..."
          />
        </div>
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">💡 使用说明</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>1. 首次使用需要设置 Google AI API Key（免费额度足够日常使用）</li>
          <li>2. 在左侧输入你的原始提示词</li>
          <li>3. 点击"AI 优化"按钮</li>
          <li>4. 查看右侧的优化结果，包含优化说明和示例版本</li>
          <li>5. 复制优化后的提示词使用</li>
        </ul>
      </div>
    </div>
  );
}
