# Browser stage B design verdict

I wrote this revision in the objective lane. It checks correctness against the measurements, the objective check, and the code at veneer `main` `419245d`.

The verdict was reconciled on 2026-10-03 from the brief `tmp/units/stage-b-wide-design-brief.md` and revised for the gaps a completeness critic found. It was revised a second time against the objective check `tmp/codex/stage-b-verdict-check.md` (`chk`), which ran on GPT-6 Astra against `419245d`. Its inputs are:

- the three blind subjective planners: **parity** (Bootstrap parity first), **native** (native platform first), and **consumer** (blank-slate consumer first);
- the objective W4 Veneer styles inventory (**styles**). That inventory was delivered in the dispatch and has no file on disk. Where this verdict depends on one of its rulings, it restates the ruling as a proposal and cites the distillate evidence;
- the objective check and the probe readings it retains in `tmp/codex/stage-b-verdict-check-measurements.json`. Those readings are cited here through the check's own lines.

Every code citation was re-checked at `419245d`. At that commit stage A is finished: `createVeneer` takes explicit plugin lists, `Engine` is renamed `Veneer` in `src/browser/Veneer.ts`, and tip boot is a plugin option (`src/browser/types.ts:2162-2165`). Two standing rulings bind every design here. The engine is a blank slate: no default plugins, every default is a separate convenience, and nothing is forced. And `toggle.vn.button` stays (`scaffold/.orkestrel/veneer/browser-design-verdict.md:75-76`). All measurements are Chromium 153.0.8010.12 through Playwright 1.63.0.

Citations use the following shortened roots.

| Short form | Path |
| --- | --- |
| `brief` | `tmp/units/stage-b-wide-design-brief.md` |
| `chk` | `tmp/codex/stage-b-verdict-check.md` |
| `sbm` | `tmp/codex/stage-b-measurements.md` |
| `cdx` | `tmp/codex/browser-stage-b-design-verdict.md` |
| `feas` | `tmp/units/browser-feasibility-report.md` |
| `judge` | `tmp/units/stage-b-design-agent-2.md` |
| `pp` | `tmp/units/browser-design-planner-proposal.md` |
| `nrN` | `tmp/units/native-research-agent-N.md` |
| `niN` | `tmp/units/native-inventory-N.md` |
| `es1` | `tmp/units/elements-styles-1.md` |
| `ident` | `scaffold/.orkestrel/veneer/distillates/absorb-styles-identity-distillate.md` |
| `rep-d` | `scaffold/.orkestrel/veneer/distillates/absorb-styles-reports-distillate.md` |
| `plan-d` | `scaffold/.orkestrel/veneer/distillates/absorb-styles-plan-distillate.md` |
| `dv` | `scaffold/.orkestrel/veneer/browser-design-verdict.md` |
| `cv` | `scaffold/.orkestrel/veneer/browser-convention-verdict.md` |
| `names` | `scaffold/.claude/rules/names.md` |
| `styles-rule` | `scaffold/.claude/rules/styles.md` |
| `G` | `guides/veneer.md` |
| `RM` | `ROADMAP.md` |

## Decision

Stage B sorts every candidate into one of five outcomes.

- **Added, opted in by a typed leaf:**
  - `<dialog>` hosting for the modal, opted in by `ModalOptions.native` and `ModalPluginOptions.native`.
  - The reserved-gutter scroll lock, opted in by a `stable` leaf on the modal and offcanvas options and on their plugin options. It takes effect only where the author declares a stable root `scrollbar-gutter`. The user rules this shape against plain detection (ruling 1).
- **Added behind an acceptance gate:**
  - Top-layer floating panels: the `topmost` leaf on the dropdown, tooltip, and popover.
  - Intrinsic vertical collapse: the `intrinsic` leaf.
  - Both gain readings are positive in sampled native fixtures. Under a transformed clipping ancestor, promotion restored the hit that clipping removed (`chk:54`). With content that doubled mid-transition, the intrinsic path sampled 234.72 px against 117.36 px on the pixel path (`chk:50`).
  - A gated slice lands only with the unit whose integrated reading reproduces that gain on the implemented branch. If it does not, the unit returns "drop", and the capability and its types never land.
- **Deferred.** Each deferral waits on a gate probe that W5 owns:
  - `<dialog>` hosting for the offcanvas panel (G1);
  - `hidden="until-found"` reveal on collapse panels (G2) and on tab panes (G4);
  - `CloseWatcher`, together with Android Back (G3);
  - custom `--` invoker command routes (G5).
- **Refused.** Every other candidate the inventories and research name is refused, and each one has a row in W1. A row marked "scope" refuses an addition that no reading shows to be impossible. A row without that mark cites a measured incompatibility.
- **Stage A risk, investigated outside stage B:** P0 found that a floating panel's visibility differs from Popper's when its anchor is clipped (`chk:88-94`). P0 becomes a scoped repair investigation. It is not a prescribed `position-visibility` write.

A page that never opts in keeps stage A byte for byte. Under the recommended gutter shape, such a page sets no stage B leaf and loads no stage B stylesheet fence. Under the detection alternative, it also declares no stable root `scrollbar-gutter`.

- The trigger properties appear in no file under `src/` or `app/`. The search pattern was `scrollbar-gutter|interpolate-size|popover=|<dialog|showModal|commandfor|closedby|position-visibility`, and the check repeated it at `419245d` with no matches (`chk:96`).
- The only `until-found` text is Tailwind's preflight exemption inside `app/browser/recipe.json:2049-2050`. That text is a declaration and triggers nothing.

## The opt-in rule

Every stage B surface opts in through exactly one of three shapes. The deciding question is whether the surface's trigger can appear on a page that never asked for the surface.

1. **Typed leaf.** This shape applies wherever the trigger can come from a source unrelated to the surface. One source is markup that Bootstrap's engine already serves correctly. Another is CSS that shared resets declare for their own reasons.
   - The leaf is a top-level boolean on `{Entity}Options`, defaulting to `false`. Its name reads as an assertion (`names:115`, `:183`).
   - The same leaf sits in a narrow `{Entity}PluginOptions` record. `create{Entity}Plugin(options?)` copies the leaf when the factory runs and passes it to every component that the plugin's routes or boot build.
   - Markup never sets a leaf. The resolvers read only Bootstrap's keys from the markup record, then spread the typed options over them (`src/browser/helpers.ts:340-409`, `:492`, `:572-632`).
   - A leaf can make its effect depend on an author declaration. `stable` acts only where the root declares a stable gutter, so neither the declaration alone nor the leaf alone moves anything.
   - This shape covers `native`, `stable`, `topmost`, and `intrinsic`.
2. **Detected author markup.** This shape applies only where Bootstrap's own engine fails on markup that serves the surface alone. The one case is `hidden="until-found"` on a `.collapse` panel, if that surface returns from deferral. Under the sampled CSS, removing `hidden` alone leaves the collapse closed (`sbm:133`).
3. **Plugin-only option.** This shape is for a boot scan, which has no component meaning. It covers `boot` (`src/browser/types.ts:2162-2165`).

The rest of the rule:

- **Plugin option records stay narrow.** A plugin options record carries only that family's stage B leaves, plus `boot` on the tips.
  - Full component options on a plugin factory are refused as a scope choice: no consumer asks for them, and the law admits a capability only with a real consumer (AGENTS.md, Minimal public API).
  - Typed leaves also outrank markup in every resolver, while Bootstrap's `Default` sits beneath markup (consumer, Alternatives 2).
- **A stylesheet fence is a separate opt-in.** A fence that the guide publishes selects a native state or class. Loading it restyles every matching element whether or not that element's leaf is on. A no-leaf control is byte-equal to stage A only on a page that does not load the fence.
- **Scenario prefixes.** Departure rows use the prefix `{family}-{leaf}`, or `{family}-{declaration}` for detected markup. Sub-scenarios follow after `:`.
- **Departure table lead sentence.** The lead of `### Engine departures` (`G:680`) becomes: "every deliberate difference between Bootstrap's JavaScript and the engine on identical markup and configuration, or under the opt-in its Scenario prefix names".

---

## W1: per subject

### Where the planners agree

All three planners agree on the following points. The check confirms them where it read them (`chk:11-26`).

- **Native surfaces added nowhere:** Alert, Button, Carousel with `Swipe`, Scrollspy, Tab, and Toast.
- **`<dialog>` modal hosting is added.**
  - It runs only on a realm-aware `HTMLDialogElement` host.
  - `closedby="none"` is held through `Hold` while the dialog shows.
  - `showModal()` is called at the `display: block` write (`src/browser/Modal.ts:197`), and `close()` at the `display: none` write (`:217`).
  - `Backdrop`, `Trap`, and `Lock` are kept, and Escape stays on the keydown listener (`:55-63`).
  - The private field `#dialog` (`:18`) is renamed `#content`.
- **The two controls produce no row:** a `<dialog>` host without the leaf, and the leaf on a `div` host. Both controls run without the stylesheet fence.
- **`LockInterface.width` keeps its documented meaning** (`src/browser/types.ts:2225`). The judge's redefinition (`judge:309`) is overruled. `Modal.update` reads a separate compensation value (`src/browser/Modal.ts:151`).
- **Floating panels keep `Placement`** with explicit anchor pairs. Promotion is a separate lifetime (`cdx:228`). `.show` stays the open authority, and only `popover="manual"` is admissible.
- **Offcanvas `<dialog>` is not shipped in stage B.**
- **Refused everywhere:**
  - `popover="auto"` and `popover="hint"` (measured);
  - `<details>` (measured for the sampled recipe);
  - `@starting-style` and View Transitions (scope for `@starting-style`; measured for View Transitions);
  - `inert` as a trap (measured);
  - `::backdrop` as the scrim (the `div` backdrop is a transcript node);
  - `:has(dialog:modal)` as a lock (measured gap, W2 ruling 4);
  - `moveBefore`, `checkVisibility`, and `focus({ focusVisible })` (measured differences);
  - `ariaNotify` (scope);
  - toast promotion (scope);
  - CSS carousel pseudo-elements, scroll snap, and snap events (measured).

### Disagreements, ruled

1. **Gutter opt-in. The user rules this one. This verdict recommends a typed `stable` leaf that writes no gutter and acts only on a declared stable root gutter.**

   The four candidate shapes are ruled as follows.
   - **(a) Detection alone (parity, native).** Refused as the recommendation and offered to the user as the alternative.
     - It fixes a measured defect. On a classic 15 px scrollbar under a declared stable gutter, Bootstrap adds 15 px of body padding on top of the gutter (`cdx:211`; `sbm:78`).
     - It also moves pages that never opted in. A stable root gutter often comes from a shared reset: the Elements sheet declares `scrollbar-gutter: stable` on every element above 480 px (`es1:35`; `nr2:128`).
     - Such a page loses Bootstrap's 15 px compensation, and no option restores it. That breaks the rule that a page which never opts in keeps stage A byte for byte (`brief:27`), and the blank-slate rule that a default forces nothing (`brief:5`).
     - It also forces W4 to keep `./styles` from declaring a root gutter (D-5).
   - **(b) Typed `stable` leaf, effective only on a declared stable root gutter.** Recommended.
     - It applies the same reasoning that ruling 3 applies to `intrinsic`: a root declaration that comes from a reset moves nothing.
     - It matches `native`, `topmost`, and `intrinsic`.
     - The engine writes no root layout policy.
     - A page that declares the gutter without passing the leaf keeps Bootstrap's double compensation, which is Bootstrap's own behavior.
     - The shared lock takes the first acquirer's leaf. A page that passes the leaf to the modal plugin and not to the offcanvas plugin therefore gets compensation that depends on open order. The guide tells you to pass the leaf to both overlay plugins.
   - **(c) Detection with an opt-out leaf.** Refused. The opt-out defaults to on, so a page that never opts in still moves.
   - **(d) Typed leaf with an engine-written gutter (consumer, `cdx:174-202`).** Refused for shared-layout policy.
     - A typed request for a root gutter is itself an author opt-in (`chk:116`), so the refusal does not rest on the author having requested nothing.
     - The lock is shared across the document, so a leaf on one overlay would choose root layout for every other overlay and for the page, and layout would then depend on open order (`cdx:222`). Consumer names this risk itself.

   The contract, mechanics, and rows in this verdict specify (b). If the user rules (a), these changes follow:
   - drop `LockOptions`, the `stable` leaves, and `OffcanvasPluginOptions`;
   - the first acquisition reads the computed root `scrollbar-gutter` unconditionally;
   - `./styles` must not declare a root gutter unless the user accepts the coupling (D-5).

2. **Top-layer floats: defer (parity) against add (native, consumer, `judge:146-152`). Ruled: add, gated.**
   - The departure is measured: insertion order replaces the `z-index` scale (`cdx:216`).
   - Promoted geometry matches Popper in the sampled fixtures. The menu box sits at (70, 212) (`cdx:213`), and the arrow is within 0.141 px after neutralization (`cdx:214`).
   - The gain is measured in a sampled fixture. A transformed overflow ancestor clipped the unpromoted menu, and manual promotion restored the hit at the same geometry. Plain overflow allowed the hit with and without promotion (`chk:54`, `:189`).
   - Parity's gate becomes B5's first reading, run on the implemented branch with the family geometry population.
