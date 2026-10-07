# falsify:subjective

1. Verdicts

Lane: subjective. Deviation: the dispatch supplied no diff text and no `git status` output, and this lane has no shell. I audited the source and guide at HEAD `ae1c9a1` directly. Paths are under `C:/Users/mikes/WebstormProjects/browser/` unless they name another repository.

1. **UNRESOLVED.** One model-facing text change exists, and ruling E covers it. Over MCP, refusals now carry the bare code: `src/server/BrowserMCPServer.ts:694` sends `JOURNEY_LOCKED: Journey …`, and `:630`, `:753` and `:858` prefix the bare `error.code`. The only evidence that the in-process page-tool and journey-tool copy is unchanged is the writer's audit script. Two runs settle it:
   - rerun `tmp/codex/api-audit.ts` against `51cf268`;
   - run `npx vitest run --config vite.config.ts --project service tests/service/browse.test.ts` several times while a discovery scan runs, to test the flaky crash-recovery case.

2. **BROKEN.** `src/server/types.ts:414-415` says `start()` "Rejects with … `BROWSER_TOOLSET_ENDED` after `destroy()`". No such code or constant exists; the code is `TOOLSET_ENDED`. The guide copies the sentence into the Methods row at `guides/browser.md:2722`.
   - Fix: "Rejects with `SERVER_UNAVAILABLE` when no browser can serve and with `TOOLSET_ENDED` after `destroy()`".
   - The other bullets hold where I checked. The guards are total (`tests/src/core/errors.test.ts:39-49`, and the installed `isInstance` wraps the check in `holds`). `BrowserStepError.action` survives (`src/core/errors.ts:31`). I did not judge the catch-all mapping; it goes to the objective lane.

3. **UNRESOLVED.** `createBrowserContext` refuses `proxy` and `origins` (`src/core/BrowserContext.ts:78-79`). Not owning the client is unproven. Settle it with a case asserting `client.connected === true` after both `createBrowserContext(client).destroy()` and `.close()`. No ollama source constructs an interned class.

4. **UNRESOLVED.** The guard requires `recorder` (`src/core/validators.ts:57-62`), and `BrowserPage.recorder` returns an existing field without side effects (`src/core/BrowserPage.ts:732`). Settle it with an `it.each` over every key in the `objectOf` at `validators.ts:34-76`. Each case wraps `fixture.page` in a Proxy that returns `undefined` for that one key and expects `false`. Count getter side effects in the same run.

5. **UNRESOLVED.** This is objective-lane primary. Referral: the public classes `BrowserEmulationManager` and `BrowserNetworkManager` still accept owner callbacks in their constructors (`src/core/BrowserContext.ts:95-101`, `src/core/BrowserNetworkManager.ts:68`). The objective lane needs to check whether a consumer can forge an observation through `new BrowserNetworkManager(fakeFrame)`.

6. **UNRESOLVED.** The design sentence is consistent: `src/core/types.ts:3502-3503` matches `guides/browser.md:1910`. Atomicity across processes is unproven. Settle it with two `node` child processes calling `set(journey, { exclusive: true })` on one file-store root; exactly one must resolve.

7. **UNRESOLVED.** The network body site handles codec's `undefined` with a coded `PROTOCOL` error (`src/core/BrowserNetworkManager.ts:131-134`). The other call sites need the objective sweep.

8. **UNRESOLVED.** This is objective-lane primary. See F2: `cookies.remove({})` behaves exactly like `clear()`.

