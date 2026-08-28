# Fix dossier: middleware

Verified fix-producing findings for the `middleware` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s11-01 — DRIFT

1. package=middleware file=/home/user/fleet/middleware/src/core/helpers.ts:14 rule=.claude/rules/architecture.md § Kind purity ("Keep the leaf pair class-free") verdict=CONFIRMED
   wrong: `helpers.ts` imports the `Session` implementation class and constructs it at line 690, so the module's bottom leaf now has an upward edge into an implementation file; `/home/user/fleet/middleware/src/server/helpers.ts:28` does the same with `MultipartParser`.
   repair: Remove both class imports from the leaf files. Move `restoreSession` (finding 2) and the `MultipartParser`-driving functions out of `helpers.ts`, leaving only type, constant, error, and sibling-leaf imports.

## s11-02 — DRIFT

2. package=middleware file=/home/user/fleet/middleware/src/core/helpers.ts:687 rule=.claude/rules/architecture.md § Kind purity ("A function returning a live entity is an entity factory and belongs in `factories.ts` whatever it is called") verdict=CONFIRMED
   wrong: `restoreSession` returns a live `Session` instance, so it is an entity factory sitting in the pure-leaf file, and it is what drags the class import in.
   repair: Move it to `src/core/factories.ts` and rename it to the `create*` form that file fixes — `createRestoredSession(value: unknown): Session | undefined`. Update `stores/DatabaseSessionStore.ts:4`.

## s11-04 — DRIFT-RESHAPE

4. package=middleware file=/home/user/fleet/middleware/src/server/helpers.ts:389 rule=.claude/rules/architecture.md § Wrapper test verdict=CONFIRMED
   wrong: `resolveDefaultDirectory()` is `return MultipartParser.directory()` — a one-line delegate that exists only to publish a class static under another name, and it is the second reason `helpers.ts` imports the parser class.
   repair: Delete it. Have `parseMultipartRequest` call `MultipartParser.directory()` after that function moves out of the leaf file, and drop the export from the barrel and the guide surface table together.

### Verification

**Judge (DRIFT-RESHAPE/high):** The subjective lane has the verdict right and the objective lane's counter-argument does not exist in the canon. The objective lane wrote that "the barrel rules say an interned class's capability is reached through its owner or not published, not through a delegate". I read architecture.md § Barrel

**Lane DRIFT/medium:** stands

**Lane DRIFT-RESHAPE/medium:** amend: keep the public symbol and fix the placement instead. Move `resolveDefaultDirectory` and `parseMultipartRequest` — the two functions that construct or drive `MultipartParser` — out of the leaf `src/server/helpers.ts` into a class-driving kind file (`src/server/factories.ts`), so `helpers.ts` stops importing the class. Leave the barrel row and the `guides/middleware.md:218` surface row in place.

## s11-05 — DRIFT

5. package=middleware file=/home/user/fleet/middleware/src/server/errors.ts:31 rule=.claude/rules/patterns.md § Declared ecosystem capabilities ("Never reimplement or rename-wrap a declared package primitive") verdict=CONFIRMED
   wrong: `MultipartError extends Error` and re-declares `status`, `context`, and a `Symbol.for` brand — the exact member set the declared `@orkestrel/server` `HTTPError` already publishes (`node_modules/@orkestrel/server/dist/src/server/index.d.ts:564-569`), whose sanctioned extension pattern is `ContractTooLargeError`-style subclassing (`:274`). `reason` is a real added axis; the base class is not.
   repair: `export class MultipartError extends HTTPError`, passing `MULTIPART_REASON_STATUS[reason]` as `status`, and keep only `reason` as an own member. See the referral below for the runtime consequence.

## s11-06 — DRIFT-RESHAPE

6. package=middleware file=/home/user/fleet/middleware/src/server/errors.ts:32-34 rule=.claude/rules/typescript.md § Errors and outcomes ("Error classes expose a machine-readable `code`") verdict=CONFIRMED
   wrong: `MultipartError` exposes `status` and `reason` but no `code`, so a consumer narrowing by machine-readable code across the fleet's error classes has nothing to read here.
   repair: Add `readonly code` carrying a stable identifier, declared beside `reason`.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: rename `reason` to `code`, typed `MultipartErrorCode` in `src/server/types.ts`, matching the fleet form (`CSVErrorCode`, `DatabaseErrorCode`); do not add a second identifier beside `reason`

**Lane DRIFT-RESHAPE/medium:** amend: rename the existing axis rather than adding a parallel one — `readonly code: MultipartCode` (renaming the `MultipartReason` type and the `MULTIPART_REASON_STATUS` constant with it), matching `DatabaseError.code: DatabaseErrorCode` and `TableError.code: TableErrorCode`. Update `isMultipartError`, `guides/middleware.md:114,253`, and every `error.reason ===` assertion in `tests/src/server/helpers.test.ts`.

## s11-07 — DRIFT

7. package=middleware file=/home/user/fleet/middleware/src/server/errors.ts:45 and :76 rule=.claude/rules/architecture.md § Kind purity ("Module-scope constants live only in `constants.ts`") verdict=CONFIRMED
   wrong: The brand key `Symbol.for('@orkestrel/middleware.MultipartError')` is written as a literal in the constructor and again in `isMultipartError`, so the two copies can drift and neither is centralized. The peer package centralizes its own brand (`HTTP_ERROR_BRAND`).
   repair: Declare `MULTIPART_ERROR_BRAND = Symbol.for('@orkestrel/middleware.MultipartError')` in `src/server/constants.ts` and read it in both places.

