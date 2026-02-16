"use client";
import { useState } from "react";
import { Button, Select, message } from "antd";
import copy from "copy-to-clipboard";
import { generateCronDescription, cronPresets } from "@/tools/cron";

export default function CronGeneratorPage() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  const [description, setDescription] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    try {
      const expression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
      const desc = generateCronDescription(expression);
      setDescription(desc);
      setOutput(expression);
    } catch (error) {
      message.error(error instanceof Error ? error.message : "生成失败");
    }
  };

  const handlePreset = (value: string) => {
    const parts = value.split(" ");
    setMinute(parts[0]);
    setHour(parts[1]);
    setDayOfMonth(parts[2]);
    setMonth(parts[3]);
    setDayOfWeek(parts[4]);
    try {
      const desc = generateCronDescription(value);
      setDescription(desc);
      setOutput(value);
    } catch {
      // ignore
    }
  };

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success("复制成功");
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cron 表达式生成</h1>
        <p className="text-gray-600 mt-1">可视化生成 Cron 表达式</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="mb-4">
          <label className="font-medium text-gray-700 block mb-2">预设</label>
          <Select
            placeholder="选择预设"
            style={{ width: 300 }}
            onChange={handlePreset}
            options={cronPresets.map(p => ({ label: p.name, value: p.expression }))}
          />
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div>
            <label className="font-medium text-gray-700 block mb-2">分钟</label>
            <Select
              value={minute}
              onChange={setMinute}
              style={{ width: "100%" }}
              options={[
                { label: "每分钟 (*)", value: "*" },
                { label: "每 5 分钟 (*/5)", value: "*/5" },
                { label: "每 15 分钟 (*/15)", value: "*/15" },
                { label: "每 30 分钟 (*/30)", value: "*/30" },
                { label: "0", value: "0" },
                { label: "30", value: "30" },
              ]}
            />
          </div>
          <div>
            <label className="font-medium text-gray-700 block mb-2">小时</label>
            <Select
              value={hour}
              onChange={setHour}
              style={{ width: "100%" }}
              options={[
                { label: "每小时 (*)", value: "*" },
                { label: "每 2 小时 (*/2)", value: "*/2" },
                { label: "每 6 小时 (*/6)", value: "*/6" },
                { label: "0 (午夜)", value: "0" },
                { label: "12 (中午)", value: "12" },
              ]}
            />
          </div>
          <div>
            <label className="font-medium text-gray-700 block mb-2">日期</label>
            <Select
              value={dayOfMonth}
              onChange={setDayOfMonth}
              style={{ width: "100%" }}
              options={[
                { label: "每天 (*)", value: "*" },
                { label: "1 号", value: "1" },
                { label: "15 号", value: "15" },
                { label: "1-15", value: "1-15" },
              ]}
            />
          </div>
          <div>
            <label className="font-medium text-gray-700 block mb-2">月份</label>
            <Select
              value={month}
              onChange={setMonth}
              style={{ width: "100%" }}
              options={[
                { label: "每月 (*)", value: "*" },
                { label: "1 月", value: "1" },
                { label: "6 月", value: "6" },
                { label: "1,6,12", value: "1,6,12" },
              ]}
            />
          </div>
          <div>
            <label className="font-medium text-gray-700 block mb-2">星期</label>
            <Select
              value={dayOfWeek}
              onChange={setDayOfWeek}
              style={{ width: "100%" }}
              options={[
                { label: "每天 (*)", value: "*" },
                { label: "工作日 (1-5)", value: "1-5" },
                { label: "周末 (0,6)", value: "0,6" },
                { label: "周一", value: "1" },
                { label: "周日", value: "0" },
              ]}
            />
          </div>
        </div>

        <Button type="primary" onClick={handleGenerate} className="mt-4">
          生成
        </Button>
      </div>

      {output && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Cron 表达式</div>
              <div className="font-mono text-xl">{output}</div>
            </div>
            <Button onClick={handleCopy}>复制</Button>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">描述</div>
            <div className="text-lg">{description}</div>
          </div>
        </div>
      )}
    </div>
  );
}
