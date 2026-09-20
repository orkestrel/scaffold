# U3 audit round 4 — verdict, 2026-09-20

Subject: the U3 tree after brief 7 (`units/u3-report-5.md`), with the rendered diff
`units/u3-diff-4.patch.txt` and status `units/u3-status-4.txt` supplied to every lane. Claims:
`u3-audit-claims-4.md`. Lanes, blind to each other:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0bf63-32fa-7f63-9179-822027a235b8` | `units/u3-audit-4-analyst.sh`, `units/u3-audit-4-analyst-report.md` |
| subjective | `reviewer` | native Opus 5 (the writer's engine, told so), workflow `wf_3cc0e438-4e0` | `units/u3-audit-4-reviewer-brief.md`, `units/u3-audit-4-reviewer-report.md` |
| mechanical | `checker` | native Sonnet, same workflow | `units/u3-audit-4-checker-brief.md`, `units/u3-audit-4-checker-report.md` |
| gates | `verifier` | native Sonnet, same workflow | `units/u3-gate-brief.md`, `units/u3-gate-report-4.md` |

## Reconciliation

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | REFUTED (executed: `:is(.title[title="("], h1)+p` false, `h1[title="("], p` true; `splitTopLevelList` counts a quoted parenthesis as nesting) | CONFIRMED on the listed inputs | PASS on the listed inputs | refuted: the listed readings hold and the list splitter ignores quotation; carried (brief 8 item 1) |
| 2 | REFUTED (executed: `h1\+p` becomes `h1\ + p`; an escaped `+` outside quotation is read as a combinator) | CONFIRMED on the listed inputs | — | refuted on the escape; carried (item 1) |
| 3 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 4 | REFUTED as worded (the include population: `role-each` and `reduced-motion` each have one partial include and one fixture include; the evidence justifies no deletion) | REFUTED (the same counting fault; finding 17 asks for a ruling on `role-each`) | — | the asset arms are confirmed; the claim's wording was the Orchestrator's error; ruling on `role-each`: retained, because the fixture's include is the isolated paint proof of the tier math, which `theme-assets` never had, and the reason is recorded in the file (item 3) |
| 5, 6, 7, 8 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 9 | CONFIRMED (structural law) | REFUTED (five reference-map tables sit bare under their headings, `writing.md` § Structure) | — | refuted on the guide's structure; carried (item 2) |
| 10 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 11 | UNDECIDABLE | UNDECIDABLE | — | confirmed by the Orchestrator from `units/u3-gate-report-4.md`: every gate exit 0 on Chromium, `test:distribution` green, the three Edge projects green; `scaffold audit`'s one finding is Veneer's pending re-pin (`^0.0.75` against the registry's `0.0.76`), which closes with the re-pin after U3 lands |

Both lanes were handed stale instructions naming claims the file does not carry (the analyst's
prompt and the reviewer's brief were derived from round 3's by substitution). Both ruled the
claims file as the one authority, which is right. From round 5 every lane brief and the analyst
prompt are written fresh against the claims file.

## Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| five tables under `#### Text and surface`, `#### Links`, `#### Type`, `#### Space, border, radius, and elevation`, `#### Motion, focus, validation, breakpoints, and stacking` lack an introductory sentence | reviewer 16 | item 2 |
| `role-each` ruling | reviewer 17, analyst 4 | item 3 (retained with the recorded reason) |
| `tests/setupConformance.ts` header says the module is loaded by the `conformance` project alone | reviewer 18 | item 4 |
| the `interpolate-size` paragraph sits inside the token reference | reviewer 19 | item 5 |
| the `@each` over `tokens.$assets` emits an empty declaration for a key `$dark` lacks | reviewer 21 (referral) | item 6 |
| the grab-bag heading | reviewer 20 (bound) | recorded for the next § Tokens editor; no change |

Verdict: fix round — claims 1, 2, 9 and the carried findings; brief 8 on `opus`.
