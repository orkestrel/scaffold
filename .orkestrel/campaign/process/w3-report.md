# Unit W3 report — process refusal spawn evidence and placement ruling

Both acceptance criteria sets are met. The refusal case now proves a child was spawned and
terminated, the spawn-suppression control reddened exactly that proof, and the placement ruling is
in `guides/process.md`.

## Touched files

| File                                     | Change                                                                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `tests/src/server/ProcessManager.test.ts` | Replaced the marker-absence branch in the mid-construction refusal case with a recorder-based spawn proof plus a registered-child control; dropped the `retryUntil` import the removed `win32` fork used. |
| `guides/process.md`                       | Added the spawning-proof placement and budget-sizing passage at the head of `## Tests`.                            |

Diffstat:

```text
 guides/process.md                       |  15 +++++
 tests/src/server/ProcessManager.test.ts | 114 ++++++++++++++++----------------
 2 files changed, 73 insertions(+), 56 deletions(-)
```

No shared or off-limits file is modified. `git status --porcelain` reports exactly the two owned
files. `src/` is clean.

## The strengthened case

`tests/src/server/ProcessManager.test.ts:154`, named
`refuses a launch whose own options destroyed the registry mid-construction, and tears down the child that launch spawned`.

Shape:

- The refused launch passes `on: { exit: refused.handler }` through its own options, alongside the
  `grace` getter that starts `manager.destroy()` mid-construction. The fixture is
  `childCommand('sleep')`, which stays alive until `SIGTERM`, so its terminal event can only exist
  if the registry both spawned it and tore it down.
- `await Promise.all(teardown)` is the destroy barrier. `const settled = refused.count` snapshots
  the recorder at that instant.
- The control is a second registry launching the same fixture with the same `on` hook and the same
  `grace`, with the race removed, torn down by its own `await covered.destroy()`. It establishes
  that an `on` hook receives a terminal event at all, so an empty `refused` recorder reports an
  absent child rather than an uninstalled hook.
- `waitForCondition('the refused launch reaches the terminal moment of the child it spawned', () => refused.count === 1, { budget: 5_000 })`
  runs before any `expect`, so a snapshot that was empty at the barrier is separated from a child
  that never terminated: the condition's own message fires for the second, and `expect(settled).toBe(1)`
  fires for the first.
- Assertions: `isProcessError(thrown)` is `true`; the code is `protocol`; `manager.count` is `0`;
  `registered.count` is `1`; `settled` is `1`.
- The case carries `{ timeout: 15_000 }` with a comment sizing it from the contended reading below.

Removed from the case: the `process.platform === 'win32'` fork, the `announce` marker file, the
`createScratch` allocation, the `markerValid` / `terminationValid` / `pid` bookkeeping, and the
`try`/`finally` that killed a leaked process id. The case now allocates no filesystem resource and
leaks no child.

**Unknown resolved.** The recorder helper is `createRecorder` from `@orkestrel/test`, typed
`createRecorder<readonly [ProcessExit]>()` and wired through the `ProcessOptions.on` hook map as
`on: { exit: recorder.handler }` — the same mechanism the existing proof at `:263` uses. The
refusal path delivers to it: the seam the design assumes is present, so the deviation contract did
not fire.

## The mutation control

The mutation, made in `src/server/ProcessManager.ts` between `this.#ids.add(id)` and
`const child = this.#construct(id, options)`:

```ts
if (options.grace !== undefined && this.#destroying) throw createProtocolError(id)
```

Reading `options.grace` runs the caller's getter, which starts the teardown, so the launch is
refused before `#construct` spawns anything. The refusal is still `protocol` and the registry is
still empty, so every assertion except the spawn evidence still holds — which is precisely the
condition the old marker-absence branch also passed under.

Command:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/ProcessManager.test.ts -t 'tears down the child that launch spawned'
```

Result with the mutation applied — `Tests 1 failed | 13 skipped (14)`:

```text
FAIL |src:server| tests/src/server/ProcessManager.test.ts > ProcessManager > refuses a launch whose own options destroyed the registry mid-construction, and tears down the child that launch spawned
Error: Condition "the refused launch reaches the terminal moment of the child it spawned" did not hold within 5000ms (waited 5002.09259ms)
 ❯ waitForCondition node_modules/@orkestrel/test/src/core/helpers.ts:67:9
 ❯ tests/src/server/ProcessManager.test.ts:201:4
