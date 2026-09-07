# Report — `d7n-router-prep`

Wall clock: 2026-09-07T15:38:54Z (first command) to 2026-09-07T15:42:56Z (last gate) in `/home/user/fleet/router`.

## Item 1 — `repair --offline`

```text
0 of 46 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 12.
tsconfig.json replaced (3 lines added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 38 unchanged, 0 removed in ..
```

`git status --short` after:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P21 list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

```diff
@@ methods loop @@
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
 					expect(extra).toEqual([])
 				})

@@ examples case @@
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])

@@ examples loop @@
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					...
 					const examples =
 						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+							? source.examples(group.interface).map((example) => example.name)
+							: source
+									.examples(group.interface)
+									.map((example) => example.name)
+									.concat(source.examples(entity).map((example) => example.name))
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
```

The import-walk `findMissing(names, surface)` assertion (`statement.names` against `face.surface().map(...)`) was already string-to-string and stays unchanged. No other change to the suite.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1, before any fix, printed 19 diagnostics across `tests/setupServer.ts`, `tests/setupBrowser.ts`, `src/browser/types.ts`, `src/core/helpers.ts`, and `tests/setup.ts`. Every hit and its fix:

**`tests/setupServer.ts`** (`policy/no-malformed-summary`, seven sites):
- line 13: `/** The workspace root, anchored from this setup file's own location. */` → `/** Names the workspace root, anchored from this setup file's own location. */`
- line 16: `/** A running test server bound to an ephemeral port, with its base \`url\` and a \`close\` teardown. */` → `/** Represents a running test server bound to an ephemeral port, with its base \`url\` and a \`close\` teardown. */`
- line 23: `/** A paused real HTTP response and the request/server resources that own it. */` → `/** Represents a paused real HTTP response and the request/server resources that own it. */`
- line 30: `/** Listener totals at the \`sendResponse\` backpressure race seams. */` → `/** Records listener totals at the \`sendResponse\` backpressure race seams. */`
- line 37: `Start a real \`node:http\` server on an ephemeral port for a test.` → `Starts a real \`node:http\` server on an ephemeral port for a test.`
- line 70: `Request a real fixture server response and pause its client-side body.` → `Requests a real fixture server response and pauses its client-side body.`
- line 97: `Count listeners installed on the response events used by pressure waits.` → `Counts listeners installed on the response events used by pressure waits.`

**`tests/setupBrowser.ts`** (`policy/no-malformed-summary`, one site carrying two diagnostics):
- line 11: `Destroy and forget every tracked navigator, so no \`hashchange\` / \`popstate\`` → `Destroys and forgets every tracked navigator, so no \`hashchange\` / \`popstate\``
- line 22: `Reset \`location.hash\` to empty and let a pending ASYNC \`hashchange\` flush` → `Resets \`location.hash\` to empty and lets a pending ASYNC \`hashchange\` flush`
- line 32: `Set \`location.hash\` and let its ASYNC \`hashchange\` flush (a macrotask)` → `Sets \`location.hash\` and lets its ASYNC \`hashchange\` flush (a macrotask)`
- line 44: `Reset \`history\` state to a plain root pathname (through \`replaceState\`) — the` → `Resets \`history\` state to a plain root pathname (through \`replaceState\`) — the`
- line 56: `Build a synthetic same-origin \`<a>\` element (attached to \`document.body\`` → `Builds a synthetic same-origin \`<a>\` element (attached to \`document.body\``
- line 78: two diagnostics — verb-ending and "State what the symbol does without naming click in the first sentence" (the documented symbol is `click`). `Dispatch a real, bubbling, cancelable left-click \`MouseEvent\` on a node — the click-interception test fixture, so a case can assert` → `Dispatches a real, bubbling, cancelable \`MouseEvent\` for the primary button on a node — the interception test fixture, so a case can assert` (removed the literal word "click" from the first sentence, kept the primary-button-click fact)
- line 113: `Dispatch a real click through {@link click} while guaranteeing the iframe can` → `Dispatches a real click through {@link click} while guaranteeing the iframe can`

