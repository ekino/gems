# `@ekino/eslint-config-gems`

An ESLint shared configuration to enforce Ekino's best practices.

## Included Rulesets and Philosophy

This configuration bundles several recommended rulesets and adds specific rules based on Ekino's best practices documented in the `gems` repository:

- **ESLint Recommended:** Core best practices from ESLint (`@eslint/js`).
- **TypeScript ESLint Recommended:** Best practices for TypeScript code (`typescript-eslint`).
- **React:** Rules for React best practices, encouraging function components and proper JSX usage (`eslint-plugin-react`).
- **React Hooks:** Enforces the Rules of Hooks (`eslint-plugin-react-hooks`).
- **JSX Accessibility (A11y):** Basic checks for common accessibility issues in JSX (`eslint-plugin-jsx-a11y`).
- **JSDoc:** Encourages documentation and checks JSDoc syntax (`eslint-plugin-jsdoc`).
- **Ekino's JavaScript/TypeScript Practices:** Enforces rules like `no-var`, `prefer-const`, `eqeqeq`, and consistent `camelCase` naming.

It aims to enforce code quality, maintainability, accessibility, and consistency according to Ekino standards.

## Getting started

```
npm install --save-dev @ekino/eslint-config-gems
```

Then, extend `@ekino/eslint-config-gems` in your `eslint.config.js`:

```javascript
// eslint.config.js
import { defineConfig } from "eslint/config";
import gems from "@ekino/eslint-config-gems";

export default defineConfig([
  {
    extends: [gems],
    rules: {
      // custom rules here...
    },
  },
]);
```