3. **Intrinsic collapse: defer (parity) against conditional add (native, consumer, `judge:141-143`). Ruled: add, gated, with the same mechanism.**
   - On fixed content, both paths animate to the same sampled 120 px endpoint under the sheet's 350 ms transition (`cdx:212`; `feas:21`). That is comparable sampled behavior, not a speed gain.
   - The gain is measured in a sampled native recipe. After content grew from 120 px to 240 px mid-transition, the pixel path sampled 117.36 px toward a `120px` endpoint, and the intrinsic path sampled 234.72 px toward `auto` (`chk:50`, `:188`).
   - B4's first reading reproduces that pair on the implemented branch, with an unchanged-content equality control.
   - The shape is a typed leaf, not detection. A root `interpolate-size` from any reset leaves the engine untouched.
4. **Native requests on a dialog host: refuse routing (parity) against routing through the show and hide gates (native, consumer). Ruled: route.**
   - Parity's refusal rests on `closedby="none"` disabling the watcher. That holds for user close requests only:
     - `requestClose()` enables the watcher and fires a cancelable `cancel` (`nr7:60`, `:126`);
     - the `request-close`, `close`, and `show-modal` commands performed their actions in Chromium 153 (`sbm:174`).
   - An unrouted native show or close strands the engine's state. A native `show-modal`, or a page's own `showModal()`, would leave a modal, inert page under Bootstrap's `.modal { display: none }`.
   - The opening `beforetoggle` of a dialog is cancelable (`nr3:108`). The check measured the replay: a target listener installed from document capture cancelled a native `show()`, and a synchronous `showModal()` under a reentrancy marker ended `open: true` and `:modal: true` (`chk:40`, `:181`).
5. **Forced native close (`dialog.close()` from page code, or a `form[method=dialog]` submit): dispatch only `hidden` (parity) against a non-cancelable `hide.bs.modal` (native). Ruled: dispatch `hide.bs.modal` with `cancelable: false` at the synchronous closing `beforetoggle`, then run the close path and dispatch `hidden`.**
   - A tip hides on its closest modal's `hide.bs.modal` (`src/browser/Tip.ts:96-98`). Skipping that event would leave the tips inside a force-closed modal shown.
   - The engine reconciles at the closing `beforetoggle`, which the browser dispatches synchronously inside `close()`, and never at the queued `close` event. The check measured that a queued `close` event can arrive after a reopen and observe `open: true` (`chk:30`, `:182`). The Modal mechanics specify each phase.
   - `emitEvent` constructs every event with `cancelable: true` (`src/browser/helpers.ts:800`). It gains one shared parameter, so no class copies dispatch logic (`chk:38`). W3 lists the contract.
   - The same rule covers an external `hidePopover()` on a `topmost` panel.
   - The `ComponentEvent` remark (`src/browser/types.ts:183`) and the guide sentence "Every `.bs.` event is cancelable" (`G:598`) gain this exception.
6. **`hidden="until-found"`: add by detection (native) against defer (parity, consumer). Ruled: defer, with the shape fixed in advance as markup detection.**
   - The integrated reveal is unmeasured: the engine's forced show, accordion siblings, scroll position, and a padded panel. `sbm:139` leaves it open.
   - Under the sampled CSS, navigation fired a noncancelable `beforematch` and removed `hidden`, but the `.collapse` panel stayed `display: none` and Bootstrap emitted no lifecycle event (`sbm:133`). That limits the unreconciled reveal. It does not prove a reveal impossible.
   - The reveal removes the attribute (`nr2:51`), so a panel that is hidden again is not findable unless the engine restores the attribute. G2 reads that too.
   - The fence needs `!important` to beat `src/bootstrap/_reset.scss:382`.
7. **A tip whose trigger sits in an open native modal. The options are to resolve the container to the dialog (native), throw `TIP_CONTAINER` (`cdx:230`), or state a guide limit (parity, consumer). Ruled: the guide limit, with no reparenting and no throw.**
   - The check measured paint (`chk:42`, `:190`). An ordinary body-level tooltip over native `.modal-content` painted beneath the content. A manually promoted body-level tooltip painted above it. Neither was hit-testable. On a `div.modal` host, the ordinary tooltip painted above the content.
   - Under the `native` leaf, a tip whose `container` sits outside the host is therefore hidden behind the content and inert. The limit sits at the opt-in: in the `native` TSDoc and in `### Opt into native surfaces`. It tells you to set `container` inside the modal, as `G:594` already asks for interactive tips.
   - An automatic container is refused, because it changes the tip's DOM parent based on runtime state.
   - A throw is refused. It would turn a documented limit into an error on every hover, and the Tip family would test a condition that only the Modal leaf creates.
   - `topmost` is a potential remedy for paint only. B5 confirms it on the implemented branch before the guide offers it.
8. **Float leaf name: `popover` (parity), `position.popover` (`judge:318`), or `topmost` (native, consumer, `cdx:186`). Ruled: `topmost`.**
   - `PopoverOptions.popover` and `createPopoverPlugin({ popover: true })` collide with the profile name.
   - Every `position` leaf projects a Bootstrap key (`src/browser/types.ts:934`, `:975`).
   - `Tip` spreads `position` into `Placement` (`src/browser/Tip.ts:210-216`).
   - `topmost` is an adjective and reads as an assertion (`names:115`, `:183`). The TSDoc states the insertion-order stacking, so the name claims only top-layer entry.
9. **Boolean names. Ruled: the modal leaf is `native`, the gutter leaf is `stable`, and `reserved`, `topmost`, and `intrinsic` are kept.**
   - The law: "Booleans read as assertions: `aborted`, `exhausted`, `expired`" (`names:115`). The value-level table requires "camelCase adjective/past participle" for a boolean (`names:183`).
   - The only exception is a name that transliterates an external protocol field, format field, or engine pragma (`names:120`). `dialog` names an HTML element and `gutter` names part of a CSS property. Neither transliterates a native boolean member, so the exception does not apply (`chk:106`).
   - **`dialog` becomes `native`.** It is an adjective: the modal runs as a native modal dialog. `modal` was rejected because `ModalOptions.modal` and `createModalPlugin({ modal: true })` stutter on the entity name.
   - **`gutter` becomes `stable`.** It is an adjective that mirrors the `scrollbar-gutter: stable` keyword the leaf reacts to, and its TSDoc names that keyword. `reserved` was rejected for the leaf because `LockContext.reserved` records a different fact: the leaf combined with the declaration, decided at the first acquisition. One term must not carry two concepts.
   - **`reserved` stays** on `LockContext`. It is a past participle, and it records the first acquisition's decision, which later CSS cannot safely recompute (`chk:102`).
   - The prefixes follow the names: `modal-native` and `lock-stable`.
10. **Error code: `MODAL_OPEN` (parity, consumer), `MODAL_DIALOG` (native), or `MODAL_STATE` (`cdx:220`). Ruled: `MODAL_OPEN`, thrown synchronously after `show()`'s existing no-op guards and before `show.bs.modal` dispatches.**
    - `show()` returns for a destroyed, visible, or hiding modal (`src/browser/Modal.ts:117`). Those guards run first, so a repeated `show()` on the engine's own open modal returns silently. A mixed trigger keeps one lifecycle (`chk:32`).
    - The error then applies only to an otherwise accepted open of a host that page markup or script already opened, through a written `open` attribute or markup that is open at load.
    - Script `show()` and `showModal()` calls never reach that state, because they are cancelled at the opening `beforetoggle` before `open` is set (ruling 4).
    - `showModal()` runs after the backdrop wait inside the async `#open` (`src/browser/Modal.ts:190-197`), so a failure there cannot reach the caller. The two outcomes are separate:
      - **A native throw** rolls back and is reported through the realm's `reportError`.
      - **A cancellation** by a page's `beforetoggle` listener is a defined outcome, not an error. The open rolls back, nothing is reported, and the lifecycle ends after `show.bs.modal`, as a vetoed show does.
11. **Offcanvas top layer: defer `popover="manual"` (native) against refuse (parity, consumer). Ruled: refuse `manual` as scope.**
    - The hide-veto failure at `sbm:33` was measured for `auto` and `hint` hosts, not `manual` (`chk:66`). A manual popover has no automatic close watcher, so that failure does not apply to it.
    - The refusal keeps one host path. The top-layer need folds into the deferred `<dialog>` gate G1, and the responsive in-flow variants (`dv:39`) stay on Bootstrap's path.
12. **Toast top layer: defer (native) against refuse (parity, consumer). Ruled: refuse as scope.**
    - Two limits are real. A promoted body-level toast stays inert under a modal (`sbm:105`). Promotion also takes the toast out of `.toast-container` layout (`dv:12`).
    - Promotion is not irreconcilable. The live-region properties survived manual promotion (`sbm:103`), and a promoted toast inside the modal's interactive subtree stacked and hit-tested first (`sbm:105`). No consumer asks for the addition.
13. **The remaining split rulings:**
    - **`scrollIntoView({ container })`** (native defers): refused. `sbm:117` measured that the option changes which scrollers move (`nearest` against `all`). The difference from Bootstrap's `offsetTop` delta comes from the scroll code (`src/browser/Scrollspy.ts:182-183`) and the research (`nr5:67`), not from that measurement (`chk:70`).
    - **ARIA element reflection** (consumer defers): refused. The setter empties the string attribute (`sbm:119`), which breaks the per-owner token list (`cv:151`).
    - **`interestfor`** (native defers): refused. See the Tooltip table.
14. **`dialog.modal[open] { display: block }`: keep (parity, native) against drop (consumer). Ruled: drop, conditional on B3's equality reading without the rule.** The engine's inline writes at `src/browser/Modal.ts:197` and `:217` decide display. The feasibility recipe (`feas:13`) ran without those writes.
15. **Where the stylesheet fence sits: unlayered (`cdx:248`, parity) against `@layer reset` (consumer, styles). Ruled: `@layer reset`.**
    - `reset` precedes `bootstrap` in the order statement (`RM:26`). A normal reset-layer rule therefore beats the user-agent origin and loses to every Bootstrap declaration, in the lifted sheet and in the drop-in alike (`RM:42`).
    - One uniform `[popover]` reset therefore keeps `.popover`'s border and fill (`src/bootstrap/components/_popover.scss:44-46`) without per-class tailoring.
    - `reset` is also a layer `./styles` owns (`RM:37`), so chunk 3 can take the rules over verbatim.

### Claims flagged

The following claims are false at the tip, contradicted by a measurement, or unmeasured.

- **Native:** "The tip grep found no … `until-found` … under `src` or `app`." This is false. `app/browser/recipe.json:2049-2050` carries `until-found` twice, inside Tailwind's preflight text. It triggers nothing.
- **`cdx:224`** cites the collapse phase derivation at `src/browser/Collapse.ts:96`. The derivation sits at `:90-92`.
- **`nr6:32`** says `request-close` sits behind a flag at M139. `sbm:174` contradicts it: the command performed its action in Chromium 153.
- **`nr1:63-72`** leaves the initial `position-visibility` value disputed. `sbm:52` and `nr9:40` settle it as `anchors-visible`.
- **Parity's Modal row** reads "`requestClose`, `request-close`, `CloseWatcher`: Refuse, `closedby="none"` disables the watcher". `nr7:60`, `nr7:126`, and `sbm:174` contradict it, as ruling 4 explains.
- **Parity's W4 claim** that the dialog reset "is safe to ship by default" is unmeasured. Its reasoning follows from the user-agent rules (`nr3:128-133`): Bootstrap's own path on a `<dialog>` host renders with user-agent borders.
- **This verdict's earlier text** made several claims that the check corrected:
  - one engine-started flag spanning the queued `close` event (`chk:30`);
  - an unplaced `MODAL_OPEN` precheck (`chk:32`);
  - an incomplete rollback (`chk:34`);
  - `sbm:33` as evidence against manual offcanvas (`chk:66`);
  - "Tab from the last control leaves the document" without a document context (`chk:82`);
  - `position-visibility: always` as an established repair (`chk:94`).

### Per-subject rulings

Each table rules on every candidate for its subject. "W2" means the cross-cutting ruling decides it. "Scope" marks a refusal that no reading shows to be impossible.

#### Alert

Nothing is added to the alert.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `@starting-style`, `allow-discrete` | Refuse (scope) | Close removes `show` without a display flip (`ni1:12`), so a starting style has nothing to establish; the stage A refusal stands (`dv:12`) |
| Popover host | Refuse | The alert is in flow, and `closed.bs.alert` fires on the removed node; a closing `beforetoggle` cannot be cancelled (`sbm:23`) |
| `ariaNotify` | Refuse (scope) | The markup already carries a live region; only a tree change was measured, not speech (`sbm:103`), so the refusal declines an unproved announcement channel |
| Custom `--close` command | Defer (W2) | No consumer |
| `CloseWatcher`, `inert`, `focusgroup`, size tweens | Refuse | The alert has no Escape path, no focus move, and no size tween (`ni1:15`) |
| `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |

#### Button

Nothing is added to the button.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| Native pressed toggle, checkbox `switch` | Refuse | HTML has no pressed toggle, and `switch` is not in Chromium 153 (`nr6:28-30`) |
| Invoker commands | W2 | |
| `toggle.vn.button` | Unchanged | Standing user ruling (`dv:76`; `G:598`) |
| `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |

#### Carousel and `Swipe`

