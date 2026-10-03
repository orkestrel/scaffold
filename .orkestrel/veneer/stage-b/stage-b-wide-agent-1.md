# Browser stage B design: subjective lane (API shape, names, ergonomics, guide voice)

**Lane: subjective.** I worked from Bootstrap parity outward. Code citations are at the veneer tip as I read it, and the brief names it `9885975`. Where a deferred surface needs a shape later, this document designs it but does not land it.

## Design

Stage B adds two native surfaces, defers five behind named measurements, and refuses the rest with evidence.

- **Added: `<dialog>` modal hosting.** You opt in with `ModalOptions.dialog` or `createModalPlugin({ dialog: true })`.
- **Added: the reserved-gutter lock.** When the root's computed `scrollbar-gutter` begins with `stable`, `Lock` adds no compensation.
- **Deferred, each with its blocking measurement:**
  - top-layer floating panels (the `popover` leaf);
  - intrinsic vertical collapse (the `intrinsic` leaf);
  - `<dialog>` offcanvas hosting;
  - `hidden="until-found"` reveal;
  - custom `--` invoker command routes.
- **Opt-in rule, the same for every subject.** A native-host leaf is a top-level boolean on the component options, named for the platform feature or size model it adopts (`dialog`, `popover`, `intrinsic`).
  - A `{Entity}PluginOptions` record carries the same leaf. The plugin factory takes that record and passes it to every component its `create` builds.
  - Markup never sets a native leaf.
  - **The one exception is the scroll lock.** It is shared by every overlay in the document, so a per-component leaf cannot choose its policy. The Codex verdict had to invent first-owner precedence to make one work (`tmp/codex/browser-stage-b-design-verdict.md:222`). Its opt-in is the root's own computed declaration.
  - This also gives the record the reason the judge asked for (`tmp/units/stage-b-design-agent-2.md:167-170`). Under a declared stable gutter, Bootstrap's own writes are a measured defect: 15 px of extra body padding (`tmp/codex/browser-stage-b-design-verdict.md:211`). On `<dialog>` markup, Bootstrap works correctly in the document layer.
- **Pages that never opt in keep stage A byte for byte.** That covers a page with no native leaf and no stable gutter declared on `html`.

---

## W1: per subject

Each table rules on every candidate the inventories and research name. "W2" means the cross-cutting ruling in W2 decides it.

### Alert

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `@starting-style`, `allow-discrete` | Refuse | Close removes `show` with no display flip, so a starting style has no entry to establish (`tmp/units/native-inventory-1.md:12`). The stage A refusal stands (`scaffold/.orkestrel/veneer/browser-design-verdict.md:12`). |
| Popover API host | Refuse | The alert is in-flow, and `closed.bs.alert` fires on the removed node. A closing `beforetoggle` cannot be cancelled (`tmp/codex/stage-b-measurements.md:23`), while `close.bs.alert` can (`tmp/units/native-research-agent-6.md:48`). |
| `ariaNotify` | Refuse | Bootstrap writes no role and makes no announcement. It would duplicate the markup's live region (`tmp/units/native-research-agent-6.md:44`). Only an accessibility-tree change was measured, not speech (`tmp/codex/stage-b-measurements.md:103`). |
| `--` invoker command | Defer (W2) | |
| `CloseWatcher`, `inert`, `focusgroup`, and the rest | Refuse | The alert has no Escape path, no focus move, and no size tween (`tmp/units/native-inventory-1.md:15`). |

### Button

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| Native pressed toggle | Refuse | HTML has none, and `input type=checkbox switch` is not in Chromium 153 (`tmp/units/native-research-agent-6.md:28-30`). |
| Invoker commands | W2 | |
| `toggle.vn.button` | Unchanged | User ruling 5 (`scaffold/.orkestrel/veneer/browser-design-verdict.md:76`). |

### Carousel and `Swipe`

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| View Transitions | Refuse | The transition's completion runs on its own clock, apart from `slid`. Under reduced motion its 250 ms pseudo-element animations remain (`tmp/codex/stage-b-measurements.md:159-166`). |
| Scroll snap, `::scroll-marker`, `::scroll-button`, `scroll-target-group` | Refuse | The generated controls emit no `slide` or `slid` and write no `active` or `aria-current` (`tmp/codex/stage-b-measurements.md:147`). They also change the markup. |
| `scrollsnapchange`, `scrollend` | Refuse | They cannot veto, and they carry no class contract (`tmp/units/native-research-agent-2.md:118`). |
| Scroll-driven animations, scroll-state queries | Refuse | No contract to carry (`tmp/units/native-research-agent-0.md:121-123`). |
| Pointer events, `getAnimations`, `Animation.finish()` | Kept | Stage A. |

