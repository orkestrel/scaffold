# Unit FORMS-FRAMES (`fr`) report

`opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-fr` (branch `unit/fr`, baseline
`e4a6d7c`). Nothing committed. Every evidence file named here sits under `/home/user/veneer-fr/tmp/units/`.

## Outcome

- **P10.** The focused range thumb's hairline paints the `--vn-palette-white-base` entry, and it
  resolves white in both color modes. The ledger rows carry the white-entry Veneer value in `fr-shared.patch`.
  With that value the `tokenized` label is accurate, because the release's `#fff` literal is routed
  through a Veneer token.
- **P15.** Every state the brief lists has a specimen with a resting `CASCADE_KEYS` row, or a
  `DRIVEN_KEYS` row and a driven case whose frame is an element frame of its lifted specimen inside a
  `p-2` wrapper. No listed state is unreachable. The installed `driveHold` function reaches the
  pressed range thumb. The `:-moz-focusring` reset and the autofill rules are recorded in the guide
  patch as outside the reach of the Chromium the journey drives, and they have no frames.

## P10 readings

The probe resolved the focused thumb's `box-shadow` declaration on a gauge in each mode. The log is
`fr-p10-readings.log.txt`, and the probe itself is deleted.

| Tree | Light hairline | Dark hairline |
| --- | --- | --- |
| Before (`e4a6d7c`, `var(--vn-surface-body-base)`) | `rgb(255, 255, 255)` | `oklch(0.21 0.013 256)` |
| After (`var(--vn-palette-white-base)`) | `rgb(255, 255, 255)` | `rgb(255, 255, 255)` |

- **Proof.** The `paints the focused thumb hairline white in both modes, as the release compiles it`
  case in `tests/src/styles/components/form-range.test.ts` resolves the declaration on a light gauge
  and a dark gauge. It holds each hairline to the release's `#fff` value through the installed
  `matchesColor` function.
- **Mutation.** Restoring `var(--vn-surface-body-base)` in the partial reddens that case, the
  existing outline case, and the kept-rule case: `Tests  3 failed | 5 passed (8)`. The mutation log
  has the full record.

## P15 states

Each state is listed with its specimen or scenario, its frames, and its proof. Frames are at
`tmp/capture/states/<scenario>--<variant>.png`, written at `light-1280` and at `dark-390`.

### Driven states: element frames of lifted specimens

- **Switch focus.** `form-check-switch-focus` on `Form check switch`. The proof is the case titled
  `rings the switch under keyboard focus with its focus knob on the lifted specimen, and holds the
  ring inside the frame`. It holds that the knob glyph changes from rest, that the ring is not
  `none`, and that the ring's reach lies inside the frame's recorded region on every edge.
- **Pressed check** and **pressed range thumb.** `form-check-box-active` on `Form check box` and
  `range-active` on `Range`. The proof is the case titled `holds each resting form control pressed
  on its lifted specimen and photographs the paint its press rule writes`. Its population is the
  driven `-active` rows whose subject a forms table declares. It reads the centre pixel of an
  element screenshot with the control focused, and again during a `driveHold` press. The readings differ
  by the press alone. The case holds `:active` at the shot, and the structural `main` guard
  runs after the hold.
  Measured light-1280 centres: check `rgb(243, 248, 255)` focused against `rgb(220, 224, 231)` held;
  thumb `rgb(13, 110, 253)` against `rgb(182, 212, 254)`, which is the release's `#b6d4fe`.
- **File button hover.** `form-control-file-hover` on `Form control file`. The proof is the case
  titled `hovers the file control on its lifted specimen and photographs the button surface the
  pointer paints`. It reads the `::file-selector-button` surface under reduced motion,
  `rgb(248, 249, 250)` at rest against `rgb(233, 236, 239)` hovered at light-1280. It holds `:hover`
  at the shot and reads the surface back at rest after the pointer leaves.
- **Empty focused floating textarea.** `form-floating-empty-textarea-focus` on the `Form floating
  empty textarea` specimen, which this unit adds. The proof is the case titled `floats the empty
  textarea label with its backdrop under keyboard focus on the lifted specimen, and holds the ring
  inside the frame`. It holds that the label transform and the `label::after` backdrop change from
  rest, that the textarea is still `:placeholder-shown`, and that the ring lies inside the frame.
