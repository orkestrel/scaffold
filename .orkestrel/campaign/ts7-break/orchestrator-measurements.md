# Orchestrator measurements — the full TypeScript 7 break (scoping)

Taken 2026-09-05 on the four-CPU container, Node v22.22.2, from `/home/user/scaffold` (typescript 7.0.2 installed) unless a path says otherwise. Instruments under `instruments/`.

## Fence transpile: `node:module` `stripTypeScriptTypes`

```text
$ node instruments/strip-types-probe.mjs (Node v22.22.2; ExperimentalWarning printed once)
plain            [strip] ok  [transform] ok (source map appended as a data URL)
enum             [strip] FAILED: TypeScript enum is not supported in strip-only mode   [transform] ok (IIFE emit)
namespace        [strip] FAILED …not supported in strip-only mode                       [transform] ok
parameter property [strip] FAILED …not supported in strip-only mode                     [transform] ok (assigns in the constructor)
import x = require() [strip] FAILED …not supported in strip-only mode                   [transform] ok (const x = require())
satisfies / as   [strip] ok  [transform] ok
```

Reading: `transform` mode covers every construct the fleet's fences could carry; `strip` mode refuses the four constructs the coding contract already forbids or the fences never write. The function is Stability 1 (experimental) in 22.22.2.

## TypeScript 7.0.2's language server

```text
$ node node_modules/typescript/bin/tsc --lsp --stdio  (spawned with pipes from the scaffold root; instruments/tsgo-lsp-probe.mjs)
initialize → answered in 46 to 51 ms; capabilities carry textDocumentSync {openClose, change: 2, save}, hover, definition, references, completion, codeAction, rename, and diagnosticProvider {identifier: "typescript", interFileDependencies: true, workspaceDiagnostics: false}
initialized → the server logs "file watching: disabled (client lacks dynamic watch registration …)" and registers workspace/didChangeConfiguration
didOpen of file:///…/src/core/zz-overlay-probe.ts (no file on disk; text with a type error) → no publishDiagnostics within 10 s
textDocument/diagnostic on that URI → no answer within 7 s in the first run (the second run's longer schedule is recorded in the next section)
```

## The language server, with the server's own requests answered (`instruments/tsgo-lsp-probe-3.mjs`, log `tsgo-lsp-3.log.txt`)

The first two runs answered nothing after `initialize` because the server's `client/registerCapability` request went unanswered; a client that answers server requests is served.

```text
initialize → 47 ms; initialized; client/registerCapability answered
didOpen file:///…/src/core/zz-overlay-probe.ts (not on disk, text with `export const VALUE: number = 'text'`) at 2.5 s
textDocument/diagnostic (1) sent at 4.0 s → answered at 4.5 s: kind "full", one item: range 1:13–1:18, severity 1, code 2322, source "ts", "Type 'string' is not assignable to type 'number'."
  (the answer arrives once the project has loaded; publishDiagnostics for tsconfig.json (empty) arrives at the same moment, so the overlay was attributed to the root tsconfig.json project)
textDocument/diagnostic (2) at 16.0 s → 1 ms; hover at 17.0 s → 4 ms: "const VALUE: number"
didOpen of the on-disk src/core/index.ts and its diagnostic → 1 ms, no items
shutdown with `params: null` → InvalidParams "expected no params" (send it without params)
```

Reading: the 7.0.2 language server serves an overlay document with full semantic diagnostics and hover, about 2 s after the first open while it loads the project, then within milliseconds. Project selection is the server's own (the nearest `tsconfig.json` containing the file), so the root project judged a `src/core` candidate here rather than `configs/src/tsconfig.core.json`; whether a client can name the project is research row 1's question.

## The `--api` surface with an overlay filesystem (`instruments/tsgo-api-overlay-probe.mjs`)

```text
new API({ cwd, fs: overlay, collectTiming: true }) → 5 ms
api.parseConfigFile('configs/src/tsconfig.core.json') → 10 ms; 14 root files; the overlay listed because getAccessibleEntries merges it into src/core
api.updateSnapshot({ openProjects: [config] }) → 58 ms; project found; program.getSourceFile(overlay) found
program.getSemanticDiagnostics(overlay) → 61 ms: [{ fileName, pos: 60, end: 65, code: 2322, category: 1, text: "Type 'string' is not assignable to type 'number'." }]
program.getSyntacticDiagnostics(overlay) → []; whole-project semantic count 1; 7 requests, 99 ms round trip, 95 ms server time
```

A first attempt with `createVirtualFileSystem` alone reported "Cannot find module '@orkestrel/contract'" over the whole project, because that helper is a complete virtual tree that answers `false` for every path it does not hold; an overlay must answer `undefined` for every path but its own so the server falls back to the real filesystem (`fs.d.ts` documents the contract).

Reading: the `--api` surface checks an in-memory candidate under the scoped project the probe already selects, with positions, codes, and message text, in about 60 ms end to end, out of process. It is the preview surface 7.1 replaces; the language server is the protocol-stable surface and needs a project-selection answer.

## One `--api` client across a case and a control (`instruments/tsgo-api-mutation-probe.mjs`)

