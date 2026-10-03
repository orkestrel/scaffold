# Browser stage B design verdict

This verdict was reconciled on 2026-10-03 from the brief `tmp/units/stage-b-wide-design-brief.md`. Its inputs are:

- the three blind subjective planners: **parity** (Bootstrap parity first), **native** (native platform first), and **consumer** (blank-slate consumer first);
- the objective W4 Veneer styles inventory (**styles**).

Every code citation was checked at veneer `main` `9885975`. The design builds on the `veneer-boot` shapes in `tmp/units/stage-b-design-agent-2.md:241-284`, with the user's later rulings applied: `toggle.vn.button` stays, and `createVeneer` with no plugins routes nothing (`scaffold/.orkestrel/veneer/browser-design-verdict.md:75-76`). All measurements are Chromium 153.0.8010.12 through Playwright 1.63.0.

Citations use these shortened roots:

| Short form | Path |
| --- | --- |
| `sbm` | `tmp/codex/stage-b-measurements.md` |
| `cdx` | `tmp/codex/browser-stage-b-design-verdict.md` |
| `feas` | `tmp/units/browser-feasibility-report.md` |
| `judge` | `tmp/units/stage-b-design-agent-2.md` |
| `nrN` | `tmp/units/native-research-agent-N.md` |
| `niN` | `tmp/units/native-inventory-N.md` |
| `dv` | `scaffold/.orkestrel/veneer/browser-design-verdict.md` |
| `cv` | `scaffold/.orkestrel/veneer/browser-convention-verdict.md` |
| `G` | `guides/veneer.md` |
| `RM` | `ROADMAP.md` |

## Decision

Stage B sorts every candidate into one of five outcomes.

- **Added now:**
  - `<dialog>` hosting for the modal, opted in by `ModalOptions.dialog` and `ModalPluginOptions.dialog`.
  - The reserved-gutter scroll lock, opted in when the author declares a stable `scrollbar-gutter` on the root element. No option controls it.
- **Added behind a gate:**
  - Top-layer floating panels: the `topmost` leaf on the dropdown, tooltip, and popover.
  - Intrinsic vertical collapse: the `intrinsic` leaf.
  - A gated contract slice lands only with the unit whose gate reading shows the gain. If the reading shows no gain, the unit returns "drop", and the capability and its types never land.
- **Deferred, each blocked by a named reading:**
  - `<dialog>` hosting for the offcanvas panel;
  - `hidden="until-found"` reveal on collapse panels and tab panes;
  - `CloseWatcher`, together with Android Back;
  - custom `--` invoker command routes.
- **Refused, with evidence:** every other candidate the inventories and research name.
- **Stage A risk, measured outside stage B:** the floating panels' initial `position-visibility` (probe P0).

Every planner agrees that a page that never opts in keeps stage A byte for byte. Under this verdict, such a page sets no stage B leaf and declares no stable root `scrollbar-gutter`.

- The trigger properties appear in no file under `src/` or `app/`. The pattern was `scrollbar-gutter|interpolate-size|popover=|<dialog|showModal|commandfor|closedby|position-visibility`, run in this pass.
- The only `until-found` text is Tailwind's preflight exemption inside `app/browser/recipe.json:2049-2050`. It triggers nothing, because until-found is deferred.

## The opt-in rule

Every stage B surface opts in through exactly one of three shapes. The test that picks the shape is whether Bootstrap's own engine behaves correctly on the same markup and CSS. This takes native's three-shape rule, narrows detection, and answers the inconsistency the judge flagged (`judge:167-170`).

1. **Typed leaf: used when Bootstrap's engine works on that markup.**
   - The leaf is a top-level boolean on `{Entity}Options`, defaulting to `false`.
   - The same leaf sits in a narrow `{Entity}PluginOptions` record. `create{Entity}Plugin(options?)` (`scaffold/.claude/rules/architecture.md:214-215`) passes it to every component that the plugin's routes or boot build.
   - Markup never sets a leaf. `resolveModalOptions` and its siblings read only Bootstrap's keys from the markup record and spread the typed options over them (`src/browser/helpers.ts:350-366`, `:328-340`).
   - This shape covers `dialog`, `topmost`, and `intrinsic`.
2. **Detected author declaration: used only where Bootstrap's own engine is measurably defective under what the author wrote.**
   - Detection moves no page that works correctly under Bootstrap.
   - **Root stable `scrollbar-gutter`:** Bootstrap adds 15 px of body padding on top of the gutter (`cdx:211`; `sbm:78`).
   - **`hidden="until-found"` on a `.collapse` panel:** when it returns, it uses this shape. Under Bootstrap that markup never shows at all (`sbm:133`).
3. **Plugin-only option: used for a boot scan,** which has no component meaning. This covers `boot` (`judge:245-248`).

The rest of the rule:

- **Plugin option records stay narrow.** A plugin options record carries only that family's stage B leaves, plus `boot` on the tips. A record carrying full component options is refused. It would expand the capability with no consumer (AGENTS.md, Minimal public API). Its typed leaves would also outrank markup, while Bootstrap's `Default` sits beneath markup (consumer, Alternatives 2).
- **Scenario prefixes.** Departure rows use the prefix `{family}-{leaf}`, or `{family}-{declaration}` for a detected declaration. Sub-scenarios follow after `:`.
- **Departure table lead sentence.** The lead of `### Engine departures` (`G:667`) becomes: "every deliberate difference between Bootstrap's JavaScript and the engine on identical markup and configuration, or under the opt-in its Scenario prefix names".

---

## W1: per subject

### Where the planners agree

All three planners agree on these points.

- **Native surfaces added nowhere:** Alert, Button, Carousel with `Swipe`, Scrollspy, Tab, and Toast.
- **`<dialog>` modal hosting is added.**
  - It runs only on a realm-aware `HTMLDialogElement` host.
  - `closedby="none"` is held through `Hold` while the dialog shows.
  - `showModal()` is called at the `display: block` write (`src/browser/Modal.ts:197`), and `close()` at the `display: none` write (`:217`).
  - `Backdrop`, `Trap`, and `Lock` are kept, and Escape stays on the keydown listener (`:55-63`).
  - The private field `#dialog` (`:18`) is renamed `#content`.
- **The two controls produce no row:** a `<dialog>` host without the leaf, and the leaf on a `div` host.
- **`LockInterface.width` keeps its documented meaning** (`src/browser/types.ts:2218`). The judge's redefinition (`judge:309`) is overruled. `Modal.update` reads a separate compensation value (`src/browser/Modal.ts:151`).
- **Floating panels keep `Placement`** with explicit anchor pairs. Promotion is a separate lifetime (`cdx:228`). `.show` stays the open authority. Only `popover="manual"` is admissible.
- **Offcanvas `<dialog>` is not shipped in stage B.**
- **Refused everywhere:**
  - `popover="auto"` and `popover="hint"`;
  - `<details>`;
  - `@starting-style` and View Transitions;
  - `inert` as a trap;
  - `::backdrop` as the scrim;
  - `:has(dialog:modal)` as a lock;
  - `moveBefore`, `checkVisibility`, and `focus({ focusVisible })`;
  - `ariaNotify`;
  - toast promotion;
  - CSS carousel pseudo-elements, scroll snap, and snap events.

### Disagreements, ruled

1. **Gutter opt-in: detection (parity, native) against a typed `gutter` leaf with an engine-written gutter (consumer, `cdx:174-202`). Ruled: detection.**
   - The typed leaf writes root layout policy the author never declared.
   - It needs first-owner precedence, because the lock is shared across the document: a leaf on one overlay cannot choose the policy for another (`cdx:222`). Layout would then depend on open order, a risk consumer itself names.
   - Detection fixes a measured defect on exactly the pages that declare the gutter. On every other page it leaves Bootstrap's working compensation alone.
   - The brief admits a detected author declaration as an opt-in shape.
   - The cost is coupling with any sheet that declares a root gutter, including a later `./styles`. That goes to the user (decision D-5 in W4).
2. **Top-layer floats: defer (parity) against add (native, consumer, `judge:146-152`). Ruled: add, gated.**
   - The departure is measured: insertion order replaces the `z-index` scale (`cdx:216`).
   - Promoted geometry matches Popper: the menu box at (70, 212) (`cdx:213`), and the arrow within 0.141 px after neutralization (`cdx:214`).
   - The gain is unmeasured: escaping a clipping ancestor that also carries a `transform`. Stage A's fixed anchors already escape plain overflow clipping (`tmp/units/stage-b-design-agent-1.md:363`). Parity's gate therefore becomes the floating unit's first reading.
