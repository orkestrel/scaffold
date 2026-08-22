# Unit mcp-fix1: the natural-exit restart barrier and the qualified restart sentence

## Role and engine

Role `implementer`, engine **Claude Opus 5**, in the main checkout at
`C:/Users/mikes/WebstormProjects/mcp`. You perform the assignment directly and spawn
nothing beyond the suites you run. This is the fix round for the accepted findings in the
Sol audit of unit mcp-adopt; the audit's evidence is quoted in full here, so this brief is
self-contained. Read `AGENTS.md`, the applicable `.claude/rules/*` files, and
`guides/mcp.md` before editing.

## Context

The working tree carries the mcp-adopt unit uncommitted; treat every currently-dirty file
as a standing entry. `@orkestrel/process` 0.0.6 is installed from a local tarball; the
manifest pair is standing and off-limits. Host facts: Windows 11, Git Bash; the `npm`
PowerShell shim is blocked — `npm.cmd` / `npx.cmd` from the repository root.

## Finding 1, accepted: a stale `close` can land after a successor installs

The interleaving, verified against source: child A exits naturally with `drained: false`;
`#onExit` passes the identity guard, sets `#closed = true`, and calls `#report`, whose
`error` emission is synchronous
(`src/server/transports/StdioClientTransport.ts:199-211`). An error listener calls
`start()`: no `#closing` barrier exists on this path, the ended-child branch does not
short-circuit, so successor B installs synchronously
(`StdioClientTransport.ts:107-126`). Control returns to A's `#onExit`, which emits
`close` — after B is installed. A `close` listener then acts on lifetime B while being
told A ended. The `#teardown` path is already safe because `#closing` holds the teardown
promise across its `#report`.

Fix as prescribed by the audit: in `#onExit`, hold `#closing` across `#report` —
install a barrier promise before the report, release and clear it before emitting
`close` — so an error-listener `start()` awaits the barrier and resumes on the microtask
queue after `close` has been delivered, while a `start()` called from a natural `close`
listener still finds no barrier and installs synchronously, preserving the documented
restart behaviour. Think through and pin the edges: an error listener calling `close()`
instead (it finds the temporary barrier through `??=`, awaits it, and must resolve as the
no-op an ended lifetime makes it); a second `start()` racing the first through the
cleared barrier; the guard that clears `#closing` only when it still holds this
lifetime's barrier.

## Finding 2, accepted: the unqualified restart sentence

`src/server/types.ts:413-415` states without qualification that a `close` listener's
`start()` opens the next lifetime itself and replaces the value every listener after it
would have read. That is true on a natural exit; after an explicit `close()`, `start()`
waits on the teardown barrier. The guide already distinguishes the cases
(`guides/mcp.md` near `:2270`). Qualify the type remark with the same natural-exit
versus explicit-close split, in the remark's own voice.

## Failing-first requirement

Before the finding-1 fix lands, add the row that encodes the hazard: a child ending in a
`drained: false` natural exit (the orphan fixture the suite already drives), an `error`
listener that calls `start()`, and an assertion that the `close` event for lifetime A is
delivered before successor B is installed (observable through the ordering of the `close`
delivery against the replacement's installation, or through what a `close` listener reads
at delivery). Record the red run's exact command and failing count against the unfixed
transport, then the same command green. Add a control proving a `start()` called from a
natural `close` listener still installs synchronously.

## Scope

- Owned: `src/server/transports/StdioClientTransport.ts`,
  `tests/src/server/transports/StdioClientTransport.test.ts`, `src/server/types.ts`
  (the one remark), `guides/mcp.md` (only if its prose must follow the barrier change —
  check and report).
- Off-limits: everything else, including the manifest pair.
- No commits, no installs, no mutating git commands, no tree-wide format or lint fix.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries; report before and
   after.
2. Scoped `oxfmt --check` and `oxlint --deny-warnings` on the owned files exit 0.
3. `npm.cmd run check` exits 0.
4. The failing-first pair recorded with exact commands and counts.
5. The transport file's suite, `npm.cmd run test:src`, and `npm.cmd run test:guides`
   each exit 0; totals reported.

## Output

The complete diff of what this unit changed, the red-then-green record, per-criterion
exit codes and totals, the edge-case rulings you made on the barrier, and any deviation.
No process diary.

## Deviation contract

Stop on: the barrier fix breaking any existing row you cannot repair inside owned files;
the hazard row refusing to go red against the unfixed transport; a needed edit outside
the owned set. Comment wording and the exact test mechanics within the stated property
are yours: decide, record, carry on.
