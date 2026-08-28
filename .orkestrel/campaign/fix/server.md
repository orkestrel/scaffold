# Fix dossier: server

Verified fix-producing findings for the `server` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s14-01 — DRIFT-RESHAPE

1. package=server file=`/home/user/fleet/server/src/server/helpers.ts:1246-1297` rule=`.claude/rules/architecture.md` § Centralized-file pattern, § Kind purity verdict=CONFIRMED
   wrong: `openStream` is an entity factory returning a live implementation of the published behavioral interface `StreamInterface`, but it lives in `helpers.ts` and builds the entity as an object literal whose `get closed`, `write`, `comment`, `drain`, and `end` bodies are functions declared inside the function body, so the package's only class-free behavioral interface is also the only one with no implementation file — `NegotiatorInterface` gets `Negotiator.ts` and `ServerInterface` gets `Server.ts`.
   repair: add `src/server/streams/Stream.ts` holding a `Stream` class implementing `StreamInterface` with `#` fields for the controller, encoder, closed flag, and wakeup; move the construction to `factories.ts` as `createStream(options?: StreamOptions): StreamInterface`; delete `openStream` and `enqueueStreamText` (helpers.ts:1196-1204), whose `controller`/`closed` parameters exist only to thread the closure state a class holds in fields; update `guides/server.md:117` and its Methods section, which already documents `StreamInterface` under `## Methods` while its parity sentence at line 176 names only `Negotiator` and `Server` as implementing classes.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: put the class at `src/server/Stream.ts` (flat, matching `Negotiator.ts` and `Server.ts`), not `src/server/streams/Stream.ts`; add `createStream` to `factories.ts`; delete `openStream` and `enqueueStreamText` together with guides/server.md rows 116 and 117 and the Methods parity sentence at 176; and scope the unit to update `@orkestrel/mcp` (handlers.ts, middlewares.ts, factories.ts, helpers.ts, MCPSession.ts, types.ts, transports/HTTPDisconnect.ts, transports/HTTPClientTransport.ts, browser/transports/HTTPClientTransport.ts) and `@orkestrel/toolbox` (routes/TerminalRoutes.ts) in the same change, per AGENTS.md "No compatibility shims. This is greenfield. Update every consumer in the same change."

**Lane DRIFT-RESHAPE/high:** amend: move `openStream` into `src/server/factories.ts` renamed `createStream(options?: StreamOptions): StreamInterface`, keeping the closure object-literal body verbatim (precedent: console `createConsoleSink`, middleware `createCookieTransport`). Do NOT add a `Stream` class. Fold `enqueueStreamText` into the moved factory (trivial, single-use per the helpers rule) or keep it exported in `helpers.ts` with a unit test — do not delete it silently. Update guides/server.md rows 116-117 and the parity sentence at :176 to name `StreamInterface` as an interface with no implementing class, the way console's guide treats `SinkInterface`. The rename moves the published surface and earns a version bump.

## s14-02 — DRIFT-RESHAPE

2. package=server file=`/home/user/fleet/server/src/server/Negotiator.ts:45-47` rule=`.claude/rules/architecture.md` § Wrapper test, § Functions and orchestration verdict=CONFIRMED
   wrong: `encoding` exists only to forward 1:1 to the `negotiateEncoding` helper, which the rule forbids for a public class method; its sibling axes `negotiate` (lines 25-43) and `language` (lines 49-63) each compose `parseAcceptHeader` with a scoring leaf inside the method, so one axis of three is a delegate.
   repair: inline the selection loop into `encoding` the way `language` is written — parse once with `parseAcceptHeader`, score each `available` coding with the `codingQuality` leaf, keep the highest — and delete `negotiateEncoding` (helpers.ts:678-694), whose only caller is this method.

### Verification

