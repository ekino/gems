# Accessibility (A11y) Best Practices

## Introduction

Accessibility (often abbreviated as a11y) ensures that digital products are usable by everyone, including people with disabilities. Following these best practices not only helps users with disabilities but also improves the overall user experience for everyone.

## Core Best Practices

### 1. Use Semantic HTML

Semantic HTML elements have built-in behaviors and mechanics that favor accessibility, ease of use, and readability by screen readers. Use semantic HTML elements whenever possible. When a native element cannot be used, refer to [ARIA Design Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) to ensure that built-in behaviors are added back to custom elements.

```html
<!-- ❌ Avoid -->
<div class="button" onclick="submitForm()">Submit</div>

<!-- ✅ Prefer -->
<button type="submit">Submit</button>
```

**WCAG Reference**: [1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships)

### 2. Proper Form Elements and Labels

Every form element (input, checkbox, radio, select) must have a label, even if hidden. Always associate labels with form controls using the `for` attribute or by nesting the input inside the label.

> **Note:** A `placeholder` is never a sufficient replacement for a `<label>`: it may not be read by screen readers and disappears when the input is focused.

```html
<!-- ❌ Avoid -->
<div>Name</div>
<input type="text" id="name">

<!-- ✅ Prefer -->
<label for="name">Name</label>
<input type="text" id="name">

<!-- ✅ Also valid -->
<label>
  Name
  <input type="text">
</label>
```

