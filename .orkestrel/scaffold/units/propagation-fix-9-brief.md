# Unit propagation-fix-9 — close the integration round's objective rulings

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration.

## Objective

Land the three rulings `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-audit-2-reconcile.md` § Second half marks for `propagation-fix-9`, each with the proof that would redden if it regressed, so the tree-wide gates and the release follow.

## Context

- **The verdict.** `tmp/units/propagation-audit-2-analyst-verdict.md`: claims 3, 7, and 10 with reproductions A (the standalone selections and the commands that reproduce them), B (the commented-import bypass and its probe), and the journey-assertion attack under claim 10.
- **Ruling for claim 3.** The vendored `tests/config.test.ts` alias case (`:476`, "The workspace selects no alias target") must count sheet faces as alias targets and admit a workspace whose only selection is themes (which plans no alias); the sheet inspector in `tests/setupPolicy.ts` (`:3796`, "Missing script build:src:styles") must require the chained styles-then-themes script only when both targets exist and check standalone `build:src:themes` otherwise, as the compiler plans (`propagation-2`'s ruling: themes-only plans standalone artifacts). Add both standalone selections (`src: []` with `styles` and `themes`; `themes` alone) and the control (`src: ['core']` with both) to the regression population: a case that materializes each through the compilers into a scratch under `os.tmpdir()`, links the checkout package as reproduction A did, and runs the two cases through Vitest, or the smallest equivalent that executes the vendored proof against those generated configurations.
- **Ruling for claim 7.** The shared-import reading at `tests/setupPolicy.ts:539` becomes a parse of the proof's import declarations through `parseAst` from `vite` (a `BASE_DEV_DEPENDENCIES` package the vendored set may import; confirm the export in `node_modules/vite/dist/node/index.d.ts` and name it), reading `ImportDeclaration` sources (static and the `import()` form if the proof uses it), never text; keep every existing admission (a real shared import, a sibling proof, an augmentation-only module, an inventory-vendored module) and add the commented-import control from reproduction B to `SETUP_POLICY_CONTROLS` and the inspector's cases.
- **Ruling for claim 10.** In `tests/guides.test.ts`, the journey assertion pins the seeded arrival journey's refusal statements (`readRefusal('Continue')` with its exact message, the `ACCESSIBLE_ROLES` sweep, and `proven.add('Refusal')`) so deleting them while keeping the family declaration reddens it; the sentence at `guides/scaffold.md:1311` (the nonempty population) and the root-setup sentence hold after claims 3 and 7 land; reread each and adjust the wording only if the repaired instruments still disagree.
- **Tree state and gates.** As the earlier briefs: uncommitted campaign changes everywhere, never touched; `tests/config.test.ts` and `tests/setupPolicy.ts` are vendored, so `npm run build` precedes `test:src:bin`, `test:config`, `test:policy`, `test:guides`, and `test:distribution`; `host.json` differs by regeneration alone; no template changes, so no identity regeneration is expected.
- **Law.** `AGENTS.md`; `.claude/rules/tests.md` (controls; the vendored set imports only `node:` modules and `BASE_DEV_DEPENDENCIES` packages); `.claude/rules/workspace.md` § Configuration authority.

## Unknowns

- Whether `parseAst` handles the TypeScript syntax the proofs carry; Vite's export parses TypeScript through Rollup's parser. Confirm with a fixture carrying `import type` before relying on it, and report.

## Scope

- **Owned.** `tests/config.test.ts`, `tests/setupPolicy.ts`, `tests/setupPolicy.test.ts`, `tests/policy.test.ts` only if the control list must be wired, `tests/guides.test.ts` (the journey assertion), `guides/scaffold.md` (the two sentences, only if they still disagree), `tests/src/core/compilers.test.ts` only if the standalone population is pinned there, `host.json` (regenerated only).
- **Off-limits.** Everything else, `src/**` and `tests/distribution.test.ts` included.
- **Tools and limits.** Read, patch, and the shell. Run: `git status --porcelain`, `git diff`, `node`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json tests`, `npx oxfmt --config .oxfmtrc.json --write <owned files>` and `--check`, `npm run build`, `npm run test:setup`, `npm run test:config`, `npm run test:policy`, `npm run test:guides`, `npm run test:src:bin`, `npm run lint:check`, `npm run test:distribution` (bare, to natural completion), scratch generation under `os.tmpdir()` that you delete, and probes under `tmp/probes/` that you delete. Never run `npm test`, `npm run lint`, or `npm run format` tree-wide; never install in the checkout; never commit.

## Execution

1. Reproduce A and B with the verdict's commands before editing; quote the readings.
2. Land the three rulings with their controls.
3. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json tests`, `npm run build`, `npm run test:setup`, `npm run test:policy`, `npm run test:config`, `npm run test:src:bin`, `npm run test:guides`, `npm run lint:check`, `npm run test:distribution`, then `npx oxfmt --config .oxfmtrc.json --check <owned files>`.
4. Rerun reproductions A and B; both must now pass (A's two selections green, B's commented import reported).

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-fix-9-report.md` with: the files changed; each ruling and its pinning case; the reproduction readings before and after; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when `parseAst` cannot read a proof the vendored set carries, when a gate reddens for a reason outside your files, or when a change needs a file outside the owned set.

## Acceptance criteria

1. `tsc`, scoped lint, scoped format, and `lint:check` exit 0.
2. `build`, `test:setup`, `test:policy`, `test:config`, `test:src:bin`, `test:guides`, and `test:distribution` exit 0.
3. Reproductions A and B pass after the change and are pinned by cases.
4. No file outside the owned set differs from its state at your start; `host.json` differs by regeneration alone; `tmp/probes/` and every scratch directory are empty at the close.

## Review evidence

The diff of the owned files and the report.
