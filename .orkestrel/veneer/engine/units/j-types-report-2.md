# Unit J-TYPES — report 2: the fix round after audit round 1

Executor: `opus` on Opus 5.5 (native Claude subagent), sole writer in `C:/Users/mikes/WebstormProjects/veneer-types` (branch `unit/types`, base `376d84a`). Brief: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-brief-2.md`. Nothing committed.

Result: edits E1 to E10 are applied on top of round 1's uncommitted tree. Every acceptance criterion passes: `check:src:browser`, `oxlint`, and `oxfmt --check` exit 0; the probe reports exactly the five refusals the brief names; the four greps return the required lines; `test:guides` passes 19 of 19 and `test:policy` passes 109 with 1 skipped. No deviation stopped the unit. One observation needs a ruling (Observation 1: the E4 "transition was in flight" refusal has no Bootstrap source).

## Edits

- **E1 (claims 3 and 4).** `TooltipOptions.placement` and `DropdownOptions.placement` are now per-entity inline groups. `PlacementOptions` keeps `position`, `offset`, `fallbacks`, and `static` with the mechanism's own defaults (`bottom`, `[0, 0]`, the opposite side, `false`). Its leaves are unchanged, and only its summary changed:
  - `PlacementOptions`: `/** Configures where the mechanism sets a menu or a tip against its reference, from the values the owning component resolved. */`
  - `TooltipOptions.placement`:
    ```ts
    /** Positions the tip against its trigger. */
    readonly placement?: {
    	/** Names the preferred placement, mirroring Bootstrap's `placement` option. Default: `top`, and `right` for a popover. */
    	readonly position?: PlacementPosition
    	/** Shifts the tip along and away from its trigger in pixels, mirroring Bootstrap's `offset` option. Default: `[0, 6]`, and `[0, 8]` for a popover. */
    	readonly offset?: readonly [number, number]
    	/** Lists the placements tried in order when the preferred one overflows, mirroring Bootstrap's `fallbackPlacements` option. Default: `['top', 'right', 'bottom', 'left']`. */
    	readonly fallbacks?: readonly PlacementPosition[]
    }
    ```
  - `DropdownOptions.placement`:
    ```ts
    /** Offsets the menu against its reference and selects whether it is anchored; the side comes from the direction classes and `--bs-position`. */
    readonly placement?: {
    	/** Shifts the menu along and away from its reference in pixels, mirroring Bootstrap's `offset` option. Default: `[0, 2]`. */
    	readonly offset?: readonly [number, number]
    	/** If `true`, leaves the menu in flow with `data-bs-popper="static"`, mirroring Bootstrap's `display: 'static'`; if `false`, anchors it in the top layer. Default: `false`. */
    	readonly static?: boolean
    }
    ```
  - `PopoverOptions` keeps its `@remarks`, unchanged, on the `right` and `[0, 8]` defaults.
  - Sources: `tooltip.js` `Default` (`fallbackPlacements: ['top', 'right', 'bottom', 'left']`, `offset: [0, 6]`, `placement: 'top'`); `popover.js` `Default` (spreads `Tooltip.Default`, then `offset: [0, 8]`, `placement: 'right'`); `dropdown.js` `Default` (`display: 'dynamic'`, `offset: [0, 2]`).
- **E2 (claim 9).** `PlacementInput`:
  ```ts
  /** Names the value of the HTML `popover` attribute the element is promoted with: `manual` for a menu or a popover tip, `hint` for a tooltip tip. Default: `manual`. */
  readonly popover?: 'manual' | 'hint'
  ```
- **E3 (claim 6).** `TooltipInterface.fill` and `PopoverInterface.fill` now return `Promise<boolean>`, and each example awaits the call (`const filled = await tooltip.fill({ '.tooltip-inner': 'Saved' })`). The Tooltip `@returns` follows; Popover's names "the popover".
  > Resolves true after the content is written and, when the tip is shown, after the rebuilt tip's `shown` event; false when the tooltip is destroyed, or when the tip is shown and the rebuild's `show` is refused because the tooltip is disabled or has no content, the trigger is not connected to its document, or a listener prevented `show`.

  The first paragraph is unchanged: "Replaces the content of the tip's slots, keyed by each slot's selector, and rebuilds a shown tip." Source: `setContent` and the early returns of `show()` in `tooltip.js`.
- **E4 (claims 7a and 7b).** `TooltipInterface.show`; Popover's names "the popover" in both tags.
  > @returns Resolves true after the `shown` event; false when the tooltip is disabled or has no content, the trigger is not connected to its document, a listener prevented `show`, a transition was in flight, or the tooltip is destroyed.
  >
  > @remarks A settled shown tip is rebuilt, as Bootstrap's `show` rebuilds it. Bootstrap throws for a trigger whose inline `display` is `none`; this contract resolves false there instead.

  The `toggle` sentence is unchanged.
- **E5 (claim 7d).** `CollapseInterface.show`:
  > @returns Resolves true after the `shown` event; false when the panel was shown, a transition was in flight on the panel or on an open accordion sibling, a listener prevented `show`, or the collapse is destroyed.

  Source: the `activeChildren[0]._isTransitioning` check in `collapse.js` `show()`.
- **E6 (claim 7c).** `CarouselInterface.next`:
  > … false when a slide was in flight, the computed following item is the active item (the last item without wrapping, or a single item), a listener prevented `slide`, or the carousel is destroyed.

  `previous` has the mirror: "the computed preceding item is the active item (the first item without wrapping, or a single item)". Source: the `nextElement === activeElement` return in `carousel.js` `_slide`.
- **E7 (F1).** `ScrollSpyInterface`: `/** Reads the active link, or undefined when no section is in view. */ readonly link: HTMLElement | undefined`.
- **E8 (R4).** `/** Configures the initial DOM event subscriptions for a button. */ export type ButtonHooks = EventHooks<ButtonEventMap>`. `ButtonOptions.on` keeps `ButtonHooks`. The guide's `ButtonHooks` row `Kind` is now `type`. `src/browser/helpers.ts` imports `ButtonHooks` type-only, and `check:src:browser` exits 0.
- **E9 (bounds).**
  - `CarouselDetail.from`: `/** Carries the position of the item that was active, as Bootstrap's `from` field does. */`. `to`: `/** Carries the position of the item becoming active, as Bootstrap's `to` field does. */`
  - `SanitizeTargetInterface`: the summary is "Describes a node whose `setHTML` method parses markup through a sanitizer." The `@remarks` is "The DOM library of TypeScript 6.0.3 declares `Sanitizer` and `setHTMLUnsafe` and omits `setHTML`, so a guard narrows an element to this contract before the tip content is written." In the worktree, `node -p "require('typescript/package.json').version"` printed `6.0.3`.
  - `BackdropInterface.destroy`: "Removes the backdrop element at once and abandons a fade in flight."
  - `DismissOptions.backdrop`: "If `true`, a click on the backdrop hides; if `false`, it dispatches `hidePrevented`, mirroring Bootstrap's `backdrop: 'static'`. Applies only while the owning component's `backdrop` option is `true`. Default: `true`." Sources: the `EVENT_CLICK_DISMISS` listener in `modal.js` (`if (this._config.backdrop) { this.hide() }`) and `offcanvas.js` `_initializeBackDrop` (`clickCallback: isVisible ? clickCallback : null`).
- **E10 (parity).** Four guide lines changed, and none of them re-pads its table:
  - § Surface: the `ButtonHooks` `Kind` is `type`.
  - § Surface: the `PlacementOptions` Summary takes the E1 summary.
  - § Surface: the `SanitizeTargetInterface` Summary takes the E9 summary.
  - § Methods `BackdropInterface`: the `destroy` row takes the E9 sentence.

  No `TooltipInterface`, `PopoverInterface`, `CollapseInterface`, or `CarouselInterface` row changed, because no first paragraph there changed. Only `@returns`, `@remarks`, and examples changed in those interfaces.

## Rulings taken

1. **Readonly inline leaves.** The brief's E1 shapes are written without `readonly`, and every leaf here carries it. Bound: `AGENTS.md`, where interface properties are readonly, and the existing inline groups (`dismiss`, `delay`).
2. **Popover defaults on the shared leaves.** The Tooltip `position` and `offset` leaves also state the popover value ("Default: `top`, and `right` for a popover"). A popover reaches those leaves through `extends TooltipOptions`. A leaf stating only the Tooltip default would repeat the claim-4 contradiction on the Popover path. The `PopoverOptions` `@remarks` stays as the brief fixes it. Bound: claim 4's ruling, where every leaf states its entity's Bootstrap value.
3. **The `fallbacks` default is a code value,** `['top', 'right', 'bottom', 'left']`, not a prose list. Bound: the `Default: …` form in `typescript.md` § TSDoc.
4. **The `PlacementOptions` summary is 121 characters,** so the § Surface Summary column (132 characters, set by `TOKEN_NAMES`) does not widen. Bound: the brief's Host note on `oxfmt` re-padding.
5. **Fill refusal order.** The destroyed refusal comes first, so the nested rebuild list closes the sentence without a second "or" clause. Bound: `AGENTS.md` § Writing, where every sentence reads correctly the first time.
6. **The `fill` examples await the result,** as every other `Promise<boolean>` example does. Bound: `typescript.md`, which requires a complete TSDoc with `@example`.
7. **The `DismissOptions.backdrop` coupling says "the owning component's `backdrop` option",** because `DismissOptions.backdrop` is itself a `backdrop` key. Bound: `writing.md`, which requires naming the noun wherever the reader could attach a reference to another referent.

## Observations

1. **Needs a ruling: E4 adds "a transition was in flight" to Tooltip's and Popover's `show` lists, and Bootstrap has no such guard.**
   - `tooltip.js` `show()` checks `display === 'none'`, `_isWithContent() && _isEnabled`, `showEvent.defaultPrevented`, and `!isInTheDom`, and nothing else.
   - `grep -n "_isTransitioning" tooltip.js popover.js base-component.js` returns nothing.
   - The refusal is applied because E4 fixes the list. It is the contract's own serialization, not a Bootstrap refusal.
   - The Objective asks for "a refusal list the Bootstrap source supports". The implementation unit therefore owns the proof, or a `@remarks` departure line must record the refusal.
   - E3's `fill` list, which the brief also fixes, leaves this refusal out. The two lists agree only if the rebuild waits for the transition in flight instead of refusing.
2. **Superseded round-1 rulings.** Round 1's ruling 26 listed `fill` among the `void` verbs, and ruling 31 kept `ButtonHooks` as an interface. E3 and E8 supersede both rulings.
3. **`npm run test:src:browser -- tests/src/browser/index.test.ts`.** The run passed 2 of 2 and exited 0:

   ```text
   npm notice run @orkestrel/veneer@0.0.1 test:src:browser
   npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/index.test.ts

    RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types

   ··

    Test Files  1 passed (1)
         Tests  2 passed (2)
      Start at  13:11:20
      Duration  3.88s (transform 0ms, setup 141ms, import 11ms, tests 13ms, environment 0ms)

   exit 0
   ```

## Unknowns

1. **Guide fences and § Examples.** `grep -n "spy\|ScrollSpy\|popover=\|\bhint\b\|placement:" guides/veneer.md` found no hit in a fence or in § Examples. Its hits are the `ScrollSpyInterface` § Methods heading and row, plus unrelated Styles and Tokens prose: `hint` names a stacking rung and a label's reading, and `placement` names layout. A search of `src`, `app`, `tests`, `ROADMAP.md`, and `README.md` for `PlacementOptions`, `hint`, `ButtonHooks`, `spy.active`, and `.active` found these hits:
   - `src/browser/helpers.ts`: a type-only `ButtonHooks` import, unaffected.
   - `src/core/constants.ts`: `hint: '--vn-stack-hint'`, a token key.
   - The test and setup files: `.active` CSS selectors.

   None of these hits names a renamed member, so none needed a resolution.
2. **Re-padding.** I made the four row edits on a scratch copy, ran `npx oxfmt --config .oxfmtrc.json --write` on that copy, and compared it with the tree through `diff`. The diff showed exactly the four changed lines, with no re-padded row in either table. The round-2 guide diff at the end of this report shows them. I then copied the scratch file into the worktree.

## Acceptance criteria

The gate script ran criteria 1, 2, 4, and 5 in the worktree. It printed each command and its exit code, and its output follows verbatim:

```text
===== $ npm run check:src:browser
npm notice run @orkestrel/veneer@0.0.1 check:src:browser
npm notice run tsc --noEmit -p configs/src/tsconfig.browser.json
===== exit 0
===== $ npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts
===== exit 0
===== $ npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md
Checking formatting...

