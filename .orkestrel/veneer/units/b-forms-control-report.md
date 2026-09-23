# Unit B-FORMS-CONTROL — report

`opus` on Opus 5.5, native Claude subagent, sole writer in `/home/user/veneer-bfo` detached at
`2c10329`. Brief: `tmp/units/b-forms-control-brief.md`. No bench lane; no journal.

The key `form-control` ships. Every owned acceptance criterion is met except where a deviation
below names the off-limits file it needs: shipping `.form-control` moves resolved readings in
`tests/src/styles/components/validation.test.ts` (off-limits), so `npm run test:src:styles` reports
red there. The exact patch is under § Shared-file patches.

## Touched files

- `src/styles/components/_form-control.scss` (new): every recorded text-control selector the key
  owns, the file button on `::file-selector-button` only, the sizes through one `@each` over a
  size list, the swatches through one `@each` over the engine list, the reduced-motion twins through
  the `transition` mixin, the file button's border reset through the `border-reset` mixin.
- `src/styles/index.scss`: `@use 'components/form-control';` directly before the form-range line.
- `tests/src/styles/components/form-control.test.ts` (new): the browser proof.
- `tests/setupStyles.ts`: `FORM_CONTROL_MARKUP` and `FORM_CONTROL_CASES` appended at the file end.
- `tests/setupStyles.test.ts`: import and inventory rows, the Node binding case, and the markup
  case, appended after the range markup case.
- `app/browser/sections/FormControlSection.ts` (new): the `Form control` region.
- `tests/app/browser/sections/FormControlSection.test.ts` (new): the section proof.
- `app/browser/constants.ts`: `FORM_CONTROL_COPY` and `FORM_CONTROL_SPECIMENS` before the range
  copy.
- `app/browser/index.ts`, `app/browser/Showcase.ts`: the re-export and the construction directly
  before `FormRangeSection`.
- `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`: the region, specimen,
  and export literals, sorted where sorted.
- `tests/setup.ts`: the specimen names in `CaptureSubject`, resting rows appended to
  `CASCADE_KEYS`, `FORM_CONTROL_KEYS` after `CLOSE_KEYS`, its spread in `CAPTURE_KEYS`.
- `tests/setup.test.ts`: the export-name row and the `CAPTURE_KEYS` spread.
- `tests/app/browser/integration.test.ts`: the specimen import, the portfolio's declared list, and
  the keyboard focus journey for the text control.
- `tests/conformance.test.ts`: `'form-control'` in `listed`.
- `guides/veneer.md`: `### Form control classes` before `### Form range classes`, the § Files row,
  the § Tests link, the § Compatibility row, the `Excluded` deferral rows, the
  `#### \`form-control\`` departure table, and the two re-attributed rows struck from the
  `is-valid` and `is-invalid` tables. `oxfmt` reflowed the deferral table and the two validation
  tables to their new column widths; no cell text outside the named rows changed.

Diffstat against `2c10329` (after `git add -N` on the new files):

```text
 app/browser/Showcase.ts                            |   2 +
 app/browser/constants.ts                           |  63 ++
 app/browser/index.ts                               |   1 +
 app/browser/sections/FormControlSection.ts         |  20 +
 guides/veneer.md                                   | 632 ++++++++++++---------
 src/styles/components/_form-control.scss           | 191 +++++++
 src/styles/index.scss                              |   1 +
 tests/app/browser/Showcase.test.ts                 |   3 +
 tests/app/browser/index.test.ts                    |   3 +
 tests/app/browser/integration.test.ts              |  35 ++
 .../browser/sections/FormControlSection.test.ts    | 115 ++++
 tests/conformance.test.ts                          |   1 +
 tests/setup.test.ts                                |   3 +
 tests/setup.ts                                     |  80 +++
 tests/setupStyles.test.ts                          |  93 +++
 tests/setupStyles.ts                               | 548 ++++++++++++++++++
 tests/src/styles/components/form-control.test.ts   | 397 +++++++++++++
 17 files changed, 1934 insertions(+), 254 deletions(-)
```

## Coverage matrix

