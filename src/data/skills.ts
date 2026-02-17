export interface Skill {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
  source: string;
}

export const skills: Skill[] = [
  {
    id: '1',
    name: 'frontend-design',
    description:
      'Create distinctive, production-grade frontend interfaces with high design quality',
    content: `# Frontend Design Skill

You are an expert frontend designer specializing in creating distinctive, production-grade user interfaces.

## Capabilities
- Build React components, HTML/CSS layouts, landing pages, dashboards
- Create visually appealing, unique designs that avoid generic AI aesthetics
- Implement responsive designs with proper mobile-first approach
- Use modern CSS techniques (Flexbox, Grid, CSS Variables)

## Design Principles
1. Prioritize usability and accessibility
2. Use consistent spacing and typography
3. Implement proper color contrast
4. Add subtle animations for better UX
5. Keep designs clean and uncluttered

## Output Requirements
- Clean, well-organized code
- Proper semantic HTML
- CSS-in-JS or scoped styles
- TypeScript when appropriate
- Responsive on all screen sizes`,
    category: 'Development',
    source: 'anthropics/skills',
  },
  {
    id: '2',
    name: 'vercel-react-best-practices',
    description: 'React best practices for Vercel deployments',
    content: `# Vercel React Best Practices

Follow these practices when building React apps for Vercel:

## Performance
- Use Next.js App Router
- Implement proper code splitting
- Optimize images with next/image
- Use dynamic imports for heavy components

## Data Fetching
- Use Server Components for data fetching
- Implement proper caching strategies
- Use optimistic updates where appropriate

## State Management
- Prefer React Server Components over client state
- Use useState for simple local state
- Consider Zustand or Jotai for global state

## Deployment
- Ensure proper environment variables
- Configure proper headers
- Optimize for Edge runtime when possible`,
    category: 'Development',
    source: 'vercel-labs/agent-skills',
  },
  {
    id: '3',
    name: 'agent-tools',
    description: 'Tools and utilities for AI agent development',
    content: `# Agent Tools Skill

This skill provides utilities for building AI agents.

## Core Capabilities
- File system operations
- Command execution
- Web search and fetch
- Code interpretation

## Usage
Use these tools to:
- Read and write files
- Execute shell commands
- Search the web
- Run code snippets

## Best Practices
- Always verify file operations
- Use absolute paths
- Handle errors gracefully
- Log all operations`,
    category: 'Tools',
    source: 'inference-sh-0/skills',
  },
  {
    id: '4',
    name: 'skill-creator',
    description: 'Guide for creating effective skills for AI agents',
    content: `# Skill Creator

Learn how to create effective skills for AI agents.

## Skill Structure
A skill consists of:
1. Name and description
2. Instructions/prompts
3. Available tools (optional)
4. Examples

## Best Practices
- Write clear, specific instructions
- Include examples when helpful
- Define tool usage explicitly
- Test the skill thoroughly

## Template
\`\`\`
# Skill Name

[Description]

## Instructions
[Step-by-step instructions]

## Examples
[Optional examples]
\`\`\``,
    category: 'Development',
    source: 'anthropics/skills',
  },
  {
    id: '5',
    name: 'data-visualization',
    description: 'Create data visualizations with chart selection and best practices',
    content: `# Data Visualization Skill

Create effective data visualizations using Chart.js and other libraries.

## Chart Selection
- Bar charts: Compare categories
- Line charts: Show trends over time
- Scatter plots: Show correlations
- Pie charts: Show proportions (use sparingly)
- Heatmaps: Show density

## Best Practices
1. Choose appropriate chart type
2. Label axes clearly
3. Use colors effectively
4. Add legends when needed
5. Make it responsive

## Implementation
Use Chart.js for most visualizations:
- Include Chart.js CDN or npm package
- Prepare data in correct format
- Configure options for responsiveness
- Handle updates properly`,
    category: 'Design',
    source: 'anthropics/knowledge-work-plugins',
  },
  {
    id: '6',
    name: 'pdf',
    description: 'PDF operations including reading, writing, and conversion',
    content: `# PDF Skill

Handle all PDF-related tasks.

## Capabilities
- Read and extract text/tables from PDFs
- Combine or merge multiple PDFs
- Split PDFs into separate pages
- Rotate, add watermarks
- Create new PDFs
- Fill PDF forms
- Encrypt/decrypt PDFs
- OCR on scanned documents

## Tools
Use libraries like:
- pdf.js for reading
- pdf-lib for modification
- tesseract.js for OCR

## Best Practices
- Always handle errors gracefully
- Show progress for large files
- Preserve original quality when possible
- Test with various PDF formats`,
    category: 'Tools',
    source: 'anthropics/skills',
  },
  {
    id: '7',
    name: 'interactive-dashboard-builder',
    description: 'Build interactive HTML dashboards with Chart.js',
    content: `# Interactive Dashboard Builder

Create self-contained interactive HTML dashboards.

## Features
- Chart.js integration
- Dropdown filters
- Professional styling
- Works without server

## Implementation
1. Include Chart.js and Bootstrap
2. Create responsive layout
3. Add filter controls
4. Implement chart rendering
5. Handle data updates

## Output Format
Single HTML file with embedded CSS/JS that works offline.`,
    category: 'Development',
    source: 'anthropics/knowledge-work-plugins',
  },
  {
    id: '8',
    name: 'feature-spec',
    description: 'Write structured product requirements documents',
    content: `# Feature Spec Skill

Write structured PRDs (Product Requirements Documents).

## Template Sections
1. Problem Statement
2. User Stories
3. Requirements
4. Success Metrics
5. Timeline
6. Technical Notes

## Guidelines
- Be specific and measurable
- Include acceptance criteria
- Define out-of-scope items
- Consider edge cases`,
    category: 'Product',
    source: 'anthropics/knowledge-work-plugins',
  },
  {
    id: '9',
    name: 'codereview-roasted',
    description: 'Brutally honest code review in the style of Linus Torvalds',
    content: `# Code Review - Roast Style

Provide brutally honest code reviews.

## Focus Areas
- Data structures choice
- Algorithm efficiency
- Code simplicity
- Naming conventions
- Error handling
- Security concerns

## Tone
- Direct and honest
- Focus on technical merit
- Suggest improvements
- Don't be mean, be helpful`,
    category: 'Development',
    source: 'openhands/skills',
  },
  {
    id: '10',
    name: 'browser-use',
    description: 'Automate browser tasks using Playwright or Puppeteer',
    content: `# Browser Automation Skill

Automate browser tasks using Playwright or Puppeteer.

## Use Cases
- Web scraping
- Form filling
- Screenshot capture
- Testing web applications
- Automation workflows

## Best Practices
- Use Playwright for modern features
- Handle waits properly
- Clean up resources
- Respect robots.txt
- Don't overload servers`,
    category: 'Automation',
    source: 'browser-use',
  },
];
