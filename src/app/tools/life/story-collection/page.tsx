'use client';

import {
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CompassOutlined,
  CrownOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  FireOutlined,
  HeartOutlined,
  HistoryOutlined,
  MoonOutlined,
  RightOutlined,
  RocketOutlined,
  SearchOutlined,
  SmileOutlined,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Badge, Button, Card, Input, message, Spin, Tag } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';

interface StoryType {
  name: string;
  type_id: number;
}

interface Story {
  storyId: number;
  title: string;
  type: string;
  length: number;
  readTime: string;
}

const CACHE_KEY = 'story_types_cache';
const CACHE_EXPIRE_DAYS = 30;
const REQUEST_INTERVAL = 5500;

interface CacheData {
  data: StoryType[];
  timestamp: number;
}

function loadTypesCache(): CacheData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed: CacheData = JSON.parse(cached);
      const now = Date.now();
      const expireTime = CACHE_EXPIRE_DAYS * 24 * 60 * 60 * 1000;
      if (now - parsed.timestamp < expireTime) {
        return parsed;
      }
    }
  } catch {
    console.error('Failed to load cache');
  }
  return null;
}

function saveTypesCache(data: StoryType[]) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch {
    console.error('Failed to save cache');
  }
}

// 分类图标映射
const typeIcons: Record<string, React.ReactNode> = {
  睡前故事: <MoonOutlined />,
  童话故事: <CrownOutlined />,
  寓言故事: <CheckCircleOutlined />,
  成语故事: <BookOutlined />,
  神话故事: <FireOutlined />,
  民间故事: <EnvironmentOutlined />,
  历史故事: <HistoryOutlined />,
  科幻故事: <RocketOutlined />,
  冒险故事: <CompassOutlined />,
  友情故事: <TeamOutlined />,
  亲情故事: <HeartOutlined />,
  动物故事: <SmileOutlined />,
};

