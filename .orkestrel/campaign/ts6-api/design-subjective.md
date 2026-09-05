<!-- workflow wf_0b65acda-d23, agent ad318c68ebc0c6768, captured from journal.jsonl -->

**Lane held: subjective** (`planner`, Opus 5). `Constraints`, `Refusals`, and `Measurements` are left empty for the objective lane.

## Design

### The shape of the whole change

One sentence fixes every decision below: **the compiler is a process this workspace runs, never a module this workspace imports.** Three surfaces carry all the work — `tsc` as a spawned command (`--noEmit`, `--showConfig`, `--declaration --emitDeclarationOnly --outDir`, `--incremental --tsBuildInfoFile`), the type system itself expressed as generated consumer modules `tsc` checks, and `node:module`'s `stripTypeScriptTypes`. Each exists in 6.0.3 and in 7.0.2, so the fleet's later move to 7 is one range in one manifest.

The load-bearing consequence: `tests/setupPolicy.ts` — the file every fleet package vendors — stops importing a compiler, and with it the reason `@typescript/typescript6` was ever a planned dependency of every generated workspace disappears.

Scaffold's own `typescript` returns from `^7.0.2` to `^6.0.3`. `BASE_DEV_DEPENDENCIES.typescript` reads `manifest.devDependencies.typescript` (`/home/user/scaffold/src/core/constants.ts:507`), so scaffold's own pin **is** the fleet's seed. Leaving scaffold on 7 leaves every generated workspace seeded at 7 while the owner asked for 6.0.3.

### 1. Probe's type stage on the `tsc` process

**Mechanism.** `TypeStage` keeps a mirror of the target workspace under `tmp/type/<pid>/`, refreshed by content digest, and runs `tsc --noEmit --pretty false -p <scratch> --incremental --tsBuildInfoFile <mirror>/<project>.tsbuildinfo` against it.

The mirror, not a revision sibling beside the declared path, is the decision this whole stage turns on. A candidate draft is a *replacement* for a workspace file: the test imports `'../../src/core/greeting.js'`, and a sibling draft imports `'./farewell.js'`. A draft written to `src/core/greeting.probe-<rev>.ts` is checked as its own file while every importer still reads the disk copy, so the case reports clean for a draft that breaks its consumers and a draft importing a sibling draft resolves to the sibling on disk. Shadowing on disk requires writing at the declared path, and writing at the declared path in the consumer's own tree is the data loss `RuntimeStage.#owned` exists to refuse. A mirror gives exact shadowing with nothing written outside `tmp/`.

Concretely, per inspection:

- Refresh the mirror from the workspace by content digest, reusing the walk and digest map `RuntimeStage.#snapshot` already runs (`/home/user/fleet/probe/src/server/stages/RuntimeStage.ts:713-726`). Each mirrored file sits at `<mirror>/<workspace-relative-path>`, so relative specifiers and the walk up to the workspace's `node_modules` both resolve unchanged.
- Write each `subject.files` draft and `subject.test` at its mirrored declared path, and restore the workspace copy over it as the inspection clears.
- Write one scratch `tsconfig.json` per selected project into the mirror. It `extends` the caller's project and overrides `rootDir`, `include`, `files`, and `paths` so every alias target names the mirror rather than the workspace.
- Run `tsc` per distinct selected project — the root project for the test, each candidate's inferred scoped project for its draft, exactly the selection `#inspect` makes today.
- Parse `path(line,col): error TSnnnn: message` into `Issue` records, strip the mirror prefix from the path and from the message through `relativeWorkspaceMessage`, and lower the 1-based line and column to the 0-based coordinates `Issue.range` fixes. A diagnostic naming no file keeps today's `origin: 'workspace'`, `path: project` branch.

**The mirror lives at `tmp/type/`, not under `tmp/probe/`.** `vite.config.ts` gives the `probe` project the `tmp/probe/**/*.test.ts` include, so a mirrored test under `tmp/probe/` is collected by the target's own runtime stage and by `test:bench`.

**`Issue.range` collapses to a point.** `tsc --pretty false` reports a start position and no extent, so `end` resolves to `start`. `Issue`'s own contract already names that value: "A tool that reports a point rather than a span, as a stack frame does, produces a zero-width range at that point" (`/home/user/fleet/probe/src/core/types.ts:179-183`). Document the loss on the type stage's row rather than inventing a width.

**`Project.digest` comes from `tsc --showConfig -p <project>`**, run against the caller's project rather than the scratch one, with the printed `compilerOptions` fed to the existing `computeDigest(workspace, value)`, which already rewrites absolute strings workspace-relative and sorts keys. The key order differs between majors (measured, 2026-09-05), so the canonical serialization is what makes the digest stable. **The digest value moves**: `--showConfig` prints string spellings where `parseJsonConfigFileContent` produced enum numbers, so every documented receipt example changes and a receipt minted before this change does not equal one minted after.

