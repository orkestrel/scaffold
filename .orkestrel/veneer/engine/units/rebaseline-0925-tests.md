<!-- Grok lane recon-tests, session 0918a7d7-a5f8-487c-8d20-8f991f8a3e75 -->

I'll read the brief and follow it exactly.The brief is a read-only conformance check. I'll read the test rules, then search the named test files for each required pattern.The rules are loaded. Next I’ll inventory the named test files and search each required pattern.The first pass found no framework spies. I’ll search the same files for hand-written replacements, data tables, helpers, delays, and control-id titles.The named spies are absent. I’ll read the replacement sites, case-matrix literals, and each fixed delay so the classifications stay exact.Question
Where do `veneer/tests/src/browser/**`, `veneer/tests/src/core/**`, `veneer/tests/setupBrowser.ts`, and `veneer/tests/setupBrowser.test.ts` contain a mock or hand-written replacement, a test-file case matrix, a reusable test-file helper, a fixed delay waiting on engine behaviour, `describe`/`it`/`expect` in `setupBrowser.ts`, or a test title that is a control id?

Evidence

1. Mocks, fakes, spies, fake clocks, and hand-written replacements. Search: `vi.fn`, `vi.mock`, `vi.spyOn`, `vi.useFakeTimers`, `vi.stubGlobal`, `vi.`, `.prototype`, `Object.defineProperty`, `recordCalls` across the subject.

Named Vitest spies, mocks, fake timers, and `vi.stubGlobal`: none found.

`vi.resetModules` at `veneer/tests/src/core/index.test.ts:17` re-imports the real `@src/core` module. It is not one of those five APIs.

Call-through recorder. `recordCalls` at `veneer/tests/setupBrowser.ts:1550` replaces a prototype method, records the receiver, then `Reflect.apply`s the original (`veneer/tests/setupBrowser.ts:1560-1562`). Call sites of that recorder:

- `veneer/tests/setupBrowser.ts:1586` (`recordListeners`, `EventTarget.prototype.addEventListener`)
- `veneer/tests/setupBrowser.test.ts:1213` (`MutationObserver.prototype.disconnect`)
- `veneer/tests/src/browser/ScrollLock.test.ts:55` (`AbortController.prototype.abort`)
- `veneer/tests/src/browser/Tooltip.test.ts:1697` (`Element.prototype.getAttribute`)
- `veneer/tests/src/browser/Delegate.test.ts:413` (`MutationObserver.prototype.disconnect`)
- `veneer/tests/src/browser/Delegate.test.ts:1685` and `:1728` (`MutationObserver.prototype.observe`)
- `veneer/tests/src/browser/ScrollSpy.test.ts:997` (`IntersectionObserver.prototype.observe`)

Hand-written replacements that do not call through:

- `veneer/tests/src/browser/Tooltip.test.ts:491` sets `Element.prototype.setHTML` to `undefined` for the case, restored at `:493-494`. Host prototype method.
- `veneer/tests/setupBrowser.ts:2740` `shadowSetHTML` sets the element’s own `setHTML` to `undefined`. Host method. `buildWalkTarget` at `:2718` calls it.
- `veneer/tests/src/browser/sanitizers/ConfigSanitizer.test.ts:166` sets one element’s `setHTML` to `calls.handler`. Records arguments and does not call the original.
- `veneer/tests/src/browser/validators.test.ts:434` sets one element’s `setHTML` to `undefined`.
- `veneer/tests/src/core/index.test.ts:11` sets `globalThis.addEventListener` to `recorder.handler` and deletes it at `:24`. Host global. Does not call an original.

`Object.defineProperty` sites that install a throwing getter or iterator on a plain test value, not on a project function or a prototype method: `veneer/tests/src/browser/Placement.test.ts:95`, `veneer/tests/src/browser/parsers.test.ts:317`, `veneer/tests/src/browser/validators.test.ts:163`, `:178`, `:244`, `:408`, `:415`, `:452`, `:521`, `:528`, `:534`, `:562`, `veneer/tests/src/browser/helpers.test.ts:672`, `:1373`, `:1386`, `veneer/tests/src/browser/sanitizers/ConfigSanitizer.test.ts:418`, `:419`, `:422`.

