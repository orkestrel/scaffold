# Unit R1 — orchestration contract edits from the debrief

## Role and engine
`implementer` on Claude Opus 5, native subagent. You perform the assignment directly and spawn
nothing.

## Objective
Land every contract edit the debrief reconciliation assigns to R1 in
`/home/user/scaffold/.agents/orchestration.md`, in one commit-ready working-tree state.

## Context
- Read first: `AGENTS.md`, `.claude/rules/writing.md`, `.claude/rules/documentation.md`.
- The ruling record: `/home/user/scaffold/.orkestrel/debrief/reconciliation.md` — rulings 1, 2,
  3, 4, 5, 6, 7, and 9 name R1 as carrier (each states its content precisely).
- The lane findings behind them: `.orkestrel/debrief/instr-audit-subjective.md` (S1, S3, S4, S5,
  S10, S12, S13) and `.orkestrel/debrief/instr-audit-objective.md` (O1, O2, O3, O4, O5).
- The edits, by ruling:
  1. Ruling 1: shrink "Check the brief before you send it" to an imperative checklist naming each
     check and its trigger; the full worked prose moves to the R5 template (not yours — leave a
     one-line pointer to `.agents/templates/brief.md`, which R5 creates after you).
  2. Ruling 2: shrink "Where campaign artifacts live" § prune and "Before you prune" to the
     trigger, the path, and one pointer to
     `.agents/skills/orkestrel-debrief/references/retention.md` (R3 creates it after you). Use
     the term "campaign folder", not "ledger".
  3. Ruling 3: shrink "Publishing the fleet" to the laws that bind every executor (user
     credential, serialization, long-running-command binding, catalog-derived layer order) plus
     one pointer to the `orkestrel-publish` skill (R2 creates it after you). Land S4's boundary
     test as prose where the contract explains what stays contract versus skill: a line stays in
     the contract when an executor NOT doing that thing is worse off without it; it becomes a
     skill when it fires on a named trigger with one reader at one moment.
  4. Ruling 4: land the bench-starvation law in Bench laws: one `grok` lane at a time; a bench
     whose liveness probe answers while its lanes return empty is starved, not dark.
  5. Ruling 5: in the execution loop's audit step, name `reviewer` (subjective) and `analyst`
     (objective) as the audit lanes the way the design step names `planner` and `analyst`, with
     `checker` dispatched IN ADDITION when criteria are mechanical, never in place of a lane.
  6. Ruling 6: correct the adversarial-pass absolute sentence per S13 (the design round always
     runs both lanes; an audit round runs the lanes the audit step names).
  7. Ruling 7: declare `tmp/units/<unit>-brief.md` and `tmp/units/<unit>-report.md` as the native
     units' artifact home beside the bench directories; define the round's verdict file as
     `.orkestrel/<package>/<unit>-audit-verdict.md`; require successor-pair naming on every
     corrected unit before integration.
  8. Ruling 9: the Roles-table implementation cell reads `opus` (not `implementer` route
     `opus`), and beside the table: `implementer` names the harness's native implementation lane;
     engine-named bridges (`sol`, `opus`) name the other engine.
- Standing conditions: the fleet-visit wave may still be running in OTHER repos — irrelevant to
  you. Scaffold's tree is your only subject and is committed clean at dispatch.

## Unknowns
None: every edit's content is fixed by the named ruling. Where a ruling's wording leaves a
sentence-level choice, you decide it under the writing rules and record the choice in your report.

## Scope
- Owned: `.agents/orchestration.md` only.
- Off-limits: everything else. Pointers you write may name files R2, R3, and R5 create later;
  write the pointer, do not create the target.
- Tools: Read, Grep, Glob, Edit, Write, Bash (scoped validation only; no tree-wide mutating
  commands, no git state commands, no commit).

## Execution
Perform the edits directly. Spawn nothing.

## Output
Write `/home/user/scaffold/tmp/units/r1-contract-report.md`: what changed per ruling, any
sentence-level choices you made, and the validation you ran. Return the same content as your
final message.

## Deviation contract
Stop and report only when a ruling's edit conflicts with the contract's remaining text in a way
the reconciliation did not rule on. Ancillary placement choices (which paragraph, which heading)
are yours: decide, record, continue.

## Acceptance criteria
1. Every ruling listed has its edit present in `.agents/orchestration.md`.
2. No count violations, no banned vocabulary, per `AGENTS.md` § Writing and
   `.claude/rules/writing.md`.
3. `grep -n "ledger" .agents/orchestration.md` names only the routing and carry ledgers, never
   the campaign folder.
4. The report file exists.

## Review evidence
The auditor receives your diff (`git diff .agents/orchestration.md`) and the report. Do not run
git commands yourself; the Orchestrator captures the diff.
