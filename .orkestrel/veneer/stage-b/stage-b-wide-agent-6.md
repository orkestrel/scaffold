# Browser stage B design verdict

This verdict was reconciled on 2026-10-03 from the brief `tmp/units/stage-b-wide-design-brief.md`, then revised for the gaps a completeness critic found. Its inputs are:

- the three blind subjective planners: **parity** (Bootstrap parity first), **native** (native platform first), and **consumer** (blank-slate consumer first);
- the objective W4 Veneer styles inventory (**styles**). That inventory was delivered to this pass in the dispatch and has no file on disk. Wherever this verdict depends on one of its rulings, it restates the ruling and cites the distillate evidence for it.

Every code citation was checked at veneer `main` `9885975`. During this pass, `main` advanced to `419245d` with the `veneer-boot` merge, and citations were not re-checked against that commit. The design builds on the `veneer-boot` shapes in `tmp/units/stage-b-design-agent-2.md:241-284`. Two of the user's later rulings apply on top of those shapes: `toggle.vn.button` stays, and `createVeneer` with no plugins routes nothing (`scaffold/.orkestrel/veneer/browser-design-verdict.md:75-76`). All measurements are Chromium 153.0.8010.12 through Playwright 1.63.0.

Citations use the following shortened roots.

| Short form | Path |
| --- | --- |
| `brief` | `tmp/units/stage-b-wide-design-brief.md` |
| `sbm` | `tmp/codex/stage-b-measurements.md` |
| `cdx` | `tmp/codex/browser-stage-b-design-verdict.md` |
| `feas` | `tmp/units/browser-feasibility-report.md` |
| `judge` | `tmp/units/stage-b-design-agent-2.md` |
| `nrN` | `tmp/units/native-research-agent-N.md` |
| `niN` | `tmp/units/native-inventory-N.md` |
| `es1` | `tmp/units/elements-styles-1.md` |
| `ident` | `scaffold/.orkestrel/veneer/distillates/absorb-styles-identity-distillate.md` |
| `rep-d` | `scaffold/.orkestrel/veneer/distillates/absorb-styles-reports-distillate.md` |
| `plan-d` | `scaffold/.orkestrel/veneer/distillates/absorb-styles-plan-distillate.md` |
| `dv` | `scaffold/.orkestrel/veneer/browser-design-verdict.md` |
| `cv` | `scaffold/.orkestrel/veneer/browser-convention-verdict.md` |
| `G` | `guides/veneer.md` |
| `RM` | `ROADMAP.md` |

## Decision

Stage B sorts every candidate into one of five outcomes.

- **Added unconditionally:**
  - `<dialog>` hosting for the modal, opted in by `ModalOptions.dialog` and `ModalPluginOptions.dialog`.
  - The reserved-gutter scroll lock. It is opted in by a `gutter` leaf on the modal and offcanvas options and on their plugin options, and it takes effect only where the author declares a stable root `scrollbar-gutter`. The user rules this shape against plain detection (disagreement 1).
- **Added behind a gate:**
  - Top-layer floating panels: the `topmost` leaf on the dropdown, tooltip, and popover.
  - Intrinsic vertical collapse: the `intrinsic` leaf.
  - A gated contract slice lands only with the unit whose gate reading shows the gain. If the reading shows no gain, the unit returns "drop", and the capability and its types never land.
- **Deferred.** Each deferral is blocked by a reading that a gate probe in W5 owns:
  - `<dialog>` hosting for the offcanvas panel (G1);
  - `hidden="until-found"` reveal on collapse panels (G2) and on tab panes (G4);
  - `CloseWatcher`, together with Android Back (G3);
  - custom `--` invoker command routes (G5).
- **Refused, with evidence:** every other candidate that the inventories and research name. Each one has a row in W1.
- **Stage A risk, measured outside stage B:** the floating panels' initial `position-visibility` (probe P0).

Every planner agrees that a page that never opts in keeps stage A byte for byte. Under this verdict's recommended gutter shape, such a page sets no stage B leaf. Under the detection alternative, it also declares no stable root `scrollbar-gutter`.

- The trigger properties appear in no file under `src/` or `app/`. The search pattern was `scrollbar-gutter|interpolate-size|popover=|<dialog|showModal|commandfor|closedby|position-visibility`, run in this pass.
- The only `until-found` text is Tailwind's preflight exemption inside `app/browser/recipe.json:2049-2050`. That text triggers nothing, because until-found is deferred.

## The opt-in rule

Every stage B surface opts in through exactly one of three shapes. The deciding question is whether the surface's trigger can appear on a page that never asked for the surface. This takes native's three-shape rule, narrows detection to markup, and answers the inconsistency the judge flagged (`judge:167-170`).

1. **Typed leaf.** This shape applies wherever the trigger can come from a source that has nothing to do with the surface. One such source is markup that Bootstrap's engine already serves correctly. Another is CSS that shared resets declare for their own reasons.
   - The leaf is a top-level boolean on `{Entity}Options`, defaulting to `false`.
   - The same leaf sits in a narrow `{Entity}PluginOptions` record. `create{Entity}Plugin(options?)` (`scaffold/.claude/rules/architecture.md:214-215`) passes the leaf to every component that the plugin's routes or boot build.
   - Markup never sets a leaf. `resolveModalOptions` and its siblings read only Bootstrap's keys from the markup record, then spread the typed options over them (`src/browser/helpers.ts:328-366`).
   - A leaf can make its effect depend on an author declaration. `gutter` acts only where the root declares a stable gutter, so the declaration alone moves nothing and the leaf alone moves nothing.
   - This shape covers `dialog`, `gutter`, `topmost`, and `intrinsic`.
2. **Detected author markup.** This shape applies only where Bootstrap's own engine fails outright on markup that serves the surface alone. The one case is `hidden="until-found"` on a `.collapse` panel, if that surface returns from deferral. Under Bootstrap, that markup never shows at all (`sbm:133`).
3. **Plugin-only option.** This shape is for a boot scan, which has no component meaning. It covers `boot` (`judge:245-248`).

The rest of the rule:

- **Plugin option records stay narrow.** A plugin options record carries only that family's stage B leaves, plus `boot` on the tips.
  - A record that carries full component options is refused. It would expand the capability with no consumer (AGENTS.md, Minimal public API).
  - Its typed leaves would also outrank markup, while Bootstrap's `Default` sits beneath markup (consumer, Alternatives 2).
- **Scenario prefixes.** Departure rows use the prefix `{family}-{leaf}`, or `{family}-{declaration}` for detected markup. Sub-scenarios follow after `:`.
- **Departure table lead sentence.** The lead of `### Engine departures` (`G:667`) becomes: "every deliberate difference between Bootstrap's JavaScript and the engine on identical markup and configuration, or under the opt-in its Scenario prefix names".

---

## W1: per subject

### Where the planners agree

All three planners agree on the following points.

- **Native surfaces added nowhere:** Alert, Button, Carousel with `Swipe`, Scrollspy, Tab, and Toast.
- **`<dialog>` modal hosting is added.**
  - It runs only on a realm-aware `HTMLDialogElement` host.
  - `closedby="none"` is held through `Hold` while the dialog shows.
  - `showModal()` is called at the `display: block` write (`src/browser/Modal.ts:197`), and `close()` at the `display: none` write (`:217`).
  - `Backdrop`, `Trap`, and `Lock` are kept, and Escape stays on the keydown listener (`:55-63`).
  - The private field `#dialog` (`:18`) is renamed `#content`.
- **The two controls produce no row:** a `<dialog>` host without the leaf, and the leaf on a `div` host.
- **`LockInterface.width` keeps its documented meaning** (`src/browser/types.ts:2218`). The judge's redefinition (`judge:309`) is overruled. `Modal.update` reads a separate compensation value (`src/browser/Modal.ts:151`).
- **Floating panels keep `Placement`** with explicit anchor pairs. Promotion is a separate lifetime (`cdx:228`). `.show` stays the open authority, and only `popover="manual"` is admissible.
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

1. **Gutter opt-in. Open for the user; this verdict recommends a typed `gutter` leaf that writes nothing and acts only on a declared stable root gutter.**

   The four candidate shapes are ruled as follows.
   - **(a) Detection alone (parity, native).** Refused as the recommendation, and offered to the user as the alternative.
     - It fixes a measured defect: under a declared stable gutter, Bootstrap adds 15 px of body padding on top of the gutter (`cdx:211`; `sbm:78`).
     - It also moves pages that never opted in. A stable root gutter often comes from a shared reset. The Elements sheet declares `scrollbar-gutter: stable` on every element above 480 px (`es1:35`; `nr2:128`).
     - Such a page loses Bootstrap's 15 px compensation, and no option restores it. That breaks the rule that a page which never opts in keeps stage A byte for byte (`brief:27`), and the blank-slate rule that each default forces nothing (`brief:5`).
     - It also forces W4 to keep `./styles` from declaring a root gutter (D-5).
   - **(b) Typed `gutter` leaf, effective only on a declared stable root gutter.** Recommended.
     - It applies the reasoning that disagreement 3 applies to `intrinsic`: a root declaration that comes from a reset moves nothing.
     - It matches `dialog`, `topmost`, and `intrinsic`.
     - The engine still writes no root layout policy, so the refusal of (d) stands.
     - A page that declares the gutter without passing the leaf keeps Bootstrap's double compensation, which is Bootstrap's own behavior.
     - The shared lock takes the first acquirer's leaf. A page that passes the leaf to the modal plugin and not to the offcanvas plugin therefore gets compensation that depends on open order. The guide tells you to pass the leaf to both overlay plugins.
   - **(c) Detection with an opt-out leaf.** Refused. The opt-out defaults to on, so a page that never opts in still moves.
   - **(d) Typed leaf with an engine-written gutter (consumer, `cdx:174-202`).** Refused.
     - It writes root layout policy that the author never declared.
     - Because the lock is shared across the document, a leaf on one overlay would choose the root policy for another (`cdx:222`). Layout would then depend on open order, a risk consumer itself names.

   The contract, mechanics, and rows in this verdict specify (b). If the user rules (a), these changes follow:
   - drop `LockOptions`, the `gutter` leaves, and `OffcanvasPluginOptions`;
   - the first acquisition reads the computed root `scrollbar-gutter` unconditionally;
   - `./styles` must not declare a root gutter unless the user accepts the coupling (D-5).