**Judge (DRIFT-RESHAPE/high):** Both lanes agree the 1:1 forward is real, and the code confirms it. The dispute is decided by one fact: the subjective lane's claim that `negotiateEncoding`'s "only source caller is Negotiator.ts:46" is false. `@orkestrel/middleware` imports it from `@orkestrel/server` in two source files, and `midd

**Lane DRIFT-RESHAPE/high:** amend: inline the parse-and-score loop into `Negotiator.encoding` the way `language` is written, and RETAIN the exported `negotiateEncoding` for its `@orkestrel/middleware` consumers; to avoid the loop existing twice, have the standalone helper and the method share one exported leaf rather than deleting either. Verify the two middleware call sites still typecheck against the retained generic signature.

**Lane DRIFT/medium:** amend: the finding's direction stands (inline the parse + `codingQuality` selection into `Negotiator.encoding` the way `language` is written, delete `negotiateEncoding` at helpers.ts:678). Add the consumers it omits: delete the guide Surface row at guides/server.md:101, delete the `negotiateEncoding` assertions in tests/src/server/helpers.test.ts:555-572 (keep the `codingQuality` cases), and rename tests/src/server/Negotiator.test.ts:72 to name what it proves rather than the helper it used to call. Deleting a published export earns a version bump.

## s14-03 — DRIFT

3. package=server file=`/home/user/fleet/server/src/server/helpers.ts:329-331` rule=`.claude/rules/architecture.md` § Wrapper test verdict=CONFIRMED
   wrong: `appendCookie` is a one-line delegate over the semantically identical platform primitive `Headers.append`, and its own `@remarks` at line 312-315 states the case against it: "`Headers.append` already accumulates repeated headers … so this is a thin, self-documenting wrapper naming the cookie-append intent". Naming intent is not a boundary, invariant, composition, translation, lifecycle, or narrower contract.
   repair: delete `appendCookie`, call `headers.append('set-cookie', cookie)` directly at its two call sites (`writeSignedCookie` line 363, `clearCookie` line 414), and remove its guide Surface row.

## s14-04 — DRIFT-RESHAPE

4. package=server file=`/home/user/fleet/server/src/server/factories.ts:24-26` rule=`.claude/rules/architecture.md` § Wrapper test verdict=CONFIRMED
   wrong: `createNegotiator()` is a zero-argument pass-through over `new Negotiator()`; `Negotiator` takes no constructor arguments and declares no public member outside `NegotiatorInterface`, so the factory narrows nothing and translates nothing. Its `@remarks` ("Prefer this over `new Negotiator()` at call sites that only need the interface") recommends one of two equivalent doors the package publishes for one concept, while `Negotiator`'s own `@example` at Negotiator.ts:19 recommends the other.
   repair: delete `createNegotiator` and its guide Surface row at `guides/server.md:63`; consumers write `new Negotiator()`, which the class `@example` already shows. Note for the implementer: `createServer` and `form`'s `createForm` are not in this class — they forward construction arguments — so this repair does not generalize to them; if the fleet wants a uniform factory row, that is a fleet ruling, not a fix to this package.

### Verification

**Judge (DRIFT-RESHAPE/high):** The violation is real and the rule names it by its exact term. EXCEPTION fails: the subjective lane's only proof is sibling-package code, which AGENTS.md ranks below the rules, and its rule_quote governs how a factory is named rather than whether one must exist. But the repair is wrong as written —

**Lane DRIFT-RESHAPE/medium:** amend: fix the documentation conflict in this package now by deleting the "Prefer this over `new Negotiator()`" sentence at factories.ts:10-11 so only one door is recommended; raise the deletion of zero-argument pass-through factories as a fleet ruling covering `createNegotiator`, `createNDJSONParser`, `createANSIRenderer`, `createMemoryDriver`, and `createMemoryConversationStore`, and apply it uniformly rather than in server alone.

**Lane EXCEPTION/high:** drop

## s14-06 — DRIFT

6. package=server file=`/home/user/fleet/server/src/server/constants.ts:90` rule=`.claude/rules/architecture.md` § Kind purity; `.claude/rules/writing.md` § Claims and time verdict=CONFIRMED
   wrong: `COMPRESSIBLE_TYPES` is `new Set([…])` with no `Object.freeze`, while its own `@remarks` at line 88 claims "Frozen so a consumer reads but never mutates the shared default." Every sibling constant in the file is genuinely frozen (`SSE_HEADERS` line 61, `DEFAULT_ENCODINGS` line 116, `REQUEST_ID_PATTERN` line 76), so this is the one that drifted. The policy sweep cannot see it: it reads the declaration, not the value a call returns.
   repair: wrap the initializer as `Object.freeze(new Set([…]))` to satisfy the kind rule, and correct the sentence — `Object.freeze` does not stop `Set.prototype.add`, so the accurate claim is that `ReadonlySet` withholds the mutators from the declared type. Apply the same wording correction wherever the file repeats the "Frozen so a consumer can read but never mutate" phrase over a `Set`.

## s14-07 — DRIFT-RESHAPE

7. package=server file=`/home/user/fleet/server/src/server/types.ts:495`, `:498-500`, `:608` rule=`AGENTS.md` § Non-negotiable rules (readonly); `.claude/rules/typescript.md` § Types verdict=CONFIRMED
   wrong: one request-fact record is written inline three times in public declarations — `ServerEventMap.error`'s `request?: { method: string; url: URL }`, `ServerEventMap.response`'s `event: { method: string; pathname: string; status: number; ms: number }`, and `ServerOptions.report`'s `request?` parameter (mirrored again on the private field at Server.ts:94) — and none of their members is `readonly`, while every declared interface in the same file (`AcceptEntry`, `ConnectionInfo`, `CookieOptions`) is fully readonly. A public type also repeated verbatim belongs in `types.ts` as one named declaration.
   repair: declare `export interface RequestFacts { readonly method: string; readonly url: URL }` in `types.ts` and reference it from `ServerEventMap.error`, `ServerOptions.report`, and `Server`'s `#report` field. Fold the `response` payload into finding 8's repair rather than naming a second record.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: declare the singular `export interface RequestLine { readonly method: string; readonly url: URL }` in types.ts (or another singular `{Entity}{Noun}` name — never `RequestFacts`, which names.md § Type-level identifiers forbids as a pluralized type name), and reference it from `ServerEventMap.error`, `ServerOptions.report`, and `Server.ts:94`'s `#report` field. Fold the `response` payload into s14-08's repair as the finding says.