3. **Intrinsic collapse: defer (parity) against conditional add (native, consumer, `judge:141-143`). Ruled: add, gated, with the same mechanism.**
   - The measured motion is equal: 368 ms against 349 ms (`feas:21`).
   - The only gain left is following content that resizes mid-transition (`judge:164-165`). The gate is that reading, and a null result drops the piece (`judge:315`).
   - The shape is a typed leaf, not detection. A root `interpolate-size` from any reset leaves the engine untouched.
4. **Native close and command routes on a dialog host: refuse routing (parity) against routing through the hide gate (native, consumer). Ruled: route.**
   - Parity's refusal rests on `closedby="none"` disabling the watcher. That holds for user close requests only:
     - `requestClose()` enables the watcher and always fires a cancelable `cancel` (`nr7:60`, `:126`).
     - The `request-close`, `close`, and `show-modal` commands performed their actions in Chromium 153 (`sbm:174`).
   - An unrouted native show or close strands the engine's state. A native `show-modal` would leave a modal, inert page under Bootstrap's `.modal { display: none }`.
5. **Forced native close (`dialog.close()` from page code, or a `form[method=dialog]` submit): dispatch only `hidden` (parity) against a non-cancelable `hide.bs.modal` (native). Ruled: dispatch `hide.bs.modal` with `cancelable: false`, then the close path and `hidden`.**
   - A tip hides on its closest modal's `hide.bs.modal` (`src/browser/Tip.ts:95-97`). Skipping that event leaves tips inside a force-closed modal shown.
   - The same rule covers an external `hidePopover()` on a `topmost` panel.
   - The guide sentence "Every `.bs.` event is cancelable" (`G:596`) gains this exception.
6. **`hidden="until-found"`: add by detection (native) against defer (parity, consumer). Ruled: defer, with the shape fixed in advance as markup detection.**
   - The integrated reveal is unmeasured: the engine's forced show, accordion siblings, scroll position, and a padded panel. `sbm:139` leaves it open.
   - The fence needs `!important` to beat `src/bootstrap/_reset.scss:382`.
7. **A `topmost` tip whose trigger sits in an open modal dialog: resolve the container to the dialog (native), throw `TIP_CONTAINER` (`cdx:230`), or state a guide limit (parity, consumer). Ruled: the guide limit, with no reparenting and no throw.**
   - An automatic container changes the tip's DOM parent based on runtime state.
   - A throw breaks non-interactive tooltips that paint correctly.
   - The floating unit's compositing reading decides the guide sentence: whether a body-level `topmost` tip paints over a dialog modal (`feas:37`).
8. **Float leaf name: `popover` (parity), `position.popover` (`judge:318`), or `topmost` (native, consumer, `cdx:186`). Ruled: `topmost`.**
   - `PopoverOptions.popover` and `createPopoverPlugin({ popover: true })` collide with the profile name.
   - Every `position` leaf projects a Bootstrap key (`src/browser/types.ts:934-1006`).
   - `Tip` spreads `position` into `Placement` (`src/browser/Tip.ts:205-215`).
   - The TSDoc states the insertion-order stacking, so the name claims only top-layer entry.
9. **Lock context boolean: `gutter` (native, `cdx:202`) against `reserved` (parity). Ruled: `reserved`.**
   - A boolean reads as an assertion (`scaffold/.claude/rules/names.md:115`).
   - Under detection, the fact recorded is that the root reserved the gutter.
10. **Error code: `MODAL_OPEN` (parity, consumer), `MODAL_DIALOG` (native), or `MODAL_STATE` (`cdx:220`). Ruled: `MODAL_OPEN`, thrown synchronously before `show.bs.modal` dispatches.**
    - `showModal()` runs after the backdrop wait inside the async `#open` (`src/browser/Modal.ts:190-197`), so a native throw there cannot reach the caller of `show()`.
    - The synchronous precheck catches the programmer error: the host already carries `open`.
    - A late native refusal rolls back and reports through the realm's `reportError`, carrying no code. A cancelled `beforetoggle` is one example.
11. **Offcanvas top layer: defer `popover="manual"` (native) against refuse (parity, consumer). Ruled: refuse `manual`.** The top-layer need folds into the deferred `<dialog>` gate, so one host path serves it.
12. **Toast top layer: defer (native) against refuse (parity, consumer). Ruled: refuse.**
    - A promoted body-level toast stays inert under a modal (`sbm:105`).
    - Promotion takes the toast out of `.toast-container` layout (`dv:12`).
13. **The remaining split rulings:**
    - **`scrollIntoView({ container })`** (native defers): refused. It selects a different container and alignment from Bootstrap's `offsetTop` delta (`sbm:117`; `nr5:67`).
    - **ARIA element reflection** (consumer defers): refused. The setter empties the attribute (`sbm:119`), which breaks the per-owner token list (`cv:151`).
    - **`interestfor`** (native defers): refused. See the Tooltip table.
14. **`dialog.modal[open] { display: block }`: keep (parity, native) against drop (consumer). Ruled: drop, conditional on B3's equality reading without it.** The engine's inline writes at `src/browser/Modal.ts:197` and `:217` decide display. The feasibility recipe (`feas:13`) ran without those writes.
15. **Where the stylesheet fence sits: unlayered (`cdx:248`, parity) against `@layer reset` (consumer, styles). Ruled: `@layer reset`.**
    - A reset-layer rule beats the user-agent origin and loses to every Bootstrap declaration, in the lifted sheet and the drop-in alike (`RM:26`, `:42`).
    - One uniform `[popover]` reset therefore keeps `.popover`'s border and fill (`src/bootstrap/components/_popover.scss:44-46`) without per-class tailoring.
    - It is also the layer `./styles` owns (`RM:37`), so chunk 3 takes the rules over verbatim.

### Claims flagged

These claims are false at the tip, contradicted by a measurement, or unmeasured.

- **Native:** "The tip grep found no … `until-found` … under `src` or `app`." This is false: `app/browser/recipe.json:2049-2050` carries `until-found` twice, inside Tailwind's preflight text. It triggers nothing.
- **`cdx:224`:** cites the collapse phase derivation at `src/browser/Collapse.ts:96`. It sits at `:91-92`.
- **`nr6:32`:** says `request-close` sits behind a flag at M139. `sbm:174` contradicts it: the command performed its action in Chromium 153.
- **`nr1:63-72`:** leaves the initial `position-visibility` value disputed. `sbm:52` and `nr9:40` settle it as `anchors-visible`.
- **Parity's Modal row** "`requestClose`, `request-close`, `CloseWatcher`: Refuse, `closedby="none"` disables the watcher" is contradicted by `nr7:60`, `nr7:126`, and `sbm:174`, as disagreement 4 explains.
- **Parity's W4 claim** that the dialog reset "is safe to ship by default" because Bootstrap's own path on a `<dialog>` host renders with user-agent borders follows from the user-agent rules (`nr3:128-133`). It is unmeasured.

### Per-subject rulings

Each table rules on every candidate for its subject. "W2" means the cross-cutting ruling decides it.

#### Alert

Nothing is added to the alert.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `@starting-style`, `allow-discrete` | Refuse | Close removes `show` without a display flip (`ni1:12`); the stage A refusal stands (`dv:12`) |
| Popover host | Refuse | The alert is in-flow, and `closed.bs.alert` fires on the removed node; a closing `beforetoggle` cannot be cancelled (`sbm:23`) |
| `ariaNotify` | Refuse | It duplicates the markup's live region; only a tree change was measured, not speech (`sbm:103`) |
| Custom `--close` command | Defer (W2) | No consumer |
| `CloseWatcher`, `inert`, `focusgroup`, size tweens | Refuse | No Escape path, no focus move, and no size tween (`ni1:15`) |

#### Button

Nothing is added to the button.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| Native pressed toggle, checkbox `switch` | Refuse | HTML has no pressed toggle, and `switch` is not in Chromium 153 (`nr6:28-30`) |
| Invoker commands | W2 | |
| `toggle.vn.button` | Unchanged | User ruling 5 (`dv:76`) |

#### Carousel and `Swipe`

Nothing is added to the carousel.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| View Transitions, document-scoped and element-scoped | Refuse | Completion runs on its own clock; under reduced motion the 250 ms pseudo-element animations remain (`sbm:159-166`) |
| `::scroll-marker`, `::scroll-button()`, `scroll-target-group`, scroll snap | Refuse | No `slide` or `slid` event, and no `active` or `aria-current` writes (`sbm:147`) |
| `scrollsnapchange`, `scrollend` | Refuse | They cannot veto and carry no class contract (`nr2:118`) |
| Scroll-driven animations, scroll-state queries | Refuse | No contract to carry (`nr0:121-123`; `nr2:111`) |
| Pointer events, `getAnimations`, `Animation.finish()` | Kept | Stage A |

