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

React applications can face performance challenges as they grow in complexity. Here are best practices to optimize your React applications for better performance:

### Component Optimization

- **Avoid unnecessary re-renders**
  - Use `React.memo()` for functional components that render often with the same props
    ```jsx
    // Example of React.memo()
    const MemoizedComponent = React.memo(function MyComponent(props) {
      // This component will only re-render if its props change
      return (
        <div>
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
      );
    });

    // With custom comparison function
    const MemoizedComponentWithCustomComparison = React.memo(
      function MyComponent(props) {
        return (
          <div>
            <h2>{props.title}</h2>
            <p>{props.content.description}</p>
          </div>
        );
      },
      (prevProps, nextProps) => {
        // Only re-render if title has changed or description content is different
        return (
          prevProps.title === nextProps.title &&
          prevProps.content.description === nextProps.content.description
        );
      }
    );
    ```
  - Implement proper dependency arrays in `useEffect`, `useMemo`, and `useCallback`
    ```jsx
    // Example of proper dependency array usage
    
    // useEffect with correct dependencies
    function SearchResults({ query, filters }) {
      const [results, setResults] = useState([]);
      
      useEffect(() => {
        // This effect only runs when query or filters change
        fetchResults(query, filters).then(data => setResults(data));
      }, [query, filters]); // Explicitly list all dependencies
      
      return <ResultsList data={results} />;
    }
    
    // useMemo to memoize expensive calculations
    function DataAnalysis({ data, threshold }) {
      // This calculation will only re-run when data or threshold changes
      const processedData = useMemo(() => {
        return data.filter(item => item.value > threshold)
                   .map(item => ({ ...item, highlighted: true }));
      }, [data, threshold]);
      
      return <DataVisualizer data={processedData} />;
    }
    
    // useCallback to prevent function recreation
    function ParentComponent({ itemId }) {
      // This function is memoized and won't change between renders
      // unless itemId changes
      const handleItemUpdate = useCallback((newValue) => {
        updateItem(itemId, newValue);
      }, [itemId]);
      
      return <ChildComponent onUpdate={handleItemUpdate} />;
    }
    ```
  - Extract frequently changing state from components that have expensive renders
    ```jsx
    // Before: Entire component re-renders when count changes
    function Dashboard({ user }) {
      const [count, setCount] = useState(0);
      
      // Expensive render that doesn't depend on count
      return (
        <div>
          <Counter count={count} setCount={setCount} />
          <ExpensiveUserProfile user={user} />
        </div>
      );
    }
    
    // After: Extract changing state to separate component
    function Dashboard({ user }) {
      return (
        <div>
          <CounterContainer />
          <ExpensiveUserProfile user={user} />
        </div>
      );
    }
    
    function CounterContainer() {
      const [count, setCount] = useState(0);
      return <Counter count={count} setCount={setCount} />;
    }
    ```

- **Code-splitting and lazy loading**
  - Break your app into smaller bundles using dynamic `import()`
  - Use `React.lazy()` and `Suspense` to load components only when needed
  ```jsx
  // Example of code-splitting with React.lazy
  
  // Instead of importing directly
  // import ExpensiveComponent from './ExpensiveComponent';
  
  // Use lazy loading
  const ExpensiveComponent = React.lazy(() => import('./ExpensiveComponent'));
  const AnotherLazyComponent = React.lazy(() => import('./AnotherComponent'));
  
  function App() {
    return (
      <div>
        <Header />
        <MainContent />
        {/* Wrap lazy components in Suspense */}
        <React.Suspense fallback={<LoadingSpinner />}>
          <Route path="/expensive">
            <ExpensiveComponent />
          </Route>
          <Route path="/another">
            <AnotherLazyComponent />
          </Route>
        </React.Suspense>
        <Footer />
      </div>
    );
  }
  ```

- **Virtualization for long lists**
  - Use virtualization libraries like `react-window` or `react-virtualized` for long lists
  - Only render items currently visible in the viewport
  ```jsx
  // Example using react-window for virtualized lists
  import { FixedSizeList } from 'react-window';
  
  function VirtualizedList({ items }) {
    // Render only the visible items
    const Row = ({ index, style }) => (
      <div style={style}>
        <div className="list-item">
          <img src={items[index].image} alt={items[index].name} />
          <div>{items[index].name}</div>
        </div>
      </div>
    );
    
    return (
      <FixedSizeList
        height={500}
        width="100%"
        itemCount={items.length}
        itemSize={80} // Height of each row
      >
        {Row}
      </FixedSizeList>
    );
  }
  ```

