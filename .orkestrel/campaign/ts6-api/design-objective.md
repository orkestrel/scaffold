<!-- workflow wf_0b65acda-d23, agent a55a702377594cadf, captured from journal.jsonl -->

**Lane held: objective** (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench). Design brief `/home/user/scaffold/tmp/units/ts6-api-design-brief.md`, performed as written: per-decision rulings, missing measurements, risks, then numbered falsifiable claims. No plan and no units — those are the subjective lane's. I ran no command and edited nothing.

---

## Decision 1 — Probe's type stage on the `tsc` process

**Permitted, and this is the route's one decisive advantage.** `tsc --noEmit -p <project>` judges the project the caller named. `Claim.project` and the root-versus-scoped contract at `/home/user/fleet/probe/src/core/types.ts:98-100` survive intact — the contract the language-server route deleted (`design-objective.md:9`). Measured on 6.0.3 and on 7.0.2 (`ts6-api/orchestrator-measurements.md:8-14`).

**Forbidden as briefed: the on-disk draft.** Four separate blockers, each citable.

- **The published `Draft` contract says the opposite.** `probe/src/core/types.ts:32-37`: `path` "need not exist on disk" and "The type and lint stages read the text from memory; only the runtime stage writes a file." The briefed mechanism contradicts both sentences.
- **A revision path does not shadow, it adds.** `buildRevisionPath` (`/home/user/fleet/probe/src/server/helpers.ts:654-659`) returns `src/core/greeting.probe-<revision>.ts`. A draft naming an existing file therefore becomes a second module while the original stays on disk. The test draft imports the declared path relatively (`types.ts:54`), so the test is checked against the old text and the candidate is checked in isolation. That is the false green the stage exists to prevent. `compilerOptions.paths` cannot repair it, because `paths` does not remap a relative specifier.
- **The semantics-preserving alternative is destructive.** Overwriting the declared path is the only way the test sees the draft, and probe already ships `overwriteFile` (`helpers.ts:220-228`) for that shape. Under an abort, a deadline, or a host kill it leaves candidate text in the consumer's `src/`. `RuntimeStage`'s sweep (`RuntimeStage.ts:728-736`) exists because that class of leftover happens.
- **`src/**` is inside the target's own gate populations.** `POLICY_SOURCE_GLOB` is `{app,src}/**/*.{cts,mts,ts,tsx}` (`/home/user/scaffold/tests/setupPolicy.ts:229`), `.oxlintrc.json:84-91` enables `policy/no-nested-functions` on `src/**` and `app/**`, and `format:check` sweeps the whole tree. A leftover reddens the target's `test:policy`, `lint:check`, and `format:check` — and a `probe-` filename is not a centralized kind file, which `.claude/rules/tests.md` § Probes already names as the failure. `RuntimeStage` escapes this by writing beside the declared **test** path under `tmp/probe/`, which those globs miss. Moving the drafts to `tmp/probe/` closes that hazard and opens another: `configs/src/tsconfig.core.json` sets `rootDir: ../../src/core` (`ts7/absorb-distillate.md:53`), so a scratch project extending it reports TS6059 for a file outside that root — the exact failure `rolldown-plugin-dts` produced (`ts7-break/orchestrator-measurements.md:85,90`). Neither location is free, and the plan must resolve the tension rather than pick a location.

**Forbidden: `Issue.range`'s end has no source under `--pretty false`.** That output carries `file(line,col): error TSnnnn: message` and no extent. `Issue`'s own TSDoc fixes the contract — "The type stage spans the diagnostic's reported length" (`types.ts:180-184`) — computed today from `diagnostic.length` at `TypeStage.ts:466-469`. Either the published contract changes and every consumer with it, or every range collapses to zero width and the documented sentence goes false.

**Forbidden as briefed: `Project.digest` from `--showConfig` whole.** `--showConfig` prints `files` beside `compilerOptions`; today the digest covers `parsed.options` alone (`TypeStage.ts:208`). A file-list-sensitive digest contradicts `Project.digest`'s own sentence ("the digest of that project's resolved compiler options", `types.ts:277-281`), and under decision 1 it is self-referential: writing a revision file into `src/core/` changes that project's `files`, so the digest read during an inspection differs from the digest read at rest and no receipt reproduces. Permitted over the `compilerOptions` member alone, canonically serialized. Even then the value moves — `--showConfig` prints string enum spellings and relative paths against today's numeric enums and absolute paths — so every documented receipt moves with it (`types.ts:244,322,340`; `probe/guides/probe.md:624`; every fleet `guides/probe.md:598`).