Proof cases: **R** is `resolves every declaration $name records on the control it matches` (one
case per `resolved` row of `FORM_CONTROL_CASES`); **L** `reads the date, time, and swatch parts
through their declarations, because Chromium answers a part request with the control`; **T**
`sizes the control from the space and size tokens, the density factor, and a direct override`;
**F** `paints the focus ring from the focus tokens and tints the border within one channel step of
the release in %s mode` (light, dark); **M** `paints the border, fill, disabled surface,
placeholder, and file button from the theme variables in each mode`; **G** `gates the control and
file button transitions on the reduced-motion preference and reads them from the motion tokens`;
**H** `lights the file button under the pointer and leaves a disabled or readonly control at
rest`; **C** `points the cursor at an enabled file or color control and at no disabled, readonly,
or bare one`; **N** `binds every text-control selector to the inventory, to its evidence rung, and
to the tokens it reads` (Node, `tests/setupStyles.test.ts`); **J** the journey case `reaches the
text control through the keyboard and paints the calibrated focus ring on it`. Subjects are the
accessible names in `FORM_CONTROL_MARKUP`.

| Inventory selector and condition | Proof case | Subject | Specimen | Scenario | Evidence limit |
| --- | --- | --- | --- | --- | --- |
| `.form-control` | R, T, F, M, G, N | Text entry | Form control text | `form-control-text` | none |
| `.form-control` under reduced motion | R, G, N | Text entry | every control specimen | none | the staged preference is not photographed |
| `.form-control[type=file]` | L, N | File entry | Form control file | `form-control-file` | the user agent resolves `overflow` to `clip` on every text and file control, so the declaration is read from the CSSOM |
| `.form-control[type=file]:not(:disabled):not([readonly])` | R, C, N | File entry | Form control file | `form-control-file` | a cursor is not visible in a frame |
| `.form-control:focus` | R, F, J, N | Text entry | Form control text | `form-control-text-focus` (page) | none |
| `.form-control::-webkit-date-and-time-value` | L, N | Date entry | none | none | part style withheld; no specimen renders a date control, so no frame |
| `.form-control::-webkit-datetime-edit` | L, N | Date entry | none | none | as the preceding row |
| `.form-control::placeholder` | R, M, N | Text entry | Form control text, small, large, disabled | `form-control-text` | none |
| `.form-control:disabled` | R, M, N | Disabled entry | Form control disabled | `form-control-disabled` | none |
| `.form-control::-webkit-file-upload-button` and its reduced-motion twin | L, N; conformance deferral case | — | — | — | `Excluded`; absent from compile and CSSOM |
| `.form-control::file-selector-button` | R, T, M, G, N | File entry | Form control file | `form-control-file` | none |
| `.form-control::file-selector-button` under reduced motion | R, G, N | File entry | Form control file | none | the staged preference is not photographed |
| `.form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button` | L, N | — | — | — | `Excluded` |
| `.form-control:hover:not(:disabled):not([readonly])::file-selector-button` | R, H, N | File entry, Disabled file entry, Readonly file entry | Form control file | none | no hover frame is registered; the hover is read, not photographed |
| `.form-control-plaintext` | R, N | Plain value | Form control plaintext | `form-control-plaintext` | none |
| `.form-control-plaintext:focus` | R, N | Plain value | Form control plaintext | none | no plaintext focus frame |
| `.form-control-plaintext.form-control-sm`, `.form-control-plaintext.form-control-lg` | R, N | Small plain value, Large plain value | none | none | not rendered in the showcase |
| `.form-control-sm`, `.form-control-lg` | R, T, N | Small entry, Large entry | Form control small, Form control large | `form-control-small`, `form-control-large` | none |
| `.form-control-sm::-webkit-file-upload-button`, `.form-control-lg::-webkit-file-upload-button` | L, N | — | — | — | `Excluded` |
| `.form-control-sm::file-selector-button`, `.form-control-lg::file-selector-button` | R, N | Small file entry, Large file entry | none | none | not rendered in the showcase |
| `textarea.form-control` | R, T, N | Note | Form control textarea | `form-control-textarea` | none |
| `textarea.form-control-sm`, `textarea.form-control-lg` | R, N | Small note, Large note | none | none | not rendered in the showcase |
| `.form-control-color` | R, T, N | Color choice | Form control color | `form-control-color` | none |
| `.form-control-color:not(:disabled):not([readonly])` | R, C, N | Color choice | Form control color | `form-control-color` | a cursor is not visible in a frame |
| `.form-control-color::-moz-color-swatch` | N (compiled), L (absent from CSSOM) | — | Form control color | none for Gecko | compiled-contract evidence only |
| `.form-control-color::-webkit-color-swatch` | L, N | Color choice | Form control color | `form-control-color` | part style withheld; declaration from the CSSOM, frame shows the rendered swatch |
| `.form-control-color.form-control-sm`, `.form-control-color.form-control-lg` | R, N | Small color choice, Large color choice | none | none | not rendered in the showcase |
| (no positive rule) `[readonly]` | M | Readonly entry | Form control readonly | `form-control-readonly` | the release writes no readonly surface; the proof reads that the resting fill holds |