```text
case  (string into number)                       → 64 ms: ["2322@13-18 Type 'string' is not assignable to type 'number'."]
control after updateSnapshot({ fileChanges: { changed: [overlay] } }) → +3 ms: ["2322@44-49 Type 'number' is not assignable to type 'string'."]
clean draft after a second announced change     → +2 ms: []
a mutated overlay with no fileChanges announced → the old, clean answer (the server caches by announcement)
```

Reading: one spawned client serves the probe's case-then-control flow at the same path in milliseconds per round, provided every draft change is announced through `fileChanges`.

## Declarations: `tsc` 7 emits, api-extractor's own engine rolls up (`instruments/api-extractor-over-tsc7.sh`)

```text
$ node node_modules/typescript/bin/tsc -p configs/src/tsconfig.core.json --declaration --emitDeclarationOnly --noEmit false --outDir <scratch>/out → exit 0; 13 .d.ts files
$ api-extractor 7.59.0 (lib-commonjs entry; "Analysis will use the bundled TypeScript version 5.9.3"; no typescriptCompilerFolder; a package.json beside the emit, which the Collector requires) → succeeded=true errors=0 warnings=196 (every warning ae-missing-release-tag, the same class the shipped build reports)
$ wc -l rollup/index.d.ts → 3440, the same as dist/src/core/index.d.ts
$ diff -w (blank and comment lines dropped) shipped ↔ new → 12 lines: the five external imports read `import type { … }` in the new rollup and `import { … }` in the shipped one; nothing else differs
```

Reading: the declaration rollup needs no 6.x compiler of ours: TypeScript 7's `tsc` emits the tree and api-extractor rolls it up with the compiler it bundles, and the result is the shipped rollup up to `import type`. What goes is `vite-plugin-dts`/`unplugin-dts`, whose only role was to run `createProgram` for the emit. Whether api-extractor's bundled 5.9.3 is acceptable is a decision: it is api-extractor's own engine, not a dependency of ours on the 6 major, and it is the same engine the shipped rollups were made with.

## `rolldown-plugin-dts` 0.28.5 with `generator: 'tsgo'` (scratch install; `instruments/rolldown-dts-build.mjs`)

```text
$ npm install rolldown rolldown-plugin-dts typescript@7.0.2 (scratch) → rolldown 1.2.7, rolldown-plugin-dts 0.28.5, typescript 7.0.2
$ node build.mjs with dts({ tsconfig: configs/src/tsconfig.core.json, generator: 'tsgo', emitDtsOnly: true }) → the plugin runs tsc 7 with `--noEmit false --declaration --emitDeclarationOnly -p <tsconfig> --outDir <tmp> --rootDir /home/user/scaffold/configs/src --noCheck` → error TS6059: File 'src/core/index.ts' is not under 'rootDir' 'configs/src' (the plugin derives rootDir from the tsconfig's directory, not from the config's own `rootDir: ../../src/core`)
```

Reading: the `tsgo` generator drives TypeScript 7's own binary and needs no other compiler, but its `rootDir` derivation does not fit a tsconfig that lives under `configs/src/`; whether its options can name the root is the next probe. It is also a new dependency and a second rollup engine beside api-extractor, so it is an option, not the recommendation, unless api-extractor's engine is refused.

The retry with the plugin's `cwd` set to the workspace root fails the same way: `createGenerator` fixes `rootDir: tsconfig ? path.dirname(tsconfig) : cwd` (`dist/index.mjs:325`), so the `tsgo` generator serves only a tsconfig that sits at the source root. A scoped `configs/src/tsconfig.*.json` cannot drive it without a root-level tsconfig per environment or an upstream change.

## The remote source file, the guards, and the async client (`instruments/tsgo-api-ast-probe.mjs`)

```text
program.getSourceFile(overlay) → a RemoteSourceFile with `text` (209 chars) and `statements`
each statement carries kind, pos, end, and modifiers (94 = ExportKeyword on the exported function and constant); file.text.slice(pos, end) returns the statement's source text
the unstable/ast guards apply to remote nodes: isImportDeclaration, isFunctionDeclaration, isVariableStatement, isExportAssignment each true on its statement
fn.name.text = greet; fn.parameters[0].name.text = name; checker.getDocumentationCommentOfSymbol(symbol) = "Greets."
async client (typescript/unstable/async): updateSnapshot + getProject + getSemanticDiagnostics(overlay) = 66 ms, no synchronous pipe read on the event loop
```

Reading: the generated-text lifts in `tests/guides.test.ts` and `tests/src/core/templates.test.ts` have what they read today — statements, export modifiers, names, parameters, statement text — through a scratch project on the `--api` surface without `canHaveModifiers`/`getModifiers`; and the async client serves probe's type stage without holding the host's loop.

## The host inventory (host.json)

Vendored under `configs/`: `configs/helpers.ts`, `configs/policy.ts`, and `.oxlintrc.json`; the `configs/src/vite.*.config.ts` files are package-owned (generated once, never restored by `repair`), so the fleet visit edits them per package. `.oxlintrc.json` being vendored means a package-specific lint override cannot live there.

## Instrument debris, removed

The first declaration-emit run left 13 untracked `.d.ts` files under `src/core/` (the run before the `--outDir` argument was honoured); the objective lane found them; they were removed by name after `git ls-files` confirmed none is tracked. The instruments now write only under the scratchpad.