Nothing is added to the carousel.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| View Transitions, document-scoped and element-scoped | Refuse | Completion runs on its own clock; under reduced motion, the 250 ms pseudo-element animations remain (`sbm:159-166`) |
| `::scroll-marker`, `::scroll-button()`, `scroll-target-group`, scroll snap | Refuse | No `slide` or `slid` event, and no `active` or `aria-current` writes (`sbm:147`) |
| `scrollsnapchange`, `scrollend` | Refuse | They cannot veto and carry no class contract (`nr2:118`) |
| Scroll-driven animations, scroll-state queries | Refuse | No contract to carry (`nr0:121-123`; `nr2:111`) |
| `hidden="until-found"` on items | Refuse (scope) | No integrated reading exists. Inactive items are hidden by `.carousel-item { display: none }` (`nr2:59`), and a reveal removes the attribute with no slide (`nr2:51`, `:61`). Reconciling would force a `select` past the cancelable `slide.bs.carousel` (`nr2:91`), write `hidden="until-found"` back on every outgoing item, and fight `ride`, whose next interval rotates the found item away (`nr2:90`). Those costs are a scope reason; they do not prove a reveal impossible (`chk:72`) |
| `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |
| Pointer events, `getAnimations`, `Animation.finish()` | Kept | Stage A |

#### Collapse and accordions

The collapse gains the gated `intrinsic` leaf.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `interpolate-size` vertical | **Add, gated** (B4) | Same sampled endpoint on fixed content (`cdx:212`; `feas:21`); positive growth reading (`chk:50`); B4 reproduces it on the implemented branch |
| `interpolate-size` horizontal | Refuse | Auto width finished at 300 px while `scrollWidth` was 120 px (`ni1:47`) |
| `calc-size()` | Refuse | No gain over `auto` under `allow-keywords`; it was not the function the probe ran (`ni1:47`) |
| `<details>`, `name`, `::details-content` | Refuse | `toggle` is not cancelable, and the sibling closed despite a veto (`sbm:135`). The sampled animation recipe exposed no `getAnimations()` entry and no transition event as a completion signal (`sbm:137-139`). That finding is limited to that recipe |
| `hidden="until-found"`, `beforematch` | **Defer** | Gate G2 (W5) |
| Invoker commands | W2 | |
| `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |

#### Dropdown

The dropdown gains the gated `topmost` leaf on its dynamic path.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `popover="manual"` top layer, dynamic path | **Add, gated** (B5) | Promotion matches Popper's box (`cdx:213`); positive clip-escape reading (`chk:54`) |
| `topmost` on the static or navbar path | Refuse | A navbar or static menu keeps `data-bs-popper="static"` and the sheet's position (`src/browser/Dropdown.ts:96-100`); native and consumer refuse the geometry snapshot that `cdx:228` demands |
| `popover="auto"` | Refuse | The close veto is lost (`sbm:23`, `:32`); `inside` and `outside` cannot be expressed (`dv:12`) |
| Popover invoker commands | Refuse | Under the leaf the attribute exists only while the menu shows; Bootstrap's click prevention suppresses the command (`sbm:176`) |
| `focusgroup="menu"` | Refuse | It duplicates the keydown route (`src/browser/plugins.ts:141-174`); menus wrap and Bootstrap's keys do not (`nr2:153`) |
| `anchor-size()` | Refuse | Sizing the menu to its toggle has no Bootstrap equivalent (`nr1:179`); the size is a stylesheet choice (AGENTS.md, Mechanism, not product policy) |
| `CloseWatcher` | W2 | |
| `position-visibility`, `anchor-scope`, anchored container queries, `showPopover({ source })` anchoring | Refuse as additions | Names are unique; the inline arrow is within 1 px (`G:606`); source-only geometry is unmeasured (`ni2:110`); P0 investigates the stage A visibility difference |
| `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |

#### Modal

The modal gains the `native` and `stable` leaves. Their full specifications follow the per-subject tables.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `<dialog>` with `showModal()` | **Add** | Measured recipe and controls (`cdx:210`); the accessibility tree reports the dialog as modal and excludes outside nodes (`sbm:93`) |
| `closedby="none"` | **Add**, within `native` | Escape reaches the keydown path with no `cancel` (`cdx:210`) |
| `closedby="any"` or `"closerequest"` | Refuse | `cancel` becomes non-cancelable without activation and on repeat (`sbm:24`) |
| Built-in `show-modal`, `close`, and `request-close` commands, and script `requestClose()` | **Add**, within `native` | Ruling 4; capture interception measured (`chk:181`) |
| Script `show()` and `showModal()` on the host | **Add**, within `native` | The opening `beforetoggle` is cancelable (`nr3:108`); replay measured (`chk:40`) |
| `::backdrop` as the scrim | Refuse | The `div` backdrop is a transcript node (`ni2:14`); the native backdrop is made transparent |
| `CSSPseudoElement` for `::backdrop` clicks | Refuse | The host covers the viewport (`feas:13`: 414 × 896), so it receives the backdrop click on the existing mousedown-plus-click route (`src/browser/Modal.ts:64-78`). The API serves a dialog whose box leaves its backdrop exposed (`nr3:96`) |
| `inert`, `focusgroup`, `focus({ focusVisible })` | Refuse | `inert` does not wrap focus (`feas:23`); Bootstrap passes no focus options (`nr5:46`) |
| `@starting-style` fade | Refuse (scope) | Starting style can establish the fade (`sbm:157`), and the feasibility recipe reconciled it (`feas:19`). The retained reflow fade shows the same sampled motion, so the addition has no measured gain |
| `:has(dialog:modal)` lock, `overscroll-behavior` | Refuse | Under this verdict `close()` runs after the host transition (`src/browser/Modal.ts:215-217`). A `:has()` root lock would end there, before the backdrop transition (`:221-222`) and the `Lock` release (`:227`), so the page could scroll during the backdrop fade. Containment alone lets the page scroll over the backdrop (`sbm:72`) |
| `moveBefore` for the append at `src/browser/Modal.ts:196` | Refuse | The host is disconnected or unshown when moved; a root mismatch throws (`nr5:63`) |
| Reserved gutter | **Add**, by the `stable` leaf | Ruling 1 |
| `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |

#### Offcanvas

The offcanvas gains the `stable` leaf and nothing else.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `<dialog class="offcanvas">` | **Defer** | Gate G1 (W5); no reading exists (`ni2:26`) |
| `popover="auto"` | Refuse | Under a hide veto, `.show` remained while the native surface closed (`sbm:33`) |
| `popover="manual"` | Refuse (scope) | Ruling 11: `sbm:33` did not test manual; the refusal keeps one host path for G1 and the responsive in-flow variants (`dv:39`) |
| `closedby`, `CloseWatcher` | Refuse; W2 | |
| Reserved gutter | **Add**, by the `stable` leaf | Ruling 1; the lock is acquired only when `scroll` is `false` (`src/browser/Offcanvas.ts:123`) |
| `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |

#### Popover and Tooltip

Both tip profiles gain the gated `topmost` leaf.

| Candidate | Ruling | Evidence |
| --- | --- | --- |
| `popover="manual"` | **Add, gated** (B5) | The neutralized recipe matches Popper within 0.141 px (`cdx:214`); positive clip-escape and paint readings (`chk:42`, `:54`) |
| `popover="hint"` | Refuse | One hint replaces another, while Bootstrap keeps independent tips (`sbm:47`); its close cannot be vetoed (`sbm:23`) |
| `interestfor`, `::interest-button` | Refuse | It works only on `button`, `a`, and `area` and excludes disabled controls (`nr3:210`, `:223`); Escape's `loseinterest` cannot be cancelled (`sbm:50`); an author `aria-describedby` replaces the native description (`sbm:91`); `::interest-button` generation is unproved (`sbm:51`) |
| ARIA element reflection | Refuse | Ruling 13 |
| Automatic container resolution, `TIP_CONTAINER` | Refuse | Ruling 7 |
| `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |

#### Scrollspy, Tab, and Toast

These three subjects gain nothing.

| Subject | Candidate | Ruling | Evidence |
| --- | --- | --- | --- |
| Scrollspy | `scroll-target-group`, `:target-current` | Refuse | No event and no `active` class (`nr2:104`) |
| Scrollspy | `scrollIntoView({ container })` | Refuse | Ruling 13 |
| Scrollspy | `scrollend` | Refuse | Activation follows observer entries, and no Bootstrap contract waits on scroll completion (`nr2:103-104`; `ni2:49`); smooth scrolling stays `scrollTo` (`src/browser/Scrollspy.ts:182-183`) |
| Scrollspy | `beforematch` in place of the direction latch | Refuse | `beforematch` fires only on `hidden="until-found"` ancestors during find-in-page and fragment reveal (`nr2:49-55`). Spied sections carry no such attribute, so the event never reaches the latch (`src/browser/Scrollspy.ts:114-131`) |
| Scrollspy | `focusgroup` | Refuse | The spy writes only classes and has no keyboard contract (`ni2:49`); a focusgroup reduces the nav's links to one tab stop (`nr2:154`), a change Bootstrap does not make |
| Tab | `focusgroup` | Refuse | Bootstrap's `tabindex="-1"` drops inactive tabs, and focus moves without selecting (`nr2:157-162`) |
| Tab | View Transitions; `hidden` panes; scroll-marker tabs mode | Refuse | `sbm:162`; `dv:12`; not in Chromium 153 (`nr2:71`) |
| Tab | `hidden="until-found"` panes | Defer | Gate G4 (W5) |
| Toast | Top layer | Refuse (scope) | Ruling 12 |
| Toast | `ariaNotify` | Refuse (scope) | As for Alert |
| All three | `ElementInternals`, `:state()` | Refuse | Boot scope entry under Shared mechanisms |

#### Shared mechanisms

Most shared mechanisms are unchanged.

- **`Backdrop`:** unchanged. The `div` backdrop paints beneath the top-layer dialog with a transparent `::backdrop`. That reading is P12, with the user-agent `rgba(0, 0, 0, 0.1)` backdrop as its control (`pp:414`).
- **`Trap`:** unchanged, and the sole focus wrapper in every configuration.
- **`Lock` and `Hold`:**
  - `Lock` gains `LockOptions.stable` and the reserved-gutter path, specified later in this section.
  - `Hold`'s algorithm is unchanged. Under stage B, its slots are `closedby` and, when the gates pass, `popover` and inline `interpolate-size`.
- **`Placement`:** no stage B public change. `Dropdown` and `Tip` own promotion. Any `Placement` change P0 finds lands as a stage A repair before B5 (W5).
- **Transition wait:** unchanged (W2). `TransitionEvent.animation` is refused.
  - The wait already reads the element's own `CSSTransition` objects from `getAnimations()`, excludes pseudo-element effects, and listens for no `transitionend` (`src/browser/helpers.ts:917-939`).
  - The property only links a `transitionend` event to such an object (`sbm:53`).
