# CL8 audit verdict — the grid rows, columns, and offsets

Subject: unit CL8 in Veneer over the base `a9172df` (the CL7 landing), written by `sol` on Astra
under `units/cl8-brief.md` with `units/cl8-brief-2.md` and `units/cl8-brief-3.md` above it.
Reports: `units/cl8-report.md` and `units/cl8-report-2.md`, each a stop, and
`units/cl8-report-3.md`, the run that finished. Terrain: `units/cl8-scout-report.md`, which the
briefs supersede where they differ. Scope read: `units/cl8-scope-read-report.md`. Claims:
`cl8-audit-claims.md`. Evidence: `units/cl8-diff.patch.txt`, `units/cl8-status.txt`.

**The unit stopped twice, and both scope gaps were the Orchestrator's.** Brief 1 told the unit to
follow the container partial's gutter-alias pattern and then withheld that partial, so the standing
shared-block sweep fired on a duplication the unit could not fix inside its scope. Brief 1 also
withheld the conformance setup proof, dropping a grant CL7 held, and that proof enumerates every
component carrying guide rows as a literal set. Each stop was correct under the deviation contract,
and each cost a round. Both rules now live in `.agents/orchestration.md` § Check the brief before
you send it, landed in scaffold `fe23b640` and `d3e2313f`.

## Round 1 (2026-09-21)

