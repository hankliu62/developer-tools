'use client';

import { Spin } from 'antd';
import { useCallback, useEffect, useState } from 'react';

interface CalendarData {
  date: string;
  weekDay: number;
  yearTips?: string;
  type?: number;
  typeDes?: string;
  chineseZodiac?: string;
  solarTerms?: string;
  lunarCalendar?: string;
  suit?: string;
  avoid?: string;
  dayOfYear?: number;
  weekOfYear?: number;
  constellation?: string;
  indexWorkDayOfMonth?: number;
}

interface CalendarDay {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

const WEEKDAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const CACHE_KEY = 'calendar_month_cache';
const CACHE_EXPIRE_DAYS = 30;

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getMonthKey(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}`;
}

function loadMonthCache(): Record<string, { data: CalendarData[]; timestamp: number }> {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    console.error('Failed to load cache');
  }
  return {};
}

function saveMonthCache(cache: Record<string, { data: CalendarData[]; timestamp: number }>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    console.error('Failed to save cache');
  }
}

function getCachedMonthData(year: number, month: number): CalendarData[] | null {
  const cache = loadMonthCache();
  const key = getMonthKey(year, month);
  const cached = cache[key];
  if (cached) {
    const now = Date.now();
    const expireTime = CACHE_EXPIRE_DAYS * 24 * 60 * 60 * 1000;
    if (now - cached.timestamp < expireTime) {
      return cached.data;
    }
  }
  return null;
}

function setCachedMonthData(year: number, month: number, data: CalendarData[]) {
  const cache = loadMonthCache();
  const key = getMonthKey(year, month);
  cache[key] = { data, timestamp: Date.now() };
  saveMonthCache(cache);
}

function getMonthDays(year: number, month: number): CalendarDay[] {
  const days: CalendarDay[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const today = new Date();
  const todayStr = formatDate(today);

  const startDay = firstDay.getDay() || 7;
  for (let i = startDay - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({
      date: formatDate(d),
      day: d.getDate(),
      isCurrentMonth: false,
      isToday: formatDate(d) === todayStr,
    });
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const d = new Date(year, month, i);
    days.push({
      date: formatDate(d),
      day: i,
      isCurrentMonth: true,
      isToday: formatDate(d) === todayStr,
    });
  }

  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    days.push({
      date: formatDate(d),
      day: i,
      isCurrentMonth: false,
      isToday: formatDate(d) === todayStr,
    });
  }

  return days;
}

function getTypeColor(type?: number): string {
  switch (type) {
    case 0:
      return 'bg-blue-100 text-blue-700';
    case 1:
      return 'bg-red-100 text-red-700';
    case 2:
      return 'bg-orange-100 text-orange-700';
    default:
      return '';
  }
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(new Date()));
  const [monthData, setMonthData] = useState<Record<string, CalendarData>>({});
  const [monthLoading, setMonthLoading] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getMonthDays(year, month);

  const selectedData = monthData[selectedDate];

  const fetchMonthData = useCallback(async (y: number, m: number) => {
    const cached = getCachedMonthData(y, m);
    if (cached) {
      const dataMap: Record<string, CalendarData> = {};
      cached.forEach((item) => {
        dataMap[item.date] = item;
      });
      setMonthData(dataMap);
      return;
    }

    setMonthLoading(true);
    try {
      const dateStr = `${y}${String(m + 1).padStart(2, '0')}`;
      const res = await fetch(`/api/calendar?date=${dateStr}`);
      const result = await res.json();
      if (result.code === 1 && result.data) {
        setCachedMonthData(y, m, result.data);
        const dataMap: Record<string, CalendarData> = {};
        result.data.forEach((item: CalendarData) => {
          dataMap[item.date] = item;
        });
        setMonthData(dataMap);
      }
    } catch (error) {
      console.error('Failed to fetch month data:', error);
    } finally {
      setMonthLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMonthData(year, month);
  }, [year, month, fetchMonthData]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(formatDate(today));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg
                aria-label="日历"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">万年历</h1>
          </div>
          <button
            type="button"
            onClick={handleToday}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            今天
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  aria-label="上个月"
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                {year}年 {month + 1}月
              </h2>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  aria-label="下个月"
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {WEEKDAYS.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <Spin spinning={monthLoading}>
              <div className="grid grid-cols-7 gap-2">
                {days.map((day) => {
                  const data = monthData[day.date];
                  const isSelected = day.date === selectedDate;
                  const typeClass = data ? getTypeColor(data.type) : '';
                  const isHoliday = data?.type === 2;

                  return (
                    <button
                      type="button"
                      key={day.date}
                      onClick={() => handleDateClick(day.date)}
                      className={`
                        relative p-2 rounded-lg text-center transition-all min-h-[80px] flex flex-col items-center justify-center cursor-pointer
                        ${!day.isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                        ${day.isToday ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}
                        ${isSelected ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'hover:bg-gray-100'}
                        ${typeClass && !isSelected ? typeClass : ''}
                      `}
                    >
                      <span className="text-lg font-medium">{day.day}</span>
                      {data && !isSelected && (
                        <>
                          <span className="text-xs truncate w-full px-1">
                            {data.lunarCalendar || ''}
                          </span>
                          {isHoliday && data.typeDes && (
                            <span className="text-xs font-medium truncate w-full px-1 text-red-600">
                              {data.typeDes}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </Spin>
          </div>

          {/* Detail Panel */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedDate} 详细信息</h3>

            {selectedData ? (
              <div className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">星期</p>
                    <p className="font-medium text-gray-900">
                      {WEEKDAYS[(selectedData.weekDay || 1) - 1]}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">类型</p>
                    <p className="font-medium text-gray-900">{selectedData.typeDes || '普通日'}</p>
                  </div>
                </div>

                {/* Lunar */}
                {selectedData.lunarCalendar && (
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-xs text-orange-600 mb-1">农历</p>
                    <p className="text-lg font-semibold text-orange-900">
                      {selectedData.lunarCalendar}
                    </p>
                  </div>
                )}

                {/* Year Tips */}
                {selectedData.yearTips && (
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <p className="text-xs text-yellow-600 mb-1">干支纪年</p>
                    <p className="font-semibold text-yellow-900">{selectedData.yearTips}</p>
                  </div>
                )}

                {/* Zodiac & Constellation */}
                <div className="grid grid-cols-2 gap-4">
                  {selectedData.chineseZodiac && (
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-xs text-purple-600 mb-1">属相</p>
                      <p className="font-medium text-purple-900">{selectedData.chineseZodiac}</p>
                    </div>
                  )}
                  {selectedData.constellation && (
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-blue-600 mb-1">星座</p>
                      <p className="font-medium text-blue-900">{selectedData.constellation}</p>
                    </div>
                  )}
                </div>

                {/* Solar Terms */}
                {selectedData.solarTerms && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-xs text-green-600 mb-1">节气</p>
                    <p className="font-medium text-green-900">{selectedData.solarTerms}</p>
                  </div>
                )}

                {/* Suit */}
                {selectedData.suit && (
                  <div className="bg-pink-50 rounded-lg p-4">
                    <p className="text-xs text-pink-600 mb-1">宜</p>
                    <p className="text-sm text-pink-900">{selectedData.suit}</p>
                  </div>
                )}

                {/* Avoid */}
                {selectedData.avoid && (
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">忌</p>
                    <p className="text-sm text-gray-700">{selectedData.avoid}</p>
                  </div>
                )}

                {/* Year/Week Info */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  {selectedData.dayOfYear !== undefined && (
                    <div>
                      <p className="text-xs text-gray-500">一年中的第几天</p>
                      <p className="font-medium text-gray-900">第{selectedData.dayOfYear}天</p>
                    </div>
                  )}
                  {selectedData.weekOfYear !== undefined && (
                    <div>
                      <p className="text-xs text-gray-500">一年中的第几周</p>
                      <p className="font-medium text-gray-900">第{selectedData.weekOfYear}周</p>
                    </div>
                  )}
                </div>

                {/* Work Day Index */}
                {selectedData.indexWorkDayOfMonth !== undefined &&
                  selectedData.indexWorkDayOfMonth > 0 && (
                    <div className="text-sm text-gray-500">
                      本月第 {selectedData.indexWorkDayOfMonth} 个工作日
                    </div>
                  )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">点击日历选择日期查看详情</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
