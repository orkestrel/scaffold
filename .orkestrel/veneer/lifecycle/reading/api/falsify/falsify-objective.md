# falsify:objective

1. **BrowserError guard.** The verdicts follow in claim order. I held the objective lane (O). Where a claim needs a run, I name the probe.

1. **UNRESOLVED.** Two things would settle it.
   - **Probe:** run `npx vitest run --config vite.config.ts --project service tests/service/browse.test.ts -t "renderer"` 20 times at `51cf268` and 20 times at `ae1c9a1`. Run each pass alongside `node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-harden/scripts/discovery.js`. Equal failure rates clear the series.
   - **Ruling E needs an Orchestrator decision.** The claim as written is false for the MCP journey text. For example, `src/server/BrowserMCPServer.ts:694` changes `BROWSER_JOURNEY_LOCKED: …` to `JOURNEY_LOCKED: …` in `replay`/`forget` results. Ruling E approves MCP text changes, so the claim needs that carve-out written into it.
   - **Attacks that held:** the eight handler bodies and the reading code match the checkpoint (`api*-audit` receipts). `describeBrowserRefusal` keeps the old wording. A real, open page gets the same six tools plus `dialog`. The window in finding 4 is a separate, small model-facing change.

2. **BROKEN.** Three sub-claims fail.
   - **Catch-all codes that don't fit the site:**
     - `src/core/BrowserPage.ts:2221` rejects a `navigate` load timeout with `NAVIGATION`. The navigation wait timeouts use `NAVIGATION_TIMEOUT` (`BrowserNavigationRecord.ts:318`, `BrowserNavigationManager.ts:111`). A caller branching on `code` can't tell a timeout from a `net::ERR` failure without parsing the message. `tests/src/core/BrowserPage.test.ts:572-574` pins the misfit.
     - `src/core/BrowserClock.ts:87`, `src/core/BrowserTracing.ts:117`, and `src/core/BrowserRegistry.ts:444` use `PROTOCOL` for deadlines. `guides/browser.md:3073` states "protocol deadlines use `TIMEOUT`".
     - **Fix:** use `NAVIGATION_TIMEOUT` at `BrowserPage.ts:2221` and `TIMEOUT` at the other three sites. Update the `BrowserPage.test.ts:573` assertion to match.
   - **`BROWSER_` code names survive in shipped TSDoc:**
     - `src/server/types.ts:414-415` names `BROWSER_TOOLSET_ENDED`, which exists nowhere. The guide copies it at `guides/browser.md:2722`.
     - `src/browser/factories.ts:16-17` names `BROWSER_DOCUMENT` and `BROWSER_DOCUMENT_OWN`. The real codes are `DOCUMENT` and `DOCUMENT_OWN` (`BrowserDOMView.ts:62,68`).
     - **Fix:** write `TOOLSET_ENDED`, `DOCUMENT`, and `DOCUMENT_OWN`.
   - **Attacks that held:**
     - `BrowserStepError.action` survives (`errors.ts:30-37`).
     - Both guards are `isInstance` inside the contract's total wrapper.
     - Abort: every store catch calls `throwIfAborted` before translating (`FileBrowserStore.ts:86,120,167,181`). The journey toolset rethrows when `signal.aborted` (`BrowserJourneyToolset.ts:316,470,507`).
     - Plain `Error` objects remain only as loss causes (`BrowserMCPServer.ts:1233,1256,1294,1302`) and in-page compiled code; no consumer-facing rejection carries one.

3. **CONFIRMED.**
   - `BrowserContext.ts:78-80` refuses `proxy` and `origins`, including `origins: []`, before any state is set.
   - Nothing in `#closeResources` or `#destroyResources` closes the client (`BrowserContext.ts:359-394`).
   - `Browser.ts:276-297` still sends `proxyServer` and `originsWithUniversalNetworkAccess`, strips both before wrapping, and refuses `id`.
   - A grep of ollama's `tests/` found no constructor of `BrowserPage`, `BrowserFrame`, `BrowserJourneyToolset`, or an element class.

