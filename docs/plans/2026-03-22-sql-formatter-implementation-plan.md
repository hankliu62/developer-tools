# SQL 格式化工具优化 - 实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**目标:** 优化 SQL 格式化工具，实现实时预览、更多方言支持和智能错误处理

**架构:** 基于 sql-formatter 15.7.2 版本，使用 React hooks (useState/useCallback) 实现状态管理，通过 computed 模式实现实时格式化预览

**技术栈:** 
- sql-formatter 15.7.2
- Ant Design 组件库
- React hooks

---

## Task 1: 备份并分析现有代码

**Files:**
- Modify: `src/app/tools/dev/sql-formatter/page.tsx`

**Step 1: 备份现有实现**

创建备份文件：
```bash
cp src/app/tools/dev/sql-formatter/page.tsx src/app/tools/dev/sql-formatter/page.tsx.backup
```

**Step 2: 分析当前实现**

确认以下内容：
- 当前使用的 sql-formatter API
- 现有的配置选项
- 错误处理方式

---

## Task 2: 更新导入和配置结构

**Files:**
- Modify: `src/app/tools/dev/sql-formatter/page.tsx`

**Step 1: 更新导入语句**

```typescript
import { format as formatSQL, type FormatOptionsWithLanguage } from 'sql-formatter';
```

**Step 2: 添加更多方言选项常量**

```typescript
const DIALECT_OPTIONS = [
  { value: 'bigquery', label: 'GCP BigQuery' },
  { value: 'db2', label: 'IBM DB2' },
  { value: 'hive', label: 'Apache Hive' },
  { value: 'mariadb', label: 'MariaDB' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'n1ql', label: 'Couchbase N1QL' },
  { value: 'plsql', label: 'Oracle PL/SQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'redshift', label: 'Amazon Redshift' },
  { value: 'spark', label: 'Spark' },
  { value: 'sql', label: 'Standard SQL' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'tsql', label: 'SQL Server T-SQL' },
];
```

**Step 3: 提交**

```bash
git add src/app/tools/dev/sql-formatter/page.tsx
git commit -m "refactor(sql-formatter): update imports and dialect options"
```

---

## Task 3: 重构状态管理

**Files:**
- Modify: `src/app/tools/dev/sql-formatter/page.tsx`

**Step 1: 更新配置状态**

将原来的多个状态合并为一个配置对象：

```typescript
const [config, setConfig] = useState<FormatOptionsWithLanguage>({
  keywordCase: 'upper',
  useTabs: false,
  language: 'sql',
  indentStyle: 'standard',
  tabWidth: 2,
});

const [indentWidth, setIndentWidth] = useState<2 | 4>(2);
const [input, setInput] = useState('');
const [output, setOutput] = useState('');
const [errorMessage, setErrorMessage] = useState<string | null>(null);
```

**Step 2: 添加 computed 格式化函数**

```typescript
const formattedSQL = useMemo(() => {
  if (!input.trim()) return '';
  try {
    const result = formatSQL(input, {
      ...config,
      tabWidth: indentWidth,
    });
    setErrorMessage(null);
    return result;
  } catch (error: any) {
    setErrorMessage(error.message);
    return input; // 返回原值
  }
}, [input, config, indentWidth]);
```

**Step 3: 提交**

```bash
git add src/app/tools/dev/sql-formatter/page.tsx
git commit -m "refactor(sql-formatter): refactor state management"
```

---

## Task 4: 更新 UI 组件

**Files:**
- Modify: `src/app/tools/dev/sql-formatter/page.tsx`

**Step 1: 更新格式化选项区域**

替换 Radio.Group 为 Select 组件：

```tsx
<div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
  <span className="font-semibold text-gray-800 block mb-4">⚙️ 格式化选项</span>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div>
      <span className="text-sm text-gray-600 block mb-2">SQL 方言</span>
      <Select
        value={config.language}
        onChange={(value) => setConfig({ ...config, language: value })}
        style={{ width: '100%' }}
        options={DIALECT_OPTIONS}
      />
    </div>
    <div>
      <span className="text-sm text-gray-600 block mb-2">缩进风格</span>
      <Select
        value={config.indentStyle}
        onChange={(value) => setConfig({ ...config, indentStyle: value })}
        style={{ width: '100%' }}
        options={[
          { value: 'standard', label: 'Standard' },
          { value: 'tabularLeft', label: 'Tabular Left' },
          { value: 'tabularRight', label: 'Tabular Right' },
        ]}
      />
    </div>
    <div>
      <span className="text-sm text-gray-600 block mb-2">关键字风格</span>
      <Select
        value={config.keywordCase}
        onChange={(value) => setConfig({ ...config, keywordCase: value })}
        style={{ width: '100%' }}
        options={[
          { value: 'upper', label: 'UPPERCASE' },
          { value: 'lower', label: 'lowercase' },
          { value: 'preserve', label: 'Preserve' },
        ]}
      />
    </div>
  </div>
</div>
```

**Step 2: 保留缩进大小选项**

