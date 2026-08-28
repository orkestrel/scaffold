# Findings for group h11 (verification round 2)

Packages: test, middleware. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it. Note: scaffold lives at /home/user/scaffold, every other package at /home/user/fleet/<name>.

## s11-01

1. package=middleware file=/home/user/fleet/middleware/src/core/helpers.ts:14 rule=.claude/rules/architecture.md § Kind purity ("Keep the leaf pair class-free") verdict=CONFIRMED
   wrong: `helpers.ts` imports the `Session` implementation class and constructs it at line 690, so the module's bottom leaf now has an upward edge into an implementation file; `/home/user/fleet/middleware/src/server/helpers.ts:28` does the same with `MultipartParser`.
   repair: Remove both class imports from the leaf files. Move `restoreSession` (finding 2) and the `MultipartParser`-driving functions out of `helpers.ts`, leaving only type, constant, error, and sibling-leaf imports.

## s11-02

2. package=middleware file=/home/user/fleet/middleware/src/core/helpers.ts:687 rule=.claude/rules/architecture.md § Kind purity ("A function returning a live entity is an entity factory and belongs in `factories.ts` whatever it is called") verdict=CONFIRMED
   wrong: `restoreSession` returns a live `Session` instance, so it is an entity factory sitting in the pure-leaf file, and it is what drags the class import in.
   repair: Move it to `src/core/factories.ts` and rename it to the `create*` form that file fixes — `createRestoredSession(value: unknown): Session | undefined`. Update `stores/DatabaseSessionStore.ts:4`.

## s11-03

3. package=middleware file=/home/user/fleet/middleware/src/server/helpers.ts:502 rule=.claude/rules/architecture.md § Wrapper test ("Delete one-line delegates, pass-through factories") verdict=CONFIRMED
   wrong: `createUploadedFile(input: UploadedFileInput): UploadedFileInterface` is `Object.freeze({ ...input })`, and `UploadedFileInput` (`server/types.ts:190-198`) declares exactly the same members as `UploadedFileInterface` (`server/types.ts:158-160`), so the function is an identity over two identical types and adds no boundary, invariant, or narrower contract. It is also a `create*` entity builder in `helpers.ts`.
   repair: Delete `createUploadedFile` and `UploadedFileInput`; have `MultipartParser` (its only caller, `server/MultipartParser.ts:14`) call `Object.freeze({ … })` directly against `UploadedFileInterface`.

## s11-04

4. package=middleware file=/home/user/fleet/middleware/src/server/helpers.ts:389 rule=.claude/rules/architecture.md § Wrapper test verdict=CONFIRMED
   wrong: `resolveDefaultDirectory()` is `return MultipartParser.directory()` — a one-line delegate that exists only to publish a class static under another name, and it is the second reason `helpers.ts` imports the parser class.
   repair: Delete it. Have `parseMultipartRequest` call `MultipartParser.directory()` after that function moves out of the leaf file, and drop the export from the barrel and the guide surface table together.

## s11-05

5. package=middleware file=/home/user/fleet/middleware/src/server/errors.ts:31 rule=.claude/rules/patterns.md § Declared ecosystem capabilities ("Never reimplement or rename-wrap a declared package primitive") verdict=CONFIRMED
   wrong: `MultipartError extends Error` and re-declares `status`, `context`, and a `Symbol.for` brand — the exact member set the declared `@orkestrel/server` `HTTPError` already publishes (`node_modules/@orkestrel/server/dist/src/server/index.d.ts:564-569`), whose sanctioned extension pattern is `ContractTooLargeError`-style subclassing (`:274`). `reason` is a real added axis; the base class is not.
   repair: `export class MultipartError extends HTTPError`, passing `MULTIPART_REASON_STATUS[reason]` as `status`, and keep only `reason` as an own member. See the referral below for the runtime consequence.

## s11-06