4. **BROKEN.**
   - **Input:** a real page after `await page.close()`, or after its client disconnects.
   - **What happens:** `isBrowserPage` (`src/core/validators.ts:68`) reads `registry`. That getter calls `this.#assert()` (`src/core/BrowserPage.ts:502-503`), which throws `CLOSED`. `attempt` catches it, so the guard returns `false`.
   - **Effect:**
     - `createBrowserToolset(closedPage)` silently builds the DOM toolset: `read`, `click`, `type`, and `wait`, with no `press`, `navigate`, or `dialog`.
     - With `{ context }` it throws `TOOLSET_CONTEXT` "requires a page", which misreports the cause. `BrowserMCPServer.ts:1407` hits this when a page closes between `context.create()` and toolset construction.
   - **Fix:** make the guard total over lifecycle state.
     - Either drop the assert from `BrowserPage.ts:503`, because `BrowserRegistry.start` and `adopt` already assert (`BrowserRegistry.ts:119,135`),
     - or test `registry` with `'registry' in value` and don't read it.
     - Then add `expect(isBrowserPage(closedPage)).toBe(true)` to `tests/src/core/validators.test.ts`.
   - **Also:** the guard requires `recorder` (`validators.ts:57-62`), but no code in `BrowserToolset.ts` or `BrowserJourneyToolset.ts` reads `page.recorder`. The requirement exceeds "capabilities the toolset uses".
   - **Held:** `trusted: isTrue` keeps every DOM view out (`BrowserDOMView.ts:86`), and the guard sends no protocol call.

5. **CONFIRMED.**
   - Downloads register their driver before emitting (`BrowserPage.ts:1971-1982`, `1989-1992`).
   - A socket's driver is installed synchronously in its constructor, before `socket` is emitted (`BrowserWebSocket.ts:20-29`, `BrowserNetworkManager.ts:199-206`).
   - Emulation is awaited inside the attach path before `create` returns (`BrowserContext.ts:305,344`) and for popups (`610`).
   - No public interface exposes `update`, `receive`, or `attach`.
   - **Attack tried:** a `void` (not awaited) emulation call. `BrowserContext.test.ts:94-123` would catch it.

6. **CONFIRMED.**
   - Memory: no `await` sits between the condition check and the write (`MemoryBrowserJourneyStore.ts:45-55`).
   - File: the conditions are copied before any async step (`FileBrowserJourneyStore.ts:79`) and evaluated inside the lock (`88-93`).
   - Invalid conditions are refused before validation of the name or any filesystem access (`helpers.ts:3785-3792`). The test cases include `revision: 0` and `{ revision, exclusive: false }`.
   - The `0` defaults in `FileBrowserJourneyStore.ts:95` and `MemoryBrowserJourneyStore.ts:52` are internal arithmetic, not API sentinels.
   - **Interleavings tried:** two exclusive creators, two `revision: 1` writers, a lock held by a live process, and the caller mutating options after the call (`tests/src/core/stores/suite.ts:60-69`). Each stays mutually exclusive.

7. **CONFIRMED.**
   - Screenshot and PDF decode before `#save` and throw `PROTOCOL` (`BrowserPage.ts:672-675,693-695`).
   - IO chunks throw before tracing writes, and tracing writes only after concatenating every chunk (`helpers.ts:1854-1859`, `BrowserTracing.ts:99-104`).
   - A network body throws a coded error (`BrowserNetworkManager.ts:133`).
   - HAR replay aborts the request (`BrowserHARManager.ts:206-208`), and HAR validation refuses with `ARGUMENT` (`helpers.ts:1427`).
   - **Attack tried:** a partial file through screenshot `path` or trace `path`. Neither writes before decoding.

8. **CONFIRMED.**
   - `apply` gates each field on supply (`BrowserNetworkManager.ts:89-110`).
   - `routes.add` splices only its own entry by `indexOf` (`BrowserRouteManager.ts:24-35`). That is stricter than the legacy `splice(-1)`.
   - `cookies.remove` restores the cookies it didn't match (`BrowserCookieManager.ts:59-90`).
   - The clock body matches legacy `install` and `uninstall` token for token (`BrowserClock.ts:35-47,112-120`).
   - `depth` and `breadth` keep the legacy stack and queue order with the visited set (`BrowserSnapshot.ts:200-239`).
   - See finding 3 for an absence-law breach in `apply`.

9. **UNRESOLVED.** This is the subjective lane's claim. Evidence for that lane:
   - `BrowserWalkOptions` keeps "Walk" after `walk` left (`types.ts:3244`).
   - Its TSDoc still documents a removed `order` field (`types.ts:3242`).
   - `BrowserWebSocketDriver` stays a public type for owner-only plumbing.

10. **BROKEN.** These are the objective parts; the voice is the subjective lane's.
    - `guides/browser.md:135` and `src/core/types.ts:3355,3368` still describe `codegen`, which is removed.
    - `guides/browser.md:2722` names `BROWSER_TOOLSET_ENDED`.
    - `guides/browser.md:3073` says protocol deadlines use `TIMEOUT`, which is false per claim 2.
    - **Fix:** rewrite the `BrowserPageInterface` description around `recorder`, fix the code names, and align line 3073 after the claim 2 fix.