#### Collapse and accordions

The collapse gains the gated `intrinsic` leaf.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `interpolate-size` vertical | **Add, gated** (B4) | Equal motion (`feas:21`); the gate is a content resize mid-transition (`judge:315`) |
| `interpolate-size` horizontal | Refuse | Auto width finished at 300 px while `scrollWidth` was 120 px (`ni1:47`) |
| `calc-size()` | Refuse | No gain over `auto` under `allow-keywords`; it was not the probe that ran (`ni1:47`) |
| `<details>`, `name`, `::details-content` | Refuse | `toggle` is not cancelable, the sibling closes despite a veto, and no completion signal exists (`sbm:135-139`) |
| `hidden="until-found"`, `beforematch` | **Defer** | Gate G2: a fragment reveal into a closed `.collapse` under the fence, with the engine's forced show, accordion siblings, scroll position, and a padded panel (`sbm:133`, `:139`) |
| Invoker commands | W2 | |

#### Dropdown

The dropdown gains the gated `topmost` leaf on its dynamic path.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `popover="manual"` top layer, dynamic path | **Add, gated** (B5) | Promotion matches Popper's box (`cdx:213`); the gate is the clip-escape reading |
| `topmost` on the static or navbar path | Refuse | A navbar menu is in flow (`src/browser/Dropdown.ts:90-94`); the geometry snapshot `cdx:228` demands is refused by native and consumer |
| `popover="auto"` | Refuse | The close veto is lost (`sbm:23`, `:32`); `inside` and `outside` cannot be expressed (`dv:12`) |
| Popover invoker commands | Refuse | The attribute exists only while the menu shows; Bootstrap's click prevention suppresses the command (`sbm:176`) |
| `focusgroup="menu"` | Refuse | It duplicates the keydown route (`src/browser/plugins.ts:141-173`); menus wrap and Bootstrap's keys do not (`nr2:153`) |
| `CloseWatcher` | W2 | |
| `position-visibility`, `anchor-scope`, anchored container queries, `showPopover({ source })` anchoring | Refuse as additions | Names are unique; the inline arrow is within 1 px (`G:604`); source-only geometry is unmeasured (`ni2:110`); P0 covers the stage A risk |

#### Modal

The modal gains the `dialog` leaf now; its full specification follows the per-subject tables.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `<dialog>` with `showModal()` | **Add** | Measured recipe and controls (`cdx:210`); the accessibility tree reports the dialog as modal and excludes outside nodes (`sbm:93`) |
| `closedby="none"` | **Add**, within `dialog` | Escape reaches the keydown path with no `cancel` (`cdx:210`) |
| `closedby="any"` or `"closerequest"` | Refuse | `cancel` becomes non-cancelable without activation and on repeat (`sbm:24`) |
| Built-in `show-modal`, `close`, `request-close` commands, and script `requestClose()` | **Add**, within `dialog` | Disagreement 4 |
| `::backdrop` as the scrim | Refuse | The `div` backdrop is a transcript node (`ni2:14`); the native backdrop is made transparent |
| `inert`, `focusgroup`, `focus({ focusVisible })` | Refuse | `inert` does not wrap focus (`feas:23`); Bootstrap passes no focus options (`nr5:46`) |
| `@starting-style` fade | Refuse | Equal motion (`feas:19`) |
| `:has(dialog:modal)` lock, `overscroll-behavior` | Refuse | It unlocks at `close()`, before the transition (`nr8:66`); containment alone lets the page scroll over the backdrop (`sbm:72`) |
| `moveBefore` for the append at `src/browser/Modal.ts:196` | Refuse | The host is disconnected or unshown when moved; a root mismatch throws (`nr5:63`) |

#### Offcanvas

The offcanvas inherits the gutter lock and gains no leaf.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `<dialog class="offcanvas">` | **Defer** | Gate G1: `showModal()` for `scroll: false` and `show()` for `scroll: true`, across the `.offcanvas-{bp}` breakpoint crossing; no reading exists (`ni2:26`) |
| `popover="manual"` or `popover="auto"` | Refuse | Under a hide veto, `.show` remains while the native surface closes (`sbm:33`); responsive in-flow variants (`dv:39`); disagreement 11 |
| `closedby`, `CloseWatcher` | Refuse; W2 | |
| Reserved gutter | Inherited from `Lock` | No offcanvas leaf |

#### Popover and Tooltip

Both tip profiles gain the gated `topmost` leaf.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `popover="manual"` | **Add, gated** (B5) | The neutralized recipe matches Popper within 0.141 px (`cdx:214`) |
| `popover="hint"` | Refuse | One hint replaces another, while Bootstrap keeps independent tips (`sbm:47`); its close cannot be vetoed (`sbm:23`) |
| `interestfor`, `::interest-button` | Refuse | It works only on `button`, `a`, and `area` and excludes disabled controls (`nr3:210`, `:223`); Escape's `loseinterest` cannot be cancelled (`sbm:50`); an author `aria-describedby` replaces the native description (`sbm:91`); `::interest-button` is experimental (`nr9:38`) |
| ARIA element reflection | Refuse | Disagreement 13 |
| Automatic container resolution, `TIP_CONTAINER` | Refuse | Disagreement 7 |

#### Scrollspy, Tab, and Toast

These three subjects gain nothing.

| Subject | Candidate | Ruling | Evidence |
| --- | --- | --- | --- |
| Scrollspy | `scroll-target-group`, `:target-current` | Refuse | No event and no `active` class (`nr2:104`) |
| Scrollspy | `scrollIntoView({ container })` | Refuse | Disagreement 13 |
| Tab | `focusgroup` | Refuse | Bootstrap's `tabindex="-1"` drops inactive tabs, and focus moves without selecting (`nr2:157-162`) |
| Tab | View Transitions; `hidden` panes; scroll-marker tabs mode | Refuse | `sbm:162`; `dv:12`; not in Chromium 153 (`nr2:71`) |
| Tab | `hidden="until-found"` panes | Defer | It follows G2, plus a `.tab-content > .tab-pane.fade` reading |
| Toast | Top layer | Refuse | Disagreement 12 |
| Toast | `ariaNotify` | Refuse | As for Alert |

#### Shared mechanisms

Most shared mechanisms are unchanged.

- **`Backdrop`:** unchanged. The `div` backdrop stays beneath a transparent `::backdrop` (reading P12).
- **`Trap`:** unchanged and the sole focus wrapper in every configuration.
- **`Lock`:** gains reserved-gutter detection; specified with the added surfaces that follow.
- **`Hold`:** the algorithm is unchanged. Its slots under stage B are `closedby` and, when the gates pass, `popover` and inline `interpolate-size`.
- **`Placement`:** no public change. Promotion is owned by `Dropdown` and `Tip`. P0 can add an inline `position-visibility` write under a stage A unit.
- **Transition wait:** unchanged (W2).
- **Boot scope:** unchanged for pages without leaves. `ModalPluginOptions.dialog` adds one capture route on `command`. The router supports a non-click route event (`src/browser/Engine.ts:66-70`).

---

### Added: Modal `dialog`

#### Contract

The contract adds these declarations.

```ts
// src/browser/types.ts, ModalOptions gains:
/**
 * If `true`, a `<dialog>` host opens with `showModal()` in the browser's top layer and closes with `close()`, holds `closedby="none"` while it shows, and routes its `command` and `cancel` events through `show` and `hide`; if `false`, every host keeps Bootstrap's path. A host that is not a `<dialog>` keeps Bootstrap's path under either value. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly dialog?: boolean

/**
 * Configures the native surfaces of every modal a modal plugin creates.
 *
 * @remarks
 * A factory call with options replaces a plugin-built modal with one built from those options alone, so that call repeats `dialog` to keep the dialog path.
 *
 * @example
 * ```ts
 * const options: ModalPluginOptions = { dialog: true }
 * ```
 */
export interface ModalPluginOptions {
	/** If `true`, every modal the plugin creates takes `ModalOptions.dialog`, and the plugin routes `command` events aimed at a `<dialog class="modal">` host; if `false`, the plugin creates modals on Bootstrap's path and routes no `command` event. Default: `false`. */
	readonly dialog?: boolean
}

// ModalInterface @remarks gains: "Under the `dialog` leaf, the open host covers every ordinary-layer element, so toasts and body-level tips outside it sit beneath it and stay inert while it shows; the browser focuses the host's first focusable descendant before the trap focuses the host at `shown`, and Tab from the last control leaves the document."
// ModalInterface.show gains: "@throws Thrown when the `dialog` leaf is on and the `<dialog>` host already carries `open`: `VeneerError` with code `MODAL_OPEN`."

// src/core/types.ts, VeneerErrorCode gains:
| 'MODAL_OPEN'

// src/browser/plugins.ts
/**
 * Creates the modal plugin without registering components or listeners.
 * @param options - Leaves the plugin passes to every modal it creates. Default: none, so every modal keeps Bootstrap's path.
 * @returns The frozen modal plugin.
 * @example
 * createModalPlugin({ dialog: true })
 */
export function createModalPlugin(options: ModalPluginOptions = {}): PluginInterface<Modal>
```

