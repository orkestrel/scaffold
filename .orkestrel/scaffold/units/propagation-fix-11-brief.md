# Unit propagation-fix-11 — the vendored config proof admits an adopter's authored sheet and the planned setup composition

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration.

## Objective

Veneer's adoption from the `0.0.82` pack (report: `tmp/units/propagation-9-report.md`) succeeded in one `repair`, and the restored vendored `tests/config.test.ts` then conflicts with veneer's authored shape in two places: (1) `:232-235` requires the themes barrel to open immediately with `@use '../tokens'` and `src/styles/_tokens.scss` to open with scaffold's seed order statement, while veneer's barrel opens with a comment line and its tokens partial declares its own order (`@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;`), which ruling 2 of the design verdict permits ("an adopter authors its own, as veneer does"); (2) `:566-578` expects `setup: ['./tests/setup.ts']` for the `conformance` and `integration` projects, while the generated factories compose `conformance` with `./tests/setupServer.ts` and `integration` through `sheetProject` (`setup.ts`, `setupBrowser.ts`, `setupStyles.ts`) when a sheet face exists, as the verdict's ruling 2 states. Make the vendored proof assert the ruled structure, not the seed's literal text, pin each with a control, and run the gates. A survey run in the veneer checkout executes every gate there in parallel and reports further mismatches; the Orchestrator hands you any that are scaffold defects before you close.

## Context

- **(1) The themes and tokens assertion.** The proof reads the barrel and the tokens partial. Assert, after dropping leading comment lines (`//` and `/* … */`) and blank lines: the barrel's first two directives are `@use '../tokens';` then `@use 'default';` (single or double quotes); the tokens partial's first rule is an order statement `@layer <name>(, <name>)*;` with at least two names (any names); and, where the proof already builds the themes sheet in a scratch (read the existing cases), the built sheet's first rule equals the tokens statement. Controls: a barrel with `default` before `tokens` fails; a tokens partial whose first rule is not a `@layer` statement fails; veneer's two files as fixtures (copy their bytes into the case) pass.
- **(2) The setup expectation.** The expectation map for the workspace-proof projects (`conformance`, `integration`, and the others in that loop) derives each project's setup list from the tree the way the generator plans it: `conformance` carries `['./tests/setup.ts', './tests/setupServer.ts']` (the generated factory at `src/core/templates.ts:690` always composes the server setup); `integration` carries the sheet setup (`setup.ts`, `setupBrowser.ts`, `setupStyles.ts`) through `sheetProject` when a sheet face or themes exists (`styled` at `src/core/compilers.ts:988`, selecting `integration.sheet` at `:1155`), and `['./tests/setup.ts']` in the Node module factory otherwise (`templates.ts:774-780`); these are the ruled lists (design verdict ruling 2: "`integration` composes through `sheetProject` when a sheet face exists"), so the proof's expectation map derives them from the tree the same way (a sheet face or the themes marker selects the sheet list) and asserts the loaded factories return them. Controls: a scratch whose `conformance` factory omits `setupServer.ts` fails; a sheet workspace whose `integration` omits `setupStyles.ts` fails; a workspace without a sheet face whose `integration` carries `setupBrowser.ts` fails.
- **The regression population.** Add to the parameterized standalone cases `propagation-fix-9` placed in `tests/setupPolicy.test.ts` (the generated selections under `os.tmpdir()`) a variant that rewrites the generated `src/styles/_tokens.scss` to veneer's order statement with a leading comment and the themes barrel with a leading comment, and adds `tests/conformance.test.ts`, `tests/integration.test.ts`, and `tests/setupServer.ts` so both proofs register; the vendored config cases must pass there (red before the change, green after).
- **Tree state and gates.** The checkout is clean on `0c657105c`; `tests/config.test.ts` and `tests/setupPolicy.ts` are vendored, so `npm run build` precedes `test:src:bin`, `test:config`, `test:policy`, `test:guides`, and `test:distribution`; `host.json` differs by regeneration alone; no template change is expected (if the factories' setup lists are wrong against ruling 2, stop and report rather than changing them).
- **Law.** `AGENTS.md`; `.claude/rules/tests.md`; `.claude/rules/styles.md` (the per-sheet order statement; the themes barrel sentence); `.claude/rules/workspace.md` § Test project matrix.

## Unknowns

- Whether other vendored cases pin seed-literal text an adopter may author (the entry proof's heading text, the folder barrels' emptiness, the `index.scss` `@use` order): read every case that reads a source file's text, list each with its line, and loosen only those that pin text ruling 2 lets the adopter change; report the rest as held.

## Scope

- **Owned.** `tests/config.test.ts`, `tests/setupPolicy.ts`, `tests/setupPolicy.test.ts`, `tests/policy.test.ts` only if a control list must be wired, `guides/scaffold.md` and `tests/guides.test.ts` only for a sentence that names the loosened assertions, `host.json` (regenerated only).
- **Off-limits.** Everything else, `src/**` included.
- **Tools and limits.** Read, patch, and the shell. Run: `git status --porcelain`, `git diff`, `node`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json tests`, `npx oxfmt --config .oxfmtrc.json --write <owned files>` and `--check`, `npm run build`, `npm run test:setup`, `npm run test:policy`, `npm run test:config`, `npm run test:src:bin`, `npm run test:guides`, `npm run lint:check`, `npm run test:distribution`, scratch generation under `os.tmpdir()` that you delete, and read-only reads of `C:/Users/mikes/WebstormProjects/veneer` (never edit it). Never run `npm test`, `npm run lint`, or `npm run format` tree-wide; never install in the checkout; never commit.

## Execution

1. Reproduce: in a generated scratch (styles, themes, core, browser) with veneer's tokens and barrel bytes and the two proof files added, run the vendored config cases and quote the failures.
2. Make the two changes with their controls; add the regression variant.
3. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json tests`, `npm run build`, `npm run test:setup`, `npm run test:policy`, `npm run test:config`, `npm run test:src:bin`, `npm run test:guides`, `npm run lint:check`, `npm run test:distribution`, then `npx oxfmt --config .oxfmtrc.json --check <owned files>`.
4. Rerun the reproduction; it passes.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-fix-11-report.md` with: the files changed; each change with its control; the list of seed-literal assertions read, loosened or held; the reproduction readings before and after; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a factory's setup list disagrees with the lists Context states, when a gate reddens for a reason outside your files, or when a change needs a file outside the owned set. The previous run's stop (report: `tmp/units/propagation-fix-11-report.md`) came from a browser-setup branch the brief wrongly stated; the lists in Context are the factories' and the ruling's, so the proof follows them.

## Acceptance criteria

1. `tsc`, scoped lint, scoped format, and `lint:check` exit 0.
2. `build`, `test:setup`, `test:policy`, `test:config`, `test:src:bin`, `test:guides`, and `test:distribution` exit 0.
3. The reproduction passes after the change; each loosened assertion keeps a control.
4. No file outside the owned set differs from its state at your start; `host.json` differs by regeneration alone; no scratch directory remains.

## Review evidence

The diff of the owned files and the report.