## Token and literal rulings

| Value (release) | Veneer | Ruling |
| --- | --- | --- |
| control padding `0.375rem 0.75rem` | `var(--vn-space-3) var(--vn-space-6)` | tokenized (button binds the same pair) |
| `font-size: 1rem` | `var(--vn-size-3)` | tokenized (pagination's binding of `1rem`; the button's `--vn-size-2` is its own departure) |
| `font-weight: 400`, `line-height: 1.5` | `var(--vn-weight-body)`, `var(--vn-line-body)` | tokenized (button binding) |
| colors, border, radius | `var(--bs-body-color)`, `var(--bs-body-bg)`, `var(--bs-border-width) solid var(--bs-border-color)`, `var(--bs-border-radius)`, `-sm`, `-lg` | `--bs-*` byte for byte |
| focus border `#86b7fe` | `color-mix(in srgb, var(--vn-palette-blue) 50%, var(--vn-palette-white-base))` | tokenized, brief's binding |
| focus shadow `0 0 0 0.25rem rgba(13, 110, 253, 0.25)` | `0 0 0 var(--vn-focus-width) var(--vn-focus-color)` | tokenized, `_button.scss` binding |
| transitions `0.15s ease-in-out` | `var(--vn-motion-feedback) var(--vn-ease-standard)` | tokenized, range precedent |
| date part `min-width: 85px`, `height: 1.5em`, `margin: 0` | same | literal; no scale carries `85px`, `1.5em` is relative |
| file button padding, margins, inline-end margin | `var(--vn-space-3|6)`, `calc(var(--vn-space-N) * -1)`, per size `--vn-space-2|4|8` | tokenized (D33 multiple for the negative margin) |
| `border-inline-end-width` | `var(--bs-border-width)` | `--bs-*` byte for byte |
| `border-radius: 0` on the file button | `0` | literal zero |
| plaintext padding `0.375rem 0` | `var(--vn-space-3) 0` | tokenized |
| size paddings and type steps | `--vn-space-2`/`-4`, `--vn-space-4`/`-8`, `--vn-size-2`, `--vn-size-5` | tokenized |
| minimum heights and color heights `calc(1.5em + Xrem + calc(var(--bs-border-width) * 2))` | `calc(1.5em + var(--vn-space-N) * 2 + var(--bs-border-width) * 2)` | tokenized per D33 and D34; `1.5em` stays literal (relative) |
| color control width `3rem` | `var(--vn-space-24)` | tokenized, range precedent for thumb sizes |
| color control padding `0.375rem` | `var(--vn-space-3)` | tokenized |
| swatch `border: 0`, `border-radius: var(--bs-border-radius)` | same | literal zero and `--bs-*` byte for byte |
| `-webkit-appearance`, `-moz-appearance` | not written | dropped, range precedent |
| `-webkit-margin-end` | written | ruling 6, byte for byte |

No value met neither a token nor a permitted literal. No token was added.

## Ladder path per vendor pseudo

Measured in Chromium 141 on this host (form-control proof run, 2026-09-23):

- `::placeholder`: resolved. The part reads `color(srgb 0.0571957 0.0900803 0.168835 / 0.75)`
  while the host reads its own text color.
- `::file-selector-button`: resolved. Padding, margins, borders, radius, pointer events,
  transition, and fill all read the part's own values.
- `::-webkit-datetime-edit`, `::-webkit-date-and-time-value`, `::-webkit-color-swatch`: declared.
  Chromium answers the part request with the host's style (`min-width` `0px`, border `1px`, the
  host padding), so the CSSOM declaration is the evidence, named as compiled-contract evidence.