- **Boot scope:** unchanged for pages without leaves.
  - `ModalPluginOptions.native` adds two capture routes, on `command` and on `beforetoggle`. The scope listens in the capture phase for every route event a plugin names (`src/browser/Veneer.ts:66-73`). `beforetoggle` reaches capture listeners although it does not bubble (`nr3:38`).
  - `ElementInternals` and `:state()` are refused for the boot scope and for every subject. `attachInternals()` throws for any element that is not an autonomous custom element; see the [HTML custom elements specification](https://html.spec.whatwg.org/multipage/custom-elements.html#dom-attachinternals). The engine binds Bootstrap's own `div`, `button`, and `a` hosts (`ni1:23`), whose state contract is the classes Bootstrap's sheet selects (`ni2:58`). The inventory reads only `:state(x)` support (`ni2:128`, `:139`).

---

### Added: Modal `native`

#### Contract

The contract adds the following declarations.

```ts
// src/browser/types.ts, ModalOptions gains:
/**
 * If `true`, a `<dialog>` host runs as a native modal dialog: it opens with `showModal()` into the browser's top layer, closes with `close()` after its hide transition, holds `closedby="none"` while it shows, and routes its `command`, `cancel`, and `beforetoggle` events through `show` and `hide`; if `false`, every host keeps Bootstrap's path. A host that is not a `<dialog>` keeps Bootstrap's path under either value. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly native?: boolean

/**
 * Configures the native surfaces of every modal a modal plugin creates.
 *
 * @remarks
 * The factory copies these leaves when it runs, so a later change to the passed record changes no plugin. The first `createModal` call with non-empty options replaces a modal the plugin built from markup with one built from the markup and those options, so that call repeats `native` and `stable` to keep them; a later call returns the configured modal and ignores its options.
 *
 * @example
 * ```ts
 * const options: ModalPluginOptions = { native: true, stable: true }
 * ```
 */
export interface ModalPluginOptions {
	/** If `true`, every modal the plugin creates takes `ModalOptions.native`, and the plugin routes `command` and `beforetoggle` events aimed at a `<dialog class="modal">` host; if `false`, the plugin creates modals on Bootstrap's path and routes neither event. Default: `false`. */
	readonly native?: boolean
	/** If `true`, every modal the plugin creates takes `ModalOptions.stable`; if `false`, none does. Default: `false`. */
	readonly stable?: boolean
}

// ModalInterface @remarks gains: "Under the `native` leaf, toasts and body-level tips outside the open host are inert while it shows, and a tip appended outside the host paints beneath the host's content; set a tip's `container` inside the modal to keep it visible and interactive. The browser runs its dialog focusing steps before the trap focuses the host at `shown`. In a document inside a frame, Tab from the last control moves focus out of that document. A page's own `show()` or `showModal()` on the host runs through `show`, so `show.bs.modal` can veto it. A close the page forces, through `close()` or a `method="dialog"` form, dispatches `hide.bs.modal` with `cancelable: false`."
// ModalInterface.show gains: "@throws Thrown when the `native` leaf is on, the modal is hidden and not hiding, and its `<dialog>` host already carries `open` from page markup or script: `VeneerError` with code `MODAL_OPEN`."

// src/browser/types.ts, the ComponentEvent @remarks sentence at :183 becomes: "Every `.bs.` name is cancelable, as Bootstrap's `EventHandler.trigger` makes it, except the before-event the engine dispatches after the browser has already closed a native surface you opted into; that event carries `cancelable: false`."

// src/core/types.ts, VeneerErrorCode (:55) gains:
| 'MODAL_OPEN'

// src/browser/helpers.ts, emitEvent (:787-812) gains a final parameter on the detail overload and the implementation:
/**
 * @param cancelable - If `true`, a listener can veto the change the event announces; if `false`, the event reports a change the browser already made. Default: `true`.
 */

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
 * @param options - Leaves the plugin copies and passes to every modal it creates. Default: none, so every modal keeps Bootstrap's path.
 * @returns The frozen modal plugin.
 * @example
 * createModalPlugin({ native: true })
 */
export function createModalPlugin(options: ModalPluginOptions = {}): PluginInterface<Modal>
```

`isBrowserDialog` follows `isBrowserElement` (`src/browser/validators.ts:11`). The guard must work across realms, because the oracle runs in a child frame (`judge:183`). The barrel star-exports `validators.ts` (`src/browser/index.ts:4`), so the guard is public and takes a Surface row.

#### Mechanics

The following mechanics are fixed against the tip. B3 owns their correctness.

- **Guard.**
  - The native path runs only when the leaf is `true` and `isBrowserDialog(host)` holds.
  - Every other combination runs the stage A code unchanged.
- **Native marker.** One private field records the native toggle that is in progress on the host, as `'open'` or `'closed'`. These are the external `newState` values.
  - The engine sets the field immediately before its own `showModal()` or `close()` call and clears it in a `finally` immediately after. The marker never spans a queued event.
  - The forced-close listener sets it to `'closed'` for the extent of its own synchronous work, because a native close is in progress during that dispatch.
  - A `beforetoggle` whose `newState` equals the marker belongs to the engine or to the forced close in progress. Every other `beforetoggle` belongs to the page.
  - The engine routes no queued `close` or `toggle` event. That removes the stale-completion race (`chk:30`, `:182`).
- **`show()`.**
  - The guards at `src/browser/Modal.ts:117` run first and return for a destroyed, visible, or hiding modal.
  - On the native path, a host that then carries `open` throws `MODAL_OPEN` before `show.bs.modal` dispatches, so no event or write precedes the throw.
- **`#open`.**
  - At the `display: block` write (`src/browser/Modal.ts:197`), a `Hold` owned by the modal acquires `closedby` and writes `none`. Then `showModal()` runs under the marker, inside a `try`.
  - After the call returns, `#open` returns at once if the modal is destroyed or the opening's controller is aborted. A `beforetoggle` listener, the browser's autofocus, or a forced close inside the call can cause either one, and `destroy` or the forced path has already settled the state.
  - The open rolls back if `showModal()` threw, or if the host does not match `:modal` afterwards because a page listener cancelled the native open. Rollback reverses every acquisition and write that `show()` and `#open` made:
    1. abort the opening's controller and clear `#showing`;
    2. return `display` to `none` and release the `closedby` hold;
    3. hide the backdrop;
    4. clear the modal's inline `padding-left` and `padding-right` that `update()` wrote (`:123`);
    5. remove `modal-open` from the body only when no other shown modal remains, as `destroy` does (`:180-185`);
    6. release this lifetime's `Lock` acquisition, which leaves another overlay's acquisition in place.
  - Rollback dispatches no `shown` and no `hidden`. A native throw is reported through the realm's `reportError`. A cancellation is reported nowhere.
  - Bootstrap's writes keep their order (`:198-208`). The trap activates at `shown` when `focus` is not `false`.
- **`#close`.**
  - At the `display: none` write (`:217`), `close()` runs under the marker only when the host is open and no native toggle is in progress.
  - `closedby` is released after `this.#lock.release()` (`:227`).
  - `destroy` closes an open host under the marker and releases the hold.
- **Host listeners.** On the native path, the following listeners bind to the host at construction under the lifetime signal.
  - **`command`:**
    - `show-modal` calls `preventDefault()`, then `show(source)` with the event's element source.
    - `close` and `request-close` call `preventDefault()`, then `hide()`.
    - A custom `--` command passes through untouched.
  - **`beforetoggle` with `newState` `open` and no matching marker:** a page's script `show()` or `showModal()`. The listener calls `preventDefault()`, then `show()` with no opener.
    - The guards, the show veto, and the `MODAL_OPEN` precheck therefore apply.
    - A vetoed `show.bs.modal`, or an open attempted while the modal hides, opens nothing.
    - On a host without `.fade`, `#open` reaches the engine's own `showModal()` inside this dispatch (`src/browser/Modal.ts:191-197`). The marker keeps the listener from acting on that nested call. The check measured the nested replay (`chk:181`), and B3 reads it in the component.
  - **`cancel`:** calls `preventDefault()`, then `hide()`. A script's `requestClose()` therefore passes the `hide.bs.modal` veto.
  - **`beforetoggle` with `newState` `closed` and no matching marker:** a forced close. The listener sets the marker, acts by phase, and clears the marker in a `finally`:
    - **`hidden`:** nothing. The engine never opened this host.
    - **`showing`:** the listener aborts the opening's controller and clears `#showing`, so `#open` publishes no trap and no `shown`. It then acts as for `shown`. This bypasses the refusal at `src/browser/Modal.ts:129`.
    - **`shown`:** the listener dispatches `hide.bs.modal` through `emitEvent` with `cancelable: false` and starts `#hiding`. It deactivates the trap, removes `.show`, and runs `#close`, whose `close()` call is skipped. `#close` dispatches `hidden`.
    - **`hiding`:** nothing is added. The accepted hide has already dispatched its before-event, and its later `close()` call is skipped because the host is closed.
- **Not routed.** A written `open` attribute fires no event (`chk:183`), so the engine does not reconcile it. The next accepted `show()` throws `MODAL_OPEN`.
- **Kept unchanged.**
  - Escape stays on keydown (`:55-63`).
  - The backdrop click stays on mousedown plus click against the full-viewport host (`:64-78`).
  - Every other `*.bs.modal` event keeps its cancelability.
- **Plugin routes.**
  - Under `native: true`, `createModalPlugin` adds the capture routes `{ event: 'command', selector: 'dialog.modal' }` and `{ event: 'beforetoggle', selector: 'dialog.modal' }`. Neither route has an `execute`, so each only builds a missing component (`src/browser/types.ts:2043-2044`; `src/browser/helpers.ts:101-112`).
  - The built component then handles the event at its own host, which keeps the plugin on the entity's public interface (`scaffold/.claude/rules/architecture.md:216`).
  - A descendant popover's `beforetoggle` inside a native modal also matches the selector through `closest`. It builds the modal only when the modal is missing, and does nothing else.
  - A button that carries both `data-bs-toggle="modal"` and `commandfor` gets one lifecycle. The click route shows the modal, and the later command is prevented while `show()` returns at its visible guard.
- **Rename.** The private field `#dialog` becomes `#content`.

#### Departure rows

All rows use the `modal-native` prefix, and `Modal.test.ts` consumes them. Each Bootstrap value is Bootstrap's engine on the identical `<dialog class="modal">` host. Final cells come from the implemented branch (`cdx:261`).

| Scenario | Path | Bootstrap | Engine |
| --- | --- | --- | --- |
| `modal-native` | `$::open` | `<absent>` | `""` while shown |
| `modal-native` | `$::closedby` | `<absent>` | `none` while shown |
| `modal-native` | `$::modal` | `false` | `true` |
| `modal-native:focus` | `$::focus` between show and shown | opener | the browser's dialog focus target (`sbm:57`) |
| `modal-native:tab` | `$::focus` after Tab from the last control, in the harness document | first control | outside the document (`chk:185`) |
| `modal-native:focus-off` | `$::focus` on an outside control, `focus: false` | outside control | refused |
| `modal-native:order` | hit order against a body toast and a body tooltip | toast, tooltip | dialog |
| `modal-native:paint` | pixel under an ordinary-layer body tooltip over `.modal-content` | tooltip | modal content (`chk:190`) |
| `modal-native:command` | events and classes after a native `show-modal` | native open, no `.show`, no events | full show lifecycle |
| `modal-native:script-open` | events and classes after a script `showModal()` or `show()`, on a built and an unbuilt host | native open, no `.show`, no events | native open cancelled, then the full show lifecycle; nothing opens under a `show.bs.modal` veto or while hiding |
| `modal-native:cancel` | events and classes after `requestClose()` | native close, `.show` remains (`sbm:34`) | hide gate |
| `modal-native:close` | events after a direct `close()` | native close, `.show` remains | `hide` with `cancelable: false`, then `hidden` |

#### Stylesheet

The rules live in your stylesheet. They are published as a guide fence under `### Opt into native surfaces`, and B1's loader injects the fence text into both realms.

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

The fence selects every `dialog.modal`, so loading it also normalizes a dialog host whose leaf is off (`chk:127`). The guide states that coupling. The no-leaf control runs without the fence.

- **Selector alternative, refused:** `dialog.modal:modal`. It would leave non-leaf hosts untouched. But a forced close drops `:modal` before the hide transition ends, so the host would show its user-agent border and padding for the rest of the fade. That recipe is also unmeasured.
- **Other homes, refused:**
  - **The Bootstrap face:** "A value, selector, or context departure is inadmissible in the Bootstrap sheet" (`G:1159`), and additions belong to the styles face (`G:1191-1192`).
  - **The engine's constructed sheet:** refused as presentation (AGENTS.md, Mechanism, not product policy).

### Added: `Lock` reserved gutter

The shape in this section is the recommended option (b) of ruling 1. It waits on the user's ruling and on a classic-scrollbar instrument (What the user must rule, item 2).

#### Contract

The contract adds the following declarations.

```ts
/**
 * Configures a scroll lock at creation.
 *
 * @example
 * ```ts
 * const options: LockOptions = { stable: true }
 * ```
 */
export interface LockOptions {
	/** If `true`, a first acquisition that finds the root element's computed `scrollbar-gutter` beginning with the `stable` keyword compensates nothing; if `false`, the lock compensates the measured scrollbar width as Bootstrap does. A joining acquisition keeps the first acquirer's result. Default: `false`. */
	readonly stable?: boolean
}
// Lock gains constructor(root: Document = document, options: LockOptions = {}).

// LockInterface gains (width keeps its meaning at src/browser/types.ts:2225):
/** Reports the padding in CSS pixels the shared lock compensates: `0` while the shared lock is reserved, and `0` while unlocked when this lifetime's `stable` leaf is on and the root element's computed `scrollbar-gutter` begins with `stable`; otherwise `width`. */
readonly compensation: number

// LockContext (:2313) gains:
/** If `true`, the first acquirer carried the `stable` leaf and the root element's computed `scrollbar-gutter` began with `stable`, so the lock compensates nothing; if `false`, it compensates the measured width. */
readonly reserved: boolean

// ModalOptions and OffcanvasOptions gain:
/**
 * If `true`, the scroll lock compensates nothing when the root element declares `scrollbar-gutter: stable`; if `false`, it compensates the scrollbar width as Bootstrap does. A declared gutter without this leaf keeps Bootstrap's compensation. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly stable?: boolean

// OffcanvasPluginOptions { readonly stable?: boolean } follows the ModalPluginOptions form;
// createOffcanvasPlugin(options?: OffcanvasPluginOptions). ModalPluginOptions.stable is in the native contract.
```

#### Mechanics

The following mechanics apply to the gutter path.

- **Construction.** `Modal` and `Offcanvas` pass their `stable` leaf to their lock (`src/browser/Modal.ts:52`; `src/browser/Offcanvas.ts:60`).
- **The read.** When the first acquirer carries the leaf, the acquisition reads the computed `scrollbar-gutter` of `documentElement` before its first write (`src/browser/Lock.ts:59`). Both `stable` and `stable both-edges` count.
- **Bootstrap's loop, with its exact footprint.** The loops at `:62-87` run with `compensation` in place of `width`, including the skip tests at `:69` and `:80`. Under a reserved lock, that footprint is Bootstrap's own zero-width footprint (`chk:46`, `:186`):
  - `body` still takes `overflow: hidden`;
  - `body` still takes an inline `padding-right` equal to its computed padding, and an existing inline value is still saved in `data-bs-padding-right`;
  - a fixed element whose width already excludes the gutter fails the skip test at `:69` and takes no write;
  - a sticky element fails the skip test at `:80` and takes no write.
  - The refused alternative is D3's "omit every adjustment" path (`cdx:222`). It adds a third footprint that differs from Bootstrap's own zero-width behavior.
- **Joining locks.** They are unchanged (`:47-57`) and keep the first acquirer's `reserved`.
- **The modal.** `Modal.update` reads `compensation` (`src/browser/Modal.ts:151`). An overflowing modal then takes the zero-width branch at `:155-156`, as Bootstrap's does (`judge:166`).
- **No write.** The engine writes no gutter.
- **No effect:**
  - a gutter declared on `body`, because the specification applies the gutter only from the root (`nr8:25`);
  - an overlay scrollbar, which has no gutter;
  - the leaf without a declared gutter;
  - a declared gutter without the leaf.

#### Departure rows

All rows use the `lock-stable` prefix, and each row has one owning case. B3 records the cells from the footprint the mechanics prescribe, measured on the classic-scrollbar instrument.

- **`Lock.test.ts`:** `body::padding-right` (Bootstrap adds the width; the engine writes the computed value), `.fixed-top::padding-right`, `.fixed-bottom::padding-right`, `.sticky-top::margin-right`, and each `data-bs-*` save attribute that one side writes and the other does not.
- **`Modal.test.ts`:** `lock-stable:modal` covers `$::padding-left` and `$::padding-right` on `update`.
- **`Offcanvas.test.ts`:** `lock-stable:offcanvas`.
- **Controls with no row:**
  - a gutter declared on `body`;
  - no declared gutter;
  - the leaf without a declared gutter;
  - a declared gutter without the leaf.

#### Stylesheet

You declare `html { scrollbar-gutter: stable; }` yourself and pass the `stable` leaf. The declaration alone changes nothing.

### Added behind a gate: Collapse `intrinsic` (unit B4)

#### Contract

This slice lands only when B4's acceptance reading passes.

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
// createCollapsePlugin(options?: CollapsePluginOptions) copies the leaf and creates with { toggle: false, intrinsic } (src/browser/plugins.ts:114).
```

#### Mechanics

The following mechanics apply to a vertical panel under the leaf.

- **Show.**
  1. A `Hold` dedicated to the transition acquires inline `interpolate-size`, and the engine writes `allow-keywords`.
  2. The panel takes `0px` (`src/browser/Collapse.ts:124`), and the trigger writes keep their place (`:125`).
  3. `reflow` replaces the `scrollHeight` flush (`:126-127`).
  4. The panel takes `auto`.
- **Hold lifetime.** The dedicated `Hold` releases at show completion, where the inline dimension clears (`:205`), and in `destroy` (`:164-170`). The lifetime `Hold` for trigger writes is unchanged.
- **Hide.** Unchanged (`:132-155`).
- **Refusal during a transition.** `show` and `hide` keep their refusal while `.collapsing` is present (`:100-105`, `:133-138`). B4 reads that refusal. It does not read a reversal contract.
- **Phase.** The derivation at `:90-92` holds, because `auto` is non-empty.
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

This slice lands only when B5's acceptance reading passes.

```ts
// DropdownOptions gains:
/**
 * If `true`, the dynamic menu enters the browser's top layer as a manual popover from its accepted show until its hide, stacking among top-layer elements in the order they open; if `false`, it stays in the ordinary layer under Bootstrap's `z-index` scale. A static menu, in a `.navbar` or under `position.display: 'static'`, and a menu that already carries a `popover` attribute stay in the ordinary layer under either value. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly topmost?: boolean

// TooltipOptions and PopoverOptions gain:
/**
 * If `true`, the panel enters the browser's top layer as a manual popover from its insertion until its hide completes, stacking among top-layer elements in the order they open; if `false`, it stays in the ordinary layer. A panel whose template already carries a `popover` attribute stays in the ordinary layer. The panel's parent stays the `container` leaf's element. Markup never sets this leaf.
 *
 * Default: `false`.
 */
readonly topmost?: boolean

// DropdownPluginOptions { readonly topmost?: boolean } follows the ModalPluginOptions form.
// TipPluginOptions (src/browser/types.ts:2162) gains `topmost` beside `boot`, in the same form.
// resolveTipDelegate (src/browser/helpers.ts:642) passes `topmost: true` to the child when the parent's leaf is `true`, as a non-default leaf.
```

#### Mechanics

The following mechanics apply under the leaf.

- **Authored attribute.** A panel that already carries a `popover` attribute at show is author-owned. The engine does not promote it, writes nothing to the attribute, and the show proceeds in the ordinary layer. Promoted panels therefore never carry an authored attribute that `Hold` would restore, so a closed engine panel cannot be opened natively (`chk:56`, `:187`). Without the leaf, stage A is unchanged.
- **Dropdown show.**
  - After the `show` class and ARIA writes (`src/browser/Dropdown.ts:139-141`), a `Hold` acquires `popover`, and the engine writes `manual`.
  - Then `showPopover({ source: toggle })` runs under the marker, and `Placement` is constructed (`:142`).
- **Tip show.**
  - The same steps run after the append and the `inserted` dispatch (`src/browser/Tip.ts:203-204`) and before `Placement` (`:210`).
  - A delegated child receives the leaf through the `resolveTipDelegate` patch (`src/browser/helpers.ts:642`; `chk:52`), which matches the delegate rule at `G:586`.
- **Hide.** `hidePopover()` runs under the marker at hide completion: synchronously for the dropdown and after the fade for tips. Then the attribute is released.
  - The engine writes `popover` only for the open lifetime, so a closed engine panel matches no `[popover]` rule.
  - A page's `showPopover()` on a closed engine panel therefore throws `NotSupportedError` (`nr3:31`), and no native open needs reconciling.
- **Refused promotion.** The outcome depends on how the promotion fails:
  - **A page's `beforetoggle` listener cancels it:** `showPopover()` returns without opening, and the panel does not match `:popover-open`. The engine releases the attribute, and the show proceeds in the ordinary layer. Nothing is reported. The check measured all three families displayed in the ordinary layer after a cancelled promotion (`chk:184`).
  - **`showPopover()` throws:** the same fallback runs, and the error is reported through the realm's `reportError`.
  - No error code is added. Native's `TOPMOST_PANEL` and `POPOVER_STATE` (`cdx:228`) are refused.
- **External hide.** A page's own `hidePopover()` is reconciled at its synchronous closing `beforetoggle`, as the modal's forced close is (ruling 5). The before-event dispatches with `cancelable: false`. The panel leaves the top layer at once, and the user-agent rule for a closed popover hides it before any fade.
- **Vetoes.** Every `hide.bs.*` veto survives, because manual popovers have no close watcher (`nr7:168`).

#### Departure rows

The rows use the prefixes `dropdown-topmost`, `tooltip-topmost`, and `popover-topmost`, each with an `:order` sub-scenario. `Dropdown.test.ts` and `Tip.test.ts` consume them.

- The paths are:
  - `panel::popover`, `<absent>` against `manual`;
  - `panel::popover-open`, `false` against `true`;
  - `$::hit` order, including the order after a reopen.
- The static path, an authored `popover` attribute, and the leaf turned off are controls with no row.

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

The reset layer lets Bootstrap's `.popover` border and fill win (`src/bootstrap/components/_popover.scss:44-46`). The fence also restyles a panel whose `popover` attribute is authored. The guide states that coupling.

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
  - Reduced motion stays the sheet's job: the wait resolves at once when no transition runs (`G:602`).
- **DOM APIs.** `moveBefore`, `checkVisibility`, and `focus({ focusVisible })` are refused (`sbm:113-121`).

### Rulings

1. **Top-layer order and paint.**
   - Bootstrap's `z-index` scale governs every surface that is not opted in.
   - Under `native`, ordinary-layer toasts (1090) and body-level tips (1080) outside the open host are inert (`sbm:105`). Rows record this as `modal-native:order`.
   - Inertness and paint are separate facts (`chk:80`). An ordinary body tooltip paints beneath native `.modal-content`. A promoted body tooltip paints above it and is still excluded from hit testing (`chk:42`, `:190`). The paint row is `modal-native:paint`.
   - The guide states the limit and its remedy: set the tip's `container` inside the modal. That remedy works under stage A and under the native path, as `G:594` already asks for interactive tips.
   - B5 confirms whether the guide also offers `topmost` as a paint-only remedy for non-interactive tips.
2. **Native request model.**
   - Escape belongs to the keydown routes, which keep every veto on desktop (`sbm:26`, `:39`).
   - Native requests that bypass keydown go through the gates on native-leaf hosts:
     - the `cancel` event from `requestClose()`;
     - the `close`, `request-close`, and `show-modal` commands;
     - a page's script `show()` or `showModal()`, cancelled at its opening `beforetoggle` (`nr3:108`) and replayed through `show()`.
   - A user's hide veto and the reconciliation of an irreversible external close stay distinct. A close the browser has already started, through a direct `close()`, a `method="dialog"` submit, or an external `hidePopover()`, is reconciled at its synchronous closing `beforetoggle`. The before-event is dispatched with `cancelable: false`, and an accepted hide in progress gets no second before-event.
   - A `beforematch` reveal is a separate forced show. The browser reveals the content whatever a listener does, so if G2 or G4 passes, the engine dispatches the show event with `cancelable: false` and runs its show path. Those gates own that design.
   - `CloseWatcher` is deferred. Its only gain is Android Back, which no reading covers (`sbm:39`, `:187`). Its `cancel` is not cancelable without activation (`sbm:180-183`).
3. **Focus model.**
   - `Trap` stays the sole wrapper, because `inert` excludes outside controls without wrapping (`feas:23`).
   - Under `native`, the browser's dialog focusing runs before the trap (`sbm:57`; `nr9:51-52`), and `focus: false` still refuses outside focus. Both are rows.
   - In a document inside a frame, with the real `Trap`, Tab from the last control left the document on a native host and wrapped to the first control on an ordinary host (`chk:82`, `:185`). Behavior in a top-level document is unmeasured. The guide states the limit for framed documents only.
4. **Scroll lock.** `Lock` stays the one owner, and the gutter changes only its compensation.
   - `:has()` locks are refused. Under this verdict, `html:has(dialog:modal)` would unlock at `close()` (`src/browser/Modal.ts:217`). That is after the host transition but before the backdrop transition (`:221-222`) and the `Lock` release (`:227`), so the page could scroll during the backdrop fade (`chk:69`).
   - Containment is refused. Dialog `overscroll-behavior: contain` alone lets wheel input over the backdrop scroll the page (`sbm:72`).
5. **Transition model.** As agreed. The transition wait already ignores `transitionend` (`src/browser/helpers.ts:917-939`; `chk:86`).
6. **Invoker commands beside `data-bs-*`.**
   - The `data-bs-*` routes are unchanged and run first.
   - The built-in dialog commands are routed only on native-leaf hosts (W1 Modal).
   - Popover commands are refused on `topmost` panels. The engine writes the attribute only while the panel is open, and an external hide is reconciled.
   - Custom `--` routes are deferred until a first real consumer exists (AGENTS.md, Minimal public API). Their gate reading is G5.
   - Elsewhere, the guide tells you to keep `commandfor` off Bootstrap triggers. On a dropdown, Bootstrap's click prevention suppresses the command. On a modal without the leaf, a vetoed command leaves Bootstrap's show state intact (`sbm:176`).
7. **The other DOM APIs.**
   - ARIA reflection and `scrollIntoView({ container })` are refused (W1).
   - **Stage A risk.** Chromium 153's initial `position-visibility` is `anchors-visible` (`sbm:52`; `nr9:40`), and nothing in `src/browser` writes it. Every engine floater has a default anchor (`src/browser/Placement.ts:211`). The `popper-visibility-attributes` case compares attributes only (`tests/src/browser/Placement.test.ts:908-961`).
     - The check found a difference (`chk:88-92`). After its anchor scrolled out of the scroller, the engine's body tooltip stopped being hit-testable while Bootstrap's stayed hit-testable. Setting `position-visibility: always` did not restore the engine's hit. For a dropdown kept inside the scroller, both engines' menus were clipped, and `always` made the engine's menu hit-testable while Bootstrap's stayed clipped.
     - A blanket `always` write is therefore refused: it does not repair the tooltip, and it moves the dropdown away from Bootstrap. P0 becomes a scoped repair investigation (W5). Any repair it finds lands as a stage A repair, outside stage B.

### Claims flagged

The following W2 claims are contradicted by measurements or unmeasured.

- **Parity's W2 rule 2** ("The engine never … calls `requestClose`") leaves native requests unrouted. `nr7:60` and `sbm:174` contradict it, as W1 ruling 4 explains.
- **Native's capture-route mechanism** is measured at the platform level (`chk:40`, `:181`). B2 re-reads it through the implemented plugin.
- **This verdict's earlier W2 text** claimed that "Tab from the last control leaves the document" without a document context and prescribed `position-visibility: always`. Both are corrected in rulings 3 and 7.

---

## W3: the Bootstrap umbrella inventory

### Where the planners agree

All three planners agree on the following points.

- An Opus edits-only unit writes the contract first.
- Plugin option records stay narrow.
- A parser case pins the markup refusal.
- One TypeScript fence and one stylesheet fence sit under a Browser entry task heading.
- Row families sit under opt-in prefixes and are read in both directions.
- The departure-table lead sentence and the stage status paragraph (`G:954`) are rewritten.

### Rulings

The inventory rulings are the following.

- **Heading.** Consumer's heading, `### Opt into native surfaces`, is taken over `### Use native hosts`, because the gutter and intrinsic collapse are not hosts.
- **Fence contents.** The TypeScript fence composes only the surfaces that landed. Native's fence composes the gated plugins, which would fail to typecheck if a gate drops them.
- **Fence proof.** `tests/guides.test.ts` runs in Node and executes no DOM fence. It pins guide text to a browser transcription, as its boot-fence case does against `tests/src/browser/factories.test.ts` (`tests/guides.test.ts:83-98`). The native-surfaces fence follows that pattern: a transcription case in `factories.test.ts` executes it, and a pin case in `tests/guides.test.ts` binds the text.
- **Event exception.** `G:598` and the `ComponentEvent` remark (`src/browser/types.ts:183`) gain the forced-transition exception.
- **`G:954` rewrite.** The paragraph drops "Stage B, the native surfaces, is designed next inside this chunk" and states what stage B landed.
- **Markup refusal.** The resolvers ignore markup leaves by construction, because they spread only the typed options over Bootstrap's keys (`src/browser/helpers.ts:340-409`, `:572-632`). The proof is a resolver case in `tests/src/browser/helpers.test.ts`, and no resolver needs an edit to admit the leaves (`chk:114`).
- **Shared helper changes.** `helpers.ts` takes two stage B edits. `emitEvent` gains `cancelable` with its first consumer in B3. `resolveTipDelegate` passes `topmost` with its first consumer in B5.

### Inventory

The following table lists every item that stage B creates under the Bootstrap umbrella. Gated rows land only after their gate passes.

| Item | Subject | Unit | Proof |
| --- | --- | --- | --- |
| `ModalOptions.native` with TSDoc; `ModalInterface` remarks and `@throws` | Modal | B0, then B3 | `Modal.test.ts` `modal-native` cases and both controls |
| `ModalPluginOptions` (`native`, `stable`); `createModalPlugin(options?)`; the `command` and `beforetoggle` capture routes under `native` | Modal | B0 (type), B2 | `plugins.test.ts`: option absent and present, frozen descriptor, nothing registered, caller mutation after creation inert, routes present only under `native` |
| `isBrowserDialog` in `validators.ts` | Modal | B2 | `tests/src/browser/validators.test.ts`: a dialog in the test document and in a child frame, with a `div` and a non-element as controls; the `index.test.ts` export list as a patch |
| `emitEvent` `cancelable` parameter; `ComponentEvent` remark exception | Shared | B0 (remark), B3 (helper patch) | `tests/src/browser/helpers.test.ts`: `cancelable: false` yields an event whose `preventDefault` leaves `defaultPrevented` false, with the default as control; `Modal.test.ts` `modal-native:close` |
| Markup refusal of every stage B leaf | All | B2 (`native`, `stable`); held patches applied with B4 and B5 (`intrinsic`, `topmost`) | `tests/src/browser/helpers.test.ts`: `data-bs-native`, `data-bs-stable`, `data-bs-intrinsic`, and `data-bs-topmost` set nothing through `resolveModalOptions`, `resolveOffcanvasOptions`, `resolveCollapseOptions`, `resolveDropdownOptions`, and `resolveTipOptions` |
| `MODAL_OPEN` in `VeneerErrorCode` | Modal | B0, then B3 | `Modal.test.ts`: the throw on an externally open host is a `VeneerError` with that code and dispatches no event; a repeated `show()` on the engine's own open modal returns silently. `tests/src/core/errors.test.ts` enumerates no codes and takes no edit |
| `LockOptions`; `Lock` constructor options; `LockInterface.compensation`; `LockContext.reserved` | Lock | B0 (`LockOptions`, `reserved`), held B0 patch applied with B3 (`compensation`, constructor), B3 | `Lock.test.ts` |
| `ModalOptions.stable`, `OffcanvasOptions.stable`, `OffcanvasPluginOptions`, `createOffcanvasPlugin(options?)` | Modal, Offcanvas | B0 (types), B2 (plugin), B3 (components) | `Modal.test.ts`, `Offcanvas.test.ts`, `plugins.test.ts` |
| `Modal.update` reads `compensation` | Modal | B3 | `Modal.test.ts` `lock-stable:modal` |
| Modal component change (`Hold` on `closedby`, the native marker, host listeners, forced close by phase, rollback, `#content`) | Modal | B3 | `Modal.test.ts` |
| Row families `modal-native` and `lock-stable` | Modal, Lock, Offcanvas | B3 rows; B7 applies | Family proofs, read in both directions |
| Gated: `CollapseOptions.intrinsic`, `CollapsePluginOptions`, `createCollapsePlugin(options?)`, the `collapse-intrinsic` rows | Collapse | B0 held slice, B4, held `plugins.ts` patch | `Collapse.test.ts`; `plugins.test.ts` patch |
| Gated: `topmost` on three options records, `DropdownPluginOptions`, `createDropdownPlugin(options?)`, `TipPluginOptions.topmost`, the `resolveTipDelegate` change, the `*-topmost` rows | Dropdown, Tip | B0 held slice, B5, held `plugins.ts` and `helpers.ts` patches | `Dropdown.test.ts`, `Tip.test.ts` (delegated child), `helpers.test.ts` and `plugins.test.ts` patches |
| Guide `### Opt into native surfaces`: lead, leaf table, TypeScript fence, stylesheet fence, and limits (toasts and tips under a native modal, paint included; Tab in a framed document; factory replacement; the leaf and the gutter declaration together; one `stable` leaf on both overlay plugins; the fences restyle non-leaf matches) | All | B0 (stylesheet fence), B7 (prose, TypeScript fence) | B7: transcription case `executes the native surfaces guide fence` in `tests/src/browser/factories.test.ts` and its pin in `tests/guides.test.ts`; B1's loader reads the stylesheet fence |
| `### Engine departures` lead sentence (`G:680`); forced-transition exception (`G:598`); tip limit (`G:594`); `Lock` paragraph (`G:602`); `G:954` rewrite; Surface rows for each added type, `isBrowserDialog`, `emitEvent`, and the `LockInterface` row | All | B7 | `npm run test:guides` parity |
| Unchanged: Alert, Button (including `toggle.vn.button`), Carousel, Scrollspy, Tab, Toast, `createBootstrapPlugins()`, the entity factories | n/a | n/a | Stage A rows unchanged |

### TypeScript fence

The TypeScript fence, as it lands with the ungated surfaces, reads as follows.

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
		createModalPlugin({ native: true, stable: true }),
		createOffcanvasPlugin({ stable: true }),
	],
})
veneer.destroy()
```

`resolvePlugins` replaces each duplicate name in its original position (`src/browser/helpers.ts:158-162`), so this composition is valid and explicit. If the user rules gutter detection, the `stable` leaves and the `createOffcanvasPlugin` entry leave the fence.

### Claims flagged

The following earlier W3 claims were false at the tip and are corrected in this section.

- "`tests/guides.test.ts` runs the TypeScript fence." It pins text to a browser transcription (`tests/guides.test.ts:83-98`).
- "`helpers.ts` itself needs no edit." That holds for the markup projection only. `emitEvent` and `resolveTipDelegate` change.
- "`MODAL_OPEN` is proved in `tests/src/core/errors.test.ts`." That file enumerates no codes, so a case there would test enumeration only.
- The factory-replacement remark claimed every call with options replaces the component, built "from those options alone". `Registry.settle` replaces only a component that no earlier non-empty call configured (`src/browser/Registry.ts:98-104`), and the replacement still resolves markup (`chk:109`).
- **Observed at the tip, outside stage B:** the `### Compose browser plugins` fence declares `veneer` and calls `engine.destroy()` (`G:672-673`). B7 edits a neighboring section, and the Orchestrator routes this defect to a stage A fix.

