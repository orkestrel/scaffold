# J-GUARDS — the writer's report (opus on Opus 5.5, native; retained from its final message, 2026-09-24)

J-GUARDS is implemented as E23 specifies; the acceptance chain passed with `chain exit 0`; the status lists only owned files; the named search for the removed names returns nothing; every mutation row kills its case and the control row holds. Committed by the Orchestrator as Veneer `f609bb0` on `unit/guards` over `b1d314d` (`20 files changed, 349 insertions(+), 679 deletions(-)`).

## Files touched

- `src/browser/types.ts`: adds `RelatedDetail`; removes `TabDetail`, `ModalDetail`, `OffcanvasDetail`, and `TooltipProfile.guard`; points the tab, modal, and offcanvas event maps at `RelatedDetail`, with each entity's related-target meaning in the map's summary; makes `ParserMap<T>` total.
- `src/browser/validators.ts`: adds `isBareEvent` and `isRelatedEvent`, which reads `relatedTarget` once; removes the eight per-entity guards.
- `src/browser/helpers.ts`: `resolveOptions<T>` reads each declared key once by property access, with no loop over the options object; its parser table is `ParserMap<T>`.
- `Collapse.ts`, `Alert.ts`, `Toast.ts`, `Tab.ts`: the guard import and the `bindEventMap` guard; Collapse and Toast also drop the second `resolveOptions` type argument.
- `Modal.ts`, `Offcanvas.ts`: only the guard import, the `bindEventMap` call, and the `resolveOptions` type argument.
- `Tooltip.ts`: drops the profile guard, binds `isBareEvent`, drops the second type argument at its four `resolveOptions` calls, and fixes the TSDoc that mentioned "their guard". `Popover.ts`: drops the profile guard and its import, and fixes the TSDoc.
- `Dropdown.ts`, `Carousel.ts`, `ScrollSpy.ts`: only the `resolveOptions` type-argument lists.
- Tests: `validators.test.ts` (the eight guard blocks become an `isBareEvent` block and an `isRelatedEvent` block); `helpers.test.ts` (O1 to O4 and a non-enumerable-key case); `Tooltip.test.ts` (O5); `Popover.test.ts` (the profile `guard` expectations removed; a positive control: the content getter is read once and fills the body slot); `index.test.ts` (the export list).
- `guides/veneer.md`: the Surface rows, the three event-map Summary cells, and the prose at the modal, offcanvas, tooltip-profile, and popover sites.
- `tmp/j-guards/**` (ignored): the instrument, the acceptance chain, the type receipts, the logs, the edit scripts.

## Per obligation

