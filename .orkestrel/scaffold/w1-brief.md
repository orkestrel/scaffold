# Unit W1 — the canon split, the pointer artifacts, the overlay pair, and the advisory

## Role and engine

`implementer` on Opus 5, a native subagent. The Codex bench is dark this session, so this
objective-leaning unit runs on Opus as the recorded substitution for Sol.

## Objective

Split the vendored membership into a planned set and a staged-only canon set, emit the pointer
pair as template artifacts, make the live overlay skip canon destinations without breaking, and
add the superseded-copies advisory to `audit` — with the mirrored tests that pin each behavior.

## Context

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`,
`tests.md`, `workspace.md`, `portability.md`, `writing.md`, `quality.md`. Skill: none. Guide:
`guides/scaffold.md` (read the vendored-data-root section, 1127-1183, before editing staging).
The reconciled plan is `.orkestrel/scaffold/plan.md`; read it whole before starting.

**Evidence, verified by the Orchestrator against this checkout on 2026-08-27.**

- `HOST_PATHS` is `src/core/constants.ts:124-159`, one frozen `readonly string[]`. Consumers:
  `stageHost` (`src/server/helpers.ts:1401`), `nameToHostArtifacts`
  (`src/core/compilers.ts:1512-1518` through `selectHostPaths`, its only `src/` consumer,
  `src/core/helpers.ts:384-387`), the CLI setup advisory (`src/bin/CLI.ts:1370`), and test
  fixtures.
- `stageHost` sorts candidates by storage and roots before writing the manifest
  (`src/server/helpers.ts:1464-1465`), so staging membership decides `host.json` bytes and
  iteration order does not.
- `stageHost` refuses two vendored paths claiming one storage name
  (`src/server/helpers.ts:1454-1460`).
- `filesToHost` (`src/server/helpers.ts:1209-1239`) returns `undefined` when any non-deferred
  floor entry lacks a live `found` row (`:1222`). `CLI.#host` (`src/bin/CLI.ts:616-647`) builds
  the fetch list as every non-deferred manifest destination, reads the target snapshot over it,
  and overlays with `filesToHost`. Filtering the fetch list without changing `filesToHost` makes
  every overlay return `undefined` and silently forces the floor — the pair of edits is one
  change.
- `#setupQuestion` (`src/bin/CLI.ts:1359`) is the advisory precedent: raised by `audit` alone,
  naming nothing scaffold plans, never blocking a write.
- `artifactsToQuestions` (`src/core/compilers.ts:2448`) refuses two artifacts at one path, so the
  pointer pair must be the only claimants of `AGENTS.md` and `CLAUDE.md` in a compiled plan.
- `ARTIFACT_TEMPLATES.docs` (`src/core/templates.ts:2010`) holds `readme`;
  `blueprintToDocumentArtifacts` (`src/core/compilers.ts:1438`) emits it as a `ContentArtifact`.
- `inferGroup('AGENTS.md')` and `inferGroup('CLAUDE.md')` return `docs`
  (`src/core/helpers.ts:225`).
- `isDeferredPath` (`src/core/helpers.ts:188-190`) defers `CATALOG_AGENT_PATH` and guide mirrors.
- The `nameToHostArtifacts` `@example` (`src/core/compilers.ts:1505-1510`) claims `AGENTS.md` is a
  host artifact — the change makes that fence false, and `tests/guides.test.ts` executes fences.
- `pathToStorage` (`src/server/helpers.ts:215-221`) strips the leading dot per segment; a root
  dotted file stores under `dotfiles/`.

**Host.** POSIX shell at `/home/user/scaffold`. Branch `claude/scaffold-proposal-impl-nabmm9`,
clean committed baseline. Full network. Node and npm installed; dependencies installed.

**Measurements.** The gate chain was green at the baseline commit. `npm run test:src:core`,
`test:src:server`, `test:src:bin` all green at baseline.

**Control identifiers.** None. Name every test for what it proves.

**Standing conditions.** `tmp/` holds campaign working files and is git-ignored; leave it alone.
`.orkestrel/` is the campaign record; read it, never edit it. The `prove` tool (probe MCP server)
is unavailable this session — where you would call it, write a fallback probe per
`.claude/rules/tests.md` § Probes with its control, and delete or promote it before returning.

## The changes

