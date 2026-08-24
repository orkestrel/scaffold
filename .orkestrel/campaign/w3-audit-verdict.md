## Audit W3 — bounded `createTeardown` adoption

**Subject:** uncommitted diff at `/home/user/scaffold/tmp/units/w3.diff` against `/home/user/orkestrel/probe` (7 files: `tests/src/bin/main.test.ts`, `tests/src/core/errors.test.ts`, `tests/src/server/Probe.test.ts`, `tests/src/server/ProbeServer.test.ts`, `tests/src/server/stages/{LintStage,RuntimeStage,TypeStage}.test.ts`).

**Preliminary gap:** the writer's brief (`/home/user/scaffold/tmp/units/w3-teardown-brief.md` § Output) requires a final-message report naming the converted/skipped ledger. No such report or ledger file exists anywhere under `/home/user/scaffold/tmp/units/` or `/home/user/orkestrel/probe`. Claims 2 and 3 ask the checker to verify "against the writer's ledger," and that ledger was never supplied. I verified those claims directly against the diff and the current tree instead, which is possible here but is itself evidence the required ledger artifact is missing.

### Claim 1 — Ordering preserved

CONFIRMED.

- `node_modules/@orkestrel/test/dist/src/core/index.d.ts:120,372`: `TeardownHandler`'s list "runs registered handlers newest-first" / "runs once, newest first, when it is done."
- Sampled 6 converted blocks; in every one the registration order is the exact reverse of the original statement order, so newest-first execution reproduces the original order:
  - `tests/src/bin/main.test.ts:144-149` (diff lines 18-25): original `kill` then `scratch.destroy()`; registered `scratch.destroy` then `kill`; executes `kill` then `scratch.destroy` — matches.
  - `tests/src/bin/main.test.ts:346-360` (diff lines 33-59): original `output.close()`, kill+wait, `rmdirSync`; registered `rmdirSync`, kill+wait, `output.close`; executes in original order — matches.
  - `tests/src/core/errors.test.ts:282-285`: original `workspace.destroy()` then `outside.destroy()`; registered `outside` then `workspace`; executes `workspace` then `outside` — matches.
  - `tests/src/server/Probe.test.ts:213-217` (diff 210-217): original `probe.destroy()` then `scratch.destroy()`; registered `scratch` then `probe`; executes `probe` then `scratch` — matches.
  - `tests/src/server/ProbeServer.test.ts:68-71` (diff 419-430): original `removeListener` then pause/resume; registered pause/resume then `removeListener`; executes `removeListener` then pause/resume — matches.
  - `tests/src/server/stages/RuntimeStage.test.ts:1064-1066` (diff 850-858): original `rmSync(file)` then `vitest.close()`; registered `vitest.close` then `rmSync`; executes `rmSync` then `vitest.close()` — matches.

### Claim 2 — Failure semantics strengthened, swallow blocks stay byte-identical

CONFIRMED, verified directly (no ledger existed to cross-check).

- Two genuine multi-call `finally` blocks whose own teardown calls swallow failure with `.catch(() => {})` were left untouched, exactly per the rule:
  - `tests/src/server/stages/RuntimeStage.test.ts:1455-1458`: `await stage.destroy().catch(() => {}); await inspection.catch(() => {}); scratch.destroy()` — not in the diff, still hand-rolled.
  - `tests/src/server/Probe.test.ts:1481-1482`: `await (closing ?? probe.destroy()).catch(() => {}); scratch.destroy()` — not in the diff, still hand-rolled.
- Every other `.catch(() => {})` occurrence found in owned files (`Probe.test.ts:938,1458`; `RuntimeStage.test.ts:1104,1420,1446`; `TypeStage.test.ts:506`; `LintStage.test.ts:315,341,607,760`) swallows a held promise unrelated to the `finally` block's own teardown calls, so it is orthogonal to this claim and does not contradict it.
- The one sync→async `it` conversion (`tests/src/core/errors.test.ts:176-177`) is teardown-driven only, per claim 4 below.

