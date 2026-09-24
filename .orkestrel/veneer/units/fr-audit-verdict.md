# FORMS-FRAMES (`fr`) audit round 1 — the Orchestrator's verdict

Claims: `fr-audit-claims.md`. Lanes, blind on that one file:

- the objective lane, `analyst` on GPT-6 Astra (`fr-audit-objective-verdict.md`);
- the subjective lane, `reviewer` on Opus 5.5 (`fr-audit-subjective-verdict.md`);
- the checker, `checker` on Sonnet, on claims 1, 7, and 9 (`fr-audit-checker-verdict.md`).

The Astra lane's first launch passed the queue a path instead of the launcher's name and never started; it was
relaunched at 13:42 on the same brief. The unit was written by `opus` on Opus 5.5, so the objective lane ran on
an engine that did not write it.

## Per claim

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Scope | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED; both scope rulings hold |
| 2 P10 | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 3 Driven states | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 Pressed states | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 5 Resting states | BROKEN | BROKEN | — | BROKEN |
| 6 Recorded, not framed | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 7 Red first and mutations | BROKEN | UNRESOLVED | BROKEN | BROKEN |
| 8 The frames | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 9 Law and report | BROKEN | UNRESOLVED | CONFIRMED | BROKEN |

- **Claim 5.** Both lanes: the `ValidationSection.test.ts` proof keys its expectations only for the scoped
  forms, so an added validation row with a unique label passes every assertion (the objective lane names the
  escaping row). The subjective lane: the `form-control-plaintext-small` and `-large` rows read `padding-left`,
  which is `0` on the base and both sizes, so the key cannot tell either state from its base.
- **Claim 7.** The P10 mutation reddens three cases, which the report's "each mutation fails exactly the case it
  targets" contradicts (all lanes). The subjective lane: the "no other case" readings ran under a name filter,
  and the validated-select mutation removes a ring rule every validated host shares, so the text-control
  validation ring case outside the filter was never read under it.
- **Claim 9.** The objective lane: the validation class matrix in `ValidationSection.test.ts` and the gauge
  selector population in `form-range.test.ts` are local populations; the build, format, and section gate entries
  do not quote their commands and result lines. The checker's confirmation read a sample of sites only.

## Outside the claims

| Finding | Lanes | Ruling | Carrier |
| --- | --- | --- | --- |
| The grouped floating label is described as floated in the patch, the TSDoc, and the section comment, and the frames show it resting | objective G1, subjective F1 | Confirmed; the specimen's resting state is correct, the prose is wrong | FORMS-FRAMES round 2 |
| The validated check renders without its `.form-check` wrapper, so its ring runs into its label | subjective F4 | Confirmed from the frames and `app/browser/constants.ts` | FORMS-FRAMES round 2 |
| The patch and a case title call the lifted specimen a "copy", say the file hover is read from the frame, and set "resting" against "held" | subjective F3 | Confirmed | FORMS-FRAMES round 2 |
| Critic states left unframed: the grouped `.form-floating` `:focus-within` lift and squared end corners, the pressed radio, plaintext focus, floating plaintext focus, a focused disabled range, the grouped select's focus lift, the sized group's select end padding, `.btn-toolbar .input-group`, and a validated `[multiple]` select | subjective F2; the unit's own list | Confirmed: the brief's objective is every developer-written form state, and the critic's `unframed` list is its population | FORMS-FRAMES round 2 |
| The lift, padded-wrapper, ring-reach, and pixel-decode code repeats in each driven case of every frames unit | the unit's observation; the subjective lane | Confirmed; `tests/setupBrowser.ts` is the helper home and is off-limits to every frames unit | FRAME-HELPERS, one unit after the frames wave lands |

VERDICT: FAIL 5, 7, 9; outside the claims: G1/F1, F2, F3, F4 — carried by FORMS-FRAMES round 2 (`b-forms-frames-brief-2.md`).