**Forbidden without a source edit: probe cannot resolve `tsc`.** `resolveWorkspaceBinary` keys the bin entry to the package name (`helpers.ts:546`), and its own `@example` records `resolveWorkspaceBinary(cwd, 'typescript')` throwing (`helpers.ts:531-532`). `typescript` publishes `bin.tsc`. The package-name/bin-key split that `design-objective.md:21` recorded as the language server's blocker now binds this route too.

**Permitted: the spawn shape.** Probe declares no `@orkestrel/process`, so `.claude/rules/portability.md` § Processes requires `process.execPath` with a JavaScript entry. `typescript`'s `bin/tsc` is a JavaScript entry at 6.0.3 and at 7.0.2, so one shape serves the constraint the brief selects for.

**What loses its source, and what does not.** `sys.newLine`, `sys.readDirectory`, `sys.getDirectories`, `getDefaultLibFilePath`, and `ScriptSnapshot` pass into the compiler process and need no replacement. `typescript.sys.useCaseSensitiveFileNames` does not: it feeds `Overlay`'s `sensitive` reading at `TypeStage.ts:160,361-363`, and it needs a runtime probe of the workspace root wherever an overlay survives.

**Prose that goes false.** The class TSDoc (`TypeStage.ts:28-43`) and `#unblock`'s rationale (`251-258`) describe resident language services and a synchronous per-candidate check. A spawned compiler is asynchronous, so the loop-holding reason is gone; keep the latch for teardown or delete it, and rewrite both blocks.

## Decision 2 — the generated proof and `database/tests/setupServer.ts`

**Forbidden: collapsing the value-export walk into a runtime `import()`.** The proof asserts `expect(driveRuntime(...)).toStrictEqual(readDeclaredExports(declaration))` at `/home/user/scaffold/src/core/templates.ts:1845,1857,1986-1987`. `driveRuntime` already **is** the runtime read: `ESM_DRIVER_SOURCE` at `templates.ts:1113-1118` does `Object.keys(entry).sort()`. Replacing the declaration side with a second runtime read compares the answer to itself, which `.claude/rules/tests.md` bans outright — "Never assert an implementation against itself… it reads exactly like a real one." The result is an assertion that cannot fail, and it deletes the claim the proof exists for. The plan must name the second mechanism that can still disagree with the runtime — the guide's parity surface, a committed fixture, or a generated consumer whose expected names come from neither runtime read — or state plainly that the "publishes what it declares, and no more" claim is dropped, in the proof's own prose.

**Permitted: the resolution drivers as scratch configs.** `RESOLUTIONS` (`templates.ts:1166-1185`) carries `moduleResolution`, `module`, and conditions alone; each expresses as config keys, one scratch `tsconfig.json` per driver — `node16`, `nodenext`, `bundler`. `compileConsumer` (`templates.ts:1518-1534`) becomes `tsc --noEmit -p`, and `getPreEmitDiagnostics` plus `flattenDiagnosticMessageText` become the parsed text.

**Not served at all: `database`'s surface derivation.** `deriveEntrySurfaces` (`/home/user/fleet/database/tests/setupServer.ts:276-334`) and the classifiers it drives — `shapeEntrySymbols`, `classifyEntryDeclaration`, `isTypeOnlyExport` (`172-267`) — need a checker, an alias graph, and `SymbolFlags`. `tsc --noEmit` supplies none of them. This is the largest unowned gap in decision 2, and the brief's sentence about "what each site loses" does not name it. The plan must say what replaces the derivation or that the guide parity it feeds changes shape.

**Permitted: `checkGuideFences`.** It reports diagnostics alone (`setupServer.ts:111-164`), so it moves to `tsc --noEmit -p <scratch>`, and the programmatic `paths` override (`136-145`) becomes scratch config keys as the brief says.

## Decision 3 — the AST-shaped rules

**The brief's premise is false, and correcting it changes the answer.** `/home/user/scaffold/configs/helpers.ts:2` reads `import { parseSync, transformWithOxc, Visitor } from 'vite'`, and `environmentAssetSources` (`configs/helpers.ts:446-534`) already drives `parseSync(path, transformed.code).program` through a `Visitor`. `vite` sits in `BASE_DEV_DEPENDENCIES` (`src/core/constants.ts:508`), and `configs/helpers.ts` is the vendored leaf that must resolve in every target, so that parser is declared in every workspace including a core-only one. No npm package is added and no owner request is needed. `AGENTS.md`'s ban on "a second parser or source-language analyzer to duplicate TypeScript, Oxlint, Vue, HTML, CSS, or Vite" does not reach Vite's own parser.

