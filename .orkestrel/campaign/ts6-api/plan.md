# Plan — remove the in-process TypeScript API while the fleet stays on 6.0.3

Reconciled 2026-09-05 from the subjective lane (`design-subjective.md`, `planner`, Opus 5) and the objective lane (`design-objective.md`, `reviewer`, Opus 5, the recorded substitution for the dark Sol bench), against `orchestrator-measurements.md`, the fleet inventory carried as `inventory-distillate.md`, and Grok's cleanup map in `cleanup-map-distillate.md`. Nothing in this plan is dispatched until the owner rules on the decisions at the end.

## The ruling

The compiler is a process this workspace runs, never a module this workspace imports. Every replacement uses a surface that `typescript` 6.0.3 and 7.0.2 ship alike, so the later move to 7 is one range in one manifest:

- the `tsc` command: `--noEmit -p`, `--pretty false`, `--showConfig`, `--incremental --tsBuildInfoFile`, `--declaration --emitDeclarationOnly --outDir`;
- the type system itself, expressed as a generated consumer module `tsc` checks;
- the parser and transformer `vite` re-exports (`parseSync`, `transformWithOxc`), which every workspace already declares through `BASE_DEV_DEPENDENCIES` and which the vendored `configs/helpers.ts` already drives;
- the oxlint JS plugin surface in the vendored `configs/policy.ts`;
- `@microsoft/api-extractor` with the engine it bundles.

The objective lane's correction stands over the brief: no text scan replaces a parser, because `.claude/rules/quality.md` § Instruments refuses the weaker instrument and the parser is already installed. The subjective lane's anchored scans and its `oxc-parser` alternative are struck, and no dependency needs the owner's request.

## What the reverts already closed

The cleanup landed before this plan, so the state every unit is briefed against is the reverted tree, gates green (`ledger.md`): scaffold's own `typescript` reads `^6.0.3` and seeds the fleet from it; `BASE_DEV_DEPENDENCIES` names no `@typescript/typescript6`; `APP_BROWSER_TYPESCRIPT_RANGE`, `typescriptCompilerFolder`, and the `ROADMAP.md` rows of the 7 move are gone; probe's peer is `^6.0.3` with no bridge loader. The objective lane's F1 and its decision-6 findings are satisfied by that landing.

## Decision 1 — probe's type stage runs `tsc` over a mirror

`TypeStage` keeps a mirror of the target workspace under `tmp/type/<pid>/`, refreshed by content digest with the walk `RuntimeStage.#snapshot` already runs, writes each draft and the test at its mirrored declared path, writes one scratch `tsconfig.json` per selected project that extends the caller's project and re-roots `rootDir`, `include`, `files`, and every `paths` target into the mirror, and runs `tsc --noEmit --pretty false -p <scratch> --incremental --tsBuildInfoFile <mirror>/<project>.tsbuildinfo` per selected project, exactly the selection `#inspect` makes today.

The mirror is the ruling because the brief's revision sibling cannot shadow: a draft at `src/core/greeting.probe-<rev>.ts` is checked as a second module while every importer reads the disk copy, which is the false green the stage exists to prevent (objective decision 1, R1). Writing at the declared path in the consumer's tree is refused as the data loss `RuntimeStage.#owned` prevents, and the objective lane's blockers on `src/**` pollution, on the `Draft` contract's "need not exist on disk", and on `rootDir` all close under the mirror: nothing is written outside `tmp/`, the workspace copy never moves, and the scratch project's own `rootDir` names the mirror (measured 2026-09-05: a scratch project outside the tree re-roots the core project and keeps incremental reuse, 566 ms then 402 ms).

The contract consequences are accepted and documented rather than worked around:

- `Issue.range` collapses to a point. `--pretty false` reports no extent, and `Issue`'s own TSDoc already names the zero-width range for a point-reporting tool; the sentence "spans the diagnostic's reported length" changes to state the point.
- `Project.digest` reads the `compilerOptions` member of `tsc --showConfig -p <caller's project>` alone, run against the workspace project and never the scratch one, canonicalized through the existing `computeDigest`. The value moves (string spellings and relative paths replace enum numbers and absolute paths), so every documented receipt moves with it, and the digest cannot drift with the mirror's file list.
- `resolveWorkspaceBinary(workspace, name)` gains a `command` parameter defaulting to `name`, because `typescript` publishes its binary under `tsc`; its `@example` changes with it.
- The spawn shape stays `process.execPath` with `typescript`'s `bin/tsc` JavaScript entry, per `.claude/rules/portability.md` § Processes.
- The verdict is the parsed diagnostic lines, never the exit code, which differs between the majors (2 on 6.0.3, 1 on 7.0.2, measured).
- `Overlay`'s `sensitive` option and `loadWorkspaceModule`'s `'typescript'` overload go; `#unblock` keeps the destroyed-stage refusal and `destroy` terminates the running child by process tree.
- `Toolchain.typescript` keeps its value and its mechanism; the guide's § Cost carries the measured cold and warm readings, and `PROBE_DEADLINE` stays at 30 000 ms pending M5.
- The Oxlint `initialize` deadline the whole probe suite misses on this host closes with this unit: the ts7 records traced it (2026-09-05, carried in `orchestrator-measurements.md`) to the type stage's synchronous program build holding the event loop past `LINT_DEADLINE` while `Probe.#arm` warms every stage at once, and a spawned `tsc` leaves the loop free. U7's acceptance adds the whole suite green on the idle host, taken by the Orchestrator after the unit exits.

## Decision 2 — the distribution proof lives in the type system

The generated proof imports the installed entry with `import * as entry`, writes the runtime's own `Object.keys` into a consumer module as a literal, and lets `tsc --noEmit` judge `const declared: Record<keyof typeof entry, true> = published`. `typeof entry` is the declaration's value namespace, so the type-only exclusion and the alias resolution the checker walk provided survive, and the value side comes from a real process, so the comparison stays between mechanisms that can disagree (objective R4 answered). The resolution drivers become one scratch `tsconfig.json` each, checked by the workspace's `tsc` from the consumer directory. The absent-subpath control stays the firing control.

`database`'s `checkGuideFences` becomes `tsc --noEmit -p` over a scratch `tsconfig.json` beside the fence modules, with the `paths` override as config keys. `deriveEntrySurfaces` and its classifiers read the entry barrels through `parseSync`: `export *` edges from the barrel, then each module's `ExportNamedDeclaration` with its `exportKind` and declaration kind. That keeps the type side visible, so the undocumented-type detection the subjective lane's emitted-declaration walk would have lost is kept, and the barrel rule in `.claude/rules/architecture.md` bounds the walk to `export *` edges, which the walk refuses to step past silently.

## Decision 3 — the AST rules become plugin rules, the lifts become parser reads

The placement and line-ending rules of `tests/setupPolicy.ts` move to `configs/policy.ts` as `policy/` plugin rules with `RuleTester` pairs in `tests/config.test.ts`: an invalid case named for the membership boundary it attacks and a valid case drawn from outside it. The registers (`CENTRAL_SOURCE_FILES`, `FUNCTION_SOURCE_FILES`, `DATA_SOURCE_FILES`, `DATA_EXEMPT_FILES`, `FUNCTION_DOMAIN_FOLDERS`, the ambient suffixes) get one home in `configs/policy.ts`, which imports nothing, and `tests/setupPolicy.ts` imports them from `../configs/policy.js`; a vendored file importing another vendored file resolves in every target. `.oxlintrc.json` enables the placement rules over `src/**` and `app/**` and the line-ending rules over `configs/**` as well, and adds `typescript` to the restricted imports of every population, which is the durable enforcement of the exit criterion (objective decision 6: nothing enforced it). The suppression, rule-map parity, path-population, manifest-script, mirrored-test, skill, and bridge rules stay in the sweep with no compiler.

