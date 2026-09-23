# Unit B-FORMS-CONTROL, round 2 — report

`opus` on Opus 5.5, native Claude subagent, sole writer in `/home/user/veneer-bfo` (detached at
`2c10329`). Brief: `tmp/units/b-forms-control-brief-2.md`, successor to
`tmp/units/b-forms-control-brief.md`. No bench lane, no journal. The D40 decision arrived
mid-unit from the coordinator; it is carried under § D40.

Every carried finding is closed. Every named plant reddens its named assertion, and every revert
turns the same commands green. The acceptance gates are green except the two standing reds the brief
names. Instruments and logs are under
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bfo2/`, called `bfo2/` in
the rest of this report.

## Carried findings

1. **SWATCH-PRIORITY.** Closed.
   - The swatch `@each` in `src/styles/components/_form-control.scss` writes `border: 0 !important;`,
     as the release does at `bootstrap.css` lines 2294 and 2298. Its comment states that the border
     reset carries the `!important` the release writes on it.
   - Case L (`reads the date, time, and swatch parts through their declarations, …`) reads each
     declared property as the `getPropertyValue` result plus ` !<priority>` from
     `getPropertyPriority`. It compares the whole map to the row with `toStrictEqual`.
   - The `.form-control-color::-webkit-color-swatch` row records `border: '0px !important'`, which
     is Chromium's serialization. The `::-moz-color-swatch` row records `border: '0 !important'`,
     which is the release's text. The Node case reads the compiled Gecko rule through the postcss
     parser, using `declaration.important`.
   - The non-utility `!important` sentence in `guides/veneer.md` names the color swatch rules in the
     `components` layer beside the `[hidden]` rule and the calendar-picker indicator rule. The
     ladder bullets state that the proof reads the priority beside the value.
2. **Claim 5, per-property binding.** Closed.
   - The `FormControlCase` interface in `tests/setupStyles.ts` types `reads` as
     `Readonly<Record<string, readonly string[]>>`, which is the `InputGroupCase` shape. The interface
     keeps the `selector`, `condition`, `evidence`, `subject`, `pseudo`, `state`, and `values` fields.
     `FORM_CONTROL_CASES` is typed `readonly FormControlCase[]`, and every row carries a frozen
     per-property map of frozen name arrays.
   - The maps were checked against the round-1 flat lists: the union of each map equals that row's
     round-1 list.
   - The Node case is renamed `binds every text-control selector to the inventory, to its evidence
     rung, and each declaration to the tokens its row names for that property`. It builds a
     per-property reference map for each compiled `selector condition` key from `readCascadeBlocks`.
     It compares `Object.fromEntries([...properties].filter(([, names]) => names.length > 0))` with
     `entry.reads` using `toEqual`, and it asserts that every `reads` map and every name array is
     frozen.
3. **Claim 4, the date specimen.** Closed.
   - `FORM_CONTROL_SPECIMENS` gains `Form control date`
     (`<input class="form-control" type="date" aria-label="Due date" value="2026-09-23">`) after
     `Form control file`. `FORM_CONTROL_COPY` names the date control.
   - `CaptureSubject` gains `'Form control date'`. `CASCADE_KEYS` gains `form-control-date`
     (selector `.form-control[type="date"]`, property `padding-left`), an element frame over the
     lifted specimen.
   - The section proof lists the specimen, its class, its tag, and its type.
   - The portfolio's declared list in `tests/app/browser/integration.test.ts` reads the whole
     `FORM_CONTROL_SPECIMENS` table, so it needed no edit to include the new specimen.
   - A comment in case L names the `form-control-date` frame of the `Form control date` specimen as
     the corroboration for the date parts, and the `form-control-color` frame as the corroboration
     for the swatch.
   - The guide bullet names both frames and no longer says the date parts have no frame.
4. **R2, the readonly color control.** Closed. `FORM_CONTROL_MARKUP` gains
   `<input class="form-control form-control-color" type="color" aria-label="Readonly color choice" value="#563d7c" readonly>`.
   Case C reads that control's cursor and holds it off `pointer`. Under the plant, case C and the
   Node case both redden; see § Plant table.
5. **Claim 8, the `validation.test.ts` patch.** Closed. The round-1 report's patch applied exactly
   (`git apply`, no conflicts). Command:
   `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/validation.test.ts`.
   - Without the patch (`git apply -R`, run, then reapplied): 5 failed, 12 passed. The failing
     cases are the valid and invalid mark cases, the required-control case, and the valid and
     invalid scope cases.
   - With the patch: 17 passed, exit 0. No later assertion failed.
   - `oxfmt --check` over the file reports it formatted.
6. **Claim 9, the prose.** Closed.
   - The alias sentence reads "because the partial does not write that alias and the standard part
     paints the same button".
   - The timing bullet reads "The official timing is the `0.15s ease-in-out` value; Veneer writes
     the `var(--vn-motion-feedback) var(--vn-ease-standard)` value, which resolves to the
     `0.15s ease` value, …".
   - The first link now reads "The form control proof reads each recorded declaration … ; see
     [the form control classes](…)". The second reads "The Node binding case reads its declarations
     and their priority out of the compiled cascade; see [the styles setup proof](…)".
   - The ladder lead-in reads "Each part, and the file control's `overflow` declaration, takes one
     rung of the evidence ladder:".
   - The proof comment reads "the release's `0.15s` fade".
   - The ROADMAP rows are under § Landing records.
7. **Claim 3, the plant table.** Closed; see § Plant table. The table was re-run over the final
   partial (after D40), with the Node case, the red sets, and the SHA-256 digests recorded. A first
   run over the partial before D40 (digest `454ed91c7fe1…`) produced identical red sets; its logs are
   under `bfo2/plants-1/`.
8. **Records for the landing.** See § Landing records.

## D40

The following files changed for D40:

- `src/styles/_mixins.scss` gains the `control-type` mixin and then the `control-border` mixin,
  after the `border-reset` mixin. They carry exactly the declarations the decision names, in that
  order, and each has a comment in the file's form.
- `src/styles/components/_form-control.scss`: in `.form-control`, `@include control-type;` replaces
  the `font-size`, `font-weight`, `line-height`, and `color` declarations in place, and
  `@include control-border;` replaces the `border` and `border-radius` declarations in place. No
  other declaration changed.

The compile was taken with `npx --no-install sass --no-source-map src/styles/index.scss`:

| Reading | Exit |
| --- | --- |
| Compile before, to `bfo2/d40-before.css` | 0 |
| Compile after, to `bfo2/d40-after.css` | 0 |
| `cmp` of the before and after files | 0 (byte-identical) |

The partial's digest moved from `454ed91c7fe10282b3b39104ac59d61c68c674cd53dff1bbd635262ac37ba8e8`
to `645d830ceea34a9d04700f2bc6c0311ebe8f1d9c441b253041a397f9e8670fd1`.

## Unknowns

- **The date specimen's frames.** `<input class="form-control" type="date" aria-label="Due date" value="2026-09-23">`
  renders in all four frames (`form-control-date--light-1280.png`, `--dark-1280.png`,
  `--light-390.png`, `--dark-390.png`). Each frame shows a full-width control of one line height
  with the rounded border. The filled fields `09/23/2026` sit at the inline start, and the
  calendar-picker indicator sits at the inline end. The light frames show the light surface with
  dark text, and the dark frames show the dark surface with light text and a light indicator.
  Each variant also wrote `form-control-date--<variant>-accessibility.txt`.
- **The swatch priority in Chromium's CSSOM.** The CSSOM exposes it. On the
  `.form-control-color::-webkit-color-swatch` `CSSStyleRule`, `getPropertyPriority('border')`
  returns `important` and `getPropertyValue('border')` returns `0px`, so case L reads
  `0px !important`. This was measured by case L's first run, which reported `"border": "0px
  !important"` against a guessed row. The Node fallback was not needed for the WebKit rule. The Gecko
  rule, which Chromium discards, takes the compiled reading in the Node case.