1. **`src/core/constants.ts`** — add `CANON_PATHS`, frozen `readonly string[]`, members exactly:
   `AGENTS.md`, `CLAUDE.md`, `.agents/orchestration.md`, `.agents/skills`, `.agents/templates`,
   `.agents/transports`, `.claude/rules`, `.claude/skills`. Remove those members from
   `HOST_PATHS`. Rewrite each constant's TSDoc: `HOST_PATHS` is the vendored set a target
   receives; `CANON_PATHS` is staged for reading — the sibling checkout and the
   `node_modules/@orkestrel/scaffold/dist/host/` fallback — and never planned into a target.
2. **`src/core/helpers.ts`** — add `isCanonPath(path: string): boolean`: true for a `CANON_PATHS`
   member or any path beneath a directory member. Place it beside `isDeferredPath`; it is a
   predicate helper, not a guard. Export and test it.
3. **`src/core/templates.ts`** — add `ARTIFACT_TEMPLATES.docs.agents` and
   `ARTIFACT_TEMPLATES.docs.claude`, the pointer bodies. Start from the drafts under "Pointer
   bodies" in this brief; you own their final wording under `.claude/rules/writing.md` and
   `AGENTS.md` § Instruction files. Hard constraints: no `@path` import — every `@` sits inside
   backticks; the sibling paths `../scaffold/AGENTS.md` and `../scaffold/.agents/orchestration.md`
   and the storage-spelled fallbacks `node_modules/@orkestrel/scaffold/dist/host/AGENTS.md` and
   `node_modules/@orkestrel/scaffold/dist/host/agents/orchestration.md` appear verbatim; no
   `{{token}}` placeholders.
4. **`src/core/compilers.ts`** — `blueprintToDocumentArtifacts` emits the pointer pair beside
   `README.md`: `path: 'AGENTS.md'` / `'CLAUDE.md'`, `group: 'docs'`, `origin: 'template'`,
   `ownership: 'content'`. `README.md` keeps `birth`. Fix the `nameToHostArtifacts` `@example` to
   a witness that stays planned, such as `.claude/settings.json`.
5. **`src/server/helpers.ts`** — `stageHost` walks `HOST_PATHS` and `CANON_PATHS` together;
   everything downstream (missing-path refusal, collision guard, sorting, digests, roots) already
   covers the union. `filesToHost` treats a canon destination like a deferred one: take the
   floor's bytes rather than requiring a live row.
6. **`src/bin/CLI.ts`** — `#host` excludes canon destinations from the fetch list beside
   `isDeferredPath`. Add the superseded advisory on the `#setupQuestion` pattern: `audit` raises
   one target question naming every `CANON_PATHS` member present in the target, prescribing the
   one-time removal; writing verbs never raise or act on it.
7. **Mirrored tests** — pin each behavior in the owned test files, failing-first where a behavior
   reverses: `isCanonPath` membership and non-membership (`.claude/settings.json`,
   `.claude/agents/orkestrel.md`, `scripts/deps.sh` are false); `selectHostPaths` output excludes
   canon members and retains `.claude/settings.json`, `.claude/agents`, `scripts/deps.sh`;
   compiled plan carries `AGENTS.md` and `CLAUDE.md` exactly once each with the stated origin and
   ownership, and `artifactsToQuestions` reports no collision; pointer bodies name the sibling and
   storage fallback paths and carry no `@` outside backticks (assert against `pathToStorage` so
   the fallback spelling is pinned by the mechanism that decides it); `stageHost` output still
   carries every canon member; `filesToHost` returns a live host when canon rows are absent from
   the fetched files and still returns `undefined` when a planned non-deferred row is missing (the
   negative control); the advisory fires on a fixture target holding a canon member and stays
   silent on a clean one.

## Pointer bodies

The `AGENTS.md` draft:

```markdown
# AGENTS.md

The `@orkestrel/scaffold` package is this repository's coding and orchestration authority. This
file points at it and states no law of its own.

Read these before working: the `AGENTS.md` coding contract, the `.agents/orchestration.md`
agent-operation contract, every applicable rule the contract's rule map names under
`.claude/rules/`, and the dispatch-named skill under `.agents/skills/` with the references it
requires.

Resolve every one of those paths against scaffold, never against this repository:

- When a scaffold checkout sits beside this repository, read `../scaffold/AGENTS.md`,
  `../scaffold/.agents/orchestration.md`, and the `../scaffold/.claude/rules/` directory.
- Otherwise read the installed copy, which strips the dot that opens each path segment: the
  `node_modules/@orkestrel/scaffold/dist/host/AGENTS.md` file, the
  `node_modules/@orkestrel/scaffold/dist/host/agents/orchestration.md` file, and the
  `node_modules/@orkestrel/scaffold/dist/host/claude/rules/` directory.

Every path a scaffold-supplied file names resolves the same way. The files this repository
carries — the `.claude/agents/` directory, the `.codex/` directory, the `.cursor/` directory, the
`.mcp.json` file, and the `.claude/settings.json` file — are this repository's own copies and
resolve here.

Edit none of the scaffold-owned files here. The `scaffold repair` command restores them; the
change process is a commit in the scaffold repository followed by a release.
```

