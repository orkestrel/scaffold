# Orchestrator measurements for the ts7 campaign

Taken by the Orchestrator on 2026-09-05 in `/home/user/scaffold` (typescript 6.0.3 installed, Node v22.22.2), each with the command that produced it. Nothing here installed into the repository: TypeScript 7.0.2 ran through the `npx` cache and a scratch install under the session scratchpad.

## The registry

```text
$ npm view typescript dist-tags → latest 7.0.2, rc 7.0.1-rc, next 7.1.0-dev.20260905.1, beta 6.0.0-beta
$ npm view typescript@7.0.2 exports → ".": "./lib/version.cjs"; "./unstable/sync", "./unstable/async", "./unstable/fs", "./unstable/proto", "./unstable/ast" (+ "/is", "/factory", "/utils", "/scanner", "/visitor", "/clone"); no main, no types
$ npm view typescript@7.0.2 bin → tsc: bin/tsc; dependencies and optionalDependencies: @typescript/typescript-<platform> 7.0.2 (linux-x64, darwin-arm64, win32-x64, and others)
$ npm pack typescript@7.0.2 --dry-run → lib/tsc.js (609 B, a launcher that execve's the platform binary), vendor/vscode-jsonrpc, 416 files, no lib/typescript.js
$ npm view typescript@6.0.3 exports → "./lib/typescript.js"
$ npm view @typescript/native-preview dist-tags → latest 7.0.0-dev.20260707.2 (bin tsgo)
$ npm view @typescript/api → E404 (no such package)
$ peerDependencies.typescript: unplugin-dts@1.1.0 ">=4"; @microsoft/api-extractor@7.59.0 depends on typescript "5.9.3" (bundled); vite-plugin-dts@5.1.0, vitest@5.0.0, vite@latest, oxlint@1.81.0: none declared
```

## TypeScript 7's tsc over scaffold's own configs (instruments/tsc7-probe.sh)

```text
$ npx -y -p typescript@7.0.2 tsc --version → Version 7.0.2
$ npx -y -p typescript@7.0.2 tsc --noEmit -p tsconfig.json → exit 0
$ … -p configs/src/tsconfig.core.json → exit 0 ; -p configs/src/tsconfig.server.json → exit 0 ; -p configs/src/tsconfig.bin.json → exit 0
$ npx tsc --noEmit -p tsconfig.json (6.0.3) → exit 0 ; -p configs/src/tsconfig.core.json → exit 0
$ npx -y -p typescript@7.0.2 tsc -p configs/src/tsconfig.core.json --declaration --emitDeclarationOnly --noEmit false --outDir <scratch>/decl7 → exit 0, 13 .d.ts files
```

Reading: the type gate (`npm run check`) moves to 7.0.2 with no source or config change, and 7.0.2 emits declarations for the core project.

## The import surface under 7.0.2 (scratch install)

```text
$ node -e "import('typescript').then(m=>…)" → default: object; keys: default,version,versionMajorMinor; version 7.0.2
$ import('typescript/unstable/ast') → 409 exports: createScanner, SyntaxKind, ScriptTarget, NodeFlags, forEachLeadingCommentRange, forEachTrailingCommentRange, getJSDocTags, getLeadingCommentRanges, findNextToken, findPrecedingToken, 347 is* guards (unstable/ast/is), visitEachChild, visitNode, visitNodes (unstable/ast/visitor); no createSourceFile, no getJSDocCommentsAndTags
$ import('typescript/unstable/sync') → API, InternalAPI, Snapshot, Project, Program, Checker, Emitter, NodeHandle, Symbol, DiagnosticCategory, ModuleKind, …
```

Reading: `import ts from 'typescript'` no longer carries `createSourceFile`, `transpileModule`, `forEachChild`, or any compiler member; every such call in the tree throws under 7.0.2. Parsing text in-process has no replacement in the package; the AST is reached through the native process.

## Node's own type stripping

```text
$ node --version → v22.22.2
$ node -e "require('node:module').stripTypeScriptTypes('const x: number = 1 as number; export const y = <T,>(a: T): T => a', {mode:'transform'})" → "const x = 1;\nexport const y = (a)=>a;\n"  (ExperimentalWarning: stripTypeScriptTypes is an experimental feature)
```

Reading: `ts.transpileModule` over a guide fence has a runtime replacement in the Node the line already requires.

## The sync API over scaffold's core project (instruments/api-probe.mjs)

