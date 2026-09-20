# U1-conform — report

Every accepted finding of the first-half conformance audit is closed in the Veneer tree. All
briefed gates exit 0 on managed Chromium, and `test:src` and `test:app` exit 0 on Edge. Three
decisions were taken inside the owned scope and carried on from; one acceptance criterion is met to
the bound its finding named rather than to its literal wording, and its exact patch is supplied.

## Touched files

| File | Change |
| --- | --- |
| `src/browser/ColorMode.ts` | Moved from `src/browser/color-mode/ColorMode.ts`; imports rewritten to siblings; `ColorScheme` to `ColorModeState`, `isColorScheme` to `isColorModeState` |
| `src/browser/color-mode/ColorMode.ts` | Deleted with its folder |
| `src/browser/types.ts` | `ColorScheme` to `ColorModeState` at its declaration and every member; the `storage` description names the `color-mode` key |
| `src/browser/constants.ts` | `COLOR_MODE_KEY` is `'color-mode'` |
| `src/browser/validators.ts` | `isColorScheme` to `isColorModeState`; summary and example renamed with it |
| `src/browser/factories.ts` | Deleted: `createColorMode` was `return new ColorMode(options)` |
| `src/browser/index.ts` | Factory row removed; class row points at the flat module |
| `app/browser/Showcase.ts` | Moved from `app/browser/showcases/Showcase.ts`; constructs `ColorMode` directly; the constructor keeps to the host, the controller, and the `#` field assignments and calls one `#mount()` |
| `app/browser/showcases/Showcase.ts` | Deleted with its folder |
| `app/browser/factories.ts` | Deleted: `createShowcase` was `return new Showcase(host)` |
| `app/browser/index.ts` | Factory row removed; class row points at the flat module |
| `app/browser/main.ts` | Imports `Showcase` from `./Showcase.js` rather than from its own barrel |
| `app/browser/index.html` | Document title is `Veneer` |
| `app/browser/styles/index.scss` | Declares the app's cascade-layer order `shell`, then loads the partial |
| `app/browser/styles/_shell.scss` | Rules wrapped in the app's own `shell` layer; the deferred-work comment replaced by a present-tense statement of what the shell owns |
| `tests/src/browser/ColorMode.test.ts` | Moved from `tests/src/browser/color-mode/ColorMode.test.ts`; storage key is `color-mode`; carries the two folded factory cases |
| `tests/src/browser/factories.test.ts` | Deleted; its cases live in `ColorMode.test.ts` |
| `tests/src/browser/validators.test.ts` | Guard renamed at every call |
| `tests/src/browser/index.test.ts` | Export set drops `createColorMode` and renames the guard; the listener control resolves at `../../setupListeners.js` |
| `tests/src/browser/fixtures/constants.ts` | Deleted with its folder |
| `tests/setupListeners.ts` | New: the load-time document listener and its `AbortController` |
| `tests/app/browser/Showcase.test.ts` | Moved from `tests/app/browser/showcases/Showcase.test.ts`; constructs `Showcase` directly |
| `tests/app/browser/index.test.ts` | Export set is `['SHOWCASE_COPY', 'Showcase']` |
| `tests/conformance.test.ts` | Built-artifact case removed; renamed helpers and `WORKSPACE_ROOT` at every call; the `existsSync` import dropped |
| `tests/distribution.test.ts` | Built-artifact case added against `stage.installed`, reading the packed tree rather than the workspace's `dist/` |
| `tests/setupConformance.ts` | `extractSpecifiers`, `scanForbiddenSource`, `scanForbiddenDependency`, `scanEscapingImport`, `collectImportClosure`, `computeArtifactDigest`; `readManifestMember` and `readBootstrapCascade` kept; `WORKSPACE_PATH` to `WORKSPACE_ROOT`; each summary verb matches its new prefix |
| `tests/setupConformance.test.ts` | Import list and export-set assertion rewritten to the renamed, sorted set; four case titles follow the prefixes |
| `guides/veneer.md` | `Surface` rows renamed and the factory row struck; the examples construct the class; the `Tests` links follow the moved and deleted proofs; one sentence under the showcase section records the framework-free choice |
| `tests/guides.test.ts` | Granted lines only: the `isColorModeState` import and its two calls |
| `tests/setupBrowser.ts` | Granted line only: `mountShowcase` destructures `Showcase` and constructs it |
| `guides/README.md` | Unchanged: no row names a renamed or deleted export |