### Collapse and accordions

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `interpolate-size`, `calc-size()` | **Defer** | **Gate:** content that resizes mid-transition must show a difference between the measured-pixel path and the `auto` path. No reading exists; the measured motion was equal, transition end at about 368 ms against 349 ms (`tmp/units/browser-feasibility-report.md:21`). This is the judge's own drop condition (`tmp/units/stage-b-design-agent-2.md:315`). When it returns, the shape is `CollapseOptions.intrinsic` plus `CollapsePluginOptions { intrinsic? }`, never detection: chunk 3 reuses `html-interpolate` (`tmp/units/veneer-remainder-3.md:34`), so detection would switch collapse on for every page that loads `./styles`. |
| `<details>`, `name`, `::details-content` | Refuse | `toggle` cannot be cancelled, and the sibling closes despite a veto. During the details animation `getAnimations` returned nothing and no transition events reached the host, so a wait has nothing to complete on (`tmp/codex/stage-b-measurements.md:135-139`). |
| `hidden="until-found"`, `beforematch` | **Defer** | **Gate:** fragment and find-in-page reveal of a `.collapse` panel under a recipe that keeps closed content at `content-visibility: hidden` and beats Bootstrap's `[hidden]{display:none!important}`, followed by `show()` (`tmp/codex/stage-b-measurements.md:133`; open item at `:139`). |
| Invoker commands | W2 | |

### Dropdown

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `popover="manual"` top layer | **Defer** | See the floating gate after these tables. |
| `popover="auto"` | Refuse | The close veto is lost (`tmp/codex/stage-b-measurements.md:23`, `:32`). `inside` and `outside` cannot be expressed (`scaffold/.orkestrel/veneer/browser-design-verdict.md:12`). |
| `CloseWatcher` | Refuse | Grouping makes `cancel` uncancellable (`tmp/codex/stage-b-measurements.md:180-183`). Bootstrap's keydown route already keeps the veto (`:32`). |
| `focusgroup` | Refuse | It changes the tab stops to one guaranteed stop with memory. Only ArrowRight on a toolbar was measured (`tmp/codex/stage-b-measurements.md:49`, open at `:61`; `tmp/units/native-research-agent-2.md:151-158`). |
| `position-visibility` | Refuse as an addition | Popper's `hide` modifier writes attributes Bootstrap's sheet never reads. This raises a stage A risk (W2). |
| `showPopover({ source })` implicit anchor | Refuse | `anchor()` edges need the explicit pair (`tmp/units/elements-engine-1.md:10`). Source-only geometry is unmeasured (`tmp/units/native-inventory-2.md:110`). |
| `anchor-scope`, `position-try-order`, anchored container queries | Refuse | Anchor names are already unique, and the inline arrow is measured within 1 px (`guides/veneer.md:604`). Bootstrap's arrow CSS keys on the side class (`tmp/units/native-research-agent-1.md:164-165`). |

### Modal: added (details follow these tables)

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `<dialog>` with `showModal()` and `closedby` | **Add** (leaf) | The dialog excludes nodes outside it from the accessibility tree, which is the gain (`tmp/codex/stage-b-measurements.md:93`). Under `closedby="none"`, Escape reaches the keydown path with no `cancel` (`tmp/codex/browser-stage-b-design-verdict.md:210`). |
| `::backdrop` as the scrim | Refuse | The `div` backdrop stays as a transcript node. Your recipe makes the native backdrop transparent. |
| `inert` | Refuse | It excludes outside controls but does not wrap focus (`tmp/units/browser-feasibility-report.md:23`). |
| `requestClose`, `request-close`, `CloseWatcher` | Refuse | `closedby="none"` disables the watcher (`tmp/units/native-research-agent-7.md:123-128`). |
| `@starting-style` fade | Refuse | Equal motion (`tmp/units/browser-feasibility-report.md:19`). |
| `:has(dialog:modal)` lock, `overscroll-behavior` | Refuse | `Lock` owns the lock. Dialog containment alone lets wheel input over the backdrop scroll the page (`tmp/codex/stage-b-measurements.md:72`). `:has()` unlocks at `close()`, before Bootstrap's unlock after the transition (`tmp/units/native-research-agent-8.md:66`). |
| `moveBefore` for the append to body | Refuse | `Modal.ts:196` appends only a modal outside body. The measured preservation covers connected moves, and a root mismatch throws (`tmp/units/native-research-agent-5.md:63`). |
| `focus({ focusVisible })` | Refuse | Bootstrap passes no options (`tmp/units/native-research-agent-5.md:69`). |
| `scrollbar-gutter` | **Add** through `Lock` | |

