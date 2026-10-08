# Verdict: the sortable after Drag 1, and Sass in the styles layer

On 2026-10-08 the user ordered two things. The first is to build every styles-layer rule in Sass over the Bootstrap layer so each variation is generated, not written by hand. The second is to take a hard look at the sortable (`src/browser/drags/`, Drag 1), using the elements repository as guidance. This verdict rests on four verified readings and their verdicts: `veneer-drags` (the Drag 1 module, proofs, guide, and records), `elements-drag` (the elements `createDrag`, `createDrop`, `_drag.scss`, and showcase), `platform` (HTML drag and drop, Pointer Events 3, DOM `moveBefore()`, WAI-ARIA, the ARIA Authoring Practices Guide (APG), and WCAG 2.2), and `sass-surface` (the Bootstrap and styles Sass faces and their gates). It also rests on own reads of `Drag.ts`, `_list-group.scss`, `_utilities.scss`, `Showcase.ts`, and `setup.ts`. The veneer laws govern: single-word entity APIs, types first, derived state, no superfluous wrappers, no polling, and a functional core with an imperative shell. The veneer rule files resolve to the scaffold copies because `/home/user/veneer/.claude/rules/` does not exist. The user's rulings of the fourth, eighth, eleventh, twelfth, and thirteenth rounds bind every unit: the native track builds from scratch what Bootstrap lacks, the Bootstrap layer and the Bootstrap families of the engine are sealed, every veneer style lives in the styles layer as Sass over the Bootstrap partials, and the elements repository is guidance that is never copied. The dispatch names no lane, so this verdict holds the objective lane (correctness, constraints, and what the contracts permit). Naming and ergonomic calls appear as Tension lines inside the unit contracts for the subjective lane or the Orchestrator to rule.

## Findings

The following table lists 20 findings: 7 defects, 11 gaps, and 2 improvements.

