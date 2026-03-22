## ADDED Requirements

### Requirement: Indent Style Configuration
The system SHALL support three indentation styles.

#### Scenario: Indent style selection options
- **WHEN** user opens the indent style dropdown
- **THEN** system displays three style options:
  - Standard (standard indentation)
  - Tabular Left (left-aligned tabular)
  - Tabular Right (right-aligned tabular)

#### Scenario: Standard indent style
- **WHEN** user selects "Standard" indent style
- **THEN** system uses standard 2-space indentation

#### Scenario: Tabular left alignment
- **WHEN** user selects "Tabular Left" indent style
- **THEN** system aligns AS keywords to the left in SELECT list

#### Scenario: Tabular right alignment
- **WHEN** user selects "Tabular Right" indent style
- **THEN** system aligns AS keywords to the right in SELECT list

### Requirement: Tab Width Configuration
The system SHALL allow users to select indentation size.

#### Scenario: Tab width selection
- **WHEN** user selects indent size option
- **THEN** system uses either 2 or 4 spaces for indentation:
  - 2 空格 (2 spaces)
  - 4 空格 (4 spaces)

#### Scenario: Apply 4-space indentation
- **WHEN** user selects "4 空格" option
- **THEN** system formats SQL with 4-space indentation