The `CLAUDE.md` draft:

```markdown
# CLAUDE.md

Read the `AGENTS.md` file in this repository first. It names the coding and orchestration
authority and where to read each contract.

This file imports nothing: an `@path` import inlines the imported file into every importing
context, which is the cost this pointer removes.
```

## Unknowns

None. Every mechanism this brief names was verified; where a test you write contradicts one of
the evidence lines, that is a deviation — stop and report it.

## Scope

**Owned.** `src/core/constants.ts`, `src/core/helpers.ts`, `src/core/templates.ts`,
`src/core/compilers.ts`, `src/core/index.ts`, `src/server/helpers.ts`, `src/server/index.ts`,
`src/bin/CLI.ts`, `tests/src/core/constants.test.ts`, `tests/src/core/helpers.test.ts`,
`tests/src/core/templates.test.ts`, `tests/src/core/compilers.test.ts`,
`tests/src/core/Compiler.test.ts`, `tests/src/server/helpers.test.ts`,
`tests/src/bin/CLI.test.ts`, `tests/setup.ts` (only if a shared fixture there names a canon
member and the change makes it false).

**Shared (report-only).** `tests/setupServer.ts`, `tests/src/server/Materializer.test.ts`,
`tests/distribution.test.ts`, `tests/policy.test.ts` — a later unit owns each; if your change
breaks one, report the exact failing case and the patch you would apply, and do not edit it.

**Off-limits.** `host.json` (the change must leave it byte-identical; that is an acceptance
criterion, not a file to edit), `AGENTS.md`, `CLAUDE.md`, `.agents/**`, `.claude/**`,
`.codex/**`, `.cursor/**`, `guides/**`, `README.md`, `ROADMAP.md`, `PROPOSAL.md`,
`.orkestrel/**`, `package.json`, `vite.config.ts`, `tsconfig.json`, secrets (`.env*`, auth
files).

**What asserts the state this change ends.** `tests/src/core/helpers.test.ts:278-286` pins
`selectHostPaths(HOST_PATHS, 'router')` equal to `HOST_PATHS` — your change reverses that for
canon members; repin it. `tests/src/core/constants.test.ts` may pin `HOST_PATHS` membership.
The `nameToHostArtifacts` fence in `src/core/compilers.ts` claims `AGENTS.md`. Derive the rest by
running the three scoped test projects; a failure in a shared file is a report, not an edit.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. Validate read-only and scoped: run
only `npm run check:src:core`, `check:src:server`, `check:src:bin`, `test:src:core`,
`test:src:server`, `test:src:bin`, and single-file vitest runs. No tree-wide `format`, no
`lint --fix`, no `build`, no commit, no push, no dependency changes, no `git checkout`,
`restore`, `stash`, `reset`, or `clean`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return: touched files with one-line summaries; the failing-first commands and their counts for
each reversed behavior (command, red count before, green count after); scoped validation evidence
(each check and test command with its exit status); exact patches for any shared file your change
breaks; deviation state. Write the same content to `tmp/units/w1-report.md`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when:
a verified evidence line above is contradicted by the code; `host.json` cannot stay byte-identical
without editing it; the pointer pair cannot be the sole claimant of its paths; or a shared file
cannot stay green without an edit you are not allowed to make. Decide and record yourself:
wording inside the pointer bodies within the hard constraints, test names, assertion phrasing,
and where within an owned file a declaration sits.

## Acceptance criteria

1. `npm run check:src:core && npm run check:src:server && npm run check:src:bin` exit 0.
2. `npm run test:src:core`, `npm run test:src:server`, `npm run test:src:bin` exit 0.
3. `git diff --exit-code host.json` exits 0.
4. `git status --porcelain` shows changes only in owned files.
5. Every behavior this brief reverses has a failing-first record in the report.

**Observations, not criteria.** `npm run test:policy`, `test:config`, `test:guides`, the full
`npm test`, and `npm run build` — report nothing about them; the Orchestrator runs them after
integration.

## Review evidence

The subject is a code change: the auditor receives the actual diff and the actual status output;
supply both in the report.
