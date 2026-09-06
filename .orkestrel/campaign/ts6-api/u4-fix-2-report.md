# Unit report — U4-fix-2

## Edit 1: the fixture's shape

In `tests/src/core/templates.test.ts`, case `classifies staged exports by browser reachability and runtime format` (about lines 1565–1666), every `declaration` literal in the expected `entries` now carries booleans: a resolved path string becomes `true`, `undefined` becomes `false`. Seven entries changed (`decl-cts-rt-mjs`, `decl-mts-rt-cjs`, `invalid`, `esm-only`, `browser`, `module-sync`, `node-addons`); every other member (`subpath`, `specifier`, `mapping`, `browser`, `module`, `commonjs`, `required`, `targets`, `subpaths`, `undeclared`, `excluded`) is unchanged, and the case's name and comment are unchanged.

## Edit 2: the fold

In `src/core/templates.ts`, `requireDriver` and `const BROWSER_DRIVER = requireDriver('bundler')` are replaced by:

```ts
const BROWSER_DRIVER = RESOLUTIONS.find((candidate) => candidate.label === 'bundler')
if (BROWSER_DRIVER === undefined) throw new Error("RESOLUTIONS carries no 'bundler' row")
```

This matches the file's other module-scope guard style (line 88: `if (path === undefined) throw new Error(...)`), and keeps the preceding comment naming why the browser face answers under the `bundler` driver alone. `BROWSER_DRIVER` stays narrowed to `Resolution` at its one use site (line 2060) because it is a module-scope `const`.

## Unknown: staged proof reading

Ran `bash /home/user/scaffold/.orkestrel/campaign/ts6-api/instruments/u4/proof.sh` after rebuilding `dist/src/core` and `dist/bin` (`npm run build:src:core`, `npm run build:src:bin`) so the emitted proof reflects the folded template. Output:

```
core: 925 lines, ownership=presence
browser: 1039 lines, ownership=presence
emit exit=0
baseline exit=0
 Test Files  1 passed (1)
      Tests  11 passed (11)
   Start at  17:06:11
   Duration  23.49s (transform 171ms, setup 0ms, import 3.90s, tests 19.42s, environment 0ms)

plant extra removed; /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/u4/stage/dist/src/core/index.js restored
extra: 3 lines name the plant; vitest exit=1
plant undeclared removed; /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/u4/stage/dist/src/core/index.d.ts restored
undeclared: 3 lines name the plant; vitest exit=1
```

This is the expected reading: `baseline exit=0` with every test passed (11 passed), and each plant reporting lines naming it (`3 lines name the plant`) with `vitest exit=1`.

## Acceptance criteria

1. `npx oxfmt --config .oxfmtrc.json --check src/core/templates.ts tests/src/core/templates.test.ts` — PASS. "All matched files use the correct format." exit 0.
2. `npx oxlint --config .oxlintrc.json --deny-warnings src/core/templates.ts tests/src/core/templates.test.ts` — PASS. No output, exit 0.
3. `grep -n "requireDriver" src/core/templates.ts` — PASS. No matches (exit 1, no output).
4. `npx tsc --noEmit --project tsconfig.json` — PASS. Exit 0, no diagnostics.
5. `npm run test:src:core` — PASS. "Test Files 9 passed (9)", "Tests 385 passed (385)", exit 0.
6. Staged proof instrument — PASS. See the quoted reading above: `baseline exit=0`, 11 tests passed, both plants (`extra`, `undeclared`) report 3 lines naming the plant and `vitest exit=1`.

## Deviations

None. Every expectation member other than `declaration` in the case matched what the classifier emits; the fold needed only the two owned symbols in `src/core/templates.ts`; the staged proof reddened only the planted controls.

## Review evidence

`git diff` and `git status --short` are left for the Orchestrator to capture, per the brief.
