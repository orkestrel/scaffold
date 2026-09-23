# Unit B-FORMS-GROUP, round 2 — report

Executor: `opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bfg`,
baseline `2c10329` with the round-1 writes uncommitted. Brief: `tmp/units/b-forms-group-brief-3.md`,
the successor to `tmp/units/b-forms-group-brief-2.md` and `tmp/units/b-forms-group-brief.md`. This
report supersedes `tmp/units/b-forms-group-report.md` for the rows it restates. Nothing committed.

## Outcome

Every carried finding is closed in the owned files. The size pair is one `@each`, and the compile is
byte-identical across that change. N2 binds tokens per property and reddens under the finding-1
plant. The size and floating matrices live in `tests/setupStyles.ts`. The focus scenario drives the
`Input group button` specimen, and the `light-1280` frame shows the ring over the button's leading
border. Two reds remain, both in files this unit may not edit, each with its patch in § Patches:

- `tests/setupServer.test.ts`: the shipped-key Set literal (the `test:setup` red).
- `tests/src/styles/components/validation.test.ts`: the `'5'` patch (the `test:src:styles` red).

Deviation state: no stop. The following ancillary decisions were taken under the deviation contract:

- **The size list is a list of tuples, not a Sass map.** A Sass map in an `@each` binds only its key
  and its value. The `$engines` list in `_form-range.scss` is a list of tuples destructured by
  `@each`, and `$sizes` takes that form.
- **The sized-select `padding-right` rule stays a single grouped rule after the loop.** Finding 4
  says "in the `@each` block". Inside the loop body the rule would be written one time per size and
  interleaved between the size rules. That changes the release's rule order and breaks the
  byte-identical comparison criterion 1 requires. Both sizes share one value, so one rule carries
  the D33 value.
- **The tooltip sentence says "below the group", not "below the control".** The tooltip's containing
  block is the group, which carries `position: relative`. Inside a `has-validation` group the group
  also spans the wrapped feedback line, so `top: 100%` places the tooltip below that line. O2 reads
  this placement, as the following section records.
- **The journey reads the resting overlap from the button's own border width.** In the app the
  grouped control's trailing border measures `2px`, and the button's border and pull-back measure
  `1px`. The measurement is in § D29 frame reading.

## Carried findings and the sites they changed

1. **Claim 3: N2 binds tokens per property.**
   - `tests/setupStyles.ts` gains the `InputGroupCase` interface. Its `reads` field is
     `Readonly<Record<string, readonly string[]>>`, keyed by CSS property.
   - `INPUT_GROUP_CASES` names each property's references. A property the row omits is a claim that
     its declaration writes no `var()`.
   - The N2 case in `tests/setupStyles.test.ts` is `input group case tables > writes each recorded
     input-group rule as often as the release records it, each declaration reading the tokens its row
     names for that property`. It collects each property's `var(--…)` names across every rule the
     selector heads. It compares the properties that read a custom property with the row by
     `toEqual`, with the selector named in the compared object.
   - This comparison subsumes the old `untokenized` list. An empty row holds its rule to no `var()`.
2. **Claim 8, D30: the size pair takes one `@each`.** `src/styles/components/_input-group.scss`
   declares the `$sizes` list with `('lg', …)` before `('sm', …)`, the release's order. One
   `@each $size, $padding, $font in $sizes` writes the four child selectors, with `padding`,
   `font-size`, and `border-radius: var(--bs-border-radius-#{$size})`. The compile comparison
   follows.
3. **Claim 8: the inline matrices.** `tests/setupStyles.ts` gains the following frozen tables:
   - `INPUT_GROUP_SIZE_CASES`: `size`, `block`, `inline`, `font`, and `radius`, named as in
     `PAGINATION_SIZE_CASES`.
   - `INPUT_GROUP_FLOATING_CASES`: `group`, `markup`, and a frozen `corners` array.

   Every row and every table is frozen. The N3 block in `tests/setupStyles.test.ts` adds both names
   to the export literal and to the import list. It also adds freeze rows for both tables, a freeze
   row for each property's reference list in `INPUT_GROUP_CASES`, and a one-wrapper-per-row and
   four-corner check on the floating table. `tests/src/styles/components/input-group.test.ts`
   imports both tables. The sizes case and the validation-mark case both iterate
   `INPUT_GROUP_SIZE_CASES`, and the floating case mounts `INPUT_GROUP_FLOATING_CASES`. No case
   matrix stays inline.
