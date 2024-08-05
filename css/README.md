# CSS

## CSS Best Practices

- Mobile-first approach is recommended.
- You must have stylelint in your project to enforce consistent coding styles and avoid errors in your stylesheets.
- Use external stylesheets for CSS and avoid inline styles.
- Use grid systems for layout.
- Limited the selectors to 3 levels deep.
- Media queries units should be in em or rem.
- Prefer use custom properties over preprocessor variables.

- Use prefer-reduce-motion media query to reduce motion for users with motion sensitivities.
- Use a CSS reset to normalize the default styles (e.g. normalize.css).
- Use :has() pseudo-class to select elements based on their content.
- Privilege @container queries over media queries.
- Use aspect-ratio property to maintain the aspect ratio of an element.
- Prefer using currentColor for color values.
- Privilege gap property over margin and padding.
- Think to CSS modules to scope CSS locally.

## CSS Naming Conventions

### BEM (Block Element Modifier)

#### Description

BEM is a naming convention for CSS classes in order to keep the CSS more maintainable and scalable.

#### Example

```CSS
.card {}
.card__title {}
.card__content {}
.card--large {}
.card__title--small {}
```

## Frameworks

If you doesn't need to create a custom design, you can use a CSS framework to speed up the development process.

**list of proposed frameworks**

- Shadcn
- Chakra UI
- Material UI
- Tailwind CSS

## Linter Stylelint

List of main linters we use in our projects.

### Description

Stylelint is a linter for CSS and SCSS files. It helps to enforce consistent coding styles and avoid errors in your stylesheets.

### Configuration

```
{
  "extends": "stylelint-config-standard",
  "rules": {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true
  }
}
```

## Ressources

- [Combining the Powers of SEM and BIO for Improving CSS](https://css-tricks.com/combining-the-powers-of-sem-and-bio-for-improving-css/)
- [Atomic Design](https://atomicdesign.bradfrost.com/)
- [ecss](https://ecss.info/en/)
- [CUBE (Composition Utility Block Exception)](https://cube.fyi/)
- [BEM](http://getbem.com/)
- [SUIT CSS](https://suitcss.github.io/)
