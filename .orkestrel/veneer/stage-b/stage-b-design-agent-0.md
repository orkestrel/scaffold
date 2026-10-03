**Lane: subjective** (API shape, names, ergonomics, guide voice), at veneer `dc4654b`.

---

## D1: the blank-slate boot scope

### Shape

**The entry point.** `createVeneer(root?, options?)` routes exactly `options.plugins`, and `plugins` defaults to an empty list. The Bootstrap convenience stays separate as `createBootstrapPlugins()`, unchanged: the twelve plugins in bundle order, with no tip boot.

**The opt-in tip boot.** Tip boot becomes a boolean option on the two tip plugin factories. `architecture.md:214` allows it: "`create{Entity}Plugin(options?)`". A later same-named plugin in the list replaces the earlier one in place (`types.ts:2157`). So a page opts in by appending, and no new collection factory is needed.

```ts
/** Configures a boot scope at creation. */
export interface VeneerOptions {
	/**
	 * Lists exactly the plugins this scope routes, clears, and boots; a later same-named entry replaces the earlier one in its position.
	 *
	 * @remarks
	 * An empty list serves no data API, which reserves the root's subtree from every enclosing scope. Pass `createBootstrapPlugins()` for Bootstrap's twelve.
	 *
	 * Default: `[]`.
	 */
	readonly plugins?: readonly PluginInterface[]
}

/**
 * Configures a tooltip or popover plugin.
 *
 * @example
 * ```ts
 * const options: TipPluginOptions = { boot: true }
 * ```
 */
export interface TipPluginOptions {
	/**
	 * If `true`, the plugin creates a tip on every `[data-bs-toggle="tooltip"]` or `[data-bs-toggle="popover"]` host its scope finds at boot; if `false`, a tip host stays inert until a factory creates its tip, as in Bootstrap.
	 *
	 * Default: `false`.
	 */
	readonly boot?: boolean
}
```

The factory signatures become these:

- `createTooltipPlugin(options?: TipPluginOptions): PluginInterface<Tip<'tooltip'>>`
- `createPopoverPlugin(options?: TipPluginOptions): PluginInterface<Tip<'popover'>>`

Each factory attaches its `boot` entry (`plugins.ts:284`, `plugins.ts:364`) only when `options.boot` is true.

A page boots in one of two ways:

```ts
// Bootstrap behavior
createVeneer(document, { plugins: createBootstrapPlugins() })
// plus tips started at boot
createVeneer(document, {
	plugins: [...createBootstrapPlugins(), createTooltipPlugin({ boot: true }), createPopoverPlugin({ boot: true })],
})
```

**Delegation gets simpler.** The guide's filter recipe (`guides/veneer.md:588`) goes away. Container delegation works with `createBootstrapPlugins()` as it is, because the default collection no longer constructs tip children before a delegator can configure them.

### Alternatives, each ruled

- **No default; the consumer passes the collection: adopted.** It is the user's ruling read literally. The empty-list scope also has a real use: it reserves a subtree.
- **Make `plugins` required: refused.** It forces an options object, which makes `root` positionally required. It also makes a deliberate empty reservation look like an error.
- **Default to the twelve plugins without tip boot: refused.** The user ruled that defaults are "a convenience but separate". A hidden default list is the forced convenience that ruling withdraws.
- **A second boot entry such as `createBootstrap(root)`: refused.** It only supplies a default, so it fails the "no superfluous wrappers" law in `AGENTS.md`.
- **Separate factories such as `createTooltipBootPlugin()`: refused.** The name is not `create{Entity}Plugin`. If the plugin kept the name `tooltip`, it would be a variant of the same entity behind a second name.
- **`createBootstrapPlugins({ tips: true })`: refused.** The rule writes the collection form without options (`architecture.md:214`), and spreading with in-place replacement already composes the same result.
- **A function over a live scope, such as `bootTips(scope)`: refused.** It would create tips through factories, so the scope would not own them (`guides/veneer.md:582`). It would also miss the load timing at `Engine.ts:78-83`, and `VeneerInterface` exposes no registry for it to use.