2. **Top-layer floats: defer (parity) against add (native, consumer, `judge:146-152`). Ruled: add, gated.**
   - The departure is measured: insertion order replaces the `z-index` scale (`cdx:216`).
   - Promoted geometry matches Popper. The menu box sits at (70, 212) (`cdx:213`), and the arrow is within 0.141 px after neutralization (`cdx:214`).
   - The gain is unmeasured. That gain is escaping a clipping ancestor that also carries a `transform`. Stage A's fixed anchors already escape plain overflow clipping (`tmp/units/stage-b-design-agent-1.md:363`). Parity's gate therefore becomes the floating unit's first reading.
3. **Intrinsic collapse: defer (parity) against conditional add (native, consumer, `judge:141-143`). Ruled: add, gated, with the same mechanism.**
   - The measured motion is equal: 368 ms against 349 ms (`feas:21`).
   - The only remaining gain is following content that resizes mid-transition (`judge:164-165`). The gate is that reading, and a null result drops the piece (`judge:315`).
   - The shape is a typed leaf, not detection. A root `interpolate-size` from any reset leaves the engine untouched.
4. **Native requests on a dialog host: refuse routing (parity) against routing through the show and hide gates (native, consumer). Ruled: route.**
   - Parity's refusal rests on `closedby="none"` disabling the watcher. That holds for user close requests only:
     - `requestClose()` enables the watcher and always fires a cancelable `cancel` (`nr7:60`, `:126`).
     - The `request-close`, `close`, and `show-modal` commands performed their actions in Chromium 153 (`sbm:174`).
   - An unrouted native show or close strands the engine's state. A native `show-modal`, or a page's own `showModal()`, would leave a modal, inert page under Bootstrap's `.modal { display: none }`.
   - The opening `beforetoggle` of a dialog is cancelable (`nr3:108`; the popover reading is `feas:15`). The engine therefore cancels a native open that it did not start and replays it through `show()`.
5. **Forced native close (`dialog.close()` from page code, or a `form[method=dialog]` submit): dispatch only `hidden` (parity) against a non-cancelable `hide.bs.modal` (native). Ruled: dispatch `hide.bs.modal` with `cancelable: false`, then run the close path and dispatch `hidden`.**
   - A tip hides on its closest modal's `hide.bs.modal` (`src/browser/Tip.ts:95-97`). Skipping that event leaves the tips inside a force-closed modal shown.
   - The same rule covers an external `hidePopover()` on a `topmost` panel.
   - The guide sentence "Every `.bs.` event is cancelable" (`G:596`) gains this exception.
6. **`hidden="until-found"`: add by detection (native) against defer (parity, consumer). Ruled: defer, with the shape fixed in advance as markup detection.**
   - The integrated reveal is unmeasured: the engine's forced show, accordion siblings, scroll position, and a padded panel. `sbm:139` leaves it open.
   - The reveal removes the attribute (`nr2:51`), so a panel that is hidden again is not findable unless the engine restores the attribute. G2 reads that as well.
   - The fence needs `!important` to beat `src/bootstrap/_reset.scss:382`.
7. **A tip whose trigger sits in an open dialog-leaf modal. The options are to resolve the container to the dialog (native), throw `TIP_CONTAINER` (`cdx:230`), or state a guide limit (parity, consumer). Ruled: the guide limit, with no reparenting and no throw. The ruling rests on B3's paint reading.**
   - An automatic container changes the tip's DOM parent based on runtime state, so it is refused.
   - How a body-level, ordinary-layer tip paints beside and over the `.modal-content` of a dialog-leaf modal is unmeasured (`feas:37`; `cdx:230`; `sbm:107`). B3 takes that reading, because B3 lands the leaf that creates the limit.
   - **If the tip paints over the content,** the guide limit covers interactivity only. A throw is refused, because it would break non-interactive tooltips that paint.
   - **If the tip paints beneath the content,** the guide limit states that such a tip sets `container` inside the modal, as `G:592` already asks for interactive tips. A throw is still refused. A throw turns a paint limit into a missing tooltip and an error on every hover. It also makes the Tip family test a condition that only the Modal leaf creates. The limit sits at the opt-in instead: in the `dialog` TSDoc and in `### Opt into native surfaces`.
   - For `topmost` tips, B5's compositing reading decides whether the guide also offers `topmost` as a remedy.
8. **Float leaf name: `popover` (parity), `position.popover` (`judge:318`), or `topmost` (native, consumer, `cdx:186`). Ruled: `topmost`.**
   - `PopoverOptions.popover` and `createPopoverPlugin({ popover: true })` collide with the profile name.
   - Every `position` leaf projects a Bootstrap key (`src/browser/types.ts:934-1006`).
   - `Tip` spreads `position` into `Placement` (`src/browser/Tip.ts:205-215`).
   - The TSDoc states the insertion-order stacking, so the name claims only top-layer entry.
9. **Lock context boolean: `gutter` (native, `cdx:202`) against `reserved` (parity). Ruled: `reserved`.**
   - A boolean reads as an assertion (`scaffold/.claude/rules/names.md:115`).
   - The recorded fact is that the root reserved the gutter for this lock.
   - The option leaf keeps the name `gutter`, because it names the native surface it opts into, as `dialog`, `topmost`, and `intrinsic` do.
10. **Error code: `MODAL_OPEN` (parity, consumer), `MODAL_DIALOG` (native), or `MODAL_STATE` (`cdx:220`). Ruled: `MODAL_OPEN`, thrown synchronously before `show.bs.modal` dispatches.**
    - `showModal()` runs after the backdrop wait inside the async `#open` (`src/browser/Modal.ts:190-197`), so a native throw there cannot reach the caller of `show()`.
    - The synchronous precheck catches the programmer error: the host already carries `open`.
    - Script `show()` and `showModal()` calls never reach that state. They are cancelled at `beforetoggle`, before `open` is set (disagreement 4). The remaining sources of an open host are a written `open` attribute and markup that is open at load.
    - A late native refusal, such as a cancelled `beforetoggle`, rolls back and reports through the realm's `reportError` with no code.
11. **Offcanvas top layer: defer `popover="manual"` (native) against refuse (parity, consumer). Ruled: refuse `manual`.** The top-layer need folds into the deferred `<dialog>` gate, so one host path serves it.
12. **Toast top layer: defer (native) against refuse (parity, consumer). Ruled: refuse.**
    - A promoted body-level toast stays inert under a modal (`sbm:105`).
    - Promotion takes the toast out of `.toast-container` layout (`dv:12`).
13. **The remaining split rulings:**
    - **`scrollIntoView({ container })`** (native defers): refused. It selects a different container and alignment from Bootstrap's `offsetTop` delta (`sbm:117`; `nr5:67`).
    - **ARIA element reflection** (consumer defers): refused. The setter empties the attribute (`sbm:119`), which breaks the per-owner token list (`cv:151`).
    - **`interestfor`** (native defers): refused. See the Tooltip table.
14. **`dialog.modal[open] { display: block }`: keep (parity, native) against drop (consumer). Ruled: drop, conditional on B3's equality reading without the rule.** The engine's inline writes at `src/browser/Modal.ts:197` and `:217` decide display. The feasibility recipe (`feas:13`) ran without those writes.
15. **Where the stylesheet fence sits: unlayered (`cdx:248`, parity) against `@layer reset` (consumer, styles). Ruled: `@layer reset`.**
    - A reset-layer rule beats the user-agent origin and loses to every Bootstrap declaration, in the lifted sheet and in the drop-in alike (`RM:26`, `:42`).
    - One uniform `[popover]` reset therefore keeps `.popover`'s border and fill (`src/bootstrap/components/_popover.scss:44-46`) without per-class tailoring.
    - `reset` is also the layer `./styles` owns (`RM:37`), so chunk 3 takes the rules over verbatim.

### Claims flagged

The following claims are false at the tip, contradicted by a measurement, or unmeasured.

- **Native:** "The tip grep found no … `until-found` … under `src` or `app`." This is false. `app/browser/recipe.json:2049-2050` carries `until-found` twice, inside Tailwind's preflight text. It triggers nothing.
- **`cdx:224`** cites the collapse phase derivation at `src/browser/Collapse.ts:96`. The derivation sits at `:91-92`.
- **`nr6:32`** says `request-close` sits behind a flag at M139. `sbm:174` contradicts it: the command performed its action in Chromium 153.
- **`nr1:63-72`** leaves the initial `position-visibility` value disputed. `sbm:52` and `nr9:40` settle it as `anchors-visible`.
- **Parity's Modal row** reads "`requestClose`, `request-close`, `CloseWatcher`: Refuse, `closedby="none"` disables the watcher". `nr7:60`, `nr7:126`, and `sbm:174` contradict it, as disagreement 4 explains.
- **Parity's W4 claim** that the dialog reset "is safe to ship by default" is unmeasured. Its reasoning is that Bootstrap's own path on a `<dialog>` host renders with user-agent borders, which follows from the user-agent rules (`nr3:128-133`).
- **The earlier text of ruling 7** said that body-level tooltips "paint correctly" under a dialog. No reading supports that (`feas:37`; `sbm:107`).

### Per-subject rulings

Each table rules on every candidate for its subject. "W2" means the cross-cutting ruling decides it.

#### Alert

Nothing is added to the alert.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `@starting-style`, `allow-discrete` | Refuse | Close removes `show` without a display flip (`ni1:12`); the stage A refusal stands (`dv:12`) |
| Popover host | Refuse | The alert is in flow, and `closed.bs.alert` fires on the removed node; a closing `beforetoggle` cannot be cancelled (`sbm:23`) |
| `ariaNotify` | Refuse | It duplicates the markup's live region; only a tree change was measured, not speech (`sbm:103`) |
| Custom `--close` command | Defer (W2) | No consumer |
| `CloseWatcher`, `inert`, `focusgroup`, size tweens | Refuse | The alert has no Escape path, no focus move, and no size tween (`ni1:15`) |
| `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |

#### Button

Nothing is added to the button.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| Native pressed toggle, checkbox `switch` | Refuse | HTML has no pressed toggle, and `switch` is not in Chromium 153 (`nr6:28-30`) |
| Invoker commands | W2 | |
| `toggle.vn.button` | Unchanged | User ruling 5 (`dv:76`) |
| `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |

#### Carousel and `Swipe`

