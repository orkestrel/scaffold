# Unit mcp-fix3 report: the drain-loop row re-evidenced

Role `implementer`, engine Claude Opus 5, in the main checkout of `@orkestrel/mcp`.
Brief: `unit-mcp-fix3-brief.md`. Returned 2026-08-21; every criterion green; no deviation
stop fired.

## The brief discrepancy, settled by the unit and accepted

The brief named its subject two ways resolving to different rows: the quoted title
matched the row at `:1043`, the cited line range `:323-367` delimited
`gives a close() issued behind a stale start() the running teardown, not a no-op`. The
unit rebuilt the range's row, ruled by substance: that row was the drain loop's only
evidence, its comments asserted the resolved-barrier state, and post-fix2 its prelude
`close()` returns directly so neither `start()` parked and the loop was never entered.
The prescribed rebuild fits only that row's structure.

## The rebuilt row

`holds a stale start() behind the newer teardown a close() opened while it was parked`:
an explicit `close()` over a live deaf child runs a real teardown whose settled barrier
stays assigned; two `start()` calls capture it and park; the first resumes, clears,
installs a live replacement; a queued microtask closes that replacement, opening a real
newer teardown barrier; the parked second `start()` resumes against it and must walk to
it. Discriminator: `closes === 2` immediately after both settle — a single-wait `start()`
discards the newer barrier and spawns over the running teardown, leaving `closes === 1`.
A final explicit close reads `closes === 3`, proving the walk left the replacement
closable. The barrier-claim fixtures the old prelude needed were deleted with it.

## The neuter pair

The `while` walk in `start()` temporarily reverted to the pre-fix1 single `await`/clear:

- RED (2026-08-21 21:28:49): exit 1, `1 failed | 41 skipped (42)`,
  `expected 1 to be 2` at the discriminator.
- GREEN (21:29:05), loop restored by the exact inverse: exit 0,
  `1 passed | 41 skipped (42)`.
- The transport source ends byte-identical to its start
  (`sha256 a7a3aada…365c7` at start and end; `git diff` unchanged).

## Acceptance evidence

- `git status --porcelain` before and after identical; nothing added.
- Scoped `oxfmt --check` and `oxlint --deny-warnings` on the suite file: exit 0.
- Transport file `42 passed (42)`; `test:src` `1078 passed (1078)` over
  `30 passed (30)`; `tsc --noEmit` exit 0 as an observation.

## The ancillary observation, carried and closed

Row `:1043`'s comment still described the pre-fix2 no-op barrier ("the resolved barrier
it leaves behind"); its assertion was never vacuous. The Orchestrator corrected the
comment directly 2026-08-21 — the `close()` returns directly and leaves nothing behind —
and verified scoped: `oxfmt --check` and `oxlint --deny-warnings` on the suite file
exit 0.

This closes the mcp audit chain: adoption (`unit-mcp-adopt-report.md`), fix1, fix2, fix3,
with verdicts and reconciliations beside each. The production sweep in
`audit-mcp-fix2-verdict.md` found no remaining teardown interleaving defect.
