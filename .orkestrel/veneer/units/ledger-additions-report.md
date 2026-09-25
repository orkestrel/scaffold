# LEDGER-ADDITIONS report

`opus` on Opus 5.5, native, worktree `/home/user/veneer-lad` (branch `unit/lad`, base `2376710`).
Every acceptance criterion is green. One reading differs from the brief: the base has more
unattributed rules than `.caption-bottom`. Their owners are evident, so the unit recorded them the
same way. That makes a paragraph in § Outside the ledger false, and that section is not owned, so
the fix is returned as a report-only patch.

## Evidence re-readings (worktree, base `2376710`)

- `Addition` and `AdditionRow` carried no value member. `collectAdditions` skipped a rule when
  `attributeSelector` answered `undefined` or the key had no vocabulary. Under an added selector it
  wrote only the `selector` row and `property` rows, and it skipped registry names.
  `describeAddition` joined component, name, condition, and category. Matches the brief.
- `tests/conformance.test.ts` held the hand-written `listed` array. `describe('cascade ledger')`
  asserted empty `unrecorded` and `stale`. Matches the brief.
- The § Additions header was `| Component | Name | Condition | Category | Reason |`, and
  `_table.scss` writes `.caption-bottom`. Matches the brief.
- Inventory keys against shipped components: `{"unrecorded":[],"stale":[]}`. Matches the brief.
  Probe: `tmp/units/lad-base-probe.ts.txt`.
- Blockquote plant at the base collector: `BASE {"unrecorded":[],"stale":[]}`. The same plant at the
  head collector names the row both ways. Matches the brief. Probe and log:
  `tmp/units/lad-base-plant-probe.ts.txt` and `tmp/units/lad-base-plant-probe.log.txt`.
- **Differs:** the unattributed set is not `.caption-bottom` alone. The same probe names these
  rules, all in `components` under no condition:
  - `.caption-bottom`
  - `:where(button.dropdown-item)`
  - `:where(button.nav-link)`
  - `:where(button.navbar-toggler)`
  - `:where(button.accordion-button)`
  - `:where(button.page-link)`
  - `:where(button.list-group-item)`
  - `:where(button.btn-close)`
  - `:where(button.carousel-control-prev, button.carousel-control-next)`
  - `:where(.carousel-indicators [data-bs-target])`

  The `:where()` rules are the button reboot rules that `13853b1` (E-ID-BUTTON-CASCADE) added after
  the analyst's `0865c67` sweep. `collectSelectorClasses` reads no class inside a functional
  argument, so no class attributes them.

## Unknowns answered

- **Unattributed rules other than `.caption-bottom`:** the button reboot rules listed earlier. Each
  has an evident owner: its partial and its comment name the component. The same `attributeSelector`
  call on the unwrapped selector gives the same key:
  - `dropdown`: `_dropdown.scss`
  - `nav`: `_nav.scss`
  - `navbar`: `_navbar.scss`
  - `accordion`: `_accordion.scss`
  - `pagination`: `_pagination.scss`
  - `list-group`: `_list-group.scss`
  - `btn-close`: `_close.scss`
  - `carousel`: both carousel rules, `_carousel.scss`

  Each rule has a `selector` row owned by that key, followed by its declaration rows.
- **Rows the value column adds:** the rows come from the collector's measurement, not from reading
  the partials.
  - After the collector change, the gate printed 202 unrecorded and 146 stale lines
    (`tmp/units/lad-drift-conformance.log.txt`).
  - After the ownership rows were added, a probe running the gate's own `collectLedger`,
    `scanLedgerDrift`, and `describeAddition` measured 352 additions (`tmp/units/lad-rows-probe.ts.txt`).
  - The table is written from that measurement in measured order (`tmp/units/lad-table.py.txt`).
    Each recorded row's reason carries over. A declaration under an added selector takes its
    selector row's reason. The script reported no recorded row left without a carrier.
  - Rows the change adds:
    - a declaration row for each declaration under an added selector (`html`, the reboot element
      selectors, `.btn-tertiary`, and others);
    - the `.caption-bottom` and button reboot owner rows, with their declaration rows;
    - `property` rows renamed to `selector { --name }`, one per site.

  The gate's green run is the check that the table equals the measurement.

## Changes by symbol

