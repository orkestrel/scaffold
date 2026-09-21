# CL7 audit verdict — the container family and the gutter

Subject: unit CL7 in Veneer over the base `c8f53f8` (the CL6 landing), written by `sol` on Astra
under `units/cl7-brief.md` with `units/cl7-brief-2.md` and `units/cl7-brief-3.md` above it.
Reports: `units/cl7-report.md` for the implementation and `units/cl7-report-2.md` for the fix
round. Terrain: `units/cl7-scout-report.md`. Scope read: `units/cl7-scope-read-report.md`.
Rulings: `units/cl7-rulings.md`. Claims: `cl7-audit-claims.md` and `cl7-audit-claims-2.md`.
Evidence: `units/cl7-diff.patch.txt` with `units/cl7-status.txt`, and
`units/cl7-diff-2.patch.txt` with `units/cl7-status-2.txt`.

## Round 1 (2026-09-21)

Lanes, launched together and blind: analyst on Astra holding the SUBJECTIVE lane
(`units/cl7-audit-analyst-report.md`, exit 0; Astra wrote the unit, so the lanes swap and the
writer's engine never holds the objective lane); reviewer on Opus 5 holding the OBJECTIVE lane
(`units/lane-cl7-reviewer.md`, workflow `wf_4dc4a29b-620`); checker on Sonnet
(`units/lane-cl7-checker.md`); verifier on Sonnet (`units/lane-cl7-verifier.md`) over
`units/cl7-gate-brief.md`.

| Claim | Reviewer (objective, Opus) | Analyst (subjective, Astra) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 every selector ships, none excluded | CONFIRMED (**enumerated the key's selectors from the pinned inventory and compared them against the built cascade in both directions**: the shell group, the accumulating cap groups at every declared boundary, the navigation combinators; nothing extra ships and the fluid variant takes no cap) | CONFIRMED (compiled and compared in memory; the loop reads as a legible progression rather than written-out rules) | CONFIRMED (**reproduced the comparison against `inventory.json` and `dist/src/styles/index.css` independently**) | — |
| 2 the presence scan guards them | CONFIRMED in-tree (**verified the retained case's preconditions rather than its wording**: rewriting the combinator leaves exactly one inventory selector unmatched, so the diagnostic names that component and selector); the plant run report-only | CONFIRMED (ran the scanner in memory over the cascade and its mutated copy); the plant run report-only | CONFIRMED (the plant is an in-memory string transform inside the case, so no residue can reach the tree) | `test:conformance` exit 0 |
| 3 the navigation combinators ship | CONFIRMED (the combinators carry self-contained layout on the container, and no rule anywhere under the source defines the navigation class, so the rule matches nothing until a consumer brings the markup) | CONFIRMED (parsed the built cascade and found no standalone navigation rule) | — | — |
| 4 the widths and the gutter take registry-backed tokens, the ramp unchanged | CONFIRMED (**the path law and the `:root` set assertion together force a declared token to have a leaf and the reverse**; the cap reads its own token through the loop, no literal; the ramp function is absent from the status) | CONFIRMED (the names follow the established boundary vocabulary and the axis vocabulary, and no Bootstrap map structure was imported) | CONFIRMED | `test:src:core` and `test:src:styles` exit 0 |
| 5 the blast radius was measured and nothing moved | CONFIRMED on the code (**enumerated the space member's consumers independently**: its registry entry and the density assertion, no partial reading it through a variable; the gutter declaration carries no density factor, so retuning density cannot move a container); the readings report-only | CONFIRMED; the before-and-after readings report-only | — | — |
| 6 the width is read, at and around every boundary | CONFIRMED on the mechanism (**traced the expected-cap expression against Bootstrap's mapping at every case and re-derived the visitor's triplets**, which straddle every declared boundary; the readings are resolved values taken after a real viewport resize, not the token); the durations report-only | CONFIRMED (the case table, the variant activation, and the expected payload widths stay separable, which is what re-pinning needs) | — | — |
| 7 that width reading is falsifiable | The plant run is report-only, **but an independent retained control does exist**: a case sets each container token on the element and asserts the resolved and used width follow it, so a literal cap or a cap reading the wrong token reddens in-tree | CONFIRMED on the retained red-and-green logs; the run report-only | — | — |
| 8 the key is listed with the rows the deciding function requires | CONFIRMED (**the key's projected properties are non-empty, so the empty-properties branch cannot admit it and a shipped variable row is required**; the guide's rows are the required ones and their facts are true of the partial and the proof) | CONFIRMED (ran the admitting function: it admits the key, and withholds it when the variable rows are removed) | CONFIRMED | `test:guides` exit 0 |
| 9 the sweep reports no shared block | CONFIRMED (the new partial's only cross-partial overlaps are single declarations, below the threshold; the mixins file is in the population and absent from the status) | CONFIRMED (ran the sweep in memory with the mixins file and the new partial in the population) | CONFIRMED | `test:setup` exit 0 |
| 10 the showcase section extends the shared base | CONFIRMED (the section adds only its copy and table binding; the specimens cover capped, fluid, each responsive variant, and a navigation parent per variant) | CONFIRMED; visual polish unassessed without a capture | — | `test:app:browser` exit 0 |
| 11 scope, law, gates | CONFIRMED on scope and law (**read every added line**: no `any`, no assertion outside `as const`, no non-null assertion, no suppression, no visibility modifier, no parameter property, no default export, no skipped case, no plant residue); the gate half report-only | UNDECIDABLE as a whole; the scope portion confirmed | CONFIRMED on every sub-part the lane can evidence; the gate exits UNRESOLVED and explicitly not grounds for a fix round | every step exit 0 on managed Chromium and Edge, **status identical before and after**, scaffold audit clean on the planned paths |

Reconciliation. Every claim's substance is confirmed by every lane that could rule on it. The
lanes agree on what is report-only and each names the same runs.

**Completeness, which is what this family exists to produce.** Two lanes independently extracted
the key's selector set from the pinned inventory and compared it against the built cascade in both
directions, and found them equal: every recorded selector ships, at the condition it is recorded
under, and no container selector ships that the inventory does not carry. The fluid variant takes
no cap, which the inventory also records. No deferral row names an excluded selector. That is the
accounting a future Bootstrap major needs.

**Where claim 7 actually rests.** Its plant run is the writer's own, so it evidences nothing
alone. The objective lane did not stop there: it found a retained in-tree control that sets each
container token on the element and asserts the resolved width follows, which reddens on a literal
cap or a cap reading the wrong token. The claim's substance survives on that control rather than
on the plant.

**The Orchestrator's first-party reading.** The verifier's chain ran the whole gate set on both
engines with the status identical before and after, so the gate half of claim 11 — report-only for
the reviewer, unresolved for the checker, undecidable for the analyst — is closed by the lane that
owns it.

Findings, none forcing:

- **Objective 12, carried into round 2.** The container proof wraps every case in a direction
  axis, and every property it asserts is symmetric under the writing mode: the logical sizing
  resolves the same way, the two padding sides are asserted equal, the two margin sides are
  asserted equal. The half the axis adds cannot fail unless the other half already has, so it
  doubles the real viewport round-trips for no reading. It is also the only direction axis
  anywhere under the styles proofs, and it runs against the standing ruling that Veneer spends
  nothing on RTL variation.
- **Objective 13, carried into round 2.** The cap loop iterates the ramp and reads a container
  token per boundary, while the only ramp-to-token assertion runs one way: each width case has a
  ramp entry, never that each non-zero ramp member has a container token. Failure scenario: a
  later layout unit adds a ramp boundary; the loop emits a cap whose variable names nothing, the
  declaration is invalid at computed-value time, the cap falls back to none, and the new boundary
  silently caps nothing while the token set assertion, the presence scan, and the container proof
  all stay green.
- **Objective 14 and 15, folded into CL8 as bounds.** Ordering slips in the showcase wiring and
  the setup case tables against the alphabetical order the surrounding lines hold, and a type
  annotation on the new copy constant that every sibling copy constant does without. Neither has a
  gate or a failure scenario. CL8 writes the same files for the grid family and carries both.

**Referred to CL12, which owns the guide.** The objective lane read, outside its own narrowing,
that the guide describes the space scale's twelfth member as read by the gutter scale. After CL7
the gutter is an independent token and nothing reads that member, so the sentence states a fact
that is no longer true of the code. The container and gutter tokens also have no row in the
guide's token tables, and no gate requires one. Both belong to the guide unit.

**Dispatch defects, mine.** The objective lane's brief named CL6's subject files in its Evidence
section rather than CL7's, so the lane worked from the rendered diff instead; and the briefs
pointed at a rules directory inside the Veneer checkout, which does not exist, so both lanes read
the law from the scaffold checkout on their own. Both are recorded in the handoff's standing
rulings as rules for deriving a brief: rewrite the subject files as well as the lane focus and the
evidence paths, and name the law at its real path.

Round 1 verdict: **accept**, with the two carried findings sent back as a fix round under
`units/cl7-brief-3.md`. Every lane's terminal line was `Verdict: accept`.

## Round 2 (2026-09-21), the fix round under `units/cl7-brief-3.md`

The fix round closed round 1's two carried findings and nothing else. Claims:
`cl7-audit-claims-2.md`. Lanes, launched together and blind: analyst on Astra holding the
SUBJECTIVE lane (`units/cl7-audit-2-analyst-report.md`, Codex thread
`01a0c5d0-bdec-77b0-98fc-6700f22ffcf1`, exit 0); reviewer on Opus 5 holding the OBJECTIVE lane
(`units/lane-cl7-2-reviewer.md`, workflow `wf_7d881a64-594`); checker on Sonnet
(`units/lane-cl7-2-checker.md`); verifier on Sonnet (`units/lane-cl7-2-verifier.md`) over
`units/cl7-gate-2-brief.md`.

| Claim | Reviewer (objective, Opus) | Analyst (subjective, Astra) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 the ramp and the container token set are asserted equal | CONFIRMED (**the assertion compiles the same `breakpoints()` the tokens file and the partial walk, not a restated list**; the zero member is the only one excluded; set equality reddens in both directions. The lane went further and closed the whole chain: ramp name to registry key by this assertion, registry key to declared custom property by the `:root` set assertion, so the path the finding named cannot open silently) | CONFIRMED (**built its own read-only controls and rejected an unmatched member on either side**; the assertion's placement beside the container tables states the relationship without giving either production file ownership of it) | CONFIRMED (quoted the assertion and confirmed the comparison is order-independent and symmetric) | `test:setup` exit 0, its case total risen by the new case |
| 2 that assertion fails on the path the finding named | Report-only for the run; **falsifiability CONFIRMED from the assertion's shape** (the planted member lands in one set and not the other, so set equality fails) and **the plant is gone**: the ramp carries its original boundaries and the mixins file is absent from the status. An empty ramp fails rather than passes | CONFIRMED on the retained logs; **hashed the mixins file and its pre-control copy independently and matched the recorded digest**; the run report-only | Report-only | — |
| 3 the direction axis is gone and every reading is retained | CONFIRMED (**diffed the proof against round 1's copy line by line**: the only textual differences are the wrapper and the direction attributes; every assertion, expected value, variant, boundary visit, gutter override, navigation reading, and the token suite are identical. The axis was genuinely unfalsifiable — the attribute alone does not switch the loaded cascade, which only the tokens proof loads) | CONFIRMED (the suite still presents boundary visits, gutter overrides, and navigation as their own case families, with token retuning separate) | CONFIRMED (hunk-by-hunk, a duplicated axis removed cleanly rather than a dropped reading) | `test:src:styles` exit 0 on both engines |
| 4 the saving is measured | **Case totals CONFIRMED by independent derivation from the case tables**, matching the reported before and after; the durations report-only | CONFIRMED against the retained records; report-only | Report-only | — |
| 5 nothing round 1 settled moved | CONFIRMED (**compared every file's pre- and post-image blob hashes across the two rendered diffs**: only the two proofs differ. Re-read the guide's compatibility rows against the built cascade and found their facts still true, with the fluid variant still absent from the capped list) | CONFIRMED; round 1's rulings remain closed | CONFIRMED by the same blob comparison | — |
| 6 scope, law, gates | CONFIRMED on scope and law (**read every added line and ruled each near-miss**: the type arguments and annotations are not assertions, the negation is not a non-null assertion, and the new case is named for what it proves rather than for the control). Gate half referred to the lanes that own it | UNDECIDABLE as a whole, gate evidence not in the lane; scope and law confirmed | CONFIRMED on every mechanical sub-fact through its own probes; gate half referred | **every step exit 0, status identical before and after**, styles 52 files on both engines, scaffold audit clean on the planned paths |

Reconciliation. Every claim's substance is confirmed by every lane that could rule on it, and the
lanes agree on which halves are report-only. The gate half that three lanes referred is closed by
the verifier's own chain.

**What closed the silent-failure path.** The objective lane did not stop at the new assertion. It
followed the chain the finding's scenario runs through — ramp member, registry key, declared
custom property, emitted declaration — and found each link now asserted, so a ramp boundary added
without its token reddens at the first link instead of emitting a cap whose variable names
nothing. That is the difference between an assertion that exists and a path that is closed.

**What the removal cost.** Nothing. Three lanes compared the proof against round 1's copy by
different means — line-by-line text, hunk-by-hunk, patch-to-patch — and each found the wrapper and
the direction attributes as the only difference. The objective lane also settled why the axis could
not fail: the direction attribute alone does not switch the loaded cascade, because the mirrored
cascade is loaded by the tokens proof alone.

**The Orchestrator's first-party reading.** Before the lanes returned I read the assertion, the
proof, and the sweep case directly, and compared the two diffs' blob hashes myself. The assertion
compiles the real ramp and compares symmetrically; the proof retains the boundary sweep, the
gutter overrides, the navigation combinator with its standalone comparison, and the per-token cap
retune; the sweep case asserts its own population before asserting nothing is shared, so it is not
degenerate; and exactly two blobs differ between the rounds. The live status matches the retained
status path for path.

Findings, none forcing:

- **Objective 7, folded into CL8 as a bound.** The container variant table is a literal list, and
  the case that guards it compares it against a copy of itself, so nothing binds the variant list
  to the ramp. Failure scenario: a later unit adds a ramp boundary with its token, its declaration,
  and its boundary-visit entry; the new variant class then ships with no browser reading of its
  own. The lane measured the blast radius rather than asserting it: the cap value is still caught,
  because the expected cap is computed from the width table and returns a stale entry at the new
  boundary, and separate assertions already drive the author into these files. CL8 adds its own
  ramp-derived tables to the same file and carries this: derive a variant list from the ramp rather
  than restating it.

**Dispatch defect, mine.** The objective lane's brief named this verdict file as a required read,
and it did not exist when the round launched — I wrote its round-1 section while the lanes were
running. The contract requires every file an effective brief names to resolve from the executor's
root before dispatch. The lane ruled the claim it was needed for from the two rendered diffs and
the live tree instead, which is stronger evidence, so no verdict moved. Recorded as a rule already
in force rather than a new one.

**A second defect, mine, in this round's own kit.** The workflow's description still named CL5 and
its objective node was labelled subjective, both carried over from the workflow this one was
derived from. Each lane opened its own brief, which assigns the lanes correctly, so no lane read
the wrong instruction. This is the third round in which a derived launch artifact carried a field
from its source, so the rule is now in `.agents/orchestration.md` § Dispatch anatomy: rewrite every
field naming the subject — brief lane focus, evidence and report paths, subject files, the law's
path, the claims file's subject line, each script's header and paths, the workflow's description
and every node label — and read the derived copy start to finish before launching it.

Round 2 verdict: **accept**. Every lane's terminal line was `Verdict: accept`.

## Acceptance

CL7 is accepted on both rounds. The container key ships every selector the pinned inventory
records under it, at the condition it is recorded under, with nothing extra; the key reads
`shipped` and joins the listed set. The caps are emitted from the ramp and now bound to their
tokens in both directions. Independent controls guard the selector set, the width reading, and the
ramp-to-token relationship. Gates green on managed Chromium and Edge under an independent verifier,
with the status identical before and after.

Carried forward: **objective 7** (bind a variant list to the ramp) and round 1's **objective 14 and
15** (ordering and an annotation in the showcase wiring and the setup tables) to CL8, which writes
those files next; and round 1's **guide referral** (a token-table sentence that stopped being true
of the code when the gutter became its own token, and the container and gutter tokens having no
token-table row) to CL12, which owns the guide.
