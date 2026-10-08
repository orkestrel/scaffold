# Verdict: the showcase on Android (Galaxy S21+, Edge), 2026-10-08

On 2026-10-08 the user reported four things from a Samsung Galaxy S21+ running Microsoft Edge. The clipboard copy button does nothing. The table column sort does nothing when the header links are tapped. The sortable list no longer drags, and its move buttons do nothing. The user also asked for variants on the drag-and-drop elements and on later components that need styling. The page under report is `/home/user/veneer/showcase/browser.html`, built from `main` at `9f56e6a`.

The user's own reading, recorded in `user-reading.md`, splits the report by how the page was opened. Inside the Claude app, all three controls do nothing. Downloaded and opened in Edge as `file://`, copy fails while sort, drag, and the move buttons work. The device runs Edge 153.0.4234.49 on Chromium 153.0.8010.53 and Android 15.

Two defects explain the Claude app row, and one fix unit (M1) removes both:

- The Sorter mints row keys with `crypto.randomUUID()`, which exists only in a secure context.
- Any boot throw destroys the whole engine scope.

On a page that is not a secure context, the two together stop copy, sort, the move buttons, mouse drag, and every Bootstrap data-API control, and none of them writes a status. No lane loaded the page inside the Claude app, so whether its viewer is a secure context is unmeasured. Among the measured contexts, only the insecure one reproduces that row on a current Chromium.

Under emulation, copy works from `file://`, so the device's copy failure there is not reproduced. M1's selection-copy fallback is the repair candidate for it, and only a device reading can confirm it.

The variant request belongs to the variants judgment (`variants-2026-10-08/judgment.md`). This verdict points to that judgment and does not restate it.

This verdict rests on 41 verified findings, 31 standing as written and 10 standing as corrected, plus the platform and review lane readings. It adds own reads of `user-reading.md`, the M1 worktree diff, the `landing` branch, and the veneer sources at `9f56e6a`. `journal.json` beside this file holds every finding verbatim with its verdict.

Paths resolve as follows:

- A `readings/` path, or a bare `cr*`, `insecure-*`, `emulate.ts`, or `prior-566e103.html` path, is relative to `/home/user/veneer/tmp/units/mobile-2026-10-08/`.
- A `runs/` path is relative to `/home/user/veneer/tmp/units/journey-cost/`.
- A source, test, or guide path is relative to `/home/user/veneer` at `9f56e6a`.
- `user-reading.md` sits beside this file.

The readings use 2 builds: Chromium 141.0.7390.37 (`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`) and Chromium 153.0.8010.12 (`/home/user/.wave/pw-153/chromium-1243/chrome-linux64/chrome`). Both run with a custom S21+ Edge descriptor: 384x854, device scale 2.8125, mobile, touch, and an `EdgA` user agent.

## Findings

The following table lists the 41 findings. It holds 7 defects, 8 gaps, 11 readings, and 15 not reproduced. A "No, corrected" row carries the corrected cause, and its full correction is in `journal.json`. "Both" in the Build column means Chromium 141 and 153.