- `tests/setupServer.ts`
  - `Addition`: gains `emitted: string | undefined`. `name` is `selector { property }` for both
    the `declaration` and `property` categories, so a custom property is recorded once per site.
  - `CascadeLedger`: gains `unattributed: readonly string[]`.
  - `attributeBlock` (new export): runs `attributeSelector` first. A recorded `selector` row owns
    the rule only when that call answers nothing, the inventory records the selector nowhere, and
    the rule's layer answers to no component. The row matches at its own condition. The owner must
    ship and have a vocabulary.
  - `collectUnattributed` (new export): lists each rule `attributeBlock` leaves unowned as
    `layer | selector | condition`, distinct and in written order.
  - `collectAdditions`: takes `owners` (default `[]`) and attributes through `attributeBlock`.
    Under an added selector it writes a `selector` row with no value, then one row per
    declaration. Registry names stay exempt. Every row carries its value, and rows de-duplicate by
    their `describeAddition` line. The keyframes refusal still throws.
  - `collectLedger`: takes `owners` (default `[]`, placed before `registry`) and returns
    `unattributed`.
  - `describeAddition`: appends `describeValueCell(emitted)`.
  - `readAdditions`: reads the `Veneer` column through `readValueCell`, and the column is required.
  - `LEDGER_GUIDE`: the Additions table gains the `Veneer` column.
- `tests/setupServer.test.ts`
  - New cases:
    - `reports an addition whose recorded value differs from the emitted one, both unrecorded and stale`
    - `names each emitted rule no shipped component measures, and measures one its recorded selector row owns`
    - `names an official component key the guide does not ship and a shipped key the inventory lacks, and neither for the pinned inventory`
  - Existing addition expectations now carry values and site names.
  - The reader case adds an `(empty)` reading and a missing-`Veneer` refusal.
  - One case is renamed to `names each declaration an added selector writes, and a custom property
    its vocabulary lacks as a property`.
  - The export list gains `attributeBlock` and `collectUnattributed`.
- `tests/conformance.test.ts`
  - The `listed` array is deleted.
  - New case `ships exactly the component keys the pinned official inventory records` compares the
    sorted `Object.keys(readOracleInventory().components)` with `collectShippedComponents` through
    `scanLedgerDrift` and expects empty lists.
  - The ledger passes `recorded` as owners.
  - The in-gate plant also carries a `.audit-orphan` rule.
  - New case `attributes every emitted rule to a shipped component` expects the plant to be named
    and the real cascade to name nothing.
  - The letter-spacing expectation carries `0.01em`.
- `guides/veneer.md`
  - § Additions: the preamble is rewritten for values, per-site names, and ownership rows. The
    header gains `Veneer` between `Category` and `Reason`. The rows are regenerated.
  - § Table classes: one sentence names the `.caption-bottom` owner row.
  - § Tests: the conformance and helper-proof sentences name the changed cases.

Ancillary choices this unit settled:

- **`Veneer` column position:** after `Category`. `tests/setupStyles.test.ts` (off-limits) reads
  `LEDGER_GUIDE` and asserts `Category` at index 3.
- **Unattributed line shape:** `layer | selector | condition`.

## Failing-first and green readings

- Red, before the implementation:
  - Command: `npx vitest run --project setup tests/setupServer.test.ts`
  - Result: `Tests 2 failed | 114 passed (116)` (`tmp/units/lad-red-setup.log.txt`).
  - Failing cases: the value-drift case and the unattributed case.
  - The inventory-key case passed on its first run. It drives the existing `scanLedgerDrift`
    rather than a defect, and its own plants are its control.
- Green, same command:
  - Result: `Tests 116 passed (116)`, exit 0 (`tmp/units/lad-setup.log.txt`).
  - Observation: an earlier green run at load average 18.65 timed out in untouched cases (oracle
    recording, Sass compile, a `beforeAll` hook) (`tmp/units/lad-green-setup.log.txt`).
- Conformance red after the collector change, before the ownership rows: the unattributed case
  named the listed rules plus `.audit-orphan` (`tmp/units/lad-drift-conformance.log.txt`).

## Plants

Script: `tmp/units/lad-plants-2.sh`. It supersedes `lad-plants.sh`, whose run is recorded under
"Scratch incident".