Nothing is added to the carousel.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| View Transitions, document-scoped and element-scoped | Refuse | Completion runs on its own clock; under reduced motion, the 250 ms pseudo-element animations remain (`sbm:159-166`) |
| `::scroll-marker`, `::scroll-button()`, `scroll-target-group`, scroll snap | Refuse | No `slide` or `slid` event, and no `active` or `aria-current` writes (`sbm:147`) |
| `scrollsnapchange`, `scrollend` | Refuse | They cannot veto and carry no class contract (`nr2:118`) |
| Scroll-driven animations, scroll-state queries | Refuse | No contract to carry (`nr0:121-123`; `nr2:111`) |
| `hidden="until-found"` on items | Refuse | Inactive items are hidden by `.carousel-item { display: none }` (`nr2:59`). A reveal removes the attribute with no slide (`nr2:51`, `:61`). The engine would then have to force a `select` past the cancelable `slide.bs.carousel` (`nr2:91`) and write `hidden="until-found"` back on every outgoing item, a write Bootstrap never makes. Under `ride`, the next interval rotates the found item away (`nr2:90`) |
| `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |
| Pointer events, `getAnimations`, `Animation.finish()` | Kept | Stage A |

#### Collapse and accordions

The collapse gains the gated `intrinsic` leaf.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `interpolate-size` vertical | **Add, gated** (B4) | Equal motion (`feas:21`); the gate is a content resize mid-transition (`judge:315`) |
| `interpolate-size` horizontal | Refuse | Auto width finished at 300 px while `scrollWidth` was 120 px (`ni1:47`) |
| `calc-size()` | Refuse | No gain over `auto` under `allow-keywords`; it was not the function the probe ran (`ni1:47`) |
| `<details>`, `name`, `::details-content` | Refuse | `toggle` is not cancelable, the sibling closes despite a veto, and no completion signal exists (`sbm:135-139`) |
| `hidden="until-found"`, `beforematch` | **Defer** | Gate G2: a fragment reveal into a closed `.collapse` under the fence. It covers the engine's forced show, accordion siblings, scroll position, a padded panel, and whether a panel hidden again is findable (`sbm:133`, `:139`; `nr2:51`) |
| Invoker commands | W2 | |
| `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |

#### Dropdown

The dropdown gains the gated `topmost` leaf on its dynamic path.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `popover="manual"` top layer, dynamic path | **Add, gated** (B5) | Promotion matches Popper's box (`cdx:213`); the gate is the clip-escape reading |
| `topmost` on the static or navbar path | Refuse | A navbar menu is in flow (`src/browser/Dropdown.ts:90-94`); native and consumer refuse the geometry snapshot that `cdx:228` demands |
| `popover="auto"` | Refuse | The close veto is lost (`sbm:23`, `:32`); `inside` and `outside` cannot be expressed (`dv:12`) |
| Popover invoker commands | Refuse | The attribute exists only while the menu shows; Bootstrap's click prevention suppresses the command (`sbm:176`) |
| `focusgroup="menu"` | Refuse | It duplicates the keydown route (`src/browser/plugins.ts:141-173`); menus wrap and Bootstrap's keys do not (`nr2:153`) |
| `anchor-size()` | Refuse | Sizing the menu to its toggle has no Bootstrap equivalent (`nr1:179`); the size is a stylesheet choice (AGENTS.md, Mechanism, not product policy) |
| `CloseWatcher` | W2 | |
| `position-visibility`, `anchor-scope`, anchored container queries, `showPopover({ source })` anchoring | Refuse as additions | Names are unique; the inline arrow is within 1 px (`G:604`); source-only geometry is unmeasured (`ni2:110`); P0 covers the stage A risk |
| `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |

#### Modal

The modal gains the `dialog` and `gutter` leaves. Their full specifications follow the per-subject tables.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `<dialog>` with `showModal()` | **Add** | Measured recipe and controls (`cdx:210`); the accessibility tree reports the dialog as modal and excludes outside nodes (`sbm:93`) |
| `closedby="none"` | **Add**, within `dialog` | Escape reaches the keydown path with no `cancel` (`cdx:210`) |
| `closedby="any"` or `"closerequest"` | Refuse | `cancel` becomes non-cancelable without activation and on repeat (`sbm:24`) |
| Built-in `show-modal`, `close`, and `request-close` commands, and script `requestClose()` | **Add**, within `dialog` | Disagreement 4 |
| Script `show()` and `showModal()` on the host | **Add**, within `dialog` | The opening `beforetoggle` is cancelable (`nr3:108`); disagreement 4 |
| `::backdrop` as the scrim | Refuse | The `div` backdrop is a transcript node (`ni2:14`); the native backdrop is made transparent |
| `CSSPseudoElement` for `::backdrop` clicks | Refuse | The host covers the viewport (`feas:13`: 414 × 896), so it receives the backdrop click on the existing mousedown-plus-click route (`src/browser/Modal.ts:64-78`). The API serves a dialog whose box leaves its backdrop exposed (`nr3:96`) |
| `inert`, `focusgroup`, `focus({ focusVisible })` | Refuse | `inert` does not wrap focus (`feas:23`); Bootstrap passes no focus options (`nr5:46`) |
| `@starting-style` fade | Refuse | Equal motion (`feas:19`) |
| `:has(dialog:modal)` lock, `overscroll-behavior` | Refuse | The `:has()` lock unlocks at `close()`, before the transition (`nr8:66`); containment alone lets the page scroll over the backdrop (`sbm:72`) |
| `moveBefore` for the append at `src/browser/Modal.ts:196` | Refuse | The host is disconnected or unshown when moved; a root mismatch throws (`nr5:63`) |
| Reserved gutter | **Add**, by the `gutter` leaf | Disagreement 1 |
| `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |

#### Offcanvas

The offcanvas gains the `gutter` leaf and nothing else.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `<dialog class="offcanvas">` | **Defer** | Gate G1: `showModal()` for `scroll: false` and `show()` for `scroll: true`, across the `.offcanvas-{bp}` breakpoint crossing; no reading exists (`ni2:26`) |
| `popover="manual"` or `popover="auto"` | Refuse | Under a hide veto, `.show` remains while the native surface closes (`sbm:33`); responsive in-flow variants (`dv:39`); disagreement 11 |
| `closedby`, `CloseWatcher` | Refuse; W2 | |
| Reserved gutter | **Add**, by the `gutter` leaf | Disagreement 1; the lock is acquired only when `scroll` is `false` (`src/browser/Offcanvas.ts:123`) |
| `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |

#### Popover and Tooltip

Both tip profiles gain the gated `topmost` leaf.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `popover="manual"` | **Add, gated** (B5) | The neutralized recipe matches Popper within 0.141 px (`cdx:214`) |
| `popover="hint"` | Refuse | One hint replaces another, while Bootstrap keeps independent tips (`sbm:47`); its close cannot be vetoed (`sbm:23`) |
| `interestfor`, `::interest-button` | Refuse | It works only on `button`, `a`, and `area` and excludes disabled controls (`nr3:210`, `:223`); Escape's `loseinterest` cannot be cancelled (`sbm:50`); an author `aria-describedby` replaces the native description (`sbm:91`); `::interest-button` is experimental (`nr9:38`) |
| ARIA element reflection | Refuse | Disagreement 13 |
| Automatic container resolution, `TIP_CONTAINER` | Refuse | Disagreement 7, decided by B3's paint reading |
| `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |

#### Scrollspy, Tab, and Toast

These three subjects gain nothing.

| Subject | Candidate | Ruling | Evidence |
| --- | --- | --- | --- |
| Scrollspy | `scroll-target-group`, `:target-current` | Refuse | No event and no `active` class (`nr2:104`) |
| Scrollspy | `scrollIntoView({ container })` | Refuse | Disagreement 13 |
| Scrollspy | `scrollend` | Refuse | Activation follows observer entries, and no Bootstrap contract waits on scroll completion (`nr2:103-104`; `ni2:49`); smooth scrolling stays `scrollTo` (`ni2:45`) |
| Scrollspy | `beforematch` in place of the direction latch | Refuse | `beforematch` fires only on `hidden="until-found"` ancestors during find-in-page and fragment reveal (`nr2:49-55`). Spied sections carry no such attribute, so the event never reaches the latch (`src/browser/Scrollspy.ts:116-131`) |
| Scrollspy | `focusgroup` | Refuse | The spy writes only classes and has no keyboard contract (`ni2:49`); a focusgroup reduces the nav's links to one tab stop (`nr2:154`), a change Bootstrap does not make |
| Tab | `focusgroup` | Refuse | Bootstrap's `tabindex="-1"` drops inactive tabs, and focus moves without selecting (`nr2:157-162`) |
| Tab | View Transitions; `hidden` panes; scroll-marker tabs mode | Refuse | `sbm:162`; `dv:12`; not in Chromium 153 (`nr2:71`) |
| Tab | `hidden="until-found"` panes | Defer | Gate G4: a reveal into an inactive `.tab-content > .tab-pane.fade` under the fence (`nr2:59`, `:61`) |
| Toast | Top layer | Refuse | Disagreement 12 |
| Toast | `ariaNotify` | Refuse | As for Alert |
| All three | `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |

#### Shared mechanisms

Most shared mechanisms are unchanged.

- **`Backdrop`:** unchanged. The `div` backdrop stays beneath a transparent `::backdrop` (reading P12).
- **`Trap`:** unchanged, and the sole focus wrapper in every configuration.
- **`Lock` and `Hold`:**
  - `Lock` gains `LockOptions.gutter` and the reserved-gutter path, specified with the surfaces added later in this section.
  - `Hold`'s algorithm is unchanged. Under stage B, its slots are `closedby` and, when the gates pass, `popover` and inline `interpolate-size`.
- **`Placement`:** no public change. `Dropdown` and `Tip` own promotion. P0 can add an inline `position-visibility` write under a stage A unit.
- **Transition wait:** unchanged (W2). `TransitionEvent.animation` is refused.
  - The wait already holds the `CSSTransition` objects that `getAnimations()` returns, and it listens for no `transitionend` (`src/browser/helpers.ts:896-921`).
  - The property only links a `transitionend` event to such an object (`sbm:53`).
- **Boot scope:** unchanged for pages without leaves.
  - `ModalPluginOptions.dialog` adds two capture routes, on `command` and on `beforetoggle`. The router listens in the capture phase for every route event a plugin names (`src/browser/Engine.ts:66-73`), and `beforetoggle` reaches capture listeners although it does not bubble (`nr3:38`).
  - `ElementInternals` and `:state()` are refused for the boot scope and for every subject. `attachInternals()` throws for any element that is not an autonomous custom element; see the [HTML custom elements specification](https://html.spec.whatwg.org/multipage/custom-elements.html#dom-attachinternals). The engine binds Bootstrap's own `div`, `button`, and `a` hosts (`ni1:23`), whose state contract is the classes Bootstrap's sheet selects (`ni2:58`). The inventory reads only `:state(x)` support (`ni2:128`, `:139`).

---

### Added: Modal `dialog`

#### Contract

The contract adds the following declarations.

```ts
// src/browser/types.ts, ModalOptions gains:
/**
 * If `true`, a `<dialog>` host opens with `showModal()` in the browser's top layer and closes with `close()`, holds `closedby="none"` while it shows, and routes its `command`, `cancel`, and opening `beforetoggle` events through `show` and `hide`; if `false`, every host keeps Bootstrap's path. A host that is not a `<dialog>` keeps Bootstrap's path under either value. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly dialog?: boolean

/**
 * Configures the native surfaces of every modal a modal plugin creates.
 *
 * @remarks
 * A factory call with options replaces a plugin-built modal with one built from those options alone, so that call repeats `dialog` and `gutter` to keep them.
 *
 * @example
 * ```ts
 * const options: ModalPluginOptions = { dialog: true, gutter: true }
 * ```
 */
