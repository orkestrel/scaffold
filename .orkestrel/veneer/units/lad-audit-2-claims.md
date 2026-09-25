# LEDGER-ADDITIONS audit round 2 — claims

Subject: LEDGER-ADDITIONS round 2 in `/home/user/veneer-lad` (branch `unit/lad`, uncommitted over Veneer `2376710`),
briefed by `ledger-additions-brief-2.md` to carry F1, F2, R2, and R3 of `lad-audit-verdict.md`. Written by `opus` on
Opus 5.5 and reported in `ledger-additions-report-2.md`. Round 1's confirmed claims are not re-ruled. Evidence:
`lad-2.diff` (`git diff 2376710` after round 2), `lad-2-status.txt`, `lad.diff` (round 1), and `lad-instruments/r2/`
(the sweep probe, the table writer and its output, the plant and gate drivers, and the logs). All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A unit report's prose is not a claim subject. A mutation counts as a
kill only when the failing case's message names an assertion failure. Rule every claim.

1. **The subject reading.** `collectSubjectClasses` in `tests/setupServer.ts` returns a selector's own classes and the
   classes inside an `:is()` or `:where()` argument, and never the classes inside `:not()`, `:has()`, another
   functional pseudo-class, or an attribute value. Its case in `tests/setupServer.test.ts` fails under the
   `where-dropped` and `not-read` plants (`lad-2-plant-where-dropped.log.txt`, `lad-2-plant-not-read.log.txt`).
   `collectSelectorClasses` keeps its contract for its other callers.
2. **Attribution uses it, and nothing else moved.** `attributeSelector` takes its classes from `collectSubjectClasses`.
   The sweep logs (`lad-2-sweep-before.log.txt`, `lad-2-sweep-after.log.txt`) show that the only selectors whose
   attribution moved are the button reboot rules, each to the key its row named, and that no departure or addition
   line moved. The sweep covers every emitted selector containing `:is(` or `:where(`.
3. **The owner rows left are the ones measurement cannot place.** The guide keeps an owner row only for `.caption-bottom`
   and `:where(button.page-link)`, and the report's reason for each holds against `tests/fixtures/oracle/inventory.json`
   and `matchShippedKey`. The conformance case `places by measurement every emitted rule but the ones a recorded
   selector row owns` asserts that `collectUnattributed` with no owners names exactly those two, and the
   `where-dropped` plant fails it.
4. **The table is an executed record.** The writer `lad-2-table-writer.test.ts` regenerates § Additions through the
   gate's own functions with no hand-seeded owner, fails on a measured row with no reason or a recorded row no measured
   row matches, and its formatted output equals the guide table (`lad-2-table-diff.log.txt` empty, exit 0).
5. **R2.** A case kills a dropped layer clause in `attributeBlock` (`lad-2-plant-layer-clause.log.txt`), and a case with
   one custom property declared at two selectors kills de-duplication by name (`lad-2-plant-name-dedupe.log.txt`).
6. **The owner relabel.** Relabelling a kept owner row's component fails the conformance gate
   (`lad-2-plant-owner-relabel.log.txt`); relabelling every row of one owned rule together stays green, and the § Additions
   preamble says so by naming the owning row's `Component` cell and the `Reason` cell as the cells no measurement fixes.
7. **The prose is true.** The § Additions preamble's F2 clause reads "a `declaration` the release omits at a site it
   writes, or any declaration under an added selector"; the ownership paragraph states the `:is()` and `:where()`
   reading and names both kept rows with their reasons; § Outside the ledger no longer carries the reset paragraph or
   its list item; § Tests states only what the added cases execute.
8. **Gates.** The table writer and diff, the scoped oxfmt check, `npm run check`, `npm run lint:check`, the setup file
   (118 passed), `npm run test:conformance` (29 passed), `npm run test:guides`, and `npm run test:policy` exit 0 in
   `lad-instruments/r2/`.
9. **Scope and law.** `lad-2-status.txt` names only `guides/veneer.md`, `tests/conformance.test.ts`,
   `tests/setupServer.test.ts`, and `tests/setupServer.ts`; `src/**` is unchanged. The round adds no `any`, prohibited
   assertion, non-null assertion, suppression, nested function declaration, hidden helper, mock, or fake;
   `collectSubjectClasses` is exported, listed in the export-list case, and carries TSDoc in the module's voice; each
   case title states what the case proves.
