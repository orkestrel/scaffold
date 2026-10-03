---
paths:
  - 'src/**/*'
  - 'app/**/*'
  - 'tests/**/*'
  - 'configs/**/*'
  - 'showcase/**/*'
  - 'package.json'
  - 'tsconfig.json'
  - 'vite.config.ts'
---

# Workspace, environments, builds, and scripts

Use only the environments a project needs, and keep the root dependency model intact while doing it.

## Environments

| Path           | Purpose                                                            |
| -------------- | ------------------------------------------------------------------ |
| `src/core/`    | Published host-independent library                                 |
| `src/browser/` | Published browser-only library                                     |
| `src/server/`  | Published Node-only library                                        |
| `src/styles/`  | Optional styles surface: the base sheet face producing `index.css` |
| `src/<name>/`  | Styles extension: a named sheet face beside `src/styles/`          |
| `src/vue/`     | Browser extension: the published `vue` face over `src/browser/`    |
| `src/bin/`     | Optional executable; `main.ts` entry, never a public barrel        |
| `app/core/`    | Shared application logic with an `index.ts` barrel                 |
| `app/browser/` | Browser app; `main.ts` entry, not a barrel                         |
| `app/vue/`     | Browser extension: the Vue app beside `app/browser/`; `main.ts`    |
| `app/server/`  | Node server app; `main.ts` entry                                   |
| `tests/`       | Mirrors src/app environments; root holds cross-cutting proofs      |
| `configs/`     | Thin target wrappers around root configs                           |

- Dependency direction is the root project model in `AGENTS.md` and is not restated here; this file governs where the environments live and how they are configured.
- Typical browser-app domains: `components/`, `pages/`, `composables/`, `controllers/`, `services/`, `stores/`.
- Typical server-app domains: `handlers.ts`, `middlewares.ts`, `routes.ts`.
- A sheet face (`src/styles/` and each `src/<name>/` styles extension) builds from `sheet.ts`, which imports `./index.scss` alone; its `index.ts` star-exports `./sheet.js`. The themes target builds from `src/styles/themes/sheet.ts` the same way.
- Name a styles extension with a name the `NAME_PATTERN` constant admits, and never `core`, `browser`, `server`, `bin`, `styles`, `themes`, or `vue`.
- `src/bin/main.ts` is the executable entry, built to `dist/bin/main.js`. The name is fixed, as it
  is for `app/browser/main.ts` and `app/server/main.ts`, so every runtime entry in a workspace is
  found at the same name.
- `package.json`'s `bin` key is the installed command name. The entry path is the value and does
  not carry that name.

## Aliases

| Alias          | Target                 |
| -------------- | ---------------------- |
| `@src/core`    | `src/core/index.ts`    |
| `@src/browser` | `src/browser/index.ts` |
| `@src/server`  | `src/server/index.ts`  |
| `@src/styles`  | `src/styles/index.ts`  |
| `@src/<name>`  | `src/<name>/index.ts`  |
| `@src/vue`     | `src/vue/index.ts`     |
| `@app/core`    | `app/core/index.ts`    |
| `@app/browser` | `app/browser/index.ts` |
| `@app/vue`     | `app/vue/index.ts`     |
| `@app/server`  | `app/server/index.ts`  |

Give every selected environment and every face an alias: `src/styles`, each `src/<name>` styles extension, and each axis the `vue` extension occupies. Define aliases in `tsconfig.json` first. `vite.config.ts` derives from `compilerOptions.paths`; keep both aligned.

## Configuration authority

- `tsconfig.json`: shared compiler options, all-tree types, and path aliases.
- `vite.config.ts`: shared builds, test projects, environment loading/mapping, and aliases.
- `*/types.ts`: public API contracts.
- `configs/agents/tsconfig.skills.json`: the scoped typecheck of the skill scripts; its presence selects the `skills` blueprint fact.
- `configs/src/` and `configs/app/`: thin per-target wrappers, including optional
  `configs/src/*bin*` files. Shared logic remains in root configs.
