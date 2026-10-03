**Lane:** subjective (API shape, names, ergonomics, guide voice). **Angle:** native first. **Baseline:** veneer `main` at `9885975`, with the `veneer-boot` shapes from `tmp/units/stage-b-design-agent-2.md:241-284` and the user's two later rulings (`toggle.vn.button` stays; no default plugins).

## Design

### The one opt-in rule

Every stage B surface opts in by one of three shapes. The test that picks the shape is whether Bootstrap's own engine works on that markup.

1. **Switch.** Use this when the native behavior changes a surface that Bootstrap already handles correctly on the same markup.
   - The switch is a typed boolean leaf on the component options. Markup never sets it.
   - The family's plugin factory takes the same leaf in `{Entity}PluginOptions` and passes it to every component the plugin builds.
   - Switches: `dialog`, `topmost`, `intrinsic`.
2. **Detection.** Use this when the author has already written a native declaration that Bootstrap's own engine contradicts on that page. The declaration is the opt-in.
   - `scrollbar-gutter: stable` on the root: Bootstrap adds padding on top of the gutter (`tmp/codex/browser-stage-b-design-verdict.md:211`).
   - `hidden="until-found"` on a `.collapse` panel: Bootstrap leaves the revealed panel `display: none` and dispatches no event (`tmp/codex/stage-b-measurements.md:133`).
3. **Plugin-only option.** Use this for a boot scan, which has no component meaning: `boot` (D1).

A page that writes no switch and none of the two declarations keeps stage A byte for byte. The tip grep found no `scrollbar-gutter`, `interpolate-size`, `until-found`, `commandfor`, `popover=`, `<dialog`, `showModal`, or `showPopover` under `src` or `app`.

This rule also answers the inconsistency the judge flagged between "the oracle defines behavior" for the dialog and "detect CSS" for the gutter (`stage-b-design-agent-2.md:167-169`).

### W1 — per subject

The rulings are add, defer (with the measurement that blocks it), or refuse (with the evidence). Each added piece's departure rows use the prefix `{family}-{switch}`. Rows carry Bootstrap's value against the engine's value.

#### Modal: add `dialog` (switch)

| Candidate | Ruling |
| --- | --- |
| `<dialog>` + `showModal()` | **Add.** Measured recipe and controls (`browser-stage-b-design-verdict.md:210`). |
| `closedby="none"` | **Add**, as part of `dialog`. It keeps Escape on the keydown path at `Modal.ts:55-63`, so the `hide.bs.modal` veto and the `prevent` hook survive (`stage-b-measurements.md:24`, `:34`). |
| `closedby="closerequest"` or `"any"` | **Refuse.** `cancel` fires with `cancelable:false` without activation, and on a repeated press after a veto (`stage-b-measurements.md:24`). |
| Built-in invoker commands `show-modal`, `close`, `request-close` | **Add**, carried by `dialog`. A command is cancelable and a veto stops the action (`stage-b-measurements.md:174`). |
| Routing `cancel` from `requestClose()` | **Add**, carried by `dialog`. A script `requestClose()` always fires a cancelable `cancel` (`native-research-agent-7.md:60`). |
| Custom `--` commands | **Refuse.** They only dispatch the event; there is no native action to gain (`stage-b-measurements.md:174`). |
| `::backdrop` in place of the `div` backdrop | **Defer.** Blocked by two gaps: no reading of a `::backdrop` exit transition through the wait, which excludes pseudo-elements (`stage-b-measurements.md:168`); and the scrim look has no home until chunk 3. |
| `inert` as the trap | **Refuse.** `inert` excludes outside controls but does not wrap Tab (`browser-feasibility-report.md:23`). |
| `html:has(dialog:modal)` lock | **Refuse.** It unlocks at `close()`, not after the transition, and `Lock` already owns the lock (`native-research-agent-8.md:66`). |
| `moveBefore` at `Modal.ts:196` | **Refuse.** The host moves before it shows, so there is no state to preserve, and a disconnected host throws (`native-research-agent-5.md:63`). |

**Shape.** `ModalOptions.dialog?: boolean` and `createModalPlugin(options?: ModalPluginOptions)`.

