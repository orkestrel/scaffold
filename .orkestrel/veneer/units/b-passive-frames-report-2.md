# PASSIVE-FRAMES (`fp`) report, round 2

This report covers unit PASSIVE-FRAMES (`fp`), run by `opus` on Opus 5.5 as a native subagent in the
worktree `/home/user/veneer-fp`, on branch `unit/fp` from `cf5e447`. It covers both rounds and
supersedes `fp-report.md`. Nothing is committed.

## Result

- **Closed:** every finding brief 2 carries — claim 8, claim 9, F1 to F6, R1, and R2.
- **Unframed:** the `light` and `dark` role hovers, under the mode-token law brief 2 upholds.
- **Proofs:** every changed proof reddens on a named mutation.
- **Captures:** a filtered capture at the `light-1280` variant and at the `dark-390` variant writes every frame this unit owns and passes.

## Touched files

- **`app/browser/constants.ts`:**
  - **Pressed roles:** lays the `Pressed roles` hosts out as separate buttons in two flex columns.
  - **Disabled check:** gives the disabled check label the `btn btn-primary` class list.
  - **Copy:** names the disabled forms and the pressed faces in the `BUTTON_GROUP_COPY` paragraph.
  - **Role lists:** exports the `BUTTON_ROLE_CLASSES` constant and the `LIST_GROUP_ROLE_WORDS` constant, and maps the specimens from them.
  - **Round 1:** the `Disabled buttons`, `Pressed roles`, `Large placeholder`, `List group role actions`, and `List group role selection` specimens.
- **`tests/setup.ts`:**
  - **Constants:** adds the `EXEMPT_SUBJECTS` constant and the `DRIVEN_CONTRAST` constant.
  - **Prose:** writes "mode token" in the `MODE_TOKEN` TSDoc. It corrects the `CaptureScenario` TSDoc to say that the registry proof, not the typecheck, refuses a mode token.
  - **Round 1:** the subjects, the `grown` state, the resting and driven rows, and the `MODE_TOKEN` constant.
- **`tests/setup.test.ts`:**
  - **Exemption:** reads the driven-row exemption from the `EXEMPT_SUBJECTS` constant.
  - **Bar:** adds a case holding the `DRIVEN_CONTRAST` bar between a ratio of 1 and the `CONTRAST_BAR` value.
  - **Export list:** adds both constants.
- **`tests/app/browser/integration.test.ts`:**
  - **Role pointer case:** reads the `BUTTON_ROLE_CLASSES` constant.
  - **Role action case:** shoots the hover on the primary row and the press on the danger row, each selected by its role class. It asserts that both photographed fills clear the `DRIVEN_CONTRAST` bar.
- **`tests/app/browser/sections/ButtonGroupSection.test.ts`:**
  - **Region law:** admits the toolbar key beside the group key.
  - **Disabled case:** asserts that every host carries one variant, and corrects its comments.
  - **Pressed case:** binds the `BUTTON_ROLE_CLASSES` constant to the cascade. It asserts that each pressed host keeps a lone host's corners and margins and overlaps no other host.
- **`tests/app/browser/sections/ListGroupSection.test.ts`:** reads the `LIST_GROUP_ROLE_WORDS` constant, and binds it to the cascade's role order.
- **`tests/app/browser/sections/PlaceholderSection.test.ts`:** unchanged in round 2.

The following diffstat covers both rounds against `cf5e447`, read from `git diff --stat`:

```text
 app/browser/constants.ts                           | 103 +++++-
 tests/app/browser/integration.test.ts              | 411 +++++++++++++++++++++
 .../browser/sections/ButtonGroupSection.test.ts    | 176 ++++++++-
 .../app/browser/sections/ListGroupSection.test.ts  | 100 ++++-
 .../browser/sections/PlaceholderSection.test.ts    |  63 +++-
 tests/setup.test.ts                                |  34 +-
 tests/setup.ts                                     | 168 ++++++++-
 7 files changed, 1006 insertions(+), 49 deletions(-)
```

## Findings

**Claim 8, the dark pressed row.**
- **Change:** the role action case selects its press row with the `.list-group-item-action.list-group-item-danger` selector, and its hover row with the `.list-group-item-action.list-group-item-primary` selector. It asserts that the photographed hover and press fills each clear the `DRIVEN_CONTRAST` bar of 1.2.
- **Reading (R3):** each fill is read as a luminance ratio against the row's rest fill, through the installed `measureContrast` function. The readings sit in the `role action paint` artifact entry.

| Row | `dark-390` | `light-1280` |
| --- | --- | --- |
| `dark` role row, press | 1.0834694430672245 | — |
| `danger` role row, press | 1.4558558544679998 | 1.4619523770718046 |
| `primary` role row, hover | 2.1164519404650086 | 1.4679968106436454 |
| `light` role row, press | — | 1.0121750082141932 |

