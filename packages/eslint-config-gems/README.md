# `@ekino/eslint-config-gems`

An ESLint shared configuration to enforce Ekino's best practices.

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
