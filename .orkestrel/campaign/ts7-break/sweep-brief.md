# Unit ts7-break-sweep — every fleet checkout's dependence on the TypeScript 6 API, for a full break to 7

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached through the `agent` CLI in `--mode=ask`. You are the bench engine reading this brief inside your own CLI. Perform the assignment directly and spawn nothing. Work read-only: never create, edit, or delete a file, and never run a command that changes a tree (no `npm install`, no `git` write).

## Objective

Return a distillate, with `file:line` pointers, that lets an Orchestrator plan a full break from TypeScript 6.0.3 to 7.0.2 across the fleet with no `@typescript/typescript6` bridge and no in-process 6.x API anywhere: for every checkout under `/home/user/fleet/<package>` (every directory there is one published `@orkestrel/*` package) and for `/home/user/scaffold`, what depends on the in-process TypeScript API, what depends on tools that carry their own 6.x or 5.x compiler, and which files are vendored copies of scaffold's.

## Question

Per package, which sites load the TypeScript API in process, what do they call, which of those sites are the vendored pair scaffold regenerates, and which declared tools still carry a 5.x or 6.x compiler of their own?

## Context

**Already known** (the earlier absorb, `/home/user/scaffold/.orkestrel/campaign/ts7/absorb-distillate.md`, sampled `database`, `lsp`, `probe`, `contract`, `markdown`): every sampled package carries the vendored pair `tests/setupPolicy.ts` (an AST walk with `createSourceFile`, `forEachChild`, the `is*` guards, `canHaveModifiers`/`getModifiers`) and a generated `tests/distribution.test.ts` (`createProgram`, `getPreEmitDiagnostics`, `flattenDiagnosticMessageText`, `ModuleKind`, `ModuleResolutionKind`, `ScriptTarget`, `SymbolFlags`, `getTypeChecker`, `getExportsOfModule`, `getAliasedSymbol`); `database/tests/setupServer.ts` builds programs and reads exports; `lsp/tests/setupConformance.ts` walks imports; `probe/src/server/stages/TypeStage.ts` drives the in-process language service. Do not re-describe those members; cite the site and say "as recorded" where the earlier distillate already lists its members. What is unknown is the rest of the fleet and the per-package manifest facts.

**Evidence the Orchestrator supplies** (2026-09-05, from `/home/user/scaffold`):

```text
$ ls /home/user/fleet → abort agent brief browser budget codec console contract csv database emitter form guide html indexeddb interpret lsp markdown mcp middleware msg ndjson ollama pool probe process program qualifier queue rater reason relation router sea server sqlite sse table template terminal test timeout tool toolbox websocket worker workflow workspace
$ node node_modules/typescript/bin/tsc --version → Version 7.0.2 (scaffold); probe installs typescript 6.0.3 and @typescript/typescript6 6.0.2 (its landed change, uncommitted state pushed as 9331ef4)
$ git -C /home/user/scaffold show HEAD:tests/setupPolicy.ts | sha256sum → compute it yourself and compare each fleet copy
```

**Law.** Read `/home/user/scaffold/AGENTS.md` § Writing before writing the distillate: no counts of growable sets in prose (a table row per member is fine), plain sentences, `file:line` pointers.

## Rows to return

1. **Manifest facts, one table row per package (every directory under `/home/user/fleet`, plus scaffold):** the `typescript` range in `devDependencies`, whether `@typescript/typescript6` is declared (any field), any `peerDependencies` naming `typescript`, whether `vue-tsc`, `vite-plugin-dts`, `unplugin-dts`, or `@microsoft/api-extractor` is declared, and which `package.json` scripts run `tsc`, `vue-tsc`, or a `dts`-bearing `vite build` (the `build:src:*` scripts and the `configs/src/vite.*.config.ts` files that call `dts(`).
2. **In-process API sites beyond the vendored pair, one row per site:** for every file under `src/`, `app/`, `tests/`, `configs/`, and `scripts/` in every package that imports or requires `typescript` or `@typescript/typescript6` at runtime (not `import type`), the file, the line, and the members called, with one sentence on what the site does. Name the packages whose only sites are the vendored pair. Separately list every `import type` from `typescript` in `src/` (a published declaration that imports the 6.x types is a break item too).
3. **The vendored pair per package:** whether `tests/setupPolicy.ts` is byte-identical to scaffold's committed copy (`git -C /home/user/scaffold show HEAD:tests/setupPolicy.ts`), and whether `tests/distribution.test.ts` carries the `import ts from 'typescript'` line or the bridge line, with the line number.
4. **Guides and TSDoc that name the 6.x API or `tsc`:** every `guides/*.md` line across the fleet that names `createProgram`, `transpileModule`, `createSourceFile`, `createLanguageService`, `ts.sys`, `typescript@6`, `@typescript/typescript6`, `vue-tsc`, or `tsgo`, with the file and line — these move with the code.
5. **Declaration outputs:** for every package with a `dts(` call, the `bundleTypes`/`rollupTypes` shape and whether `dist/**/*.d.ts` is one rolled-up file or a tree (read the published `package.json` `exports`/`types` fields), so the rollup path can be planned.
6. **Unknowns**, each named with what was read and what was not.

## Output

Distillate only, in the sections named by the rows, each row with its `file:line` evidence, then Unknowns. No process diary, no raw dumps, no code blocks longer than the evidence needs. End with the line `Deviation: none` or a deviation naming what stopped you.