---

## W4: the Veneer styles inventory

The styles inventory is integrated here. The following stage B rulings change its hand-offs.

- **Fence layer.** The fences sit in `@layer reset`, not unlayered, which matches the declared order (`RM:26`). The styles lane's tension between the precedence of an unlayered stage B fence and chunk 3's home dissolves.
- **Fence coupling.** A fence selects classes and native attributes, not a component option. Loading it restyles a `dialog.modal` whose leaf is off and a panel whose `popover` attribute is authored (`chk:127`). Taking a fence into `./styles` therefore restyles those elements on every page that loads `./styles` (D-11).
- **Paint limit.** The hand-off carries the measured paint limit: an ordinary-layer tip outside a native modal paints beneath its content (`chk:42`). Hit-order evidence does not stand in for it (`chk:128`).
- **`[open]` rule.** `dialog.modal[open]` is dropped, pending B3.
- **Gated floats.** The float resets ship only after B5's gate passes.
- **Refused hand-offs.** `interestfor`, `@starting-style`, and top-layer toast and offcanvas are refused. Their hand-offs leave the list: `.toast[popover]`, `.offcanvas[popover]`, `interest-delay`, and the fade block.
- **Detection scope.** Under the recommended `stable` leaf, the engine detects no CSS declaration on its own. Under the detection alternative, it detects only a root `scrollbar-gutter`. Under neither does it detect `interpolate-size`. D-5 therefore dissolves or narrows.
- **Neutralization home.** Native-host neutralization of user-agent styles lives in `_reset.scss`, which the rule names as a face's reset declarations (`styles-rule:22`). That overrules parity's W4 item 1. `surfaces/` keeps Veneer's own looks for user-agent pieces that no Bootstrap selector reaches (`RM:109`).

