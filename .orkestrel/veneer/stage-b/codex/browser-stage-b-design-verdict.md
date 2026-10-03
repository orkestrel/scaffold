# D1 — Blank-slate boot

**Rule:** `createVeneer()` creates an empty scope. It installs no component routes, clearing listeners, boot scans, or stylesheet. `createBootstrapPlugins()` remains the explicit Bootstrap convenience, retaining bundle order and Bootstrap's own load initializers but omitting tip initialization. Tip initialization is an explicit `boot: true` option on each tip plugin factory. A factory constructs a descriptor and registers nothing. This changes the default in `src/browser/factories.ts:174` and the boot entries at `src/browser/plugins.ts:284` and `src/browser/plugins.ts:364`; it follows the user's ruling at `tmp/units/browser-stage-b-design-brief.md:16`.

The scope remains a real ownership boundary. An empty nested scope excludes its subtree from an ancestor's routes; it is not an inheritance request. Repeating the factory returns the existing live scope and ignores new options. Keep these contracts from `src/browser/Engine.ts:98`, `src/browser/Engine.ts:154`, and `src/browser/types.ts:464`. Skip the load listener when no descriptor has a boot entry; the current unconditional subscription is at `src/browser/Engine.ts:78`.

The new declarations in `src/browser/types.ts` are:

```ts
/** Configures a scope when its root has no live instance. */
export interface VeneerOptions {
	/** Lists the complete plugin population; later same-named entries replace in place. Default: none. */
	readonly plugins?: readonly PluginInterface[]
}

/** Configures tooltip construction and optional initialization at scope boot. */
export interface TooltipPluginOptions extends TooltipOptions {
	/** If true, initializes matching hosts present at boot; if false, declares no boot entry. Default: false. */
	readonly boot?: boolean
}

/** Configures popover construction and optional initialization at scope boot. */
export interface PopoverPluginOptions extends PopoverOptions {
	/** If true, initializes matching hosts present at boot; if false, declares no boot entry. Default: false. */
	readonly boot?: boolean
}
```

The plugin signatures become `createTooltipPlugin(options?: TooltipPluginOptions): PluginInterface<Tip<'tooltip'>>` and `createPopoverPlugin(options?: PopoverPluginOptions): PluginInterface<Tip<'popover'>>`. Their TSDoc states that construction registers nothing, that options configure newly created components, and that boot scans only the current root population after load. Remove `boot` before passing component options to `Tip`. Neither descriptor gains a click route. Preserve its family name and profile guard. The existing binder and replacement semantics already provide ownership and deduplication (`src/browser/helpers.ts:87`, `src/browser/helpers.ts:122`, `src/browser/Engine.ts:237`).

The showcase explicitly chooses its existing behavior:

```ts
createVeneer(document, {
	plugins: [
		...createBootstrapPlugins(),
		createTooltipPlugin({ boot: true }),
		createPopoverPlugin({ boot: true }),
	],
})
```

**Alternatives.** Accept no default plugins. Reject a default Bootstrap collection, even without tip boot: it still installs a product convention before the consumer chooses it. Reject markup-driven discovery of which plugins to install and a second convenience boot factory: the existing collection composes the required behavior. Accept tip factory options because initialization is binary and the existing family descriptor already owns boot. Reject separate boot-only plugin factories: different registry names split ownership, while identical names would replace the original descriptor. Reject a separate tip collection for now: callers already have a direct composition, and neither tip must imply the other. Reject a function that mutates a live scope: it introduces late registration and repeat-scan semantics absent from the standing contract. These decisions follow `../scaffold/.claude/rules/names.md:37` and `../scaffold/.orkestrel/veneer/browser-convention-verdict.md:42`.

**Audit of other imposed behavior.** “Keep” below means keep inside an explicitly selected component or plugin; none becomes implicit in an empty scope.

| Behavior | Ruling and constraint | Evidence |
| --- | --- | --- |
| Carousel ride, scrollspy, shown offcanvas, active tab initialization | Keep in the Bootstrap collection. These reproduce Bootstrap load initialization; removing them would weaken the explicitly chosen convenience. | `src/browser/plugins.ts:100`, `:269`, `:300`, `:323`; `tests/setupBrowser.ts:4695` |
| Component defaults: initial collapse toggle, carousel input/autoplay, overlay focus/backdrop/scroll, toast delay, tip triggers/sanitization, scrollspy observation | Keep Bootstrap defaults once the component is selected. Do not turn blank boot into different component defaults. Keep data-API collapse acquisition at `toggle: false`. | `src/browser/constants.ts:55`, `:73`, `:100`, `:112`, `:120`, `:143`, `:166`; `src/browser/plugins.ts:114`; `src/browser/helpers.ts:328` |
| `toggle.vn.button`, typed `detail`, existing wire names and cancellation | Keep. The notification belongs to the selected Button contract; removing it would change its observers. Do not add a second event for any Bootstrap lifecycle fact. | `src/browser/Button.ts:7`; `src/browser/constants.ts:44`; `guides/veneer.md:685`, `:696`; `../scaffold/.orkestrel/veneer/browser-design-verdict.md:21` |
| Several plugins per host; both tip profiles; live description/anchor tokens; final-owner title restoration | Keep. These are explicit registry and ownership rulings, not unsolicited boot policy. | `src/browser/Registry.ts:46`; `src/browser/Tip.ts:74`, `:194`, `:274`; `guides/veneer.md:688`, `:918`, `:920` |
| First-owner scroll compensation, final-owner restoration, owner-specific trap release, creator ownership across roots | Keep. These prevent one live component from destroying another's resources; do not introduce a trap stack. | `src/browser/Lock.ts:45`; `src/browser/Hold.ts:82`; `src/browser/Trap.ts:47`; `src/browser/Engine.ts:129`; `guides/veneer.md:671`, `:693`, `:712` |
| Teardown restoration and aborted late work, including collapse/tab/carousel and hidden tip description removal | Keep. Blank boot does not withdraw the user's teardown ruling. | `guides/veneer.md:694`, `:777`, `:792`, `:806`, `:820`, `:853`, `:924`, `:933`, `:934`; `../scaffold/.orkestrel/veneer/browser-convention-verdict.md:151` |
| Mistyped inputs resolve to defaults; function-valued Bootstrap/Popper inputs excluded; typed hooks and sanitizer remain | Keep the current input boundary and its departures. Do not loosen sanitization to enable a native host. | `guides/veneer.md:682`; `src/browser/helpers.ts:560`; `src/browser/parsers.ts:1` |
| Native transition waits without synthetic events; native carousel pause completion | Keep, including bounded abort behavior. No new global motion setting. | `guides/veneer.md:686`, `:687`, `:695`, `:851` |
| Ordinary-layer anchors, inline arrows, reversible placement, current-direction resolution, omitted Popper metadata, synchronous placement/transient differences | Keep the accepted stage A mechanism and its measured departures. Native top-layer behavior is separately selected in D3. | `src/browser/Placement.ts:199`; `guides/veneer.md:846`, `:848`, `:849`, `:850`, `:898`, `:922` |
| Touch workaround listener ownership and stylesheet anchor masking | Keep with explicit proofs and departure rows; D4 closes the missing evidence. | `src/browser/Tip.ts:220`; `src/browser/Dropdown.ts:129`; `src/browser/Placement.ts:205` |

