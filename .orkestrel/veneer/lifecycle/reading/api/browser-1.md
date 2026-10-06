<!-- Grok 4.7 High, 2026-10-06, session 09c1dfdb, journal scaffold tmp/cursor/api-browser.jsonl, 396 s -->

# Slice 1 — entities and their shape

Checkout `51cf268` (`51cf268acac9d9f9c901f0da00cc73a673fd5d98`). `patterns-2.md` is present and covers surface hygiene; this slice uses `patterns-1.md` plus `names.md` and `architecture.md`. Package entries are `.`, `./server`, and `./browser` (`package.json:35-60`), which re-export `src/core/index.ts`, `src/server/index.ts`, and `src/browser/index.ts`. The guide’s Surface factories and classes are `guides/browser.md:97-105`, `:1319-1325`, `:1342-1348`, `:1582-1597`; Methods begins at `:1713`.

A `†` marks a member whose name is more than one word. No method on a barrel interface is more than one word.

## Primary entities

`createBrowser(options?)` → `BrowserInterface` (`src/server/factories.ts:41`, `src/server/types.ts:237`). Options: `BrowserOptions` (`:175-188`). Data: `endpoint`, `emitter`, `engine`, `status`, `connection`, `owned`, `pid`. Methods: `ping`, `discover`, `connect`, `adopt`, `disconnect`, `context`, `contexts`, `isolate`, `create`, `destroy`, `close`. Events `BrowserEventMap` (`:141-151`): `idle`, `discover`, `connect`, `disconnect`, `launch`, `page`, `context`, `error`, `destroy`. `status` is `'idle' | 'connecting' | 'connected' | 'disconnected' | 'error'` (`:25`).

`BrowserContext` has no factory. `browser.context` / `contexts` / `isolate` vend it (`:289-296`); the constructor is positional (`src/core/BrowserContext.ts:77`). `BrowserContextInterface` (`src/core/types.ts:3481`). Data: `emitter`, `id`, `disposal`, `cookies`, `permissions`, `storage`, `emulation`. Methods: `page`, `pages`, `create`, `sync`, `destroy`, `close`. Events (`:1619-1621`): `page`, `close`.

`BrowserPage` has no factory. `browser.create` and `context.create` take `BrowserPageOptions` (`src/server/types.ts:298`, `src/core/types.ts:3495`, options `:226`). Constructor is positional CDP ids (`src/core/BrowserPage.ts:290`). `BrowserPageInterface` (`src/core/types.ts:3405`) extends `BrowserFrameInterface` (`:3149`) and `BrowserViewInterface` (`:2716`). Own data: `elements`, `trusted` (`true`), `keyboard`, `mouse`, `touch`, `emitter`, `registry`, `network`, `navigation`, `popups`, `scripts`, `accessibility`, `diagnostics`, `clock`, `opener`, `target`, `closed`. Own methods: `wait`, `navigate`, `reload`, `back`, `forward`, `screenshot`, `pdf`, `frame`, `frames`, `snapshot`, `codegen`, `destroy`, `close`. Inherited frame methods: `title`, `read`, `evaluate`, `handle`, `send`, `subscribe`, `unsubscribe`, `save`, `assert`, `update`. Inherited view data/methods: `url`, `elements`, optional `emitter`, optional `screenshot`, `title`, `read`, `wait`. Events `BrowserPageEventMap` (`:1073-1090`): `navigate`, `session`, `attach`, `detach`, `popup`, `dialog`, `chooser`, `download`, `console`, `error`, `crash`, `worker`, `request`, `response`, `failure`, `socket`, `close`.

`createBrowserToolset(page, options?)` and `createDocumentToolset(options)` both return `BrowserToolsetInterface` (`src/core/factories.ts:155`, `src/browser/factories.ts:62`). Options: `BrowserToolsetOptions` (`src/core/types.ts:2938`) and `BrowserDocumentToolsetOptions` (`src/browser/types.ts:38`). Data: `emitter`, `tools`, `native`, `view`, `limit`, `held`. Methods: `redact`, `notes`, `read`, `perform`, `follow`, `tabs`, `hold`, `start`, `destroy`. Events (`src/core/types.ts:2907-2914`): `adopt`, `skip`, `select`, `action`, `hold`, `release`.

