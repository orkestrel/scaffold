I'll read the brief and follow it exactly.The brief names thirteen unit reports. I'll read each one in full before writing the distillate.# Engine reports distillate

## Oracle facts

| Plugin | What Bootstrap's bundle did (one sentence) | Departure the old engine recorded | Citation |
| --- | --- | --- | --- |
| Collapse, Alert, Tab | Collapse, Alert, and Tab recorded no departure from Bootstrap 5.3.8. | none | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:113` |
| Tab, ScrollSpy | Tab's and ScrollSpy's load-time construction add no initial difference, because the markup carries full ARIA and both engines activate the first link. | none | `.orkestrel/veneer/engine/units/j-oracle-record-report.md:90` |
| ScrollSpy | On `click.third`, Bootstrap scrolls the spy's `top` to 544. | Veneer scrolls that `top` to 600. | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:114` |
| every plugin | No text or parent departure appears in any plugin. | none | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:109` |
| Dropdown | Bootstrap writes `data-popper-placement` as `bottom-start` on the open menu. | Veneer writes `bottom` on `click.toggle`, `press.down`, `press.down.again`, `press.toggle`, and `click.toggle.again`. | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:115` |
| Dropdown | Bootstrap leaves the `popover` attribute absent on the menu. | Veneer writes `manual` on those same open steps. | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:116` |
| Carousel | Bootstrap leaves the `pointer-event` class absent on the carousel. | Veneer has `pointer-event` on every action step. | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:117` |
| Modal | Bootstrap leaves `inert` absent on `trigger`, `static-trigger`, and `+.modal-backdrop[0]` while a modal is open. | Veneer writes an empty `inert` on `click.trigger`, `click.trigger.again`, `click.trigger.third`, `click.static`, `press.static.escape`, and `point.static.backdrop`. | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:118` |
| Modal | Bootstrap leaves `inert` absent on `static` while the other modal is open. | Veneer writes an empty `inert` on `click.trigger`, `click.trigger.again`, and `click.trigger.third`. | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:119` |
| Modal | Bootstrap leaves `inert` absent on `modal` while the static modal is open. | Veneer writes an empty `inert` on `click.static`, `press.static.escape`, and `point.static.backdrop`. | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:120` |
| Modal | With `focus: false`, a later Escape goes to the trigger and not the modal. | none | `.orkestrel/veneer/engine/units/j-oracle-record-report.md:177` |
| Offcanvas | Bootstrap leaves `inert` absent on `trigger`, `scroll-trigger`, and `scrolling` while an offcanvas is open. | Veneer writes an empty `inert` on `click.trigger`, `click.trigger.again`, and `click.trigger.third`. | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:121` |
| Offcanvas | Under reduced motion, after `point.backdrop`, Bootstrap leaves focus on `trigger`. | Veneer leaves focus on `body`. | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:122` |
| Toast | After `click.close`, `call.hide`, `call.still`, and `click.still.close`, Bootstrap leaves the `hide` class on `toast`. | Veneer leaves `hide` absent. | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:123` |
| Toast | After `click.still.close`, Bootstrap leaves the `hide` class on `still`. | Veneer leaves `hide` absent. | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:124` |
| Tooltip | Bootstrap writes `data-bs-original-title` as `Focus tip` on `focus-trigger` at every step, `initial` included. | Veneer leaves that attribute absent. | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:125` |
| Tooltip | Bootstrap leaves `popover` absent on `+.tooltip[0]`. | Veneer writes `hint` on `hover.trigger`, `focus.trigger`, and `call.show`. | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:126` |
| Popover | Bootstrap leaves `popover` absent on `+.popover[0]`. | Veneer writes `manual` on `click.trigger`, `press.trigger`, `click.away`, `click.body`, and `click.trigger.close`. | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:127` |
| Popover | Bootstrap leaves `popover` absent on `+.popover[1]`. | Veneer writes `manual` on `click.body`. | `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:128` |

## Hazards