**Files, departures, proofs.** Change `src/browser/{types,factories,plugins}.ts`, the renamed scope implementation, and their mirrored tests; migrate the consumers in D2. Update `guides/veneer.md`, `ROADMAP.md`, and the boot-site evidence in both setup modules. Remove the default `tip-boot` rows at `guides/veneer.md:689`–`:692`. Move their title-migration assertions to explicitly opted `tooltip-boot` and `popover-boot` scenarios, owned by `plugins.test.ts`; do not silently discard their oracle evidence. Add default-collection equality against Bootstrap's untouched tip hosts. Keep general scope boot, abort, registration, and teardown proofs in `Veneer.test.ts`.

Prove empty import and empty boot, nested empty scopes, explicit Bootstrap composition, independent tip selection, late inserted hosts remaining uninitialized, delegated tips without boot, load-time teardown, same-name replacement, and repeated scope identity. Extend distribution checks to show that a bare boot export does not retain the built-in collection while explicit collection composition retains its selected components (`tests/distribution.test.ts:998`). Add no D1 error code. Over-correcting by removing component defaults, shared-host support, or lifecycle events would undo accepted stage A contracts.

# D2 — `createVeneer`

**Rule:** rename the class to `Veneer`, its implementation to `src/browser/Veneer.ts`, and its mirror to `tests/src/browser/Veneer.test.ts`. Rename the boot factory, options, interface, and interaction together. Retain the class's constructor, static `resolve`, ownership behavior, and public barrel membership. `VeneerError`, `VeneerErrorCode`, and `isVeneerError` stay package-wide errors; they are distinct identifiers and do not conflict with the scope (`src/core/errors.ts:5`, `src/core/types.ts:55`).

```ts
/** Owns a document or subtree's selected plugin routes and created components.
 * @remarks
 * An empty scope supplies no routes and excludes ancestor routing in its subtree.
 * Repeated creation returns the live scope without changing its configuration.
 * @example
 * const veneer = createVeneer(document, { plugins: createBootstrapPlugins() })
 * veneer.destroy()
 */
export interface VeneerInterface {
	/** Identifies the document or subtree served by this scope. */
	readonly root: Document | HTMLElement
	/** If true, teardown ran; if false, the scope remains live. */
	readonly destroyed: boolean
	/** Releases listeners and owned components.
	 * @throws Thrown when component teardown fails: VeneerError with code VENEER_DESTROY and aggregate errors in context.
	 */
	destroy(): void
}

/** Carries a trigger and creator-owned registry into a plugin dispatch. */
export interface VeneerInteraction {
	/** Identifies the routed trigger or boot host. */
	readonly trigger: HTMLElement
	/** Carries native input; absent during boot. */
	readonly event?: Event
	/** Supplies component lookup and ownership for the dispatch. */
	readonly registry: RegistryInterface
	/** Aborts work when the scope ends; absent for dispatch without a scope. */
	readonly signal?: AbortSignal
}
```

Use D1's `VeneerOptions`. In `factories.ts`, the signature is `createVeneer(root: Document | HTMLElement = document, options: VeneerOptions = {}): VeneerInterface`; its TSDoc says “Creates or returns a root's scope with explicitly selected plugins,” documents both parameters, the default empty collection, the returned owner, and the D1 example. In `Veneer.ts`, use `export class Veneer implements VeneerInterface`, `constructor(root: Document | HTMLElement = document, plugins: readonly PluginInterface[] = [])`, and `static resolve(root: Document | HTMLElement, plugins: readonly PluginInterface[]): VeneerInterface`. No alias or forwarding `createEngine` remains.

Rename the error literals without changing their meanings:

| Existing | Replacement | Meaning |
| --- | --- | --- |
| `ENGINE_ROOT` | `VENEER_ROOT` | Direct constructor encounters a live root owner. |
| `ENGINE_DESTROYED` | `VENEER_DESTROYED` | A retained scope context refuses new ownership after teardown. |
| `ENGINE_DESTROY` | `VENEER_DESTROY` | Teardown completed its cleanup but reports component failures. |

