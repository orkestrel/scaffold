# cr audit, checker lane (`checker` on Sonnet) — verdict

Brief: `units/cr-audit-checker-brief.md`. Claims: `units/cr-audit-claims.md`. Assigned claims 1, 3, 6.

**Claim 1 — Delta and scope: CONFIRMED**
- `cr-status.txt` (lines 1–3) lists exactly `tests/app/browser/integration.test.ts`, `tests/setup.test.ts`, `tests/setup.ts` — the same three files `cr.diff` touches (diff headers at lines 1, 122, 293).
- No other path appears in status or diff, so `src/**`, `app/**`, every other `tests/**` file, and the vendored policy files are untouched.

**Claim 3 — The population: UNRESOLVED**
Independently reproduced parts hold: the retired-name grep over `/home/user/veneer-cr/tests` and `/home/user/veneer-cr/app` returns nothing (matches `close-registry-report.md:46`); `grep -n '_KEYS: readonly Capture' tests/setup.ts` returns exactly `318:SHOWCASE_KEYS`, `1087:DRIVEN_KEYS`, `1123:CAPTURE_KEYS` (matches `cr-audit-claims.md:7` and the report's brief-fault note at `close-registry-report.md:45,141`). Not independently verifiable here: the recomputation of the sorted `CAPTURE_SCENARIOS` reading needs a shell this role lacks; the before/after SHA-256 match (`close-registry-report.md:62–67`) rests on the writer's report. Referred to a lane holding a shell.

**Claim 6 — Law and report: BROKEN**
- No `any`, `as`, `!`, suppression comment, mock, or nested function beyond a directly-passed callback in the diff (the filter blocks at `cr.diff:47–49, 101–103` and the driven-row predicate around diff line 230 are arrow-function arguments passed directly).
- No banned substitution-table term in the added prose and no stated count of a growable set.
- No helper introduced duplicates an installed `@orkestrel/test` export; the additions (`declared`, `keys`, `exempt`) are local `const` bindings.
- Violation: `.claude/rules/writing.md` § Code tokens requires a noun after a code token. `tests/setup.test.ts` (worktree, the new comment around line 227) reads `` `rest` is the resting table's own state `` — the token `rest` is followed by the verb `is`. This is new prose introduced by the diff.

Outside the three assigned claims: no additional findings.

VERDICT: FAIL 3,6; outside the claims: none
