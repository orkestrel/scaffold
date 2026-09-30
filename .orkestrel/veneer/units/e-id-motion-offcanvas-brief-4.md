# Unit E-ID-MOTION-OFFCANVAS round 3 — each comment and sentence says what the code and the case do

Successor to `e-id-motion-offcanvas-brief-3.md`, which stays in place unedited and still binds except where this brief
overrides it. What changed: round 2 (`32a6c28` on `unit/moff`) was audited in `moff-audit-2-verdict.md` (FAIL 1, 3, 4;
F1). Every finding is a comment or a sentence; this round changes no rule and no reading.

## Role and engine

`opus` on Opus 5.5, the same sole writer in `/home/user/veneer-moff` (branch `unit/moff` at `32a6c28`), resumed. Read
`moff-audit-2-verdict.md` and both lane verdicts beside it, and the Orchestrator's run in `moff-instruments-2/orchestrator-probe/`,
all under `/home/user/scaffold/.orkestrel/veneer/units/`. The Law, Host, Tools, and Deviation contract of the earlier
briefs bind unchanged.

## Items

1. **Claim 1.** Word the responsive case's comment in `tests/src/styles/components/offcanvas.test.ts` for what the case
   catches: the panel's transparent rest written outside the rules each responsive panel carries below its boundary, its
   transition dropped from those rules, and a hiding panel left opaque below it. Say that no rule keys the state classes in
   the flow, so each class write leaves the panel opaque and starts nothing, and that the conformance ledger, not this
   case, reports a transition written in the flow.
2. **Claim 4.** `_offcanvas.scss`'s layer header names the panel's opacity beside the transition as the values that are
   not Bootstrap 5.3.8's own, and says the transparent rest and the opaque shown state are Veneer's additions.
3. **F1.** `_navbar.scss`'s header names the expanded bar's offcanvas opacity reset among its exceptions. That line joins
   the owned set.
4. **Claim 3.** In § Offcanvas classes, "the release's `0.3s`" becomes "the release's `0.3s` duration", and "resolves to
   `250ms`" becomes "resolves to a `250ms` duration"; read the paragraph and the departure bullet once more for any other
   code token with no noun after it.

## Execution

Perform the assignment directly and spawn nothing. Then run: oxfmt's `--check` over the owned files, `npm run check`,
`npm run lint:check`, `npm run test:guides`, `npm run test:policy`, and, after `npm run build:src:styles`, the offcanvas
and navbar style proofs, each logged under `tmp/units/` with the `-3` suffix.

## Output

Write `tmp/units/moff-report-3.md` and return the same text: each comment and sentence as written, the gate table,
`tmp/units/moff-3.diff` (`git diff 32a6c28`), and `tmp/units/moff-3-status.txt`. State no count in prose.

## Acceptance criteria

1. Every gate in Execution exits 0.
2. The diff changes only comments in the owned partials and test, and sentences in § Offcanvas classes.

## Review evidence

The diff, the status, and the gate logs. The audit runs the objective and subjective lanes on a successor claims file.
