# Accessibility (A11y) Best Practices

## Main best practices

### Page Structure

- For each page, I make sure it has a relevant language code, a title and that language changes are indicated in the source code, and that the tags used respect the semantics.
- For each page, I make sure that the information is structured using a coherent hierarchy of titles (h1, h2...), that the page and the lists present in the page are structured in a coherent manner, and that the quotes are correctly integrated.
- For each page, I make sure it has a correct document type declaration (DTD/doctype), and that the generated code is valid against this DTD.

### Keyboard Accessibility

- Make sure all functionality is available using a keyboard.
- For each page, I make sure that the tab order in the page is consistent, and that additional content is reachable by keyboard as well as by mouse.
- For each page, I make sure that additional content displayed by CSS (show/hide or display) can be displayed by keyboard and mouse, and that this content is controllable by keyboard and mouse.
- For each media, sound, video or complex media (carousel type, interactive element), I make sure that it is controllable by keyboard and mouse. If necessary, I integrate a textual alternative that provides the same information.
- For each script, or complex JavaScript component, I make sure that it is controllable by keyboard and mouse, and if this component initiates a context change, that the user is informed.

### Images and Media

- For each image tag (<img>), I check that the tag has an "alt" attribute and that this attribute is empty by default. If the image is accompanied by a caption, I also check that I integrate a correct structure (with <figure> and <figcaption>).
- For video and audio content, provide a text alternative that provides the same information. For example, if a video shows a person speaking, provide a text transcript of the speech.
- For each page, I make sure that moving content is controllable.
- When I integrate an iframe, I check that it has a filled in title attribute.

### Links and Buttons

- For each text link and button, write a descriptive text.
- For each button or link, I make sure that the triggered action is canceled if the mouse button is released outside the corresponding button or link.

### Colors and Contrast

- Use contrasting colors for text and background, and make sure the text is readable.

### ARIA and Roles

- Use ARIA only if necessary, and make sure it is used correctly.
- For each page, I make sure to use the "role" attribute correctly on the structuring elements, as well as the presence of a skip link allowing direct access to the content.

### Time and Animations

- Give people enough time to read and use content (animation duration and delay).

### Zoom and Scaling

- Keep pinch and zoom alive, don't disable it on your website, it's a very important feature for people with low vision.

### Data Tables

- For each complex data table, I make sure that a title and a summary are associated with the table. For each formatting table, I make sure that the content remains understandable without CSS and does not use elements specific to complex data tables.
- For each complex data table, I make sure that the row and column headers are correctly declared, and that the cells are correctly associated with the headers.

### CSS

- For each page, I make sure that the style is externalized in CSS files, that the content remains visible and the information understandable once the CSS styles are disabled, that the pages are responsive and that there is no loss of information when redefining text spacing properties.
- I also make sure that hidden content is ignored.
- For each page, I make sure that the outline is not disabled.

### Forms

- For each form, I make sure that each field has an associated label (<label>), and that fields of the same nature are grouped using <fieldset>.
- For each form, I make sure to use the "autocomplete" attribute with the corresponding value when necessary, that the validation is used correctly (indication of the mandatory characters of the fields, display of errors under the corresponding fields), and that it is accompanied by input assistance.
- For each form that modifies or sends data, I make sure that a validation step is present before submitting the form.

## Tools

### Linter

#### React

- [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)

#### Angular

- [angular-eslint](https://www.npmjs.com/package/@angular-eslint/eslint-plugin-template)
- [html-validate](https://www.npmjs.com/package/html-validate)
- [jest-axe](https://www.npmjs.com/package/jest-axe)

### Local tools

- Axe DevTools
- Lighthouse DevTools
- WAVE

### Online tools

- V6y

## Ressources

- [Axe devtools](https://www.deque.com/axe/devtools/)
- [RGAA](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/)
- [WCAG](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project](https://www.a11yproject.com/checklist/)
- [Web Accessibility Checklist](https://www.webaccessibilitychecklist.com/)
