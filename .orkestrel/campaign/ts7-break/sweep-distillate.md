I'll read the brief first, then follow it exactly in read-only mode.The brief is a fleet-wide TypeScript 7 break sweep. I'll gather manifests, in-process API sites, vendored copies, guides, and dts outputs read-only.I'll extract manifest fields, TypeScript import sites, vendored hashes, and dts configs across the fleet in parallel.Fleet grep timed out; I'll pull manifests with a narrower loop and search TypeScript sites per tree.Manifest grep was truncated. I'll finish scripts, peer fields, hashes, guides, and dts shapes next.Shell is blocked, so I'll compare files from reads and finish dts configs, extra sites, and guide hits.## Manifest facts

Every fleet `package.json` and scaffold declare `@microsoft/api-extractor` `^7.59.0` and `vite-plugin-dts` in `devDependencies` (fleet `^5.1.0`, scaffold `^5.0.3`). None declare `vue-tsc` or `unplugin-dts`. Every `check` script is `tsc --noEmit --project tsconfig.json && npm run check:src`. No script names `vue-tsc`. Lockfiles nest `typescript` `5.9.3` under `@microsoft/api-extractor` and resolve `unplugin-dts` `1.1.0` (scaffold lockfile `1.0.3`). `vue-tsc` does not appear in any lockfile.

