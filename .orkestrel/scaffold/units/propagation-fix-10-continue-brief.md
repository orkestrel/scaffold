# Unit propagation-fix-10, continuation — a wrapper invocation reaches its face's project

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration.

## Objective

The previous run (report: `tmp/units/propagation-fix-10-report.md`; brief: `tmp/units/propagation-fix-10-brief.md`) reproduced veneer's refusal and corrected the premise: `repair` already applies the writable script region before the `configs` guard (`src/bin/CLI.ts:1038-1041`), and the region keeps an adopter's authored script value by design (`src/core/compilers.ts:2640`), so veneer's `test:src:styles` stays `npm run build:src:styles && vitest run --config configs/src/vite.styles.config.ts …`. That value does run the `src:styles` project, because the planned wrapper `configs/src/vite.styles.config.ts` composes `sheetProject('styles')`; the guard recognizes only `--project <label>` on the root configuration and refuses. Make the guard recognize a `vitest run --config <wrapper>` invocation of a face's planned wrapper as reaching that face's project, keep the refusal for a project nothing reaches, pin both with veneer's shape, and land the setup-advisory ruling of the original brief; then the gates.

## Context

- **The guard.** `src/bin/CLI.ts` around `:1196` (the "does not reach Vitest projects" message) and the reachability reader it calls (grep `blueprintToProjects` and `--project` in `src/bin/CLI.ts` and `src/bin/helpers.ts`): it walks the `test` and `prepublishOnly` chains and marks a project reached when a script in the chain names it with `--project`. Add the second shape: a script in the chain whose command runs `vitest run --config <path>` where `<path>` is the planned wrapper of a sheet or framework face (the compiler plans those paths; read them from `blueprintToConfigArtifacts(blueprint)` or the face projections, never from a hard-coded list) reaches that face's project (`src:<face>` or `app:<face>`). A chain step may be `npm run <script>` (follow it) or a compound (`&&`); the reader already handles the chain, so the change is the recognition of the wrapper form beside the `--project` form.
- **The advisory.** As the original brief: `#setupQuestion` skips a root setup module that declares no export (the export reading through `parseAst` from `vite` if the server environment may import it, otherwise the line-anchored `^export ` reading with a `declare module` control); a module with no export owes no proof.
- **Veneer's shape** (read-only, for the cases): `C:/Users/mikes/WebstormProjects/veneer/package.json` scripts `test`, `test:src`, `test:src:styles`, `test:src:bootstrap`, `test:src:tailwindcss`, `test:src:vue`, `test:app`, `test:app:vue`; `tests/setupBrowser.ts`.
- **Tree state and gates.** The checkout carries `package.json` and `package-lock.json` (the `0.0.82` bump) and `.orkestrel/scaffold/ledger.md` uncommitted; never touch them. `npm run build` before `test:src:bin` and `test:config`; `host.json` differs by regeneration alone.
- **Law.** `AGENTS.md`; `.claude/rules/tests.md`; `.claude/rules/workspace.md` § Test project matrix.

## Unknowns

- none

## Scope

- **Owned.** `src/bin/CLI.ts`, `src/bin/helpers.ts`, `tests/src/bin/CLI.test.ts`, `tests/src/bin/helpers.test.ts`, `guides/scaffold.md` and `tests/guides.test.ts` only for a sentence that names the guard's or the advisory's behaviour, `host.json` (regenerated only).
- **Off-limits.** Everything else; `src/core/**`, `package.json`, and `package-lock.json` in particular.
- **Tools and limits.** As the original brief.

## Execution

1. Rerun `node tmp/units/propagation-fix-10-reproduce.ts` (or its equivalent) for the before reading; the refusal names `src:print` and `src:styles`.
2. Make the guard change; rerun: `repair --offline --json` adopts, and `audit --offline --json` afterwards reports no stale selected artifact; a control whose `test` chain omits `test:src` still refuses.
3. The advisory change with its two cases.
4. Pin all in `tests/src/bin/CLI.test.ts` (and the reader's cases in `tests/src/bin/helpers.test.ts` if it lives there).
5. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:bin`, `npx oxlint --config .oxlintrc.json src tests`, `npm run build`, `npm run test:src:bin`, `npm run test:config`, `npm run test:guides`, `npm run lint:check`, then `npx oxfmt --config .oxfmtrc.json --check <owned files>`.

## Output

Rewrite `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-fix-10-report.md` as the finished unit's report: the files changed; the reproduction readings before and after; the pinning cases with their controls; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when the planned wrapper paths cannot be read without a change outside the owned set, when a gate reddens for a reason outside your files, or when a change needs a file outside the owned set.

## Acceptance criteria

1. `tsc`, scoped check, scoped lint, scoped format, and `lint:check` exit 0.
2. `build`, `test:src:bin`, `test:config`, and `test:guides` exit 0.
3. The reproduction adopts in one `repair`; the control still refuses; the advisory skips a non-exporting module and reports an exporting one; each pinned.
4. No file outside the owned set differs from its state at your start; `host.json` differs by regeneration alone; no scratch directory remains.

## Review evidence

The diff of the owned files and the report.
