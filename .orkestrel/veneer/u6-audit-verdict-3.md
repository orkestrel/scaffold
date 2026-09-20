# U6 audit round 3 — verdict

Round of 2026-09-20 on `u6-audit-claims-3.md` (10 claims) over the Test working tree at `f49bc7f`
plus the cumulative U6 diff (`units/u6-report-4.md`). Lanes as in round 2: objective `reviewer` on
native Opus 5 (`units/u6-audit-3-reviewer-report.md`); subjective `analyst` on Astra
(`units/u6-audit-3-analyst-report.md`, journal `units/u6-audit-3-analyst.sh`, thread
`01a0be7a-2791-7400-b942-57136dc3af6c`); `verifier` on native Sonnet (`units/u6-gate-report-3.md`,
Edge run twice). No `checker`: the fix changed no `Surface` row and no name; parity and scope are
covered by the objective lane's claims 7 and 9 and the verifier's status readings. Both lanes ran
blind on the one claims file.

## Reconciliation

| Claim | Reviewer | Analyst | Ruling |
| --- | --- | --- | --- |
| 1, 2, 4, 5, 6, 7, 9 | CONFIRMED | CONFIRMED | confirmed |
| 3 | CONFIRMED on facts; the fixture is coupled to the read count, and the double read is a defect | CONFIRMED as hostile input | the reviewer's reading wins: reading an option more than once is a defect in the helper, and a fixture pinned to that read count is pinned to an implementation detail; both go |
| 8 | REFUTED (streak seeded from the pre-reset sample; only `print` compared to a value) | REFUTED (same counterexample; and the budget is checked between polls, so `waitForFrame` is unbounded) | refuted; the mechanism, not its parameters, is the defect |
| 10 | UNDECIDABLE | UNDECIDABLE | confirmed by `units/u6-gate-report-3.md`: chain green on Chromium, `test:src:browser` `347 passed | 2 expected fail` twice on Edge |

Both lanes independently found the settle defect (reviewer 13, analyst claim 8) and the stale
marker remark (reviewer 14, analyst 11).

## Ruling on the settle

Three rounds have found holes in "send the reset and wait for the readings to stabilise", and
each fix has moved the hole rather than closed it, because the mechanism has no knowable target:
the helper cannot know the engine's own values while an override is in place. The layer's own
idiom gives one. `stageMedia` records, on the tester root, the four readings it observed before
its first stage (`MEDIA_STAGE`, mirroring `POINTER_HOLD` and `CAPTURE_PANE`); `releaseMedia`
re-sends those readings as explicit emulation and waits for exactly them, then removes the marker.
The target is knowable, the wait is discriminating, and a provider-configured override survives
as the same reading rather than being cleared. With no marker, `releaseMedia` sends the empty
reset and waits for a stable reading taken strictly after the reset, documented as stable rather
than proved cleared. Successor brief 5 carries it.

## Findings carried into the fix brief (`units/u6-brief-5.md`)

| Finding | Source | Carrier |
| --- | --- | --- |
| the settle mechanism | reviewer 13, analyst claim 8 | brief-5 § 1 |
| the budget is checked between polls; `waitForFrame` is unbounded | analyst claim 8 | brief-5 § 1 (documented) |
| options read more than once; the accessor fixture | reviewer 11, 19, claim 3 | brief-5 § 2 |
| the restore path can throw over the refusal; two budgets | reviewer 12, 18 | brief-5 § 3 |
| a rejected press leaks the marker | reviewer 15 | brief-5 § 4 |
| the marker remark | reviewer 14, analyst 11 | brief-5 § 4 |
| the park can mask a release rejection; the restore pins readings | reviewer 16, 17 | brief-5 § 5 (bounds) |

## Dropped, on the record

Nothing.

Ruling (round 3): fix round.
