# Unit R10 — bound the enterprise-bootstrap trigger

## Role and engine
`implementer` on Claude Opus 5, native subagent. You perform the assignment directly and spawn
nothing.

## Objective
Bound the `enterprise-bootstrap` skill's trigger against `orkestrel-polish-surface`, in the
`description` the skills carry, so a dispatcher choosing between them has a rule rather than a
guess.

## Context
- The unrouted half of finding S14: read it in
  `/home/user/scaffold/.orkestrel/debrief/instr-audit-subjective.md`, and R7's routing note in
  `.orkestrel/debrief/r7-naming-report.md` § "The enterprise-bootstrap ruling".
- Read both skills' `SKILL.md` frontmatter and bodies first: the bounding states when
  `enterprise-bootstrap` fires (building or restyling a Bootstrap-framework surface in a host
  project) and defers polish of an existing Orkestrel surface to `orkestrel-polish-surface`.
  Derive the exact wording from what the two bodies actually cover; the sentence lives in the
  `description` (frontmatter) where the dispatcher reads it, within the single-line or `>-`
  shape the rule fixes.
- The bridge carries the canonical `description` verbatim — update both. Update
  `agents/openai.yaml` `short_description` only if it repeats the unbounded trigger.
- Read first: `.claude/rules/documentation.md` § Workflow skills, `AGENTS.md` § Writing.

## Unknowns
Whether the yaml `short_description` needs the same bounding; you rule from its current text and
record the ruling.

## Scope
- Owned: `.agents/skills/enterprise-bootstrap/SKILL.md` (frontmatter description only),
  `.agents/skills/enterprise-bootstrap/agents/openai.yaml` (only if ruled),
  `.claude/skills/enterprise-bootstrap/SKILL.md` (description parity only).
- Off-limits: both skills' bodies, `orkestrel-polish-surface/**`, everything else.
- Tools: Read, Grep, Glob, Edit; Bash for scoped validation only; no commit.

## Execution
Perform the work directly. Spawn nothing.

## Standing conditions
- `test:config` is red at HEAD on the stale host inventory; the Orchestrator regenerates at
  integration. Do not run `test:config`, and do not diagnose that red as yours.

## Output
Write `/home/user/scaffold/tmp/units/r10-bounding-report.md`: the description before and after,
the yaml ruling, validation run. Return the same content as your final message.

## Deviation contract
Stop and report if the bounding cannot be stated without contradicting either skill's body.

## Acceptance criteria
1. The `description` names the trigger and the boundary, keeps its `Use ` sentence, and stays in
   the permitted YAML shape.
2. Canonical and bridge descriptions are byte-identical.
3. The report file exists.

## Review evidence
The auditor receives your diff and the report; the Orchestrator captures it.
