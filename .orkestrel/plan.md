# Fleet wave of 2026-10-29: scaffold re-pin and rule realignment

## Goal

Publish every catalog package on the scaffold release this plan names in § Scaffold pin, with every `@orkestrel` dependency at the highest version the registry serves, each package realigned to the rules scaffold carries from 0.0.107 to that release.

## Exit criterion

- Every package in the catalog table of `.claude/agents/orkestrel.md` is published at a registry-confirmed version, pinned to the scaffold release § Scaffold pin names, with every `@orkestrel` range at the caret of the version the registry served when its layer ran.
- Every package passes `format:check`, `lint:check`, `check`, `build`, and `test`, and its release chain in a fresh clone, with no suppression directive.
- Every repository is on a clean `main`, level with `origin/main`.
- The catalog table carries the served versions, and scaffold is released when its catalog or canon changed.
- Every deferral in § Deferred names an owner and a trigger.
- The `orkestrel-debrief` round has run on the wave and landed its lessons in scaffold.

## Repositories

Each package is the repository `https://github.com/orkestrel/<name>` checked out beside scaffold as `<name>`. The layers are those `node .agents/skills/orkestrel-publish/scripts/wave.ts --plan` printed on 2026-10-29 after the catalog refresh:

| Layer | Packages |
| --- | --- |
| L0 | contract |
| L1 | abort, budget, codec, csv, emitter, html, indexeddb, msg, ndjson, sqlite, sse, test, timeout |
| L2 | console, database, form, markdown, pool, process, reason, router, table, template, tool, websocket |
| L3 | capture, guide, interpret, lsp, qualifier, queue, rater, relation, scaffold, sea, server, terminal, workspace |
| L4 | brief, mcp, middleware, program, worker, workflow |
| L5 | agent, browser, probe |
| L6 | ollama, toolbox |
| L7 | study |

- Scaffold holds its L3 row until the last layer closes: its runtime dependencies publish in L0 to L2, and the wave pins one scaffold release, so scaffold re-pins them and releases after L7 (§ Sequence, step 6).
- Out of scope: every repository the catalog does not list, including the applications that consume the fleet.

## Scaffold pin

- The wave pins the one scaffold release that carries every row of § Scaffold release. That release publishes after every layer's realignment and before L0 publishes, on the user's ruling of 2026-10-29; until then each checkout runs on scaffold 0.0.112, and a gate the pending release changes runs with the release's fix applied as a command-line equivalent.

## Scaffold release

Each row is a scaffold defect the wave found, fixed on scaffold's `main` and shipped in the one release § Scaffold pin names.

