# Unit FORMS-FRAMES (`fr` unit), round 3 report

The `opus` role on Opus 5.5 ran this round as a native subagent in the `/home/user/veneer-fr` worktree, on the
`unit/fr` branch over the `e4a6d7c` baseline. The changes from rounds 1 and 2 stay uncommitted in place, and
nothing is committed. Every evidence file this report names sits in the `/home/user/veneer-fr/tmp/units/`
directory.

## Outcome

- Round 3 closes claims 4, 5, 6, and 7 of the round-2 audit verdict, and the F1, R1, and R3 findings.
- It adds no state and no frame.
- Each acceptance criterion holds:
  1. The formatter check over the owned files, `npm run lint:check`, and `npm run check` each exit 0.
  2. Each named section mutation has a retained red run, and the section proof exits 0 on the round-3 tree.
  3. A planted column swap in a `VALIDATION_HOST_CASES` row fails `npm run check` (exit 2), and the plant is
     removed.
  4. `npm run test:guides` exits 0 in a scratch copy with the `fr-shared-3.patch` file applied.

## Findings and the changes that close them

### Claim 5, the section proof's mutations

Each mutation below ran alone in a scratch copy, over the
`tests/app/browser/sections/InputGroupSection.test.ts` file. The section proof loads the source stylesheet, so
no build step ran. Each run reddens the case `squares both inline corners of a grouped select and
floating control, keeps the sized select room, and sizes a toolbar group to its content's width` and no other case. The
`fr-mutations-3.log.txt` log records every run, with the command, the exits, the summary line, the failing
case, and the reason.

| Mutation | Summary line | Reason the log prints |
| --- | --- | --- |
| Trailing-corner squaring removed (the `.input-group:not(.has-validation)` trailing-radius rule) | `Tests  1 failed \| 3 passed (4)` | `expected [ [ +0, 6, +0, 6 ], [ +0, 6, +0, 6 ] ] to strictly equal [ [ +0, +0, +0, +0 ], …(1) ]` |
| Leading-corner squaring removed (the radius declarations of the overlap rule and of the floating-child rule) | `Tests  1 failed \| 3 passed (4)` | `expected [ [ 6, +0, 6, +0 ], [ 6, +0, 6, +0 ] ] to strictly equal [ [ +0, +0, +0, +0 ], …(1) ]` |
| The `.input-group-lg > .form-select` and `.input-group-sm > .form-select` end room removed | `Tests  1 failed \| 3 passed (4)` | the large select reads `16` and the small select reads `8`, where the proof expects `48` for each |
| The `.btn-toolbar .input-group` width restored to `100%` | `Tests  1 failed \| 3 passed (4)` | `expected 414 to be less than 414` |

Every mutation reddens, so no assertion needed strengthening. The section proof exits 0 on the round-3 tree
(the section gate follows).

### R3, the validation table's type

The `VALIDATION_HOST_CASES` table in the `tests/setupStyles.ts` file is a list of object rows under the
`ValidationHostCase` interface, with no `String()` coercion. The interface narrows the `tag`, `type`, and
`feedback` fields to the values the DOM reports:
- the `tag` field is `'INPUT' | 'SELECT' | 'TEXTAREA'`;
- the `type` field is the control types the table renders;
- the `feedback` field is `'invalid-feedback' | 'valid-feedback' | undefined`.

The `holder` field reads `undefined` where the specimen's own container holds the control, in place of an
empty string. The validation proof reads that absence the same way.

**Planted run.** The plant swaps the `tag` and `type` values of the `Valid control` row, and `npm run check`
fails with exit 2. The leading diagnostic line of `fr3-plant-check.log.txt` reads:

`tests/setupStyles.ts(4918,14): error TS2322: Type 'readonly (Readonly<{ name: "Valid control"; tag: "text"; type: "INPUT"; …`

The plant is removed, and the file matches its pre-plant bytes. The validation proof stays green (the section gate follows).

### Claim 4, the sized plaintext names

The sized plaintext specimens announce `Small reader email` and `Large reader email`, matching the base
`Reader email` control. No test asserts those names, and the uniqueness check in the
`FormControlSection.test.ts` proof holds (the section gate follows).

### Claim 6, the empty-plaintext focus

The frame and the case's reading are unchanged. The guide patch and the `FORM_FLOATING_SPECIMENS` TSDoc say
that focus moves the empty control's content box down to the floated inset and paints nothing a frame can
show. The reasons they give: the control holds no value, its placeholder is transparent, and a readonly
control paints no caret. So the focus frame matches the resting frame, and the journey's reading of the inset
is the evidence for the state. Neither text describes text moving.

### F1, the toolbar prose

- **TSDoc.** The `INPUT_GROUP_SPECIMENS` TSDoc says that inside a toolbar the group takes its content's
  width rather than the toolbar's. The group shares the button group's row where the row has room, and
  wraps below it where the row does not.