export interface ModalPluginOptions {
	/** If `true`, every modal the plugin creates takes `ModalOptions.dialog`, and the plugin routes `command` and `beforetoggle` events aimed at a `<dialog class="modal">` host; if `false`, the plugin creates modals on Bootstrap's path and routes neither event. Default: `false`. */
	readonly dialog?: boolean
	/** If `true`, every modal the plugin creates takes `ModalOptions.gutter`; if `false`, none does. Default: `false`. */
	readonly gutter?: boolean
}

// ModalInterface @remarks gains: "Under the `dialog` leaf, toasts and body-level tips outside the open host stay inert while it shows; set a tip's `container` inside the modal to keep the tip interactive. The browser focuses the host's first focusable descendant before the trap focuses the host at `shown`, and Tab from the last control leaves the document. A page's own `show()` or `showModal()` on the host runs through `show`, so `show.bs.modal` can veto it."
// B3's paint reading adds or omits a paint clause on the tip sentence (disagreement 7).
// ModalInterface.show gains: "@throws Thrown when the `dialog` leaf is on and the `<dialog>` host already carries `open`: `VeneerError` with code `MODAL_OPEN`."

// src/core/types.ts, VeneerErrorCode gains:
| 'MODAL_OPEN'

// src/browser/validators.ts
/**
 * Checks whether a value is a dialog element in its own browser realm.
 * @param value - Untrusted DOM candidate.
 * @returns True if the owning window recognizes an `HTMLDialogElement`; false otherwise.
 * @example
 * isBrowserDialog(document.createElement('dialog')) // true
 */
export function isBrowserDialog(value: unknown): value is HTMLDialogElement

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

`isBrowserDialog` follows `isBrowserElement` (`src/browser/validators.ts:11-24`). The guard must work across realms because the oracle runs in a child frame (`judge:183`). The barrel star-exports `validators.ts` (`src/browser/index.ts:4`), so the guard is public and takes a Surface row.

#### Mechanics

The following mechanics are fixed against the tip. B3 owns their correctness.

- **Guard.**
  - The dialog path runs only when the leaf is `true` and `isBrowserDialog(host)` holds.
  - Every other combination runs the stage A code unchanged.
- **Engine-started flag.** One private flag marks the engine's own native calls.
  - It spans the synchronous `showModal()` call in `#open`.
  - It also runs from the engine's `close()` call until the host's queued `close` event (`nr3:112`).
- **`show()`.** On the dialog path, a host that carries `open` throws `MODAL_OPEN` before `show.bs.modal` dispatches, so no event or write precedes the throw.
- **`#open`.**
  - At the `display: block` write (`src/browser/Modal.ts:197`), a `Hold` owned by the modal acquires `closedby` and writes `none`. Then `showModal()` runs.
  - Bootstrap's writes keep their order (`:198-208`). The trap activates at `shown` when `focus` is not `false`.
  - The `open` precheck repeats before `showModal()`.
  - The open rolls back if `showModal()` throws, or if the host does not match `:modal` afterwards (a cancelled `beforetoggle`). Rollback returns `display` to `none`, releases `closedby`, hides the backdrop, releases the lock, and dispatches no `shown`. A thrown error is reported through the realm's `reportError`.
- **`#close`.**
  - `close()` runs at the `display: none` write (`:217`), under the flag. `closedby` is released after `this.#lock.release()` (`:227`).
  - `destroy` closes an open host the same way and releases the hold.
- **Host listeners.** On the dialog path, the following listeners bind to the host at construction under the lifetime signal.
  - **`command`:**
    - `show-modal` calls `preventDefault()`, then `show(source)` with the event's element source.
    - `close` and `request-close` call `preventDefault()`, then `hide()`.
    - A custom `--` command passes through untouched.
  - **`beforetoggle` with `newState` `open` and the flag absent:** a page's script `show()` or `showModal()`. The listener calls `preventDefault()`, then `show()` with no opener.
    - The hide and show gates and the `MODAL_OPEN` precheck therefore apply.
    - A vetoed `show.bs.modal`, or an open attempted while the modal hides, opens nothing.
    - On a host without `.fade`, `#open` reaches the engine's own `showModal()` inside this dispatch (`src/browser/Modal.ts:191-197`). The flag keeps the listener from acting on that call, and B3 reads the nested call.
  - **`cancel`:** calls `preventDefault()`, then `hide()`. A script's `requestClose()` therefore passes the `hide.bs.modal` veto.
  - **`close` with the flag absent:** a forced close. The listener dispatches `hide.bs.modal` with `cancelable: false`, then runs the close path, then dispatches `hidden`.
- **Not routed.** A written `open` attribute fires no event, so the engine does not reconcile it. The next `show()` throws `MODAL_OPEN`.
- **Kept unchanged.**
  - Escape stays on keydown (`:55-63`).
  - The backdrop click stays on mousedown plus click against the full-viewport host (`:64-78`).
  - Every other `*.bs.modal` event keeps its cancelability.
- **Plugin routes.**
  - Under `dialog: true`, `createModalPlugin` adds the capture routes `{ event: 'command', selector: 'dialog.modal' }` and `{ event: 'beforetoggle', selector: 'dialog.modal' }`. Neither route has an `execute`, so each only builds a missing component (`src/browser/types.ts:2043-2044`).
  - The built component then handles the event at its own host, which keeps the plugin on the entity's public interface (`scaffold/.claude/rules/architecture.md:216`).
  - A descendant popover's `beforetoggle` inside a dialog modal also matches the selector through `closest`. It builds the modal only when the modal is missing, and does nothing else.
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
| `modal-dialog:paint` | pixel under an ordinary-layer body tooltip over `.modal-content` | tooltip | B3 reading; a row only where it differs |
| `modal-dialog:command` | events and classes after a native `show-modal` | native open, no `.show`, no events | full show lifecycle |
| `modal-dialog:script-open` | events and classes after a script `showModal()` or `show()`, on a built and an unbuilt host | native open, no `.show`, no events | native open cancelled, then the full show lifecycle; nothing opens under a `show.bs.modal` veto or while hiding |
| `modal-dialog:cancel` | events and classes after `requestClose()` | native close, `.show` remains (`sbm:34`) | hide gate |
| `modal-dialog:close` | events after a direct `close()` | native close, `.show` remains | `hide` with `cancelable: false`, then `hidden` |

#### Stylesheet

The rules live in your stylesheet. They are published as an executed guide fence under `### Opt into native surfaces`, and the harness loads the fence in both realms.

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

Two other homes are refused:

- **The Bootstrap face:** "A value, selector, or context departure is inadmissible in the Bootstrap sheet" (`G:1144`), and additions belong to the styles face (`G:1176-1177`).
- **The engine's constructed sheet:** refused as presentation (AGENTS.md, Mechanism, not product policy).

### Added: `Lock` reserved gutter

The shape in this section is the recommended option (b) of disagreement 1. It waits on the user's ruling.

#### Contract

The contract adds the following declarations.

```ts
/**
 * Configures a scroll lock at creation.
 *
 * @example
 * ```ts
 * const options: LockOptions = { gutter: true }
 * ```
 */
export interface LockOptions {
	/** If `true`, a first acquisition that finds the root element's computed `scrollbar-gutter` beginning with `stable` compensates nothing; if `false`, the lock compensates the measured scrollbar width as Bootstrap does. A joining acquisition keeps the first acquirer's result. Default: `false`. */
	readonly gutter?: boolean
}
// Lock gains constructor(root: Document = document, options: LockOptions = {}).

// LockInterface gains (width keeps its meaning at src/browser/types.ts:2218):
/** Reports the padding in CSS pixels the shared lock compensates: `0` while the shared lock is reserved, and `0` while unlocked when this lifetime's `gutter` leaf is on and the root element's computed `scrollbar-gutter` begins with `stable`; otherwise `width`. */
readonly compensation: number

// LockContext gains:
/** If `true`, the first acquirer carried the `gutter` leaf and the root element's computed `scrollbar-gutter` began with `stable`, so the lock compensates nothing; if `false`, it compensates the measured width. */
readonly reserved: boolean

// ModalOptions and OffcanvasOptions gain:
/**
 * If `true`, the scroll lock compensates nothing when the root element declares a stable `scrollbar-gutter`; if `false`, it compensates the scrollbar width as Bootstrap does. A declared gutter without this leaf keeps Bootstrap's compensation. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly gutter?: boolean

// OffcanvasPluginOptions { readonly gutter?: boolean } follows the CollapsePluginOptions form;
// createOffcanvasPlugin(options?: OffcanvasPluginOptions). ModalPluginOptions.gutter is in the dialog contract.
```

#### Mechanics

The following mechanics apply to the gutter path.

- **Construction.** `Modal` and `Offcanvas` pass their `gutter` leaf to their lock (`src/browser/Modal.ts:52`; `src/browser/Offcanvas.ts:60`).
- **The read.** When the first acquirer carries the leaf, the acquisition reads the computed `scrollbar-gutter` of `documentElement` before its first write (`src/browser/Lock.ts:59`). Both `stable` and `stable both-edges` count.
- **Bootstrap's loop.** The loop at `:62-87` runs with `compensation` in place of `width`, including the skip tests at `:69` and `:80`.
- **Joining locks.** They are unchanged (`:47-57`) and keep the first acquirer's `reserved`.
- **The modal.** `Modal.update` reads `compensation` (`src/browser/Modal.ts:151`). An overflowing modal then takes the zero-width branch at `:155-156`, as Bootstrap's does (`judge:166`).
- **No write.** The engine writes no gutter.
- **No effect:**
  - a gutter declared on `body`, because the specification applies the gutter only from the root (`nr8:25`);
  - an overlay scrollbar, which has no gutter;
  - the leaf without a declared gutter;
  - a declared gutter without the leaf.

#### Departure rows

