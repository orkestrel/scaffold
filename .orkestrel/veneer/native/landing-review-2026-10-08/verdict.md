# Landing review verdict: 9f56e6a..45f60fa

**Outcome:** the landing branch must not reach main yet. Ten behavior defects of high or medium severity block it. They fall into 4 fix units: the copier fallback, boot containment, the drag controller, and the wake controller. Three later units add proofs that are too weak today. A final unit repairs the guide prose. Those 4 later units can land after main.

The review covers 31 standing findings. Four of them restate another finding, and each is merged into its twin:
- `proofs-wake-visibility-recovery-unproved` repeats `wake-3`.
- `proofs-touch-session-listener-leak-unpinned` repeats `d26-touch-4`.
- `prose-1` repeats `d25-group-2`.
- `prose-2` repeats `wake-4`.

Part (b) of `prose-5` also repeats `d26-touch-3`. Five findings are refuted, and the last table lists them.

Every line number in this verdict refers to commit 45f60fa. The checkout HEAD is 9e0cd87, two commits later, and in its `guides/veneer.md` file the drag and departure sections sit 35 lines further down. The Chromium internals the copier findings rely on come from Blink source, not from a run, because this review ran no tests.

## Unit order and blocking

Run the units in the order of the following table. Units that share a file set run one after another, so each file set has one writer at a time.

| Unit | Owns | Blocks main | Runs after |
| --- | --- | --- | --- |
| U1 Copier fallback | `src/browser/copiers/Copier.ts`, `tests/src/browser/copiers/Copier.test.ts` | Yes | (first) |
| U2 Boot containment | `src/browser/Veneer.ts`, `tests/src/browser/Veneer.test.ts` | Yes | (first) |
| U3 Drag behavior | `src/browser/drags/Drag.ts`, `src/browser/drags/types.ts`, `tests/src/browser/drags/Drag.test.ts`, `tests/src/browser/drags/plugins.test.ts` | Yes | (first) |
| U4 Pressed state and wake errors | `src/browser/wakes/Wake.ts`, `src/browser/wakes/plugins.ts`, `src/browser/fullscreens/plugins.ts`, `tests/src/browser/wakes/Wake.test.ts`, `tests/src/browser/wakes/plugins.test.ts`, `tests/src/browser/fullscreens/plugins.test.ts` | Yes | (first) |
| U5 Copier proofs | U1's files | No | U1 |
| U6 Drag proofs | U3's files | No | U3 |
| U7 Wake proofs | U4's wake test files | No | U4 |
| U8 Guide prose | `guides/veneer.md`, `tests/guides.test.ts` | No | U1 to U7 |

U8 runs last because it describes the behavior and proofs that U1 to U7 leave behind. If a proof unit retitles a case that the guide cites by title, it must hand that citation to U8. It must not edit the guide itself.

## U1: Copier selection fallback (blocks)

U1 owns `src/browser/copiers/Copier.ts` and `tests/src/browser/copiers/Copier.test.ts`. It closes 2 findings.

**m1-engine-1 (high).** When an open Modal (`Modal.ts:211`) or Offcanvas (`Offcanvas.ts:173`) has activated a `Trap` and the clipboard API is absent or rejects, the copier reports success while the clipboard stays unchanged. The `#copySelection` method appends its textarea to `document.body` (line 102), which is outside the trap container. In Chromium, `textarea.select()` (line 103) focuses the textarea. The trap's document `focusin` handler (`Trap.ts:50` and `Trap.ts:75-85`) then moves focus back into the panel. That focus change clears the frame selection anchored in the textarea. `document.execCommand('copy')` (line 104) then runs with nothing selected and still returns true. Lines 66-67 therefore emit `result.vn.copier` with `{ text }` and no error.

Fix: insert the textarea next to the host (`element.after(textarea)`), so it sits inside any container that holds the host. Also make `#copySelection` return false when `document.activeElement` isn't the textarea after `select()`.

Write this test first: `copies through the selection fallback inside an active focus trap`, in `Copier.test.ts`. Its steps are the following:
1. Seed the top clipboard with `writeText('Stale clipboard')`.
2. Build an iframe whose srcdoc holds `<div id="panel" tabindex="-1"><pre>Trapped copy</pre><button>Copy</button></div>` plus a `<p>` outside the panel.
3. Set the frame's `navigator.clipboard` to undefined, as line 147 does.
4. Construct `new Trap(panel)` in the frame and call `activate()` on it.
5. Create the copier on the `pre` element with a result recorder, and bind the button's click to `copier.copy()`.
6. Click the button with a CDP `Input.dispatchMouseEvent` pressed and released pair, as the case at line 10 does. Wait for 1 result.
7. Click a top-level paste textarea, press Control+V, and assert that the paste reads `Trapped copy` and that the result detail equals `{ text: 'Trapped copy' }`.

