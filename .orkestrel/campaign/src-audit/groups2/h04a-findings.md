# Findings for group h04a (verification round 2)

Packages: browser. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it. Note: scaffold lives at /home/user/scaffold, every other package at /home/user/fleet/<name>.

## s04-01

1. package=browser file=`src/core/helpers.ts:195,236,264,308,332,626,651,669,752,1251,1627,1789,1834,1857,1881,2065,2897,2911,2979` rule=`.claude/rules/architecture.md` § Kind purity + `AGENTS.md` § Fixed derivation/construction forms verdict=CONFIRMED
   wrong: Nineteen exported functions returning `T | undefined` from an `unknown` input are coercers, which the kind table places in `*/parsers.ts` under the `parse*` name form, but they sit in `helpers.ts` named `read*`; the package has no `parsers.ts` at all, while a genuine coercer named correctly (`parseCodegenActionPayload`, line 2030) sits in `helpers.ts` beside them.
   repair: Create `src/core/parsers.ts`, move every `read*` function whose return type is `T | undefined` into it, rename each to `parse*` (`readBrowserRequest` → `parseBrowserRequest`, and so on), move `parseCodegenActionPayload` there unchanged, and update the importers. The barrel star-exports both files, so the surface changes only by the renames.

## s04-02

2. package=browser file=`src/core/helpers.ts:2923,2947,2958,2999,3023` and `src/core/helpers.ts:195,1554,1568` rule=`AGENTS.md` § Design laws ("One concept, one term") + `.claude/rules/names.md` § Standalone helpers ("A helper prefix has one project-wide meaning") verdict=CONFIRMED
   wrong: Three prefixes name one operation — turning an unknown CDP payload into a typed value. `decodeRareStringData`, `decodeBrowserAttributes`, and `decodeBrowserSnapshot` do exactly what `readBrowserCookies` and `readBrowserRequest` do, and every one of their TSDoc first sentences literally begins "Decode". A reader cannot predict which prefix a given decoder carries.
   repair: After finding 1 moves the `| undefined` coercers to `parse*`, rename the remaining throw-on-malformed decoders to one prefix — `read*` — and rename `decodeRareStringData`, `decodeRareBooleanData`, `decodeRareIntegerData`, `decodeBrowserAttributes`, and `decodeBrowserSnapshot` to match. Leave `decodeBase64`/`encodeBase64` alone; base64 decoding is a different concept.

## s04-03

3. package=browser file=`src/core/helpers.ts:722,785,823,838,1109,1152,1642,1661,1677,2090,2163,2298,2305,2339,2373,2412,2454,2635,2677,2719,2766,2812,2836,2867` rule=`.claude/rules/architecture.md` § Centralized-file pattern (Shape/algorithm compilers → `*/compilers.ts`) and § Kind purity verdict=CONFIRMED
   wrong: Twenty-four exported `compile*` functions that emit in-page JavaScript source sit in `helpers.ts`. They are the package's compiler kind — a distinct concern from the decode/validate leaves they share the file with — and are the single largest reason `helpers.ts` is 3253 lines.
   repair: Create `src/core/compilers.ts` and move every `compile*` function plus `guardEvaluateExpression` (see finding 22) into it. No consumer changes; the barrel star-exports both.

## s04-04

4. package=browser file=`src/core/constants.ts:164-167` (consumed at `src/core/BrowserHARManager.ts:107`) rule=`AGENTS.md` § Design laws ("Derive state … do not store a second flag or label that can drift") verdict=CONFIRMED
   wrong: `BROWSER_HAR_CREATOR` hardcodes `version: '0.0.11'` while `package.json` declares `0.0.14`. Every HAR archive this package writes therefore stamps a creator version that is three releases stale, and the drift is invisible because nothing compares the two.
   repair: Delete the hardcoded `version` field. Read the package version from the one place that owns it — take it as a `BrowserHAROptions` field the server supplies, or drop the version to a fixed non-version string such as `'unversioned'`. Do not keep a second copy of the version anywhere in `src/`.

