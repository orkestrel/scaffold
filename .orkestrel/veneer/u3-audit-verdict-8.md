# U3 audit round 8 — verdict, 2026-09-20

Subject: the U3 tree after brief 11 (`units/u3-report-9.md`), with the rendered diff
`units/u3-diff-8.patch.txt` and status `units/u3-status-8.txt`. Claims: `u3-audit-claims-8.md`.
Lanes, blind to each other:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0bfe2-9711-7da1-9c6f-b8302292b46b` | `units/u3-audit-8-analyst.sh`, `units/u3-audit-8-analyst-report.md` |
| subjective | `reviewer` | native Opus 5 (the writer's engine, told so), workflow `wf_1419326d-db1` | `units/u3-audit-8-reviewer-brief.md`, `units/u3-audit-8-reviewer-report.md` |
| mechanical | `checker` | native Sonnet, same workflow | `units/u3-audit-8-checker-brief.md`, `units/u3-audit-8-checker-report.md` |
| gates | `verifier` | native Sonnet, same workflow | `units/u3-gate-brief.md`, `units/u3-gate-report-8.md` |

## Reconciliation

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | REFUTED (several lists on one compound are unioned where they must intersect — `h1:is(p):is(h1) + p` true, `:is(h1):where(p) + span` true; the host's incoming combinator attaches to the alternative's first compound rather than its subject — `details + :is(.x summary)` false, `details > :is(details summary)` true; `extractCompoundTags('h1:is(p)')` has no assertion) | CONFIRMED on the listed readings; finding 8 (the same union, with the TSDoc claiming the lists meet) | PASS on the listed readings | refuted: the expansion model is wrong in two independent ways, and a correct model is a tree of chains with per-list intersection; see § Ruling |
| 2, 6 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 3 | REFUTED (the alternatives reading has no direct assertion) | CONFIRMED, referral R3 (the same gap) | PASS | refuted on the one assertion; moot after § Ruling |
| 4 | REFUTED (the reader list omits `extractBareTag`) | REFUTED (the same) | PASS | refuted; carried (brief 12 item 3) |
| 5 | REFUTED as worded (`merge*`, `drop*`, `expand*` carry no prefix row and rest on the `{verb}{Noun}` default, which permits them) | CONFIRMED except the digest | PASS | confirmed in substance; the claim's "named by the prefix table" was the Orchestrator's overstatement; the digest is the analyst's reading `8dc6e2f5…` |
| 7 | REFUTED as worded (the audit also prints advisory dependency notices) | UNDECIDABLE | — | confirmed by the Orchestrator from `units/u3-gate-report-8.md`: every gate exit 0 on Chromium, `test:distribution` green, the three Edge projects green, no planned path drifted; the audit's exit 1 is the pending re-pin, and its dependency lines are advisory notices scaffold classifies as questions |

## Ruling: the functional lists leave the grammar

The selector guard exists to refuse, in Veneer's own authored elements layer, a rule that joins
two bare tags the HTML content model does not mandate. Rounds 4 through 8 spent seven briefs on
the grammar inside `:is()` and `:where()` — lists, nesting, attribute strings, escapes, quoted
parentheses, subjects, expansion, intersection, combinator attachment — and the objective lane
found a new misread each round, because an alternative is a full complex selector and a guard
that reads it must model a tree. The shipped cascade writes no functional list, and an
elements-layer partial can always write its selectors flat. The stricter guard is also the
simpler one: `:is()` and `:where()` join the fence as unread forms, the expansion readers and
their cases go, and every construct the grammar keeps (strings, escapes, groups, identifiers,
combinators, comma lists, the mandated pairs, the drop of a compound naming no tag) stays with
its readings intact. This is the "rip it out rather than patch it" the user asked for.

## Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| `:is()`/`:where()` read wrong in two independent ways | analyst claim 1, reviewer 8 | item 1: refused as unread forms; the expansion readers deleted |
| the reader list omits `extractBareTag` | both lanes | item 3 (the list is rewritten for the readers that remain) |
| three TSDoc blocks run past 100 columns, which `oxfmt` does not see | reviewer 9 | item 4 |
| "so a form the grammar does not carry cannot pass as a permitted selector" | reviewer 11 | item 4 |
| `extractSelectorCompounds` without a production consumer | reviewer 10 (bound) | resolved by item 1: `matchesLooseTagPair` reads it again |
| "tagless" alternates with "naming no tag" | reviewer 12 (observation) | item 4 |
| the claim's `of`-clause wording and the audit's advisory notices | analyst 5, 7 | the Orchestrator's claims, corrected in round 9 |

Verdict: fix round — claims 1, 3, 4 and the carried findings; brief 12 on `opus`.