#### Mechanics

These mechanics are fixed against the tip; B3 owns correctness.

- **Guard.**
  - The dialog path runs only when the leaf is `true` and the host is an instance of its own realm's `HTMLDialogElement`. The guard must be realm-aware, because the oracle runs in a child frame (`judge:183`).
  - Every other combination runs today's code unchanged.
- **`show()`.** On the dialog path, a host that carries `open` throws `MODAL_OPEN` before `show.bs.modal` dispatches, so no event or write precedes the throw.
- **`#open`.**
  - At the `display: block` write (`src/browser/Modal.ts:197`), a `Hold` owned by the modal acquires `closedby` and writes `none`. Then `showModal()` runs.
  - Bootstrap's writes keep their order (`:198-208`). The trap activates at `shown` when `focus` is not `false`.
  - The `open` precheck repeats before `showModal()`.
  - If `showModal()` throws, or the host does not match `:modal` afterwards (a cancelled `beforetoggle`), the open rolls back: `display` returns to `none`, `closedby` is released, the backdrop hides, the lock releases, and no `shown` dispatches. A thrown error is reported through the realm's `reportError`.
- **`#close`.**
  - An engine-started flag is set, `close()` runs at the `display: none` write (`:217`), and `closedby` is released after `this.#lock.release()` (`:227`).
  - `destroy` closes an open host the same way and releases the hold.
- **Host listeners.** On the dialog path, these listeners bind to the host at construction under the lifetime signal:
  - **`command`:**
    - `show-modal` calls `preventDefault()`, then `show(source)` with the event's element source.
    - `close` and `request-close` call `preventDefault()`, then `hide()`.
    - A custom `--` command passes through untouched.
  - **`cancel`:** calls `preventDefault()`, then `hide()`. A script's `requestClose()` therefore passes the `hide.bs.modal` veto.
  - **`close` without the engine-started flag:** a forced close. It dispatches `hide.bs.modal` with `cancelable: false`, then runs the close path, then dispatches `hidden`.
- **Kept unchanged.**
  - Escape stays on keydown (`:55-63`).
  - The backdrop click stays on mousedown plus click against the full-viewport host (`:64-78`).
  - Every other `*.bs.modal` event keeps its cancelability.
- **Plugin route.**
  - Under `dialog: true`, `createModalPlugin` adds a capture route `{ event: 'command', selector: 'dialog.modal' }` with no `execute`. It only builds a missing component, which then handles the event at its own host. This keeps the plugin on the entity's public interface (`scaffold/.claude/rules/architecture.md:216`).
  - A button that carries both `data-bs-toggle="modal"` and `commandfor` gets one lifecycle. The click route shows the modal, and the later command is prevented while `show()` does nothing.
- **Rename.** The private field `#dialog` becomes `#content`.

#### Departure rows

All rows use the `modal-dialog` prefix, and `Modal.test.ts` consumes them. Each Bootstrap value is Bootstrap's engine on the identical `<dialog class="modal">` host. Final cells come from the implemented branch (`cdx:261`).

| Scenario | Path | Bootstrap | Engine |
| --- | --- | --- | --- |
| `modal-dialog` | `$::open` | `<absent>` | `""` while shown |
| `modal-dialog` | `$::closedby` | `<absent>` | `none` while shown |
| `modal-dialog` | `$::modal` | `false` | `true` |
| `modal-dialog:focus` | `$::focus` between show and shown | opener | first focusable descendant (`sbm:57`) |
| `modal-dialog:tab` | `$::focus` after Tab from the last control | first control | outside the document |
| `modal-dialog:focus-off` | `$::focus` on an outside control, `focus: false` | outside control | refused |
| `modal-dialog:order` | hit order against a body toast and a body tooltip | toast, tooltip | dialog |
| `modal-dialog:command` | events and classes after a native `show-modal` | native open, no `.show`, no events | full show lifecycle |
| `modal-dialog:cancel` | events and classes after `requestClose()` | native close, `.show` remains (`sbm:34`) | hide gate |
| `modal-dialog:close` | events after a direct `close()` | native close, `.show` remains | `hide` with `cancelable: false`, then `hidden` |

#### Stylesheet

The rules live in your stylesheet, published as an executed guide fence under `### Opt into native surfaces`. The harness loads the fence in both realms.

```css
@layer reset {
	dialog.modal {
		margin: 0;
		border: 0;
		padding: 0;
		max-width: none;
		max-height: none;
		color: inherit;
		background: transparent;
	}
	dialog.modal::backdrop {
		background: transparent;
	}
}
```

Two homes are refused:

- **The Bootstrap face:** "A value, selector, or context departure is inadmissible in the Bootstrap sheet" (`G:1144`); additions belong to the styles face (`G:1176-1177`).
- **The engine's constructed sheet:** refused as presentation (AGENTS.md, "Mechanism, not product policy").

### Added: `Lock` reserved gutter

#### Contract

The contract adds these declarations.

```ts
// LockInterface gains (width keeps its meaning at src/browser/types.ts:2218):
/** Reports the padding in CSS pixels the shared lock compensates: `0` when the root element's computed `scrollbar-gutter` begins with `stable`, read at the first acquisition while locked and read live while unlocked; otherwise `width`. */
readonly compensation: number

// LockContext gains:
/** If `true`, the root element's computed `scrollbar-gutter` began with `stable` at the first acquisition, so the lock compensates nothing; if `false`, it compensates the measured width. */
readonly reserved: boolean
```

#### Mechanics

These mechanics apply to the gutter path.

- **The read.** The first acquisition reads the computed `scrollbar-gutter` of `documentElement` before its first write (`src/browser/Lock.ts:59`).
- **Bootstrap's loop.** The loop at `:62-87` then runs with `compensation` in place of `width`, including the skip tests at `:69` and `:80`. Both `stable` and `stable both-edges` count.
- **Joining locks.** They are unchanged (`:47-57`).
- **The modal.** `Modal.update` reads `compensation` (`src/browser/Modal.ts:151`). An overflowing modal then takes the zero-width branch at `:155-156`, as Bootstrap's does (`judge:166`).
- **No write.** The engine writes no gutter.
- **Not opt-ins:**
  - A gutter declared on `body`. The specification applies the gutter only from the root (`nr8:25`).
  - An overlay scrollbar, which has no gutter.

#### Departure rows

All rows use the `lock-gutter` prefix, and each row has one owning case.

- **`Lock.test.ts`:** `body::padding-right`, `body::data-bs-padding-right`, `.fixed-top::padding-right`, `.fixed-bottom::padding-right`, and `.sticky-top::margin-right`.
- **`Modal.test.ts`:** `lock-gutter:modal` covers `$::padding-left` and `$::padding-right` on `update`.
- **`Offcanvas.test.ts`:** `lock-gutter:offcanvas`.
- **Controls with no row:** a gutter declared on `body`; no declared gutter.

#### Stylesheet

You declare `html { scrollbar-gutter: stable; }` yourself, and that declaration is the opt-in.

### Added behind a gate: Collapse `intrinsic` (unit B4)

#### Contract

This slice lands only when the gate passes.

```ts
// CollapseOptions gains:
/**
 * If `true`, a vertical panel expands to its intrinsic height under an engine-held `interpolate-size: allow-keywords`, so its height follows content that changes during the transition; if `false`, it expands to its measured `scrollHeight`. A horizontal panel always uses measured pixels. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly intrinsic?: boolean

/**
 * Configures the native surfaces of every collapse a collapse plugin creates.
 *
 * @example
 * ```ts
 * const options: CollapsePluginOptions = { intrinsic: true }
 * ```
 */
export interface CollapsePluginOptions {
	/** If `true`, every collapse the plugin creates takes `CollapseOptions.intrinsic`; if `false`, none does. Default: `false`. */
	readonly intrinsic?: boolean
}
// createCollapsePlugin(options?: CollapsePluginOptions) creates with { toggle: false, intrinsic } (src/browser/plugins.ts:114).
```

#### Mechanics