`BrowserJourneyToolset` has no factory. `new BrowserJourneyToolset(toolset, options)` (`src/core/BrowserJourneyToolset.ts:109`); `BrowserToolset` also constructs it (`src/core/BrowserToolset.ts:314`). Options: `BrowserJourneyOptions` (`src/core/types.ts:2188`). `BrowserJourneyToolsetInterface` (`:2202`): data `recording`, `replaying`; method `destroy`. No events.

Element managers implement `BrowserElementManagerInterface` (`:2672`). `page.elements` is `BrowserElementManager` (`src/core/elements/BrowserElementManager.ts:71`, input `BrowserElementManagerInput` `:2577`). `createBrowserDOMView` builds `BrowserDOMElementManager` (`src/browser/factories.ts:29`, `src/browser/elements/BrowserDOMElementManager.ts:99`). Methods: `outline`, `find`, `wait`, `element`, `elements`, `clear`. No events. Elements: `BrowserElementInterface` (`src/core/types.ts:2611`) data `reference`, `role`, `name`; methods `click`, `fill`, `select`, `focus`, `read`, `submit`. `BrowserPageElementInterface` (`:2648`) adds `frame` and `hover`, `press`, `upload`, `drag`, `quad`, `screenshot`. `BrowserDOMElementInterface` adds nothing (`src/browser/types.ts:67`). `BrowserDOMViewInterface` (`:70`) is the view plus `destroy`; `trusted` is `false` (`src/browser/BrowserDOMView.ts:86-87`). Events on the view, when present: `console`, `error` (`src/core/types.ts:2703-2706`).

`createBrowserRecorder(toolset, options?)` → `BrowserRecorderInterface` (`src/core/factories.ts:171`, `src/core/types.ts:1807`). Options: `BrowserRecorderOptions` (`:1840`) keys `on`, `error`. Data: `emitter`, `started`. Methods: `start`, `stop`, `steps`, `journey`, `clear`, `destroy`. `journey` takes an inline `{ name, description }` (`:1826`). Events (`:1793-1797`): `start`, `step`, `stop`, `clear`. `page.codegen` returns `BrowserCodegenInterface` (`:3458`), which adds `attach` and `script` (`:2228-2236`). `script` takes an inline `{ name, description, language? }`. The class constructor is separate (`src/core/recorders/BrowserCodegen.ts:67`).

`createBrowserReplay(toolset, revision, options?)` → `BrowserReplayInterface` (`src/core/factories.ts:187`, `src/core/types.ts:2023`). Options: `BrowserReplayOptions` (`:2002`) keys `on`, `error`, `inputs`, `runs`. Data: `emitter`. Method: `execute`. Event (`:2015`): `step`.

Stores. `createMemoryBrowserJourneyStore()` and `createFileBrowserJourneyStore({ root, limit? })` → `BrowserJourneyStoreInterface` (`src/core/factories.ts:202`, `src/server/factories.ts:72`, `src/core/types.ts:2077`). Methods: `get`, `set`, `delete`, `list`. No data, no events. `createMemoryBrowserRunStore()` and `createFileBrowserRunStore(options)` → `BrowserRunStoreInterface` (`src/core/factories.ts:213`, `src/server/factories.ts:85`, `src/core/types.ts:2127`). Methods: optional `snapshot`, `open`, `get`, `set`, `capture`, `delete`, `clear`, `list`. No events. `FileBrowserStore` is a class (`src/server/stores/FileBrowserStore.ts:24`) that `src/server/index.ts` does not export. Constructor takes `FileBrowserStoreOptions` (`:28`). Methods: `validateName`†, `validateId`†, `resolvePath`†, `check`, `createDirectory`†, `read`, `write`, `remove`, `lock`, `list`, `allocate`, `translateError`†. No interface (`guides/browser.md:1723`).

