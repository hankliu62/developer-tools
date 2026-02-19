'use client';

import ToolPageV2, { ToolSection } from '@/components/ToolPageV2';
import { formatJson } from '@/tools/web';

const sections: ToolSection[] = [
  {
    type: 'input',
    key: 'input',
    label: '📝 JSON 输入',
  },
  {
    type: 'params',
    label: '⚙️ 格式化选项',
    fields: [
      {
        type: 'select',
        key: 'indent',
        label: '缩进空格数',
        defaultValue: 2,
        options: [
          { label: '2 空格', value: 2 },
          { label: '4 空格', value: 4 },
          { label: '1 空格', value: 1 },
          { label: 'Tab', value: '\t' },
        ],
      },
      {
        type: 'switch',
        key: 'sortKeys',
        label: '按 Key 排序',
        defaultValue: false,
      },
      {
        type: 'switch',
        key: 'compact',
        label: '紧凑模式（无缩进）',
        defaultValue: false,
      },
      {
        type: 'switch',
        key: 'escapeUnicode',
        label: '转义 Unicode 字符',
        defaultValue: false,
      },
    ],
  },
  {
    type: 'output',
    key: 'output',
    label: '📋 格式化结果',
  },
];

export default function JsonFormatterPage() {
  return (
    <ToolPageV2
      title="JSON 格式化"
      description="在线 JSON 格式化、排序、高亮工具"
      icon="📋"
      layout="vertical"
      sections={sections}
      onProcess={(params) => {
        const input = params.input as string;
        const options = {
          indent: params.indent as number | string,
          sortKeys: params.sortKeys as boolean,
          compact: params.compact as boolean,
          escapeUnicode: params.escapeUnicode as boolean,
        };
        return formatJson(input, options);
      }}
      tips={[
        '支持标准的 JSON 格式数据',
        '缩进选项可以调整输出格式的缩进大小',
        '按 Key 排序会将对象的键按字母顺序排列',
        '紧凑模式会移除所有缩进和换行',
        '转义 Unicode 选项会将中文字符转为 \\uXXXX 格式',
      ]}
    />
  );
}