### Offcanvas

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `<dialog>` | **Defer** | **Gate:** `dialog.offcanvas` with `showModal()` for `scroll: false` and `show()` for `scroll: true`, across an `.offcanvas-{bp}` breakpoint crossing. No reading exists (`tmp/units/native-inventory-2.md:26`). When it returns, the shape is `OffcanvasOptions.dialog` plus `OffcanvasPluginOptions`. |
| Popover top layer, `closedby`, `CloseWatcher` | Refuse | Under a hide veto, `.show` remains but the native surface closes (`tmp/codex/stage-b-measurements.md:33`). The responsive in-flow variants conflict with the top layer (`scaffold/.orkestrel/veneer/browser-design-verdict.md:39`). |
| Gutter | Inherited | It comes from `Lock` with no offcanvas leaf. |

### Popover and Tooltip

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `popover="manual"` | **Defer** | The floating gate. |
| `popover="hint"` | Refuse | Another hint replaces the earlier one (`tmp/codex/stage-b-measurements.md:47`), where Bootstrap's tips are independent. Its close cannot be vetoed. |
| `interestfor` | Refuse | It works only on `button`, `a`, and `area`, and excludes disabled controls (`tmp/units/native-research-agent-3.md:210`). An Escape `loseinterest` cannot be cancelled (`tmp/codex/stage-b-measurements.md:50`). An author `aria-describedby` replaces the native description (`:91`). `::interest-button` is experimental (`tmp/units/native-research-agent-9.md:66`). |
| ARIA element reflection | Refuse | The setter leaves the attribute empty (`tmp/codex/stage-b-measurements.md:119`), which breaks the token list at `guides/veneer.md:586`. |

### Scrollspy, Tab, and Toast

| Subject | Candidate | Ruling | Evidence |
| --- | --- | --- | --- |
| Scrollspy | `scroll-target-group`, `:target-current` | Refuse | No event and no `active` class (`tmp/units/native-research-agent-2.md:104`). |
| Scrollspy | `scrollIntoView({ container })` | Refuse | A different container choice and alignment from Bootstrap's `offsetTop` delta (`tmp/codex/stage-b-measurements.md:117`; `tmp/units/native-research-agent-5.md:67`). |
| Tab | `focusgroup` | Refuse | Bootstrap's `tabindex="-1"` drops inactive tabs from it, and it moves focus without selecting (`tmp/units/native-research-agent-2.md:157-162`). |
| Tab | View Transitions | Refuse | `tmp/codex/stage-b-measurements.md:162`. |
| Tab | `hidden` panes | Refuse | Stage A refusal (`scaffold/.orkestrel/veneer/browser-design-verdict.md:12`). |
| Tab | Scroll-marker tabs mode | Refuse | Not in Chromium 153 (`tmp/units/native-research-agent-2.md:71`). |
| Toast | Top layer | Refuse | A body-level promoted toast stays inert under a modal dialog (`tmp/codex/stage-b-measurements.md:105`), and promotion leaves `.toast-container` layout. |
| Toast | `ariaNotify` | Refuse | As for Alert. |

### Shared mechanisms

- **`Backdrop`:** the `div` backdrop stays.
- **`Trap`:** it stays in every configuration.
- **`Lock` and `Hold`:** the gutter is added. `Hold`'s algorithm is unchanged; it also holds `closedby`.
- **`Placement`:** floating is deferred.
- **Transition wait:** unchanged. `allow-discrete`, `overlay`, `TransitionEvent.animation`, and View Transitions are refused, because every native exit runs after the fade (`close()` sits at the `display: none` write, `Modal.ts:217`, after the wait at `:215`).
- **Boot scope listeners:** unchanged. No `command`, `CloseWatcher`, or `interestfor` listener. `ElementInternals` and `:state()` are refused, because Bootstrap's state classes are the contract.