These mechanics apply to a vertical panel under the leaf.

- **Show.**
  1. A `Hold` acquires inline `interpolate-size`, and the engine writes `allow-keywords`.
  2. The panel takes `0px`.
  3. `reflow` replaces the `scrollHeight` flush (`src/browser/Collapse.ts:124-127`).
  4. The panel takes `auto`.
- **Hide.** Unchanged (`:140-153`).
- **Phase.** The derivation at `:91-92` holds, because `auto` is non-empty.
- **Accordion siblings.** Siblings that this instance creates at `:114` inherit the leaf.

#### Departure rows

All rows use the `collapse-intrinsic` prefix, and `Collapse.test.ts` consumes them.

| Path | Bootstrap | Engine |
| --- | --- | --- |
| `panel::writes[n].height.after` | `120px` | `auto` |
| `panel::interpolate-size` | `<absent>` | `allow-keywords` |

The horizontal panel and the leaf turned off are controls with no row. The piece needs no stylesheet.

### Added behind a gate: `topmost` on Dropdown, Tooltip, and Popover (unit B5)

#### Contract

This slice lands only when the gate passes.

```ts
// DropdownOptions gains:
/**
 * If `true`, the dynamic menu enters the browser's top layer as a manual popover from its accepted show until its hide, stacking among top-layer elements in the order they open; if `false`, it stays in the ordinary layer under Bootstrap's `z-index` scale. A static menu, in a `.navbar` or under `position.display: 'static'`, stays in the ordinary layer under either value. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly topmost?: boolean

// TooltipOptions and PopoverOptions gain:
/**
 * If `true`, the panel enters the browser's top layer as a manual popover from its insertion until its hide completes, stacking among top-layer elements in the order they open; if `false`, it stays in the ordinary layer. The panel's parent stays the `container` leaf's element. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly topmost?: boolean

// DropdownPluginOptions { readonly topmost?: boolean } follows the CollapsePluginOptions form.
// TipPluginOptions (from veneer-boot) gains `topmost` beside `boot`, in the same form.
```

#### Mechanics

These mechanics apply under the leaf.

- **Dropdown show.**
  - After the `show` class and ARIA writes (`src/browser/Dropdown.ts:134-136`), a `Hold` acquires `popover` and the engine writes `manual`.
  - Then `showPopover({ source: toggle })` runs, then `Placement` is constructed (`:137`).
- **Tip show.**
  - The same steps run after the append and `inserted` (`src/browser/Tip.ts:202-203`) and before `Placement` (`:209`).
  - A delegated child inherits the leaf as a non-default leaf (`cv:141`).
- **Hide.** `hidePopover()` runs at hide completion (synchronous for the dropdown, after the fade for tips), then the attribute is released.
  - `popover` exists only for the open lifetime.
  - A closed panel therefore matches no `[popover]` rule.
- **Refused promotion.** A promotion the page refuses leaves the panel in the ordinary layer, and the show proceeds. This covers a cancelled `beforetoggle` or a native throw. The error is reported through the realm's `reportError`. No error code is added (native's `TOPMOST_PANEL` and `POPOVER_STATE` at `cdx:228` are refused).
- **External hide.** A page's own `hidePopover()` gets the forced-transition treatment (disagreement 5).
- **Vetoes.** Every `hide.bs.*` veto survives, because manual popovers have no close watcher (`nr7:168`).

#### Departure rows

The rows use the prefixes `dropdown-topmost`, `tooltip-topmost`, and `popover-topmost`, each with an `:order` sub-scenario. `Dropdown.test.ts` and `Tip.test.ts` consume them.

- The paths are `panel::popover` (`<absent>` against `manual`), `panel::popover-open` (`false` against `true`), and `$::hit` order, including the order after a reopen.
- The static path and the leaf turned off are controls with no row.

#### Stylesheet

The fence gains this rule. B5 measures the values against each class's user-agent residue (`judge:160-162`).

```css
@layer reset {
	.dropdown-menu[popover],
	.tooltip[popover],
	.popover[popover] {
		inset: auto;
		margin: 0;
		border: 0;
		padding: 0;
		overflow: visible;
		color: inherit;
		background: transparent;
	}
}
```

The reset layer lets Bootstrap's `.popover` border and fill win (`src/bootstrap/components/_popover.scss:44-46`).

---

## W2: cross-cutting

### Where the planners agree

All three planners agree on these points.

- **Stacking.** Only opted surfaces enter the top layer, and they stack by insertion order. The engine never reopens a panel to imitate the `z-index` scale (`cdx:216`, `:230`). Toasts and offcanvas panels are never promoted.
- **Close requests.** User close requests reach the engine only through its keydown and click routes. Opted dialogs hold `closedby="none"`, floating panels use `manual`, and the engine constructs no `CloseWatcher` in stage B.
- **Focus.** `Trap` wraps focus. `showModal()` adds browser modality under the leaf. The engine never writes `inert` or `focusgroup` and never passes `focusVisible`.
- **Scroll lock.** `Lock` is the sole owner.
- **Transitions.** `awaitTransition` is the one completion model.
  - No `@starting-style`, View Transitions, or `overlay` transition.
  - Exits happen after the fades: `close()` runs after the wait at `src/browser/Modal.ts:215-217`, and `hidePopover()` runs at tip completion.
  - Reduced motion stays the sheet's job: the wait resolves at once when no transition runs (`G:600`).
- **DOM APIs.** `moveBefore`, `checkVisibility`, and `focus({ focusVisible })` are refused (`sbm:113-121`).

### Rulings

1. **Top-layer order.**
   - Bootstrap's `z-index` scale governs every surface that is not opted in.
   - Under `dialog`, the open host covers ordinary-layer toasts (1090) and body-level tips (1080), and both stay inert (`sbm:105`). Rows record this as `modal-dialog:order`.
   - The guide states the limit and its remedy: set the tip's `container` inside the modal, which works under both stage A and the dialog path, as `G:592` already asks for interactive tips.
   - B5's compositing reading decides whether the guide also offers `topmost` as a remedy for non-interactive tips.
2. **Close-request model.**
   - Escape belongs to the keydown routes, which keep every veto on desktop (`sbm:26`, `:39`).
   - Native requests that bypass keydown go through the hide gate on dialog-leaf hosts: the `cancel` event from `requestClose()`, and the `close` and `request-close` commands.
   - A close the browser has already performed is reconciled once, with the before-event dispatched as `cancelable: false`. This covers a direct `close()`, a `method="dialog"` submit, an external `hidePopover()`, and later the `beforematch` reveal.
   - `CloseWatcher` is deferred. Its only gain is Android Back, which no reading covers (`sbm:39`, `:187`). Its `cancel` is not cancelable without activation (`sbm:180-183`).
3. **Focus model.**
   - `Trap` stays the sole wrapper, because `inert` excludes outside controls without wrapping (`feas:23`).
   - Under `dialog`, the browser's legacy focusing runs before the trap (`sbm:57`; `nr9:51-52`), and `focus: false` still refuses outside focus. Both are rows.
3. **Scroll lock.** `Lock` stays the one owner, and the gutter changes only its compensation.
   - `:has()` locks are refused: `html:has(dialog:modal)` unlocks at `close()`, before Bootstrap's unlock after the transition (`nr8:66`).
   - Containment is refused: dialog `overscroll-behavior: contain` alone lets wheel input over the backdrop scroll the page (`sbm:72`).
5. **Transition model.** As agreed.
6. **Invoker commands beside `data-bs-*`.**
   - The `data-bs-*` routes are unchanged and run first.
   - The built-in dialog commands are routed only on dialog-leaf hosts (W1 Modal).
   - Popover commands are refused on `topmost` panels: the attribute exists only while open, and an external hide is reconciled.
   - Custom `--` routes are deferred until a first real consumer exists (AGENTS.md, Minimal public API). Their gate is one toggle from a button that carries both a `--toggle` command and a `data-bs-toggle` route.
   - Elsewhere the guide tells you to keep `commandfor` off Bootstrap triggers. On a dropdown, Bootstrap's click prevention suppresses the command; on a modal without the leaf, a vetoed command leaves Bootstrap's show state intact (`sbm:176`).
7. **The other DOM APIs.**
   - ARIA reflection and `scrollIntoView({ container })` are refused (W1).
   - **Stage A risk.** Chromium 153's initial `position-visibility` is `anchors-visible` (`sbm:52`; `nr9:40`), and nothing in `src/browser` writes it, as the grep of this pass confirms.
     - Every engine floater has a default anchor (`src/browser/Placement.ts:211`), so it can stop painting when its anchor is clipped, where Popper keeps the panel and only writes attributes. The `popper-visibility-attributes` case compares attributes only (`tests/src/browser/Placement.test.ts:851-904`).
     - P0 measures this. If a floater vanishes, a stage A repair writes `position-visibility: always` inline in `Placement`. That repair is not a stage B unit.

