'use client';

import { Drawer, Input, message, Tag } from 'antd';
import copy from 'copy-to-clipboard';
import { marked } from 'marked';
import QRCode from 'qrcode';
import { useEffect, useMemo, useState } from 'react';
import { type Rule, rules } from '@/data/rules';

const FAVORITES_KEY = 'rules-favorites';

function getStoredFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
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

export default function RulesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contentViewMode, setContentViewMode] = useState<'markdown' | 'raw'>('markdown');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getStoredFavorites());
  }, []);

  const toggleFavorite = (ruleId: string) => {
    const newFavorites = favorites.includes(ruleId)
      ? favorites.filter((id) => id !== ruleId)
      : [...favorites, ruleId];
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    message.success(favorites.includes(ruleId) ? '已取消收藏' : '已添加收藏');
  };

  const filteredRules = useMemo(() => {
    const filtered = rules.filter(
      (rule) =>
        rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const withFavorite = filtered.map((rule) => ({
      ...rule,
      isFavorite: favorites.includes(rule.id),
    }));

    withFavorite.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return (b.stars || 0) - (a.stars || 0);
    });

    return withFavorite;
  }, [searchQuery, favorites]);

  const selectedRuleHtml = useMemo(() => {
    if (!selectedRule) return '';
    try {
      return marked.parse(selectedRule.content) as string;
    } catch {
      return selectedRule.content;
    }
  }, [selectedRule]);

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

  const openDetail = (rule: Rule) => {
    setSelectedRule(rule);
    setContentViewMode('markdown');
    setDrawerOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-teal-100 rounded-lg mr-2">
            📋
          </span>
          Rules 库
        </h1>
        <p className="text-gray-600">AI Rules 库</p>
      </div>

      <Input
        placeholder="搜索 Rules..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6"
        size="large"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="group relative flex flex-col bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => openDetail(rule)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-purple-50/0 to-pink-50/0 group-hover:from-indigo-50/50 group-hover:via-purple-50/30 group-hover:to-pink-50/20 transition-all duration-300" />

            <div className="relative flex flex-1 flex-col justify-between">
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Tag color="blue" className="shrink-0 text-xs">
                    {rule.category}
                  </Tag>
                  <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors flex-1 line-clamp-1">
                    {rule.title}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(rule.id);
                    }}
                    className="shrink-0 p-1 hover:scale-110 transition-transform cursor-pointer"
                    aria-label={rule.isFavorite ? '取消收藏' : '添加收藏'}
                  >
                    <svg
                      className={`w-5 h-5 ${rule.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                      viewBox="0 0 24 24"
                      fill={rule.isFavorite ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-label={rule.isFavorite ? '已收藏' : '未收藏'}
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{rule.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {rule.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag} color="orange">
                      {tag}
                    </Tag>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  {rule.stars !== undefined && rule.stars > 0 && (
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-label="stars"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {formatStars(rule.stars)}
                    </span>
                  )}
                  {rule.dateAdded && <span>{formatDate(rule.dateAdded)}</span>}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                <button
                  type="button"
                  className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer w-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(rule.content);
                  }}
                >
                  复制
                </button>
                <button
                  type="button"
                  className="px-4 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer w-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(rule);
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
        title={selectedRule?.title}
        placement="right"
        size="large"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        {selectedRule && (
          <div>
            <p className="text-gray-600 mb-4">{selectedRule.description}</p>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Tag color="blue">{selectedRule.category}</Tag>
              {selectedRule.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
              <div className="flex-1" />
              <button
                type="button"
                className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                onClick={() => handleCopy(selectedRule.content)}
              >
                复制
              </button>
              <button
                type="button"
                className="px-4 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                onClick={() => handleShare(selectedRule)}
              >
                分享
              </button>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-500">内容预览</span>
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
                {contentViewMode === 'markdown' ? '📄 原始' : '🎨 渲染'}
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg max-h-[70vh] overflow-y-auto">
              {contentViewMode === 'markdown' ? (
                <div
                  className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-code:text-pink-600 prose-code:bg-gray-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-800 prose-pre:text-gray-100"
                  dangerouslySetInnerHTML={{ __html: selectedRuleHtml }}
                />
              ) : (
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700">
                  {selectedRule.content}
                </pre>
              )}
            </div>
          </div>
        )}
      </Drawer>

      <Drawer
        title="分享 Rule"
        placement="bottom"
        height="300px"
        onClose={() => setShowQrCode(false)}
        open={showQrCode}
      >
        {qrCodeUrl && (
          <div className="text-center">
            <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-4" />
            <p className="text-gray-500 text-sm">扫描二维码查看 Rule</p>
          </div>
        )}
      </Drawer>
    </div>
  );
}