## s11-08 — DRIFT

8. package=middleware file=/home/user/fleet/middleware/src/core/helpers.ts:492,511,523,549 rule=.claude/rules/architecture.md § Centralized-file pattern (Guards → `*/validators.ts`) and .claude/rules/patterns.md § Validation and contracts verdict=CONFIRMED
   wrong: `isSession`, `isSessionControl`, `isMultipartFile`, and `isMultipartBody` are total `(unknown) => value is T` guards living in `helpers.ts`; the package has no `validators.ts`. (`isPreflight`, `isBufferingIneligible`, and `isCompressionNegotiated` take typed arguments and correctly stay in `helpers.ts` under the `isVacant` clause.)
   repair: Create `src/core/validators.ts`, move those four guards into it, add `export * from './validators.js'` to `src/core/index.ts`, and update `stores/DatabaseSessionStore.ts` and `middlewares.ts` imports.

## s11-10 — DRIFT

10. package=middleware file=/home/user/fleet/middleware/src/core/types.ts:9-17 rule=.claude/rules/typescript.md § Comments ("Comments explain why, never restate what self-explanatory code does") and AGENTS.md § Writing ("NEVER state a count") verdict=CONFIRMED
    wrong: Campaign residue is compiled into published source and published TSDoc. Banner blocks cite `AGENTS §5`, `PROPOSAL.md §4`, and "the orchestrator's seam rulings (see the dispatch header)" at `core/types.ts:9-17`, `core/helpers.ts:16-23`, `core/factories.ts:19-24`, `core/constants.ts:4-5`, `core/middlewares.ts:90-96`, `server/types.ts:3-9`, `server/constants.ts:4-6`, `server/errors.ts:4-11`, `server/helpers.ts:30-36`, `server/middlewares.ts:46-52`. Reader-facing TSDoc carries the same: `(ruling I)` at `core/helpers.ts:56,73,92`, `(ruling J)` at `:220,280,316`, `(ruling D)` at `:462`, `(§14)` at `:478,501,518,538`, `(ruling G)` at `core/Session.ts:5`, `(AGENTS §5)` at `core/types.ts:349`, `(PROPOSAL §4.14)` at `server/middlewares.ts:172`, `(PROPOSAL §4.15, ruling C)` at `:386`, `(PROPOSAL §4.3, ruling J)` at `:440`, `(ruling H)` at `:443`, `(PROPOSAL §4.14)` at `server/helpers.ts:124`, `(PROPOSAL §4.15)` at `:431`. `core/middlewares.ts:91` also states a count ("the thirteen pure battery factories") over a set that grows. `core/helpers.ts:18-19` claims "Every function here is a self-contained, referentially-transparent computation", which `detectEncodings`, `compressBytes`, `compressResponse`, and `restoreSession` each falsify.
    repair: Delete every banner block — each restates the kind table, which is `AGENTS.md`'s job. Strike every `ruling`, `PROPOSAL`, `§`, and `AGENTS §` reference from TSDoc; where the sentence carried real meaning, restate the behaviour without the citation.

## s11-11 — DRIFT

11. package=middleware file=/home/user/fleet/middleware/src/server/types.ts:7-8 rule=.claude/rules/documentation.md § Parity ("A parity failure identifies drift; never suppress or weaken the test") verdict=CONFIRMED
    wrong: The comment states `MultipartState`/`MultipartBody`/`MultipartFile` are "OWNED by the pure core face and re-exported from the server barrel". `src/server/index.ts` re-exports nothing from core, and `guides/middleware.md:656-657` shows consumers importing them from `@orkestrel/middleware`. The claim was true of a design that did not ship.
    repair: Delete the sentence with the rest of the banner (finding 10).

## s11-12 — DRIFT-RESHAPE

12. package=middleware file=/home/user/fleet/middleware/src/core/types.ts:305 rule=AGENTS.md § Non-negotiable rules ("ALWAYS make interface properties and public return collections readonly") and .claude/rules/typescript.md § Types verdict=CONFIRMED
    wrong: `SessionInterface.data: Map<string, unknown>` publishes a mutable `Map` on a public interface property. The `@remarks` documents that it is live and mutable but states no exception to the rule, and `Session.ts:21` repeats it on the class.
    repair: Declare `readonly data: ReadonlyMap<string, unknown>` and give `SessionInterface` one-word mutators (`set`, `delete`, `clear`) that the class owns, or state the exception explicitly in the interface's `@remarks` and in `guides/middleware.md`.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: keep only the first arm — declare `readonly data: ReadonlyMap<string, unknown>` and give `SessionInterface` one-word mutators the class owns; strike the 'or document the exception' arm, because AGENTS.md § Non-negotiable rules admits no documented waiver

**Lane DRIFT-RESHAPE/medium:** amend: take the first option only — declare `readonly data: ReadonlyMap<string, unknown>` and give `SessionInterface` the one-word mutators (`set`, `delete`, `clear`) that `Session` owns, updating `transferSessionData` (core/helpers.ts:472) and `restoreSession` (:690) to route through them. Strike the alternative of documenting the exception; the rule is an unqualified ALWAYS.

