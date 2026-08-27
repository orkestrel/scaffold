# Unit W5 — superseded canon copies become foreign findings; the advisory retires

## Role and engine

`implementer` on Opus 5, a native subagent, the sole serial writer (recorded substitution: the
Codex bench is dark).

## Objective

Extend the audit's target snapshot so an unplanned canon path present in a target is a
group-scoped `foreign` finding, let the existing `overwrite` deletion take the tracked ones in
the same run that repairs the pointers, delete `#canonQuestion`, and pin every control — so the
server and bin projects are green and the fleet visit's success condition is mechanical.

## Context

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `typescript.md`, `architecture.md`,
`patterns.md`, `tests.md`, `writing.md`, `quality.md`. Skill: none. Guide: `guides/scaffold.md`
(its prose is W6's).

**Evidence.** The reconciled plan is `.orkestrel/scaffold/plan2.md`; the design lane reports
beside it carry the verified readings — read the subjective report's question-3 section (the
`#derive` extension, the reuse of `remove`, the negative-control table) and the objective
report's question-2 and question-3 sections (the per-member semantics its lane derived; where
the two disagree, plan2's rulings win). The predecessor unit's report is
`tmp/units/w4-report.md` — the membership and the planned catalog file are landed and green in
`src:core`. Baseline: the committed tree the dispatch names.

**The ruled shape.**

- `Materializer.#derive` extends the target reading with a second source beside the expanded
  host directory roots: each `CANON_PATHS` member that resolves in the target — its files when
  it is a directory (recursing the way host roots are listed), itself when it is a file — gated
  by the plan's selected groups through `inferGroup`. Planned paths already sit in the snapshot
  population and pair with their artifacts, so the pointer pair and the catalog file never reach
  `foreign`.
- No new public method, no new `Drift` member, no new `Finding` field, no new result field.
  `remove` takes the tracked candidates through the one existing transaction;
  `matchesProtectedPath` and the tracked-set narrowing apply unchanged; untracked paths are
  never deleted.
- `#canonQuestion` and its call site go; no `canon` question value remains anywhere in `src/`.
  The fetch-list filter keeps `isCanonPath` (the overlay half is untouched).
- Deletion is by path membership, never byte identity.
- TSDoc: `remove` and `audit` remarks state the canon population and the untracked-leftover
  rule; the `foreign` remarks in `src/core/types.ts` are report-only for you — return a patch if
  they go false rather than editing core.

**The control table.** Each row is a test named for what it proves:

| Control | Must report |
| --- | --- |
| Tracked `.claude/rules/names.md` leftover beside the pointer pair | `audit` reports it `foreign` in its group and exits 1; `overwrite --dirty` lists it in `removed`; a second `audit` exits 0 |
| `.claude/agents` holding the catalog file plus a tracked `planner.md` | `planner.md` is `foreign` and removed; the catalog file is neither |
| A drifted `AGENTS.md` pointer | `repair`ed in the same `overwrite` run, absent from `removed` |
| An edited catalog file | Present, bytes kept, markers still found by `catalog` |
| A git-ignored `.mcp.json` the target wrote | Present after the run, absent from `removed`, not a dirty refusal |
| An untracked unignored canon leftover | Refused as dirty without `--dirty`; with `--dirty` the file survives and stays a finding |
| Planted `src/` and `app/` files | Untouched (the existing protection control stands) |
| A canon leftover under `--groups tests` | Not in the snapshot, not a finding, not a candidate |
| `repair` on a tree with leftovers | Leftovers untouched, exit reflects the findings, nothing deleted |

**Standing conditions.** `tests/src/bin/CLI.test.ts` expectations tied to the old advisory and
fetch-list witnesses are yours to repin. The vendored policy and config suites are outside this
unit; `test:config` red on a stale inventory is the Orchestrator's regeneration, not yours.
`tmp/` and `.orkestrel/` are records. The Orchestrator verified after W4's integration that
`npm run build` reproduces `host.json` byte-identically, so the inventory is not a standing red.

**W4's measured break-set, yours to absorb** (from `tmp/units/w4-report.md`, read statically by
that unit): `tests/setupServer.ts:1136` — `buildFleetManifest`'s `path === '.claude/agents'`
branch is unreachable and the fleet manifest must emit the catalog file the plan claims;
`tests/setupServer.ts:1113` remark; `tests/src/server/helpers.test.ts:164`, `:175`, `:201`, and
`:1553-1563`; `src/bin/CLI.ts:1425` — the advisory this unit deletes momentarily names
`.claude/agents` wholesale at the baseline; `tests/src/bin/CLI.test.ts:757-761`, `:2468`,
`:2503`.

**Carrier obligation.** `src/core/helpers.ts` `isCanonPath` remarks name "the executable's
advisory", which this unit's deletion makes false. The file is shared (report-only): return the
exact remark patch with your report.

## Unknowns

- The audit bounds: the subjective report flags `MAX_AUDIT_FINDINGS` and
  `MAX_TOTAL_ARTIFACT_BYTES` against a target holding the full pre-split canon. Take the
  reading with a fixture and report it as an observation.

## Scope

**Owned.** `src/server/Materializer.ts`, `src/server/helpers.ts` (remarks only if one goes
false), `src/bin/CLI.ts`, `tests/setupServer.ts`, `tests/src/server/Materializer.test.ts`,
`tests/src/server/helpers.test.ts`, `tests/src/bin/CLI.test.ts`.

**Shared (report-only).** `src/core/types.ts` (the `foreign` remarks), `src/core/helpers.ts`.
Return exact patches.

**Off-limits.** `src/core/constants.ts`, `src/core/compilers.ts`, `host.json`, `guides/**`,
`README.md`, `tests/policy.test.ts`, `tests/config.test.ts`, `.orkestrel/**`, `tmp/**` beyond
your own report.

**What asserts the state this change ends.** The advisory cases in `tests/src/bin/CLI.test.ts`
reverse or retire; the control table's rows are the new assertions; run `src:server` and
`src:bin` to derive the rest.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. Run only `npm run check`,
`npm run test:src:server`, `npm run test:src:bin`, `npm run test:src:core`, and single-file
vitest runs. No build, no tree-wide mutating gate, no commit or push, no
`git checkout`/`restore`/`stash`/`reset`/`clean`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return: touched files with one-line summaries; the failing-first record per control row
(command, red count, green count — a row pinning behaviour that already held carries its
negative control instead); scoped validation evidence; shared-file patches; the bounds
observation; deviation state. Write the same content to `tmp/units/w5-report.md`.

## Deviation contract

Stop and report when the snapshot extension breaks a case the control table does not predict,
when a fix needs an off-limits file, or when the bounds reading exceeds either limit. Naming and
assertion phrasing are yours.

## Acceptance criteria

1. `npm run check` exits 0.
2. `npm run test:src:server` exits 0 with the control rows pinned.
3. `npm run test:src:bin` exits 0; no `canon` question value remains in `src/`.
4. `npm run test:src:core` exits 0 (unchanged by you).
5. `git status --porcelain` shows changes only in owned files.

**Observations, not criteria.** The bounds reading; `test:config`/`test:policy`/`test:guides`
(W6 and the Orchestrator own their state).

## Review evidence

A code change: the actual diff and status output in the report.
