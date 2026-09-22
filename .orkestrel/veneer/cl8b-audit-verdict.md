# CL8b audit verdict — the gutter and gap step utilities

Subject: unit CL8b in Veneer over the base `d2c5bb3` (the CL8 landing), written by `sol` on Astra
under `units/cl8b-brief.md` with `units/cl8b-brief-2.md` above it. Reports: `units/cl8b-report.md`,
a stop, and `units/cl8b-report-2.md`, the run that finished. Rulings and terrain:
`units/cl8b-rulings.md`, measured rather than scouted. Scope read:
`units/cl8b-scope-read-report.md`. Claims: `cl8b-audit-claims.md`. Evidence:
`units/cl8b-diff.patch.txt`, `units/cl8b-status.txt`.

**The unit stopped once, on a false fact in its brief.** Brief 1 said the recorded `row` component
does not carry the gap entries. It carries all of them, and this campaign had measured that and
recorded it correctly in its own plan before the brief asserted the opposite. The unit read the
record and refused rather than bending the comparison to the premise. The rule it earned is in
`.agents/orchestration.md` § Check the brief before you send it at scaffold `3b2c0712`.

## Round 1 (2026-09-21)

Lanes, launched together and blind: analyst on Astra holding the SUBJECTIVE lane
(`units/cl8b-audit-analyst-report.md`, Codex thread `01a0c66b-071e-7df0-a222-adf94786fd34`, exit 0;
Astra wrote the unit, so the lanes swap); reviewer on Opus 5 holding the OBJECTIVE lane
(`units/lane-cl8b-reviewer.md`, workflow `wf_e041ab29-f9c`); checker on Sonnet
(`units/lane-cl8b-checker.md`); verifier on Sonnet (`units/lane-cl8b-verifier.md`) over
`units/cl8b-gate-brief.md`.

