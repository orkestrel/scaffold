# Fix dossier: browser

Verified fix-producing findings for the `browser` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s04-01 — DRIFT

1. package=browser file=`src/core/helpers.ts:195,236,264,308,332,626,651,669,752,1251,1627,1789,1834,1857,1881,2065,2897,2911,2979` rule=`.claude/rules/architecture.md` § Kind purity + `AGENTS.md` § Fixed derivation/construction forms verdict=CONFIRMED
   wrong: Nineteen exported functions returning `T | undefined` from an `unknown` input are coercers, which the kind table places in `*/parsers.ts` under the `parse*` name form, but they sit in `helpers.ts` named `read*`; the package has no `parsers.ts` at all, while a genuine coercer named correctly (`parseCodegenActionPayload`, line 2030) sits in `helpers.ts` beside them.
   repair: Create `src/core/parsers.ts`, move every `read*` function whose return type is `T | undefined` into it, rename each to `parse*` (`readBrowserRequest` → `parseBrowserRequest`, and so on), move `parseCodegenActionPayload` there unchanged, and update the importers. The barrel star-exports both files, so the surface changes only by the renames.

## s04-02 — DRIFT

2. package=browser file=`src/core/helpers.ts:2923,2947,2958,2999,3023` and `src/core/helpers.ts:195,1554,1568` rule=`AGENTS.md` § Design laws ("One concept, one term") + `.claude/rules/names.md` § Standalone helpers ("A helper prefix has one project-wide meaning") verdict=CONFIRMED
   wrong: Three prefixes name one operation — turning an unknown CDP payload into a typed value. `decodeRareStringData`, `decodeBrowserAttributes`, and `decodeBrowserSnapshot` do exactly what `readBrowserCookies` and `readBrowserRequest` do, and every one of their TSDoc first sentences literally begins "Decode". A reader cannot predict which prefix a given decoder carries.
   repair: After finding 1 moves the `| undefined` coercers to `parse*`, rename the remaining throw-on-malformed decoders to one prefix — `read*` — and rename `decodeRareStringData`, `decodeRareBooleanData`, `decodeRareIntegerData`, `decodeBrowserAttributes`, and `decodeBrowserSnapshot` to match. Leave `decodeBase64`/`encodeBase64` alone; base64 decoding is a different concept.

## s04-03 — DRIFT

3. package=browser file=`src/core/helpers.ts:722,785,823,838,1109,1152,1642,1661,1677,2090,2163,2298,2305,2339,2373,2412,2454,2635,2677,2719,2766,2812,2836,2867` rule=`.claude/rules/architecture.md` § Centralized-file pattern (Shape/algorithm compilers → `*/compilers.ts`) and § Kind purity verdict=CONFIRMED
   wrong: Twenty-four exported `compile*` functions that emit in-page JavaScript source sit in `helpers.ts`. They are the package's compiler kind — a distinct concern from the decode/validate leaves they share the file with — and are the single largest reason `helpers.ts` is 3253 lines.
   repair: Create `src/core/compilers.ts` and move every `compile*` function plus `guardEvaluateExpression` (see finding 22) into it. No consumer changes; the barrel star-exports both.

## s04-04 — DRIFT-RESHAPE

4. package=browser file=`src/core/constants.ts:164-167` (consumed at `src/core/BrowserHARManager.ts:107`) rule=`AGENTS.md` § Design laws ("Derive state … do not store a second flag or label that can drift") verdict=CONFIRMED
   wrong: `BROWSER_HAR_CREATOR` hardcodes `version: '0.0.11'` while `package.json` declares `0.0.14`. Every HAR archive this package writes therefore stamps a creator version that is three releases stale, and the drift is invisible because nothing compares the two.
   repair: Delete the hardcoded `version` field. Read the package version from the one place that owns it — take it as a `BrowserHAROptions` field the server supplies, or drop the version to a fixed non-version string such as `'unversioned'`. Do not keep a second copy of the version anywhere in `src/`.

### Verification

**Judge (DRIFT-RESHAPE/high):** Both lanes are right that the drift is real, and I confirmed it: constants.ts holds 0.0.11 while the manifest holds 0.0.14, it is the sole version literal in src/, and no fleet sibling keeps one. The dispute is the repair, and the subjective lane's decisive evidence is real. `BrowserHARCreator.versi

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/high:** amend: keep `BrowserHARCreator.version`. Close the drift with a mechanism that recomputes the fact — a parity assertion in `tests/` comparing `BROWSER_HAR_CREATOR.version` against `package.json`, or a build-time injected version. The finding's second alternative (a fixed non-version string) is acceptable and type-valid; deleting the field is not.

## s04-05 — DRIFT

5. package=browser file=`src/server/types.ts:34-39` (produced at `src/server/Browser.ts:545-550,557-559`) rule=`AGENTS.md` § Design laws ("Derive state", "Absence is `undefined`") verdict=CONFIRMED
   wrong: `BrowserDiscoveryResult` carries three fields encoding one bit. `found` is computed as `endpoint !== undefined` and `connection` as `endpoint !== undefined ? 'cdp' : undefined`, so `{ found: true, endpoint: undefined }` is a representable state the type permits and nothing prevents.
   repair: Reduce the interface to `{ readonly endpoint: string | undefined; readonly browser: string | undefined }`. `endpoint !== undefined` is the discovery answer. Delete `#notFound()` at `Browser.ts:557`, which collapses to a literal once the derived fields are gone, and update `guides/browser.md`.

## s04-06 — DRIFT

6. package=browser file=`src/core/types.ts:101-103` rule=`.claude/rules/names.md` § General vocabulary ("Describe what a thing is") verdict=CONFIRMED
   wrong: `ScreenshotWriterInterface` is the package's only byte sink and persists far more than screenshots — HAR archives (`BrowserHARManager.ts:115`), Chromium traces (`BrowserTracing.ts:95`), PDFs (`BrowserPage.ts:339`), and screenshots (`BrowserPage.ts:320`). The name tells a consumer the interface does one thing when it does four, and it is the only public interface in either barrel carrying neither the `Browser` nor the `CDP` prefix.
   repair: Rename to `BrowserWriterInterface`, rename `createScreenshotWriter` to `createBrowserWriter`, and update `src/core/BrowserContext.ts`, `BrowserPage.ts`, `BrowserHARManager.ts`, `BrowserDiagnostics.ts`, `BrowserTracing.ts`, `src/server/factories.ts`, `README.md`, and `guides/browser.md`.

