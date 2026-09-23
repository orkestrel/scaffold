# CLOSE-REGISTRY (`cr`) report

Role and engine: `opus` on Opus 5.5, native subagent, sole writer in `/home/user/veneer-cr` (detached at `7398772`).

The capture registry has one frozen `DRIVEN_KEYS` table. `CAPTURE_KEYS` is `[...SHOWCASE_KEYS, ...CASCADE_KEYS, ...DRIVEN_KEYS]`, and every per-family `*_KEYS` list and its consumers are gone. The sorted capture population is byte-identical before and after the change. Every criterion in scope is green. Two readings need an Orchestrator ruling: probe 1 in criterion 4 as written (see Deviation state), and the journey, which this unit did not run.

## Touched files

- `tests/setup.ts`: removes `BUTTON_KEYS` and the per-family lists. Adds `DRIVEN_KEYS` after `CASCADE_KEYS`: button rows first, then each family's rows in the order the lists sat. Its doc block states the population by its rule and names no member. `CAPTURE_KEYS` becomes the fixed spread of the three tables, and its doc block says so. The `CASCADE_KEYS` doc block names `DRIVEN_KEYS` in place of "that family's own list" and in place of the Button-scenarios comparison.
- `tests/setup.test.ts`: the export-name case lists `DRIVEN_KEYS` and no retired name. The spread case asserts the fixed spread of the three tables. One driven-row case replaces the list-group and form-check cases. It covers the stem followed by one state word other than `rest`, resting-subject membership with the named exemptions and their reasons, a staleness check on each exemption, and the explicit checkbox scenario list.
- `tests/app/browser/integration.test.ts`: the validation and floating cases select their rows with `DRIVEN_KEYS.filter` through a `Set` of `VALIDATION_SPECIMENS` or `FORM_FLOATING_SPECIMENS` names. Each asserts that its selection is not empty, and the validation case asserts that the ring keys equal the selected subjects. The retired imports are gone. The placement reasoning that lived only in the list doc blocks moved into the journey cases (see the ledger later in this report).
- `tmp/units/cr-capture.test.ts`: the kept population probe.
- `tmp/units/cr-select.test.ts`: the kept selection probe.
- `tmp/units/cr-report.md`: this report.
- Evidence under `tmp/units/` (gitignored): `cr-before.log.txt`, `cr-after.log.txt`, `cr-scenarios-{before,after}.txt`, `cr-pairs-{before,after}.txt`, `cr-mutate.py`, `cr-mutate.log.txt`, `cr-format.log.txt`, `cr-lint.log.txt`, `cr-check.log.txt`, and `cr-app.log.txt`.

## Diffstat and status

`git diff --stat` output:

```text
 tests/app/browser/integration.test.ts |  47 +++++--
 tests/setup.test.ts                   | 108 ++++++--------
 tests/setup.ts                        | 258 ++++------------------------------
 3 files changed, 111 insertions(+), 302 deletions(-)
```

`git status --short` output:

```text
 M tests/app/browser/integration.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
```

## Criteria

1. **The `DRIVEN_KEYS` table.** Met, confirmed by reading the file. It is one `Object.freeze` array of frozen rows in landing order. `SHOWCASE_KEYS` and `CASCADE_KEYS` stay. `CAPTURE_KEYS` is the fixed spread of the three tables. The doc block names no member.
2. **The registry proofs in `tests/setup.test.ts`.** Met, confirmed by `npm run test:setup` → `Tests 246 passed (246)`, exit 0. The case titles are:
   - 'exports the token prefix, the capture registry, the case matrices, the walks, and the reduction'
   - 'registers one scenario per photographed frame, each naming the subject it shows'
   - 'names each driven row for one state beyond rest on a specimen the resting registry photographs' (this is the case that replaces the list-group and form-check cases)
3. **The journey consumers.** Met, confirmed by `npm run check` → exit 0. The `app:browser` project excludes `tests/app/browser/integration.test.ts`, so only the typecheck and lint read these edits. `tmp/units/cr-select.test.ts`, run through `npm run test:probe` (`Tests 1 passed (1)`), shows the selection is identical to the retired lists: `['valid-control-focus', 'invalid-control-focus']` and `['form-floating-empty-focus']`.
4. **The probes.**
   - `grep -n '_KEYS: readonly Capture' tests/setup.ts` returns `318 SHOWCASE_KEYS`, `1087 DRIVEN_KEYS`, and `1123 CAPTURE_KEYS`. This does not match the criterion as written; see Deviation state.
   - The retired-name `grep -rn … tests app` returns nothing, exit 1.
   - The sorted `CAPTURE_SCENARIOS` reading is identical before and after the change.
