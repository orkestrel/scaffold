# Unit propagation-fix-3 — close the integration round's subjective rulings

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration.

## Objective

Land every ruling `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-audit-2-reconcile.md` marks for `propagation-fix-3`, each with the proof that would redden if it regressed, so the objective lane's rerun attacks a generator that no longer carries them.

## Context

- **The rulings.** The reconciliation (read it whole: claim rows 2, 10, 11, findings F1 to F5, and the four referrals) and the reviewer verdict it reconciles (`propagation-audit-2-reviewer-verdict.md`, which carries the evidence, the line as read on 2026-10-01, and the smallest correction per item; lines may have moved since `propagation-6` landed, so grep the symbol).
- **The reports.** `propagation-1-report.md` to `propagation-6-report.md`, `nested-1-report.md`, `propagation-fix-1-report.md`, `propagation-fix-2-report.md`, `propagation-8-report.md`. Read `propagation-6-report.md` first: it landed last.
- **The design.** `propagation-design-verdict.md` rulings 1 to 9 bind; the reconciliation applies them.
- **Identity set and tree state.** This checkout is a generated target: a template change whose materialized file exists here regenerates that file from the compiler's output (root `vite.config.ts`, `tsconfig.json`, the `configs/src/vite.*.config.ts` and `configs/src/tsconfig.*.json` wrappers), owned for regeneration alone, each diff quoted; the checkout carries uncommitted changes from every earlier unit, never touched, reverted, stashed, or cleaned; `npm run build` precedes `npm run test:src:bin`, `npm run test:config`, `npm run test:policy`, and `npm run test:guides` because the vendored files and `host.json` must agree; `host.json` differs by regeneration alone.
- **Law.** `AGENTS.md`, `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md` (§ Shared test infrastructure for 11a), `workspace.md`, `writing.md` § Instruction files (for every rule and guide sentence), `documentation.md` (parity: a `## Surface` row equals its doc paragraph; a prose claim has its executed assertion).
- **Host.** Windows 11, Node 24; `node_modules` installed. Never commit; never install.

## Unknowns

- Whether moving the seven helpers into `tests/setupPolicy.ts` changes what the `surface` policy rule inspects (root `tests/setup*.ts` exports are in its population): run `npm run test:policy` and read it bare; a fleet-name collision is a stop.
- Whether hoisting the root factories' local function bindings changes this checkout's `vite.config.ts` beyond the hoisted declarations; the identity proof and the quoted diff settle it.

## Scope

