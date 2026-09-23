# Unit B-FORMS-CONTROL, round 4 — report

## Edits applied

**Edit 1** (the `values` paragraph clause), final text:

> for a `declared` reading or a `compiled` reading, followed by ` !important` where the release
> writes that priority.

**Edit 2** (the whole `reads` paragraph), final text:

> The `reads` map is keyed by property. A property the map leaves out is the claim that its
> declaration writes no `var()`, so an empty map states that the rule reads no custom property
> and leaves its literals to the value assertions. A token moved from the property that consumes
> it onto another declaration of the same rule reads as a different row.

Both edits landed in the `FORM_CONTROL_CASES` doc block's `@remarks` text in
`/home/user/veneer-bfo/tests/setupStyles.ts`, with the surrounding paragraph rewrapped so no line
passes 100 columns. No other line changed.

## Gate table

| Command | Exit | Reading |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check tests/setupStyles.ts` | 0 | "All matched files use the correct format." |
| `npx oxlint --config .oxlintrc.json --deny-warnings tests/setupStyles.ts` | 0 | No output, no warnings or errors. |
| `npm run check` | 0 | `tsc --noEmit` across `tsconfig.json`, `configs/src/tsconfig.{core,browser,styles}.json`, and `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` all completed with no diagnostics. |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | 0 | 1 test file passed, 85 tests passed. |
| `git status --porcelain` | 0 | Listed the round-3 file set (see following section), no additions. |
| `git diff 2c10329 --stat` | 0 | Same 19 files as the round-3 tree, `tests/setupStyles.ts` at 617 insertions total (cumulative across rounds 1 to 4). |

## Corrected evidence statement for the range journey deviation

The failed walk started at the document's start, crossed the `Form control date` specimen, and
stopped there because `document.activeElement` stays on the date control while Tab steps through
its fields, so the walk reached the date control twice. The repaired walk starts at the
`Form control readonly` specimen's control. The retained trails are
`/home/user/scaffold/.orkestrel/veneer/units/bfo-journey-1-<variant>.log.txt`.

## `git status --porcelain` (verbatim)

```
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 A app/browser/sections/FormControlSection.ts
 M guides/veneer.md
 M src/styles/_mixins.scss
 A src/styles/components/_form-control.scss
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 A tests/app/browser/sections/FormControlSection.test.ts
 M tests/conformance.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 A tests/src/styles/components/form-control.test.ts
 M tests/src/styles/components/validation.test.ts
```

## `git diff 2c10329 --stat` (verbatim)

```
 app/browser/Showcase.ts                            |   2 +
 app/browser/constants.ts                           |  68 +++
 app/browser/index.ts                               |   1 +
 app/browser/sections/FormControlSection.ts         |  20 +
 guides/veneer.md                                   | 641 ++++++++++++---------
 src/styles/_mixins.scss                            |  16 +
 src/styles/components/_form-control.scss           | 188 ++++++
 src/styles/index.scss                              |   1 +
 tests/app/browser/Showcase.test.ts                 |   3 +
 tests/app/browser/index.test.ts                    |   3 +
 tests/app/browser/integration.test.ts              |  46 ++
 .../browser/sections/FormControlSection.test.ts    | 119 ++++
 tests/conformance.test.ts                          |   1 +
 tests/setup.test.ts                                |   3 +
 tests/setup.ts                                     |  87 +++
 tests/setupStyles.test.ts                          | 115 ++++
 tests/setupStyles.ts                               | 617 ++++++++++++++++++++
 tests/src/styles/components/form-control.test.ts   | 412 +++++++++++++
 tests/src/styles/components/validation.test.ts     |  15 +-
 19 files changed, 2095 insertions(+), 263 deletions(-)
```

## Deviations

None. Both edit search strings were found once and exactly once, applied verbatim, and the
surrounding paragraph rewrapped to stay within 100 columns. All gates ran green on the first
attempt.

## Claims flagged as unverified

None. Every gate reading in the preceding table came from the command's own exit code and output,
observed directly in this session.
