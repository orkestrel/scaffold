# FORMS-FRAMES (`fr`) audit round 2 — the Orchestrator's verdict

Claims: `fr-audit-2-claims.md`. Lanes, blind on that one file:

- the objective lane, `analyst` on GPT-6 Astra (`fr-audit-2-objective-verdict.md`, thread
  `01a0d3d4-5123-70c3-9824-a2077fe7d8c1`);
- the subjective lane, `reviewer` on Opus 5.5 (`fr-audit-2-subjective-verdict.md`), run because the round added frames;
- the checker, `checker` on Sonnet (`fr-audit-2-checker-verdict.md`).

The unit was written by `opus` on Opus 5.5, so the objective lane ran on an engine that did not write it.

## Per claim

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Scope | CONFIRMED | CONFIRMED | PASS | CONFIRMED |
| 2 Resting keys | CONFIRMED | CONFIRMED | PASS | CONFIRMED |
| 3 Mutations | CONFIRMED | CONFIRMED | PASS | CONFIRMED |
| 4 Specimens | CONFIRMED | BROKEN | PASS | BROKEN: the sized plaintext names |
| 5 Added critic states | CONFIRMED | UNRESOLVED | PASS | UNRESOLVED: the section proof's cascade mutations are read, never run |
| 6 Frames | CONFIRMED | BROKEN | PASS | BROKEN: the empty-plaintext focus prose |
| 7 Law and report | BROKEN | CONFIRMED | PASS | BROKEN: a gate log without its command, and a tally |

- **Claim 4.** The Orchestrator read `app/browser/constants.ts` in the worktree: the base plaintext specimen is
  `Reader email` (around line 1386), and the sized specimens are still `Small account email` and `Large account email`
  (around lines 1391 and 1396). Every other size family prefixes its base name. The objective lane attacked the base
  specimen only, so its confirmation does not reach the sized names.
- **Claim 5.** The objective lane confirms the sized-select and toolbar assertions by reading them; the subjective lane
  finds that the three mutations the section case names in its own comment (the group's corner squaring removed, the
  sized-group select end room removed, the toolbar group's width restored to 100%) never ran. A reading does not
  settle a proof. The claim stays open until each mutation runs.
- **Claim 6.** Both lanes agree the empty-plaintext focus frames look the same as the resting frames: the label floats
  at rest, the control is empty, and a readonly input paints no caret. The objective lane holds the case's reading;
  the subjective lane rules the prose false, because the guide patch and the `FORM_FLOATING_SPECIMENS` TSDoc say
  focus "moves its text down to the floated inset" and the specimen has no text.
- **Claim 7.** `fr2-capture-light-1280.log.txt` opens with the Vitest banner and no command; the report says every
  gate log opens with its command. The report's "one size list" is a tally.

## Outside the claims

| Finding | Lane | Ruling | Carrier |
| --- | --- | --- | --- |
| F1: the toolbar TSDoc, case title, and comment say the group sits beside the buttons; the `dark-390` frame wraps it onto a second row | subjective | Confirmed from the frame; the objective lane holds the assertion because the section proof's viewport is wider | FORMS-FRAMES round 3 |
| R1: the unit reflowed one `@remarks` tag inline (`constants.ts` around line 690); every other tag in the file sits on its own line | subjective referral | Confirmed by the Orchestrator's read | FORMS-FRAMES round 3 |
| R2: the section proof's same-row assertion depends on its viewport | subjective referral | Settled by the objective lane: the proof runs at a wider viewport than the wrapped frame, and the assertion states the width rule there | Closed |
| R3: `VALIDATION_HOST_CASES` builds each row from an untyped tuple coerced with `String()`, so a misplaced column still type-checks | subjective referral | Confirmed by the Orchestrator's read of `tests/setupStyles.ts` | FORMS-FRAMES round 3 |

VERDICT: FAIL 4, 5, 6, 7; outside the claims: F1, R1, R3 — carried by FORMS-FRAMES round 3 (`b-forms-frames-brief-3.md`).