6. package=middleware file=/home/user/fleet/middleware/src/server/errors.ts:32-34 rule=.claude/rules/typescript.md § Errors and outcomes ("Error classes expose a machine-readable `code`") verdict=CONFIRMED
   wrong: `MultipartError` exposes `status` and `reason` but no `code`, so a consumer narrowing by machine-readable code across the fleet's error classes has nothing to read here.
   repair: Add `readonly code` carrying a stable identifier, declared beside `reason`.

## s11-07

7. package=middleware file=/home/user/fleet/middleware/src/server/errors.ts:45 and :76 rule=.claude/rules/architecture.md § Kind purity ("Module-scope constants live only in `constants.ts`") verdict=CONFIRMED
   wrong: The brand key `Symbol.for('@orkestrel/middleware.MultipartError')` is written as a literal in the constructor and again in `isMultipartError`, so the two copies can drift and neither is centralized. The peer package centralizes its own brand (`HTTP_ERROR_BRAND`).
   repair: Declare `MULTIPART_ERROR_BRAND = Symbol.for('@orkestrel/middleware.MultipartError')` in `src/server/constants.ts` and read it in both places.

## s11-08

8. package=middleware file=/home/user/fleet/middleware/src/core/helpers.ts:492,511,523,549 rule=.claude/rules/architecture.md § Centralized-file pattern (Guards → `*/validators.ts`) and .claude/rules/patterns.md § Validation and contracts verdict=CONFIRMED
   wrong: `isSession`, `isSessionControl`, `isMultipartFile`, and `isMultipartBody` are total `(unknown) => value is T` guards living in `helpers.ts`; the package has no `validators.ts`. (`isPreflight`, `isBufferingIneligible`, and `isCompressionNegotiated` take typed arguments and correctly stay in `helpers.ts` under the `isVacant` clause.)
   repair: Create `src/core/validators.ts`, move those four guards into it, add `export * from './validators.js'` to `src/core/index.ts`, and update `stores/DatabaseSessionStore.ts` and `middlewares.ts` imports.

## s11-09

9. package=middleware file=/home/user/fleet/middleware/src/core/shapers.ts:23 rule=.claude/rules/architecture.md § Kind purity ("Module-scope constants live only in `constants.ts`, use UPPER_SNAKE_CASE, and freeze object/array data with `Object.freeze`") verdict=CONFIRMED
   wrong: `sessionColumns` is a camelCase, unfrozen object literal — module data — declared in a function-kind file. `shapers.ts` holds shape-producing functions; this is a table of already-built shapes.
   repair: Move it to `src/core/constants.ts` as `export const SESSION_COLUMNS = Object.freeze({ … })`, update `src/core/index.ts` and every guide fence naming `sessionColumns`.

## s11-10

10. package=middleware file=/home/user/fleet/middleware/src/core/types.ts:9-17 rule=.claude/rules/typescript.md § Comments ("Comments explain why, never restate what self-explanatory code does") and AGENTS.md § Writing ("NEVER state a count") verdict=CONFIRMED
    wrong: Campaign residue is compiled into published source and published TSDoc. Banner blocks cite `AGENTS §5`, `PROPOSAL.md §4`, and "the orchestrator's seam rulings (see the dispatch header)" at `core/types.ts:9-17`, `core/helpers.ts:16-23`, `core/factories.ts:19-24`, `core/constants.ts:4-5`, `core/middlewares.ts:90-96`, `server/types.ts:3-9`, `server/constants.ts:4-6`, `server/errors.ts:4-11`, `server/helpers.ts:30-36`, `server/middlewares.ts:46-52`. Reader-facing TSDoc carries the same: `(ruling I)` at `core/helpers.ts:56,73,92`, `(ruling J)` at `:220,280,316`, `(ruling D)` at `:462`, `(§14)` at `:478,501,518,538`, `(ruling G)` at `core/Session.ts:5`, `(AGENTS §5)` at `core/types.ts:349`, `(PROPOSAL §4.14)` at `server/middlewares.ts:172`, `(PROPOSAL §4.15, ruling C)` at `:386`, `(PROPOSAL §4.3, ruling J)` at `:440`, `(ruling H)` at `:443`, `(PROPOSAL §4.14)` at `server/helpers.ts:124`, `(PROPOSAL §4.15)` at `:431`. `core/middlewares.ts:91` also states a count ("the thirteen pure battery factories") over a set that grows. `core/helpers.ts:18-19` claims "Every function here is a self-contained, referentially-transparent computation", which `detectEncodings`, `compressBytes`, `compressResponse`, and `restoreSession` each falsify.
    repair: Delete every banner block — each restates the kind table, which is `AGENTS.md`'s job. Strike every `ruling`, `PROPOSAL`, `§`, and `AGENTS §` reference from TSDoc; where the sentence carried real meaning, restate the behaviour without the citation.

