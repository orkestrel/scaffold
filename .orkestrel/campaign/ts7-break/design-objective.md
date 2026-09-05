<!-- workflow wf_52e3114b-d1c, agent a59f3153edcf0d7ae, captured from journal.jsonl -->

**Lane held: objective** (`reviewer`, Opus 5, recorded substitution for the dark Sol bench). Design brief `/home/user/scaffold/tmp/units/ts7-break-design-brief.md`, performed as written: per-decision rulings, missing measurements, risks, then numbered falsifiable claims. No plan, no units — those are the subjective lane's.

---

## Decision 1 — Probe's type stage

**Forbidden as measured: the language server.** `orchestrator-measurements.md:37,43` records the overlay attributed to the **root** `tsconfig.json`, not `configs/src/tsconfig.core.json`; `research-a-report.md:11,35,43` records no `--project` flag and no confirmed `initializationOptions` project field. `/home/user/fleet/probe/src/core/types.ts:98-100` states the contract that breaks: the root project "admits host globals the scoped projects remove and would report green where the gate reports red". A type stage that cannot pin the project produces exactly the false green the stage exists to prevent.

Second, harder blocker on the same route: `TypeStage.resolve` returns `Project {path, digest}` (`TypeStage.ts:123-125,198-210`) and the digest is computed from `parseJsonConfigFileContent` output (`TypeStage.ts:293-307,208`). The LSP surface exposes no config parse, so `Project.digest` — a required field of every `Verdict` (`probe/src/core/types.ts:296`) and a component of the receipt token (`types.ts:340`) — has no source. The route obliges probe to grow its own tsconfig parser with `extends` resolution.

**Permitted with named gaps: the `--api` surface.** Measured working end to end at ~60 ms with overlay, scoped project, positions, codes, and text (`measurements:45-68`). What it does **not** serve, each a unit of work nobody has costed:

- `Issue.range` needs zero-based UTF-16 line/character (`probe/src/core/types.ts:196-202`; `TypeStage.ts:466-470`). `Diagnostic` carries `pos`/`end` character offsets only — `research-a-report.md:19` states the API does not convert. Probe must own a conversion that matches the compiler's own line-break and code-unit counting. Unmeasured.
- `typescript.sys.useCaseSensitiveFileNames` (`TypeStage.ts:361-363`), `sys.newLine` (365-367), `sys.readDirectory`/`getDirectories` (321,323), `getDefaultLibFilePath` (345-347), `ScriptSnapshot.fromString` (416-419) have no 7 counterpart (`absorb-distillate.md:73`). `Overlay`'s `sensitive` option (`TypeStage.ts:160`) must be derived by probe on the host.
- `typescript@7.0.2`'s `lib/` ships no `lib.*.d.ts` and no `lib/typescript.js`; the compiler is the platform binary `@typescript/typescript-<platform>-<arch>` (`absorb:65`). A workspace installed with optional dependencies skipped, or on an unsupported platform, fails inside `getExePath`. That is a new `workspace`/`missing` refusal probe must raise and document; today no such case exists.
- The sync client reads and writes raw pipe file descriptors with `fs.readSync`/`writeSync` (`research-a:18`). `TypeStage.#unblock` (`TypeStage.ts:259-262`) exists because a synchronous check holds the host's loop across a whole inspection. A synchronous cross-process RPC per candidate reproduces that hazard and adds process latency to it. The surface that fits is `unstable/async` (`absorb:67`), and **no measurement of the async client exists at all**.
- `research-a:20` records Microsoft's own framing: 7.0 ships no API and 7.1 ships "a new (and different) API". Building probe's only type stage on `unstable/sync` accepts a rewrite at 7.1.

**Binary lookup blocks the LSP route independently.** `resolveWorkspaceBinary` (`probe/src/server/helpers.ts:535-562`) keys the bin entry to the package name, and its own `@example` at line 531-532 records `resolveWorkspaceBinary(cwd, 'typescript')` throwing. `typescript@7.0.2` publishes `bin.tsc` (`absorb:65`). Driving `tsc --lsp --stdio` needs a package-name/bin-key split the helper forbids by construction.