- `configs/helpers.ts`, `configs/browsers.ts`, and `configs/policy.ts`: the only permitted leaves
  under `configs/`. Each imports nothing from the workspace, which is what keeps it a leaf, so no
  `configs/types.ts` exists for one to import: each keeps its own types, data, and functions in its
  one file, and the centralized-kind placement in `.claude/rules/architecture.md` does not reach a
  leaf. Each `configs/src/*.config.ts` wrapper imports the root config and may import the permitted
  leaves; keep shared build and project composition in the root config.
- Keep `configs/helpers.ts` free of any dependency a core-only workspace does not declare. It is
  vendored byte-identical to every workspace, so an import there must resolve in all of them.
  `configs/browsers.ts` exists for that reason: it imports `playwright` and
  `@vitest/browser-playwright`, and only a workspace with a browser environment is given it.
- Keep `configs/policy.ts` free of imports entirely. It is the workspace's oxlint plugin, the lint
  instrument of the policy law, and it is vendored byte-identical to every workspace including a
  core-only one, so a module that imports nothing at all is the only form that resolves in all of
  them.
- When a file is vendored byte-identical, import only what resolves in every workspace: a `node:`
  module, or a package `BASE_DEV_DEPENDENCIES` declares. Refuse any other `@orkestrel/*` import;
  `tests/src/server/helpers.test.ts` reads every vendored JavaScript and TypeScript module against
  that set. A base package resolves in its own checkout through its `exports` map to its built
  `dist/` entry, so a vendored module that imports it runs there after `npm run build`; the
  generated root `tsconfig.json` maps the workspace's own published specifiers to its source, so
  `npm run check` there needs no build.

Environment rules:

- `vite.config.ts` owns environment loading/mapping.
- Add shared variables there first.
- Prefer a minimal plain set such as `APP_NAME`, `APP_API_PATH`, `APP_HOST`, `APP_PORT`.
- Expose extra browser runtime values only for a concrete need.

## Build outputs

| Output                        | Content                          | Format                    |
| ----------------------------- | -------------------------------- | ------------------------- |
| `dist/src/core`               | Core library + declarations      | ES and CJS                |
| `dist/src/browser`            | Browser library + declarations   | ES                        |
| `dist/src/server`             | Server library + declarations    | ES and CJS                |
| `dist/src/vue`                | Vue face + declarations          | ES                        |
| `dist/src/styles`             | Compiled `index.css`             | CSS                       |
| `dist/src/styles/themes`      | Compiled themes `index.css`      | CSS                       |
| `dist/src/<name>`             | Compiled `index.css`             | CSS                       |
| `dist/bin`                    | Optional executable `main.js`    | ES with shebang           |
| `dist/app/browser`            | Browser application              | target-defined            |
| `dist/app/vue`                | Vue application                  | target-defined            |
| `dist/app/server`             | Server application               | CJS                       |
| `showcase/<application>.html` | Single-file page per application | self-contained, committed |

- Roll up each published TypeScript face's declarations in its Vite wrapper. A face that imports `@src/core` or `@src/browser` rewrites those specifiers to the published subpaths in its emitted declarations.
- A sheet face ships CSS, not declarations, and its JavaScript build stub stays out of `files`.
- Build each sheet face with `cssMinify: false`, bounded to its own output directory.
- Build `dist/src/styles/themes` after `dist/src/styles`; the themes build empties only its own directory.
- Build each selected showcase through `appShowcase(mode)`, `configs/app/vite.showcase.config.ts`, and `vite-plugin-singlefile` into root `showcase/<application>.html`; preserve sibling pages. Use `app/browser/index.html` and `browser.html` for the base modes, and `app/vue/index.html` and `vue.html` for `--mode vue`.
- Stamp each page after inlining with a `build-id` meta line whose value is the SHA-256 digest of the final page without that line.
- The showcase is outside the default build, and no test reads its pages.
- Use Oxc for showcase JS minification and Lightning CSS for CSS.

## Test project matrix

`vite.config.ts` defines Vitest projects on an environment axis and a workspace-proof axis. The
environment axis is one project per src/app axis × environment, plus one per extension face:

| Project       | Files                  | Environment                           | Setup                                           |
| ------------- | ---------------------- | ------------------------------------- | ----------------------------------------------- |
| `src:core`    | `tests/src/core/**`    | Node                                  | `setup.ts`                                      |
| `src:browser` | `tests/src/browser/**` | Playwright Chromium                   | `setup.ts`, `setupBrowser.ts`                   |
| `src:vue`     | `tests/src/vue/**`     | Playwright Chromium                   | `setup.ts`, `setupBrowser.ts`                   |
| `src:server`  | `tests/src/server/**`  | Node                                  | `setup.ts`, `setupServer.ts`                    |
| `src:styles`  | `tests/src/styles/**`  | Playwright Chromium, `isolate: false` | `setup.ts`, `setupBrowser.ts`, `setupStyles.ts` |
| `src:<name>`  | `tests/src/<name>/**`  | Playwright Chromium, `isolate: false` | `setup.ts`, `setupBrowser.ts`, `setupStyles.ts` |
| `src:bin`     | `tests/src/bin/**`     | Node                                  | `setup.ts`, `setupServer.ts`                    |
| `app:core`    | `tests/app/core/**`    | Node                                  | `setup.ts`                                      |
| `app:browser` | `tests/app/browser/**` | Playwright Chromium                   | `setup.ts`, `setupBrowser.ts`                   |
| `app:vue`     | `tests/app/vue/**`     | Playwright Chromium                   | `setup.ts`, `setupBrowser.ts`                   |
| `app:server`  | `tests/app/server/**`  | Node                                  | `setup.ts`, `setupServer.ts`                    |

- Compose every sheet-face project (`src:styles` and each `src:<name>`) in its own wrapper through
  the one root `sheetProject` factory, and run it through its `test:src:<face>` script, which builds
  that face first.
- Give every browser project `optimizeDeps.include` of `@orkestrel/test`, `@orkestrel/test/browser`,
  `@orkestrel/contract` where the manifest declares it, and `vue` where the project renders Vue.
  Give a Node project no `optimizeDeps` setting.

The workspace-proof axis is cross-cutting. Each proof covers the whole workspace rather than
one environment, so each is its own project:

| Project             | Files                                                          | Proves                                                                                                                                                                                                                      | Gate                                  |
| ------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `policy`            | `tests/policy.test.ts`                                         | The path- and text-shaped policy laws: mirrors, suppressions, the rule map, filenames, manifest scripts, skills, and bridges                                                                                                | `test`                                |
| `config`            | `tests/config.test.ts`                                         | Root configuration resolves its aliases, projects, and outputs                                                                                                                                                              | `test`                                |
| `setup`             | `tests/setup*.test.ts` other than either `setup:browser` proof | Prove root setup behavior in Node with `setup.ts`.                                                                                                                                                                          | `test`                                |
| `setup:browser`     | `tests/setupBrowser.test.ts`, `tests/setupStyles.test.ts`      | Prove browser and style setup behavior in Playwright Chromium with `setup.ts` and `setupBrowser.ts`.                                                                                                                        | `test`                                |
| `journey:<variant>` | `tests/app/<application>/integration.test.ts`                  | Drive the application the Vite mode selects at the declared variant viewport in Playwright Chromium with `setup.ts` and `setupBrowser.ts`.                                                                                  | `test` through the journey scripts    |
| `guides`            | `tests/guides.test.ts`                                         | Every documented API exists, every public API is documented, every compared summary, example, and pitch equals its source, and every executable fence returns what the guide says it returns                                | `test`                                |
| `conformance`       | `tests/conformance.test.ts`                                    | Where this package drifts from the official tooling it tracks                                                                                                                                                               | `test`                                |
| `skills`            | `tests/agents/**/*.test.ts`                                    | Each skill script under `.agents/skills/*/scripts/` does what its `SKILL.md` states, driven as a child process against a scratch fixture from its mirrored proof; `configs/agents/tsconfig.skills.json` selects the project | `test`                                |
| `distribution`      | `tests/distribution.test.ts`                                   | The packed package installs and resolves through its public exports                                                                                                                                                         | `prepublishOnly`; absent when private |
| `integration`       | `tests/integration.test.ts`                                    | The package's features work together end to end across environments                                                                                                                                                         | `test`                                |
| `service`           | `tests/service/**/*.test.ts`                                   | The live external services this package drives, driven for real                                                                                                                                                             | `prepublishOnly`; `test` when private |