At 45f60fa, Blink's source predicts that step 7 fails: the paste reads `Stale clipboard` while the result still reports success.

**m1-engine-2 (medium).** This defect is limited to the selection fallback, which runs when the clipboard API is absent or `writeText` rejected while transient activation remains. On that path, `#copySelection` returns the boolean from `execCommand('copy')` (line 104). That call returns true even when a page listener on the native `copy` event cancels it, with or without calling `setData`. The event bubbles from the off-screen textarea to that listener. Lines 66-67 then emit `result.vn.copier` with `{ text }` and no error, while the clipboard is unchanged, empty, or holds the listener's data. The `writeText` path is unaffected because it fires no `copy` event.

Fix: before calling `execCommand`, register a one-shot bubble-phase `copy` listener on the frame window, and return false when that listener sees `defaultPrevented`. The existing failure branch then reports the original error.

Write this test first: `reports refusal when a page copy listener cancels the selection fallback`, in `Copier.test.ts`. Its steps are the following:
1. Reuse the frame fixture of the case at line 133, where `navigator.clipboard` is undefined.
2. Add `root.addEventListener('copy', (event) => event.preventDefault())` in the frame document.
3. Click Copy with the CDP pressed and released pair, then wait for 1 result.
4. Assert that `detail.error` is a frame `DOMException` named `NotAllowedError`.
5. Paste into a top-level textarea and assert that the value isn't the host text.

At 45f60fa, step 4 fails: the detail is `{ text }` with no error.

## U2: Boot selector containment (blocks)

U2 owns `src/browser/Veneer.ts` and `tests/src/browser/Veneer.test.ts`. It closes 1 finding.

**m1-engine-3 (medium).** A plugin's boot selector has no per-plugin failure boundary. When a plugin's `boot.selector` makes `querySelectorAll` (line 228) or `matches` (line 229) throw, `#boot` (lines 218-221) catches the error once, reports it, and stops `#initialize`. Every later plugin skips its boot entries, while earlier plugins have already booted. The scope stays live and keeps routing. Routes, by contrast, isolate the same failure per route (line 194, pinned by `isolates selector failures from later routes: %s` at line 133). The guide at line 727 says that initialization continues "with the remaining hosts and plugins". Only a consumer plugin can trigger this defect, because the built-in plugins use fixed selectors.

Fix: wrap each plugin's host query in its own attempt. On failure, report the error and continue with the next plugin.

Write this test first: `isolates boot selector failures from later plugins: %s`, in `Veneer.test.ts`, run over `['[', '.never-matches']`. Its steps are the following:
1. Append a host `<div>` holding `<button data-notice>Host</button>`.
2. Add a capture-phase window `error` listener that records `event.error` and calls `preventDefault`, following lines 139-147.
3. Build the first plugin with `buildEnginePlugin({ name: 'broken', boot: { selector } })`.
4. Build the second plugin with `buildEnginePlugin({ name: 'notice', boot: { selector: '[data-notice]' } })`.
5. Call `createVeneer(host, { plugins: [first.plugin, second.plugin] })`.
6. Expect the second plugin's creation count to be 1.
7. Expect 1 recorded `SyntaxError` for `'['` and none for `.never-matches`.
8. Expect `scope.destroyed` to be false.

At 45f60fa, step 6 fails for `'['`, because the count is 0.

## U3: Drag behavior (blocks)

U3 owns `src/browser/drags/Drag.ts`, `src/browser/drags/types.ts`, `tests/src/browser/drags/Drag.test.ts`, and `tests/src/browser/drags/plugins.test.ts`. It closes 5 blocking findings. One low-severity finding, `d26-touch-6`, rides along because U3 rewrites the code it pins.

**d26-touch-1 (medium).** While a touch or pen session holds item X in host A, `#owner()` (line 135 and lines 139-148) treats that session as the source of any native drag. `#target` (lines 363-392) never checks whether the owner's session is native. This has three effects:
- An external file or text drag over A, or over a host in A's group, gets `preventDefault` and the `move` drop effect, and its drop moves X.
- A mouse drag of item Y from host B dropped on A moves X instead of Y.
- On a third group host, the first holder in document order wins.