## s04-07 — DRIFT

7. package=browser file=`src/core/types.ts:510` rule=`.claude/rules/architecture.md` § Wrapper test ("Delete … compatibility aliases") verdict=CONFIRMED
   wrong: `export interface BrowserFilterOptions extends BrowserLocatorFilter {}` adds no member and no narrowing. It is a rename-only alias of `BrowserLocatorFilter`, published in the barrel as a second name for one concept.
   repair: Delete `BrowserFilterOptions`, change `BrowserLocatorInterface.filter` (line 529) to take `BrowserLocatorFilter`, and update `BrowserLocator.ts` and the guide row.

## s04-08 — DRIFT

8. package=browser file=`src/core/types.ts:155-157` rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS make interface properties and public return collections readonly") verdict=CONFIRMED
   wrong: `BrowserNavigationWatch.responses` is typed `BrowserResponse[]`, a mutable array on a barrel-exported interface property. Every other collection property in this file is `readonly T[]`.
   repair: Change to `readonly responses: readonly BrowserResponse[]` and copy-on-write at the accumulation site in `BrowserPage.ts:519-530`. If the mutability is load-bearing for the accumulator, the type belongs off the public interface entirely — it is internal navigation bookkeeping, not a consumer contract.

## s04-09 — DRIFT

9. package=browser file=`src/core/types.ts:513-515,546` (implemented at `src/core/BrowserLocator.ts:286-299`) rule=`.claude/rules/names.md` § Split behavioral variants + `.claude/rules/patterns.md` § Managers/Accessors verdict=CONFIRMED
   wrong: `text(options?: { all?: boolean }): Promise<string | readonly string[]>` hides two algorithms behind a discriminator. `all: true` compiles a different expression, runs a different validation, and returns a different type, so every caller must narrow a union the API could have avoided. The type name `BrowserTextResultOptions` also stacks two role suffixes from `.claude/rules/names.md` § Type-level identifiers.
   repair: Split into `text(): Promise<string>` and `texts(): Promise<readonly string[]>`, the singular/plural accessor shape `.claude/rules/patterns.md` prescribes. Delete `BrowserTextResultOptions`. Update `BrowserLocator.ts` and the guide's method table.

## s04-10 — DRIFT

10. package=browser file=`src/core/types.ts:876-884,728,1389-1390` (implemented at `src/core/BrowserWebSocket.ts:36-53`) rule=`AGENTS.md` § Design laws ("Minimal public API") + `.claude/rules/architecture.md` § System constraints ("Keep interfaces to the smallest primitives the capability requires") verdict=CONFIRMED
   wrong: Interfaces the package hands a consumer as observations publish the owner's write surface. `BrowserWebSocketInterface` exposes `receive`, `transmit`, `fail`, and `close` — pure emit triggers the network manager calls; a consumer holding the `socket` event payload can call `socket.receive(frame)` and every listener sees a frame that never crossed the wire. `BrowserDownloadInterface.update(progress)` and `BrowserFrameInterface.update(url)`/`assert()` are the same shape: `frame.update('https://…')` desynchronizes the frame's reported URL from the page with no protocol call.
   repair: Split each contract. Keep the read surface plus `emitter` on the published interface (`BrowserWebSocketInterface`, `BrowserDownloadInterface`, `BrowserFrameInterface`) and move the drive methods onto the concrete class only, typing the owner's field as the class rather than the interface. `BrowserRoute` already demonstrates the correct split.

## s04-11 — DRIFT-RESHAPE

11. package=browser file=`src/core/BrowserWebSocket.ts:44,48` rule=`AGENTS.md` § Design laws ("One concept, one term. Lifecycle verbs have fixed meanings") + `.claude/rules/names.md` § Fixed lifecycle vocabulary verdict=CONFIRMED
   wrong: `close(timestamp: number)` closes nothing — it records that an observed remote socket closed. Every other `close()` in this package (`page.close()`, `context.close()`, `browser.close()`, `transport.close()`, `CDPClient.close()`) tears down a real resource and takes no argument. `fail(message)` likewise emits the event named `error`, so one concept carries two words.
   repair: When finding 10 moves these off the published interface, rename them on the class for what they record — `observeClose(timestamp)` and `observeError(message)`, or fold both into the network manager that calls them.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: rename `fail` to `error` so the method matches the event it emits (or rename the event to `fail`), and leave `close(timestamp)` as it is; if these move off the published interface under finding s04-10, keep single-word names on the class rather than adopting `observe*` compounds.

**Lane DRIFT-RESHAPE/medium:** amend: leave `close(timestamp)` as it is. Rename only `fail(message)` so the method and the event it raises use one term, on the class after finding 10 moves it off `BrowserWebSocketInterface`.

## s04-12 — DRIFT-RESHAPE

12. package=browser file=`src/server/helpers.ts:172-176,219-221,229-231,297-299` rule=`.claude/rules/architecture.md` § Wrapper test ("Delete one-line delegates") + `AGENTS.md` § Design laws ("Minimal public API … do not speculate") verdict=CONFIRMED
   wrong: `findEnvOverride`, `findInstallPath`, `probePathNames`, and `findInStore` are each a single `return findAllX(...)[0]`. None has a caller in `src/` or `tests/` — their only other occurrence in the repository is the guide table that documents them. They are four published wrappers with no consumer, and the `find*`/`findAll*` split is the `methodOne`/`methodAll` shape `.claude/rules/patterns.md` § Batch operations rejects.
   repair: Delete all four. Rename the surviving plurals to drop `All` (`findAllEnvOverrides` → `findEnvOverrides`, `findAllInstallPaths` → `findInstallPaths`, `probeAllPathNames` → `probePathNames`, `findAllInStore` → `findInStore`), update `findSystemBrowsers`, and strike the four rows and their fence lines from `guides/browser.md:355-424`. Keep `findSystemBrowser` (line 105) — it has a real caller at `Browser.ts:626` — but inline it there if that stays its only one.

### Verification