## s11-14 — DRIFT

14. package=middleware file=/home/user/fleet/middleware/src/core/types.ts:390 rule=.claude/rules/names.md § Type-level identifiers ("Behavioral interface → `{Entity}Interface`") verdict=CONFIRMED
    wrong: `SessionTransport` declares `read`, `write`, and `clear` — a behavioral interface with no `Interface` suffix — while `SessionStoreInterface` (`:358`) and `SessionControlInterface` (`:318`), its two siblings in the same seam, carry it.
    repair: Rename to `SessionTransportInterface` and update `SessionOptions.transport`, `factories.ts`, the guide surface table, and every fence.

## s11-15 — DRIFT

15. package=middleware file=/home/user/fleet/middleware/src/core/types.ts:369-374 rule=.claude/rules/names.md § Entity-scoped names ("Public properties: one word") and § Rejected naming ("Generic words: `data`, `info`") verdict=CONFIRMED
    wrong: `SessionRow.lastSeen` and `SessionRow.createdAt` are compound members on an entity that already supplies the context, and `createdAt` carries a redundant `At` suffix. `ClientInfo` (`:285`) is named with the rejected generic word `info`, and `SessionInterface.data` (`:305`) with the rejected generic word `data`.
    repair: Rename to `seen` and `created`; rename `ClientInfo` to `Client`; rename `SessionInterface.data` to a real noun for what it holds (`values`, or `store`). Update `sessionColumns`, both stores, `sessionExpired`, `snapshotSession`, `restoreSession`, and the guide.

### Verification

**Judge (DRIFT/high):** The objective lane is right and the subjective lane's decisive argument fails on evidence it did not gather. The subjective lane refused `seen` and `created` on the ground that a past participle is reserved for boolean assertions and would make two numeric timestamps read as flags. The fleet already

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/medium:** amend: keep `ClientInfo` → `Client` and `SessionInterface.data` → `values`. For `SessionRow`, reject `seen`/`created` and use one-word nouns that do not read as assertions — `readonly activity: number` (the last-seen instant) and `readonly origin: number` (the creation instant) — keeping the row flat. Carry the rename through `src/core/shapers.ts:26-27`, both stores, `sessionExpired`, `snapshotSession`, `restoreSession`, and `guides/middleware.md`.

## s11-17 — DRIFT

17. package=middleware file=/home/user/fleet/middleware/src/server/types.ts:97-103 rule=.claude/rules/names.md § Tallies ("When several distinct tallies coexist, name each fact") verdict=CONFIRMED
    wrong: `MultipartLimits` pairs `file` (a byte size) with `files` (a count) and `field` (a byte size) with `fields` (a count). Two keys differing by one letter carry different units, so a caller writing `{ file: 10 }` when they meant `{ files: 10 }` gets a 10-byte cap and no diagnostic.
    repair: Group by the configured entity noun with one-word leaves: `{ file: { size, count }, field: { size, count }, total }`. Update `resolveMultipartLimits`, `MultipartParser`, and the guide.

## s11-18 — DRIFT-RESHAPE

18. package=middleware file=/home/user/fleet/middleware/src/server/types.ts:158 rule=.claude/rules/names.md § Type-level identifiers ("Plain non-behavioral data → `{Entity}`") verdict=CONFIRMED
    wrong: `UploadedFileInterface` carries no call signature — it is plain data — yet takes the `Interface` suffix reserved for behavioral interfaces, while its own core twin `MultipartFile` (`core/types.ts:535`) is correctly bare. `PartHeaders.contentType` (`:169`) is a compound member where the entity already supplies the context.
    repair: Rename to `UploadedFile`; rename `PartHeaders.contentType` to `type`. Update `helpers.ts`, `MultipartParser.ts`, and the guide.

### Verification

**Judge (DRIFT-RESHAPE/high):** Both lanes agree the suffix half is real, and it is: `UploadedFileInterface` declares data members and no call signature, the core twin `MultipartFile` is bare, and the guide's `## Methods` section enumerates the behavioral seams — `AssetSourceInterface`, `SessionControlInterface`, `SessionStoreInte

**Lane DRIFT-RESHAPE/medium:** amend: rename `UploadedFileInterface` to `UploadedFile` as proposed, but rename `PartHeaders.contentType` to `mime`, matching `MultipartFile.mime` (core/types.ts:539), not to `type`

**Lane DRIFT/high:** stands

## s11-19 — DRIFT

19. package=middleware file=/home/user/fleet/middleware/src/core/helpers.ts:190-193 rule=AGENTS.md § Non-negotiable rules ("ALWAYS define reusable and public types in `*/types.ts` before implementation") verdict=CONFIRMED
    wrong: Public signatures declare their types inline instead of in `types.ts`, and one of them re-declares a type that already exists there. `resolveForwardedFor`'s `trust` parameter (`:192`) is a verbatim copy of `ForwardedOptions` (`types.ts:178-180`). Further inline declarations: `compressResponse`'s options bag (`:424-432`), `sessionExpired`'s `cursors` and `limits` (`:637-639`), `snapshotSession`'s return type (`:665-668`), `createDatabaseSessionStore`'s options (`factories.ts:143`), `MemorySessionStore`'s entry shape written twice (`stores/MemorySessionStore.ts:37` and `:104`), and `DatabaseSessionStore`'s constructor options (`stores/DatabaseSessionStore.ts:50`).
    repair: Declare each in `src/core/types.ts` — `ForwardedOptions` reused directly for `trust`, plus `CompressResponseOptions`, `SessionCursors`, `SessionLimits`, `SessionSnapshot`, `SessionEntry`, and one `SessionStoreOptions` shared by both stores — and reference them from the signatures.

