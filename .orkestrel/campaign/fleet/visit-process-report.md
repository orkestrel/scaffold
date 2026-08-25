# Unit VISIT-process — report

## Advisory as taken (`npx --no-install scaffold audit`, first run)

```
setup: The target at . carries a test setup module that no proof covers: tests/setupServer.ts. Add tests/setupServer.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

The `setup:` advisory named one module, `tests/setupServer.ts`. That is the work list. The
`dependencies:` advisory is fleet-wide and out of scope per the brief. The path table's foreign
`orkestrel-human-journey` rows plus `.claude/agents/codex.md` and `.codex/agents/claude.toml` are
left for the Orchestrator to remove at commit, as instructed.

## Proof file added

`tests/setupServer.test.ts` proves `tests/setupServer.ts`'s two exports (`resolveChildFixture`,
`childCommand`) by driving the real fixture as a spawned child process, using real Node resources
per the `setupServer` proof shape. `tests/setup.test.ts` already covers the structural shape of
the returned command and stays untouched (off-limits); this file covers the behavioral contract
that the shape actually spawns and runs as the server suites depend on:

- `childCommand spawned for real > spawns a real child that exits with the requested code and
  reports it through stdout and stderr` — spawns `childCommand('exit', '5')` for real and asserts
  the child's own exit code and both streams, derived from the fixture's independent argv parsing.
- `childCommand spawned for real > omits the detail argument by default, so the fixture falls back
  to its own default exit code` — spawns `childCommand('exit')` with no detail and asserts the
  fixture's own default (`detail = '0'`) took effect.
- `childCommand spawned for real > carries the detail argument through to the fixture unmodified,
  in order` — spawns `childCommand('args', 'left|right')` and asserts the fixture echoed the
  shell-meaningful value back as one argument.
- `resolveChildFixture spawned for real > resolves a path that node itself accepts and runs as a
  script, not merely a path that exists` — spawns `process.execPath` against the resolved path
  directly and asserts it ran as a real script rather than merely existing on disk.

### Mutation control

One control per proof file, as required (one proof file was added):

- `tests/setupServer.test.ts`: changed `expect(result.status).toBe(5)` to
  `expect(result.status).toBe(6)` in the first case. Failing line:
  ```
  FAIL  |setup| tests/setupServer.test.ts > childCommand spawned for real > spawns a real child that exits with the requested code and reports it through stdout and stderr
  AssertionError: expected 5 to be 6 // Object.is equality
   ❯ tests/setupServer.test.ts:15:25
  ```
  Restored, and `npm run test:setup` confirmed green afterward (2 files, 10 tests passed).

## `test:guides` and the `test` chain

`test:guides` already matched the installed scaffold's planned exact value
(`vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`), so no
`npm pkg set` was needed there.

`test:setup` was already declared (`vitest run --config vite.config.ts --no-cache --reporter=dot
--project setup`), so the first `npx --no-install scaffold repair` did not block a `configs` group
demand for it — the manifest step named in the brief's forcing condition did not fire. The
declared `test` chain did invoke `test:setup`, but out of the planned order (at the end instead of
between `test:config` and `test:guides`, per the installed scaffold's compiler at
`node_modules/@orkestrel/scaffold/dist/src/core/index.js:4290-4300`). Adopted the planned order
through `npm pkg set`:

```
npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides
```

## `repair`

Ran `npx --no-install scaffold repair` twice: once before the `test` chain edit (wrote 48
`orchestration`-group files, 0-drift elsewhere), once after (0 written, 132 unchanged — clean).
Retained differing values: none beyond the `test:guides`/`test` chain rows the brief named; no
other script value diverged from plan.

## Gates

- `npm run format` (mutating, run once to converge) — `Finished in 4193ms on 154 files using 4
  threads.`
- `npm run format:check` — `All matched files use the correct format.`
- `npm run lint:check` — closed with no output (exit 0, `deny-warnings` clean).
- `npm run check` — closed with no diagnostics across `tsc --noEmit --project tsconfig.json`,
  `check:src:core`, `check:src:server`.
- `npm run build` — closed green: `dist/src/core/index.cjs` and `dist/src/server/{index.js,
  index.cjs}` built, declaration files bundled.
- `npm test` — **RED**, stopped at `test:guides`:
  ```
  FAIL  |guides| tests/guides.test.ts > Process > lists every test file but the ones named unlisted
  AssertionError: expected [ 'tests/setupServer.test.ts' ] to deeply equal []
  - Expected
  + Received
  - []
  + [
  +   "tests/setupServer.test.ts",
  + ]
   ❯ tests/guides.test.ts:488:6
  ```
  `test:policy` (93/93), `test:config` (46/46), and `test:setup` (10/10, both files) closed green
  before this failure.

## Deviation report

**Expected.** The full gate list, including `npm test`, closing green from proofs in the owned
`tests/**` files alone.

**Found.** `tests/guides.test.ts`'s `Process > lists every test file but the ones named unlisted`
case asserts every `*.test.ts` file under this package's tree is either linked from
`guides/process.md`'s Tests section or named in the file's own `UNLISTED_TESTS` constant (reserved
for vendored fleet-wide proofs: `tests/config.test.ts`, `tests/policy.test.ts`). The new
`tests/setupServer.test.ts` is neither, so the assertion fails with `expected
['tests/setupServer.test.ts'] to deeply equal []` at `tests/guides.test.ts:488`. The fix is a link
row in `guides/process.md`'s Tests section (`tests/guides.test.ts:1310-1318` shows the sibling
`tests/setup.test.ts` row's shape), a file the brief's scope table lists off-limits
(`guides/**`), and `tests/guides.test.ts` itself is also off-limits (`every other test file`).

**Evidence.** Quoted assertion output above; `guides/process.md:1316-1318` carries the existing
`tests/setup.test.ts` link this new file needs a sibling row for; brief scope lines: "**Off-limits.**
`src/**`, `guides/**`, `tests/setup*.ts` modules themselves, every other test file."

**Done / not done.** Proof file, mutation control, `test:guides` value check, the `test` chain
adopt, and `repair` are done and clean. `npm run format:check`, `lint:check`, `check`, and `build`
are green. `npm test` is red at `test:guides` for a cause in an off-limits file
(`guides/process.md`); `test:distribution` and any project past `test:guides` did not run.

**Hypothesis.** `guides/process.md`'s Tests section needs one added row linking
`tests/setupServer.test.ts`, mirroring the existing `tests/setup.test.ts` row.

## Ruling adopted — the guide's Tests row

Added one link row to `guides/process.md`'s Tests section, mirroring the sibling
`tests/setup.test.ts` row at `guides/process.md:1316-1318` in structure and voice. Diff:

```diff
diff --git a/guides/process.md b/guides/process.md
index 4763490..f96ef27 100644
--- a/guides/process.md
+++ b/guides/process.md
@@ -1316,6 +1316,9 @@ The pure decision rows do not prove Windows end to end. They prove the decisions
 - [`tests/setup.test.ts`](../tests/setup.test.ts) — `resolveChildFixture` and `childCommand`, the
   fixture command builders this suite spawns through: where the fixture resolves, and the argument
   vector each mode produces.
+- [`tests/setupServer.test.ts`](../tests/setupServer.test.ts) — the same builders spawned for real:
+  the fixture's own exit code, stdout, and stderr for a supplied detail, its own default when the
+  caller omits one, and the argument vector reaching it unmodified.
 
 ## See also
```

No other line in the guide, and no other file, changed.

### Gates re-run

- `npm run format:check` — already green before the edit (`format` was not needed to converge):
  `All matched files use the correct format.`
- `npm run test:guides` — green: `Test Files 1 passed (1)`, `Tests 100 passed | 1 skipped (101)`.
- `npm test` — **RED**, at `test:src`, before the chain reaches `test:setup` or `test:guides`:
  ```
  FAIL  |src:server| tests/src/server/Process.test.ts > Process > reaches the terminal moment on stop alone with no destroy call
  Error: Test timed out in 5000ms.
   ❯ tests/src/server/Process.test.ts:1331:2
  Test Files  1 failed | 7 passed (8)
       Tests  1 failed | 147 passed | 8 skipped (156)
  ```
  Re-ran the named case alone (`vitest run --project src:server -t "reaches the terminal moment on
  stop alone with no destroy call"`) to rule out contention: it timed out again in isolation, so
  this is not a load-induced flake. `tests/src/server/Process.test.ts` is outside every file this
  unit owns or edited (owned: `tests/setupServer.test.ts`, `package.json`, `package-lock.json`,
  `guides/process.md`'s Tests section, and `repair`-regenerated files). No edit in this unit's scope
  reaches `src/server` or that test file.
- `npx --no-install scaffold audit` — no `setup:` advisory. Remaining advisories: the fleet-wide
  `dependencies: typescript declares major 6` (named out of scope) and the same foreign
  `orkestrel-human-journey`/`.claude/agents/codex.md`/`.codex/agents/claude.toml` rows left for the
  Orchestrator.

### Deviation report — `test:src` red, unowned file

**Expected.** `npm test` closing green end to end after the guide row landed.

**Found.** `tests/src/server/Process.test.ts > Process > reaches the terminal moment on stop alone
with no destroy call` times out at 5000 ms, both inside the full chain and re-run alone.

**Evidence.** Quoted failure above; isolated re-run quoted above; `tests/src/server/Process.test.ts`
is not in this unit's owned-file list (`tests/setupServer.test.ts`, `package.json`,
`package-lock.json`, `guides/process.md`'s Tests section, `repair`-regenerated files) and this unit
made no edit under `src/**` or `tests/src/**`.

**Done / not done.** The ruling's own scope — the guide row, `format:check`, `test:guides`, and the
audit's `setup:` clearance — is done and green. `npm test` end to end is not green; it stops before
reaching `test:setup`/`test:guides` on an unrelated pre-existing timeout.

**Hypothesis.** `tests/src/server/Process.test.ts`'s stop-alone case carries a defect or a
budget too tight for the current host, independent of this unit's changes.

## Working tree at exit

Owned/edited: `tests/setupServer.test.ts` (new), `package.json` (`test:guides` unchanged from
declared/planned value; `test` chain reordered), `package-lock.json` (already dirty from the
0.0.52 re-pin, unchanged further). `repair`-regenerated: 48 `orchestration`-group files (`CLAUDE.md`,
`.agents/**`, `.claude/agents/**`, `.claude/rules/documentation.md`, `.claude/skills/**`,
`.codex/agents/**`). Left alone per standing conditions: the foreign `orkestrel-human-journey`
paths, `.claude/agents/codex.md`, `.codex/agents/claude.toml`. No commit made.
