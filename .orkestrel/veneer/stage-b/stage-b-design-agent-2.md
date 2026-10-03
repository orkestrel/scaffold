# Browser stage B design: judgment of the slate and dropin proposals

Both proposals cover only the four native pieces. The user's answer of 2026-10-03 (`scaffold/.orkestrel/veneer/browser-design-verdict.md:69`) defines stage B as wider: it adds native browser surfaces and APIs "wherever it does not use them yet, which is wider than the four pieces ruling 1 names." Neither lane designed that wider scope, so this pass is incomplete. The final list carries it.

Every citation was checked at veneer `dc4654b`. Two problems in the tree must be cleared before any unit starts:
- The tree is not clean. `tests/src/browser/design.probe.test.ts` is untracked. The brief requires a probe to be deleted before its lane returns.
- The worktree `veneer-wt-visit` (`visit-0.0.88` at `7d26033`) still exists. The lanes log holds every landing on `main` until a visit-landed entry (`lanes.md:63`).

## D1: the blank-slate boot scope

### Where the proposals agree

- `createVeneer` routes exactly `options.plugins`, and `plugins` stays optional with a default of `[]`. That matches the constructor default at `src/browser/Engine.ts:36`. The factory default at `src/browser/factories.ts:174` is the one that changes.
- `createBootstrapPlugins()` stays as it is: twelve plugins in bundle order, with no tip boot.
- Tip boot becomes an option, `TipPluginOptions { boot?: boolean }`, on `createTooltipPlugin` and `createPopoverPlugin`.
  - `architecture.md:214` admits `create{Entity}Plugin(options?)`.
  - The `boot` entry at `plugins.ts:284` and `plugins.ts:364` is added only when `boot` is `true`.
