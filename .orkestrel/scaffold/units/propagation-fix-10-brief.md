# Unit propagation-fix-10 — `repair` orders the script region before the `configs` guard, and the setup advisory reads exports

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration.

## Objective

Veneer's adoption from the pack (report: `tmp/units/propagation-9-report.md`) stopped because `repair --offline --json` refused the `configs` group: "the manifest does not reach Vitest projects the planned configuration registers: app:vue, src:bootstrap, src:styles, src:tailwindcss, src:vue … test:app:vue, test:src:bootstrap, … are already declared, so the gate is missing rather than the script" (`src/bin/CLI.ts:1196`). Veneer's manifest declares those scripts with wrapper-based values (`vitest run --config configs/src/vite.styles.config.ts …`) that the same `repair` would rewrite to the planned root-project values (`vitest run --config vite.config.ts … --project src:styles`) through the writable script region, so the guard refuses a state the run itself repairs. Make one `repair` adopt such a target: evaluate the project-reachability guard against the manifest as the planned script region leaves it when the manifest group is selected in the same run (or write the script region before the guard runs), keep the refusal for a manifest whose authored chain would still not reach a planned project after the region is written, and pin both. Also make the `audit` setup advisory (`#setupQuestion`, `src/bin/CLI.ts` about `:1297`) skip a root setup module that declares no export, as the policy sweep's root setup mirror does, so veneer's augmentation-only `tests/setupBrowser.ts` raises no question; pin it.

## Context

- **The guard.** `src/bin/CLI.ts` around `:1196` (grep the message "does not reach Vitest projects"): read what it compares (the manifest's `test` and `prepublishOnly` chains against `blueprintToProjects`) and when it runs relative to the manifest write. The writable script region is `blueprintToWritableScripts` and `replaceManifestScripts` in `src/core/compilers.ts`; the planned manifest after the region is applied is what the guard must read when the manifest group is in the run. Where the manifest group is excluded (`--groups configs` alone), the guard reads the current manifest as today, and the message stays.
- **The advisory.** `#setupQuestion` reads root setup modules whose text differs from the seed and have no sibling proof; add the export reading the sweep uses (`tests/setupPolicy.ts`, the parse through `parseAst` or the `^export ` reading the sweep settled on; the CLI cannot import the vendored test helper, so read the file's import and export declarations through the same `parseAst` from `vite` if the server environment may import it, otherwise through the line-anchored `^export ` reading with its `declare module` control), so a module with no export owes no proof.
- **Veneer's shape** (read-only, for the cases): `C:/Users/mikes/WebstormProjects/veneer/package.json` scripts `test`, `test:src`, `test:src:styles`, `test:src:bootstrap`, `test:src:tailwindcss`, `test:src:vue`, `test:app`, `test:app:vue`; `tests/setupBrowser.ts` (a `declare module 'vitest'` augmentation, no export).
- **Tree state and gates.** The checkout is clean except `package.json` and `package-lock.json` (the `0.0.82` bump, uncommitted); never touch them. `npm run build` before `test:src:bin` and `test:config`; `host.json` differs by regeneration alone; no vendored file is expected to change.
- **Law.** `AGENTS.md`; `.claude/rules/tests.md`; `.claude/rules/workspace.md` § Test project matrix (every registered project reached from `test` or `prepublishOnly`).

## Unknowns

- Whether the guard's placement lets it read the planned manifest without restructuring the write order; read `#repair`'s group sequence first and choose the smaller change.

## Scope

- **Owned.** `src/bin/CLI.ts`, `src/bin/helpers.ts`, `src/core/compilers.ts` only if the planned-manifest projection needs a compiler export, `tests/src/bin/CLI.test.ts`, `tests/src/bin/helpers.test.ts`, `tests/src/core/compilers.test.ts` if a projection is added, `guides/scaffold.md` and `tests/guides.test.ts` only for a sentence that names the guard's or the advisory's behaviour, `host.json` (regenerated only).
- **Off-limits.** Everything else; `package.json` and `package-lock.json` in particular.
- **Tools and limits.** Read, patch, and the shell. Run: `git status --porcelain`, `git diff`, `node`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:bin`, `npm run check:src:core`, `npx oxlint --config .oxlintrc.json src tests`, `npx oxfmt --config .oxfmtrc.json --write <owned files>` and `--check`, `npm run test:src:core`, `npm run build`, `npm run test:src:bin`, `npm run test:config`, `npm run test:guides`, `npm run lint:check`, and a scratch target under `os.tmpdir()` shaped like veneer's manifest (generated, then its scripts rewritten to wrapper-based values) on which `repair --offline --json` is driven, deleted after. Never run `npm test`, `npm run lint`, or `npm run format` tree-wide; never install in the checkout; never commit.

## Execution

1. Reproduce: generate a scratch with `--src core,browser --app core,browser --styles --extend browser:vue,styles:print --offline`, rewrite its `test:src:styles`, `test:src:print`, `test:src:vue`, and `test:app:vue` values to the wrapper-based form veneer uses, run `repair --offline --json`, and quote the refusal.
2. Make the change; rerun the reproduction: `repair` writes the region and the configs, and a second `audit --offline --json` reports no stale selected artifact; keep a control where the authored `test` chain omits `test:src` so the refusal stands after the region is written.
3. The advisory: a scratch with an augmentation-only `tests/setupBrowser.ts` and no proof raises no setup question; a control with an export and no proof raises it.
4. Pin both in `tests/src/bin/CLI.test.ts`.
5. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npm run check:src:bin`, `npx oxlint --config .oxlintrc.json src tests`, `npm run test:src:core`, `npm run build`, `npm run test:src:bin`, `npm run test:config`, `npm run test:guides`, `npm run lint:check`, then `npx oxfmt --config .oxfmtrc.json --check <owned files>`.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-fix-10-report.md` with: the files changed; the reproduction readings before and after; the two pinning cases with their controls; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when the guard cannot read the planned manifest without a change outside the owned set, when a gate reddens for a reason outside your files, or when a change needs a file outside the owned set.

## Acceptance criteria

1. `tsc`, both scoped checks, scoped lint, scoped format, and `lint:check` exit 0.
2. `test:src:core`, `build`, `test:src:bin`, `test:config`, and `test:guides` exit 0.
3. The reproduction adopts in one `repair`; the control still refuses; the advisory skips a non-exporting module and reports an exporting one.
4. No file outside the owned set differs from its state at your start; `host.json` differs by regeneration alone; no scratch directory remains.

## Review evidence

The diff of the owned files and the report.