**Forbidden: a text scan at these sites.** `.claude/rules/quality.md` § Instruments states that a claim about declarations, call sites, or structure needs the compiler or a parser rather than a text search. `findParameters` carries the reason in its own comment (`/home/user/scaffold/tests/src/core/templates.test.ts:532-538`): "read off the TypeScript parser rather than off the text: the question is what a declaration carries, and a pattern reports on one spelling of it." `extractDeclarations` and `readDeclaredNames` (`415-442`) and `lsp`'s `readForbiddenNode` (`/home/user/fleet/lsp/tests/setupConformance.ts:473-504`) are the same class. Substituting a regex is adopting the weaker instrument the rule refuses.

**Permitted, with what does not travel named.** The placement rules move to `configs/policy.ts`. `PolicyNode` carries `type` and `range` alone (`configs/policy.ts:2-5`), so `getPolicyLine` (`setupPolicy.ts:356-359`) and `PolicyViolation.line` have no source there. Every register a moved rule reads — `CENTRAL_SOURCE_FILES`, `FUNCTION_SOURCE_FILES`, `DATA_SOURCE_FILES`, `DATA_EXEMPT_FILES`, `FUNCTION_DOMAIN_FOLDERS` (`setupPolicy.ts:128-194`) — acquires a second home, because `configs/policy.ts` may import nothing (`.claude/rules/workspace.md` § Configuration authority).

**Population gap, open.** `POLICY_PORTABILITY_SOURCE_GLOB` is `{src,app,configs}/**/*.ts` (`setupPolicy.ts:280`) while `.oxlintrc.json:84-91` enables the plugin rule on `src/**` and `app/**`. A moved line-ending rule needs a `configs/**` population, and `.oxlintrc.json` is vendored (`ts7-break/orchestrator-measurements.md:106`), so that declaration is a scaffold host-inventory change rather than a per-package one.

**It is a rewrite.** Every `POLICY_CONTROLS` row whose rule moves (`setupPolicy.ts:1983-2228`) is re-expressed as a `RuleTester` case. That corpus is the work.

## Decision 4 — fences

**The Node-floor raise may be unnecessary, and nobody has checked.** `transformWithOxc(code, path)` from `vite` (`configs/helpers.ts:2,459`) already transforms TypeScript to JavaScript, is declared in every workspace, and is already driven by a vendored leaf. Measure it against the fence corpus before moving `MINIMUM_NODE_VERSION`. If it serves, decision 4's whole cost disappears.

**If `stripTypeScriptTypes` is taken anyway, the floor is not one edit.** `MINIMUM_NODE_VERSION` (`src/core/constants.ts:482`) feeds `DEFAULT_ENGINES` (`:488`) for generated workspaces. Scaffold's own `engines.node` is `>=22.12.0` (`package.json:121`) and probe's is `^22.12.0 || >=24.0.0` (`/home/user/fleet/probe/package.json:138`). Neither derives from the constant; each is a separate hand edit, and the brief names neither.

**State the cost the brief omits.** `engines.node` narrows what a consumer may run. Raising it because a vendored **test** calls a Node API narrows every consumer for a reason that never reaches them. The alternative is a named conditional refusal in the vendored test under `.claude/rules/tests.md` § Test contract. Whichever is chosen, the guide states the narrowing.

**The CommonJS sites are not one site, and the module-URL answer is closed for one of them.** `driveClassifier` (`templates.test.ts:337-353`) injects `dirname`, `existsSync`, `join`, `readFileSync`, and `statSync` into the VM context; a real module loaded by URL receives no injected context. `tests/guides.test.ts:334-341` injects `exports` alone. The two sites take different repairs, and the `driveClassifier` repair changes what that test proves about the generated proof.

## Decision 5 — declarations

**Permitted under 6.0.3, and not forced by the owner's sentence.** `unplugin-dts` calls `createProgram` on the project's own `typescript`, which 6.0.3 publishes, so the shipped chain runs unchanged. What forces this decision is the brief's own both-majors constraint, not the instruction quoted at the top of the brief. Say which one the plan serves, because the difference is a full fleet visit.

