# CL3b audit verdict — the muted text and raised surface tokens

Subject: unit CL3b in Veneer over the base `9bb306e` (the CL3 landing), written by `opus` on
native Opus 5 under the effective brief `units/cl3b-brief-2.md` over `units/cl3b-brief.md`
beneath it; the scope read that corrected brief 1 is `units/cl3b-scope-read-report.md`. Report:
`units/cl3b-report.md`. Claims: `cl3b-audit-claims.md`. Evidence: `units/cl3b-diff.patch.txt`,
`units/cl3b-status.txt`.

## Round 1 (2026-09-21)

Lanes, launched together and blind: analyst on Astra holding the OBJECTIVE lane
(`units/cl3b-audit-analyst-report.md`, thread `01a0c41e-7b7c-72f1-a3e9-c19822338db5`, exit 0;
Opus wrote the unit, so the lanes are swapped as CL2's were); reviewer on Opus 5 holding the
SUBJECTIVE lane (`units/lane-cl3b-reviewer.md`, workflow `wf_a562f6fe-ecb`); checker on Sonnet
(`units/lane-cl3b-checker.md`); verifier on Sonnet (`units/lane-cl3b-verifier.md`) over
`units/cl3b-gate-brief.md`.

| Claim | Analyst (objective, Astra) | Reviewer (subjective, Opus) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 anchor pinned | CONFIRMED (in-memory compile against `9bb306e`: every role's border, subtle, and emphasis tier identical; an unpinned control differs) | CONFIRMED (the built cascade emits the literal mix; `integration.test.ts` unedited and absent from the status) | CONFIRMED | — |
| 2 `--vn-text-muted` | CONFIRMED (values match the record's `address` and `dd` rows; secondary stays the 75 % mix) | CONFIRMED | — | — |
| 3 raised and code surface | CONFIRMED (no code-surface drift; registry equality holds in both directions, and its own controls break it) | CONFIRMED | CONFIRMED | — |
| 4 the `font.mono` group and the rename | **REFUTED on necessity**, implementation coherent, no round forced: an executed counterexample (`font.mono` plus `font.short`) satisfies the path law, so the law does not force grouping merely because a second monospace token exists | CONFIRMED with a framing correction: the sibling token was the brief's instruction, not the unit's choice; only the grouping and the `-base` rename were settled by the unit; a smaller change existed and is worse here | CONFIRMED (the rename is complete; the leaves are `text.muted`, `font.mono.base`, `font.mono.short`, `line.code`) | — |
| 5 `--vn-line-code` | CONFIRMED (compiled substitution equals the former literal) | CONFIRMED | — | — |
| 6 the rebound members | CONFIRMED (each reading matches its record row; the setup exports and their proof are unchanged) | CONFIRMED | CONFIRMED | — |
| 7 the radii | CONFIRMED on proof coverage (in-memory deletion removes the compiled declarations) | CONFIRMED | CONFIRMED | — |
| 8 the guide's facts | UNDECIDABLE on the `test:guides` exit | CONFIRMED on the facts | — | `test:guides` exit 0 |
| 9 scope, law, gates | **REFUTED**: the new token cases declare inline mode matrices | CONFIRMED for what the diff and status evidence; gates report-only | CONFIRMED on scope, rename, registry, anchor, case tables, and the law sweep; gate half UNRESOLVED | every step exit 0 on managed Chromium and Edge, `npm test` and the journeys exit 0, status identical before and after, `scaffold audit` reports only the pre-existing `setupListeners` note and the three registry majors |

Reconciliation. The verifier's twenty steps close the gate half that the analyst, the reviewer,
and the checker each left open; the checker's terminal line names only that conjunct, and its
condition is met by a lane it could not see. Claim 4's necessity is refuted and recorded: the
rename stands on the name the brief's own instruction implies, not on a law that forces it, and
no code changes. One defect forces a fix round.

Findings:

- **Analyst 9 (forces the round).** `tests/src/styles/tokens.test.ts` declares
  `it.each(['light', 'dark'])` inline in both new cases, while `tests/setupStyles.ts` already
  exports `TEXT_MODES` for exactly that; `.claude/rules/tests.md` puts a case matrix in a setup
  file at any size. This is the rule CL3 round 1 raised as analyst 12 and CL3 round 2 landed.
  Fix: read `TEXT_MODES`. No setup export changes, so its proof stays unedited.
- **Reviewer 10 (carried).** `--vn-surface-raised` now carries the code block's measured value
  while its guide row's forward-looking sentence still promises component surfaces will consume
  it. Nothing breaks today (the token has no consumer outside the three code members), and the
  retune was the brief's instruction. Carrier: the first unit that lands a component surface
  reading it measures its own value rather than assuming this one, and CL12 restates the
  sentence. Recorded in `plan.md`.
- **Reviewer 11 (carried to the next unit that grows the description-list table).**
  `TEXT_DL_CASES`'s new field names the value's character where its siblings name the property;
  one word naming the member would carry a second descendant colour.
- **Reviewer 12 (observation, no fix).** The code-surface expression is now duplicated verbatim
  in both maps while the text closure keeps its mode-invariant expressions inline; the move was
  the brief's instruction and buys sibling consistency.
- **Reviewer's reservation on `short` (recorded, no change).** It describes the value's length
  rather than a role, which the registry's `radius.small/base/large` precedent tolerates.

### Findings carried into the fix round (`units/cl3b-brief-3.md`)

1. Analyst 9: the two inline mode matrices in `tests/src/styles/tokens.test.ts` read `TEXT_MODES`.

### Terminal (round 1)

Verdict: fix round. `units/cl3b-brief-3.md` on Opus (the writer); the Astra analyst stays the
objective auditor; round 2 runs all four lanes.