### When to Use vs. When Not to Use Memoization Hooks

Memoization in React (via `React.memo`, `useMemo`, and `useCallback`) can significantly improve performance when used correctly, but it can also add unnecessary complexity and even harm performance when misused. Here's a comprehensive guide on when you should and shouldn't use these optimization techniques:

#### React.memo

**Use `React.memo` when:**

- A component renders frequently with the same props
- The component has expensive rendering logic
- The component is a pure function of its props
- The component is a medium to large component (with many elements or nested components)
- The component receives props that don't change often

```jsx
// GOOD: Complex component that renders frequently but with the same props
const ComplexChart = React.memo(function ComplexChart({ data, width, height }) {
  // Complex rendering with many elements or nested components
  return (
    <svg width={width} height={height}>
      {data.map(item => (
        <ChartItem key={item.id} value={item.value} color={item.color} />
      ))}
    </svg>
  );
});
```

**Don't use `React.memo` when:**

- The component is simple and renders quickly
- The component's props change on almost every render
- The component almost always renders with different props
- The component uses hooks that cause it to re-render regardless of props (e.g., context or global state)

```jsx
// BAD: Simple component that renders quickly
const SimpleLabel = React.memo(({ text }) => <span>{text}</span>); // Memoization overhead > rendering cost

// BAD: Props change on every render
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <MemoizedChild 
      value={count} 
      onChange={() => setCount(count + 1)}  // New function created on every render
    />
  );
}
```

#### useMemo

**Use `useMemo` when:**

- You have computationally expensive calculations
- You're deriving data that's used in multiple places in the component
- You need to maintain referential equality for objects or arrays passed as props or dependencies
- You're creating objects that should only change when their dependencies change

```jsx
// GOOD: Expensive data processing
function DataGrid({ rawData, filterCriteria }) {
  // Expensive filtering and sorting only runs when dependencies change
  const processedData = useMemo(() => {
    return rawData
      .filter(item => complexFilteringLogic(item, filterCriteria))
      .sort((a, b) => complexSortingLogic(a, b))
      .map(item => transformItem(item));
  }, [rawData, filterCriteria]);
  
  return <Table data={processedData} />;
}

// GOOD: Preserving referential equality for props
function ParentComponent() {
  // Options object has stable reference, only changes when dependencies change
  const options = useMemo(() => ({
    theme: 'dark',
    showControls: true,
    maxItems: 100
  }), []); // Empty dependency array means this will only be computed once
  
  return <MemoizedChild options={options} />;
}
```

**Don't use `useMemo` when:**

- The computation is simple (e.g., basic math, string concatenation)
- The cost of memoization exceeds the cost of the calculation
- The dependencies change on every render anyway
- For non-expensive data transformations on small datasets

```jsx
// BAD: Simple calculation
function ProductRow({ price, quantity }) {
  // Memoization overhead > calculation cost
  const total = useMemo(() => price * quantity, [price, quantity]);
  
  return <div>Total: ${total}</div>;
}

// BAD: Dependencies change on every render
function Counter() {
  const [count, setCount] = useState(0);
  
  // Pointless memoization as the dependency changes on every render
  const doubledValue = useMemo(() => count * 2, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubledValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

#### useCallback

**Use `useCallback` when:**

- Passing callback functions to optimized child components that rely on referential equality (using React.memo)
- Functions are used as dependencies in useEffect hooks
- Functions are part of a context value
- Performance profiling shows that function recreation is causing performance issues

```jsx
// GOOD: Callback passed to memoized child component
function TodoList({ todos }) {
  const [items, setItems] = useState(todos);
  
  // Stable function reference prevents unnecessary re-renders of MemoizedItem
  const handleDelete = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);
  
  return (
    <ul>
      {items.map(item => (
        <MemoizedItem 
          key={item.id} 
          item={item} 
          onDelete={handleDelete} 
        />
      ))}
    </ul>
  );
}

