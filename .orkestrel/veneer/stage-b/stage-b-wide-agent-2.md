# Stage B design: subjective lane

This pass holds the subjective lane: API shape, names, ergonomics, and guide voice. It looks at stage B from the position of a consumer starting from the blank slate. The baseline is veneer `main` at `9885975`, read through the shapes `veneer-boot` lands (`tmp/units/stage-b-design-agent-2.md:241-333`), with two later user rulings applied: `toggle.vn.button` stays, and `createVeneer` with no plugins routes nothing (`scaffold:.orkestrel/veneer/browser-design-verdict.md:75-76`).

## Design

One rule set governs every stage B surface. Each rule removes a choice the consumer would otherwise have to learn per family.

1. **Leaf rule.** Every stage B surface is one top-level boolean leaf on the existing `{Entity}Options` record.
   - The default is `false`.
   - Markup never sets the leaf. `resolve*Options` reads only Bootstrap's own keys from the markup record and spreads the typed options over them (`src/browser/helpers.ts:350-366`, `:328-340`). An invented `data-bs-dialog` attribute therefore cannot reach the leaf.
   - The leaves are `dialog`, `gutter`, `intrinsic`, and `topmost`.
2. **Plugin rule.** A family whose component gains a leaf gets a `create{Entity}Plugin(options?: {Entity}PluginOptions)` factory.
   - The record holds exactly that family's stage B leaves, plus `boot` on the tips.
   - The plugin's `create` passes those leaves to every component that its data API or boot builds.
   - The other seven plugin factories keep no parameter.
   - `createBootstrapPlugins()` carries no stage B leaf. You opt in by appending a same-named replacement, which takes the original's place in the list (`scaffold:.orkestrel/veneer/browser-convention-verdict.md:129`).
3. **Byte-for-byte rule.** Nothing is detected from your CSS or from your markup.
   - A page that sets no leaf runs stage A unchanged, including a page whose reset declares `scrollbar-gutter: stable` or `interpolate-size`. Common resets declare these (`tmp/units/stage-b-design-agent-0.md:280`).
   - The judge's CSS-detected gutter and intrinsic collapse are overruled; see Alternatives.
4. **Lifetime rule.** An opted component holds native state only while it is open.
   - `closedby`, `popover`, the inline `scrollbar-gutter`, and the inline `interpolate-size` are each held through `Hold` and released at close or at `destroy`.
   - Every native route that can open or close an opted host goes through the component's Bootstrap gate. A route that cannot be vetoed is reconciled once as a forced close and recorded as a departure row.
5. **Prefix rule.** Each departure scenario prefix is `{family}-{leaf}`, such as `modal-dialog` or `dropdown-topmost`, with `:` sub-scenarios.
   - The second segment names the option that opts into the row, so the departure table maps each row to its leaf by name.
6. **CSS rule.** Each native host reset is written once, as a guide fence wrapped in `@layer reset`.
   - The harness reads that fence and adopts it in both realms.
   - In the reset layer, your rules beat the user-agent origin, and Bootstrap beats your rules wherever Bootstrap declares a property. This holds for the lifted sheet (in the `bootstrap` layer, which comes later) and for the drop-in or bundled sheet (unlayered). See `ROADMAP.md:26` and `:42`.
   - The reset layer is the layer `./styles` owns (`ROADMAP.md:37`), so chunk 3 takes the rules over verbatim.

## W1: per subject

### Refused or deferred for every subject