**Lane DRIFT-RESHAPE/high:** amend: declare one named singular readonly interface in `types.ts` — for example `export interface RequestOrigin { readonly method: string; readonly url: URL }` — and reference it from `ServerEventMap.error` (types.ts:495), `ServerOptions.report` (types.ts:608), and `Server`'s `#report` field (Server.ts:94). Do not name it `RequestFacts`; names.md bans a pluralized type name, and bare `Request` collides with the fetch global. The `response` payload is covered by finding s14-08's reshape, which names its own type rather than flattening it.

## s14-08 — DRIFT-RESHAPE

8. package=server file=`/home/user/fleet/server/src/server/types.ts:498-500` rule=`.claude/rules/patterns.md` § Event maps verdict=CONFIRMED
   wrong: `response` publishes a single-element tuple wrapping an object, while `start`, `request`, `upgrade`, and `drain` all use labeled tuple elements as the rule prescribes. One event map carries two payload conventions.
   repair: declare `readonly response: readonly [method: string, pathname: string, status: number, ms: number]` and update the two emit sites (Server.ts:305-310 and Server.ts:324-329) to positional arguments. This also removes the non-readonly object finding 7 names.

### Verification

**Judge (DRIFT-RESHAPE/high):** The finding's stated violation is a misread on both sides. The code: `response` does use a labeled tuple element, and `error` at :495 carries an object payload too, so the map does not split into a conforming group and one outlier. The rule: the quoted sentence asks for labeled tuple elements and sa

**Lane DRIFT/medium:** stands

**Lane DRIFT-RESHAPE/medium:** amend: keep the single labeled object element. Make its members readonly and lift it into `types.ts` as one named declaration — for example `export interface ResponseRecord { readonly method: string; readonly pathname: string; readonly status: number; readonly ms: number }` — referenced as `readonly response: readonly [event: ResponseRecord]`. Do not flatten to a four-element tuple; leave Server.ts:305-310, :324-329 and Server.test.ts:896, :928 unchanged. This closes the `response` half of finding s14-07 without a second inline record.

## s14-09 — DRIFT-RESHAPE

