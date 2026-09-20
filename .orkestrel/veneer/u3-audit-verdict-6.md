# U3 audit round 6 — verdict, 2026-09-20

Subject: the U3 tree after brief 9 (`units/u3-report-7.md`), with the rendered diff
`units/u3-diff-6.patch.txt` and status `units/u3-status-6.txt`. Claims: `u3-audit-claims-6.md`.
Lanes, blind to each other:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0bf98-4d5f-7771-84f4-39108422f146` | `units/u3-audit-6-analyst.sh`, `units/u3-audit-6-analyst-report.md` |
| subjective | `reviewer` | native Opus 5 (the writer's engine, told so), workflow `wf_bee1becb-8a1` | `units/u3-audit-6-reviewer-brief.md`, `units/u3-audit-6-reviewer-report.md` |
| mechanical | `checker` | native Sonnet, same workflow | `units/u3-audit-6-checker-brief.md`, `units/u3-audit-6-checker-report.md` |
| gates | `verifier` | native Sonnet, same workflow | `units/u3-gate-brief.md`, `units/u3-gate-report-6.md` |

## Reconciliation

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | REFUTED (three readings are not cases; `readIdentifier` decodes a backslash inside a quoted string; the escape terminator, the normalizer, and the splitter use JavaScript whitespace where CSS excludes U+00A0) | REFUTED (the three readings are not cases) | PASS on the listed readings | refuted; carried (brief 10 items 1 to 3) |
| 2 | CONFIRMED | CONFIRMED, finding 10 (the TSDoc's absolute) | PASS | confirmed; the sentence is carried (item 5) |
| 3 | REFUTED as worded (the `$assets` change also adds an explanatory comment) | CONFIRMED | PASS | confirmed in substance; the claim's "nothing else" was the Orchestrator's overstatement, and the comment stays |
| 4, 6, 7, 8 | CONFIRMED | CONFIRMED (7 UNDECIDABLE on the digest, which the analyst read: `8dc6e2f5…`) | PASS | confirmed |
| 5 | REFUTED as worded (`` `--vn-surface-body-base` dark `` carries a mode qualifier) | CONFIRMED (the qualifier is the guide's own convention) | PASS | confirmed in substance: the qualifier is a key qualifier the guide uses in three rows, not an alias; the claim's "bare keys" was too wide |
| 9 | UNDECIDABLE | UNDECIDABLE | — | confirmed by the Orchestrator from `units/u3-gate-report-6.md`: every gate exit 0 on Chromium, `test:distribution` green, the three Edge projects green; `scaffold audit`'s one finding is the pending re-pin |

## Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| `:is()`/`:where()` alternatives are complex selectors: `:is(.title > h1)+p` and `:is(h1 p)` must read true, `:is(details p) summary` true, `:is(details) summary` false | analyst 10 | item 4 |
| `walkSelector`'s TSDoc states an absolute the module does not keep | reviewer 10 | item 5 |
| surrogate and past-range escapes have no case | reviewer 12 | item 1 |
| `readIdentifier` rebuilds the text from the steps to call `readEscape` | reviewer 11 (bound) | recorded; no change |
| a CRLF inside an escape is a preprocessing question Sass settles before the reader sees it | analyst (observation) | recorded; no change |

The seam has now opened one grammar case per round through six rounds. Brief 10 adds the last
constructs the readers must carry (quoted-text boundary, CSS whitespace, complex alternatives)
and fences the rest: a form the grammar does not carry makes the reader throw naming it, so no
further case can pass silently.

Verdict: fix round — claim 1 and the carried findings; brief 10 on `opus`.
