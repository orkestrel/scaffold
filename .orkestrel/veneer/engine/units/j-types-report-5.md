# Unit J-TYPES — report 5: the contracts under E9 to E11 and the J-ENGINE-SHAPE amendment

(Returned 2026-09-23 by `opus` on Opus 5.5 as its final message, 100 tool uses, 1061 s; captured by the Orchestrator verbatim, HTML entities decoded.)

## J-TYPES round 5 — report (`opus` on Opus 5.5, worktree `C:/Users/mikes/WebstormProjects/veneer-types`, base `55ca0cd`)

All five acceptance criteria are green and nothing is committed. I took no stop under the deviation contract. The brief contradicts itself in one place (ruling R14 in the rulings table), and one exclusion needs your review (ruling R8).

### Edits

- **E13 (E10).** `SnapshotCategory`, `SnapshotTarget` and `SnapshotInterface` are now `HostSnapshotCategory`, `HostSnapshotTarget` and `HostSnapshotInterface`, and every reference moved with them. The guide's § Surface rows and its `#### \`HostSnapshotInterface\`` table are renamed. No alias remains.
- **E14 (E11, R2, R3).**
  - `EventWire<TMap, TEntity extends string>` types each value as `` `${TKey & string}.vn.${TEntity}` ``. Its `@remarks` and `@example` now use `.vn.` names.
  - Every `{Entity}EventMap` member's TSDoc names its `.vn.` wire event. Pre-change keys say "whose prevention refuses …". Completed keys end "; it is not cancelable". That includes `ButtonEventMap.toggle`, which had no TSDoc before.
  - `hidePrevented` is now `prevent` on `ModalEventMap` and `OffcanvasEventMap`, and both `DismissOptions` leaves now say they dispatch "the `prevent` event". No `@returns` named `hidePrevented`.
  - `DropdownDetail` is `{ readonly click: MouseEvent | undefined }`. Its TSDoc says the event's target is the toggle that dispatches it. Every other Detail type keeps `relatedTarget`.
  - `types.ts` had no sentence about own-property mirroring. `EventHooks` is unchanged.
- **E15 (R19).**
  - Named `ClassMap`, `AttributeMap` and `SelectorMap` interfaces exist per entity and mechanism. The full set is in the vocabulary table.
  - Every `{Entity}Options` has its `classes`, `attributes` and `selectors` groups, typed `Partial<…>`. Each group's TSDoc says it is read from the constructor alone and that an absent key keeps its default. `BackdropOptions.class` is replaced by `classes` (`host`, `shown`, `fade`).
  - `ColorModeOptions`, `ScrollLockOptions`, `PlacementOptions` and `SwipeOptions` gained their groups.
  - `PopoverOptions` overrides the inherited groups with `PopoverClassMap`, `PopoverAttributeMap` and `PopoverSelectorMap`.
  - `DelegateOptions` has one `Pick<{Entity}Options, …>` group per routed entity noun, each with the required TSDoc sentence.
- **E16 (R10).**
  - Added `SanitizerInterface.write(element, html): void`, with the required description and an `@example`.
  - Added `NativeSanitizerOptions { readonly config?: SanitizerConfig }`: absence means the engine's Bootstrap-derived configuration, and an empty dictionary is an explicit platform configuration.
  - `TooltipOptions.sanitize` is replaced by `sanitizer?: SanitizerInterface`, using the dictated sentence and naming no class.
  - `SanitizeOptions` and `SanitizeAllowlist` are deleted, with their rows.
  - Round-4 claim 2 is corrected: the `attributes` default now says "every attribute the platform does not remove as unsafe, which keeps more than `setHTML` called with no sanitizer does". `dataAttributes: false` now removes only the general `data-*` permission, so a listed name survives, and either value needs `attributes`.
  - B4 is carried: "the ones the tip sanitizer sets" now reads "the subset of the dictionary the engine supports", in both mirrors.
  - The `SetHTMLOptions.sanitizer` default no longer says "safe baseline", and the `SanitizeTargetInterface` remark now names the native adapter.
- **E17 (R11).** `CollapseOptions.toggle` is removed. `animation` is now `animated` on `TooltipOptions` and `ToastOptions`. `ButtonOptions.signal` is added ("Destroys the button when it aborts."). `types.ts` had no sentence naming `data-bs-config`, before or after.
- **E18 (parity).**
  - § Surface has one row per added or renamed export and no row for a deleted one, and every changed description cell is updated.
  - The Methods section has tables for `HostSnapshotInterface` (renamed) and `SanitizerInterface` (new).
  - Re-padding: I formatted a scratch copy first, and `oxfmt` re-padded only the rows I wrote and the `SanitizerInterface` table. No unchanged row's padding moved, because the column widths held.

