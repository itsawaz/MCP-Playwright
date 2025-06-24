Install MCP Playwright
# MCP Playwright
# Cmd to install MCP Playwright in VS Code
code --add-mcp "{\"name\":\"playwright\",\"command\":\"npx\",\"args\":[\"@playwright/mcp@latest\"]}"



# MCP-Playwright

A Playwright testing project with Model Context Protocol (MCP) server integration for intelligent test generation.

## Features

- **TypeScript Support**: Full TypeScript configuration with strict type checking
- **Cross-Browser Testing**: Supports Chromium, Firefox, and WebKit
- **CI/CD Ready**: Configured for continuous integration environments
- **Comprehensive Reporting**: HTML reports with screenshots and videos on failure
- **MCP Integration**: Uses Playwright MCP server for intelligent test generation

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MCP-Playwright
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npm run install:deps
```

## Scripts

- `npm test` - Run all tests
- `npm run test:headed` - Run tests in headed mode (visible browser)
- `npm run test:ui` - Run tests with Playwright UI mode
- `npm run test:debug` - Run tests in debug mode
- `npm run test:codegen` - Open Playwright codegen for recording tests
- `npm run report` - Show the HTML test report
- `npm run install:deps` - Install Playwright browser dependencies

## Project Structure

```
├── .github/
│   └── copilot-instructions.md    # AI coding assistant instructions
├── tests/                         # Test files
│   └── example.spec.ts            # Example test file
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Project dependencies and scripts
```

## Writing Tests

Tests are written using Playwright's test framework with TypeScript. Place your test files in the `tests/` directory with the `.spec.ts` extension.

Example test structure:
```typescript
import { test, expect } from '@playwright/test';

test('my test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

## Configuration

The project is configured with:
- **Parallel execution** for faster test runs
- **Automatic retries** on CI environments
- **Screenshot and video capture** on test failures
- **Trace collection** for debugging failed tests
- **Multiple browser support** (Chromium, Firefox, WebKit)

## MCP Integration

This project is designed to work with the Playwright MCP server for intelligent test generation. The copilot instructions in `.github/copilot-instructions.md` guide AI assistants to:
- Use MCP server tools for site navigation
- Generate tests based on actual page snapshots
- Follow Playwright best practices
- Verify generated code automatically

## License

MIT
