'use client';

import { Input, Modal, message, Spin } from 'antd';
import { useCallback, useEffect, useState } from 'react';

interface HistoryEvent {
  picUrl: string;
  title: string;
  year: string;
  month: number;
  day: number;
  details: string;
}

interface AIInterpretation {
  summary: string;
  expansion: string[];
  fun_fact: string[];
}

const CACHE_KEY = 'history_events_cache';
const API_KEY_STORAGE = 'zhipu_api_key';
const CACHE_EXPIRE_DAYS = 30;

interface CacheData {
  data: HistoryEvent[];
  timestamp: number;
}

function loadCache(): CacheData | null {
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

function saveCache(data: HistoryEvent[]) {
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

function getCachedData(): HistoryEvent[] | null {
  const cached = loadCache();
  return cached ? cached.data : null;
}

function setCachedData(data: HistoryEvent[]) {
  saveCache(data);
}

export default function TodayInHistoryPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentDay, setCurrentDay] = useState(today.getDate());
  const [events, setEvents] = useState<HistoryEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState<number | null>(null);
  const [interpretations, setInterpretations] = useState<Record<number, AIInterpretation>>({});
  const [apiKey, setApiKey] = useState('');
  const [settingsVisible, setSettingsVisible] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem(API_KEY_STORAGE);
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = useCallback((key: string) => {
    setApiKey(key);
    localStorage.setItem(API_KEY_STORAGE, key);
    setSettingsVisible(false);
    message.success('API Key 已保存');
  }, []);

  const fetchHistoryEvents = useCallback(async () => {
    const cached = getCachedData();
    if (cached) {
      setEvents(cached);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/history-today');
      const result = await response.json();

      if (result.code === 1 && result.data) {
        setEvents(result.data);
        setCachedData(result.data);
      } else {
        setEvents([]);
        message.error(result.msg || '获取历史事件失败');
      }
    } catch {
      message.error('网络请求失败');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const [expandedEvents, setExpandedEvents] = useState<Set<number>>(new Set());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  useEffect(() => {
    fetchHistoryEvents();
  }, [fetchHistoryEvents]);

  const handlePrevDay = useCallback(() => {
    const newDate = new Date(currentYear, currentMonth - 1, currentDay - 1);
    setCurrentYear(newDate.getFullYear());
    setCurrentMonth(newDate.getMonth() + 1);
    setCurrentDay(newDate.getDate());
  }, [currentMonth, currentDay, currentYear]);

  const handleNextDay = useCallback(() => {
    const newDate = new Date(currentYear, currentMonth - 1, currentDay + 1);
    setCurrentYear(newDate.getFullYear());
    setCurrentMonth(newDate.getMonth() + 1);
    setCurrentDay(newDate.getDate());
  }, [currentMonth, currentDay, currentYear]);

  const handleToggleExpand = useCallback((index: number) => {
    setExpandedEvents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const handleAIInterpretation = useCallback(
    async (event: HistoryEvent, index: number) => {
      if (!apiKey) {
        setSettingsVisible(true);
        message.warning('请先配置智谱AI API Key');
        return;
      }

      if (interpretations[index]) {
        setExpandedEvents((prev) => new Set(prev).add(index));
        return;
      }

      setAiLoading(index);
      try {
        const response = await fetch('/api/ai/history-interpretation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            apiKey,
            title: event.title,
            year: event.year,
            month: event.month,
            day: event.day,
            details: event.details,
          }),
        });

        const result = await response.json();

        if (result.code === 1 && result.data) {
          setInterpretations((prev) => ({ ...prev, [index]: result.data }));
          setExpandedEvents((prev) => new Set(prev).add(index));
        } else {
          message.error(result.msg || 'AI解读生成失败');
        }
      } catch {
        message.error('网络请求失败');
      } finally {
        setAiLoading(null);
      }
    },
    [apiKey, interpretations]
  );

  const getDateDisplay = () => {
    return `${currentMonth}月${currentDay}日`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700&display=swap');
        
        .history-page {
          font-family: 'Nunito', sans-serif;
          background: #EEF2FF;
          min-height: 100vh;
          padding: 24px;
        }
        
        .history-page h1, .history-page h2, .history-page h3 {
          font-family: 'Fredoka', sans-serif;
        }
        
        .clay-card {
          background: #ffffff;
          border-radius: 20px;
          border: 3px solid #e5e7eb;
          box-shadow: 
            8px 8px 16px #d1d5db,
            -8px -8px 16px #ffffff;
          transition: all 0.2s ease-out;
        }
        
        .clay-card:hover {
          box-shadow: 
            10px 10px 20px #d1d5db,
            -10px -10px 20px #ffffff;
        }
        
        .event-card {
          background: #ffffff;
          border-radius: 16px;
          border: 2px solid #e5e7eb;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s ease-out;
          box-shadow: 4px 4px 8px #d1d5db, -4px -4px 8px #ffffff;
        }
        
        .event-card:hover {
          transform: translateY(-2px);
          box-shadow: 6px 6px 12px #d1d5db, -6px -6px 12px #ffffff;
        }
        
        .ai-badge {
          background: linear-gradient(145deg, #fb923c, #f97316);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease-out;
        }
        
        .ai-badge:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
        }
        
        .ai-badge:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>

      <div className="mb-8 text-center">
        <div className="relative">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#1E1B4B' }}>
            <span className="inline-flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg mr-2">
              📜
            </span>
            历史上的今天
          </h1>
          <button
            type="button"
            onClick={() => setSettingsVisible(true)}
            className="absolute right-0 top-0 p-2 text-gray-400 hover:text-indigo-600 transition-colors"
            title="设置"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <title>设置</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
        <p style={{ color: '#6b7280' }}>查看历史上今天发生的重要事件，AI智能解读</p>
      </div>

      <div className="clay-card p-5 mb-6">
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={handlePrevDay}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
            aria-label="前一天"
          >
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <title>前一天</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <h2
            className="text-2xl font-bold"
            style={{
              color: '#1E1B4B',
              fontFamily: 'Fredoka, sans-serif',
              minWidth: '140px',
              textAlign: 'center',
            }}
          >
            {getDateDisplay()}
          </h2>

          <button
            type="button"
            onClick={handleNextDay}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
            aria-label="后一天"
          >
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <title>后一天</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        ) : events.length === 0 ? (
          <div className="clay-card p-8 text-center text-gray-500">暂无历史事件数据</div>
        ) : (
          events.map((event, index) => (
            <div key={index} className="event-card">
              <div onClick={() => handleToggleExpand(index)} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg" style={{ color: '#1E1B4B' }}>
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {event.year}年{event.month}月{event.day}日
                    </p>
                    {!expandedEvents.has(index) && event.details && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {event.details.replace(/[\s\n]+/g, ' ').slice(0, 100)}...
                      </p>
                    )}
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedEvents.has(index) ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <title>展开</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {expandedEvents.has(index) && (
                <div className="px-5 pb-5 border-t border-gray-100">
                  <div className="pt-4">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap mb-4 leading-relaxed">
                      {event.details}
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAIInterpretation(event, index);
                      }}
                      disabled={aiLoading === index}
                      className="ai-badge"
                    >
                      {aiLoading === index ? (
                        <>
                          <Spin size="small" />
                          AI解读生成中...
                        </>
                      ) : interpretations[index] ? (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <title>已生成</title>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          查看AI解读
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <title>AI</title>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          AI智能解读
                        </>
                      )}
                    </button>

                    {interpretations[index] && (
                      <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <div className="mb-4">
                          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                            要点总结
                          </span>
                          <p className="text-sm text-gray-800 mt-2 leading-relaxed">
                            {interpretations[index].summary}
                          </p>
                        </div>

                        {interpretations[index].expansion.length > 0 && (
                          <div className="mb-4">
                            <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                              扩展知识
                            </span>
                            <ul className="mt-2 space-y-2">
                              {interpretations[index].expansion.map((item, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-gray-700 flex items-start gap-2"
                                >
                                  <span className="text-indigo-500 mt-1 flex-shrink-0">•</span>
                                  <span className="leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {interpretations[index].fun_fact.length > 0 && (
                          <div>
                            <span className="text-xs font-semibold text-orange-700 uppercase tracking-wide">
                              趣味解说
                            </span>
                            <ul className="mt-2 space-y-2">
                              {interpretations[index].fun_fact.map((item, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-gray-700 flex items-start gap-2"
                                >
                                  <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
                                  <span className="leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <Modal
        title="智谱AI API Key 配置"
        open={settingsVisible}
        onCancel={() => setSettingsVisible(false)}
        footer={null}
        centered
      >
        <div className="py-4">
          <p className="text-sm text-gray-600 mb-4">
            请输入您的智谱AI API Key，用于AI智能解读功能。
            <br />
            <a
              href="https://open.bigmodel.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              获取API Key
            </a>
          </p>
          <Input.Password
            placeholder="请输入智谱AI API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mb-4"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setSettingsVisible(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              取消
            </button>
            <button
              type="button"
              onClick={() => handleSaveApiKey(apiKey)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