**What the published surface stops naming.** `probe/src/server/helpers.ts:4` and `stages/TypeStage.ts:3-11` are the only `src/` files importing a compiler, both type-only, and both go. `loadWorkspaceModule` keeps its name and its specifier parameter — loading an installed module from a target workspace is a real mechanism — and loses its `'typescript'` overload, its bridge fallback (`helpers.ts:432-457`), and its `@example` asserting `typeof typescript.createProgram === 'function'`. `resolveWorkspaceBinary(workspace, name)` gains a `command` parameter defaulting to `name`, because `typescript` publishes its binary under the key `tsc` and the helper's own `@example` at `helpers.ts:531-532` records the throw that blocks it.

**`#unblock` changes meaning and stays.** A spawned `tsc` is awaited, so the host's loop is free for the whole check and the yield is no longer what bounds the hold. The destroyed-stage refusal it also carries is still needed at each candidate boundary. The stage gains an ability it never had: `destroy` terminates the running child, so an inspection the coordinator abandons stops now rather than at the next boundary. Terminate by process tree on Windows, per `.claude/rules/portability.md` § Processes and executables.

**`Overlay`'s `sensitive` option goes with the stage that fed it.** Its only value came from `typescript.sys.useCaseSensitiveFileNames` and its only consumer was `TypeStage`. `RuntimeStage` mints its overlay with exact matching deliberately.

**Budget.** Measured on the four-CPU container, 2026-09-05: cold `tsc --noEmit -p` 4223 ms on 6.0.3, warm incremental 454 ms to 576 ms, `--showConfig` 97 ms. A typical inspection runs the root project and one scoped project warm, near 1.1 s; the first pays cold twice, near 8.5 s. `PROBE_DEADLINE` stays at 30 000 ms and the readings go in `guides/probe.md` § Cost. Constructor warming keeps its purpose: it builds each declared project's buildinfo so the first `prove` is warm.

**`Toolchain.typescript` keeps its mechanism and its value, `6.0.3`.** Its remarks paragraph about a bridged workspace (`probe/src/core/types.ts:237-240`) is deleted with the bridge. The peer becomes `^6.0.3 || ^7.0.0` with the `@typescript/typescript6` optional peer struck, and stays optional for the reason the guide already gives: the workspace-origin refusal names the party who must act.

**One vendored change probe depends on.** `RuntimeStage`'s own comment records that a file under `tmp/` is read by the target's `check` and `lint:check` (`RuntimeStage.ts:270-274`). A resident mirror is therefore visible to an agent running the target's own gates. Scaffold adds `tmp/` to the root `tsconfig.json` `exclude`, to `.oxlintrc.json`, and to `.oxfmtrc.json`, and every target receives it at `repair`. Probe's mirror is deleted at teardown and swept at boot by the pid rule, so a target on older vendored bytes is exposed only while a probe is resident.

### 2. The generated distribution proof, and `database`

**The type system replaces the checker.** The proof reads value exports today through `getSymbolAtLocation` → `getExportsOfModule` → `getAliasedSymbol` → `SymbolFlags.Value` (`/home/user/scaffold/src/core/templates.ts:1494-1514`) and compares them against the runtime keys a real process reports. Making both sides `Object.keys` would assert the implementation against itself, which `.claude/rules/tests.md` refuses. So the declared side moves into the type system, where `tsc --noEmit` alone can read it:

```ts
import * as entry from 'PACKAGE_SPECIFIER'
const published = { GREETING: true, createGreeter: true } as const
const declared: Record<keyof typeof entry, true> = published
```

`typeof entry` is the module's value namespace, so its keys are exactly the value exports and a type-only export never appears — the `SymbolFlags.Value` distinction recovered exactly, and alias resolution with it, because `typeof entry` already resolves what a re-export names. A declared value the runtime does not publish fails as a missing property naming itself; a runtime key the declaration does not carry fails as an excess property; a name the declaration exports as a type only fails where the generated module references it as a value. The failure text is a `tsc` diagnostic rather than a diffed list, and the diagnostic names the offending members.

The three resolution drivers become three scratch `tsconfig.json` files written into the throwaway consumer, each fixing `module`, `moduleResolution`, `target`, and `files`. The proof spawns the **workspace's** `tsc` with `-p <consumer scratch>`: resolution is decided by the consumer's directory, not by where the binary lives, and the consumer installs no compiler. The absent-subpath control the proof already carries survives unchanged and remains the firing control.

**`database/tests/setupServer.ts`.** `checkGuideFences` swaps cleanly: the programmatic `paths` override at `setupServer.ts:136-145` becomes a scratch `tsconfig.json` beside the fence modules that already live in that scratch directory, so the configuration the fences are checked under becomes a file a reader can open, and the check becomes `tsc --noEmit -p` over it.

