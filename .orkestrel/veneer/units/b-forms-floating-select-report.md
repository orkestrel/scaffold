# B-FORMS-FLOATING-SELECT report

**Measured value.** With `.form-select` shipped (`appearance: none`), the floating select's
`line-height` reads `20px` against a `16px` font size (`readPixels(select, 'line-height')` equals
`readPixels(select, 'font-size') * 1.25`, the release's `1.25` resolved).

## Obligations

1. **The assertion.** `tests/src/styles/components/form-floating.test.ts`, the geometry case
   "makes the container the positioning box…". Replaced the comment and
   `expect(readStyle(select, 'line-height')).toBe('normal')` with a comment stating the
   `.form-select` rule removes the native appearance so the declaration resolves, and
   `expect(readPixels(select, 'line-height')).toBeCloseTo(readPixels(select, 'font-size') * 1.25, 1)`.

   Plant record: changed `line-height: 1.25` to `line-height: 1.5` in the combined
   `.form-floating > .form-control, .form-floating > .form-control-plaintext, .form-floating >
   .form-select` rule in `src/styles/components/_form-floating.scss` (this is the rule the brief
   names as "the `.form-floating > .form-select` rule" — `.form-select` is one selector in that
   combined declaration, and no separate `.form-select`-only rule exists in this partial).

   - `_form-floating.scss` SHA-256 before the plant: `f07a2865d43519847a1bca7274c06075ef4dcc9d73c7e659a127008a1ac1e230`
   - `_form-floating.scss` SHA-256 during the plant: `30573a356d1567d306c4a3ca2fba69cf7c28ac2dbc2116bb42ebe47df2a50169`
   - Red message (after build:src, running the scoped case):
     `AssertionError: expected 21 to be close to 17.5, received difference is 3.5, but expected 0.0005`
     at `tests/src/styles/components/form-floating.test.ts:54` (the case's first line-height
     assertion, over the text controls, reddens because the plant moves the shared rule both the
     text controls and the select read).
   - Reverted `_form-floating.scss` to `line-height: 1.25` exactly.
   - `_form-floating.scss` SHA-256 after the revert: `f07a2865d43519847a1bca7274c06075ef4dcc9d73c7e659a127008a1ac1e230`
     (matches the before-plant digest).
   - Green reading after the revert and rebuild: `Test Files 1 passed (1)`, `Tests 18 passed (18)`.

2. **The guide's two sentences.** `guides/veneer.md` § Form floating classes. Replaced both
   sentences with the exact text the brief gives, rewrapped at or under 100 columns (confirmed by
   `oxfmt --check`).

3. Ran `npx oxfmt --config .oxfmtrc.json --write` over the three owned files
   (`tests/src/styles/components/form-floating.test.ts`, `guides/veneer.md`,
   `src/styles/components/_form-floating.scss`); it reformatted the test file and the guide and left
   the SCSS partial unchanged (its digest matches the pre-plant baseline).

## ROADMAP closing text (shared, report-only)

The FLOATING row's SELECT carrier already closed at the SELECT landing:

> SELECT landed as `e3d7280` (its fix round audited by `analyst` on Astra and `reviewer` on
> Opus 5, its prose rounds by `checker` and the Orchestrator;

No further edit to `ROADMAP.md` is needed for this unit; it was not touched.

## Gate exits

1. `npx oxfmt --config .oxfmtrc.json --check` over the three owned files: exit `0`
   ("All matched files use the correct format.").
2. `npm run check`: exit `0` (`tsc --noEmit` for the root, `check:src:core`, `check:src:browser`,
   `check:src:styles`, `check:app:browser` all clean).
3. `npm run build:src`: exit `0`.
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
   tests/src/styles/components/form-floating.test.ts`: exit `0`, `Test Files 1 passed (1)`,
   `Tests 18 passed (18)`.
5. `npm run test:guides`: exit `0`, `Test Files 1 passed (1)`, `Tests 18 passed (18)`.

## `git status --porcelain`

```
 M guides/veneer.md
 M tests/src/styles/components/form-floating.test.ts
```

## Deviations

None. The Unknown resolved to `20px` (font size `16px` × `1.25`), matching the release's declared
value, and the plant reddened the case as expected (through the shared combined selector rather than
a `.form-select`-only rule, since the partial declares no such standalone rule).
