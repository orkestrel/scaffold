# U3 audit round 5 — verdict, 2026-09-20

Subject: the U3 tree after brief 8 (`units/u3-report-6.md`), with the rendered diff
`units/u3-diff-5.patch.txt` and status `units/u3-status-5.txt`. Claims: `u3-audit-claims-5.md`,
the one authority every lane was pointed at. Lanes, blind to each other:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0bf7e-0a20-7e51-a5ef-3fbb11afe3ce` | `units/u3-audit-5-analyst.sh`, `units/u3-audit-5-analyst-report.md` |
| subjective | `reviewer` | native Opus 5 (the writer's engine, told so), workflow `wf_f78ddd29-cac` | `units/u3-audit-5-reviewer-brief.md`, `units/u3-audit-5-reviewer-report.md` |
| mechanical | `checker` | native Sonnet, same workflow | `units/u3-audit-5-checker-brief.md`, `units/u3-audit-5-checker-report.md` |
| gates | `verifier` | native Sonnet, same workflow | `units/u3-gate-brief.md`, `units/u3-gate-report-5.md` |

## Reconciliation

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | REFUTED (the functional-name check `/:(?:is\|where)$/` reads text outside the walker; every listed reading and every attack on strings, escapes, and groups held) | CONFIRMED with the same deviation noted | PASS | refuted on the letter, and the analyst's finding 10 shows the same site matters: the name check is case-sensitive (`:IS(h1)` unrecognized) and the leading-identifier match stops at `-` and at an escape, so `details-card summary` reads as the mandated pair; carried (brief 9 items 1 and 2) |
| 2 | CONFIRMED | REFUTED (the `Source` legend table follows a paragraph that names no table) | PASS | refuted on that one table; carried (item 4) |
| 3, 4, 5, 8 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 6 | CONFIRMED (the guard fired in memory on a planted key; the built cascade's SHA-256 `8dc6e2f5…` equals the pre-brief-8 build) | CONFIRMED by construction, referral R1 | — | confirmed; R1 answered by the analyst's byte comparison |
| 7 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 9 | UNDECIDABLE | UNDECIDABLE | — | confirmed by the Orchestrator from `units/u3-gate-report-5.md`: every gate exit 0 on Chromium, `test:distribution` green, the three Edge projects green; `scaffold audit`'s one finding is the pending re-pin |

## Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| identifier recognition: `details-card` reads as `details`, `detai\ls` as `detai`, `:IS(h1)` unrecognized; the elements-layer pair rule at `tests/src/styles/index.test.ts` inherits each misread | analyst 10 | item 1 |
| the asset guard's settling plant is not a test | analyst 11 | item 3 |
| Departures cells `` `--vn-size-2`, through … `` read as truncated sentences | reviewer 10 (bound) | item 5 |
| "the disclosure or drawer unit" leaves an either/or in a published guide | reviewer 12 (bound) | item 6 |
| § Showcase's second paragraph carries published-surface facts under the showcase heading | reviewer 11 (bound) | U-styles-guide: the `## Styles` section is that paragraph's home |

Verdict: fix round — claims 1 and 2 with the carried findings; brief 9 on `opus`.
