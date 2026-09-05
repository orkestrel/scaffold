# Unit ts7-absorb — every use of the TypeScript compiler API in scaffold and the fleet, and what TypeScript 7.0.2 offers in its place

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached through the `agent` CLI in `--mode=ask`. You are the bench engine reading this brief inside your own CLI. Perform the assignment directly and spawn nothing.

## Objective

Return a distillate, with `file:line` pointers, of (a) every place `@orkestrel/scaffold` at `/home/user/scaffold` and the fleet checkouts at `/home/user/fleet/<package>` depend on the in-process TypeScript JavaScript API (`import ts from 'typescript'`) or on the `tsc` command, with the symbols each site calls and what it does with them, and (b) the API surface `typescript@7.0.2` ships under `tmp/ts7/package/` (unpacked from the registry tarball on 2026-09-05), so an Orchestrator can plan the move from 6.0.3 to 7.

## Question

Which TypeScript API calls does this line make, at which sites, and what does the 7.0.2 package provide that could replace each one?

## Context

**Evidence.** Commands run by the Orchestrator on 2026-09-05 from `/home/user/scaffold`:

```text
$ node -e 'require("typescript/package.json").version' → 6.0.3 (installed)
$ npm view typescript dist-tags → latest 7.0.2, rc 7.0.1-rc, next 7.1.0-dev.20260905.1, beta 6.0.0-beta
$ npm view typescript@7.0.2 exports → ".": "./lib/version.cjs", "./unstable/sync": "./dist/api/sync/api.js", "./unstable/async": "./dist/api/async/api.js", "./unstable/fs", "./unstable/proto", "./unstable/ast" (+ "/is", "/factory", "/utils", "/scanner", "/visitor", "/clone"); no "main", no "types"; bin tsc → lib/tsc.js, a launcher that execs a platform binary from @typescript/typescript-<platform>
$ npm view typescript@6.0.3 exports → "./lib/typescript.js" (the in-process API)
$ grep -rn "from 'typescript'" src tests configs → src/core/templates.ts:1071 ({{launcher}}import ts from 'typescript'), tests/src/core/templates.test.ts:12, tests/setupPolicy.ts:12 (import * as ts), tests/distribution.test.ts:9, tests/guides.test.ts:32
$ per fleet package, files importing typescript under src/tests/configs/app: every package 2, database 4, lsp 3, probe 4
$ grep -n "tsc " package.json → check, check:src:core, check:src:server, check:src:bin run `tsc --noEmit -p ...`
$ grep -rn "dts(" configs/src → vite.core.config.ts:12, vite.server.config.ts:12 (vite-plugin-dts)
$ tmp/ts7/package/dist/api/sync/api.d.ts → exports classes API, InternalAPI, Snapshot, Project, Program, Checker, Emitter, NodeHandle, Symbol and type guards over Type; dist/ast/index.d.ts is 19 lines
```

**Law.** `AGENTS.md`; `.claude/rules/workspace.md`; `.claude/rules/tests.md`; `.claude/rules/quality.md` § Research; skill: none; guides: `guides/scaffold.md` § Compile, § Vendored data root, § Generated workspace, § Library.

**Host.** Linux container, bash, working path `/home/user/scaffold`; `/home/user/fleet/<package>` are sibling checkouts you may read; `tmp/ts7/package/` is the unpacked 7.0.2 tarball. Network: none; do not fetch. Never run `npm install` or any mutating command; an `npm` shim on `PATH` refuses install-class subcommands.

**Measurements.** Take any count you report with the command that produced it.

**Control identifiers.** none.

**Standing conditions.** `tests/setupPolicy.ts` and `tests/policy.test.ts` in every fleet checkout are scaffold-vendored copies of `/home/user/scaffold/tests/setupPolicy.ts` and `tests/policy.test.ts` (`host.json` names them); read the scaffold copy once and report per-package divergence only where a fleet copy differs. `tests/guides.test.ts` is package-owned everywhere.

## Unknowns

- Whether `typescript/unstable/ast` parses source text in-process (a JavaScript parser) or only models nodes the native process returns. Report from `tmp/ts7/package/dist/ast/*.d.ts` and `*.js`, and from `tmp/ts7/package/README.md`.
- Whether `typescript/unstable/sync` needs the platform binary at run time (a spawned `tsgo` process over `vendor/vscode-jsonrpc`), and what Node version `engines` requires.

## Scope

**Owned.** none — read-only. **Shared.** none. **Off-limits.** every file; create, edit, and delete nothing; never touch `.git/`, `.env*`, `.npmrc`, `auth.json`, or a credential. **What asserts the state this change ends.** none. **Tools and limits.** read-only file reading and searching; `git log`/`git show` permitted; no installs, builds, or network.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn nothing.

## Evidence sought

Cover every row, with `file:line` pointers and at most three quoted lines per pointer. Never dump a file.

