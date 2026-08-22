# Ruled design

Adopt a bounded, truthful teardown contract for `0.0.6`. The `destroy` method must finalize every package-owned observation surface by child `close` or by a `drain` deadline. It must never claim that an unreachable descendant died or that truncated diagnostics are complete.

## Reachable orderings

The present implementation permits these orderings:

- On an ordinary exit, native `exit` sets `code` or `signal`; child `close` follows after stdio closes; `#close` freezes `evidence`, ends `lines`, sets `#closed`, resolves the public `exit` promise, and emits `exit`.

- On teardown of a live child, `#kill` sets `#terminating`, releases stdout backpressure, and calls `stopChild`. Native exit can settle `stop` before child `close`. The `destroy` method then destroys the emitter while `evidence` and `lines` can remain live.

- When a descendant holds inherited stdio, native exit sets `code` or `signal`, but child `close` stays pending. Calling `stop` after that point returns `true` without signalling. Calling `destroy` then destroys only stdin and the emitter. Stderr can still extend `evidence`, and stdout can still satisfy pending `lines` reads.

- When termination confirmation elapses, `stop` returns `false`. The root and its descendants might remain alive. The present `destroy` method still destroys the emitter and returns.

- On Windows, `stopChild` already launches `taskkill /F /T` before waiting when its initial liveness read finds the root alive. The root can still exit between that read and `taskkill` enumeration. If the root has already exited, the early return prevents stale-pid signalling; the descendant is unreachable through this mechanism.

The public `Process.exit` promise is wired to child `close`, not native `exit`. It is a sound but unbounded finality point. The `code` and `signal` getters expose native exit and are not stream-finality signals.

## What `destroy()` promises

Recommendation: retain `Promise<void>`, add `ProcessOptions.drain?: number`, and default it through `PROCESS_DRAIN = 5_000`.

The `drain` option is the post-termination window in milliseconds. It does not bound the cooperative `grace` phase or native-exit confirmation.

The `destroy` method must:

- mark teardown as begun and end the public `lines` iterator;
- run the existing bounded `stop`;
- await child `close` for at most `drain`;
- when `close` wins, freeze `evidence` with `drained === true`;
- when the deadline wins, freeze `evidence` with `drained === false`, destroy the stdout and stderr read streams, and prevent later bytes from changing public state;
- destroy the emitter after the snapshot is frozen;
- preserve the same promise across repeated calls.

A caller requiring unbounded full drainage can still use:

```ts
await child.exit
await child.destroy()
```

The “no completion deadline” contract remains true for normal child lifetime and the public `exit` promise. The reversal is limited to resource teardown. An unbounded `destroy` would strand managers and transports; an immediate native-exit barrier repeats the push/pull mismatch.

Losing options:

- Await child `close` without a bound: rejects shutdown liveness when a descendant holds a pipe indefinitely.
- Resolve on native exit: preserves the defect.
- Apply one deadline to termination and drainage: conflates `grace`, native-exit confirmation, and observation drainage.
- Reject when `drain` elapses: breaks the non-rejecting lifecycle contract for an expected partial outcome.
- Treat `drain: 0` as disabled: reintroduces an unbounded teardown. Define it as immediate cutoff.

## The drained-versus-truncated discriminant

Recommendation: add `readonly drained: boolean | undefined` to `ProcessInterface`.

Its states are:

- `undefined`: no terminal evidence snapshot exists;
- `true`: child `close` occurred before the cutoff, so the frozen stderr tail contains every byte delivered through the inherited stderr pipe;
- `false`: teardown cut the pipe off at the deadline, so later diagnostics might have existed.

Keep `truncated` scoped to omitted stdout lines. Do not overload it with diagnostic completeness.

Losing options:

