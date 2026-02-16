"use client";
import { useState } from "react";
import { Button, Input, message } from "antd";
import copy from "copy-to-clipboard";
import { encryptText, decryptText } from "@/tools/crypto";

const { TextArea } = Input;

export default function EncryptDecryptPage() {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [algorithm, setAlgorithm] = useState("AES");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");

  const handleProcess = () => {
    try {
      if (!input || !key) {
        message.error("请输入内容和密钥");
        return;
      }
      const result = mode === "encrypt"
        ? encryptText(input, key, algorithm)
        : decryptText(input, key, algorithm);
      setOutput(result);
      message.success(mode === "encrypt" ? "加密成功" : "解密成功");
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
        <h1 className="text-2xl font-bold text-gray-900">文本加密解密</h1>
        <p className="text-gray-600 mt-1">对称加密解密文本</p>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          type={mode === "encrypt" ? "primary" : "default"}
          onClick={() => setMode("encrypt")}
        >
          加密
        </Button>
        <Button
          type={mode === "decrypt" ? "primary" : "default"}
          onClick={() => setMode("decrypt")}
        >
          解密
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="mb-3">
            <label className="font-medium text-gray-700 block mb-2">密钥</label>
            <Input.Password
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="请输入密钥..."
            />
          </div>

          <div className="mb-3">
            <label className="font-medium text-gray-700 block mb-2">
              {mode === "encrypt" ? "明文" : "密文"}
            </label>
            <TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encrypt" ? "请输入明文..." : "请输入密文..."}
              className="font-mono text-sm"
              rows={10}
            />
          </div>

          <Button type="primary" onClick={handleProcess}>
            {mode === "encrypt" ? "加密" : "解密"}
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="font-medium text-gray-700">
              {mode === "encrypt" ? "密文" : "明文"}
            </label>
            <Button onClick={handleCopy} disabled={!output} size="small">
              复制
            </Button>
          </div>
          <TextArea
            value={output}
            readOnly
            className="font-mono text-sm bg-gray-50"
            rows={14}
            placeholder="输出结果..."
          />
        </div>
      </div>
    </div>
  );
}