2. Data tables and case matrices declared in a test file and walked by that file. Tables imported from `setupBrowser.ts` (`BUTTON_RESTORATIONS` at `Button.test.ts:514`, `SANITIZER_CASES` at `ConfigSanitizer.test.ts:134`, `MODAL_*` / `OFFCANVAS_*` / `SHOW_REVERSALS` / `RELEASE_REENTRIES` / `CLOSING_REACTIONS`) are declared in the setup module. Filters of those setup tables are `Modal.test.ts:2640` and `Offcanvas.test.ts:2802`.

Named literals in test files:

- `veneer/tests/src/browser/Modal.test.ts:1162`, `:1323`, `:1446`, `:2484`, `:3228`
- `veneer/tests/src/browser/Offcanvas.test.ts:1309`, `:1750`, `:1918`, `:2908`, `:3473`
- `veneer/tests/src/browser/Dropdown.test.ts:211`, `:631`, `:781`, `:1149`
- `veneer/tests/src/browser/Delegate.test.ts:2309`, `:2369`
- `veneer/tests/src/browser/Carousel.test.ts:2179`
- `veneer/tests/src/browser/ScrollSpy.test.ts:623`
- `veneer/tests/src/browser/helpers.test.ts:1245`
- `veneer/tests/src/browser/sanitizers/ConfigSanitizer.test.ts:29` (`ARIA_ATTRIBUTES`), `:363`

Inline literals the case walks:

- `Tab.test.ts:1571`
- `HostSnapshot.test.ts:558`, `:613`, `:1047`, `:1241`
- `Tooltip.test.ts:645`, `:1298`, `:1733`, `:2200`, `:2398`
- `Toast.test.ts:429`, `:509`, `:566`
- `Popover.test.ts:570`
- `Carousel.test.ts:276`, `:1244`, `:1383`, `:1402`, `:1412`
- `Offcanvas.test.ts:501`, `:620`, `:651`, `:1141`, `:1219`, `:2089`
- `Delegate.test.ts:1569`, `:2279`
- `Swipe.test.ts:125`, `:177`
- `Placement.test.ts:340`, `:367`
- `Dropdown.test.ts:590`
- `Collapse.test.ts:293`
- `ConfigSanitizer.test.ts:177`, `:277`, `:322`, `:336`
- `validators.test.ts:68`, `:376`
- `parsers.test.ts:187`, `:275`

Event-name array literals the same files walk: `Modal.test.ts:284`, `:1473`, `:2104`, `:2284`, `:2399`, `:2669`, `:2934`, `:3085`; `Offcanvas.test.ts:329`, `:984`, `:1160`, `:1232`, `:2098`, `:2438`, `:2599`, `:2721`, `:2829`, `:3187`, `:3319`; `Delegate.test.ts:771`, `:924`, `:955`, `:994`, `:1189`, `:1225`, `:1250`, `:1298`, `:1753`, `:1782`, `:2404`, `:2831`, `:2867`, `:2903`, `:3093`, `:3311`, `:3450`, `:3697`, `:3748`, `:3881`, `:4074`, `:4254`, `:4317`, `:4342`, `:4383`.

`veneer/tests/src/core/**` and `veneer/tests/setupBrowser.test.ts`: no case-row literal found. `setupBrowser.test.ts:396` and `:462` walk arrays of mounted nodes and two color strings.

3. Named helpers declared in a test file. Search: `function`, `const <name> = (async )?(` , `= function` in `*.test.ts`.

- `hook` `veneer/tests/src/browser/Modal.test.ts:372`
- `read` `veneer/tests/src/browser/Modal.test.ts:1500`
- `start` `veneer/tests/src/browser/Modal.test.ts:2783`
- `takeover` `veneer/tests/src/browser/Modal.test.ts:2954`
- `react` `veneer/tests/src/browser/Offcanvas.test.ts:1359`
- `read` `veneer/tests/src/browser/Offcanvas.test.ts:2130`
- `start` `veneer/tests/src/browser/Offcanvas.test.ts:3067`
- `takeover` `veneer/tests/src/browser/Offcanvas.test.ts:3207`

No other named function in a subject `*.test.ts`. `veneer/tests/src/browser/fixtures/entryListener.ts:7` `ENTRY_LISTENER_CONTROL` is a fixture module, not a `*.test.ts` file.

