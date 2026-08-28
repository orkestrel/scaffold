# Fix dossier: websocket

Verified fix-producing findings for the `websocket` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s17-26 — DRIFT-RESHAPE

26. package=`websocket` file=`websocket/src/server/types.ts:31,75,86` rule=`AGENTS.md` § Design laws ("Minimal public API. Add or substantively expand a capability with its first real consumer; do not speculate") + `.claude/rules/architecture.md` § Wrapper test ("Delete … rename-only helpers/getters") verdict=CONFIRMED
    wrong: `WebSocketCloseCode`, `WebSocketMessage`, and `WebSocketClose` are published through the barrel and listed in `guides/websocket.md:88,91,92`, and no signature in `src/` uses any of them. `NodeWebSocketEventMap.close` inlines `readonly [code: number | undefined, reason: string | undefined]` rather than referencing `WebSocketClose`; `WebSocketCloseCode` is a bare alias for `number` that adds nothing at all; nothing produces or consumes `WebSocketMessage`.
    repair: Delete `WebSocketCloseCode` and `WebSocketMessage` outright, and either use `WebSocketClose` in the `close` event tuple or delete it too. Remove the three guide Surface rows in the same change.

### Verification

**Judge (DRIFT-RESHAPE/high):** All three types are unconsumed, so the creation gate applies. The finding's repair offers a disjunction whose second arm is harmful, and it omits the dangling `{@link WebSocketClose}` that deleting the type leaves behind in the event-map TSDoc.

**Lane DRIFT-RESHAPE/medium:** amend: delete all three types and their guide Surface rows at guides/websocket.md:88,91,92; do NOT reshape the `close` event tuple. Justify the deletions as capability removal (a bare `number` alias and an unused one-member wrapper), not as a consumer count.

**Lane DRIFT/high:** amend: delete all three types, including `WebSocketClose`, and correct the `NodeWebSocketEventMap` TSDoc at types.ts:99 that links to it; keep the labeled `[code, reason]` tuple. Remove the three Surface rows at guides/websocket.md:88,91,92.

## s17-27 — DRIFT

27. package=`websocket` file=`websocket/src/server/helpers.ts:192` rule=`.claude/rules/names.md` § Fixed derivation/construction forms ("`is*`: total `Guard<T>`; never throws; returns false off-shape") verdict=CONFIRMED
    wrong: `isWebSocketFrameCanonical(buffer): boolean | undefined` is tri-state — it returns `undefined` while the length prefix is still incomplete — under a name the rule reserves for a total predicate. `NodeWebSocket.ts:233-236` has to compare against `false` explicitly because `undefined` is not falsy in the sense the name implies, and a caller writing the obvious `if (!isWebSocketFrameCanonical(buffer))` fails an incomplete buffer as a protocol error.
    repair: Rename to the family this file already uses for a fact read off a partial buffer — `measureWebSocketFrame` returns `number | undefined` for exactly the same reason — giving `readWebSocketCanonical` or `checkWebSocketCanonical`. Update `NodeWebSocket.ts:14,233` and the guide's row at `guides/websocket.md:51`.

## s17-28 — DRIFT

28. package=`websocket` file=`websocket/src/server/helpers.ts:287,290,293`, `websocket/src/server/NodeWebSocket.ts:89,93,96,99,102,181,196,201` rule=`.claude/rules/typescript.md` § Errors and outcomes ("Programmer error or invalid argument → Throw an `AppError`"; "Error classes expose a machine-readable `code`"; "Every public error class ships with a guard") verdict=CONFIRMED
    wrong: Eleven invalid-argument paths across the public surface throw a bare `RangeError` with a prose message and no `code`, so a consumer cannot branch on the failure. `websocket` has no `errors.ts` at all, while `rater`, `relation`, `template`, and `workspace` each ship a coded error class plus its guard for the same class of misuse.
    repair: Add `websocket/src/server/errors.ts` with `WebSocketError` carrying `code: WebSocketErrorCode` and optional `context`, plus `isWebSocketError`; declare `WebSocketErrorCode` in `types.ts` (`'OPCODE' | 'MASK' | 'PAYLOAD' | 'TIMEOUT' | 'KEY' | 'PROTOCOL' | 'CODE' | 'REASON'`); throw it from all eleven sites; add the barrel row and the guide's Errors section.

