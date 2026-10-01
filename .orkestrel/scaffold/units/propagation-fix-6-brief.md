# Unit propagation-fix-6 — bring the vendored proofs and the templates to the generated full selection, iterating the adopter to green

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration.

## Objective

The packed adopter in `tests/distribution.test.ts` (report: `tmp/units/propagation-fix-5-report.md` § Adopter readings) passes `lint:check`, `check`, `build`, `test:src`, `test:app`, and `test:setup:browser` in the generated full selection and fails at the generated workspace's own `test:config`: five cases of the vendored `tests/config.test.ts` assume shapes the generator no longer emits, and one reveals a template gap. This checkout selects no face, so those cases run live only in an adopter, which is why they reached this point unexercised. Close the five, then iterate: rerun the adopter, and close every further mismatch its remaining steps reveal (`test:policy`, `test:journey`, `test:journey:vue`, `build:showcase`, `build:showcase:vue`, the page stamps, the CSS consumer, the wrapper repair, the stale audit), each with its pinning case, until `npm run test:distribution` exits 0 with the adopter complete; stop only on a failure whose cause lies outside the owned set.

## Context

- **The five, with the ruling for each** (bare output in the fix-5 report):
  1. `selected faces > loads each selected sheet and framework wrapper and checks its packaging and browser project` (`tests/config.test.ts:231`) expects `src/styles/themes/index.scss` to open with `@layer …;`; the seed is `@use '../tokens'; @use 'default';` by ruling (fix-3 item 13A). The proof asserts what the ruling states: the built `dist/src/styles/themes/index.css`'s first rule is the order statement (build the face in the proof's scratch, or read the sheet's `_tokens.scss` first rule and the barrel's first `@use` target), with a control that a barrel opening with `@use 'default'` alone fails.
  2. `selected faces > resolves showcase and journey modes for every occupied application` (`:299`) expects `build.outDir === 'showcase'`; the emitted factory resolves it against the workspace root. The proof compares the resolved path (`relative(root, outDir) === 'showcase'`), with a control.
  3. `root configuration > registers every workspace project with its fixed include and setup files` (`:646`) requires a `setup` project factory; the full selection seeds a browser setup proof only, so the generator registers `setup:browser` alone, as `.claude/rules/workspace.md` § Test project matrix states. The proof requires `setup` only when a Node setup proof exists and `setup:browser` only when a browser one does, from the tree, with a control.
  4. `root configuration > returns the invocation mode and no other invocation field from every registered project factory` (`:774`) treats every registered project as a callable factory; the sheet projects are registered by wrapper path (strings). The proof reads the registration shape the root config declares (a factory forwards the mode; a wrapper path is loaded as a file project) and asserts each by its kind, with a control.
  5. `root configuration > requires and validates every selected target wrapper` (`:956`) expects the Vue application wrapper's `types` to be `['vite/client', 'vue']` and the emitted `configs/app/tsconfig.vue.json` carries `['vite/client']` alone: a template gap, because `.claude/rules/workspace.md` § Typechecking's `app:vue` row names `DOM`, `vite/client`, and `vue` (propagation-fix-3 item 10h), and the pre-campaign browser wrapper carried `vue` whenever Vue was on. Repair the template so the `app/vue` wrapper (and the `src/vue` wrapper if the rule row names it) carries `"vue"` in `types`; the compilers test pins it; the proof's expectation stands.
- **The iteration.** After the five, rebuild (`npm run build`), run `npm run test:distribution` bare to natural completion, read the adopter's step table, and for each further generated-script failure: name the cause with the file and line, decide whether the proof assumes a retired shape (then the proof follows the ruling, with a control) or the generator emits the wrong thing (then the template or compiler follows the ruling, with a mirrored case), repair, rebuild, and rerun. Quote every adopter reading in the report, including the ones that passed earlier. Bound: stop after the sixth adopter run if it is not green, and report what remains with its evidence.
- **Tree state and gates.** As the earlier briefs: uncommitted campaign changes everywhere, never touched; this checkout is a generated target (regenerate the identity set if a template this checkout materializes changes, and quote the diff); `npm run build` before `test:src:bin`, `test:config`, `test:policy`, `test:guides`, and `test:distribution`; `host.json` differs by regeneration alone.
- **Law.** `AGENTS.md`; `.claude/rules/tests.md` (controls; membership assertions); `.claude/rules/workspace.md` as the tree holds it (the generator follows the rule, and a proof follows the rule; where the two disagree, the rule wins and the report names the sentence).

