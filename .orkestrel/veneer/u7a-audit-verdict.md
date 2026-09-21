# U7a — audit verdict

Subject: unit U7a in the Veneer checkout, written by `sol` on Astra across the briefs
`units/u7a-brief.md` to `units/u7a-brief-6.md` (the first five launches stopped on the
Orchestrator's scope omissions, each recorded in the plan's re-baseline record and in
`units/u7a-report.md` to `-4.md`); the implementation report is `units/u7a-report-5.md`, the
matrix move `units/u7a-report-6.md`. Claims: `u7a-audit-claims.md`. Evidence rendered for the
read-only lanes: `units/u7a-diff.patch.txt` (`git diff 2bc922d` plus `--no-index` renderings of
the untracked files) and `units/u7a-status.txt`. Scope: implementation only, by the user's
ruling of 2026-09-20 (no wording, comment, doc-block, or guide-prose findings).

## Round 1, 2026-09-20

Astra wrote the unit, so the lanes are swapped: Opus holds the objective lane and Astra the
subjective lane. All four ran, blind to each other, on one claims file.

| Lane | Role | Engine | Record | Terminal line |
| --- | --- | --- | --- | --- |
| objective | `reviewer` | native Opus 5, Workflow `wf_62e94775-e25` | `units/u7a-audit-reviewer-brief.md`, `units/lane-u7a-reviewer.md` | fix round on findings 16 to 21, 23, 24 |
| subjective | `analyst` | Astra, `codex exec` read-only, thread `01a0c164-90a2-73c2-9aad-bd1075e1d83b`, exit 0 | `units/u7a-audit-analyst.sh`, `units/u7a-audit-analyst-report.md` | fix round with claim 9 |
| mechanical | `checker` | native Sonnet, the same Workflow | `units/u7a-audit-checker-brief.md`, `units/lane-u7a-checker.md` | accept |
| gates | `verifier` | native Sonnet, the same Workflow | `units/u7a-gate-brief.md`, `units/lane-u7a-verifier.md` | every step exit 0, `npm test` and both Edge projects included; cascade digest `d544aae8…` |

### Claims

| Claim | Reviewer | Analyst | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 elements partial | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 2 components partial | CONFIRMED (twenty-five bound properties, every family) | CONFIRMED | — | CONFIRMED |
| 3 exhaustive partition | CONFIRMED (every inventory member checked against the built cascade) | CONFIRMED | CONFIRMED | CONFIRMED |
| 4 tokens | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 5 mixer and calibration | CONFIRMED (the srgb mix arithmetically exact both ways) | CONFIRMED | — | CONFIRMED |
| 6 focus-ring mixin | CONFIRMED | CONFIRMED | — | CONFIRMED; findings 19 and 23 carried |
| 7 symmetric-pair helper | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 8 selector grammar | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 9 proofs cover every state | UNDECIDABLE (Edge configuration) | REFUTED (outline active and ring unread) | — | REFUTED on the outline states; carried as brief-7 finding 1. The Edge reading is the verifier's step 12, exit 0 |
| 10 controls | UNDECIDABLE (report only) | CONFIRMED from the retained logs and the restore digests | UNDECIDABLE (residue clause confirmed) | CONFIRMED from the unit's logs, which the analyst read and the native lanes could not |
| 11 guide rows and parity | CONFIRMED (rows) | CONFIRMED | CONFIRMED (rows; exit code the verifier's) | CONFIRMED; `test:guides` exit 0 in the verifier's step 10 |
| 12 scope and law | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 13 enumerating assertions | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 14 no RTL work | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 15 gates | UNDECIDABLE | UNDECIDABLE | — | CONFIRMED from the verifier: sixteen steps exit 0 |

### Findings carried into the fix round (`units/u7a-brief-7.md`)

Reviewer 16 (`light` role text white on white), 17 (state tokens outside `theme-tokens`), 18
(`userEvent` where installed helpers exist), 19 (`focus-ring` coupled to the button group), 20
(disabled shadow bypasses `--bs-btn-box-shadow`), 21 and the checker's observation (bare
`.btn:active` superset), 23 (the mixin proof's focus modality), 24 and analyst claim 9 (outline
active and ring unread), 25 (the light mixer end as the text token).

### Not carried

- Reviewer 22: `--bs-btn-focus-shadow-rgb` is declared and decides nothing; the ring stays on
  the calibrated endpoint. A compatibility departure U7e records in one row.
- Reviewer 26: the symmetric-pair admission trades source-level enforcement for the build's
  shorthand merge; the RTL byte-copy invariant is unharmed. Recorded.
- The dual-engine configuration remark: the Edge run is the verifier's, through the
  `PLAYWRIGHT_CHANNEL` override this workspace uses.

### Terminal (round 1)

Verdict: fix round. `units/u7a-brief-7.md` on Astra (thread `01a0c172-44b3-7ff0-a300-9c01f9c289e4`).