## s11-11

11. package=middleware file=/home/user/fleet/middleware/src/server/types.ts:7-8 rule=.claude/rules/documentation.md § Parity ("A parity failure identifies drift; never suppress or weaken the test") verdict=CONFIRMED
    wrong: The comment states `MultipartState`/`MultipartBody`/`MultipartFile` are "OWNED by the pure core face and re-exported from the server barrel". `src/server/index.ts` re-exports nothing from core, and `guides/middleware.md:656-657` shows consumers importing them from `@orkestrel/middleware`. The claim was true of a design that did not ship.
    repair: Delete the sentence with the rest of the banner (finding 10).

## s11-12

12. package=middleware file=/home/user/fleet/middleware/src/core/types.ts:305 rule=AGENTS.md § Non-negotiable rules ("ALWAYS make interface properties and public return collections readonly") and .claude/rules/typescript.md § Types verdict=CONFIRMED
    wrong: `SessionInterface.data: Map<string, unknown>` publishes a mutable `Map` on a public interface property. The `@remarks` documents that it is live and mutable but states no exception to the rule, and `Session.ts:21` repeats it on the class.
    repair: Declare `readonly data: ReadonlyMap<string, unknown>` and give `SessionInterface` one-word mutators (`set`, `delete`, `clear`) that the class owns, or state the exception explicitly in the interface's `@remarks` and in `guides/middleware.md`.

## s11-13

13. package=middleware file=/home/user/fleet/middleware/src/core/Session.ts:20-21 rule=.claude/rules/architecture.md § Declaration placement ("exactly one class implementation with `#` fields") and § Class order verdict=CONFIRMED
    wrong: `Session` declares two public data fields instead of `#` fields exposed through readonly getters; `src/server/errors.ts:32-34` does the same with `status`, `reason`, and `context`.
    repair: Declare `#id`/`#data` (and `#status`/`#reason`/`#context`), assign them in the constructor body, and expose `get id()` / `get data()` typed as the interface members.

## s11-14

14. package=middleware file=/home/user/fleet/middleware/src/core/types.ts:390 rule=.claude/rules/names.md § Type-level identifiers ("Behavioral interface → `{Entity}Interface`") verdict=CONFIRMED
    wrong: `SessionTransport` declares `read`, `write`, and `clear` — a behavioral interface with no `Interface` suffix — while `SessionStoreInterface` (`:358`) and `SessionControlInterface` (`:318`), its two siblings in the same seam, carry it.
    repair: Rename to `SessionTransportInterface` and update `SessionOptions.transport`, `factories.ts`, the guide surface table, and every fence.

## s11-15