**Judge (DRIFT-RESHAPE/high):** The breach is real and both lanes established it: each of the delegates is a bare `return findAllX(...)[0]` and none is called anywhere in src/ or tests/. The subjective lane's decisive evidence is also real, and it defeats the repair as written. `findSystemBrowser` is byte-for-byte the same one-lin

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/medium:** amend: delete the four one-line delegates and rule on `findSystemBrowser` by the same test in the same change — keep it only if it is inlined at Browser.ts:626 or given a stated reason the other four lack. State in the brief that `probePathNames` and `findInStore` are reused names with changed return types, and strike the guide rows and fence lines for the deleted symbols.

## s04-13 — DRIFT

13. package=browser file=`src/server/helpers.ts:166,407` rule=`.claude/rules/typescript.md` § Errors and outcomes ("Error classes expose a machine-readable `code`"; "Every public error class ships with a guard") verdict=CONFIRMED
   wrong: Two public functions throw a bare `Error`: `removeBrowserProfile` on an unsafe profile path, and `waitForCDPReady` when the endpoint never answers. Neither is narrowable by `isBrowserError`, `isBrowserConnectionError`, or any guard the package publishes, so a caller catching around `connect()` cannot distinguish a readiness timeout from an unrelated fault.
   repair: Throw `BrowserError('Refusing to remove an unsafe browser profile path', undefined, { path })` and `BrowserConnectionError(…, { port, timeout })` respectively.

## s04-14 — DRIFT

14. package=browser file=`src/server/helpers.ts:363-378` rule=`.claude/rules/typescript.md` § Comments and API documentation ("Every public export has complete TSDoc: description, `@param`, `@returns`") verdict=CONFIRMED
   wrong: `waitForCDPReady` declares four parameters and its TSDoc documents three. `signal?: AbortSignal` is undocumented, and it is the one parameter whose behavior a caller cannot guess — an abort mid-wait rethrows rather than resolving (line 399).
   repair: Add `@param signal - Optional external abort; an abort while waiting rethrows rather than resolving.`

## s04-17 — DRIFT

