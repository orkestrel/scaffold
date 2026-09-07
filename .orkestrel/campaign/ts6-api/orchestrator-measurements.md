# Orchestrator measurements — the in-process API removal on 6.0.3

Taken 2026-09-05 on the four-CPU container, Node v22.22.2. The mechanisms below exist in both 6.0.3 and 7.0.2, which is the property the plan selects for.

## The `tsc` command as the type-check surface

```text
probe checkout, typescript 6.0.3, configs/src/tsconfig.core.json:
  tsc --noEmit -p …                                       cold → 4223 ms, exit 0
  tsc --noEmit -p … --incremental --tsBuildInfoFile <f>  first → 576 ms (the OS cache warm), second → 454 ms; buildinfo 21061 bytes
  tsc --showConfig -p …                                   97 ms, exit 0, prints the resolved compilerOptions as JSON
scaffold checkout, typescript 7.0.2, the same project:
  tsc --noEmit -p …                                       cold → 1788 ms; incremental first → 132 ms, second → 107 ms
  tsc --showConfig -p …                                   45 ms, exit 0, the same options with the keys in a different order
```

Reading: a type check through the `tsc` process costs a cold program build once and well under a second after, on both majors; `--showConfig` gives the resolved options a digest can hash on both majors, over a canonical serialization (the key order differs). Neither needs the in-process API.

## Carried from the break scoping (its folder `../ts7-break/` is pruned; the readings stand here)

`node:module` `stripTypeScriptTypes({ mode: 'transform' })` covers enum, namespace, parameter property, and `import =` on Node 22.22.2 (added in 22.13.0). `tsc --declaration --emitDeclarationOnly` emits the core declaration tree and `@microsoft/api-extractor` 7.59.0 rolls it up with its own bundled engine into the shipped rollup up to `import type` on external imports; that measurement ran under 7.0.2 and the plan's first unit repeats it under 6.0.3.

## The diagnostic line and the scratch project, on both majors

```text
a draft written beside its original as src/core/zz-draft.probe-abc123.ts, a scratch tmp/zz-scratch-tsconfig.json that extends ../configs/src/tsconfig.core.json (noEmit true, declaration off, rootDir ../src/core, include ../src/core/**/*.ts):
  typescript 6.0.3: tsc --noEmit --pretty false -p tmp/zz-scratch-tsconfig.json → src/core/zz-draft.probe-abc123.ts(1,14): error TS2322: Type 'string' is not assignable to type 'number'.   exit 2
  typescript 7.0.2: the same command → the identical line                                                                                                          exit 1
```

Reading: the plain-text diagnostic line is byte-identical across the majors (a path relative to the cwd, a 1-based line and column, the code, the flattened text), so one parser serves both; the exit code differs between the majors and is not the verdict, the diagnostic lines are. The scratch project shape the plan's probe unit needs (extend the caller's project, include the revision file beside its original) works on both.

## The scratch project in the mirror shape (M1, M2 in part)

```text
instruments/mirror-scratch-tsconfig.json, written in the Orchestrator's scratchpad, outside every checkout:
  extends the absolute path of probe's configs/src/tsconfig.core.json; compilerOptions noEmit, declaration false, emitDeclarationOnly false,
  rootDir <absolute src/core>, incremental, tsBuildInfoFile <scratchpad>/core.tsbuildinfo; include [<absolute src/core>/**/*.ts]; files []
  typescript 6.0.3: tsc --noEmit --pretty false -p <scratch>  run 1 → 566 ms, run 2 → 402 ms, run 3 → 414 ms; exit 0 each; buildinfo 21322 bytes
tsc --showConfig -p configs/src/tsconfig.core.json (scaffold, 6.0.3), instruments/showconfig-core.json:
  top-level keys compilerOptions, files, include, exclude; compilerOptions carries paths ({'@src/core': ['./src/core/index.ts'], ...}), rootDir (../../src/core), lib, types, module, moduleResolution, target, and the strictness flags
```

Reading: a scratch project outside the workspace tree can extend the caller's project and re-root it (its own `rootDir`, `include`, `files`, and buildinfo) on 6.0.3, and the incremental reuse survives a scratch config that names files under another root. `--showConfig` prints `paths` and `rootDir` relative to the project file beside the resolved options, so a digest reads the `compilerOptions` member alone and canonicalizes the paths, and a mirror's scratch config rewrites `paths` targets from the same printout.

