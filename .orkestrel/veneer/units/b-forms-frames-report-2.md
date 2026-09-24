# Unit FORMS-FRAMES (`fr` unit), round 2 report

The `opus` role on Opus 5.5 ran this round as a native subagent in the `/home/user/veneer-fr` worktree, on the
`unit/fr` branch over the `e4a6d7c` baseline, with the round-1 changes uncommitted in place. Nothing is
committed. Every evidence file this report names sits in the `/home/user/veneer-fr/tmp/units/` directory.

## Outcome

- Every finding the audit verdict gives this unit is closed in the round-2 tree: claim 5, claim 7, claim
  9, G1 and F1, F3, and F4.
- Every remaining critic state has a specimen row or a driven case with its frames. The exception is a range that is focused and disabled, which Chromium cannot reach; the guide patch records the
  reading.
- The acceptance criteria hold:
  - The validation proof reddens on its added-row negative control.
  - The plaintext keys tell each size from its base.
  - The unfiltered journey runs under the validated-select mutation and the pressed-check mutation are
    retained.
- The Orchestrator's mid-campaign gate decision binds this round:
  - I stopped an unfiltered `dark-390` capture run it overtook, with a kill list read down from its process
    id.
  - I replaced that run with a filtered capture run over this unit's cases.
  - The unfiltered `light-1280` capture run, which the decision did not stop, is this round's acceptance
    reading at that variant.

## Findings and the changes that close them

### Claim 5, the resting keys

- **Plaintext keys.** The `form-control-plaintext-small` and `form-control-plaintext-large` rows in the
  `tests/setup.ts` file read the `min-height` property, which the size rule writes and the base plaintext
  rule does not.
  - Probe reading (`fr2-plaintext-keys.log.txt`): `min-height` values `0px`, `31px`, and `48px` for the base,
    small, and large plaintext controls.
  - The `padding-left` property that the round-1 rows read gives `0px` for the base and each size, so it could not
    tell a size from its base.
- **Validation proof.** The `ValidationSection.test.ts` proof holds every rendered specimen against its
  row in the `VALIDATION_HOST_CASES` table in the `tests/setupStyles.ts` file.
  - Each row keys the specimen's name to its control's tag, `type` property, and classes.
  - Each row also names the class of the element holding the control and the class of the feedback inside
    that holder.
  - The scoped-form reading takes its population and its expectations from the same table.
