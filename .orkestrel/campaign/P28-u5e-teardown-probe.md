# P28 — a stage that rejects still removes its scratch tree

Orchestrator probe, 2026-09-15 19:12Z, on the mcp tree after U5e, with no gate and no lane live.
Seam S6 claim 64 found that the composition's teardown awaited the stage's own promise before the
removal, so a stage that rejected left the scratch tree behind — the package cache, the packed
archive, and both installed consumers — in the temporary directory. U5e carrier 2 answered it with
a `try`/`finally`. This probe is the reading that settles whether the answer works, because the
unit's own run never exercises the path: a receipt failing after the stage opened leaves a resolved
promise, which the old code also cleaned up.

Instruments `P28-run.sh.txt` and `p28-mutate.mjs.txt`; log `P28.log.txt`.

## The plant

The mutation seeds the composition's module walk with `@orkestrel/planted-p28`, a specifier the
installed tree serves nothing for, so the stage's own `outside` guard throws. The guard fires after
the consumer is installed and the browser is launched, which is what makes the tree exist and the
leak reachable.

## The readings

`ls -d $TEMP/distribution-*` before the run: none.

`npm run test:distribution -- --mode release` with the plant in place, exit 1:

```text
FAIL  |distribution| tests/distribution.test.ts [ tests/distribution.test.ts ]
Error: The consumer's installed tree serves no module for @orkestrel/planted-p28
Failed Tests 8
  … every composition receipt, the refusal receipt among them
```

The stage's designed guard is what threw, so the plant reached the path under test rather than some
other failure. `ls -d $TEMP/distribution-*` immediately after: **none**. The tree the run created
was removed despite the stage rejecting, which is exactly what the old code could not do.

The file restored from the copy taken first, `cmp` 0, and the same command green again.

## What it settles

Claim 2 of `A5c-audit-brief.md`, on the Orchestrator's own evidence rather than the unit's report.
The route S6 recorded as still open after this fix — a child that never announces its port, where
the stage promise stays pending rather than rejecting and both the test and the hook time out — is
untouched by this probe and remains the carry-forward A5b recorded.