Each of the following candidates is ruled once, and the ruling applies to every subject unless a subject section states otherwise. Each row gives its evidence.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `@starting-style`, `allow-discrete`, `overlay` | Refuse | Bootstrap's `reflow` sites are the contract (`scaffold:…/browser-design-verdict.md:23`). The measured fades take equal time: 176.6 ms with `reflow` against 166.5 ms with `@starting-style` (`tmp/codex/stage-b-measurements.md:157`). Opted top-layer exits are timed by holding native state through the fade (the Lifetime rule), so no `overlay` transition is needed. |
| View Transitions, document-scoped and element-scoped | Refuse | Completion runs on its own clock, separate from `slid` and `shown`. Under reduced motion the 250 ms pseudo-element animations remain (`stage-b-measurements.md:159-166`). A document-scoped transition sends hit testing to the document element (`tmp/units/native-research-agent-0.md:90`). |
| Scroll-driven animations; `TransitionEvent.animation`; `activeViewTransition`; `waitUntil` | Refuse | Nothing in the contract uses them. The engine listens for no `transitionend` and starts no view transition (`native-research-agent-0.md:121-123`). |
| `ElementInternals`, `:state()` | Refuse | They serve custom elements only. Every host is Bootstrap markup. |
| `inert`, `interactivity: inert` | Refuse | Both exclude focus but neither wraps it (`tmp/units/browser-feasibility-report.md:23`). On the dialog path, `showModal()` already excludes. |
| `CloseWatcher` | Defer | Blocked on the Android Back reading (`stage-b-measurements.md:39`, `:187`). Desktop Escape is already vetoable through keydown. A watcher's `cancel` is gated by user activation (`:178-183`). |
| `ariaNotify` | Refuse | It duplicates the live region your markup's `role` already declares. Its spoken effect is unmeasured (`stage-b-measurements.md:103-107`). |
| `popover="auto"`, `popover="hint"`, `interestfor` | Refuse | A closing `beforetoggle` cannot be cancelled, so `hide.bs.*` vetoes are lost (`stage-b-measurements.md:21-26`). An author `aria-describedby` already replaces the native hint description (`:91`). |
| `focusgroup` | Refuse | Bootstrap's tab writes `tabindex="-1"`, which drops inactive tabs from arrow navigation. `focusgroup` menus wrap, while Bootstrap's menu keys do not (`native-research-agent-2.md:158-162`). Only toolbar ArrowRight was measured (`stage-b-measurements.md:49`). |
| `<details>`, `name`, `::details-content` | Refuse | No veto, a non-cancelable `toggle`, and no wait signal (`stage-b-measurements.md:135-139`). |
| `hidden="until-found"`, `beforematch` | Defer (Collapse, Tab) | Blocked on a find-in-page or fragment reveal reading under a display recipe that survives `[hidden]{display:none!important}` (`stage-b-measurements.md:133`, `:139`). |
| CSS carousel pseudo-elements, scroll snap and snap events, `scroll-target-group`, scroll-state queries | Refuse | They emit no `slide`/`slid` and no class contract (`stage-b-measurements.md:147`), and use different markup (`native-research-agent-2.md:95`, `:104`). |
| `position-visibility`, `anchor-scope`, anchored container queries | Refuse | `Placement`'s explicit anchors and inline arrow stay (`scaffold:…/browser-design-verdict.md:24`). Bootstrap's sheet reads `data-popper-placement`. |
| `:has(dialog:modal)` lock, `overscroll-behavior` | Refuse | `Lock` stays the single lock owner (W2). Containment alone leaks scrolling over the backdrop (`stage-b-measurements.md:72`). |
| Invoker commands as a data API | Refuse | See W2. The exception is the `dialog` host's own commands. |
| DOM APIs `moveBefore`, `checkVisibility`, `scrollIntoView({container})`, `focus({focusVisible})` | Refuse | See W2. |
| ARIA element reflection | Defer | Blocked on a cross-shadow description reading (`stage-b-measurements.md:125`). |

### Alert, Button, Carousel and `Swipe`, Scrollspy, Tab, Toast

These six subjects add no native surface.

- **Toast top layer:** refused on new evidence. A promoted toast in `body` stays inert under a native modal (`stage-b-measurements.md:105`), and promotion takes the toast out of `.toast-container` layout (`scaffold:…/browser-design-verdict.md:43`).
- **Alert:** has no display toggle to establish. Top layer is the wrong layer for an inline alert (`native-research-agent-6.md:48`).
- **Button:** HTML has no native pressed toggle (`native-research-agent-6.md:27-30`). `toggle.vn.button` stays.
- **Toolbars:** `focusgroup` on `.btn-toolbar` is an author attribute the browser serves with no engine involvement. Bootstrap has no toolbar JavaScript.
- **Carousel:** see the preceding table.
- **Tab and Collapse:** `until-found` is deferred, per the preceding table.

### Modal: `dialog` and `gutter`

**Opt-in shape.** You opt in with `ModalOptions.dialog` and `ModalPluginOptions.dialog`.

- The path runs only on a realm-aware `HTMLDialogElement` host, so the oracle child frame resolves its own constructor.
- `dialog: true` on a `div` host keeps the stage A path, as an equal control with no row.
- A `<dialog class="modal">` without the leaf also keeps stage A. That is Bootstrap's own working behavior on this markup (`tmp/units/stage-b-design-agent-2.md:126-131`).

**Mechanics against the tip.** These steps are fixed; the objective lane owns correctness.

- **Open.** In `#open`, at the `display: block` write (`src/browser/Modal.ts:197`):
  1. Acquire `closedby` through the `Hold` and write `none`.
  2. Call `showModal()`.
- **Close.** In `#close`, at the `display: none` write (`Modal.ts:217`), call `close()`. Release the hold at the end of `#close` and in `destroy` (`:160-188`).
- **Kept.**
  - Escape keeps the keydown listener (`Modal.ts:55-63`). Under `closedby="none"`, the browser delivers Escape without `cancel` or a native close (`tmp/codex/browser-stage-b-design-verdict.md:210`).
  - `Backdrop`, `Trap`, `Lock`, and the mousedown-plus-click hit test stay (`Modal.ts:64-78`).