## s04-05

5. package=browser file=`src/server/types.ts:34-39` (produced at `src/server/Browser.ts:545-550,557-559`) rule=`AGENTS.md` § Design laws ("Derive state", "Absence is `undefined`") verdict=CONFIRMED
   wrong: `BrowserDiscoveryResult` carries three fields encoding one bit. `found` is computed as `endpoint !== undefined` and `connection` as `endpoint !== undefined ? 'cdp' : undefined`, so `{ found: true, endpoint: undefined }` is a representable state the type permits and nothing prevents.
   repair: Reduce the interface to `{ readonly endpoint: string | undefined; readonly browser: string | undefined }`. `endpoint !== undefined` is the discovery answer. Delete `#notFound()` at `Browser.ts:557`, which collapses to a literal once the derived fields are gone, and update `guides/browser.md`.

## s04-06

6. package=browser file=`src/core/types.ts:101-103` rule=`.claude/rules/names.md` § General vocabulary ("Describe what a thing is") verdict=CONFIRMED
   wrong: `ScreenshotWriterInterface` is the package's only byte sink and persists far more than screenshots — HAR archives (`BrowserHARManager.ts:115`), Chromium traces (`BrowserTracing.ts:95`), PDFs (`BrowserPage.ts:339`), and screenshots (`BrowserPage.ts:320`). The name tells a consumer the interface does one thing when it does four, and it is the only public interface in either barrel carrying neither the `Browser` nor the `CDP` prefix.
   repair: Rename to `BrowserWriterInterface`, rename `createScreenshotWriter` to `createBrowserWriter`, and update `src/core/BrowserContext.ts`, `BrowserPage.ts`, `BrowserHARManager.ts`, `BrowserDiagnostics.ts`, `BrowserTracing.ts`, `src/server/factories.ts`, `README.md`, and `guides/browser.md`.

## s04-07

7. package=browser file=`src/core/types.ts:510` rule=`.claude/rules/architecture.md` § Wrapper test ("Delete … compatibility aliases") verdict=CONFIRMED
   wrong: `export interface BrowserFilterOptions extends BrowserLocatorFilter {}` adds no member and no narrowing. It is a rename-only alias of `BrowserLocatorFilter`, published in the barrel as a second name for one concept.
   repair: Delete `BrowserFilterOptions`, change `BrowserLocatorInterface.filter` (line 529) to take `BrowserLocatorFilter`, and update `BrowserLocator.ts` and the guide row.

## s04-08

8. package=browser file=`src/core/types.ts:155-157` rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS make interface properties and public return collections readonly") verdict=CONFIRMED
   wrong: `BrowserNavigationWatch.responses` is typed `BrowserResponse[]`, a mutable array on a barrel-exported interface property. Every other collection property in this file is `readonly T[]`.
   repair: Change to `readonly responses: readonly BrowserResponse[]` and copy-on-write at the accumulation site in `BrowserPage.ts:519-530`. If the mutability is load-bearing for the accumulator, the type belongs off the public interface entirely — it is internal navigation bookkeeping, not a consumer contract.

## s04-09

9. package=browser file=`src/core/types.ts:513-515,546` (implemented at `src/core/BrowserLocator.ts:286-299`) rule=`.claude/rules/names.md` § Split behavioral variants + `.claude/rules/patterns.md` § Managers/Accessors verdict=CONFIRMED
   wrong: `text(options?: { all?: boolean }): Promise<string | readonly string[]>` hides two algorithms behind a discriminator. `all: true` compiles a different expression, runs a different validation, and returns a different type, so every caller must narrow a union the API could have avoided. The type name `BrowserTextResultOptions` also stacks two role suffixes from `.claude/rules/names.md` § Type-level identifiers.
   repair: Split into `text(): Promise<string>` and `texts(): Promise<readonly string[]>`, the singular/plural accessor shape `.claude/rules/patterns.md` prescribes. Delete `BrowserTextResultOptions`. Update `BrowserLocator.ts` and the guide's method table.

