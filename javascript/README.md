# JavaScript Best Practices

To ensure clarity, readability, and maintainability in our project, it is crucial to follow consistent coding conventions. Below are the recommended practices for JavaScript with specific naming conventions.

1. [Use `const` and `let`](#1-use-const-and-let)
2. [Strict Mode](#2-strict-mode)
3. [Function Expressions](#3-function-expressions)
4. [Shallow Clone and Deep Clone](#4-shallow-clone-and-deep-clone)
5. [Array Method and loop](#5-array-method-and-loop)
6. [Conditional Statements](#6-conditional-statements)
7. [Naming Conventions](#7-naming-conventions)
8. [Avoid Global Variables](#8-avoid-global-variables)
9. [Comments and JSDoc](#9-comments-and-jsdoc)

## 1. Use `const` and `let`:

**Explanation**: `const` is for values that do not change, and `let` is for variables that can be reassigned. Avoid `var` to prevent scope issues.

```javascript
const MAX_USERS = 100; // constant value
let userName = "John"; // variable value
```

## 2. Strict Mode:

**Explanation**: Enabling strict mode helps catch common coding errors and "unsafe" actions such as defining global variables.

```javascript
"use strict";
function myFunction() {
  // code
}
```

## 3. Function Expressions:

**Explanation**: Use arrow functions for shorter syntax and lexical `this` binding.

```javascript
const add = (a, b) => a + b;
```

## 4. Shallow Clone and Deep Clone:

**Explanation**:
In many cases, we need to create a copy of an object or an array. There are two types of cloning:

- **Shallow Clone**: Creates a new object but copies the references to the original data. Changes in the new object will affect the original object. We can use `Object.assign()` or the spread operator (`...`) for shallow cloning. `map`, `filter`, and `reduce`, `concat`, `slice` are also used for shallow cloning but with some differences in behavior.
  ```javascript
  const original = { a: 1, b: { c: 2 } };
  const shallowClone = { ...original };
  ```
- **Deep Clone**: Creates a new object and copies the data recursively. Changes in the new object will not affect the original object. Prefer use `structuredClone` for deep cloning, this new method is available in modern browsers.
  ```javascript
  const original = { a: 1, b: { c: 2 } };
  const clone = structuredClone(original);
  ```

## 5. Array Method and loop:

**Performance Considerations**: When working with arrays, consider the performance implications of different methods and loops. Choose the appropriate approach based on the size of the dataset and the complexity of the operation.

- **`map` and `filter` Methods**: Excellent for readability and functional programming, but can be slower due to the creation of new arrays. Use with caution for very large datasets.
- **`reduce` Method**: Powerful for complex reductions but can be slower; use when the operation justifies the overhead.
- **Classic `for` Loop**: Best for performance-critical applications, especially with large datasets.
- **`for...of` Loop**: More readable but slightly slower; good for most use cases.
- **`forEach` Method**: Convenient but slower due to function call overhead; avoid for very large datasets.
- **`while` and `do...while` Loops**: Useful for unknown iterations but can be error-prone if not managed carefully.

### 5.1. Array Methods:

**Explanation**: Use array methods for readability and functional programming. Be cautious with very large datasets due to performance considerations.

#### 5.1.1. `map` Method

- **Usage**: For transforming each element of an array and returning a new array of the same length.
- **Performance**: Slower than `for` loops for very large arrays due to the creation of a new array.
- **Example**:
  ```javascript
  const numbers = [1, 2, 3, 4];
  const doubled = numbers.map((num) => num * 2);
  console.log(doubled); // [2, 4, 6, 8]
  ```

#### 5.1.2. `filter` Method

- **Usage**: For creating a new array containing only the elements that pass a specific test.
- **Performance**: Similar to `map`, slower for very large arrays due to the creation of a new array.
- **Example**:
  ```javascript
  const numbers = [1, 2, 3, 4, 5];
  const evenNumbers = numbers.filter((num) => num % 2 === 0);
  console.log(evenNumbers); // [2, 4]
  ```

#### 5.1.3. `reduce` Method

- **Usage**: For accumulating the values of an array into a single value (e.g., sum, product).
- **Performance**: Can be slower due to the complexity of the operation, but very powerful for reducing data.
- **Example**:
  ```javascript
  const numbers = [1, 2, 3, 4];
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  console.log(sum); // 10
  ```

### 5.2. Loop Method:

**Explanation**: Use classic `for` loops for performance-critical applications and `for...of` loops for readability. Avoid `forEach` for very large datasets.

#### 5.2.1. Classic `for` Loop

- **Usage**: For simple iterations over arrays or numeric sequences.
- **Performance**: Generally the fastest for large datasets due to minimal overhead.
- **Example**:
  ```javascript
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
  ```

#### 5.2.2. `for...of` Loop

- **Usage**: For iterating directly over the elements of an array or any iterable object.
- **Performance**: Slightly slower than the classic `for` loop but more readable.
- **Example**:
  ```javascript
  for (const element of array) {
    console.log(element);
  }
  ```

#### 5.2.3. `forEach` Method

- **Usage**: To apply a function to each element of an array. Note that `forEach` cannot be interrupted with `break` or `continue`.
- **Performance**: Generally slower than `for` and `for...of` loops due to function call overhead. So use it for a small amount of data.
- **Example**:
  ```javascript
  array.forEach((element) => {
    console.log(element);
  });
  ```

#### 5.2.4. `while` and `do...while` Loops

- **Usage**: For loops where the number of iterations is not known in advance.
- **Performance**: Similar to the classic `for` loop, but can be more error-prone if not carefully managed.
- **Example**:
  ```javascript
  let i = 0;
  while (i < 10) {
    console.log(i);
    i++;
  }
  ```

#### 5.2.5. Using `break` and `continue` if there are specific conditions:

- **Usage**: Use `break` to exit a loop early and `continue` to skip the current iteration and proceed to the next one.
- **Example**:
  ```javascript
  for (let i = 0; i < 10; i++) {
    if (i === 5) {
      break; // Exit the loop when i is 5
    }
    if (i % 2 === 0) {
      continue; // Skip even numbers
    }
    console.log(i);
  }
  ```

## 6. Conditional Statements:

### 6.1. `if...else` Statements:

Use `if...else` for simple and clear conditional logic.

```javascript
if (condition) {
  // code if the condition is true
} else {
  // code if the condition is false
}
```

### 6.2. Ternary Operator:

Use the ternary operator for concise conditional assignments.

```javascript
const result = condition ? "true" : "false";
```

### 6.3. `switch` Statements:

Use `switch` for multiple conditions based on a single variable. This can be more readable than multiple `if...else if` statements.

```javascript
switch (value) {
  case 1:
    // code for case 1
    break;
  case 2:
    // code for case 2
    break;
  default:
  // default code
}
```

### 6.4. Short-Circuit Evaluation:

Use logical operators for short-circuit evaluation to write concise and efficient conditions.

```javascript
const value = someCondition && "defaultValue";
const value = someCondition || "defaultValue";
```

### 6.5. Avoiding Nested Conditions:

Avoid deeply nested conditions by using guard clauses or returning early from functions.

```javascript
function example(value) {
  if (!value) {
    return "No value";
  }
  // code if value is truthy
}
```

### 6.6. Using `===` for Comparison:

Always use `===` instead of `==` for comparison to avoid type coercion issues.

```javascript
if (value === 10) {
  // code if value is exactly 10
}
```

## 6. Naming Conventions:

Consistency in naming improves code readability and maintainability.

### 6.1. Variables/Functions: camelCase

```javascript
let userAge = 25;
function getUserAge() {
  return userAge;
}
```

### 6.1.Boolean: camelCase with "is" and "has"

```javascript
var hasOwner = true;
var isTrained = false;
var hasVaccinations = true;
```

### 6.1. Classes/Components: PascalCase

```javascript
class UserProfile {
  constructor(name) {
    this.name = name;
  }
}
```

### 6.1. Const: UPPER_SNAKE_CASE (uppercase letters with underscores between words).

```javascript
const DAYS_IN_WEEK = 7;
const MONTHS_IN_YEAR = 12;
const MAX_DOG_WEIGHT = 150;
```

### 6.1. files: lowercase (lowercase letters with - between words).

```javascript
dog - cartoon.js;
dog - breed - information.js;
```

## 7. Avoid Global Variables:

- Minimize the use of global variables to prevent memory leaks and conflicts. Scope variables as tightly as possible.
- Example:
  ```javascript
  (function () {
    const localVariable = "I am local";
    console.log(localVariable);
  })();
  ```

## 8. Comments and JSDoc:

Use comments to explain complex code, logic, or algorithms.
Follow the JSDoc standard for documenting functions, classes, and variables.

```javascript
/**
 * Represents a user.
 * @constructor
 * @param {string} name - The user's name.
 * @param {number} age - The user's age.
 */
function User(name, age) {
  this.name = name;
  this.age = age;
}
```