4. **D33: the sized select's end padding.** The grouped rule writes
   `padding-right: calc(var(--vn-space-6) * 4)`. The N2 rows read
   `'padding-right': ['--vn-space-6']`. `npm run build:src && npm run test:conformance` printed a
   changed Veneer-value cell and kept the category, so both `input-group` ledger rows in
   `guides/veneer.md` § Tokens › § Departures read `calc(var(--vn-space-6) * 4)` and stay
   `tokenized`. The `### Input group classes` departure bullet states the multiple. The browser
   reading stays `48` px.
5. **Claim 6: the tooltip sentence.** The following sites changed:
   - The comment at the overlap rule in `_input-group.scss` and the guide sentence in
     `### Input group classes` say that feedback wraps onto its own line below the row, and
     that a tooltip is positioned absolutely below the group (`position: absolute; top: 100%`) and
     takes no part in the wrap.
   - O2 (`input group overlap > leaves the {valid,invalid} feedback and tooltip in place …`)
     reads the tooltip's `position` as `absolute`, and the group's bottom edge equal to the
     feedback's. It also reads the tooltip's top as the group's bottom plus the tooltip's
     `margin-top`.
   - The guide's proof paragraph names the tooltip below the group.
6. **D29: the focus scenario drives the grouped button.** The following sites changed:
   - `tests/setup.ts`: `INPUT_GROUP_KEYS` holds
     `{ scenario: 'input-group-button-focus', subject: 'Input group button' }`. Its remarks state
     that the lift puts the focused control's ring over the grouped button, which rests at
     `z-index: 2`. They also state that the addon is static and already sits under the positioned
     control at rest.
   - `tests/app/browser/integration.test.ts`: the case is retitled `reaches the input group control
     beside a button through the keyboard and lifts it over the button`. At rest it reads the
     control at `auto`, the button at `2`, and the button pulled back over the control by the
     button's border width. It reaches the `Dispatch address` control through `traverseAccessible`
     and reads `z-index` `'5'`. It photographs the page frame `input-group-button-focus` over the
     specimen. After the shot it reads focus `true`, `z-index` `'5'`, and the button still at `'2'`.
   - `guides/veneer.md`: the focus sentence states the same claim.
   - `_input-group.scss`: the focus-lift comment states the same claim.
   - The stale `input-group-plain-focus--*` frames were deleted. The capture runs wrote
     `input-group-button-focus--{light-1280,dark-1280,light-390,dark-390}.png`.
   - `tests/setup.test.ts` names no scenario, so it is unchanged.
7. **D31, R3: the rounding fixture's TSDoc.** The `INPUT_GROUP_ROUNDING` remarks read in the present
   tense: the text control and select classes carry no radius of their own in this cascade, so the
   fixture supplies one. The remarks do not narrate landing order.
8. **Report corrections.** § Corrected narrative carries them. § Patches carries the ROADMAP patch.

## Compile comparison (finding 2)

The comparison ran from `/home/user/veneer-bfg`:

| Step | Command | Exit |
| --- | --- | --- |
| Before the `@each` change | `npx --no-install sass --no-source-map src/styles/components/_input-group.scss > tmp/probe/before.css` | 0 (2939 bytes) |
| After the `@each` change alone | `npx --no-install sass --no-source-map src/styles/components/_input-group.scss > tmp/probe/after.css` | 0 |
| Comparison | `cmp tmp/probe/before.css tmp/probe/after.css` | 0 |
| Control: the same partial with `sm` listed before `lg` (`tmp/probe/_control.scss`) | `cmp tmp/probe/before.css tmp/probe/control.css` | 1 (`differ: char 1065, line 43`) |
| D33 applied afterwards | `diff tmp/probe/after.css tmp/probe/d33.css` | 1, one line: `padding-right: var(--vn-space-24)` became `padding-right: calc(var(--vn-space-6) * 4)` |