// GOOD: Function used in effect dependencies
function DataFetcher({ userId }) {
  const [data, setData] = useState(null);
  
  // Stable fetch function only changes when userId changes
  const fetchUserData = useCallback(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setData(data));
  }, [userId]);
  
  useEffect(() => {
    fetchUserData();
    // Scheduled refresh every minute
    const intervalId = setInterval(fetchUserData, 60000);
    return () => clearInterval(intervalId);
  }, [fetchUserData]); // stable dependency
  
  return <UserProfile data={data} />;
}
```

**Don't use `useCallback` when:**

- The function is only used for event handlers in the same component
- The function is not passed as a prop to any memoized child components
- The component isn't being re-rendered frequently
- The function has many dependencies that change often

```jsx
// BAD: Function only used within the same component
function SimpleButton() {
  // Unnecessary - not passed to child components or used in effect dependencies
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);
  
  return <button onClick={handleClick}>Click me</button>;
}

// BAD: Function with frequently changing dependencies
function Form({ formValues, onSubmit }) {
  // Dependencies change too frequently, making memoization pointless
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(formValues);
  }, [formValues, onSubmit]); // formValues likely changes often
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

#### General Rules of Thumb

1. **Measure First**: Use React DevTools Profiler to identify actual performance bottlenecks before applying optimizations.

2. **Optimize the Right Components**: Focus on components that:
   - Render frequently
   - Are expensive to render
   - Don't actually need to re-render based on the state/props that changed

3. **Consider the Optimization Cost**: Remember that memoization itself has a cost:
   - Memory overhead for storing the memoized values
   - Computation overhead for checking dependencies
   - Code complexity and maintainability impact

4. **Look Forward to React Compiler**: As the React Compiler (formerly React Forget) matures, many manual memoization optimizations will become unnecessary. Focus on writing clean, maintainable code that follows React's recommended patterns.

### State Management Optimizations

- **Use local state when possible**
  - Keep state as close as possible to where it's used
  - Lift state up only when necessary
  ```jsx
  // Better approach - keep state local to component
  function UserList() {
    // State that only affects this component is kept here
    const [sortOrder, setSortOrder] = useState('asc');
    
    return (
      <div>
        <SortControls 
          sortOrder={sortOrder} 
          onSortChange={setSortOrder} 
        />
        <Users sortOrder={sortOrder} />
      </div>
    );
  }
  ```

- **Optimize context usage**
  - Split contexts into smaller, more focused providers
  - Avoid placing frequently changing values in context
  ```jsx
  // Instead of one large context:
  const AppContext = React.createContext();
  
  function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState([]);
    
    // Every consumer re-renders when any value changes
    return (
      <AppContext.Provider value={{ 
        user, setUser, 
        theme, setTheme, 
        notifications, setNotifications 
      }}>
        {children}
      </AppContext.Provider>
    );
  }
  
  // Better: Split into focused contexts
  const UserContext = React.createContext();
  const ThemeContext = React.createContext();
  const NotificationContext = React.createContext();
  
  function AppProvider({ children }) {
    return (
      <UserProvider>
        <ThemeProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </ThemeProvider>
      </UserProvider>
    );
  }
  ```
  - Consider using context selectors to prevent unnecessary re-renders
  ```jsx
  // Using a selector pattern to prevent unnecessary renders
  function UserAvatar() {
    // Only re-renders when user.avatar changes, not other user properties
    const avatar = useUserContext(state => state.user.avatar);
    
    return <img src={avatar} alt="User avatar" />;
  }
  ```

### React 18+ Performance Features

- **Use Concurrent Features**
  - Leverage concurrent rendering with `useTransition` and `useDeferredValue`
  ```jsx
  // Example of useTransition
  function SearchResults() {
    const [query, setQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isPending, startTransition] = useTransition();
    
    const handleChange = (e) => {
      // Urgent update: Update the input immediately
      const value = e.target.value;
      setQuery(value);
      
      // Non-urgent update: Wrapped in startTransition
      startTransition(() => {
        // This update is marked as non-blocking and can be interrupted
        setSearchQuery(value);
      });
    };
    
    return (
      <div>
        <input value={query} onChange={handleChange} />
        {isPending ? <Spinner /> : <Results query={searchQuery} />}
      </div>
    );
  }
  ```

  - **Example of useDeferredValue**
  ```jsx
  import { useState, useDeferredValue } from 'react';
  
  function SearchResults({ query }) {
    // Heavy computation that depends on query
    const items = filterItems(query);
    
    return (
      <div>
        {items.map(item => (
          <SearchResultItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
  
  function SearchPage() {
    const [query, setQuery] = useState('');
    // Create a deferred version of the query value
    const deferredQuery = useDeferredValue(query);
    // isStale is true when deferredQuery !== query
    const isStale = query !== deferredQuery;
    
    return (
      <div>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <div style={{ opacity: isStale ? 0.5 : 1 }}>
          <SearchResults query={deferredQuery} />
        </div>
        {isStale && <p>Loading results...</p>}
      </div>
    );
  }
  ```

