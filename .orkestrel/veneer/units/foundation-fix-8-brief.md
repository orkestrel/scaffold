# Unit foundation-fix-8 — the cross-face composition proof

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/veneer` for this unit's duration; the Orchestrator reads `git status --porcelain` after the run.

## Objective

Register the Chromium `integration` project and its `test:integration` script, and write `tests/integration.test.ts` so it proves that the four published sheets (`./bootstrap`, `./tailwindcss`, `./styles`, `./styles/themes`) compose to one cascade whichever sheet loads first, that a Tailwind-shaped order statement loaded before any Veneer sheet reorders the page (the stated limit, as the control), and that the lifted-important contract holds for a consumer: a later unlayered `!important` at equal specificity beats a lifted one, an unlayered normal rule beats a layered rule of higher specificity, and a layered `!important` in `utilities` beats a lifted one.

## Context

- **Evidence.** The design round's verdict `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/foundation-design-verdict.md` rulings 1 and 2 and § The user's rulings. The audit finding 12 in `foundation-audit-verdict.md` (the analyst measured the load-order flip with the actual preludes). CSS Cascading and Inheritance Level 5 § Cascade layers: a first `@layer` statement fixes the order and a later one cannot move an existing layer; for normal declarations the last layer wins and unlayered declarations win over every layer; for important declarations the first layer wins and unlayered important declarations lose to every layered important one.
- **Present shape** (after `foundation-fix-7`; read the tree). Every face's `_tokens.scss` opens with `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` (`src/bootstrap/_tokens.scss` under `@if $layered`). `src/bootstrap/_mixins.scss` holds `layer` and `unlayer`; `src/styles/_mixins.scss` holds `retune`. The built sheets are placeholders with the order statement and no rules, so the composition runs on fixtures that `@use` the real `_tokens.scss` and the real mixins of each face. `tests/setupStyles.ts` holds `adoptSheet`, `readLayerNames`, `flattenRules`, `readPlacement`, and a token reader (`foundation-fix-5` and `foundation-fix-7`; read their exports). Root `vite.config.ts` registers `src:*`, `app:*`, `policy`, `config`, `setup`, `setup:browser`, `guides`, `conformance`, `distribution`, and `probe`, with the Playwright provider composed once (read how `foundation-fix-5` shared it). `package.json` `test` runs `test:src`, `test:app`, the journeys, `test:policy`, `test:config`, `test:setup`, `test:setup:browser`, `test:conformance`, `test:guides`.
- **Law.** The veneer checkout's own `AGENTS.md` and `.claude/rules/`: `tests.md` § Cross-cutting proofs (`tests/integration.test.ts` drives features across environments through the public API with nothing replaced; no packaging check there; a control from outside the population), `workspace.md` § Test project matrix (`integration` in `test`; give the project `tests/setupGlobal.ts` only where that file exists; every isolated project has its own script), `names.md`, `writing.md`.
- **Host.** Windows 11, Node 24; `node_modules` installed; Playwright Chromium installed; `dist/` built. Never commit; never install.

## Unknowns

- Whether a fixture under `tests/fixtures/integration/` can `@use '../../../src/bootstrap/tokens'` and `'../../../src/bootstrap/mixins'` through Vite's Sass with the `?inline` query. The first run settles it.
- Whether adopting four sheets in 24 orders per case stays under the default timeout; measure, and size the timeout from a contended run if it does not.

## Scope

- **Owned.** `tests/integration.test.ts` (new), `tests/fixtures/integration/**` (new), `vite.config.ts` (the `integration` project row only), `package.json` (`test:integration` and its place in `test` after `test:conformance`), `tests/config.test.ts` (the project row case).
- **Shared (report-only).** `tests/setupStyles.ts` (report a helper you needed and did not find).
- **Off-limits.** `src/**`, `app/**`, `configs/**`, `tests/setup*.ts`, `tests/src/**`, `tests/app/**`, `tests/conformance.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `guides/**`, `ROADMAP.md`, `README.md`, `showcase/**`, `.orkestrel/**`, everything under `C:/Users/mikes/WebstormProjects/scaffold`.
- **Made false by this change.** none.
- **Tools and limits.** Read, patch, and the shell (Windows host: quote paths). Run: `git status --porcelain`, `git diff`, `node`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json <owned paths>`, `npx oxfmt --config .oxfmtrc.json --write <owned files>` and `--check`, `npm run test:integration`, `npm run test:config`, `npm run test:policy`, `npm run test:probe`. Never run `npm test`, `npm run build`, `npm run lint`, or `npm run format` tree-wide; never install.

## Execution

1. Fixtures. `bootstrap.scss`: `@use '../../../src/bootstrap/tokens'; @use '../../../src/bootstrap/mixins' as *; @include layer { .probe { margin-top: 1px; padding-top: 1px } .btn { border-radius: 6px } .d-flex { @include unlayer((display: flex)) } }`. `tailwindcss.scss`: `@use '../../../src/tailwindcss/tokens'; @layer utilities { .probe { margin-top: 4px } } @layer components { .probe { padding-top: 2px } }`. `styles.scss`: `@use '../../../src/styles/tokens'; @layer surfaces { .probe { padding-top: 5px; margin-top: 3px } } @layer elements { .probe { margin-top: 2px } }`. `themes.scss`: `@use '../../../src/styles/mixins' as *; @include retune('fixture', ('--vn-probe': light), ('--vn-probe': dark))` with the order statement the themes barrel uses. `tailwind-first.scss`: `@layer theme, base, components, utilities;` alone. `consumer.scss`: unlayered `.d-flex { display: block !important }`, `button { border-radius: 19px }`, and `@layer utilities { .grid { display: grid !important } }`.
2. `tests/integration.test.ts` (Chromium): for every permutation of the four face fixtures, adopt them in that order and assert `.probe` resolves `margin-top: 4px` (utilities wins) and `padding-top: 5px` (surfaces beats components), and that `readLayerNames` of the first adopted sheet is the full statement; the control adopts `tailwind-first.scss` first, then the four in one order, and asserts `margin-top` is no longer `4px` because `bootstrap` now follows `utilities` (name the value the run reads). The lifted-important cases: with `bootstrap.scss` and then `consumer.scss`, a `div.d-flex` resolves `display: block`, a `button.btn` resolves `border-radius: 19px`, and a `div.d-flex.grid` resolves `display: grid`; the control reverses `consumer.scss` before `bootstrap.scss` and asserts `div.d-flex` resolves `flex` (source order among unlayered important rules) while `button.btn` still resolves `19px` (an unlayered normal rule beats a layered one whatever the order). The theme case: with `themes.scss` adopted before and after `bootstrap.scss`, a `[data-vn-theme="fixture"]` root resolves `--vn-probe: light` and its `[data-bs-theme="dark"]` island resolves `dark`. Clean every adopted sheet and every mounted node after each case.
3. Register the project in root `vite.config.ts` as the matrix names it (Chromium, `setup.ts`, `setupBrowser.ts`, `setupStyles.ts`, `include: ['tests/integration.test.ts']`, the shared provider composition, `fileParallelism: false` where the root sets it), add `test:integration`, run it from `test` after `test:conformance`, and add the row case to `tests/config.test.ts`.
4. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json vite.config.ts tests/integration.test.ts tests/config.test.ts`, `npm run test:integration`, `npm run test:config`, `npm run test:policy`.

## Output

Write `C:/Users/mikes/WebstormProjects/veneer/tmp/units/foundation-fix-8-report.md` with: the files changed; the value the Tailwind-first control read; each command, its exit code, and its test count; the run duration of the permutation case; the probes you wrote and their deletion; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a fixture cannot reach a face's `_tokens.scss` or mixins through Vite, when a permutation resolves a different winner (a real finding, not a fixture defect: reproduce it once and report), when a helper is missing from `tests/setupStyles.ts`, or when the change needs an edit outside the owned files.

## Acceptance criteria

1. `npm run test:integration` exits 0 with the 24-permutation case, the Tailwind-first control, the three lifted-important cases with their reversed control, and the theme case in both orders.
2. `npm run test:config` and `npm run test:policy` exit 0; root `tsc`, scoped lint, and scoped format exit 0.
3. `git status --porcelain` adds only owned files; `tmp/probes/` holds nothing of yours.

**Observations, not criteria.** The permutation case's duration.

## Review evidence

The diff and `git status --porcelain`; the report file.
