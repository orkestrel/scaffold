# J-TYPES audit round 8 — the Orchestrator's reconciled verdict (2026-09-23)

Subject: the J-TYPES unit's round 8 (the fix round on the round-6 findings) in the worktree `veneer-types` (`unit/types`, tip `b9adebf`, rounds 6 to 8 uncommitted), claims file `j-types-audit-claims-8.md`. Lanes that ran, blind, on that one file: the objective lane, `analyst` on GPT-6 Astra (thread `01a0cfc8-3933-7f80-9461-859f5ea8a60c`, 36 commands, 306 s; `j-types-audit-8-objective-verdict.md`, terminal line `FAIL 2, 4; outside the claims: none`); the subjective lane, `reviewer` on Opus 5.5 (`j-types-audit-8-subjective-verdict.md`, `FAIL 4; outside the claims: none`); the checker on Sonnet (`j-types-audit-8-checker-verdict.md`, no failed claim). No lane the round named is not run. Every citation checked below resolves in the file it names.

## Per-claim rulings

1. **CONFIRMED**, both lanes.
2. **BROKEN**, the objective lane; the subjective lane held it with the same site ruled outside the claim's forms. The site: `TabSelectorMap.wrapper` (`.nav-item, .list-group-item`) and `TabSelectorMap.link` (`.nav-link, .list-group-item, [role="tab"]`) each carry the `.list-group-item` alternative, so one token has two homes and an override of either key leaves the literal in the other; the objective lane's sweep (every `SelectorMap` default against its entity's class and selector keys, with controls) found no other hit. The subjective lane's reading, that the alternatives are independent because Bootstrap lists the token in both `SELECTOR_OUTER` and `SELECTOR_INNER` (`tab.js:46-47`), is discarded on the rule's text: a member carries only the part no key of the entity names, and the list-group item is one element that is both its own wrapper and its own link. Ruling, the objective lane's repair: `TabSelectorMap` gains `entry` (Default `.list-group-item`, the list-group items, each its own wrapper and its own link); `wrapper` defaults to `.nav-item` and states the outer set `:is({wrapper}, {entry})` (read with `closest`, `tab.js:264`); `link` defaults to `.nav-link, [role="tab"]` and states the inner set `:is({link}, {entry}):not({toggle}), {trigger}` (`tab.js:49`, read at `:180` and `:259`). E32 and E33 themselves hold on both lanes.
3. **CONFIRMED**, both lanes (the subjective lane read probe 8's `localAndGlobal` reading as further support for "kept either way").
4. **BROKEN**, both lanes, on the report's departure sentence; the contract sentence holds on both. The lanes agree from `base-component.js:65-66`, `offcanvas.js:69`, and `:129-131` that Bootstrap's resize handler hides only a panel whose live instance Bootstrap showed: the instance it constructs for an unowned match is unshown and its `hide` returns at once. So the departure report 8 states, and the row `plan.md` § Carried findings carried from round 6, do not exist, and both are corrected in this round. The departures that remain: the side-effect instance Bootstrap constructs (which hides nothing) and Bootstrap's load-time adoption of `.offcanvas.show` markup (`offcanvas.js:260-263`), which Veneer does not perform. The subjective lane's referral R1 (a panel constructed over markup already carrying `show` never arms a listener that a `show` call arms): ruling, the listener is bound for the panel's lifetime, not armed by `show`; at a resize the panel hides itself when it is shown and its computed position is no longer `fixed`; the remark on `OffcanvasInterface.show` says so and drops the disclaimer sentence. The load-time adoption is nobody's: a consumer constructs the engine over shown markup, and the lifetime listener covers it. `plan.md`'s row is corrected in this commit.
5. **CONFIRMED**, both lanes and the checker.
6. **CONFIRMED**, both lanes and the checker.

## Bounds ruled (the subjective lane's)

- **B1** (`ButtonInterface`'s description and `host` leaf in class language): adopted for the two `types.ts` sentences ("Controls the `pressed` token and the `aria-pressed` attribute on a host"; "Carries the element whose `pressed` token and `aria-pressed` attribute the button controls"); the guide paragraph and `Button.ts` stay with J-BINDER round 2, which already carries them.
- **B2** (`PlacementSide`'s stacked clause): adopted; "Names the physical side a positioned element resolves to, the value a placement writes to the attribute `attributes.side` names."
- **B3** (the sibling `update` methods' "its placement attribute"): adopted; the path form on `DropdownInterface.update`, `TooltipInterface.update`, and `PopoverInterface.update`, with their guide cells.
- **B4** (two `@typeParam TMap` phrasings): adopted; "keyed by the verb that names each event" on both.
- **B5** ("triggers" naming two populations in `TabSelectorMap.link`): adopted through claim 2's rewrite.
- **B6** (the § Surface table still widened from 192 to 201 characters): declined; the description is the right length and the re-padding is the formatter's.

## Carrier

Claims 2 and 4, referral R1, and the adopted bounds are carried by J-TYPES round 9 (`units/j-types-brief-9.md`, the same writer resumed on the same uncommitted tree), audited in round 9 by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker` on Sonnet on `j-types-audit-claims-9.md`; rounds 5 to 9 land together. The plan's J-OFFCANVAS row is corrected in this commit. No finding is dropped.

VERDICT: FAIL 2, 4; outside the claims: none
