# J-TYPES audit round 9 — the Orchestrator's reconciled verdict (2026-09-23)

Subject: the J-TYPES unit's round 9 (the fix round on the round-8 findings) in the worktree `veneer-types` (`unit/types`, tip `b9adebf`, rounds 6 to 9 uncommitted), claims file `j-types-audit-claims-9.md`. Lanes that ran, blind, on that one file: the objective lane, `analyst` on GPT-6 Astra (thread `01a0cfd3-5b88-77a1-b7b3-6701bce50238`, 19 commands, 374 s; `j-types-audit-9-objective-verdict.md`, terminal line `FAIL 2; outside the claims: none`); the subjective lane, `reviewer` on Opus 5.5 (`j-types-audit-9-subjective-verdict.md`, `FAIL 2; outside the claims: none`); the checker on Sonnet (`j-types-audit-9-checker-verdict.md`, `PASS`). No lane the round named is not run. Every citation checked below resolves in the file it names (`offcanvas.js:104` sets `_isShown` before `:113` adds the `showing` token; `:267` reads `[class*=offcanvas-]`).

## Per-claim rulings

1. **CONFIRMED**, both lanes: the Tab sets equal `SELECTOR_OUTER` and `SELECTOR_INNER_ELEM` under the defaults, no token sits in two keys of any selector map, `entry` reads as the item element across Dropdown, Carousel, Tab, and ScrollSpy's class map, and `closest` over `:is({wrapper}, {entry})` returns a list-group item itself.
2. **BROKEN**, both lanes, on the report's sentence "the engine's lifetime listener hides the same set of panels"; the contract sentence holds on both. The sets differ in two directions. The subjective lane: Bootstrap's query matches the `showing` token as a substring of `[class*=show]` and `_isShown` is already true (`offcanvas.js:33`, `:104`, `:113`), so Bootstrap hides a panel still sliding in, while the engine's `hide` refuses during a transition. The objective lane: Bootstrap's `[class*=offcanvas-]` excludes a non-responsive `.offcanvas` a consumer has un-fixed, which the engine's position test hides. Ruling: the lifetime listener stays; the contract adds that a resize during the slide-in is applied when the slide-in settles (the outcome Bootstrap reaches without abandoning the engine's transition rule), the remark moves to the interface block with `destroy` naming the listener it releases (the subjective lane's B3), and the departure paragraph and `plan.md`'s row state both differences beside the load-time adoption. The subjective lane's referral R1 is ruled this way: J-OFFCANVAS records the non-responsive-panel difference as a departure and implements the settle-then-apply rule.
3. **CONFIRMED**, both lanes and the checker.
4. **CONFIRMED**, both lanes and the checker.

## Bounds ruled (the subjective lane's)

- **B1** (`TabSelectorMap.entry` names "both sets" no key defines): adopted; "which the engine adds to the `wrapper` and `link` compositions".
- **B2** ("trigger" naming the inner population and the `trigger` key): adopted; the Tab sentences that name the inner population say "control" (`TabInterface`'s description, `TabSelectorMap.list`, `TabClassMap.disabled`, and any other Tab sentence using "trigger" for that population), and the `trigger` key keeps its narrower meaning.
- **B3** (the resize remark lives on `show`): adopted, as claim 2 states.
- **B4** (`pressed` beside `aria-pressed` in one backticked form): declined here; the token idiom is file-wide and J-BINDER round 2 owns the Button prose.

## Carrier

Claim 2 and the adopted bounds are carried by J-TYPES round 10 (`units/j-types-brief-10.md`, the same writer resumed on the same uncommitted tree), audited in round 10 by `analyst` on Astra and `checker` on Sonnet on `j-types-audit-claims-10.md`; the subjective lane is not run on round 10 because every round-10 sentence adopts that lane's own round-9 wording or the objective lane's correction verbatim, and the round-10 verdict records that. Rounds 5 to 10 land together. `plan.md`'s J-OFFCANVAS row is corrected in this commit. No finding is dropped.

VERDICT: FAIL 2; outside the claims: none
