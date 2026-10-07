# Elements addendum to the native catalog

Three elements factories serve concepts that pass the overlap test and that the catalog lacks: column sorting in the `createTable` factory, transfer between lists in the `createDrop` factory, and the dirty state in the `createForm` factory, on which an unsaved-changes guard builds. This addendum to `records/native/catalog-2026-10-07.md` answers your instruction of 2026-10-07: "Go with the recommended order, start with the copy button, also take a look at the elements repo for ideas as well, there were great ones that we took from there, the drag and drop would be high ROI." The shortlist order stands as you approved it, so Copier 1 opens first and Drag 1 follows; the additions and lessons that follow feed those units and the ones after them.

The elements repository at `/home/user/mikesaintsg/elements` is API guidance only. Veneer never copies its code: this addendum reads what capability each factory gives a page author and how its API feels, and states every idea as guidance for a module that Veneer builds from scratch under the separation rule (catalog:7). Of the 20 factories elements ships (`ls elements/src/browser/factories`, 2026-10-07), 15 are overlap, 1 passes whole (`createDrag`, the catalog's rank 2), 3 split into a passing part and an overlapping part, and 1 is a mechanism with no concept of its own. Each of the 20 composables adapts Vue refs and forwards to its factory, so a factory's verdict covers its composable.

Scout readings of every factory and composable fed this addendum. This round ruled every verdict again against the catalog's exclusion table (catalog:91-128), re-ran the scouts' two probe scripts, and took its own readings, which the section on readings lists. The following prefixes shorten paths and extend the catalog's list (catalog:11-16):

- `veneer/`, `bootstrap/`, `records/`, `scaffold/`, `elements/`, and `scratchpad/`: as in the catalog.
- `factories/`: `/home/user/mikesaintsg/elements/src/browser/factories`.
- `composables/`: `/home/user/mikesaintsg/elements/src/browser/composables`.
- `catalog:LINE`: a line of `records/native/catalog-2026-10-07.md`, where the `LINE` placeholder is the line number.
- Inside one module's lessons, a bare file name cites the file that the section's lead names in full.

## Overlap verdicts

The following table gives each factory with its composable, what it gives a page author, the verdict this round reached, and the catalog row it meets. A verdict is overlap, pass, split (one part passes and another overlaps), or mechanism (no user-facing concept of its own, which the catalog's infrastructure row places outside the test, catalog:74).

| Factory and composable | What a page author gets | Verdict | Catalog match |
| --- | --- | --- | --- |
| `createAlert` with `useAlert` | A dismissible alert with cancelable show and hide events and a `[data-alert-dismiss]` trigger | Overlap: Alert (`veneer/src/browser/Alert.ts:7`); by elements' own account the trigger replaces `.btn-close` (`elements/src/browser/constants.ts:620-623`) | No row; the preamble names close buttons and the families (catalog:5), and the `CloseWatcher` and `ariaNotify` rows name Alert (catalog:100, :123) |
| `createAside` with `useAside` | An `aside` drawer as a native popover with light dismiss and a slide in CSS | Overlap: Offcanvas (`veneer/src/browser/Offcanvas.ts:21`) | Excluded: the manual-popover offcanvas (catalog:102) and the `popover` attribute (catalog:97) |
| `createButton` with `useButton` | A pressed toggle mirrored between `.active` and `aria-pressed` | Overlap: the Button toggle (`veneer/src/browser/Button.ts:7`) | Excluded: the native pressed toggle (catalog:122) |
| `createCarousel` with `useCarousel` | A slideshow with autoplay, arrow keys, swipe, and Bootstrap's own `.carousel-item-next` and `.carousel-item-start` class names (`factories/createCarousel.ts:22-27`) | Overlap: Carousel (`veneer/src/browser/Carousel.ts:25`) | Excluded: the scroll-snap slideshow (catalog:106) |
| `createDetails` with `useDetails` | A `details` disclosure with cancelable events and accordion grouping | Overlap: Collapse and Accordion (`veneer/src/browser/Collapse.ts:22`) | Excluded: `details` with `name` groups (catalog:94) |
| `createDialog` with `useDialog` | A `dialog` with Escape and backdrop dismissal policies and a static backdrop | Overlap: Modal (`veneer/src/browser/Modal.ts:16`) | Excluded: bare `dialog` (catalog:93) |
| `createDrag` with `useDrag` | A list reordered by pointer drag, with handles, Escape to cancel, and click, Ctrl-click, and Shift-click multi-selection | Pass: Bootstrap has no reorder concept; `list-group` styles items, and its one `dragstart` listener blocks image drags in a carousel (`bootstrap/js/src/carousel.js:221`) | Shortlist rank 2 (catalog:25, :36); multi-selection waits in the held-back table |
| `createDrop` with `useDrop` | A drop zone with an `over` state that holds across nested children and a filter on `DataTransfer` types | Split: choosing files for an upload is the file input's concept, and dropping an in-page item from another list passes on the sortable list's ground | Excluded: the file drop zone, borderline (catalog:117); the transfer half has no unit (catalog:25), and Drag 2 in the additions takes it |
| `createFocus` with `useFocus` | A Tab trap with an initial focus and focus restore | Overlap: the Trap helper (`veneer/src/browser/Trap.ts:11`) | Excluded with bare `dialog`, which names Trap (catalog:93) |
| `createForm` with `useForm` | A form controller over constraint validation, with dirty and touched state | Split: validation feedback is overlap, because elements names its `data-form-validated` attribute the replacement for `.was-validated` (`elements/src/browser/constants.ts:636-639`); the dirty state renders nothing, and the unsaved-changes guard that builds on it passes, borderline | Excluded: form validation (catalog:96); the guard has no row, and Guard in the additions takes it |
| `createMenu` with `useMenu` | A `menu` dropdown with roving focus and a `select` event | Overlap: Dropdown (`veneer/src/browser/Dropdown.ts:24`) | Excluded: the `popover` attribute, anchor positioning, and `focusgroup` (catalog:97, :98, :121) |
| `createNav` with `useNav` | A scroll spy that writes `aria-current="location"` on the matching link | Overlap: Scrollspy (`veneer/src/browser/Scrollspy.ts:15`) | No row; the preamble names scrollspy (catalog:5) |
| `createPointer` with `usePointer` | Press, move, and release with pointer capture and a body cursor | Mechanism: its swipe consumer is the Swipe helper (`veneer/src/browser/Swipe.ts:6`), and its column-resize consumer is the split-pane concept, which passes | The infrastructure row (catalog:74); the longlist's split-pane resizing (catalog:78) |
| `createPopover` with `usePopover` | An anchored panel in the top layer with triggers and dismissal | Overlap: Popover with the Placement helper (`veneer/src/browser/Tip.ts:35`; `veneer/src/browser/Placement.ts:28`) | Excluded: catalog:97, :98 |
| `createSelect` with `useSelect` | A custom select and combobox on a `menu` listbox, mirrored into a native control | Overlap: `.form-select`, `.dropdown-menu`, and the datalist concept | Excluded: catalog:95, :115, :125 |
| `createTable` with `useTable` | A `table` controller: column sort, row selection, row expansion, column resize, cell navigation, page arithmetic, and a write API | Split: column sort passes (R5); column resize and cell navigation pass; expansion is Collapse (catalog:94), page navigation is `.pagination` (`bootstrap/scss/_pagination.scss:1`), and a highlighted row is `.table-active` (`bootstrap/scss/_tables.scss:129-131`) | No row for sort, which Sorter in the additions takes; column resize meets the split-pane row (catalog:78) |
| `createTabs` with `useTabs` | One tab wired to one panel, with `hidden` on inactive panels | Overlap: Tab (`veneer/src/browser/Tab.ts:16`) | No row; the preamble names tabs (catalog:5), and the `focusgroup` row names Tab (catalog:121) |
| `createTheme` with `useTheme` | A light, dark, or system setting with named palettes | Overlap: color modes (`veneer/src/bootstrap/_tokens.scss:40`) | Excluded: catalog:111, :112 |
| `createToast` with `useToast` | An autohiding status message with swipe dismissal and a stacked deck | Overlap: Toast (`veneer/src/browser/Toast.ts:8`) | Excluded: catalog:103, :128 |
| `createTooltip` with `useTooltip` | A hover and focus label as a manual popover | Overlap: Tooltip through `Tip` (`veneer/src/browser/Tip.ts:35`) | Excluded: catalog:97, :98 |

The scouts disagreed in four places, and this round ruled each one:

- `createPointer`: one reading ruled it a pass. It serves no person on its own, so it sits with the infrastructure row, and each consumer takes its own verdict.
- `createForm`: one reading ruled the whole factory overlap, and two split it. The dirty flag alone renders nothing, so it is infrastructure. The guard that warns before a person leaves a page with unsaved edits is a separate concept that no Bootstrap 5.3 component, helper, or utility carries: `beforeunload` appears in Bootstrap's scripts only in its list of native event names (`bootstrap/js/src/dom/event-handler.js:63`, R5). It stays borderline because the catalog ruled a message outside the page the toast concept (catalog:128), and the questions put it to you.
- `createDrop`: the file half stays excluded under the catalog's borderline row, and nothing in elements argues for a flip, because the factory's own comment names upload zones as its tag-gated use (`factories/createDrop.ts:6-11`).
- The carousel citation: one reading cited `bootstrap/js/src/carousel.js:45` and others `:221`. Line 45 declares the event name and line 221 binds the listener on each image, so the catalog's `:221` holds.

## Readings this round ran

The following table lists the readings behind the verdicts, the additions, and the lessons. Each browser run used headless Chromium 141.0.7390.37 (`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`) and 153.0.8010.12 (`/home/user/.wave/pw-153/chromium-1243/chrome-linux64/chrome`) through Playwright from `veneer/node_modules/playwright` on 2026-10-07, except R3's elements variant, which ran under 153 only. Where a run used both versions, both read the same.

| Reading | Fixture and steps | Result |
| --- | --- | --- |
| R1, reset timing | `scratchpad/elements-lane/reset.ts`: an `input` holding `beta` over a default of `alpha`, an `output` whose `defaultValue` is `readout-of-alpha` and whose `value` is `readout-of-beta`, and a `reset` listener that logs the input in the listener, in a queued microtask, and in a `setTimeout` task | A trusted click on the reset button logged `listener:beta`, `microtask:beta`, and `task:alpha`; a scripted `form.reset()` logged `listener:beta`, `microtask:alpha`, and `task:alpha`. Both paths ended with the `output` element at `readout-of-alpha` |
| R2, focus across a row move | `scratchpad/elements-lane/move.ts`: a focused button inside a table row, moved by `appendChild` and then by `moveBefore` | After `appendChild`, focus sat on `body`; after `moveBefore`, focus stayed on the button. The `moveBefore` method exists under both versions |
| R3, view-transition durations | An inline script with no saved file: one rule `::view-transition-group(*) { animation-duration: 2s }`, one element with `view-transition-name: card`, and a `document.startViewTransition` call that changes a paragraph; after `ready`, it reads `getComputedTiming().duration` for each animation that `document.getAnimations()` returns | Every `::view-transition-group`, `::view-transition-old`, and `::view-transition-new` animation, for `root` and for `card`, read 2000 ms. With elements' rule in its place, `animation-duration: 2s` on `::view-transition-old(root)` and `::view-transition-new(root)` alone, the two groups and both `card` images read 250 ms, and only the two `root` images read 2000 ms |
| R4, leave prompt | An inline script with no saved file: a document served at `http://guard.test/` through `context.route`, holding an `input` and a `beforeunload` listener that calls `preventDefault` while the input differs from its `defaultValue`; a real click and keystroke into the input, then `page.close({ runBeforeUnload: true })` | Playwright's `dialog` event fired with type `beforeunload`. The same fixture loaded with `page.setContent` produced no dialog. A control that changed the input through `page.evaluate` also produced the prompt, because Playwright evaluates with `userGesture: true` (`veneer/node_modules/playwright-core/lib/coreBundle.js:35607`), so R4 does not show the activation rule |
| R5, Bootstrap greps | `grep -rli sort bootstrap/js/src bootstrap/scss` and `grep -rn beforeunload bootstrap/js/src` | 0 files match `sort`; `beforeunload` matches only `bootstrap/js/src/dom/event-handler.js:63`, an entry in the list of native event names |
| R6, elements greps | `requestFullscreen`, `wakeLock`, and `RelativeTimeFormat` over `elements/src` and `elements/app`; `contenteditable=` over `factories/` and `elements/app`; `aria-live` and `role="status"` in `elements/app/browser/App.vue` | No match for any of them |

## Additions the catalog lacks

The following three additions pass the overlap test and appear nowhere in the catalog. Each one gives its module shape, first unit, cost, and the rank it would take under the catalog's criteria of consumer value, readiness under the 153 floor, and fit with the separation rule (catalog:20).

### Sortable table columns (`Sorter`)

Bootstrap 5.3 styles tables and ships no table behavior, and no file in its scripts or stylesheets matches `sort` (R5); that is the split the catalog draws between the sortable list and `list-group` (catalog:36). Elements carries the capability inside `createTable` (`factories/createTable.ts:763-811`, `:823-859`). The module takes the following shape:

- Module: folder `src/browser/sorters/`, entity `Sorter`, reached only by composing `createSorterPlugin`, named on the `Copier` pattern. The host is a `table` element that carries `data-vn-sorter` and holds one `tbody` element.
- Trigger: a `button type="button"` as the direct child of a `th` element in the table's `thead`, the markup of the WAI-ARIA Authoring Practices example (see [APG sortable table example](https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/)). The button gives the focus stop and Enter and Space activation, so the plugin routes `click` alone and resolves the table in its route's `hosts` function (`veneer/src/browser/types.ts:2042`).
- State: the sorted header carries `aria-sort` set to `ascending` or `descending`, and no other header carries the attribute, because WAI-ARIA has authors apply `aria-sort` to one header at a time (see [WAI-ARIA 1.2, aria-sort](https://www.w3.org/TR/wai-aria-1.2/#aria-sort)). The first press on a column sorts it ascending, and a press on the sorted column flips its direction.
- Keys and order: a cell's key is the `value` attribute of a `data` element it holds, then the `datetime` attribute of a `time` element, then its trimmed text, so a formatted cell such as $1,200.00 sorts by `<data value="1200">` with no Veneer attribute. Two keys that both parse as finite numbers compare as numbers; any other pair compares through `Intl.Collator` with `numeric: true` in the language of the closest `lang` attribute; ties keep their prior order. Rows move with `moveBefore`, which keeps focus in a moved row where `appendChild` drops it (R2).
- Refusal: a `tbody` that holds a cell with a `rowspan` attribute gets a coded refusal in core (`records/native-separation-verdict.md:52`), because a move would split the spanning row.
- Events on the host, in the `toggle.vn.button` form (`veneer/src/browser/constants.ts:47`): `sort.vn.sorter` (cancelable, before the rows move, with `detail.column`, the column's index, and `detail.direction`) and `change.vn.sorter` (after the move, with the same detail). Prevention leaves the rows and every `aria-sort` value unchanged, which serves a server-paged table that fetches sorted rows itself. A polite live region reports the column and the direction, as Drag 1 and Filter 1 report theirs (catalog:36, :40).
- Styles: one fence rule draws the direction mark on `th[aria-sort] > button`.
- Support: `move-before` Chrome 133, not Baseline; `data` Baseline high since 2020-04-24; `Intl.Collator` sits in `intl`, Baseline high since 2020-03-28 (see [web-features 3.40.1](https://unpkg.com/web-features/data.json), read 2026-10-07, local copy `scratchpad/wf/data.json`).
- First unit: Sorter 1, the module, its tests, and a Native group specimen built from the carriers data in the showcase's tables section (`veneer/app/browser/sections/tables.html:46-76`), sorting by Trucks and by On time. The specimen copies the data so that the Bootstrap table specimen keeps its Bootstrap-only markup. The proof presses a header button by keyboard, reads the row order and `aria-sort`, reads that the button keeps focus across the move, and reads that a prevented `sort.vn.sorter` changes nothing. Sorter 1 sorts one column at a time, with no unsorted third state, no multiple-column sort, and no remote mode.
- Cost: small.
- Rank: fifth, between Filter 1 and Output 1. It matches both on cost, its specimen reuses data the showcase already holds, and a sortable column serves a larger everyday need than a range readout. It follows Drag 1, so it takes the `moveBefore` move and the polite live region after Drag 1 has proved them.

### Transfer between lists (Drag 2)

Moving an item from one list into another has no Bootstrap counterpart, for the reason the sortable list passes (catalog:36). The catalog's rank 2 puts cross-list transfer outside Drag 1 and plans no later unit for it (catalog:25); elements pairs `createDrop` with a `createDrag` source for it (`elements/app/browser/pages/UseDragDropPage.vue:158-175`). The unit takes the following shape:

- Module: Drag 2, a later unit of `drags/`, never a separate `drops/` module, because a drop zone with no drag source in the page is the excluded file-drop concept (catalog:117).
- Markup: `data-vn-drag` hosts whose attribute values match form a group and exchange items; the value is a group name the page chooses. A host with an empty value accepts only its own items, so Drag 1 markup stays valid unchanged.
- Behavior: the plugin records the dragged item and its source host at `dragstart`, calls `preventDefault` on `dragover` only for a recorded item whose source host shares the target host's value, and moves the item with `moveBefore` at `drop`. Alt+ArrowLeft and Alt+ArrowRight move the focused item to the end of the previous or the next host of its group in document order; the unit confirms that key choice before it opens.
- Events: the target host receives the cancelable `move.vn.drag` with `detail.from`, `detail.to`, and `detail.source`, the host the item left, and both hosts receive `end.vn.drag`.
- Styles: the Drag 1 fence's indicator, plus one rule for an empty target host, which holds no item to hit-test against.
- First unit: Drag 2, after Drag 1 lands, on a two-column Native group specimen, with a refusal proof that neither a file drag nor an item from a host of another group is accepted.
- Cost: medium.
- Rank: none of its own; it is the second unit of rank 2, and the questions ask when it opens.

### Unsaved-changes guard (`Guard`)

A guard keeps a person from losing edits: it arms the browser's own leave-page prompt while a form differs from its defaults. No Bootstrap 5.3 component, helper, or utility carries that concept, and a Bootstrap Modal cannot serve it, because no page content can intercept a tab close or a reload. It stays borderline on the catalog's notifications precedent (catalog:128). Elements carries the edge a guard needs: `createForm` fires `dirty` on the first pristine-to-dirty edge only, and its comment names unsaved-changes guards as the consumer (`factories/createForm.ts:112-121`). The module takes the following shape:

- Module: folder `src/browser/guards/`, entity `Guard`, host `form[data-vn-guard]`. The plugin boots every host through the boot entry (`veneer/src/browser/types.ts:2047-2053`) and routes `input`, `change`, `submit`, and `reset`.
- Derived state: a form is dirty while a control's `value` differs from its `defaultValue`, its `checked` from its `defaultChecked`, or an option's `selected` from its `defaultSelected`, so typing a value back clears it, under the law on derived state (`scaffold/AGENTS.md:58`). Elements stores a flag that only its own `reset` or `clear` lowers (`factories/createForm.ts:112-126`, `:334`).
- Behavior: while the form is dirty, the class holds one `beforeunload` listener on the window that calls `preventDefault`, and it removes the listener when the form turns clean, submits, resets, or disconnects. A `reset` disarms the guard directly; the class never re-derives inside the `reset` listener, because a reset-button click reverts the controls after that listener and after its microtasks (R1).
- Events: the host receives `change.vn.guard` after each transition, with `detail.dirty`. No CSS.
- Support: `beforeunload` Chrome 1, not Baseline, and web-features lists `api.Window.beforeunload_event.preventdefault_activation` under it (see [web-features 3.40.1](https://unpkg.com/web-features/data.json), read 2026-10-07); the Chromium-only target sets the status aside, as it does for Fullscreen (catalog:26). R4 read the prompt after a real keystroke on a served document.
- First unit: Guard 1, the module, its tests, and a Native group specimen where an edit arms the prompt and a restore, a submit, or a reset disarms it. The proof is a journey case on a served document, because R4 found no prompt on a `setContent` document; it types a real keystroke and closes the page with `runBeforeUnload`.
- Cost: small.
- Rank: tenth, after Time 1. Like Wake 1 it has a reading and no natural showcase consumer (catalog:48), and it ranks after Time 1 because its overlap verdict is borderline where the nine ranked modules' verdicts are not.

## Passing capabilities held back

The following capabilities pass the overlap test, and this round proposes no unit for them.

| Capability | Elements source | Why it waits |
| --- | --- | --- |
| Multi-selection of list items or table rows by click, Ctrl-click, and Shift-click | `factories/createDrag.ts:275-308`; `elements/src/browser/types.ts:2437-2451` | A selection serves an action the application defines (`scaffold/AGENTS.md:67`), so it needs a consumer that acts on the selected items; elements repeats the model in two factories, and a unit gives it one home |
| Multi-item drag | `factories/createDrag.ts:211-232` | It needs the selection model first; the insert-point arithmetic (`:221-222`) is the part to take |
| Keyboard cell navigation in a table | `factories/createTable.ts:1289-1316` | The `grid` role turns the table into an interactive widget, so it waits for a consumer that edits cells |
| Column resizing | `factories/createTable.ts:1205-1240` | The catalog's split-pane row holds it (catalog:78); elements' grip is a bare `div` with no role, no tab stop, and no key handler (`:1209-1211`), which confirms that row's keyboard gap |
| Multiple-column sort | `factories/createTable.ts:823-859` | It writes `aria-sort` on more than one header, against the WAI-ARIA rule that Sorter cites |

## Lessons for the shortlisted modules

Each lesson names the elements source behind it and states an idea for a module that Veneer builds from scratch; none asks for elements code. Where elements has no precedent for a module, the lessons say so and carry over only a pattern from another factory.

### Copier 1, the clipboard copy button

Elements' one copy button sits in its examples shell (`elements/app/browser/examples/ExamplesShell.vue`): it writes the displayed source with `navigator.clipboard.writeText`, swaps its label and icon to Copied for 1500 ms, and drops a rejection (`ExamplesShell.vue:152-166`, `:313-320`). The following ideas carry into Copier 1:

- Copy the text the person sees. Elements rewrites the imports before render and copies the same string its `code` element shows (`ExamplesShell.vue:145-149`, `:157`, `:330`). The Tailwind recipe's `pre` element holds its text as written (`veneer/app/browser/sections/tailwindcss.html:31-38`), so the host's text is the copy. Copier 1 needs no override attribute, and `detail.text` on `copy.vn.copier` reports the text without a way to replace it; a page that transforms its text does so before render.
- Report every rejection. Elements catches a rejected write and leaves its label at Copy (`ExamplesShell.vue:163-165`), so a refused permission looks like a button that did nothing. Copier 1 reports a rejection as `result.vn.copier` with `detail.error` (catalog:34), and its proof covers a refusal beside a write.
- Keep the feedback and its timer in the page. The Copied label, its 1500 ms timer, and the timer's restart on a repeated click (`ExamplesShell.vue:153-162`) are page decisions; Copier 1 holds no timer and writes no feedback text, and the specimen's `result.vn.copier` listener owns the confirmation.
- Announce through a live region. Elements reports success only by changing the button's visible label (`ExamplesShell.vue:313-320`), with no live region. The specimen can write its confirmation into an `output` element, whose implicit `status` role is a polite live region (`elements/src/styles/elements/_output.scss:15-16`).
- Veto before the act. Dispatch `copy.vn.copier` before the write and skip the write on prevention, the order that `createDetails` keeps for a native `summary` click (`factories/createDetails.ts:111-125`).
- Take the test layout, not the teardown harness. Elements' statechart table, one row per transition with arrange, act, and assert steps (`elements/tests/src/browser/factories/createButton.test.ts:65-184`), suits Copier's two outcomes. Its teardown check patches `EventTarget.prototype` (`elements/tests/setupBrowser.ts:236-261`), which `scaffold/AGENTS.md:42` refuses; Veneer ties every listener to the scope's signal (`veneer/src/browser/Veneer.ts:66-73`).

### Drag 1, the sortable list

You named drag and drop the high-return unit, and elements holds the most prior art for it: `createDrag` (`factories/createDrag.ts`), its stylesheet (`elements/src/styles/composables/_drag.scss`), its demo page (`elements/app/browser/pages/UseDragDropPage.vue`), and a board example (`elements/app/browser/examples/BoardExample.vue`). The following ideas carry over:

- Insertion side: choose `before` or `after` by the pointer's position against the item's midpoint on the list's axis (`createDrag.ts:78-87`). Drag 1 leaves out `into` (`elements/src/browser/types.ts:1013`), which serves nesting.
- Flicker: clear the indicator on `dragleave` only when `relatedTarget` leaves the host, because the platform fires `dragleave` at every child boundary (`createDrag.ts:369-376`; `factories/createDrop.ts:62-71`). Elements' test dispatches a synthetic `dragleave` with no `relatedTarget` (`elements/tests/src/browser/factories/createDrop.test.ts:75-77`), so the nested-child case is unproven there; Drag 1's proof drags across a nested child.
- Handle: the author writes `draggable="true"` on a handle inside the item, and the module never writes or clears the `draggable` attribute, which elements does on every sync and on teardown (`createDrag.ts:115-132`, `:469-477`). With a handle, set the drag image to the whole item at the grab offset (`createDrag.ts:92-100`, `:175`), because the default drag image is the draggable element, the handle alone.
- Move detail: `detail.from` is the item's index before the move, and `detail.to` is its index after the move, counted after the item leaves its slot, as elements computes its insert point (`createDrag.ts:213-222`). State that convention in the guide, so a listener that splices its own array with the two numbers matches the DOM.
- Effects: set `effectAllowed` and `dropEffect` to `move` in the module; elements leaves both to options with no default (`createDrag.ts:54-55`).
- Cancellation: Escape ends a drag, and the end event carries a cancelled flag (`createDrag.ts:147-150`). Read cancellation from `dragend`: elements reports `cancelled: true` for every drop it did not handle itself (`createDrag.ts:348-352`), so a drop on another target reads as cancelled. Its document `keydown` handler for Escape (`createDrag.ts:407-413`) might never run during a native drag session, which handles Escape itself; Drag 1 owes that reading.

The factory also leaves gaps that Drag 1 closes:

- Keyboard: Escape is the only key `createDrag` handles (`createDrag.ts:407-413`), and its stylesheet header claims keyboard selection that the factory never implements (`_drag.scss:4-5`). Drag 1's Alt+ArrowUp and Alt+ArrowDown move, the retained focus, and the live region have no precedent here. Stop the move at the list's ends: elements' `rove` helper wraps around (`elements/src/browser/helpers.ts:2266-2277`), which suits moving focus and not reordering.
- Identity from DOM order: elements reads an authored `data-index` attribute (`elements/src/browser/helpers.ts:1767-1792`) and reorders by splicing the author's array for a framework to render (`createDrag.ts:211-232`); with no `list` option the factory is no drop target, and nothing reorders (`createDrag.ts:56-57`). Drag 1 moves nodes with `moveBefore`, and an item's position is its place among the host's children (R2).
- Foreign drags: elements calls `preventDefault` on every `dragenter` and `dragover` (`createDrag.ts:354-367`), so an operating-system file or text from another page becomes a valid drop. Drag 1 accepts only a drag that started in the same host, keeps that record in the plugin, and writes no `text/plain` payload; elements writes the start index as `text/plain` (`createDrag.ts:173`), which any text field on the page accepts as a drop.
- Interactive descendants: refuse a `dragstart` from an `input`, `textarea`, `select`, or `contenteditable` descendant, which elements leaves to an author-written `.no-drag` class (`createDrag.ts:257`, `:328`); elements' table and toast factories show the same refusal list for a click and a swipe (`elements/src/browser/types.ts:2445-2447`; `factories/createToast.ts:346-352`).
- Event cadence: write the indicator and emit only when the target or the side changes. Elements emits `over` and re-syncs every row on each `dragover` (`createDrag.ts:184-209`, `:361-367`), which the platform repeats while the pointer rests.
- Real details: elements fills its `pointer` fields with `PointerEvent` objects built with no coordinates (`createDrag.ts:178`, `:203`, `:241`). Drag 1's details carry real values or leave the field out.
- Cancelable events: elements dispatches every drag event through its non-cancelable `emit` helper (`elements/src/browser/helpers.ts:1530-1532`), so no listener can veto a reorder, and an app that renders from data has to hand its array to the factory (`elements/src/browser/types.ts:1872-1875`). Drag 1's cancelable `move.vn.drag` serves that app with no data option: the app prevents the move and renders from its own data.
- Declared events: derive the listener table from the event map. Elements binds `tap`, `start`, `over`, `drop`, `end`, and `reorder` by hand (`createDrag.ts:429-434`) and never the declared `select` and `clear` (`elements/src/browser/types.ts:1864-1868`), although its `bindEventMap` helper exists (`elements/src/browser/helpers.ts:1558-1570`). Give each method one name: elements returns `select` and `tap` as the same function (`createDrag.ts:488-489`).
- Idle listeners: elements attaches document `keydown`, `mouseup`, and `pointerdown` listeners for every instance, even while idle (`createDrag.ts:447-449`). A Veneer scope adds one capture listener per routed event name under its signal (`veneer/src/browser/Veneer.ts:66-73`).
- State styling: write one state attribute on the target item whose value names the side, in place of six classes kept in step by a second pass in a microtask (`elements/src/browser/constants.ts:627-634`; `createDrag.ts:102-139`). Scope the grab cursor and the source dimming (`_drag.scss:50-69`) under the host attribute, because elements paints `cursor: grab` on every `[draggable='true']` element in the page (`_drag.scss:50-52`), and take the target tint and the insertion line (`_drag.scss:76-102`) from Bootstrap's color tokens.
- Touch: the factory has no touch path. If Drag 1's Android reading (catalog:36) finds that a touch press starts no native drag, a private fallback can take the shape of the `createPointer` factory: capture on press, `pointercancel` handled as an end, and a veto for presses outside the handle (`factories/createPointer.ts:60-93`), with `touch-action: none` on the handle only, so the list still scrolls.

The proof carries two lessons. Elements' tests cover the selection machine, `draggable` marking, and teardown (`elements/tests/src/browser/factories/createDrag.test.ts:29-81`) and record that the drag machine resists synthetic dispatch (`createDrag.test.ts:83-92`). Its handle demo marks the grip `showcase-drag-handle` (`UseDragDropPage.vue:294`) while the factory matches only `.drag-handle` (`createDrag.ts:125`, `:258`), so that demo's rows drag from anywhere, and no test caught it. Drag 1 proves its pointer path with a real drag through the harness, as the catalog's probe did (catalog:25), and proves a handle by a grab outside it that starts no drag.

Leave multi-selection, multi-item drags, and transfer between lists to later units. Elements' board needs a module-level `pending` variable and a `setTimeout` clear to move cards between columns (`BoardExample.vue:143-178`), which shows that its factory carries no transfer identity; Drag 2 in the additions gives that identity a home.

### Fullscreen 1

Elements has no fullscreen surface (R6). The following patterns from other factories apply:

- One emission path: emit `change.vn.fullscreen` only from the document's `fullscreenchange` event, so the button and an Escape exit share it (catalog:38). `createAside` emits from its own calls and from the platform's `beforetoggle` and `toggle` events and needs two suppression counters to drop the duplicates (`factories/createAside.ts:73-126`); `createDialog` needs a flag for the same reason (`factories/createDialog.ts:84-88`, `:117-129`).
- Seeded pressed state: write `aria-pressed` at boot on every trigger that names a host, so assistive technology reads a toggle before the first press (`factories/createButton.ts:28-30`). On teardown, restore the author's prior value or remove the attribute, as `createPopover` does for the ARIA attributes it writes (`factories/createPopover.ts:283-290`, `:340-349`). Keep that mirror inside the module, never through the engine's Button, which owns `.active` (catalog:122).
- No transition wait: take state from the platform event and leave motion to the fence. Elements' guide records a `transitionend` wait in `createAside` that cost about 400 ms per close, against about 73 ms after its removal (`elements/guides/composables.md:389`; `createAside.ts:40-42`).

### Filter 1

Elements filters in two places: its select combobox (`factories/createSelect.ts`) and its showcase sidebar, a `search` element around an `input type="search"` (`elements/app/browser/App.vue:448-459`). The following ideas carry over:

- Matching: both trim the query, lowercase both sides, and test substring inclusion (`createSelect.ts:156-166`; `App.vue:52-61`), the rule Filter 1 takes (catalog:40). Lowercasing keeps diacritics, so `cafe` misses `café`; Filter 1 decides whether to fold marks and tests the case it picks.
- Composition: skip a pass while an input method composes and run one on `compositionend` (`createSelect.ts:296-318`), or a Chinese, Japanese, or Korean query rebuilds the list mid-word. Elements' comment states that Chromium fires no `input` after `compositionend` (`createSelect.ts:312-316`); no reading here covers that claim, so Filter 1 routes `compositionend` and owes the reading.
- Groups: the sidebar drops a group whose entries all miss (`App.vue:72-77`). Veneer's Contents panel, Filter 1's first consumer, builds one list per group under a heading paragraph (`veneer/app/browser/factories.ts:657-680`), so a rule over one container's direct children either leaves empty headings or filters one group; the questions put the grouping rule to you.
- Hiding: elements' select marks a miss with a `data-hidden` attribute (`createSelect.ts:160-165`) that hides nothing without its own stylesheet rule (`elements/guides/composables.md:408`). Keep the catalog's native `hidden` attribute, which Bootstrap's reboot enforces (catalog:40).
- Report: the sidebar announces nothing and holds no live region (R6). Filter 1's count report has no precedent and needs its own proof.
- Shortcut: the sidebar's slash shortcut that focuses the field (`App.vue:157-167`) is page policy and stays out of Filter 1.

### Output 1

Elements has no readout module; it styles a bare `output` element (`elements/src/styles/elements/_output.scss`). The following ideas carry over:

- Reset: R1 changes Output 1's shape. `createForm` re-reads its snapshot in a microtask queued from its `reset` listener (`factories/createForm.ts:326-338`); on a trusted click on a reset button that microtask reads the value from before the reset, and only a scripted `form.reset()` reads the restored one (R1). The same reading shows that the platform's reset restores `output.defaultValue` on both paths. Output 1 can write `defaultValue` at boot as the readout of the control's `defaultValue`, then `value` as the readout of the control's `value`, and drop its `reset` route (catalog:42), because the platform then resets the control and the readout together; the questions put that change to you.
- Text only: elements moved its toast off `output` because a toast renders flow content that the `output` element's phrasing-only content model forbids (`factories/createToast.ts:28-34`). Output 1 writes text through `value` and never markup.
- Live region: the `output` element's implicit `status` role is a polite live region (`createToast.ts:31-33`; `_output.scss:15-16`), and Output 1 keeps it (catalog:42).
- Chrome: elements draws a bare `output` as a tinted chip (`_output.scss:19-21`, `:26-40`), a styles-face idea for chunk 3; Output 1 has no CSS (catalog:28).

### Transition 1 and Transition 2

Elements holds a view-transition stylesheet (`elements/src/styles/surfaces/_view-transition.scss`) and one same-document call (`elements/app/browser/pages/ScrollAndTransitionPage.vue`). The following ideas carry over:

- Duration on every group: keep the catalog's duration on `::view-transition-group(*)` (catalog:44). Elements sets `animation-duration` on `::view-transition-old(root)` and `::view-transition-new(root)` only (`_view-transition.scss:57-61`), and R3 read that this rule leaves the root group, every named group, and every named image at 250 ms, while one rule on `::view-transition-group(*)` reached every animation.
- Reduced motion: keep the catalog's `@view-transition` rule inside `prefers-reduced-motion: no-preference`, so no transition starts. Elements runs the transition at 1 ms under reduced motion (`_view-transition.scss:63-71`), on a claim that a disabled animation leaves the snapshot suspended in some engines (`_view-transition.scss:40-46`); no reading here covers that claim, and the case does not arise when no transition starts.
- Fallback: elements feature-detects `document.startViewTransition` and runs the update directly when the method is absent (`ScrollAndTransitionPage.vue:63-70`). It has no reduced-motion skip and no hidden-document skip, and those two skips are what Transition 2 owns under the wrapper law (catalog:44).

### Editor 1

Elements has no inline editing; no factory or app page sets `contenteditable` (R6). The following patterns apply:

- Composition: Editor 1 skips Enter and Escape while `isComposing` (catalog:46); elements' select comment describes the thrash that intermediate composition events cause when a handler acts on each one (`factories/createSelect.ts:296-305`).
- Page shortcuts: elements' slash shortcut checks `input:focus, textarea:focus` only (`elements/app/browser/App.vue:163`), so on such a page a slash typed into a `contenteditable` host moves focus away. Editor 1's guide section names that trap: a page shortcut skips a target whose `isContentEditable` property is true.
- Form participation: elements forwards the form's `formdata` event (`factories/createForm.ts:310-314`). A later Editor unit inside a form can append its text to the entry list in that event, in place of a mirror into a hidden input.

### Wake 1

Elements has no wake lock (R6). The following patterns apply:

- Teardown: decide per module whether teardown reverses state. `createDetails` leaves its disclosure open (`factories/createDetails.ts:149-150`), and `createDialog` closes its dialog (`factories/createDialog.ts:179-183`). Wake 1 releases its lock, because a held lock outlives the region it serves.
- One emission path: emit `release.vn.wake` from the sentinel's `release` event, which also fires when the platform releases a lock on a hidden document; `createDialog` bridges every outside close into one `close` emission the same way (`createDialog.ts:117-129`).
- One shared listener: keep one `visibilitychange` listener per scope for every host, as elements keeps one `matchMedia` listener for the page (`elements/src/browser/theme.ts:142-153`).
- Pressed state: seed and restore `aria-pressed` as the Fullscreen 1 lessons state (`factories/createButton.ts:28-30`, `:52-53`).

### Time 1

Elements formats no relative time (R6) and styles the `time` element only. The following ideas apply:

- One shared refresh: run one timer and one `visibilitychange` listener per scope for every `time` host, on the shared-listener pattern of `elements/src/browser/theme.ts:142-153`.
- Visible hosts: a later unit can refresh only hosts that intersect the viewport, with an `IntersectionObserver` whose root follows the scroll container the way elements' scroll spy chooses it (`factories/createNav.ts:55-58`); Time 1 keeps the catalog's connected-and-visible rule (catalog:50).
- Tabular numerals: elements gives `time` tabular numerals so that a column of times does not jitter (`elements/src/styles/elements/_time.scss:19-24`), a styles-face idea for chunk 3; Time 1 has no CSS (catalog:32).
- Proof: elements' scroll-spy tests cover rejection, `refresh`, and teardown and never drive an activation (`elements/tests/src/browser/factories/createNav.test.ts:6-32`). Time 1's proof reads the text after a real refresh, with no fake clock (`scaffold/AGENTS.md:42`).

## Questions for you

The following questions close the addendum in the order the units open, each with one recommendation.

**Does Copier 1 announce its result?** Keep the announcement out of the module: Copier 1 reports through `result.vn.copier`, and the specimen's listener writes the confirmation into an `output` element beside the button. The wording and its timing are page decisions, as elements' 1500 ms label swap shows (`elements/app/browser/examples/ExamplesShell.vue:152-162`), and the `output` element's implicit `status` role announces the text with no module code.

**When does Drag 2 open?** Open Drag 2 directly after Drag 1 lands. It reuses Drag 1's indicator, events, and proofs while they are fresh, and a board that moves cards between columns is the drag and drop that you named high in return on investment.

**How does Filter 1 treat groups?** Rule one level of grouping into Filter 1: a direct child of the controlled container that holds a list is a group, the items of that list are the filter's items, and the group takes the `hidden` attribute when none of them matches. The Contents panel is grouped (`veneer/app/browser/factories.ts:657-680`), elements' sidebar drops an empty group for the same reason (`elements/app/browser/App.vue:72-77`), and the rule keeps Filter 1 small.

**Does Sorter join the shortlist, and where?** Insert Sorter at rank 5, after Filter 1 and before Output 1. Ranks 1 to 4 keep the order you approved, and Sorter 1 opens after Drag 1 has proved the `moveBefore` move and the polite live region that Sorter reuses.

**Does Output 1 keep its `reset` route?** Drop the route: Output 1 writes `defaultValue` as the readout of the control's `defaultValue` at boot and then `value`, and the platform's reset restores both (R1). A route reads the control before it reverts on a reset-button click, which is the stale read R1 shows in elements' microtask.

**Does the unsaved-changes guard pass?** Rule it a pass and add Guard at rank 10, after Time 1. No Bootstrap 5.3 component, helper, or utility protects unsaved edits, and the prompt is the browser's own, which no Modal can raise on a tab close; the catalog's notifications precedent covers telling a person about an event (catalog:128), which the guard does not do.