| Finding | Severity | Evidence | Source |
| --- | --- | --- | --- |
| The owned output is the relocation reference for the last slot. An item appended after mount sits after the output. Alt+ArrowDown toward that item, or a pointer `after` drop on it, misplaces the item or leaves the order unchanged, yet the module still emits `move`, `end` with `moved: true`, and "Moved to position N of M". | defect | `/home/user/veneer/src/browser/drags/Drag.ts:37` appends the output at mount; `:261` reads `children.filter((child) => child !== item)[to] ?? this.#output`. Case: host [A, B, output, C], Alt+ArrowDown on B gives `moveBefore(B, output)` with no order change. | veneer-drags verdict (missing item 1); own read of `Drag.ts:33-37, 244-272` |
| A throwing move leaves the session stuck. When a listener re-renders and detaches the output, `moveBefore` or `insertBefore` throws, so `#finish` never runs on the keyboard path. `#item` then stays set, and `:214` refuses every later Alt+Arrow press until Escape or `dragend`. | defect | `/home/user/veneer/src/browser/drags/Drag.ts:214` (the `#item` refusal), `:241` (`this.#finish(this.#relocate(...))` with no `try`/`finally`), `:263-265`. | veneer-drags verdict (missing item 2); own read of `Drag.ts` |
| Inferred from CSS source with no capture: the owned output inside the host breaks the Bootstrap list markup it rides on. The output is the host's last child, so the real last `.list-group-item` element never matches `:last-child` and loses Bootstrap's bottom radii. A `role=list` host also owns an implicit `status` child, which list ownership forbids. The guide prescribes a `div` host because of this placement. | defect | `/home/user/veneer/src/bootstrap/components/_list-group.scss:49-52` (`.list-group-item:last-child` radii); `/home/user/veneer/src/browser/drags/Drag.ts:37`; `/home/user/mikesaintsg/elements/guides/w3c/aria.md:131` (`output` maps to `status`); `/home/user/veneer/guides/veneer.md:1138` (`div` host recommended because of the output). | Own read of `_list-group.scss` and `Drag.ts`; platform verdict (missing item 6); veneer-drags question 5 |
| Inferred from CSS source with no capture: the showcase indicator draws a 2px primary frame on all four sides, not an insertion line, and changes the item's box during `dragover`. The `border-2` class sets every side's width and `border-primary` recolors every side, both as `!important` declarations outside every layer. The journey asserts only that the classes are present. | defect | `/home/user/veneer/app/browser/Showcase.ts:139-144`; `/home/user/veneer/src/bootstrap/_utilities.scss:211-229` and the `border-width` entry; `/home/user/veneer/tests/app/browser/integration.test.ts:215-222` (class presence only). | veneer-drags verdict (missing item 3); own read of `Showcase.ts:135-152` |
| The axis is wrong for a flex row under `writing-mode: sideways-lr`. Inline flow there runs bottom to top, but `reversed` for a row reads only `direction === 'rtl'`, so both the drop side and the arrow keys invert. | defect | `/home/user/veneer/src/browser/drags/Drag.ts:128-130`. | veneer-drags verdict (missing item 7); own read |
| Against WCAG 2.2 SC 2.5.7 (AA): the sortable offers no single-pointer, non-dragging way to reorder. Alt+Arrow keyboard support does not meet the criterion by itself. | defect | `/home/user/veneer/src/browser/drags/Drag.ts:203-242` (drag and Alt+Arrow only); the WCAG 2.5.7 Understanding text as paraphrased in the platform reading, fetched 2026-10-08 and unverified until a capture is attached. | Platform reading fact "WCAG 2.2 SC 2.5.7" and verdict (missing item 8) |
| The guide says Escape ends without a DOM move, while its own departure row says injected Escape during a native drag reaches no listener and physical Escape is unestablished. The guide also claims every Alt+Arrow press emits `start`, `move`, and `end`, but an out-of-range press emits nothing after `preventDefault`. | defect | `/home/user/veneer/guides/veneer.md:1171` against `:1215`; `/home/user/veneer/src/browser/drags/Drag.ts:230-233`. | veneer-drags reading (contradiction) and verdict (corrections 1 and 4) |
| Drops land only on item children. Host padding, the gaps between items, an empty host, and a Bootstrap `.list-group-item.disabled` element cannot receive a drop. The disabled case arises because Bootstrap sets `pointer-events: none`, so `dragover` goes to the host, which Drag 1 does not route. | gap | `/home/user/veneer/src/browser/drags/Drag.ts:56-62, 73-88`; `/home/user/veneer/src/browser/drags/plugins.ts:29` (selector `[data-vn-drag] > *` only); `/home/user/veneer/src/bootstrap/components/_list-group.scss:53-58`. | veneer-drags reading gap "Drops are accepted only on item children"; own read of `_list-group.scss` |
| The `data-vn-insert` attribute carries the logical DOM side (`before` or `after`), but CSS needs the physical edge. Logical properties absorb writing mode and direction but not `flex-direction: *-reverse`. Bootstrap's `list-group-horizontal-{sm..xxl}` classes also switch axis at each breakpoint, and no host attribute exposes the axis. | gap | `/home/user/veneer/src/browser/drags/Drag.ts:171-189`; `/home/user/veneer/src/bootstrap/components/_list-group.scss:88-153` (responsive horizontal variants); `/home/user/mikesaintsg/elements/src/styles/composables/_drag.scss:88-102` (an `inset-inline` line for vertical lists only). | sass-surface verdict (missing item 3); platform verdict (missing item 3) |
| No styles ship for the sortable. There is no grab cursor, no `touch-action` rule on the handle, no insertion line that keeps the item's box, no forced-colors rule, and no reduced-motion guard. Consumers repaint the state attributes themselves, and the showcase does so with a `MutationObserver` class adapter. The thirteenth-round ruling puts every veneer style in the styles layer as Sass. | gap | `/home/user/veneer/guides/veneer.md:1188-1197`; `/home/user/veneer/app/browser/Showcase.ts:135-152`; `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/stage-b/user-rulings-2026-10-06.md:74`. | veneer-drags reading gap "shipped style layer"; sass-surface fact "Sortable (drag) styling contract today" |
| Part of the Sass ruling is blocked: the maps the ruling names (`$theme-colors`, `$grid-breakpoints`, `$spacers`) do not exist in veneer's Bootstrap Sass. The only maps are `$utilities` and `$breakpoints`, both in `_utilities.scss`, whose top-level schedule emits the whole utilities sheet on any load. The `_tokens.scss` partial emits every `--bs-*` property on load. The components partials define no variable, map, mixin, or loop. The conformance gate refuses every relative load between `src/styles` and `src/bootstrap`, and the published barrel forwards only `$layered`. As of 2026-10-08, no sanctioned path hands `src/styles` a Bootstrap map without Bootstrap CSS. | gap | `/home/user/veneer/src/bootstrap/_utilities.scss:6, 1035-1041, 1043-1077`; `/home/user/veneer/src/bootstrap/_tokens.scss:18-194`; `/home/user/veneer/src/bootstrap/index.scss:1`; `/home/user/veneer/tests/conformance.test.ts:672-680`; `/home/user/veneer/tests/setup.ts:406-444`; `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/stage-b/user-rulings-2026-10-06.md:74`. | sass-surface reading facts and gaps 1-2; own read of `_utilities.scss` and `setup.ts` |
| Veneer's Bootstrap mixins give `src/styles` nothing it can call. The `layer` mixin writes `@layer bootstrap`. The `utility` and `unlayer` mixins lift every property declaration outside every layer as `!important` under a hard-coded `--bs-` prefix. The `src:styles` placement proof refuses both outcomes. The `src/styles/_mixins.scss` partial holds only `retune`, and the transition mixin that `styles.md:70` requires does not exist. | gap | `/home/user/veneer/src/bootstrap/_mixins.scss:14-22, 24-76, 79-100`; `/home/user/veneer/tests/src/styles/index.test.ts:8-32`; `/home/user/veneer/src/styles/_mixins.scss:1-22`; `/home/user/scaffold/.claude/rules/styles.md:70-71`. | sass-surface reading and verdict corrections 1-2 |
| A Bootstrap utility on an item beats every styles-layer rule on the same property. The `opacity-*` and `border-*` utilities are `!important` declarations outside every layer, so an indicator drawn with border or opacity on the item itself yields to author utilities. An indicator on `::before` would also collide with `.list-group-numbered > .list-group-item::before`, and an indicator drawn with `box-shadow` disappears in forced-colors mode. | gap | `/home/user/veneer/ROADMAP.md:34`; `/home/user/veneer/src/bootstrap/_mixins.scss:79-90`; `/home/user/veneer/src/bootstrap/components/_list-group.scss:32-35`. | sass-surface verdict (missing item 4); veneer-drags verdict (missing item 6); own read of `_list-group.scss` |
| Touch input is unestablished. The only pointer path is native HTML drag and drop, with no pointer capture, slop, `pointercancel` handling, or `touch-action` rule. HTML fires `pointercancel` at the source after `dragstart`, so one gesture cannot run both native drag and drop and a capture drag. | gap | `/home/user/veneer/src/browser/drags/Drag.ts:66-67`; `/home/user/veneer/guides/veneer.md:1206`; HTML § 6.11.5 step 10 as paraphrased in the platform reading (unverified web quote). | veneer-drags reading gap 1; platform reading facts "pointer stream ends at dragstart" and "touch-action" |
| Cross-list transfer is missing, and the addendum's plan collides with Drag 1. The plan assigns Alt+ArrowLeft and Alt+ArrowRight to host-to-host moves, which Drag 1 uses for row-axis reorder. The plan also keeps the session in the plugin, while Drag 1 keeps `#item` per controller and the plugin holds no state. | gap | `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/catalog-2026-10-07/elements-addendum.md:82-93`; `/home/user/veneer/src/browser/drags/Drag.ts:13, 73, 227-228`; `/home/user/veneer/src/browser/drags/plugins.ts:12-53`. | veneer-drags verdict (missing item 8) |
| The announcements carry no item or list name, nothing on cancel or refusal, and identical consecutive messages that assistive technology might not re-announce. The English text is fixed inside framework code. | improvement | `/home/user/veneer/src/browser/drags/Drag.ts:270`. | veneer-drags reading gap "Live text lacks the item's name"; verdict (missing item 9) |
| A stale `#pressed` field is reused. A `pointerdown` that never becomes a drag leaves `#pressed` set until `end()` or the next `#start`, so a later `dragstart` on another item judges its handle against the wrong target. | improvement | `/home/user/veneer/src/browser/drags/Drag.ts:67, 137-139`. | veneer-drags verdict (missing item 10) |
| No proof covers the `insertBefore` fallback, reversed or vertical axes, the synchronous re-render branch, destroy mid-drag, the plugin clear path, the output-reference defect, or refusals beyond `input`. The `src:styles` proof reads only style-rule declarations, so a top-level `@keyframes`, a `@property`, or a nested foreign `@layer` block passes. | gap | `/home/user/veneer/tests/src/browser/drags/Drag.test.ts:174, 191-210`; `/home/user/veneer/tests/setupStyles.ts:390-405`; `/home/user/veneer/tests/src/styles/index.test.ts:26`. | veneer-drags reading "proofs do not pin" and verdict (missing item 10); sass-surface verdict (missing item 6) |
| A precondition is open: the catalog gates Drag 2 on Drag 1 being committed with its app browser project green. The final gate recorded 2 failures (the Contents contrast case timed out at 15,123.8 ms, and the outline case reported an ambiguous "Bootstrap" target), both unresolved. `/home/user/veneer` is not a git repository in this environment, so whether it matches commit `77cabe6` is unread. | gap | `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/catalog-2026-10-07-systems.md:126, 128`; `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/drag-1/report.md:44-50`. | veneer-drags reading "open items" and "catalog Deferred"; verdict (missing item 11) |
| Measurements supplied: injected Escape during a native drag produced zero document `keydown` events and zero `end` events under Chromium 141 and 153 (drag-1 `report.md:24, 97`), and the Contents case timed out at 15,123.8 ms (`report.md:44-50`). Measurements missing: the cost of `getComputedStyle` per `dragover`, whether a `dragstart`-time `data-vn-dragging` dim lands in the native drag image, physical Escape, a native touch drag on Android, and every web quote in the platform reading, which has no capture attached. No optimization or claim may rest on a missing reading. | gap | `/home/user/veneer/src/browser/drags/Drag.ts:118-121, 166-168, 172`; `/home/user/veneer/guides/veneer.md:1206, 1215`. | veneer-drags reading gaps; platform verdict (correction 3 and missing item 10) |

