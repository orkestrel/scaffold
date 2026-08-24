# Unit R7 — workflow-skill naming axes

## Role and engine
`implementer` on Claude Opus 5, native subagent. You perform the assignment directly and spawn
nothing.

## Objective
Land the skill-naming rule in `/home/user/scaffold/.claude/rules/documentation.md` § Workflow
skills, and rule on `enterprise-bootstrap` under it.

## Context
- Ruling 11 in `/home/user/scaffold/.orkestrel/debrief/reconciliation.md` (finding S14 in
  `.orkestrel/debrief/instr-audit-subjective.md`).
- The rule: subject skills take `orkestrel-<verb>-<noun>` (the verb acts on the noun);
  Orchestrator-process skills take `orkestrel-<verb>`. Existing names already satisfy it
  (`orkestrel-harden-package`, `orkestrel-debrief`, `orkestrel-falsify`); the rule makes the two
  axes explicit for the next skill author.
- `enterprise-bootstrap` sits outside both forms. Ruling 11 says rule on it where it lives: state
  in your report whether it renames (to what) or stays as the recorded exception and why; do NOT
  rename it in this unit — a rename is its own bounded unit with bridge, yaml, and referrer
  moves.
- Read first: `AGENTS.md` § Writing, `.claude/rules/writing.md`,
  `.claude/rules/documentation.md` § Workflow skills.

## Unknowns
Whether `documentation.md`'s existing § Workflow skills list order gives the rule a natural slot;
you place it.

## Scope
- Owned: `.claude/rules/documentation.md` only.
- Off-limits: every skill directory, every bridge, `enterprise-bootstrap`.
- Tools: Read, Grep, Glob, Edit; Bash for scoped validation only; no commit.

## Execution
Perform the edit directly. Spawn nothing.

## Output
Write `/home/user/scaffold/tmp/units/r7-naming-report.md`: the landed rule text, the
`enterprise-bootstrap` ruling with its reason, validation run. Return the same content as your
final message.

## Deviation contract
Stop and report only if the rule contradicts an existing documented skill name — that would mean
the axes are wrong, not the name. Placement choices are yours.

## Acceptance criteria
1. The rule appears once, in § Workflow skills, in directive form.
2. Every existing `.agents/skills/` directory name is consistent with the rule or named in your
   report as the recorded exception.
3. The report file exists.

## Review evidence
The auditor receives your diff and the report; the Orchestrator captures the diff.
