# Unit R8 — transport contracts out of the dispatchable roster

## Role and engine
`implementer` on Claude Opus 5, native subagent. You perform the assignment directly and spawn
nothing.

## Objective
Move the never-dispatched transport contracts out of the agent rosters:
`.claude/agents/codex.md` → `.agents/transports/codex.md`, and the Codex-side Opus transport
(`.codex/agents/claude.toml` or its actual name — verify) → `.agents/transports/claude.md`.
Update every referrer.

## Context
- Ruling 10 in `/home/user/scaffold/.orkestrel/debrief/reconciliation.md` (finding S11 in
  `.orkestrel/debrief/instr-audit-subjective.md`): the harness lists dispatchable agents from
  `.claude/agents/`, and a never-dispatch contract in that listing is a standing trap.
- The movers keep their content (R4's charter fixes have landed — carry the CURRENT bytes). The
  Codex-side transport converts from its current format to Markdown if its content survives
  intact; record the conversion.
- Referrers: sweep `.claude/agents/*.md`, `.codex/agents/*`, `.agents/orchestration.md`,
  `CLAUDE.md`, `.codex/config.toml`, and the skills tree for references to the moved paths and
  the `codex`/`claude` role names used AS transport contracts; update each to the new path.
  `.agents/orchestration.md` § Roles describes the transport-contract mirroring — update its
  wording to the new home (this is the ONE orchestration.md edit granted to this unit; keep it to
  the sentences that name the moved files).
- Read first: `AGENTS.md` § Instruction files, `.claude/rules/writing.md`,
  `.agents/orchestration.md` § Roles.

## Unknowns
Whether the Claude harness caches agent listings (irrelevant to the file move; note only).
Whether any test (policy sweep) pins the roster's membership — check `tests/setupPolicy.ts` and
`tests/policy.test.ts` for agent-roster assertions and report what you find; if a test pins the
old path, the test moves with the file IN THIS UNIT (grant extends to that assertion only).

## Scope
- Owned: `.agents/transports/**` (new), `.claude/agents/codex.md` (delete after move),
  `.codex/agents/<transport file>` (delete after move), referrer lines in the files the Context
  names, and any policy-test assertion that pins the moved paths.
- Off-limits: role charters' content (R4 landed them; you move bytes, not meaning).
- Tools: Read, Grep, Glob, Edit, Write, Bash (scoped validation, `git mv` permitted); no commit.

## Execution
Perform the work directly. Spawn nothing.

## Output
Write `/home/user/scaffold/tmp/units/r8-transports-report.md`: the moves, every referrer updated
(file:line), the policy finding, the conversion notes, validation run. Return the same content
as your final message.

## Deviation contract
Stop and report if a referrer's update would change a dispatch route's meaning (a brief or skill
that dispatches `codex` as a ROLE rather than referencing the transport file), or if the sweep
finds the moved name in a vendored-host manifest whose regeneration this unit cannot run.

## Acceptance criteria
1. Old paths gone; new paths carry the current content; every referrer names the new path.
2. `grep -rn "agents/codex.md\|agents/claude.toml" /home/user/scaffold --include="*.md" --include="*.toml"` (excluding `.orkestrel/` and git history) names only the new homes.
3. The report file exists.

## Review evidence
The auditor receives your diff and the report; the Orchestrator captures it.

## Standing conditions

- `test:config` is red at HEAD: the committed host inventory is stale for `.agents/orchestration.md` and `.claude/rules/documentation.md`. The Orchestrator regenerates `host.json` once at integration. Do not run `test:config`, and do not diagnose that red as yours.

## Patches riding this unit (from R4's report)

Apply both to the MOVED Claude-side transport file (`.agents/transports/codex.md`), exactly as
given in `.orkestrel/debrief/r4-charters-report.md` § "Shared and off-limits file patches":

1. The authority-pointer form: replace the line
   `You dispatch the external Codex Sol bench. Read `.agents/orchestration.md` first.`
   with the split form ending `It owns the role set, the routing, and the dispatch contract.`
2. The `tmp/codex/` retention trim: replace the three-line retention paragraph with the two-line
   pointer to `.agents/orchestration.md` § Bench laws, as the report states it.

Read the report's patch section for the exact replacement text and apply it byte-for-byte.
