<!-- workflow wf_52e3114b-d1c, agent af83780c3ebd28eaf, captured from journal.jsonl -->

**Lane held: subjective** (`planner`, Opus 5). `Constraints`, `Refusals`, and `Measurements` are left empty for the objective lane.

## Design

### 1. Probe's type stage — the `--api` sync surface

Take `typescript/unstable/sync`. The language server cannot name a project: the measurement shows it attributed an overlay under `src/core` to the root `tsconfig.json` rather than to `configs/src/tsconfig.core.json`, and no `--project` flag or confirmed `initializationOptions` field exists. `Claim.project` and `Verdict.project` are the contract that a verdict is an assertion under one compiler configuration (`/home/user/fleet/probe/src/core/types.ts:274-282`), so a surface that picks the project itself deletes that contract. The `--api` client keeps it exactly: `api.parseConfigFile(project)` returns the resolved `options` `Project.digest` already hashes, and `updateSnapshot({ openProjects: [project] })` names the project the caller asked for.

What moves inside `TypeStage`, and what does not:

- `#services: Map<string, LanguageService>` becomes one client plus one snapshot. `#options` and `#files` are filled from `parseConfigFile` instead of `readConfigFile`/`parseJsonConfigFileContent`. `#resident`, `#recycled`, and `#recycle` survive unchanged in purpose — a caller-supplied project string still needs a bound — retargeted from services to `openProjects` membership.
- The `LanguageServiceHost` object (`TypeStage.ts:309-326`) is replaced by a `FileSystem` overlay passed at client construction. The semantics match the current host one for one: return the overlay's text for a path it holds, return `undefined` for every other path so the server falls back to disk. `getDefaultLibFileName`, `getNewLine`, `readDirectory`, `getDirectories`, and `ScriptSnapshot` disappear into the native server.
- `getCompilerOptionsDiagnostics` becomes `Program.getConfigFileParsingDiagnostics()` and `getProgramDiagnostics()`; `getSyntacticDiagnostics`/`getSemanticDiagnostics` keep their names on `Program`.
- `flattenDiagnosticMessageText` disappears: `Diagnostic.text` arrives flattened.
- `diagnostic.file.getLineAndCharacterOfPosition` disappears. `Diagnostic` carries `pos`/`end` character offsets, so the stage converts them with one exported pure leaf, `computeRange(text, pos, end): LSPRange`, in `probe/src/server/helpers.ts`. `Issue.range` keeps its published zero-based UTF-16 contract because JavaScript string indices are already UTF-16 code units.
- `#unblock` stays and its rationale sharpens: the sync client blocks on `readSync` over a pipe, so a candidate's check still holds the loop and still must hand it back at each candidate boundary.
- Draft mutation between the case and the control is announced through `updateSnapshot({ fileChanges: { changed: [...] } })`, which the measurement shows serves a re-check in milliseconds and serves a stale answer when the announcement is omitted. That announcement is the stage's obligation at each `#record`.

**The published surface stops naming the compiler.** `loadWorkspaceModule`'s `'typescript'` overload and its `typeof TypeScript` return type are removed from `probe/src/server/index.ts`, and the surviving `vitest/node` load folds into a single-purpose helper rather than keeping a one-member specifier union. The client is built by `createWorkspaceCompiler(workspace)` in `probe/src/server/factories.ts` — a `create*` factory because the client owns a spawned process and a `close()`, so it is a live entity rather than a plain value. `TypeStage`'s public members (`stage`, `progress`, `inspect`, `resolve`, `destroy`) name no compiler type, so probe's rolled-up `dist/src/server/index.d.ts` imports nothing from `typescript`.

`Toolchain.typescript` keeps its mechanism — the version the target workspace's own installed `typescript` manifest publishes — and now reads `7.0.2`. Its TSDoc paragraph about a bridged workspace is deleted; the caveat existed only for the bridge. The receipt token's shape does not move: `probe:<digest>:type:typescript@7.0.2:oxlint@…:vitest@…:<project>@<digest>`.

