# Unit U1-author — Veneer setup modules, proofs, styles axis, shell, and boundary controls

## Role and engine

`sol` on `gpt-6-astra`, reached through `codex exec --sandbox workspace-write` rooted at this
checkout (`C:/Users/mikes/WebstormProjects/veneer`). You are the engine reading this brief inside
your own CLI: perform the assignment directly and spawn nothing. You are the sole writer in this
checkout for the life of this unit.

## Objective

Make `@orkestrel/veneer` a green Scaffold workspace with its styles axis, its test infrastructure,
its proofs, its runtime-boundary controls, its distribution stage, and a plain-TypeScript showcase
shell that the journey axis drives, so that `npm.cmd run format:check`, `lint:check`, `check`,
`build`, and every test project pass on managed Chromium. Ship no token, no component, and no
appearance claim; those belong to later units.

## Context

**Evidence.** The checkout is at `b190393` on `main`, clean, with `node_modules` installed
(`npm install` 2026-09-20, lockfile sha256
`6977f5509e42a3378333264a2f89678450e2e58611fa6bb39aa51096ea48aa57`). Three `scaffold repair`
passes wrote the vendored files and root configurations; the root `vite.config.ts` registers the
projects `src:core`, `src:browser`, `app:browser`, `policy`, `config`, `setup:browser`, `guides`,
`conformance`, `distribution`, and `probe`, and `configs/app/vite.journey.config.ts` fans the journey
suite out into `journey:light-1280`, `journey:dark-1280`, `journey:light-390`, and
`journey:dark-390`. `scaffold audit` on 2026-09-20 reported exactly these questions, which this unit
closes or leaves as named:

```text
projects: The manifest at . names a Vitest configuration the plan does not emit and the target does not hold: test:src:styles --config configs/src/vite.styles.config.ts.
setup: The target at . carries a test setup module that no proof covers: tests/setupConformance.ts. Add tests/setupConformance.test.ts to cover it.
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.   (leave; the fleet holds the 4 line)
dependencies: typescript declares major 6, while the registry serves major 7.                    (leave; the fleet holds the 6 line)
dependencies: vitest declares major 4, while the registry serves major 5.                        (leave; the fleet holds the 4 line)
```

A generated sample workspace for the same selection sits at `tmp/sample/` (read-only reference for
every generated form: seeds, entries, wrappers, the distribution proof). A probe on 2026-09-20 ran
`npx.cmd vitest run --config vite.config.ts --project src:browser` inside this same sandbox and
launched Chromium successfully, so every browser project runs here.

The seeded files the Orchestrator wrote and this unit replaces or extends: `tests/setup.ts` (empty),
`tests/setupBrowser.ts` (empty), `tests/setupBrowser.test.ts` (asserts no helper),
`tests/setupConformance.ts` and `tests/conformance.test.ts` (Bootstrap version pin only),
`tests/guides.test.ts`, `guides/README.md`, `guides/veneer.md`, `README.md`, `app/browser/index.html`
and `app/browser/main.ts` (generated seeds), `tests/src/core/index.test.ts`,
`tests/src/browser/index.test.ts`, `tests/app/browser/index.test.ts` (generated seeds).

**Law.** `../scaffold/AGENTS.md`; `../scaffold/.claude/rules/` `tests.md`, `workspace.md`,
`architecture.md`, `names.md`, `typescript.md`, `patterns.md`, `application.md`, `browser.md`,
`styles.md`, `documentation.md`, `portability.md`, `quality.md`, `writing.md`; the skill
`../scaffold/.agents/skills/orkestrel-harden-package/SKILL.md` on its capability lane with
`references/contract.md`, `references/centralization.md`, and `references/hardening.md`; the skill
`../scaffold/.agents/skills/orkestrel-prove-journey/SKILL.md` with `references/layer.md`,
`references/captures.md`, `references/styles.md`, and `references/decide.md`; the guides
`../scaffold/guides/scaffold.md` (§ Generated workspace, § Ownership and drift, § Reading a target,
§ Limits), `../scaffold/guides/test.md` (§ Surface, § Limits, § Patterns), `../scaffold/guides/contract.md`
(§ Surface), and `../scaffold/guides/guide.md`. The campaign plan
`../scaffold/.orkestrel/veneer/plan.md` § Standing conditions and § U1 Workspace adoption, and the
requirements `../scaffold/.orkestrel/veneer/tenets.txt`.