**Peer.** Today `peerDependencies.typescript` is `^6.0.3 || ^7.0.0`, optional, beside an optional `@typescript/typescript6 ^6.0.2` (`probe/package.json:117-136`). The peer is optional in the manifest and **required in behaviour**: `Probe.#version('typescript')` (`Probe.ts:96-97,642-653`) reads the installed manifest at construction and throws `workspace`/`missing` when there is none. A break to `^7.0.2` must either make the peer required or state in the guide that a workspace with no `typescript` is refused at construction. Separately, probe's own dev pin is `^6.0.3` (`probe/package.json:112`): under `#support` (`Probe.ts:688-700`) a `^7.0.2`-only peer makes probe's own suite refuse probe's own workspace unless both move in one change.

**Receipt.** `Toolchain.typescript` is the installed manifest's version (`Probe.ts:97`), so the token moves to `typescript@7.0.2` and the project digest moves with the option shape. Documented examples carrying the old token: `probe/src/core/types.ts:244,322,340`, `probe/guides/probe.md:624`, and every stale fleet copy at `guides/probe.md:598` (`sweep-distillate.md:110-112`).

## Decision 2 — Declarations

**Permitted, once, for one environment of one package.** `measurements:70-79`: `tsc` 7 emit plus api-extractor 7.59.0's bundled engine reproduces scaffold's core rollup.

**Forbidden: `rolldown-plugin-dts`.** `createGenerator` fixes `rootDir` to the tsconfig's directory (`dist/index.mjs:325`), measured fatal twice including with `cwd` at the workspace root (`measurements:85,90`). It is also an unrequested npm package, which `AGENTS.md` § Non-negotiable rules bars outright.

**Constraint the plan must state rather than assume away.** `@microsoft/api-extractor@7.59.0` declares `typescript: 5.9.3` as a hard `dependencies` entry (`research-c-report.md:19,22`). Every publishing package therefore installs a 5.x compiler. "TypeScript 7 only" is true of *our* declared pins and false of the install graph. Say it, or the owner's instruction is unmet as written.

**Missing measurements, in priority order:**

1. **The `server` and `browser` rollups.** Every fleet `vite.server.config.ts` and `vite.browser.config.ts` carries `beforeWriteFile` rewriting `core/index` to `@orkestrel/<pkg>` (`sweep:133-134`; `templates.ts:596-621,623-647`). Dropping `vite-plugin-dts` deletes the hook that rewrite lives in. No replacement mechanism is measured, named, or costed. This is the single largest gap in decision 2 and it affects `browser`, `console`, `database`, `indexeddb`, `lsp`, `mcp`, `middleware`, `ollama`, `process`, `router`, `sea`, `server`, `sqlite`, `terminal`, `test`, `toolbox`, `websocket`, `worker`, `workflow`, `probe`, and `scaffold`.
2. **The core `overrideTsconfig.compilerOptions.types: ['node']` option** (`sweep:132`) re-expressed as a standalone api-extractor configuration. Unmeasured.
3. **Any package other than scaffold**, and specifically probe, whose server rollup may still name `@typescript/typescript6` (`sweep:147`, recorded unknown).
4. **api-extractor 5.9.3 parsing tsc-7-emitted declarations for a package whose declarations are not scaffold's core.** `research-c:23,68` records this as unverified in either direction, and `research-c:38,40` records that tsc 7 declaration emit "differs greatly, intentionally" and does not emit past type errors as 6.x did.
5. **The `build:src:*` script shape.** The measurement needed "a package.json beside the emit, which the Collector requires" (`measurements:74`). Today the script is `vite build … && npm run copy …` (`probe/package.json:88-89`). The replacement is a multi-step chain that must stay a portable command (`.claude/rules/portability.md` § Scripts and packaging bars naming a `.sh` file). Unwritten.

**Bump consequence the plan must carry.** The one available measurement already shows a diff: five external imports read `import type` in the new rollup and `import` in the shipped one (`measurements:76`). Under `.agents/orchestration.md` § What a bump obliges, that is a token-and-declaration diff, which is the material class. `propagation-report.md:20` defaults every non-source package to "no bump unless `dist/` moves" and `:33,41` leaves the question open — that is the wrong default to plan from. Plan for every `src`-publishing package bumping and publishing in catalog layer order, and let a per-package rebuild-and-diff strike the exceptions.

## Decision 3 — The AST-shaped rules

