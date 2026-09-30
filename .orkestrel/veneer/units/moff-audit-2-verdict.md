# E-ID-MOTION-OFFCANVAS audit round 2 — verdict

The Orchestrator's reconciliation of the round-2 audit of E-ID-MOTION-OFFCANVAS (`moff-audit-2-claims.md`, the round at
`32a6c28`): the objective lane, `reviewer` on Opus 5.5 (`moff-audit-2-objective-verdict.md`), and the subjective lane,
`reviewer` on Opus 5.5 (`moff-audit-2-subjective-verdict.md`), blind to each other in clean contexts. **Deviation:** the
round briefed the objective lane to `analyst` on GPT-6 Astra; Astra hit the Codex usage limit at launch (reset
2026-09-30 15:18 UTC, `moff-audit-2-analyst-dark.log.txt`), so under `.agents/orchestration.md` § Engine assignment
Opus 5.5 ran both lanes (`moff-audit-2-objective-brief.md`). The writer was `opus` on Opus 5.5, so no lane ran on an
engine that did not write the work. The Orchestrator settled claim 1 by running the transition leak both lanes derived
(`moff-instruments-2/orchestrator-probe/`).

**Verdict: FAIL 1, 3, 4; outside the claims: F1.** The responsive exit's proof, the plants, the unchanged rules, and the
scope and gates hold; each failure is a comment or a sentence.

## Claims

| Claim | Objective (Opus 5.5) | Subjective (Opus 5.5) | Ruling |
| --- | --- | --- | --- |
| 1 The responsive exit | CONFIRMED, with its 4(b) | BROKEN | BROKEN in the case's comment, on the Orchestrator's run |
| 2 The plants | CONFIRMED | CONFIRMED | CONFIRMED |
| 3 The guide | BROKEN | CONFIRMED | BROKEN |
| 4 The comments | BROKEN | BROKEN | BROKEN |
| 5 No regression | CONFIRMED | CONFIRMED | CONFIRMED |
| 6 Scope and gates | CONFIRMED | CONFIRMED | CONFIRMED |

- **Claim 1, run.** The responsive case's comment says it catches "the panel's opacity or its transition written outside
  the rules each responsive panel carries below its boundary". With `transition: var(--bs-offcanvas-transition);`
  planted in the in-flow `breakpoint-up` block, the offcanvas and navbar proofs pass (`Tests 82 passed (82)`,
  `flow-styles.log.txt`), because no rule changes a transitioned value there; the conformance ledger fails on it
  (`records every emitted name the official inventory lacks` and `reports an unrecorded literal declaration on a shipped
  rule as a declaration addition`, `flow-conformance.log.txt`). A gate covers the leak; the case's comment claims it.
  The file restored to its pre-plant digest.
- **Claim 2, the plant driver.** `moff-plants-2.sh` compares each restored file with the backup it was copied from, so its
  `restored=identical` cannot fail (objective). The restores held on the worktree itself.
- **Claim 3.** "in place of the release's `0.3s`" and "resolves to `250ms`" leave a code token with no noun after it,
  against `.claude/rules/writing.md` § Code tokens, and against the guide's own "the release's `0.15s` value" form
  (objective).
- **Claim 4.** "Every value here but the transition is Bootstrap 5.3.8's own" in `_offcanvas.scss` is false: the layer
  also writes the panel's transparent rest and opaque shown state, which the release does not (both lanes).

## Findings outside the claims

- **F1 (objective), accepted.** `_navbar.scss`'s header, "Every value here is Bootstrap 5.3.8's own, apart from the
  forced-colors focus outline", became false when the unit added the expanded bar's `opacity: 1` reset.
- **Referral (objective), not carried.** The guide writes "at a factor of `1`" throughout; the noun precedes the value,
  so the form stands.
- **Referral (subjective O3), not carried.** The specimen mount repeated in two cases is test setup inside one file.

## Carriers

`e-id-motion-offcanvas-brief-4.md` (the same `opus` writer, resumed) carries claims 1, 3, and 4 and F1.