The definitions and throw sites are `src/core/types.ts:56`, `src/browser/Engine.ts:39`, `:49`, `:126`, `:138`, and `:142`. Keep `REGISTRY_COMPONENT`, `REGISTRY_CONFLICT`, `TIP_HIDDEN`, and `DROPDOWN_MENU`. D3 adds the separate native-state codes it names.

**Name check and alternatives.** The measured command `node tmp/probes/stage-b-inspect.ts fleet` inspected the `## Surface` sections of 51 hosted guide files and found no exact claim to `Veneer`, `createVeneer`, `VeneerInterface`, `VeneerOptions`, `VeneerInteraction`, `TooltipPluginOptions`, `PopoverPluginOptions`, or `LockOptions`; the result is retained in `tmp/codex/browser-stage-b-design-fleet.json`. Prefer these qualified names to another package's `ScopeInterface` or `BrowserInterface`. Reject `VeneerEngine`, `VeneerScope`, an unrenamed `EngineInteraction`, and compatibility aliases: they preserve competing terms or compound the entity without adding meaning. The governing rules are `../scaffold/.claude/rules/names.md:104` and `../scaffold/.claude/rules/architecture.md:161`.

**Consumer census.** The command `node tmp/probes/stage-b-inspect.ts census` measured the tracked text population at `9885975f0d359ef5aab14a1a536a4fcaa53430b6`: 333 exact old-name occurrences in 40 files, including 8 occurrences in the generated showcase. The browser source and consumers are unchanged from the brief's `dc4654b`; the intervening commits adopt scaffold 0.0.88. The exact regex and every matching line are retained in `tmp/codex/browser-stage-b-design-census.json`. These are textual migration sites, including declarations, imports, prose, and test expectations—not a claim of 333 runtime calls. Each file's count follows; “retain” identifies descriptive engine vocabulary that must not be blindly replaced.

| File | Sites | Required treatment / locating citation |
| --- | ---: | --- |
| `src/browser/Engine.ts` | 25 | Rename file, class, self-references, types, errors; `:20`. |
| `src/browser/factories.ts` | 9 | Imports, factory, return/options types, example; `:12`, `:170`. |
| `src/browser/helpers.ts` | 3 | Interaction import and both binders; `:3`, `:87`, `:122`. |
| `src/browser/index.ts` | 1 | Class barrel path; `:8`. |
| `src/browser/types.ts` | 9 | Scope, interaction, options, callback types, ownership docs; `:464`, `:1968`, `:2090`, `:2156`. |
| `src/core/types.ts` | 3 | Error literals; `:56`. |
| `app/browser/main.ts` | 3 | Import and calls at `:5`, `:6`; initial call gets explicit Bootstrap and tip boot composition. |
| `app/browser/constants.ts` | 2 | Retain descriptive “Engine” UI wording at `:82`, `:519`. |
| `app/browser/factories.ts` | 2 | Retain descriptive “Engine” UI wording at `:453`, `:467`. |
| `tests/app/browser/Showcase.test.ts` | 2 | Import and boot at `:315`; preserve the app's explicit composition. |
| `tests/app/browser/main.test.ts` | 2 | Import and factory identity lookup at `:116`. |
| `tests/app/browser/constants.test.ts` | 1 | Retain the descriptive UI expectation at `:198`. |
| `tests/app/browser/factories.test.ts` | 2 | Retain UI expectations at `:446`, `:584`. |
| `tests/setupBrowser.ts` | 12 | Shared imports; showcase scope type/boot at `:1273`, `:1280`, `:1282`; engine oracle boot at `:4668`. Retain generic captions and departure section selectors. |
| `tests/setupBrowser.test.ts` | 1 | Retain the generic departure heading at `:986`; re-prove its boot-helper consumers. |
| `tests/setup.ts` | 5 | Retain “Engine departures” parser/default-section vocabulary at `:419`, `:473`, `:511`, `:512`, `:531`. |
| `tests/setup.test.ts` | 6 | Retain corresponding parser fixtures at `:26`, `:28`, `:694`, `:698`, `:709`. |
| `tests/distribution.test.ts` | 4 | Export/tree-shaking fixtures at `:998`, `:1001`, `:1039`; retain generic departure heading at `:1052`. |
| `tests/src/browser/Engine.test.ts` | 51 | Rename mirror; calls, direct constructors, and error expectations; `:12`, `:73`, `:122`, `:566`. |
| `tests/src/browser/factories.test.ts` | 12 | Scope constructors/factory calls/default-composition expectations; `:22`, `:128`, `:201`. |
| `tests/src/browser/index.test.ts` | 2 | Export inventory at `:27`, `:82`. |
| `tests/src/browser/Alert.test.ts` | 4 | Boot sites `:38`, `:319`; retain departure heading. |
| `tests/src/browser/Button.test.ts` | 8 | Boot sites beginning `:18`; retain departure heading. |
| `tests/src/browser/Carousel.test.ts` | 8 | Boot sites beginning `:50`, including factory references; retain departure heading. |
| `tests/src/browser/Collapse.test.ts` | 9 | Boot sites beginning `:31`; retain departure heading. |
| `tests/src/browser/Dropdown.test.ts` | 17 | Boot sites beginning `:317`, nested scopes included; retain departure heading. |
| `tests/src/browser/Modal.test.ts` | 10 | Boot sites beginning `:26`; retain departure headings. |
| `tests/src/browser/Offcanvas.test.ts` | 9 | Boot sites beginning `:96`; retain departure heading. |
| `tests/src/browser/Scrollspy.test.ts` | 8 | Boot sites beginning `:19`; retain departure heading. |
| `tests/src/browser/Tab.test.ts` | 12 | Boot sites beginning `:93`; retain departure heading. |
| `tests/src/browser/Tip.test.ts` | 26 | Boot sites beginning `:215`; choose explicit boot or direct construction per scenario; retain departure heading. |
| `tests/src/browser/Toast.test.ts` | 4 | Boot sites `:59`, `:399`; retain departure heading. |
| `tests/src/browser/integration.test.ts` | 8 | Composition, constructor use and nested scopes; `:72`, `:143`, `:181`, `:270`. |
| `tests/src/browser/Lock.test.ts` | 1 | Retain departure heading at `:300`. |
| `tests/src/browser/Placement.test.ts` | 1 | Retain departure heading at `:963`. |
| `tests/src/browser/helpers.test.ts` | 1 | Retain departure heading at `:1381`. |
| `tests/src/core/errors.test.ts` | 2 | Error code expectation at `:8`, `:12`. |
| `guides/veneer.md` | 37 | Rename API surface, `EngineInterface` heading, scope/error prose and examples; `:86`, `:320`, `:539`, `:578`, `:636`, `:1826`, `:1862`. Retain “Engine departures” and generic engine prose. |
| `ROADMAP.md` | 3 | Correct boot description and remove resolved open questions at `:144`, `:145`. |
| `showcase/browser.html` | 8 | Rebuild from the migrated app; never hand-edit the artifact. |