| package | `typescript` (dev) | `@typescript/typescript6` | peer `typescript` | `check:src:*` (`tsc --noEmit -p`) | `build:src:*` (`vite build` + dts copy) |
|---|---|---|---|---|---|
| abort | `^6.0.3` (`84`) | no | no | core (`52`) | core (`64`) |
| agent | `^6.0.3` (`93`) | no | no | core (`52`) | core (`64`) |
| brief | `^6.0.3` (`88`) | no | no | core (`56`) | core (`67`) |
| browser | `^6.0.3` (`103`) | no | no | core, server (`64`–`65`) | core, server (`78`–`79`) |
| budget | `^6.0.3` (`85`) | no | no | core (`53`) | core (`65`) |
| codec | `^6.0.3` (`86`) | no | no | core (`61`) | core (`73`) |
| console | `^6.0.3` (`109`) | no | no | core, browser, server (`68`–`70`) | core, browser, server (`84`–`86`) |
| contract | `^6.0.3` (`82`) | no | no | core (`53`) | core (`65`) |
| csv | `^6.0.3` (`84`) | no | no | core (`52`) | core (`64`) |
| database | `^6.0.3` (`110`) | no | no | core, browser, server (`67`–`69`) | core, browser, server (`83`–`85`) |
| emitter | `^6.0.3` (`84`) | no | no | core (`52`) | core (`64`) |
| form | `^6.0.3` (`77`) | no | no | core (`47`) | core (`57`) |
| guide | `^6.0.3` (`86`) | no | no | core (`54`) | core (`66`) |
| html | `^6.0.3` (`87`) | no | no | core (`55`) | core (`67`) |
| indexeddb | `^6.0.3` (`83`) | no | no | browser (`49`) | browser (`61`; no `.d.cts` copy) |
| interpret | `^6.0.3` (`87`) | no | no | core (`52`) | core (`64`) |
| lsp | `^6.0.3` (`100`) | no | no | core, server (`64`–`65`) | core, server (`81`–`82`) |
| markdown | `^6.0.3` (`87`) | no | no | core (`54`) | core (`66`) |
| mcp | `^6.0.3` (`120`) | no | no (`125`–`128` are router/server) | core, browser, server (`69`–`71`) | core, browser, server (`89`–`91`) |
| middleware | `^6.0.3` (`107`) | no | no (`112`–`115` are database/server) | core, server (`66`–`67`) | core, server (`80`–`81`) |
| msg | `^6.0.3` (`85`) | no | no | core (`56`) | core (`68`) |
| ndjson | `^6.0.3` (`84`) | no | no | core (`52`) | core (`65`) |
| ollama | `^6.0.3` (`96`) | no | no | server (`52`) | server (`67`) |
| pool | `^6.0.3` (`83`) | no | no | core (`51`) | core (`63`) |
| probe | `^6.0.3` (`112`) | yes: dev `^6.0.2` (`109`), peer `^6.0.2` optional (`118`, `124`–`126`) | `^6.0.3 \|\| ^7.0.0` optional (`120`, `130`–`132`) | core, server, bin (`71`–`73`) | core, server, bin (`88`–`90`; bin has no dts) |
| process | `^6.0.3` (`97`) | no | no | core, server (`64`–`65`) | core, server (`78`–`79`) |
| program | `^6.0.3` (`95`) | no | no | core (`59`) | core (`71`) |
| qualifier | `^6.0.3` (`85`) | no | no | core (`51`) | core (`63`) |
| queue | `^6.0.3` (`89`) | no | no | core (`53`) | core (`65`) |
| rater | `^6.0.3` (`86`) | no | no | core (`52`) | core (`64`) |
| reason | `^6.0.3` (`85`) | no | no | core (`52`) | core (`64`) |
| relation | `^6.0.3` (`86`) | no | no | core (`52`) | core (`64`) |
| router | `^6.0.3` (`109`) | no | no | core, browser, server (`67`–`69`) | core, browser, server (`83`–`85`) |
| sea | `^6.0.3` (`87`) | no | no | server (`52`) | server (`65`) |
| server | `^6.0.3` (`89`) | no | no | server (`52`) | server (`64`) |
| sqlite | `^6.0.3` (`84`) | no | no | server (`52`) | server (`64`) |
| sse | `^6.0.3` (`83`) | no | no | core (`53`) | core (`65`) |
| table | `^6.0.3` (`77`) | no | no | core (`47`) | core (`57`) |
| template | `^6.0.3` (`81`) | no | no | core (`48`) | core (`60`) |
| terminal | `^6.0.3` (`102`) | no | no | core, server (`61`–`62`) | core, server (`76`–`77`) |
| test | `^6.0.3` (`95`) | no | no (`100`–`102` is `vitest`) | core, browser, server (`62`–`64`) | core, browser, server (`76`–`78`) |
| timeout | `^6.0.3` (`84`) | no | no | core (`52`) | core (`64`) |
| tool | `^6.0.3` (`83`) | no | no | core (`51`) | core (`63`) |
| toolbox | `^6.0.3` (`106`) | no | no | core, server (`62`–`63`) | core, server (`76`–`77`) |
| websocket | `^6.0.3` (`85`) | no | no | server (`51`) | server (`64`) |
| worker | `^6.0.3` (`101`) | no | no | core, server (`62`–`63`) | core, server (`76`–`77`) |
| workflow | `^6.0.3` (`113`) | no | no | core, browser, server (`67`–`69`) | core, browser, server (`83`–`85`) |
| workspace | `^6.0.3` (`85`) | no | no | core (`51`) | core (`63`) |
| scaffold | `^7.0.2` (`115`) | yes: dev `^6.0.2` (`110`) | no | core, server, bin (`68`–`70`) | core, server, bin (`87`–`89`; bin has no dts) |

`dts(` call sites: every `configs/src/vite.core.config.ts`, `vite.server.config.ts`, and `vite.browser.config.ts` listed in the next declaration section. `vite.bin.config.ts` does not call `dts(` (`probe/configs/src/vite.bin.config.ts`, `scaffold/configs/src/vite.bin.config.ts`).

## In-process API sites beyond the vendored pair

Packages whose only runtime `typescript` / `@typescript/typescript6` sites are the vendored pair `tests/setupPolicy.ts` and `tests/distribution.test.ts`: abort, agent, brief, browser, budget, codec, console, contract, csv, emitter, form, guide, html, indexeddb, interpret, markdown, mcp, middleware, msg, ndjson, ollama, pool, process, program, qualifier, queue, rater, reason, relation, router, sea, server, sqlite, sse, table, template, terminal, test, timeout, tool, toolbox, websocket, worker, workflow, workspace.

