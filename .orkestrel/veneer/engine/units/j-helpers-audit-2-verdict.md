# J-HELPERS audit round 2 — the reconciled verdict (2026-09-24)

Subject: the J-HELPERS unit after round 2 in `tmp/worktrees/helpers` (`unit/helpers` from `e8251cf`), claimed in `j-helpers-audit-claims-2.md`. Lanes, blind on one claims file: the objective lane on GPT-6 Astra (`j-helpers-audit-2-objective-verdict.md`, thread `01a0d356-888f-7bf3-b5b1-ff40f43f4bb9`, journal `tmp/codex/j-helpers-audit-2.jsonl`), the subjective lane on Opus 5.5 (`j-helpers-audit-2-subjective-verdict.md`), and the checker on Sonnet (`j-helpers-audit-2-checker-verdict.md`). The Orchestrator's replay of the instrument runs on the round-3 instrument, after the fix round, and settles claim 8 there.

## Per-claim reconciliation

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 `readClosest` | CONFIRMED | CONFIRMED, with F3 on the Summary | CONFIRMED | Confirmed; F3 carried. |
| 2 `readSiblings` | CONFIRMED | CONFIRMED | CONFIRMED | Confirmed. |
| 3 `readOutermost` | UNRESOLVED: under a `Document` root, `:scope` denotes the document element, so `:scope :is(S) :is(S)` excludes nothing when the document element and the body both match | CONFIRMED | CONFIRMED | Open. The declared domain is `ParentNode`, and the lanes' cases cover element roots only. Carried to round 3 as a behaviour change with its case. |
| 4 `readScrollbarWidth` | CONFIRMED | CONFIRMED | CONFIRMED | Confirmed. |
| 5 bounded `readTarget` | CONFIRMED | CONFIRMED | CONFIRMED | Confirmed. |
| 6 `matchesDisabled` | CONFIRMED | CONFIRMED, with F1 | CONFIRMED | Confirmed on the claim; F1 carried. |
| 7 guide and declarations | BROKEN: the `#### Dropdown` sentence says Bootstrap's `show` and `hide` apply the same reading, but Veneer's `:disabled` also reads a control inside a disabled `fieldset`, which Bootstrap's own-property read does not; the helper summary "as Bootstrap reads it" and its Surface row carry the same overstatement | CONFIRMED | CONFIRMED | Open. Carried to round 3 as wording. |
| 8 gates, instrument, scope | UNRESOLVED (the replay) | UNRESOLVED (the replay) | CONFIRMED but the replay | Open until the Orchestrator's replay of the round-3 instrument. |

## Findings outside the claims

- **F1 (subjective lane).** `Dropdown.#lightDismiss` hides through `#conceal`, which calls `#refused(false)`, so an open menu whose toggle reads as disabled no longer closes on an outside click or a Tab release; Bootstrap's `clearMenus` closes it through `_completeHide` without reading `isDisabled`. `main` already had this for token and `:disabled` toggles, and the unit widened it to anchor toggles while the guide presents the reading as parity. Ruling: light dismissal bypasses the disabled reading, as Bootstrap does; the disabled refusal stays on `show`, `hide`, and `toggle`. Carried to round 3 with a red-first case.
- **F2 (subjective lane).** Two `closest`-plus-guard reads stay by hand: `ScrollSpy.#scrollTo` (`origin.closest('[href]')` then the guard) and the fallback inside `Delegate.#locate` (`trigger.closest('.host')` then the guard then containment). Ruling: both route through `readClosest`; `#locate` keeps its unbounded target read and its containment after the fallback. Carried to round 3.
- **F3 (subjective lane).** The `readClosest` Summary reads as "the nearest matching element that is HTML" while the code returns `undefined` for a non-HTML closest match. Ruling: the Summary and the doc description read "Returns the closest element a selector matches from an element, the element itself included, when that element is an HTML element and the optional root contains it." Carried to round 3.
- **Bounds adopted for round 3:** B4 (`may lie` becomes `can lie`; the `readScrollbarWidth` remark names the reader rather than the view as the actor); B5 (the `types.ts` patch's "neither opens nor closes" wording follows F1: the toggle is refused by `show`, `hide`, and `toggle`). Bounds recorded and left: B1 (the § Delegation form "the reading of Bootstrap's own disabled check" is kept because Bootstrap's function name is the retired identifier the acceptance grep bans outside the `util/index.js` row), B2 (`root` as an inclusive bound in two helpers and a search scope in the third, disambiguated by each `@param`), B3 (the two `#### Dropdown` phrases with different readings, each correct in its place).
- **Dispatch defects (both native lanes).** The lane briefs, generated from the W2 component template, named a `Helpers` class, a `src/browser/Helpers.ts` file, a `#### Helpers` subsection, a `plugin` row, and the W2 terrain record; none applies to a helpers unit. Both lanes ruled against the dispatch message and the design verdict instead. Charged to the Orchestrator; the round-3 lane briefs are written for the unit.

## Carried to round 3 (`j-helpers-brief-3.md`)

A. `readOutermost` nests through the matches themselves (`contains`), root-agnostic over `ParentNode`, with a `Document` root case (the document element and the body both matching return the document element alone) and a `DocumentFragment` root case. B. Dropdown light dismissal bypasses the disabled reading, red first. C. `ScrollSpy.#scrollTo` and `Delegate.#locate`'s fallback route through `readClosest`. D. The wording: F3, the fieldset qualification of the `#### Dropdown` sentence and of the `matchesDisabled` summary and Surface row, B4, B5. E. The chain and the instrument re-run with rows for A and B.

VERDICT: FAIL 3, 7, 8; outside the claims: F1, F2, F3 — round 3 carries A to E, then the Orchestrator's replay and a re-audit of A to D