**Floating gate.** All three readings are blocking:

1. A promoted dynamic dropdown and a promoted tooltip escape an ancestor with `overflow: hidden` plus `transform` that clips stage A. This is the gain, and it is unmeasured. Stage A's fixed anchoring already escapes plain overflow clipping (`tmp/units/stage-b-design-agent-1.md:363`).
2. The UA residue on `.popover[popover]` and `.dropdown-menu[popover]` under the lifted sheet (`tmp/units/stage-b-design-agent-2.md:160-162`).
3. The 1 px population across all placements.

The departure is already measured and is not small: insertion order replaces the z-index scale (`tmp/codex/browser-stage-b-design-verdict.md:216`). The shape below is designed so the unit can start when the gate passes:

```ts
// DropdownOptions, TooltipOptions, and PopoverOptions gain:
/**
 * If `true`, the panel shows in the top layer as a manual popover, the HTML `popover` attribute this leaf mirrors, from the accepted show to the completed hide; if `false`, the panel stays in the ordinary layer. A static dropdown menu stays in the ordinary layer under either value.
 *
 * Default: `false`.
 */
readonly popover?: boolean
// DropdownPluginOptions { readonly popover?: boolean }; TipPluginOptions gains `popover` beside `boot`.
```

### Modal (added): shape, mechanics, rows, CSS

The contract additions are these declarations:

```ts
// ModalOptions gains:
/**
 * If `true`, a `<dialog>` host opens with `showModal()` in the top layer and closes with `close()`, holding `closedby="none"` while open so that Escape and backdrop clicks keep the `dismiss` paths; a host that is not a `<dialog>` keeps Bootstrap's path. If `false`, every host keeps Bootstrap's path. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly dialog?: boolean

/**
 * Configures the modal plugin at creation.
 *
 * @remarks
 * The plugin passes `dialog` to every modal it creates. A factory call with options replaces a plugin-built modal with one built from those options alone, so the call repeats `dialog` to keep the dialog path.
 *
 * @example
 * ```ts
 * const options: ModalPluginOptions = { dialog: true }
 * ```
 */
export interface ModalPluginOptions {
	/**
	 * If `true`, every modal the plugin creates takes the path `ModalOptions.dialog` describes; if `false`, every modal keeps Bootstrap's path.
	 *
	 * Default: `false`.
	 */
	readonly dialog?: boolean
}

/**
 * Creates the modal plugin without registering components or listeners.
 * @param options - Leaves the plugin passes to every modal it creates. Default: none, so every modal keeps Bootstrap's path.
 * @returns The frozen modal plugin.
 * @example
 * createModalPlugin({ dialog: true })
 */
export function createModalPlugin(options: ModalPluginOptions = {}): PluginInterface<Modal>

// ModalInterface @remarks gains: "Under the `dialog` leaf, the host covers toasts and body-level tips, which stay inert while it is open; the browser focuses the host's first focusable descendant before the trap focuses the host at `shown`."
// ModalInterface.show gains: "@throws Thrown when the `dialog` leaf is on and the `<dialog>` host already carries `open`: `VeneerError` with code `MODAL_OPEN`."
// src/core/types.ts VeneerErrorCode gains 'MODAL_OPEN'.
```

The mechanics give the shape here; the objective lane owns correctness.

- **Guard.** The path runs only on a realm-aware `HTMLDialogElement`. `MODAL_OPEN` is thrown before any write.
- **`#open`.** It acquires `closedby` through the `Hold` and writes `none`, then calls `showModal()` at the `display: block` write (`Modal.ts:197`). Bootstrap's `aria-modal`, `role`, `reflow`, `show`, wait, and `Trap` steps keep their order (`:198-208`).
- **`#close`.** It calls `close()` at the `display: none` write (`:217`) and releases `closedby` after `lock.release()` (`:227`).
- **`destroy`.** It closes an open host and releases its holds.
- **Unchanged.** Escape stays on keydown (`:55-63`). The backdrop click stays on mousedown and click against the host (`:64-78`); the full-viewport host is the click target, as in Bootstrap. Every `*.bs.modal` event keeps its cancelability.
- **Forced close.** If an author calls `close()` or submits a `method="dialog"` form, the engine reconciles once and dispatches `hidden` with no veto.
- **Private rename.** The field `#dialog` becomes `#content`.

