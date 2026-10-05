# Elements clone addendum to the stage B records (2026-10-05)

This addendum records what the live clone of `mikesaintsg/elements` adds to the stage B records. Those records are the browser-elements, elements-engine, elements-styles, native-inventory, and native-research distillates, the stage B verdict, and the remainder map. The clone is evidence. It changes no ruling until the Orchestrator or the user rules.

The following roots apply to every citation in this file:

- `elements:` is `/home/user/mikesaintsg/elements` at commit `3b41900` (2026-06-09).
- `veneer:` is `/home/user/veneer` at commit `07694f8`, read on 2026-10-05.
- `verdict:` is `stage-b-final-verdict.md`, and `map:` is `remainder-map-2026-10-04.md`. Every other bare file name is a record in `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/stage-b/`.
- `scaffold:` is `/home/user/.wave/scaffold-main-wt`.
- `sbm`, `chk`, `cdx`, `feas`, and `dv` are the verdict's own short citations, quoted the way the verdict uses them.

Four reading groups reached this addendum complete: the dialog engine, the dialog and backdrop styles, the popover engine, and the popover and anchor styles. The fifth group, covering the drawer, the toast, and the top layer, was cut off after its fourth fact. A direct read of the clone finishes that group. The same read supplies every entry for B4, the gutter half of B3, and G2 to G5. No test, build, or browser ran for this addendum. A fact marked "derived" comes from reading CSS declarations, and a fact marked "inferred" comes from reading code.

## Summary

The distillate citations that the readings checked resolve against the clone, except one off-by-one line number in the dialog host gate. The clone's spec cards also supply text the distillates left unread: dialog light dismiss, the close and command steps, the exits that fire no event, and the ancestor revealing algorithm. Checked against those cards, four of the clone's claims fail: a native modal Tab trap, a native modal scroll lock, a backdrop `@starting-style`, and a 48rem `.large` dialog. That produces 19 correction rows for the distillates. The factories confirm the verdict's mechanisms by showing what goes wrong without them:

- neither the dialog factory nor the float factories listen for a page's `beforetoggle`;
- none rolls back a cancelled or thrown native open;
- every float instance cancels Escape from its own document handler;
- the dialog statechart drives its native close with a synthetic event.

Eight facts contradict a verdict or map line. Three of those need a ruling: how far the `@starting-style` refusal reaches against I-1, the D-10 floor against the `position-visibility` refusal, and the user's own Elements mapping of responsive offcanvas to popover drawers against rulings 5 and 11. For chunk 3, the clone shows that each bare-surface family must pair its platform signal with a `:not()` of the Bootstrap class it would otherwise restyle. The clone supplies no measured value for any scrim, gutter, or geometry.

## Corrections to the distillates

The following table lists each distillate line the clone corrects. Each correction changes the records only, not any ruling.