**Permitted, and better instrumented than the brief implies.** The plugin already has a compiler-free control harness: `RuleTester` from `oxlint/plugins-dev` (`tests/config.test.ts:19,726-729`) with membership-named invalid cases (`config.test.ts:738-799`), and `inspectPolicyConfiguration` refuses an override that turns a `policy/` rule off (`config.test.ts:696-717`). Suppressibility is covered because the sweep keeps the `oxlint-disable` rule (`.claude/rules/architecture.md` § What the policy sweep proves), which is what `.claude/rules/workspace.md` § Policy instruments requires.

**What the ESTree surface forbids.** `PolicyNode` carries `type` and `range` only (`configs/policy.ts:2-5`). No source text, no `getText`. So `getPolicyLine` (`setupPolicy.ts:356-359`) and the `PolicyViolation.line` field (`setupPolicy.ts:39-44,501-513`) do not travel; oxlint reports its own location. Any rule reading a node's text — for example the `UserConfig` return-type read at `tests/src/core/templates.test.ts:548,556` — cannot move as written.

**It is a rewrite, not a move.** The sweep runs over in-memory `PolicySource` records (`setupPolicy.ts:33-36`, `inspectPolicyControl` at `1963-1980`) and over synthetic generated-workspace text (`GENERIC_POLICY_SOURCES`, `tests/policy.test.ts:64`). Oxlint lints files on disk. Every `POLICY_CONTROLS` row whose rule moves — for example the two `rule: 'function'` rows at `setupPolicy.ts:2206-2227` — must be re-expressed as `RuleTester` cases. Budget that, or the moved rules ship with no control and the ROADMAP row's own condition (`ROADMAP.md:48-49`) is unmet.

**Population gap.** `POLICY_SOURCE_GLOB` is `{app,src}/**` (`setupPolicy.ts:229`) and `.oxlintrc.json:83-91` enables `policy/no-nested-functions` on exactly `src/**` and `app/**` — aligned. `POLICY_PORTABILITY_SOURCE_GLOB` is `{src,app,configs}/**/*.ts` (`setupPolicy.ts:280`); a moved line-ending rule needs a `configs/**` population the plugin configuration does not declare.

**Duplication the plan must resolve.** `configs/policy.ts` may import nothing (`.claude/rules/workspace.md` § Configuration authority). Every register a moved rule reads — `CENTRAL_SOURCE_FILES`, `FUNCTION_SOURCE_FILES`, `FUNCTION_DOMAIN_FOLDERS` — is copied into it and acquires a second home that can drift. `AGENTS.md` § Instruction files ("give a rule one home") bites. Name the owner and the proof that the copies agree.

**The other three sites are not plugin work.** `tests/guides.test.ts:311-339` and `tests/src/core/templates.test.ts:373,416,540` parse *generated artifact text* that never reaches disk as a linted file. Only a written scratch project driven by `--api`, or a text scan, is available; `oxc-parser` is an unrequested dependency. `lsp/tests/setupConformance.ts:473-520` walks on-disk `src/**` and is reachable by a scan, but `readForbiddenImport` is a public exported helper with its own guide parity, so replacing the parser moves an exported contract.

## Decision 4 — Type-checking in tests

**The `--api` surface cannot serve the generated distribution proof as shaped.** Every documented entry runs through `parseConfigFile(file)` → `updateSnapshot({openProjects})` (`absorb:67`; `measurements:49-52`). The proof builds three programs from **options only**, with no tsconfig on disk, inside a throwaway consumer under the OS temp directory (`src/core/templates.ts:1152-1184`; `absorb:13`). There is no measured or documented "program from options" entry. The proof would have to write a tsconfig per resolution into the consumer and spawn a server per resolution, in every fleet package. Unmeasured, and the cost is per-package.

**`database/tests/setupServer.ts` is partly served and partly not.** Served: `Checker.getSymbolAtLocation`/`getExportsOfModule`/`getAliasedSymbol` (`setupServer.ts:197,321,324`; `absorb:67`). Not served: `classifyEntryDeclaration` and `isTypeOnlyExport` (`setupServer.ts:172-232`) apply `ts.isExportSpecifier`/`isNamedExports`/`isExportDeclaration`/`isTypeAliasDeclaration`/`isInterfaceDeclaration`/`isClassDeclaration`/`isFunctionDeclaration`/`isVariableDeclaration`/`isVariableDeclarationList` to `symbol.declarations`. Whether the `unstable/ast` guards apply to a `NodeHandle.resolve()` result over a remote source file is unmeasured (`absorb:67,78`). Second gap: `setupServer.ts:136-145` overrides `parsed.options.paths` **programmatically**; the `--api` surface takes options from the config file and has no documented per-call override.

