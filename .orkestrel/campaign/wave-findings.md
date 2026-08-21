# Adoption wave — carried findings

Findings surfaced by wave visits, each with its carrier. None reopens the accepted 0.0.9 scope;
each belongs to the named next change.

## Carried to the next @orkestrel/test change

- **`createRecorders` cannot infer its event map from an emitter argument.** `TMap` appears only
  inside the generic `on` method of `EventSourceInterface`, which yields no inference candidate,
  so every call names both type arguments and imports the event-map type. Reported independently
  by the worker visit and the mcp visit (14 call sites there). Candidates measured by the visits:
  an `EmitterInterface`-shaped overload, or a `TMap`-inferable position on `EventSourceInterface`.
  Carrier: the next @orkestrel/test API change.
- **`createSignal` cannot instrument an externally produced signal, and its `count` is a net
  tally.** The factory builds its own `AbortController`, so a suite instrumenting a signal the
  unit under test produced — `workflow.signal`, or the signal a live workflow function receives —
  cannot adopt it. Its single live `count` (adds minus removes) also reads 0 both for a
  never-subscribed signal and for one attached then detached, while leak proofs assert those
  apart through separate added and removed tallies. Measured by the workflow visit against the
  shipped source on 2026-08-21; workflow keeps `instrumentSignal` local until this closes.
  Carrier: the next @orkestrel/test API change.
- **`removeDatabase` reads the close-completion race as a block.** `IDBDatabase.close` returns
  before the connection is gone, so a delete requested in the same task as the close reports
  `blocked` and the shipped helper rejects — for a connection the caller already closed, not a
  leak. The indexeddb visit measured it on 2026-08-21: a direct re-point turned 35 tests red, and
  one host-timer yield between the close and the delete turned them green; the repository now
  centralizes that wait in a local `dropDatabase` composition over the shipped helper. The
  rejects-on-blocked contract stays right for a genuine leak; the open question is whether the
  helper takes a bounded settle before ruling `blocked`. Carrier: the next @orkestrel/test
  browser-surface change.
- **`waitForEvent` cannot infer its tuple from the subscribe callback.** A plain adoption
  typechecks as `unknown[]`, and a call site whose value lands in an `unknown`-tolerant position
  loses its tuple type with no diagnostic — the supervisor visit measured ten silently widened
  sites beside one that errored. Sites name the type argument from the real event map
  (`RunnerEventMap['ready']`). The fix candidate is the same inferable-position change
  `createRecorders` needs. Carrier: the next @orkestrel/test API change.
- **`requestUpgrade` cannot drive an RFC 6455 handshake.** It sends no `Sec-WebSocket-Key` and no
  `Sec-WebSocket-Version`, offers no option to omit either, and rejects — rather than resolving
  `claimed: false` — when a server declines by destroying the un-upgraded socket, which is the
  ordinary Node decline path. The mcp visit measured the shipped helper against that repository's
  real upgrade seam on 2026-08-21: every path rejects with a socket hang up while the local helper
  reads 101 or a resolved decline. mcp keeps `upgradeRequest`/`UpgradeOutcome` local until this
  closes. The server visit reproduced the same readings independently against its own seam on
  2026-08-21 — destroy-declines reject as socket hang up, the claimed arm carries no `status`,
  and `UpgradeOptions` cannot send a caller-supplied header — so server keeps its local helper
  too, with the measurement in its TSDoc. Carrier: the next @orkestrel/test server-surface
  change.

## Carried to the named repository's next change

- **mcp:** `tests/guides.test.ts:904` (stdio FIFO assertion) is host-determined. A grandchild's
  descriptor 2 is a socketpair (`S_IFSOCK`) in this sandbox, never a FIFO, so the assertion reads
  false on this host whatever the tree contains — proven by an out-of-repo probe on 2026-08-21.
  The visit's diff touches nothing the test imports. Carrier: mcp's next test-infrastructure
  change (assert the pipe class the host actually provides, or gate on a capability probe).

