# Unit mcp-fix1 report: the restart barrier, and the stale-barrier defect it exposed

Role `implementer`, engine Claude Opus 5, in the main checkout of `@orkestrel/mcp`.
Brief: `unit-mcp-fix1-brief.md`. Returned 2026-08-21; every criterion green; one recorded
in-scope deviation, accepted by the Orchestrator in `audit-mcp-fix1`'s reconciliation.

## The fixes

- **The natural-exit barrier** (`#onExit`): a barrier promise is installed into
  `#closing` before `#report`, released and cleared before the `close` emit. An
  `error`-listener `start()` parks on it and resumes on the microtask queue after
  `close` has been delivered; a `start()` from a natural `close` listener finds no
  barrier and installs inside the emit — the documented restart. An `error`-listener
  `close()` finds the barrier through `??=`, opens no second teardown, and resolves as
  the no-op an ended lifetime makes it, after `close` fired.
- **The `start()` drain loop** — the deviation, with its own failing-first proof. The
  prescribed barrier alone opens a path the unit measured: a `close` listener's
  `close()` no-ops against the ended lifetime and leaves a resolved promise in
  `#closing`; the parked `start()` refuses to clear a barrier not its own and installs
  the replacement under it; a later `close()` resolves through the stale promise and the
  live replacement can never be torn down — which also breaks the printed "lifetimes
  never overlap" claim. `start()` now waits out every barrier it meets and clears the
  last one it waited on. The barrier is what makes the path reachable, so the loop ships
  with it rather than as a successor.
- **The qualified prose**: the `evidence` Lifetime remark in `src/server/types.ts` and
  the guide's matching passage state the natural-exit versus explicit-close restart
  split; the guide sentence asserting "a natural exit holds no barrier" followed the
  change.

## Red then green (transport file suite, 2026-08-21)

| Tree state | Result |
| --- | --- |
| Unit start | `38 passed (38)`, exit 0 |
| Hazard row added, transport unfixed | `1 failed | 39 passed (40)` — `expected '' to contain 'descendant-early'`; the control green in the same run |
| `#onExit` barrier landed | `40 passed (40)`, exit 0 |
| Closable-replacement row added, barrier only | `1 failed | 40 passed (41)` — `expected 1 to be 2` |
| `start()` drain loop landed | `41 passed (41)`, exit 0, repeated |

## Acceptance evidence

- `git status --porcelain` before and after identical: the standing adoption set, nothing
  added.
- Scoped `oxfmt --check` and `oxlint --deny-warnings` on the owned files: exit 0.
- `npm.cmd run check`: exit 0 across the root, core, browser, and server projects.
- Transport file `41 passed (41)`; `test:src` `Tests 1077 passed (1077)` over
  `30 passed (30)` files; `test:guides` `138 passed (138)`; each exit 0.

The new rows: `delivers an ended lifetime close before a restart its own error listener
began`, its control `a restart the same exit close listener began still opens inside that
emit`, and `leaves the replacement an error listener began closable behind a close
listener close()`.

The cross-engine re-check is `audit-mcp-fix1-brief.md`; its verdict file is
`audit-mcp-fix1-verdict.md`.