## Plant table

Instrument: `bfo2/plant.py`, run by `bfo2/run-plants.sh`. Each plant does the following:

1. Edits the partial.
2. Runs `npm run build:src`.
3. Runs the browser command
   `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-control.test.ts`
   and the Node command
   `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts`.
4. Reverts by the exact reverse string replacement, rebuilds, and reruns both commands.

The baseline digest and the restored digest are both `645d830ceea3…` (full value under § D40) in
every row. Logs are `bfo2/plants/<plant>-{browser,node,restored,restored-node}.log.txt`.

| Plant | Edit | Planted SHA-256 (prefix) | Browser red, assertion | Node red, assertion | After revert |
| --- | --- | --- | --- | --- | --- |
| Swatch priority | `border: 0 !important;` → `border: 0;` | `ca6738583359` | case L (1 failed, 31 passed): `values.border` `"0px"` against `"0px !important"` | the Node binding case (1 failed, 84 passed): the compiled-values comparison, `"0"` against `"0 !important"` on `::-moz-color-swatch` | 32 passed; 85 passed |
| Per-property binding | `.form-control` `padding: var(--vn-space-3) var(--vn-space-6);` → `padding: 0; --audit-unused: var(--vn-space-3) var(--vn-space-6);` | `31d66e10522e` | R for `.form-control` and case T (2 failed, 30 passed) | the Node binding case: the per-property comparison, with `padding` missing and `--audit-unused` added | 32 passed; 85 passed |
| Readonly color cursor | `.form-control-color:not(:disabled):not([readonly])` → `.form-control-color:not(:disabled)` | `f4c83303712e` | case C (1 failed, 31 passed): `expected 'pointer' not to be 'pointer'` on the readonly color control | the Node binding case: `The compiled cascade writes no .form-control-color:not(:disabled):not([readonly]) rule` | 32 passed; 85 passed |
| Wrong focus width | focus `box-shadow` spread `var(--vn-focus-width)` → `0.25rem` | `2d2e036ab500` | F light and F dark (2 failed): ring `[0, 0, 0, 4]` against `[0, 0, 0, 3]` | the Node binding case: the per-property comparison, with `box-shadow` reading only the `--vn-focus-color` token | 32 passed; 85 passed |
| Lost `::placeholder` color | drop `color: var(--bs-secondary-color)` | `d76765b173e4` | case M (1 failed) | the Node binding case: the per-property comparison, with `color` missing | 32 passed; 85 passed |
| Surviving reduced-motion transition | `@include transition(…)` → bare `transition:` on `.form-control` | `a756f9c63234` | case G, R for `.form-control` under reduced motion, F light, and F dark (4 failed, 28 passed) | the Node binding case: `The compiled cascade writes no .form-control @media (prefers-reduced-motion: reduce) rule` | 32 passed; 85 passed |
| Literal size | `.form-control` padding → `0.375rem 0.75rem` | `95eae19801f8` | case T (1 failed): `expected 6 to be 12` | the Node binding case: the per-property comparison, with `padding` missing | 32 passed; 85 passed |
| Missing hover surface | empty the hover rule | `93360bc8f8a6` | case H (1 failed) | the Node binding case: `The compiled cascade writes no .form-control:hover:not(:disabled):not([readonly])::file-selector-button rule` | 32 passed; 85 passed |
| Lost swatch radius | drop `border-radius` from the swatch `@each` | `95fb20ba9fbe` | case L (1 failed) | the Node binding case: the per-property comparison, with `reads` `{}` against `border-radius` on `::-moz-color-swatch` | 32 passed; 85 passed |