## s11-20 — DRIFT

20. package=middleware file=/home/user/fleet/middleware/src/core/helpers.ts:665-672 rule=.claude/rules/typescript.md § Types ("Public collection properties and return types use `readonly T[]`, `ReadonlyMap<K, V>`") verdict=CONFIRMED
    wrong: `snapshotSession` returns `{ readonly id: string; readonly data: Record<string, unknown> }` — the `data` record is publicly returned and mutable.
    repair: Type the returned member `Readonly<Record<string, unknown>>` on the `SessionSnapshot` interface finding 19 introduces.

## s11-21 — DRIFT-RESHAPE

21. package=middleware file=/home/user/fleet/middleware/src/core/stores/MemorySessionStore.ts:107-110 rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: The conditional-spread that assembles `{ ttl?, lifetime? }` from two `number | undefined` fields is written identically at `MemorySessionStore.ts:107-110` and `DatabaseSessionStore.ts:62-65`; `buildClientInfo` (`core/helpers.ts:590`) is a third instance of the same idiom.
    repair: Change `sessionExpired`'s third parameter to two optional `number | undefined` arguments so both call sites pass `this.#ttl, this.#lifetime` directly, and delete the spread at all three sites.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: declare `SessionLimits { readonly ttl?: number | undefined; readonly lifetime?: number | undefined }` in `src/core/types.ts` (the type finding 19 already introduces) and type `sessionExpired`'s third parameter with it, so both stores pass `{ ttl: this.#ttl, lifetime: this.#lifetime }` directly under `exactOptionalPropertyTypes`; leave `buildClientInfo` out of scope

**Lane DRIFT-RESHAPE/medium:** amend: keep the named limits bag (the `SessionLimits` type s11-19 introduces) and declare its members `readonly ttl?: number | undefined` and `readonly lifetime?: number | undefined`, so both stores can pass `{ ttl: this.#ttl, lifetime: this.#lifetime }` directly under `exactOptionalPropertyTypes`. Delete the conditional spread at MemorySessionStore.ts:107-110 and DatabaseSessionStore.ts:62-65 only; leave `buildClientInfo` as it is.

## s11-22 — DRIFT-RESHAPE

22. package=middleware file=/home/user/fleet/middleware/src/core/helpers.ts:636 rule=.claude/rules/names.md § Standalone helpers ("default to `{verb}{Noun}`") and § Fixed derivation/construction forms verdict=CONFIRMED
    wrong: Four helper names break their own project-wide forms. `sessionExpired` is a predicate named noun-first rather than `is*`. `multipartBoundary` (`server/helpers.ts:340`) is a coercer returning `string | undefined` named as a bare noun. `detectMIME` (`server/helpers.ts:286`) infers a value from data while `detectEncodings` (`core/helpers.ts:236`) probes a runtime capability, so the `detect*` prefix carries two meanings. The parameter and field named `is` (`factories.ts:142`, `DatabaseSessionStore.ts:43,49`) is a verb fragment where a noun belongs.
    repair: Rename to `isSessionExpired`; rename `multipartBoundary` to `parseMultipartBoundary` and move it to a new `src/server/parsers.ts`; rename `detectMIME` to `inferMIME` and move it to `src/server/inferers.ts`, leaving `detect*` to mean runtime probing alone; rename the guard parameter and field to `guard`.

### Verification

**Judge (DRIFT-RESHAPE/medium):** Every one of the four names is real drift and I confirmed each at its line: `sessionExpired` is a predicate named noun-first among `isPreflight`, `isBufferingIneligible`, `isCompressionNegotiated`, `isSession`, `isSessionControl`, `isMultipartFile`, and `isMultipartBody` in the same file; `multipart

**Lane DRIFT-RESHAPE/medium:** amend: rename `sessionExpired` to `isSessionExpired`; rename `multipartBoundary` to `parseMultipartBoundary` and move it to a new `src/server/parsers.ts`; rename the guard parameter and field to `guard` (the fleet's form); and rename `detectEncodings` — not `detectMIME` — to a probe-sense name, keeping `detect*` meaning infer-from-data as `msg`'s `detectFormat` fixes it

**Lane DRIFT/medium:** stands

## s11-23 — DRIFT-RESHAPE

23. package=middleware file=/home/user/fleet/middleware/src/core/middlewares.ts:889 rule=.claude/rules/architecture.md § Middleware ("Place middleware factories in `middlewares.ts` as `createX(options): Middleware`") verdict=CONFIRMED
    wrong: `only` and `except` (`:914`) both return a `MiddlewareHandler` from `middlewares.ts` but take neither the `create*` form that rule fixes nor a verb-first helper name; every sibling in the file is `create{Noun}`.
    repair: Rename to `createOnly` and `createExcept`, or to `createScoped(paths, handler, { invert })` if the pair is better expressed as one factory. Update the guide fences at both call sites.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The naming defect is real. `only` and `except` are an adverb and a preposition exported as top-level names of `@orkestrel/middleware` through `export * from './middlewares.js'`, against every `create{Noun}` sibling in the file, and neither is unmistakable in the way names.md:89's `delay`, `clamp`, `