**Spawning `tsc --noEmit -p` meets every constraint and cannot do the job alone.** It has no checker, so it cannot serve `deriveEntrySurfaces` (`setupServer.ts:276-334`) or the proof's `getExportsOfModule` walk. Decision 4 has no one-mechanism answer; the plan must split it per site and say which site loses which capability.

## Decision 5 — Fences

**Permitted for the ESNext transpiles.** `measurements:7-17` covers enum, namespace, parameter property, and `import =` in `transform` mode; `research-c:51` records Node documenting the `vm` use.

**The brief names one CommonJS site; there are at least two, and the second closes the easy option.** `tests/guides.test.ts:334-341` transpiles to CommonJS and drives the emit with `runInNewContext(compiled.outputText, { exports: classifier })`. `tests/src/core/templates.test.ts:337-353` (`driveClassifier`) does the same **and injects `dirname`, `existsSync`, `join`, `readFileSync`, `statSync` into the VM context**. An ESM data-URL `import()` cannot receive an injected context, so that option is closed for `driveClassifier`. `vm.SourceTextModule` needs `--experimental-vm-modules` on the Vitest runner — a workspace-wide change to a vendored configuration. The remaining option is rewriting the lifting so the lifted module imports what it needs, which changes what the test proves about the generated proof. Scaffold's own `tests/distribution.test.ts:430` is a third site (ESNext, served).

**Engines defect, concrete and checkable.** `stripTypeScriptTypes` was added in Node v22.13.0 (`research-c:45`). `MINIMUM_NODE_VERSION` is `'22.12.0'` (`src/core/constants.ts:482`), `DEFAULT_ENGINES` derives from it (`constants.ts:488`), and probe declares `"node": "^22.12.0 || >=24.0.0"` (`probe/package.json:138`). A vendored test calling it fails on the oldest Node the generated toolchain claims to support. Either the floor moves to `>=22.13.0` across scaffold and the fleet, or the fence transpile cannot use this function. `ROADMAP.md:51-56` names the probe and the Node minor but not this conflict.

**Stability.** Node documents the output as not stable across versions (`research-c:50`). A gate whose green depends on it can turn red on a Node patch with no repository change. Record that as an accepted risk or pin the runner.

## Decision 6 — Vue

**The evidence forbids keeping template checking.** `vue-tsc` crashes on the removed `./lib/tsc` subpath (`research-b-report.md:8,47`); the runtime-patch technique cannot port to a Go binary (`research-b:10,46`); `vue-tsgo` is archived and deprecated (`research-b:11,12`); `vite-plugin-checker` wraps `vue-tsc` and inherits the blocker (`research-b:29`). `research-b:51` states the net honestly: no option both runs on 7 only and keeps `vue-tsc` fidelity.

**The brief understates the artifact set.** This is not a guide edit. `.claude/rules/workspace.md` § Typechecking ("Use `vue-tsc` only for a scope containing `.vue` internals") and § Tooling ("Typechecker: `vue-tsc` only where Vue SFCs are checked"), and `.claude/rules/application.md` ("app/browser uses app/core contracts, Vue 3 when selected, an `index.html` entry, `vue-tsc`, and real Chromium tests") mandate it. `AGENTS.md` § Authority makes those normative over the guide. The break edits rule files.

**Blast radius is measured and small.** No fleet package selects `app/browser` (`ROADMAP.md:44`). The generator surface: `APP_BROWSER_TYPESCRIPT_RANGE` (`constants.ts:549`), its spread (`compilers.ts:228-230`), the `vue-tsc` seed (`constants.ts:538`), the `check:app:browser` script (`compilers.ts:317-322`), the guide paragraphs (`guides/scaffold.md:1156-1162`), and `tests/src/core/constants.test.ts`, which names the seeded set (`guides/scaffold.md:1142`).

**Unmeasured and larger than stated.** `tsc` cannot read `.vue` at all. A `declare module '*.vue'` shim checks `app/browser`'s `.ts` sources and leaves **every SFC's own `<script setup lang="ts">` block unchecked**, not merely the template. Nobody has run `tsc -p configs/app/tsconfig.browser.json` against a generated Vue workspace with such a shim and read what it reports. The guide sentence must state the real loss, not the smaller one.

