# Unit u1-arrays — report (writer return + acceptance)

Writer: `implementer`, Opus 5 (recorded substitution for dark Sol). Returned 2026-09-01.

## What the writer landed

`readArrayEntries` in `src/core/helpers.ts`: parallel `keys` list, `ascending` flag with a
`previous` cursor, `ascending ? collected : sortValues(collected)`, and the reused verified key
string on the ascending path with the own-membership re-check and every refusal intact. One
added case in `tests/src/core/helpers.test.ts`: a descending-`ownKeys` proxy over a real array
reads identically to an ordinary copy, with a membership-read recorder asserting the canonical
read order — added because the writer proved the brief's snapshot-parity shape could not fail
for a defeated sort branch (recorded brief defect; the recorder assertion is the discriminating
pin). Scoped gates the writer ran: core typecheck clean, helpers file 217 passed, oxfmt and
oxlint clean on the owned files.

## Orchestrator acceptance evidence

- Parity: base859 dist vs rebuilt tree dist — IDENTICAL over 1170 comparisons
  (`u1-acceptance.out`).
- Paired A/B (49 rounds): medium `is` B/A median 0.917; list-48 `is` 0.924; list-48 `audit`
  0.910; deep `is` 0.967. The declared 8% bar on medium `is` clears.
- Mutation control reproduced first-hand by the Orchestrator: removing
  `if (index <= previous) ascending = false` reddens exactly the added case
  (1 failed | 216 passed); the exact inverse edit restores 217 passed.

## Audit-round ruling

The unit adopted the probe-proven prescription verbatim (`u1-patch.mjs` template), so per
`.claude/rules/quality.md` § Rounds and verdicts the reproduced mutation probe closes the round
in place of a fresh cross-engine audit, and the added case is the committed regression guard.
Recorded here as the round's verdict; no lane ran, and none was owed under that rule.
