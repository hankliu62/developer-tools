'use client';

import { Drawer, Input, message, Tag } from 'antd';
import copy from 'copy-to-clipboard';
import QRCode from 'qrcode';
import { useState } from 'react';
import { type Prompt, prompts } from '@/data/prompts';

export default function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);

  const filteredPrompts = prompts.filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCopy = (content: string) => {
    copy(content);
    message.success('复制成功');
  };

  const handleShare = async (prompt: Prompt) => {
    const shareUrl = `${window.location.origin}/prompts?prompt=${encodeURIComponent(
      JSON.stringify({ title: prompt.title, content: prompt.content })
    )}`;

    try {
      const qrCode = await QRCode.toDataURL(shareUrl);
      setQrCodeUrl(qrCode);
      setSelectedPrompt(prompt);
      setShowQrCode(true);
    } catch {
      message.error('生成二维码失败');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">提示词</h1>
      </div>

      <Input
        placeholder="搜索提示词..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6"
        size="large"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrompts.map((prompt) => (
          <div
            key={prompt.id}
            className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            onClick={() => {
              setSelectedPrompt(prompt);
              setDrawerOpen(true);
            }}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/50 transition-all duration-200" />
            <div className="relative">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {prompt.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{prompt.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {prompt.tags.slice(0, 3).map((tag) => (
                  <Tag
                    key={tag}
                    className="bg-gray-100 text-gray-600 border-transparent hover:bg-blue-50 hover:text-blue-600"
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                <button
                  type="button"
                  className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer w-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(prompt.content);
                  }}
                >
                  复制
                </button>
                <button
                  type="button"
                  className="px-4 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer w-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(prompt);
                  }}
                >
                  分享
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Drawer
        title={selectedPrompt?.title}
        placement="right"
        size="large"
        onClose={() => {
          setDrawerOpen(false);
          setSelectedPrompt(null);
        }}
        open={drawerOpen}
      >
        {selectedPrompt && (
          <div>
            <p className="text-gray-600 mb-4">{selectedPrompt.description}</p>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {selectedPrompt.tags.map((tag) => (
                <Tag key={tag} color="blue">
                  {tag}
                </Tag>
              ))}
              <div className="flex-1" />
              <button
                type="button"
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                onClick={() => handleCopy(selectedPrompt.content)}
              >
                复制
              </button>
              <button
                type="button"
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                onClick={() => handleShare(selectedPrompt)}
              >
                分享
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg max-h-[70vh] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700">
                {selectedPrompt.content}
              </pre>
            </div>
          </div>
        )}
      </Drawer>

      <Drawer
        title="分享提示词"
        placement="bottom"
        height={300}
        onClose={() => setShowQrCode(false)}
        open={showQrCode}
      >
        {qrCodeUrl && (
          <div className="text-center">
            <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-4" />
            <p className="text-gray-500 text-sm">扫描二维码查看提示词</p>
          </div>
        )}
      </Drawer>
    </div>
  );
}
