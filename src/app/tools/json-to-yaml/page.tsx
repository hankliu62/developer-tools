'use client';

import yaml from 'js-yaml';
import ToolPageV2, { ToolSection } from '@/components/ToolPageV2';

const sections: ToolSection[] = [
  {
    type: 'input',
    key: 'input',
    label: '📝 JSON 输入',
  },
  {
    type: 'params',
    label: '⚙️ 转换选项',
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
        ],
      },
      {
        type: 'switch',
        key: 'noCompatMode',
        label: '兼容模式',
        defaultValue: true,
      },
      {
        type: 'switch',
        key: 'noRefs',
        label: '保留引用',
        defaultValue: false,
      },
    ],
  },
  {
    type: 'output',
    key: 'output',
    label: '📋 YAML 输出',
  },
];

export default function JsonToYamlPage() {
  return (
    <ToolPageV2
      title="JSON 转 YAML"
      description="在线 JSON 转 YAML 工具"
      icon="🔄"
      layout="vertical"
      sections={sections}
      onProcess={(params) => {
        const input = params.input as string;
        const indent = Number(params.indent) || 2;
        const noCompatMode = params.noCompatMode as boolean;
        const noRefs = params.noRefs as boolean;

        try {
          const obj = JSON.parse(input);
          return yaml.dump(obj, {
            indent,
            noCompatMode,
            noRefs,
          });
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : '转换失败');
        }
      }}
      tips={[
        '支持标准的 JSON 格式数据',
        '可以调整缩进空格数来控制输出格式',
        '兼容模式可以处理更广泛的 YAML 语法',
        '保留引用选项可以保持对象引用的完整性',
        '支持嵌套对象和数组的转换',
      ]}
    />
  );
}