**WCAG Reference**: [3.3.2 Labels or Instructions (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions)

#### Grouping Related Fields

Use `<fieldset>` and `<legend>` to group related form controls.

```html
<!-- ✅ Prefer: Grouped radio buttons -->
<fieldset>
  <legend>Preferred contact method</legend>
  <label>
    <input type="radio" name="contact" value="email"> Email
  </label>
  <label>
    <input type="radio" name="contact" value="phone"> Phone
  </label>
</fieldset>
```

#### Autocomplete Attributes

Use the `autocomplete` attribute to help users fill in forms.

```html
<!-- ✅ Prefer -->
<label for="email">Email</label>
<input type="email" id="email" name="email" autocomplete="email">

<label for="tel">Phone</label>
<input type="tel" id="tel" name="tel" autocomplete="tel">

<label for="cc">Credit Card</label>
<input type="text" id="cc" name="cc" autocomplete="cc-number">
```

**WCAG Reference**: [1.3.5 Identify Input Purpose (Level AA)](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose)

### 3. Descriptive Link Text

Links should make sense when read out of context. If a link or button is visually represented by an icon or image only, it must have an accessible label via `aria-label` or visually hidden text.

```html
<!-- ❌ Avoid -->
<a href="pricing.html">Click here</a> to view our pricing.

<!-- ✅ Prefer -->
<a href="pricing.html">View our pricing plans</a>

<!-- ❌ Avoid: icon-only button without label -->
<button><svg>...</svg></button>

<!-- ✅ Prefer: icon button with accessible label -->
<button aria-label="Close menu"><svg>...</svg></button>
```

**WCAG Reference**: [2.4.4 Link Purpose (In Context) (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context)

### 4. Alternative Text for Images

Provide meaningful alt text for images that convey information.

```html
<!-- ❌ Avoid -->
<img src="chart.png">

<!-- ✅ Prefer -->
<img src="chart.png" alt="Bar chart showing sales increase of 25% in Q2 2025">

<!-- For decorative images -->
<img src="decorative-line.png" alt="">

<!-- ✅ Image with caption using figure/figcaption -->
<figure>
  <img src="team-photo.jpg" alt="The development team at the 2024 company retreat">
  <figcaption>Development team at the annual retreat, December 2024</figcaption>
</figure>
```

**WCAG Reference**: [1.1.1 Non-text Content (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content)

### 5. Keyboard Accessibility

Ensure all interactive elements are reachable via keyboard and receive a visible focus (`outline` CSS property). Interactive elements include links, buttons, and form elements. Also, each state triggered by mouse should also trigger on focus: a button with a hover state should display the same state on focus, a submenu that opens on hover should also open on focus.

```html
<!-- ❌ Avoid: using divs for interactive elements -->
<div class="card" onclick="openModal()">
  Click to open details
</div>

<!-- ✅ Prefer -->
<button class="card" onclick="openModal()">
  Open details
</button>
```

```html
<!-- ✅ Prefer: native <dialog> element for modals -->
<dialog id="my-dialog">
  <h2>Dialog Title</h2>
  <p>Dialog content here.</p>
  <button onclick="this.closest('dialog').close()">Close</button>
</dialog>

<button onclick="document.getElementById('my-dialog').showModal()">
  Open dialog
</button>
```

The native `<dialog>` element provides built-in focus management and trapping when opened with `showModal()`.

**WCAG Reference**: [2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/keyboard)

### 6. Color Contrast

Ensure sufficient contrast between text and background colors.

```css
/* ❌ Avoid: poor contrast */
.button {
  background-color: #f2f2f2;
  color: #a3a3a3; /* 2.25:1 contrast ratio */
}

/* ✅ Prefer: proper contrast */
.button {
  background-color: #f2f2f2;
  color: #595959; /* 6.26:1 contrast ratio */
}
```

**Required Ratios**:

- Normal text: 4.5:1 minimum
- Large text (18pt or 14pt bold): 3:1 minimum

**WCAG Reference**: [1.4.3 Contrast (Minimum) (Level AA)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum)

### 7. Responsive Design for Zoom

Ensure your UI works when users zoom up to 200%. Avoid setting fixed (`px`) sizes on container elements.

```css
/* ✅ Prefer */
.container {
  max-width: 100%;
  padding: 1rem;
}

/* Prefer relative units over fixed */
body {
  font-size: 100%; /* Base size */
}

.title {
  font-size: 1.5rem; /* Scales with user's preferred size */
}
```

**WCAG Reference**: [1.4.4 Resize Text (Level AA)](https://www.w3.org/WAI/WCAG21/Understanding/resize-text)

### 8. Page Structure and Document Outline

#### Language and DOCTYPE

Always declare the page language and use a proper DOCTYPE.

```html
<!-- ✅ Prefer -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Descriptive Page Title</title>
  </head>
  <body>
    <p>Content in English.</p>
    <p lang="fr">Contenu en français.</p> <!-- Language change indicated -->
  </body>
</html>
```

**WCAG Reference**: [3.1.1 Language of Page (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page)

#### Landmark Elements

Page structure matters. Using correct landmark elements helps screen reader users navigate within a page. A page should have a single `<main>` element, at least one `<header>` element (secondary headers should be within sectioning elements), and navigation should be wrapped in `<nav>` elements.

```html
<!-- ❌ Avoid -->
<div class="header">...</div>
<div class="nav">...</div>
<div class="content">...</div>
<div class="footer">...</div>

<!-- ✅ Prefer -->
<header>
  <nav>...</nav>
</header>
<main>
  <section>...</section>
  <section>...</section>
</main>
<footer>...</footer>
```

#### Proper Heading Structure

Use headings to create a logical document outline. A page should have at least one `<h1>` element (multiple `<h1>` are allowed). Semantic headings create a hierarchy of content; while skipping levels is not strictly forbidden, the heading structure should reflect a correct content hierarchy.

```html
<!-- ❌ Avoid: incorrect hierarchy -->
<h1>Website Title</h1>
<h2>First Section</h2>
<h2>Second Section</h2>
<h3>Third Section</h3> <!-- Appears as child of Second Section -->

<!-- ✅ Prefer -->
<h1>Website Title</h1>
<h2>First Section</h2>
<h2>Second Section</h2>
<h2>Third Section</h2>
<h3>Subsection of Third</h3>
```

#### Skip Links

Provide a skip link to allow keyboard users to bypass navigation.

```html
<!-- ✅ Prefer -->
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <nav><!-- Navigation here --></nav>
  <main id="main-content">
    <!-- Main content here -->
  </main>
</body>
```

```css
/* Make skip link visible only on focus */
.skip-link {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.skip-link:focus {
  position: static;
  width: auto;
  height: auto;
}
```

**WCAG Reference**: [2.4.1 Bypass Blocks (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks)

### 9. ARIA Attributes (When Necessary)

Only use ARIA when HTML semantics aren't sufficient or when a native element cannot be used. Be aware that misusing ARIA can cause accessibility errors.

ARIA should enhance accessibility features. Native HTML elements don't need ARIA attributes as they have everything built-in. However, ARIA is necessary for custom components when native elements don't provide the required flexibility. Refer to [ARIA Design Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) for implementation guidance.

> **Note:** Some ARIA attributes like `aria-selected` or `aria-expanded` must be updated dynamically via JavaScript.

```html
<!-- ❌ Avoid: unnecessary ARIA -->
<button role="button">Submit</button>

<!-- ✅ Prefer: ARIA for dynamic content -->
<div role="alert" aria-live="assertive">
  Your form has been submitted successfully
</div>

<!-- ✅ ARIA for custom controls -->
<div role="tablist">
  <button role="tab" aria-selected="true" id="tab1" aria-controls="panel1">Tab 1</button>
  <button role="tab" aria-selected="false" id="tab2" aria-controls="panel2">Tab 2</button>
</div>
<div role="tabpanel" id="panel1" aria-labelledby="tab1">Content 1</div>
<div role="tabpanel" id="panel2" aria-labelledby="tab2" hidden>Content 2</div>
```

**WCAG Reference**: [4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)

### 10. Animations and Motion

Respect user preferences for reduced motion.

```css
/* Standard animations */
.element {
  transition: transform 0.3s ease;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .element {
    transition: none;
  }
  
  /* Disable all animations */
  *, *::before, *::after {
    animation-duration: 0.001s !important;
    animation-delay: 0s !important;
    transition-duration: 0.001s !important;
  }
}
```

**WCAG Reference**: [2.3.3 Animation from Interactions (Level AAA)](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions)

### 11. Use Lists

List elements represent a logical grouping of items and are announced as lists by screen readers, providing context to users. Use `<ul>` for unordered lists, `<ol>` for ordered lists, and `<dl>` for definition lists. Lists must follow a strict structure.

```html
<!-- ❌ Avoid: invalid list structure -->
<ul>
  <p>Content</p>
</ul>

<!-- ✅ Prefer -->
<ul>
  <li>
    <p>Content</p>
  </li>
</ul>
```

**WCAG Reference**: [1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships)

## Mobile and Touch Device Considerations

### 1. Touch Target Sizes

Ensure interactive elements are large enough to tap easily.

```css
/* ✅ Prefer */
button, .clickable, a {
  min-width: 44px;
  min-height: 44px;
  padding: 12px;
}
```

**WCAG Reference**: [2.5.5 Target Size (Level AAA)](https://www.w3.org/WAI/WCAG21/Understanding/target-size)

### 2. Gesture Alternatives

Provide alternatives for complex gestures requiring 3 or more touch points (e.g., pinch-to-zoom on a map).

```javascript
// ✅ Prefer: Supporting both gestures and buttons
const slider = document.getElementById('slider');

// Support swipe gestures
slider.addEventListener('touchmove', handleSwipe);

// Provide button alternatives
document.getElementById('prev-button').addEventListener('click', () => {
  showPreviousSlide();
});
document.getElementById('next-button').addEventListener('click', () => {
  showNextSlide();
});
```

**WCAG Reference**: [2.5.1 Pointer Gestures (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/pointer-gestures)

### 3. Data Tables

Ensure data tables are properly structured for screen readers.

```html
<!-- ❌ Avoid: No headers or caption -->
<table>
  <tr>
    <td>Product</td>
    <td>Price</td>
    <td>Quantity</td>
  </tr>
  <tr>
    <td>Widget</td>
    <td>$10</td>
    <td>5</td>
  </tr>
</table>

<!-- ✅ Prefer: Proper table structure -->
<table>
  <caption>Shopping cart contents</caption>
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Widget</td>
      <td>$10</td>
      <td>5</td>
    </tr>
  </tbody>
</table>

<!-- ✅ Complex table with row and column headers -->
<table>
  <caption>Quarterly Sales Report</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North</th>
      <td>$1,000</td>
      <td>$1,200</td>
    </tr>
    <tr>
      <th scope="row">South</th>
      <td>$800</td>
      <td>$950</td>
    </tr>
  </tbody>
</table>
```

**WCAG Reference**: [1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships)

### 4. Iframes

Always provide a descriptive title for iframes.

```html
<!-- ❌ Avoid -->
<iframe src="https://maps.google.com/embed"></iframe>

<!-- ✅ Prefer -->
<iframe
  src="https://maps.google.com/embed"
  title="Google Maps showing our office location"
></iframe>
```

**WCAG Reference**: [4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)

## Framework-Specific Accessibility Patterns

> **Note:** When possible, prefer the native `<dialog>` element which handles focus management automatically. The examples below show manual implementations for legacy browser support or custom requirements.

### React

```jsx
// Accessible focus management with useRef (for legacy browser support)
function AccessibleModal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);
  const previousFocus = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      // Store the element that had focus before opening modal
      previousFocus.current = document.activeElement;
      
      // Focus the modal when it opens
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    } else if (previousFocus.current) {
      // Restore focus when modal closes
      previousFocus.current.focus();
    }
  }, [isOpen]);
  
  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      ref={modalRef}
      className="modal"
    >
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
```

### Angular

```typescript
// Accessible custom directive example
@Directive({
  selector: '[appA11yFocus]'
})
export class A11yFocusDirective implements AfterViewInit {
  @Input() appA11yFocus: boolean;
  
  constructor(private el: ElementRef) {}
  
  ngAfterViewInit() {
    if (this.appA11yFocus) {
      setTimeout(() => {
        this.el.nativeElement.focus();
      });
    }
  }
}

// Usage in template
<button appA11yFocus="true">This button will receive focus</button>
```

## Testing and Validation

### Automated Testing

#### Integration with CI/CD

```javascript
// Example Jest test with axe-core
import { axe } from 'jest-axe';

describe('Accessibility tests', () => {
  it('should have no violations', async () => {
    document.body.innerHTML = `
      <button onclick="alert('clicked')">Click me</button>
    `;
    
    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Testing Procedures

1. **Keyboard Navigation Testing**
   - Tab through the entire interface
   - Ensure focus indicators are visible
   - Verify all functionality is accessible via keyboard

2. **Screen Reader Testing**
   - Test with NVDA on Windows
   - Test with VoiceOver on macOS
   - Test with TalkBack on Android

3. **Browser Zoom Testing**
   - Test at 200% zoom
   - Ensure no content is cut off or overlapping

### Testing Checklist

- [ ] All images have appropriate alt text
- [ ] Color contrast meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- [ ] All functionality works with keyboard only
- [ ] Page has proper heading structure
- [ ] Forms have proper labels and error messages
- [ ] ARIA attributes are used correctly
- [ ] Page works with screen readers
- [ ] Animation respects prefers-reduced-motion
- [ ] Focus management is implemented for modals/dialogs

## Common Pitfalls and How to Avoid Them

### 1. Empty Alt Text Misuse

```html
<!-- ❌ Bad: Important image with empty alt -->
<img src="chart.png" alt="">

<!-- ✅ Good: Decorative image with empty alt -->
<img src="decorative-divider.png" alt="">

<!-- ✅ Good: Important image with descriptive alt -->
<img src="chart.png" alt="Q1 2025 sales increased by 27% compared to Q4 2024">
```

### 2. Relying Solely on Color

```html
<!-- ❌ Avoid -->
<p>Fields marked in <span style="color: red;">red</span> are required.</p>

<!-- ✅ Prefer -->
<p>Fields marked with an asterisk (*) are required.</p>
<label for="name">Name *</label>
```

### 3. Improper Heading Structure

```html
<!-- ❌ Bad: Using headings for styling -->
<h2>Normal paragraph text that should not be a heading</h2>

<!-- ✅ Good: Using CSS for styling, headings for structure -->
<p class="large-text">Normal paragraph text styled to be prominent</p>
```

### 4. Non-accessible Custom Components

```javascript
// ❌ Bad: Inaccessible dropdown
const dropdown = document.createElement('div');
dropdown.className = 'dropdown';
dropdown.innerHTML = 'Select an option';
dropdown.onclick = () => toggleDropdown();

// ✅ Good: Using the select element
const select = document.createElement('select');
const option1 = document.createElement('option');
option1.value = '1';
option1.textContent = 'Option 1';
select.appendChild(option1);
```

## Developer Checklist

A quick reference checklist for accessibility reviews:

### Page Structure

- [ ] Page has a relevant `lang` attribute on `<html>`
- [ ] Page has a descriptive `<title>`
- [ ] Valid DOCTYPE declaration
- [ ] Proper heading hierarchy (h1, h2, h3... without skipping levels)
- [ ] Skip link to main content is present
- [ ] Language changes are indicated with `lang` attribute

### Keyboard & Navigation

- [ ] All functionality available via keyboard
- [ ] Tab order is logical and consistent
- [ ] Focus indicators are visible (outline not disabled)
- [ ] Modal/dialog focus is trapped and managed
- [ ] Interactive elements triggered by CSS are keyboard accessible

### Images & Media

- [ ] All `<img>` tags have `alt` attribute
- [ ] Decorative images have `alt=""`
- [ ] Informative images have descriptive alt text
- [ ] Images with captions use `<figure>` and `<figcaption>`
- [ ] Iframes have descriptive `title` attribute
- [ ] Video/audio have text alternatives (transcripts, captions)
- [ ] Moving content is controllable

### Forms

- [ ] All form fields have associated `<label>`
- [ ] Related fields are grouped with `<fieldset>` and `<legend>`
- [ ] Required fields are clearly indicated (not just by color)
- [ ] Error messages appear near corresponding fields
- [ ] `autocomplete` attribute used where appropriate
- [ ] Validation step before form submission for critical data

### Links & Buttons

- [ ] Link text is descriptive (not "click here")
- [ ] Buttons use `<button>` element (not styled `<div>`)
- [ ] Actions cancel if pointer released outside target

### Colors & Contrast

- [ ] Text contrast ratio meets 4.5:1 (normal) / 3:1 (large)
- [ ] Information not conveyed by color alone
- [ ] Focus states have sufficient contrast

### Data Tables

- [ ] Tables have `<caption>` or `aria-label`
- [ ] Header cells use `<th>` with `scope` attribute
- [ ] Complex tables have proper row/column associations

### ARIA

- [ ] ARIA used only when HTML semantics insufficient
- [ ] `role` attributes used correctly on structural elements
- [ ] Live regions (`aria-live`) for dynamic content

### Animations & Time

- [ ] `prefers-reduced-motion` is respected
- [ ] Users have enough time to read/interact with content
- [ ] No content flashes more than 3 times per second

### Zoom & Responsive

- [ ] Content works at 200% browser zoom
- [ ] Pinch-to-zoom not disabled on mobile
- [ ] No horizontal scrolling at 320px width

## Tools

### Linters

#### React (eslint-plugin-jsx-a11y)

- [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) - ESLint plugin for JSX accessibility rules

```bash
npm install eslint-plugin-jsx-a11y --save-dev
```

```js
// .eslintrc.js
module.exports = {
  plugins: ['jsx-a11y'],
  extends: ['plugin:jsx-a11y/recommended'],
  rules: {
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }]
  }
};
```

#### Angular (angular-eslint)

- [angular-eslint](https://www.npmjs.com/package/@angular-eslint/eslint-plugin-template) - ESLint rules for Angular templates
- [html-validate](https://www.npmjs.com/package/html-validate) - HTML validation with accessibility rules
- [jest-axe](https://www.npmjs.com/package/jest-axe) - Custom Jest matcher for testing accessibility

### Development Tools

- [Axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension for testing accessibility
- [Lighthouse DevTools](https://developer.chrome.com/docs/lighthouse) - Built into Chrome DevTools
- [WAVE](https://wave.webaim.org/extension/) - Web accessibility evaluation tool
- [Accessibility Insights](https://accessibilityinsights.io/) - Microsoft's accessibility testing tools
- [Color Contrast Check](https://chromewebstore.google.com/detail/wcag-color-contrast-check/plnahcmalebffmaghcpcmpaciebdhgdf) - WCAG color contrast checker
- [HeadingsMap](https://chromewebstore.google.com/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi) - Visualize heading structure

> **Tip:** Browser DevTools now display the **Accessibility Tree**, which shows what screen readers will read from a page. This is useful for checking page structure and element accessibility.

### Screen Readers for Testing

- [NVDA](https://www.nvaccess.org/) (Windows)
- [VoiceOver](https://www.apple.com/accessibility/mac/vision/) (macOS)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Windows)
- [TalkBack](https://support.google.com/accessibility/android/answer/6283677) (Android)

### Online Tools

- [V6y](https://github.com/ekino/v6y) - Accessibility testing tool
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Color contrast analysis
- [Accessible Colors](https://accessible-colors.com/) - Find accessible color combinations

## Resources

- [Axe DevTools](https://www.deque.com/axe/devtools/) - Comprehensive testing suite
- [RGAA](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/) - French government accessibility guidelines
- [WCAG](https://www.w3.org/WAI/WCAG21/quickref/) - Web Content Accessibility Guidelines
- [A11y Project](https://www.a11yproject.com/checklist/) - Accessibility checklist
- [Web Accessibility Checklist](https://www.webaccessibilitychecklist.com/) - Detailed accessibility checklist
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility) - Mozilla's accessibility documentation
- [W3C WAI Tutorials](https://www.w3.org/WAI/tutorials/) - Web accessibility tutorials