`owner.#finish(true)` then ends A's touch session while the finger is still down. This breaks the guide's statement at line 1638 that the pointer path "refuses external text and files".

Fix: add `!this.#touch` to the test at line 135, and skip an owner whose `#touch` is set in the group scan.

Write this test first: `refuses an external file drag over the host while a touch session holds an item`, in `Drag.test.ts`. Its steps are the following:
1. Render `renderTouchList()` and boot it with `createDragPlugin()`.
2. Start a CDP touch session with `touchStart` on the first grip, then a `touchMove` past `DRAG_SLOP`. Wait for `data-vn-dragging`.
3. With the finger still down, dispatch a cancelable `dragenter` and then `dragover` on the third item. Each carries a `DataTransfer` that holds a `File`.
4. Assert that `dragover.defaultPrevented` is false and that no item carries `data-vn-insert`.
5. Dispatch `drop` with the same `DataTransfer`.
6. Assert that no `move` or `end` event fired, that the order is unchanged, and that the host still has capture.
7. Send `touchEnd`.

At 45f60fa, steps 4 and 6 fail.

**d26-touch-2 (medium).** `#scroll` (lines 295-323) runs only on the touch and pen path, and it fails in two ways:
- It sends both axes' steps to the single nearest container that overflows on either axis (lines 299-311), and no step falls through to an outer scroller or to the viewport.
- It builds the box from the container's unclipped client rectangle (lines 313-320). The `DragScrollInput.box` TSDoc (`types.ts` line 30) promises "the container's visible rectangle".

Two failures follow. In a horizontal-only wrapper such as `.table-responsive`, the vertical step goes to a `scrollBy` call that does nothing. In a vertical scroller whose edge lies past the viewport, the edge zone is out of the finger's reach, so the step is 0. Either way the page never scrolls, and `touch-action: none` blocks panning.

Fix: choose the scroll target per axis, falling through to the next ancestor or the viewport that can scroll on that axis. Intersect the box with the viewport before calling `computeScroll`. Update the comment at line 294 to match.

Write this test first: `scrolls the page during a vertical touch drag when the host sits in a horizontally scrolling wrapper`, in `Drag.test.ts`. Its steps are the following:
1. Render `renderTouchList('touch-action:none')` inside an `overflow-x:auto` wrapper, with a host `min-width` of twice the viewport width.
2. Add a spacer after the wrapper so the page is taller than the viewport, and call `scrollTo({ top: 0 })`.
3. Start a touch session past the slop.
4. Send 2 `touchMove` events at `innerHeight - 4`.
5. Wait for `scrollY > 0`.

At 45f60fa, step 5 times out. Add a second case, `scrolls a vertical scroller whose bottom edge lies past the viewport`. It uses a `max-height:80vh;overflow-y:auto` host with its bottom about 100 px below the viewport, and expects `host.scrollTop > 0` after edge-zone moves.

**d26-touch-3 (medium), also closing part (b) of prose-5.** `#scroll` excludes `document.body` unconditionally (line 300 and line 311). When the root element's computed overflow isn't `visible`, the body's overflow does not propagate to the viewport, so the body is the real scroll container. Example: `html{overflow:hidden;height:100%} body{overflow:auto;height:100%;margin:0}`. In that case the step goes to `document.scrollingElement`, the `html` element, which has nothing to scroll. A touch drag toward a body edge never auto-scrolls.

Fix: examine the body like any other ancestor when the root's computed overflow isn't `visible`.

Write this test first: `scrolls a body that is its own scroll container on a touch move in its edge zone`, in `Drag.test.ts`. Its steps are the following:
1. Set the `html` and body styles from the example, and add enough items that `body.scrollHeight > body.clientHeight`.
2. Start a touch session past the slop.
3. Send a `touchMove` at `innerHeight - 4`.
4. Wait for `document.body.scrollTop > 0`.
5. In `finally`, restore both styles.

At 45f60fa, step 4 times out.

**d26-touch-6 (low, rides with U3).** No proof covers the viewport branch of `#scroll`, which is the `root` target, the zero-origin box, and the `root.scrollBy` call. The `DRAG_TOUCH_ACTIONS` cases move up from y ≈ 284, starting at `scrollY` 0, and never enter the viewport's zone. The host case at line 1052 stops its walk at the host.