### Vocabulary mapping

Sources are in `node_modules/bootstrap/js/src/`. A selector described as "derived" is built from the entity's own tokens and is not a member.

| Entity | Kind | Key: default (Bootstrap constant) |
| --- | --- | --- |
| Button | class | `pressed`: `active` (`CLASS_NAME_ACTIVE`) |
| Button | selector | `trigger`: `[data-bs-toggle="button"]` (`SELECTOR_DATA_TOGGLE`) |
| ColorMode | attribute | `theme`: `data-bs-theme` (Veneer `COLOR_MODE_ATTRIBUTE`; no Bootstrap plugin constant exists) |
| Collapse | class | `host`: `collapse` (`CLASS_NAME_COLLAPSE`); `shown`: `show` (`CLASS_NAME_SHOW`); `transition`: `collapsing` (`CLASS_NAME_COLLAPSING`); `horizontal`: `collapse-horizontal` (`CLASS_NAME_HORIZONTAL`); `collapsed`: `collapsed` (`CLASS_NAME_COLLAPSED`) |
| Collapse | attribute | `target`: `data-bs-target` (`selector-engine.js` `getSelector`); `parent`: `data-bs-parent` (`Default.parent`) |
| Collapse | selector | `trigger`: `[data-bs-toggle="collapse"]` (`SELECTOR_DATA_TOGGLE`). Derived: `SELECTOR_ACTIVES`, `CLASS_NAME_DEEPER_CHILDREN` |
| Dropdown | class | `shown`: `show`; `disabled`: `disabled` (`util/index.js` `isDisabled`, `dropdown.js:125,160`); `up`: `dropup`; `end`: `dropend`; `start`: `dropstart`; `center.down`: `dropdown-center`; `center.up`: `dropup-center` (`CLASS_NAME_*`) |
| Dropdown | attribute | `dismiss`: `data-bs-auto-close` (`Default.autoClose`); `offset`: `data-bs-offset`; `static`: `data-bs-display`; `reference`: `data-bs-reference`; `popper`: `data-bs-popper` (`dropdown.js:314`); `side`: `data-popper-placement` (written by Popper) |
| Dropdown | selector | `trigger`: `[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)`; `menu`: `.dropdown-menu`; `navbar`: `.navbar`; `entry`: `.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)` (`SELECTOR_VISIBLE_ITEMS`). Derived: `SELECTOR_DATA_TOGGLE_SHOWN`. Excluded: `SELECTOR_NAVBAR_NAV` (ruling R8) |
| Tab | class | `active`: `active`; `shown`: `show`; `fade`: `fade`; `disabled`: `disabled` (`tab.js:163,294`); `dropdown`: `dropdown` (`CLASS_DROPDOWN`) |
| Tab | attribute | `target`: `data-bs-target` |
| Tab | selector | `trigger` (`SELECTOR_DATA_TOGGLE`, all three toggle values); `list`: `.list-group, .nav, [role="tablist"]` (`SELECTOR_TAB_PANEL`); `wrapper`: `.nav-item, .list-group-item` (`SELECTOR_OUTER`); `link` (`SELECTOR_INNER`, verbatim); `toggle`: `.dropdown-toggle`; `menu`: `.dropdown-menu`. Derived: `SELECTOR_INNER_ELEM`, `SELECTOR_DATA_TOGGLE_ACTIVE` |
| ScrollSpy | class | `active`: `active`; `entry`: `dropdown-item` (`CLASS_NAME_DROPDOWN_ITEM`); `disabled`: `disabled` (`scrollspy.js:209`) |
| ScrollSpy | attribute | `target`: `data-bs-target`; `margin`: `data-bs-root-margin`; `threshold`: `data-bs-threshold`; `smooth`: `data-bs-smooth-scroll` (`Default`) |
| ScrollSpy | selector | `host`: `[data-bs-spy="scroll"]` (`SELECTOR_DATA_SPY`); `list`: `.nav, .list-group`; `link`: `.nav-link, .nav-item > .nav-link, .list-group-item` (`SELECTOR_LINK_ITEMS`); `dropdown`: `.dropdown`; `toggle`: `.dropdown-toggle`. Not members: `[href]` (platform); `NAV_LINKS`, `NAV_ITEMS` and `LIST_ITEMS`, which appear only inside `link` |
| Modal | class | `host`: `modal` (`enableDismissTrigger` builds `` `.${NAME}` ``); `shown`: `show`; `fade`: `fade`; `static`: `modal-static`; `open`: `modal-open`; `backdrop`: `modal-backdrop` (`util/backdrop.js` `Default.className`); `disabled`: `disabled` (dismiss trigger) |
| Modal | attribute | `target`: `data-bs-target`; `backdrop`: `data-bs-backdrop`; `escape`: `data-bs-keyboard`; `focus`: `data-bs-focus` |
| Modal | selector | `trigger`: `[data-bs-toggle="modal"]`; `dismiss`: `[data-bs-dismiss="modal"]`; `dialog`: `.modal-dialog`; `body`: `.modal-body`. Derived: `OPEN_SELECTOR` |
| Offcanvas | class | `host`: `offcanvas`; `shown`: `show`; `showing`: `showing`; `hiding`: `hiding`; `backdrop`: `offcanvas-backdrop`; `disabled`: `disabled` (`offcanvas.js:239`, dismiss trigger) |
| Offcanvas | attribute | `target`, `backdrop`, `escape` (`data-bs-keyboard`), `scroll` (`data-bs-scroll`) |
| Offcanvas | selector | `trigger`: `[data-bs-toggle="offcanvas"]`; `dismiss`: `[data-bs-dismiss="offcanvas"]`. Derived: `OPEN_SELECTOR` |
| Tooltip | class | `shown`: `show`; `fade`: `fade`; `auto`: `bs-tooltip-auto` (`tooltip.js:313`); `modal`: `modal` (`CLASS_NAME_MODAL`; `SELECTOR_MODAL` is derived) |
| Tooltip | attribute | `animated` (`data-bs-animation`), `delay`, `trigger`, `title`, `html`, `template`, `class` (`data-bs-custom-class`), `container`, `position` (`data-bs-placement`), `offset`, `fallbacks` (`data-bs-fallback-placements`), `selector`, `side` (`data-popper-placement`, `tooltip.js:432`) |
| Tooltip | selector | `title`: `.tooltip-inner` (`SELECTOR_TOOLTIP_INNER`) |
| Popover | class | The Tooltip keys, with `auto`: `bs-popover-auto` |
| Popover | attribute | The Tooltip keys plus `content`: `data-bs-content` (`Default.content`) |
| Popover | selector | `title`: `.popover-header` (`SELECTOR_TITLE`); `content`: `.popover-body` (`SELECTOR_CONTENT`) |
| Alert | class | `host`: `alert`; `shown`: `show`; `fade`: `fade`; `disabled`: `disabled` |
| Alert | attribute | `target`: `data-bs-target` (dismiss trigger) |
| Alert | selector | `dismiss`: `[data-bs-dismiss="alert"]` |
| Toast | class | `host`: `toast`; `shown`: `show`; `transition`: `showing` (`CLASS_NAME_SHOWING`); `fade`: `fade`; `disabled`: `disabled`. Excluded: `CLASS_NAME_HIDE` |
| Toast | attribute | `animated` (`data-bs-animation`), `autohide`, `delay`, `target` |
| Toast | selector | `dismiss`: `[data-bs-dismiss="toast"]` |
| Carousel | class | `host`: `carousel`; `active`: `active`; `slide`: `slide`; `start`: `carousel-item-start`; `end`: `carousel-item-end`; `next`: `carousel-item-next`; `previous`: `carousel-item-prev` |
| Carousel | attribute | `target` (`carousel.js:433`); `slide`: `data-bs-slide` (`:450`); `index`: `data-bs-slide-to` (`:442`, `:280`); `ride`, `interval` (also read per item, `:295`), `keyboard`, `pause`, `touch`, `wrap` |
| Carousel | selector | `entry`: `.carousel-item`; `image`: `.carousel-item img`; `indicators`: `.carousel-indicators`. Derived: `SELECTOR_ACTIVE`, `SELECTOR_ACTIVE_ITEM`, `SELECTOR_DATA_SLIDE`, `SELECTOR_DATA_RIDE` |
| Backdrop | class | `host`: `modal-backdrop`; `shown`: `show`; `fade`: `fade` (`util/backdrop.js`) |
| ScrollLock | class | `open`: `modal-open` |
| ScrollLock | selector | `fixed`: `.fixed-top, .fixed-bottom, .is-fixed, .sticky-top`; `sticky`: `.sticky-top` (`util/scrollbar.js`) |
| Placement | attribute | `popper`: `data-bs-popper`; `side`: `data-popper-placement` |
| Swipe | class | `pointer`: `pointer-event` (`util/swipe.js`) |

