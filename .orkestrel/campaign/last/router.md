# Last changes: router

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `0302d86`, merge base with `origin/main` `b8fa097`, layer L2, declared version 0.0.12, registry version 0.0.12.

## Commits since origin/main

```text
0fc7d44 2026-08-28 Update every dependency to the published latest
f774300 2026-08-28 Adopt the catalog and guide mirrors for the wave
66ce11b 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
b632f46 2026-09-01 Apply the verified src-audit fixes
a416aed 2026-09-01 Adopt the renamed guide helpers in the parity test
3daca9b 2026-09-02 Point the README at the guide the package ships
0302d86 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md         |  17 ++++----
 README.md                           |   2 +-
 package.json                        |   6 +--
 src/browser/Navigator.ts            |   2 +-
 src/browser/factories.ts            |   2 +-
 src/browser/helpers.ts              |   8 ++--
 src/browser/types.ts                |   6 +--
 src/core/DispatchGroup.ts           |   2 +-
 src/core/Dispatcher.ts              |  21 ++++++----
 src/core/Group.ts                   |   2 +-
 src/core/Router.ts                  |   2 +-
 src/core/constants.ts               |  51 ++++++++++++++++++------
 src/core/factories.ts               |   4 +-
 src/core/helpers.ts                 |  58 ++++++----------------------
 src/core/index.ts                   |   1 +
 src/core/parsers.ts                 |  35 +++++++++++++++++
 src/core/types.ts                   |  58 +++++++++++++++-------------
 src/server/handlers.ts              |  97 ++++++++++++++++++++++++++++++++++++++++++++++
 src/server/helpers.ts               | 123 ++++------------------------------------------------------
 src/server/index.ts                 |   2 +
 src/server/types.ts                 |   4 +-
 src/server/validators.ts            |  28 ++++++++++++++
 tests/guides.test.ts                |  22 +++++------
 tests/src/core/helpers.test.ts      |  21 ----------
 tests/src/core/parsers.test.ts      |  32 ++++++++++++++++
 tests/src/server/handlers.test.ts   | 135 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 tests/src/server/helpers.test.ts    | 160 +++-------------------------------------------------------------------------
 tests/src/server/validators.test.ts |  22 +++++++++++
 28 files changed, 501 insertions(+), 422 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/browser/types.ts b/src/browser/types.ts
index b8bb85f..e122abd 100644
--- a/src/browser/types.ts
+++ b/src/browser/types.ts
@@ -21,7 +21,7 @@ import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkes
 import type { RouteEntry, RouterInterface, RouterMatch } from '@src/core'
 
 /**
- * The `Navigator`'s event map (AGENTS §13) — the single `navigate` signal a
+ * Represents the `Navigator`'s event map (AGENTS §13) — the single `navigate` signal a
  * consumer observes.
  *
  * @typeParam Meta - The opaque per-route payload the resolved match carries
@@ -37,7 +37,7 @@ export type NavigatorEventMap<Meta> = {
 }
 
 /**
- * Options for `createNavigator` — the `routes` to dispatch between, the
+ * Represents the options for `createNavigator` — the `routes` to dispatch between, the
  * navigation substrate, the optional guard hook, and the AGENTS §13 emitter
  * wiring.
  *
@@ -89,7 +89,7 @@ export interface NavigatorOptions<Meta> {
 }
 
 /**
- * The headless History/hash navigation entity contract (the §4.5 behavioral-
+ * Represents the headless History/hash navigation entity contract (the §4.5 behavioral-
  * interface role for the one-class-per-file `Navigator`). Composes a core
  * `Router<RouteEntry<Meta>>`, resolves the current location on `start()` and
  * on every subsequent navigation event, tracks `active`, and emits
diff --git a/src/core/constants.ts b/src/core/constants.ts
index 3f24549..0be0f60 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -5,15 +5,46 @@
 // ============================================================================
 
 /**
- * The complete set of HTTP methods a {@link import('./types.js').Dispatcher}
+ * Lists the HTTP methods a {@link import('./types.js').Dispatcher} registers
+ * routes under, in canonical order — the single source the
+ * {@link import('./types.js').Method} type, {@link METHODS}, and
+ * `parseMethod` are all derived from.
+ *
+ * @remarks
+ * A frozen tuple of the seven verbs: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`,
+ * `HEAD`, `OPTIONS`. Adding a verb here widens the `Method` type, the
+ * {@link METHODS} membership set, and the `parseMethod` narrowing together, so
+ * the method set cannot drift between them. Prefer {@link METHODS} for a
+ * membership test; use this tuple where order or literal typing matters.
+ *
+ * @example
+ * ```ts
+ * METHOD_LIST[0] // 'GET'
+ * METHOD_LIST.includes('GET') // true
+ * ```
+ */
+export const METHOD_LIST = Object.freeze([
+	'GET',
+	'POST',
+	'PUT',
+	'PATCH',
+	'DELETE',
+	'HEAD',
+	'OPTIONS',
+] as const)
+
+/**
+ * Holds the complete set of HTTP methods a {@link import('./types.js').Dispatcher}
  * registers routes under — backs the registration guard (`add` rejects any
  * `method` outside this set) and the auto-`OPTIONS` `Allow` derivation.
  *
  * @remarks
- * A `ReadonlySet` of the seven {@link import('./types.js').Method} literals:
- * `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`. `HEAD` is
- * included even though it is never required at registration (a `GET` route
- * auto-answers `HEAD`) — it is still a valid method to register explicitly.
+ * A `ReadonlySet` built from {@link METHOD_LIST}, so it carries exactly the
+ * seven {@link import('./types.js').Method} literals: `GET`, `POST`, `PUT`,
+ * `PATCH`, `DELETE`, `HEAD`, `OPTIONS`. `HEAD` is included even though it is
+ * never required at registration (a `GET` route auto-answers `HEAD`) — it is
+ * still a valid method to register explicitly. The element type stays `string`
+ * so a raw, unnarrowed `request.method` can be tested directly.
  *
  * @example
  * ```ts
@@ -21,12 +52,10 @@
  * METHODS.has('TRACE') // false
  * ```
  */