- **Focused button inside a group.** `input-group-buttons-focus` on the `Input group buttons`
  specimen, which this unit adds. The group leads with the `Earlier order` and the `Later order`
  buttons. The proof is the case titled `lifts the focused grouped button over the button beside it
  on the lifted specimen, and holds its ring inside the frame`. Both buttons rest at `z-index` `2`.
  Under focus the focused button reads `5` and its neighbour keeps `2`, and the ring lies inside the
  frame.
- **Validated select and check under focus.** `valid-select-focus`, `invalid-select-focus`,
  `valid-check-focus`, and `invalid-check-focus`. The proof is the case titled `rings each validated
  select and check under keyboard focus in its state color on the lifted specimen, and holds the
  ring inside the frame`. Its population is the driven rows whose subject is a validation specimen
  rendering a select or a check. Every passing host rings in one color, every failing host rings in
  another, and every ring lies inside its frame.

### Resting states: specimens with `CASCADE_KEYS` rows

Each of these specimens carries a resting row, is read by the existing resting-key case (the
declared property on the showcase specimen against the lifted copy, in both modes), and has its
frame read back by the portfolio guard.

- **Form control sizes.** The small and large step of the textarea (`textarea.form-control-sm` and
  `-lg`, `min-height`), the file control (`.form-control-sm[type="file"]` and `-lg`, `min-height`),
  the color control (`.form-control-color.form-control-sm` and `-lg`, `height`), and the plaintext
  form (`.form-control-plaintext.form-control-sm` and `-lg`, `padding-left`).
- **Form floating.** `Form floating empty textarea`
  (`.form-floating > textarea.form-control:placeholder-shown`, `padding-top`),
  `Form floating disabled input` (`.form-floating > input.form-control:disabled ~ label`, `color`),
  and `Form floating disabled select` (`.form-floating > .form-select:disabled ~ label`, `color`).
- **Input group.** `Input group buttons` (`.input-group > .btn + .btn`, `margin-left`),
  `Input group select` (`.input-group > .form-select`, `border-top-left-radius`), and
  `Input group floating` (`.input-group > .form-floating > .form-control`,
  `border-top-left-radius`).
- **Validation.** `Valid textarea` and `Invalid textarea` (`background-position`), `Valid color` and
  `Invalid color` (`width`), `Valid inline feedback` and `Invalid inline feedback`
  (`.form-check-inline .valid-feedback` and its failing twin, `margin-left`), and
  `Validated passing form` (`.was-validated .form-control:valid`, `background-image`).

The section proofs derive their populations from the specimen tables. Each keeps its expectations
keyed by specimen name, so a specimen added without its row reddens.

### Recorded rather than framed

- **`:-moz-focusring`.** The guide patch adds this to § Form select classes: the capture journey
  drives Chromium, so the portfolio has no frame of the reset.
- **Autofill.** The guide patch adds this to § Form floating classes: no installed export puts a
  control into the autofilled state, so that state is outside the reach of the Chromium the journey
  drives.

### Unreachable states

None. The brief's unknown is closed: a `driveHold` press at the control's centre lands on the thumb
of the mid-track `Range` specimen. It enters the thumb's `:active` state and leaves the value at `50`.
Probe reading: centre `rgb(13, 110, 253)` at rest, held `:active` true, and value `50` before and
after. The guide sentence that called the held thumb unreachable is corrected in the patch.

## Failing-first evidence

- **Range proof, before the partial fix.**
  `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/form-range.test.ts`
  exit 1, `Tests  2 failed | 6 passed (8)` (`fr-p10-red.log.txt`). The failing cases were
  `paints the focused thumb hairline white in both modes, as the release compiles it` and
  `clears the control outline under keyboard focus and leaves the ring to the thumb`. After the fix,
  the same command gave exit 0, `Tests  8 passed (8)` (`fr-p10-green.log.txt`).
- **Section proofs, before the specimens.**
  `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/sections/FormControlSection.test.ts tests/app/browser/sections/FormFloatingSection.test.ts tests/app/browser/sections/InputGroupSection.test.ts tests/app/browser/sections/ValidationSection.test.ts tests/app/browser/Showcase.test.ts`
  exit 1, `Tests  4 failed | 9 passed (13)` (`fr-sections-red.log.txt`). The same command after the
  specimens gave exit 0, `Tests  13 passed (13)` (`fr-sections-green.log.txt`).
- **Journey, before the specimens.**
  `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project "journey:light-1280*"`
  exit 1, `Tests  8 failed | 44 passed (52)` (`fr-journey-red.log.txt`). The failing cases were the
  resting-key case, the switch, the empty textarea, the grouped button, and the portfolio's
  placement, subject, accessibility, and frame cases. The switch failed on the traversal start, not
  on a missing specimen, and the start was corrected (see Decisions).
