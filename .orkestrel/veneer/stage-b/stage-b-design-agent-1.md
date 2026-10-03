# Browser stage B design: subjective lane (API shape, names, ergonomics, guide voice)

My proposal: `createVeneer` routes no plugins unless you pass them, and every convenience is something you add yourself. Tip boot becomes an option on the two tip plugin factories, `createModalPlugin({ dialog: true })` opts in to the `<dialog>` path, and a stable scrollbar gutter declared in your own stylesheet opts in to the gutter path. The `toggle.vn.button` event goes. Two of the four native pieces don't ship: `interpolate-size` collapse and `popover="manual"`. All code cites are at veneer `dc4654b`.

## D1: the blank-slate boot scope

### Shape

1. **The default.** A call with no plugins routes nothing, binds no listener, boots nothing, and reserves its root.
   - This makes `createVeneer` agree with the class constructor, which already defaults to `[]` (`src/browser/Engine.ts:36`). Today `factories.ts:174` defaults to `createBootstrapPlugins()`, so the two disagree.
   - `createBootstrapPlugins()` stays the Bootstrap convenience: the same twelve plugins in bundle order, with no tip boot.
2. **Tip boot.** It becomes an option on the tooltip and popover plugin factories. `.claude/rules/architecture.md:214` admits `create{Entity}Plugin(options?)`. The option only shapes the value; the factory still registers nothing (`:215`).
3. **Composing it.** You add the boot variants after the collection, and the replace-by-name rule puts each one back in bundle order:

```ts
const veneer = createVeneer(document, {
	plugins: [...createBootstrapPlugins(), createTooltipPlugin({ boot: true }), createPopoverPlugin({ boot: true })],
})
```

The declarations as they would land in `src/browser/types.ts`:

```ts
/**
 * Configures a tooltip or popover plugin at creation.
 *
 * @example
 * ```ts
 * const options: TipPluginOptions = { boot: true }
 * ```
 */
export interface TipPluginOptions {
	/**
	 * If `true`, the scope that lists the plugin creates a tip on every host its profile's toggle selector matches when the scope boots, as Bootstrap's documented page script does; if `false`, a tip host stays inert until a factory call.
	 *
	 * Default: `false`.
	 */
	readonly boot?: boolean
}

/** Configures a boot scope at creation. */
export interface VeneerOptions {
	/**
	 * Lists exactly the plugins this scope routes, in dispatch order; a later entry with an earlier entry's name replaces it in place.
	 *
	 * Default: none, so the scope adds no listener, boots nothing, and reserves its root.
	 */
	readonly plugins?: readonly PluginInterface[]
}
```

The plugin factory signatures become:
- `createTooltipPlugin(options?: TipPluginOptions)`
- `createPopoverPlugin(options?: TipPluginOptions)`

Each adds `boot: { selector }` only when `options.boot` is `true` (today it is unconditional at `plugins.ts:284` and `plugins.ts:364`).

### Alternatives considered

- **No default, you pass the collection: adopted.** It passes the strict test, because a bare call does nothing you didn't ask for.
- **A default of the twelve plugins without tip boot: refused.** A bare call would still bind eleven families' document listeners and run the carousel, scrollspy, offcanvas, and tab load-time setup. That is the opinionated start the user ruled out.
- **Making `plugins` required: refused.** An empty list is a real use: it reserves a subtree (`guides/veneer.md:588`). Leaving it optional keeps the factory and the constructor in agreement. The Orchestrator rules (Tension T6).
- **A preset `createBootstrapVeneer()`: refused** as a superfluous wrapper.

Where tip start-at-boot goes:

