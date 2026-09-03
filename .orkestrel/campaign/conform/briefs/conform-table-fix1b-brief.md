# Unit conform-table fix round 1b — resume the fix round on the re-staged closure

Successor of `conform-table-fix1-brief.md`, which stays in force for everything this file does not restate. Supersedes it as the effective brief.

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/table`. Perform the assignment directly and spawn nothing.

## What changed and why

The first run of fix round 1 applied row 1 (the accessor case in `tests/src/core/Table.test.ts`, green in `/home/user/work/evidence/table-proofs/table-subj-2a-accessor.txt`) and row 2 (the guide sentence at `guides/table.md:226-228`), then stopped because `npm run test:guides` failed with 8 failures on `computeSymbolKey`, `extractFenceImports`, and `findMissingSymbols` missing from the installed `@orkestrel/guide`. That was not the tree's defect: a bench lane's launch had replaced the staged closure in `node_modules` with the registry install at 15:30 UTC. The Orchestrator re-staged the closure at 16:21 UTC (`node_modules/@orkestrel/guide/dist` carries `findMissingSymbols` again), and every bench lane now runs behind an npm shim that refuses an install inside a checkout.

## Rows

1. **Rows 1 and 2, verify.** Read `tests/src/core/Table.test.ts` and confirm the accessor case is present and named for what it proves; read `guides/table.md:226-228` and confirm it carries the replacement sentence quoted in the superseded brief's row 2. Run `npm --prefix /home/user/fleet/table run test:guides > /home/user/work/evidence/table-proofs/table-subj-2b-guides.txt 2>&1` and read it green. Where either edit is absent, apply it as the superseded brief's row states.
2. **Rows 3, 4, and 5** of the superseded brief, unchanged.
3. **Gates, audit, evidence** per the superseded brief's § Method: `format:check`, `lint:check`, `check`, `build`, `test` (one plain command each, converging with `lint` then `format` only where a check reddens on an owned file), then `cd /home/user/fleet/table && npx scaffold audit --offline`, then `node /home/user/scaffold/tmp/work/evidence.mjs table`.

Everything else — law, host discipline, scope, tools and limits, output, deviation contract, acceptance criteria, review evidence — is the superseded brief's, read in full first. Its § Unknowns is closed: the accessor case passed.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.
