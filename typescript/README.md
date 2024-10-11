# TypeScript Best Practices

1. **Consistent Coding Style**:
    - **Explanation**: Utilise un linter comme ESLint pour maintenir un style de code cohérent. 
      - @typescript-eslint/parser
      - @typescript-eslint/eslint-plugin
      - eslint-config-airbnb-typescript

    Configurer ESLint : Crée ou modifie le fichier .eslintrc.json à la racine de ton projet avec la configuration suivante :

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

    Cette configuration permet de bénéficier des bonnes pratiques d’Airbnb tout en intégrant les spécificités de TypeScript1.


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
   - **Explanation**: Utilise `readonly` pour les propriétés qui ne doivent pas être modifiées après leur initialisation.
    ```typescript
    interface User {
      readonly id: number;
      name: string;
      age: number;
    }
    ```

7. **Prefer `const` over `let`**:
   - **Explanation**: Utilise `const` pour les variables qui ne seront pas réassignées.
    ```typescript
    const userName: string = 'Alice';
    ```

8. **Use Utility Types**:
   - **Explanation**: Utilise les types utilitaires de TypeScript comme `Partial`, `Pick`, `Omit` pour manipuler les types.
    ```typescript
    interface User {
      name: string;
      age: number;
      email: string;
    }

    type UserWithoutEmail = Omit<User, 'email'>;
    ```

9. **Avoid Magic Numbers and Strings**:
   - **Explanation**: Définis des constantes pour les valeurs récurrentes afin de rendre le code plus lisible et maintenable.
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
      - **Explanation**: Utilise des commentaires JSDoc pour documenter les fonctions et les interfaces.
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

Ces ajouts devraient aider ton équipe à écrire un code plus propre, plus sûr et plus maintenable. Est-ce que tu as des questions ou des points spécifiques que tu aimerais approfondir ?


## Ressources

- [TypeScript GitBook : Un ouvrage open-source sur TypeScript](https://basarat.gitbook.io/typescript/)
- [Typescriptlang Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [The Concise TypeScript Book](https://typescript-book.vercel.app/books/the-concise-typescript-book/)
- [TS Playground](https://www.typescriptlang.org/play)
- [TS config cheat sheet](https://www.totaltypescript.com/tsconfig-cheat-sheet)