- **Driven cases over existing specimens, without their rows.** The mutation log's
  `Red first, capture flag set` entry removes every driven row this unit adds and runs this unit's
  cases with `CAPTURE=1`: `Tests  6 failed | 1 passed | 45 skipped (52)`. Every case this unit adds fails;
  the one passing case is BCF's underline case, which the name filter also selects.

## Mutation log

`fr-mutations.log.txt` records each mutated site, the command, the build and test exits, the
summary line, and the failing case names. Each mutation reddens exactly the case it targets:

- P10: the body surface restored.
- Pressed check: no `:active` filter.
- Pressed thumb: the held mix takes all of the blue entry.
- File hover: the resting fill.
- Switch focus: the resting knob glyph.
- Empty textarea: backdrop only when filled.
- Grouped button: `z-index` `2` under focus.
- Validated select: no state ring.
- Instrument control: the switch wrapper without `p-2`, so `inside` reads
  `[true, false, true, true, true]`.

The P15 mutations ran in the scratch copy `tmp/probe/fr-guides`, so no off-limits partial in the
worktree was written. That scratch copy is deleted, and each run's output is in the log. The log also retains the void or green runs, each followed by the note that
explains it and the repeat that closed it: a symlinked `node_modules` that the Vite boundary
refused, a non-capture removal run that the portfolio does not refuse, and the first pressed-check
mutation, which led to the focused-then-held reading.

## Gates

Each command ran in `/home/user/veneer-fr` through `.orkestrel/veneer/units/fr-instruments/fr-run.sh`, which puts npm 11 on the
path and sets `PLAYWRIGHT_BROWSERS_PATH`.

| Command | Exit | Result line |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check` over the owned files this unit changed | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | no diagnostics |
| `npm run check` | 0 | no diagnostics |
| `npm run build:src` | 0 | `dist/src/styles/index.css` built |
| `npm run test:setup` | 0 | `Tests  299 passed (299)` |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-range.test.ts` | 0 | `Tests  8 passed (8)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser` over the forms section proofs and `tests/app/browser/Showcase.test.ts` | 0 | `Tests  19 passed (19)` |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project "journey:light-1280*"` | 0 | `Tests  52 passed (52)`, every added frame written |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project "journey:dark-390*"` | 0 | `Tests  52 passed (52)`, every added frame written |
| `npm run test:guides` in `tmp/probe/fr-guides` with `fr-shared.patch` applied | 0 | `Tests  19 passed (19)` |

The format gate named these files: `app/browser/constants.ts`, `tests/app/browser/integration.test.ts`,
`tests/setup.ts`, `tests/setup.test.ts`, `tests/setupStyles.ts`,
`tests/src/styles/components/form-range.test.ts`, the changed section proofs, and
`src/styles/components/_form-range.scss`. The section run covered `FormCheckSection`,
`FormControlSection`, `FormFloatingSection`, `FormRangeSection`, `FormSelectSection`,
`InputGroupSection`, `ValidationSection`, and `Showcase`. The gate logs are the `fr-gate-*.log.txt`,
`fr-capture-*-final.log.txt`, and `fr-gate-guides.log.txt` files.

## Observations

- **Conformance.** `npm run test:conformance` in the worktree exits 1 until the shared patch lands:
  `Tests  2 failed | 22 passed (24)`, which is the ledger gate asking for the form-range rows the patch carries
  (`fr-conformance-worktree.log.txt`). In the scratch copy with the patch applied it exits 0 with
  `Tests  24 passed (24)` (`fr-conformance.log.txt`).
- **Timing.** The first final `npm run test:setup` run failed one case on a 10100 ms timeout in
  `tests/setupServer.test.ts`
  (`records and reads official control state and rejects contradicted or absent obligation steps`).
  At that time the `fu`, `fo`, and `fp` units were running journeys on the same container. The
  immediate rerun passed (`fr-gate-setup-2.log.txt`). This case is outside this unit's files.
- **Stopped run.** I stopped one final capture pair with a process-id kill list, because comment-only
  edits landed after its start. Both variants were then rerun over the final tree.
- **Duplication.** Each case this unit adds repeats the lift pattern (marker, padded wrapper, restore in
  `finally`) and the ring-reach reading of the underline focus case, and the pressed case decodes one
  pixel inline. The consolidation home is `tests/setupBrowser.ts`, which is off-limits to this unit.
