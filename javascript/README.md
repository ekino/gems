# JavaScript Best Practices

This guide focuses on **Ekino-specific patterns and conventions** that go beyond standard JavaScript best practices. Rather than duplicating widely available online guides, we highlight the specific approaches and patterns that our teams have found most effective.

## Table of Contents

1. [Mapping Logic: Dictionaries over Switch Statements](#1-mapping-logic-dictionaries-over-switch-statements)
2. [Pure Functions and Side Effects](#2-pure-functions-and-side-effects)
3. [Explicit Boolean Naming](#3-explicit-boolean-naming)
4. [Descriptive Function Names](#4-descriptive-function-names)
5. [Event Handler Conventions](#5-event-handler-conventions)
6. [Error Handling Patterns](#6-error-handling-patterns)
7. [Object and Array Destructuring](#7-object-and-array-destructuring)
8. [Async/Await Patterns](#8-asyncawait-patterns)

## 1. Mapping Logic: Dictionaries over Switch Statements

At Ekino, we prefer using object dictionaries for simple mappings instead of switch statements. This approach is more maintainable, easier to test, and follows functional programming principles.

### ❌ DON'T: Use switch for simple mapping

```javascript
function getStatusLabel(status) {
  switch (status) {
    case "active":
      return "Active";
    case "inactive":
      return "Inactive";
    case "pending":
      return "Pending";
    default:
      return "Unknown";
  }
}

function getStatusColor(status) {
  switch (status) {
    case "active":
      return "#28a745";
    case "inactive":
      return "#dc3545";
    case "pending":
      return "#ffc107";
    default:
      return "#6c757d";
  }
}
```

### ✅ DO: Use dictionaries for clarity and maintainability

```javascript
const STATUS_LABELS = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
};

const STATUS_COLORS = {
  active: "#28a745",
  inactive: "#dc3545",
  pending: "#ffc107",
};

function getStatusLabel(status) {
  return STATUS_LABELS[status] ?? "Unknown";
}

function getStatusColor(status) {
  return STATUS_COLORS[status] ?? "#6c757d";
}

// Even better: Create a comprehensive status configuration
const STATUS_CONFIG = {
  active: { label: "Active", color: "#28a745", icon: "✓" },
  inactive: { label: "Inactive", color: "#dc3545", icon: "✗" },
  pending: { label: "Pending", color: "#ffc107", icon: "⏳" },
};

function getStatusInfo(status) {
  return (
    STATUS_CONFIG[status] ?? {
      label: "Unknown",
      color: "#6c757d",
      icon: "?",
    }
  );
}
```

**Benefits:**

- Easier to test and mock
- Better performance for large mappings
- More functional and declarative
- Easier to extend and maintain

## 2. Pure Functions and Side Effects

We strongly emphasize writing pure functions to improve testability, predictability, and debugging capabilities.

### ❌ DON'T: Create impure functions with side effects

```javascript
let userCount = 0;
let notifications = [];

function incrementAndNotify(userName) {
  userCount++; // Modifies external state
  notifications.push(`User ${userName} added`); // Side effect
  console.log(`Total users: ${userCount}`); // Side effect
  return userCount;
}

function processUsers(users) {
  users.forEach((user) => {
    user.processed = true; // Mutates input
    user.timestamp = Date.now(); // Non-deterministic
  });
  return users;
}
```

### ✅ DO: Write pure functions that return new values

```javascript
function incrementUserCount(currentCount) {
  return currentCount + 1;
}

function createNotification(userName) {
  return `User ${userName} added`;
}

function addNotification(notifications, newNotification) {
  return [...notifications, newNotification];
}

function processUsers(users, timestamp = Date.now()) {
  return users.map((user) => ({
    ...user,
    processed: true,
    timestamp,
  }));
}

// Usage with explicit state management
function handleUserAddition(state, userName) {
  const newCount = incrementUserCount(state.userCount);
  const notification = createNotification(userName);
  const newNotifications = addNotification(state.notifications, notification);

  return {
    ...state,
    userCount: newCount,
    notifications: newNotifications,
  };
}
```

**Benefits:**

- Easier to test (no mocking required)
- More predictable behavior
- Better for debugging and reasoning
- Enables better caching and optimization

## 3. Explicit Boolean Naming

We use explicit, positive naming for boolean variables to avoid confusion and double negatives.

### ❌ DON'T: Use ambiguous or negative boolean naming

```javascript
const notAvailable = !isDataLoaded;
const disabled = true;
const hidden = false;
const invalid = !isValid;

// Confusing double negatives
if (!notAvailable) {
  // What does this mean exactly?
}

// Unclear intent
if (!disabled) {
  processData();
}
```

### ✅ DO: Use explicit and positive naming

```javascript
const isDataAvailable = isDataLoaded;
const isEnabled = true;
const isVisible = true;
const isValid = checkValidation();

// Clear and readable
if (isDataAvailable) {
  displayData();
}

if (isEnabled) {
  processData();
}

// For complex conditions, use descriptive names
const canUserEdit = isAuthenticated && hasPermission && !isReadOnlyMode;
const shouldShowModal = isFirstVisit && !hasSeenTutorial;
```

**Preferred Prefixes:**

- `is` - for state: `isLoading`, `isActive`, `isValid`
- `has` - for possession: `hasPermission`, `hasData`, `hasError`
- `can` - for ability: `canEdit`, `canDelete`, `canAccess`
- `should` - for conditions: `shouldUpdate`, `shouldRender`, `shouldClose`
- `will` - for future actions: `willRedirect`, `willExpire`

## 4. Descriptive Function Names

Function names should clearly describe what the function does using action verbs.

### ❌ DON'T: Use vague or unclear function names

```javascript
function process(data) {
  // What kind of processing?
  return data.filter((item) => item.active);
}

function handle() {
  // Handle what?
  updateUI();
  sendAnalytics();
}

function check(input) {
  // Check for what?
  return input.length > 0 && input.includes("@");
}

function get(id) {
  // Get what? From where?
  return database.find(id);
}
```

### ✅ DO: Use descriptive verbs that clarify the action

```javascript
function filterActiveItems(data) {
  return data.filter((item) => item.active);
}

function handleUserSubmission() {
  updateUI();
  sendAnalytics();
}

function validateEmailFormat(input) {
  return input.length > 0 && input.includes("@");
}

function fetchUserById(id) {
  return database.find(id);
}

// More specific examples
function transformApiResponse(response) {
  return response.data.map(normalizeUser);
}

function calculateTotalPrice(items, taxRate) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return subtotal * (1 + taxRate);
}

function generateUniqueId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
```

**Recommended Verb Patterns:**

- `validate` - for validation: `validateEmail`, `validateForm`
- `transform` - for data transformation: `transformData`, `transformResponse`
- `calculate` - for computations: `calculateTotal`, `calculateDiscount`
- `generate` - for creation: `generateId`, `generateReport`
- `format` - for formatting: `formatDate`, `formatCurrency`
- `fetch` - for data retrieval: `fetchUser`, `fetchSettings`
- `parse` - for parsing: `parseJson`, `parseUrl`
- `serialize` - for serialization: `serializeForm`, `serializeData`

## 5. Event Handler Conventions

At Ekino, we follow specific naming conventions for event handlers to improve code readability and maintainability.

### ❌ DON'T: Use inconsistent or unclear event handler names

```javascript
// Inconsistent prefixes
function clickHandler() {}
function mouseOverEvent() {}
function submitFunction() {}

// Unclear what triggers the handler
function userAction() {}
function process() {}
function handler() {}

// Missing context
function validate() {}
function update() {}
```

### ✅ DO: Use consistent "on" prefix and descriptive names

```javascript
// Consistent "on" prefix pattern
function onButtonClick() {}
function onFormSubmit() {}
function onInputChange() {}
function onModalClose() {}

// Include context when needed
function onUserProfileUpdate() {}
function onEmailValidation() {}
function onPaymentSuccess() {}
function onFileUploadError() {}

// For React components
const UserForm = () => {
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    validateAndSubmit();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input type="email" onChange={onEmailChange} />
    </form>
  );
};
```

## 6. Error Handling Patterns

We prefer explicit error handling patterns that make errors visible and manageable.

### ❌ DON'T: Hide errors or use unclear error handling

```javascript
function fetchUserData(id) {
  try {
    const response = fetch(`/api/users/${id}`);
    return response.json();
  } catch (error) {
    return null; // Error is hidden
  }
}

function processData(data) {
  if (data) {
    data.forEach((item) => {
      try {
        processItem(item);
      } catch (e) {
        // Silent failure
      }
    });
  }
}
```

### ✅ DO: Make errors explicit and provide meaningful error information

```javascript
// Return Result pattern
function fetchUserData(id) {
  try {
    const response = fetch(`/api/users/${id}`);
    const data = response.json();
    return { success: true, data, error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: {
        message: error.message,
        code: "FETCH_ERROR",
        timestamp: new Date().toISOString(),
      },
    };
  }
}

// Usage with explicit error handling
async function handleUserLoad(userId) {
  const result = await fetchUserData(userId);

  if (!result.success) {
    console.error("Failed to load user:", result.error);
    showErrorMessage("Unable to load user data");
    return;
  }

  displayUserData(result.data);
}

// For batch processing, collect errors
function processDataItems(items) {
  const results = [];
  const errors = [];

  items.forEach((item, index) => {
    try {
      const result = processItem(item);
      results.push(result);
    } catch (error) {
      errors.push({
        index,
        item,
        error: error.message,
      });
    }
  });

  return { results, errors };
}
```

## 7. Object and Array Destructuring

We use destructuring to make code more readable and reduce repetition.

### ❌ DON'T: Access nested properties repeatedly

```javascript
function displayUser(user) {
  console.log(user.profile.name);
  console.log(user.profile.email);
  console.log(user.settings.theme);
  console.log(user.settings.notifications.email);

  if (user.profile.name && user.profile.email) {
    sendWelcomeEmail(user.profile.email, user.profile.name);
  }
}

function processApiResponse(response) {
  const data = response.data;
  const status = response.status;
  const headers = response.headers;

  if (status === 200) {
    return data;
  }
}
```

### ✅ DO: Use destructuring for cleaner, more readable code

```javascript
function displayUser(user) {
  const {
    profile: { name, email },
    settings: {
      theme,
      notifications: { email: emailNotifications },
    },
  } = user;

  console.log(name);
  console.log(email);
  console.log(theme);
  console.log(emailNotifications);

  if (name && email) {
    sendWelcomeEmail(email, name);
  }
}

// With default values
function processApiResponse(response) {
  const { data = [], status = 500, headers = {} } = response;

  if (status === 200) {
    return data;
  }

  throw new Error(`API Error: ${status}`);
}

// Array destructuring for multiple return values
function parseUserInput(input) {
  const parts = input.split("@");
  const [username, domain = "default.com"] = parts;

  return { username, domain };
}

// Destructuring in function parameters
function createUserCard({ name, email, role = "user", isActive = true }) {
  return {
    displayName: name,
    contactEmail: email,
    userRole: role,
    status: isActive ? "active" : "inactive",
  };
}
```

## 8. Async/Await Patterns

We prefer async/await over promises for better readability and error handling.

### ❌ DON'T: Use complex promise chains

```javascript
function loadUserDashboard(userId) {
  return fetchUser(userId)
    .then((user) => {
      return fetchUserPosts(user.id).then((posts) => {
        return fetchUserSettings(user.id).then((settings) => {
          return {
            user,
            posts,
            settings,
          };
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}
```

### ✅ DO: Use async/await with proper error handling

```javascript
async function loadUserDashboard(userId) {
  try {
    const user = await fetchUser(userId);

    // Parallel requests when possible
    const [posts, settings] = await Promise.all([
      fetchUserPosts(user.id),
      fetchUserSettings(user.id),
    ]);

    return { user, posts, settings };
  } catch (error) {
    console.error("Failed to load user dashboard:", error);
    throw new Error(`Dashboard load failed: ${error.message}`);
  }
}

// Sequential when order matters
async function processUserOnboarding(userData) {
  try {
    const user = await createUser(userData);
    const profile = await createUserProfile(user.id, userData.profile);
    const preferences = await setUserPreferences(user.id, userData.preferences);

    await sendWelcomeEmail(user.email);

    return { user, profile, preferences };
  } catch (error) {
    // Cleanup on failure
    if (user?.id) {
      await cleanupUser(user.id);
    }
    throw error;
  }
}

// Timeout pattern for better UX
async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });
    return response;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timeout");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
```

---

## Why These Patterns Matter at Ekino

These patterns reflect our commitment to:

- **Maintainability**: Code that's easy to modify and extend
- **Readability**: Clear intent that new team members can understand
- **Testability**: Patterns that facilitate unit and integration testing
- **Performance**: Efficient patterns that scale with our applications
- **Consistency**: Shared conventions across all our JavaScript projects

For questions about these patterns or suggestions for improvements, please reach out to the frontend team leads.
