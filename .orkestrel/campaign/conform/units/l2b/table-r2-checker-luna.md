## Claims

1. REFUTED — `table-subj-2` is marked applied in `conform-table-report.md:18`, but `guides/table.md:173-177` omits the required third `SCHEMA` message, and `guides/table.md:1298` retains the unconditional “guard and audit refuse first” wording.

2. not held

3. CONFIRMED — Case-insensitive sweeps for `should(s|ed|ing)?\b` and the listed removed phrases returned no hits across `src/**/*.ts`, `tests/**/*.ts`, `guides/table.md`, `guides/README.md`, and `README.md`. The writer recorded the same population.

4. not held

5. CONFIRMED — `src/core/index.ts:1-10` has no export delta. Surface and method parity remain covered by `guides/table.md:21-210,1212-1348` and `tests/guides.test.ts:121-190`. No `AGENTS §` citation occurs in changed files.

6. not held

7. CONFIRMED — `git status --short` and `git diff --name-only` list only Owned paths. `git diff --check` is clean. The added-line sweep found no compatibility alias, shim, or re-export.

8. not held

9. REFUTED — The added-line residue sweep is clean, but the report marks `table-subj-2` applied while required edits remain. Its diffstat also differs from `git diff --stat`: `guides/table.md` and `Table.test.ts` are reported with stale line changes.

## Findings outside the claims

- F1 — The report’s diffstat is stale. Regenerate it from the final tree and verify the retained evidence files.

## Referrals

- Orchestrator: Did the transformed `table-subj-2` ruling intentionally remove the required edits at `guides/table.md:173-177` and `guides/table.md:1298`? The fix-round report names only `guides/table.md:226-230`.

VERDICT: FAIL 1, 9; outside the claims: F1

## Journal

left for driver

## Deviation

none; all required files were readable.