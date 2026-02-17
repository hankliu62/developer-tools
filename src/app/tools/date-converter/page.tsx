'use client';
import { Button, Card, DatePicker, Input, message, TimePicker } from 'antd';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

const outputFormats = [
  { label: '标准格式', format: 'YYYY-MM-DD HH:mm:ss', value: '2024-01-01 12:30:45' },
  { label: '日期', format: 'YYYY-MM-DD', value: '2024-01-01' },
  { label: '时间', format: 'HH:mm:ss', value: '12:30:45' },
  { label: '日期时间(中文)', format: 'YYYY年MM月DD日 HH:mm:ss', value: '2024年01月01日 12:30:45' },
  { label: 'ISO 8601', format: 'ISO', value: '2024-01-01T04:30:45.000Z' },
  { label: 'Unix时间戳(秒)', format: 'X', value: '1704096645' },
  { label: 'Unix时间戳(毫秒)', format: 'x', value: '1704096645000' },
  {
    label: 'RFC 2822',
    format: 'ddd, DD MMM YYYY HH:mm:ss ZZ',
    value: 'Mon, 01 Jan 2024 12:30:45 +0000',
  },
  { label: '完整日期', format: 'dddd, MMMM D, YYYY', value: 'Monday, January 1, 2024' },
  { label: '短日期', format: 'MM/DD/YYYY', value: '01/01/2024' },
  { label: '欧洲日期', format: 'DD/MM/YYYY', value: '01/01/2024' },
  { label: '月日', format: 'MMM D', value: 'Jan 1' },
];

export default function DateConverterPage() {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(dayjs());
  const [manualInput, setManualInput] = useState('');
  const [inputFormat, setInputFormat] = useState('YYYY-MM-DD HH:mm:ss');
  const [results, setResults] = useState<Record<string, string>>({});

  const calculateResults = useCallback((dateTime: dayjs.Dayjs) => {
    const newResults: Record<string, string> = {};
    outputFormats.forEach((item) => {
      try {
        if (item.format === 'ISO') {
          newResults[item.label] = dateTime.toISOString();
        } else if (item.format === 'X') {
          newResults[item.label] = dateTime.unix().toString();
        } else if (item.format === 'x') {
          newResults[item.label] = dateTime.valueOf().toString();
        } else {
          newResults[item.label] = dateTime.format(item.format);
        }
      } catch {
        newResults[item.label] = '转换失败';
      }
    });
    setResults(newResults);
  }, []);

  const getCurrentDateTime = useCallback(() => {
    const now = dayjs();
    setSelectedDate(now);
    setSelectedTime(now);
    calculateResults(now);
  }, [calculateResults]);

  const handleDateChange = useCallback(
    (date: dayjs.Dayjs | null) => {
      setSelectedDate(date);
      if (date && selectedTime) {
        const combined = date
          .hour(selectedTime.hour())
          .minute(selectedTime.minute())
          .second(selectedTime.second());
        calculateResults(combined);
      } else if (date) {
        calculateResults(date);
      }
    },
    [selectedTime, calculateResults]
  );

  const handleTimeChange = useCallback(
    (time: dayjs.Dayjs | null) => {
      setSelectedTime(time);
      if (time && selectedDate) {
        const combined = selectedDate.hour(time.hour()).minute(time.minute()).second(time.second());
        calculateResults(combined);
      }
    },
    [selectedDate, calculateResults]
  );

  const handleManualConvert = useCallback(() => {
    if (!manualInput) {
      message.error('请输入日期时间');
      return;
    }
    try {
      const date = dayjs(manualInput, inputFormat);
      if (!date.isValid()) {
        message.error('日期格式无效');
        return;
      }
      calculateResults(date);
      message.success('转换成功');
    } catch {
      message.error('转换失败，请检查输入格式');
    }
  }, [manualInput, inputFormat, calculateResults]);

  const handleCopy = (value: string) => {
    copy(value);
    message.success('复制成功');
  };

  const handleClear = () => {
    setSelectedDate(dayjs());
    setSelectedTime(dayjs());
    setManualInput('');
    setResults({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            日期时间转换
          </h1>
          <p className="text-gray-500 text-lg">选择日期和时间，查看多种格式的转换结果</p>
        </div>

        {/* Main Content - Unique asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Input Controls */}
          <div className="lg:col-span-4 space-y-5">
            {/* Date & Time Picker Card */}
            <Card
              className="shadow-xl shadow-indigo-100/50 border-0 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-white">
                  <span className="text-2xl">📅</span>
                  <span className="font-semibold text-lg">选择日期和时间</span>
                </div>

                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 space-y-4">
                  <div>
                    <label
                      htmlFor="date-picker"
                      className="text-sm font-medium text-gray-600 mb-2 block"
                    >
                      日期
                    </label>
                    <DatePicker
                      id="date-picker"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="w-full h-12"
                      format="YYYY-MM-DD"
                      placeholder="选择日期"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="time-picker"
                      className="text-sm font-medium text-gray-600 mb-2 block"
                    >
                      时间
                    </label>
                    <TimePicker
                      id="time-picker"
                      value={selectedTime}
                      onChange={handleTimeChange}
                      className="w-full h-12"
                      format="HH:mm:ss"
                      placeholder="选择时间"
                    />
                  </div>

                  <Button
                    onClick={getCurrentDateTime}
                    className="w-full h-11 bg-gradient-to-r from-amber-500 to-orange-500 border-0 text-white font-medium"
                  >
                    📌 使用当前时间
                  </Button>
                </div>
              </div>
            </Card>

            {/* Manual Input Card */}
            <Card className="shadow-lg shadow-blue-100/50 border-0">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-xl">✏️</span>
                  <span className="font-semibold">手动输入</span>
                </div>

                <Input
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder="例如: 2024-01-01 12:30:45"
                  className="h-11 font-mono"
                />

                <Input
                  value={inputFormat}
                  onChange={(e) => setInputFormat(e.target.value)}
                  placeholder="输入格式: YYYY-MM-DD HH:mm:ss"
                  className="h-10 font-mono text-sm"
                />

                <div className="flex gap-2">
                  <Button type="primary" onClick={handleManualConvert} className="flex-1 h-10">
                    转换
                  </Button>
                  <Button onClick={handleClear} className="h-10">
                    清空
                  </Button>
                </div>
              </div>
            </Card>

            {/* Tips Card */}
            <Card className="shadow-lg shadow-amber-100/50 border-0 bg-gradient-to-br from-amber-50 to-orange-50">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-800">
                  <span className="text-xl">💡</span>
                  <span className="font-semibold">使用提示</span>
                </div>
                <ul className="text-sm text-amber-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>使用日期和时间选择器快速选择</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>点击"使用当前时间"获取当前时间</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>手动输入支持自定义格式转换</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>点击任意结果可快速复制</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Right Column - Results Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {outputFormats.map((item, index) => (
                <Card
                  key={item.label}
                  hoverable
                  onClick={() => handleCopy(results[item.label] || '')}
                  className="shadow-md hover:shadow-xl transition-all duration-300 border-0 group cursor-pointer"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">{item.label}</span>
                      <span className="text-xs text-gray-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        点击复制
                      </span>
                    </div>
                    <div className="font-mono text-lg text-gray-800 break-all group-hover:text-indigo-600 transition-colors">
                      {results[item.label] || item.value}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">{item.format}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
