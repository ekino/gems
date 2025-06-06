# React Best Practices

## Main best practices

- [Think in React](https://react.dev/learn/thinking-in-react)
- Use only Function Components, [no more Class Component](https://react.dev/reference/react/Component#alternatives)
- Use custom hooks instead of HOC, replace withFoo by useFoo
- Follow the [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
- Use composition
- Use slots
- Use "as" prop to override an `Element`
- Seperate the smart and dumb component
- Keep state as local as possible.
- Derive state, don't sync state, [you might not need an effect](https://react.dev/learn/you-might-not-need-an-effect)
- Prefer state enums instead of booleans
- Use Storybook to code your components in isolation and enforce the separation of concern design pattern
- Use React Testing Library for testing your components and mimic users effects
- Use the Web Platform as much as possible

## State Management

Read [Managing State](https://react.dev/learn/managing-state)

> When you want to coordinate two components, move their state to their common parent.  
> Then pass the information down through props from their common parent.  
> Finally, pass the event handlers down so that the children can change the parent’s state.  
> It’s useful to consider components as “controlled” (driven by props) or “uncontrolled” (driven by state).

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

- [Redux Toolkit (RTK)](https://redux-toolkit.js.org/introduction/why-rtk-is-redux-today) – Still actively maintained and officially recommended for Redux. However, we don't recommend it for new projects due to simpler alternatives like Zustand or Jotai.
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
