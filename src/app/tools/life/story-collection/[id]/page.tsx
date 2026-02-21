'use client';

import { message, Spin } from 'antd';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import AudioPlayerController from '@/components/AudioPlayerController';

interface StoryDetail {
  storyId: number;
  title: string;
  type: string;
  length: number;
  readTime: string;
  content: string;
}

interface AIContinue {
  content: string;
}

interface AISummary {
  summary: string;
}

const API_KEY_STORAGE = 'zhipu_api_key';

export default function StoryDetailPage() {
  const params = useParams();
  const storyId = params?.id as string;

  const [story, setStory] = useState<StoryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [settingsVisible, setSettingsVisible] = useState(false);

  const [ttsLoading, _setTtsLoading] = useState(false);
  const [continueLoading, setContinueLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);

  const [continueContent, setContinueContent] = useState<AIContinue | null>(null);
  const [summaryContent, setSummaryContent] = useState<AISummary | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [_currentAudio, _setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [loopCount, _setLoopCount] = useState(1);
  const [isLooping, _setIsLooping] = useState(false);
  const [_playProgress, setPlayProgress] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progressInterval, setProgressInterval] = useState<ReturnType<typeof setInterval> | null>(
    null
  );
  const [_utteranceRef, setUtteranceRef] = useState<SpeechSynthesisUtterance | null>(null);

  const loopCountRef = useRef(loopCount);
  const isLoopingRef = useRef(isLooping);

  useEffect(() => {
    loopCountRef.current = loopCount;
  }, [loopCount]);

  useEffect(() => {
    isLoopingRef.current = isLooping;
  }, [isLooping]);

  const fetchStoryDetail = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/story/details?story_id=${storyId}`);
      const result = await response.json();
      if (result.code === 1 && result.data) {
        setStory(result.data);
      } else {
        message.error(result.msg || '获取故事详情失败');
      }
    } catch {
      message.error('网络请求失败');
    } finally {
      setLoading(false);
    }
  }, [storyId]);

  useEffect(() => {
    const savedKey = localStorage.getItem(API_KEY_STORAGE);
    if (savedKey) {
      setApiKey(savedKey);
    }
    fetchStoryDetail();
  }, [fetchStoryDetail]);

  useEffect(() => {
    if (totalDuration > 0) {
      setPlayProgress((elapsedTime / totalDuration) * 100);
    }
  }, [elapsedTime, totalDuration]);

  useEffect(() => {
    const cleanup = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
    window.addEventListener('beforeunload', cleanup);
    return () => {
      window.removeEventListener('beforeunload', cleanup);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSaveApiKey = useCallback((key: string) => {
    setApiKey(key);
    localStorage.setItem(API_KEY_STORAGE, key);
    setSettingsVisible(false);
    message.success('API Key 已保存');
  }, []);

  const handleTTS = useCallback(() => {
    if (!story?.content) return;

    if (isPlaying) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        const interval = setInterval(() => {
          setElapsedTime((prev) => {
            const newTime = prev + 0.1;
            return Math.min(newTime, totalDuration);
          });
        }, 100);
        setProgressInterval(interval);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
        if (progressInterval) {
          clearInterval(progressInterval);
          setProgressInterval(null);
        }
      }
      return;
    }

    const content = story.content;
    if (!content) return;

    if (!('speechSynthesis' in window)) {
      message.error('您的浏览器不支持语音播放');
      return;
    }

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const delay = isSafari ? 500 : 100;
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.lang = 'zh-CN';
      utterance.rate = playbackRate;

      const estimatedDuration = (content.length * 0.15) / playbackRate;
      setTotalDuration(estimatedDuration);
      setElapsedTime(0);
      setPlayProgress(0);
      setUtteranceRef(utterance);

      utterance.onstart = () => {
        console.log('TTS started');
        setIsPlaying(true);
        setIsPaused(false);
        const interval = setInterval(() => {
          setElapsedTime((prev) => {
            const newTime = prev + 0.1;
            return Math.min(newTime, estimatedDuration);
          });
        }, 100);
        setProgressInterval(interval);
      };

      utterance.onend = () => {
        if (progressInterval) {
          clearInterval(progressInterval);
          setProgressInterval(null);
        }
        setIsPlaying(false);
        setIsPaused(false);
        setPlayProgress(0);
        setElapsedTime(0);
      };

      utterance.onerror = (event) => {
        console.log('TTS error:', event.error);
        if (event.error === 'canceled' || event.error === 'interrupted') {
          if (progressInterval) {
            clearInterval(progressInterval);
            setProgressInterval(null);
          }
          setIsPlaying(false);
          setIsPaused(false);
          return;
        }
        if (progressInterval) {
          clearInterval(progressInterval);
          setProgressInterval(null);
        }
        message.error('播放失败');
        setIsPlaying(false);
        setIsPaused(false);
      };

      window.speechSynthesis.speak(utterance);
    }, delay);
  }, [story, isPlaying, isPaused, progressInterval, totalDuration, playbackRate]);

  const _handlePlay = useCallback(() => {
    handleTTS();
  }, [handleTTS]);

  const _handlePause = useCallback(() => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      if (progressInterval) {
        clearInterval(progressInterval);
        setProgressInterval(null);
      }
    }
  }, [progressInterval]);

  const handleSeek = useCallback(
    (time: number) => {
      setElapsedTime(time);
      setPlayProgress(totalDuration > 0 ? (time / totalDuration) * 100 : 0);
    },
    [totalDuration]
  );

  const handlePlaybackRateChange = useCallback(
    (rate: number) => {
      setPlaybackRate(rate);
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      if (progressInterval) {
        clearInterval(progressInterval);
        setProgressInterval(null);
      }

      if (!story?.content) return;

      const content = story.content;
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.lang = 'zh-CN';
      utterance.rate = rate;

      const estimatedDuration = (content.length * 0.15) / rate;
      setTotalDuration(estimatedDuration);
      setElapsedTime(0);
      setPlayProgress(0);

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
        const interval = setInterval(() => {
          setElapsedTime((prev) => {
            const newTime = prev + 0.1;
            return Math.min(newTime, estimatedDuration);
          });
        }, 100);
        setProgressInterval(interval);
      };

      utterance.onend = () => {
        if (progressInterval) {
          clearInterval(progressInterval);
          setProgressInterval(null);
        }
        setIsPlaying(false);
        setIsPaused(false);
        setPlayProgress(0);
        setElapsedTime(0);
      };

      utterance.onerror = (event) => {
        if (event.error === 'canceled' || event.error === 'interrupted') {
          return;
        }
        if (progressInterval) {
          clearInterval(progressInterval);
          setProgressInterval(null);
        }
        setIsPlaying(false);
        setIsPaused(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    [story, progressInterval]
  );

  const handleContinue = useCallback(async () => {
    if (!apiKey) {
      setSettingsVisible(true);
      message.warning('请先配置智谱AI API Key');
      return;
    }

    if (continueContent) return;

    setContinueLoading(true);
    try {
      const response = await fetch('/api/ai/story-continue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey,
          title: story?.title || '',
          content: story?.content || '',
        }),
      });
      const result = await response.json();
      if (result.code === 1 && result.data) {
        setContinueContent(result.data);
      } else {
        message.error(result.msg || '续写失败');
      }
    } catch {
      message.error('网络请求失败');
    } finally {
      setContinueLoading(false);
    }
  }, [apiKey, story, continueContent]);

  const handleSummary = useCallback(async () => {
    if (!apiKey) {
      setSettingsVisible(true);
      message.warning('请先配置智谱AI API Key');
      return;
    }

    if (summaryContent) return;

    setSummaryLoading(true);
    try {
      const response = await fetch('/api/ai/story-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey,
          title: story?.title || '',
          content: story?.content || '',
        }),
      });
      const result = await response.json();
      if (result.code === 1 && result.data) {
        setSummaryContent(result.data);
      } else {
        message.error(result.msg || '总结失败');
      }
    } catch {
      message.error('网络请求失败');
    } finally {
      setSummaryLoading(false);
    }
  }, [apiKey, story, summaryContent]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EEF2FF]">
        <Spin size="large" />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EEF2FF]">
        <div className="text-center">
          <p className="text-gray-500 mb-4">故事不存在</p>
          <a href="/tools/life/story-collection" className="text-indigo-600 hover:underline">
            返回首页
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEF2FF]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700&display=swap');
        
        .story-detail-page {
          font-family: 'Nunito', sans-serif;
        }
        
        .story-detail-page h1, .story-detail-page h2, .story-detail-page h3 {
          font-family: 'Fredoka', sans-serif;
        }
        
        .ai-toolbar-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 24px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease-out;
          border: none;
        }
        
        .ai-toolbar-btn:hover {
          transform: scale(1.05);
        }
        
        .ai-toolbar-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>

      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a
            href="/tools/life/story-collection"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <title>返回</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            返回
          </a>
          <h1 className="text-lg font-semibold text-gray-900 truncate flex-1 text-center mx-4">
            {story.title}
          </h1>
          <button
            type="button"
            onClick={() => setSettingsVisible(true)}
            className="p-2 text-gray-400 hover:text-indigo-600"
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

        <div className="max-w-4xl mx-auto px-4 pb-3 flex items-center justify-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleTTS}
            disabled={ttsLoading}
            className="ai-toolbar-btn"
            style={{ background: 'linear-gradient(145deg, #34d399, #10b981)', color: 'white' }}
          >
            {ttsLoading ? (
              <Spin size="small" />
            ) : isPlaying ? (
              isPaused ? (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <title>继续</title>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  继续
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <title>暂停</title>
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                  暂停
                </>
              )
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <title>朗读</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
                朗读
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleContinue}
            disabled={continueLoading || !!continueContent}
            className="ai-toolbar-btn"
            style={{ background: 'linear-gradient(145deg, #818cf8, #6366f1)', color: 'white' }}
          >
            {continueLoading ? (
              <Spin size="small" />
            ) : continueContent ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <title>已续写</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                已续写
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
                  <title>续写</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                续写
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleSummary}
            disabled={summaryLoading || !!summaryContent}
            className="ai-toolbar-btn"
            style={{ background: 'linear-gradient(145deg, #fb923c, #f97316)', color: 'white' }}
          >
            {summaryLoading ? (
              <Spin size="small" />
            ) : summaryContent ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <title>已总结</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                已总结
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
                  <title>总结</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                总结
              </>
            )}
          </button>
        </div>

        {isPlaying && (
          <div className="max-w-4xl mx-auto px-4 pb-3">
            <AudioPlayerController
              isPlaying={isPlaying}
              isPaused={isPaused}
              currentTime={elapsedTime}
              duration={totalDuration}
              playbackRate={playbackRate}
              onSeek={handleSeek}
              onPlaybackRateChange={handlePlaybackRateChange}
            />
          </div>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="mb-4 pb-4 border-b border-gray-100">
            <p className="text-sm text-gray-500">
              {story.type} · {story.readTime} · {story.length}字
            </p>
          </div>

          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{story.content}</p>
          </div>

          {continueContent && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <title>AI续写</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                AI 续写
              </h3>
              <div className="bg-indigo-50 rounded-xl p-4">
                <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {continueContent.content}
                </p>
              </div>
            </div>
          )}

          {summaryContent && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-orange-700 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <title>故事寓意</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                故事寓意
              </h3>
              <div className="bg-orange-50 rounded-xl p-4">
                <p className="text-gray-700 leading-relaxed">{summaryContent.summary}</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {settingsVisible && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSettingsVisible(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1E1B4B' }}>
              智谱AI API Key 配置
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              请输入您的智谱AI API Key，用于AI续写和总结功能。
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
            <input
              type="password"
              placeholder="请输入智谱AI API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSettingsVisible(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => handleSaveApiKey(apiKey)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
