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
