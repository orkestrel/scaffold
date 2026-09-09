I'll read the unit brief, close-evidence file, and the orchestration contract so the check stays mechanical and read-only.I'm the Grok mechanical-evidence executor: next I'll load the required rules, skills, and frozen capture, then collect facts only.Required skills and the Grok return shape are loaded. Next I’ll read the rule files, Guide authority, capture diffs, and root receipts.Rules are loaded. Next I’ll read the structural-lane references, Guide authority, capture diffs, and root receipts.Contracts are in the capture. Next I’ll extract the consumer statements, metadata rows, structural controls, and gate/probe receipts.**Question:** What mechanical facts does the frozen Guide-command capture show for contracts, placement, the Scaffold consumer, metadata, and root receipts?

## Evidence

Capture `tmp/pass/d7n-guides-api-final`: Guide HEAD `ef6ada9975d71ce97ac20239f473c02b77e84cd9`; Scaffold HEAD `bf579f857f628aaa5889443a9c5b669ef5a41f95`. Those HEADs match `tmp/pass/d7n-guide-api-rules-gates/head.txt` and `tmp/pass/d7n-scaffold-api-rules-gates/head.txt`. `guide.untracked.txt` is not in the capture directory. `scaffold.untracked.txt` names `.orkestrel/campaign/docs-parity/d7n-scaffold-api-rules-adopt-report.md`.

### Contracts

Introduced result/type names in `guide.diff.txt` `src/core/types.ts`: `DriftCategory`, `ParityPitch`, `ParityOptions`, `ParityRow`, `ParityFinding`, `ParityExampleResult`, `ParityResult`, `ParityDirection`, `ParityChange`, `ParityRewriteResult`, `ParityInterface`. `Drift` gained `readonly category`. Collections on those types are `readonly`.

`ParityInterface` methods: `rows`, `inspect`, `document`, `annotate`. `rows()` returns `readonly ParityRow[]`.

Server types in `guide.diff.txt` `src/server/types.ts`: `GuideReadFunction`, `GuideRunnerOptions`, `GuideRunnerFunction`, `GuideCommandContext`, `GuideCommandHandler`, `GuideCommandOptions`, `GuideCommandInterface`. Option keys: `root`, `patterns`, `modules`, `languages`, `language`, `reader`, `runner`. Context fields: `root`, `files`, `rows`, `report`. `GuideCommandInterface` public method: `execute`. `GuideRunnerOptions.project` is `'guides'`; `reporters` `'dot'`; `cache`/`watch` `false`.

`GuideCommand` (`guide.diff.txt` `src/server/GuideCommand.ts`) has no public getters; fields are `#root`, `#patterns`, `#modules`, `#languages`, `#language`, `#reader`, `#runner`. Constructor assigns those fields in the body. Runtime imports: `@orkestrel/contract`, `node:fs`, `node:path`, `node:process`, `../core/Parity.js`, `../core/parsers.js`, `./constants.js`, `./helpers.js`, `./parsers.js`.

Removed aliases in the Scaffold diff: `DOCS_SEED_PATH`, `scripts.docs`, `scripts/docs.ts`, `HOST_PATHS` membership of that seed. Generated `test:guides` is `node --experimental-strip-types tests/guides.test.ts`; the Vitest-only predecessor is retained only as `accepted` on the writable `test:guides` row (`scaffold.diff.txt` `src/core/compilers.ts`, `tests/src/core/compilers.test.ts`).

Forbidden-syntax scan of the introduced server files and `src/core/types.ts` hunk: no `any`, no `as` type assertions, no non-null assertions, no `public`/`private`/`protected`, no `@ts-*` / `eslint-disable`. `configs/src/vite.server.config.ts` uses `export default` (Vite config). `EXPORT_KEYWORDS` moved from `as const` to `satisfies` (`guide.diff.txt` `src/core/constants.ts`). `Parity.ts` was not read line-by-line for nested-function syntax.

### Placement

