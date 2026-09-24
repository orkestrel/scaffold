# J-TOOLTIP audit round 2 — the reconciled verdict (2026-09-24)

Subject: the J-TOOLTIP unit after round 2 in `tmp/worktrees/tooltip` (`unit/tooltip` from `e8251cf`), claimed in `j-tooltip-audit-claims-2.md`. Lanes, blind on one claims file: the objective lane on GPT-6 Astra (`j-tooltip-audit-2-objective-verdict.md`, thread `01a0d37e-8f47-7a42-b10c-ac7b91bf7931`, journal `tmp/codex/j-tooltip-audit-2.jsonl`), the subjective lane on Opus 5.5 (`j-tooltip-audit-2-subjective-verdict.md`), and the checker on Sonnet (`j-tooltip-audit-2-checker-verdict.md`). The Orchestrator's replay runs on the round-3 instrument after the fix round.

## Dispatch defects, the Orchestrator's

The checker launched before `j-tooltip-report-2.md` was retained (it exists now, and the Orchestrator's own reading closes the report clause: no `prove` call, no commit, no install, no discarding command, the status all staged or intent-to-add). The reviewer's generated brief carried the W2 template's `Collapse.ts` and `Button.ts` pattern, the delegate route, and the shared patches, none of which applies to a tooltip; the lane ruled against the dispatch message. Round-2 item A named a `#### Placement` section that does not exist; the writer stated the arrow input in `#### Tooltip` and the `PlacementInput` row, which stands, and the missing section is carried (see § Carried).

## Per-claim reconciliation

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 construction and options | CONFIRMED | CONFIRMED | mechanics confirmed | Confirmed. |
| 2 the tip and the sanitizer | BROKEN: the `NativeSanitizer` proofs do not distinguish an omitted configuration from `{}`, the ARIA membership from a shorter list, or the per-element restrictions from a global permission; the sanitizer mutation rows run `Tooltip.test.ts` | CONFIRMED on the mechanism | CONFIRMED on the mechanics | Open on the proofs (R17): round 3 item E. The mechanism stands. |
| 3 show and hide | BROKEN: `#build` runs its writes and content callbacks with no door read between them, so a content function that destroys the tooltip on its second call still moves its element; hide's removal reads no container ownership, so a tip relocated during the wait is removed | CONFIRMED | mechanics confirmed | Open: round 3 item A. |
| 4 interactions, delays, descendants | CONFIRMED | CONFIRMED | CONFIRMED | Confirmed; OR4 carried as round 3 item K. |
| 5 lifetime, the modal, the platform's dismissal | BROKEN: a custom element moved into a slot whose `disconnectedCallback` destroys the tooltip strands, because the origin record is written after the move | CONFIRMED | CONFIRMED | Open: round 3 item B; OR2 (two tooltips with prevented hides re-promoting each other without bound) ruled as round 3 item J. |
| 6 the arrow | CONFIRMED | CONFIRMED as claimed, with F2 outside the claim | CONFIRMED | Confirmed as claimed; F2 (the arrow centers on the tip's edge rather than pointing at the trigger's centre, wrong for a `-start` or `-end` placement) is a real defect, round 3 item L. |
| 7 the slot move-back | BROKEN: two selectors resolving to one slot lose the earlier element's restoration | CONFIRMED | CONFIRMED | Open: round 3 item C. |
| 8 declarations, guide, gates, instrument, scope | BROKEN: `fill` can resolve `true` after a returned element's connection reaction destroys the tooltip; the guide's "after each write" sentence is false at the build doors; the restoration paragraph omits the E13 bound; several proofs have no distinguishing row; `parseFallbacks` invokes an uncontained iterator | UNRESOLVED (the replay) | mechanics confirmed | Open: round 3 items D, F, G, H; the replay settles the rest. |

## Findings outside the claims (the subjective lane)

- **F1** the R17 vocabulary case is missing (no case constructs with every group replaced; no "the group is ignored" row). Round 3 item M.
- **F2** the arrow's reference point (above). Round 3 item L; the objective lane's OR1 vector is its red case.
- **F3** `#entered` carries a third state no read distinguishes. Round 3 item N (a `boolean`).
- **F4** the guide omits `toggle`'s immediacy against Bootstrap's `_enter`/`_leave` path and misstates the empty `title` (the tooltip has no content and refuses to show). Round 3 item G.
- **F5** the origin record is a positional tuple with two names for one field. Round 3 item N (a readonly object type with one name per field).
- **OR3** the default-offset row binds only the constants assertion; a behavioural case measures the default distance. Round 3 item H.
- **OR4** `#context` constructs a descendant's tooltip inside the container's listener (a coercion failure throws out of the listener on every interaction) and drives a consumer-constructed descendant tooltip beside its own listeners. Round 3 item K.
- **ORC1** the R12 profile seam needs `Tooltip.ts` (its hardcoded tables, error codes, id prefix, guard, the shared static registry, and `#context`'s `new Tooltip`): granted to J-POPOVER in `j-popover-brief.md`, whose Unknown 1 is the seam; the registry is per profile so a popover and a tooltip on one host do not collide. **ORC3** `Placement` has no guide section of its own: carried to J-POPOVER (which touches the placement's arrow default) as a `#### Placement` section.

## Carried

- `#### Placement` (ORC3) and the R12 seam (ORC1): J-POPOVER, in `../plan.md` § Carried findings.
- The reviewer's bounds (the `#context`, `#describe`, `#parent`, and `#return` names; `parsePosition`'s list against `PLACEMENT_AREAS`; the repeated list reading in `parseFallbacks` and `parseThreshold`; the `show` `@returns` omitting the inline `display: none` refusal and "transition" for "change"; `TooltipOptions.title`'s default for a container; the `TOOLTIP_DEFAULTS` inline type; `#identify` against R15's `generateId`; the `aria-*` limit outside the departures list; the singular case title): folded into round 3 item N where they are the unit's own text, the two `types.ts` sentences included under the owned declarations.

VERDICT: FAIL 2, 3, 5, 7, 8; outside the claims: F1, F2, F3, F4, F5 — round 3 carries A to N, then the Orchestrator's replay and a re-audit