All matched files use the correct format.
Finished in 4663ms on 2 files using 16 threads.
===== exit 0
===== $ grep -n hint src/browser/types.ts
319:	/** Names the value of the HTML `popover` attribute the element is promoted with: `manual` for a menu or a popover tip, `hint` for a tooltip tip. Default: `manual`. */
320:	readonly popover?: 'manual' | 'hint'
===== exit 0
===== $ grep -n readonly active src/browser/types.ts
646:	readonly active: boolean
===== exit 0
===== $ grep -n placement?: PlacementOptions src/browser/types.ts
===== exit 1
===== $ grep -n fill(content src/browser/types.ts
1057:	fill(content: Readonly<Record<string, TipContent | undefined>>): Promise<boolean>
1180:	fill(content: Readonly<Record<string, TipContent | undefined>>): Promise<boolean>
===== exit 0
===== $ npm run test:guides
npm notice run @orkestrel/veneer@0.0.1 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types

···················

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  13:10:22
   Duration  926ms (transform 159ms, setup 59ms, import 679ms, tests 43ms, environment 0ms)

===== exit 0
===== $ npm run test:policy
npm notice run @orkestrel/veneer@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types

····································································································-·········

 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  13:10:24
   Duration  2.15s (transform 104ms, setup 59ms, import 246ms, tests 1.70s, environment 0ms)

===== exit 0
```

Criterion 4 is met by the preceding grep output:
- `hint` returns only the union and its TSDoc, at lines 319 and 320.
- `readonly active` returns only `TabInterface.active`, at line 646.
- `placement?: PlacementOptions` returns nothing (grep exit 1).
- `fill(content` returns the two `Promise<boolean>` signatures.

## Type-level probe (criterion 3)

The probe file is `probe2.ts` in the executor's scratchpad, and its full text follows:

```ts
// J-TYPES round 2 type-level probe; each line marked BAD must fail, every other line must compile.
import type {
	ButtonEventMap,
	ButtonHooks,
	DropdownOptions,
	EventHooks,
	PlacementInput,
	PopoverInterface,
	ScrollSpyInterface,
	TooltipInterface,
	TooltipOptions,
} from 'C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts'

declare const element: HTMLElement
declare const tip: TooltipInterface
declare const pop: PopoverInterface
declare const wide: EventHooks<ButtonEventMap>
declare const narrow: ButtonHooks

export const tipStatic: TooltipOptions = { placement: { static: true } } // BAD
export const menuPosition: DropdownOptions = { placement: { position: 'top' } } // BAD
export const promotedAuto: PlacementInput = { reference: element, element, popover: 'auto' } // BAD
export const fillVoid: TooltipInterface = { ...tip, fill: () => {} } // BAD
export const spyActive: ScrollSpyInterface = { host: element, target: element, active: undefined, refresh() {}, destroy() {} } // BAD

export const menuControl: DropdownOptions = { placement: { offset: [0, 2], static: true } }
export const tipControl: TooltipOptions = { placement: { position: 'top', offset: [0, 6], fallbacks: ['top'] } }
export const promotedHint: PlacementInput = { reference: element, element, popover: 'hint' }
export const promotedManual: PlacementInput = { reference: element, element, popover: 'manual' }
export const spyLink: ScrollSpyInterface = { host: element, target: element, link: undefined, refresh() {}, destroy() {} }
export const hooksFrom: ButtonHooks = wide
export const hooksTo: EventHooks<ButtonEventMap> = narrow
export const fillTip: Promise<boolean> = tip.fill({ '.tooltip-inner': 'Saved' })
export const fillPop: Promise<boolean> = pop.fill({ '.popover-body': 'Saved' })
export const popAsTip: TooltipInterface = pop
```

The command, run from the worktree root, adds only what a bare `.ts` import and the absent tsconfig require:

```text
npx tsc --ignoreConfig --noEmit --strict --exactOptionalPropertyTypes --lib ESNext,DOM --target ESNext --module preserve --moduleResolution bundler --allowImportingTsExtensions <scratchpad>/probe2.ts
```

It exits 2. The output follows, with the scratchpad path prefix trimmed. It reports the five BAD lines and nothing else:

```text
probe2.ts(20,57): error TS2353: Object literal may only specify known properties, and 'static' does not exist in type '{ readonly position?: PlacementPosition; readonly offset?: readonly [number, number]; readonly fallbacks?: readonly PlacementPosition[]; }'.
probe2.ts(21,61): error TS2353: Object literal may only specify known properties, and 'position' does not exist in type '{ readonly offset?: readonly [number, number]; readonly static?: boolean; }'.
probe2.ts(22,76): error TS2322: Type '"auto"' is not assignable to type '"manual" | "hint"'.
probe2.ts(23,53): error TS2322: Type '() => void' is not assignable to type '(content: Readonly<Record<string, TipContent | undefined>>) => Promise<boolean>'.
  Type 'void' is not assignable to type 'Promise<boolean>'.
probe2.ts(24,80): error TS2353: Object literal may only specify known properties, and 'active' does not exist in type 'ScrollSpyInterface'.
```

The control lines compile: the Dropdown `{ offset: [0, 2], static: true }` group, the Tooltip `{ position: 'top', offset: [0, 6], fallbacks: ['top'] }` group, `popover: 'hint'` and `popover: 'manual'`, the `ScrollSpyInterface` value with `link: undefined`, `ButtonHooks` assigned both to and from `EventHooks<ButtonEventMap>`, both `fill` results typed `Promise<boolean>`, and `PopoverInterface` assigned to `TooltipInterface`.

Two runs show that each BAD line distinguishes its edit:

- **The probe compiled against round 1's `types.ts`.** A scratch copy served as the mutation that reverts E1, E2, E3, and E7. Lines 20, 21, 23, and 24 compile there, so each one binds to its edit. Line 22 fails there for another reason ('popover' is unknown), and the controls for `popover`, `link`, and `fill` fail:
  ```text
  probe2-r1.ts(22,76): error TS2353: Object literal may only specify known properties, and 'popover' does not exist in type 'PlacementInput'.
  probe2-r1.ts(28,76): error TS2353: Object literal may only specify known properties, and 'popover' does not exist in type 'PlacementInput'.
  probe2-r1.ts(29,78): error TS2353: Object literal may only specify known properties, and 'popover' does not exist in type 'PlacementInput'.
  probe2-r1.ts(30,78): error TS2353: Object literal may only specify known properties, and 'link' does not exist in type 'ScrollSpyInterface'.
  probe2-r1.ts(33,14): error TS2322: Type 'void' is not assignable to type 'Promise<boolean>'.
  probe2-r1.ts(34,14): error TS2322: Type 'void' is not assignable to type 'Promise<boolean>'.
  ```
- **The probe compiled against a scratch copy of round 2's `types.ts` with `readonly popover?: string`.** Line 22 compiles, so it binds to the union. The other four BAD lines still fail:
  ```text
  probe2-m.ts(20,57): error TS2353: ... 'static' does not exist in type '{ readonly position?: ...; }'.
  probe2-m.ts(21,61): error TS2353: ... 'position' does not exist in type '{ readonly offset?: ...; readonly static?: boolean; }'.
  probe2-m.ts(23,53): error TS2322: Type '() => void' is not assignable to type '(content: ...) => Promise<boolean>'.
  probe2-m.ts(24,80): error TS2353: ... 'active' does not exist in type 'ScrollSpyInterface'.
  ```

## Worktree state

This is `git status --short` in the worktree:

```text
 M guides/veneer.md
 M src/browser/types.ts
```

This is `git diff --stat` in the worktree, for both rounds together:

```text
 guides/veneer.md     |  308 ++++++++++--
 src/browser/types.ts | 1359 +++++++++++++++++++++++++++++++++++++++++++++++++-
 2 files changed, 1627 insertions(+), 40 deletions(-)
```

The SHA-256 digests after round 2 are these:

```text
10ff431058572a730c3462a29c7032b642a556603dd025e85043d8c5e87b1148  src/browser/types.ts
5c6b9271ec1221de93347f2af0993cc5e1cf1d6d3b3b6b6bb5622da587e5127d  guides/veneer.md
```

## Shared-file patches

None.

## Deviation state

No deviation. Observation 1 needs a ruling.

## Diff of this round against round 1's tree

`git diff` shows both rounds against `376d84a` together. This round's hunks are exactly those in the following diff. Its left side is a copy of round 1's tree, taken before any round-2 edit. Every other hunk in `git diff` belongs to round 1.

```diff
diff --git a/src/browser/types.ts (round 1) b/src/browser/types.ts
index 53892d5..c6912ba 100644
--- a/src/browser/types.ts (round 1)
+++ b/src/browser/types.ts
@@ -35,7 +35,5 @@ export interface ButtonEventMap {
 
 /** Configures the initial DOM event subscriptions for a button. */
-export interface ButtonHooks {
-	readonly toggle?: (event: CustomEvent<ButtonDetail>) => void
-}
+export type ButtonHooks = EventHooks<ButtonEventMap>
 
 /** Configures a button's initial event hooks. */
@@ -248,5 +246,5 @@ export interface BackdropInterface {
 	hide(): Promise<boolean>
 	/**
-	 * Removes the backdrop element at once and releases its listeners.
+	 * Removes the backdrop element at once and abandons a fade in flight.
 	 *
 	 * @example
@@ -301,5 +299,5 @@ export type PlacementPosition =
 export type PlacementSide = 'top' | 'right' | 'bottom' | 'left'
 
-/** Configures where a menu or a tip sits against its reference. */
+/** Configures where the mechanism sets a menu or a tip against its reference, from the values the owning component resolved. */
 export interface PlacementOptions {
 	/** Names the preferred placement, mirroring Bootstrap's `placement` option. Default: `bottom`. */
@@ -319,6 +317,6 @@ export interface PlacementInput {
 	/** Carries the menu or tip that is positioned. */
 	readonly element: HTMLElement
-	/** If `true`, promotes the element with `popover="hint"`; if `false`, with `popover="manual"`. Default: `false`. */
-	readonly hint?: boolean
+	/** Names the value of the HTML `popover` attribute the element is promoted with: `manual` for a menu or a popover tip, `hint` for a tooltip tip. Default: `manual`. */
+	readonly popover?: 'manual' | 'hint'
 }
 
@@ -408,9 +406,9 @@ export interface SetHTMLOptions {
 
 /**
- * Describes a node whose `setHTML` method parses markup through a sanitizer, which the installed DOM declarations omit.
+ * Describes a node whose `setHTML` method parses markup through a sanitizer.
  *
  * @remarks
- * TypeScript's DOM library declares `Sanitizer` and `setHTMLUnsafe` and leaves `setHTML` out, so a
- * guard narrows an element to this contract before the tip content is written.
+ * The DOM library of TypeScript 6.0.3 declares `Sanitizer` and `setHTMLUnsafe` and omits `setHTML`,
+ * so a guard narrows an element to this contract before the tip content is written.
  */
 export interface SanitizeTargetInterface {
@@ -467,5 +465,5 @@ export interface CollapseInterface {
 	 * Shows the panel and hides its open accordion siblings.
 	 *
-	 * @returns Resolves true after the `shown` event; false when the panel was shown, a transition was in flight, a listener prevented `show`, or the collapse is destroyed.
+	 * @returns Resolves true after the `shown` event; false when the panel was shown, a transition was in flight on the panel or on an open accordion sibling, a listener prevented `show`, or the collapse is destroyed.
 	 * @example
 	 * ```ts
@@ -537,6 +535,11 @@ export interface DropdownOptions {
 		readonly outside?: boolean
 	}
-	/** Positions the menu against its reference. Default: the side the direction classes and `--bs-position` select, at offset `[0, 2]`. */
-	readonly placement?: PlacementOptions
+	/** Offsets the menu against its reference and selects whether it is anchored; the side comes from the direction classes and `--bs-position`. */
+	readonly placement?: {
+		/** Shifts the menu along and away from its reference in pixels, mirroring Bootstrap's `offset` option. Default: `[0, 2]`. */
+		readonly offset?: readonly [number, number]
+		/** If `true`, leaves the menu in flow with `data-bs-popper="static"`, mirroring Bootstrap's `display: 'static'`; if `false`, anchors it in the top layer. Default: `false`. */
+		readonly static?: boolean
+	}
 	/** Carries the element the menu is anchored to, mirroring Bootstrap's `reference` option. Default: the toggle. */
 	readonly reference?: HTMLElement
@@ -704,5 +707,5 @@ export interface ScrollSpyInterface {
 	readonly target: HTMLElement
 	/** Reads the active link, or undefined when no section is in view. */
-	readonly active: HTMLElement | undefined
+	readonly link: HTMLElement | undefined
 	/**
 	 * Re-reads the navigation's links and observes their sections again.
@@ -727,5 +730,5 @@ export interface ScrollSpyInterface {
 /** Selects which close requests hide a modal or an offcanvas panel. */
 export interface DismissOptions {
-	/** If `true`, a click on the backdrop hides; if `false`, it dispatches `hidePrevented`, mirroring Bootstrap's `backdrop: 'static'`. Default: `true`. */
+	/** If `true`, a click on the backdrop hides; if `false`, it dispatches `hidePrevented`, mirroring Bootstrap's `backdrop: 'static'`. Applies only while the owning component's `backdrop` option is `true`. Default: `true`. */
 	readonly backdrop?: boolean
 	/** If `true`, Escape hides; if `false`, it dispatches `hidePrevented`, mirroring Bootstrap's `keyboard: false`. Default: `true`. */
@@ -964,6 +967,13 @@ export interface TooltipOptions {
 	/** Receives the tip element, mirroring Bootstrap's `container` option. Default: the nearest ancestor carrying `aria-modal="true"`, else the document body. */
 	readonly container?: HTMLElement
-	/** Positions the tip against its trigger. Default: `top` at offset `[0, 6]`, falling back through `top`, `right`, `bottom`, and `left`. */
-	readonly placement?: PlacementOptions
+	/** Positions the tip against its trigger. */
+	readonly placement?: {
+		/** Names the preferred placement, mirroring Bootstrap's `placement` option. Default: `top`, and `right` for a popover. */
+		readonly position?: PlacementPosition
+		/** Shifts the tip along and away from its trigger in pixels, mirroring Bootstrap's `offset` option. Default: `[0, 6]`, and `[0, 8]` for a popover. */
+		readonly offset?: readonly [number, number]
+		/** Lists the placements tried in order when the preferred one overflows, mirroring Bootstrap's `fallbackPlacements` option. Default: `['top', 'right', 'bottom', 'left']`. */
+		readonly fallbacks?: readonly PlacementPosition[]
+	}
 	/** Configures how markup content is sanitized, read from the constructor alone as in Bootstrap. */
 	readonly sanitize?: SanitizeOptions
@@ -987,5 +997,8 @@ export interface TooltipInterface {
 	 * Builds, inserts, and shows the tip.
 	 *
-	 * @returns Resolves true after the `shown` event; false when the tip was shown, the tooltip is disabled or has no content, a listener prevented `show`, or the tooltip is destroyed.
+	 * @returns Resolves true after the `shown` event; false when the tooltip is disabled or has no content, the trigger is not connected to its document, a listener prevented `show`, a transition was in flight, or the tooltip is destroyed.
+	 * @remarks
+	 * A settled shown tip is rebuilt, as Bootstrap's `show` rebuilds it. Bootstrap throws for a trigger
+	 * whose inline `display` is `none`; this contract resolves false there instead.
 	 * @example
 	 * ```ts
@@ -1036,10 +1049,11 @@ export interface TooltipInterface {
 	 *
 	 * @param content - The content per slot selector; an undefined or empty value removes its slot.
+	 * @returns Resolves true after the content is written and, when the tip is shown, after the rebuilt tip's `shown` event; false when the tooltip is destroyed, or when the tip is shown and the rebuild's `show` is refused because the tooltip is disabled or has no content, the trigger is not connected to its document, or a listener prevented `show`.
 	 * @example
 	 * ```ts
-	 * tooltip.fill({ '.tooltip-inner': 'Saved' })
+	 * const filled = await tooltip.fill({ '.tooltip-inner': 'Saved' })
 	 * ```
 	 */
-	fill(content: Readonly<Record<string, TipContent | undefined>>): void
+	fill(content: Readonly<Record<string, TipContent | undefined>>): Promise<boolean>
 	/**
 	 * Measures the side the shown tip resolved to and rewrites its placement attribute.
@@ -1106,5 +1120,8 @@ export interface PopoverInterface {
 	 * Builds, inserts, and shows the tip, removing the header or body slot whose content is empty.
 	 *
-	 * @returns Resolves true after the `shown` event; false when the tip was shown, the popover is disabled or has no content, a listener prevented `show`, or the popover is destroyed.
+	 * @returns Resolves true after the `shown` event; false when the popover is disabled or has no content, the trigger is not connected to its document, a listener prevented `show`, a transition was in flight, or the popover is destroyed.
+	 * @remarks
+	 * A settled shown tip is rebuilt, as Bootstrap's `show` rebuilds it. Bootstrap throws for a trigger
+	 * whose inline `display` is `none`; this contract resolves false there instead.
 	 * @example
 	 * ```ts
@@ -1155,10 +1172,11 @@ export interface PopoverInterface {
 	 *
 	 * @param content - The content per slot selector; an undefined or empty value removes its slot.
+	 * @returns Resolves true after the content is written and, when the tip is shown, after the rebuilt tip's `shown` event; false when the popover is destroyed, or when the tip is shown and the rebuild's `show` is refused because the popover is disabled or has no content, the trigger is not connected to its document, or a listener prevented `show`.
 	 * @example
 	 * ```ts
-	 * popover.fill({ '.popover-header': 'Draft', '.popover-body': 'Saved at noon' })
+	 * const filled = await popover.fill({ '.popover-header': 'Draft', '.popover-body': 'Saved at noon' })
 	 * ```
 	 */
-	fill(content: Readonly<Record<string, TipContent | undefined>>): void
+	fill(content: Readonly<Record<string, TipContent | undefined>>): Promise<boolean>
 	/**
 	 * Measures the side the shown tip resolved to and rewrites its placement attribute.
@@ -1297,7 +1315,7 @@ export interface CarouselDetail {
 	/** Names the direction the items move, as Bootstrap's `direction` field does. */
 	readonly direction: SwipeDirection
-	/** Sets the position of the item that was active, as Bootstrap's `from` field does. */
+	/** Carries the position of the item that was active, as Bootstrap's `from` field does. */
 	readonly from: number
-	/** Sets the position of the item becoming active, as Bootstrap's `to` field does. */
+	/** Carries the position of the item becoming active, as Bootstrap's `to` field does. */
 	readonly to: number
 }
@@ -1346,5 +1364,5 @@ export interface CarouselInterface {
 	 * Slides to the following item.
 	 *
-	 * @returns Resolves true after the `slid` event; false when a slide was in flight, the last item is active without wrapping, a listener prevented `slide`, or the carousel is destroyed.
+	 * @returns Resolves true after the `slid` event; false when a slide was in flight, the computed following item is the active item (the last item without wrapping, or a single item), a listener prevented `slide`, or the carousel is destroyed.
 	 * @example
 	 * ```ts
@@ -1356,5 +1374,5 @@ export interface CarouselInterface {
 	 * Slides to the preceding item.
 	 *
-	 * @returns Resolves true after the `slid` event; false when a slide was in flight, the first item is active without wrapping, a listener prevented `slide`, or the carousel is destroyed.
+	 * @returns Resolves true after the `slid` event; false when a slide was in flight, the computed preceding item is the active item (the first item without wrapping, or a single item), a listener prevented `slide`, or the carousel is destroyed.
 	 * @example
 	 * ```ts
diff --git a/guides/veneer.md (round 1) b/guides/veneer.md
index b633e53..112d64e 100644
--- a/guides/veneer.md (round 1)
+++ b/guides/veneer.md
@@ -31 +31 @@ publishes the color-mode controller. The token values those names carry are in 
-| `ButtonHooks`             | interface | Configures the initial DOM event subscriptions for a button.                                                                         |
+| `ButtonHooks`             | type      | Configures the initial DOM event subscriptions for a button.                                                                         |
@@ -56 +56 @@ publishes the color-mode controller. The token values those names carry are in 
-| `PlacementOptions`        | interface | Configures where a menu or a tip sits against its reference.                                                                         |
+| `PlacementOptions`        | interface | Configures where the mechanism sets a menu or a tip against its reference, from the values the owning component resolved.            |
@@ -65 +65 @@ publishes the color-mode controller. The token values those names carry are in 
-| `SanitizeTargetInterface` | interface | Describes a node whose `setHTML` method parses markup through a sanitizer, which the installed DOM declarations omit.                |
+| `SanitizeTargetInterface` | interface | Describes a node whose `setHTML` method parses markup through a sanitizer.                                                           |
@@ -201 +201 @@ The interface exposes the following lifecycle operations.
-| `destroy` | Removes the backdrop element at once and releases its listeners.                  |
+| `destroy` | Removes the backdrop element at once and abandons a fade in flight.               |
```