## Decision 7 — Order

**Constraints the evidence fixes:**

- `BASE_DEV_DEPENDENCIES` reads scaffold's own manifest (`constants.ts:498-510`). Removing the `@typescript/typescript6` row obliges removing it from scaffold's own `devDependencies` in the same change. Scaffold's `typescript` is already `^7.0.2` (`sweep:55`).
- `@orkestrel/probe` sits in `BASE_DEV_DEPENDENCIES` (`constants.ts:500`), so **every** generated workspace holds probe as a devDependency. That settles `propagation-report.md:39`'s first unknown from source, and it makes probe's publish a prerequisite for every target's visit, not a subset's.
- Every fleet `tests/distribution.test.ts` still calls `createProgram` off `'typescript'` (`sweep:96`; `absorb:13`). The instant a target's `typescript` moves to 7 and before the regenerated proof lands, `ts.createProgram` is `undefined` and `prepublishOnly` fails at runtime rather than at typecheck. The re-pin and the regeneration are one step per target, never two.
- Scaffold's own `tests/distribution.test.ts:9` imports the bridge (`sweep:97`) and must move before scaffold can pass its own publish gate.

**Nothing enforces the exit criterion.** Caller extras pass through `audit`, `repair`, `catalog`, and `overwrite` unchanged (`guides/scaffold.md:1126-1130`), so a target that keeps `@typescript/typescript6` installed is not reported by any instrument. "No bridge anywhere" is currently an unverifiable claim. The plan must name the command that proves it fleet-wide and where that check lives.

**Unnamed step.** Fleet `guides/probe.md` and `guides/scaffold.md` copies are mirrors and are already stale (`sweep:111,117,120`). `.claude/rules/documentation.md` requires refreshing a mirror rather than rewriting it, so each target's visit owes a mirror refresh after probe and scaffold publish. Decision 7 omits it.

## Decision 8 — Retirement

- `loadWorkspaceModule` is published, re-exported from `probe/src/server/index.ts:2`, its `'typescript'` overload returns `typeof TypeScript` from `@typescript/typescript6` (`helpers.ts:410`), and its `@example` asserts `typeof typescript.createProgram === 'function'` (`helpers.ts:404-408`) — an executed guide fence. Deleting the bridge branch moves an exported signature, that fence, and three guide rows (`probe/guides/probe.md:212,395,459-472`). If the type stage stops loading a compiler in process, the `'typescript'` overload has no consumer and the function collapses to `'vitest/node'` alone; that shape ruling is the subjective lane's, and I refer it there.
- `Toolchain`'s remarks (`probe/src/core/types.ts:237-240`) describe the bridged workspace as the case the reading is held against, and lines 244, 322, 340 carry `typescript@6.0.3`. All move.
- **`typescriptCompilerFolder: ''` is not retired by the break.** Its reason is that the installed `typescript` ships no `lib.*.d.ts` at the 7 major (`templates.ts:567-571`; `guides/scaffold.md:1148-1155`) — the state the break makes universal. It retires only if decision 2 removes `vite-plugin-dts`. Decisions 2 and 8 are coupled; the plan must say so rather than listing the override as an independent retirement.
- ROADMAP rows `:45-50`, `:51-56`, and `:57-65` are the break's own work items, not retirements. Row `:38-44` is deleted by decision 6 **without its stated trigger ever firing** (`vue-tsc` supporting 7); record the changed close condition rather than striking the row silently. Row `:76-90` is superseded wholesale.

---

## Finding outside the decisions

**F1 — instrument debris in published source will redden the acceptance gate and has already contaminated the decision-2 baseline.** `/home/user/scaffold/src/core/` holds 13 untracked emitted declaration files: `constants.d.ts`, `parsers.d.ts`, `helpers.d.ts`, `shapers.d.ts`, `validators.d.ts`, `errors.d.ts`, `index.d.ts`, `factories.d.ts`, `cloners.d.ts`, `types.d.ts`, `Compiler.d.ts`, `compilers.d.ts`, `templates.d.ts` — the same count and set as the "13 .d.ts files" `measurements:73` reports from the api-extractor instrument. `/home/user/scaffold/src/core/index.d.ts` is semicolon-terminated with space indentation; `.oxfmtrc.json:4,8` sets `"semi": false` and `"useTabs": true`; `.gitignore:10-14` ignores `tmp` and `dist` and no `.d.ts` pattern; `npm run format:check` is `oxfmt --config .oxfmtrc.json --check .` over the whole tree (`src/core/compilers.ts:293`). Why it matters: the first unit dispatched into this checkout inherits a red `format:check` it did not cause, and `.agents/orchestration.md` § Writing concurrency rule 11 bars the Orchestrator's instruments from the subject tree. What right looks like: delete the 13 files, confirm `git status` is clean of them, and re-take any decision-2 reading whose emit ran in this tree, before a brief is written.

