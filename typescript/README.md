# TypeScript Best Practices

Think to refer to [JavaScript best practices](../javascript/README.md) before reading this document.

## Consistent Coding Style

**Explanation**: Use the linter to enforce a consistent coding style across the codebase.

- **Installation**:

```bash
pnpm add --save-dev eslint @eslint/js typescript typescript-eslint
```

- **Configuration eslint.config.mjs**:

Please refer here for the configuration: https://typescript-eslint.io/getting-started

## Type Annotations

- **Explanation**: Provide type annotations for function arguments and return values to ensure type safety.

```typescript
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

## Types vs Interfaces

- **Explanation**: Use `type` for simple type definitions and `interface` when you need inheritance/extends functionality.

```typescript
// Simple types - use Type
type Point = {
  x: number;
  y: number;
};

type UserRole = "admin" | "user" | "guest";

type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

// When inheritance is needed - use Interface
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User extends BaseEntity {
  name: string;
  email: string;
  role: UserRole;
}

// When implementing a contract - use Interface
interface Repository<T> {
  find(id: string): Promise<T>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}
```

## Avoid `any` and `unknown`

- **Explanation**: Avoid using `any` and `unknown` types as much as possible to ensure type safety. `any` can be assigned to any type, while `unknown` requires a type assertion to be assigned to another type.

```typescript
let data: any; // Avoid this
let dataUser: unknown; // Prefer this over any, but avoid if possible
let userDataUser: User = dataUser as User; // Necessary type assertion for unknown usage

let userData: User; // Prefer this
```

## Strict Null Checks

- **Explanation**: Enable strict null checks to prevent null or undefined errors.

```typescript
let nullableString: string | null = null;
```

## Use `readonly` for Immutability

- **Explanation**: Use `readonly` for properties that should not be modified after initialization.

```typescript
interface User {
  readonly id: number;
  name: string;
  age: number;
}
```

## Use Utility Types

- **Explanation**: Use TypeScript utility types like `Partial`, `Pick`, `Omit` to manipulate types.

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

type UserWithoutEmail = Omit<User, "email">;
```

## Use of Enums

- **Explanation**: Use enums to represent a set of named values, improving code readability and maintainability.

  ```typescript
  enum UserRole {
    Admin = "Admin",
    User = "User",
    Guest = "Guest",
  }

  function getPermissions(role: UserRole) {
    switch (role) {
      case UserRole.Admin:
        return ["read", "write", "delete"];
      case UserRole.User:
        return ["read", "write"];
      case UserRole.Guest:
        return ["read"];
    }
  }
  ```

## Use of Literal Types

- **Explanation**: Use literal types for simple sets of values to ensure type safety and flexibility.

  ```typescript
  type OrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled";

  function updateOrderStatus(orderId: number, status: OrderStatus) {
    // Logic to update order status
    console.log(`Order ${orderId} is now ${status}`);
  }
  ```

## Use of `const` with `as const` for Immutable Objects

- **Explanation**: Use `const` with `as const` to define immutable objects, ensuring that values are not accidentally modified.

  ```typescript
  const Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retryAttempts: 3,
  } as const;

  type ConfigType = typeof Config;

  function initializeApp(config: ConfigType) {
    console.log(`Initializing app with API URL: ${config.apiUrl}`);
    // App initialization logic
  }
  ```

## Ressources

- [TypeScript GitBook : Un ouvrage open-source sur TypeScript](https://basarat.gitbook.io/typescript/)
- [Typescriptlang Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [The Concise TypeScript Book](https://typescript-book.vercel.app/books/the-concise-typescript-book/)
- [TS Playground](https://www.typescriptlang.org/play)
- [TS config cheat sheet](https://www.totaltypescript.com/tsconfig-cheat-sheet)