| Option | Ruling | Reason |
| --- | --- | --- |
| An option on `createTooltipPlugin` and `createPopoverPlugin` | Adopted | One factory per family, and boot-created tips stay owned by the scope. `tests/app/browser/main.test.ts:98` needs that: it expects the hovered tooltip destroyed on page departure. |
| Separate factories, such as `createTooltipBootPlugin` | Refused | The value would duplicate the tooltip plugin with one entry added. "TooltipBoot" is not an entity. A different plugin name would split the registry key from the event namespace (convention ruling 1). |
| A separate collection, `createTipPlugins()` | Refused | No consumer beyond a two-entry composition the guide shows. Minimal public API applies. |
| A function over a live scope, such as `boot(scope)` | Refused | It widens `VeneerInterface` with an ownership surface and duplicates the boot pass the plugin seam already has. |
| A scope-level `tips` option | Refused | Convention ruling 10: "The engine carries no tip branch." |

### Audit of other behaviors Bootstrap's contract does not define

| Site | Ruling | Reason |
| --- | --- | --- |
| Boot entries for carousel `[data-bs-ride="carousel"]`, scrollspy, `.offcanvas.show`, and active tab toggles (`plugins.ts:100,269,300,323`) | Keep | These are Bootstrap's own load-time data API. They run only when you list that plugin. |
| `toggle.vn.button` (`Button.ts:50`, `constants.ts:44-45`, 16 rows at `guides/veneer.md:696-711`) | Drop | Every toggle dispatches it, including method calls, as a bubbling cancelable event any document listener sees. Nothing in `src` or `app` consumes it. When the Vue face lands it can compose the replacement button plugin the guide already demonstrates (`guides/veneer.md:628-661`). |
| Shared-host tips (`registry-plugins:tips`) | Keep | Only a consumer who puts both profiles on one host sees it, and Bootstrap has no working behavior there to match. |
| Several plugins per element (`registry-plugins`) | Keep | Same reason. |
| Teardown restoration (`collapse-destroy`, `tab-destroy`, `carousel-destroy`, `lock-priority`, `saved-attributes`) | Keep | You asked for `destroy`, and the user's ruling 16 fixed what it restores. |
| Trap-owner release, direction read on every update, `aria-describedby` tokens | Keep | They differ only in states you created. They are correctness fixes the user ruled. |
| Factory defaults: collapse `toggle: true`, tip container `document.body`, sanitizer on | Keep | These are Bootstrap's defaults, and the oracle defines them. |
| Placement's constructed `@position-try` sheet | Keep | It is adopted only while a floating part you opened needs a perpendicular fallback. |
| Touch `mouseover` listeners | Keep | Bootstrap's own (see D4, R13). |

- **Removing `toggle.vn.button` removes this public contract:**
  - `ButtonEventMap`, `ToggleDetail`, `BUTTON_EVENTS`, and `ButtonOptions`.
  - The constructor becomes `Button(element, context)` and the factory `createButton(element)`.
  - `ButtonInterface.toggle` is documented as "Toggles class `active` and writes `aria-pressed` to match."

### Files touched

- `src/browser/plugins.ts`, `types.ts`, `factories.ts`, `Button.ts`, `constants.ts`
- `tests/src/browser/plugins.test.ts`, `Button.test.ts`, `Tip.test.ts`, `Engine.test.ts` (becomes `Veneer.test.ts`), `factories.test.ts`
- `tests/distribution.test.ts`
- `tests/setupBrowser.ts`: `ORACLE_EVENTS` at `:3774` and the journey scope
- `app/browser/main.ts`, `guides/veneer.md`

### Departure rows

- **Removed:** the four `tip-boot` rows (`guides/veneer.md:689-692`) and the 16 `button-toggle` rows (`:696-711`).
- **Rewritten:** the closing paragraph at `:939` and the delegation recipe at `:588`. The `.filter(...)` recipe goes, because the collection no longer boots tips.

### Proofs

- **Veneer.test.ts, a bare scope stays inert.** A data-API click for each family changes nothing. A tooltip host keeps its `title`. CDP `DOMDebugger.getEventListeners` on `document` reads no scope listener, which is a real instrument, not a spy.
- **Tip.test.ts, opt-in boot equals Bootstrap.** The oracle frame runs Bootstrap's documented init snippet, and the engine boots `[...createBootstrapPlugins(), createTooltipPlugin({ boot: true }), createPopoverPlugin({ boot: true })]`. The transcripts are equal with no row.
  - Control: the collection alone against an oracle with no snippet is also equal.
  - This replaces the `tip-boot` rows' consumer, `Engine.test.ts: boots configured hosts and releases stale registrations safely`. Its boot mechanics stay in `Veneer.test.ts` through `buildEnginePlugin`.
