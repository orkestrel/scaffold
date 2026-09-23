# B-FORMS-GROUP, round 2 (the fix round) — round verdict (reconciled by the Orchestrator, 2026-09-23)

Lanes that ran on `bfg-fix-audit-claims.md`, blind to each other: `analyst` on GPT-6 Astra
(`bfg-fix-audit-analyst-verdict.md`, FAIL 6, 10; outside the claims: the audit-provenance and the
stale journey comment) and `reviewer` on Opus 5.5 (`bfg-fix-audit-reviewer-verdict.md`, FAIL 2, 6,
10; F1 to F4).

## Rulings per claim

1., 3., 4., 5., 7., 8., 9. **CONFIRMED** by both lanes with the attacks named.
2. **CONFIRMED**: the analyst reconstructed and compiled the round-1 partial byte-identical to the
   `@each` form, with the `sm`-first control differing; the reviewer's UNRESOLVED closes on it. The
   tuple form and the grouped sized-select rule stand (both lanes).
6. **CONFIRMED by the Orchestrator's readings**: both lanes reproduced or accepted the `light-1280`
   seam reading and left the other variants unread. The Orchestrator cropped each focus frame's
   declared region with the writer's `crop.cjs` (`bfg-seam/crop.cjs`; `dark-1280` at 4× over x 1100
   to 1280, `light-390` and `dark-390` at 3× over the full width) and read the crops
   (`bfg-seam/focus-<variant>.png`): at every variant the focus ring runs through the seam over the
   grouped button's leading border (a pale ring in the dark variants, a dark ring in the light
   ones). D29 holds at every variant.
10. **CONFIRMED by the verifier's evidence** at the landing chain (the analyst's own `npm run check`
    exited 0).

## Findings outside the claims

- **Analyst F1 / reviewer F3 (the ROADMAP patch's audit attribution):** the B-FORMS row is written
  by the Orchestrator's fold at the landing, naming `analyst` on Astra and `reviewer` on Opus 5.5 as
  the fix round's auditors. Closed at the landing.
- **Analyst F2 / reviewer F2 (the stale journey comment in `InputGroupSection.test.ts`):** carried to
  round 3 (the file is the unit's own).
- **Reviewer F1 (the journey comment overclaims the button's coverage of the seam):** round 3, with
  the reviewer's wording.
- **Reviewer F4 (the guide credits the element layer with chrome it does not write; "two neighbours
  paint one line" fails at the control-and-button seam until CONTROL ships the control's border):**
  round 3 rewrites the two sentences with the reviewer's wording, and the ROADMAP patch gains a
  B-FORMS-CONTROL row: recapture the input-group frames and confirm the one-line seam once
  `.form-control` ships its border.

## Dropped

None.

VERDICT: FAIL 6, 10; outside the claims: F1, F2, F3, F4

Reconciliation: claims 6 and 10 are settled by the Orchestrator's readings and the verifier's chain;
the findings outside the claims carry to round 3 (`b-forms-group-brief-4.md`, `builder`) and to the
landing's fold. GROUP is accepted for landing after round 3's checker pass.
