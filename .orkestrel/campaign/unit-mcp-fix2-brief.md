# Unit mcp-fix2: the no-op barrier a closed lifetime's close() leaves behind

## Role and engine

Role `implementer`, engine **Claude Opus 5**, in the main checkout at
`C:/Users/mikes/WebstormProjects/mcp`. You perform the assignment directly and spawn
nothing beyond the suites you run. This is the fix round for the accepted finding in the
Sol re-check of unit mcp-fix1; the evidence is quoted in full here. Read `AGENTS.md`, the
applicable `.claude/rules/*` files, and `guides/mcp.md` before editing.

## Context

The working tree carries the adoption and fix1 units uncommitted; every currently-dirty
file is a standing entry. `@orkestrel/process` 0.0.6 is installed from a local tarball;
the manifest pair is standing and off-limits. Host facts: Windows 11, Git Bash; the `npm`
PowerShell shim is blocked — `npm.cmd` / `npx.cmd` from the repository root.

## The finding, accepted

During a natural `close` emit, an earlier listener calls `close()`. At that point
`#closed` is true and `#onExit` has already cleared its barrier, so
`this.#closing ??= this.#teardown()` assigns the resolved promise the early-return
teardown produces (`src/server/transports/StdioClientTransport.ts:166-180`). A later
listener's `start()` then awaits that no-op barrier and parks to the microtask queue
(`:122-130`), so the replacement does not install inside the emit and later listeners
read the ended child's tail — while `src/server/types.ts:413-420` and
`guides/mcp.md:2270-2281` state without qualification that a natural-exit `close`
listener's `start()` opens the replacement inside the emit and changes what later
listeners read.

Fix as prescribed: in `close()`, return directly when `#closed` is true and no active
barrier exists, so a closed lifetime's `close()` never manufactures a no-op barrier.
When `#closed` is true and a barrier IS assigned — an explicit teardown still running,
or the natural-exit report barrier live during the `error` emit — the existing
await-through-`??=` path stands unchanged. The prose in the types remark and the guide
then stays true with no exception clause; touch it only if your reading finds a sentence
the fix falsifies.

## Failing-first requirement

Add the listener-order regression row before the fix lands: a natural exit whose
terminal moment reaches the cutoff (the suite's orphan fixture), a first `close`
listener that calls `close()`, a second that calls `start()`, and a third that reads
`evidence` — asserting the third reads the replacement's `''`, proving the restart
installed inside the emit despite the earlier `close()`. Record the red run
(the third listener reads the ended child's tail against the unfixed transport) with
exact command and counts, then the same command green.

## Scope

- Owned: `src/server/transports/StdioClientTransport.ts`,
  `tests/src/server/transports/StdioClientTransport.test.ts`, and `src/server/types.ts`
  plus `guides/mcp.md` only if a sentence needs to follow the fix — check both and
  report the check.
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
exit codes and totals, the prose check result, and any deviation (expected, found, exact
evidence, done or not done, at most one short hypothesis). No process diary.

## Deviation contract

Stop on: the early return breaking any existing row you cannot repair inside owned
files; the regression row refusing to go red against the unfixed transport; a needed
edit outside the owned set; any further `#closed`/`#closing` interleaving defect your
work exposes — that last one is a design finding for the Orchestrator, not yours to
patch.
