# E-ID-MOTION-FACTOR audit — verdict

The Orchestrator's reconciliation of the audit round over E-ID-MOTION-FACTOR, on one claims file (`mfac-audit-claims.md`):
the objective lane, `analyst` on GPT-6 Astra (`mfac-audit-objective-verdict.md`, thread
`01a0d74b-237b-7ec2-8293-e583f253c93a`), and the subjective lane, `reviewer` on Opus 5.5
(`mfac-audit-subjective-verdict.md`), blind to each other. The writer was `opus` on Opus 5.5, so the objective lane ran on
an engine that did not write the work. No checker ran: no claim is a count or a path the lanes did not read.

**Verdict: FAIL 2, 5; claim 7 withdrawn; outside the claims: F1 (carried), F2, R2.** Every owned transition scales, the
proofs kill a restored literal, and the ledger rows hold.

| Claim | Objective (Astra) | Subjective (Opus 5.5) | Ruling |
| --- | --- | --- | --- |
| 1 Every owned transition scales | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The per-site form | CONFIRMED | BROKEN | BROKEN |
| 3 The proofs | CONFIRMED | CONFIRMED | CONFIRMED |
| 4 The ledger rows | CONFIRMED | CONFIRMED | CONFIRMED |
| 5 The § Factors paragraph | BROKEN | CONFIRMED | BROKEN |
| 6 The engine pin | CONFIRMED | CONFIRMED | CONFIRMED; carried to the engine session |
| 7 The shared-file patch | CONFIRMED | UNRESOLVED | withdrawn: claim 2's fix leaves it no caller |
| 8 Scope and gates | CONFIRMED | CONFIRMED | CONFIRMED |

- **Claim 2 (subjective).** The floating label and the progress bar write `calc(<ms> * var(--vn-factor-motion))` in the
  partial, so the factor substitutes on the component's own element; every motion token substitutes it once at the
  `:root` selector. A subtree that sets the factor alone therefore slows those two sites and no other, which falsifies
  the guide's own rule that a subtree setting a factor alone keeps the root's values, and departs from the design
  verdict's opening: every value reads a `--vn-*` token. The Orchestrator rules the reviewer's recommended form: each
  site writes a multiple of `--vn-motion-feedback` (`calc(var(--vn-motion-feedback) / 1.5)` for the label's `100ms`,
  `calc(var(--vn-motion-feedback) * 4)` for the bar's `600ms`), which keeps every factor read in `_tokens.scss` and
  follows the partial's own convention for lengths. The comments give the reason by the kind of motion, never by value.
- **Claim 5 (objective).** § Factors says a scaled duration resolves to the release's value at a factor of `1`; the
  `.icon-link` transform reads the `150ms` feedback token where the release writes `200ms`, a departure the ledger
  already records. The paragraph must say that each duration doubles from its own resting value, and restrict the
  release-value equality to the transitions that keep a release duration.
- **Claim 6.** The Tab pin is the engine session's; `plan.md` carries it to J-MOTION-PROOFS-B.

## Findings outside the claims

- **F1 (subjective), carried.** The collapse, modal, offcanvas, and carousel sections say no published motion token
  resolves to their durations, so the factor does not rescale them, while this unit's text scales a duration no single
  token resolves to. Each section changes when its motion unit lands: E-ID-MOTION-COLLAPSE, E-ID-MOTION-MODAL (writing;
  its brief owns the § Modal prose), E-ID-MOTION-OFFCANVAS, and E-ID-MOTION-CAROUSEL, each of which also strikes its own
  name from the § Factors exception list.
- **F2 (subjective), accepted.** The accordion comment "reads the feedback token the accordion declares it over" does
  not read once, and one fact is written two ways ("which no motion token resolves to", "no published token resolves to
  that easing").
- **R2 (subjective referral), accepted.** The factor sweep (set the factor, mount, drive, sample, clear) repeats inline
  across the new cases and in `fade.test.ts`; `.claude/rules/tests.md` places a routine another test can use in a setup
  module, exported and proved.
- **R1, R3, R4.** R1 (the subtree reading) is executed by the case round 2 adds. R3: no transition runs on the
  accordion button's border, so the ledger row is its guard, which holds. R4 is moot with claim 7 withdrawn.

## Carrier

E-ID-MOTION-FACTOR round 2 (`e-id-motion-factor-brief-2.md`, `opus` on Opus 5.5).