- **plugins.test.ts.** `createTooltipPlugin()` has no `boot`, and `{ boot: true }` carries Bootstrap's selector. Both are frozen and register nothing.
- **distribution.test.ts:998, re-pointed.** A bundle that imports only `createVeneer` keeps no `create*Plugin` and no component class. A bundle with `createVeneer` plus `createBootstrapPlugins` keeps all twelve. This is the measurable gain of the blank slate.
- **Button.test.ts.** It matches every toggle path against the oracle with no `button-toggle` row.

### Risks and over-correction

- Every in-tree `createEngine(root)` that expects Bootstrap must pass `createBootstrapPlugins()` in the same change. External consumers of the published package break, and the release must say so.
- Over-correcting breaks Bootstrap parity in two ways:
  - Dropping the load-time boot entries for carousel, scrollspy, offcanvas, and tab.
  - Dropping shared-host tip support, which would bring back Bootstrap's accumulating panels.

## D2: `createVeneer`

### Shape

| Today | Renamed |
| --- | --- |
| `createEngine` | `createVeneer` |
| class `Engine` | `Veneer` |
| `EngineInterface` | `VeneerInterface` |
| `EngineOptions` | `VeneerOptions` |
| `EngineInteraction` | `VeneerInteraction` |
| `Engine.resolve` | `Veneer.resolve` |
| `src/browser/Engine.ts` | `src/browser/Veneer.ts` |
| `tests/src/browser/Engine.test.ts` | `tests/src/browser/Veneer.test.ts` (mirror rule) |
| `ENGINE_ROOT` | `VENEER_ROOT` |
| `ENGINE_DESTROYED` | `VENEER_DESTROYED` |
| `ENGINE_DESTROY` | `VENEER_DESTROY` |

```ts
/**
 * Describes the boot scope that serves the data API of its listed plugins over a document or a subtree and owns the components it creates.
 *
 * @remarks
 * `createVeneer` returns one. The scope serves only the plugins its creation listed: their routes run in the capture phase and their clearing in the bubble phase, in list order, and their boot entries initialize matching hosts after document load. A scope that lists no plugin adds no listener, boots nothing, and reserves its root, so a nested scope's list is its subtree's whole data API. A second scope over the same root handles no event twice, and nested roots select one responsible scope per event. `destroy` destroys only the components this scope created, including a body-level modal opened by its subtree trigger.
 *
 * @example
 * ```ts
 * function release(veneer: VeneerInterface): void {
 * 	if (!veneer.destroyed) veneer.destroy()
 * }
 * ```
 */
export interface VeneerInterface {
	/** Names the document or subtree whose data API the scope serves. */
	readonly root: Document | HTMLElement
	/** If `true`, `destroy` ran and the scope handles no event; if `false`, the scope is live. */
	readonly destroyed: boolean
	/** Removes the scope's delegated listeners and destroys every component the scope created. Thrown when a component teardown fails: `VeneerError` with code `VENEER_DESTROY` and the aggregate errors in its context. */
	destroy(): void
}

/** Carries a routed trigger, its native event, and the dispatching scope's registry to a plugin handler. */
export interface VeneerInteraction {
	readonly trigger: HTMLElement
	readonly event?: Event
	readonly registry: RegistryInterface
	/** Cancels work belonging to the dispatching scope; absent for dispatch without a scope. */
	readonly signal?: AbortSignal
}

// src/core/types.ts
export type VeneerErrorCode =
	| 'VENEER_DESTROY'
	| 'VENEER_DESTROYED'
	| 'VENEER_ROOT'
	| 'REGISTRY_COMPONENT'
	| 'REGISTRY_CONFLICT'
	| 'TIP_HIDDEN'
	| 'DROPDOWN_MENU'
```

The factory, with its TSDoc:

```ts
/**
 * Boots one data API scope per root over the plugins it lists and returns the live scope on a repeated call.
 * @param root - Document or subtree to boot. Default: document.
 * @param options - Plugins used on first creation. Default: none, so the scope routes nothing.
 * @returns The owning scope; destroy tears down only its owned components.
 * @example
 * const veneer = createVeneer(document, { plugins: createBootstrapPlugins() })
 * veneer.destroy()
 */
export function createVeneer(root: Document | HTMLElement = document, options: VeneerOptions = {}): VeneerInterface
```

- **The name rule.** Rename every identifier that names the boot-scope entity. Keep "engine" as the common noun for the browser runtime.
- **Kept as runtime nouns:**
  - the heading `### Engine departures` and its `Engine` column, with `readDepartures(..., 'Engine departures')` at `tests/setup.ts:473,511,531`;
  - `buildEnginePlugin`;
  - the showcase's `createEngineTable`, `ENGINE_SECTION`, `ENGINE_ROWS`, and "Engine states".
- **Renamed because they hold the scope:** `startJourneyEngine` becomes `startJourneyVeneer`, and `journeyEngine` becomes `journeyVeneer` (`tests/setupBrowser.ts:1273-1283`).
- **The family list.** `tests/setup.ts:419` changes `'Engine'` to `'Veneer'`.
- **Name checks.**
  - `Veneer`, `VeneerInterface`, `VeneerOptions`, and `VeneerInteraction` are free in `scaffold/guides/*.md`. A grep for `Veneer*` found only prose in `test.md:1667`.
  - `Scope*` is owned by agent and mcp, which is why `SCOPE_*` codes are refused.
  - `VeneerError` is the same package's error, so it doesn't collide.

### Alternatives considered

- **Keep the `ENGINE_*` codes: refused.** It breaks one concept, one term, because each code names the entity that throws.
- **Rename the departure heading and column to "Veneer": refused.** That table compares the runtime with Bootstrap's JavaScript, not the scope class. The rename would churn the reader and the setup proofs for nothing (Tension T7).

### Consumers the rename migrates

- `src/core/types.ts`
- `src/browser/{Engine.ts, types.ts, factories.ts, helpers.ts:3,87,122, index.ts:8}`
- Every `tests/src/browser/*.test.ts` that calls `createEngine` (count from the grep: 19 files), plus `tests/src/core/errors.test.ts`
- `tests/distribution.test.ts:998-1052`, `tests/setup.ts:419`, `tests/setup.test.ts`
- `tests/setupBrowser.ts`, both sections:
  - Engine section: `:11` and `:91` imports, and `:4668`, which gains `{ plugins: createBootstrapPlugins() }`.
  - Showcase section: `:1273-1283`, which gains the tip opt-in.
- `tests/setupBrowser.test.ts`
- `app/browser/main.ts:1-6`: it holds the scope it creates and composes the tip opt-in.
- `tests/app/browser/main.test.ts:8,116` and `tests/app/browser/Showcase.test.ts:9,315`
- `guides/veneer.md`: the Surface rows, `#### EngineInterface`, `:539`, `:578`, `:580`, the fence at `:630-661`, `:939`, and the Proof cell at `:688`
- `ROADMAP.md:144-145`

`showcase/browser.html` is rebuilt by whichever side merges.

### Statechart and journey rows

- The rename itself moves none.
- The blank slate would move rows in `TOOLTIP_SCENARIOS` (`setupBrowser.ts:2098`), `POPOVER_SCENARIOS` (`:2149`), and `DIALOG_TOOLTIP_SCENARIOS` (`:2997`). `startJourneyVeneer` opts into tip boot, so the predicted moved rows are none.

### Proofs

- The family proofs and the departure table stay green read both ways.
- `errors.test.ts` pins the codes.
- `index.test.ts` pins `Veneer` and `createVeneer` present, and `Engine` and `createEngine` absent.
- The `surface` policy reports no collision.

### Risks and over-correction

- The Vue face can't claim `Veneer` or `createVeneer` later.
- Renaming the runtime noun everywhere ("Veneer departures", `createVeneerTable`) would move the showcase's section ids and the journey rows for no contract gain.