**Installed primitives.** `node_modules/@orkestrel/test` `0.0.18` (`dist/src/core/index.d.ts`,
`dist/src/browser/index.d.ts`, `dist/src/server/index.d.ts`): `createRecorder`, `waitForDelay`,
`waitForCondition`, `waitForText`, `requireValue`, `StateScenario`, `JourneyVariant`; browser
`build`, `mount`, `render`, `clickAccessible`, `pressKeys`, `traverseAccessible`, `readPerception`,
`readPage`, `readStates`, `readRefusal`, `waitForState`, `waitForAnimations`, `readStyle`,
`readPixels`, `readRootToken`, `readRules`, `findRule`, `readContrast`, `buildContrast`, `readCensus`,
`buildCensus`, `extractStyles`, `buildEscapes`, `createPortfolio`, `expandCaptures`, `createJournal`,
`describeTree`, `describeFocus`; server `readInventory`, `createScratch`. `node_modules/@orkestrel/contract`
`0.0.17`: guards, `attempt`, `parseJSON`, `isRecord`. `node_modules/@orkestrel/guide` `0.0.20`:
`GuideCommand` from `@orkestrel/guide/server`, `findMissingSymbols`, `computeSymbolKey`. A helper,
guard, wait, recorder, or deferred whose job an installed export does is a defect; the audit's
checker runs the export-name probe over the diff.

**Host.** PowerShell inside the Codex sandbox with script execution disabled: run scripts as
`npm.cmd run <name>` and binaries as `npx.cmd <bin>`. Network denied: no install, no registry, no
fetch. `prove` is blocked here. Writes only under this checkout; `.git` is read-only, so no `git`
command that takes the index lock; `git status` and `git diff` work. Managed Chromium `1243` and
Edge `153.0.4234.48` are installed; the browser projects run here.

**Measurements.** Before editing, run and record: `npm.cmd run lint:check`, `npm.cmd run check`,
`npm.cmd run test:src`, `npm.cmd run test:app`, `npm.cmd run test:policy`, `npm.cmd run test:config`,
`npm.cmd run test:conformance`, `npm.cmd run test:guides`, `npm.cmd run test:setup:browser`.
Expect `check` to fail on the missing `configs/src/tsconfig.styles.json` and `test:journey` to
fail on the empty journey suite; record what each actually reports.

**Control identifiers.** `PLANT-VUE` (a `src/browser/probe.ts` importing `vue`), `PLANT-ESCAPE`
(a relative import of `../../../../elements/src/core/index.js` added to `tests/src/browser/index.test.ts`),
`PLANT-TYPE` (a function in `src/browser/index.ts` whose return type is `Ref<number>` imported from
`vue`), `PLANT-BOOTSTRAP` (`import 'bootstrap'` in `app/browser/main.ts`), `PLANT-PEER` (a
`peerDependencies.vue` entry in `package.json`). Name a test for what it proves, never for the
control that specified it. Remove every plant before you return, and prove removal with
`git diff --exit-code -- <file>` for each planted file that existed before, and by deleting the
file for each plant that did not.

**Standing conditions.** The three `dependencies` advisories above stay; do not bump those ranges.
`tests/distribution.test.ts` carries `[requires the registry]` cases that skip without the registry;
they pass or skip here and run for real under `--mode release` later. `scaffold repair` is not
yours to run; the Orchestrator runs it after you return to register the `setup` project your
`tests/setup*.test.ts` proofs select, and wires `test:setup` into the `test` chain. `demo/` and
`dist/` are ignored by git.

## Unknowns

- Whether `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` (the generated `check:app:browser`)
  accepts a `tests/app/browser/integration.test.ts` that imports from `@orkestrel/test/browser`;
  report the exact diagnostic if it does not, with the smallest change that clears it inside your
  owned files.
- Whether the Vite `lib` build of `src/styles/index.ts` emits the RTL cascade from one build or
  needs a second entry; choose one, record it in the report, and keep both outputs named
  `dist/src/styles/index.css` and `dist/src/styles/index.rtl.css`.

## Scope

