1. **CONFIRMED.** `src/core/factories.ts:40-45` replaces the live handler list before iterating the reversed snapshot and awaits each handler. The ordered asynchronous case is covered at `tests/src/core/factories.test.ts:38-55`.

2. **CONFIRMED.** `src/core/factories.ts:42-51` catches every failure, continues, rethrows one value by identity, and constructs `AggregateError` from failures in run order. Synchronous, asynchronous, and aggregate cases are covered at `tests/src/core/factories.test.ts:57-140`.

3. **CONFIRMED.** The replacement at `src/core/factories.ts:40-41` makes late additions target the fresh list exposed by `count` at lines 33-34. The committed cases at `tests/src/core/factories.test.ts:142-181` verify next-run retention and reset counts.

4. **CONFIRMED.** A first call synchronously takes and clears the current list before its first `await` at `src/core/factories.ts:39-45`; a concurrent or later call therefore cannot take those registrations again. Empty and repeated calls are covered at `tests/src/core/factories.test.ts:184-196`.

5. **CONFIRMED.** `src/server/factories.ts:173-184` calls `listen(0, '127.0.0.1')`, awaits `once(server, 'listening')`, and performs the stated numeric-port check and error text. `events.once` rejects its wait for `listening` when `error` emits. The committed suite does not directly force an OS bind failure or anomalous `address()` result; observing those host paths independently would require a live bind probe unavailable in this sandbox.

6. **CONFIRMED.** `src/server/factories.ts:186-190` derives both fields from the assigned numeric port and constructs the exact slashless URL. The real-server case at `tests/src/server/factories.test.ts:934-945` covers the relationship; the supplied server run reports 83/83 green.

7. **BROKEN.** The teardown effects, connection drop for servers exposing `closeAllConnections`, closed-server handling, and port reuse are supported by `src/server/factories.ts:193-204` and `tests/src/server/factories.test.ts:951-993`. Promise identity is false: `destroy` is declared `async` at `src/server/factories.ts:191`, so two calls return distinct adopting promises even though both return the stored `destruction` internally. Exact interleaving: call `first = loopback.destroy()` and immediately `second = loopback.destroy()`; `first !== second`. Remove `async` from the method and return the stored promise directly; add a pre-settlement identity assertion.

8. **BROKEN.** The signatures match and neither types file names an `@orkestrel/*` type, but several TSDoc claims are false:

   - `src/core/types.ts:38` says the list is empty afterwards, although a late registration remains for the next call.
   - `src/server/types.ts:115` calls `url` the origin the server answers on, while `src/server/factories.ts:189` always emits an HTTP URL even for an HTTPS server.
   - `src/server/types.ts:120` says every live connection is dropped, while `src/server/factories.ts:193-195` only does so when `closeAllConnections` exists; a plain `node:net` server has no such path.

   Narrow those sentences to the behavior implemented.

9. **CONFIRMED.** The claim’s enumerated parity checks hold. `guides/test.md:34-154` contains 15 value rows and 10 type rows matching the barrels and declarations. `guides/test.md:176-211` matches interface call-signature members. `tests/guides.test.ts:46-100` enforces both bijections and fence imports, and the supplied guide run reports 11/11 green. The fence result comments at `guides/test.md:541-798` agree with their expressions.

10. **BROKEN.** The measured population is placed beside the table at `guides/test.md:484-487`, and the table at lines 489-501 carries the reconciled counts and reasons. The no-package-list assertion is false: `guides/test.md:503-507` names the packages carrying `ensure`, `names`, and `link` implementations that this published `ScratchInterface` supersedes. Remove the package names while retaining the counts and dependency-cluster facts.

**Finding outside the claims**

- `guides/test.md:198` and `guides/test.md:418-421` say `destroy()` drops every live connection, then acknowledge that plain `node:net` lacks the method used to do so. The implementation at `src/server/factories.ts:193-204` only force-drops HTTP(S) connections exposing `closeAllConnections`; the plain-net test at `tests/src/server/factories.test.ts:1005-1012` opens no connection. Qualify the guide claim and state that plain-net destruction waits for existing sockets. A live connected-`net.Socket` probe would provide direct runtime evidence outside this sandbox.

VERDICT: FAIL 7, 8, 10 — 3 broken, 0 unresolved, 0 not-evidenced, 1 finding outside the claims
