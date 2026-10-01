# Round propagation-audit-2 — falsify the integrated generator

Fill every section. Write `none` in an empty one.

## Role and engine

Two blind lanes, each read-only, each with a clean context, each writing one verdict file and editing nothing tracked:

- **Objective lane:** `analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief, in `C:/Users/mikes/WebstormProjects/scaffold`. You may run read-only commands and tests (`git status --porcelain`, `git diff`, `node`, `npx vitest run --config vite.config.ts --project <project> <file>`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json <paths>`, `node node_modules/oxlint/bin/oxlint --no-ignore <files>` against scratch fixtures under `tmp/`, `node dist/bin/main.js … --offline` against a scratch directory under `tmp/` that you delete, and `node dist/bin/main.js audit --offline --json` on this checkout), and write probes under `tmp/probes/` that you delete before closing. Never edit a tracked file; never run `npm run build`, `npm run lint`, `npm run format`, or any mutating npm script; never install; never commit. Executor: BENCH_ENGINE. Attack correctness, constraints, and test sufficiency.
- **Subjective lane:** `reviewer` on Claude Opus 5.5, native Agent dispatch, Read, Grep, and Glob only. Attack design fit, API shape and vocabulary, architecture placement, and the rule and guide text's agreement with the implementation.

Follow `.agents/skills/orkestrel-falsify/SKILL.md` and the references it names for the verdict's shape: one row per claim, `CONFIRMED`, `BROKEN`, or `UNRESOLVED`, each with the evidence that decides it (a file and line, a command and its bare output, or a probe and its control), and one closing `VERDICT:` line. A `BROKEN` row names the smallest change that would turn it `CONFIRMED`. Perform the whole lane yourself and spawn nothing.

## Objective

Falsify the twelve claims below over the uncommitted working tree after every writing unit of the scaffold campaign has landed (`propagation-1` to `propagation-6`, `nested-1`, `propagation-7`, `propagation-8` passes 1 and 2, `propagation-fix-1`, `propagation-fix-2`). The tree is quiescent: no unit writes in parallel, no file is excluded, and `tests/distribution.test.ts`, `tests/setupServer.ts`, and `host.json` are inside the round like every other file (read `tmp/units/propagation-6-report.md` for what the adopter unit landed and proved).

## Context