- **Rename.** The private `#dialog` becomes `#content` (`Modal.ts:18`).
- **Native routes through the gates.** The modal listens on its own host for `command` and `cancel`.
  - A `show-modal` command is prevented and routed to `show(event.source)`.
  - A `close` or `request-close` command is prevented and routed to `hide()`.
  - A script `requestClose()` fires a `cancel` that is always cancelable (`native-research-agent-7.md:60`). The engine prevents it and calls `hide()`.
  - A direct `dialog.close()` or a `method="dialog"` submit is reconciled once as a forced close.
- **Pre-opened host.** A host that already carries `open` at `show` throws `VeneerError('MODAL_OPEN')` before any write.
- **Which `hide.bs.modal` vetoes survive.**
  - Survive: Escape, backdrop click, data-API dismiss, both command routes, and `requestClose()`.
  - Lost: direct `close()` and the form submit.
  - Android Back does nothing under `closedby="none"` (`native-research-agent-7.md:171`), as in Bootstrap.
- **Focus.** `showModal()` focuses the first focusable element, including one with `tabindex="-1"` (`stage-b-measurements.md:57`). `Trap` then focuses the host after the transition, as Bootstrap's trap does. `close()` restores focus before the data API's opener return. With `focus: false`, the browser still excludes the outside page; the guide states this.
- **Top layer.** The dialog rises above every Bootstrap `z-index`. Body-level toasts and tips go beneath it and become inert.
- **Accessibility.** The AX tree reports modal from the top layer and prunes the outside page. The engine's `aria-modal="true"` agrees with that (`stage-b-measurements.md:93`).

**Departure rows.** All rows go under `modal-dialog` and are consumed by `Modal.test.ts`.

- The base prefix covers `$::open`, `$::closedby`, and `$::modal`.
- The sub-scenarios are `:focus` (transient focus), `:command`, `:close` (forced close), and `:order` (hit order against a toast and a body tooltip).

**CSS.** The dialog needs the reset fence (W4).

**Gutter.** You opt in with `ModalOptions.gutter`, which passes `{ gutter }` to `new Lock(document, options)`.

- `Modal.update` reads `lock.compensation` in place of `lock.width` (`Modal.ts:151`).
- Rows go under `modal-gutter`, consumed by `Modal.test.ts`.

### Offcanvas: `gutter`

`OffcanvasOptions.gutter` and `OffcanvasPluginOptions.gutter` take effect only when `scroll` is `false`. Rows go under `offcanvas-gutter`.

`dialog` on an offcanvas is deferred. It is blocked on readings of `<dialog class="offcanvas">` through `show()` and `showModal()`, across the scroll and backdrop combinations, and of the responsive in-flow variant under the user-agent rule `dialog:not([open])` (`tmp/units/native-inventory-2.md:26`).

### Lock and Hold: `LockOptions.gutter`

**Policy.** The first acquisition chooses the policy, and joining owners take that policy without measuring.

**Gutter mechanics.**

- Measure the width as `Lock.ts:29-38` does.
- Hold and write `overflow: hidden` on `body`.
- When the width is above 0, hold `scrollbar-gutter` on `documentElement` and write `stable`.
- Write no padding and no margin, and save no `data-bs-*` attribute (`Lock.ts:59-88`).

The engine owns the gutter only for the lock's lifetime, so you need no CSS. Gating the write on the measured width keeps a page without a scrollbar unshifted. The measured stable gutter held the body, fixed, and sticky widths with zero padding (`stage-b-measurements.md:76`).

**Rows.** `lock-gutter` rows are consumed by `Lock.test.ts`. `Hold` is unchanged.

### Collapse: `intrinsic`, gated

The leaf is `CollapseOptions.intrinsic` with `CollapsePluginOptions.intrinsic`. It applies to vertical panels only.

**Mechanics.** At `Collapse.ts:127`:

1. Hold and write `interpolate-size: allow-keywords` on the panel.
2. Write `height: 0`.
3. Call `reflow`, in place of the `scrollHeight` read.
4. Write `auto`.

Hide is unchanged. An accordion sibling that this instance creates inherits the leaf (`tmp/codex/browser-stage-b-design-verdict.md:224`).

**Gate.** The leaf and its record land only if a content resize during the transition separates `auto` from pixels. Otherwise the capability does not exist and no type is declared. This is unit B3's first step.

**Rows.** Rows go under `collapse-intrinsic`. No CSS is needed.

### Dropdown, Tooltip, Popover: `topmost`

**Opt-in shape.** `topmost` is a top-level leaf on `DropdownOptions`, `TooltipOptions`, and `PopoverOptions`, plus `DropdownPluginOptions.topmost` and `TipPluginOptions.topmost`.