4. Fixed delays waiting on engine behaviour. Search: `setTimeout`, `setInterval`, `waitForDelay`, `new Promise`, `requestAnimationFrame`, `queueMicrotask`. `setTimeout` and `setInterval`: none found.

`waitForDelay` used to outlast engine timer behaviour:

- `Tooltip.test.ts:886` (500 ms, show delay cancelled), `:896` (60 ms, partial show delay), `:966` (30 ms, hide while focused), `:996` (20 ms, disabled click), `:1011` (20 ms, manual trigger), `:1666` (100 ms, after the pair has settled), `:1691` (30 ms, refused descendant), `:1720` (30 ms, descendant hover), `:1821` (20 ms, decoy hide)
- `Popover.test.ts:127` (20 ms, hover/focus stay hidden), `:156` (20 ms, Escape and outside click)
- `Carousel.test.ts:556`, `:563`, `:582`, `:638`, `:642`, `:649`, `:670`, `:696`, `:736`, `:739`, `:767`, `:772`, `:800`, `:860`, `:890`, `:942`, `:1001`, `:1051`, `:1110`, `:1263`, `:1554`, `:2281`
- `Delegate.test.ts:1396` (`waitForDelay(0)` after destroy, then asserts no `closed`), `:2682` (60 ms, slide count stays put)

`Alert.test.ts:186` `waitForDelay(0)` runs after `await closing` as an ordering clock beside the close promise.

Frame waits, which the brief separates from a timer wait: `Placement.test.ts:444`, `:731`; `Dropdown.test.ts:1405`, `:1453` (`requestAnimationFrame`). `queueMicrotask` at `Modal.test.ts:3175`, `:3206`, `:3361`, `Offcanvas.test.ts:880`, `:3409`, `:3451`, `:3605`, `ScrollSpy.test.ts:1038`, `:1094`, `:1146`, `:1223` schedules a class write inside a reaction.

5. `describe`, `it`, or `expect` in a subject `tests/setup*.ts`. Search in `veneer/tests/setupBrowser.ts`: `\b(describe|it|expect)\s*\(` and `\b(describe|expect)\b`. None found. The subject’s only `setup*.ts` is `setupBrowser.ts`.

6. Test titles that name a control id such as `A1`, `C2`, `D1`, or `R1`. Search: `\b[A-Z]\d+\b` and the literals `A1`, `C2`, `D1`, `R1` in subject `*.test.ts` titles (`it(`, `describe(`, `it.each(`, `it.for(`). None found. Titles that were opened state the behaviour (`Button.test.ts:515` uses `class=$classes` and `aria-pressed=$pressed` from the setup table).

Distillate
The five named Vitest fake APIs are absent. The prototype replacements that call the original are `recordCalls` and its eight call sites. Five other sites replace `setHTML` or `globalThis.addEventListener` and do not call through. Case-row literals are declared inside the browser `*.test.ts` files listed above; core tests and `setupBrowser.test.ts` do not declare one. Eight named helpers sit inside `Modal.test.ts` and `Offcanvas.test.ts`. Engine-timer waits are `waitForDelay` in Tooltip, Popover, Carousel, and Delegate. `setupBrowser.ts` has no `describe`, `it`, or `expect` call. No subject title is a control id of the `A1` form.

Unknowns
`setupBrowser.ts` and the large browser tests were searched by pattern, not read line by line, so a replacement written under a name other than `defineProperty`, `prototype`, `recordCalls`, or `vi.*` would be missed. The English word `it` inside `setupBrowser.ts` comments was not inventoried; the call form and the identifiers `describe` and `expect` were. Other `veneer/tests/setup*.ts` files are outside the subject, so item 5 was not run on them. `veneer/tmp/**` was not read. Whether a listener-name array is a case matrix is recorded by listing those lines in their own group.

Journal
Read `scaffold/.claude/rules/tests.md` and `scaffold/AGENTS.md` § Non-negotiable rules. Inventoried `veneer/tests/src/browser/**` (27 files), `veneer/tests/src/core/**` (2 files), `veneer/tests/setupBrowser.ts`, and `veneer/tests/setupBrowser.test.ts`. Searched those files for the six patterns and read each `recordCalls`, `setHTML`, `addEventListener` replacement, each `waitForDelay`, and the named case-table declarations.

Deviation
None. Read only. No file was edited.