`createBrowserMCPServer(options?)` → `BrowserMCPServerInterface` (`src/server/factories.ts:107`, `src/server/types.ts:464`). Options: `BrowserMCPServerOptions` (`:427`). Methods: `start`, `destroy`. No data, no events. Server tool names (`:440`): `acquire`, `execute`, `tools`, `destroy`.

## Other classes

Each row is the construction a consumer actually has, then the interface methods. “Parent” means the parent builds it; the class is still exported from its barrel, so the constructor is callable.

| Class | Construction | Interface members | Events |
| --- | --- | --- | --- |
| `CDPClient` | `createCDPClient` (`src/core/factories.ts:41`); `CDPClientOptions` `transport`, `timeout?`, `on?`, `error?` (`src/core/types.ts:85`) | `emitter`, `connected`; `connect`, `reconnect`, `send`, `subscribe`, `unsubscribe`, `close` (`:138`) | `connect`, `close`, `drop`, `error` (`:64`) |
| `WebSocketCDPTransport` / `SocketCDPTransport` | `createCDPTransport` (`src/server/factories.ts:51`); `createSocketCDPTransport` (`src/browser/factories.ts:99`) | `CDPTransportInterface`: `emitter`; `start`, `send`, `close` (`src/core/types.ts:39`) | `message`, `close`, `error` (`:23`) |
| `FileBrowserWriter` | `createBrowserWriter()` (`src/server/factories.ts:61`) | `write` (`src/core/types.ts:196`) | none |
| `BrowserSnapshot` | `createBrowserSnapshot(input)` (`src/core/factories.ts:59`); also `page.snapshot` | `documents`, `styles`; `walk`, `descendants`, `document`, `children`, `parent`, `siblings`, `ancestors`, `common`, `distance`, `find`, `filter`, `closest`, `path` (`:3291`) | none |
| `BrowserReading` | `createBrowserReading(input)` (`src/core/factories.ts:85`) | `url`, `title`, `html`, `stale`; `markdown`, `text` (`:2376`) | none |
| `BrowserRegistry` | `page.registry` | `emitter`; `start`, `tool`, `tools`, `adopt`, `execute`, `destroy` (`:2804`) | `change`, `invoke`, `respond` (`:2791`) |
| `BrowserNetworkManager` | `page.network` | `emitter`, `har`; `start`, `body`, `text`, `json`, `route`, `unroute`, `headers`, `offline`, `credentials`, `destroy` (`:1393`) | `request`, `response`, `failure`, `finish`, `socket` (`:1203`) |
| `BrowserHARManager` | `network.har` | `recording`; `start`, `stop`, `replay`, `clear` (`:1380`) | none |
| `BrowserNavigationManager` | `page.navigation` | `wait`, `idle`, `record` (`:279`) | none on the interface |
| `BrowserNavigationRecord` | `navigation.record` (`:294`); class `src/core/BrowserNavigationRecord.ts:33` | `wait`, `settle`, `destroy` (`:308`) | none |
| `BrowserPopupManager` / `BrowserPopupRecord` | `page.popups`; no class (`guides/browser.md:1724`) | manager: `record` (`:330`); record: `settle`, `destroy` (`:352`) | none |
| `BrowserScriptManager` | `page.scripts` | `add`, `remove`, `expose`, `revoke`, `destroy` (`:567`) | none |
| `BrowserCookieManager` | `context.cookies` | `cookies`, `set`, `clear` (`:1465`) | none |
| `BrowserPermissionManager` | `context.permissions` | `grant`, `deny`, `clear` (`:1475`) | none |
| `BrowserStorageManager` | `context.storage` | `state`, `restore`, `clear` (`:1509`) | none |
| `BrowserEmulationManager` | `context.emulation` | `apply`, `clear`, `attach` (`:1573`) | none |
| `BrowserKeyboard` / `Mouse` / `Touch` | `page.keyboard`, `.mouse`, `.touch` | keyboard `down`, `up`, `press`, `type`, `insert` (`:848`); mouse `move`, `down`, `up`, `click`, `drag`, `wheel` (`:869`); touch `tap` (`:888`) | none |
| `BrowserDiagnostics` | `page.diagnostics` | `tracing`, `coverage`, `performance`, `profiler`; `destroy` (`:782`) | none |
| `BrowserTracing` / `Coverage` / `Profiler` | those properties | each: `active`; `start`, `stop`, `destroy` (`:644`, `:704`, `:766`) | none |
| `BrowserPerformance` | `diagnostics.performance` | `metrics` (`:760`) | none |
| `BrowserClock` | `page.clock` | `installed`; `install`, `pause`, `resume`, `advance`, `uninstall` (`:794`) | none |
| `BrowserAccessibility` | `page.accessibility` | `snapshot` (`:616`) | none |
| `BrowserFrame` | `page.frame` / `frames`; constructor positional (`src/core/BrowserFrame.ts:50`) | see frame members above | none |
| `BrowserDialog` | `page` event `dialog` | `category`, `message`, `default`; `accept`, `dismiss` (`:949`) | none |
| `BrowserFileChooser` | event `chooser` | `multiple`; `upload`, `dismiss` (`:963`) | none |
| `BrowserDownload` | event `download` | `emitter`, `id`, `url`, `name`, `status`, `received`, `total`, `path`; `abort`, `update` (`:1008`) | `progress`, `complete`, `abort` (`:978`) |
| `BrowserWorker` | event `worker` | `id`, `url`, `category`; `evaluate`, `send`, `detach`, `close` (`:1054`) | none |
| `BrowserWebSocket` | event `socket` | `emitter`, `id`, `url`; `receive`, `transmit`, `fail`, `close` (`:1188`) | `receive`, `transmit`, `error`, `close` (`:1172`) |
| `BrowserRoute` | argument of `network.route` | `id`, `request`, `handled`; `abort`, `continue`, `fulfill` (`:1235`) | none |
| `BrowserHandle` | `frame.handle` | `id`; `value`, `call`, `property`, `properties`, `dispose` (`:534`) | none |
| `BrowserHold` | `toolset.hold` | `token`, `name`; `destroy` (`:1927`) | none |
| `BrowserTransition` | `new BrowserTransition()` (`src/core/BrowserTransition.ts:24`); no factory | `pending`; `execute` (`src/core/types.ts:177`) | none |
| `BrowserDOMWait` | constructor `BrowserMutationWait` (`src/browser/BrowserDOMWait.ts:58`) | `roots`; `execute` (`src/browser/types.ts:141`) | none |