```

The failing line was `tests/src/server/ProcessManager.test.ts:201`, the `waitForCondition` call. A
later comment edit moved that same call to `:203`; nothing else about it changed.

The mutation is reverted. `git diff --stat -- src/` returns empty output, and the same scoped
command reports `Tests 14 passed (14)` afterwards.

## The contended reading

```text
npm run test:src   →  Test Files 8 passed (8) | Tests 149 passed | 8 skipped (157)
                      Duration 6.94s (transform 1.08s, setup 160ms, import 1.60s, tests 12.86s)
```

Taken on Linux with Node v22.22.2 on 2026-08-25, with the strengthened case in place. The same
file run alone reports `Duration 1.97s`. The 12.86s of aggregate test time compressed into 6.94s of
wall time is the contention the guide passage cites, and the case's `15_000` timeout clears that
aggregate.

## The guide passage

Added as the opening of `## Tests` in `guides/process.md`, before the existing platform-coverage
paragraphs:

> Every proof that starts a real child runs in the `src:server` project, because spawning is this
> package's server subject. Such a proof is an expensive one, and the fixed isolated projects carry
> different subjects: the `distribution` project proves what the packed artifact installs, and the
> `service` project proves a live external service. This package drives no external service, so it
> declares no `service` project at all. Filing a spawn proof under either subject moves it out of
> the default gate, and the package's own behavior then goes unproven until a publish.
>
> Size every budget in a spawning suite — a case timeout, a termination wait, a condition budget —
> from a full contended run rather than from an isolated one. Those suites start real children
> concurrently, so each case pays for the children every other file starts beside it. On Linux with
> Node v22.22.2 on 2026-08-25, `npm run test:src` reported a 6.94s wall duration over 12.86s of
> aggregate test time, while the `tests/src/server/ProcessManager.test.ts` file alone reported
> 1.97s. A budget sized from the isolated cost turns that contention into a red gate reporting a
> timeout, and a timeout carries no diagnostic about the code.

The passage names no export and adds no link, so guide parity and link resolution are untouched.

## Validation

| Command                                                                                                              | Result                                       |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/ProcessManager.test.ts` (baseline, at HEAD) | `Tests 14 passed (14)`, 2.14s                |
| the same command, with the spawn-suppression mutation and `-t 'tears down the child that launch spawned'`             | `Tests 1 failed \| 13 skipped (14)`          |
| the same command, mutation reverted                                                                                   | `Tests 14 passed (14)`, 1.95s                |
| `npm run test:src`                                                                                                    | `Tests 149 passed \| 8 skipped (157)`, 6.94s |
| `npm run test:guides`                                                                                                 | `Tests 100 passed \| 1 skipped (101)`, 1.59s |
| `npx oxlint --config .oxlintrc.json --deny-warnings tests/src/server/ProcessManager.test.ts`                           | exit 0                                       |
| `npx oxfmt --config .oxfmtrc.json --check guides/process.md tests/src/server/ProcessManager.test.ts`                   | `All matched files use the correct format.`  |

The lint and format runs are non-mutating and scoped to the owned files. No tree-wide `check`,
`build`, `lint --fix`, or `format` ran, and no git state changed.

## Deviation state

No deviation. The refusal path delivers the terminal event to a caller-supplied `on` hook, so the
contract's stop condition did not arise.

## Findings outside this unit's scope

Two observations for the Orchestrator to rule on. Neither is acted on here.

1. **The strengthened case and the case at `:263` now carry overlapping claims.** Both drive the
   same `grace`-getter race, both install an `on: { exit }` recorder, both run a registered-child
   control, both snapshot the recorder at the destroy barrier, and both assert that snapshot is
   `1`. They are framed differently — mine claims the refusal really spawned and tore down a child,
   `:263` claims the terminal moment precedes the barrier — but a change that falsifies one reddens
   the other. The ruling was fixed and named `:263` as the mechanism to reuse, so I implemented it
   as written rather than folding the cases together. Recommendation: one case carrying the
   protocol refusal, the empty registry, the spawn evidence, and the barrier ordering, with the
   registered-child control. That is a one-file successor unit.
2. **The condition budget at `:306` cannot expire.** The `:263` case passes `{ budget: 10_000 }` to
   `waitForCondition` while carrying no explicit test timeout, so Vitest's 5s default kills the case
   first and the condition's own description never reaches the reader. The strengthened case avoids
   this by pairing a `5_000` budget with a `15_000` timeout. If the cases are merged per the
   preceding finding, this closes with them; otherwise `:263` needs the same pairing.