Class files: `src/core/Parity.ts`, `src/server/GuideCommand.ts`. Centralized server leaves: `src/server/types.ts`, `constants.ts`, `helpers.ts`, `parsers.ts`. Barrel `src/server/index.ts` star-exports those plus `GuideCommand.js`. Core barrel adds `export * from './Parity.js'`. Test pointers: `tests/src/core/Parity.test.ts`, `tests/src/server/GuideCommand.test.ts`, `helpers.test.ts`, `parsers.test.ts`. Server imports core; core barrel does not import server. Vite server build externalizes `@src/core`, `node:`, `@orkestrel/`, and declared peers (`guide.diff.txt` `vite.config.ts`).

### Consumer

Actual top-level forms in captured `tests/guides.test.ts` (`scaffold.diff.txt`): `import type` of `Question` and `GuideModule`; value imports of `GuideCommand` from `@orkestrel/guide/server`, `readInventory` from `@orkestrel/test/server`, `createVitest` from `vitest/node`; four `const` bindings (`PATTERNS`, `FENCE_LANGUAGES`, `EXAMPLE_LANGUAGE`, `MODULES`); one `await new GuideCommand({ ... reader: readInventory, runner: createVitest }).execute(async ({ files, report, root, rows }) => { ... })`.

Structural AST control in `tests/src/core/compilers.test.ts` (`scaffold.diff.txt`): `readStatements` on `tests/guides.test.ts` keeps `FunctionDeclaration` names as `[]`; the control fixture `function localGuideCommand(): void {}\nnew GuideCommand().execute(async () => {})\n` yields `['localGuideCommand']`. That is the supplied AST population, not a symbol grep.

Retained inside the `execute` callback: HostFile without Copy; Worktree without Repository; `read` without `files` on `UpstreamInterface`; `describe('guide examples')` registrations (usage fence, blueprint defaults, compile refusal, error-code narrowing, retained setup seed, classifier drive, declaration-substitution prose).

Guide’s own `tests/guides.test.ts` still constructs `new Parity({...})` and loops `parity.rows()`; it does not import `GuideCommand`. Guide `package.json` still has `"test:guides": "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides"`.

### Metadata

Guide `package.json` adds `exports["./server"]` to `dist/src/server/index.js` / `.d.ts` (and CJS twins); `check:src` chains `check:src:server`; `test:src` chains `test:src:server`; `build:src` chains `build:src:server`. Generated config paths: `configs/src/tsconfig.server.json`, `configs/src/vite.server.config.ts`. `guides/README.md` adds `src/server` and `tests/src/server` on the Guide concept row and a `src/server` directory row.

Scaffold `package.json`: `"test:guides": "node --experimental-strip-types tests/guides.test.ts"`; `"docs"` removed. Gate log `tmp/pass/d7n-scaffold-api-rules-gates/test.log.txt` ran that native command and recorded `Tests  22 passed (22)`. Guide’s gate log still ran the Vitest `guides` project (`Tests  37 passed (37)`).

### Receipts actually read

| Receipt | Path | Exit / identity |
| --- | --- | --- |
| Guide format/lint/check/build/test | `tmp/pass/d7n-guide-api-rules-gates/*.exit.txt` | `0` |
| Scaffold format/lint/check/build/test | `tmp/pass/d7n-scaffold-api-rules-gates/*.exit.txt` | `0` |
| Pack | `tmp/pass/packed/d7n-guide-api-rules/pack.exit.txt` | `0` |
| Install | `tmp/pass/d7n-scaffold-guide-api-rules-install/install.exit.txt` | `0` |
| Artifact instrument | `tmp/pass/d7n-guide-api-rules-artifact/instrument.exit.txt` | `0` |
| Capture core JS / d.ts hash check | `tmp/pass/d7n-guides-api-final/core-js.exit.txt`, `core-declaration.exit.txt` | `0` |
| GROK_READY probe | `tmp/pass/d7n-guides-api-check-probe/exit.txt` | `0` |

