# Findings for group g04

Packages: server. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it.

## s14-01

1. package=server file=`/home/user/fleet/server/src/server/helpers.ts:1246-1297` rule=`.claude/rules/architecture.md` § Centralized-file pattern, § Kind purity verdict=CONFIRMED
   wrong: `openStream` is an entity factory returning a live implementation of the published behavioral interface `StreamInterface`, but it lives in `helpers.ts` and builds the entity as an object literal whose `get closed`, `write`, `comment`, `drain`, and `end` bodies are functions declared inside the function body, so the package's only class-free behavioral interface is also the only one with no implementation file — `NegotiatorInterface` gets `Negotiator.ts` and `ServerInterface` gets `Server.ts`.
   repair: add `src/server/streams/Stream.ts` holding a `Stream` class implementing `StreamInterface` with `#` fields for the controller, encoder, closed flag, and wakeup; move the construction to `factories.ts` as `createStream(options?: StreamOptions): StreamInterface`; delete `openStream` and `enqueueStreamText` (helpers.ts:1196-1204), whose `controller`/`closed` parameters exist only to thread the closure state a class holds in fields; update `guides/server.md:117` and its Methods section, which already documents `StreamInterface` under `## Methods` while its parity sentence at line 176 names only `Negotiator` and `Server` as implementing classes.

## s14-02

2. package=server file=`/home/user/fleet/server/src/server/Negotiator.ts:45-47` rule=`.claude/rules/architecture.md` § Wrapper test, § Functions and orchestration verdict=CONFIRMED
   wrong: `encoding` exists only to forward 1:1 to the `negotiateEncoding` helper, which the rule forbids for a public class method; its sibling axes `negotiate` (lines 25-43) and `language` (lines 49-63) each compose `parseAcceptHeader` with a scoring leaf inside the method, so one axis of three is a delegate.
   repair: inline the selection loop into `encoding` the way `language` is written — parse once with `parseAcceptHeader`, score each `available` coding with the `codingQuality` leaf, keep the highest — and delete `negotiateEncoding` (helpers.ts:678-694), whose only caller is this method.

## s14-03

3. package=server file=`/home/user/fleet/server/src/server/helpers.ts:329-331` rule=`.claude/rules/architecture.md` § Wrapper test verdict=CONFIRMED
   wrong: `appendCookie` is a one-line delegate over the semantically identical platform primitive `Headers.append`, and its own `@remarks` at line 312-315 states the case against it: "`Headers.append` already accumulates repeated headers … so this is a thin, self-documenting wrapper naming the cookie-append intent". Naming intent is not a boundary, invariant, composition, translation, lifecycle, or narrower contract.
   repair: delete `appendCookie`, call `headers.append('set-cookie', cookie)` directly at its two call sites (`writeSignedCookie` line 363, `clearCookie` line 414), and remove its guide Surface row.

## s14-04

4. package=server file=`/home/user/fleet/server/src/server/factories.ts:24-26` rule=`.claude/rules/architecture.md` § Wrapper test verdict=CONFIRMED
   wrong: `createNegotiator()` is a zero-argument pass-through over `new Negotiator()`; `Negotiator` takes no constructor arguments and declares no public member outside `NegotiatorInterface`, so the factory narrows nothing and translates nothing. Its `@remarks` ("Prefer this over `new Negotiator()` at call sites that only need the interface") recommends one of two equivalent doors the package publishes for one concept, while `Negotiator`'s own `@example` at Negotiator.ts:19 recommends the other.
   repair: delete `createNegotiator` and its guide Surface row at `guides/server.md:63`; consumers write `new Negotiator()`, which the class `@example` already shows. Note for the implementer: `createServer` and `form`'s `createForm` are not in this class — they forward construction arguments — so this repair does not generalize to them; if the fleet wants a uniform factory row, that is a fleet ruling, not a fix to this package.

## s14-05