The `typescript` peer becomes `^7.0.2` and stays optional. It is a real runtime requirement of the type stage, but a required peer forces an install into every consuming tree; the refusal mechanism is already correct and already published — `ProbeError` with `origin: 'workspace'`, `code: 'missing'`. A workspace that installs no `typescript` gets that refusal by name, with the specifier in `context.name`.

### 2. Declarations — `tsc` 7 emits, api-extractor rolls up

`vite-plugin-dts` and `unplugin-dts` go. Their only job was running `createProgram` for the emit, and TypeScript 7's own `tsc` does that. api-extractor stays: its bundled 5.9.3 is its own engine, not a dependency of ours on the 6 major, and it is the engine every shipped rollup was already made with.

The two-step needs a home that keeps the per-face `beforeWriteFile` rewrite, which externalizes `core/index` to `@orkestrel/<package>` on the browser and server rollups. Script chaining loses that rewrite; a new `configs/` leaf is not permitted. So the two-step becomes one vendored Vite plugin factory, `declarationBundle`, in `configs/helpers.ts`, beside the existing `outputBoundary` and `environmentBoundary` factories that `configs/src/vite.*.config.ts` already imports from there. It imports `node:child_process` and nothing from the workspace, so it stays a leaf that resolves in every target. At `closeBundle` it runs `tsc -p <project> --declaration --emitDeclarationOnly --noEmit false --outDir <scratch under dist/>`, writes the manifest the api-extractor Collector requires beside the emit, invokes api-extractor programmatically, applies the caller's rewrite, and writes the rollup. Its options are single words: `project`, `types`, `rewrite`.

The call site changes shape only in the plugin's name and its option object:

```ts
declarationBundle({
	project: resolveWorkspacePath('configs/src/tsconfig.core.json'),
	types: ['node'],
})
```

`build:src:*` scripts do not move, and the `.d.cts` copy stays chained where it is.

`bundleTypes.invokeOptions.typescriptCompilerFolder: ''` is deleted everywhere it appears — scaffold's two Vite configs, the three seeds in `src/core/templates.ts`, and the guide paragraph at `guides/scaffold.md:1148-1156`. It existed only because `unplugin-dts` pointed that option at the installed `typescript` root; with `unplugin-dts` gone, the option is not set and api-extractor resolves lib types against its own bundled compiler by documented default.

Every `src`-publishing package's `dist/` is a candidate to move, because the new rollup writes `import type` where the shipped one wrote `import`. That is a token change, so it is material, so the packages whose rollup carries an external import bump. The per-package rebuild-and-diff in the fleet visit decides each one; nothing is bumped on a guess.

### 3. The AST-shaped rules — the plugin takes what one file's AST decides

Every rule in `tests/setupPolicy.ts` that decides from a single file's syntax moves to `configs/policy.ts`, which is the assignment `.claude/rules/workspace.md` § Policy instruments already makes. The moved set is the placement register (`export`, `type`, `function`, `class`, `data`, `constant`, `parser`, `factory`, `domain`) and the line-ending register (`split` before `trim`, `os.EOL` read, `EOL` import). `FUNCTION_DOMAIN_FOLDERS`, `CENTRAL_SOURCE_FILES`, `DATA_SOURCE_FILES`, `DATA_EXEMPT_FILES`, and `FUNCTION_SOURCE_FILES` move into `configs/policy.ts` as its own data, because that file may import nothing.

What stays in the sweep, text- or path-shaped, with no compiler at all: the suppression rule, which the law fixes there because nothing inside a file can suppress the sweep; the `.claude/rules/*.md` to `AGENTS.md` rule-map parity; the path-population rules over Windows reserved names, refused characters, trailing dots and spaces, and case-colliding siblings; the manifest `.sh` script rule; and the mirrored-test placement rules.