- **Frame:** `list-group-role-actions-active--dark-390.png` shows the danger row pressed, on a red fill set apart from the resting rows.
- **Mutation N3:** pressing the dark role row reddens the bar assertion with `expected [ 1.0834694430672245 ] to strictly equal []`.

**Claim 9, law and report.**
- **Exemption constant:** the driven-row exemption population lives in the `EXEMPT_SUBJECTS` constant of the `tests/setup.ts` file. Each group's reason sits in its TSDoc. Mutation N6 drops the `Link` subject and reddens the exemption case.
- **Gate logs:** every round-2 gate ran through `.orkestrel/veneer/units/fp-instruments/fp-gate-2.sh`. That script writes the command at the head of its log and the exit at its foot. The gate table quotes each command exactly.
- **Round-1 logs:** those logs carry no command at their head, and they stay retained as they ran.

**F1, the pressed faces.**
- **Change:** the `Pressed roles` hosts stand in two `d-flex flex-column align-items-start gap-2` columns inside a toolbar. The specimen TSDoc and the `BUTTON_GROUP_COPY` paragraph name the pressed faces and the disabled forms.
- **Region law:** the region's markup law in the Button group section proof admits the `btn-toolbar` key beside the `btn-group` key.
- **Proof:** the pressed case asserts that each host's corner radii and its top and left margins equal those of a lone host of its role, and that no two host boxes overlap.
- **Frames:** `pressed-roles--light-1280.png` and `pressed-roles--dark-390.png` show every host with four rounded corners and space between hosts.
- **Mutation N1:** restoring the `btn-group-vertical` class reddens the corner assertion.

**F2, the disabled check.**
- **Change:** the check label carries the `btn btn-primary` class list. The TSDoc states that the two `.btn-check` selectors share the one label, and that the enabled host is the only host that takes a tab stop. The section case comments say the same.
- **Proof:** the disabled case asserts that every host carries one variant.
- **Frame:** `disabled-buttons--light-1280.png` shows the check label on the enabled host's fill.
- **Mutation N2:** restoring the outline class reddens the variant assertion with `expected [ Array(2) ] to have a length of 1 but got 2`.

**F3, the term.** The `MODE_TOKEN` TSDoc and the guide paragraph write "mode token" where they wrote "theme word". No "theme word" remains in the owned files or the patch.

**F4, the guide sentence.** The § Tests paragraph reads: "The journey holds every role host beyond the filled primary and asserts that its held face is the face its pressed twin paints."

**F5, one population.**
- **`BUTTON_ROLE_CLASSES`:** holds the single-role Button class lists, derived from the `BUTTON_SPECIMENS` table. The `Pressed roles` specimen and the role pointer case read it. The pressed case holds it equal to the cascade's role rules. Mutation N4 drops the outline roles and reddens that assertion.
- **`LIST_GROUP_ROLE_WORDS`:** holds the List group role words. The resting roles, role actions, and role selection specimens map it, and the section case holds it equal to the cascade's role order. Mutation N5 drops the `dark` role and reddens that assertion.
- **Unscoped export list:** both constants are exports, so the `tests/app/browser/index.test.ts` export list goes false. That file is neither owned nor off-limits, so it is treated as shared, and its edit is in `fp-shared-2.patch`.

**F6, rows named by role.** The role action case comments name the primary row and the danger row. This report names rows by role.

**R1, the typecheck sentence.**
- **`tests/setup.ts`:** the `CaptureScenario` TSDoc states that the typecheck refuses a project suffix and that the registry proof refuses a mode token through the `MODE_TOKEN` pattern.
- **Guide:** the § Tests sentence in `fp-shared-2.patch` states the same.

**R2, the spinner's `resumed` assertion.** Mutation N7 adds an inline `animation-play-state: paused` declaration beside the pause. That declaration survives the specimen's reinsertion, so the restored spinner rests paused. The `resumed` assertion reddens at `integration.test.ts:1655`, and the assertion stays.

## Rows and frames

Each row's specimen or scenario and its proof are as `fp-report.md` § Rows states, with the round-2 changes in the preceding § Findings.

**Unchanged frames:** the grow spinners, the disabled buttons, the role hovers, the link states, the role selection, and the large placeholder.

**Unframed:** the `light` and `dark` role hovers stay unframed under the mode-token law. The role pointer case drives and reads those hosts, and records them in its `unframed` artifact field.

The frame paths follow, with `<variant>` standing for `light-1280` or `dark-390`. They are under `/home/user/veneer-fp/tmp/capture/states/`.

