# J-TYPES audit round 1 — the Orchestrator's reconciled verdict (2026-09-23)

Subject: the J-TYPES unit's uncommitted change in the worktree `veneer-types` (`unit/types` from `376d84a`), claims file `j-types-audit-claims.md`. Lanes that ran, blind, on that one file: the objective lane, `analyst` on GPT-6 Astra (thread `01a0cf2d-e570-7c52-9033-423830e4ac72`, 33 commands, 498 s; `j-types-audit-objective-verdict.md`, terminal line `FAIL 6, 7`); the subjective lane, `reviewer` on Opus 5.5 (`j-types-audit-subjective-verdict.md`, terminal line `FAIL 3, 4, 6, 7, 9, 11; outside the claims: F1`); the checker on Sonnet (`j-types-audit-checker-verdict.md`, claims 8, 12, and 13 confirmed, 11 unresolved for want of the Orchestrator's run log, terminal line `FAIL` with no claim named). No lane the round named is not run. Every citation weighed here was opened by the Orchestrator in the file it names before the ruling.

## Per-claim rulings

1. **CONFIRMED.** Both lanes, from every `EventHandler.trigger` call in Bootstrap's source.
2. **CONFIRMED.** Both lanes, from the object argument of each `trigger` call.
3. **BROKEN.** The objective lane confirmed the claim's reachability clause with a complete `Default`-key mapping, which stands. The subjective lane refuted the claim's first clause: through the shared `PlacementOptions`, `TooltipOptions.placement` carries a `static` leaf that mirrors no Tooltip key (`tooltip.js:58-79` has no `display`), and `DropdownOptions.placement` carries `position` and `fallbacks` leaves that mirror no Dropdown key (`dropdown.js:71-78` has neither `placement` nor `fallbackPlacements`); `new Tooltip(host, { placement: { static: true } })` typechecks against a state no ruling defines. Ruling: each entity takes its own inline `placement` group (Tooltip and Popover `{ position, offset, fallbacks }`, Dropdown `{ offset, static }`), and `PlacementOptions` stays the mechanism's construction options, carrying the values the component resolved.
4. **BROKEN.** The leaf `Default:` sentences on `PlacementOptions` (`bottom`, `[0, 0]`, the opposite side) reach both consumers through their `placement` path and contradict the group sentences (`[0, 2]` for Dropdown; `top`, `[0, 6]`, and the four-side list for Tooltip). The per-entity groups of claim 3 close this: every leaf states its entity's Bootstrap value.
5. **CONFIRMED.** Both lanes; F1 is a naming finding, carried separately.
6. **BROKEN.** Both lanes: Bootstrap's `setContent` disposes a shown tip and calls `show()` again (`tooltip.js:326-331`), which dispatches the cancelable `show` event and runs the fade, so `fill` on Tooltip and Popover is a state-changing verb under R6 and ruling 26's own test. Ruling: `fill(content): Promise<boolean>`, resolving as the rebuild's `show` resolves and `true` at once when the tip is hidden, with `@returns` naming the refusals.
7. **BROKEN.** The objective lane's three departures and the subjective lane's unresolved item, each verified in the source: (a) Tooltip's and Popover's `show` refuse "the tip was shown" where Bootstrap's `show()` has no shown guard and rebuilds a settled shown tip (`tooltip.js:184-239`); (b) the refusal for a trigger not connected to its document (`tooltip.js:195-198`) is absent from those lists; (c) Carousel's `next` and `previous` refuse whenever the computed next item is the active item (`carousel.js:309`), which covers a single item under `wrap: true`, not only the end without wrapping; (d) Collapse's `show` also refuses while an open accordion sibling is mid-transition (`collapse.js:125`), which "a transition was in flight" leaves unnamed. Toast's `show` has no shown check in Bootstrap (`toast.js:75-99`), so the contract's omission there is correct. Bootstrap also throws for a trigger whose inline `display` is `none` (`tooltip.js:185-187`); the contract resolves `false` there and records the departure.
8. **CONFIRMED.** All three lanes; the objective lane's parser-based inspection with a control mutation.
9. **BROKEN** on the naming half, which the subjective lane decides: `PlacementInput.hint` is a boolean whose name is a noun (`names.md` § Naming table: a boolean is an adjective or past participle) selecting between two values of the HTML `popover` attribute, an external-spec literal set that `names.md` § General vocabulary keeps as a union. Ruling: `readonly popover?: 'manual' | 'hint'`, default `manual`, its TSDoc naming the attribute. The objective lane's sufficiency reading stands. Referral R1 is ruled: `static` stays on `PlacementOptions` and R9 is unchanged, because the mechanism owns every `data-bs-popper` and `data-popper-placement` write; the leak into Tooltip closes with claim 3.
10. **CONFIRMED.** Both lanes; the objective lane ran the compiler against the widened-wire, index-signature, and boolean-return mutations in memory and each was distinguished.
11. **CONFIRMED**, with the claim restated: the third-person `-s` verb opening governs the doc block of every top-level export (`typescript.md` § TSDoc, the `no-malformed-summary` scope), and a boolean member takes the "If `true`, …; if `false`, …" form that rule prescribes for a boolean parameter, there being no other form named for a boolean property. The checker's `UNRESOLVED` is closed by the Orchestrator's own run, `j-types-gates.log.txt` (`npm run test:guides`, 19 passed of 19, exit 0). Bound for scaffold, carried to the user: `typescript.md` names the boolean form for a parameter and a return and not for a property.
12. **CONFIRMED.** All three lanes; the objective lane compared the seed bytes with `376d84a`.
13. **CONFIRMED.** Both lanes and the checker.
14. **CONFIRMED.** The objective lane on the need (`lib.dom.d.ts` has `Sanitizer` and `setHTMLUnsafe` and no `setHTML`), the subjective lane on the names.
15. **CONFIRMED.** Both lanes, each naming the reader code that produces the refusal, on the Orchestrator's mutation run.