9. package=server file=`/home/user/fleet/server/src/server/types.ts:2-3`, `:194-196`, `:434-437`, `:449`, `:461`, `:508`, `:514`, `:595-596`; `errors.ts:1`, `:3`, `:51`; `constants.ts:3-8`, `:73`; `Server.ts:37`, `:77`; `helpers.ts:29-41`, `:116-138`, `:246`, `:342`, `:417-438`, `:479-481`, `:533`, `:578`, `:815`, `:951`, `:1023`, `:1144-1145`, `:1299` rule=`.claude/rules/writing.md` § Code tokens, references, and links; `AGENTS.md` § Writing verdict=CONFIRMED
   wrong: source comments and TSDoc cite `AGENTS §5`, `§10`, `§12`, `§13`, `§14`, `§4.3`, `§4.4`, `§21`, `§22`, and `§11`. The current `AGENTS.md` carries no numbered sections — its headings are named ("Design laws", "Non-negotiable rules", "TTTDD") — so every one of these resolves to nothing, and a reader cannot check the claim the citation is meant to support. The same comments cite "§5.1 of the proposal", "PROPOSAL §4", and "Appendix A of the proposal", none of which is a file in this repository, and `types.ts:1-18` and `errors.ts:1-7` describe "the future `@orkestrel/middleware` package" that does not exist. Ruled by sense, the `RFC 7232 §2.3.2` citations at `helpers.ts:816`, `:849`, and `:866` are legitimate external-spec references and are not part of this finding.
   repair: replace each `AGENTS §N` with the named section (`AGENTS.md` § Design laws, § Non-negotiable rules) or delete the citation where the sentence stands without it; delete every "proposal"/"PROPOSAL"/"Appendix A" reference and the speculative `@orkestrel/middleware` prose, which `.claude/rules/typescript.md` § Comments and API documentation bars as documented future product behavior.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: keep the AGENTS §N and proposal-citation repair as written — replace each `AGENTS §N` with the named section or delete the citation where the sentence stands without it, and delete every "proposal"/"PROPOSAL"/"Appendix A" reference. Do NOT delete the `@orkestrel/middleware` prose at types.ts:8 and errors.ts:7: the package ships at 0.0.18 and consumes this one, so rewrite those sentences in the present tense per writing.md § Claims and time instead.

**Lane DRIFT-RESHAPE/high:** amend: replace each `AGENTS §N` with the named section (`AGENTS.md § Design laws`, `§ Non-negotiable rules`) or delete the citation where the sentence stands without it, and delete every `proposal` / `PROPOSAL` / `Appendix A` reference. Do NOT delete the `@orkestrel/middleware` prose at types.ts:8 and errors.ts:7 — the package exists at 0.0.18. Drop the word `future` and state the present fact, which is what writing.md § Claims and time requires.

## s14-11 — DRIFT

11. package=server file=`/home/user/fleet/server/src/server/Server.ts:198` rule=`.claude/rules/typescript.md` § Errors and outcomes verdict=CONFIRMED
    wrong: `start()` rejects a wrong-state call with a bare `new Error(...)`, which carries no machine-readable `code` and no guard, so a caller cannot tell it from any other rejection. This is a programmer error and the package already owns an errors file. The `TypeError` throws in the constructor (lines 114-138) are the same class of thing but are documented as the contract at `types.ts:586` — record those as EXEMPT with that pointer.
    repair: add a `code`-bearing error class to `errors.ts` for a lifecycle refusal, with its `is*` guard beside `isHTTPError`, and reject with it; document the code on `ServerInterface.start`.

## s14-12 — DRIFT-RESHAPE

12. package=server file=`/home/user/fleet/server/src/server/helpers.ts:650`, `:769`, `:1091`, `:1140` rule=`.claude/rules/names.md` § Standalone helpers, § Value-level identifiers verdict=CONFIRMED
    wrong: `codingQuality`, `languageQuality`, `ipv6Network`, and `clientRateKey` are noun phrases, and the rule fixes `{verb}{Noun}` for a module helper, permitting a bare one-word name only where meaning and arguments are unmistakable. The same file names its other leaves correctly (`computeBodyETag`, `mergeVary`, `resolveOrigin`, `matchMediaType`), so the vocabulary is inconsistent within one file.
    repair: rename to `computeCodingQuality`, `computeLanguageQuality`, `computeIPv6Network`, and `computeRateKey`, matching the `compute*` meaning the rule fixes ("calculates deterministically") and the file's existing `computeBodyETag`; update the call sites in `Negotiator.ts` and `helpers.ts`.

### Verification