- **Automatic Batching**
  - React 18 automatically batches state updates, reducing unnecessary re-renders
  ```jsx
  // In React 17, only updates inside React event handlers were batched
  function handleClick() {
    // In React 17, these caused 2 separate renders
    // In React 18, these are automatically batched into 1 render
    setCount(c => c + 1);
    setFlag(f => !f);
  }
  
  // In React 18, even async updates are batched
  function handleClick() {
    fetch('/api/data').then(() => {
      // In React 17, these caused 2 separate renders
      // In React 18, these are batched into 1 render
      setCount(c => c + 1);
      setFlag(f => !f);
    });
  }
  ```

### When NOT to Use Performance Optimizations

Performance optimizations come with costs like increased code complexity and maintainability challenges. Here are situations when you should avoid unnecessary optimizations:

- **Don't memoize simple components**
  ```jsx
  // DON'T use memo for simple components with inexpensive rendering
  // This is unnecessary overhead and can make performance worse
  const SimpleText = React.memo((props) => {
    return <span>{props.text}</span>; // Too simple to benefit from memoization
  });
  ```

- **Don't useCallback for event handlers that aren't passed to children**
  ```jsx
  // Unnecessary useCallback
  function UserProfile() {
    // This doesn't need useCallback since it's only used in this component
    const handleClick = useCallback(() => {
      console.log('Clicked');
    }, []);
    
    return <button onClick={handleClick}>Click me</button>;
  }
  
  // When it IS useful - passing to optimized child components
  function ParentComponent() {
    // Useful when passed to a memoized child component
    const handleDelete = useCallback((id) => {
      deleteItem(id);
    }, []);
    
    return <MemoizedChildList onDelete={handleDelete} />;
  }
  ```

- **Don't useMemo for cheap calculations**
  ```jsx
  // Unnecessary useMemo
  function ProductItem({ price, quantity }) {
    // The overhead of useMemo is higher than the calculation cost
    const total = useMemo(() => price * quantity, [price, quantity]);
    
    return <div>Total: ${total}</div>;
  }
  
  // When it IS useful - for expensive calculations
  function DataVisualization({ data }) {
    // Useful for expensive operations that shouldn't rerun on every render
    const processedData = useMemo(() => {
      return data
        .filter(item => complexFilterLogic(item))
        .map(item => expensiveTransformation(item))
        .sort(complexSortingAlgorithm);
    }, [data]);
    
    return <Chart data={processedData} />;
  }
  ```

- **Don't optimize prematurely**
  - Measure first, then optimize based on actual bottlenecks
  - Use the React Profiler to identify actual performance issues
  - Remember that premature optimization can lead to more complex and harder-to-maintain code
  ```jsx
  // Focus on writing clean, readable code first
  function UserDashboard({ user, posts }) {
    return (
      <div>
        <UserProfile user={user} />
        <PostList posts={posts} />
      </div>
    );
  }
  
  // Then optimize only after measuring with the Profiler and finding issues
  const MemoizedPostList = React.memo(PostList);
  
  function UserDashboard({ user, posts }) {
    return (
      <div>
        <UserProfile user={user} />
        <MemoizedPostList posts={posts} />
      </div>
    );
  }
  ```

### Measurement & Monitoring

- **React Profiler API**
  - Use the `<Profiler>` component to measure rendering performance
  ```jsx
  function onRenderCallback(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // "mount" (first render) or "update" (re-render)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time for the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) {
    // Log or send to analytics service
    console.log(`Component ${id} took ${actualDuration}ms to render`);
  }

  return (
    <Profiler id="MyComponent" onRender={onRenderCallback}>
      <MyComponent />
    </Profiler>
  );
  ```

- **React DevTools Profiler**
  - Use React DevTools Profiler to identify performance bottlenecks
  - Record and analyze rendering performance in development