17. package=browser file=`src/core/BrowserCodegen.ts:37` against `src/core/BrowserHandle.ts:15`, `src/core/BrowserWorker.ts:19`, `src/core/BrowserFrame.ts:44` rule=`AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
   wrong: One value carries two names. `BrowserCodegen` names its CDP session parameter `sessionId` while `BrowserHandle`, `BrowserWorker`, and `BrowserFrame` name the same value `session`. `CDPClientInterface.send`/`subscribe`/`unsubscribe` (`types.ts:80-87`) also use `sessionId`.
   repair: Use `session` everywhere, including the `CDPClientInterface` parameter names.

## s04-18 — DRIFT

18. package=browser file=`src/core/types.ts:223,57,1416` rule=`AGENTS.md` § Design laws ("Named discriminants … never `kind` or `type`") + `.claude/rules/names.md` § General vocabulary verdict=CONFIRMED
   wrong: Three public members name their axis `type`. `BrowserScreenshotOptions.type?: 'png' | 'jpeg'` varies image format; `CDPTarget.type: string` varies target category; `BrowserNode.type: number` varies DOM node category. The package names the same axis correctly elsewhere — `BrowserDialogCategory`, `BrowserWorkerCategory`, `BrowserCodegenAction.action` — so these three are the inconsistency, not the convention.
   repair: Rename to `format`, `category`, and `category` respectively, and update the decoders (`helpers.ts:213-217`, `server/helpers.ts:447-452`, `helpers.ts:3148`) and the guide.

## s04-19 — DRIFT

19. package=browser file=`src/core/types.ts:184-194` rule=`.claude/rules/patterns.md` § Options ("Group related settings beneath the configured entity noun") verdict=CONFIRMED
   wrong: `BrowserActionOptions` is one flat bag whose keys apply to disjoint operations, and it is the options type of `click`, `fill`, `select`, `check`, `uncheck`, `hover`, `focus`, `press`, `type`, `clear`, `wait`, `drag`, and `upload`. `steps` applies only to `drag`; `button`, `count`, and `position` only to `click`; `delay` only to `press`/`type`. `locator.fill(value, { steps: 3, button: 'right' })` typechecks and silently does nothing.
   repair: Keep the genuinely shared keys (`timeout`, `strict`, `force`, `trial`) on `BrowserActionOptions` and declare `BrowserClickOptions extends BrowserActionOptions { button?, count?, position? }`, `BrowserDragOptions extends BrowserActionOptions { steps?, position? }`, and `BrowserTypeOptions extends BrowserActionOptions { delay? }`. Type each method with the one it accepts.

## s04-20 — DRIFT-RESHAPE

20. package=browser file=`src/core/types.ts:1186-1192` rule=`.claude/rules/names.md` § Entity-scoped names + § General vocabulary ("A consumer should be able to predict them without documentation") verdict=CONFIRMED
   wrong: `BrowserMedia` publishes `color` (prefers-color-scheme) beside `colors` (forced-colors) — two distinct CSS features whose public names differ by one letter, so a typo silently selects the wrong feature. `BrowserMedia.media` also repeats its own entity name, which is exactly the context the entity already supplies.
   repair: Rename `colors` to `forced` and `media` to `output` (the axis it varies: `'screen' | 'print'`). Update `mediaToFeatures` at `helpers.ts:1736-1751`. The literal values stay as they are — they are CSS-spec external values, which `.claude/rules/names.md` § General vocabulary permits as unions.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: rename `color` to `scheme` (its feature is `prefers-color-scheme`), which removes the one-letter collision without inventing an adjective property; keep a noun for the forced-colors key rather than `forced`; rename `media` to `output` as proposed; update `mediaToFeatures` at helpers.ts:1736-1751 and the guide.

**Lane DRIFT-RESHAPE/medium:** amend: rename `color` to `scheme` (the axis `prefers-color-scheme` varies) and leave `colors` as the forced-colors key; rename `media` to `output` as proposed. Update `mediaToFeatures` at helpers.ts:1736-1751 and the guide.

## s04-21 — DRIFT

21. package=browser file=`src/core/index.ts:5-36`, `src/server/index.ts:5-6` rule=`.claude/rules/architecture.md` § Barrel exports ("A row obliges a documented, runnable example"; "Intern it … when its constructor requires a value only its owner produces") verdict=CONFIRMED
   wrong: Thirty-three classes are barrelled and not one carries an `@example`; the whole of `src/` holds six `@example` blocks, all on functions in `helpers.ts` and `factories.ts`. Several of those rows are also unconstructible by a consumer: `BrowserRoute(frame, id, request)` needs a CDP Fetch `requestId`, `BrowserHandle(client, session, id)` a remote-object id, `BrowserFileChooser(frame, backend, multiple)` a backend node id, and `BrowserWorker(client, session, id, url, category)` an attached session — each a value only its owner produces.
   repair: Intern `BrowserRoute`, `BrowserHandle`, `BrowserFileChooser`, `BrowserWorker`, `BrowserDialog`, and `BrowserDownload` — remove their barrel rows, name them in the parity `INTERNAL` list, and keep the interfaces public since they appear in `BrowserPageEventMap`. Give every class that stays barrelled a runnable `@example` on its class TSDoc.

## s04-22 — DRIFT

22. package=browser file=`src/core/helpers.ts:1937` rule=`.claude/rules/names.md` § Value-level identifiers (Guard → `is{Condition}`) + § General vocabulary ("One term per concept") verdict=CONFIRMED
   wrong: `guardEvaluateExpression` returns a string. `guard` is this project's word for a `Guard<T>` predicate, and every sibling in its family is `compile*Expression`.
   repair: Rename to `compileGuardedEvaluateExpression` and move it with the rest of the compiler family in finding 3.

## s04-23 — DRIFT

23. package=browser file=`src/core/helpers.ts:2245-2249,2380-2384,2419-2423,2458-2462,2727-2731,2774-2778,2819-2821,2843-2845` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") + § Kind purity ("a reusable … fragment has one implementation") verdict=CONFIRMED
   wrong: The in-page visibility predicate — `display !== 'none' && visibility !== 'hidden' && visibility !== 'collapse' && rect.width > 0 && rect.height > 0` — is written out verbatim eight times across the compiled expressions, in two spellings (an arrow named `visible` and an inline conditional at 2819 and 2843). A change to what "visible" means has eight edit sites and no test can see a missed one.
   repair: Add one `BROWSER_VISIBILITY_SOURCE` to `constants.ts` holding the predicate source and interpolate it at each site.

## s04-24 — DRIFT-RESHAPE

24. package=browser file=`src/core/helpers.ts:2329-2332,2363-2366,2402-2405,2441-2444` rule=`AGENTS.md` § Design laws ("No polling architecture. Park idle work on events") + `.claude/rules/architecture.md` § Kind purity (constants) verdict=CONFIRMED
   wrong: The four locator waits poll the DOM with `setInterval(…, 50)`. The four selector waits for the same four states (lines 2635, 2677, 2719, 2766) already use `MutationObserver`, so the event mechanism exists and is proven in this file — the locator family simply did not adopt it. The `50` is also a bare literal duplicated four times while `BROWSER_WAIT_POLL_INTERVAL_MS` (`constants.ts:131`) exists and holds `100`, so the two wait families disagree about the interval and neither reads the constant.
   repair: Rewrite `compileAttachedLocatorWaitExpression`, `compileDetachedLocatorWaitExpression`, `compileVisibleLocatorWaitExpression`, and `compileHiddenLocatorWaitExpression` on the `MutationObserver` + `setTimeout(deadline)` shape their selector-based twins use. If a poll must remain for a state a mutation record cannot report, interpolate `BROWSER_WAIT_POLL_INTERVAL_MS` rather than a literal.

### Verification

**Judge (DRIFT-RESHAPE/high):** The polling and the bare literal are real, and I confirmed the constant is genuinely live elsewhere — core/helpers.ts:737, server/helpers.ts:403, Browser.ts:1090, BrowserNavigationManager.ts:57 all read it — so the locator waits are the outliers that hardcode 50. The subjective lane's technical obje

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/high:** amend: interpolate `BROWSER_WAIT_POLL_INTERVAL_MS` at the four locator sites, which is the finding's own fallback. Do not port the document-scoped `MutationObserver` shape; any event-driven replacement must attach an observer per shadow root encountered by the locator traversal, including roots created later, and that is a separate unit with its own proof.

## s04-26 — DRIFT

26. package=browser file=`src/core/types.ts:76-89` against `src/server/Browser.ts:88,491-504` rule=`.claude/rules/patterns.md` § Stateful emitters ("An entity with lifecycle transitions … owns an emitter by composition") verdict=CONFIRMED
   wrong: `CDPClientInterface` has `connect`, `reconnect`, `close`, and `connected` but publishes no emitter, so a client-level disconnect is unobservable. `Browser` works around this by retaining `#transport` purely to subscribe to the transport's `close` and `error` — reaching past the client that owns that transport, which is the boundary leak the missing emitter forces. Every peer entity in the package (`BrowserPage`, `BrowserContext`, `BrowserCodegen`, `BrowserDownload`, `BrowserWebSocket`, `BrowserNetworkManager`, `CDPTransportInterface`, `Browser`) has one.
   repair: Add `CDPClientEventMap { connect: [], disconnect: [], error: [error: unknown] }` to `types.ts`, `readonly emitter: EmitterInterface<CDPClientEventMap>` to `CDPClientInterface`, and `on`/`error` to `CDPClientOptions`, per `.claude/rules/patterns.md` § Stateful emitters. Then delete `Browser`'s `#transport`, `#bindTransport`, and `#unbindTransport` and bind to `client.emitter`. Keep `subscribe`/`unsubscribe` for protocol events, which are string-keyed and genuinely outside a typed `EventMap`.

## s04-27 — DRIFT

27. package=browser file=`src/core/factories.ts:18,36`, `src/core/helpers.ts:3205`, `src/server/factories.ts:16`, `src/server/helpers.ts` (one site), `src/server/types.ts:9`, `src/server/errors.ts:1`, `src/server/Browser.ts`, `src/server/transports/WebSocketCDPTransport.ts` — 13 occurrences rule=`.claude/rules/documentation.md` § Guide examples ("Never use in-repository `@src/*` aliases in public guide examples") verdict=CONFIRMED
   wrong: Published TSDoc `@example` fences import from `@src/core` and `@src/server`. These fences ship inside the generated `.d.ts` and are what a consumer reads in their editor, so the example they are shown does not resolve for them. `compileCodegenScript` at `helpers.ts:2111` already emits the correct specifier (`@orkestrel/browser`), which shows the package knows the difference.
   repair: In every `@example` fence, use `@orkestrel/browser` and `@orkestrel/browser/server`. Value imports in `src/server/*` that reach core through the `@src/core` alias are source imports, not examples, and stay as they are.