- Add `drained` to `ProcessExit`: the public `exit` promise cannot settle on the cutoff path.
- Add it to `ExecuteResult`: that contract belongs to one-shot execution and has separate asynchronous and synchronous semantics.
- Return a separate result from `destroy`: this duplicates the existing Process getters and expands every lifecycle call site.
- Use `complete`, `done`, or `settled`: each name promises more than pipe drainage proves.
- Derive the fact from `closed`: a deadline cutoff can later be followed by child `close`; that later close cannot retroactively complete the frozen snapshot.

## Freezing the tail

Recommendation: keep `evidence` live until natural child `close` or the `drain` cutoff, then latch its value permanently.

Before terminalization, `evidence` remains the live bounded tail. After terminalization, every read returns the frozen value. This holds after spawn failure, normal close, confirmed termination, unconfirmed termination, and drain cutoff.

On any retained `Process` reference, the frozen value remains reachable after `destroy`. A `ProcessManager` consumer that needs it must retain the child reference before manager teardown clears the registry.

Losing options:

- Freeze at native exit: measured late diagnostics are lost while reporting no truncation.
- Freeze when `destroy` begins: discards diagnostics that arrive during the allowed drain window.
- Leave the getter live after `destroy`: preserves the moving-target defect.
- Destroy the emitter before freezing: recreates disagreement between the push and pull channels.

## Ending `lines` at teardown

Recommendation: end `lines` without throwing when `destroy` begins.

A pending `next()` must resolve with `done: true`. Undelivered queued lines must be discarded and set `truncated` when an omission is observed. Later stdout must be drained or discarded internally without reaching the iterator. After the drain cutoff, destroy the stdout read stream.

A line promise resolved before teardown can run its consumer continuation after teardown begins. No implementation can revoke an already-resolved promise. The contract must promise that teardown resolves pending reads and that no read initiated after finalization yields another line.

The `stop` method remains a termination operation and does not end `lines`; `destroy` owns observation teardown.

Losing options:

- Throw from the iterator: turns normal resource release into an error path and forces every pump to catch teardown.
- Leave the iterator open: preserves the supervisor hang.
- Wait for the consumer to drain queued lines: lets consumer speed control teardown latency.
- Destroy stdout as soon as teardown begins: can prevent the root from exiting before the cooperative termination phase completes.

## The terminal and teardown-began facts

Recommendation: expose `readonly closed: boolean` from `#closed` and `readonly terminating: boolean` from `#terminating`.

The `closed` getter means that the child `close` event was observed. The `terminating` getter must be documented as monotonic: termination has begun. It is not a promise that an asynchronous operation remains active. It can remain `true` with `closed === true`.

This wording matches the fields the class has. Calling `terminating` an in-flight fact would be false because the field is never reset.

Losing options:

- `done`, `settled`, or `terminal`: each obscures whether the fact refers to native exit, stream close, or public teardown.
- `stopping`: implies the value becomes false after the stop operation settles, which the existing field does not encode.
- A second terminal flag: creates drift against `#closed`, `#terminating`, and `drained`.

## Windows kill ordering

Recommendation: retain the liveness guard and the existing live-root ordering. Move no `taskkill` call past an observed native exit.

When teardown begins while the root is live, `stopChild` already launches `taskkill` before a direct kill or exit wait. Preserve that ordering and add proof that consumers invoke teardown before awaiting root exit.

The package cannot repair this ordering after the root exits. `taskkill` cannot find the tree, and an unconditional call can target an unrelated process after pid reuse.

Losing options:

- Remove the early `isExited` return: adds stale-pid destruction risk without reaching the measured orphan.
- Retry `taskkill` after root exit: repeats an operation known to be unable to discover the descendant.
- Promise descendant death after root exit: the host mechanism cannot provide it.
- Poll for descendants: violates the no-polling rule and still cannot establish complete membership.
- Add Windows job objects in this change: that requires a native mechanism and a separate public ownership design.

A consumer that wants a real daemon must use `detach` with inherited stdio removed. A descendant inheriting a supervised pipe remains part of the supervised tree while the root is alive.

## Blast radius and compatibility

Recommendation: accept the source break in `0.0.6` and update every known consumer.

The changes have these compatibility effects:

- `ProcessOptions.drain` is shape-additive. Its default changes teardown latency and observation finality.
- `closed`, `terminating`, and `drained` are runtime-additive but source-breaking for structural implementations of `ProcessInterface`.
- `destroy(): Promise<void>` remains unchanged.
- `evidence` keeps its type but stops changing after teardown.
- `lines` keeps its type but ends when destruction begins.
- `exit` remains sound and unbounded.
- `ExecuteResult` and `src/server/execution/*.ts` remain unchanged.
- Consumers awaiting `destroy` and ignoring the result continue to compile unless they implement `ProcessInterface`.
- Consumers reading output after `destroy` must move that work before teardown or use the frozen `evidence` snapshot.

`ProcessManager.destroy` must receive the same finalization treatment. It must await every child’s bounded `destroy` before clearing references. It must also track a child spawned by a `launch` already inside option evaluation when manager destruction begins; the manager barrier must not resolve while that refused child’s teardown runs unobserved.

The manager need not expose an aggregate `drained` field. A caller needing per-child evidence must retain child references and inspect each child after manager destruction.

## File-level change list

- [src/core/constants.ts](C:/Users/mikes/WebstormProjects/process/src/core/constants.ts): add `PROCESS_DRAIN = 5_000`.

- [src/core/types.ts](C:/Users/mikes/WebstormProjects/process/src/core/types.ts): add the `drain` option and the `closed`, `terminating`, and `drained` properties; rewrite `destroy`, `evidence`, `lines`, and manager teardown documentation.

- [src/server/Process.ts](C:/Users/mikes/WebstormProjects/process/src/server/Process.ts): validate and store `drain`; expose the getters; latch the diagnostic outcome; end the iterator when destruction begins; race close against the drain timer; freeze observation state atomically; destroy read streams on cutoff; preserve emitter-last ordering.

- [src/server/ProcessManager.ts](C:/Users/mikes/WebstormProjects/process/src/server/ProcessManager.ts): await bounded child finalization and include teardown promises from refused in-flight launches before settling the manager barrier.

- [src/server/helpers.ts](C:/Users/mikes/WebstormProjects/process/src/server/helpers.ts): retain `stopChild`, `killTree`, `waitForExit`, and `isExited` ordering. Do not signal an observed dead root.

- [tests/src/server/fixtures/child.mjs](C:/Users/mikes/WebstormProjects/process/tests/src/server/fixtures/child.mjs): add controlled inherited-pipe modes that emit before and after a configured drain window and publish descendant liveness.

- [tests/src/server/Process.test.ts](C:/Users/mikes/WebstormProjects/process/tests/src/server/Process.test.ts): replace the immediate non-final destroy expectation with bounded finalization, frozen evidence, iterator termination, state getters, and live-root/dead-root controls.

- [tests/src/server/ProcessManager.test.ts](C:/Users/mikes/WebstormProjects/process/tests/src/server/ProcessManager.test.ts): prove child finalization and refused-launch teardown are covered by the manager barrier.

- [guides/process.md](C:/Users/mikes/WebstormProjects/process/guides/process.md): document the drain budget, frozen snapshot, iterator cutoff, getter semantics, Windows limit, and consumer obligations. Remove the statement that `destroy` leaves `lines` and `evidence` live.

- [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/process/tests/guides.test.ts): update surface parity and execute the revised lifecycle claims.

- [package.json](C:/Users/mikes/WebstormProjects/process/package.json) and [package-lock.json](C:/Users/mikes/WebstormProjects/process/package-lock.json): move the package to `0.0.6`.

No change belongs in `execute`, `executeSync`, or `detach` under this brief.

## Proof list with controls

Every behavioral row must use real spawned processes.