That is the load-bearing outcome of the whole plan: `tests/setupPolicy.ts` — the file every fleet package vendors — stops importing a compiler, which is the entire reason `@typescript/typescript6` was a planned dependency of every generated workspace.

Each moved rule ships with its `PolicyControl` entry and a control drawn from outside its membership rule, per the ROADMAP row this closes.

For the parse sites whose subject is generated text rather than a workspace file — `tests/guides.test.ts`'s helper lifting, `tests/src/core/templates.test.ts`'s `extractDeclarations` and `findParameters` — the reader becomes the `--api` surface over a scratch project: write the generated text into the scratch directory, open a project over it, take the `SourceFile` from `Program.getSourceFile`, and walk it with the `is*` guards and `Node.forEachChild` that `typescript/unstable/ast` publishes. One reader, exported from scaffold's Node-only test setup module, serves all of them and reuses one client across calls. `oxc-parser` is refused: it is a second source-language analyzer duplicating TypeScript, and it is an unrequested dependency.

`lsp/tests/setupConformance.ts`'s import walk has a different answer, because its subject is `src/**` files rather than generated text. Its protocol-family import ban is the same class of rule `.oxlintrc.json`'s `no-restricted-imports` overrides already carry per environment, so it moves there and the conformance test asserts the rule's presence. That moves the catch from `test` to `lint:check`, which is earlier and per-file.

### 4. Type-checking in tests — one mechanism

Both sites take `--api`, because both need a checker and a spawned `tsc --noEmit -p` gives none.

The generated distribution proof reads an installed declaration's value exports through `getSymbolAtLocation` → `getExportsOfModule` → `getAliasedSymbol` → `SymbolFlags.Value`, all of which the 7.0.2 `Checker` publishes. `exported.getName()` becomes `Symbol.name`, and the `Symbol` entry is renamed on import because the name shadows the global. `getPreEmitDiagnostics` becomes the union of `getConfigFileParsingDiagnostics`, `getSyntacticDiagnostics`, `getSemanticDiagnostics`, and `getProgramDiagnostics`; `flattenDiagnosticMessageText` disappears into `Diagnostic.text`. Each resolution driver (`node16`, `nodenext`, `bundler`) becomes a scratch `tsconfig.json` opened as its own project instead of a `createProgram` options literal.

`database/tests/setupServer.ts` takes the same shape. `readJsonConfigFile`/`parseJsonSourceFileConfigFileContent`/`ts.sys` become `API.parseConfigFile`. The two places that override `paths` and `noEmit` on a parsed options object (`checkGuideFences` at `setupServer.ts:136-145`, `deriveEntrySurfaces` at `296-299`) become a scratch `tsconfig.json` that `extends` the package config and adds those `paths`. The fence modules already live in a scratch directory, so the config joins them, and the configuration the fences are checked under becomes a file a reader can open.

### 5. Fences — `stripTypeScriptTypes` in `transform` mode, then a real module

Every fence transpile takes `stripTypeScriptTypes({ mode: 'transform' })`. The measurement covers the constructs the fences could carry, and `strip` mode refuses exactly the constructs the coding contract already forbids.

The CommonJS sites need more than a transpile swap, because stripping types emits no module transform. `tests/guides.test.ts` and `templates.test.ts`'s `driveClassifier` write the transformed source into their scratch directory as a uniquely named `.mjs` file and load it with `import(pathToFileURL(file).href)`. The returned namespace object replaces the hand-built `exports` record, and the unique filename gives each drive the module isolation `runInNewContext` gave it. `vm.SourceTextModule` is refused: it needs a process flag the Vitest projects do not set. A `data:` URL is refused: `.claude/rules/portability.md` fixes `pathToFileURL` as the way a `file:` URI is built, and encoding arbitrary transformed source into a URL is a step the test would have to get right for no gain.

`driveClassifier`'s injected globals (`dirname`, `existsSync`, `join`, `readFileSync`, `statSync`) become real imports the lifted module carries, taken from the same generated file the declarations came from.

