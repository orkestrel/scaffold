# Unit THEME (`ct`), brief 4 — round 3: the round-2 audit's findings

## Role and engine

`opus` on Opus 5.5, the native subagent that ran round 2, resumed in `/home/user/veneer-ct2` (branch `unit/ct2`
from `ac74459`, round 2's changes uncommitted in place). `b-cross-ct-brief-3.md` stands for everything this brief
does not change.

## What changed and why

Round 2's audit (`/home/user/scaffold/.orkestrel/veneer/units/ct-audit-2-objective-verdict.md` and
`ct-audit-2-checker-verdict.md`) confirmed the populations, the R1 plant, and the X8 proof, and found:

- **CONTROL-DOC-TALLY.** The `COLOR_MODE_CONTROLS` TSDoc in `ct2-shared.patch` says "The last four", a positional
  tally. Name the controls it means (the select, the switch, the navbar toggler's icon, and the accordion button).
- **The setup case's mutation.** The report says each added case is bound by a named mutation, but S3 runs the
  section case, not the `tests/setup.test.ts` case that holds the constant non-empty, unique, and frozen. Run a
  mutation that case distinguishes (a duplicated selector, or the freeze dropped), retain its log, and name it.
- **The round-1 account (claim 5).** Beside each of S1 to S4, M5, and M7 in the report, cite the retained round-1 log
  (under `/home/user/scaffold/.orkestrel/veneer/units/ct-instruments/`) that shows it.
- **The report (claim 6).** Drop "triple read", and follow every code token with a noun.

## Output

A successor report `/home/user/veneer-ct2/tmp/units/ct2-report-2.md` covering both rounds, and the same text as the
final message; `ct2-shared-2.patch` superseding `ct2-shared.patch` whole; `ct2-2.diff` and `ct2-2-status.txt` (both
rounds against `ac74459`); the added mutation's log beside the others.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Acceptance criteria

Brief 3's criteria over the round-3 tree, plus: the setup case reddens on its named mutation.