## s04-10

10. package=browser file=`src/core/types.ts:876-884,728,1389-1390` (implemented at `src/core/BrowserWebSocket.ts:36-53`) rule=`AGENTS.md` § Design laws ("Minimal public API") + `.claude/rules/architecture.md` § System constraints ("Keep interfaces to the smallest primitives the capability requires") verdict=CONFIRMED
   wrong: Interfaces the package hands a consumer as observations publish the owner's write surface. `BrowserWebSocketInterface` exposes `receive`, `transmit`, `fail`, and `close` — pure emit triggers the network manager calls; a consumer holding the `socket` event payload can call `socket.receive(frame)` and every listener sees a frame that never crossed the wire. `BrowserDownloadInterface.update(progress)` and `BrowserFrameInterface.update(url)`/`assert()` are the same shape: `frame.update('https://…')` desynchronizes the frame's reported URL from the page with no protocol call.
   repair: Split each contract. Keep the read surface plus `emitter` on the published interface (`BrowserWebSocketInterface`, `BrowserDownloadInterface`, `BrowserFrameInterface`) and move the drive methods onto the concrete class only, typing the owner's field as the class rather than the interface. `BrowserRoute` already demonstrates the correct split.

## s04-11

11. package=browser file=`src/core/BrowserWebSocket.ts:44,48` rule=`AGENTS.md` § Design laws ("One concept, one term. Lifecycle verbs have fixed meanings") + `.claude/rules/names.md` § Fixed lifecycle vocabulary verdict=CONFIRMED
   wrong: `close(timestamp: number)` closes nothing — it records that an observed remote socket closed. Every other `close()` in this package (`page.close()`, `context.close()`, `browser.close()`, `transport.close()`, `CDPClient.close()`) tears down a real resource and takes no argument. `fail(message)` likewise emits the event named `error`, so one concept carries two words.
   repair: When finding 10 moves these off the published interface, rename them on the class for what they record — `observeClose(timestamp)` and `observeError(message)`, or fold both into the network manager that calls them.

## s04-12

12. package=browser file=`src/server/helpers.ts:172-176,219-221,229-231,297-299` rule=`.claude/rules/architecture.md` § Wrapper test ("Delete one-line delegates") + `AGENTS.md` § Design laws ("Minimal public API … do not speculate") verdict=CONFIRMED
   wrong: `findEnvOverride`, `findInstallPath`, `probePathNames`, and `findInStore` are each a single `return findAllX(...)[0]`. None has a caller in `src/` or `tests/` — their only other occurrence in the repository is the guide table that documents them. They are four published wrappers with no consumer, and the `find*`/`findAll*` split is the `methodOne`/`methodAll` shape `.claude/rules/patterns.md` § Batch operations rejects.
   repair: Delete all four. Rename the surviving plurals to drop `All` (`findAllEnvOverrides` → `findEnvOverrides`, `findAllInstallPaths` → `findInstallPaths`, `probeAllPathNames` → `probePathNames`, `findAllInStore` → `findInStore`), update `findSystemBrowsers`, and strike the four rows and their fence lines from `guides/browser.md:355-424`. Keep `findSystemBrowser` (line 105) — it has a real caller at `Browser.ts:626` — but inline it there if that stays its only one.

## s04-13

13. package=browser file=`src/server/helpers.ts:166,407` rule=`.claude/rules/typescript.md` § Errors and outcomes ("Error classes expose a machine-readable `code`"; "Every public error class ships with a guard") verdict=CONFIRMED
   wrong: Two public functions throw a bare `Error`: `removeBrowserProfile` on an unsafe profile path, and `waitForCDPReady` when the endpoint never answers. Neither is narrowable by `isBrowserError`, `isBrowserConnectionError`, or any guard the package publishes, so a caller catching around `connect()` cannot distinguish a readiness timeout from an unrelated fault.
   repair: Throw `BrowserError('Refusing to remove an unsafe browser profile path', undefined, { path })` and `BrowserConnectionError(…, { port, timeout })` respectively.

