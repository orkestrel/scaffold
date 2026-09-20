# U3 audit round 3 — verdict, 2026-09-20

Subject: the U3 tree after brief 6 (`units/u3-report-4.md`). Claims: `u3-audit-claims-3.md`.
Lanes, blind to each other, on that one file:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0bf45-a4bc-7d91-9cfa-876cbcef5558` | `units/u3-audit-3-analyst.sh`, `units/u3-audit-3-analyst-report.md` |
| subjective | `reviewer` | native Opus 5 (the writer's engine, told so), workflow `wf_b7b7da53-4b4` | `units/u3-audit-3-reviewer-brief.md`, `units/u3-audit-3-reviewer-report.md` |
| mechanical | `checker` | native Sonnet, same workflow | `units/u3-audit-3-checker-brief.md`, `units/u3-audit-3-checker-report.md` |
| gates | `verifier` | native Sonnet, same workflow | `units/u3-gate-brief.md`, `units/u3-gate-report-3.md` |

## Reconciliation

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1, 2, 3, 4, 6, 8, 9, 11, 12, 13 | CONFIRMED | CONFIRMED | PASS where checked | confirmed (8's "byte-identical" arm rests on the writer's retained diff and the analyst's own snapshot comparison, which agree) |
| 5 | REFUTED as located | CONFIRMED (site moved) | — | confirmed in substance: the instruction travelled with the string it governs to `tests/setupStyles.ts`; the claim's site was stale |
| 7 | REFUTED (executed: `:is(h1,:where(.title))+p` false, `[title=':is(h1)'] + p` true, an escaped quote closes the splitter's quotation) | CONFIRMED, referral 19 (`:is(h1:not(.x), p) + p` reads false) | PASS on the four named readings | refuted: the named readings hold and the readers still misread nested functional lists, attribute strings, and escaped quotes; carried (brief 7 item 1) |
| 10 | REFUTED ("both selectors" `tests/setupStyles.ts:333`, "both surfaces" `tests/src/styles/fixtures/mixins.scss:24`) | CONFIRMED | — | refuted: the named phrases are gone and two unnamed tallies remain; carried (item 3) |
| 14 | REFUTED (claim 10's hits; finding 17's false TSDoc) | CONFIRMED over the live files | scope half UNRESOLVED (no shell; the gate report was not yet retained) | refuted on those two counts; the scope half is settled from the verifier's readings: the tracked and untracked lists equal the reports' |
| 15 | UNDECIDABLE | UNDECIDABLE | — | confirmed by the Orchestrator from `units/u3-gate-report-3.md`: every step exit 0, `test:distribution` 10 passed, the three Edge projects green, `scaffold audit` no drift |

## Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| `theme-assets` has one caller; `styles.md` keeps a one-partial pattern inline | analyst 16 | item 4 |
| `normalizeComplexSelector` collapses whitespace inside quotes and parentheses against its TSDoc | analyst 17 | item 2 |
| the guide fence and the executed recipe are coupled by a comment alone; the negative claim "otherwise keeps painting the old brand" runs nowhere | reviewer 16 (bound) | item 5 |
| the member-shape rule says "color" where the registry applies it to values (`--vn-radius-base`, `--vn-stack-*-base`) | reviewer 17 (bound) | item 6 |
| `derived` mislabels the factors' literal `1` | reviewer 18 (bound) | item 7 |
| the Bootstrap cascade read is repeated at case scope; a Node-only setup module is its home | reviewer 21 (referral), report 4 D1 | item 8 |
| read-only lanes were assigned a `git diff` reading with no rendered diff supplied | reviewer 20 (dispatch defect) | the Orchestrator renders `tmp/audit/u3-diff-<n>.patch` and the status output into the claims file from round 4 on |

Verdict: fix round — claims 7, 10, 14 and the carried findings; brief 7 on `opus`.