**Owned.** `src/core/types.ts`, `src/browser/types.ts`, `src/styles/**`,
`configs/src/vite.styles.config.ts`, `configs/src/tsconfig.styles.json`, `app/browser/**` except
`app/browser/public/**`, `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
`tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupConformance.ts`,
`tests/setupConformance.test.ts`, `tests/conformance.test.ts`, `tests/guides.test.ts`,
`tests/distribution.test.ts`, `tests/src/**`, `tests/app/**`, `guides/README.md`,
`guides/veneer.md`, `README.md`, and in `package.json` the `test:src:styles` script only if its
command must change.

**Shared (report-only).** `package.json` beyond that script: return an exact patch for any other
change you need.

**Off-limits.** Every vendored and content-owned path: `.claude/**`, `.editorconfig`,
`.gitattributes`, `.gitignore`, `.oxfmtrc.json`, `.oxlintignore`, `.oxlintrc.json`,
`.prettierignore`, `AGENTS.md`, `CLAUDE.md`, `LICENSE`, `configs/browsers.ts`, `configs/helpers.ts`,
`configs/policy.ts`, `configs/app/tsconfig.browser.json`, `configs/app/vite.browser.config.ts`,
`configs/app/vite.journey.config.ts`, `configs/app/vite.showcase.config.ts`,
`configs/src/tsconfig.core.json`, `configs/src/tsconfig.browser.json`,
`configs/src/vite.core.config.ts`, `configs/src/vite.browser.config.ts`, `guides/guide.md`,
`guides/scaffold.md`, `scripts/**`, `tests/policy.test.ts`, `tests/setupPolicy.ts`,
`tests/config.test.ts`, `tsconfig.json`, `vite.config.ts`, `package-lock.json`, `tmp/sample/**`.

**What asserts the state this change ends.** `tests/setupBrowser.test.ts` (the seed asserts no
helper; you replace it), `tests/conformance.test.ts` (extended), `tests/app/browser/index.test.ts`
(the seed asserts an empty barrel; the barrel gains exports), `tests/src/browser/index.test.ts`
(gains the no-listener proof), `tests/guides.test.ts` and `guides/veneer.md` (the surface grows with
the app barrel only through its own guide row, see below). Derive the rest by running the suite.

**Tools and limits.** The Codex patch tool for edits; `npm.cmd`, `npx.cmd`, `node`, `git status`,
`git diff`. No install, no `git` index write, no edit outside the owned list, no `--fix` or
`format --write` over the tree (run `npm.cmd run format` only on files you own, by path, or run
`format:check` and fix by hand).

## Execution

Perform the assignment directly and spawn nothing. Work in this order, and run the narrowest
project after each step.

1. **Styles axis.** `src/styles/index.ts` is `import './index.scss'` and nothing else.
   `src/styles/index.scss` loads `tokens` and `theme` with `@use` and never `mixins`.
   `src/styles/_tokens.scss` declares the cascade-layer order once —
   `@layer theme, reset, base, elements, components, utilities;` — and an empty `:root` block that
   U3 fills; `src/styles/_theme.scss` declares an empty `[data-bs-theme='dark']` block;
   `src/styles/_mixins.scss` declares `reduced-motion`, `transition($value)` (emitting the
   declaration and its reduced-motion pair), and `forced-colors`, and emits no top-level CSS.
   `configs/src/vite.styles.config.ts` declares the `src:styles` browser project directly: derive
   `resolve.alias` from `tsconfig.json` the way the root does, import `outputBoundary` from
   `../helpers.js` with `'dist/src/styles'`, build the provider with `playwright(resolveBrowser(resolvePinnedBrowser(), process.platform, process.env))`
   from `../browsers.js`, set `include` to `['tests/src/styles/**/*.test.ts']`, `setupFiles` to
   `['./tests/setup.ts', './tests/setupBrowser.ts', './tests/setupStyles.ts']`, `browser.instances`
   to `[{ browser: 'chromium', headless: true }]`, `fileParallelism` false, and a `lib` build over
   `src/styles/index.ts` emitting `dist/src/styles/index.css` and `dist/src/styles/index.rtl.css`
   (the RTL cascade is the same source compiled with `[dir='rtl']`-free logical properties; where a
   physical property is unavoidable, the RTL output flips it — record the mechanism you chose).
   `configs/src/tsconfig.styles.json` extends the root with `lib` `["ESNext"]`, `types`
   `["vite/client"]`, `noEmit` true, and includes `src/styles/**/*.ts`. `tests/setupStyles.ts` imports
   the built `../dist/src/styles/index.css` (fails loudly when unbuilt) and declares nothing.
   `tests/setupStyles.test.ts` (Node `setup` project) asserts the module declares no export and that
   `dist/src/styles/index.css` and `index.rtl.css` exist after `npm.cmd run build:src:styles`.
   `tests/src/styles/index.test.ts` (browser) asserts the loaded cascade declares that exact layer
   order through a `CSSLayerStatementRule` read from `document.styleSheets`, with a control that the
   order `['utilities']` alone is not what is declared.
