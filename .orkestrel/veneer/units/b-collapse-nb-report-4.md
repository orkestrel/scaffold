# Unit NAVBAR (`nb`) round 4 report

I worked as `builder` on Sonnet, a native subagent and the sole writer in `/home/user/veneer-nb`
(branch `unit/nb`, uncommitted over `a658879`). The effective brief is
`/home/user/veneer-nb/tmp/units/nb-brief-4.md`. I committed, pushed, and installed nothing, and I
ran no `git checkout`, `restore`, `stash`, `reset`, or `clean`. I did not edit
`tests/setupPolicy.ts` or `tests/policy.test.ts`.

## Outcome

Every finding of round 3's audit verdict outside the claims (`EMPTY-TABLE-PROOFS`,
`REPORT-COUNTS`) is closed, in the owned file and in the revised patches:

- `/home/user/veneer-nb/tmp/units/nb-shared-4.patch`
- `/home/user/veneer-nb/tmp/units/nb-offlimits-4.patch`
- `/home/user/veneer-nb/tmp/units/nb-retirement-4.patch`

The retained path for the shared patch is `/home/user/scaffold/.orkestrel/veneer/units/nb-shared-4.patch`.

Every criterion reads green on the stage. The stage is a fresh `git archive a658879` extraction
with the round-3 shared and off-limits patches applied, the round's own owned files copied in from
the worktree (the tables' consumers `app/browser/sections/NavbarSection.ts`,
`src/styles/components/_navbar.scss`, `tests/app/browser/sections/NavbarSection.test.ts`,
`tests/src/styles/components/navbar.test.ts`, and `tests/src/styles/theme.test.ts`), and the round-3
instruments' `node_modules` linked in with `cp -al`, as the round-3 report describes. Every proof
still distinguishes its mutation. The stage and the retirement copy are deleted.

## Findings closed

### EMPTY-TABLE-PROOFS

