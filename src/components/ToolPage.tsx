"use client";

import { useState, useCallback } from "react";
import { Button, Input, Select, message } from "antd";
import copy from "copy-to-clipboard";

const { TextArea } = Input;

interface ToolPageProps {
  title: string;
  description: string;
  inputLabel?: string;
  outputLabel?: string;
  defaultInput?: string;
  inputPlaceholder?: string;
  options?: { label: string; value: string }[];
  onProcess: (input: string, options?: Record<string, string>) => string;
  processLabel?: string;
}

export default function ToolPage({
  title,
  description,
  inputLabel = "输入",
  outputLabel = "输出",
  defaultInput = "",
  inputPlaceholder = "请输入内容...",
  options = [],
  onProcess,
  processLabel = "处理",
}: ToolPageProps) {
  const [input, setInput] = useState(defaultInput);
  const [output, setOutput] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[0]?.value || "");
  const [loading, setLoading] = useState(false);

  const handleProcess = useCallback(() => {
    try {
      setLoading(true);
      const optionsMap = selectedOption ? { type: selectedOption } : undefined;
      const result = onProcess(input, optionsMap);
      setOutput(result);
      message.success("处理成功");
    } catch (error) {
      message.error(error instanceof Error ? error.message : "处理失败");
    } finally {
      setLoading(false);
    }
  }, [input, selectedOption, onProcess]);

  const handleCopy = useCallback(() => {
    if (output) {
      copy(output);
      message.success("复制成功");
    }
  }, [output]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
  }, []);

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="font-medium text-gray-700">{inputLabel}</label>
            {options.length > 0 && (
              <Select
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                style={{ width: 150 }}
                size="small"
              />
            )}
          </div>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputPlaceholder}
            className="font-mono text-sm"
            rows={12}
          />
          <div className="flex gap-2 mt-3">
            <Button
              type="primary"
              onClick={handleProcess}
              loading={loading}
              disabled={!input}
            >
              {processLabel}
            </Button>
            <Button onClick={handleClear}>清空</Button>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="font-medium text-gray-700">{outputLabel}</label>
            <Button onClick={handleCopy} disabled={!output} size="small">
              复制
            </Button>
          </div>
          <TextArea
            value={output}
            readOnly
            className="font-mono text-sm bg-gray-50"
            rows={12}
            placeholder="输出结果..."
          />
        </div>
      </div>
    </div>
  );
}