### Audit of forced behavior in `src/browser`

| Behavior | Ruling | Reason |
| --- | --- | --- |
| Tooltip and popover `boot` (`plugins.ts:284`, `plugins.ts:364`) | separate (opt-in `boot`) | Bootstrap leaves tips to page script. |
| Carousel `[data-bs-ride="carousel"]` boot (`plugins.ts:100`) | keep | Bootstrap's own load data API. |
| Scrollspy `[data-bs-spy="scroll"]` boot (`plugins.ts:300`) | keep | Bootstrap's load data API. |
| Offcanvas `.offcanvas.show` shown at boot (`plugins.ts:269`) | keep | Bootstrap's load handler. |
| Active tab toggles at boot (`plugins.ts:323-326`) | keep | Bootstrap's load handler. |
| Collapse plugin's `{ toggle: false }` (`plugins.ts:114`) | keep | It equals Bootstrap's data API config. |
| `toggle.vn.button` (`types.ts:245-248`, `guides/veneer.md:696-711`) | keep | It is a notification with no default action and no state write, so a page that ignores it sees Bootstrap's state. Separating it would need a `ButtonOptions` leaf that every Vue consumer must set. |
| Several plugins per host, and both tip profiles on one host (`registry-plugins`, `registry-plugins:tips`) | keep | Bootstrap's behavior here is a refusal that leaves panels accumulating; Veneer starts nothing unasked. |
| Typed `detail`, no synthetic `transitionend`, mistyped markup falling back to the default, teardown restores, per-owner trap, token lists, direction read at show | keep | Mechanism differences ruled earlier (rulings 7, 11, 16, 17). None initiates behavior. |
| A repeated `createVeneer` returns the live scope and ignores its options (`Engine.ts:101-107`) | keep | Idempotent boot, ruled in convention ruling 2. |
| The touch noop `mouseover` listeners | keep | Bootstrap does the same; see D4 R13. |

### Departure rows

The four `tip-boot` rows (`guides/veneer.md:689-692`) leave `### Engine departures`, because the default no longer departs. The opt-in still departs from Bootstrap, so the rows move, with their Reason rewritten ("Opted in through `boot: true`"), into a new `### Engine additions` table. That table has the same columns and is read by `readDepartures(guide, 'Engine additions')`; it holds every row an opt-in piece causes. It mirrors the sheet's own split between `## Departures` and `## Additions` (`guides/veneer.md:1132`, `guides/veneer.md:1174`).

### Proofs

- **Moves:** `Engine.test.ts: boots configured hosts and releases stale registrations safely` becomes `Veneer.test.ts`, composes `createTooltipPlugin({ boot: true })` and `createPopoverPlugin({ boot: true })`, and consumes the additions rows.
- **New:**
  - The default collection leaves tip hosts inert, equal to Bootstrap, with no row.
  - `createVeneer(root)` routes nothing: a collapse toggle click dispatches no `show.bs.collapse` and writes no class.
  - `reserves a delegated subtree before document boot` (`Tip.test.ts`) passes without the filter.

### Risks

- **A silent inert scope.** `createVeneer(document)` routes nothing. The guide's first fence must show the Bootstrap line.
- **Over-correction.** Dropping the carousel, scrollspy, offcanvas, or tab boot entries breaks parity with Bootstrap. Dropping the tip plugins from `createBootstrapPlugins()` breaks the in-place replacement that the opt-in relies on.

---

## D2: `createVeneer`

### Shape

| Today | Lands as |
| --- | --- |
| `createEngine` | `createVeneer(root?: Document \| HTMLElement, options?: VeneerOptions): VeneerInterface` |
| `Engine` (`src/browser/Engine.ts`) | `Veneer` (`src/browser/Veneer.ts`), with `Veneer.resolve(root, plugins)` |
| `EngineInterface` | `VeneerInterface` |
| `EngineOptions` | `VeneerOptions` |
| `EngineInteraction` | `VeneerInteraction` |
| `ENGINE_ROOT`, `ENGINE_DESTROYED`, `ENGINE_DESTROY` | `VENEER_ROOT`, `VENEER_DESTROYED`, `VENEER_DESTROY` (`src/core/types.ts:55-62`) |
| `tests/src/browser/Engine.test.ts` | `tests/src/browser/Veneer.test.ts`; the family key `'Engine'` becomes `'Veneer'` (`tests/setup.ts:419`) |