| Plant | Command | Failing assertion | Restored |
| --- | --- | --- | --- |
| `border-left: 97px solid currentColor` in `src/styles/elements/_blockquote.scss` | `npm run test:conformance` (`lad-plant-blockquote.log.txt`) | `additions.unrecorded` names `reboot \| blockquote { border-left } \| — \| declaration \| 97px solid currentColor`; `additions.stale` names the same site with `var(--vn-space-2) solid currentColor`; the letter-spacing case fails on the same unrecorded line | `cmp` identical; `git diff --stat -- src` empty |
| `@layer components { .audit-unrecorded { color: red } }` appended to `src/styles/components/_table.scss` | `npm run test:conformance` (`lad-plant-unattributed.log.txt`) | `attributes every emitted rule to a shipped component`: `plant.unattributed` names `components \| .audit-unrecorded \| —`; no other case fails | `cmp` identical; `git diff --stat -- src` empty |
| In-memory `audit-key` component, and `alert` removed, in `setupServer.test.ts` | `npx vitest run --project setup tests/setupServer.test.ts` | `{ unrecorded: ['audit-key'], stale: ['alert'] }`; the pinned inventory gives `{ unrecorded: [], stale: [] }` | in-memory copy, nothing to restore |

## Gates (`tmp/units/lad-gates.sh`, load average 6 to 9)

| Gate | Log | Result |
| --- | --- | --- |
| oxfmt `--check` over the owned files | `lad-oxfmt-owned.log.txt` | exit 0 |
| `npm run check` | `lad-check.log.txt` | exit 0 |
| `npm run lint:check` | `lad-lint-check.log.txt` | exit 0 |
| `npx vitest run --project setup tests/setupServer.test.ts` | `lad-setup.log.txt` | 116 passed, exit 0 |
| `npm run test:conformance` | `lad-test-conformance.log.txt` | 28 passed, exit 0 |
| `npm run test:guides` | `lad-test-guides.log.txt` | 20 passed, exit 0 |
| `npm run test:policy` | `lad-test-policy.log.txt` | 109 passed, 1 skipped, exit 0 |
| `npm run format:check` (observation) | `lad-format-check.log.txt` | exit 0 |

Observations:

- Conformance took 34.26s against 32.72s at the base (`tests` 12.26s against 10.88s).
- `test:policy` timed out in an earlier run at load average above 18, and passed in 3.35s at the gate run.

## Report-only patch: § Outside the ledger

The paragraph beginning "The button reboot rules come after those names" says the ledger measures
none of those rules. That is false after this unit. The section's list also names "the button
reboot rules". § Outside the ledger belongs to LEDGER-RETUNE, not to this unit.

The exact patch is `tmp/units/lad-outside-ledger.patch`. It removes the list item and the
paragraph. The `mixins.test.ts` and `button.test.ts` proofs that paragraph cites are linked elsewhere in the guide (around lines 3125,
3310, and 11117), and `test:guides` does not read that paragraph. Apply it at integration or carry
it to LEDGER-RETUNE.

## Scratch incident

Run 1 of the plant script (`tmp/units/lad-plants.sh`) backed up into
`<scratchpad>/plant-backup`. Another unit had already made that path a directory. As a result:

- `cp` wrote `_blockquote.scss` and `_table.scss` into that directory.
- The scripted restore failed.
- The second plant ran while the first was still applied.

Recovery:

- I checked both copies against `2376710` with `cmp`. They were identical.
- I restored both partials from those copies, then removed exactly those files from the other
  unit's directory. `git diff --stat -- src` then printed nothing.
- Run 1's logs are kept as `lad-plant-*-run1.log.txt`, with a note. The plant rows in this report
  come from run 2 only.

If the other unit had its own `_blockquote.scss` or `_table.scss` in `plant-backup/`, run 1
overwrote it. The files' names and modification times point to this unit alone, but I cannot
confirm that.

## Artifacts

- Diff: `tmp/units/lad.diff` (`git diff 2376710`).
- Status: `tmp/units/lad-status.txt`, with only the owned files modified:
  - `guides/veneer.md`
  - `tests/conformance.test.ts`
  - `tests/setupServer.test.ts`
  - `tests/setupServer.ts`
- Diffstat: `4 files changed, 795 insertions(+), 433 deletions(-)`.
- Retained instruments: `lad-base-probe.ts.txt`, `lad-base-plant-probe.ts.txt`,
  `lad-rows-probe.ts.txt`, `lad-table.py.txt`, `lad-plants.sh`, `lad-plants-2.sh`, and
  `lad-gates.sh`. `tmp/probe/` is removed.

## Deviation state

No stop. Settled within scope:

- the column position;
- the unattributed line shape;
- the ownership rule;
- recording the button reboot rules, which the brief's "record any further unattributed rule the
  same way" allows because each owner is evident.

The § Outside the ledger patch waits for the Orchestrator's integration decision.
