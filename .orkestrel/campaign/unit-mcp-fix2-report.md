# Unit mcp-fix2 report: the closed-lifetime close() guard

Role `implementer`, engine Claude Opus 5, in the main checkout of `@orkestrel/mcp`.
Brief: `unit-mcp-fix2-brief.md`. Returned 2026-08-21; every criterion green; no
deviation, and no further `#closed`/`#closing` interleaving exposed.

## The fix

`close()` returns directly when `#closed` is true and `#closing` is undefined — a closed
lifetime with no barrier has reached and reported its terminal moment, so there is
nothing to tear down and nothing to join, and going through `??=` would leave the
resolved no-op barrier that parks a later listener's `start()` to the microtask queue.
Every case with a barrier assigned — an explicit teardown still running, the natural-exit
report barrier during the `error` emit — still joins through the untouched `??=` path.

## Failing-first

Row: `opens that restart inside the emit though an earlier close listener called
close()` — the orphan fixture, a first `close` listener calling `close()`, a second
calling `start()`, a third reading `evidence`.

- RED against the unfixed transport: exit 1, `1 failed | 41 passed (42)`,
  `expected 'descendant-early' to be ''` — the third listener read the ended child's
  tail because the no-op barrier parked the restart.
- GREEN after the guard: exit 0, `42 passed (42)`.

## Acceptance evidence

- `git status --porcelain` before and after identical; nothing added.
- Scoped `oxfmt --check` exit 0; scoped `oxlint --deny-warnings` exit 0, with the
  reporting path proven live by a scratchpad `debugger` probe outside the repository.
- `npm.cmd run check` exit 0 across the root, core, browser, and server projects.
- Transport file `42 passed (42)`; `test:src` `1078 passed (1078)` over
  `30 passed (30)` files; `test:guides` `138 passed (138)`; each exit 0.

## Prose check

No edit needed: the fix makes the unqualified restart sentences in
`src/server/types.ts:413-420`, `guides/mcp.md:2270-2281`, and `:4434-4439` true rather
than falsifying any sentence, and the barrier-joining neighbours stay true because the
`??=` path is untouched whenever a barrier is assigned.

The cross-engine re-check is `audit-mcp-fix2-brief.md`; its verdict file is
`audit-mcp-fix2-verdict.md`.