export default function StoryCollectionPage() {
  const [types, setTypes] = useState<StoryType[]>([]);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [cooldownTime, setCooldownTime] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const hasFetchedTypes = useRef(false);
  const isFetching = useRef(false);
  const lastRequestTime = useRef<number>(0);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchTypes = useCallback(async () => {
    if (hasFetchedTypes.current) return;
    hasFetchedTypes.current = true;

    const cached = loadTypesCache();
    if (cached) {
      setTypes(cached.data);
      return;
    }

    try {
      const response = await fetch('/api/story/types');
      const result = await response.json();
      if (result.code === 1 && result.data) {
        setTypes(result.data);
        saveTypesCache(result.data);
      }
    } catch {
      message.error('获取分类失败');
    }
  }, []);

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  // 倒计时显示
  useEffect(() => {
    if (cooldownTime > 0) {
      cooldownTimerRef.current = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            if (cooldownTimerRef.current) {
              clearInterval(cooldownTimerRef.current);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (cooldownTimerRef.current) {
        clearInterval(cooldownTimerRef.current);
      }
    };
  }, [cooldownTime]);

  const fetchStories = useCallback(
    async (pageNum: number, append = false) => {
      if (isFetching.current) return;

      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime.current;

      if (timeSinceLastRequest < REQUEST_INTERVAL && lastRequestTime.current > 0) {
        const waitTime = Math.ceil((REQUEST_INTERVAL - timeSinceLastRequest) / 1000);
        setCooldownTime(waitTime);

        setTimeout(() => {
          fetchStories(pageNum, append);
        }, REQUEST_INTERVAL - timeSinceLastRequest);
        return;
      }

      isFetching.current = true;
      lastRequestTime.current = Date.now();
      setCooldownTime(0);

      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      try {
        let url = `/api/story?page=${pageNum}`;
        if (selectedType !== null) {
          url += `&type_id=${selectedType}`;
        }
        if (keyword) {
          url += `&keyword=${encodeURIComponent(keyword)}`;
        }

        const response = await fetch(url);
        const result = await response.json();

        if (result.code === 1 && result.data) {
          const storyList = result.data.list || result.data;
          if (append) {
            setStories((prev) => [...prev, ...storyList]);
          } else {
            setStories(storyList);
          }
          setHasMore(storyList.length >= 10);
          setPage(pageNum);
        } else {
          if (!append) {
            setStories([]);
          }
          setHasMore(false);

          if (result.msg && result.msg.includes('QPS')) {
            message.warning('请求太频繁，请稍后再试');
          }
        }
      } catch {
        message.error('获取故事失败');
        if (!append) {
          setStories([]);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
        isFetching.current = false;
      }
    },
    [selectedType, keyword]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setPage(1);
    setStories([]);
    setHasMore(true);
    fetchStories(1);
  }, [selectedType, keyword]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loadingMore &&
          !loading &&
          !isFetching.current &&
          cooldownTime === 0
        ) {
          fetchStories(page + 1, true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, page, cooldownTime, fetchStories]);

  const handleSearch = useCallback(() => {
    const trimmed = searchInput.trim();
    setKeyword(trimmed);
  }, [searchInput]);

  const handleTypeClick = useCallback((typeId: number | null) => {
    setSelectedType(typeId);
    setKeyword('');
    setSearchInput('');
  }, []);

  const getTypeIcon = (typeName: string) => {
    return typeIcons[typeName] || <BookOutlined />;
  };

  return (
    <div className="max-w-5xl mx-auto min-h-screen px-4 py-8 bg-gray-50">
      {/* 标题区域 */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-500 rounded-2xl mb-4 shadow-lg">
          <BookOutlined className="text-2xl text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">故事会</h1>
        <p className="text-gray-500 text-sm">发现精彩故事，开启想象力之旅</p>
      </div>

      {/* 搜索框 - Ant Design Input.Search */}
      <div className="mb-6">
        <Input.Search
          placeholder="搜索故事标题..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={handleSearch}
          enterButton={
            <Button type="primary" icon={<SearchOutlined />} disabled={cooldownTime > 0}>
              搜索
            </Button>
          }
          size="large"
          className="story-search"
          disabled={cooldownTime > 0}
        />
      </div>

      {/* 分类选择器 - 使用 Ant Design Button */}
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 category-scroll">
          <Button
            type={selectedType === null ? 'primary' : 'default'}
            icon={<StarOutlined />}
            onClick={() => handleTypeClick(null)}
            className="rounded-full flex-shrink-0"
            size="middle"
          >
            全部
          </Button>

          {types.map((type) => (
            <Button
              key={type.type_id}
              type={selectedType === type.type_id ? 'primary' : 'default'}
              icon={getTypeIcon(type.name)}
              onClick={() => handleTypeClick(type.type_id)}
              className="rounded-full flex-shrink-0"
              size="middle"
            >
              {type.name}
            </Button>
          ))}
        </div>
      </div>

      {/* 冷却倒计时提示 */}
      {cooldownTime > 0 && (
        <div className="mb-4 text-center">
          <Badge
            count={`请等待 ${cooldownTime} 秒后加载更多`}
            style={{ backgroundColor: '#faad14', color: '#fff' }}
          />
        </div>
      )}

      {/* 故事列表 - 使用 Ant Design Card */}
      <div className="space-y-3 pb-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Spin size="large" />
            <p className="text-gray-400 mt-4 text-sm">正在加载故事...</p>
          </div>
        ) : stories.length === 0 ? (
          <Card className="text-center py-12 border-dashed">
            <SearchOutlined className="text-4xl text-gray-300 mb-4 block" />
            <p className="text-gray-600 font-medium">没有找到相关故事</p>
            <p className="text-gray-400 text-sm mt-1">试试其他关键词或分类</p>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {stories.map((story) => (
                <Card
                  key={story.storyId}
                  className="story-card cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() =>
                    window.open(`/tools/life/story-collection/${story.storyId}`, '_blank')
                  }
                  bodyStyle={{ padding: '16px' }}
                  bordered
                >
                  <div className="flex items-center gap-4">
                    {/* 类型图标 */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">
                      {getTypeIcon(story.type)}
                    </div>

                    {/* 故事信息 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 truncate text-base">
                        {story.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                        <Tag className="m-0">{story.type}</Tag>
                        <span className="flex items-center gap-1">
                          <ClockCircleOutlined />
                          {story.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileTextOutlined />
                          {story.length}字
                        </span>
                      </div>
                    </div>

                    {/* 箭头 */}
                    <RightOutlined className="text-gray-300 flex-shrink-0" />
                  </div>
                </Card>
              ))}
            </div>

            {/* 加载更多区域 */}
            <div ref={loaderRef} className="py-6 text-center">
              {loadingMore ? (
                <div className="flex flex-col items-center">
                  <Spin />
                  <p className="text-gray-400 text-sm mt-2">加载更多故事...</p>
                </div>
              ) : cooldownTime > 0 ? (
                <div className="flex flex-col items-center text-gray-400">
                  <Badge
                    count={`冷却中 ${cooldownTime}s`}
                    style={{ backgroundColor: '#faad14' }}
                    className="mb-2"
                  />
                  <p className="text-xs">API请求频率限制，请稍候</p>
                </div>
              ) : !hasMore && stories.length > 0 ? (
                <div className="flex flex-col items-center text-gray-400">
                  <p className="text-sm">已经到底啦，没有更多故事了</p>
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        .story-search .ant-input {
          border-radius: 8px 0 0 8px !important;
        }

        .story-search .ant-input-group-addon {
          background: transparent;
          border: none;
        }

        .story-search .ant-btn {
          border-radius: 0 8px 8px 0 !important;
          height: 40px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .story-card {
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .story-card:hover {
          border-color: #6366f1;
          transform: translateY(-1px);
        }

        /* 滚动条美化 */
        .category-scroll::-webkit-scrollbar {
          height: 4px;
        }

        .category-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .category-scroll::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 2px;
        }

        .category-scroll::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