15. package=middleware file=/home/user/fleet/middleware/src/core/types.ts:369-374 rule=.claude/rules/names.md § Entity-scoped names ("Public properties: one word") and § Rejected naming ("Generic words: `data`, `info`") verdict=CONFIRMED
    wrong: `SessionRow.lastSeen` and `SessionRow.createdAt` are compound members on an entity that already supplies the context, and `createdAt` carries a redundant `At` suffix. `ClientInfo` (`:285`) is named with the rejected generic word `info`, and `SessionInterface.data` (`:305`) with the rejected generic word `data`.
    repair: Rename to `seen` and `created`; rename `ClientInfo` to `Client`; rename `SessionInterface.data` to a real noun for what it holds (`values`, or `store`). Update `sessionColumns`, both stores, `sessionExpired`, `snapshotSession`, `restoreSession`, and the guide.

## s11-16

16. package=middleware file=/home/user/fleet/middleware/src/core/types.ts:163 rule=.claude/rules/names.md § Rejected naming ("Abbreviations: `cfg`, `doc`, `msg`") verdict=CONFIRMED
    wrong: `DeadlineOptions.ms` names a duration by its unit abbreviation. Its siblings across the same package spell durations as nouns — `window`, `ttl`, `lifetime`, `threshold`.
    repair: Rename to `budget` (the duration the deadline allows) and document the millisecond unit in `@remarks`.

## s11-17

17. package=middleware file=/home/user/fleet/middleware/src/server/types.ts:97-103 rule=.claude/rules/names.md § Tallies ("When several distinct tallies coexist, name each fact") verdict=CONFIRMED
    wrong: `MultipartLimits` pairs `file` (a byte size) with `files` (a count) and `field` (a byte size) with `fields` (a count). Two keys differing by one letter carry different units, so a caller writing `{ file: 10 }` when they meant `{ files: 10 }` gets a 10-byte cap and no diagnostic.
    repair: Group by the configured entity noun with one-word leaves: `{ file: { size, count }, field: { size, count }, total }`. Update `resolveMultipartLimits`, `MultipartParser`, and the guide.

## s11-18

18. package=middleware file=/home/user/fleet/middleware/src/server/types.ts:158 rule=.claude/rules/names.md § Type-level identifiers ("Plain non-behavioral data → `{Entity}`") verdict=CONFIRMED
    wrong: `UploadedFileInterface` carries no call signature — it is plain data — yet takes the `Interface` suffix reserved for behavioral interfaces, while its own core twin `MultipartFile` (`core/types.ts:535`) is correctly bare. `PartHeaders.contentType` (`:169`) is a compound member where the entity already supplies the context.
    repair: Rename to `UploadedFile`; rename `PartHeaders.contentType` to `type`. Update `helpers.ts`, `MultipartParser.ts`, and the guide.

## s11-19

19. package=middleware file=/home/user/fleet/middleware/src/core/helpers.ts:190-193 rule=AGENTS.md § Non-negotiable rules ("ALWAYS define reusable and public types in `*/types.ts` before implementation") verdict=CONFIRMED
    wrong: Public signatures declare their types inline instead of in `types.ts`, and one of them re-declares a type that already exists there. `resolveForwardedFor`'s `trust` parameter (`:192`) is a verbatim copy of `ForwardedOptions` (`types.ts:178-180`). Further inline declarations: `compressResponse`'s options bag (`:424-432`), `sessionExpired`'s `cursors` and `limits` (`:637-639`), `snapshotSession`'s return type (`:665-668`), `createDatabaseSessionStore`'s options (`factories.ts:143`), `MemorySessionStore`'s entry shape written twice (`stores/MemorySessionStore.ts:37` and `:104`), and `DatabaseSessionStore`'s constructor options (`stores/DatabaseSessionStore.ts:50`).
    repair: Declare each in `src/core/types.ts` — `ForwardedOptions` reused directly for `trust`, plus `CompressResponseOptions`, `SessionCursors`, `SessionLimits`, `SessionSnapshot`, `SessionEntry`, and one `SessionStoreOptions` shared by both stores — and reference them from the signatures.

## s11-20