## Vite's re-exported parser and transformer (M6, M7, M9)

```text
$ node instruments/vite-parser-probe.mjs  (vite from scaffold's node_modules; log instruments/vite-parser-probe.log.txt)
parseSync('probe.ts', source): errors=0, comments=1, keys program,module,comments,errors
  ExportNamedDeclaration greet   params=[name] return=TSStringKeyword exportKind=value start=101 end=171
  ExportNamedDeclaration config  return=UserConfig (the arrow initializer's return type) exportKind=value
  VariableDeclaration hidden (no export), ExportDefaultDeclaration, enum, namespace, class with a parameter property, TSImportEqualsDeclaration
  ImportDeclaration @orkestrel/contract and the type-only `import type { UserConfig } from 'vite'`, each with its source value
  comments: [{ type: 'Block', value: '* Greets. ', start: 86, end: 100 }]
transformWithOxc(code, '<label>.ts', { target: 'esnext' }):
  enum → ok (an IIFE emit); namespace → ok; parameter property → ok (assigned in the constructor); import = require → ok (`const fs = require("node:fs")`, a CommonJS call inside ESM output); plain → ok
```

Reading: the parser every workspace already declares through `vite` returns a TypeScript AST for an untransformed `.ts` file with the export kind, the declaration name, the parameters, the return-type node, the statement's `start`/`end` for slicing the source, and the comments with their ranges. It serves every generated-text lift, the `lsp` import walk, `database`'s surface derivation, and the proposal's TSDoc control without a text scan and without a dependency the owner has to request. The transformer covers every construct a fence can carry, so the fences move to it and `MINIMUM_NODE_VERSION` stays at 22.12.0; a fence carrying `import =` fails at load as ESM, which is the refusal the coding contract already makes.

## Carried: the probe deadline's cause (from the pruned `../ts7/orchestrator-measurements.md`, 2026-09-05)

```text
npm test in the probe checkout → red rows on "The probe could not arm: The Oxlint language server exited with code 0" … "LSPError: The LSP request 'initialize' exceeded its deadline"; the row count moves between runs, the message never does
node lsp-init-probe.mjs /home/user/fleet/probe 3 → 631 ms, 314 ms, 392 ms, each answered (the server itself starts inside the 2 s LINT_DEADLINE)
node type-stage-probe.mjs → first inspection after 2333 ms cold, 1461 ms warm in the same process (a synchronous TypeScript program build)
```

Reading: `Probe.#arm` boots every stage at once, so the type stage's synchronous program build runs on the same event loop the lint client's `initialize` deadline is timed on; when the build crosses 2 s the timer fires ahead of the answer already in the pipe. The seam predates the 7 work (the reverted tree at `b331d93` carries it) and is the in-process compiler use the plan's U7 replaces with a spawned `tsc`, which leaves the loop free. The deciding solo runs of the red files on the reverted tree are recorded in `probe-solo-files.log.txt`.

## M16: a vendored or generated test may import `vite` (settled by evidence, 2026-09-06)

```text
$ grep -n "from 'vite'" tests/config.test.ts → 18: import { build, createServer, loadConfigFromFile } from 'vite'
$ grep -n "from 'vite'" configs/helpers.ts → 1 (type-only), 2: import { parseSync, transformWithOxc, Visitor } from 'vite'
verify-scaffold-report.md: npm run lint:check → exit 0 over the same tree
```

Reading: the vendored lint configuration admits a `vite` import in `tests/**` and in `configs/**` today, so the parser-based readers and the `transformWithOxc` fences add no lint exception.

## The declaration chain, absorbed (Grok, 2026-09-06; `dts-absorb-distillate.md`)

`vite-plugin-dts` 5.0.3 re-exports `unplugin-dts` 1.0.3. Its emit is in-process: `loadTs()` takes the workspace `typescript` and calls `ts.createProgram` then `program.emit`, and when that package exposes no `createProgram` (the TypeScript 7 shape) it falls back to `@typescript/typescript6`, the banned bridge, then throws. The rollup is `@microsoft/api-extractor` `Extractor.invoke`, which runs its own bundled `typescript` 5.9.3 whatever `typescriptCompilerFolder` names; that folder only points the default-lib location, never the engine. So the single declaration file per face is produced by api-extractor's own engine on either major; the only site TypeScript 7 breaks is the emit, which `tsc --declaration --emitDeclarationOnly` replaces as a process.