The generated-text lifts in `tests/guides.test.ts` and `tests/src/core/templates.test.ts` (`extractDeclarations`, `stageDistributionClassification`, `findParameters`) and `lsp`'s `readForbiddenImport` read through `parseSync`: the declaration name, the export kind, the parameters, the return-type node, and the statement's `start`/`end` for the verbatim slice (measured 2026-09-05). `readForbiddenNode` keeps its role over the parser's import nodes and the dynamic `import()` calls. The formatter pinning the subjective lane accepted as a risk disappears with the scan.

## Decision 4 — fences transform through `transformWithOxc`

`transformWithOxc(code, path)` from `vite` replaces `transpileModule`; measured over an enum, a namespace with runtime code, a parameter property, and `import =`, it emits ESM the fences can load, so `MINIMUM_NODE_VERSION` stays at 22.12.0, no `engines.node` moves, and no bump follows from this decision. The `vm` sites become uniquely named scratch `.mjs` modules loaded through `import(pathToFileURL(file).href)`; `driveClassifier`'s injected globals become the real `node:fs` and `node:path` imports the generated proof carries, and the evaluated call list becomes a second generated module that imports the classifier and exports its answers.

## Decision 5 — declarations roll up through `tsc` and api-extractor

`vite-plugin-dts` goes. One vendored Vite plugin factory, `declarationRollup`, in `configs/helpers.ts` beside `outputBoundary` runs `tsc -p <project> --declaration --emitDeclarationOnly --noEmit false --outDir <scratch under dist/>` at `closeBundle`, writes the manifest the api-extractor Collector requires beside the emit, invokes api-extractor through a deferred `import()` inside the hook so an app-only workspace never evaluates it, applies the caller's `rewrite` to the rollup, and writes it. Its options are `project`, `types`, and `rewrite`. The `.d.cts` copy and the `build:src:*` scripts stay where they are.

This decision serves the both-majors constraint rather than the owner's sentence alone (objective F2): `vite-plugin-dts` runs on 6.0.3 today, and it is removed because it calls `createProgram` on the workspace's `typescript` and blocks the later move. api-extractor's bundled 5.9.3 stays in every publishing target's install graph; it is api-extractor's own engine, not this fleet's use of the `typescript` API, and the guide states that plainly. Every `src`-publishing package rebuilds and diffs `dist/` against its published tarball at its visit, and bumps only on a material diff; the `import type` movement seen under 7.0.2 is re-measured under 6.0.3 before anything is assumed.

## Decision 6 — order

Scaffold ships first, because `repair` against the published scaffold restores the old vendored bytes. Probe re-pins scaffold, runs `repair`, proves its gates, and ships second. Then the fleet visit, one package at a time in catalog layer order read from a regenerated table: re-pin `@orkestrel/scaffold` and `@orkestrel/probe`, drop `vite-plugin-dts`, install, `repair`, regenerate `tests/distribution.test.ts`, point the package-owned `configs/src/vite.*.config.ts` at `declarationRollup`, refresh the mirrored `guides/probe.md` and `guides/scaffold.md`, gates, rebuild, diff, bump on a material diff, publish. Every fleet `tests/distribution.test.ts` keeps working on 6.0.3 mid-visit, so the re-pin and the regeneration need not be atomic. `database` and `lsp` carry source units beyond the vendored pair.

## Decision 7 — the proposal's control path

`PROPOSAL.md` names the 6.0.3 compiler API (`ts.getJSDocCommentsAndTags`, `ts.displayPartsToString`, `ts.createProgram`) as the control its text-only scanner is measured against, in the sentence set Grok's map lists under "The proposal". The control becomes the `parseSync` comment reader: each exported declaration's leading block comment, attached by range, over the same population. The sentences move with it, and the constraint's first sentence states that no in-process compiler API is available on either major the fleet targets.

## Measurements

The taken readings sit in `orchestrator-measurements.md` with their dates. The following readings are owed before the named unit is briefed, each as an Orchestrator probe retained under `instruments/`.