```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  {/* 原有三个选项 */}
  <div>
    <span className="text-sm text-gray-600 block mb-2">缩进大小</span>
    <Radio.Group value={indentWidth} onChange={(e) => setIndentWidth(e.target.value)}>
      <Radio.Button value={2}>2 空格</Radio.Button>
      <Radio.Button value={4}>4 空格</Radio.Button>
    </Radio.Group>
  </div>
</div>
```

**Step 3: 提交**

```bash
git add src/app/tools/dev/sql-formatter/page.tsx
git commit -m "feat(sql-formatter): update UI components"
```

---

## Task 5: 添加错误提示组件

**Files:**
- Modify: `src/app/tools/dev/sql-formatter/page.tsx`

**Step 1: 在格式化结果区域添加错误提示**

```tsx
{errorMessage && (
  <div className="bg-yellow-50 rounded-xl p-4 mb-4 border border-yellow-200">
    <div className="flex items-start">
      <span className="text-2xl mr-3">⚠️</span>
      <div>
        <h4 className="font-semibold text-yellow-800 mb-1">格式化警告</h4>
        <p className="text-sm text-yellow-700">{errorMessage}</p>
      </div>
    </div>
  </div>
)}
```

**Step 2: 提交**

```bash
git add src/app/tools/dev/sql-formatter/page.tsx
git commit -m "feat(sql-formatter): add error alert component"
```

---

## Task 6: 优化格式化结果展示

**Files:**
- Modify: `src/app/tools/dev/sql-formatter/page.tsx`

**Step 1: 更新输出区域使用 formattedSQL**

```tsx
<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
  <div className="flex items-center justify-between mb-3">
    <span className="font-semibold text-gray-800">📋 格式化结果</span>
    <Button onClick={handleCopy} disabled={!formattedSQL}>📋 复制</Button>
  </div>
  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
      {formattedSQL || '在左侧输入 SQL 语句，右侧将实时显示格式化结果'}
    </pre>
  </div>
</div>
```

**Step 2: 移除不再需要的 handleFormat 函数中的状态设置**

```typescript
// 保留 handleFormat 但简化逻辑
const handleFormat = useCallback(() => {
  // 实时格式化已由 computed 处理
  // 这里只用于滚动到输出区域
  document.querySelector('.output-section')?.scrollIntoView({ behavior: 'smooth' });
}, []);
```

**Step 3: 提交**

```bash
git add src/app/tools/dev/sql-formatter/page.tsx
git commit -m "feat(sql-formatter): update output display with real-time formatting"
```

---

## Task 7: 测试验证

**Files:**
- Modify: `src/app/tools/dev/sql-formatter/page.tsx`

**Step 1: 启动开发服务器测试**

```bash
npm run dev
```

**Step 2: 测试场景**

| 测试用例 | 预期结果 |
|----------|----------|
| 输入空字符串 | 显示占位提示 |
| 输入正常 SQL | 实时显示格式化结果 |
| 输入复杂嵌套 SQL | 正常格式化 |
| 切换方言 | 正确应用方言规则 |
| 切换缩进风格 | 正确应用缩进 |
| 输入有语法问题的 SQL | 显示警告但仍尝试格式化 |

**Step 3: 测试用户提供的 SQL**

```sql
SELECT a.signId, a.msgId AS msgId_1, b.msgId AS msgId_2, a.original_message AS log_1, b.original_message AS log_2 FROM (
    SELECT
        extract(message, '"signId":(\\d+)') AS signId,
        extract(message, 'msgId:([A-F0-9]+)') AS msgId,
        message AS original_message
    FROM log
    WHERE
        message LIKE '%消费WTM员工签到或签退消息开始%'
        AND extract(message, '"signId":(\\d+)') != ''
        AND extract(message, 'msgId:([A-F0-9]+)') != ''
) a
JOIN (...) b ON a.signId = b.signId
WHERE
    a.msgId != b.msgId
    AND a.msgId < b.msgId
```

---

## Task 8: 清理和最终提交

**Files:**
- Delete: `src/app/tools/dev/sql-formatter/page.tsx.backup`

**Step 1: 删除备份文件**

```bash
rm src/app/tools/dev/sql-formatter/page.tsx.backup
```

**Step 2: 最终提交**

```bash
git add -A
git commit -m "feat(sql-formatter): implement real-time formatting with enhanced dialect support

- Add real-time SQL formatting preview using computed pattern
- Expand dialect support to 13 options (BigQuery, DB2, Hive, etc.)
- Add indentStyle configuration (standard, tabularLeft, tabularRight)
- Implement smart error handling with warning display
- Remove deprecated tabulateAlias configuration
- Update UI with Select components for better UX"
```

**Step 3: 推送到远程**

```bash
git push origin HEAD
```

---

## 验收标准

- [ ] 实时格式化功能正常工作
- [ ] 支持 13 种 SQL 方言
- [ ] 支持 3 种缩进风格
- [ ] 错误信息友好显示
- [ ] 用户提供的 SQL 能正常格式化
- [ ] 所有测试通过
- [ ] 代码已提交并推送
