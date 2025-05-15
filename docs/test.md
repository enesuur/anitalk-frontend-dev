# Anitalk Test Documentation

## Overview

Anitalk's testing strategy is designed with a clear separation between unit, integration, and end-to-end (e2e) testing. We use two primary testing approaches:

- **Unit and Integration Testing:** Handled with Jest and TypeScript.
- **End-to-End Testing:** Handled by Playwright.

### Testing Strategy:

Our testing strategy follows a "write tests after development" approach to ensure functionality is verified post-implementation. This means:

- We first implement the feature or fix.
- Then we write corresponding tests to verify behavior, catch regressions, and ensure quality.

The benefits of this approach:

- Allows developers to focus on building features first.
- Encourages writing meaningful, scenario-based tests.
- Enables better coverage of actual usage patterns after feature completion.

Types of tests in Anitalk:

- Unit Tests: Verify individual components or utilities in isolation.
- Integration Tests: Validate interactions between components or modules.
- End-to-End (E2E) Tests: Simulate real user workflows via Playwright.

This strategy balances development speed with test reliability and maintainability.

## Test Folder Structure

The tests are organized into three main folders:

- `tests/unit/`: Contains unit tests for individual components and utilities.
- `tests/integration/`: Contains integration tests for testing multiple components working together.
- `tests/e2e/`: Contains end-to-end tests, which simulate real user behavior using Playwright.

### Folder Structure Example

```bash
/tests
  /unit
    componentName.spec.ts
  /integration
    featureName.spec.ts
  /e2e
    login.spec.ts
```

## Naming Convention

- **Test File Naming:** Files follow the convention `example.spec.ts`, where `example` refers to the component, utility, or feature being tested.
- **Extension:** All test files are written in TypeScript, using `.spec.ts`.
- **Test Location:** Tests are structured according to the testing type, for example:
  - `tests/unit/componentName.spec.ts`
  - `tests/integration/featureName.spec.ts`

## Testing Frameworks

### Jest for Unit and Integration Testing

- **Framework:** Jest is used for unit and integration tests.
- **Configuration:** Jest is configured to run tests using the appropriate environment, set up in `jest.config.js`.
- **Test Files:** Jest tests are written in TypeScript with the `.spec.ts` extension.

### Playwright for End-to-End Testing

- **Framework:** Playwright is used for end-to-end testing.
- **Test Files:** Playwright tests simulate real user interactions with the system to ensure the application works as expected from the user’s perspective.

## Local Testing

For easier testing, developers can write local tests directly within the feature folder. This approach is still experimental, and the testing architecture might be adjusted in the future for better maintainability.

### Example

```bash
/src
  /features
    /featureName
      FeatureComponent.tsx
      featureName.spec.ts
```

This allows developers to test individual components or small feature-specific functionality in isolation while also maintaining separate integration and end-to-end tests.

## Testing Strategies

- **Unit Testing:** Tests focus on individual components or utility functions, ensuring they work in isolation.
- **Integration Testing:** These tests check if different components work well together and ensure the integration points are functioning properly.
- **End-to-End Testing:** Playwright is used to simulate real user behavior, testing the complete workflow of the application from start to finish.

# 🧪 Anitalk Testing Scripts

This section describes how to run different types of tests in the **Anitalk** project using your preferred package manager (`yarn`, `npm`, or `pnpm`).

---

## ✅ Available Test Scripts

| Script Name        | Description                        |
| ------------------ | ---------------------------------- |
| `test`             | Runs all Jest-based tests          |
| `test:unit`        | Runs only unit tests (Jest)        |
| `test:integration` | Runs only integration tests (Jest) |
| `test:e2e`         | Runs Playwright end-to-end tests   |
| `test:watch`       | Runs Jest in watch mode            |

---

## 🚀 Anitalk Test Scripts - Usage Examples

### With Yarn:

```bash
yarn test             # Run all Jest tests (unit + integration)
yarn test:unit        # Run only unit tests
yarn test:integration # Run only integration tests
yarn test:e2e         # Run Playwright tests (NOT included in yarn test)
yarn test:watch       # Run tests in watch mode
```

### With npm:

```bash
npm run test             # Run all Jest tests (unit + integration)
npm run test:unit        # Run only unit tests
npm run test:integration # Run only integration tests
npm run test:e2e         # Run Playwright tests (NOT included in npm run test)
npm run test:watch       # Run tests in watch mode
```

### With pnpm:

```bash
pnpm test             # Run all Jest tests (unit + integration)
pnpm test:unit        # Run only unit tests
pnpm test:integration # Run only integration tests
pnpm test:e2e         # Run Playwright tests (NOT included in pnpm test)
pnpm test:watch       # Run tests in watch mode
```

## ⚠️ Note

The `test` script using Jest **does not run Playwright tests**. To run Playwright e2e tests, you must explicitly run:

```bash
yarn test:e2e
# or
npm run test:e2e
# or
pnpm test:e2e
```

## Coverage Rules:

- Coverage is collected for all files in the 'src' directory.
- Minimum coverage thresholds are enforced to maintain code quality.
- Thresholds can be adjusted as the project evolves.

Example Jest coverage configuration (jest.config.js or jest.config.ts):

```bash
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts",       # Ignore barrel files
    "!src/**/__tests__/**",   # Ignore test files themselves
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 90,
      statements: 90
    }
  }
};
```

## Usage:

### Run Jest with coverage report

```bash
yarn test --coverage
npm run test -- --coverage
pnpm test --coverage

# The coverage report will be generated in the 'coverage' folder by default.
```

## Future Considerations

We are still finalizing the test architecture and might adjust the approach as we progress. The goal is to create a robust, scalable testing framework while maintaining flexibility in how tests are structured.
