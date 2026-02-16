"use client";
import { useState } from "react";
import { Button, Input, message } from "antd";
import copy from "copy-to-clipboard";
import { bcryptHash } from "@/tools/crypto";

const { TextArea } = Input;

export default function BcryptPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"hash" | "verify">("hash");
  const [hashInput, setHashInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    try {
      setLoading(true);
      if (!input) {
        message.error("请输入内容");
        return;
      }

      const result = await bcryptHash(input);
      setOutput(result);
      message.success("处理成功");
    } catch (error) {
      message.error(error instanceof Error ? error.message : "处理失败");
    } finally {
      setLoading(false);
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
        <h1 className="text-2xl font-bold text-gray-900">Bcrypt 加密</h1>
        <p className="text-gray-600 mt-1">Bcrypt 加密和验证</p>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          type={mode === "hash" ? "primary" : "default"}
          onClick={() => setMode("hash")}
        >
          加密
        </Button>
        <Button
          type={mode === "verify" ? "primary" : "default"}
          onClick={() => setMode("verify")}
        >
          验证
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="mb-3">
            <label className="font-medium text-gray-700 block mb-2">
              {mode === "hash" ? "明文" : "明文"}
            </label>
            <TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "hash" ? "请输入明文..." : "请输入明文..."}
              className="font-mono text-sm"
              rows={8}
            />
          </div>

          {mode === "verify" && (
            <div className="mb-3">
              <label className="font-medium text-gray-700 block mb-2">哈希值</label>
              <TextArea
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                placeholder="请输入哈希值..."
                className="font-mono text-sm"
                rows={4}
              />
            </div>
          )}

          <Button type="primary" onClick={handleProcess} loading={loading}>
            {mode === "hash" ? "加密" : "验证"}
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="font-medium text-gray-700">
              {mode === "hash" ? "哈希结果" : "验证结果"}
            </label>
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
