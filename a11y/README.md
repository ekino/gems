# Accessibility (A11y) Best Practices

## Introduction

Accessibility (often abbreviated as a11y) ensures that digital products are usable by everyone, including people with disabilities. Following these best practices not only helps users with disabilities but also improves the overall user experience for everyone.

## Core Best Practices

### 1. Use Semantic HTML

Using the right HTML elements for their intended purpose provides built-in accessibility benefits.

```html
<!-- ❌ Bad example -->
<div class="button" onclick="submitForm()">Submit</div>

<!-- ✅ Good example -->
<button type="submit">Submit</button>
```

**WCAG Reference**: [1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships)

### 2. Proper Form Elements and Labels

Always associate labels with form controls using the `for` attribute or by nesting the input inside the label.

```html
<!-- ❌ Bad example -->
<div>Name</div>
<input type="text" id="name">

<!-- ✅ Good example -->
<label for="name">Name</label>
<input type="text" id="name">

<!-- ✅ Alternative good example -->
<label>
  Name
  <input type="text">
</label>
```

**WCAG Reference**: [3.3.2 Labels or Instructions (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions)

### 3. Descriptive Link Text

Links should make sense when read out of context.

```html
<!-- ❌ Bad example -->
<a href="pricing.html">Click here</a> to view our pricing.

<!-- ✅ Good example -->
<a href="pricing.html">View our pricing plans</a>
```

**WCAG Reference**: [2.4.4 Link Purpose (In Context) (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context)

### 4. Alternative Text for Images

Provide meaningful alt text for images that convey information.

```html
<!-- ❌ Bad example -->
<img src="chart.png">

<!-- ✅ Good example -->
<img src="chart.png" alt="Bar chart showing sales increase of 25% in Q2 2025">

<!-- For decorative images -->
<img src="decorative-line.png" alt="">
```

**WCAG Reference**: [1.1.1 Non-text Content (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content)

### 5. Keyboard Accessibility

Ensure all interactive elements are accessible via keyboard.

```html
<!-- ❌ Bad example: using divs for interactive elements -->
<div class="card" onclick="openModal()">
  Click to open details
</div>

<!-- ✅ Good example -->
<button class="card" onclick="openModal()">
  Open details
</button>
```

```javascript
// Focus management in SPAs or custom widgets
function openDialog() {
  const dialog = document.getElementById('my-dialog');
  dialog.classList.add('visible');
  
  // Set focus to the first focusable element
  const firstFocusable = dialog.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  firstFocusable.focus();
  
  // Trap focus inside dialog
  dialog.addEventListener('keydown', trapFocus);
}
```

**WCAG Reference**: [2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/keyboard)

### 6. Color Contrast

Ensure sufficient contrast between text and background colors.

```css
/* ❌ Bad example: poor contrast */
.button {
  background-color: #f2f2f2;
  color: #a3a3a3; /* 1.5:1 contrast ratio */
}

/* ✅ Good example: proper contrast */
.button {
  background-color: #f2f2f2;
  color: #595959; /* 4.5:1 contrast ratio */
}
```

**Required Ratios**:
- Normal text: 4.5:1 minimum
- Large text (18pt or 14pt bold): 3:1 minimum

**WCAG Reference**: [1.4.3 Contrast (Minimum) (Level AA)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum)

### 7. Responsive Design for Zoom

Ensure your UI works when users zoom up to 200%.

```css
/* ✅ Good practice */
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

### 8. Proper Heading Structure

Use headings to create a logical document outline.

```html
<!-- ❌ Bad example: skipping levels -->
<h1>Website Title</h1>
<h3>First Section</h3> <!-- Skipped h2 -->

<!-- ✅ Good example -->
<h1>Website Title</h1>
<h2>First Section</h2>
<h3>Subsection</h3>
```

**WCAG Reference**: [1.3.1 Info and Relationships (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships)

### 9. ARIA Attributes (When Necessary)

Only use ARIA when HTML semantics aren't sufficient.

```html
<!-- ❌ Bad example: unnecessary ARIA -->
<button role="button">Submit</button>

<!-- ✅ Good example: ARIA for dynamic content -->
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

## Mobile and Touch Device Considerations

### 1. Touch Target Sizes

Ensure interactive elements are large enough to tap easily.

```css
/* ✅ Good practice */
button, .clickable, a {
  min-width: 44px;
  min-height: 44px;
  padding: 12px;
}
```

**WCAG Reference**: [2.5.5 Target Size (Level AAA)](https://www.w3.org/WAI/WCAG21/Understanding/target-size)

### 2. Gesture Alternatives

Provide alternatives for complex gestures.

```javascript
// ✅ Good example: Supporting both gestures and buttons
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

## Framework-Specific Accessibility Patterns

### React

```jsx
// Accessible focus management with useRef
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
<!-- ❌ Bad example -->
<p>Fields marked in <span style="color: red;">red</span> are required.</p>

<!-- ✅ Good example -->
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

## Tools

### Linters

#### React

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

#### Angular

- [angular-eslint](https://www.npmjs.com/package/@angular-eslint/eslint-plugin-template) - ESLint rules for Angular templates
- [html-validate](https://www.npmjs.com/package/html-validate) - HTML validation with accessibility rules
- [jest-axe](https://www.npmjs.com/package/jest-axe) - Custom Jest matcher for testing accessibility

### Development Tools

- [Axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension for testing accessibility
- [Lighthouse DevTools](https://developer.chrome.com/docs/lighthouse) - Built into Chrome DevTools
- [WAVE](https://wave.webaim.org/extension/) - Web accessibility evaluation tool
- [Accessibility Insights](https://accessibilityinsights.io/) - Microsoft's accessibility testing tools

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