## Units

The following six units run in order. D2.n numbers the Drag 2 round; the dispatch ids `drag-2` to `drag-7` map to D2.1 to D2.6 in the same order.

### D2.1: Repair the single-list session

Engine: astra. Dispatch id: `drag-2`.

The unit owns the following files.

- `/home/user/veneer/src/browser/drags/Drag.ts`
- `/home/user/veneer/src/browser/drags/plugins.ts`
- `/home/user/veneer/src/browser/drags/constants.ts`

The contract has the following lines.

- Role: repair writer. No public type changes. The unit depends on the precondition finding: the app browser project is green at the base commit, or its 2 failures are recorded as unrelated with their run.
- Place the owned `output` element immediately after the host (`element.after(output)`), not inside it. The `#children()` method returns every element child of the host. The `item === this.#output` guard in `receive` goes. `destroy()` still removes the output. Before writing text, the controller re-places the output after the host when it no longer sits there, derived from `output.previousElementSibling !== element` with no stored flag.
- Relocate with the reference `remaining[to]`, where `remaining` is the items without the moved one. When `to` equals `remaining.length`, pass `null`, which appends. Never use the output as a reference.
- Wrap every relocation so `#finish` runs on every exit path. When `moveBefore` throws a `DOMException`, fall back a single time to `insertBefore` with focus restored using `preventScroll`. On any other throw, finish with `moved: false` and rethrow.
- Consult `#pressed` only when `item.contains(this.#pressed)`. Otherwise use the `dragstart` target.
- Fix the row-axis reversal: `reversed` for a flex row is `(direction === 'rtl') !== (writingMode === 'sideways-lr')`, still XOR the flex `*-reverse` flag. The column branch is unchanged.
- Update consumers in the same change, with no shims. In `guides/veneer.md` § Sortable list, a `ul` or `ol` host with `li` items becomes valid, the output sits after the host, the Escape sentence at `:1171` agrees with the departure row at `:1215`, and the keyboard sentence states that an out-of-range press emits nothing. In `app/browser/sections/sortable-list.html`, the host can become a `ul` element.
- Tension: the `insertBefore` fallback cannot run in Chromium 141 or 153 because both ship `moveBefore`. The Orchestrator rules whether an own-property `moveBefore = undefined` on the fixture host counts as an inert platform stub or as a forbidden fake. With no such stub, the branch stays unproven and the guide must say so.

The proofs are the following.

- `tests/src/browser/drags/Drag.test.ts` under Chromium 141 and 153: an item appended after mount, then Alt+ArrowDown into the last slot, puts the item last, and the live text and the event `to` value agree. A pointer `after` drop on that item lands after it. A `move` listener that detaches and reattaches the host's children makes relocation throw, the session ends with `end.moved === false`, and a later Alt+Arrow press moves. The output is the host's `nextElementSibling` and is absent from `host.children`. The real last item matches `:last-child`. Hosts with `row-reverse`, `column-reverse`, `rtl`, `vertical-rl`, and `sideways-lr` map Alt+Arrow keys and drop sides correctly. A stale press on item A followed by a drag on item B uses B's target. Destroy during a keyboard move leaves no `data-vn-*` attribute and no output.
- Mutation controls: restoring `?? this.#output` reddens the appended-item case; removing the `try`/`finally` block reddens the throw case; reverting the `sideways-lr` term reddens that axis case.
- Project gate: `npm run test:src:browser`, then `npm run test:app:browser` for the journey's `Sort status` reads.

Styles-layer component: none. The unit derives from no Bootstrap map or mixin. After the output leaves the host, the `.list-group-item:last-child` radii in `src/bootstrap/components/_list-group.scss` apply again with no veneer rule.

### D2.2: Hit-test slots on the host and write the physical edge

Engine: astra. Dispatch id: `drag-3`.

The unit owns the following files.

- `/home/user/veneer/src/browser/drags/Drag.ts`
- `/home/user/veneer/src/browser/drags/plugins.ts`
- `/home/user/veneer/src/browser/drags/helpers.ts`
- `/home/user/veneer/src/browser/drags/types.ts`
- `/home/user/veneer/src/browser/drags/index.ts`

The contract has the following lines.

- Role: feature writer. Depends on D2.1.
- Types first: declare in `types.ts` the pure slot contract that `helpers.ts` exports, with readonly inputs: the item boxes in order, the point, the axis `{ horizontal, reversed }`, and the source index. The result is the insertion index among the items without the source, plus the physical edge `'top' | 'right' | 'bottom' | 'left'`, or `undefined` when the slot is the source's own position.
- `helpers.ts` exports one pure `{verb}{Noun}` function for that contract (proposed `findSlot`). It resolves the slot by comparing the point against item midpoints along the axis, so padding, `gap` space, and the end of the list all resolve. It reads no DOM. `index.ts` exports it through the module barrel.
- `plugins.ts` routes `dragenter`, `dragover`, `dragleave`, and `drop` on the host itself as well as on `[data-vn-drag] > *`. The host resolves to itself. `pointerdown`, `dragstart`, `dragend`, and `keydown` stay item-only.
- `Drag.ts` accepts `dragover` and `drop` anywhere inside the host while its own item is in flight. It computes the slot through the helper and relocates to the slot index. It writes `data-vn-insert` with the physical edge on the item adjacent to the slot: the leading edge of the item after the slot, or the trailing edge of the last item for an end slot. It rewrites the attribute only when the item or the edge changes, and writes no indicator for the source's own slot.
- The host carries `data-vn-over` while an admitted drag is over it. The attribute is removed on a `dragleave` whose `relatedTarget` is outside the host, and in `#finish`.
- An item whose `aria-disabled` is `true` refuses grabs by pointer and keyboard and stays a slot neighbor. The module reads ARIA only, never a Bootstrap class.
- Read the axis per event as in Drag 1. Add no cache, because no measurement of the cost exists.
- Guide: the § Sortable list data-attribute table documents `data-vn-insert` values as physical edges and adds `data-vn-over`.
- Tension for the subjective lane: physical edge values against the logical `before` and `after` values they replace, and the names `findSlot` and `data-vn-over`.

