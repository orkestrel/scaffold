# Unit R4-AUDIT — objective audit of the mirrored charter fixes

## Role and engine
GPT-5.6 Sol, inside the journaled codex CLI. Perform the audit directly and spawn nothing.

## Objective
Attempt to refute the following numbered claims about commit `e22257c` in
`/home/user/scaffold`. Per-claim verdicts with evidence, one terminal line.

## Context
- The diff: `git -C /home/user/scaffold show e22257c`.
- The ruling: `.orkestrel/debrief/reconciliation.md` ruling 8, with findings S2, S6, S7, S9, O6,
  and O8/S8 in `.orkestrel/debrief/instr-audit-subjective.md` and `instr-audit-objective.md`.
- The role contract: `.agents/orchestration.md` §§ Roles and Permission floor at HEAD.
- The writer's report: `.orkestrel/debrief/r4-charters-report.md` — a claim under audit, not
  evidence, including its recorded mirror asymmetries.

## Claims
1. Every finding ruling 8 names has its fix present on the Claude side, matching the finding's
   content — not a paraphrase that drops a binding clause.
2. Every fix is mirrored to its Codex twin by work class, or the departure is one the report
   records with a reason the role contract supports.
3. No charter contradicts its role's contract-fixed job, tool allowlist, or the permission
   floor after the edit; every Claude `model:` field carries a Claude model alias only.
4. The authority pointer takes one form across the roster, and no charter restates the
   tedious-work ladder or the bench-journal retention rule beside it.
5. The added lines obey the writing law: directive form, no counts of growable sets, no
   banned-vocabulary hits in the banned sense.

## Scope
Read-only. No edits, no git state changes, no writes outside the bench journal directory.

## Output
Per-claim: `CONFIRMED` with evidence, or `BROKEN` with the exact line and the smallest correct
fix. Then exactly one terminal line: `AUDIT: PASS` or `AUDIT: FAIL`.