Reading for the owner's question: the single `.d.ts` per face is kept with or without `vite-plugin-dts`. Keeping the plugin holds the fleet on the bridge at the 7 move; replacing its emit with `tsc` and calling api-extractor directly keeps the same rollup and needs no bridge. The plan removes the plugin. U1 measures the reproduction on 6.0.3 before U3 is briefed.

Grok's containment read DIRTY because the target's SessionStart hook launched `npx -y typescript-language-server --stdio` at lane start (recorded in `tmp/cursor/npm-shim.log`) and the diff also caught this session's own untracked campaign files; `git status` shows no bench write to a tracked file.

## U1: the declaration rollup reproduced on 6.0.3 without the plugin (2026-09-06; `instruments/u1/`, `u1-declaration-baseline.log.txt`)

```text
per face: tsc 6.0.3 -p configs/src/tsconfig.<face>.json --declaration --emitDeclarationOnly --noEmit false --outDir <scratch>
          then api-extractor 7.59.0 Extractor.invoke over the emitted entry, its own bundled 5.9.3 engine and its own lib,
          overrideTsconfig = { types (core: ['node']; other faces: the face's own resolved types), lib: the face's own resolved lib,
          target/module ESNext, moduleResolution bundler, skipLibCheck, strict }, files: [entry], bundledPackages: [],
          dtsRollup.untrimmedFilePath, every report off; then on a server or browser face the literal `@src/core` specifier
          (tsc emits it unrewritten, api-extractor keeps it external because the override carries no paths) is replaced by the package name
                    rollup lines = shipped lines   material diff (whitespace, comments, blanks dropped)
  scaffold core          3419 = 3419                 10 lines, every one `import` → `import type`; 0 other
  scaffold server        2610 = 2610                 30 lines, every one the import class; 0 other
  console core           2429 = 2429                  6 lines, the import class; 0 other
  console browser         231 = 231                   6 lines, the import class; 0 other
  console server          471 = 471                  10 lines, the import class; 0 other
  no checkout received a write (git status clean in scaffold and console)
```

Reading: every face's single declaration file is reproduced from `tsc` emit plus api-extractor's own engine, with the declarations byte-equal after normalization and the only movement in the import lines, where the direct run writes `import type` for a symbol used as a type everywhere and the plugin's `staticImport` step had flattened it to `import`. That movement is the plugin's loss, not the recipe's, and it is the material class § What a bump obliges names: every `src`-publishing package's rollup changes on its import lines when the plugin goes, so each bumps on its own account at its visit. Two attempts that failed and why: passing the face's full resolved options (`allowImportingTsExtensions`, `paths`) with `typescriptCompilerFolder` pointed at 6.0.3 made the bundled engine unable to follow `Readonly`; hard-coding `types: []` on the server face made it unable to follow `NodeJS`. The recipe takes `lib` and `types` from the face's own `--showConfig` and nothing else.

Closing the research lane's open question: `tsc 7.0.2 --declaration --emitDeclarationOnly` already emitted scaffold's core declaration tree and api-extractor rolled it up (the carried reading from the break scoping), so the later 7 move keeps this chain unchanged.

## M2, M3/M4, M8/M13, M15 (2026-09-06; the unit reports beside this file)

