'use client';

import { Button, DatePicker, Drawer, Input, Modal, message, Select, Tag } from 'antd';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import { marked } from 'marked';
import QRCode from 'qrcode';
import { useEffect, useMemo, useState } from 'react';
import { skills as defaultSkills, type Skill } from '@/data/skills';

const FAVORITES_KEY = 'skills-favorites';
const CUSTOM_SKILLS_KEY = 'skills-custom';
const API_KEY_STORAGE = 'skills-api-key';
const API_MODEL_STORAGE = 'skills-api-model';

function getStoredFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

function getStoredCustomSkills(): Skill[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CUSTOM_SKILLS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function isChinese(text: string): boolean {
  return /[\u4e00-\u9fa5]/.test(text);
}

function formatStars(stars?: number): string {
  if (!stars) return '0';
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(1)}k`;
  }
  return stars.toString();
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isZh, setIsZh] = useState(true);
  const [customSkills, setCustomSkills] = useState<Skill[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiModel, setApiModel] = useState('gemini');
  const [translating, setTranslating] = useState(false);
  const [contentViewMode, setContentViewMode] = useState<'markdown' | 'raw'>('markdown');
  const [newSkill, setNewSkill] = useState<{
    name: string;
    nameZh: string;
    description: string;
    descriptionZh: string;
    content: string;
    contentZh: string;
    category: string;
    categoryZh: string;
    source: string;
    installCommand: string;
    stars: number;
    dateAdded: string;
  }>({
    name: '',
    nameZh: '',
    description: '',
    descriptionZh: '',
    content: '',
    contentZh: '',
    category: '',
    categoryZh: '',
    source: '',
    installCommand: '',
    stars: 0,
    dateAdded: dayjs().format('YYYY-MM-DD'),
  });

  const allSkills = useMemo(() => [...defaultSkills, ...customSkills], [customSkills]);

  useEffect(() => {
    setFavorites(getStoredFavorites());
    setCustomSkills(getStoredCustomSkills());
    setApiKey(localStorage.getItem(API_KEY_STORAGE) || '');
    setApiModel(localStorage.getItem(API_MODEL_STORAGE) || 'gemini');
  }, []);

  const toggleFavorite = (skillId: string) => {
    const newFavorites = favorites.includes(skillId)
      ? favorites.filter((id) => id !== skillId)
      : [...favorites, skillId];
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    message.success(favorites.includes(skillId) ? '已取消收藏' : '已添加收藏');
  };

  const sortedSkills = useMemo(() => {
    const filtered = allSkills.filter((skill) => {
      const name = isZh ? skill.nameZh || skill.name : skill.name;
      const desc = isZh ? skill.descriptionZh || skill.description : skill.description;
      const category = isZh ? skill.categoryZh || skill.category : skill.category;
      const searchLower = searchQuery.toLowerCase();
      return (
        name.toLowerCase().includes(searchLower) ||
        desc.toLowerCase().includes(searchLower) ||
        category.toLowerCase().includes(searchLower)
      );
    });

    const withFavorite = filtered.map((skill) => ({
      ...skill,
      isFavorite: favorites.includes(skill.id),
    }));

    withFavorite.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return (b.stars || 0) - (a.stars || 0);
    });

    return withFavorite;
  }, [allSkills, searchQuery, favorites, isZh]);

  const getSkillContent = (skill: Skill) => {
    if (isZh && skill.contentZh) {
      return skill.contentZh;
    }
    return skill.content;
  };

  const selectedSkillHtml = useMemo(() => {
    if (!selectedSkill) return '';
    const content =
      isZh && selectedSkill.contentZh ? selectedSkill.contentZh : selectedSkill.content;
    try {
      return marked.parse(content) as string;
    } catch {
      return content;
    }
  }, [selectedSkill, isZh]);

  const handleCopy = (content: string) => {
    copy(content);
    message.success('复制成功');
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
      message.error('生成二维码失败');
    }
  };

  const handleInstall = (skill: Skill) => {
    if (skill.installCommand) {
      copy(skill.installCommand);
      message.success(`安装命令已复制: ${skill.installCommand}`);
    }
  };

  const openDetail = (skill: Skill) => {
    setSelectedSkill(skill);
    setContentViewMode('markdown');
    setDrawerOpen(true);
  };

  const autoTranslate = async () => {
    if (!apiKey) {
      message.warning('请先设置 API Key');
      setSettingsModalOpen(true);
      return;
    }

    setTranslating(true);
    try {
      const desc = newSkill.description.trim();
      const content = newSkill.content.trim();
      const category = newSkill.category.trim();
      const name = newSkill.name.trim();

      const results: Partial<typeof newSkill> = {};

      if (name && isChinese(name)) {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: name, targetLang: 'en', apiKey, model: apiModel }),
        });
        const data = await res.json();
        if (data.translatedText) results.nameZh = data.translatedText;
      } else if (name && !isChinese(name)) {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: name, targetLang: 'zh', apiKey, model: apiModel }),
        });
        const data = await res.json();
        if (data.translatedText) results.nameZh = data.translatedText;
      }

      if (desc && isChinese(desc)) {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: desc, targetLang: 'en', apiKey, model: apiModel }),
        });
        const data = await res.json();
        if (data.translatedText) results.descriptionZh = data.translatedText;
      } else if (desc && !isChinese(desc)) {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: desc, targetLang: 'zh', apiKey, model: apiModel }),
        });
        const data = await res.json();
        if (data.translatedText) results.descriptionZh = data.translatedText;
      }

      if (content && isChinese(content)) {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: content, targetLang: 'en', apiKey, model: apiModel }),
        });
        const data = await res.json();
        if (data.translatedText) results.contentZh = data.translatedText;
      } else if (content && !isChinese(content)) {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: content, targetLang: 'zh', apiKey, model: apiModel }),
        });
        const data = await res.json();
        if (data.translatedText) results.contentZh = data.translatedText;
      }

      if (category && isChinese(category)) {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: category, targetLang: 'en', apiKey, model: apiModel }),
        });
        const data = await res.json();
        if (data.translatedText) results.categoryZh = data.translatedText;
      } else if (category && !isChinese(category)) {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: category, targetLang: 'zh', apiKey, model: apiModel }),
        });
        const data = await res.json();
        if (data.translatedText) results.categoryZh = data.translatedText;
      }

      setNewSkill((prev) => ({ ...prev, ...results }));
      message.success('翻译完成');
    } catch (error) {
      message.error(`翻译失败: ${(error as Error).message}`);
    } finally {
      setTranslating(false);
    }
  };

  const formatContent = (content: string): string => {
    const lines = content.split('\n');
    const formatted: string[] = [];
    let inCodeBlock = false;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        formatted.push(trimmed);
        continue;
      }

      if (!inCodeBlock) {
        if (trimmed === '' && formatted[formatted.length - 1] === '') continue;

        if (trimmed.startsWith('#')) {
          const match = trimmed.match(/^(#+)\s*(.*)/);
          if (match) {
            formatted.push('');
            formatted.push(trimmed);
            formatted.push('');
            continue;
          }
        }

        if (trimmed.match(/^[-*]\s/) || trimmed.match(/^\d+\.\s/)) {
          if (formatted[formatted.length - 1] !== '') {
            formatted.push('');
          }
          formatted.push(trimmed);
          continue;
        }

        if (trimmed.match(/^\|/)) {
          formatted.push(trimmed);
          continue;
        }

        formatted.push(trimmed);
      } else {
        formatted.push(trimmed);
      }
    }

    while (formatted[formatted.length - 1] === '') {
      formatted.pop();
    }

    return formatted.join('\n').replace(/\n{3,}/g, '\n\n');
  };

  const handleAddSkill = () => {
    if (!newSkill.name || !newSkill.description || !newSkill.content) {
      message.warning('请填写名称、描述和内容');
      return;
    }

    const formattedContent = formatContent(newSkill.content);
    const formattedContentZh = newSkill.contentZh ? formatContent(newSkill.contentZh) : '';

    const skill: Skill = {
      id: `custom-${Date.now()}`,
      name: newSkill.name.trim(),
      nameZh: newSkill.nameZh?.trim() || undefined,
      description: newSkill.description.trim(),
      descriptionZh: newSkill.descriptionZh?.trim() || undefined,
      content: formattedContent,
      contentZh: formattedContentZh || undefined,
      category: newSkill.category.trim(),
      categoryZh: newSkill.categoryZh?.trim() || undefined,
      source: newSkill.source.trim() || 'custom',
      installCommand: newSkill.installCommand?.trim() || undefined,
      stars: newSkill.stars || undefined,
      dateAdded: newSkill.dateAdded,
    };

    const updated = [...customSkills, skill];
    setCustomSkills(updated);
    localStorage.setItem(CUSTOM_SKILLS_KEY, JSON.stringify(updated));
    setAddModalOpen(false);
    setNewSkill({
      name: '',
      nameZh: '',
      description: '',
      descriptionZh: '',
      content: '',
      contentZh: '',
      category: '',
      categoryZh: '',
      source: '',
      installCommand: '',
      stars: 0,
      dateAdded: dayjs().format('YYYY-MM-DD'),
    });
    message.success('添加成功');
  };

  const saveApiSettings = () => {
    localStorage.setItem(API_KEY_STORAGE, apiKey);
    localStorage.setItem(API_MODEL_STORAGE, apiModel);
    setSettingsModalOpen(false);
    message.success('设置已保存');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI Skills</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSettingsModalOpen(true)}
            className="px-3 py-1.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            ⚙️
          </button>
          <button
            type="button"
            onClick={() => setIsZh(!isZh)}
            className="px-3 py-1.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            {isZh ? 'English' : '中文'}
          </button>
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="px-3 py-1.5 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
          >
            {isZh ? '+ 添加' : '+ Add'}
          </button>
        </div>
      </div>

      <Input
        placeholder={isZh ? '搜索 Skills...' : 'Search Skills...'}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6"
        size="large"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedSkills.map((skill) => (
          <div
            key={skill.id}
            className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => openDetail(skill)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-purple-50/0 to-pink-50/0 group-hover:from-indigo-50/50 group-hover:via-purple-50/30 group-hover:to-pink-50/20 transition-all duration-300" />

            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors pr-2">
                  {isZh ? skill.nameZh || skill.name : skill.name}
                </h3>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(skill.id);
                  }}
                  className="shrink-0 p-1 hover:scale-110 transition-transform cursor-pointer"
                  aria-label={
                    skill.isFavorite
                      ? isZh
                        ? '取消收藏'
                        : 'Remove from favorites'
                      : isZh
                        ? '添加收藏'
                        : 'Add to favorites'
                  }
                >
                  <svg
                    className={`w-5 h-5 ${skill.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                    viewBox="0 0 24 24"
                    fill={skill.isFavorite ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-gray-500 mb-3 line-clamp-2 h-10">
                {isZh ? skill.descriptionZh || skill.description : skill.description}
              </p>

              <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                {skill.stars !== undefined && skill.stars > 0 && (
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {formatStars(skill.stars)}
                  </span>
                )}
                {skill.dateAdded && <span>{formatDate(skill.dateAdded)}</span>}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                {skill.installCommand ? (
                  <button
                    type="button"
                    className="px-4 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInstall(skill);
                    }}
                  >
                    {isZh ? '一键安装' : 'Install'}
                  </button>
                ) : (
                  <div className="w-20" />
                )}
                <button
                  type="button"
                  className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(skill.content);
                  }}
                >
                  {isZh ? '复制内容' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Drawer
        title={isZh ? selectedSkill?.nameZh || selectedSkill?.name : selectedSkill?.name}
        placement="right"
        size="large"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        {selectedSkill && (
          <div>
            <p className="text-gray-600 mb-4">
              {isZh
                ? selectedSkill.descriptionZh || selectedSkill.description
                : selectedSkill.description}
            </p>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Tag color="blue">
                {isZh ? selectedSkill.categoryZh || selectedSkill.category : selectedSkill.category}
              </Tag>
              <Tag>{selectedSkill.source}</Tag>
              {selectedSkill.stars !== undefined && selectedSkill.stars > 0 && (
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 text-yellow-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-label="stars"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {formatStars(selectedSkill.stars)}
                </span>
              )}
              {selectedSkill.dateAdded && (
                <span className="text-sm text-gray-400">{formatDate(selectedSkill.dateAdded)}</span>
              )}
              <div className="flex-1" />
              <button
                type="button"
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                onClick={() => handleCopy(getSkillContent(selectedSkill))}
              >
                {isZh ? '复制内容' : 'Copy'}
              </button>
              <button
                type="button"
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                onClick={() => handleShare(selectedSkill)}
              >
                {isZh ? '分享' : 'Share'}
              </button>
            </div>
            {selectedSkill.installCommand && (
              <div className="mb-4 p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                <div className="text-sm text-indigo-600 mb-2 font-medium">
                  {isZh ? '安装命令' : 'Install Command'}
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-sm bg-white px-3 py-2 rounded border border-indigo-200 font-mono overflow-x-auto">
                    {selectedSkill.installCommand}
                  </code>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                    onClick={() => handleInstall(selectedSkill)}
                  >
                    {isZh ? '复制' : 'Copy'}
                  </button>
                </div>
              </div>
            )}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-500">{isZh ? '内容预览' : 'Content Preview'}</span>
              <button
                type="button"
                className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  contentViewMode === 'markdown'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() =>
                  setContentViewMode(contentViewMode === 'markdown' ? 'raw' : 'markdown')
                }
              >
                {contentViewMode === 'markdown'
                  ? isZh
                    ? '📄 原始'
                    : '📄 Raw'
                  : isZh
                    ? '🎨 渲染'
                    : '🎨 Render'}
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg max-h-[60vh] overflow-y-auto">
              {contentViewMode === 'markdown' ? (
                <div
                  className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-code:text-pink-600 prose-code:bg-gray-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-800 prose-pre:text-gray-100"
                  dangerouslySetInnerHTML={{ __html: selectedSkillHtml }}
                />
              ) : (
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700">
                  {getSkillContent(selectedSkill)}
                </pre>
              )}
            </div>
          </div>
        )}
      </Drawer>

      <Drawer
        title={isZh ? '分享 Skill' : 'Share Skill'}
        placement="bottom"
        height="300px"
        onClose={() => setShowQrCode(false)}
        open={showQrCode}
      >
        {qrCodeUrl && (
          <div className="text-center">
            <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-4" />
            <p className="text-gray-500 text-sm">
              {isZh ? '扫描二维码查看 Skill' : 'Scan QR code to view Skill'}
            </p>
          </div>
        )}
      </Drawer>

      <Modal
        title={
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-label="add"
            >
              <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{isZh ? '添加 Skill' : 'Add Skill'}</span>
          </div>
        }
        open={addModalOpen}
        onCancel={() => setAddModalOpen(false)}
        footer={
          <div className="flex justify-end gap-2 pt-2">
            <Button onClick={autoTranslate} loading={translating}>
              {isZh ? '🔄 自动翻译缺失字段' : '🔄 Auto Translate'}
            </Button>
            <Button type="primary" onClick={handleAddSkill}>
              {isZh ? '保存' : 'Save'}
            </Button>
          </div>
        }
        width={700}
        className="add-skill-modal"
      >
        <div className="space-y-4 pr-2" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <div>
            <label className="block text-sm font-medium mb-1">
              <span className="text-red-500">*</span> 名称 (Name)
            </label>
            <Input
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder={isZh ? '如: frontend-design' : 'e.g., frontend-design'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              <span className="text-red-500">*</span> 描述 (Description)
            </label>
            <Input.TextArea
              value={newSkill.description}
              onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
              placeholder={isZh ? '英文描述' : 'English description'}
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">描述中文</label>
            <Input.TextArea
              value={newSkill.descriptionZh}
              onChange={(e) => setNewSkill({ ...newSkill, descriptionZh: e.target.value })}
              placeholder={isZh ? '自动翻译' : 'Chinese description'}
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">分类 (Category)</label>
            <Input
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              placeholder={isZh ? '如: Development' : 'e.g., Development'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              <span className="text-red-500">*</span> 内容 (Content)
            </label>
            <Input.TextArea
              value={newSkill.content}
              onChange={(e) => setNewSkill({ ...newSkill, content: e.target.value })}
              placeholder={isZh ? '英文内容' : 'English content'}
              rows={6}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">内容中文</label>
            <Input.TextArea
              value={newSkill.contentZh}
              onChange={(e) => setNewSkill({ ...newSkill, contentZh: e.target.value })}
              placeholder={isZh ? '自动翻译' : 'Chinese content'}
              rows={6}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">来源 (Source)</label>
              <Input
                value={newSkill.source}
                onChange={(e) => setNewSkill({ ...newSkill, source: e.target.value })}
                placeholder="github/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">安装命令</label>
              <Input
                value={newSkill.installCommand}
                onChange={(e) => setNewSkill({ ...newSkill, installCommand: e.target.value })}
                placeholder="npx skills add ..."
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">GitHub Stars</label>
              <Input
                type="number"
                value={newSkill.stars}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, stars: parseInt(e.target.value, 10) || 0 })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">添加日期</label>
              <DatePicker
                value={newSkill.dateAdded ? dayjs(newSkill.dateAdded) : undefined}
                onChange={(date) =>
                  setNewSkill({ ...newSkill, dateAdded: date?.format('YYYY-MM-DD') || '' })
                }
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title={isZh ? 'API 设置' : 'API Settings'}
        open={settingsModalOpen}
        onCancel={() => setSettingsModalOpen(false)}
        onOk={saveApiSettings}
        okText={isZh ? '保存' : 'Save'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">翻译 API Key</label>
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={isZh ? '输入 Google/Gemini/OpenAI API Key' : 'Enter API Key'}
              type="password"
            />
            <p className="text-xs text-gray-500 mt-1">
              {isZh
                ? '支持 Google Translate, Gemini, OpenAI, 智谱 GLM'
                : 'Supports Google Translate, Gemini, OpenAI, Zhipu GLM'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">API Model</label>
            <Select
              value={apiModel}
              onChange={setApiModel}
              className="w-full"
              options={[
                { value: 'gemini', label: 'Google Gemini (推荐)' },
                { value: 'google', label: 'Google Translate' },
                { value: 'openai', label: 'OpenAI' },
                { value: 'bigmodel', label: '智谱 GLM' },
              ]}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