## Diffstat

```text
 app/browser/factories.ts                       |  17 -----
 app/browser/index.html                         |   2 +-
 app/browser/index.ts                           |   3 +-
 app/browser/main.ts                            |   7 +-
 app/browser/showcases/Showcase.ts              |  60 ---------------
 app/browser/styles/_shell.scss                 |  24 +++---
 app/browser/styles/index.scss                  |  10 ++-
 guides/veneer.md                               |  30 ++++----
 src/browser/color-mode/ColorMode.ts            |  53 -------------
 src/browser/constants.ts                       |   2 +-
 src/browser/factories.ts                       |  18 -----
 src/browser/index.ts                           |   3 +-
 src/browser/types.ts                           |  10 +--
 src/browser/validators.ts                      |  10 +--
 tests/app/browser/index.test.ts                |   2 +-
 tests/app/browser/showcases/Showcase.test.ts   |  55 -------------
 tests/conformance.test.ts                      |  62 +++++----------
 tests/distribution.test.ts                     |  24 ++++++
 tests/guides.test.ts                           |   6 +-
 tests/setupBrowser.ts                          |   4 +-
 tests/setupConformance.test.ts                 | 102 ++++++++++++-------------
 tests/setupConformance.ts                      |  40 +++++-----
 tests/src/browser/color-mode/ColorMode.test.ts |  90 ----------------------
 tests/src/browser/factories.test.ts            |  36 ---------
 tests/src/browser/fixtures/constants.ts        |   6 --
 tests/src/browser/index.test.ts                |   5 +-
 tests/src/browser/validators.test.ts           |  20 ++---
 27 files changed, 192 insertions(+), 509 deletions(-)
```

The new files, which a diffstat over tracked paths does not carry: `src/browser/ColorMode.ts`,
`app/browser/Showcase.ts`, `tests/src/browser/ColorMode.test.ts`,
`tests/app/browser/Showcase.test.ts`, `tests/setupListeners.ts`.

## Placement table