-export const METHODS: ReadonlySet<string> = Object.freeze(
-	new Set(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']),
-)
+export const METHODS: ReadonlySet<string> = Object.freeze(new Set<string>(METHOD_LIST))
 
 /**
- * Specificity tier for a **literal** path segment (`/users`) — the highest
+ * Names the specificity tier for a **literal** path segment (`/users`) — the highest
  * tier, always outranking a param or wildcard segment at the same position.
  *
  * @remarks
@@ -41,7 +70,7 @@ export const METHODS: ReadonlySet<string> = Object.freeze(
 export const TIER_LITERAL = 2
 
 /**
- * Specificity tier for a **param** path segment (`:name`) — ranks below a
+ * Names the specificity tier for a **param** path segment (`:name`) — ranks below a
  * literal segment and above a wildcard segment at the same position.
  *
  * @remarks
@@ -56,7 +85,7 @@ export const TIER_LITERAL = 2
 export const TIER_PARAM = 1
 
 /**
- * Specificity tier for a **wildcard** path segment (`*name`) — the lowest
+ * Names the specificity tier for a **wildcard** path segment (`*name`) — the lowest
  * tier; a wildcard only ever wins against another wildcard shape (an
  * equal-specificity tie resolved by registration order).
  *
diff --git a/src/core/index.ts b/src/core/index.ts
index 7000d0f..0abe896 100644
--- a/src/core/index.ts
+++ b/src/core/index.ts
@@ -1,6 +1,7 @@
 export * from './types.js'
 export * from './constants.js'
 export * from './helpers.js'
+export * from './parsers.js'
 export * from './Dispatcher.js'
 export * from './DispatchGroup.js'
 export * from './Group.js'
diff --git a/src/core/types.ts b/src/core/types.ts
index 932f6fb..68eeb26 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -29,9 +29,10 @@
 // ============================================================================
 
 import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'
+import type { METHOD_LIST } from './constants.js'
 
 /**
- * The identifier START characters an identifier-grammar param name may
+ * Names the identifier START characters an identifier-grammar param name may
  * begin with — mirrors the runtime classifier's `[A-Za-z_]` head class
  * (`classifySegment` / `compilePath`, `helpers.ts`).
  */
@@ -91,7 +92,7 @@ export type IdentifierStartChar =
 	| '_'
 
 /**
- * The identifier CONTINUATION characters after the first — mirrors the
+ * Names the identifier CONTINUATION characters after the first — mirrors the
  * runtime classifier's `[A-Za-z0-9_]*` tail class.
  */
 export type IdentifierChar =
@@ -151,7 +152,7 @@ export type SegmentParam<Segment extends string> = Segment extends `:${infer Res
 		: unknown
 
 /**
- * Recursive, unflattened param extraction for {@link PathParams} — walks a
+ * Performs recursive, unflattened param extraction for {@link PathParams} — walks a
  * path pattern segment by segment (split on `/`), extracting each segment's
  * {@link SegmentParam} contribution and intersecting the rest.
  *
@@ -206,7 +207,7 @@ export type PathParams<Path extends string> = {
 }
 
 /**
- * A compiled route path — the anchored regex plus its ordered param names.
+ * Represents a compiled route path — the anchored regex plus its ordered param names.
  *
  * @remarks
  * The once-per-path compile output of `compilePath` (U1 `helpers.ts`):
@@ -222,7 +223,7 @@ export interface CompiledPath {
 }
 
 /**
- * One registered route in a {@link RouterInterface} — the `path` pattern plus
+ * Represents one registered route in a {@link RouterInterface} — the `path` pattern plus
  * the opaque `meta` payload to return on a match, with an optional `name`.
  *
  * @typeParam Meta - The payload to carry on a match (opaque to the engine —
@@ -246,7 +247,7 @@ export interface RouteEntry<Meta> {
 }
 
 /**
- * One matched route — the winning entry's PATTERN, decoded params, `meta`
+ * Represents one matched route — the winning entry's PATTERN, decoded params, `meta`
  * payload, and optional `name`.
  *
  * @typeParam Meta - The payload the winning entry carries
@@ -267,7 +268,7 @@ export interface RouterMatch<Meta> {
 }
 
 /**
- * The native-override seam — a predicate deciding whether an entry's `meta`
+ * Represents the native-override seam — a predicate deciding whether an entry's `meta`
  * ANSWERS a given `match` call, beyond path matching.
  *
  * @typeParam Meta - The entry payload the predicate reads
@@ -283,7 +284,7 @@ export interface RouterMatch<Meta> {
 export type AnswerHandler<Meta> = (meta: Meta) => boolean
 
 /**
- * Options for `createRouter` — an optional initial entry set, the case-
+ * Represents the options for `createRouter` — an optional initial entry set, the case-
  * sensitivity toggle, and the dedup identity function.
  *
  * @typeParam Meta - The entry payload type
@@ -308,7 +309,7 @@ export interface RouterOptions<Meta> {
 }
 
 /**
- * The path-matching + registry engine contract (the §4.5 behavioral-interface
+ * Represents the path-matching + registry engine contract (the §4.5 behavioral-interface
  * role for the one-class-per-file `Router`). Registers `{ path, meta, name? }`
  * entries (compiling each path once) and resolves a concrete pathname to the
  * MOST SPECIFIC matching entry — a literal segment beats a param beats a
@@ -349,7 +350,7 @@ export interface RouterInterface<Meta> {
 }
 
 /**
- * A prefix-scoped registration handle over a {@link RouterInterface} — pure
+ * Represents a prefix-scoped registration handle over a {@link RouterInterface} — pure
  * string composition (§4.2.2), no independent state or storage.
  *
  * @typeParam Meta - The entry payload type, matching the owning router
@@ -371,18 +372,23 @@ export interface GroupInterface<Meta> {
 }
 
 /**
- * The seven HTTP methods a {@link DispatcherInterface} dimensions dispatch
- * over — the value-level counterpart is {@link import('./constants.js').METHODS}.
+ * Names the seven HTTP methods a {@link DispatcherInterface} dimensions dispatch
+ * over — derived from {@link import('./constants.js').METHOD_LIST}, whose
+ * membership counterpart is {@link import('./constants.js').METHODS}.
  *
  * @remarks
- * `HEAD` is a valid explicit registration even though a `GET` route already
- * auto-answers `HEAD` (§5.1 dispatch semantics) — an explicit `HEAD` handler
- * always takes precedence over the derived one.
+ * Resolves to `'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' |
+ * 'OPTIONS'`. Deriving the union from the constant keeps one home for the
+ * method set: a verb added there widens this type, the membership set, and the
+ * `parseMethod` narrowing together. `HEAD` is a valid explicit registration
+ * even though a `GET` route already auto-answers `HEAD` (§5.1 dispatch
+ * semantics) — an explicit `HEAD` handler always takes precedence over the
+ * derived one.
  */
-export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'
+export type Method = (typeof METHOD_LIST)[number]
 
 /**
- * The ambient context a {@link RouteHandler} receives alongside the raw
+ * Represents the ambient context a {@link RouteHandler} receives alongside the raw
  * `Request` — decoded params, the winning pattern, the parsed URL, and the
  * consumer's opaque per-request state.
  *
@@ -407,8 +413,8 @@ export interface RouteContext<Path extends string = string, TState = undefined>
 }
 
 /**
- * A route handler — receives the raw fetch `Request` plus its typed
- * {@link RouteContext} and returns (or resolves) a fetch `Response`.
+ * Receives the raw fetch `Request` plus its typed {@link RouteContext} and returns (or resolves)
+ * a fetch `Response`.
  *
  * @typeParam Path - The route path pattern the handler is registered under
  * @typeParam TState - The consumer's opaque per-request state type
@@ -424,7 +430,7 @@ export type RouteHandler<Path extends string = string, TState = undefined> = (
 ) => Response | Promise<Response>
 
 /**
- * One route registration input for {@link DispatcherInterface.add} — the
+ * Represents one route registration input for {@link DispatcherInterface.add} — the
  * method-dimensioned counterpart of {@link RouteEntry}.
  *
  * @typeParam Path - The route path pattern literal (drives the typed
@@ -446,7 +452,7 @@ export interface RouteInput<Path extends string = string, TState = undefined> {
 }
 
 /**
- * The `meta` payload a {@link DispatcherInterface} stores in its underlying
+ * Represents the `meta` payload a {@link DispatcherInterface} stores in its underlying
  * `Router` — what {@link RouterInterface.match} returns as
  * {@link RouterMatch.meta} on a dispatch hit.
  *
@@ -464,7 +470,7 @@ export interface RouteRecord<TState> {
 }
 
 /**
- * The outcome of {@link DispatcherInterface.match} — a discriminated union
+ * Represents the outcome of {@link DispatcherInterface.match} — a discriminated union
  * over the three dispatch tiers: a full hit, a path-matches-but-method-
  * doesn't (405 territory), or nothing matched at all (404 territory).
  *
@@ -484,7 +490,7 @@ export type DispatchResult<TState> =
 	| { readonly status: 'unmatched' }
 
 /**
- * The `Dispatcher`'s event map (AGENTS §13) — the two dispatch-outcome
+ * Represents the `Dispatcher`'s event map (AGENTS §13) — the two dispatch-outcome
  * signals a consumer can observe alongside the return value of `handle`.
  *
  * @remarks
@@ -505,7 +511,7 @@ export type DispatcherEventMap = {
 }
 
 /**
- * Options for `createDispatcher` — initial routes, case sensitivity, the two
+ * Represents the options for `createDispatcher` — initial routes, case sensitivity, the two
  * default-responder overrides, and the AGENTS §13 emitter wiring.
  *
  * @typeParam TState - The consumer's opaque per-request state type
@@ -533,7 +539,7 @@ export interface DispatcherOptions<TState> {
 }
 
 /**
- * The fetch-standard, method-dimensioned dispatch entity contract (the §4.5
+ * Represents the fetch-standard, method-dimensioned dispatch entity contract (the §4.5
  * behavioral-interface role for the one-class-per-file `Dispatcher`). Layers
  * HTTP method dispatch and web-standard `Request`/`Response` handling over a
  * single internal `Router<RouteRecord<TState>>`.
@@ -575,7 +581,7 @@ export interface DispatcherInterface<TState = undefined> {
 }
 
 /**
- * A prefix-scoped registration handle over a {@link DispatcherInterface} —
+ * Represents a prefix-scoped registration handle over a {@link DispatcherInterface} —
  * the method-dimensioned counterpart of {@link GroupInterface}.
  *
  * @typeParam TState - The consumer's opaque per-request state type, matching
diff --git a/src/server/index.ts b/src/server/index.ts
index a4c624f..41e7129 100644
--- a/src/server/index.ts
+++ b/src/server/index.ts
@@ -1,2 +1,4 @@
 export * from './types.js'
+export * from './validators.js'
 export * from './helpers.js'
+export * from './handlers.js'
diff --git a/src/server/types.ts b/src/server/types.ts
index da100bd..6a34911 100644
--- a/src/server/types.ts
+++ b/src/server/types.ts
@@ -8,7 +8,7 @@
 import type { IncomingMessage, ServerResponse } from 'node:http'
 
 /**
- * Options for `buildRequest` — URL origin and response-side disconnect tracking.
+ * Represents the options for `buildRequest` — URL origin and response-side disconnect tracking.
  *
  * @remarks
  * - `origin` — an explicit scheme + host to build the request URL against
@@ -24,7 +24,7 @@ export interface RequestOptions {
 }
 
 /**
- * A `node:http` request handler — the function `createListener` returns,
+ * Represents a `node:http` request handler — the function `createListener` returns,
  * matching `http.createServer`'s handler signature.
  *
  * @remarks
```
