'use client';
import ToolPage from '@/components/ToolPage';
import { getKeyCodeInfo } from '@/tools/web';

export default function KeycodePage() {
  return (
    <ToolPage
      title="键码信息"
      description="查询键盘按键的编码信息"
      emoji="⌨️"
      emojiBg="bg-gray-100"
      inputLabel="按键名称"
      inputPlaceholder="请输入按键名称，如: Enter, Escape, A..."
      layout="single"
      tips={[
        '支持查询功能键、字母键、数字键、符号键等',
        'keyCode 和 which 是数字编码，code 是物理键位标识',
        '常用键：Enter(13), Escape(27), Space(32), Backspace(8)',
        "不区分大小写，如 'a' 和 'A' 返回相同结果",
      ]}
      options={[
        { label: '显示完整信息', value: 'full' },
        { label: '仅显示 Code', value: 'code' },
        { label: '仅显示 keyCode', value: 'keycode' },
      ]}
      onProcess={(input, options) => {
        const info = getKeyCodeInfo(input.trim());
        const opt = options?.type;

        if (opt === 'code') {
          return info.code;
        } else if (opt === 'keycode') {
          return info.keyCode.toString();
        }

        return `Key: ${info.key}
Code: ${info.code}
keyCode: ${info.keyCode}
which: ${info.which}
Category: ${info.category}`;
      }}
    />
  );
}