The proofs are the following.

- `tests/src/browser/drags/helpers.test.ts` (Node or Chromium, pure): the end slot, the start slot, gap space, the source's own slot returning `undefined`, and reversed and horizontal axes, each with expected index and edge.
- `tests/src/browser/drags/Drag.test.ts` and `plugins.test.ts` under Chromium 141 and 153 with real Chrome DevTools Protocol (CDP) drags: a drop on host padding after the last item puts the item last; a drop in a `gap` between items lands between them; a drop next to a Bootstrap `.list-group-item.disabled` element (`pointer-events: none`) lands beside it; an `aria-disabled` item refuses both grab paths; edge values on `row-reverse`, `rtl`, and `vertical-rl` hosts name the physical side the pointer is on; a `MutationObserver` recorder shows `data-vn-insert` rewritten only on change; `data-vn-over` appears on enter and clears on leaving the host and on drop.
- Mutation controls: routing items only reddens the padding and gap cases; dropping the change check reddens the recorder case.

Styles-layer component: none; the unit feeds D2.3. The physical edge lets the composables partial draw the line with one `@each` over the four edges, so no rule is generated per entry of Bootstrap's `$breakpoints` map for the `list-group-horizontal-{sm..xxl}` classes, and no Bootstrap mixin is called.

### D2.3: Paint the sortable in the styles layer

Engine: opus. Dispatch id: `drag-4`.

The unit owns the following files.

- `/home/user/veneer/src/styles/_mixins.scss`
- `/home/user/veneer/src/styles/surfaces/_drag.scss`
- `/home/user/veneer/src/styles/surfaces/_index.scss`
- `/home/user/veneer/src/styles/composables/_drag.scss`
- `/home/user/veneer/src/styles/composables/_index.scss`

The contract has the following lines.

- Role: styles writer. Depends on D2.2, and on the user's answer to question 2 (the styles chunk and the showcase sheet). The unit loads nothing from `src/bootstrap`: every Bootstrap value arrives as a `var(--bs-*)` reference, so the unit needs no map and no gate change.
- `_mixins.scss` gains `transition($value...)`, which emits `transition` and, inside `@media (prefers-reduced-motion: reduce)`, `transition: none`. It also gains `reduced-motion`, which wraps `@content` in that media query. Both emit no top-level CSS.
- `surfaces/_drag.scss` writes `@layer surfaces` a single time. On a handle inside a host item (`[data-vn-drag] > [draggable='true']` and `[data-vn-drag] > * [draggable='true']`), it sets `cursor: grab`, `touch-action: none`, and `user-select: none`. Inside an `[aria-disabled='true']` item, the cursor reverts to `default`.
- `composables/_drag.scss` writes `@layer composables` a single time. It declares the component-scoped properties `--vn-drag-size: calc(var(--bs-border-width) * 2)` and `--vn-drag-opacity` on `[data-vn-drag]`. The source `[data-vn-drag] > [data-vn-dragging]` takes `opacity: var(--vn-drag-opacity)` through the `transition` mixin.
- Indicator: `[data-vn-drag] > [data-vn-insert]` takes `position: relative`. Its `::after` pseudo-element (never `::before`, which `.list-group-numbered` owns) is absolutely positioned with `pointer-events: none`, stacks over `.list-group-item.active` (`z-index: 2`), and draws the line as a border of width `--vn-drag-size` on the named edge. One `@each` over the four physical edges generates the edge rules from one partial-local map of edge to cross-axis insets. The insets are physical.
- Indicator color resolves on the item: `var(--vn-drag-color, var(--bs-list-group-active-bg, var(--bs-primary)))`. Bootstrap's contextual `list-group-item-{color}` variants then retint the line through the tokens they already set, with no per-color rule. On `.active`, the line uses `--bs-list-group-active-color`.
- Over state: `[data-vn-drag][data-vn-over]` takes a `color-mix(in oklab, …, transparent)` tint of the same color. An empty host (`:not(:has(> *))`) adds a dashed outline of `--vn-drag-size`.
- Under `@media (forced-colors: active)`, the line and the outline use `Highlight`. Nothing uses `box-shadow`. The partial writes no literal color.
- Showcase, in the same change if the user answers yes to question 2: `app/browser` loads the built `./styles` sheet beside `./bootstrap`, deletes the `MutationObserver` adapter (`Showcase.ts:135-152`), and the journey reads geometry, not classes. Guide § Sortable list replaces "no stylesheet" with the partials' contract.
- Tension: whether the sortable needs a theme-color modifier (`.drag-{color}` generated from the theme-color map). This design omits it, because no consumer exists and the contextual tokens already vary the line. If the subjective lane adds it, it waits on question 1.

The proofs are the following.

- `tests/src/styles/surfaces/drag.test.ts` and `tests/src/styles/composables/drag.test.ts` under Chromium 141 and 153, with the built `./bootstrap` and `./styles` sheets adopted. The variation matrix is generated from `CLASS_NAMES.bootstrap`: plain, flush, and numbered list groups, `list-group-horizontal`, each `list-group-horizontal-{bp}` class at widths on both sides of its `$breakpoints` boundary, each contextual `list-group-item-{color}` class, `.active`, and `.disabled`, in light and dark `data-bs-theme`.
- Per matrix cell, with `data-vn-insert` set to each edge directly (the attribute is the contract): the `::after` border width on the named edge equals `--vn-drag-size` and is 0 on the others; its color equals the item's resolved active background, or the active color on `.active`; the item's `getBoundingClientRect` result is unchanged with the attribute on; the numbered `::before` content is unchanged; and the last item keeps Bootstrap's bottom radii.
- Under emulated `prefers-reduced-motion: reduce`, the source's computed `transition-duration` is `0s`. Under emulated `forced-colors: active`, the line keeps a non-zero border width. On the handle, the computed `cursor` is `grab` and `touch-action` is `none`. Every block of each partial sits in its folder's layer, read through `readPlacement`. An author `opacity-25` class on an item still wins, which pins the documented direction.
- Controls: moving the composables rule into `@layer bootstrap` reddens placement; drawing the line with `box-shadow` reddens the forced-colors case; drawing it with `border-top` on the item reddens the geometry case; `::before` reddens the numbered case.
- Project gates: `npm run test:src:styles`, `npm run test:src:bootstrap` with the digest and link 3 unchanged (the seal), and `npm run test:app:browser`.

