# Unit R4 — mirrored charter fixes

## Role and engine
`implementer` on Claude Opus 5, native subagent. You perform the assignment directly and spawn
nothing.

## Objective
Land ruling 8's charter fixes across the Claude role files and mirror each into its Codex twin.

## Context
- Ruling 8 in `/home/user/scaffold/.orkestrel/debrief/reconciliation.md`; the findings named
  there (S2, S6, S7, S9, O6, O8/S8) carry the exact content — read them in
  `.orkestrel/debrief/instr-audit-subjective.md` and `instr-audit-objective.md`.
- The fixes:
  - `checker`: the falsify-shape clause (per-claim verdicts with evidence) and the referral
    vocabulary the finding specifies.
  - `planner`: the escape clause and the contract pointer.
  - One authority-pointer form across the roster (every role file points to the contract the same
    way).
  - Bridge role descriptions (`grok`, `analyst`, `sol`, `codex`) rewritten as the DRIVER's job —
    what the driver does (carry the brief, launch, journal, return), not what the far engine does.
  - `orkestrel`: narrowed to reconciliation over supplied evidence.
  - Root-reference trims: the restated fallback ladder and `tmp/` retention lines the findings
    name — each rule keeps one home.
- Mirror map: `.claude/agents/<role>.md` ↔ `.codex/agents/<role>.toml` (verify the Codex side's
  actual layout with Glob first; mirror by work class, and transport contracts are
  provider-specific — do not force a Codex mirror onto a Claude-only transport file).
- Read first: `AGENTS.md` § Instruction files, `.claude/rules/writing.md`,
  `.agents/orchestration.md` § Roles.

## Unknowns
The exact Codex-side file shapes; you verify them before editing and mirror content, not syntax.

## Scope
- Owned: `.claude/agents/*.md`, `.codex/agents/*` — EXCEPT `.claude/agents/codex.md` beyond its
  description line (R8 moves that file later; description-level edits it inherits are fine).
- Off-limits: `.agents/orchestration.md`, skills, rules other than none (no rule edits in this
  unit).
- Tools: Read, Grep, Glob, Edit, Write, Bash (scoped validation only); no commit.

## Execution
Perform the work directly. Spawn nothing.

## Output
Write `/home/user/scaffold/tmp/units/r4-charters-report.md`: per-finding landing site (file and
section) on both sides, any mirror asymmetry you chose and why, validation run. Return the same
content as your final message.

## Deviation contract
Stop and report if a finding's fix contradicts a role's tool allowlist or charter in a way the
ruling did not anticipate. Placement and wording are yours.

## Acceptance criteria
1. Every named fix present on the Claude side and mirrored on the Codex side (or the asymmetry
   recorded with its reason).
2. Frontmatter stays valid: Claude `model:` fields keep Claude models only.
3. The report file exists.

## Review evidence
The auditor receives your diff and the report; the Orchestrator captures it.

## Standing conditions

- `test:config` is red at HEAD: the committed host inventory is stale for `.agents/orchestration.md` and `.claude/rules/documentation.md`. The Orchestrator regenerates `host.json` once at integration. Do not run `test:config`, and do not diagnose that red as yours.