- Define the Node `setup` project when `global` selects its seeded proof or a root file matches
  `tests/setup*.test.ts`, exact-case, other than `tests/setupBrowser.test.ts` and
  `tests/setupStyles.test.ts`. Include those matching files and exclude both browser proofs.
  Define `setup:browser` when a sheet face or the themes target selects its seeded proof, or either
  exact-case browser proof exists; collect those browser proof paths alone. For each registered project, emit
  its `test:setup` or `test:setup:browser` script and run it from `test`; otherwise emit neither its
  project nor its script.
- When `tests/setupGlobal.ts` exists, give `src:browser`, `setup:browser`, and `integration` that
  module as their `globalSetup` option, and give no other project a global setup.
- When a browser application selects the journey axis, register `journey:<variant>` projects
  through the birth-owned `configs/app/vite.journey.config.ts` wrapper. Keep the adopter's variant
  list there and compose each project through the root `appJourney(variant, variants, mode?)`
  factory, which resolves the Vite mode to `browser` or an app-side browser extension and collects
  `tests/app/<application>/integration.test.ts` for that application. Exclude each collected suite
  from its application project, and run `test:journey` and one `test:journey:<framework>` per
  app-side browser extension after the application projects in `test`.

`conformance`, `integration`, `distribution`, and `service` are separate subjects, not names for
one.
Keep `conformance` in `test`: measure this package against an installed official artifact, and start
any server the proof drives itself. Keep `integration` in `test`: compose the workspace's public
surfaces without packing, installing, or driving an external service. In a publishing workspace,
run `distribution` and `service` from `prepublishOnly`: pack and install the package in
`distribution`, and drive the real service with `tests/setupService.ts`, longer timeouts, and no file
parallelism in `service`. In a `private: true` workspace, never declare `prepublishOnly`; omit
`distribution`, reach `service` from `test`, and retain the service project's isolated
configuration.

One project sits on neither axis. `probe` includes `tmp/probes/**/*.test.ts` so an agent can run a
throwaway instrument against real sources, aliases and setup. Declare no proof there. Keep the
project composed in the root configuration rather than declared as a path string. The `probe` MCP
server arms through it — its arming specifications live under the `tmp/probes/` directory and infer
this project — so a workspace that removes the project, or declares it as a path string, fails the
server's arming, and an unarmed server refuses every `prove` call. The `test:bench` script runs the
same project in benchmark mode, which collects every test file under the `tmp/probes/` directory and
the `tests/` tree while refusing every ordinary test case. Every test script names its project and
the `test:bench` script joins no chain, so no gate runs either mode; the project's directory is
ignored by git; and `.claude/rules/tests.md` governs what may live there.

- Define a cross-cutting project only for a proof the package actually has.
- Prepare the external service before invoking the `service` project. Use `tests/setupService.ts`
  to verify readiness, apply `.claude/rules/tests.md`, and name the project `service` whatever it
  drives.
- In a publishing workspace, a project leaves the default run when it drives a live external
  service or is hermetic but slow — it spawns processes, packs, installs, or drives a real build.
- Give every isolated project its own script, and place that script by the preceding paragraph.

Setup assets:

- Load only the setup assets and compiled sheets the selected proofs require.
- Import `tailwindcss` from a setup asset only where an authored proof declares it.

Scope with `test:src`, `test:src:core`, `test:src:<face>`, `test:app`, `test:app:server`, and
equivalent scripts. Each cross-cutting project has its own script too: `test:policy`,
`test:config`, `test:setup`, `test:setup:browser`, `test:journey`, `test:journey:<framework>`,
`test:guides`, `test:conformance`, `test:distribution`, `test:integration`, `test:service`.

## Typechecking and environment isolation

`npm run check` is the comprehensive contract. It typechecks the whole tree and
then runs the configured scoped checks that prove environment isolation.

- Use plain `tsc` for a TypeScript-only tree.
- Use `vue-tsc` only for a scope containing `.vue` internals.
- `check:src` mirrors configured `src:*` test projects; optional `src:bin` is its
  own scope.
