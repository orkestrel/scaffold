# Unit LEDGER (`cl`), round 2 — the guide sentences, the TSDoc nouns, and the keyframe addition path

## Role and engine

`opus` on Opus 5.5, the same native subagent that wrote round 1, in the worktree `/home/user/veneer-cl`
(branch `unit/cl`, round 1's edits uncommitted over `42fd88e`).

## What changed and why

Round 1's audit (`/home/user/scaffold/.orkestrel/veneer/units/cl-audit-verdict.md`) confirmed the
readers, the gates, the condition-keyed priority, and the prototype-free maps. It broke claim 6 on the
guide and claim 7 on the report, and carried F1, F2, and two referrals. This brief carries L-a to L-c;
round 1's brief (`b-cross-cl-brief.md`) stands for everything this one does not change.

## Objective

- **L-a — the guide.** In `cl-shared.patch`'s guide hunks: reflow every added line to the guide's
  100-column width; rewrite the § Files row so it names the tables `tests/setupServer.ts` reads, and let
  the table reflow if the wording needs it; rewrite the § Keyframes routing sentence to state that the
  parity case refuses any animation the inventory does not record under a shipped key, and that the
  `collectAdditions` function throws naming it; write "Each written treatment" where the sentence covers
  the `placeholder-glow` and `placeholder-wave` rows.
- **L-b — the TSDoc and the case title.** Give each member token in the added TSDoc on the
  `ConditionRow`, `KeyframesRow`, and `OracleInventory` types its noun ("the `condition` member").
  Retitle the conformance case "carries every shipped component selector and custom property in the
  built cascade" so it also names the recorded animations it checks.
- **L-c — the keyframe addition path.** Make the `collectAdditions` function refuse, with its throw, any
  keyframe the inventory records under no shipped key, so it agrees with the parity case; remove the
  branch that returns a keyframe as an addition, and remove the `keyframes` member of the
  `AdditionCategory` type only if no other reader or case uses it (report the search). Measure whether
  any shipped key records keyframes and carries no shipped selector row; if one does, make the presence
  gate cover it, with a proof that reddens on the plant.

## Context

Law, host, and tools as round 1's brief states. The evidence: the three lane verdicts beside the
reconciled verdict. Each changed proof runs red first on its plant, and each red run is retained in
`tmp/units/cl-mutations-2.log.txt`.

## Scope

As round 1: owned `tests/setupServer.ts` and `tests/setupServer.test.ts`; shared (report-only) the files
`cl-shared.patch` touches. Return one `cl-shared-2.patch` against `42fd88e` that supersedes
`cl-shared.patch` whole. Off-limits as round 1.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-cl/tmp/units/cl-report-2.md` and the same text as the final message: each
item's change, before and after for every rewritten sentence; the L-c search and measurement; the red
run of each changed proof; each gate's command exactly as it ran, its exit, and its result line;
`cl-2.diff`, `cl-2-status.txt`, and `cl-shared-2.patch` under `tmp/units/`. The report states no tally
of a growable set and no temporal word, and follows every code token with a noun, list labels included.

## Deviation contract

As round 1. Decide, record, and carry on for the exact wording of each rewritten sentence and title.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 in a scratch copy under
   `tmp/probe/` with `cl-shared-2.patch` applied.
2. `npm run test:setup` exits 0, and the L-c proof reddens on its plant.
3. `npm run build:src`, then `npm run test:conformance` and `npm run test:guides`, exit 0 in the scratch
   copy; no added guide line passes column 100 (`awk 'length > 100'` over the patched guide's changed
   lines, printed in the report).

## Review evidence

`cl-2.diff`, `cl-2-status.txt`, `cl-shared-2.patch`, `cl-report-2.md`, and `cl-mutations-2.log.txt`.
