# U2 successor brief — RosterManager and stream lifecycle

Successor to `u2-brief.md` (which stands where not amended here). Written after U1's audit chain
closed at commit `a261b6d`. Same role and engine: `implementer` route, **GPT-5.6 Sol**, sandbox
`workspace-write`, sole serial writer in `/workspace/supervisor` from baseline `a261b6d`. Perform
directly, spawn nothing, no commits/pushes/installs.

## What changed since the original brief

- **Baseline** is `a261b6d` — U1 plus four audited fix rounds. U1's landed contract is
  authoritative; read `app/core/types.ts`, `app/browser/types.ts`, and
  `app/browser/services/Client.ts` as they are before writing anything.
- **`app/browser/types.ts` already carries U1's client types** (`ClientRosterInterface`,
  `ClientRequestHandler`, `LiveStreamOptions`, `LiveStreamEventHandler`). The audit ruled this
  in-scope U1 fallout. You own the file this round: extend it, do not disturb those.
- **Contract facts, all audit-proven:** `client.roster` is `{ read(), watch(signal) }`;
  `ApplicationRun` is `{ id, status: WorkflowStatus, paused, created, updated }` (no `waiting`,
  timestamp is `created`); every frame is a complete grant-filtered roster; membership, status
  transitions, and pause/resume all emit frames.
- **The server never ends a stream on logout or session expiry** — an admitted viewer serves
  until disconnect (uniform posture with the workflow channel). Your manager's abort on
  logout/session-invalidation is therefore the ONLY termination; treat it as such in the tests.
- **Single-consumer law:** a viewer iterable admits one consumer; a second concurrent `next()`
  rejects. The manager owns the single consumption loop; nothing else touches the stream.
- An `AUTH`-refused stream (session died server-side) maps to the session-expired transition
  exactly once, idempotent to a second refusal — unchanged from the original brief.

Everything else — ownership (`app/browser/types.ts`, new
`app/browser/controllers/RosterManager.ts`, `factories.ts`, `Operator.ts`, barrel row, mirrored
tests), off-limits, forbidden list, the seven acceptance criteria, and the deviation contract —
is `u2-brief.md` verbatim.

## Output

As `u2-brief.md`, plus: name any place the landed U1 contract forced a departure from the
original design text.