Styles-layer component: two partials, because the folder law splits one component by job. `surfaces/_drag.scss` holds the attribute API the markup carries before any script runs: grab cursor, `touch-action`, and `user-select` on the handle. `composables/_drag.scss` holds the chrome the engine's state attributes drive: dim, edge line, and over tint. Each writes its folder's layer, which follows `bootstrap` and beats its normal declarations without `!important`. The partials derive from Bootstrap through its tokens, not its Sass: `--bs-list-group-active-bg` and `--bs-list-group-active-color` (which `components/_list-group.scss` sets per contextual variant), `--bs-primary`, and `--bs-border-width` (from `_tokens.scss`). They call no Bootstrap mixin, because `layer`, `utility`, and `unlayer` write the `bootstrap` layer or unlayered `!important` declarations; they use the veneer `transition` and `reduced-motion` mixins. The proof matrix derives its widths from the `$breakpoints` map and its classes from `CLASS_NAMES.bootstrap`, and the partial loops a single time over the four edges.

### D2.4: Move by command buttons (single pointer, no dragging)

Engine: astra. Dispatch id: `drag-5`.

The unit owns the following files.

- `/home/user/veneer/src/browser/drags/types.ts`
- `/home/user/veneer/src/browser/drags/plugins.ts`
- `/home/user/veneer/src/browser/drags/Drag.ts`
- `/home/user/veneer/src/browser/drags/constants.ts`

The contract has the following lines.

- Role: feature writer. Depends on D2.1 and D2.2 (the disabled refusal).
- Types first: the `move` detail `by` field gains `'command'`. The detail stays otherwise unchanged.
- `plugins.ts` adds a `click` route on `button[command][commandfor]`, following the copier precedent (`/home/user/veneer/src/browser/copiers/plugins.ts:21-32`). The host is `commandForElement` when that element is a `[data-vn-drag]` host. The item is the button's ancestor that is a direct child of that host. A button outside every item does nothing.
- Commands are `--previous`, `--next`, `--first`, and `--last`, in DOM order with no axis or reversal mapping. Each admitted command emits `start`, then the cancelable `move` with `by: 'command'`, then `end`. It writes the live text and keeps focus on the button through `moveBefore`.
- An out-of-range command emits nothing. An `aria-disabled` item refuses. A prevented `start` or `move` leaves the DOM unchanged. Escape and the existing Alt+Arrow keys are unchanged. No Alt+Home or Alt+End is added, because browsers bind those chords.
- Showcase and guide: each sortable specimen row gains a visible move-up and move-down button pair. The guide documents the commands under § Sortable list as the WCAG 2.5.7 path.
- Tension for the subjective lane: the command names, and whether the live text names the item.

The proofs are the following.

- `tests/src/browser/drags/plugins.test.ts` under Chromium 141 and 153 with real clicks: each command's order, detail, and live text; focus retained on the button; the first item ignoring `--previous` and the last ignoring `--last` with no events; prevention; a button outside an item does nothing; a `commandfor` value naming a non-host does nothing; no listener remains after destroy (CDP listener counts).
- `tests/app/browser/integration.test.ts` journey: reorder the specimen by clicking only.
- Control: deleting the route reddens every command case.

Styles-layer component: none. The buttons are Bootstrap `btn` markup painted by `src/bootstrap/components/_buttons.scss`, and the unit derives from no Bootstrap map or mixin.

### D2.5: Transfer between hosts of one group

Engine: opus. Dispatch id: `drag-6`.

The unit owns the following files.

- `/home/user/veneer/src/browser/drags/types.ts`
- `/home/user/veneer/src/browser/drags/Drag.ts`
- `/home/user/veneer/src/browser/drags/plugins.ts`
- `/home/user/veneer/src/browser/drags/helpers.ts`
- `/home/user/veneer/src/browser/drags/constants.ts`
- `/home/user/veneer/src/styles/composables/_drag.scss`

The contract has the following lines.

- Role: feature writer. Depends on D2.2 (host-level slots and `data-vn-over`), D2.3 (empty-host paint), and D2.4 (commands).
- Types first: the `move` detail gains `source: HTMLElement`, the host the item leaves, which equals the event's host for an in-list move. `from` indexes the source and `to` indexes the target.
- Hosts whose `data-vn-drag` values are equal and non-empty form a group. An empty value accepts only its own items, as in Drag 1.
- No shared session and no payload: the target controller derives the dragged item from the document's `[data-vn-dragging]` element whose parent host shares its non-empty group value. `dataTransfer` still carries no data. External drags stay refused.
- `move` is dispatched, cancelable, on the target host. `start` and `end` stay on the source host. The target writes its own live text.
- Keyboard: Alt+Arrow along the axis perpendicular to the host's list axis moves the item to the previous or next group host in document order, at the same index clamped to the target's length. Focus stays on the handle. Ends of the group emit nothing. This resolves the addendum's collision with the row-axis keys.
- Commands: two host-to-host commands for the same moves (names for the subjective lane; proposed `--backward` and `--forward`), routed like D2.4.
- Specimen and guide: a two-column Native board specimen; § Sortable list documents groups, `source`, and the perpendicular keys.
- Tension: the addendum has both hosts receive `end`; this design keeps `end` on the session owner and gives the target `move` only.
- Tension: whether the target's live text names the target list from its `aria-label`.

The proofs are the following.

- `tests/src/browser/drags/plugins.test.ts` under Chromium 141 and 153 with real CDP drags across two group hosts: order in both hosts, the detail with `source`, `start` and `end` on the source, `move` on the target, prevention leaving both hosts unchanged, a drop on an empty group host, hosts with different values or an empty value refusing, external text and files refused, no `text/plain` payload, and the perpendicular Alt+Arrow keys and both commands.
- Controls: deriving the item without the group check reddens the different-value case; dispatching `move` on the source reddens the target-listener case.

Styles-layer component: `composables/_drag.scss` gains nothing beyond the D2.3 empty-host outline unless the board specimen shows a gap. Any rule added stays in `@layer composables`, reads the same `--bs-list-group-*`, `--bs-primary`, and `--bs-border-width` tokens, and calls no Bootstrap map or mixin.

### D2.6: Drag by touch and pen through pointer events

Engine: opus. Dispatch id: `drag-7`.

The unit owns the following files.

- `/home/user/veneer/src/browser/drags/Drag.ts`
- `/home/user/veneer/src/browser/drags/plugins.ts`
- `/home/user/veneer/src/browser/drags/helpers.ts`
- `/home/user/veneer/src/browser/drags/constants.ts`
- `/home/user/veneer/src/browser/drags/types.ts`

The contract has the following lines.