The rows use the `modal-dialog` prefix. The cells come from the implemented branch (`tmp/codex/browser-stage-b-design-verdict.md:261`), and `Modal.test.ts` owns every row.

| Row path | Bootstrap | Engine | Consuming case |
| --- | --- | --- | --- |
| `$::open` at show and hide | `<absent>` | `""`, then `<absent>` | `opens a dialog host through showModal under the dialog leaf` |
| `$::closedby` while open | `<absent>` | `none` | same |
| `$::modal` | `false` | `true` | same |
| `$::focus` between show and shown | opener | first focusable descendant | same |
| `$::focus` on an outside control, `focus: false` | outside | inside | `inerts outside content under the dialog leaf with focus off` |
| hit order against a toast and a body tooltip | toast, tooltip | dialog | `covers toasts and body tips with a dialog host` |
| forced native close | n/a | `hidden` without `hide` | `reconciles a native close of a dialog host` |

Two controls produce no row: a `<dialog>` host without the leaf, and the leaf on a `div` host.

**CSS.** The rules go in your stylesheet as an executed guide fence, and the proof loads them in both realms. The Bootstrap face is refused: "A value, selector, or context departure is inadmissible in the Bootstrap sheet" (`guides/veneer.md:1144`), and "additions belong to the styles face" (`:1176-1177`). The engine's constructed sheet is refused as presentation. The fence is the measured recipe (`tmp/codex/browser-stage-b-design-verdict.md:234-246`).

### `Lock` (added): shape, mechanics, rows, CSS

The contract additions are these declarations:

```ts
// LockInterface gains (width keeps its meaning, types.ts:2218):
/** Reports the width the lock compensates: `0` when the root element's computed `scrollbar-gutter` begins with `stable` (read at the first acquisition while locked, live while unlocked); otherwise `width`. */
readonly compensation: number
// LockContext gains:
/** If `true`, the root element's computed `scrollbar-gutter` began with `stable` at the first acquisition, so the lock compensates nothing; if `false`, it compensates `width`. */
readonly reserved: boolean
```

- **Mechanics.** The first acquisition reads the computed value before any write (`Lock.ts:59`). Bootstrap's loop then runs with a compensation of 0 (`:62-87`), so values change and no write disappears. `Modal.update` reads `compensation` (`Modal.ts:151`). Joining locks are unchanged (`Lock.ts:47-57`).
- **What does not count as an opt-in.** A gutter declared on `body` (the spec applies it only on the root) and an overlay scrollbar (no gutter).
- **Rows, prefix `lock-gutter`.**
  - `body::padding-right`, `.fixed-top::padding-right` (its skip condition at `:69` changes), and `.sticky-top::margin-right`: owned by `Lock.test.ts: compensates nothing under a declared stable root gutter`.
  - `$::padding-right` on update: owned by `Modal.test.ts: updates overflow padding under a declared stable root gutter`.
  - The offcanvas case: owned by `Offcanvas.test.ts: locks an offcanvas under a declared stable root gutter`.
  - Control with no row: a gutter declared on `body`.
- **CSS.** You declare `html { scrollbar-gutter: stable; }` yourself. The engine writes no gutter.

---

## W2: cross-cutting

1. **Top-layer order.** Only an opted dialog enters the top layer in stage B.
   - It sits above Bootstrap's whole z-index scale, including toasts (1090) and body-level tooltips (1080), and both are inert while it is open (`tmp/codex/stage-b-measurements.md:105`).
   - The engine reopens nothing to imitate z-index order (`tmp/codex/browser-stage-b-design-verdict.md:230`).
   - The guide states the limit: a tip or toast that must stay above an open dialog modal lives inside it. Set `container` for tips, as `guides/veneer.md:592` already asks for interactive tips.
   - Refused: a `TIP_CONTAINER` error and automatic reparenting. Both change Bootstrap's `container` default on a page that chose only the dialog.
2. **Close requests.** Every close request goes through the engine's keydown and click routes and Bootstrap's hide gates. The engine establishes no close watcher.
   - An opted dialog carries `closedby="none"`. Deferred floats would use `popover="manual"`. The engine never constructs a `CloseWatcher` and never calls `requestClose`.
   - Evidence: native closes cannot keep the veto (`tmp/codex/stage-b-measurements.md:39`).
   - Android Back stays unmeasured; with `closedby="none"` the dialog ignores it, as Bootstrap's `div` does.