Write this test with the U3 rewrite: `scrolls the page on each touch move in the viewport edge zone when no ancestor scrolls`, in `Drag.test.ts`. Its steps are the following:
1. Render `renderTouchList('touch-action:none')` with no host overflow, and call `scrollTo({ top: 0 })`.
2. Start a touch session past the slop.
3. Move to `innerHeight - 4` and wait for `scrollY > 0`.
4. Move deeper into the zone and wait for `scrollY` to grow.
5. After a short delay, assert that `scrollY` hasn't changed.

The case must fail when line 311 targets `document.body`, and when the viewport box is zeroed.

**d25-group-1 (medium).** `#group()` (lines 118-131) and `#owner()` (lines 134-151) admit a same-group host that sits inside the moved item. Alt+ArrowRight or `--forward` on X then picks that nested host B, and a native drop on B is accepted. `B.#relocate` emits an unprevented `move` on B (line 532). After that, `moveBefore` (line 547) and the `#insert` fallback's `insertBefore` (line 570) both throw `HierarchyRequestError`, and nothing catches the second throw. The source then emits `end` with `moved: false`, and the route's `attempt` passes the error to `reportError`. A listener that applied the `move` to its model is left out of step with the DOM.

Fix: `#cross` skips a group host that the moved item contains. `#target` refuses, without `preventDefault`, when the owner's item contains this host.

Write this test first: `skips a group host nested inside the moved item for crossing keys, --forward, and a native drop`, in `plugins.test.ts`. Its steps are the following:
1. Compose `createDragPlugin()` over `#outer` (group `g`). Its first item X holds a grip, a `--forward` button, and a nested `#inner` host of group `g`. After `#outer`, add an `#after` host of group `g`.
2. Record `move.vn.drag` and `end.vn.drag`, and stub `reportError`.
3. Press Alt+ArrowRight on X's grip.
4. Expect 1 `move` whose target is `#after`, X inside `#after`, and no `reportError` call.
5. Repeat with the `--forward` click.
6. Repeat with a native mouse drag of X dropped on `#inner`'s child, and expect the drop to be refused.

At 45f60fa, `move` fires on `#inner` and `reportError` receives `HierarchyRequestError`.

**d25-group-2 (medium), also closing prose-1.** `#group()` (lines 118-131) lists only group hosts that already hold a live controller, because `ComponentContext.component` only looks controllers up. A group host inserted after boot has no controller until an input route reaches it, and crossing keys and commands always route to the source host. As a result:
- Alt+Arrow crossing and `--backward`/`--forward` skip such a host, landing in the next booted host.
- When the skipped host is last, the press emits nothing, though `preventDefault` still runs.

A native drag reaches the host, because its `dragenter` route creates the controller. This contradicts guide lines 1569-1571 and 1608-1609 ("previous or next host in document order"), and line 1358 ("discovers later hosts through input events").

Fix: `#group()` creates the missing controller for a same-group host through the source's context, as the plugin's `create` does for a routed host. That keeps the guide's statements true as written.

Write this test first: `crosses into a group host inserted after boot by Alt+ArrowRight and --forward`, in `plugins.test.ts`. Its steps are the following:
1. Boot `renderDragGroup()` with `createDragPlugin()`.
2. Insert an empty `<ul data-vn-drag="parcels" aria-label="Shipped">` between `#packing-queue` and `#loading-dock`.
3. Press Alt+ArrowRight on a Packing queue grip.
4. Expect the item in Shipped and the announcement `Moved to Shipped, position 1 of 1`.
5. Repeat from a Loading dock item with Shipped appended last, using the item's `--forward` button.

At 45f60fa, step 3 lands the item in Loading dock, and the variant moves nothing.

## U4: Pressed state and wake errors (blocks)

U4 owns `src/browser/wakes/Wake.ts`, `src/browser/wakes/plugins.ts`, `src/browser/fullscreens/plugins.ts`, `tests/src/browser/wakes/Wake.test.ts`, `tests/src/browser/wakes/plugins.test.ts`, and `tests/src/browser/fullscreens/plugins.test.ts`. It closes 2 findings.

**wake-1 (medium).** `Wake#press` (lines 155-157) and the wake plugin's clear projection (`plugins.ts` lines 44-46) write `aria-pressed` onto every `button[commandfor]` whose `commandForElement` is the host, whatever its `command` value. A `show-modal`, `close`, or `--fullscreen` button aimed at a wake host therefore becomes a pressed toggle. The route selector (`plugins.ts` line 24) and the guide ("A different command creates no wake controller", line 1150) both limit the family to `command="--wake"`.