- `::-moz-color-swatch`: compiled. Absent from the CSSOM; read out of `compileExpandedCascade` in
  case N.
- `::-webkit-file-upload-button` family: excluded. Absent from the compile (case N) and from the
  CSSOM (case L).
- Ruling 6 readings on `::file-selector-button`: `margin-inline-end` resolves as `margin-right`
  `12px` with `margin-left` `-12px`; `border-inline-end-width` resolves as `border-right-width`
  `1px` with the other three sides `0px`. The built stylesheet keeps both `-webkit-margin-end` and
  `margin-inline-end`.

## Departure rows and re-attributed rows

The ledger gate printed the `form-control` rows; all are recorded in the
`#### \`form-control\`` table appended after `#### \`btn-close\``. Every row is `tokenized` except
`.form-control` `-webkit-appearance` and `-moz-appearance`, which are `dropped`. No addition row.

Re-attributed rows, moved from the validation tables into the `form-control` table:

- `.form-control.is-valid:focus` `box-shadow` (from `#### \`is-valid\``).
- `.form-control.is-invalid:focus` `box-shadow` (from `#### \`is-invalid\``).

The brief anticipated `textarea.form-control.is-*` and `.form-control-color.is-*` rows moving too.
The gate did not print them: the textarea rules carry no departure, and `.form-control-color.is-*`
carries the class `form-control-color` rather than `form-control`, so the ladder keeps those rows
under `is-valid` and `is-invalid`.

## Deferral rows

- Struck: none. No deferral row named a shipped `form-control` selector.
- `Excluded` confirmed: `::-webkit-file-upload-button` (existing).
- `Excluded` added: `.form-control::-webkit-file-upload-button`,
  `.form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button`,
  `.form-control-sm::-webkit-file-upload-button`, `.form-control-lg::-webkit-file-upload-button`.
  The presence case skips a deferred name by exact match, so the bare-pseudo row alone did not cover
  the component selectors; without these rows the presence case reported
  `Shipped component form-control is missing selector .form-control::-webkit-file-upload-button`.

## Sibling-absent presence reading

A read-only probe (`tmp/probe/presence.test.ts` in the `probe` project, deleted after the reading)
listed every recorded `form-control` selector the built cascade lacks, minus deferred names. Every
missing selector opens on `.form-floating >` or `.input-group` (FLOATING's and GROUP's). Negative
control: the same reading over the cascade with `.form-control-plaintext:focus` replaced out added
exactly that selector to the list; the probe exited 0.

## Scenarios and frames

Registered: `form-control-text`, `form-control-small`, `form-control-large`,
`form-control-textarea`, `form-control-file`, `form-control-color`, `form-control-plaintext`,
`form-control-disabled`, `form-control-readonly` (element frames over the lifted specimen, in
`CASCADE_KEYS`), and `form-control-text-focus` (page frame, `FORM_CONTROL_KEYS`).

`CAPTURE=1` runs wrote to `tmp/capture/states/`, for each of `light-1280`, `dark-1280`, `light-390`,
`dark-390`: `<scenario>--<variant>.png` for every registered scenario, and
`<subject>--<variant>-accessibility.txt` for every resting subject. The first run registered the
plain specimen as `Form control`, which collides with the region name in `readSubject`; I stopped
that run after its `light-1280` variant, renamed the specimen `Form control text`, and deleted the
two frames that run wrote under the old names (`form-control--light-1280.png`,
`form-control-focus--light-1280.png`).

## Key the Set literal must gain

`tests/setupServer.test.ts`, the shipped-key Set in `skips engine and CSS obligations whose Proof
cell is a dash`: `'form-control'`, between `'figure'` and `'form-range'`.

## Shared-file patches

`tests/setupServer.test.ts`:

```diff
@@ -1321,6 +1321,7 @@
 				'display',
 				'engine',
 				'figure',
+				'form-control',
 				'form-range',
 				'g',
 				'gx',
```

`tests/src/styles/components/validation.test.ts` (off-limits; see § Deviations):

