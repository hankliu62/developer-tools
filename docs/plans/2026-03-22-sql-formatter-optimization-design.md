# SQL 格式化工具优化 - 设计文档

**日期**: 2026-03-22  
**状态**: 已批准  
**版本**: 1.0.0

---

## 1. 概述

优化 SQL 格式化工具，提升用户体验和功能完整性。主要改进方向：

- 实现实时格式化预览
- 保留按钮操作作为备选
- 添加智能错误处理
- 扩展 SQL 方言支持
- 优化参数配置选项

---

## 2. 核心功能

### 2.1 实时格式化预览

使用 `computed` 实现输入即格式化的实时预览功能：

```typescript
const prettySQL = computed(() => {
  try {
    return format(rawSQL.value, config);
  } catch {
    return rawSQL.value; // 失败时返回原值
  }
});
```

**优点**：
- 无需点击按钮，输入即可看到格式化效果
- 响应速度快，用户体验流畅
- 减少操作步骤

### 2.2 按钮操作备选

保留原有按钮作为快捷操作：

| 按钮 | 功能 |
|------|------|
| 🚀 格式化 | 手动触发格式化（保留） |
| 📦 压缩 | 压缩 SQL（保留） |
| 📋 复制 | 复制结果（保留） |

### 2.3 智能错误处理

| 场景 | 处理方式 |
|------|----------|
| 语法小错误 | 仍尝试格式化，底部显示 ⚠️ 警告信息 |
| 语法大错误 | 显示友好错误提示，包含可能的原因 |
| 空输入 | 显示占位提示，不报错 |

---

## 3. 界面设计

### 3.1 布局结构

```
┌─────────────────────────────────────────────────┐
│  📝 SQL 格式化                                  │
├─────────────────────────────────────────────────┤
│  ⚙️ 格式化选项                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ SQL 方言 │ │ 缩进风格  │ │ 关键字  │        │
│  └──────────┘ └──────────┘ └──────────┘        │
├─────────────────────────────────────────────────┤
│  📝 输入 SQL                          [清空]   │
│  ┌─────────────────────────────────────────┐   │
│  │ (textarea - 实时格式化)                 │   │
│  └─────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│  📋 格式化结果                    [复制] [下载]│
│  ┌─────────────────────────────────────────┐   │
│  │ (显示格式化后的 SQL)                    │   │
│  └─────────────────────────────────────────┘   │
│  ⚠️ 错误/警告提示 (如有)                      │
└─────────────────────────────────────────────────┘
```

### 3.2 响应式设计

- 桌面端：选项横向排列（3 列）
- 移动端：选项纵向堆叠（单列）
- 最大宽度：800px

---

## 4. 参数配置

### 4.1 SQL 方言 (Dialect)

支持以下 13 种方言：

| 值 | 标签 |
|----|------|
| `bigquery` | GCP BigQuery |
| `db2` | IBM DB2 |
| `hive` | Apache Hive |
| `mariadb` | MariaDB |
| `mysql` | MySQL |
| `n1ql` | Couchbase N1QL |
| `plsql` | Oracle PL/SQL |
| `postgresql` | PostgreSQL |
| `redshift` | Amazon Redshift |
| `spark` | Spark |
| `sql` | Standard SQL |
| `sqlite` | SQLite |
| `tsql` | SQL Server T-SQL |

### 4.2 关键字风格 (Keyword Case)

| 值 | 标签 |
|----|------|
| `upper` | UPPERCASE |
| `lower` | lowercase |
| `preserve` | Preserve |

### 4.3 缩进风格 (Indent Style)

| 值 | 标签 | 说明 |
|----|------|------|
| `standard` | Standard | 标准缩进 |
| `tabularLeft` | Tabular Left | 左对齐表格 |
| `tabularRight` | Tabular Right | 右对齐表格 |

### 4.4 其他配置

| 配置 | 值 | 说明 |
|------|-----|------|
| `useTabs` | `false` | 使用空格缩进 |
| `tabWidth` | `2` | 缩进宽度（2 或 4 空格） |

---

## 5. 组件清单

| 组件 | 类型 | 说明 |
|------|------|------|
| `DialectSelect` | Select | SQL 方言选择器 |
| `KeywordCaseSelect` | Select | 关键字风格选择器 |
| `IndentStyleSelect` | Select | 缩进风格选择器 |
| `SqlInput` | TextArea | SQL 输入框 |
| `SqlOutput` | Pre | 格式化结果展示 |
| `ActionButtons` | Button Group | 操作按钮组 |
| `ErrorAlert` | Alert | 错误/警告提示 |

---

## 6. 技术实现

### 6.1 依赖版本

```json
{
  "sql-formatter": "^15.7.2"
}
```

### 6.2 新版配置选项

```typescript
import { type FormatOptionsWithLanguage, format } from 'sql-formatter';

const config = reactive<FormatOptionsWithLanguage>({
  keywordCase: 'upper',
  useTabs: false,
  language: 'sql',
  indentStyle: 'standard',
});
```

### 6.3 错误处理策略

```typescript
const formattedSQL = computed(() => {
  try {
    return format(rawSQL.value, config);
  } catch (error: any) {
    errorMessage.value = error.message;
    return rawSQL.value; // 返回原值
  }
});
```

---

## 7. 实现任务

1. 更新 `sql-formatter` 配置为新版 API
2. 实现 `computed` 实时格式化预览
3. 添加更多 SQL 方言选项
4. 添加 `indentStyle` 配置选项
5. 移除已废弃的 `tabulateAlias` 配置
6. 优化错误处理和提示
7. 更新 UI 布局和样式

---

## 8. 测试场景

| 测试用例 | 预期结果 |
|----------|----------|
| 空输入 | 显示占位提示 |
| 正常 SQL | 实时显示格式化结果 |
| 复杂嵌套 SQL | 正常格式化 |
| 不完整 SQL | 显示警告但仍尝试格式化 |
| 特殊字符 SQL | 显示错误提示 |
| 各种方言 | 正确格式化 |

---

## 9. 参考资料

- [sql-formatter 文档](https://github.com/sql-formatter/sql-formatter)
- 参考实现：某开源 SQL 格式化工具