| Id | Hazard (one sentence) | Class | Citation |
| --- | --- | --- | --- |
| C-placement | Bootstrap writes the full placement, side and alignment, and a consumer selector on the full value misses a menu that records only the side. | contract | `.orkestrel/veneer/engine/units/j-oracle-census-0925.md:13` |
| D-placement | Placement writes the resolved side alone, so `data-popper-placement` reads `bottom` where Bootstrap writes `bottom-start`. | design | `.orkestrel/veneer/engine/units/j-oracle-census-0925.md:13` |
| C-pointer | Bootstrap adds `pointer-event` only where `'ontouchstart' in document.documentElement` or `navigator.maxTouchPoints > 0`. | contract | `.orkestrel/veneer/engine/units/j-oracle-census-0925.md:15` |
| D-pointer | Veneer's `Swipe` adds `pointer-event` whenever `touch` is true. | design | `.orkestrel/veneer/engine/units/j-oracle-census-0925.md:15` |
| D-popover | The `popover` attribute (`manual` or `hint`) on a menu or a tip is the old engine's top-layer promotion. | design | `.orkestrel/veneer/engine/units/j-oracle-census-0925.md:14` |
| D-inert | `Isolation` writes `inert` on the page outside an open modal or offcanvas in place of Bootstrap's focus trap. | design | `.orkestrel/veneer/engine/units/j-oracle-census-0925.md:16` |
| C-offcanvas-focus | Bootstrap completes the offcanvas hide after its transition timer, so the backdrop press changes focus first and focus then returns to the trigger. | contract | `.orkestrel/veneer/engine/units/j-oracle-census-0925.md:17` |
| D-offcanvas-focus | Veneer's reduced-motion hide completes inside the `mousedown` listener, returns focus, and then the press's default action moves focus to `body`. | design | `.orkestrel/veneer/engine/units/j-oracle-census-0925.md:17` |
| C-toast-hide | Bootstrap keeps the `hide` class after a hide for backwards compatibility. | contract | `.orkestrel/veneer/engine/units/j-oracle-census-0925.md:18` |
| C-tooltip-title | Bootstrap's construction-time `_fixTitle` writes `data-bs-original-title` on the tooltip trigger. | contract | `.orkestrel/veneer/engine/units/j-oracle-record-report.md:90` |
| C-tooltip-compat | Bootstrap writes `data-bs-original-title` only for backwards compatibility. | contract | `.orkestrel/veneer/engine/units/j-oracle-census-0925.md:19` |
| C-scrollspy | Subtracting the spy's own `offsetTop` from the section's leaves Bootstrap's smooth-scroll destination short of the section when the spy is positioned. | contract | `.orkestrel/veneer/engine/units/j-oracle-census-0925.md:33` |
| D-scrollspy | Veneer measures the section's box and lands on the section the link names. | design | `.orkestrel/veneer/engine/units/j-oracle-census-0925.md:33` |
| C-toast-display | Under the shipped cascade a hidden toast has no display, so showing it runs no transition. | contract | `.orkestrel/veneer/engine/units/j-cascade-report.md:64` |
| C-toast-showing | A show of a toast that is already shown fades out through the `showing` token. | contract | `.orkestrel/veneer/engine/units/j-cascade-report.md:65` |
| D-factor-root | `--vn-factor-motion` rescales motion only on the root, because the tokens partial resolves `--vn-motion-feedback` there and every element inherits the already-resolved value. | design | `.orkestrel/veneer/engine/units/j-cascade-report.md:174` |
| P-class-noop | On HeadlessChrome/153.0.8010.12, `classList.add` of a present token and `classList.remove` of an absent token still run `attributeChangedCallback` and queue a mutation record. | platform | `.orkestrel/veneer/engine/units/j-sameway-report.md:17` |
| P-touch | On Chromium 153, under `touch-action: pan-y`, `touchStart`, then `touchMove` in 20 px steps, then `touchEnd` arrives as `pointerdown`, five `pointermove` events, and `pointerup` with no `pointercancel`. | platform | `.orkestrel/veneer/engine/units/j-cascade-report.md:83` |
| P-scrollbar-width | A scroll-lock measurement taken after the overflow write reads the width the hidden scrollbar leaves. | platform | `.orkestrel/veneer/engine/units/j-holders-report.md:45` |
| P-pad-right | This host's Chromium hides scrollbars, so the modal adjust's padding-right branch measures width 0. | platform | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:75` |
| P-scroll-frame | The modal's `scrollTop` writes and reflow run no synchronous consumer code, and the scroll event fires at the next frame. | platform | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:76` |
| P-focus-held | `trigger.focus()` inside `isolation.destroy()` dispatches no event when the trigger already holds focus, so that door never runs. | platform | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:32` |
| P-transform-none | A modal host at `display: none` reports its transform as `none`. | platform | `.orkestrel/veneer/engine/units/j-integration-report.md:18` |
| RC-B1 | At `63eabbd` the button removed an `aria-pressed` it never wrote, because construction had saved the host. | design | `.orkestrel/veneer/engine/units/j-release-core-report.md:6` |
| RC-nest | A `destroy` nested in the restoration's class reaction returned at once while `aria-pressed` was still unrestored, reading `[false, 'true']`. | design | `.orkestrel/veneer/engine/units/j-release-core-report.md:7` |
| RC-latch | A `destroy` that returns as soon as it is aborted leaves `aria-pressed` unrestored when the restoration's reaction calls `destroy` again. | design | `.orkestrel/veneer/engine/units/j-release-core-report.md:165` |
| RC-write | A write that changes nothing and still saves makes destruction put back a value the host already held. | design | `.orkestrel/veneer/engine/units/j-release-core-report.md:160` |
| RC-release | `release(record)` called inside that record's own release runs the release again. | design | `.orkestrel/veneer/engine/units/j-release-core-report.md:224` |
| RC-enrolled | A class destroyed directly stays enrolled in its owner lifetime until the owner releases it, and the owner's later `destroy` finds nothing to give back. | design | `.orkestrel/veneer/engine/units/j-release-core-report.md:222` |
| H1-first | The shared record omits which modal is the first holder, so a show adds `modal-open` whenever the body lacks the token. | design | `.orkestrel/veneer/engine/units/j-holders-report.md:22` |
| H1-readd | When other code removes `modal-open` while a modal still holds it, the next show adds the token back, and the last hide writes the body class the first show found. | design | `.orkestrel/veneer/engine/units/j-holders-report.md:23` |
| H1-body | A body element replaced between two shows gets its own open-token record. | design | `.orkestrel/veneer/engine/units/j-holders-report.md:24` |
| H1-base | On the base sources the later-modal pinning case left the body class `page` where the restored class list was `page` plus `modal-open`. | design | `.orkestrel/veneer/engine/units/j-holders-report.md:27` |
| H2-newest | The shared record keeps the first saved value and writes it only at the last release, so it cannot express a newest isolation claim or hand an element to the newest claim left. | design | `.orkestrel/veneer/engine/units/j-holders-report.md:33` |
| H2-order | Isolation destruction does every hand-off and then one restore, and the write order across elements differs from the old per-element snapshots. | design | `.orkestrel/veneer/engine/units/j-holders-report.md:34` |
| H3-measure | Only the first scroll lock's measurement decides which targets exist, a later lock's selectors can differ, and routing each lock through the shared record would measure and write once per lock. | design | `.orkestrel/veneer/engine/units/j-holders-report.md:46` |
| H5-signal | A scroll lock refused for a missing body still runs its abort listener if that listener stays on the signal. | design | `.orkestrel/veneer/engine/units/j-holders-report.md:61` |
| H5-present | A color-mode persist failure during construction puts back an absent root reading and leaves a present `light` reading unrestored. | design | `.orkestrel/veneer/engine/units/j-holders-report.md:63` |
| H5-identity | A color-mode persist failure that rethrows a copy fails an identity check against the original error. | design | `.orkestrel/veneer/engine/units/j-holders-report.md:64` |
| S-delegate | Destroying a delegated tab left the profile control `nav-link active`, home at `tabindex="-1"`, and `#profile` with `active` and `show`. | design | `.orkestrel/veneer/engine/units/j-snapshot-shared-report.md:18` |
| S-tab | The direct two-tab destruction left tab A with an empty class and `tabindex="-1"` while tab B stayed `active`. | design | `.orkestrel/veneer/engine/units/j-snapshot-shared-report.md:18` |
| S-carousel | A live carousel replacement lost `pointer-event`. | design | `.orkestrel/veneer/engine/units/j-snapshot-shared-report.md:18` |
| S-swipe | The swipe host's class list was `carousel` where the shared record required `carousel` and `pointer-event`. | design | `.orkestrel/veneer/engine/units/j-snapshot-shared-report.md:18` |
| S-tablist | Destroying one tab of a list cleared `tablist` while a sibling tab was still live. | design | `.orkestrel/veneer/engine/units/j-snapshot-shared-report.md:27` |
| S1-last | Separate snapshots of one target wrote a later save back; the shared record writes the first save only when the last holder restores. | design | `.orkestrel/veneer/engine/units/j-snapshot-shared-report.md:24` |
| S3-alert | With the shared record landed and `Alert` still holding through a completed close, the host class list came back as `alert fade show`. | design | `.orkestrel/veneer/engine/units/j-snapshot-shared-report.md:26` |
| S5-id | Destroying the engine that saved `aria-describedby` first strips the live engine's id, reading `help` where the live value was `help vn-popover-1`. | design | `.orkestrel/veneer/engine/units/j-snapshot-shared-report.md:18` |
| S5-silent | With a live popover, the shared `anchor-name` record silences the placement teardown's writes to the trigger, so a destroy nested inside a hide is unobserved. | design | `.orkestrel/veneer/engine/units/j-snapshot-shared-report.md:28` |
| S-clear | A `clear()` that interrupts a restoration skips the pending removal of a class attribute the restoration had emptied. | design | `.orkestrel/veneer/engine/units/j-snapshot-shared-report.md:63` |
| SW-A2 | A show that forgets an early shown token the host later removes finishes shown, with the base reading `display` empty and `open` false. | design | `.orkestrel/veneer/engine/units/j-sameway-report.md:22` |
| SW-A3 | A show a pre-change listener supersedes or prevents still wrote the outer token and the `shown` events when the identity comparison was dropped. | design | `.orkestrel/veneer/engine/units/j-sameway-report.md:23` |
| SW-A4 | A returning step that re-reads identity at each write rewrites `style`, `aria-hidden`, `aria-modal`, `role`, and the backdrop after a nested change has started. | design | `.orkestrel/veneer/engine/units/j-sameway-report.md:24` |
| SW-A5 | An interrupted backdrop show still writes its shown token unless the owner is read after the insertion. | design | `.orkestrel/veneer/engine/units/j-sameway-report.md:25` |
| SW-A5-alt | Under `fade`, a nested hide waits for the host fade before `backdrop.hide()`, so the interrupted show still writes `modal-backdrop fade show`. | design | `.orkestrel/veneer/engine/units/j-sameway-report.md:34` |
| SW-A6 | The hide's closing backdrop destruction runs consumer code, and without a door after it the base still dispatched `hidden` after the engine was destroyed. | design | `.orkestrel/veneer/engine/units/j-sameway-report.md:26` |
| SW-unread | A call reads the shown token only right after its pre-change event or at its own token step, so a token added partway through and removed before that step is unread and the call writes the token itself. | design | `.orkestrel/veneer/engine/units/j-sameway-report.md:54` |
| SW-backdrop | A hide stopped at the closing destruction writes `display` and ARIA back and cannot bring back the backdrop it just destroyed. | design | `.orkestrel/veneer/engine/units/j-sameway-report.md:55` |
| MS-seed | On `Modal.show`, the seed interval is the only place the path reads its change identity after consumer code has run. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:85` |
| MS-1 | A nested `show` started from the sibling `inert` release inside `isolation.destroy()` ends with the host shown and no backdrop, because the stale `#rehide` destroys that backdrop. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:25` |
| MS-2 | When `backdrop` is false, `#rehide` writes `display: none`, `aria-hidden`, and clears `aria-modal` and `role` over a show that already completed inside the reaction. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:26` |
| MS-3 | A nested `show` from the trigger `focus` listener during `isolation.destroy()` ends with the host shown and no backdrop. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:27` |
| MS-68 | A nested `show` from restoring a host that already carried `inert` ends with the host shown and no backdrop. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:28` |
| MS-4 | After a nested `hide` from the sibling release, the stale `#rehide` writes `aria-hidden` again and destroys the backdrop. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:29` |
| MS-5 | `Isolation.destroy` keeps restoring the remaining claims after the modal is destroyed, so `inert` still changes on the fixed element and the button after `destroy()`. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:30` |
| MS-6 | `#rehide` writes the hidden `display` and `aria-hidden` over a host that has taken the `show` token back, and leaves `modal-open` and the lock held. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:31` |
| MS-9 | A toward-token reaction at `show.vn.modal` leaves the host carrying `show` with nothing else written. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:42` |
| MS-12 | A toward-token reaction to the scroll lock's fixed padding write leaves the host on `show` without `display` after `lock.destroy()` returns false. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:43` |
| MS-64 | A toward-token reaction to the scroll lock's sticky margin write leaves the same `show` without `display`. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:44` |
| MS-13 | A toward-token reaction to the body overflow write releases the lock and leaves the host on `show` without `display`. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:45` |
| MS-65 | A nested `show` during the stopped path's lock restoration completes with a fresh lock, and `HostSnapshot` hands the lock values still to restore to that nested lock's snapshot. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:46` |
| MS-67 | The rest of `HostSnapshot.restore` from `ScrollLock.destroy` keeps writing `body` and fixed-element style after the owner is destroyed. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:47` |
| MS-17 | A toward-token reaction at `#holdOpen` returns false and leaves `modal-open` and the lock held. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:48` |
| MS-19 | A toward-token reaction to the adjust's padding-left write leaves the host on `show` without `display` and the lock held. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:49` |
| MS-22 | A toward-token reaction at the `backdrop.show()` await leaves a shown backdrop behind a host that has `show` and no display. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:50` |
| MS-24 | On a fading backdrop, a toward-token reaction then a `hide` is refused while the change is in flight and leaves `modal-backdrop fade show`. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:51` |
| MS-26 | A toward-token reaction in the host's `connectedCallback` during `body.append` leaves a shown backdrop behind the host. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:52` |
| MS-28 | A toward-token reaction to the `display: block` write leaves `display: block` with `aria-hidden`, no dialog ARIA, and a shown backdrop. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:53` |
| MS-32 | A toward-token reaction to the `aria-modal` write leaves the open host without `role`. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:55` |
| MS-34 | A toward-token reaction to the `role` write leaves the host shown except for isolation, focus, and `shown`. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:56` |
| MS-53 | A toward-token reaction to `#rehide`'s `display: none` revert leaves the host on `show` with `display: none`. | design | `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:63` |
| INT2 | A hide the host takes over during the backdrop fade leaves a fading backdrop at opacity 0 and an unfaded backdrop at opacity 1. | design | `.orkestrel/veneer/engine/units/j-integration-report.md:19` |
| INT5 | A reaction to the backdrop insertion leaves `aria-modal="true"` on the host after destruction. | design | `.orkestrel/veneer/engine/units/j-integration-report.md:21` |
| INT-move | `Backdrop.show` moves a backdrop its parent already holds, so an offcanvas hide taken over after the fade starts records stale backdrop children until `show` skips that append. | design | `.orkestrel/veneer/engine/units/j-integration-report.md:22` |
| INT-remove | A reaction inside the modal backdrop removal writes the body class twice more after the hide should have stopped. | design | `.orkestrel/veneer/engine/units/j-integration-report.md:22` |
| INT-insert | A reaction inside backdrop insertion that destroys the backdrop still leaves the class list `modal-backdrop show`. | design | `.orkestrel/veneer/engine/units/j-integration-report.md:22` |
| INT-stopped-show | A show the host stopped leaves a shown backdrop behind a hidden modal or panel. | design | `.orkestrel/veneer/engine/units/j-integration-report.md:41` |
| INT-removal | A takeover inside the backdrop removal leaves the modal or panel shown with no backdrop, because the door stops the hide after the removal has already run. | design | `.orkestrel/veneer/engine/units/j-integration-report.md:42` |
| INT-display | A modal hide stopped at the `display` write leaves the host at `display: none` while it still carries `show`. | design | `.orkestrel/veneer/engine/units/j-integration-report.md:43` |
| M-cut | At `0865c67`, when the dialog's hide transition outlasts the host, the `display: none` write cuts that transition off and it is still unfinished at `hidden`. | design | `.orkestrel/veneer/engine/units/j-motion-proofs-a-report.md:85` |
| D-swipe | Veneer `Swipe` listens only for `pointerdown`, `pointerup`, and `pointercancel`, accepts touch and pen, ignores mouse, reports a direction only when `pointerup` moves farther than 40 px, drops `pointercancel` with no call, and `Toast` never constructs it. | design | `.orkestrel/veneer/engine/units/j-toast-swipe-terrain.md:41` |