```diff
@@ -71,10 +71,10 @@
 			const swatch = requireValue(container.querySelector('[type="color"]'), 'No marked swatch')
 			expect(readStyle(control, 'background-image')).toBe(`url("${image}")`)
 			expect(readStyle(control, 'background-repeat')).toBe('no-repeat')
-			// The mark's inset is `calc(0.375em + 0.1875rem)`, which resolves to 8.25px against the
-			// published 14px body type; the reading is the measurement rather than a target, so a
-			// retuned body size moves it and reports here.
-			expect(readStyle(control, 'background-position')).toBe('right 8.25px 50%')
+			// The mark's inset is `calc(0.375em + 0.1875rem)`, which resolves to 9px against the
+			// control's own 16px type, the release's own reading; a retuned control size moves it and
+			// reports here.
+			expect(readStyle(control, 'background-position')).toBe('right 9px 50%')
 			expect(readToken(single, '--bs-form-select-bg-icon')).toBe(`url("${image}")`)
 			expect(readPixels(single, 'padding-right')).toBe(66)
 			// The release withholds the mark from a select showing more than one value, so a rule
@@ -82,7 +82,7 @@
 			expect(readToken(multiple, '--bs-form-select-bg-icon')).toBe('')
 			// A text area is taller than one line, so the release moves its mark to the top corner
 			// rather than centring it, and widens the swatch by the room the mark takes.
-			expect(readStyle(area, 'background-position')).toBe('right 8.25px top 8.25px')
+			expect(readStyle(area, 'background-position')).toBe('right 9px top 9px')
 			expect(readStyle(area, 'background-image')).toBe(`url("${image}")`)
 			// The release widens the swatch by the room the mark takes: `calc(3rem + 1.5em + 0.75rem)`
 			// resolves to 81px against the published 14px body type.
@@ -166,6 +166,9 @@
 			'No invalid feedback',
 		)
 		const marks = new Map(FORM_ICON_CASES.map((entry) => [entry.state, entry.image]))
+		// The control's border transitions under the text-control rule, so the preference is staged
+		// first and the committed border is read at its end state rather than part of the way there.
+		await stageMedia({ motion: false })
 		expect(readStates(control)).toContain('required')
 		expect(control.matches(':invalid')).toBe(true)
 		expect(readStyle(control, 'background-image')).toBe(`url("${String(marks.get('invalid'))}")`)
@@ -322,7 +325,7 @@
 			const border = readToken(control, `--bs-form-${state}-border-color`)
 			expect(matchesColor(readStyle(control, 'border-top-color'), border)).toBe(true)
 			expect(readStyle(control, 'background-image')).toBe(`url("${image}")`)
-			expect(readStyle(area, 'background-position')).toBe('right 8.25px top 8.25px')
+			expect(readStyle(area, 'background-position')).toBe('right 9px top 9px')
 			expect(matchesColor(readStyle(choice, 'border-top-color'), border)).toBe(true)
 			expect(readToken(choice, '--bs-form-select-bg-icon')).toBe(`url("${image}")`)
 			// The release widens the swatch by the room the mark takes: `calc(3rem + 1.5em + 0.75rem)`
```

`ROADMAP.md` (report-only): append these carrier rows to the carriers table after the
`Cascade-key prose` row, and record the landing in the `B-FORMS` row when CONTROL integrates.

```text
| The validated color control's width holds the validation partial's `3rem` literal while `.form-control-color` reads `--vn-space-24`, so a density retune widens the resting color control and not the validated one | B-FORMS-CLOSE rules on the binding in `_validation.scss` and its proof |
| D31: `INPUT_GROUP_ROUNDING` and the guide sentence on the consumer radius retire when the control ships its own radius | B-FORMS-CONTROL at integration, after GROUP lands; neither exists in the CONTROL worktree |
```

## Plant table

Each plant edits `src/styles/components/_form-control.scss`, rebuilds with
`npm run build:src:styles`, runs the acceptance command
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-control.test.ts`
and the Node command
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts`,
then reverts by the exact reverse string replacement, rebuilds, and reruns the acceptance command.
Baseline and restored SHA-256 of the partial:
`a1fd7602f6bfc668eddba47b754ba3b2a8c279035140ed4e1713858bd7791f5a` in every row. The script is
`plant.py` in the session scratchpad.