**Lane DRIFT/medium:** stands

**Lane DRIFT-RESHAPE/medium:** amend: keep the pair split and rename in place to the file's own form — `createOnly` and `createExcept` — updating `src/core/index.ts`, the guide's surface rows, and the fences at both call sites. Reject the `createScoped(paths, handler, { invert })` option.

## s11-24 — DRIFT-RESHAPE

24. package=middleware file=/home/user/fleet/middleware/src/core/types.ts:435-436 rule=AGENTS.md § Design laws ("Mechanism, not product policy") and .claude/rules/names.md § General vocabulary ("Booleans read as assertions") verdict=CONFIRMED
    wrong: `SessionOptions.require` renders a 404 and `SessionOptions.ends` answers a `DELETE` with 204 — both are route decisions the consuming application owns, installed inside a session mechanism. Both are also named as present-tense verbs rather than as assertions, unlike `policy` and `weak` elsewhere in the package.
    repair: Keep `require` as a boolean renamed to an assertion (`required`) since refusing a sessionless request is still session mechanism; remove `ends` and let the consumer mount its own `DELETE` handler over `control.destroy()`, or rename it and document that it installs a route.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The subjective lane is right on both halves, and the defect it found while hunting is real — I confirmed it at the line. The `ends` branch tests `context.method === 'DELETE'` alone, with no path scoping, so a consumer who mounts the session battery globally with `ends: true` loses every DELETE route

**Lane DRIFT/medium:** stands

**Lane DRIFT-RESHAPE/medium:** amend: rename `require` to `required`, and take only the removal option for `ends` — delete the option and its DELETE short-circuit at core/middlewares.ts:735,743-746, and document in `guides/middleware.md` that a consumer mounts its own DELETE handler over `control.destroy()`. Strike the rename-and-document alternative.

## s11-25 — DRIFT

25. package=middleware file=/home/user/fleet/middleware/src/server/types.ts:79 rule=.claude/rules/patterns.md § Options ("Group related settings beneath the configured entity noun; every leaf is one word") verdict=CONFIRMED
    wrong: `StaticOptions.fallback?: boolean | { readonly exclude?: string }` overloads one key with a switch and a config, so `fallback: true` and `fallback: {}` mean the same thing by two spellings and the reader has to know which.
    repair: Make it `fallback?: { readonly exclude?: string }`, with absence meaning off and `{}` meaning on with the default exclusion; drop the boolean arm.

## s11-27 — DRIFT

27. package=middleware file=/home/user/fleet/middleware/src/core/stores/DatabaseSessionStore.ts:47-56 rule=AGENTS.md § Design laws ("One concept, one term") verdict=CONFIRMED
    wrong: Two implementations of one interface disagree on their construction contract. `MemorySessionStore`'s constructor validates every option and throws six distinct `TypeError`s (`MemorySessionStore.ts:44-70`); `DatabaseSessionStore` validates nothing, so the same malformed `ttl` is refused by one store and silently accepted by the other.
    repair: Extract the shared `ttl`/`lifetime` validation into one exported helper and call it from both constructors.

## s11-28 — DRIFT

28. package=middleware file=/home/user/fleet/middleware/src/core/types.ts:22 rule=.claude/rules/typescript.md § Comments and API documentation ("Document an options object as one `@param`") verdict=CONFIRMED
    wrong: `@param options - See fields below` is written on interface declarations, which take no parameter, at `core/types.ts:22,57,70,100,137,155,185,197,217,401,443,459,471,503` and `server/types.ts:44,55,109,204`. The tag belongs on the function that receives the bag, not on the bag's own declaration, and "See fields below" states nothing the reader could not see.
    repair: Delete the `@param` line from every interface; keep the `@remarks` field list, and let the `@param options` on `createBoundary`, `createTelemetry`, and their siblings carry the link.

## s11-29 — DRIFT

29. package=middleware file=/home/user/fleet/middleware/src/core/types.ts:20 rule=.claude/rules/typescript.md § Comments and API documentation ("The first sentence states what the symbol does in the third person with an `-s` verb") verdict=CONFIRMED
    wrong: The TSDoc first sentence is imperative rather than third person across the package's function exports — `Derive` (`core/helpers.ts:26`), `Build` (`:55,73,92`), `Walk` (`:166`), `Determine` (`:478,500,517,537,561`), `Copy` (`:461`), `Snapshot` (`:647`), `Rebuild` (`:675`), `Create` (`factories.ts:27,65,95,120`), `Scope` (`middlewares.ts:876,901`), `Narrow` (`server/errors.ts:52`), `Resolve` (`server/helpers.ts:358,377`), `Parse` (`:394`), `Stream-parse` (`:430`) — against a small third-person minority. Reported as one finding per the dispatch instruction.
    repair: Rewrite each first sentence in the third person with an `-s` verb — `Derives`, `Builds`, `Walks`, `Checks whether`, `Copies`, `Snapshots`, `Rebuilds`, `Creates`, `Scopes`, `Parses` — and never repeat the symbol's name.

