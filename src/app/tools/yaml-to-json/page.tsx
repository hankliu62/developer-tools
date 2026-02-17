'use client';

import yaml from 'js-yaml';
import ToolPageV2, { ToolSection } from '@/components/ToolPageV2';

const sections: ToolSection[] = [
  {
    type: 'input',
    key: 'input',
    label: '📝 YAML 输入',
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
        key: 'validate',
        label: '严格校验',
        defaultValue: true,
      },
    ],
  },
  {
    type: 'output',
    key: 'output',
    label: '📋 JSON 输出',
  },
];

export default function YamlToJsonPage() {
  return (
    <ToolPageV2
      title="YAML 转 JSON"
      description="在线 YAML 转 JSON 工具"
      icon="🔄"
      layout="vertical"
      sections={sections}
      onProcess={(params) => {
        const input = params.input as string;
        const indent = Number(params.indent) || 2;
        const validate = params.validate as boolean;

        const loadOptions = validate ? {} : { json: true };
        const obj = yaml.load(input, loadOptions as yaml.LoadOptions);
        return JSON.stringify(obj, null, indent);
      }}
      tips={[
        '支持标准的 YAML 格式数据',
        '支持 YAML 1.1 和 1.2 规范',
        '严格校验模式下会检查 YAML 语法正确性',
        '缩进选项可以调整输出 JSON 的格式',
        '支持多文档 YAML（使用 --- 分隔）',
      ]}
    />
  );
}
