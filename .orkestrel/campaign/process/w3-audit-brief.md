# Unit W3-AUDIT — objective audit of the process refusal-evidence commit

## Role and engine

GPT-5.6 Sol, inside the journaled codex CLI, read-only. Perform the audit directly and spawn
nothing. Your sandbox denies grandchild processes, so you cannot run the spawn suites — audit
from the source, the diff, and the writer's recorded evidence, and say so where a claim would
need a run you cannot take. The Orchestrator has already taken the authoritative host runs:
`ProcessManager.test.ts` scoped run green, `npm run test:src` 149 passed, `npm run test:guides`
100 passed.

## Objective

Attempt to refute the following numbered claims about commit `32cfd69` in
`/home/user/orkestrel/process`. Per-claim verdicts with evidence, one terminal line.

## Context

- The diff: `git -C /home/user/orkestrel/process show 32cfd69`.
- The writer's report: `tmp/units/w3-report.md` — a claim under audit, not evidence.
- The ruling it implemented: `.orkestrel/campaign/plan.md` ruling 3 in `/home/user/scaffold`
  (read-only), with the ROADMAP rows at `/home/user/scaffold/ROADMAP.md:71-75`.
- Law: the vendored `.claude/rules/tests.md` and `writing.md` in this repository.

## Claims

1. The strengthened case proves the spawn happened: a mutation that prevents the child spawn
   while preserving the `protocol` refusal and the empty registry fails the case. Judge from the
   case's structure whether any such mutation OTHER than the writer's recorded one would pass —
   the recorder fires only on a real child's terminal event, or name a path where it fires
   without a spawn.
2. The registered-child control discriminates: an uninstalled or broken `on` hook is separated
   from an absent child by the control, not conflated.
3. The platform fork, marker file, and scratch plumbing are gone from the case, and nothing else
   in the file lost coverage in the move (`git show` the parent's version of the case and
   compare the asserted properties).
4. The guide passage states the placement ruling and the contended-run sizing without banned
   vocabulary, without counts of growable sets, and without naming a nonexistent export.
5. The writer's finding that this case and the case at `:263` (parent numbering) carry
   overlapping claims is accurate, and merging them into one case would lose no asserted
   property — or name the property a merge would lose.
6. The writer's finding that the sibling case's `waitForCondition` budget cannot expire under
   the default test timeout is accurate as the file stands after the commit.

## Scope

Read-only. No edits, no git state changes, no writes outside the bench journal directory.

## Output

Per-claim: `CONFIRMED` with evidence, or `BROKEN` with the exact line and the smallest correct
fix. For claims 5 and 6, end each with `ADOPT` or `DROP` as your recommendation on the finding.
Then exactly one terminal line: `AUDIT: PASS` or `AUDIT: FAIL`.
