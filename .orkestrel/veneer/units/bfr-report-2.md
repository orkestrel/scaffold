# Unit B-FORMS-RANGE-2 report

## Before

`npm run test:setup` reported `Tests 2 failed | 160 passed (162)`, matching the RANGE report's
reading, before any edit in this unit landed.

## After

1. **D1** — `tests/setupServer.test.ts`: added `'form-range',` directly after `'figure',` inside the
   `Set([…])` literal in the case `skips engine and CSS obligations whose Proof cell is a dash`.
2. **D2** — `src/styles/_mixins.scss`: added the `flush-box` mixin, with its comment, directly before
   `@mixin border-reset`. `src/styles/elements/_fieldset.scss`: replaced the `legend` rule's
   `width: 100%;` and `padding: 0;` with `@include flush-box;`. `src/styles/components/_form-range.scss`:
   replaced the `.form-range` rule's `width: 100%;` and `padding: 0;` with `@include flush-box;`.
   Both partials already carried `@use '../mixins' as *;`, so neither needed that line added.
3. **D3** — `tests/setup.ts`: added `'Range'` and `'Range disabled'` to `CaptureSubject`, kept
   `CaptureScenario` unwritten (it derives `range-focus` automatically: `CaptureStem` already
   includes `range` from the `Range` subject, and `CaptureState` already includes `focus`), added the
   `FORM_RANGE_KEYS` list holding `{ scenario: 'range-focus', subject: 'Range' }` after
   `CASCADE_KEYS`, and spread `...FORM_RANGE_KEYS` last in `CAPTURE_KEYS`. `tests/setup.test.ts`:
   imported `FORM_RANGE_KEYS`, added `'FORM_RANGE_KEYS'` to the export inventory at its sorted
   position, and rewrote the `CAPTURE_KEYS` equality assertion to the four-spread form.
   `tests/app/browser/integration.test.ts`: after the `:focus-visible` assertion in the case
   `reaches the range slider through the keyboard and leaves its ring to the thumb`, placed
   `await FRAMES.page('range-focus', specimen)` under `VARIANT === LIGHT`, following the guard shape
   `primary-focus` uses in that file.

`npm run test:setup` now reports `Tests 162 passed (162)`.

## Compiled cascade after `npm run build:src`

From `dist/src/styles/index.css` (minified; rule bodies extracted):

```css
legend{float:left;width:100%;margin-bottom:var(--vn-space-4);line-height:inherit;font-size:calc(var(--vn-size-6) * .85 + .3vw);padding:0}
.form-range{width:100%;height:var(--vn-space-12);appearance:none;background-color:#0000;padding:0}
```

Both rules carry `width: 100%` and `padding: 0`.

## Gate exits

- `npx oxfmt` over the owned files: 0.
- `npm run format:check`: 0 (`215 files`, all matched files use the correct format).
- `npm run lint:check`: 0.
- `npm run check`: 0 (`tsc` for root, `src:core`, `src:browser`, `src:styles`, and `vue-tsc` for
  `app:browser`).
- `npm run build:src`: 0. Compiled `.form-range` and `legend` rules carry `width: 100%` and
  `padding: 0` (preceding section).
- `npm run test:setup`: 0, `Tests 162 passed (162)`.
- `npm run test:src:styles`: 0, `Tests 422 passed (422)`.
- `npm run test:app`: 0, `Tests 28 passed (28)`.
- `npm run test:conformance`: 0, `Tests 17 passed (17)`.
- `npm run test:guides`: 0, `Tests 18 passed (18)`.
- `npm run test:policy`: 0, `Tests 109 passed | 1 skipped (110)`.

## Observations, not criteria

- `npm run test:journey`: exits with failures — `Test Files 4 failed (4)`, `Tests 6 failed | 98 passed (104)`.
  The failures are the `portfolio` case in `tests/app/browser/integration.test.ts`
  (`reads every frame this variant left in the portfolio directory inside its declared region`),
  reading a missing `range-focus` scenario under the project variants that are not `LIGHT`. This
  follows directly from obligation 3's instruction to place `range-focus` only under
  `VARIANT === LIGHT` and add nothing elsewhere: the `range` case runs once per project variant, with
  no `DARK`-guarded counterpart case the way `primary-focus` has one in the two separate `focus ring`
  cases, so the frame is never placed under a non-`LIGHT` project variant and the portfolio's
  per-variant scenario read comes up short by one entry there.
- `CAPTURE=1 npm run test:journey`: exits with failures for the same reason (`Test Files 2 failed | 2
  passed (4)`, `Tests 4 failed | 100 passed (104)`). `tmp/capture/states/range-focus--light-1280.png`
  was written (704423 bytes).

## `git status --porcelain`

```
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/ledger/departures.md
 M guides/veneer.md
 M src/styles/_mixins.scss
 M src/styles/elements/_fieldset.scss
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/conformance.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupServer.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/FormRangeSection.ts
?? src/styles/components/_form-range.scss
?? tests/app/browser/sections/FormRangeSection.test.ts
?? tests/src/styles/components/form-range.test.ts
```

Every path is either a RANGE unit write this unit keeps, or one of this unit's owned files.

## `git diff 3a9202a --stat`

```
 app/browser/Showcase.ts               |   2 +
 app/browser/constants.ts              |  29 ++++++
 app/browser/index.ts                  |   1 +
 guides/ledger/departures.md           |  33 +++++++
 guides/veneer.md                      | 174 ++++++++++++++++++++++------------
 src/styles/_mixins.scss               |   8 ++
 src/styles/elements/_fieldset.scss    |   3 +-
 src/styles/index.scss                 |   1 +
 tests/app/browser/Showcase.test.ts    |   3 +
 tests/app/browser/index.test.ts       |   3 +
 tests/app/browser/integration.test.ts |  38 ++++++++
 tests/conformance.test.ts             |   1 +
 tests/setup.test.ts                   |   9 +-
 tests/setup.ts                        |  28 ++++++
 tests/setupServer.test.ts             |   1 +
 tests/setupStyles.test.ts             |  66 +++++++++++++
 tests/setupStyles.ts                  | 104 ++++++++++++++++++++
 17 files changed, 439 insertions(+), 65 deletions(-)
```

`src/styles/components/_form-range.scss` is untracked at `3a9202a` (a RANGE unit write) and does not
appear in this stat form; its `.form-range` rule now reads `@include flush-box;` in place of
`width: 100%;` and `padding: 0;`, as the preceding compiled-cascade section confirms.

## Deviations

None. All three patches applied as the report's D1, D2, and D3 wrote them, with no third-file
edit needed for the `@use '../mixins' as *;` line (both target partials already carried it).

## Orchestrator correction after the unit returned

The brief's obligation 3 guarded the `range-focus` placement with `VARIANT === LIGHT`, which was the
brief's error: the portfolio case reads every registered scenario per variant, and the range case
runs once per variant with no dark twin. The guard was removed by the Orchestrator as an integration
edit (`await FRAMES.page('range-focus', specimen)` unguarded), recorded here and audited with the
unit's diff. The deciding journey reading is the Orchestrator's.