- **Site:** `tests/setupStyles.test.ts`, the case `binds the navbar selectors, published
  properties, dark retunes, ramp, and markup to the inventory`, directly after the consumer-property
  loop (the comment "Every consumer row reads a slot a color row also names.") and before the
  closure assertion (the comment "The published properties are closed over the tables and the
  readings named beside them:").
  - **Before:** no assertion bound `NAVBAR_EXPAND_READINGS`, `NAVBAR_DARK_CONSUMER_CASES`, or
    `NAVBAR_PAINT_MOVE_CASES` by member; each table's rows were read only through the freeze loops
    and the browser proof's own loops, so a table emptied to `Object.freeze([])` left the setup
    case's freeze, property, and row assertions with nothing to iterate and the case still passed.
  - **After:** an assertion binds each table by member: the viewports of `NAVBAR_EXPAND_READINGS`
    equal `[390, 1280]` and each row's `expanded` array equals `NAVBAR_EXPAND_CASES` filtered to the
    boundaries the viewport reaches; `NAVBAR_DARK_CONSUMER_CASES` equals the brand, plain-link, and
    toggler rows in order, each with its `target`, `reads`, and `property`; `NAVBAR_PAINT_MOVE_CASES`
    equals the four rows built from `['.navbar:not(.navbar-dark)', '.navbar-dark']` crossed with
    `['.navbar-brand', '.navbar-toggler']`, the plain bar's rows `moves: true` and the dark class's
    rows `moves: false`. The existing consumer-property loop, the freeze loops, and the closure
    assertion are unchanged.
- **`mutate.py`** (`tmp/units/nb-instruments-4/mutate.py`, carried from
  `nb-instruments-3/mutate.py`): a deletion control added for each table, each removing one row's
  line or block rather than the whole table: `expand-readings-row-deleted` (the `1280` row),
  `dark-consumers-row-deleted` (the `a[href="#plain"]` row), `paint-moves-row-deleted` (the
  `.navbar-dark .navbar-toggler` row). Each reads red on the case `TABLES` names
  (`-t "binds the navbar selectors"`) and each is restored by the instrument's own write-back,
  checked by digest.

### The section comment's token

- **Site:** `tests/app/browser/sections/NavbarSection.test.ts`, the comment beside the light-attribute
  assertion.
  - **Before:** "…so the class bar opens a light island with its own data-bs-theme attribute, and
    the white it shows over the card is the class's paint."
  - **After:** "…so the class bar opens a light island with its own `data-bs-theme` attribute, and
    the white it shows over the card is the class's paint." Re-flowed at 100 columns.

### The gates log keeps every pass

- **Site:** `tmp/units/nb-instruments-4/gates.sh`.
  - **Before:** `: > "$LOG"` truncated `gates.log.txt` at the start of every run, so a failing first
    pass left no trace once a later pass wrote to the same file.
  - **After:** `echo "=== run $(date -u +%Y-%m-%dT%H:%M:%SZ) HEAD $(git -C /home/user/veneer-nb
    rev-parse --short HEAD)" >> "$LOG"` appends a run header instead. This round's `gates.sh` ran
    once and its one pass is the run under the header `=== run 2026-09-23T20:09:16Z HEAD a658879`
    in `tmp/units/nb-instruments-4/logs/gates.log.txt`.

## Gate exits

**Stage**, run under the header `gates.sh` writes, `=== run 2026-09-23T20:09:16Z HEAD a658879`:

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format. |
| `npm run lint:check` | 0 | no findings |
| `npm run check` | 0 | every project |
| `npm run build:src` | 0 | built in 1.22s |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/navbar.test.ts tests/src/styles/theme.test.ts tests/src/styles/components/container.test.ts` | 0 | `Tests 71 passed (71)`, with the round-2 case titles |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/NavbarSection.test.ts` | 0 | `Tests 2 passed (2)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | 0 | `Tests 113 passed (113)` |
| `npm run test:conformance` | 0 | `Tests 22 passed (22)` |
| `npm run test:guides` | 0 | `Tests 19 passed (19)` |
| `npm run test:policy` | 0 | `Tests 109 passed \| 1 skipped (110)` |
| `npm run test:app` | 0 | `Tests 78 passed (78)` |
| `npm run test:setup` (observation) | 0 | `Tests 254 passed (254)` |

**Retirement copy**, script `tmp/units/nb-instruments-4/retire.sh`, using `retire.py`, log
`tmp/units/nb-instruments-4/logs/retire-gates.log.txt`:

| Command | Exit | Reading |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check src/styles/_tokens.scss src/styles/_theme.scss tests/setupStyles.test.ts tests/src/styles/theme.test.ts tests/setupStyles.ts` | 0 | All matched files use the correct format. |
| `npm run lint:check` | 0 | no findings |
| `npm run check` | 0 | every project |
| `npm run build:src` | 0 | built in 3.58s |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | 0 | `Tests 112 passed (112)`; the undeclared-key case is retired |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/navbar.test.ts tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/src/styles/components/container.test.ts` | 0 | `Tests 102 passed (102)` |
| `npm run test:conformance` | 0 | `Tests 22 passed (22)` |

The retirement asset probe (`retirement-asset.log.txt`): with an accordion icon declared in the
retirement copy's dark scope, `npx vitest run --config configs/src/vite.styles.config.ts --no-cache
--reporter=dot tests/src/styles/theme.test.ts` exits 1, `Tests 1 failed | 5 passed (6)`,
`AssertionError: expected 'url("data:image/svg+xml,…' to be ''`. Without it, the same command exits
0, `Tests 6 passed (6)`. `_theme.scss` was restored and its digest checked
(`a6f253fd2b62a97828aac390559d7866774f8497383b188f9754457eba161b05`), and the retirement copy was
deleted.

**Retirement patch check (criterion 5).** `git -C /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb4/retirerepo
apply --check /home/user/veneer-nb/tmp/units/nb-retirement-4.patch`, as `retire.sh` runs it inside
the simulated repository built by `retire.py … simulate`, reads "retirement patch: git apply --check
passes against the simulated state."

## Mutation matrix (criterion 2)

Every mutation from `nb-instruments-3/mutate.py`, carried into
`/home/user/veneer-nb/tmp/units/nb-instruments-4/mutate.py`, was re-run on the round-4 stage, each
restored and its digest checked by the instrument itself (the run ends "done: every mutated file
restored by digest," and the script raises `SystemExit` on a digest mismatch, which did not fire).
Log: `/home/user/veneer-nb/tmp/units/nb-instruments-4/logs/mutations.log.txt`.

The controls this round adds (`expand-readings-row-deleted`, `dark-consumers-row-deleted`,
`paint-moves-row-deleted`), and the controls round 3 added (`expand-readings-unfrozen`,
`dark-consumers-unfrozen`, `paint-moves-unfrozen`, `dark-consumers-property-foreign`), re-run
against
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup
tests/setupStyles.test.ts -t "binds the navbar selectors"`:

| Mutation | Reading |
| --- | --- |
| `expand-readings-row-deleted` | exit 1, `1 failed \| 112 skipped (113)` |
| `dark-consumers-row-deleted` | exit 1, `1 failed \| 112 skipped (113)` |
| `paint-moves-row-deleted` | exit 1, `1 failed \| 112 skipped (113)` |
| `expand-readings-unfrozen` | exit 1, `1 failed \| 112 skipped (113)` |
| `dark-consumers-unfrozen` | exit 1, `1 failed \| 112 skipped (113)` |
| `paint-moves-unfrozen` | exit 1, `1 failed \| 112 skipped (113)` |
| `dark-consumers-property-foreign` | exit 1, `1 failed \| 112 skipped (113)` |
| controls, unmutated | navbar with theme `46 passed (46)`; section `2 passed (2)`; setup file `113 passed (113)` |

Every carried mutation from round 3 reads exit 1 with the round-3 failure signature, unchanged.
Every carried mutation from round 1 and round 2 (the class-surface, asset, and length mutations)
reads exit 1 with the signature the round-3 report and audit verdict record. The full log's last
lines are the three controls, unmutated: `control, unmutated navbar and theme | exit 0 | 46 passed
(46)`, `control, unmutated section | exit 0 | 2 passed (2)`, `control, unmutated setup proof | exit
0 | 113 passed (113)`.

## Patches

**`nb-shared-4.patch`**

- `git apply --check` passes in the worktree: exit 0.
- SHA-256 digest: `199e9bb7c0088840ca17c6fc622bc97c7df4537db869ed26fbf2a4101b0316d4`. Not
  byte-identical to `nb-shared-3.patch`; the delta from round 3 sits in `tests/setupStyles.test.ts`
  alone, at the assertion blocks item 1 (`EMPTY-TABLE-PROOFS`) adds for `NAVBAR_EXPAND_READINGS`,
  `NAVBAR_DARK_CONSUMER_CASES`, and `NAVBAR_PAINT_MOVE_CASES`.

**`nb-offlimits-4.patch`**

- `git apply --check` passes in the worktree: exit 0.
- SHA-256 digest: `f15aa3abbbf44832d0f07538855685cd15da86f952ceeaba9b0b048db4c509fa`. Byte-identical
  to `nb-offlimits-3.patch` (`diff` reports no difference). No finding this round carries a change
  to this patch.

**`nb-retirement-4.patch`**

- Its base is the simulated post-ACCORDION state, the same construction round 2 and round 3 used.
- `git apply --check` passes against that state, as the preceding section states.
- SHA-256 digest: `4569f47e55e40e47da99aeb2cd7793a3fd458397098e6f1a9cfa7fa42b5aac1a`. Not
  byte-identical to `nb-retirement-3.patch`: `diff` shows only the `tests/setupStyles.test.ts`
  `index` line moving (`f402443..914406a` to `2b38b6e..b1d427b`, the blobs shifting because the
  shared patch's own content moved under them). The hunk header at `tests/setupStyles.test.ts` stays
  at `@@ -607,15 +607,6 @@`, unmoved from round 3, because item 1's insertion sits after line 3167
  in the file, past this hunk's own position, so nothing earlier than line 607 changed. Every other
  hunk header is unchanged too. This corrects the brief's own expectation that this hunk would move
  again with the lines item 1 adds: it does not, because the insertion site is later in the file
  than the hunk it would have to shift.

**Instruments** are under `/home/user/veneer-nb/tmp/units/nb-instruments-4/`, copied from
`nb-instruments-3/` with every path rewritten for round 4: `class-surface.sh`,
`class-surface.test.ts`, `readings.sh`, `mutate.py`, `patches.sh`, `gates.sh`, `journey.sh`,
`journey-rerun.sh`, `retire.sh`, `retire.py`, and `logs/`.

## Deviations

**D-node-modules: the stage needs its own `node_modules`, carried from round 3.** Resolved within
scope.

- Expected: the round-4 stage, built as a `git archive a658879` extraction with the round-3 shared
  and off-limits patches applied plus this round's owned files copied in, to run every gate.
- Found: the round-3 report and audit verdict record that a stage with no `node_modules` exits 127
  on every command, and that a symlink to the worktree's `node_modules` fails the browser section
  run with Vite's "Resolved dependencies must remain inside their physical package root" for
  `@orkestrel/contract` imports.
- Evidence: the round-3 report's own account and the first pass in `gates.log.txt`, which is not
  retained: round 3's `gates.sh` truncated `gates.log.txt` with `: > "$LOG"` at the start of every
  run, so its one retained log holds only the final green pass and the first failing pass's evidence
  does not survive in that file. This round's `gates.sh` fix, the gates-log finding closed earlier
  in this report,
  means this round's own log would have kept a failing first pass had one occurred; none did, because
  I linked `node_modules` with `cp -al` before the first `gates.sh` run rather than after a failure.
- Done: I built the round-4 stage with `cp -al /home/user/veneer-nb/node_modules
  <stage>/node_modules` (hardlinked, so no extra disk copy) from the start, which keeps every path
  inside the stage tree. Every gate reads green on the one run recorded in
  `tmp/units/nb-instruments-4/logs/gates.log.txt` under its `=== run 2026-09-23T20:09:16Z HEAD
  a658879` header.
- Not done: nothing; this is the same instrument-construction detail round 3 recorded, carried
  forward with the missing first-pass evidence now named as missing rather than summarized without
  it.

**D1 through D8 from round 2, and the D-node-modules deviation from round 3, carried forward as the
round-3 report and round-3 audit verdict record them.** D3, D4, and D5 stayed closed. D2 (the
`nav-list` off-limits patch), D6 and D7 (waiting on ACCORDION), and D8 (this report file) stand
exactly as round 3 left them; this round's findings do not touch them.

## What the unit could not close

- D2: the off-limits `nav-list` patch needs your ruling (unchanged from round 3).
- D6 and D7: both wait on ACCORDION's landing (unchanged from round 3).
- D1: the worktree typecheck stays red until the shared patch applies (unchanged from round 3).

## Review evidence

`git -C /home/user/veneer-nb status --porcelain` reads:

```text
 M tests/src/styles/theme.test.ts
?? app/browser/sections/NavbarSection.ts
?? src/styles/components/_navbar.scss
?? tests/app/browser/sections/NavbarSection.test.ts
?? tests/src/styles/components/navbar.test.ts
```

Round 4 changed one owned file from round 3: `tests/app/browser/sections/NavbarSection.test.ts`,
the section comment's token, backticked as item 2 (the token finding) states. No other owned file
changed from round 3.

The shared delta from round 3 sits in `tests/setupStyles.test.ts` alone, the assertion blocks
item 1 (`EMPTY-TABLE-PROOFS`) adds for `NAVBAR_EXPAND_READINGS`, `NAVBAR_DARK_CONSUMER_CASES`, and
`NAVBAR_PAINT_MOVE_CASES`.

`tmp/units/` holds the round-4 patches and `nb-instruments-4/`. Your capture at hand-back is
`nb-4.diff` and `nb-4-status.txt`, taken from inside the worktree.