**Judge (DRIFT-RESHAPE/high):** The violation is real and neither lane disputes it: four two-word noun phrases where the rule fixes `{verb}{Noun}`, in a file whose other leaves already conform. The repair is wrong twice. It renames `clientRateKey` to `computeRateKey`, dropping the qualifier that names whose key it is, and it scope

**Lane DRIFT-RESHAPE/high:** amend: rename to `computeCodingQuality`, `computeLanguageQuality`, and `computeIPv6Network` as written, but keep the qualifier on the fourth — `computeClientRateKey`, matching the three-word `computeBodyETag` precedent in the same file. Scope the unit to update guides/server.md rows 113 and 114 and, for the fourth name only, `@orkestrel/middleware` (src/core/helpers.ts:13 and its call site) plus middleware's vendored guides/server.md mirror, in the same change.

**Lane DRIFT/high:** amend: the renames stand (`computeCodingQuality`, `computeLanguageQuality`, `computeIPv6Network`), but prefer `computeClientKey` over `computeRateKey` for helpers.ts:1140 — the finding's form drops the `client` qualifier that names whose key it is, and the helper's whole purpose is collapsing a client address to a bucket. Add the consumers the finding omits: these are published exports, so the guide Surface rows in guides/server.md and the `describe` titles in tests/src/server/helpers.test.ts (including the `codingQuality / negotiateEncoding` block at :555) move with them, and the rename earns a version bump.

## s14-13 — DRIFT

13. package=server file=`/home/user/fleet/server/src/server/helpers.ts:722-725` rule=`.claude/rules/typescript.md` § Types verdict=CONFIRMED
    wrong: `matchMediaType` returns `{ readonly q: number; readonly rank: number } | undefined`, an unnamed structural type on a public export, repeated on the local `best` binding at line 728. A public return type belongs in `types.ts`.
    repair: declare `export interface MediaMatch { readonly q: number; readonly rank: number }` in `types.ts` beside `AcceptEntry` and use it in the signature and the local binding.

## s14-14 — DRIFT-RESHAPE

14. package=server file=`/home/user/fleet/server/src/server/types.ts:108` rule=`.claude/rules/names.md` § Rejected naming, § Type-level identifiers verdict=CONFIRMED
    wrong: `ConnectionInfo` carries `Info`, one of the generic words the rule rejects; the required form for plain non-behavioral data is `{Entity}`.
    repair: rename to `Connection` and update `ConnectionStateFunction` (types.ts:541), `ServerOptions.state`'s prose, `helpers.ts:293` and `:1131`'s `{@link}` targets, and the guide Surface row.

### Verification

**Judge (DRIFT-RESHAPE/high):** Both lanes agree the rename direction is right and the code confirms it: `Info` is on the rejected-words list, the type is plain non-behavioral data whose required form is the bare entity name, and `Connection` is unoccupied fleet-wide. The dispute is scope, and the objective lane's decisive fact is

**Lane DRIFT-RESHAPE/high:** amend: rename to `Connection` as proposed, and extend the scope to `@orkestrel/middleware` (src/core/types.ts:2 import and :274 use) plus middleware's vendored guides/server.md mirror, and to ALL four server guide sites — guides/server.md:145, :161, :351, :639 — not one Surface row. `ConnectionStateFunction` keeps its own name; only its parameter type changes.