**Constraint to state rather than assume away.** `@microsoft/api-extractor@7.59.0` declares `typescript: 5.9.3` as a hard `dependencies` entry (`research-c-report.md:19,22`), so every publishing package installs a 5.x compiler and runs its in-process API during the rollup. Any claim that the fleet holds no in-process TypeScript API is false about the install graph, whatever this campaign removes from our own sources.

**Unmeasured, and the largest gap in the decision.** `beforeWriteFile` is the only home of the `core/index` → `@orkestrel/<pkg>` rewrite on every server and browser face (`src/core/templates.ts:613-617,643-647`; `sweep-distillate.md:133-134`). The available rollup measurement covers scaffold's **core** face under **7.0.2** alone (`ts7-break/orchestrator-measurements.md:70-79`).

**`typescriptCompilerFolder: ''` is not an independent retirement.** Its stated reason is that the installed `typescript` ships no `lib.*.d.ts` at the 7 major (`templates.ts:567-571`). Under a 6.0.3 fleet that reason is absent, so the option is inert rather than wrong — and the seeds carry it while no fleet checkout has been regenerated to that seed (`sweep-distillate.md:137`). Rule on it explicitly.

**Bump consequence, already evidenced.** The one available diff shows external imports moving from `import` to `import type` (`ts7-break/orchestrator-measurements.md:76`). Under `.agents/orchestration.md` § What a bump obliges that is the material class. Plan for every `src`-publishing package bumping, and let a per-package rebuild-and-diff strike exceptions.

**Check the vendored-leaf rule before committing `declarationBundle` to `configs/helpers.ts`.** `.claude/rules/workspace.md` requires that file to be "free of any dependency a core-only workspace does not declare." `@microsoft/api-extractor` arrives only when `src` or `bin` is selected (`src/core/constants.ts:516-519`; `src/core/compilers.ts:224`). A top-level import fails in an app-only workspace; a call-time import does not. Name which form.

## Decision 6 — order

**The order rests on an unstated premise that is false today.** Scaffold's own `typescript` is `^7.0.2` (`/home/user/scaffold/package.json:115`), and `BASE_DEV_DEPENDENCIES.typescript` reads `manifest.devDependencies.typescript` (`src/core/constants.ts:507`). Keeping the fleet on 6.0.3 requires scaffold's own pin to move **down** to `^6.0.3` in the same change, or every workspace scaffold generates is seeded at 7. The brief names no unit that does this, and every downstream acceptance criterion is written against the wrong state without it.

**The same file drops the bridge.** `BASE_DEV_DEPENDENCIES['@typescript/typescript6']` (`constants.ts:504`), the `@remarks` above it that states the bridge's reason (`constants.ts:493-497`), and scaffold's own manifest row (`package.json:110`).

**`APP_BROWSER_TYPESCRIPT_RANGE` becomes inert.** Its whole job is lowering the shared pin to `^6.0.3` for a Vue workspace (`constants.ts:541-549`; `compilers.ts:228-230`). After the shared pin reads `^6.0.3` it lowers nothing, so the constant, its spread, and `ROADMAP.md:38-44` are struck as **satisfied**, not retired — and `vue-tsc` keeps working, so decision 6 of the earlier break campaign is void here.

**`ROADMAP.md:76-90` is the opposite campaign** — each target adding the bridge and raising `typescript` to `^7.0.2`. The owner's instruction inverts it. Strike it with its changed close condition on the record rather than silently. `ROADMAP.md:57-65` routes the checker-level readers to `typescript/unstable/sync`, which 6.0.3 does not publish, so that row is transformed rather than satisfied.

**Nothing enforces the exit criterion.** Caller extras pass through `audit`, `repair`, `catalog`, and `overwrite` unchanged, so a target that keeps `@typescript/typescript6` installed is reported by no instrument. Name the command that proves absence fleet-wide and where it lives.

**Unnamed step.** Every fleet `guides/probe.md` and `guides/scaffold.md` copy is a stale mirror (`sweep-distillate.md:111,117,120`), and `.claude/rules/documentation.md` requires refreshing a mirror rather than rewriting it. Each target's visit owes that refresh after scaffold and probe publish. The brief also names `database` and `lsp` as carrying source work beyond the pair; `probe` does too.

## Decision 7 — the proposal's TSDoc reader

**No mechanism is evidenced.** `getJSDocComment` and `getAllComments` are compiler and ESLint-context names. `configs/policy.ts` exposes `PolicyNode` with `type` and `range` (`configs/policy.ts:2-5`) and no comment or source-text reader anywhere in the file. Whether the installed oxlint's JS plugin context exposes comments or source text to a rule decides the whole route, and it is unmeasured. The `vite` `parseSync` route is the fallback that needs no plugin at all, and it reaches text a linter never sees.

