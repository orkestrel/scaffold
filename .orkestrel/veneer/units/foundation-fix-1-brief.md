# Unit foundation-fix-1 — gates, single collection, fences, one loader family, tokens proof, Vue face repairs

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing.

## Objective

Repair the `@orkestrel/veneer` foundation at `C:/Users/mikes/WebstormProjects/veneer` (branch `main`, tip `ec25f9e`, clean tree) so that `format:check`, `lint:check`, `check`, `build`, and `test` each exit 0, every proof is collected once, `src/vue` is fenced as `src/browser` is, one Node loader family serves every built-artifact proof, the Bootstrap token registry is pinned two ways to Bootstrap 5.3.8's exported CSS, and the Vue face's build and prose match its design, without touching the open contract questions listed under Off-limits.

## Context

- **Evidence.** The round-1 audit verdict `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/foundation-audit-verdict.md` and the two lane reports beside it (`foundation-audit-analyst-verdict.md`, `foundation-audit-reviewer-verdict.md`) cite every fact this unit acts on by `path:line`. The gate logs are `C:/Users/mikes/WebstormProjects/veneer/tmp/gates-a.log` (format 1, lint 0, check 2), `gates-b.log` (build 0, test 1 at `tests/src/bootstrap/index.test.ts`), and `gates-c.log` (each project green alone; `setup` collects 4 files and 13 tests that the face wrappers collect again).
- **Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`, `typescript.md`, `names.md`, `architecture.md`, `patterns.md`, `tests.md`, `workspace.md`, `styles.md`, `portability.md`, `writing.md`, and `quality.md`. The plan of record is `C:/Users/mikes/WebstormProjects/veneer/ROADMAP.md`; where this brief and the roadmap disagree, stop and report.
- **Installed primitives.** Read `C:/Users/mikes/WebstormProjects/scaffold/guides/test.md` § Surface before declaring any test helper: `@orkestrel/test` (`createRecorder`, `waitForCondition`, `requireValue`, and the rest) and `@orkestrel/test/server` (`createScratch`, `readInventory`). A setup helper whose job an installed export already does is a defect. `@orkestrel/contract` is installed as a devDependency; use its guards (`isRecord`, `isString`, `isInstance`) in tests rather than local ones.
- **Host.** Windows 11, Node 22, npm 12.0.2. Run every command from `C:/Users/mikes/WebstormProjects/veneer` (`codex exec -C` points there). `node_modules` is installed; `dist/` is built. The sandbox is `danger-full-access`; the brief bounds the write set, and the Orchestrator reads `git status --porcelain` after the run. Windows PowerShell 5.1 is the shell; a nested `git` has reported `not a git repository` in this sandbox before while `git status` worked, so do not diagnose the checkout. Never run `npm install`, `npm ci`, or any network command. A Windows shell write can re-encode text: edit files with your patch tool, never with `Set-Content`, `Out-File`, or `>`.
- **Standing conditions.** `scaffold repair` would restore `configs/helpers.ts`, `tests/config.test.ts`, `tsconfig.json`, `.oxlintrc.json`, and `.prettierignore`; the campaign records that debt separately, so edit those files where a group below names them and nowhere else. `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `configs/policy.ts` are vendored byte-identical and off-limits.

## Unknowns

- Whether `@orkestrel/test/server` already exports a cached file reader or a built-module loader that G4 would duplicate. Read `guides/test.md` § Surface and the package's `dist/src/server/index.d.ts` first; reuse what exists and report what you reused.
- Whether `declarationRollup` in `configs/helpers.ts` can rewrite `@src/browser` to `@orkestrel/veneer/browser` as `rewriteCoreSpecifier` rewrites `@src/core`. Read both before G6; where a second rewriter is needed, add it beside `rewriteCoreSpecifier` in `configs/helpers.ts` with a `tests/config.test.ts` case, and report it.

## Scope