The reverse leak also exists: fullscreen state gets written onto a `--wake` button. It comes from the same unfiltered query in `src/browser/fullscreens/plugins.ts` lines 41-43. That file is outside the range, but the overlap only became reachable with Wake 1.

Fix: narrow both wake writers to `button[command="--wake"][commandfor]`, and the fullscreen writer to `button[command="--fullscreen"][commandfor]`.

Write this test first: `writes pressed intent only onto --wake buttons on a host that other commands target`, in `tests/src/browser/wakes/plugins.test.ts`. Its steps are the following:
1. Render a `<dialog id="wake-recipe">` with a `close` button inside it, plus a `show-modal` button and a `--wake` button outside it, all aimed at the dialog.
2. Grant `wakeLockScreen` as the granted case does, and compose `createWakePlugin()`.
3. Click `Keep screen on` and wait for `change.vn.wake`.
4. Expect the `--wake` button to read `"true"`, and the other 2 buttons to have no `aria-pressed` attribute.
5. Click again, and expect the same after the second change.

At 45f60fa, step 4 fails. Add the mirror case `writes active state only onto --fullscreen buttons` to `tests/src/browser/fullscreens/plugins.test.ts`. It asserts that a `--wake` button on a fullscreen host keeps no `aria-pressed` after a fullscreen change.

**wake-4 with prose-2 (medium; wake-4 was rated low).** When `navigator.wakeLock` is absent, `Wake.acquire()` reads `.request` on undefined (lines 82-84). The API is absent in an insecure context, where the `[SecureContext]` attribute is undefined, and in an engine without the API. The catch (lines 101-105) emits the engine's `TypeError` through `error.vn.wake`, so a consumer can't recognize an unsupported environment by its error name. The TSDoc (lines 63-65) and the guide row (line 1175) both say that the event carries the platform rejection unchanged. The copier handles the same case by throwing its own `NotAllowedError` (`Copier.ts` lines 59-60). Intent and `aria-pressed` still end cleared.

Fix: when `navigator.wakeLock` is undefined, throw `new realm.DOMException('The screen wake lock needs a secure context', 'NotAllowedError')` inside the try. Also update the TSDoc at lines 63-65. U8 updates the guide row.

Write this test first: `reports a NotAllowedError DOMException and clears intent when the platform has no wake lock API`, in `Wake.test.ts`. Its steps are the following:
1. In a same-origin iframe realm, run `Object.defineProperty(realm.navigator, 'wakeLock', { value: undefined, configurable: true })`, as `Copier.test.ts` line 147 does.
2. Create the wake on a frame host and record `error.vn.wake`.
3. Call `await wake.acquire()`.
4. Expect `detail.error` to be a `realm.DOMException` named `NotAllowedError`, and expect `pressed` and `active` to be false.

At 45f60fa, step 4 fails because the error is a `TypeError`.

## U5: Copier proofs (later, after U1)

U5 owns U1's files and runs after U1. It closes 3 findings, and none of them blocks main. For a proof unit, the test comes first and must fail under the named mutation.

**m1-engine-4 (medium, proof strength).** The textarea check at `Copier.test.ts` line 126 and the `outerHTML` check at line 195 pass whether or not the activation gate at `Copier.ts` line 64 exists, because the `finally` block (lines 105-111) removes the textarea and restores focus and selection. With the gate deleted, both expired-activation cases still pass whenever Chromium's `execCommand('copy')` returns false without activation. A check of the final focus or selection can't detect the deletion either, because both are restored. Only the transient effects can.

Write `leaves the document untouched when the write rejects after transient activation expires`, in `Copier.test.ts`. Its steps are the following:
1. Load a frame with `<pre>` and a `<button>`, and let activation expire after a real click.
2. Focus the button, attach a `focusout` recorder to it, and start a `MutationObserver` on the frame body with `childList` and `subtree`.
3. Call `copier.copy()`, then call `takeRecords()`.
4. Assert 0 mutation records, 0 `focusout` events, and the original error.

The case must fail when the gate at line 64 is deleted.

**m1-engine-6 (low).** Commit 75dc342 added a comment at lines 116 and 182 that writes a measurement as a word: "Chromium's activation window lasts five seconds". The writing rule, at line 42 of `node_modules/@orkestrel/scaffold/dist/host/claude/rules/writing.md`, requires numerals, so both comments must read `lasts 5 seconds`. Correct this by edit. No test is needed.

