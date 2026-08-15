# H5 second fix round — the whole class, binding proofs, both cursors

Successor to `h5-brief-2.md`. Carries the closing audit's three BROKEN claims and its ruled
findings (Opus reviewer, closing pass on `ce3ad45`). CONFIRMED and closed: the named guards
and their attacks; the honest words; the one-home tail shape; the fixture pair and the proof's
describe home.

## Role and engine

`implementer` route, engine **GPT-5.6 Sol**, resumed on the H5 thread, sandbox
`workspace-write`. Sole serial writer in `/workspace/supervisor` from clean committed baseline
**ce3ad45**. Perform directly, spawn nothing, no commits/pushes/installs.

## Fix items

1. **Every session-ending path clears history** (closing C1): `identify()`'s `AUTH` branch
   (`Operator.ts:181-186`) and `#expire()` (`Operator.ts:501-506`) end or refuse a session
   without calling `#history.clear()`, so a held history `AUTH` released behind a signed-out
   identify passes the manager's unchanged generation, reaches `#refuse`, and writes
   `#fault = EXPIRED` into what the suite itself defines as a resting state
   (`Operator.test.ts:86-91`). Add `this.#history.clear()` to both paths. Add a fourth
   regression shaped like `Operator.test.ts:241`: hold a history read, complete a signed-out
   (`AUTH`) identify, release the held refusal, assert `operator.fault` stays `undefined` and
   the manager is empty. Tighten `HistoryRefusalHandler`'s TSDoc (`types.ts:569-578`): it
   promises a session transition the wired handler does not produce when no session exists —
   state what the handler actually does, and state beside the two handler declarations
   (`types.ts:569,580`) why the roster and history seams bind different methods (`#expire` vs
   `#refuse`).
2. **The identical-re-delivery proof must bind** (closing C3): `HistoryManager.test.ts:190`
   waits on `roster?.snapshot !== CHANGED`, which is already true — `RosterManager.#retain`
   stores `freezeDeep(structuredClone(...))`, so retained is never reference-equal to
   delivered, and the wait resolves before the second delivery lands. Rework: capture
   `const first = roster?.snapshot` before the second `deliver()`, wait on
   `roster?.snapshot !== first`, then assert `changed` is `false`. Prove the corrected test
   binds: record it red with the content-key derivation inverted (or bypassed to reference
   identity), then green as committed — the exact command and both counts in the report.
3. **Both cursors, both encodings** (closing C6): `ClientHistory.test.ts:17` replaced
   `'opaque/+=? token'` with `'watermark:release%2F1%25next'`, dropping the space/plus
   encoding case (`URLSearchParams` serializes space as `+` and `+` as `%2B` — the hard pair).
   Keep both: run the round-trip body over both fixtures (`it.each` or a second case), each
   named for the encoding it proves.
4. **The guide row moves with the type** (closing F3, granted): `guides/src/supervisor.md:1224`
   lists `ApplicationTail` under the server-composition table (`:1165`); after the rehoming it
   is declared in `app/core` and no longer re-exported by `app/server/index.ts`. Move the row
   to the application-role table (`:1062`) beside `ObserveFrame`/`LiveFrame`. This named row
   is the only guide edit granted.
5. **Two advisories folded**: (a) comment `HistoryManager.#rosterKey()` (`:150-155`) stating
   that `status` and `paused` are excluded deliberately and why a pause flip with unchanged
   `updated` therefore does not report `changed`; (b) add the empty-roster-at-load proof — a
   roster delivered with zero runs at first-page load captures baseline `"[]"`, then a run
   appearing flips `changed` to `true` (the input separating "roster absent" from "roster
   present and empty").

## Scope

Owned: `app/browser/controllers/{Operator,HistoryManager}.ts`, `app/browser/types.ts` (the
named TSDoc only), `tests/app/browser/controllers/{Operator,HistoryManager}.test.ts`,
`tests/app/browser/services/ClientHistory.test.ts`, `guides/src/supervisor.md` (item 4's row
only). Everything else off-limits. Forbidden: the standing list; no assertion weakening — item
3 exists because the prior round narrowed one.

## Environment facts

Unchanged: your sandbox denies loopback listeners; the browser suites run natively at the
Orchestrator's acceptance, which this round will extend to `test:policy` and `test:guides`
(the guides project is red at baseline with the recorded U7 parity debt — 8 failures — and
your item 4 must not change that count except through the moved row's own effect; report the
expected count).

## Acceptance criteria

1. The two `clear()` calls landed; the fourth regression written; the TSDoc states the real
   contract and the seam asymmetry.
2. Item 2's red/green pair recorded with commands and counts; the corrected wait provably
   observes the second delivery.
3. Both cursor cases present and named; no other assertion touched.
4. The guide row sits in the application table; listener-free checks and static gates green;
   suites awaiting the Orchestrator enumerated.

## Output

Touched files + diffstat; per-item closure table; the red/green proof verbatim; `git status
--porcelain`; deviations or none. No diary.