| Reading | Owed before |
| --- | --- |
| M2 incremental reuse when the mirror refresh rewrites files and the scratch config's name changes, on 6.0.3 | U7 |
| M3 `tsc` exit and diagnostic shape for a malformed project, so `origin: 'workspace'` stays distinguishable from a candidate's error | U7 |
| M4 the `--pretty false` shape of a chained diagnostic and of a project-level diagnostic naming no file | U7 |
| M5 wall clock of one whole `prove` call against `PROBE_DEADLINE`, taken by the Orchestrator after U7 exits | acceptance of U7 |
| M8 `RuleTester` from `oxlint/plugins-dev` over TypeScript source and the node kinds a placement rule reads | U2 |
| M13 what the installed oxlint plugin context exposes to a rule: the file path, the source text, the comments | U2 |
| M10 the declaration chain under 6.0.3 on a browser face and a server face carrying the `core/index` rewrite, diffed against the published tarballs | U3 and every fleet visit |
| M11 the core `types: ['node']` override as api-extractor configuration; M12 a portable `build:src:*` command shape | U3 |
| M15 the diagnostic text `Record<keyof typeof entry, true>` produces for a missing member, an excess member, and a type-only name | U4 |
| M16 that a vendored or generated test may import `vite` under the vendored lint populations, and which `module` fields `parseSync` returns for static and dynamic imports | U5 |

## Units

Scaffold is one checkout, so U2 through U6 serialize; probe is a second checkout, so U7 runs beside them. Every nontrivial unit is audited by the subjective lane (`reviewer`) and the objective lane (`reviewer`, Opus 5, the recorded substitution while the Sol bench is dark) on numbered falsifiable claims drawn from the objective lane's claims 1 to 20, plus `checker` where the criteria are mechanical. Constraint-heavy units belong to Sol and run on the Opus `implementer` with the substitution recorded in `ledger.md`.

**U1 `declaration-baseline`** — `builder` authors the instrument; the Orchestrator runs it as a tracked command and retains the log. Owns one script under the Orchestrator's scratchpad. Accepts when the script records, for `abort`, `console`, `database`, and `mcp` and per published face, the `tsc --declaration --emitDeclarationOnly` exit under the checkout's 6.0.3, the api-extractor result, and `diff -w` of the rollup against the published tarball's rollup, each with its command. Settles M10 to M12 and the bump plan before U3 is briefed.

