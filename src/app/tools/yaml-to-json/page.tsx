"use client";
import ToolPage from "@/components/ToolPage";
import yaml from "js-yaml";

export default function YamlToJsonPage() {
  return (
    <ToolPage
      title="YAML 转 JSON"
      description="YAML 转为 JSON"
      inputLabel="YAML"
      inputPlaceholder="请输入 YAML 内容..."
      onProcess={(input) => {
        try {
          const obj = yaml.load(input);
          return JSON.stringify(obj, null, 2);
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "转换失败");
        }
      }}
    />
  );
}