5. **The mutations.** Each one reddens its target case; see the mutations table later in this report.
6. **The format, lint, and type gates.**
   - `npx oxfmt --config .oxfmtrc.json --check` over the three owned files: "All matched files use the correct format.", exit 0.
   - `npm run format:check`: exit 0, "Finished … on 289 files".
   - `npm run lint:check`: exit 0.
   - `npm run check`: exit 0, through `check:app:browser`.
7. **The test projects.**
   - `npm run test:setup`: `Test Files 4 passed (4)`, `Tests 246 passed (246)`, exit 0. This was re-run after the mutations.
   - `npm run test:app`: `Test Files 28 passed (28)`, `Tests 65 passed (65)`, exit 0, in 17.4 s.

## Before and after readings

The probe `tmp/units/cr-capture.test.ts` ran through `npm run test:probe` from `tmp/probe/` and then moved to `tmp/units/`. It prints the sorted `CAPTURE_SCENARIOS` and the sorted `scenario<TAB>subject` pairs.

| Reading | Before (at `7398772`) | After |
| --- | --- | --- |
| sorted scenarios, SHA-256 | `a83c592153d0ec674107ad140a2c926315ca79faaf18435003bc1857e9baf074` (137 lines) | `a83c592153d0ec674107ad140a2c926315ca79faaf18435003bc1857e9baf074` (137 lines) |
| sorted scenario-subject pairs, SHA-256 | `8d70cdd3eb7b6c15be08346e04856bd3bc04aa2938dbccf9d3a383f0e7efac34` | `8d70cdd3eb7b6c15be08346e04856bd3bc04aa2938dbccf9d3a383f0e7efac34` |

`diff` of the before and after files reports no difference for either reading.

## Consumer grep: capture order

Search: `grep -rn 'CAPTURE_KEYS\|CAPTURE_SCENARIOS'` over `tests` and `app` (`*.ts`, `*.vue`), and over the whole tree outside `node_modules` and `dist`. `app/` has no reader. No reader depends on the registry's order.

| Reader | Order dependence |
| --- | --- |
| `tests/setup.test.ts`, spread case (`CAPTURE_KEYS` against the spread; `CAPTURE_SCENARIOS` against `CAPTURE_KEYS.map`) | The assertion restates the declared spread, so it is order-free with respect to landing. |
| `tests/setup.test.ts`, stem, mode-token, and grammar cases | Filters. Order-free. |
| `integration.test.ts` `createPortfolio({ states: CAPTURE_SCENARIOS })` and the `PORTFOLIO.files` / `expandCaptures(CAPTURE_SCENARIOS, VARIANTS)` comparison | Both sides derive from the same sequence. Order-free. |
| `integration.test.ts` placed-equals-registered (`[...FRAMES.scenarios].sort()`) | Sorts. Order-free. |
| `integration.test.ts` declared-subject case (`CAPTURE_KEYS.filter`, `.map(… isConnected)` against `.map(() => true)`) | Filter and elementwise. Order-free. |
| `integration.test.ts` accessibility artifacts (`new Set(CAPTURE_KEYS.map(subject))`) | Writes one file per subject. Order-free. |
| `integration.test.ts` frame guard (`regions.keys().sort()`; `present` against `expanded`) | Sorts. `present` and `expanded` are both built by iterating `CAPTURE_SCENARIOS`. Order-free. |
| `integration.test.ts` guard `expanded[0]` | Reads the first expanded name. That is `showcase` before and after the change, because `SHOWCASE_KEYS` leads both spreads. Its purpose (reading any one frame directly) is order-free. |

## Mutations

Each mutation was applied to `tests/setup.ts` by `tmp/units/cr-mutate.py`. The script runs `npm run test:setup`, restores the exact text, and asserts the file digest returned to baseline (`restored True`). The same command then ran green: `Tests 246 passed (246)`.