## s04-28 — DRIFT

28. package=browser file=`src/core/errors.ts:9` rule=`.claude/rules/documentation.md` § Authority ("Do not create competing instruction copies in guides") + `.claude/rules/writing.md` § Code tokens, references, and links verdict=CONFIRMED
   wrong: Published TSDoc reads "Carries a machine-readable `code` and optional `context` (AGENTS §12)". The target's own `AGENTS.md` has no numbered sections, so the citation resolves to nothing, and it points a consumer of the package at an internal rulebook they do not have. (`guides/README.md:3,67` carries the same dead "§22" citation, outside this unit's scope.)
   repair: Delete the parenthetical. The sentence states the contract without it.

## s04-29 — DRIFT-RESHAPE

29. package=browser file=`src/server/helpers.ts:418-461` rule=`.claude/rules/typescript.md` § Errors and outcomes ("I/O/network/external operation → Return `Result<T, E>` or throw consistently") verdict=CONFIRMED
   wrong: `fetchCDPTargets` returns `[]` for a non-`ok` response, a non-array body, and every thrown fault alike, so "the browser has no targets" and "the browser is unreachable" are one value. The caller cannot tell them apart, and `@orkestrel/contract` — a declared runtime dependency already imported in this file — publishes the `Result` and `attempt` primitives for exactly this.
   repair: Return `Promise<Result<readonly CDPTarget[], BrowserError>>` using the installed `@orkestrel/contract` `Result`, and narrow at the `#syncContexts` call site in `Browser.ts`.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: change the return to `Promise<Result<readonly CDPTarget[], BrowserError>>` using the installed `@orkestrel/contract` `Result`, and update `tests/src/server/helpers.test.ts:367-406` plus the guide row; there is no `#syncContexts` call site to narrow — that method reads `client.send('Target.getTargets')` at `src/server/Browser.ts:793` — so the brief must also rule on whether a public helper with no source caller is kept at all.

**Lane DRIFT-RESHAPE/high:** amend: return `Promise<Result<readonly CDPTarget[], BrowserError>>` using the declared `@orkestrel/contract` primitives, and scope the unit to the five cases at tests/src/server/helpers.test.ts:367-409 — the unreachable case becomes a failure assertion — rather than to a Browser.ts call site. Correct the stale comment at tests/setupServer.ts:225 in the same change.

## s04-30 — DRIFT

30. package=browser file=`src/core/errors.ts`, `src/core/helpers.ts`, `src/core/factories.ts`, `src/server/errors.ts`, `src/server/helpers.ts`, `src/server/factories.ts` rule=`.claude/rules/typescript.md` § Comments and API documentation ("The first sentence states what the symbol does in the third person with an `-s` verb") verdict=CONFIRMED
   wrong: TSDoc first sentences open in the imperative — "Decode …", "Compile …", "Create …", "Validate …", "Narrow …". 122 such openers across these six files; the count and the fleet-wide reading were established by the dedicated convention lane (browser: 139 imperative to 1 third-person), not re-derived here.
   repair: Fleet-wide decision, not this package's alone. Either rewrite these six files to `-s` form ("Decodes …", "Compiles …") or change the rule; do not split the fleet.

## s04-31 — DRIFT

31. package=browser file=`src/core/types.ts:1026-1031` rule=`.claude/rules/documentation.md` § Parity ("A parity failure identifies drift") verdict=CONFIRMED
   wrong: The TSDoc reads "Mutable recording state held until a request finishes" while all three members are declared `readonly`. The prose contradicts the type it sits on, and a reader trusting it will look for mutation that cannot happen.
   repair: Change to "Recording state held until a request finishes; a new value replaces it on each update."

## s04-35 — DRIFT

35. package=browser file=`src/server/types.ts:239` (implemented at `src/server/Browser.ts:130-132`) rule=`.claude/rules/architecture.md` § Wrapper test ("Delete … rename-only helpers/getters") verdict=CONFIRMED
   wrong: `BrowserInterface` publishes both `status: BrowserStatus` and `connected: boolean`, and `connected` is exactly `status === 'connected'`. Two public names for one fact, one of them a rename-only getter. (`CDPClientInterface.connected` is not this — there `connected` is the sole representation and correct.)
   repair: Drop `connected` from `BrowserInterface` and `Browser`, and update the guide and the tests that read it. Keep `status`, which carries strictly more.

## s04b-01 — DRIFT-RESHAPE

1. package=browser file=src/server/transports/WebSocketCDPTransport.ts:85 rule=`.claude/rules/typescript.md` § Errors and outcomes verdict=CONFIRMED
   wrong: `send()` throws a bare `Error`, so a caller cannot narrow it with `isBrowserError`/`isBrowserConnectionError` and gets no `code` or `context`, while every other throw in this file and in `CDPClient` uses a coded `BrowserError` subclass.
   repair: `throw new BrowserConnectionError('WebSocket CDP transport is not open', { url: this.#url })` — the class is already imported at line 20.

### Verification

**Judge (DRIFT-RESHAPE/high):** Both lanes verified the throw and the missing guard. The subjective lane's decisive extra evidence is real: guides/browser.md:920 states the plain Error as documented behavior, and the objective lane missed it because its grep excluded the guides directory. Applying the repair as written leaves that

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/high:** amend: throw `new BrowserConnectionError('WebSocket CDP transport is not open', { url: this.#url })` as proposed, and in the same change rewrite guides/browser.md:920 to state the coded throw, so the guide row does not carry a false prose claim.

## s04b-02 — DRIFT

2. package=browser file=src/core/CDPClient.ts:351-358 rule=`.claude/rules/patterns.md` § Stateful emitters → Listener isolation verdict=CONFIRMED
   wrong: `#dispatch` swallows every subscriber throw into an empty `catch` with no reporting path, and `CDPClientOptions` (`src/core/types.ts:46-49`) offers no `error` handler — so a consumer's broken CDP event handler fails silently and unobservably. The package's own sibling entity does this correctly: `WebSocketCDPTransportOptions` carries `on` and `error` and threads them into its `Emitter`.
   repair: add `readonly error?: EmitterErrorHandler` to `CDPClientOptions`, store it in a `#error` field, pass the event name into `#dispatch(handlers, method, params)`, and call `this.#error?.(thrown, method)` in the catch. Keep the isolation (never rethrow).

