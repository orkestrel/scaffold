# Plan: browser's public API in the ecosystem's shape (reconciled 2026-10-06)

This plan reconciles two blind proposals: `proposal-planner.md` (Opus 5.5, subjective) and `proposal-analyst.md` (GPT-6 Astra, objective). The design brief is `design-brief.md`, and the inputs are `patterns-1.md`, `patterns-2.md`, `browser-1.md`, and `consumers.md`.

The 8 model tools, their copy, and the reading behavior stay as the reading campaign ruled. Only ollama's tests consume this API in code.

§ Rulings names, for each point where the lanes differ, the lane it follows and the reason. The work lands before the ollama harness fix and the measurement, so the harness is rewritten once, and it ships in browser 0.0.27 with the reading change.

## What changes

### Errors (must: the family error shape)

- **The classes:** `BrowserError(code, message, context?)`, with `code: BrowserErrorCode` (a union) and `context: JSONRecord | undefined`. `BrowserStepError` stays, because it carries typed `action` data. Guards: `isBrowserError` and `isBrowserStepError`.
- **Folded into `BrowserError` with a code,** because none carries typed data: `BrowserElementError`, `CDPError`, `CDPConnectionError`, `CDPTimeoutError`, `BrowserResultLimitError`, `BrowserConnectionError`, `BrowserNotConnectedError`, and `BrowserDestroyedError`. `BrowserElementError`'s message moves to a `describeBrowserRefusal(subject, reason, detail?)` helper.
- **The codes,** per the user's ruling E:
  - The catch-all `BROWSER_ERROR` is split by throw site into `ARGUMENT`, `CLOSED`, `PROTOCOL`, and `NAVIGATION`.
  - `CDP_ERROR` → `REMOTE`; `CDP_CONNECTION_ERROR` and `NOT_CONNECTED_ERROR` → `DISCONNECTED`; `CDP_TIMEOUT_ERROR` → `TIMEOUT`.
  - The rest drop their `_ERROR` suffix.
  - Codes that only stop internal work, such as `TOOLSET_SETTLED` and `TOOLSET_RECEIPT`, stay in the union, and the guide marks them internal.
- **Abort and timeout:** they stay as they are: `BrowserCallOptions { signal, timeout }`, rejection with `signal.reason` unwrapped, and no `abort()` method.

### Factories and construction

- **`createBrowserContext(client, options?)`** replaces the documented positional constructor. `BrowserContextOptions` gains `id`, `viewport`, and `writer`, and refuses `proxy` and `origins`, which only `browser.isolate` reads.
- **Classes their owner builds become internal:** `BrowserPage`, `BrowserFrame`, `BrowserJourneyToolset`, and the element classes. Owners keep vending them. The guide's Surface states which classes are internal and why, as `table.md` does.
- **Factories named for their entity:** `createCDPTransport` → `createWebSocketCDPTransport`; `createBrowserWriter` → `createFileBrowserWriter`.
- **One toolset factory:** `createBrowserToolset(view, options?)` serves any view. `createDocumentToolset` and the `page` and `release` options are removed. Page features follow when a structural `isBrowserPage` guard holds for the view. The caller owns the view.
- **`findSystemBrowser` is removed,** because it only wraps `findSystemBrowsers(options)[0]`. Ollama's `tests/setupService.ts` migrates.

### Entity members (must: the fixed vocabulary, one term per concept, no noun-named writers)

- **Toolset:**
  - `perform` → `execute`.
  - `notes()` leaves the contract; the journey toolset gets it through its internal input.
  - `redact`, `read`, `follow`, `hold`, `tabs`, `start`, and `destroy` stay.
- **Clock:** `installed`, `install`, `uninstall` → `active`, `start`, `stop`. `pause`, `resume`, and `advance` stay.
- **HAR:** `recording` → `active`, as tracing, coverage, and profiler already have it.
- **Worker:** `detach` → `destroy`, beside `close`.
- **Handle:** `dispose` → `destroy`.
- **Snapshot:** `walk({ order })` → `depth(options?)` and `breadth(options?)`, and `BrowserWalkOrder` goes.
- **Outline tallies:** `count` and `total` → `listed` (the referenced rows carried) and `found` (the referenced nodes in the tree).
- **Network:** `route` and `unroute` move to a `routes` manager with `add`, `remove`, and `clear`. `headers`, `offline`, and `credentials` merge into one `apply(options: BrowserNetworkOptions)`.
- **Cookies:** `clear(filter?)` splits into `remove(filter)` and `clear()`.
- **Storage:** `state` → `snapshot`.
- **Permissions:** the doc for `clear` reads "Removes", not "Resets".

### Plumbing leaves the public contracts (coherence)

