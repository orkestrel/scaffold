# Unit conform-template fix round 1b — resume the fix round on the re-staged closure

Successor of `conform-template-fix1-brief.md`, which stays in force for everything this file does not restate. Supersedes it as the effective brief.

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/template` (for no edit this time: the plant of row 3 is done and undone) and of the unit's report. Perform the assignment directly and spawn nothing.

## What changed and why

The first run of fix round 1 applied rows 1, 2, and 3 (the report's dispositions, the re-run sweeps, and the setup row's control: `/home/user/work/evidence/template-proofs/template-obj-5-control-red.txt` 1 failed, `template-obj-5-green.txt` 1 passed) and stopped at row 4 because `npm run check` exited 2 on `tests/guides.test.ts` importing `computeSymbolKey`, `extractFenceImports`, and `findMissingSymbols`, absent from the installed `@orkestrel/guide`. That was not the tree's defect: a bench lane's launch had replaced the staged closure in `node_modules` with the registry install at 15:35 UTC. The Orchestrator re-staged the closure at 16:21 UTC (`node_modules/@orkestrel/guide/dist` carries `findMissingSymbols` again), and every bench lane now runs behind an npm shim that refuses an install inside a checkout.

## Rows

1. **Rows 1 to 3, verify.** Read the report and confirm the three rows' edits are present as the superseded brief states them (the `stopped` sentence gone, the sweeps rewritten with results, the setup row in the failing-first table naming both capture files); confirm with `git -C /home/user/fleet/template diff -- tests/setup.ts` that the plant is gone. Where an edit is absent, apply it.
2. **Rows 4 to 8** of the superseded brief, unchanged. Row 4's gate captures go to `/home/user/work/evidence/template-proofs/gate-<script>-landed.txt`, overwriting the first run's partial set.
3. **Evidence** per the superseded brief's § Method: `node /home/user/scaffold/tmp/work/evidence.mjs template`.

Everything else — law, rulings, host discipline, scope, tools and limits, output, deviation contract, acceptance criteria, review evidence — is the superseded brief's, read in full first.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.
