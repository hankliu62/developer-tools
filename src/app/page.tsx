"use client";

import Link from "next/link";
import { categories, type Category, type Tool } from "@/constants/navigation";
import { getToolIcon } from "@/components/AppLayout";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">所有工具</h1>

      {categories.map((category: Category) => (
        <div key={category.type} className="mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">{getCategoryIcon(category.type)}</span>
            <span>{category.name}</span>
            <span className="text-sm font-normal text-gray-500">
              ({category.children.length})
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {category.children.map((tool: Tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">{getToolIcon(tool.icon)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{tool.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{tool.href}</span>
                  <StatusBadge status={tool.status} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function getCategoryIcon(type: string): string {
  const icons: Record<string, string> = {
    crypto: "🔐",
    converter: "🔄",
    web: "💻",
    cron: "⏰",
  };
  return icons[type] || "📁";
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    normal: { label: "正常", className: "bg-blue-50 text-blue-600" },
    new: { label: "新", className: "bg-green-50 text-green-600" },
    hot: { label: "热门", className: "bg-red-50 text-red-600" },
  };

  const { label, className } = config[status] || config.normal;

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${className}`}>
      {label}
    </span>
  );
}
