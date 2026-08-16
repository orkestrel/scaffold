# Unit T6a-fix — close FAIL 7, 8, 10 and findings F1, F2 on the auditors' prescriptions

Fix round: both blind lanes returned `VERDICT: FAIL 7, 8, 10` (analyst
`t6a-analyst-verdict.md`; reviewer verdict reconciled below). Every fix follows a lane's
prescription verbatim, so per `.claude/rules/quality.md` the behavioral fix closes with a
mutation probe run by the Orchestrator, not a fresh audit round.

Role: `implementer`. Engine: Opus 5, native, sole serial writer in `/home/user/test` from
committed baseline `dea8445`. Perform the assignment directly and spawn nothing. Commit
nothing.

## The fixes

1. **Claim 7 — loopback destroy promise identity (reviewer option a, extended).** In
   `src/server/factories.ts`, make `destroy` a non-async method: on first call create and
   store the promise, moving the `closeAllConnections` narrowing INSIDE the promise
   executor (an executor throw then rejects instead of escaping synchronously), then
   `server.close(...)` as now; every call returns the stored promise. In
   `tests/src/server/factories.test.ts` add a pre-settlement identity assertion to the
   idempotence test: `const a = loopback.destroy(); const b = loopback.destroy();
   expect(a).toBe(b)` before awaiting either.
2. **Claim 8 — three TSDoc sentences, reviewer's replacements verbatim.**
   - `src/server/types.ts` `url` doc: "The `http` origin for the assigned port, without
     a trailing slash. A TLS server answers on the same port under `https`."
   - `src/server/types.ts` `destroy` doc: "Drops every live connection on a server that
     carries `closeAllConnections`, stops listening, and releases the port." Keep the
     Idempotent remark; add: "A plain `net.Server` waits for its open sockets to end."
   - `src/core/types.ts` destroy remark: replace "The list is empty afterwards, so a
     repeated call runs nothing that already ran." with "The snapshot it ran is
     discarded, so a repeated call runs nothing that already ran."
3. **Claim 10 — guide ledger and population coherence**, in `guides/test.md`:
   - Remove every package roster naming who carries a superseded copy: the `csv`
     `captureError` naming and the per-package `ensure`/`names`/`link`/`remove` rosters.
     Keep each count and the cluster/independence relation the ruling needs; drop the
     names and per-package site counts.
   - Population sentence: "roughly 44" becomes "44"; replace the "every count is a floor
     rather than a total" sentence with: the counts are measured over the 42 readable
     trees; the two private repositories were not read and can only raise a count, and a
     raised count reopens its row.
4. **F1 — Methods row condition.** The `LoopbackInterface` Methods `destroy` row carries
   the same condition as fix 2's sentence: the drop reaches servers that carry
   `closeAllConnections`; a plain `net.Server` waits for its open sockets to end.
   Rule 11 gains the same waits-for-sockets sentence where it states the plain-net limit.
5. **F2 — two-family framing.** End the owned family at the three `destroy()` members
   and its closing sentence; give `resolveRoot` and `readInventory` their own sentence
   outside both families (the pair that reads the real tree a test checks itself
   against).
6. **Referral 1, real leg only.** Add one test: `createLoopback` rejects when handed a
   server that is already listening (bind it first, then pass it) — the real vector for
   the bind-error rejection path. Do not fabricate the non-numeric-address case; it is
   unreachable through `listen(0, '127.0.0.1')` and stays a defensive guard.

## Scope

Owned: `src/server/factories.ts`, `src/core/types.ts`, `src/server/types.ts`,
`tests/src/server/factories.test.ts`, `guides/test.md`. Off-limits: everything else.
No installs, no commits.

## Validation

`npm run check`, `npm run test:src:server`, `npm run test:guides` — all green, outputs in
your report. (Loopback binds work in this environment.)

## Output

The exact diff, the three validation outputs, deviations or "none".