20. package=middleware file=/home/user/fleet/middleware/src/core/helpers.ts:665-672 rule=.claude/rules/typescript.md § Types ("Public collection properties and return types use `readonly T[]`, `ReadonlyMap<K, V>`") verdict=CONFIRMED
    wrong: `snapshotSession` returns `{ readonly id: string; readonly data: Record<string, unknown> }` — the `data` record is publicly returned and mutable.
    repair: Type the returned member `Readonly<Record<string, unknown>>` on the `SessionSnapshot` interface finding 19 introduces.

## s11-21

21. package=middleware file=/home/user/fleet/middleware/src/core/stores/MemorySessionStore.ts:107-110 rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: The conditional-spread that assembles `{ ttl?, lifetime? }` from two `number | undefined` fields is written identically at `MemorySessionStore.ts:107-110` and `DatabaseSessionStore.ts:62-65`; `buildClientInfo` (`core/helpers.ts:590`) is a third instance of the same idiom.
    repair: Change `sessionExpired`'s third parameter to two optional `number | undefined` arguments so both call sites pass `this.#ttl, this.#lifetime` directly, and delete the spread at all three sites.

## s11-22

22. package=middleware file=/home/user/fleet/middleware/src/core/helpers.ts:636 rule=.claude/rules/names.md § Standalone helpers ("default to `{verb}{Noun}`") and § Fixed derivation/construction forms verdict=CONFIRMED
    wrong: Four helper names break their own project-wide forms. `sessionExpired` is a predicate named noun-first rather than `is*`. `multipartBoundary` (`server/helpers.ts:340`) is a coercer returning `string | undefined` named as a bare noun. `detectMIME` (`server/helpers.ts:286`) infers a value from data while `detectEncodings` (`core/helpers.ts:236`) probes a runtime capability, so the `detect*` prefix carries two meanings. The parameter and field named `is` (`factories.ts:142`, `DatabaseSessionStore.ts:43,49`) is a verb fragment where a noun belongs.
    repair: Rename to `isSessionExpired`; rename `multipartBoundary` to `parseMultipartBoundary` and move it to a new `src/server/parsers.ts`; rename `detectMIME` to `inferMIME` and move it to `src/server/inferers.ts`, leaving `detect*` to mean runtime probing alone; rename the guard parameter and field to `guard`.

## s11-23

23. package=middleware file=/home/user/fleet/middleware/src/core/middlewares.ts:889 rule=.claude/rules/architecture.md § Middleware ("Place middleware factories in `middlewares.ts` as `createX(options): Middleware`") verdict=CONFIRMED
    wrong: `only` and `except` (`:914`) both return a `MiddlewareHandler` from `middlewares.ts` but take neither the `create*` form that rule fixes nor a verb-first helper name; every sibling in the file is `create{Noun}`.
    repair: Rename to `createOnly` and `createExcept`, or to `createScoped(paths, handler, { invert })` if the pair is better expressed as one factory. Update the guide fences at both call sites.

## s11-24

24. package=middleware file=/home/user/fleet/middleware/src/core/types.ts:435-436 rule=AGENTS.md § Design laws ("Mechanism, not product policy") and .claude/rules/names.md § General vocabulary ("Booleans read as assertions") verdict=CONFIRMED
    wrong: `SessionOptions.require` renders a 404 and `SessionOptions.ends` answers a `DELETE` with 204 — both are route decisions the consuming application owns, installed inside a session mechanism. Both are also named as present-tense verbs rather than as assertions, unlike `policy` and `weak` elsewhere in the package.
    repair: Keep `require` as a boolean renamed to an assertion (`required`) since refusing a sessionless request is still session mechanism; remove `ends` and let the consumer mount its own `DELETE` handler over `control.destroy()`, or rename it and document that it installs a route.

## s11-25

