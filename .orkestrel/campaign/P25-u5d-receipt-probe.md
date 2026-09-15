# P25 — the composition receipts bind, replayed by the Orchestrator

Orchestrator probe, 2026-09-15 18:39Z, on the mcp tree at `8d97dd0` plus U5c and U5d, with no gate
and no lane live. U5d reported both readings itself; a writer's self-report never establishes
green, so each vector is replayed here. Instruments: `P25-run.sh.txt`, `p25-mutate.mjs.txt`; log
`P25.log.txt`.

## Vector (a) — the import map is load-bearing

`buildReceiptPage` in `tests/distribution.test.ts` emits `{ imports: modules.imports }`; the
mutation filters `@orkestrel/emitter` out of that map, leaving every other entry and the serving
fixture untouched. `npm run test:distribution -- --mode release`:

```text
Error: The page raised TypeError: Failed to resolve module specifier "@orkestrel/emitter".
Relative references must start with either "/", "./", or "../".
Test Files  1 failed (1)
      Tests  7 failed | 11 passed | 4 skipped (22)
```

Every composition receipt reddens and the surface drives stay green, so the page resolves its
imports through the map the test emits rather than through anything the runner supplies. The
error reaches the console recorder rather than `pageerror`, as U5d recorded.

## Vector (b) — the metadata projection binds

The mutation drops `title: 'Add two numbers',` from `ADD` in
`tests/fixtures/distributionPage.mjs`. The same command:

```text
Failed Tests 2
AssertionError: expected { connected: true, …(5) } to strictly equal { connected: true, …(5) }
-       "title": "Add two numbers",
AssertionError: expected { advertised: [ { …(4) } ], …(8) } to strictly equal { advertised: [ { …(5) } ], …(8) }
-       "title": "Add two numbers",
-     "title": "Add two numbers",
Test Files  1 failed (1)
      Tests  2 failed | 16 passed | 4 skipped (22)
```

Exactly the in-page pair receipt and the agent-dispatch receipt redden, and the second names the
loss twice — once off the wire listing, once off the agent registry's own entry. A field lost in
transit cannot pass.

## Restore

Each vector restored from a copy taken before the run, `cmp` 0 on both files, then
`npm run test:distribution -- --mode release` exit 0, `Tests 18 passed | 4 skipped (22)`, and
`git status --short` reading the same five paths it read before the probe.