The indirect journey consumers are also in scope: `tests/app/browser/integration.test.ts:371` and `:540` call `startJourneyEngine`; `tests/setupBrowser.test.ts:173` exercises it. Keep that helper's name—it starts the browser engine—but change its implementation and return type. Likewise retain `EngineDeparture`, Bootstrap engine inventory types, `buildEnginePlugin`, and `readBootstrapEngine`; they name a different, still-valid concept. Do not rename Bootstrap's own engine. The census intentionally separates these from the renamed public scope.

**Departures and proofs.** Rename proof-file references from `Engine.test.ts` to `Veneer.test.ts`, including the registry rows; the rename alone changes no behavioral departure. Run the migrated source/core, setup, app, guide, distribution, and journey proofs. Search the compiled surface and source imports for old public names; a prose match is not automatically a defect. Preserve the showcase's current initialization explicitly, so no existing statechart outcome should change. D5 names the rows that would expose a missed composition. Over-correcting by replacing every English “engine,” changing root identity, or simplifying retained-context guards would turn a rename into an unrelated behavior change.

# D3 — Native pieces

**Rule:** ship the native capabilities as opt-in configurations of the existing component engines and same-named plugin descriptors. No native switch is enabled by `createBootstrapPlugins()`. This keeps the replacement-list contract of `../scaffold/.orkestrel/veneer/browser-convention-verdict.md:129`; the user's later ruling changes its timing. Do not introduce parallel component classes, a native-wide boot preset, or one mode string selecting unrelated algorithms.

The following are exact member additions to the named existing interfaces in `src/browser/types.ts`; their other members remain as declared. These switches are typed options, not invented `data-bs-*` input fields.

```ts
// ModalOptions
/** If true, uses showModal for dialog hosts; if false, keeps Bootstrap hosting. Non-dialog hosts retain Bootstrap hosting. Default: false. */
readonly dialog?: boolean
/** If true, requests stable-gutter locking when starting a document lock; if false, requests Bootstrap compensation. An existing acquisition keeps its first owner's policy. Default: false. */
readonly gutter?: boolean

// OffcanvasOptions
/** If true, requests stable-gutter locking when scrolling is locked; if false, requests Bootstrap compensation. An existing acquisition keeps its first owner's policy. Default: false. */
readonly gutter?: boolean

// CollapseOptions
/** If true, interpolates vertical height to its intrinsic size; if false, uses measured pixels. Horizontal panels always use measured pixels. Default: false. */
readonly intrinsic?: boolean

// DropdownOptions, TooltipOptions, and PopoverOptions
/** If true, owns a manual popover lifetime for the floating panel; if false, keeps ordinary-layer hosting. Requires the documented native-host CSS. Default: false. */
readonly topmost?: boolean

// LockInterface
/** Reports the padding compensation needed by the shared acquisition: zero for stable gutter, otherwise its measured width. */
readonly compensation: number
```

```ts
/** Configures the policy requested when beginning a document scroll lock. */
export interface LockOptions {
	/** If true, acquires a stable root gutter; if false, applies Bootstrap compensation. A joining lock keeps the active policy. Default: false. */
	readonly gutter?: boolean
}
```

`Lock` takes `constructor(root: Document = document, options: LockOptions = {})`. Keep `width` as the actual first-owner scrollbar measurement; do not silently redefine it as compensation (`src/browser/types.ts:2218`). Add `readonly gutter: boolean` to `LockContext`, documented as the effective policy chosen at first acquisition. Extend `LockTarget` with `readonly saved?: string`, documented as the Bootstrap save attribute when that target has one; the root gutter has none. These additions let joining owners acquire the exact footprint without manufacturing `data-bs-scrollbar-gutter` (`src/browser/types.ts:2298`).

`createModalPlugin(options?: ModalOptions)`, `createOffcanvasPlugin(options?: OffcanvasOptions)`, `createCollapsePlugin(options?: CollapseOptions)`, and `createDropdownPlugin(options?: DropdownOptions)` capture construction defaults without registering anything. The tip signatures are in D1. Their parameter TSDoc states that these defaults apply to newly created components and that the data API still fixes collapse's initial `toggle` to false. Capture caller configuration without allowing subsequent caller mutation to alter the descriptor. Component factories already take these options. A consumer replaces only the desired families, for example `createModalPlugin({ dialog: true, gutter: true })`; a `<dialog class="modal">` then selects the dialog backend, while its neighboring `div.modal` keeps the original host behavior.