## s11b-02 — DRIFT-RESHAPE

2. package=middleware file=/home/user/fleet/middleware/src/core/middlewares.ts:741 rule=.claude/rules/patterns.md § Foreign contracts verdict=CONFIRMED
   wrong: `createSession` dereferences `session.id` (lines 744, 785, 789, 792) and `session.data` (through `transferSessionData` at 770) from whatever a consumer-supplied `SessionStoreInterface.get` returned, without validating it and without the seam stating any obligation — `SessionStoreInterface`'s TSDoc (`src/core/types.ts:352-357`) documents only async-ness and `delete` no-op semantics, and `SessionOptions.store` (`src/core/types.ts:405`) states no shape requirement, while the package ships `isSession` for exactly this shape.
   repair: State the obligation on the interface that owns it — add to `SessionStoreInterface`'s `@remarks` in `src/core/types.ts` that `get` must resolve a value satisfying `isSession` or `undefined`, and that `createSession` dereferences `id` and `data` without re-checking. Alternatively narrow at line 741 with `isSession` and treat a failing value as `undefined`.

### Verification

**h12 ruling:** see the h12 verdict appendix at the end of this dossier for the amended or reshaped repair.

## s11b-04 — DRIFT-RESHAPE

4. package=middleware file=/home/user/fleet/middleware/src/server/middlewares.ts:233 rule=.claude/rules/architecture.md § System constraints (centralize any pattern repeated twice) verdict=CONFIRMED
   wrong: The canonical-root memo line `if (canonicalRootPromise === undefined) canonicalRootPromise = realpath(root)` appears verbatim three times (233, 258, 307), each wrapped in the same `Promise.all([canonicalRootPromise, realpath(candidate)])` plus `isContainedPath` block, so one containment rule is written three times inside one handler.
   repair: Resolve the memo once at the top of the returned handler with `const rootReal = await (canonicalRootPromise ??= realpath(root))`, and extract the shared `realpath` + containment step into `resolveContainedRealPath(candidate: string, rootReal: string): Promise<string | undefined>` in `src/server/helpers.ts`, returning `undefined` for both an escape and a `realpath` failure. Use it at the two sites that already treat those outcomes identically (258-267 and 307-313); keep the explicit branch at 233-239, which deliberately distinguishes an escape (`next()`) from a `realpath` failure (`fallbackNeeded`).

### Verification

**h12 ruling:** see the h12 verdict appendix at the end of this dossier for the amended or reshaped repair.

## s11b-05 — DRIFT

5. package=middleware file=/home/user/fleet/middleware/src/server/middlewares.ts:246 rule=.claude/rules/typescript.md § Types; AGENTS.md § Design laws (one concept, one term) verdict=CONFIRMED
   wrong: Line 246 spells the file-stat type as `Awaited<ReturnType<typeof stat>>` while line 271 names the same type as `Stats`, already imported at line 8; line 418 does the same with `Awaited<ReturnType<typeof parseMultipartRequest>>` where `MultipartBody | undefined` is the declared return type and `MultipartBody` is exported from `@src/core`, which this file already imports from at lines 1 and 10.
   repair: Write `let directoryInfo: Stats | undefined` at line 246 and `let body: MultipartBody | undefined` at line 418, adding `MultipartBody` to the existing `import type { MultipartState } from '@src/core'` declaration.

### Verification

**h12 ruling:** see the h12 verdict appendix at the end of this dossier for the amended or reshaped repair.

## s11b-06 — DRIFT

6. package=middleware file=/home/user/fleet/middleware/src/server/middlewares.ts:475 rule=.claude/rules/architecture.md § Centralized-file pattern, § Kind purity verdict=CONFIRMED
   wrong: The node face's fixed coding set is an inline array literal in the factory body, duplicating the exact value of `DEFAULT_COMPRESSION_ENCODINGS` (`src/core/constants.ts:25`), while the line above it (473) reads its threshold default from `constants.ts` — so one file both centralizes and inlines the same kind of datum, and the value the TSDoc and `NodeCompressionOptions` remarks both quote has no named home.
   repair: Add `export const NODE_COMPRESSION_ENCODINGS: readonly Encoding[] = Object.freeze(['gzip', 'deflate'])` to `src/server/constants.ts` with a TSDoc naming it the codings `node:zlib` guarantees, import it at line 30, and replace the literal at 475.

### Verification

**h12 ruling:** see the h12 verdict appendix at the end of this dossier for the amended or reshaped repair.

## s11b-07 — DRIFT

7. package=middleware file=/home/user/fleet/middleware/src/server/middlewares.ts:207 rule=.claude/rules/architecture.md § Centralized-file pattern verdict=CONFIRMED
   wrong: `const dotfiles = options.dotfiles ?? 'ignore'` inlines a documented default (`src/server/types.ts:63-65`, `guides/middleware.md:110`) as a bare literal, while the line above it and the lines below it read `DEFAULT_STATIC_INDEX` and `DEFAULT_STATIC_FALLBACK_EXCLUDE` from `constants.ts`, and `src/server/constants.ts`'s own banner states that constants are centralized, never inlined.
   repair: Add `export const DEFAULT_STATIC_DOTFILES = 'ignore'` to `src/server/constants.ts`, typed `StaticOptions['dotfiles']`, import it, and use it at line 207. Point the `dotfiles` remark in `src/server/types.ts` at it, as the sibling remarks already do.