## s04b-03 — DRIFT

3. package=browser file=src/core/CDPClient.ts:24-25 rule=`AGENTS.md` § Design laws ("No compatibility shims. This is greenfield.") verdict=CONFIRMED
   wrong: the class `@remarks` justifies global subscriptions with "continue to see ALL events for backwards compatibility", and the inline comment at line 331 repeats it ("Fire global handlers (backwards compatible — see ALL events)"). This is greenfield: there is no earlier release to be compatible with, so the sentence documents a rationale that does not exist and hides the real design rule from the reader. The capitalized `ALL` is also outside the plain-prose form `AGENTS.md` § Writing fixes.
   repair: state the rule instead — "A subscription registered without a session id receives the event whatever session carries it; a session-scoped subscription receives only its own session's events." Delete the line-331 comment; the code beneath it says the same thing.

### Verification

**Judge (DRIFT/high):** Both lanes proved the same thing from git: the backwards-compatibility rationale shipped in the commit that created the class, so it never described a real obligation, and the repair's replacement sentence is accurate against `#onMessage`. The objective lane's only correction - that capitalized `ALL

**Lane DRIFT-RESHAPE/high:** amend: keep the rationale rewrite and the line-331 deletion; drop the `ALL` capitalization objection, which the fleet's own TSDoc and guide prose establish as a house emphasis form

**Lane DRIFT/high:** stands

## s04b-04 — DRIFT-RESHAPE

4. package=browser file=src/core/BrowserCookieManager.ts:24 rule=`.claude/rules/patterns.md` § Managers → Accessors verdict=CONFIRMED
   wrong: the manager returns all cookies through `list(urls?)`. The rule fixes the plural domain noun for the all-items accessor, and the rest of the package obeys it — `contexts()`, `pages()` — while `BrowserLocatorInterface.all()` (`src/core/types.ts:534`) is a third spelling of the same idea. Three words for one concept.
   repair: rename to `cookies(urls?: readonly string[])` in `BrowserCookieManagerInterface` (`src/core/types.ts:1129`), in this class, at the call site in `BrowserContext`, in `guides/browser.md`, and in the tests. Settle `all()` versus the plural noun in the same pass so the package has one word.

### Verification

**Judge (DRIFT-RESHAPE/high):** The subjective lane's EXCEPTION fails on its own decisive premise. It argues the plural noun is "already spent" on the context property so `context.cookies.cookies()` would be a wart - but `context.messages.messages()` is live fleet usage on a manager reached exactly the same way, so the stutter is

**Lane DRIFT-RESHAPE/high:** amend: rename `list` to `cookies(urls?: readonly string[])` in `BrowserCookieManagerInterface` (types.ts:1129), the class, the `BrowserContext` call site, and tests/src/core/BrowserCookieManager.test.ts:38,99,100; drop the guide clause (the guide never names `list`) and drop the `all()` sub-item - `BrowserLocatorInterface` is not a manager and `all()` matches the SQLite precedent at /home/user/fleet/sqlite/src/server/types.ts:88, so route it separately if it is to be settled at all

**Lane EXCEPTION/medium:** drop

## s04b-05 — DRIFT-RESHAPE

5. package=browser file=src/core/CDPClient.ts:87-92 rule=`.claude/rules/names.md` § Split instead of compounding → Group options by entity; `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
   wrong: `send(method, params?, sessionId?, timeout?)` encodes two independent settings as positional tail arguments, so reaching one means writing `undefined` for the other — `BrowserContext.ts:361`, `BrowserContext.ts:366`, `BrowserPage.ts:659`, `BrowserCodegen.ts:124` all do. Worse, `BrowserFrameInterface.send` (`src/core/types.ts:1381-1385`) spells the same verb `send(method, params?, timeout?)`, so the third argument means "session" on the client and "timeout" on a frame. One verb, two positional contracts, and `x.send(m, undefined, v)` reads identically in both.
   repair: declare `CDPSendOptions { readonly session?: string; readonly timeout?: number }` in `src/core/types.ts` and give both signatures the same trailing `options?: CDPSendOptions`. The frame's interface documents that it fixes `session` itself. Update every call site in the same change (no overload kept for the old shape).

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: declare `CDPSendOptions { readonly session?: string; readonly timeout?: number }` for `CDPClientInterface.send` only, and give `BrowserFrameInterface.send` a narrower options type carrying `timeout` alone rather than a `session` key it silently ignores; update guides/browser.md:222, :225 and the `send` row at :946 plus a Surface row for the new type; drop the 'reads identically' justification, which the disjoint parameter types refute

**Lane DRIFT-RESHAPE/high:** amend: declare `CDPSendOptions { readonly session?: string; readonly timeout?: number }` in src/core/types.ts and give `CDPClientInterface.send` the trailing `options?: CDPSendOptions`; for `BrowserFrameInterface.send` either honour `session` as an explicit override of the frame's current session, or declare a narrower timeout-only trailing type. Never accept `session` on the frame and ignore it. Update every call site in the same change, keeping no overload for the old shape.

## s04b-06 — DRIFT

6. package=browser file=src/core/CDPClient.ts:210 rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary; `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
   wrong: the private transition methods cross their public verbs, and each audited class picks a different word for the identical role. `CDPClient.connect()` runs `#start()` (line 210) and `close()` runs `#stop()` (line 236); `WebSocketCDPTransport.start()` runs `#open()` (line 108) and `close()` runs `#stop()` (line 155); `BrowserNetworkManager.start()` runs `#begin()` (line 274). A reader meeting `#stop` cannot tell whether the entity's public verb is `close` or `stop`, and `#start` at `CDPClient.ts:210` means `connect`, not `start`.
   repair: name each private transition for the public verb it implements — `#connect`/`#close` in `CDPClient`, `#start`/`#close` in `WebSocketCDPTransport`, `#start` in `BrowserNetworkManager`. Fix one word per entity, not a new synonym.

## s04b-07 — DRIFT-RESHAPE