**Measurements rerun at the tip.** At `9885975f0d359ef5aab14a1a536a4fcaa53430b6`, the final command was `npx vitest run --config tmp/probes/stage-b-classic.config.ts tests/src/browser/design.probe.test.ts`: exit 0, 16 tests, 13.32 s, Chromium 153.0.8010.12 with Bootstrap 5.3.8. Sources, configuration, controls, and readings are retained in `tmp/codex/browser-stage-b-design-measurements.json`. The prescribed root-config command ran first: its classic-scrollbar assertion failed at width 0 while the other restored cases passed. The temporary configuration reused `srcBrowser` and removed only Playwright's `--hide-scrollbars` launch default, with explicit optimization of the oracle imports. It changed no repository configuration. These are probe results, not acceptance of the unimplemented native paths. Temporary probes were removed; `git status --porcelain` was empty before the pass and after cleanup.

| Required reading | Fresh result and control | Isolated Bootstrap oracle implication |
| --- | --- | --- |
| `dialog-modal` | Raw `dialog.modal` remains hidden after native opening; normalization matches the sampled div properties and boxes, at 414 × 896. The raw UA box is the control. | `oracle-dialog-stage-b`: Bootstrap shows a dialog element without setting `open` or `:modal`; with `focus:false`, outside focus succeeds. Native `showModal` sets both and focuses the first child. `closedby="none"` delivers Escape keydown without cancel or native closing; outside focus succeeds again after close. |
| `scroll-lock` | Classic scrollbar is 15 px. Uncompensated hiding widens body/navbar from 399 to 414 px. Stable gutter keeps both at 399 px, with zero added padding; Bootstrap's ordinary path adds 15 px padding. | `oracle-gutter-stage-b`: with an already-stable root, both Bootstrap Modal and current Veneer Lock still add 15 px body padding. The oracle navbar padding and modal padding in this fixture are respectively `0px` and empty; do not invent identical writes on every target. Native overflow-only control keeps 399 px and zero body padding. |
| `collapse-intrinsic` | Pixel and auto paths reach 120 px and both animate for the sheet's 350 ms duration. Numeric-only auto is the no-animation control. | `oracle-intrinsic-stage-b`: Bootstrap still writes `120px` under `interpolate-size`; the candidate writes `auto`, has a real animation, and reaches the same sampled box. |
| `dropdown-anchor-popover` | Absolute anchor recipe misses the static y position; fixed anchoring matches. Manual stays open on outside click/Escape; auto closes but leaves Bootstrap display state. | `oracle-floating-stage-b`: Bootstrap never enters native open state. Current Placement plus explicit promotion matches its 160 × 50 box at (70, 212), but outranks the z-index 2000 cover. Current Dropdown hide leaves the native popover open while `visible` becomes false—the native lifetime must be integrated. |
| `tooltip-arrows` | Anchor-only arrows still require positioning and resolved-side updates; removing the anchor loses attachment. | `oracle-arrow-geometry-stage-b`: raw promotion has a 3 px border, 3.5 px padding, white background, and x=149.140625 versus Bootstrap x=163. Neutralization before placement gives x=163.140625, equal 100.5 × 29 size, and arrow x within 0.141 px. A raw-promotion equality assertion failed before the corrected recipe was measured. |
| `focus-inert` | Unrestricted Tab reaches outside controls. Inert excludes their focus and AX entries but preserves layout. Tab then leaves the iframe; Bootstrap FocusTrap cycles first/last internally. | Keep `Trap`. Native dialog exclusion is an additional host constraint, including when `focus:false`; it does not prove standalone wrapping or replace the Bootstrap trap. |
| `top-layer` | Opening tooltip after dropdown places tooltip first; reopening dropdown puts dropdown first despite its lower z-index. Removing native promotion exposes the toast first. | `oracle-arrows-layers-stage-b`: ordinary order is toast, tooltip, dropdown; promotion changes it to tooltip, dropdown, toast; reopening changes it to dropdown, tooltip, toast. This cannot be normalized away as an implementation-only style. |

**Dialog mechanics.** Keep `Modal`, `Backdrop`, and `Trap`. Acquire the scroll lock and retain the div backdrop, its animation, the modal mousedown/click target test, static bounce, and Bootstrap keydown path. Set and hold `closedby="none"` only for the selected dialog lifetime. Call `showModal()` at the point the connected host becomes displayed, before the shown lifecycle completion; keep it modal through the host's closing transition and close it before releasing the backdrop and lock. Restore the owned native attribute on destruction. Continue to use the existing trap when `focus` is enabled; with `focus:false`, document that the browser still performs dialog autofocus and outside exclusion. Do not promise focus freedom that a modal dialog cannot provide (`src/browser/Modal.ts:116`, `:180`, `:210`; `src/browser/Trap.ts:42`).

The native dialog's `::backdrop` must be transparent so it does not add a second visual scrim over the retained div backdrop. Its top-layer position, outside inertness, early native focus, and native events are departures. Programmatic `requestClose` must be vetoed at native cancel and routed through the component hide gate. Direct native `close()` or a dialog form submission has already closed the browser state and cannot honor a later hide veto: reconcile resources once, report the forced-close departure, and never leave the body locked. An already open nonmodal dialog is invalid for this acquisition; fail with `VeneerError('MODAL_STATE', ...)` before leaving acquired resources behind. Unexpected native opening failures use the same code with their cause in context. Reentrant destroy and native beforetoggle cancellation require rollback and no shown event.

**Gutter mechanics.** First acquisition chooses the policy; later acquisitions join it without writes or remeasurement. Gutter acquisition holds `html`'s inline `scrollbar-gutter` and its priority, preserves an existing stable/both-edges declaration, otherwise writes stable, and holds body overflow. It omits Bootstrap padding/margin adjustments and their save attributes. Every owner joins that exact footprint, and only final release restores it. `Modal.update()` uses `lock.compensation`, not `lock.width`, and must not create a new modal padding adjustment for a gutter lock. A default lock joining a gutter acquisition uses the active policy; a gutter request joining a standard acquisition waits until the next acquisition to take effect. Document that ordering; do not silently switch an active document's layout. Preserve Offcanvas's `scroll:true` branch and the existing `Hold` last-owner contract (`src/browser/Lock.ts:45`, `:91`; `src/browser/Hold.ts:82`; `src/browser/Modal.ts:151`; `src/browser/Offcanvas.ts:60`).