Error classes, not entities: `BrowserError`, `BrowserElementError`, `BrowserStepError`, `CDPError`, `CDPConnectionError`, `CDPTimeoutError`, `BrowserResultLimitError`, `BrowserConnectionError` (`src/core/errors.ts:13-202`); `BrowserNotConnectedError`, `BrowserDestroyedError` (`src/server/errors.ts:10-21`).

## Managers beside the shared verbs

Shared set (`patterns-1.md:96-108`): `add`, `remove`, `clear`, `has`, noun/nouns, `count`, `snapshot`, `destroy`. Stores: `get` / `set` / `delete` (`:105`). Registries with a current member: `active` / `switch` (`:107`).

| Property | Verbs it has from that set | It does not have |
| --- | --- | --- |
| `page.elements` | `element` / `elements`, `clear` | `add`, `remove`, `has`, `count`, `snapshot`, `destroy` |
| `page.scripts` | `add`, `remove`, `destroy` | `clear`, `has`, `script` / `scripts`, `count`, `snapshot` |
| `context.cookies` | `clear` | `add`, `remove`, `has`, `cookie`, `count`, `snapshot`, `destroy`; the list is `cookies()`, the write is `set` (`src/core/types.ts:1467-1471`) |
| `context.permissions` | `clear` | `add`, `remove`, `has`, noun pair, `count`, `snapshot`, `destroy`; writes are `grant` / `deny` (`:1477-1481`). The `clear` remark says “Resets” (`:1480`) |
| `context.storage` | `clear` | the rest; reads are `state` / `restore` (`:1511-1515`) |
| `context.emulation` | `clear` | the rest; the write is `apply` (`:1577-1581`) |
| `page.navigation`, `page.popups` | none | the whole set; they open a `record` |
| `page.network` | `destroy` | the rest; child `har` has `clear` and no `destroy` (`:1389`) |
| `page.registry` | `tool` / `tools`, `destroy` | `add`, `remove`, `clear`, `has`, `count`, `snapshot`; it also has `execute` (`:2815`) |
| `browser` contexts | `context` / `contexts`, `destroy` | `add`, `remove`, `clear`, `has`, `count`, `snapshot`; a new context is `isolate` (`src/server/types.ts:296`) |
| `context` pages | `page` / `pages`, `destroy` | `add`, `remove`, `clear`, `has`, `count`, `snapshot`; a new page is `create` (`src/core/types.ts:3495`) |
| `toolset.tools` | borrowed `ToolManagerInterface` (`src/core/types.ts:3007`) | the manager is `@orkestrel/tool`, not this package |
| journey store | `get`, `set`, `delete` | `clear`, and no noun pair; the list is `list` |
| run store | `get`, `set`, `delete`, `clear`; optional method `snapshot` (`:2135`) | noun pair; `snapshot` is a method, not a property |

