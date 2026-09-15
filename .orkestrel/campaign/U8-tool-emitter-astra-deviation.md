## Deviation state

**Stopped under the brief’s deviation contract.** The [emitter guide](C:/Users/mikes/WebstormProjects/scaffold/guides/emitter.md) requires a type-alias event map. The brief requires an interface, which the installed emitter rejects with **TS2344: missing string index signature**.

The brief needs to permit `ToolManagerEventMap` as a type alias before implementation can proceed.

## Touched files

None. The existing U8a manifest and lockfile changes remain untouched.

`git diff --stat` returned:

```text
 package-lock.json | 4 ++--
 package.json      | 3 ++-
 2 files changed, 4 insertions(+), 3 deletions(-)
```

`git status --porcelain` returned:

```text
 M package-lock.json
 M package.json
```

## Baseline readings

The baseline commands returned:

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run check` | 0 | Typecheck passed |
| `npm.cmd run test:src:core` | 0 | 74 tests passed across 6 files |

## Semantic proofs

No tests were added or implemented before the mandatory stop. Red-then-green readings are unavailable for registration, replacement, removal, clearing, initial hooks and listener isolation, destruction, and execution without events.

## Unknown’s reading

The emitter guide states that `emit()` does nothing after `destroy()`. No `ToolManager.destroy()` implementation was landed, so later registry behavior remains unimplemented.

## Conflict observation

The following exact PowerShell command compiled the requested event map in memory without writing files. It returned exit **1**, with **1 diagnostic: TS2344**.

```powershell
@'
import ts from 'typescript'
const file = 'u8.ts'
const source = `import type { EmitterInterface } from '@orkestrel/emitter'; import type { ToolInterface } from './src/core/types.js'; interface ToolManagerEventMap { readonly add: readonly [tool: ToolInterface]; readonly remove: readonly [tool: ToolInterface]; readonly clear: readonly [tools: readonly ToolInterface[]]; } type RegistryEmitter = EmitterInterface<ToolManagerEventMap>;`
const options = { noEmit: true, strict: true, skipLibCheck: true, module: ts.ModuleKind.NodeNext }
const host = ts.createCompilerHost(options)
const read = host.getSourceFile.bind(host)
host.getSourceFile = (name, ...args) => name === file ? ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true) : read(name, ...args)
const diagnostics = ts.getPreEmitDiagnostics(ts.createProgram([file], options, host))
for (const diagnostic of diagnostics) console.log(diagnostic.code, ts.flattenDiagnosticMessageText(diagnostic.messageText, ' '))
console.log('Diagnostics:', diagnostics.length)
process.exitCode = diagnostics.length ? 1 : 0
'@ | node --input-type=module
```

This is a compiler observation; no `prove` receipt was available.

## Acceptance commands

Acceptance verification stopped at the contract conflict. `check` and `test:src:core` have only the baseline readings listed earlier. `lint:check`, `test:guides`, `test:setup`, `test:policy`, `test:config`, and `format:check` were not run; exit codes and counts are unavailable.