3. **Focus.** `Trap` owns focus wrapping everywhere. `showModal()` adds browser modality only under the dialog leaf. The engine never writes `inert` or `focusgroup` and never passes `focusVisible`.
4. **Scroll lock.** `Lock` stays the sole owner. The gutter changes only its compensation. `showModal()` adds no lock.
5. **Transitions.** `awaitTransition` stays the one completion model. The engine adds no `@starting-style`, `allow-discrete`, `overlay`, or View Transitions. Reduced motion stays Bootstrap's: the sheet removes the transition, so the wait resolves at once.
6. **Invoker commands beside `data-bs-*`.**
   - **Built-in commands on engine hosts: refused.** The dropdown's click prevention suppresses the command, and a vetoed `show-modal` leaves Bootstrap's modal shown (`tmp/codex/stage-b-measurements.md:176`). The guide tells you to keep `commandfor` off Bootstrap triggers.
   - **Custom `--` command routes: deferred.** The gate is that a `--toggle` route beside the click route on one button produces exactly one toggle. A first real consumer must also exist.
7. **Newer DOM APIs.** `moveBefore`, `checkVisibility`, `scrollIntoView({ container })`, ARIA reflection, `focus({ focusVisible })`, and `ariaNotify` are all refused, with the evidence in the W1 rows; the semantic mismatches are at `tmp/codex/stage-b-measurements.md:113-121`.
   - **Stage A risk.** Chromium 153's initial `position-visibility` is `anchors-visible` (`tmp/codex/stage-b-measurements.md:52`; `tmp/units/native-research-agent-9.md:40`), and `src/browser` never writes it (grep: no match). An anchored floater can therefore vanish when its anchor is clipped, where Popper keeps it. This needs measuring before stage B lands (unit P0).

---

## W3: the Bootstrap umbrella inventory

The table lists what stage B lands. Rows marked "designed, deferred" land only after their gate passes.

| Item | Subject | Unit | Proof |
| --- | --- | --- | --- |
| `ModalOptions.dialog` | Modal | U1, then U4 | `Modal.test.ts` dialog cases and both controls |
| `ModalPluginOptions`; `createModalPlugin(options?)` | Modal | U1, then U2 | `plugins.test.ts`: absent and present, frozen, registers nothing, caller mutation inert |
| Markup refusal of the `dialog` leaf | Modal | U2 | Parsers test: `data-bs-dialog` sets nothing |
| `MODAL_OPEN` in `VeneerErrorCode` | Modal | U1, then U4 | `Modal.test.ts`, `errors.test.ts` |
| `LockInterface.compensation`, `LockContext.reserved` | Lock | U1, then U3 | `Lock.test.ts` |
| `Modal.update` reads `compensation` | Modal | U4 | `Modal.test.ts` gutter case |
| Rows `modal-dialog:*` | Modal | U4 | `Modal.test.ts` |
| Rows `lock-gutter:*` | Lock | U3, U4 | `Lock.test.ts`, `Offcanvas.test.ts`, `Modal.test.ts` |
| Guide `### Use native hosts`: executed TypeScript fence, CSS fence, gutter fence, limits, refusals | All | U1 (CSS fence), U6 (prose) | `tests/guides.test.ts`; the CSS fence read by `Modal.test.ts` |
| `### Engine departures` lead: "on identical markup and configuration, or under the opt-in its Scenario prefix names" | All | U6 | `npm run test:guides` |
| `guides/veneer.md:939` rewrite and Surface rows for `ModalPluginOptions` | All | U6 | Parity |
| Designed, deferred: `popover` leaves, `DropdownPluginOptions`, `TipPluginOptions.popover`, `floating-popover:*` rows | Floats | G1 | Gate |
| Designed, deferred: `CollapseOptions.intrinsic`, `CollapsePluginOptions` | Collapse | G2 | Gate |
| Designed, deferred: `OffcanvasOptions.dialog`, `OffcanvasPluginOptions` | Offcanvas | G3 | Gate |

The executed TypeScript fence reads:

```ts
import { createBootstrapPlugins, createModalPlugin, createVeneer } from '@orkestrel/veneer/browser'

const veneer = createVeneer(document, { plugins: [...createBootstrapPlugins(), createModalPlugin({ dialog: true })] })
veneer.destroy()
```

