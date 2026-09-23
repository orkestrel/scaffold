# Unit B-FORMS-FLOATING — report

`opus` on Opus 5.5, sole writer in `/home/user/veneer-bff`, baseline `2c10329`. Nothing committed.

## Outcome

The `form-floating` key's own selectors (every inventory selector opening on `.form-floating`, the
reduced-motion twin included) ship from `src/styles/components/_form-floating.scss`, with the proof,
the showcase section, the capture scenarios, the compatibility row, the `listed` entry, and the
ledger table. Two gates stay red in this worktree, and neither is repairable inside the owned scope:

1. `npm run test:conformance`: the presence case reports
   `Shipped component form-floating is missing selector .input-group > .form-floating`. The key's
   inventory also records GROUP's input-group rules (ruling 1: GROUP lands before FLOATING). A
   transient plant of those GROUP selectors, byte for byte as the release writes them, turns the
   suite green 17/17 with no ledger row (evidence under § Commands). The Orchestrator reads this at
   integration, after GROUP.
2. `npm run test:setup`: `repeats no partial's written declaration block in another partial beyond
   the coincidence floor` refuses the `.form-floating > label` block (§ Deviations D1). The expected
   shipped-key Set red in `tests/setupServer.test.ts` is also there; it is the Orchestrator's edit.

## Touched files

| File | Summary |
| --- | --- |
| `src/styles/components/_form-floating.scss` (new) | The partial: container, floated control geometry, label and transforms, placeholder, focus, filled, autofill, select insets, textarea backdrop, plaintext border, disabled labels; transition through the mixin. |
| `src/styles/index.scss` | `@use 'components/form-floating';` directly after `form-range`. |
| `tests/src/styles/components/form-floating.test.ts` (new) | The browser proof. |
| `tests/setupStyles.ts` | Appended `FORM_FLOATING_CASES` (frozen, `selector`/`rendered`/`reads`) and `FORM_FLOATING_MARKUP`. |
| `tests/setupStyles.test.ts` | Export inventory rows; appended `floating label case table` describe. |
| `app/browser/constants.ts` | Appended `FORM_FLOATING_COPY` and `FORM_FLOATING_SPECIMENS`. |
| `app/browser/sections/FormFloatingSection.ts` (new) | `SpecimenSection` subclass, the `FormRangeSection.ts` shape. |
| `tests/app/browser/sections/FormFloatingSection.test.ts` (new) | Section proof. |
| `app/browser/index.ts` | Re-export after `FormRangeSection`. |
| `app/browser/Showcase.ts` | Import and construction at the alphabetical position, directly before `FormRangeSection`. |
| `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts` | Region, specimen, and export inventory rows at the sorted or alphabetical position. |
| `tests/setup.ts` | The `Form floating *` `CaptureSubject` members; the `CASCADE_KEYS` rows appended; `FORM_FLOATING_KEYS` after `CLOSE_KEYS`; `...FORM_FLOATING_KEYS` spread in `CAPTURE_KEYS`. |
| `tests/setup.test.ts` | Import, export-inventory row, and the matching spread. |
| `tests/app/browser/integration.test.ts` | `FORM_FLOATING_SPECIMENS` in the imports and the portfolio table; `FORM_FLOATING_KEYS` import; the keyboard focus journey after the range journey. |
| `tests/conformance.test.ts` | `'form-floating'` in `listed`. |
| `guides/veneer.md` | `### Form floating classes` after `### Form range classes`; § Files row; § Tests link; § Compatibility selector row; `#### \`form-floating\`` departure table appended after `btn-close`. |

Diffstat (`git diff --stat` after `git add -N` on the new files): 17 files changed, 1372
insertions(+), 78 deletions(-). The deletions are a whitespace-only reflow of the § Files table
(§ Deviations D2); `git diff -w` shows the table gaining one row.

`git status --porcelain` lists owned files only. The new files show as `A` because of the
intent-to-add entries `git add -N` left in the index for the diff evidence; no content is staged.

## Coverage matrix

Every `form-floating` inventory entry opening on `.form-floating` ships here, the reduced-motion twin
included. `R` is a rendered reading, `D` is a
declaration reading (compiled-contract evidence), and the specimen names drop the `Form floating`
prefix.

