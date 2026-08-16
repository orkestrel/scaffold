# Unit T-sweep2 — fleet test-helper inventory, corrected population (successor to sweep-brief.md)

Successor record: `sweep-brief.md` named 17 `fleet-target/*` clones as readable test
trees; the ecosystem lane proved they are dist-only artifact copies with no `tests/`
directory. This successor replaces that population with real source checkouts. The first
sweep's supervisor and middleware reading stays valid and is NOT repeated here.

Role: `grok`. Engine: Cursor Grok (`cursor-grok-4.6-high`). Read-only absorption. Return
distilled evidence with `file:line` pointers, never decisions, never raw dumps.

## Objective

Unchanged from `sweep-brief.md`: inventory the test-support logic these packages have
grown in their own `tests/` trees so the Orchestrator can judge which shapes have real
cross-package demand and belong in `@orkestrel/test`.

## Population — your dispatch names ONE slice

Base `/tmp/claude-0/-home-user/6d2dc0ef-4f55-5fcd-ae2e-97129e7119cf/scratchpad/fleet-src/`.

- **Slice A** (21 trees): abort, agent, brief, browser, budget, console, contract, csv,
  database, emitter, guide, html, indexeddb, interpret, markdown, mcp, msg, ndjson,
  ollama, pool, program.
- **Slice B** (21 trees): qualifier, queue, rater, reason, relation, router, sea,
  server, sqlite, sse, template, terminal, timeout, tool, toolbox, websocket, worker,
  workflow, workspace — plus `/home/user/test` (the @orkestrel/test package's own
  tests) and `/home/user/scaffold`.

Read each tree's `tests/` directory only: `setup*.ts` first, then helper/fixture
modules, then repeated inline patterns inside `*.test.ts`. A tree with no `tests/`
directory gets one row saying so.

## Standing facts

`@orkestrel/test` 0.0.3 exports: waitForDelay, captureError, requireValue, collect,
collectStream, roundTripJSON, resolveRoot, createRecorder (core); resolveContained,
matchesIdentity, isExcluded, readInventory, createScratch (server). Two vendored files —
`tests/setupPolicy.ts` and `tests/policy.test.ts` — are scaffold-owned and identical by
design across packages: report them once as vendored, never as a duplication cluster.

## Questions

Identical to `sweep-brief.md` sections 1-5: setup inventory per package; the
cross-package cluster table (same-shape helpers, semantic differences named); duplication
of the existing 13-export surface; demand counts per cluster; general-purpose singles.

## Scope

Read-only. Off-limits: everything outside your slice's `tests/` directories,
`node_modules/**`, `.git/**`, credentials. State your coverage: which trees you read,
which had no `tests/`, and that the other slice and the private form/table repos are
outside your reading.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Five sections; the cluster table is the centerpiece. Each row: package, `file:line`,
short signature, one-line context. End with `Unknowns:`.