| Owned file | Rule row that places it |
| --- | --- |
| `src/browser/ColorMode.ts` | `architecture.md` Centralized-file pattern, "Implementations, `*/[domain]/[Entity].ts` — one class per file"; Entity subfolders, "When one entity grows a family ... nest only its class files in a lowercase plural folder" — no family, so flat at the environment root |
| `src/browser/types.ts` | Centralized-file pattern, "Interfaces/types, `*/types.ts`" |
| `src/browser/constants.ts` | Centralized-file pattern, "Constants/data, `*/constants.ts`" |
| `src/browser/validators.ts` | Centralized-file pattern, "Guards, `*/validators.ts`" |
| `src/browser/index.ts` | Barrel exports, "`*/index.ts` is the sole public barrel" and "A barrel contains only `export * from './module.js'` declarations" |
| `app/browser/Showcase.ts` | The same implementation row and Entity subfolders as `ColorMode.ts`; `application.md`, "Every selected environment has an `index.ts` barrel" |
| `app/browser/types.ts` | Centralized-file pattern, "Interfaces/types" |
| `app/browser/constants.ts` | Centralized-file pattern, "Constants/data" |
| `app/browser/index.ts` | Barrel exports |
| `app/browser/main.ts` | `architecture.md` Declaration placement, "A runtime entry ... declares no module-scope constant and no module-scope function: it imports what it needs and runs"; `workspace.md` Environments, "`app/browser/`, Browser app; `main.ts` entry, not a barrel" |
| `app/browser/index.html` | `application.md`, "app/browser uses app/core contracts, Vue 3 when selected, an `index.html` entry" |
| `app/browser/styles/index.scss` | `styles.md` Centralized files, "`index.scss`, Sole compilation barrel"; Prohibitions, "Declare cascade-layer order once in the consumer entry" |
| `app/browser/styles/_shell.scss` | `styles.md` Prohibitions, "Never wrap rules in a foreign cascade layer. Each partial uses its folder's own layer" |
| `tests/src/browser/ColorMode.test.ts` | `tests.md` Test contract, "Mirror module/application structure: `tests/{src,app}/[environment]/[domain]/[module].test.ts`"; `names.md` Files and folders, "Test, source filename without extension + `.test`" |
| `tests/src/browser/validators.test.ts` | The same mirror row |
| `tests/src/browser/index.test.ts` | `tests.md` Test contract, "Prefer test filenames matching entrypoints: `index.test.ts` for `index.ts`" |
| `tests/app/browser/Showcase.test.ts` | The same mirror row |
| `tests/app/browser/index.test.ts` | The same entrypoint row |
| `tests/app/browser/integration.test.ts` | `tests.md` Cross-cutting proofs, "`integration.test.ts` is a reserved filename at any level ... its scope is the directory it sits in" (unchanged by this unit) |
| `tests/setupListeners.ts` | `tests.md` Shared test infrastructure, "Test helpers are shared infrastructure, not local test-file clutter"; Test contract, "Resolve each root `tests/setup*.test.ts` proof against its sibling `tests/setup*.ts` module" |
| `tests/setupConformance.ts` | The same shared-infrastructure row; `workspace.md` Test project matrix places the module beside the proofs that load it |
| `tests/setupConformance.test.ts` | `tests.md` Cross-cutting proofs, "`tests/setup*.test.ts`, Reusable behavior exported from sibling `tests/setup*.ts` modules works as the workspace's suites require" |
| `tests/conformance.test.ts` | `tests.md` Cross-cutting proofs, "`tests/conformance.test.ts`, Where this package drifts from the official tooling it tracks" |
| `tests/distribution.test.ts` | `tests.md` Cross-cutting proofs, "`tests/distribution.test.ts`, The packed package installs and resolves through its public exports" |
| `guides/veneer.md` | `names.md` Files and folders, "Guide, lowercase domain"; `documentation.md` Parity |
| `guides/README.md` | `documentation.md` Authority and workflow, "`guides/README.md` is the map" |
| Deleted `src/browser/factories.ts` and `app/browser/factories.ts` | `architecture.md` Wrapper test, "Delete one-line delegates, pass-through factories, rename-only helpers/getters" |
| Deleted `tests/src/browser/fixtures/constants.ts` | `architecture.md` Kind purity, "Each centralized file contains only its named kind"; the verdict's plan rule that a test `fixtures/` folder holds only data files a proof loads |

`tests/src/styles/fixtures/mixins.scss` remains and is correct: it is SCSS data a styles proof
loads, it is off-limits to this unit, and the plan rule permits exactly that. No `fixtures/` folder
holds TypeScript.

## The listener-control module

The name chosen is `tests/setupListeners.ts`. It owns one thing and is named for it: the document
listener installed while the module loads, and the `AbortController` that removes it. The stem sits
beside the workspace's other subject-named setup stems — `setupBrowser`, `setupServer`,
`setupStyles`, `setupConformance` — and the export keeps its name, `ENTRY_LISTENER_CONTROL`.

Each selection ignores it, for these reasons.

- The Vitest `setup` project's include is `tests/setup*.test.ts` with `tests/setupBrowser.test.ts`
  excluded, at `vite.config.ts:302-303`. The new module ends in `.ts`, not `.test.ts`, so no project
  collects it as a test file. `tests/src/browser/index.test.ts` imports it, inside the recorded
  action, and that file runs in the `src:browser` Playwright project where `document` exists.