## s04-14

14. package=browser file=`src/server/helpers.ts:363-378` rule=`.claude/rules/typescript.md` § Comments and API documentation ("Every public export has complete TSDoc: description, `@param`, `@returns`") verdict=CONFIRMED
   wrong: `waitForCDPReady` declares four parameters and its TSDoc documents three. `signal?: AbortSignal` is undocumented, and it is the one parameter whose behavior a caller cannot guess — an abort mid-wait rethrows rather than resolving (line 399).
   repair: Add `@param signal - Optional external abort; an abort while waiting rethrows rather than resolving.`

## s04-15

15. package=browser file=`src/server/factories.ts:41-48` rule=`.claude/rules/architecture.md` § Declaration placement (one class per implementation file) + § Functions and orchestration verdict=CONFIRMED
   wrong: `createScreenshotWriter` returns an object literal carrying an `async write` method — an implementation body declared inside a centralized factory file. Every other implementation in this package is a class in its own file, and this is a pluggable sink, which `.claude/rules/architecture.md` § Extension categories names as a designed growth seam.
   repair: Add `src/server/writers/BrowserFileWriter.ts` holding one class implementing the interface with `#` fields, export it from `src/server/index.ts`, and reduce the factory to `return new BrowserFileWriter()`.

## s04-16

16. package=browser file=`src/core/BrowserContext.ts:50-57`, `src/core/BrowserFrame.ts:42-49`, `src/core/BrowserWorker.ts:17-23`, `src/core/BrowserDownload.ts:26` rule=`.claude/rules/patterns.md` § Options ("Group related settings beneath the configured entity noun") verdict=CONFIRMED
   wrong: Barrel-exported classes take long positional constructors with optional tails — `BrowserContext(client, id?, viewport?, writer?, emulation?, downloads?)` is six, `BrowserFrame(client, session, id, url, parent?, name?, isolated = true)` is seven including a defaulted bare boolean. A consumer supplying only a writer must write `new BrowserContext(client, undefined, undefined, writer)`, and the call site says nothing about what the arguments mean.
   repair: Declare a grouped input in `types.ts` for each — `BrowserContextInput { id?, viewport?, writer?, emulation?, downloads? }`, `BrowserFrameInput { parent?, name?, isolated? }` — and take `(client, input?)`. Update the owners that construct them.

## s04-17

