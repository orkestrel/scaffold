# CL5 audit verdict — typography and content classes

Subject: unit CL5 in Veneer over the base `5240e36` (the CL4b landing), written by `opus` on
native Opus 5 under `units/cl5-brief.md` with `units/cl5-brief-2.md` above it. Report:
`units/cl5-report.md`. Terrain: `units/cl5-scout-report.md`. Scope read:
`units/cl5-scope-read-report.md`. Claims: `cl5-audit-claims.md`. Evidence:
`units/cl5-diff.patch.txt`, `units/cl5-status.txt`.

## Round 1 (2026-09-21)

Lanes, launched together and blind: analyst on Astra holding the OBJECTIVE lane
(`units/cl5-audit-analyst-report.md`, thread `01a0c4d6-987b-7a70-9db6-9e249be775e1`, exit 0; Opus
wrote the unit, so the writer's engine holds the subjective lane and Astra the objective one);
reviewer on Opus 5 holding the SUBJECTIVE lane (`units/lane-cl5-reviewer.md`, workflow
`wf_17eea6d5-d63`); checker on Sonnet (`units/lane-cl5-checker.md`); verifier on Sonnet
(`units/lane-cl5-verifier.md`) over `units/cl5-gate-brief.md`.

| Claim | Analyst (objective, Astra) | Reviewer (subjective, Opus) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 every key ships and joins the listed set | CONFIRMED (compared the scoped inventory entries against the built cascade, compound selectors included) | CONFIRMED (traced every selector, every guide row, and the empty properties branch that waives a variable row) | CONFIRMED | `test:conformance` exit 0 |
| 2 the presence scan guards them | UNDECIDABLE, run report-only; mechanism sound on inspection | CONFIRMED on the mechanism; the run report-only (found the exact failure message shape and the minifier's legacy spelling in the built cascade) | — | — |
| 3 the heading twins are proved by comparison | REFUTED, forces a round (the retune exercises one heading level and one display level; other levels carry default-value assertions only) | CONFIRMED (the tag and the class are compared in one host, and the source is one loop over the levels) | — | — |
| 4 the twin reproduces the tag's whole block | CONFIRMED | CONFIRMED, on firmer ground than the report argued: Bootstrap builds its own heading classes by extending the tags, so shipping the size alone would have been the defect | — | — |
| 5 every value retained from Bootstrap | REFUTED as an absolute claim; no unexplained declaration found | REFUTED as written; the remaining sentences CONFIRMED declaration by declaration | — | — |
| 6 the departure rows rest on readings | REFUTED on one clause | CONFIRMED as a statement about the rows; one clause false | — | — |
| 7 the markup controls are closed | UNDECIDABLE, run report-only; implementation closes the gap | CONFIRMED on the mechanism; the plant run report-only; no plant residue | — | — |
| 8 the component sweep found nothing | UNDECIDABLE for the control; the present result confirmed, and its population cannot discharge the cross-folder duplication | CONFIRMED against the tree, and honest about its bound | CONFIRMED (the folder holds exactly the five partials) | — |
| 9 the showcase carries both sections | CONFIRMED | CONFIRMED | — | `test:app:browser` exit 0 |
| 10 scope, law, gates | REFUTED on law, because of the duplication findings; gate independence UNDECIDABLE | CONFIRMED on scope and law; gate half report-only | CONFIRMED | every step exit 0, both Edge runs green, status identical before and after |

Reconciliation.

**The lanes disagreed on claim 3, and the disagreement is substantive rather than factual.** Both
read the same case and agree it retunes one heading level and one display level. The subjective
lane confirmed because the source is a single loop over the levels, so no level can carry a
literal. The objective lane refuted because the proof, not the source, is what must catch the
edit that replaces the loop. The objective lane is right about what a proof is for, and the fix
is cheap and inside the unit's own file, so it goes to the fix round.

**The gate half is closed by this round's verifier**, which ran the whole chain over the unit's
tree, including `npm test`, both Edge runs, the journeys, and the scaffold audit, with the status
identical before and after. The objective lane and the checker could not see it; the lanes run
blind.

**The Orchestrator's own defect, the third of this class.** Claim 5 said every value this unit
ships is retained from Bootstrap. The heading and display families are deliberate departures,
which claim 4 of the same file states, so the claims file contradicted itself and both lanes
caught it. The rule this establishes, beside the two already recorded: a claim asserting
something of **every** member of a set must be checked against the exceptions the same claims
file already names.

**A second Orchestrator defect, and a rule change.** Claim 6 asserted a property of three guide
rows, which invited both lanes to audit guide prose. The user has ruled, and reaffirmed during
this round, that audits cover implementation only and that guide prose is the bare minimum to
pass. A claims file must therefore carry **no guide-row claim at all**; a guide row's facts are a
bound for the unit that owns the guide. Both guide findings this round produced are recorded as
bounds rather than fix-round work, and the rule is landed in `handoff.md` § Standing rulings.

Findings, with carriers:

- **Objective 3 and subjective 12 (both force the round, carried to `units/cl5-brief-3.md`).**
  The retune matrix proves one level out of twelve, and the heading twin's colour assertion
  cannot fail at all: `--bs-heading-color` resolves through `--vn-text-heading` to `inherit`, so
  deleting that declaration leaves the only colour assertion on the class green. It is also the
  one declaration of the twin block the case does not compare against the tag. The element proof
  one directory over already carries the control this needs.
- **Objective 11, subjective A, checker 1 (carried to CL5b).** The heading block and the image
  sizing block are duplicated across the element and component folders. All three lanes call it
  real; the checker adds that it is a legitimate scope boundary for this unit rather than a law
  violation by it, because the element folder was off-limits and a folder-bounded sweep cannot
  see it. The Orchestrator measured the whole space before this verdict: over 44 partials and
  all 946 pairs, two instruments agree these are the only two pairs
  (`units/sweep-styles-authored.log.txt`, `units/sweep-styles-source-2.log.txt`). CL5b is briefed
  at `units/cl5b-brief.md`.
- **Objective 12 and subjective B (carried to CL5c).** The three specimen sections share one
  body, differing only in the copy and table each reads. The subjective lane notes this unit
  created two of the three copies and that its refusal to refactor an unlisted file was
  defensible, since it took an unlisted edit only where a red gate forced one.
- **Subjective C and 13 (carried to CL5c).** `.mark`, `.figure`, and `.figure-caption` disagree
  with the tags beneath them. The subjective lane adds the fact the unit missed: Bootstrap builds
  its mark and small classes by extending the tags, exactly as it builds the heading classes, so
  the twin reasoning that produced this unit's heading ruling applies to the mark pair word for
  word and was not applied. The element partials involved are off-limits to this unit, which is a
  genuine bar.
- **Objective 13 (carried to CL5b).** The image fixture is declared locally in the component
  proof and repeats the one embedded in the element proof.
- **Subjective 11 and 14, objective 6 (bounds for the guide's owner, not fix-round work).** The
  heading departure row's condition clause is false for the two levels Bootstrap leaves
  unconditional, and the block-axis logical rewrites carry no departure row where the identical
  image rewrite got one. Recorded here under the standing ruling, and not sent back to the
  writer.
- **Subjective D (bound for the guide's owner).** The departures table sits under the tokens
  heading while carrying selector rows, which predates this unit.

None of the unit's four carried findings is an invented finding shielding it from a lane's own;
three are real and one was understated, which the subjective lane corrected.

### Terminal (round 1)

Verdict: fix round. `units/cl5-brief-3.md` on Opus, the writer, carrying the two proofs that
cannot fail. Round 2 runs all four lanes with the same assignment.

## Round 2 (2026-09-21) — the fix round under `units/cl5-brief-3.md`

Subject: the whole CL5 change after the fix round, over the same base `5240e36`. Claims:
`cl5-audit-claims-2.md`, carrying no guide-row claim, under the ruling the user reaffirmed during
round 1. Evidence: `units/cl5-diff-2.patch.txt`, `units/cl5-status-2.txt`, round 1's
`units/cl5-diff.patch.txt` for a diff-to-diff reading, and the Orchestrator's own probe
`units/cl5-probe.sh` with `units/cl5-plant.mjs` and `units/cl5-probe.log.txt`. Report:
`units/cl5-report-2.md`.

Lanes, launched together and blind: analyst on Astra holding the OBJECTIVE lane
(`units/cl5-audit-2-analyst-report.md`, thread `01a0c4ea-b586-7650-b221-f70b5a9ec268`, exit 0);
reviewer on Opus 5 holding the SUBJECTIVE lane (`units/lane-cl5-2-reviewer.md`, workflow
`wf_bdd62888-287`); checker on Sonnet (`units/lane-cl5-2-checker.md`); verifier on Sonnet
(`units/lane-cl5-2-verifier.md`) over `units/cl5-gate-2-brief.md`.

| Claim | Analyst (objective, Astra) | Reviewer (subjective, Opus) | Checker | Verifier and probe |
| --- | --- | --- | --- | --- |
| 1 the colour assertion can fail | CONFIRMED (the class sits on a division beside the tag, so neither tag styling nor inheritance supplies the control value) | CONFIRMED (traced the property through the mixin and the token to `inherit`, and found the only two consumers of that property, one of which matches tags alone) | — | — |
| 2 every level reads its own token | CONFIRMED (each case overrides only its named token and expects a value outside the default scales) | CONFIRMED (matched both tables row for row against the partial's loops, and the retune values disjoint from every default) | — | — |
| 3 the matrix is proved to fire | UNDECIDABLE, execution report-only; the plant's removal confirmed by hash | CONFIRMED on byte-identity; the run report-only | — | the Orchestrator's probe reddens exactly that level's case and restores to the hash both lanes cite |
| 4 no source file changed | CONFIRMED | CONFIRMED (blob hashes identical across the rounds for every source path) | — | — |
| 5 the setup proof grew with its exports | CONFIRMED (the level-to-token membership is pinned independently, so a row cannot be dropped or redirected silently) | CONFIRMED | — | — |
| 6 scope, law, gates | UNDECIDABLE on the gate half; scope and law hold, statuses hash-identical | CONFIRMED for scope, law, and the diff-to-diff delta; gate half not ruled | CONFIRMED | every step exit 0, both Edge runs green, status identical before and after |

Reconciliation. Every claim's substance is confirmed by every lane that could rule on it.

**The objective lane's terminal line asks for evidence, not for work.** It reads `fix round with
claims 3 and 6`, and its own body states that no additional implementation defect is established
and that those claims need execution evidence rather than implementation changes. Both are now
closed: the round's own verifier ran the whole chain over this tree, including `npm test`, both
Edge runs, the journeys, and the scaffold audit, with the status identical before and after; and
the Orchestrator took the plant reading directly after every lane exited, so no verifier chain
ran against a planted tree. The reading matches the writer's account exactly, down to the
partial's restored hash.

Findings, with carriers:

- **Subjective 7 (carried to CL5c).** The retune tables carry an invariant nothing asserts. The
  cases discriminate only because each retune value differs from every size a level resolves by
  default, and the frozen-table proof pins the level-to-token pairing alone. A later editor
  setting a retune value to a level's own default silently disarms the proof this round exists to
  create, with nothing red. One assertion over the union of the default tables closes it.
- **Subjective 8 (carried to CL5c).** The colour control shares the size case rather than owning
  one, so a colour regression reports under a case whose subject is size, and an earlier
  assertion failing hides the colour reading entirely. The element proof one directory over gives
  the identical control its own case.

The reviewer also recorded two shape questions as resolved in the work's favour, so they are not
reopened: the tables belong in the setup module beside every sibling family table, and their
names follow that module's established four-segment vocabulary.

### Findings carried out of CL5

1. Subjective 7 and 8, to CL5c (`units/cl5c-brief.md`), which owns the setup module and the type
   proof.
2. The cross-folder duplication, to CL5b (`units/cl5b-brief.md`), measured before this verdict.
3. The section body duplication and the class twin divergences, to CL5c, with the Orchestrator's
   twin reading at `units/cl5-twin-measurement.md`.
4. Every guide-row fact a lane volunteered, to the unit that owns the guide, under the standing
   ruling. No guide row was sent back to a writer.

### Terminal (round 2)

Verdict: accept. CL5 lands at the round-2 tree.