5. package=server file=`/home/user/fleet/server/src/server/helpers.ts:923`, `:1436`, `:540` rule=`.claude/rules/architecture.md` § Kind purity; `.claude/rules/patterns.md` § Validation and contracts verdict=CONFIRMED
   wrong: `parseRange`, `requestEncoding`, and `decodeTokenPayload` are flat coercers — each takes raw wire text and produces `T | undefined` — which the kind table places in `parsers.ts`, a file this package does not have. `parseCookies` and `parseAcceptHeader` are not in this set: each always returns a value, so they are lexical leaves and correctly stay in `helpers.ts`.
   repair: add `src/server/parsers.ts`, move those three functions into it, and rename to the required form in place: `requestEncoding` becomes `parseEncoding` and `decodeTokenPayload` becomes `parseTokenPayload` (`parseRange` already conforms). Add `export * from './parsers.js'` to `index.ts` after the `errors.js` row. The rename moves the published surface and earns a version bump, which the rule names as the correct cost.

## s14-06

6. package=server file=`/home/user/fleet/server/src/server/constants.ts:90` rule=`.claude/rules/architecture.md` § Kind purity; `.claude/rules/writing.md` § Claims and time verdict=CONFIRMED
   wrong: `COMPRESSIBLE_TYPES` is `new Set([…])` with no `Object.freeze`, while its own `@remarks` at line 88 claims "Frozen so a consumer reads but never mutates the shared default." Every sibling constant in the file is genuinely frozen (`SSE_HEADERS` line 61, `DEFAULT_ENCODINGS` line 116, `REQUEST_ID_PATTERN` line 76), so this is the one that drifted. The policy sweep cannot see it: it reads the declaration, not the value a call returns.
   repair: wrap the initializer as `Object.freeze(new Set([…]))` to satisfy the kind rule, and correct the sentence — `Object.freeze` does not stop `Set.prototype.add`, so the accurate claim is that `ReadonlySet` withholds the mutators from the declared type. Apply the same wording correction wherever the file repeats the "Frozen so a consumer can read but never mutate" phrase over a `Set`.

## s14-07

7. package=server file=`/home/user/fleet/server/src/server/types.ts:495`, `:498-500`, `:608` rule=`AGENTS.md` § Non-negotiable rules (readonly); `.claude/rules/typescript.md` § Types verdict=CONFIRMED
   wrong: one request-fact record is written inline three times in public declarations — `ServerEventMap.error`'s `request?: { method: string; url: URL }`, `ServerEventMap.response`'s `event: { method: string; pathname: string; status: number; ms: number }`, and `ServerOptions.report`'s `request?` parameter (mirrored again on the private field at Server.ts:94) — and none of their members is `readonly`, while every declared interface in the same file (`AcceptEntry`, `ConnectionInfo`, `CookieOptions`) is fully readonly. A public type also repeated verbatim belongs in `types.ts` as one named declaration.
   repair: declare `export interface RequestFacts { readonly method: string; readonly url: URL }` in `types.ts` and reference it from `ServerEventMap.error`, `ServerOptions.report`, and `Server`'s `#report` field. Fold the `response` payload into finding 8's repair rather than naming a second record.

## s14-08

8. package=server file=`/home/user/fleet/server/src/server/types.ts:498-500` rule=`.claude/rules/patterns.md` § Event maps verdict=CONFIRMED
   wrong: `response` publishes a single-element tuple wrapping an object, while `start`, `request`, `upgrade`, and `drain` all use labeled tuple elements as the rule prescribes. One event map carries two payload conventions.
   repair: declare `readonly response: readonly [method: string, pathname: string, status: number, ms: number]` and update the two emit sites (Server.ts:305-310 and Server.ts:324-329) to positional arguments. This also removes the non-readonly object finding 7 names.

## s14-09

