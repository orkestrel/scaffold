# The teardown defects are upstream — three lanes, measured, 2026-08-21

Run after three consecutive audit rounds found teardown defects in mcp's
`StdioClientTransport`. The question was whether the transport was the source or a symptom.
It is a symptom. Every lane executed real children rather than reading.

## What `@orkestrel/process` actually promises

`destroy()` is not a finality point. It resolves on the child's NATIVE EXIT while stderr is
still arriving, and it kills the push channel while leaving the pull channels live:

- Measured: `destroy()` resolved in 0ms with `evidence` at 539 bytes; 1500ms later `evidence`
  was 1403 bytes. 864 bytes of child diagnostics arrived after the barrier settled.
- Measured, the asymmetry: in the same run the `stderr` event count froze at 20 the instant
  `destroy()` resolved (emitter destroyed) while `evidence` grew 864 bytes. A consumer
  watching the emitter sees a quiet child; a consumer reading `evidence` sees a moving
  target. **That is the defect mcp kept rediscovering — it was policing two channels that
  disagree.**
- Measured: `lines` has it too — 32 stdout lines delivered after `destroy()` resolved, the
  iterator still open 2000ms later. That is the "line emitted after teardown began" class.
- Measured: `exit` IS final for both `evidence` and `lines` — zero growth after it settles,
  including under an 8 MB and a 40 MB stderr flood.
- But `exit` is unbounded: with a descendant holding the inherited pipe it stays pending for
  that descendant's life. `stopChild` returns early when the root has already exited, so the
  orphan is never reached — `killTree`'s own TSDoc says a descendant outliving its root is
  beyond the mechanism.
- No public `closed`, `done`, `settled`, or `terminating` member exists. `#closed` and
  `#terminating` already exist as private fields. `code`/`signal` are a FALSE finality
  signal: `code` was 7 while `evidence` grew from 188 to 1403 bytes.

## What Node permits, which bounds any upstream promise

- No bytes arrive after a piped stream's `end`/`close`, and ChildProcess `close` always fires
  at or after stderr `end` (measured in every run). **`close` is a sound finality point;
  `exit` is not.**
- `close` has no bounded latency: any process holding a write handle defers it indefinitely.
  Measured 3093.8ms and 6032ms of post-exit delivery through a detached descendant.
- `taskkill /F /T` cannot reach such a holder once the direct child has exited — measured
  status 128 "process not found" while data kept arriving for a further 2.28s.
- Node exposes no count of remaining pipe writers.
- **A total "diagnostics are final" guarantee is impossible in principle. A precise partial
  one — drained versus truncated, with a bounded wait — is implementable.**
- Lever worth taking: ordering the Windows tree kill while the direct child is STILL ALIVE
  reaps even a `detached: true` descendant and collapses close lag from seconds to 1ms.

## Who reinvents the same state

Four construction sites: mcp's `StdioClientTransport`, supervisor's `ProviderExecution` and
the probe path in `ProviderExecutor`, supervisor's app `CLIProvider`, and probe's
`LintStage`. Each reinvents a held child reference, a teardown-began boolean, a shared
barrier, and a private copy of the stderr tail.

**A real defect this found, not in mcp:** `ProviderExecution` built no pump release, so a
descendant holding stdout strands its `#finish`, its settlement, and its registry eviction.
That is a hang, live today.

`CLIProvider` holds nothing across calls, so the mechanism is inert for it. `LintStage`
frames Content-Length LSP headers, discards stderr, and does not use the package at all.

## The ruled scope

**Upstream, in `@orkestrel/process` (a 0.0.6):**

1. Freeze the tail at the child's own end and answer the frozen value thereafter. Removes
   mcp's private copy, and makes supervisor's two late live reads correct **without either
   file changing**.
2. End `lines` at teardown. Removes mcp's release/pump pair and closes supervisor's stall.
3. Expose the terminal fact and the in-flight fact as getters derived from the existing
   `#closed` and `#terminating` — no second flag, no drift.
4. Add the drained-versus-truncated discriminant with a bounded wait, since a total guarantee
   is impossible. `ProcessOptions` says "There is no completion deadline", so the bounded
   form needs its own naming decision — that is a design question, not a mechanical edit.
5. Order the Windows tree kill before the direct child exits.

**Downstream, after it publishes:** mcp sheds its private tail, release, and pump fields and
keeps only the restartable-single-slot policy that is genuinely its own. Supervisor gets two
correctness fixes and one hang closed. Nothing else in the fleet is touched.

**Not fixable anywhere, belongs in the guide:** a descendant inheriting the pipe keeps stderr
readable and defers `close` for its whole life, `taskkill /F /T` cannot reach it once the
root has exited, and Node offers no way to count remaining writers.