25. package=middleware file=/home/user/fleet/middleware/src/server/types.ts:79 rule=.claude/rules/patterns.md § Options ("Group related settings beneath the configured entity noun; every leaf is one word") verdict=CONFIRMED
    wrong: `StaticOptions.fallback?: boolean | { readonly exclude?: string }` overloads one key with a switch and a config, so `fallback: true` and `fallback: {}` mean the same thing by two spellings and the reader has to know which.
    repair: Make it `fallback?: { readonly exclude?: string }`, with absence meaning off and `{}` meaning on with the default exclusion; drop the boolean arm.

## s11-26

26. package=middleware file=/home/user/fleet/middleware/src/server/MultipartParser.ts:34-49 rule=.claude/rules/names.md § Entity-scoped names and .claude/rules/architecture.md § Middleware ("If consumers must address, share, inspect, or replace that state, extract the state to a pluggable class supplied as an option") verdict=CONFIRMED
    wrong: The constructor takes six positional parameters, so a call site is unreadable without the declaration open beside it. Separately, `static #defaultDirectory` (`:17`) with `static directory()` (`:51`) is process-global mutable state with no way to inspect, reset, or replace it, published through the one-line helper finding 4 removes.
    repair: Replace the positional list with `(stream, signal, options)` where `options` groups `boundary`, `limits`, `allowed`, and `directory`. Make the staging directory an explicit constructor input resolved by the caller, so no process-wide static holds it.

## s11-27

27. package=middleware file=/home/user/fleet/middleware/src/core/stores/DatabaseSessionStore.ts:47-56 rule=AGENTS.md § Design laws ("One concept, one term") verdict=CONFIRMED
    wrong: Two implementations of one interface disagree on their construction contract. `MemorySessionStore`'s constructor validates every option and throws six distinct `TypeError`s (`MemorySessionStore.ts:44-70`); `DatabaseSessionStore` validates nothing, so the same malformed `ttl` is refused by one store and silently accepted by the other.
    repair: Extract the shared `ttl`/`lifetime` validation into one exported helper and call it from both constructors.

## s11-28

28. package=middleware file=/home/user/fleet/middleware/src/core/types.ts:22 rule=.claude/rules/typescript.md § Comments and API documentation ("Document an options object as one `@param`") verdict=CONFIRMED
    wrong: `@param options - See fields below` is written on interface declarations, which take no parameter, at `core/types.ts:22,57,70,100,137,155,185,197,217,401,443,459,471,503` and `server/types.ts:44,55,109,204`. The tag belongs on the function that receives the bag, not on the bag's own declaration, and "See fields below" states nothing the reader could not see.
    repair: Delete the `@param` line from every interface; keep the `@remarks` field list, and let the `@param options` on `createBoundary`, `createTelemetry`, and their siblings carry the link.

## s11-29

29. package=middleware file=/home/user/fleet/middleware/src/core/types.ts:20 rule=.claude/rules/typescript.md § Comments and API documentation ("The first sentence states what the symbol does in the third person with an `-s` verb") verdict=CONFIRMED
    wrong: The TSDoc first sentence is imperative rather than third person across the package's function exports — `Derive` (`core/helpers.ts:26`), `Build` (`:55,73,92`), `Walk` (`:166`), `Determine` (`:478,500,517,537,561`), `Copy` (`:461`), `Snapshot` (`:647`), `Rebuild` (`:675`), `Create` (`factories.ts:27,65,95,120`), `Scope` (`middlewares.ts:876,901`), `Narrow` (`server/errors.ts:52`), `Resolve` (`server/helpers.ts:358,377`), `Parse` (`:394`), `Stream-parse` (`:430`) — against a small third-person minority. Reported as one finding per the dispatch instruction.
    repair: Rewrite each first sentence in the third person with an `-s` verb — `Derives`, `Builds`, `Walks`, `Checks whether`, `Copies`, `Snapshots`, `Rebuilds`, `Creates`, `Scopes`, `Parses` — and never repeat the symbol's name.

## s11-30

