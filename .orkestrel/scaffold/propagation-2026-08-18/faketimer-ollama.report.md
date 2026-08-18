# Unit report — `ollama`: replace fake timers with real short timers and observable assertions

Status: **implementation done, acceptance blocked**. Every fake-timer site is gone and every
assertion now reads a public surface. Five of the six acceptance criteria cannot be evaluated
because `/workspace/ollama` has no `node_modules`, so no gate binary resolves.

## Touched files

| File                                     | Change                                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| `/workspace/ollama/tests/src/server/OllamaProvider.test.ts` | Rewrote the two deadline describe blocks: real 25 ms deadlines, recorded-signal assertions |
| `/workspace/ollama/tests/setupServer.ts`                    | Added `createRefusingTransport`, `RefusingTransportInterface`, `REFUSED_TRANSPORT_MESSAGE` |
| `/workspace/ollama/tests/setup.test.ts`                     | Added the `createRefusingTransport` proof required by that file's stated contract          |

Diffstat:

```text
 tests/setup.test.ts                     |  45 ++++++++
 tests/setupServer.ts                    |  34 ++++++
 tests/src/server/OllamaProvider.test.ts | 197 ++++++++++++++++++++------------
 3 files changed, 205 insertions(+), 71 deletions(-)
```

## Re-measured site counts

`grep -rho "useFakeTimers\|advanceTimersByTime\|getTimerCount\|useRealTimers\|setSystemTime" tests/ | sort | uniq -c`
before the change:

```text
      4 getTimerCount
      4 useFakeTimers
      4 useRealTimers
```

The brief's table said 4 / 0 / 4 for `useFakeTimers` / `advanceTimersByTime` / `getTimerCount`.
That agrees. Every site sat in the owned file; `advanceTimersByTime` appeared nowhere, so category 2
(scheduler-internal assertions) was the whole job, as the dispatch predicted.

## Configurable period

`OllamaOptions.timeout` (`src/server/types.ts:93`) is the per-call deadline in milliseconds,
defaulting to `120_000`. The provider arms it as a `@orkestrel/timeout` `Timeout` in `#fetch`
(`src/server/OllamaProvider.ts:298`), which calls a real `setTimeout`. Set to `DEADLINE_MS = 25` in
every rewritten test, with `SETTLE_MS = DEADLINE_MS * 4` as the wait past it.

The provider also exposes `OllamaOptions.fetch`, a documented transport seam. That seam is what
makes the deadline observable at all: `#fetch` builds
`AbortSignal.any([timeout.signal, callerSignal])` and hands it to the transport, so a transport that
records the signal it was called with holds the deadline's only caller-visible outlet.

## Each `getTimerCount` site

| Was (line) | What it proved | Replaced by |
| ---------- | -------------- | ----------- |
| 561 — pre-aborted call with a headers hook | No deadline outlived the failed call | Same provider (hook set, `timeout: 25`, recording transport) makes a pre-aborted call and then a live-signal call; after `waitForDelay(100)` the second call's recorded signal is asserted unaborted |
| 583 — async headers hook that rejects | No deadline outlived the rejected hook, and nothing reached the daemon | The daemon claim now runs against the real recording proxy. The deadline claim has **no public observable** — see the weakening note |
| 636 — pre-aborted call, unreachable URL | No deadline outlived the failed call | Same shape as the first row, without the headers hook |
| 654 — unreachable call, live signal | No deadline outlived the failed call | Single live-signal call through the recording transport; after `waitForDelay(100)` the recorded signal is asserted unaborted |

Added one test, `aborts the request the deadline was armed around when that deadline expires`, as the
positive control for the three assertions above: a headers hook that resolves after `SETTLE_MS` holds
the call past the 25 ms deadline, and the recorded signal is asserted **aborted**. Without it,
`expect(signal.aborted).toBe(false)` would be an assertion nobody had seen produce `true`.

## Probe evidence for the instrument