### Where the lanes agree

All four lanes agree on the following points.

- Bootstrap's sheet takes no native rule (`G:1159`, `:1191-1192`).
- The gutter and intrinsic collapse create no stylesheet work. You declare the gutter, and the engine holds `interpolate-size` inline.
- Whether `./styles` declares a root `scrollbar-gutter` is a user decision (D-5).

### Proposed placement rule for `./styles` (waits on D-1)

This verdict restates the styles lane's placement rule as a proposal. The lane's report has no file, so the rule cannot be checked against its source (`chk:129`). The user rules it as D-1.

- **The finding behind it.** Every `./styles` layer after `bootstrap` beats Bootstrap's class rules on the same element at any specificity (`RM:26`, `:42`). A bare-tag rule there contradicts "Classes stay the explicit control" (`RM:17`).
- **Proposal.** User-agent neutralization, and every tag default that overlaps a property Bootstrap can set, go in `reset`. A rule in a layer after `bootstrap` that overlaps Bootstrap must be a named row in the additions record, and the proof fails on an unrecorded overlap.
- **Conflict with a rule.** The styles rule reads: "Put a rule that styles one element in `elements/`" (`styles-rule:81`). Tag defaults in `_reset.scss` go beyond the user-agent neutralization that a reset holds, so the proposal needs an explicit user override of that rule (`chk:130`).
- **Alternative that conforms.** Tag defaults go in `elements/`, as the rule and the folder law describe (`RM:105`) and as the earlier button surface did (`ident:123`). Each overlap becomes an additions value row (`ident:77`). Under that alternative, a tag default that overlaps a Bootstrap class property beats the class, unless the default leaves that property alone.

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

The following table lists the stage B fences that `./styles` can take over in chunk 3, with this verdict's corrections.

| Fence | Rule | Stage B status | Chunk 3 home | Reading to re-run |
| --- | --- | --- | --- | --- |
| `dialog.modal` reset | `margin: 0; border: 0; padding: 0; max-width: none; max-height: none; color: inherit; background: transparent` | Ships with B3 | `_reset.scss`, if D-11 admits it | Boxes equal to the `div` host (`feas:13`; `cdx:210`); a Bootstrap-path `dialog.modal` with and without the fence |
| `dialog.modal::backdrop` | `background: transparent` | Ships with B3 | `_reset.scss`, if D-11 admits it | P12 |
| `dialog.modal[open] { display: block }` | | Dropped unless B3's reading differs | None | B3 recipe equality |
| `.dropdown-menu[popover]`, `.tooltip[popover]`, `.popover[popover]` | Uniform user-agent reset; Bootstrap wins where it declares | Gated on B5 | `_reset.scss`, if D-11 admits it | B5 residue per class; `.popover` keeps its border |
| `.collapse[hidden='until-found' i]` | `display: block !important` | Deferred (G2) | The consumer only, while D-4 refuses `!important` in `./styles` | G2 |

### What Veneer comes up with: native-surface families

The following table lists the native-surface families that chunk 3 can design on its own. They serve bare elements and are not engine hand-offs.