`deriveEntrySurfaces` needs each export's keyword, which no runtime and no type expression reports. It takes a second `tsc` mode instead: emit declarations for the entry's project with `--declaration --emitDeclarationOnly --outDir <scratch>`, then walk `export * from './module.js'` from the emitted entry declaration and read each top-level `export declare class|function|const`, `export interface`, and `export type` line. The keyword the scan reads is the keyword `tsc` itself emitted, in one canonical spelling, over text `tsc` wrote — not a parse of authored source. The barrel rule in `.claude/rules/architecture.md` fixes every barrel as `export *` alone, so the walk has one form to follow. `isTypeOnlyExport` becomes the presence of `export type {` in that chain, which is the condition the current code throws on.

**What each site loses.** The proof loses nothing: value-export identity, alias resolution, and the type-only exclusion all survive. `database` loses detection of an exported type that no guide row documents, because a declaration emit names types but the guide-parity direction that catches an undocumented one needs the union of both sets and the type side is now read from generated text rather than from a checker. Record it as a documented limit on `deriveEntrySurfaces`, and name `oxc-parser` as the dependency the owner would have to request to close it.

### 3. The AST-shaped rules

**The placement and line-ending registers move to `configs/policy.ts` as `policy/` plugin rules.** The moved set is `export`, `type`, `function`, `data`, `constant`, `class`, `parser`, `factory`, `domain`, and the line-ending rules (`split` before `trim`, an `os.EOL` read, an `EOL` import from `node:os`). None of them needs source text: every field they read — the node kind, an identifier's `name`, a literal's `value`, a member's `property.name` — is already on `PolicyExpression` (`/home/user/scaffold/configs/policy.ts:8-27`). `PolicyContext` gains `filename`, which is what makes a file-name-keyed rule decidable.

**The registers get one home, and it is `configs/policy.ts`.** `CENTRAL_SOURCE_FILES`, `FUNCTION_SOURCE_FILES`, `DATA_SOURCE_FILES`, `DATA_EXEMPT_FILES`, `FUNCTION_DOMAIN_FOLDERS`, and the ambient-suffix list move there, and `tests/setupPolicy.ts` imports them from `../configs/policy.js`. `configs/policy.ts` may import nothing; nothing forbids another vendored file from importing it, and a relative import between files vendored byte-identical to every target resolves in all of them. That closes the drift the copy would have created.

**What stays in the sweep, with no compiler at all:** the suppression rule, which the law fixes there because nothing inside a file can suppress the sweep; the `.claude/rules/*.md` to `AGENTS.md` rule-map parity; the path-population rules over Windows reserved names, refused characters, trailing dots and spaces, and case-colliding siblings; the manifest `.sh` script rule; the mirrored-test placement rules; and the skill and bridge families.

**Each moved rule ships a `RuleTester` pair, and it is a rewrite.** `POLICY_CONTROLS` rows are physical fixtures written into a scratch workspace and run through `inspectPolicyWorkspace`; `RuleTester` takes in-memory source with a filename. Every moved row is re-expressed in `tests/config.test.ts`, which already imports `RuleTester` from `oxlint/plugins-dev`, as an invalid case named for the membership boundary it attacks and a valid case drawn from outside that boundary. Budget that rewrite as the unit's real work.

**Population.** `.oxlintrc.json` enables the placement rules over `src/**` and `app/**`, matching `POLICY_SOURCE_GLOB`, and the line-ending rules over `src/**`, `app/**`, and `configs/**`, matching `POLICY_PORTABILITY_SOURCE_GLOB`. Ambient declaration files stay outside every one of them, as `POLICY_AMBIENT_SUFFIXES` keeps them outside the sweep today.

**The generated-text lifts take an anchored scan, and the population is what makes it sound.** `tests/guides.test.ts:311-339` and `tests/src/core/templates.test.ts`'s `extractDeclarations`, `stageDistributionClassification`, and `findParameters` all read text **scaffold itself writes** from `ARTIFACT_TEMPLATES` and `format:check` pins with tabs, no semicolons, and a fixed print width. One exported reader in scaffold's Node-only setup module serves all of them: it finds each top-level declaration by an anchored start (`^export function NAME(`, `^export const NAME`, `^const NAME =`) and takes the block to the first `^}` at column 0, which the formatter guarantees is the closing brace of a top-level form because every nested brace is tab-indented. `canHaveModifiers`/`getModifiers` with `SyntaxKind.ExportKeyword` becomes `^export ` at column 0. `findParameters`'s membership — an exported top-level declaration returning `UserConfig` — becomes an anchored span reaching the `): UserConfig` token, which holds across the line breaks the formatter inserts in a long parameter list. The instrument's control is the one it already has: a name the generated proof does not carry must fail the lift.

**`lsp/tests/setupConformance.ts` keeps its rule and changes its reader.** `.oxlintrc.json` is vendored byte-identical, so a package-specific `no-restricted-imports` override cannot live there and the lint route is closed. `readForbiddenImport(source, name?)` keeps its signature and becomes a text scan; `readForbiddenNode(node: ts.Node)` is deleted with the type that gives it meaning. The scan reads module specifiers in the forms the walk covers today: an `import`/`export ... from '...'` statement anchored at column 0 and bounded so it cannot cross a quote — the multiline form `tests/src/core/templates.test.ts:491-493` already proves against formatter-wrapped imports — a bare `import '...'`, an `import x = require('...')`, and a `import('...')` call anywhere. Its weakness is stated plainly: a protocol-family name written inside a comment or a string literal under `src/` reports, which fails closed and is the safe direction.