**Intrinsic collapse mechanics.** Keep measured pixels by default and for all horizontal panels. For selected vertical panels, own `interpolate-size:allow-keywords` with `Hold`; opening writes zero, establishes the starting style, then writes `height:auto`. Closing may retain the measured current-height start and reflow before clearing the inline height to the `.collapsing` zero endpoint. That preserves the existing phase derivation: nonempty dimension means showing, empty means hiding (`src/browser/Collapse.ts:96`). Do not change the endpoint to explicit `0px` on hide without repairing that derivation. Keep accordion sibling lookup, veto order, trigger ARIA, transition refusal, reduced motion, abort, and final restoration. Propagate the selected intrinsic policy when this instance creates an accordion sibling; otherwise creation order would select different backends (`src/browser/Collapse.ts:116`). Constraints and content changes can make intrinsic geometry differ from `scrollHeight`; prove and document those as opt-in differences, not stage A equivalence.

**Floating mechanics.** `topmost:true` owns `popover="manual"`, preserving any prior attribute, and promotes only after the component show veto and insertion have succeeded. Dropdown still uses its existing inside/outside clearing, Escape route, disabled refusal, ARIA, and synchronous events. Tips keep trigger combination, delays, delegated children, content replacement, description tokens, modal coupling, and animation completion. Pass the selected option to delegated children. Keep the panel promoted through its fade; leave the top layer on accepted completion or destroy, and release native state even where stage A disposal intentionally leaves author classes. Native beforetoggle cancellation must abort opening without publishing a false visible/shown state. External native closing must reconcile class/ARIA/placement resources once; it cannot acquire a Bootstrap hide veto after the close has happened (`src/browser/Dropdown.ts:81`, `:196`; `src/browser/Tip.ts:159`, `:233`, `:302`).

Promotion is a separate lifetime from `Placement`; do not make every reusable Placement automatically open a popover. Correct placement only after the panel has entered the intended containing context. Keep synchronous resolved-side publication, bounded correction, RTL, named fallbacks, restoration, and inline edge-clamped arrow placement (`src/browser/Placement.ts:199`, `:299`, `:457`). A static/navbar dropdown must retain its sheet-derived box when promoted, through an owned geometry snapshot and event-driven updates; it keeps `data-bs-popper="static"` and never silently becomes the dynamic placement branch. This path is an implementation obligation, and missing proof blocks its acceptance. Use `POPOVER_STATE` for an invalid native host state or a failed native operation. Native cancellation itself is a no-op, not that error.

A floating panel inside an active native modal must be in that modal's interactive subtree. For a selected native tip, require an explicit compatible `container` when the usual body container lies outside that subtree; throw `TIP_CONTAINER` before insertion on a mismatch. Do not silently reparent the consumer's panel or promote toasts/offcanvas. The native insertion order is the contract; do not continually reopen panels to simulate Bootstrap's z-index ordering. Both the earlier feasibility reading and this pass leave outside-modal pixel compositing unproved (`tmp/units/browser-feasibility-report.md:37`).

**CSS placement and alternatives.** Put static native-host normalization in the consumer's sheet, with executable guide recipes. Keep `src/bootstrap` as the pinned lifted Bootstrap face and keep the engine's constructed stylesheet restricted to its existing generated placement rules. Neither needs a global native reset. The dialog recipe is:

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
dialog.modal[open] { display: block; }
dialog.modal::backdrop { background: transparent; }
```

The manual tooltip recipe must additionally neutralize its UA border, padding, background, margins, maximum dimensions, and overflow before placement. Do not apply the tooltip's transparent/borderless reset to Bootstrap popovers, whose sheet defines a visible container. Arrow coordinates remain engine-owned inline geometry, as in stage A; replacing them with `left:50%` would fail shifted and flipped cases. Gutter and interpolation declarations are lifetime-owned inline mechanism writes, restored through `Hold`, not new theme rules. Consumer rules use the cascade choices already defined at `ROADMAP.md:21`: no invented layer order, no engine-injected `!important`, and no promise that an earlier layer beats unlayered Bootstrap. A consumer can put the native rules in its later component layer with the lifted sheet, or load the scoped unlayered rules after bundled Bootstrap.

Accept markup plus the explicit dialog-enabled plugin, typed gutter/intrinsic/topmost options, and caller-composed replacements. Reject automatic platform detection as a change to the default; reject separate native component implementations, a compulsory native collection, auto/hint popovers, inert-only focus trapping, intrinsic horizontal width, and toast/offcanvas promotion. None of the requested capabilities is disproved as an explicit option. The raw tooltip promotion recipe is disproved and must not ship unchanged. No speed improvement is established by these measurements.

**Files, departures, acceptance proofs.** Shared contract/wiring changes touch `src/browser/{types,plugins,helpers}.ts`, `src/core/types.ts`, corresponding tests, the guide and roadmap. Overlay work owns `Modal.ts`, `Lock.ts`, `Offcanvas.ts` and their mirrors, with native Backdrop/Trap composition cases; existing `Hold.ts` needs no algorithm change. Disclosure work owns `Collapse.ts` and its mirror. Floating work owns `Dropdown.ts`, `Tip.ts`, `Placement.ts`, their mirrors, and any required footprint constants. Harness additions belong to `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, and the family ledger in `tests/setup.ts`.