17. package=browser file=`src/core/BrowserCodegen.ts:37` against `src/core/BrowserHandle.ts:15`, `src/core/BrowserWorker.ts:19`, `src/core/BrowserFrame.ts:44` rule=`AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
   wrong: One value carries two names. `BrowserCodegen` names its CDP session parameter `sessionId` while `BrowserHandle`, `BrowserWorker`, and `BrowserFrame` name the same value `session`. `CDPClientInterface.send`/`subscribe`/`unsubscribe` (`types.ts:80-87`) also use `sessionId`.
   repair: Use `session` everywhere, including the `CDPClientInterface` parameter names.

## s04-18

18. package=browser file=`src/core/types.ts:223,57,1416` rule=`AGENTS.md` § Design laws ("Named discriminants … never `kind` or `type`") + `.claude/rules/names.md` § General vocabulary verdict=CONFIRMED
   wrong: Three public members name their axis `type`. `BrowserScreenshotOptions.type?: 'png' | 'jpeg'` varies image format; `CDPTarget.type: string` varies target category; `BrowserNode.type: number` varies DOM node category. The package names the same axis correctly elsewhere — `BrowserDialogCategory`, `BrowserWorkerCategory`, `BrowserCodegenAction.action` — so these three are the inconsistency, not the convention.
   repair: Rename to `format`, `category`, and `category` respectively, and update the decoders (`helpers.ts:213-217`, `server/helpers.ts:447-452`, `helpers.ts:3148`) and the guide.

## s04-19

19. package=browser file=`src/core/types.ts:184-194` rule=`.claude/rules/patterns.md` § Options ("Group related settings beneath the configured entity noun") verdict=CONFIRMED
   wrong: `BrowserActionOptions` is one flat bag whose keys apply to disjoint operations, and it is the options type of `click`, `fill`, `select`, `check`, `uncheck`, `hover`, `focus`, `press`, `type`, `clear`, `wait`, `drag`, and `upload`. `steps` applies only to `drag`; `button`, `count`, and `position` only to `click`; `delay` only to `press`/`type`. `locator.fill(value, { steps: 3, button: 'right' })` typechecks and silently does nothing.
   repair: Keep the genuinely shared keys (`timeout`, `strict`, `force`, `trial`) on `BrowserActionOptions` and declare `BrowserClickOptions extends BrowserActionOptions { button?, count?, position? }`, `BrowserDragOptions extends BrowserActionOptions { steps?, position? }`, and `BrowserTypeOptions extends BrowserActionOptions { delay? }`. Type each method with the one it accepts.

## s04-20

20. package=browser file=`src/core/types.ts:1186-1192` rule=`.claude/rules/names.md` § Entity-scoped names + § General vocabulary ("A consumer should be able to predict them without documentation") verdict=CONFIRMED
   wrong: `BrowserMedia` publishes `color` (prefers-color-scheme) beside `colors` (forced-colors) — two distinct CSS features whose public names differ by one letter, so a typo silently selects the wrong feature. `BrowserMedia.media` also repeats its own entity name, which is exactly the context the entity already supplies.
   repair: Rename `colors` to `forced` and `media` to `output` (the axis it varies: `'screen' | 'print'`). Update `mediaToFeatures` at `helpers.ts:1736-1751`. The literal values stay as they are — they are CSS-spec external values, which `.claude/rules/names.md` § General vocabulary permits as unions.

## s04-21

21. package=browser file=`src/core/index.ts:5-36`, `src/server/index.ts:5-6` rule=`.claude/rules/architecture.md` § Barrel exports ("A row obliges a documented, runnable example"; "Intern it … when its constructor requires a value only its owner produces") verdict=CONFIRMED
   wrong: Thirty-three classes are barrelled and not one carries an `@example`; the whole of `src/` holds six `@example` blocks, all on functions in `helpers.ts` and `factories.ts`. Several of those rows are also unconstructible by a consumer: `BrowserRoute(frame, id, request)` needs a CDP Fetch `requestId`, `BrowserHandle(client, session, id)` a remote-object id, `BrowserFileChooser(frame, backend, multiple)` a backend node id, and `BrowserWorker(client, session, id, url, category)` an attached session — each a value only its owner produces.
   repair: Intern `BrowserRoute`, `BrowserHandle`, `BrowserFileChooser`, `BrowserWorker`, `BrowserDialog`, and `BrowserDownload` — remove their barrel rows, name them in the parity `INTERNAL` list, and keep the interfaces public since they appear in `BrowserPageEventMap`. Give every class that stays barrelled a runnable `@example` on its class TSDoc.

## s04-22

22. package=browser file=`src/core/helpers.ts:1937` rule=`.claude/rules/names.md` § Value-level identifiers (Guard → `is{Condition}`) + § General vocabulary ("One term per concept") verdict=CONFIRMED
   wrong: `guardEvaluateExpression` returns a string. `guard` is this project's word for a `Guard<T>` predicate, and every sibling in its family is `compile*Expression`.
   repair: Rename to `compileGuardedEvaluateExpression` and move it with the rest of the compiler family in finding 3.

## s04-23

23. package=browser file=`src/core/helpers.ts:2245-2249,2380-2384,2419-2423,2458-2462,2727-2731,2774-2778,2819-2821,2843-2845` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") + § Kind purity ("a reusable … fragment has one implementation") verdict=CONFIRMED
   wrong: The in-page visibility predicate — `display !== 'none' && visibility !== 'hidden' && visibility !== 'collapse' && rect.width > 0 && rect.height > 0` — is written out verbatim eight times across the compiled expressions, in two spellings (an arrow named `visible` and an inline conditional at 2819 and 2843). A change to what "visible" means has eight edit sites and no test can see a missed one.
   repair: Add one `BROWSER_VISIBILITY_SOURCE` to `constants.ts` holding the predicate source and interpolate it at each site.

## s04-24

24. package=browser file=`src/core/helpers.ts:2329-2332,2363-2366,2402-2405,2441-2444` rule=`AGENTS.md` § Design laws ("No polling architecture. Park idle work on events") + `.claude/rules/architecture.md` § Kind purity (constants) verdict=CONFIRMED
   wrong: The four locator waits poll the DOM with `setInterval(…, 50)`. The four selector waits for the same four states (lines 2635, 2677, 2719, 2766) already use `MutationObserver`, so the event mechanism exists and is proven in this file — the locator family simply did not adopt it. The `50` is also a bare literal duplicated four times while `BROWSER_WAIT_POLL_INTERVAL_MS` (`constants.ts:131`) exists and holds `100`, so the two wait families disagree about the interval and neither reads the constant.
   repair: Rewrite `compileAttachedLocatorWaitExpression`, `compileDetachedLocatorWaitExpression`, `compileVisibleLocatorWaitExpression`, and `compileHiddenLocatorWaitExpression` on the `MutationObserver` + `setTimeout(deadline)` shape their selector-based twins use. If a poll must remain for a state a mutation record cannot report, interpolate `BROWSER_WAIT_POLL_INTERVAL_MS` rather than a literal.

## s04-25

25. package=browser file=`src/core/types.ts:173-176` against `src/core/BrowserPage.ts:201-243,420-561,935-972` rule=`.claude/rules/architecture.md` § Extract sub-entities + `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
   wrong: `page.navigation` is named for navigation and owns two waiters (`wait`, `until`, 88 lines). The navigation engine — `navigate`, `reload`, `back`, `forward`, and thirteen private methods (`#navigate`, `#reload`, `#history`, `#navigateHistory`, `#watchNavigation`, `#clearNavigationWatch`, `#navigationResult`, `#completeNavigation`, `#stopLoading`, `#waitForLoadEvent`, `#resolveLoad`, `#rejectLoad`, `#cancelLoad`, `#clearLoad`) — lives on `BrowserPage`. A reader who follows the manager noun to find navigation finds the smallest part of it, and `BrowserPage` is 982 lines largely because of what the manager does not hold.
   repair: Move the navigation engine into `BrowserNavigationManager` and widen `BrowserNavigationManagerInterface` to `navigate`, `reload`, `back`, `forward`, `wait`, `until`. Keep `page.navigate(…)` as a shortcut only if the guide documents it as one, the way `browser.create()` is documented as a shortcut for the default context.

