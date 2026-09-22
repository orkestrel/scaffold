# CL9 audit verdict — the table key

Subject: unit CL9 in Veneer over the base `8c70787` (the CL8b landing), written by `sol` on Astra
under `units/cl9-brief.md`. Report: `units/cl9-report.md`. Terrain: `units/cl9-terrain.md`, measured
rather than scouted and the single home for this key's measurements — the brief restates none of
them. Scope read: `units/cl9-scope-read-report.md`. Claims: `cl9-audit-claims.md`. Evidence:
`units/cl9-diff.patch.txt`, `units/cl9-status.txt`.

## Round 1 (2026-09-22)

Lanes, launched together and blind: analyst on Astra holding the SUBJECTIVE lane
(`units/cl9-audit-analyst-report.md`, Codex thread `01a0c6f3-08f1-71d0-b0b7-493f3cf14255`, exit 0;
Astra wrote the unit, so the lanes swap); reviewer on Opus 5 holding the OBJECTIVE lane
(`units/lane-cl9-reviewer.md`, workflow `wf_676eee5e-743`); checker on Sonnet
(`units/lane-cl9-checker.md`); verifier on Sonnet (`units/lane-cl9-verifier.md`) over
`units/cl9-gate-brief.md`.

| Claim | Reviewer (objective, Opus) | Analyst (subjective, Astra) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 every selector ships, nothing extra, nothing deferred | CONFIRMED (**enumerated the record's entries and traced each to its emitter**, including that the zero boundary emits nothing because the downward mixin refuses it, so no zero-infix wrapper escapes) | CONFIRMED (**ran the comparison in memory**: `record: 29, emitted: 29, missing: [], extra: []`) | CONFIRMED | — |
| 2 listed with the rows the machinery requires | CONFIRMED (**counted the rows against the record's properties**, one selector row per family and a variable row per property) | CONFIRMED (**ran the accounting functions**: `shipped: ['table']`, presence scan clear, and removing a wrapper in memory produced the expected missing-selector failure) | CONFIRMED | `test:conformance` exit 0 |
| 3 the downward equivalence is arithmetic and correct | CONFIRMED (**checked the arithmetic in binary64 at every recorded boundary**, showing each product rounds to the exact integer because the representation error stays below half the unit in the last place; and ruled the direction preserved because the upward rewrite runs first and its output cannot match the downward pattern) | CONFIRMED (executed the mappings; upward and shifted boundaries stayed unequal) | CONFIRMED | — |
| 4 proved in both directions and on the boundary | Report-only; internally consistent with the code but not verified | CONFIRMED on the retained logs, with the live digest matched; **independently reproduced the discriminating comparisons in memory** | — | — |
| 5 the shared normalizer's blast radius | CONFIRMED — **overturned; see the reconciliation** | **REFUTED — forces the round.** The guard ignores whether the preceding colon was escaped, so an escaped colon before a genuine pseudo-class blocks normalization on both sides and leaves the two spellings distinct. **Proved by running the shared presence scanner**, which reported the selector missing | — | — |
| 6 the proof reads the browser | CONFIRMED, with a narrowing recorded: the comparison against the record's fixed colours runs in the default theme only, while the dual-theme case asserts contrast rather than recorded values | CONFIRMED on construction and the retained evidence | — | `test:src:styles` exit 0 on both engines |
| 7 the responsive wrapper is read on both sides | CONFIRMED (**ruled the probe discriminating**: it writes and reads a scroll offset, which stays at zero under one overflow and takes a value under the other, and the overflow control fails if the specimen stops overflowing — so a pass cannot come from a non-overflowing table. Answered the sub-question: the unconditioned wrapper's reading alone could pass with the breakpoint wrappers broken, but the five conditional cases carry those) | CONFIRMED | — | — |
| 8 the custom-property layering is read, not assumed | CONFIRMED — **overturned; see the reconciliation** | **REFUTED — forces the round.** The accent slot is never given a distinguishable value, so a literal in place of the fallback chain would read identically | — | — |
| 9 the departures are recorded | CONFIRMED (**reproduced the role-colour arithmetic against the record within the tolerance the proof applies**, role by role, and confirmed the controls pin the record's own inputs so a changed record surfaces rather than being absorbed) | CONFIRMED; no additional unrecorded departure found | — | — |
| 10 loops, no token | CONFIRMED | CONFIRMED (the existing stripe token carries the recorded factor; the token files are absent from the status) | CONFIRMED | — |
| 11 the sweep reports nothing shared | CONFIRMED | CONFIRMED (**ran the scanner against the live tree**) | CONFIRMED | `test:setup` exit 0 |
| 12 scope, law, gates | CONFIRMED on scope and law; gate portion referred | UNDECIDABLE as a whole; scope and law confirmed | CONFIRMED on scope and law | **every step exit 0 on managed Chromium and Edge, status identical before and after**, scaffold audit clean |

### Reconciling claims 5 and 8, and what separated the lanes

**The lanes contradict each other on both refuted claims, and the subjective lane is right on both.**
The Orchestrator verified each first-party rather than crediting either lane.

**Claim 5.** The branch that equates the two spellings of an even-child selector guards on the
preceding character being a colon, to avoid rewriting inside a legacy pseudo-element. It tests that
character alone. **The guard immediately after it, in the same function, tests both the character and
whether it was literal.** So an escaped colon — part of a class name — reads as a pseudo-element
marker to the first guard and blocks the rewrite, leaving a record spelling and a cascade spelling
distinct when they name the same selector. The objective lane read the escape machinery correctly and
concluded the escaped text is copied byte for byte, which is true and is not the question: the colon
*after* the escaped one begins a genuine pseudo-class and must still normalize. The subjective lane
ran the shared presence scanner and got the missing-selector diagnostic. **The adjacent guard is the
proof**: it already does what this one omits.

**Claim 8.** The case sets eight table variables and never sets the accent one, while asserting the
unstriped cell paints `transparent`. The objective lane read that assertion as proof of the accent
fallback. It cannot be: an unset variable and a literal in the fallback's place both yield
`transparent`, so the assertion does not discriminate between a chain that reads the accent and one
that ignores it. This is the same class of hole a sibling unit's audit found in a density case — an
assertion that passes whether or not the property it names holds.

**What separated the lanes is worth recording, because it is the second consecutive unit where this
split occurred.** On both claims the subjective lane either executed the thing or reasoned about what
an assertion can discriminate, and the objective lane reasoned from the code's structure. Structural
reasoning is what caught finding 13 below, which the subjective lane missed — so this is not a ranking
of lanes. It is a reason to keep both and to reconcile them by running the disputed thing rather than
by weighing the arguments.

### What the round established

Both lanes independently reconciled the record against the built cascade and agreed the key ships
whole with nothing extra and nothing deferred. The objective lane checked the downward arithmetic in
binary64 at every recorded boundary and showed why the rounding is exact, and ruled the direction
preserved by the order of the two rewrites. The subjective lane ran the accounting functions, the
comparison, and the shared-block scanner live. The verifier's chain is green on both engines with the
status identical before and after.

Findings carried into round 2:

- **Subjective 5, forcing.** The even-child guard must distinguish a literal colon, as its neighbour
  does, and the case must be pinned through the shared presence scanner.
- **Subjective 8, forcing.** The accent slot needs a distinguishable value, read on an unstriped cell,
  with stripe and state precedence then verified while it is set.
- **Objective 13, forcing.** The partial re-declares the shared role list character for character
  instead of using the token module's, which both sibling component partials already do. Failure
  scenario: a role added to the token source reaches the sibling families and not this one, and no
  gate sees it, because the record fixes this key's roles and the comparison compares against the
  record rather than against the token source. The repair changes no emitted byte.
- **Objective 14.** The freeze assertions omit one of the new tables and check only the container
  where the sibling proofs also assert each row.
- **Objective 15.** The state iterations leave a class applied and the pointer parked on the
  specimen, so a later reading can resolve a hover paint it never set. The same shape appears twice.
  Failure scenario: a layout change moves a specimen under the resting cursor and a contextual-colour
  case reddens on a colour it never applied.

Recorded, not carried: the objective lane's narrowing on claim 6, that the comparison against the
record's fixed colours runs in the default theme while the dual-theme case asserts contrast instead.

Round 1 verdict: **fix round**, carrying the subjective lane's claims 5 and 8 and the objective lane's
findings 13, 14, and 15. The checker and the verifier returned `Verdict: accept` on their own slices.