| Finding | Specimen | Context | Build | Stands | Cause | Fix | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| COPY-file | copy | `file://` | both | Yes | Works: a trusted touch tap writes 'Copied'. | None | `readings/chromium-153-s21plus-edge-file.json` |
| COPY-http | copy | `http://127.0.0.1` | both | Yes | Works, by tap and by `element.click()`. | None | `readings/chromium-153-s21plus-edge-http.json` |
| COPY-iframe-same-origin | copy | iframe, `allow-scripts allow-same-origin` | both | Yes | Works with no permission grant. | None | `readings/chromium-153-s21plus-edge-iframe-scripts-same-origin.json` |
| COPY-iframe-scripts | copy | iframe, `allow-scripts` | both | Yes | The clipboard-write permissions policy blocks the opaque-origin frame. `writeText` rejects with `NotAllowedError`, and the status reads 'Copy failed'. | The embedder grants `allow="clipboard-write"`, which `cr09-frames.json` verifies. | `readings/chromium-153-s21plus-edge-iframe-scripts.json` |
| COPY-insecure | copy | `http://showcase.test`, insecure | both | Yes | The scope is destroyed at load (root causes 1 and 2). The status stays empty. | M1 | `readings/chromium-153-s21plus-edge-http-insecure.json` |
| COPY-insecure-prior | copy | insecure, `566e103` | both | Yes | `navigator.clipboard` is absent. The copier reports the throw, and the status reads 'Copy failed'. | None; regression control | `readings/chromium-153-s21plus-edge-http-insecure-prior.json` |
| SORT-file | sort | `file://` | both | Yes | Works: tapping Parcels sorts ascending. | None | `readings/chromium-153-s21plus-edge-file.json` |
| SORT-http | sort | `http://127.0.0.1` | both | Yes | Works. | None | `readings/chromium-153-s21plus-edge-http.json` |
| SORT-iframe-same-origin | sort | iframe, `allow-scripts allow-same-origin` | both | Yes | Works. | None | `readings/chromium-153-s21plus-edge-iframe-scripts-same-origin.json` |
| SORT-iframe-scripts | sort | iframe, `allow-scripts` | both | Yes | Works. The opaque frame is still a secure context. | None | `readings/chromium-153-s21plus-edge-iframe-scripts.json` |
| SORT-insecure | sort | insecure | both | Yes | `new Sorter` throws at `src/browser/sorters/Sorter.ts:72` before it binds a header listener (root cause 1). | M1 | `readings/chromium-141-s21plus-edge-http-insecure.json` |
| SORT-insecure-prior | sort | insecure, `566e103` | both | Yes | The section is absent from `566e103`; `25e4f1b` added it. | None | `readings/chromium-141-s21plus-edge-http-insecure-prior.json` |
| DRAGBTN-file | drag | `file://` | both | Yes | Works: 'Moved to position 2 of 5'. | None | `readings/chromium-153-s21plus-edge-file.json` |
| DRAGBTN-http | drag | `http://127.0.0.1` | both | Yes | Works. | None | `readings/chromium-153-s21plus-edge-http.json` |
| DRAGBTN-iframes | drag | both iframe variants | both | Yes | Works. | None | `readings/chromium-153-s21plus-edge-iframe-scripts.json` |
| DRAGBTN-insecure | drag | insecure | both | Yes | The Drag controller is destroyed with the scope (root cause 2). The native `command` event still arrives. | M1 | `readings/chromium-153-s21plus-edge-http-insecure.json` |
| DRAGBTN-insecure-prior | drag | insecure, `566e103` | both | Yes | The move buttons are absent from `566e103`; `1f9e57e` added them. | None | `readings/chromium-153-s21plus-edge-http-insecure-prior.json` |
| BOARD-forward | drag | code reading | both | Yes | The page has no `--forward` command and no board control. "Click board copy" reads as clipboard copy. | None | `/home/user/veneer/showcase/browser.html` |
| DRAGTOUCH-secure | drag | `file://`, http, iframes | both | No, corrected | Emulation limit: CDP touch injection never fires a long press (`touch_emulator_impl.cc:52-54`). A swipe under `--enable-touch-drag-drop` was not measured. | A device reading | `readings/chromium-153-s21plus-edge-file.json` |
| DRAGTOUCH-insecure | drag | insecure, desktop mouse | both | Yes | The scope teardown leaves no `dragover` handler and no drop (root cause 2). | M1 | `readings/chromium-153-desktop-http-insecure.json` |
| DRAG-insecure-prior | drag | insecure, `566e103` | both | Yes | `566e103` holds no `randomUUID` call, and mouse drag reorders. | None | `readings/chromium-141-desktop-http-insecure-prior.json` |
| GRIP-touch-action | drag | code reading | both | No, corrected | `touch-action: none` (`src/styles/surfaces/_drag.scss:5`, added in `f79bb26`) is the grip's only computed change between builds. `user-select: none` comes from Bootstrap `.btn` in both builds. The effect on Android is unestablished. | A device reading | `readings/chromium-153-s21plus-edge-http.json` |
| CANARY-insecure | page | insecure | both | Yes | The teardown removes every Bootstrap data-API route, so the accordion does not toggle (root cause 2). | M1 | `readings/chromium-153-s21plus-edge-http-insecure.json` |
| CONTROL-desktop | page | every context | both | No, corrected | Desktop matches the S21+ readings for the tap-driven specimens. Touch drag reorders in no context under emulation, while desktop mouse drag reorders in every secure context. | None | `runs/MOB-emulate-153/stdout.log` |
| RUN-141-launch | page | harness | 141 | Yes | Playwright 1.64.0 resolves browser revision 1248, but the host installs only revision 1194. | Launch Chromium 141 by `executablePath`. | `runs/MOB-emulate-141/stderr.log` |
| CR-01 | page | code reading | both | No, corrected | `src/browser/Veneer.ts:218-226` tears down the whole scope on any boot throw. Components that factories own, such as the Sorter, survive. | M1 | `cr01-crosscheck.json` |
| CR-02 | sort | insecure http | both | No, corrected | `Sorter.ts:72` and `:213` need a secure context. This latent defect is measured only for http on a non-loopback host. | M1 | `insecure-153.json` |
| CR-03 | copy | no Invoker Commands | none | Yes | `src/browser/copiers/plugins.ts:26` and `src/browser/fullscreens/plugins.ts:25-28` and `:41-44` have no fallback. The gap sits below the Chromium 153 floor. | M4 | `cr03-noinvoker.json` |
| CR-04 | sort | no `moveBefore` | none | No, corrected | A sort that moves a row throws at `Sorter.ts:254`, below the floor. | M4 | `cr04-nomovebefore.json` |
| CR-05 | page | no `Promise.withResolvers` | none | Yes | `app/browser/main.ts:59` throws, and the boot cascade follows. The gap sits below the floor. | M1 contains the boot; M4 states the floor. | `cr05-nowithresolvers.json` |
| CR-06 | drag | touch input | both | Yes | The page drags natively only, with no pointer path, and the grip carries `touch-action: none`. | D2.6 on `landing` at `de168b8` | `src/browser/drags/Drag.ts:79-80` |
| CR-07 | drag | touch input | none | No, corrected | `dragstart` writes no data item. That is harmless on Firefox 115 to 158 and on Chromium 141 for Android. | None | `cr07-sources/chromium-141-7390-DragAndDropDelegateImpl.java` |
| CR-08 | copy | code reading | both | Yes | Every rejected write reports 'Copy failed'. An empty status means the route never ran. | None | `src/browser/copiers/Copier.ts:47-70` |
| CR-09 | copy | embedding frame | both | No, corrected | The clipboard-write policy, whose default allowlist is `self`, blocks writes in a cross-origin or opaque-origin frame. A frame that keeps `allow-same-origin` copies. | The embedder grants `allow="clipboard-write"`. | `cr09-frames.json` |
| CR-10 | page | `file://` | both | Yes | The page runs completely from `file://`: one inline module, no network loads, and no storage. Both builds read it as a secure context. | None | `readings/chromium-153-s21plus-edge-file.json` |
| CR-11 | page | code reading | both | Yes | The showcase handlers neither swallow nor re-route taps. | None | `app/browser/Showcase.ts` |
| CR-12 | page | code reading | both | Yes | No section isolation exists, and fragment navigation re-renders nothing. | None | `app/browser/factories.ts:846-868` |
| CR-13 | page | back/forward cache | both | Yes | The `pagehide` teardown ignores `event.persisted`. A page restored over http shows an empty body. | M3 | `cr13-bfcache-153.json` |
| CR-14 | page | touch input | both | No, corrected | A tap's click passes Drag's `MouseEvent` branch. Whether a long press on the grip raises a context menu is unestablished. | None | `cr07-sources/chromium-141-7390-web_contents_view_android.cc` |
| CR-15 | sort | code reading | both | Yes | Service and Updated are already in ascending order. No style paints `aria-sort`, and the header buttons render as links. | M2 | `app/browser/sections/column-sort.html` |
| CR-16 | drag | code reading | none | No, corrected | No variant class sets the `--vn-drag-*` properties. Per-item colors already follow `list-group-item-{color}`, and `$theme-colors` already exists. | The variants judgment, units V1 to V4 | `src/styles/composables/_drag.scss` |