- You opt in by appending the boot plugins. `resolvePlugins` replaces a same-named entry in its original position (`helpers.ts:158-162`: a `Map` re-set keeps the key's position).
- Both refuse these alternatives:
  - making `plugins` required;
  - a default of the twelve plugins without tip boot;
  - a preset wrapper;
  - separate boot factories;
  - a function over a live scope;
  - a scope-level tip switch (convention verdict `:107`).
- Both keep these behaviors:
  - the carousel, scrollspy, `.offcanvas.show`, and active-tab boot entries;
  - shared-host tips;
  - several plugins per element;
  - the teardown restorations;
  - the factory defaults.
- Both remove the guide's `.filter(...)` delegation recipe (`guides/veneer.md:588`).
- Neither lane cited a ruling that supports this shape. Convention ruling 14 (2026-10-02) already says that stage B is "built as same-named plugin replacements in a caller's list" (`browser-convention-verdict.md:129`).

### Disagreements and rulings

**1. `toggle.vn.button`: slate drops it, dropin keeps it. Ruling: drop it.**
- Why the event goes:
  - It is a behavior Bootstrap's contract doesn't define. It fires on every toggle, including method calls (`Button.ts:50`).
  - It is a bubbling cancelable event whose cancellation does nothing (`types.ts:246`, `helpers.ts:788`). The user ruled that nothing is forced.
  - Its stated reason was the Vue face. `src/vue` holds only an empty composables barrel.
- Why removal passes the "remove a symbol only when the capability itself must not exist" law: the forced notification is what must not exist. Notifying on a toggle survives as a composable piece. The guide's replacement button plugin (`guides/veneer.md:628-661`) already demonstrates it with a page-owned event.
- Dropin's reason fails. "A ButtonOptions leaf every Vue consumer must set" argues against an opt-in leaf, not for a forced emit.
- Slate's file list misses three consumers:
  - `tests/src/browser/integration.test.ts:273`;
  - `tests/setupBrowser.test.ts:44`, together with the `buildConflict('button', …, hook)` helper it drives, which binds through `ButtonOptions.on`;
  - `tests/src/browser/index.test.ts:14`, which lists `BUTTON_EVENTS`.
- The guide prose at `:596` and `:608` must also change.

**2. Where the tip-boot rows go: dropin proposes a `### Engine additions` table, slate removes the rows. Ruling: remove them, and refuse the second table.**
- With `boot: true`, the engine's behavior should equal Bootstrap plus its documented page script. Both realms migrate the title to `data-bs-original-title`. The rows then have nothing to record.
- The second table would cost a second `readDepartures` section in every family proof and in `tests/setup.ts:473-531`. The sheet splits additions from departures only because sheet additions have no Bootstrap value. Every stage B row here does have one.
- Rows caused by an opt-in piece stay in `### Engine departures`, under that piece's scenario prefix. The table's lead sentence changes from "on identical markup" to "on identical markup and configuration, or under the opt-in piece its Scenario prefix names."

**3. The showcase composition: dropin proposes `app/browser/plugins.ts` with `createShowcasePlugins()`, slate composes inline. Ruling: inline.**
- The journey's internal boot call at `tests/setupBrowser.ts:1305` takes no argument. The boundary rule (`lanes.md:38`) bars it from importing an app value, so a single app source would have to be threaded through the reuse helper.
- `tests/app/browser/main.test.ts:66-104` already proves that `main.ts`'s own list hovers the tooltip and clicks the popover open.
- The showcase section composes from `@src/browser`, which is legal.

**4. Renaming `startJourneyEngine`: slate renames it, dropin defers to the showcase lane. Ruling: rename it to `startJourneyVeneer` and `journeyVeneer`, and log the change.**
- The function returns the renamed entity, so one concept keeps one term.
- `lanes.md:41` puts contract migrations on the engine lane.
- Slate's list misses these call sites:
  - `tests/setupBrowser.ts:542-543` and `:1305`;
  - `tests/setupBrowser.test.ts:95` and `:173`;
  - `tests/app/browser/integration.test.ts:88`, `:371`, and `:540`.

### Claims that are false or unsupported at the tip

- **Slate's CDP instrument has a measured failure.** Slate proves a bare scope's inertness with CDP `DOMDebugger.getEventListeners` on `document`. That reader returned 0 even for a listener it had added itself, in two probes (`lanes.md:225`). It is admissible only with a self-control that reads a known listener. Otherwise the proof must be behavioral: one data-API click per family changes nothing.
- **Dropin cites drifted lines.** "lanes.md:221" is `:225`, and "lanes.md:123" is `:127`.

### What the objective lane must measure

- Equality between the opt-in boot and Bootstrap's init snippet, including boot timing. The engine boots at `load` (`Engine.ts:78-83`); the snippet runs when the oracle chooses.
- The bundle contents when a consumer imports `createVeneer` alone (slate's distribution case).

## D2: `createVeneer`

### Where the proposals agree

They agree completely on the entity names:

| Today | Renamed |
| --- | --- |
| `Engine`, `Engine.resolve` | `Veneer`, `Veneer.resolve` |
| `EngineInterface` | `VeneerInterface` |
| `EngineOptions` | `VeneerOptions` |
| `EngineInteraction` | `VeneerInteraction` |
| `ENGINE_ROOT`, `ENGINE_DESTROYED`, `ENGINE_DESTROY` | `VENEER_ROOT`, `VENEER_DESTROYED`, `VENEER_DESTROY` |
| `src/browser/Engine.ts` | `src/browser/Veneer.ts` |
| `tests/src/browser/Engine.test.ts` | `tests/src/browser/Veneer.test.ts` |
| family key `'Engine'` (`tests/setup.ts:419`) | `'Veneer'` |

- "Engine" stays as the runtime noun in these places, with the `readDepartures` section string unchanged:
  - `### Engine departures` and the `Engine` column;
  - `EngineDeparture`;
  - `createEngineTable`, `ENGINE_SECTION`, `ENGINE_ROWS`, and "Engine states".
- Both refuse `Scope*` names (the fleet owns them) and refuse keeping the `ENGINE_*` codes.
- Both name checks hold. A grep for `Veneer[A-Z]\w*|createVeneer` across `scaffold/guides/*.md` returns no match.

### Disagreements and rulings

- **Guide headings.** Take dropin's task headings, `### Boot a Bootstrap page` and `### Use native hosts`, with fences that `tests/guides.test.ts` executes. Refuse `### Engine additions` (see D1, ruling 2).
- **Consumer counts.** `createEngine` appears in 25 files under `src`, `tests`, and `app` (171 occurrences). Three of those files are `createEngineTable` false positives: `app/browser/factories.ts`, `tests/app/browser/factories.test.ts`, and `tests/app/browser/index.test.ts`. They stay.

### What the objective lane must measure

- The sweep named in dropin's U2 acceptance must return only `Engine departures`, `EngineDeparture`, and the showcase's engine-table identifiers.

## D3: stage B's native pieces

### Where the proposals agree

- **Dialog CSS lives in your stylesheet.** The guide publishes it as an executed fence, and the proof loads it in both realms. A later home is the styles face.
  - The Bootstrap sheet is refused, because "A value, selector, or context departure is inadmissible in the Bootstrap sheet" (`guides/veneer.md:1144`) and its Additions section admits none (`:1176-1177`).
  - The engine's constructed sheet is refused as presentation.
- **Dialog mechanics:**
  - `Backdrop`, `Trap`, and `Lock` stay. `Trap` stays because `focus-inert` shows that `inert` excludes outside controls but does not wrap focus.
  - Escape keeps the keydown path at `Modal.ts:55-63`.
  - `showModal()` is called where `display: block` is written, and `close()` where `display: none` is written.
- **Gutter opt-in is detected from your CSS.** It reads the computed `scrollbar-gutter` on `documentElement`. The engine writes no gutter.

### Disagreements and rulings

**1. How the dialog is opted in: dropin uses markup alone, slate uses a `<dialog>` host plus an option. Ruling: slate's option.**
- The user defined stage A as the drop-in replacement. A Bootstrap page that uses `<dialog class="modal">` today runs on Bootstrap's path: the inline `display: block` beats the UA `dialog:not([open])` rule.
- Detecting the markup alone would move such a page into the top layer without its asking. Toasts and body-level tips would go beneath the dialog, and Tab would leave the document.
- Convention ruling 14 names same-named plugin replacements as stage B's shape.
- Dropin's factory-bypass objection fails, because `ModalOptions.dialog` serves factory calls.
- Accepted limit: under `Registry.ts:99-104`, a factory call with options replaces a plugin-built modal. That call must repeat `dialog: true`, and the guide must say so.

**2. When `closedby` is written: dropin writes it at construction, slate at show. Ruling: at show.**
- Bootstrap's constructor writes nothing, so a construction-time write would add a construction row.
- The engine acquires `closedby` through the `Hold` in `#open`, and releases it at the end of `#close` and in `destroy`.

**3. The gutter mechanics: dropin skips the padding loop, slate zeroes the width. Ruling: slate's.**
- The single detection point is `Lock.width` (`Lock.ts:30-38`), and Bootstrap's algorithm runs with a compensation of zero.
- This gives a smaller set of departure rows: the written values differ, and the writes don't disappear.

**4. `interpolate-size` vertical collapse: slate declines it, dropin ships it last. Ruling: ship it, conditional and last, detected from CSS, vertical only.**
- The user's wider definition of stage B outweighs "equal motion, no consumer."
- The evidence can still drop it if the measured gain is absent.
- See the false claims for the change to dropin's stated gain.

**5. `popover="manual"` floating parts: slate declines them, dropin ships them by markup. Ruling: ship them, with slate's overrule shape as the opt-in.**
- The opt-in is a `position.popover?: boolean` leaf on `DropdownPositionOptions` and `TipPositionOptions`. Markup never sets it.
- The user's wider definition outweighs slate's taste.
- Slate's derive-state concern is met because `.show` stays the authority. `showPopover()` and `hidePopover()` are a projection written in the same step. Only `manual` is supported; `auto` is refused, because the `close-veto` reading shows its closing `beforetoggle` can't be cancelled.
- The UA `[popover]` reset goes in your stylesheet fence, as the dialog's does.
- Dropin's markup opt-in is refused for tips, because the sanitizer strips the attribute (see the false claims).
- The guide must state the limit. A body-level popover over a modal dialog stays inert (feasibility report, Limits, `:37`), so an in-dialog tip still needs a `container` inside the dialog (`guides/veneer.md:592`).

### Claims that are false or unsupported at the tip

- **Dropin's tip opt-in can't work through markup.** It proposes `popover` on the template root through `data-bs-template`.
  - `renderTip` sanitizes the template (`helpers.ts:220`), and the `'*'` allowlist holds only `class`, `dir`, `id`, `lang`, `role`, and `aria-*` (`constants.ts:196`).
  - Markup can't change the sanitizer, because `parseTipInput` strips sanitizer settings.
  - So the attribute is removed.
- **Dropin's claim that "nothing beyond what Placement writes inline" is needed for a top-layer float doesn't hold.**
  - `dropdown-anchor-popover` measured that Bootstrap overrides most UA declarations on `.dropdown-menu`, but the UA inset and overflow remain.
  - The `.tooltip` and `.popover` roots set no border, padding, or background. The UA's popover border, padding, and `Canvas` background would therefore apply. This is unmeasured; the lane must read it.
- **Dropin overstates the gain of intrinsic collapse ("no forced layout read").**
  - At `Collapse.ts:124-127`, the `scrollHeight` read is the style flush that gives the transition its 0 px start, after `.collapse:not(.show)` held `display: none`.
  - Writing `auto` needs a `reflow` in its place. The remaining gain is tracking content that changes mid-transition.
- **Dropin's claim that "`Modal.update` reads a width of 0 and writes no dialog padding" is false when the modal overflows.** `Modal.ts:155-156` then writes `0px` padding on the opposite side, as Bootstrap's zero-width branch does.
- **Slate's two opt-in shapes are inconsistent, though the ruling stands.** Slate argues "the oracle defines Bootstrap's behavior" for the dialog but detects CSS for the gutter, where the oracle also defines behavior (Bootstrap double-compensates).
  - The difference is real. Under a declared stable gutter, Bootstrap's own writes are a visible defect. That is a correctness departure, like ruling 16's.
  - On `<dialog>` markup, Bootstrap works correctly in the document layer.
  - The record must give this reason.

### What the objective lane must measure

**Dialog**
- P12: the recipe with a transparent `::backdrop` over the `div` backdrop.
- P6: Escape under `closedby="none"`, pressed repeatedly, with no `cancel` or `close` firing.
- The order of focus: `showModal()` autofocus, then `Trap` focusing the host, then `close()` restoring focus, against the data API's focus return.
- `showModal()` on a host that already carries `open`.
- Hit-testing against a toast and a body-level tooltip.
- Two controls, both equal with no row:
  - Bootstrap and the engine on the same `<dialog>` host without the option;
  - `dialog: true` on a `div` host.
- The option guard must be realm-aware, because the oracle runs in a child frame.

**Gutter**
- A gutter declared before the lock: `body`, `.fixed-top`, `.fixed-bottom` (whose skip condition at `Lock.ts:69` changes when the width is 0), and `.sticky-top`.
- An overflowing modal's `update`, an offcanvas, and RTL.
- A stable gutter with no overflow.

**Collapse**
- The transition starts from 0 with a `reflow` in place of the `scrollHeight` read.
- Content that resizes mid-transition.
- A reversal mid-transition, and reduced motion.

**Top layer**
- The UA residue on `.tooltip[popover]`, `.popover[popover]`, and `.dropdown-menu[popover]` under Bootstrap's sheet.
- Geometry within 1 px of Popper.
- Escaping an ancestor whose `overflow` is not `visible`.
- RTL, and a float inside a dialog.
- Hit order against Bootstrap's z-index scale.

**Lanes-log prediction**
- `src` and `app` contain no `scrollbar-gutter`, `interpolate-size`, or `popover=` (grep at the tip). Stage B predicts no statechart row.

## D4: the remainder map's partial items

- **M1: both agree.** Extend `Tip.test.ts: records author description preservation against Bootstrap overwrite`. A page token added while the tip shows yields a `tip-description` row: Bootstrap removes the attribute, and the engine keeps the author token. Take slate's control as well: a token removed mid-show stays removed on both sides.
- **M4: dropin fixes it, slate records a row. Ruling: slate's row.**
  - Dropin's merge copies the computed names inline and restores an original. Ruling 16 says "A list slot takes per-owner tokens and stores no original" (`browser-convention-verdict.md:151`, verified).
  - The row is `anchor-stylesheet`, consumed by a supplemental comparison in `Placement.test.ts:96`.
  - Graft dropin's point into the row's Reason: while the panel shows, an author element anchored to the stylesheet name loses its anchor.
- **R13: slate records a row, dropin closes it as moot. Ruling: extract the duplicate, and add the row only if the instrument passes its control.**
  - Extract the duplicated loop at `Tip.ts:217-222` and `Dropdown.ts:124-131` into `bindTouchListeners(document, signal)` in `helpers.ts`, tested in `helpers.test.ts`, under the consolidation step.
  - The row is admissible only if a CDP listener read in the test document first reads a listener the probe adds itself (`lanes.md:225`). With that control, add the shared-mechanics row `touch-listeners`, with Bootstrap's value as a source reading cited in Reason, as `guides/veneer.md:667` permits.
  - Without the control, R13 closes with the extraction alone.
  - Slate's counts (Bootstrap 1 then 0, the engine 2 then 1) come from the source and are unmeasured.
- **R7: closed.**

## D5: units

### Where the proposals agree

- The contract unit goes first, the rename runs serially before every stage B unit, family units run in parallel worktrees, and the guide voice comes last.
- One `orkestrel-falsify` round runs, then `verifier`.

### Rulings

- Take dropin's split, which adds separate collapse, top-layer, and integration units.
- Take slate's separate serial button unit, because it overlaps the rename on `factories.ts`.
- The top-layer unit must follow the dialog unit and the remainder unit, because it shares `Tip.ts` and `Dropdown.ts` with the remainder unit and its rows interact with the dialog's.
- The remainder unit owns `helpers.ts` in the parallel window. Every other unit treats `helpers.ts` as report-only.

### What the objective lane must measure

- Before the rename unit lands, `npm run test:journey` must show no moved row, with the journey scope opted in.

---

## Synthesized ruling

### D1

**`src/browser/types.ts`:**
- `VeneerOptions.plugins?: readonly PluginInterface[]` lists exactly the routed plugins in dispatch order; a later same-named entry replaces the earlier one in place. Default: `[]`. A scope with no plugin adds no listener, boots nothing, and reserves its root.
- `TipPluginOptions { readonly boot?: boolean }` takes slate's TSDoc. Default: `false`.

**`src/browser/plugins.ts`:**
- `createTooltipPlugin(options?: TipPluginOptions)` and `createPopoverPlugin(options?: TipPluginOptions)` add `boot: { selector }` only when `options.boot` is `true`.
- `createBootstrapPlugins()` is unchanged.

**`src/browser/factories.ts`:**
- `createVeneer(root = document, options: VeneerOptions = {})` calls `Veneer.resolve(root, options.plugins ?? [])`.

**Button removals:**
- Remove `toggle.vn.button`, `ButtonEventMap`, `ToggleDetail`, `BUTTON_EVENTS`, and `ButtonOptions`.
- The class becomes `Button(element, context)`, and the factory becomes `createButton(element)`.
- `ButtonInterface.toggle` is documented as "Toggles class `active` and writes `aria-pressed` to match."
- Migrate these consumers in the same change:
  - `Button.test.ts`;
  - `integration.test.ts:273`;
  - `setupBrowser.test.ts:44` and `buildConflict`;
  - `index.test.ts:14`;
  - `ORACLE_EVENTS` at `setupBrowser.ts:3774`;
  - guide `:596` and `:608`.

**Guide:**
- Remove the four `tip-boot` rows (`:689-692`) and the 16 `button-toggle` rows (`:696-711`).
- Rewrite `:578`, `:580`, `:588` (drop the filter recipe), and `:939`.

**Composition and every in-tree caller:**
- Every in-tree caller that expects Bootstrap passes `{ plugins: createBootstrapPlugins() }`, including `setupBrowser.ts:4668`.
- `app/browser/main.ts` holds its scope and composes `[...createBootstrapPlugins(), createTooltipPlugin({ boot: true }), createPopoverPlugin({ boot: true })]`.
- `startJourneyVeneer` composes the same list inline.

**Proofs:**
- A bare scope stays inert, shown behaviorally: one data-API click per family changes nothing, and tip hosts keep `title`.
- The opt-in equals Bootstrap plus its init snippet, with no row. The control is the collection alone against an oracle without the snippet.
- `plugins.test.ts` pins `boot` absent and present, both values frozen.
- The distribution case pins the bundle of `createVeneer` alone.

### D2

- Apply the rename table from D2, together with the `VeneerError` codes in `src/core/types.ts:55-62`.
- `startJourneyEngine` and `journeyEngine` become `startJourneyVeneer` and `journeyVeneer`. Migrate every call site listed in D1, ruling 4.
- Keep "engine" as the runtime noun, as listed in D2.
- Guide changes:
  - the Methods heading `#### \`VeneerInterface\``;
  - the Surface rows;
  - the Proof cells that name `Engine.test.ts`;
  - the headings `### Boot a Bootstrap page` and `### Use native hosts`.
- Also change `ROADMAP.md:144-145`.
- The merging side rebuilds `showcase/browser.html`.

### D3

**Dialog:**
- `ModalOptions.dialog?: boolean` and `ModalPluginOptions { readonly dialog?: boolean }`, both taking slate's TSDoc. Default: `false`. Markup never sets the leaf.
- `createModalPlugin(options?: ModalPluginOptions)`.
- The path runs only on a realm-aware `HTMLDialogElement` host:
  1. `#open` acquires `closedby` through the `Hold` and writes `none`, then calls `showModal()` at the `display: block` write.
  2. `#close` calls `close()` at the `display: none` write and releases `closedby`.
  3. `destroy` calls `close()` on an open host.
- Rename the private field `#dialog` to `#content`.
- Keep `Backdrop`, `Trap`, and `Lock`.
- CSS goes in your stylesheet fence: the `dialog.modal` reset, `dialog.modal[open] { display: block }`, and `dialog.modal::backdrop { background: transparent }`.
- Rows use the prefix `modal-dialog`: `$::open`, `$::closedby`, the focus at the Tab limit, and the hit order against a toast and a tooltip. `Modal.test.ts` consumes them.

**Gutter:**
- `LockInterface.width` reports `0` when the computed `scrollbar-gutter` on `documentElement` begins with `stable`, read before the first write. Nothing else in `Lock` changes.
- Rows use the prefix `lock-gutter`. `Lock.test.ts` consumes them.

**Collapse:**
- When the panel's computed `interpolate-size` is `allow-keywords` and the dimension is `height`, the show path writes `auto` after a `reflow`, in place of the measured `px`.
- Rows use the prefix `collapse-intrinsic`.
- It lands last, and is dropped if the mid-transition resize shows no difference.

**Top layer:**
- `position.popover?: boolean` (default `false`) on `DropdownPositionOptions` and `TipPositionOptions`.
- `.show` stays authoritative. `showPopover()` and `hidePopover()` follow in the same step, and the engine supports only `manual`.
- The UA reset goes in your stylesheet fence.
- Rows use the prefixes `floating-layer:dropdown`, `floating-layer:tooltip`, and `floating-layer:popover`.
- The guide states the inert-outside-dialog limit.

**Every piece:**
- The lead sentence of `### Engine departures` names the opt-in prefixes.
- With the opt-in off, every stage A row is unchanged.

### D4

- **M1:** add the `tip-description` row with its removal control.
- **M4:** add the `anchor-stylesheet` row, with the visible consequence in Reason.
- **R13:** extract `bindTouchListeners`. Add the row only under a self-controlled CDP read; otherwise close R13.
- **R7:** closed.

### D5

Every unit runs this proof ladder:
1. the touched file;
2. `npm run test:src:browser`;
3. `npm run test:guides` wherever the guide changes.

These files are report-only, returned as patches that the Orchestrator applies:
- `types.ts` (after U0), `constants.ts`, `index.ts`, and `factories.ts` (after U2);
- the guide;
- `tests/setup.ts`;
- the engine section of `tests/setupBrowser.ts`;
- `helpers.ts`, except for U6.

The units, in order:

1. **U0 `stage-b-contract`** (Opus, edits only): the types for D1–D3 and the Button removals. The Orchestrator runs the browser-scope `tsc`.
2. **U1 `veneer-boot`** (Astra, worktree): D1 and D2, every consumer, and the removal of the `tip-boot` rows.
   - Before it lands, log the rename, the blank slate, the migrated showcase call sites, `startJourneyVeneer`, and predicted rows: none. `TOOLTIP_SCENARIOS`, `POPOVER_SCENARIOS`, and `DIALOG_TOOLTIP_SCENARIOS` keep their behavior through the opt-in.
3. **U2 `button-quiet`** (Astra, serial after U1): the Button removals and their consumers. Predicted rows: none.
4. **These four run in parallel after U2:**
   - **U3 `dialog`** (Astra, worktree): `Modal.ts`, `createModalPlugin`, and `Modal.test.ts`.
   - **U4 `gutter`** (Astra, worktree): `Lock.ts` and `Lock.test.ts`.
   - **U5 `intrinsic`** (Astra, worktree): `Collapse.ts` and `Collapse.test.ts`.
   - **U6 `remainder`** (Astra, worktree): `helpers.ts`, `Tip.ts`, `Dropdown.ts`, `Tip.test.ts`, `Dropdown.test.ts`, and `Placement.test.ts`.
5. **U7 `layer`** (Astra, after U3 and U6): `Placement.ts`, `Dropdown.ts`, `Tip.ts`, and their tests.
6. **U8 `native-integration`** (Astra): `tests/src/browser/integration.test.ts`, with all the pieces on one page.
7. **U9 `stage-b-guide`** (Opus): the Browser entry prose, both CSS fences, applying the row patches, and the `ROADMAP.md` browser lines.
8. **Close-out:** one `orkestrel-falsify` round, then `verifier` runs the tree-wide gates.

Before each of U3–U7 lands, log predicted rows: none. The showcase writes `div.modal` and uses no gutter, `interpolate-size`, or `position.popover`.

## What remains

**For the Orchestrator before any unit:**
- Delete the untracked `tests/src/browser/design.probe.test.ts`.
- Log in `lanes.md` that the 0.0.88 visit is parked, under the user's "continue without the scaffold bump", and that the landing hold of `:63` is lifted.
- Dispatch an inventory lane for the wider stage B scope. It must cover native surfaces the engine doesn't use yet, beyond the four pieces, including the stage A refusals that could return as opt-ins:
  - invoker commands;
  - `interestfor`;
  - `@starting-style` fades;
  - `popover="hint"`;
  - `CloseWatcher` and `closedby` on the offcanvas;
  - top-layer toasts.

**For the user:**
- Confirm dropping `toggle.vn.button`. It removes a public symbol set whose stated reason, in design ruling 5, was the Vue face.
- Confirm the inventory scope: whether the refused stage A substitutions are in stage B as opt-ins.
- Note that the blank-slate default breaks published consumers who call `createEngine(root)`. Under the no-shim law, the release must say so.