### Rulings

| # | Ruling | Rule that bounds it |
| --- | --- | --- |
| R1 | Seven entities get a `disabled` class. Neither lane listed it per entity. | § Question 1: every class token the entity tests. `isDisabled` tests `.disabled` in dropdown, tab, scrollspy, offcanvas and the dismiss triggers. |
| R2 | `target` added to Toast's and Carousel's attribute maps. Both lanes left it out. | Every attribute the entity reads: the dismiss and slide controls call `getElementFromSelector`. |
| R3 | `PopoverAttributeMap` declared, extending `TooltipAttributeMap` with `content`. The brief named only the class and selector maps. | Same rule: the popover reads `data-bs-content`. |
| R4 | The component name used as a class (`modal`, `offcanvas`, `alert`, `toast`, `carousel`) is a class key, not a selector key. The `.x.show` selectors derive from it. | Class rule: it is tested through `closest` and `classList`. |
| R5 | Tooltip `modal` and Tab `dropdown` are classes. Both lanes had them as selectors. | Bootstrap's own kind (`CLASS_NAME_MODAL`, `CLASS_DROPDOWN`). |
| R6 | Carousel's slide-control and ride selectors are derived. The planner had `control` and `host`. | Derived-selector rule: they are built from the entity's own attributes. |
| R7 | ScrollSpy's `[href]` selector is not a member. | Platform-name rule. |
| **R8** | **`SELECTOR_NAVBAR_NAV` (`.navbar-nav`) is excluded. Both lanes listed it. Its only use is Bootstrap's touch listener for iOS event delegation (`dropdown.js:145`).** | **E11's Chromium floor. Please confirm, or restore the key as `nav: '.navbar-nav'`.** |
| R9 | `item` is replaced by `entry` (Dropdown selector, ScrollSpy class, Carousel selector), and Tab's `SELECTOR_OUTER` becomes `wrapper`. | `names.md` § Rejected naming. |
| R10 | Dropdown's centre tokens are nested: `center: { down, up }`. `Partial` is shallow, so supplying `center` replaces both tokens, and `DropdownOptions.classes` says so. | `names.md`: group when one word is not enough. The planner's shape; the objective lane's flat `raised` and `centered` were declined. |
| R11 | Toast's `showing` key is `transition`, matching Collapse. Offcanvas keeps `showing` and `hiding`. | Keys name the fact: Offcanvas has two distinct facts, Toast has one. |
| R12 | Carousel's `data-bs-slide-to` key is `index`. The planner had `to`. | Deviation contract: the key's exact word. It matches the `index` getter and `slide(index)`. |
| R13 | The tip template's class tokens (`tooltip`, `tooltip-arrow`, `popover-header`, and the rest) are not class members. The slot selectors are. | The R12 amendment (`selectors.title`, `selectors.content`). |
| **R14** | **The brief conflicts with itself. E14's `@remarks` example names `show.bs.collapse`, but criterion 3 refuses any `.bs.`, `clickEvent` or `hidePrevented` in `types.ts`. I kept criterion 3: the remark says "Bootstrap's own wire name for the key", and the `clickEvent` and `hidePrevented` source mentions are left out of the TSDoc.** | The guide's departure record (R18, later units) carries those names. |
| R15 | Detail and event-map descriptions reworded: "Describes the detail each … event carries" and "Maps each … event to the verb that names it". Each Options description adds "markup vocabulary". | The events are Veneer's own, and the Options descriptions list their groups. |