All rows use the `lock-gutter` prefix, and each row has one owning case.

- **`Lock.test.ts`:** `body::padding-right`, `body::data-bs-padding-right`, `.fixed-top::padding-right`, `.fixed-bottom::padding-right`, and `.sticky-top::margin-right`.
- **`Modal.test.ts`:** `lock-gutter:modal` covers `$::padding-left` and `$::padding-right` on `update`.
- **`Offcanvas.test.ts`:** `lock-gutter:offcanvas`.
- **Controls with no row:**
  - a gutter declared on `body`;
  - no declared gutter;
  - the leaf without a declared gutter;
  - a declared gutter without the leaf.

#### Stylesheet

You declare `html { scrollbar-gutter: stable; }` yourself and pass the `gutter` leaf. The declaration alone changes nothing.

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

The following mechanics apply to a vertical panel under the leaf.

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

The following mechanics apply under the leaf.

- **Dropdown show.**
  - After the `show` class and ARIA writes (`src/browser/Dropdown.ts:134-136`), a `Hold` acquires `popover`, and the engine writes `manual`.
  - Then `showPopover({ source: toggle })` runs, and `Placement` is constructed (`:137`).
- **Tip show.**
  - The same steps run after the append and `inserted` (`src/browser/Tip.ts:202-203`) and before `Placement` (`:209`).
  - A delegated child inherits the leaf as a non-default leaf (`cv:141`).
- **Hide.** `hidePopover()` runs at hide completion, synchronously for the dropdown and after the fade for tips. Then the attribute is released.
  - `popover` exists only for the open lifetime, so a closed panel matches no `[popover]` rule.
  - A page's `showPopover()` on a closed panel therefore throws `NotSupportedError` (`nr3:31`), and no native open needs reconciling.
- **Refused promotion.** If the page refuses a promotion, through a cancelled `beforetoggle` or a native throw, the panel stays in the ordinary layer and the show proceeds.
  - The error is reported through the realm's `reportError`.
  - No error code is added. Native's `TOPMOST_PANEL` and `POPOVER_STATE` (`cdx:228`) are refused.
- **External hide.** A page's own `hidePopover()` gets the forced-transition treatment (disagreement 5).
- **Vetoes.** Every `hide.bs.*` veto survives, because manual popovers have no close watcher (`nr7:168`).

#### Departure rows

The rows use the prefixes `dropdown-topmost`, `tooltip-topmost`, and `popover-topmost`, each with an `:order` sub-scenario. `Dropdown.test.ts` and `Tip.test.ts` consume them.

- The paths are:
  - `panel::popover`, `<absent>` against `manual`;
  - `panel::popover-open`, `false` against `true`;
  - `$::hit` order, including the order after a reopen.
- The static path and the leaf turned off are controls with no row.

#### Stylesheet

The fence gains the following rule. B5 measures its values against each class's user-agent residue (`judge:160-162`).

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

All three planners agree on the following points.

- **Stacking.** Only opted surfaces enter the top layer, and they stack by insertion order. The engine never reopens a panel to imitate the `z-index` scale (`cdx:216`, `:230`). Toasts and offcanvas panels are never promoted.
- **Close requests.** User close requests reach the engine only through its keydown and click routes. Opted dialogs hold `closedby="none"`, floating panels use `manual`, and the engine constructs no `CloseWatcher` in stage B.
- **Focus.** `Trap` wraps focus, and `showModal()` adds browser modality under the leaf. The engine never writes `inert` or `focusgroup` and never passes `focusVisible`.
- **Scroll lock.** `Lock` is the sole owner.
- **Transitions.** `awaitTransition` is the one completion model.
  - The engine uses no `@starting-style`, no View Transitions, and no `overlay` transition.
  - Exits happen after the fades: `close()` runs after the wait at `src/browser/Modal.ts:215-217`, and `hidePopover()` runs at tip completion.
  - Reduced motion stays the sheet's job: the wait resolves at once when no transition runs (`G:600`).
- **DOM APIs.** `moveBefore`, `checkVisibility`, and `focus({ focusVisible })` are refused (`sbm:113-121`).

### Rulings

1. **Top-layer order.**
   - Bootstrap's `z-index` scale governs every surface that is not opted in.
   - Under `dialog`, ordinary-layer toasts (1090) and body-level tips (1080) outside the open host stay inert (`sbm:105`). Rows record this as `modal-dialog:order`.
   - The guide states the limit and its remedy: set the tip's `container` inside the modal. That remedy works under stage A and under the dialog path, as `G:592` already asks for interactive tips.
   - B3's paint reading (`modal-dialog:paint`) decides whether the limit covers paint as well as interactivity (W1 disagreement 7).
   - B5's compositing reading decides whether the guide also offers `topmost` as a remedy for non-interactive tips.
2. **Native request model.**
   - Escape belongs to the keydown routes, which keep every veto on desktop (`sbm:26`, `:39`).
   - Native requests that bypass keydown go through the gates on dialog-leaf hosts:
     - the `cancel` event from `requestClose()`;
     - the `close`, `request-close`, and `show-modal` commands;
     - a page's script `show()` or `showModal()`, cancelled at its opening `beforetoggle` (`nr3:108`) and replayed through `show()`.
   - A close that the browser has already performed is reconciled once, with the before-event dispatched as `cancelable: false`. This covers a direct `close()`, a `method="dialog"` submit, an external `hidePopover()`, and, if until-found returns, the `beforematch` reveal.
   - `CloseWatcher` is deferred. Its only gain is Android Back, which no reading covers (`sbm:39`, `:187`). Its `cancel` is not cancelable without activation (`sbm:180-183`).
3. **Focus model.**
   - `Trap` stays the sole wrapper, because `inert` excludes outside controls without wrapping (`feas:23`).
   - Under `dialog`, the browser's legacy focusing runs before the trap (`sbm:57`; `nr9:51-52`), and `focus: false` still refuses outside focus. Both are rows.
4. **Scroll lock.** `Lock` stays the one owner, and the gutter changes only its compensation.
   - `:has()` locks are refused. `html:has(dialog:modal)` unlocks at `close()`, before Bootstrap's unlock after the transition (`nr8:66`).
   - Containment is refused. Dialog `overscroll-behavior: contain` alone lets wheel input over the backdrop scroll the page (`sbm:72`).
5. **Transition model.** As agreed.
6. **Invoker commands beside `data-bs-*`.**
   - The `data-bs-*` routes are unchanged and run first.
   - The built-in dialog commands are routed only on dialog-leaf hosts (W1 Modal).
   - Popover commands are refused on `topmost` panels. The attribute exists only while the panel is open, and an external hide is reconciled.
   - Custom `--` routes are deferred until a first real consumer exists (AGENTS.md, Minimal public API). Their gate reading, G5, runs one toggle from a button that carries both a `--toggle` command and a `data-bs-toggle` route.
   - Elsewhere, the guide tells you to keep `commandfor` off Bootstrap triggers. On a dropdown, Bootstrap's click prevention suppresses the command. On a modal without the leaf, a vetoed command leaves Bootstrap's show state intact (`sbm:176`).
7. **The other DOM APIs.**
   - ARIA reflection and `scrollIntoView({ container })` are refused (W1).
   - **Stage A risk.** Chromium 153's initial `position-visibility` is `anchors-visible` (`sbm:52`; `nr9:40`), and nothing in `src/browser` writes it, as the search in this pass confirms.
     - Every engine floater has a default anchor (`src/browser/Placement.ts:211`), so it can stop painting when its anchor is clipped. Popper keeps the panel and only writes attributes. The `popper-visibility-attributes` case compares attributes only (`tests/src/browser/Placement.test.ts:851-904`).
     - P0 measures this. If a floater vanishes, a stage A repair writes `position-visibility: always` inline in `Placement`. That repair is not a stage B unit.

### Claims flagged

The following W2 claims are contradicted by measurements or unmeasured.

- **Parity's W2 rule 2** ("The engine never … calls `requestClose`") leaves native requests unrouted. `nr7:60` and `sbm:174` contradict it, as W1 disagreement 4 explains.
- **Native's capture-route mechanism needs a reading.** It relies on a listener that a document capture handler adds to the target, and that listener must still fire at the target. Native names this reading itself. B2 owns it for both `command` and `beforetoggle`.

---

## W3: the Bootstrap umbrella inventory

### Where the planners agree

All three planners agree on the following points.

- An Opus edits-only unit writes the contract first.
- Plugin option records stay narrow.
- A parser case pins the markup refusal.
- One executed TypeScript fence and one stylesheet fence sit under a Browser entry task heading.
- Row families sit under opt-in prefixes and are read in both directions.
- The departure-table lead sentence and `G:939` are rewritten.

### Rulings

The inventory rulings are the following.

- **Heading.** Consumer's heading, `### Opt into native surfaces`, is taken over `### Use native hosts`, because the gutter and intrinsic collapse are not hosts.
- **Fence contents.** The executed fence composes only the surfaces that landed. Native's fence composes the gated plugins, which would fail to typecheck if a gate drops them.
- **`G:596` exception.** `G:596` gains the forced-transition sentence.
- **`G:939` rewrite.** `G:939` drops "Stage B is a later chunk" and the `Engine` sentence. `veneer-boot` owns the `Engine` sentence.
- **Markup refusal.** The resolvers already ignore markup leaves by construction, because they spread only the typed options (`src/browser/helpers.ts:328-366`). The proof is a resolver case in `tests/src/browser/helpers.test.ts`. B2 owns that file, and `helpers.ts` itself needs no edit.

### Inventory

The following table lists every item that stage B creates under the Bootstrap umbrella. Gated rows land only after their gate passes.