## Proof lessons

- The oracle puts both stylesheets and both scripts in one page as deferred head scripts, compiles Veneer at run time with `srcBrowser()` into an IIFE global named `veneer`, and uses `write: false` so the recording never reads `dist`. `.orkestrel/veneer/engine/units/j-oracle-record-report.md:43`
- A recorded state counts as settled only when the readings agree, no finite animation runs, and no scroll position moves, for longer than the page's longest declared transition plus 50 ms, and the recorder never reads an engine completion event. `.orkestrel/veneer/engine/units/j-oracle-record-report.md:44`
- An element written in the markup is labelled by its id, an element an engine inserts is labelled `+<selector or tag>[n]`, the scenario markup is parsed in a `template`, and the recorder refuses any element without an id. `.orkestrel/veneer/engine/units/j-oracle-record-report.md:45`
- A function passed to `evaluate` survives only when its body names its parameters and page globals; an imported name is rewritten to a Vite SSR import binding and throws `ReferenceError`. `.orkestrel/veneer/engine/units/j-oracle-record-report.md:91`
- The contended modal case took 11259 ms and the isolated case 11117 ms, so `PLUGIN_ORACLE_TIMEOUT` is 27518, twice that duration plus 5000 ms, because the settle spans dominate the run. `.orkestrel/veneer/engine/units/j-oracle-record-report.md:92`
- Each oracle mutation is planted by a Vite transform on the in-memory compile, the sources stay unwritten, and a kill is an assertion that the departure list is not empty. `.orkestrel/veneer/engine/units/j-oracle-record-report.md:111`
- An equivalent spelling of the same `aria-expanded` write is held, a throw inside the trigger write is refused, and a plant that names a span the file lacks fails the build and is refused. `.orkestrel/veneer/engine/units/j-oracle-record-report.md:126`
- The scrollspy mutation that skipped only the activation's clearing loop read held, because each section leaves the root before the next activates and the leave path clears the same token. `.orkestrel/veneer/engine/units/j-oracle-record-report.md:131`
- The boundary control proves an inline style write produces no departure row, while a `data-oracle` attribute write does. `.orkestrel/veneer/engine/units/j-oracle-record-report.md:105`
- Every lookup by label is an own-property lookup. `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:15`
- On round 1's source an authored `__proto__` label failed `Object.is` and a `constructor` label failed because `own.classes` was not iterable. `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:90`
- `reportPluginPage` is the one in-page evaluation that both `readPluginState` and `settlePluginState` use. `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:80`
- A killing plant beside a suite that fails to collect reads `REFUSED`, not `KILLED`. `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:101`
- An empty own text and a missing parent are left out of an element. `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:190`
- The document's scroll is recorded on its scrolling element, `html`. `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:191`
- The modal-show sweep nests one reaction in one door, and a row that breaks its end-state invariant is incoherent. `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:10`
- A nested show must leave the `show` token, `display: block`, no `aria-hidden`, `aria-modal="true"`, `role="dialog"`, one shown backdrop, `modal-open`, `overflow: hidden`, a padded body, and `shown.vn.modal` last. `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:11`
- The stale-write observer starts just before the nested call, counts writes to `class`, `aria-hidden`, `aria-modal`, and `role` plus backdrop removals, and allows the nested change at most one write of each. `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:15`
- That observer stays silent on the `#rehide` nested-show rows MS-50 through MS-60, and starting it immediately before the nested call keeps writes over values already present from being counted. `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:17`
- No sweep row failed on timing. `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:8`
- A fresh backdrop holds no element at insertion, and a reused backdrop on this show path returns at its first guard, so the backdrop-insertion reaction cannot occur on the show path. `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:74`
- Nothing is awaited after `new Isolation`, so its `MutationObserver` delivers after `show` has completed. `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:77`
- `#refused` refuses a nested `show` or `hide` while `#changing` is true, and no row found a way past it. `.orkestrel/veneer/engine/units/j-reentry-sweep-modal-show-report.md:79`
- The holders instrument counts a kill only when the failure message opens with `AssertionError`, and it reads every other failure as `REFUSED`. `.orkestrel/veneer/engine/units/j-holders-report.md:118`
- The platform exposes no list of a signal's listeners, so the refused-lock proof observes the listener through `recordCalls` on `AbortController.prototype.abort`. `.orkestrel/veneer/engine/units/j-holders-report.md:122`
- The cascade instrument refuses a kill when the case is not collected, the file reports a suite-level error, or the failure names `ReferenceError`, a `TypeError` of the form not defined, not a function, or not a constructor, `SyntaxError`, a transform or import failure, or a sass compile error. `.orkestrel/veneer/engine/units/j-cascade-report.md:123`
- The engines wait on whatever the platform's `getAnimations()` reports. `.orkestrel/veneer/engine/units/j-cascade-report.md:58`
- A stand-in sheet that omits `.toast:not(.show) { display: none }` and the `.showing` rule lets a hidden toast be displayed, so the fade proof has to load the shipped cascade. `.orkestrel/veneer/engine/units/j-cascade-report.md:64`
- The reduced-motion toast case mounts a shown toast, because a hidden toast would pass without ever reaching a fade. `.orkestrel/veneer/engine/units/j-cascade-report.md:66`
- At motion factor 0, `transitionDuration` reads `0s`, no animation runs, and the completed event arrives. `.orkestrel/veneer/engine/units/j-cascade-report.md:73`
- At motion factor 4, `transitionDuration` reads `0.6s` and the animation timing reads 600, and one frame later `playState` is `running` while the completed event has not arrived. `.orkestrel/veneer/engine/units/j-cascade-report.md:74`
- The running transition is read from `getAnimations()[0]` and `effect.getComputedTiming().duration`, then one `waitForFrame()`, because `await transition.ready` under the wait mutation rejects with `AbortError` before any assertion runs. `.orkestrel/veneer/engine/units/j-cascade-report.md:169`
- A factor set on the host does not reach the fade; the proof sets `--vn-factor-motion` on `:root` and clears that sheet after the case. `.orkestrel/veneer/engine/units/j-cascade-report.md:165`
- Durations in the modal, offcanvas, backdrop, and alert proofs are read from the running animations. `.orkestrel/veneer/engine/units/j-motion-proofs-a-report.md:30`
- The alert motion-factor proof asserts the ratio of the slow alert's durations at factor 4 and factor 1. `.orkestrel/veneer/engine/units/j-motion-proofs-a-report.md:45`
- Under staged reduced motion the offcanvas proof expects no animation on the panel or the backdrop at show or at hide. `.orkestrel/veneer/engine/units/j-motion-proofs-a-report.md:38`
- Offcanvas's existing waits already cover both duration orders at `0865c67`, and removing the backdrop wait from show or from hide fails the backdrop row. `.orkestrel/veneer/engine/units/j-motion-proofs-a-report.md:87`
- Unconverted modal proofs in a plant that moves the fade to 0.25 s fail `expected '0.25s' to be '0.15s'`. `.orkestrel/veneer/engine/units/j-motion-proofs-a-report.md:102`
- `readDuration` reads the longest declared transition in milliseconds before any change, starts nothing, and names no property. `.orkestrel/veneer/engine/units/j-motion-proofs-a-report.md:128`
- `sampleTransition` requires a property name, and naming one would pin the transitioned property. `.orkestrel/veneer/engine/units/j-motion-proofs-a-report.md:133`
- One trusted click on a modal trigger nested in an offcanvas trigger drives `show.vn.modal` and `hide.vn.offcanvas`, and keying `#mark` to one route swaps that pair for two modal events. `.orkestrel/veneer/engine/units/j-integration-report.md:20`
- Only the backdrop insertion let a stale change finish; nothing runs inside the token writes of a plain `div`, and an observer runs inside the wait whose door follows. `.orkestrel/veneer/engine/units/j-integration-report.md:29`