**`src/browser/types.ts`** (`policy/no-banned-term`, one site — a doc block under `src/**`):
- line 105: `- \`active\` — the currently-resolved {@link RouterMatch}, or \`undefined\`` → `- \`active\` — the resolved {@link RouterMatch}, or \`undefined\`` (substitution-table row `currently, now` → delete)

**`src/core/helpers.ts`** (`policy/no-malformed-summary`, one site — a doc block under `src/**`):
- line 173: `URL-decodes one captured param value, tolerating a malformed percent-escape —` → `Decodes one captured param value from a URL, tolerating a malformed percent-escape —` (the "URL-decodes" spelling did not parse as a plain third-person verb)

**`tests/setup.ts`** (`policy/no-malformed-summary`, two sites):
- line 18: `/** A finite counting \`ReadableStream\` fixture and its observed pull total. */` → `/** Represents a finite counting \`ReadableStream\` fixture and its observed pull total. */`
- line 24: `Create a finite byte stream that records each pull from its consumer.` → `Creates a finite byte stream that records each pull from its consumer.`

`npx oxlint --config .oxlintrc.json --deny-warnings .` after these fixes: no output, exit 0.

`npm run test:policy` after item 1 (before item 3 fixes were needed against `guides/**`/`README.md`): 90 passed, 1 skipped, exit 0 — its `prose` rule named no line in `guides/**` or `README.md`, so no additional edit was owed under this item; those files stay the converge unit's.

No diagnostic in item 3 named an off-limits file.

## Item 4 — the bump

`package.json`: `"version": "0.0.13"` → `"version": "0.0.14"`. `package-lock.json` untouched.

## Acceptance criteria

1. `git status --short`:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M src/browser/types.ts
 M src/core/helpers.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupBrowser.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tsconfig.json
