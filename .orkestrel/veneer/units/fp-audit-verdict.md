# PASSIVE-FRAMES (`fp`) audit round 1 — the Orchestrator's verdict

Claims: `fp-audit-claims.md`. Lanes, blind on that one file:

- the objective lane, `analyst` on GPT-6 Astra (`fp-audit-objective-verdict.md`; the lane's final message was empty,
  and its verdict is its last non-empty message, read from the journal);
- the subjective lane, `reviewer` on Opus 5.5 (`fp-audit-subjective-verdict.md`);
- the checker, `checker` on Sonnet, on claims 1, 7, and 9 (`fp-audit-checker-verdict.md`).

The unit was written by `opus` on Opus 5.5, so the objective lane ran on an engine that did not write it.

## Per claim

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Scope | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED; the § Collapse clause is in scope on the § Showcase ruling's grounds |
| 2 The grow spinners | CONFIRMED | CONFIRMED (R2) | — | CONFIRMED; R2 carried |
| 3 Disabled buttons | CONFIRMED | CONFIRMED (F2) | — | CONFIRMED |
| 4 Role hovers and pressed faces | CONFIRMED | CONFIRMED (F1) | — | CONFIRMED |
| 5 The link button | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 6 List group roles | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 7 The large placeholder | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 8 The frames | CONFIRMED | BROKEN | — | BROKEN: the dark pressed row |
| 9 Law and report | BROKEN | BROKEN | PASS | BROKEN |

- **Claim 8.** The subjective lane: `list-group-role-actions-active--dark-390.png` presses the `dark` role row, whose
  pressed fill the eye cannot tell from rest; the case always presses the row at the end of the list.
- **Claim 9.** The objective lane: the driven-row exemption population sits inline in `tests/setup.test.ts`. The
  subjective lane: the app gate's command is paraphrased, and several gate exits appear in no log.

## Outside the claims

| Finding | Lane | Ruling | Carrier |
| --- | --- | --- | --- |
| F1: the `Pressed roles` frame joins its hosts in vertical groups, so no host shows the face a pressed button takes on its own; the Button group copy names neither the disabled forms nor the pressed faces | subjective | Confirmed | PASSIVE-FRAMES round 2 |
| F2: the disabled check label is an outline beside a filled enabled host; the TSDoc says one host per form, where two check selectors share the label; a comment misnames the tab stop | subjective | Confirmed | PASSIVE-FRAMES round 2 |
| F3: "theme word" where the established term is "mode token" | subjective | Confirmed | PASSIVE-FRAMES round 2 |
| F4: a guide sentence that reads the face "on it" | subjective | Confirmed | PASSIVE-FRAMES round 2 |
| F5: the single-role Button population is written twice, and the List group role list idiom is hard to read | subjective | Confirmed | PASSIVE-FRAMES round 2 |
| F6: rows named by position in the report and a case comment | subjective | Confirmed | PASSIVE-FRAMES round 2 |
| R1: `tests/setup.ts` and the guide say a mode token fails the typecheck; the `CaptureStem` type only lowercases, and the registry proof is what refuses it | subjective referral | Confirmed from the type | PASSIVE-FRAMES round 2 |
| R2: the grow-spinner case's `resumed` assertion passes because reinsertion restarts the animation, so no mutation of the case reddens it | subjective referral | Confirmed as unbound | PASSIVE-FRAMES round 2 |
| R5: garbled fragments in § Showcase that predate the unit | subjective referral | Carried by UTIL-FRAMES, whose P18 owns the § Showcase fragments | UTIL-FRAMES |

VERDICT: FAIL 8, 9; outside the claims: F1 to F6, R1, R2 — carried by PASSIVE-FRAMES round 2 (`b-passive-frames-brief-2.md`).