9. **BROKEN.** The rows below name the breaks I found; the last row lists where the API still reads as a CDP wrapper.

   | Subject | Where | Defect | Fix |
   | --- | --- | --- | --- |
   | `assertBrowserPage` | `src/core/helpers.ts:3803` | It is the only `assert*` export in the package and the family guides, so it adds a third throwing prefix beside `validate*` and `require*`. Its name reads as the throwing twin of `isBrowserPage` ("is a page"), but it checks liveness on a value already typed as a page, which breaks the rule at `.claude/rules/names.md:112` ("Describe what a thing is"). It also republishes the removed `frame.assert` member as a barrel export, and its only callers are interned classes. | Rename in the package's `validate*` form for the condition, for example `validateBrowserPageOpen`, and update the guide row at `guides/browser.md:268`. |
   | `BrowserFrameLocation` | `src/core/types.ts:3525-3528`, guide `:183` | Public. Its members `get`/`set` break `names.md:116`. Only the internal `BrowserFrame` uses it. | Inline it on the `#url` field (`src/core/BrowserFrame.ts:42`), per plan § Surface hygiene. |
   | `BrowserWebSocketDriver` | `types.ts:3531-3536`, guide `:1205` | A public type whose summary reads "private drive callbacks". It is the plumbing the plan removed from `BrowserWebSocketInterface`. | Take it out of the published types, or rule explicitly why it stays. |
   | `BrowserElementManagerInput`, `BrowserElementInput`, `BrowserSessionFunction`, `BrowserWorldFunction`, `BrowserLoaderFunction`, `BrowserHARPending`, `BrowserToolsetHandler` | — | Constructor inputs and private state of interned classes, still published. | Same as the preceding row. |
   | Public manager classes | `src/core/index.ts:9-29` | The barrel still exports `BrowserClock`, `BrowserCookieManager`, `BrowserEmulationManager`, `BrowserHARManager`, `BrowserNetworkManager`, `BrowserKeyboard`, `BrowserMouse`, `BrowserTouch`, `BrowserNavigationManager`, `BrowserPermissionManager`, `BrowserScriptManager`, `BrowserStorageManager`, `BrowserTracing`, `BrowserCoverage`, `BrowserPerformance`, `BrowserProfiler`, `BrowserDiagnostics`, and `BrowserAccessibility`. The guide's own rule at `guides/browser.md:27` is "internal classes: their owners construct them and return their public interfaces", and pages and contexts construct every one of these. Table keeps its manager classes out of the barrel (`patterns-2.md:45`, `:105`), and no consumer constructs one (ollama checked). | Drop these class exports, or restate the rule at `:27` and rule on each class. |
   | Error codes | `types.ts:21-93` | The union holds synonyms for one concept:<br>• closed state: `CLOSED`, `CONTEXT_CLOSED`, `PAGE_CLOSED`, `DESTROYED`, `TOOLSET_ENDED`<br>• deadline: `TIMEOUT`, `NAVIGATION_TIMEOUT`, `WAIT_TIMEOUT`<br>• invalid input: `ARGUMENT`, `JOURNEY_ARGUMENT`, `TOOLSET_ARGUMENT`, `SERVER_OPTIONS`<br>Failing input: `createFileBrowserRunStore({ root, limit: 0 })` rejects with `JOURNEY_ARGUMENT`, and a missing root rejects with `JOURNEY_PATH` (`src/server/stores/FileBrowserStore.ts:31`, `:36`): a run store reports journey codes. Meanwhile `journeys.set(j, { revision: 0 })` rejects with `ARGUMENT`. Family unions are one category per concept (`patterns-2.md:25`, `:49`). | At least make the shared file store use `ARGUMENT` and a store-neutral path code. Route the synonym collapse to the Orchestrator, because ruling E kept "the rest". |
   | `BrowserWalkOptions` | `types.ts:3237-3245` | Named for the removed `walk`, and its doc still lists `order`. | Rename it for the traversal and delete the `order` bullet. |
   | `depth`/`breadth` | `types.ts:3261-3263` | Nouns used as method names, against `names.md:114`. | Conflict between the approved plan and the rule: referred to the Orchestrator. |
   | `listed`/`found` | `types.ts:2482-2484` | Past participles, the boolean form (`names.md:183`), used for numbers. | Conflict between the approved plan and the rule: referred to the Orchestrator. |
   | Places that still read as a CDP wrapper | see the following list | — | — |

   Places that still read as a CDP wrapper:
   - `send`, `subscribe` and `unsubscribe` on every frame, page and worker (`types.ts:3159-3167`, `:1115`). `isBrowserPage` requires them (`validators.ts:45-47`).
   - `BrowserContextInterface.sync(targets: CDPTarget[])` (`types.ts:3469`).
   - The `createBrowser` doc reads "raw-CDP `BrowserInterface` façade" (`src/server/factories.ts:23`), and the `BrowserInterface` remarks read "raw-CDP browser lifecycle" (`src/server/types.ts:188`).
   - Class summaries name CDP domains instead of what the thing is (`guides/browser.md:106-116`).
   - The `download.abort` doc names `Browser.cancelDownload` (`types.ts:1074`).
   - About 70 CDP decoders and compilers sit in the "Context and page" entity table (`guides/browser.md:269-337`), not in the protocol layer.