1. **Scaffold's API sites.** For each of `tests/setupPolicy.ts`, `tests/guides.test.ts`, `tests/distribution.test.ts`, `tests/src/core/templates.test.ts`, and the template at `src/core/templates.ts:1071` (name the template and the generated file it produces): every `ts.` member used (for example `createSourceFile`, `forEachChild`, `isNoSubstitutionTemplateLiteral`, `transpileModule`, `createProgram`, `getPreEmitDiagnostics`, `ScriptTarget`, `SyntaxKind`), one pointer per member, and one sentence on what the site does with it (parse and walk an AST; type-check a generated workspace; transpile a fence to run it).
2. **The fleet's API sites.** For `database`, `lsp`, and `probe` (the packages with more than the two shared sites), and for a sample of two others (`contract`, `markdown`): the files importing `typescript`, the members used, and what each does. For `probe`, say whether its `prove` MCP tool or its runtime probes drive `tsc` as a process or the API in-process (`/home/user/fleet/probe/src/**`). For `lsp`, say whether it wraps the TypeScript language service.
3. **`tsc` as a process.** Every `tsc` invocation in `package.json` scripts across scaffold and the fleet (search each `package.json`), in `src/core/templates.ts` (the scripts region scaffold writes into targets), in `tests/**` (a spawned `tsc` in a distribution or generated-workspace proof), and in `.claude/settings.json` hooks or `scripts/*.sh`. Give the flags each uses (`--noEmit`, `-p`, `--build`, `--declaration`, `--emitDeclarationOnly`, `--outDir`).
4. **tsconfig options in use.** Every compiler option set in `/home/user/scaffold/tsconfig.json`, `configs/**/tsconfig*.json`, and the tsconfig templates in `src/core/templates.ts`, as one table (option → value → files). Mark `baseUrl`, `paths`, `moduleResolution`, `module`, `target`, `lib`, `types`, `esModuleInterop`, `isolatedModules`, `verbatimModuleSyntax`, `outFile`, `composite`, `incremental`, `rootDirs`, `typeRoots`, `noEmit`, `declaration`, `emitDeclarationOnly`, `skipLibCheck`, `allowImportingTsExtensions`, `rewriteRelativeImportExtensions`, `customConditions` explicitly, present or absent.
5. **The declaration build.** From `configs/src/vite.core.config.ts`, `vite.server.config.ts`, and `vite.bin.config.ts`: the `vite-plugin-dts` options in use (`bundleTypes`, `tsconfigPath`, `rollupTypes`, `include`, `outDir`), what `npm run build:src:core` produces (`dist/src/core/index.d.ts` and `.d.cts`), and from `node_modules/vite-plugin-dts/` and `node_modules/unplugin-dts/` (versions from their `package.json`) which TypeScript API members the plugin calls (`ts.createProgram`, `createCompilerHost`, `getPreEmitDiagnostics`, `transpileModule`, `ts.sys`) with pointers into their `dist/*.mjs`, and whether the plugin resolves `typescript` from the project or bundles its own.
6. **api-extractor's TypeScript.** From `node_modules/@microsoft/api-extractor/package.json` and `node_modules/@microsoft/api-extractor/node_modules/typescript/package.json` (or wherever the lockfile pins it: `grep -n '"node_modules/@microsoft/api-extractor/node_modules/typescript"' package-lock.json`): the TypeScript version api-extractor bundles and whether it reads the project's `typescript` at all.
7. **Vitest and the transpile path.** From `vite.config.ts` and `node_modules/vitest/package.json`: the vitest version, whether any project sets `typecheck`, and which transpiler runs `.ts` test files (esbuild or oxc through Vite) — that path does not use the `typescript` package; confirm from the config.
8. **What `DECLARATION_DEV_DEPENDENCIES` and the templates pin.** From `src/core/constants.ts` (`DECLARATION_DEV_DEPENDENCIES`, and every constant reading `manifest.devDependencies['typescript']` or naming `typescript`) and `src/core/templates.ts`: where scaffold writes the `typescript` range into a target's `package.json`, the `check` scripts it seeds, and the tsconfig files it seeds.
9. **TypeScript 7.0.2's surface.** From `tmp/ts7/package/README.md`, `package.json` (`engines`, `imports`, `preferUnplugged`), `dist/api/sync/api.d.ts` (the `API`, `Project`, `Program`, `Checker`, `Symbol`, `NodeHandle`, `Emitter` classes: list each class's methods with their signatures, especially anything returning JSDoc, documentation comments, tags, diagnostics, emitted declaration text, or source-file ASTs), `dist/api/async/api.d.ts` (how it differs), `dist/ast/index.d.ts` and the sibling `is`, `scanner`, `visitor`, `factory`, `utils`, `clone` declarations (what node types exist, whether a `createSourceFile`-style parser exists, whether `forEachChild`/`visitEachChild` exist), `dist/api/fs.d.ts`, `dist/api/proto.d.ts`, `dist/enums/`, and `lib/` (which `.d.ts` library files and whether `lib/typescript.js` or `lib/typescript.d.ts` exist). Say which 6.0.3 members used in rows 1 and 2 have a 7.0.2 counterpart and which do not.
10. **`@typescript/native-preview` in the tree.** Whether any package in scaffold or the fleet already declares or vendors `@typescript/native-preview` or `tsgo` (search every `package.json`, `.claude/settings*.json`, `scripts/`).

## Output

Return only these sections, in this order:

- `Question`: one line.
- `Evidence`: numbered to match the ten rows.
- `Distillate`: at most 40 lines — the sites grouped by what they need (parse and walk, type-check a workspace, transpile a fence, emit declarations, run `tsc`), and for each need what 7.0.2 offers or does not.
- `Unknowns`: every row or sub-question not reached, and the two named unknowns with their answer or the reason they stayed open.
- `Journal`: the journal path and the session id from the `init` event.
- `Deviation`: `none`, or the exact command that failed and its output.

## Deviation contract

Stop and report if a path in this brief does not exist or if any command changes the tree. A missing pointer for one fact is not a deviation: report it under Unknowns.

## Acceptance criteria

- Every row has facts with pointers or is named under Unknowns.
- No decision, recommendation, or design appears anywhere in the return.
- `git status --porcelain` is unchanged by the run.