| # | Distillate line | What it says | What the clone says | Citation |
| --- | --- | --- | --- | --- |
| 1 | `browser-elements-distillate.md:90`; `browser-elements-slice-1.md:5` | The dialog host gate sits at `createDialog.ts:36`. | The `assertElement` call sits at `:35`, and `:36` is blank. `elements-engine-1.md:15` already cites `:35`. | `elements:src/browser/factories/createDialog.ts:35`; `elements:tests/src/browser/factories/createDialog.test.ts:21-24` |
| 2 | `elements-engine-2.md:69`; `elements-engine-1.md:15` | `showModal` locks scroll, and the browser supplies a native modal scroll lock. | Only a clone comment makes this claim, and the clone ships no modal lock. The card's show-a-modal-dialog steps have no scroll step, and no clone test exercises modal scroll. The records measured the page scrolling under an unlocked modal (verdict:815, `sbm:72`; `codex/stage-b-measurements.md:67-69`). Reword both rows as "the clone asserts", as `browser-elements-distillate.md:104` does. | `elements:src/browser/factories/createDialog.ts:22-24`, `:60-61`; `elements:guides/w3c/elements/interactives.md:669-677`; `elements:tests/src/browser/factories/createDialog.test.ts:76-94`, `:323-337` |
| 3 | `elements-engine-2.md:68`; `elements-engine-1.md:15`; `browser-elements-distillate.md:322` | A modal dialog keeps its Tab trap in the browser. | The card makes everything outside the modal inert and runs the dialog focusing steps. It has no Tab-cycling step. The clone claims the trap in its factory, composable, guide, and both showcase pages, and no test checks it. verdict:519 measured focus leaving the framed document on Tab (`chk:185`). | `elements:src/browser/factories/createDialog.ts:20-21`; `elements:src/browser/composables/useDialog.ts:13-14`; `elements:guides/components.md:163`; `elements:app/browser/pages/UseDialogPage.vue:7`, `:13`; `elements:app/browser/pages/DialogElementPage.vue:462-466`; `elements:guides/w3c/elements/interactives.md:673-677`, `:761-769` |
| 4 | `browser-elements-distillate.md:100`; `browser-elements-slice-1.md:15` | The `suppressNativeClose` flag keeps the native `close` listener from emitting a second `close`. | `close()` queues the `close` event on the user interaction task source, so the event arrives after the flag is back to false. The `!visible.value` guard is what stops the duplicate, because `hide()` sets `visible` to false before it calls `close()`. The clone's own test comment records that the event is queued. | `elements:src/browser/factories/createDialog.ts:83-88`, `:120-129`; `elements:guides/w3c/elements/interactives.md:733`; `elements:tests/src/browser/factories/createDialog.test.ts:205-210` |
| 5 | `native-inventory-2.md:26` | It is unverified whether `show()` without `showModal()` still exposes `cancel`. | It does not. For a dialog opened with `show()`, the Auto state of `closedby` computes to None, so the close watcher is disabled. Escape fires no `cancel` unless the author sets `closerequest` or `any`. `native-research-agent-7.md:171` agrees. | `elements:guides/w3c/elements/interactives.md:540-542`, `:689`, `:753-757` |
| 6 | `elements-styles-1.md:43` | A backdrop `@starting-style` (M25) is an Elements value still present. | No `@starting-style` block under `src/styles` targets `::backdrop`. The scrim appears at 50% black with no fade-in, and fades out toward the user-agent `rgba(0,0,0,0.1)` during the `overlay` tail. The showcase page claims an entry fade that the source does not have. | `elements:src/styles/surfaces/_backdrop.scss:81-98`, `:116-120`; `elements:src/styles/elements/_dialog.scss:260-265`, `:303-312`; `elements:app/browser/pages/DialogElementPage.vue:30-32`, `:434-437` |
| 7 | `elements-styles-1.md:27` | Toasts, menus, hints, and non-modal dialogs keep a transparent backdrop. | That holds for popovers only. A non-modal dialog is not in the top layer and generates no `::backdrop`. A modal's user-agent backdrop is `rgba(0,0,0,0.1)`. The clone's file header contradicts its own body on this point. | `elements:guides/w3c/renderings.md:227-229`, `:252-257`; `elements:src/styles/surfaces/_backdrop.scss:25-33`, `:81-83` |
| 8 | `elements-styles-1.md:27`; `elements-engine-1.md:14`; `elements-engine-2.md:25` | `::backdrop` cannot inherit host tokens, so the backdrop tokens live on `:root`. | The claim is out of date. From Chromium 122, `::backdrop` inherits from the element that creates it (`native-research-agent-3.md:95`; verdict:985). The clone extends the same claim to `::placeholder`, `::marker`, `::selection`, and `::view-transition-*` without any reading. | `elements:src/styles/surfaces/_backdrop.scss:54-57`; `elements:guides/surfaces.md:190`, `:308`, `:316`, `:326` |
| 9 | `elements-styles-2.md:23`, `:65` | `.large` caps a dialog at 48rem. | 48rem is only the declared value. `--set-dialog-max-inline-size` resolves to `min(90vw, 30rem)` under Tailwind's `--spacing: 0.25rem`. Wherever 90vw exceeds 30rem, that cap holds both the 32rem default and `.large` at 30rem (derived, no run). | `elements:src/styles/elements/_dialog.scss:67-68`, `:81-82`; `elements:src/styles/composables/_dialog.scss:24-26`; `veneer:node_modules/tailwindcss/theme.css:325` |
| 10 | `browser-elements-distillate.md:146` | The `position-area` parser accepts physical `left` and `right`. | The comment actually claims the parser accepts only physical keywords, and names no version. The records show logical keywords in the user-agent `::picker(select)` rule and `position-area` support from Chromium 129 (`native-research-agent-1.md:43`, `:178`). The clone's own style tests read logical keywords back. The clone has no right-to-left placement path. | `elements:src/browser/constants.ts:657-675`; `elements:src/browser/helpers.ts:2132-2139`; `elements:tests/src/styles/modifiers/_placements.test.ts:24-65` |
| 11 | `browser-elements-distillate.md:136` | The catalog calls `createPopover` the backbone for menu, tooltip, and select, and the anchor surface excludes `output`. | Only `createMenu` composes `createPopover`, and the select reaches it through the menu. `createTooltip` re-implements the pipeline, and `createAside` composes nothing. The exclusion in the shipped code is `[role='status']`. | `elements:src/browser/factories/createTooltip.ts:1-20`; `elements:src/browser/factories/createAside.ts:1-4`; `elements:src/browser/factories/createMenu.ts:23`, `:83`; `elements:src/styles/surfaces/_anchor-position.scss:221` |
| 12 | `elements-engine-2.md:18`; `browser-elements-distillate.md:309` | `position: absolute` keeps the panel in its containing block, so fallbacks re-evaluate with the anchor's surroundings. | For a top-layer box, CSS Positioned Layout 4 makes the containing block of any position other than `fixed` the initial containing block, not an ancestor of the anchor (`native-research-agent-1.md:103`). The switch only moves the containing block from the viewport to the initial containing block, and the clone's sticky-flip limit persists. | `elements:src/styles/surfaces/_anchor-position.scss:222-231`; `elements:guides/surfaces.md:149`, `:153` |
| 13 | `elements-engine-2.md:23` | The user-agent closed-popover rule is `[popover]:not(:popover-open) { display: none }`. | The mirrored sheet reads `[popover]:not(:popover-open):not(dialog[open])` and adds `dialog:popover-open { display: block }`. | `elements:guides/w3c/renderings.md:231-237` |
| 14 | `browser-elements-distillate.md:59` | The popover surface sets `transition-behavior: allow-discrete`. | The shipped rule writes `allow-discrete` only on the `overlay` and `display` entries. It records that a standalone declaration snapped drawer opacity to 1. The guide sample keeps the standalone form. | `elements:src/styles/surfaces/_popover.scss:103-114`, `:204-216`; `elements:guides/surfaces.md:65-75` |
| 15 | `elements-engine-2.md:24` | A raw `:not(output)` has specificity (0,2,0). | `:not()` takes its argument's specificity, so `[popover]:not(output)` is (0,1,1). The row's conclusion still holds (see [Selectors Level 4, calculating a selector's specificity](https://www.w3.org/TR/selectors-4/#specificity-rules)). The clone's own texts give four different numbers. | `elements:src/styles/surfaces/_popover.scss:67-72`; `elements:guides/surfaces.md:338`; `elements:src/styles/modifiers/_placements.scss:76-79` |
| 16 | `elements-styles-1.md:41` | The drawer `@starting-style` is unverified. | It exists. There is a bare block on `:is(aside, nav)[popover]:popover-open`, one transform-only block per placement, and a `nav[popover]` block. | `elements:src/styles/components/_aside.scss:691-699`, `:760-764`, `:777-781`, `:798-802`, `:819-823`, `:875-879` |
| 17 | `elements-engine-1.md:17`; `elements-engine-2.md:42` | Modal dialogs and popovers register close watchers implicitly. | The card is the clone's paraphrase, not spec text. A manual popover gets no close watcher (`native-research-agent-7.md:73`, `:168`). A non-modal dialog gets an enabled one only when `closedby` computes to `closerequest` or `any`. | `elements:guides/w3c/interactions.md:619`, `:623`; `elements:guides/w3c/elements/interactives.md:540-542` |
| 18 | `browser-elements-distillate.md:116` | The aside header calls its `show` and `hide` verbs informational because the native `beforetoggle` cannot be cancelled. | That holds for the closing event only. The opening `beforetoggle` is cancelable (`native-research-agent-3.md:35`), so the factory gives up a `show` veto it could keep. | `elements:src/browser/factories/createAside.ts:25-27`, `:81-90` |
| 19 | `elements-engine-2.md:28`; `browser-elements-distillate.md:306` | `beforetoggle` on `details` arrived later in Chromium than on a popover. | The clone's card defines no `beforetoggle` for `details`. Its attribute change steps queue one coalesced `toggle` task on the DOM manipulation task source. The factory comment that calls that `toggle` a microtask is also wrong. No stage B record measures a `beforetoggle` event on `details`. | `elements:guides/w3c/elements/interactives.md:101-109`, `:119-129`; `elements:src/browser/factories/createDetails.ts:59-67` |

## Contradictions with the stage B verdict or the remainder map

The following table lists each clone fact that contradicts a verdict or map line, and the ruling the Orchestrator must make. Rows 1, 2, 3, 6, and 7 keep the verdict as it is and need only the stated action. Rows 4, 5, and 8 need a ruling.

| # | Verdict or map line | The clone's fact | Citation | Ruling the Orchestrator must make |
| --- | --- | --- | --- | --- |
| 1 | verdict:785, :813, :815, :990 | The clone asserts that `showModal()` locks document scroll, and ships no modal lock. | `elements:src/browser/factories/createDialog.ts:22-24`, `:60-61`; `elements:app/browser/pages/UseDialogPage.vue:8`, `:13`; `elements:guides/w3c/elements/interactives.md:669-677` | Hold the verdict. `Lock` stays the sole owner, and chunk 3 keeps `html:has(dialog:modal:not(.modal)) { overflow: hidden }`, because the measured page scroll (`sbm:72`) outweighs the clone's comment. No user ruling. |
| 2 | verdict:368, :415, :519; map:20 | The clone asserts a native modal Tab trap. | `elements:src/browser/factories/createDialog.ts:20-21`; `elements:src/browser/composables/useDialog.ts:13-14`; `elements:app/browser/pages/DialogElementPage.vue:462-466`; `elements:guides/w3c/elements/interactives.md:673-677` | Hold the verdict. `Trap` stays the sole focus wrapper, and ruling 3's framed-document limit stands. Apply correction 3. |
| 3 | verdict:462, :492-496, :525-526 | The clone's statechart drives `nativeclose` by dispatching a synthetic `close` Event. That leaves `open` and `:modal` true while the factory reads closed, a state the platform never reaches. | `elements:tests/src/browser/factories/createDialog.test.ts:204-212`, `:256-271`; `elements:src/browser/factories/createDialog.ts:117-129` | Write into the B1 and B3 briefs: the `modal-native:close` and `modal-native:cancel` rows call the real `close()` and `requestClose()`, and no row dispatches a synthetic native lifecycle event. |
| 4 | verdict:237, :313, :932, :997; map:31; against verdict:1065 (I-1) | A CSS fade on a bare `<dialog>` needs `@starting-style` for the entry. For the exit it needs `display` and `overlay` transitions with `allow-discrete`, or `close()` removes the box immediately. A starting style did produce a fade on Chromium 153 (`codex/stage-b-measurements.md:157`). | `elements:src/styles/elements/_dialog.scss:118-121`, `:244-250`; `elements:guides/surfaces.md:90-91` | Ruling 5 must say whether its refusal of `@starting-style`, `allow-discrete`, and `overlay` covers chunk 3's bare surfaces. If it does, I-1's recommended opacity fade has no CSS path, and I-1 must recommend no motion. If it does not, limit the refusal to the engine, which is where its reasons apply (verdict:237, :313). |
| 5 | verdict:988; map:178 (contradiction 23) | The clone declares `position-visibility: anchors-visible` under a stated Chromium 125 floor. Its test only reads the value back, which cannot tell the declaration apart from the Chromium 153 initial value. No hit or pixel reading exists. | `elements:src/styles/surfaces/_anchor-position.scss:5-9`, `:242-246`; `elements:tests/src/styles/surfaces/_anchor-position.test.ts:35-44` | D-10 decides verdict:988. At a Chromium 153 floor, the refusal holds. At a floor whose initial value is `always` (the Chromium 141 host, map:178), leaving the declaration out changes behavior. In that case either chunk 3 declares it, or P0 also runs on that floor. |
| 6 | verdict:732-733; map:23 | The popover and tooltip factories write `popover="manual"` at construction and never remove it. A closed panel keeps matching `[popover]`, and a page's `showPopover()` opens it without the factory noticing. | `elements:src/browser/factories/createPopover.ts:155-163`, `:261`, `:313-352`; `elements:src/browser/factories/createTooltip.ts:121-129`, `:230`, `:251-273` | Hold the verdict. B5 writes `popover` only while the panel is open. Take nothing from the clone's attribute lifetime. |
| 7 | verdict:187, :1123 | `destroy()` leaves `show()` and `hide()` callable. The clone's test asserts that `show()` after `destroy()` writes placement again, which reopens the panel natively with no dismiss listener. `destroy()` itself hides the panel without firing an event. | `elements:src/browser/factories/createPopover.ts:54-57`, `:155-163`, `:313-352`; `elements:tests/src/browser/factories/createPopover.test.ts:142-149` | Hold the verdict, and add `show()` after `destroy()` to B5's reading "no native open state after destroy". |
| 8 | verdict:193-195, :326-327, :1193 | The clone's aside defaults to `popover="auto"` and accepts the lost veto. The user's own Elements port plan maps `.offcanvas-md offcanvas-start` to `<aside :popover="isMobile ? 'auto' : undefined">` and drops `.fade .show`. | `elements:src/browser/factories/createAside.ts:21-27`, `:49-51`, `:65-68`; `elements:docs/superpowers/specs/2026-05-20-examples-port-design.md:113-119`; `elements:docs/superpowers/specs/2026-05-21-examples-port-design-revised.md:116-126`; `elements:src/styles/components/_body.scss:136-150` | Put the user's Elements mapping beside rulings 5 and 11 in the decision packet. The measured veto loss under `auto` (`sbm:33`) still stands. But in Elements the user chose a popover drawer toggled at a breakpoint for responsive offcanvas, so G1's `<dialog>` direction (verdict:195) needs the user's confirmation rather than being taken as the default. |

## Facts the clone adds, by unit

Each unit lists the clone facts that bear on it, with a citation and a bearing for each. A fact that only confirms a record appears only where the unit needs the clone citation, and it is marked as a confirmation.

### B0 `stage-b-contract`

The following fact bears on B0.

- **The clone adopts a dialog that is already open in markup.** It seeds `visible` from `element.open`, so `show()` returns early, `hide()` closes the host, and the host never becomes modal. A written `open` attribute runs the setup steps and fires no event. A later `showModal()` on that host throws `InvalidStateError` (`elements:src/browser/factories/createDialog.ts:43`, `:56`, `:79-88`; `elements:guides/w3c/elements/interactives.md:660-667`, `:671`).
  - Bearing: the clone is an existing example of the "adopt" alternative that verdict:465 and :497 refuse. `MODAL_OPEN` is already ruled (map:196), so B0 keeps the throw in its `@throws` remark.

### B1 `stage-b-harness`

The following facts bear on B1's readers and on the shape of its tables.

- **The clone has a dialog statechart B1 can learn from.**
  - Its table has three states (`closed`, `open`, `open-nonmodal`), four events (`show`, `hide`, `nativeclose`, `destroy`), and three observables (`visible`, `dialog.open`, `dialog.matches(':modal')`), read from a per-state table.
  - Each row asserts open and close recorder counts. The non-modal rows read the body's `data-elements-scroll-locked`. A `hide` on a closed dialog is a no-op row with zero emits. The destroy row ends closed with no event assertion (`elements:tests/src/browser/factories/createDialog.test.ts:135-153`, `:186-191`, `:217-234`, `:273-297`, `:308-312`).
  - Bearing: B1 can borrow the `open` and `:modal` observables (verdict:1119) and the invalid-transition no-op row. The silent destroy matches verdict:481. Refuse the `nativeclose` row (contradiction 3).
- **The float tables are useful only for their transition names.** The popover, tooltip, menu, and aside tables observe `visible`, `:popover-open`, the anchor's `aria-expanded`, and open and close counts. None asserts the `popover` attribute, hit order, or paint. No row covers the popover focus trigger, the tooltip touch and pen path, or a manual aside (`elements:tests/src/browser/factories/createPopover.test.ts:174-176`, `:277-395`; `elements:tests/src/browser/factories/createTooltip.test.ts:131-144`, `:233-337`; `elements:tests/src/browser/factories/createMenu.test.ts:51-76`, `:213-348`; `elements:tests/src/browser/factories/createAside.test.ts:97-106`, `:168-249`).
  - Bearing: B5's rows `panel::popover`, `panel::popover-open`, and `$::hit` order (verdict:746-749) have no counterpart in the clone.
- **The float tables run on a fake clock.**
  - They call `vi.useFakeTimers()` and advance by `TRANSITION_FALLBACK_MS`, and `assertCleanDispose` counts timers only under fake timers.
  - Vitest 4.1.11 fakes `performance` by default. The outside-dismiss rows therefore compare a fake `performance.now()` with a real `Event.timeStamp`, and the 50 ms `POPOVER_TOUCH_GUARD_MS` guard never engages in those rows. This is inferred from the code and the installed Vitest source (`elements:tests/src/browser/factories/createPopover.test.ts:252-256`, `:361-367`; `elements:tests/src/browser/factories/createMenu.test.ts:198-202`, `:304-310`; `elements:tests/setupBrowser.ts:236-260`, `:315-334`; `elements:src/browser/factories/createPopover.ts:195`, `:244`; `elements:src/browser/constants.ts:59`; `veneer:node_modules/vitest/dist/chunks/test.DNmyFkvJ.js:3299`).
  - Bearing: the scaffold law forbids fake clocks for project-owned behavior (`scaffold:AGENTS.md:42`), so a Veneer port drives real transitions and real time. Copy the aside block instead: it runs on real time and drains the queued `toggle` with `waitForDelay()`.
- **Light dismiss needs trusted input.** The card's light dismiss asserts `isTrusted`. It stores the nearest clicked dialog at `pointerdown`, proceeds at `pointerup` only on that same target, and handles open popovers before open dialogs (`elements:guides/w3c/elements/interactives.md:628`, `:789-807`).
  - Bearing: a B1 or B3 light-dismiss reading must drive trusted input through Playwright's mouse or the Chrome DevTools Protocol, never `dispatchEvent`. `native-research-agent-3.md:104` holds the rest of the rule.
- **The card fixes no order between a dialog's `toggle` and `close` events.** The `toggle` event is queued on the DOM manipulation task source and coalesced through the dialog toggle task tracker, which keeps the earliest `oldState`. The `close` event is queued on the user interaction task source (`elements:guides/w3c/elements/interactives.md:733`, `:741-751`).
  - Bearing: B1's lifecycle reader must not assert an order between the two events. This also supports verdict:462, which routes neither.
- **The clone has no measuring instrument to borrow.**
  - Its style suites run in headless Chromium through Playwright and assert computed values only. The backdrop cases never read paint, the scrollbar cases read computed `scrollbar-gutter` but never a width, and the anchor cases read `position-area` but never geometry (`elements:tests/src/styles/surfaces/_backdrop.test.ts:29-57`, `:67-112`, `:132-162`; `elements:tests/src/styles/surfaces/_scrollbar.test.ts:14-41`; `elements:tests/src/styles/surfaces/_anchor-position.test.ts:83-116`).
  - Its browser provider passes only an executable path, a WebSocket endpoint, or a channel, and removes no Playwright default argument (`elements:vite.config.ts:88-99`, `:209-214`, `:242-246`).
  - Bearing: the B1 page-capture pixel reader (map:18) remains the only instrument for P12 and the chunk 3 scrim. Ruling 2's classic-scrollbar instrument has no precedent in the clone.
- **Computed `position-area` uses a short form for logical span areas.** `block-start span-inline-end` reads back as `start span-end`, and the other three corners follow the same pattern. Single edges keep their names. The browser build is not pinned (`elements:tests/src/styles/modifiers/_placements.test.ts:24-65`; `elements:vite.config.ts:88-99`).
  - Bearing: any B1 or B5 reader, or P0 record, that compares computed `position-area` must expect the short form.
- **The clone writes no dialog state attribute.** No file under `src/` or `app/` writes a `[data-dialog-*]` attribute. The guide's `data-dialog-closing` is never written, and the dialog CSS keys on `[open]`, `:modal`, and `:has()` structure (`elements:app/browser/pages/DialogElementPage.vue:4-6`, `:39`, `:88-91`; `elements:guides/composables.md:74`, `:76`; `elements:src/styles/elements/_dialog.scss:204-206`).
  - Bearing: B1's native-state readers for `open`, `:modal`, and `closedby` cover every state Elements styles.

### B2 `stage-b-wiring`

The following facts bear on B2's capture routes.

- **The clone's dialog factory cannot see an open it did not start.**
  - It has no `beforetoggle`, `toggle`, or `command` listener, and `visible` becomes true only inside its own `show()`.
  - A `command="show-modal"` invoker, or a script `showModal()` or `show()`, leaves `visible` false. The `cancel`, `click`, and native `close` handlers then return early. As a result `escape: false` does not hold, the backdrop policy is off, and the native close emits nothing.
  - A later factory `show()` on a host opened with `show()` dispatches `show` and sets `visible` before `showModal()` throws `InvalidStateError` (`elements:src/browser/factories/createDialog.ts:59`, `:110`, `:122`, `:146`, `:160-164`; `elements:guides/w3c/elements/interactives.md:671`, `:701`).
  - Bearing: this is the case B2's routes `{ event: 'command' }` and `{ event: 'beforetoggle' }` on `dialog.modal` exist for (verdict:484-490, :503; map:19), with the rows `modal-native:command` and `modal-native:script-open` (verdict:523-524). Checking `MODAL_OPEN` before any event (verdict:465, :875) prevents the throw.
- **A command's `source` reaches `beforetoggle`.**
  - The valid dialog commands are `close`, `request-close`, and `show-modal`. No command shows a dialog non-modally.
  - The command steps do nothing for a dialog shown as a popover. `close` and `request-close` act only on an open dialog, and `show-modal` only on a closed one.
  - `show-modal` passes the invoker as `source`, so its `beforetoggle` carries the invoker. Script `show()` and `showModal()` pass null (`elements:guides/w3c/elements/interactives.md:596`, `:600`, `:671`, `:691-701`).
  - Bearing: the `beforetoggle` route sees `source === null` for every script open. Where the command route misses a command open, `ToggleEvent.source` names the invoker and can stand in for `relatedTarget`. That narrows `native-research-agent-3.md:194` for dialogs.
- **The card supports the `beforetoggle` route (confirmation).** The opening `beforetoggle` from `show()` and from show-a-modal-dialog is cancelable, and both algorithms re-check `open` after it and return. The closing `beforetoggle` fires synchronously inside `close()`, before the `close` event is queued (`elements:guides/w3c/elements/interactives.md:596`, `:671`, `:727`, `:733`).
  - Bearing: confirms verdict:487-490 (`chk:181`), :159, and :492 with clone citations.

### B3 `native-overlay`

The following facts bear on B3's native modal, its readings, and its gutter half.

- **Every native close route bypasses the clone's `hide` veto.**
  - Escape, a `method="dialog"` form, an inner `close()`, `requestClose()`, and the `close` and `request-close` commands each close the dialog natively.
  - `onCancel` never dispatches `elements:dialog:hide`, and `onNativeClose` emits only `close`, with no transition wait. The veto gates only a programmatic `hide()` and an outside click under `backdrop: true`.
  - The showcase says the opposite, and names a Cancel button that its dialog does not have (`elements:src/browser/factories/createDialog.ts:79-82`, `:109-115`, `:120-129`, `:155`; `elements:app/browser/pages/UseDialogPage.vue:435-440`).
  - Bearing: supports verdict:485, :491, and :806. The distillates do not record this gap.
- **The clone has no rollback for a cancelled or thrown native open.**
  - `show()` dispatches `show` and sets `visible` before it calls `showModal()` or `show()`, with no `try` and no `:modal` check.
  - If a page listener cancels the opening `beforetoggle`, `visible` stays true over a closed host and the factory still emits `open` after the transition. A throw also leaves `visible` true (`elements:src/browser/factories/createDialog.ts:57-65`, `:72-76`; `elements:guides/w3c/elements/interactives.md:596`, `:671`).
  - Bearing: supports verdict:469-476 and the readings "a cancelled native open with full rollback" and "a thrown native open" (verdict:1121). `elements-engine-1.md:15` records only the precondition.
- **The clone's queued `close` can arrive after a reopen (inferred, no run).** `close()` queues the `close` event. A `hide()` followed by `show()` in the same task therefore leaves a queued `close`. That event finds `visible` true, sets it false, releases the lock, and emits `elements:dialog:close` while the dialog is open (`elements:src/browser/factories/createDialog.ts:83-88`, `:120-129`; `elements:guides/w3c/elements/interactives.md:733`).
  - Bearing: a live counterexample for the reading "close, reopen, close, before the queued `close` event" (verdict:1121), and support for routing no queued `close` (verdict:159, :462).
- **The card supports `closedby="none"`, and the clone's Escape option goes too far.**
  - Under None, the close watcher is disabled, so Escape and other user close requests fire no `cancel`.
  - `requestClose()` ignores `closedby`: it sets the enable-close-watcher-for-request-close flag and fires a cancelable `cancel`. Commands act regardless of `closedby`.
  - The clone's `dismiss.escape: false` calls `preventDefault()` on every `cancel` while the dialog is visible. So it also blocks `requestClose()` and `command="request-close"`, not only Escape.
  - Its only Escape test dispatches a synthetic `cancel`. The suite therefore cannot see the non-cancelable `cancel` that Chromium fires without history-action activation or after one veto (`elements:guides/w3c/elements/interactives.md:534-538`, `:578-582`, `:640-642`, `:689`, `:697-701`, `:735-739`; `elements:src/browser/factories/createDialog.ts:109-115`; `elements:tests/src/browser/factories/createDialog.test.ts:96-110`).
  - Bearing: confirms verdict:152-154 and :306-308 with clone citations. P6 (verdict:1121) has no prior art in the clone. Veneer's `keyboard` handling sits on `keydown` (`veneer:src/browser/Modal.ts:55-63`) and stays there under verdict:783.
- **The card explains backdrop hits, and shows that `closedby="any"` cannot work on a full-viewport host.**
  - A pointer event that hits `::backdrop` targets the dialog itself.
  - The nearest-clicked-dialog step returns null when the target is an open modal dialog and the point lies outside its bounds. Light dismiss does nothing when the clicked dialog is the topmost one.
  - On a `<dialog>` host that covers the viewport, every press lies inside its bounds, so `closedby="any"` can never dismiss it (`elements:guides/w3c/elements/interactives.md:797`, `:809-821`; `elements:src/browser/factories/createDialog.ts:146-154`).
  - Bearing: a second reason, beside cancelability, for verdict:307's refusal of `any`. It agrees with verdict:311 (`feas:13`, 414 × 896). The card is the source that `elements-engine-2.md:16` lacks for "a backdrop hit targets the dialog". The phone padding band stays unmeasured.
- **The clone's click-only route dismisses on a drag-out (inferred, no run).** It listens to `click` only, and Blink sends `click` to the common ancestor of the press and release targets. A press on dialog content released over the backdrop therefore reaches the handler with `target === dialog` and coordinates outside the box (`elements:src/browser/factories/createDialog.ts:145-157`, `:163`; `elements:guides/w3c/elements/interactives.md:793-797`).
  - Bearing: confirms verdict:500, which keeps `mousedown` plus `click` on the host (`veneer:src/browser/Modal.ts:64-78`). Add a drag-out reading to the native-modal rows: press on `.modal-content`, release on the host.
- **Two exits fire neither `beforetoggle` nor `close`.**
  - Removing an open dialog from the document runs the cleanup steps, takes it out of the top layer immediately, and sets is-modal false, while `open` stays. Re-inserting it leaves it open and non-modal.
  - Removing `open` by hand runs the cleanup steps with no event. After that, `close()` returns at its first step, and a modal leaves the document blocked (`elements:guides/w3c/elements/interactives.md:546-550`, `:648-658`, `:660-667`, `:727`, `:771-785`).
  - Bearing: the forced-close listener keys on the closing `beforetoggle` (verdict:492), which neither exit fires, and verdict:497 covers only a written `open`. B3 must either add a removal reading (`open` true, `:modal` false) or name removal as an unrouted exit beside the written `open`.
- **Opening a dialog hides auto and hint popovers, and leaves manual ones open.** `show()` and `showModal()` both run hide-all-popovers-until. Its endpoint is the dialog's topmost ancestor in the showing auto or hint popover list, or the document if there is none (`elements:guides/w3c/elements/interactives.md:596`, `:675`).
  - Bearing: B5's manual floats survive a native modal opening (verdict:783), while an `auto` or `hint` popover would close, which map:31 already refuses. The distillates do not record this step.
- **A forced close carries no reason, and `returnValue` persists.**
  - `close()` leaves `returnValue` unchanged when its result is null. Escape closes with the request-close return value, which is null unless `requestClose(value)` set it. A `method="dialog"` submit writes the submitter's `value`.
  - The clone's `hide()` calls `close()` with no argument. Its form demo therefore reports the previous submit's value after a later Escape or `hide()` (`elements:guides/w3c/elements/interactives.md:622`, `:636`, `:687`, `:727`, `:737`; `elements:src/browser/factories/createDialog.ts:87`; `elements:app/browser/pages/UseDialogPage.vue:100-109`; `elements:app/browser/pages/DialogElementPage.vue:24-26`, `:358-363`, `:370-381`).
  - Bearing: ruling 4's non-cancelable `hide.bs.modal` and the `hidden` that follows it carry no reason (verdict:157, :806), so a consumer reads `returnValue` on the host. The form-submit route (verdict:1121) must clear `returnValue` at show if any handler tells routes apart by it. B7 can list `returnValue` among the limits. No record mentions it.
- **The clone's tests give the dismiss rows nothing to build on.** There is no case for the click handler, the box geometry, `dismiss.backdrop`, or the `prevent` event. Escape and the native close appear only as synthetic dispatches (`elements:tests/src/browser/factories/createDialog.test.ts:96-122`, `:204-212`, `:236-298`, `:315-338`).
  - Bearing: B3's dismiss rows have no tested Elements reading, and the Source "None" at `elements-engine-2.md:16` stands.
- **The clone's focus trap has no `focusin` guard, and its dialog uses no trap at all.** `createFocus` only wraps Tab at the first and last focusable descendants, on a document `keydown`. Focus that a click or a script moves outside stays outside. `createDialog` imports no trap (`elements:src/browser/factories/createFocus.ts:49-64`; `elements:src/browser/factories/createDialog.ts:4-13`).
  - Bearing: `Trap`'s `focusin` design (`elements-engine-2.md:68`) has no Elements counterpart. `Trap` stays the sole focus wrapper (verdict:368).
- **Elements' lock doubles a declared gutter (derived, no run).**
  - `lockBodyScroll` pads only `body`, by `innerWidth - clientWidth`.
  - Meanwhile the scrollbar surface declares `scrollbar-gutter: stable` on every element, and drops it on `html` and `body` only at viewports 480 px wide and under. On a desktop with classic scrollbars, that width is the reserved strip, so the lock pads on top of it.
  - The same surface records, without a run, that a reserved root gutter shifts fixed-position descendants by the gutter width on the inline-end edge. It gives this as its reason for the 480 px drop (`elements:src/browser/helpers.ts:1672-1692`; `elements:src/styles/surfaces/_scrollbar.scss:45`, `:52-58`, `:60-88`).
  - Bearing: Elements ships the doubled case that `native-research-agent-8.md:4` asks about and that the `stable` leaf repairs (verdict:600-631). Its formula is Bootstrap's, so the control "a declared gutter without the leaf" (verdict:620-631) reproduces it. The fixed-position shift bears on the `.fixed-top` and `.fixed-bottom` rows and on D-5 (verdict:1054).
- **The user-agent dialog box and the fence (confirmation, cited for B3 and D-11).**
  - The mirrored user-agent sheet gives `dialog`: `position: absolute; inset-inline: 0`, `width: fit-content`, `height: fit-content`, `margin: auto`, `border: solid`, `padding: 1em`, `background-color: Canvas`, and `color: CanvasText`.
  - It gives `dialog:modal`: `position: fixed; overflow: auto; inset-block: 0`, with `max-width` and `max-height` of `calc(100% - 6px - 2em)`.
  - Bootstrap's `.modal` overrides the position, start insets, size, and overflow. The B3 fence overrides the remaining seven properties and the backdrop. Without `max-width: none`, the user-agent cap shrinks the `width: 100%` host by 6px + 2em (`elements:guides/w3c/renderings.md:208-229`; `veneer:src/bootstrap/components/_modal.scss:26-35`; verdict:534-545).
  - Bearing: confirms verdict:972-973 and the box equality at `feas:13`. The research's renderings citations resolve against this clone: `native-research-agent-1.md:43` at `elements:guides/w3c/renderings.md:1685-1702`, and `native-research-agent-2.md:29` at `:1239-1280`.

### B4 `native-intrinsic`

The following fact bears on B4.

- **The clone has no intrinsic-size reading and no scripted height tween.**
  - `createDetails` leaves height to CSS. `html` declares `interpolate-size: allow-keywords` in `@layer elements`.
  - The `::details-content` rule tweens `block-size`, `opacity`, and `content-visibility` with `allow-discrete`, through a plain `transition` that skips the reduced-motion mixin.
  - The same file's header says the framework does not animate the disclosure, and names a `_root.scss` file that does not exist (`elements:src/browser/factories/createDetails.ts:12-17`; `elements:src/styles/elements/_html.scss:12-14`; `elements:src/styles/elements/_details.scss:15-18`, `:66`, `:77-90`; `elements:src/styles/_mixins.scss:87-93`).
  - Bearing: Elements gives B4's gate no evidence. `native-inventory-2.md:59` records that the tween did not animate in the feasibility run, and verdict:989 already makes the chunk 3 tween respect reduced motion.

### B5 `native-layer`

The following facts bear on B5's promotion, its gate, and its readings.

- **No float factory notices a native hide.** The popover, tooltip, and menu factories register no `beforetoggle` or `toggle` listener. A page's `hidePopover()` therefore leaves `visible` true and `aria-expanded="true"` until the next factory call. The aside factory is the one exception: it sets `visible` and emits a non-cancelable `hide` at the synchronous closing `beforetoggle` (`elements:src/browser/factories/createPopover.ts:189-209`, `:294-310`; `elements:src/browser/factories/createTooltip.ts:154-171`, `:239-248`; `elements:src/browser/factories/createMenu.ts:165-173`; `elements:src/browser/factories/createAside.ts:81-90`, `:104-107`).
  - Bearing: B5 reconciles an external `hidePopover()` at the closing `beforetoggle` (verdict:739), and the aside factory is the matching example.
- **No float factory rolls back a refused promotion.** `doShow` sets `visible` and writes `aria-expanded="true"` before `showPopover({ source: anchor })`, with no `:popover-open` check and no `try`. A cancelled show leaves `visible` true over a closed panel and still emits `open`. A throw propagates and leaves the same state. The aside `show()` uses the same order (`elements:src/browser/factories/createPopover.ts:165-175`, `:189-200`; `elements:src/browser/factories/createTooltip.ts:131-141`, `:154-163`; `elements:src/browser/factories/createAside.ts:109-117`).
  - Bearing: this is exactly the failure that verdict:735-738 and the reading "a cancelled promotion with no report and a thrown one with a report" (verdict:1123) must rule out.
- **The clone places the panel before it shows it.** `doShow` writes the inline `position-area`, self-alignment, and side attribute before `showPopover({ source })`. The anchor pair exists from construction, and the resolved side is read one animation frame later (`elements:src/browser/factories/createPopover.ts:146-153`, `:189-200`, `:211-221`, `:269-273`).
  - Bearing: B5 shows first and constructs `Placement` after (verdict:728, :730), and `Placement` applies synchronously (`veneer:src/browser/Placement.ts:125`). Both orders place the panel within the same task that opens it. The order matters only to a page's `beforetoggle` listener.
- **The clone overwrites `anchor-name`.** The popover and tooltip factories assign a single generated name, replacing any name the anchor already had, and restore the saved value at destroy. With two factories on one anchor, the first panel's `position-anchor` ends up naming an anchor that no longer exists, and destroying them out of order restores a stale name (`elements:src/browser/factories/createPopover.ts:269-273`, `:338-339`; `elements:src/browser/factories/createTooltip.ts:231-235`, `:270-271`).
  - Bearing: keep `Placement`'s comma-list merge (`veneer:src/browser/Placement.ts:198-211`) for delegated children and for a tip on a dropdown toggle.
- **One Escape hides every float and swallows a modal's close request.** Each popover and tooltip instance adds its own document `keydown` listener. On Escape it calls `preventDefault()` and hides, without checking which float is on top. The menu inherits this from the popover it composes. A cancelled Escape keydown ends the close request before any close watcher runs (`native-research-agent-7.md:9-10`, `:161`) (`elements:src/browser/factories/createPopover.ts:251-256`, `:308`; `elements:src/browser/factories/createTooltip.ts:222-227`, `:246`; `elements:src/browser/factories/createMenu.ts:90`).
  - Bearing: the reading "a float inside a native modal" (verdict:1123) can use this as its hazard case. Escape stays on Veneer's keydown routes (verdict:740, :783, :801).
- **Outside dismiss runs on `pointerdown`.** The popover listens in the bubble phase, so a page's `stopPropagation()` blocks it. The tooltip listens in the capture phase, for touch and pen only. A right-click, or a touch scroll that starts outside the panel, hides it. Chromium 154 moves native light dismiss to `click` for that reason (`native-research-agent-3.md:67`) (`elements:src/browser/factories/createPopover.ts:242-249`, `:307`; `elements:src/browser/factories/createTooltip.ts:211-220`, `:245`).
  - Bearing: not a model for the dropdown. B5 keeps Bootstrap's click-based `autoClose` (verdict:291).
- **The tooltip has no description link and an untested touch path.** It writes `role="tooltip"` on the panel and no `aria-describedby` on the anchor, and keeps `role` and `popover` after destroy. It toggles on an anchor `pointerdown` for touch and pen, while `mouseenter` also opens it for a pen that can hover. No row covers that path (`elements:src/browser/factories/createTooltip.ts:200-209`, `:230`, `:236`, `:240-244`, `:251-273`; `elements:tests/src/browser/factories/createTooltip.test.ts:131-144`).
  - Bearing: `Tip`'s `aria-describedby` and its click, hover, and focus triggers stay (`elements-engine-2.md:51`, `:66`; verdict:340).
- **The clone's placement state does not report the resolved side.** The instance `placement` ref holds the requested placement. The resolved side appears only in `data-popover-side` or `data-tooltip-side`, one animation frame after show and after each capture-phase scroll or `resize`. No stylesheet reads those attributes. `strategy` and `offset` reach the DOM only as attributes, and the typed `arrow` element is never read (`elements:src/browser/factories/createPopover.ts:63`, `:94`, `:135-153`, `:216-217`, `:258`; `elements:src/browser/factories/createTooltip.ts:103-119`, `:173-183`; `elements:src/browser/types.ts:1358`).
  - Bearing: keep `Placement.placement` (`veneer:src/browser/Placement.ts:130-136`) and its `data-popper-placement` write (`native-inventory-2.md:110`). The clone has no arrow rule or code to borrow.
- **Turning a placement off leaves the old values in place.** `update({ placement: false })` returns before writing, leaving the previous inline `position-area`, self-alignment pair, and side attribute. `update({})` on a menu drops its `bottom-start` default (`elements:src/browser/factories/createPopover.ts:118-119`, `:211-221`; `elements:src/browser/factories/createMenu.ts:86`, `:192-194`).
  - Bearing: an option that turns a write off must also remove what was written, the way `Hold` releases `popover` at hide (verdict:732-733).
- **Composing one factory inside another leaks events and ARIA.** A menu toggle receives both `elements:popover:*` and `elements:menu:*` events. The menu writes `aria-haspopup="menu"` over a `<menu>` element whose implicit role is `list` (`elements:src/browser/factories/createPopover.ts:168`, `:185`, `:192`, `:204`, `:220`; `elements:src/browser/factories/createMenu.ts:83`, `:91-114`, `:162-163`; `elements:guides/w3c/aria.md:59`).
  - Bearing: B5 promotion adds no event and no role (verdict:727, :735-738).
- **The aside's suppress counters miss coalesced `toggle` events.**
  - The counters assume one native `toggle` per programmatic call, but `toggle` is queued and coalesced (`native-research-agent-3.md:37`).
  - A `show()` then `hide()` in one task leaves a counter that swallows the next native close. A native hide in the same task as a `show()` never emits `close`.
  - The tests drain one macrotask before each native close and have no row for either case (`elements:src/browser/factories/createAside.ts:73-101`, `:109-126`; `elements:tests/src/browser/factories/createAside.test.ts:125-134`, `:149-158`).
  - Bearing: B5 counts no queued `toggle` (verdict:739). Both cases belong with B3's close-and-reopen readings (verdict:1121).
- **The fence leaves the user-agent `fit-content` size.** The mirrored `[popover]` rule sets `width: fit-content` and `height: fit-content`. Neither the clone's anchor rule nor the B5 fence resets them; the clone caps them with `max-inline-size` and `max-block-size` (`elements:guides/w3c/renderings.md:242-243`; `elements:src/styles/surfaces/_anchor-position.scss:257`, `:266-270`; verdict:760-768).
  - Bearing: add `width` and `height` to B5's per-class reading of leftover user-agent styles (verdict:754, :975).
- **The fence's `overflow: visible` suits Bootstrap's arrows (confirmation).** The clone resets `inset: auto; margin: 0` as the fence does. It keeps the user-agent `overflow: auto` with `overscroll-behavior: contain`, which works only because it draws no arrow outside the box. Bootstrap 5.3.8 places its tooltip and popover arrows at negative offsets outside the box (`elements:src/styles/surfaces/_anchor-position.scss:232-234`, `:272-276`; `elements:guides/w3c/renderings.md:239-250`; `veneer:src/bootstrap/components/_tooltip.scss:54`; `veneer:src/bootstrap/components/_popover.scss:65`).
  - Bearing: confirms verdict:754-772.
- **Reopening without `source` drops the implicit anchor.** The placements page closes an open popover and reopens it with `showPopover()` and no `source`. The show steps set the implicit anchor from `source`, and hide cleanup clears it (`elements:app/browser/pages/PlacementsPage.vue:49-58`; `native-research-agent-1.md:81-84`).
  - Bearing: every B5 show passes `source`, including a reopen (map:23).
- **A promoted float keeps Bootstrap's `position: absolute`.** For a top-layer box, any position other than `fixed` uses the initial containing block (correction 12). Bootstrap's `.dropdown-menu` declares `position: absolute` (`veneer:src/bootstrap/components/_dropdown.scss:55`).
  - Bearing: a promoted float resolves against the initial containing block unless `Placement` writes `fixed` inline. B5's geometry reading (verdict:1123) covers the difference.
- **The clone's CSSOM assertions name no browser version (confirmation, cited for the gate).** The factory tests run in headless Chromium through Vitest browser mode (`vitest` ^4.1.8, `@vitest/browser-playwright` ^4.1.8, `playwright` ^1.60.0). They assert round-trips of `style.positionArea`, self-alignment, `positionTryFallbacks`, and `:popover-open`. No file names a Chromium version, a bug, or a measurement (`elements:vite.config.ts:204-214`; `elements:package.json:66`, `:69`, `:75`; `elements:tests/src/browser/factories/createPopover.test.ts:21-39`; `elements:tests/src/browser/factories/createMenu.test.ts:78-87`).
  - Bearing: these tests show that Chromium accepts the values. They carry no geometry, hit, or paint reading for the B5 gate.

### B6 `native-integration`

The following fact bears on B6.

- **The clone has no integration tests to borrow from.** Its page and example tests mount surfaces and assert classes, presence, or a single open. The dialog page case checks classes against `modifiers.variant`, and the console example opens one `<dialog>` (`elements:tests/app/browser/pages/DialogElementPage.test.ts:13-62`; `elements:tests/app/browser/examples/ConsoleExamplePage.test.ts:79`, `:144-155`). No clone test reads hit order or paint between two top-layer surfaces.
  - Bearing: B6's single page with a Bootstrap-only control (verdict:1124) has nothing to borrow.

### B7 `native-guide`

The following facts bear on B7.

- **The clone's guides and comments drift from its code.**
  - `composables.md` lists a `data-dialog-closing` marker the factory never writes. Its dialog factory walkthrough omits the `close` listener and the non-modal lock. Its `useDialog` is built on `watchEffect` and `onScopeDispose`, while the code uses `watch` with `onCleanup` and a computed `visible`.
  - The showcase lists a `'static'` backdrop click among the close paths, and an "Esc / button-driven open" that does not exist.
  - The drawer stylesheet says `useAside` adds a scrim, a lock, a trap, and Escape, all of which `createAside` records as removed.
  - The anchor stylesheet claims an `@supports` test that no file contains (`elements:guides/composables.md:74`, `:76`, `:280-332`, `:342-374`; `elements:src/browser/composables/useDialog.ts:18-50`; `elements:src/browser/factories/createDialog.ts:55-100`, `:156`, `:166-185`; `elements:app/browser/pages/UseDialogPage.vue:498-507`; `elements:src/styles/components/_aside.scss:519-522`; `elements:src/browser/factories/createAside.ts:35-51`; `elements:src/styles/surfaces/_anchor-position.scss:5-9`).
  - Bearing: B7 cites Veneer's code and the stage B readings, never Elements guide text, and treats Elements' guide snippets as unreliable for any API shape.
- **The framed-document Tab limit has a spec step to cite.** The show-a-modal-dialog steps make everything outside the dialog inert and run the dialog focusing steps. There is no Tab-cycling step (`elements:guides/w3c/elements/interactives.md:673-677`, `:761-769`).
  - Bearing: B7's limit for Tab in a framed document (verdict:883; ruling 3) can cite the HTML steps beside `chk:185`.

### P0 `anchor-visibility`

The following facts bear on P0.

- **Elements declares `anchors-visible` on purpose and never measures it (confirmation, cited for P0).** The anchor surface declares `position-visibility: anchors-visible` so that a dropdown left open in a scrolled list does not float loose. The factories' scroll and `resize` listeners only re-read the resolved side (`elements:src/styles/surfaces/_anchor-position.scss:240-246`; `elements:src/browser/factories/createPopover.ts:258`, `:309-310`; `elements:tests/src/styles/surfaces/_anchor-position.test.ts:35-44`).
  - Bearing: P0's seam (verdict:55, :826-827, :1117) gains a rationale but no measurement. The dependence on the browser floor is contradiction 5.
- **P0 records need the short `position-area` form.** The B1 fact on computed `position-area` applies to any P0 record that stores the computed value.

### G1 `gate-offcanvas-dialog`

The following facts bear on G1.

- **The `show()` path gets no native Escape.** For a dialog opened with `show()`, the Auto state of `closedby` computes to None, so the close watcher is disabled. The bounds step of light dismiss applies only to modal dialogs. The clone's `dismiss.escape` and `dismiss.backdrop` therefore do nothing when `modal` is false, while its API text lists both without mentioning that (`elements:guides/w3c/elements/interactives.md:540-542`, `:689`, `:753-757`, `:813`; `elements:src/browser/factories/createDialog.ts:109-157`; `elements:app/browser/pages/UseDialogPage.vue:477-483`).
  - Bearing: G1's `show()` path for `scroll: true` keeps the scripted `keydown` route, because verdict:307 refuses `closerequest`.
- **Elements' drawers are popovers, never dialogs.** Every showcase drawer runs as `popover="auto"`. The responsive rails toggle the `popover` attribute at a 960 px breakpoint in consumer script. `createAside` sends a caller who needs modal behavior or a lock to `<dialog>`, without shipping one (`elements:app/browser/pages/AsidePage.vue:420`, `:439`, `:458`, `:477`, `:509`, `:531`, `:550`, `:569`; `elements:src/styles/composables/_aside.scss:12`, `:22-23`; `elements:src/styles/components/_body.scss:136-150`; `elements:app/browser/App.vue:36-45`, `:389-397`; `elements:src/browser/factories/createAside.ts:43-48`).
  - Bearing: the clone has no reading of `<dialog class="offcanvas">` or of a breakpoint crossing for G1. The user's mapping is contradiction 8.

### G2 `gate-collapse-found`

The following facts bear on G2.

- **The ancestor revealing algorithm stops at the first ancestor whose state changed.**
  - It collects the target's until-found and closed-`details` ancestors, innermost first.
  - For each until-found ancestor, it fires a bubbling, non-cancelable `beforematch`. If the ancestor then has left the document or left the until-found state, the whole algorithm returns. Only otherwise does it remove `hidden`.
  - A closed `details` ancestor receives `open` with no event beforehand (`elements:guides/w3c/interactions.md:154-174`).
  - Bearing: G2's `beforematch` handler must leave `hidden` in place. A handler that removes or changes it stops the reveal of every outer ancestor, which breaks nested collapses. Restoring `until-found` (map:27) must wait until after the reveal. The forced `show.bs.collapse` with `cancelable: false` matches an event that nothing can cancel.
- **Until-found needs layout containment, and the clone has a check for it.** An until-found element whose `display` is `none`, `contents`, or `inline` is not revealed, and it keeps its borders, margin, and padding. The clone's inspector rule `presentation/hidden` asserts computed `content-visibility: hidden` and rejects those three `display` values for `[hidden=until-found]` (`elements:guides/w3c/interactions.md:97`, `:99`; `elements:src/browser/inspector/rules.ts:1764-1825`; `elements:src/browser/helpers.ts:1290-1297`).
  - Bearing: a G2 reader can reuse that check. It also confirms why the fence must override `.collapse:not(.show) { display: none }` (map:49).
- **A find-in-page reveal bypasses the clone's `details` veto.** Find-in-page sets `open` directly, so `createDetails` sees only the queued `toggle` and emits `open` with no `show` (`elements:guides/w3c/interactions.md:172-174`; `elements:src/browser/factories/createDetails.ts:75-84`, `:111-125`).
  - Bearing: a reveal is a forced open with no veto, the same shape G2 forces with `cancelable: false`.

### G3 `gate-android-back`

The following fact bears on G3.

- **The clone has no close-watcher code to borrow.** No file under `src/` or `app/` constructs a `CloseWatcher`. The clone's close-request card is a paraphrase that leaves out the manual-popover exception (correction 17; `elements:guides/w3c/interactions.md:613-631`).
  - Bearing: G3's readings rest on `native-research-agent-7.md:73` and `:168`, not on the clone.

### G4 `gate-tab-found`

The following fact bears on G4.

- **The clone hides tab panels with plain `hidden`, under an author rule that would defeat until-found.** The spec card says `hidden` must not be used to hide panels in a tabbed interface, because the panels are just an overflow presentation. The clone's tabs set plain `hidden` on inactive panes. Its nav stylesheet forces `display: none` on `[role='tabpanel'][hidden]` with no until-found exemption, unlike Tailwind's preflight, which exempts it (`elements:guides/w3c/interactions.md:124`; `elements:src/browser/factories/createTabs.ts:16-20`, `:97-104`; `elements:src/styles/components/_nav.scss:411-416`; `veneer:node_modules/tailwindcss/preflight.css:396-398`).
  - Bearing: G4's until-found pane must outrank or exempt every author `[hidden]` display rule. The spec note supports moving inactive panes off plain `hidden`.

### G5 `gate-custom-command`

The following fact bears on G5.

- **The clone never uses commands.** No file under `src/` or `app/` uses `commandfor` or a `--` command. Only the spec cards mention them (`elements:guides/w3c/elements/forms.md:615-628`; `elements:guides/w3c/interactions.md:463-465`).
  - Bearing: G5's first real consumer (verdict:1130) is missing here too.

### Scope refusals: toast and offcanvas (rulings 5, 11, and 12)

The following facts bear on the refused toast and offcanvas promotions.

- **The clone's toast is promoted through the float path.** `createToast` composes `createPopover` with the toast as both anchor and panel. The live region therefore receives `popover="manual"`, `aria-haspopup="dialog"`, an `aria-controls` that names itself, `aria-expanded`, and an `anchor-name` and `position-anchor` pair that names itself. No toast test reads an ARIA attribute or the anchor pair (`elements:src/browser/factories/createToast.ts:176-204`; `elements:src/browser/factories/createPopover.ts:194`, `:206`, `:261-273`, `:283-290`; `elements:tests/src/browser/factories/createToast.test.ts:27-46`).
  - Bearing: the clone's toast is the only existing example of a promoted toast. If ruling 12 is revisited, a toast promotion must not reuse the whole float promotion path.
- **Promotion replaces container layout with script layout.** The promoted toast takes `position: fixed` at a corner from a placement class. The factory measures each open toast's `getBoundingClientRect` height on every animation frame and writes `--set-toast-stack-offset`. It also re-appends the toast to its container on every show. Neither the toast factory nor its stylesheet has a rule for a toast under an open modal (`elements:src/browser/factories/createToast.ts:110-168`, `:188-191`; `elements:src/styles/components/_output.scss:17-25`).
  - Bearing: confirms the cost that ruling 12 names (verdict:197, `dv:12`).
- **The user's Elements design maps responsive offcanvas to a popover drawer.** Contradiction 8 holds the fact and the ruling.

### Chunk 3 styles

The following facts bear on chunk 3's native-surface families (verdict:978-997), grouped by family.

#### Signal

The following fact governs every family in this section.

- **Elements' signal-first rule does not hold on a Veneer page.** The clone's plan, resolved 2026-06-08, treats `dialog:modal` and `[popover]` as signals that always want the bare chrome (`elements:ROADMAP.md:11-15`, `:59`, `:408`). On a Veneer page, a `dialog.modal` under `native` matches `dialog:modal`, and B5's promoted `.dropdown-menu`, `.tooltip`, and `.popover` match `[popover]`.
  - Bearing: each chunk 3 bare-surface family must pair its platform signal with a `:not()` of the Bootstrap class it would otherwise restyle. The scrim, bare-chrome, and hint facts in this section are instances.

#### Dialog

The following facts bear on the bare-dialog chrome, scrim, lock, and focus ring.

- **Two scrims stack on a `dialog.modal` host (derived, no run).** Veneer orders `reset` before `surfaces`, and B3's `dialog.modal::backdrop { background: transparent }` sits in `reset`. A `surfaces/` scrim on Elements' selectors (`dialog::backdrop` for the transition, `dialog:modal::backdrop` for the paint) therefore beats the fence at any specificity. Under `native`, the native scrim paints in the top layer over Bootstrap's `div` backdrop, and the two dims combine to 1 − 0.5 × 0.5 = 0.75 black (`veneer:src/styles/_tokens.scss:2`; verdict:533-545; `elements:src/styles/surfaces/_backdrop.scss:90-91`, `:116-120`).
  - Bearing: verdict:985's bare-dialog scrim must exclude `.modal`, for example with `dialog:not(.modal):modal::backdrop`, the same exclusion the bare-dialog lock uses (verdict:990). Otherwise P12 (verdict:367, :973) fails on every page that loads `./styles`.
- **Bare `dialog` chrome restyles Bootstrap-path modals (derived, no run).**
  - Bootstrap's `.modal` declares only position, top, left, z-index, display, width, height, both overflows, and outline. The B3 fence adds margin, border, padding, both maximum sizes, color, and background. Every other property a bare `dialog` rule sets reaches `dialog.modal`.
  - Elements' bare rule sets `border-radius`, `font-size`, `line-height`, `box-shadow`, `opacity: 0` with `transform: scale(0.96)`, a transition list, and `translate: -50% -50%`. On the full-viewport host, the translate moves the host half off the viewport, and the radius clips its corners under `overflow-x: hidden` (`veneer:src/bootstrap/components/_modal.scss:26-35`; verdict:534-542; `elements:src/styles/elements/_dialog.scss:87-109`, `:140-154`, `:180-186`).
  - Bearing: verdict:984's bare chrome must be scoped with `:not(.modal)`, as the lock is (verdict:990).
- **Preflight removes the user-agent centering margin (derived, no run).** Tailwind 4.3.3's preflight writes `margin: 0; padding: 0; border: 0 solid` on `*` and `::backdrop` in `base`, which Veneer orders after `reset`. A bare `showModal()` dialog on a preflight page therefore sits at the start corner, and no `_reset.scss` rule can restore its margin, padding, or border. Elements centers with `position: fixed`, start insets of 50%, and `translate: -50% -50%`, and declares padding and border in a layer after `base` (`veneer:node_modules/tailwindcss/preflight.css:7-16`; `veneer:src/styles/_tokens.scss:2`; `elements:guides/w3c/renderings.md:209-226`; `elements:src/styles/elements/_dialog.scss:8-14`, `:84-90`, `:180-186`; `elements:guides/surfaces.md:23-27`).
  - Bearing: bare-dialog centering must not depend on `margin: auto`. If chunk 3 wants dialog padding and border on preflight pages, D-1 (map:113, :199) must place them after `base`.
- **Rules gated on open state revert for the whole close animation (confirmation, cited for chunk 3).** `close()` removes `[open]`, and `:modal` stops matching synchronously, while the `display` and `overlay` tail keeps the box rendered. Elements records a capture of the modal box jumping from centered to `inset: 0` on the first close frame, and moves its centering onto bare `dialog` (`elements:src/styles/elements/_dialog.scss:123-139`, `:149-152`, `:156-186`, `:195-206`).
  - Bearing: a second witness for verdict:551. If chunk 3 gives a bare dialog any close transition, its geometry and chrome must sit on ungated `dialog:not(.modal)`.
- **Gate only `display` on `[open]`.** An author `display` on `dialog` beats the user-agent `dialog:not([open]) { display: none }` by origin. Elements therefore gates only `display`, and its style cases assert that a closed `.scrollable`, `.fullscreen`, `.small`, or `.large` dialog computes `display: none`. The stylesheet's claim that `display` holds `flex` for about half of the close is wrong. CSS Display 4 keeps the non-`none` value for the whole interval, and the clone's own test header says `display: none` lands after the motion duration (`elements:guides/w3c/renderings.md:208`; `elements:src/styles/elements/_dialog.scss:361-395`; `elements:src/styles/composables/_dialog.scss:37-40`, `:70-81`; `elements:tests/src/styles/composables/_dialog.test.ts:20-24`, `:46-52`, `:70-76`, `:86-98`; `native-research-agent-0.md:43-44`).
  - Bearing: chunk 3's bare-dialog layout gates only `display` on `[open]`.
- **The "one step lower" `@starting-style` workaround actually ties.** The note says that targeting `dialog[open]` keeps the starting style one specificity step below the in-state rule. But the in-state rule also compiles to `dialog[open]`, so both are (0,1,1) in `@layer elements`, and the starting style comes later in source order. The non-modal block `dialog:not(:modal)` ties with the open rule too. Under the leak the clone describes, an open dialog would stay at opacity 0, yet the clone ships and demonstrates these rules (`elements:src/styles/elements/_dialog.scss:39`, `:238-241`, `:252-265`, `:298-312`; `elements:guides/surfaces.md:92`; `elements:app/browser/pages/DialogElementPage.vue:117-118`, `:126-147`).
  - Bearing: either the leak does not apply, or the clone's fade fails on Chromium 148 and later. No run decides which (`native-inventory-2.md:118`; `elements-engine-2.md:11`). Any chunk 3 `@starting-style` must be read on Chromium 153 before it adopts the one-step rule.
- **The user-agent sheet does not push a non-modal dialog off screen.** The user-agent `dialog` rule sets `position: absolute; inset-inline: 0; margin: auto` and no block inset, so an open non-modal dialog keeps its normal block position. The clone's `position: static` override fixes a problem its own centering on bare `dialog` causes, not a user-agent defect (`elements:guides/w3c/renderings.md:209-214`; `elements:src/styles/elements/_dialog.scss:16-23`, `:180-191`, `:208-212`).
  - Bearing: whether chunk 3's bare non-modal dialog sits in the page flow or overlays it is a layout ruling.
- **A `dialog:focus-visible` ring rarely shows (confirmation, cited for chunk 3).** On Chromium 153, the first focusable child took focus ahead of the dialog (`codex/stage-b-measurements.md:57`). The clone's page says the same, and its stylesheet contradicts it. The clone replaces the user-agent `:focus-visible { outline: auto }` with its own ring and a forced-colors `outline: 2px solid Highlight` (`elements:src/styles/elements/_dialog.scss:574-581`, `:594-598`; `elements:app/browser/pages/DialogElementPage.vue:454-455`; `elements:guides/w3c/renderings.md:313`).
  - Bearing: verdict:991's ring shows only on a dialog with no focusable descendant, or one that script focuses.
- **No forced-colors rule exists for the scrim.** The dialog stylesheet and the page both defer the backdrop's forced-colors behavior to a rule in the backdrop stylesheet, which has none (`elements:src/styles/elements/_dialog.scss:583-586`; `elements:app/browser/pages/DialogElementPage.vue:487-488`; `elements:src/styles/surfaces/_backdrop.scss:1-121`).
  - Bearing: the scrim under `forced-colors: active` needs its own reading in chunk 3 (verdict:991).
- **Two declared tokens are never read.** `--set-backdrop-transition-duration` is declared, registered, and listed as a key token, but the backdrop transition reads `--set-motion-duration`. `--set-anchor-viewport-inset` is declared on `:root` and described as the edge budget, but no rule reads it (`elements:src/styles/surfaces/_backdrop.scss:68`, `:92-97`; `elements:src/browser/tokens.ts:1168`, `:1258`; `elements:src/styles/surfaces/_anchor-position.scss:171-176`, `:257`, `:266-270`).
  - Bearing: the reader law (verdict:1001; map:66) refuses both.
- **The dialog size tokens do not render as declared.** Correction 9 holds the fact. Chunk 3 must not copy Elements' dialog size tokens as written.

#### Popover and hint

The following facts bear on the bare `[popover]` look, the hint, and the anchor defaults.

- **A hint look on `[role='tooltip']` repaints every engine float.** Elements pairs the hint selector `[popover='hint']` with `[role='tooltip']`, and paints color, fill, border color, padding, font size, and shadow on both. The engine's templates give both `.tooltip` and `.popover` the attribute `role="tooltip"`. Bootstrap paints the tooltip on `.tooltip-inner`, not the wrapper, and `.popover` declares no padding, color, or shadow (`elements:src/styles/surfaces/_popover.scss:344-421`; `veneer:src/browser/constants.ts:250-251`; `veneer:src/bootstrap/components/_tooltip.scss:4-37`, `:101-107`; `veneer:src/bootstrap/components/_popover.scss:25-48`).
  - Bearing: scope verdict:986's hint look to `[popover='hint']` or a Veneer class, never `[role='tooltip']`.
- **The bare `[popover]` look and the B5 fence cover different property sets.** Elements' bare chrome declares color, fill, border, radius, padding, shadow, and `max-inline-size`, plus opacity, scale, and transitions for everything except drawers. The fence selectors, at (0,2,0), beat a bare rule only on their own seven properties (`elements:src/styles/surfaces/_popover.scss:73-101`, `:204-216`; `elements:src/styles/surfaces/_anchor-position.scss:221-277`; verdict:756-770).
  - Bearing: define the fence or the bare look so that one covers the other's properties. Otherwise `border-radius` and `box-shadow` reach the `.tooltip` wrapper.
- **The anchor defaults remove user-agent centering from a popover that has no anchor.** The anchor stylesheet always writes `inset: auto; margin: 0`, replacing the user-agent `inset: 0; margin: auto`, and no `@supports` guard exists. A popover shown without `source` therefore lands at the viewport's top-left corner (`elements:src/styles/surfaces/_anchor-position.scss:5-9`, `:231-234`; `elements:guides/w3c/renderings.md:239-247`; `elements:app/browser/pages/PopoverSurfacesPage.vue:62-68`, `:171-174`; `elements:tests/src/styles/surfaces/_anchor-position.test.ts:104-106`).
  - Bearing: verdict:987's defaults must apply only where an anchor can exist.
- **Self-alignment can stay `normal`.** `block-end inline-start` selects the outer corner cell, so an aligned dropdown needs span syntax. Elements' base `align-self: start; justify-self: anchor-center` pins a `block-start` area to the top of its row. As a result every placement writes both values, and the tooltip test pins the pair per area. The spec's `normal` already aligns toward the anchor (`elements:src/styles/modifiers/_placements.scss:53-67`, `:108-147`; `elements:src/styles/surfaces/_anchor-position.scss:239-240`; `elements:tests/src/browser/factories/createTooltip.test.ts:56-89`; `elements:src/browser/constants.ts:686-699`; `native-research-agent-1.md:40`).
  - Bearing: leave self-alignment at `normal` in verdict:987's defaults, or write the pair per area. Bootstrap's `bottom-start` maps to `block-end span-inline-end`.
- **Shape properties belong on bare `[popover]`.** `:popover-open` stops matching at `hidePopover()` while an `allow-discrete` close keeps the box rendered, so layout gated on it reverts on the first close frame. Elements saw a width and padding twitch, and moved the menu's shape onto bare `menu[popover]` (`elements:src/styles/components/_menu.scss:83-96`, `:424-434`).
  - Bearing: put shape properties on bare `[popover]` in verdict:986's look.
- **One `@starting-style` rule per host, and two drawer patterns the clone itself says fail.** The clone records that Chromium did not merge from-state values across `@starting-style` rules at different specificities or in different layers, so it keeps each family in one rule and one layer. Its drawer still uses the two patterns its own comments say fail: it repeats the open selector at equal specificity, and it splits opacity and transform across two blocks. No version or reading backs either claim (`elements:src/styles/surfaces/_popover.scss:191-204`, `:218-230`, `:263-281`; `elements:src/styles/components/_aside.scss:642-699`, `:757-764`; `elements:app/browser/pages/AsidePage.vue:420-587`).
  - Bearing: this matters only if ruling 5 admits `@starting-style` for chunk 3 (contradiction 4). In that case, keep each family's closed state, open state, from-state, and transition list in one layer and one rule, and read an open `.start` drawer on Chromium 153 at the first frame and after the transition.
- **The demanded-size flip and the sticky flip are unmeasured, and no fix ships.**
  - Elements treats `max-block-size` (`18rem`) as the space the fallbacks demand. It retuned hints to `max-content` after a tooltip flipped with under 288 px left, but the spec's overflow trigger does not explain that flip.
  - It names three CSS attempts that failed to re-evaluate a flipped popover inside a nested scroller, and plans a script observer that `src/browser` does not contain. The showcase describes the observer as shipped (`elements:src/styles/surfaces/_popover.scss:330-338`, `:409-416`; `elements:src/styles/surfaces/_anchor-position.scss:84-103`, `:127-134`, `:150-162`, `:248-257`; `elements:src/browser/factories/createMenu.ts:72-80`, `:183-186`; `elements:app/browser/pages/PopoverSurfacesPage.vue:254-265`; `native-research-agent-1.md:52`, `:57`, `:193`).
  - Bearing: without a flip reading, chunk 3 must not adopt a fixed demanded cap or rely on `position-try-fallbacks` for bare popovers. `Placement`'s scripted flip stays (verdict:101).
- **An inverted hint needs its descendants' colors reset.** `background-color: currentColor` resolves to the same rule's `color`, so Elements uses fixed inverted tokens instead. It resets `strong`, `small`, `dt`, `dd`, `address`, `figcaption`, `hgroup p`, the headings, and `mark` to `color: inherit` (`elements:src/styles/surfaces/_popover.scss:300-306`, `:353-397`; `elements:tests/src/styles/surfaces/_popover.test.ts:124-148`).
  - Bearing: verdict:986's hint look hits the same problem for any tag that a lower rule colors.
- **The panel width caps equal Bootstrap's.** `17.25rem` and `12.5rem` equal `--bs-popover-max-width: 276px` and `--bs-tooltip-max-width: 200px` at a 16 px root. The 95% hint fill is an Elements identity value, against Bootstrap's `--bs-tooltip-opacity: 0.9` (`elements:src/styles/surfaces/_popover.scss:48-52`, `:310-329`; `veneer:src/bootstrap/components/_popover.scss:6`; `veneer:src/bootstrap/components/_tooltip.scss:6`, `:14`).
  - Bearing: chunk 3 can keep the widths and drops the fill.
- **The clone's layer comments and exclusions disagree with its code.** File headers say `components` beats `surfaces` and `modifiers`, but the declared layer order makes later layers win. The placement classes exclude `output` but not `[role='status']`, so the toast's corner classes also receive `position-area` from the later `modifiers` layer (`elements:src/styles/surfaces/_anchor-position.scss:41-44`, `:192-194`, `:215-220`; `elements:src/styles/modifiers/_placements.scss:28-32`, `:87-167`; `elements:src/styles/components/_menu.scss:464-470`; `elements:src/styles/index.scss:11-14`).
  - Bearing: a placement-class rule in a later Veneer layer must list every exempt host in its own selector.
- **A popover scrim only paints (confirmation, cited for chunk 3).** The user-agent sheet gives `:popover-open::backdrop` `pointer-events: none !important`, which beats every author declaration. A click on Elements' drawer scrim therefore reaches the page, despite the clone's claim that its scrims block interaction (`elements:guides/w3c/renderings.md:252-257`; `elements:src/styles/surfaces/_backdrop.scss:5-7`, `:116-120`; `elements:guides/surfaces.md:184`).
  - Bearing: a chunk 3 opt-in scrim on a popover (`elements:guides/surfaces.md:198-205`) paints but never blocks.

#### Gutter

The following fact bears on D-5.

- **A gutter declared only on the root reaches no overlay host.** `scrollbar-gutter` does not inherit, and under `stable` every scroll container reserves the strip, including an `overflow: hidden` box. Elements' universal rule reserved a strip on popovers, drawers, alerts, and dialogs with pinned slots (about 14 px by the clone's own note, with no run), and its surfaces layer resets those hosts to `auto` (`elements:src/styles/surfaces/_popover.scss:116-190`; `elements:guides/w3c/renderings.md:247`).
  - Bearing: those strips come from the universal declaration (verdict:122). If D-5 (verdict:1054) adds a gutter to `./styles`, declare it on the root alone.

## API shapes the user wants

The following lists give the factory shapes the clone offers, grouped by the unit that can borrow them or must refuse them. Every shape is Elements' own; none is a Veneer contract.

### B1 harness

The following shapes come from the clone's test harness.

- **Statechart types.** `StateTransition { name, from, event, to }` and `StateScenario { transition, arrange(context, state), act(context, event), assert(context, state) }`, run by `runScenario(scenario, context)` and `runScenarios(scenarios, build)` (`elements:tests/setup.ts:473-485`; `elements:tests/setupBrowser.ts:489-505`).
- **Recorders and fixtures.**
  - `EventRecorder { count, clear() }`.
  - `createFactoryFixture(build)` returns `[instance, teardown]`.
  - `assertCleanDispose(setup, exercise?)` patches the `EventTarget.prototype` listener methods and `IntersectionObserver`, calls `destroy` twice, and counts timers only under fake timers.
  - `createPopoverElements()`, `createTooltipElements()`, and `createMenuElements(itemCount = 3)` build the hosts (`elements:tests/setupBrowser.ts:55-69`, `:236-334`, `:353-404`).
- **The dialog table.** `DialogState = 'closed' | 'open' | 'open-nonmodal'`, `DialogEvent = 'show' | 'hide' | 'nativeclose' | 'destroy'`, a context of `{ api, element, opens, closes }`, and a `Record<DialogState, { visible, open, modal }>` observable table, with `modal` read through `element.matches(':modal')` (`elements:tests/src/browser/factories/createDialog.test.ts:152-160`, `:217-246`, `:308-312`).
- **The browser provider.** It tries, in order, `PLAYWRIGHT_EXECUTABLE_PATH`, `PLAYWRIGHT_WS_ENDPOINT`, `PLAYWRIGHT_CHANNEL`, a `/opt/pw-browsers` Chromium probe, and then system Chrome, or Edge on Windows (`elements:vite.config.ts:60-99`).

### B2 and B3 dialog

The following shapes come from the dialog factory and its Vue adapter.

- **Factory.** `createDialog(element: HTMLDialogElement, options: CreateDialogOptions = {}): CreateDialogInstance` throws through `assertElement` if the host is not `<dialog>`, and also throws if the reactive scope fails (`elements:src/browser/factories/createDialog.ts:31-44`).
- **Options** (`elements:src/browser/types.ts:1441-1454`; `elements:src/browser/factories/createDialog.ts:37-40`, `:159`):
  - `modal`: default `true`, which calls `showModal()`; `false` calls `show()`.
  - `dismiss.backdrop`: `true`, `false`, or `'static'`; default `true`.
  - `dismiss.escape`: default `true`.
  - `scroll.lock`: default `false`, read only when `modal` is `false`.
  - `on`: a partial event map.
- **Instance.** `visible` (a readonly ref seeded from `element.open`), `show`, `hide`, `toggle`, and `destroy` (`elements:src/browser/types.ts:1456-1462`; `elements:src/browser/factories/createDialog.ts:187-193`).
- **Events** (`elements:src/browser/constants.ts:466-472`; `elements:src/browser/factories/createDialog.ts:57`, `:73-76`, `:81`, `:96-99`, `:111-114`, `:120-129`, `:156`):
  - `elements:dialog:show` and `elements:dialog:hide` are cancelable and fire before the native call.
  - `elements:dialog:open` fires after the transition.
  - `elements:dialog:close` fires after the transition on the `hide()` route, and immediately on every native route.
  - `elements:dialog:prevent` fires on an outside click under `'static'`, and on a vetoed `cancel` under `escape: false` with `'static'`.
- **Native listeners and writes.** The factory listens for `cancel`, `close`, and `click` only, and writes nothing on the host. The non-modal lock writes `padding-right` and `data-elements-scroll-locked` on `body`. The stylesheet turns `body[data-elements-scroll-locked]` into `overflow: hidden; overscroll-behavior: contain; touch-action: pinch-zoom` (`elements:src/browser/factories/createDialog.ts:160-164`; `elements:src/browser/helpers.ts:1672-1692`; `elements:src/browser/constants.ts:74`; `elements:src/styles/components/_body.scss:123-133`).
- **Destroy.** The first call removes the listeners and stops the scope. Every call cancels the transition, releases a held lock, closes an open host without an event, and sets `visible` to false (`elements:src/browser/factories/createDialog.ts:166-185`).
- **Vue adapter.** `useDialog(elementRef: Ref<HTMLDialogElement | null>, options)` builds the factory in a `watch` with `flush: 'post'` and `immediate: true`, and destroys it in `onCleanup`. It returns a computed `visible` that falls back to `false`, plus `show`, `hide`, and `toggle`. It returns no `destroy` (`elements:src/browser/composables/useDialog.ts:18-50`).
- **Constant.** `TRANSITION_FALLBACK_MS` is 400 (`elements:src/browser/constants.ts:62`).

### B5 floating panels

The following shapes come from the popover, tooltip, and menu factories.

- **`createPopover({ anchor, panel, arrow? }, options)`** (`elements:src/browser/factories/createPopover.ts:59-364`; `elements:src/browser/types.ts:1352-1392`).
  - Options: `placement` (a placement or `false`; default `bottom`), `strategy` (default `absolute`, written only as `data-popover-strategy`), `offset` (default 8, written only as `data-popover-offset`), `trigger { hover, focus, click }` (omitted means click; `{}` means none), `delay { show, hide }` (default 0), `dismiss { outside, escape }` (default `true`), and `on`.
  - Instance: `visible`, `placement` (the requested value), `styles` (empty `panel` and `arrow` records), `show`, `hide`, `toggle`, `update({ placement? })`, and `destroy`.
  - Panel writes: `popover="manual"` for the factory's lifetime, a generated id when the panel has none, inline `position-anchor`, `position-area`, `align-self`, and `justify-self`, and three `data-popover-*` attributes.
  - Anchor writes: inline `anchor-name` (overwrites any existing value), `aria-haspopup="dialog"` when absent, `aria-controls`, and `aria-expanded`.
  - Events on the anchor: cancelable `elements:popover:show` and `elements:popover:hide` before the change; `elements:popover:open` and `elements:popover:close` after the transition, or in the same turn when the computed `transition-duration` is 0; and `elements:popover:place` on `update`.
  - Listeners: on the anchor, `mouseenter`, `mouseleave`, `focusin`, `focusout`, and `click` per trigger; on the document, `pointerdown` (bubble), `keydown`, and capture-phase `scroll`; on the window, `resize`.
  - `destroy` removes listeners, hides an open panel without an event, restores the anchor pair, the ARIA attributes, and a generated id, keeps `popover`, and leaves `show` and `hide` callable. A second call runs the cleanup again.
- **`createTooltip({ anchor, panel }, options)`** (`elements:src/browser/factories/createTooltip.ts:39-284`; `elements:src/browser/types.ts:1573-1580`).
  - Options: `placement`, `strategy`, `offset`, `delay`, `dismiss { escape }`, and `on`.
  - Hover and focus triggers are always on. For touch and pen it adds an anchor `pointerdown` toggle and a capture-phase document `pointerdown` dismiss.
  - It writes `popover="manual"`, `role="tooltip"`, `data-tooltip-*`, and the inline placement and anchor pair. It writes no ARIA on the anchor.
  - Events: `elements:tooltip:show`, `open`, `hide`, `close`, and `place`. `destroy` keeps `role` and `popover`.
- **`createMenu({ toggle, menu }, options)`** (`elements:src/browser/factories/createMenu.ts:43-204`; `elements:src/browser/types.ts:1632-1645`).
  - Throws unless `menu` is a `<menu>`.
  - Options: `placement` (default `bottom-start`), `strategy`, `offset` (default 2), `flip`, `dismiss { outside, escape, inside }`, and `on`.
  - `flip` defaults to 5. A value of 0 writes `max-block-size: none` and `position-try-fallbacks: flip-inline`. Any other count writes `--set-menu-flip` and a `max-block-size` of the count × 2.25rem.
  - It composes `createPopover` with `trigger: {}`. The toggle receives `elements:popover:*` plus `elements:menu:show`, `open`, `hide`, `close`, and `select`. The `select` detail is `{ item, value }`, with the value taken from `data-value` or the trimmed text.
  - `destroy` always removes `aria-expanded` and `aria-haspopup`, and restores the inline flip writes.
- **Constants.** `POPOVER_TOUCH_GUARD_MS` 50, `TRANSITION_FALLBACK_MS` 400, `DEFAULT_FLOATING_OFFSET` 8, `DEFAULT_MENU_OFFSET` 2, `DEFAULT_MENU_FLIP` 5, `MENU_ITEM_SELECTOR` `:where(li, a, button):not([disabled]):not([aria-disabled="true"])`, `PLACEMENT_AREAS`, and `PLACEMENT_SELFS` (`elements:src/browser/constants.ts:42-43`, `:51`, `:59`, `:62`, `:115-116`, `:662-699`).

### Toast and drawer (rulings 11 and 12, and G1)

The following shapes come from the toast and aside factories and the drawer stylesheet.

- **`createToast(element: HTMLDivElement, options)`** (`elements:src/browser/factories/createToast.ts:58-463`; `elements:src/browser/types.ts:1817-1841`).
  - Throws unless the host is a `<div>`, and writes `role="status"` when it is missing.
  - Options: `autohide` (`false` or `{ delay }`, default 5000 ms), `swipe` (`false` or `{ threshold }`, default 80 px), and `on`.
  - Instance: `visible`, `show`, `hide`, `pause`, `resume`, and `destroy`.
  - Events: `elements:toast:show`, `open`, `hide`, `close`, `pause`, and `resume`.
  - Stack attributes: `data-toast-stack`, `data-toast-stack-hidden`, `data-toast-stack-closing`, and `data-toast-hidden-count` (`elements:src/browser/constants.ts:38`, `:40`, `:96-102`, `:544-551`).
- **`createAside(element, options)`** (`elements:src/browser/factories/createAside.ts:55-151`; `elements:src/browser/types.ts:1525-1544`).
  - Throws unless the host is an `<aside>`.
  - Options: `popover` as `'auto'` (default), `'manual'`, or `false` (keep the authored value), and `on`.
  - Instance: `visible`, `show`, `hide`, `toggle`, and `destroy`.
  - Events `elements:aside:show`, `open`, `hide`, and `close` are not cancelable. Programmatic calls emit both verbs in one turn and suppress the native pair with two counters. The native path emits `show` or `hide` at `beforetoggle`, and `open` or `close` at the queued `toggle`.
  - `destroy` hides an open host and restores the saved `popover` value. A second call returns without doing anything.
- **Drawer CSS.** `:is(aside, nav)[popover]` with `.start`, `.end`, `.top`, and `.bottom` placements; `--set-aside-drawer-inline-size: 21.875rem` and `--set-aside-drawer-block-size: 50dvh` (`elements:src/styles/components/_aside.scss:541`, `:552`, `:578-823`).

### Disclosure, tabs, and focus (B4, G2, G4, and `Trap`)

The following shapes come from the details, tabs, and focus factories.

- **`createDetails(element: HTMLDetailsElement, options)`** (`elements:src/browser/factories/createDetails.ts:25-160`; `elements:src/browser/types.ts:1485-1499`).
  - Options: `initial`, `accordion`, and `on`. `accordion` is a container whose open siblings close through `elements:details:deactivate`, not through the `name` attribute.
  - Events: `elements:details:show` and `hide` are cancelable, and veto a summary click by calling `preventDefault()` on the click. `open`, `close`, and `deactivate` follow (`elements:src/browser/constants.ts:390-396`).
  - `destroy` removes listeners only and leaves `open` as it is.
- **`createTabs({ trigger, pane, group }, options)`** (`elements:src/browser/factories/createTabs.ts:33-36`).
  - Writes `role="tablist"`, plain `hidden` on inactive panes, `aria-selected`, a roving `tabindex`, and `aria-controls`.
  - Options: `initial` and `on`.
  - Events: `elements:tabs:show`, `open`, `hide`, `close`, and `deactivate` (`elements:src/browser/factories/createTabs.ts:88-104`, `:127-142`; `elements:src/browser/constants.ts:504-510`).
- **`createFocus(element, options)`** (`elements:src/browser/factories/createFocus.ts:31-103`; `elements:src/browser/types.ts:1976-1990`).
  - Options: `initial` (an element, or a function of the host) and `restore` (default `true`).
  - Instance: `active`, `activate`, `deactivate`, and `destroy`.
  - Tab wraps at the first and last focusable descendants, on a document `keydown`.

### Chunk 3 CSS hooks

The following hooks are the CSS surface the clone's stylesheets read and write.

- **Dialog** (`elements:src/styles/elements/_dialog.scss:40-79`, `:208`, `:238`, `:389-451`, `:466-484`; `elements:src/styles/composables/_dialog.scss:9-113`):
  - State hooks: `[open]`, `:modal`, `::backdrop`, `:has(> :is(header, footer))`, and `:has(> form > :is(header, footer))`.
  - Element-scoped `--set-dialog-*` tokens for color, fill, border, radius, padding, type, sizes, footer and section spacing, shadow, and duration.
  - Modifier classes: `.small` (20rem), `.large` (48rem declared, 30rem rendered), `.fullscreen[open]`, and `.scrollable[open]`. `.small` collides with Bootstrap's `.small` (map:68).
- **Backdrop.** `:root` tokens `--set-backdrop-background-color` (`color-mix(in srgb, black 50%, transparent)`), `--set-backdrop-backdrop-filter` (`blur(2px)`), and the unread `--set-backdrop-transition-duration` (`elements:src/styles/surfaces/_backdrop.scss:65-69`).
- **Motion.** `--set-transition-duration` is 150ms, `--set-motion-duration` is 250ms, and `--set-motion-timing-function` is `cubic-bezier(0.32, 0.72, 0, 1)`. The `transition` mixin pairs every transition list with a reduced-motion `transition: none` (`elements:src/styles/_tokens.scss:92`, `:148-149`; `elements:src/styles/_mixins.scss:75-93`).
- **Popover and anchor** (`elements:src/styles/surfaces/_anchor-position.scss:113-177`, `:221`; `elements:src/styles/surfaces/_popover.scss:28-62`, `:73`, `:308-345`; `elements:src/styles/components/_menu.scss:435-437`, `:484-486`; `elements:src/styles/modifiers/_placements.scss:87-167`; `elements:tests/src/styles/modifiers/_placements.test.ts:24-125`):
  - Hosts: `[popover]:not(:where(aside, dialog, nav, [role='status']))` for placement, every `[popover]` for chrome, `[popover='hint'], [role='tooltip']` for the hint, and `menu[popover]` for the dropdown.
  - Placement classes: `.top`, `.bottom`, `.start`, `.end`, and the four corners, with their computed forms.
  - Anchor tokens: the gap, the fallbacks, the try order, the demanded block size (`18rem`), the inline cap (`28rem`), the default area (`block-end`), and the unread viewport inset. Panel and hint tokens are in `_popover.scss`.
- **Scrollbar and disclosure.** `*` gets `scrollbar-color`, `scrollbar-width: thin`, and `scrollbar-gutter: stable`, with `html` and `body` set to `auto` at viewports 480 px wide and under. `html` gets `interpolate-size: allow-keywords`. `::details-content` tweens `block-size`, `opacity`, and `content-visibility` (`elements:src/styles/surfaces/_scrollbar.scss:41-58`, `:83-88`; `elements:src/styles/elements/_html.scss:12-14`; `elements:src/styles/elements/_details.scss:77-90`).

## Open questions

The following questions remain open after this addendum, each with what settles it.

1. **The `@starting-style` leak on Chromium 148 and later, and the split from-state failure.** Elements asserts both without a version or a reading. One Chromium 153 reading of an open bare dialog and an open `.start` drawer, at the first frame and after the transition, settles both. This matters only if ruling 5 admits `@starting-style` for chunk 3 (contradiction 4).
2. **The demanded-size flip and the sticky flip (U3).** Neither has a reading. Chunk 3 needs one only if a bare-popover default relies on `position-try-fallbacks`.
3. **Removing an open native host from the document.** B3 must either route the removal or list it as a limit beside the written `open` (see the B3 fact on exits that fire no event).
4. **The three rulings in the contradictions table.** How far ruling 5 reaches into chunk 3 (row 4), the D-10 floor (row 5), and the user's offcanvas mapping (row 8) go into the user's decision packet (map:139).
5. **The `[hidden]` rule that G2 and G4 must override.** map:49 cites `src/bootstrap/_reset.scss:382`. At `07694f8` the rule is at `veneer:src/bootstrap/_reset.scss:533`. It is emitted only when `$reset` is false, as an unlayered `display: none !important` (`veneer:src/bootstrap/_mixins.scss:204`). Tailwind's preflight exempts until-found (`veneer:node_modules/tailwindcss/preflight.css:396-398`). G2 and G4 must re-check which style face hides the panel before D-4 rules on the fence's `!important`.
6. **Native systems outside Bootstrap's families.** The clone does form validation through the Constraint Validation API (`checkValidity()`, `reportValidity()`, `setCustomValidity()`, `validity`, and a mirrored `aria-invalid`), and plans `appearance: base-select` for selects (`elements:src/browser/factories/createForm.ts:34`, `:81-86`, `:140`, `:150`, `:228-248`, `:305-307`; `elements:src/styles/elements/_select.scss:23`). map:198 leaves both as unruled scope. The user must say whether "stage B and after" includes them.
7. **Reading groups after the fifth.** If the workflow ran reading groups after the drawer, toast, and top-layer group, they did not reach this addendum. Rerun them before the Orchestrator treats B4 and G2 to G5 as fully read.

The following work needs no engine path, so it can run in parallel with the Tailwind track without lowering the standard of any reading:

- One edit lane applies the 19 corrections to the stage B records. It touches records only.
- One read-only probe lane, shaped like P0 (a single probe file, deleted afterwards), takes open questions 1 and 2 alongside P0 on Chromium 153. While D-10 stays open, it also repeats the `position-visibility` reading on the Chromium 141 host.
- The B1 and B3 briefs take in contradiction 3, the trusted-input and event-order facts, the drag-out reading, and open question 3 before B1 starts. Writing them blocks no lane.
- The decision packet (map:139) takes open questions 4 and 6, so the user can rule on them while the Tailwind track runs.