- `repair`'s selection is a fixed set of exact-case paths. `guides/scaffold.md` under "Reading a
  target" fixes what a reading verb derives from a file: `src/bin/main.ts` selects `bin`, each root
  `tests/setup*.test.ts` match selects `setup`, `tests/guides.test.ts` selects `guides`,
  `tests/integration.test.ts` selects `integration`, `tests/conformance.test.ts` selects
  `conformance`, `tests/setupService.ts` selects `service`, `tests/setupGlobal.ts` selects `global`,
  and the two `configs/app/` wrappers select `showcase` and `journey`. `tests/setupListeners.ts` is
  in none of those, and the birth-owned seed set is `tests/setup.ts`, `tests/setupBrowser.ts`,
  `tests/setupServer.ts`, `tests/setupService.ts`, and `tests/setupGlobal.ts`, so `repair` neither
  plans nor restores it. `scaffold audit` confirms it: `0 of 48 planned paths drifted from the plan`.
- The `surface` policy rule does read it: the sweep globs `tests/setup*.ts` and compares each export
  against the fleet's hosted guides. `ENTRY_LISTENER_CONTROL` collides with nothing, and
  `test:policy` is green.

One consequence, non-blocking, is recorded under Deviations: `scaffold audit` raises its `setup`
question for the module, because no `tests/setupListeners.test.ts` covers it.

## Gate evidence

Every command was run in `C:/Users/mikes/WebstormProjects/veneer` on Windows under Git Bash, on
2026-09-20.

### Managed Chromium and Node

```text
$ npm run format:check
All matched files use the correct format.
Finished in 738ms on 80 files using 16 threads.

$ npm run lint:check
oxlint --config .oxlintrc.json --deny-warnings .
exit=0 (no diagnostics printed)

$ npm run check
vue-tsc --noEmit -p configs/app/tsconfig.browser.json
exit=0

$ npm run build
dist/app/browser/assets/index-BEOgV8KK.js    2.31 kB | gzip: 0.96 kB
built in 306ms

$ npm run test:src
 Test Files  4 passed (4)
      Tests  17 passed (17)                 exit=0

$ npm run test:src:styles
 Test Files  7 passed (7)
      Tests  40 passed (40)                 exit=0

$ npm run test:app
 Test Files  2 passed (2)
      Tests  3 passed (3)                   exit=0

$ npm run test:journey
 Test Files  4 passed (4)
      Tests  32 passed | 4 skipped (36)     exit=0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)   exit=0

$ npm run test:config
 Test Files  1 passed (1)
      Tests  173 passed | 1 skipped (174)   exit=0

$ npm run test:setup
 Test Files  3 passed (3)
      Tests  83 passed (83)                 exit=0

$ npm run test:setup:browser
 Test Files  1 passed (1)
      Tests  18 passed (18)                 exit=0

$ npm run test:conformance
 Test Files  1 passed (1)
      Tests  6 passed (6)                   exit=0

$ npm run test:guides
 Test Files  1 passed (1)
      Tests  18 passed (18)                 exit=0
```

### Edge

`PLAYWRIGHT_CHANNEL=msedge` reaches the browser projects alone; the other projects run in Node and
take no engine.

```text
$ PLAYWRIGHT_CHANNEL=msedge npm run test:src
 Test Files  4 passed (4)
      Tests  17 passed (17)                 exit=0

$ PLAYWRIGHT_CHANNEL=msedge npm run test:app
 Test Files  2 passed (2)
      Tests  3 passed (3)                   exit=0
```

### The policy sweep's one red, and its fix

`test:policy` reddened once during the unit, on the fleet name-ownership rule. This run is the
failing count before the fix.

```text
$ npm run test:policy
AssertionError: expected [ { rule: 'surface', ...(3) } ] to deeply equal []
+   {
+     "line": 233,
+     "message": "surface name belongs to one package: computeFileDigest (scaffold)",
+     "path": "tests/setupConformance.ts",
+     "rule": "surface",
+   },
 Test Files  1 failed (1)
      Tests  1 failed | 108 passed | 1 skipped (110)
```