### 4. Fences

`stripTypeScriptTypes({ mode: 'transform' })` replaces every `transpileModule` call. The measurement covers enum, namespace, parameter property, and `import =`; `strip` mode refuses exactly the constructs the coding contract already forbids.

The `vm` sites need more than a transpile swap, because stripping types performs no module transform. `tests/guides.test.ts:334-341` and `templates.test.ts`'s `driveClassifier` (`templates.test.ts:337-353`) write the transformed source into their scratch directory as a uniquely named `.mjs` file and load it with `import(pathToFileURL(file).href)`. The unique filename gives each drive the module isolation `runInNewContext` gave it, because the ESM cache keys on the URL.

`driveClassifier`'s injected globals — `dirname`, `existsSync`, `join`, `readFileSync`, `statSync` — become real imports the lifted module carries, taken from the generated proof the declarations came from. That is a strengthening, not a workaround: the proof imports exactly those names from `node:fs` and `node:path`, and the lift currently drops those statements and substitutes a context. The evaluated call list becomes a second generated `.mjs` that imports the classifier and exports its answers, so nothing is evaluated from a string.

`MINIMUM_NODE_VERSION` rises from `22.12.0` to `22.13.0`, the version that added `stripTypeScriptTypes`. `DEFAULT_ENGINES` derives from it, so `engines.node`, the bundler targets, and the documentation move with it, and probe's own `^22.12.0 || >=24.0.0` moves to `^22.13.0 || >=24.0.0`.

**Sequence this decision behind the declaration measurement.** `engines` ships inside every tarball, so raising the floor moves each package's published manifest and obliges a bump. If the 6.0.3 declaration diff is non-empty the fleet bumps anyway and the floor costs nothing extra; if it is empty, the floor is the sole bump driver for the whole fleet and the alternative under `Alternatives` becomes the cheaper path. Take the reading first.

### 5. Declarations

`vite-plugin-dts` goes. `tsc` 6.0.3 emits the declaration tree and `@microsoft/api-extractor` 7.59.0 rolls it up with the engine it bundles — which is api-extractor's own engine rather than a dependency of ours on any major, and is the engine every shipped rollup was already made with.

The two-step needs a home that keeps the per-face rewrite externalizing `core/index` to `@orkestrel/<package>` on the browser and server rollups. Script chaining loses that rewrite and a new `configs/` leaf is not permitted, so it becomes one vendored Vite plugin factory, **`declarationRollup`**, in `configs/helpers.ts` beside `outputBoundary` and `environmentBoundary`. At `closeBundle` it runs `tsc -p <project> --declaration --emitDeclarationOnly --noEmit false --outDir <scratch under dist/>`, writes the manifest beside the emit that the api-extractor Collector requires, invokes api-extractor, applies the caller's rewrite, and writes the rollup.

Its options are single words: `project`, `types`, `rewrite`. `rewrite` takes `(content: string) => string` and the plugin applies it to the final rollup alone, so today's path-matching regular expression inside `beforeWriteFile` disappears — the plugin knows which file it is writing.

```ts
declarationRollup({
	project: resolveWorkspacePath('configs/src/tsconfig.core.json'),
	types: ['node'],
})
```

**api-extractor is reached through a deferred `import()` inside the hook, never at module scope.** `configs/helpers.ts` is vendored byte-identical into every target including an app-only one that declares no `@microsoft/api-extractor`, and `.claude/rules/workspace.md` § Configuration authority requires every import there to resolve in all of them. An app-only workspace never calls `declarationRollup`, so a deferred import is never evaluated there.

**The name.** `declarationRollup` over `declarationBundle`: `rollup` is api-extractor's own word for the artifact, it avoids Rolldown's `bundle` vocabulary in a Vite plugin, and it reads as the noun phrase its siblings read as.

`bundleTypes.invokeOptions.typescriptCompilerFolder: ''` is deleted everywhere it appears — scaffold's `configs/src/vite.core.config.ts` and `vite.server.config.ts`, the seeds at `src/core/templates.ts:557-572`, `:604-612`, `:634-639`, and the guide paragraph at `guides/scaffold.md:1148-1156`. It existed only because `unplugin-dts` pointed that option at the installed `typescript` root; unset, api-extractor resolves library types against its own bundled compiler by documented default, identically on either major.

`build:src:*` scripts do not move and the `.d.cts` copy stays chained where it is.

**Bump consequence.** The one available diff — external imports reading `import type` in the new rollup against `import` in the shipped one — was taken under 7.0.2. Under 6.0.3 the emit may reproduce the shipped rollup byte for byte, because the shipped rollups were made by `unplugin-dts` driving each workspace's own 6.0.3 compiler. The measurement unit repeats the chain under 6.0.3 on `abort` and on `console`, `database`, and `mcp`, whose three-environment faces exercise the browser and server rewrites, and each package's own rebuild-and-diff at its visit decides its bump. Nothing bumps on a guess.

