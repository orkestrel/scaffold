# UTIL-FRAMES (`fu`) audit round 1 — the Orchestrator's verdict

Claims: `fu-audit-claims.md`. Lanes, blind on that one file:

- the objective lane, `analyst` on GPT-6 Astra (`fu-audit-objective-verdict.md`);
- the subjective lane, `reviewer` on Opus 5.5 (`fu-audit-subjective-verdict.md`);
- the checker, `checker` on Sonnet, on claims 1, 5, and 8 (`fu-audit-checker-verdict.md`).

The unit was written by `opus` on Opus 5.5, so the objective lane ran on an engine that did not write it.

## Per claim

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Scope and P9 | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 Links | BROKEN | BROKEN | — | BROKEN |
| 3 Focus rings | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 The focusable container | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 5 Derived populations | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 6 P18 | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 7 The frames | NOT-EVIDENCED | BROKEN | — | BROKEN |
| 8 Law and report | BROKEN | CONFIRMED | CONFIRMED | BROKEN |

- **Claim 2.** Both lanes: the link-state case checks a key the class's own rule writes only for links carrying a
  `-hover` class, and it leaves `color` out of every check, so deleting the `.link-body-emphasis` `:hover` and
  `:focus` block leaves the case green. The emphasis helper's rule is `!important` in the utilities layer, so the
  bare `a:hover` rule cannot move that link's color. The role-link rows must pin the documented departure: the
  paint does not move.
- **Claim 7.** `role-links-focus--dark-390.png` shows no focus indicator: the case reaches focus by a scripted
  `focus()` after the mode switch's press, which FOCUS-FRAME's P2 reading shows paints no `auto` outline, and Tab
  does. `focusable-container-focus` reaches its link the same way. `underline-offsets-hover` drives the smallest
  step, whose shift the frame cannot show; the largest step is in the pointer's reach.
- **Claim 8.** The objective lane: the property populations the link-state case reads sit in the test file
  (`.claude/rules/tests.md` § setup files). The report carries tallies and ordinals (both lanes' lists).

## Outside the claims

| Finding | Lane | Ruling | Carrier |
| --- | --- | --- | --- |
| F1: counts in shipped prose (`tests/setup.ts`, the patch, `app/browser/constants.ts`) | subjective | Confirmed | UTIL-FRAMES round 2 |
| F2: the viewport sentence's clause lost its antecedent after the reorder | subjective | Confirmed | UTIL-FRAMES round 2 |
| F3: `VISIBILITY_COPY` omits the focusable container | subjective; the unit's observation | Confirmed; the brief left the copy unscoped, which this round grants | UTIL-FRAMES round 2 |
| The `light` and `dark` role rings under focus stay unframed | the unit; both lanes | The mode-word law stands (the ruling in `fp-audit-claims.md` covers both units); the guide states the limit once, in § Tests | FRAME-HELPERS merges the two units' limit sentences into one |

VERDICT: FAIL 2, 7, 8; outside the claims: F1, F2, F3 — carried by UTIL-FRAMES round 2 (`b-util-frames-brief-2.md`).