## Root causes

The following paragraphs give one distinct cause each. The first two are the defects behind the user's Claude app row.

1. **Sorter row keys need a secure context.** `src/browser/sorters/Sorter.ts:72` and `:213` call `crypto.randomUUID()`, which a page outside a secure context lacks. There, `new Sorter` throws a `TypeError` twice:
   - first from the top-level `createSorter` call at `app/browser/main.ts:74`, which stops module evaluation;
   - then from the sorter boot at load, which `src/browser/sorters/plugins.ts:34-35` rethrows.

   The constructor throws before it binds a header listener, so sort stops even though the Sorter sits outside the scope. The call arrived with `25e4f1b` and reached the page in the `9f56e6a` rebuild; `566e103` holds no such call (`prior-566e103.html`, grep count 0). The only measured trigger is http on a non-loopback host (`insecure-153.json`; `readings/chromium-141-s21plus-edge-http-insecure.json`). The `landing` branch at `de168b8` carries the same calls at `Sorter.ts:72` and `:213`.

2. **One boot failure destroys the whole engine scope.** `src/browser/Veneer.ts:218-226` catches any throw from `#initialize`, calls `destroy()`, and rethrows. That `destroy()` (`:115-129`) does three things:
   - it aborts the capture-phase route listeners registered at `:69-73`;
   - it destroys every component the scope owns;
   - `Drag#destroy` removes the drag status output (`src/browser/drags/Drag.ts:127-134`).

   From then on, `#route` returns immediately (`:178`). The copy button, the move buttons, mouse drag, and every Bootstrap data-API control stop responding, and none of them writes a status. Components that standalone factories build belong to the document registry and survive the teardown: `createSorter` at `main.ts:74`, `createSentinel` at `:59`, and `createFullscreen` at `:48` (`runs/MOB-cr01-crosscheck`, `cr01-crosscheck.json`). `tests/src/browser/Veneer.test.ts:220` and `:277` pin this teardown as the design. The `landing` branch keeps it (`Veneer.ts:222`).

