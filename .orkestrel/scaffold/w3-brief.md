# Unit W3 — documentation parity, the visit's sweep step, and the proposal's retirement

## Role and engine

`implementer` on Opus 5, a native subagent, the sole serial writer. Documentation voice is
subjective work, so this unit routes to Opus by design rather than by substitution.

## Objective

Bring the guide, the README, the roadmap, and the release-visit procedure into agreement with the
canon split that landed in W1 and W2, and retire `PROPOSAL.md` — so `npm run test:guides` is green
and no shipped sentence describes an instruction file as written into a target.

## Context

**Law.** `AGENTS.md` (§ Writing and § Instruction files bind every file this unit touches);
`.claude/rules/writing.md`, `documentation.md`, `tests.md`, `quality.md`, `names.md`. Skill: none.
Guide: `guides/scaffold.md` is itself the subject.

**Evidence.** The reconciled plan is `.orkestrel/scaffold/plan.md`; the predecessor reports are
`.orkestrel/scaffold/w1-report.md` and `w2-report.md`. Read all before editing. The shipped state
they describe, verified by the Orchestrator:

- `CANON_PATHS` (`src/core/constants.ts`) carries `AGENTS.md`, `CLAUDE.md`,
  `.agents/orchestration.md`, `.agents/skills`, `.agents/templates`, `.agents/transports`,
  `.claude/rules`, `.claude/skills` — staged into `dist/host` and `host.json`, never planned into
  a target. `HOST_PATHS` is the vendored-into-target set. `isCanonPath` is the predicate
  (`src/core/helpers.ts`). Both are new public core exports with no guide row.
- `blueprintToDocumentArtifacts` emits the pointer pair at `AGENTS.md` and `CLAUDE.md`:
  `origin: 'template'`, `ownership: 'content'`, `group: 'docs'`, beside the birth-owned
  `README.md`. The bodies live at `ARTIFACT_TEMPLATES.docs.agents` and `.claude`
  (`src/core/templates.ts`) — read them; the guide must agree with what they say.
- The pointer's fallback names storage paths (`dist/host/AGENTS.md`,
  `dist/host/agents/orchestration.md`, `dist/host/claude/rules/`) because `pathToStorage` strips
  the dot opening each segment.
- `audit` raises an advisory question naming canon copies still present in a target, minus the
  planned document paths; writing verbs never raise or act on it (`#canonQuestion`,
  `src/bin/CLI.ts`).
- `repair` writes only missing and stale paths and never deletes; a superseded canon copy in a
  target is unmanaged, and the one-time removal is the visit's step.
- Guide passages made false or incomplete by the change, from this checkout:
  - `guides/scaffold.md:885-898` — the groups table: the `docs` row says "`README.md` and the root
    instruction documents"; the `orchestration` row says "The harness directories, the bench
    scripts, and `.mcp.json`" while `.agents/` no longer reaches a target.
  - `guides/scaffold.md:900-949` — the ownership section names `AGENTS.md` as an unhydrated
    vendored presence path (`:930`); `AGENTS.md` is a template artifact after the change.
  - `guides/scaffold.md:1127-1183` — the vendored data root section describes one candidate list
    (`:1129-1133`), and the release rule at `:1141-1144` speaks of removing a vendored path from
    the manifest; the canon members stay staged while leaving the plan, which is a different
    sentence. The dot-stripping paragraph (`:1167-1173`) gains the pointer as a named consumer.
  - The surface tables must gain `CANON_PATHS` and `isCanonPath` rows — `tests/guides.test.ts`
    holds parity in both directions, and `npm run test:guides` is red at this baseline for exactly
    those missing rows (confirm the red before editing, and record it).
- `README.md:6-8` says scaffold ships the shared set "as data inside the package and gives it
  verbs"; `:36-40` says `new` writes "every shared file". Both must state the split: the tool
  surface is vendored into targets; the instruction canon is published for reading — the sibling
  scaffold checkout first, `dist/host` otherwise — and targets carry the pointer pair.
- `ROADMAP.md` keeps a sequenced plan; the fleet adoption visit (re-pin, `repair`, sweep, gates,
  per target) is future sequenced work with no row.
- `.agents/skills/orkestrel-publish/references/wave.md` § Visit a repository is the per-repo
  procedure. The sweep belongs there as a condition-first step: where the target still carries a
  canon path, delete it (`git rm -r`) in the same visit, and prove the removal with the paths'
  absence and a clean `git status`. The `audit` advisory names the paths.
- `PROPOSAL.md` retires: its mechanism truth lands in the guide, its procedure in the wave
  reference, its motivation in this campaign's record (already under `.orkestrel/scaffold/` and in
  git history). Delete the file.

**Host.** POSIX shell at `/home/user/scaffold`, clean committed baseline after W2's commit. Node
and npm installed.

**Measurements.** Take the red `npm run test:guides` reading yourself before editing; it is this
unit's failing-first record.

**Control identifiers.** None.

**Standing conditions.** `tests/src/bin/main.test.ts` build-dependent failures are the
Orchestrator's; do not touch or diagnose. `tmp/` and `.orkestrel/` are campaign records; read,
never edit.

## Unknowns

None. Where a guide sentence outside the named sections turns out to be falsified by the change,
that is within scope — rewrite it and record which sentence.

## Scope

**Owned.** `guides/scaffold.md`, `README.md`, `ROADMAP.md`,
`.agents/skills/orkestrel-publish/references/wave.md`, `PROPOSAL.md` (deletion),
`guides/README.md` (only if its index names a section this unit renames).

**Shared (report-only).** `tests/guides.test.ts` — the parity proof; if a change of yours needs an
edit there, stop and report it: the proof binds the guide, not the reverse.

**Off-limits.** Everything under `src/` and `tests/` except the shared row's report path,
`host.json`, `.agents/**` beyond the wave reference, `.claude/**`, `.codex/**`, `.cursor/**`,
`AGENTS.md`, `CLAUDE.md`, `package.json`, `.orkestrel/**`, secrets.

**What asserts the state this change ends.** `npm run test:guides` (parity in both directions);
`npm run test:policy` (the skill-inventory law binds the wave reference's directory).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. Run only `npm run test:guides`,
`npm run test:policy`, and single-file vitest runs. No `build`, no tree-wide mutating gate, no
commit, push, or dependency change, no `git checkout`, `restore`, `stash`, `reset`, or `clean`.
Delete `PROPOSAL.md` with `git rm`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return: touched files with one-line summaries; the guides-parity red reading before and the green
after; the policy reading; the exact sentences replaced in README (old and new); deviation state.
Write the same content to `tmp/units/w3-report.md`. No process diary.

## Deviation contract

Stop and report when the parity proof demands an edit to `tests/guides.test.ts`, or when a guide
claim you must write would contradict the shipped behavior you can read in `src/`. Decide and
record yourself: section placement, heading wording, the roadmap row's wording, and everything
`AGENTS.md` § Writing already fixes.

## Acceptance criteria

1. `npm run test:guides` exits 0.
2. `npm run test:policy` exits 0.
3. `PROPOSAL.md` is absent from the tree.
4. `git status --porcelain` shows changes only in owned files.

**Observations, not criteria.** The full `npm test` and `npm run build` — the Orchestrator runs
them after integration.

## Review evidence

The subject is a code change and a process-prose change: supply the actual diff and the actual
status output in the report.
