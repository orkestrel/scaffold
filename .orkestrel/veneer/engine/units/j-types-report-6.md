# J-TYPES round 6 — the unit's report (returned 2026-09-23 by `opus` on Opus 5.5, native subagent, 74 tool uses, 417 s; captured from the subagent's final message)

All of E19 to E28 are in place in `C:/Users/mikes/WebstormProjects/veneer-types`, and every acceptance command exits 0. One deviation needs your ruling: E24 fixes a `ScrollLockOptions` sentence that the verdict's B6 contradicts (see Deviation state).

## Report: J-TYPES round 6

### Edits

- **E19 (claim 4).** `ScrollSpySelectorMap.link` is renamed `parent`, with the TSDoc the brief fixes. `TooltipClassMap.auto` and `PopoverClassMap.auto` now read "Marks every tip whatever `placement.position` names, so the cascade places the arrow by the side the tip resolved to", each with its own default.
- **E20 (F1).** Each composite default now holds only its foreign part, and each TSDoc states the composition:
  - `DropdownSelectorMap.trigger` is `[data-bs-toggle="dropdown"]`, composed as `:is({trigger}):not(.{disabled}, :disabled)`.
  - `DropdownSelectorMap.entry` is `.dropdown-item`, composed as `:is({menu}) :is({entry}):not(.{disabled}, :disabled)`.
  - `TabSelectorMap.link` is `.nav-link, .list-group-item, [role="tab"]`, composed as `:is({link}):not({toggle})`, and as `:is({link}):not({toggle}), {trigger}` where Bootstrap reads `SELECTOR_INNER_ELEM`.
  - `ScrollLockSelectorMap.fixed` is `.fixed-top, .fixed-bottom, .is-fixed`, with the padding set `:is({fixed}, {sticky})`. The `sticky` TSDoc now states that sticky elements take both the padding and the margin compensation (`util/scrollbar.js:43-44`).
- **E21 (F2).** Every fixed-token sentence now uses token language:
  - the `shown` getters on Collapse, Dropdown, Modal, Offcanvas, Tooltip, Popover, and Toast;
  - `TabInterface.active` ("carries its active token");
  - `BackdropInterface.show` and `hide`, and `SwipeInterface.destroy`, with their guide § Methods cells;
  - `ButtonInterface.pressed` and `destroy`, with the guide `destroy` cell (see Rulings).
- **E22 (F3).** `TooltipOptions.selector` and `TooltipAttributeMap.selector` are renamed `descendants`, with the fixed TSDoc. The attribute default stays `data-bs-selector`. No other sentence named the option.
- **E23 (F4).** The pass-through is stated on the `BackdropClassMap` description and its `host`, `shown`, and `fade` leaves. It is also stated on `ModalClassMap` and `OffcanvasClassMap` `shown` and `backdrop`, and on `ModalClassMap.fade`. `OffcanvasClassMap.fade` is added after `backdrop`: "Marks the panel's backdrop, which always fades; the backdrop receives it as its `fade` token. Default: `fade`."
- **E24.** `ScrollLockClassMap` and `ScrollLockOptions.classes` are deleted, along with the guide row for `ScrollLockClassMap`. The `ScrollLockOptions` description uses the brief's sentence, and its guide Summary cell follows. `ScrollLockInterface.destroy` no longer mentions the open token. `ModalClassMap.open` uses the fixed TSDoc.
- **E25.** The `SanitizerConfig.dataAttributes` Default sentence is replaced verbatim.
- **E26 (bounds).**
  - B2: `CarouselSelectorMap.entry` uses the fixed TSDoc.
  - B3: `CarouselAttributeMap.slide` is renamed `step`, with the fixed TSDoc. `CarouselClassMap.slide` is unchanged.
  - B5: the `PopoverClassMap` description uses the fixed sentence.
  - B6: "markup vocabulary" is added to `BackdropOptions`, `PlacementOptions`, `SwipeOptions`, and `ColorModeOptions` (the last one verbatim).
  - B7: the `DropdownDetail` description uses the fixed sentence.
  - B8: all twelve event maps now read "Maps each verb to the {entity} event it names", or "Maps the verb to …" for Button and ScrollSpy. `EventHooks` and `EventWire` now start "Maps each verb of an entity's event map to …".