3. **The Claude app context is unmeasured, and its row matches causes 1 and 2.** `user-reading.md` records that copy, sort, and the move buttons all do nothing inside the Claude app. That is a status that stays empty, rows that stay in place, and no move. Every secure context the lanes measured (`file://`, `http://127.0.0.1`, and both sandboxed iframe variants) works on Chromium 141 and 153, apart from a visible 'Copy failed' in the `allow-scripts`-only frame. The insecure context fails in exactly the way the row records.
   - Cause 2 alone does not stop sort, because the Sorter survives the scope (CR-01, corrected).
   - The other measured path that stops all three is a module evaluation that halts before `main.ts:74`. That needs a runtime without `Promise.withResolvers`, below Chromium 119 (`cr05-nowithresolvers.json`).
   - The user tapped the controls, so the page rendered and its script ran: the shell is built by script (`app/browser/factories.ts:779`), and a frame without `allow-scripts` renders blank (`cr09-frames-sandbox-no-scripts.png`).

4. **The platform refuses the clipboard write in some frames and, by the user's record, on the device from `file://`.** `src/browser/copiers/Copier.ts:57` calls `writeText`, and `app/browser/Showcase.ts:307-310` writes 'Copy failed' when the result carries an error.
   - In a frame whose origin differs from its embedder's, the clipboard-write permissions policy rejects the write with `NotAllowedError` (COPY-iframe-scripts and CR-09). Granting `allow="clipboard-write"` restores it (`cr09-frames.json`).
   - On the device from `file://`, `user-reading.md` records copy as "Fails". The emulation reads 'Copied' there in both builds (COPY-file), so the device's cause is unestablished.

5. **The sort headers show no state, and two sortable columns start sorted.** In `app/browser/sections/column-sort.html:16-36`, Service reads Express, Standard, Standard and Updated reads 08:00, 09:00, 10:00. That is ascending order with a stable tie, so the first tap on either header moves no row.
   - Nothing in `src/styles` styles `aria-sort`, so the header carries no visible mark.
   - The only text signal is the status output after the table (`:40`).
   - The header buttons are `btn btn-link p-0` (`:8-11`), which render as the links the user names.

6. **Finger drag on `9f56e6a` depends on the platform's long press.** The Drag controller records only `pointerdown` (`Drag.ts:79-80`). It moves an item by pointer only on a native drop after `dragstart` (`Drag.ts:86`, `:97-105`); its other routes are command clicks (`:224-252`) and Alt+Arrow keys (`:254-286`).
   - The grip's `touch-action: none` (`src/styles/surfaces/_drag.scss:5`, `f79bb26`) turns a finger move into a full pointer stream with no scroll and no `pointercancel` under emulation (GRIP-touch-action, corrected).
   - CDP touch injection never fires a long press, so no lane can exercise the native finger drag (DRAGTOUCH-secure, corrected).
   - D2.6 on the `landing` branch at `de168b8` adds a touch and pen path through pointer capture: it arms at `Drag.ts:82` and captures at `:257`.

7. **The `pagehide` teardown ignores the back/forward cache.** `app/browser/Showcase.ts:135` and `app/browser/main.ts:89` tear down on every `pagehide`, as do the factory teardowns at `main.ts:32`, `:56`, `:71`, and `:87`. When Chromium restores the page over http, it returns the same document with an empty body and no engine. The run is `runs/MOB-cr13-bfcache-153`, with the screenshot `cr13-bfcache-153-http-after.png`. Chromium refuses the cache for `file://`.

8. **The styles layer has no variant seam for the sortable.** No rule in the `modifiers` layer sets `--vn-drag-color`, `--vn-drag-size`, or `--vn-drag-opacity` (CR-16, corrected). Per-item colors already follow Bootstrap's `list-group-item-{color}` classes through `--bs-list-group-active-bg` (`src/styles/composables/_drag.scss:4`). The sanctioned `$theme-colors` map is in place at `src/bootstrap/_maps.scss:31`.

9. **The guide omits three API requirements the engine relies on.** These are Invoker Commands (`commandForElement`, CR-03), `Element.moveBefore` (CR-04), and `Promise.withResolvers` (CR-05). The user ruled the Chromium floor D-10 at 153 (`/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/stage-b/user-rulings-2026-10-06.md:13`), and Chromium 141 and 153 carry all three (platform lane). The guide's requirement sentence names none of them and no version (`guides/veneer.md:724`).

## Units

The following four units run in order, and each owns its files alone while it runs. No unit commits; the Orchestrator lands each one.

- **M1** is in flight in `/home/user/.wave/veneer-mobile1`, a detached worktree at `9f56e6a`; this verdict read its diff on 2026-10-08.
- **The `landing` chain** (D2.2 to D2.6 and Wake 1, at `de168b8`) still carries root causes 1 and 2. It takes M1 by merge before it lands on `main`.
- **The variants units V1 to V4** are defined in `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/variants-2026-10-08/judgment.md` § Units. That judgment's own record makes V2 and V3 wait for M1.