### Memory Leaks and Cleanup

- **Always clean up effects**
  ```jsx
  function DataComponent({ id }) {
    const [data, setData] = useState(null);
    
    useEffect(() => {
      let isMounted = true;
      const subscription = dataSource.subscribe(id);
      
      subscription.on('data', (newData) => {
        // Prevent setting state on unmounted component
        if (isMounted) {
          setData(newData);
        }
      });
      
      // Return cleanup function to prevent memory leaks
      return () => {
        isMounted = false;
        subscription.unsubscribe();
      };
    }, [id]);
    
    return <div>{data ? <DataDisplay data={data} /> : <Spinner />}</div>;
  }
  ```

### Performance Debugging Tips

- **Use React DevTools Profiler for debugging**
  - Record interactions and analyze component renders
  - Look for unexpected re-renders in the flame chart
  - Identify components that render too frequently or take too long

- **Set up performance monitoring in production**
  ```jsx
  // Configure a minimal production profiler that logs slow renders
  if (process.env.NODE_ENV === 'production') {
    function logSlowRenders(id, phase, actualDuration) {
      if (actualDuration > 10) { // Log renders that take more than 10ms
        console.warn(`Slow render detected: ${id} took ${actualDuration}ms`);
        // Send to analytics or monitoring service
      }
    }
    
    function App() {
      return (
        <Profiler id="App" onRender={logSlowRenders}>
          <YourApp />
        </Profiler>
      );
    }
  }
  ```

### Detailed Guide to Profiling React Performance Issues

React provides powerful tools for identifying and diagnosing performance issues in your applications. Here's a comprehensive approach to profiling React applications:

#### Using React DevTools Profiler

React DevTools Profiler is the most powerful tool for identifying performance bottlenecks in React applications:

