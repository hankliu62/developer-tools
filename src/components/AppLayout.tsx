'use client';

import { Breadcrumb, Input, type InputRef, Menu, type MenuProps } from 'antd';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { categories, type Tool } from '@/constants/navigation';
import { getRoutePrefix } from '@/lib/route';

const Footer = dynamic(() => import('@hankliu/rc-footer'), {
  ssr: false,
});

interface AppLayoutProps {
  children: React.ReactNode;
}

const categoryIcons: Record<string, React.ReactNode> = {
  crypto: '🔐',
  converter: '🔄',
  web: '💻',
  cron: '⏰',
  network: '🌐',
  math: '🧮',
  text: '📝',
  dev: '🛠️',
  validator: '✅',
  ai: '🤖',
};

const toolEmojis: Record<string, string> = {
  // Crypto
  'i-carbon-key': '🔑',
  'i-carbon-hash': '#️⃣',
  'i-carbon-password': '🔐',
  'i-carbon-identification': '🆔',
  'i-carbon-locked': '🔒',
  'i-carbon-book': '📖',
  'i-carbon-security': '🛡️',
  'i-carbon-document-signed': '✍️',
  'i-carbon-qr-code': '📲',
  'i-carbon-wifi': '📶',
  // Converter
  'i-carbon-time': '⏰',
  'i-carbon-number': '🔢',
  'i-carbon-text-number-format': '🔢',
  'i-carbon-text-kernel': '📜',
  'i-carbon-color-palette': '🎨',
  'i-carbon-text-capitalize': '🔤',
  'i-carbon-character-whole': '🔤',
  'i-carbon-data-binary': '0️⃣',
  'i-carbon-data-structured': '🗂️',
  'i-carbon-document': '📄',
  'i-carbon-document-markdown': '📝',
  'i-carbon-document-attachment': '📎',
  'i-carbon-list-bulleted': '📋',
  'i-carbon-temperature': '🌡️',
  'i-carbon-csv': '📊',
  // Web
  'i-carbon-link': '🔗',
  'i-carbon-code': '💻',
  'i-carbon-device-laptop': '💻',
  'i-carbon-user-avatar': '👤',
  'i-carbon-share': '📤',
  'i-carbon-token': '🎫',
  'i-carbon-keyboard': '⌨️',
  'i-carbon-text-link': '🔗',
  'i-carbon-text-annotation-toggle': '🖊️',
  'i-carbon-network-4': '🌐',
  'i-carbon-image': '🖼️',
  // Network
  'i-carbon-network-enterprise': '🏢',
  'i-carbon-search': '🔍',
  'i-carbon-subnet': '🕸️',
  'i-carbon-port': '🔌',
  // Math
  'i-carbon-calculator': '🧮',
  'i-carbon-percentage': '📊',
  'i-carbon-timer': '⏱️',
  // Text
  'i-carbon-text-mining': '📊',
  'i-carbon-text-tracking': '👁️',
  'i-carbon-text-font': '🔤',
  'i-carbon-face-wink': '😉',
  'i-carbon-compare': '⚖️',
  'i-carbon-email': '✉️',
  'i-carbon-phone': '📱',
  'i-carbon-text-small-caps': '🅰️',
  'i-carbon-text-fill': '📄',
  // Dev
  'i-carbon-sql': '🗃️',
  'i-carbon-minimize': '📦',
  'i-carbon-regex': '🔍',
  'i-carbon-notebook-reference': '📓',
  'i-carbon-terminal': '💻',
  'i-carbon-branch': '🌿',
  'i-carbon-container-software': '🐳',
  'i-carbon-meter': '⏱️',
  // Validator
  'i-carbon-bank': '🏦',
  // AI
  'i-carbon-ai': '🤖',
  'i-carbon-chat': '💬',
  'i-carbon-tool-kit': '🧰',
  'i-carbon-rule': '📏',
};

