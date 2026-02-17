'use client';

import { Button, Input, Modal, message, Tag } from 'antd';
import copy from 'copy-to-clipboard';
import QRCode from 'qrcode';
import { useState } from 'react';
import { type Prompt, prompts } from '@/data/prompts';

export default function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
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
            className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
            onClick={() => setSelectedPrompt(prompt)}
          >
            <h3 className="font-medium text-gray-900 mb-2">{prompt.title}</h3>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{prompt.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {prompt.tags.slice(0, 3).map((tag) => (
                <Tag key={tag} color="blue">
                  {tag}
                </Tag>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(prompt.content);
                }}
              >
                复制
              </Button>
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(prompt);
                }}
              >
                分享
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      <Modal
        open={!!selectedPrompt}
        onCancel={() => setSelectedPrompt(null)}
        footer={null}
        width={800}
        title={selectedPrompt?.title}
      >
        {selectedPrompt && (
          <div>
            <div className="mb-4">
              <p className="text-gray-600">{selectedPrompt.description}</p>
            </div>
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {selectedPrompt.tags.map((tag) => (
                  <Tag key={tag} color="blue">
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <pre className="whitespace-pre-wrap font-mono text-sm">{selectedPrompt.content}</pre>
            </div>
            <div className="flex gap-2">
              <Button type="primary" onClick={() => handleCopy(selectedPrompt.content)}>
                复制
              </Button>
              <Button onClick={() => handleShare(selectedPrompt)}>分享</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* QR Code Modal */}
      <Modal
        open={showQrCode}
        onCancel={() => setShowQrCode(false)}
        footer={null}
        title="分享提示词"
      >
        {qrCodeUrl && (
          <div className="text-center">
            <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-4" />
            <p className="text-gray-500 text-sm">扫描二维码查看提示词</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