---

## Missing measurements, before any unit can be briefed

**M1** Whether a scratch `tsconfig.json` that `extends` `configs/src/tsconfig.core.json` and declares its own `files` keeps or replaces the base's `include`, and where the base's relative `include` and `rootDir` resolve from. Read `tsc --showConfig -p <scratch>` on 6.0.3 and on 7.0.2. Decisions 1 and 2 both rest on it.

**M2** Incremental reuse with a moving root set. The recorded warm figures (454 ms to 576 ms) were taken over an unchanging file set. Measure the warm cost when each run adds and removes one file and the scratch config's name changes, with the buildinfo under `tmp/probe/`, on 6.0.3 and on 7.0.2.

**M3** `tsc` exit codes for a malformed project against a candidate's type error, on 6.0.3 and on 7.0.2, so the `workspace`/`malformed` refusal stays distinguishable.

**M4** The `--pretty false` text shape for a chained diagnostic and for a project-level diagnostic naming no file, so the parse rebuilds what `flattenDiagnosticMessageText` produced and keeps the origin split at `TypeStage.ts:446-458`.

**M5** Wall clock for one whole `prove` call: a root-project check and a scoped check for the case, and the same pair for the control. Compare against `PROBE_DEADLINE` (30,000 ms per stage inspection, `probe/src/core/constants.ts:94`) on a contended host, taken by the Orchestrator after the unit exits.

**M6** Whether `parseSync(name, source)` from `vite` returns a TypeScript AST for a `.ts` filename with no prior transform — export modifiers, a function declaration's return-type node, an arrow initializer's parameters, an import's specifier. `configs/helpers.ts` transforms first, so the untransformed path is unmeasured. Run it against the exact inputs `findParameters`, `extractDeclarations`, and `readForbiddenNode` read.

**M7** Whether that AST exposes a statement's own source text or a range a caller can slice. `extractDeclarations` and `stageDistributionClassification` lift `statement.getText(source)` verbatim (`templates.test.ts:404-405,420`).

**M8** Whether `RuleTester` from `oxlint/plugins-dev` accepts TypeScript source and reports on the node kinds a moved placement rule needs.

**M9** `transformWithOxc` over each construct the fence corpus can carry — an enum, a namespace with runtime code, a parameter property, `import =` — and over a CommonJS module transform, on the installed `vite`. This decides whether decision 4 raises the Node floor at all.

**M10** The declaration chain under 6.0.3 on a server face and a browser face carrying the rewrite — `console`, `database`, or `mcp` — each rollup diffed against its published tarball.

**M11** The core `overrideTsconfig.compilerOptions.types: ['node']` option (`sweep-distillate.md:132`) re-expressed as standalone api-extractor configuration.

**M12** The `build:src:*` script shape. The measurement needed "a package.json beside the emit, which the Collector requires" (`ts7-break/orchestrator-measurements.md:74`), and `.claude/rules/portability.md` § Scripts bars naming a `.sh` file, so the replacement stays a portable command.

**M13** Whether the installed oxlint's JS plugin context exposes source text and comments to a rule.

## Risks the subjective lane is likely to understate

- **R1** The disk write reads as a location choice. It is a published-contract break, a shadowing defect that produces the exact false green the stage exists to prevent, and a mutation of the consumer's `src/` that the target's own gates then report against the consumer.
- **R2** `Issue.range`'s end reads as a parsing detail. It is a documented contract with no source in the chosen output mode.
- **R3** `--showConfig` is treated as equivalent to `parseJsonConfigFileContent`. It is a different fact with different stability, and under decision 1 it is self-referential.
- **R4** Replacing the checker walk in the distribution proof reads as a capability loss. It is an assertion that can no longer fail.
- **R5** The brief states no parser is available. `vite` publishes one every workspace already installs, so the plan risks adopting a weaker instrument the rules forbid and a Node-floor raise nothing needed.
- **R6** Scaffold's own major. Every unit's acceptance criteria are drafted against a workspace whose `typescript` reads `^7.0.2` today.
- **R7** Cost. The type stage becomes process-bound, and the cold reading on 6.0.3 is 4,223 ms per invocation.
- **R8** The install graph. api-extractor's pinned 5.9.3 keeps an in-process compiler in every publishing target whatever this campaign removes.

## Numbered falsifiable claims the plan must survive

