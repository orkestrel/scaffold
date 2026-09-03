1. REFUTED — `guides/workflow.md:105` still contains banned `now inserted`, so `workflow-subj-2` is not fully applied. Replace it with `inserted before`.

2. not held

3. REFUTED — The case-insensitive old-name sweep over the required paths finds `taskStatus`, `phaseStatus`, and `workflowStatus` at `tests/src/core/helpers.test.ts:206-210`. Rename these locals and rerun both sweeps.

4. not held

5. CONFIRMED — Renamed and added symbols have current guide rows at `guides/workflow.md:125`, `:353-354`, `:383`, and `:407`; method tables align with interfaces, guide fences use published specifiers, and the exact `AGENTS §` sweep is empty.

6. not held

7. CONFIRMED — Off-limits path sweeps over `conform-workflow.status` and `conform-workflow.diff` are empty. No compatibility alias or shim was added; the intentional barrel addition is `src/core/index.ts:20`.

8. not held

9. CONFIRMED — Diff-addition sweeps find no TODO, debug residue, commented-out executable code, skipped-only test, or deferred-row marker. The disposition table matches the paths in `conform-workflow.diff`.

Findings outside the claims

- F1 — `tests/src/core/RunHolder.test.ts:41` defines a nested `readActive` arrow. Delete it and replace its calls with direct `holder.runner` assertions.

Referrals

- Orchestrator: Route F1 to a follow-up unit using the exact prescription above.

VERDICT: FAIL 1, 3

Journal

Leave for the driver.

Deviation

None. No file was unreadable, and containment observed no tree change.