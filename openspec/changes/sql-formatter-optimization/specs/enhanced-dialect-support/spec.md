## ADDED Requirements

### Requirement: Supported SQL Dialects
The system SHALL support 13 SQL dialects for formatting.

#### Scenario: Default dialect selection
- **WHEN** user opens the SQL formatter page
- **THEN** "Standard SQL" is selected as the default dialect

#### Scenario: Dialect selection options
- **WHEN** user opens the dialect dropdown
- **THEN** system displays all 13 dialect options:
  - GCP BigQuery
  - IBM DB2
  - Apache Hive
  - MariaDB
  - MySQL
  - Couchbase N1QL
  - Oracle PL/SQL
  - PostgreSQL
  - Amazon Redshift
  - Spark
  - Standard SQL
  - SQLite
  - SQL Server T-SQL

#### Scenario: Format with PostgreSQL dialect
- **WHEN** user selects PostgreSQL dialect and enters SQL
- **THEN** system formats SQL using PostgreSQL syntax rules

#### Scenario: Format with BigQuery dialect
- **WHEN** user selects BigQuery dialect and enters SQL
- **THEN** system formats SQL using BigQuery syntax rules

### Requirement: Keyword Case Options
The system SHALL allow users to control SQL keyword casing.

#### Scenario: Keyword case selection options
- **WHEN** user opens the keyword case dropdown
- **THEN** system displays three options:
  - UPPERCASE (converts keywords to uppercase)
  - lowercase (converts keywords to lowercase)
  - Preserve (keeps original keyword casing)

#### Scenario: Apply uppercase keywords
- **WHEN** user selects "UPPERCASE" and enters SQL with lowercase keywords
- **THEN** system converts all SQL keywords to uppercase
