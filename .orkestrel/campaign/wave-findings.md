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
- **`requestUpgrade` cannot drive an RFC 6455 handshake.** It sends no `Sec-WebSocket-Key` and no
  `Sec-WebSocket-Version`, offers no option to omit either, and rejects — rather than resolving
  `claimed: false` — when a server declines by destroying the un-upgraded socket, which is the
  ordinary Node decline path. The mcp visit measured the shipped helper against that repository's
  real upgrade seam on 2026-08-21: every path rejects with a socket hang up while the local helper
  reads 101 or a resolved decline. mcp keeps `upgradeRequest`/`UpgradeOutcome` local until this
  closes. Carrier: the next @orkestrel/test server-surface change.

## Carried to the named repository's next change

- **mcp:** `tests/guides.test.ts:904` (stdio FIFO assertion) is host-determined. A grandchild's
  descriptor 2 is a socketpair (`S_IFSOCK`) in this sandbox, never a FIFO, so the assertion reads
  false on this host whatever the tree contains — proven by an out-of-repo probe on 2026-08-21.
  The visit's diff touches nothing the test imports. Carrier: mcp's next test-infrastructure
  change (assert the pipe class the host actually provides, or gate on a capability probe).

## Record only

- The mcp sites list carried a `tests/setupServer.ts:458 createTeardown` row that commit
  `ed64e97` in mcp had already satisfied, and its `setupServer.ts` line numbers ran 54 lines
  ahead of the current file — the absorb snapshot predated that commit. Rule for future waves:
  a sites list is a claim about the snapshot it was read from; the visit verifies each site
  against the live file before acting.
