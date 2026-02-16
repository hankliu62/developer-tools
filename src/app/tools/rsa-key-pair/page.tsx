"use client";
import { useState } from "react";
import { Button, message } from "antd";
import copy from "copy-to-clipboard";
import { generateRSAKeyPair } from "@/tools/crypto";

export default function RSAKeyPairPage() {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const keyPair = await generateRSAKeyPair();
      setPublicKey(keyPair.publicKey);
      setPrivateKey(keyPair.privateKey);
      message.success("生成成功");
    } catch (error) {
      message.error(error instanceof Error ? error.message : "生成失败");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    if (text) {
      copy(text);
      message.success("复制成功");
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">RSA 密钥对生成</h1>
        <p className="text-gray-600 mt-1">生成 RSA 密钥对</p>
      </div>

      <Button type="primary" onClick={handleGenerate} loading={loading} className="mb-6">
        生成密钥对
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="font-medium text-gray-700">公钥</label>
            <Button onClick={() => handleCopy(publicKey)} disabled={!publicKey} size="small">
              复制
            </Button>
          </div>
          <textarea
            value={publicKey}
            readOnly
            className="w-full h-64 p-3 font-mono text-sm bg-gray-50 border border-gray-200 rounded resize-none"
            placeholder="公钥..."
          />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="font-medium text-gray-700">私钥</label>
            <Button onClick={() => handleCopy(privateKey)} disabled={!privateKey} size="small">
              复制
            </Button>
          </div>
          <textarea
            value={privateKey}
            readOnly
            className="w-full h-64 p-3 font-mono text-sm bg-gray-50 border border-gray-200 rounded resize-none"
            placeholder="私钥..."
          />
        </div>
      </div>
    </div>
  );
}
