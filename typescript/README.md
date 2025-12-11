# TypeScript - Best Practices

Concise guide of TypeScript patterns for type-safe and maintainable applications.

> **Prerequisites:** This guide assumes familiarity with [JavaScript best practices](../javascript/README.md). All JS patterns apply to TypeScript as well.

## Table of Contents

1. [External data validation with Zod](#1-external-data-validation-with-zod)
2. [Dictionary vs switch patterns](#2-dictionary-vs-switch-patterns)
3. [Result pattern for error handling](#3-result-pattern-for-error-handling)
4. [Type guards and safe narrowing](#4-type-guards-and-safe-narrowing)
5. [Alternatives to enums](#5-alternatives-to-enums)
6. [Utility types for reusability](#6-utility-types-for-reusability)
7. [Immutable patterns with as const](#7-immutable-patterns-with-as-const)
8. [Explicit naming conventions](#8-explicit-naming-conventions)
9. [Advanced Zod patterns](#9-advanced-zod-patterns)
10. [Linting with TypeScript ESLint](#10-linting-with-typescript-eslint)

---

## 1. External data validation with Zod

Always validate external data with Zod.

### ❌ AVOID: Blindly casting API responses

```typescript
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return (await response.json()) as User; // Dangerous!
}
```

### ✅ PREFER: Validate with Zod

```typescript
import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().optional(),
});

type User = z.infer<typeof UserSchema>;

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return UserSchema.parse(data); // Runtime validation
}
```

**Benefits:** Runtime type safety, clear error messages, schema composition.

---

## 2. Dictionary vs switch patterns

Prefer dictionary objects over switch statements.

### ❌ AVOID: Switch for simple mapping

```typescript
function getStatusLabel(status: string): string {
  switch (status) {
    case "active":
      return "Active";
    case "inactive":
      return "Inactive";
    default:
      return "Unknown";
  }
}
```

### ✅ PREFER: Dictionary with type safety

```typescript
const STATUS_LABELS = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
} as const;

type Status = keyof typeof STATUS_LABELS;

function getStatusLabel(status: Status): string {
  return STATUS_LABELS[status] ?? "Unknown";
}

// Complete configuration
const STATUS_CONFIG = {
  active: { label: "Active", color: "#28a745" },
  inactive: { label: "Inactive", color: "#dc3545" },
} as const;
```

**Benefits:** Performance, readability, immutability, type safety.

---

## 3. Result pattern for error handling

Explicit error handling with discriminated unions.

### ❌ AVOID: Unpredictable exceptions

```typescript
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error("User not found");
  return (await response.json()) as User;
}
```

### ✅ PREFER: Discriminated Result pattern

```typescript
type Result<T, E = string> =
  | { success: true; data: T }
  | { success: false; error: E };

type UserError = "USER_NOT_FOUND" | "VALIDATION_ERROR" | "NETWORK_ERROR";

async function fetchUser(id: string): Promise<Result<User, UserError>> {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (response.status === 404) {
      return { success: false, error: "USER_NOT_FOUND" };
    }
    if (!response.ok) {
      return { success: false, error: "NETWORK_ERROR" };
    }

    const user = UserSchema.parse(await response.json());
    return { success: true, data: user };
  } catch {
    return { success: false, error: "VALIDATION_ERROR" };
  }
}

// Type-safe usage
const result = await fetchUser("123");
if (result.success) {
  console.log(result.data.name); // TypeScript knows data exists
} else {
  console.error(result.error); // TypeScript knows error exists
}
```

**Benefits:** Explicit errors, type safety, predictable handling.

---

## 4. Type guards and safe narrowing

Zod-based type guards for runtime safety.

### ❌ AVOID: Unsafe assertions

```typescript
function processApiData(data: unknown) {
  const user = data as User; // Dangerous!
  return user.name.toUpperCase();
}
```

### ✅ PREFER: Type guards with Zod

```typescript
function isUser(data: unknown): data is User {
  return UserSchema.safeParse(data).success;
}

function processApiData(data: unknown) {
  if (isUser(data)) {
    return data.name.toUpperCase(); // TypeScript knows data is User
  }
  throw new Error("Invalid user data");
}

// Union types with validation
type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string };

function isSuccessResponse<T>(
  response: unknown,
  dataSchema: z.ZodSchema<T>
): response is { status: "success"; data: T } {
  const result = z
    .object({
      status: z.literal("success"),
      data: dataSchema,
    })
    .safeParse(response);

  return result.success;
}
```

**Benefits:** Runtime type safety, robust validation, clear debugging.

---

## 5. Alternatives to enums

Literal types and const assertions instead of enums.

### ❌ AVOID: Mutable enums

```typescript
enum UserRole {
  Admin = "admin",
  User = "user",
}

// Problem: can be mutated
UserRole.Admin = "hacked";
```

### ✅ PREFER: Literal types and const

```typescript
// Simple union
type UserRole = "admin" | "user" | "guest";

// Const array for validation
const USER_ROLES = ["admin", "user", "guest"] as const;
type UserRole = (typeof USER_ROLES)[number];

function isValidRole(role: string): role is UserRole {
  return USER_ROLES.includes(role as UserRole);
}

// Object configuration
const ROLE_CONFIG = {
  admin: { label: "Administrator", permissions: ["read", "write"] },
  user: { label: "User", permissions: ["read"] },
} as const;

// Discriminated union for state machines
type RequestState =
  | { status: "idle" }
  | { status: "loading"; progress: number }
  | { status: "success"; data: unknown };
```

**Benefits:** No runtime overhead, tree-shaking, immutability.

---

## 6. Utility types for reusability

Utility types to avoid duplication.

### ❌ AVOID: Duplicate definitions

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}
```

### ✅ PREFER: DRY utility types

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Derived types
type CreateUserRequest = Omit<User, "id" | "createdAt">;
type UpdateUserRequest = Partial<Pick<User, "name" | "email">>;
type UserResponse = Omit<User, "password">;

// Advanced combinations
type RequiredFields = Required<Pick<User, "name" | "email">>;

// Template literal types
type EventName = `on${Capitalize<string>}`;

// Form state
type FormState<T> = {
  [K in keyof T]: {
    value: T[K];
    error?: string;
  };
};
```

**Benefits:** Single source of truth, automatic updates, consistency.

For the complete list, see [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html).

## 7. Immutable patterns with as const

`as const` for immutable configurations.

### ❌ AVOID: Mutable configurations

```typescript
const config = {
  apiUrl: "https://api.example.com",
  features: { analytics: true },
};

// Dangerous - can be mutated
config.apiUrl = "https://malicious.com";

const themes = ["light", "dark"]; // string[]
```

### ✅ PREFER: as const for immutability

```typescript
const CONFIG = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  features: { analytics: true },
} as const;

// Precise types with as const
const THEMES = ["light", "dark", "auto"] as const;
type Theme = (typeof THEMES)[number]; // 'light' | 'dark' | 'auto'

// Environment configuration
const ENVIRONMENTS = {
  dev: { apiUrl: "http://localhost:3000", debug: true },
  prod: { apiUrl: "https://api.myapp.com", debug: false },
} as const;

type Environment = keyof typeof ENVIRONMENTS;
```

**Benefits:** Compile-time immutability, precise types, autocompletion.

---

## 8. Explicit naming conventions

Clear and self-documenting naming.

### ❌ AVOID: Ambiguous names

```typescript
const disabled = true;
const notAvailable = !isLoaded;

function process(data: unknown) {
  return data;
}
function check(input: string): boolean {
  return input.length > 0;
}
```

### ✅ PREFER: Explicit naming

```typescript
// Clear boolean prefixes
const isEnabled = true;
const isDataAvailable = isLoaded;
const hasValidFormat = checkValidation();

// Functions with action verbs
function validateEmailFormat(input: string): boolean {
  return input.length > 0 && input.includes("@");
}

function transformApiResponseToUser(rawData: unknown): User {
  return UserSchema.parse(rawData);
}

// Event handlers
function onUserProfileSubmit(event: FormEvent) {
  validateAndSubmitProfile();
}

// Descriptive constants
const MAX_RETRY_ATTEMPTS = 3;
const API_ENDPOINTS = {
  USER_PROFILE: "/api/user/profile",
} as const;
```

**Recommended patterns:**

- `is/has/can/should` for booleans
- `validate/transform/calculate/format` for functions
- `MAX_/DEFAULT_` for constants

---

## 9. Advanced Zod patterns

Advanced Zod patterns for complex validation.

### Schema composition

```typescript
// Reusable base schemas
const BaseEntitySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
});

const UserSchema = BaseEntitySchema.extend({
  name: z.string().min(1),
  email: z.string().email(),
});

// Smart preprocessing
const NormalizedUserSchema = z.preprocess((data: unknown) => {
  if (typeof data === "object" && data !== null) {
    const obj = data as Record<string, unknown>;
    return {
      ...obj,
      email:
        typeof obj.email === "string"
          ? obj.email.toLowerCase().trim()
          : obj.email,
    };
  }
  return data;
}, UserSchema);
```

### Performance and Validation

```typescript
// Schema cache
const schemaCache = new Map<string, z.ZodSchema>();

function getCachedSchema(key: string, factory: () => z.ZodSchema) {
  if (!schemaCache.has(key)) {
    schemaCache.set(key, factory());
  }
  return schemaCache.get(key)!;
}

// Bulk validation
async function validateBulkData<T>(
  items: unknown[],
  schema: z.ZodSchema<T>
): Promise<Result<T[]>> {
  const results: T[] = [];

  for (const item of items) {
    const result = schema.safeParse(item);
    if (!result.success) {
      return { success: false, error: "VALIDATION_ERROR" };
    }
    results.push(result.data);
  }

  return { success: true, data: results };
}
```

### Advanced error handling

```typescript
// Custom error map
const englishErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      return { message: `Invalid type: expected ${issue.expected}` };
    case z.ZodIssueCode.too_small:
      return { message: `Value too small: minimum ${issue.minimum}` };
    default:
      return { message: ctx.defaultError };
  }
};

z.setErrorMap(englishErrorMap);

// Detailed error report
function createErrorReport(error: z.ZodError) {
  return {
    summary: `${error.issues.length} validation error(s)`,
    details: error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })),
  };
}
```

**Benefits:** Optimized performance, reusability, improved debugging.

---

## 10. Linting with TypeScript ESLint

Use TypeScript ESLint to enforce consistent coding style and catch errors early.

### Recommended tsconfig options

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

- **`noImplicitAny`**: Forces explicit typing, prevents accidental `any` ([docs](https://www.typescriptlang.org/tsconfig/#noImplicitAny))
- **`strictNullChecks`**: Prevents null/undefined errors at compile time ([docs](https://www.typescriptlang.org/tsconfig/#strictNullChecks))

### Key ESLint rules to enable

```typescript
// eslint.config.js (flat config)
// See https://typescript-eslint.io/getting-started for setup

// Recommended strict rules:
// - @typescript-eslint/no-explicit-any
// - @typescript-eslint/strict-boolean-expressions
// - @typescript-eslint/no-unused-vars
// - @typescript-eslint/consistent-type-imports
// - @typescript-eslint/prefer-nullish-coalescing
```

The `@typescript-eslint/no-explicit-any` rule forces developers to justify `any` usage with an eslint-disable comment, making it visible during code review.

### ❌ AVOID: Using `any`

`any` disables all type checking and should be avoided.

```typescript
function processData(data: any) {
  // No type checking - any property access is allowed
  return data.foo.bar.baz; // No error, even if it crashes at runtime
}
```

**When `any` might be unavoidable:**

- Libraries without type definitions (check [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) first)
- Complex type migrations (temporary, with a plan to remove)

In these cases, use an eslint-disable comment with a justification.

### ✅ PREFER: Using `unknown` for untyped data

`unknown` is the type-safe alternative to `any`. It forces you to validate before use.

```typescript
function processData(data: unknown) {
  // Error: 'data' is of type 'unknown'
  return data.value;

  // Must validate first
  if (isUser(data)) {
    return data.value; // OK - TypeScript knows the type
  }
  throw new Error("Invalid data");
}
```

### `any` vs `unknown`

| | `any` | `unknown` |
|---|---|---|
| Assign anything to it | ✅ | ✅ |
| Assign it to other types | ✅ (dangerous) | ❌ (must narrow first) |
| Access properties | ✅ (no checking) | ❌ (must validate) |
| Use case | Avoid | External/untyped data |

**For external data (API responses, user input), always use Zod validation** (see [Section 1](#1-external-data-validation-with-zod)).

**Benefits:** Catches errors at compile time, enforces validation, improves code quality.

For installation and configuration, refer to the [official documentation](https://typescript-eslint.io/getting-started).

---

## Why these patterns

These TypeScript patterns reflect our commitment to:

- **Type Safety**: Advanced patterns that prevent runtime errors
- **Maintainability**: Code that's easy to modify and refactor
- **Performance**: Efficient patterns optimized for TypeScript and Zod
- **Consistency**: Shared conventions across all our projects
- **Developer Experience**: Rich APIs with autocompletion and clear error messages

## Essential resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/) - Official documentation
- [TypeScript Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html) - New features per version
- [Zod Documentation](https://zod.dev/) - Schema validation
- [TypeScript ESLint](https://typescript-eslint.io/) - Linting rules
