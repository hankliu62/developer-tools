export type ToolStatus = "normal" | "new" | "hot";

export interface Tool {
  name: string;
  description: string;
  href: string;
  icon: string;
  status: ToolStatus;
}

export interface Category {
  type: string;
  name: string;
  icon: string;
  children: Tool[];
}

export const categories: Category[] = [
  {
    type: "crypto",
    name: "加密解密",
    icon: "i-carbon-security",
    children: [
      {
        name: "Token 生成器",
        description: "生成随机 Token",
        href: "/tools/token-generator",
        icon: "i-carbon-key",
        status: "normal",
      },
      {
        name: "文本哈希",
        description: "生成文本的哈希值 (MD5, SHA1, SHA256 等)",
        href: "/tools/hash-text",
        icon: "i-carbon-hash",
        status: "normal",
      },
      {
        name: "Bcrypt 加密",
        description: "Bcrypt 加密和验证",
        href: "/tools/bcrypt",
        icon: "i-carbon-password",
        status: "normal",
      },
      {
        name: "UUID 生成器",
        description: "生成 UUID",
        href: "/tools/uuid-generator",
        icon: "i-carbon-identification",
        status: "normal",
      },
      {
        name: "ULID 生成器",
        description: "生成 ULID",
        href: "/tools/ulid-generator",
        icon: "i-carbon-identification",
        status: "normal",
      },
      {
        name: "文本加密解密",
        description: "对称加密解密文本",
        href: "/tools/encrypt-decrypt",
        icon: "i-carbon-locked",
        status: "normal",
      },
      {
        name: "BIP39 助记词",
        description: "生成 BIP39 助记词",
        href: "/tools/bip39",
        icon: "i-carbon-book",
        status: "normal",
      },
      {
        name: "HMAC 生成器",
        description: "生成 HMAC",
        href: "/tools/hmac-generator",
        icon: "i-carbon-key",
        status: "normal",
      },
      {
        name: "RSA 密钥对",
        description: "生成 RSA 密钥对",
        href: "/tools/rsa-key-pair",
        icon: "i-carbon-key",
        status: "normal",
      },
      {
        name: "密码强度分析",
        description: "分析密码强度",
        href: "/tools/password-strength",
        icon: "i-carbon-security",
        status: "normal",
      },
    ],
  },
  {
    type: "converter",
    name: "转换工具",
    icon: "i-carbon-data-convert",
    children: [
      {
        name: "日期时间转换",
        description: "日期时间格式转换",
        href: "/tools/date-converter",
        icon: "i-carbon-time",
        status: "normal",
      },
      {
        name: "整数进制转换",
        description: "进制转换 (2/8/10/16)",
        href: "/tools/base-converter",
        icon: "i-carbon-number",
        status: "normal",
      },
      {
        name: "罗马数字转换",
        description: "阿拉伯数字与罗马数字互转",
        href: "/tools/roman-converter",
        icon: "i-carbon-text-number-format",
        status: "normal",
      },
      {
        name: "Base64 编码解码",
        description: "Base64 字符串编码解码",
        href: "/tools/base64",
        icon: "i-carbon-text-kernel",
        status: "normal",
      },
      {
        name: "颜色转换",
        description: "颜色格式转换 (HEX, RGB, HSL)",
        href: "/tools/color-converter",
        icon: "i-carbon-color-palette",
        status: "normal",
      },
      {
        name: "大小写转换",
        description: "文本大小写转换",
        href: "/tools/case-converter",
        icon: "i-carbon-text-capitalize",
        status: "normal",
      },
      {
        name: "NATO 字母表",
        description: "文本转 NATO 字母表",
        href: "/tools/nato-alphabet",
        icon: "i-carbon-character-whole",
        status: "normal",
      },
      {
        name: "ASCII 二进制",
        description: "文本转 ASCII 二进制",
        href: "/tools/text-to-ascii",
        icon: "i-carbon-data-binary",
        status: "normal",
      },
      {
        name: "Unicode 转换",
        description: "文本转 Unicode",
        href: "/tools/unicode",
        icon: "i-carbon-text-kernel",
        status: "normal",
      },
      {
        name: "YAML 转 JSON",
        description: "YAML 转为 JSON",
        href: "/tools/yaml-to-json",
        icon: "i-carbon-data-structured",
        status: "normal",
      },
      {
        name: "JSON 转 YAML",
        description: "JSON 转为 YAML",
        href: "/tools/json-to-yaml",
        icon: "i-carbon-data-structured",
        status: "normal",
      },
      {
        name: "YAML 转 TOML",
        description: "YAML 转为 TOML",
        href: "/tools/yaml-to-toml",
        icon: "i-carbon-document",
        status: "normal",
      },
      {
        name: "JSON 转 TOML",
        description: "JSON 转为 TOML",
        href: "/tools/json-to-toml",
        icon: "i-carbon-document",
        status: "normal",
      },
      {
        name: "TOML 转 JSON",
        description: "TOML 转为 JSON",
        href: "/tools/toml-to-json",
        icon: "i-carbon-document",
        status: "normal",
      },
      {
        name: "TOML 转 YAML",
        description: "TOML 转为 YAML",
        href: "/tools/toml-to-yaml",
        icon: "i-carbon-document",
        status: "normal",
      },
      {
        name: "XML 转 JSON",
        description: "XML 转为 JSON",
        href: "/tools/xml-to-json",
        icon: "i-carbon-code",
        status: "normal",
      },
      {
        name: "JSON 转 XML",
        description: "JSON 转为 XML",
        href: "/tools/json-to-xml",
        icon: "i-carbon-code",
        status: "normal",
      },
      {
        name: "Markdown 转 HTML",
        description: "Markdown 转为 HTML",
        href: "/tools/markdown-to-html",
        icon: "i-carbon-document-markdown",
        status: "normal",
      },
    ],
  },
  {
    type: "web",
    name: "Web 开发",
    icon: "i-carbon-code",
    children: [
      {
        name: "URL 编码解码",
        description: "URL 编码和解码",
        href: "/tools/url-encoder",
        icon: "i-carbon-link",
        status: "normal",
      },
      {
        name: "HTML 实体转义",
        description: "HTML 实体编码和解码",
        href: "/tools/html-escape",
        icon: "i-carbon-code",
        status: "normal",
      },
      {
        name: "URL 解析",
        description: "解析 URL 各部分",
        href: "/tools/url-parser",
        icon: "i-carbon-link",
        status: "normal",
      },
      {
        name: "设备信息",
        description: "获取当前设备信息",
        href: "/tools/device-info",
        icon: "i-carbon-device-laptop",
        status: "normal",
      },
      {
        name: "Basic Auth 生成",
        description: "生成 Basic Auth 头",
        href: "/tools/basic-auth",
        icon: "i-carbon-user-avatar",
        status: "normal",
      },
      {
        name: "Open Graph 生成",
        description: "生成 Open Graph 元标签",
        href: "/tools/open-graph",
        icon: "i-carbon-share",
        status: "normal",
      },
      {
        name: "OTP 验证码",
        description: "生成 TOTP/HOTP 验证码",
        href: "/tools/otp-generator",
        icon: "i-carbon-time",
        status: "normal",
      },
      {
        name: "MIME 类型",
        description: "查询 MIME 类型",
        href: "/tools/mime-types",
        icon: "i-carbon-document",
        status: "normal",
      },
      {
        name: "JWT 解析",
        description: "解析 JWT Token",
        href: "/tools/jwt-parser",
        icon: "i-carbon-token",
        status: "normal",
      },
      {
        name: "键码信息",
        description: "查询键码信息",
        href: "/tools/keycode",
        icon: "i-carbon-keyboard",
        status: "normal",
      },
      {
        name: "Slug 转换",
        description: "将文本转换为 URL Slug",
        href: "/tools/slugify",
        icon: "i-carbon-text-link",
        status: "normal",
      },
      {
        name: "JSON 格式化",
        description: "JSON 格式化和高亮",
        href: "/tools/json-formatter",
        icon: "i-carbon-data-structured",
        status: "normal",
      },
    ],
  },
  {
    type: "cron",
    name: "Cron 工具",
    icon: "i-carbon-time",
    children: [
      {
        name: "Cron 表达式生成",
        description: "可视化生成 Cron 表达式",
        href: "/tools/cron-generator",
        icon: "i-carbon-time",
        status: "normal",
      },
      {
        name: "Cron 表达式解析",
        description: "解析 Cron 表达式",
        href: "/tools/cron-parser",
        icon: "i-carbon-time",
        status: "normal",
      },
    ],
  },
];

export const toolModules = [
  {
    type: "prompts",
    name: "提示词",
    icon: "i-carbon-chat",
    href: "/prompts",
  },
  {
    type: "skills",
    name: "Skills",
    icon: "i-carbon-tool-kit",
    href: "/skills",
  },
  {
    type: "rules",
    name: "Rules",
    icon: "i-carbon-rule",
    href: "/rules",
  },
];
