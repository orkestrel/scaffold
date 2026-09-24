# J-HELPERS absorption, successor 2 — the Grok distillate (retained 2026-09-24)

Lane: `grok` on Cursor Grok (`grok-4.7-high`, print mode, `--mode=ask`), working directory `C:/Users/mikes/WebstormProjects`. Brief: `j-helpers-absorb-brief-2.md` beside this file (the launch copy sat at `tmp/cursor/j-helpers-absorb-brief-2.md`). Journal: `tmp/cursor/j-helpers-absorb-2.jsonl` (swept at acceptance). Session id: `ea813338-e5c0-47b1-9ebf-87bc4a1ed57b`. Duration: 246363 ms. Supersedes nothing: it adds the rows the first distillate `j-helpers-absorb-distillate.md` left unread.

I'll read the brief and follow it exactly.The first pass left specific ranges unread. I’ll read those ranges and the guide tables, then add only the rows it does not already carry.The unread ranges are constructors plus later fleet exports. I’ll read the DOM-reading functions and the Surface tables next.Question: Which private members and module helpers of the Veneer browser engine are pure DOM traversal or reading leaves, and which `@orkestrel/elements`, `@orkestrel/mailbox`, or `@orkestrel/test` export already carries the same, a wider, or a narrower contract?

Evidence:

**1. Leaf inventory (added).** `ScrollSpy.ts` 81–199, `Carousel.ts` 81–249, and `Delegate.ts` 81–349 define no `#` method. No new (a) or (b) member. `readTag` callers in those constructors: `ScrollSpy.ts:94` `tag: readTag(host)`, `Carousel.ts:125` `tag: readTag(host)`. `Delegate.ts` through line 349 does not call `readTag`.

**2. Repeated shapes (added).** No new site of a repeated (a)/(b) shape in those three ranges.

**3. Prior art (added).**

| Leaf or shape | Export | Contract |
| --- | --- | --- |
| scrollbar width | `lockBodyScroll` `elements/src/browser/helpers.ts:1672` `(): void`; width at `helpers.ts:1677` `window.innerWidth - document.documentElement.clientWidth` | Narrower: writes `paddingRight`, returns void, no `Math.abs`, no null `defaultView`. |
| scrollbar width | `lockBodyScroll` `mailbox/src/browser/helpers.ts:237` `(): void`; width at `helpers.ts:242`, same subtraction | Narrower: writes `modal-open`, returns void. |
| ancestor chain | `getPathToAncestor` `elements/src/browser/traversals.ts:953` `(element: Element, ancestor?: Element \| null): readonly Element[]` | Narrower than a chain through `body`: includes the start, stops before the ancestor argument. |
| `readTargets` / target-or-href | `findByKey` `traversals.ts:1427` `(container: Element, key: string): HTMLElement \| null` | none: `data-key`, `null`, no `href`. |
| `Dropdown.#locate` | `detectMenu` `mailbox/src/browser/helpers.ts:876` `(toggle: HTMLElement): HTMLElement \| null` | Narrower: `closest` parent or `parentElement`, then `:scope > .dropdown-menu`; `null`; no next-then-previous walk. |
| `reflow`, `readControls`, `isDisabled`, `matchesReducedMotion`, `:scope S S` | none in the portions read | `isInViewport` `traversals.ts:970`, `resolvePopoverSide` `elements/src/browser/helpers.ts:2132`, `readHit` `test/src/browser/helpers.ts:224`, and `measureContent` `test/src/browser/helpers.ts:2973` read layout and return a boolean, a side, an element, or a number. |
| core entry | none | `dist/src/core/index.d.ts` exports through `WaitOptions` `index.d.ts:857` are not DOM reads. |

**4. Name claims (added).** `mailbox/guides/` has no `## Surface` heading. Elements `## Surface` claims `findClosest` at `elements/guides/traversals.md:24`. `findSibling` is unclaimed (`findNextSibling` / `findPreviousSibling` are `traversals.md:32`). Unclaimed in both guides' `## Surface` sections: `emitEvent`, `bindEventMap`, `settleAnimations`, `reflow`, `readTargets`, `readTarget`, `resolveOptions`, `resolveVocabulary`, `readTag`, `computeNeighbor`, `readControls`, `isDisabled`, `matchesReducedMotion`, `isColorModeState`, `isClassToken`, `isAttributeName`, `isSelector`, `isButtonEvent`, `isCollapseEvent`, `isAlertEvent`, `isTabEvent`, `isScrollSpyEvent`, `isDropdownEvent`, `isCarouselEvent`, `isModalEvent`, `parseElement`, `parseRootMargin`, `parseThreshold`, `parseDismiss`, `parseOffset`, `parseStatic`, `parseRide`, `parseBackdrop`, `readClosest`, `readSibling`, `readOutermost`, `readHost`, `readFragment`, `readScrollbar`, `readChain`, `readParents`, `readSection`.

**5. `setupBrowser.ts` exports the first distillate did not name (added).** Installed names are from `veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts` unless noted. `none` means no same name and no same job.

