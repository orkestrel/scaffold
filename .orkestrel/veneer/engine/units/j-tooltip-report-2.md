# J-TOOLTIP round 2 — the writer's returned report (retained verbatim 2026-09-24)

Writer: `opus` on Opus 5.5, native subagent `a48b1f17b0f574e7a`, resumed in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip`. Brief: `j-tooltip-brief-2.md`. Instrument: `j-tooltip-mutations-2.py` with its log `j-tooltip-mutations-2.log.txt`, the chain `j-tooltip-acceptance-2.sh`, and the red and green logs `j-tooltip-round2-red.log.txt` and `j-tooltip-round2-green.log.txt`, retained beside this file. The mutation table the report quotes is the retained log, row for row (thirty-four mutation rows each `EXACT` or `JOINED`, the six `GREEN?` rows at 0 failed of 29, 4, 45, 28, 24, and 3, the digests before and after equal, and `receipt: restored byte for byte`); it is elided here to that reference. The "someone marked them intent-to-add" note refers to the Orchestrator's `git add -N` when it captured the round-1 diff.

---

# J-TOOLTIP round 2 report

Round 2 is complete. Every chain command, including `npm run check`, exits 0 on Chromium 153.0.8010.12, and every instrument row reddens its named case. The tooltip now centres its arrow on the edge facing the trigger at each side. An element placed in a slot goes back where it came from on `destroy`, on a refill through `fill`, and on a rebuilt show that supplies a different element.

The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/`.

## Files touched this round
- `src/browser/Placement.ts`: accepts an optional arrow, checks it is an HTML element, and positions and centres it at every side write. The arrow is taken out of flow before it is measured. Its inline declarations go through the placement's snapshot, so `destroy` restores them.
- `src/browser/types.ts`: adds `PlacementInput.arrow` and `TooltipSelectorMap.arrow`, and updates both interfaces' summaries.
- `src/browser/constants.ts`: adds `TOOLTIP_SELECTORS.arrow` with the default `.tooltip-arrow`.
- `src/browser/Tooltip.ts`:
  - It keeps the resolved selectors and passes the tip's arrow to the placement.
  - The move-back: the tooltip records each moved element's parent and next sibling before its first move, plus its slot and selector. It returns the element on `destroy`, on a `fill` that changes that slot, and on a rebuild that places a different element. An element that had no parent is detached again, and one moved out of its slot since is left alone.
  - The class remarks describe both.
- `tests/src/browser/Tooltip.test.ts`: two new cases. The tables case now expects the `arrow` selector.
- `tests/src/browser/Placement.test.ts`: one new arrow case.
- `guides/veneer.md`: the `PlacementInput`, `TooltipSelectorMap`, and `TOOLTIP_SELECTORS` Surface rows, the selectors table's `arrow` row, and the `#### Tooltip` paragraphs for the arrow, the move-back, D2, D3, and the departures list.
- `tmp/j-tooltip/`: the successor `mutations.py` and `acceptance.sh`. The round-1 versions are kept as `mutations-round1.py`, `mutations-round1.log.txt`, and `acceptance-round1.sh`.

