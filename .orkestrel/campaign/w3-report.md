All owned files, no off-limits touched, no other files changed. Final report follows.

## Report — W3: bounded createTeardown adoption

### Converted (multi-call `finally` blocks, adopted `createTeardown`)

**`tests/src/server/stages/RuntimeStage.test.ts`** — 30 blocks converted (`stage.destroy()`/`scratch.destroy()` pairs, `outside.destroy()` triple, `rmSync(dependency|directory|blocker|cache)` pairs, the per-iteration `rmSync(file)`/`vitest.close()` loop block, the two `directory`-walk cleanup blocks, `first.destroy()`/`second.destroy()`). Import updated to add `createTeardown`.

**`tests/src/server/stages/TypeStage.test.ts`** — 9 blocks converted (`stage.destroy()`/`scratch.destroy()` pairs, `rmSync(dependencyFile|candidateFile)` pairs, the three-`rmSync` block, the two-`rmSync` block, the extends-chain `rmSync(directory)` block). Import updated.

**`tests/src/server/stages/LintStage.test.ts`** — 9 `stage.destroy()`/`scratch.destroy()` blocks converted. Import updated.

**`tests/src/server/Probe.test.ts`** — 15 blocks converted: 11 `probe.destroy()`/`scratch.destroy()` pairs and 4 `probe.destroy()`/`rmSync(blocker|lax×2|spec)` pairs. Import updated.

**`tests/src/server/ProbeServer.test.ts`** — 3 blocks converted: the two `removeListener('data', ...)` + conditional `pause`/`resume` blocks, and the `removeListener('SIGINT'...)`/`removeListener('SIGTERM'...)` block. Wrapped `process.stdin.pause/resume` and `process.removeListener` calls in block-bodied arrows because their return values (`ReadStream`, `Process`) aren't assignable to `TeardownHandler`'s `void | Promise<void>`. Import updated.

**`tests/src/core/errors.test.ts`** — 1 block converted (`workspace.destroy()`/`outside.destroy()`). The enclosing `it` callback changed from sync to `async` because `teardown.destroy()` returns a `Promise`. Added `createTeardown` import from `@orkestrel/test`.

**`tests/src/bin/main.test.ts`** — 7 blocks converted: two `child.kill`(conditional)/`scratch.destroy()` blocks, two `output.close()`/conditional-kill/`rmdirSync`-try blocks (one with an extra `rmSync(diagnostic)`), two `client.disconnect()`/`rmdirSync`-try blocks, and the trailing `child.kill`(conditional)/`scratch.destroy()` block. Import updated.

Registration order in every conversion is the reverse of the original statement order, so `createTeardown`'s newest-first `destroy()` reproduces the original execution order while now aggregating every handler's failure instead of an early throw skipping the rest.

### Skipped (multi-call blocks left byte-identical, with reason)

- `tests/src/server/stages/RuntimeStage.test.ts:1447` (`'continues teardown when a generated specification cannot be unlinked'`) — `await stage.destroy().catch(() => {})`, `await inspection.catch(() => {})`, `scratch.destroy()`. Both awaited calls explicitly swallow their own failures; `createTeardown`'s `destroy()` throws (or aggregates) on a failed handler, which would turn an intentionally-absorbed cleanup failure into a new test failure. Reported per the deviation contract rather than improvised.
- `tests/src/server/Probe.test.ts:616-618` (exit-code restore) — `await probe.destroy()` then `process.exitCode = inherited`. The second statement is a variable assignment, not a teardown call, so the block holds exactly one teardown call.
- `tests/src/server/Probe.test.ts:1450-1461` (`'destroys idempotently and observes one error for a later proof'`) — nested nested `try/finally` for a file descriptor, then `await (closing ?? probe.destroy()).catch(() => {})`, then `scratch.destroy()`. The awaited call swallows its own failure by design (the test is proving idempotent-destroy behavior, not asserting clean teardown), so wrapping it in `createTeardown` would change failure semantics the same way as the `RuntimeStage` case above.
- `tests/src/server/ProbeServer.test.ts:101-107` (`'returns the process it seized, and settles once'`) — `closing = server.destroy(); expect(server.destroy()).toBe(closing); await closing`. One teardown target (`server.destroy()`), reused and asserted for latch identity; not a second independent teardown call.
- `tests/src/server/ProbeServer.test.ts:131-134` (`'restores the standard input flow it found'`) — `if (initial) process.stdin.pause(); else process.stdin.resume()`. Exactly one branch executes per run, so only one call ever fires; not a multi-call block.

