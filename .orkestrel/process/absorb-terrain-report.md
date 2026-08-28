# Unit report: absorb-terrain

Engine: Cursor Grok (`cursor-grok-4.6-high`), through the `grok` driver.
Journal: `tmp/cursor/absorb-terrain.log` (133 lines). Session id: absent — the `-p` plain-print
invocation returned only the final answer with no event-stream header, so the run carries no
recovery handle. Recorded as a reporting gap in the invocation, not a dark bench: the bench
answered.

## Distillate

Source consumers: only `src/server/index.ts:8-10` names an `execution/...` path. No file under
`src/` imports `execute`, `executeSync`, or `detach` directly; every consumer reaches them through
the barrel. `src/server/Supervisor.ts:151` sets the spawn option `detached`, not the `detach`
function.

Test consumers: no test imports an `execution/...` path; each imports from `@src/server`.
`tests/src/server/helpers.test.ts:27` already imports `executeSync` and exercises it under
`describe('buildSpawn')`. `tests/guides.test.ts:56,68,69` imports all three by name.

Configuration: no config file carries the token `execution`. `vite.config.ts:89` globs
`tests/src/server/**/*.test.ts`, which collects both the nested and the flat location.
`configs/src/tsconfig.server.json:12-16` globs `../../src/server/**/*.ts`.

Guides and docs: no guide names a source path under `src/server/execution/`. The only
`execution/` paths are the three test-file links at `guides/process.md:1493,1496,1499`.
`guides/process.md` and `README.md` document the three functions as APIs throughout.

Parity and policy: `tests/guides.test.ts` derives its surface from `readInventory` over `src`
rather than a hand list. `tests/setupPolicy.ts:191-194` registers `src/server/execution` in
`FUNCTION_DOMAIN_FOLDERS`. `tests/setupPolicy.ts:818-823` maps each test to a source stem and
`inspectPolicyMirrorPaths` raises a `mirror` violation when no module matches that stem.

Nothing found: `guides/README.md`, the vendored guides, `scripts/*.sh`, `.claude/`,
`tests/setup*.ts`, `tests/src/core/`, and the other server test files carry no hit. `ROADMAP.md`
is absent.

## Orchestrator's verification

The mirror mechanism was the report's load-bearing claim, so it was read first-hand at
`tests/setupPolicy.ts:818-871` and confirmed: `testToPolicyStem` derives
`src/server/execution/execute` from `tests/src/server/execution/execute.test.ts`, and
`inspectPolicyMirrorPaths` raises a `mirror` violation when no candidate module exists. Deleting
the source folder while leaving the tests in place fails `npm run test:policy`. The test move is
mechanically mandatory rather than tidy.

## Deviation the driver reported

The driver reported ` M package-lock.json` after the run and correctly refused to revert it. The
modification is the Orchestrator's own `npm install` lockfile resync, which ran in the same
window; the bench did not cause it. Attribution corrected here.
