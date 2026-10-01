# Unit propagation-6 — the scratch adopter in the distribution proof

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration. The Orchestrator reads `git status --porcelain` after the run.

## Objective

Extend `tests/distribution.test.ts` with the scratch adopter ruling 8 of `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-design-verdict.md` names: the packed CLI generates the complete selection, the adopter installs, its checks, builds, projects, journey modes, showcase builds, and CSS export consumption pass, and `repair` restores a deleted wrapper byte for byte and reports a stale one, so a scaffold release cannot ship a selection its own adopter cannot run.

## Context

- **Evidence.** The round verdict (rulings 2 to 6, 8, 9); the reports `tmp/units/propagation-1-report.md` to `propagation-5-report.md`, `propagation-fix-1-report.md`, and `propagation-fix-2-report.md` (the flags, the emitted shapes, the scratch listings each unit quoted; `propagation-fix-1` renamed `FrameworkDefinition`'s members and `targetToFacts`, `propagation-5` repaired the vendored lint config's root override and lookaround patterns, so the generated workspace's `lint:check` may report what older configs hid: read it bare and quote every hit); the analyst proposal answer 8 (the adopter steps and the `repair` cases). `tests/distribution.test.ts` today (read it whole: how it packs, installs, and resolves the public exports, and what `tests/setupServer.ts` gives it), `tests/setupServer.ts` and `tests/setupServer.test.ts`, `package.json` (`prepublishOnly` runs the `distribution` project; the project's timeouts and `fileParallelism`), `.claude/rules/workspace.md` § Test project matrix (`distribution` runs from `prepublishOnly` and packs, installs, and drives a real build).
- **Host.** Windows 11, Node 24; `node_modules` installed; `dist/` built; the npm cache holds the fleet packages the adopter declares (the generated workspace installs `@orkestrel/*` from the registry or the cache; use `--prefer-offline` and report the stage if an install needs the network). Never commit; never install in the scaffold checkout.

## Unknowns

- The wall time of the adopter: the browser projects need Playwright's Chromium, which the scaffold checkout's `node_modules` carries. Measure one run and report it; a run past 10 minutes needs the project's timeout raised in the root config, which is off-limits here, so report the number and stop.

## Scope

- **Owned.** `tests/distribution.test.ts`, `tests/setupServer.ts` and `tests/setupServer.test.ts` (helpers the adopter reuses: a scratch workspace, a spawned npm, a bounded reader), `host.json` (regenerated only, if `tests/setupServer.ts` is vendored).
- **Shared (report-only).** `vite.config.ts`, `package.json`, `src/**`, `guides/scaffold.md`.
- **Off-limits.** `src/**`, `configs/**`, `vite.config.ts`, `package.json`, `.claude/**`, `AGENTS.md`, `.agents/**`, `guides/**`, `.orkestrel/**`, `tests/config.test.ts`, the veneer checkout.
- **Tree state.** The checkout carries uncommitted changes from earlier campaign units (`git status --porcelain` lists them). Never touch, revert, stash, or clean them. Record `git status --porcelain` and `git diff --stat` at your start; the acceptance criterion is that no file outside your owned set differs at your end from that start, and that `host.json` differs by regeneration alone.
- **Made false by this change.** A distribution proof that resolves exports and nothing else.
- **Tools and limits.** Read, patch, and the shell (Windows host: quote paths). Run: `git status --porcelain`, `git diff`, `node`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json tests`, `npx oxfmt --config .oxfmtrc.json --write <owned files>` and `--check`, `npm run test:setup`, `npm run build`, `npm run test:distribution`, and the scratch adopter's own scripts inside its directory under `tmp/`. Never run `npm test`, `npm run lint`, or `npm run format` tree-wide; never install in the scaffold checkout.

## Execution

1. Helpers in `tests/setupServer.ts` (exported, proved in `tests/setupServer.test.ts` with controls): what the adopter needs beyond what exists (a scratch workspace under `os.tmpdir()` or `tmp/` that `createTeardown` removes, a spawned npm through `process.execPath` and the npm CLI entry with the case-folded environment merge `.claude/rules/portability.md` prescribes, a bounded output reader).
2. The adopter case in `tests/distribution.test.ts`: pack the checkout once (reuse the existing pack), generate `--src core,browser --app core,browser --styles --themes --showcase --extend browser:vue,styles:print` into the scratch through the packed CLI, install with `--ignore-scripts --prefer-offline`, run `check`, `build`, `test:src`, `test:app`, `test:journey`, `test:journey:vue`, `build:showcase`, `build:showcase:vue`, and import the built CSS exports (`./styles`, `./print`, `./styles/themes`) from a consumer script that resolves them through the manifest; assert each exit code and the pages' stamp; then delete `configs/src/vite.print.config.ts`, run `repair --offline --json`, assert the file returns byte for byte; append a line to it, run `audit --offline --json`, assert the stale report names it. Keep every assertion on observable output.
3. Measure the run and report the wall time.
4. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json tests`, `npm run test:setup`, `npm run build`, `npm run test:distribution`.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-6-report.md` with: the files changed; every new helper with one line; the adopter's step results and wall time; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when the adopter's install needs the network and it is unavailable, when a generated script fails (name the script and quote its output bare), when the run exceeds the project's timeout, or when a change needs a file outside the owned set.

## Acceptance criteria

1. Root `tsc`, scoped lint, and scoped format exit 0.
2. `npm run test:setup`, `npm run build`, and `npm run test:distribution` exit 0 with the adopter case.
3. `git status --porcelain` adds only owned files; no scratch directory remains.

**Observations, not criteria.** The wall time against the project's timeout.

## Review evidence

The diff and `git status --porcelain`; the report file.