- **Owned.** `src/core/{types,validators,parsers,compilers,templates}.ts`, `src/bin/{types,helpers,CLI}.ts`, `configs/policy.ts`, `AGENTS.md` only if a sentence the reconciliation names lives there (none is expected), `.claude/rules/{architecture,workspace,documentation,browser,application}.md` for the sentences the reconciliation names (10a, 10b, 10g, 10h, F3, F4) and nothing else, `guides/scaffold.md` for the sentences the reconciliation names (10c, 10d, 10e, 10f) and the generated-index description if F5 needs one, `tests/guides.test.ts` for the assertions those sentences pin (10f's strengthened assertion, the F3 sentence's guard, the writable-region sentence's assertion), `tests/config.test.ts` (the helper block moves out; its cases import from `./setupPolicy.js`; the scratch and JSON round-trip edits of 11a), `tests/setupPolicy.ts` and `tests/setupPolicy.test.ts` (the seven helpers and their proofs; the `^export ` anchoring control), `tests/policy.test.ts` only if a control list must be wired, `tests/src/core/{compilers,templates,validators,parsers}.test.ts`, `tests/src/bin/{helpers,CLI}.test.ts`, the identity set (regenerated only), `host.json` (regenerated only).
- **Owned, in addition.** `tests/distribution.test.ts` for items 13B and 13D alone; `.claude/rules/styles.md` for the themes-barrel sentence of 13A.
- **Shared (report-only).** `tests/setupServer.ts` and `tests/setupServer.test.ts` (`propagation-6`'s), `configs/helpers.ts` (F1 changes the template that emits the executable wrapper, not the helper).
- **Off-limits.** `.agents/**`, `.claude/skills/**`, `.orkestrel/**`, `.prettierignore`, `.oxlintrc.json`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, the veneer checkout.
- **Tools and limits.** Read, patch, and the shell (Windows host: quote paths). Run: `git status --porcelain`, `git diff`, `node`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npm run check:src:server`, `npm run check:src:bin`, `npx oxlint --config .oxlintrc.json src tests configs`, `npx oxfmt --config .oxfmtrc.json --write <owned files>` and `--check`, `npm run test:src:core`, `npm run test:src:server`, `npm run test:src:bin`, `npm run build`, `npm run test:setup`, `npm run test:config`, `npm run test:policy`, `npm run test:guides`, `npm run lint:check`, and `node dist/bin/main.js … --offline` against a scratch directory under `os.tmpdir()` that you delete. Never run `npm test`, `npm run lint`, or `npm run format` tree-wide; never install.

## Execution

In the reconciliation's order, each with its proof:

1. Claim 2: one exported projection in `compilers.ts` of the occupied (framework, axis) pairs (`extension.axes` filtered by `blueprint[axis].includes('browser')`), read by `blueprintToMachinery`, `blueprintToDevDependencies`, `blueprintToScripts`, `blueprintToWritableScripts`, `blueprintToExports`, `blueprintToRootTsconfig`, `blueprintToRootVite`, and the config, source, test, and guide artifact compilers; an unplaced extension emits nothing; the `desk` blueprint of the verdict (`app: ['core']`, `vue` on `app`) emits no `vue-tsc`, no `appVue`, no face, no alias, no script; cases for both axes placed, one placed, none placed.
2. Claim 10a, 10b, 10g, 10h, F3, F4: the rule sentences, each as the reconciliation states; swept for the substitution table.
3. Claim 10c, 10d, 10e, 10f: the guide sentences; 10f's assertion also asserts `blueprintToRootVite(unplaced)` carries neither `appVue` nor `srcVue`; every changed sentence keeps or gains its executed assertion in `tests/guides.test.ts`.
4. Claim 11a: the seven helpers (`collectSheets`, `collectFrameworks`, `readConfigRecord`, `readConfigScript`, `collectFaceWrappers`, `inspectSheetConfiguration`, `readImportDiagnostics`) move to `tests/setupPolicy.ts` with TSDoc, proofs in `tests/setupPolicy.test.ts` (a case per helper with a control), `tests/config.test.ts` imports them; its hand-rolled scratch directories go through `createPolicyScratch`; the JSON round trip of plain objects goes.
5. Claim 11b: `ARTIFACT_TEMPLATES.tests.global` and `.styles` become `{ module, proof }` groups; the sheet integration factory sits under one `integration` group; every reader and test follows.
6. Claim 11c: one exported position predicate in `configs/policy.ts` used by `reportNested`, `isPolicyCallback`, and `isPolicyResult`; the tester unchanged in outcome.
7. Claim 11d: `@example` on `isBrowserExtension`, `isStylesExtension`, and `isExtension`; an `import` line in every added example (`validators.ts`, `parsers.ts`, `compilers.ts`); `npm run test:guides` must stay green on their summaries.
8. Claim 11e: `SheetAdoption` as an exported interface in the `tests/setupStyles.ts` seed; `adoptSheet` returns it; the seeded proof and the emitted-format case follow.
9. F1: the executable wrapper template routes through `resolveExternal` with `@src/` kept external; the identity set regenerates if this checkout carries the wrapper (it does: `configs/src/vite.bin.config.ts`); quote the diff.
10. F2: the five TSDoc remarks name what the code does.
11. F5: `blueprintToGuideArtifacts` lists the occupied Vue faces in the source, test, and directory lists and a showcase line per page when the showcase is selected; cases with and without.
12. The four referrals: the writable region gains `showcase`, `showcase:<framework>`, `build:showcase`, `build:showcase:<framework>`, and `test:journey:<framework>` with their generated predecessors (cases); the root factories' local function bindings (`fileName`, the stamp plugin's `generateBundle`, `writeBundle`) hoist to module scope or inline into the returned literal, this checkout's `vite.config.ts` regenerates, and the emitted-format and identity cases follow; the seeded `tests/setupGlobal.test.ts` proves the seeded `setup` with a control that can fail; a control in `tests/setupPolicy.test.ts` with an indented `export` inside a `declare module` block that the mirror does not flag.
13. The adopter's four findings (`propagation-6-report.md`, the continuation's failure report; the adopter now runs under `os.tmpdir()` and passed lint and typechecking before these): (A) the themes barrel seed reads `@layer …;` then `@use 'default';`, and Sass refuses a `@use` after any other rule; veneer's working barrel (`C:/Users/mikes/WebstormProjects/veneer/src/styles/themes/index.scss`) is `@use '../tokens';` then `@use 'default';`, where the sheet's `_tokens.scss` emits the order statement as its first rule, so the seed becomes exactly that two-line form, the compilers case and the guide's sentence and assertion follow, and `.claude/rules/styles.md`'s sentence "Open `themes/index.scss` with its own order statement rather than loading `tokens`" becomes "Open `themes/index.scss` with `@use '../tokens'`, whose first emitted rule is the order statement, then `@use 'default'`; Sass refuses a `@use` after another rule, so never write the statement there literally"; the config proof's themes case still reads the built themes sheet's first rule as the statement. (B) `tests/distribution.test.ts:805` lists every glossed shipped example exactly; add the two `parseExtension` lines the failure prints. (C) `tests/config.test.ts` "collects both browser setup proofs and optimizes every selected browser factory" throws `Expected a configuration record` in a generated core/server workspace with no browser factory (`readConfigRecord`, about `:507`); require that population only where a browser marker exists, as the enumeration cases do. (D) `tests/distribution.test.ts:1342` "renders a Vue SFC through the generated browser setup project" generates a browser workspace and writes an SFC under `app/browser` with a `tests/setupBrowser.ts` importing `vue`, the shape this campaign retired; generate it with `--extend browser:vue`, put the SFC under `app/vue`, import from there, and keep its `setup:browser` assertions. `tests/distribution.test.ts` is owned for (B) and (D) alone now that `propagation-6` has landed.
14. Consolidate; then run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npm run check:src:server`, `npm run check:src:bin`, `npx oxlint --config .oxlintrc.json src tests configs`, `npm run test:src:core`, `npm run test:src:server`, `npm run build`, `npm run test:src:bin`, `npm run test:setup`, `npm run test:config`, `npm run test:policy`, `npm run test:guides`, `npm run lint:check`, `npm run test:distribution` (bare, to natural completion: the adopter must now run every step, and its page-stamp readings, CSS consumer result, repair byte comparison, stale audit finding, and wall time are quoted in the report; a failure in a generated script is quoted bare and is a stop), then `npx oxfmt --config .oxfmtrc.json --check <owned files>`.
15. Generate `node dist/bin/main.js new desk --target <os.tmpdir()>/scaffold-fix-3 --src core,browser --app core,browser --styles --themes --showcase --extend browser:vue,styles:print --offline`, confirm the generated `guides/README.md` lists the Vue faces and the showcase pages, that the generated `package.json` carries the showcase and journey scripts, and that the root `vite.config.ts` declares no function inside a factory body outside the admitted positions (read it), quote the three readings, and delete the directory.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-fix-3-report.md` with: the files changed; each ruling and the case that pins it; the identity-set diffs; the three scratch readings; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a ruling contradicts a design ruling as the tree now stands, when the identity set changes beyond what F1 and the hoisting explain, when `test:policy` reports a fleet-name collision for a moved helper, when a gate reddens for a reason outside your files, or when a change needs a file outside the owned set.

## Acceptance criteria

1. Root `tsc`, the three scoped checks, scoped lint, and scoped format exit 0.
2. `test:src:core`, `test:src:server`, `test:src:bin`, `build`, `test:setup`, `test:config`, `test:policy`, `test:guides`, `lint:check`, and `test:distribution` exit 0, the last with the adopter case complete.
3. Every ruling has its pinning case; the three scratch readings match.
4. No file outside the owned set differs from its state at your start; `host.json` and the identity set differ by regeneration alone; `tmp/probes/` holds nothing of yours and no scratch directory remains.

## Review evidence

The diff of the owned files and the report.