### Claims flagged

These W2 claims are contradicted by measurements or unmeasured.

- **Parity's W2 rule 2** ("The engine never … calls `requestClose`" and leaves native requests unrouted) is contradicted by `nr7:60` and `sbm:174`, as W1 disagreement 4 explains.
- **Native's capture-route mechanism** needs a reading. It relies on a listener that a document capture handler adds to the target, and that listener must still fire at the target. Native names this reading itself, and B2 owns it.

---

## W3: the Bootstrap umbrella inventory

### Where the planners agree

All three planners agree on these points.

- Contract first, by an Opus edits-only unit.
- Narrow plugin option records.
- Markup refusal pinned by a parser case.
- One executed TypeScript fence and one stylesheet fence under a Browser entry task heading.
- Row families under opt-in prefixes, read in both directions.
- The departure-table lead sentence and `G:939` rewritten.

### Rulings

These are the inventory rulings.

- **Heading.** `### Opt into native surfaces`, consumer's heading, is taken over `### Use native hosts`, because the gutter and intrinsic collapse are not hosts.
- **Fence contents.** The executed fence composes only the surfaces that landed. Native's fence composes the gated plugins, which fail to typecheck if a gate drops them.
- **`G:596` exception.** `G:596` gains the forced-transition sentence.
- **`G:939` rewrite.** `G:939` drops "Stage B is a later chunk" and the `Engine` sentence. `veneer-boot` owns the `Engine` sentence.

### Inventory

This table lists every item stage B creates under the Bootstrap umbrella. Gated rows land only after their gate passes.

| Item | Subject | Unit | Proof |
| --- | --- | --- | --- |
| `ModalOptions.dialog` with TSDoc; `ModalInterface` remarks and `@throws` | Modal | B0, then B3 | `Modal.test.ts` `modal-dialog` cases and both controls |
| `ModalPluginOptions`; `createModalPlugin(options?)`; the `command` capture route under `dialog` | Modal | B0 (type), B2 | `plugins.test.ts`: option absent and present, frozen descriptor, nothing registered, caller mutation inert, route present only under `dialog` |
| Markup refusal of every stage B leaf | All | B2 | Parser case: `data-bs-dialog`, `data-bs-topmost`, and `data-bs-intrinsic` set nothing |
| `MODAL_OPEN` in `VeneerErrorCode` | Modal | B0, then B3 | `Modal.test.ts`; `tests/src/core/errors.test.ts` |
| `LockInterface.compensation`, `LockContext.reserved` | Lock | B0, then B3 | `Lock.test.ts` |
| `Modal.update` reads `compensation` | Modal | B3 | `Modal.test.ts` `lock-gutter:modal` |
| Modal component change (`Hold` on `closedby`, host listeners, rollback, `#content`) | Modal | B3 | `Modal.test.ts` |
| Row families `modal-dialog` and `lock-gutter` | Modal, Lock, Offcanvas | B3 rows; B7 applies | Family proofs, read in both directions |
| Gated: `CollapseOptions.intrinsic`, `CollapsePluginOptions`, `createCollapsePlugin(options?)`, the `collapse-intrinsic` rows | Collapse | B0 slice, B4 | `Collapse.test.ts`; `plugins.test.ts` |
| Gated: `topmost` on three options records, `DropdownPluginOptions`, `createDropdownPlugin(options?)`, `TipPluginOptions.topmost`, the `*-topmost` rows | Dropdown, Tip | B0 slice, B5 | `Dropdown.test.ts`, `Tip.test.ts`, `plugins.test.ts` |
| Guide `### Opt into native surfaces`: lead, leaf table, executed TypeScript fence, stylesheet fence, limits (toasts and tips under a dialog; Tab limit; factory-replacement repetition; the root gutter as the opt-in) | All | B0 (stylesheet fence), B7 (prose) | `tests/guides.test.ts` runs the TypeScript fence; B1's loader reads the stylesheet fence |
| `### Engine departures` lead sentence (`G:667`); forced-transition exception (`G:596`); `G:939` rewrite; Surface rows for each added type and the `LockInterface` row | All | B7 | `npm run test:guides` parity |
| Unchanged: Alert, Button (including `toggle.vn.button`), Carousel, Scrollspy, Tab, Toast, `createBootstrapPlugins()`, the entity factories | n/a | n/a | Stage A rows unchanged |

### Executed TypeScript fence

The executed TypeScript fence, as it lands with the ungated surfaces, reads:

```ts
import { createBootstrapPlugins, createModalPlugin, createVeneer } from '@orkestrel/veneer/browser'

const veneer = createVeneer(document, { plugins: [...createBootstrapPlugins(), createModalPlugin({ dialog: true })] })
veneer.destroy()
```

### Claims flagged

None of the W3 claims is false at the tip.

---

## W4: the Veneer styles inventory

The styles inventory is integrated here. These stage B rulings change its hand-offs:

- **Fence layer.** The fences sit in `@layer reset`, not unlayered. Styles' tension T-2 (different precedence between the stage B fence and chunk 3's home) dissolves.
- **`[open]` rule.** `dialog.modal[open]` is dropped, pending B3.
- **Gated floats.** The float resets ship only after B5's gate passes.
- **Refused hand-offs.** `interestfor`, `@starting-style`, and top-layer toast and offcanvas are refused. Their hand-offs (`.toast[popover]`, `.offcanvas[popover]`, `interest-delay`, the fade block) leave the list.
- **Detection scope.** Only a root `scrollbar-gutter` is detected. `interpolate-size` is not, so D-5 narrows.
- **Neutralization home.** Native-host neutralization lives in `_reset.scss`, not in `surfaces/`, which overrules parity's W4 item 1. `surfaces/` keeps Veneer's own looks for user-agent pieces that no Bootstrap selector reaches (`RM:109`).

### Where the lanes agree

All four lanes agree on these points.

- Bootstrap's sheet takes no native rule (`G:1144`, `:1176-1177`).
- Gutter and intrinsic create no stylesheet work, because the author declares the gutter and the engine holds `interpolate-size` inline.
- A root `scrollbar-gutter` in `./styles` is a user decision.

### Placement rule for `./styles`

This verdict adopts the styles lane's placement rule (styles § Proposed placement rule).

- **The finding behind it.** Every `./styles` layer after `bootstrap` beats Bootstrap's class rules on the same element at any specificity (`RM:26`). A bare-tag rule there contradicts "Classes stay the explicit control" (`RM:17`).
- **`reset` layer.** User-agent neutralization, and every tag default that overlaps a property Bootstrap can set, go in `reset`.
- **Layers after `bootstrap`.** A rule there that overlaps Bootstrap must be a named row in the additions record. The proof fails on an unrecorded overlap.

The user rules on this as D-1.

### What Bootstrap's sheet already covers

This table separates Bootstrap's coverage from the gap Veneer fills. Citations follow the styles lane.

| Subject | Covered in `src/bootstrap` | Gap Veneer or the consumer fills |
| --- | --- | --- |
| Reboot | `summary` at `_reset.scss:375`; `[hidden]` unlayered `!important` at `:382`; reduced-motion smooth scroll at `:9` | No `dialog`, `[popover]`, `::backdrop`, `::details-content`, `@starting-style`, `interpolate-size`, `scrollbar-gutter`, `::view-transition`, or `inert` rule (`tmp/units/elements-styles-1.md:3`) |
| Modal | `.modal` (`components/_modal.scss`), `.modal-backdrop` | User-agent `dialog` box and `::backdrop` (`nr3:128-133`) |
| Dropdown, tooltip, popover | `_dropdown.scss:28`, `_tooltip.scss:4` (margin at `:19`), `_popover.scss:4` (border and fill at `:44-46`) | `[popover]` user-agent inset, overflow, border, padding, and `Canvas` fill when promoted (`feas:15`; `cdx:214`) |
| Fade, collapse, toast, carousel, tabs | `_transitions.scss`, `_toasts.scss`, `_carousel.scss`, `_nav.scss` | Native disclosure, scroll markers, and hidden panes, all outside stage B |
| Focus, placeholder | `.btn:focus-visible`, `.focus-ring:focus`, `.form-control::placeholder` | The ring on native surfaces; a forced-colors outline; the bare `::placeholder` |
| Tokens | `--bs-*` at `_tokens.scss` | Density, radius, elevation, and motion factors; the tertiary role |

### What Veneer takes over from stage B