## D3: stage B's native pieces

### `<dialog class="modal">`: ships

**How you opt in.** You need both the markup and an option. A `<dialog>` host on its own keeps Bootstrap's path, because the oracle defines Bootstrap's behavior on that markup: it treats the dialog as a `div`.

```ts
// ModalOptions gains:
/**
 * If `true`, a `<dialog>` host opens with `showModal()` in the top layer, carries `closedby="none"` while open so that Escape and backdrop clicks keep Bootstrap's paths, and closes with `close()`; a `div` host keeps Bootstrap's path. If `false`, every host keeps Bootstrap's path. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly dialog?: boolean

/**
 * Configures a modal plugin at creation.
 *
 * @example
 * ```ts
 * const options: ModalPluginOptions = { dialog: true }
 * ```
 */
export interface ModalPluginOptions {
	/**
	 * If `true`, every modal the plugin creates opens a `<dialog>` host in the top layer, as `ModalOptions.dialog` describes; if `false`, the plugin creates modals on Bootstrap's path.
	 *
	 * Default: `false`.
	 */
	readonly dialog?: boolean
}
// createModalPlugin(options?: ModalPluginOptions): PluginInterface<Modal>
```

**Mechanics against `Modal.ts`:**
- `#open` (`:190-211`) keeps Bootstrap's writes in Bootstrap's order. On the dialog path it also:
  - acquires `closedby` through a `Hold` and writes `none`;
  - calls `showModal()` at the point Bootstrap writes `display: block`.
- `#close` (`:213-230`) calls `close()` where Bootstrap writes `display: none`. `destroy` (`:159-188`) calls `close()` on an open dialog and releases the `Hold`.
- `Backdrop` keeps the `div` backdrop. It sits in the document layer, beneath the top-layer dialog.
- `Trap` stays active: the `focus-inert` reading shows `inert` excludes outside controls but doesn't wrap focus.
- The Tab limit: Tab from the last control leaves the document instead of wrapping to the first. That becomes a departure row.
- `Lock` and `Hold` are unchanged.
- The private field `#dialog` (the `.modal-dialog` child) becomes `#content`, so it stops colliding with the option's word.

**Where the CSS lives:** your stylesheet, published as a guide fence and loaded in both realms by the proof:

```css
dialog.modal {
	margin: 0;
	border: 0;
	padding: 0;
	max-width: none;
	max-height: none;
	color: inherit;
	background: transparent;
}
dialog.modal[open] {
	display: block;
}
dialog.modal::backdrop {
	background: transparent;
}
```

- The `src/bootstrap` sheet is foreclosed (see Refusals).
- An engine-adopted sheet would be unlayered, so it would beat every layered rule you write.
- The styles chunk can carry these rules in its `components` layer.

**Departure rows, scenario prefix `modal-dialog`, consumed by `Modal.test.ts`:**
- `$::open` and `$::closedby` writes at show and hide.
- `$::focus` after Tab from the last control (the Tab limit).
- The `$::hit` order against a `.toast` and a tooltip in `body`: Bootstrap's z-index puts the toast (1090) above the modal (1055), while the top layer puts the dialog above both (`top-layer` reading).

**Must not break:**
- Every `modal-overlay` case and every `modal:*` and `trap-owner:*` row on `div` hosts.
- The control: `dialog: true` on a `div` host matches Bootstrap with no row.

**Measurements to re-run at `dc4654b`:**
- the recipe in the oracle frame, including the transparent `::backdrop` with the `div` backdrop beneath (P12);
- Escape under `closedby="none"`, including repeated presses with no `cancel` or `close` (P6);
- the order of `close()` focus restoration against the data API's focus return;
- `showModal()` on a dialog that already carries `open`.

### Scroll lock with `scrollbar-gutter: stable`: ships