| Item | Subject | Unit | Proof |
| --- | --- | --- | --- |
| `ModalOptions.dialog` with TSDoc; `ModalInterface` remarks and `@throws` | Modal | B0, then B3 | `Modal.test.ts` `modal-dialog` cases and both controls |
| `ModalPluginOptions` (`dialog`, `gutter`); `createModalPlugin(options?)`; the `command` and `beforetoggle` capture routes under `dialog` | Modal | B0 (type), B2 | `plugins.test.ts`: option absent and present, frozen descriptor, nothing registered, caller mutation inert, routes present only under `dialog` |
| `isBrowserDialog` in `validators.ts` | Modal | B2 | `tests/src/browser/validators.test.ts`: a dialog in the test document and in a child frame, with a `div` and a non-element as controls; the `index.test.ts` export list as a patch |
| Markup refusal of every stage B leaf | All | B2 (`dialog`, `gutter`); held patches applied with B4 and B5 (`intrinsic`, `topmost`) | `tests/src/browser/helpers.test.ts`: `data-bs-dialog`, `data-bs-gutter`, `data-bs-intrinsic`, and `data-bs-topmost` set nothing through `resolveModalOptions`, `resolveOffcanvasOptions`, `resolveCollapseOptions`, and the tip and dropdown resolvers |
| `MODAL_OPEN` in `VeneerErrorCode` | Modal | B0, then B3 | `Modal.test.ts`; `tests/src/core/errors.test.ts` |
| `LockOptions`; `Lock` constructor options; `LockInterface.compensation`; `LockContext.reserved` | Lock | B0, then B3 | `Lock.test.ts` |
| `ModalOptions.gutter`, `OffcanvasOptions.gutter`, `OffcanvasPluginOptions`, `createOffcanvasPlugin(options?)` | Modal, Offcanvas | B0 (types), B2 (plugin), B3 (components) | `Modal.test.ts`, `Offcanvas.test.ts`, `plugins.test.ts` |
| `Modal.update` reads `compensation` | Modal | B3 | `Modal.test.ts` `lock-gutter:modal` |
| Modal component change (`Hold` on `closedby`, the engine-started flag, host listeners, rollback, `#content`) | Modal | B3 | `Modal.test.ts` |
| Row families `modal-dialog` and `lock-gutter` | Modal, Lock, Offcanvas | B3 rows; B7 applies | Family proofs, read in both directions |
| Gated: `CollapseOptions.intrinsic`, `CollapsePluginOptions`, `createCollapsePlugin(options?)`, the `collapse-intrinsic` rows | Collapse | B0 slice, B4 | `Collapse.test.ts`; `plugins.test.ts` |
| Gated: `topmost` on three options records, `DropdownPluginOptions`, `createDropdownPlugin(options?)`, `TipPluginOptions.topmost`, the `*-topmost` rows | Dropdown, Tip | B0 slice, B5 | `Dropdown.test.ts`, `Tip.test.ts`, `plugins.test.ts` |
| Guide `### Opt into native surfaces`: lead, leaf table, executed TypeScript fence, stylesheet fence, and limits (toasts and tips under a dialog; Tab; factory-replacement repetition; the gutter leaf and declaration together; one gutter leaf on both overlay plugins) | All | B0 (stylesheet fence), B7 (prose) | `tests/guides.test.ts` runs the TypeScript fence; B1's loader reads the stylesheet fence |
| `### Engine departures` lead sentence (`G:667`); forced-transition exception (`G:596`); `G:939` rewrite; Surface rows for each added type, `isBrowserDialog`, and the `LockInterface` row | All | B7 | `npm run test:guides` parity |
| Unchanged: Alert, Button (including `toggle.vn.button`), Carousel, Scrollspy, Tab, Toast, `createBootstrapPlugins()`, the entity factories | n/a | n/a | Stage A rows unchanged |

### Executed TypeScript fence

The executed TypeScript fence, as it lands with the ungated surfaces, reads as follows.

```ts
import {
	createBootstrapPlugins,
	createModalPlugin,
	createOffcanvasPlugin,
	createVeneer,
} from '@orkestrel/veneer/browser'

const veneer = createVeneer(document, {
	plugins: [
		...createBootstrapPlugins(),
		createModalPlugin({ dialog: true, gutter: true }),
		createOffcanvasPlugin({ gutter: true }),
	],
})
veneer.destroy()
```

If the user rules gutter detection, the `gutter` leaves and the `createOffcanvasPlugin` entry leave the fence.

### Claims flagged

None of the W3 claims is false at the tip.

---

## W4: the Veneer styles inventory

The styles inventory is integrated here. The following stage B rulings change its hand-offs.

- **Fence layer.** The fences sit in `@layer reset`, not unlayered. The styles lane's tension between the precedence of an unlayered stage B fence and chunk 3's home dissolves.
- **`[open]` rule.** `dialog.modal[open]` is dropped, pending B3.
- **Gated floats.** The float resets ship only after B5's gate passes.
- **Refused hand-offs.** `interestfor`, `@starting-style`, and top-layer toast and offcanvas are refused. Their hand-offs leave the list: `.toast[popover]`, `.offcanvas[popover]`, `interest-delay`, and the fade block.
- **Detection scope.** Under the recommended gutter leaf, the engine detects no CSS declaration on its own. Under the detection alternative, it detects only a root `scrollbar-gutter`. Under neither does it detect `interpolate-size`. D-5 therefore dissolves or narrows.
- **Neutralization home.** Native-host neutralization lives in `_reset.scss`, not in `surfaces/`, which overrules parity's W4 item 1. `surfaces/` keeps Veneer's own looks for user-agent pieces that no Bootstrap selector reaches (`RM:109`).

### Where the lanes agree

All four lanes agree on the following points.

- Bootstrap's sheet takes no native rule (`G:1144`, `:1176-1177`).
- The gutter and intrinsic collapse create no stylesheet work. You declare the gutter, and the engine holds `interpolate-size` inline.
- Whether `./styles` declares a root `scrollbar-gutter` is a user decision (D-5).

### Proposed placement rule for `./styles` (waits on D-1)

This verdict proposes the styles lane's placement rule. The user rules on it as D-1.

- **The finding behind it.** Every `./styles` layer after `bootstrap` beats Bootstrap's class rules on the same element at any specificity (`RM:26`). A bare-tag rule there contradicts "Classes stay the explicit control" (`RM:17`).
- **Proposal.** User-agent neutralization, and every tag default that overlaps a property Bootstrap can set, go in `reset`. A rule in a layer after `bootstrap` that overlaps Bootstrap must be a named row in the additions record, and the proof fails on an unrecorded overlap.
- **Alternative.** Tag defaults go in `elements`, as the folder law describes (`RM:105`) and as the earlier button surface did (`ident:123`). Each overlap becomes an additions value row (`ident:77`).

### What Bootstrap's sheet already covers

The following table separates Bootstrap's coverage from the gap that Veneer or the consumer fills.

| Subject | Covered in `src/bootstrap` | Gap Veneer or the consumer fills |
| --- | --- | --- |
| Reboot | `summary` at `_reset.scss:375`; `[hidden]` unlayered `!important` at `:382`; reduced-motion smooth scroll at `:9` | No `dialog`, `[popover]`, `::backdrop`, `::details-content`, `@starting-style`, `interpolate-size`, `scrollbar-gutter`, `::view-transition`, or `inert` rule (`es1:3`) |
| Modal | `.modal` (`components/_modal.scss`), `.modal-backdrop` | User-agent `dialog` box and `::backdrop` (`nr3:128-133`) |
| Dropdown, tooltip, popover | `_dropdown.scss:28`, `_tooltip.scss:4` (margin at `:19`), `_popover.scss:4` (border and fill at `:44-46`) | `[popover]` user-agent inset, overflow, border, padding, and `Canvas` fill when promoted (`feas:15`; `cdx:214`) |
| Fade, collapse, toast, carousel, tabs | `_transitions.scss`, `_toasts.scss`, `_carousel.scss`, `_nav.scss` | Native disclosure, scroll markers, and hidden panes, all outside stage B |
| Focus, placeholder | `.btn:focus-visible`, `.focus-ring:focus`, `.form-control::placeholder`; ring width `0.25rem` and opacity `0.25` (`src/bootstrap/_tokens.scss:131-132`) | The ring on native surfaces; a forced-colors outline; the bare `::placeholder` |
| Tokens | `--bs-*` at `_tokens.scss` | Density, radius, elevation, and motion factors; the tertiary role |

### What Veneer takes over from stage B

The following table lists the stage B fences that `./styles` takes over in chunk 3, with this verdict's corrections.

| Fence | Rule | Stage B status | Chunk 3 home | Reading to re-run |
| --- | --- | --- | --- | --- |
| `dialog.modal` reset | `margin: 0; border: 0; padding: 0; max-width: none; max-height: none; color: inherit; background: transparent` | Ships with B3 | `_reset.scss` | Boxes equal to the `div` host (`feas:13`; `cdx:210`) |
| `dialog.modal::backdrop` | `background: transparent` | Ships with B3 | `_reset.scss` | P12 |
| `dialog.modal[open] { display: block }` | | Dropped unless B3's reading differs | None | B3 recipe equality |
| `.dropdown-menu[popover]`, `.tooltip[popover]`, `.popover[popover]` | Uniform user-agent reset; Bootstrap wins where it declares | Gated on B5 | `_reset.scss` | B5 residue per class; `.popover` keeps its border |
| `.collapse[hidden='until-found' i]` | `display: block !important` | Deferred (G2) | The consumer only, while D-4 refuses `!important` in `./styles` | G2 |

### What Veneer comes up with: native-surface families

The following table lists the native-surface families that chunk 3 can design on its own. They serve bare elements and are not engine hand-offs.

| Family | Proposed home | Ruling and limit |
| --- | --- | --- |
| Bare `dialog` chrome and `:modal` | `_reset.scss` | Drop Elements' `scale(0.96)` (`ident:35`). The motion that replaces it is an open identity value (I-1) |
| Bare-dialog `::backdrop` scrim | `surfaces/` | Keep the 0 → 0.5 fade (`ident:37`) and drop `blur(2px)` (`ident:51`). `::backdrop` inherits from its dialog from Chromium 122 (`nr3:95`), so Elements' `:root` token workaround is not needed |
| Bare `[popover]` and hint look | `_reset.scss` | Drop `scale(0.98)` (`ident:44`, `:45`) |
| Bare-popover anchor defaults | `_reset.scss` | `position-anchor` resolves to `auto` with `position-area` from Chromium 151 (`nr1:20`) |
| `position-visibility` | None | Refused as stylesheet: the property defaults to `anchors-visible` in Chromium 153 (`sbm:52`). P0 settles the engine side |
| `details`, `summary`, `::details-content` | Marker in `_reset.scss`; tween in `surfaces/` | The tween is gated on reduced motion, because Elements' ungated tween drops (`ident:50`). It has no `getAnimations()` entry (`sbm:137`) |
| CSS lock for bare dialogs | `_reset.scss`: `html:has(dialog:modal:not(.modal)) { overflow: hidden }` | Under the gutter detection alternative, it writes no root `scrollbar-gutter`, because a gutter would switch the engine's `lock-gutter` path while a bare dialog is open. Under the recommended leaf, a gutter here switches nothing (D-5) |
| `:focus-visible` on native surfaces, forced-colors `Highlight` | `_reset.scss` | Values are an open identity value (I-4) |
| `::selection`, `::marker`, bare `::placeholder` | `_reset.scss` | Low priority; Bootstrap's `.form-control::placeholder` wins |
| `::view-transition-*` reduced-motion rule | `surfaces/` | Only for transitions the consumer starts; W1 refuses engine View Transitions (`sbm:166`) |
| Scroll-marker carousel; `scroll-target-group` navigation | `surfaces/` with a Veneer-owned class | Not engine-driven (`sbm:147`); scope awaits D-9 |
| `inert`, `interactivity` | None | No user-agent style to neutralize (`nr2:137`) |
| `::interest-button` | None | Experimental in Chromium 153 (`nr9:38`) |
| `interest-delay`, `@starting-style` fade block, `.toast[popover]`, `.offcanvas[popover]` | None | Removed by this verdict's refusals |