The reduced-motion plant also reddens both F cases, because each reads the ring after staging the
preference. This matches round 1.

## Frames the date specimen produced

`tmp/capture/states/form-control-date--light-1280.png`, `--dark-1280.png`, `--light-390.png`, and
`--dark-390.png`, plus the matching `form-control-date--<variant>-accessibility.txt` artifacts.
Every other registered `form-control*` frame was rewritten by the same runs.

## Gate table

The final readings, taken with the tree in its returned state (`bfo2/gates.sh`; logs under
`bfo2/gates/`):

| Command | Exit | Reading |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check` over the owned files, `_mixins.scss` and `validation.test.ts` included | 0 | all matched files formatted |
| `npx oxlint --config .oxlintrc.json --deny-warnings` over the owned TypeScript files | 0 | no findings |
| `npm run check` | 0 | clean |
| `npm run build:src` | 0 | built |
| the scoped browser run over `form-control.test.ts` and `validation.test.ts` | 0 | 49 passed (2 files) |
| `npm run test:setup` | 1 | 1 failed, 183 passed: the shipped-key Set literal in `tests/setupServer.test.ts` (standing) |
| `npm run test:app` | 0 | 55 passed |
| `npm run test:conformance` | 1 | 1 failed, 16 passed: the presence reading `.form-floating > .form-control` (standing) |
| `npm run test:guides` | 0 | 18 passed |
| `CAPTURE=1 npm run test:journey -- --project 'journey:light-1280*'` | 0 | 33 passed |
| same, `dark-1280` | 0 | 33 passed |
| same, `light-390` | 0 | 33 passed |
| same, `dark-390` | 0 | 33 passed |
| `npm run test:src:styles` (observation) | 0 | 666 passed (71 files) |
| `npm run test:policy` (observation) | 0 | 109 passed, 1 skipped |

The journey rows come from `bfo2/journeys.log.txt` and `bfo2/journey-<variant>.log.txt`, run after
the final plant table and its rebuild. Sibling units shared the host during every reading.

## Landing records (report-only)

**The FLOATING carrier sentence.** CONTROL's landing patch writes the text-control half of the
bare-controls sentence in § Form floating classes. That sentence reads "The control's own border,
radius, and paint belong to the `.form-control` and `.form-select` rules, which Veneer does not ship
yet, …". The text-control half is:

> The text control's own border, radius, and paint belong to the `.form-control` rule, which Veneer
> ships, so every floating frame shows the floated label over the styled control.

The select half belongs to the FLOATING-SELECT unit.

**`ROADMAP.md` rows.** Apply these against the session branch's carriers table. First, restate the
carrier cell of the row that opens "`INPUT_GROUP_ROUNDING` in `tests/setupStyles.ts` and the
`### Input group classes` sentence on the consumer radius …":

