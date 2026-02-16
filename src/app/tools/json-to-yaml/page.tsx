"use client";
import ToolPage from "@/components/ToolPage";
import yaml from "js-yaml";

export default function JsonToYamlPage() {
  return (
    <ToolPage
      title="JSON 转 YAML"
      description="JSON 转为 YAML"
      inputLabel="JSON"
      inputPlaceholder="请输入 JSON 内容..."
      onProcess={(input) => {
        try {
          const obj = JSON.parse(input);
          return yaml.dump(obj, { indent: 2 });
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "转换失败");
        }
      }}
    />
  );
}
