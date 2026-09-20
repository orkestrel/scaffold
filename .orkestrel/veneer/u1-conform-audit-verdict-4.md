# U1-conform audit round 4 — verdict, 2026-09-20

Subject: the U1-conform tree on Veneer `d8b0e65` after brief 5 (`units/u1-conform-report-5.md`,
`builder` on native Sonnet), rendered as `units/u1-conform-diff-4.patch.txt` and
`units/u1-conform-status-4.txt`. Brief 5 carried four verbatim prose edits and no behaviour, so
this round ran the mechanical lane and the gates only, as `u1-conform-audit-verdict-3.md` ruled
and for the reason it states; the objective and subjective lanes were not run.

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| mechanical | `checker` | native Sonnet, workflow `wf_d2fd9a8e-665` | `units/u1-conform-audit-4-checker-brief.md`, `units/u1-conform-audit-4-checker-report.md` |
| gates | `verifier` | native Sonnet, same workflow | `units/u1-conform-gate-brief-4.md`, `units/u1-conform-gate-report-4.md` |

## Reconciliation

| Check | Checker | Ruling |
| --- | --- | --- |
| the parse-option sentence | FAIL on one line: the sentence is placed and worded as brief 5 states and `@returns` no longer carries it, but the `@returns` tag's second line (`tests/setupConformance.ts:121`) is 101 columns | the sentence confirmed; the line is brief 2's, untouched by brief 5, and is one column over the width every U3 and U1-conform brief held TSDoc to; carried (brief 6) |
| the thrown text | PASS | confirmed |
| the case title | PASS | confirmed |
| the diff's population | PASS (four blob pairs, status equal, every changed line a named text) | confirmed |
| gates | — | confirmed by the Orchestrator from `units/u1-conform-gate-report-4.md`: format, lint, check, build, the whole `npm test` chain, `test:distribution` (11 passed, 3 skipped), Edge `test:src` 17, `test:app` 3, `test:src:styles` 40, `test:setup:browser` 19, all exit 0; audit exit 0 with the `setup` question and the three advisory lines; status identical before and after |

The Orchestrator's own sweep over every file the unit touched finds one other line past 100
columns, `tests/setupConformance.test.ts:126`, a string literal inside a case that the formatter
leaves whole; code lines are the formatter's, and it passes `format:check`, so it stands.

Verdict: fix round — one TSDoc rewrap; brief 6 on `builder`, checked by `checker` and the gates.