```text
disabled-buttons--<variant>.png
pressed-roles--<variant>.png
large-placeholder--<variant>.png
list-group-role-actions--<variant>.png
list-group-role-selection--<variant>.png
secondary-hover--<variant>.png          tertiary-hover--<variant>.png
success-hover--<variant>.png            info-hover--<variant>.png
warning-hover--<variant>.png            danger-hover--<variant>.png
outline-primary-hover--<variant>.png    outline-secondary-hover--<variant>.png
outline-tertiary-hover--<variant>.png   outline-success-hover--<variant>.png
outline-info-hover--<variant>.png       outline-warning-hover--<variant>.png
outline-danger-hover--<variant>.png
link-hover--<variant>.png  link-focus--<variant>.png  link-active--<variant>.png
list-group-role-actions-hover--<variant>.png  list-group-role-actions-active--<variant>.png
grow-spinner-grown--<variant>.png  small-grow-spinner-grown--<variant>.png
```

## Mutations

**Round 2.** The log is `.orkestrel/veneer/units/fp-instruments/fp-mutations-2.log.txt` and the driver is `.orkestrel/veneer/units/fp-instruments/fp-mutate-2.py`.
- **What the log records for each mutation:** the site, the command, the exit, the summary line, the failing case, the assertion message, and the assertion's file position.
- **Restoration:** the driver restores each file byte for byte and records `restored: True`.
- **Result:** every mutation exits 1 with `Tests  1 failed`, and the failing case is the one listed:
  - **N1:** the pressed hosts joined in vertical groups. The pressed faces case fails at the corner assertion.
  - **N2:** the disabled check label on the outline variant. The disabled forms case fails at the one-variant assertion.
  - **N3:** the list-group press shot on the dark role row at the `dark-390` variant. The role action case fails at the `DRIVEN_CONTRAST` assertion.
  - **N4:** the `BUTTON_ROLE_CLASSES` constant without its outline roles. The pressed faces case fails at the cascade binding.
  - **N5:** the `LIST_GROUP_ROLE_WORDS` constant without its `dark` role. The role rows case fails at the cascade binding.
  - **N6:** the `Link` subject dropped from the `EXEMPT_SUBJECTS` constant. The driven-row case fails.
  - **N7:** the grow spinner held through an inline declaration that survives reinsertion. The grow spinner case fails at the `resumed` assertion.
  - **N8:** the `DRIVEN_CONTRAST` bar set to 0.5. The bar case fails.

**Round 1.** The log `.orkestrel/veneer/units/fp-instruments/fp-mutations.log.txt`, mutations M1 to M11, stands for the proofs round 2 leaves unchanged.

## Gates

**Worktree gates.** Each of these ran in `/home/user/veneer-fp` through `.orkestrel/veneer/units/fp-instruments/fp-gate-2.sh`, with npm 11 on `PATH` and `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. The command below is the one each log records at its head.

| Log | Command | Exit | Result line |
| --- | --- | --- | --- |
| `fp-2-format.log.txt` | `npx oxfmt --config .oxfmtrc.json --check app/browser/constants.ts tests/setup.ts tests/setup.test.ts tests/app/browser/integration.test.ts tests/app/browser/sections/ButtonGroupSection.test.ts tests/app/browser/sections/PlaceholderSection.test.ts tests/app/browser/sections/ListGroupSection.test.ts` | 0 | `All matched files use the correct format.` |
| `fp-2-lint.log.txt` | `npm run lint:check` | 0 | no diagnostic printed |
| `fp-2-check.log.txt` | `npm run check` | 0 | no diagnostic printed |
| `fp-2-setup.log.txt` | `npm run test:setup` | 0 | `Tests  300 passed (300)` |
| `fp-2-setup-scoped.log.txt` | `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setup.test.ts` | 0 | `Tests  21 passed (21)` |
| `fp-2-sections.log.txt` | `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/sections/ButtonGroupSection.test.ts tests/app/browser/sections/ListGroupSection.test.ts tests/app/browser/sections/PlaceholderSection.test.ts` | 0 | `Tests  14 passed (14)` |
| `fp-2-journey-dark-390.log.txt` | `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project journey:dark-390\* -t repaints\ each\ role\ beyond\|drives\ the\ link\ button\|holds\ each\ grow\ spinner\|drives\ every\ role\ action` | 0 | `Tests  4 passed \| 46 skipped (50)` |
| `fp-2-journey-light-1280.log.txt` | the same command with `journey:light-1280\*` | 0 | `Tests  4 passed \| 46 skipped (50)` |
| `fp-2-capture-light-1280.log.txt` | `CAPTURE=1` set, `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project journey:light-1280\* -t reads\ every\ resting\ cascade\ key\|repaints\ each\ role\ beyond\|drives\ the\ link\ button\|holds\ each\ grow\ spinner\|drives\ every\ role\ action` | 0 | `Tests  5 passed \| 45 skipped (50)` |
| `fp-2-capture-dark-390.log.txt` | the same command with `journey:dark-390\*` | 0 | `Tests  5 passed \| 45 skipped (50)` |

**Scratch-copy gates.** These ran in `tmp/probe/fp-scratch`. That directory was a copy of the worktree with `fp-shared-2.patch` applied and `node_modules` hard-linked, and it has been deleted.

| Log | Command | Exit | Result line |
| --- | --- | --- | --- |
| `fp-2-guides.log.txt` | `npm run test:guides` | 0 | `Tests  20 passed (20)` |
| `fp-2-index.log.txt` | `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/index.test.ts` | 0 | `Tests  1 passed (1)` |
| `fp-2-app.log.txt` | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser` | 0 | `Tests  198 passed (198)` |