**proofs-copier-writetext-stub-beside-real-rejection (low).** The case `reports the original write rejection after transient activation expires` replaces `writeText` with a stub that rejects with a test-made exception (lines 105-109). The branch it tests doesn't depend on how the rejection arises. A frame with `allow="clipboard-write 'none'"` gets the browser's own `NotAllowedError`, as the case at line 255 shows. Under the stub rule at `tests.md` line 32, that makes the stub a stand-in for the integration being claimed. The stub at line 29 stays, because nobody has verified that `execCommand('copy')` succeeds under that policy.

Replace the stub with that frame, and retitle the case `reports the platform write rejection after transient activation expires`. Its steps are the following:
1. Record the frame's own `writeText` rejection as a probe.
2. Click the frame, then wait for activation to expire.
3. Call `copier.copy()`.
4. Assert a `NotAllowedError` whose message equals the probe's message and isn't `The clipboard needs a secure context`.

## U6: Drag proofs (later, after U3)

U6 owns U3's files and runs after U3. It closes 6 findings, and none of them blocks main.

**d26-touch-4 with proofs-touch-session-listener-leak-unpinned (low).** No test pins that a touch or pen session removes its 4 document capture listeners: `pointermove`, `pointerup`, `pointercancel`, and `lostpointercapture`. Line 586 (`touch?.session.abort()`) is the only call that removes them. Delete it and every case stays green, while each session leaves its listeners and its `Drag` instance on the document, `destroy()` included. A later session on the same host then runs `#track` once per earlier session.

Write `adds four document pointer listeners for a touch session and removes them when it ends`, in `plugins.test.ts`. Its steps are the following:
1. Resolve the document's object id as lines 347-364 do, and read `before` with `DOMDebugger.getEventListeners`.
2. Send `touchStart`, and expect each of the 4 counts to equal `before + 1`.
3. Move past the slop and send `touchEnd`, and expect each count to equal `before`.
4. Repeat with an Escape ending, and again with `destroy()` during the drag.

The case must fail when line 586 is deleted.

**d26-touch-5 (low; this is the test half).** `#arm` (lines 200-208) refuses 3 cases that no `dragstart` admission rule names:
- a non-primary pointer;
- a `button` value other than 0;
- any press while a session is armed or running.

These refusals are sound and stay. U8 names them in the guide.

Write `refuses a touch press that lands while another touch is down and a pen press with a non-zero button`, in `Drag.test.ts`. Its steps are the following:
1. Put a first touch point outside the host.
2. Add a second touch point on item 1's grip, move it past the slop, and release both.
3. Assert no `start` event, no `data-vn-dragging` attribute, no capture, and unchanged order.
4. Send a pen `pointerdown` with `button` 5 on the grip, and assert the same refusal.

**d25-group-3 (low).** No test checks the group boundary that `#group()` enforces for crossing keys and transfer commands. Every keyboard and command fixture uses two `parcels` hosts (`plugins.test.ts` lines 601 and 660). `DRAG_GROUP_REFUSALS` drives only a native drag, which goes through `#owner()`. Removing either the value comparison or the empty-value guard in `#group()` leaves every test green. Even so, the guide claims "refusals between hosts outside one group" (lines 1786-1787) and says that a host outside every group leaves the crossing pair alone (lines 1612-1613).

Write `refuses the crossing keys and the transfer commands between hosts with $name`, in `plugins.test.ts`, over `DRAG_GROUP_REFUSALS`. Its steps are the following:
1. Press Alt+ArrowRight on a Packing queue grip.
2. Click the item's `--forward` button.
3. Assert unchanged order, 0 drag events, and an empty announcement.
4. Assert that the keydown's `defaultPrevented` is false.

Each row must fail under its matching mutation of `#group()`.

**proofs-group-refusal-no-arrival-control (medium, proof strength).** The case `refuses a native drag between hosts with $name` (lines 545-597) never shows that a native `dragover` reached the destination before the `mouseReleased` at line 576. Its wait at line 573 checks the source's `data-vn-dragging`, which `dragstart` sets earlier. Its negative assertions therefore also hold when the drag never arrived. That leaves the group comparison in `#owner()` unproven. Only the `different values` row can hide that fault, because the empty-value guard covers the other row.

Strengthen the case:
1. Record native `dragover` on `hose` before `createVeneer`.
2. Add `await waitForCondition('native dragover reaches the destination', () => overs.count > 0)` before the release.
3. Assert that each recorded `dragover` wasn't cancelled.

The `different values` row must fail when the group comparison in `#owner()` is deleted.