| New departure scenarios | Owning proof and required readings |
| --- | --- |
| `modal-dialog`, `modal-dialog-focus`, `modal-dialog-close` | `Modal.test.ts`: native open/closedby writes, `:modal`, focus with both focus settings, cancel/close/beforetoggle, preserved div backdrop, forced close, destroy during opening/closing, and same-markup Bootstrap controls. |
| `gutter-lock`, `gutter-overlap`, `gutter-modal` | `Lock.test.ts`, `Modal.test.ts`, `Offcanvas.test.ts`: classic/overlay scrollbar controls, body/fixed/sticky/RTL boxes, saved attributes, priorities, both acquisition orders, modal padding and final restoration. Give every actual ledger row one owning family. |
| `collapse-intrinsic` | `Collapse.test.ts`: zero/auto writes and animations, constrained/content-changing panels, both directions, sibling creation, veto and destroyed transitions; horizontal and unselected vertical cases remain stage A controls. |
| `dropdown-topmost`, `tooltip-topmost`, `popover-topmost`, `floating-layer-order` | Floating family tests: native/class visibility agreement, cancellation, external closing, static and dynamic menus, normalized UA boxes, arrows within 1 px where parity is claimed, clipping/transforms/RTL, modal container ancestry, re-show ordering and no surviving native open state on destroy. |

These are proposed scenario keys, not fabricated final transcript cells. Generate cells from the implemented branch and its oracle, consume them bidirectionally, and refuse unconsumed rows. Preserve the stage A rows and controls for route/clear ordering, `trap-owner`, overlapping locks, saved attributes/priority, destruction, ordinary anchors, arrows, restoration, shared tips, description ownership, and direction. Do not rewrite those controls to exercise the native option instead. Broader configuration coverage, standalone focus wrapping, and pixel compositing remain proof limits of this design pass.

# D4 — Remainder items

**R13: keep ownership; add the measured departure and its proof.** The existing per-lifetime listeners are not Bootstrap's deduplicated listener. The fresh `touch-listeners-stage-b` probe used CDP's real `DOM.resolveNode` and `DOMDebugger.getEventListeners`, with a sentinel control measuring `0 → 1 → 0`. Showing a tooltip, showing a dropdown, hiding the tooltip, then hiding the dropdown measured Bootstrap `[1,1,0,0]` and Veneer `[1,2,1,0]`. This ran in the successful D3 command and is retained in its measurement artifact. It closes the previous reader's zero-count ambiguity.

Keep the surviving owner's workaround rather than making one component's hide remove another's listener. Add `touch-ownership` rows for overlap and first release, owned by one composition proof in `tests/src/browser/integration.test.ts`; retain single-family touch and navbar-exemption controls in `Dropdown.test.ts` and `Tip.test.ts`. Add the CDP reader with its sentinel to the oracle harness. No public type or error changes. Reject both “moot because noop” and an unmeasured shared-listener rewrite: native listener population is observable, and Bootstrap's deduplication changes release semantics (`src/browser/Dropdown.ts:129`; `src/browser/Tip.ts:220`; `node_modules/bootstrap/js/src/dom/event-handler.js:165`; `node_modules/bootstrap/js/src/dropdown.js:197`). A later counted shared implementation could reduce listener population, but it would still depart at first release and is unnecessary to close this item.

**M1: add the missing live-token proof; keep the implementation.** Show a tip with an author token, add a second page token and remove the original while shown, then hide. Assert that only the current page token remains; repeat through destroy and with both tip profiles sharing a host. Also test the author removing the panel token itself. Bootstrap's own frame supplies the overwrite/removal control. Extend `tip-description` with the changed live-token scenarios and let `Tip.test.ts` consume them. Do not replace the live token set with a snapshot or restore the author's removed token (`src/browser/Tip.ts:194`, `:293`; `guides/veneer.md:920`; `tests/src/browser/Tip.test.ts:1452`). No public contract or error changes.

**M4: record stylesheet masking explicitly; do not change anchor ownership.** Add `anchor-stylesheet` rows to the Placement family. Read the reference's computed author anchor and an independently authored anchored dependent before, during, and after the lifetime in both implementations. Normalize only the generated engine identifier. Bootstrap leaves the stylesheet name effective; Veneer's inline list temporarily masks it and release reveals it. Retain separate controls for an inline author name and an important stylesheet declaration. This reading must bypass the general transcript exclusion of engine anchor properties; deleting that exclusion globally would flood existing placement transcripts with irrelevant serialization (`src/browser/Placement.ts:58`, `:162`, `:205`; `tests/src/browser/Placement.test.ts:96`; `guides/veneer.md:604`; `../scaffold/.orkestrel/veneer/browser-design-verdict.md:27`).

Do not copy computed stylesheet names into inline ownership: that would freeze cascade-dependent author state and complicate final release. The change is a dedicated computed-value/geometry reader in the harness, a bidirectional `Placement.test.ts` case, and guide rows. No new public type or error. R7 needs no code or record repair: the standing verdict already says capture routes followed by bubble clears (`../scaffold/.orkestrel/veneer/browser-convention-verdict.md:50`, `:63`).

# D5 — Implementation units

**Rule:** land the rename and explicit boot migration before native family work. Prepare shared declarations and proof infrastructure serially, then run disjoint family writers in separate worktrees. Serialize guide/departure integration after measured family results. This pass supplies design contracts; it does not authorize a writer to invent additional shared shapes during integration (`../scaffold/.agents/orchestration.md:68`).

