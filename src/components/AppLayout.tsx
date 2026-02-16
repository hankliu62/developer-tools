"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Input, Menu, Breadcrumb } from "antd";
import { ToolOutlined, HomeOutlined } from "@ant-design/icons";
import { categories, toolModules, type Category, type Tool } from "@/constants/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

const categoryIcons: Record<string, React.ReactNode> = {
  crypto: "🔐",
  converter: "🔄",
  web: "💻",
  cron: "⏰",
};

const toolEmojis: Record<string, string> = {
  "i-carbon-key": "🔑",
  "i-carbon-hash": "#️⃣",
  "i-carbon-password": "🔐",
  "i-carbon-identification": "🆔",
  "i-carbon-locked": "🔒",
  "i-carbon-book": "📖",
  "i-carbon-security": "🛡️",
  "i-carbon-time": "⏰",
  "i-carbon-number": "🔢",
  "i-carbon-text-number-format": "🔢",
  "i-carbon-text-kernel": "📝",
  "i-carbon-color-palette": "🎨",
  "i-carbon-text-capitalize": "Aa",
  "i-carbon-character-whole": "🔤",
  "i-carbon-data-binary": "💾",
  "i-carbon-data-structured": "📊",
  "i-carbon-document": "📄",
  "i-carbon-code": "💻",
  "i-carbon-link": "🔗",
  "i-carbon-device-laptop": "💻",
  "i-carbon-user-avatar": "👤",
  "i-carbon-share": "📤",
  "i-carbon-token": "🎫",
  "i-carbon-keyboard": "⌨️",
  "i-carbon-text-link": "🔗",
  "i-carbon-document-markdown": "📝",
};

export function getToolIcon(icon: string): string {
  return toolEmojis[icon] || "📦";
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const allTools = categories.flatMap((cat) => cat.children);

  const handleSearchChange = useCallback((value: string) => {
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
  }, [allTools]);

  const handleToolClick = (href: string) => {
    router.push(href);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const getBreadcrumbItems = () => {
    const items: { title: React.ReactNode }[] = [{ title: <Link href="/">首页</Link> }];

    if (pathname.startsWith("/tools/")) {
      const tool = allTools.find(t => t.href === pathname);
      if (tool) {
        const category = categories.find(c => c.children.some(t => t.href === pathname));
        if (category) {
          items.push({ title: category.name });
        }
        items.push({ title: tool.name });
      } else if (pathname === "/tools/ai-prompt-optimizer") {
        items.push({ title: "AI 工具" });
        items.push({ title: "AI 提示词优化" });
      }
    } else if (pathname === "/prompts") {
      items.push({ title: "AI 工具" });
      items.push({ title: "提示词" });
    } else if (pathname === "/skills") {
      items.push({ title: "AI 工具" });
      items.push({ title: "Skills" });
    } else if (pathname === "/rules") {
      items.push({ title: "AI 工具" });
      items.push({ title: "Rules" });
    }

    return items;
  };

  const menuItems = [
    {
      key: "/",
      label: (
        <Link href="/" className="flex items-center gap-2">
          <HomeOutlined />
          <span>首页</span>
        </Link>
      ),
    },
    ...categories.map((category: Category) => ({
      key: category.type,
      label: (
        <span className="flex items-center gap-2">
          <span>{categoryIcons[category.type] || "📁"}</span>
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
    { type: "divider" as const },
    {
      key: "ai-tools",
      label: (
        <span className="flex items-center gap-2">
          <span>🤖</span>
          <span>AI 工具</span>
        </span>
      ),
      children: [
        {
          key: "/prompts",
          label: (
            <Link href="/prompts" className="flex items-center gap-2">
              <span>💬</span>
              <span>提示词</span>
            </Link>
          ),
        },
        {
          key: "/skills",
          label: (
            <Link href="/skills" className="flex items-center gap-2">
              <span>🛠️</span>
              <span>Skills</span>
            </Link>
          ),
        },
        {
          key: "/rules",
          label: (
            <Link href="/rules" className="flex items-center gap-2">
              <span>📋</span>
              <span>Rules</span>
            </Link>
          ),
        },
        {
          key: "/tools/ai-prompt-optimizer",
          label: (
            <Link href="/tools/ai-prompt-optimizer" className="flex items-center gap-2">
              <span>✨</span>
              <span>提示词优化</span>
            </Link>
          ),
        },
      ],
    },
  ];

  // 默认打开的菜单
  const defaultOpenKeys = useMemo(() => {
    return [...categories.map((c) => c.type), 'ai-tools']
  }, [])

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 flex-shrink-0">
        <Link href="/" className="flex items-center gap-3 mr-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DT</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">Developer Tools</span>
        </Link>

        <div className="flex-1 max-w-xl relative">
          <Input
            placeholder="搜索工具..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full"
            size="large"
            allowClear
          />

          {showSearchResults && filteredTools.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
              {filteredTools.map((tool) => (
                <div
                  key={tool.href + tool.name}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleToolClick(tool.href)}
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
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 flex-shrink-0">
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            defaultOpenKeys={defaultOpenKeys}
            items={menuItems}
            className="h-full border-none"
            style={{ height: "100%", overflowY: "auto" }}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Breadcrumb */}
          <Breadcrumb items={getBreadcrumbItems()} className="mb-4" />
          {children}
        </main>
      </div>
    </div>
  );
}