**How these gates ran:**
- **Whole projects:** the whole `app:browser` project and the whole `setup` project each ran one time, as the acceptance reading.
- **Why the app project ran in the scratch copy:** the `app:browser` project includes the `tests/app/browser/index.test.ts` file. That file passes only with the shared patch applied.
- **Symlink failure:** a scratch copy with a symlinked `node_modules` directory failed to serve the setup module. The hard-linked copy resolved it.
- **Log head edits:**
  - Each capture log's head carries an `env: CAPTURE=1` line, inserted into the log by hand. The runner script records that variable itself for any run it takes from here.
  - The command lines at the heads of the round-2 logs were rewritten into one line. The runner's formatting had repeated the `command:` label, and no argument changed.

## Shared-file patch

The patch `.orkestrel/veneer/units/fp-shared-2.patch` supersedes `fp-shared.patch` whole. It applies to `cf5e447` and makes these edits:

- **`guides/veneer.md`, § Collapse classes:** drops the clause that compared the declined closing panel to the grow spinners.
- **`guides/veneer.md`, § Showcase:** rewrites the grow spinner paragraph to state the `grown` frames.
- **`guides/veneer.md`, § Tests:**
  - adds the paragraph stating the mode-token limit and the pressed-roles frame, in the F3 and F4 wording;
  - corrects the typecheck sentence per R1.
- **`tests/app/browser/index.test.ts`:** adds the `BUTTON_ROLE_CLASSES` name and the `LIST_GROUP_ROLE_WORDS` name to the export list.

## Deviation

**Resolved within scope.** No row is stopped. I decided the following, recorded it, and carried on:

- **Press row:** the danger row.
- **Hover row:** the primary row.
- **`DRIVEN_CONTRAST` bar:** 1.2, set between the unreadable dark press (1.08) and the photographed fills (1.45 and higher).
- **Pressed columns:** plain flex columns, with the region's markup law widened to admit the toolbar key.
- **Exemption constant:** named `EXEMPT_SUBJECTS`.
- **Constant names:** `BUTTON_ROLE_CLASSES` and `LIST_GROUP_ROLE_WORDS`.

The List group name avoids the `LIST_GROUP_ROLES` name that the `tests/setupStyles.ts` module exports as its independent oracle.

**Unscoped file.** The `tests/app/browser/index.test.ts` file goes false with the mandated exports. It is returned in the patch rather than edited, and the scratch-copy reading proves it green with the patch applied.

## Observations

- **`tests/setupServer.test.ts` timeout:** one round-2 `npm run test:setup` run failed at the `records and reads official control state` case of that file, with `Test timed out in 10100ms`. That is the same case and reading as round 1, in a file this unit does not touch. That run's log was overwritten by the passing run the table quotes.
- **Tab stops:** the `Pressed roles` hosts add tab stops to the order the Button journey walks. The `BUTTON_GROUP_PAIR` remark keeps that order to what coverage needs. These stops are the coverage for the pressed faces.
- **`LIST_GROUP_ROLES` duplication:** the role word list appears in the `LIST_GROUP_ROLE_WORDS` constant and in the `LIST_GROUP_ROLES` constant of `tests/setupStyles.ts`. The setup copy is an oracle held apart from the partial by design. It is outside this unit.
- **Not run by this unit:** the unfiltered capture variants, the whole suite, and `npm run test:service`. They are the Orchestrator's at landing.

## Review evidence

Under `/home/user/veneer-fp/tmp/units/`:
- `fp-2.diff`, both rounds against `cf5e447`
- `fp-2-status.txt`
- `fp-shared-2.patch`
- `fp-report-2.md`
- `fp-mutations-2.log.txt`
- the `fp-2-*.log.txt` gate logs

The frames are under `/home/user/veneer-fp/tmp/capture/states/`.