2. **Shell.** `app/browser/types.ts` declares `ShowcaseInterface` (`readonly host: HTMLElement`,
   `destroy(): void`) and `ShowcaseOptions` if any; `app/browser/constants.ts` declares the frozen
   copy: the heading text `Veneer`, the region name `Showcase`, the theme control name `Dark mode`;
   `app/browser/showcases/Showcase.ts` is one class that builds, into a given host, a `<header>` with
   an `<h1>`, a `<button type="button" aria-pressed="false">` named `Dark mode` that toggles
   `data-bs-theme` between absent and `dark` on `document.documentElement` and mirrors the state in
   `aria-pressed`, and a `<main aria-label="Showcase">` with one paragraph; it removes what it built
   and its listeners on `destroy()`. `app/browser/factories.ts` exports `createShowcase(host)`.
   `app/browser/index.ts` star-exports `types`, `constants`, `factories`, and the class file.
   `app/browser/main.ts` imports `../../src/styles/index.ts` and calls `createShowcase(document.body)`
   and declares nothing. `app/browser/index.html` keeps the generated skeleton. No Vue, no Bootstrap,
   no `.vue` file.
3. **Browser setup.** `tests/setupBrowser.ts` declares the `ProvidedContext` augmentation
   (`variant`, `variants`, `capture`), `mountShowcase()` returning the mounted host and a cleanup,
   `applyTheme(variant)` that reads the `dark-` or `light-` prefix, drives the `Dark mode` control
   through `clickAccessible` when the painted mode differs, and awaits `waitForState('button', 'Dark mode', 'pressed=<value>')`
   and `waitForAnimations(document.body)`; and nothing an installed export already does.
   `tests/setupBrowser.test.ts` proves both helpers on a real mounted showcase.
4. **Journeys.** `tests/app/browser/integration.test.ts` declares the families `journey`,
   `refusal`, `matrix`, and `capture` (under the flag) and asserts the declaration; proves arrival
   (the region `Showcase` renders its paragraph, read through `readPerception`), the theme toggle
   through the interface (`aria-pressed` and `data-bs-theme` and a resolved `background-color` on
   `document.body` that differs between the modes, read after `waitForAnimations`), keyboard reach
   of the control through `traverseAccessible`, one refusal with the exact voice for an absent
   control named `Sign in`, the matrix reading over every provided variant applying each through
   `applyTheme`, and the capture family: registry `['home', 'home-dark']`, the always-on filename and
   placement proofs, and the disk-membership proof under the flag, placed from the journeys that
   reach them, into `../../../tmp/capture/states`. Mutate the journey class once (omit the toggle
   act) and the refusal class once (render a `Sign in` button) and record the red readings in the
   report; restore both.
5. **Entry proofs.** `tests/src/browser/index.test.ts` proves the barrel's export set and that
   importing `@src/browser` registers no listener on `document` or `window`: install a recorder on
   `EventTarget.prototype.addEventListener` for the import's duration only, restore it in `finally`,
   and assert zero calls whose target is `document` or `window`; give it a control that a module
   which does add a document listener is caught. `tests/src/core/index.test.ts` keeps the export-set
   assertion. `tests/app/browser/index.test.ts` asserts the app barrel's export names.
6. **Conformance and boundary controls.** `tests/setupConformance.ts` gains, as exported pure
   helpers over supplied text and paths: `readForbiddenDependency(manifestText, names)` over
   `dependencies`, `peerDependencies`, and `optionalDependencies`; `readForbiddenSource(source, names)`
   over every static and dynamic import specifier in one module's text; `readEscapingImport(path, source, root)`
   returning a relative import that resolves outside `root`; `readImportClosure(entry)` resolving
   every relative import transitively from a barrel and returning the file set;
   `readSpecifiers(text)` for a built module or declaration; `readFileDigest(path)`; and the
   constants `BOOTSTRAP_VERSION`, `BOOTSTRAP_CSS_DIGEST`, `BOOTSTRAP_RTL_CSS_DIGEST`,
   `BOOTSTRAP_BUNDLE_DIGEST` (sha256 of the installed `dist/css/bootstrap.css`,
   `dist/css/bootstrap.rtl.css`, and `dist/js/bootstrap.bundle.js`, which you compute once and pin),
   and `FORBIDDEN_RUNTIME` (`vue`, `@vue/`, `bootstrap`, `@popperjs/`, `tailwindcss`, `@tailwindcss/`).
   `tests/setupConformance.test.ts` (Node `setup` project) proves every helper against inline
   fixtures including a control each helper must reject. `tests/conformance.test.ts` asserts: the
   installed Bootstrap version and the three digests; no forbidden name in the manifest sections; no
   forbidden specifier and no escaping relative import in any file under `src/**`, `app/**`, or
   `tests/**`; the closure from `src/core/index.ts`, `src/browser/index.ts`, and `src/styles/index.ts`
   stays under `src/`; every specifier in `dist/src/**/*.js` and `dist/src/**/*.d.ts` is relative or
   starts with `@orkestrel/`, and the test names `npm run build` as its prerequisite when `dist/` is
   absent. Run each planted control (`PLANT-VUE`, `PLANT-ESCAPE`, `PLANT-TYPE` after
   `npm.cmd run build:src:browser`, `PLANT-BOOTSTRAP`, `PLANT-PEER`), record the exact failing
   assertion in the report, and remove the plant.