### Token system

The token rows follow the styles lane, under the reader law: a token ships only with a rule that reads it (T52 at `rep-d:58`; S3 at `plan-d:95`).

| Group | Ruling |
| --- | --- |
| Factors: density, radius, elevation, motion | Carry all four as registered `<number>` properties with initial value 1 (`ident:28`). Radius and shadow reach Bootstrap only if D-2 routes them |
| Motion durations: 150, 250, and 600 ms | Carry (`ident:29`, `:30`, `:31`) |
| Eases: standard, out, panel `cubic-bezier(0.32, 0.72, 0, 1)` | Carry the tokens (`ident:165`). Only Veneer-owned surfaces read them, because an eased `.fade` in place of Bootstrap's `linear` is an Elements look that drops (`ident:43`); I-2 |
| Roles, tertiary, light and dark base | Carry tertiary as fill plus emphasis. Keep triplets only where a contrast reader exists (`ident:22`) |
| Role-mix (oklab) | Carry for non-default packs; the default pack keeps Bootstrap's literal tiers |
| Contrast pick at 4.5 | Carry as a compile-time `@function` in `_mixins.scss` (`ident:59`) |
| Fonts, type ramp, space, radius, and shadow scales | Carry with Bootstrap-equal values, scaled by the factors |
| Focus metrics | Carry the mechanism; values are I-4 |
| State hover, active, and stripe | Carry the names (`ident:19`) with Bootstrap-derived amounts, keeping the 5% stripe (`ident:9`). Drop the Elements shade endpoint (`ident:20`) and the 12% stripe (`ident:11`); I-3 |
| Breakpoints, stacking ladder, containers, link, form, and button groups | Defer: no reader, and top-layer surfaces ignore `z-index` (`nr1:103-104`) |
| Color scheme on `:root` | Carry in `theme` |
| `html` keyword interpolation | Carry. **Corrected:** the engine does not detect `interpolate-size`, so a root declaration couples to nothing. Scoping it to `details` or `html` is a styles taste call, not D-5 |
| Elements-only groups (floater gutter, icons, slide distance, tints, disabled opacity) | Each enters only with a Veneer rule that reads it |

### Theme pack and registry groups

The pack shape is a proposal that waits on D-3. The registry rules stand.

- **Pack shape.** `retune($name, $light, $dark)` packs declare complete defaults (`RM:55`, `:111`). One `@function` feeds both copies, because the themes barrel loses `@use '../tokens'` at the first `:root` token (`RM:68`).
- **Default pack (D-3).**
  - Proposal: the default pack equals the `./styles` `:root` defaults, so `data-vn-theme="default"` returns a subtree to the unthemed look.
  - Alternative: a distinct default look. That look carries identity values the standing rule drops (`brief:42`) unless the user rules otherwise.
- **Test changes.** The empty-pack case at `tests/src/styles/themes/index.test.ts:36` becomes a completeness case. The `not.toContain(':root')` assertion at `:38` stays.
- **`TOKEN_NAMES.veneer`.** It holds the `--vn-*` names under the key law, where a terminal `base` key adds nothing, so no leaf ends in `-base` (`RM:50`). It is pinned in both directions against the built sheet, replacing `tests/src/styles/index.test.ts:38`.
- **`CLASS_NAMES.veneer`.** It holds every class that a `./styles` selector reacts to. That includes the Bootstrap names the reset selects (`modal`, `dropdown-menu`, `tooltip`, and `popover`), which is admissible because no layer is shared with `bootstrap` (`RM:40`).
- **Veneer-owned classes.** They avoid every `CLASS_NAMES.bootstrap` name, because Elements' `.small` collides with `src/bootstrap/_reset.scss:146`. They also avoid every name in the Tailwind record.

### Component looks

The component dispositions are proposals where a user decision governs them.

- **Tag defaults (D-1).** The proposal puts `button`, `article`, `input`, `select`, `table`, and `progress` defaults in `reset`, and the alternative is the D-1 alternative. Either way, the 12% stripe (`ident:11`) and weight 600 (`ident:24`) drop.
- **Take-overs of Bootstrap classes such as `.badge` and `.carousel` (D-6).**
  - Proposal: refuse them. A rule after `bootstrap` beats the class contract at any specificity (`RM:26`), and the styles surface does not copy the Bootstrap cascade (`RM:16`).
  - Alternative: admit each take-over as a recorded addition, which the Tailwind tenet permits (`RM:15`).
- **Deferred:** alert, list group, nav, and pagination looks.
- **Spinner:** under reduced motion, it takes `animation: none` (`ident:47`), and the slowed spinner drops (`ident:49`).
- **Toast:** the Elements toast look drops, together with the refused top-layer toast.

### Open decisions for chunk 3

The styles lane numbers these decisions. Its inventory has no file on disk, so the following table restates each decision this verdict names, with its evidence.

| Decision | Question | Evidence |
| --- | --- | --- |
| D-1 | The layer for tag defaults: `reset` or `elements` | `RM:17`, `:26`, `:105`; `ident:109`, `:123` |
| D-2 | Whether `./styles` routes root `--bs-*` radius and shadow names through the factors, which moves Bootstrap paint as `retuned` rows | `RM:29`, `:42`; `ident:28`, `:74` |
| D-3 | What the default pack means | `RM:55`, `:111`; `brief:42` |
| D-4 | Whether `./styles` declares `!important`, and whether it does so unlayered | `ident:134`, `:135`, `:266`; `src/bootstrap/_reset.scss:382` |
| D-5 | Whether `./styles` declares a root `scrollbar-gutter`. Under the recommended leaf, this is a taste call. Under detection, it moves every page that loads `./styles` onto the `lock-gutter` rows | Disagreement 1; `es1:35` |
| D-6 | Whether `./styles` takes over Bootstrap classes | `RM:15`, `:16`, `:26` |
| D-7 | The shape of the additions record that the placement rule's overlap rows extend | `ident:77`, `:249` |
| D-9 | The scope of CSS-only native components (scroll-marker carousel, target-group navigation, details) | `sbm:147`; `nr2:104` |
| D-10 | The browser floor: the measured Chromium 153 or a lower floor | `RM:145`, `:164`; `ident:150` |

This verdict leaves the following identity values open.

| Value | Question | Evidence |
| --- | --- | --- |
| I-1 | Bare-dialog motion in place of Elements' scale and blur | `ident:35`, `:37`, `:51` |
| I-2 | Which surfaces read the Veneer eases | `ident:43`, `:165` |
| I-3 | State hover and active amounts | `ident:19`, `:20` |
| I-4 | Focus ring values on native surfaces: Bootstrap's `0.25rem` at `0.25` or Elements' `0.1875rem` at `0.45` | `src/bootstrap/_tokens.scss:131-132`; `es1:17` |

### Claims flagged

The following styles-lane claims are corrected or flagged.

- **The fence tension** assumed an unlayered stage B fence. This verdict puts the fence in `reset`.
- **The styles lane's until-found row** says "only a layered `!important` beats `bs/_reset.scss:382`". An unlayered `!important` of higher specificity also beats it, as native's fence selector shows. D-4 still governs `./styles`.
- **The styles lane's refusal of `position-visibility`** holds for stylesheets. The initial value itself is P0's stage A question.
- **`RM:146`** still says chunk 3 opens after stage A, while the plan ruled stage B first (`tmp/units/veneer-remainder-3.md:44`). The Orchestrator updates that sentence. The user's ruling at `dv:69` already decides it.

---

## W5: units

None of these units starts in this stretch.

### Where the planners agree

All three planners agree on the following points.

- **Precondition:** `veneer-boot` has landed with D1, D2, and D4. `main` carries it at `419245d`.
- **Order:**
  1. an Opus contract unit, as edits only;
  2. an Astra harness unit;
  3. Astra family units in worktrees;
  4. an Astra integration unit;
  5. an Opus guide unit;
  6. one `orkestrel-falsify` round, then `verifier`.
- **Report-only files** come back as patches that the Orchestrator applies.
- **The proof ladder:** the touched file, then `npm run test:src:browser`, then `npm run test:guides` where the guide changes.

### Rulings

The unit rulings are the following.

- **One overlay unit.** The gutter and the dialog share one unit (B3), because `Modal.ts` consumes `Lock.compensation` and `Offcanvas.ts` passes the gutter leaf to its lock. Splitting them, as parity's U3 and U4 do, would share `Modal.ts` ownership.
- **Gated slices.** B0 writes the gated contract slices as held patches. The Orchestrator applies each patch only when its family unit's gate passes, so `main` never holds a leaf that does nothing (consumer, B0).
- **Classic scrollbar instrument.** The scrollbar instrument uses `Emulation.setScrollbarsHidden` from the Chrome DevTools Protocol (CDP), with a 15 px control. The root configuration hides scrollbars (`cdx:206`), and that configuration is scaffold-propagated (`RM:64`). If the CDP toggle fails its control, the question goes to the user.
- **Shared kind files.** `helpers.ts`, `constants.ts`, and `index.ts` stay report-only for every family unit. Native's B2 ownership of them is refused. B2 owns the resolver proof file `tests/src/browser/helpers.test.ts`, because the markup refusal needs no source edit.
- **Journey check.** Every landing also runs `npm run test:journey` (consumer).

### Units

The following table lists the units with their ownership, order, and readings.