30. package=test file=/home/user/fleet/test/src/core/helpers.ts:51-56 rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: The budget-and-interval bound validation is written out six times, identical but for the noun in the message: `waitForCondition` (`core/helpers.ts:51-56`), `retryUntil` (`:99-104`), `waitForEvent` (`:239-244`), `waitForSocketClose` (`server/helpers.ts:312-317`), `destroyScratch` (`:388-393`), `requestUpgrade` (`:452-457`). Every member of the wait family therefore has its own copy of one contract.
    repair: Export one leaf from `core/helpers.ts` — `checkBounds(subject: string, options?: WaitOptions): void` — and call it from all six, passing `'Wait'`, `'Retry'`, `'Event'`, `'Socket'`, `'Scratch'`, `'Upgrade'`. Unit-test it once.

## s11-31

31. package=test file=/home/user/fleet/test/src/core/helpers.ts:124-131 rule=.claude/rules/typescript.md § Errors and outcomes ("Use the existing outcome contract … do not redeclare it at each call site") verdict=CONFIRMED
    wrong: `retryUntil` declares an anonymous `{ success: false; error } | { success: true; value }` union inline as a local annotation — the `Result<T, E>` shape the rule names, redeclared at a call site rather than defined once in the owning `types.ts`.
    repair: Declare `Success<T>`, `Failure<E>`, and `Result<T, E>` in `src/core/types.ts` exactly as the rule's block states, and annotate `produced` with `Result<T, unknown>`.

## s11-32

32. package=test file=/home/user/fleet/test/src/core/helpers.ts:115-123 rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: `retryUntil` constructs the same exhaustion error twice — the elapsed check at `:116-122` and the identical block at `:153-159`, sharing the message template, the `last` interpolation, and the `cause`. A message edit has to land in two places.
    repair: Fold the two into one check. The loop-top guard at `:115-123` is reachable only after the loop-bottom guard at `:153-159` already ran, so delete the loop-top copy and keep one construction.

## s11-33

33. package=test file=/home/user/fleet/test/src/server/helpers.ts:99-105 rule=.claude/rules/architecture.md § Kind purity ("non-trivial or reusable → extract, export, unit-test, and route every duplicate through it") verdict=CONFIRMED
    wrong: The six-line narrowing that reads a `code` off an unknown thrown value is written identically in `createLink` (`:99-105`) and `removeTree` (`:135-141`).
    repair: Export `readErrorCode(error: unknown): string | undefined` from `src/server/helpers.ts`, call it from both, and unit-test it against a plain object, an `Error` with a non-string `code`, and a null prototype.

## s11-34

34. package=test file=/home/user/fleet/test/src/server/factories.ts:47-51 rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: `createScratch` builds the same `ScratchIdentity` from a `Stats` three times (`:47-51`, `:140-144`, `:154-158`), and opens seven of its nine members with the same `resolveContained` call followed by the same `${outside}: ${target}` throw (`:70-71,80-81,91-92,102-103,112-113,124-125,133-134`).
    repair: Export two leaves from `src/server/helpers.ts` — `statusToIdentity(status): ScratchIdentity` and `requireContained(root, target): string` — and route all three and all seven sites through them.

## s11-35

35. package=test file=/home/user/fleet/test/src/core/factories.ts:224-229 rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice") and § Functions and orchestration verdict=CONFIRMED
    wrong: Inside `createSignal`, the deregistration sequence — find the registration by its installed listener, splice it out, abort its cleanup controller — is written at `:224-229` (the one-shot path) and again at `:249-255` (the scope-abort path). The whole instrumented entity is 110 lines of closure state inside one factory, which is what makes the duplication invisible.
    repair: Promote the instrumentation to a `Signal` class in `src/core/signals/Signal.ts` with `#registrations` and a `#drop(installed)` private method both paths call, and have `createSignal` return `new Signal()` as `SignalInterface`.

