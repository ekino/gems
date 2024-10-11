# TypeScript Best Practices

1. **Consistent Coding Style**:
   - **Explanation**: Use a linter like ESLint to maintain a consistent coding style.
      - @typescript-eslint/parser
      - @typescript-eslint/eslint-plugin
      - eslint-config-airbnb-typescript

   Configure ESLint: Create or modify the `.eslintrc.json` file at the root of your project with the following configuration:

   ```json
    {
        "extends": [
            "airbnb-typescript"
        ],
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
            "project": "./tsconfig.json"
        },
        "plugins": [
            "@typescript-eslint"
        ],
        "rules": {
            "semi": ["error", "always"],
            "quotes": ["error", "single"],
            "no-unused-vars": "error",
            "eqeqeq": ["error", "always"],
            "curly": ["error", "all"],
            "no-console": "warn",
            "consistent-return": "error",
            "prefer-const": "error"
        }
    }
    ```

   This configuration allows you to benefit from Airbnb's best practices while integrating TypeScript specifics.

2. **Type Annotations**:
   - **Explanation**: Provide type annotations for function arguments and return values to ensure type safety.
   ```typescript
   function greet(name: string): string {
     return `Hello, ${name}`;
   }
   ```

3. **Interfaces**:
   - **Explanation**: Prefer interfaces over type aliases for defining object shapes.
   ```typescript
   interface User {
     name: string;
     age: number;
   }
   ```

4. **Avoid `any`**:
   - **Explanation**: Using `any` defeats the purpose of TypeScript's type safety.
   ```typescript
   let data: any; // Avoid this
   let userData: User; // Prefer this
   ```

5. **Strict Null Checks**:
   - **Explanation**: Enable strict null checks to prevent null or undefined errors.
   ```typescript
   let nullableString: string | null = null;
   ```

6. **Use `readonly` for Immutability**:
   - **Explanation**: Use `readonly` for properties that should not be modified after initialization.
    ```typescript
    interface User {
      readonly id: number;
      name: string;
      age: number;
    }
    ```

7. **Prefer `const` over `let`**:
   - **Explanation**: Use `const` for variables that will not be reassigned.
    ```typescript
    const userName: string = 'Alice';
    ```

8. **Use Utility Types**:
   - **Explanation**: Use TypeScript utility types like `Partial`, `Pick`, `Omit` to manipulate types.
    ```typescript
    interface User {
      name: string;
      age: number;
      email: string;
    }

    type UserWithoutEmail = Omit<User, 'email'>;
    ```

9. **Avoid Magic Numbers and Strings**:
   - **Explanation**: Define constants for recurring values to make the code more readable and maintainable.
    ```typescript
    const MAX_USERS = 100;

    function createUser(name: string): User {
      if (users.length >= MAX_USERS) {
        throw new Error('Max users reached');
      }
      // ...
    }
    ```

10. **Document Your Code**:
- **Explanation**: Use JSDoc comments to document functions and interfaces.
  ```typescript
  /**
   * Greets a user by name.
   * @param name - The name of the user.
   * @returns A greeting message.
   */
  function greet(name: string): string {
    return `Hello, ${name}`;
  }
  ```

11. **Use of Enums**:
- **Explanation**: Use enums to represent a set of named values, improving code readability and maintainability.
  ```typescript
  enum UserRole {
    Admin = 'Admin',
    User = 'User',
    Guest = 'Guest'
  }

   function getPermissions(role: UserRole) {
    switch (role) {
     case UserRole.Admin:
     return ['read', 'write', 'delete'];
     case UserRole.User:
     return ['read', 'write'];
     case UserRole.Guest:
     return ['read'];
    }
   }
    ```

12. **Use of Literal Types**:
- **Explanation**: Use literal types for simple sets of values to ensure type safety and flexibility.
  ```typescript
  type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';

   function updateOrderStatus(orderId: number, status: OrderStatus) {
   // Logic to update order status
   console.log(`Order ${orderId} is now ${status}`);
   }
   ```

13. **Use of `const` with `as const`**:
- **Explanation**: Use `const` with `as const` to define immutable objects, ensuring that values are not accidentally modified.
  ```typescript
  const Config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retryAttempts: 3
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