| Export | Signature line | Installed |
| --- | --- | --- |
| `FrameRegion` | `setupBrowser.ts:48` | none |
| `FramePlacement` | `setupBrowser.ts:69` | none |
| `measureVariation` | `setupBrowser.ts:111` `(encoded: string, region: FrameRegion, floor?: string): Promise<number>` | none |
| `readRegion` | `setupBrowser.ts:176` `(subject: Element, frame?: Element): FrameRegion` | none |
| `ViewportHandler` | `setupBrowser.ts:189` | none |
| `BUTTON_CLASS` | `setupBrowser.ts:284` | none |
| `SPECIMEN_ATTRIBUTE` | `setupBrowser.ts:287` | none |
| `readButton` | `setupBrowser.ts:318` `(root: ParentNode, name: string): HTMLElement` | none |
| `readSpecimen` | `setupBrowser.ts:361` `(root: ParentNode, name: string): HTMLElement` | none |
| `readSubject` | `setupBrowser.ts:402` `(root: ParentNode, name: string): HTMLElement` | none |
| `SubjectReading` | `setupBrowser.ts:435` | none |
| `describeSubject` | `setupBrowser.ts:467` `(subject: HTMLElement, reading: SubjectReading): string` | none |
| `recordState` | `setupBrowser.ts:612` | none |
| `collectPainted` | `setupBrowser.ts:681` `(root: ParentNode): readonly HTMLElement[]` | none |
| `ORACLE_ACTIONS` | `setupBrowser.ts:696` | none |
| `readOracleButton` | `setupBrowser.ts:753` `(root: ParentNode, name: string): HTMLElement` | none |
| `pressOracleKeys` | `setupBrowser.ts:767` `(root: ParentNode, name: string, keys: string): Promise<void>` | `pressKeys` `index.d.ts:1902` `(keys: string): Promise<void>` — called at `setupBrowser.ts:769` |
| `holdOraclePointer` | `setupBrowser.ts:782` `(root: ParentNode, name: string): Promise<void>` | none (`holdAccessible` `index.d.ts:1376` takes an accessible name) |
| `ORACLE_EXCLUDED` | `setupBrowser.ts:827` | none |
| `OracleComparison` | `setupBrowser.ts:832` | none |
| `driveOracle` | `setupBrowser.ts:861` | none |
| `buildOracleComparison` | `setupBrowser.ts:895` | none |
| `CallRecordingInterface` | `setupBrowser.ts:928` | none |
| `recordCalls` | `setupBrowser.ts:948` | none |
| `recordListeners` | `setupBrowser.ts:981` | none |
| `EventReading` | `setupBrowser.ts:994` | none |
| `ButtonRestoration` | `setupBrowser.ts:1008` | none |
| `recordEvents` | `setupBrowser.ts:1031` | none |
| `BUTTON_RESTORATIONS` | `setupBrowser.ts:1054` | none |
| `applyTheme` | `setupBrowser.ts:1066` `(variant: string): Promise<void>` | none |
| `PROBE_CASCADE` | `setupBrowser.ts:1090` | none |
| `scene` | `setupBrowser.ts:1182` | none |
| `PaginationOptions` | `setupBrowser.ts:1185` | none |
| `mountPagination` | `setupBrowser.ts:1215` `(markup: string, options?: PaginationOptions): HTMLElement` | `render` `index.d.ts:2722` `(markup: string): HTMLDivElement`, via `scene.mount` at `setupBrowser.ts:1217` |
| `readParentOffset` | `setupBrowser.ts:1236` `(element: Element): number` | none |
| `collectNestedRules` | `setupBrowser.ts:1308` `(rules: Iterable<CSSRule>): readonly CSSRule[]` | `readRules` `index.d.ts:2500` `(): readonly CSSRule[]` — flat list; this walks grouping rules |
| `collectScopeProperties` | `setupBrowser.ts:1335` | none |
| `collectMediaConditions` | `setupBrowser.ts:1371` | none |
| `collectLayerRules` | `setupBrowser.ts:1432` `(name: string, sheets?: Iterable<CSSStyleSheet>): readonly CSSRule[]` | `readRules` `index.d.ts:2500` — this one names a layer |
| `collectLayerOrder` | `setupBrowser.ts:1460` `(sheets?: Iterable<CSSStyleSheet>): readonly string[]` | none |
| `collectCustomProperties` | `setupBrowser.ts:1523` `(sheets?: Iterable<CSSStyleSheet>): readonly string[]` | none |
| `scanPositionalPairs` | `setupBrowser.ts:1573` | none |
| `mountBadge` | `setupBrowser.ts:1634` `(size: number): Element` | `render` `index.d.ts:2722`, via `scene.mount` at `setupBrowser.ts:1635` |

Distillate: Those three constructor ranges add `readTag` callers at `ScrollSpy.ts:94` and `Carousel.ts:125` and no new leaf or repeated shape. Scrollbar width is computed inside `lockBodyScroll` in elements (`helpers.ts:1677`) and mailbox (`helpers.ts:242`), both writes. `getPathToAncestor` (`traversals.ts:953`) includes the start and excludes the ancestor. `findByKey` is not `readTargets`. `detectMenu` (`mailbox` `helpers.ts:876`) is a direct-child menu lookup. The only `## Surface` claim among the unruled names is `findClosest` at `elements/guides/traversals.md:24`; mailbox has no `## Surface`. Of the unnamed setup exports, `pressOracleKeys` calls `pressKeys`, and `mountPagination` and `mountBadge` go through `render`; the other unnamed exports have no installed twin. Veneer `main` is `7e96cf80a54f36509b4d0efb449915651668be1a`.

Unknowns: `elements/src/browser/traversals.ts` 1070–1359 and after `getAllKeyed` (~1489). `elements/src/browser/helpers.ts` 1982–2047. `mailbox/src/browser/helpers.ts` 271–819. `test/src/browser/helpers.ts` 268–2972 and after `measureContent` (2988 through end). TSDoc bodies in `dist/src/browser/index.d.ts` after line 80 and between the export lines of `dist/src/core/index.d.ts`.

Journal: `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/j-helpers-absorb-2.jsonl`, session `ea813338-e5c0-47b1-9ebf-87bc4a1ed57b`.

Deviation: none.