export function getToolIcon(icon: string): string {
  return toolEmojis[icon] || '📦';
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const searchInputRef = useRef<InputRef>(null);

  const allTools = categories.flatMap((cat) => cat.children);

  useEffect(() => {
    if (searchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchExpanded]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      if (value.trim()) {
        const query = value.toLowerCase();
        const filtered = allTools.filter(
          (tool) =>
            tool.name.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query)
        );
        setFilteredTools(filtered);
        setShowSearchResults(true);
      } else {
        setShowSearchResults(false);
      }
    },
    [allTools]
  );

  const handleToolClick = (href: string) => {
    router.push(href);
    setSearchQuery('');
    setShowSearchResults(false);
    setSearchExpanded(false);
  };

  const handleSearchBlur = () => {
    if (!searchQuery) {
      setSearchExpanded(false);
    }
    setTimeout(() => setShowSearchResults(false), 200);
  };

  const getBreadcrumbItems = () => {
    const items: { title: React.ReactNode }[] = [{ title: <Link href="/">首页</Link> }];

    if (pathname.startsWith('/tools/')) {
      const tool = allTools.find((t) => t.href === pathname);
      if (tool) {
        const category = categories.find((c) => c.children.some((t) => t.href === pathname));
        if (category) {
          items.push({ title: category.name });
        }
        items.push({ title: tool.name });
      }
    } else {
      const tool = allTools.find((t) => t.href === pathname);
      if (tool) {
        const category = categories.find((c) => c.children.some((t) => t.href === pathname));
        if (category) {
          items.push({ title: category.name });
        }
        items.push({ title: tool.name });
      }
    }

    return items;
  };

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      label: (
        <Link href="/" className="flex items-center gap-2">
          <span>🏠</span>
          <span>首页</span>
        </Link>
      ),
    },
    ...categories.map((category) => ({
      key: category.type,
      label: (
        <span className="flex items-center gap-2">
          <span>{categoryIcons[category.type] || '📁'}</span>
          <span>{category.name}</span>
        </span>
      ),
      children: category.children.map((tool: Tool) => ({
        key: tool.href,
        label: (
          <Link href={tool.href} className="flex items-center gap-2">
            <span>{getToolIcon(tool.icon)}</span>
            <span>{tool.name}</span>
          </Link>
        ),
      })),
    })),
  ];

  // 默认打开的菜单
  const defaultOpenKeys = useMemo(() => {
    return categories.map((c) => c.type);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 flex-shrink-0">
        <Link href="/" className="flex items-center gap-3 w-64 flex-shrink-0">
          <Image
            src={`${getRoutePrefix()}/favicon.ico`}
            alt="Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-lg font-semibold text-gray-900">Developer Tools</span>
        </Link>

        {/* Search - aligned with main content */}
        <div className="relative">
          {/* Search button */}
          <button
            type="button"
            onClick={() => setSearchExpanded(true)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer ${
              searchExpanded ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'
            }`}
            aria-label="搜索工具"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-sm text-gray-600">搜索工具</span>
          </button>

          {/* Expanded search input */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 left-0 transition-all duration-300 ${
              searchExpanded ? 'opacity-100 w-[480px]' : 'opacity-0 w-0 pointer-events-none'
            }`}
          >
            <Input
              ref={searchInputRef}
              placeholder="搜索工具名称或描述..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setSearchExpanded(true)}
              onBlur={handleSearchBlur}
              className="w-full"
              size="large"
              allowClear
              prefix={
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
            />

            {showSearchResults && filteredTools.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                {filteredTools.map((tool) => (
                  <div
                    key={tool.href + tool.name}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onMouseDown={() => handleToolClick(tool.href)}
                  >
                    <div className="font-medium text-gray-900">{tool.name}</div>
                    <div className="text-sm text-gray-500">{tool.description}</div>
                  </div>
                ))}
              </div>
            )}

            {showSearchResults && searchQuery && filteredTools.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
                <div className="text-gray-500 text-center">未找到相关工具</div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto scrollbar-hide">
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            defaultOpenKeys={defaultOpenKeys}
            items={menuItems}
            className="border-r-0"
          />
        </aside>

        {/* Main Content with Footer */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            {/* Breadcrumb */}
            {pathname !== '/' && <Breadcrumb items={getBreadcrumbItems()} className="mb-4" />}
            {children}
            {/* Footer */}
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