The `VeneerInterface` TSDoc keeps the body of `types.ts:461-472` with these changes:

- "`createVeneer` returns one."
- "A scope created with no plugins routes, clears, and boots nothing."
- `destroy` throws `VeneerError` with code `VENEER_DESTROY`.

### Name checks

- `Veneer`, `VeneerInterface`, `VeneerOptions`, and `VeneerInteraction` appear in no hosted `## Surface` table. The only `Veneer` hit, in `scaffold/guides/test.md:1667`, is prose.
- `names.md:126` treats each identifier as a distinct name, so `VeneerError` does not collide with `Veneer`.
- A product-named entity has a fleet precedent: `createBrowser` returning `BrowserInterface`.

### Alternatives, each ruled

- **Keep the class `Engine` and rename only the factory: refused.** `names.md:176` pairs the factory `create{Entity}` with its entity, and "A consumer can predict them" (`names.md:8`).
- **`Scope` or `createScope`: refused.** Agent owns them (`scaffold/guides/agent.md:459`).
- **`SCOPE_*` codes: refused.** That is a second term for one concept. Codes take the entity's subject noun (ruling 17 D3). The stutter in `VeneerError('VENEER_ROOT')` is accepted.
- **Keep the `ENGINE_*` codes: refused.** They would leave a dead term behind.

### Guide

- **Methods heading:** `#### \`EngineInterface\`` (`guides/veneer.md:320`) becomes `#### \`VeneerInterface\``. The Surface rows at `:86`, `:92`, `:195`, `:247`, and `:259` are renamed.
- **The word "engine" stays** for the browser runtime as a whole (`guides/veneer.md:576`), so `### Engine departures`, the `EngineDeparture` test type, and the showcase's `Engine states`, `ENGINE_ROWS`, and `createEngineTable` stay.
- **"Scope" stays** as the prose noun for a `Veneer` instance. Prose writes "the `Veneer` class" or "a `Veneer` scope", and never a bare "Veneer" for the class.
- **Headings added:** `### Boot a Bootstrap page` (the D1 fences, executed by `tests/guides.test.ts`), `### Use native hosts` (D3), and `### Engine additions`.
- **Rewritten:** `:578`, `:580`, `:588`, and `:939`.

### Consumers the rename migrates

- **`src/browser`:** `Engine.ts`, which becomes `Veneer.ts`; `factories.ts:161-175`; `helpers.ts:3`, `:87`, `:122`; `index.ts:8`; `types.ts`. In `src/core`: `types.ts:56-58`.
- **Engine-lane tests:**
  - every `tests/src/browser/*.test.ts` that calls `createEngine`;
  - `tests/src/core/errors.test.ts:8-12`;
  - `tests/setup.ts:419`;
  - `tests/setup.test.ts`, whose `'Engine departures'` section name stays;
  - `tests/distribution.test.ts:998-1052`;
  - `tests/setupBrowser.test.ts:986`.
- **`tests/setupBrowser.ts`, engine section:** the import (`:91`) and `:4668`.
- **`tests/setupBrowser.ts`, showcase section:** `:1273-1284`, type and call only. The names `startJourneyEngine` and `journeyEngine` stay for the showcase lane to decide.
- **Showcase files:** `app/browser/main.ts:1-6`, `tests/app/browser/Showcase.test.ts:9`, `:315`, and `tests/app/browser/main.test.ts:8`, `:116`.
- **Docs:** the Proof cells naming `Engine.test.ts` (`registry-plugins` and the moved `tip-boot` rows), and `ROADMAP.md:144-145`.
- **Built page:** `showcase/browser.html`, rebuilt with `npm run build:showcase`.