| Family | Proposed home | Ruling and limit |
| --- | --- | --- |
| Bare `dialog` chrome and `:modal` | `_reset.scss` | Drop Elements' `scale(0.96)` (`ident:35`). The motion that replaces it is an open identity value (I-1) |
| Bare-dialog `::backdrop` scrim | `surfaces/` | Keep the 0 → 0.5 fade (`ident:37`) and drop `blur(2px)` (`ident:51`). `::backdrop` inherits from its dialog from Chromium 122 (`nr3:95`), so Elements' `:root` token workaround is not needed |
| Bare `[popover]` and hint look | `_reset.scss` | Drop `scale(0.98)` (`ident:44`, `:45`) |
| Bare-popover anchor defaults | `_reset.scss` | `position-anchor` resolves to `auto` with `position-area` from Chromium 151 (`nr1:20`) |
| `position-visibility` | None | Refused as stylesheet: the property defaults to `anchors-visible` in Chromium 153 (`sbm:52`). P0 investigates the engine side |
| `details`, `summary`, `::details-content` | Marker in `_reset.scss`; tween in `surfaces/` | The tween is gated on reduced motion, because Elements' ungated tween drops (`ident:50`). The sampled recipe has no `getAnimations()` entry (`sbm:137`) |
| CSS lock for bare dialogs | `_reset.scss`: `html:has(dialog:modal:not(.modal)) { overflow: hidden }` | Under the gutter detection alternative, it writes no root `scrollbar-gutter`, because a gutter would switch the engine's `lock-stable` path while a bare dialog is open. Under the recommended leaf, a gutter here switches nothing (D-5) |
| `:focus-visible` on native surfaces, forced-colors `Highlight` | `_reset.scss` | Values are an open identity value (I-4) |
| `::selection`, `::marker`, bare `::placeholder` | `_reset.scss` | Low priority; Bootstrap's `.form-control::placeholder` wins |
| `::view-transition-*` reduced-motion rule | `surfaces/` | Only for transitions the consumer starts; W1 refuses engine View Transitions (`sbm:166`) |
| Scroll-marker carousel; `scroll-target-group` navigation | `surfaces/` with a Veneer-owned class | Not engine-driven (`sbm:147`); scope awaits D-9 |
| `inert`, `interactivity` | None | No user-agent style to neutralize (`nr2:137`) |
| `::interest-button` | None | Generation unproved in Chromium 153 (`sbm:51`) |
| `interest-delay`, `@starting-style` fade block, `.toast[popover]`, `.offcanvas[popover]` | None | Removed by this verdict's refusals |

### Token system

The token rows follow the styles lane as proposals under the reader law: a token ships only with a rule that reads it (T52 at `rep-d:58`; S3 at `plan-d:95`).

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
| `html` keyword interpolation | Carry. The engine does not detect `interpolate-size`, so a root declaration couples to nothing. Scoping it to `details` or `html` is a styles taste call, not D-5 |
| Elements-only groups (floater gutter, icons, slide distance, tints, disabled opacity) | Each enters only with a Veneer rule that reads it |

### Theme pack and registry groups

The pack shape is a proposal that waits on D-3. The registry rules stand.

- **Pack shape.** `retune($name, $light, $dark)` packs declare complete defaults (`RM:55`, `:111`). One `@function` feeds both copies, because the themes barrel loses `@use '../tokens'` at the first `:root` token (`RM:68`).
- **Default pack (D-3).**
  - Proposal: the default pack equals the `./styles` `:root` defaults, so `data-vn-theme="default"` returns a subtree to the unthemed look.
  - Alternative: a distinct default look. That look carries identity values that the standing rule drops (`brief:42`) unless the user rules otherwise.
- **Test changes.** The empty-pack case at `tests/src/styles/themes/index.test.ts:36` becomes a completeness case. The `not.toContain(':root')` assertion at `:38` stays.
- **`TOKEN_NAMES.veneer`.** It holds the `--vn-*` names under the key law, where a terminal `base` key adds nothing, so no leaf ends in `-base` (`RM:50`). It is pinned in both directions against the built sheet, replacing `tests/src/styles/index.test.ts:38`.
- **`CLASS_NAMES.veneer`.** It holds every class that a `./styles` selector reacts to. That includes the Bootstrap names the reset selects (`modal`, `dropdown-menu`, `tooltip`, and `popover`), which is admissible because no layer is shared with `bootstrap` (`RM:40`).
- **Veneer-owned classes.** They avoid every `CLASS_NAMES.bootstrap` name, because Elements' `.small` collides with `src/bootstrap/_reset.scss:146`. They also avoid every name in the Tailwind record.

### Component looks

The component dispositions are proposals where a user decision governs them.

- **Tag defaults (D-1).** The proposal puts `button`, `article`, `input`, `select`, `table`, and `progress` defaults in `reset`, and the conforming alternative puts them in `elements/`. Either way, the 12% stripe (`ident:11`) and weight 600 (`ident:24`) drop.
- **Take-overs of Bootstrap classes such as `.badge` and `.carousel` (D-6).**
  - Proposal: refuse them. A rule after `bootstrap` beats the class contract at any specificity (`RM:26`, `:42`), and the styles surface does not copy the Bootstrap cascade (`RM:16`).
  - Alternative: admit each take-over as a recorded addition, which the Tailwind tenet permits (`RM:15`).
- **Deferred:** alert, list group, nav, and pagination looks.
- **Spinner:** under reduced motion, it takes `animation: none` (`ident:47`), and the slowed spinner drops (`ident:49`).
- **Toast:** the Elements toast look drops, together with the refused top-layer toast.

### Open decisions for chunk 3

The styles lane numbers these decisions. Its inventory has no file on disk, so the following table restates each decision this verdict names, with its evidence and the recommended option.

| Decision | Question | Recommended, with reason | Evidence |
| --- | --- | --- | --- |
| D-1 | The layer for tag defaults: `reset` (needs an override of `styles-rule:81`) or `elements/` | `reset` with the override, because it is the only placement where a tag default yields to Bootstrap's classes and keeps `RM:17` | `RM:17`, `:26`, `:105`; `styles-rule:81`; `ident:109`, `:123` |
| D-2 | Whether `./styles` routes root `--bs-*` radius and shadow names through the factors, which moves Bootstrap paint as `retuned` rows | No, because routing moves Bootstrap paint on every page that loads `./styles` | `RM:29`, `:42`; `ident:28`, `:74` |
| D-3 | What the default pack means | Equal to the `:root` defaults, because a distinct look carries identity values the standing rule drops | `RM:55`, `:111`; `brief:42` |
| D-4 | Whether `./styles` declares `!important`, and whether it does so unlayered | No `!important`, because the consumer's override paths assume none (`RM:42`) | `ident:134`, `:135`, `:266`; `src/bootstrap/_reset.scss:382` |
| D-5 | Whether `./styles` declares a root `scrollbar-gutter`. Under the recommended leaf this is a taste call; under detection it moves every page that loads `./styles` onto the `lock-stable` rows | No, because a root gutter changes layout for every page that loads the sheet | Ruling 1; `es1:35` |
| D-6 | Whether `./styles` takes over Bootstrap classes | No, because a later layer beats the class contract at any specificity | `RM:15`, `:16`, `:26` |
| D-7 | The shape of the additions record that the placement rule's overlap rows extend | One guide table read in both directions, because the departure table already has that reader and proof (`G:1185-1187`) | `ident:77`, `:249` |
| D-9 | The scope of CSS-only native components (scroll-marker carousel, target-group navigation, details) | Defer past chunk 3's first landing, because no engine contract carries them (`sbm:147`) | `sbm:147`; `nr2:104` |
| D-10 | The browser floor: the measured Chromium 153 or a lower floor | Chromium 153, because every reading in this verdict is from that build | `RM:145`, `:164`; `ident:150` |
| D-11 | Whether `./styles` ships the native-host fences (dialog reset and, after B5, the float reset) by default | Ship the dialog reset in `reset` after B3 reads a Bootstrap-path `dialog.modal` with and without it, because that path renders user-agent borders and padding (`cdx:210`) | `chk:127`; `nr3:128-133` |

This verdict leaves the following identity values open.

| Value | Question | Recommended, with reason | Evidence |
| --- | --- | --- | --- |
| I-1 | Bare-dialog motion in place of Elements' scale and blur | Bootstrap's opacity fade only, because the standing rule drops Elements identity values | `ident:35`, `:37`, `:51` |
| I-2 | Which surfaces read the Veneer eases | Veneer-owned surfaces only, because an eased `.fade` replaces Bootstrap's `linear` | `ident:43`, `:165` |
| I-3 | State hover and active amounts | Bootstrap-derived amounts, for the same standing rule | `ident:19`, `:20` |
| I-4 | Focus ring values on native surfaces: Bootstrap's `0.25rem` at `0.25` or Elements' `0.1875rem` at `0.45` | Bootstrap's values, because native surfaces then match `.btn:focus-visible` | `src/bootstrap/_tokens.scss:131-132`; `es1:17` |

### Claims flagged

The following styles-lane claims, and one claim from this verdict's earlier text, are corrected or flagged.

- **The fence tension** assumed an unlayered stage B fence. This verdict puts the fence in `reset`.
- **The styles lane's until-found row** says "only a layered `!important` beats `bs/_reset.scss:382`". An unlayered `!important` of higher specificity also beats it, as native's fence selector shows. D-4 still governs `./styles`.
- **The styles lane's refusal of `position-visibility`** holds for stylesheets. The engine side is P0's stage A question.
- **This verdict's earlier claim** that `RM:146` still opens chunk 3 after stage A was false. `RM:146` reads "The styles chunk opens after the browser engine's stage B" (`chk:126`), so no roadmap correction is needed.

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

- **One overlay unit.** The gutter and the dialog share one unit (B3), because `Modal.ts` consumes `Lock.compensation` and `Offcanvas.ts` passes the `stable` leaf to its lock. Splitting them, as parity's U3 and U4 do, would share `Modal.ts` ownership.
- **Green contract checkpoint.** B0 lands only declarations that typecheck at the tip. The `LockInterface.compensation` member and the `Lock` constructor signature, which `Lock.ts` cannot satisfy until B3, are a B0 held patch applied with B3. B0's typecheck therefore passes, and no expected failure stands in for a contract gate (`chk:147`).
- **Gated slices.** B0 writes the gated contract slices as held patches. The Orchestrator applies each patch only when its family unit's gate passes, so `main` never holds a leaf that does nothing (consumer, B0).
- **Serial applier.** After B0 lands, `types.ts` and `src/core/types.ts` are report-only. After B2 lands, `plugins.ts`, `plugins.test.ts`, and `tests/src/browser/helpers.test.ts` are report-only. `helpers.ts`, `constants.ts`, and `index.ts` are report-only for every unit. Each later unit returns exact patches for these files, and the Orchestrator applies them serially, one unit at a time (`chk:141`).
- **Classic scrollbar instrument.** The CDP toggle `Emulation.setScrollbarsHidden` failed its 15 px control: width stayed 0 with the setting on and off (`chk:48`, `:186`). The root configuration's Playwright launch hides scrollbars (`cdx:206`). D3 measured a 15 px classic scrollbar with a temporary configuration that removed only Playwright's `--hide-scrollbars` launch default (`cdx:206`, `:211`). The instrument waits on the user's ruling (item 2). Until a working instrument passes its 15 px control, B3's gutter half does not land.
- **Journey check.** Every landing also runs `npm run test:journey` (consumer).

### Units

The following table lists the units with their ownership, order, and readings.