**Mechanics.** The dialog path runs only on a realm-aware `HTMLDialogElement` host. A `div` host with `dialog: true` stays on Bootstrap's path.
- `show()` throws `VeneerError('MODAL_DIALOG')` before it dispatches `show.bs.modal` when the host already carries `open`.
- `#open` takes a `Hold` on `closedby`, writes `none`, then calls `showModal()` where `display: block` is written (`Modal.ts:197`).
- `#close` calls `close()` where `display: none` is written (`Modal.ts:217`), then releases the hold. `destroy` closes an open host.
- The component listens on its own host, as Escape and the backdrop click already do (`Modal.ts:55-78`):
  - `command`: for `show-modal` it calls `preventDefault()` and `show(event.source)`; for `close` and `request-close` it calls `preventDefault()` and `hide()`. Every native close request therefore passes the `hide.bs.modal` veto.
  - `cancel`: it calls `preventDefault()` and `hide()`.
  - `close` that the engine did not start (an author's `dialog.close()`, or `form[method=dialog]`): it runs the hide lifecycle with a non-cancelable `hide.bs.modal`. See the W2 forced-transition rule.
- The plugin with `dialog: true` adds one capture route, `{ event: 'command', selector: 'dialog.modal' }`, with no `execute`. Its only job is to build a missing component; the component then handles the event at its own host.
- `Backdrop`, `Trap`, and `Lock` stay.
- With `focus: false`, the browser still blocks focus outside the dialog. The guide states this.
- Rename the private field `#dialog` to `#content` (`Modal.ts:18`).

**Rows (`modal-dialog`), consumed by `Modal.test.ts`:**
- `$::open`: `<absent>` against `""`.
- `$::closedby`: `<absent>` against `none`.
- `$::modal`: `false` against `true`.
- `$::focus` while showing: the opener against the first focusable child, because Chromium 153 runs the legacy focusing path (`stage-b-measurements.md:57`).
- `$::focus` after Tab from the last control (the Tab limit).
- `$::hit` against a `body` toast and a `body` tooltip.
- `modal-dialog:focus-off`: outside focus succeeds against outside focus refused.
- `modal-dialog:command`: Bootstrap opens the dialog natively with no `.show` and no events; the engine runs the full lifecycle.
- `modal-dialog:cancel`: Bootstrap's native dialog closes while `.show` stays (`stage-b-measurements.md:34`); the engine runs the hide gate.

**CSS:** your stylesheet, through the executed fence in `### Use native hosts`.

#### Offcanvas: gutter detection only (through `Lock`)

| Candidate | Ruling |
| --- | --- |
| `<dialog class="offcanvas">` | **Defer.** No reading exists of the closed UA `display: none` against the in-flow `.offcanvas-lg` variants, of `show()` with `scroll: true`, or of focus order. |
| `popover="manual"` (top layer) | **Defer.** Same blocker as the dialog host: the responsive in-flow variants. Top layer was refused for these in stage A (`browser-design-verdict.md:39`). |
| `popover="auto"` | **Refuse.** Native close leaves `.show` set (`stage-b-measurements.md:33`). |
| `CloseWatcher` | **Defer.** See W2. |

**Rows:** `lock-gutter` cases in `Offcanvas.test.ts`.

#### Lock and Hold: add gutter detection

| Candidate | Ruling |
| --- | --- |
| Follow an author `scrollbar-gutter: stable` | **Add** (detection). Measured: 15 px scrollbar, widths kept, and Bootstrap still pads 15 px under a stable gutter (`browser-stage-b-design-verdict.md:211`). |
| The engine writes the gutter itself (the objective lane's `gutter` option) | **Refuse.** It writes root layout policy the author did not declare, and the first owner fixes the policy, so layout depends on open order (`browser-stage-b-design-verdict.md:222`). |
| `overscroll-behavior: contain` | **Refuse.** The page still scrolls over an exposed backdrop (`stage-b-measurements.md:72`). |

**Shape.** No option.
- `LockInterface` gains `compensation`. `width` keeps its documented meaning, the measured scrollbar width (`types.ts:2218`).
- `LockContext` gains `gutter`.
- `Lock` reads the computed `scrollbar-gutter` on `documentElement` before its first write. Bootstrap's algorithm then runs with `compensation` in place of `width` at `Lock.ts:59-87`, including the skip test at `:69` and `:80`.
- `Modal.update` reads `compensation` (`Modal.ts:151`).
- `Hold`'s algorithm is unchanged. Its slots under stage B are the `closedby`, `popover`, and `hidden` attributes and the `interpolate-size` style.

**Rows (`lock-gutter`):** `body::padding-right`, `body::data-bs-padding-right`, `.fixed-top` and `.fixed-bottom` padding, `.sticky-top` margin, and the `Modal.update` padding. Consumed by `Lock.test.ts`, `Modal.test.ts`, and `Offcanvas.test.ts`.

#### Collapse and accordions: add `intrinsic` (switch) and findable panels (detection)

| Candidate | Ruling |
| --- | --- |
| `interpolate-size` vertical | **Add, conditional.** Both paths reach 120 px over 350 ms (`browser-stage-b-design-verdict.md:212`). The only gain is following content that changes during the transition. Drop the piece if that reading shows no difference. |
| `interpolate-size` horizontal | **Refuse.** Auto width finished at 300 px while `scrollWidth` was 120 (`native-inventory-1.md:47`). |
| `hidden="until-found"` + `beforematch` | **Add** (detection). Fragment navigation fires `beforematch` and removes `hidden`; Bootstrap leaves the panel `display: none` with no events (`stage-b-measurements.md:133`). Content becomes findable, which is better platform behavior. |
| `<details>`, exclusive `name` | **Refuse.** One internal trigger only; `toggle` is not cancelable; no completion signal (`stage-b-measurements.md:135-137`). |
| Custom `--` commands | **Refuse.** As for Modal. |

**`intrinsic` shape.** `CollapseOptions.intrinsic?: boolean` and `createCollapsePlugin(options?: CollapsePluginOptions)`. The plugin passes `{ toggle: false, intrinsic }` (`plugins.ts:114`).

**`intrinsic` mechanics.**
- The engine takes a `Hold` on `interpolate-size: allow-keywords` for the transition. This is a mechanism write, so no CSS is needed.
- Show writes `0px`, calls `reflow` in place of the `scrollHeight` flush (`Collapse.ts:126-127`), then writes `auto`.
- Hide is unchanged (`Collapse.ts:140-153`).
- The phase derivation at `:92` holds, because `auto` is non-empty.
- Accordion siblings that this instance builds inherit `intrinsic`.

**`intrinsic` rows (`collapse-intrinsic`):** `panel::writes.height`, `120px` against `auto`; `panel::interpolate-size`, `<absent>` against `allow-keywords`.

**Findable mechanics.**
- At construction, a panel carrying `hidden="until-found"` takes a `Hold` on `hidden`.
- `show()` removes `hidden` first. Hide writes `until-found` again at completion.
- `beforematch` on the host runs show with a non-cancelable `show.bs.collapse`. Accordion siblings hide through their usual cancelable hide.
- The collapse plugin declares a capture route `{ event: 'beforematch', selector: '.collapse' }` with no `execute`. It builds a missing component, which handles the event in the target phase.
- `destroy` restores the markup's `until-found`.

**Findable rows (`collapse-findable`):** `:show` `$::hidden`, `until-found` against `<absent>`; `:reveal` `$::classes` and the event list (no events against `show` with `cancelable:false`, then `shown`); the trigger's `aria-expanded`. Consumed by `Collapse.test.ts`.

**CSS:** the findable rule goes in your stylesheet fence, because reboot's `[hidden]{display:none!important}` defeats `until-found` (`native-research-agent-2.md:58`).

#### Dropdown: add `topmost` (switch, dynamic path only)

| Candidate | Ruling |
| --- | --- |
| `popover="manual"` top layer | **Add.** Measured with explicit promotion; the native lifetime must be wired in (`browser-stage-b-design-verdict.md:213`). |
| `popover="auto"` | **Refuse.** Veto lost (`stage-b-measurements.md:32`); `inside` and `outside` cannot be expressed. |
| Popover invoker commands | **Defer.** The command targets the menu while the component's host is the toggle, and no reading exists of a command on a menu whose `popover` attribute the engine writes only while the menu shows. |
| `focusgroup="menu"` | **Refuse.** It handles arrows twice alongside the keydown route (`plugins.ts:141-173`). |
| `CloseWatcher` | **Defer.** See W2. |

**Shape.** `DropdownOptions.topmost?: boolean` and `createDropdownPlugin(options?: DropdownPluginOptions)`.

**Mechanics.**
- After `show.bs.dropdown` passes and the classes are written, the engine takes a `Hold` on `popover`, writes `manual`, calls `showPopover({ source: toggle })`, then places the menu.
- After the synchronous hide, it calls `hidePopover()` and releases the hold.
- `.show` stays the authority.
- The static path (navbar, or `display: 'static'`, `Dropdown.ts:91-94`) ignores `topmost`. A navbar menu is in flow, and the top layer would pull it out.

**Rows (`dropdown-topmost`):** `menu::popover`, `menu::popover-open`, and `$::hit` order against the z-index scale, including the order after reopening.

#### Tooltip and Popover: add `topmost` (switch)

| Candidate | Ruling |
| --- | --- |
| `popover="manual"` | **Add.** A raw promotion fails; the neutralized recipe matches Popper within 0.141 px (`browser-stage-b-design-verdict.md:214`). |
| `popover="hint"` | **Refuse.** Escape and light dismiss close it without a veto. Opening another hint closes an earlier one, while Bootstrap keeps two tooltips open (`stage-b-measurements.md:23`, `:47`). |
| `interestfor` | **Defer.** The interest target must exist before interest begins, while Bootstrap generates the tip after `show.bs` (`Tip.ts:202`). No reading of a positive `delay` against `interest-delay`. `::interest-button` is experimental (`native-research-agent-9.md:66`). |
| ARIA element reflection | **Refuse.** The setter writes `aria-describedby=""` (`stage-b-measurements.md:119`), which breaks the per-owner token list (`browser-convention-verdict.md:136`). |

**Shape.** `TooltipOptions.topmost` and `PopoverOptions.topmost`. `TipPluginOptions` gains `topmost` beside `boot`. A delegated child inherits it as a non-default leaf (`browser-convention-verdict.md:141`).

**Mechanics.**
- After `inserted` and before placement (`Tip.ts:202-209`), the engine writes `popover="manual"` on the generated panel and calls `showPopover({ source: trigger })`.
- The panel stays promoted through its fade and leaves the top layer at hide completion.
- When `container` is absent and the trigger sits inside an open `dialog:modal`, the container resolves to that dialog. A body panel would be inert outside the modal (`browser-feasibility-report.md:37`).
- An explicit `container` wins.
- A page that cancels `beforetoggle` on the panel leaves it in the ordinary layer, and the show proceeds.

**Rows (`tooltip-topmost`, `popover-topmost`):** `panel::popover-open`, `$::hit` order, and `panel::parent` (`body` against the dialog under a native modal).

#### Alert, Button, Carousel with `Swipe`, Scrollspy, Tab, Toast: nothing added

| Subject | Candidate | Ruling |
| --- | --- | --- |
| Alert | Popover; `--close`; `ariaNotify`; `@starting-style` | **Refuse.** In-flow node removal (`native-research-agent-6.md:48`); custom command only dispatches; `ariaNotify` duplicates the author's live region, and no announcement was proved (`stage-b-measurements.md:103`); equal motion (`browser-design-verdict.md:12`). |
| Button | Native pressed toggle; checkbox `switch`; commands | **Refuse.** HTML has none; `switch` is not in 153 (`native-research-agent-6.md:28-30`). |
| Carousel | View Transitions; scroll markers and buttons; scroll timelines | **Refuse.** They emit no `slide` or `slid` and write no `.active` (`stage-b-measurements.md:147`); the transition clock is independent, and reduced motion is not honored (`:166-168`). `Swipe` already uses Pointer Events. |
| Scrollspy | `scroll-target-group`, `:target-current` | **Refuse.** No event and no class (`native-research-agent-2.md:104`). |
| Scrollspy | `scrollIntoView({ container })` | **Defer.** Only containment was measured (`stage-b-measurements.md:117`), not equality with Bootstrap's `offsetTop` delta or `scroll-margin`. |
| Tab | `hidden="until-found"` panes | **Defer.** No reading against `.tab-content > .tab-pane` and `.fade`. |
| Tab | `focusgroup` | **Refuse.** Bootstrap's `tabindex="-1"` drops inactive tabs from it, and scripted keys already move focus (`native-research-agent-2.md:162`). |
| Toast | Top layer | **Defer.** A body toast stays inert under a modal (`stage-b-measurements.md:105`); pixel compositing is unproved; no container geometry was read. |
| Toast | `ariaNotify` | **Refuse.** As for Alert. |

#### Backdrop, Trap, Placement, transition wait, boot scope

- **`Backdrop`:** unchanged. The `div` sits beneath the dialog, with a transparent `::backdrop` over it (reading P12 required).
- **`Trap`:** unchanged and still the only wrapper. `inert`, `focusgroup`, and `focus({ focusVisible })` are refused. Only "true matches" was measured (`stage-b-measurements.md:118`), with no gain against Bootstrap's heuristic.
- **`Placement`:** no public change. Promotion is a separate lifetime owned by Dropdown and Tip. `anchored` container queries, `position-visibility`, and `anchor-scope` are refused, because the stage A mechanism is proven within 1 px (`guides/veneer.md:604`).
- **Transition wait:** unchanged (W2).
- **Boot scope:** gains a `command` capture route (modal with `dialog`) and a `beforematch` capture route (collapse). Neither has an `execute`. `CloseWatcher` and `interest` are refused or deferred (W2).

### W2 — cross-cutting

**Top-layer order.**
- Bootstrap's z-index scale governs the ordinary layer.
- Only switched surfaces enter the top layer (`dialog`, `topmost`), and insertion order governs them.
- The engine never reopens a panel to imitate z-index (`browser-stage-b-design-verdict.md:216`).
- Under `dialog`, ordinary-layer tips and toasts sit beneath the open modal. The guide pairs `dialog` with `topmost` tips and states the toast limit.

**Close requests: one model.**
- The engine's keydown routes are the only close-request path.
- Engine dialogs hold `closedby="none"` and floating panels are `manual`, so no native watcher acts on them.
- Native requests that bypass keydown (`cancel`, `close`, `request-close`) enter the hide gate.
- **Forced-transition rule:** when the browser has already changed native state (a `beforematch` reveal, an author `dialog.close()`, `form[method=dialog]`), the engine reconciles through its normal lifecycle and dispatches the before-event with `cancelable:false`.
- `CloseWatcher` is deferred. It would add only Android Back, which was not measured. On desktop the keydown path keeps every veto (`stage-b-measurements.md:26`, `:39`), while watcher `cancel` is not cancelable without activation (`:180-183`).

**Focus.** `Trap` wraps. `showModal()` adds native outside exclusion as a `modal-dialog` row. The engine writes no `inert` and no `focusgroup`, and passes no `focusVisible`.

**Scroll lock.** `Lock` is the only owner, and it follows a declared gutter.

**Transitions.**
- `awaitTransition` stays the only wait, and the `reflow` sites stay.
- No `@starting-style`, View Transitions, or `finished`-based rewrite in the engine.
- Reduced motion stays a sheet concern; the wait resolves at once when there is no transition.
- `topmost` panels leave the top layer after their fade, so no `overlay` transition is needed.

**Invoker commands.**
- Only the built-in dialog commands, on `dialog` modals.
- `data-bs-*` routes are unchanged and run first. On a button carrying both, the click route shows the modal, and the later command finds it visible: `preventDefault()` stops the native action and `show` does nothing.

**DOM APIs.**
- `moveBefore`, ARIA reflection, and `focusVisible`: refused (W1).
- `checkVisibility`: refused. `isVisible` is a stage A predicate shared by every plugin, and the measured differences (`stage-b-measurements.md:116`) would change pages that never opted in.
- `scrollIntoView({ container })`: deferred (W1).

### W3 — the Bootstrap umbrella inventory

The declarations as they would land:

```ts
// ModalOptions gains:
/**
 * If `true`, a `<dialog>` host opens with `showModal()` in the top layer, holds `closedby="none"` while open, and sends the browser's close requests and invoker commands through the modal's hide gate; a `div` host keeps Bootstrap's path. If `false`, every host keeps Bootstrap's path. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly dialog?: boolean

// DropdownOptions gains:
/**
 * If `true`, the dynamic menu enters the top layer as a manual popover while it shows; if `false`, it stays in the ordinary layer. A static menu, in a navbar or under `position.display: 'static'`, stays in the ordinary layer either way. Requires the native-host CSS. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly topmost?: boolean

// TooltipOptions and PopoverOptions gain:
/**
 * If `true`, the tip enters the top layer as a manual popover from insertion until its hide completes, and an absent `container` resolves to the trigger's open modal dialog when it has one; if `false`, the tip stays in the ordinary layer. Requires the native-host CSS. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly topmost?: boolean

// CollapseOptions gains:
/**
 * If `true`, a vertical panel transitions its height to `auto` under an engine-held `interpolate-size: allow-keywords`, so the height follows content that changes during the transition; if `false`, it transitions measured pixels. A horizontal panel always transitions measured pixels.
 *
 * Default: `false`.
 */
readonly intrinsic?: boolean

// LockInterface gains:
/** Reports the padding the shared lock writes: `0` when the root element's computed `scrollbar-gutter` begins with `stable`, read at the first acquisition while locked, otherwise `width`. */
readonly compensation: number

// LockContext gains:
/** If true, the root declared a stable scrollbar gutter at the first acquisition and the lock writes no compensation; if false, it compensates by the measured width. */
readonly gutter: boolean

/**
 * Configures the modal plugin at creation.
 *
 * @example
 * ```ts
 * const options: ModalPluginOptions = { dialog: true }
 * ```
 */
export interface ModalPluginOptions {
	/** If `true`, every modal the plugin creates takes `ModalOptions.dialog` and the plugin routes invoker commands aimed at a `<dialog class="modal">`; if `false`, it creates modals on Bootstrap's path and routes no command. Default: `false`. */
	readonly dialog?: boolean
}
// DropdownPluginOptions { topmost? }, CollapsePluginOptions { intrinsic? }, and TipPluginOptions { boot?, topmost? } follow the same form.

// src/core/types.ts, VeneerErrorCode gains:
| 'MODAL_DIALOG' // Thrown when a dialog host refuses showModal(): already open, or rejected by the browser; cause in context.
| 'TOPMOST_PANEL' // Thrown when a topmost panel cannot enter the top layer; cause in context.
```

| Item | Subject | Unit | Proof |
| --- | --- | --- | --- |
| `dialog`, `ModalPluginOptions`, `createModalPlugin(options?)`, `command` route, `MODAL_DIALOG` | Modal | B0 types, B2 wiring, B3 behavior | `plugins.test.ts` (route present only under `dialog`); `Modal.test.ts` `modal-dialog` rows plus two row-free controls (same dialog host without the option; `dialog: true` on a `div`) |
| `compensation`, `LockContext.gutter` | Lock, Modal, Offcanvas | B0, B3 | `Lock.test.ts`, `Modal.test.ts`, `Offcanvas.test.ts` `lock-gutter`; control: no declared gutter, no row |
| `intrinsic`, `CollapsePluginOptions`, `createCollapsePlugin(options?)` | Collapse | B0, B2, B4 | `Collapse.test.ts` `collapse-intrinsic`; horizontal and unswitched controls |
| findable detection, `beforematch` route | Collapse | B2, B4 | `Collapse.test.ts` `collapse-findable`; control: ordinary `hidden` fires no `beforematch` |
| `topmost` on Dropdown, Tooltip, Popover; `DropdownPluginOptions`; `TipPluginOptions.topmost`; `TOPMOST_PANEL` | Dropdown, Tip | B0, B2, B5 | `Dropdown.test.ts`, `Tip.test.ts` `*-topmost`; static-path and unswitched controls |
| Guide `### Use native hosts`: prose, executed TS fence, executed CSS fence, limits | all | B7 | `tests/guides.test.ts` runs the TS fence; the family proofs load the CSS fence in both realms |
| `### Engine departures` lead sentence: "on identical markup and configuration, or under the opt-in piece its Scenario prefix names"; seven row families | all | B7 applies the family patches | `readDepartures` read in both directions per family |
| Surface rows for the four plugin option types and the `compensation` text | all | B7 | `npm run test:guides` parity |

TS fence:

```ts
import {
	createBootstrapPlugins,
	createCollapsePlugin,
	createDropdownPlugin,
	createModalPlugin,
	createPopoverPlugin,
	createTooltipPlugin,
	createVeneer,
} from '@orkestrel/veneer/browser'

const veneer = createVeneer(document, {
	plugins: [
		...createBootstrapPlugins(),
		createCollapsePlugin({ intrinsic: true }),
		createDropdownPlugin({ topmost: true }),
		createModalPlugin({ dialog: true }),
		createPopoverPlugin({ topmost: true }),
		createTooltipPlugin({ topmost: true }),
	],
})
veneer.destroy()
```

CSS fence. The `topmost` values are pending the UA residue reading:

```css
dialog.modal { margin: 0; border: 0; padding: 0; max-width: none; max-height: none; color: inherit; background: transparent; }
dialog.modal[open] { display: block; }
dialog.modal::backdrop { background: transparent; }
.dropdown-menu[popover], .tooltip[popover], .popover[popover] { inset: auto; overflow: visible; }
.tooltip[popover] { border: 0; padding: 0; background: transparent; }
.popover[popover] { padding: 0; }
.collapse[hidden='until-found' i] { display: block !important; }
```

### W4 — CSS hand-offs these rulings create

Bootstrap's sheet already covers the `.modal` geometry, the `.modal-backdrop` look, and the `.dropdown-menu`, `.tooltip`, and `.popover` skins. Veneer must add the following.

1. **Dialog reset, `[open]` display, transparent `::backdrop`:** a `surfaces/` partial (it styles UA pieces).
2. **`[popover]` reset for the three floating roots:** a `surfaces/` partial.
3. **The `until-found` display override:** a `surfaces/` attribute-API rule. It needs `!important` to beat reboot, so it depends on the open decision of where this face places `!important` (`veneer-remainder-3.md:45`).
4. **Decision: a root `scrollbar-gutter: stable` in Veneer `reset`.** Elements shipped one on `:root` (`elements-engine-1.md:30`). Shipping it switches every page that loads Veneer styles to zero lock compensation.
5. **Not created by these rulings, but blocking the deferred pieces:** a `dialog.modal::backdrop` scrim skin (to retire the `div` backdrop later) and a `.toast-container[popover]` reset.

`intrinsic` and the gutter create no stylesheet work, because the engine holds `interpolate-size` inline and the author declares the gutter.

## Alternatives

1. **Typed options everywhere, with the engine writing the gutter** (`browser-stage-b-design-verdict.md:173-202`). Refused for the gutter: it imposes root layout policy, and the policy depends on which owner acquires first. The other three switches match that verdict.
2. **Markup or CSS detection everywhere** (`stage-b-design-agent-0.md:192-199`). Refused: it moves working Bootstrap markup (`<dialog class="modal">`) into the top layer without being asked, and the sanitizer strips `popover` from tip templates (`stage-b-design-agent-2.md:156-159`).

## Constraints

- `scaffold/.claude/rules/architecture.md:214-216`: `create{Entity}Plugin(options?)`; a plugin factory never registers anything.
- `scaffold/.orkestrel/veneer/browser-convention-verdict.md:129`: stage B is built as same-named replacements.
- `guides/veneer.md:1144` and `:1176-1177`: the Bootstrap face takes no addition.
- `guides/veneer.md:596`: every `.bs.` event is cancelable. The forced-transition rule departs from this, and rows record it.
- `src/browser/Modal.ts:55-63`, `:196-197`, `:217`; `Lock.ts:29-38`, `:69`; `Collapse.ts:92`, `:124-127`; `Tip.ts:202`; `Dropdown.ts:91-94`.
- `src/browser/types.ts:2218`: `width` is documented as the measured scrollbar width.
- `src/core/types.ts:55-62`: the error code union.

## Refusals

- **A full `ModalOptions` record (or any full component options) as plugin defaults.** AGENTS.md: "Create or substantively expand a capability with its first real consumer." Such a record would also need a merge slot beneath markup.
- **A `createNativePlugins()` collection.** AGENTS.md: "A wrapper adds a boundary, invariant, composition, translation, lifecycle, or materially narrower contract, or it goes."
- **Native rules in `src/bootstrap`.** "A value, selector, or context departure is inadmissible in the Bootstrap sheet" (`guides/veneer.md:1144`).
- **An engine-constructed native stylesheet.** AGENTS.md: "Mechanism, not product policy."
- **ARIA element reflection on the tips.** "A list slot takes per-owner tokens and stores no original" (`browser-convention-verdict.md:151`).

## Measurements

**Supplied:** `stage-b-measurements.md` §1–10; `browser-stage-b-design-verdict.md:210-216`; `browser-feasibility-report.md`.

**Missing**, each owned by a unit in Units:
- P12, and P6 repeated under `closedby="none"`.
- Focus order: `showModal()`, then `Trap`, then `close()`.
- `showModal()` on an open host.
- Commands mixed with `data-bs-*` on the engine.
- A listener added during capture firing at the target, read against a control.
- The gutter under a classic scrollbar for fixed, sticky, `update`, offcanvas, RTL, and `both-edges`.
- Intrinsic collapse with content resizing mid-transition (this reading decides whether the piece ships).
- Fragment-navigation reveal: scroll position under the animated show, and a padded panel.
- `[popover]` UA residue on the three floating roots.
- Floating geometry within 1 px, inside a `transform` or `overflow` ancestor, and inside a native dialog.
- Android Back.

## Units

These start after `veneer-boot` lands. Report-only files are returned as patches the Orchestrator applies: `types.ts` (after B0), the guide, and `tests/setup.ts` (after B1).

1. **B0 `stage-b-contract`** (Claude Opus 5.5, edits only)
   - Owns: `src/browser/types.ts`, `src/core/types.ts`.
   - Accept: the browser-scope `tsc` exits 0.
2. **B1 `stage-b-harness`** (GPT-6 Astra, parallel with B2)
   - Owns: `tests/setupBrowser.ts` (engine section), `setupBrowser.test.ts`, `tests/setup.ts`, `setup.test.ts`.
   - Adds readers for `open`, `:modal`, `:popover-open`, `closedby`, top-layer hit order, and the AX modal state, each with a control. Adds a fragment-navigation driver and the fence loader for both realms.
   - Re-runs: P12, recipe equality.
3. **B2 `stage-b-wiring`** (Astra)
   - Owns: `plugins.ts`, `constants.ts`, `validators.ts` (realm-aware dialog guard), `helpers.ts`, and their tests.
   - Re-runs: the capture-listener control.
4. **B3 `native-overlays`** (Astra, worktree)
   - Owns: `Modal.ts`, `Lock.ts`, `Modal.test.ts`, `Lock.test.ts`, `Offcanvas.test.ts`.
   - Re-runs: every dialog and gutter reading in Measurements.
5. **B4 `native-collapse`** (Astra, worktree, parallel with B3)
   - Owns: `Collapse.ts`, `Collapse.test.ts`.
   - Re-runs: the intrinsic and findable readings. Drops `intrinsic` on a null result.
6. **B5 `native-floating`** (Astra, after B3)
   - Owns: `Dropdown.ts`, `Tip.ts`, `Placement.ts`, and their tests.
   - Re-runs: residue, geometry, and hit order.
7. **B6 `native-integration`** (Astra)
   - Owns: `tests/src/browser/integration.test.ts`.
   - Proves all pieces on one page, plus an unchanged Bootstrap-only control page.
8. **B7 `native-guide`** (Opus)
   - Owns: the `### Use native hosts` section, applying the row patches, the Surface rows, and the `ROADMAP.md` stage B lines.
9. **Close-out:** one `orkestrel-falsify` round, then `verifier`.

**Lanes-log entries before B2, B3, B4, and B5 land:**
- Predicted statechart rows: none.
- The showcase writes `div.modal` and declares no gutter, `until-found`, `commandfor`, or `topmost`.
- The collapse plugin's `beforematch` route fires on no showcase page.
- Name the `collapse`, `accordion`, `modal`, and `offcanvas` rows as regression-sensitive (`browser-stage-b-design-verdict.md:296-304`).

## Tensions

1. **Forced native transitions dispatch the before-event with `cancelable:false`**, against `guides/veneer.md:596`. The alternatives are to dispatch it cancelable and ignore a veto, or to suppress it.
2. **The `beforematch` route is unconditional inside `createCollapsePlugin()`**, against gating it behind a plugin option.
3. **`compensation` is added and `width` keeps its meaning**, against the judge's redefinition of `width` (`stage-b-design-agent-2.md:309`).
4. **`intrinsic` is a switch and the engine holds `interpolate-size`**, against the judge's CSS detection (`:313`).
5. **The `topmost` container resolves to the open modal dialog**, against the objective lane's `TIP_CONTAINER` throw.
6. **Invoker commands are carried by `dialog`**, against a separate `command` switch.
7. **A static dropdown ignores `topmost`**, against the objective lane's geometry-snapshot obligation (`browser-stage-b-design-verdict.md:228`).
8. **Whether `TOPMOST_PANEL` is needed at all.**
9. **For the user:**
   - Accept the deferrals: offcanvas dialog and top layer, toast top layer, `interestfor`, `CloseWatcher` and Back, tab `until-found`, `scrollIntoView`, and the `::backdrop` scrim.
   - Rule on the gutter in Veneer `reset` (W4 item 4).
   - Rule on `!important` placement for the findable rule (W4 item 3).

## Risks

- Under `dialog`, toasts sit beneath the modal and are inert. The guide must say so, or migrating pages lose their toasts.
- A factory call with options replaces a plugin-built component and drops a switch unless it passes the switch again.
- A common reset that declares `scrollbar-gutter: stable` switches the lock silently. The visual result is equal, and the gutter rows record the change.
- Over-correction to watch for:
  - Replacing `Trap` with `inert` breaks Tab wrapping.
  - Using `auto` or `hint` popovers loses the hide vetoes.
  - Promoting the static navbar menu pulls it out of flow.
  - Swapping `isVisible` for `checkVisibility` changes pages that never opted in.
  - Converting showcase specimens to native hosts moves journey rows.