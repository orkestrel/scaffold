# U1 fix round audit — verdict (round 2)

Round 2 of 2026-09-20 on `u1-fix-audit-claims.md`, subject Veneer `690bbb4` (fix diff
`ae0221d..690bbb4`, tree clean), the fix written by `builder` (native Sonnet) from
`units/u1-fix-brief.md` and `units/u1-fix-brief-2.md`.

| Lane | Role and engine | Journal | Terminal line |
| --- | --- | --- | --- |
| objective | `reviewer`, native Opus 5 | `units/u1-fix-audit-reviewer-report.md` | `Verdict: fix round — findings N1 and N2, with N3 to be ruled by the Orchestrator, and claims 11, 12, and 13 unsettleable without the verifier and the one git read` |
| subjective | `analyst` on Astra, `codex exec --sandbox read-only`, thread `01a0bdf3-5171-7971-b752-81595572b044` | `units/u1-fix-audit-analyst.sh`; `units/u1-fix-audit-analyst-report.md` | `Verdict: fix round — claims 5 and 12 are refuted; claims 8, 9, 11, and 13 remain undecidable; extra findings 14–16 require fixes` |
| checker | native Sonnet | `units/u1-fix-audit-checker-report.md` | clean (every checked claim confirmed) |
| verifier | native Sonnet, U1-gate round 2 | `units/u1-gate-report-2.md` | every gate green on managed Chromium, `test:distribution` included (`10 passed | 3 skipped`); browser projects green on Edge; tree clean |

## Reconciliation

| Claim | Ruling | Basis |
| --- | --- | --- |
| 1, 2, 3, 4, 6, 7, 10 | CONFIRMED | both lanes with sites |
| 5 | REFUTED | the subjective lane: the guard misses a four-value shorthand with differing inline edges (`margin:0 1px 0 2px`); the objective lane confirmed the guard for longhands |
| 8, 9, 11, 13 | CONFIRMED by the verifier | round-2 U1-gate reproduced every reading green on `690bbb4`, the two distribution cases passing on the host |
| 12 | CONFIRMED by the Orchestrator's read | `git stash list` empty; the reflog's `reset: moving to HEAD` entries at 04:21 and 04:25 precede the 04:33 fix commit and are the first run's stash and pop (a permission-floor breach the run reported itself); the successor made no git write |

Round-1 findings F1 to F6: closed (objective lane, per site).

## Findings carried into successor 3 (`units/u1-fix-brief-3.md`)

| Finding | Source | Carrier |
| --- | --- | --- |
| guard misses asymmetric shorthands; pattern as a module constant in the test | claim 5, analyst 15 | fix 1: an exported, fixture-proved `readPhysicalDeclaration` in `tests/setupStyles.ts` |
| digest equalities duplicated in the setup proof; count in the case name | reviewer N3 and N2, analyst 16 | fix 2 |
| nested function assignment in a test callback | analyst 14 | fix 3 |
| per-step green counts in the fix report were end-state readings | reviewer N1 | fix 4 (a `## Correction` in the report) |
| a plant asked for in a file the brief also forbade | reviewer's dispatch-defect referral | fix 1 needs no plant; the Orchestrator's error, corrected in brief 3 |

Dropped, on the record: none.

## Ruling (round 2)

Fix round 3 on `builder` from `units/u1-fix-brief-3.md`, landed as `a0447d2`; round 3 ran both
lanes, the checker, and the verifier because the successor introduced a mechanism (an exported
predicate in the styles setup module).

# Round 3

Subject Veneer `a0447d2` (successor-3 diff `690bbb4..a0447d2`, tree clean).

