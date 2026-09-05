# Unit ts7-probe — `@orkestrel/probe` resolves the target workspace's compiler through the bridge when `typescript` is 7

## Role and engine

`implementer` on Opus 5, a native Claude Code subagent, the sole writer in `/home/user/fleet/probe` (a checkout disjoint from `/home/user/scaffold`, where another writer is live; touch nothing outside `/home/user/fleet/probe`). Perform the assignment directly and spawn nothing. The Sol bench is dark; the substitution is recorded in the campaign ledger.

## Objective

Make `loadWorkspaceModule(workspace, 'typescript')` return a compiler that carries the in-process API whatever major the workspace installs: the workspace's `typescript` when it exports `createProgram` as a function, otherwise the workspace's `@typescript/typescript6`; widen the optional peer; take probe's own type imports from the bridge; pin the behaviour with tests; state it in the guide. `typescript` stays at `^6.0.3` in probe's own `devDependencies` (the fleet visit moves it later).

## Context

**Evidence.** From `/home/user/scaffold/.orkestrel/campaign/ts7/` (`orchestrator-measurements.md`, `absorb-distillate.md` row 2, `reconciliation.md` R6): under `typescript@7.0.2`, `require('typescript')` returns `{ default, version, versionMajorMinor }` and nothing else, so `TypeStage`'s `readConfigFile`, `parseJsonConfigFileContent`, `sys`, `createLanguageService`, `getDefaultLibFilePath`, and `ScriptSnapshot.fromString` all throw at first call. `@typescript/typescript6` (registry 6.0.2, `main: ./lib/typescript.js`, a wrapper over `@typescript/old: npm:typescript@^6`) exports the whole 6.0.3 API and its `version` reads `6.0.3`; its typings are `lib/typescript.d.ts`. `unplugin-dts` performs the same resolution: `require('typescript')`, keep it if `typeof ts.createProgram === 'function'`, else `require('@typescript/typescript6')`.

Sites in this checkout: `src/server/helpers.ts:399-421` (`loadWorkspaceModule`, its overloads and TSDoc with the `@example`), `src/server/stages/TypeStage.ts:3-11` (type-only imports from `'typescript'`) and `:75-76` (the load), `tests/src/server/helpers.test.ts:633-634` and `:736` (the version and the loaded module), `tests/src/core/errors.test.ts:230` (the `missing` case), `guides/probe.md:43` (`Toolchain`), `:212` (`loadWorkspaceModule` row), `:453`, `:598`, `:630-637`, `:686` (the receipt names `typescript@<version>`), `package.json:116-131` (`peerDependencies.typescript` `^6.0.3`, optional).

**Law.** `AGENTS.md` (§ Non-negotiable rules: the bridge is the one package this campaign adds, on the owner's request for the move; add no other), `.claude/rules/typescript.md`, `.claude/rules/patterns.md` (errors), `.claude/rules/tests.md` (real implementations; a fixture workspace is a temporary directory with a real `package.json` and real modules), `.claude/rules/documentation.md` (guide parity), `.claude/rules/writing.md`; skill: none; guide: `guides/probe.md`.

**Host.** `/home/user/fleet/probe` at `b331d93`, clean; Node v22.22.2; `node_modules` installed with `typescript` 6.0.3. The registry is reachable through the proxy; `npm install` is permitted for this unit alone (the bridge devDependency is the change).

**Standing conditions.** `tests/setupPolicy.ts` and `tests/distribution.test.ts` import `'typescript'` and are the fleet visit's to change, not this unit's; they keep working because `typescript` stays 6.0.3 here. The `probe` MCP server registered in scaffold's `.mcp.json` runs this package's published build; it is not needed by this unit.

## Unknowns

- Whether `ProbeError`'s `code` union already carries a value for "resolved but without the API"; read `src/core/types.ts` and use `malformed` if it fits the documented meaning, else report the union you would extend and stop.

## Scope

**Owned.** `package.json` (the bridge in `devDependencies`, the widened optional peer `typescript: "^6.0.3 || ^7.0.0"`, and the new optional peer `@typescript/typescript6: "^6.0.2"`), `package-lock.json`, `src/server/helpers.ts` (`loadWorkspaceModule` and any helper it needs, centralized per `.claude/rules/architecture.md`), `src/server/stages/TypeStage.ts` (type imports only, from `@typescript/typescript6`), `src/server/types.ts` if a type there names `typescript`, `tests/src/server/helpers.test.ts`, `tests/src/core/errors.test.ts`, `tests/setupServer.ts` if a fixture workspace helper lives there, `guides/probe.md` (the `loadWorkspaceModule` row and the paragraph that explains the resolution; the receipt paragraph if the version it prints needs a sentence: it prints the loaded compiler's `version`, which is the bridge's `6.0.3` on a 7 workspace).

**Off-limits.** everything else in this checkout, and every path outside `/home/user/fleet/probe`.

**What asserts the state this change ends.** `npm run format:check`, `lint:check`, `check`, `build`, `test` in `/home/user/fleet/probe`; the new tests.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash inside `/home/user/fleet/probe`. No commit, no push, no publish, no discarding git command.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Steps

1. Read `loadWorkspaceModule`, `TypeStage`'s use of the module, the error contract in `src/core/types.ts` and `errors.ts`, and the two tests.
2. `package.json`: devDependency `@typescript/typescript6` `^6.0.2`; peers as § Scope; `npm install --no-audit --no-fund`.
3. `loadWorkspaceModule`: resolve `typescript` from the workspace; when the module's `createProgram` is a function return it; otherwise resolve `@typescript/typescript6` from the workspace and return it; when `typescript` is absent and the bridge is absent, the existing `missing` error; when `typescript` resolves without the API and the bridge is absent, a `ProbeError` whose message says the workspace's `typescript` carries no in-process API and names the bridge, with `code` per § Unknowns and `context` naming both specifiers. Keep one implementation (no duplicated require paths) and update the TSDoc and its `@example`.
4. `TypeStage.ts`: `import type * as TypeScript from '@typescript/typescript6'` and the named types from the same specifier; no runtime import.
5. Tests, with real temporary workspaces (no mocks): a workspace whose `node_modules/typescript/package.json` and `index.js` export only `{ version }` and whose `node_modules/@typescript/typescript6` is a real link or copy of this checkout's installed bridge → the loaded module carries `createProgram` and `version` `6.0.3`; the same stub without the bridge → the new error; the existing `missing` case unchanged; the existing real-workspace case unchanged. Record the failing run before the fix and the passing run after (`.claude/rules/quality.md`).
6. Guide parity: `tests/guides.test.ts` must stay green; the `loadWorkspaceModule` row's summary and the resolution paragraph.
7. Gates: `npm run format:check && npm run lint:check && npm run check && npm run build && npm test`; record each exit code.

## Output

A report at `/home/user/fleet/probe/tmp/units/ts7-probe-report.md` (create `tmp/units/`): the red-then-green test commands with their counts, each gate's exit code, `git status --short` and `git diff --stat`, the error code chosen and why, deviations. Make your final message that report's text.

## Deviation contract

Stop and report on a gate red outside the owned files, on a `code` union that needs extending, on a fixture that cannot be built from real modules, and on any need to touch the shared-pair files.

## Acceptance criteria

1. The new tests fail before the change and pass after, with the commands recorded.
2. `npm run format:check`, `lint:check`, `check`, `build`, `test` exit 0 in `/home/user/fleet/probe`.
3. `grep -rn "from 'typescript'" src` returns nothing; `tests/setupPolicy.ts` and `tests/distribution.test.ts` are untouched.
4. `package.json` carries the bridge devDependency and the two optional peers.