- **How you opt in:** declare `html { scrollbar-gutter: stable }` in your stylesheet. The engine writes no gutter and gains no option.
- **The change:** `Lock.width` (`Lock.ts:30-38`) reads `0` when the root element's computed `scrollbar-gutter` begins with `stable`. Bootstrap's algorithm then runs unchanged with a compensation of zero.
- **Why the detection is needed:** with a gutter, `innerWidth - clientWidth` still reads 15 px (`scroll-lock`), so Bootstrap double-compensates.

```ts
// LockInterface.width becomes:
/** Reports the compensation width in CSS pixels: the first owner's measurement while locked, otherwise the current scrollbar width, and `0` when the root element's computed `scrollbar-gutter` is `stable`. */
readonly width: number
```

- **Departure rows, prefix `lock-gutter`, consumed by `Lock.test.ts`:** padding on `body`, `.fixed-top`, and `.fixed-bottom`; `margin-right` on `.sticky-top`; the modal `update` padding.
- **Must not break:** without a declared gutter, every row in `overlapping-locks`, `lock-priority`, `saved-attributes`, `trap-owner body::writes`, and `modal:overlap` stays unchanged.
- **Measurements to re-run:** a gutter declared before the lock, covering body, fixed, and sticky widths, an overflowing modal's `update`, an offcanvas, and RTL.

### `interpolate-size` vertical collapse: doesn't ship

- **Evidence:** `collapse-intrinsic` measured equal motion. Both paths reach 120 px, at about 368 ms and 349 ms against a 350 ms duration. Auto width is not `scrollWidth`, so the horizontal case isn't covered.
- **What it would cost:** a mode in `Collapse` plus departure rows on the `height` writes, with no consumer and no visible gain.
- **If the Orchestrator overrules:** detect `interpolate-size: allow-keywords` computed on the panel and write `auto` in place of the measured pixels, vertical only. First measure a content resize during the transition.

### `popover="manual"` floating parts: doesn't ship

- **Evidence against it:**
  - `top-layer`: insertion order inverts Bootstrap's scale (dropdown 1000, tooltip 1080, toast 1090), and reopening reorders the stack.
  - `dropdown-anchor-popover`: the native open state and Bootstrap's `.show` class can disagree. That is two sources of open state, against the derive-state law.
  - The UA `[popover]` styles need rules the Bootstrap sheet can't carry.
- **Already covered:** stage A's fixed ordinary-layer anchors already escape overflow clipping. The remaining gap (stacking contexts and transformed containing blocks) is a gap Popper has too.
- **The one consumer:** a tip whose trigger sits in a top-layer dialog. Setting `container` to an element inside the dialog serves it, which `guides/veneer.md:592` already requires for interactive tips.
- **If the Orchestrator overrules:** a `position.popover?: boolean` leaf on `DropdownPositionOptions` and `TipPositionOptions`, mirroring the HTML attribute. CSS lives in your stylesheet. Rows use the prefix `floating-top-layer`.

## D4: the remainder map's partial items

- **R13: keep one listener per owner, extract the duplicate, record the row.**
  - Move the loop at `Tip.ts:217-222` and `Dropdown.ts:124-131` into `bindTouchListeners(document: Document, signal: AbortSignal): void` in `helpers.ts`, tested in `helpers.test.ts`.
  - Add a `touch-hover` departure row with a CDP `getEventListeners` reading of the body's children on a touch-emulated page. With a tooltip and a dropdown both open, Bootstrap has 1 listener and the engine 2. After the tooltip hides, Bootstrap has 0 (its `off` removes the shared noop) and the engine 1.
  - Consumed by `Dropdown.test.ts`.
  - Refused: a counted shared listener, which would add mechanism for a noop. Refused: moot, because the table must name every difference the oracle defines.
- **M1: no code change; add one row.**
  - A page token added between show and hide survives the engine's hide, while Bootstrap removes the attribute.
  - Add a `tip-description` row, `host::page`, by extending `Tip.test.ts: records author description preservation against Bootstrap overwrite` with a step that edits the page while the tip shows. A token removed mid-show stays removed on both sides.