| Lane | Role and engine | Journal | Terminal line |
| --- | --- | --- | --- |
| objective | `reviewer`, native Opus 5 | `units/u1-fix-3-audit-reviewer-report.md` | `Verdict: fix round — N4 forces it, with N5, N6, and N7 carried into the same successor` |
| subjective | `analyst` on Astra, thread `01a0bdff-84be-7190-a1a1-9d0bc4294bda` | `units/u1-fix-3-audit-analyst.sh`; `units/u1-fix-3-audit-analyst-report.md` | `Verdict: fix round — the RTL guard still misses required asymmetric shorthands, finding 15 remains open, and findings 18–20 require correction` |
| checker | native Sonnet | `units/u1-fix-3-audit-checker-report.md` | `Checker: clean` |
| verifier | native Sonnet, U1-gate round 3 | `units/u1-gate-report-3.md` | every gate green on managed Chromium, `test:distribution` included; browser projects green on Edge; tree clean |

Round-2 carry-overs closed: analyst 14 and 16, reviewer N1, N2, N3. Open after round 3, every
one about the RTL guard the Orchestrator's brief 3 shaped as a regex over stylesheet text:

| Finding | Source | Carrier |
| --- | --- | --- |
| value tokenization breaks on `!important` and spaced `calc()`; delimiter in the return; uppercase, comments, and quoted content; hidden module constants; `read*` names the wrong operation | analyst claim 5, 15, 17, 18, 19; reviewer N4, N5, N7 | `units/u1-fix-brief-4.md`: `scanPhysicalDeclaration` over a `postcss` parse with exported constants and a top-level value splitter, proved on every edge form both lanes named |
| the cascade case passes on an empty population | reviewer N6 (traces to brief 3) | brief 4: the case asserts the parsed cascade holds the `@layer` at-rule before scanning and names U3's obligation to require declarations |
| counts in the report prose | analyst 20 | brief 4 fix 3 |
| scope of direction sensitivity (`border-radius`, `background-position`) | analyst 17 | brief 4 § Scope ruling |

## Ruling (round 3)

