# Fix report: browser

## Dispositions

- **s04-01** deferred_breaking: Renaming nineteen exported read* coercers to parse* moves the published surface. The move half does not stand alone: tests/setupPolicy.ts inspectPolicyFunctionName rejects any function in parsers.ts whose name does not start with parse, so creating src/core/parsers.ts and moving read* into it under their present names reddens the policy gate. Deferred whole.
- **s04-02** deferred_breaking: Renaming exported decodeRareStringData, decodeRareBooleanData, decodeRareIntegerData, decodeBrowserAttributes, and decodeBrowserSnapshot to read* removes those names from the barrel. Also sequenced after s04-01, which is deferred.
- **s04-03** applied (src/core/compilers.ts, src/core/helpers.ts, src/core/index.ts, src/core/BrowserCodegen.ts, src/core/BrowserFrame.ts, src/core/BrowserLocator.ts, src/core/BrowserNavigationManager.ts, src/core/BrowserPage.ts, src/core/BrowserScriptManager.ts, src/core/BrowserStorageManager.ts, src/core/BrowserWorker.ts, tests/src/core/compilers.test.ts, tests/src/core/helpers.test.ts): Created src/core/compilers.ts holding the twenty-four compile* functions plus guardEvaluateExpression, barrelled it, and repointed the eight importing classes. helpers.ts drops from 3253 to 2420 lines; no exported name changed. The tests mirror rule follows the source move, so the three compiler-only describes (browser action expressions, guardEvaluateExpression, compileCodegenScript) moved from tests/src/core/helpers.test.ts into a new tests/src/core/compilers.test.ts; the normalize-and-compile round-trip block stays in helpers.test.ts because its subject is normalization.
- **s04-04** applied (src/core/constants.ts, tests/src/core/BrowserHARManager.test.ts): Applied the reshaped repair: kept BROWSER_HAR_CREATOR.version, corrected the stale 0.0.11 literal to the manifest's 0.0.14, and added the recomputing mechanism the lane required - a parity assertion in tests/src/core/BrowserHARManager.test.ts reading package.json and comparing both name and version. The constant's TSDoc names that test. Written HAR archives now stamp the real release version, which is the drift the finding reports.
- **s04-05** deferred_breaking: Removing found and connection from the barrel-exported BrowserDiscoveryResult drops public interface members. Re-verified present at src/server/types.ts:34-39.
- **s04-06** deferred_breaking: Renaming ScreenshotWriterInterface and createScreenshotWriter renames exported symbols.
- **s04-07** deferred_breaking: Deleting the exported BrowserFilterOptions alias removes a barrelled symbol and retypes BrowserLocatorInterface.filter. Re-verified at src/core/types.ts:539,558.
- **s04-08** applied (src/core/types.ts): Applied the readonly tightening alone: BrowserNavigationWatch.responses is now readonly BrowserResponse[]. Copy-on-write was not applied because it breaks the mechanism - BrowserPage keeps the same array object in #responses and pushes into it while the watch value is held across the navigation await, so replacing the array would leave the watch reading an empty snapshot and would also break the identity check at BrowserPage.ts:528. The finding's alternative (taking the type off the public surface) removes a barrelled export, so it is breaking. The class's internal accumulator stays mutable through its own private field; no consumer can reach a mutable reference through the type.
- **s04-09** deferred_breaking: Splitting text() into text()/texts() and deleting BrowserTextResultOptions changes a published method signature and removes an exported type.
- **s04-10** deferred_breaking: Moving receive/transmit/fail/close, update, and assert off BrowserWebSocketInterface, BrowserDownloadInterface, and BrowserFrameInterface removes published interface members.
- **s04-11** deferred_breaking: The reshaped repair renames fail on the class only after s04-10 moves it off the published interface; s04-10 is deferred, so fail is still a published member and renaming it is breaking. Both lanes agree close(timestamp) stays as it is.
- **s04-12** deferred_breaking: Deleting findEnvOverride, findInstallPath, probePathNames, and findInStore and renaming the surviving plurals removes and renames barrelled exports. Re-verified all four still present in src/server/helpers.ts.
- **s04-13** applied (src/server/helpers.ts): removeBrowserProfile now throws BrowserError('Refusing to remove an unsafe browser profile path', undefined, { path }) and waitForCDPReady throws BrowserConnectionError with { port, timeout }. Both messages are byte-identical to the previous plain Error messages, so the two tests matching on those messages (tests/src/server/helpers.test.ts:336,343,497) still pass unchanged; the change only adds a narrowable class, code, and context.
- **s04-14** applied (src/server/helpers.ts): Added the @param signal line documenting that an abort while waiting rethrows rather than resolving.
- **s04-17** applied (src/core/types.ts, src/core/CDPClient.ts, src/core/BrowserCodegen.ts): CDPClientInterface.send/subscribe/unsubscribe and CDPClient's implementations now name the parameter session, and BrowserCodegen's constructor parameter and private field are session/#session. A TypeScript parameter name is not callable by name, so no consumer call breaks. Observation outside the finding's named scope: BrowserPage (#sessionId field, constructor parameter) and BrowserContext (locals and private method parameters) still spell the same value sessionId; BrowserFrame's #sessionId() resolver cannot take the name because #session is already its field.
- **s04-18** deferred_breaking: Renaming BrowserScreenshotOptions.type, CDPTarget.type, and BrowserNode.type renames published members. Re-verified at src/core/types.ts:61,252,1445.
- **s04-19** deferred_breaking: Moving button, count, position, steps, and delay off BrowserActionOptions removes published members and narrows the accepted option type of thirteen published methods.
- **s04-20** deferred_breaking: Renaming BrowserMedia.color to scheme and media to output renames published members. Both lanes agree on scheme (not the finding's forced) and on leaving colors as the forced-colors key.
- **s04-21** deferred_breaking: Interning BrowserRoute, BrowserHandle, BrowserFileChooser, BrowserWorker, BrowserDialog, and BrowserDownload removes barrel rows. The example half does not stand alone: the repair's obligation is scoped to the classes that stay barrelled, which the deferred interning decides, and the six named rows are exactly the ones whose constructors take a value only their owner produces, so no runnable example can be written for them. Re-verified: no class in src/ carries an @example (the only @example blocks are on functions in factories.ts and helpers.ts, plus the new BrowserFlight).
- **s04-22** deferred_breaking: Renaming the exported guardEvaluateExpression to compileGuardedEvaluateExpression moves the published surface. The move half of the repair landed under s04-03: the function now sits in src/core/compilers.ts with the rest of the compiler family, under its existing name.
- **s04-23** applied (src/core/constants.ts, src/core/compilers.ts, guides/browser.md): Added BROWSER_VISIBILITY_SOURCE holding the predicate over the style and rect locals, and interpolated it at all eight sites - six positive returns and the two negated inline conditionals in compileClickExpression and compileFillExpression, rewritten as if (!(...)) so the generated behaviour is identical. Added the guide constant row.
- **s04-24** applied (src/core/compilers.ts): Applied the reshaped repair, which both lanes share: the four locator waits now interpolate BROWSER_WAIT_POLL_INTERVAL_MS instead of the bare 50, and the MutationObserver port is not attempted (the objective lane's shadow-root objection makes it a separate unit). The locator waits therefore poll at 100ms, matching the constant every other wait site already reads.
- **s04-26** deferred_breaking: Adding a required emitter member to the published CDPClientInterface breaks any consumer implementing it, and BrowserWorker, BrowserHandle, and BrowserCodegen all accept a CDPClientInterface in barrelled constructors. The additive half (on and error on CDPClientOptions) landed under s04b-02 for error.
- **s04-27** applied (src/core/factories.ts, src/core/helpers.ts, src/server/factories.ts): Every @example fence now imports through the published specifier: @orkestrel/browser in src/core/factories.ts (two fences) and src/core/helpers.ts, and @orkestrel/browser/server in src/server/factories.ts. Re-verified no @src alias remains inside any TSDoc fence; the remaining @src/core occurrences are the value imports in src/server/* that the finding explicitly leaves alone.
- **s04-28** applied (src/core/errors.ts): Deleted the dead (AGENTS §12) citation from the BrowserError TSDoc; the sentence states the contract without it. The guides/README.md §22 twin is outside this unit's scope, as the finding notes.
- **s04-29** deferred_breaking: Changing fetchCDPTargets to return Promise<Result<readonly CDPTarget[], BrowserError>> is a non-additive change to a published return type.
- **s04-30** deferred_wave: TSDoc first-sentence voice across the six centralized files; the fleet migrates in its own dedicated wave. Every TSDoc sentence written or rewritten in this unit uses the third-person form.
- **s04-31** applied (src/core/types.ts): BrowserHARPending's TSDoc now reads "Recording state held until a request finishes; a new value replaces it on each update." - the prose no longer contradicts the readonly members it sits on.
- **s04-35** deferred_breaking: Dropping connected from BrowserInterface and Browser removes a published member. Re-verified at src/server/types.ts:239.
- **s04b-01** applied (src/server/transports/WebSocketCDPTransport.ts, guides/browser.md): send() now throws BrowserConnectionError('WebSocket CDP transport is not open', { url: this.#url }) with the message unchanged, and the guide's CDPTransportInterface send row at guides/browser.md:920 no longer claims a plain Error - it states the coded throw and the url context. Applying the code change without the guide edit would have left a false prose claim, which is why the row moved in the same change.
- **s04b-02** applied (src/core/types.ts, src/core/CDPClient.ts, guides/browser.md): Added the optional readonly error?: EmitterErrorHandler to CDPClientOptions (additive), stored it in #error, threaded the event method into #dispatch(handlers, method, params), and reported a subscriber throw through this.#error?.(thrown, method). Listener isolation is kept: the throw is never rethrown. Updated the CDPClientOptions guide row.
- **s04b-03** applied (src/core/CDPClient.ts): Replaced the backwards-compatibility rationale in the class @remarks with the rule it actually implements - a subscription registered without a session id receives the event whatever session carries it, a session-scoped subscription receives only its own session's events - and deleted the line-331 comment with it. The ALL capitalization objection is moot because the sentence carrying it is gone.
- **s04b-04** deferred_breaking: Renaming BrowserCookieManagerInterface.list to cookies renames a published interface member and a class method. Re-verified at src/core/BrowserCookieManager.ts:24 and src/core/types.ts.
- **s04b-05** deferred_breaking: Replacing send's positional session and timeout tail with a CDPSendOptions object is a non-additive change to a published call signature on both CDPClientInterface and BrowserFrameInterface. The parameter rename half landed under s04-17.
- **s04b-06** applied (src/core/CDPClient.ts, src/server/transports/WebSocketCDPTransport.ts, src/core/BrowserNetworkManager.ts, src/core/BrowserCodegen.ts): Each private transition is now named for the public verb it implements: CDPClient #start/#stop became #connect/#close, WebSocketCDPTransport #open/#stop became #start/#close, BrowserNetworkManager #begin became #start. BrowserCodegen's #begin/#end became #start/#stop in the same pass, since its public verbs are start/stop and it was the fourth spelling of the same role.
- **s04b-07** applied (src/core/BrowserFlight.ts, src/core/types.ts, src/core/index.ts, src/core/CDPClient.ts, src/server/transports/WebSocketCDPTransport.ts, src/core/BrowserNetworkManager.ts, src/server/Browser.ts, src/core/BrowserPage.ts, src/core/BrowserCodegen.ts, src/core/BrowserContext.ts, tests/src/core/BrowserFlight.test.ts, guides/browser.md): Added the exported BrowserFlight class in its own core file with BrowserFlightInterface and BrowserFlightFunction in types.ts, barrelled it, and routed every single-promise-field site named by the lanes: CDPClient (#connecting, #closing), WebSocketCDPTransport (#starting, #closing), BrowserNetworkManager (#starting), Browser (#connecting, #disconnecting), BrowserPage (#codegenStart), BrowserCodegen (#starting, #stopping), BrowserContext (#syncing). The Map-keyed BrowserPage.ts frame-session site is left alone. Every entry guard stayed at its site. Added the targeted in-flight identity test and the guide Surface rows, Methods table, and example fence. Two naming decisions are mine: the readonly accessor is attempt (the word the sites already used for the in-flight promise), and the class is BrowserFlight.
- **s04b-08** applied (src/core/helpers.ts, src/core/types.ts, src/core/BrowserCoverage.ts, src/core/BrowserNetworkManager.ts, src/core/BrowserClock.ts, src/core/BrowserContext.ts, tests/src/core/helpers.test.ts, guides/browser.md): Applied the reshaped repair: settleBrowserTeardown in src/core/helpers.ts runs every step to settlement and RETURNS the first failure rather than throwing it, so each caller keeps its own trailing cleanup and its own throw. Routed BrowserCoverage stop/#stopJavaScript/#stopCSS, BrowserNetworkManager.destroy, BrowserClock.advance, and BrowserContext #destroyResources/#closeResources through it, and folded the browser-context dispose step in #closeResources through the same helper. The steps are variadic rather than an array so each closure is an anonymous callback passed directly as an argument, which architecture.md permits. Declared BrowserTeardownFunction in types.ts, added the unit test and the guide extended-helper row. One behavioural note: a step that throws undefined no longer produces a rethrow, which the callers' own failure !== undefined checks already collapsed.
- **s04b-09** applied (src/core/CDPClient.ts): Collapsed #subscriptions and #sessionSubscriptions into one Map<string | undefined, Map<string, Set<CDPHandler>>> keyed by session id with the global scope under the undefined key. subscribe, unsubscribe, and the #onMessage dispatch each have one body now.
- **s04b-10** deferred_breaking: Renaming test to testId renames a published member of BrowserSelectorManagerInterface and a member of the BrowserSelector union. Re-verified at src/core/BrowserSelectorManager.ts:57 and src/core/types.ts:596.
- **s04b-11** applied (src/core/types.ts, src/core/BrowserEmulationManager.ts, src/core/BrowserStorageManager.ts, guides/browser.md): Declared the exported BrowserPagesFunction in types.ts with TSDoc stating it returns the context's live pages at call time, and applied it to both barrelled classes the lane named - BrowserEmulationManager (field and constructor parameter) and BrowserStorageManager (field and constructor parameter). Same structural type, so no consumer call changes. Added the guide type row.
- **s04b-12** deferred_breaking: Extracting the profiler removes start, stop, and active from the published BrowserPerformanceInterface. Re-verified the mixed shape at src/core/BrowserPerformance.ts.
- **s04b-13** deferred_wave: The only repair is first-sentence voice on the two CDPClient TSDoc sentences (lines 72 and 155), which the fleet's dedicated voice wave owns.
- **s04b-14** applied (src/core/BrowserNetworkManager.ts): Renamed the private #fetch flag to #intercepting, so its two reads state the fact they test rather than naming a CDP domain.
- **s04b-15** applied (src/server/transports/WebSocketCDPTransport.ts, src/server/Browser.ts, src/core/BrowserCodegen.ts): Renamed every #on{Noun} bound-listener field to the majority #{subject}Handler form, which is what both lanes share: #socketCloseHandler in WebSocketCDPTransport (with its uses), #transportCloseHandler, #transportErrorHandler, and #processExitHandler in Browser, and #bindingCalledHandler and #frameNavigatedHandler in BrowserCodegen.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2171ms on 112 files
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . (exit 0, no diagnostics)
- npm run check: pass — tsc --noEmit root + configs/src/tsconfig.core.json + configs/src/tsconfig.server.json, exit 0
- npm run build: pass — built in 3.19s; Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
- npm test: pass — src:core+src:server 28 files / 505 tests passed; policy 111 passed; config 46 passed; setup 42 passed; guides 58 passed

## Diffstat

```text
 guides/browser.md                              |  41 +-
 src/core/BrowserClock.ts                       |  26 +-
 src/core/BrowserCodegen.ts                     |  62 +-
 src/core/BrowserContext.ts                     |  72 +-
 src/core/BrowserCoverage.ts                    | 102 +--
 src/core/BrowserEmulationManager.ts            |   5 +-
 src/core/BrowserFrame.ts                       |   3 +-
 src/core/BrowserLocator.ts                     |   6 +-
 src/core/BrowserNavigationManager.ts           |   7 +-
 src/core/BrowserNetworkManager.ts              |  74 +-
 src/core/BrowserPage.ts                        |  21 +-
 src/core/BrowserScriptManager.ts               |   7 +-
 src/core/BrowserStorageManager.ts              |  13 +-
 src/core/BrowserWorker.ts                      |   3 +-
 src/core/CDPClient.ts                          | 156 ++---
 src/core/constants.ts                          |  23 +-
 src/core/errors.ts                             |   2 +-
 src/core/factories.ts                          |   4 +-
 src/core/helpers.ts                            | 921 ++-----------------------
 src/core/index.ts                              |   2 +
 src/core/types.ts                              |  39 +-
 src/server/Browser.ts                          |  56 +-
 src/server/factories.ts                        |   2 +-
 src/server/helpers.ts                          |  13 +-
 src/server/transports/WebSocketCDPTransport.ts |  48 +-
 tests/src/core/BrowserHARManager.test.ts       |  20 +-
 tests/src/core/helpers.test.ts                 | 173 ++---
 27 files changed, 436 insertions(+), 1465 deletions(-)

Untracked (new files, not shown by git diff --stat):
 src/core/BrowserFlight.ts
 src/core/compilers.ts
 tests/src/core/BrowserFlight.test.ts
 tests/src/core/compilers.test.ts
```

- dist moves: true

## Deviations

Four items to record; none blocked the unit.

1. s04b-07 lane conflict on the method name, resolved by rule rather than left open. One lane kept the finding's run(work), the other required execute(work). `.claude/rules/names.md` § Fixed lifecycle vocabulary fixes `execute` as "Run primary work to completion" and states "Never introduce synonyms such as `cancel`, `reset`, or `run` for these meanings", so `run` is refused by the governing rule and the conflict is not genuine. The method is `execute`.

2. s04b-07 needed a type parameter the finding did not anticipate. Two sites the lane named are not Promise<void>: BrowserPage's #codegenStart resolves a BrowserCodegen and BrowserCodegen's #stopping resolves readonly BrowserCodegenAction[]. The primitive is therefore BrowserFlight<T = void>; every void site declares it bare.

3. s04-01 was deferred whole rather than split, on gate evidence. The move half is normally applicable, but tests/setupPolicy.ts (vendored, off-limits) rejects any function declaration in a file named parsers.ts whose name does not start with parse, so moving the read* coercers without the breaking rename reddens npm run test:policy.

4. Two test files were created that no repair names literally. tests/src/core/compilers.test.ts follows from s04-03 under the tests mirror rule (a new source module owes a mirrored test file), and holds three describes moved out of tests/src/core/helpers.test.ts. tests/src/core/BrowserFlight.test.ts is required by the s04b-07 lane correction ("add a targeted test for the in-flight identity behaviour"). No test was deleted.

Defect caught by running rather than reasoning, recorded because the same shape can recur in the deferred work: routing a teardown through the new helper with `failure ??= await settleBrowserTeardown(...)` short-circuits the whole await when a failure is already held, so the teardown steps never run. It reddened tests/src/core/BrowserClock.test.ts ("preserves an advance failure while restoring the paused clock policy", 1 failed / 495 passed). Both sites now await the helper into a local and merge with `failure ??= settled`; the same command reports 496 passed.