It is not `position.popover`, for two reasons:

- Every `position` leaf projects a Bootstrap key (`src/browser/types.ts:934-1006`).
- `Tip` spreads `position` into `Placement`'s settings (`src/browser/Tip.ts:209-215`), so promotion would leak into placement. Promotion is a separate lifetime (`browser-stage-b-design-verdict.md:228`).

**Mechanics.**

- **Show (dropdown).** After the `show` class and ARIA writes:
  1. Hold `popover` on the menu and write `manual`.
  2. Call `showPopover({ source: toggle })`.
  3. Construct `Placement` (`src/browser/Dropdown.ts:137`).
- **Show (tips).** After the append and `inserted` (`Tip.ts:202-203`), and before `Placement`, write `popover="manual"` on the panel and call `showPopover({ source: trigger })`.
- **Hide.** Call `hidePopover()` after the fade completes, then release the attribute. `popover` exists only for the open lifetime, so `[popover]` CSS never matches a closed menu.
- **Static path.** The static path (`Dropdown.ts:92-94`) ignores `topmost`, because the sheet positions a static menu.
- **Delegated children.** A delegated child inherits `true` as a non-default leaf (`guides/veneer.md:584`).
- **No native invoker writes.** The engine never writes `popovertarget` or `commandfor` on a toggle. The native expanded state overrides an author `aria-expanded` (`stage-b-measurements.md:88-95`).
- **Vetoes.** Manual popovers have no close watcher, so every `hide.bs.*` veto survives. A page's own `hidePopover()` is reconciled once as a forced close.
- **Accessibility.** No AX change: `source` creates no details relation (`native-research-agent-10.md:18`).

**Rows.** `dropdown-topmost`, `tooltip-topmost`, and `popover-topmost`, each with an `:order` sub-scenario, consumed by `Dropdown.test.ts` and `Tip.test.ts`.

**CSS.** The user-agent residue reset goes in the fence (W4).

### Placement, Backdrop, Trap, transition wait, boot scope

These five add nothing.

- `Placement` is constructed after promotion, so its `position: fixed` resolves against the viewport in either layer.
- `awaitTransition` keeps ignoring pseudo-element transitions (`stage-b-measurements.md:168`). No opted path waits on `::backdrop`.
- The boot scope gains no listener. The `command` listener lives on the opted modal host.

## W2: cross-cutting

- **Top-layer order.** Bootstrap's `z-index` scale governs every unopted part.
  - Opted parts stack in the order they open. The engine never reopens a panel to imitate the scale.
  - Toasts and offcanvas panels are never promoted.
  - The consequences are recorded as `:order` rows: a tooltip opened after a dialog sits above it, and toasts sit beneath any promoted part (`browser-stage-b-design-verdict.md:216`).
  - Tips over a `dialog` modal: a `topmost` tooltip paints above the dialog but is outside its interactive subtree. An interactive popover needs a `container` inside the dialog. No reparenting is automatic, because an automatic `container` would change pages whose native `<dialog>` the author opens.
- **Close requests.** Escape belongs to the engine's keydown routes alone. Every native close watcher an opted host could create is disabled.
  - Script-initiated native requests (`requestClose()`, the `request-close` command) go through the hide gate.
  - Unvetoable closes are reconciled once.
  - No `CloseWatcher` is used.
- **Focus.** `Trap` wraps focus, and `showModal()` adds exclusion on opted dialogs. The engine never writes `inert`, never uses `focusgroup`, and passes no `focusVisible`.
- **Scroll lock.** `Lock` is the one owner. The gutter is a lock policy, not CSS detection and not a `:has()` rule.
- **Transitions.** `getAnimations()` stays the only wait. There is no `@starting-style` and no view transition. Reduced motion is unchanged: Bootstrap's sheet removes the transitions and the engine has no motion branch.
- **Invoker commands.** No `--` command data API is added. It would be a second data API with button-only, id-only targets, and the measured paths duplicate lifecycles (`stage-b-measurements.md:176`).
  - The plugin seam already admits a capture route on `command` for a consumer who wants one.
  - The opted dialog host routes its own built-in commands (W1).
- **DOM APIs.**
  - `moveBefore`: refused. Bootstrap appends only nodes that are disconnected or outside `body`, and `moveBefore` throws on a disconnected node (`native-research-agent-5.md:63-64`).
  - `checkVisibility`: refused. Its results differ from Bootstrap's `isVisible` (`stage-b-measurements.md:116`).
  - `scrollIntoView({container})`: refused. Its alignment differs from the `offsetTop` delta, and the tab uses `preventScroll` (`native-research-agent-5.md:67-68`).
  - `focus({focusVisible})`: refused. Bootstrap passes no options.
  - ARIA reflection: deferred, per the W1 table.

## W3: Bootstrap umbrella inventory

