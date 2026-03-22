## ADDED Requirements

### Requirement: Smart Error Handling
The system SHALL handle formatting errors gracefully and provide helpful feedback.

#### Scenario: Display error warning on parse failure
- **WHEN** user enters SQL with syntax errors that cannot be parsed
- **THEN** system displays a warning message with error details below the options panel
- **AND** system shows the original input in the output area

#### Scenario: Warning message format
- **WHEN** formatting fails
- **THEN** system displays warning in yellow alert box with:
  - Warning icon (⚠️)
  - Title: "格式化警告"
  - Error message from sql-formatter library

#### Scenario: Warning disappears on successful format
- **WHEN** user corrects the SQL error
- **THEN** system clears the warning message
- **AND** system displays formatted SQL in the output area

### Requirement: Copy and Clear Operations
The system SHALL provide copy and clear buttons for user convenience.

#### Scenario: Copy formatted output
- **WHEN** user clicks "复制" button
- **THEN** system copies the formatted SQL to clipboard
- **AND** system displays success message

#### Scenario: Clear input and output
- **WHEN** user clicks "清空" button
- **THEN** system clears both input and output areas

#### Scenario: Disable copy button when output is empty
- **WHEN** output area is empty
- **THEN** "复制" button is disabled