- **Critic items outside the brief's P15 list.** These are left unframed and carried to the
  Orchestrator: `.form-control-plaintext:focus`, `.form-floating > .form-control-plaintext:focus`,
  a range that is both focused and disabled, the grouped select's `:focus` lift, the sized group's
  select end padding, `.btn-toolbar .input-group`, and a validated `[multiple]` select.
- **Not run.** The `light-390` and `dark-1280` captures, the whole suite, and
  `npm run test:service` are the Orchestrator's at landing.

## Decisions and deviations

- **Unowned file edited.** `tests/setupStyles.ts` sits outside the literal owned list. I edited
  the WebKit and Gecko `FORM_RANGE_CASES` focus rows from `--vn-surface-body-base` to
  `--vn-palette-white-base`, because that table is the range style proof's case table and P10 makes
  those rows false. If the Orchestrator rules otherwise, move that hunk (in `fr.diff`) into the
  shared patch.
- **Overlap with FOCUS-FRAME.** I changed the `declared` line, with its comment, in each looping
  case FOCUS-FRAME owns in `tests/app/browser/integration.test.ts`: the validation ring case and the
  floating focus case. The validation ring case takes the specimens rendering
  `<input class="form-control is-`, and the floating focus case takes the specimens holding
  `<input`. Otherwise those loops would page-frame this unit's validated-select, validated-check,
  and empty-textarea rows. These hunks merge three-way against FOCUS-FRAME's conversion of the same
  cases.
- **Traversal start.** The installed `traverseAccessible` function sends Tab from the element
  holding focus. Each lifted focus wrapper therefore takes `tabIndex = -1` and programmatic focus,
  so the first Tab lands on the lifted control.
- **Pressed reading.** The pressed case reads the centre pixel with the control focused and then
  held, because the tester's painted scale downsamples the element shot, and the border repaint that
  focus brings would otherwise reach the centre pixel.
- **Settled within scope.** Specimen labels, scenario stems, case titles, the place of the added cases
  (after the mixed-checkbox case), and the order of the added rows (each beside its family's run).
- **Deviation state.** No stop. The scope interpretations under this heading are flagged for
  the Orchestrator's ruling.

## Files

The diffstat against `e4a6d7c` is 11 files changed, 1044 insertions(+), 144 deletions(-).

| File | Change |
| --- | --- |
| `app/browser/constants.ts` | Adds the forms specimens and updates each changed table's TSDoc and region copy. |
| `src/styles/components/_form-range.scss` | Paints the focused thumb's hairline with `--vn-palette-white-base` (P10). |
| `tests/app/browser/integration.test.ts` | Adds the driven forms cases and narrows FOCUS-FRAME's looping cases to their own rows. |
| `tests/app/browser/sections/FormControlSection.test.ts` | Derives the population from the table and keys the per-specimen expectations. |
| `tests/app/browser/sections/FormFloatingSection.test.ts` | Does the same, with each control's name and states keyed. |
| `tests/app/browser/sections/InputGroupSection.test.ts` | Derives the names and adds the button-pair, select, and floating group readings. |
| `tests/app/browser/sections/ValidationSection.test.ts` | Derives the names and adds the scoped-form, textarea, color, and inline readings. |
| `tests/setup.ts` | Adds the subjects, the resting rows, and the driven rows. |
| `tests/setup.test.ts` | Adds `form-check-box-active` to the checkbox rows it names. |
| `tests/setupStyles.ts` | Changes the WebKit and Gecko `FORM_RANGE_CASES` focus rows to the white palette entry. |
| `tests/src/styles/components/form-range.test.ts` | Adds the hairline proof in both modes and updates the declared-token assertion. |

## Review evidence

- `fr.diff`: the worktree against `e4a6d7c`.
- `fr-status.txt`: the `git status --short` output.
- `fr-shared.patch`: `guides/veneer.md` against `e4a6d7c`. It changes the WebKit and Gecko range ledger rows, the
  range recorded departure and proof paragraph, and the frame sentences of § Form control, § Form
  select, § Form check, § Form floating, § Input group, and § Validation classes. It adds the
  `:-moz-focusring` and autofill reach sentences and the § Tests pressed-reading sentence.
- `fr-mutations.log.txt`: the mutation runs.
- `fr-p10-readings.log.txt`: the P10 readings.
- The frames named under P15 states.
