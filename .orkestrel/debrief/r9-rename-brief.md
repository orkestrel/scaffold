# Unit R9 — rename orkestrel-human-journey to orkestrel-prove-journey

## Role and engine
`builder` (native cheap tier), subagent. You perform the assignment directly and spawn nothing.

## Objective
Rename the skill so it satisfies the naming rule in `.claude/rules/documentation.md` § Workflow
skills: `orkestrel-human-journey` → `orkestrel-prove-journey`, everywhere the tree names it
except the files listed off-limits.

## Context
- The ruling: `/home/user/scaffold/.orkestrel/debrief/re-baseline-1.md`. The finding behind it:
  `.orkestrel/debrief/r7-naming-report.md` § "Finding: orkestrel-human-journey does not satisfy
  the rule" — it lists every referrer with evidence.
- The moves and edits:
  - `git mv .agents/skills/orkestrel-human-journey .agents/skills/orkestrel-prove-journey`
  - `git mv .claude/skills/orkestrel-human-journey .claude/skills/orkestrel-prove-journey`
  - Frontmatter `name` in the canonical and the bridge `SKILL.md`: the new directory name (the
    rule fixes `name` to the directory name; bridge carries the canonical `name` verbatim).
  - The bridge's named canonical path: `.agents/skills/orkestrel-prove-journey/SKILL.md`.
  - `agents/openai.yaml` `default_prompt`: `$orkestrel-human-journey` → `$orkestrel-prove-journey`.
  - Referrers: `guides/test.md` and `tests/distribution.test.ts` — update the name where it
    appears; change nothing else in either file.
- Read first: `.claude/rules/documentation.md` § Workflow skills, `AGENTS.md` § Instruction
  files.

## Unknowns
None; R7's report enumerated the referrer set with a repository-wide sweep.

## Scope
- Owned: the moved skill directories (canonical and bridge), the name lines in `guides/test.md`
  and `tests/distribution.test.ts`.
- Off-limits: `host.json` and `dist/**` (integration regenerates them), `.orkestrel/**`, every
  other skill and rule.
- Tools: Read, Grep, Glob, Edit, Write, Bash (`git mv` and scoped read-only validation); no
  commit.

## Execution
Perform the work directly. Spawn nothing.

## Standing conditions
- `test:config` is red at HEAD on the stale host inventory; `host.json` also still names the OLD
  skill path — both are the Orchestrator's integration regen. Do not run `test:config`.
- `tests/distribution.test.ts` asserts packed contents; run no pack. Edit the name and leave the
  proof to the integration gates.

## Output
Write `/home/user/scaffold/tmp/units/r9-rename-report.md`: every path moved and line edited, and
the sweep result. Return the same content as your final message.

## Deviation contract
Stop and report if the old name appears in a file this brief neither owns nor lists off-limits.

## Acceptance criteria
1. `grep -rn "orkestrel-human-journey" /home/user/scaffold --include="*.md" --include="*.ts" --include="*.yaml" --include="*.json"` hits only `.orkestrel/**`, `dist/**`, `host.json`, and `tmp/**`.
2. The moved directories carry the complete prior content with only the name-bearing lines
   changed.
3. The report file exists.

## Review evidence
The auditor receives your diff and the report; the Orchestrator captures it.