Ran a plain-node replica of `#fetch`'s exact shape (`Timeout` → `setTimeout` → `controller.abort()`,
`AbortSignal.any([timeout.signal, signal])`, recorded transport), with a leak control in both
directions:

```text
live signal, cleared   (expect aborted=false): signals=1 aborted=false
live signal, LEAKED    (expect aborted=true ): signals=1 aborted=true
pre-aborted, cleared   (aborted=true, no discrimination): signals=1 aborted=true
pre-aborted, LEAKED    (aborted=true, no discrimination): signals=1 aborted=true
slow headers, cleared  (control: expect aborted=true): signals=1 aborted=true
```

Two things follow. The recorded signal discriminates a leaked deadline from a cleared one whenever
the caller's signal is live. It cannot discriminate when the caller's signal was already aborted,
because `AbortSignal.any` returns an already-aborted signal and a later abort on `timeout.signal` is
a no-op. That is why each pre-aborted test now carries a live-signal companion call.

I also probed `process.getActiveResourcesInfo()` as an alternative instrument and **rejected it**.
It is clean in an idle process but unusable under background timer churn — 20 of 40 clean runs
reported a nonzero delta, in both directions:

```text
noisy clean deltas: [0,-1,0,1,1,1,1,1,0,0,1,0,0,1,-1,0,1,1,-1,0,0,-1,0,0,0,0,0,-1,0,0,-1,0,1,-1,-1,0,0,-1,0,1]
```

I also measured loopback connection refusal to size the deadline: median 0.14 ms, but **75.7 ms on
the first `fetch` of a process** (undici lazy init). A real network call inside a 25 ms deadline
window would therefore race whenever this file runs first in a worker. The refusing transport
settles in-process, so the observation has no race at all. Real unreachable-daemon rejection stays
proven by the untouched `OllamaProvider (unreachable)` describe block, which uses the global `fetch`.

## Test counts

| File | Before | After |
| ---- | ------ | ----- |
| `tests/src/server/OllamaProvider.test.ts` | 29 | 30 |
| `tests/setup.test.ts` | 55 | 59 |

Counted with `grep -c "\bit("` against `git show HEAD:<file>` and the working copy. No test was
deleted, skipped, or converted to `.todo`.

Commands the counts would be confirmed by, once dependencies exist:
`npm run test:src` (project `src:server`) and `npm run test:setup` (project `setup`). Neither ran —
see the blocker.

## Assertions that are now weaker, and why

One, stated plainly.

**`an async-headers hook that REJECTS`** no longer proves the deadline was cleared. When the headers
hook rejects, the provider never calls the transport, so no signal is recorded and the deadline has
no caller-visible outlet. Every route was checked: `Timeout` is constructed inside `#fetch` with no
injection point; `combined` reaches the caller only through the transport; the hook receives no
arguments; and `timeout.signal` aborting is unobservable once `combined` is aborted or was never
handed out. Closing this needs a `src/**` seam — the simplest being for `#fetch` to accept or expose
the deadline it arms — which the brief puts out of scope. Reporting it rather than papering over it.

Two compensating notes. The defect the original guarded is a single code path: the `catch` in
`#fetch` at `src/server/OllamaProvider.ts:329-335` that calls `timeout.clear()`. Deleting that call
now fails three tests observably. And the same test got **stronger** elsewhere: it previously pointed
the provider at `http://127.0.0.1:1` while asserting `proxy.requests.length === 0` on a proxy the
provider never addressed, so the assertion was vacuous. The provider now addresses `proxy.url`, and
a request escaping the rejected hook would be recorded.

The two pre-aborted tests are weaker against one narrower hypothetical only: a defect that skips
`timeout.clear()` **exclusively** when the caller's signal was pre-aborted. No such branch exists in
the source; the catch is signal-agnostic.

## Acceptance criteria

