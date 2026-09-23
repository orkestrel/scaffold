# Unit B-FORMS-CONTROL, round 3 — report

## Edits applied

1. `guides/veneer.md`, "Every Bootstrap utility …" paragraph rewrapped, no line past 100 columns
   (longest line now 99). Text unchanged; only line breaks moved after "the `reset`" and after
   "the `components` layer carry one as well, each matching Bootstrap's own declaration."

2. `guides/veneer.md`, "The file button ships on the standard …" paragraph rewrapped, no line past
   100 columns (longest line now 98). Text unchanged; only the break after "The button's inline-end
   margin" moved.

3. `tests/setupStyles.ts`, `FORM_CONTROL_CASES` `@remarks` block, each replacement applied once and
   rewrapped:
   - "The `resolved` rung is a reading of the computed style of the named control, or of its named
     part where Chromium resolves the part's own style."
   - "The `declared` rung is the rule's declaration read out of the CSSOM, for a declaration whose
     computed value this engine does not expose: a part whose computed style Chromium answers with
     the control's own, and the file control's `overflow`, which the user agent already resolves to
     `clip` on every text and file control."
   - "The `compiled` rung is the declaration read out of the compiled cascade in Node, for a Gecko
     part whose selector Chromium discards at parse time."
   - "The `excluded` rung is the prefixed file-button alias the guide's deferral table withholds,
     which the cascade must not write at all."
   - "The `values` map holds each recorded declaration as the release writes it, converted to what
     that reading returns at the root size and the density factor of 1: a pixel length for a
     `resolved` reading, and the declaration as the CSSOM or the compiled cascade serializes it for
     a `declared` or `compiled` one, followed by ` !important` where the release writes that
     priority."
   - "The `reads` map is keyed by property. A property the map leaves out is the claim that its
     declaration writes no `var()`, so an empty map separates a rule holding Bootstrap's own values
     from one this package routed onto tokens, and a token moved from the property that consumes it
     onto another declaration of the same rule reads as a different row."

4. `tests/setup.ts`, scenario remark now reads: "The `form-control-text` scenario already names the
   `Form control text` subject inside {@link CASCADE_KEYS}, and that list refuses a repeated
   subject, so this scenario carries its own list." Rewrapped, no line past 100 columns.

5. `tests/src/styles/components/form-control.test.ts`: comment now reads "A driven case is read
   only after the control is in the state its selector names: keyboard traversal is what earns
   `:focus-visible`, and the pointer is what earns `:hover`."

6. `tests/app/browser/integration.test.ts`: comment replaced with:
   "The traversal starts from the `Form control readonly` specimen's control rather than from the
   document's own start. A walk from the start crosses the `Form control date` specimen, whose
   control keeps focus on itself while Tab steps through its date fields, and the installed
   `driveTraversal` walk stops at the first element it reaches twice."

## Gate table

| Command | Exit | Reading |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check` (owned files) | 0 | "All matched files use the correct format." |
| `npx oxlint --config .oxlintrc.json --deny-warnings` (owned TypeScript files) | 0 | No output, clean. |
| `npm run check` | 0 | All `tsc`/`vue-tsc` projects pass. |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-control.test.ts` | 0 | 1 file, 32 tests passed. |
| `npm run test:guides` | 0 | 1 file, 18 tests passed. |
| `npm run test:app` | 0 | 23 files, 55 tests passed. |
| `awk 'length > 100' guides/veneer.md tests/setupStyles.ts tests/setup.ts tests/app/browser/integration.test.ts \| wc -l` | 0 | 1736 total (pre-existing long lines outside this round's paragraphs, mostly guide tables). Every line inside the six edited spans checked individually against the current tree: all 100 columns or fewer (longest new lines: 99, 98, 100, 100, 100, 98, 94, 94). No changed line in this round passes 100 columns. |
| `git status --porcelain` | 0 | See below. |
| `git diff 2c10329 --stat` | 0 | See below. |

## Landing records (restated from the round-2 report, D39 row dropped)

- **D31 carrier cell.** Carried by `tests/src/styles/components/form-control.test.ts` and
  `tests/setupStyles.ts`'s `FORM_CONTROL_CASES`, which drive and pin every declared, resolved, and
  compiled rung this round's guide and test text describes.
- **Color-width row.** The color swatch's `width`/`height` pairing to the type scale is pinned by
  the `FORM_CONTROL_CASES` rows keyed to the color control and asserted in
  `tests/src/styles/components/form-control.test.ts`.
- **`FORM_RANGE_CASES` row.** Unaffected by this round; the range case set stays in
  `tests/setupStyles.ts` under its own block, outside the `FORM_CONTROL_CASES` `@remarks` this round
  edited.
- **FLOATING text-control half**, bounded to "every floating text-control frame": this round makes
  no floating-label edit; the bound stands as landed in round 2.
- **Shipped-key Set literal.** `tests/setupServer.test.ts`'s shipped-key Set literal stays red per
  this round's Standing conditions; it is the Orchestrator's integration edit, untouched here.

(The D39 row is dropped: fold 29 closed it at L2's landing, per the brief.)

## Corrected evidence statement, range journey deviation

The traversal trail continues past the select's embedded newline and ends at the date control: the
walk started from the `Form control readonly` specimen's control, and a walk from the document
start crosses the `Form control date` specimen, whose control keeps focus on itself while Tab steps
through its own date fields, so the installed `driveTraversal` walk stops at the first element it
reaches twice — the date control's own field, not the select. This is the fact
`tests/app/browser/integration.test.ts`'s comment (edit 6) now states.

## Status and stat, verbatim

```
$ git status --porcelain
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

$ git diff 2c10329 --stat
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

The status lists exactly the round-2 set: no file outside it appears, and no file in the Off-limits
list appears.

## Deviations

None. Every search text under § Edits was found once and exactly once in its named file, and each
edit applied cleanly.

## Claims flagged as unverified

- The `awk` total of 1736 lines past 100 columns spans the whole four files, not only this round's
  edits; this report verified the six edited spans individually instead of relying on that raw
  count, and that per-span check is the basis for acceptance criterion 4, not the `awk` total
  itself.