```text
$ node api-probe.mjs   (typescript@7.0.2 in a scratch install; cwd /home/user/scaffold)
projects: 1 project: /home/user/scaffold/configs/src/tsconfig.core.json rootFiles: 13 ms: 62
sourceFileNames: 105
sourceFile keys: parent,view,index,_byteIndex,_sourceFile,nodes,… statements: 6
function declarations: 1 createBlueprint
node keys: parent,view,index,_byteIndex,_sourceFile
ast.getJSDocTags: function  ast.getJSDocCommentsAndTags: undefined  ast.getLeadingCommentRanges: function
node tags: param,param,returns,throws,link,remarks,example
symbol: ok  symbol proto: …,getJsDocTags,getDocumentationComment
documentation: "Constructs a Blueprint from a name and the fields that differ from the defaults."
tags: param="name - The bare workspace name." | param="input - …" | returns="The filled blueprint, …" | throws="{" | link="ScaffoldError} coded `INVALID` …" | remarks="A blueprint is a closed record, …" | example="```ts\nimport { createBlueprint } from '@orkestrel/scaffold…"
semantic diagnostics (file): 0
emitter proto: constructor,printNode
total ms: 61
```

Reading: `API.updateSnapshot({ openProjects: [config] })` → `Snapshot.getProject(config)` → `project.program.getSourceFile(file)` → statements the `unstable/ast` guards recognise; `ast.getJSDocTags(node)` returns the tags on the node; `project.checker.getSymbolAtLocation(node.name)` → `Symbol.getDocumentationComment(checker)` and `getJsDocTags(checker)` return the summary and the tag texts (the `{@link}` inside a `@throws` splits into a `throws` part and a `link` part, and the summary renders `{@link Blueprint}` as `Blueprint`). The whole round trip over the core project took 61 ms. `Symbol.getDocumentationComment()` without the checker argument throws.

## The declaration build under 7.0.2 (instruments/dts-probe.sh, dts-probe-2.sh)

```text
$ npx vite build   (scratch project: vite latest, vite-plugin-dts 5.1.0 and 5.0.3, typescript 7.0.2, scaffold's dts options)
Error: [unplugin-dts] The installed "typescript" package does not provide the JavaScript Compiler API (this happens with TypeScript 7+), and the fallback "@typescript/typescript6" was not found.
Please install it alongside TypeScript 7:  npm install -D @typescript/typescript6
This allows TypeScript 7 to be used for compilation while keeping the JS API available for tooling.
See: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-beta/
$ npx vite build   (control: vite-plugin-dts 5.0.3 with typescript 6.0.3) → exit 0, dist/index.d.ts carries the doc block, @remarks, and @example
$ npm view @typescript/typescript6 → latest 6.0.2, main ./lib/typescript.js ("TypeScript is a language for application scale JavaScript development")
```

Reading: `unplugin-dts` (both installed lines) resolves the in-process API from `@typescript/typescript6` when the project's `typescript` is 7 or later. That package is Microsoft's bridge: the 6.x JavaScript API published under a scoped name so a project can compile with 7 while its tooling keeps the old API. The second probe (`dts-probe-2.sh`) measures the build with the bridge installed and api-extractor over tsgo-emitted declarations; its results are appended when it returns.

## The web pass (research-report.md, researcher on Sonnet)

Microsoft's 7.0 post (2026-07-08) states 7.0 ships "without shipping an API" and that 7.1 ships "a new (and different) API", so the `unstable/*` surface the 7.0.2 package carries is a preview with no stability promise; the 6.0 post (2026-03-23) lists the deprecations 7.0 removes outright (`--baseUrl`, `--moduleResolution node|node10|classic`, `--module amd|umd|systemjs|none`, `--target es5`, `--downlevelIteration`, `--esModuleInterop false`, `--outFile`) and the changed defaults (`--strict`, `--module esnext`, `--types []`, `--rootDir`); scaffold's tsconfigs use none of the removed options (the `tsc` 7.0.2 runs above exit 0). `vue-tsc` has no TypeScript 7 support yet (vuejs/language-tools issue 5381, open since 2026-05-26). oxlint's type-aware linting runs through `tsgolint`, not the `typescript` package. api-extractor always analyses with its own bundled TypeScript (5.9.3 at 7.59.0). `process.execve` needs Node 22.15 or later; this container runs v22.22.2.

## The declaration build with the bridge (instruments/dts-probe-2.sh)

```text
$ npm install typescript@7.0.2 @typescript/typescript6@latest vite-plugin-dts@5.0.3   (scratch project)
typescript 7.0.2 ; @typescript/typescript6 6.0.2 ; vite-plugin-dts 5.0.3 ; unplugin-dts 1.0.3 ; @microsoft/api-extractor 7.59.0
$ npx vite build → exit 0 ; [unplugin:dts] Start bundling declaration files... Analysis will use the bundled TypeScript version 5.9.3 ; Declaration files built in 577ms ; dist/index.d.ts carries the doc block, @remarks, and @example
$ (vite-plugin-dts 5.1.0 / unplugin-dts 1.1.0) npx vite build → exit 0 ; Declaration files built in 542ms
$ node -e "const ts=require('@typescript/typescript6'); …" → version 6.0.3 createSourceFile function transpileModule function forEachChild function sys object
$ npx api-extractor run --local --config <scratch>/api-extractor.json  (over the 13 .d.ts files tsc 7.0.2 emitted for scaffold core) → exit 1: "Unable to find a package.json file for the project being analyzed" with <scratch>/decl7/package.json present (346 bytes); unreached, and not on the path the bridge keeps working
```

Reading: the current build path (`vite build` with `vite-plugin-dts`, api-extractor's bundled 5.9.3 for the rollup) works unchanged under TypeScript 7 once `@typescript/typescript6` is declared as a development dependency; `unplugin-dts` resolves the bridge on its own. The bridge is a complete 6.x in-process API, so `import ts from '@typescript/typescript6'` is a drop-in for every test and policy site that imports `typescript` today. The tsgo-emit-plus-direct-api-extractor path was not proven and is not needed while the bridge stands.

## Rehearsal 1: a scratch copy of scaffold on 7.0.2 with the bridge (instruments/rehearsal.sh)

A `git archive` of `HEAD` in the scratchpad, `typescript` set to `^7.0.2` and `@typescript/typescript6` `^6.0.2` added, the four test files and the distribution-proof template re-pointed from `'typescript'` to `'@typescript/typescript6'`, then `npm install` and each gate.

```text
format:check, lint:check, check → exit 0 (the type gate runs on tsc 7.0.2 unchanged)
build → exit 1 at build:src:core: [unplugin-dts] Failed to bundle declaration files due to an API Extractor limitation when analyzing the symbol "Readonly" … Original error: Internal Error: Unable to follow symbol for "Readonly"
test:policy → exit 0 ; test:guides → exit 0   (the vendored policy sweep and the guides parity suite run on the bridge as-is)
test:src:core → 6 failed / 384 passed: tests/src/core/constants.test.ts "emits a TypeScript range bounded below 7" (expect(matchesRange(emitted, '7.0.2')).toBe(false)), tests/src/core/compilers.test.ts blueprintToDevDependencies rows and manifest snapshots that carry the `typescript` range (3 snapshots)
test:src:server, test:setup → git ls-files fails (the copy is not a repository) and readHostFloor reports host.json stale at tests/setupPolicy.ts (build:inventory never ran because build failed earlier)
test:src:bin → 13 failed: the built entry is absent (dist/bin missing after the build failure)
test:config → host inventory stale at tests/setupPolicy.ts (same cause)
test:distribution --mode release (npm 11) → 4 failed: dist/src/server absent (same cause)
```

Cause of the build failure, read from the installed packages: `unplugin-dts` computes `getTsLibFolder()` as the `typescript` package's root path (`dist/shared/unplugin-dts.BU1tibsL.mjs:253-256`) and passes it to api-extractor as `typescriptCompilerFolder` (`:584-590`, spread after by the user's `invokeOptions`); api-extractor's `CompilerState` then sets `compilerHost.getDefaultLibLocation` to `<that folder>/lib` (`lib-esm/api/CompilerState.js:101-104`). Under 7.0.2 `node_modules/typescript/lib/` holds `getExePath.js`, `tsc.js`, and `version.cjs` and no `lib.*.d.ts`; the 107 library files live in `node_modules/@typescript/typescript-linux-x64/lib/`. The bridge `@typescript/typescript6/lib/` holds `typescript.js`, `typescript.d.ts`, `tsserverlibrary.*`, and `tsc.js`, and no library files either. So the rollup's analysis program has no global lib and cannot resolve `Readonly`. The fix under test in rehearsal 2 is `bundleTypes.invokeOptions.typescriptCompilerFolder: undefined`, which lets api-extractor use its bundled 5.9.3 compiler's own library folder; `unplugin-dts` 1.1.0 carries the same `getTsLibFolder` (`:334-337` in the dts scratch install), so the override is needed on both plugin lines.

Tests that the range bump makes false, to be carried by the implementation unit: the `constants.test.ts` upper-bound assertion and the `compilers.test.ts` manifest snapshots and rows that embed the `typescript` range.

## Rehearsal 2: the override, the rebuild, and the remaining reds (instruments/rehearsal-2.sh)

The same scratch copy, `bundleTypes.invokeOptions.typescriptCompilerFolder: undefined` added to `configs/src/vite.core.config.ts` and `vite.server.config.ts` (the option exists at `unplugin-dts/dist/shared/unplugin-dts.PNIpryzr.d.ts:293` as `invokeOptions?: ExtractorInvokeOptions`), the copy made a git repository so `git ls-files` answers, then the gates.

```text
build → exit 0 in 8s   (api-extractor analyses with its bundled 5.9.3 compiler's own library folder)
test:src:server, test:config, test:setup, test:policy, test:guides → exit 0
test:src:core → 7 failed / 383 passed: constants.test.ts "emits a TypeScript range bounded below 7"; compilers.test.ts blueprintToDevDependencies rows and manifest snapshots carrying the range; blueprintToScripts setup-proof registration; "blueprintToRootVite fixed proofs > keeps this repository byte-identical to every configuration it generates" (the vite templates in src/core/templates.ts still lack the override the checked-in configs now carry)
test:src:bin → 5 failed / 240 passed: CLI.test.ts "CLI audit" rows whose expected messages and fixture manifests embed `typescript: '^6.0.3'` (tests/src/bin/CLI.test.ts:1172, :1206, :1223, :1258, :1276, :1525; tests/src/bin/helpers.test.ts:344; tests/src/core/fixtures/app-only-toolchain.txt:14, setup-false-manifest.txt:72, source-manifest.txt:72)
test:distribution --mode release (npm 11) → 1 failed / 4 passed: "installs the packed scaffold and passes one generated core/server workspace through prepublishOnly" (expected 1 to be 0): the generated workspace derives its devDependencies from BASE_DEV_DEPENDENCIES and DECLARATION_DEV_DEPENDENCIES and its vite configs from the templates, neither of which the rehearsal changed, so it has no bridge and no override
core rollup: dist/src/core/index.d.ts 229182 bytes against the repository's 6.0.3 build at 229169; the only difference is the template text at line 104 now carrying the bridge import
host.json: rebuilt by build:inventory (2 lines change: the tests/setupPolicy.ts digest and size)
```

Reading: the move is a bounded change in scaffold — the two dependency lines in `package.json`, the bridge in the shared dependency table, the import swap at five sites plus the template, the `invokeOptions` override in the two checked-in vite configs and the two `dts` templates, the range literals in the tests and fixtures, and the rebuilt `host.json` — after which every gate the rehearsal ran is green except the ones the unchanged templates fail, which the same change closes.

## Settled after the design round

```text
$ npm view @typescript/typescript6 versions → ["6.0.0","6.0.1","6.0.2"]
$ node -e "const ts=require('@typescript/typescript6'); …" (rehearsal install) → bridge lib version 6.0.3 | getDefaultLibFilePath: …/node_modules/@typescript/old/lib/lib.esnext.full.d.ts | exists: true
$ @typescript/typescript6/package.json → dependencies { "@typescript/old": "npm:typescript@^6" }, files bin, lib, LICENSE.txt, README.md
$ md5sum tests/setupPolicy.ts against every /home/user/fleet/<package>/tests/setupPolicy.ts → identical=48 differing=[]
$ /home/user/fleet/probe/package.json:116-133 → peerDependencies typescript "^6.0.3" (optional), engines "^22.12.0 || >=24.0.0"; src/server/helpers.ts:399-407 loadWorkspaceModule(workspace, 'typescript') → createRequire(workspace/package.json)('typescript')
```

Reading: the bridge's own version (6.0.2) is the wrapper's; the compiler it re-exports is a real `typescript@6.x` install aliased as `@typescript/old`, which is why its library files resolve and why its `version` reads 6.0.3. One vendored edit to `tests/setupPolicy.ts` reaches every fleet target through `repair`, because every copy is byte-identical today. `probe`'s `TypeStage` resolves the target workspace's own `typescript`, so a target that moves to 7 loses the `prove` instrument until `probe` releases a fallback to the bridge.

## The probe deciding run (instruments/probe-decide.sh)

The chain in `/home/user/fleet/probe` after both probe units exited and after the Orchestrator's receipt-fence fix (`oxlint@1.80.0` → `oxlint@1.81.0` on the `verdict.receipt` line of `guides/probe.md`), on the 4-CPU container with the four read-only audit lanes reading but no other gate running (`node-count=0` outside the chain).

```text
npm run format:check → exit 0 in 4s
npm run lint:check → exit 0 in 1s
npm run check → exit 0 in 7s
npm run build → exit 0 in 8s
npm run test → exit 1 in 124s: Test Files 2 failed | 9 passed (11); Tests 4 failed | 230 passed (234)
  tests/src/bin/main.test.ts: answers both protocol eras…, carries the verdict record…, answers a rendering past the content bound… — every rendered text is "The probe could not arm: The Oxlint language server exited with code 0"
  tests/src/server/Probe.test.ts: mints receipts only when every stage executes cleanly… — ProbeError … Caused by: LSPError: The LSP request 'initialize' exceeded its deadline
solo re-run, tests/src/bin/main.test.ts alone → exit 0: Tests 16 passed (16) in 49.57s
git status --short → the nine files the two units own, nothing else
```

Reading: every red row is the same timing failure — the Oxlint language server does not answer `initialize` inside its deadline while the whole suite runs its workers on four CPUs — and the same rows were red in the first unit's run (11:54, before the second unit) and in the second unit's run (12:09), each time on that message. Neither unit touches the lint stage or `oxlint`; the change is the `typescript` loader, the peer range, and the type imports. The bin file alone is green on the idle host. The `Probe.test.ts` file alone is the Orchestrator's second deciding run (`decide-probe-solo.log.txt`), recorded in the following section.

## The second probe deciding run: `Probe.test.ts` alone on the idle host

```text
$ ps -eo comm | grep -c '^node$' → 0 at launch (12:25:57; the audit lanes were reading, no gate ran)
$ npx vitest run tests/src/server/Probe.test.ts → exit 0: Test Files 1 passed (1); Tests 28 passed (28); Duration 113.51s
```

Reading: with the bin file green alone at 12:22 and this file green alone at 12:27, every red row of the whole-suite run passes on the idle host, so the probe checkout's gates read green on the Orchestrator's deciding runs and the whole-suite red is the four-CPU load, not the change. The logs are retained under `evidence/probe-decide/`.

## The probe lockfile and npm 11 (objective F6 of the probe audit)

```text
$ npm --version → 10.9.7 ; /opt/npm11/bin/npm --version → 11.19.1
$ git show b331d93:package-lock.json | grep -c '"libc"' → 16 ; grep -c '"libc"' package-lock.json (after the units' npm 10.9.7 install) → 0
$ PATH=/opt/npm11/bin:$PATH npm install → exit 0, found 0 vulnerabilities ; libc rows → 0 ; git diff --stat package-lock.json unchanged (34 insertions, 49 deletions against b331d93)
$ PATH=/opt/npm11/bin:$PATH npm install --package-lock-only --ignore-scripts → exit 0 ; libc rows → 0
$ (scratch: probe's package.json alone, no lock) PATH=/opt/npm11/bin:$PATH npm install --package-lock-only --ignore-scripts → exit 0 ; libc rows → 26 ; every package present in both ; 66 field differences against the tree's lock, all version/resolved/integrity moves of transitive packages (@jridgewell/sourcemap-codec 1.5.5 → 1.6.0, @oxc-project/types 0.147.0 → 0.148.0, every @rolldown/binding-* 1.2.6 → 1.2.7, …) ; root devDependencies and peerDependencies equal
$ scaffold's own lock at 47200d6c → 0 libc rows ; guide, test, contract locks → 16 each
```

Reading: npm 11.19.1 writes `libc` on the entries it resolves fresh and leaves an existing entry as it is, so the rows npm 10.9.7 dropped come back only through a fresh resolution, which also moves transitive versions this change does not own. The lockfile therefore keeps the baseline's versions plus the bridge rows and no `libc` metadata, the same state scaffold's own lock has carried since the wave; the loss is accepted and recorded rather than repaired by hand, which the merge rules forbid for a lockfile.

## Probe deciding run 2: the whole suite after the fix unit and the lockfile pass

```text
$ npm test (13:01, node-count=0 at launch, the round-2 audit lanes reading) → exit 1: Test Files 1 failed | 10 passed (11); Tests 1 failed | 236 passed (237)
  tests/src/server/Probe.test.ts: mints receipts only when every stage executes cleanly… — ProbeError: The probe could not arm: The Oxlint language server exited with code 0 … Caused by: LSPError: The LSP request 'initialize' exceeded its deadline
$ npx vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/Probe.test.ts (13:05:57, node-count=0) → exit 0: Tests 28 passed (28); Duration 97.57s
```

Reading: the one red row is the standing Oxlint `initialize` deadline under the whole-suite worker load, and it passes alone; every other file, the bin file included, is green in the whole run, and the fix unit's own whole run at 12:58 was green throughout. The probe checkout's gates read green on the deciding runs. Logs under `evidence/probe-decide/decide-2-*.log.txt`.
