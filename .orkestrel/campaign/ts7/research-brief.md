# Unit ts7-research — primary sources on TypeScript 7.0, its API, its migration notes, and the toolchain around it

## Role and engine

`researcher` on Sonnet, a native Claude Code subagent with WebFetch and WebSearch. Perform the assignment directly and spawn nothing. Read-only: write no file, run no command. This lane runs on the native tier because the Cursor CLI's web tools are rejected in this container (recorded on 2026-09-05 for the docs-proposal campaign); the repository-side reading runs on Grok in parallel.

## Objective

Return cited facts on what TypeScript 7.0 changed for a project that runs `tsc --noEmit` as its type gate, builds declarations through `vite-plugin-dts` and `@microsoft/api-extractor`, and imports the `typescript` package's JavaScript API in tests and a vendored policy sweep, so an Orchestrator can plan the move from 6.0.3 to 7.0.2.

## Context

**Evidence.** On 2026-09-05 the registry's `latest` for `typescript` is `7.0.2` (`rc` `7.0.1-rc`, `next` `7.1.0-dev.20260905.1`); `typescript@7.0.2` exports `.` as `./lib/version.cjs` and the API under `./unstable/sync`, `./unstable/async`, `./unstable/ast` (+ `/is`, `/factory`, `/utils`, `/scanner`, `/visitor`, `/clone`), `./unstable/fs`, `./unstable/proto`; its `bin/tsc` execs a platform binary from `@typescript/typescript-<platform>`; it vendors `vscode-jsonrpc`. `@typescript/native-preview` `latest` is `7.0.0-dev.20260707.2`. Installed here: typescript 6.0.3, vite-plugin-dts 5.0.3 (unplugin-dts 1.0.3), `@microsoft/api-extractor` 7.59.0 (bundling its own TypeScript 5.9.3), vitest (read the version from the registry: `latest` 5.0.0), oxlint 1.80.0, oxfmt 0.65.0, Node 22.

**Law.** `AGENTS.md` § Writing; `.claude/rules/writing.md`; `.claude/rules/quality.md` § Research; skill: none; guide: none.

**Host.** Outbound HTTPS through a proxy; a fetch that fails is recorded with its URL and the next row continues.

**Measurements.** none to take.

**Control identifiers.** none.

**Standing conditions.** none.

## Unknowns

- Whether each site is reachable; report the first failing URL per row.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Evidence sought

For every fact: the URL, at most two quoted lines, and the version or date the page states.

1. **The 7.0 announcement.** From devblogs.microsoft.com/typescript (the "Announcing TypeScript 7.0" post, and the 7.0 beta and RC posts): what 7.0 is (the native compiler), what the `typescript` package now contains, what happened to the JavaScript API (`import ts from 'typescript'`), the `unstable/*` entry points and their stability promise, `tsserver` and the LSP, Node version requirements, and the stated plan for the 6.x line (maintenance, end of life).
2. **The 6.0 bridge.** From the "Announcing TypeScript 6.0" post: every deprecation and removal named as preparing for 7 (compiler options removed or changed: `baseUrl`, `module` values, `moduleResolution` values, `outFile`, `target` and `lib` defaults, `esModuleInterop`, `--strict` changes, `types` behaviour), with the exact option names.
3. **Migration notes.** From the TypeScript handbook or the typescript-go repository (github.com/microsoft/typescript-go: README, `docs/`, the migration or FAQ pages): which `tsc` flags are unsupported or changed in 7 (`--build`, `--watch`, `--declaration`, `--emitDeclarationOnly`, `--outDir`, `--noEmit`, `-p`, `--incremental`, `--composite`, project references), declaration emit parity, JavaScript emit parity, `--isolatedDeclarations`, and any known gaps the project lists.
4. **The API.** From the typescript-go repository's `_packages/api` README or docs and the 7.0 posts: the `typescript/unstable/sync` and `unstable/async` API model (a client speaking to the native process over IPC; what `API`, `Project`, `Program`, `Checker`, `Symbol`, and `Emitter` offer; whether documentation comments and JSDoc tags are reachable; whether declaration text can be emitted), the `unstable/ast` module (an in-process parser or a node model), and the stated stability of each.
5. **Tooling support.** For each: whether it supports TypeScript 7 and since which version, with the changelog or issue URL — `vite-plugin-dts` / `unplugin-dts` (the `bundleTypes` and declaration emit paths; any `tsgo` or TS 7 support, or an open issue), `@microsoft/api-extractor` (whether it can consume `.d.ts` files emitted by `tsgo`; its bundled TypeScript version policy), `vitest` 5 (typecheck mode and TS 7), `vite` (its `esbuild`/`oxc` transpile path needs no `typescript` package: confirm), `oxlint` type-aware linting (whether it relies on `typescript` or on `tsgolint`), `vue-tsc` and `@vue/language-tools` (whether they run on TS 7; this line has Vue browser environments), Playwright and `@vitest/browser-playwright` (no dependence expected: confirm).
6. **Alternatives for an in-process AST walk.** For a project that today parses TypeScript with `ts.createSourceFile` and walks with `ts.forEachChild` in a Vitest test: what the typescript-go project recommends; whether `typescript/unstable/ast` parses text without the native process; and, as declared alternatives, `oxc-parser` (npm: version, license, dependency count, whether it returns an ESTree with TypeScript nodes and comments), `@swc/core` parse, and `@babel/parser` — one line each with the primary-source URL.
7. **The deprecation of `@typescript/native-preview`.** From its npm page or the typescript-go README: whether it is superseded by `typescript@7`, and whether `tsgo` remains the binary name.
8. **Node.** From nodejs.org: whether `process.execve` (used by the 7.0.2 `tsc` launcher) exists in Node 22.x and since which release.

## Output

Return only:

- `Evidence`: numbered to match the eight rows, each a list of cited facts.
- `Distillate`: at most 30 lines — what a 6.0.3 project must change to run on 7.0.2 (options, scripts, API imports, build plugins), and what has no replacement yet.
- `Unknowns`: every row not reached, with the failing URL.

No recommendation and no design.

## Acceptance criteria

- Every fact carries a URL.
- Row 5 rules on every named tool.