- **M4: add a row.**
  - Row `anchor-stylesheet`, reading the reference's computed `anchor-name` while open: Bootstrap keeps the stylesheet name, and the engine reads its own.
  - Consumed by a supplemental comparison in the existing `Placement.test.ts:96` case.
  - Refused: copying computed names into the inline list. Ruling 16: "A list slot takes per-owner tokens and stores no original."
- **R7: closed.** The record fix is already made.

## D5: units

Every unit runs this proof ladder:
1. the touched file;
2. `npm run test:src:browser`;
3. `npm run test:guides` wherever the guide changes.

Report-only files return an exact patch, which the Orchestrator applies.

1. **U0 `stage-b-contract`** (subjective, Claude Opus 5.5, edits only)
   - Owns: an exact patch for `src/browser/types.ts` and `src/core/types.ts` carrying every D1–D3 declaration and the `Button` removals.
   - Acceptance: once U1 applies it, the browser-scope `tsc` exits 0, and the TSDoc follows `writing.md`.
2. **U1 `veneer-boot`** (objective, GPT-6 Astra, worktree `veneer-wt-veneer-boot`, after U0)
   - Covers: D1 and D2 together, because both touch the same call sites.
   - Owns: `src/browser/{Engine.ts→Veneer.ts, factories.ts, plugins.ts, helpers.ts, index.ts}`, `src/core`, every consumer listed in D2, the guide's Surface and Methods renames and token swaps, and removal of the `tip-boot` rows.
   - Acceptance: the D1 and D2 proofs, the distribution case, and `npm run test:journey` with predicted rows none.
3. **U2 `button-quiet`** (objective, Astra, after U1)
   - Owns: `Button.ts`, `constants.ts`, the `createButton` signature in `factories.ts`, `Button.test.ts`, `ORACLE_EVENTS` in the engine section of `setupBrowser.ts`, and removal of the 16 rows.
4. **U3 `dialog`** (objective, Astra, worktree, after U2)
   - Owns: `Modal.ts`, `createModalPlugin` in `plugins.ts`, `Modal.test.ts`.
   - Report-only: the recipe loader, the `buildDialog` fixture, and the family prefix in `setupBrowser.ts`; the guide rows and fence.
   - Acceptance: the control with no rows, the `modal-dialog` rows read both ways, Escape, static, veto, and destroy-while-open equal.
5. **U4 `gutter`** (objective, Astra, worktree, parallel with U3)
   - Owns: `Lock.ts`, `Lock.test.ts`.
   - Report-only: the `setupBrowser.ts` families and the guide rows.
6. **U5 `remainder`** (objective, Astra, worktree, parallel with U3 and U4)
   - Owns: `helpers.ts`, `Tip.ts`, `Dropdown.ts`, and their tests plus `Placement.test.ts`.
   - Report-only: the `setupBrowser.ts` families and the guide rows.
7. **U6 `stage-b-guide`** (subjective, Opus, after U3–U5)
   - Owns: the `guides/veneer.md` Browser entry prose (the blank slate, `createVeneer`, tip opt-in, the dialog fence, the gutter, the declined pieces with their evidence, the `:588` and `:939` rewrites); it applies every row patch; and the `ROADMAP.md` browser lines.
8. **Close-out:** one `orkestrel-falsify` round, then `verifier` runs the tree-wide gates.

**Lanes log (`lanes.md` § Rules, `:41-45`), entries the showcase session needs:**
- **Before U1 lands:**
  - Name the migrated call sites: `app/browser/main.ts`, `tests/app/browser/main.test.ts`, `tests/app/browser/Showcase.test.ts`, and `startJourneyVeneer` in the showcase section.
  - Predicted statechart rows: none. `TOOLTIP_SCENARIOS`, `POPOVER_SCENARIOS`, and `DIALOG_TOOLTIP_SCENARIOS` keep their behavior because the journey scope opts in.
  - The merging side rebuilds `showcase/browser.html`.
- **Before U2 lands:** predicted rows none. No table reads `toggle.vn.button`; `BUTTON_SCENARIOS` reads the pressed state.
- **Before U3–U5 land:** predicted rows none. The showcase writes `div.modal` and declares no gutter.

## Could not decide

