# Unit propagation-design — surfaces and extensions in the scaffold generator

One brief for two blind lanes: `planner` on Claude Opus 5.5 (subjective: the surface and extension vocabulary, the type shapes, the template and guide shape, the rule sentences) and `analyst` on GPT-6 Astra (objective: the generator's data flow, ownership and repair semantics, the config proof, the adoption path, what breaks). Neither lane sees the other's answer. Each lane performs the work itself and spawns nothing; a lane edits no file.

## Objective

Propose one coherent change to `@orkestrel/scaffold` that makes the **styles surface**, the **journey surface**, and the **showcase surface** first-class in the generator and adds an **extension** mechanism, so that a target that selects them receives every file, script, export, dependency, project, proof, and guide sentence that `@orkestrel/veneer` carries by hand today, and so that `scaffold repair` restores every one of those files. The user framed it on 2026-09-30: "Vue, bootstrap, and tailwindcss are examples of extending, with Vue extending the src, app, journey, and showcase of the browser surface, as well as bootstrap and tailwindcss extending the styles surface."

## The reference implementation (read it; cite `path:line`)

`C:\Users\mikes\WebstormProjects\veneer` at commit `2b5ea77` is the target whose hand edits define the behaviours. Read its `ROADMAP.md` § Configs, § Proofs, and § Scaffold propagation; `package.json` (exports, files, sideEffects, scripts); `vite.config.ts` (`sheetProject`, `setupBrowser`, `conformance`, `integration`, `guides`, the `optimizeDeps` include, `appJourney`); `configs/helpers.ts` (`isCoreBuildExternal`, `isVueBuildExternal`, `rewriteBrowserSpecifier`, `showcaseBuildOutput`, `showcaseHtmlEntry`, `showcaseHtmlPresent`, `journeyTestInclude`, `computeStamp`, `stampPage`, `targetBrowser` and the specifier classifier); `configs/src/vite.{bootstrap,tailwindcss,styles,themes,vue,core}.config.ts`; `configs/app/vite.{showcase,journey,vue}.config.ts`; `tsconfig.json` (the `@app/vue` alias); `.oxlintrc.json` (the `src/vue` and `app/vue` blocks); `.prettierignore`; `tests/config.test.ts` (every case the eight hand-edited files needed); `tests/setup.ts`, `tests/setupStyles.ts`, `tests/setupServer.ts`, `tests/setupBrowser.ts`; `tests/src/{bootstrap,tailwindcss,styles}/index.test.ts`; `tests/app/{browser,vue}/integration.test.ts`; `src/styles/**`, `src/bootstrap/{index.scss,_tokens.scss,_mixins.scss,sheet.ts}`, `src/vue/index.ts`, `app/vue/**`; `showcase/*.html`. The eight files `scaffold audit --offline --json` reports stale there are `tsconfig.json`, `vite.config.ts`, `configs/src/vite.core.config.ts`, `configs/app/vite.showcase.config.ts`, `configs/helpers.ts`, `.oxlintrc.json`, `.prettierignore`, and `tests/config.test.ts`.

## The generator (read it; cite `path:line`)

`C:\Users\mikes\WebstormProjects\scaffold` at `85bd9bc24`. The scout report `tmp/units/propagation-scout-report.md` gives the pointers; the map `tmp/units/propagation-map.txt` gives exports and headings; the distillates `tmp/units/absorb-generator-core-distillate.md` (types, constants, compilers, templates: the environment flow, the structural facts, every template, the ownership model, and where each of thirteen behaviours attaches) and `tmp/units/absorb-generator-host-distillate.md` (the CLI verbs and derivation, repair and overwrite by ownership, every case of the vendored config proof, every guide claim) are the terrain. Read `src/core/types.ts`, `src/core/constants.ts`, and the compiler and template regions the distillates point at yourself; read `guides/scaffold.md` § Blueprint, § Generated workspace, and § Limits; read `.claude/rules/workspace.md`, `tests.md`, `styles.md`, `application.md`, `browser.md`, `documentation.md`, and `AGENTS.md`.

## Established facts (the Orchestrator verified each; do not re-derive)

1. The generator has one environment type, `core | browser | server`, on the `src` and `app` axes, and boolean structural facts (`bin`, `setup`, `guides`, `integration`, `conformance`, `service`, `vendors`, `global`, `showcase`, `journey`, `skills`) that `#derive` sets from file existence on every run; no selection is stored, and `host.json` records only the vendored files.
2. `ViteMachinery.vue` is set whenever `app` includes `browser`: the app browser is a Vue application (the `vue()` plugin, `vue-tsc` on `check:app:browser`, `vue` types). There is no `src/vue` or `app/vue` concept.
3. Ownership: `content` (restored by `repair` when stale: root `tsconfig.json`, root `vite.config.ts`, `configs/browsers.ts`, the showcase wrapper, the environment wrappers), `birth` (written once: the journey wrapper, `app/**` sources, the setup modules), `presence` (host-vendored files under `HOST_PATHS`, written when missing, replaced by `overwrite`: `configs/helpers.ts`, `configs/policy.ts`, `tests/config.test.ts`, `.oxlintrc.json`, `.prettierignore`, and the policy set). `scaffold audit` reports a host-vendored file whose bytes differ from the release as stale.
4. `guides/scaffold.md:2014-2016` states the generator emits no styles axis, while `.claude/rules/workspace.md` describes `src/styles`, `@src/styles`, `dist/src/styles`, `src:styles` in Chromium with `setupStyles.ts`, and `dist/showcase`.
5. Veneer's foundation passes its whole gate chain with the eight hand-edited files; its `ROADMAP.md` § Scaffold propagation lists the carriers in the order the chunks need them.
6. Native Opus subagents have no shell on this host; a writing unit that must run the generator, its proofs, or a scratch adopter runs on Astra through `codex exec`.

## Questions (answer every one; number the answers)

1. **The model.** Define the vocabulary and the types in `src/core/types.ts`: what is a surface (styles, journey, showcase), what is an extension (a name plus the surface it extends), how each relates to the environments and to the structural facts, and how `#derive` detects each from the tree with no stored selection (the styles surface from `src/styles/index.scss`; the showcase surface from `configs/app/vite.showcase.config.ts` or `showcase/`; the journey surface from `configs/app/vite.journey.config.ts`; the `vue` extension from `src/vue` and `app/vue`; a styles extension from `src/<name>/index.scss` beside `sheet.ts`). State the `new` options that select each, and the union or record shapes, under `names.md` (named discriminants, one-word members, no `kind`).
2. **The styles surface.** List what the generator emits for it: the kind files and folder barrels with their ownership, the `_tokens.scss` order statement, the `sass` dependency, the Vite wrapper with `cssMinify` off and `outputBoundary`, the Chromium `src:styles` project through a `sheetProject` factory with `setup.ts`, `setupBrowser.ts`, `setupStyles.ts`, `isolate: false`, and `optimizeDeps.include`, the `setupStyles.ts` template and its proof, the `./styles` and `./styles/scss` exports, `files` and `sideEffects`, the `check:src:styles` scope, the `test:src:styles` script that builds first, and the optional themes target (`./styles/themes` and `./styles/themes/scss`, built after the styles sheet). State which of these veneer's foundation carries today and which are new.
3. **The extension mechanism.** Define how a named extension adds to a surface. For `vue` on browser: `src/vue` (empty barrel, `check:src:vue`, the build with `isVueBuildExternal`-style refusal until an optional peer, the declaration rollup with `rewriteBrowserSpecifier`), `app/vue` (`.vue` files, `check:app:vue` through `vue-tsc`), the `@app/vue` alias, the `.oxlintrc.json` blocks, browser-side classification in `configs/helpers.ts`, a `journey:vue` mode collecting `tests/app/vue/integration.test.ts`, a `showcase/vue.html` mode, and the config-proof cases. For a named extension of styles (`bootstrap`, `tailwindcss` in veneer): the `src/<name>` face with the kind files, `sheet.ts` as the build entry, the wrapper, the Chromium project through the same `sheetProject`, `./<name>` and `./<name>/scss` exports, `files` and `sideEffects`, `check:src:<name>`, `test:src:<name>`, and the `conformance` fact. State what a template parameterized by a name looks like in `templates.ts` and how the config proof enumerates extensions.
4. **The showcase surface.** Root `showcase/<mode>.html` with no copy step, one mode per browser extension plus the base, the `build-id` as the SHA-256 of the final inlined page without its stamp line computed after the single-file plugin, `prepublishOnly` rebuilding every mode after `npm run build`, `.prettierignore` listing `showcase/`, the `computeStamp` and `stampPage` helpers with their proof, no test over the pages, and the retirement of `dist/showcase`, the `show` script, and `demo/showcase.html` from the rules and the guide. State the ownership of the showcase wrapper and of the pages.
5. **The journey surface.** The `appJourney` factory with `provide` of `variant`, `variants`, and `capture`, the birth-owned wrapper carrying the variant list, one mode per browser extension collecting `tests/app/<extension>/integration.test.ts`, the arrival journey template (mount the application, resolve the level-1 heading through the role engine, prove the Journey and Refusal families and Capture under the flag, the withheld roles), and the `test:journey` and `test:journey:<extension>` scripts in `test`.
6. **The vendored files.** For each of the eight hand-edited files, state the behaviours it carries in veneer (`ROADMAP.md` § Scaffold propagation), the generator change that emits each, and the ownership that lets `repair` restore it; state how a target on an older release receives an updated presence-owned file (`overwrite` versus `repair`), and whether any behaviour still needs a package-owned leaf (the workspace rule admits only `configs/helpers.ts`, `configs/browsers.ts`, and `configs/policy.ts`).
7. **Rules and guides.** State the exact sentences that change in `.claude/rules/workspace.md` (the environment table, the alias table, the build-output table, the test project matrix, the script table), `.claude/rules/tests.md`, `.claude/rules/styles.md`, `.claude/rules/application.md`, `.claude/rules/browser.md`, `.claude/rules/documentation.md`, and `guides/scaffold.md`, so that a reader learns the surfaces and the extension mechanism from the rules and the guide.
8. **The proof.** State the config-proof cases (`tests/config.test.ts`, vendored to every target) for each surface and extension, the scratch-adopter proof in scaffold's own tests (a generated workspace that selects every surface and both extension kinds, builds, and passes its projects), and the mutation controls.
9. **Release and adoption.** State the scaffold version bump, the order of units, and veneer's adoption: `overwrite` or `repair` from the new release, the deletion of every hand-edited divergence, `scaffold audit --offline --json` reporting no stale content-owned or host-vendored file, and veneer's full gate chain green.

## Output

Return exactly this document, no process diary:

```markdown
# propagation-design — <lane> proposal

## Answers
1. …
9. …

## Proposal
The model as a whole: one paragraph each for surface, extension, ownership, derivation, and proof.

## Law conflicts
One bullet per sentence of `AGENTS.md` or a rule file the proposal cannot satisfy, with the smallest amendment.

## Units
A table of the units that implement the proposal: unit, lane (`astra` or `opus`), owned files, acceptance criterion, order, and what it must not touch.

## Alternatives refused
One bullet per alternative, with the evidence that refuses it.
```

Cite `path:line` for every fact you take from either tree or the records. Where a claim needs a run you cannot make, label it unverified and name the run.