| site | import | members / role |
|---|---|---|
| `database/tests/setupServer.ts:16` | `import * as ts from 'typescript'` | as recorded: type-checks guide fences and derives entry surfaces |
| `database/tests/setupServer.test.ts:10` | `import * as ts from 'typescript'` | as recorded: builds real programs the same way (`88`–`94`, `126`–`128`) |
| `lsp/tests/setupConformance.ts:37` | `import ts from 'typescript'` | as recorded: parses source and walks imports |
| `probe/src/server/helpers.ts:419` | `require('typescript')` | `loadWorkspaceModule` (`410`–`457`): `createRequire` from the workspace, `require('typescript')`, then `require('@typescript/typescript6')` (`440`) when `createProgram` is not a function (`437`, `446`) |
| `probe/src/server/stages/TypeStage.ts:75` | no runtime import; loads through `loadWorkspaceModule` | as recorded: `readConfigFile`/`parseJsonConfigFileContent`/`typescript.sys` (`285`–`296`, `321`–`366`, `417`); `createLanguageService` (`327`); `getDefaultLibFilePath` (`346`); `ScriptSnapshot.fromString` (`418`); `flattenDiagnosticMessageText` (`383`); `getCompilerOptionsDiagnostics`/`getSyntacticDiagnostics`/`getSemanticDiagnostics` (`390`, `433`–`434`) |
| `scaffold/tests/guides.test.ts:32` | `import ts from '@typescript/typescript6'` | as recorded: `createSourceFile` (`311`), `transpileModule` (`334`) |
| `scaffold/tests/distribution.test.ts:9` | `import ts from '@typescript/typescript6'` | as recorded: `transpileModule` (`430`) — this file is not the generated consumer-install proof |
| `scaffold/tests/src/core/templates.test.ts:12` | `import ts from '@typescript/typescript6'` | as recorded: `transpileModule` (`338`), `createSourceFile` (`373`, `416`, `540`), `canHaveModifiers`/`getModifiers` (`543`) |

`scaffold/src/core/templates.ts:1088` is not a runtime import. It is the distribution-proof template that writes `import ts from '@typescript/typescript6'` into generated `tests/distribution.test.ts`. Fleet generated proofs still write `import ts from 'typescript'` (for example `abort/tests/distribution.test.ts:23`, `abort:430`/`458` `createProgram`, `467` `getPreEmitDiagnostics`; members as recorded).

`import type` from the compiler in `src/` (published source):

- `probe/src/server/helpers.ts:4` — `import type * as TypeScript from '@typescript/typescript6'` (return type of exported `loadWorkspaceModule`, re-exported from `probe/src/server/index.ts:2`)
- `probe/src/server/stages/TypeStage.ts:3` — `import type * as TypeScript from '@typescript/typescript6'`
- `probe/src/server/stages/TypeStage.ts:4`–`11` — `CompilerOptions`, `Diagnostic`, `DiagnosticMessageChain`, `IScriptSnapshot`, `LanguageService`, `LanguageServiceHost` from `@typescript/typescript6` (class re-exported from `probe/src/server/index.ts:8`)

No `src/` file imports `from 'typescript'` (value or type). `database/tests/setupServer.ts:10` and `setupServer.test.ts:1` are `import type` from `'typescript'` under `tests/`, not `src/`.

No `app/`, `configs/`, or `scripts/` file imports or requires either specifier.

## The vendored pair per package

Session-start git status listed no tracked modification of `tests/setupPolicy.ts`. The working copy is therefore the committed copy the brief names.