## s04-26

26. package=browser file=`src/core/types.ts:76-89` against `src/server/Browser.ts:88,491-504` rule=`.claude/rules/patterns.md` § Stateful emitters ("An entity with lifecycle transitions … owns an emitter by composition") verdict=CONFIRMED
   wrong: `CDPClientInterface` has `connect`, `reconnect`, `close`, and `connected` but publishes no emitter, so a client-level disconnect is unobservable. `Browser` works around this by retaining `#transport` purely to subscribe to the transport's `close` and `error` — reaching past the client that owns that transport, which is the boundary leak the missing emitter forces. Every peer entity in the package (`BrowserPage`, `BrowserContext`, `BrowserCodegen`, `BrowserDownload`, `BrowserWebSocket`, `BrowserNetworkManager`, `CDPTransportInterface`, `Browser`) has one.
   repair: Add `CDPClientEventMap { connect: [], disconnect: [], error: [error: unknown] }` to `types.ts`, `readonly emitter: EmitterInterface<CDPClientEventMap>` to `CDPClientInterface`, and `on`/`error` to `CDPClientOptions`, per `.claude/rules/patterns.md` § Stateful emitters. Then delete `Browser`'s `#transport`, `#bindTransport`, and `#unbindTransport` and bind to `client.emitter`. Keep `subscribe`/`unsubscribe` for protocol events, which are string-keyed and genuinely outside a typed `EventMap`.