?? scripts/docs.ts
```

This is the P21 repair list plus `tests/guides.test.ts` (item 2) plus the five files item 3 edited (`src/browser/types.ts`, `src/core/helpers.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/setupServer.ts`) plus `package.json` (the bump; `package.json` also carries the repair's `docs` script row). Nothing else.

2.

```text
npm run format:check → All matched files use the correct format. (exit 0)
npx oxlint --config .oxlintrc.json --deny-warnings . → (no output) (exit 0)
npm run check → tsc --noEmit --project tsconfig.json && check:src:core && check:src:browser && check:src:server, all clean (exit 0)
```

3.

```text
npm run test:guides → Test Files 1 passed (1); Tests 45 passed (45) (exit 0)
npm run test:policy → Test Files 1 passed (1); Tests 90 passed | 1 skipped (91) (exit 0)
npm run test:config → Test Files 1 passed (1); Tests 172 passed | 1 skipped (173) (exit 0)
```

4. `npm run docs` (exit 1, expected — the converge unit's worklist), verbatim:

```text
guides/router.md function createRouter: guide "Create a `RouterInterface<Meta>` — the shared matching + registry engine." source "Creates a `RouterInterface` — the pure path-matching + registry engine shared by the browser `Navigator` and the core `Dispatcher`."
guides/router.md function createDispatcher: guide "Create a `DispatcherInterface<TState>` over one internal `Router`." source "Creates a `DispatcherInterface` — the fetch-standard, method- dimensioned dispatch entity over one internal `Router<RouteRecord<TState>>`."
guides/router.md function createNavigator: guide "Create a `NavigatorInterface<Meta>` composing one core `Router`." source "Creates a `NavigatorInterface` — the headless History/hash navigation entity composing one core `Router<Meta>`."
guides/router.md const METHOD_LIST: guide "The registrable HTTP methods as a frozen, ordered literal tuple." source "Lists the HTTP methods a `import('./types.js').DispatcherInterface` registers routes under, in canonical order — the single source the `import('./types.js').Method` type, `METHODS`, and `parseMethod` are all derived from."
guides/router.md const METHODS: guide "The registrable HTTP methods (`GET`…`OPTIONS`) as a `ReadonlySet`." source "Holds the complete set of HTTP methods a `import('./types.js').DispatcherInterface` registers routes under — backs the registration guard (`add` rejects any `method` outside this set) and the auto-`OPTIONS` `Allow` derivation."
guides/router.md const TIER_LITERAL: guide "The highest path-segment specificity tier (a literal segment)." source "Names the specificity tier for a **literal** path segment (`/users`) — the highest tier, always outranking a param or wildcard segment at the same position."
guides/router.md const TIER_PARAM: guide "The middle path-segment specificity tier (a `:name` param)." source "Names the specificity tier for a **param** path segment (`:name`) — ranks below a literal segment and above a wildcard segment at the same position."
guides/router.md const TIER_WILDCARD: guide "The lowest path-segment specificity tier (a final `*name` wildcard)." source "Names the specificity tier for a **wildcard** path segment (`*name`) — the lowest tier; a wildcard only ever wins against another wildcard shape (an equal-specificity tie resolved by registration order)."
guides/router.md function escapeRegExp: guide "Escape regex metacharacters in a literal string." source "Escapes every regex metacharacter in a literal string so it can be embedded inside a larger `RegExp` source without being interpreted as syntax."
guides/router.md function canonicalizePath: guide "Strip one trailing slash off a path pattern (except `/` and `''`)." source "Canonicalizes a route path for REGISTRY IDENTITY — strips a single trailing slash, except the root `/` (and the empty pattern). The trailing-slash fold `compilePath` normalizes a pattern through, so identity agrees with the matcher."
guides/router.md function computeDispatchKey: guide "Compute the canonical method-and-path key for a dispatcher route." source "Computes the registry key for a method-dimensioned dispatcher route."
guides/router.md function compilePath: guide "Compile a path pattern into an anchored regex + ordered param names." source "Compiles a route path pattern into an anchored regex and its ordered param names."
guides/router.md function decodeParam: guide "URL-decode one captured param, tolerating a malformed `%` escape." source "Decodes one captured param value from a URL, tolerating a malformed percent-escape — the decode `matchPath` applies to each captured group."
guides/router.md function matchPath: guide "Extract decoded params from a compiled path against a pathname, or `undefined`." source "Extracts the URL-decoded params a compiled path captures from a concrete pathname, or `undefined` when the pathname does not match."
guides/router.md function classifySegment: guide "Classify one path segment into its specificity tier." source "Classifies one path segment into its specificity TIER — the SAME syntax `compilePath` rewrites: a syntactically valid `:name` head is a PARAM segment, a final `*name` is a WILDCARD segment, everything else (including a literal segment that merely CONTAINS a `:` mid-string, for example `a:b`) is a LITERAL segment."
guides/router.md function computeSpecificity: guide "Compute a path's per-segment specificity vector." source "Computes a route path's SPECIFICITY VECTOR — the per-segment type ranking that breaks a tie when several registered routes match the same concrete pathname."
guides/router.md function compareSpecificity: guide "Compare two paths by specificity for a descending sort." source "Compares two route paths by SPECIFICITY — the comparator that picks the most-specific matching route (literal-over-param-over-wildcard, registration-order-independent)."
guides/router.md function joinPaths: guide "Join a group prefix and a route path into one `/`-prefixed path." source "Joins a group prefix and a route path into one `/`-prefixed path, normalizing duplicate or missing joining slashes."
guides/router.md function defineRoute: guide "Identity pass-through pinning a `RouteInput`'s literal `Path` at the call site." source "Provides an identity pass-through for a `RouteInput` that pins its `Path` generic to the LITERAL registration-site string, so `context.params` types correctly through `PathParams` without an explicit type argument."
guides/router.md function computeNavigationKey: guide "Compute the canonical nested-route key used by a `Navigator`." source "Computes the registry key for a browser navigation route."
guides/router.md function extractHashPath: guide "Extract the `/`-prefixed pathname from a `location.hash` value." source "Extracts the `/`-prefixed pathname from a `location.hash` value — strips the leading `#` (keeping the route's own leading `/`) and any `?query` suffix."
guides/router.md function resolveLocationPath: guide "Resolve the `/`-prefixed pathname to match for the current location." source "Resolves the `/`-prefixed pathname to match for the CURRENT location, in either navigation mode — the one seam `extractHashPath` (hash mode) and history-mode base-stripping share."
guides/router.md function findAnchor: guide "Find the nearest enclosing `<a>` element a DOM event originated from." source "Finds the nearest enclosing `<a>` element a DOM event originated from, by walking its composed path — the pure lookup behind history-mode link interception."
guides/router.md function buildRequest: guide "Build a fetch `Request` from a `node:http` `IncomingMessage`." source "Builds a fetch-standard `Request` from a `node:http` `IncomingMessage` — the server-adapter half of the fetch/node conversion seam."
guides/router.md function sendResponse: guide "Write a fetch `Response` back to a `node:http` `ServerResponse`." source "Writes a fetch-standard `Response` back to a `node:http` `ServerResponse` — the reverse half of the fetch/node conversion seam."
guides/router.md function parseMethod: guide "Narrow a raw `request.method` string into a typed `Method`, or `undefined`." source "Narrows a raw `request.method` string into a typed `Method` — total, never throws."
guides/router.md function isEncryptedSocket: guide "Whether a `node:http` connection socket is TLS-encrypted." source "Determines whether a `node:http` connection socket is TLS-encrypted — the total, never-throwing narrow `buildRequest` uses to pick the derived scheme (`https` vs `http`)."
guides/router.md function handleListenerRequest: guide "Handle and write one dispatcher request at the Node transport boundary." source "Handles one `node:http` request through a core dispatcher and writes its fetch-standard response."
guides/router.md function createListener: guide "Create a `node:http` request listener over a core `DispatcherInterface`." source "Creates a `node:http` request listener over a core `DispatcherInterface` — the whole server face's entry point: converts the incoming message to a fetch `Request`, hands it to the dispatcher with the consumer's per-request `state`, and writes the resulting `Response` back."
guides/router.md class Router: guide "The path-matching + registry engine; entries compiled once, most-specific wins." source "Represents the path-matching + registry engine — registers `{ path, meta, name? }` entries (compiling each path once) and resolves a concrete pathname to the MOST SPECIFIC matching entry. The shared machine both the `Navigator` (browser) and the `Dispatcher` (core, method-dimensioned) compose."
guides/router.md class Group: guide "A prefix-scoped registration handle over a `Router` (pure string composition)." source "Represents a prefix-scoped registration handle over a `import('./Router.js').Router` — pure string composition, no independent state or storage."
guides/router.md class Dispatcher: guide "The fetch-standard, method-dimensioned dispatch entity over one `Router`." source "Represents the fetch-standard, method-dimensioned dispatch entity — layers HTTP method dispatch and web-standard `Request`/`Response` handling over one internal `Router<RouteRecord<TState>>`. The core machine the eventual server face and any fetch-native runtime consumes directly."
guides/router.md class DispatchGroup: guide "A prefix-scoped registration handle over a `Dispatcher`." source "Represents a prefix-scoped registration handle over a `import('./Dispatcher.js').Dispatcher` — the method-dimensioned counterpart of `Group` (`Group.ts`)."
guides/router.md class Navigator: guide "The headless History/hash navigation entity composing one core `Router`." source "Represents the headless History/hash navigation entity — composes one core `Router<Meta>`, resolving the current location on `start()` and every subsequent navigation event, tracking `active`, and emitting `navigate` through the core `Emitter`. No `render` / `outlet` — the consumer owns rendering."
guides/router.md type PathParams: guide absent source "Extracts `{ name: string }` param records from a path pattern at the type level — the typed half of the path grammar."
guides/router.md type PathParamsRaw: guide absent source "Performs recursive, unflattened param extraction for `PathParams` — walks a path pattern segment by segment (split on `/`), extracting each segment's `SegmentParam` contribution and intersecting the rest."
guides/router.md type IdentifierStartChar: guide absent source "Names the identifier START characters an identifier-grammar param name may begin with — mirrors the runtime classifier's `[A-Za-z_]` head class (`classifySegment` / `compilePath`, `helpers.ts`)."
guides/router.md type IdentifierChar: guide absent source "Names the identifier CONTINUATION characters after the first — mirrors the runtime classifier's `[A-Za-z0-9_]*` tail class."
guides/router.md type TakeIdentifierTail: guide absent source absent
guides/router.md type IdentifierHead: guide absent source absent
guides/router.md type SegmentParam: guide absent source absent
guides/router.md interface CompiledPath: guide absent source "Represents a compiled route path — the anchored regex plus its ordered param names."
guides/router.md interface RouteEntry: guide absent source "Represents one registered route in a `RouterInterface` — the `path` pattern plus the opaque `meta` payload to return on a match, with an optional `name`."
guides/router.md interface RouterMatch: guide absent source "Represents one matched route — the winning entry's PATTERN, decoded params, `meta` payload, and optional `name`."
guides/router.md type AnswerHandler: guide absent source "Represents the native-override seam — a predicate deciding whether an entry's `meta` ANSWERS a given `match` call, beyond path matching."
guides/router.md interface RouterOptions: guide absent source "Represents the options for `createRouter` — an optional initial entry set, the case- sensitivity toggle, and the dedup identity function."
guides/router.md interface RouterInterface: guide absent source "Represents the path-matching + registry engine contract (the behavioral-interface role for the one-class-per-file `Router`). Registers `{ path, meta, name? }` entries (compiling each path once) and resolves a concrete pathname to the MOST SPECIFIC matching entry — a literal segment beats a param beats a wildcard at the earliest differing segment, registration-order-independent. The shared engine both the `Navigator` (browser) and the `Dispatcher` (core, method-dimensioned) compose."
guides/router.md interface GroupInterface: guide absent source "Represents a prefix-scoped registration handle over a `RouterInterface` — pure string composition, no independent state or storage."
guides/router.md type Method: guide absent source "Names the HTTP methods a `DispatcherInterface` dimensions dispatch over — derived from `import('./constants.js').METHOD_LIST`, whose membership counterpart is `import('./constants.js').METHODS`."
guides/router.md interface RouteContext: guide absent source "Represents the ambient context a `RouteHandler` receives alongside the raw `Request` — decoded params, the winning pattern, the parsed URL, and the consumer's opaque per-request state."
guides/router.md type RouteHandler: guide absent source "Receives the raw fetch `Request` plus its typed `RouteContext` and returns (or resolves) a fetch `Response`."
guides/router.md interface RouteInput: guide absent source "Represents one route registration input for `DispatcherInterface.add` — the method-dimensioned counterpart of `RouteEntry`."
guides/router.md interface RouteRecord: guide absent source "Represents the `meta` payload a `DispatcherInterface` stores in its underlying `Router` — what `RouterInterface.match` returns as `RouterMatch.meta` on a dispatch hit."
guides/router.md type DispatchResult: guide absent source "Represents the outcome of `DispatcherInterface.match` — a discriminated union over the dispatch tiers: a full hit, a path-matches-but-method- doesn't (405 territory), or nothing matched at all (404 territory)."
guides/router.md type DispatcherEventMap: guide absent source "Represents the `Dispatcher`'s event map — the dispatch-outcome signals a consumer can observe alongside the return value of `handle`."
guides/router.md interface DispatcherOptions: guide absent source "Represents the options for `createDispatcher` — initial routes, case sensitivity, the default-responder overrides, and the Emitter pattern's wiring."
guides/router.md interface DispatcherInterface: guide absent source "Represents the fetch-standard, method-dimensioned dispatch entity contract (the behavioral-interface role for the one-class-per-file `Dispatcher`). Layers HTTP method dispatch and web-standard `Request`/`Response` handling over a single internal `Router<RouteRecord<TState>>`."
guides/router.md interface DispatchGroupInterface: guide absent source "Represents a prefix-scoped registration handle over a `DispatcherInterface` — the method-dimensioned counterpart of `GroupInterface`."
guides/router.md type NavigatorEventMap: guide absent source "Represents the `Navigator`'s event map — the single `navigate` signal a consumer observes."
guides/router.md interface NavigatorOptions: guide absent source "Represents the options for `createNavigator` — the `routes` to dispatch between, the navigation substrate, the optional guard hook, and the Emitter pattern's wiring."
guides/router.md interface NavigatorInterface: guide absent source "Represents the headless History/hash navigation entity contract (the behavioral- interface role for the one-class-per-file `Navigator`). Composes a core `Router<Meta>`, resolves the current location on `start()` and on every subsequent navigation event, tracks `active`, and emits `navigate` through the `EmitterInterface`."
guides/router.md interface RequestOptions: guide absent source "Represents the options for `buildRequest` — URL origin and response-side disconnect tracking."
guides/router.md type ListenerFunction: guide absent source "Represents a `node:http` request handler — the function `createListener` returns, matching `http.createServer`'s handler signature."
guides/router.md type StateFunction: guide absent source "Derives a consumer's opaque per-request `TState` from the raw `IncomingMessage` — the `state` argument `createListener` threads into `dispatcher.handle`."
guides/router.md RouterInterface.add: guide absent source absent
guides/router.md RouterInterface.match: guide absent source absent
guides/router.md RouterInterface.entries: guide absent source absent
guides/router.md RouterInterface.group: guide absent source absent
guides/router.md RouterInterface.clear: guide absent source absent
guides/router.md DispatcherInterface.add: guide absent source absent
guides/router.md DispatcherInterface.group: guide absent source absent
guides/router.md DispatcherInterface.match: guide absent source absent
guides/router.md DispatcherInterface.handle: guide absent source absent
guides/router.md DispatcherInterface.destroy: guide absent source absent
guides/router.md NavigatorInterface.start: guide absent source absent
guides/router.md NavigatorInterface.stop: guide absent source absent
guides/router.md NavigatorInterface.navigate: guide absent source absent
guides/router.md NavigatorInterface.match: guide absent source absent
guides/router.md NavigatorInterface.destroy: guide absent source absent
guides/router.md GroupInterface.add: guide absent source absent
guides/router.md GroupInterface.group: guide absent source absent
guides/router.md DispatchGroupInterface.add: guide absent source absent
guides/router.md DispatchGroupInterface.group: guide absent source absent
guides/router.md pitch: readme absent tagline "This package's ONE guide, covering its faces (one guide per package): the pure, environment-agnostic core — a registry-and-match engine (`Router`) plus a fetch-standard, method-dimensioned dispatcher (`Dispatcher`) layered over one internal `Router<RouteRecord<TState>>` — the browser navigation face (`Navigator`), and the node adapter face (`buildRequest` / `sendResponse` / `createListener`). `Router` is the ONE shared machine both `Navigator` and `Dispatcher` compose — literal-over-param-over-wildcard precedence, trailing-slash folding, tolerant percent-decoding, and the `answers` native-override seam all come from this single engine (one engine, native overrides only for a genuine faster path); the core-first story is what makes the browser and server faces thin. Source: `src/core`, `src/browser`, `src/server`. Surfaced through the `@orkestrel/router` barrel (aliased `@src/core` / `@src/browser` / `@src/server` inside this repo)."
rows read: 1, disagreements found: 84
```

## Deviations

None. No path outside the P21 list was written, every before-text was found verbatim, no voice diagnostic named an off-limits file, `test:policy` reddened nowhere, and every gate other than `docs` read green after the items.
