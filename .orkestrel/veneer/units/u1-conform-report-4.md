# Unit U1-conform — report 4

Successor to brief 4 (`u1-conform-brief-4.md`), superseding brief 3 for the remainder of
the unit. Baseline: `u1-conform-report-3.md`.

## Diff per file

### `tests/setupConformance.ts`

Moved `import type { ESTree } from 'vite'` ahead of every value import. Passed
`{ preserveParens: false }` as `parseSync`'s third argument in `extractSpecifiers`, and added one
sentence to its doc block stating that a parenthesized argument or callee now reaches the visitor
as the expression it wraps.

### `tests/setupConformance.test.ts`

Added four assertions after `extractSpecifiers('require(\`bootstrap\`)')` in the `it` named
`extracts imports and re-exports while rejecting comments and strings as module edges`:
`require((\`bootstrap\`))`, `require(("bootstrap"))`, `import((\`bootstrap\`))`, and
`(require)(\`bootstrap\`)`, each expecting `['bootstrap']`.

### `tests/setupBrowser.ts`

`collectLayer`'s thrown text and its `@throws` line changed from `The document loaded no Veneer
cascade` to `The named sheets carry no Veneer cascade`. No other line in the file was touched by
this brief.

### `tests/setupBrowser.test.ts`

The one `toThrow` assertion on the old text, in `reports no sheet where no named sheet declares a
theme layer, and refuses a layer read there`, now asserts `The named sheets carry no Veneer
cascade`, wrapped onto its own argument line to stay under `oxfmt`'s line width. The `requireValue`
call at line 212 (`walks the document by default, selecting the published cascade over a sheet a
case fixtured`) carries its own message and was left unchanged, per Scope.

### `app/browser/Showcase.ts`

Line 45: `behaviour` became `behavior`; nothing else in the file changed.

## Red run (item 2)

Command: `npm run test:setup`.

```
 FAIL  |setup| tests/setupConformance.test.ts > setupConformance > extracts imports and re-exports while rejecting comments and strings as module edges
AssertionError: expected [] to deeply equal [ 'bootstrap' ]
 ❯ tests/setupConformance.test.ts:141:55
```

Failing count: 1 failed, 83 passed (84 total). First assertion's message:
`expected [] to deeply equal [ 'bootstrap' ]`, at the `require((\`bootstrap\`))` assertion.

## Green run (item 3)

Command: `npm run test:setup`.

```
 Test Files  3 passed (3)
      Tests  84 passed (84)
```

The controls stayed green in the same run: `require(\`${name}\`)` and `require(name)` extract
nothing, the comment and string case extracts nothing, and `import {` still throws.

## Grep of item 4

`grep -rn "The document loaded no Veneer cascade" tests/`:

```
tests/setupBrowser.test.ts:212:  const selected = requireValue(readCascadeSheet(), 'The document loaded no Veneer cascade')
tests/src/styles/index.test.ts:8
tests/src/styles/index.test.ts:29
tests/src/styles/tokens.test.ts:31
tests/src/styles/tokens.test.ts:51
```

All remaining hits are `requireValue` messages in `tests/src/styles/**` and
`tests/setupBrowser.test.ts`'s own `requireValue` call, matching the brief's Context exactly, and
they stay per Scope (`tests/src/**` off-limits).

## Gate results (item 6)

- `npm run format:check` → `All matched files use the correct format. Finished in 749ms on 80
  files using 16 threads.` (exit 0; after wrapping the `toThrow` call).
- `npm run lint:check` → exit 0, no output beyond the npm run banner.
- `npm run check` → all `tsc`/`vue-tsc` projects completed with no diagnostics (exit 0).
- `npm run test:setup` → `Test Files  3 passed (3)` / `Tests  84 passed (84)`.
- `npm run test:conformance` → `Test Files  1 passed (1)` / `Tests  6 passed (6)`.
- `npm run test:setup:browser` → `Test Files  1 passed (1)` / `Tests  19 passed (19)`.
- `npm run test:src:styles` → `Test Files  7 passed (7)` / `Tests  40 passed (40)`.
- `npm run test:app` → `Test Files  2 passed (2)` / `Tests  3 passed (3)`.

## `git status --porcelain` (tracked rows)

```
 D app/browser/factories.ts
 M app/browser/index.html
 M app/browser/index.ts
 M app/browser/main.ts
 D app/browser/showcases/Showcase.ts
 M app/browser/styles/_shell.scss
 M app/browser/styles/index.scss
 M guides/veneer.md
 M package-lock.json
 M package.json
 D src/browser/color-mode/ColorMode.ts
 M src/browser/constants.ts
 D src/browser/factories.ts
 M src/browser/index.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/app/browser/index.test.ts
 D tests/app/browser/showcases/Showcase.test.ts
 M tests/conformance.test.ts
 M tests/distribution.test.ts
 M tests/guides.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 D tests/src/browser/color-mode/ColorMode.test.ts
 D tests/src/browser/factories.test.ts
 D tests/src/browser/fixtures/constants.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
```

Matches report 3's tracked rows exactly (no row added or removed; only contents inside owned files
changed). The untracked rows (`app/browser/Showcase.ts`, `src/browser/ColorMode.ts`,
`tests/app/browser/Showcase.test.ts`, `tests/setupListeners.ts`, `tests/src/browser/ColorMode.test.ts`)
also stand unchanged in row count.

## Deviations

None. Every item in Execution completed as specified; every acceptance criterion was met with the
gate evidence recorded above.