## s11-36

36. package=test file=/home/user/fleet/test/src/browser/types.ts:81 rule=AGENTS.md § Design laws ("One concept, one term. Do not alternate synonyms") verdict=CONFIRMED
    wrong: `states` names two different sets one call apart. `PortfolioOptions.states` (`:62`) is the registry of every name the run may place; `PortfolioInterface.states` (`:81`) is only what has been placed so far. A consumer who writes `createPortfolio({ states })` and then reads `portfolio.states` gets a different set under the same word, and `createPortfolio` (`browser/factories.ts:111,119-121`) keeps both under `registry` and `placed` internally — the two names the API should have exposed.
    repair: Rename `PortfolioInterface.states` to `placed`, matching the factory's own internal vocabulary, and update the guide's surface row.

## s11-37

37. package=test file=/home/user/fleet/test/src/browser/helpers.ts:1593 rule=.claude/rules/names.md § Standalone helpers ("default to `{verb}{Noun}`"; "A one-word helper is valid only when its meaning and arguments are unmistakable") verdict=CONFIRMED
    wrong: The browser layer runs one `read*` family of readers — `readPerception`, `readPage`, `readFocus`, `readValue`, `readText`, `readRole`, `readName`, `readStates`, `readLayers`, `readBackdrop`, `readRing`, `readRows`, `readCascade`, `readRules` — and then names six more readers as bare nouns: `style` (`:1593`), `token` (`:1621`), `rootToken` (`:1642`), `pixels` (`:1669`), `contrast` (`:1307`), `rgba` (`:1092`). `style(element, 'padding-left')` is the sharpest of these: read as a verb it means to apply styling, and the file next door does stage and mutate the page. `contrast` also duplicates the term `measureContrast` (`:1202`) already owns, and `rgba` names its output format where its documented pair `parseColor` names the action. `guides/test.md:412` groups these as a family but states no exception to the naming rule.
    repair: Rename to `readStyle`, `readToken`, `readRootToken`, `readPixels`, `readContrast`, and `resolveColor`, so one prefix means one thing and `measure*` stays with the two pure color computations. Update the guide's surface tables and every fence.

## s11-38

38. package=test file=/home/user/fleet/test/src/browser/helpers.ts:1128 rule=.claude/rules/names.md § Standalone helpers ("A helper prefix has one project-wide meaning: … `matches*` is a predicate") verdict=CONFIRMED
    wrong: `colorEqual` is noun-first with an adjective tail, in a file whose other color functions are all verb-first (`blendColor`, `measureLuminance`, `measureContrast`, `parseColor`).
    repair: Rename to `matchesColor`, which is the project's declared predicate prefix, and update the guide surface row and fences.

## s11-39

39. package=test file=/home/user/fleet/test/src/core/helpers.ts:230 rule=.claude/rules/patterns.md § Options verdict=EXEMPT
    wrong: `waitForEvent`, `waitForSocketClose` (`server/helpers.ts:311`), and `requestUpgrade` (`server/helpers.ts:451`) each accept `WaitOptions.interval`, validate it, and never read it, so an option a caller sets changes nothing.
    repair: None required — the exception is documented at the point of use in each `@remarks` ("validated for consistency with the wait family but is not used, because this helper parks on the event") and is a deliberate shared-shape decision. Left as recorded rather than dropped.

## s11-40

40. package=test file=/home/user/fleet/test/src/browser/factories.ts:172 rule=.claude/rules/typescript.md § Immutability ("Never mutate caller-owned inputs") verdict=EXEMPT
    wrong: `createChannel(name, output, forward)` takes a mutable `string[]` and appends to it, so the returned channel writes into a caller-owned array.
    repair: None required — the `@remarks` at `:163-164` states the design ("The list belongs to the caller, so a channel writes into whatever it was handed and holds no state of its own") and `createJournal` is what owns the list. Recorded rather than dropped.