---

## W4: the CSS hand-offs these rulings create

These are the hand-offs only, as the dispatch asks.

1. **The dialog reset and the transparent `::backdrop`.** They live in your stylesheet. In chunk 3 they can move to the `./styles` `surfaces` layer as an addition, because surfaces are for UA pieces (`ROADMAP.md:109`; `guides/veneer.md:1308-1310`). The reset is safe to ship by default: it touches no declaration that `.modal` sets except `display`, and Bootstrap's own path on a `<dialog>` host renders with UA borders.
2. **`html { scrollbar-gutter: stable }`.** This is your opt-in. If chunk 3 adopts Elements' root gutter (`tmp/units/elements-styles-1.md:35`), every page that loads `./styles` switches to the `lock-gutter` rows. The user must rule on that.
3. **Deferred floats.** The popover UA resets for `.tooltip`, `.popover`, and `.dropdown-menu` hand off only after G1 passes.
4. **Deferred intrinsic collapse.** Collapse `interpolate-size` stays an identity drop (`tmp/units/veneer-remainder-3.md:36`). A root `html-interpolate` leaves the engine untouched under the option shape.
5. **Bootstrap's sheet covers the rest.** `.modal`, `.modal-backdrop`, and the lock targets need no change. Stage B adds no motion to hand off.

---

## W5: units

Every unit runs this ladder: the touched file, then `npm run test:src:browser`, then `npm run test:guides` where the guide changes.

These files are report-only and come back as patches the Orchestrator applies:
- `types.ts` after U1;
- `constants.ts` and `index.ts`;
- the guide outside U1 and U6;
- `tests/setup.ts` and the engine section of `tests/setupBrowser.ts`, except in U5.

**Precondition:** `veneer-boot` has landed with D1, D2, and D4.

| Unit | Lane | Owns | Order | Re-run measurement |
| --- | --- | --- | --- | --- |
| P0 `anchor-visibility` | Astra | `Placement.ts`, `Placement.test.ts` | First, parallel with U1 | A clipped anchor against Popper. If a floater vanishes, write `position-visibility: always` and keep a control. |
| U1 `stage-b-contract` | Opus, edits only | `types.ts`, `src/core/types.ts`, the guide's CSS fence | After `veneer-boot` | The Orchestrator runs the browser-scope `tsc`. Expected failures: only the two `Lock.ts` sites U3 closes. |
| U5 `stage-b-harness` | Astra | `tests/setupBrowser.ts` (engine section), `setupBrowser.test.ts`, `tests/setup.ts`, `setup.test.ts` | After U1 | Guide CSS-fence loader in both realms; readers for `:modal`, `open`, and `closedby`; hit order; a classic-scrollbar instrument with a 15 px control (the root configuration hides scrollbars, `tmp/codex/browser-stage-b-design-verdict.md:206`) |
| U2 `stage-b-plugins` | Astra | `plugins.ts`, `plugins.test.ts`, the parsers test case | After U1, parallel with U5 | None |
| U3 `gutter` | Astra, worktree | `Lock.ts`, `Lock.test.ts`, gutter cases in `Offcanvas.test.ts` | After U5 | Gutter declared before the lock on `body`, `.fixed-top`, `.fixed-bottom`, and `.sticky-top`; overflowing modal; offcanvas; gutter without overflow; overlay-scrollbar control |
| U4 `dialog` | Astra, worktree | `Modal.ts`, `Modal.test.ts` | After U2 and U3 | P12 backdrop paint; repeated Escape under `closedby="none"`; focus order; `showModal()` on an `open` host; `method="dialog"` submit; both controls |
| U7 `native-integration` | Astra | `tests/src/browser/integration.test.ts` | After U4 | Dialog with the gutter and Bootstrap plugins on one page; a toast container inside the dialog |
| U6 `stage-b-guide` | Opus | `guides/veneer.md` § Browser entry; `ROADMAP.md:145-146` | Last | None |
| G1 to G4 gate probes | Astra, read-only | Probes only, deleted after | Any time | Floating gate; intrinsic resize; offcanvas dialog; until-found reveal |
| Close-out | | | | One `orkestrel-falsify` round (Opus reviews the mechanism, Astra reviews the contract), then `verifier` |