10. **BROKEN.** The tagline equals the README pitch (guide `:3-5` matches `README.md:3-5`). These sentences still describe the API as it was before the series:
    - `src/core/types.ts:3354-3355` and guide `:135`: "…DOM snapshots, codegen…". The `codegen` bullet at `:3368` remains, and `recorder` is missing from the remarks.
    - `types.ts:1060-1062`: "`update` is on this contract".
    - `types.ts:1238-1240`: "The drive methods are on this contract".
    - `types.ts:3130-3131`: frame `assert` and `update` bullets. These contradict Contract 27 (guide `:3094`).
    - `types.ts:2225`: run stores "provides `snapshot`"; the member is `write`.
    - `types.ts:1496` and guide `:162`: `BrowserCookieFilter` is "for clearing"; it now serves `remove`.
    - `types.ts:300` and guide `:220`: "creating a `BrowserPage` instance", though `BrowserPage` is internal.
    - Guide `:1826` and `:2122`: "a standalone `BrowserFrame` with no `epoch` argument". A consumer cannot construct one.
    - Guide `:2722`: `BROWSER_TOOLSET_ENDED` (claim 2).

    The guide also states things that are false:
    - Contract 7 (guide `:3073`) says `ARGUMENT` and `CLOSED` distinguish invalid input and closed state. The synonym codes in claim 9 make that partition false.
    - Contract 29 (guide `:3096`) says "one operation per behavior", but `remove({})` equals `clear()` (F2). It also cites a directory as its proof.
    - The guide fence at `:1284-1286` binds `endpoint` to a `BrowserDiscoveryResult` and `alive` to `ping()`, which resolves `void`.

    The Surface does not walk the entities first. The first concept table (`:93-351`) opens with `createBrowserHAREntry`, then 20 manager classes, then protocol decoders. `Browser` appears only at `:1276`. Fix: order each concept table entity → interface → options, and move the decoders and compilers to "Protocol layer".

    Executed proof for every behavior sentence is NOT-EVIDENCED; it needs the `npm run test:guides` fence-execution census.

11. **BROKEN.** `BROWSER_TOOLSET_ENDED` survives in source (`src/server/types.ts:415`) and in the guide (`guides/browser.md:2722`); the fix is in claim 2. Two smaller items: the test title at `tests/src/core/BrowserClock.test.ts:8` still says "installs … uninstalls", and the earlier fix list covers the stale TSDoc. Ollama has migrated: `C:/Users/mikes/WebstormProjects/ollama/tests/setupService.ts:3`, `:240` (`findSystemBrowsers`) and `tests/setupStore.test.ts:1332` (`runs.create`).