| Test | Positive case | Negative control |
| --- | --- | --- |
| Freezes complete evidence | Root exits and child `close` wins; `drained` is true and the final stderr marker is retained. | The same fixture holds stderr past a short `drain`; `drained` is false and the later marker is absent. |
| Freezes partial evidence permanently | A descendant writes after the cutoff; `evidence` remains byte-for-byte unchanged after `destroy`. | A longer `drain` lets that write arrive before close and includes it. |
| Ends an in-flight line read | A quiet child has a pending `next()`; `destroy` resolves it with `done: true`. | Without `destroy`, the delayed child line satisfies the read. |
| Reports output omission | Queued or later stdout is discarded after teardown and `truncated` becomes true when omission is observed. | Natural close without teardown delivers the same fixture’s complete line sequence. |
| Reports lifecycle facts | A live child reads `closed === false` and `terminating === false`; destruction makes `terminating` true; close makes `closed` true. | Natural exit without stop reaches `closed === true` while `terminating` remains false. |
| Latches the drain outcome | A cutoff reports `drained === false`; later physical close does not change it. | Natural close reports `drained === true`. |
| Preserves Windows live-root ordering | Destroy a live root with a detached descendant inheriting the pipe; the descendant is reaped and close beats the configured drain. | Let the root exit first; destroy reports `drained === false`, and the descendant remains live until test cleanup. |
| Finalizes manager-owned children | Manager destruction ends a child iterator, freezes evidence, and destroys child and manager emitters before settling. | `manager.stop()` alone retains the open observation surface until child destruction. |
| Covers a refused in-flight launch | An option getter begins manager destruction during launch; the manager barrier waits for the refused child’s bounded teardown. | A marker-writing valid launch proves the fixture starts when the destroy race is absent. |
| Validates `drain` before spawn | Negative, fractional, and oversized values raise `invalid` before the marker child starts. | A valid value starts the marker child and completes teardown. |

The descendant rows cannot run in this sandbox because the fixture child must spawn a grandchild. Their status is **UNRESOLVED in this lane**. Settle them on the host with:

```text
npx vitest run --config vite.config.ts --no-cache --project src:server
```

After those rows pass, run the prescribed acceptance chain:

```text
npm run format:check
npm run lint:check
npm run check
npm run build
npm test
npm run test:distribution -- --mode release
```

## Downstream consumer changes

### `@orkestrel/mcp` — `StdioClientTransport`

- Install the packed `@orkestrel/process@0.0.6` artifact.
- Delete the private stderr-tail copy. Read `process.evidence` after `await process.destroy()`.
- Branch on `process.drained`. Report partial diagnostics when it is false.
- Delete the release/pump mechanism used only to force the upstream `lines` iterator to end.
- Replace the duplicated teardown-began state with `process.terminating` where the semantics match.
- Keep the restartable single-slot transport policy; that policy remains downstream.
- Begin destruction while the root is live when the transport controls that ordering.

### `@orkestrel/supervisor` — `ProviderExecution`

- Install the packed `0.0.6` artifact.
- Invoke `process.destroy()` before waiting on settlement that depends on the line pump.
- Let upstream iterator termination release the pump and permit registry eviction.
- Read frozen `evidence` for the existing late diagnostic reads.
- Check `drained` before describing those reads as complete.
- Do not add a private pump-release mechanism.

### `@orkestrel/supervisor` — `ProviderExecutor` probe path

- Install the packed `0.0.6` artifact.
- Replace duplicated teardown and diagnostic-finality inference with `terminating`, `closed`, `drained`, and frozen `evidence`.
- Initiate destruction before awaiting root-exit state where tree termination is still required.

### Supervisor application `CLIProvider`

No source change. It holds no process across calls, so the lifecycle mechanism is inert. Update only the dependency pin required by the supervisor package release.

### `@orkestrel/probe` — `LintStage`

No change. `LintStage` does not use `@orkestrel/process`, frames its own Content-Length protocol, and discards stderr. Do not move it onto this contract.

### Structural `ProcessInterface` implementations

Add readonly `closed`, `terminating`, and `drained` properties with the ruled semantics. Do not emulate them with unrelated flags. Consumers that only receive the interface and await its methods need no shape change.