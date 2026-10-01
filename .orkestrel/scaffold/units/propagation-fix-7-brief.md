# Unit propagation-fix-7 — the project guard reads planned registrations, not a label substring

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration.

## Objective

The packed adopter in `tests/distribution.test.ts` (report: `tmp/units/propagation-fix-6-report.md` § Adopter runs, run 2) now passes every generated script, both page stamps, and the CSS consumer, and fails at its wrapper repair: `repair --offline --json` refuses with `TARGET`: "The configs group is blocked because the manifest … names Vitest projects the planned vite.config.ts does not register: src:print, src:styles." The guard at `src/bin/CLI.ts:1058` decides registration with `planned.includes(`name: { label: '${project}',`)`, a substring of the planned root configuration, while a sheet project registers by wrapper path (`src/core/compilers.ts:982`) and takes its label inside `sheetProject(name)` (`src/core/templates.ts:179`). Make the guard read the set of projects the plan registers, by name, from the plan rather than from the root text, so every registration shape counts; pin it; then run the adopter to completion and take the `desk` readings.

## Context

- **The guard.** `src/bin/CLI.ts` around `:1058` (grep the `does not register` message): read what it compares (the manifest's project-naming scripts against the planned root `vite.config.ts` text) and why (a script naming an unregistered project would fail in the target). The plan knows every project it registers: factories by label in the root config and sheet faces by wrapper path with `sheetProject('<face>')` labels. The right projection is a compiler export (`blueprintToProjects(blueprint): readonly string[]`, or the name `names.md` § Fixed derivation forms gives a whole-to-view projection) that lists every project label the plan registers, read by the guard and by the compiler cases; the root-text substring goes.
- **The proof.** `tests/src/bin/CLI.test.ts` carries the guard's cases (grep the message); add a sheet-face target whose manifest names `src:styles` and `src:print` and whose plan registers them by wrapper, which the guard admits, and a control naming a project nothing registers, which it refuses. `tests/src/core/compilers.test.ts` pins the projection for a blueprint with and without faces, modes, and setup proofs.
- **The adopter.** After the repair, `npm run build` and `npm run test:distribution` bare to natural completion: the adopter must complete the wrapper repair (byte for byte), the stale audit (the finding names the wrapper), and report its wall time; quote every reading.
- **Tree state and gates.** As the earlier briefs: uncommitted campaign changes everywhere, never touched; this checkout is a generated target (no template change is expected; regenerate and quote if one is needed); `npm run build` before `test:src:bin`, `test:config`, `test:policy`, `test:guides`, and `test:distribution`; `host.json` differs by regeneration alone.
- **Law.** `AGENTS.md` (derive state; a projection over the plan rather than a text search), `.claude/rules/names.md`, `.claude/rules/tests.md`.

## Unknowns

- Whether a later adopter step (the stale audit) exposes one more mismatch; it is quoted bare and is a stop unless its cause is in the owned set, in which case repair it, pin it, and rerun (bound: three adopter runs).

## Scope

- **Owned.** `src/bin/CLI.ts` (the guard), `src/bin/helpers.ts` if the guard's helper lives there, `src/core/compilers.ts` (the projection), `src/core/types.ts` only if the projection needs a type, `tests/src/bin/CLI.test.ts`, `tests/src/core/compilers.test.ts`, `guides/scaffold.md` and `tests/guides.test.ts` for the projection's `## Surface` row and the guard's sentence if one names the old behaviour, `host.json` (regenerated only).
- **Off-limits.** Everything else, `tests/distribution.test.ts` included.
- **Tools and limits.** Read, patch, and the shell. Run: `git status --porcelain`, `git diff`, `node`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npm run check:src:bin`, `npx oxlint --config .oxlintrc.json src tests`, `npx oxfmt --config .oxfmtrc.json --write <owned files>` and `--check`, `npm run test:src:core`, `npm run build`, `npm run test:src:bin`, `npm run test:config`, `npm run test:policy`, `npm run test:guides`, `npm run lint:check`, `npm run test:distribution`, and the `desk` scratch under `os.tmpdir()` that you delete. Never run `npm test`, `npm run lint`, or `npm run format` tree-wide; never install in the checkout; never commit.

## Execution

1. Add the projection; route the guard through it; delete the substring read.
2. Pin: the compiler cases; the guard's admit and refuse cases.
3. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npm run check:src:bin`, `npx oxlint --config .oxlintrc.json src tests`, `npm run test:src:core`, `npm run build`, `npm run test:src:bin`, `npm run test:config`, `npm run test:policy`, `npm run test:guides`, `npm run lint:check`, `npm run test:distribution` (quote the adopter's full step table, the stamps, the CSS consumer result, the repair byte comparison, the stale audit finding, and the wall time), then `npx oxfmt --config .oxfmtrc.json --check <owned files>`.
4. The `desk` scratch readings `propagation-fix-5-brief.md` step 3 prescribes, quoted; delete the directory.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-fix-7-report.md` with: the files changed; the projection with one line; the guard's diff; the pinning cases; the adopter's readings; the `desk` readings; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a later adopter step fails for a cause outside the owned set (quote it bare), when the bound is reached, when a gate reddens for a reason outside your files, or when a change needs a file outside the owned set.

## Acceptance criteria

1. `tsc`, both scoped checks, scoped lint, scoped format, and `lint:check` exit 0.
2. `test:src:core`, `build`, `test:src:bin`, `test:config`, `test:policy`, `test:guides`, and `test:distribution` exit 0, the last with the adopter complete and every reading quoted.
3. The guard admits wrapper-registered projects and refuses an unregistered one, each pinned; the `desk` readings match.
4. No file outside the owned set differs from its state at your start; `host.json` differs by regeneration alone; no scratch directory remains.

## Review evidence

The diff of the owned files and the report.