### 6. Order

Scaffold ships first, because a target running `repair` against the published scaffold gets the old vendored bytes back. Probe re-pins scaffold, runs `repair`, proves its own gates, and ships second. Scaffold's units serialize inside one checkout; probe's run in parallel in its own.

Then the fleet visit, one package at a time: re-pin `@orkestrel/scaffold` and `@orkestrel/probe`; drop `vite-plugin-dts` and, where a manifest declares it, `@typescript/typescript6`; install; `repair`, which restores the compiler-free `tests/setupPolicy.ts`, the rule-carrying `configs/policy.ts`, the `declarationRollup`-carrying `configs/helpers.ts`, `.oxlintrc.json`, and the `tmp/` exclusions; regenerate `tests/distribution.test.ts`; point each package-owned `configs/src/vite.*.config.ts` at `declarationRollup`; refresh the mirrored `guides/probe.md` and `guides/scaffold.md` copies, which the sweep records as already stale; run the gates; rebuild `dist/`; diff it against the published tarball; bump on a material diff; publish in catalog layer order read from a freshly regenerated table.

**One hazard the 7-major break carried does not exist here.** Every fleet `tests/distribution.test.ts` still calls `ts.createProgram` off the bare `typescript` specifier, and on 6.0.3 that keeps working. The re-pin and the regeneration therefore need not be one atomic step per target, and a target part-way through its visit still passes `prepublishOnly`.

`database` and `lsp` carry source work beyond the vendored pair. Every other package's visit is mechanical.

### 7. What the proposal's TSDoc reader becomes

`PROPOSAL.md` makes the TypeScript compiler API the **control** its text-only scanner is measured against, naming `typescript/unstable/ast`'s `getJSDocTags` and `typescript/unstable/sync`'s `Symbol.getDocumentationComment(checker)` (`PROPOSAL.md:410-415`), and constraint C12 rests on the same 7-only entries (`PROPOSAL.md:354-359`). Neither exists at 6.0.3, and both are the in-process API this campaign removes.

The sentence set that changes: the control clause at `PROPOSAL.md:411-415` and the first sentence of C12 at `:354-356`. The control becomes a `policy/` plugin rule reading the doc comment of each exported declaration over the same population, so the scanner is still measured against a second mechanism that can disagree with it, as `.claude/rules/tests.md` requires. C12's first sentence states instead that no in-process compiler API is available on either major the fleet targets, which strengthens the constraint rather than weakening it: the text-only scanner is now the only reader, and its control is a linter rule rather than a preview compiler surface.

### Exit criterion

The campaign ends when each of these closes as implemented, repaired, retained, or intentionally excluded on evidence:

- No manifest in scaffold or the fleet declares `@typescript/typescript6` or `vite-plugin-dts`, and every `typescript` range reads `^6.0.3`.
- No source, test, config, or script in scaffold or the fleet imports a compiler from any specifier, value or type, proven by one named command run across every checkout.
- Probe answers a claim under 6.0.3 with a receipt naming `typescript@6.0.3` and the digest of the project the caller named, with a control breaking at `type`, and its published declarations import nothing from a compiler.
- Every moved policy rule reports on a `RuleTester` invalid case named for its membership boundary and stays silent on a valid case drawn from outside it, and no register a moved rule reads exists in more than one file.
- Every `src`-publishing package rebuilds its declarations through `tsc` 6.0.3 and api-extractor, its gate chain is green, its rebuilt `dist/` is diffed against its published tarball with the command recorded, and the material movers have bumped and published in layer order.
- `MINIMUM_NODE_VERSION`, every derived `engines.node` range, and the bundler targets admit only Node versions on which every vendored and generated fence mechanism is available.
- The guides, the rule files, `ROADMAP.md`, and `PROPOSAL.md` state what shipped: the zero-width type-stage range, the `deriveEntrySurfaces` limit, the `readForbiddenImport` scan's failure direction, and the replaced control path.

## Alternatives

**Revision siblings beside the declared path instead of a mirror, for probe's type stage.** It reuses `buildRevisionPath` unchanged, writes far less, and keeps the ownership marker and pid-keyed sweep that `RuntimeStage` already proves. It loses on the contract: a draft at `src/core/greeting.probe-<rev>.ts` is checked as its own file while every importer still reads the disk copy, so a case whose draft breaks its consumers reports clean and a draft importing a sibling draft resolves to the sibling on disk rather than to the sibling draft. `Claim`'s whole subject is a candidate replacement for a workspace file, so a mechanism that cannot shadow answers a different question from the one the caller asked. The mirror keeps the ownership marker and the pid-keyed sweep — they move from a file name to a directory name — and pays a digest-keyed refresh whose cost the incremental readings already bound. Writing the draft at the declared path and restoring it afterwards shadows correctly and is refused: a killed host leaves a consumer's tracked source replaced by a draft, which is the data loss `RuntimeStage.#owned` exists to prevent.