## Native probe readings

- On Chromium 153.0.8010.12 the corrected collapse instrument reads `transition=height` for every collapse fixture, the Bootstrap-sequenced hide midpoint runs a real transition, and a `finish()`-completed row matches the static panel at `66px` content-box height against a `60px` scroll height plus `3px` borders on each side, for both the pixel path and the `calc-size()` path. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:45`
- On Chromium 153.0.8010.12 the show midpoint reads `transition=height` and `height=48.1406px`. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:21`
- On Chromium 153.0.8010.12 the pixel hide midpoint reads `transition=height` and `height=11.8438px`. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:22`
- On Chromium 153.0.8010.12 the `calc-size()` hide midpoint reads `transition=height` and `height=11.8438px`. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:23`
- On Chromium 153.0.8010.12 `control.transitionProperty.opacity` reads the computed value as the string `opacity`. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:51`
- On Chromium 153.0.8010.12 `control.completion.static` reads `rectHeight=66` against `scrollHeight=60`. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:24`
- On Chromium 153.0.8010.12 the matched-width arrow control reads `delta=3.00`, over the 1 px bound. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:29`
- On Chromium 153.0.8010.12 the anchored arrow reads `referenceCentre=20.00`, `arrowCentre=43.00`, and `delta=23.00`. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:30`
- On Chromium 153.0.8010.12 the control with no anchor reads `referenceCentre=20.00`, `arrowCentre=172.00`, and `delta=152.00`. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:31`
- On this Chromium 153 build, native `justify-self: anchor-center` does not centre the arrow on the anchor to the precision Placement's adoption would need, on the offset case or the matched-width control. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:46`
- On Chromium 153.0.8010.12 `V.support` reads `true`. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:32`
- On Chromium 153.0.8010.12 `V.clip.dropdown` stays `:popover-open` across the clip and the restore, the hit test leaves the overlay while clipped and returns after the scroll is restored, Escape leaves it open, `hide()` closes it, and a later `show()` returns false. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:33`
- On Chromium 153.0.8010.12 `V.partial` reads that same flag set. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:34`
- On Chromium 153.0.8010.12 `V.tooltip` reads that same flag set. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:38`
- On Chromium 153.0.8010.12 `V.popover` reads that same flag set. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:39`
- On Chromium 153.0.8010.12 `V.viewport` keeps `clippedHitIsOverlay` true and reads `restoredHitIsOverlay` false. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:35`
- On Chromium 153.0.8010.12 the viewport overlay's rect moves with the page scroll, so the clipped hit still lands on it, and the fixed-position anchor recompute after the scroll returns does not resolve back to the pre-scroll point. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:47`
- On Chromium 153.0.8010.12 scrolling the reference out leaves `:popover-open` true, so native suppression does not close the popover. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:47`
- On Chromium 153.0.8010.12 Escape after restoration leaves the popover open, an explicit `hide()` closes it, and a second `show()` returns false because `destroy()` already ran. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:47`
- On Chromium 153.0.8010.12 `V.focus` reads `focusedBefore=true`, `focusedDuringClip=true`, and `activeDuringClip=A`. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:36`
- On Chromium 153.0.8010.12 the platform keeps focus on the clipped entry. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:47`
- On Chromium 153.0.8010.12 `V.events` reads `duringClip=[]`, so no `.bs.dropdown` event fires from the scroll alone. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:37`
- On Chromium 153.0.8010.12 `V.control.always` reads `clippedOpen=true` and `clippedHitIsOverlay=false`. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:40`
- On Chromium 153.0.8010.12 a scrolled-out reference fails the overlay hit test under `position-visibility: always` as well as under `anchors-visible`, so this hit test does not separate the two rules. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:54`

## Unknowns

- `log not in scope` — `tmp/probe/` and `tmp/j-oracle/` logs and `census/`. `.orkestrel/veneer/engine/units/j-oracle-record-report.md:20`
- `log not in scope` — `tmp/j-oracle/contended.sh`. `.orkestrel/veneer/engine/units/j-oracle-record-report.md:92`
- `log not in scope` — `tmp/j-oracle/controls-red.log.txt`, including the prevented-show block at log lines 111–292. `.orkestrel/veneer/engine/units/j-oracle-record-report.md:103`
- `log not in scope` — `tmp/j-oracle/mutations.log.txt`. `.orkestrel/veneer/engine/units/j-oracle-record-report.md:109`
- `log not in scope` — `mutations-1.log.txt`. `.orkestrel/veneer/engine/units/j-oracle-record-report.md:131`
- `log not in scope` — `tmp/j-oracle/round2-red-labels.log.txt`. `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:85`
- `log not in scope` — `tmp/j-oracle/round1-classify.log.txt`. `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:96`
- `log not in scope` — `round2-refresh.log.txt`. `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:105`
- `log not in scope` — `tmp/j-oracle/mutations.log.txt` for the round-2 plant. `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:130`
- The fixtures come from Chromium 153 only. `.orkestrel/veneer/engine/units/j-oracle-record-report-2.md:196`
- `log not in scope` — `units/j-oracle-record-census/`. `.orkestrel/veneer/engine/units/j-oracle-census-0925.md:3`
- The styles session's Chromium 141 run was still outstanding. `.orkestrel/veneer/engine/units/j-oracle-census-0925.md:25`
- The scrollspy scenario cannot separate the activation's clearing from the leave path's clearing; the overlapping-section witness was not in these recordings. `.orkestrel/veneer/engine/units/j-oracle-census-0925.md:22`
- `log not in scope` — `units/j-concerns-a-audit-objective-verdict.md`, cited for the offset-parent comparison, which these recordings do not measure. `.orkestrel/veneer/engine/units/j-oracle-census-0925.md:23`
- `log not in scope` — `tmp/j-release-core/mutations.log.txt`. `.orkestrel/veneer/engine/units/j-release-core-report.md:150`
- `log not in scope` — the release-core logs, mutation script, and input under the worktree `tmp/j-release-core/`. `.orkestrel/veneer/engine/units/j-release-core-report.md:230`
- `log not in scope` — `tmp/j-holders/mutations.log.txt`. `.orkestrel/veneer/engine/units/j-holders-report.md:66`
- `log not in scope` — `tmp/j-holders/acceptance.log.txt`. `.orkestrel/veneer/engine/units/j-holders-report.md:81`
- `log not in scope` — `tmp/j-holders/suite-browser.log.txt`. `.orkestrel/veneer/engine/units/j-holders-report.md:100`
- `log not in scope` — `alternative.log.txt`. `.orkestrel/veneer/engine/units/j-sameway-report.md:34`
- `log not in scope` — `mutations.log.txt` retained as `j-sameway-mutations.log.txt`. `.orkestrel/veneer/engine/units/j-sameway-report.md:44`
- The sameway report asks for a ruling on the unread mid-show token; that ruling is not in these reports. `.orkestrel/veneer/engine/units/j-sameway-report.md:54`
- The sameway report asks for a ruling on the hide stopped at the closing destruction; that ruling is not in these reports. `.orkestrel/veneer/engine/units/j-sameway-report.md:55`
- Nothing measured the planner's entrance-motion sentence, so it was not written. `.orkestrel/veneer/engine/units/j-sameway-report.md:59`
- `log not in scope` — `tmp/j-snapshot-shared/mutations.log.txt`. `.orkestrel/veneer/engine/units/j-snapshot-shared-report.md:48`
- `Tooltip`'s `#linked` destroy nested inside a hide's placement teardown has no case. `.orkestrel/veneer/engine/units/j-snapshot-shared-report.md:63`
- `log not in scope` — `j-integration-evidence/`. `.orkestrel/veneer/engine/units/j-integration-report.md:3`
- The in-place backdrop show had no pre-fix red run. `.orkestrel/veneer/engine/units/j-integration-report.md:22`
- INT4 stopped: adding `HostSnapshotAttribute` failed the guide's barrel-export check, and `typeof this.#joined` fails `TS1003`; the report leaves the repetition in place as a hypothesis. `.orkestrel/veneer/engine/units/j-integration-report.md:37`
- `log not in scope` — `int4-probe.log.txt` and `int4-typeof-probe.log.txt`. `.orkestrel/veneer/engine/units/j-integration-report.md:37`
- `log not in scope` — `tmp/j-cascade/standins-base.log.txt`. `.orkestrel/veneer/engine/units/j-cascade-report.md:22`
- The three toast failures after the shipped-cascade swap had their messages overwritten by the later green run. `.orkestrel/veneer/engine/units/j-cascade-report.md:63`
- `log not in scope` — `tmp/j-cascade/mutations.log.txt`. `.orkestrel/veneer/engine/units/j-cascade-report.md:85`
- The anchor-centre miss on Chromium 153.0.8010.12 is not isolated past the candidates `position-area`'s asymmetric containing block and a platform limit. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:56`
- The clip rows do not by themselves prove `anchors-visible` suppresses rendering, because `V.control.always` produces the same `clippedHitIsOverlay: false`. `.orkestrel/veneer/engine/units/j-native-probe-report-2.md:58`
- No `lostpointercapture` listener is present in either product's `createPointer`, no Elements test drives the gesture, no Mailbox test covers `pointercancel`, a vertical lock, or a non-mouse `pointerType`, and whether Mailbox's inline opacity fights `.toast[popover]:popover-open { opacity: 1 }` during the drag is not asserted. `.orkestrel/veneer/engine/units/j-toast-swipe-terrain.md:47`