| Inventory selector (condition) | Proof case (`form-floating.test.ts`) | Subject | Specimen | Scenario | Evidence limit |
| --- | --- | --- | --- | --- | --- |
| `.form-floating` | makes the container the positioning box… | every container | all | every rest frame | R |
| `> .form-control` (height, min-height, line-height) | makes the container the positioning box… | empty, filled textarea | empty, filled, textarea | `form-floating-textarea` (`padding-top`) | R |
| `> .form-control-plaintext` (same) | same | plaintext | plaintext | `form-floating-plaintext` | R |
| `> .form-select` (same) | same | select | select | `form-floating-select` | R for height; D for line height: Chromium resets a native-appearance select's line height to `normal`, measured with a `line-height: 40px` probe (40px with `appearance: none`, `normal` without). This waits on SELECT. |
| `> label` | rests the label over the control…; transitions the label… | empty label | empty | `form-floating-empty` (`transform`) | R |
| `> label` (`@media (prefers-reduced-motion: reduce)`) | transitions the label… (`stageMedia({ motion: false })`) | empty label | — | — | R |
| `> .form-control`, `> .form-control-plaintext` (padding) | rests the label…; density case | empty | empty | `form-floating-empty` | R |
| `> .form-control::placeholder`, `> .form-control-plaintext::placeholder` | hides the placeholder… | empty, plaintext, bare | empty, plaintext | — | R (`::placeholder` computed style) |
| `> .form-control:focus` | floats the label… when the keyboard reaches an empty control | empty | empty | `form-floating-empty-focus` (page frame) | R |
| `> .form-control:not(:placeholder-shown)` | keeps the label floated over a filled control… (`typeAccessible`, `commitInput`) | empty, filled | filled | `form-floating-filled` | R |
| `> .form-control-plaintext:focus` | floats the plaintext label… (cleared, then `traverseAccessible`) | plaintext | — | — | R |
| `> .form-control-plaintext:not(:placeholder-shown)` | floats the plaintext label… | plaintext | plaintext | `form-floating-plaintext` | R |
| `> .form-control:-webkit-autofill`, `> .form-control-plaintext:-webkit-autofill` | keeps the undrivable autofill rules… | CSSOM rule | — | — | D, and the Node reading of the expanded compile |
| `> .form-select` (padding) | floats the select label and pads the select… | select | select | `form-floating-select` (`padding-top`) | R |
| `> .form-control:focus ~ label` | keyboard focus case | empty label | empty | `form-floating-empty-focus` | R |
| `> .form-control:not(:placeholder-shown) ~ label` | filled case | filled label | filled | `form-floating-filled` (`transform`) | R |
| `> .form-control-plaintext ~ label` (transform; border-width) | floats the plaintext label… | plaintext label | plaintext | `form-floating-plaintext` (`border-left-width`) | R |
| `> .form-select ~ label` | select case | select label | select | `form-floating-select` | R |
| `> .form-control:-webkit-autofill ~ label` | autofill case (held to the focus rule's transform) | CSSOM rule | — | — | D |
| `> textarea:focus ~ label::after` | paints no backdrop… until the keyboard reaches it | empty textarea label | — | — | R |
| `> textarea:not(:placeholder-shown) ~ label::after` | paints the backdrop behind a filled textarea label… | filled textarea label | textarea | `form-floating-textarea` | R |
| `> textarea:disabled ~ label::after` | paints the disabled backdrop… | disabled textarea label | disabled | `form-floating-disabled` | R |
| `> :disabled ~ label` | grays the label of a disabled control… (the disabled select separates it) | disabled input, textarea, select | disabled | `form-floating-disabled` (`color`) | R |
| `> .form-control:disabled ~ label` | grays the label… (CSSOM declaration) | CSSOM rule | disabled | `form-floating-disabled` | D, because the bare rule paints the same gray |

Not emitted here:

- GROUP's input-group entries: `.input-group > .form-floating`, `:focus-within`, the
  `:not(:last-child)`, `:nth-last-child(n+3)`, and `:not(:first-child)` radius rules.
- VALIDATION's entries: the four `.input-group > .form-floating:not(:focus-within)` stacking rules,
  which `_validation.scss` already emits.

The Node proof in `tests/setupStyles.test.ts` holds this partition. It asserts that every foreign
entry opens on `.input-group` or `.was-validated`.

## Token reuse and literal rulings per value

| Value | Ruling |
| --- | --- |
| Label and control resting padding `1rem 0.75rem` | `var(--vn-space-8) var(--vn-space-6)`, tokenized |
| Floated `padding-bottom` `0.625rem` (control, plaintext, autofill, select) | `var(--vn-space-5)`, tokenized |
| Select `padding-left` `0.75rem` | `var(--vn-space-6)`, tokenized |
| Backdrop `inset: 1rem 0.375rem` | `var(--vn-space-8) var(--vn-space-3)`, tokenized |
| Disabled label `#6c757d` | `var(--vn-gray-600)`, tokenized (the `_quote.scss` precedent) |
| Height and min-height `calc(3.5rem + calc(var(--bs-border-width) * 2))` | Literal plus the global, byte for byte in the source. Sass flattens the nested `calc`, so the row is `declared`, the `_validation.scss` precedent. No `--vn-space-*` token carries `3.5rem`; `--vn-display-4` is a font size and is not bound. |
| Floated `padding-top` `1.625rem` | Literal; no token |
| `line-height: 1.25` | Literal; the `--vn-line-*` tokens are 1.5, 1.2, and 1.6 |
| Backdrop `height: 1.5em` | Literal (an `em` value; no token) |
| `z-index` 2 and -1, `top`/`left: 0`, `max-width`/`height: 100%` | Literal |
| Label `color: rgba(var(--bs-body-color-rgb), 0.65)` | Global, byte for byte |
| `border: var(--bs-border-width) solid transparent`, plaintext `border-width` | Global, byte for byte |
| Backdrop `var(--bs-body-bg)`, `var(--bs-border-radius)`, disabled `var(--bs-secondary-bg)` | Global, byte for byte |
| `transform-origin: 0 0`, `transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem)` | Byte for byte in the source (D11 ruling 6). The minified build spells it `translate(.15rem)`, and the resolved matrix is `matrix(0.85, 0, 0, 0.85, 2.04, -6.8)`. |
| Transition `opacity 0.1s ease-in-out, transform 0.1s ease-in-out` | Literal through the `transition` mixin. No motion token resolves to `0.1s` or to `ease-in-out` (the `_pagination.scss` precedent). |

No stop was needed, and no token was added.

## Ladder path per selector that took it

- The autofill selectors take the declaration path. No script puts a control into `:-webkit-autofill`,
  so no resolved reading exists. They are read through `collectLayer('components')` (the CSSOM keeps
  each one as its own rule) and through `readCascadeBlocks(compileExpandedCascade())` in the Node
  proof. No frame covers them.
- `.form-floating > .form-control:disabled ~ label` takes the declaration path, because the bare
  `:disabled ~ label` rule paints the same color.
- The `line-height` of `.form-floating > .form-select` takes the declaration path, because of the
  Chromium native-appearance reset.

`FORM_FLOATING_CASES.rendered` is `false` for exactly the autofill selectors and the disabled twin,
and a Node case pins that list.

## Departure rows and additions

Every row the ledger gate printed is appended as `#### \`form-floating\``:

- **declared**: `height` and `min-height` on `> .form-control`, `> .form-control-plaintext`, and
  `> .form-select`.
- **tokenized**:
  - `padding` on `> label`, `> .form-control`, and `> .form-control-plaintext`.
  - `padding-bottom` on the four focus and filled selectors, the two autofill selectors, and
    `> .form-select`.
  - `padding-left` on `> .form-select`.
  - `inset` on the two backdrop selectors.
  - `color` on `> :disabled ~ label` and `> .form-control:disabled ~ label`.

Additions: none. The addition gates are green.

## Deferral rows struck

None. No row in § Deferred selectors names a `form-floating` selector.

## Scenarios, frames, and artifacts

Registered scenarios:

- **`CASCADE_KEYS`**: element frames over the lifted specimen.
  - `form-floating-empty`: `.form-floating > .form-control:placeholder-shown ~ label`, `transform`.
  - `form-floating-filled`: `.form-floating > input.form-control:not(:placeholder-shown) ~ label`,
    `transform`.
  - `form-floating-textarea`: `.form-floating > textarea.form-control`, `padding-top`.
  - `form-floating-select`: `.form-floating > .form-select`, `padding-top`.
  - `form-floating-disabled`: `.form-floating > :disabled ~ label`, `color`.
  - `form-floating-plaintext`: `.form-floating > .form-control-plaintext ~ label`,
    `border-left-width`.
- **`FORM_FLOATING_KEYS`**: `form-floating-empty-focus`, a page frame reached by
  `traverseAccessible`. It waits for the label transition to settle and reads the state again after
  the shot.

`CAPTURE=1` runs wrote to `tmp/capture/states`, for each of `light-1280`, `dark-1280`, `light-390`,
and `dark-390`:

- `form-floating-{empty,filled,textarea,select,disabled,plaintext,empty-focus}--<variant>.png`
- `form-floating-{empty,filled,textarea,select,disabled,plaintext}--<variant>-accessibility.txt`

`ls tmp/capture/states | grep form-floating` lists them. The frames show the
floated geometry over bare user-agent controls, because `.form-control` and `.form-select` have no
partial yet.

## Key the shipped-key Set literal must gain

`tests/setupServer.test.ts`, the Set in `skips engine and CSS obligations whose Proof cell is a dash`
(around line 1324):

```diff
 				'figure',
+				'form-floating',
 				'form-range',
```

## Commands (from `/home/user/veneer-bff`, npm 11.19.1, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`)

Scoped `oxfmt` on the owned files is followed by these commands. The final chain ran after the last
source edit.

| Command | Exit | Counts |
| --- | --- | --- |
| `npm run format:check` | 0 | all files formatted |
| `npm run lint:check` | 0 | — |
| `npm run check` | 0 | — |
| `npm run build:src` | 0 | every owned selector present in `dist/src/styles/index.css`, reduced-motion twin included (python grep over the unique owned selectors: none missing) |
| `npm run test:setup` | 1 | 2 failed, 183 passed (185). The reds are the shipped-key Set (the Orchestrator's) and the coincidence floor (D1). A prior run under load also timed out `records and reads official control state…` at 10100 ms; it passed in the final run. |
| `npm run test:src:styles` | 0 | 71 files, 651 tests passed |
| `npm run test:app` | 0 | 23 files, 55 tests passed |
| `npm run test:conformance` | 1 | 1 failed, 16 passed (17). The red is presence of GROUP's `.input-group > .form-floating`. |
| `npm run test:conformance` with a transient GROUP-selector plant | 0 | 17 passed. The plant was reverted by restoring the saved copy, `cmp` identical, and `dist` rebuilt. |
| `npm run test:guides` | 0 | 18 passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped (110) |
| `CAPTURE=1 npm run test:journey -- --project 'journey:<variant>*'` | 0 for each variant | 33 passed for each of `light-1280`, `dark-1280`, `light-390`, and `dark-390` |
| `npm run test:journey` | 0 | 4 files, 132 passed |
| `npm test` | not run | The chain stops at `test:setup` on the two known reds. |

Before the ledger rows landed, `npm run test:conformance` reported 2 failed of 17. The ledger case
listed the unrecorded rows now in the table, and the presence case failed. After the rows landed, only the presence red
remained.

### Failing-first proof (mutation with exact revert, `tests.md` § Probes fallback)

The `prove` tool is unavailable, so each named mutation of the partial was applied, followed by
`npm run test:src:styles -- tests/src/styles/components/form-floating.test.ts`, and then the original
text was restored by the script (`cmp`-checked, `dist` rebuilt afterwards). The script is
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/mutate.py`.

| Mutation | Exit | Red cases |
| --- | --- | --- |
| Wrong transform (`translateY(-0.25rem)` in the focus group) | 1 | The keyboard, filled, select, and plaintext state cases, and the autofill case |
| Label that never fades (`0.65` becomes `1`) | 1 | `rests the label…`, `reads the border width, the body color…` |
| Lost focus padding (`:focus` dropped from the group) | 1 | `floats the label… keyboard reaches an empty control`, `authors every case selector…` |
| Surviving reduced-motion transition (plain `transition:` without the mixin) | 1 | `transitions the label… collapses both under reduced motion` |
| Wrong backdrop radius (`--bs-border-radius-sm`) | 1 | `paints the backdrop…`, the globals case, `authors every case selector…` |
| Dropped bare disabled rule | 1 | `grays the label of a disabled control…`, `authors every case selector…` |
| Literal label inset (`1rem 0.75rem`) | 1 | The density case, `authors every case selector…` |

Negative control: the unmutated run of the file is green (17 passed). The control for the GROUP plant is the unplanted
conformance red that names `.input-group > .form-floating`.

## Deviations (§ Deviation protocol)

- **D1 (stop-class, unowned change).**
  - Expected: `findDuplication(scanStyleBlocks().shared)` is `[]`.
  - Found: the `.form-floating > label` block overlaps these blocks:
    - `_ratio.scss` `.ratio > *` (5 declarations) on `position: absolute`, `top: 0`, `left: 0`,
      `height: 100%`, which is 4 shared, and 4×2 > 5.
    - `_button.scss` around line 118, the 7-declaration hidden-input block, on `position: absolute`,
      `overflow: hidden`, `white-space: nowrap`, `pointer-events: none`, which is 4 shared, and
      4×2 > 7.
  - Each block records the release's own values, which D15 classes as coincidence, but the relative
    arm refuses it. The D15 repair (a mixin in `_mixins.scss`) is off-limits and would join unrelated
    decisions. Changing the threshold is a `tests/setupServer.ts` edit, also off-limits. Splitting the
    label rule to get under the floor would evade the instrument, so I did not.
  - Done: everything else. Not done: this gate.
  - Hypothesis: the relative arm measures against the smaller block, so a large recorded block
    collides with any small positioned block. The ruling belongs to the D15 owner.
- **D2 (ancillary, recorded).** `oxfmt` re-pads the whole § Files table because the
  `_form-floating.scss` path widens its first column by one character. The change is whitespace-only
  (`git diff -w` shows one added row), but it touches every row of that table, so sibling appends
  there will conflict mechanically.
- **D3 (ancillary, recorded).** The brief says the partial opens after `@use '../tokens'`. It loads
  `../mixins` alone, because it reads no tokens-module Sass API (D18: an unread `@use` is a dead
  load; `_form-range.scss` precedent).
- **D4 (ancillary, recorded).** The autofill padding rules are one selector per rule. A grouped
  `:-webkit-autofill` list is rewritten by the build into `:-webkit-any(…)` and `:is(…:autofill)`,
  which dropped the recorded selectors from the built cascade (measured by building the grouped form).
  The release's own group has the same declarations, so the cascade is unchanged.
- **D5 (ancillary).** The disabled specimen is a filled disabled textarea, so one frame shows the
  disabled label and the disabled backdrop.

## `ROADMAP.md` patch (report-only)

```diff
@@ ## Carriers table, appended rows
+| The floating label block trips the coincidence floor against `_ratio.scss` `.ratio > *` and the `_button.scss` hidden-input block (4 shared declarations each, both recorded release values) | Orchestrator ruling on D15's relative arm before B-FORMS-FLOATING lands (B-FORMS-FLOATING report D1) |
+| Floating density split: the insets read `--vn-space-*` while the `3.5rem` height and the `1.625rem` floated top inset stay literal, so at `--vn-factor-density: 2` an empty floating control grows past its declared height | B-FORMS-CLOSE rules on it (proved in `form-floating.test.ts`, stated in the guide's Form floating classes) |
+| The floating select's `line-height: 1.25` has no resolved reading while `.form-select` keeps the native appearance | B-FORMS-SELECT reads it resolved once `.form-select` ships `appearance: none` |
+| Floating frames show bare user-agent controls | B-FORMS-CONTROL and B-FORMS-SELECT recapture the `form-floating-*` scenarios over the styled controls |
```

The B-FORMS row's "landed as" text is the Orchestrator's fold at landing.

## Claims flagged unverified

- The ledger attribution after GROUP lands. `.input-group > .form-floating` carries both classes, and
  `form-floating` is the longer class, so its GROUP-authored rows (if GROUP departs there) would sit in
  the `form-floating` table. The plant was byte-exact and produced no row, so a GROUP departure at
  that site is unmeasured here.
- The plant covered presence only. The sibling partials' real text (GROUP) was not in this worktree.
- The claim in the guide and the proof that "no script can put a control into the autofilled state"
  rests on the installed browser exports and the DOM, which offer no autofill driver. No CDP
  autofill path was probed.
- The journey ran under sibling load (load average 4.5 to 7.6). The timing reading is the
  Orchestrator's.