### Showcase migration

The showcase relies on tip boot: `live-components.html`, `tooltips.html`, and `popovers.html` carry tip toggles. Add `app/browser/plugins.ts` with this collection:

```ts
createShowcasePlugins(): readonly PluginInterface[]
// returns [...createBootstrapPlugins(), createTooltipPlugin({ boot: true }), createPopoverPlugin({ boot: true })]
```

- `main.ts` holds the scope it creates and destroys it in the `pagehide` arrow.
- The journey passes `createShowcasePlugins()` to `startJourneyEngine` as an argument, per the boundary rule in `lanes.md:38`.
- This is the first real consumer of `boot: true`.

**Statechart rows:** no row moves, provided the showcase opts in this way.

### Risk

Over-correction would rename the showcase's "Engine states" items, which describe classes the engine writes and are unrelated to the boot scope.

---

## D3: stage B's native pieces

### Shape

One rule covers all four pieces: **the engine follows native markup and CSS the author writes.** No piece adds a plugin, an option, or an export. A Bootstrap page that writes none of them gets stage A unchanged.

| Piece | How it is opted in | What the default does |
| --- | --- | --- |
| `<dialog class="modal">` | markup: the host is an `HTMLDialogElement` | a `div.modal` takes the stage A path |
| `scrollbar-gutter: stable` lock | CSS: computed `scrollbar-gutter` on `documentElement` contains `stable` | padding compensation |
| `interpolate-size` vertical collapse | CSS: the panel's computed `interpolate-size` is `allow-keywords` | the measured pixel height (`Collapse.ts:127`); horizontal collapse always measures |
| top-layer floats | markup: `popover` on the `.dropdown-menu`, or on the tip template root (through `data-bs-template` or `content.template`) | the ordinary layer (design verdict ruling 8) |

The TSDoc remarks to add in `types.ts` (none is a member change):

- **`ModalInterface`:** A `<dialog class="modal">` host opens through `showModal()` in the top layer. The engine writes `closedby="none"` so that Escape and backdrop clicks keep the `dismiss` options and the `prevent` hook. It keeps the `div.modal-backdrop` and the focus trap, because `inert` excludes the page without wrapping Tab.
- **`LockInterface.width`:** Reports `0` while the root's `scrollbar-gutter` is `stable`. The gutter keeps the layout, so the lock writes no compensation.
- **`CollapseInterface`:** When the panel's computed `interpolate-size` is `allow-keywords`, a vertical transition writes `auto` in place of the measured height.
- **`DropdownInterface` and `TipInterface`:** A menu or a tip root that carries `popover` shows in the top layer through `showPopover()`. The engine keeps the `show` class and the popover state in step.

### Mechanics

The objective lane owns correctness; these are the shapes.

- **Modal (dialog path).**
  - Call `showModal()` after `display: block` and before the reflow (`Modal.ts:197-205`); call `close()` after `display: none` (`Modal.ts:217`).
  - `closedby="none"` is acquired through `Hold` at construction and restored on `destroy`.
  - Escape keeps the existing keydown listener (`Modal.ts:55-63`).
  - `Backdrop`, `Trap`, and `Lock` are kept.
- **Lock (gutter).** Read the gutter before the first measurement at `Lock.ts:34-35`. When it is stable, skip the padding loop (`Lock.ts:69-80`) and the saved `data-bs-*` writes, and keep `overflow: hidden`. `Modal.update` reads a width of `0` and writes no dialog padding.
- **Collapse (intrinsic).** Branch only at the dimension write (`Collapse.ts:127`), only for height.
- **Placement, Dropdown, and Tip (top layer).** Call `showPopover()` and `hidePopover()` in step with the `show` class. Placement writes the positioning it needs inline (position, inset, and the panel overflow the arrow needs), because positioning is mechanism. Bootstrap's z-index scale gives way to insertion order (`top-layer` reading).
- **The `popover` value.** Document `popover="manual"`. Accept `auto` with an additions row: native light dismiss hides without the veto.

