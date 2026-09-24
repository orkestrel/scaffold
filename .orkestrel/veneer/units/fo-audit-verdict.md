# OVERLAY-FRAMES (`fo`) audit round 1 — the Orchestrator's verdict

Claims: `fo-audit-claims.md`. Lanes, blind on that one file:

- the objective lane, `analyst` on GPT-6 Astra (`fo-audit-objective-verdict.md`);
- the subjective lane, `reviewer` on Opus 5.5 (`fo-audit-subjective-verdict.md`);
- the checker, `checker` on Sonnet, on claims 1, 6, and 9 (`fo-audit-checker-verdict.md`).

The unit was written by `opus` on Opus 5.5, so the objective lane ran on an engine that did not write it.

## Per claim

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Scope | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 P11 | CONFIRMED | CONFIRMED | — | CONFIRMED; the final case's own red and mutation runs are carried |
| 3 The resting residue | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 P12 | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 5 The next control | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 6 The roleless alert | CONFIRMED | CONFIRMED | UNRESOLVED | CONFIRMED |
| 7 The header strip | UNRESOLVED | CONFIRMED | — | The ruling stands; its wording narrows |
| 8 The frames | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 9 Law and report | BROKEN | CONFIRMED (report defects listed) | BROKEN | BROKEN in the report |

- **Claim 2.** The subjective lane: the retained red run and the `picture-own-width` run cover the six-width draft,
  and the final case visits eight widths. The superset argument holds for the assertion, but a run of the final
  case is the proof; round 2 retains it.
- **Claim 6.** The checker left it unresolved because the only reddening record is the writer's log; both lanes
  read the assertions and named how they distinguish the `plain-alert-fill` mutation. Confirmed.
- **Claim 7.** The subjective lane's reading settles the ruling: the strip paints the header's own fill with a zero
  top border, so no magnification separates the strip from the header behind it. The objective lane's point
  also holds: the probe measured two scales without a stated visibility criterion. The TSDoc, the guide patch,
  and the report state the mechanism (the strip is the header's own fill over the header) rather than a claim
  about every magnification.
- **Claim 9.** The report carries tallies, temporal words, "Criterion 3", and code tokens without nouns (both lanes'
  lists). A successor report corrects them.

## Outside the claims

| Finding | Lane | Ruling | Carrier |
| --- | --- | --- | --- |
| RED-FIRST-ORDER: the next-control case ran green before its registry-removal red run | objective | Confirmed as a process deviation; the mutation shows the assertion discriminates | Recorded here; round 2's report labels that run a post-fix mutation run |
| F-popover-copy: `POPOVER_COPY` invites a comparison of the strip no frame shows | subjective | Confirmed | OVERLAY-FRAMES round 2 |
| F-second-carousel: the next-control case title names its subject by position | subjective | Confirmed | OVERLAY-FRAMES round 2 |
| F-white-mark: the next-control comment calls the marks white in every mode; one line is unwrapped | subjective | Confirmed | OVERLAY-FRAMES round 2 |
| The dark theme paints the captioned carousel's caption, pips, and chevrons black over its dark pictures (mark strength 32 at `dark-390`) | the unit's observation; subjective referral 2 | Confirmed from the frame; the release's dark carousel paints dark marks for light imagery | OVERLAY-FRAMES round 2 |
| The reach fix is keyed to the `lg` boundary while the limit is the runner's 800-pixel window | subjective referral 3 | Confirmed as an observation; no journey variant falls between 800 and 991 | FRAME-HELPERS, which owns the shared lift |

VERDICT: FAIL 9; claim 7 narrowed; outside the claims: F-popover-copy, F-second-carousel, F-white-mark, the dark captioned carousel — carried by OVERLAY-FRAMES round 2 (`b-overlay-frames-brief-2.md`).