No manager exposes `count`. `BrowserOutline` exposes both `count` and `total` (`src/core/types.ts:2462-2463`): `total` counts referenced nodes, `count` counts those kept under the limit (`src/core/helpers.ts:408-409`, `:515-517`). No browser registry has `active` or `switch`. `open` / `save` do not appear on these managers. Run-store `open` mints a run slot (`src/core/types.ts:2137`).

## Options

Creation options are flat one-word keys, with grouped entity nouns whose leaves are one word.

- `BrowserOptions`: `on`, `error`, `headless`, `executable`, `profile`, `cdp`, `timeout`, `viewport`, `signal`, `args`, `engine`, `browsers` (`src/server/types.ts:175-188`). `cdp` leaves: `port`, `host`, `endpoint`, `discover` (`:118-123`). `browsers` leaves: `env`, `paths`, `names`, `stores`, `engine` (`:64-70`).
- `BrowserMCPServerOptions`: `root`, `headless`, `executable`, `viewport`, `readonly`, `launch`, `stdio`, `pool`, `log` (`:427-437`). `pool` leaves: `size`, `contexts`. `readonly` is a boolean.
- `BrowserContextOptions`: `reference`, `on`, `error`, `proxy`, `origins`, `downloads`, `emulation` (`src/core/types.ts:1607-1616`).
- `BrowserEmulationOptions`: `viewport`, `user`, `locale`, `timezone`, `geolocation`, `media`, `offline`, `headers`, `credentials` (`:1557-1567`).
- `BrowserToolsetOptions`: `notes`, `on`, `error`, `tools`, `page`, `source`, `context`, `limit`, `schemes`, `release`, `journeys` (`:2938-2950`).
- `BrowserJourneyOptions`: `store`, `runs`, `limit`, `readonly` (`:2188-2192`). `readonly` is a boolean.
- `BrowserPageOptions`: `on`, `error`, `url`, `viewport`, `timeout` (`:226`).
- `BrowserRecorderOptions` / `BrowserReplayOptions`: `on`, `error`, plus replay `inputs`, `runs`.

No prefixed key such as a flattened `cdpPort`. `BrowserRecorder.journey` and `BrowserCodegen.script` take inline object types, not `{Entity}Options` (`:1826`, `:2232`).

Behavior-selecting strings: `BrowserNavigationOptions.condition` is `BrowserWaitUntil`: `'commit' | 'load' | 'domcontentloaded' | 'idle'` (`:214`, `:243-244`). `script`’s `language` is `'javascript' | 'typescript'` (`:2212`, `:2232-2235`). `BrowserScreenshotOptions.format` is `'png' | 'jpeg'` (`:503`), one capture with two encodings. `BrowserWalkOptions.order` is `'depth' | 'breadth'` (`:3269`). `BrowserMedia` unions quote CSS media features, including `'no-preference'` (`:1531-1546`). `BrowserWorkerCategory` includes `'service_worker'` (`:1051`). `BrowserDialogCategory` includes `'beforeunload'` (`:946`).