Every other `finally` block in the owned files (`tests/src/bin/main.test.ts`, `tests/src/core/errors.test.ts`, `tests/src/server/Probe.test.ts`, `tests/src/server/ProbeServer.test.ts`, `tests/src/server/helpers.test.ts`, `tests/src/server/stages/*.test.ts`) held a single teardown call and was left byte-identical per the brief (`tests/src/server/helpers.test.ts` has no multi-call blocks at all — every `finally` there is a lone `scratch.destroy()`).

### Gate tails

```
$ npx oxlint --config .oxlintrc.json <7 touched files>
(no output — clean)

$ npx oxfmt --config .oxfmtrc.json --check <7 touched files>
Checking formatting...
All matched files use the correct format.
Finished in 8ms on 7 files using 4 threads.

$ npx tsc --noEmit --project tsconfig.json
(no output — clean)
```

### Scoped suite runs (no spawned children)

```
$ npx vitest run tests/src/core/errors.test.ts
Test Files  1 passed (1)   Tests  8 passed (8)

$ npx vitest run tests/src/server/ProbeServer.test.ts
Test Files  1 passed (1)   Tests  9 passed (9)

$ npx vitest run tests/src/server/stages/TypeStage.test.ts
Test Files  1 passed (1)   Tests  22 passed (22)

$ npx vitest run tests/src/server/stages/RuntimeStage.test.ts
Test Files  1 passed (1)   Tests  39 passed (39)

$ npx vitest run tests/src/server/Probe.test.ts
Test Files  1 passed (1)   Tests  26 passed (26)
```

### Host observations (spawning suites, recorded rather than run inline)

- `tests/src/bin/main.test.ts` spawns the built entry as a real child process (`spawn(process.execPath, [BUILT_ENTRY], ...)`). Run with: `npx vitest run tests/src/bin/main.test.ts` (requires `npm run build` first so `BUILT_ENTRY` exists; several cases are `skipIf(!existsSync(TERMINAL))`-gated).
- `tests/src/server/stages/LintStage.test.ts` spawns a real language-server child process (`spawn(...)`). Run with: `npx vitest run tests/src/server/stages/LintStage.test.ts`.

### `git diff --stat`

```
tests/src/bin/main.test.ts                   | 106 +++++++++------
tests/src/core/errors.test.ts                |   9 +-
tests/src/server/Probe.test.ts               |  92 ++++++++-----
tests/src/server/ProbeServer.test.ts         |  36 +++--
tests/src/server/stages/LintStage.test.ts    |  56 +++++---
tests/src/server/stages/RuntimeStage.test.ts | 192 +++++++++++++++++----------
tests/src/server/stages/TypeStage.test.ts    |  50 ++++---
7 files changed, 355 insertions(+), 186 deletions(-)
```

### `git status --porcelain`

```
 M tests/src/bin/main.test.ts
 M tests/src/core/errors.test.ts
 M tests/src/server/Probe.test.ts
 M tests/src/server/ProbeServer.test.ts
 M tests/src/server/stages/LintStage.test.ts
 M tests/src/server/stages/RuntimeStage.test.ts
 M tests/src/server/stages/TypeStage.test.ts
```

No off-limits file touched, no commits made.