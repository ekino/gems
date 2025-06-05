# React Best Practices

## Main best practices

- [Think in React](https://react.dev/learn/thinking-in-react)
- Use only Function Components, [no more Class Component](https://react.dev/reference/react/Component#alternatives)
- Use custom hooks instead of HOC, replace withFoo by useFoo
- Use composition
- Use slots
- Use "as" prop to override an `Element`
- Seperate the smart and dumb component
- Keep state as local as possible.
- Derive state, don't sync state, (you might not need an effect)[https://react.dev/learn/you-might-not-need-an-effect]
- Prefer state enums instead of booleans
- Use Storybook to code your components in isolation and enforce the separation of concern design pattern
- Use React Testing Library for testing your components and mimic users effects
- Use the Web Platform as much as possible

## State Management

Read [Managing State](https://react.dev/learn/managing-state)

> When you want to coordinate two components, move their state to their common parent.  
> Then pass the information down through props from their common parent.  
> Finally, pass the event handlers down so that the children can change the parent's state.  
> It's useful to consider components as "controlled" (driven by props) or "uncontrolled" (driven by state).

If you are sure that `useState`, `useReducer` nor `useContext` cannot meet your needs, then you can choose an external tool from the following list

Data Management :

- [react-query](https://tanstack.com/query/v3)

State Management :

- [Jotai](https://jotai.org)
- [Mobx](https://mobx.js.org)
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)

State Machine :

- [xstate](https://xstate.js.org)

Deprecated :

- Redux & redux-saga

## Hooks

Hooks feature was introduced in React 16.8 that allow you to use state and other React features in functional components, which were previously only available in class components.  
Hooks are functions that let you "hook into" React state and lifecycle features from function components. They provide a more direct API to the React concepts you already know.  
Hooks make React components more functional and modular.

### Custom Hooks

You can create your own Hooks to extract and share logic between components. Custom Hooks are a convention that naturally follows from the design of Hooks, rather than a React feature.

## Form

Forms are a crucial part of Web applications and the Web Platform offers many options for managing forms natively.  
HTML5 validation features can cover a lot of your needs.  
If you need more fine grained validation, most form-related tasks can be handle by hooks like `useState` and `useEffect`, see [State Management](#state-management)).

If you are sure that `useState`, `useReducer` nor `useContext` cannot meet your needs, then you can choose an external tool from the following list :

- [React Hook Form](https://react-hook-form.com)
- [Formik](https://formik.org)

Resources :

- Use key to reset a state, ie for (reseting a form)[https://react.dev/learn/preserving-and-resetting-state#resetting-a-form-with-a-key]
- [useId()](https://reacttraining.com/blog/use-useid-instead-of-hand-making-ids)

## Data Access Layer (DAL)

The Data Access Layer (DAL) is a crucial architectural pattern that abstracts data fetching logic from your components, providing a clean separation between your UI and data management concerns.

### Why Use a Data Access Layer?

- **Separation of Concerns**: Keep data fetching logic separate from UI components
- **Reusability**: Share data access patterns across multiple components
- **Testability**: Easier to mock and test data operations
- **Consistency**: Standardize API interactions across your application
- **Error Handling**: Centralize error handling and retry logic
- **Type Safety**: Provide better TypeScript support for data operations

### Implementation Patterns

#### Basic Service Pattern

Create service modules that encapsulate API calls and business logic:

```typescript
// services/users/service.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

class UserService {
  private readonly baseUrl = "/api/users";

  async getUsers(): Promise<User[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    return response.json();
  }

  async getUserById(id: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user ${id}: ${response.statusText}`);
    }
    return response.json();
  }

  async createUser(user: CreateUserRequest): Promise<User> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.statusText}`);
    }
    return response.json();
  }
}

export const userService = new UserService();
```

#### TanStack Query Integration

Combine services with TanStack Query for optimal data management:

```typescript
// services/users/options.ts
import {
  useQuery,
  useMutation,
  useQueryClient,
  queryOptions,
  mutationOptions,
  skipToken,
} from "@tanstack/react-query";
import { userService, type User, type CreateUserRequest } from "./service";

// Queries options
export function usersQueryOptions() {
  return queryOptions({
    queryKey: ["users"],
    queryFn: userService.getUsers,
  });
}

export function userByIdQueryOptions(id?: string | null) {
  return queryOptions({
    queryKey: ["users", id],
    queryFn: id ? () => userService.getUserById(id) : skipToken,
    enabled: !!id,
  });
}

// Mutations options
export function createUserMutationOptions() {
  const queryClient = useQueryClient();

  return mutationOptions({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
```

#### Component Usage

Use the data access layer in your components:

```typescript
// components/users/list.tsx
import { useQuery } from "@tanstack/react-query";
import {
  usersQueryOptions,
  createUserMutationOptions,
} from "../services/users/options";

export function UserList() {
  const { data: users, isLoading, error } = useQuery(usersQueryOptions());
  const createUserMutation = useMutation(createUserMutationOptions());

  const handleCreateUser = async (userData: CreateUserRequest) => {
    try {
      await createUserMutation.mutateAsync(userData);
      // Success handled by query invalidation
    } catch (error) {
      // Error handling
      console.error("Failed to create user:", error);
    }
  };

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      <CreateUserForm onSubmit={handleCreateUser} />
    </div>
  );
}
```

### Best Practices

1. **Consistent Naming**: Use consistent naming conventions for your services and hooks
2. **Type Safety**: Always define TypeScript interfaces for your data models
3. **Error Boundaries**: Implement proper error boundaries for data fetching errors
4. **Loading States**: Always handle loading and error states in your UI
5. **Query Key Management**: Use consistent query key patterns for cache management
6. **Optimistic Updates**: Implement optimistic updates for better user experience
7. **Request Deduplication**: Let TanStack Query handle request deduplication automatically
8. **Background Refetching**: Configure appropriate stale time and background refetch intervals

Resources :

- [TanStack Query](https://tanstack.com/query/latest)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## Performance

@TODO

Resources :

- (`<Profiler>`)[https://react.dev/reference/react/Profiler]
- (compiler)[https://react.dev/learn/react-compiler]

## Client component

@TODO @React19

## Server component

@TODO @React19

## Server function

@TODO @React19

## Tools

### Linter

Resources :

- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)

### Debug

Resources :

- [React Developer Tools](https://react.dev/learn/react-developer-tools)

### Tests

Resources :

- [jest](https://jestjs.io)
- [vitest](https://vitest.dev)
- [React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [react-hooks-testing-library](https://github.com/testing-library/react-hooks-testing-library)
- [msw](https://mswjs.io)

## Misc

- [React](https://react.dev)