9. package=server file=`/home/user/fleet/server/src/server/types.ts:2-3`, `:194-196`, `:434-437`, `:449`, `:461`, `:508`, `:514`, `:595-596`; `errors.ts:1`, `:3`, `:51`; `constants.ts:3-8`, `:73`; `Server.ts:37`, `:77`; `helpers.ts:29-41`, `:116-138`, `:246`, `:342`, `:417-438`, `:479-481`, `:533`, `:578`, `:815`, `:951`, `:1023`, `:1144-1145`, `:1299` rule=`.claude/rules/writing.md` § Code tokens, references, and links; `AGENTS.md` § Writing verdict=CONFIRMED
   wrong: source comments and TSDoc cite `AGENTS §5`, `§10`, `§12`, `§13`, `§14`, `§4.3`, `§4.4`, `§21`, `§22`, and `§11`. The current `AGENTS.md` carries no numbered sections — its headings are named ("Design laws", "Non-negotiable rules", "TTTDD") — so every one of these resolves to nothing, and a reader cannot check the claim the citation is meant to support. The same comments cite "§5.1 of the proposal", "PROPOSAL §4", and "Appendix A of the proposal", none of which is a file in this repository, and `types.ts:1-18` and `errors.ts:1-7` describe "the future `@orkestrel/middleware` package" that does not exist. Ruled by sense, the `RFC 7232 §2.3.2` citations at `helpers.ts:816`, `:849`, and `:866` are legitimate external-spec references and are not part of this finding.
   repair: replace each `AGENTS §N` with the named section (`AGENTS.md` § Design laws, § Non-negotiable rules) or delete the citation where the sentence stands without it; delete every "proposal"/"PROPOSAL"/"Appendix A" reference and the speculative `@orkestrel/middleware` prose, which `.claude/rules/typescript.md` § Comments and API documentation bars as documented future product behavior.

## s14-10

10. package=server file=`/home/user/fleet/server/src/server/errors.ts:39`, `:76`, `:111`; `helpers.ts:1576`, `:1630`; `factories.ts:17`, `:38` rule=`.claude/rules/documentation.md` § Guide examples, § Parity verdict=CONFIRMED
    wrong: every TSDoc `@example` that carries an import writes `from '@src/server'`, an in-repository alias a consumer cannot resolve; these examples ship in the published declarations. `guides/server.md` uses `@orkestrel/server` throughout, so the two documentation surfaces disagree, and neither `form` nor `table` puts an import in a TSDoc example at all.
    repair: change every `@src/server` in a TSDoc `@example` to `@orkestrel/server`.

## s14-11

11. package=server file=`/home/user/fleet/server/src/server/Server.ts:198` rule=`.claude/rules/typescript.md` § Errors and outcomes verdict=CONFIRMED
    wrong: `start()` rejects a wrong-state call with a bare `new Error(...)`, which carries no machine-readable `code` and no guard, so a caller cannot tell it from any other rejection. This is a programmer error and the package already owns an errors file. The `TypeError` throws in the constructor (lines 114-138) are the same class of thing but are documented as the contract at `types.ts:586` — record those as EXEMPT with that pointer.
    repair: add a `code`-bearing error class to `errors.ts` for a lifecycle refusal, with its `is*` guard beside `isHTTPError`, and reject with it; document the code on `ServerInterface.start`.

## s14-12

12. package=server file=`/home/user/fleet/server/src/server/helpers.ts:650`, `:769`, `:1091`, `:1140` rule=`.claude/rules/names.md` § Standalone helpers, § Value-level identifiers verdict=CONFIRMED
    wrong: `codingQuality`, `languageQuality`, `ipv6Network`, and `clientRateKey` are noun phrases, and the rule fixes `{verb}{Noun}` for a module helper, permitting a bare one-word name only where meaning and arguments are unmistakable. The same file names its other leaves correctly (`computeBodyETag`, `mergeVary`, `resolveOrigin`, `matchMediaType`), so the vocabulary is inconsistent within one file.
    repair: rename to `computeCodingQuality`, `computeLanguageQuality`, `computeIPv6Network`, and `computeRateKey`, matching the `compute*` meaning the rule fixes ("calculates deterministically") and the file's existing `computeBodyETag`; update the call sites in `Negotiator.ts` and `helpers.ts`.

## s14-13

13. package=server file=`/home/user/fleet/server/src/server/helpers.ts:722-725` rule=`.claude/rules/typescript.md` § Types verdict=CONFIRMED
    wrong: `matchMediaType` returns `{ readonly q: number; readonly rank: number } | undefined`, an unnamed structural type on a public export, repeated on the local `best` binding at line 728. A public return type belongs in `types.ts`.
    repair: declare `export interface MediaMatch { readonly q: number; readonly rank: number }` in `types.ts` beside `AcceptEntry` and use it in the signature and the local binding.

## s14-14