7. package=browser file=src/core/CDPClient.ts:58-71 rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
   wrong: the single-flight transition guard — take the active promise if one is in flight, otherwise start one, store it, and clear it in `finally` only when it is still ours — is written out five times: `CDPClient.ts:58-71` and `192-206`, `WebSocketCDPTransport.ts:60-80` and `90-104`, `BrowserNetworkManager.ts:70-85`. The bodies differ only in their entry guards, and each copy can drift on the `finally` identity check that makes the idiom correct.
   repair: add one exported core primitive holding the promise field, with a single method — `run(work: () => Promise<void>): Promise<void>` that returns the in-flight promise when one exists — place it in `src/core` as its own class file, barrel it, and give each site a `#starting`/`#closing` instance instead of a raw promise field. Keep every entry guard where it is; only the shared body moves.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: build the `run(work)` primitive as proposed, then route every single-promise-field site through it - CDPClient.ts:58-71,192-206; WebSocketCDPTransport.ts:60-80,90-104; BrowserNetworkManager.ts:70-85; Browser.ts:160,192; BrowserPage.ts:385; BrowserCodegen.ts:74,89; BrowserContext.ts:128 - leaving the `Map`-keyed BrowserPage.ts:905 site alone and leaving each site's entry guards and pre-transition statements in place; add the guide surface row the new barrelled export owes

**Lane DRIFT-RESHAPE/high:** amend: add the primitive as proposed — one exported core class holding the promise field, placed in src/core as its own class file and barrelled, with each site owning a `#starting`/`#closing` instance and keeping its entry guard — but name the method `execute(work: () => Promise<void>): Promise<void>`, not `run`. Add a targeted test for the in-flight identity behaviour, per architecture.md "Export and test reusable logic".

## s04b-08 — DRIFT-RESHAPE

8. package=browser file=src/core/BrowserCoverage.ts:80-101 rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
   wrong: the first-error-wins accumulator — `let failed = false; let failure: unknown`, a `try`/`catch` per awaited teardown step, then `if (failed) throw failure` — is written out four times inside my slice (`BrowserCoverage.ts:80-101`, `112-136`, `142-166`; `BrowserNetworkManager.ts:165-205`) and appears in `src/` elsewhere (`BrowserContext.ts`, `BrowserClock.ts`). Each copy repeats the same `if (!failed)` ordering rule by hand, and the pair of variables restates one fact — "the first failure, if any" — as a flag beside a value.
   repair: extract one exported async helper in `src/core/helpers.ts` that runs a list of teardown steps and rethrows the first failure after running all of them, and route every site through it. `attempt` from `@orkestrel/contract` cannot serve: its installed declaration is `attempt<T>(callback: () => T): Result<T>`, synchronous only.

### Verification

**Judge (DRIFT-RESHAPE/high):** The rule and the repetition are not in dispute and I re-read both, including the `attempt` declaration. The objective lane's mechanical refutation is real and I confirmed it at both sites: a helper that rethrows the first failure itself would skip BrowserNetworkManager.ts:201-204 and BrowserCoverage

**Lane DRIFT-RESHAPE/high:** amend: extract the helper so it returns the first failure rather than throwing it - the caller keeps its trailing cleanup and its own `if (failure !== undefined) throw failure` - and route BrowserCoverage.ts:80-101,112-136,142-166, BrowserNetworkManager.ts:165-205, BrowserClock.ts:78 and BrowserContext.ts:290,312 through it; export it from src/core/helpers.ts with its own unit test and a guide extended-helper row

**Lane DRIFT/high:** stands

## s04b-09 — DRIFT

9. package=browser file=src/core/CDPClient.ts:131-178 rule=`.claude/rules/architecture.md` § System constraints; `AGENTS.md` § Design laws (Simplification) verdict=CONFIRMED
   wrong: `subscribe` and `unsubscribe` each carry two mirrored branch bodies over two parallel structures — `#subscriptions: Map<string, Set<CDPHandler>>` and `#sessionSubscriptions: Map<string, Map<string, Set<CDPHandler>>>` (lines 39-40) — so the same get-or-create and prune-when-empty logic is written four times for one concept, and `#onMessage` (lines 332-347) reads both.
   repair: hold one `#subscriptions: Map<string | undefined, Map<string, Set<CDPHandler>>>` keyed by session id, with the global scope under the `undefined` key. A `Map` key of `undefined` is the absence of a session, not an invented sentinel, so `AGENTS.md` § Design laws ("Absence is `undefined`") is satisfied. `subscribe`, `unsubscribe`, and the dispatch in `#onMessage` each collapse to one body.

## s04b-10 — DRIFT

10. package=browser file=src/core/BrowserSelectorManager.ts:57 rule=`.claude/rules/names.md` § General vocabulary ("Describe what a thing is"); `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
    wrong: the method is `test(value)`, but the axis it locates is the test id — `src/core/constants.ts:140` names it `BROWSER_TEST_ID_ATTRIBUTE = 'data-testid'` and documents "the semantic test-id selector". So the concept is spelled `test id` in the constant and `test` in the public API. `test` also reads as a verb among five noun siblings (`css`, `role`, `text`, `label`, `placeholder`), and sits one character from `text(value)`, which locates something else entirely.
    repair: rename the axis to `testid` in `BrowserSelector` (`src/core/types.ts:478`), in `BrowserSelectorManagerInterface` (`src/core/types.ts:567`), in this method, in the compiled in-page switch (`src/core/helpers.ts:2274`), in `guides/browser.md`, and in the tests. `.claude/rules/architecture.md` § Kind purity states the rename repair is the correct cost to pay when the name is what is wrong.

### Verification

**Judge (DRIFT/medium):** The objective lane's decisive claim - that the package writes every `id` compound as camelCase, so the rename must be `testId` - is false on the public surface. I checked every occurrence: `sessionId` appears in core/types.ts only as a parameter, `requestId` and `targetId` only as CDP wire keys and

**Lane DRIFT-RESHAPE/medium:** amend: rename the axis to `testId` rather than `testid` - method and `BrowserSelectorManagerInterface` member (types.ts:567), the `BrowserSelector` literal (types.ts:478) and the `case` in the compiled switch (helpers.ts:2274) - matching the package's own `sessionId`/`requestId` form; drop the guide and test clauses, since neither names the axis today, and add the guide surface row the renamed member owes

**Lane DRIFT/high:** stands

## s04b-11 — DRIFT-RESHAPE

11. package=browser file=src/core/BrowserEmulationManager.ts:15 rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS define reusable and public types in `*/types.ts`"); `.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
    wrong: the constructor of a barrelled class (`src/core/index.ts:14`) declares its first parameter as the anonymous type `() => readonly BrowserPageInterface[]`, repeated on the field at line 12. Every sibling manager takes named interface types (`BrowserFrameInterface`, `CDPClientInterface`, `ScreenshotWriterInterface`), so a consumer reading the published surface meets one unnamed shape with no documentation and no place to state what the callback must return.
    repair: declare `export type BrowserPagesFunction = () => readonly BrowserPageInterface[]` in `src/core/types.ts` beside `BrowserEmulationManagerInterface`, with TSDoc stating that it returns the context's live pages at call time, and use it on the field and the parameter.