**proofs-touch-tap-exact-slop-frame-scale (medium, proof strength).** The case at line 762 moves the touch exactly `DRAG_SLOP` frame pixels. Vitest scales the tester frame by about 720/896, which isn't exact in binary floating point. As a result, the `<= DRAG_SLOP` comparison at `Drag.ts` line 251 depends on rounding at the grip's position. Every sibling case keeps a margin. landing12 reported green, so this is a latent flake.

Change line 762 to `{ x: 20, y: 20 + DRAG_SLOP - 1 }`.

**proofs-pen-dragstart-vacuous (low).** The assertion at line 1236, `not.toContain(false)`, passes on an empty list, and the `dragstart` count goes only to `console.info` (lines 1238-1241). Meanwhile, guide lines 1813-1814 state that a pen drag raises 1 `dragstart` under Chromium 141 and 153.

Replace line 1236 with `expect(natives.calls.map(([event]) => event.defaultPrevented)).toEqual([true])`.

## U7: Wake proofs (later, after U4)

U7 owns `tests/src/browser/wakes/Wake.test.ts` and `tests/src/browser/wakes/plugins.test.ts`, and runs after U4. It closes 2 findings, and neither blocks main.

**wake-2 (medium, proof strength).** The routing proof at `plugins.test.ts` lines 16-80 never depends on the plugin's `clear` projection (`plugins.ts` lines 36-49). `Wake#press` writes the same value before every `change` and `error` event the test produces (`Wake.ts` lines 80, 104, and 122). The clone at line 71 also copies `'true'`. The projection does unique work in 2 cases: a sentinel released externally onto a button inserted after acquisition, and a button inserted while acquisition is pending. No case drives either one, so guide lines 1164-1165 have no failing case.

Write `projects retained intent onto a button inserted after acquisition when the platform releases the sentinel`, in `plugins.test.ts`. Its steps are the following:
1. Click to acquire, and wait for 1 change.
2. Append a freshly built, uncloned `--wake` button with `aria-pressed="false"`.
3. Release the live sentinel through `Runtime.queryObjects` on `WakeLockSentinel.prototype`, as `Wake.test.ts` lines 121-139 do, and wait for 2 changes.
4. Expect `pressed` true, `active` false, and `'true'` on the inserted button.

The case must fail when the `clear` block is deleted.

**wake-3 with proofs-wake-visibility-recovery-unproved (medium, proof strength).** No case runs the `visibilitychange` handler at `Wake.ts` lines 31-38 or its retained-intent gate at line 34. The case at `Wake.test.ts` line 85 asserts that no visibility change arrived (lines 169-170). `plugins.test.ts` lines 205-223 only count listeners. The following mutations all stay green: the gate changed to `!this.#pressed`, the gate changed to `if (true)`, and the handler body emptied. A synthetic `visibilitychange` keeps `visibilityState` at `'visible'` (see `Time.test.ts` line 200), so the gate can be reached.

Write `requests another lock on a visible visibilitychange only while intent is retained`, in `Wake.test.ts`. Its steps are the following:
1. Acquire, then release the sentinel externally. Expect `pressed` true and `active` false.
2. Dispatch `visibilitychange`, then wait for `requests.count === 2` and `active` true.
3. Call `toggle()` to clear intent.
4. Dispatch `visibilitychange` again and wait 1 frame. Expect `requests.count` to stay 2.

The case must fail under all 3 mutations.

## U8: Guide prose (later, after U1 to U7)

U8 owns `guides/veneer.md` and `tests/guides.test.ts`. It closes 6 prose findings and writes the guide halves of U2, U3, U4, U6, and U7.

**prose-3 (rated medium; the verdicts rule low, because only the documentation is wrong).** The `result.vn.copier` row (line 1483) says that `error` appears "only on rejection". On the absent-API path, though, the copier builds a `NotAllowedError` itself, and no write rejected (`Copier.ts` lines 59-60). The paragraph at line 1485 describes that error, so the row and the paragraph disagree.

Reword the row to: "`text`, with `error` only on failure. A failure carries a `DOMException`: the platform's rejection, a `NotAllowedError` when the clipboard API is absent and selection copying fails, or an `UnknownError` that wraps any other rejection value."

**prose-4 (medium, prose).** "The pointer path" names two engines with opposite group rules:
- Line 1637 opens the native drag-and-drop paragraph, whose engine accepts group transfers.
- Lines 1654, 1675, and 1685 use the term for the touch and pen engine, which moves an item only within its own host.

The code matches line 1675. Rename the subject at line 1637 to "The native path", the term line 1669 already uses, and write "the touch and pen path" at lines 1654, 1675, and 1685.

