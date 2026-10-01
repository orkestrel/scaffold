# propagation-1 report

Stopped under the continuation brief's deviation contract. The dependency-table and template proofs are aligned, and the core suite passes with 441 tests. The CLI suite completes with 280 passed and 5 failed tests, including vendored-host digest failures for off-limits `AGENTS.md`. Acceptance is incomplete.

## Files changed

The unit's owned changes, including the preceding execution, are:

- `src/core/types.ts`
- `src/core/constants.ts`
- `src/core/factories.ts`
- `src/core/validators.ts`
- `src/core/parsers.ts`
- `src/core/compilers.ts`
- `src/core/templates.ts`
- `src/bin/types.ts`
- `src/bin/constants.ts`
- `src/bin/helpers.ts`
- `src/bin/CLI.ts`
- `tests/setup.ts` — only the `buildBlueprint` defaults.
- `tests/src/core/factories.test.ts`
- `tests/src/core/validators.test.ts`
- `tests/src/core/parsers.test.ts`
- `tests/src/core/compilers.test.ts`
- `tests/src/bin/helpers.test.ts`
- `tests/src/bin/CLI.test.ts`
- `tests/src/core/constants.test.ts`
- `tests/src/core/templates.test.ts`

The continuation changes only the constants and template proofs and the CLI registry fixture. The constants population includes `FRAMEWORK_MATRIX.vue.dependencies`. The template cases assert `["vite/client"]` without an extension and `["vite/client", "vue"]` with the Vue app extension. The CLI fixture reads Vue package versions from the framework table.

The report is `tmp/units/propagation-1-report.md`. Final `git status --porcelain` contains only owned files, the pre-existing instruction-file changes, and `.orkestrel/scaffold/`. Instruction files, guides, server source, and `host.json` remain untouched by this continuation. No commit, install, or subagent occurred. `tmp/probes/` is empty.

## Added exports

The existing core barrel exposes these declarations without a barrel edit:

- `Surface` — names `browser` and `styles`.
- `Axis` — names `src` and `app`.
- `Framework` — admits `vue`.
- `BrowserExtension` — carries the browser discriminant, framework, and readonly axes.
- `StylesExtension` — carries the styles discriminant and sheet name.
- `Extension` — unites the surface-discriminated extension records.
- `FrameworkDefinition` — describes plugin, checker, sources, packages, and dependencies.
- `SURFACES` — freezes the supported surface names.
- `AXES` — freezes the workspace axes.
- `FRAMEWORKS` — freezes the supported frameworks.
- `FRAMEWORK_MATRIX` — owns the Vue recipe and its moved development dependencies.
- `STYLES_ENTRY_PATH` — names `src/styles/index.scss`.
- `THEMES_ENTRY_PATH` — names `src/styles/themes/sheet.ts`.
- `THEMES_BARREL_PATH` — names `src/styles/themes/index.scss`.
- `SHEET_ENTRY_NAME` — names `sheet.ts`.
- `SHOWCASE_PAGES_PATH` — names `showcase`.
- `STYLES_DEV_DEPENDENCIES` — pins Sass to veneer's declared `^1.105.1` range.
- `RESERVED_SHEET_NAMES` — reserves environments, `bin`, `styles`, `themes`, and frameworks.
- `isSheetName` — checks the bounded naming pattern and reserved names.
- `isBrowserExtension` — checks supported frameworks and distinct valid axes.
- `isStylesExtension` — checks named sheet records.
- `isExtension` — checks either supported extension record.
- `parseExtension` — accepts guard-valid records or parses `surface:name` text; browser text starts with empty axes.

The CLI helper module exports these declarations:

- `targetToSurfaces` — derives independent styles, themes, and showcase markers.
- `targetToExtensions` — derives physical framework axes and sorted sheet marker pairs, refusing invalid or case-colliding names.
- `selectionToExtensions` — validates creation selections, rejects repetition, and assigns selected browser axes.

Existing contracts gain `Blueprint.extensions`, `Blueprint.styles`, `Blueprint.themes`, `ViteMachinery.frameworks`, and the creation command's `styles`, `themes`, `showcase`, and `extensions` members. `ViteMachinery.vue` is computed from `frameworks`.

## Compiler and template changes

Vue dependencies, root and browser checkers, plugin import, browser factory plugin, browser TypeScript types, and Vue include globs follow extension selection. Journey's type import and capture binding follow the browser application and journey flag.

The template substitutions are at `src/core/templates.ts:330` for the optional `, vue()` plugin and `src/core/templates.ts:731` for the optional `, "vue"` type. The preceding report found no other hard-coded Vue text in that template file. Vue source and test include globs in `blueprintToConfigArtifacts` are conditional.

The preceding execution also aligned compiler assertions at their pre-edit lines:

- Lines 435–451: the app-only toolchain snapshot selects Vue explicitly.
- Lines 462–471: the conditional Vue peer/toolchain case selects Vue explicitly.
- Line 1651: the extension-free plugin array omits `vue()`.
- Line 1793: the extension-free factory expectation omits `vue()`.
- Lines 2027, 2034, and 2043: extension-free TypeScript expectations omit Vue types and globs.

The continuation's core run passes every compiler and template test.

## Type claim

The preceding execution's closing line was:

```text
no receipt
```

Its claim digest was `da10f3f9b4c94f078fe0db2f8707df32`. The control produced `Type '"react"' is not assignable to type '"vue"'.` and also failed at runtime, beyond its declared type stage.