| Unit | Lane | Owns | Order | Readings to re-run |
| --- | --- | --- | --- | --- |
| P0 `anchor-visibility` | Astra, read-only probe, deleted after | Probe file only | Any time; outside stage B | Body tooltip and dropdown, engine against Bootstrap. Anchors: visible (control), clipped by a scroller, and clipped by a transformed ancestor. Bootstrap's ordinary clipped case is a control. Wait two rendering frames before each hit test. Record computed `position-visibility`, `.show`, hit, and pixel. Output: the measured seam and an acceptance control for a stage A repair, or "no repair". No prescribed `always` write |
| B0 `stage-b-contract` | Opus, edits only | `src/browser/types.ts` (`native`, `stable`, `LockOptions`, `LockContext.reserved`, `ModalPluginOptions`, `OffcanvasPluginOptions`, the `ModalInterface` remarks, the `ComponentEvent` remark), `src/core/types.ts` (`MODAL_OPEN`), the guide's stylesheet fence and Surface rows; held patches for `LockInterface.compensation` with the `Lock` constructor, and for the `topmost` and `intrinsic` slices | After `veneer-boot` | The Orchestrator runs the browser-scope `tsc`, which passes |
| B1 `stage-b-harness` | Astra | Engine section of `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, family entries in `tests/setup.ts`, `tests/setup.test.ts`; the classic-scrollbar instrument's file as the user rules it | After B0 | Readers for `open`, `:modal`, `closedby`, `:popover-open`, `popover`, and inline `interpolate-size`; an `elementsFromPoint` hit-order reader with a known `z-index` control; a pixel reader that samples a page capture at named points, with a known two-color paint pair as its control; transient focus capture; the fence loader in both realms (control: a raw `dialog.modal` without the fence); the classic-scrollbar instrument with its 15 px control. Runs `npm run test:setup:browser` and `npm run test:setup` |
| B2 `stage-b-wiring` | Astra | `plugins.ts` (`createModalPlugin(options?)`, `createOffcanvasPlugin(options?)`, leaves copied at creation), `plugins.test.ts`, `validators.ts` (`isBrowserDialog`), `tests/src/browser/validators.test.ts`, `tests/src/browser/helpers.test.ts` (markup-refusal cases; the gated cases as held patches) | After B0, parallel with B1 | Through the implemented plugin: a document capture route builds the modal and its target listener fires. Command: an intercepted `show-modal` leaves `open: false`, with the same button and no `native` plugin as control, which opens the dialog. Script open: a cancelled native `show()` replays through a nested `showModal()` to `open: true` and `:modal: true`, with an unintercepted `show()` as control (`chk:181`) |
| B3 `native-overlay` | Astra, worktree | `Modal.ts`, `Lock.ts`, `Offcanvas.ts`, `Modal.test.ts`, `Lock.test.ts`, `Offcanvas.test.ts`; patches: `helpers.ts` (`emitEvent` `cancelable`), `helpers.test.ts` (its case) | After B1 and B2 | **Gutter, on the classic-scrollbar instrument:** body, `.fixed-top`, `.fixed-bottom`, `.sticky-top`, the zero-compensation footprint with an existing inline padding, an overflowing modal's `update`, offcanvas, RTL, `both-edges`, no overflow, both joining orders and a mismatched leaf; controls: a body-declared gutter, an overlay scrollbar, the leaf without a declared gutter, a declared gutter without the leaf. **Native modal:** P12 (`div` backdrop beneath a transparent `::backdrop`, user-agent backdrop as control); P6 (repeated Escape under `closedby="none"` with no `cancel` or `close`, no `closedby` as control); focus order (`showModal()`, trap, `close()`, data-API return); Tab in the harness document; `MODAL_OPEN` on an externally open host and a silent repeated `show()` on the engine's own modal; a cancelled native open with full rollback while an offcanvas holds the lock; a thrown native open; destroy and forced close inside `showModal()`'s synchronous callbacks (a `beforetoggle` listener and an autofocus `focus` listener); forced close in each phase (`showing`, `shown`, `hiding`) with no duplicated before-event or `hidden`; close then reopen, and close, reopen, close, before the queued `close` event; hit order against a toast and a body tooltip; paint of an ordinary body tooltip over `.modal-content`, with a `div.modal` control; the `command`, `requestClose()`, direct `close()`, and form-submit routes; script `showModal()` and `show()` on a built and an unbuilt host, each against the same call on a host without the leaf; a host without `.fade`; a script open while the modal hides; destroy while opening and while closing; the `[open]` rule's necessity; a Bootstrap-path `dialog.modal` with and without the fence (D-11); both controls |
| B4 `native-intrinsic` | Astra, worktree | `Collapse.ts`, `Collapse.test.ts`; held patches: `plugins.ts`, `plugins.test.ts`, `helpers.test.ts` | Parallel with B3 | Gate first, on the implemented branch: changing content, intrinsic path against the pixel path; unchanged content, equality control; a failure returns "drop". Then: the 0 → `auto` start through `reflow`, the refusal of calls while `.collapsing`, the dedicated `Hold` released at show completion and on destroy, reduced motion, padded and bordered panels, accordion propagation, destroy mid-transition; horizontal and leaf-off regression controls |
| B5 `native-layer` | Astra, worktree | `Dropdown.ts`, `Tip.ts`, `Placement.ts` (only on a measured need), and their tests; patches: `helpers.ts` (`resolveTipDelegate`), `helpers.test.ts` (its case); held patches: `plugins.ts`, `plugins.test.ts` | After B3 lands and after any P0 repair lands | Gate first: a transformed clipping ancestor, unpromoted panel clipped against promoted panel hit, with plain overflow and leaf-off and static-path controls; user-agent residue per class under the reset-layer fence; a failure returns "drop". Then: geometry within 1 px of Popper's population, RTL, a float inside a native modal, paint and hit of a promoted body tip over a native modal, hit order including a reopen, delegated children, an authored `popover` attribute left unpromoted, a cancelled promotion with no report and a thrown one with a report, an external `hidePopover()`, no native open state after destroy |
| B6 `native-integration` | Astra | `tests/src/browser/integration.test.ts` | After B3 to B5 | Every landed surface on one page, plus a Bootstrap-only control page with no leaf and no fence |
| B7 `native-guide` | Opus | `G` § Browser entry `### Opt into native surfaces`, `:594`, `:598`, `:602`, `:680`, `:954`, the row patches; the transcription case in `tests/src/browser/factories.test.ts` and its pin in `tests/guides.test.ts`; `RM:145` | Last | `npm run test:guides`; the touched browser file |
| G1 `gate-offcanvas-dialog` | Astra, read-only probe | Probe only | Not scheduled | `<dialog class="offcanvas">` with `showModal()` for `scroll: false` and `show()` for `scroll: true`, across the `.offcanvas-{bp}` breakpoint crossing. Controls: a Bootstrap `div.offcanvas` driven through the same options and crossings, and the dialog host without the backend |
| G2 `gate-collapse-found` | Astra, read-only probe | Probe only | Not scheduled | A fragment reveal into a closed `.collapse` under the fence and handler. Controls: ordinary `hidden` content, until-found without the fence and handler, and an already-visible target. The gate fails if the panel does not reach `.show` through the forced show, a sibling stays open, the scroll position misses the target, or a panel hidden again is not findable |
| G3 `gate-android-back` | Astra, read-only probe | Probe only | Not scheduled | Android Back against `closedby="none"`, a manual popover, and a `CloseWatcher`. Controls: a native surface known to close on Back as the positive control, a page with no watcher, and Escape as a desktop comparison |
| G4 `gate-tab-found` | Astra, read-only probe | Probe only | Not scheduled | A fragment reveal into an inactive `.tab-content > .tab-pane.fade` under the fence: the forced `hide.bs.tab` and `show.bs.tab` as `cancelable: false`, the outgoing pane's fade, `aria-selected` on both triggers, and findability after the next tab switch. Controls: an inactive ordinary-hidden pane, an unreconciled until-found pane, and an active pane for reachability |
| G5 `gate-custom-command` | Astra, read-only probe | Probe only | Not scheduled | One click on a button that carries `commandfor` with `command="--toggle"` and `data-bs-toggle="collapse"`: the toggle count, the event order, and a real `command` event reaching its target. Control: the same button without the command pair. The deferral also needs a first real consumer |
| Close-out | Opus reviewer on the mechanism; Astra analyst on the contract | | After B7 | One falsify round, then `verifier` runs the tree-wide gates |

The following files are report-only, and each unit returns an exact patch for them:

- `types.ts` and `src/core/types.ts`, after B0;
- `plugins.ts`, `plugins.test.ts`, and `tests/src/browser/helpers.test.ts`, after B2;
- `constants.ts`, `helpers.ts`, and `index.ts`, for every unit;
- `tests/src/browser/index.test.ts`;
- the guide, outside B0 and B7;
- `tests/setup.ts` and the engine section of `tests/setupBrowser.ts`, outside B1.

### Lanes-log predictions

Log the following entries before each landing.

- **B0 to B6:** predicted statechart rows: none.
  - The showcase composes `createBootstrapPlugins()` with tip boot, writes `div.modal`, sets no leaf, and loads no fence, so neither added modal route exists there.
  - The trigger search of `src/` and `app/` returns no stage B trigger. The only `until-found` text is Tailwind's preflight exemption at `app/browser/recipe.json:2049-2050`.
  - The gutter prediction holds because the showcase passes no `stable` leaf. Under the detection alternative, it holds while no sheet the showcase loads declares a root gutter. `src/bootstrap` and the recipe declare none.
- **B1:** log the harness export names it adds.
- **B3:** name the `modal` and `offcanvas` rows and the responsive offcanvas tables as regression-sensitive (`cdx:301`, `:303`).
- **B4:** name the `collapse`, `accordion`, `navbar-390`, and `navbar-1280` rows (`cdx:302`).
- **B5:** name the `tooltip`, `popover`, and `dropdown` tables, including the `Dialog hint through …` rows (`cdx:298-300`).
- **P0, if it opens a repair:** that repair names the same floating tables. Its prediction comes from reading those rows after the repair, not from the empty stage B prediction (`chk:165`).
- **Additive contract changes:** the option parameters on the plugin factories and the `emitEvent` parameter are additive, so no showcase call site migrates.
- **The stylesheet fences** never enter the showcase, which loads Bootstrap's sheet alone (`RM:144`).

### Claims flagged

The following earlier W5 claims were incomplete at the tip and are corrected in this section (`chk:136-147`).

- The `helpers.ts` patches for `emitEvent` and `resolveTipDelegate`, and their proofs, had no owner. B3 and B5 return them.
- The gated plugin patches collided with B2's ownership of `plugins.ts`. They are held patches with the Orchestrator as serial applier.
- The `MODAL_OPEN` proof was assigned to nobody. It lives in `Modal.test.ts`.
- The fence's browser transcription and guide pin had no owner. B7 owns both.
- B1's setup proofs need `npm run test:setup:browser` and `npm run test:setup`, which `test:src:browser` does not collect.
- A P0 repair must land and rebase before B5 writes `Placement`.
- B0 accepted an expected type failure as its gate. The held `compensation` patch removes that failure.
- Parity's split of U3 before U4 is overruled because it would share `Modal.ts` ownership. It is not a false claim.

---

## What the user must rule

The following decisions remain the user's after the corrections. Each lists the recommended option and its reason.

1. **The gutter shape.** Rule (b) a typed `stable` leaf that writes no gutter and acts only where the root declares a stable `scrollbar-gutter`, or (a) detection alone. **Recommended: (b),** because under (a) a declaration from any shared reset changes the lock's writes on pages that never opted in, and no option restores Bootstrap's compensation. D-5 follows from this ruling.
2. **The classic-scrollbar instrument.** The CDP toggle failed its 15 px control. The options are:
   - (a) a dedicated Vitest configuration under `configs/` that reuses the browser project and removes only Playwright's `--hide-scrollbars` launch default, for the lock and gutter proofs;
   - (b) changing the scaffold-propagated root configuration;
   - (c) no instrument, so the `stable` leaf does not land.

   **Recommended: (a),** because D3 measured a 15 px scrollbar with exactly that change (`cdx:206`, `:211`), and it touches no scaffold-propagated file (`RM:64`, `:151`). It does add a test configuration the standing shape does not list, so it needs your ruling.
3. **The `native` modal limits.** Accept these documented limits of the opt-in:
   - toasts and body-level tips outside an open native modal are inert;
   - an ordinary-layer tip outside the host paints beneath the modal's content, so a tooltip with Bootstrap's default body container is hidden there until you set `container` inside the modal;
   - in a document inside a frame, Tab from the last control leaves the document;
   - with `focus: false`, outside focus is still refused.

   **Recommended: accept,** because each limit is measured (`chk:42`, `:82`; `sbm:105`), the leaf is opt-in, and the container remedy is the one `G:594` already gives. The refused alternatives reparent the tip or throw on every hover.
4. **Non-cancelable forced-close events.** Accept that a close the browser has already performed on an opted-in surface dispatches its `hide.bs.*` event with `cancelable: false`. This is an exception to "Every `.bs.` event is cancelable" (`G:598`; `src/browser/types.ts:183`). **Recommended: accept,** because the change has already happened, a cancelable event would report a veto that does nothing, and skipping the event would leave a closed modal's tips shown (`src/browser/Tip.ts:96-98`).
5. **Scope refusals and deferrals.** You defined stage B as the native surfaces the engine does not use yet, so the exclusions are yours to confirm.
   - **Scope refusals:** manual-popover offcanvas, toast promotion, `@starting-style`, carousel until-found, and `ariaNotify`. **Recommended: refuse,** because none has a consumer or a measured gain. Each one's evidence shows a cost: an extra host path, inert outside toasts, the same sampled fade, autoplay rotating the found item away, or an unproved announcement channel.
   - **Deferrals with gates:** offcanvas `<dialog>` (G1), until-found on collapse (G2) and tab (G4), `CloseWatcher` with Android Back (G3), and custom `--` commands (G5). **Recommended: defer,** because each needs an integration reading that no probe has made, and G5 also lacks a first consumer.
6. **P0 repair timing.** If P0's investigation finds a repair, rule whether it lands as a stage A repair inside the stage B window. **Recommended: yes, serially before B5,** because B5 writes `Placement`, and stage A already differs from Bootstrap for the clipped body tooltip (`chk:90`).
7. **Chunk 3 decisions:** D-1 to D-7, D-9, D-10, and D-11, and the identity values I-1 to I-4, each with the recommendation W4's tables give. D-1 also needs your explicit override of `styles-rule:81` if you take the recommended `reset` placement.

## Check findings declined

No finding of the check is declined on substance. Every closing correction and every section finding is applied. The check is right on each point against its cited evidence: `sbm`, `cdx`, its own retained readings, and the code at `419245d`. Two notes record where this verdict applies a correction through a mechanism other than the one the check sketched, or adjusts one of its citations.

- **Correction 1 (suppression and queued close).** The check asked for operation-specific suppression and handling of stale completion events. This verdict meets both by reconciling at the synchronous closing `beforetoggle` and routing no queued `close` or `toggle` event at all. The marker records the toggle state of the call in progress. The close, reopen, and close-reopen-close cases the check requires are B3 readings.
- **Citation in `chk:120`.** The check cites `ROADMAP.md:24` for the order that puts `reset` before `bootstrap`. Line 24 introduces the statement, and the statement itself sits at `ROADMAP.md:26`. The finding stands, and this verdict cites `:26`.

Relevant files:
- `C:\Users\mikes\WebstormProjects\veneer\tmp\units\stage-b-wide-agent-6.md` (the verdict revised)
- `C:\Users\mikes\WebstormProjects\veneer\tmp\codex\stage-b-verdict-check.md`
- `C:\Users\mikes\WebstormProjects\veneer\tmp\codex\stage-b-measurements.md`
- `C:\Users\mikes\WebstormProjects\veneer\tmp\codex\browser-stage-b-design-verdict.md`
- `C:\Users\mikes\WebstormProjects\veneer\src\browser\Modal.ts`, `Lock.ts`, `Veneer.ts`, `helpers.ts`, `plugins.ts`, `types.ts`, `Registry.ts`, `Tip.ts`, `Dropdown.ts`, `Collapse.ts`
- `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\names.md`, `styles.md`