Fix round 4 on `builder` from `units/u1-fix-brief-4.md`, landed as `bd4284c`. Round 4 audits
the successor with the `checker`, the `verifier`, and the objective lane (`reviewer`) on the
parsed-scanner mechanism; the subjective lane is not re-run for round 4 because the successor
changes only two test files under a scope the subjective lane already ruled on (its finding 17's
scope question is settled by the brief's ruling) — that omission is this round's recorded
deviation, with that reason.

# Round 4

Subject Veneer `bd4284c` (successor-4 diff `a0447d2..bd4284c`, tree clean).

| Lane | Role and engine | Journal | Terminal line |
| --- | --- | --- | --- |
| objective | `reviewer`, native Opus 5 | `units/u1-fix-4-audit-reviewer-report.md` | `Verdict: fix round — N8 forces it, with N9 and N10 carried into the same successor and R1 to R5 referred to the Orchestrator` |
| checker | native Sonnet | `units/u1-fix-4-audit-checker-report.md` | findings: the remaining count phrase in the report; four unexported module-scope helpers |
| verifier | native Sonnet, U1-gate round 4 | `units/u1-gate-report-4.md` | every gate green on managed Chromium, `test:distribution` included; browser projects green on Edge; tree clean |
| subjective | not run | — | round 3's ruling and its reason stand |

Closed by successor 4: round-3 N4, N5, N6 (gap recorded), N7 (constants); analyst 17, 18, 19; the
scope of direction sensitivity as brief 4 ruled it. The report's remaining count phrases were
replaced by the Orchestrator (a prose edit to the retained report, recorded here).

| Finding | Source | Carrier |
| --- | --- | --- |
| four unexported module-scope predicates in `tests/setupStyles.ts` | reviewer N8, checker | `units/u1-fix-brief-5.md` fix 1: exported `matches*` predicates with proofs |
| splitter not quote-aware, depth never clamped | reviewer N9 | brief 5 fix 2 |
| `@returns` omits the lowercasing; no `@throws` for `CssSyntaxError` | reviewer N10 | brief 5 fix 3 |
| three-value `border-radius`, the slash form, the `background` shorthand, `float`/`clear` neutral values, keyword matching inside custom-property names | reviewer R1 to R5 (the ruling's own gaps) | brief 5 § Amended scope ruling and its fixtures |

## Ruling (round 4)

Fix round 5 on `builder` from `units/u1-fix-brief-5.md` (landed `6b1c303`) and, after the unit
reported a contradiction between the ruling's three-token radius formula and one of its own
fixtures (the fixture was wrong), `units/u1-fix-brief-6.md` (landed `e9f2a2f`). Round 5 ran the
`checker`, the `verifier`, and the objective lane on the combined diff; the subjective lane was
not re-run (the same reason as round 4, recorded).

# Round 5

Subject Veneer `e9f2a2f` (combined diff `bd4284c..e9f2a2f`, tree clean).

| Lane | Role and engine | Journal | Terminal line |
| --- | --- | --- | --- |
| objective | `reviewer`, native Opus 5 | `units/u1-fix-5-audit-reviewer-report.md` | `Verdict: fix round — N11 and N12 force it, with N13 to N16 carried into the same successor` |
| checker | native Sonnet | `units/u1-fix-5-audit-checker-report.md` | findings: count phrases in the report only (replaced by the Orchestrator) |
| verifier | native Sonnet, U1-gate round 5 | `units/u1-gate-report-5.md` | every gate green on managed Chromium, `test:distribution` included; browser projects green on Edge; tree clean |
| subjective | not run | — | round 4's reason stands |

Closed: round-4 N8, N9, N10; R1 to R5 as ruled. Open, every one inside the RTL guard:

| Finding | Source | Carrier |
| --- | --- | --- |
| the value is not lowercased (a regression from `bd4284c`) | reviewer N11 | `units/u1-fix-brief-7.md` fix 1 |
| an unspaced `/` is not a radius side separator | reviewer N12 | fix 2 |
| two constants and branches for one rule | reviewer N13 (ruled: merge) | fix 3 |
| `@returns` wording on two predicates; the R6 limit unstated | reviewer N14, N15, R6 (ruled: a recorded limit) | fix 4 |
| the report keeps a superseded reading without pointing to its correction; a temporal `now` | reviewer N16 | fix 5 |

## Ruling (round 5)

Fix round 6 on `builder` from `units/u1-fix-brief-7.md` (landed `b661142`). Round 6 ran the
`checker`, the `verifier`, and the objective lane; the subjective lane's omission and its reason
stand.

# Round 6

Subject Veneer `b661142` (successor-7 diff `e9f2a2f..b661142`; combined `bd4284c..b661142`).

| Lane | Role and engine | Journal | Terminal line |
| --- | --- | --- | --- |
| objective | `reviewer`, native Opus 5 | `units/u1-fix-6-audit-reviewer-report.md` | `Verdict: accept — N11 to N16 are closed at their sites, the shipped guard implements the ruling of briefs 5 to 7 on every traced fixture and on every unlisted form, no exported name collides with a hosted guide, and N17 to N19 are non-blocking limits for U3 while the gate readings stand on the verifier` |
| checker | native Sonnet | `units/u1-fix-6-audit-checker-report.md` | clean on the code; quoted count phrases in the report (replaced by the Orchestrator) |
| verifier | native Sonnet, U1-gate round 6 | `units/u1-gate-report-6.md` | every gate green on managed Chromium, `test:distribution` included; browser projects green on Edge; tree clean |

Carried to U3 as documented obligations, not fixed here (`.claude/rules/quality.md` § Rounds and
verdicts caps the depth search; the built cascade declares nothing yet, so neither is reachable
through shipped code): N17 (the edge comparison is textual, so `calc( 1px )` against `calc(1px)`
flags a neutral declaration), N18 (the limit sentence must name the value form — a side-keyword
property is scanned for a `left` or `right` token only, so a percentage or length side escapes),
N19 (a wrapped clause in the radius `@returns`).

## Ruling (round 6): accept

U1-author is accepted at Veneer `b661142`: the adoption, the styles axis, the ColorMode engine,
the shell, the journeys, the boundary controls, the distribution stage, the guide, and the
audited fix rounds. The exclusions the ledger records (`research/ledger.md` § Exclusions) are
reported to the user with this acceptance.
