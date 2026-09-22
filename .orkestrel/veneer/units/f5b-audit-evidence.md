# F5b ACCOUNTING-LEDGER — audit evidence index

The subject is the worktree `/home/user/veneer-f5b`, detached at `07fc3c3` with the unit's
uncommitted writes. Two Orchestrator grants landed mid-unit and are in the status output beside the
brief's Owned list: `src/styles/components/_button.scss` and `src/styles/elements/_button.scss`
(the four corner radius longhands collapsed to `border-radius`, matching main's commit `7863d0d`,
sent to the unit as an exact patch so its comparison measured the tree main will carry). The unit
also edited one scratch inventory literal in `tests/setupStyles.test.ts` (adding `rules: []` and
`keyframes: []` after it extended `OracleVocabulary`), a file the brief listed neither as owned nor
as off-limits; the report's scope note 1 discloses it.

- `/home/user/scaffold/tmp/audit/f5b-status.txt` — `git status --porcelain` over the subject.
- `/home/user/scaffold/tmp/audit/f5b.diff` — `git diff` against `07fc3c3` (the actual diff; the
  `guides/veneer.md` hunk carries the 880-row and 125-row ledger tables and the
  `tests/fixtures/oracle/inventory.json` hunk the `rtl` removals).
- `/home/user/scaffold/tmp/audit/f5b-report.md` — the unit's returned report, with the per-component
  measurement, the retired rows by name, the failing-first evidence per gate, the scope notes and
  deviations, and the answers to the Orchestrator's mid-unit notes.
- `/home/user/scaffold/tmp/audit/f5b-terrain.md` and `/home/user/scaffold/tmp/audit/value-gap-probe.mjs`
  — the terrain record and the retained probe the brief pointed at.
- `/home/user/veneer-f5b/tmp/units/f5b-brief.md` — the brief the unit ran.
- `/home/user/scaffold/tmp/audit/f5b-gates.log.txt` — the Orchestrator's gate chain over the
  subject worktree, complete when its last line reads `=== gates done`; read it last.

Rulings taken before this round: the `--bs-carousel-control-icon-filter` row is absent because the
`carousel` key is not shipped (report deviation 2), ruled acceptable and claim 5's filter clause reads
with it; the two `--bs-btn-close-filter` rows read `dropped` rather than `fallback` on the unit's
measurement (deviation 3), to be attacked by the objective lane rather than pre-ruled; the guide's
size (455 KB, the ledger ~290 KB) is an open Orchestrator decision outside this round's claims; the
`reason` cells of § Additions are authored prose the unit flags as unverified, a target for every
lane.
