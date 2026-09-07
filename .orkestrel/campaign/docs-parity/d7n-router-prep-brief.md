# Brief — P.1 `d7n-router-prep` (router's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/router` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `2188391`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

router's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== router 2026-09-07T15:33:22Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
100:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 932ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### router (2188391, version 0.0.13, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 38 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setupBrowser.ts(8)
   tests/setupServer.ts(7)
   tests/setup.ts(2)
   src/core/helpers.ts(1)
   src/browser/types.ts(1)
-- docs
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
-- check
   tests/guides.test.ts(119,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(122,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(126,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(141,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(156,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 21 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  21 failed | 24 passed (45)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 19 | summary 18 | banned 1 | tests/setupBrowser.ts(8) tests/setupServer.ts(7) tests/setup.ts(2) src/core/helpers.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for router (taken 2026-09-07T15:38Z by facts.sh)

- Checkout `/home/user/fleet/router`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `2188391`, status: clean
- `package.json`: version `0.0.13`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    112:			const members = source.methods(group.interface)
    119:					expect(findMissing(members, group.methods)).toEqual([])
    122:					expect(findMissing(group.methods, members)).toEqual([])
    126:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    141:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    144:		for (const group of guide.methods()) {
    154:							? source.examples(group.interface)
    155:							: source.examples(group.interface).concat(source.examples(entity))
    156:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    168:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 663:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` once, map the `examples` binding's records to names (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.13"` → `"version": "0.0.14"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-router-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
