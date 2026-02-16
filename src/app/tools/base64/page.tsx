"use client";
import { useState } from "react";
import { Button, message } from "antd";
import copy from "copy-to-clipboard";
import { encodeBase64, decodeBase64 } from "@/tools/converter";

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleProcess = () => {
    try {
      if (!input) {
        message.error("请输入内容");
        return;
      }
      const result = mode === "encode"
        ? encodeBase64(input)
        : decodeBase64(input);
      setOutput(result);
      message.success(mode === "encode" ? "编码成功" : "解码成功");
    } catch (error) {
      message.error(error instanceof Error ? error.message : "处理失败");
    }
  };

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success("复制成功");
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Base64 编码解码</h1>
        <p className="text-gray-600 mt-1">Base64 字符串编码解码</p>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          type={mode === "encode" ? "primary" : "default"}
          onClick={() => setMode("encode")}
        >
          编码
        </Button>
        <Button
          type={mode === "decode" ? "primary" : "default"}
          onClick={() => setMode("decode")}
        >
          解码
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="mb-3">
            <label className="font-medium text-gray-700 block mb-2">
              {mode === "encode" ? "明文" : "Base64 字符串"}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "请输入明文..." : "请输入 Base64 字符串..."}
              className="w-full h-64 p-3 font-mono text-sm border border-gray-300 rounded resize-none"
            />
          </div>
          <Button type="primary" onClick={handleProcess}>
            {mode === "encode" ? "编码" : "解码"}
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="font-medium text-gray-700">
              {mode === "encode" ? "Base64 字符串" : "明文"}
            </label>
            <Button onClick={handleCopy} disabled={!output} size="small">
              复制
            </Button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-64 p-3 font-mono text-sm bg-gray-50 border border-gray-200 rounded resize-none"
            placeholder="输出结果..."
          />
        </div>
      </div>
    </div>
  );
}
