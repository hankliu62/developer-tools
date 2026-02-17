'use client';
import { Input, Tag } from 'antd';
import { useState } from 'react';

interface HttpStatusCode {
  code: number;
  phrase: string;
  description: string;
  category: string;
}

const statusCodes: HttpStatusCode[] = [
  { code: 100, phrase: 'Continue', description: '客户端可以继续请求', category: '信息' },
  { code: 101, phrase: 'Switching Protocols', description: '服务器切换协议', category: '信息' },
  { code: 102, phrase: 'Processing', description: '请求正在处理', category: '信息' },

  { code: 200, phrase: 'OK', description: '请求成功', category: '成功' },
  { code: 201, phrase: 'Created', description: '资源创建成功', category: '成功' },
  { code: 202, phrase: 'Accepted', description: '请求已接受', category: '成功' },
  { code: 204, phrase: 'No Content', description: '请求成功，无返回内容', category: '成功' },
  { code: 206, phrase: 'Partial Content', description: '部分内容', category: '成功' },

  { code: 301, phrase: 'Moved Permanently', description: '永久重定向', category: '重定向' },
  { code: 302, phrase: 'Found', description: '临时重定向', category: '重定向' },
  { code: 303, phrase: 'See Other', description: '查看其他位置', category: '重定向' },
  { code: 304, phrase: 'Not Modified', description: '未修改，使用缓存', category: '重定向' },
  { code: 307, phrase: 'Temporary Redirect', description: '临时重定向', category: '重定向' },
  { code: 308, phrase: 'Permanent Redirect', description: '永久重定向', category: '重定向' },

  { code: 400, phrase: 'Bad Request', description: '请求语法错误', category: '客户端错误' },
  { code: 401, phrase: 'Unauthorized', description: '需要身份认证', category: '客户端错误' },
  { code: 403, phrase: 'Forbidden', description: '拒绝访问', category: '客户端错误' },
  { code: 404, phrase: 'Not Found', description: '资源不存在', category: '客户端错误' },
  { code: 405, phrase: 'Method Not Allowed', description: '不允许的方法', category: '客户端错误' },
  { code: 408, phrase: 'Request Timeout', description: '请求超时', category: '客户端错误' },
  { code: 409, phrase: 'Conflict', description: '请求冲突', category: '客户端错误' },
  { code: 413, phrase: 'Payload Too Large', description: '请求体过大', category: '客户端错误' },
  { code: 414, phrase: 'URI Too Long', description: 'URI 过长', category: '客户端错误' },
  {
    code: 415,
    phrase: 'Unsupported Media Type',
    description: '不支持的媒体类型',
    category: '客户端错误',
  },
  {
    code: 422,
    phrase: 'Unprocessable Entity',
    description: '无法处理的实体',
    category: '客户端错误',
  },
  {
    code: 429,
    phrase: 'Too Many Requests',
    description: '请求过多，限流中',
    category: '客户端错误',
  },

  {
    code: 500,
    phrase: 'Internal Server Error',
    description: '服务器内部错误',
    category: '服务器错误',
  },
  { code: 501, phrase: 'Not Implemented', description: '未实现', category: '服务器错误' },
  { code: 502, phrase: 'Bad Gateway', description: '网关错误', category: '服务器错误' },
  { code: 503, phrase: 'Service Unavailable', description: '服务不可用', category: '服务器错误' },
  { code: 504, phrase: 'Gateway Timeout', description: '网关超时', category: '服务器错误' },
];

const categories = ['全部', '信息', '成功', '重定向', '客户端错误', '服务器错误'];
const categoryColors: Record<string, string> = {
  信息: 'blue',
  成功: 'green',
  重定向: 'orange',
  客户端错误: 'red',
  服务器错误: 'purple',
};

export default function HttpStatusCodesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedCode, setSelectedCode] = useState<HttpStatusCode | null>(null);

  const filteredCodes = statusCodes.filter((code) => {
    const matchSearch =
      search === '' ||
      code.code.toString().includes(search) ||
      code.phrase.toLowerCase().includes(search.toLowerCase()) ||
      code.description.includes(search);
    const matchCategory = selectedCategory === '全部' || code.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleCodeClick = (code: HttpStatusCode) => {
    setSelectedCode(code);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🌐 HTTP 状态码参考</h1>
        <p className="text-gray-600">HTTP 状态码快速查询与参考</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索状态码或描述..."
              size="large"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Tag
                key={cat}
                color={selectedCategory === cat ? 'blue' : 'default'}
                className="cursor-pointer px-3 py-1"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredCodes.map((code) => (
            <div
              key={code.code}
              onClick={() => handleCodeClick(code)}
              className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                selectedCode?.code === code.code
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-lg">{code.code}</span>
                <Tag color={categoryColors[code.category]} className="text-xs">
                  {code.category}
                </Tag>
              </div>
              <div className="text-sm text-gray-600 truncate">{code.phrase}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedCode && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📋 状态码详情</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-5">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl font-bold text-blue-600">{selectedCode.code}</span>
              <div>
                <div className="text-xl font-semibold">{selectedCode.phrase}</div>
                <Tag color={categoryColors[selectedCode.category]}>{selectedCode.category}</Tag>
              </div>
            </div>
            <div className="text-gray-600">{selectedCode.description}</div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 HTTP 状态码分类</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/50 rounded-lg p-3">
            <div className="font-semibold text-blue-700 mb-1">1xx 信息</div>
            <div className="text-blue-800">请求处理中的临时响应</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <div className="font-semibold text-green-700 mb-1">2xx 成功</div>
            <div className="text-green-800">请求成功处理</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <div className="font-semibold text-orange-700 mb-1">3xx 重定向</div>
            <div className="text-orange-800">需要进一步操作完成请求</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <div className="font-semibold text-red-700 mb-1">4xx 客户端错误</div>
            <div className="text-red-800">请求有误或无法处理</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <div className="font-semibold text-purple-700 mb-1">5xx 服务器错误</div>
            <div className="text-purple-800">服务器处理失败</div>
          </div>
        </div>
      </div>
    </div>
  );
}