**`tsc --noCheck` as the fence transpiler instead of `stripTypeScriptTypes`.** It uses a surface both majors ship, it needs no Node floor, and it therefore avoids moving `engines` in every package and the fleet-wide bump that follows. It loses on cost and on shape: it spawns a process per fence where `tests/distribution.test.ts` transpiles every fenced TSDoc example, it needs a scratch file per fence anyway, and it makes a documentation proof depend on the compiler this campaign is removing from every other site. Recommend `stripTypeScriptTypes`, and reopen this option only if the declaration measurement comes back empty under 6.0.3 — at which point the `engines` floor is the fleet's only bump driver and the trade inverts.

## Constraints

## Refusals

## Measurements

## Units

Routing note: constraint-heavy, mechanical-precision units belong on Sol. The dispatch records the Sol bench dark, so each such unit runs on the Opus `implementer` with the substitution recorded in the routing ledger. Units whose load is API shape, naming, or documentation voice route to the Opus `implementer` on their own merit. Scaffold is one checkout, so its units serialize; probe is a second checkout and runs beside them.

**U1 `declaration-baseline`** — role `builder` / engine Sonnet, authoring; the Orchestrator runs the instrument as a tracked command and retains the log.
Owns `/home/user/scaffold/instruments/declaration-diff.sh` under the Orchestrator's scratchpad. Depends on nothing. Accepts when the script emits, per package for `abort`, `console`, `database`, and `mcp` and per published environment: the `tsc --declaration --emitDeclarationOnly` exit code under the checkout's installed 6.0.3, the api-extractor result, and `diff -w` of the new rollup against the published tarball's rollup with comment lines dropped, each with the command that produced it. **This unit gates decision 4's sequencing and the whole bump plan; it runs before any other brief is written.**

**U2 `policy-plugin`** — role `sol` / GPT-5.6 Sol; substituted to `implementer` / Opus 5 while the bench is dark.
Owns `/home/user/scaffold/configs/policy.ts`, `/home/user/scaffold/tests/setupPolicy.ts`, `/home/user/scaffold/tests/policy.test.ts`, `/home/user/scaffold/tests/config.test.ts`, `/home/user/scaffold/.oxlintrc.json`. Depends on the plugin-context measurement under `Tensions`. Accepts when, cheap first: `tests/setupPolicy.ts` names no compiler specifier; `configs/policy.ts` declares no import; each register named in § 3 exists in `configs/policy.ts` alone; `npm run lint:check` exits 0; `npm run test:policy` and `npm run test:config` exit 0 with each moved rule carrying a `RuleTester` invalid case named for its membership boundary and a valid case drawn from outside it; `npm run check` exits 0.

**U3 `declaration-rollup`** — role `sol` / Sol; substituted to `implementer` / Opus 5. Serialized after U2, which shares `tests/config.test.ts`.
Owns `/home/user/scaffold/configs/helpers.ts`, `/home/user/scaffold/configs/src/vite.core.config.ts`, `/home/user/scaffold/configs/src/vite.server.config.ts`, `/home/user/scaffold/tests/config.test.ts`. Depends on U1's reading. Accepts when `vite-plugin-dts` appears in no `configs/` file; `configs/helpers.ts` reaches `@microsoft/api-extractor` only through a deferred import inside a hook; `npm run build:src:core` and `npm run build:src:server` exit 0; each emitted rollup's `diff -w` against the published tarball is recorded with its command; `npm run test:config` exits 0.

**U4 `proof-template`** — role `implementer` / Opus 5. Serialized after U3.
Owns the `tests.distribution.proof` block and the `dts` seeds in `/home/user/scaffold/src/core/templates.ts`, and `/home/user/scaffold/tests/distribution.test.ts`. Accepts when the template writes no compiler import; the proof generated for a `src: ['core']` blueprint typechecks under its own generated project; the generated proof's declared-value-export assertion reports a planted extra runtime key and a planted undeclared name, quoted verbatim in the report; `npm run test:src:core` exits 0.

**U5 `generated-readers`** — role `implementer` / Opus 5. Serialized after U4, which shares `templates.ts`.
Owns `/home/user/scaffold/tests/guides.test.ts`, `/home/user/scaffold/tests/src/core/templates.test.ts`, and scaffold's Node-only test setup module. Accepts when neither test file names a compiler specifier; the anchored reader fails the lift for a declaration name the generated proof does not carry; each lifted classifier drive returns the answers recorded today; `npm run test:guides` and `npm run test:src:core` exit 0.

