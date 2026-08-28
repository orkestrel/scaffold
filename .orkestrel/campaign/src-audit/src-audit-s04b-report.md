## Coverage

**package=browser** (`/home/user/fleet/browser`), lane held: **subjective** (design fit, API and vocabulary, architecture fit, simplification, guide/product coherence).

Read in full, each a file in my assigned slice s04b:

- `src/core/CDPClient.ts`, `src/core/BrowserNetworkManager.ts`, `src/core/BrowserScriptManager.ts`, `src/core/BrowserEmulationManager.ts`, `src/core/BrowserCookieManager.ts`, `src/core/BrowserSelectorManager.ts`, `src/core/BrowserCoverage.ts`, `src/core/BrowserPerformance.ts`, `src/core/BrowserTouch.ts`, `src/server/transports/WebSocketCDPTransport.ts`

Read as context, findings suppressed there per the dispatch:

- `src/core/index.ts`, `src/server/index.ts`, `src/server/types.ts`, `src/core/errors.ts`, `src/server/errors.ts`, `src/core/factories.ts` — all in full.
- `src/core/types.ts` — targeted, not in full: the CDP transport/client block (lines 1-104) and the interface blocks for every audited class (`BrowserScriptManagerInterface`, `BrowserCoverageInterface`, `BrowserPerformanceInterface`, `BrowserSelectorManagerInterface`, `BrowserTouchInterface`, `BrowserNetworkManagerInterface`, `BrowserCookieManagerInterface`, `BrowserEmulationManagerInterface`) plus `BrowserFrameInterface.send`.
- `src/core/helpers.ts` and `src/core/constants.ts` — grep only, never read in full. Findings that would depend on a helper's internal semantics are therefore out of my reach and I raise none.
- `guides/browser.md` — grep only (Surface tables, transport section). I used it to test for documented exceptions, not for guide parity.
- Installed declarations read: `@orkestrel/contract` (`attempt`, `parseJSON`, `isInteger`, `isFiniteNumber`), `@orkestrel/websocket` server barrel (full export list), `@orkestrel/emitter` (`EmitterErrorHandler`, `EmitterOptions`).