Scaffold `tests/setupPolicy.ts:12` is `import * as ts from '@typescript/typescript6'`. Every fleet `tests/setupPolicy.ts:12` is `import * as ts from 'typescript'`. No fleet copy is byte-identical to scaffold HEAD. Scaffold and abort copies both end at line `2900` on the same `src/worker/constants.ts` fixture; the specifier at line `12` is the observed difference. Members as recorded.

`tests/distribution.test.ts` import line:

| import | packages (line) |
|---|---|
| `import ts from 'typescript'` | abort, agent, brief, browser, budget, codec, contract, csv, emitter, form, guide, html, interpret, lsp, markdown, msg, ndjson, ollama, pool, probe, process, program, qualifier, queue, rater, reason, relation, sea, server, sqlite, sse, table, template, terminal, timeout, tool, toolbox, websocket, worker, workspace (`23`); console, database, indexeddb, mcp, router, test, workflow (`29` — extra playwright/vite preamble) |
| `import ts from '@typescript/typescript6'` | scaffold (`9`) — not the generated consumer proof |

No fleet `tests/distribution.test.ts` uses the bridge line.

## Guides and TSDoc

`transpileModule`, `createSourceFile`, `createLanguageService`, `ts.sys`, and `tsgo` do not appear in any `guides/*.md` under the fleet or in `scaffold/guides/`.

**TypeScript `createProgram` / `@typescript/typescript6` / `typescript@6`:**

- `probe/guides/probe.md:212` — `loadWorkspaceModule` row names `specifier: 'typescript'` and `typeof import('@typescript/typescript6')`
- `probe/guides/probe.md:395` — workspace refusal when `typescript` has no in-process API and `@typescript/typescript6` cannot serve one
- `probe/guides/probe.md:459`–`472` — type stage drives the compiler in-process; `loadWorkspaceModule` prefers `createProgram` on `typescript`, else `@typescript/typescript6`
- `probe/guides/probe.md:624` — receipt `typescript@6.0.3`
- Every other fleet `guides/probe.md:598` — receipt `typescript@6.0.3` (older copy; no bridge paragraphs)
- `scaffold/guides/probe.md:598` — same receipt `typescript@6.0.3`