## s04-27

27. package=browser file=`src/core/factories.ts:18,36`, `src/core/helpers.ts:3205`, `src/server/factories.ts:16`, `src/server/helpers.ts` (one site), `src/server/types.ts:9`, `src/server/errors.ts:1`, `src/server/Browser.ts`, `src/server/transports/WebSocketCDPTransport.ts` — 13 occurrences rule=`.claude/rules/documentation.md` § Guide examples ("Never use in-repository `@src/*` aliases in public guide examples") verdict=CONFIRMED
   wrong: Published TSDoc `@example` fences import from `@src/core` and `@src/server`. These fences ship inside the generated `.d.ts` and are what a consumer reads in their editor, so the example they are shown does not resolve for them. `compileCodegenScript` at `helpers.ts:2111` already emits the correct specifier (`@orkestrel/browser`), which shows the package knows the difference.
   repair: In every `@example` fence, use `@orkestrel/browser` and `@orkestrel/browser/server`. Value imports in `src/server/*` that reach core through the `@src/core` alias are source imports, not examples, and stay as they are.

## s04-28

28. package=browser file=`src/core/errors.ts:9` rule=`.claude/rules/documentation.md` § Authority ("Do not create competing instruction copies in guides") + `.claude/rules/writing.md` § Code tokens, references, and links verdict=CONFIRMED
   wrong: Published TSDoc reads "Carries a machine-readable `code` and optional `context` (AGENTS §12)". The target's own `AGENTS.md` has no numbered sections, so the citation resolves to nothing, and it points a consumer of the package at an internal rulebook they do not have. (`guides/README.md:3,67` carries the same dead "§22" citation, outside this unit's scope.)
   repair: Delete the parenthetical. The sentence states the contract without it.

## s04-29

29. package=browser file=`src/server/helpers.ts:418-461` rule=`.claude/rules/typescript.md` § Errors and outcomes ("I/O/network/external operation → Return `Result<T, E>` or throw consistently") verdict=CONFIRMED
   wrong: `fetchCDPTargets` returns `[]` for a non-`ok` response, a non-array body, and every thrown fault alike, so "the browser has no targets" and "the browser is unreachable" are one value. The caller cannot tell them apart, and `@orkestrel/contract` — a declared runtime dependency already imported in this file — publishes the `Result` and `attempt` primitives for exactly this.
   repair: Return `Promise<Result<readonly CDPTarget[], BrowserError>>` using the installed `@orkestrel/contract` `Result`, and narrow at the `#syncContexts` call site in `Browser.ts`.

## s04-30

30. package=browser file=`src/core/errors.ts`, `src/core/helpers.ts`, `src/core/factories.ts`, `src/server/errors.ts`, `src/server/helpers.ts`, `src/server/factories.ts` rule=`.claude/rules/typescript.md` § Comments and API documentation ("The first sentence states what the symbol does in the third person with an `-s` verb") verdict=CONFIRMED
   wrong: TSDoc first sentences open in the imperative — "Decode …", "Compile …", "Create …", "Validate …", "Narrow …". 122 such openers across these six files; the count and the fleet-wide reading were established by the dedicated convention lane (browser: 139 imperative to 1 third-person), not re-derived here.
   repair: Fleet-wide decision, not this package's alone. Either rewrite these six files to `-s` form ("Decodes …", "Compiles …") or change the rule; do not split the fleet.