`†` data, named as wire: HAR 1.2 fields `httpOnly`, `mimeType`, `httpVersion`, `queryString`, `postData`, `headersSize`, `bodySize`, `statusText`, `redirectURL`, `startedDateTime` (`:1276-1278`, `:1284-1341`). WebMCP annotation `readOnly`, `untrustedContent` (`:2749-2752`). The cookie domain type uses `http`, not `httpOnly` (`:1436`).

## Lifecycle verbs

Fixed verbs (`names.md:222-234`): `start`, `stop`, `pause`, `resume`, `skip`, `abort`, `clear`, `destroy`, `execute`. No `cancel`, `reset`, or `run`.

| Verb | Where it is a method |
| --- | --- |
| `start` | transport (`src/core/types.ts:42`), tracing `:650`, coverage `:710`, profiler `:771`, network `:1397`, HAR `:1383`, registry `:2807`, toolset `:3067`, recorder `:1811`, MCP server (`src/server/types.ts:471`) |
| `stop` | tracing `:655`, coverage `:712`, profiler `:773`, HAR `:1385`, recorder `:1813` |
| `pause` / `resume` | clock only (`:799-801`) |
| `skip` | not a method; toolset event `skip` means a page tool was declined (`:2901`, `:2909`) |
| `abort` | `download.abort` (`:1021`), `route.abort` (`:1240`); also a download event (`:981`) |
| `clear` | elements `:2699`, recorder `:1828`, HAR `:1389` (drops entries and does not end the recording), cookies `:1471`, permissions `:1481`, storage `:1515`, emulation `:1579`, run store `:2167` |
| `destroy` | browser, context, page, toolset, journey toolset, registry, network, scripts, recorder, MCP server, diagnostics, tracing, coverage, profiler, navigation record, popup record, hold, DOM view |
| `execute` | replay `:2030`, registry `:2815`, `BrowserTransition` `:183`, `BrowserDOMWait` (`src/browser/types.ts:148`) |

Also present, outside that table: `close` on browser (`src/server/types.ts:318`), context (`src/core/types.ts:3511`), page (`:3462`), transport (`:49`), client (`:160`), worker (`:1069`), websocket (`:1199`); `connect` / `disconnect` / `discover` / `adopt` on the browser (`src/server/types.ts:272-287`); `reconnect` on the client (`src/core/types.ts:144`); `install` / `uninstall` on the clock (`:797`, `:807`). `Browser.destroy` tears down locally and `Browser.close` shuts the remote browser down (`src/server/types.ts:299-318`); the page and context split the same way (`src/core/types.ts:3459-3462`, `:3503-3511`).

## Deviations

