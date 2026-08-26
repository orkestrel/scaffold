# Unit B2 report — browser: SIGTERM-survival test gating

Builder (Sonnet) returned 2026-08-26. Acceptance met.

- `tests/setupServer.test.ts`: the descendant-outlives-SIGTERM case now runs under
  `it.runIf(cooperativeSIGTERM)`, a constant whose TSDoc names the mechanism (Windows delivers
  `SIGTERM` as an unconditional terminate; a handler never runs), matching the sibling gate in
  `tests/src/server/Browser.test.ts`.
- Scoped setup run on this host: 16 passed | 1 skipped (17) — the gated case skips here.
- `format:check` and `lint:check` green. Only the owned file changed beside B1's standing edits.
