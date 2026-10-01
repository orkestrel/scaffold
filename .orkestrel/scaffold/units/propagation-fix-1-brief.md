# Unit propagation-fix-1 — close the first audit round's rulings

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration.

## Objective

Land every ruling `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-audit-1-reconcile.md` marks for `propagation-fix-1`, each with the proof that would redden if it regressed, so the integration round attacks a generator that no longer carries the defects the first round found.

## Context

- **The rulings.** The reconciliation (read it whole; its claim rows 1, 2, 9, 10 and its findings F1 to F11 name the change, the file, and the line as the lanes read them; lines may have shifted since `propagation-4` landed, so grep the symbol). The two verdicts it reconciles carry the evidence and the smallest correction per item: `propagation-audit-1-analyst-verdict.md`, `propagation-audit-1-reviewer-verdict.md`.
- **The reports.** `propagation-1-report.md` to `propagation-4-report.md` and `nested-1-report.md` (what each unit landed and where it proved it). Read `propagation-4-report.md` first: it landed last, and it regenerated identity files and moved template lines.
- **The design.** `propagation-design-verdict.md` rulings 1 to 5 bind; the reconciliation applies them.
- **Identity set and tree state.** As `propagation-4-brief.md` § Scope states: this checkout is a generated target, so a template change whose materialized file exists here regenerates that file from the compiler's output (root `vite.config.ts`, `tsconfig.json`, `configs/src/vite.{core,server,bin}.config.ts`, the `configs/src/tsconfig.*.json` wrappers), owned for regeneration alone, with each diff quoted; the checkout carries uncommitted changes from every earlier unit, which you never touch, revert, stash, or clean; `npm run build` precedes `npm run test:src:bin` and `npm run test:config` because both refuse a stale `host.json`, and `host.json` differs by regeneration alone.
- **Law.** `AGENTS.md`, `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `workspace.md`, `writing.md` § Instruction files (for the two law-sentence edits).
- **Host.** Windows 11, Node 24; `node_modules` installed. Never commit; never install.

## Unknowns

- Whether F5 (routing `srcBrowser` and `srcServer` through `resolveExternal`) changes this checkout's root `vite.config.ts` beyond the two factories; the identity proof and the quoted diff settle it.

## Scope

- **Owned.** `src/core/{types,constants,validators,parsers,compilers,templates}.ts`, `src/bin/{types,helpers,CLI}.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `AGENTS.md:62` (the one sentence), `.agents/skills/orkestrel-harden/references/centralization.md:31-33` (the one pointer), `tests/src/core/{types,constants,validators,parsers,compilers,templates}.test.ts`, `tests/src/bin/{helpers,CLI}.test.ts`, `tests/config.test.ts` for the `no-nested-functions` tester block, the lint-population block's `src/bin` control, and the `configs/helpers.ts` helper cases (no other block), the identity set (regenerated only), `host.json` (regenerated only).
- **Owned, in addition.** `tests/guides.test.ts` for the identifier rename alone (`targetToSurfaces` → `targetToFacts` at `:63`, `:386`, `:397`, `:413`, and nowhere else in that file), because root `tsc` covers that proof and `AGENTS.md` forbids a compatibility shim; and `guides/scaffold.md:632` for the one sentence that says `--showcase` and `--extend` "select the surfaces and the extensions", which becomes "select the structural facts and the extensions". Report every other guide sentence or `## Surface` row your renames reach, with the line, for `propagation-8` pass 2.
- **Shared (report-only).** The rest of `guides/scaffold.md` and `tests/guides.test.ts`, `tests/setupPolicy.ts` and the vendored face enumerations (`propagation-5`).
- **Off-limits.** `.claude/**`, the rest of `AGENTS.md`, `.agents/**` beyond the one pointer, the rest of `guides/**`, `tests/distribution.test.ts`, `.orkestrel/**`, `.prettierignore`, the veneer checkout.
- **Tools and limits.** Read, patch, and the shell (Windows host: quote paths). Run: `git status --porcelain`, `git diff`, `node`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npm run check:src:server`, `npm run check:src:bin`, `npx oxlint --config .oxlintrc.json src tests/src tests/config.test.ts configs`, `npx oxfmt --config .oxfmtrc.json --write <owned files>` and `--check`, `npm run test:src:core`, `npm run test:src:server`, `npm run test:src:bin`, `npm run build`, `npm run test:config`, `npm run test:policy`, `npm run lint:check`, `npm run test:guides` (as an observation: quote every failure line and continue, because the guide's pass 2 follows this unit), and `node dist/bin/main.js … --offline` against a scratch directory under `tmp/` that you delete. Never run `npm test`, `npm run lint`, or `npm run format` tree-wide; never install.

## Execution

In the reconciliation's order, each with its proof:

1. Claim 1: delete `ViteMachinery.vue`; its readers read `frameworks.includes('vue')`; the example and the two assertions follow.
2. Claim 2: the migration question's `blocking` is `writing`; an audit case asserts `blocking: false` and a clean exit on an otherwise aligned target; the repair and overwrite refusals keep their cases.
3. Claim 9: a method, getter, or setter property of an object literal is admitted only when `functionToPolicyPosition` of its containing `ObjectExpression` is an admitted position; `MethodDefinition` unchanged; the local-binding method twin is an invalid case; `AGENTS.md:62` and the harden reference's lines 31–33 take the reconciliation's sentences, swept for the substitution table.
4. Claim 10: delete the `@src/styles/themes` alias and its assertion; `setup:browser` gets `vue` in `optimizeDeps.include` when `frameworks` holds `vue`, with a case and a without-extension control.
5. F1: `blueprintToQuestions` blocks on a repeated extension (same surface and name) and raises a non-blocking question for empty axes, for an axis whose selection lacks `browser`, and for a styles extension without `styles`; `blueprintToDevDependencies` and `blueprintToMachinery` read occupied axes only; cases for each question and a control that the CLI's own creation path raises none.
6. F2: `targetToSurfaces` becomes `targetToFacts` (declaration, callers, tests); report the guide lines it reaches.
7. F3: `FrameworkDefinition.packages` becomes `refused` and `sources` becomes `suffixes`, with TSDoc on every member; `FRAMEWORK_MATRIX`, the call sites, and the tests follow.
8. F4: `resolveExternal` gives a refused scope its own message naming the public package to import; a case per message.
9. F5: `srcBrowser` and `srcServer` route through `resolveExternal` with the resolved core entry as a sibling; `@src/core` stays external with its `output.paths` rewrite; regenerate the identity set and quote each diff; a case per factory with a bundled-alias control.
10. F6: the `src/bin` lint block refuses `@src/vue`, `@orkestrel/<name>/vue`, and the relative `vue` and `src/vue` directories as the `src/server` block does; a control in the lint-population block.
11. F7: `app/vue/index.ts` takes the empty seed; the planning case follows.
12. F8: the themes barrel seed reads `@use 'default';`; the seed case follows.
13. F9: `check:src` is emitted only with scoped members and joins `check` only then; a themes-only case and a styles case.
14. F10: `NewCommand`'s remarks document `styles`, `themes`, `showcase`, and `extensions` (the selection behind `--extend`).
15. F11: an `isSurface` guard reads `SURFACES`, and `parseExtension`'s text form checks the surface through it; a guard case with a control.
16. One alignment `propagation-4` left: `npm run test:src:bin` fails one case, `tests/src/bin/CLI.test.ts` "CLI audit > stays silent on a global setup module carrying the bytes scaffold seeds" (`:3147`), because the generator now seeds `tests/setupGlobal.test.ts` beside `tests/setupGlobal.ts` and therefore plans the `setup` project and the `test:setup` script; the fixture target carries the module alone, so the audit reports the missing script and project. Give the fixture the seeded proof and the planned script (what `new` writes), so the case keeps proving silence on seeded bytes; keep its mutation half (a changed module raises the question) as it is.
17. Consolidate; then run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npm run check:src:server`, `npm run check:src:bin`, `npx oxlint --config .oxlintrc.json src tests/src tests/config.test.ts configs`, `npm run test:src:core`, `npm run test:src:server`, `npm run build`, `npm run test:src:bin`, `npm run test:config`, `npm run test:policy`, `npm run lint:check`, `npm run test:guides` (observation), then `npx oxfmt --config .oxfmtrc.json --check <owned files>`.
18. Generate `node dist/bin/main.js new paper --target tmp/scratch-fix --src core,browser --app core,browser --styles --themes --showcase --extend browser:vue,styles:print --offline`, confirm `app/vue/index.ts` is the empty seed, the themes barrel reads `@use`, and no `@src/styles/themes` alias is emitted, quote the three readings, and delete the directory.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-fix-1-report.md` with: the files changed; each ruling and the case that pins it; the identity-set diffs; the three scratch readings; the guide lines your renames reach; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a ruling contradicts a design ruling as the tree now stands, when the identity set changes beyond what F5 explains, when a gate reddens for a reason outside your files, or when a change needs a file outside the owned set.

## Acceptance criteria

1. Root `tsc`, the three scoped checks, scoped lint, and scoped format exit 0.
2. `test:src:core`, `test:src:server`, `test:src:bin`, `build`, `test:config`, `test:policy`, and `lint:check` exit 0; `test:guides` is quoted.
3. Every ruling has its pinning case; the scratch readings match.
4. No file outside the owned set differs from its state at your start; `host.json` and the identity set differ by regeneration alone; `tmp/probes/` and `tmp/scratch-fix/` hold nothing of yours.

## Review evidence

The diff of the owned files and the report.
