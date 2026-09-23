# cm audit, checker lane (`checker` on Sonnet) — verdict

Brief: `units/cm-audit-checker-brief.md`. Claims: `units/cm-audit-claims.md`. Assigned claims 1, 3, 4, 6.

Claim 1 (Delta and scope) — CONFIRMED. `cm.diff` touches exactly the files `cm-status.txt` lists: `tests/setupStyles.test.ts`, `tests/setupStyles.ts`, and the nine component proofs (form-check, form-control, form-floating, form-range, form-select, icon-link, pagination, progress, spinner) — `cm-status.txt:1-11` against each `diff --git` header of `cm.diff:1-474`. No off-limits path appears in either file.

Claim 3 (The routing) — CONFIRMED. Reran the claim's greps in `/home/user/veneer-cm`: `prefers-reduced-motion: reduce` under `tests/src` → no matches; in `tests/setupStyles.ts` → only the declaration at `tests/setupStyles.ts:1127`; `const MOTION` under `tests/src` → no matches; every former site reads `REDUCED_MOTION`. Retained literal occurrences are fixture: `tests/setupServer.ts:1401-1402`, `tests/setupServer.test.ts:2044-2100`, `tests/setupStyles.test.ts:493,496,538,1870,1876`, and `tests/fixtures/oracle/inventory.json` — matching the report's classification.

Claim 4 (The split) — CONFIRMED, with one grep-methodology gap. `selectorText.*split\(` over `tests/src` returns only `button-group.test.ts:311`; neither the floating nor the pagination proof contains a `selectorText.split(` site; both call `splitTopLevelList(rule.selectorText)` (`form-floating.test.ts:69,311,503,524`; `pagination.test.ts:56`). `button-group.test.ts` sits outside the brief's Owned scope. Gap: the report's single-line grep misses a second split in that off-limits file at `button-group.test.ts:396-398` (a multi-line chain); both sites are out of scope, so the ruling stands, and the file's sites are named for the carrier.

Claim 6 (Law, gates, and report) — CONFIRMED. No `any`, `as <Type>`, non-null `!`, suppression, mock, or nested function declaration in `cm.diff`; `splitTopLevelList` is an existing export (`tests/setupStyles.ts:469`) reused, not duplicated; no banned term in the report; every code token in the diff's new prose is followed by a noun; the report records command and result line for each criterion (`close-motion-report.md:153-160`), the greps (`:44-94`), and the red-then-green mutation run (`:112-148`).

No findings outside the assigned claims.

VERDICT: PASS