- Role: feature writer. Depends on D2.2 (the pure slot helper) and D2.3 (`touch-action: none` on the handle). Mouse keeps native drag and drop.
- For a `pointerdown` event whose `pointerType` is `touch` or `pen` on an admitted handle (same refusals as `dragstart`, including `aria-disabled`), the controller arms a session. It captures the pointer on the host, not on the item, so a move cannot drop the capture.
- The session starts when movement exceeds a slop named in `constants.ts`. The slop must keep a tap on a grip button a click. At start, the controller emits `start` (cancelable) and writes `data-vn-dragging`.
- Each `pointermove` event hit-tests through the slot helper and writes `data-vn-insert` and `data-vn-over` as the native path does. `pointerup` relocates with `by: 'pointer'`. `pointercancel`, `lostpointercapture` before `pointerup`, Escape, and destroy end with `moved: false` and release the capture.
- A `dragstart` event that arrives while a touch session is armed is prevented, so one gesture never runs both engines.
- Auto-scroll: while the pointer sits within an edge zone of the nearest scrollable ancestor or the viewport, each `pointermove` event scrolls that container by a step proportional to the depth into the zone. No timer or animation-frame loop runs, under the no-polling law.
- Guide: § Sortable list states that the touch path needs `touch-action: none` on the handle from `./styles` or from the author, and records Android behavior as unestablished unless the user rules a device proof.
- Tension: scrolling advances only while the finger moves, which an animation-frame loop would avoid but the no-polling law forbids.
- Tension: the source stays in place with no floating preview.

The proofs are the following.

- `tests/src/browser/drags/Drag.test.ts` under Chromium 141 and 153 with a touch-enabled context and CDP `Input.dispatchTouchEvent`: reorder by touch with `start`, `move`, and `end`; a tap under the slop still clicks the grip and moves nothing; `touchCancel` ends with `moved: false`; destroy mid-gesture releases the capture and removes the attributes; `window.scrollY` stays unchanged during a drag on the handle; an edge-zone drag scrolls a scrollable host; mouse still takes the native path.
- Controls: capturing on the item and then moving it reddens the capture case; omitting the `dragstart` suppression reddens the one-engine case.

Styles-layer component: none added. The unit uses the D2.3 surfaces rule (`touch-action: none` and `user-select: none` on the handle), which reads no Bootstrap map and calls no Bootstrap mixin.

## Sass doctrine for the styles layer

The following rules govern every styles-layer unit, each with its mechanism and its home.

- **Keep the Bootstrap face sealed.** A veneer style unit changes no byte of the bootstrap sheet and edits no partial under `src/bootstrap`. Mechanism: the conformance digest (`tests/fixtures/bootstrap/pass.json`, `BOOTSTRAP_DIGEST` in `tests/setupServer.ts:90-91`), link 1, and link 3 run unchanged in every styles unit's gate and read as the seal; a styles unit that turns any of them red has broken the seal. Home: `ROADMAP.md` § Style centralization.
- **Reach Bootstrap through `var(--bs-*)` references by default.** When a variant set needs a Bootstrap key list, reach it only through `@use` of a CSS-free Bootstrap module, never by loading `tokens`, `utilities`, `reset`, `index`, or a components partial (each emits CSS), and never through a package-specifier load. Mechanism: the styles-face load gate (`tests/conformance.test.ts:672-680`) moves from refusing every crossing to an allowlist in which `src/styles` can load only the CSS-free Bootstrap data module and `src/bootstrap` still loads nothing from `src/styles`; the `src:styles` placement proof catches any `bootstrap`-layer block or unlayered declaration that a wrong load leaks. Until the user answers question 1, the allowlist is empty and the gate is unchanged. Home: the scaffold rule file `.claude/rules/styles.md` (the cross-face load clause beside the extension-face exception), with `ROADMAP.md` § Style centralization pointing at it.
- **Never call veneer's Bootstrap emitters from `src/styles`.** The `layer`, `utility`, and `unlayer` mixins write the `bootstrap` layer or `!important` outside every layer under the `--bs-` prefix. Mechanism: the `src:styles` placement proof (`tests/src/styles/index.test.ts:8-32`) refuses a `bootstrap` block and any declaration whose layer is undefined. Home: `guides/veneer.md`, Styles section.
- **Generate a variant set with one `@each` over the Bootstrap key list it varies over; never list variant keys by hand.** Where a Bootstrap component already varies a token per variant (the `--bs-list-group-*` tokens each `list-group-item-{color}` class sets), read that token in one rule and generate nothing. Where geometry the engine measures decides the variant (a list axis, `list-group-horizontal-{bp}`), the engine writes the resolved state and the partial generates no per-breakpoint rule. Mechanism: each partial's proof builds its variation matrix from `CLASS_NAMES.bootstrap` (contextual, active, disabled, flush, numbered, horizontal, and each responsive horizontal class at both sides of its boundary, in light and dark) and asserts computed results per cell, so a missed variant reddens. Home: `guides/veneer.md`, Styles section; the matrix pattern in `ROADMAP.md` § Proofs, `src:styles` row.
- **Place each rule in the folder whose job it does, and split one component across folders by job, with one same-named partial per folder.** An attribute API present in markup before script runs goes in `surfaces/`. Chrome that an engine-written state attribute or class drives goes in `composables/`. A static class skin goes in `components/`, and a class that only sets a token goes in `modifiers/`. Each partial writes its folder's layer a single time and no other. Mechanism: a `src:styles` case reads every block and placement of the built sheet, and a per-partial case compiles each partial through a fixture and asserts that all its blocks sit in its folder's layer, with a planted foreign layer as the control. Home: `ROADMAP.md` § Style centralization (the folder list at `:100-105`).
- **Key native-module chrome on the module's `data-vn-*` state attribute, scoped under the module's host attribute.** The scaffold rule's "stable class names" contract applies to classes a composable writes, not to a native module's attributes. Mechanism: the partial's proof sets the attribute directly and reads computed style, so the attribute is the pinned contract; the module's proofs pin the module writing it. Home: the scaffold rule file `.claude/rules/styles.md:108`, which gains the attribute clause.
- **Beat Bootstrap's normal declarations by layer order alone, never by `!important` or added specificity.** Never set, on the same element, a property a Bootstrap `!important` utility owns (`opacity-*` excepted only where the yield is documented). Draw state chrome that must not move layout on `::after` with borders, never on the element's own border and never with `box-shadow`. Mechanism: Chromium geometry cases assert an unchanged `getBoundingClientRect` result with the state on, an author-utility case pins the documented yield, and a forced-colors emulation case refuses `box-shadow` chrome. Home: `guides/veneer.md`, Styles section, beside the override table at `:1499-1502`.
- **Take colors from `var(--bs-*)` or `color-mix()` over them, and sizes from Bootstrap tokens (`--bs-border-width`).** Component-scoped `--vn-<component>-*` properties sit on the component's host selector, not in `_tokens.scss`, until the styles chunk declares its first global token. Mechanism: the themes proof (`tests/src/styles/themes/index.test.ts:36-38`) stays green because `_tokens.scss` keeps only the order statement, and the `TOKEN_NAMES.veneer` two-way pin (the `it.todo` case at `tests/src/styles/index.test.ts:38-40`) admits each component token when the chunk opens. Home: `ROADMAP.md` § Published faces and the styles chunk line of § Sequence.
- **Route every `transition` declaration through the `transition` mixin, and every animation through `reduced-motion`, both in `src/styles/_mixins.scss`.** Mechanism: a Chromium case under emulated `prefers-reduced-motion: reduce` reads a computed `transition-duration` of `0s` on each transitioned state. Home: `ROADMAP.md` § Style centralization, the `_mixins.scss` kind-file entry; the rule itself stays in `.claude/rules/styles.md:70-71`.
- **Read every at-rule in the `src:styles` placement proof, not only style-rule declarations.** A `@keyframes`, `@property`, or `@font-face` rule sits inside an owned layer, and no owned layer nests a foreign layer. Mechanism: `tests/setupStyles.ts` gains the at-rule placement reader with its proof in `tests/setupStyles.test.ts`, and `src:styles` adds planted top-level keyframes and nested-layer controls, mirroring the `src:bootstrap` keyframes control (`ROADMAP.md:78`). Home: `ROADMAP.md` § Proofs, `src:styles` row.