Not read: the rest of `src/` (prior lane's scope), `tests/`, `configs/`, root files.

Instrument coverage: the duplication searches (`let failed = false`, `new Browser*Manager`, `send(… undefined,`) ran over `/home/user/fleet/browser/src` only, so their counts bound `src/` and say nothing about `tests/`.

Checked and deliberately **not** reported, so the next lane does not re-derive them: the missing `@example` on every audited class is package-wide (no class in `src/` carries one; the guide's Surface tables carry them instead), and per-method TSDoc absence in class files is answered by the member documentation in `src/core/types.ts` `@remarks`. `BrowserNetworkManager.ts:104` using `attempt(() => JSON.parse(text))` where `CDPClient` uses `parseJSON` is justified: the thrown `BrowserError` carries the retained `SyntaxError` in `context.error`, which `parseJSON` discards.

## Findings

1. package=browser file=src/server/transports/WebSocketCDPTransport.ts:85 rule=`.claude/rules/typescript.md` § Errors and outcomes verdict=CONFIRMED
   wrong: `send()` throws a bare `Error`, so a caller cannot narrow it with `isBrowserError`/`isBrowserConnectionError` and gets no `code` or `context`, while every other throw in this file and in `CDPClient` uses a coded `BrowserError` subclass.
   repair: `throw new BrowserConnectionError('WebSocket CDP transport is not open', { url: this.#url })` — the class is already imported at line 20.

2. package=browser file=src/core/CDPClient.ts:351-358 rule=`.claude/rules/patterns.md` § Stateful emitters → Listener isolation verdict=CONFIRMED
   wrong: `#dispatch` swallows every subscriber throw into an empty `catch` with no reporting path, and `CDPClientOptions` (`src/core/types.ts:46-49`) offers no `error` handler — so a consumer's broken CDP event handler fails silently and unobservably. The package's own sibling entity does this correctly: `WebSocketCDPTransportOptions` carries `on` and `error` and threads them into its `Emitter`.
   repair: add `readonly error?: EmitterErrorHandler` to `CDPClientOptions`, store it in a `#error` field, pass the event name into `#dispatch(handlers, method, params)`, and call `this.#error?.(thrown, method)` in the catch. Keep the isolation (never rethrow).

3. package=browser file=src/core/CDPClient.ts:24-25 rule=`AGENTS.md` § Design laws ("No compatibility shims. This is greenfield.") verdict=CONFIRMED
   wrong: the class `@remarks` justifies global subscriptions with "continue to see ALL events for backwards compatibility", and the inline comment at line 331 repeats it ("Fire global handlers (backwards compatible — see ALL events)"). This is greenfield: there is no earlier release to be compatible with, so the sentence documents a rationale that does not exist and hides the real design rule from the reader. The capitalized `ALL` is also outside the plain-prose form `AGENTS.md` § Writing fixes.
   repair: state the rule instead — "A subscription registered without a session id receives the event whatever session carries it; a session-scoped subscription receives only its own session's events." Delete the line-331 comment; the code beneath it says the same thing.

4. package=browser file=src/core/BrowserCookieManager.ts:24 rule=`.claude/rules/patterns.md` § Managers → Accessors verdict=CONFIRMED
   wrong: the manager returns all cookies through `list(urls?)`. The rule fixes the plural domain noun for the all-items accessor, and the rest of the package obeys it — `contexts()`, `pages()` — while `BrowserLocatorInterface.all()` (`src/core/types.ts:534`) is a third spelling of the same idea. Three words for one concept.
   repair: rename to `cookies(urls?: readonly string[])` in `BrowserCookieManagerInterface` (`src/core/types.ts:1129`), in this class, at the call site in `BrowserContext`, in `guides/browser.md`, and in the tests. Settle `all()` versus the plural noun in the same pass so the package has one word.

5. package=browser file=src/core/CDPClient.ts:87-92 rule=`.claude/rules/names.md` § Split instead of compounding → Group options by entity; `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
   wrong: `send(method, params?, sessionId?, timeout?)` encodes two independent settings as positional tail arguments, so reaching one means writing `undefined` for the other — `BrowserContext.ts:361`, `BrowserContext.ts:366`, `BrowserPage.ts:659`, `BrowserCodegen.ts:124` all do. Worse, `BrowserFrameInterface.send` (`src/core/types.ts:1381-1385`) spells the same verb `send(method, params?, timeout?)`, so the third argument means "session" on the client and "timeout" on a frame. One verb, two positional contracts, and `x.send(m, undefined, v)` reads identically in both.
   repair: declare `CDPSendOptions { readonly session?: string; readonly timeout?: number }` in `src/core/types.ts` and give both signatures the same trailing `options?: CDPSendOptions`. The frame's interface documents that it fixes `session` itself. Update every call site in the same change (no overload kept for the old shape).

6. package=browser file=src/core/CDPClient.ts:210 rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary; `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
   wrong: the private transition methods cross their public verbs, and each audited class picks a different word for the identical role. `CDPClient.connect()` runs `#start()` (line 210) and `close()` runs `#stop()` (line 236); `WebSocketCDPTransport.start()` runs `#open()` (line 108) and `close()` runs `#stop()` (line 155); `BrowserNetworkManager.start()` runs `#begin()` (line 274). A reader meeting `#stop` cannot tell whether the entity's public verb is `close` or `stop`, and `#start` at `CDPClient.ts:210` means `connect`, not `start`.
   repair: name each private transition for the public verb it implements — `#connect`/`#close` in `CDPClient`, `#start`/`#close` in `WebSocketCDPTransport`, `#start` in `BrowserNetworkManager`. Fix one word per entity, not a new synonym.

7. package=browser file=src/core/CDPClient.ts:58-71 rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
   wrong: the single-flight transition guard — take the active promise if one is in flight, otherwise start one, store it, and clear it in `finally` only when it is still ours — is written out five times: `CDPClient.ts:58-71` and `192-206`, `WebSocketCDPTransport.ts:60-80` and `90-104`, `BrowserNetworkManager.ts:70-85`. The bodies differ only in their entry guards, and each copy can drift on the `finally` identity check that makes the idiom correct.
   repair: add one exported core primitive holding the promise field, with a single method — `run(work: () => Promise<void>): Promise<void>` that returns the in-flight promise when one exists — place it in `src/core` as its own class file, barrel it, and give each site a `#starting`/`#closing` instance instead of a raw promise field. Keep every entry guard where it is; only the shared body moves.

8. package=browser file=src/core/BrowserCoverage.ts:80-101 rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
   wrong: the first-error-wins accumulator — `let failed = false; let failure: unknown`, a `try`/`catch` per awaited teardown step, then `if (failed) throw failure` — is written out four times inside my slice (`BrowserCoverage.ts:80-101`, `112-136`, `142-166`; `BrowserNetworkManager.ts:165-205`) and appears in `src/` elsewhere (`BrowserContext.ts`, `BrowserClock.ts`). Each copy repeats the same `if (!failed)` ordering rule by hand, and the pair of variables restates one fact — "the first failure, if any" — as a flag beside a value.
   repair: extract one exported async helper in `src/core/helpers.ts` that runs a list of teardown steps and rethrows the first failure after running all of them, and route every site through it. `attempt` from `@orkestrel/contract` cannot serve: its installed declaration is `attempt<T>(callback: () => T): Result<T>`, synchronous only.

9. package=browser file=src/core/CDPClient.ts:131-178 rule=`.claude/rules/architecture.md` § System constraints; `AGENTS.md` § Design laws (Simplification) verdict=CONFIRMED
   wrong: `subscribe` and `unsubscribe` each carry two mirrored branch bodies over two parallel structures — `#subscriptions: Map<string, Set<CDPHandler>>` and `#sessionSubscriptions: Map<string, Map<string, Set<CDPHandler>>>` (lines 39-40) — so the same get-or-create and prune-when-empty logic is written four times for one concept, and `#onMessage` (lines 332-347) reads both.
   repair: hold one `#subscriptions: Map<string | undefined, Map<string, Set<CDPHandler>>>` keyed by session id, with the global scope under the `undefined` key. A `Map` key of `undefined` is the absence of a session, not an invented sentinel, so `AGENTS.md` § Design laws ("Absence is `undefined`") is satisfied. `subscribe`, `unsubscribe`, and the dispatch in `#onMessage` each collapse to one body.

10. package=browser file=src/core/BrowserSelectorManager.ts:57 rule=`.claude/rules/names.md` § General vocabulary ("Describe what a thing is"); `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
    wrong: the method is `test(value)`, but the axis it locates is the test id — `src/core/constants.ts:140` names it `BROWSER_TEST_ID_ATTRIBUTE = 'data-testid'` and documents "the semantic test-id selector". So the concept is spelled `test id` in the constant and `test` in the public API. `test` also reads as a verb among five noun siblings (`css`, `role`, `text`, `label`, `placeholder`), and sits one character from `text(value)`, which locates something else entirely.
    repair: rename the axis to `testid` in `BrowserSelector` (`src/core/types.ts:478`), in `BrowserSelectorManagerInterface` (`src/core/types.ts:567`), in this method, in the compiled in-page switch (`src/core/helpers.ts:2274`), in `guides/browser.md`, and in the tests. `.claude/rules/architecture.md` § Kind purity states the rename repair is the correct cost to pay when the name is what is wrong.

11. package=browser file=src/core/BrowserEmulationManager.ts:15 rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS define reusable and public types in `*/types.ts`"); `.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
    wrong: the constructor of a barrelled class (`src/core/index.ts:14`) declares its first parameter as the anonymous type `() => readonly BrowserPageInterface[]`, repeated on the field at line 12. Every sibling manager takes named interface types (`BrowserFrameInterface`, `CDPClientInterface`, `ScreenshotWriterInterface`), so a consumer reading the published surface meets one unnamed shape with no documentation and no place to state what the callback must return.
    repair: declare `export type BrowserPagesFunction = () => readonly BrowserPageInterface[]` in `src/core/types.ts` beside `BrowserEmulationManagerInterface`, with TSDoc stating that it returns the context's live pages at call time, and use it on the field and the parameter.

12. package=browser file=src/core/BrowserPerformance.ts:35 rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary; `AGENTS.md` § Design laws ("Single-word entity APIs … extract a sub-entity or manager, or split behaviors") verdict=CONFIRMED
    wrong: `start(interval?)`, `stop()`, and `active` name the CPU-profiler lifecycle, but the entity they sit on also serves `metrics()` (line 26), which touches none of that state. `start` means "begin the entity" in the fixed vocabulary, so `performance.start()` reads as starting performance monitoring while it starts a sampling profile — and the class knows it, because its own errors say "Browser CPU profiling is already active" (line 36) and "is not active" (line 60). The qualifier lives in the message rather than in the API. `guides/browser.md:483` describes the same mixed shape, so it is drift the guide records rather than an exception the guide grants.
    repair: extract the profiler as a sub-entity — `BrowserProfilerInterface { readonly active: boolean; start(interval?): Promise<void>; stop(): Promise<BrowserProfile> }` in its own class file — and expose it as `readonly profile: BrowserProfilerInterface` on `BrowserPerformanceInterface`, leaving `metrics()` and `destroy()` on the performance entity. Callers then write `performance.profile.start()`. Update `BrowserDiagnostics`, the barrel, `guides/browser.md`, and the tests in the same change.

13. package=browser file=src/core/CDPClient.ts:74 rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: two TSDoc first sentences are imperative rather than third-person — "Close the transport and re-establish a fresh connection." (line 74) and "Close the transport and reject all pending requests." (line 181). This is the only compact TSDoc-voice finding I raise: the noun-phrase class descriptions across these files match the package-wide convention the convention lane settled, so I leave those alone.
    repair: "Closes the transport and re-establishes a fresh connection." and "Closes the transport and rejects all pending requests."

14. package=browser file=src/core/BrowserNetworkManager.ts:41 rule=`.claude/rules/names.md` § General vocabulary ("Booleans read as assertions") verdict=CONFIRMED
    wrong: `#fetch = false` is a boolean named as a bare noun that is also a CDP domain name, so `if (this.#fetch)` at lines 173 and 293 reads as a test of an object, not of a state. Its sibling flags `#started` and `#destroyed` are past participles.
    repair: rename to `#intercepting` — the fact it records is that `Fetch.enable` is in force for route or credential interception.

15. package=browser file=src/server/transports/WebSocketCDPTransport.ts:45 rule=`AGENTS.md` § Design laws ("One concept, one term"); `.claude/rules/patterns.md` § Options ("Reserve `on` exclusively for initial `EmitterHooks`") verdict=CONFIRMED
    wrong: the stable bound-listener field is `#onSocketClose` here, while the same construct is `#requestHandler`, `#socketCloseHandler`, and their siblings in `BrowserNetworkManager.ts:44-54` and `#bindingHandler` in `BrowserScriptManager.ts:25`. Two forms for one concept, and the `on` prefix is reserved for the initial-hooks option.
    repair: rename to `#socketCloseHandler` and update lines 175 and 183.

## Referrals

Outside my lane. Each is specifically evidenced and carries no verdict from me; route to the objective lane, or to the Orchestrator if no objective lane runs this round.

- `src/core/CDPClient.ts:282-294` — `#onError` clears `#connected` but leaves `#active` true and never closes the transport, unlike `#onClose` (lines 270-280) which clears both. Ask whether a later `connect()` then calls `transport.start()` on a transport that was never closed, and whether `close()` after a transport error takes the `#active` branch at line 247 correctly.
- `src/core/BrowserCoverage.ts:75` — `stop()` sets `#active = false` before issuing any teardown command, so a throwing `#stopJavaScript`/`#stopCSS` leaves Chromium with `Profiler`/`CSS` tracking enabled while `active` reports false and a second `stop()` throws "not active". Ask whether the flag must clear only after teardown settles.
- `src/core/BrowserCookieManager.ts:43-78` — `clear(filter)` reads every cookie, clears all of them, then restores the non-matching ones, and the restored input drops each cookie's originating `url`. Ask whether a cookie set between the read and the clear is lost, and whether domain and path survive the round trip for host-only cookies.

## Clean

`src/core/BrowserTouch.ts` — read in full against every lens in the brief. One-word method on a one-method entity, named interface types, coded error path delegated to `validateBrowserPoint`, no state, no wrapper, no duplication.

No package in this slice is clean.

## Deviation

One ancillary addition, settled under the brief's deviation contract rather than stopping the unit: I added a **Referrals** block after Findings. My role contract requires an out-of-lane observation to leave as a specifically evidenced referral with no verdict attached, and the brief's output shape has no row for one. Nothing was moved out of Findings to make room — each referral is a correctness question, not a rule violation, so none of them would have been a numbered finding.

No other deviation. The diff-free subject (a whole-tree audit, not a change) is what the brief specifies, so no missing-diff deviation applies.