- `check:app` mirrors configured `app:*` projects.
- `check:skills` typechecks `.agents/skills/*/scripts/*.ts` through `configs/agents/tsconfig.skills.json` wherever that wrapper is present: the root project's wildcard never enters a dot-prefixed directory, so the scripts need their own scope.
- The `build:skills` script emits a `.js` twin of every `.agents/skills/*/scripts/*.ts` script into the `dist/agents/skills/` tree through the same wrapper, rewrites each relative import to `.js`, and copies `.agents/templates/brief.md` into the `dist/agents/templates/` directory; the `build` chain runs it after `build:host`, and `dist/agents` ships in the package.
- During development, run the narrowest granular scope that covers the change.
- Lint is a separate complementary gate; neither lint nor root checking replaces
  environment-isolation checks.

| Scope                        | `lib`                             | `types`                                              | Permitted host globals                                                                                                                   |
| ---------------------------- | --------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `src:core`, `app:core`       | `["ESNext","WebWorker"]`          | `[]`                                                 | WHATWG web interop: fetch family, streams, URL, Abort, encoders, crypto, timers, console, DOMException, structuredClone; no DOM, no Node |
| `src:browser`, `app:browser` | `["ESNext","DOM","DOM.Iterable"]` | ["vite/client","@vitest/browser-playwright"]         | DOM; no Node                                                                                                                             |
| `src:server`, `app:server`   | `["ESNext"]`                      | `["node"]`                                           | Node; no DOM                                                                                                                             |
| `src:styles`, `src:<name>`   | `["ESNext"]`                      | `["vite/client"]`                                    | Vite SCSS module declaration only                                                                                                        |
| `src:vue`                    | `["ESNext","DOM","DOM.Iterable"]` | `["vite/client","@vitest/browser-playwright"]`       | DOM; no Node                                                                                                                             |
| `app:vue`                    | `["ESNext","DOM","DOM.Iterable"]` | `["vite/client","vue","@vitest/browser-playwright"]` | DOM and Vue; no Node                                                                                                                     |

Strict core is load-bearing:

- Put a host-dependent helper in its host environment. A `generateId` reading `node:crypto` belongs in server, not core.
- Core declares `WebWorker` to widen the WHATWG interop surface, not to admit a worker host. Policy fences these worker-only globals out of core sources: `name`, `onrtctransform`, `close`, `postMessage`, `dispatchEvent`, `location`, `onerror`, `onlanguagechange`, `onoffline`, `ononline`, `onrejectionhandled`, `onunhandledrejection`, `self`, `importScripts`, `fonts`, `caches`, `crossOriginIsolated`, `indexedDB`, `isSecureContext`, `origin`, `scheduler`, `createImageBitmap`, `reportError`, `cancelAnimationFrame`, `requestAnimationFrame`, `onmessage`, `onmessageerror`, `addEventListener`, `removeEventListener`.

Build/check config alignment:

- `configs/src/tsconfig.{core,browser,vue,server}.json` serves emit and scoped checking.
- `configs/src/tsconfig.styles.json` and each `configs/src/tsconfig.<name>.json` of a styles
  extension are check-only.
- `configs/app/tsconfig.core.json` is check-only.
- `configs/app/tsconfig.{browser,vue,server}.json` is check-only.
- Root `tsconfig.json` keeps all libs/types for IDE and comprehensive checking; scoped configs tighten each environment.

## Script intent

| Script                       | Contract                                                                   |
| ---------------------------- | -------------------------------------------------------------------------- |
| `dev`                        | Browser development entry                                                  |
| `build`                      | Build configured library/application targets                               |
| `serve` / `serve:build`      | Run built server / build then run                                          |
| `showcase`                   | Showcase dev server of the base mode                                       |
| `showcase:<framework>`       | Showcase dev server of that framework's mode                               |
| `build:showcase`             | Build `showcase/browser.html`                                              |
| `build:showcase:<framework>` | Build `showcase/<framework>.html`                                          |
| `lint`                       | `oxlint --config .oxlintrc.json --fix .`; separate from typecheck          |
| `lint:check`                 | Non-mutating whole-tree lint gate                                          |
| `check`                      | Comprehensive root typecheck plus configured isolation scopes              |
| `check:<scope>`              | On-demand environment-isolation pass                                       |
| `format`                     | Format all files                                                           |
| `format:check`               | Non-mutating whole-tree format gate                                        |
| `test`                       | Environment projects plus non-isolated cross-cutting proofs                |
| `clean`                      | Remove `dist/`                                                             |
| `copy <from> <to>`           | Copy while creating parent directories                                     |
| `prepublishOnly`             | Publishing workspaces only: the gate chain, then isolated proofs           |
| `prepack`                    | Publishing workspaces only: rebuild `dist/` so a pack ships current output |