### Acceptance commands

`npm run build:src:browser` exited 0 (ANSI codes stripped):

```text
npm notice run @orkestrel/veneer@0.0.1 build:src:browser
npm notice run vite build --config configs/src/vite.browser.config.ts
vite v8.3.0 building client environment for production...
transforming...
✓ 9 modules transformed.
rendering chunks...
computing gzip size...
dist/src/browser/index.js  10.52 kB │ gzip: 3.41 kB │ map: 17.13 kB

✓ built in 68ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
```

`npm run check:src:browser` exited 0:

```text
npm notice run @orkestrel/veneer@0.0.1 check:src:browser
npm notice run tsc --noEmit -p configs/src/tsconfig.browser.json
```

`npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts` exited 0 and printed only its `npm notice` lines.

`npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md` exited 0:

```text
Checking formatting...

All matched files use the correct format.
Finished in 4854ms on 2 files using 16 threads.
```

The criterion 3 grep exited 0 and returned only `HostSnapshot*` names:

```text
208:export type HostSnapshotCategory = 'attribute' | 'token' | 'property'
211:export interface HostSnapshotTarget {
213:	readonly category: HostSnapshotCategory
221:export interface HostSnapshotInterface {
233:	save(target: HostSnapshotTarget): void
```

`npm run test:guides` exited 0: `Test Files 1 passed (1)`, `Tests 19 passed (19)`. I also checked that this gate catches drift on the new rows. Changing the `TabEventMap` cell reddened it with `summary interface TabEventMap: guide "Maps every tab event…" source "Maps each tab event…"`, and the guide was restored byte-identical (`cmp` against the scratch copy).

