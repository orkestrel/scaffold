# Unit mcp-fix3: re-evidence the start() drain loop

## Role and engine

Role `implementer`, engine **Claude Opus 5**, in the main checkout at
`C:/Users/mikes/WebstormProjects/mcp`. You perform the assignment directly and spawn
nothing beyond the suites you run. This unit is test-only: it repairs one row whose
evidence the fix2 guard made vacuous. Read `AGENTS.md`, the applicable
`.claude/rules/*` files (`tests.md` foremost), and the transport suite before editing.

## The finding, accepted (from the Sol re-check of fix2)

The row `leaves the replacement an error listener began closable behind a close listener
close()` (`tests/src/server/transports/StdioClientTransport.test.ts:323-367`) constructed
its stale barrier through a natural-exit close listener's `close()`. The fix2 guard makes
that `close()` return directly (`src/server/transports/StdioClientTransport.ts:166`), so
the row still passes but no longer produces the resolved-barrier state its comments
assert, and the `start()` drain loop is no longer evidenced by it. The loop is still
load-bearing: a `start()` parked on an explicit teardown's barrier can resume to find a
NEWER barrier assigned — a replacement installed ahead of it and then explicitly closed —
and must wait that one out too.

Fix as prescribed: rebuild the row to construct the stale-start interleaving through the
explicit-close path — a live child closed explicitly while a `start()` is parked, so a
real teardown barrier (not a no-op) is the one the parked `start()` resumes against, with
a second explicit close over the replacement producing the newer barrier the loop must
follow. Correct the row's comments to describe the state it now constructs.

## The binding proof

The row must fail against a transport whose drain loop is reverted to the single wait —
temporarily replace the `while` walk in `start()` with the pre-fix1 single
`await`/`clear` pair, run the row, record the exact failure, then restore the loop by the
exact inverse edit and record the same command green. Show the restoration in the diff
(the transport file ends byte-identical to its state at your start).

## Scope

- Owned: `tests/src/server/transports/StdioClientTransport.test.ts`. The transport
  source may be touched ONLY for the temporary neuter and its exact restoration.
- Off-limits: everything else, including the manifest pair, `src/server/types.ts`, and
  `guides/mcp.md`.
- No commits, no installs, no mutating git commands, no tree-wide format or lint fix.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries, and
   `git diff -- src/server/transports/StdioClientTransport.ts` at your end is identical
   to the diff at your start; report both.
2. Scoped `oxfmt --check` and `oxlint --deny-warnings` on the suite file exit 0.
3. The neuter pair recorded with exact commands and counts: red with the loop reverted,
   green with it restored.
4. The transport file's suite and `npm.cmd run test:src` each exit 0; totals reported.

## Output

The complete diff of the suite file, the neuter-pair record, per-criterion exit codes
and totals, and any deviation (expected, found, exact evidence, done or not done, at
most one short hypothesis). No process diary.

## Deviation contract

Stop on: the rebuilt row refusing to go red against the single-wait transport; any
production-code change beyond the temporary neuter proving necessary; any further
`#closed`/`#closing` interleaving defect your work exposes — that last one is a design
finding for the Orchestrator, not yours to patch.