1. **Installation and Setup**
   - Install React DevTools browser extension for [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
   - Open DevTools and navigate to the "Profiler" tab

2. **Recording a Performance Session**
   ```jsx
   // Steps to properly profile your application:
   // 1. Open React DevTools and go to the Profiler tab
   // 2. Click the record button (circular button)
   // 3. Perform the action you want to profile in your app
   // 4. Click the record button again to stop recording
   ```

3. **Analyzing the Flame Chart**
   - The flame chart shows component render durations
   - Taller bars indicate deeper component trees
   - Wider bars indicate components that took longer to render
   - Components that render frequently may indicate optimization opportunities
   
   ![React DevTools Profiler screenshot showing flame graph](https://react.dev/images/docs/react-devtools-profiler.png)

4. **Ranked Chart View**
   - Switch to the "Ranked" view to see components sorted by render time
   - Focus optimization efforts on components at the top of this list

5. **Component Interactions**
   - Use the "Interactions" tracking to see which user interactions triggered renders
   - Add tracing with the `trace` API from the scheduler package:
   ```jsx
   import { trace } from 'scheduler/tracing';
   
   function handleClick() {
     trace('button click', performance.now(), () => {
       // Code to be traced
       this.setState({ count: this.state.count + 1 });
     });
   }
   ```

#### Lighthouse Performance Audits

Use Lighthouse in Chrome DevTools to get overall performance metrics for your React application:

1. Open Chrome DevTools and go to the "Lighthouse" tab
2. Select "Performance" and run an audit
3. Pay special attention to metrics like:
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Time to Interactive (TTI)
   - Total Blocking Time (TBT)

#### Using the React Profiler API in Code

The `<Profiler>` component provides programmatic access to render timing information:

```jsx
import { Profiler } from 'react';

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions
) {
  // Log to console during development
  console.log({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  });
  
  // In production, send to analytics service
  if (process.env.NODE_ENV === 'production') {
    analytics.trackPerformance({
      componentId: id,
      renderTime: actualDuration
    });
  }
}

function MyApp() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <App />
    </Profiler>
  );
}
```

You can nest profilers to measure specific sections of your app:

```jsx
function ComplexDashboard() {
  return (
    <div>
      <Profiler id="NavMenu" onRender={onRenderCallback}>
        <NavigationMenu />
      </Profiler>
      <Profiler id="MainContent" onRender={onRenderCallback}>
        <MainContent />
      </Profiler>
      <Profiler id="Sidebar" onRender={onRenderCallback}>
        <Sidebar />
      </Profiler>
    </div>
  );
}
```

#### Web Vitals Monitoring

Integrate the `web-vitals` library to monitor Core Web Vitals in your React application:

```jsx
import { getCLS, getFID, getLCP } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send metric to your analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
```

### In-Depth: React Compiler

The React Compiler (formerly known as React Forget) represents a significant advancement in React's performance optimization strategy. Here's a detailed look at how it works and what it means for developers:

#### How React Compiler Works

React Compiler is a compile-time optimization tool that analyzes your components and automatically adds memoization where beneficial:

1. **Static Analysis**: The compiler performs static analysis of your React components to understand how props and state are used.

2. **Tracking Dependencies**: It precisely tracks which values each component depends on, similar to what you would manually specify in dependency arrays.

3. **Automatic Memoization**: Based on this analysis, it inserts memoization boundaries at optimal points in your component tree.

4. **Fine-grained Updates**: The compiler enables more granular re-rendering, minimizing the component tree that needs to be re-rendered.

```jsx
// Before React Compiler: Manual optimization required
const ExpensiveComponent = React.memo(function ExpensiveComponent(props) {
  // Component logic
});

// With React Compiler: Write normal components
function ExpensiveComponent(props) {
  // Component logic
}
// The compiler automatically optimizes this at build time
```

#### Key Features and Benefits

1. **Zero API Changes**: You write standard React components with no special syntax or APIs.

2. **Reduces Boilerplate**: Eliminates the need for manual `React.memo()`, `useMemo()`, and `useCallback()` in most cases.

3. **Correctness by Default**: Avoids common dependency array mistakes that lead to bugs.

4. **Optimizations Beyond Manual Capabilities**: The compiler can perform optimizations that would be impractical to implement manually.

5. **Improved Bundle Size**: Reduces the amount of code needed for performance optimizations.

#### Current Status and Adoption Strategy

As of April 2025, React Compiler is in advanced development but not yet in general release. Here's how to prepare for its adoption:

1. **Write Clean Component Code**: Focus on clear component boundaries and good data flow patterns.

2. **Use Proper React Patterns**: Follow React's recommended patterns for props and state management.

3. **Avoid Unnecessary Optimizations**: The compiler will handle most optimizations, so focus on readability over premature optimization.

4. **Monitor React's Official Channels**: Keep an eye on React's blog and GitHub repository for updates on the Compiler's release.

#### Example: Before and After React Compiler

```jsx
// Current approach with manual optimization
function ParentComponent({ items, onItemSelect }) {
  // Manually memoize the callback
  const handleSelect = useCallback((id) => {
    onItemSelect(id);
  }, [onItemSelect]);
  
  // Manually memoize derived data
  const processedItems = useMemo(() => {
    return items.map(item => ({
      ...item,
      processed: complexProcess(item)
    }));
  }, [items]);
  
  return (
    <div>
      {processedItems.map(item => (
        <MemoizedItem 
          key={item.id}
          item={item}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}

const MemoizedItem = React.memo(function Item({ item, onSelect }) {
  return (
    <div onClick={() => onSelect(item.id)}>
      {item.name} - {item.processed}
    </div>
  );
});

// With React Compiler - simpler code, same performance
function ParentComponent({ items, onItemSelect }) {
  // No manual memoization needed
  const handleSelect = (id) => {
    onItemSelect(id);
  };
  
  // No manual memoization needed
  const processedItems = items.map(item => ({
    ...item,
    processed: complexProcess(item)
  }));
  
  return (
    <div>
      {processedItems.map(item => (
        <Item 
          key={item.id}
          item={item}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}

function Item({ item, onSelect }) {
  return (
    <div onClick={() => onSelect(item.id)}>
      {item.name} - {item.processed}
    </div>
  );
}
```

The React Compiler automatically understands dependencies and inserts memoization where needed, leading to cleaner, more maintainable code while maintaining optimal performance.

Resources:
- [React Profiler API](https://react.dev/reference/react/Profiler)
- [React Compiler](https://react.dev/learn/react-compiler)
- [useTransition](https://react.dev/reference/react/useTransition)
- [useDeferredValue](https://react.dev/reference/react/useDeferredValue)
- [Code Splitting](https://react.dev/reference/react/lazy)
- [React DevTools](https://react.dev/learn/react-developer-tools)

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