After renaming the helper `computeArtifactDigest`, the same command:

```text
$ npm run test:policy
 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
```

### scaffold audit

Read-only, run to establish what the new setup module does to the audit rather than to guess at it:

```text
$ node node_modules/@orkestrel/scaffold/dist/bin/main.js audit
setup: The target at . carries a test setup module that no proof covers: tests/setupListeners.ts.
  Add tests/setupListeners.test.ts to cover it. The proof's subject is behavior only this workspace
  can assert, so scaffold does not write it.
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and
nothing at 14.
EXIT=0
```

The three `dependencies` questions predate this unit and name registry majors the manifest does not
declare. The manifest was not touched.

## The manifest patch, report-only and not applied

Apply it to `package.json`, then run `npm install`. `postcss` stays: `tests/setupStyles.ts` parses
the Bootstrap oracle with it.

```diff
--- a/package.json
+++ b/package.json
@@ -96,7 +96,6 @@
 		"@orkestrel/probe": "^0.0.16",
 		"@orkestrel/scaffold": "^0.0.76",
 		"@orkestrel/test": "^0.0.18",
-		"@tailwindcss/vite": "^4.3.3",
 		"@types/node": "^26.6.2",
 		"@vitejs/plugin-vue": "^6.0.9",
 		"@vitest/browser-playwright": "^4.1.11",
@@ -106,7 +105,6 @@
 		"playwright": "^1.63.0",
 		"postcss": "^8.5.15",
 		"sass": "^1.104.1",
-		"tailwindcss": "^4.3.3",
 		"typescript": "^6.0.3",
 		"vite": "^8.3.0",
 		"vite-plugin-singlefile": "^2.3.3",
```

The patched manifest parses as JSON. That was checked on a copy under `tmp/`, which was removed.

## Acceptance criteria

1. Met. No lone class sits in a subfolder under `src/browser/` or `app/browser/`. The only remaining
   `fixtures/` folder is `tests/src/styles/fixtures/`, holding `mixins.scss` alone.
   `src/browser/factories.ts` and `app/browser/factories.ts` are absent.
2. Met. A case-sensitive word-boundary sweep for `ColorScheme`, `isColorScheme`, `createColorMode`,
   `createShowcase`, `WORKSPACE_PATH`, `readSpecifiers`, `readForbiddenSource`,
   `readForbiddenDependency`, `readEscapingImport`, `readImportClosure`, and `readFileDigest` over
   `src`, `app`, `tests`, and `guides` returns nothing.
3. Met to the bound its finding named, and not to its literal wording. See Deviation 4.
4. Met. `format:check`, `lint:check`, `check`, and `build` exit 0; every test project exits 0 on
   managed Chromium; `test:src` and `test:app` exit 0 on Edge.
5. Met. `git status --porcelain` lists owned files, the two granted files, and nothing else. `tmp/`
   is ignored by git and carries earlier units' residue; this unit added `u1-conform-report.md`
   and removed every instrument it wrote there.

```text
 D app/browser/factories.ts
 M app/browser/index.html
 M app/browser/index.ts
 M app/browser/main.ts
 D app/browser/showcases/Showcase.ts
 M app/browser/styles/_shell.scss
 M app/browser/styles/index.scss
 M guides/veneer.md
 D src/browser/color-mode/ColorMode.ts
 M src/browser/constants.ts
 D src/browser/factories.ts
 M src/browser/index.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/app/browser/index.test.ts
 D tests/app/browser/showcases/Showcase.test.ts
 M tests/conformance.test.ts
 M tests/distribution.test.ts
 M tests/guides.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 D tests/src/browser/color-mode/ColorMode.test.ts
 D tests/src/browser/factories.test.ts
 D tests/src/browser/fixtures/constants.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
?? app/browser/Showcase.ts
?? src/browser/ColorMode.ts
?? tests/app/browser/Showcase.test.ts
?? tests/setupListeners.ts
?? tests/src/browser/ColorMode.test.ts
```