7. **Distribution.** Extend `tests/distribution.test.ts`'s real-browser stage so the served page
   also loads the installed package's `./styles` target through a `<link>` and asserts the sheet
   loaded (`link.sheet` non-null) and declares the layer order above through a
   `CSSLayerStatementRule`, keeping every generated case. Keep the `[requires the registry]` marking
   on the new case.
8. **Guides.** `guides/veneer.md` keeps its tagline; `guides/README.md` keeps the app barrel out of
   the guides parity rows unless the guide documents it — decide, and keep `test:guides` green.
   `README.md` keeps the pitch equal to the tagline. State the two browser receipts and the open
   Chrome receipt in `README.md` § Development.
9. **Gates.** `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`,
   `npm.cmd run build`, then every project: `test:src`, `test:src:styles`, `test:app`,
   `test:journey`, `test:policy`, `test:config`, `test:setup:browser`, `test:conformance`,
   and `test:guides`. The root registers no project for the Node setup proofs until the
   Orchestrator runs `scaffold repair` after you return, so run `tests/setupConformance.test.ts`
   and `tests/setupStyles.test.ts` through a throwaway configuration you write at
   `tmp/codex/vite.setup.config.ts` (git ignores `tmp/`): one Node project, `include` naming those
   two files, `setupFiles` `['./tests/setup.ts']`, run as
   `npx.cmd vitest run --config tmp/codex/vite.setup.config.ts`. Record each command and its final
   lines.

## Output

Write `tmp/codex/u1-author-report.md` in this checkout and return its content as your final
message: the measurements before editing; the files created and changed as a path list; each
planted control with its exact red output and the green after removal; each gate command with its
final lines; the RTL mechanism you chose; the `vue-tsc` unknown's reading; any patch you need in a
shared file, verbatim; and every deviation with expected, found, exact evidence, done or not done,
and at most one hypothesis. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on: a rule that forbids a file this brief names; a gate that stays red after your own
fix inside owned files; a need to edit an off-limits file; a browser project that cannot launch.
Decide, record, and carry on from: helper names and placement within the kind files; the exact copy
of the shell beyond the three named strings; the paragraph the region renders; the order of cases
inside a file; whether the RTL cascade comes from one build or two.

## Acceptance criteria

1. `npm.cmd run format:check` exits 0.
2. `npm.cmd run lint:check` exits 0.
3. `npm.cmd run check` exits 0, including `check:src:styles`.
4. `npm.cmd run build` exits 0 and leaves `dist/src/styles/index.css`, `dist/src/styles/index.rtl.css`,
   `dist/src/core/index.js`, `dist/src/browser/index.js`, and their declarations.
5. `test:src`, `test:src:styles`, `test:app`, `test:journey`, `test:policy`, `test:config`,
   `test:setup:browser`, `test:conformance`, and `test:guides` each exit 0, with every project
   collecting at least one file.
6. Each of the five planted controls turned its named assertion red, and every plant is removed.
7. `git status --porcelain` shows only owned files changed or added and the report present.

**Observations, not criteria.** `test:journey` on Edge (`PLAYWRIGHT_CHANNEL=msedge`), the
`distribution` project under `--mode release`, and the registered `setup` project: the Orchestrator
takes each after you return.

## Review evidence

The actual `git diff` and `git status --porcelain` at return, which the Orchestrator reads from the
tree; the report above; the built `dist/` tree listing.