- **Download:** `update` leaves.
- **WebSocket:** the `receive`, `transmit`, `fail`, and `close` drive methods leave.
- **Frame:** `assert`, `update`, and `save` leave.
- **Emulation and recorder:** each `attach` leaves. Emulation reaches a page before `create` resolves, pinned by a test.
- **Owners** drive the internal classes through their constructor inputs, as `table` does with its managers.
- **The page recorder:** `page.recorder` (a `BrowserRecorderInterface`) replaces `page.codegen()`. A script compiles from `compileBrowserJourney(recorder.journey(input), options)`.

### Recorder, journeys, and stores

- **The recorder:** `journey(input: BrowserJourneyInput)`, where `BrowserJourneyInput { name, description }` replaces two inline shapes. `buildBrowserJourney` takes the same input.
- **Journey store writes:** `set(journey, options?: BrowserJourneyWriteOptions)`, with `{ revision?: number; exclusive?: boolean }`.
  - With neither key, the write replaces.
  - `exclusive` requires absence.
  - `revision` requires a match.
  - Both together are refused before writing.
  - The backend enforces the condition atomically. This removes the `expected: 0` sentinel.
- **Listing:** `list(options?: BrowserStorePageOptions)` with `{ offset?, limit?, signal? }`, on both stores.
- **Run store:** `open` → `create` (it always mints a slot), and `snapshot?` → `write?` (it saves a PNG and returns its path). `capture`, `get`, `set`, `delete`, and `clear` stay.

### Options and the browse server

- **`BrowserOptions`:** the top-level `engine` duplicate goes, and `browsers.engine` is its one home.
- **`BrowserWaitUntil`** → `BrowserNavigationCondition`.
- **`BrowserMCPServerOptions`** groups by noun:
  - `browser: { headless, executable, viewport }`;
  - `pool: { size, contexts, launch }`;
  - `journeys: { readonly }`;
  - plus `root`, `stdio`, and `log`.

  The `browse` binary's environment mapping follows. No events are added, because none has a consumer.

### Surface hygiene

- **Dead search:** `scanBrowserOutline`, `scanBrowserText`, `renderBrowserMatches`, and `BrowserReadMatch` are removed. No caller in `src` remains after the reading change, and they are a second search semantics beside `scanBrowserLines`.
- **Byte wrappers:** `textToBytes` and `bytesToText` are removed. Each is a one-line wrapper over `TextEncoder` or `TextDecoder`.
- **Base64:** `encodeBase64` and `decodeBase64` follow the user's ruling B.
- **Private-state types** that each serve one class become inline types on its `#` fields and leave the barrel. Examples: `BrowserNavigationWait`, `BrowserRegistryPending`, `BrowserReadinessWait`, `BrowserToolsetWatch`, and the server's slot and holder shapes.
- **The `surface` policy rule:** rename any other name it reports.
- **Every other pure leaf, guard, parser, compiler, constant, and type stays public,** as the ecosystem publishes the leaves its entities compose.

### The guide

- **The tagline and README pitch name the nouns:** the browser runtime for the line, with a `Browser` that finds, launches, or attaches to Chromium; its contexts and pages; the elements and readings a page yields; and the toolset and journeys that hand a page to an agent.
- **Opening paragraphs:** one sentence per noun, then the faces.
- **Surface:**
  - The entity walk-through comes first.
  - Each face's kind tables become concept tables: context and page; elements and readings; toolset; journeys and stores; the protocol layer last.
  - It opens with which classes are internal and why.
- **Errors:** one table of the two classes, the code union, and the guards.
- **Methods, Contract, Patterns, and Tests** stay. The Contract invariants are rewritten for the changes above.

## What stays, and why

- **`destroy` beside `close`** on the browser, context, and page: `destroy` is a local release and `close` a remote shutdown. Merging them could close a shared browser.
- **The browser's domain verbs:** `connect`, `disconnect`, `discover`, `adopt`, `ping`, and `isolate`.
- **The lookup pairs on the entity:** `context` and `contexts`, `page` and `pages`. That is the family's own form, as workspace's `file`/`files` and database's `table` are.
- **Domain-specific managers:** permissions `grant` and `deny`, emulation `apply`, and the navigation and popup records.
- **`page.registry`, `native`, `follow`, `hold`, and `tabs`.**
- **The toolset's `skip` event,** meaning a page tool intentionally declined.
- **The `language` union and the screenshot `format`,** both data.
- **HAR and WebMCP wire field names,** under the wire-body exemption.
- **The extension seams:** transport, writer, tool source, launch function, reference function, and the stores.
- **The 8 page tools and the 7 journey tools.**

## Rulings on the lanes' differences