## A. The arrow
**Red before the fix.** Command: `npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Tooltip.test.ts tests/src/browser/Placement.test.ts` (`tmp/j-tooltip/round2-red.log.txt`). It exited 1:
```
 FAIL  |src:browser (chromium)| tests/src/browser/Placement.test.ts:319:2 > Placement > centers an arrow it is given on the edge facing the reference, restores its declarations, and refuses an arrow that is not an HTML element
AssertionError: expected [ [ 'top', '', -55 ], …(1) ] to deeply equal [ [ 'top', 'absolute', +0 ], …(1) ]
 FAIL  |src:browser (chromium)| tests/src/browser/Tooltip.test.ts:1133:2 > Tooltip > centers the arrow on the edge facing the trigger at each side, outside that edge, and removes its declarations on destruction
AssertionError: expected [ [ 'top', -58, false, false ], …(3) ] to deeply equal [ [ 'top', +0, true, false ], …(3) ]
 Test Files  2 failed (2)
      Tests  3 failed | 43 passed (46)
```
(The third failure in that count is B's case.)

**Green after the fix.** The same files plus `Dropdown.test.ts`, which I did not edit (`round2-green.log.txt`):
```
 Test Files  3 passed (3)
      Tests  78 passed (78)
```

The first green attempt was off by 6px on the side placements. The arrow was being measured while it still sat in the tip's flow. Taking it out of flow before measuring fixed that.

## B. The move-back
**Red before the fix.** Same command and log as A:
```
 FAIL  |src:browser (chromium)| tests/src/browser/Tooltip.test.ts:1180:2 > Tooltip > returns a moved element to where it came from on destruction, and one a fill replaces while the new element takes the slot
AssertionError: expected <div class="tooltip-inner">…(1)</div> to be <div id="home">…(2)</div> // Object.is equality
```

After the fix I added two steps to this case: a rebuilt show whose function returns a different element, and a `fill` while the tip is hidden. They have no red reading taken before the fix. The instrument rows `a replaced element is dropped` and `a rebuilt show keeps the earlier element` show each of them reddening.

**Green:** `Tests  78 passed (78)` over Tooltip, Placement, and Dropdown.

## C. The guide's rulings
- **D2:** "A disabled tooltip still hides, through a call and through a leave, as Bootstrap's `hide` method and its leave read no enabled state."
- **D3:** the hint paragraph states that Chromium 153 dispatches the closing `beforetoggle` event with `cancelable` set to `false`. A departures item says the close cannot be refused, and that a prevented `hide.vn.tooltip` keeps the tip by promoting it again.
- The `aria-*` sanitizer limit keeps its round-1 wording.
- The "arrow paints at a corner" limit is replaced by the centring sentence, and the content paragraph now states the move-back.

## D. Mutation table

The retained `j-tooltip-mutations-2.log.txt`, row for row; the rows added this round are "the arrow keeps its static position", "the arrow is centered on the wrong axis", "a moved element is left in the tip on destroy", "a replaced element is dropped", and "a rebuilt show keeps the earlier element", each `EXACT`.

## Acceptance chain (`bash tmp/j-tooltip/acceptance.sh`, summary verbatim)
```
chromium 153.0.8010.12
check exit=0 | npm run check:src:browser
check-tree exit=0 | npm run check
lint exit=0 | npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
format exit=0 | npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
browser exit=0 | npm run test:src:browser
guides exit=0 | npm run test:guides
policy exit=0 | npm run test:policy
core exit=0 | npm run build:src:core
styles exit=0 | npm run build:src:styles
build exit=0 | npm run build:src:browser
conformance exit=0 | npm run test:conformance
setup exit=0 | npm run test:setup
```
The tail of each log, verbatim:
- **check:** prints only its banners.
- **check-tree:** its last step is `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`, which exits 0 with no diagnostics.
- **lint:** prints only its banners.
- **format:** `All matched files use the correct format.`
- **browser:** `Test Files  24 passed (24)` / `Tests  669 passed (669)`.
- **guides:** `Tests  19 passed (19)`.
- **policy:** `Tests  109 passed | 1 skipped (110)`.
- **core:** `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`.
- **styles:** `✓ built in 853ms`.
- **build:** `dist/src/browser/index.js  247.03 kB │ gzip: 55.84 kB │ map: 455.90 kB` / `✓ built in 289ms`.
- **conformance:** `Tests  22 passed (22)`.
- **setup:** `Test Files  4 passed (4)` / `Tests  281 passed (281)`.

The browser log also carries the round-1 unhandled `DOMTokenList.toggle` error. It comes from `HostSnapshot.test.ts`, not from these files.

## Status and diffstat
The new files now show as `A`: someone marked them intent-to-add between rounds, and it was not this unit.
```
 M guides/veneer.md
 M src/browser/Placement.ts
 A src/browser/Tooltip.ts
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/parsers.ts
 A src/browser/sanitizers/NativeSanitizer.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/src/browser/Placement.test.ts
 A tests/src/browser/Tooltip.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/parsers.test.ts
 A tests/src/browser/sanitizers/NativeSanitizer.test.ts
 M tests/src/browser/validators.test.ts
```
```
 guides/veneer.md                                   |  270 ++++-
 src/browser/Placement.ts                           |   35 +-
 src/browser/Tooltip.ts                             |  677 +++++++++++
 src/browser/constants.ts                           |  181 +++
 src/browser/helpers.ts                             |  108 +-
 src/browser/index.ts                               |    2 +
 src/browser/parsers.ts                             |  143 ++-
 src/browser/sanitizers/NativeSanitizer.ts          |   45 +
 src/browser/types.ts                               |   27 +-
 src/browser/validators.ts                          |   55 +
 tests/src/browser/Placement.test.ts                |   38 +
 tests/src/browser/Tooltip.test.ts                  | 1281 ++++++++++++++++++++
 tests/src/browser/helpers.test.ts                  |  115 +-
 tests/src/browser/index.test.ts                    |   18 +
 tests/src/browser/parsers.test.ts                  |   95 ++
 .../src/browser/sanitizers/NativeSanitizer.test.ts |   99 ++
 tests/src/browser/validators.test.ts               |   75 ++
 17 files changed, 3238 insertions(+), 26 deletions(-)
```

## `types.ts` changes
The round-2 additions:
```diff
-/** Names the elements a placement anchors and the popover mode it promotes the positioned element with. */
+/** Names the elements a placement anchors, the popover mode it promotes the positioned element with, and the arrow it centers. */
 export interface PlacementInput {
@@
 	readonly popover?: 'manual' | 'hint'
+	/** Carries the element inside the positioned element that points at the reference, which the placement positions absolutely and centers on the edge facing the reference each time it writes the side. */
+	readonly arrow?: HTMLElement
 }
@@
-/** Names the selector a tooltip matches with; its default is Bootstrap's selector. */
+/** Names the selectors a tooltip matches inside its tip; each default is Bootstrap's selector. */
 export interface TooltipSelectorMap {
 	/** Selects the tip's slot the `title` option fills. Default: `.tooltip-inner`. */
 	readonly title: string
+	/** Selects the tip's arrow, which the placement centers on the edge facing the trigger. Default: `.tooltip-arrow`. */
+	readonly arrow: string
 }
```
The round-1 changes are unchanged: the `PlacementInput.popover` wording, the popover default clauses on the `trigger` and `tip.template` leaves, the order of the `show` refusals and its in-flight remark, and the `fill` `@returns` (each quoted in `j-tooltip-report.md`).

## `Popover*` mirror patch (report-only, carried to J-POPOVER)
`PopoverSelectorMap` extends `TooltipSelectorMap`, so it inherits `arrow` with the tooltip's default in its doc. The patch includes a popover override for it.
```diff
--- a/src/browser/types.ts   (PopoverSelectorMap)
 	readonly content: string
+	/** Selects the tip's arrow, which the placement centers on the edge facing the trigger. Default: `.popover-arrow`. */
+	readonly arrow: string
 }
--- a/src/browser/types.ts   (PopoverInterface.show)
-	 * @returns Resolves true after the `shown` event; false when the popover is disabled or has no content, the trigger is not connected to its document, a listener prevented `show`, a transition was in flight, or the popover is destroyed.
+	 * @returns Resolves true after the `shown` event; false when the popover is disabled or has no content, the trigger is not connected to its document, a transition was in flight, a listener prevented `show`, or the popover is destroyed.
 	 * @remarks
-	 * A settled shown tip is rebuilt, as Bootstrap's `show` rebuilds it. Bootstrap throws for a trigger
-	 * whose inline `display` is `none`; this contract resolves false there instead.
+	 * A settled shown tip is rebuilt, as Bootstrap's `show` rebuilds it. Bootstrap's `show` also runs
+	 * again while a transition is in flight; this contract resolves false there. Bootstrap throws for a
+	 * trigger whose inline `display` is `none`; this contract resolves false there instead.
--- a/src/browser/types.ts   (PopoverInterface.fill)
-	 * @returns Resolves true after the content is written and, when the tip is shown, after the rebuilt tip's `shown` event; false when the popover is destroyed, or when the tip is shown and the rebuild's `show` is refused because the popover is disabled or has no content, the trigger is not connected to its document, or a listener prevented `show`.
+	 * @returns Resolves true after the content is written and, when the tip is shown, after the rebuilt tip's `shown` event; false when the popover is destroyed, or when a shown tip's rebuild is refused because the popover is disabled or has no content, the trigger is not connected to its document or its inline `display` is `none`, a listener prevented `show`, or a transition is in flight.
```

## Deviation state
Nothing is left undone in this round. Two things you need to rule on:
- **No `#### Placement` section exists in the guide.** The only other Placement prose is inside `#### Dropdown`, which is outside this unit's guide scope. I named the arrow input in `#### Tooltip`'s placement paragraph and in the `PlacementInput` Surface row instead.
- **The move-back's final shape was settled after its red reading.** The rebuild and hidden-fill steps were added after the fix. A `fill` returns whatever element its refilled slot held, whether an element value or a function's result supplied it; that is why the origin record carries the slot's selector. The instrument's `a replaced element is dropped` and `a rebuilt show keeps the earlier element` rows bind those two steps.