### Where the CSS lives

The consumer's sheet, printed in the guide's `### Use native hosts` CSS fence, which the proof reads from the guide. The four lines are the measured `dialog.modal` reset, `dialog.modal[open] { display: block }`, `dialog.modal::backdrop { background: transparent }`, and, for a top-layer float, nothing beyond what Placement writes inline. The gutter and `interpolate-size` declarations are the author's opt-in by definition.

- **Refused: the Bootstrap face sheet.** The guide rules out both an addition and a departure there: "The Bootstrap sheet records no addition … additions belong to the styles face" (`guides/veneer.md:1176-1177`), and "A value, selector, or context departure is inadmissible in the Bootstrap sheet" (`:1144`).
- **Refused: the engine's constructed stylesheet.** The UA dialog reset is presentation, and "Mechanism, not product policy" (`AGENTS.md`) bars it. Placement's constructed sheet (`Placement.ts:291-293`) carries only `@position-try` rules its own inline writes reference. A layered constructed sheet also sorts last on a page whose layer list lacks Veneer's names, so it would beat that page's utilities.
- **Later home: the styles face.** The styles chunk can ship these rules in `reset` when it opens.

### Departure rows

All of these go in `### Engine additions`. In each oracle case, Bootstrap runs on identical markup with the same consumer CSS loaded in both realms.

| Scenario prefix | Path | Bootstrap | Engine | Consuming case |
| --- | --- | --- | --- | --- |
| `dialog-modal` | `$::open` / `$::modal` | `<absent>` / `false` | `""` / `true` | `Modal.test.ts` dialog host case |
| `dialog-modal` | `$::closedby` | `<absent>` | `none` | same |
| `dialog-modal` | hit test, toast over an open modal | toast | dialog | same |
| `gutter-lock` | `body::padding-right`, `.fixed-top::padding-right` | `15px` | `<unset>` | `Lock.test.ts` modal and offcanvas cases |
| `gutter-lock` | `body::data-bs-padding-right` | saved value | `<absent>` | same |
| `collapse-intrinsic` | `panel::writes[n].height.after` | `120px` | `auto` | `Collapse.test.ts` vertical, accordion, mid-transition |
| `floating-layer:dropdown`, `floating-layer:tooltip`, `floating-layer:popover` | `panel::popover-open`, hit-test order against modal, toast, and an earlier float | `false`, z-index order | `true`, insertion order | `Placement.test.ts`, `Dropdown.test.ts`, `Tip.test.ts` |

### Measurements to re-run at the tip before a writer relies on them

