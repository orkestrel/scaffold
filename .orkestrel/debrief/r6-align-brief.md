# Unit R6 — align-packages authority order

## Role and engine
`builder` (native cheap tier), subagent. You perform the assignment directly and spawn nothing.

## Objective
Land ruling 13's authority-order correction in the `orkestrel-align-packages` canonical skill.

## Context
- Ruling 13 in `/home/user/scaffold/.orkestrel/debrief/reconciliation.md` adopts finding O7 in
  `.orkestrel/debrief/instr-audit-objective.md` — read O7 for the exact correction; it is
  fully specified there.
- The skill: `.agents/skills/orkestrel-align-packages/SKILL.md` and its references.
- Read first: `AGENTS.md` § Instruction files, `.claude/rules/writing.md`.

## Unknowns
None.

## Scope
- Owned: `.agents/skills/orkestrel-align-packages/**`.
- Off-limits: everything else, including the bridge.
- Tools: Read, Grep, Glob, Edit; no commit.

## Execution
Perform the edit directly. Spawn nothing.

## Output
Write `/home/user/scaffold/tmp/units/r6-align-report.md`: the exact edit, before and after.
Return the same content as your final message.

## Deviation contract
Stop and report if O7's correction does not match the skill's text as found (the finding may
describe a line that moved).

## Acceptance criteria
1. O7's correction is present; no other content moved.
2. The report file exists.

## Review evidence
The auditor receives your diff and the report; the Orchestrator captures it.

## Standing conditions

- `test:config` is red at HEAD: the committed host inventory is stale for `.agents/orchestration.md` and `.claude/rules/documentation.md`. The Orchestrator regenerates `host.json` once at integration. Do not run `test:config`, and do not diagnose that red as yours.