## Findings outside the claims

- **F1 (subjective lane).** `ScrollSpyInterface.active` is an element while `TabInterface.active` is a boolean: one word, two types, in sibling contracts, against `names.md` § General vocabulary ("Properties are nouns; Booleans read as assertions"). Ruling: the ScrollSpy getter is `link`, its summary unchanged. The planner's Components table assigned `active`; the naming law outranks the table.

## Referrals ruled

- **R1.** Ruled under claim 9: `static` stays on the mechanism; R9 unchanged.
- **R2.** Offcanvas listens for the backdrop click on `backdrop.element`, which the contract exposes for that purpose (Bootstrap's `clickCallback`, `offcanvas.js:168-185`, `util/backdrop.js:23-29`); no member is added. The `destroy` summary's "releases its listeners" names the mechanism's own listeners and is reworded as a bound.
- **R3.** `dismiss.backdrop` applies only while `backdrop` is `true` (`modal.js:238-240`, `offcanvas.js:168-185`); the `DismissOptions.backdrop` TSDoc states the coupling as a bound, and J-MODAL implements it.
- **R4.** `ButtonHooks` migrates to `EventHooks<ButtonEventMap>` in the fix round, because `types.ts` is W0's file and report-only after it; J-BINDER's brief drops that item (its ruling 31 carrier is superseded).
- **R5.** No Veneer release is cut from `main` before W5 lands; the user is told in the report.

## Bounds carried into the fix round

`CarouselDetail.from` and `to` open with "Carries"; the `SanitizeTargetInterface` summary drops the toolchain clause and the `@remarks` names TypeScript 6.0.3 as the version whose DOM library omits `setHTML`; `BackdropInterface.destroy` opens "Removes the backdrop element at once and abandons a fade in flight"; `DismissOptions.backdrop` states its coupling to `backdrop`; `CollapseInterface.show` and the Carousel verbs restate their refusals per claim 7. Bound carried to the user, not to the fix round: the `typescript.md` boolean-property form (a vendored rule file).

## Carriers

Every `BROKEN` claim (3, 4, 6, 7, 9), F1, the referral rulings R2 to R4, and every bound above is carried by the successor brief `j-types-brief-2.md` (the fix round on `opus`, Opus 5.5, in the worktree `veneer-types`), audited in round 2 by `analyst` on Astra (the engine that did not write it), `reviewer` on Opus 5.5, and `checker` on Sonnet on `j-types-audit-claims-2.md`. No finding is dropped.

VERDICT: FAIL 3, 4, 6, 7, 9; outside the claims: F1