- **M2** (`m2-instrument-report.md`, the unit's own reading under load): cold 3182 ms; warm 475; `touch-all` 489 (mtime-only changes keep reuse, so the buildinfo keys on content); `draft-replace` 602; `draft-add` 565 with the planted TS2322 reported; `refresh-all` (every file re-copied) 464; warm after refresh 457. Reuse survives the mirror refresh the type stage performs.
- **M15** (`m15-report.md`): the two-direction shape names the member in every case under `bundler`, `node16`, and `nodenext` — a missing runtime key as TS2741 on `declared = published`, an extra runtime key and a type-only name as TS2741 on `surfaced: Record<keyof typeof published, true> = declared`; the one-direction shape the design sketched exits 0 on an extra runtime key. U4 writes both directions.
- **M8/M13** (`m8m13-report.md`): under the CLI a rule reads `context.filename` (absolute), `context.sourceCode.text`, `getAllComments()`, and a declaration's doc comment through `getCommentsBefore(node)`; `getJSDocComment` exists and throws. `RuleTester` parses TypeScript nodes but resolves a case's `filename` against oxlint's own package directory, so a moved placement rule keys on the path's suffix and its `RuleTester` cases carry the suffix; `PolicyContext` gains `filename` and `sourceCode`.
- **M3/M4** (`m3m4-report.md`): the case table and the cross-major differences are in the report; U7's parser is briefed from it.

## `--showConfig` on a configuration fault, and its printed paths (2026-09-06, probe checkout, 6.0.3)

```text
scratch tsconfig.json with "bogus": true, cwd the scratch:
  node node_modules/typescript/bin/tsc --showConfig -p tsconfig.json
  stdout: tsconfig.json(1,40): error TS5023: Unknown compiler option 'bogus'.
  stderr: (empty)      exit 1      no JSON printed
probe's own root tsconfig.json and configs/src/tsconfig.core.json:
  --showConfig prints no absolute path (grep -c "/home" → 0); rootDir, outDir, and paths are spelled relative to the project file
```

Reading: `parseProjectConfig` over stdout alone separates a printed configuration from a fault on 6.0.3 with no read of the exit code, which is what U7-fix-a edit 1 relies on; on 7.0.2 the same call prints the recovered configuration (`m3m4-report.md` § Differences), so `resolve` returns a digest there and `inspect` raises from the check run on either major. `normalizeValue`'s path rewrite reaches only an absolute path a project declares itself.

## The U7 verifier's red row alone (2026-09-06, probe checkout)

```text
verifier, whole suite beside the U3-fix builder and three audit lanes:
  tests/src/server/Probe.test.ts > expires only the active inspection, cleans its revision, and serves a queued claim
  AssertionError at :696 — expirations.calls carried two claims, expected [[hanging]]
Orchestrator, the file alone after the lanes exited (u7-probe-solo.log.txt):
  npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Probe.test.ts
  Test Files 1 passed (1)   Tests 26 passed (26)   Duration 387.13 s   EXIT:0
```

Reading: the queued claim's own 15 s budget expired under load, so the row is the timing class `.agents/orchestration.md` § Writing concurrency rule 10 names, and the solo run is the deciding reading. M5 over the rebuilt `dist` follows U7-fix-b.

## The core rollup against U1's after U3-fix (2026-09-06, scaffold checkout, the verifier's build)

```text
grep -c nameToRewrite dist/src/core/index.d.ts                       → 0
grep -c nameToRewrite <scratchpad>/ts6/u1/scaffold-core/rollup.d.ts  → 3
diff dist/src/core/index.d.ts <u1 rollup>: hunk 1246-1248 is the vites.src.{core,browser,server} seed literals
  (declarationRollup on the left, vite-plugin-dts on the right); hunk 2632a2633-2662 is nameToRewrite's declaration
  on the right only.
cmp dist/src/server/index.d.ts <u1 rollup>                            → exit 0
```

Reading: the verifier's report (`u3-fix-verify-report.md` § 8) read the second hunk backwards — it names `nameToRewrite` as present in the current build, while the `>` lines are U1's baseline. The current rollup differs from U1's only by the seed literals this unit changed and the helper it deleted, both by design, and the server rollup is byte-identical.

## The expiry row under load, a second time (2026-09-06, probe checkout, the U7-fix verifier)

```text
verifier, whole suite beside the U7-fix audit lanes and the U4 implementer in scaffold:
  tests/src/server/Probe.test.ts > expires only the active inspection, cleans its revision, and serves a queued claim
  expirations.calls carried the arming control claim (arm-type.probe-…) before the hanging claim; 15 s budget
host at 11:53 UTC, four processors: load average 1.84 (1 min), 4.09 (5 min), 3.28 (15 min); five node processes above 50 % each
```

Reading: under a saturated host the 15 s budget expired the type stage's own warm (the arming control), which the case's comment names as the outcome a budget under the floor produces. The idle-host reading of 11:00 UTC passed the row (`u7-probe-solo.log.txt`); the deciding reading is the solo run launched at 11:53 UTC (`u7-fix-probe-solo.log.txt`). The guide's § Cost advises leaving room for a contended host, and a 15 s budget over a 12 s warm leaves 3 s, so the row is a fixture budget carried to U7-fix-d if the solo run passes.

## The serialization fixture under load, and alone (2026-09-06, probe checkout)

```text
fix-d verifier, whole suite beside the U4 audit lanes and U4's scoped runs:
  tests/src/server/Probe.test.ts > serializes project resolution against a live type inspection
  ProbeError: No inputs were found in config file 'projects/tsconfig.b.json' … from TypeStage.#configure via Probe.#resolve
Orchestrator, the case alone (u7-serialization-solo.log.txt):
  npx vitest run … tests/src/server/Probe.test.ts -t "serializes project resolution"
  Tests 1 passed | 25 skipped (26)   Duration 25.97 s   EXIT:0
```

Reading: `Probe.#resolve` admits through the same admission the type inspection holds, so the second claim queues behind whichever step the first claim is in when it arrives. The fixture proves the second claim 100 ms after the first and rewrites the second project 20 ms later; the first claim's `--showConfig` read costs about 100 ms idle (`orchestrator-measurements.md` § The `tsc` command) and more under load, and fix-a added a mirror refresh before it, so under a saturated host the second claim queued behind the first claim's resolution, ran its own resolution before the rewrite, and read the malformed project. The class is timing, carried to U7-fix-e as a fixture wait that clears the resolution.

## The distribution proof regenerated by `repair`, independently (2026-09-06, scaffold checkout, `instruments/u4/regenerate.sh`)

```text
node generate.mjs <scratch>/generated                     → generate exit=0 (a core+server blueprint materialized through dist/src/server)
rm <scratch>/generated/tests/distribution.test.ts
node dist/bin/main.js repair --offline --groups tests --target <scratch>/generated
  0 of 10 planned paths drifted from the plan. Audit compared bytes at 3, existence at 1, and nothing at 6.
  1 written, 10 unchanged, 0 removed                       → repair exit=0
cmp before.distribution.test.ts generated/tests/distribution.test.ts → exit 0 (byte-identical)
grep -c "from 'typescript'|transpileModule|createProgram" → 0
```

Reading: `repair` writes the presence-owned proof back where it is missing, byte for byte what the materializer wrote from the same template, and the regenerated proof names no compiler API. The U4-fix verifier re-runs the same instrument over the fixed template.

## M5: whole `prove` calls over probe's own workspace after the fix rounds (2026-09-06 17:29 UTC, `m5-final.log.txt`)

```text
node m5-prove.mjs 3   (dist built 17:17 UTC by the fix-f verifier; load average 1.64 over the last minute, U5 running in scaffold)
construct: 324 ms; PROBE_DEADLINE=30000
prove 1: 16299 ms; receipt minted   (the first prove pays the type stage's warm)
prove 2:  4408 ms; receipt minted
prove 3:  4306 ms; receipt minted
destroy: 16 ms; total 25354 ms
```

Reading: a warm `prove` over the flagship claim costs about 4.3 s to 4.4 s on this host with the compiler spawned per selected project for the case and the control, against the 437 ms to 495 ms the guide's § Cost recorded for the resident language service on 2026-08-20; the first `prove` after construction pays the warm (about 12 s over this repository) and lands near 16 s. `PROBE_DEADLINE` (30 s) clears both with room. The guide's warm-prove row is stale and is carried to U7-fix-g.

## The final solo readings (2026-09-06 17:28 UTC, `u7-final-solo.log.txt`)

`RuntimeStage.test.ts` alone: 40 passed in 20.3 s (the fix-f verifier's one red row, a FIFO-gated case at its 60 s budget under U5's load); `test:policy` 111, `test:config` 46, `test:setup` 9, `test:guides` 13, each green alone over the final tree.

## M6: boot and warm `prove` through the built entry, driven as a line client (2026-09-06 17:40 UTC, `m6-boot.log.txt`, `instruments/m6/m6-boot.mjs`)

```text
node m6-boot.mjs 3   (a fresh spawn of dist/bin/main.js per round, cwd probe; newline-delimited JSON-RPC: initialize, notifications/initialized, tools/call prove twice; U5 running in scaffold)
round 1: initialize answered at 526 ms; boot to first answered tools/call 16786 ms [receipt minted]; warm prove 5692 ms [receipt minted]; child exit 0
round 2: initialize answered at 561 ms; boot to first answered tools/call 16712 ms [receipt minted]; warm prove 4509 ms [receipt minted]; child exit 0
round 3: initialize answered at 497 ms; boot to first answered tools/call 16154 ms [receipt minted]; warm prove 4211 ms [receipt minted]; child exit 0
```

Reading: over the built entry the handshake answers in about 0.5 s, the first answered `tools/call` lands at 16.2 s to 16.8 s (arming's warm, about 12 s over this repository, plus one `prove`), and a warm `prove` round trip costs 4.2 s to 5.7 s. The guide's § Cost boot row (4.1 s to 4.4 s) and warm-prove row (437 ms to 495 ms) were taken on 2026-08-20 over the resident language service and are stale; both are carried to U7-fix-g with these readings, and the answered-`initialize` reading joins the table because a harness's handshake timeout reads it.

## M7: the parser's span unit (2026-09-06 17:57 UTC, `m7-spans.log.txt`, `instruments/m7/m7-spans.mjs`)

```text
node m7-spans.mjs   (vite 8.2.2's parseSync over a source carrying an em dash and a curly quote before the declaration)
errors: 0
statement slice: "export const factory = (mode: Mode): UserConfig => value"
param slice: "mode: Mode"
returns slice: "UserConfig"
utf16 length 103 utf8 bytes 107 program.end 103
```

Reading: `parseSync` reports `start` and `end` as UTF-16 code-unit offsets (the program's `end` equals the string's `length`, four short of its byte length, and every slice lands exactly), so `readStatements`'s `source.slice(node.start, node.end)` is right on a non-ASCII source. The objective lane's F1 names a risk the parser does not carry; the case it prescribes is adopted as the reader's control in U5-fix so a parser that changed its unit would redden it.

## The resume hook's `npm ci` under a live gate run (2026-09-06 21:47 UTC, `~/.npm/_logs/2026-09-06T21_47_02_166Z-debug-0.log`)

```text
21:44:15  the Orchestrator's tracked `npm install` regenerated package-lock.json (29 packages removed)
21:46:56  the U6 verifier's `npm test` began (`test:src:core` first)
21:47:02  scripts/deps.sh (SessionStart:resume hook) found the lockfile digest marker stale and ran `npm ci --ignore-scripts` in /home/user/scaffold
21:47:14  node_modules/playwright/index.js rewritten; node_modules/.package-lock.json 21:47:15
21:46:57  → the five browser-resolver cases in tests/src/core/templates.test.ts failed with ERR_MODULE_NOT_FOUND on /home/user/scaffold/node_modules/playwright/index.js; the `&&` chain stopped there
21:49:55  the Orchestrator's solo re-run of those cases: 5 passed | 27 skipped, 13.9 s
```

Reading: the verifier's `npm test` red is a host condition, not U6's: the session resume that followed the Orchestrator's turn boundary re-armed `scripts/deps.sh`, whose lockfile-digest marker no longer matched the regenerated `package-lock.json`, so it reinstalled `node_modules` under the running suite. The marker now matches the lockfile, so the next resume skips. The rest of the test chain never ran in that report and is the Orchestrator's own tracked run (`u6-npm-test-solo.log.txt`). The process rule lands in `CLAUDE.md` § Claude Code Cloud with this record.

## The `config` project under contention (2026-09-06 21:59 UTC, `u6-config-contended.log.txt`)

```text
npx vitest run --project config  beside  npx vitest run --project src:core, started together (load 0.08 before, 0.76 after)
config:   111 passed | 1 skipped, 7.49 s; the roll-up case 2587 ms (2276 ms idle in the unit's reading), the inventory case 1426 ms, the linter's capped cases under 400 ms each
src:core: 385 passed, 19.04 s
```

Reading: the `config` project's binding case stays the linter pair's worst case (two 15 s caps) rather than the roll-up, and under a concurrent suite the roll-up costs about 2.6 s. The 60,000 ms budget U6 set clears the capped pair with 30 s of room on this reading, so it stands, sized from a contended run as `.claude/rules/tests.md` § Expensive proofs requires; the rationale names the compiler and the extractor spawns in U6-fix.

## A second `--no-save` tarball install restores the registry copy of the first (`visits/swap-both-database.log.txt`)

`database` received scaffold's head start at 22:19 UTC (8 `^typescript` restrictions in the vendored lint config) and probe's at 22:21 UTC through a second `npm install --no-save <tarball>`; the second install reconciled the tree against the lockfile and put the registry `@orkestrel/scaffold` 0.0.63 back (0 restrictions, `resolved` at the registry) while leaving probe's `file:` install in place. The readiness check before slice 6 read it. Installing both tarballs in one invocation (`instruments/visits/swap-both.sh`) leaves both head starts present with the manifest and lockfile untouched. Reading: a checkout that takes more than one head start takes them in one `npm install --no-save` call; the slice 6 brief for `database` holds again.
