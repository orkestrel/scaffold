# Unit mcp-adopt: shed what the supervisor now owns

## Why this unit exists

`StdioClientTransport` hand-rolled a held reference, a teardown-began flag, a barrier, and a
private stderr-tail copy — three audit rounds' worth of defects — because
`@orkestrel/process` offered no terminal point and no way to see a teardown in flight. It now
does. This unit deletes what the transport was only carrying to compensate, and keeps what is
genuinely its own policy.

## The upstream contract it adopts (process 0.0.6, installed by tarball)

- ONE terminal moment. `evidence` freezes there, `lines` ENDS there (`done: true`, queued
  lines delivered first, never a throw), and `exit` settles there.
- BOTH `stop()` and `destroy()` reach it — not `destroy()` alone.
- `ProcessExit.drained` reports how it arrived: `true` when the child's streams closed,
  `false` when the `drain` bound elapsed and later diagnostics may have existed.
- `ProcessInterface.settled` is true once `exit` settled; `stopping` is true from the moment
  a termination begins and is MONOTONIC — it reports that one was initiated, not that one is
  in flight.
- The bound is `ProcessOptions.drain`, default `PROCESS_DRAIN`.

## What to delete

- `#evidence` and both its capture sites. `evidence` now answers the held child's own frozen
  value, so the transport's getter reads the child directly. **Hold the child reference until
  the next `start()` replaces it** rather than clearing it during teardown, or the frozen tail
  becomes unreachable — that is the whole point of the change.
- `#release` and the `Promise.race` in `#pump`. `lines` ends on its own now, so the pump
  becomes a plain `for await` loop. Keep `#pumping` only if the ordering of the transport's
  `close` after the pump still matters; say which and why.

## What to keep, and say why in the code

- `#closed` and `#closing` — the restartable-single-slot policy is the TRANSPORT's, not the
  supervisor's. `stopping` is monotonic and answers a different question, so it does not
  replace `#closing`.
- Both peer-identity guards, in `#pump` and `#onExit`.
- The `evidence` getter's public contract and its `StdioClientTransportInterface` row.

## What to add

- Branch on `drained` where the transport reports diagnostics, so a consumer learns when the
  tail may be partial rather than reading a truncated tail as complete.

## Scope

- Owned: `src/server/transports/StdioClientTransport.ts`, its suite, `guides/mcp.md` where the
  transport's evidence and teardown prose must follow, and `package.json` for the pin.
- The manifest's `@orkestrel/process` range is replaced by the local tarball for this work and
  RESTORED to the registry range before any release gate. The recorded range being replaced is
  `^0.0.5`; the restore target is `^0.0.6` once that publishes.
- OFF LIMITS: every other transport, `src/core`.

## Acceptance

1. `git status --porcelain` adds nothing beyond the standing entries plus owned files.
2. Scoped format and lint exit 0; `tsc --noEmit` exits 0.
3. Every existing evidence and teardown row in the transport suite passes UNCHANGED where its
   subject survives; a row whose subject the upstream change removed is rewritten and the
   rewrite explained.
4. `npm.cmd run test:src` and `npm.cmd run test:guides` exit 0 with totals.
5. Report the deleted fields by name and the line count the transport lost.

## Deviation contract

Stop on: a deleted field turning out to be load-bearing for a reason the upstream contract
does not cover; an existing row that cannot pass without weakening it; the frozen tail proving
unreachable through the held reference.