Archive SHA256 `9a64d5e4f264301f0d1a9434d7cdc18617c971a9ccbff9f98f9060ac21a4295a` (`tmp/pass/d7n-guides-api-final/artifacts.sha256`, pack `artifacts.sha256`). Core JS `8ea54af019e62e2e0c680adb5580dc589beb4c0abede66452f61afe2b804ca9f`; core d.ts `91fdb2d7105801dbbdc0c6c32cc4e3c948e3d58a9bfa3150b4e67ae7ddefa2fb`. Server JS/d.ts hashes appear in `tmp/pass/d7n-guide-api-rules-artifact/artifact.json` (`f0b37cdb…`, `a7921e72…`) for packed, canonical, and installed copies; they are absent from the capture `artifacts.sha256`. `artifact.json` `module.GuideCommand` is `"function"`. Packed/installed metadata declare `@orkestrel/contract` `^0.0.17` and `@orkestrel/markdown` `^0.0.14`; canonical metadata in the same file still shows `^0.0.16` / `^0.0.13`. Guide and Scaffold `package.json` / lock SHA256 files are identical before and after the artifact instrument. Install preservation log: `package.json: OK`, `package-lock.json: OK`.

Scaffold `src:core` in the ordered test chain: `Tests  409 passed (409)` with no skipped line. `src:server`: `428 passed | 6 skipped (434)`. API Extractor TypeScript 6.0.3 warning is in both packages’ `build.log.txt` and `test.log.txt`. Guide `src:server`: `Tests  7 passed (7)`.

`matchesGuideResult` source copies `testModules` / `unhandledErrors` before walking (`guide.diff.txt` `src/server/helpers.ts`). The ChangingResult instrument in `tests/src/server/helpers.test.ts` expects `matchesGuideResult(changing)` `false` and `changing.reads` `1`.

Companion tokens `4341d8`, `6c9565`, `c8d071`, `0c7872`, `070489`, `3ed94b`, `06f799`, `267290`, `0de5ed`, `84cdef`, `c60e91`, `b75268` and hashes `9bd43451…` / `c9506f15…` appear in `tmp/units/d7n-guides-api-close-evidence.md` and not as files under `tmp/pass`. No `prove` receipt is in the supplied capture. Writer reports were not read.

## Distillate

Guide now publishes a server `GuideCommand` whose only public method is `execute`, taking direct `reader`/`runner` ports, with grouped `Parity*` / `GuideCommand*` contracts and readonly collections. Scaffold’s authored `tests/guides.test.ts` is a top-level `GuideCommand` construction against installed `@orkestrel/guide/server`, `readInventory`, and `createVitest`; `readStatements` reports no `FunctionDeclaration` names there, with a control that would name `localGuideCommand`. Generated native `test:guides` is `node --experimental-strip-types tests/guides.test.ts`; the Vitest-only line remains only as `accepted`. Guide’s own `test:guides` and `tests/guides.test.ts` still use the Vitest project and local `Parity`, not `GuideCommand`. Packed/installed core and server bytes match in `artifact.json`; capture `artifacts.sha256` lists core and the tarball only. Ordered gate `*.exit.txt` files read here are `0`. Source-only diffs do not settle native rewrite runtime beyond those logs.

## Unknowns

- `guide.untracked.txt` (named by the companion, absent from the capture directory).
- On-disk SHA256 comparison of capture diffs to gate `diff-final.txt` for `9bd43451…` / `c9506f15…`.
- Files for companion run tokens `4341d8`, `6c9565`, `c8d071`, `0c7872`, `070489`, `3ed94b`, `06f799`, `267290`, `0de5ed`, `84cdef`, `c60e91`, `b75268`.
- A `prove` receipt for the retained legacy-stream refusal (companion: Registered Probe refused; capture holds only the GROK_READY probe).
- Nested-function / forbidden-syntax status of `src/core/Parity.ts` beyond the class outline.
- Live tree vs capture drift after freeze (product commands were not run).
- Guide native-entry adoption and obsolete Vitest `test:guides` removal (explicitly pending).
- Whether skipped Scaffold `src:server` cases are the pre-existing platform/configuration skips named by the companion (log shows skipped totals, not case names).

**Required instruction not fully read:** `.agents/orchestration.md` after the engine-assignment section; live complete `guides/guide.md` / `guides/scaffold.md` (read from capture diffs instead). Writer reports were skipped as other-lane reports.

## Journal

`C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/d7n-guides-api-check.jsonl`  
`session_id`: `fe7120fc-1270-4693-b195-9cbb84f829a3`

## Deviation

Missing `guide.untracked.txt`. Companion run tokens and capture-vs-gate SHA256 files were not present under `tmp/pass`. No `prove` receipt in the supplied capture. This session spawned nothing and ran no product command, test, install, or Git mutation.
