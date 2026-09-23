# Unit F7b CAPTION-SPECIMEN report

## `git diff --stat`

```
 app/browser/constants.ts                        | 1 +
 tests/app/browser/sections/TableSection.test.ts | 2 ++
 2 files changed, 3 insertions(+)
```

## `git status --short`

```
 M app/browser/constants.ts
 M tests/app/browser/sections/TableSection.test.ts
```

## Acceptance criteria

1. `TABLE_SPECIMENS` carries `{ name: 'Caption at bottom', classes: 'caption-bottom' }` directly
   after the `Caption at top` row and nothing else changes in `app/browser/constants.ts`.
   Command: `grep -n "Caption at top" app/browser/constants.ts` then read the following line.
   Result: line 601 is `{ name: 'Caption at top', classes: 'caption-top' },` and line 602 is
   `{ name: 'Caption at bottom', classes: 'caption-bottom' },`. `git diff --stat` shows one
   insertion in this file. Met.

2. The section proof's name literal carries `'Caption at bottom'` directly after
   `'Caption at top'`, and its class literal carries `'caption-bottom'` directly after
   `'caption-top'`; nothing else changes in the file.
   Command: read `tests/app/browser/sections/TableSection.test.ts` around the two literals.
   Result: the name array carries `'Caption at top',` followed by `'Caption at bottom',`; the
   class array carries `'caption-top',` followed by `'caption-bottom',`. `git diff --stat` shows
   two insertions in this file only. Met.

3. `npx oxfmt --check` over the two owned files, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.
   - `npx oxfmt --check app/browser/constants.ts tests/app/browser/sections/TableSection.test.ts`:
     "All matched files use the correct format." Exit 0.
   - `npm run format:check`: "All matched files use the correct format." (289 files). Exit 0.
   - `npm run lint:check`: no output, no warnings. Exit 0.
   - `npm run check`: `tsc --noEmit` for the root project, `check:src:core`, `check:src:browser`,
     `check:src:styles`, and `check:app:browser` (`vue-tsc --noEmit`) all completed with no
     diagnostics. Exit 0.
   Met.

4. `npm run test:app` exits 0.
   Result: `Test Files 28 passed (28)`, `Tests 65 passed (65)`. Exit 0. Met.

## Shared-file grep results

- `guides/veneer.md`: `grep -n "Caption at top\|caption-top" guides/veneer.md` returns hits at
  the `@source not inline(...)` Tailwind-style directives (lines around 359 and 372, which already
  list both `caption-bottom` and `caption-top`), the guide prose describing the opt-out (around
  line 413 and line 701, which already names both classes), and the parity table row for the
  `.caption-top` family (around line 3755). None of these enumerate the showcase specimen names or
  count them, so the addition makes none of them false. No patch.
- `tests/setup.ts`: `grep -n "Caption at top\|caption-top" tests/setup.ts` returns nothing. No
  patch.
- `tests/app/browser/integration.test.ts`: `grep -n "Caption at top\|caption-top"
  tests/app/browser/integration.test.ts` returns nothing. No patch.
- `ROADMAP.md`: `grep -n "Caption at top\|caption-top" ROADMAP.md` returns nothing (the row cited
  in the brief's context names "Caption opt-out" and "F7b CAPTION-SPECIMEN", neither of which
  matches these patterns; it is a status line, not an enumeration, and needs no patch from this
  unit).

## Off-limits check

`tests/app/browser/Showcase.test.ts` (off-limits): not run separately here beyond `npm run
test:app`, which includes it in the app:browser project's `28 passed` test files; it read the new
specimen through `TABLE_SPECIMENS` and stayed green with no edit.

## Deviation

None.
