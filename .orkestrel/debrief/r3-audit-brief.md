# Unit R3-AUDIT — objective audit of the retention reference commit

## Role and engine
GPT-5.6 Sol, inside the journaled codex CLI. Perform the audit directly and spawn nothing.

## Objective
Attempt to refute the following numbered claims about commit `84e3d78` in
`/home/user/scaffold`. Per-claim verdicts with evidence, one terminal line.

## Context
- The diff: `git -C /home/user/scaffold show 84e3d78`.
- The rulings: `.orkestrel/debrief/reconciliation.md` rulings 2 and 12, with findings O3, S3,
  S15, and the S6 half in `.orkestrel/debrief/instr-audit-subjective.md` and
  `instr-audit-objective.md`.
- The contract pointer: `.agents/orchestration.md` § Where campaign artifacts live at HEAD.
- The writer's report: `.orkestrel/debrief/r3-debrief-refs-report.md` — a claim under audit, not
  evidence. The commit also carries two Orchestrator integration edits the report prescribed:
  the `tests/distribution.test.ts` row and the frontmatter-description vocabulary edit in the
  canonical and bridge `SKILL.md`; both are in scope.

## Claims
1. `references/retention.md` carries every item ruling 2 names: the carry, promotion,
   measurement, and orientation checks; the artifact locations including `tmp/units/`,
   `tmp/<bench>/`, test-run scratch, and the `ROADMAP.md`/`PROPOSAL.md` lifecycle; the `tmp/`
   sweep including prior-session residue; the promotion-record commit message; and the gate
   order in which the checks close the prune and the owner's go-ahead authorizes it.
2. The gate order is unambiguous: no sentence in the skill, its references, or the contract
   still permits a prune on consent alone or on checks alone.
3. Ruling 12 is closed: each lane names its holding role, each lens list has exactly one home,
   and no other file in the tree carries a copy of either lens list.
4. In the committed skill files, the campaign folder is never called a ledger; remaining
   `ledger` uses name a record of units or findings, not the folder.
5. The `tests/distribution.test.ts` row matches the staged file exactly and holds the array's
   sort order; the frontmatter description is byte-identical between canonical and bridge.
6. The added lines obey the writing law: directive form, no counts of growable sets, no
   banned-vocabulary hits in the banned sense.

## Scope
Read-only. No edits, no git state changes, no writes outside the bench journal directory.

## Output
Per-claim: `CONFIRMED` with evidence, or `BROKEN` with the exact line and the smallest correct
fix. Then exactly one terminal line: `AUDIT: PASS` or `AUDIT: FAIL`.