| Claim | Reviewer (objective, Opus) | Analyst (subjective, Astra) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 every selector ships in the record's grouping, nothing extra | CONFIRMED (**read the built cascade against the distribution** and confirmed the two-rule shape at every step and infix; confirmed the multiset counts the combined class twice because the collector pushes one entry per selector and sorts without deduplicating; searched every partial and found no other emitter of a selector the widened prefix admits) | CONFIRMED (matched emitted selectors, conditions, grouping, and resolved step values against the record and the distribution) | CONFIRMED (**grepped the built cascade** and found the three-rule sequence per step, repeated under every infix) | — |
| 2 the `row` key closes | CONFIRMED (**ruled what was actually required**: the presence scan already demanded those selectors from the pre-existing shipped rows, so deleting the deferrals and shipping the selectors was sufficient and the added row is redundant against the machinery rather than load-bearing) | CONFIRMED (**ran the presence scan live**: it returns nothing, and removing a gap selector in memory makes it report that selector missing) | CONFIRMED (no deferral row for these names remains) | `test:conformance` exit 0 |
| 3 the step scale is its own and carries no density factor | CONFIRMED (**traced the consequence through both dependency paths**: the axis default and the matching step are both density-free and both resolve to the same length, where the space scale would have moved one and not the other, because the density factor is registered inheriting) | CONFIRMED (the scale leaves read as a scale and the axis leaves as defaults, following the registry's existing shape) | CONFIRMED (read the six tokens and their values, none wrapped in the density factor, against the space scale which is) | — |
| 4 the important priority matches the record | CONFIRMED **with a correction to the claim**: the record is *silent* on importance rather than agreeing with it, so the priority is ruled against the distribution alone | CONFIRMED (the record stores values without priority; the distribution supplies the deciding evidence and the emitted rules match it) | CONFIRMED (**read both sides**: the distribution's row-gap rules important and its gutter rules not, and the built cascade following that asymmetry) | — |
| 5 the tuple correction is right | CONFIRMED (**ruled from the record in both directions**: the `row` key carries the gap selectors, no other candidate member overlaps, and the tuple as written records each once against a cascade emitting each once; also traced how the prefix admits the gutter names and refuses the neighbours, which a new case pins) | CONFIRMED, and **ruled on the asymmetry**: the tuple selects inventory buckets while the prefix selects emitted vocabulary, so making their coverage mechanically identical would corrupt the accounting | CONFIRMED | — |
| 6 the extension reddens both ways | Report-only; falsifiable by construction, and the prefix change carries its own negative-control case | UNDECIDABLE, report-only; **independently confirmed that missing, extra, duplicate, and shifted-condition mutations fail in memory**, and matched the live digest to the reported restoration | — | — |
| 7 the proof reads the browser, density independence included | CONFIRMED — **discarded; see the reconciliation** | **REFUTED — forces the round.** The density case sets the factor on the mounted wrapper, and the scale is declared at `:root`, where its references resolve before inheritance. The assertion passes whether or not the scale depends on density | — | `test:src:styles` exit 0 on both engines |
| 8 the step list and infixes are bound to their sources | CONFIRMED (**walked each binding**: the steps against the record's trailing step numbers, the infixes against the compiled ramp, the values against the record's declarations, and the tokens against the registry) | CONFIRMED (executed the live bindings) | — | `test:setup` exit 0 |
| 9 placement and shape follow the tree | CONFIRMED (**ruled the layer order load-bearing**: the utilities layer is declared last, so the utilities beat the row's components-layer declarations regardless of source order) | CONFIRMED (the sweep returns nothing shared over a population including the new folder) | — | — |
| 10 scope, law, gates | CONFIRMED on scope and law; gate half report-only | UNDECIDABLE as a whole; scope portion confirmed | CONFIRMED on scope and law, **reading every added line** and ruling each near-miss | **every step exit 0, status unchanged before and after**, styles 54 files on both engines, scaffold audit clean on the planned paths |

### Reconciling claim 7, and why the objective lane's confirmation is discarded

The lanes contradict each other, and the contradiction resolves in one command.

The objective lane confirmed the density independence citing `tests/src/styles/utilities/gap.test.ts`
lines 436 through 497. **That file is 75 lines long.** It carries exactly one density mutation, at
line 59, and that mutation sets the factor on the mounted wrapper — which is what the subjective lane
read and what the Orchestrator confirmed first-party. The objective lane's evidence for this claim
cannot exist, so its confirmation carries no weight.

The rest of that lane's reading is sound, which is why this is recorded as a claim-level discard
rather than a lane-level one: its citations into `tests/setupStyles.test.ts` and
`tests/setupStyles.ts` were spot-checked against the live files and are exact, including a quoted
negative-control case and the collector's prefix expression.

**Both lanes found the same hole from opposite ends.** The subjective lane diagnosed the mechanism:
a subtree factor change cannot move a `:root`-declared token, and the tree already proves it — a case
in `tests/src/styles/tokens.test.ts` is titled for exactly that distinction and sets the factor on the
document element with a restore. The objective lane, believing the retune worked, still recorded as
its finding 14 that the case has no positive control that the retune took effect, so the independence
would hold vacuously. That missing control is precisely what would have exposed the wrong element.
The fix therefore carries both halves.

**The shipped scale is correct.** Three lanes confirmed it carries no density factor and that the
utility and the default it overrides resolve to the same length at any factor. What fails is the
proof of that property, not the property.

### What the round established

The accounting is complete and reconciled from three directions: the built cascade against the
record, the record against the installed distribution, and the emitted grouping against both. The
`row` key closes, and the objective lane went further than the claim by ruling **what was actually
required** to close it — the presence scan already demanded those selectors, so the added
compatibility row is redundant rather than load-bearing. The tuple correction the stop forced is
ruled right from the record in both directions, and the asymmetry it creates between the tuple and
the prefix is ruled deliberate rather than untidy.

Findings carried into round 2:

- **Subjective 7 with objective 14, forcing.** The density case must set the factor where a
  `:root`-declared token can see it, and must carry a positive control that the retune took effect —
  a density-derived reading inside the same case that moves when the factor moves.
- **Objective 11.** The ramp-infix preamble is now identical in two partials, which the styles rule
  requires be moved to the mixins file; before this unit it had one caller, so the companion rule
  kept it inline. The repair reaches a partial this unit's brief put off-limits, so it needs a grant.
  The sweep cannot see it: that instrument reads declaration blocks and not Sass control flow.
- **Objective 12.** The sweep's folder guard names only two folders, so nothing proves the sweep
  discovers the utilities folder this unit created, and the "nothing shared" assertion could pass by
  discovering nothing there.
- **Objective 13.** Nothing pins the important priority on the row-gap rules. The record stores no
  importance, the presence scan compares names only, and the browser proof cannot see it because
  layer order already decides between these rules. It is the one obligation in this unit that
  shipped with no assertion behind it.
- **Objective 15.** The showcase's step list is a literal repeated in the section and its proof,
  bound to nothing, while the registry already carries the step set.

Referred to the subjective lane and returned without a defect: whether `gap` beside `gutter` is two
terms for one concept, and whether the redundant compatibility row reads better present. The
subjective lane confirmed the scale's naming reads correctly and raised neither as a defect, and the
standing ruling puts contract voice outside this audit.

**A note on the verifier's own conduct.** Its brief told it to write nothing into the checkout except
its `npm test` log under `tmp/`. It wrote an intermediate log outside the checkout entirely. The
readings are unaffected and every gate result is reported with its exit code, so this is recorded
rather than acted on.

Round 1 verdict: **fix round**, carrying the subjective lane's claim 7 with the objective lane's
findings 14, 11, 12, 13, and 15. The checker and the verifier returned `Verdict: accept` on their own
slices, and the objective lane's terminal line was `Verdict: accept`.

## Round 2 (2026-09-22), the fix round under brief 3

The fix round closed the forcing finding and the four that rode with it. Claims:
`cl8b-audit-claims-2.md`. Lanes, launched together and blind: analyst on Astra holding the
SUBJECTIVE lane (`units/cl8b-audit-2-analyst-report.md`, Codex thread
`01a0c686-94cf-7941-b865-35b45489dc3c`, exit 0); reviewer on Opus 5 holding the OBJECTIVE lane
(`units/lane-cl8b-2-reviewer.md`, workflow `wf_15aed43e-ee8`); checker on Sonnet
(`units/lane-cl8b-2-checker.md`); verifier on Sonnet (`units/lane-cl8b-2-verifier.md`) over
`units/cl8b-gate-2-brief.md`.

**Every lane of this round was told that a cited line must exist in the file it names**, after round
1's objective lane confirmed a claim on citations four hundred lines past a file's end. Both
judgment lanes closed by confirming they had checked, and the Orchestrator spot-checked each lane's
citations against the live files.

| Claim | Reviewer (objective, Opus) | Analyst (subjective, Astra) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 the density proof can fail and proves the factor arrived | CONFIRMED, **ruled as two separate questions as the claim asked**: the control reads a scale declared at the same root the factor is set on and registered to inherit, so a factor that stopped reaching the specimen leaves it unmoved and reddens; and the independence assertions are absolute lengths taken while the factor is doubled, so a gap scale that started carrying the factor breaks them while the control still passes. That discrimination is the case's purpose | CONFIRMED (the control establishes the retune took effect **before** the independence assertions run, and the case stays one readable subject) | — | `test:src:styles` exit 0 on both engines |
| 2 the red control is the defect the finding named | UNDECIDABLE, report-only for the run, **but ruled from the instrument's source**: it rewrites every step declaration to carry the factor while preserving the length and the declaration's scope, and refuses a zero-count plant; the reported failure is arithmetically what that mutation produces | CONFIRMED on the same reading; **matched the live digests to the recorded restorations** | — | — |
| 3 the extraction preserves both partials' cascades | CONFIRMED **on the substitution**: the mixin is the grid's former preamble moved verbatim, and the grid's offset guard reads the same raw boundary the old loop bound. The built artifact corroborates in both directions — the zero offset is absent from the emitted cascade and absent from the pre-extraction snapshot alike | CONFIRMED (the yielded pair describes one ramp entry, which fits both callers; the grid needs the boundary, the gap caller ignores it) | CONFIRMED | `npm run build` exit 0 |
| 4 the comparison instrument is itself falsifiable | CONFIRMED **beyond the report, from the instrument's source**: it records declaration importance through the node's own serialization, records each ancestor at-rule, builds in walk order, refuses an empty population, and compares exact bytes as well | CONFIRMED (it retains importance, order, and ancestry, and the priority-removal comparison exits non-zero) | — | — |
| 5 the three remaining findings are closed | CONFIRMED, and **ruled why the priority case is a real test rather than a restatement of layer order**: the utility sits in the last layer, so an unlayered normal declaration would outrank it outright — only the priority keeps it, and removing the priority moves the reading. The competing sheet is appended to the head after the setup file loads the cascade, and the case reads the plain row too, so a sheet that failed to arrive reddens rather than passing silently | CONFIRMED (traced the same load order and ruled the case states a cascade obligation a reader can check) | CONFIRMED | `test:setup` exit 0 |
| 6 nothing round 1 accepted moved | CONFIRMED **on blob identity across the two rendered diffs** rather than on hunk text: the guide, the registry, the tokens, the barrel, the listing, the enumerating assertion, and the setup module carry identical before-and-after blobs | CONFIRMED | CONFIRMED | — |
| 7 scope, law, gates | CONFIRMED except the gate sentence, report-only: the status adds exactly the two granted paths and removes nothing, the grid change is the call site and its reindentation alone, and **every added line was read** with each near-miss ruled | UNDECIDABLE as a whole; scope and law confirmed | CONFIRMED, gate portion plainly outside the slice | **every step exit 0 on managed Chromium and Edge, status identical before and after**, scaffold audit clean on the planned paths |

Reconciliation. Every claim's substance is confirmed by every lane that could rule on it, and the
gate half three lanes referred is closed by the verifier's own chain. **No lane raised an
implementation defect.**

**What the round established about the corrected proof.** The defect round 1 found was a proof that
could not fail. The replacement is a proof that fails for two distinct reasons, and both lanes ruled
those reasons separately: the control catches a factor that stops arriving, and the independence
assertions catch a scale that starts carrying it. The objective lane went further and showed the two
cannot mask each other — under a scale-carries-the-factor mutation the control still passes while the
independence fails, which is exactly the discrimination the case exists for.

**A reading worth keeping about the priority case.** The utility sits in the last cascade layer, so
an unlayered consumer declaration outranks every layered normal declaration and would beat it
outright. The important priority is the only thing that keeps the utility, which is why the case
tests the priority rather than restating layer order — and the case reads the plain row as well, so a
competing sheet that failed to load reddens instead of passing quietly.

Findings, none forcing:

- **Objective 9, an observation rather than a defect.** The extracted mixin has no fixture case of
  its own, where its two siblings do. Both of its yielded values are pinned through its callers'
  emitted output — the infix set against the ramp keys, and the boundary through the grid's zero
  offset being absent from the built cascade — so nothing is unproved. Carry it to whichever unit
  next owns the mixin fixture.

Round 2 verdict: **accept**. Every lane's terminal line was `Verdict: accept`.

## Acceptance

CL8b is accepted on both rounds. The gutter and gap step utilities ship in Bootstrap's own two-rule
grouping, from a step scale of their own that carries no density factor, so a utility and the default
it overrides resolve to the same length at any factor. The `row` key closes: its deferral rows are
gone and every gap selector it records is in the cascade. The emitted-vocabulary comparison now
covers these keys, with a tuple that names the three gutter keys and not the gap key whose selectors
the row key already carries. Gates green on managed Chromium and Edge under an independent verifier,
with the status identical before and after.

Carried forward:

- **To whichever unit next owns the mixin fixture**: the extracted ramp mixin has no fixture case of
  its own, though both its yielded values are pinned through its callers.
- **To CL9 and every later key unit**: the tuple and the collector prefix cover different populations
  on purpose, and making them mechanically identical would corrupt the accounting.
- **Unchanged and still the user's call**: the cross-cutting reconciliation unit in
  `units/value-accounting-finding.md`, and CL8's findings 7 and 10 with it.