| Browser | Pattern |
| --- | --- |
| `close` is a second teardown beside `destroy` on browser, context, page, transport, and client (`src/server/types.ts:309-318`, `src/core/types.ts:49`, `:160`, `:3460-3462`, `:3507-3511`) | `stop` ends permanently and `destroy` tears down (`names.md:225-231`). Database already uses `open` / `close` instead (`patterns-1.md:40`, `:117`) |
| Browser lifecycle methods include `connect`, `disconnect`, `discover`, `adopt` (`src/server/types.ts:272-287`). Clock uses `install` / `uninstall` (`src/core/types.ts:797`, `:807`) | The fixed verb list (`names.md:222-232`) |
| No `abort()` on `Browser`, page, or toolset. A call takes `signal` (`src/core/types.ts:2744-2746`). `abort` exists on a download and a route (`:1021`, `:1240`) | `abort` cancels through a signal, as a method (`names.md:229`; `patterns-1.md:109`) |
| Toolset event `skip` is a declined page tool (`src/core/types.ts:2901`) | `skip` means mark intentionally unexecuted (`names.md:228`) |
| Permission `clear` is documented as “Resets” (`src/core/types.ts:1480`) | `reset` is a rejected synonym (`names.md:234`) |
| `BrowserStatus` is `idle` / `connecting` / `connected` / `disconnected` / `error` (`src/server/types.ts:25`). Download status is `pending` / `complete` / `aborted` (`src/core/types.ts:975`). Run outcome is `complete` / `stopped` / `aborted` (`:1900`) | The other packages’ status unions differ from each other (`patterns-1.md:117`) |
| Context pages and browser contexts use `create` and `isolate`, not `add` (`src/core/types.ts:3495`, `src/server/types.ts:296`). They have noun/nouns and `destroy`, and no `remove`, `clear`, `has`, `count`, or `snapshot` | Registry `add` / `remove` / `clear` / `count` (`patterns-1.md:96-100`, `:108`). Scope uses `create` because it never overwrites (`patterns-1.md:24`, `:113`); these two mint as well |
| Cookies write with `set` and list with `cookies()` (`src/core/types.ts:1467-1469`). Permissions use `grant` / `deny` (`:1477-1479`). Scripts have `add` / `remove` and no `script` / `scripts` (`:569-571`) | `add`, and the noun/nouns pair (`patterns-1.md:96`, `:99`). Accessors are bare nouns, never `set*` (`names.md:116`); stores are the exception that uses `set` (`patterns-1.md:105`) |
| Element manager has `element` / `elements` and `clear` only (`src/core/types.ts:2695-2699`) | The shared manager set (`patterns-1.md:96-108`) |
| `BrowserOutline.count` and `.total` are two tallies of referenced elements (`src/core/types.ts:2462-2463`, `src/core/helpers.ts:408-409`) | A lone tally is `count`; several tallies each get their own fact name (`names.md:206-208`) |
| Journey store has `get` / `set` / `delete` / `list` and no `clear` (`src/core/types.ts:2083-2108`). Run-store `snapshot` is an optional method (`:2135`) | Store `get` / `set` / `delete` matches (`patterns-1.md:105`). `snapshot` elsewhere is a plain JSON property of the live entity (`:104`) |
| `BrowserReplay` has `execute` only (`:2030`) | `execute` matches the runner verb (`patterns-1.md:77`, `:121`). The workflow runner also has `abort`, `pause`, `resume`, `stop`, `destroy` (`:79`) |
| `createDocumentToolset` returns `BrowserToolsetInterface` (`src/browser/factories.ts:62-64`) | A factory is `create{Entity}` for that entity (`names.md:176`; `patterns-1.md:95`) |
| `journey` and `script` take inline `{ name, description }` (`src/core/types.ts:1826`, `:2232`) | Options types are `{Entity}Options` (`names.md:156`) |
| `condition: BrowserWaitUntil` selects the load stage, and one value is `domcontentloaded` (`:214`, `:243-244`) | A value that selects a different action is split into its own function (`names.md:67-75`). Events and option keys are one word (`:27-31`) |
| HAR and WebMCP fields above are more than one word, with remarks that name HAR 1.2 and the WebMCP annotation (`:1276-1278`, `:2749`) | One-word members (`names.md:27`), with the wire-body exception (`:120-123`) |

Journey and run stores match the store trio `get` / `set` / `delete` (`patterns-1.md:105`). `BrowserToolsetOptions.journeys` and `BrowserOptions.cdp` / `.browsers` / `BrowserMCPServerOptions.pool` match grouped option nouns (`names.md:30`, `:41-49`). `headless`, `discover`, and `readonly` are booleans (`names.md:119`).

## Unknowns

`BrowserNavigationEventMap` (`src/core/types.ts:444-453`) is not a member of `BrowserNavigationManagerInterface` (`:279`). It is the `steps` emitter on `BrowserElementManagerInput` (`:2579`), a construction input.

These interfaces take `on` and `error` and pass them to an emitter (`src/server/Browser.ts:103-107` for the browser). They do not say whether a listener throw is isolated as `(error, event)`. `BrowserEventMap.error` carries one `unknown` (`src/server/types.ts:149`).

`FileBrowserStore` is exported from its file and omitted from `src/server/index.ts` and from `package.json` `exports` (`:35-60`). Its two-word methods are not on a package entry.