**Lane DRIFT/high:** amend: the rename stands (`ConnectionInfo` → `Connection`, updating `ConnectionStateFunction` at types.ts:541, `ServerOptions.state`'s prose, and the `{@link}` targets at helpers.ts:293 and :1131). Update both guide occurrences, not one: the Surface row and the `ConnectionStateFunction` row at guides/server.md:161. The rename moves the published surface and earns a version bump.

## s14-15 — DRIFT

15. package=server file=`/home/user/fleet/server/src/server/Server.ts:160-162` rule=`.claude/rules/architecture.md` § Class order verdict=CONFIRMED
    wrong: the `#inflight` private getter sits between the constructor and the public getters, so a private member occupies the public-interface position the rule reserves for getters then methods; every other `#` member of the class is below the public surface.
    repair: move `get #inflight()` down to the private block, above `#enter()` at line 475.

## s14-30 — DRIFT-RESHAPE

30. package=server, form, table file=every TSDoc description block in all three `src/` trees rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: the rule fixes the first sentence as third person with an `-s` verb (`Creates`, `Returns`, `Checks whether`). Across all three packages the first sentence takes one of three non-conforming shapes. **Imperative verb** — `form/src/core/errors.ts:13` "Create a form error.", `:28` "Determine whether…"; `form/src/core/helpers.ts:50` "Check whether…", `:111` "Decide whether…", `:166` "Evaluate one field rule…", `:423` "Compute the values…", `:471` "Compare two field values…", `:491` "Extract the names…", `:535` "Resolve and interpolate…", `:552` "Project a schema…", `:667` "Select referenced groups…", `:688` "Audit a structurally valid schema…"; `form/src/core/types.ts:515` "Find one field…", `:522` "Answer several fields…", `:535` "Record that somebody…", `:541` "Fail a field…", `:548` "Take every field…"; `form/src/core/cloners.ts:7` "Clone one form value…"; `form/src/core/parsers.ts:16` "Parse unknown wire data…"; `form/src/core/factories.ts:5` "Open a form…"; `table/src/core/helpers.ts:35` "Find one column…", `:46` "Read one row's…", `:59` "Compute one atomic…", `:411` "Project a schema…", `:451` "Project rows…"; `table/src/core/factories.ts:5` "Open a table…"; `server/src/server/helpers.ts:40` "Compose an ordered chain…", `:128` "Parse a raw…", `:238` "Serialize a cookie…", `:428` "Sign a value…", `:470` "Verify a stateless token…", `:556` "Normalize a `TokenSecret`…", `:1207` "Open a generic…", `:1369` "Collect a `Request` body…", `:1587` "Bind and close…". **Bare noun phrase, no verb** — `server/src/server/types.ts:21` "The composition context…", `:97` "The per-request connection facts…", `:169` "One parsed entry…", `:224` "Content negotiation over…"; `server/src/server/helpers.ts:630` "The client's quality (q)…", `:697` "Rank + quality of one `candidate`…", `:750` "The client's quality…"; `table/src/core/tables/SelectionManager.ts:5` "The keys of the rows somebody has picked."; `table/src/core/tables/PaginationManager.ts:4` "The page arithmetic…"; `table/src/core/Table.ts:32` "A schema, its rows, and the lens…"; and every type declaration in `form/src/core/types.ts` and `table/src/core/types.ts`. **`Whether …` with the verb elided** — `server/src/server/helpers.ts:165`, `:209`, `:788`, `:865`, `:1047`, `:1311`, `:1566`.
    repair: rewrite each first sentence in the third person — `Creates a form error.`, `Checks whether a value has the shape one field control requires.`, `Composes an ordered chain of middleware…`, `Returns the keys of the rows somebody has picked.` — and keep the name out of the sentence. I list anchors rather than a hand-transcribed enumeration: the population is every TSDoc block in the three trees, and the implementer regenerates the exact set with the multiline pattern `/\*\*\n\s*\* \w+` over `src/**/*.ts`, which is the search I ran and whose coverage is every TSDoc block whose description begins on the line after `/**`. Filed as one finding across three packages per the dispatch instruction, which supersedes the per-package field for this item alone.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: rewrite every function, method, factory, parser, cloner, and predicate first sentence in the third person with an `-s` verb, including the `Whether …` set, as written. For a CLASS anchor use a third-person verb naming what the class does ("Manages the keys of the rows somebody has picked."), never "Returns". Exclude data-only interfaces, type aliases, and readonly-property descriptions from the sweep, or settle the rule text in scaffold's typescript.md first, since the quoted sentence governs what a symbol does. Raise the whole item as a fleet ruling: the imperative voice is uniform across contract, emitter, abort, and router as well, and codec already shows the conforming form.

**Lane DRIFT-RESHAPE/high:** amend: the rewrite direction stands (third person with an `-s` verb, symbol name out of the sentence). Replace the stated regeneration pattern — it misses single-line `/** … */` blocks, including the finding's own anchors at table/src/core/tables/SelectionManager.ts:5, PaginationManager.ts:4, and Table.ts:32. Derive the population from every TSDoc block in the three `src/` trees in both forms, single-line and multiline, and make the acceptance criterion the empty result of the corrected search rather than the transcribed anchor list. Split the work per package so one writer owns one tree at a time.

