# Unit T-sweep — fleet test-helper inventory for the @orkestrel/test promotion round

Role: `grok`. Engine: Cursor Grok (`cursor-grok-4.6-high`). Read-only absorption. Return
distilled evidence with `file:line` pointers, never decisions, never raw dumps.

## Objective

Inventory the test-support logic the fleet's packages have grown in their own trees, so
the Orchestrator can judge which shapes have real cross-package demand and belong in
`@orkestrel/test`.

## Population — read exactly these 19 trees, and nothing else

- `/workspace/supervisor`, `/workspace/middleware` (live checkouts)
- `/tmp/claude-0/-home-user/6d2dc0ef-4f55-5fcd-ae2e-97129e7119cf/scratchpad/fleet-target/<name>`
  for: agent, budget, contract, database, emitter, guide, mcp, middleware, ollama,
  router, sea, server, sse, terminal, test, tool, workflow (17 clones; they may lag the
  registry — every row carries the tree it was read from).

In each tree read `tests/` only: `setup*.ts` files first, then helper/fixture files, then
repeated inline patterns inside `*.test.ts`.

## Standing facts

`@orkestrel/test` 0.0.3 already exports: waitForDelay, captureError, requireValue,
collect, collectStream, roundTripJSON, resolveRoot, createRecorder (core);
resolveContained, matchesIdentity, isExcluded, readInventory, createScratch (server).
The fleet-target/test tree is the package itself — read it only to confirm that surface.

## Questions — one section per question

1. **Setup inventory.** Per package: every exported symbol in `tests/setup*.ts` and any
   shared fixture/helper module under `tests/`, with `file:line`, signature sketch, and
   one-line semantics.
2. **Cluster table.** Cluster same-shape helpers across packages. Name each cluster by
   what it does (examples to look for, not limits: loopback port reservation; fixture
   HTTP/WS/SSE servers; child-process spawn/wait-ready/stop; environment-object
   builders; poll-until/deadline loops; stream and event capture; fixture CLI backends;
   temp resources beyond createScratch; database fixtures; abort/signal harnesses).
   For each cluster: member packages, `file:line` per member, and where the shapes
   genuinely differ (semantics, not spelling).
3. **Duplication of the existing surface.** Helpers that re-implement one of the 13
   existing `@orkestrel/test` exports instead of importing it — adoption gaps, per
   package with `file:line`.
4. **Demand counts.** Per cluster: how many distinct packages contain a member, and
   roughly how many call sites each member has inside its own tree.
5. **Singles worth naming.** Helpers with only one package today whose semantics are
   plainly general (not product policy), listed separately — evidence, no advocacy.

## Scope

Read-only. Off-limits: everything outside the 19 trees' `tests/` directories, plus
`node_modules/**` everywhere, `.git/**`, credentials. State your coverage in the report:
19 trees read, `tests/` only, and the fleet's remaining packages unread.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Five sections mirroring the questions; the cluster table is the centerpiece. Each row:
package, `file:line`, short quote or signature, one-line context. End with `Unknowns:`.