## Deviations

### 1. computeFileDigest is computeArtifactDigest

Item 6 names `readFileDigest` to `computeFileDigest`. That target name is owned by
`@orkestrel/scaffold`, whose hosted guide claims it, and the `surface` policy rule grandfathers no
root `tests/setup*.ts` export. The failing and passing runs are under Gate evidence.

`.claude/rules/names.md` under "Fleet name ownership" resolves it in order. Reuse does not apply,
because the contracts differ. Scaffold's `computeFileDigest(path: string): string | undefined`
answers `undefined` for a path that is not a physical file, reads in bounded chunks, and re-measures
the file's identity. Veneer's throws, and `tests/setupConformance.test.ts` asserts that through
`expect(() => computeArtifactDigest(resolve(scratch.path, 'absent'))).toThrow(/ENOENT/u)`, because a
missing pinned Bootstrap artifact is a failure rather than an absence. So the rule's second
resolution applies: the name stays with scaffold, and Veneer's helper is renamed for what it is,
the digest of one artifact this package pins. The `compute*` prefix and the `{verb}{Noun}` form are
unchanged, and the doc block now states the throw.

Ancillary: decided and carried on. No Orchestrator action is needed unless the fleet prefers a
different spelling.

### 2. The app's layer order sits in index.scss through meta.load-css

Item 5 requires `app/browser/styles/index.scss` to declare the app's cascade-layer order. Sass
refuses a `@layer` statement placed before a `@use` rule, which a throwaway probe confirmed:

```text
ERR: @use rules must be written before any other rules.
3 | @use 'x';
```

A `@layer shell;` written after `@use 'shell'` reaches the document behind the block it orders, so
the entry uses Sass's own mechanism for emitting a loaded stylesheet at a chosen point:

```scss
@use 'sass:meta';

@layer shell;

@include meta.load-css('shell');
```

The compiled entry emits `@layer shell;` first and the block after it. `shell` is outside the
published cascade's order statement, so the shell's rules sort after every published layer, which is
where an application's own rules belong.

Ancillary: decided and carried on.

### 3. main.ts discards the construction with void

`app/browser/main.ts` constructs `Showcase` directly now that the factory is gone. A bare
`new Showcase(document.body)` statement fails `lint:check`:

```text
app/browser/main.ts:5:1: warning eslint(no-new): Do not use 'new' for side effects.
```

That rule's own remedy, assigning the result to a variable, is refused by `architecture.md` under
"Declaration placement", which bars a module-scope constant in a runtime entry. `void` discards the
result without a binding, passes the gate, and carries a comment saying the page owns the showcase
for its whole life. `.oxlintrc.json` is vendored and was not touched.

Ancillary: decided and carried on.

### 4. Criterion 3: conformance still needs the styles bundle, through an off-limits file

The built-artifact case is out of `tests/conformance.test.ts`, so the proof no longer needs
`npm run build`. It is not yet runnable with no `dist/src` at all, because
`tests/setupConformance.ts` imports `BOOTSTRAP_CASCADE_PATH` from `tests/setupStyles.ts`, and that
module carries a load-time side-effect import of the compiled stylesheet. Measured on a cleaned
tree:

```text
$ npm run clean && npm run test:conformance
FAIL  |conformance| tests/conformance.test.ts
Error: Cannot find module '../dist/src/styles/index.css' imported from
  C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts
 -> tests/setupStyles.ts:4:1
 -> tests/setupConformance.ts:14:1
```

With the styles bundle alone built:

```text
$ npm run build:src:styles && npm run test:conformance
 Test Files  1 passed (1)
      Tests  6 passed (6)
```