### Claim 3 — The bound holds

BROKEN.

1. **A qualifying multi-call block was left unconverted with no valid reason and no swallow pattern**, breaking uniformity with an identically shaped block converted elsewhere in the same file:
   - Unconverted: `tests/src/server/stages/TypeStage.test.ts:330-333`:
     ```
     } finally {
         await stage.destroy()
         rmSync(candidateFile, { force: true })
     }
     ```
   - Converted (same file, same shape — `stage.destroy()` + `rmSync` of a candidate file): `tests/src/server/stages/TypeStage.test.ts:431-434`:
     ```
     const teardown = createTeardown()
     teardown.add(() => rmSync(candidateFile, { force: true }))
     teardown.add(() => stage.destroy())
     ```
   - Both blocks have two independent teardown calls with no `.catch` swallow and no documented reason for divergent treatment. Under an early throw from `stage.destroy()`, `rmSync(candidateFile, ...)` at line 332 is skipped exactly the way ruling 11 exists to fix, and this instance was not remediated.

2. **The block-bodied-arrow sub-claim is imprecise as stated.** The claim asserts block bodies exist "only where a handler's return type is not `void | Promise<void>`." Counter-example: `tests/src/bin/main.test.ts:347-349`:
   ```
   teardown.add(() => {
       try {
           rmdirSync(directory)
       } catch {}
   })
   ```
   `rmdirSync` returns `void`, so the block body here is required by the `try`/`catch` control-flow shape, not by a return-type mismatch with `TeardownHandler = () => void | Promise<void>` (`node_modules/@orkestrel/test/dist/src/core/index.d.ts:370`). The same pattern repeats at `tests/src/server/stages/RuntimeStage.test.ts:1349-1358` and `:1394-1403` (multi-statement `if (existsSync(...))` loop bodies). The bound is defensible engineering but the claim's stated "only" condition does not hold.

**Re-dispatchable instruction:** convert `tests/src/server/stages/TypeStage.test.ts:330-333` to `createTeardown` in the same registration-reversal pattern used at lines 431-434, and correct claim 3's block-bodied-arrow wording (or supply the missing evidence) to account for control-flow-driven block bodies such as `main.test.ts:347-349`.

### Claim 4 — No assertion weakened

CONFIRMED.

- The diff (`w3.diff`, all hunks) touches only imports and `finally`-block teardown statements, plus one signature change: `tests/src/core/errors.test.ts:176-177`, `it('classifies every failure path a test can drive without a resident tool', () => {` → `async () => {`. This callback contains no assertion change; it exists only because `await teardown.destroy()` requires an async body at `tests/src/core/errors.test.ts:187-190`.
- No `expect(...)` call, matcher, or fixture value was added, removed, or altered anywhere in the diff.

### Claim 5 — Scope honesty and law conformance

CONFIRMED for file scope and forbidden syntax; NOT INDEPENDENTLY VERIFIABLE for ledger completeness (no ledger supplied).

- Exactly seven `diff --git` headers, all under `tests/src/**`, none matching the off-limits list (`tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tests/setup*.ts`, `src/**`, `vite.config.ts`, guides) — `w3.diff:1,160,194,402,470,600,989`.
- No `any`, no `as` type assertion, and no `.js` relative-import extension appears in any added line of the diff (all new imports are bare package specifiers, e.g. `w3.diff:10,168,203,411,479,609,998`).

## Needs the reviewer

- Whether the missing writer's ledger (never produced, contrary to `w3-teardown-brief.md` § Output) is itself a re-dispatchable deficiency of the W3 unit, independent of the TypeStage.test.ts finding.
- Whether claim 3's block-bodied-arrow wording should be corrected in the ruling document rather than treated as a code defect, since the code's actual practice (block body wherever control flow or return type requires it) is sound even though the claim's stated condition is narrower than what the code does.

`FAIL: 3`