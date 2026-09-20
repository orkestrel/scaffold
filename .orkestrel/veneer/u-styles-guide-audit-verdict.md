# U-styles-guide audit — verdict, 2026-09-20

Subject: the U-styles-guide tree on Veneer `fbbda43` (`units/u-styles-guide-report.md`, `opus`),
rendered as `units/u-styles-guide-diff.patch.txt` and `units/u-styles-guide-status.txt`. Claims:
`u-styles-guide-audit-claims.md`. Lanes, blind to each other:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0c093-1773-76d3-9e7e-291f95f5d077`, exit 0 | `units/u-styles-guide-audit-analyst.sh`, `units/u-styles-guide-audit-analyst-report.md` |
| subjective | `reviewer` | native Opus 5 (the writer's engine, told so), workflow `wf_550b90dc-9f6` | `units/u-styles-guide-audit-reviewer-brief.md`, `units/u-styles-guide-audit-reviewer-report.md` |
| mechanical | `checker` | native Sonnet, same workflow | `units/u-styles-guide-audit-checker-brief.md`, `units/u-styles-guide-audit-checker-report.md` |
| gates | `verifier` | native Sonnet, same workflow | `units/u-styles-guide-gate-brief.md`, `units/u-styles-guide-gate-report.md` |

## Reconciliation

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 2 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 3 | REFUTED: "every case under `tests/src/styles/` reads the rules the browser resolved from that file" — the mixin proofs compile a fixture partial and the token proofs drive written declarations | REFUTED (the same, with the built RTL file the token proof reads) | PASS (the table and chains) | the table confirmed; the closing sentence refuted; carried (brief 2) |
| 4 | REFUTED: departure 3 attributes the `src/core` boundary to the root, where `configs/src/vite.core.config.ts` plants it; departure 5's coverage sentence overstates | REFUTED (the same attribution; the writer's own reading table had it right) | PASS (every mechanical fact) | the facts confirmed; two sentences refuted; carried (brief 2) |
| 5 | CONFIRMED | CONFIRMED (the manifest keys on `## By concept` alone) | — | confirmed |
| 6 | REFUTED: bare code tokens at lines 114, 128, 140 and the count "one standalone stylesheet" | CONFIRMED on links, `rtl`, the fence, and the substitution rows | PASS except the README links | refuted on the tokens and the count; the checker's README FAIL reads my checker brief's error — the README paragraph's relative links to `src/styles`, `tests/guides.test.ts`, and `tests/src/styles` predate the unit and are the link check's own targets; carried (brief 2) |
| 7 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 8 | UNDECIDABLE | UNDECIDABLE | — | confirmed by the Orchestrator from `units/u-styles-guide-gate-report.md`: format, `test:guides` 18, `test:policy` 109, build, the whole `npm test` chain exit 0; audit exit 0 with the `setup` question and the three advisory lines; status identical before and after |

## Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| the proof-subject sentence overstates | analyst 3, reviewer 10 | brief 2 item 3 |
| the core boundary attribution | analyst 4, reviewer 9 | brief 2 item 4 |
| departure 5's coverage sentence | analyst 4 | brief 2 item 5 |
| bare code tokens and the count | analyst 6 | brief 2 items 1 and 2 |
| "one standalone stylesheet" while a second built file ships unnamed | reviewer 11 (bound) | brief 2 item 1 (the sentence names the subpath, not a count) |
| the replaced-field list omits `build.rolldownOptions` | reviewer 12 (bound) | brief 2 item 6 |
| the workspace rows are keyed by path and alias, not `src:styles` | reviewer 13 (bound) | brief 2 item 7 |
| the departures are numbered without order or rank | reviewer 14 (bound) | brief 2 item 8 |
| whether the RTL artifact ought to be built and published | reviewer referral | outside the campaign by the user's ruling; recorded, not carried |

Verdict: fix round — claims 3, 4, and 6, with the reviewer's bounds 11 to 14; brief 2 on `opus`,
audited by the `analyst` on Astra (objective, every rewritten sentence against the tree), the
`checker`, and the gates; the subjective lane is not run again for prose its own lane specified,
recorded here with that reason.
