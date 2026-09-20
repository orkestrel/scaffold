# U6 audit round 4 — verdict

Round of 2026-09-20 on `u6-audit-claims-4.md` (10 claims) over the Test working tree at `f49bc7f`
plus the cumulative U6 diff (`units/u6-report-5.md`). Lanes as before: objective `reviewer` on
native Opus 5 (`units/u6-audit-4-reviewer-brief.md`, report `units/u6-audit-4-reviewer-report.md`);
subjective `analyst` on Astra (`units/u6-audit-4-analyst.sh`, report
`units/u6-audit-4-analyst-report.md`, thread `01a0be92-6cf3-7533-8e01-fb978c636539`); `verifier`
on native Sonnet (`units/u6-gate-report-4.md`, Edge run twice). No `checker`: the round changed
one `Surface` row (`MEDIA_STAGE`), which both lanes read against its TSDoc by hand, and the scope
is the verifier's status reading. Both lanes ran blind on the one claims file.

## Reconciliation

| Claim | Reviewer | Analyst | Ruling |
| --- | --- | --- | --- |
| 1 to 9 | CONFIRMED | CONFIRMED | confirmed |
| 10 | UNDECIDABLE (no round-4 verifier report in its inputs) | UNDECIDABLE | confirmed by `units/u6-gate-report-4.md`: chain green on managed Chromium; `test:src:browser` `349 passed | 2 expected fail` twice on Edge |

Both lanes accept. The design ruled in round 3 — record the first stage's readings on the tester
root and release to exactly them — holds under both lanes and the gates.

## Findings the objective lane recorded as bounds, and the ruling on them

| Finding | Ruling |
| --- | --- |
| 11 the missed-press release sits outside a `try`, so a release rejection replaces the missed-press voice | the same class the round closed at two sites; close it at the third (brief-6 § 1) |
| 12 an exhausted release keeps `MEDIA_STAGE` for a retry and no sentence says so | state it in `Bounds` beside the pointer retry sentence (brief-6 § 2) |
| 13 `releasePointer` carries no `@throws` after this round changed its failure shape | a TSDoc rule breach; add it (brief-6 § 3) |
| 14 an assertion in the rejected-press case runs before any hold and cannot fail, under a name that overclaims | tighten the case and its name to what it drives (brief-6 § 4) |
| 15 the sentinel strings carry the unit identifier `U6` | a control identifier in product source; remove it (brief-6 § 5) |

These are small and mechanical, so a native `builder` on Sonnet writes them and both lanes rule
on the result with the verifier; the user's standard for this campaign is a clean foundation, not
a recorded bound where a fix is cheap.

Ruling (round 4): accept the design and the mechanism; one hygiene round on the five findings
before the unit lands.