## s04-31

31. package=browser file=`src/core/types.ts:1026-1031` rule=`.claude/rules/documentation.md` § Parity ("A parity failure identifies drift") verdict=CONFIRMED
   wrong: The TSDoc reads "Mutable recording state held until a request finishes" while all three members are declared `readonly`. The prose contradicts the type it sits on, and a reader trusting it will look for mutation that cannot happen.
   repair: Change to "Recording state held until a request finishes; a new value replaces it on each update."

## s04-32

32. package=browser file=`src/core/helpers.ts:3211-3215` rule=`.claude/rules/architecture.md` § Centralized-file pattern (Guards → `*/validators.ts`) verdict=CONFIRMED
   wrong: `isBrowserNodeQuery` declares a `value is BrowserNodeQuery` type predicate and sits in `helpers.ts`; the package has no `validators.ts`. `isBrowserNodeVisible` (line 3250) is correctly placed — it is a predicate rather than a `Guard<T>`, which `.claude/rules/architecture.md` § Kind purity names explicitly.
   repair: Create `src/core/validators.ts` and move `isBrowserNodeQuery` into it. Counter-reading, recorded: `.claude/rules/patterns.md` § Validation and contracts defines that file as holding total `(unknown) => value is T` guards, and this one narrows a two-member union rather than `unknown`. If the implementer takes that reading, leave it in `helpers.ts` and record the decision in a `@remarks`; do not leave the question open.

## s04-33

33. package=browser file=`src/core/types.ts:957-963,966-969,972-977,980-990,993-1003,1017-1024` rule=`.claude/rules/names.md` § Entity-scoped names ("one word") verdict=EXEMPT
   wrong: The HAR types carry compound keys — `httpOnly`, `mimeType`, `httpVersion`, `queryString`, `postData`, `headersSize`, `bodySize`, `statusText`, `redirectURL`, `startedDateTime`.
   repair: None. `src/core/types.ts:949-956` documents the exception: these are HAR 1.2 external wire-schema keys preserved so archives stay interoperable, which `.claude/rules/names.md` § General vocabulary admits as external-spec names. Recorded only because the `@remarks` sits on `BrowserHARCookie` alone — extend the same note to `BrowserHARRequest`, `BrowserHARResponse`, `BrowserHARContent`, `BrowserHARPost`, and `BrowserHAREntry` so the exemption is visible where each of them is read.

## s04-34

34. package=browser file=`src/server/helpers.ts:339-345` rule=`.claude/rules/patterns.md` § Options verdict=CONFIRMED
   wrong: `launchBrowserProcess(executable, port, headless, profile?, extra?)` takes five positional parameters including a bare boolean, so a call site reads `launchBrowserProcess(exe, 9222, true, undefined, args)` and says nothing about what `true` selects.
   repair: Declare `BrowserLaunchOptions { port, headless?, profile?, args? }` in `src/server/types.ts` and take `(executable, options)`.

## s04-35

35. package=browser file=`src/server/types.ts:239` (implemented at `src/server/Browser.ts:130-132`) rule=`.claude/rules/architecture.md` § Wrapper test ("Delete … rename-only helpers/getters") verdict=CONFIRMED
   wrong: `BrowserInterface` publishes both `status: BrowserStatus` and `connected: boolean`, and `connected` is exactly `status === 'connected'`. Two public names for one fact, one of them a rename-only getter. (`CDPClientInterface.connected` is not this — there `connected` is the sole representation and correct.)
   repair: Drop `connected` from `BrowserInterface` and `Browser`, and update the guide and the tests that read it. Keep `status`, which carries strictly more.