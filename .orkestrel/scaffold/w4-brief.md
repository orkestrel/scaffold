# Unit W4 — the wiring moves to the canon and the plan gains its second overlap

## Role and engine

`implementer` on Opus 5, a native subagent, the sole serial writer (recorded substitution: the
Codex bench is dark).

## Objective

Move the harness wiring into `CANON_PATHS`, plan the catalog file explicitly, and restate the
overlap invariant — so the core project proves the new membership and the plan's canon-claiming
set.

## Context

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `tests.md`,
`writing.md`, `quality.md`. Skill: none. Guide: `guides/scaffold.md` (its prose is W6's; your
TSDoc is yours).

**Evidence.** The reconciled plan is `.orkestrel/scaffold/plan2.md`; the lane reports beside it
carry the verified code readings (the subjective report's question-1 table lists every consumer
of `isCanonPath` and why each is unaffected). Read all before editing. Baseline `6333f05`, all
gates green, `dist/` built.

**The ruled shape.**

- `CANON_PATHS` gains `.claude/agents`, `.codex/agents`, `.codex/config.toml`,
  `.cursor/mcp.json`, `.cursor/rules`, `.mcp.json`; `HOST_PATHS` loses them. `HOST_PATHS` keeps
  `.claude/settings.json`, `scripts/*.sh`, the toolchain dotfiles, `configs/helpers.ts`,
  `configs/policy.ts`, the vendored tests, `guides/guide.md`, `guides/scaffold.md`, `LICENSE`.
- `nameToHostArtifacts` returns
  `[...selectHostPaths(HOST_PATHS, name), CATALOG_AGENT_PATH]` mapped as today (`host` origin,
  `presence` ownership, `inferGroup`), with remarks stating why the one canon-resident file is
  planned: `catalog` requires it, `repair` restores its absence, and the canon directory it sits
  under stages it for the fallback. No new constant.
- The invariant restates as the three facts plan2 fixes: list disjointness (no member of either
  list equals or sits beneath a member of the other); the plan's deliberate overlaps, named
  (`AGENTS.md` and `CLAUDE.md` as template pointers, `.claude/agents/orkestrel.md` as the
  planned host file); and the rule the verbs obey — a target holds a file at a canon path only
  where the plan claims it. Rewrite the `CANON_PATHS` remarks to say this; drop "no host-origin
  artifact claims a canon path" everywhere it appears in your owned files.

**Standing conditions.** Suites outside `src:core` redden on the moved membership (fixtures and
CLI expectations are W5's; the inventory regeneration is the Orchestrator's). Do not touch them.
`tmp/` and `.orkestrel/` are records.

## Unknowns

None. A location that contradicts the lane reports' readings is a deviation — stop and report.

## Scope

**Owned.** `src/core/constants.ts`, `src/core/compilers.ts`, `src/core/helpers.ts` (remarks
only, if `isCanonPath` or `inferGroup` remarks go false), `tests/src/core/helpers.test.ts`,
`tests/src/core/compilers.test.ts`, `tests/src/core/Compiler.test.ts`,
`tests/src/core/templates.test.ts` (only if a pointer-body assertion reddens — none is
expected).

**Off-limits.** `src/server/**`, `src/bin/**`, `host.json`, `guides/**`, `README.md`,
`tests/setupServer.ts`, `tests/src/server/**`, `tests/src/bin/**`, `.orkestrel/**`, `tmp/**`.

**What asserts the state this change ends.** The disjointness and canon-claims cases in the
owned core tests (the empty-canon-claims assertions reverse to the named set); run `src:core` to
derive the rest.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. Run only `npm run check:src:core`,
`npm run test:src:core`, and single-file vitest runs. No build, no tree-wide mutating gate, no
commit or push, no `git checkout`/`restore`/`stash`/`reset`/`clean`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return: touched files with one-line summaries; the failing-first record (command, red count,
green count) for the membership and canon-claims assertions; scoped validation evidence;
deviation state. Write the same content to `tmp/units/w4-report.md`.

## Deviation contract

Stop and report when the stager, the compiler, or a test contradicts the lane reports' readings,
or when a fix needs an off-limits file. Wording within the ruled invariant is yours.

## Acceptance criteria

1. `npm run check:src:core` exits 0.
2. `npm run test:src:core` exits 0, with the new assertions: the lists share no member by prefix
   in either direction; `isCanonPath('.claude/agents/orkestrel.md')` is true and
   `isCanonPath('.claude/settings.json')` is false; `nameToHostArtifacts('router')` plans
   `CATALOG_AGENT_PATH` and plans no swept wiring path; the plan's canon-claiming paths are
   exactly `AGENTS.md`, `CLAUDE.md`, and `.claude/agents/orkestrel.md`.
3. `git status --porcelain` shows changes only in owned files.

**Observations, not criteria.** Whether `host.json` would move on this membership change alone
(the reports predict no move — same staged files, same storage names); the Orchestrator takes
that reading after integration. Other projects' reds.

## Review evidence

A code change: the actual diff and status output in the report.
