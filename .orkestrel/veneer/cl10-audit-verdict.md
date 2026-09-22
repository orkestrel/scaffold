# CL10 audit verdict — round 1

Subject: unit CL10, the `icon-link`, `ratio`, and vertical-rule keys, written by `opus` on native
Opus 5 from the CL9 landing `5e011a3`. Claims: `cl10-audit-claims.md`. Report: `units/cl10-report.md`.

**Verdict: fix round.** Forced by claim 6 and by objective finding 1. Nothing forcing reaches the
shipped cascade; both are test-quality defects in files CL10 owns.

## Lanes

| Lane | Role and engine | Outcome |
| --- | --- | --- |
| Objective | `analyst` on gpt-6-astra, journal `tmp/codex/cl10-audit-analyst.jsonl`, thread `01a0c74e-f798-7760-afec-52a6a2819f5e` | fix round, on claims 6 and 16 and its finding 1 |
| Subjective | `reviewer` on native Opus 5 | accept, with six non-forcing findings |
| Mechanical | `checker` on the native cheap tier | rulings on the mechanical subset, one refusal |
| Gates | `verifier` on the native cheap tier | green, `units/cl10-gate.log.txt` |

**The lanes are swapped from the CL9 round because Opus 5 wrote this unit**: Astra held the objective
lane and the Opus reviewer the subjective one. Every required lane ran.

## The contradiction, and how it was settled

The lanes disagreed on claim 6. Astra refuted it; the reviewer confirmed it. The Orchestrator ran the
admission expression first-party rather than weighing the arguments:

```text
refuse  ASCII longer       ".ratios"      ".icon-linkage"    ".vrs"
refuse  underscore longer  ".ratio_x"     ".vr_x"
ADMIT   non-ASCII longer   ".ratioé"      ".icon-linké"      ".vré"    ".tableé"    ".colé"
ADMIT   escaped longer     ".ratio\78"    ".vr\5f x"
```

**Astra is right.** The reviewer exercised only ASCII extensions and generalized from them. Its
confirmation is discarded on this claim alone; a sample of its other citations resolved exactly, and
its remaining readings stand.

The reviewer is also internally inconsistent on claim 8: its claim-13 reading establishes that the
new icon-class assertion rejects an added `.bi` combinator, which is precisely the extra-selector
catch its claim-8 answer denies. Astra resolved that correctly too.

## Rulings

Claims 1 through 5, 7, 9 through 15, and 17 through 25 are CONFIRMED. Both lanes named a failing
mutation for every claim about a proof, which is what the round required.

- **Claim 6 — REFUTED.** `\w` is ASCII-only, so the negated class reads any non-ASCII letter as a
  boundary when non-ASCII letters are valid CSS identifier continuations. The defect predates CL10:
  `.tableé` and `.colé` are admitted through prefixes CL9 and earlier units added. CL10 extended a
  defective boundary rather than introducing the fault, and the defect is latent — no such selector
  exists in the built cascade or in Bootstrap's distribution, so nothing false ships. What is CL10's
  own is the new control case, which asserts the boundary refuses longer names while exercising ASCII
  only. It claims more coverage than it proves.
- **Claim 8 — REFUTED as to exclusivity, non-forcing.** The comparison is not the only assertion that
  catches an extra emitted selector: the icon-class binding pins the selectors mentioning the icon
  class to an exhaustive list and rejects a fourth. The campaign's standing description of the
  comparison is narrowed accordingly — it remains the only assertion that catches an extra selector
  anywhere in the admitted vocabulary.
- **Claim 13 — CONFIRMED on substance, with real brittleness.** The icon-class list equality is
  ordered over a `Set` filled in cascade order, so swapping the two selectors inside the hover rule
  reddens a change with no cascade meaning. Carried as non-forcing finding 3.
- **Claim 16 — CONFIRMED by the Orchestrator's own run.** Both lanes left it UNPROVEN: Astra had no
  browser surface and the reviewer holds no shell. The probe `units/cl10-shift-probe-2.sh` mutated the
  fallback from `0.25em` to `0.5em`, rebuilt, and read the proof:

  ```text
  AssertionError: expected 7 to be close to 3.5, received difference is 3.5, but expected 0.05
  ```

  The proof fails on a changed distance, so it is not vacuous. The same run settles the serialization
  premise in its load-bearing consequence: the failure landed on the painted-offset assertion while
  the preceding transform-string assertion PASSED under the mutation. A transform-string reading is
  therefore satisfied by a wrong distance, and the geometric reading is what discriminates — which is
  the reason the unit recorded. Source and cascade restored to their baseline digests
  `98c33f718832c8d6602e0ef68fa83725beb71f5bcffa451301a9b9e70483bd8f` and
  `0d8e87332f2184836faff4fe8f09aed307e7fafc0376f6dfbf5556a03ecadec2`.
- **Claim 22 — the checker refused it, correctly.** It reported UNPROVEN because its only evidence was
  the writer's own report of an empty sweep, and a read-only lane cannot run the sweep. The
  Orchestrator ran the case; it passes. The reviewer independently swept every declaration the new
  partials write and found no pair reaching the threshold. Confirmed on two readings, neither the
  writer's.
