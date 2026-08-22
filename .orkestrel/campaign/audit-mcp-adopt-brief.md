# Audit mcp-adopt: the transport's adoption of the process 0.0.6 terminal contract

## Role and engine

Role `analyst`, engine **GPT-5.6 Sol**, sandbox `read-only`, rooted at
`C:/Users/mikes/WebstormProjects/mcp`. You perform this audit directly and spawn nothing.
The changes under audit were written by Claude Opus 5 (the transport, its suite, the guide)
and integrated by the Orchestrator (the `src/server/types.ts` remarks, applying the unit's
returned patch); you are the engine that wrote neither.

## Subject

The uncommitted working tree of `@orkestrel/mcp` at 0.0.21. `@orkestrel/process` 0.0.6 is
installed from a local tarball (the manifest pair references it; that pair is standing
noise, not subject). The unit's diff is at `tmp/mcp-adopt/unit-mcp-adopt.diff`; the
Orchestrator's types integration came after it, so the working tree is the complete
subject. Read-only `git diff` and `git status` are yours; never any mutating git command.
The suite spawns real children, which your sandbox denies — rule on row logic and name
those runs host-owned. The recorded host runs: `test:src` 1074 passed, `test:guides` 138
passed, the transport file 38 passed, and the failing-first pairs in the unit's report.

## Claims, each falsifiable

1. **The compensating state is gone and the tail stays reachable.** `#evidence`,
   `#release`, and `#pumping` no longer exist; both former capture sites and the
   `Promise.race` pump are gone; no teardown path clears the held child (`#process`
   survives until the next `start()` replaces it); the `evidence` getter answers the held
   child's frozen value on every post-terminal path.
2. **Deleting the pump join is sound.** `#teardown` sets `#closed` synchronously before
   its first `await`; `#pump` re-checks `#closed` (and peer identity) after every
   `await`, so no `message` can reach a consumer after `close`; `#pump` has no rejecting
   path (`lines` ends rather than throws, and emitter listener throws are isolated), so
   `void this.#pump(child)` cannot produce an unhandled rejection.
3. **One notice per lifetime, never a double.** The `drained: false` notice is emitted
   exactly once per child lifetime whatever the interleaving — `close()` racing a natural
   exit, an exit landing during teardown, a `start()` issued from a `close` listener.
   Name the mechanism that makes a second call to the reporting path inert.
4. **The kept policies hold.** `#closed` and `#closing` still implement the
   restartable-single-slot policy; both peer-identity guards survive; the reordered
   identity-before-closed check in `#onExit` reports the cut-off tail exactly once and
   cannot let a stale child's exit disturb a successor lifetime.
5. **The suite binds.** The rewritten descendant-held-pipe row's bound
   (`PROCESS_DRAIN + CLOSE_SLACK`, imported) proves bounded settlement without weakening
   the claim; the new notice row and its control separate the `drained` branch in both
   directions; no surviving row's comment still describes the deleted mechanisms.
6. **The contract prose is true.** The `evidence` remarks in `src/server/types.ts`
   (frozen at the terminal moment, held child, non-overlapping lifetimes, the
   partial-tail `error` notice, the 0.0.6 bound) and the guide's evidence and teardown
   prose agree with the implementation and with the installed 0.0.6 contract — no
   sentence claims more than the code and the recorded measurements establish.

## Output

Per-claim verdicts — CONFIRMED, BROKEN, or UNRESOLVED — with `file:line` evidence, then
findings outside the claims in their own section. Write the final answer as the last
message. End with exactly one line:
`VERDICT: PASS|FAIL — <n> broken, <n> unresolved, <n> not-evidenced, <n> findings outside the claims`.
No process diary.
