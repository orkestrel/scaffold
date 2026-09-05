# Unit ts7-seven — scaffold moves `typescript` to 7.0.2 (stage 2; dispatched after ts7-bridge lands)

## Role and engine

`implementer` on Opus 5, a native Claude Code subagent, the sole writer in `/home/user/scaffold`. Perform the assignment directly and spawn nothing.

## Objective

With the bridge already landed (stage 1), move `typescript` to `^7.0.2`, land the declaration-rollup override in the checked-in vite configs and the templates that seed them, keep browser workspaces on the 6 major until `vue-tsc` supports 7, update every range literal the move makes false, rebuild `host.json`, and amend the prose that names the pin (`guides/scaffold.md`, `README.md`, `PROPOSAL.md`, `ROADMAP.md`), with every gate green.

## Context

**Evidence.** `.orkestrel/campaign/ts7/orchestrator-measurements.md` § Rehearsal 1 and § Rehearsal 2 (the scratch-copy runs of this exact change: what reds and why), `reconciliation.md` R2 to R5, R8, R9, `design-objective.md` § Constraints C12, C13, C18, C19 and § Findings F1, `design-subjective.md` § What the documentation proposal changes.

**The override.** `unplugin-dts` passes the `typescript` package's root to api-extractor as `typescriptCompilerFolder` (`node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs:253-256`, `:584-590`), and api-extractor sets its default lib location to `<that>/lib` (`node_modules/@microsoft/api-extractor/lib-esm/api/CompilerState.js:101-104`); under 7.0.2 that folder holds no `lib.*.d.ts`, and the rollup fails on `Readonly`. `bundleTypes.invokeOptions.typescriptCompilerFolder: undefined` (typed at `unplugin-dts/dist/shared/unplugin-dts.PNIpryzr.d.ts:293`) is spread after the plugin's value and lets api-extractor use its bundled 5.9.3 compiler's own library folder; rehearsal 2 measured the build green and the core rollup equivalent to the 6.0.3 build.

**Sites.** `package.json:114`; `configs/src/vite.core.config.ts:12-23` (`bundleTypes: { extractorConfig: … }` gains `invokeOptions`), `configs/src/vite.server.config.ts:12-20` (`bundleTypes: true` becomes an object carrying `invokeOptions`); the `dts({...})` templates in `src/core/templates.ts` (`:557-568` core, `:599-607` browser, `:623-631` server) mirrored so `tests/src/core/compilers.test.ts` "keeps this repository byte-identical to every configuration it generates" holds; `src/core/constants.ts` (`BASE_DEV_DEPENDENCIES.typescript` reads the manifest; add the browser-workspace constant beside `APP_BROWSER_DEV_DEPENDENCIES` at `:530`) and `src/core/compilers.ts` `blueprintToDevDependencies` (`:217-219`: a blueprint selecting `app/browser` keeps `typescript` at `^6.0.3`); the range literals: `tests/src/core/constants.test.ts` ("emits a TypeScript range bounded below 7" → the bound the new range implies), `tests/src/core/compilers.test.ts` rows and snapshots, `tests/src/bin/CLI.test.ts:1172, :1206, :1223, :1258, :1276, :1525`, `tests/src/bin/helpers.test.ts:344`, `tests/src/core/fixtures/app-only-toolchain.txt:14` (a browser workspace: stays `^6.0.3` under the fork — read the fixture's blueprint), `setup-false-manifest.txt:72`, `source-manifest.txt:72`; `host.json` (rebuilt).

**Prose.** `guides/scaffold.md` § Dependency floors (the `typescript` floor, the bridge row's reason, the browser limit naming `vuejs/language-tools` issue 5381 and that the fork lifts when `vue-tsc` supports 7); `README.md` where it names the range; `PROPOSAL.md`: the sentence under Option 3 § Mechanism that lists `typescript 6.0.3` among declared dependencies (name the bridge and 7.0.2), the Option 1 control path sentence naming `ts.getJSDocCommentsAndTags` and `Symbol.getDocumentationComment` (the control becomes `typescript/unstable/ast`'s `getJSDocTags` plus `typescript/unstable/sync`'s `Symbol.getDocumentationComment(checker)`, a string, measured over the core project in 61 ms), and the Option 3 risk sentence naming `ts.getJSDocCommentsAndTags` and `ts.displayPartsToString` as the fallback reader (gone under 7; the fallback is the sync API); `ROADMAP.md` § 1 scaffold rows: the retirement phases R1 (AST-shaped policy rules to the oxlint `policy` plugin), R2 (ESNext fence transpile to `node:module`'s `stripTypeScriptTypes` after its construct coverage and floor are measured; the CommonJS transpile in `tests/guides.test.ts` stays on the bridge), R3 (checker-level work to `typescript/unstable/sync` with a 7.1 re-read obligation and the `Symbol.name` rename), the fleet visit per target (R7 of the reconciliation), and the browser limit.

**Law.** `AGENTS.md`; `.claude/rules/workspace.md`; `.claude/rules/tests.md`; `.claude/rules/quality.md`; `.claude/rules/documentation.md`; `.claude/rules/writing.md` (no counts; `must`/`can`; sentence-case headings); skill: none; guide: `guides/scaffold.md`.

**Host.** `/home/user/scaffold`, bash, Node v22.22.2, npm 10.9.7, npm 11 at `/opt/npm11/bin`; registry through the proxy; `npm install` permitted for this unit.

**Standing conditions.** Editing a vendored file (`configs/**` is not vendored; `tests/setupPolicy.ts` is) requires `npm run build` before `test:src:server`, `test:setup`, `test:config`. The Codex bench is dark.

## Scope

**Owned.** the files in § Sites and § Prose, `package-lock.json`, `host.json`. **Off-limits.** everything else; no commit, no push, no publish, no discarding git command.

**What asserts the state this change ends.** the full gate chain and `PATH=/opt/npm11/bin:$PATH npm run test:distribution -- --mode release`; `npx tsc --version` printing `Version 7.0.2`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Steps

1. `package.json` `typescript` → `^7.0.2`; `npm install`; `npx tsc --version`.
2. The override in both vite configs and the three `dts` templates; `npm run build` (expect green; if the rollup fails on a symbol, stop and report the error text).
3. The browser fork in `constants.ts` and `compilers.ts`, with its tests.
4. Run the suites; update each range literal and snapshot reading its diff; rebuild `host.json` after any vendored edit.
5. The prose.
6. Gates: `npm run format:check && npm run lint:check && npm run check && npm run build && npm test`, then the release-mode distribution proof under npm 11.

## Output

A report at `tmp/units/ts7-seven-report.md`: `npx tsc --version`; each gate's exit code; `git status --short` and `git diff --stat`; every snapshot and fixture diff with its reason; the prose sentences changed, quoted; deviations.

## Deviation contract

Stop and report on a rollup failure with the override in place, on a gate red outside the named literals, and on any generated-workspace failure in the distribution proof whose cause is not a missing bridge or a missing override.

## Acceptance criteria

1. `npx tsc --version` → `Version 7.0.2`.
2. The full gate chain and the release-mode distribution proof exit 0.
3. `git diff` shows the override in both configs and all three templates, the fork, and no change outside the owned files.