`MINIMUM_NODE_VERSION` rises from `22.12.0` to `22.13.0`, the version that added `stripTypeScriptTypes`. `DEFAULT_ENGINES` derives from it, so `engines.node`, the bundler targets, and the documentation move with it.

### 6. Vue — drop `vue-tsc`, record the loss, name the trigger

`vue-tsc` cannot run on 7 at all, no 7-capable checker exists, and `APP_BROWSER_TYPESCRIPT_RANGE = '^6.0.3'` is a bridge in the exact sense the owner's instruction bans. So it goes, along with `vue-tsc` in `APP_BROWSER_DEV_DEPENDENCIES`, the range's spread in `blueprintToDevDependencies` (`compilers.ts:230`), and the `vue-tsc` branch in `blueprintToScripts` (`compilers.ts:320`). `check:app:browser` becomes `tsc --noEmit -p configs/app/tsconfig.browser.json`, and the generated `app/browser` gains an ambient `*.vue` module shim, which sits outside the policy sweep's parsed population.

State the loss plainly in the guide, in `.claude/rules/workspace.md`, and in `ROADMAP.md`, with the trigger that closes it. A generated Vue workspace's `check` no longer reads inside a `.vue` file at all. It loses template-expression checking — prop and attribute binding types at the call site, `v-model` argument types, slot prop types, event-handler and directive argument types, unresolved component tags — and it also loses type-checking of `<script setup lang="ts">` bodies, because a `declare module '*.vue'` shim gives `tsc` no view inside the file. What remains for that environment: oxlint over `.vue` files, and the real Chromium tests in the `app:browser` project, which are behavioural proof rather than type proof. The trigger is Volar reaching TypeScript 7's stable API at 7.1; at that release the shim, the paragraph, and the `tsc` script are replaced by `vue-tsc` again.

### 7. Order

`scaffold` and `probe` are written in parallel in their own checkouts, one writer each. `scaffold` publishes first, because a target that runs `repair` against the published `scaffold` gets the old vendored bytes back. `probe` re-pins `@orkestrel/scaffold`, runs `repair`, proves its own gates, and publishes second.

Then the fleet visit, one package at a time. Per package: re-pin `typescript` to `^7.0.2`; drop `@typescript/typescript6` and `vite-plugin-dts`; re-pin `@orkestrel/scaffold` and `@orkestrel/probe`; install; `repair`, which restores the compiler-free `tests/setupPolicy.ts`, the rule-carrying `configs/policy.ts`, and the `declarationBundle`-carrying `configs/helpers.ts`; regenerate `tests/distribution.test.ts`; point each `configs/src/vite.*.config.ts` at `declarationBundle`; run the gates; rebuild `dist/`; diff it against the published tarball; bump on a material diff. Packages carrying source work beyond the vendored pair: `database` (`tests/setupServer.ts`, `tests/setupServer.test.ts`), `lsp` (`tests/setupConformance.ts`), and `probe`, already done. Publish in catalog layer order derived from a freshly regenerated table.

### 8. Retirement

**Deleted:** `@typescript/typescript6` from `BASE_DEV_DEPENDENCIES`, from scaffold's manifest, from every fleet manifest, and from the guide paragraph at `guides/scaffold.md:1144-1146`. `loadWorkspaceModule`'s bridge fallback (`helpers.ts:432-457`), its `'typescript'` overload, its TSDoc, and `probe/guides/probe.md:212`, `:395`, `:459-472`. `bundleTypes.invokeOptions.typescriptCompilerFolder` and `guides/scaffold.md:1148-1156`. `APP_BROWSER_TYPESCRIPT_RANGE`, `vue-tsc`, and `guides/scaffold.md:1156-1162`. `vite-plugin-dts` from `DECLARATION_DEV_DEPENDENCIES`. `Toolchain`'s bridged-workspace paragraph. `ROADMAP.md:38-44`.

