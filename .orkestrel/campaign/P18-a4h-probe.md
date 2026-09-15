<!-- P18 — Orchestrator probe on the host, 2026-09-15: reproduces U4k carrier 2's red reading independently (A4h analyst claim 2). Instruments: P18-a4h-probe.mjs.txt (mutation), P18-a4h-probe.sh.txt (runner); log P18-a4h-probe.log.txt. -->

# P18 — the U4k failure-path pin read red against the reconcile-then-prune order

Closes A4h analyst claim 2. The red reading for `releases what the manager dropped when a
registration fails` existed only in the U4k writer's report; this probe takes it on the host with
the Orchestrator's own instrument.

## Control

`src/browser/ModelContext.ts` at the U4k state (SHA-256 `56ac1dc5588e259d…`), mutated in place
by `P18-a4h-probe.mjs.txt`: each caller's `try { reconcile loop } finally { prune }` block matched
exactly once and flattened to the loop followed by the prune with no `finally` (the U4j order).
Mutated SHA-256 `44e94539ef811a61…`.

## Readings

Red, on the mutated file:

```text
npm run test:src:browser -- tests/src/browser/ModelContext.test.ts -t "releases what the manager dropped when a registration fails"
exit=1
FAIL tests/src/browser/ModelContext.test.ts:323:2 > the registry this handle follows after publishing it > releases what the manager dropped when a registration fails
AssertionError: expected [ { …(2) } ] to deeply equal []
Tests  1 failed | 56 skipped (57)
```

Restored from the byte copy: SHA-256 `56ac1dc5588e259d…`, equal to the reading before the
mutation. Green, on the restored file, same command: `exit=0`, `Tests 1 passed | 56 skipped (57)`.
`git status --short --untracked-files=no` names 27 paths before and after.

## Ruling

The pin binds to the `finally`: the assertion that fails is the one the U4k report names, on the
order the report names, and the file is byte-identical afterwards. Claim 2 is closed by this
record.