This table lists the stage B fences that `./styles` takes over in chunk 3, with this verdict's corrections.

| Fence | Rule | Stage B status | Chunk 3 home | Reading to re-run |
| --- | --- | --- | --- | --- |
| `dialog.modal` reset | `margin: 0; border: 0; padding: 0; max-width: none; max-height: none; color: inherit; background: transparent` | Ships with B3 | `_reset.scss` | Boxes equal to the `div` host (`feas:13`; `cdx:210`) |
| `dialog.modal::backdrop` | `background: transparent` | Ships with B3 | `_reset.scss` | P12 |
| `dialog.modal[open] { display: block }` | | Dropped unless B3's reading differs | None | B3 recipe equality |
| `.dropdown-menu[popover]`, `.tooltip[popover]`, `.popover[popover]` | Uniform user-agent reset; Bootstrap wins where it declares | Gated on B5 | `_reset.scss` | B5 residue per class; `.popover` keeps its border |
| `.collapse[hidden='until-found' i]` | `display: block !important` | Deferred (G2) | Consumer only while D-4 refuses `!important` in `./styles` | G2 |

### What Veneer comes up with: native-surface families

This table lists the native-surface families chunk 3 can design on its own. They serve bare elements and are not engine hand-offs.

| Family | Proposed home | Ruling and limit |
| --- | --- | --- |
| Bare `dialog` chrome and `:modal` | `_reset.scss` | Drop `scale(0.96)` (M09). Motion awaits Q-I3 |
| Bare-dialog `::backdrop` scrim | `surfaces/` | Keep the 0 → 0.5 fade; drop `blur(2px)` (M11 kept, M25 dropped). `::backdrop` inherits from its dialog since Chromium 122 (`nr3:95`), so Elements' `:root` token workaround is outdated |
| Bare `[popover]` and hint look | `_reset.scss` | Drop `scale(0.98)` (M18, M19) |
| Bare-popover anchor defaults | `_reset.scss` | `position-anchor` resolves to `auto` with `position-area` from Chromium 151 (`nr1:20`) |
| `position-visibility` | None | Refused as stylesheet: the property already defaults to `anchors-visible` in Chromium 153 (`sbm:52`). P0 settles the engine side |
| `details`, `summary`, `::details-content` | Marker in `_reset.scss`; tween in `surfaces/` | The tween is gated on reduced motion (M24 drops Elements' ungated one). It has no `getAnimations()` entry (`sbm:137`) |
| CSS lock for bare dialogs | `_reset.scss`: `html:has(dialog:modal:not(.modal)) { overflow: hidden }` | Writes no root `scrollbar-gutter`, because a gutter would switch the engine's `lock-gutter` path while a bare dialog is open (D-5) |
| `:focus-visible` on native surfaces, forced-colors `Highlight` | `_reset.scss` | Values await Q-I13 |
| `::selection`, `::marker`, bare `::placeholder` | `_reset.scss` | Low priority; Bootstrap's `.form-control::placeholder` wins |
| `::view-transition-*` reduced-motion rule | `surfaces/` | Only for transitions the consumer starts; W1 refuses engine View Transitions (`sbm:166`) |
| Scroll-marker carousel; `scroll-target-group` navigation | `surfaces/` with a Veneer-owned class | Not engine-driven (`sbm:147`); scope awaits D-9 |
| `inert`, `interactivity` | None | No user-agent style to neutralize (`nr2:137`) |
| `::interest-button` | None | Experimental in Chromium 153 (`nr9:38`) |
| `interest-delay`, `@starting-style` fade block, `.toast[popover]`, `.offcanvas[popover]` | None | Removed by this verdict's refusals |

### Token system

The token rows below follow the styles lane (W4.4), under the reader law: a token ships only with a rule that reads it (T52 at `rep-d:58`; S3 at `plan-d:95`).

| Group | Ruling |
| --- | --- |
| Factors: density, radius, elevation, motion | Carry all four as registered `<number>` properties, initial value 1. Radius and shadow reach Bootstrap through the D-2 routing |
| Motion durations: 150, 250, and 600 ms | Carry |
| Eases: standard, out, panel `cubic-bezier(0.32, 0.72, 0, 1)` | Carry the tokens; only Veneer-owned surfaces read them (Q-I6) |
| Roles, tertiary, light and dark base | Carry tertiary as fill plus emphasis; keep triplets only where a contrast reader exists |
| Role-mix (oklab) | Carry for non-default packs; the default pack keeps Bootstrap's literal tiers |
| Contrast pick at 4.5 | Carry as a compile-time `@function` in `_mixins.scss` |
| Fonts, type ramp, space, radius, shadow scales | Carry with Bootstrap-equal values, scaled by the factors |
| Focus metrics | Carry the mechanism; values await Q-I13 |
| State hover, active, stripe | Carry the names with Bootstrap-derived amounts; drop the Elements amounts (T12, Q-I12) |
| Breakpoints, stacking ladder, containers, link, form, and button groups | Defer: no reader, and top-layer surfaces ignore `z-index` (`nr1:103-104`) |
| Color scheme on `:root` | Carry in `theme` |
| `html` keyword interpolation | Carry. **Corrected:** the engine no longer detects `interpolate-size`, so a root declaration couples to nothing; scoping it to `details` or `html` is a styles taste call, not D-5 |
| Elements-only groups (floater gutter, icons, slide distance, tints, disabled opacity) | Each enters only with a Veneer rule that reads it |

### Theme pack and registry groups

This verdict adopts the styles lane's shape (W4.5 and W4.6).

- **Pack shape.** `retune($name, $light, $dark)` packs declare complete defaults (`RM:55`, `:111`). The default pack equals the `./styles` `:root` defaults. One `@function` feeds both copies, because the themes barrel loses `@use '../tokens'` at the first `:root` token (`RM:68`).
- **Test changes.** The empty-pack case at `tests/src/styles/themes/index.test.ts:36` becomes a completeness case. The `not.toContain(':root')` assertion at `:38` stays.
- **`TOKEN_NAMES.veneer`.** It holds the `--vn-*` names under the key law (`RM:50`), with no trailing `-base` segment (T-4). It is pinned in both directions against the built sheet, replacing `tests/src/styles/index.test.ts:38`.
- **`CLASS_NAMES.veneer`.** It holds every class a `./styles` selector reacts to. That includes the Bootstrap names the reset selects (`modal`, `dropdown-menu`, `tooltip`, `popover`), which is admissible because no layer is shared with `bootstrap` (`RM:40`).
- **Veneer-owned classes.** They avoid every `CLASS_NAMES.bootstrap` name: Elements' `.small` collides with `src/bootstrap/_reset.scss:146`. They also avoid every name in the Tailwind record.

### Component looks

This verdict adopts the styles lane's dispositions (W4.7).

- **Tag defaults** go in `reset` only: `button`, `article`, `input`, `select`, `table`, and `progress`. Drop the 12% stripe (T03) and weight 600 (T16).
- **Refused:** take-overs of Bootstrap classes (`.badge`, `.carousel`) (D-6).
- **Deferred:** alert, list group, nav, and pagination looks.
- **Spinner:** under reduced motion it takes `animation: none` (M21), and M23 is dropped.
- **Toast:** the elements toast look is dropped, together with the refused top-layer toast.

### Claims flagged

These styles-lane claims are corrected or flagged.

- **Styles T-2** assumed an unlayered stage B fence. This verdict puts it in `reset`.
- **Styles W4.3, until-found row:** "only a layered `!important` beats `bs/_reset.scss:382`". An unlayered `!important` of higher specificity also beats it, as native's fence selector shows. D-4 still governs `./styles`.
- **Styles' refusal of `position-visibility`** holds for stylesheets, but the initial value itself is P0's stage A question.
- **`RM:146`** still says chunk 3 opens after stage A, while the plan ruled stage B first (`tmp/units/veneer-remainder-3.md:44`). The Orchestrator updates that sentence; the user's ruling at `dv:69` already decides it.

---

## W5: units

None of these units starts in this stretch.

### Where the planners agree

All three planners agree on these points.

- **Precondition:** `veneer-boot` has landed with D1, D2, and D4.
- **Order:**
  - an Opus contract unit first, as edits only;
  - an Astra harness unit;
  - Astra family units in worktrees;
  - an Astra integration unit;
  - an Opus guide unit last;
  - one `orkestrel-falsify` round, then `verifier`.
- **Report-only files** come back as patches the Orchestrator applies.
- **The proof ladder:** the touched file, then `npm run test:src:browser`, then `npm run test:guides` where the guide changes.

### Rulings

These are the unit rulings.

- **One overlay unit.** The gutter and the dialog share one unit (B3), because `Modal.ts` consumes `Lock.compensation`. Splitting them, as parity's U3 and U4 do, would share `Modal.ts` ownership.
- **Gated slices.** B0 writes the gated contract slices as held patches. The Orchestrator applies each one only when its family unit's gate passes, so `main` never holds a leaf that does nothing (consumer, B0).
- **Classic scrollbar instrument.** The scrollbar instrument uses CDP's `Emulation.setScrollbarsHidden`, with a 15 px control. CDP is the Chrome DevTools Protocol. The root configuration hides scrollbars (`cdx:206`), and that configuration is scaffold-propagated (`RM:64`). If the CDP toggle fails its control, the need goes to the user.
- **Shared kind files.** `helpers.ts`, `constants.ts`, and `index.ts` stay report-only for every family unit. Native's B2 ownership of them is refused.
- **Journey check.** Every landing also runs `npm run test:journey` (consumer).

### Units

This table lists the units, their ownership, and their readings.

| Unit | Lane | Owns | Order | Readings to re-run |
| --- | --- | --- | --- | --- |
| P0 `anchor-visibility` | Astra, read-only probe, deleted after | Probe file only | Any time; outside stage B | A clipped anchor in a scroller and in a transformed clipping ancestor, tooltip and dropdown, engine against Popper; control: anchor visible. A positive result opens a stage A repair of `Placement.ts` |
| B0 `stage-b-contract` | Opus, edits only | `src/browser/types.ts` (dialog, lock, remarks), `src/core/types.ts` (`MODAL_OPEN`), the guide's stylesheet fence and Surface rows; held patches for the `topmost` and `intrinsic` slices | After `veneer-boot` | The Orchestrator runs the browser-scope `tsc`; the expected failures are only the `Lock.ts` members B3 implements |
| B1 `stage-b-harness` | Astra | Engine section of `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, family entries in `tests/setup.ts`, `tests/setup.test.ts` | After B0 | Readers for `open`, `:modal`, `closedby`, `:popover-open`, `popover`, and inline `interpolate-size`; an `elementsFromPoint` hit-order reader with a known `z-index` control; transient focus capture; the fence loader in both realms (control: a raw `dialog.modal` without the fence); the classic-scrollbar instrument with its 15 px control |
| B2 `stage-b-wiring` | Astra | `plugins.ts`, `plugins.test.ts`, `validators.ts` (realm-aware dialog guard) and its test, the parser refusal case | After B0, parallel with B1 | The capture-added listener firing at the target, against a control |
| B3 `native-overlay` | Astra, worktree | `Modal.ts`, `Lock.ts`, `Modal.test.ts`, `Lock.test.ts`, gutter cases in `Offcanvas.test.ts` | After B1 and B2 | Gutter: body, `.fixed-top`, `.fixed-bottom`, `.sticky-top`, an overflowing modal's `update`, offcanvas, RTL, `both-edges`, no overflow, a body-declared control, an overlay-scrollbar control, both joining orders. Dialog: P12; P6 repeated Escape; focus order (`showModal()`, trap, `close()`, data-API return); `showModal()` on an open host; a cancelled `beforetoggle`; hit order against a toast and a body tooltip; the `command`, `requestClose()`, direct `close()`, and form-submit routes; destroy while opening and while closing; the `[open]` rule's necessity; both controls |
| B4 `native-intrinsic` | Astra, worktree | `Collapse.ts`, `Collapse.test.ts` | Parallel with B3 | Gate first: a content resize mid-transition; a null result returns "drop". Then: the 0 → `auto` start through `reflow`, reversal, reduced motion, padded and bordered panels, accordion propagation, destroy mid-transition |
| B5 `native-layer` | Astra, worktree | `Dropdown.ts`, `Tip.ts`, `Placement.ts` (only on a measured need), and their tests | After B3 lands | Gate first: clip escape in a `transform` plus `overflow: hidden` ancestor that clips stage A, and the user-agent residue per class under the reset-layer fence; a null escape returns "drop". Then: geometry within 1 px of Popper's population, RTL, a float inside a dialog modal, compositing of a body-level `topmost` tip over a dialog modal, hit order including a reopen, delegated children, an external `hidePopover()`, the `beforetoggle` fallback, no native open state after destroy, the static-path control |
| B6 `native-integration` | Astra | `tests/src/browser/integration.test.ts` | After B3 to B5 | Every landed surface on one page, plus a Bootstrap-only control page with no leaf and no declared gutter |
| B7 `native-guide` | Opus | `G` § Browser entry `### Opt into native surfaces`, `:596`, `:667`, `:939`, the row patches; `RM:145-146` | Last | `npm run test:guides` |
| G1 to G3 gate probes | Astra, read-only | Probes only | Not scheduled | G1 offcanvas `<dialog>`; G2 the until-found reveal; G3 Android Back |
| Close-out | Opus reviewer on the mechanism; Astra analyst on the contract | | After B7 | One falsify round, then `verifier` runs the tree-wide gates |

These files are report-only, and each unit returns an exact patch for them:

- `types.ts`, after B0;
- `src/core/types.ts`;
- `constants.ts`, `helpers.ts`, and `index.ts`;
- the guide, outside B0 and B7;
- `tests/setup.ts` and the engine section of `tests/setupBrowser.ts`, outside B1.

### Lanes-log predictions

Log these entries before each landing.

- **B0 to B6:** predicted statechart rows: none.
  - The showcase composes `createBootstrapPlugins()` with tip boot, writes `div.modal`, and sets no leaf.
  - The trigger grep of `src/` and `app/` returns no stage B trigger; the only `until-found` text is Tailwind's preflight exemption at `app/browser/recipe.json:2049-2050`.
  - The gutter prediction holds while no sheet the showcase loads declares a root gutter. `src/bootstrap` and the recipe declare none.
- **B1:** log the harness export names it adds.
- **B3:** name the `modal` and `offcanvas` rows and the responsive offcanvas tables as regression-sensitive (`cdx:301`, `:303`).
- **B4:** name the `collapse`, `accordion`, `navbar-390`, and `navbar-1280` rows (`cdx:302`).
- **B5:** name the `tooltip`, `popover`, and `dropdown` tables, including the `Dialog hint through …` rows (`cdx:298-300`).
- **P0, if it opens a repair:** that repair names the same floating tables and predicts none.
- **Additive contract changes:** the option parameters on the plugin factories are additive, so no showcase call site migrates.
- **The stylesheet fence** never enters the showcase, which loads Bootstrap's sheet alone (`RM:144`).

### Claims flagged

None of the W5 claims is false at the tip. Parity's U3-before-U4 split is overruled for shared `Modal.ts` ownership; it is not a false claim.

---

## What the user must rule

1. **The gutter opt-in.** Accept that a stable `scrollbar-gutter` declared on the root element changes the lock's writes with no Veneer option. Rule whether `./styles` can declare a root gutter (D-5); a root gutter there would put every page that loads it on the `lock-gutter` rows.
2. **Gated adds.** Accept that `topmost` and `intrinsic` land only if their gate readings show a gain, and are dropped otherwise.
3. **The `dialog` limits.**
   - Toasts and body-level ordinary tips outside an open dialog modal sit beneath it and stay inert.
   - Tab from the last control leaves the document.
   - With `focus: false`, outside focus is still refused.
4. **Forced native transitions** dispatch the before-event with `cancelable: false`, an exception to `G:596`.
5. **`MODAL_OPEN`:** accept throwing for an author-opened dialog host, against closing it first.
6. **The deferrals:** offcanvas `<dialog>`, `until-found` on collapse and tab, `CloseWatcher` with Android Back, and custom `--` commands.
7. **The default dialog reset.** Rule whether `./styles` ships the dialog reset by default. It also restyles Bootstrap-path `<dialog class="modal">` hosts, whose user-agent border and padding it removes; that effect is unmeasured.
8. **P0 repair timing.** Rule whether a positive P0 reading can land as a stage A repair inside the stage B window.
9. **The classic-scrollbar fallback.** If the CDP scrollbar toggle fails its control, rule whether to change the scaffold-propagated root test configuration.
10. **Chunk 3 decisions:**
    - D-1, the layer for tag defaults;
    - D-2, routing root `--bs-*` names through the factors;
    - D-3, the meaning of the default pack;
    - D-4, `!important` in `./styles`;
    - D-5, which this verdict narrows to a root `scrollbar-gutter` only;
    - D-6, take-overs of Bootstrap classes;
    - D-7, the shape of the additions record;
    - D-9, CSS-only native components;
    - D-10, the browser floor;
    - the identity questions Q-I1 to Q-I13.