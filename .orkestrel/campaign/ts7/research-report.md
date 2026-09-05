# Unit ts7-research — report

Returned by `researcher` on Sonnet on 2026-09-05 (brief: `tmp/units/ts7-research-brief.md`); captured verbatim by the Orchestrator from the lane's transcript.

I have sufficient evidence across all rows. Now composing the final output per the brief's required sections.

## Evidence

**1. The 7.0 announcement**
- devblogs.microsoft.com/typescript/announcing-typescript-7-0/ (published 2026-07-08): "TypeScript 7.0 is made without shipping an API. We expect TypeScript 7.1 to ship with a new (and different) API." — `require('typescript')` (the `typescript` package's own programmatic API) does not ship in 7.0. "TypeScript 7's new language server has actually reduced failing language server commands by over 80%, and reduced server crashes by over 60%" — `tsserver`/the language server ships and is improved. The page states no Node version requirement and no 6.x end-of-life date.
- devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/ (2026-06-18): "practically any TypeScript code that compiles cleanly with TypeScript 6.0 ... should compile identically in TypeScript 7.0"; team planned to "release TypeScript 7.0 within the next month." No `unstable/*` mention, no Node requirement, no 6.x maintenance statement on this page.
- Registry fact from the brief's own evidence (2026-09-05): `typescript@7.0.2` exports `.` as `./lib/version.cjs` (version metadata only) and the programmatic surface under `./unstable/sync`, `./unstable/async`, `./unstable/ast` (+ `/is`, `/factory`, `/utils`, `/scanner`, `/visitor`, `/clone`), `./unstable/fs`, `./unstable/proto` — this is a package-manifest fact, not a devblog quote, and it postdates the 7.0 announcement's "made without shipping an API" statement.
- github.com/nrwl/nx/issues/36306 (third-party, not Microsoft, dated in Nx's issue tracker): `require('typescript')`'s exports narrowed to `version` and `versionMajorMinor`; `readConfigFile`, `parseJsonConfigFileContent`, `createProgram`, `resolveModuleName`, `createCompilerHost`, `sys` are gone from the root export and relocated under the `unstable/*` subpaths behind a "completely restructured, class-based API."

**2. The 6.0 bridge** — devblogs.microsoft.com/typescript/announcing-typescript-6-0/ (2026-03-23):
- `--baseUrl` deprecated, no longer a look-up root.
- `--moduleResolution node`/`node10` deprecated → migrate to `nodenext` (Node) or `bundler`.
- `--module amd`, `--module umd`, `--module systemjs`, `--module none` removed.
- `--downlevelIteration`: any use is now a deprecation error (tied to `--target es5` deprecation).
- `--target es5` deprecated; "TypeScript's lowest target will now be ES2015."
- `--moduleResolution classic` removed.
- `--esModuleInterop false` and `--allowSyntheticDefaultImports false` can no longer be set — both are forced `true`.
- `--alwaysStrict false` gone: "all code will be assumed to be in JavaScript strict mode."
- `--outFile` removed; migrate to an external bundler.
- Default changes: `--strict` now `true`; `--module` now `esnext`; `--target` now stated as "current-year" (the fetch reported `es2025`, unverified against the primary page text directly — flagged as an inference from a summarized fetch, not a verified quote); `--types` now `[]`; `--rootDir` now the `tsconfig.json` directory; `--noUncheckedSideEffectImports` now `true`; `--libReplacement` now `false`.
- Syntax: bare `module` keyword where `namespace` is expected is now a hard error; `asserts`-syntax import attributes deprecated in favor of `with`; `no-default-lib` triple-slash directive no longer supported (use `--noLib`/`--libReplacement`).
- CLI: running `tsc` with file arguments in a directory containing `tsconfig.json` now errors; `--ignoreConfig` bypasses it.
- 6.0 lets a project suppress these via `"ignoreDeprecations": "6.0"`, but the announcement states 7.0 supports none of the deprecated options; a `--stableTypeOrdering` flag was added to help the 6-to-7 migration.

**3. Migration notes** — github.com/microsoft/typescript-go (archived 2026-09-01; work merged into microsoft/TypeScript):
- Feature matrix (as summarized by the fetch, not independently re-verified line-by-line): `--watch`, `--build`/project references, `--declaration`, `--incremental` marked done.
- "Declaration emit differs greatly, intentionally, to be closer to TS declarations" — parity is not byte-identical output, by design.
- JavaScript emit marked done.
- `--isolatedDeclarations` is not mentioned in the fetched matrix content — treat as unreached, not as absent.
- "This is still a work in progress and is not yet at full feature parity with TypeScript. Bugs may exist." Language service "in progress"; "the API is explicitly 'not ready.'"
- The `_packages/api` README itself was not reached; a search result instead reports (unverified, secondary) that typescript-go's `_packages` "may change without notice" and "don't guarantee API stability." This is a gap: name it in Unknowns.

**4. The API**
- github.com/nrwl/nx/issues/36306: `typescript/unstable/sync` exposes `Program`, `Project`, `Checker`, `Emitter` classes; `typescript/unstable/async` gives async variants; `typescript/unstable/ast` is described separately.
- WebSearch synthesis (secondary, not independently fetched from a single primary page): `unstable/sync`/`unstable/async` "spawn the native server and expose config parsing + checker over RPC" — an out-of-process, IPC-backed model, distinct from `unstable/ast`, which is presented as parser-only.
- Whether JSDoc/comments are reachable through the new `Checker`/`Symbol` surface, and whether declaration text can be emitted through `Emitter`, was not confirmed against a primary Microsoft source in this pass. Name as unreached in Unknowns.
- Stability: the 7.0 announcement calls the package shipped "without an API" and defers a real API to 7.1; the `unstable/*` naming itself signals no stability promise, but no page fetched states a formal semver policy for the `unstable/*` paths.

**5. Tooling support**
| Tool | Supports TypeScript 7 | Evidence |
|---|---|---|
| `vite-plugin-dts` / `unplugin-dts` | Not as of the sources reached. A sibling tool in the same problem space, `vite-plus`, crashes on `vp pack --dts` under `typescript@7.0.2` because its bundled declaration path reads `ts.sys.useCaseSensitiveFileNames`, which is `undefined` since the legacy `ts.sys` export is gone from the package root; its peer range stays `"^5.0.0 \|\| ^6.0.0"` (github.com/voidzero-dev/vite-plus/issues/2188, 2026-07-16). No `vite-plugin-dts`/`unplugin-dts`-specific issue confirming or denying TS 7 support was reached; a `qmhc/unplugin-dts` issue instead shows the plugin bundling its own `@microsoft/api-extractor` at an older pin, which is a separate axis from TS 7 (github.com/qmhc/unplugin-dts/issues/359, no date captured).
| `@microsoft/api-extractor` | Not yet, and blocked on the same missing API. api-extractor.com states: "When API Extractor invokes the compiler engine to analyze your project, it uses its own TypeScript version. It cannot use your toolchain's version because the compiler engine API may be incompatible," and "If the issue is that your toolchain uses a newer compiler release than API Extractor's engine, please open a GitHub issue requesting to upgrade API Extractor's compiler. We try to stay as current as possible." (api-extractor.com/pages/setup/invoking/). No page names a TS 7-specific timeline.
| `vitest` 5 | Runs `tsc`/`vue-tsc` as a spawned process for its `typecheck` mode rather than importing the compiler as a library (vitest.dev/config/typecheck), so it is not blocked by the missing programmatic API the same way library-embedding tools are; no primary Vitest page fetched states an explicit TS 7 support statement.
| `vite` | The `esbuild`/Oxc transpile path strips TypeScript types without invoking the `typescript` package, per Oxc's own type-stripping documentation surfaced in search (oxc.rs); this was not independently re-fetched as a primary Vite page in this pass — record as a search-level finding, not a fetched quote.
| `oxlint` type-aware linting | Depends on `tsgolint`, not the `typescript` npm package: "tsgolint executes lint rules that require TypeScript semantic analysis, using typescript-go for full compatibility," with a two-binary model (oxlint Rust CLI plus a Go `tsgolint` binary) (github.com/oxc-project/tsgolint README, via search; not independently fetched).
| `vue-tsc` / `@vue/language-tools` | Not yet. github.com/vuejs/language-tools/issues/5381 (opened 2026-05-26) tracks tsgo/TS 7 support as an open feature request, proposing either a `tsgo` config switch or dropping TypeScript-internals patching; no merged support was found.
| Playwright / `@vitest/browser-playwright` | Confirmed no dependence. `registry.npmjs.org/playwright/latest` lists exactly `"playwright-core": "1.63.0"` as its sole dependency; `registry.npmjs.org/@vitest/browser-playwright/latest` lists `tinyrainbow`, `@vitest/mocker`, `@vitest/browser` — `typescript` appears in neither dependency list.

**6. Alternatives for an in-process AST walk**
- typescript-go's own recommendation for embedders was not reached as a primary-source page in this pass (the `_packages/api` README returned only secondary search snippets); named in Unknowns.
- `typescript/unstable/ast`: search-level synthesis (not independently fetched from a primary Microsoft page) describes it as parser-only, distinct from the RPC-backed `sync`/`async` checker paths — unverified against a primary source.
- `oxc-parser`: registry.npmjs.org/oxc-parser/latest — version `0.148.0`, license `MIT`, one direct dependency `@oxc-project/types` (`^0.148.0`) plus per-platform optional native bindings; per npm search synthesis it returns a TS-ESTree-compatible AST by default (`@typescript-eslint/typescript-estree` shape) with an `astType: 'ts'` option, and documentation states comments and source locations are included — the comments claim was not independently re-verified against a primary oxc-parser page.
- `@swc/core`: registry.npmjs.org/@swc/core/latest — version `1.16.2`, license `Apache-2.0`, description "Super-fast alternative for babel"; TypeScript-syntax parse support was not independently confirmed from a primary `@swc/core` page in this pass (npmjs.com itself returned HTTP 403 to WebFetch).
- `@babel/parser`: registry.npmjs.org/@babel/parser/latest — version `8.0.4`, license `MIT`, description "A JavaScript parser"; TypeScript plugin support is Babel's documented `typescript` syntax plugin, not independently re-fetched here.

**7. `@typescript/native-preview`** — github.com/microsoft/typescript-go/blob/main/_packages/native-preview/README.md: "For TypeScript 7.0 RC and later, use `tsc` just like for TypeScript 6.0," and "For other builds, use the `tsgo` command just like you would use `tsc`." The README states the package "is intended for testing and experimentation. It will eventually be replaced by the official TypeScript package." The registry's `latest` for `@typescript/native-preview` is `7.0.0-dev.20260707.2` per the brief's own evidence, which is a pre-7.0-stable dev tag — a discrepancy against the README's "for 7.0 RC and later, use `tsc`" guidance that this pass did not reconcile.

**8. Node** — nodejs.org/api/process.html#processexecvefile-args-env: "Added in: v23.11.0, v22.15.0"; `process.execve` is Stability 1 (Experimental), unavailable on Windows or IBM i. Node 22 (the brief's stated installed major) satisfies this only at `22.15.0` or later — the brief names "Node 22" without a minor version, so whether the installed Node 22 meets the `22.15.0` floor is unconfirmed and named in Unknowns.

## Distillate

- `require('typescript')` (the root import) no longer exposes the compiler: `readConfigFile`, `parseJsonConfigFileContent`, `createProgram`, `resolveModuleName`, `createCompilerHost`, `sys`, and `ts.sys` are gone; only `version`/`versionMajorMinor` remain. Any test or vendored policy sweep doing `import ts from 'typescript'` and calling those breaks outright.
- The replacement lives under `typescript/unstable/sync|async|ast|fs|proto`, an RPC-backed, class-based (`Program`, `Project`, `Checker`, `Emitter`) surface with no stated stability guarantee; Microsoft's own 7.0 announcement says 7.0 ships "without an API" and defers a real one to 7.1.
- `vite-plugin-dts`/`@microsoft/api-extractor`, both load-bearing for this project's declaration build, have no confirmed TypeScript 7 support path reached in this research pass; a sibling declaration tool (`vite-plus`) crashes on the same missing `ts.sys` under TS 7.0.2, and `api-extractor.com` states it always bundles its own compiler version rather than the project's.
- `vue-tsc`/`@vue/language-tools` have an open, unresolved feature request for tsgo/TS 7 support (issue #5381) — no support exists yet, which matters because this line runs Vue browser environments.
- `oxlint` type-aware linting reaches TS 7 semantics through a separate `tsgolint` Go binary, not through the `typescript` package — this path is unaffected by the API removal.
- `vitest` typecheck mode, Playwright, and `@vitest/browser-playwright` do not import the `typescript` package as a library (they spawn `tsc`/`vue-tsc`, or carry no dependency on it at all), so they are not blocked by the missing programmatic API the same way library-embedding tools are.
- TypeScript 6.0's deprecations (`baseUrl`, `moduleResolution node`/`classic`, `module amd|umd|systemjs|none`, `target es5`, `downlevelIteration`, `esModuleInterop false`, `outFile`) are hard removals in 7.0 with no `ignoreDeprecations` escape hatch; a `tsconfig.json` using any of them fails outright on 7.0.2, independent of the API question.
- `process.execve`, which the 7.0.2 `tsc` launcher uses, needs Node `22.15.0`/`23.11.0` or later; confirm the exact installed Node 22 minor before relying on it.
- No replacement exists yet, as of the sources reached, for: a stable in-process programmatic API equivalent to the old `ts.createProgram`/checker (deferred to 7.1); `vue-tsc` TS 7 support; a confirmed `vite-plugin-dts`/`api-extractor` TS 7 declaration-emit path.
- For an in-process `ts.createSourceFile`/`ts.forEachChild` AST walk used in a Vitest test, `oxc-parser` (MIT, one direct dependency, TS-ESTree-shaped AST) is the most primary-source-grounded declared alternative reached; `@swc/core` and `@babel/parser` are named as options but their TypeScript-parse specifics were not independently re-verified in this pass.

## Unknowns

- Row 1 (Node version requirements, 6.x end-of-life date/maintenance plan): not stated on either `announcing-typescript-7-0/` or `announcing-typescript-7-0-rc/`, and the 7.0 beta post (devblogs.microsoft.com/typescript/announcing-typescript-7-0-beta/) was never fetched.
- Row 3 (`_packages/api` README, `--isolatedDeclarations` support, an authoritative migration/FAQ page): the typescript-go repository's root README was reached only through a summarized fetch of its top-level page; `_packages/api`'s own README and `docs/` were not fetched as primary sources.
- Row 4 (whether JSDoc/comments are reachable through the new `Checker`/`Symbol` model, whether `Emitter` can produce declaration text, and the `unstable/*` stability promise stated by Microsoft itself rather than by search synthesis): no primary Microsoft page confirming these was reached.
- Row 5 (`vite-plugin-dts`/`unplugin-dts` TS 7 support status directly, a primary Vite page on the Oxc/esbuild transpile path, a primary `tsgolint`/oxlint page fetched rather than search-summarized): none of these were independently fetched; the vite.dev migration and features pages returned only through `WebSearch`, not `WebFetch`.
- Row 6 (typescript-go's own stated recommendation for embedders, and independently fetched `@swc/core`/`@babel/parser` pages): `npmjs.com` returned HTTP 403 to `WebFetch` for `oxc-parser`, `@swc/core`, and `@babel/parser`; the registry API (`registry.npmjs.org`) was used instead and does not carry the TypeScript-AST-support prose npmjs.com's page would.
- Row 8: whether the installed Node 22 in this project meets the `22.15.0` floor for `process.execve` — the brief names only "Node 22," and no `node --version` was run in this read-only pass.

Relevant paths: none (research-only; no file written).