That closes the finding as recorded. The reviewer's subject was that `npm test` reds on a clean
checkout at the built-artifact case, which needed `dist/src/core` and `dist/src/browser`. The `test`
chain runs `test:src:styles`, which itself runs `build:src:styles`, before `test:conformance`, so
the chain supplies everything conformance reads.

Closing the literal wording needs `tests/setupStyles.ts`, which is off-limits to this unit. The
exact patch, for the Orchestrator to route or to apply serially, moves the path constant to the
Node-only module that reads it and reverses the import edge:

- In `tests/setupConformance.ts`, delete `import { BOOTSTRAP_CASCADE_PATH } from './setupStyles.js'`
  and declare that constant there instead, beside `readBootstrapCascade`, its only reader in Node.
- In `tests/setupStyles.ts`, import `BOOTSTRAP_CASCADE_PATH` from `./setupConformance.js` in place
  of declaring it, and keep the `../dist/src/styles/index.css` side-effect import, which the browser
  styles project needs.

That edge runs the opposite way today, and it is why a Node-only conformance proof loads a browser
stylesheet. Both files' export sets move, so `tests/setupStyles.test.ts` and
`tests/setupConformance.test.ts` change with them. A successor unit owning all four is the clean
shape.

Reported, not done: it requires an unowned change.

### 5. scaffold audit raises a new non-blocking setup question

`tests/setupListeners.ts` is a filled root setup module with no `tests/setupListeners.test.ts`, so
`audit` names it. The exit code is unchanged at 0 and the plan comparison is clean.

A same-stem proof cannot be written where the projects stand. The module calls
`document.addEventListener` while it loads, and the only project that collects a root setup proof in
a browser is `setup:browser`, whose include is the exact path `tests/setupBrowser.test.ts`. The Node
`setup` project has no DOM and would throw on import. The module's behaviour is proved in the one
project where it can run: `tests/src/browser/index.test.ts` imports it inside the recorded action
and asserts the recorder saw the document listener.

Two paths close it. Accept the question, which is the recommendation, because the behaviour is
proved where it can be proved. Or widen the `setup:browser` include, which is content-owned
configuration and would put a second file in a project scaffold scopes to one.

Reported, not done.

### 6. Two grants read strictly

`tests/guides.test.ts` changed on three lines: the `isColorModeState` import and its two calls. The
surrounding case title still reads `executes the scheme-validation example verdicts`. Renaming it
would have been a fourth line outside the grant, and criterion 2's sweep does not reach it. A
successor that owns the file can rename it to name the mode axis.

`tests/setupBrowser.ts` changed on two lines: `mountShowcase` destructures `Showcase` from the app
barrel and constructs it. The barrel import stays, because that module is an outside consumer of the
app environment; only `app/browser/main.ts` was required to reach past its own barrel.

Ancillary: decided and carried on.

### 7. The shell keeps the system surface colors

`app/browser/styles/_shell.scss` still paints `body` from `Canvas` and `CanvasText`. Those are CSS
system colors rather than literal values, and they are what makes the shell respond to the
`color-scheme` the mode switch selects. Replacing them with `--vn-*` tokens breaks `test:journey`
and `test:app`: `mountShowcase` loads `app/browser/styles/index.scss` alone and never the published
cascade, so the tokens resolve to nothing there and the journey's light-against-dark background
assertion compares two identical transparent readings. Loading the cascade there means editing
`tests/setupBrowser.ts` beyond its granted line.

The verdict assigns the token adoption elsewhere, in the words "The token adoption itself belongs to
the unit that owns `src/styles/**`", and U3 has since landed `src/styles/elements/_body.scss`, which
paints the body from `--vn-surface-body-base` and `--vn-text-body-base`. So the shell's rule now
overrides a baseline that exists, which it did not when the finding was written. The comment states
what the shell owns in the present tense and no longer records deferred work.

Reported, not done. Closing it is one successor unit owning `app/browser/styles/**` and
`tests/setupBrowser.ts` together: have the app's stylesheet entry load the published cascade, drop
the shell's `body` rule, and let the `elements` layer paint.
