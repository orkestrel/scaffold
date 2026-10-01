# Unit foundation-fix-10 — pin every guide sentence the foundation proofs leave unpinned

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/veneer` for this unit's duration; the Orchestrator reads `git status --porcelain` after the run.

## Objective

Add the cases that pin the six behaviour sentences `guides/veneer.md` and `ROADMAP.md` state and no in-repo proof reaches yet, each with a control, and tighten one doc-block sentence in `src/core/constants.ts`, so every sentence in the guide's override tables and theme section points at a case that reddens when the behaviour changes.

## Context

- **Evidence.** The guide unit's report `C:/Users/mikes/WebstormProjects/veneer/tmp/units/foundation-fix-9-report.md` § Deviations item 2 lists the six sentences and the case that pins each; the design round's verdict `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/foundation-design-verdict.md` rulings 1, 2, and 4 state the behaviours. The proofs in place: `tests/conformance.test.ts` (Node: `roundTrip`, `compileLayered`, the two fixture forms), `tests/src/styles/themes/index.test.ts` (Chromium: the island, opt-in, boundary, inheritance, and layer-position cases with `pack.scss`, `other.scss`, `bootstrap.scss`, `early.scss` under `tests/fixtures/styles/`), `tests/integration.test.ts` (Chromium: the 24 permutations, the Tailwind-first control, the consumer override cases with `tests/fixtures/integration/*.scss`), and the helpers in `tests/setupStyles.ts` and `tests/setup.ts`.
- **Law.** The veneer checkout's own `AGENTS.md` and `.claude/rules/`: `tests.md` (a control from outside the population; assert membership, not totals; no conditional expect), `documentation.md` (a prose claim about behaviour has an executed assertion), `typescript.md`, `writing.md`. `ROADMAP.md` § Cascade contract and § Published faces are the sentences under proof.
- **Host.** Windows 11, Node 24; `node_modules` installed; Playwright Chromium installed; `dist/` built. Never commit; never install.

## Unknowns

- none.

## Scope

- **Owned.** `tests/conformance.test.ts`, `tests/fixtures/bootstrap/**` (a `published.scss` entry that configures the face through its barrel), `tests/src/styles/themes/index.test.ts`, `tests/integration.test.ts`, `tests/fixtures/integration/**`, `src/core/constants.ts` (the one `@remarks` sentence), `guides/veneer.md` only if the sentence a case pins must change to match what the run reads (report the change).
- **Shared (report-only).** `tests/setupStyles.ts`, `tests/setup.ts`.
- **Off-limits.** `src/**` other than the one sentence, `app/**`, `configs/**`, `vite.config.ts`, `package.json`, `tests/setup*.ts`, `tests/src/**` other than the themes proof, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `ROADMAP.md`, `README.md`, `guides/README.md`, `tests/guides.test.ts`, `showcase/**`, `.orkestrel/**`, everything under `C:/Users/mikes/WebstormProjects/scaffold`.
- **Made false by this change.** none.
- **Tools and limits.** Read, patch, and the shell (Windows host: quote paths). Run: `git status --porcelain`, `git diff`, `node`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npx oxlint --config .oxlintrc.json <owned paths>`, `npx oxfmt --config .oxfmtrc.json --write <owned files>` and `--check`, `npm run build:src:core`, `npm run test:conformance`, `npm run test:src:styles`, `npm run test:integration`, `npm run test:guides`, `npm run test:probe`. Never run `npm test`, `npm run build`, `npm run lint`, or `npm run format` tree-wide; never install.

## Execution

1. **The published drop-in.** `tests/fixtures/bootstrap/published.scss`: `@use '../../../src/bootstrap/index' with ($layered: false);` and nothing else. In `tests/conformance.test.ts`: its `compileLayered` output contains no `@layer` and equals the `$layered: false` compile of the face after `roundTrip`; the control compiles `@use '../../../src/bootstrap/index';` (default) and reads the order statement first. This pins the `@forward 'tokens' show $layered` route a consumer takes.
2. **The dark-ancestor rule.** In `tests/src/styles/themes/index.test.ts`, in both adoption orders: `<div data-bs-theme="dark"><div data-vn-theme="fixture"><span>` reads `--vn-probe: light` on the pack root and the span, and the same markup with `data-bs-theme="dark"` on the pack root itself reads `dark` (the control).
3. **The unlayered token and unlayered rule rows.** In `tests/integration.test.ts`, with the `bootstrap.scss` fixture adopted: a consumer sheet declaring `:root { --bs-body-bg: #123456 }` unlayered beats the fixture's layered `:root` declaration of the same name in both orders; a consumer sheet declaring `--bs-body-bg` inside `@layer theme` beats it too; a consumer sheet declaring it inside `@layer reset` loses (the control). With the `tailwindcss.scss` and `styles.scss` fixtures adopted: an unlayered `.probe { margin-top: 9px }` beats both layered `.probe` rules whatever the order; the control places the same rule in `@layer elements` and loses to `utilities`.
4. **The specificity halves.** In `tests/integration.test.ts`: a layered `!important` on a bare `div` selector in `@layer utilities` (`div { display: grid !important }`) beats the lifted `.d-flex { display: flex !important }` on `<div class="d-flex">` (lower specificity, layered importance wins); an unlayered `div { display: block !important }` loaded later loses to the lifted `.d-flex` rule (equal layer, lower specificity), and the same unlayered rule on `div.d-flex` wins (higher specificity); each with the reversed load order as its second reading.
5. **Source order inside `bootstrap`.** In `tests/integration.test.ts`: a consumer sheet `@layer bootstrap { .btn { border-radius: 8px } }` adopted after the fixture wins on `button.btn`, and adopted before it loses (the control), while an unlayered `.btn { border-radius: 9px }` wins in either order.
6. `src/core/constants.ts` `@remarks`: "The `bootstrap` group holds the `--bs-*` names of Bootstrap 5.3.8's combined `:root, [data-bs-theme=light]` block." Keep the description paragraph and the `@example` unchanged so the guide's Surface cell and flagship fence stay equal.
7. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npx oxlint --config .oxlintrc.json tests/conformance.test.ts tests/src/styles tests/integration.test.ts src/core`, `npm run build:src:core`, `npm run test:conformance`, `npm run test:src:styles`, `npm run test:integration`, `npm run test:guides`.

## Output

Write `C:/Users/mikes/WebstormProjects/veneer/tmp/units/foundation-fix-10-report.md` with: the files changed; each new case title and the guide sentence it pins; each command, its exit code, and its test count; every value a run read that the brief did not predict; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a run reads a value that contradicts the guide sentence (a real finding: report it with the reading and change nothing in the guide), when a fixture cannot reach the face barrel through Vite or Sass, or when the change needs an edit outside the owned files.

## Acceptance criteria

1. `npm run test:conformance`, `npm run test:src:styles`, and `npm run test:integration` exit 0 with every new case and its control.
2. `npm run test:guides`, `npm run check:src:core`, root `tsc`, scoped lint, and scoped format exit 0.
3. `git status --porcelain` adds only owned files; `tmp/probes/` holds nothing of yours.

**Observations, not criteria.** none.

## Review evidence

The diff and `git status --porcelain`; the report file.
