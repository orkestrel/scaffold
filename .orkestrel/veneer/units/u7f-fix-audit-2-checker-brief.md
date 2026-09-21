# U7f-fix audit — checker brief (round 2: the fix round under brief 2; rule on the fix-round tree, with round 1's rendered diff `u7f-fix-diff.patch.txt` beside round 2's so the fix round's own edits stand out)

## Role and engine

`checker` on native Sonnet, clean context. Perform the assignment directly and spawn nothing.
You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule mechanically on the claims
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7f-fix-audit-claims-2.md` marks `[mechanical]`
with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact
text). Rule on no other claim. That file alone fixes the claim numbers. The user has ruled that
audits cover implementation only: report no wording, comment, doc-block, or guide-prose finding.

## Evidence

The Orchestrator rendered the diff over the Veneer checkout's U7b landing (the base named in
the claims file) at `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7f-fix-diff-2.patch.txt` and the
status at `tmp/audit/u7f-fix-status-2.txt`. Read those and the live Veneer tree at
`C:/Users/mikes/WebstormProjects/veneer` (`app/browser/**`, `tests/app/browser/**`,
`tests/setup.ts`, `tests/setup.test.ts`, `tests/setupBrowser.ts`, `tests/distribution.test.ts`,
`package.json`, `configs/**`). Read the retained report
`.orkestrel/veneer/units/u7f-fix-report-2.md (with u7f-fix-report.md)` only to learn what the unit claims; rule on the tree.

## Probes

- Surface: `package.json` `exports` and `sideEffects` unchanged; `src/**` absent from the diff.
- Placement: the affordance rule lives in `app/browser/styles/_shell.scss` inside the `shell` layer and
  reads `--vn-*` tokens only (no hard-coded colour); the control carries no `.btn` class; any class
  added to the control is declared in `app/browser/constants.ts` or set in `app/browser/Showcase.ts`.
- Export set: `tests/app/browser/index.test.ts` and `tests/setup.test.ts` still assert sets equal to
  the live ones (list both if the diff touches an exporting file).
- The proof: `tests/app/browser/Showcase.test.ts` reads the control's resolved affordance in both
  modes and asserts equality across modes; the journey stages reduced motion around the hover and
  active placements and releases it after; the pressed-moment tree is appended to `ARTIFACT` in
  both modes and asserted to announce `Toggle` as pressed.
- Captures: the registry (`PORTFOLIO_STATES`, `BUTTON_STATES`) is unchanged; the placement and
  filename proofs stay unconditional; the `CAPTURE=1` run regenerated `tmp/capture/`.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/application.md`, `browser.md`, `tests.md`,
`architecture.md`, `names.md`, `typescript.md`.

## Output

A table `Claim | Verdict | Evidence` over the mechanical claims; the probe readings; extra
findings numbered after the last claim with a site (implementation only, or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