### Verification

**Judge (DRIFT-RESHAPE/high):** INVALID requires the finding to misread the code or the rule; it does neither. Its cited lines are exact and the rule text reaches an anonymous function type used at four positions on two barrelled constructors. What the objective lane falsified is one supporting sentence, and the fact it produced -

**Lane INVALID/high:** drop

**Lane DRIFT-RESHAPE/high:** amend: declare `export type BrowserPagesFunction = () => readonly BrowserPageInterface[]` in src/core/types.ts beside `BrowserEmulationManagerInterface`, with TSDoc stating it returns the context's live pages at call time, and apply it to BOTH classes — BrowserEmulationManager.ts:12 and :15, and BrowserStorageManager.ts:24 and :28.

## s04b-12 — DRIFT-RESHAPE

12. package=browser file=src/core/BrowserPerformance.ts:35 rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary; `AGENTS.md` § Design laws ("Single-word entity APIs … extract a sub-entity or manager, or split behaviors") verdict=CONFIRMED
    wrong: `start(interval?)`, `stop()`, and `active` name the CPU-profiler lifecycle, but the entity they sit on also serves `metrics()` (line 26), which touches none of that state. `start` means "begin the entity" in the fixed vocabulary, so `performance.start()` reads as starting performance monitoring while it starts a sampling profile — and the class knows it, because its own errors say "Browser CPU profiling is already active" (line 36) and "is not active" (line 60). The qualifier lives in the message rather than in the API. `guides/browser.md:483` describes the same mixed shape, so it is drift the guide records rather than an exception the guide grants.
    repair: extract the profiler as a sub-entity — `BrowserProfilerInterface { readonly active: boolean; start(interval?): Promise<void>; stop(): Promise<BrowserProfile> }` in its own class file — and expose it as `readonly profile: BrowserProfilerInterface` on `BrowserPerformanceInterface`, leaving `metrics()` and `destroy()` on the performance entity. Callers then write `performance.profile.start()`. Update `BrowserDiagnostics`, the barrel, `guides/browser.md`, and the tests in the same change.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The objective lane is right that the fixed lifecycle verbs are used correctly and that names.md § Extract sub-entities does not fire, since there is no prefixed method family. But its INVALID rests on the claim that no name is insufficient, and the class refutes that itself: `start` cannot say what

**Lane INVALID/high:** drop

**Lane DRIFT-RESHAPE/medium:** amend: split the profiler out as a PEER of the existing diagnostics entities rather than nesting it — declare `BrowserProfilerInterface { readonly active: boolean; start(interval?): Promise<void>; stop(): Promise<BrowserProfile>; destroy(): Promise<void> }` in its own class file, add `readonly profiler: BrowserProfilerInterface` to `BrowserDiagnosticsInterface`, and leave `BrowserPerformanceInterface` with `metrics()` and `destroy()`. Callers then write `diagnostics.profiler.start()`, matching `diagnostics.tracing.start()` and `diagnostics.coverage.start()`. Update BrowserDiagnostics, the barrel, guides/browser.md:483, and the tests in the same change.

## s04b-13 — DRIFT

13. package=browser file=src/core/CDPClient.ts:74 rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: two TSDoc first sentences are imperative rather than third-person — "Close the transport and re-establish a fresh connection." (line 74) and "Close the transport and reject all pending requests." (line 181). This is the only compact TSDoc-voice finding I raise: the noun-phrase class descriptions across these files match the package-wide convention the convention lane settled, so I leave those alone.
    repair: "Closes the transport and re-establishes a fresh connection." and "Closes the transport and rejects all pending requests."

## s04b-14 — DRIFT

14. package=browser file=src/core/BrowserNetworkManager.ts:41 rule=`.claude/rules/names.md` § General vocabulary ("Booleans read as assertions") verdict=CONFIRMED
    wrong: `#fetch = false` is a boolean named as a bare noun that is also a CDP domain name, so `if (this.#fetch)` at lines 173 and 293 reads as a test of an object, not of a state. Its sibling flags `#started` and `#destroyed` are past participles.
    repair: rename to `#intercepting` — the fact it records is that `Fetch.enable` is in force for route or credential interception.

## s04b-15 — DRIFT-RESHAPE

15. package=browser file=src/server/transports/WebSocketCDPTransport.ts:45 rule=`AGENTS.md` § Design laws ("One concept, one term"); `.claude/rules/patterns.md` § Options ("Reserve `on` exclusively for initial `EmitterHooks`") verdict=CONFIRMED
    wrong: the stable bound-listener field is `#onSocketClose` here, while the same construct is `#requestHandler`, `#socketCloseHandler`, and their siblings in `BrowserNetworkManager.ts:44-54` and `#bindingHandler` in `BrowserScriptManager.ts:25`. Two forms for one concept, and the `on` prefix is reserved for the initial-hooks option.
    repair: rename to `#socketCloseHandler` and update lines 175 and 183.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: rename every `#on{Noun}` bound-listener field to the majority `#{noun}Handler` form in one pass - WebSocketCDPTransport.ts:45 (with its uses at :175 and :183), Browser.ts:89-91, and BrowserCodegen.ts:34-35 - and drop the § Options `on` citation, which governs option keys rather than private fields

**Lane DRIFT-RESHAPE/high:** amend: rename every `#on*` bound-listener field to the majority `#<subject>Handler` form, not only line 45 — WebSocketCDPTransport.ts:45 (`#socketCloseHandler`, updating lines 175 and 183), Browser.ts:89-91 (`#transportCloseHandler`, `#transportErrorHandler`, `#processExitHandler`, updating lines 494, 501, 512, 514, 519), and BrowserCodegen.ts:34-35 (`#bindingCalledHandler`, `#frameNavigatedHandler`, updating lines 120-121 and 192-193).

