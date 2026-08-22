# Unit U2: the terminal routine in Process

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/process`. Ordering-critical, race-sensitive work — the
objective engine's subject. You perform the assignment directly and spawn nothing beyond
probes under `tmp/` that you delete after reading.

## Ruling record, read in this order

`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/design-terminal-reconciliation.md`
(AUTHORITATIVE, including the Orchestrator rulings appended at its end), then
`upstream-teardown-finding.md` for the measurements, then
`design-terminal-objective-report.md` for detail. Unit U1 has already landed the contracts in
`src/core/types.ts` and `src/core/constants.ts` — read both before writing.

## SANDBOX LIMIT, stated so you do not lose the round to it

This sandbox denies grandchild processes. The suite's proofs spawn children, so you CANNOT
run `test:src:server` meaningfully. Do the typecheck and lint work, and report any
child-spawning suite run as an OBSERVATION with the exact command. The Orchestrator takes the
authoritative host reading after you exit. Do not weaken a proof to make it runnable here.

## You own

`src/server/Process.ts`, plus `src/server/factories.ts` and `src/server/ProcessManager.ts`
where they only need the types to line up.

OFF LIMITS: every test file, `src/server/helpers.ts`, `src/server/types.ts`,
`src/server/execution/*`, `guides/process.md`. Later units own those.

## The work

Implement the one invariant: **no path destroys the push channel before the pull channels are
final.**

1. Field renames so the class vocabulary matches the contract: `#terminating` becomes
   `#stopping`; the existing stop barrier `#stopping` becomes `#termination`; `#closed`
   becomes `#settled` and widens from "the close event fired" to "the terminal moment
   arrived". Leave no residual `#closed` or `#terminating`.
2. Constructor: hoist and validate `drain` beside `grace` and `delivery`, store
   `#drain = drain ?? PROCESS_DRAIN`. `drain: 0` is an IMMEDIATE CUTOFF, not a disabled
   bound — the reconciliation rules this and the reason is that an unbounded drain is the
   defect the option prevents.
3. Public getters `settled` and `stopping`, each derived from the renamed field. No second
   flag.
4. A single `#settle(drained: boolean)` owning the whole terminal routine, IN THIS ORDER,
   because the order is load-bearing and its failure is silent:
   - flush the decoder and emit the final `stderr` chunk;
   - **set `#settled` before anything else can re-enter**;
   - remove the abort listener;
   - close the reader so `lines` ends;
   - resolve `#exit` with `{ code, signal, drained }`;
   - emit `exit`;
   - destroy `#child.stdout` and `#child.stderr`.
   Destroying the read ends can itself fire the host's `close`, so setting the field first is
   what stops a late close from reporting a truncated read as `drained: true`.
5. `#close(code, signal)` becomes the close-event handler and calls `#settle(true)` under the
   existing idempotence guard.
6. `#kill()`: after `stopChild`, settle pending writes and destroy stdin as today, then wait
   up to `#drain` for the terminal moment, then `#settle(false)` if it has not arrived, then
   return the confirmation boolean.
7. `#teardown()` becomes `#end()`: await `stop()`, then destroy the emitter — after the
   frozen state exists.
8. BOTH `stop()` and `destroy()` reach the terminal moment. That is a ruled split: two live
   consumers call `stop()` and never `destroy()`, and a destroy-only rule leaves them hanging.
9. Lines already framed and queued are delivered before `lines` ends; only bytes that would
   have arrived after the caller's termination are lost.
10. Rewrite the class TSDoc around the invariant and the two endings — the child's ending
    (`pid`, `code`, `signal`) and the supervision's ending (`settled`, `exit`, `evidence`,
    `lines`).

## Acceptance, in this order

1. `git status --porcelain` adds nothing beyond the standing entries plus your owned files.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` — every remaining error must be in a TEST
   file that a later unit owns (`tests/src/server/ProcessManager.test.ts` constructs a
   `ProcessExit` without `drained`). Report the full list. Errors in `src/` are yours.
4. `npx.cmd tsc --noEmit -p configs/src/tsconfig.core.json` exits 0.
5. Report, as observations with their commands, whatever suite readings you can take.

## Output

The complete unelided diff; the `#settle` body quoted with its ordering comments; raw output
and exit code per criterion; any deviation. No process diary.

## Deviation contract

Stop on: an ordering the reconciliation names that cannot be implemented as ruled; a rename
that collides with a member you do not own; a criterion unreachable for a reason other than
the stated sandbox limit.
