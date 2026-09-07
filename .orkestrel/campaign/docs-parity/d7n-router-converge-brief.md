# Brief — P.2 `d7n-router-converge` (router under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/router` from the committed baseline `4101a0b` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.14`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/router.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/router/guides/router.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-router-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/router.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/router.md` and `README.md`; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/router.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
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
exit 1
```

## Facts for router (taken 2026-09-07T15:50Z by facts.sh)

- Checkout `/home/user/fleet/router`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `4101a0b`, status: clean
- `package.json`: version `0.0.14`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 19 | summary 18 | banned 1 | tests/setupBrowser.ts(8) tests/setupServer.ts(7) tests/setup.ts(2) src/core/helpers.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    8:| Concept | Spec                     | Source                                                                                    | Tests                                                                                                                         |
    9:| ------- | ------------------------ | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
    10:| Router  | [`router.md`](router.md) | [`src/core`](../src/core), [`src/browser`](../src/browser), [`src/server`](../src/server) | [`tests/src/core`](../tests/src/core), [`tests/src/browser`](../tests/src/browser), [`tests/src/server`](../tests/src/server) |
    14:| Directory     | Guide                    |
    15:| ------------- | ------------------------ |
    16:| `src/core`    | [`router.md`](router.md) |
    17:| `src/browser` | [`router.md`](router.md) |
    18:| `src/server`  | [`router.md`](router.md) |
- Guide `guides/router.md`: 733 lines. Headings:
    1:# Router
    19:## Surface
    51:### Factories
    59:### Constants
    69:### Helpers
    91:### Parsers
    97:### Guards
    103:### Handlers
    110:### Entities
    120:### Types
    163:## Methods
    172:#### `RouterInterface`
    188:#### `DispatcherInterface`
    204:#### `NavigatorInterface`
    218:#### `GroupInterface`
    229:#### `DispatchGroupInterface`
    240:## Contract
    384:## Patterns
    386:### Groups and dedup
    406:### Wildcard capture and precedence
    425:### Method-dimensioned dispatch (auto-HEAD, auto-OPTIONS, 405)
    449:### Observing dispatch outcomes
    464:### Typing a route input at the registration site
    492:### Introspection and reset
    517:### Hash-mode navigation
    536:### History mode with link interception
    550:### Guarding navigation (auth walls)
    571:### Basic server
    592:### Converting requests and responses directly
    621:### Observing client disconnect
    633:### Practices
    663:## Tests
    725:## See also
- Table headers in `guides/router.md` (a header row is the row before a `| ---` row):
    53: | API                | Kind     | Summary                                                                   |
    61: | API             | Kind  | Summary                                                              |
    71: | API                    | Kind     | Summary                                                                         |
    93: | API           | Kind     | Summary                                                                     |
    99: | API                 | Kind     | Summary                                                   |
    105: | API                     | Kind     | Summary                                                                  |
    112: | API             | Kind  | Summary                                                                         |
    122: | Type                     | Kind      | Shape                                                                                               |
    180: | Method    | Returns                    | Behavior                                                                                        |
    196: | Method    | Returns                  | Behavior                                                                                                      |
    210: | Method     | Returns                    | Behavior                                                                                          |
    224: | Method  | Returns          | Behavior                                                                                            |
    235: | Method  | Returns                  | Behavior                                                                                                      |
- Rows of any `### Entities` table (the Kind cell):
    114:  `Router`        | class
    115:  `Group`         | class
    116:  `Dispatcher`    | class
    117:  `DispatchGroup` | class
    118:  `Navigator`     | class
- H1 blockquote (`guides/router.md`):
    3: > This package's ONE guide, covering its faces (one guide per package): the
    4: > pure, environment-agnostic core — a registry-and-match
    5: > engine (`Router`) plus a fetch-standard, method-dimensioned dispatcher
    6: > (`Dispatcher`) layered over one internal `Router<RouteRecord<TState>>` —
    7: > the browser navigation face (`Navigator`), and the node adapter face
    8: > (`buildRequest` / `sendResponse` / `createListener`). `Router` is the ONE
    9: > shared machine both `Navigator` and `Dispatcher` compose —
    10: > literal-over-param-over-wildcard precedence, trailing-slash folding,
    11: > tolerant percent-decoding, and the `answers` native-override seam all come
    12: > from this single engine (one engine, native overrides only for a genuine faster path); the
    13: > core-first story is what makes the browser and server faces thin. Source:
    14: > [`src/core`](../src/core), [`src/browser`](../src/browser),
    15: > [`src/server`](../src/server). Surfaced through the `@orkestrel/router`
    16: > barrel (aliased `@src/core` / `@src/browser` / `@src/server` inside this
    17: > repo).
