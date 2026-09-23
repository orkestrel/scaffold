# Unit B-FORMS-FLOATING, round 2 — report

Brief: `tmp/units/b-forms-floating-brief-2.md` (successor to `tmp/units/b-forms-floating-brief.md`).
Executor: `opus` on Opus 5.5, native Claude subagent, sole writer in `/home/user/veneer-bff` (detached
at `2c10329`). Every carried finding is closed in the owned files, every named plant reddened its case
and went green after the exact reverse edit, and the gates read as the brief expects. Deviation state:
no stop. One sentence outside the owned guide sections goes false with the barrel move; the exact patch
is under § Shared-file patches.

## Carried findings and the sites they changed

| Finding | Site | Change |
| --- | --- | --- |
| 1. D35 barrel order | `src/styles/index.scss` | `@use 'components/validation';` moved from after `components/vr` to directly after `components/form-floating`. The forms block reads `form-range`, `form-floating`, `validation`. |
| 1. D35 order case | `tests/conformance.test.ts`, new `describe('Bootstrap source order')` after `cascade ledger` | Case "loads the forms partials the barrel carries in the release order, validation last". It reads the installed release's `scss/_forms.scss` import list (renaming `floating-labels` to `form-floating`), pins that list to the release order, reads the barrel's `@use 'components/…'` lines, requires `form-range`, `form-floating`, and `validation` present, and asserts the forms partials present load as a subsequence of the release order. |
| 1. D35 validated padding | `tests/src/styles/components/form-floating.test.ts`, new `describe('form floating validation')` | Case "keeps the validation icon room at the end of a floating control marked valid or invalid". It mounts a floating `.form-control.is-invalid` and its `.is-valid` twin and asserts `padding-right` resolves `1.5 × the control's font size + 0.75 × the root font size` (`calc(1.5em + 0.75rem)`), while the other insets stay the floating container's. |
| 2. D34 partial | `src/styles/components/_form-floating.scss` | `height` and `min-height` are `calc(var(--vn-space-8) * 3.5 + calc(var(--bs-border-width) * 2))`. The floated `padding-top` is `calc(var(--vn-space-8) * 1.625)` on each rule that carries it: the focus and filled group, both autofill rules, and the select rule. The head comment states that the whole control scales with density and that the backdrop's `em` height and the `1.25` line height are relative already. |
| 2. D34 density case | `form-floating.test.ts`, `form floating tokens` | Replaced "rescales every tokenized inset…" with "scales the height and every inset together with the density factor and keeps the content box open". At factor 1 it reads the release's lengths (58px height and min-height; 16, 12, 26, and 10px insets; the backdrop's 16px and 6px inset). At `--vn-factor-density: 2` it reads every inset doubled and the height and min-height at 114px (the `3.5rem` term doubled plus two 1px borders). For the empty, filled, and select controls it asserts that the height less the vertical padding and borders stays at or above zero. |
| 2. D34 case table | `tests/setupStyles.ts` `FORM_FLOATING_CASES` | `reads` gains `--vn-space-8` on `.form-floating > .form-select`, the focus and filled rows, and both autofill rows. |
| 2. D34 ledger | `guides/veneer.md` `#### \`form-floating\`` | Rows applied as the gate printed them (see § Ledger rows). |
| 2. D34 guide | `guides/veneer.md` `### Form floating classes` | The density departure now reads "The whole control scales with density". The separate "height is written as one sum" bullet is folded into it as its last sentence. |
| 2. D34 proof comments | `form-floating.test.ts` | Two comments that called the height and floated inset literal were corrected: the geometry case's height comment and the keyboard case's inset comment. |
| 3. `--bs-secondary-bg` override | `form-floating.test.ts`, the Bootstrap globals case | The override table gains `--bs-secondary-bg: rgb(70, 80, 90)`, and the case asserts that the disabled textarea label's `::after` paints it. Retitled "reads the border width, the body color, both backdrop surfaces, and the backdrop radius from the Bootstrap globals". |
| 4. Autofill sentence | guide § Form floating classes, the `FORM_FLOATING_CASES` TSDoc, and the proof comment | Each now reads "The installed browser exports offer no way to put a control into the autofilled state, so …". |
| 5. Autofill comment and case | `_form-floating.scss` autofill comment, `form-floating.test.ts` autofill case | Both state the measured rewrite once, in the same words: the build rewrites a grouped list naming `:-webkit-autofill` into `:-webkit-any(…)` and `:is(…:autofill)`, so each autofill selector keeps a rule of its own. The case is retitled "holds each autofill rule to the release's declarations, one selector per rule" and expects `calc(var(--vn-space-8) * 1.625)` for the autofill `padding-top`. |
| 6. Section prose | guide § Form floating classes | "which this tree does not ship yet" → "which Veneer does not ship yet" (the proof comment in the geometry case too). The opening sentence's nested serial list is split into separate sentences. "an autofill" → "the browser's autofill". The limits sentence names `tests/src/styles/components/form-floating.test.ts`. The input-group sentence now states that the input-group partial emits the input-group rules for a floating child, and that the ledger attributes a selector naming both classes to this key, so any departure those rules carry is recorded in this key's table. The barrel sentence states the D35 order and its consequence. The evidence paragraph names the validated end padding and the per-variable ancestor retune. |
| 7. § Compatibility row | guide `form-floating` selector row | "…; resolved geometry, paint, and motion, and the autofill and class-qualified disabled declarations, are proved in `tests/src/styles/components/form-floating.test.ts`." |
| 8. ROADMAP patch | this report | See § `ROADMAP.md` patch. |