## Rejected

The following table lists each lesson from the elements repository, the platform, and the Drag 1 records that this verdict rejects, with the reason.

| Lesson | Why rejected |
| --- | --- |
| Elements' input model of HTML drag and drop only, with no pointer path (`createDrag.ts:27-31, 435-449`). | Touch on Android is unestablished for native drag and drop, and HTML fires `pointercancel` at the source after `dragstart`. Veneer keeps native drag and drop for mouse and adds a separate touch and pen path (D2.6). Source: elements-drag input model; platform "pointer stream ends at dragstart". |
| Replacing native drag and drop with pointer events for every pointer type. | That path discards the native autoscroll, the system drag image, and the Drag 1 proofs under Chromium 141 and 153. It would also need an animation-frame autoscroll loop, which conflicts with the no-polling law. Source: veneer-drags verdict correction 7; platform matrix. |
| `aria-grabbed` and `aria-dropeffect`. | ARIA 1.1 marks both deprecated and advises authors against them; the platform verdict asks for a re-citation against ARIA 1.2. Veneer keeps live-region confirmation, as the APG rearrangeable example does. Source: platform "ARIA 1.1" facts and verdict correction 7. |
| The APG listbox role with `aria-activedescendant` for the sortable. | Listbox options cannot contain interactive content, and the veneer grip is a button. The host stays a list (`role=list`, or a `ul` element after D2.1). Source: platform "APG: listbox pattern constraints"; `/home/user/veneer/app/browser/sections/sortable-list.html`. |
| Elements' `setData('text/plain', index)` payload and a plugin-held session record for cross-list drops. | A text payload leaks to external drop targets, and the Drag 1 proof pins that no payload is written. The target derives the item from the source's `[data-vn-dragging]` attribute under the derive-state law, so the plugin stays stateless. Source: elements-drag "cross-container"; veneer-drags `plugins.test.ts` pins; addendum `:88`. |
| Elements' non-cancelable events and hand-wired `on` hooks. | Veneer keeps a cancelable `start` and `move` and binds hooks through `bindEventMap` from one event registry (`Drag.ts:32`). Elements' hand-listed hooks left `on.select` and `on.clear` unwired. Source: elements-drag events and verdict missing item 1. |
| Elements' `syncRows` function, which rewrites `draggable` and row classes with a microtask resync. | Veneer leaves `draggable` to the author, writes state as attributes only on change, and runs no resync. A resync would be a superfluous wrapper over markup the author owns. Source: elements-drag "state sync" and verdict correction 2. |
| Elements' selection model, multi-row drag, and `into` nesting. | No first consumer exists, and the addendum holds them back. The minimal-public-API law gates creation on a consumer. Source: elements-drag "state machine"; addendum `:114-115, 139`. |
| Elements' `_drag.scss` partial as written. | Its global `[draggable='true']` cursor leaks outside sortable hosts. It dims `.dragging` only on `[draggable='true']`, so handle mode never dims. Its line is vertical-only (`inset-inline`), and it uses literal sizes with no forced-colors or reduced-motion rule. Veneer scopes under `[data-vn-drag]`, draws the physical edge, and reads tokens. Source: elements-drag styles facts and verdict missing item 3. |
| Elements' `createPointer` factory as the basis of the touch path. | It registers no `lostpointercapture` listener, sets no `touch-action`, and reports `pointercancel` through the same end as `pointerup`. D2.6 captures on the host and separates commit from cancel. Source: platform verdict missing item 9. |
| FLIP or View Transitions reorder animation, and live DOM reordering during the drag. | A view-transition callback runs the move asynchronously, which breaks the synchronous cancelable `move`, the announcement, and focus. Live reordering would emit a `move` per hover. No source settles motion under reduced motion. Source: platform gap "FLIP transitions or View Transitions". |
| Upstream `pkg:bootstrap/scss` maps and mixins in the styles face. | `ROADMAP.md:111` states that published face sheets do not import official framework packages. Bootstrap 5.3.8's Sass also depends on the global scope of `@import`. Source: own read of `ROADMAP.md:111` and `package.json:139`. |
| The `pkg:@orkestrel/veneer/bootstrap/scss` package-specifier load. | It evades the load gate through a scanner loophole, the barrel forwards only `$layered`, and loading the Bootstrap barrel emits the whole bootstrap sheet. Source: sass-surface "Boundary scanner scope" and "Published Bootstrap Sass entry". |
| Reusing Bootstrap's `utility` emitter for veneer variants. | It lifts property declarations as `!important` outside every layer under `--bs-`, which the `src:styles` placement proof refuses. Source: sass-surface verdict corrections 1-2. |
| The Drag 1 brief's `@layer reset` fence and the showcase's `MutationObserver` utility adapter. | The `reset` layer precedes `bootstrap`, so reboot's cursor beats it (`attempt2-stop.md:64`). The adapter paints a four-sided frame through `!important` utilities. D2.3 replaces both with layered partials. Source: veneer-drags recorded deviations and verdict missing items 3-4. |

## Questions for the user

The following three questions need your ruling, each with one recommendation.

1. Sass maps for variants: veneer's Bootstrap Sass has no `$theme-colors`, `$grid-breakpoints`, or `$spacers` map. Its only maps sit in `_utilities.scss`, which emits the whole utilities sheet on any load. Can `src/bootstrap` gain one CSS-free data partial holding Bootstrap 5.3.8's maps under their upstream names, with `var(--bs-*)` values pinned to the upstream keys, with no change to the bootstrap sheet's digest, and with the styles load gate admitting that one module? I recommend yes. The sortable (D2.3) does not need it, because it reads Bootstrap's tokens.
2. Styles chunk and showcase sheet: D2.3 is the first rule in `src/styles`. Does it open the styles chunk (`ROADMAP.md:140`, where you rule D-1 to D-11 and I-1 to I-4)? And can the showcase load the `./styles` sheet beside `./bootstrap`, reversing the "no extra stylesheet" line at `ROADMAP.md:138` and the Drag 1 fence refusal? I recommend yes to both, with the drag tokens kept component-scoped.
3. Touch acceptance: the proof browsers are desktop Chromium 141 and 153, so D2.6 can prove touch only through emulated touch input. Do you accept emulated touch as the touch path's proof, with real Android behavior recorded as unestablished, or do you want a device proof before D2.6 lands? I recommend accepting emulated touch, with the Android row kept in the guide's departures.