The fixes the findings name and this verdict does not take are listed here, each with its reason:

- **CR-03's shared, realm-aware host helper.** Every browser at the D-10 floor carries `commandForElement` (platform lane), and the cross-realm `instanceof` path rests on code reading alone. M4 records the requirement instead.
- **CR-04's Drag-style guard in the Sorter.** Every browser at the D-10 floor ships `moveBefore` (platform lane). M4 records the requirement.
- **CR-05's separate Sentinel boot catch.** M1's per-host containment covers that boot.
- **CR-02's `crypto.getRandomValues` keys.** A per-instance counter needs no platform API, and M1 implements the counter.
- **CR-06's option to remove `touch-action: none`.** D2.6 depends on the grip rule (drag verdict § D2.6). D2.6 takes CR-06's pointer-capture option instead.
- **CR-07's `setData('text/plain')` payload.** The empty payload is harmless on the engines in question (CR-07, corrected). A text payload makes the item's label droppable into other targets, which the drag verdict § Rejected already refuses.
- **CR-09's change in the engine.** The fix belongs to the embedding frame.
- **CR-13's restart on `pageshow`.** A restored page is the same document (`cr13-bfcache-153.json`), so a restart would rebuild what survived. M3 skips the teardown instead.
- **CR-16's modifier classes.** The variants judgment selects the `data-vn-color` attribute over a class family, subject to its keying question.

### M1: Contain boot failures, key sorter rows by counter, and copy by selection when refused

Engine: astra. Worktree: `/home/user/.wave/veneer-mobile1` at `9f56e6a`.

The unit owns the following files.

- `/home/user/veneer/src/browser/Veneer.ts`
- `/home/user/veneer/src/browser/copiers/Copier.ts`
- `/home/user/veneer/src/browser/sorters/Sorter.ts`
- `/home/user/veneer/tests/src/browser/Veneer.test.ts`
- `/home/user/veneer/tests/src/browser/copiers/Copier.test.ts`
- `/home/user/veneer/tests/src/browser/sorters/Sorter.test.ts`
- `/home/user/veneer/tests/src/browser/sorters/index.test.ts`
- `/home/user/veneer/guides/veneer.md` (the scope paragraph under § Browser entry and § Copy button alone)
- `/home/user/veneer/showcase/browser.html` (rebuilt with `npm run build:showcase`, never edited by hand)

The contract has the following lines.

- **Role.** M1 is a repair writer, with no public type change.
- **Per-host boot containment.** `#initialize` wraps each host's `boot.execute` in `attempt` and sends a failure to the document realm's `reportError`. Initialization continues with the remaining hosts and plugins, and the scope stays live and routes later interactions. This closes root cause 2 and CR-01.
- **Tension on `#boot`.** In the M1 diff, `#boot` reports a throw outside any host boot and no longer destroys the scope. CR-01's fix kept `destroy()` for errors in the scope itself. The Orchestrator rules whether a scope-level throw still destroys.
- **Sorter keys.** The Sorter mints row keys from a per-instance counter (`` `${id}:${count}` ``) at `Sorter.ts:72` and `:213`, and `src/browser/sorters` holds no `randomUUID` call. This closes root cause 1.
- **Absent clipboard API.** The copier reports an absent `navigator.clipboard` as a `NotAllowedError` with the message "The clipboard needs a secure context".
- **Selection fallback.** When a write is denied while transient activation remains, the copier tries the selection path. That path copies with `execCommand('copy')` from an off-screen read-only `textarea`, then restores focus and the earlier selection. A successful attempt emits a plain result, and a failed or expired attempt reports the original rejection.
- **Insecure-context amendment.** If you answer yes to question 3, the selection path also runs when `navigator.clipboard` is absent. The M1 diff gates the path on `realm.navigator.clipboard !== undefined`, which leaves an insecure context at 'Copy failed'. An insecure context is the only measured trigger that matches the Claude app row.
- **Guide.** The scope paragraph states per-host containment. § Copy button states both paths and the secure-context message. Both edits are in the M1 diff at `guides/veneer.md:702` and `:1394-1395`.
- **Rebuild.** Rebuild `showcase/browser.html` so the user can re-read the page on the device.

The proofs are the following.

- **Unit cases.** `tests/src/browser` runs these cases under Chromium 141 and 153; each name comes from the M1 diff:
  - `contains a failed host boot and continues hosts, plugins, and later clicks`
  - `contains a failed boot and preserves its conflict, deferred=%s`
  - `retains settled components and routes when every boot fails: deferred=%s`
  - `copies a rejected write on a real click and restores the frame selection`
  - `reports the original write rejection after transient activation expires`
  - `reports a secure-context refusal on click and preserves the frame document`
  - `retains an inserted row across redraws while another sorter stays independent`
  - `mints sorter keys without a secure-context API`
