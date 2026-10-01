# Unit foundation-fix-6 — the shared order line, the `$layered` switch, and the `layer`/`unlayer` mixins

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/veneer` for this unit's duration; the Orchestrator reads `git status --porcelain` after the run.

## Objective

Open every published face sheet with the one full cascade-layer order statement `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;`; give `src/bootstrap` the `$layered: true !default` switch forwarded from `index.scss`, the `layer` mixin that wraps `@content` in `@layer bootstrap` when the switch is on, and the `unlayer` mixin that is the only home of `!important` in the face and lifts each important declaration outside every layer through `@at-root (without: layer)` when the switch is on; prove both forms on fixtures with the real mixins, prove the placement invariant on the built sheet with a planted control, and prove that a literal `!important` outside `_mixins.scss` is refused.

## Context

- **Evidence.** The design round's verdict `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/foundation-design-verdict.md`: § The user's rulings (lift `!important` out unless pivotal; start as a drop-in, then lift), ruling 1 (the two forms, the placement invariant, the consumer override paths), ruling 2 (the order line, its rationale, and the ownership table), and § Orchestrator reproductions (the fixture that proved the mechanism with the installed Sass: `_tokens.scss` with `$layered: true !default`; `index.scss` opening with `@forward 'tokens' show $layered`; `layer` and `unlayer` in `_mixins.scss`; `@use 'index'` emitting `@layer bootstrap { … }` with the media-query important lifted outside at source position; `@use 'index' with ($layered: false)` emitting no `@layer` and the important in place).
- **Present shape** (after `foundation-fix-5`; read the tree, the lines here are approximate). `src/bootstrap/_tokens.scss` is `@layer bootstrap;`; `src/tailwindcss/_tokens.scss` is `@layer theme, reset, base, elements, components, utilities;`; `src/styles/_tokens.scss` is `@layer theme, reset, base, elements, components, surfaces, composables, modifiers, utilities;`. `src/bootstrap/index.scss` `@use`s tokens, reset, elements, components, utilities; `src/bootstrap/_mixins.scss` holds one comment; `_reset.scss` and every partial under `components/`, `elements/`, and `utilities/` is an empty `@layer bootstrap {\n}`; the folder barrels `_index.scss` `@use` their partials. The face tests run in Chromium (`foundation-fix-5`): they adopt the built sheet from `?raw`, read layer names through `readLayerNames`, placement through `readPlacement`, and flattened rules through `flattenRules` from `tests/setupStyles.ts`; `tests/conformance.test.ts` (Node) holds `readBootstrapVersion`, the digest pin, link 2 (built sheet equals the Sass compile after `roundTrip`), and link 1 as `it.todo`; `roundTrip` lives in `tests/setupServer.ts`. `tests/src/tailwindcss/index.test.ts` and `tests/src/styles/index.test.ts` today assert that no `bootstrap` layer appears; after this unit the order statement names `bootstrap` in every face while no non-Bootstrap face writes a `bootstrap` block, so ownership reads block names and the order case reads the statement.
- **Law.** The veneer checkout's own `AGENTS.md` and `.claude/rules/`: `styles.md` (the vendored copy still says "declare cascade-layer order once in the consumer entry" and "each partial uses its folder's own layer"; the scaffold rule was amended on 2026-09-30 to the verdict's ruling 7 text, which this unit follows: a recreation writes every normal declaration into one layer named for the framework and every `!important` outside every layer, and every published sheet opens with the same full order statement), `tests.md` (a control from outside the population; `it.todo` only for roadmap work), `writing.md` (comments state why). `ROADMAP.md` § Style centralization (`_tokens.scss` carries the face's order; `_mixins.scss` emits no top-level CSS and is loaded with `@use '../mixins' as *`; the barrel never loads mixins).
- **Host.** Windows 11, Node 24; `node_modules` installed (Sass `^1.105.1`); `dist/` built. Never commit; never install.

## Unknowns

- Whether a module loaded through `@forward … show $layered` from `index.scss` still emits its CSS (the order statement) once and first. The built-sheet order case settles it; if `@forward` emits nothing, keep `@forward 'tokens' show $layered;` for the configuration and add `@use 'tokens';` beside it, and say so.
- Whether Sass accepts `@if $layered { @layer …; }` at the top level of `_tokens.scss` with the variable declared in the same file. The drop-in fixture settles it.

## Scope

- **Owned.** `src/bootstrap/_tokens.scss`, `src/bootstrap/_mixins.scss`, `src/bootstrap/index.scss`, `src/bootstrap/_reset.scss`, every `src/bootstrap/{components,elements,utilities}/*.scss` partial (replace the literal `@layer bootstrap { }` wrapper with `@use '../mixins' as *;` and `@include layer { }`), `src/tailwindcss/_tokens.scss`, `src/styles/_tokens.scss`, `tests/fixtures/bootstrap/**` (new), `tests/src/bootstrap/index.test.ts`, `tests/src/tailwindcss/index.test.ts`, `tests/src/styles/index.test.ts`, `tests/conformance.test.ts` (the drop-in fixture compile), `tests/setupServer.ts` and `tests/setupServer.test.ts` only if the drop-in compile needs a helper beside `roundTrip`.
- **Shared (report-only).** `tests/setupStyles.ts`, `tests/setupBrowser.test.ts`, `configs/src/*.config.ts`.
- **Off-limits.** `src/core/**`, `src/browser/**`, `src/vue/**`, `src/styles/**` other than `_tokens.scss`, `src/tailwindcss/**` other than `_tokens.scss`, `app/**`, `configs/**`, `package.json`, `vite.config.ts`, `tests/setup.ts`, `tests/setupStyles.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `guides/**`, `ROADMAP.md`, `README.md`, `showcase/**`, `.orkestrel/**`, everything under `C:/Users/mikes/WebstormProjects/scaffold`.
- **Made false by this change.** Every `startsWith('@layer …')` literal in the three face tests; the "no `bootstrap` layer" assertions in the Tailwind and styles tests, which become block-ownership assertions; the comment in `src/bootstrap/_tokens.scss`.
- **Tools and limits.** Read, patch, and the shell (Windows host: quote paths; `codex exec -C` already points at the veneer checkout). Run: `git status --porcelain`, `git diff`, `node`, `npx oxfmt --config .oxfmtrc.json --write <owned files>` and `--check`, `npx oxlint --config .oxlintrc.json <owned test paths>`, `npm run build:src:bootstrap`, `npm run build:src:tailwindcss`, `npm run build:src:styles`, `npm run test:src:bootstrap`, `npm run test:src:tailwindcss`, `npm run test:src:styles`, `npm run test:conformance`, `npm run test:setup`, `npm run test:setup:browser`, `npm run test:probe`. Never run `npm test`, `npm run build`, `npm run lint`, or `npm run format` tree-wide; never install.

## Execution

1. `src/bootstrap/_tokens.scss`: `$layered: true !default;` then, under `@if $layered`, the full order statement. Comment: why the switch lives here (the barrel forwards it, so a consumer configures it in one `@use … with`), and why the order line names every layer of every face (a first statement fixes the order; a later one cannot move an existing layer).
2. `src/bootstrap/_mixins.scss`: `layer` (wraps `@content` in `@layer bootstrap` when `tokens.$layered`, else emits `@content` in place) and `unlayer($declarations)` (writes each pair as `property: value !important`; under `@at-root (without: layer)` when `tokens.$layered`, else in place). It `@use`s `tokens` and nothing else, and emits no top-level CSS.
3. `src/bootstrap/index.scss`: open with `@forward 'tokens' show $layered;` and keep the `@use` lines for reset and the folder barrels. `_reset.scss` and every partial: `@use '../mixins' as *;` (`'mixins'` at the face root) and `@include layer { }` in place of the literal wrapper, so the face has no literal `@layer` block and no literal `!important` outside `_mixins.scss`.
4. `src/tailwindcss/_tokens.scss` and `src/styles/_tokens.scss`: the full order statement, with a one-line comment naming the rule (every published sheet opens with the same full statement).
5. `tests/fixtures/bootstrap/`: a fixture face (`_tokens.scss` forwarding is not needed; the fixture `@use`s the real `../../../src/bootstrap/mixins` and configures the real `../../../src/bootstrap/tokens`) with one partial that writes a normal declaration, a media-query important through `unlayer`, and a second important beside a normal declaration on one selector. Two entries: `layered.scss` (default) and `dropin.scss` (`with ($layered: false)`).
6. Proofs. `tests/src/bootstrap/index.test.ts` (Chromium): the built sheet's first rule is the full order statement (`readLayerNames`); the sheet writes blocks only into `bootstrap` (ownership); `readPlacement` reports no important declaration inside a layer and no normal declaration outside `bootstrap` (vacuous today, so pair it with the fixture); the `layered.scss` fixture compiled through `?inline` places its important declarations outside every layer at source position with their media query, and its normal declarations inside `bootstrap`; a control fixture with a literal `@layer bootstrap { .x { display: none !important } }` fails `readPlacement`; every `src/bootstrap/**/*.scss` file read through `import.meta.glob(…, { query: '?raw', import: 'default', eager: true })` carries no `!important` and no `@layer` outside `_mixins.scss` and `_tokens.scss`, with a control string that the same check refuses. `tests/src/tailwindcss/index.test.ts` and `tests/src/styles/index.test.ts` (Chromium): the first rule is the full order statement; the sheet writes blocks only into its owned layers (Tailwind: `theme`, `reset`, `elements`, `components`, `utilities`; styles: those plus `surfaces`, `composables`, `modifiers`), never into `bootstrap` or `base`; keep the `--bs-` and `.btn` text refusals on the styles sheet and every existing `it.todo`. `tests/conformance.test.ts` (Node): the `dropin.scss` fixture compiles with no `@layer` and its important declarations in place; the `layered.scss` fixture compiles with the order statement first and the lifted important outside; link 2 stays green with the new barrel.
7. Every SCSS comment states why, never what; `_mixins.scss` carries no top-level CSS.

## Output

Write `C:/Users/mikes/WebstormProjects/veneer/tmp/units/foundation-fix-6-report.md` with: the files changed; the exact command list for the Orchestrator in order; the expected count of tests per project; the `@forward` finding; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a helper the proofs need is missing from `tests/setupStyles.ts` or `tests/setupServer.ts`, when the fixture needs an edit outside the owned files, or when the ruling and the vendored rule cannot both be satisfied by the sentence the verdict gives.

## Acceptance criteria

1. The three built sheets open with the identical full order statement; each face writes blocks only into its owned layers.
2. The `layered.scss` fixture places every important declaration outside every layer at source position with its media query; the `dropin.scss` fixture emits no `@layer` and keeps importance in place; the planted layered `!important` control fails `readPlacement`.
3. No `src/bootstrap/**/*.scss` file outside `_mixins.scss` and `_tokens.scss` carries a literal `!important` or `@layer`, and the control string is refused.
4. `npm run test:src:bootstrap`, `npm run test:src:tailwindcss`, `npm run test:src:styles`, `npm run test:conformance`, `npm run test:setup`, and `npm run test:setup:browser` exit 0 when the Orchestrator runs them; scoped format and lint exit 0.
5. `git status --porcelain` adds only owned files.

**Observations, not criteria.** The size of the built Bootstrap sheet before and after (it gains the order statement only).

## Review evidence

The diff and `git status --porcelain`; the report file; the Orchestrator's gate log.
