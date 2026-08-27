# Unit W6 — documentation, canon content, and the instrument seam

## Role and engine

`implementer` on Opus 5, a native subagent, the sole serial writer. Documentation voice is this
engine's work class.

## Objective

Bring every shipped sentence into agreement with the wiring sweep — the canon membership, the
foreign-finding sweep, the retired advisory, the one-process visit — close the last dangling
reference in a kept file, and land the `prove` registration seam in the rule that owns the
instrument.

## Context

**Law.** `AGENTS.md` (§ Writing and § Instruction files bind everything here);
`.claude/rules/writing.md`, `documentation.md`, `tests.md`, `quality.md`. Skill: none. Guide:
`guides/scaffold.md` is the subject.

**Evidence.** The reconciled plan is `.orkestrel/scaffold/plan2.md`; the design lane reports
beside it carry the location tables (the subjective report's question-6 table is the working
list; the objective report's question-6 rows add the groups-table and STAGED_PATHS rows W5 may
have taken already — check `tmp/units/w5-report.md` for what W5 absorbed). The predecessor
reports are `tmp/units/w4-report.md` and `tmp/units/w5-report.md`. The shipped behavior you
document is what W4 and W5 landed: read the diffs their reports carry before writing a sentence
about a verb.

**Settled unknown, taken by the Orchestrator from the installed declarations on 2026-08-27.**
`@orkestrel/probe`'s `ProbeOptions` carries `readonly workspace?: string` — "Target workspace
root. Default: the current working directory."
(`node_modules/@orkestrel/probe/dist/src/core/index.d.ts:976-988`). The workspace is fixed at
server construction, and the `prove` call takes no per-call root. A probe server registered by
scaffold's `.mcp.json` therefore arms against scaffold's own projects, and after the sweep a
target session has no project registration by default.

**Re-baselined ruling, from W5's measurement.** Plan 2 named a git-ignored `.mcp.json` as the
target's restoration seam. W5 proved it survives every verb exactly as ruled — and stays a
`foreign` finding, so a target holding one never sees `audit` exit 0 again. The seam the
documentation states is therefore registration **outside the tree**: the harness's local or user
MCP scope (for Claude Code, `claude mcp add` outside project scope), naming the installed
`node_modules/@orkestrel/probe/dist/bin/main.js`. No repository file, no finding, survives every
visit by construction. The ignored-file behavior stays documented as one honest Limits sentence:
a file at a canon path is drift whoever wrote it, so a repository-local registration keeps
`audit` at exit 1.

**The prose that goes false, verified against the tree before W5** (re-verify line positions
against the tree you receive):

- `guides/scaffold.md` — the intro's target-holdings sentences; the groups table's
  `orchestration` row (names the harness wiring as vendored); the overlap paragraph (the plan
  now carries a second overlap, the catalog file); the ownership section's `.codex/config.toml`
  vendored example; the exit-codes and Git section (a canon leftover is foreign drift now); the
  whole `canon` question passage (its subject no longer exists); the vendored-data-root
  membership and disjointness prose and the move-to-canon paragraph's "no verb writes or deletes
  that copy"; the Limits entry "No verb removes a superseded instruction copy". W5 measured the
  advisory prose at lines 656, 689-697, 927-930, 1209, and 1502-1508 of the tree it returned —
  parity passes over them because it proves names, not sentences, so each is yours to rewrite.
- `README.md` — the split paragraph's membership list, and the `overwrite` verb passage (it now
  also deletes superseded canon copies).
- `ROADMAP.md` — the adoption-visit row collapses to re-pin, `scaffold overwrite`, gates.
- `.agents/skills/orkestrel-publish/references/wave.md` — the separate deletion step folds into
  the `scaffold overwrite` step; the "No scaffold verb deletes those copies" sentence and the
  rule-map red-gate warning dissolve, because repair and removal are one run.
- `.claude/agents/orkestrel.md` — the line "Read `.agents/orchestration.md` first" names a path
  no target has. Rewrite it the way the pointer pair resolves: the sibling
  `../scaffold/.agents/orchestration.md` when a scaffold checkout sits beside the repository,
  the installed `node_modules/@orkestrel/scaffold/dist/host/agents/orchestration.md` otherwise.
- `.claude/rules/quality.md` § Instruments — the `prove` rule fires on a question that can
  supply a project, a case, and a control; add the one line for the unregistered case: register
  the server through the workspace's own `.mcp.json` (ignored in a target), or follow
  `.claude/rules/tests.md` § Probes and report the fallback instrument's control and coverage.
  One home; restate it nowhere.

**What stays true and must not be weakened:** `repair` deletes nothing; untracked paths are
never deleted (the maintainer's seam); an emptied canon directory may remain on disk; deletion
is by path membership; a scoped audit reports nothing outside its groups.

**Standing conditions.** Your owned files include staged paths (`guides/scaffold.md`,
`.claude/rules/quality.md`, `.claude/agents/orkestrel.md`, the wave reference under
`.agents/skills`), so `host.json` goes stale as you edit and `test:config` — and any suite that
reads the floor — reds until the Orchestrator regenerates after integration. That red is not
yours. `tmp/` and `.orkestrel/` are records.

## Unknowns

None. A guide claim you must write that contradicts the behavior in the W4/W5 diffs is a
deviation — stop and report the sentence and the code.

## Scope

**Owned.** `guides/scaffold.md`, `README.md`, `ROADMAP.md`,
`.agents/skills/orkestrel-publish/references/wave.md`, `.claude/rules/quality.md`,
`.claude/agents/orkestrel.md`, `guides/README.md` (only if an index row names a renamed
section).

**Shared (report-only).** `tests/guides.test.ts` — the parity proof binds the guide, not the
reverse; a needed edit there is a deviation report.

**Off-limits.** `src/**`, `tests/**` beyond the shared row, `host.json`, `AGENTS.md`,
`CLAUDE.md`, `.agents/**` beyond the wave reference, `.claude/rules/**` beyond `quality.md`,
`package.json`, `.orkestrel/**`, `tmp/**` beyond your own report.

**What asserts the state this change ends.** `npm run test:guides` (parity and executed
fences); `npm run test:policy` (the rule-map and skill-inventory laws over your edited
instruction files).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. Run only `npm run test:guides`,
`npm run test:policy`, and single-file vitest runs. No build, no tree-wide mutating gate, no
commit or push, no `git checkout`/`restore`/`stash`/`reset`/`clean`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return: touched files with one-line summaries; each replaced claim with its old and new sentence
(or a hunk pointer for long passages); the guides and policy readings with exit codes; deviation
state. Write the same content to `tmp/units/w6-report.md`.

## Deviation contract

Stop and report when a required sentence would contradict the shipped code, when the parity
proof demands a `tests/guides.test.ts` edit, or when a fix needs an off-limits file. Section
placement, heading wording, and phrasing within the writing law are yours.

## Acceptance criteria

1. `npm run test:guides` exits 0.
2. `npm run test:policy` exits 0.
3. No owned file carries "No verb removes a superseded instruction copy", a `canon` question
   description, or a repository-relative `.agents/` read instruction outside scaffold's own
   sibling spelling.
4. `git status --porcelain` shows changes only in owned files.

**Observations, not criteria.** `test:config` (red until the Orchestrator regenerates the
inventory); the full `npm test` and build.

## Review evidence

A code and process-prose change: the actual diff and status output in the report.
