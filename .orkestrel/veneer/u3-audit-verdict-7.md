# U3 audit round 7 — verdict, 2026-09-20

Subject: the U3 tree after brief 10 (`units/u3-report-8.md`), with the rendered diff
`units/u3-diff-7.patch.txt` and status `units/u3-status-7.txt`. Claims: `u3-audit-claims-7.md`.
Lanes, blind to each other:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0bfba-e59c-7ec0-9857-110963aaff43` | `units/u3-audit-7-analyst.sh`, `units/u3-audit-7-analyst-report.md` |
| subjective | `reviewer` | native Opus 5 (the writer's engine, told so), workflow `wf_90bd8f6f-e04` | `units/u3-audit-7-reviewer-brief.md`, `units/u3-audit-7-reviewer-report.md` |
| mechanical | `checker` | native Sonnet, same workflow | `units/u3-audit-7-checker-brief.md`, `units/u3-audit-7-checker-report.md` |
| gates | `verifier` | native Sonnet, same workflow | `units/u3-gate-brief.md`, `units/u3-gate-report-7.md` |

## Reconciliation

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1, 2, 3, 5, 8 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 4 | REFUTED (the parenthetical: `h1 .x p` reads true because a tagless compound is skipped, as the TSDoc states; the listed readings hold) | REFUTED as worded; finding 10 (`:is(h1 .x) p` false against `h1 .x p` true contradicts the guard's own contract) and 11 (the middle drop has no case) | PASS on the listed readings | refuted: the claim's parenthetical was the Orchestrator's error, and the inconsistency it hid is real — an alternative must read as the selector it stands for; carried (brief 11 item 1) |
| 6 | REFUTED (executed: an escaped or punctuation-bounded `of` — `\6f f`, `o\66`, `of.x`, `of[x]`, `of:is(.x)`, `OF.x` — passes the fence) | CONFIRMED on the listed forms | PASS on the listed forms | refuted; carried (item 2) |
| 7 | REFUTED ("A reader wanting an identifier" gives software a faculty) | CONFIRMED except the digest; finding 13 (a double negative) | PASS | refuted on two sentences; carried (item 4); the digest is the analyst's reading, `8dc6e2f5…` |
| 9 | UNDECIDABLE | UNDECIDABLE | UNRESOLVED | confirmed by the Orchestrator from `units/u3-gate-report-7.md`: every gate exit 0 on Chromium, `test:distribution` green, the three Edge projects green; `scaffold audit`'s one finding is the pending re-pin |

## Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| an `:is()`/`:where()` alternative reads by its subject alone, so `:is(h1 .x) p` and `h1 .x p` disagree | analyst claim 4, reviewer 10 | item 1: read `X:is(A, B) Y` as the list `X·A Y, X·B Y` |
| the documented middle drop has no case | reviewer 11 | item 1 |
| the list trim strips an escaped trailing whitespace (`h1\ ,p` loses the escaped space; `details summary\ ` reads as the mandated pair) | analyst 10 | item 3 |
| the exception sentence names the pattern but not `normalizeSelectorText`, which collapses the scope selector before the match | reviewer 12 (bound) | item 4 |
| "so a form one reader must not misread cannot be misread by one reader alone" | reviewer 13 (bound) | item 4 |
| `readIdentifier` rebuilds text from the steps | reviewer 14 (bound) | recorded; no change |

Verdict: fix round — claims 4, 6, 7 and the carried findings; brief 11 on `opus`.