The continuation did not call `prove`: the out-of-scope CLI gate failure triggered the required stop before the type-claim step. There is no continuation closing line or receipt. The mirrored guard and parser tests pass in the core suite.

## Commands and results

The continuation ran these gates on Windows on 2026-09-30:

| Command | Exit code | Test count |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --write tests/src/core/constants.test.ts tests/src/core/templates.test.ts` | 0 | none; formatted 2 files |
| `npx oxfmt --config .oxfmtrc.json --check src/core/types.ts src/core/constants.ts src/core/factories.ts src/core/validators.ts src/core/parsers.ts src/core/compilers.ts src/core/templates.ts src/bin/types.ts src/bin/constants.ts src/bin/helpers.ts src/bin/CLI.ts tests/setup.ts tests/src/core/factories.test.ts tests/src/core/validators.test.ts tests/src/core/parsers.test.ts tests/src/core/compilers.test.ts tests/src/bin/helpers.test.ts tests/src/bin/CLI.test.ts tests/src/core/constants.test.ts tests/src/core/templates.test.ts` | 0 | none; checked 20 files |
| `npx tsc --noEmit --project tsconfig.json` | 0 | none |
| `npx oxlint --config .oxlintrc.json src tests/src/core tests/src/bin` | 0 | none |
| `npm run test:src:core` | 0 | 441 passed; 9 files passed; 20.80 s |
| `npm run test:src:bin` before registry-fixture repair | 1 | 132 passed; 1 suite failed during collection, 2 files passed; 2.55 s |
| `npx oxfmt --config .oxfmtrc.json --write tests/src/bin/CLI.test.ts` | 0 | none; formatted 1 file |
| `npm run test:src:bin` after registry-fixture repair | 1 | 280 passed, 5 failed; 2 files passed, 1 failed; 71.02 s |
| `npx oxfmt --config .oxfmtrc.json --check tests/src/bin/CLI.test.ts` after repair | 0 | none |
| `npx tsc --noEmit --project tsconfig.json` after repair | 0 | none |
| `npx oxlint --config .oxlintrc.json src tests/src/core tests/src/bin` after repair | 0 | none |
| `git diff --check` | 0 | none |
| `git status --porcelain` | 0 | none |
| `git diff --stat` and scoped `git diff` inspections | 0 | none |

The CLI runs used `node .agents/skills/orkestrel-dispatch/scripts/launch.ts` with a 300 s cap and the installed npm JavaScript entry. Neither run reached its cap. Their full output is retained in:

- `tmp/units/propagation-1-continue-bin.log`
- `tmp/units/propagation-1-continue-bin.err`
- `tmp/units/propagation-1-continue-bin-repaired.log`
- `tmp/units/propagation-1-continue-bin-repaired.err`

The preceding report records these additional results; this continuation did not rerun the scoped checks:

| Command | Exit code | Test count |
| --- | --- | --- |
| `npm run check:src:core` | 0 | none |
| `npm run check:src:bin` | 0 | none |
| `npm run test:src:core` before the continuation repairs | 1 | 438 passed, 2 failed; 7 files passed, 2 failed; 20.79 s |

The stop leaves these commands unrun, with no exit code or test count:

- `npm run build`
- `npm run test:config`
- `npm run test:guides`
- The continuation's `prove` call.

## Deviations

The CLI registry fixture required an additional owned repair. Expected: its packuments receive versions from declared dependency tables. Found: `tests/src/bin/CLI.test.ts:358` passed an empty version after Vue rows moved out of `APP_BROWSER_DEV_DEPENDENCIES`. Evidence: `buildPackument` threw “A packument publishes at least one version, and every version is named” at `tests/setupServer.ts:2787`. Done: the plugin, Vue, and Vue checker responses read `FRAMEWORK_MATRIX.vue.dependencies`; collection succeeds on the repeated command.

The repeated CLI gate triggers the stop contract. Expected: the CLI suite passes without an unowned repair. Found: these failures remain:

- `tests/src/bin/CLI.test.ts:870`: “takes the host live when every declared digest matches and takes the floor when the repository is dark” throws `ScaffoldError: The vendored host cannot read the declared file at AGENTS.md`.
- `tests/src/bin/CLI.test.ts:943`: “asks the repository for no canon path while fetching a drifted vendored one” throws the same error.
- `tests/src/bin/CLI.test.ts:999`: “writes the same distributed new baseline when transport forces it and when offline selects it” receives exit code 1 instead of 0.
- `tests/src/bin/CLI.test.ts:1074`: “makes offline audit answer drift alone and offline repair match a forced floor write” receives undefined provenance instead of `{ versions: 'floor', host: 'floor' }`.
- `tests/src/bin/CLI.test.ts:1148`: “runs the overwrite floor half offline and refuses its catalog half” receives the same undefined provenance.

The digest failures originate at `src/server/helpers.ts:1271`, called through `tests/setupServer.ts:2873`. Those files and `AGENTS.md` are outside this unit's owned repair scope. The exact diagnostics are retained in `tmp/units/propagation-1-continue-bin-repaired.err`.

Done: the requested core repairs, the owned CLI fixture repair, formatting, root typechecking, scoped lint, core tests, CLI execution, diff checking, and status inspection. Not done: resolving the host mismatch, passing the CLI gate, running build/config/guide gates, obtaining the type receipt, or satisfying acceptance.

Hypothesis: the instruction edits and the distributed host inventory carry different `AGENTS.md` bytes; the later provenance failures may follow the same floor-read refusal. No instruction, server, inventory, or guide repair was attempted.