Lanes, launched together and blind: analyst on Astra holding the SUBJECTIVE lane
(`units/cl8-audit-analyst-report.md`, Codex thread `01a0c61f-32c4-7193-81c4-9413326eb47c`, exit 0;
Astra wrote the unit, so the lanes swap and the writer's engine never holds the objective lane);
reviewer on Opus 5 holding the OBJECTIVE lane (`units/lane-cl8-reviewer.md`, workflow
`wf_f6125dcd-12d`); checker on Sonnet (`units/lane-cl8-checker.md`); verifier on Sonnet
(`units/lane-cl8-verifier.md`) over `units/cl8-gate-brief.md`.

| Claim | Reviewer (objective, Opus) | Analyst (subjective, Astra) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 every grid selector ships, the withheld are absent | CONFIRMED (**enumerated the built cascade family by family and reconciled the arithmetic against the record**: the key totals minus the withheld families equal what ships, and the conditions agree) | CONFIRMED (**independent in-memory comparison of the built selector and condition multiset against the record minus deferrals**, with controls rejecting an omitted row, an extra offset, and an unconditioned column) | CONFIRMED (reproduced the arithmetic and found no withheld name in the cascade) | — |
| 2 every declaration carries the recorded value | CONFIRMED (**derived the source arithmetic independently** and matched it against the installed Bootstrap and the record; the flexible column's shorthand matches Bootstrap's own). The zero-offset difference is real and computed-equivalent: a margin percentage resolves against the containing block, so it computes to zero at every width | CONFIRMED (re-derived the comparison and reached the same single difference) | — | — |
| 3 the keys list, every withheld name deferred with an owner | CONFIRMED (**read the deciding functions**: the deferral rows are where `readDeferrals` looks, the row key's variable rows are required because its properties are non-empty while the other keys' are empty, and a deferred name found in the cascade or a withheld name losing its row reddens the same assertion) | CONFIRMED (the owners are factually right: the utilities share a generation rule with CL8b's, and the form-label selectors occur under no other key) | CONFIRMED | `test:conformance` exit 0 |
| 4 the extraction preserved the container | CONFIRMED **on the substitution itself**: the content slot is empty at the container's call site, so the expansion is the pre-extraction sequence byte for byte, and the built artifact carries it. The slot sits where both callers need it — the row child requires its intervening declaration there, which is Bootstrap's own order | CONFIRMED (read the mixin bodies, then **compiled in memory and matched substituted against original**; reversing the declaration order failed that comparison) | CONFIRMED (the container diff is the two include lines and nothing else) | `test:src:styles` exit 0 on both engines |
| 5 the sweep reports nothing shared | CONFIRMED (**checked the new partial's blocks against every other partial for a two-declaration intersection** and found only single-declaration overlaps; each mixin has two callers) | UNDECIDABLE — the read-only sandbox refused dynamic code generation, so the lane could not run the scanner. An evidence limit, not a finding | CONFIRMED | `test:setup` exit 0 |
| 6 the generated vocabulary is bound to its sources | CONFIRMED in its narrower reading (the table-to-ramp and table-to-inventory comparisons read the real sources and fail in both directions, and no generated family lacks a binding) | **REFUTED — forces the round.** No binding reads the partial's own emitted vocabulary. **Proved by attack**: appending a step to the offset list in the partial emits that selector while both binding operands still agree, and the presence scan checks required names rather than extras | — | — |
| 7 the proof reads the browser | CONFIRMED (**every reading is a resolved value on a real node at a real viewport**, the inactive side is read at every breakpoint, and the cascade collision is read rather than assumed — the partial's emission order is Bootstrap's own, so the result matches the record rather than an invented one) | CONFIRMED on the mechanism; noted that re-pinning a value touches assertion bodies while the traversal does not | — | — |
| 8 the red-then-green control | UNRESOLVED, report-only | UNDECIDABLE, report-only; **independently hashed the live partial against the saved pre-control copy and matched the recorded digest**, which establishes byte identity rather than the run | — | — |
| 9 no token, one loop over a shared list | CONFIRMED (the partial declares no token and the tokens file is absent from the status; one loop drives every family, and the offset's zero member is gated to its breakpoint form as the record carries it) | CONFIRMED (the families read as their own subjects and the emission order carries cascade meaning) | — | — |
| 10 the section extends the base, the carried findings closed | CONFIRMED | CONFIRMED | — | `test:app:browser` exit 0 |
| 11 scope, law, gates | CONFIRMED on scope and law; the gate half report-only | UNDECIDABLE as a whole; the scope portion confirmed | CONFIRMED on scope and law, with the granted conformance edit limited to the three key additions; gate half referred | **every step exit 0 on managed Chromium and Edge, status identical before and after**, scaffold audit clean on the planned paths |

### Reconciling the lanes on claim 6

The lanes disagree, and the disagreement is the round's most useful result. **Both saw the same
gap.** The objective lane confirmed the claim against what it asserts about the tables, then
recorded in its own observations that no gate rejects a selector the cascade emits that the record
does not carry, and ruled that a pre-existing property of the harness rather than a CL8 defect. The
subjective lane ruled the same gap against the claim's own words — that a later addition reddens
rather than shipping unproved — and proved it by attack.

**The subjective lane is right about this unit, and the objective lane is right about the general
case.** Claim 6 says a later addition reddens; an addition to the partial's own list does not, so
the claim is not satisfied. The fix belongs to CL8 because CL8 already wrote the instrument that
makes the comparison — `units/cl8-emission.mjs` compares the built cascade's grid selectors and
conditions against the record minus deferrals, with controls that reject a removed condition and an
added withheld selector. It sits in a launch directory as a one-off rather than shipping as a
proof. Retaining it closes the claim.

Extending that comparison to every key is the cross-cutting work the objective lane named, and it
is not CL8's. It is recorded with the value-accounting finding in
`units/value-accounting-finding.md` for the user's decision after this family closes.

### What the round established

**The accounting is complete and the extraction is exact.** Three lanes reconciled the record
against the built cascade by different means and agreed: every recorded grid selector ships at its
condition, nothing extra ships, every withheld name is absent and carries a deferral row naming the
unit that closes it. Two lanes independently derived the percentage arithmetic and matched it to
the record and to the installed Bootstrap. Two lanes ruled the extraction order-preserving by
reading the mixin bodies rather than by trusting the unit's instrument, and one of them compiled
the substituted and original sources to confirm it.

**The Orchestrator's first-party reading.** Before the round I compiled the styles entry unminified
and compared every recorded declaration of the three keys against the emitted one: no recorded
selector absent, and one difference — the breakpoint-scoped zero offset emitting a percentage zero
where the record has a unitless zero. Both lanes reached the same difference independently and both
ruled it computed-equivalent. **Accepted as a difference**, recorded here rather than closed.

Findings carried into round 2:

- **Objective 12, forcing.** The readings assertion re-derives its expectation with the same
  expression that constructs the value, so it cannot fail. Narrowing the construction would keep it
  green while the proof silently stopped reading the inactive side of every breakpoint, which is
  the reading the family exists to hold. The sibling proof already writes its rows as literals.
- **Objective 13.** The zero-boundary row is filtered out before the ramp comparison and dropped by
  the compiled ramp too, so neither its name nor its boundary is compared with anything, and its
  two consumers identify it by different fields. Bounded: renaming the ramp's zero member reddens
  downstream through a missing specimen.
- **Objective 14.** The ramp compilation is written twice in one file, which the tests rule makes a
  defect and the unit owns both sides of.
- **Objective 15.** An existing showcase assertion silently lost its discriminator when specimens
  were appended: the positional exclusion that once meant "outside the navigation specimen" now
  excludes a different specimen, and the navigation specimen satisfies the selector alone.

Settled without action: the objective lane referred the extracted mixin's name and content slot,
and the number of case tables over one ramp, to the subjective lane as shape questions. The
subjective lane confirmed the partial's coherence and raised neither as a defect. Under the
standing ruling that audits cover implementation only, neither is a finding.

Round 1 verdict: **fix round**, carrying the subjective lane's claim 6 and the objective lane's
findings 12, 13, 14, and 15. The checker and the verifier returned `Verdict: accept` on their own
slices.

## Round 2 (2026-09-21), the fix round under brief 4

The fix round closed both forcing findings and the three that rode with them. Claims:
`cl8-audit-claims-2.md`. Lanes, launched together and blind: analyst on Astra holding the SUBJECTIVE
lane (`units/cl8-audit-2-analyst-report.md`, Codex thread
`01a0c63c-2f0e-73f0-8008-cb07c652e050`, exit 0); reviewer on Opus 5 holding the OBJECTIVE lane
(`units/lane-cl8-2-reviewer.md`, workflow `wf_9f0ebbc3-9f2`); checker on Sonnet
(`units/lane-cl8-2-checker.md`); verifier on Sonnet (`units/lane-cl8-2-verifier.md`) over
`units/cl8-gate-2-brief.md`.

| Claim | Reviewer (objective, Opus) | Analyst (subjective, Astra) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 the emitted vocabulary is bound to the record | CONFIRMED (**traced every operand to its source**: the cascade through the reader the conformance proof uses, the record through the raw pinned fixture rather than the projecting reader — which is necessary, because that reader drops the condition the comparison needs — and the deferrals through their parser. The comparison retains duplicates and is pinned to do so, and the notation equivalence is real: the artifact and the record spell the same condition differently) | CONFIRMED (**ran the collector read-only against the live artifact** and rejected an omitted selector, an added one, a duplicate conditioned one, and an emitted deferred name) | CONFIRMED (confirmed the collector returns a sorted array with duplicates retained rather than a set) | `test:setup` exit 0, its case total risen by the round's new cases |
| 2 it reddens in both directions | CONFIRMED on falsifiability by construction; the runs report-only. **Ruled on the plant site**: the built-artifact plant proves both directions, and the source-to-cascade step is closed by round 1's own attack and by the gate chain rebuilding before this project runs. The residual — a source edit in a run that does not rebuild — is finding 7 | UNDECIDABLE for the historical runs; **repeated the source attack itself in memory** and found the retained comparison rejected the selectors an extended step list emits | Report-only, as the claim states | — |
| 3 the assertion that could not fail is falsifiable | CONFIRMED (the readings are a literal table with no reference to the constructing expression, and round 1's self-derivation is gone from the diff) | CONFIRMED on implementation; **ruled the literal form the right trade**: a wrong literal disagrees with the construction, while a changed boundary still faces the separate ramp binding, so re-pinning keeps an independent check that re-derivation would destroy | — | — |
| 4 the three non-forcing findings are closed | CONFIRMED (**ruled the zero-row binding against the failure it was named for**: the ramp compiler no longer filters the zero member, so a second zero entry changes exactly one operand and reddens on either side; both consumers key on boundary; the extracted function has its callers and its place in the exports set; the showcase selector addresses the specimen by an attribute that carries its name) | CONFIRMED (**rejected an added table name, an added ramp name, and a duplicate table name** in memory) | CONFIRMED (confirmed the compiler derives from every breakpoint and buckets in code, so a second zero key inflates the compared array) | — |
| 5 nothing round 1 accepted moved | CONFIRMED (**compared blob hashes across the two patches**: the partial, the mixins, the container, the barrel, the guide, the listing, and the granted conformance assertion are identical in both) | CONFIRMED | CONFIRMED by the same comparison | — |
| 6 scope, law, gates | CONFIRMED on scope, delta, and law (**ruled each near-miss**: the JSON default import is not a default export, and the two type positions typecheck for reasons it names); the gate half report-only | UNDECIDABLE as a whole; scope and law confirmed | CONFIRMED on scope and law; the gate half plainly outside the slice | **every step exit 0 on managed Chromium and Edge, status identical before and after**, scaffold audit clean on the planned paths |

Reconciliation. Every claim's substance is confirmed by every lane that could rule on it, and the
lanes agree on which halves are report-only. The gate half three lanes referred is closed by the
verifier's own chain.

**The question round 1 left open is closed from both ends.** The Orchestrator asked whether planting
in the built artifact leaves the source-to-cascade step unproved, since round 1's attack was at
source. The objective lane ruled that the step is closed by round 1's attack and by the gate chain's
own build ordering. The subjective lane did better than rule: it re-ran the source attack itself and
watched the retained comparison reject what an extended step list emits. So the chain holds end to
end — a source edit reaches the cascade, and a cascade discrepancy reddens the assertion.

**The proof is stronger than the unit's own controls established.** Between the two judgment lanes
the retained collector was attacked with an omitted selector, an extra selector, a duplicate
conditioned selector, an emitted deferred name, an added table name, an added ramp name, and a
duplicate table name. Each was rejected. The duplicate case matters beyond this unit: it confirms
the multiset behaviour that CL8b's two-rule gutter shape depends on.

**The Orchestrator's first-party reading.** Before the round I confirmed that the project reading the
built artifact runs no build of its own, that the reader throws on a missing artifact rather than
passing, and that the conformance proof already reads the same artifact the same way. That is the
substance of finding 7, and both lanes reached it independently.

Findings, none forcing:

- **Objective 7, to a successor unit.** The new proof reads the built artifact from a project that
  runs no build, so a source edit followed by that project alone reads the previous build and
  passes — the exact failure the proof exists to catch. It does not force a round because this is
  the tree's established posture rather than something the round introduced: the conformance proof
  reads the same artifact through the same reader from a project with no build step, and the gate
  chain rebuilds before either runs. Closing it means making the build a prerequisite of the
  projects that read the artifact, which touches a file no brief granted.
- **Objective 8, a watch item.** The extracted ramp compiler imports `sass` dynamically from a
  module the browser styles project loads as a setup file, where before this round that module
  referenced no Node-only package. The risk is the dependency optimizer reloading the page mid-run
  and failing a case unrelated to the change; the unit's own report notes one such reload. **The
  authoritative independent run is green on both engines**, so the risk is latent rather than live.
  Watch it on the next authoritative run of the browser projects.
- **Objective 9, to whichever unit first ships a downward-condition family.** The condition
  normalizer equates only the minimum-width spelling, so a family recorded under a maximum width and
  emitted through the downward mixin would redden though the conditions agree. Inert today: every
  grid condition in the record is a minimum width and the partial emits only the upward mixin.
- **Objective 10, to the same successor as finding 7.** The built-side population anchors its prefix
  test at the start of the selector and collects only media ancestry, so a grid class emitted as a
  descendant of another selector, or moved into a different layer or wrapped in a support condition,
  is invisible to the "nothing extra ships" half. Inert today: nothing in the tree emits either
  shape and the whole cascade is one layer block.

Round 2 verdict: **accept**. Every lane's terminal line was `Verdict: accept`.

## Acceptance

CL8 is accepted on both rounds. The grid ships the row, its column children, the row-column counts,
the columns, and the offsets, at every condition the record carries, with nothing extra and every
withheld name deferred to the unit that closes it. The emitted vocabulary is now bound to the record
in both directions, which is the accounting this family exists to produce, and the binding was
attacked from seven angles across two lanes without a survivor. The declaration values match the
record once the logical-property ruling is applied, with one computed-equivalent difference recorded
rather than closed. The extraction left the container's cascade byte-identical, proved by reading the
substitution and by compiling both forms. Gates green on managed Chromium and Edge under an
independent verifier, with the status identical before and after.

Carried forward:

- **To CL8b**, which ships the step utilities: the `.row-gap-*` deferral rows to delete, and the
  multiset behaviour that fixes its two-rule gutter shape.
- **To a successor unit**, with the accounting finding in `units/value-accounting-finding.md`:
  findings 7 and 10, both about the built-side reading — a project that reads the artifact without
  building it, and a population that misses a re-layered or descendant-combinator emission.
- **To whichever unit first ships a downward-condition family**: finding 9.
- **As a watch item on the next authoritative browser run**: finding 8.
- **Accepted as a difference**: the breakpoint-scoped zero offset emitting a percentage zero where
  the record carries a unitless zero.