**Transformed:** probe's optional peer to `^7.0.2`. The receipt examples at `probe/guides/probe.md:624` and every fleet `guides/probe.md:598` to `typescript@7.0.2`. `MINIMUM_NODE_VERSION` to `22.13.0`.

**Struck as superseded:** `ROADMAP.md:76-90`, the per-target bridge-install row. Its whole subject is the bridge this campaign deletes; it is replaced by the fleet-visit row this plan writes.

**Satisfied by this plan's units:** `ROADMAP.md:45-50` (AST rules to the plugin), `:51-56` (fence transpile), `:57-65` (checker-level readers).

### Exit criterion

The campaign ends when each of these closes as implemented, repaired, retained, or intentionally excluded on evidence: no manifest in scaffold or the fleet declares `@typescript/typescript6`, `vite-plugin-dts`, or `vue-tsc`, and every `typescript` range reads `^7.0.2`; no source, test, config, or script imports the bridge or imports a compiler from the bare `typescript` specifier; probe answers a claim under 7.0.2 with a receipt naming `typescript@7.0.2` and the project digest the caller asked for; every `src`-publishing package rebuilds its declarations through `tsc` 7 with api-extractor and its gate chain is green; every package's rebuilt `dist/` has been diffed against its published tarball and the material movers have bumped and published in layer order; the guides, the rule files, and `ROADMAP.md` carry the Vue loss, its trigger, and the retired rows.

## Alternatives

**The language server instead of `--api` for probe's type stage.** It is protocol-stable where `--api` is a preview 7.1 replaces, and probe already drives an `@orkestrel/lsp` client for the lint stage, so the transport is familiar. It loses because it cannot name a project: the measurement shows an overlay under `src/core` judged against the root `tsconfig.json`, and no `--project` flag exists. Adopting it deletes `Claim.project` and leaves `Project.digest` with no resolved-options object to hash, so a verdict would be earned under a project the caller did not choose — the precise failure `Claim`'s own TSDoc says scoped projects exist to prevent. Reuse of a familiar transport does not buy back a deleted contract. It becomes the right answer only if `--api` is withdrawn before 7.1, and the recovery then is one more migration of a single class.

**`rolldown-plugin-dts` with `generator: 'tsgo'` instead of `tsc` 7 plus api-extractor.** It is the one component with primary-sourced TypeScript 7 support and it needs no 5.x compiler anywhere. It loses on a measured fact: `createGenerator` fixes `rootDir` to the tsconfig's own directory (`dist/index.mjs:325`), so a `configs/src/tsconfig.*.json` cannot drive it, and adopting it means a root-level tsconfig per environment against `.claude/rules/workspace.md`'s configuration authority. It is also an unrequested dependency, a second rollup engine beside api-extractor, and its README warns `export =` and `import x = require(…)` may not bundle correctly. It is the named fallback if api-extractor's bundled engine turns out to mis-parse `tsc` 7's declaration emit on some package.

## Constraints

## Refusals

## Measurements

## Units

Engine notes: the natural route for constraint-heavy, mechanical-precision units is Sol. The dispatch records the Sol bench dark, so each such unit runs on the Opus `implementer` with the substitution recorded in the routing ledger. Units whose load is API shape, naming, or documentation voice route to the Opus `implementer` on their own merit.

**U1 `policy-plugin`** — role `sol` / engine GPT-5.6 Sol; substituted to `implementer` / Opus 5 while the bench is dark.
Owns `/home/user/scaffold/configs/policy.ts`, `/home/user/scaffold/tests/setupPolicy.ts`, `/home/user/scaffold/tests/policy.test.ts`, `/home/user/scaffold/.oxlintrc.json`. Depends on nothing. Accepts when, cheap first: `tests/setupPolicy.ts` names no `typescript` specifier; `configs/policy.ts` declares no import; `npm run lint:check` exits 0; `npm run test:policy` exits 0 with each moved rule carrying a violating control that reports and a control drawn from outside its membership rule that does not; `npm run check` exits 0.

