# Unit foundation-fix-11 — close the findings of `foundation-audit-2`

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/veneer` for this unit's duration; the Orchestrator reads `git status --porcelain` after the run.

## Objective

Close every finding the round `foundation-audit-2` ruled `BROKEN` or accepted outside the claims, each as the verdict bounds it, so the foundation's proofs distinguish the mutations the round named, the guide points at the cases that pin its sentences, the roadmap names every hand-edited vendored file, and no test data or config comment is duplicated; keep every gate green.

## Context

- **Evidence.** The round verdict `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/foundation-audit-2-verdict.md` (the per-item rulings and bounds below restate it), the lane reports `foundation-audit-2-reviewer-verdict.md` and `foundation-audit-2-analyst-verdict.md` beside it, the design verdict `foundation-design-verdict.md`, and the tree. The Orchestrator reproduced each item on 2026-09-30; the reproduction is stated per item.
- **Law.** The veneer checkout's own `AGENTS.md` and `.claude/rules/`: `tests.md` (data tables and case matrices belong in a setup file; a duplicate helper is a defect; never assert an implementation against itself; a control from outside the population; config comments state the current reason, not history), `names.md` (`{verb}{Noun}` helpers named for what they do), `typescript.md` (no speculative future behaviour in TSDoc), `documentation.md` (a behaviour sentence points at the proof that would break), `writing.md`, `styles.md`.
- **Host.** Windows 11, Node 24; `node_modules` installed; Playwright Chromium installed; `dist/` built. Never commit; never install.

## Unknowns

- none.

## Scope

- **Owned.** `tests/setup.ts`, `tests/setup.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`, `tests/src/bootstrap/index.test.ts`, `tests/src/tailwindcss/index.test.ts`, `tests/src/styles/index.test.ts`, `tests/src/styles/themes/index.test.ts`, `tests/integration.test.ts`, `tests/config.test.ts`, `vite.config.ts` (the `sheetProject` factory and the `optimizeDeps` comment only), `configs/src/vite.{bootstrap,tailwindcss,styles}.config.ts` (the test block only), `configs/helpers.ts` (`targetBrowser` only), `src/core/constants.ts` (the one `@remarks` sentence), `src/styles/themes/_default.scss` (the comment only), `guides/veneer.md` (the sentences and proof pointers the items name), `ROADMAP.md` (the sentences the items name).
- **Shared (report-only).** `guides/README.md`, `tests/guides.test.ts`.
- **Off-limits.** everything else, `.orkestrel/**`, everything under `C:/Users/mikes/WebstormProjects/scaffold`.
- **Made false by this change.** The `compileLayered` name; the four unused setup exports; every duplicated order-line literal.
- **Tools and limits.** Read, patch, and the shell (Windows host: quote paths). Run: `git status --porcelain`, `git diff`, `node`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npx oxlint --config .oxlintrc.json <owned paths>`, `npx oxfmt --config .oxfmtrc.json --write <owned files>` and `--check`, `npm run build:src:core`, `npm run test:setup`, `npm run test:setup:browser`, `npm run test:conformance`, `npm run test:src:bootstrap`, `npm run test:src:tailwindcss`, `npm run test:src:styles`, `npm run test:integration`, `npm run test:config`, `npm run test:policy`, `npm run test:guides`, `npm run test:probe`. Never run `npm test`, `npm run build`, `npm run lint`, or `npm run format` tree-wide; never install.

## Execution

Each item names the finding, the reproduction, the fix, and its bound.

1. **Claim 3, the moved-rule control.** `tests/setupServer.test.ts` builds the control with `fixture.replace('.last { opacity: 0.5; }', '')`, which matches nothing in the three-line fixture rule, so the control is the fixture with a duplicate rule prepended and cannot distinguish an order-insensitive round trip. Fix: extract the `.last` rule with a regex over the fixture text, build the control by moving that rule to the front, assert the control differs from the fixture and has its length, and keep the unequal round-trip assertion. Bound: the other three controls and the CSSOM-loss pair stay as they are.
2. **Claim 8, the stamp helper against itself.** `tests/config.test.ts` checks `computeStamp` for shape, determinism, and sensitivity and builds the expected stamp line with `computeStamp` itself, so `sha3-256` or a hash over `text + '\n'` passes. Fix: pin the SHA-256 of the empty string (`e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`) and of one short literal computed once with `node:crypto` in the case as the second mechanism, and keep the existing assertions. Bound: `stampPage`'s case stays; the pages are not rebuilt by this unit.
3. **Claim 10, the guide.** Point each sentence at the case that pins it: the dark-ancestor rule at `requires dark on the pack root inside a dark ancestor (pack first: %s)`; the source-order row at `resolves source order inside bootstrap (consumer first: %s)`; the higher-specificity half of the important row at `lets unlayered importance win at higher specificity (consumer first: %s)` and the layered row at `lets layered importance win at lower specificity (consumer first: %s)`; the unlayered token row at `lets an unlayered root token beat Bootstrap (consumer first: %s)` and `lets a theme root token beat Bootstrap (consumer first: %s)`; the Tailwind and styles unlayered rows at `lets an unlayered rule beat both faces (consumer position: %s)` and drop the analogy paragraphs that follow those two tables. Replace "the order statement and nothing else" and "no rule" with "the order statement and empty layer blocks" for the three sheets. Bound: change no other sentence, no Surface cell, no flagship fence.
4. **Claims 11 and 13, the roadmap.** "a proof guards the disjointness" becomes "the Tailwind chunk adds the proof that guards the disjointness"; the repairable-files sentence under § Configs names `.prettierignore` and `configs/app/vite.showcase.config.ts` beside the five; § Scaffold propagation item 3 names `configs/app/vite.showcase.config.ts` as a scaffold content-owned wrapper whose template is the three-line `appShowcase()` call, so repair restores it and the Vue mode, the root output, and the final-page stamp must move into the template. Bound: no other roadmap sentence moves.
5. **Claim 14, the placeholder refusal.** Delete the `--bs-` and `.btn` regex assertions from `tests/src/styles/index.test.ts`; ruling 3 lets `./styles` declare a Bootstrap class name to record an addition. Keep the order and ownership assertions and the `it.todo`. Delete the roadmap sentence that calls the refusal a placeholder the styles chunk replaces. Bound: the Tailwind proof keeps its own `.btn` refusal, because ruling 2 forbids the compatibility sheet a Bootstrap class name.
6. **F1.** Rename `compileLayered` to `compileSass` with the doc line "Compiles a Sass entry with the installed compiler in expanded style." and update every caller.
7. **F2.** Delete `TAILWINDCSS_SHEET_PATH`, `TAILWINDCSS_BUILD_SCRIPT`, `STYLES_SHEET_PATH`, and `STYLES_BUILD_SCRIPT` from `tests/setupServer.ts` and point the loader example at the Bootstrap pair.
8. **F3.** Export a frozen `LAYER_ORDER` tuple and `LAYER_STATEMENT` string from `tests/setup.ts` (the statement built from the tuple), prove them in `tests/setup.test.ts`, and replace every duplicated literal in the five Chromium proofs and `tests/conformance.test.ts` with them. Bound: the SCSS sources keep their own statements; a proof still compares the built text against the setup constant, which is the second mechanism.
9. **F4.** Set `isolate: false` once in `sheetProject` in `vite.config.ts` with a one-sentence reason (one module instance per project; the measured readings live in `ROADMAP.md` § Configs), delete the three wrapper copies and their comments, and cut the `optimizeDeps` comment to its reason (pre-bundle what every browser test imports so no dependency is discovered mid-run). `tests/config.test.ts` keeps asserting `isolate: false` on each face project.
10. **F5.** Delete the sentence "The styles chunk adds the `veneer` group with its first declared token." from the `@remarks` of `TOKEN_NAMES`; keep the description paragraph and the `@example`.
11. **F6.** `src/styles/themes/_default.scss`: replace the narrative comment with `// TODO: [Default pack] Declare the complete light and dark token maps.`
12. **Referred finding, `targetBrowser`.** `configs/helpers.ts` treats `src/vue/` as browser-side and omits `app/vue/`; add `app/vue/` and the config case that a core owner importing `app/vue/…` is refused and a browser owner importing it is admitted.
13. **Claim 2, the source guard's exemption.** `tests/src/bootstrap/index.test.ts` excludes `_tokens.scss` from the `@layer` scan entirely, so an unused mixin carrying `@layer foreign { … }` appended to a scratch copy of the tokens file survives while the compile is unchanged (the analyst reproduced it). Fix: exempt only the shared order statement and its `@if $layered` wrapper in `_tokens.scss` and scan the rest of that file for `@layer` and `!important` like every other partial; add the scratch-copy control the analyst used. Bound: `_mixins.scss` keeps its whole-file exemption.
14. **Claim 10, the source-order row.** The row "A later rule inside `bootstrap` wins by source order" holds only at equal specificity: `@layer bootstrap { .analyst-btn { border-radius: 6px } button { border-radius: 8px } }` resolves `6px` on `<button class="analyst-btn">` (the analyst measured it). Fix: qualify the row "at equal importance and specificity", cite `resolves source order inside bootstrap (consumer first: %s)`, and add the lower-specificity counterexample to `tests/integration.test.ts` (a consumer `@layer bootstrap { button { border-radius: 8px } }` adopted after the fixture leaves `button.btn` at `6px`) and cite it beside the row.
15. **Claim 11, the mixins kind-file sentence.** `ROADMAP.md` § Style centralization says no other file in the face carries a literal `@layer` while `_tokens.scss` carries the order statement; add "except the shared order statement in `_tokens.scss`".
16. **Claim 13, the divergence inventory.** `scaffold audit --offline --json` reports eight content-owned stale files: `tsconfig.json`, `vite.config.ts`, `configs/src/vite.core.config.ts`, `configs/app/vite.showcase.config.ts`, `configs/helpers.ts`, `.oxlintrc.json`, `.prettierignore`, and `tests/config.test.ts`. Name all eight in `ROADMAP.md` § Scaffold propagation's opening sentence and in the § Configs repair sentence, and name `configs/src/vite.core.config.ts` under propagation item 4 as the carrier of `isCoreBuildExternal`.
17. **O1, application Vue and the core boundary.** Beside item 12, the specifier classifier in `configs/helpers.ts` (around line 517) omits `@app/vue` while it names `@src/vue`, so a Vite server configured by `appCore()` resolves `@app/vue` from `app/core/index.ts` where it refuses `@app/browser` (the analyst measured it). Fix: classify `app/vue/` as a browser target and `@app/vue` as a browser specifier, and pin in `tests/config.test.ts` with the analyst's method: a real `createServer` under `appCore()` refuses `@app/vue` from `app/core/index.ts` with the core message and admits it from `app/browser/main.ts`. Bound: a Vue owner importing core stays legal.
18. **The round trip is one pass.** The analyst measured that a second `roundTrip` over `bootstrap.css` strips one leading space from the banner's star-prefixed lines. Add to the `roundTrip` TSDoc that the comparison is one pass on each side and never a pass over a pass; add the reading to `tests/setupServer.test.ts` as a case that pins the single-pass equality and names the second-pass difference as the limit.
19. **Claim 7, the census control.** `tests/config.test.ts` uses `tests/absent-control.fixture` as the file no project collects; that path can match no `*.test.ts` include and so cannot fail. Replace it with `tests/nowhere/absent-control.test.ts`, a test-shaped path outside every project's include, and keep the expectation of zero owners. Bound: no project setting changes; the claim's universal about Node pools was the claim's error, and `ROADMAP.md` § Configs already names only `setup` and `conformance`.
14. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npm run check:src:core`, `npx oxlint --config .oxlintrc.json vite.config.ts configs tests src/core`, `npm run build:src:core`, `npm run test:setup`, `npm run test:setup:browser`, `npm run test:conformance`, `npm run test:src:bootstrap`, `npm run test:src:tailwindcss`, `npm run test:src:styles`, `npm run test:integration`, `npm run test:config`, `npm run test:policy`, `npm run test:guides`.

## Output

Write `C:/Users/mikes/WebstormProjects/veneer/tmp/units/foundation-fix-11-report.md` with: the files changed; each item and what changed for it; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a run contradicts a guide sentence, when a gate refuses the tree, or when an item needs an edit outside the owned files.

## Acceptance criteria

1. Every listed project exits 0 with the moved-rule control, the stamp vectors, and the `LAYER_ORDER` proof.
2. `npm run test:guides`, `npm run test:policy`, `npm run test:config`, root `tsc`, `check:src:core`, scoped lint, and scoped format exit 0.
3. `git status --porcelain` adds only owned files; `tmp/probes/` holds nothing of yours.

**Observations, not criteria.** none.

## Review evidence

The diff and `git status --porcelain`; the report file.
