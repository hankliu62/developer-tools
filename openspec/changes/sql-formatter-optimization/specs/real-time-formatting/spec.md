## ADDED Requirements

### Requirement: Real-time SQL Formatting
The system SHALL automatically format SQL input as the user types, without requiring manual button clicks.

#### Scenario: Format valid SQL on input
- **WHEN** user enters valid SQL text in the input area
- **THEN** system displays formatted SQL in the output area within 100ms

#### Scenario: Format updates on configuration change
- **WHEN** user changes any formatting option (dialect, indent style, keyword case, tab width)
- **THEN** system re-formats the current SQL input with new configuration

#### Scenario: Empty input shows placeholder
- **WHEN** user clears the input area
- **THEN** output area displays placeholder text "在左侧输入 SQL 语句，右侧将实时显示格式化结果"

#### Scenario: Preserve input on formatting error
- **WHEN** formatting fails due to syntax errors
- **THEN** system displays the original input in output area (not empty)

### Requirement: Manual Format Button
The system SHALL retain the "格式化" button for manual trigger.

#### Scenario: Manual format button works
- **WHEN** user clicks the "格式化" button
- **THEN** system scrolls to the output area and displays formatted SQL
