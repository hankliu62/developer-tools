## Why

当前 SQL 格式化工具使用 `sql-formatter` 15.7.2 版本，但配置方式沿用了旧版 API，存在以下问题：
1. **实时预览缺失** - 用户必须手动点击"格式化"按钮才能看到结果，体验不流畅
2. **SQL 方言支持不足** - 仅支持 4 种方言，无法满足多样化需求
3. **错误处理不友好** - 格式化失败时只显示通用错误信息，用户无法定位问题
4. **配置选项有限** - 缺少 `indentStyle` 等新版配置选项

## What Changes

1. **实时格式化预览** - 输入 SQL 时自动即时格式化，无需点击按钮
2. **扩展 SQL 方言支持** - 从 4 种扩展到 13 种（BigQuery、DB2、Hive、MariaDB、N1QL、PL/SQL、Redshift、SQLite、T-SQL 等）
3. **新增缩进风格配置** - 支持 Standard、Tabular Left、Tabular Right 三种缩进风格
4. **智能错误处理** - 格式化失败时显示友好警告而非直接报错
5. **保留按钮操作** - 保留"格式化"、"压缩"、"复制"按钮作为快捷操作
6. **移除废弃配置** - 移除 `sql-formatter` 15.x 中已废弃的 `tabulateAlias` 配置

## Capabilities

### New Capabilities

- `real-time-formatting`: 实时 SQL 格式化预览功能
- `enhanced-dialect-support`: 扩展的 SQL 方言支持
- `indent-style-config`: 缩进风格配置选项
- `smart-error-handling`: 智能错误处理和警告提示

### Modified Capabilities

- 无需修改现有 capabilities

## Impact

**修改文件:**
- `src/app/tools/dev/sql-formatter/page.tsx` - 主要重构文件

**依赖更新:**
- `sql-formatter: ^15.7.2` - 已在项目中使用

**新增配置选项:**
- `indentStyle`: 'standard' | 'tabularLeft' | 'tabularRight'
- `language`: 新增 9 种方言支持
- `keywordCase`: 'upper' | 'lower' | 'preserve'
- `tabWidth`: 2 | 4