The types and TSDoc land as follows. Each record shown is complete. Each leaf is an addition to the interface its comment names, and the existing members stay.

```ts
// ModalOptions gains:
/**
 * If `true`, a `<dialog>` host opens with `showModal()` in the top layer and closes with `close()`, holding `closedby="none"` while it shows so that Escape and backdrop clicks keep Bootstrap's paths, and its `command` and `cancel` events route through `show` and `hide`; if `false`, every host keeps Bootstrap's path. A host that is not a `<dialog>` keeps Bootstrap's path. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly dialog?: boolean
/**
 * If `true`, a scroll lock this modal starts reserves the scrollbar's space with `scrollbar-gutter: stable` on the root element in place of padding compensation; if `false`, it applies Bootstrap's compensation. A lock another overlay already holds keeps its first owner's policy. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly gutter?: boolean

// OffcanvasOptions gains `gutter`, worded as ModalOptions.gutter for a lock the panel starts while `scroll` is `false`.

// CollapseOptions gains, only after the B3 gate passes:
/**
 * If `true`, a vertical panel expands to its intrinsic height under `interpolate-size: allow-keywords`, which it holds while it transitions; if `false`, it expands to its measured `scrollHeight`. A horizontal panel always uses measured pixels. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly intrinsic?: boolean

// DropdownOptions, TooltipOptions, and PopoverOptions gain:
/**
 * If `true`, the open panel shows as a manual popover in the browser's top layer, stacked in the order panels open; if `false`, it stays in the ordinary layer under Bootstrap's `z-index` scale. Class `show` stays the open state. A static dropdown menu ignores this leaf. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly topmost?: boolean

/**
 * Configures the native surfaces every modal a modal plugin creates starts with.
 *
 * @remarks
 * A factory call with options replaces a plugin-built modal, so repeat the leaves there.
 *
 * @example
 * ```ts
 * const options: ModalPluginOptions = { dialog: true, gutter: true }
 * ```
 */
export interface ModalPluginOptions {
	/** If `true`, every modal the plugin creates takes `ModalOptions.dialog`; if `false`, none does. Default: `false`. */
	readonly dialog?: boolean
	/** If `true`, every modal the plugin creates takes `ModalOptions.gutter`; if `false`, none does. Default: `false`. */
	readonly gutter?: boolean
}
// OffcanvasPluginOptions { gutter }, CollapsePluginOptions { intrinsic } (gated), and DropdownPluginOptions { topmost } follow the same form.
// TipPluginOptions (from veneer-boot) gains `topmost` in the same form.

/**
 * Configures the policy a document scroll lock applies when it starts the document's acquisition.
 *
 * @example
 * ```ts
 * const options: LockOptions = { gutter: true }
 * ```
 */
export interface LockOptions {
	/** If `true`, the starting lock holds `scrollbar-gutter: stable` on the root element when it measures a scrollbar, and writes no padding; if `false`, it applies Bootstrap's compensation. A joining lock keeps the active policy. Default: `false`. */
	readonly gutter?: boolean
}
// LockInterface gains:
/** Reports the padding in CSS pixels the shared acquisition compensates: `0` under the gutter policy, otherwise `width`. */
readonly compensation: number
// LockContext gains:
/** If `true`, the first owner chose the gutter policy; if `false`, padding compensation. */
readonly gutter: boolean
// src/core/types.ts: VeneerErrorCode gains 'MODAL_OPEN'. It is thrown when a `dialog` modal's `<dialog>` host already carries `open` at `show`.
```

The following table lists every item stage B creates under the Bootstrap umbrella, with its subject, its unit, and its proof.