- **Negative control.** In the scratch copy, adding the objective lane's escaping row (`Valid additional
  control`) to the validation specimen table, with no host-table row, reddens the proof. The
  `fr-mutations-2.log.txt` log records the run: `Tests  1 failed | 1 passed (2)`, with the failing case
  `renders a passing and a failing specimen for every host the state reaches` and the reason
  `expected [ …(19) ] to strictly equal [ …(18) ]`.

### Claim 7, the mutations

- **Hairline-only P10 run.** Putting the body surface back in the hairline and selecting the hairline case
  alone gives `Tests  1 failed | 7 skipped (8)`. The failing case is `paints the focused thumb hairline white in
  the light and the dark mode, as the release compiles it`.
- **Whole-file P10 run.** The same mutation over the whole range proof gives `Tests  3 failed | 5 passed (8)`,
  and each failing case is named:
  - `clears the control outline under keyboard focus and leaves the ring to the thumb`: its assertion names
    the declared hairline token.
  - The hairline case.
  - `keeps the WebKit part rules in the cascade and reports the host style for a part pseudo`: it reads the
    `FORM_RANGE_CASES` table's token rows.

  This report does not claim that the P10 mutation reddens one case.
- **Unfiltered journey under the validated-select mutation.** Removing the ring from the select's state
  focus rule reddens the `rings each validated select and check under keyboard focus in its state color on
  the lifted specimen, and holds the ring inside the frame` case alone: `Tests  1 failed | 53 passed (54)`.
  - The text-control validation ring case stays green, because the text control's ring comes from the
    `.form-control.is-*:focus` rule, which is separate.
- **Unfiltered journey under the pressed-check mutation.** Removing the filter from the
  `.form-check-input:active` rule reddens the `holds each pressed form control on its lifted specimen and
  photographs the paint its press rule writes` case alone: `Tests  1 failed | 53 passed (54)`.
  - Its assertion names the `form-check-box-active` scenario and the `form-check-radios-active` scenario, and
    leaves the `range-active` scenario green.

### Claim 9, the law and the report

- **Validation class matrix.** The literal class matrix in the validation proof is gone. The keyed host
  table in the `tests/setupStyles.ts` file carries every class the proof reads.
- **Hairline gauges.** The form range proof builds its gauges from the `FORM_RANGE_HAIRLINE_CASES` table in
  the same setup file. Each row names a color mode and the value the release compiles for that mode.
- **Export list.** The `tests/setupStyles.test.ts` file's export list names the `VALIDATION_HOST_CASES` table and the `FORM_RANGE_HAIRLINE_CASES` table. That edit is the
  consequence of the added exports; the brief did not list that file.
- **Gate commands.** Each gate log opens with its command line and closes with its exit line, and this
  report quotes each command with every argument.

### G1 and F1, the grouped floating label

- The `Input group floating` specimen keeps its empty control, so its label rests over the control in the
  resting frame.
- The table TSDoc, the section comment, and the guide patch describe that resting label, and each says
  that focus floats it.

### F3, the prose

- **"lifted copy".** The guide patch writes "lifted specimen" where the round-1 patch wrote "lifted copy".
- **File hover.** The guide patch says the journey reads the button part's computed surface.
- **Pressed case title.** The title reads `holds each pressed form control on its lifted specimen and
  photographs the paint its press rule writes`.
- **Pressed-state sentence.** The patch sentence reads "the checkbox and the unchecked radio held under the
  pointer".

### F4, the validated check

- The validated check specimens render inside a row carrying the `.form-check` class.
- In the `valid-check-focus` and `invalid-check-focus` frames at the `light-1280` and `dark-390` variants, the
  ring clears the label.
- The host table's `holder` field pins the `.form-check` row for each check.

## Added states

Frames are at `tmp/capture/states/<scenario>--<variant>.png`. Every frame named here was written at the
`light-1280` variant by the unfiltered capture run and at the `dark-390` variant by the filtered capture run.

### Driven states

- **Grouped floating wrapper under focus.** The `input-group-floating-focus` scenario on the `Input group
  floating` specimen.
  - The specimen sits the wrapper between an addon and the `Verify handle` button.
  - Case: `lifts the grouped select and the grouped floating wrapper under keyboard focus over the button
    beside each on the lifted specimen, and holds the ring inside the frame`.
  - Population: the driven focus rows whose subject is an input group specimen holding a select or a floating
    wrapper.
  - Reading: `z-index` values `auto` and `2` at rest for the child and the button, and `5` and `2` under
    focus, as the `grouped lift` artifact entry records.
  - The ring stays inside the frame.
- **Grouped select under focus.** The `input-group-select-focus` scenario on the `Input group select`
  specimen, which ends with the `Reserve stock` button. Same case and reading.
- **Pressed radio.** The `form-check-radios-active` scenario on the `Form check radios` specimen.
  - The pressed-control case derives this row from the `-active` suffix and presses the unchecked `Ship by
    post` radio.
  - Light-1280 centre readings: `rgb(237, 245, 255)` focused and `rgb(216, 224, 233)` held.
- **Plaintext focus.** The `form-control-plaintext-focus` scenario on the `Form control plaintext`
  specimen.
  - Case: `focuses each plaintext control on its lifted specimen with no ring, and photographs the focused
    control`.
  - Population: the driven focus rows whose subject renders a plaintext control.
  - The case releases the pointer and reaches the control by Tab from the padded wrapper, which is the route
    FOCUS-FRAME's evidence names for the outline the user agent paints.
  - Reading: the `outline-style` value `none` and the `box-shadow` value `none`.
  - In the probe reading, a bare readonly control reached the same way reads the `outline-style` value
    `auto` (`fr2-probe-readings.log.txt`).
- **Empty floating plaintext under focus.** The `form-floating-empty-plaintext-focus` scenario on the
  added `Form floating empty plaintext` specimen. Same case.
  - The text moves to the floated inset under focus: `padding-top` values `16px` at rest and `26px` focused, in
    the probe reading (`fr2-probe-readings.log.txt`).
  - The case asserts that the inset moves exactly for the controls that show their placeholder.

### Resting states

- **`Form floating empty plaintext` specimen.** Selector `.form-floating >
  .form-control-plaintext:placeholder-shown`, `padding-top` property.
- **`Input group select large` and `Input group select small` specimens.** Selectors `.input-group-lg >
  .form-select` and `.input-group-sm > .form-select`, `padding-right` property.
  - The section proof reads `48px` for each sized select. The plain grouped select reads another value.
- **`Input group toolbar` specimen.** Selector `.btn-toolbar .input-group`, `width` property.
  - The section proof reads the group narrower than the toolbar, on the button group's row.
- **`Valid multiple select` and `Invalid multiple select` specimens.** Selectors
  `.form-select.is-valid[multiple]` and `.form-select.is-invalid[multiple]`, `padding-right` property.
  - The host table pins each `select-multiple` type.
- **Squared corners.** The grouped select and the grouped floating control each end with a button. The
  section case `squares both inline corners of a grouped select and floating control, keeps the sized select
  room, and sets a toolbar group beside its buttons` reads every corner radius at `0` on each control.

### Unreachable state

A range that is focused and disabled has no reachable state in Chromium. Probe readings:

- A disabled range refuses the `focus()` call: the active element stays elsewhere.
- Disabling a focused range leaves the `document.activeElement` property off the range, and the range matches
  no `:focus` state.
- Its centre pixel reads the disabled paint, `70,76,92`.

The readings are transcribed in the `fr2-probe-readings.log.txt` log, and the guide patch records the
limit in § Form range classes.

## Runs that go red without the change

The test-side changes landed ahead of the specimens.

- **Section proofs.**
  - Command: `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser
    tests/app/browser/sections/FormFloatingSection.test.ts tests/app/browser/sections/InputGroupSection.test.ts
    tests/app/browser/sections/ValidationSection.test.ts`
  - Without the specimens: exit 1, `Tests  4 failed | 4 passed (8)` (`fr2-sections-red.log.txt`).
  - With the specimens, the same files plus the `FormControlSection.test.ts` file and the
    `Showcase.test.ts` file: exit 0, `Tests  14 passed (14)` (`fr2-sections-green.log.txt`).
- **Journey.**
  - Command: `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose
    --project "journey:light-1280*"`
  - Result: exit 1, `Tests  7 failed | 47 passed (54)` (`fr2-journey-red.log.txt`).
  - The grouped-lift case failed on a missing grouped button, and the resting-key and portfolio cases failed on
    missing specimens.
  - The plaintext case failed on a name collision: the `Form control plaintext` specimen and the `Form floating
    plaintext` specimen each announced the `Account email` name. The plaintext form's `aria-label` attribute
    reads `Reader email` in the round-2 tree.

## Mutation log

The `fr-mutations-2.log.txt` log records each mutated site, the command, the build and test exits, the
summary line, every failing case, and the reason. Every mutation ran in a scratch copy of the worktree with a
hard-linked `node_modules` directory and the `fr-shared-2.patch` file applied. The copy is deleted, and each
run's output file is named in the log.

| Mutation | Command scope | Summary line | Cases that redden |
| --- | --- | --- | --- |
| P10 hairline on the body surface | range proof, `-t "hairline"` filter | `Tests  1 failed \| 7 skipped (8)` | the hairline case |
| P10 hairline on the body surface | whole range proof | `Tests  3 failed \| 5 passed (8)` | the outline case, the hairline case, the kept-rule case |
| Validation row without its host-table row | validation proof | `Tests  1 failed \| 1 passed (2)` | `renders a passing and a failing specimen for every host the state reaches` |
| Select state focus rule without its ring | unfiltered `light-1280` journey | `Tests  1 failed \| 53 passed (54)` | the validated select and check case |
| `.form-check-input:active` rule without its filter | unfiltered `light-1280` journey | `Tests  1 failed \| 53 passed (54)` | the pressed-control case, on the checkbox and radio scenarios |
| `.form-control-plaintext:focus` rule without its outline reset | journey, `-t "plaintext control"` filter | `Tests  1 failed \| 53 skipped (54)` | the plaintext case |
| Floated inset without the focused plaintext selector | journey, `-t "plaintext control"` filter | `Tests  1 failed \| 53 skipped (54)` | the plaintext case |
| Lift rule without the floating wrapper | journey, `-t "grouped select and the grouped floating"` filter | `Tests  1 failed \| 53 skipped (54)` | the grouped-lift case |
| Lift rule without the select | journey, `-t "grouped select and the grouped floating"` filter | `Tests  1 failed \| 53 skipped (54)` | the grouped-lift case |

The log prints the journey command's arguments unquoted. As the arguments ran, they are `--project
"journey:light-1280*"` and the `-t` pattern in quotation marks.

## Gates

Each command ran through the `.orkestrel/veneer/units/fr-instruments/fr-run.sh` script, which puts npm 11 on the path and sets the
`PLAYWRIGHT_BROWSERS_PATH` variable. Each log opens with its command line and closes with its exit line.

| Command | Exit | Result line |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check app/browser/constants.ts tests/app/browser/integration.test.ts tests/setup.ts tests/setup.test.ts tests/setupStyles.ts tests/setupStyles.test.ts tests/src/styles/components/form-range.test.ts tests/app/browser/sections/FormControlSection.test.ts tests/app/browser/sections/FormFloatingSection.test.ts tests/app/browser/sections/InputGroupSection.test.ts tests/app/browser/sections/ValidationSection.test.ts src/styles/components/_form-range.scss` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | `> oxlint --config .oxlintrc.json --deny-warnings .`, with no diagnostic line |
| `npm run check` | 0 | `> vue-tsc --noEmit -p configs/app/tsconfig.browser.json`, with no diagnostic line |
| `npm run build:src` | 0 | `dist/src/styles/index.css  278.21 kB │ gzip: 33.42 kB` |
| `npm run test:setup` | 0 | `Tests  299 passed (299)` |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-range.test.ts` | 0 | `Tests  8 passed (8)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/FormCheckSection.test.ts tests/app/browser/sections/FormControlSection.test.ts tests/app/browser/sections/FormFloatingSection.test.ts tests/app/browser/sections/FormRangeSection.test.ts tests/app/browser/sections/FormSelectSection.test.ts tests/app/browser/sections/InputGroupSection.test.ts tests/app/browser/sections/ValidationSection.test.ts tests/app/browser/Showcase.test.ts` | 0 | `Tests  20 passed (20)` |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project "journey:light-1280*"` | 0 | `Tests  54 passed (54)` |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project "journey:dark-390*" -t "rings the switch\|holds each pressed form control\|hovers the file control\|floats the empty textarea\|lifts the focused grouped button\|lifts the grouped select\|focuses each plaintext control\|rings each validated select\|reads every resting cascade key"` | 0 | `Tests  9 passed \| 45 skipped (54)` |
| `npm run test:guides` in the scratch copy with the `fr-shared-2.patch` file applied | 0 | `Tests  19 passed (19)` |

Gate logs:

- `fr2-gate-format.log.txt`
- `fr2-gate-lint.log.txt`
- `fr2-gate-check.log.txt`
- `fr2-gate-build.log.txt`
- `fr2-gate-setup.log.txt`
- `fr2-gate-range.log.txt`
- `fr2-gate-sections.log.txt`
- `fr2-capture-light-1280.log.txt`
- `fr2-capture-dark-390-filtered.log.txt`
- `fr2-gate-guides.log.txt`

Each backslash ahead of a vertical bar in the table escapes the Markdown cell separator. The shell received a
bare vertical bar.

## Observations

- **Ledger rows.** The `fr-shared-2.patch` file carries the same ledger rows as the round-1 patch, so the
  round-1 conformance reading with the patch applied (`Tests  24 passed (24)`) stands. I did not run the
  conformance project in round 2, under the gate decision.
- **Extra whole-project runs.** The `npm run test:setup` script and the range proof each ran outside the
  gate table as a development reading (`fr2-setup.log.txt`, `fr2-range.log.txt`), ahead of the gate
  decision, and each passed.
- **Duplication.** The lift, padded-wrapper, ring-reach, and pixel-decode code repeats in each driven case.
  FRAME-HELPERS carries it.
- **Not run.** The whole suite, the `light-390` and `dark-1280` variants, and the `npm run test:service`
  script are the Orchestrator's landing run.

## Decisions and deviations

- **Placement of the added tables.** The `VALIDATION_HOST_CASES` table and the `FORM_RANGE_HAIRLINE_CASES`
  table sit in the `tests/setupStyles.ts` file, which the brief owns for the forms case tables.
- **FOCUS-FRAME's floating focus case.** Its `declared` line and comment narrow to specimens holding a
  text control (`class="form-control"`), because the added empty plaintext specimen would otherwise enter
  that loop. This is the edit brief 2 allows, kept to the filter line and its comment.
- **Specimen changes.**
  - The grouped select and the grouped floating wrapper each gain a trailing button, so their squared end
    corners and their focus lift show in a frame.
  - The sized selects derive from one size list.
  - The `Form control plaintext` specimen's name changes from `Account email` to `Reader email`, so the
    journey can reach each plaintext control by name.
- **Settled within scope.** Specimen labels, scenario stems, case titles, and where each added case sits.
- **Deviation state.** No stop.

## Review evidence

- The `fr-2.diff` file holds round 1 and round 2 together, against the `e4a6d7c` baseline.
- The `fr-2-status.txt` file holds the `git status --short` output.
- The `fr-shared-2.patch` file holds the `guides/veneer.md` changes against the `e4a6d7c` baseline and
  supersedes the round-1 `fr-shared.patch` file whole.
- The `fr-mutations-2.log.txt` file holds the round-2 mutation runs.
- The `fr2-plaintext-keys.log.txt` file holds the plaintext key reading.
- The frames named under Added states.