| Mutation | Result | Failing cases |
| --- | --- | --- |
| Drop `...DRIVEN_KEYS` from `CAPTURE_KEYS` | exit 1, `Tests 1 failed \| 245 passed (246)` | the spread case ('registers one scenario per photographed frame…') |
| Append `{ scenario: 'page-strip', subject: 'Page strip' }` to `DRIVEN_KEYS` | exit 1, `Tests 2 failed \| 244 passed (246)` | the driven-row case, plus the spread case (its uniqueness assertion: `page-strip` is already a `CASCADE_KEYS` scenario) |
| Change `range-focus` to subject `Page strip` (another subject's stem) | exit 1, `Tests 2 failed \| 244 passed (246)` | the driven-row case, plus the existing registry-wide case 'names each scenario for its own subject…' |
| Add `'Grow spinner'` to `CaptureSubject` and a `{ scenario: 'grow-spinner-hover', subject: 'Grow spinner' }` row | exit 1, `Tests 1 failed \| 244 passed (246)` | the driven-row case (resting-subject assertion; the stem assertion passes for this row) |

The extra failures in the second and third mutations come from independent assertions that detect the same planted row. They do not break the harness: collection is intact and each named case ran.

## Placement reasoning ledger

These doc-block sentences moved into journey cases:

- **Button focus page frame** (from `BUTTON_KEYS`): moved to 'paints a focus ring on every variant reached through the keyboard', beside `FRAMES.page('primary-focus', …)`. Several cases say "for the reason the Button focus scenario is one", and this comment is where that reason lives.
- **Button hover and active element frames** (from `BUTTON_KEYS`): moved to 'repaints a host under the pointer…'.
- **Validation** (focus is the only state left to drive; only the text controls are driven; the declared region is the control): moved to the validation case.
- **Pagination** (no rule for the held pointer): moved to 'repaints and lifts a page…'.
- **Button group** (no hover or active frame, because `button-group.test.ts` reads that lift): moved to 'lifts the checked label…'.
- **Floating** (why only the empty field is driven): moved to the floating case.
- **Input group** (why the button specimen and not the addon specimen): moved to the input-group case.

These cases already stated their family's reasoning, so they were left as they were: range, list group, close, form check (focus and indeterminate), select, control, toggle, and the check-group focus case.

These sentences were not carried:

- The range claim that its region is "the last one the showcase constructs" is stale. `tests/app/browser/Showcase.test.ts` pins a different order.
- Every "that list refuses a repeated subject, so this scenario carries its own list" sentence is replaced by the rule in the `DRIVEN_KEYS` doc block.
- The Button "disabled and outline frames are not registered" sentence and the check "every other check state is a resting specimen" sentence are covered by that doc block's rule: a state the showcase renders at rest on a photographed specimen is not registered.

## Driven-row case exemptions

The following reasons are written in the test case beside each exemption.

- **`Primary` and `Toggle`.** The Button journeys read the resting paint of every painted host in both modes. The arrival frame photographs the Buttons region at the head of the document. So the Button family registers only the states it drives.
- **`Check group`.** The specimen renders its control checked at rest, so its checked frame is its resting reading.

A second assertion reddens if an exempt subject gains a resting row or loses its driven rows.

## Shared-file patches (report-only)

The following `ROADMAP.md` row 396 closure is suggested for the Orchestrator's fold. `COMMIT` is the landing commit.

```diff
-| The per-family driven-key lists (`BUTTON_KEYS`, `PAGINATION_KEYS`, `VALIDATION_KEYS`, and the siblings) each rewrite the `CAPTURE_KEYS` spread and its assertion (D20) | B-PASSIVE-CLOSE consolidates them into one driven table appended the way `CASCADE_KEYS` is |
+| The per-family driven-key lists (`BUTTON_KEYS`, `PAGINATION_KEYS`, `VALIDATION_KEYS`, and the siblings) each rewrite the `CAPTURE_KEYS` spread and its assertion (D20) | Closed: CLOSE-REGISTRY at `COMMIT` consolidates them into one `DRIVEN_KEYS` table families append to; `CAPTURE_KEYS` is the fixed spread of `SHOWCASE_KEYS`, `CASCADE_KEYS`, and `DRIVEN_KEYS` |
```

Keep the table's column padding when applying it. `guides/veneer.md` names no retired list, and `app/browser/constants.ts` needs no change.

## Deviation state

No stop was needed. One finding is recorded, and one observation.

- **Finding: criterion 4, probe 1.** The criterion expects `grep -n '_KEYS: readonly Capture' tests/setup.ts` to return only `SHOWCASE_KEYS` and `DRIVEN_KEYS`. It also returns `CAPTURE_KEYS: readonly CaptureKey[]`, which criterion 1 requires to stay with that type, and which the same grep also returned at `7398772`. No edit can satisfy both criteria, so the table was left as specified. The probe's intent holds: no per-family `*_KEYS` table remains.
- **Observation: the journey was not run.** The edits to `tests/app/browser/integration.test.ts` were read only by `npm run check` and `npm run lint:check`, plus the Node selection probe. Per the brief, the Orchestrator's chain covers the journey.
- **Choices settled within scope:**
  - `DRIVEN_KEYS` sits where the per-family lists sat, after `CASCADE_KEYS`.
  - The driven-row case also refuses a multi-word or `rest` state after the stem. This closes the prefix collision a subject such as `Range` has with `Range disabled`.
  - The case titles are as listed under criterion 2.