| Mutation | Edit | Browser red (count) | Node red | After revert |
| --- | --- | --- | --- | --- |
| Wrong focus width | focus `box-shadow` spread `var(--vn-focus-width)` → `0.25rem` | F light, F dark (2 failed, 30 passed) | N | 32 passed |
| Lost `::placeholder` color | drop `color: var(--bs-secondary-color)` | M (1 failed, 31 passed) | N | 32 passed |
| Surviving reduced-motion transition | `.form-control` `@include transition(…)` → bare `transition:` | G, R for `.form-control` under reduced motion, F light, F dark (4 failed, 28 passed) | N | 32 passed |
| Literal size | `.form-control` padding → `0.375rem 0.75rem` | T (1 failed, 31 passed) | N | 32 passed |
| Missing hover surface | empty the hover rule | H (1 failed, 31 passed) | N | 32 passed |
| Lost swatch radius | drop `border-radius` from the swatch `@each` | L (1 failed, 31 passed) | N | 32 passed |

The reduced-motion plant also reddens both F cases: each reads the ring after staging the
preference, so a missing twin leaves the ring mid-transition. That dependency is real, and it is the
reason F stages the preference.

## Gate table

| Command | Exit | Reading |
| --- | --- | --- |
| `npx oxfmt --check` over the owned files | 0 | all matched files formatted |
| `npx oxlint --config .oxlintrc.json --deny-warnings` over the owned TypeScript files | 0 | no findings |
| `npm run check` | 0 | tsc, src core/browser/styles, app browser clean |
| `npm run build:src` | 0 | built; every unique owned selector and both reduced-motion twins present in `dist/src/styles/index.css`; no `-webkit-file-upload-button` |
| `npm run test:setup` | 1 | 1 failed, 183 passed: the shipped-key Set literal in `tests/setupServer.test.ts` |
| `npm run test:app` | 0 | 55 passed |
| form-control proof (acceptance command) | 0 | 32 passed |
| `npm run test:conformance` | 1 | 1 failed, 16 passed: presence case, `.form-floating > .form-control` (sibling-absent) |
| `npm run test:guides` | 0 | 18 passed |
| `CAPTURE=1 npm run test:journey -- --project 'journey:light-1280*'` | 0 | 33 passed |
| same, `dark-1280` | 0 | 33 passed |
| same, `light-390` | 0 | 33 passed |
| same, `dark-390` | 0 | 33 passed |
| `npm run test:src:styles` (observation) | 1 | 5 failed, 661 passed: all in `validation.test.ts` (§ Deviations) |
| `npm run test:policy` (observation) | 0 | 109 passed, 1 skipped |
| `npm test` (observation) | not run | the Orchestrator takes it |

Sibling units and a landing chain ran on the host during these readings.

## Deviations

- **Off-limits file made false.** Expected: shipping `.form-control` leaves
  `tests/src/styles/components/validation.test.ts` green. Found: `npm run test:src:styles` reports
  5 failed there. The validation proof measured the mark inset against the body's `14px` type
  (`right 8.25px`); `.form-control` now sets the release's `1rem`, so the reading is the release's
  `right 9px`. The required-control case reads the border immediately after `commitInput`, and the
  control's border transition leaves it mid-way; a probe in my own proof, reverted and `cmp`
  confirmed, read `false oklab(0.505 0.188902 0.0984118)` without the staged preference and
  `true oklch(0.527 0.154 150.069)` with it. Done: the exact patch under § Shared-file patches. Not
  done: applying it; its later assertions after the first failing line in each case are unverified
  by a run. Hypothesis: none beyond the measured readings.
- **Specimen rename.** The plain specimen is `Form control text` rather than `Form control`,
  because `readSubject` refuses a specimen whose name equals its region's; recorded as an ancillary
  choice.
- **Construction order.** `FormControlSection` is constructed directly before `FormRangeSection`,
  the alphabetical position inside the forms sections; the tree's construction list is not
  alphabetical overall.
- **Presence reading method.** The sibling-absent reading used a read-only probe with a negative
  control rather than a plant of release text.

## Claims flagged as unverified

- The `validation.test.ts` patch beyond the measured failing lines.
- The page frame `form-control-text-focus` was not inspected by eye; its ring is evidenced by the
  journey's `readRing` reading held to `FOCUS_RING` in each variant, and the element frames I opened
  (`form-control-file--dark-1280.png`, `form-control-color--light-390.png`,
  `form-control-disabled--light-1280.png`) show the file button, the swatch, and the disabled
  surface.
- The whole-chain `npm test` reading.