## Rulings of 2026-10-08

The user agreed to every question in the preceding section on its recommendation (`stage-b/user-rulings-2026-10-06.md` § Fourteenth round): the CSS-free maps partial with the one-module allowlist; the styles chunk opened by D2.3 with the showcase loading `./styles` beside `./bootstrap`; emulated touch as D2.6's proof with the Android row kept in the departures.

## Sources

The readings behind this verdict read the following files and URLs. The URLs were fetched on 2026-10-08 by the platform reading; no capture is attached, so each quote stays unverified.

- Laws, rules, and rulings: `/home/user/veneer/AGENTS.md`; `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/browser.md`, `styles.md`, and `writing.md` (the veneer rule files resolve to these); `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/stage-b/user-rulings-2026-10-06.md` (§ Fourth, Eighth, Eleventh, Twelfth, and Thirteenth rounds).
- Veneer drag module: `/home/user/veneer/src/browser/drags/Drag.ts`, `plugins.ts`, `constants.ts`, `types.ts`, `factories.ts`, and `index.ts`; `/home/user/veneer/src/browser/Veneer.ts`; `/home/user/veneer/src/browser/copiers/plugins.ts`.
- Veneer drag proofs: `/home/user/veneer/tests/src/browser/drags/Drag.test.ts`, `plugins.test.ts`, `factories.test.ts`, and `index.test.ts`; `/home/user/veneer/tests/app/browser/integration.test.ts`.
- Veneer showcase: `/home/user/veneer/app/browser/Showcase.ts`; `/home/user/veneer/app/browser/constants.ts`; `/home/user/veneer/app/browser/sections/sortable-list.html`.
- Veneer Bootstrap Sass: `/home/user/veneer/src/bootstrap/index.scss`, `_tokens.scss`, `_mixins.scss`, `_utilities.scss`, `elements/_index.scss`, `components/_index.scss`, `components/_list-group.scss`, `components/_buttons.scss`, and `components/_color-bg.scss`.
- Veneer styles Sass: `/home/user/veneer/src/styles/index.scss`, `index.ts`, `sheet.ts`, `_tokens.scss`, `_reset.scss`, `_mixins.scss`, `composables/_index.scss`, `themes/index.scss`, and `themes/_default.scss`; `/home/user/veneer/dist/src/styles/index.css`; `/home/user/veneer/dist/src/styles/themes/index.css`; `/home/user/veneer/configs/src/vite.styles.config.ts`; `/home/user/veneer/package.json`.
- Veneer style gates: `/home/user/veneer/tests/conformance.test.ts`; `/home/user/veneer/tests/setup.ts`; `/home/user/veneer/tests/setup.test.ts`; `/home/user/veneer/tests/setupStyles.ts`; `/home/user/veneer/tests/setupServer.ts`; `/home/user/veneer/tests/integration.test.ts`; `/home/user/veneer/tests/src/styles/index.test.ts`; `/home/user/veneer/tests/src/styles/themes/index.test.ts`; `/home/user/veneer/tests/src/bootstrap/index.test.ts`; `/home/user/veneer/tests/fixtures/bootstrap/pass.json` and `configured.scss`; `/home/user/veneer/tests/fixtures/styles/bootstrap.scss` and `compiled.scss`; `/home/user/veneer/tests/fixtures/integration/styles.scss`.
- Veneer guide and roadmap: `/home/user/veneer/guides/veneer.md` (§ Sortable list at `:1133-1215` and the Styles section at `:1228-1592`); `/home/user/veneer/ROADMAP.md`.
- Campaign records: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/drag-1/brief.md`, `report.md`, and `lane-report.md`; `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/catalog-2026-10-07-systems.md`; `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/catalog-2026-10-07-systems/journal.json`; `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/catalog-2026-10-07/elements-addendum.md`.
- Elements repository (guidance only): `/home/user/mikesaintsg/elements/src/browser/factories/createDrag.ts`, `createDrop.ts`, and `createPointer.ts`; `/home/user/mikesaintsg/elements/src/browser/composables/useDrag.ts`; `/home/user/mikesaintsg/elements/src/browser/types.ts`, `constants.ts`, `events.ts`, `helpers.ts`, and `patterns.ts`; `/home/user/mikesaintsg/elements/src/styles/composables/_drag.scss`; `/home/user/mikesaintsg/elements/AGENTS.md`; the `UseDragDropPage.vue` and `DragPlaygroundPage.vue` showcase pages; `/home/user/mikesaintsg/elements/tests/src/browser/factories/createDrag.test.ts`; `/home/user/mikesaintsg/elements/tests/setupBrowser.ts`; `/home/user/mikesaintsg/elements/tests/app/browser/pages/_composable-api.ts`; the elements guides `components.md` and `composables.md`.
- Elements W3C corpus: `/home/user/mikesaintsg/elements/guides/w3c/aria.md`, `interactions.md`, `elements/texts.md`, and `elements/sections.md`.
- Web sources, fetched 2026-10-08: see [HTML drag and drop](https://html.spec.whatwg.org/multipage/dnd.html); see [Pointer Events Level 3](https://www.w3.org/TR/pointerevents3/) and [its Recommendation of 2026-06-30](https://www.w3.org/TR/2026/REC-pointerevents3-20260630/); see [DOM `moveBefore()`](https://dom.spec.whatwg.org/#dom-parentnode-movebefore) and [the DOM move algorithm](https://dom.spec.whatwg.org/#move); see [MDN `Element.moveBefore()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/moveBefore); see [the Chrome blog on `moveBefore`](https://developer.chrome.com/blog/movebefore-api); see [MDN browser compatibility data for `Element`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/api/Element.json), [for `touch-action`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/touch-action.json), and [for `DragEvent`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/api/DragEvent.json); see [Chrome Platform Status on pointer suppression at drag start](https://chromestatus.com/api/v0/features/6732314958757888) and [on `moveBefore`](https://chromestatus.com/api/v0/features?q=moveBefore); see [the Chromium M141 schedule](https://chromiumdash.appspot.com/fetch_milestone_schedule?mstone=141) and [the M153 schedule](https://chromiumdash.appspot.com/fetch_milestone_schedule?mstone=153); see [WAI-ARIA 1.1](https://www.w3.org/TR/wai-aria-1.1/) and [the WAI-ARIA editor's draft](https://w3c.github.io/aria/); see [the APG rearrangeable listbox example](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-rearrangeable/) and [the APG listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/); see [Understanding WCAG 2.2 SC 2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html); see [Media Queries Level 5, `prefers-reduced-motion`](https://drafts.csswg.org/mediaqueries-5/#prefers-reduced-motion).
