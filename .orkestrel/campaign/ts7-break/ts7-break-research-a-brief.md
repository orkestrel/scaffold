# Unit ts7-break-research-a — TypeScript 7's language server and API as the bridge-free type stage

`researcher` on Sonnet, a native Claude Code subagent with `WebFetch` and `WebSearch`. Perform the assignment directly and spawn nothing. Read-only. Primary sources first (microsoft/TypeScript on GitHub after the typescript-go merge of 2026-09-01, the TypeScript devblog, the `typescript` 7.0.2 package's own files under `/home/user/scaffold/node_modules/typescript/`), secondary sources named as such. Cite every fact with its URL or `file:line`. Today is 2026-09-05.

## Question

Can `@orkestrel/probe`'s type stage — today an in-process 6.x language service that type-checks candidate drafts held in memory (not on disk) against one of the workspace's `tsconfig` projects and reads semantic diagnostics with positions and message text — be rebuilt on TypeScript 7.0.2 with no 6.x compiler, and through which of its surfaces?

## Rows

1. **The language server.** What command starts TypeScript 7.0.2's LSP server from the `typescript` package (`node node_modules/typescript/bin/tsc --lsp --stdio`? another flag?), which LSP capabilities it announces in `initialize` (push `textDocument/publishDiagnostics`, pull `textDocument/diagnostic`, `workspace/diagnostic`), whether a `textDocument/didOpen` for a URI with no file on disk is served with semantic diagnostics (an overlay), how it selects the `tsconfig` project for a document when the workspace has several (`configs/src/tsconfig.core.json`, `tsconfig.server.json`, a root `tsconfig.json`), and whether `initializationOptions` can name a project or a `--project` flag exists. Read the server's own source under `internal/ls` and `internal/lsp` in the merged repository where the docs are silent.
2. **The `--api` surface.** What `typescript/unstable/sync` (`node_modules/typescript/dist/api/sync/api.d.ts`) can do for the same job: does `API.updateSnapshot` accept in-memory file contents or overlays (`updateSnapshot(params)`'s parameter type, `unstable/fs`'s `createVirtualFileSystem`), do `Program.getSemanticDiagnostics` results carry file, position, and message text, and what does Microsoft say about the stability of `unstable/*` and the 7.1 API (the 7.0 announcement's "new (and different) API" and any 7.1 beta or iteration-plan post).
3. **Node.** `process.execve` availability in Node 22.22.2 and the `typescript` 7.0.2 launcher's fallback (`node_modules/typescript/lib/tsc.js`), so a spawned `tsc --lsp` inherits stdio pipes correctly on this host.
4. **Prior art.** Any published tool that already drives `tsgo`/TypeScript 7 over LSP or `--api` for diagnostics (oxlint's `tsgolint`, the VS Code TypeScript 7 extension, `vitest`'s typecheck mode) and what it chose.

## Output

`## Evidence` with one numbered block per row and a citation per fact; `## Distillate` naming for each row what holds and what does not; `## Unknowns` naming what was not reached. No process diary. End with `Deviation: none` or the deviation.