**U2 `policy-plugin`** — `implementer`, Opus 5 (Sol's unit). Owns `configs/policy.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `.oxlintrc.json`. Accepts, cheap first, when `tests/setupPolicy.ts` and `configs/policy.ts` name no compiler specifier; `configs/policy.ts` declares no import; each register exists in `configs/policy.ts` alone; `.oxlintrc.json` restricts `typescript` in every population; `npm run lint:check`, `npm run test:policy`, `npm run test:config`, and `npm run check` exit 0, with each moved rule carrying its `RuleTester` pair.

**U3 `declaration-rollup`** — `implementer`, Opus 5 (Sol's unit), after U2. Owns `configs/helpers.ts`, `configs/src/vite.core.config.ts`, `configs/src/vite.server.config.ts`, `tests/config.test.ts`. Accepts when `vite-plugin-dts` appears in no `configs/` file; api-extractor is reached only through a deferred import inside a hook; `npm run build:src:core` and `npm run build:src:server` exit 0; each rollup's `diff -w` against the published tarball is recorded with its command; `npm run test:config` exits 0.

**U4 `proof-template`** — `implementer`, Opus 5, after U3. Owns the `tests.distribution.proof` block and the `dts` seeds in `src/core/templates.ts`, and `tests/distribution.test.ts`. Accepts when the template writes no compiler import; the proof generated for a `src: ['core']` blueprint typechecks under its own project; a planted extra runtime key and a planted undeclared name each redden the declared-value assertion with the member named in the diagnostic, quoted verbatim; `npm run test:src:core` exits 0.

**U5 `generated-readers`** — `implementer`, Opus 5, after U4. Owns `tests/guides.test.ts`, `tests/src/core/templates.test.ts`, and scaffold's Node-only test setup module. Accepts when neither test names a compiler specifier; the parser reader fails the lift for a declaration the generated proof does not carry and reports a spelling a pattern would miss; each classifier drive returns its recorded answers from a scratch `.mjs`; every fence transforms through `transformWithOxc`; `npm run test:guides` and `npm run test:src:core` exit 0.

**U6 `scaffold-seeds`** — `implementer`, Opus 5, after U5. Owns `src/core/constants.ts`, `src/core/compilers.ts`, the config seeds in `src/core/templates.ts`, `package.json`, `guides/scaffold.md`, `ROADMAP.md`, `PROPOSAL.md`, `tests/src/core/constants.test.ts`, `tests/src/core/compilers.test.ts`. Accepts when `DECLARATION_DEV_DEPENDENCIES` and scaffold's manifest name no `vite-plugin-dts`; the seeded `vite.*.config.ts` templates call `declarationRollup`; the guide states the api-extractor engine, the zero-width type-stage range, and the `deriveEntrySurfaces` walk's bound; the proposal's control sentences name the parser; `npm run test:src:core` and `npm run test:guides` exit 0.

**U7 `probe-typestage`** — `implementer`, Opus 5 (Sol's unit), in the probe checkout beside U2 to U6. Owns `src/server/stages/TypeStage.ts`, `src/server/helpers.ts`, `src/server/types.ts`, `src/server/index.ts`, `src/server/Overlay.ts`, `src/core/types.ts`, `tests/src/server/**`, `guides/probe.md`, `package.json`. Off-limits: the vendored pair and the generated proof, which `repair` and the generator restore. Accepts when no file under `src/` names a compiler specifier, value or type; a draft that breaks a consumer of the shadowed path reports that consumer's diagnostic and a draft importing a sibling draft resolves to the sibling draft, each quoted verbatim; an abandoned inspection leaves the workspace's own gates reporting what they reported before; `npm run check` and `npm run test:src:server` exit 0; a `prove` call returns a receipt naming `typescript@6.0.3` and the named project's digest with the control breaking at `type`. Its whole-suite reading and M5 belong to the Orchestrator after it exits.

**U8 `scaffold-gates`, `probe-gates`** — `verifier`, Sonnet. Runs `format:check`, `lint:check`, `check`, `build`, `test`, and the release-mode distribution proof, and reports exit codes.

**U9 `scaffold-release`, `probe-release`** — Orchestrator-owned under `orkestrel-publish`, on the owner's go-ahead and credential.

**U10 `database-readers`** — `implementer`, Opus 5 (Sol's unit), after the releases and `database`'s `repair`. Owns `tests/setupServer.ts` and `tests/setupServer.test.ts`. Accepts when neither names a compiler specifier; the fence check runs against a scratch `tsconfig.json` a reader can open; `deriveEntrySurfaces` returns today's keyword set per entry and reports a planted export and a planted undocumented type; a barrel carrying any export form but `export *` is refused; `npm run test:setup` and `npm run test:guides` exit 0.

**U11 `lsp-imports`** — `implementer`, Opus 5 (Sol's unit), after the same releases. Owns `tests/setupConformance.ts` and `tests/setupConformance.test.ts`. Accepts when neither names a compiler specifier; the parser walk reports a planted forbidden import in each form (static, type-only, bare, `import =`, dynamic) and nothing after each removal; `npm run test:conformance` exits 0.

**U12 `fleet-visit-<package>`** — `builder`, Sonnet, one per package, one writer per checkout, after the releases (`database` and `lsp` also after U10 and U11). Owns the manifest, the package-owned `configs/src/vite.*.config.ts`, and the mirrored guide copies; the vendored pair, `configs/policy.ts`, `configs/helpers.ts`, `.oxlintrc.json`, and `tests/distribution.test.ts` are restored or regenerated, never edited. Accepts when `typescript` reads `^6.0.3`; `vite-plugin-dts` and `@typescript/typescript6` are absent from the manifest and the lockfile; `scaffold audit` reports no vendored drift; the gates exit 0; the rebuilt `dist/` diff against the published tarball is recorded with its command.

**U13 `fleet-gates`** — `verifier`, Sonnet, per slice, reporting as each slice finishes. **U14 `fleet-release`** — Orchestrator-owned, serial, in layer order from a regenerated catalog table.

## Routing ledger for the dispatch

| Unit | Role | Engine | Note |
| --- | --- | --- | --- |
| M2 to M16 | Orchestrator | — | probes retained under `instruments/` |
| U1 | `builder` | Sonnet | the Orchestrator runs the instrument |
| U2, U3, U7, U10, U11 | `implementer` | Opus 5 | Sol's units; substitution recorded while the Codex bench is dark |
| U4, U5, U6 | `implementer` | Opus 5 | API shape, naming, and guide voice |
| audits | `reviewer` ×2, `checker` | Opus 5, Opus 5, Sonnet | objective lane on Opus, the recorded substitution |
| U8, U13 | `verifier` | Sonnet | |
| U12 | `builder` | Sonnet | one per package |
| U9, U14 | Orchestrator | — | the owner's decision and credential |

## Exit criterion

The campaign ends when each of these closes as implemented, repaired, retained, or intentionally excluded on evidence:

- No manifest or lockfile in scaffold or the fleet names `@typescript/typescript6` or `vite-plugin-dts`, and every `typescript` range reads `^6.0.3`.
- No source, test, config, or script in scaffold or the fleet imports from the `typescript` specifier, value or type; the vendored `.oxlintrc.json` restricts it in every population, and one recorded command over every checkout reports no hit.
- Probe answers a claim on 6.0.3 with a receipt naming `typescript@6.0.3` and the named project's digest, with a control breaking at `type`, and its published declarations import nothing from a compiler.
- Every moved policy rule carries its `RuleTester` pair, and no register a moved rule reads exists in more than one file.
- Every `src`-publishing package rolls its declarations up through `tsc` 6.0.3 and api-extractor, its gates are green, its rebuilt `dist/` is diffed against its published tarball with the command recorded, and the material movers have bumped and published in layer order.
- The guides, `ROADMAP.md`, and `PROPOSAL.md` state what shipped: the zero-width type-stage range, the moved digest value, the `deriveEntrySurfaces` bound, api-extractor's own engine, and the parser control path.

## Risks

- **Plugin context.** If oxlint's plugin context exposes no file path (M13), the placement rules cannot move and decision 3 keeps them in the sweep over `parseSync` instead; the exit criterion is unchanged.
- **Warm reuse under the mirror refresh** (M2). If a refresh defeats reuse, each inspection pays the cold 4223 ms per project and a claim over several projects approaches the deadline; the mitigation is a refresh that rewrites only files whose digest moved.
- **The declaration diff** (M10). A material diff under 6.0.3 makes the fleet visit a publish wave in layer rounds under the serial-publish and upload-window rules; U1 tells the owner which it is before the work starts.
- **`Record<keyof typeof entry, true>` diagnostics** (M15). A proof whose failure names nothing is a proof nobody can act on; the probe before U4 decides the assertion's exact form.
- **Cost.** The type stage becomes process-bound; the measured warm inspection is near 1.1 s and the first is near 8.5 s; M5 confirms the deadline holds on a contended host.
- **The install graph.** api-extractor's bundled 5.9.3 stays; the guide states it so nobody reads the exit criterion as "no compiler in `node_modules`".

## Decisions for the owner

1. **Scope of a dependency's in-process use.** This plan removes `vite-plugin-dts` (decision 5) because it calls the compiler API on the workspace's `typescript` and blocks the later move to 7; the owner's sentence alone does not require it. Confirm, or strike U3 and the `configs/src/vite.*.config.ts` edits from every visit.
2. **Probe's published contract.** `Issue.range` becomes a point and `Project.digest` changes value, so a receipt minted before this change does not equal one minted after. Confirm.
3. **Publishing.** Every bump and publish in U9 and U14 waits for the owner's go-ahead and runs on the owner's credential; U1's reading names the packages that bump.

## Re-baseline of 2026-09-06, after the owner's rulings and the measurement round

The owner ruled: keep one declaration file per published face (with or without `vite-plugin-dts`), accept probe's contract change (`Issue.range` as a point, `Project.digest` from `--showConfig`), and publishing as recommended (each bump on the owner's go-ahead and credential). The round that followed settled every owed measurement except the timing rows that belong after U7 exits.

- **Decision 5, ruled on evidence.** `vite-plugin-dts` goes. Its emit calls `ts.createProgram` and `program.emit` in-process on the workspace compiler and falls back to the banned bridge when the compiler exposes no API (`dts-absorb-distillate.md`); the single-file rollup is api-extractor's own bundled engine and never the workspace compiler. U1 reproduced every face's rollup on 6.0.3 from `tsc --declaration --emitDeclarationOnly` plus a direct `Extractor.invoke`, line counts equal and every material difference the `import` → `import type` class (`orchestrator-measurements.md` § U1). The 7 chain was measured earlier (`tsc` 7.0.2 emit plus the same rollup), so the later move keeps this design unchanged. `rolldown-plugin-dts` is the alternative the owner would have to request; not adopted.
- **U3's recipe, fixed by U1.** `declarationRollup` emits with the workspace `tsc` (`process.execPath` and `typescript/bin/tsc`), then invokes api-extractor with `overrideTsconfig` carrying the face's own resolved `lib` and `types` (from `tsc --showConfig`; core adds `node`), `target` and `module` ESNext, `moduleResolution` bundler, `skipLibCheck`, `files: [entry]`, no `paths`, no `typescriptCompilerFolder`, `dtsRollup.untrimmedFilePath`, every report off; on a server or browser face it replaces the literal `@src/core` specifier (which `tsc` emits unrewritten and api-extractor keeps external) with the package name, which is the `rewrite` option's default. Passing the face's full options or pointing the lib folder at 6.0.3 breaks the bundled engine (`Unable to follow symbol`), so the plugin passes only that set.
- **U4's shape, fixed by M15.** The generated proof writes both directions — `const declared: Record<keyof typeof entry, true> = published` and `const surfaced: Record<keyof typeof published, true> = declared` — because the one-direction shape exits 0 on a runtime key the declarations lack. Each direction names the member in its TS2741, under `bundler`, `node16`, and `nodenext` alike.
- **U2's constraints, fixed by M8 and M13.** The CLI context gives a rule `context.filename` (absolute), `sourceCode.text`, `getAllComments()`, and a declaration's doc comment through `getCommentsBefore(node)`; `getJSDocComment` throws. `RuleTester` parses TypeScript but resolves a case's `filename` against oxlint's own package folder, so every moved rule keys on the path's suffix and its cases carry that suffix. `PolicyContext` gains `filename` and `sourceCode`.
- **U7's inputs, fixed by M2 and M3/M4.** Incremental reuse survives the mirror refresh (warm after a full re-copy equals warm with no change, so the buildinfo keys on content). The `--pretty false` shapes and the cross-major differences are in `m3m4-report.md`; the brief carries them.
- **Bump plan.** Every `src`-publishing package's rollup moves on its import lines when the plugin goes, so each bumps at its visit; U1 struck no exception.
- **M16** settled by evidence: a vendored or generated test may import `vite`.
- **Owed after U7 exits:** M5 (a whole `prove` call against `PROBE_DEADLINE` on the idle host) and the Orchestrator's solo re-run of M2.

## Carry list for U6 (roadmap rows the U2 rounds revealed)

- The policy readers: after the wiring reader's rename, `inspectPolicyConfiguration` and `inspectPolicyWiring` are two readers of one file whose names no longer divide the subject (the fixed-rule severity and ignore-pattern reading against the caller-supplied rule-and-population coverage reading); a successor ruling names them by question or merges them (`u2-fix-2-audit-subjective.md` F2).
- TSDoc first sentences on module helpers in `configs/policy.ts` and `tests/setupPolicy.ts` open with a noun phrase where `.claude/rules/typescript.md` fixes a third-person verb; rule whether the letter binds a one-line TSDoc on a module helper, then sweep (`u2-fix-2-audit-subjective.md` referral).

## Re-baseline of 2026-09-06 (evening), after U5's landing and the fleet scout

Every unit through U5 is satisfied; U7 is satisfied in probe (`d24de2e`) with its release-mode proof green (`u8-probe-distribution-verify-report.md`). The exit criterion is unchanged. What changes is which units run and in what order:

- **U8 `scaffold-gates`** is the U6 verifier's chain (`u6-verify-brief.md`) over the tree after the Orchestrator's tracked lockfile regeneration, because the tree that lands is the tree it ran over; no second sweep is scheduled before the pack.
- **U12 `fleet-visit-<package>` splits into two phases**, per `.agents/orchestration.md` § Fixing a dependency before it publishes. Phase A runs before any release: the Orchestrator packs scaffold from the landed U6 tree and installs the tarball into each checkout with `npm install --no-save` (`instruments/visits/swap-scaffold.sh`, the replaced range recorded per checkout), and a `builder` per checkout removes `vite-plugin-dts`, rewrites each package-owned `configs/src/vite.<face>.config.ts` to `declarationRollup`, deletes and regenerates the distribution proof through `repair`, and proves `format:check`, `lint:check`, `check`, `build`, and `test:distribution` (`instruments/visits/visit-brief-template.md`). Phase B runs after scaffold's and probe's releases: re-pin both ranges to the registry versions, `npm install` for the lockfile, the whole-suite gates (**U13** per slice), the rebuilt `dist/` diff against the published tarball, the commit, and the bump ruling. The manifest and lockfile stay uncommitted between the phases only in that they carry no `file:` pin; the phase A edits commit on the working branch and `main` moves at phase B.
- **Probe's visit runs first**, right after scaffold's pack and before probe's release, because probe is itself a fleet package whose proof and configs the head start regenerates; its release-mode proof re-runs over the regenerated proof.
- **U10 `database-readers` and U11 `lsp-imports`** run in their checkouts after phase A there, on the head start, because their acceptance (no `typescript` importer) is what the head start's lint restriction reddens until they land; their phase A visit records that red as the standing condition.
- **`codec`'s `node:vm` test helpers** are outside the exit criterion (the compiler API is the subject, not the `vm` module) and are left as they are; recorded here so the fleet sweep's `node:vm` hits read as known.
- **Releases (U9, U14)** stay the owner's decision and credential; nothing publishes until the owner says so, and phase B waits on that.

## Re-baseline (2026-09-07 02:26 UTC): phase A complete

- Phase A is complete on branches: every fleet checkout carries its visit commit, `lsp` carries U11 (`257a0ad`), `database` carries U10 (`b3012ea`), scaffold carries U5 and U6, probe carries U7. No `typescript` specifier remains at an import, `require`, or dynamic-import position in any package's `src`, `tests`, or `configs`; the compiler is reached as a process everywhere.
- Phase B (re-pin, lockfile, whole-suite gates, bump, publish in catalog layer order) now waits, per package, on that package's docs-parity convergence: the owner ruled that the TSDoc convergence rides this wave (`../docs-parity/rulings.md` § Ruling 5), so each package republishes once, after its guide, its doc blocks, and its `tests/guides.test.ts` converge under the new checks (D7.n). The scaffold and probe releases that head the wave wait on D3 to D6 in scaffold.
- The generated proof's `readonly module: boolean` member is a finding for D6's template correction (ledger row of the same date).
