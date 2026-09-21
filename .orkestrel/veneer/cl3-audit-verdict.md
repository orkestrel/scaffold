# CL3 audit verdict — the reset partial and the text Reboot tags

Subject: unit CL3 in Veneer over the base `9f5ffda`, written by `sol` on Astra under the
effective brief `units/cl3-brief-3.md` (a delta over `units/cl3-brief-2.md`; brief 1
superseded after the scope read, `units/cl3-scope-read-report.md`; `units/cl3-report.md` the
deviation stop brief 3 ruled). Report: `units/cl3-report-2.md`. Claims: `cl3-audit-claims.md`.
Evidence: `units/cl3-diff.patch.txt`, `units/cl3-status.txt`. The Orchestrator's rulings on the
three calibration limits the report names are in `plan.md` (the link colours to CL6; the muted
text and raised surface to the added unit CL3b).

## Round 1 (2026-09-21)

Lanes: analyst on Astra holding the SUBJECTIVE lane (`units/cl3-audit-analyst-report.md`, thread
`01a0c3b5-3583-7b80-807a-b2b71c1a6606`, exit 0; Astra wrote the unit, so the lanes are swapped);
reviewer on Opus 5 holding the OBJECTIVE lane (`units/lane-cl3-reviewer.md`, workflow
`wf_f704f705-60e`). **Checker: not run. Verifier: not run.** Both were dispatched in the same
workflow and both returned no verdict: a user message typed into the session while the workflow
ran was relayed into its subagents as a superseding instruction, and each lane answered that
message instead of its brief (`units/lane-cl3-checker.md`, `units/lane-cl3-verifier.md`, retained
as the record of the deviation). The reviewer's lane, launched in the same workflow, completed
its brief before the relay reached it. Round 2 runs all four lanes; the gate half of claim 9 and
the mechanical probes are ruled there.

| Claim | Analyst (subjective, Astra) | Reviewer (objective, Opus) |
| --- | --- | --- |
| 1 reset partial | CONFIRMED | CONFIRMED (built layer order read from `dist/`; cascade semantics of the important reset declaration confirmed) |
| 2 one bare tag per partial | CONFIRMED | CONFIRMED with a wording correction: `_abbr.scss` selects `abbr[title]` alone, Bootstrap's own Reboot selector; no bare `abbr` rule exists |
| 3 values through the ramps | CONFIRMED | REFUTED on one conjunct: `_var.scss` hard-codes the record's shorter mono stack, which the mono token cannot express; every value is right (record rows cited) |
| 4 code family tokens | CONFIRMED | CONFIRMED (registry equality holds by mechanism; readings equal record rows 2309 and 2310) |
| 5 anchor and body | CONFIRMED | CONFIRMED |
| 6 limits recorded | CONFIRMED | CONFIRMED (each proof asserts the implemented value, none the record's; the only literal is a font stack) |
| 7 `ContentSection` | CONFIRMED (its specimen's destination defect is analyst 10) | CONFIRMED (the removal-order proof cannot pass vacuously) |
| 8 guide rows | CONFIRMED | CONFIRMED |
| 9 scope, law, gates | UNDECIDABLE on the `scaffold audit` reading (verifier) | CONFIRMED on scope and law; gates report-only (verifier) |

Reconciliation. Every claim is CONFIRMED by both engines on its substance; the reviewer's
refutation of claim 3 is on the claims file's wording (the `ui-monospace` prefix does not
describe `_var.scss`), recorded against the claim, and its correction on claim 2 likewise. The
gate half of claim 9 waits for the verifier in round 2.

Findings:

- **Analyst 10 (forces the round).** `app/browser/constants.ts:250` renders a specimen
  `<a href="#main">Return to content</a>` while `Showcase.ts:30` creates `main` with no id, so
  the fragment resolves to nothing. Fix: give the shell's `main` the id and prove the fragment
  resolves to that region.
- **Analyst 11 (forces the round, rule compliance).** `_code.scss` and `_samp.scss` each declare
  the identical font family, size, padding, and text colour; `.claude/rules/styles.md` moves a
  pattern shared by two partials into `_mixins.scss`. Fix: one mixin for the shared code-family
  text treatment, each tag keeping its partial and its own surface and extras.
- **Analyst 12 (forces the round, rule compliance).** The mirrored proofs author their theme
  matrices and expected-value tables inline (`code.test.ts:12`, `samp.test.ts:12`, and the
  siblings); `.claude/rules/tests.md` puts data tables and case matrices in a setup file. Fix:
  the case tables in `tests/setupStyles.ts` (host-independent), exported and listed in its
  inventory, the proofs importing them; the grant is named in the fix brief.
- **Reviewer 10 (forces the round).** `tests/src/styles/tokens.test.ts:463-468` keeps a
  `console.log('CL3 code tokens', …)` the unit used to harvest the Edge readings; it proves
  nothing and carries a control identifier into the tree. Fix: delete it.
- **Reviewer 13 (carried into the round, cheap).** `reset.test.ts` plants no unlayered
  `!important` rule against `[hidden]`; add the plant and record the reading.
- **Reviewer 11 (carried to CL3b).** `_var.scss`'s literal mono stack needs a token the mono
  token cannot express (`--vn-font-mono-short` or equivalent); `_pre.scss`'s `line-height: 1.6`
  is the same shape at lower cost. CL3b owns the token files.
- **Reviewer 12 (carried to CL6).** `_a.scss` reads the `--vn-link-*` tokens while `_body.scss`
  and `_heading.scss` read the `--bs-*` aliases, so a consumer's `--bs-link-*` override does not
  reach Veneer's anchors; the binding is what brief 2 prescribed and CL6 owns the link map.
- **Claims wording (no code).** Claim 2's "each selects one bare tag" admits `abbr[title]`;
  claim 3's `ui-monospace` clause excludes `var`.

### Findings carried into the fix round (`units/cl3-brief-4.md`)

1. Analyst 10: the `main` id and the fragment proof.
2. Analyst 11: the shared code-family text mixin.
3. Analyst 12: the case tables in `tests/setupStyles.ts`.
4. Reviewer 10: the `console.log` removed.
5. Reviewer 13: the unlayered important plant in the reset proof.

### Terminal (round 1)

Verdict: fix round. `units/cl3-brief-4.md` on Astra (the writer); the Opus reviewer stays the
objective auditor; round 2 runs the analyst, the reviewer, the checker, and the verifier.