```text
B-FORMS-CLOSE retires the `INPUT_GROUP_ROUNDING` fixture and the consumer-radius sentence of the `### Input group classes` section after the control and select classes ship their own radius (D31)
```

Then append these rows after the `Cascade-key prose` row:

```text
| The validated color control's width holds the validation partial's `3rem` literal while the `.form-control-color` rule reads the `--vn-space-24` token, so a density retune widens the resting color control and not the validated one | B-FORMS-CLOSE rules on the binding in the `_validation.scss` partial and its proof |
| The `FORM_RANGE_CASES` table in the `tests/setupStyles.ts` module binds tokens per selector and its Node case searches the joined declarations, the shape the GROUP and CONTROL fix rounds replaced with per-property references | B-FORMS-CLOSE gives the table a per-property `reads` map and the Node case the per-property comparison |
| The `readCascadeBlocks` function stores a declaration's value without its priority, so the cascade comparison and the ledger rows cannot see a dropped or added `!important` value (D39) | L2 LEDGER-PRIORITY on `opus` carries the priority as part of the compared value, after CONTROL lands, and records or repairs every row that comparison surfaces |
```

**The shipped-key Set literal.** Unchanged from round 1: the Set literal in
`tests/setupServer.test.ts` gains `'form-control'` between `'figure'` and `'form-range'`.

## `git status --porcelain`

```text
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

The round-1 set, `validation.test.ts` (brief-granted), and `src/styles/_mixins.scss` (the D40
grant). Nothing else.

## `git diff 2c10329 --stat`

```text
 app/browser/Showcase.ts                            |   2 +
 app/browser/constants.ts                           |  68 +++
 app/browser/index.ts                               |   1 +
 app/browser/sections/FormControlSection.ts         |  20 +
 guides/veneer.md                                   | 638 ++++++++++++---------
 src/styles/_mixins.scss                            |  16 +
 src/styles/components/_form-control.scss           | 188 ++++++
 src/styles/index.scss                              |   1 +
 tests/app/browser/Showcase.test.ts                 |   3 +
 tests/app/browser/index.test.ts                    |   3 +
 tests/app/browser/integration.test.ts              |  45 ++
 .../browser/sections/FormControlSection.test.ts    | 119 ++++
 tests/conformance.test.ts                          |   1 +
 tests/setup.test.ts                                |   3 +
 tests/setup.ts                                     |  87 +++
 tests/setupStyles.test.ts                          | 115 ++++
 tests/setupStyles.ts                               | 617 ++++++++++++++++++++
 tests/src/styles/components/form-control.test.ts   | 412 +++++++++++++
 tests/src/styles/components/validation.test.ts     |  15 +-
 19 files changed, 2092 insertions(+), 262 deletions(-)
```

## Deviations

- **The range journey now starts after the date control (an ancillary choice in an owned file).**
  - Expected: adding the date specimen leaves the journey green.
  - Found: the first `CAPTURE=1` run of each variant exited 1 with 3 failed and 30 passed. The
    range focus case threw `Interactive target "Range value" is not reachable through forward Tab
    traversal`, and the two portfolio cases then missed its frame (95 frames against 96). Logs:
    `bfo2/journey-1-<variant>.log.txt`.
  - Cause: the installed `driveTraversal` stops at the first element it reaches twice. A date
    control keeps `document.activeElement` on itself while Tab steps through its date fields, and
    the Form range section follows the Form control section.
  - Done: the range case in `tests/app/browser/integration.test.ts` focuses the
    `Form control readonly` specimen's control and traverses from there. This copies the
    `Check group` case's `preceding.focus()` pattern, and a comment states the reason. All four
    variants then exited 0 with 33 passed.
  - I made this change without stopping, because the file is owned for the date specimen and the
    date specimen is what made the case false.
- **D40 widened the scope mid-unit.** The coordinator granted `src/styles/_mixins.scss` for the D40
  addition alone. It is carried under § D40, and the plant table was re-run over the post-D40
  partial.
- **The portfolio's declared list needed no edit.** It reads the whole `FORM_CONTROL_SPECIMENS`
  table.
- **The scratchpad copy of the decisions file.** As the brief directs,
  `tmp/units/decisions-round-2.md` was refreshed from the scaffold copy. The `tmp/` directory is
  ignored.

## Claims flagged as unverified

- The explanation for the traversal stop comes from reading the installed `driveTraversal` source
  (`visited.has(focused)` breaks the walk). Two runs are consistent with it: the red run with the date
  specimen and the green run after the start point moved. I did not probe which element the walk
  reached twice. Its trail ends at `SELECT:First choice` in the Content section, which the source
  reading does not fully account for.
- The date frames were inspected by eye at all four variants. No pixel reading was taken of the
  date fields themselves.