| Item | Subject | Unit | Proof |
| --- | --- | --- | --- |
| `dialog`, `gutter` on `ModalOptions`; `ModalPluginOptions`; `createModalPlugin(options?)` | Modal | B2 | `Modal.test.ts`, `plugins.test.ts` (leaves absent and present, frozen) |
| `gutter` on `OffcanvasOptions`; `OffcanvasPluginOptions`; `createOffcanvasPlugin(options?)` | Offcanvas | B2 | `Offcanvas.test.ts`, `plugins.test.ts` |
| `LockOptions`; `Lock(root?, options?)`; `LockInterface.compensation`; `LockContext.gutter` | Lock | B2 | `Lock.test.ts` |
| `MODAL_OPEN` code | Modal | B0 (code), B2 (throw) | `Modal.test.ts`, `tests/src/core/errors.test.ts` |
| `intrinsic`; `CollapsePluginOptions`; `createCollapsePlugin(options?)` | Collapse | B3 (gated) | `Collapse.test.ts`, `plugins.test.ts` |
| `topmost` on three options records; `DropdownPluginOptions`; `createDropdownPlugin(options?)`; `TipPluginOptions.topmost` | Dropdown, Tip | B4 | `Dropdown.test.ts`, `Tip.test.ts`, `Placement.test.ts`, `plugins.test.ts` |
| Component changes | `Modal.ts`, `Lock.ts`, `Offcanvas.ts`, `Collapse.ts`, `Dropdown.ts`, `Tip.ts`; `Placement.ts` only if B4 measures a need | B2–B4 | Family proofs |
| Guide `## Surface` rows for each added type, the `LockInterface` row, and the `## Core entry` code list | Guide | B0 | `npm run test:guides` |
| Guide `### Opt into native surfaces`: lead paragraph, a leaf table, an executed TypeScript fence, the CSS fence the harness loads, and limit paragraphs | Guide | B0 (CSS fence), B6 (prose) | `tests/guides.test.ts`; the harness loads the fence |
| `### Engine departures` lead sentence and the closing paragraph (`guides/veneer.md:667`, `:939`) | Guide | B6 | `test:guides` |
| Row families `modal-dialog` (with `:focus`, `:command`, `:close`, `:order`), `modal-gutter`, `offcanvas-gutter`, `lock-gutter`, `collapse-intrinsic`, `dropdown-topmost`, `tooltip-topmost`, `popover-topmost` (each with `:order`) | Departures | B2–B4 rows, B6 applies | Family proofs, read in both directions |
| Unchanged | Alert, Button (including `toggle.vn.button`), Carousel, Scrollspy, Tab, Toast, `createBootstrapPlugins()`, the entity factories | n/a | Stage A rows unchanged |

The proposed departure-table lead sentence is: "…between Bootstrap's JavaScript and the engine on identical markup and configuration, and under the option leaf named by a Scenario prefix's second segment."

## W4: CSS hand-offs these rulings create

The rulings create two rule groups. Both live in your stylesheet as a guide fence wrapped in `@layer reset`, and both move verbatim to `src/styles/_reset.scss` in chunk 3.

- **H1, the dialog modal reset.** `dialog.modal { margin: 0; border: 0; padding: 0; max-width: none; max-height: none; color: inherit; background: transparent }` and `dialog.modal::backdrop { background: transparent }`. Both were measured in `tmp/units/browser-feasibility-report.md:13` and `browser-stage-b-design-verdict.md:232-246`.
  - Bootstrap's sheet covers `.modal`'s position, size, and overflow, and nothing on `dialog` or `::backdrop`. Veneer adds all of H1.
  - `dialog.modal[open] { display: block }` is dropped, because the engine's inline writes at `Modal.ts:197` and `:217` decide display. B2 confirms this.
- **H2, the top-layer residue reset.** Per class: `.tooltip[popover]`, `.popover[popover]`, and `.dropdown-menu[popover]`. Each neutralizes only the user-agent `[popover]` declarations Bootstrap leaves undeclared on that class.
  - Bootstrap covers border, padding, and background on `.dropdown-menu` and `.popover`.
  - Veneer adds inset, margin, and overflow there, and the whole user-agent box on `.tooltip` (`browser-stage-b-design-verdict.md:214`). B4 measures the exact residue.
- **None** for gutter or intrinsic (the engine holds those inline), and none for `@starting-style`, `<details>`, or carousel markers (all refused).
- **Open for chunk 3.**
  - Whether `./styles` ships H1 and H2 unconditionally. H1 matches any `dialog.modal` markup; H2 matches only opted open panels.
  - Whether the face declares a root `scrollbar-gutter`, which pairs with `gutter: true`.

## Units (W5)

The precondition is that `veneer-boot` has landed (D1, D2, D4) and the tree is clean. These files are report-only for every family unit, which returns an exact patch for the Orchestrator to apply:

- `types.ts`
- `plugins.ts`
- `src/core/types.ts`
- the guide
- `tests/setup.ts`

Each unit runs this ladder: the touched file, `npm run test:src:browser`, `npm run test:guides` where the guide changes, and `npm run test:journey` before landing.

1. **B0 `native-contract`** (Claude Opus 5.5, subjective, edits only)
   - **Output:** a contract patch for `types.ts` and `src/core/types.ts`, sliced per family. Each slice lands with its family, so `main` never holds a leaf that does nothing.
   - **Also writes:** the guide Surface rows, the `## Core entry` code list, and the first version of the CSS fence under `### Opt into native surfaces`.
   - **Excluded:** `intrinsic` (left to B3).
   - **Acceptance:** each slice typechecks under `configs/src/tsconfig.browser.json` (the Orchestrator runs it), and parity is green.