### Verification

**h12 ruling:** see the h12 verdict appendix at the end of this dossier for the amended or reshaped repair.

## s11b-09 — DRIFT

9. package=middleware file=/home/user/fleet/middleware/src/server/MultipartParser.ts:226 rule=.claude/rules/typescript.md § Immutability verdict=CONFIRMED
   wrong: `parse()` returns `this.#files` and `this.#fields` themselves rather than copies, and `Object.freeze` reaches only those two objects — every `MultipartFile[]` value inside `files` is the parser's own live array, so a consumer holding `context.state.multipart.files['avatar']` can push or pop at runtime despite the `readonly MultipartFile[]` declaration, and the freeze permanently seals the parser's own private fields. The package already freezes each leaf record (`src/server/helpers.ts:503`), so the middle layer is the only unfrozen one.
   repair: Build the return value as a fresh null-prototype record whose every value is `Object.freeze([...records])`, freeze that record and a fresh copy of `#fields`, and return those instead of the internal fields.

### Verification

**h12 ruling:** see the h12 verdict appendix at the end of this dossier for the amended or reshaped repair.

## s11b-10 — DRIFT-RESHAPE

10. package=middleware file=/home/user/fleet/middleware/src/server/MultipartParser.ts:80 rule=.claude/rules/architecture.md § Functions and orchestration, § System constraints verdict=CONFIRMED
    wrong: `parse()` inlines the entire state machine in one 150-line method — preamble scan, boundary loop, header-block read, file-part streaming, field-part accumulation, and trailing-boundary consume — and the delimiter-scan-with-carry loop is written twice with near-identical bodies (118-145 for files, 189-208 for fields), differing only in where the bytes go. The per-file limit check is also written twice (108-111 and 153-157) for the two branches that decide whether an empty-filename part counts.
    repair: Extract `#consumeFile(name, filename, delimiter)` and `#consumeField(name, delimiter)` as `#` private methods called from the part loop, and lift the shared scan step into one `#scan(delimiter): Promise<number>` private method that carries back the partial tail and pulls. Move the file-count increment to a single site after the body is read, once the empty-filename no-op case has been decided.

### Verification

**h12 ruling:** see the h12 verdict appendix at the end of this dossier for the amended or reshaped repair.

## s11b-11 — DRIFT-RESHAPE

11. package=middleware file=/home/user/fleet/middleware/src/server/MultipartParser.ts:174 rule=.claude/rules/documentation.md § Parity verdict=CONFIRMED
    wrong: `mime: detected ?? declared` stores the client-declared `Content-Type` whenever magic-byte sniffing finds no signature and no `allowed` list is configured, but `UploadedFileInterface`'s remark (`src/server/types.ts:152`) documents `mime` as "the SNIFFED (magic-byte-detected) MIME type" and `detectMIME`'s TSDoc (`src/server/helpers.ts:274-276`) calls it "SNIFF-AUTHORITATIVE ... never the declared `Content-Type`". A consumer reading `file.mime` as the sniffed fact receives an attacker-supplied string.
    repair: Write `mime: detected ?? DEFAULT_CONTENT_TYPE` at line 174, so an unsniffable file reports `application/octet-stream` rather than the declared value; `validated` at line 160 already carries the sniffed-versus-declared agreement separately. `DEFAULT_CONTENT_TYPE` is already imported at line 9.

### Verification

**h12 ruling:** see the h12 verdict appendix at the end of this dossier for the amended or reshaped repair.

## s11b-12 — DRIFT

12. package=middleware file=/home/user/fleet/middleware/src/server/MultipartParser.ts:161 rule=.claude/rules/documentation.md § Parity verdict=CONFIRMED
    wrong: `guides/middleware.md:436-438` states "A declared `Content-Type` whose SNIFFED (magic-byte) bytes disagree is rejected `415`, as is a signature-less declared type on an `allowed` list", but rejection at lines 161-165 happens only inside `if (this.#allowed !== undefined)` and only when the sniffed type is absent from that list. With no `allowed` list, a declared/sniffed disagreement is never a 415 — it produces `validated: false` and a normal response. Even with an `allowed` list, a file whose sniffed type is on the list is accepted regardless of what it declared.
    repair: Rewrite `guides/middleware.md:436-438` to the shipped rule — type rejection applies only when `allowed` is configured; a file whose sniffed bytes detect no type on the list is rejected `415`, and a signature-less file is always rejected because sniffing cannot place it on the list; a declared `Content-Type` disagreeing with the sniffed type is reported as `validated: false`, never rejected on its own.

### Verification

**h12 ruling:** see the h12 verdict appendix at the end of this dossier for the amended or reshaped repair.

## s11b-13 — DRIFT-RESHAPE