| Point | Planner | Analyst | Ruling |
| --- | --- | --- | --- |
| Error classes | Two classes; bare codes | Keep the subclasses; keep the prefixed spellings in a union | **Two classes, bare codes** (user ruling E). The ecosystem uses one class per package with bare unions. Ollama branches on no browser code |
| Low-level construction | Intern owner-built classes; only `createBrowserContext` | Add factories for page, codegen, element managers, and journey toolset | **Intern.** No consumer constructs them, and a factory is created with its first real consumer |
| Document toolset | Remove; `createBrowserToolset(view)` | Rename to `createBrowserDocumentToolset` | **Remove.** One factory for any view; the DOM view composes |
| Managers | Routes manager, network `apply`, cookies `remove`, storage `snapshot`, clock and HAR `active`, worker `destroy` | Keep the managers as they are | **Planner.** Each change answers a naming law: noun-named writers, compound verb pairs, one term per concept |
| Plumbing members | Leave the contracts | Not raised | **Planner** (`architecture.md`: a class exposes its interface; owner-only members are not the interface) |
| Journey store condition | `expected` in options | `revision` and `exclusive` | **Analyst.** It removes the `0` sentinel (`AGENTS.md` § Absence) |
| Run store slot | `create` | `allocate` | **`create`,** the family's verb for a registry that always mints |
| Run store image | `write?` | `snapshot?` kept | **`write?`.** `snapshot` means a plain copy of a live entity in the family |
| Recorder | `journey(input)`; `started` kept | `snapshot(options)`; `recording` | **Planner,** with less churn. `journey(input)` reads as what it returns |
| Snapshot traversal | Not raised | `depth` and `breadth` | **Analyst,** under the split-behavioral-variants law |
| Handle teardown | Not raised | `destroy` | **Analyst,** the fixed teardown verb |
| `findSystemBrowser` | Kept | Removed | **Analyst,** under the wrapper law. Ollama migrates one call |
| MCP options | `browser`, `pool`, and `journeys` groups | A `browser` group, plus events | **Planner's groups, no events,** because no consumer reads them |
| Dead search and byte wrappers | Removed | Not raised | **Planner** |
| Private-state types | Inline them | Keep | **Inline** (`AGENTS.md`: only reusable and public types live in `types.ts`) |
| Release | Separate 0.0.28 | Not raised | **In 0.0.27,** before the harness fix and the measurement, as the campaign's order states |

## The user's rulings (2026-10-06)

- **The plan is approved.**
- **E: bare codes.** `BrowserErrorCode` drops the `BROWSER_` prefix. MCP and command-line error text changes with it; page tool results carry the message only.
- **B: reuse `@orkestrel/codec`.**
  - Browser declares `@orkestrel/codec` as a dependency, which is the user's explicit approval of the dependency, and imports its base64 functions.
  - Browser's own `encodeBase64`, `decodeBase64`, `BASE64_CHARS`, and `BASE64_LOOKUP` are removed.
  - Codec's decoder returns `undefined` on refusal where browser's was tolerant, so each call site handles that refusal.
  - The Orchestrator installs the dependency; no unit installs.

**Routing change:** the approved plan fixes the API shape, so the contract types are mechanical-precision work and go to Astra with each slice. The units run as vertical slices, each types-first within itself and green at its end:
1. errors;
2. construction and the toolset;
3. plumbing, the recorder, the managers, and the stores;
4. hygiene, with codec;
5. the guide.

The Orchestrator commits each slice. Opus reviews the names and voice in F.

## Units

The browser units run in series in one checkout, starting at `51cf268`. The Astra units run their own commands. The Orchestrator commits each green checkpoint.

| Unit | Engine | Owns | Acceptance |
| --- | --- | --- | --- |
| A1 contract | Opus (edits); the Orchestrator runs `check` | browser `src/*/types.ts`, `BrowserErrorCode` | Every signature declared; `check` diagnostics only in later units' files |
| A2 errors | Astra | `src/*/errors.ts`, every throw site, `describeBrowserRefusal`, error and code tests | Two classes and two guards; no `BROWSER_` literal left; every catch-all mapping listed; `test:src`, `check` |
| A3 construction and toolset | Astra | factories, `BrowserContext.ts`, `BrowserToolset.ts`, `src/browser/factories.ts`, `BrowserMCPServer.ts` options, `src/bin/main.ts`, `isBrowserPage` | `createBrowserContext`; one toolset factory working in both placements; renamed factories; `execute`; `test:src`, `test:src:bin`, `check` |
| A4 plumbing and recorder | Astra | page, frame, download, WebSocket, emulation, codegen and recorder, journey toolset, `tests/guides.test.ts` internals | No interface member only its owner calls; emulation ordering pinned; `page.recorder` records as `codegen()` did |
| A5 managers and stores | Astra | network and routes, cookies, storage, clock, HAR, worker, handle, snapshot traversal, outline tallies, both stores, ollama `tests/setupStore.test.ts` and `tests/setupService.ts` | One test per renamed member; journey write conditions against real stores, including the races; ollama `test:setup` |
| A6 hygiene | Astra | dead search, byte wrappers, base64 per ruling B, inline private types, `surface` names | `test:policy` clean; no dead export; `check` |
| A7 guide | Astra for parity iteration; Opus reviews the voice in F | `guides/browser.md`, `README.md`, doc blocks | `test:guides` green; restructure as stated; prose re-read against what shipped |
| F audit | Opus lanes | read-only | One falsify round on A1 to A7 |
