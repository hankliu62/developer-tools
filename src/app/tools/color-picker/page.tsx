'use client';

import { CopyOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';

interface ColorFormat {
  hex: string;
  rgb: string;
  hsl: string;
  cmyk: string;
}

interface ColorHistory {
  hex: string;
  timestamp: number;
}

declare global {
  interface Window {
    EyeDropper: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}

const MAX_HISTORY = 20;
const STORAGE_KEY = 'colorPickerHistory';

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const rgbToCmyk = (r: number, g: number, b: number) => {
  if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };
  const c = 1 - r / 255;
  const m = 1 - g / 255;
  const y = 1 - b / 255;
  const k = Math.min(c, m, y);
  return {
    c: Math.round(((c - k) / (1 - k)) * 100),
    m: Math.round(((m - k) / (1 - k)) * 100),
    y: Math.round(((y - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
};

const convertColor = (hex: string): ColorFormat | null => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  return {
    hex: hex.toUpperCase(),
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
  };
};

const adjustBrightness = (hex: string, amount: number) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const r = Math.max(0, Math.min(255, rgb.r + amount));
  const g = Math.max(0, Math.min(255, rgb.g + amount));
  const b = Math.max(0, Math.min(255, rgb.b + amount));
  return (
    '#' +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
};

const getLocalColorAnalysis = (
  hex: string,
  _rgb: { r: number; g: number; b: number },
  hsl: { h: number; s: number; l: number }
) => {
  let meaning = '';
  const emotions: string[] = [];
  const useCases: string[] = [];

  if (hsl.s < 10) {
    if (hsl.l < 20) {
      meaning = '深沉的暗色调，给人神秘、稳重的感觉';
      emotions.push('神秘', '稳重', '高级');
      useCases.push('正文', '背景', ' Logo');
    } else if (hsl.l > 80) {
      meaning = '柔和的浅色调，给人轻盈、干净的感觉';
      emotions.push('清新', '干净', '温柔');
      useCases.push('背景', '卡片', '婴儿用品');
    } else {
      meaning = '中性灰色调，给人平静、专业的感觉';
      emotions.push('平静', '专业', '低调');
      useCases.push('正文', '边框', '图标');
    }
  } else if (hsl.l < 20) {
    meaning = '浓郁的深色调，给人深沉、奢华的感觉';
    emotions.push('奢华', '深沉', '优雅');
    useCases.push(' Logo', '按钮', '重点强调');
  } else if (hsl.l > 80) {
    meaning = '明亮的浅色调，给人活泼、年轻的感觉';
    emotions.push('活泼', '年轻', '明亮');
    useCases.push('背景', '装饰', '高亮');
  } else {
    const hue = hsl.h;
    if (hue < 30 || hue >= 330) {
      meaning = '温暖的红色调，给人热情、活力的感觉';
      emotions.push('热情', '活力', '温暖');
      useCases.push('按钮', '促销', ' Logo');
    } else if (hue < 60) {
      meaning = '明亮的橙色调，给人友好、创造性的感觉';
      emotions.push('友好', '创意', '快乐');
      useCases.push('按钮', '图标', '促销');
    } else if (hue < 90) {
      meaning = '明亮的黄色调，给人乐观、愉快的感觉';
      emotions.push('乐观', '愉快', '活力');
      useCases.push('警告', '高亮', '装饰');
    } else if (hue < 150) {
      meaning = '清新的绿色调，给人自然、成长的感觉';
      emotions.push('自然', '成长', '健康');
      useCases.push('成功', '环保', '自然');
    } else if (hue < 210) {
      meaning = '清澈的青色调，给人科技、理性的感觉';
      emotions.push('科技', '理性', '冷静');
      useCases.push('链接', '科技', '医疗');
    } else if (hue < 270) {
      meaning = '沉稳的蓝色调，给人专业、可信的感觉';
      emotions.push('专业', '可信', '冷静');
      useCases.push('链接', '企业', '科技');
    } else {
      meaning = '神秘的紫色调，给人创意、魔力的感觉';
      emotions.push('创意', '魔力', '优雅');
      useCases.push('女性', '创意', '奢侈');
    }
  }

  return {
    meaning,
    emotion: emotions,
    useCases,
    palette: [
      hex,
      adjustBrightness(hex, -30),
      adjustBrightness(hex, 30),
      adjustBrightness(hex, -50),
      adjustBrightness(hex, 50),
    ],
  };
};

export default function ColorPickerPage() {
  const [currentColor, setCurrentColor] = useState<ColorFormat>({
    hex: '#A78BFA',
    rgb: 'rgb(167, 139, 250)',
    hsl: 'hsl(259, 91%, 76%)',
    cmyk: 'cmyk(30%, 45%, 0%, 2%)',
  });
  const [colorHistory, setColorHistory] = useState<ColorHistory[]>([]);
  const [isPicking, setIsPicking] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{
    meaning: string;
    emotion: string[];
    useCases: string[];
    palette: string[];
  } | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [pendingColor, setPendingColor] = useState<ColorFormat | null>(null);

  const saveHistory = useCallback((history: ColorHistory[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // ignore
    }
  }, []);

  const loadHistory = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setColorHistory(JSON.parse(stored));
      }
    } catch {
      setColorHistory([]);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const analyzeWithAI = useCallback(async (hex: string) => {
    setAiLoading(true);
    try {
      const rgb = hexToRgb(hex);
      if (!rgb) return;
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'your_api_key_here') {
        setAiAnalysis(getLocalColorAnalysis(hex, rgb, hsl));
        setAiLoading(false);
        return;
      }

      const prompt = `分析颜色 #${hex} (RGB: ${rgb.r},${rgb.g},${rgb.b}, HSL: ${hsl.h}°,${hsl.s}%,${hsl.l}%):
请返回 JSON 格式的分析结果：
{
  "meaning": "颜色语义的简短描述（50字以内）",
  "emotion": ["情感关键词1", "情感关键词2", "情感关键词3"],
  "useCases": ["使用场景1", "使用场景2", "使用场景3"],
  "palette": ["#推荐色1", "#推荐色2", "#推荐色3", "#推荐色4", "#推荐色5"]
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
              responseMimeType: 'application/json',
            },
          }),
        }
      );

      if (!response.ok) {
        setAiAnalysis(getLocalColorAnalysis(hex, rgb, hsl));
        setAiLoading(false);
        return;
      }

      const data = (await response.json()) as {
        candidates?: Array<{
          content?: {
            parts?: Array<{ text?: string }>;
          };
        }>;
      };
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      let analysis: {
        meaning: string;
        emotion: string[];
        useCases: string[];
        palette: string[];
      };
      try {
        analysis = JSON.parse(text);
      } catch {
        analysis = getLocalColorAnalysis(hex, rgb, hsl);
      }

      setAiAnalysis(analysis);
    } catch {
      const rgb = hexToRgb(hex);
      if (!rgb) {
        setAiLoading(false);
        return;
      }
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setAiAnalysis(getLocalColorAnalysis(hex, rgb, hsl));
    } finally {
      setAiLoading(false);
    }
  }, []);

  useEffect(() => {
    analyzeWithAI(currentColor.hex);
  }, [currentColor.hex, analyzeWithAI]);

  const updateCurrentColor = (color: ColorFormat) => {
    setCurrentColor(color);
  };

  const addToHistory = (color: ColorFormat) => {
    const exists = colorHistory.findIndex((c) => c.hex === color.hex);
    let newHistory = [...colorHistory];
    if (exists !== -1) {
      newHistory.splice(exists, 1);
    }
    newHistory.unshift({
      hex: color.hex,
      timestamp: Date.now(),
    });
    if (newHistory.length > MAX_HISTORY) {
      newHistory = newHistory.slice(0, MAX_HISTORY);
    }
    setColorHistory(newHistory);
    saveHistory(newHistory);
  };

  const pickColor = async () => {
    const EyeDropperClass = window.EyeDropper;
    if (!EyeDropperClass) {
      message.error('您的浏览器不支持取色功能，请使用 Chrome/Edge 等浏览器');
      return;
    }

    const eyeDropper = new EyeDropperClass();
    setIsPicking(true);

    try {
      const result = await eyeDropper.open();
      const color = convertColor(result.sRGBHex);
      if (color) {
        updateCurrentColor(color);
        addToHistory(color);
        copyToClipboard(color.hex);
        message.success(`已取色: ${color.hex}`);
      }
    } catch {
      // user abort
    } finally {
      setIsPicking(false);
    }
  };

  const selectHistoryColor = (hex: string) => {
    const color = convertColor(hex);
    if (color) {
      setPendingColor(color);
    }
  };

  const confirmColor = () => {
    if (pendingColor) {
      setCurrentColor(pendingColor);
      setPendingColor(null);
    }
  };

  const cancelColor = () => {
    setPendingColor(null);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      message.error('复制失败');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-8rem)] gap-4">
      {/* 左侧栏 */}
      <aside className="w-full md:w-[300px] lg:w-[360px] bg-white rounded-xl border border-gray-200 p-6 flex-shrink-0">
        <div className="space-y-6">
          {/* 工具说明 */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <p className="text-xs text-blue-700 leading-relaxed">
              使用取色器选择颜色，或点击历史颜色。选择后点击「确认应用」更新当前颜色。
            </p>
          </div>

          {/* 当前颜色 */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-green-500 rounded-full"></span>
              当前颜色
            </h2>
            <div
              className="w-full h-[120px] rounded-xl cursor-pointer shadow-sm border border-gray-200"
              style={{ backgroundColor: currentColor.hex }}
              onClick={() => {
                copyToClipboard(currentColor.hex);
                message.success('已复制');
              }}
              title="点击复制"
            />
            <p className="text-xs text-gray-400 mt-2 text-center">点击颜色复制 HEX 值</p>
          </div>

          {/* 待确认颜色 */}
          {pendingColor && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-amber-500 rounded-full"></span>
                待确认
              </h2>
              <div
                className="w-full h-[80px] rounded-xl shadow-sm border-2 border-amber-400"
                style={{ backgroundColor: pendingColor.hex }}
              />
              <div className="flex gap-2 mt-3">
                <Button
                  type="primary"
                  onClick={confirmColor}
                  className="flex-1 bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                >
                  ✓ 确认应用
                </Button>
                <Button onClick={cancelColor} className="flex-1">
                  ✕ 取消
                </Button>
              </div>
            </div>
          )}

          {/* 颜色格式 */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
              颜色格式
            </h2>
            <div className="space-y-2">
              {[
                { label: 'HEX', value: currentColor.hex },
                { label: 'RGB', value: currentColor.rgb },
                { label: 'HSL', value: currentColor.hsl },
                { label: 'CMYK', value: currentColor.cmyk },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-500 text-xs font-medium">{item.label}</span>
                    <Button
                      type="text"
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={() => {
                        copyToClipboard(item.value);
                        message.success('已复制');
                      }}
                    />
                  </div>
                  <div className="font-mono text-xs text-gray-700 break-all leading-relaxed">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI 颜色分析 */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-indigo-500 rounded-full"></span>
              AI 颜色分析
            </h2>
            <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-xl p-4 space-y-4 border border-gray-100">
              {aiLoading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-medium text-gray-400 mb-1.5">语义描述</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {aiAnalysis?.meaning || '点击取色获取 AI 分析'}
                    </p>
                  </div>
                  {aiAnalysis?.palette && aiAnalysis.palette.length > 0 && (
                    <div>
                      <h3 className="text-xs font-medium text-gray-400 mb-1.5">推荐调色板</h3>
                      <div className="flex gap-2">
                        {aiAnalysis.palette.map((color, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-lg cursor-pointer hover:scale-110 transition-transform shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                            onClick={() => {
                              copyToClipboard(color);
                              message.success(`已复制: ${color}`);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {aiAnalysis?.useCases && aiAnalysis.useCases.length > 0 && (
                    <div>
                      <h3 className="text-xs font-medium text-gray-400 mb-1.5">使用场景</h3>
                      <div className="flex flex-wrap gap-2">
                        {aiAnalysis.useCases.map((useCase, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 text-xs bg-white text-gray-600 rounded-full border border-gray-200"
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* 右侧区域 */}
      <section className="flex-1 bg-white rounded-xl border border-gray-200 p-6">
        <div className="max-w-3xl">
          {/* 右侧标题区 */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">颜色历史</h2>
              <p className="text-sm text-gray-400 mt-1">点击颜色可选择，确认后更新到左侧</p>
            </div>
            <Button
              type="primary"
              onClick={pickColor}
              loading={isPicking}
              className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
            >
              {isPicking ? '取色中...' : '🎨 取色'}
            </Button>
          </div>

          {colorHistory.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎨</div>
              <p className="text-gray-400">暂无历史记录</p>
              <p className="text-sm text-gray-300 mt-1">点击取色开始选择颜色</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 lg:grid-cols-5 gap-3">
              {colorHistory.map((color, index) => (
                <div
                  key={index}
                  className={`w-full aspect-square rounded-lg cursor-pointer relative group transition-all hover:scale-105 ${
                    color.hex === currentColor.hex
                      ? 'ring-2 ring-green-500 ring-offset-2 shadow-md'
                      : color.hex === pendingColor?.hex
                        ? 'ring-2 ring-amber-400 ring-offset-2 shadow-md'
                        : 'hover:shadow-md'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.hex}
                  onClick={() => selectHistoryColor(color.hex)}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-lg">
                    <span className="font-mono text-xs text-white">{color.hex}</span>
                  </div>
                  {color.hex === currentColor.hex && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                  {color.hex === pendingColor?.hex && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 使用提示 */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-3">使用提示</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-lg mb-1">🎨</div>
                <p className="text-xs text-gray-600">点击「取色」从屏幕选择颜色</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-lg mb-1">👆</div>
                <p className="text-xs text-gray-600">点击历史颜色添加待确认区</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-lg mb-1">📋</div>
                <p className="text-xs text-gray-600">点击任意颜色值快速复制</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
