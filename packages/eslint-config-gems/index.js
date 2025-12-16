import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import jsdocPlugin from "eslint-plugin-jsdoc";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // reactPlugin.configs.flat.recommended, // Currently causes issues with flat config, configure manually
  // jsxA11yPlugin.configs.flat.recommended, // Currently causes issues with flat config, configure manually
  jsdocPlugin.configs["flat/recommended"],
  {
    // Global ignores
    ignores: ["**/dist/**", "**/node_modules/**", "**/*.config.js"],
  },
  {
    // Settings shared across JS/TS/React files
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        browser: true,
        es2021: true,
        node: true,
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      jsdoc: jsdocPlugin,
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    rules: {
      // General JS/TS Best Practices from gems/javascript/README.md
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      eqeqeq: ["error", "always"],
      camelcase: ["warn", { properties: "never" }], // Warn for variables, ignore properties
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Allow unused vars prefixed with _
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ], // TS version

      // React specific rules from gems/react/README.md
      "react/react-in-jsx-scope": "off", // Not needed with new JSX transform
      "react/prop-types": "off", // Use TypeScript for prop types
      "react/jsx-uses-react": "off", // Not needed with new JSX transform
      "react/jsx-uses-vars": "error",
      "react/prefer-stateless-function": "warn", // Encourage function components
      "react/button-has-type": "error", // Ensure buttons have a type
      "react/no-unescaped-entities": "warn", // Warn about potentially problematic entities

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error", // Enforce Rules of Hooks
      "react-hooks/exhaustive-deps": "warn", // Check effect dependencies

      // Accessibility rules from gems/a11y/README.md (using jsx-a11y plugin)
      // Start with recommended, can add more specific rules later
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
      "jsx-a11y/label-has-associated-control": ["warn", { assert: "either" }], // Allow label wrapping or htmlFor
      "jsx-a11y/click-events-have-key-events": "warn", // Enforce keyboard interaction for clickable elements
      "jsx-a11y/no-static-element-interactions": "warn", // Prefer semantic interactive elements

      // JSDoc rules from gems/javascript/README.md
      "jsdoc/require-param-description": "warn",
      "jsdoc/require-returns-description": "warn",
      "jsdoc/check-types": "warn",
      "jsdoc/require-jsdoc": [
        "warn",
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: false, // Optional for arrow functions
            FunctionExpression: false, // Optional for function expressions
          },
        },
      ],

      // Original rule from the file
      semi: ["error", "always"], // Enforce semicolons
    },
  },
  {
    // Override for TypeScript files
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser, // Use TypeScript parser
      parserOptions: {
        project: "./tsconfig.json", // Point to your tsconfig if needed for type-aware rules
      },
    },
    rules: {
      // Add specific TypeScript rules or overrides here if needed
      // Example: Enforce explicit return types
      // '@typescript-eslint/explicit-function-return-type': 'warn',
    },
  }
);