- Opening prose after the blockquote (first two lines):
    19: ## Surface
    21: Register routes on a `Router`, resolve the most-specific match, and dispatch
- README (`README.md`) first lines:
    # @orkestrel/router
    
    A typed request router for the `@orkestrel` line. One matching engine compiles
    route patterns, extracts URL-decoded params, and resolves the most specific
    match; a `Dispatcher` layers fetch-standard, method-dimensioned dispatch over
    it; a headless `Navigator` drives History or hash navigation in the browser;
    and a `node:http` adapter converts messages in both directions. Built on
    `@orkestrel/contract` for validation, `@orkestrel/emitter` for the observable
    surface, and `@orkestrel/abort` for cancellation.
    
    ## Install
    
- `## Patterns` fences, each with its nearest preceding heading:
    24: fence under "## Surface"
    393: fence under "### Groups and dedup"
    411: fence under "### Wildcard capture and precedence"
    427: fence under "### Method-dimensioned dispatch (auto-HEAD, auto-OPTIONS, 405)"
    451: fence under "### Observing dispatch outcomes"
    472: fence under "### Typing a route input at the registration site"
    499: fence under "### Introspection and reset"
    519: fence under "### Hash-mode navigation"
    538: fence under "### History mode with link interception"
    555: fence under "### Guarding navigation (auth walls)"
    573: fence under "### Basic server"
    598: fence under "### Converting requests and responses directly"
    623: fence under "### Observing client disconnect"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/server/handlers.ts:90:export function createListener<TState>(
    src/browser/Navigator.ts:57:export class Navigator<Meta> implements NavigatorInterface<Meta> {
    src/browser/factories.ts:35:export function createNavigator<Meta>(options: NavigatorOptions<Meta>): NavigatorInterface<Meta> {
    src/core/Dispatcher.ts:61:export class Dispatcher<TState = undefined> implements DispatcherInterface<TState> {
    src/core/factories.ts:33:export function createRouter<Meta>(options?: RouterOptions<Meta>): RouterInterface<Meta> {
    src/core/factories.ts:64:export function createDispatcher<TState = undefined>(
    src/core/DispatchGroup.ts:27:export class DispatchGroup<TState> implements DispatchGroupInterface<TState> {
    src/core/Router.ts:43:export class Router<Meta> implements RouterInterface<Meta> {
    src/core/Group.ts:25:export class Group<Meta> implements GroupInterface<Meta> {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/handlers.ts:2
    src/server/validators.ts:1
    src/server/helpers.ts:2
    src/browser/Navigator.ts:1
    src/browser/factories.ts:1
    src/browser/helpers.ts:4
    src/core/Dispatcher.ts:1
    src/core/factories.ts:2
    src/core/helpers.ts:11
    src/core/DispatchGroup.ts:1
    src/core/constants.ts:5
    src/core/Router.ts:1
    src/core/Group.ts:1
    src/core/parsers.ts:1
    src/core/types.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    26:} from '@orkestrel/guide'
    60:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    66:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    111:		for (const group of guide.methods()) {
    112:			const members = source.methods(group.interface).map((method) => method.name)
    120:					expect(findMissing(members, documented)).toEqual([])
    123:					expect(findMissing(documented, members)).toEqual([])
    129:							: findMissing(
    130:									source.methods(entity).map((method) => method.name),
    148:				findUnexampled(
    151:					source.examples().map((example) => example.name),
    156:		for (const group of guide.methods()) {
    167:							? source.examples(group.interface).map((example) => example.name)
    171:									.concat(source.examples(entity).map((example) => example.name))
    172:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    184:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 663:## Tests — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/router.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/router.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the three cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the three cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-router-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