11. **BROKEN.**
    - Shipped `.d.ts` TSDoc names removed API:
      - `types.ts:3368` (`codegen`)
      - `types.ts:3242` (`order`)
      - `server/types.ts:415` (`BROWSER_TOOLSET_ENDED`)
      - `browser/factories.ts:16-17` (`BROWSER_DOCUMENT`, `BROWSER_DOCUMENT_OWN`)
    - Code, fences, and the generated module are clean. `compilers.ts:988` emits `createBrowserToolset(page)`.
    - **Ollama's harness unit:** `findSystemBrowsers` (`ollama/tests/setupService.ts:240`) and `runs.create` (`ollama/tests/setupStore.test.ts:1276`). Both already sit in ollama's working tree.
    - **Fix:** the doc edits listed under claims 2 and 10.

12. **BROKEN.**
    - **Recorder mutation survives.** Deleting `recorder: objectOf({...})` at `validators.ts:57-62` leaves every case in `tests/src/core/validators.test.ts:27-65` green. The real page stays `true`, the view double fails on other members, and the `navigation: {}` proxy fails on `navigation`.
      - **Fix:** add a proxy over `fixture.page` that returns `undefined` for `recorder`, and assert `false`.
    - **The rest bind:**
      - **`BROWSER_` prefix:** the union fails `npm run check`, and `tests/src/core/stores/suite.ts:32` asserts the bare code.
      - **Non-atomic memory write:** an `await` between check and write fails `tests/src/core/stores/suite.ts:42-59`.
      - **File-store check moved outside the lock:** fails `tests/src/server/stores/suite.ts:585-612` deterministically, because it reports `JOURNEY_STALE` instead of `JOURNEY_LOCKED`.
      - **Lock removed:** fails `tests/src/server/stores/suite.ts:538-583`.
      - **Emulation skipped or not awaited:** fails `tests/src/core/BrowserContext.test.ts:94-123`.
      - **Tolerant decode:** fails `tests/src/core/BrowserPage.test.ts:1222,1226` and `tests/src/core/helpers.test.ts:133`.

## 2. Findings outside the claims

- **F1 (absence law).**
  - **Where:** `src/core/types.ts:3510-3511` documents "explicit undefined clears them. Omission retains them". `BrowserNetworkManager.ts:100` implements it with `'credentials' in options`. `BrowserEmulationManager.ts:173` depends on it.
  - **Failure:** `apply({ ...defaults })`, where `defaults.credentials` is `undefined`, wipes credentials the caller never meant to touch. `AGENTS.md` § Absence forbids telling `undefined` apart from omission.
  - **Fix:** express clearing as a supplied value rather than key presence. The shape is the subjective lane's call.
- **F2 (test that can flake, objective).**
  - **Contradiction:** `tests/src/server/stores/suite.ts:336-337` admits "Publication can overlap and make both holders refuse". Yet the shared suite case `tests/src/core/stores/suite.ts:42-59` (run against the file store at `FileBrowserJourneyStore.test.ts:34`) and `server/stores/suite.ts:549,569` require exactly one fulfilled write.
  - **Interleaving:**
    1. A runs `mkdir` on the lock directory.
    2. B gets `EEXIST`, reads it empty, removes it with `rmdir`, and runs `mkdir` again (`FileBrowserStore.ts:207-217`).
    3. A runs `open(entry, 'wx')` and succeeds inside B's directory.
    4. B creates its own entry.
    5. Both read `[A, B]` and break at line 232, so both writers get `JOURNEY_LOCKED`.
  - **Fix:** either make the in-process cases accept zero or one fulfilled writes, as the cross-process case does, or make empty-lock reclaim impossible within one process.
- **ADVISORY:**
  - **Lost update on edit:** `BrowserJourneyToolset.ts:465-467` writes unconditionally when a custom store returns a revision without `revision`, which `types.ts:1775` permits.
  - **Untested refusal:** no test pins the network body's malformed-base64 refusal (`BrowserNetworkManager.ts:133-134`).

## 3. Attacked and held

- **Lock exclusivity:** under the empty-lock reclaim race, both writers can't each see a single-entry lock, so two writers never proceed together (`FileBrowserStore.ts:219-234`).
- **Counter-write abort:** rollback restores or removes the snapshot without the signal (`FileBrowserJourneyStore.ts:103-110`).
- **Context wrapper:** `isolate` no longer leaks the remote context when the wrapper constructor throws. It validates first at `Browser.ts:272`.
- **Concurrent route adds:** a failing configure removes only its own definition.
- **Cookies:** `remove({})` equals clearing everything, as the legacy filter did.
- **Guard and hostile inputs:** `isBrowserPage` on a revoked proxy, a throwing getter, `null`, or a string returns `false` without throwing. Reading `registry` allocates a `BrowserRegistry` but sends no protocol call.
- **Server error text:** the server constants carry bare values (`server/constants.ts:240-271`), and `describeBrowserServerLoss` takes them.

VERDICT: FAIL 2, 4, 10, 11, 12; outside the claims: F1, F2