**Lanes-log predictions.** Before each landing, log: predicted rows none.
- The showcase composes no native leaf.
- A grep of `src/` and `app/` (`app/browser/recipe.json` included) for `scrollbar-gutter|interpolate-size|popover=|commandfor|closedby` returns no file.
- The gutter prediction holds only while no sheet the showcase loads declares a root gutter.
- If P0 changes `Placement`, it must name the `tooltip`, `popover`, and `dropdown` tables and predict none.

---

## Alternatives

- **Detected opt-in for every surface** (agent-0). Refused. Markup or CSS alone would move a Bootstrap `<dialog class="modal">` page, or a page with a reset declaring `interpolate-size`, without its asking (`tmp/units/stage-b-design-agent-2.md:127-128`).
- **Shipping floats and intrinsic collapse now** (the judge's D3.4 and D3.5). Deferred under the parity angle: the gain is unmeasured and the departure is measured.
- **`position.popover`** (judge) and **`topmost`** (Codex) as the float leaf. Refused for `popover` at top level:
  - `position.popover`: hosting is a separate lifetime from `Placement` (`tmp/codex/browser-stage-b-design-verdict.md:228`).
  - `topmost`: it overclaims, because insertion order decides. The external name is admitted by `names.md:120`.
- **A typed `gutter` option** (Codex). Refused. A document lock takes no per-component policy, and the option forced first-owner precedence rules.

## Refusals

- **Dialog CSS in the Bootstrap sheet:** "A value, selector, or context departure is inadmissible in the Bootstrap sheet" (`guides/veneer.md:1144`).
- **Markup-set native leaves:** "Stage B is a later chunk, built as same-named plugin replacements in a caller's list" (`scaffold/.orkestrel/veneer/browser-convention-verdict.md:129`).
- **Custom command routes without a consumer:** "Create or substantively expand a capability with its first real consumer" (`AGENTS.md`, Design laws).

## Measurements

- **Supplied:** feasibility (11 probes), the Codex D3 reruns (16 tests), and stage B M/S/T/C/X. All ran on Chromium 153.0.8010.12 with Playwright 1.63.0.
- **Missing:**
  - the floating clip-escape reading and the popover profile's UA residue;
  - the intrinsic mid-transition resize;
  - the offcanvas dialog;
  - until-found under a corrected recipe;
  - P12, repeated Escape, and the dialog focus order;
  - the classic-scrollbar gutter boxes for fixed and sticky elements;
  - the `position-visibility` effect on stage A;
  - Android Back.

## Tensions

- **T1.** Floats deferred, against the judge's D3.5 to ship.
- **T2.** Intrinsic collapse deferred, and an option rather than detection, against D3.4.
- **T3.** The `popover` leaf name and level.
- **T4.** The gutter: detection with an added `compensation` member, against the judge redefining `width` and Codex's option.
- **T5.** Plugin options carry native leaves. This widens `veneer-boot`'s `TipPluginOptions` only when floats ship.
- **T6.** `MODAL_OPEN`, against closing an author-open dialog or Codex's `MODAL_STATE`.
- **T7.** Native `DOMException`s propagate after rollback, rather than being wrapped.
- **T8.** Tips and toasts under a dialog: guide limit plus rows, against `TIP_CONTAINER`.
- **T9.** Offcanvas dialog deferred, against Codex refusing it.
- **T10.** `focus: false` under the dialog: browser modality plus a row, against `show()`.
- **T11.** The classic-scrollbar instrument needs a harness or configuration change.

## Risks

- **A common reset switches the gutter on.** A reset that declares a root `stable` gutter switches the `lock-gutter` behavior on silently. The guide must say that the declaration is the opt-in.
- **A factory replacement drops the dialog path.** A factory call with options replaces a plugin-built modal unless the call repeats `dialog: true`.
- **Over-correcting would break parity:**
  - replacing `Trap` with `inert` breaks focus wrapping;
  - dropping the `div` backdrop moves transcript nodes;
  - promoting toasts or offcanvas leaves their layouts;
  - letting a native close watcher close a modal loses the hide vetoes.

## What the user must rule

1. Accept deferring floats and intrinsic collapse behind their gates.
2. Accept that a root stable gutter changes the lock's writes with no Veneer option, and whether `./styles` may declare one in chunk 3.
3. Whether `./styles` ships the dialog reset by default.
4. `MODAL_OPEN`, or silently closing an author-open dialog.
5. The tips and toasts limit under an open dialog.
6. Deferring the offcanvas dialog.