## Unknowns

- How many adopter iterations the remaining steps need; the bound is six runs.

## Scope

- **Owned.** `tests/config.test.ts`, `tests/setupPolicy.ts` and `tests/setupPolicy.test.ts` (a shared helper a proof needs), `tests/policy.test.ts` only if a control list must be wired, `src/core/{compilers,templates}.ts`, `tests/src/core/{compilers,templates}.test.ts`, `tests/src/bin/CLI.test.ts` only to align an expectation a template change reddens, `guides/scaffold.md` and `tests/guides.test.ts` only where a sentence or assertion names a changed shape, the identity set (regenerated only), `host.json` (regenerated only).
- **Off-limits.** `tests/distribution.test.ts` (the oracle: it changes only if it asks for what the plan does not emit, and then the report says so and the Orchestrator rules), `tests/setupServer.ts`, `configs/**` except through regeneration, `.claude/**`, `AGENTS.md`, `.agents/**`, `.orkestrel/**`, the veneer checkout.
- **Tools and limits.** Read, patch, and the shell. Run: `git status --porcelain`, `git diff`, `node`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npx oxlint --config .oxlintrc.json src tests configs`, `npx oxfmt --config .oxfmtrc.json --write <owned files>` and `--check`, `npm run test:src:core`, `npm run build`, `npm run test:src:bin`, `npm run test:setup`, `npm run test:config`, `npm run test:policy`, `npm run test:guides`, `npm run lint:check`, `npm run test:distribution`, and a generated scratch under `os.tmpdir()` (generate, install, run its scripts, delete) to reproduce a step outside the full distribution run. Never run `npm test`, `npm run lint`, or `npm run format` tree-wide; never install in the checkout; never commit.

## Execution

1. Close the five as Context rules, each with its control or mirrored case.
2. Run the local sequence: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npx oxlint --config .oxlintrc.json src tests configs`, `npm run test:src:core`, `npm run build`, `npm run test:src:bin`, `npm run test:setup`, `npm run test:config`, `npm run test:policy`, `npm run test:guides`, `npm run lint:check`.
3. Iterate the adopter as Context states until `npm run test:distribution` exits 0 or the bound is reached; after each repair, rerun the local sequence from the formatter.
4. The `desk` scratch readings `propagation-fix-5-brief.md` step 3 prescribes, quoted, then delete every scratch directory.
5. `npx oxfmt --config .oxfmtrc.json --check <owned files>`.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-fix-6-report.md` with: the files changed; each repair with its cause, its ruling (proof or generator), and its pinning case; every adopter run's step table; the final adopter readings (page stamps against `computeStamp`, the CSS consumer result, the repair byte comparison, the stale audit finding, the wall time); the identity-set diffs if any; the `desk` readings; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a cause lies outside the owned set (naming the file and line), when the oracle asks for what the plan does not emit (naming the step), when the bound is reached, or when a gate reddens for a reason outside your files.

## Acceptance criteria

1. `tsc`, scoped check, scoped lint, scoped format, and `lint:check` exit 0.
2. `test:src:core`, `build`, `test:src:bin`, `test:setup`, `test:config`, `test:policy`, `test:guides`, and `test:distribution` exit 0, the last with the adopter complete and its readings quoted.
3. Every repair has its pinning case; the `desk` readings match.
4. No file outside the owned set differs from its state at your start; `host.json` and the identity set differ by regeneration alone; no scratch directory remains.

## Review evidence

The diff of the owned files and the report.
