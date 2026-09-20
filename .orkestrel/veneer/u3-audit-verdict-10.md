# U3 audit round 10 — verdict, 2026-09-20

Subject: the U3 tree after brief 13 (`units/u3-report-11.md`, `builder` on native Sonnet), with
the rendered diff `units/u3-diff-10.patch.txt` and status `units/u3-status-10.txt`. Claims:
`u3-audit-claims-10.md`. Lanes, blind to each other, neither on the writer's engine:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0c016-96b0-7cf3-a3d3-39d67d173d44`, exit 0 | `units/u3-audit-10-analyst.sh`, `units/u3-audit-10-analyst-report.md` |
| subjective | `reviewer` | native Opus 5, workflow `wf_fff2c57b-9bd` | `units/u3-audit-10-reviewer-brief.md`, `units/u3-audit-10-reviewer-report.md` |
| mechanical | `checker` | native Sonnet, same workflow | `units/u3-audit-10-checker-brief.md`, `units/u3-audit-10-checker-report.md` |
| gates | `verifier` | native Sonnet, same workflow | `units/u3-gate-brief.md`, `units/u3-gate-report-10.md` |

## Reconciliation

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED (each assertion executed against the live reader; a planted wrong value failed) | CONFIRMED (each reading traced through the reader; placement as named) | PASS on every assertion | confirmed |
| 2 | CONFIRMED (report 11's red `1 failed, 82 passed` and green `83 passed`, equal to report 10's setup count) | CONFIRMED, with the plant's recorded site reconciled arithmetically | — | confirmed |
| 3 | CONFIRMED (reader digest `69db1f7f…` measured; only the test file's blob differs; status equal, with an added-row control failing the comparison) | CONFIRMED (six added lines, every round-9 line reference reconciles) | PASS (blob pairs, status rows, added lines all `expect(`) | confirmed |
| 4 | CONFIRMED (AST over the added lines) | CONFIRMED | PASS | confirmed |
| 5 | UNDECIDABLE (no round-10 verifier report retained when the lane read) | UNDECIDABLE (same) | — | confirmed by the Orchestrator from `units/u3-gate-report-10.md`, taken on the round-10 tree in the same workflow: format, lint, check, build exit 0; `npm test` chain exit 0; `test:distribution` 10 passed 3 skipped; Edge styles 40, src 17, setup:browser 18 passed; `0 of 48 planned paths drifted`; the audit's exit 1 is the pending `^0.0.76` re-pin and its three dependency lines are advisory; the tracked status identical before and after |

Both lanes marked claim 5 undecidable for the same reason — the verifier ran in parallel with
them, so its report was not on disk when they read — and both named the same settling evidence,
which the Orchestrator read. The reviewer's extra 6 is that bound and is closed by the same
report. The analyst's terminal line names claim 5 alone, so its fix-round verdict is the missing
retention, not a defect; with the gate report retained, no claim stands refuted.

## Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| brief 13 named the wrong `it` title for the `h1\2b` cases while its anchor line was right; report 11 recorded no deviation | reviewer extra 7 (bound) | recorded here and in `u3-audit-claims-10.md` claim 1; brief 13 stays unedited per the successor rule |
| the escaped-whitespace family is cased for space, tab, and form feed but not line feed or carriage return | reviewer extra 8 (bound, a coverage preference under `tests.md`) | none for U3; `matchesCSSWhitespace` pins the set and every reader routes through it |

## Ruling

Every claim is confirmed. U3's exit conditions from the plan hold: the parity test red on a
planted unmapped name, a removed mapped name, and a relocated declaration and green restored
(reports 2 to 4); consumer, geometry, island, cycle, and invalid-value readings green on Chromium
and Edge; `src/core` proven listener-free and DOM-free; guide parity green; the whole chain green.
Accept, and land by pathspec from `units/u3-status-10.txt`.

Verdict: accept.