- **Claim 23 — CONFIRMED. The brief's premise was false and the Orchestrator owns it.** The scope read
  reported the reduced-motion preference unreachable after inspecting the browser page interface. The
  mechanism is an installed export, `stageMedia`, already driven by sibling proofs in the same tree.
  Both lanes confirm the refutation. Proceeding rather than stopping was correct: the blocked-objective
  test was not met, both readings lay in owned files, and the unit delivered the built-cascade reading
  the brief asked for **and** the staged reading. **The scope read's finding is struck, not carried.**
- **Claim 24 — CONFIRMED, and the correction is weaker than the fact warrants.** The reviewer supplied
  the stronger reason: the comparison compares selectors and enclosing conditions only — its own doc
  block states declaration values are not compared — so it would not have reddened on the precision
  scale even at full precision, before minification enters it. A successor brief must carry the
  corrected reason.

## Forcing findings

**Objective finding 1 — the nested reader in the icon-shift case.** Site: the local `offset` arrow
function assigned inside the case `shifts the icon on hover and on keyboard focus only while the hover
class is present`. `AGENTS.md` § Design laws states "No nested functions. Extract function
declarations and assignments from bodies", and its exceptions cover an anonymous callback passed
directly as an argument and an anonymous function returned directly as a result. This is neither.
`.claude/rules/tests.md` places helpers in setup modules rather than as local test-file clutter, and
the reader is used three times, so it is not trivial one-use logic to fold.

The `policy/no-nested-functions` rule exists but its `overrides` entry scopes it to the published and
application trees, so a green lint cannot detect this. **The Orchestrator first dropped this finding on
the reasoning that the override was a deliberate exemption for tests, and was wrong**: the law is
stated unconditionally, and an enforcement gap is not an exemption. No sibling styles proof declares
such a helper.

**Claim 6's boundary and its control.** The admission expression and the control case that covers it.

## Non-forcing findings, carried

Renumbered into one sequence; the subjective lane's own numbering collided with the objective lane's.

1. **The compatibility table now carries two granularities.** The brief's Obligation 2 asked for a
   selector row per family per key; the unit shipped one row per key and recorded no choice. The
   reviewer rules the per-key form the better contract, because the presence scan obliges a
   component's entire recorded vocabulary from a single row. Settle the campaign on the per-key form
   and fold the earlier keys' per-family rows into it in whichever unit next revises them. This is a
   convention change across landed keys, so it is not this fix round's.
2. **The ratio loop carries machinery Sass does not require.** Destructuring the aspect pair in the
   `@each` header emits the identical cascade while removing both `list.nth` lines and the list-module
   dependency.
3. **The icon-class selector list asserts an order it does not mean.** Sort both sides, as the
   vocabulary collector does for the same reason.
4. **The icon-link compatibility row is silent on its two value substitutions.** The underline reads
   Veneer's link triplet where the record reads Bootstrap's, and the transition reads the motion
   tokens where the record reads a literal duration and easing. The link row sets the precedent by
   naming its substitution in the Notes cell. A consumer retuning Bootstrap's documented custom
   property moves nothing, because the token file declares that name over Veneer's rather than the
   reverse.
5. **A no-op flush in the ratio case.** The awaited resolved promise performs no layout flush because
   the pixel reader forces layout itself, so it teaches an idiom that does not do what its position
   implies.
6. **The export list's literal order carries no meaning.** The icon-link markup constant sits out of
   alphabetical position and reads as an error until you notice both sides of the comparison sort. The
   Orchestrator checked this by running the case before reporting it, and it is not a defect; moving
   the entry removes the false signal for the next reader.

## Referred to the Orchestrator, not findings against this unit

**The departures mechanism only surfaces a name change, never a value change.** No test reads the
guide's departures, and the presence scan compares selector names and custom-property names, never
declared properties or values. A future Bootstrap major that dropped the prefixed backface property,
retuned the recorded transition, or replaced the physical translate would leave all three departure
bullets stale with every gate green, while the same release adding or removing a selector reddens the
presence scan at once. This is the same gap `units/value-accounting-finding.md` puts to the user, in
its second dimension. It is carried there rather than duplicated here.

**A helper key with no subject region has no showcase home.** The tree groups showcase sections by
subject, which is why these three specimens went to the Links, Media, and Layout sections rather than
to a new Helpers region, and the guide now states that rule. A visually-hidden key would have no
subject region, and the rule does not say what happens then. Carried as a bound for the unit that
ships such a key.

## Carriers

Every forcing finding is carried by **CL10's fix round**, named as the unit. Non-forcing findings 2
through 6 are carried by that same fix round, because each sits in a file it already opens.
Non-forcing finding 1 is carried by **the cross-cutting reconciliation unit** in
`units/value-accounting-finding.md`, which already holds the campaign-wide accounting decisions, and
the compatibility-table convention is one. The three findings in `units/setupstyles-carry.md` are
carried by **CL10's fix round**, which the carrier record named as their first opportunity: it opens
the styles setup module and its proof.
