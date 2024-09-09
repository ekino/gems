# React Best Practices

## Main best practices

- [Think in React](https://react.dev/learn/thinking-in-react)
- Use only Function Components, [no more Class Component](https://react.dev/reference/react/Component#alternatives)
- Use custom hooks instead of HOC, replace withFoo by useFoo
- Use composition
- Use slots
- Use "as" prop to a local variable `Element`
- Seperate the smart and dumb component
- Keep state as local as possible.
- Derive state, don't sync state, (you might not need an effect)[https://react.dev/learn/you-might-not-need-an-effect]
- Use key to reset a state, ie for (reseting a form)[https://react.dev/learn/preserving-and-resetting-state#resetting-a-form-with-a-key]
- Prefer state enums instead of booleans
- Use Storybook to code your components in isolation and enforce the separation of concern design pattern
- Use React Testing Library for testing your components and mimic users effects

## State Management

- [react-query](https://tanstack.com/query/v3)
- Please do not use Redux and not at all redux-saga

## Form

- [useId()](https://reacttraining.com/blog/use-useid-instead-of-hand-making-ids)

## Tools

### Linter

- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)

### Local tools

- [React Developer Tools](https://react.dev/learn/react-developer-tools)

### Tests

- [Storybook](https://storybook.js.org/)
- [React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [react-hooks-testing-library](https://github.com/testing-library/react-hooks-testing-library)
- [msw](https://mswjs.io/)

## Ressources

- [React](https://react.dev/)
