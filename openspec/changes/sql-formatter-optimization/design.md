## Context

当前 SQL 格式化工具 (`src/app/tools/dev/sql-formatter/page.tsx`) 使用 `sql-formatter` 15.7.2 版本，但配置方式存在问题：

**现状:**
- 使用旧版 API 配置（如 `tabulateAlias` 在新版本已废弃）
- 仅支持 4 种 SQL 方言（PostgreSQL、MySQL、Spark、Standard SQL）
- 需要手动点击"格式化"按钮才能看到结果
- 格式化失败时只显示通用错误信息

**约束:**
- 必须兼容 `sql-formatter@^15.7.2`
- 使用 Ant Design 组件库
- 保持与项目现有样式一致

## Goals / Non-Goals

**Goals:**
1. 实现实时 SQL 格式化预览（输入即格式化）
2. 扩展 SQL 方言支持至 13 种
3. 新增 `indentStyle` 配置选项
4. 提供智能错误处理和友好警告
5. 保留现有按钮操作作为快捷方式

**Non-Goals:**
1. 不重构项目架构
2. 不添加单元测试（项目暂无测试框架）
3. 不修改其他工具页面

## Decisions

### 1. 使用 `useMemo` 实现实时格式化

**选择:** 使用 React `useMemo` hook 监听输入变化，自动触发格式化

**原因:**
- `useMemo` 在依赖变化时自动重新计算，无需手动调用
- 与现有 `useState`/`useCallback` 模式一致
- 性能友好，只在输入变化时重新计算

**替代方案:**
- `useEffect` + `setState`: 需要额外的状态管理
- `computed` (Vue): 项目使用 React，不适用

### 2. 统一配置对象管理

**选择:** 将多个配置合并为单一 `config` 对象

```typescript
const [config, setConfig] = useState<FormatOptionsWithLanguage>({
  keywordCase: 'upper',
  useTabs: false,
  language: 'sql',
  indentStyle: 'standard',
  tabWidth: 2,
});
```

**原因:**
- 减少状态数量，降低复杂度
- 便于扩展新配置项
- 与参考实现保持一致

### 3. 错误处理策略

**选择:** 捕获异常后显示警告信息，同时返回原输入值

**原因:**
- 避免格式化失败导致输出区域清空
- 用户可以看到错误原因并修正输入
- 保持用户体验连续性

### 4. 扩展方言列表

**选择:** 使用 Select 组件展示 13 种方言

**方言列表:**
- Standard SQL (默认)
- GCP BigQuery, IBM DB2, Apache Hive
- MariaDB, MySQL, SQLite
- PostgreSQL, Amazon Redshift
- Couchbase N1QL, Oracle PL/SQL, Spark
- SQL Server T-SQL

## Risks / Trade-offs

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| 实时格式化性能 | 大量输入时可能卡顿 | 使用 `useMemo` 缓存结果 |
| 方言兼容性问题 | 某些特殊语法可能解析失败 | 智能错误处理，保留原值 |
| `tabulateAlias` 移除 | 旧版配置会报错 | 完全移除，使用新版 `indentStyle` |

## Open Questions

1. 是否需要添加"下载为文件"功能？
2. 是否需要添加 SQL 语法验证功能？
3. 是否需要添加历史记录功能？