- **The rulings.** `tmp/units/propagation-design-verdict.md` (rulings 1 to 9); `tmp/units/propagation-audit-1-reconcile.md` (the first round's rulings and the eleven adopted findings); the user's rulings: a root `tests/setup<Name>.ts` module owes its sibling proof; `policy/no-nested-functions` admits a callback inside an object or array literal in an argument or return position, named or anonymous.
- **The reports.** Every `tmp/units/propagation-*-report.md`, `nested-1-report.md`, and the two first-round verdicts. A report is a claim, never evidence.
- **The law.** `AGENTS.md`, every `.claude/rules/*.md`, the journey skill and its references, as the working tree holds them.
- **The reference target.** `C:/Users/mikes/WebstormProjects/veneer` (read-only), the hand-built shape the generator reproduces.

## Claims

1. **First-round rulings closed.** Each ruling `propagation-audit-1-reconcile.md` marks for `propagation-fix-1` (claims 1, 2, 9, 10; F1 to F11) and the global-setup fixture alignment is in the tree with a case that reddens if it regressed: `ViteMachinery` has no `vue` member; the migration question blocks writing verbs only and `audit` exits clean on an otherwise aligned target; a method, getter, or setter property is admitted only in an admitted literal position and `MethodDefinition` is untouched; no `@src/styles/themes` alias; `setup:browser` carries `vue` in `optimizeDeps.include` only when `frameworks` holds `vue`; `blueprintToQuestions` blocks a repeated extension and advises on empty axes, an axis without `browser`, and a styles extension without `styles`; `targetToFacts`; `FrameworkDefinition.refused` and `.suffixes` with TSDoc; the refused-scope message; `srcBrowser` and `srcServer` through `resolveExternal`; the `src/bin` lint block's Vue refusals; the empty `app/vue` barrel; `@use 'default'`; `check:src` only with members; the `NewCommand` remarks; `isSurface` over `SURFACES`.
2. **Vue follows the extension** (first-round claim 4, re-attacked on a quiescent tree), including the `src`-only and `app`-only axis cases and the root `check` checker.
3. **Styles surface** (first-round claim 5), including `_index.scss` folder barrels, the themes barrel's own order statement and `@use 'default'`, `tests/setupStyles.ts` with `tests/setupStyles.test.ts`, `tests/setupGlobal.test.ts` beside the global seed, and the themes-only standalone plan.
4. **Vue faces** (first-round claim 6), including `resolveExternal`'s admissions, refusals, and both messages.
5. **Modes.** For a browser application with the `vue` extension on the `app` axis and `--showcase`: `appShowcase(mode, override?)` resolves `undefined`, `development`, `production`, and `test` to `browser` and `vue` to `vue`, throws on an undeclared mode, builds into root `showcase/` with `emptyOutDir: false`, stamps the final page after the single-file plugin with `stampPage`, and renames `index.html` to `<application>.html`; `appJourney(variant, variants, mode?)` resolves the same way, includes `tests/app/<application>/integration.test.ts`, clears the exclude, and provides `variant`, `variants`, and `capture`; the scripts `showcase`, `showcase:vue`, `build:showcase`, `build:showcase:vue`, `test:journey`, `test:journey:vue`, and the `prepublishOnly` rebuild are emitted; `.prettierignore` lists `showcase/`; no emitted file names `dist/showcase`, `show`, or `demo/showcase.html`; the seeded arrival journeys prove Journey, Refusal, Matrix, and Capture under the flag; `computeStamp` and `stampPage` match their digest vectors and refuse a second stamp line and a malformed head.
6. **Lint config matches through the real binary.** Every `no-restricted-imports` pattern in `.oxlintrc.json` refuses its refused fixture and admits its admitted fixture through `node_modules/oxlint/bin/oxlint` (the proof at `tests/config.test.ts` drives it; re-derive three of them yourself with fresh fixtures, one per rewritten family: a scheme, a `..` segment, a sheet alias); the trailing override reaches root files alone (`./*.{cjs,cts,js,mjs,mts,ts}`); and `tests/config.test.ts`'s matrix collects every mismatch before asserting and reddens under a disabled restriction.
7. **Vendored proofs enumerate from the tree.** `tests/config.test.ts` enumerates sheet and framework faces from the tree, never from emitted wrappers, requires non-empty populations only where a marker exists, loads every selected wrapper, and carries the mutation controls (a deleted wrapper fails; a removed `setupStyles` entry fails; a reversed themes order fails; a removed Vue restriction fails; disabled rewrites fail; a second stamp line fails); the root setup mirror in `tests/setupPolicy.ts` proves both directions with its five controls and no name-based exemption, and `tests/policy.test.ts` wires the controls; `tests/setupPolicy.test.ts` proves the inspector.
8. **Identity and vendoring.** `node dist/bin/main.js audit --offline --json` on this checkout reports no stale content-owned configuration (quote the output); `host.json` equals the vendored bytes (the config proof's inventory case, rerun bare); `configs/helpers.ts` imports only `node:` modules, `vite`, and `BASE_DEV_DEPENDENCIES` packages; `templates.ts` holds data only; the `probe` project and `tmp/probes/` arming are intact.
9. **Contract, derivation, and creation** (first-round claims 1 to 3) still hold after the fixes: guards total, parse/guard sound, `#derive` reads every marker, `new` refuses as ruled, `--surfaces` unknown.
10. **Rules and guide agree with the tree.** Every sentence `propagation-7` wrote, the two sentences `nested-1` and `propagation-fix-1` wrote in `AGENTS.md` and the harden reference, and every sentence the guide's two passes wrote describe what the generator emits now, including the `_index.scss` barrels, the showcase page name, the journey modes, the setup mirror, the lint-block directions, the vendored proofs, the migration guard's non-blocking audit, and the `development` fallback; every `## Surface` row equals its doc paragraph (`npm run test:guides`, rerun bare); every executed assertion in `tests/guides.test.ts` would break if its sentence went false (attack three of your choosing by reading the assertion against the sentence).
11. **Placement and shape.** No nested function outside the admitted positions in the added source and emitted seeds; no superfluous wrapper; every helper in its kind file and exported and tested; every public member one word; `templates.ts` data only; every new public export with TSDoc in the prescribed voice; the barrel star-exports only; `names.md` prefixes honoured (`resolve*`, `*To*`, `is*`, `parse*`, `create*`).
12. **Completeness.** What the campaign's exit criterion (`.orkestrel/scaffold/plan.md` § Exit criterion) still lacks on this tree: name each gap with the file or behaviour it needs, or state that none remains for the generator side (the veneer adoption and the fleet migration are later units by design).

## Output

The objective lane writes `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-audit-2-analyst-verdict.md`; the subjective lane writes `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-audit-2-reviewer-verdict.md` (the reviewer has no Write tool: make the final message the verdict verbatim and say so, and the Orchestrator saves it). Each: the `git diff --stat` reading at start; one row per claim with its status and deciding evidence; findings outside the claims under `## Findings` with the same evidence standard; one `VERDICT:` line. The final message is the verdict verbatim. No process diary.

## Deviation contract

Stop and report a single claim, never the round, when that claim cannot be decided without a mutating command or when its probe would need a file outside `tmp/probes/`; mark that claim `UNRESOLVED` with the reason and decide every other claim.

## Acceptance criteria

1. Every claim has a status and deciding evidence a third reader can re-run or re-read.
2. No tracked file changed; `tmp/probes/` and every scratch directory are empty at the close.

## Review evidence

The verdict files; `git status --porcelain` after each lane.
