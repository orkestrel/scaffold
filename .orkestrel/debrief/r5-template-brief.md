# Unit R5 — the brief template

## Role and engine
`implementer` on Claude Opus 5, native subagent. You perform the assignment directly and spawn
nothing.

## Objective
Create `/home/user/scaffold/.agents/templates/brief.md`: the dispatch-brief template the
contract's preflight checklist (landed by R1) points to.

## Context
- Ruling 1 in `/home/user/scaffold/.orkestrel/debrief/reconciliation.md` (findings O1 and S5).
- R1 has landed: read `.agents/orchestration.md` §§ "Dispatch anatomy" → "Required sections" and
  "Check the brief before you send it" AFTER its shrink, so the template carries the worked
  detail the contract now only names.
- The template's required shape: every section from "Required sections", plus named scope rows
  the writer cannot leave blank — `Owned`, `Shared (report-only)`, `Off-limits`, `What asserts
  the state this change ends`, `Standing conditions`, and criteria ordered cheap-first with the
  regeneration exception. Each row carries a one-line imperative reminder of the check that
  fills it (drawn from the pre-shrink checklist — recover wording from git history of
  `.agents/orchestration.md` if useful: `git log -p` is permitted read-only).
- A template is an instruction file: `AGENTS.md` § Instruction files and
  `.claude/rules/writing.md` govern. Placeholders in `UPPER_SNAKE_CASE`.

## Unknowns
Whether `.agents/templates/` needs a directory note for the policy sweep. Check
`tests/policy.test.ts` and `tests/setupPolicy.ts` for how unknown `.agents/` entries are treated;
report what you find. If the sweep refuses the new directory, stop and report (deviation) rather
than editing the policy.

## Scope
- Owned: `.agents/templates/brief.md` (new file, new directory).
- Off-limits: `.agents/orchestration.md` (R1 already wrote its pointer), the policy tests, the
  host inventory.
- Tools: Read, Grep, Glob, Write, Bash (read-only git history, scoped validation); no commit.

## Execution
Perform the work directly. Spawn nothing.

## Output
Write `/home/user/scaffold/tmp/units/r5-template-report.md`: the template's section list, where
each preflight check landed, the policy-sweep finding, validation run. Return the same content
as your final message.

## Deviation contract
Stop and report if the policy sweep or config proof refuses the new path, or if R1's pointer
names a different path than `.agents/templates/brief.md`. Wording choices are yours.

## Acceptance criteria
1. `.agents/templates/brief.md` exists and carries every required section and every named scope
   row with its imperative reminder.
2. No template TODOs; no banned vocabulary; no counts.
3. The report file exists.

## Review evidence
The auditor receives your diff (new-file content) and the report; the Orchestrator captures it.

## Standing conditions

- `test:config` is red at HEAD: the committed host inventory is stale for `.agents/orchestration.md` and `.claude/rules/documentation.md`. The Orchestrator regenerates `host.json` once at integration. Do not run `test:config`, and do not diagnose that red as yours.