**U6 `scaffold-seeds`** — role `implementer` / Opus 5. Serialized after U5, which shares `templates.ts`.
Owns `/home/user/scaffold/src/core/constants.ts`, `/home/user/scaffold/src/core/compilers.ts`, the config seeds in `/home/user/scaffold/src/core/templates.ts`, `/home/user/scaffold/package.json`, `/home/user/scaffold/tsconfig.json`, `/home/user/scaffold/.oxfmtrc.json`, `/home/user/scaffold/guides/scaffold.md`, `/home/user/scaffold/ROADMAP.md`, `/home/user/scaffold/PROPOSAL.md`, `/home/user/scaffold/tests/src/core/constants.test.ts`, `/home/user/scaffold/tests/src/core/compilers.test.ts`. Accepts when scaffold's own `devDependencies.typescript` reads `^6.0.3`; `BASE_DEV_DEPENDENCIES` names no `@typescript/typescript6`; `DECLARATION_DEV_DEPENDENCIES` names no `vite-plugin-dts`; `MINIMUM_NODE_VERSION` reads `22.13.0`; `tmp/` is excluded by the root project and by the format and lint configurations; the sentences named in § 7 carry the replaced control path; `npm run test:src:core` and `npm run test:guides` exit 0.

**U7 `probe-typestage`** — role `sol` / Sol; substituted to `implementer` / Opus 5. Highest judgment load in the plan. Runs in the probe checkout beside U2 through U6.
Owns `/home/user/fleet/probe/src/server/stages/TypeStage.ts`, `helpers.ts`, `types.ts`, `index.ts`, `Overlay.ts`, `/home/user/fleet/probe/src/core/types.ts`, `/home/user/fleet/probe/tests/src/server/**`, `/home/user/fleet/probe/guides/probe.md`, `/home/user/fleet/probe/package.json`. Off-limits: `/home/user/fleet/probe/tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/distribution.test.ts`, `configs/policy.ts`, `configs/helpers.ts` — `repair` and the generator restore them. Its gate run depends on the scaffold release. Accepts when no file under `src/` names a compiler specifier, value or type; the manifest declares no `@typescript/typescript6` row anywhere and its `typescript` peer stays optional; a case whose draft breaks a consumer of the shadowed path reports that consumer's diagnostic, and a draft importing a sibling draft resolves to the sibling draft, each quoted verbatim; `npm run check` exits 0; `npm run test:src:server` exits 0; a `prove` call returns a receipt carrying `typescript@6.0.3` and the named project's digest with the control breaking at `type`, quoted verbatim.

**U8 `scaffold-gates`**, then **`probe-gates`** — role `verifier` / Sonnet. Owns nothing; runs `format:check`, `lint:check`, `check`, `build`, `test` and reports exit codes.

**U9 `scaffold-release`**, then **`probe-release`** — Orchestrator-owned, per `orkestrel-publish`.

**U10 `database-readers`** — role `sol` / Sol; substituted to `implementer` / Opus 5.
Owns `/home/user/fleet/database/tests/setupServer.ts` and `setupServer.test.ts`. Depends on the scaffold and probe releases and on `database`'s own visit having run `repair`. Accepts when neither file names a compiler specifier; the fence check runs against a scratch `tsconfig.json` a reader can open; `deriveEntrySurfaces` returns the keyword set it returns today for each entry, with the emitted-declaration walk's control — an entry naming a symbol the emit does not carry — reported; the documented limit is stated on the helper; `npm run test:setup` and `npm run test:guides` exit 0.

**U11 `lsp-imports`** — role `sol` / Sol; substituted to `implementer` / Opus 5.
Owns `/home/user/fleet/lsp/tests/setupConformance.ts` and `setupConformance.test.ts`. Depends on the same releases and visit. Accepts when neither file names a compiler specifier; the scan reports a planted forbidden import in each form § 3 names and reports nothing after each removal; the false-positive direction is stated on `readForbiddenImport`; `npm run test:conformance` exits 0.

**U12 `fleet-visit-<package>`** — role `builder` / Sonnet, one unit per package, one writer per checkout.
Owns that package's `package.json`, its `configs/src/vite.*.config.ts`, and its mirrored `guides/probe.md` and `guides/scaffold.md` copies. Off-limits: `tests/setupPolicy.ts`, `tests/policy.test.ts`, `configs/policy.ts`, `configs/helpers.ts`, `.oxlintrc.json`, `tests/distribution.test.ts` — restored or regenerated, never edited. Depends on the scaffold and probe releases; `database` and `lsp` also depend on U10 and U11. Accepts when `typescript` reads `^6.0.3`; `@typescript/typescript6` and `vite-plugin-dts` are absent; `engines.node` matches the seeded range; `scaffold audit` reports no vendored drift; `format:check`, `lint:check`, `check`, `build`, and `test` exit 0; and the rebuilt `dist/` diff against the published tarball is recorded with its command.

**U13 `fleet-gates`** — role `verifier` / Sonnet, one per slice of packages, reporting as each slice finishes.

**U14 `fleet-release`** — Orchestrator-owned. Layer order read from a freshly regenerated catalog table, published serially.

## Tensions

