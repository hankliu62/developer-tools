"use client";

import { useState } from "react";
import { Input, Modal, Button, message, Tag } from "antd";
import copy from "copy-to-clipboard";
import QRCode from "qrcode";
import { skills, type Skill } from "@/data/skills";

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);

  const filteredSkills = skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (content: string) => {
    copy(content);
    message.success("复制成功");
  };

  const handleShare = async (skill: Skill) => {
    const shareUrl = `${window.location.origin}/skills?skill=${encodeURIComponent(
      JSON.stringify({ name: skill.name, content: skill.content })
    )}`;

    try {
      const qrCode = await QRCode.toDataURL(shareUrl);
      setQrCodeUrl(qrCode);
      setSelectedSkill(skill);
      setShowQrCode(true);
    } catch {
      message.error("生成二维码失败");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Skills</h1>
      </div>

      <Input
        placeholder="搜索 Skills..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6"
        size="large"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
            onClick={() => setSelectedSkill(skill)}
          >
            <h3 className="font-medium text-gray-900 mb-2">{skill.name}</h3>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{skill.description}</p>
            <div className="flex items-center justify-between">
              <Tag color="green">{skill.category}</Tag>
              <div className="flex gap-2">
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(skill.content);
                  }}
                >
                  复制
                </Button>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(skill);
                  }}
                >
                  分享
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      <Modal
        open={!!selectedSkill}
        onCancel={() => setSelectedSkill(null)}
        footer={null}
        width={800}
        title={selectedSkill?.name}
      >
        {selectedSkill && (
          <div>
            <div className="mb-4">
              <p className="text-gray-600">{selectedSkill.description}</p>
            </div>
            <div className="mb-4">
              <Tag color="green">{selectedSkill.category}</Tag>
              <Tag className="ml-2">来源: {selectedSkill.source}</Tag>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {selectedSkill.content}
              </pre>
            </div>
            <div className="flex gap-2">
              <Button
                type="primary"
                onClick={() => handleCopy(selectedSkill.content)}
              >
                复制
              </Button>
              <Button onClick={() => handleShare(selectedSkill)}>分享</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* QR Code Modal */}
      <Modal
        open={showQrCode}
        onCancel={() => setShowQrCode(false)}
        footer={null}
        title="分享 Skill"
      >
        {qrCodeUrl && (
          <div className="text-center">
            <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-4" />
            <p className="text-gray-500 text-sm">扫描二维码查看 Skill</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