**U2 `declaration-bundle`** — role `sol` / Sol; substituted to `implementer` / Opus 5.
Owns `/home/user/scaffold/configs/helpers.ts`, `/home/user/scaffold/configs/src/vite.core.config.ts`, `/home/user/scaffold/configs/src/vite.server.config.ts`, `/home/user/scaffold/package.json`, `/home/user/scaffold/tests/config.test.ts`. Depends on nothing. Accepts when `vite-plugin-dts` appears in no manifest and no `configs/` file; `npm run build:src:core` and `npm run build:src:server` exit 0; the emitted `dist/src/core/index.d.ts` differs from the published tarball's rollup only in `import` becoming `import type` on external imports, under `diff -w` with comment lines dropped; `npm run test:config` exits 0.

**U3 `probe-typestage`** — role `sol` / Sol; substituted to `implementer` / Opus 5. Highest judgment load in the plan.
Owns `/home/user/fleet/probe/src/server/stages/TypeStage.ts`, `/home/user/fleet/probe/src/server/helpers.ts`, `/home/user/fleet/probe/src/server/factories.ts`, `/home/user/fleet/probe/src/server/types.ts`, `/home/user/fleet/probe/src/server/index.ts`, `/home/user/fleet/probe/src/server/Overlay.ts`, `/home/user/fleet/probe/src/core/types.ts`, `/home/user/fleet/probe/tests/src/server/**`, `/home/user/fleet/probe/guides/probe.md`, `/home/user/fleet/probe/package.json`. Off-limits: `/home/user/fleet/probe/tests/setupPolicy.ts`, `/home/user/fleet/probe/tests/policy.test.ts`, `/home/user/fleet/probe/tests/distribution.test.ts` — `repair` and the generator restore them. Depends on nothing to start; its gate run depends on U8. Accepts when no file under `src/` names `@typescript/typescript6`; the manifest's `typescript` peer reads `^7.0.2` and stays in `peerDependenciesMeta` as optional; `npm run check` exits 0; `npm run test:src:server` exits 0; a `prove` call against a workspace on 7.0.2 returns a receipt line carrying `typescript@7.0.2` and the named project's digest, with the control breaking at `type`, quoted verbatim in the report.

**U4 `proof-template`** — role `implementer` / Opus 5.
Owns `/home/user/scaffold/src/core/templates.ts` (the `tests.distribution.proof` block and the `dts` seeds) and `/home/user/scaffold/tests/distribution.test.ts`, `/home/user/scaffold/tests/src/core/templates.test.ts`. Depends on U2. Accepts when the template writes no `@typescript/typescript6` import; the proof generated for a `src: ['core']` blueprint typechecks under its own generated tsconfig; `npm run test:src:core` exits 0.

**U5 `scaffold-seeds`** — role `implementer` / Opus 5. Serialized after U4, which shares `templates.ts`.
Owns `/home/user/scaffold/src/core/constants.ts`, `/home/user/scaffold/src/core/compilers.ts`, `/home/user/scaffold/src/core/templates.ts` (config seeds), `/home/user/scaffold/guides/scaffold.md`, `/home/user/scaffold/ROADMAP.md`, `/home/user/scaffold/.claude/rules/workspace.md`, `/home/user/scaffold/.claude/rules/application.md`, `/home/user/scaffold/tests/src/core/constants.test.ts`, `/home/user/scaffold/tests/src/core/compilers.test.ts`. Depends on U4 and on the owner's Vue ruling. Accepts when `BASE_DEV_DEPENDENCIES` names no `@typescript/typescript6`; `DECLARATION_DEV_DEPENDENCIES` names no `vite-plugin-dts`; `APP_BROWSER_TYPESCRIPT_RANGE` and `vue-tsc` are absent; `blueprintToScripts` emits `tsc --noEmit -p configs/app/tsconfig.browser.json` for `app/browser`; `MINIMUM_NODE_VERSION` reads `22.13.0`; the guide and the two rule files name the lost checks and the trigger; `npm run test:src:core` and `npm run test:guides` exit 0.