- The exact cell values of every added row. They need the measurements this lane can't run.
- Whether `closedby="none"` alone prevents native Escape closing on repeated presses (P6).
- The RTL gutter side and the geometry of an overflowing modal's `update` under a declared gutter.
- Whether the 0.0.88 visit hold (`lanes.md:63`) still applies to landings, given the user's "continue without the scaffold bump".

## Constraints

- `src/browser/factories.ts:174` defaults to `createBootstrapPlugins()`; `src/browser/Engine.ts:36` defaults to `[]`.
- `src/browser/plugins.ts:284` and `:364` declare tip boot unconditionally.
- `.claude/rules/architecture.md:214-215`: `create{Entity}Plugin(options?)`; the factory builds and registers nothing.
- `.claude/rules/names.md:177,191`: the plugin factory forms; never `register*` or `install*`.
- `src/browser/Registry.ts:99-104`: explicit options replace a component built by the plugin's `create`.
- `tests/app/browser/main.test.ts:66-104`: hovered tips must be owned by the scope.
- `guides/veneer.md:1144` and `:1176-1177`: the Bootstrap sheet admits no addition.
- `ROADMAP.md:31-42`: layers are fixed per face, and an unlayered rule beats every layer.

## Refusals

- **Dialog rules in `src/bootstrap`:** "A value, selector, or context departure is inadmissible in the Bootstrap sheet" (`guides/veneer.md:1144`).
- **A scope-level tip switch:** "The engine carries no tip branch" (convention verdict `:107`).
- **Copying computed `anchor-name` into the inline list:** "A list slot takes per-owner tokens and stores no original" (convention verdict `:151`).
- **A `createBootstrapVeneer` preset:** "A wrapper adds a boundary, invariant, composition, translation, lifecycle, or materially narrower contract, or it goes" (`AGENTS.md`, Design laws).
- **An opt-in `toggle.vn.button`, and a `ModalPluginOptions` that carries all of `ModalOptions`:** "Create or substantively expand a capability with its first real consumer" (`AGENTS.md`).
- **A `Dialog extends Modal` subclass:** `Modal`'s state lives in `#` fields, which a subclass can't reach, and a copied class breaks "Remove duplication" (`AGENTS.md`, Work loop step 5).

## Measurements

- **Supplied:** `dialog-modal`, `focus-inert`, `scroll-lock`, `collapse-intrinsic`, `top-layer`, `dropdown-anchor-popover`, `tooltip-arrows`, and `fade-discrete`, all on Chromium 153.0.8010.12 with Playwright 1.63.0, measured before `dc4654b`.
- **Missing:**
  - P12 and P6;
  - `close()` focus order;
  - the dialog hit-test against toasts and tooltips in `body`;
  - `showModal()` on a dialog that already carries `open`;
  - a gutter declared before the lock (body, fixed, sticky, modal `update`, offcanvas, RTL);
  - the R13 listener counts read through CDP;
  - the M4 computed `anchor-name` while open;
  - the bundle contents for `createVeneer` alone.

## Tensions

- **T1:** opting in to the dialog takes markup plus an option, against ruling 1's "author-opted" markup alone.
- **T2:** declining `interpolate-size` and `popover="manual"`, against "Stage B runs now" with all four pieces.
- **T3:** dropping `toggle.vn.button`, against the Vue-surface reason in design ruling 5.
- **T4:** detecting the gutter from your stylesheet, against an option that makes the engine write the gutter.
- **T5:** dialog CSS in your stylesheet, against an engine-adopted sheet.
- **T6:** `plugins` optional and empty by default, against `plugins` required.
- **T7:** keeping "engine" as the runtime noun, against renaming everywhere.
- **T8:** R13 as a recorded row, against closing it as moot.
- **T9:** the landing hold from the 0.0.88 visit.

## Risks

- A factory call with options replaces a dialog modal that a plugin built, dropping the `dialog` mode unless you pass it again.
- Under a top-layer dialog, tooltips in `body` and toasts sit beneath it and become inert.
- The blank-slate default breaks published consumers.
- An author gutter declared on `body` instead of `html` is not detected.