| Unit | Lane | Owns | Order | Readings to re-run |
| --- | --- | --- | --- | --- |
| P0 `anchor-visibility` | Astra, read-only probe, deleted after | Probe file only | Any time; outside stage B | A clipped anchor in a scroller and in a transformed clipping ancestor, for the tooltip and dropdown, engine against Popper; control: anchor visible. A positive result opens a stage A repair of `Placement.ts` |
| B0 `stage-b-contract` | Opus, edits only | `src/browser/types.ts` (dialog, gutter, lock, remarks), `src/core/types.ts` (`MODAL_OPEN`), the guide's stylesheet fence and Surface rows; held patches for the `topmost` and `intrinsic` slices | After `veneer-boot` | The Orchestrator runs the browser-scope `tsc`; the only expected failures are the `Lock.ts` members B3 implements |
| B1 `stage-b-harness` | Astra | Engine section of `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, family entries in `tests/setup.ts`, `tests/setup.test.ts` | After B0 | Readers for `open`, `:modal`, `closedby`, `:popover-open`, `popover`, and inline `interpolate-size`; an `elementsFromPoint` hit-order reader with a known `z-index` control; a pixel reader that samples a page capture at named points, with a known `z-index` paint pair as its control; transient focus capture; the fence loader in both realms (control: a raw `dialog.modal` without the fence); the classic-scrollbar instrument with its 15 px control |
| B2 `stage-b-wiring` | Astra | `plugins.ts`, `plugins.test.ts`, `validators.ts` (`isBrowserDialog`), `tests/src/browser/validators.test.ts`, `tests/src/browser/helpers.test.ts` (markup-refusal cases; the gated cases as held patches) | After B0, parallel with B1 | A listener that a document capture handler adds to the target fires at the target, for `command` and for `beforetoggle`, against a control |
| B3 `native-overlay` | Astra, worktree | `Modal.ts`, `Lock.ts`, `Offcanvas.ts`, `Modal.test.ts`, `Lock.test.ts`, `Offcanvas.test.ts` | After B1 and B2 | **Gutter:** body, `.fixed-top`, `.fixed-bottom`, `.sticky-top`, an overflowing modal's `update`, offcanvas, RTL, `both-edges`, no overflow, both joining orders and a mismatched leaf; controls: a body-declared gutter, an overlay scrollbar, the leaf without a declared gutter, a declared gutter without the leaf. **Dialog:** P12; P6 repeated Escape; focus order (`showModal()`, trap, `close()`, data-API return); `showModal()` on an open host; a cancelled `beforetoggle`; hit order against a toast and a body tooltip; an ordinary-layer body tooltip beside and over `.modal-content`, read with the pixel reader, with a `div.modal` control; the `command`, `requestClose()`, direct `close()`, and form-submit routes; a script `showModal()` and `show()` against a built host and an unbuilt host, each with the same call on a host without the leaf as control; a host without `.fade`, where the engine's own `showModal()` runs inside the cancelled call's dispatch; a script open while the modal hides; destroy while opening and while closing; the `[open]` rule's necessity; both controls |
| B4 `native-intrinsic` | Astra, worktree | `Collapse.ts`, `Collapse.test.ts` | Parallel with B3 | Gate first: a content resize mid-transition; a null result returns "drop". Then: the 0 → `auto` start through `reflow`, reversal, reduced motion, padded and bordered panels, accordion propagation, destroy mid-transition |
| B5 `native-layer` | Astra, worktree | `Dropdown.ts`, `Tip.ts`, `Placement.ts` (only on a measured need), and their tests | After B3 lands | Gate first: clip escape in a `transform` plus `overflow: hidden` ancestor that clips stage A, and the user-agent residue per class under the reset-layer fence; a null escape returns "drop". Then: geometry within 1 px of Popper's population, RTL, a float inside a dialog modal, compositing of a body-level `topmost` tip over a dialog modal, hit order including a reopen, delegated children, an external `hidePopover()`, the `beforetoggle` fallback, no native open state after destroy, the static-path control |
| B6 `native-integration` | Astra | `tests/src/browser/integration.test.ts` | After B3 to B5 | Every landed surface on one page, plus a Bootstrap-only control page with no leaf |
| B7 `native-guide` | Opus | `G` § Browser entry `### Opt into native surfaces`, `:596`, `:667`, `:939`, the row patches; `RM:145-146` | Last | `npm run test:guides` |
| G1 `gate-offcanvas-dialog` | Astra, read-only probe | Probe only | Not scheduled | `<dialog class="offcanvas">` with `showModal()` for `scroll: false` and `show()` for `scroll: true`, across the `.offcanvas-{bp}` breakpoint crossing |
| G2 `gate-collapse-found` | Astra, read-only probe | Probe only | Not scheduled | A fragment reveal into a closed `.collapse` under the fence: the forced show, accordion siblings, scroll position, a padded panel, and findability after a later hide |
| G3 `gate-android-back` | Astra, read-only probe | Probe only | Not scheduled | Android Back against `closedby="none"`, a manual popover, and a `CloseWatcher`, with Escape as the control |
| G4 `gate-tab-found` | Astra, read-only probe | Probe only | Not scheduled | A fragment reveal into an inactive `.tab-content > .tab-pane.fade` under the fence: the forced `hide.bs.tab` and `show.bs.tab` as `cancelable: false`, the outgoing pane's fade, `aria-selected` on both triggers, and findability after the next tab switch; control: an active pane |
| G5 `gate-custom-command` | Astra, read-only probe | Probe only | Not scheduled | One click on a button that carries `commandfor` with `command="--toggle"` and `data-bs-toggle="collapse"`: the toggle count and the event order; control: the same button without the command pair. The deferral also needs a first real consumer |
| Close-out | Opus reviewer on the mechanism; Astra analyst on the contract | | After B7 | One falsify round, then `verifier` runs the tree-wide gates |

The following files are report-only, and each unit returns an exact patch for them:

- `types.ts`, after B0;
- `src/core/types.ts`;
- `constants.ts`, `helpers.ts`, and `index.ts`;
- `tests/src/browser/index.test.ts`;
- the guide, outside B0 and B7;
- `tests/setup.ts` and the engine section of `tests/setupBrowser.ts`, outside B1.

### Lanes-log predictions

Log the following entries before each landing.

- **B0 to B6:** predicted statechart rows: none.
  - The showcase composes `createBootstrapPlugins()` with tip boot, writes `div.modal`, and sets no leaf, so neither added modal route exists there.
  - The trigger search of `src/` and `app/` returns no stage B trigger. The only `until-found` text is Tailwind's preflight exemption at `app/browser/recipe.json:2049-2050`.
  - The gutter prediction holds because the showcase passes no `gutter` leaf. Under the detection alternative, it holds while no sheet the showcase loads declares a root gutter. `src/bootstrap` and the recipe declare none.
- **B1:** log the harness export names it adds.
- **B3:** name the `modal` and `offcanvas` rows and the responsive offcanvas tables as regression-sensitive (`cdx:301`, `:303`).
- **B4:** name the `collapse`, `accordion`, `navbar-390`, and `navbar-1280` rows (`cdx:302`).
- **B5:** name the `tooltip`, `popover`, and `dropdown` tables, including the `Dialog hint through …` rows (`cdx:298-300`).
- **P0, if it opens a repair:** that repair names the same floating tables and predicts none.
- **Additive contract changes:** the option parameters on the plugin factories are additive, so no showcase call site migrates.
- **The stylesheet fence** never enters the showcase, which loads Bootstrap's sheet alone (`RM:144`).

### Claims flagged

None of the W5 claims is false at the tip. Parity's split of U3 before U4 is overruled because it would share `Modal.ts` ownership. It is not a false claim.

---

## What the user must rule

1. **The gutter shape.** This verdict recommends option (b): a typed `gutter` leaf that writes nothing and acts only where the root declares a stable `scrollbar-gutter`. That shape is consistent with the `intrinsic` reasoning. The alternative is option (a), detection alone, under which a declaration from any reset changes the lock's writes with no Veneer option. Rule (b) or (a). D-5 follows from that ruling.
2. **Gated adds.** Accept that `topmost` and `intrinsic` land only if their gate readings show a gain, and are dropped otherwise.
3. **The `dialog` limits.**
   - Toasts and body-level ordinary tips outside an open dialog modal stay inert. B3's reading fixes whether they also paint beneath its content.
   - Tab from the last control leaves the document.
   - With `focus: false`, outside focus is still refused.
4. **Native transitions.**
   - Forced closes dispatch the before-event with `cancelable: false`, an exception to `G:596`.
   - A page's own `show()` or `showModal()` on a dialog-leaf host is cancelled and replayed through `show()`, so `show.bs.modal` can veto it.
5. **`MODAL_OPEN`:** accept throwing for a dialog host that is already open through a written `open` attribute or markup, rather than closing it first.
6. **The deferrals and their gates:** offcanvas `<dialog>` (G1), until-found on collapse (G2) and tab (G4), `CloseWatcher` with Android Back (G3), and custom `--` commands (G5).
7. **The default dialog reset.** Rule whether `./styles` ships the dialog reset by default. The reset also restyles Bootstrap-path `<dialog class="modal">` hosts by removing their user-agent border and padding, an effect that is unmeasured.
8. **P0 repair timing.** Rule whether a positive P0 reading can land as a stage A repair inside the stage B window.
9. **The classic-scrollbar fallback.** If the CDP scrollbar toggle fails its control, rule whether to change the scaffold-propagated root test configuration.
10. **Chunk 3 decisions:** D-1, D-2, D-3, D-4, D-5, D-6, D-7, D-9, and D-10 as W4's table states them, and the identity values I-1 to I-4. W4's placement rule, default pack, and take-over refusal are proposals that wait on D-1, D-3, and D-6.

## Gaps declined or adjusted

The critic's gaps are applied, with the following exceptions and adjustments.

- **`w4-undefined-citations`, applied in part.**
  - The short roots `rep-d`, `plan-d`, `ident`, and `es1` are added, and every M and T identifier now cites its distillate line.
  - The styles lane's own identifiers have no file to cite: D-1 to D-10, Q-I1 to Q-I13, its tension labels, its placement rule, and its section numbers. A search of the veneer and scaffold checkouts for `Q-I\d`, `W4\.[3-7]`, and "Proposed placement rule" found none of them. Matches for `T-\d` were unrelated fleet guide examples.
  - This verdict therefore restates each decision it relies on in its own tables (D-N and I-1 to I-4), with evidence, in place of a path.
- **`forced-native-open`, citation adjusted.** The gap cites `sbm:26` for a cancelable opening `beforetoggle`. `sbm:26` records the dialog's closing order. The dialog's cancelable opening `beforetoggle` cites `nr3:108`, and the measured popover case cites `feas:15`. The fix is applied as proposed. B3 also reads the nested `showModal()` that a host without `.fade` reaches inside the cancelled dispatch (`src/browser/Modal.ts:191-197`).
- **`gutter-detection-not-declinable`, name adjusted.** The gap offers `reserved` for the option leaf. The leaf is named `gutter` because it names the opted-in native surface, as `dialog`, `topmost`, and `intrinsic` do. `reserved` stays the `LockContext` fact (disagreement 9).