- **Dialog:**
  - `dialog-modal` through the Modal sequence at the tip, against the `div` control;
  - Escape under `closedby="none"`, including repeated presses (the planner's P6);
  - the `div` backdrop painting beneath a transparent `::backdrop` (P12);
  - the trap wrapping inside a `showModal()` dialog. The Tab limit at the frame boundary is named in the guide (`browser-feasibility-report.md:35`).
- **Gutter:** `scroll-lock` with the modal and the offcanvas, plus the `.modal-dialog`, `.sticky-top`, and `.fixed-bottom` boxes (P7, unmeasured), plus the order of the computed-gutter read against the `clientWidth` change (`browser-feasibility-report.md:25`).
- **Collapse:** `collapse-intrinsic` through `Collapse` at the tip, including a mid-transition reversal and reduced motion.
- **Top layer:**
  - `top-layer` and `dropdown-anchor-popover` with Placement at the tip;
  - geometry within 1 px of Popper under a top-layer float;
  - escaping an `overflow: hidden` ancestor;
  - RTL;
  - a float inside a dialog.

### Must not break

- Every `modal:*`, `offcanvas:*`, `trap-owner`, `lock-priority`, `overlapping-locks`, `saved-attributes`, `collapse-destroy`, `horizontal-collapse-destroy`, `anchor-placement`, `inline-arrow`, `placement-restore`, `popper-visibility-attributes`, and `floating-direction` row, unchanged on the default path.
- The 1 px Popper population.

### Should any piece not ship?

All four ship, because detection costs no API.

- **Collapse is the weakest.** Its motion is equal to the measured path (`collapse-intrinsic`, 368 ms against 349 ms). Its gains are no forced layout read and tracking content that changes mid-transition. Land it last, and drop it if its rows outnumber that gain.
- **Top layer is the strongest for migrants.** It escapes clipping ancestors without `boundary` or a fixed Popper strategy.

### Alternatives, each ruled

- **Plugin factory options such as `createModalPlugin({ dialog: true })`: refused.** A component built by a factory bypasses the plugin. A lock shared across overlays cannot take a per-plugin gutter policy. Markup already states the dialog.
- **A separate `Dialog` class or plugin: refused.** It would split one registry name over two host types, so `createModal(dialog)` would take the `div` path.
- **The engine writing the gutter or `interpolate-size` itself: refused.** It would force a behavior the author did not choose.

### Risks

- **Common reset lines switch pieces on.** Many modern resets set `scrollbar-gutter: stable` or `interpolate-size`, which switches the gutter lock and intrinsic collapse on. The engine's result is visually equal, and Bootstrap's own JavaScript double-compensates under a stable gutter.
- **Over-correction.** Replacing `Trap` with `inert` on the dialog path breaks Tab wrapping (`focus-inert`). Light dismiss through `popover="auto"` loses `hide.*` vetoes.

---

## D4: the remainder map's partial items

- **R13 closes as moot.** The noop listener has no effect on any readable surface. CDP's listener reader read 0 even for a listener it added itself (`lanes.md:221`), and a noop writes nothing. The engine keeps a touch document's listeners while any owner is open (`Dropdown.ts:124-131`, `Tip.ts:217-222`), where Bootstrap's shared noop is removed at the first close. No row and no prose, because no proof can consume a claim about it. Over-correction would build a counted shared-listener store for an invisible effect.
- **M1: extend the existing oracle case.** `Tip.test.ts: records author description preservation against Bootstrap overwrite` gains a step: the page adds the token `hint` while the tip is shown, then the tip hides. A new `tip-description` row reads Bootstrap `<unset>` against the engine's `author hint`.
- **M4: fix rather than record.** On acquire, Placement merges the reference's computed `anchor-name` names into its inline token list, and restores the original inline value on release. An author's own CSS-anchored element then stays anchored while a tip or menu shows, as it does under Bootstrap, so no departure row is needed.
  - **Proof:** a `Placement.test.ts` case with a stylesheet `anchor-name` on the trigger and an author element anchored to it. The author box is unchanged through show and hide. The control without the merge unanchors it.
  - **Refused alternative:** a departure row alone, because the difference is a defect an author can see.
  - **Risk:** one `getComputedStyle` per placement start. That is not the per-element scan the repair removed (10.6 to 2.0 ms, `lanes.md:123`).
- **R7 needs no work.**

---

## D5: units

Units run in order where their files overlap. Shared files are report-only for every family unit: `types.ts`, `constants.ts`, `helpers.ts`, `index.ts`, the guide, and `tests/setup.ts` after U2. The Orchestrator applies the patches with `append-merge.ts`.

1. **U1 `veneer-contract`** (subjective, Opus, edits only; the Orchestrator runs `tsc`).
   - **Owns:** `src/browser/types.ts` (the D1 and D2 types and the D3 remarks) and `src/core/types.ts`.
   - **Accept:** the browser typecheck fails only at the consumers U2 migrates.
2. **U2 `veneer-rename`** (objective, Astra, one worktree, serial after U1, lands before any stage B unit).
   - **Owns:**
     - `Engine.ts`, which becomes `Veneer.ts`; `factories.ts`; `plugins.ts` (the `boot` option); `helpers.ts`; `index.ts`;
     - every `tests/src/browser/*.test.ts`, with `Engine.test.ts` becoming `Veneer.test.ts`;
     - `tests/src/core/errors.test.ts`;
     - `tests/setup.ts` (the family key, and the `Engine additions` section in the reader at `:473-531`) and `tests/setup.test.ts`;
     - both sections of `tests/setupBrowser.ts`, calls and types only, and `tests/setupBrowser.test.ts`;
     - `tests/distribution.test.ts`;
     - `app/browser/main.ts`, the new `app/browser/plugins.ts`, `tests/app/browser/Showcase.test.ts` and `main.test.ts`, and the journey call site;
     - in the guide: the Surface, Methods, and table cells, the moved `tip-boot` rows, and a mechanical prose rename;
     - `ROADMAP.md:144-145`, and a rebuilt `showcase/browser.html`.
   - **Accept:**
     - the D1 proofs pass;
     - a sweep of `src tests app` for `createEngine|EngineInterface|EngineOptions|EngineInteraction|ENGINE_(ROOT|DESTROYED|DESTROY)\b|\bEngine\b` returns only `Engine departures`, `EngineDeparture`, and the showcase's engine-table hits;
     - `test:src:browser`, `test:setup`, `test:setup:browser`, `test:app:browser`, `test:guides`, and `test:journey` are green.
   - **Lanes log before it lands:** the rename; the blank slate; `createShowcasePlugins`; predicted statechart rows: none.
3. **U3 `veneer-guide`** (subjective, Opus, after U2).
   - **Owns:** the voice of `guides/veneer.md:574-663` and `:939`, the `### Boot a Bootstrap page` fences, and the prose of `### Engine additions`.
4. **Stage B and remainder units**, in parallel worktrees from U2's landing (all objective, Astra):
   - **U4 `browser-dialog`:** `Modal.ts` and `Modal.test.ts`.
   - **U5 `browser-gutter`:** `Lock.ts` and `Lock.test.ts`, with the modal and offcanvas gutter cases.
   - **U6 `browser-intrinsic`:** `Collapse.ts` and `Collapse.test.ts`.
   - **U7a `browser-remainder`:** `Placement.ts` (M4), `Placement.test.ts`, and `Tip.test.ts` (M1).
   - Each unit returns its additions rows as a guide patch.
5. **U7 `browser-layer`** (objective, Astra, after U4 and U7a land).
   - **Owns:** `Placement.ts`, `Dropdown.ts`, `Tip.ts`, and their tests.
6. **U8 `browser-native-integration`** (objective, Astra), then **U9 `browser-native-guide`** (subjective, Opus).
   - **U8 owns:** `tests/src/browser/integration.test.ts` (all four pieces on one page under a Bootstrap-composed scope).
   - **U9 owns:** `### Use native hosts` (the executed CSS fence), the additions prose, and the stage B closure in the roadmap.
   - **Then:** one `orkestrel-falsify` round, then the tree-wide gates.
   - **Lanes log before each stage B landing:** markup and CSS opt-ins only; the showcase uses none, so predicted rows are none, conditional on the check in the following list.

---

## Could not decide

- **Departures and additions split.** Whether `### Engine additions` is a second table with a second ledger, or the opt-in rows stay in `### Engine departures` under prefixed scenarios. My preference is the split; the harness cost belongs to the objective lane.
- **The `popover` value.** Whether the engine accepts `popover="auto"` with a no-veto row, or treats only `manual` as the opt-in.
- **Page-wide top-layer tips.** These need a template on every trigger today. A plugin-level defaults record (the analogue of Bootstrap's `Tooltip.Default`) would need a new merge slot beneath markup; I did not propose it.
- **A dialog host that is already open.** How the engine treats a dialog host that carries the author's `open` attribute (`showModal()` throws). Either close it first or throw a new code; the objective lane rules.
- **Whether intrinsic collapse ships.** It depends on its row count at the tip.
- **Whether the showcase or the Veneer sheets set the triggering properties.** This decides the "no moved row" prediction for stage B. I have no shell, so I name the reading instead: a grep of `app/browser`, `src/bootstrap`, and `src/tailwindcss` for `scrollbar-gutter` and `interpolate-size`.