**U6 `guides-fences`** — role `implementer` / Opus 5.
Owns `/home/user/scaffold/tests/guides.test.ts` and scaffold's Node-only test setup module. Depends on U4. Accepts when the file names no `@typescript/typescript6` import; the lift's negative control — a declaration name the generated proof does not carry — fails the lift; `npm run test:guides` exits 0.

**U7 `scaffold-gates`** — role `verifier` / Sonnet. Owns nothing; runs `format:check`, `lint:check`, `check`, `build`, `test` and reports exit codes.

**U8 `scaffold-release`** — Orchestrator-owned. The bump, the commit, and the publish, per `orkestrel-publish`.

**U9 `probe-gates`** then **`probe-release`** — `verifier` / Sonnet, then Orchestrator-owned. Depends on U8.

**U10 `database-readers`** — role `sol` / Sol; substituted to `implementer` / Opus 5.
Owns `/home/user/fleet/database/tests/setupServer.ts`, `/home/user/fleet/database/tests/setupServer.test.ts`. Depends on U8 and on `database`'s own visit having run `repair`. Accepts when neither file names the bare `typescript` specifier as a value import; the fence check and the entry-surface derivation both run against a scratch `tsconfig.json` extending the package config; `npm run test:setup` and `npm run test:guides` exit 0.

**U11 `lsp-imports`** — role `sol` / Sol; substituted to `implementer` / Opus 5.
Owns `/home/user/fleet/lsp/tests/setupConformance.ts` and `/home/user/fleet/lsp/.oxlintrc.json` if that file is package-owned. Depends on U8 and on the measurement naming whether `.oxlintrc.json` is vendored. Accepts when the protocol-family ban reports on a planted violating import under `src/` and reports nothing after its removal; `npm run lint:check` and `npm run test:conformance` exit 0.

**U12 `fleet-visit-<package>`** — role `builder` / Sonnet, one unit per package, one writer per checkout.
Owns that package's `package.json` and its `configs/src/vite.*.config.ts`. Off-limits: `tests/setupPolicy.ts`, `tests/policy.test.ts`, `configs/policy.ts`, `configs/helpers.ts`, `tests/distribution.test.ts` — restored or regenerated, never edited. Depends on U8 and U9; `database` and `lsp` also depend on U10 and U11. Accepts when `typescript` reads `^7.0.2`; `@typescript/typescript6` and `vite-plugin-dts` are absent; `scaffold audit` reports no vendored drift; `format:check`, `lint:check`, `check`, `build`, and `test` exit 0; and the rebuilt `dist/` diff against the published tarball is recorded with its command.

**U13 `fleet-gates`** — role `verifier` / Sonnet, one per slice of packages, reporting as each slice finishes.

**U14 `fleet-release`** — Orchestrator-owned. Layer order read from a freshly regenerated catalog table, published serially.

## Tensions