- **Case title.** The section case's title reads `sizes a toolbar group to its content's width`.
- **Case comment.** The comment states the width rule. It adds that the proof's own viewport gives the row
  that room: the mutation run reads a `414` pixel toolbar.
- **Guide patch.** The patch sentence says the same.

### R1, the remarks tag

The `@remarks` tag on the `VALIDATION_SPECIMENS` TSDoc sits on its own line, as every other tag in the
`app/browser/constants.ts` file does. The block under it is reflowed to the file's width.

### Claim 7, the report and the capture evidence

- **Capture reading.** The `light-1280` capture reading is a filtered `CAPTURE=1` run over this unit's cases.
  Its log, `fr3-capture-light-1280-filtered.log.txt`, opens with its command line and closes with its exit
  line.
- **Gate logs.** Every round-3 gate log opens with its command.
- **Size list.** This report writes "the shared size list", and so does the `INPUT_GROUP_SPECIMENS` TSDoc.

## Gates

Each command ran through the `.orkestrel/veneer/units/fr-instruments/fr-run.sh` script. The script puts npm 11 on the path and sets the
`PLAYWRIGHT_BROWSERS_PATH` variable. Each log opens with its command line and closes with its exit line.

| Command | Exit | Result line |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check app/browser/constants.ts tests/app/browser/integration.test.ts tests/setup.ts tests/setup.test.ts tests/setupStyles.ts tests/setupStyles.test.ts tests/src/styles/components/form-range.test.ts tests/app/browser/sections/FormControlSection.test.ts tests/app/browser/sections/FormFloatingSection.test.ts tests/app/browser/sections/InputGroupSection.test.ts tests/app/browser/sections/ValidationSection.test.ts src/styles/components/_form-range.scss` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | `> oxlint --config .oxlintrc.json --deny-warnings .`, with no diagnostic line |
| `npm run check` | 0 | `> vue-tsc --noEmit -p configs/app/tsconfig.browser.json`, with no diagnostic line |
| `npm run check` with the planted column swap | 2 | `tests/setupStyles.ts(4918,14): error TS2322: …` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/sections/InputGroupSection.test.ts tests/app/browser/sections/ValidationSection.test.ts tests/app/browser/sections/FormControlSection.test.ts tests/app/browser/sections/FormFloatingSection.test.ts` | 0 | `Tests  10 passed (10)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupStyles.test.ts` | 0 | `Tests  144 passed (144)` |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project "journey:light-1280*" -t "rings the switch\|holds each pressed form control\|hovers the file control\|floats the empty textarea\|lifts the focused grouped button\|lifts the grouped select\|focuses each plaintext control\|rings each validated select\|reads every resting cascade key"` | 0 | `Tests  9 passed \| 45 skipped (54)` |
| `npm run test:guides` in the scratch copy with the `fr-shared-3.patch` file applied | 0 | `Tests  19 passed (19)` |

In the table, each backslash ahead of a vertical bar escapes the Markdown cell separator. The shell received a
bare vertical bar.

Gate logs:
- `fr3-gate-format.log.txt`
- `fr3-gate-lint.log.txt`
- `fr3-gate-check.log.txt`
- `fr3-plant-check.log.txt`
- `fr3-gate-sections.log.txt`
- `fr3-gate-setupstyles.log.txt`
- `fr3-capture-light-1280-filtered.log.txt`
- `fr3-gate-guides.log.txt`

## Observations

- **Toolbar width at 390.** The toolbar group wraps below the button group at the `390` pixel variants and
  shares its row in the section proof at `414` pixels. The width rule holds at each width. The prose states
  the rule and the room it depends on.
- **Not run.** The unfiltered capture variants, the whole suite, and the `npm run test:service` script are
  the Orchestrator's landing run.

## Decisions and deviations

- **Validation row form.** Object rows under `ValidationHostCase`. The literal unions on the `tag`, `type`,
  and `feedback` fields make a misplaced column a type error: those values are what the DOM reports.
- **Holder absence.** The `holder` field's absence is `undefined` rather than an empty string, which follows
  the absence rule in the `AGENTS.md` file.
- **Leading-corner mutation.** Round 3 runs the leading-corner squaring mutation as well as the trailing one,
  because the case asserts every corner.
- **Deviation state.** No stop. Every edit sits in an owned file, and the guide changes travel in the
  `fr-shared-3.patch` file.

## Review evidence

- `fr-3.diff`: every round against the `e4a6d7c` baseline.
- `fr-3-status.txt`: the `git status --short` output.
- `fr-shared-3.patch`: the `guides/veneer.md` changes against the `e4a6d7c` baseline. It supersedes the
  `fr-shared-2.patch` file whole.
- `fr-mutations-3.log.txt`: the round-3 mutation runs. Each run's output file is named in the log, and the
  scratch copy is deleted.
- `fr3-plant-check.log.txt`: the planted type-check run.