## Risks the subjective lane is likely to understate

- **R1** Treating the decision-2 rollup as reproducing the shipped one. The only measurement covers one environment of one package and already differs.
- **R2** Planning a "vendored-and-generated, no bump" fleet pass. The available evidence points the other way.
- **R3** Calling decision 3 a move. The control corpus is the work.
- **R4** Treating decision 5 as one CommonJS site with a data-URL answer. `driveClassifier` closes that answer.
- **R5** Treating decision 6 as a documented loss. It is a rule-file change plus an unmeasured, larger loss.
- **R6** Treating `unstable/sync` as durable enough to carry probe's only type stage against Microsoft's stated 7.1 replacement.
- **R7** Writing an exit criterion no instrument can check.

## Numbered falsifiable claims the plan must survive

1. Under the chosen type-stage mechanism, `TypeStage.inspect(subject, 'configs/src/tsconfig.core.json')` is judged against that project and not the root `tsconfig.json`, proven by a candidate that passes under the root project and fails under the scoped one.
2. `TypeStage.resolve(project)` returns a `Project.digest` derived from the resolved compiler options of the named project, with no second tsconfig parser owned by probe outside the mechanism the stage already uses.
3. Every `Issue.range` the new stage reports equals, for the same input, the zero-based UTF-16 line and character the 6.x stage reported — including a file containing `\r\n` and a non-BMP character.
4. A workspace whose install skipped optional dependencies, or whose platform has no `@typescript/typescript-<platform>-<arch>` build, receives a `ProbeError` with `origin: 'workspace'` and a code the guide documents, not an unhandled fault.
5. A `probe` release whose `typescript` peer is `^7.0.2` passes its own `prepublishOnly` with its own `devDependencies.typescript` at `^7.0.2` and no `@typescript/typescript6` row anywhere in its manifest or lockfile.
6. For every `src`-publishing fleet package and every published environment — including a `server` and a `browser` face carrying the `core/index` → `@orkestrel/<pkg>` rewrite — the new declaration chain produces a rollup that installs and resolves through the package's own exports map, proven by that package's `distribution` project under `--mode release`.
7. For each such package, the rebuilt `dist/` compared against its published tarball is classified material or superfluous by the rule in `.agents/orchestration.md` § What a bump obliges, with the diff recorded; the `import`→`import type` class is ruled once, explicitly, and the ruling is applied uniformly.
8. Every rule moved from `tests/setupPolicy.ts` to `configs/policy.ts` carries a `RuleTester` invalid case whose name states its membership boundary and a valid case drawn from outside that boundary, and deleting the rule's report call reddens exactly that case.
9. No register a moved rule reads exists in two files; where one must, a test proves the copies agree.
10. `tests/guides.test.ts` and `tests/src/core/templates.test.ts` drive the lifted classifiers to the same recorded answers as today, on a Node version at the workspace's declared `engines.node` floor, with no `--experimental-vm-modules` flag added to the vendored Vitest configuration.
11. `MINIMUM_NODE_VERSION` and every dependent `engines.node` range admit only Node versions on which every vendored and generated test's fence mechanism is available.
12. A generated workspace selecting `app/browser` passes `npm run check` under `typescript@^7.0.2`, and its guide states which checks that workspace no longer receives — naming SFC script blocks as well as templates — with the statement proven by a fence or a test rather than asserted.
13. After the last target's visit, a single named command run across the fleet reports no `@typescript/typescript6` in any manifest, lockfile, or source, and no `typescript` range naming a major below 7.
14. Every guide, TSDoc example, and mirrored copy naming `typescript@6.0.3`, `@typescript/typescript6`, `vue-tsc`, or `typescriptCompilerFolder` states what shipped, proven by the parity test and by executing each affected fence.

VERDICT: FAIL none; outside the claims: F1