- `--api` over the language server for probe, accepting a preview surface to keep `Claim.project` meaningful. The objective lane can argue that protocol stability outweighs a contract the package could redefine.
- `declarationBundle` as a Vite plugin factory in `configs/helpers.ts`, chosen so the per-face rewrite keeps a home and `build:src:*` does not move. Test whether that file's "free of any dependency a core-only workspace does not declare" rule admits a module that reaches `@microsoft/api-extractor` at call time in an app-only workspace.
- The name `declarationBundle` against the sibling `outputBoundary`/`environmentBoundary` form, and against the collision with Rolldown's own vocabulary. `declarationRollup` is the alternative.
- The `--api` AST walk over a text scan for the generated-text lifts, against the cost of spawning a compiler in scaffold's own test sites. `templates.test.ts:532-538` argues for the parser; if `Program.getSourceFile` does not expose the statement text those lifts need, the choice inverts to a text scan over text scaffold itself writes and `format:check` pins.
- `Overlay`'s `sensitive` reading lost its source when `typescript.sys.useCaseSensitiveFileNames` disappeared. I recommend a runtime probe of the workspace root over a `process.platform` branch, per `.claude/rules/portability.md` § Host branching.
- Probe's `typescript` peer stays optional though every verdict needs the type stage, because a required peer forces an install into every consuming tree and the workspace-origin refusal already names the party who must act.
- Moving `lsp`'s protocol-family import ban into `.oxlintrc.json`, which changes the gate that catches it from `test` to `lint:check`.
- `MINIMUM_NODE_VERSION` to `22.13.0`, the floor the called API needs, rather than `22.18.0`, where type stripping is default-on.
- Striking `ROADMAP.md:76-90` outright rather than transforming it, on the reading that the break deletes its subject.

## Risks

1. **api-extractor's bundled 5.9.3 consuming `tsc` 7's declaration emit is measured on scaffold's core face alone.** Research C found no compatibility statement in either direction. Settle before the fleet visit by running U2's chain on `console`, `database`, and `mcp`, whose three-environment faces exercise the browser and server rewrites too, and record each rollup's diff against its published tarball.
2. **`tsc` 7's declaration emit does not proceed past type errors, and differs intentionally from 6's.** A package carrying a latent error that 6 tolerated at emit now fails its build. Settled by each package's own `build` in U12, which is why the diff step follows the build rather than replacing it.
3. **`--api` is a preview surface 7.1 replaces, and this plan puts probe's type stage, the generated proof in every fleet package, `database`'s setup, and scaffold's generated-text readers on it.** No evidence available today bounds that. The mitigation is structural: the generated proof comes from one template, so the 7.1 move is one scaffold release plus one fleet visit — the same shape as this campaign. Record the re-read obligation on each site.
4. **Each `--api` client spawns the native binary, and Vitest runs files in parallel.** A per-file client on a four-CPU container can miss deadlines the same file meets alone. Settle by running `test:distribution` on the largest package under a full contended run and reading the wall clock; take that reading yourself after the unit exits rather than making it a unit criterion.
5. **Whether `Program.getSourceFile`'s `RemoteSourceFile` exposes a statement's modifiers and its source text is unmeasured.** `canHaveModifiers` and `getModifiers` have no 7.0.2 counterpart, and `getText(source)` is not named in the absorb. `templates.test.ts`'s `findParameters` and `extractDeclarations` both depend on it. Settle with a probe that opens a scratch project over a generated `vite.config.ts` and prints an exported statement's modifiers and text before U4 and U6 are briefed.
6. **The Vue loss is larger than template checking.** With a `*.vue` shim, a generated app's `<script setup>` bodies go unchecked too. If the owner will not accept that, no option satisfies the instruction, and the honest position is that `app/browser` cannot be generated under a 7-only fleet until Volar reaches 7.1. This is a ruling, not a measurement.
7. **Whether `vite/client`'s ambient types already declare `*.vue`** decides whether the shim seed is needed at all. Settle by typechecking a generated `app/browser` under `configs/app/tsconfig.browser.json` with no shim.
8. **Whether `repair` restores `configs/src/vite.*.config.ts`** decides whether U12 is mechanical or carries a per-package edit. Settle by reading scaffold's host inventory before the fleet visit is briefed.
9. **`stripTypeScriptTypes` is Stability 1 and its output is documented as unstable across Node versions.** The fence sites assert on returned behaviour rather than on emitted text, so drift surfaces as a red test rather than a silent wrong answer. The binding consequence is the Node floor, which risk-free evidence already settles at `22.13.0`.
10. **The release is potentially a full-fleet wave.** If most `src`-publishing packages move materially, the publish runs in layer rounds under the serial-publish and upload-window rules, which is a schedule cost the plan carries rather than a design defect.