| # | Criterion | Result |
| - | --------- | ------ |
| 1 | `grep -rn "useFakeTimers\|advanceTimersByTime\|getTimerCount\|useRealTimers\|setSystemTime" tests/src/` returns nothing | **PASS** — exit 1, no output |
| 2 | `npm run lint:check` exits 0 | **BLOCKED** — exit 127, `sh: 1: oxlint: not found` |
| 3 | Owned file passes with a count ≥ before | **BLOCKED** — `npm run test:src` exit 127, `sh: 1: vitest: not found`. Count is 29 → 30 statically |
| 4 | File runtime under 10 s | **BLOCKED** — not measurable. Added real waits total 500 ms across five tests |
| 5 | `npm run check` exits 0 | **BLOCKED** — exit 2, three `TS2688` errors: cannot find type definitions for `node`, `vite/client`, `vitest/globals` |
| 6 | Formatter check on the owned files | **PASS** — see the note below |

Criterion 6 detail: this repository formats with **oxfmt**, not prettier (`npm run format:check` is
`oxfmt --config .oxfmtrc.json --check .`). `oxfmt` is unavailable for the same reason as the other
gates. Prettier 3.8.1 is installed globally, and `.oxfmtrc.json`'s options map onto it one for one,
so I ran prettier as a faithful proxy:

```text
prettier --check --use-tabs --tab-width 2 --no-semi --single-quote --trailing-comma all \
  --print-width 100 --end-of-line lf \
  tests/src/server/OllamaProvider.test.ts tests/setupServer.ts tests/setup.test.ts
→ All matched files use Prettier code style!   EXIT:0
```

Because `tsc` could not run, I type-probed the new helper in isolation under this repository's exact
strict options (`noUnusedParameters`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`,
`verbatimModuleSyntax`, `strict`) with no `@orkestrel` dependency. It compiles clean, and the probe's
control fails as it must:

```text
probe (with `_input`):  EXIT:0
control (with `input`): control.ts(16,9): error TS6133: 'input' is declared but its value is never read.
```

That covers the helper's typing. It does not cover the test file's imports or the provider's option
types, which need the real dependency graph.

## Deviations

Four. The first blocks acceptance; the rest are brief facts that do not hold in this repository.

1. **`node_modules` is absent.** 43 of the 44 repositories under `/workspace` have one; `ollama` does
   not. `ls -d /workspace/*/node_modules | wc -l` → 43, `ls -d /workspace/ollama/node_modules` →
   `No such file or directory`. Every gate fails on a missing binary or type library, none of it
   caused by this change. The permission floor forbids me from installing, so criteria 2–5 need
   `npm ci` run by the Orchestrator, then a re-run of `lint:check`, `check`, `test:src`, and
   `test:setup`.
2. **The tree was clean at dispatch, not dirty.** `git status --porcelain` at `HEAD` 5ebc6ec
   (`Align with the scaffold host and re-pin the fleet to the registry's versions`) returned zero
   lines. The brief's "~27 uncommitted vendored-host changes" were not present. The only modified
   files now are the three I own.
3. **`policy(no-mocking)` does not exist in this repository.** `.oxlintrc.json` registers only the
   `import`, `typescript`, and `vitest` plugins and declares no policy rule.
   `grep -rl "mocking" .` excluding `.git` matches nothing. `tests/setupPolicy.ts` inspects only
   `{app,src}/**` for placement and `tests/{app,src}/**/*.test.ts` for mirrors, with no mocking rule.
   So `lint:check` would not have failed on the stated rule even with dependencies installed. The
   rewrite still stands on its own: `.claude/rules/tests.md` bans replacing the host clock and
   asserting scheduler internals regardless of whether a linter enforces it.
4. **`tests/config.test.ts` does not contain `useFakeTimers`.** The pre-change grep matched only the
   owned test file. Nothing to leave alone there.

## Notes for integration

- `tests/setup.test.ts` states in its own header that every helper exported from `tests/setup.ts` and
  `tests/setupServer.ts` is proved there, so the new export carries four tests. That file matches the
  brief's owned `tests/setup*.ts` glob and appears in no off-limits list.
- The `src:server` and `setup` Vitest projects both gain work; only `src:server` covers the owned
  file.
- No source file was touched. `git status --porcelain` lists exactly the three test files.