`npm run test:policy` exited 0: `Tests 109 passed | 1 skipped (110)`. That is the same reading as `j-types-3-landing-gates.log.txt`.

**Observation.** `npm run test:src:browser -- tests/src/browser/index.test.ts` passed: `Test Files 1 passed (1)`, `Tests 2 passed (2)`. The export-set test is unmoved.

### Criterion 4 type probe

The probe is `j-types-probe-5.ts` (retained beside this report). It imports the worktree's `types.ts` by relative path. I ran the brief's `npx tsc --ignoreConfig …` flags from the worktree (TypeScript 6.0.3), and it exited 2.

The five refusals are exactly these diagnostics:

```text
j-types-probe-5.ts(16,2): error TS2322: Type '"show.bs.collapse"' is not assignable to type '"show.vn.collapse"'.
j-types-probe-5.ts(22,2): error TS2322: Type '"show.vn.modal"' is not assignable to type '"show.vn.collapse"'.
j-types-probe-5.ts(27,50): error TS2561: Object literal may only specify known properties, but 'sanitize' does not exist in type 'TooltipOptions'. Did you mean to write 'sanitizer'?
j-types-probe-5.ts(28,49): error TS2353: Object literal may only specify known properties, and 'toggle' does not exist in type 'CollapseOptions'.
j-types-probe-5.ts(29,51): error TS2353: Object literal may only specify known properties, and 'hidePrevented' does not exist in type 'EventHooks<ModalEventMap>'.
```

None of the acceptance values produced a diagnostic:

- the `.vn.` wire table
- `CollapseOptions` with `classes: { shown: 'is-open' }`
- `DelegateOptions` with `collapse: { classes: { shown: 'is-open' } }`
- `PopoverOptions` with `selectors: { content: '.tip-body' }`
- `TooltipOptions` with `sanitizer: { write() {} }`
- `ButtonOptions` with `signal`
- `ModalHooks` with `prevent`

### Unknowns

1. **Guide names.** No guide fence or § Examples sentence names a renamed or removed member. The remaining hits are outside my owned rows, so there is no stop:
   - `toggle` appears in ColorMode method prose.
   - `animation` appears in § Styles CSS-animation prose.
   - `.bs.` names, `toggle: true` and `data-bs-config` appear in the Compatibility `engine` and `btn` rows, which describe Bootstrap's own contracts. J-ROWS owns them under R15.
   - The only `Snapshot` hits were my owned rows and heading, now renamed.
2. **Popover overrides.** `PopoverOptions` overrides the inherited groups under `--exactOptionalPropertyTypes --strict` with no TS2430. `check:src:browser` and the probe both compile it, and the `content` selector acceptance passes. I declared the Popover maps by extending the Tooltip maps.
3. **Fleet names.** I swept every `export interface|type` name the diff adds against `node_modules/@orkestrel/scaffold/dist/host/guides/*.md` with a whole-word `grep -rlw`. None is claimed, and `test:policy`'s `surface` rule agrees.

### Carried to later units (not in my scope)

- **J-BINDER round 2:**
  - `Button.ts` does not yet honour `signal`, `classes` or `selectors`, and `Delegate.ts` ignores the per-entity groups. Both are type-only gaps and still compile.
  - The § Surface paragraph describing `emitEvent` as non-cancelable only, and the three `BUTTON_*` scalars, are unchanged.
- **J-TOOLTIP:** `NativeSanitizer` and `SANITIZER_ALLOWLIST` are named in prose only, without backticks, until they exist.

### Tree state

`git status --short`:

```text
 M guides/veneer.md
 M src/browser/types.ts
```

`git diff --stat`:

```text
 guides/veneer.md     | 127 +++++---
 src/browser/types.ts | 839 +++++++++++++++++++++++++++++++++++++++++++--------
 2 files changed, 793 insertions(+), 173 deletions(-)
```

`dist/src/browser/` from the build is ignored. Nothing is committed and nothing was installed; the only revert was my own planted cell, restored exactly. My scratch instruments (`j-types-probe-5.ts`, `surface-5.md`, `splice-surface.mjs`, the formatted scratch guide, and the build, guides and policy logs) are in the scratchpad directory named in the probe path.