- **Mobile emulation, one case per defect.** `emulate.ts` runs against the rebuilt page with the S21+ Edge descriptor, under Chromium 141 by `executablePath` (RUN-141-launch) and Chromium 153, on `http://showcase.test`:
  - COPY-insecure: after the tap the status is never empty, `copy.vn.copier` and `result.vn.copier` fire, and the status reads 'Copied' with the amendment or 'Copy failed' with a `NotAllowedError` without it.
  - SORT-insecure: tapping Parcels reads 'Sorted by Parcels, ascending', the Parcels header carries `aria-sort="ascending"`, and the rows read Harbour, Coastal, Northbound.
  - DRAGBTN-insecure: 'Move Review orders down' reads 'Moved to position 2 of 5', and `features.dragStatusOutput` is true.
  - DRAGTOUCH-insecure: on the desktop descriptor, the mouse drag reads 'reordered: Moved to position 3 of 5'.
  - CANARY-insecure: the accordion canary reads 'toggled (Bootstrap engine live)'.
  - CR-02: `pageErrors` is empty, and a grep for `randomUUID` in the rebuilt `showcase/browser.html` counts 0.
- **CR-01 crosscheck.** `cr01-crosscheck.ts` reruns on the rebuilt page with the Drag boot made to throw. Copy reads 'Copied', the accordion toggles, Parcels sorts, and only the Drag host loses its output. The injected error reaches `reportError`.
- **CR-05 control.** `cr05-nowithresolvers.ts` reruns on the rebuilt page. Copy, the accordion, and the move button respond, and the case records the sort reading.
- **Real refusal.** In the `allow-scripts`-only iframe on the S21+ descriptor, the copy tap reads 'Copied' through the selection path or 'Copy failed' with the original `NotAllowedError`. The case records which, because no lane has measured `execCommand('copy')` under a blocking permissions policy.
- **Controls.**
  - Restoring `crypto.randomUUID()` at `Sorter.ts:72` turns `mints sorter keys without a secure-context API` and the insecure sort row red.
  - Restoring `destroy()` in `#boot` turns the containment case and the insecure canary row red.
  - Removing the selection attempt turns `copies a rejected write on a real click and restores the frame selection` red.
  - Every secure-context row (`file://`, `http://127.0.0.1`, both iframes) keeps its `9f56e6a` reading.
- **Project gates.** Run `npm run check`, `npm run lint:check`, `npm run format:check`, `npm run test:policy`, `npm run test:src:browser` under Chromium 141 and 153, `npm run test:app:browser`, `npm run test:guides`, and `npm run build:showcase`.

### M2: Show the sort state and author the fixture out of order

Engine: opus, because the mark's design decides the unit. The unit starts after M1 lands.

The unit owns the following files.

- `/home/user/veneer/app/browser/sections/column-sort.html`
- `/home/user/veneer/src/styles/composables/_sort.scss` (absent at `9f56e6a`)
- `/home/user/veneer/src/styles/composables/_index.scss`
- `/home/user/veneer/tests/src/styles/composables/sort.test.ts` (absent at `9f56e6a`)
- `/home/user/veneer/tests/app/browser/integration.test.ts` (the column sort case alone)
- `/home/user/veneer/guides/veneer.md` (§ Table column sort and the styles partial table alone)
- `/home/user/veneer/showcase/browser.html` (rebuilt, never edited by hand)

The contract has the following lines.

- **Role.** M2 is a styles and fixture writer. It depends on M1 and on your answer to question 4.
- **Fixture.** In every column that carries a sort button, the authored row order differs from both its ascending and its descending order. Parcels keeps one empty cell, so the empty-first rule stays visible.
- **Partial.** `composables/_sort.scss` writes `@layer composables` a single time. Under `[data-vn-sort] th[aria-sort='ascending'] > button` and `[data-vn-sort] th[aria-sort='descending'] > button`, an `::after` pseudo-element with `content: ''` draws a direction mark from borders in `currentColor`.
- **Accessible name.** The button's accessible name stays the column name, and `aria-sort` carries the state. The partial writes no literal color and no `box-shadow`, and it reads sizes from `--bs-border-width`.
- **Guide.** § Table column sort gains the partial's contract: the mark, its layer, and its accessible-name rule.

The proofs are the following.

- **Styles cases.** `tests/src/styles/composables/sort.test.ts` runs under Chromium 141 and 153, with the `./bootstrap` and `./styles` sheets adopted:
  - With `aria-sort` set directly, the mark's border is non-zero for each direction and absent without the attribute.
  - The button's accessible name is unchanged.
  - Under emulated `forced-colors: active`, the mark keeps a non-zero border.
  - Every block sits in the `composables` layer, read through `readPlacement`.
- **Journey case.** In `tests/app/browser/integration.test.ts`, the first tap on each sortable header reorders the rows.
- **Mobile emulation (CR-15).** On the S21+ descriptor from `file://`, tapping Service reorders the rows and draws the ascending mark. The screenshot is kept beside the reading.
- **Controls.**
  - Restoring the `9f56e6a` Service and Updated order turns the first-tap case red.
  - A glyph in `content` turns the accessible-name case red.