13. package=middleware file=/home/user/fleet/middleware/src/server/MultipartParser.ts:149 rule=.claude/rules/architecture.md § System constraints (centralize any pattern repeated twice); AGENTS.md § Design laws (absence is `undefined`) verdict=CONFIRMED
    wrong: The discard sequence `await unlink(path); this.#staged.splice(this.#staged.indexOf(path), 1)` is written twice (149-151 for the empty-filename no-op, 166-168 for the dangerous-key drop), and both copies feed `indexOf`'s `-1` straight into `splice`, where it silently removes the last staged entry instead of the intended one.
    repair: Extract one `async #discard(path: string): Promise<void>` private method that unlinks best-effort and removes the entry only when `indexOf` returns a non-negative index, and call it from both sites.

### Verification

**h12 ruling:** see the h12 verdict appendix at the end of this dossier for the amended or reshaped repair.

## s11b-14 — DRIFT

14. package=middleware file=/home/user/fleet/middleware/src/server/helpers.ts:166 rule=.claude/rules/architecture.md § System constraints (centralize any pattern repeated twice); AGENTS.md § Design laws (one concept, one term) verdict=CONFIRMED
    wrong: `resolveStaticPath` closes with a hand-rolled `resolved === root || resolved.startsWith(\`${root}${sep}\`)` containment test, while `isContainedPath` sits fifty lines earlier in the same file (line 116) and its own TSDoc (lines 100-104) names precisely this technique as the wrong one. The two implementations also disagree on win32, where `path.relative` case-folds and a raw prefix comparison does not, so the traversal guard and the realpath guard apply different containment rules to the same root.
    repair: Replace line 166-167 with `return isContainedPath(resolved, root) ? resolved : undefined`.

### Verification

**h12 ruling:** see the h12 verdict appendix at the end of this dossier for the amended or reshaped repair.

---

# Appendix: h12 verdict (middleware s11b supplement)

# Verdict: h12 (s11b middleware completion findings), verification round 2 supplement

Two blind Opus lanes (objective, subjective) re-ruled all s11b findings from primary evidence;
lane outputs are `instruments`-adjacent at `/home/user/work/h12-{obj,subj}-verdicts.json` and
reproduced in the lane transcripts. The lanes converged on substance for every finding; the
Orchestrator reconciled the label disagreements (s11b-01, -03, -15, -16), each of which both
lanes agreed required no code change.

## Final rulings

- **DRIFT, repair stands**: s11b-05 (two spellings of one type in one function), s11b-09
  (live mutable arrays returned under a readonly declaration; the leaf record and the package's
  own test fixture freeze, the shipped middle layer does not), s11b-12 (guide states a 415
  rejection rule the code, its TSDoc, and a pinning test all contradict — the guide moves),
  s11b-14 (a second containment implementation in the same file whose sibling's TSDoc argues
  against exactly that technique; diverges on win32 case folding).
- **DRIFT, repair amended**: s11b-06 and s11b-07 (both defaults centralize into
  `src/server/constants.ts`; the amendment adds the guide Constants rows parity requires, and
  types the dotfiles constant `NonNullable<StaticOptions['dotfiles']>`).
- **DRIFT-RESHAPE** (defect real, original repair corrected): s11b-02 (documentation-only:
  state the `get` shape obligation on `SessionStoreInterface`; do not add a second guard —
  validation deliberately lives in the store, per `createDatabaseSessionStore(table, isSession)`),
  s11b-04 (extract `resolveContainedRealPath`, but keep the `realpath` memo inside each `try` —
  the proposed hoist would break the documented never-throws contract), s11b-10 (extract
  `#consumeFile`/`#consumeField`; a shared scan only if parameterized by sink so file bytes
  still drain to disk; keep the pre-read file-count increment that trips the limit before
  staging), s11b-11 (fix the prose at both sites: `mime` is sniffed-else-declared-else-default
  and `validated` reports which; the proposed code change would discard the declared type for
  every unsniffable upload), s11b-13 (extract `#discard` with the guarded unlink `#cleanup`
  already uses; the `indexOf(-1)` hazard is latent, not live — `randomUUID` paths are unique).
- **EXCEPTION**: s11b-03 (CSRF cookie attributes are deliberate and test-pinned;
  `httpOnly: false` is load-bearing for double-submit, `Path=/` widens rather than narrows, and
  the proposed `cookie` option collides with the shipped name key; optionally document the fixed
  attributes).
- **INVALID**: s11b-01 (the function-declaration ban enumerates function bindings, not
  object-literal methods, and `test/src/server/factories.ts:67` is shipped fleet precedent for
  an interface-typed literal; the internal intent flags are not consumer-addressed state),
  s11b-08 (the "three stores that can disagree" mechanism is unreachable — both byte maps are
  written in the single miss branch and the tag map memoizes a derivation), s11b-15 (no cited
  rule reaches the signature; the name already satisfies `{verb}{Noun}` and the sibling resolver
  shares the shape; the call-site wasted-work note is an optional cleanup), s11b-16 (the
  centralization rule governs module-scope declarations; the signature set is documented in
  TSDoc and `matchesBytes` is the extracted, exported, tested reusable part).

The original auditor ruled all s11b findings CONFIRMED; verification upheld eleven (five with
corrected repairs), granted one deliberate exception, and invalidated four. The objective
referrals from s11b (asset-cache growth, `#staged` reachability, SPA fallback header asymmetry)
remain open for the consolidated referral pass.