- **Owned.** `ROADMAP.md` (formatting only, no wording change), `package.json` (the `sideEffects`, `files`, and `scripts` fields only), `.oxlintrc.json`, `configs/helpers.ts`, `configs/src/vite.bootstrap.config.ts`, `configs/src/vite.tailwindcss.config.ts`, `configs/src/vite.styles.config.ts`, `configs/src/vite.vue.config.ts`, `configs/app/vite.vue.config.ts`, `tests/config.test.ts`, `tests/setupServer.ts` (new), `tests/setupServer.test.ts` (new), `tests/setupBootstrap.ts`, `tests/setupBootstrap.test.ts`, `tests/setupTailwindcss.ts`, `tests/setupTailwindcss.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupVue.ts`, `tests/setupVue.test.ts` (the eight to delete), `tests/src/bootstrap/index.test.ts`, `tests/src/tailwindcss/index.test.ts`, `tests/src/styles/index.test.ts`, `tests/src/vue/index.test.ts`, `tests/src/core/index.test.ts`, `src/core/constants.ts` (the doc comment only), `src/styles/_tokens.scss` and `src/tailwindcss/_tokens.scss` (the marker declarations only), `app/vue/vue.d.ts` (new).
- **Shared (report-only).** none; you are the only writer in this checkout.
- **Off-limits.** `src/bootstrap/**` apart from nothing (do not touch it), `src/styles/themes/**`, the layer-order statements in every `_tokens.scss`, `src/core/constants.ts` apart from its doc comment, `src/core/types.ts`, `ROADMAP.md` wording, `README.md`, `guides/**`, `app/browser/**`, `app/vue/**` apart from the new declaration file, `tests/app/**`, `showcase/**`, `configs/app/vite.showcase.config.ts`, `configs/app/vite.journey.config.ts`, `vite.config.ts`, `tsconfig.json`, `package-lock.json`, `tests/distribution.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `configs/policy.ts`, `.orkestrel/**`, and everything under `C:/Users/mikes/WebstormProjects/scaffold`.
- **Made false by this change.** `tests/config.test.ts` (the wrapper include expectations and the helper list), every test that imported a deleted setup module, `tmp/gates-*.log` (the Orchestrator re-runs the gates).
- **Tools and limits.** Read, patch, `git status`, `git diff`, `node`, `npx tsc --noEmit -p <config>`, `npx oxlint --config .oxlintrc.json <paths>`, `npx oxfmt --config .oxfmtrc.json --check <paths>` and `--write` on owned files only, `npm run build:src:*`, and any `npm run test:*` or `npm run check:*` script. Never run `npm run format`, `npm run lint` (the mutating one), or `npm run build` over the whole tree; never install; never write outside the owned files and `tmp/`.

## Execution

Perform the groups in order. Each group ends with the scoped command it names green before the next opens.

### G1 — gates

1. `ROADMAP.md`: run `npx oxfmt --config .oxfmtrc.json --write ROADMAP.md` and confirm the diff is formatting alone (table alignment at the rows the audit named, lines 82 and 91); revert any wording change.
2. `.vue` declaration: add `app/vue/vue.d.ts` declaring `module '*.vue'` whose default export is typed `DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>` imported as a type from `vue`. No `any`, no `{}`, no `@ts-*` directive. Confirm `npx tsc --noEmit --project tsconfig.json` no longer reports `app/vue/main.ts`.
3. `dist/` imports: no file under `src/`, `app/`, `tests/`, or `configs/` may import a path under `dist/` statically. G4 replaces the two static imports with the loader family. Confirm with `npx tsc --noEmit --project tsconfig.json` run before any build output is consulted (delete nothing under `dist/`; the compiler must not need it).
4. `tests/src/bootstrap/index.test.ts`: keep the `readBootstrapVersion()` equals `5.3.8` assertion and an assertion that the built sheet exists and opens with `@layer bootstrap;`; turn the cascade assertion (`--bs-` present) into `it.todo(...)` naming the Bootstrap cascade chunk of `ROADMAP.md` § Sequence, which is the one admissible use of `it.todo` under `tests.md`. Keep the negative assertions on the other faces' markers only where G5 leaves something to assert (see G5).

### G2 — single collection and scripts

1. Remove `tests/setup*.test.ts` from `test.include` of `configs/src/vite.bootstrap.config.ts`, `vite.tailwindcss.config.ts`, `vite.styles.config.ts`, and `vite.vue.config.ts`; each face project collects `tests/src/<face>/**/*.test.ts` alone. The root `setup` project (`vite.config.ts`, unchanged) collects the setup proofs.
2. `package.json` `scripts.test:src:vue`: prefix with `npm run build:src:browser && npm run build:src:vue && ` so the built modules exist when the face project runs alone. Leave every other script.
3. Update the `tests/config.test.ts` expectations that read wrapper includes.

### G3 — fences for `src/vue` and the reverse direction

1. `.oxlintrc.json`: add a `src/vue/**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}` override that mirrors the `src/browser/**` block (its rules, its patterns, its messages with `src/vue` in place of `src/browser`). Where the `src/browser` block bans `@app/*` and `app/` relative imports, the `src/vue` block bans them too.
2. `configs/helpers.ts`: admit `'src/vue'` to `environmentBoundary`'s owner union and to the `environment` check inside it; in `environmentPathError` and `environmentSourceError`, classify `src/vue/` as a browser target (the `targetBrowser` predicate and the specifier predicate that today name `app/browser/` and `src/browser/` only), so a core or server owner is refused a `src/vue` import and `src/vue` is refused a `node:`, server, or `app/*` import. Add `tests/config.test.ts` cases: a core owner importing `src/vue/index.ts` is refused; a `src/vue` owner importing `node:fs` and `@app/core` is refused; a `src/vue` owner importing `src/browser/index.ts` is admitted.
3. `configs/src/vite.vue.config.ts`: add `environmentBoundary('src/vue')` beside `outputBoundary`.
4. `isVueBuildExternal`: throw on `@vue/` scoped packages as it throws on `vue` and `vue/*`; add the `tests/config.test.ts` case, and add the false case the reviewer found missing (a relative id returns `false`).

### G4 — one loader family in `tests/setupServer.ts`

1. Create `tests/setupServer.ts` per `tests.md` § Shared test infrastructure (Node-only helpers and `node:fs` loaders anchored to `WORKSPACE_ROOT`). Export: `WORKSPACE_ROOT`; the face constants now spread over four modules (`BOOTSTRAP_SHEET_PATH`, `BOOTSTRAP_BUILD_SCRIPT`, `TAILWINDCSS_SHEET_PATH`, `TAILWINDCSS_BUILD_SCRIPT`, `STYLES_SHEET_PATH`, `STYLES_BUILD_SCRIPT`, `VUE_SURFACE_PATH`, `VUE_BUILD_SCRIPT`, `BROWSER_SURFACE_PATH`, `BROWSER_BUILD_SCRIPT`); one `readSheet(path, script)` that reads the file on every call and throws an error naming `script` when the file is missing; one `loadSheet(path, script)` that caches per path in one `Map`; one `loadModule(path, script)` that checks existence, then dynamically imports `pathToFileURL(path).href`, narrows the namespace with a guard from `@orkestrel/contract`, and caches per path; `readBootstrapVersion()` as it is today; and `collectRootNames(css)` for G5. Every export carries TSDoc per `typescript.md`. No module-scope `let`; the cache is one `const` `Map`.
2. Delete `tests/setupBootstrap.ts`, `tests/setupTailwindcss.ts`, `tests/setupStyles.ts`, `tests/setupVue.ts` and their four `.test.ts` twins. Re-point every importer (`tests/src/bootstrap/index.test.ts`, `tests/src/tailwindcss/index.test.ts`, `tests/src/styles/index.test.ts`, `tests/src/vue/index.test.ts`) at `./setupServer.js` relative paths.
3. Write `tests/setupServer.test.ts` proving the family against a `createScratch` copy, never against `dist/`: `readSheet` returns the text and throws the named script when the file is absent; `loadSheet` returns the same text after the scratch file changes and a fresh read sees the change; `loadModule` returns the namespace of a scratch module and throws the named script when the path is absent; `readBootstrapVersion` returns `5.3.8`; `collectRootNames` returns the sorted unique `--bs-*` names of a `:root, [data-bs-theme=light]` block and ignores names in a `[data-bs-theme=dark]` block and in later rules (a fixture written in the test, with a control that adds a name and must change the result).
4. Confirm `npm run test:setup` collects `tests/setupServer.test.ts` and exits 0 (`test:setup` builds every face first).

### G5 — token registry proof and markers

1. Remove the `--orkestrel-veneer-styles` and `--orkestrel-veneer-tailwindcss` declarations (and the `@layer theme { :root { … } }` block that carried them, leaving the layer-order statement) from `src/styles/_tokens.scss` and `src/tailwindcss/_tokens.scss`. Identify each built sheet in its face test by its layer-order statement and its path instead.
2. `tests/src/tailwindcss/index.test.ts`: assert the sheet opens with the Tailwind order statement `@layer theme, reset, base, elements, components, utilities;`, declares no `bootstrap` layer name, and carries no `--bs-` declaration and no `.btn` rule (it maps Tailwind and recreates nothing).
3. `tests/src/styles/index.test.ts`: assert the sheet opens with the styles order statement and declares no `bootstrap` layer name; drop the `--bs-` and `.btn` refusals (the styles face records additions against the Bootstrap pin, so those tokens may appear there). Add `it.todo` for the two-way `TOKEN_NAMES.veneer` proof, naming the Veneer styles chunk of `ROADMAP.md` § Sequence.
4. `tests/src/bootstrap/index.test.ts`: add the two-way proof that the set of leaves under `TOKEN_NAMES.bootstrap` (walk the frozen tree; import `TOKEN_NAMES` from `@src/core`) equals `collectRootNames` over `node_modules/bootstrap/dist/css/bootstrap.css` resolved through `createRequire(import.meta.url).resolve('bootstrap/dist/css/bootstrap.css')`. Include a control inside the test: a copy of the registry with one leaf renamed must fail the equality, and the official CSS with one name appended must fail it.
5. `src/core/constants.ts` doc comment: make it true today. State that `bootstrap` holds the `--bs-*` names Bootstrap 5.3.8's `:root` block declares and that `veneer` holds the `--vn-*` names the styles face declares; remove the sentence claiming the shipped cascade declares every name. Do not change any key or value.

### G6 — Vue face

1. `configs/src/vite.vue.config.ts`: replace the inline `external` arrow that repeats the throw with `external: (id) => isVueBuildExternal(id, peers)`; rewrite the two comments that call the face "a TypeScript re-export of browser" so they state the composables design (`src/vue/index.ts` star-exports `src/vue/composables`; each composable imports the browser functions it wraps; the consumer supplies Vue); keep the sentence that explains why declarations emit through a separate `tsc` step only if it stays true after item 2.
2. Declarations: route the Vue face's declarations through `declarationRollup` as `configs/src/vite.browser.config.ts` does, with a rewrite that turns `@src/browser` into `@orkestrel/veneer/browser` (and `@src/core` into `@orkestrel/veneer`) so a future composable import ships a resolvable specifier and never overwrites `dist/src/browser/index.d.ts`. If `declarationRollup` cannot take a second rewriter without a change to `configs/helpers.ts`, add `rewriteBrowserSpecifier` beside `rewriteCoreSpecifier` with a `tests/config.test.ts` case. Then drop the trailing `tsc -p configs/src/tsconfig.vue.json` from `build:src:vue` if the rollup emits `dist/src/vue/index.d.ts`; keep `configs/src/tsconfig.vue.json` for `check:src:vue`. Confirm `npm run build:src:vue` emits `dist/src/vue/index.d.ts` and that `npm run test:src:vue` is green.
3. `package.json`: set `"sideEffects": ["**/*.css", "**/*.scss"]`; add `"!dist/src/bootstrap/index.js"`, `"!dist/src/tailwindcss/index.js"`, `"!dist/src/styles/index.js"` to `files` so the empty CSS-face stubs never ship.
4. `tests/src/vue/index.test.ts`: load `dist/src/vue/index.js` and `dist/src/browser/index.js` through `loadModule`; keep the assertion that the Vue namespace re-exports no browser key and that the built file imports no `vue` specifier.

### G7 — configuration duplicates

1. `configs/app/vite.vue.config.ts`: build `appVue` from `appBrowser()` the way `appJourney` in `vite.config.ts` does (spread and replace `root`, `plugins`, `build.rolldownOptions.input`, `build.outDir`, and `test`), so the alias record is not re-derived and the `@app/vue` line is not repeated (root `tsconfig.json` already carries it). Delete the comment that says the root cannot register `@app/vue`.
2. Confirm `npm run test:config`, `npm run test:app:vue`, `npm run test:journey:vue`, and `npm run build:app:vue` are green.

### Close

Run, in this order, and paste each exit code into the report: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`. Then `git status --porcelain` and `git diff --stat`.

## Output

Write `C:/Users/mikes/WebstormProjects/veneer/tmp/units/foundation-fix-1-report.md` with: the files changed (from `git diff --stat`), per group what changed and the scoped command that proved it with its exit code, the installed exports reused in G4 (or the reading that found none), the rewriter decision in G6, every deviation, and the five gate exit codes. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a group needs an edit outside the owned files, when the roadmap contradicts a group, or when a vendored policy proof (`test:policy`) refuses a change. Settle naming inside the owned files yourself under `names.md` and record each choice in the report.

## Acceptance criteria

1. `npx oxfmt --config .oxfmtrc.json --check .` exits 0 and `npx oxlint --config .oxlintrc.json --deny-warnings .` exits 0.
2. `npm run check` exits 0 with `dist/` absent from every static import.
3. `npm run test:setup`, `npm run test:config`, `npm run test:src:bootstrap`, `npm run test:src:tailwindcss`, `npm run test:src:styles`, `npm run test:src:vue`, `npm run test:policy` each exit 0, and no test file is collected by two projects.
4. The two-way `TOKEN_NAMES.bootstrap` proof and its two controls pass.
5. `git status --porcelain` lists only owned files and the four deleted setup pairs.

**Observations, not criteria.** `npm run build` and `npm test` exit codes; the Orchestrator re-runs both.

## Review evidence

The diff and `git status --porcelain` for the veneer checkout; the report file.
