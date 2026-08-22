# Audit mcp-fix1: the restart-barrier fix round

## Role and engine

Role `analyst`, engine **GPT-5.6 Sol**, sandbox `read-only`, rooted at
`C:/Users/mikes/WebstormProjects/mcp`. You perform this audit directly and spawn nothing.
The fixes were written by Claude Opus 5; you are the engine that did not write them. This
round is scoped to your prior verdict's broken claims plus the one source change the fix
unit added beyond the prescription, with its recorded justification. Read-only `git diff`
and `git status` are yours; the suite spawns real children, so rule on row logic and name
those runs host-owned. Recorded host runs: the transport file `41 passed (41)`,
`test:src` `1077 passed (1077)`, `test:guides` `138 passed (138)`, and the failing-first
pairs quoted in the claims.

## Claims, each falsifiable

1. **The natural-exit barrier orders the restart.** `#onExit` installs a barrier into
   `#closing` before `#report`, releases and clears it before emitting `close`. An
   `error`-listener `start()` therefore parks and resumes on the microtask queue after
   `close` has been delivered to lifetime A's listeners, while a `start()` called from a
   natural `close` listener finds no barrier and installs inside the emit — the
   documented restart. Recorded red:
   `expected '' to contain 'descendant-early'` on the hazard row against the unfixed
   transport, with its control green in the same run.
2. **The `start()` drain loop closes the stale-barrier path.** The fix unit measured
   that the prescribed barrier alone opens a defect: a `close` listener's `close()`
   no-ops against the ended lifetime and leaves a resolved promise in `#closing`; the
   parked `start()` refuses to clear a barrier not its own and installs the replacement
   under it; a later `close()` resolves through the stale promise, so a live child is
   never torn down. Recorded red: `expected 1 to be 2` on the closable-replacement row
   with the barrier-only transport. The fix: `start()` waits out every barrier it meets
   and clears the last one it waited on. Rule on the loop against source: does it
   terminate, does it preserve the prior clear-guard semantics, and does "lifetimes
   never overlap" now hold on every interleaving of `close()`, `start()`, natural exit,
   and listener-initiated restarts you can construct? If an interleaving still strands a
   teardown, double-installs, or leaves a live child uncloseable, the claim is BROKEN
   and names it.
3. **The prose split is true.** The `evidence` Lifetime remark in `src/server/types.ts`
   and the guide's matching passage state the natural-exit versus explicit-close restart
   split exactly as the implementation behaves after the fix, including where the
   natural-exit barrier begins and ends.
4. **No regression.** Nothing the fix changed disturbs your previously confirmed claims:
   the deleted compensating state stays deleted, the held child stays reachable, the
   pump-join deletion stays sound, the `drained: false` notice stays once per lifetime,
   and the suite rows added earlier still bind.

## Output

Per-claim verdicts — CONFIRMED, BROKEN, or UNRESOLVED — with `file:line` evidence, then
findings outside the claims in their own section. Write the final answer as the last
message. End with exactly one line:
`VERDICT: PASS|FAIL — <n> broken, <n> unresolved, <n> not-evidenced, <n> findings outside the claims`.
No process diary.
