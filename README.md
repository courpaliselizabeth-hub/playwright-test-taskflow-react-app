# Playwright Test Suite

End-to-end tests using [Playwright](https://playwright.dev) and TypeScript.

## Project Structure

```
playwright-tests/
├── tests/
│   └── example.spec.ts    # Sample tests for example.com
├── screenshots/           # Auto-created on test run
├── playwright-report/     # HTML report (auto-created)
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json
└── package.json
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Install browsers

```bash
npm run install:browsers
```

This installs Chromium, Firefox, and WebKit (Safari engine).

---

## Running Tests

| Command | Description |
|---|---|
| `npm test` | Run all tests across all browsers |
| `npm run test:chromium` | Run on Chromium only |
| `npm run test:firefox` | Run on Firefox only |
| `npm run test:webkit` | Run on WebKit (Safari) only |
| `npm run test:mobile` | Run on mobile viewports |
| `npm run test:headed` | Run with browser window visible |
| `npm run test:debug` | Run in debug/step-through mode |
| `npm run test:ui` | Open Playwright's interactive UI mode |
| `npm run report` | Open the last HTML test report |

---

## Sample Tests (example.spec.ts)

The sample test file covers:

- **Title assertion** — verifies the page `<title>` matches expected text
- **Heading visibility** — checks a heading element is visible using ARIA roles
- **Text content** — asserts paragraph content with `toContainText`
- **Link attributes** — verifies `href` value on an anchor element
- **Navigation** — clicks a link and waits for URL change
- **Screenshot** — captures full-page and mobile screenshots to `screenshots/`
- **Accessibility check** — validates all images have `alt` attributes
- **Performance** — asserts page load time under 5 seconds
- **Mobile viewport** — sets viewport to 375×667 and re-runs checks

---

## Configuration (playwright.config.ts)

| Setting | Value |
|---|---|
| Test directory | `./tests` |
| Base URL | `https://example.com` |
| Browsers | Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari |
| Retries (CI) | 2 |
| Trace | On first retry |
| Report | HTML + list |

To change the target URL, update `baseURL` in `playwright.config.ts`.

---

## CI Usage

Set the `CI` environment variable to enable stricter settings (no `test.only`, 2 retries, 1 worker):

```bash
CI=true npm test
```