**`vue-tsc` (seed-list sentence; fleet copies omit scaffold's later TypeScript 7 paragraphs):**

- Line `1135`: contract, csv, database, emitter, form, middleware, msg, ndjson, ollama, pool, relation, router, sea, server, sqlite, websocket, worker, workflow, workspace
- Line `1114`: abort, agent, brief, browser, budget, codec, console, guide, html, indexeddb, interpret, lsp, markdown, mcp, probe, process, program, qualifier, queue, rater, reason, sse, table, template, terminal, test, timeout, tool, toolbox
- `scaffold/guides/scaffold.md:1139` — same seed list
- `scaffold/guides/scaffold.md:1144` — `@typescript/typescript6` is an installed row for the vendored policy sweep and generated proof
- `scaffold/guides/scaffold.md:1158`, `1162` — `vue-tsc` has no TypeScript 7 support; the `app/browser` range stays until `vue-tsc` supports 7

**`createProgram` that is `@orkestrel/program`, not the compiler:** `program/guides/program.md` `37`, `80`, `114`, `116`, `374`, `375`, `381`, `385`, `386`, `435`, `749`, `766`, `799`, `922`, `943`; `scaffold/guides/program.md` `37`, `76`, `110`, `112`, `372`, `373`, `379`, `383`, `384`, `434`, `751`, `768`, `801`, `922`, `943`.

**TSDoc in source (not `guides/*.md`):** `probe/src/server/helpers.ts:390`–`408` names `createProgram` and `@typescript/typescript6`; `probe/src/server/stages/TypeStage.ts:28` names resident language services; `scaffold/src/core/constants.ts:494`–`504` plans `@typescript/typescript6` on every generated workspace; `constants.ts:538`–`549` seeds `vue-tsc` `^3.3.7` and `APP_BROWSER_TYPESCRIPT_RANGE` `^6.0.3`; `scaffold/src/core/compilers.ts:198`, `230`, `320` emit `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` for generated `app/browser` only (no fleet package.json contains that script).

## Declaration outputs

`rollupTypes` is unset everywhere. `bundleTypes` is set on every `dts(` call. Published `exports`/`types` name one `index.d.ts` (and `index.d.cts` where a `require` export exists) per environment, not a declaration tree. `dist/**/*.d.ts` is absent from abort and from scaffold on disk.

| shape | files | `bundleTypes` |
|---|---|---|
| core | every fleet `configs/src/vite.core.config.ts:12`–`23` that exists | `{ extractorConfig.compiler.overrideTsconfig.compilerOptions.types: ['node'] }` — no `invokeOptions` |
| server | every fleet `vite.server.config.ts:12`–`20` | `true`, plus `beforeWriteFile` rewriting `core/index` to `@orkestrel/<pkg>` |
| browser | `console`, `database`, `indexeddb`, `mcp`, `router`, `test`, `workflow` `vite.browser.config.ts:13`–`20` | `true`, plus the same `beforeWriteFile` rewrite |
| scaffold core | `configs/src/vite.core.config.ts:12`–`27` | fleet core object **plus** `invokeOptions: { typescriptCompilerFolder: '' }` (`26`) |
| scaffold server | `configs/src/vite.server.config.ts:12`–`25` | `{ invokeOptions: { typescriptCompilerFolder: '' } }` (`14`–`20`), plus `beforeWriteFile` |
| generated seeds | `scaffold/src/core/templates.ts:557`–`572` (core), `604`–`612` (browser), `634`–`639` (server) | all three now include `invokeOptions: { typescriptCompilerFolder: '' }` — fleet checkouts have not been regenerated to that seed |

`files` is `dist/src` (plus `dist/bin` on probe/scaffold). Consumer types are the rolled-up `dist/src/<env>/index.d.ts` (and `.d.cts` after `npm run copy`). IndexedDB publishes only `./dist/src/browser/index.d.ts` (`indexeddb/package.json:30`–`33`). Browser faces on console/database/mcp/router/test/workflow publish `index.d.ts` on `import` only.

The rollup path still goes through `vite-plugin-dts` → `unplugin-dts` (`createProgram` / fallback `@typescript/typescript6`) → `@microsoft/api-extractor` nested `typescript` `5.9.3` (`package-lock.json` under every checkout, e.g. `abort/package-lock.json:125`–`128`, `scaffold/package-lock.json:143`–`146`).

## Unknowns

- SHA-256 of `git show HEAD:tests/setupPolicy.ts` versus each fleet copy was not computed: the shell in this session refused every command, including `sha256sum`. Byte-identity is ruled out from the specifier at line `12`; remaining bytes were not hashed.
- `dist/**/*.d.ts` was not on disk in abort or scaffold, so rollup-versus-tree is read from `exports`/`bundleTypes` and the vite comments, not from emitted files.
- Whether probe's rolled-up `dist/src/server/index.d.ts` still names `@typescript/typescript6` was not read (same missing `dist`).
- Whether every fleet `tests/setupPolicy.ts` is byte-identical to every other fleet copy was not hashed.
- Fleet `guides/scaffold.md` copies sit at two line numbers (`1114` vs `1135`) and none carry scaffold's `@typescript/typescript6` / `vue-tsc` TypeScript 7 paragraphs (`1144`–`1162`); whether any other sentence in those files names a searched token besides the seed list was not line-walked beyond the grep hits.
- `vite-plugin-dts` `5.1.0` → `unplugin-dts` `1.1.0` in the fleet vs `5.0.3` → `1.0.3` in scaffold: the 7.x `createProgram` fallback behaviour was not re-read from the `1.1.0` install in this pass (the absorb recorded it for `1.0.3`).

Deviation: sha256sum of HEAD `tests/setupPolicy.ts` versus each fleet copy was not run; the shell refused every command.