`tmp/probe/` is removed.

## Plant table

Each plant was applied by an exact string replacement in `src/styles/components/_input-group.scss`.
The instrument then ran its commands and applied the exact reverse replacement, and it asserted the
file byte-identical to its pre-plant text. The instruments are in the session scratchpad:
`bfg/plant.py`, `bfg/plant-message.py`, and `bfg/plant-room.py`. The old selector-level N2 reading is
reproduced in `bfg/selector-reads.test.ts`, which the plants ran from `tmp/probe/` in the `probe`
project.

| Plant | Reddens | Stays green | Exact revert |
| --- | --- | --- | --- |
| None (negative control) | `npm run test:setup`: 1 failed (the Set literal only), 184 passed | N1 to N3 (3 passed); old selector reading; browser proof 19 of 19 | — |
| Finding 1: addon `padding: var(--vn-space-3) var(--vn-space-6);` → `padding: 0;` plus `--audit-unused: var(--vn-space-3) var(--vn-space-6);` | N2, at its per-property `toEqual` (around `tests/setupStyles.test.ts` line 2286): `"padding"` missing and `"--audit-unused"` present. `npm run test:setup`: 2 failed (N2 and the Set literal), 183 passed. Browser: A1 (`paints the addon from the compatibility variables …`) and A2 (`rescales the addon with the density and radius factors …`), 2 failed and 17 passed | The old selector reading passed, which reproduces the finding. The count assertion inside N2 passed, because execution reached the per-property assertion after it. The brief expected the count assertion to redden, and it does not, because the plant changes no rule count | reverse replacement; byte-identical asserted |
| Tooltip joins the row: inserts `.input-group > .invalid-tooltip { position: static; }` before the toolbar rule | O2 invalid (`leaves the invalid feedback and tooltip in place …`), 1 failed and 18 passed | N1 to N3; `test:setup` at the Set literal alone | reverse replacement; byte-identical asserted |
| D33 reverted: `calc(var(--vn-space-6) * 4)` → `var(--vn-space-24)` | N2 (the `padding-right` rows); `npm run test:conformance`: 2 failed (unrecorded and stale ledger rows naming the two values) | — | reverse replacement; byte-identical asserted |

Failing-first proof for finding 1, using the criterion's command `npm run test:setup`:

- Under the plant: exit 1, 2 failed and 183 passed. The failures are N2 and the standing Set literal.
- After the exact revert: exit 1, 1 failed and 184 passed. The one failure is the Set literal.

## D29 frame reading

The `light-1280` capture record (`tmp/capture/light-1280.txt`) gives the frame
`input-group-button-focus--light-1280.png`: 1280 by 14236 px, declared region `x 0`,
`y 14057.453125`, `width 1280`, `height 35`. The frame was read at the page frame's own scale in a 1:1
crop of that region, and in a 6× crop of the seam. The crops were made with the scratchpad
instruments `bfg/crop.cjs` (`pngjs`) and `bfg/pixels.cjs`.

The focused `Dispatch address` control wears a dark focus ring on all four sides, and the ring runs
through the seam over the button's leading border. The following pixel rows are the same seam at
rest and at focus:

| Frame | Row | x 1192 | x 1193 |
| --- | --- | --- | --- |
| `input-group-button--light-1280.png` (rest) | 17 | `118,118,118` (the control's border) | `69,85,108` (the button's border, over the control's) |
| `input-group-button-focus--light-1280.png` (focus) | 14075 | `16,16,16` (the ring) | `16,16,16` (the ring, over the button's border) |

At rest the button's slate border paints the seam column. At focus the ring paints both columns.
The frame therefore shows the ring over the grouped button, and D29 holds at `light-1280`. The
journey's artifact reads `{"reading":"input group focus","mode":"light-1280","name":"Dispatch
address","framed":true,"lifted":"5","outline":"auto"}`.

A measurement behind the rest reading: in the app the grouped control's `border-right-width` is
`2px`, and the button's `border-left-width` and `margin-left` are `1px` and `-1px`. The control
spans x 0 to 1193.5 and the button starts at 1192.5.

## Corrected narrative (finding 8)

- **The sibling exclusion selector's attribution.** The overlap rule
  `.input-group > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback)`
  attributes to `input-group`. `collectSelectorClasses` excludes the classes inside a functional
  argument such as `:not()`, so the feedback and tooltip classes do not attribute it. The ledger
  tables already follow that attribution: the rule records `margin-left` reading
  `--bs-border-width` under `input-group` and no departure. Round 1 said the rule attributes to
  `invalid-feedback`, and that was wrong.
- **The "reaches the feedback" plant row.** The round-1 plant dropped `:not(.invalid-tooltip)` from
  the sibling rule, so it reached the tooltip. O2 invalid reddened on the tooltip's squared leading
  corners. That row names the tooltip, not the feedback.
- **The later-partial observation.** A button nested in a `.btn-group` inside an input group takes
  `.btn-group > .btn:focus` from `_button-group.scss`, which loads later in the barrel. That rule
  overrides `.input-group .btn:focus`, as the release does (`bootstrap.css:3707`). Round 1's "none"
  was wrong. The override is the release's own behaviour, and this unit changes no code for it. The
  analyst measured this, and I did not re-run it.
- **The ROADMAP carriers.** The patch in § Patches names B-FORMS-CLOSE for the tooltip specimens,
  B-FORMS-CONTROL for `INPUT_GROUP_ROUNDING` and the consumer-radius sentence, and B-PASSIVE-CLOSE
  for the repeated size pairs.

## Touched files

The following files changed in this round:

- `src/styles/components/_input-group.scss`: the `$sizes` list and one `@each` for the size pair; the
  D33 value; the focus-lift and overlap comments restated.
- `tests/setupStyles.ts`: the `InputGroupCase` interface, the per-property `INPUT_GROUP_CASES`,
  `INPUT_GROUP_SIZE_CASES`, and `INPUT_GROUP_FLOATING_CASES`; the `INPUT_GROUP_ROUNDING` remarks
  restated in the present tense.
- `tests/setupStyles.test.ts`: the per-property N2; the N3 export literal, imports, and freeze rows.
- `tests/src/styles/components/input-group.test.ts`: imports the two tables; drops the inline
  matrices; adds the tooltip placement readings to O2.
- `tests/setup.ts`: `INPUT_GROUP_KEYS` names `input-group-button-focus` over `Input group button`;
  the remarks are restated.
- `tests/app/browser/integration.test.ts`: the focus journey case drives the `Input group button`
  specimen and is retitled.
- `guides/veneer.md`: the tooltip sentence, the indicator-room bullet, the proof paragraph, and the
  focus sentence in `### Input group classes`; the two `padding-right` ledger rows.
- `tmp/capture/states/`: the four `input-group-plain-focus--*` frames were deleted, and the four
  capture runs wrote the `input-group-button-focus--*` frames and refreshed the other frames.
- `tmp/units/b-forms-group-report-3.md`: this report.

Diffstat of the owned tracked files against `2c10329`, round 1 included (`git diff --stat 2c10329 --
<owned files>`, after `git add -N` on the two added owned files for diff evidence):
`7 files changed, 1407 insertions(+), 174 deletions(-)`. The per-file counts are `guides/veneer.md`
475, `_input-group.scss` 127, `integration.test.ts` 52, `setup.ts` 63, `setupStyles.test.ts` 139,
`setupStyles.ts` 214, and `input-group.test.ts` 511. The 174 deletions are round 1's table
realignments in the guide.

A word-boundary search for `input-group-plain-focus` and `space-24` over `tests/`, `src/`, and
`guides/` (excluding `tests/fixtures/oracle`) returns only the token declaration
(`src/styles/_tokens.scss`), the registry (`src/core/constants.ts`), and the guide's scale-token rows.
None of those is this unit's.

## Gate table

All commands ran from `/home/user/veneer-bfg` on the final tree, with the brief's `PATH` and
`PLAYWRIGHT_BROWSERS_PATH`.

| Command | Exit | Reading |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check` over the seven owned files | 0 | all formatted |
| `npx oxlint --config .oxlintrc.json --deny-warnings` over the five owned TypeScript files | 0 | — |
| `npm run check` | 0 | — |
| `npm run format:check` (read-only observation) | 0 | 266 files |
| `npm run lint:check` (read-only observation) | 0 | — |
| `npm run build:src` | 0 | — |
| `npm run test:conformance` | 0 | 17 passed |
| `npm run test:setup` | 1 | 1 failed, 184 passed. The failure is the Set literal case in `tests/setupServer.test.ts` (report-only). |
| The Set literal patch, applied to a copy (`tmp/probe/shipped.test.ts`, `probe` project, `-t 'skips engine and CSS obligations'`) | 0 | 1 passed |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/input-group.test.ts` | 0 | 19 passed |
| `npm run test:app` | 0 | 55 passed, 23 files |
| `npm run test:guides` | 0 | 18 passed |
| `CAPTURE=1 npm run test:journey -- --project 'journey:light-1280*'` | 0 | 33 passed. The first run failed on the journey's rest overlap reading; see § D29 frame reading. |
| `CAPTURE=1 npm run test:journey -- --project 'journey:dark-1280*'` | 0 | 33 passed |
| `CAPTURE=1 npm run test:journey -- --project 'journey:light-390*'` | 0 | 33 passed |
| `CAPTURE=1 npm run test:journey -- --project 'journey:dark-390*'` | 0 | 33 passed |
| `npm run test:src:styles` (observation) | 1 | 1 failed, 652 passed, 71 files. The failure is `validation.test.ts > validation classes > stacks a failing input-group child above a passing one`, the standing red that the `validation.test.ts` patch closes. |
| `npm run test:journey` (observation) | 0 | 132 passed, 4 files |

`tmp/capture/states/` holds `input-group-button-focus--{light-1280,dark-1280,light-390,dark-390}.png`
and no `input-group-plain-focus--*` file.

## Patches

### `tests/setupServer.test.ts` (the shipped-key Set literal; yours)

This patch makes the probe copy green:

```diff
@@ it('skips engine and CSS obligations whose Proof cell is a dash'
 				'initialism',
+				'input-group',
+				'invalid-feedback',
+				'invalid-tooltip',
 				'is-invalid',
@@
 				'table',
+				'valid-feedback',
+				'valid-tooltip',
 				'vr',
```

### `tests/src/styles/components/validation.test.ts` (off-limits; unchanged from round 1)

```diff
@@ it('stacks a failing input-group child above a passing one'
 		expect(readStyle(requireValue(failing, 'No failing child'), 'z-index')).toBe('4')
-		// The release lifts a child only while it is out of focus, so a rule dropping the guard
-		// would keep the focused child under its neighbour.
+		// The release lifts a child by its state only while it is out of focus, and the group's own
+		// focus rule lifts the focused child above both state steps; a rule dropping the guard would
+		// hold the focused child at its state step instead.
 		expect(readStyle(requireValue(quiet, 'No quiet child'), 'z-index')).toBe('auto')
 		requireValue(passing, 'No passing child').focus()
-		expect(readStyle(requireValue(passing, 'No passing child'), 'z-index')).toBe('auto')
+		expect(readStyle(requireValue(passing, 'No passing child'), 'z-index')).toBe('5')
```

### `app/browser/constants.ts` (off-limits; a remark D29 makes false)

The `INPUT_GROUP_SPECIMENS` remarks say that the journey reaches the plain group's control. After
D29 the journey reaches the `Input group button` specimen's control. Run `oxfmt` on the file after
applying this patch:

```diff
@@ export const INPUT_GROUP_SPECIMENS
- * Every control announces a name of its own, because the journey reaches the plain group's control
- * by name through keyboard traversal and a shared name would resolve to either control. The large
+ * Every control announces a name of its own, because the journey reaches the control beside the
+ * grouped button by name through keyboard traversal and a shared name would resolve to either
+ * control. The large
```

### `guides/veneer.md` (outside this round's anchors; unchanged from round 1)

The round-1 D4 patch still stands: the `### Button toolbar classes` sentence and the `btn-toolbar`
compatibility row still name `.btn-toolbar .input-group` as withheld. The diff is in
`tmp/units/b-forms-group-report.md` § Patches.

### `ROADMAP.md`

`GROUP_COMMIT` is a placeholder for the landing commit's short hash.

```diff
@@ | B-FORMS |
-… VALIDATION landed as `d4f78e5` and RANGE as `376255a` (each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`, RANGE's fix rounds by `analyst`); GROUP is next …
+… VALIDATION landed as `d4f78e5`, RANGE as `376255a`, and GROUP as `GROUP_COMMIT` (each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`, RANGE's fix rounds by `analyst` and GROUP's by `opus` on Opus 5.5); GROUP loads `_input-group.scss` before `_validation.scss`, the release's order; CHECK is next …
@@ carrier table
-| Validation tooltip specimens | B-FORMS-GROUP adds `Valid tooltip` and `Invalid tooltip` inside the positioned `.input-group` ancestor and registers their scenarios |
+| Validation tooltip specimens: `valid-tooltip` and `invalid-tooltip` ship from B-FORMS-GROUP with no rendered specimen (D6, D31) | B-FORMS-CLOSE adds `Input group valid tooltip` and `Input group invalid tooltip` as resting element frames over a wrapper that keeps the tooltip's overflow room beneath the group, and registers their scenarios |
+| `INPUT_GROUP_ROUNDING` in `tests/setupStyles.ts` and the `### Input group classes` sentence on the consumer radius hold while the text control and select classes carry no radius (D31) | B-FORMS-CONTROL retires the fixture and the sentence when the control and select classes ship their own radius |
+| `_button.scss`, `_pagination.scss`, and `_placeholder.scss` still repeat a size pair that D30 gives one `@each` | B-PASSIVE-CLOSE drives each pair with one `@each` over a list, the compile proved byte-identical before and after |
+| The `### Button toolbar classes` sentence and the `btn-toolbar` compatibility row still name `.btn-toolbar .input-group` as withheld | the Orchestrator applies B-FORMS-GROUP's guide patch at its landing |
+| The barrel places `form-range` after `validation`, where the release loads the range control first; no equal-specificity conflict is measured between them | B-FORMS-CLOSE orders the forms barrel lines to `_forms.scss` |
```

## Observations

- D31 hands the sized select's indicator room to B-FORMS-SELECT's audit claims. After D33 the room
  reads `calc(var(--vn-space-6) * 4)` and rescales with `--vn-factor-density`. The release's `3rem`
  is the select's padding-x plus its indicator padding.
- The `it.each` titles over the object tables render the size as `'lg'` and `'sm'` with quotes, the
  same form round 1's sizes case used. The validation-mark case, which round 1 titled with `%s`,
  takes the same form in this round.
- `git status --short` shows `A` for the two added owned files, because of the `git add -N` run for
  diff evidence. The two added app files remain `??`.

## Claims flagged unverified

- I read the ring-over-button pixels in the `light-1280` frame only. The `dark-1280`, `light-390`,
  and `dark-390` focus frames were written by exit-0 runs, and I did not view them.
- The `.btn-group > .btn:focus` override on a nested button is the analyst's measurement. I did not
  re-run it.
- The `validation.test.ts` patch is unchanged from round 1. The audit confirmed it (claim 7). I did
  not re-run it here, because the file is off-limits.
- The `app/browser/constants.ts` patch is unrun.