| Unit / engine | Exclusive ownership | Order and acceptance |
| --- | --- | --- |
| Scope migration — GPT-6 Astra, objective | D2's API-bearing source/test/app files, renamed scope mirror, D1 plugin changes; both setup sections needed for the migration; only affected API/boot guide and roadmap text | First. Atomically rename public types/errors and every actual consumer; select the app's prior Bootstrap/tip behavior explicitly. Keep generic engine terminology. Prove blank boot, opt-in boot, ownership and distribution reachability. Log cross-lane changes before landing. |
| Native contracts and wiring — GPT-6 Astra, objective | `src/browser/{types,plugins,helpers,constants}.ts`, `src/core/types.ts`, their mirrored tests and barrel inventory where needed | After scope migration. Land the exact D3 option propagation, defaults, native error codes and required footprints. Own all shared kind-file edits; family writers return findings or exact predesigned patches to this owner, never edit these files concurrently. |
| Native oracle infrastructure — GPT-6 Astra, objective | `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/setup.ts`, `tests/setup.test.ts` | After scope migration; may run beside native wiring because ownership is disjoint. Add native-state/geometry readers, CDP sentinel reader and family ledger entries. Preserve both setup sections and all existing comparator controls. |
| Native overlays — GPT-6 Astra, objective | `src/browser/{Modal,Offcanvas,Lock,Backdrop,Trap}.ts` and their mirrored tests | After wiring and harness. Implement dialog and gutter lifetimes together because Modal consumes Lock compensation. Keep Hold's algorithm; additional Hold proofs, if needed, belong exclusively to this unit. |
| Intrinsic disclosure — GPT-6 Astra, objective | `src/browser/Collapse.ts`, `tests/src/browser/Collapse.test.ts` | Parallel with overlays and floating. Prove option inheritance to created siblings, phase derivation, constraints, horizontal control and teardown. |
| Native floating and remainder — GPT-6 Astra, objective | `src/browser/{Tip,Dropdown,Placement}.ts`, their mirrored tests, `tests/src/browser/integration.test.ts` | Parallel with overlays and disclosure. Close native lifetimes, placement, R13, M1 and M4 together; their implementation/test ownership overlaps. Use the completed harness; report shared-file needs to its owner. |
| Contract and guide completion — Claude Opus 5.5, subjective | `guides/veneer.md`, `ROADMAP.md`; planned lanes-log text | After family evidence. Write the final examples, TSDoc/guide parity descriptions, native CSS prerequisites, limitations, and measured departure cells. Shared TSDoc changes go through the contract owner. No Bootstrap face CSS changes. |
| Integration and verification — GPT-6 Astra for objective integration; dispatched verifier for gates | Integration-only tests and generated `showcase/browser.html`; no concurrent family writer | Rebuild the showcase from the merged tree, run project/journey checks, conduct the prescribed independent falsify round, then tree-wide gates once. Review by an engine other than the implementation writer; do not claim the design probe as implementation acceptance. |

Each family runs its touched files and browser project/check. The landing verification also covers source core, setup/browser setup, app browser, guides, distribution, and journeys. Types and negative assignability checks precede implementations; all failures use the declared `VeneerErrorCode` union. D5 introduces no additional public type, error, or departure beyond D1–D4.

**Required lanes-log entries.** Before landing, append the concrete migration and predicted rows to `../scaffold/.orkestrel/veneer/lanes.md`, under its rules at `:34`. This read-only pass does not append there. State that `app/browser/main.ts`, the app boot tests, and both sections of `tests/setupBrowser.ts` migrate in the same change; no static app value import enters the harness. State that the generated page is rebuilt, not merged by hand (`lanes.md:36`).

For the preserved showcase composition, the prediction is **no outcome changes**. Name these regression-sensitive rows in that entry rather than granting a generic native-work exemption:

| Table / journey | Rows to name and preserve |
| --- | --- |
| `tooltip` | `Hint above through hover`, `Hint above through focus`, `Hint above through leave`, `Hint above through blur`, and the `Dialog hint through …` rows (`tests/setupBrowser.ts:2097`, `:3046`). |
| `popover` | `Customs status false through click`, `Customs status true through click`, and the Enter/Space/Escape rows; `More context` rows remain live (`tests/setupBrowser.ts:2148`, `:2180`). |
| `dropdown` | `Example menu … through …` rows, including nested modal Escape ordering (`tests/setupBrowser.ts:2926`). |
| `modal` | `Open the archive dialog through open:click`, `… through tab:shown`, `… through escape:shown`, `… through backdrop:shown`; static-dialog refusal rows (`tests/setupBrowser.ts:2847`). |
| `collapse`, `accordion`, `navbar-390`, `navbar-1280` | `Depot hours hidden through click`, `Depot hours shown through click`, transition-refusal rows, and `Field notes hidden through {Escape}` (`tests/setupBrowser.ts:1583`, `:1706`, `:3098`, `:3453`). |
| `offcanvas`, responsive-offcanvas tables | Existing open, close, trapped-Tab and responsive in-flow rows (`tests/setupBrowser.ts:2743`, `:3128`). |
| J8 and frozen refusal | `J8 drives the engine through the component sections and opens nothing on arrival`; `leaves every frozen-state specimen where it was drawn when the engine runs` (`tests/app/browser/integration.test.ts:367`, `:537`). |

Do not convert existing showcase specimens to native hosts as an incidental migration. Native acceptance fixtures exercise the new contracts separately. If a later showcase unit adds native specimens, log its exact new table/row names and intentional departures before it lands. A failure of the retained Bootstrap specimen is a regression, not permission to rewrite its expectation. This follows `../scaffold/.orkestrel/veneer/lanes.md:39` and `:43`.

**What this pass could not decide**

- It cannot certify implementation coverage that does not exist yet: constrained intrinsic-height behavior, promoted static/navbar menus, native-close reentrancy, and complete floating geometry need the named writer proofs.
- The iframe measurements establish neither standalone Tab wrapping nor outside-modal pixel compositing, assistive-technology announcement order, or a performance gain.
- Final native departure cells must come from the implemented branches. The scenario ownership and measured constraints above are decided; invented transcript values are not a substitute for those runs.
