# Unit R5-AUDIT — objective audit of the brief template commit

## Role and engine
GPT-5.6 Sol, inside the journaled codex CLI. Perform the audit directly and spawn nothing.

## Objective
Attempt to refute the following numbered claims about commit `2db1948` in
`/home/user/scaffold` (subject file `.agents/templates/brief.md`). Per-claim verdicts with
evidence, one terminal line.

## Context
- The diff: `git -C /home/user/scaffold show 2db1948 -- .agents/templates/brief.md`.
- The ruling: `.orkestrel/debrief/reconciliation.md` ruling 1, findings O1 and S5.
- The contract at HEAD: `.agents/orchestration.md` §§ "Required sections", "Check the brief
  before you send it", "Every dispatch is a file before it is a launch".
- The pre-shrink checklist the reminders condensed from:
  `git -C /home/user/scaffold show 68103e2:.agents/orchestration.md`, § "Check the brief before
  you send it".
- The writer's report: `.orkestrel/debrief/r5-template-report.md` — a claim under audit, not
  evidence.

## Claims
1. The template carries every section "Required sections" fixes, in its order, and every named
   scope row ruling 1 requires — `Owned`, `Shared (report-only)`, `Off-limits`, `What asserts
   the state this change ends`, `Standing conditions` — plus cheap-first criteria ordering with
   the regeneration exception, each row with an imperative reminder.
2. Every bullet of the post-shrink checklist at HEAD has a row or reminder in the template that
   carries its check; none is silently dropped.
3. The reminders carry the worked detail of the pre-shrink checklist without contradicting the
   post-shrink contract; where the template and the contract state the same obligation, the
   template's wording does not weaken it.
4. The template's own prose obeys the writing law for instruction files: directive form, no
   counts of growable sets, no negative contractions, no banned-vocabulary hits in the banned
   sense; placeholders are `UPPER_SNAKE_CASE`.
5. The template is fillable as one coherent form: no row contradicts another, the Execution
   section's transport lines cover the native-subagent reader and the bridge-driver reader, and
   the fill discipline in the preamble is executable as written.

## Scope
Read-only. No edits, no git state changes, no writes outside the bench journal directory.

## Output
Per-claim: `CONFIRMED` with evidence, or `BROKEN` with the exact line and the smallest correct
fix. Then exactly one terminal line: `AUDIT: PASS` or `AUDIT: FAIL`.
