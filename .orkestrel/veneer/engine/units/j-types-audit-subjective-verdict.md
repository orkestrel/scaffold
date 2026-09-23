# J-TYPES audit round 1 — the subjective lane's verdict (returned 2026-09-23 by reviewer on Opus 5.5, native subagent `claude-opus-5-5[1m]`, 36 tool uses, 485 s; retained verbatim from the subagent's final message, HTML entities decoded)

---

**Lane: subjective.** The `reviewer` role ran on Opus 5.5, reached as a native Claude subagent (`claude-opus-5-5[1m]`). Opus 5.5 also wrote this unit.

**Dispatch note.** The brief names `types-gates.log` as the Orchestrator's evidence, but supplies no path for it. I did not open it. Where a claim rests on that run, I cite it as the brief's "Already established" statement.

## Numbered verdicts

1. **CONFIRMED** (ruled from the source; this claim is not my lane's to decide). Attack: I listed every `EventHandler.trigger(` call under `bootstrap/js/src/` and compared each entity's dispatched set with its `{Entity}EventMap` keys.
   - Collapse: `collapse.js:129,156,171,199`.
   - Dropdown: `dropdown.js:133,156,188,209`.
   - Modal: `modal.js:103,128,198,256,265`.
   - Offcanvas: `offcanvas.js:98,122,133,154,170,206`.
   - ScrollSpy: `scrollspy.js:233`.
   - Tab: `tab.js:90,93,122,149`.
   - Toast: `toast.js:76,90,107,116`.
   - Tooltip: `tooltip.js:193,212,230,247,278`.
   - Alert: `alert.js:38,53`.
   - Carousel: `carousel.js:316`, through `_triggerSlideEvent` for `slide` and `slid`.

   No map carries a key for a listener-only constant, and no dispatched event lacks a key. Every key's TSDoc names its `.bs.{entity}` wire event.

2. **CONFIRMED** (ruled from the source). Attack: I read the object argument of each `trigger` call and looked for a field hydrated on only some events that is typed non-optional.
   - Modal and Offcanvas pass `relatedTarget` on `show` and `shown` only (`modal.js:103,198`; `offcanvas.js:98,122`). `ModalDetail` and `OffcanvasDetail` type it `HTMLElement | undefined`.
   - Tab's `relatedTarget` can be the null `active` value on first activation (`tab.js:93`), and the contract types it `| undefined`.
   - Dropdown's `clickEvent` is `MouseEvent | undefined`.
   - Collapse, Tooltip, Popover, Alert, and Toast pass no object, and their maps carry `CustomEvent<undefined>`.
   - `null` appears only in prose (my grep of `types.ts`).

3. **BROKEN** (ruled from the source). The shared `PlacementOptions` type, around line 304 of `src/browser/types.ts`, makes each entity's `placement` group carry leaves that mirror no key of that entity's `Default` object.
   - `TooltipOptions.placement.static`, around line 967, and the same leaf inherited by Popover, mirrors Dropdown's `display`. `tooltip.js:58-79` has no `display` key.
   - `DropdownOptions.placement.position` and `.fallbacks`, around line 540, mirror Tooltip's `placement` and `fallbackPlacements`. `dropdown.js:71-78` has neither key.

   Failing input: `new Tooltip(host, { placement: { static: true } })` typechecks. No ruling defines a static tooltip: R9 names static only for a Dropdown's `display: 'static'` and a menu inside `.navbar`.

   Smallest fix:
   - Give each entity its own group. Tooltip and Popover take `{ position?, offset?, fallbacks? }`. Dropdown takes `{ offset?, static? }`.
   - Let the `Placement` mechanism take the values the component resolved.
   - Every group-level and leaf-level `Default:` sentence then states that entity's value.

   The `on?` and `signal?` half of the claim holds.

4. **BROKEN** (ruled from the source; same carrier as claim 3). The `PlacementOptions` leaves state the mechanism's defaults (around lines 305-311):
   - `position` states `bottom`.
   - `offset` states `[0, 0]`.
   - `fallbacks` states "the opposite side".

   Each consumer reaches those leaves through its `placement` path, where the group sentence states a different value:
   - `DropdownOptions.placement` states `[0, 2]`, matching `dropdown.js:75`.
   - `TooltipOptions.placement` states `top`, `[0, 6]`, and a four-side fallback list, matching `tooltip.js:65,67,68`.
   - Popover's `@remarks` states `[0, 8]`.

   So `DropdownOptions.placement.offset` carries two contradictory `Default:` sentences, and an editor hover on the leaf shows `[0, 0]`, which is false for every component. That is a stated default departing from Bootstrap beyond the one Tooltip `container` departure the claim allows. Per-entity groups (claim 3) close this.

5. **CONFIRMED** (my lane decides). I compared each interface with Bootstrap's public methods and the planner's Components table (planner proposal, lines 177-188), under R12's renames.
   - Attack 1, a missing public verb: `nextWhenVisible` is internal per R12. `toggleEnabled` splits into `enabled`, `enable`, and `disable`. `handleUpdate` becomes `update`. `to` becomes `slide(index)`. `cycle` becomes `start`. Toast has no `toggle`, and Bootstrap's Toast has none either. None is missing.
   - Attack 2, an extra non-getter member: the only additions are `host` and the assigned getters (`menu`, `pane`, `active`, `target`, `index`, `shown`, `enabled`).

   Modal and Offcanvas take `show(trigger?)` and `toggle(trigger?)`, as Bootstrap's `show(relatedTarget)` does. The naming of ScrollSpy's `active` getter is finding F1, not a membership defect.

6. **BROKEN** (ruled from the source). `TooltipInterface.fill` (around line 1043) and `PopoverInterface.fill` return `void`. Bootstrap's `setContent`, which `fill` mirrors under R12, calls `this.show()` again when the tip is shown (`tooltip.js:326-331`). That `show()` dispatches the cancelable `show.bs.tooltip` (`tooltip.js:193`) and runs the fade.
   - By ruling 26's own test (a verb that dispatches a pre-change event or runs a transition returns `Promise<boolean>`), `fill` belongs with `show`.
   - Failing state: the tip is shown, a `show` listener calls `preventDefault()`, then `fill({ '.tooltip-inner': 'Saved' })` runs. Bootstrap has already removed the tip (`_disposePopper`, `tooltip.js:597-605`), the prevented show leaves it hidden, and a `void` return gives the caller no way to learn that.

   Smallest fix: declare `fill(content): Promise<boolean>`. It resolves as the rebuild's `show` resolves, and resolves `true` at once when the tip is hidden (only the content changes). Its `@returns` names the refusals. Alternatively, rule and document that `fill` rebuilds a shown tip without dispatching events; that is a departure R12 would have to record.

7. **UNRESOLVED**. The refusal lists match the source for Dropdown (`dropdown.js` `show` and `hide`), Modal, Offcanvas, Tooltip, Toast, and Alert.
   - Collapse's `show` also returns early when an open accordion sibling is mid-transition (`collapse.js:125`). `CollapseInterface.show`'s `@returns` says only "a transition was in flight", which does not say whose transition.
   - To settle: the objective lane rules whether that sentence covers the sibling's transition, or requires it to be named.

8. **CONFIRMED** (ruled from the source). Attack: I grepped the whole of `src/browser/types.ts` for `null`, `any`, ` as `, `!.`, `@ts-`, `eslint-disable`, `public`, `private`, `protected`, and `^import`. Every hit is prose. I read every added property: each is `readonly`. Collections are `readonly PlacementPosition[]`, `readonly number[]`, `readonly [number, number]`, and `Readonly<Record<string, ReadonlyArray<string | RegExp>>>`, and the `fill` parameter is `Readonly<Record<…>>`.

9. **BROKEN** (my lane decides). Registry, Snapshot, Isolation, Backdrop, ScrollLock, and Swipe hold as the claim states. Placement fails on two points.
   - **(a) `PlacementInput.hint?: boolean`, around line 321.**
     - The promotion mode is the value of the HTML `popover` attribute, written verbatim. `names.md` § General vocabulary keeps external-spec literals as unions.
     - `hint` is a noun. The value-level table requires a boolean to be an adjective or past participle.
     - `hint: false` hides the real value it selects (`manual`), which no type names.
     - Right shape: `readonly popover?: 'manual' | 'hint'`, whose TSDoc names the HTML `popover` attribute it mirrors, with `Default: 'manual'`. The `auto` value stays out per R9.
   - **(b) `PlacementOptions.static`, around line 312.**
     - This puts Dropdown's `display: 'static'` option, a component decision, into the shared mechanism contract. Through claim 3 it reaches Tooltip and Popover.
     - It is also the only reason `PlacementInterface.side` is `PlacementSide | undefined` ("undefined when the element stays in flow", around line 332).
     - R9 says static display gets "no promotion and no anchoring", so on that path `Placement` does no placement work.
     - Right shape: Dropdown writes `data-bs-popper="static"` itself and constructs no `Placement` for static display or a menu inside `.navbar`. `PlacementOptions` loses `static`, and the reason for `side`'s undefined case is re-derived.
     - R9's text assigns that write to `Placement`, so point (b) needs an Orchestrator ruling (Referral R1). Point (a) needs none.

10. **CONFIRMED** (ruled from the source; the probe run is named for the Orchestrator).
    - `EventHooks` listeners return `void` (around line 81).
    - `EventWire` values are `` `${TKey & string}.${string}` `` (around line 100). `'shown.bs.collapse'` fails the `` `show.${string}` `` pattern at its fifth character.
    - The mapped type admits no key outside `keyof TMap`.
    - `ButtonHooks` (around line 37) and `EventHooks<ButtonEventMap>` both reduce to `{ readonly toggle?: (event: CustomEvent<ButtonDetail>) => void }`.
    - `PopoverInterface` repeats `TooltipInterface`'s members exactly.
    - `PopoverOptions extends TooltipOptions`, so the `extends` clause's own check enforces the override's compatibility, and the Orchestrator's `check:src:browser` run compiled it.

    Mutations the declarations distinguish:
    - Typing the `EventWire` values as `string` admits the bad table.
    - Adding an index signature to `EventHooks` admits an unknown key.

    Run for the Orchestrator: compile a probe against the worktree's `types.ts` containing `{ show: 'shown.bs.collapse', … }` typed as `EventWire<CollapseEventMap>`, and `{ opened: () => {} }` typed as `CollapseHooks`. Both must fail with TS2322 and TS2353, and a correct table must compile beside them as the control.

11. **UNRESOLVED** (ruled from the source). Two rules disagree over a large set of member blocks.
    - Every boolean member opens its first sentence with "If `true`, …", not a third-person `-s` verb. Examples: `CollapseOptions.toggle` (around line 452), `DropdownOptions.dismiss.inside`, `TooltipOptions.html` (around line 955), and `PlacementOptions.static`.
    - `typescript.md` requires the `-s` verb opening, but prescribes "If `true`, …" for a boolean parameter and names no form for a boolean property.
    - `policy/no-malformed-summary` reads only top-level export blocks, so no gate decides this.
    - The `@param`, `@returns`, and `@example` coverage holds on my read.
    - To settle: the objective lane or the Orchestrator rules which form governs a boolean property. The claim is BROKEN or CONFIRMED on that ruling.

12. **CONFIRMED**. `j-types-status.txt` lists exactly `guides/veneer.md` and `src/browser/types.ts`. In the diff, `src/browser/types.ts` changes only the `ColorModeInterface.toggle` summary (hunk `@@ -17,7 +17,7`) before appending at line 70. Attack: I compared the re-padded § Surface rows cell by cell with the rows the diff removes; every summary is identical. The guide's whitespace-blind line count is the Orchestrator's run.

13. **CONFIRMED** (my lane decides). Attack: I searched the added members for anything that is not one word.
    - Hits: `hidePrevented`, `relatedTarget`, `clickEvent`, `autohide`, and `setHTML`. `autohide` is a one-word Bootstrap key kept verbatim.
    - `setHTML` is a platform method, not a Bootstrap one, so it falls outside the claim's example set. It sits under the same mirrored-name sentence, its TSDoc names the platform method, and an `Element` can satisfy the interface structurally only under that exact name.
    - Type names take the listed forms. The discriminant is `category`. Every renamed Bootstrap member is on R12's list.

14. **CONFIRMED** on the names (my lane's half).
    - `lib.dom.d.ts` declares `interface Sanitizer` at line 34572 and `setHTMLUnsafe(html: string)` at 13893 and 35328, with no `setHTML(`. My grep reproduced the Orchestrator's reading.
    - `SetHTMLOptions` is the HTML standard's own dictionary name, and its TSDoc says so. No narrower lawful name exists for a mirror.
    - `SanitizeTargetInterface` takes the `{Entity}Interface` form for the one-method node that the sanitize path writes to. Attack: I looked for a narrower entity noun (the platform names no interface for this; it is a member of `Element` and `ShadowRoot`) and found none that is also lawful.
    - Each type carries only `sanitizer` and `setHTML(html, options?)`.
    - Whether R10 requires these two contracts at all is the objective lane's half.

15. **CONFIRMED** (ruled from the source plus the Orchestrator's mutation run).
    - The refusal comes from `#inspectExamples` in `node_modules/@orkestrel/guide/dist/src/core/index.js` (around lines 3746-3753). It calls `findUnexampled` (around lines 869-876) on each method-table group, with the example names from `row.source.examples(interface)` and a word-boundary match over every `ts` fence.
    - `tests/guides.test.ts`, line 126, asserts that `report.examples.methods` is empty.
    - The mutation: with the member `@example` blocks removed, no `ts` fence contains `\bshow\b` or `\bhide\b`, so both names come back. The Orchestrator's reddened run matches.
    - The admission half holds because the Orchestrator's run went green at 19 of 19 with no Collapse class present.
    - Limit on "exercises": a single word match in any fence counts as an example, which is why `toggle` and `destroy` pass on the ColorMode fences.

## Findings fitting no claim

**F1. `ScrollSpyInterface.active` is an element while `TabInterface.active` is a boolean.**
- Site: `ScrollSpyInterface.active: HTMLElement | undefined` (around line 706) against `TabInterface.active: boolean` (around line 643).
- What is wrong: one word carries two types and two concepts across sibling contracts in one package. As an element reference, `active` is an adjective standing in for a noun. The laws are `AGENTS.md` § Design laws (one concept, one term) and `names.md` § General vocabulary ("Properties are nouns"; "Booleans read as assertions").
- Why it matters: this is the base every consumer reads. `if (spy.active)` and `if (tab.active)` look identical and test different things.
- Right shape: rename the ScrollSpy getter to `link`, with TSDoc "Reads the active link, or undefined when no section is in view." Its § Surface summary stays unchanged.
- Carrier: the planner's Components table (planner proposal, line 181), which the verdict adopted, assigned `active`. The rename therefore needs the Orchestrator's ruling before a successor J-TYPES brief carries it.

## Attacked and held

- **`PopoverInterface` declares its own members instead of `extends TooltipInterface`.** Attack: duplication lets the two contracts drift. Held: the parity reader reads only a declaration's own body (report ruling 24), and the two interfaces stay mutually assignable. What remains is a drift risk, not a defect.
- **The name `DismissOptions` claims every `dismiss` key, while Dropdown's `dismiss` group is a different inline shape.** Held: its TSDoc scopes it to a modal or an offcanvas panel. No narrower lawful name exists without the `Overlay` entity the verdict dropped.
- **`SnapshotCategory`'s `'property'` could be read as a DOM property.** Held: the `category` TSDoc says "inline style property", and R4 fixes the word.
- **`SanitizeOptions.filter` collides with the `filter*` helper prefix.** Held: the prefix table governs module helpers, and R11 fixes the option key.
- **`trigger` names both an element (`IsolationOptions.trigger`, the `show(trigger?)` parameter) and Tooltip's interaction group.** Held: both uses are Bootstrap's own vocabulary.
- **`EventWire` does not type the namespace**, so a copied table naming `show.bs.modal` under Collapse's `show` key compiles. Held: R3 fixes only the key-to-verb binding. An `EventWire<TMap, TNamespace>` parameter is an optional tightening.
- **`SwipeDirection` is shared by `SwipeOptions.handler` and `CarouselDetail.direction`.** Held: a left swipe maps to `ORDER_NEXT` and then to `'left'` (`carousel.js:246,396,404`).
- **`PlacementInput` is a separate `{Entity}Input` object.** Held: it keeps the mode each component fixes out of the consumer's `placement` group.
- **`SwipeOptions.handler` and `RegistryOptions.code` are required members on an options type.** Held: the mechanism cannot run without either value.

## Referrals

- **R1, to the Orchestrator.** Claim 9(b)'s fix removes `static` from `Placement`, which contradicts R9's text ("`Placement` … writes `data-bs-popper="static"` with no promotion and no anchoring"). Rule whether R9 is amended, or `static` stays on the mechanism and only the per-entity split of claim 3 lands.
- **R2, to the objective lane.** `BackdropInterface.destroy` says "releases its listeners", but the contract gives no way to register one. Bootstrap's Offcanvas passes `clickCallback` (`offcanvas.js:168-185`; `util/backdrop.js:25,140`). Confirm that Offcanvas listening on `backdrop.element` is the intended route, or add the missing member.
- **R3, to the objective lane.** Bootstrap's Modal with `backdrop: false` has no light dismiss (`modal.js:238-240`). The contract's `dismiss.backdrop` defaults to `true` and states no coupling to `ModalOptions.backdrop`. Rule the combined behaviour for J-MODAL.
- **R4, to the Orchestrator.** Ruling 31 names J-BINDER as the carrier for the `ButtonHooks` migration. The verdict's § Units and routing makes `types.ts` report-only after W0, so confirm that J-BINDER's brief names a `types.ts` patch for `ButtonHooks` and the guide's `Kind` cell.
- **R5, to the Orchestrator.** If this unit lands on `main` alone, the guide carries § Surface rows and § Methods tables describing engines that have no class. The § Surface intro still says the browser entry "publishes the color-mode controller", and R18 assigns that sentence elsewhere. Confirm that no release is cut from `main` before the implementing units land.

## Bounds (TSDoc wording, not findings)

- `CarouselDetail.from` and `.to` open with "Sets the position" on readonly event fields. "Carries the position" fits.
- The `SanitizeTargetInterface` summary clause "which the installed DOM declarations omit" states a toolchain fact that goes false when TypeScript declares `setHTML`.

VERDICT: FAIL 3, 4, 6, 7, 9, 11; outside the claims: F1