- **reason:** `guides/test.md` carries two consolidation-ledger rows that 0.0.9 overtakes. The
  row at line 694 excludes `invokeRaw` from publication on the return-type claim; 0.0.9 ships
  `invokeUnchecked` with that claim assigned to the caller. The row at line 692 excludes the
  recorder-map candidate on the explicit-type-argument cost; 0.0.9 ships `createRecorders`,
  `RecorderMap`, `EventSourceInterface`, and `isRecorderMapComplete`, and the visits pay exactly
  the predicted cost at each call site. The parity gate runs green today, so nothing is broken —
  the rows are stale ledger prose. Carrier: reason's next guide change.

- **database:** the `src/browser` IndexedDB driver leaks a connection when a migration step
  throws `MIGRATION`, reproducible at `tests/src/browser/drivers/IndexedDBDriver.test.ts:1448`
  under the shipped `removeDatabase` and invisible under the local settle-on-any-outcome helper.
  Measured by the database visit on 2026-08-21. Carrier: database's next `src/browser` change.
- **database:** `deleteDatabase` stays local until the preceding driver leak closes; the visit's
  measurement and the refused retry loop sit in its TSDoc. When the leak is fixed, re-attempt the
  adoption through the single-yield composition the indexeddb repository proved — `waitForDelay()`
  then the shipped `removeDatabase` — before ruling the race unsolvable here. Carrier: database's
  next test-infrastructure change, after the driver fix.

- **workspace:** `assertWorkspaceStoreContract` in `tests/setup.ts` calls `describe`, `it`, and
  `expect` inside a setup module, which `.claude/rules/tests.md` § Shared test infrastructure
  forbids. Pre-existing, campaign-refused for consolidation, gates green with it. Carrier:
  workspace's next test-infrastructure change.

- **supervisor:** the visit's sweep beyond its closed list found wider-family duplicates it
  rightly left unadopted, each needing its own briefed unit: `hasProcess` against the shipped
  `isRunning` (behaviourally identical, pure rename); a local `waitForSocketClose` name-identical
  to the shipped one but unbounded and error-swallowing where the shipped form budgets and
  raises — the name collision makes a blind swap likely, so this one needs a ruling first;
  `waitForRecorder` against `waitForCondition` (silent exhaustion versus throw);
  `ApplicationCookieJar` against `createCookieJar` (accessor name only); and
  `destroyApplicationScratch` against `destroyScratch` (hard-coded deadline versus `WaitOptions`).
  Carrier: a successor supervisor adoption unit after the post-publish re-pin.

- **server:** the IPv6 bind proof (`tests/src/server/Server.test.ts`, `exposes an IPv6 literal
  host and its real ephemeral port`) is host-determined: this container has no IPv6 loopback, and
  a bare `net.createServer().listen(0, '::1')` probe reports `EAFNOSUPPORT` outside any repo
  code (2026-08-21). The visit's diff is comment-only. Carrier: server's next
  test-infrastructure change (gate the proof on a capability probe).

## Post-publish re-pin obligations

- **Consumer mirrors of the test guide predate 0.0.9.** interpret's vendored `guides/test.md`
  still carries the pre-release `invokeRaw` exclusion row at line 694; other consumers mirror the
  same file. A mirror refreshes rather than being rewritten, so each consumer's re-pin visit
  refreshes its mirror from the 0.0.9 release alongside the manifest and lock move. No parity
  assertion reads those rows today, so nothing is red in the meantime.

## Record only

- The mcp sites list carried a `tests/setupServer.ts:458 createTeardown` row that commit
  `ed64e97` in mcp had already satisfied, and its `setupServer.ts` line numbers ran 54 lines
  ahead of the current file — the absorb snapshot predated that commit. Rule for future waves:
  a sites list is a claim about the snapshot it was read from; the visit verifies each site
  against the live file before acting.