**prose-5, part (a) (medium, prose).** Line 1679 says "the host's nearest scrollable ancestor", but the walk tests the host itself first. The proof cited at line 1808 also scrolls the host. Rewrite the sentence to describe U3's behavior: the host or its nearest ancestor that scrolls on the step's axis takes that step, the body counts when the root clips its overflow, and the viewport takes the step otherwise.

**prose-6 (low).** The introduction to the Native departures section (lines 1821-1822) says that its rows record "platform-input and top-layer readings". This range added 3 rows that don't fit that description:
- Wake visibility recovery is a focus and lifecycle reading.
- Wake default permission is a permission reading.
- Touch dragging on Android is unestablished.

Recast the introduction as: "The following rows record platform readings in the desktop proofs (input, top layer, permission, and page lifecycle) and the device behavior those proofs don't establish."

**prose-7 (low).** Range-added guide lines write negatives without contractions, which breaks the rule in writing.md § Voice that a guide uses negative contractions. The affected phrases are:
- line 1180: "does not retry";
- line 1485: "does not succeed" and "does not require";
- line 1828: "does not cancel this session" and "is not established by that reading";
- line 1830: "does not exit fullscreen" and "is not established by this reading".

Contract each one. Name the sweep pattern `\b(do|does|is) not\b` and the path in the commit message.

U8 also writes the guide halves of the code units. The following list maps each sentence to its unit:
- **U2:** line 727 states that boot selector matching runs inside each plugin's failure boundary.
- **U3:** the line 1679 rewrite from prose-5. Lines 1358, 1569-1571, and 1608-1609 hold as written after U3, so confirm them unchanged.
- **U4:** line 1175 and the paragraph at line 1177 state that a missing wake lock API reports a `NotAllowedError` with the message `The screen wake lock needs a secure context`.
- **U6:** lines 1655-1657 name the 3 touch and pen refusals from `d26-touch-5`.
- **U7:** lines 1178-1180 point to the Wake visibility recovery departure row. Line 1205 replaces "visibility probes" with "a synthetic visibility change".

Write these 2 guide-parity cases first, in `tests/guides.test.ts`. Each fails at 45f60fa:
- `veneer guide copier result row names every error the copier reports`: the row must name `NotAllowedError` and must not contain "only on rejection".
- `names each drag engine with one term in the sortable section`: the paragraph that holds "transfer effects" and "native dragging" must not contain "pointer path".

## Refuted findings

The following table lists the 5 refuted findings and the reason each one fails.

| Finding | Claim | Refuting reason |
| --- | --- | --- |
| m1-engine-5 | The `result.vn.copier` row's phrase "the platform's `DOMException`" is contradicted by the copier-built `NotAllowedError`. | Read as a type, the phrase is accurate: every error the copier reports is an instance of the realm's `DOMException` (`Copier.ts` lines 60 and 75-77). The paragraph at line 1485 documents the absent-API error. The row's real defect is the "only on rejection" half, which `prose-3` carries. |
| d25-group-4 | The comment from 45f60fa at `tests/app/browser/integration.test.ts` lines 570-571 narrates the abandoned grip target. | The comment is present tense and states a standing layout fact: at 390 px, the grip's lower quarter sits above the item's midpoint. That fact explains why this case leaves the file's grip-target pattern. It has no past tense and no account of what was tried; that account sits in the commit message. |
| proofs-wake-teardown-reads-own-field | The teardown case checks release only through `wake.active`, so deleting `void sentinel?.release()` stays green. | The case at `Wake.test.ts` line 85 pins that mutation through the platform object. It acquires (line 177), takes `Runtime.queryObjects` (lines 179-181), calls `destroy()` (line 182), and asserts that every sentinel is released (lines 184-191). With line 147 deleted, line 191 fails. |
| proofs-autoscroll-holds-still-fixed-window | The "holds still" half uses a fixed 100 ms sleep, which the test law forbids. | The Delay rule forbids a fixed wait for something another process produces. This window proves that nothing happens, which no condition helper can express, and load can't make it fail. The product scrolls only from `pointermove`, and `src/browser/drags/` has no timer. |
| proofs-journey-comment-narrates-alternative | The board journey comment at `integration.test.ts` lines 638-639 describes the abandoned grip target. | The comment is a present-tense "why". It states the 390 px wrap constraint, which explains why this case drops on the list item while the sibling cases (lines 500-504 and 568-572) drop on the grip. The rule forbids recounting an attempt, and the comment doesn't do that. |