2. **B1 `native-harness`** (GPT-6 Astra, objective, worktree, after B0)
   - **Owns:** the engine section of `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, and the `tests/setup.ts` family entries.
   - **Delivers:**
     - a fence loader that adopts the guide's CSS fence in both realms;
     - native readers for `:modal`, `:popover-open`, `open`, `closedby`, `popover`, and the inline `scrollbar-gutter`;
     - an `elementsFromPoint` hit-order reader;
     - capture of transient focus.
   - **Re-runs:** a raw `dialog.modal` stays hidden without the fence, as the control; and a hit-order control against a known `z-index`.
3. **B2 `native-overlay`** (Astra, worktree, after B1)
   - **Owns:** `Modal.ts`, `Lock.ts`, `Offcanvas.ts`, and their tests.
   - **Re-runs for the dialog:**
     - P12, the transparent `::backdrop` over the `div` backdrop;
     - P6, repeated Escape;
     - the focus order of `showModal()`, then `Trap`, then `close()`, against the data API's return;
     - `showModal()` on an open host;
     - hit order against a toast and a body tooltip;
     - both controls with no row;
     - the `command`, `requestClose()`, and form-submit routes;
     - destroy during opening and during closing.
   - **Re-runs for the gutter,** with a classic scrollbar:
     - `body`, `.fixed-top`, `.fixed-bottom`, and `.sticky-top`;
     - an overflowing modal's `update`;
     - an offcanvas;
     - RTL;
     - no overflow;
     - an author-declared stable gutter with the leaf set;
     - both joining orders.
4. **B3 `native-intrinsic`** (Astra, worktree, parallel with B2)
   - **Owns:** `Collapse.ts` and its test.
   - **Gate first:** a content resize during the transition. If `auto` and pixels show no difference, the unit returns "drop" and lands nothing.
   - **Then re-runs:** the 0-to-`auto` start, a reversal, reduced motion, padded and bordered panels, and accordion propagation.
5. **B4 `native-layer`** (Astra, worktree, after B2 lands)
   - **Owns:** `Dropdown.ts`, `Tip.ts`, `Placement.ts`, and `helpers.ts` for this window, with their tests.
   - **Re-runs:**
     - the user-agent residue per class under Bootstrap's sheet;
     - geometry within 1 px of Popper;
     - escape from an `overflow: hidden` ancestor;
     - RTL;
     - a float inside a dialog;
     - hit order;
     - a pixel compositing reading of a `topmost` tooltip over a `dialog` modal (`tmp/units/browser-feasibility-report.md:37`);
     - delegated children;
     - external `hidePopover()`;
     - no native open state after destroy.
6. **B5 `native-integration`** (Astra, after B2–B4)
   - **Owns:** `tests/src/browser/integration.test.ts`.
   - **Proves:** every leaf on one page, without an oracle.
7. **B6 `native-guide`** (Opus)
   - **Owns:** the prose of `guides/veneer.md` § Browser entry for stage B, `:667`, `:939`, the row patches applied, and the `ROADMAP.md:145` browser line.
8. **Close-out:** one `orkestrel-falsify` round (Opus reviewer on the Astra mechanism, Astra analyst on the Opus contract), then `verifier`.

The showcase session needs these lanes-log predictions, logged before each landing:

- **B0 through B5.** Predicted statechart rows: none. The showcase composes no stage B leaf, and `createBootstrapPlugins()` carries none.
  - The supporting reading: a grep of `app/` and `src/` for `scrollbar-gutter|interpolate-size|popover=|<dialog|showModal|commandfor` returns 0 matches.
- **B2, B3, B4 landings.** The contract additions are additive: optional parameters on `createModalPlugin`, `createOffcanvasPlugin`, `createCollapsePlugin`, and `createDropdownPlugin`, plus `TipPluginOptions.topmost`. No showcase call site migrates.
- **B1 landing.** Log the harness export names it adds.
- **Any later native specimen** in the showcase logs its tables, rows, and departures first.
- **The CSS fence** never enters the showcase, which loads Bootstrap's sheet alone (`ROADMAP.md:144`).

## Alternatives

1. **CSS and markup detection.** This is the judge's mix: gutter and intrinsic detected from CSS, `dialog` by option (`tmp/units/stage-b-design-agent-2.md:309-315`). Refused for two reasons:
   - It moves pages whose resets declare those properties off stage A without any opt-in.
   - It needs two opt-in kinds where one suffices.
2. **Plugin factories that take the full `{Entity}Options`** (`browser-stage-b-design-verdict.md:204`). Refused for three reasons:
   - It expands the plugin capability with no consumer.
   - Its typed options would override markup, where Bootstrap's `Default` sits beneath markup.
   - It carries `on` hooks into every component the plugin builds.

## Constraints

- `src/browser/helpers.ts:350-366` and `:328-340`: markup cannot set an unprojected leaf.
- `src/browser/Tip.ts:209-215`: `position` spreads into `Placement`.
- `src/browser/Modal.ts:197`, `:217`, `:55-63`, `:147-157`: the display write sites, the Escape listener, and `update`'s use of the width.
- `src/browser/Lock.ts:29-38`, `:59-88`: the width measurement and the compensation writes.
- `src/browser/Registry.ts:99-104`: a factory call with options replaces a plugin-built component.
- `src/browser/plugins.ts:114`, `:202-230`, `:374-389`: how options flow into plugins.
- `src/browser/Dropdown.ts:92-94`: the static path.
- `scaffold:.claude/rules/architecture.md:214-215`: `create{Entity}Plugin(options?)`, which registers nothing.
- `scaffold:.orkestrel/veneer/browser-convention-verdict.md:129`: stage B is built as same-named replacements.
- `ROADMAP.md:26`, `:37`, `:42`: the layer order, the layers each face writes, and the unlayered win.
- `guides/veneer.md:1144`, `:1176-1177`: the Bootstrap sheet admits no addition.

## Refusals

- **Dialog or popover resets in `src/bootstrap`:** "A value, selector, or context departure is inadmissible in the Bootstrap sheet" (`guides/veneer.md:1144`).
- **Resets in an engine-constructed sheet:** "Mechanism, not product policy. Framework code stops before application decisions" (`AGENTS.md`).
- **`createNativePlugins()` or `createBootstrapPlugins(options)`:** "A wrapper adds a boundary, invariant, composition, translation, lifecycle, or materially narrower contract, or it goes" (`AGENTS.md`).
- **A `native` option group:** "Describe what a thing is, not its implementation" (`scaffold:.claude/rules/names.md:112`).
- **A mode string such as `host: 'dialog'`:** "A binary behavioral switch is a boolean" (`AGENTS.md`).
- **Full-options plugin records:** "Create or substantively expand a capability with its first real consumer" (`AGENTS.md`).

## Measurements

**Supplied.**

- Runs M, S, T, C, X in `tmp/codex/stage-b-measurements.md:9-13`, on Chromium 153.0.8010.12.
- The D3 probe at `9885975`, 16 tests (`browser-stage-b-design-verdict.md:206-216`).
- The feasibility census and probes (`tmp/units/browser-feasibility-report.md`).
- The grep of `app/` and `src/` in this pass: 0 matches, with the pattern given under W5.

**Missing.** These are the readings named per unit in W5:

- Android Back;
- find-in-page under `until-found`;
- cross-shadow description;
- `<dialog class="offcanvas">`;
- the gate for `intrinsic`;
- the pixel compositing reading of a `topmost` tooltip over a `dialog` modal;
- the user-agent residue per floating class;
- the reset fence adopted in `@layer reset` in both realms, with the lifted and the drop-in sheet.

## Tensions

- **T1.** Explicit leaves against the judge's CSS detection, for gutter and intrinsic.
- **T2.** A top-level `topmost` against the judge's `position.popover`.
- **T3.** Static menus not promoted, against the verdict's geometry snapshot (`browser-stage-b-design-verdict.md:228`).
- **T4.** Narrow `*PluginOptions` records against full component options.
- **T5.** `MODAL_OPEN` against `MODAL_STATE`, and refusing `POPOVER_STATE` and `TIP_CONTAINER` in favor of documented limits.
- **T6.** The fence in `@layer reset`, against an unlayered fence.
- **T7.** Command and `cancel` routing bundled into `dialog`, against no invoker handling at all.
- **T8.** `LockInterface.compensation` against a `gutter` boolean.
- **T9.** `popover` present only for the open lifetime.
- **T10.** The heading `### Opt into native surfaces` against `### Use native hosts`, because `gutter` and `intrinsic` are not hosts.
- **T11.** The prefix rule renames the judge's `floating-layer:*` rows to `*-topmost`.
- **T12.** Offcanvas `dialog` deferred rather than shipped for symmetry with the modal.

## Risks

- **Opting into `dialog` sinks body-level toasts and tips beneath the dialog.** Over-correcting by reparenting them automatically would break stage A for pages that open their own native `<dialog>`.
- **A factory call with options drops a plugin's native leaves.** The guide states this.
- **The first owner decides the lock policy.** A page that sets `gutter` on only one overlay family can see its policy depend on which overlay opens first.
- **Real Tailwind loaded without Veneer's mirror** puts preflight in `base`, which outranks `reset`.
- **Over-correction elsewhere.** Promoting toasts, replacing `Trap` with `inert`, or detecting CSS would each undo a stage A contract.

## Could not decide; the user must rule

- Whether detection or explicit leaves govern the gutter and intrinsic collapse. This decides byte-for-byte equality for pages with reset lines.
- Whether `intrinsic` ships if the gate shows only a small gain.
- Whether deferring Android Back, and with it `CloseWatcher`, is acceptable.
- Whether static and navbar menus may be promoted.