- **E27.** The two accounting rows follow in the mapping table's form. No guide table is owed.
- **E28.** Every changed description has its Summary cell updated, and the deleted row is removed. I formatted the guide as a scratch copy first. The formatter re-padded the whole § Surface table and the `ButtonInterface`, `BackdropInterface`, and `SwipeInterface` § Methods tables, because the Summary column widened (the longest cell is `BackdropClassMap`'s). Only table lines changed.

### E27 mapping rows

| Entity | Kind | Key: default (Bootstrap constant) |
| --- | --- | --- |
| Offcanvas | selector | Excluded: `[aria-modal][class*=show][class*=offcanvas-]` (`offcanvas.js:267`). Bootstrap sets `aria-modal` only in its own `show`, so every panel that query finds has a live owner. The engine's resize handler walks its live owners through the registry instead of querying the document. |
| ScrollLock | attribute | Excluded: `data-bs-overflow`, `data-bs-padding-right`, and `data-bs-margin-right` (`util/scrollbar.js:79`). They are scratch storage that `HostSnapshot` replaces. |

The round-5 table's rows change as follows:
- The Dropdown selector row now reads `trigger`: `[data-bs-toggle="dropdown"]` and `entry`: `.dropdown-item`, with the rest derived.
- In the Tab selector row, `link` is `.nav-link, .list-group-item, [role="tab"]`, and `SELECTOR_INNER` is derived.
- In the ScrollSpy selector row, `link` is now `parent`.
- In the Tooltip attribute row, `selector` is now `descendants`.
- In the Carousel attribute row, `slide` is now `step`.
- The ScrollLock class row is struck: `open` belongs to Modal.
- The ScrollLock selector row's `fixed` loses `.sticky-top`.
- The Offcanvas class row gains `fade`: `fade` (`offcanvas.js:182`, `isAnimated: true`).

### Rulings

| Ruling | Rule that bounds it |
| --- | --- |
| The Dropdown compositions use `:not(.{disabled}, :disabled)` instead of `:not(.{disabled}):not(:disabled)`. They match the same elements under the Chromium floor. Criterion 3's `:not(.disabled)` pattern is a basic regex whose `.` matches the `:` in `:not(:disabled)`, so the chained form fails the criterion. | Deviation contract: the brace form of a composition is mine to settle. |
| The Dropdown `entry` composition wraps the menu as `:is({menu})`. A menu override that is a selector list then stays one compound. | Same contract. |
| The Tab `SELECTOR_INNER_ELEM` composition is `:is({link}):not({toggle}), {trigger}`, not the brief's `:is({link}, {trigger})`. Bootstrap's `SELECTOR_INNER_ELEM` is `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`, and `SELECTOR_INNER` already excludes the toggle (`tab.js:47`, `:49`). The brief's form would admit a `.nav-link.dropdown-toggle`. | Same contract; each default equals its Bootstrap constant (claim 4). |
| `ButtonInterface.pressed` and `destroy` take token language ("Reads, on every access, whether the host carries its pressed token"; "…original pressed token membership…"). `ButtonClassMap.pressed` makes the `active` token replaceable. | E21's "every sentence that states a fixed token". |
| `EventHooks` and `EventWire` now start "Maps each verb of an entity's event map …". Their keys are verbs. | E26 B8, "where they carry the same direction". |
| The B6 sentences use the sibling list form: "the parent, fade, and markup vocabulary of the backdrop element …", "a placement's position, offset, fallbacks, static display, and markup vocabulary, …", and "a swipe's handler, threshold, and markup vocabulary". | E26 B6: wording beyond the fixed phrases is mine. |

### Acceptance output, verbatim (rollup exit code first)

```text
$ npm run build:src:browser
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
exit=0

$ npm run check:src:browser
npm notice run @orkestrel/veneer@0.0.1 check:src:browser
npm notice run tsc --noEmit -p configs/src/tsconfig.browser.json
exit=0

$ npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts
exit=0

$ npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md
Checking formatting...

All matched files use the correct format.
Finished in 4863ms on 2 files using 16 threads.
exit=0

$ grep -n (criterion 3, refusal set) src/browser/types.ts
exit=1

$ grep -n (criterion 3, renamed keys) src/browser/types.ts
602:	readonly parent: string
976:	readonly parent: string
1371:	readonly descendants: string
1427:	readonly descendants?: string
1906:	readonly step: string
exit=0

$ npm run test:guides
npm notice run @orkestrel/veneer@0.0.1 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types

···················

 Test Files  1 passed (1)
      Tests  19 passed (19)
   Start at  15:17:53
   Duration  955ms (transform 168ms, setup 60ms, import 700ms, tests 47ms, environment 0ms)

exit=0

$ npm run test:policy
npm notice run @orkestrel/veneer@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer-types

····································································································-·········

 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  15:17:55
   Duration  2.15s (transform 105ms, setup 60ms, import 244ms, tests 1.69s, environment 0ms)

exit=0
```

- The refusal-set grep exits 1, which means no hit.
- The renamed-keys grep returns the four keys the criterion names, at lines 976, 1906, 1427, and 1371. It also returns line 602, `CollapseAttributeMap.parent`, which existed before this round and is correct.
- ANSI colour codes are stripped from the `test:guides` block. The full log is `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/accept.log.txt`.
- The policy run's one skipped test also appears in round 5's `j-types-gates-5.log.txt`.

**Observation:** `npm run test:src:browser -- tests/src/browser/index.test.ts` passes 2 of 2 tests (exit 0). The index test is unmoved.

### Criterion 4 type probe

The probe is `scratchpad/j-types-probe-6.ts`. I ran it from the worktree with `npx tsc --ignoreConfig --noEmit --strict --exactOptionalPropertyTypes --lib ESNext,DOM --target ESNext --module preserve --moduleResolution bundler --allowImportingTsExtensions <probe>`.

**Before the edits (red):** the four acceptance lines failed and the four refusal lines compiled.
```text
j-types-probe-6.ts(18,64): error TS2353: Object literal may only specify known properties, and 'parent' does not exist in type 'Partial<ScrollSpySelectorMap>'.
j-types-probe-6.ts(19,54): error TS2353: Object literal may only specify known properties, and 'descendants' does not exist in type 'TooltipOptions'.
j-types-probe-6.ts(20,60): error TS2353: Object literal may only specify known properties, and 'fade' does not exist in type 'Partial<OffcanvasClassMap>'.
j-types-probe-6.ts(21,62): error TS2353: Object literal may only specify known properties, and 'step' does not exist in type 'Partial<CarouselAttributeMap>'.
probe exit=2
```

**After the edits (green):** each refusal line fails once, and the acceptance lines (18 to 21) produce no diagnostic.
```text
j-types-probe-6.ts(12,61): error TS2353: Object literal may only specify known properties, and 'link' does not exist in type 'Partial<ScrollSpySelectorMap>'.
j-types-probe-6.ts(13,50): error TS2561: Object literal may only specify known properties, but 'selector' does not exist in type 'TooltipOptions'. Did you mean to write 'selectors'?
j-types-probe-6.ts(14,56): error TS2353: Object literal may only specify known properties, and 'classes' does not exist in type 'ScrollLockOptions'.
j-types-probe-6.ts(15,62): error TS2353: Object literal may only specify known properties, and 'slide' does not exist in type 'Partial<CarouselAttributeMap>'.
exit=2
```

### Unknowns

1. **Guide references to the renamed members:** no guide fence or § Examples sentence names the tooltip `selector` option, the scrollspy `link` selector key, the carousel `slide` attribute key, or `ScrollLockClassMap`. The only hit was the owned `ScrollLockClassMap` § Surface row, which is removed. The pattern was `ScrollLockClassMap`, `` `selector` ``, `` `link` ``, `` `slide` ``, `selectors.`, `attributes.`, and `classes.` over `guides/veneer.md`. The other hits are unrelated:
   - the `slide` method cell and the `slide` class prose, which is `CarouselClassMap.slide`;
   - the CSS `link` component key at lines 3699 and later;
   - the ledger's `selector` Category cell.

   No `.ts` file outside `types.ts` references a renamed or deleted member.
2. **`PopoverClassMap` and the backdrop:** confirmed. `PopoverClassMap` extends `TooltipClassMap` (`shown`, `fade`, `auto`, `modal`) and redeclares only `auto`. None of its keys names a backdrop, and `modal` names the modal whose hide hides the tip.

### Status and diffstat

```text
 M guides/veneer.md
 M src/browser/types.ts
 guides/veneer.md     | 327 +++++++++++++++++++++++++--------------------------
 src/browser/types.ts | 134 ++++++++++-----------
 2 files changed, 227 insertions(+), 234 deletions(-)
```

### Deviation state

One sentence the brief fixes contradicts a verdict ruling, which the deviation contract says to stop on:
- **Expected:** the verdict's B6 puts "markup vocabulary" on every options description that has a group, and the subjective lane's B6 names `ScrollLockOptions` as already carrying it.
- **Found:** E24 fixes `ScrollLockOptions` as "Configures the document a scroll lock holds and the selectors it matches with." After E24, `ScrollLockOptions` still has `selectors`.
- **Done:** I wrote E24's sentence verbatim in `types.ts` and in the guide cell, and finished every other edit.
- **Not done:** the ruling between the two forms. If B6 wins, the one-line patch in both places is "Configures the document a scroll lock holds and the markup vocabulary it matches with."

### Findings outside the brief

1. **Attribute names stated as fixed:** several sentences state an attribute name that an attribute map makes replaceable. This is the same kind of defect as F2, but for attribute names rather than class tokens:
   - `PlacementInterface.update`, and its guide cell ("`data-popper-placement` attribute");
   - the `PlacementSide` description;
   - `PlacementOptions.static` and `DropdownOptions.placement.static` (`data-bs-popper="static"`);
   - the `PopoverOptions.content` default ("`data-bs-content` attribute").

   These have no carrier yet.
2. **Guide paragraph on Button:** the § Surface paragraph "A button's destruction restores the active membership …" (around guide line 173) is outside the owned rows and still states the fixed token.
3. **`Button.ts` ignores `classes`:** it writes `BUTTON_ACTIVE` directly. Both this and item 2 belong to J-BINDER round 2.
