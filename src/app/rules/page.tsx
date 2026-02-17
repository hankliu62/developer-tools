'use client';

import { Button, Input, Modal, message, Tag } from 'antd';
import copy from 'copy-to-clipboard';
import QRCode from 'qrcode';
import { useState } from 'react';
import { type Rule, rules } from '@/data/rules';

export default function RulesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);

  const filteredRules = rules.filter(
    (rule) =>
      rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCopy = (content: string) => {
    copy(content);
    message.success('复制成功');
  };

  const handleShare = async (rule: Rule) => {
    const shareUrl = `${window.location.origin}/rules?rule=${encodeURIComponent(
      JSON.stringify({ title: rule.title, content: rule.content })
    )}`;

    try {
      const qrCode = await QRCode.toDataURL(shareUrl);
      setQrCodeUrl(qrCode);
      setSelectedRule(rule);
      setShowQrCode(true);
    } catch {
      message.error('生成二维码失败');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Rules</h1>
      </div>

      <Input
        placeholder="搜索 Rules..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6"
        size="large"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
            onClick={() => setSelectedRule(rule)}
          >
            <h3 className="font-medium text-gray-900 mb-2">{rule.title}</h3>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{rule.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {rule.tags.slice(0, 3).map((tag) => (
                <Tag key={tag} color="orange">
                  {tag}
                </Tag>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(rule.content);
                }}
              >
                复制
              </Button>
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(rule);
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
        open={!!selectedRule}
        onCancel={() => setSelectedRule(null)}
        footer={null}
        width={800}
        title={selectedRule?.title}
      >
        {selectedRule && (
          <div>
            <div className="mb-4">
              <p className="text-gray-600">{selectedRule.description}</p>
            </div>
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                <Tag color="orange">{selectedRule.category}</Tag>
                {selectedRule.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm">{selectedRule.content}</pre>
            </div>
            <div className="flex gap-2">
              <Button type="primary" onClick={() => handleCopy(selectedRule.content)}>
                复制
              </Button>
              <Button onClick={() => handleShare(selectedRule)}>分享</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* QR Code Modal */}
      <Modal
        open={showQrCode}
        onCancel={() => setShowQrCode(false)}
        footer={null}
        title="分享 Rule"
      >
        {qrCodeUrl && (
          <div className="text-center">
            <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-4" />
            <p className="text-gray-500 text-sm">扫描二维码查看 Rule</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