- **G1 (P1, P2).** `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:browser tests/src/browser/validators.test.ts -t "isBareEvent|isRelatedEvent"`. Red: `SyntaxError: The requested module '/src/browser/index.ts' does not provide an export named 'isBareEvent'`, `Tests  no tests` (a missing export that stopped collection, since the guards' behaviour is not new). Green: `Tests  5 passed | 21 skipped (26)`.
- **P4.** The "binds only engine-shaped events to hooks" cases (Collapse, Alert, Toast, Tab, Modal, Offcanvas) and Popover's "runs an initial hook only for a popover event carrying no payload" pass in the second ring: `Test Files  14 passed (14)`, `Tests  511 passed (511)`.
- **P5.** `index.test.ts` passes; `grep -rnE "isCollapseEvent|isAlertEvent|isToastEvent|isTooltipEvent|isPopoverEvent|isTabEvent|isModalEvent|isOffcanvasEvent|TabDetail|ModalDetail|OffcanvasDetail|profile\.guard" src tests app guides` returned exit 1 (no match).
- **G2.** Popover's "publishes frozen default tables and a frozen profile …" expects profiles with no `guard` member; the P4-popover row pins the engine binding `isBareEvent`.
- **G3 (O1 to O6).** `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:browser tests/src/browser/helpers.test.ts tests/src/browser/Tooltip.test.ts tests/src/browser/Popover.test.ts -t "resolveOptions|never reads a content option|reads its content option from the constructor object once"`. Red before the fix, `Tests  6 failed | 7 passed | 134 skipped (147)`: O1 "never reads a constructor key the parser table does not declare" (`expected { success: false, …(1) } to strictly equal { success: true, value: { delay: 5 } }`); O2 "leaves a constructor key the parser table does not declare out of the result" (`expected { delay: 5, extra: 1 } to strictly equal { delay: 5 }`); O3 "reads a declared constructor key once" (`expected 2 to be 1`); the extra case "takes a non-enumerable declared constructor key over the attribute" (`expected { delay: 300 } to strictly equal { delay: +0 }`); O5 "Tooltip never reads a content option, which its profile declares no slot for, from the constructor object" (`expected 1 to be +0`); the Popover control "reads its content option from the constructor object once and fills the body slot with it" (`expected 3 to be 1`). O4 "takes an inherited declared constructor key over the attribute" was green before, as the brief expects; O6 is the existing rows. Green after: `Tests  13 passed | 134 skipped (147)`.
- **G4 (P6).** `test:guides` `Tests  20 passed (20)`.

## P3 type receipts

Both probe projects extend `configs/src/tsconfig.browser.json` with `"exclude": []`; `--listFilesOnly` lists `tmp/j-guards/receipts/refused.ts` and `tmp/j-guards/receipts/admitted.ts` respectively. The refused run exited 2: `refused.ts(15,55): error TS2379: Argument of type 'EventHooks<ScrollSpyEventMap>' is not assignable to parameter of type 'EventHooks<Record<"activate", CustomEvent<RelatedDetail>>>' … Type 'HTMLElement | undefined' is not assignable to type 'HTMLElement'.` and `refused.ts(16,34): error TS2345: Argument of type '(value: unknown) => value is CustomEvent<null>' is not assignable to parameter of type 'Guard<CustomEvent<RelatedDetail>>'.` The admitted run (`SCROLL_SPY_EVENTS` with `isScrollSpyEvent`, `MODAL_EVENTS` with `isRelatedEvent`, `COLLAPSE_EVENTS` with `isBareEvent`) exited 0. In the modal line the compiler took the event type from the hooks and refused the guard; correct calls still compile, so this is not the stop condition.

## `types.ts` changes

`import type { Guard, Parser }` becomes `import type { Parser }`; `RelatedDetail` is added ("Describes the detail of an event whose `relatedTarget` member names the other element of a change, as Bootstrap's `relatedTarget` field does.", member `relatedTarget: HTMLElement | undefined`); `ParserMap<T, TKey extends keyof T>` becomes `ParserMap<T> = { readonly [TName in keyof T]-?: Parser<T[TName]> }`; `TabDetail`, `ModalDetail`, and `OffcanvasDetail` are removed and their maps' members point at `CustomEvent<RelatedDetail>`, each map's summary carrying the related-target meaning; `TooltipProfile.guard` is removed.

## Mutation table (`tmp/j-guards/mutations.log.txt`, retained as `j-guards-mutations.log.txt`)

Rows P1-a to P1-c (`isBareEvent`: class half dropped, null check inverted, containment lost), P2-a to P2-e (`isRelatedEvent`: widened to `Element`, `=== undefined` loosened to `== null`, instance check dropped, `relatedTarget` read twice, containment lost), P4-collapse, P4-alert, P4-toast, P4-tab, P4-modal, P4-offcanvas, P4-popover (each engine bound through the other guard), O1 (the copy loop restored), O2 (the constructor object spread over the defaults), O3 (a declared key read twice), O4 (own keys only), O4-enumerable (own enumerable keys only), O5 (the tooltip's main table declares `content`): each KILLED its named case. CONTROL (`isRelatedEvent` tests the element before undefined, one read kept) HELD. `restored byte for byte`; `rows 22, missed 0`.

## Acceptance output

`check:src:browser`, oxlint, oxfmt, and `check` exit 0; `test:src:browser` `Tests  886 passed (886)`; `test:setup:browser` 83; `test:guides` 20; `test:policy` 109 and 1 skipped; the three builds; `test:conformance` 26; `test:setup` 319; `chain exit 0`.

## Deviation state

No stop. Settled inside the brief: the total parser table compiles as the homomorphic `ParserMap<T>` with `-?` (the signature form `ParserMap<T, keyof T & string>` was refused with TS7053), so E23's fallback was not needed; the three event-map summaries were shortened to fit the guide's Summary column; the non-enumerable-key case and the Popover positive control were added. Observations: the guide's `resolveOptions` paragraph in the Engine section is unchanged (G4 bounds the guide edits); it stays accurate but does not state the new read rule, which the TSDoc states. `test:src:browser` prints the uncaught `DOMTokenList` error from the `HostSnapshot.test.ts` case that throws inside a reaction on purpose; the suite passes.