12. **BROKEN.**
    - **Prefix:** caught. Mutating `src/core/errors.ts:34` from `'STEP'` to `'BROWSER_STEP'` fails `tests/src/core/errors.test.ts:26-31`. A prefixed `JOURNEY_INVALID` fails `tests/src/core/validators.test.ts:143-149`.
    - **`isBrowserPage` without a recorder:** not caught. Deleting `recorder: objectOf(...)` at `validators.ts:57-62` survives. `tests/src/core/validators.test.ts:38-45` refuses only a sparse double and a page whose `navigation` is broken. Fix: add the per-key Proxy case from claim 4.
    - **Non-atomic journey write:** objective lane; UNRESOLVED here.
    - **Emulation before `create`:** caught. Resolving before emulation finishes fails `tests/src/core/BrowserContext.test.ts:112`, and skipping emulation times out at `:111`.
    - **Tolerant base64 decode:** caught only globally, by `tests/src/core/BrowserPage.test.ts:1222-1226` and `tests/src/core/helpers.test.ts:133`. A tolerant decode restored only at the network body site (`src/core/BrowserNetworkManager.ts:131-134`) survives, because `tests/src/core/BrowserNetworkManager.test.ts:146-163` has no malformed case. Fix: add one there.

2. Findings outside the claims

- **F1.** `BrowserContextOptions` admits keys that each of its two consumers refuses at runtime (`src/core/types.ts:1641-1660`):
  - `createBrowserContext(client, { proxy })` type-checks and then throws `ARGUMENT` (`src/core/BrowserContext.ts:78`);
  - `browser.isolate({ id: 'ctx-1' })` type-checks, and `types.ts:1641` documents that `isolate` refuses it.

  Fix: give each consumer its own type, so the wrapper type carries no `proxy` or `origins` and the `isolate` type carries no `id`.
- **F2.** `cookies.remove({})` removes every cookie, identical to `clear()`, because "an empty filter matches every cookie" (`types.ts:1509-1512`). That gives one behavior two operations. Fix: refuse an empty filter with `ARGUMENT`.
- **F3.** `BrowserJourneyToolsetInterface` (`types.ts:2244-2249`) cannot be reached. The only holder is the private field at `src/core/BrowserToolset.ts:211`, yet the guide's Methods section documents it at `:1936-1949`, and its example never touches an instance. Fix: expose it as a readonly noun on the toolset, or take it out of the published contract.
- **ADVISORY A1.** The recorder keeps `started` (`types.ts:1856`), while the clock, HAR, tracing, coverage and profiler use `active` (`:851`, `:1427`). That is one concept with two terms. The plan ruled it, so it is referred to the Orchestrator.
- **ADVISORY A2.** `createBrowserHAREntry` (`src/core/helpers.ts:1185`, which predates this series) returns plain data. By `names.md:96` it is a `build*` helper.
- **ADVISORY A3.** The `BROWSER_SERVER_*` constants keep the prefixed spelling while their values are bare codes (`src/server/constants.ts:240-271`), so ruling E's dropped spelling survives in the docs.
- **ADVISORY A4.** `{ revision, exclusive: false }` is refused (`helpers.ts:3791`), although `false` means the same as omission everywhere else. Consider typing the key as `exclusive?: true`.
- **ADVISORY A5.** The series appended its declarations after the context section (`types.ts:3486-3536`) instead of in their own sections, and `BrowserToolsetOptions` omits `notes`, `on` and `error` from its remarks (`:2919-2931`).

3. Attacked and held

- The error shape matches table, form and workspace: `(code, message, context?)` with one guard per class (`src/core/errors.ts:11-56`).
- `validateBrowserJourneyWriteOptions` follows the package's `validate{Type}` precedent (guide `:331-337`, `:963-970`) and the family's `validateShape`.
- The new factory names hold the `create{Entity}` form: `createBrowserContext`, `createBrowserToolset`, `createWebSocketCDPTransport`, `createFileBrowserWriter`.
- `BrowserMCPServerOptions` groups by noun, and every leaf is one word (`src/server/types.ts:383-398`).
- Network `routes.add`/`remove`/`clear` with `apply`, the clock's `active`/`start`/`stop`, and HAR's `active` all follow the family's manager vocabulary.
- The guide's `exclusive: false` sentence matches its TSDoc.

VERDICT: FAIL 2, 9, 10, 11, 12; outside the claims: F1, F2, F3
