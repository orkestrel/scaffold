# Unit B-FORMS-SELECT, round 4 — report

## Diff

```diff
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -746,11 +746,11 @@
 - **The select's spacing reads the space scale.** The padding, the caret's inset, and the size
   classes' padding read the `--vn-space-2`, `--vn-space-3`, `--vn-space-4`, `--vn-space-6`, and
   `--vn-space-8` tokens, and the end padding that clears the caret is the `--vn-space-6` token
   three times over, the release's own derivation. A select with no validation state rescales with
-  the `--vn-factor-density` token as the shipped partials do; a validation state keeps the
-  release's literal icon geometry, as § Validation classes states, so a validated single-row select
-  keeps the release's end padding and caret inset at any density; a validated list form
+  the `--vn-factor-density` token as the shipped partials do. A validation state keeps the
+  release's literal icon geometry, as § Validation classes states, so a validated single-row select
+  keeps the release's end padding and caret inset at any density. A validated list form
   (`[multiple]`, or `[size]` above one row) carries no caret and keeps the list padding, which
   follows density. The caret's own `16px 12px` size stays literal.
```

## Gate exits

- `grep -c 'shipped partials do; a validation' guides/veneer.md` → `0`
- `grep -c 'shipped partials do\. A validation' guides/veneer.md` → `1`
- `npx oxfmt --check guides/veneer.md` → exit `0`
- `npm run check` → exit `0`
- `npm run test:guides` → exit `0` (18 tests passed)

## git status --short

```
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 A app/browser/sections/FormSelectSection.ts
 M guides/veneer.md
 A src/styles/components/_form-select.scss
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 A tests/app/browser/sections/FormSelectSection.test.ts
 M tests/conformance.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 A tests/src/styles/components/form-select.test.ts
```

The status pre-existing rows other than `guides/veneer.md` are outside this unit's scope (owned by
earlier rounds); this unit touched only `guides/veneer.md`.