- **Scaffold's own `typescript` returns to `^6.0.3`.** The alternative — leaving scaffold on 7.0.2 as living proof that every replacement is major-agnostic — is attractive and I refused it, because `BASE_DEV_DEPENDENCIES.typescript` reads scaffold's own manifest and would seed every generated workspace at 7 while the owner asked for 6.0.3. The 7-compatibility claim is carried by a recorded reading in the guide instead of by scaffold's pin. The objective lane can argue for decoupling the seed from the manifest.
- **The mirror over the revision sibling for probe's type stage.** I ruled the brief's prescribed placement unable to shadow, and paid a whole new mechanism for it. The objective lane can argue that shadowing is recoverable inside the revision-sibling placement through a scratch-project `paths` remap, which I did not measure and would not assert.
- **`tmp/type/` rather than `tmp/probe/`,** because the `probe` Vitest project's include collects a mirrored test file and `test:bench` collects it too.
- **`Issue.range` collapses to a point** under `--pretty false`, which the interface's own contract already admits but which no consumer has been told about.
- **`Project.digest` changes value** with the option spellings `--showConfig` prints, so a receipt minted before this change does not equal one after. I treated that as a documented consequence rather than as a reason to keep a second parser.
- **The registers move into `configs/policy.ts` and `tests/setupPolicy.ts` imports them.** `.claude/rules/tests.md` says to keep shared helpers within the vendored test set; `configs/policy.ts` is vendored too, so I read the import as permitted. The objective lane owns that reading.
- **`declarationRollup` over `declarationBundle`**, and the deferred `import()` of api-extractor as the way a vendored leaf keeps resolving in an app-only workspace.
- **`engines` is a published-surface change,** so raising `MINIMUM_NODE_VERSION` bumps every package. If U1's reading is empty, that single line is the fleet's only bump driver and the `tsc --noCheck` alternative becomes the cheaper path.
- **`Overlay`'s `sensitive` option is struck** with the stage that supplied its value, rather than kept behind a runtime probe.
- **`readForbiddenNode` is deleted** rather than reshaped, on the reading that a helper typed on a compiler node has no meaning without a parser.
- **`resolveWorkspaceBinary` gains a `command` parameter.** The alternative is a second helper for the one package whose bin key differs from its name.

## Risks

1. **Whether oxlint's JS plugin context exposes the linted file's path.** Every moved placement rule keys on the file name, and `PolicyContext` today declares `report` alone. If it does not, decision 3 collapses to a text scan over `src/**` and the campaign loses its central win. Settle with a probe over the installed `oxlint/plugins-dev` before U2 is briefed.
2. **Whether `tsc --showConfig` prints `paths` and the resolved file list in a form the scratch project can rewrite.** The measurement recorded the resolved `compilerOptions` and did not record `paths` or `files`. Both the digest and the mirror's alias rewrite depend on it. Settle with a probe against probe's own `configs/src/tsconfig.core.json` on 6.0.3 before U7 is briefed.
3. **Whether the mirrored refresh keeps the incremental buildinfo warm.** The measurement warmed the same paths across runs; a mirror refreshed per inspection changes modification times on every file it rewrites, and `tsc` keys reuse on those. If reuse is lost, each inspection pays the cold 4223 ms and a claim with several projects approaches the 30 000 ms deadline. Settle by running the mirror refresh and two consecutive checks under the deadline, on the host, after U7 exits.
4. **Whether api-extractor's bundled 5.9.3 consumes `tsc` 6.0.3's declaration emit for a package whose faces carry the `core/index` rewrite.** The only rollup measurement covers scaffold's core face under 7.0.2. U1 settles it across the browser and server faces of `console`, `database`, and `mcp` before any visit is briefed.
5. **Whether `Record<keyof typeof entry, true>` reports the members it must.** The design rests on TypeScript naming the missing and excess members in its diagnostic text rather than reporting an opaque assignability failure; a proof whose failure names nothing is a proof nobody can act on. Settle with a probe over an installed package before U4 is briefed.
6. **The `deriveEntrySurfaces` emitted-declaration walk assumes every barrel is `export *` alone.** The barrel rule fixes that, and a package that has drifted breaks the walk silently rather than loudly. The walk must refuse an emitted entry declaration carrying any other export form, rather than skipping it.
7. **The anchored generated-text reader is pinned by the formatter, and the formatter can change.** An oxfmt release that alters top-level brace placement or import wrapping turns the lifts red. The failure direction is a red test rather than a wrong answer, and the reader lives in one place, so the repair is bounded.
8. **The fleet visit may be a full publish wave.** If the 6.0.3 declaration diff is non-empty, or the `engines` floor moves, every `src`-publishing package bumps and publishes in layer rounds under the serial-publish and upload-window rules. That is a schedule cost the plan carries rather than a design defect, and U1 is what tells the owner which it is before the work starts.
9. **Nothing enforces the exit criterion's first clause today.** Caller extras pass through `audit`, `repair`, `catalog`, and `overwrite` unchanged, so a target that keeps `@typescript/typescript6` installed is reported by no instrument. The plan owes one named command run across every checkout, and a home for it, before acceptance.
