# map:browse

Mechanisms in the browse server at browser 6bedbb1 (6bedbb1 is the checked-out HEAD), with @orkestrel/pool 0.0.15 installed (node_modules/@orkestrel/pool/package.json). Paths are relative to C:\Users\mikes\WebstormProjects\browser: S = src/server/BrowserMCPServer.ts, P = node_modules/@orkestrel/pool/dist/src/core/index.d.ts. The opinion section is at the end.

How the pool is wired
- S:200-209 creates the pool with `create` = #warm, `destroy` = #destroyRecord, `validate`, `watch`, `error`, `min: size`, `capacity: contexts` and `restarts`. Each pool record is a browser plus its profile (src/server/types.ts:366-369). Each pool token is one holder's seat (types.ts:379-382).

1. Admission and immediate BUSY refusal
- What it does: the admission limit is size times contexts (S:197). `acquire` throws `BROWSER_SERVER_BUSY` at once when the holder count reaches that limit, and the message lists each holder's id and purpose (S:355-359). A holder keeps counting until its disposal settles. A retained holder is never removed (S:460-461).
- Scope: the refusal text is browse-specific. The counting is generic.
- Pool gap: `acquire` always queues in FIFO order and waits (P:138-153, P:269-284). The pool has no non-waiting acquire and no waiter limit.

2. Prepared warm contexts with no lease
- What it does: #warm builds one context generation during record creation, stores it in #prepared and watches it (S:1018-1020). #hold takes the prepared generation, or builds one under the token (S:666-669). A crash in a prepared generation drops and cleans it (S:813-817). #destroyRecord untracks the prepared generation and cleans every generation the slot owns (S:959-964).
- Scope: generic. The same pattern fits a pre-initialised worker module or a prepared database session.
- Pool gap: a record has no per-lease sub-resource. `create` yields only the record (P:339).

3. Generation and exact-lease guards
- What it does: the code checks `#leases.get(holder) !== lease` at S:370, 410, 559, 567, 712, 720, 772 and 1135. It checks holder identity at S:368, 651 and 678, and loss at S:662 and 680. Each late completion is turned into "ended" or "unavailable".
- Scope: generic.
- Pool gap: the pool releases an exact token idempotently (P:357-360). It gives the consumer no binding epoch to compare.

4. Single-flight recovery at the next call
- What it does: one shared grant promise per holder (S:624-637), one ping per slot (S:735-746), one cleanup per generation (S:875-893), and one disposal per holder id (S:441-442, 466). After a loss, #detach drops the lease (S:775). The next #serve call grants a new one (S:718-722). No recovery is eager.
- Scope: generic.
- Pool gap: the pool refills records (P:328-330), but it has no consumer identity to rebind to a new lease.

5. Retirement through release, then declared loss, to earn a strike
- What it does: when a context disposal is unconfirmed, #release calls `token.release()` only if no other lease sits on the slot and no build is running (S:864-869). It then calls #lose (S:870), which resolves the pool watch (S:766-768). The same pattern handles a failed build (S:925-930).
- Why it works: loss of a record with no live lease adds a strike (P:324). Loss of a leased record instead earns refill credit and no strike (P:328-330).
- Scope: generic.
- Pool gap: `token.destroy()` exists (P:362-368), but it counts as a leased loss. No pool verb retires a record "faulted by this lease" and charges a strike.

6. Loss scoping and per-holder notices
- What it does: browser loss (#lose, S:758-769) detaches every lease on the slot. It records each lease's cause and last URL (S:773) and queues a notice per holder (S:777-779). A crash of a holder's current page detaches only that holder (S:819-822) and drains its release (S:823-827). #annotate prefixes the queued notices to that holder's next outcome and skips the current lease (S:585-594).
- Scope: the URL and notice text are browse-specific. Fanning loss out to the leases on a shared record is generic.
- Pool gap: `PoolToken` has only `value`, `release` and `destroy` (P:353-369). It has no loss signal. Loss invalidates every lease silently (P:328).

7. Disposal confirmation and retained cleanup
- What it does: `BrowserContext` sets `disposal` to confirmed true or false from `Target.disposeBrowserContext` (src/core/BrowserContext.ts:382-390). #clean returns false when removing the downloads directory fails (S:884-890). A false result makes #release set #retentions for the holder (S:861-862). #grant then refuses that holder (S:628), and the holder keeps its admission seat (S:460).
- Scope: CDP disposal is browse-specific. A lease-level reset that can fail is generic.
- Pool gap: the pool retains records only when a destroy hook fails (P:123, P:280-281). `release()` returns `void` (P:360), so a lease-level cleanup failure has nowhere to go.

8. Hand-out health ping versus pool `validate`
- What it does: #hold pings when no prepared generation exists (S:657). #serve pings the held lease on every call (S:711). A failed call pings to decide whether its outcome is unresolved (S:558-577). The ping uses the server's abort signal, not the caller's, so a cancelled call does not cancel it (S:739, S:561). The pool's `validate` also declares loss on failure (S:748-756).
- Scope: `Browser.getVersion` (src/server/Browser.ts:148-155) is browse-specific. The check itself is generic.
- Pool gap: `validate` runs only on idle records. With capacity above 1, an occupied record is never revalidated (P:312-316).

9. Teardown barrier
- What it does: #destroy removes the handlers and tools, aborts every holder (S:284-295), and collects the pool's barrier failures (S:296-299). It then awaits startup, the barrier, the grants and the disposals (S:300-303), and the profile sweep (S:305). It rechecks the profile folders and throws an `AggregateError` (S:307-324).
- Record end: #destroyRecord waits for builds, cleans the generations and destroys the slot (S:956-968). It then resolves #endings (S:968), which #release, #retire and #hold await (S:871, 452-456, 671).
- Other parts: the SIGKILL on a CDP timeout (S:1036-1042) and the stale-profile sweep (S:1058-1102) are browse- and process-specific.
- Pool gap: the pool-wide barrier exists (P:164-172). A record whose loss was declared through `watch` exposes no completion promise. Only `token.destroy()` returns one (P:365).

Opinion (not established by the code)
- These pool additions look worthwhile and are generic:
  - a non-waiting or bounded-waiter acquire (mechanism 1);
  - a per-token loss signal or event (mechanism 6);
  - a retire verb that charges a strike (mechanism 5);
  - a per-record ended promise (mechanism 9);
  - a borrow-time or failure-time health hook for shared records (mechanism 8).
- These look generic but probably belong in a layer above pool:
  - a holder or session layer that rebinds a consumer to a new lease (mechanisms 3 and 4);
  - prepared sub-resources (mechanism 2);
  - lease-level cleanup that can fail and is retained (mechanism 7).
- That layer would also suit worker threads and processes, so it is a candidate for worker or a pool sub-entity.
- The release-then-lose sequence (S:869-870) depends on the guards at S:662 and S:680 to refuse a FIFO waiter that wins the briefly idle record. A pool-native retire would remove that window.