1. A candidate draft naming a path the workspace already holds is judged as that path's replacement, proven by a case that passes only where the draft's text replaced the file's and a control that reports the on-disk text's own error.
2. After an inspection is abandoned mid-flight — the host killed, the deadline fired — the target's `format:check`, `lint:check`, `test:policy`, and `check` report exactly what they reported before it started.
3. `TypeStage.inspect(subject, 'configs/src/tsconfig.core.json')` is judged against that project and not the root project, proven by a candidate that passes under the root project and fails under the scoped one.
4. Every `Issue.range` the new stage reports equals, for the same input, the zero-based UTF-16 start and end the 6.x stage reported, including a file carrying `\r\n` and a non-BMP character.
5. `TypeStage.resolve(project)` returns the same `Project.digest` before, during, and after an inspection that writes a draft into that project's source directory, and that digest changes when and only when the project's resolved compiler options change.
6. A malformed project raises `ProbeError` with `origin: 'workspace'` and `code: 'malformed'`, separated from a candidate's type error by something other than the diagnostic text.
7. Probe resolves and spawns the workspace's own compiler through a published helper whose `@example` matches what it does, on a workspace at 6.0.3 and on one at 7.0.2.
8. One whole `prove` call over a scoped project completes inside `PROBE_DEADLINE` on a contended four-CPU host, measured after the unit exits, with the cold first call recorded beside it.
9. The generated distribution proof still compares each installed entry's runtime exports against a list a mechanism that can disagree with the runtime produced, and deleting an export from the declaration reddens exactly that assertion.
10. `database`'s guide surface is still derived from what the entry barrels declare, or the guide states which derivation the package no longer performs, proven by a planted export the derivation must report.
11. Every rule moved out of `tests/setupPolicy.ts` carries a control whose name states its membership boundary and a control drawn from outside that boundary, and deleting the rule's report call reddens exactly that case.
12. `findParameters`, `extractDeclarations`, and `lsp`'s forbidden-import walk answer from a parser rather than a pattern, proven by an input whose spelling a pattern misses and whose declaration the parser reports.
13. No register a moved rule reads exists in two files; where one must, a test proves the copies agree.
14. Every fence the vendored and generated tests drive returns its recorded answer on the oldest Node the workspace's own `engines.node` admits, with no process flag added to the vendored Vitest configuration.
15. `MINIMUM_NODE_VERSION`, scaffold's own `engines.node`, and probe's own `engines.node` admit only Node versions on which every vendored and generated fence mechanism is available.
16. For every `src`-publishing package and every published face — including a server face and a browser face carrying the `core/index` → `@orkestrel/<pkg>` rewrite — the declaration chain produces a rollup that installs and resolves through that package's own exports map, proven by its `distribution` project under `--mode release`.
17. For each such package the rebuilt `dist/` against its published tarball is classified material or superfluous by `.agents/orchestration.md` § What a bump obliges, with the diff recorded and the `import` to `import type` class ruled explicitly and applied uniformly.
18. `BASE_DEV_DEPENDENCIES` seeds `typescript` at a 6 range and names no `@typescript/typescript6`, proven by generating a workspace and reading its manifest.
19. After the last target's visit, one named command run across the fleet reports no `@typescript/typescript6` in any manifest, lockfile, or source, and no source, test, config, or script importing a compiler from the bare `typescript` specifier.
20. Every guide, TSDoc example, and mirrored copy naming `typescript@6.0.3`, `@typescript/typescript6`, the resident language service, or `typescriptCompilerFolder` states what shipped, proven by the parity test and by executing each affected fence.

## Findings outside the decisions

**F1 — The owner's instruction and scaffold's own manifest disagree, and no decision owns it.** `/home/user/scaffold/package.json:115` declares `typescript ^7.0.2`, and `src/core/constants.ts:507` propagates that pin to every generated workspace. Until a named unit moves it to a 6 range, "keeping all on 6.0.3" is unmet at the source that seeds the fleet, and every downstream unit's acceptance criteria describe a state the tree does not hold.

**F2 — The brief's decision 5 and the owner's sentence are not the same scope.** The owner names "the in-process JavaScript API that we depend on from typescript". `vite-plugin-dts` runs unchanged on 6.0.3, so removing it is required by the brief's both-majors constraint and not by the instruction. The plan must rule explicitly on whether a dependency's in-process use is in scope. The answer changes the campaign's size by a full fleet visit, and it changes which packages bump.

VERDICT: FAIL none; outside the claims: F1, F2