1. **Vitest 5's file-system module cache breaks command-loaded source.** Vitest 5.0.5 reads a cached module's code as bytes (`readFile(result.tmp)` with no encoding in its server module runner's transport), and Vite 8.3.5's `prepareStackTrace` hook then throws `code.charCodeAt is not a function` on every stack read inside source a browser command loads through `context.project.vitest.import`, which `.claude/rules/workspace.md` § Configuration authority prescribes. The generated root configuration and scaffold's own set `fsModuleCache: false`, the rule names why, and `tests/src/core/compilers.test.ts` pins it; measured in `@orkestrel/test`'s `chooseFiles` case, red with the cache on and green with `--fsModuleCache=false`, on 2026-10-29.
2. **The visit's re-pin collapses a disjunctive range.** `computeRanges` in `.agents/skills/orkestrel-publish/scripts/wave.ts` replaced every audited range with one caret, so the pin step narrowed `typescript: ^6.0.3 || ^7.0.2` to `^6.0.3` and `vitest: ^4.1.12 || ^5.0.5` to `^4.1.12` in the peer blocks of probe, test, and capture on 2026-10-29. Probe reads its peer range at run time, so its rebuilt server refused TypeScript 7.0.2 at its handshake. `moveRange` moves only the arm in the release's major, `.agents/skills/orkestrel-publish/references/wave.md` § Visit a repository states it, and the wave proof pins it; a mutation that restores the collapse reddened that case alone (1 failed, 58 passed). The three peer blocks are restored by hand until the re-pin runs on the release.
3. **The title census reads division after a decimal as a regular expression.** `.agents/skills/orkestrel-harden/scripts/titles.ts` admits a slash as division only after an identifier, a closing bracket, `++`, or `--`, so a decimal literal such as `0.5` before ` / 255` opened a regex and the census refused `tests/src/browser/colors/helpers.test.ts` in test with `Unclosed regex token`. The operand pattern admits the numeric-literal token the lexer reads, and `TITLES_NUMBER_DIVISIONS` pins it; the case failed before the fix, a mutation that drops the form reddened it alone (1 failed, 90 passed), and test's census then read 1,362 baseline titles.
4. **Test infrastructure has no closed set.** `.claude/rules/tests.md` stated the mirror law for any `tests/setup<Name>.ts` and read its placement list as guidance, the policy sweep proved only the mirror, and its own controls used invented names (`tests/setupCanvas.ts`, `tests/setupExtra.ts`), so 18 modules in markdown, lsp, mcp, browser, ollama, agent, and study sit outside the canon. The rule names the whole set (adding `tests/setupService.ts` and `tests/setupGlobal.ts` to the list), places a cross-cutting Node proof's helpers in `tests/setupServer.ts`, and bounds `fixtures/`; `inspectPolicyInfrastructure` in `tests/setupPolicy.ts` refuses every other TypeScript module under `tests/` through the `mirror` rule, and `inspectPolicySetup` checks only the canon's modules. One review lane falsified two claims (duplicate diagnostics, and refusals for a setup-named declaration file and bench); the repair took its prescription, and a mutation dropping the scope reddened exactly its three controls (3 failed, 177 passed).
5. **Nothing enforces that a test file declares no helper of its own.** `.claude/rules/tests.md` § Shared test infrastructure refuses a local fixture factory in a test file, and no instrument read it, so the fleet held 462 module-scope functions in mirrored test files (mcp 123, reason 82) and the wave's writer briefs added more. On the user's ruling of 2026-10-29, `policy/no-test-helper` in `configs/policy.ts` refuses a module-scope function, class, or function-valued binding in `tests/src/**/*.test.ts`, `tests/app/**/*.test.ts`, and `tests/setup*.test.ts` (`POLICY_TEST_GLOBS`, wired in `.oxlintrc.json`); `tests/distribution.test.ts` sits outside that population as § Deferred records. A mutation that silences the reporter reddened its five invalid cases (5 failed, 2 passed).
6. **The store shapes name no atomic update.** `.claude/rules/architecture.md` § Stores gave a store point access and bulk restore only, so a per-key count, which § Middleware sends to a pluggable store, had no shape that keeps its read-modify-write from interleaving across an `await` (middleware's rate limiter, ruled 2026-10-29). The section adds the atomic-update shape, one verb that reads, decides, and writes a key's entry, and states that it takes the entry's key.
7. **The self-contained entry exception was unreachable.** `.claude/rules/architecture.md` § Declaration placement permitted non-exported module-scope declarations in a self-contained runtime entry, and `reportHidden` in `configs/policy.ts` refuses every one in a kind file, so no file could use it (worker's thread entry, ruled 2026-10-29). The bullet states what such an entry does: it imports only installed packages and `node:` modules, keeps its declarations in its file's kind, and keeps per-run state in the call's own entities.
8. **The cursor remedy names only a bounded recursion.** `.claude/rules/typescript.md` § Bindings, **Exemptions**, returns what a one-successor worklist reaches from a bounded recursion, and a walk whose depth only an input limit bounds (lsp's segment chain, up to 67,108,864 nodes, ruled 2026-10-29) has no bounded recursion. The clause adds the iterator entity that **Per-call state** already admits as the remedy for such a walk.
9. **The error-guard member check had no stopping standard.** `.claude/rules/typescript.md` § Errors and outcomes checked each member against its declared type, and four review rounds of 2026-10-29 walked that reading out to structural extremes: class-instance and callable contexts, then non-enumerable JSON members, class-instance JSON records, and array elements inherited through a prototype. The section states the standard: a package-declared member type admits every object or function it admits; a member type `@orkestrel/contract` defines is checked by that package's guard, whose data shape (plain records, own indices, the enumerable members JSON reads) it fixes, any number excepted. It also names the pairwise-distinct constructors the distribution proof asserts.
10. **The title census refuses a line or paragraph separator in a string.** `.agents/skills/orkestrel-harden/scripts/titles.ts`'s string patterns excluded U+2028 and U+2029, which ES2019 admits in a string literal, so the census could not lex browser's base `tests/src/core/compilers.test.ts` (`Unclosed string token` at a literal U+2028, 2026-10-30). The patterns admit both; the unescaped refusal case keeps `
`, `
`, and ``, and an added case scans both separators.

## Visit procedure

Run these steps for each package, in order, with the checkout's `main` clean apart from the deleted lockfile the wave started with:

1. Install from the manifest, which regenerates the deleted lockfile.
2. Run `node .agents/skills/orkestrel-publish/scripts/wave.ts --visit --target <checkout> --to record`.
3. When the `record` step refuses a path the overwrite did not write and the visit's `format` step rewrote it, commit the receipt's written and removed paths with the manifest and the lockfile as `Overwrite with scaffold <version>`, then the remaining formatter rewrites as `Format with oxfmt <version>` (`.agents/skills/orkestrel-publish/references/wave.md` § Visit a repository, step 8).
4. Lift the toolchain majors the visit keeps: `vitest` and `@vitest/browser-playwright` to `^5.0.5`, and `typescript` to `^7.0.2`, where the manifest declares each. Install, and add `.vitest/` to the package's own `.gitignore`.
5. Run the gates once as the baseline and count each bindings rule with `node .agents/skills/orkestrel-harden/scripts/measure.ts`.
6. A writer unit realigns the package to the rules in § Realignment, then runs the improvement pass in § Improvement, within the stop its brief states.
7. The runner lane runs the gates and `node .agents/skills/orkestrel-publish/scripts/compare.ts`; the bump is ruled per `.agents/skills/orkestrel-publish/references/wave.md` § Rule on the bump.
8. Before the layer publishes, each package's release chain runs through `node .agents/skills/orkestrel-dispatch/scripts/chain.ts` in the package's own checkout on a clean `main`, after `npm ci` reinstalls from the committed lockfile and `npm run clean` empties `dist/`; the user ruled out clones on 2026-10-29, so this replaces the fresh clone `.agents/skills/orkestrel-publish/references/wave.md` § Prepare a layer names.

## Realignment

- **Bindings.** `.claude/rules/typescript.md` § Bindings, enforced by `policy/no-let`, `prefer-const`, `no-var`, `no-param-reassign`, and `no-ex-assign`, with `policy/no-nested-functions` beside them, which reaches `tests/` and `configs/` as well as `src/`. Every conversion derives the value; the census and its controls follow `.agents/skills/orkestrel-harden/references/bindings.md`, and a rewrite that claims unchanged behavior follows `.agents/skills/orkestrel-harden/references/equivalence.md`.
- **Names.** `.claude/rules/names.md` § General vocabulary: no -ing word names an option, field, result, record, constant, or action, outside the four kinds that rule keeps.
- **Toolchain.** Vitest 5.0.5, TypeScript 7.0.2, oxlint 1.90.0, oxfmt 0.75.0, api-extractor 7.60.0, and Playwright 1.64.1, with the test-shape changes they force; Vitest 5 joins a test's name with ` > `.
- **Tests.** `.claude/rules/tests.md` § Test contract: no test depends on a git-ignored directory or on `dist/` before `build`, and the `policy` project's `dist` rule passes.
- **Conventions.** Fix any other convention breach inside the package; record one outside its bounds in § Deferred with an owner and a trigger.

## Improvement

- A consumer adopts a promoted export at its re-pin, after the owner publishes it: mcp, browser, and ollama take item 44's exports from test. Item 61's ruling, which process's realignment commit records, adds `inspectProcess`; browser adopts it for its serving pid, probe adopts an awaited `killTree` before it deletes compiler resources, lsp and mcp keep their `Session` and `Supervisor` composition and adopt the renamed members, and study holds its synchronous descendant traversal until its lifecycle contract is ruled.
- Rename an exported name the `surface` policy rule reports as claimed by another package, under `.claude/rules/names.md` § Fleet name ownership, and rule the bump it obliges (`.agents/skills/orkestrel-publish/references/release.md` § What a bump obliges).
- Replace a local helper whose job an installed `@orkestrel` export does, dependency-first.
- Evaluate the promotion items in their owning packages before any consumer adopts them: `ROADMAP.md` items 44 and 45 in test, item 61 in process, item 63 in capture, and item 62 in the package that owns the bounded retry.
- Back every behavior change with real-implementation tests.
- Each brief states the package's stop and its reason, from its complexity and the goal; the pass ends at that stop or at an overdoing signal `.agents/orchestration.md` § Size gate names, and never holds up the layer.

## Renames

Each published rename a realignment made, which every consumer adopts at its re-pin.

| Package | Old | New | Rule |
| --- | --- | --- | --- |
| html | `HTMLTag.closing` | `HTMLTag.final` | `.claude/rules/names.md` § General vocabulary |
| msg | `MSG_FIELD_NAME_MAPPING` | `MSG_FIELD_NAMES` | a lookup constant names its values |
| msg | `MSG_FIELD_FULL_NAME_MAPPING` | `MSG_FIELD_FULL_NAMES` | a lookup constant names its values |
| msg | `MSG_FIELD_TYPE_MAPPING` | `MSG_FIELD_TYPES` | a lookup constant names its values |
| msg | `MSG_PIDLID_MAPPING` | `MSG_PIDLIDS` | a lookup constant names its values |
| process | `ProcessInterface.stopping`, `Process.stopping`, `SessionInterface.stopping`, `Session.stopping`, `Supervisor.stopping` | `terminated` on each | `.claude/rules/names.md` § General vocabulary |
| process | `SessionInterface.ending`, `Session.ending`, `Supervisor.ending` | `ended` on each | `.claude/rules/names.md` § General vocabulary |
| reason | `ChainingStrategy` | `ChainStrategy` | `.claude/rules/names.md` § General vocabulary |
| reason | `isChainingStrategy` | `isChainStrategy` | `.claude/rules/names.md` § General vocabulary |
| reason | `LogicalChainingResult` | `LogicalChainResult` | `.claude/rules/names.md` § General vocabulary |
| reason | `InferentialChainingResult` | `InferentialChainResult` | `.claude/rules/names.md` § General vocabulary |
| lsp | `joinLSPSegments(state)` | `new LSPChain(state).join()` | `.claude/rules/typescript.md` § Bindings, **Per-call state** (an unbounded walk is an iterator entity) |
| lsp | `takeLSPTail(state, count)` | `new LSPChain(state).tail(count)` | the same |
| workflow | `isSkipping` | `matchesAbortedAttempt` | `.claude/rules/names.md` § Fixed lifecycle vocabulary and § Fixed derivation/construction forms |
| workflow | `scheduleHost` | `createHostSchedule` | `.claude/rules/architecture.md` § Kind purity (an entity factory) |
| workflow | `delayHost` | `createHostDelay` | the same |
| mcp | `ModelContextAdoptOptions.debugging` | `ModelContextAdoptOptions.debug` | `.claude/rules/names.md` § General vocabulary |
| mcp | `HTTPHandlerOptions.streaming`, inherited by `HTTPTransportOptions` | `stream` | the same |
| mcp | `createScopeMessageListener` (removed) | the `ScopeServer` that `createScopeServer` returns | `.claude/rules/typescript.md` § Immutability (it wrote a caller-owned map) |
| middleware | `isBufferingIneligible` | `matchesUnbufferableResponse` | `.claude/rules/names.md` § Fixed derivation/construction forms |
| middleware | `LimiterResult.resetAt`, `LimiterEntry.resetAt` (added this wave) | `expiry` | `.claude/rules/names.md` § Entity-scoped names |
| agent | `AgentTurn.ending` | `AgentTurn.outcome` | `.claude/rules/names.md` § General vocabulary |
| agent | `MessageMeasure.framing` | `MessageMeasure.uniform` | the same |
| agent | `LedgerPlanningGroup` | `LedgerPlanGroup` | the same |
| study | `StudyAgentReading`, `parseStudyReading` | `StudyAgentMeasurement`, `parseStudyMeasurement` | the same |
| study | `StudyGradeReading` | `StudyGradeVerdict` | the same |
| study | `StudyGrading`, `parseStudyGrading`, `isStudyGrading`, `StudyGradingContext`, `StudyGradingStore`, `StudyGradingStoreOptions` | `StudyAssessment`, `parseStudyAssessment`, `isStudyAssessment`, `StudyAssessmentContext`, `StudyAssessmentStore`, `StudyAssessmentStoreOptions` | the same |
| study | `StudyLabeling`, `parseStudyLabeling`, `isStudyLabeling`, `translateStudyPacketLabeling` | `StudyLabels`, `parseStudyLabels`, `isStudyLabels`, `translateStudyPacketLabels` | the same |
| study | `StudyResultReading` | `StudyResultView` | the same |
| study | `validateStudyOllamaRecording`, `validateStudyRecordingDeclaration` | `validateStudyOllamaCapture`, `validateStudyCaptureDeclaration` | the same |
| study | the `grading` member of `StudyLabelRequest`, `StudyReportRequest`, `StudyAssessmentContext`, and the grade, label, and report outputs; the report output's `labeling`; the CLI `--grading` flag | `assessment`; `labels`; `--assessment` (the recorded `grading.json` artifact keeps its name) | the same |

## Lanes

- One runner lane runs every install, test, build, visit, and release chain on the host, one at a time.
- Writer lanes run beside it, one per package checkout, each running only the format check, lint, and type check over its owned files, at most five at once (raised from three on 2026-10-29 with 107 GB of 127.7 GB memory free and 3 Codex processes live; the T3 lane host was unusable at six concurrent children on 2026-10-21), on the user's go-ahead of 2026-10-29 to run the work in parallel.
- A layer's realignment can start before the layer under it publishes; the layer re-pins to the versions npm serves, and reruns its gates, before it publishes.
- Scaffold is never a writer's checkout; scaffold changes are the Orchestrator's.

## Claims

1. Every catalog package's manifest pins the scaffold release § Scaffold pin names and every `@orkestrel` dependency at the caret of the version the registry served when its layer ran.
2. Every package that declares `vitest`, `@vitest/browser-playwright`, or `typescript` declares `^5.0.5`, `^5.0.5`, and `^7.0.2`, and every other toolchain range matches scaffold's canon.
3. `lint:check` passes in every package with no suppression directive.
4. No option, field, result, record, constant, or action in any package is named with an -ing word outside the four kinds `.claude/rules/names.md` keeps.
5. No test depends on a git-ignored directory or on `dist/` before `build`.
6. Every package's `.gitignore` lists `.vitest/`.
7. Every package's release chain passed on a clean `main` at the commit it published.
8. Every package is published at a registry-confirmed version, and its `main` is pushed.

## Release bar

A finding blocks a layer when it fails a gate or the release chain, falsifies a claim, or breaks a contract a published guide states. Every other finding enters § Deferred.

## Deferred

- **The visit records a formatter rewrite as unrelated work.** The `record` step of `wave.ts` refuses a path the visit's own `format` step rewrote, so every package whose owned files the oxfmt move reformats needs the hand record of § Visit procedure step 3. Owner: scaffold. Trigger: scaffold's release after L7.
- **The visit resolves a bin package's own executable as scaffold.** `resolveScaffold` in `.agents/skills/orkestrel-publish/scripts/wave.ts` falls back to the target's `dist/bin/main.js` when `node_modules` holds no scaffold, so a bin package with no install runs its own executable as scaffold. § Visit procedure step 1 installs first. The regeneration proofs in `tests/agents/skills/orkestrel-publish/scripts/wave.test.ts` stage their fake scaffold at the target's own `dist/bin/main.js` so it survives the moved `node_modules`, so a fix redesigns those fixtures. Owner: scaffold. Trigger: scaffold's release after L7.
- **The visit keeps the declared toolchain major.** The pin and the overwrite keep each declared major, so the Vitest 5 and TypeScript 7 move is § Visit procedure step 4, by hand. Owner: scaffold, as a design question on whether a visit lifts to the canon's major. Trigger: scaffold's release after L7.
- **The vendored Codex probe entry carries a relative path and no `cwd`.** `.codex/config.toml` registers `probe` as `node_modules/@orkestrel/probe/dist/bin/main.js` with no `cwd`, so a same-named user-level entry that sets `cwd` and `required` resolves that path inside another checkout, and every session that loads both fails to start. The probe checkout's `node_modules/@orkestrel/probe` junction to the checkout itself holds the merged path until probe's visit reinstalls it. Owner: scaffold. Trigger: probe's visit at L5, or scaffold's release after L7, whichever comes first.
- **Legacy distribution harnesses launch npm through a shell.** The package-authored `tests/distribution.test.ts` of 44 catalog packages names `npm.cmd` and spawns it with `shell: true` on Windows, which `.claude/rules/portability.md` § Processes and executables refuses; scaffold's emitted proof runs through the vendored `tests/setupDistribution.ts` harness instead. Owner: each package, by moving its proof onto that harness. Trigger: the package's next hardening campaign, or a distribution run that fails on a shell-sensitive path.
- **Test's guide proof reads its own build.** `tests/guides.test.ts:9` in test imports `readInventory` from `@orkestrel/test/server`, which the package's own `exports` resolves to `dist/src/server`, so the guide run needs a build first; the gate chain builds before `test`, so no gate reddens. Owner: test, with scaffold's guide-command source loading. Trigger: `npm run test:guides` in a checkout with no build output.
- **Contract changes committed before a review pass.** `.agents/orchestration.md` § Size gate owes one independent review of a public contract change, and csv, indexeddb, msg, sqlite, sse, pool, budget, process, template, tool, table, websocket, qualifier, rater, relation, workspace, and reason (error-guard recognition), html, msg, and reason (published renames), markdown (the insert-only `coalesceText` and the extracted helpers), and process (renames, `inspectProcess`, the `execute` move) were accepted on gates alone. Three review lanes ran on 2026-10-29 over the guard and rename packages and process; their findings are repaired in each package's `Repair the error-guard review's findings` commit. Still owed: one review of reason, markdown, database, console, form, middleware (`SessionControl`, the limiter and asset stores, and the multipart `Upload` over untrusted input), server (`HTTPError`'s rebrand), workflow (its renames and `HostSchedule`), and lsp, and one re-check of the guard repairs. Owner: one batched review lane. Trigger: before § Sequence step 6 publishes their layer.
- **Cost-class regressions the gates do not pin.** A bindings rewrite can swap an algorithm for one that does more work and still pass every gate: database's wildcard matcher went from a greedy scan to a table, and only its timing test caught it. Most realigned packages pin no cost. Owner: one review lane over every realigned package's rewritten hot paths, comparing each with its base on a sized input. Trigger: before § Sequence step 6 publishes their layer.
- **A fixture entry imports a sibling fixture module.** lsp's `tests/src/server/fixtures/protocol.mjs` exports framing helpers that the raw peer entries `peer.mjs` and `holder.mjs` import; `.claude/rules/tests.md` § Shared test infrastructure places a fixture as data or an entry and names no rule for a module that only entries import, which cannot import the TypeScript setup modules. Owner: scaffold's test rules. Trigger: the debrief, or a second package with the same shape.
- **A scaffold proof reads an ignored directory.** `tests/agents/skills/orkestrel-harden/scripts/discovery.test.ts` `reads this checkout: every gated project, its root chain, the workbench, and the skip markers` expects the `probe` project empty, so a probe file left under the git-ignored `tmp/probes/` reddens it (scaffold 0.0.113's release chain, 2026-10-30); `.claude/rules/tests.md` refuses a proof that depends on an ignored directory. Owner: scaffold. Trigger: the debrief.
- **No catalog package carries an app face.** The trial in § Sequence step 1 covered core, browser, server, and bin; the app face is proved by scaffold's `test:templates` project alone. Owner: scaffold. Trigger: a catalog package adds an `app/` environment.

## State

- 2026-10-29: the catalog refresh moved scaffold's row from 0.0.108 to 0.0.112; every other row matched the registry.
- 2026-10-29: the trial of § Sequence step 1 ran in fresh clones of timeout (core), table (browser), websocket (server), and capture (bin): after the visit and the toolchain lift, `format:check`, `check`, `build`, and `test` passed in all four and `lint:check` failed on the bindings rules alone. Each clone's difference was folded into its checkout and the clones went to the Recycle Bin.
- 2026-10-29: the probe checkout is installed from its manifest as it stands and rebuilt, so the probe server the writer lanes require starts; probe's own visit stays at L5.
- 2026-10-29: contract's checkout is prepared at `514b5e3`, and its realignment unit runs.
- 2026-10-29: L1 and L2 are prepared on scaffold 0.0.112; § Scaffold release row 1 is fixed on scaffold's `main`.
- 2026-10-29: L3 is prepared on scaffold 0.0.112; codec is realigned at codec `2f7540f`.
- 2026-10-29: L4 to L7 are prepared on scaffold 0.0.112, and every catalog package holds its realignment brief.
- 2026-10-29: the realignment stands committed in abort, emitter, timeout, sqlite, sse, ndjson, csv, msg, indexeddb, html, codec, budget, pool, process, template, tool, router, table, websocket, qualifier, rater, relation, workspace, and test; the ledger names each commit.
- 2026-10-29: the twelve helper relocations close the test-file helper row of § Deferred: csv `560b045`, emitter `2fb9bc6`, html `11ef9f1`, indexeddb `d2b5df1`, msg `b45cee6`, ndjson `c3c3045`, sqlite `97c635a`, pool `b72ccc7`, router `be098d3`, table `2f207c5`, template `c91e6bf`, tool `22cef5e`.
- 2026-10-29: contract `76083b8`, reason, markdown, database, console, and form are realigned and committed; the three guard reviews' findings are repaired in eighteen packages and accepted with every gate green.
- 2026-10-29: L0 to L3 and L4 but mcp are realigned and committed (43 of 50); mcp, browser, probe, agent, ollama, toolbox, and study are in writer lanes.
- 2026-10-30: every catalog package is realigned and committed (browser `feac6c3`, the last); the contract, cost-class, and guard reviews and their repairs are closed; § Scaffold release rows 1 to 10 are committed, and scaffold `5bfa036cf` is `Release 0.0.113` with its full release chain green.
- 2026-10-30: scaffold 0.0.113 is published and pushed; every package's re-pin visit on it passed every gate, and every dist moved.
- 2026-10-30: L0 (contract 0.0.20) and L1 (13 packages) are published, served, and pushed; the ledger names each release commit.
- 2026-10-30: L2 (12 packages) is published, served, and pushed; the ledger names each release commit.
- 2026-10-30: L3 (12 packages) is published, served, and pushed; lsp adopted process's `ended` rename at lsp `d3d6ed3`.
- 2026-10-30: L4 (6 packages) is published, served, and pushed; mcp adopted item 44 and process's `ended` rename at mcp `bafe85c`, and worker's option snapshot case awaits pool's warm-up `release` at worker `a684608`.
- Next: prepare L5 on the served L4 versions; land browser's item 44 and item 61 adoptions and probe's awaited `killTree` and LintStage bound ruling, and check both for a case that asserts pool's warm-up `release` before a first acquire; run its release chains, and publish it on the user's one-time code (§ Sequence step 6).

## Sequence

1. **Realign every layer.** Visit and realign L0 to L7 in parallel within § Lanes, on scaffold 0.0.112; record each scaffold defect a package meets as a row of § Scaffold release, or of § Deferred when it waits for the release after L7.
2. **Capture.** Its realignment fires the rows of capture's `.orkestrel/capture/plan.md` § Deferred whose trigger is its scaffold adoption (the duplicate test helpers; Vitest 5 coverage beyond R8) and the 0.0.2 defects (the late journal refusal; the two wrapper shapes).
3. **Promotions.** Land `ROADMAP.md` items 44, 45, 61, 62, and 63 in their owners, before any consumer adopts them.
4. **Scaffold release.** Release scaffold once with every row of § Scaffold release, after step 1 closes.
5. **Re-pin.** Re-run every package's visit on that release, and rerun the gates the re-pin changes.
6. **Publish.** For each layer from L0 to L7: re-pin to the versions npm serves, run the release chain, publish, refresh the registry, and sweep the self-pins before the next.
7. **Scaffold after L7.** Re-pin scaffold's own dependencies, refresh the catalog with the served versions, land the rows of § Deferred that scaffold owns, and release scaffold when its catalog or canon changed.
8. **Debrief.** Run `orkestrel-debrief` on the wave and land its lessons in scaffold.
