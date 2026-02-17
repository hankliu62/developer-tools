'use client';

import Link from 'next/link';
import Hero from '@/components/Hero';
import { type Category, categories, type Tool } from '@/constants/navigation';

const categoryColors: Record<string, string> = {
  crypto: '#fff',
  converter: '#f8fafc',
  web: '#fff',
  cron: '#f8fafc',
  network: '#fff',
  math: '#f8fafc',
  text: '#fff',
  dev: '#f8fafc',
  validator: '#fff',
  ai: '#f8fafc',
};

export default function HomePage() {
  return (
    <div className="-m-6">
      <Hero />
      <div className="bg-gray-50">
        {categories.map((category: Category) => (
          <div
            key={category.type}
            className="px-6 py-12 md:px-12 md:py-16"
            style={{ backgroundColor: categoryColors[category.type] || '#fff' }}
          >
            <h2 className="mb-8 text-center text-2xl md:text-3xl font-medium text-gray-800">
              {category.name}
            </h2>
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {category.children.map((tool: Tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group relative flex flex-col rounded-xl bg-white p-5 border border-gray-200 shadow-sm hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-purple-50/0 group-hover:from-indigo-50/50 group-hover:to-purple-50/30 transition-all duration-300" />

                  <div className="relative flex items-start">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                      {getToolEmoji(tool.icon)}
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <p className="truncate text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {tool.name}
                      </p>
                      <p
                        className="mt-1 truncate text-xs font-medium"
                        style={{ color: getStatusColor(tool.status) }}
                      >
                        {getStatusText(tool.status)}
                      </p>
                    </div>
                  </div>
                  <div className="relative mt-4 h-12 overflow-hidden">
                    <p className="line-clamp-2 text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                      {tool.description}
                    </p>
                  </div>
                  <div className="relative mt-4 flex items-center justify-between overflow-hidden">
                    <p className="truncate text-xs text-gray-400">{tool.href}</p>
                    <span className="whitespace-nowrap text-xs font-medium text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      立即使用 →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getToolEmoji(icon: string): string {
  const emojis: Record<string, string> = {
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
    'i-carbon-network-enterprise': '🏢',
    'i-carbon-search': '🔍',
    'i-carbon-subnet': '🕸️',
    'i-carbon-port': '🔌',
    'i-carbon-calculator': '🧮',
    'i-carbon-percentage': '📊',
    'i-carbon-timer': '⏱️',
    'i-carbon-text-mining': '📊',
    'i-carbon-text-tracking': '👁️',
    'i-carbon-text-font': '🔤',
    'i-carbon-face-wink': '😉',
    'i-carbon-compare': '⚖️',
    'i-carbon-email': '✉️',
    'i-carbon-phone': '📱',
    'i-carbon-text-small-caps': '🅰️',
    'i-carbon-text-fill': '📄',
    'i-carbon-sql': '🗃️',
    'i-carbon-minimize': '📦',
    'i-carbon-regex': '🔍',
    'i-carbon-notebook-reference': '📓',
    'i-carbon-terminal': '💻',
    'i-carbon-branch': '🌿',
    'i-carbon-container-software': '🐳',
    'i-carbon-meter': '⏱️',
    'i-carbon-bank': '🏦',
    'i-carbon-ai': '🤖',
    'i-carbon-chat': '💬',
    'i-carbon-tool-kit': '🧰',
    'i-carbon-rule': '📏',
  };
  return emojis[icon] || '📦';
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    normal: '#249ffd',
    new: '#52de97',
    hot: '#fa5477',
  };
  return colors[status] || colors.normal;
}

function getStatusText(status: string): string {
  const texts: Record<string, string> = {
    normal: '服务正常',
    new: '新服务',
    hot: '热门服务',
  };
  return texts[status] || texts.normal;
}
