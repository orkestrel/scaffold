# Review of the C1 follow-up delta (browser `main` at `b1b1c8f`, uncommitted, units `contexts-c1svc3` and `contexts-c1svc4`), Opus 5.5 reviewer, 2026-10-05

Objective lane: correctness, protocol, concurrency, and tests. Terminal: **FAIL**.

1. **F1:** CONFIRMED in the code: the guard derives from `#losses`, `status`, `#closing`, and the failure's class. Gap: every case fails with a `CDPConnectionError`, so neither the "still faults" half nor the loss conjunct is pinned.
2. **F2:** REFUTED. The page's `detach` is silenced, but `BrowserRegistry` subscribes to `Page.frameDetached` per session itself (`BrowserRegistry.ts:223`, `:280-297`). It can emit `change` between the `Target.closeTarget` send and `registry.destroy()`.
3. **The session-detach settlement:** CONFIRMED.
   - It matches on `params.sessionId`, so it covers a detach reported on the root and on a parent session.
   - It settles before dispatch, so a same-tick send on the detached session gets a new entry.
   - `#settle` clears the entry's timer and abort listener.
   - A detach for an unknown session, or a second detach, is a no-op.
4. **Teardown callers:** CONFIRMED for the callers checked. The server project ran green afterward, at the Orchestrator's run: 388 passed, 10 skipped.
5. **Tests:** CONFIRMED red and green under the controls. No case covers a child session's detach delivered on its parent.
6. **Outside the claims:** the `CDPConnectionError` description (`errors.ts:113-117`) is false for a session detach on a live client.

Required changes, carried by unit `contexts-c1svc5` (browser `tmp/codex/contexts-c1svc5-brief.md`):
- the registry's early returns once the page is closed or the registry is destroying, with a case;
- the healthy-browser fault case and the loss-conjunct case;
- the child-on-parent detach case;
- the error description in source and guide.