The partial's container comment was also rewritten to match the finding 6 input-group sentence: the
validation partial emits the validation rules against the container, and the input-group partial emits
the input-group rules for a floating child.

## Ancillary decisions (recorded)

- **Compatibility row wording.** The F2 text made the row wider than the table's widest cell (266
  characters at `2c10329`, the `reboot` row), so `oxfmt` re-padded the whole § Compatibility table. The
  row drops the clause "the floated label, the textarea backdrop, and the disabled and plaintext labels
  included" to fit the existing column width. The § Files row and the section still carry that list.
  The F2 clause stands verbatim. `git diff -U0 guides/veneer.md` shows one changed line at the row.
- **Order case source.** The release order is read from the installed `node_modules/bootstrap/scss/_forms.scss`
  and pinned to a literal. The case therefore compares the barrel against the release rather than against
  a copy of the brief's list. The only mapping is `floating-labels` → `form-floating`. The release's
  `labels` and `form-text` have no `components/` partial, so the subsequence reading ignores them until
  one exists.
- **Validated markup inline.** The validated pair is mounted inline in the case, as `validation.test.ts`
  does. Adding it to `FORM_FLOATING_MARKUP` would falsify the container count pin in
  `tests/setupStyles.test.ts` (off-limits).
- **Backdrop plant form.** "Drop the binding" was planted as `var(--bs-secondary-bg)` → `#e9ecef` (the
  release's compiled value). The resting disabled reading still matches, so only the retune separates
  the binding.

## Failing-first and plant table

The styles project loads `dist/src/styles/index.css` as a setup file, so each browser reading ran after
`npm run build:src`. The failing-first readings ran against the dist built from the audited source.

Failing first (tests written, source unchanged):

| Command | Before the fix | After the fix |
| --- | --- | --- |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-floating.test.ts` | exit 1; 3 failed, 15 passed (18). Red: the validated padding case (`expected 12 to be close to 33`), the density case, and the autofill case (`'1.625rem'`). | exit 0; 18 passed (18) |
| `npm run test:conformance` | exit 1; 2 failed, 16 passed (18). Red: the order case (`[ 'validation', 'form-range', … ]`) and the standing presence reading. | exit 1; 1 failed, 17 passed (18). Red: the standing presence reading only (after the ledger rows were applied). |

Plants (runtime-probe fallback; each ran through `run-plant.sh`: apply by exact replacement, `npm run build:src`, read, exact reverse replacement, `npm run build:src`, read):

| Plant | Mutation | Reddened | After the exact revert |
| --- | --- | --- | --- |
| Barrel (finding 1) | `@use 'components/validation';` moved back to directly after `@use 'components/vr';` | Browser: exit 1, 1 failed, 17 passed. Red: "keeps the validation icon room…" only. Conformance: exit 1, 2 failed, 16 passed. Red: "loads the forms partials…" plus the standing presence reading. | Browser: exit 0, 18 passed. Conformance: 1 failed, 17 passed (the standing reading). |
| Negative control for the order case | `@use 'components/pagination';` (not a forms partial) moved to after `@use 'components/validation';` | Conformance: 1 failed, 17 passed. The order case stayed green, and only the standing reading was red. | Same reading. |
| Backdrop binding (finding 3) | `.form-floating > textarea:disabled ~ label::after { background-color: var(--bs-secondary-bg) }` → `#e9ecef` | Browser: exit 1, 2 failed, 16 passed. Red: "reads the border width, the body color, both backdrop surfaces, and the backdrop radius…" (the rendered reading) and "authors every case selector … with the custom properties it reads" (the `reads` table's declaration guard on the same row). The disabled-backdrop case stayed green. | exit 0, 18 passed |
| Height (D34) | `height` and `min-height` back to `calc(3.5rem + calc(var(--bs-border-width) * 2))` | Browser: exit 1, 1 failed, 17 passed. Red: "scales the height and every inset together…" only. | exit 0, 18 passed |

The backdrop plant also reddened the `reads` guard, which is the mechanism doing its job: that guard pins
which custom properties each selector reads, and the plant removed one. It is not harness breakage. The
rendered case is the one that proves the ancestor override reaches the backdrop.

After the last revert, `git diff 2c10329 -- src/styles/index.scss` shows only the validation move, and
the partial carries the D34 values and `var(--bs-secondary-bg)`.

## Ledger rows the gate printed

`npm run build:src && npm run test:conformance` printed these rows. Each category is `tokenized`, so the
deviation stop did not fire. Rows the ledger was missing (applied):

```text
form-floating | .form-floating > .form-control | height | — | calc(3.5rem + calc(var(--bs-border-width) * 2)) | calc(var(--vn-space-8) * 3.5 + var(--bs-border-width) * 2) | tokenized
form-floating | .form-floating > .form-control | min-height | — | calc(3.5rem + calc(var(--bs-border-width) * 2)) | calc(var(--vn-space-8) * 3.5 + var(--bs-border-width) * 2) | tokenized
form-floating | .form-floating > .form-control-plaintext | height | — | calc(3.5rem + calc(var(--bs-border-width) * 2)) | calc(var(--vn-space-8) * 3.5 + var(--bs-border-width) * 2) | tokenized
form-floating | .form-floating > .form-control-plaintext | min-height | — | calc(3.5rem + calc(var(--bs-border-width) * 2)) | calc(var(--vn-space-8) * 3.5 + var(--bs-border-width) * 2) | tokenized
form-floating | .form-floating > .form-select | height | — | calc(3.5rem + calc(var(--bs-border-width) * 2)) | calc(var(--vn-space-8) * 3.5 + var(--bs-border-width) * 2) | tokenized
form-floating | .form-floating > .form-select | min-height | — | calc(3.5rem + calc(var(--bs-border-width) * 2)) | calc(var(--vn-space-8) * 3.5 + var(--bs-border-width) * 2) | tokenized
form-floating | .form-floating > .form-control:focus | padding-top | — | 1.625rem | calc(var(--vn-space-8) * 1.625) | tokenized
form-floating | .form-floating > .form-control:not(:placeholder-shown) | padding-top | — | 1.625rem | calc(var(--vn-space-8) * 1.625) | tokenized
form-floating | .form-floating > .form-control-plaintext:focus | padding-top | — | 1.625rem | calc(var(--vn-space-8) * 1.625) | tokenized
form-floating | .form-floating > .form-control-plaintext:not(:placeholder-shown) | padding-top | — | 1.625rem | calc(var(--vn-space-8) * 1.625) | tokenized
form-floating | .form-floating > .form-control:-webkit-autofill | padding-top | — | 1.625rem | calc(var(--vn-space-8) * 1.625) | tokenized
form-floating | .form-floating > .form-control-plaintext:-webkit-autofill | padding-top | — | 1.625rem | calc(var(--vn-space-8) * 1.625) | tokenized
form-floating | .form-floating > .form-select | padding-top | — | 1.625rem | calc(var(--vn-space-8) * 1.625) | tokenized
```

The stale rows it named were the six `declared` height and min-height rows
(`calc(3.5rem + var(--bs-border-width) * 2)`), which were replaced. Each `padding-top` row sits directly
before its selector's `padding-bottom` row. After the rows landed, both ledger cases passed.

## Shipped key for the Set literal

`tests/setupServer.test.ts`, the shipped-key Set literal in "skips engine and CSS obligations whose Proof
cell is a dash", must gain `'form-floating'`. `npm run test:setup` reports exactly that failure:
`expected Set{ 'g', 'gx', 'gy', 'row-gap', …(44) } to deeply equal Set{ 'badge', 'blockquote', …(45) }`
with `+ "form-floating"`.

## Shared-file patches (report-only)

The barrel move makes one sentence false outside the owned guide sections. `### Validation classes`
says the partial loads "after the vertical rule". Patch (one line, same width, stays true after the
sibling forms partials land in the release's order):

```diff
@@ ### Validation classes
-The validation keys ship whole in their own partial after the vertical rule in the components
+The validation keys ship whole in their own partial after the forms partials in the components
 layer: the `.was-validated` scope, the `.is-valid` and `.is-invalid` classes, and the feedback and
```

The `ROADMAP.md` carrier row "The component-section sentences naming a barrel neighbour … go false as
siblings land" (B-PASSIVE-CLOSE) already covers this class. This change makes this sentence false at the
FLOATING landing, so the patch is for the Orchestrator's integration rather than for that later carrier.

## `ROADMAP.md` patch (report-only, finding 8 applied)

This patch supersedes the round-1 patch in `tmp/units/b-forms-floating-report.md` § `ROADMAP.md` patch.
It drops the floor row (D32 landed) and the D34 row (closed in this round). Each remaining row names one
carrier.

```diff
@@ ## Carriers table, appended rows
+| The floating select's `line-height: 1.25` has no resolved reading while `.form-select` keeps the native appearance | B-FORMS-SELECT reads it resolved once `.form-select` ships `appearance: none`. It owns the `toBe('normal')` assertion and its comment in `tests/src/styles/components/form-floating.test.ts` (the geometry case "makes the container the positioning box…") and the guide's select line-height sentence in § Form floating classes ("Chromium resets the line height of a select…") |
+| Floating text-control frames show bare user-agent controls (the `form-floating-empty`, `form-floating-filled`, `form-floating-textarea`, `form-floating-disabled`, `form-floating-plaintext`, and `form-floating-empty-focus` scenarios) | B-FORMS-CONTROL recaptures those scenarios over the styled `.form-control` and rewrites the guide's bare-controls sentence in § Form floating classes ("The control's own border, radius, and paint belong to…") |
+| The floating select frame shows a bare user-agent select (the `form-floating-select` scenario) | B-FORMS-SELECT recaptures `form-floating-select` over the styled `.form-select` |
+| The reduced-motion query literal `'(prefers-reduced-motion: reduce)'` is repeated across the style proofs: `form-range.test.ts` and `form-floating.test.ts` each declare a module `MOTION` constant, and the select, pagination, progress, icon-link, and spinner proofs write the literal inline | B-PASSIVE-CLOSE moves it to one shared test constant and routes every proof through it |
```

The select proof is B-FORMS-SELECT's and is not in this worktree. The other proofs were confirmed by
`grep -rln "prefers-reduced-motion: reduce" tests/src/styles/`, which returned `form-floating`,
`form-range`, `icon-link`, `pagination`, `progress`, and `spinner`.

## Bounded sweep

`grep -rn "3\.5rem\|1\.625rem\|this tree\|No script can" src/ tests/ guides/`, excluding
`tests/fixtures/oracle/inventory.json`. Remaining hits are permitted:

- the release values in the ledger's Bootstrap column and the guide's density bullet;
- `--vn-display-4: 3.5rem` in `_tokens.scss` and the display rows (a different key);
- the proof comments that name the release's `3.5rem`, `1rem`, and `1.625rem` as the factor-1 values;
- `tests/app/browser/Showcase.test.ts:147` "where this tree puts" (a different subject, outside scope).

No `No script can` hit remains.

## Gate table

| Command (from `/home/user/veneer-bff`) | Exit | Reading |
| --- | --- | --- |
| `npx oxfmt --check` over the six owned files | 0 | All matched files use the correct format |
| `npx oxlint tests/src/styles/components/form-floating.test.ts tests/conformance.test.ts tests/setupStyles.ts` | 0 | Clean. A first run flagged `array-type` on the density table's annotation, which was fixed to `ReadonlyArray<readonly [Element, string]>`. |
| `npm run check` | 0 | — |
| `npm run build:src` | 0 | The built cascade carries `height:calc(var(--vn-space-8) * 3.5 + var(--bs-border-width) * 2)` and `padding-top:calc(var(--vn-space-8) * 1.625)` |
| `npm run test:setup` | 1 | 1 failed, 184 passed (185). The failure is the Set literal (`form-floating`) only. |
| `npm run test:conformance` | 1 | 1 failed, 17 passed (18). The failure is the standing presence reading (`Shipped component form-floating is missing selector .input-group > .form-floating`). The order case and both ledger cases are green. |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-floating.test.ts` | 0 | 18 passed (18) |
| `npm run test:guides` | 0 | 18 passed (18) |
| `npm run test:src:styles` (observation) | 0 | 71 files, 652 passed |
| `npm run test:policy` (observation) | 0 | 109 passed, 1 skipped (110) |
| `npm run test:journey` (observation) | 0 | 4 files, 132 passed. Load average 4.29 at the start. |
| `CAPTURE=1 npm run test:journey -- --project 'journey:<variant>*'` for `light-1280`, `dark-1280`, `light-390`, and `dark-390` (observation) | 0 each | 33 passed each. The `form-floating-*` frames and accessibility records under `tmp/capture/states/` were rewritten between 04:02 and 04:09. |

## Status and diff

`git status --short` lists the same paths as the audited tree (the FLOATING writes and FLOOR's
`tests/setupServer.ts` and `tests/setupServer.test.ts`); this round added no path. Diffstat of the owned
files against `2c10329` (round 1 and round 2 together):

```text
 guides/veneer.md                                  | 267 +++++++---
 src/styles/components/_form-floating.scss         | 133 +++++
 src/styles/index.scss                             |   3 +-
 tests/conformance.test.ts                         |  37 ++
 tests/setupStyles.ts                              | 162 ++++++
 tests/src/styles/components/form-floating.test.ts | 570 ++++++++++++++++++++++
```

The plant instrument is `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bff2/plant.py`
with its driver `run-plant.sh`, outside the subject tree. Copy them into retention if the record needs
the exact instrument.

## Claims flagged unverified

- **Frames under D34 at factor 1.** The capture runs passed and rewrote the frames. A pixel comparison
  against the round-1 frames was not taken. The resolved lengths at factor 1 are unchanged (the proof
  reads 58px, 26px, and 16px), so no geometry change is expected.
- **The density claim beyond factor 2.** The proof reads factor 1 and factor 2. The guide states the
  content-box property at a factor of 2 only.
- **Attribution after GROUP lands.** The guide sentence that the ledger files a selector naming both
  classes under this key rests on the analyst's `attributeSelector` reading (claim 5), not on a GROUP
  departure measured here.
- **Order after integration.** The order case accepts any subsequence of the release order. The
  sibling partials' barrel lines (`form-control`, `form-select`, `form-check`, `input-group`) were not
  in this worktree, so the integrated order is unmeasured here.
