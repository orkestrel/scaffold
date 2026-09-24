# APPEARANCE round 6 — the verbatim closes: checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence. Each round-6 edit adopts an audit lane's prescription verbatim, so
this read closes it in place of a fresh audit round, per `/home/user/scaffold/.claude/rules/quality.md` § Rounds and
verdicts.

## Objective

Two verdicts, one per unit, each on the exact line and on nothing else having changed.

## Context

- **AP-COLOR round 6.** Prescribed text: `apc-audit-5-verdict.md` § Carrier. The edited file is
  `/home/user/veneer-apc/tests/src/styles/utilities/color.test.ts`; the round-5 copy is
  `/home/user/veneer-apc/tmp/units/apc-6-round5-color.test.ts.txt`; the report and logs are
  `/home/user/veneer-apc/tmp/units/apc-report-6.md` and `apc-6-*.log.txt` beside it.
- **AP-TYPE round 6.** Prescribed text: `apt-audit-5-verdict.md` § Carriers and record corrections, Q1. The edited file
  is `/home/user/veneer-apt/guides/veneer.md`; the round-5 copy is `/home/user/veneer-apt/tmp/units/apt-6-round5-veneer.md.txt`;
  the report and logs are `/home/user/veneer-apt/tmp/units/apt-report-6.md` and `apt-6-*.log.txt` beside it.
- Both verdicts sit in `/home/user/scaffold/.orkestrel/veneer/units/`. Read-only; run nothing; edit nothing.

## Execution

Perform the assignment directly and spawn nothing. For each unit: compare the edited file with its round-5 copy line
by line; confirm the changed line carries the prescribed text exactly (a paragraph rewrap that changes no other word
is allowed for AP-TYPE); confirm each named gate log ends on exit 0.

## Output

Per unit: CONFIRMED or BROKEN with `file:line` evidence, then one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <unit names>`.
