---
paths:
  - 'src/browser/**/*.ts'
  - 'src/vue/**/*.ts'
  - 'app/browser/**/*.{ts,vue}'
  - 'app/vue/**/*.{ts,vue}'
  - 'tests/{src,app}/browser/**/*'
  - 'tests/{src,app}/vue/**/*'
  - 'tests/setupBrowser.ts'
---

# Vue and browser rules

- Publish only TypeScript composables and contracts from `src/vue`; put Vue single-file components
  in `app/vue`. Keep `.vue` files and `vue` imports out of `src/browser` and `app/browser`.
  Apply `AGENTS.md` § Project model to imports from each Vue face.
- Declare `vue` in the manifest as an optional peer only for the `./vue` export. Until that
  declaration exists, the `./vue` build refuses `vue`, `vue/*`, and `@vue/*`; after it, the build
  externalizes `vue` and its subpaths and still refuses `@vue/*`.
- Never use Vue `$emit`.
- Coordinate reactivity through props, controllers, stores, services, and composables.
- A composable exposes readonly refs plus methods; consumers never mutate returned refs directly:

```ts
function useTheme(): {
	readonly mode: Readonly<Ref<ThemeMode>>
	toggle(): void
}
```

- Use utility classes for layout: flex, gap, spacing, sizing.
- Use the framework's token-backed semantic classes for color/chrome: `.surface`, `.button`, `.muted`, `.accent`.
- A `[data-theme]` change must retheme the whole interface through tokens.
- Add custom SCSS only when no utility provides the behavior.
- Integrate through the framework's Sass variables/functions instead of hand-rolled values.
- Never write literal colors.
- Prefer native platform APIs—Popover, `<dialog>`, `hashchange` routing, native events/storage/observers—over custom replacements or added dependencies.
