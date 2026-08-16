# REVIEWER lane verdict — T6a falsification round (Opus 5, reviewer, clean context)

Returned blind; reconciliation is the Orchestrator's in `t6a-fix-brief.md`. Substance:

- Claims 1-4 CONFIRMED with file:line evidence (snapshot swap before first await;
  identity rethrow + run-order AggregateError; late-registration next-run semantics;
  no-double-run under concurrency — cross-call interleaving noted as scoped out by
  claim 1 and serialized by the documented consumer shape).
- Claim 5 CONFIRMED, partly by derivation: the bind-error rejection leg rests on
  `node:events` `once()` semantics with no committed test driving a failed bind.
- Claim 6 CONFIRMED (exact string + no-trailing-slash pinned in the suite).
- Claim 7 BROKEN: `destroy` is `async`, so each call returns a fresh adopting promise;
  `a === b` is false pre-settlement; the guide asserts identity twice (Methods row and
  rule 11). Unhandled-rejection consequence named. Fix option (a) recommended: de-async
  and return the stored promise.
- Claim 8 BROKEN on the TSDoc conjunct, three sentences with exact replacements:
  `url` doc (http-unconditional vs TLS input), `destroy` doc (drop gated on
  `closeAllConnections`), core destroy remark (list not empty after late registration).
- Claim 9 CONFIRMED: 15 values + 10 types counted against source both directions;
  Methods tables exact; fence comments state what each line returns.
- Claim 10 BROKEN twice: the guide names package rosters carrying superseded scratch
  members (`ensure`/`names`/`link`/`remove` per-package site counts, plus `csv` for
  `captureError`) — a live-state ledger; and the "every count is a floor" hedge
  contradicts Fails rulings that need totals, beside "roughly 44" pinned to exactly 44
  by its own sentence.
- F1: the `LoopbackInterface` Methods row promises the drop unconditionally while
  rule 11 conditions it — the authoritative-looking sentence is the wrong one.
- F2: the two-family framing files `resolveRoot`/`readInventory` under "owns and must
  give back" though they own nothing — end the owned family at the three `destroy()`
  members.
- Referrals (no verdict): untested bind-failure legs; plain-`net` destroy with a live
  socket may wait forever (document or track); cross-call teardown concurrency untested;
  Limits fleet counts unverifiable from this checkout.

VERDICT: FAIL 7, 8, 10 — 3 broken, 0 unresolved, 0 not-evidenced, 2 findings outside the claims
