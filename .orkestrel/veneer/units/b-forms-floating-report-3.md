# Unit B-FORMS-FLOATING, round 3 — report

## Obligations

1. **The density matrix becomes a frozen table.** `tests/setupStyles.ts`: declared `export interface
   FormFloatingDensityCase { readonly selector: string; readonly property: string; readonly resting:
   number }` directly after `FORM_FLOATING_CASES`'s closing `])`, with the prescribed TSDoc, and
   exported `FORM_FLOATING_DENSITY_CASES: readonly FormFloatingDensityCase[]` as `Object.freeze([...])`
   of ten frozen rows in the fixed order. `tests/setupStyles.test.ts`: added `'FORM_FLOATING_DENSITY_CASES'`
   to the export-name literal directly after `'FORM_FLOATING_CASES'`, added the import, and added
   `expect(Object.isFrozen(FORM_FLOATING_DENSITY_CASES)).toBe(true)` plus a per-row frozen loop
   directly after the existing `FORM_FLOATING_CASES` freeze assertions in the binding case.
   `tests/src/styles/components/form-floating.test.ts`: the density case's local `insets` matrix is
   now derived from `FORM_FLOATING_DENSITY_CASES.map((row) => [requireValue(host.querySelector(row.selector), ...), row.property])`,
   and the `resting` literal array is replaced with
   `expect(resting).toEqual(FORM_FLOATING_DENSITY_CASES.map((row) => row.resting))`. Every other
   expectation in the case is unchanged.
2. **The content-box assertion becomes a line-box assertion.** Same file: added
   `const line = readPixels(empty, 'line-height')` before the factor is set, and the filter now reads
   `... < line` instead of `... < 0`, with the comment and body the brief fixes. The case is retitled
   "scales the height and every inset together with the density factor and keeps a line of text inside
   the height".
3. **The autofill case title.** Retitled to "holds each autofill rule to the floated declarations of
   the focus and filled group, one selector per rule".
4. **The guide's two sentences.** `guides/veneer.md` § Form floating classes: "so each multiplies
   `--vn-space-8` by its ratio" → "so each multiplies the `--vn-space-8` token by its ratio"; "recorded
   in `tests/src/styles/components/form-floating.test.ts` beside" → "recorded in the
   `tests/src/styles/components/form-floating.test.ts` file beside".
5. **D38 in the density bullet.** Appended "The scale is specified for factors of 1 and above, the
   range the proof reads: below 1 the line height, which is relative to the text and does not shrink,
   outgrows the shrinking floated inset." directly after "as do the stacking and the transform."
6. **The plant.** See § Plant record.
7. **Rewrap and format.** Rewrapped the paragraph at guide lines around 836-853 (the one obligation 4
   edited) to keep every line at or under 100 columns, and confirmed the density bullet (lines around
   812-826) already sits at or under 100 columns after obligations 4 and 5. Ran
   `npx oxfmt --config .oxfmtrc.json --write` over the five owned files; it reformatted only the
   `form-floating.test.ts` import block (no content change).

## Plant record

Plant: in `src/styles/components/_form-floating.scss`, `height` and `min-height` changed from
`calc(var(--vn-space-8) * 3.5 + calc(var(--bs-border-width) * 2))` to
`calc(3.5rem + calc(var(--bs-border-width) * 2))`. SHA-256 before plant:
`f07a2865d43519847a1bca7274c06075ef4dcc9d73c7e659a127008a1ac1e230`.

- Built (`npm run build:src:styles`), ran the scoped browser command: first failing expectation —
  `AssertionError: expected [ 68, 76, 74 ] to deeply equal [ 114, 114, 114 ]` at
  `form-floating.test.ts:406` (the `controls.map((control) => readPixels(control, 'height'))`
  assertion), because factor-2 density no longer moves the plant's fixed `3.5rem` term.
- Removed the two `[114, 114, 114]` height and minimum-height expectations as a throwaway edit
  (partial unchanged, so no rebuild). Ran again: the line-box assertion reddened —
  `AssertionError: expected [ …(3) ] to deeply equal []`, reporting the empty input, the filled input,
  and the select as the controls whose height less its vertical insets and borders falls under the
  read `line-height`, at `form-floating.test.ts:419` (`.toEqual([])`).
- Restored the two expectations and the partial by the exact reverse edits. SHA-256 after revert:
  `f07a2865d43519847a1bca7274c06075ef4dcc9d73c7e659a127008a1ac1e230` (matches the before-plant digest).
- Rebuilt (`npm run build:src`) and ran the scoped browser command again: green, 18 passed.

## Gate exits

- `npx oxfmt --config .oxfmtrc.json --check` over the five owned files: exit 0 ("All matched files
  use the correct format.", 5 files).
- `npm run check`: exit 0 (`tsc --noEmit` root, `check:src:core`, `check:src:browser`,
  `check:src:styles`, `check:app:browser` all exit 0).
- `npm run build:src`: exit 0.
- Scoped browser command
  (`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-floating.test.ts`):
  exit 0, 1 test file passed, 18 tests passed.
- `npm run test:setup`: 1 file failed, 2 passed; 1 test failed, 184 passed — the failure is the
  standing `form-floating` shipped-key Set literal in `tests/setupServer.test.ts` (the Orchestrator's
  integration edit), matching the standing condition.
- `npm run test:guides`: exit 0, 1 test file passed, 18 tests passed.

## git status --porcelain

```
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 A app/browser/sections/FormFloatingSection.ts
 M guides/veneer.md
 A src/styles/components/_form-floating.scss
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 A tests/app/browser/sections/FormFloatingSection.test.ts
 M tests/conformance.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 A tests/src/styles/components/form-floating.test.ts
```

Matches the round-1 and round-2 file set exactly; no other file changed.

## Deviations

None. Every obligation applied as specified; the plant reddened the line-box assertion as required;
all gates named in § Acceptance criteria are green or red only on the named standing conditions.