- In a publishing workspace, `prepublishOnly` runs `build:showcase` and every
  `build:showcase:<framework>` script after `npm run build`.
- List `showcase/` and `*.min.*` in `.prettierignore`, so formatting never rewrites a committed page or a minified generated record. Give the `.min` suffix only to a record an instrument writes from an installed package in compact form (a JSON inventory over 1 MB, for example), never to authored source, and read such a record through a guarded reader. Never list a source file there; `.claude/rules/styles.md` § Prohibitions states how a pinned recreation stays formatter-stable.

## Tooling

- Typechecker: `vue-tsc` only where Vue SFCs are checked; `tsc` elsewhere.
- Linter: Oxlint with `.oxlintrc.json`, independent from typechecking.
- Formatter: Oxfmt with `.oxfmtrc.json`.
- Bundler: Vite.
- Tests: Vitest; `@vitest/browser-playwright` for browser projects.
- Node build targets derive from the package's declared supported runtime. Keep `engines`, bundler targets, scoped configs, tests, and documentation aligned; never hard-code one Node version line-wide.
- Browser framework: the `vue` extension where selected.

Policy instruments:

- Put every rule of the policy law in exactly one instrument. `configs/policy.ts` — the
  oxlint plugin, namespace `policy` — takes the rules a single file's AST decides. The policy sweep
  (`tests/setupPolicy.ts`) takes the rules that are path- or text-shaped, and every rule whose
  subject is suppression itself.
- Choose between them by what can defeat the rule: an instrument must not be suppressible by the
  thing it polices. A file-level `oxlint-disable` silently defeats every lint rule in its file,
  plugin rules included, and nothing inside a file can suppress the sweep.
- Write each visitor in the plugin's visitor table as a one-line context-binding arrow delegating to
  a named module-scope `report{Noun}` function. Never write rule logic inline in the table. Treat the
  visitor table as a returned object literal whose members are callbacks.
- Name an individual rule id here only where the rule reads its evidence from outside the workspace
  its instrument runs in. This section fixes the instruments and how work is assigned between them;
  each rule's substance stays with the law it enforces.
- `surface` is that rule, and the sweep owns it. It reads the fleet's published guides — a target
  reads `node_modules/@orkestrel/scaffold/dist/host/guides/`, and a scaffold checkout reads its own
  `guides/` — and compares every bare name their `## Surface` tables claim against the target's live
  barrel exports and its own root `tests/setup*.ts` exports. `.claude/rules/names.md` § Fleet name
  ownership defines the bare name that comparison matches and decides which declaration gives a
  claimed name up.
- Keep every barrel statement in the form `.claude/rules/architecture.md` § Barrel exports fixes.
  The sweep refuses a barrel population it cannot read whole and reports that refusal as a `surface`
  violation rather than passing over the statements it did read. A catalog row with no hosted guide,
  and a missing hosted guide root, refuse the same way.
- Change the code when an instrument reports a violation.

## Text integrity

- Store text as UTF-8.
- Before accepting broad generated or migrated edits, scan changed text for replacement characters, mojibake, unintended control characters, and accidental trailing debris.
- Preserve intentional Unicode punctuation and symbols; do not “clean” valid text merely because it is non-ASCII.
- Never renormalize Unicode while rewriting a file. Retyping a line can silently fold a decomposed sequence into its precomposed form — `e` + U+0301 becoming U+00E9 — and the two render identically, so the diff reads as a no-op and review sees nothing. Where the exact code points are the subject, as in an encoding or transport proof, that fold deletes the case the test exists for while leaving it green and named. Move such a line rather than retyping it, and compare bytes with `od -c` or a code-point dump rather than by eye.
