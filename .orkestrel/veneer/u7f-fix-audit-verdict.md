# U7f-fix — audit verdict

Subject: unit U7f-fix in the Veneer checkout, written by `opus` on native Opus 5 under
`units/u7f-fix-brief.md`, report `units/u7f-fix-report.md`, over the U7e landing `7f6d5f6`.
Claims: `u7f-fix-audit-claims.md`. Evidence rendered for the read-only lanes:
`units/u7f-fix-diff.patch.txt` and `units/u7f-fix-status.txt`. Scope: implementation only, by
the user's ruling.

## Round 1, 2026-09-21

Opus wrote the fix, so the Astra analyst holds the objective lane and the Opus reviewer the
subjective lane. All four ran, blind to each other, on one claims file.

| Lane | Role | Engine | Record | Terminal line |
| --- | --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0c2d5-5fd2-7b30-8d4b-f471a91db34f`, exit 0 | `units/u7f-fix-audit-analyst.sh`, `units/u7f-fix-audit-analyst-report.md` | fix round with claims 2 and 3 and finding 6 |
| subjective | `reviewer` | native Opus 5, Workflow `wf_149c71d1-21f` | `units/u7f-fix-audit-reviewer-brief.md`, `units/lane-u7f-fix-reviewer.md` | fix round on findings 6 and 7; findings 8 and 9 and a referral |
| mechanical | `checker` | native Sonnet, the same Workflow | `units/u7f-fix-audit-checker-brief.md`, `units/lane-u7f-fix-checker.md` | accept |
| gates | `verifier` | native Sonnet, the same Workflow | `units/u7f-fix-gate-brief.md`, `units/lane-u7f-fix-verifier.md` | every step exit 0 (nineteen steps, `npm test`, `CAPTURE=1 test:journey`, the Edge runs, the read-only `scaffold audit`) |

Claims 1 and 4 CONFIRMED (the affordance rule, the selector's reach, the keyboard-driven proof;
scope and law); claim 5 CONFIRMED from the verifier. Claim 2 REFUTED on the proof, not the
frames: the regenerated element frames decode to the settled fills (the analyst's read-only
decode agrees with the report's numbers), but the hover proof re-hovers the host before its
deciding readings, so a capture that loses hover escapes it (analyst 2, reviewer 6). Claim 3
REFUTED on the proof: the arrival-record predicate also matches the focus inventory line, so a
replay with the arrival tree removed or replaced passes (analyst 3). Analyst 6 and reviewer 7:
the teardown never releases a staged pane. Reviewer 8: the `home-dark` frames are shot with the
pointer resting on the control. Reviewer 9: the per-variant artifacts are rewritten by every
journey run and carry frame paths only after a capture run, so the report's "run once more,
last" claim was overtaken by the verifier's own later runs; ruled a process rule for the
portfolio evidence (a capture run last, then assemble), not a code defect. The reviewer's
referral (the `header button` rule's safety rests on the unasserted invariant that every region
sits inside `main`) is carried.

### Findings carried into the fix round (`units/u7f-fix-brief-2.md`)

1. Analyst 2, reviewer 6: the hover proof's deciding readings taken straight after the
   placement, before the pane release and the re-hover.
2. Analyst 3: the arrival tree identified by a property only a tree carries.
3. Analyst 6, reviewer 7: `releasePane` in the teardown's independently attempted releases.
4. Reviewer 8: the pointer released before the `home-dark` placement, asserted not hovered.
5. Reviewer's referral: the header holds the control alone and every region sits inside `main`.

### Terminal (round 1)

Verdict: fix round. `units/u7f-fix-brief-2.md` on native Opus; the Astra analyst stays the
objective auditor.

## Round 2, 2026-09-21 (the fix round: brief 2)

Claims: `u7f-fix-audit-claims-2.md`. Evidence: `units/u7f-fix-diff-2.patch.txt` beside round 1's,
`units/u7f-fix-status-2.txt`.

| Lane | Role | Engine | Record | Terminal line |
| --- | --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0c2f7-6e49-73a3-8977-ae054663541e`, exit 0 | `units/u7f-fix-audit-2-analyst.sh`, `units/u7f-fix-audit-2-analyst-report.md` | fix round with claims 6 and 7, both evidence closures, no implementation defect |
| subjective | `reviewer` | native Opus 5, Workflow `wf_b34576fe-3ce` | `units/u7f-fix-audit-2-reviewer-brief.md`, `units/lane-u7f-fix-2-reviewer.md` | accept; findings 8 and 9 non-blocking bounds |
| mechanical | `checker` | native Sonnet, the same Workflow | `units/u7f-fix-audit-2-checker-brief.md`, `units/lane-u7f-fix-2-checker.md` | accept |
| gates | `verifier` | native Sonnet, the same Workflow | `units/u7f-fix-gate-brief.md`, `units/lane-u7f-fix-2-verifier.md` | every step exit 0 (nineteen steps, `npm test`, `CAPTURE=1 test:journey`, the Edge runs, the read-only `scaffold audit`) |

Claims 1 to 5 CONFIRMED by the analyst and the reviewer (the analyst decoded the regenerated
frames independently to the settled fills; the reviewer corroborated the deviation's premise from
the installed `captureFrame` and `releasePane` declarations); claim 6's scope and law half
CONFIRMED by all three judging lanes and its artifact-tail conjunct REFUTED as expected, because
the verifier's own later journey runs rewrite the per-variant artifacts without frame paths (a
process rule: the Orchestrator's capture run comes last, `units/u7f-recapture.sh`, before the
portfolio evidence is assembled); claim 7 CONFIRMED from the verifier. Reviewer's bounds, recorded
for the next unit touching these files: the hover rows of the collections duplicate the inline
assertions (finding 8); the `main`-containment assertion is narrower than the `header button`
selector, unreachable in the shipped tree (finding 9). The reviewer's wording correction on claim 4
(the `home-dark` `:hover` reading sits in the handed-back layout, which still reds the regression
under a stationary pointer) is recorded.

### Terminal (round 2)

Verdict: accept. Landed as Veneer `060ce02` through `units/u7f-fix-land.sh` (log `units/u7f-fix-land.log.txt`, message `units/u7f-fix-land-message.txt`), pushed to `origin/main`; the Orchestrator's capture run then regenerated the portfolio last (`units/u7f-recapture.sh`, log `units/u7f-recapture.log.txt`: 48 frames, twelve frame paths in each per-variant artifact).