14. package=server file=`/home/user/fleet/server/src/server/types.ts:108` rule=`.claude/rules/names.md` § Rejected naming, § Type-level identifiers verdict=CONFIRMED
    wrong: `ConnectionInfo` carries `Info`, one of the generic words the rule rejects; the required form for plain non-behavioral data is `{Entity}`.
    repair: rename to `Connection` and update `ConnectionStateFunction` (types.ts:541), `ServerOptions.state`'s prose, `helpers.ts:293` and `:1131`'s `{@link}` targets, and the guide Surface row.

## s14-15

15. package=server file=`/home/user/fleet/server/src/server/Server.ts:160-162` rule=`.claude/rules/architecture.md` § Class order verdict=CONFIRMED
    wrong: the `#inflight` private getter sits between the constructor and the public getters, so a private member occupies the public-interface position the rule reserves for getters then methods; every other `#` member of the class is below the public surface.
    repair: move `get #inflight()` down to the private block, above `#enter()` at line 475.

## s14-30

30. package=server, form, table file=every TSDoc description block in all three `src/` trees rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: the rule fixes the first sentence as third person with an `-s` verb (`Creates`, `Returns`, `Checks whether`). Across all three packages the first sentence takes one of three non-conforming shapes. **Imperative verb** — `form/src/core/errors.ts:13` "Create a form error.", `:28` "Determine whether…"; `form/src/core/helpers.ts:50` "Check whether…", `:111` "Decide whether…", `:166` "Evaluate one field rule…", `:423` "Compute the values…", `:471` "Compare two field values…", `:491` "Extract the names…", `:535` "Resolve and interpolate…", `:552` "Project a schema…", `:667` "Select referenced groups…", `:688` "Audit a structurally valid schema…"; `form/src/core/types.ts:515` "Find one field…", `:522` "Answer several fields…", `:535` "Record that somebody…", `:541` "Fail a field…", `:548` "Take every field…"; `form/src/core/cloners.ts:7` "Clone one form value…"; `form/src/core/parsers.ts:16` "Parse unknown wire data…"; `form/src/core/factories.ts:5` "Open a form…"; `table/src/core/helpers.ts:35` "Find one column…", `:46` "Read one row's…", `:59` "Compute one atomic…", `:411` "Project a schema…", `:451` "Project rows…"; `table/src/core/factories.ts:5` "Open a table…"; `server/src/server/helpers.ts:40` "Compose an ordered chain…", `:128` "Parse a raw…", `:238` "Serialize a cookie…", `:428` "Sign a value…", `:470` "Verify a stateless token…", `:556` "Normalize a `TokenSecret`…", `:1207` "Open a generic…", `:1369` "Collect a `Request` body…", `:1587` "Bind and close…". **Bare noun phrase, no verb** — `server/src/server/types.ts:21` "The composition context…", `:97` "The per-request connection facts…", `:169` "One parsed entry…", `:224` "Content negotiation over…"; `server/src/server/helpers.ts:630` "The client's quality (q)…", `:697` "Rank + quality of one `candidate`…", `:750` "The client's quality…"; `table/src/core/tables/SelectionManager.ts:5` "The keys of the rows somebody has picked."; `table/src/core/tables/PaginationManager.ts:4` "The page arithmetic…"; `table/src/core/Table.ts:32` "A schema, its rows, and the lens…"; and every type declaration in `form/src/core/types.ts` and `table/src/core/types.ts`. **`Whether …` with the verb elided** — `server/src/server/helpers.ts:165`, `:209`, `:788`, `:865`, `:1047`, `:1311`, `:1566`.
    repair: rewrite each first sentence in the third person — `Creates a form error.`, `Checks whether a value has the shape one field control requires.`, `Composes an ordered chain of middleware…`, `Returns the keys of the rows somebody has picked.` — and keep the name out of the sentence. I list anchors rather than a hand-transcribed enumeration: the population is every TSDoc block in the three trees, and the implementer regenerates the exact set with the multiline pattern `/\*\*\n\s*\* \w+` over `src/**/*.ts`, which is the search I ran and whose coverage is every TSDoc block whose description begins on the line after `/**`. Filed as one finding across three packages per the dispatch instruction, which supersedes the per-package field for this item alone.