- **Project gates.** Run `npm run test:src:styles`, `npm run test:src:bootstrap` with the sheet digest unchanged, `npm run test:app:browser`, `npm run test:guides`, and `npm run build:showcase`.

### M3: Keep the page through the back/forward cache

Engine: astra. The unit starts after M2 lands.

The unit owns the following files.

- `/home/user/veneer/app/browser/Showcase.ts`
- `/home/user/veneer/app/browser/main.ts`
- `/home/user/veneer/showcase/browser.html` (rebuilt, never edited by hand)

The contract has the following lines.

- **Role.** M3 is a repair writer in the application, with no engine change.
- **Teardown.** Every `pagehide` teardown runs only when `event.persisted` is false. That covers `Showcase.ts:135` and `main.ts:32`, `:56`, `:71`, `:87`, and `:89`. A page restored from the cache keeps its body, sheets, listeners, and scope, and nothing restarts on `pageshow`.
- **Tension on the proof project.** Playwright launches Chromium with `--disable-back-forward-cache`, and the `cr13-bfcache.ts` lane drops that switch. The Orchestrator rules whether the app browser project's launch options drop it too, or whether the lane script stays the proof of record.

The proofs are the following.

- **Mobile emulation (CR-13).** `cr13-bfcache.ts` reruns on the rebuilt page with the S21+ descriptor over `http://127.0.0.1`, under Chromium 141 and 153. After going back, the event log reads `pagehide` with `persisted=true`, then `pageshow` with `persisted=true`. The body has children, and the accordion toggles on a tap.
- **Control.** Restoring the unconditional teardown turns the body-children row red. The `file://` row keeps its `9f56e6a` reading, a fresh document after going back.
- **Project gates.** Run `npm run check:app`, `npm run test:app:browser`, `npm run lint:check`, and `npm run build:showcase`.

### M4: State the browser floor and its API requirements in the guide

Engine: opus, because guide voice decides the unit. The unit starts after M3 lands.

The unit owns the following file.

- `/home/user/veneer/guides/veneer.md` (the requirement sentence of § Browser entry at `:724` alone)

The contract has the following lines.

- **Role.** M4 is a guide writer, with no source change.
- **Floor and requirements.** The sentence names Chromium 153 as the floor, citing the D-10 ruling of 2026-10-06. It adds three requirements: Invoker Commands (`commandForElement`), which the copier and fullscreen host resolution read; `Element.moveBefore`, which the Sorter relocation calls; and `Promise.withResolvers`, which the form document behind the Sentinel initializes.
- **No fallbacks.** The engine gains no runtime fallback for these APIs.

The proofs are the following.

- **Gates.** Run `npm run test:guides`, `npm run test:policy`, and `npm run format:check`.
- **Mobile emulation.** None, because no defect rides on this unit. The platform lane reads all three APIs present under Chromium 141 and 153 on the S21+ descriptor.

## Not reproduced

The lanes could not reproduce the following under emulation:

- **Finger drag through the platform's long press.** CDP touch injection sets the long-press timeout to its maximum, so no long press fires (DRAGTOUCH-secure, corrected). No lane measured a swipe with `--enable-touch-drag-drop`. `user-reading.md` records that drag works from `file://` on the device, but its column covers the drag and the move buttons together.
- **Copy refused from `file://`.** Both builds read 'Copied' from `file://` (COPY-file), while `user-reading.md` records "Fails". No lane read the clipboard contents back.
- **The Claude app viewer.** No lane loaded the page there. Its scheme, origin, secure-context state, sandbox flags, and permissions policy are unmeasured.
- **A `content://` load.** It is unmeasured. A read of the Chromium source treats it as a trustworthy local scheme, and whether Edge inherits that is unmeasured (CR-02, corrected).
- **The device's command-line switches.** `user-reading.md` records `--enable-longpress-drag-selection` and `--touch-selection-strategy=direction`. No lane set either switch.
- **Two touch behaviors (CR-14, corrected).** A long-press context menu on the grip and the tap delay under the viewport meta are both unestablished.
- **An unexplained teardown failure.** In the CR-01 fault lane, `destroy()` also threw `VENEER_DESTROY` ('Component teardown failed') at load. The owning component was not identified (`cr01-crosscheck.json`).

The user has already told us the following, in `user-reading.md`:

- **How the page was opened.** It was opened both inside the Claude app and from a download, which Edge opened as `file://`.
- **The browser build.** The device runs Edge 153.0.4234.49 on Chromium 153.0.8010.53. The build is on the same branch as the Chromium 153.0.8010.12 lane.

The user can still tell us the following:

- **The Claude app check.** Inside the Claude app, does the Contents drawer open, and does an accordion item open? The drawer runs on the showcase's own `toggle` listener (`app/browser/Showcase.ts:113-117`), outside the engine scope. The accordion runs on the scope (CANARY-insecure).
- **The copy status text.** What exact status appears beside Copy reference from `file://`?
- **What "drag works" covered.** Did the `file://` drag reading cover a finger drag on the grip, the move buttons, or both?

## Questions for the user

The following questions need your ruling, each with one recommendation. The units run on the recommended paths unless you rule otherwise.

1. **Claude app check before M1 lands.** Inside the Claude app, open the Contents drawer, then tap an accordion header in the Accordion section. Report whether each one opens. I recommend running this check. The drawer runs outside the engine scope and the accordion runs on it, so a drawer that opens beside an accordion that stays closed matches the dead scope that M1 removes, while an accordion that opens points to a cause no lane measured.
2. **Device re-check after M1.** Will you re-read the rebuilt page on the S21+, both inside the Claude app and from a download in Edge? Read the status beside Copy reference, tap Parcels, tap a move button, and drag a grip with a finger. I recommend yes, because only the device reproduces the Claude app context and the `file://` copy refusal.
3. **Copy fallback.** When Android refuses the clipboard write, or the page runs where no clipboard API exists, can the copy button fall back to the older selection copy, `document.execCommand('copy')`? MDN marks it deprecated; see [Document: execCommand() method on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand). I recommend yes for both cases, with the guide naming the path, because the selection path is the only copy route the page has after the platform refuses `writeText`.
4. **Sort direction mark (M2).** Can the sortable header draw a direction mark after the column name, with the fixture rows authored out of order in every sortable column? I recommend yes, because a tap on Service or Updated otherwise changes nothing in view.
5. **Variants.** The variants judgment puts three questions to you: keying, color family, and precedence. See § Questions for the user in `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/variants-2026-10-08/judgment.md`. I recommend each on that judgment's own recommendation, which selects one `data-vn-color` attribute on the host over a class family.

## Sources

This verdict ran no browser; every reading comes from the lanes and runs named here. It read the following:

- **Readings and lane scripts.**
  - `/home/user/veneer/tmp/units/mobile-2026-10-08/readings/` (203 files).
  - `emulate.ts`, `insecure.ts`, `insecure-141.json`, `insecure-153.json`, and `prior-566e103.html`.
  - The `cr01-crosscheck`, `cr03-noinvoker`, `cr04-nomovebefore`, `cr05-nowithresolvers`, `cr09-frames`, and `cr13-bfcache` scripts, readings, and screenshots.
  - `cr07-sources/`.
- **Runs.** These are under `/home/user/veneer/tmp/units/journey-cost/runs/`, each with its `end.json`:
  - Exit 0: `MOB-emulate-141b`, `MOB-emulate-153`, `MOB-insecure-141b`, `MOB-insecure-153`, `MOB-cr01-crosscheck`, `MOB-cr03-noinvoker`, `MOB-cr04-nomovebefore`, `MOB-cr05-nowithresolvers`, `MOB-cr09-frames`, `MOB-cr13-bfcache-141`, and `MOB-cr13-bfcache-153`.
  - Exit 1 at launch: `MOB-emulate-141` and `MOB-insecure-141` (RUN-141-launch).
- **This folder.** `user-reading.md`, `probe-insecure-141.json`, `probe-insecure-153.json`, and `probe-insecure.ts`.
- **Veneer at `9f56e6a`.**
  - `src/browser/Veneer.ts`, `src/browser/sorters/Sorter.ts`, `src/browser/copiers/Copier.ts`, and `src/browser/drags/Drag.ts`.
  - `app/browser/main.ts`, `app/browser/Showcase.ts`, `app/browser/factories.ts`, and `app/browser/sections/column-sort.html`.
  - `guides/veneer.md` (§ Browser entry at `:694`, § Table column sort at `:1121`, and § Copy button at `:1378`).
  - `package.json` scripts.
- **The `landing` branch at `de168b8`.** `src/browser/drags/Drag.ts`, `src/browser/sorters/Sorter.ts`, `src/browser/Veneer.ts`, and `src/styles/surfaces/_drag.scss`, read with `git show`.
- **The M1 worktree.** The diff of `/home/user/.wave/veneer-mobile1` against `9f56e6a`, read with `git --no-optional-locks diff` on 2026-10-08.
- **Records.**
  - `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/drag-2026-10-08/verdict.md` (the Units shape and § Rejected).
  - `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/native/variants-2026-10-08/judgment.md`.
  - `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/stage-b/user-rulings-2026-10-06.md` (D-10 at `:13`).
  - `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/browser-stage-b-verdict.md:1058`.
- **Process note.** One read-only command in this verdict's lane began with `cd /home/user/veneer`, which breaks the lane's never-cd rule. It wrote nothing. This lane wrote only this file and `journal.json`.
