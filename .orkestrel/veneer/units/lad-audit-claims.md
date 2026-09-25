# LEDGER-ADDITIONS audit — claims

Subject: LEDGER-ADDITIONS in `/home/user/veneer-lad` (branch `unit/lad`, uncommitted over Veneer `2376710`), briefed by
`ledger-additions-brief.md` under `../ledger-values-design-verdict.md` Rulings 4, 5, and 6. Written by `opus` on Opus
5.5 and reported in `ledger-additions-report.md`. Evidence: `lad.diff` (`git diff 2376710`), `lad-status.txt`,
`lad-outside-ledger.patch` (a report-only patch to § Outside the ledger), and `lad-instruments/` (the probes, the table
writer, the plant and gate drivers, and the logs). All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. A unit
report's prose is not a claim subject. A mutation counts as a kill only when the failing case's message names an
assertion failure. Rule every claim.

1. **Additions carry values (Ruling 4).** `Addition` carries `emitted`, absent as `undefined` and empty as the empty
   string through `describeValueCell` and `readValueCell`; every declaration under an added selector gets its own
   value-bearing `declaration` row; a custom property is attributed by selector and condition; the value joins
   `describeAddition` and the drift comparison; § Additions carries a `Veneer` column that `readAdditions` requires.
2. **Unattributed rules report (Ruling 5).** `collectUnattributed` lists every emitted rule no shipped component
   claims, as `layer | selector | condition`; the conformance case `attributes every emitted rule to a shipped
   component` expects that list empty; the keyframes refusal still throws.
3. **The ownership rule is narrow.** `attributeBlock` lets a recorded § Additions `selector` row own a rule only when
   `attributeSelector` answers nothing, the inventory records the selector nowhere, and the rule's layer maps to no
   component; the row must match the rule's condition, and the owner must ship with a vocabulary. No rule the
   inventory or a layer already attributes can be claimed by a row, and a stale owner row reports.
4. **The owner rows are true.** `.caption-bottom` is owned by `table`, and each `:where(button.…)` reset rule and the
   `:where(.carousel-indicators [data-bs-target])` rule is owned by the component whose partial writes it; each owner
   equals the key `attributeSelector` gives the selector without its `:where()` wrapper.
5. **Shipped keys derive from the inventory (Ruling 6).** The hand-written `listed` array is gone, and
   `ships exactly the component keys the pinned official inventory records` compares the sorted inventory keys with
   `collectShippedComponents` through `scanLedgerDrift`, expecting empty lists; the setup proof's in-memory
   `audit-key` inventory reads `unrecorded: ['audit-key']`.
6. **The rows are measured, not written.** Every § Additions row equals a measured addition and the reverse: the green
   conformance run is the equality, `lad-table.py.txt` wrote the table from the gate's own functions, and no row was
   written from a reading of the partials.
7. **Plants.** The blockquote border plant fails conformance with an assertion naming the row as unrecorded and stale;
   the `.audit-unrecorded` plant fails only the attribution case, naming it; each plant is restored byte-identically.
   The first plant run collided with another unit's backup directory in the Orchestrator's scratchpad, and the plant
   table rests on the second run alone.
8. **The report-only patch is true.** After this change, § Outside the ledger's paragraph saying the ledger measures
   none of the button reset rules is false, and `lad-outside-ledger.patch` removes exactly that paragraph and the list
   item naming them, with no other change.
9. **Scope, law, and gates.** The diff changes only the four owned files; it adds no `any`, prohibited assertion,
   non-null assertion, suppression, nested function declaration, hidden helper, or mock; new exports are proved in
   `tests/setupServer.test.ts`; every added title states what the case proves; `check`, `lint:check`, the setup file,
   `test:conformance`, `test:guides`, and `test:policy` exit 0 in `lad-instruments/logs/`.
