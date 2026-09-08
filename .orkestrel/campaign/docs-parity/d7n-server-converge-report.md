# Report — P.2 `d7n-server-converge` (server under the equality gate)

`guides/server.md` passes the equality gate. `npm run docs` exits 0 at `rows read: 1,
disagreements found: 0`; every scoped gate exits 0; `git status --short` lists owned files
only. No deviation. No reader or seed defect met.

## Criterion 1 — red-first on the unconverged tree

`PATH=/opt/npm11/bin:$PATH npm run test:guides` (exit 1), `Tests 3 failed | 33 passed (36)`.
The three cases and their first lines, verbatim:

```text
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/server.md pairs: guide [\"Surface\",\"Quickstart: dispatcher, middleware, lifecycle\",\"Middleware ordering idiom\",\"Typed state slices\",\"SSE route\",\"Graceful shutdown\",\"Graceful shutdown\",\"Bounded startup and socket caps\",\"Upgrade attach\",\"Substrate direct use — tokens, cookies, negotiation\"] source []",

 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:116:20
    116|  expect(pitch).not.toBeUndefined()

 FAIL  |guides| tests/guides.test.ts > Server > keeps every compared summary and example equal to its source
AssertionError: expected [ …(100) ] to deeply equal []
+   "guides/server.md function createNegotiator: guide \"Create a `NegotiatorInterface` — the content-negotiation machine.\" source \"Creates a `NegotiatorInterface` — the reusable content-negotiation machine over the weighted `Accept` family.\"",
```

Log: `/home/user/fleet/server/tmp/d7n-server-converge/red-first.log.txt`.

The pin's both-sides line reads `source []` because no `@example` carried a title yet; the
README case reported `undefined` because `README.md` opened with a paragraph rather than a
blockquote. Green reading is under criterion 7.

## Criterion 2 — headers, the `Shape` idiom, and `### Classes`

- `### Types` gained `Summary` as its last column, `Shape` staying between `Kind` and
  `Summary`. `### Constants` gained `Shape` (the declared type) between `Kind` and
  `Summary`, per Ruling 18; no `Value` column exists.
- The `## Methods` tables under `#### NegotiatorInterface`, `#### StreamInterface`, and
  `#### ServerInterface` renamed `Behavior` to `Summary`; `Method` and `Returns` are
  untouched.
- The convention sentence sits above the `### Types` table in Ruling 15's fleet wording, and
  above the `### Constants` table in that wording plus "A `Shape` cell holds the constant's
  declared type." Both match `/home/user/fleet/router/guides/router.md:61` and `:124` byte
  for byte.
- `### Entities` became `### Classes`; every row's `Kind` was already `class`. No class is
  documented under its own H3, so no row was added.
- Every `Shape` cell was rewritten to Ruling 12's idiom. Data members are bare names in
  braces with `?` on an optional member, call-signature members follow `plus`
  (`{ response, closed } plus write, comment, drain, end`), a methods-only interface reads
  `{} plus negotiate, encoding, language, format`, a type alias carries its own type literal
  with `\|` arms, and `ServerEventMap` takes Ruling 19's bare member names.
- The prose after the `### Types` table lost the member enumeration Ruling 15 deletes and the
  banned `above` pointer. It keeps the `## Methods` pointer and lands the one fact a compared
  block cannot hold: `ServerInterface.address` is the bound node `AddressInfo` while the
  listener is active and `undefined` otherwise. That is the only such landing.

Hand-rebuild comparison against `git show HEAD:guides/server.md`: a script split every table
row on a pipe not preceded by a backslash and compared each row's first two cells. Baseline
and current both carry 100 keyed rows; missing `[]`, added `[]`, key/kind changes `[]`. Only
`Shape` (named by the brief) and `Summary` (the compared column) moved.

## Criterion 3 — doc blocks rewritten, then propagated

`PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide` → `rows read: 1, disagreements found:
100, written: 100, reported: 0` (exit 0), then `npx oxfmt --write guides/server.md README.md`.
A later pass over three constants (see the following note) read `written: 3`.

Rows whose literal stayed in `Shape` while the description names it: `DEFAULT_DRAIN_MS`
(`10_000`), `DEFAULT_BODY_LIMIT` (`1_048_576`), `DEFAULT_DECOMPRESSED_LIMIT` (`16_777_216`),
`REQUEST_ID_PATTERN` (`^[A-Za-z0-9_-]{1,200}$`), `HTTP_ERROR_BRAND`
(`@orkestrel/server.HTTPError`), `DEFAULT_ENCODINGS` (`gzip` then `deflate`). `SSE_HEADERS`
and `COMPRESSIBLE_TYPES` carry a population rather than one fact, so each description names
the population's rule and the block's `@remarks` keeps the enumeration; recorded as a
judgment call.

Written first as prose, `10_000 ms` rendered into the cell as `10\_000 ms` because the
markdown renderer escapes an underscore outside a code span. The three numeric literals moved
into code spans in their doc blocks and the cells were re-propagated; no escape remains.

Doc blocks rewritten by hand, by file:

- `src/server/constants.ts` — `DEFAULT_DRAIN_MS`, `HTTP_ERROR_BRAND`, `DEFAULT_BODY_LIMIT`,
  `DEFAULT_DECOMPRESSED_LIMIT`, `SSE_HEADERS`, `REQUEST_ID_PATTERN`, `COMPRESSIBLE_TYPES`,
  `DEFAULT_ENCODINGS`.
- `src/server/helpers.ts` — `compose`, `wrapMiddleware`, `isCookieName`, `isCookieAttribute`,
  `writeSignedCookie`, `readSignedCookie`, `verifyToken`, `decodeTokenPayload`,
  `normalizeSecret`, `resolveCoding`, `matchMediaType`, `computeBodyETag`, `unwrapETag`,
  `matchesETag`, `parseRange`, `isValidRequestId`, `computeClientKey`, `isDangerousKey`,
  `scrubPrototype`, `decompressRequestBody`, `readBody`, `discoverPort`.
- `src/server/errors.ts` — `HTTPError`, `isHTTPError`, `ServerError`, `isServerError`.
- `src/server/types.ts` — `MiddlewareContext`, `NextFunction`, `Connection`, `TokenSecret`,
  `ServerErrorCode`, `ServerOptions`, and the members `StreamInterface.write`,
  `StreamInterface.comment`, `StreamInterface.drain`, `StreamInterface.end`,
  `ServerInterface.use`, `ServerInterface.upgrade`, `ServerInterface.start`,
  `ServerInterface.stop`, `ServerInterface.destroy`.
- `src/server/Negotiator.ts` — `Negotiator`. `src/server/Server.ts` — `Server`.

Ruling 7 splits applied: `REQUEST_ID_PATTERN` gained an `@remarks` carrying its rejection
population; `HTTP_ERROR_BRAND` moved the dual-package-hazard explanation into its existing
`@remarks`; `SSE_HEADERS` and `readBody` each had the remark sentence the description now
repeats pruned, every other sentence kept.

Prose truth checked against the code before propagating: `readBody` returns `undefined` for
an empty body (`helpers.ts:1437`) and for a malformed `application/json` body (`parseJSON` at
`:1445`), so the description states each rather than either; `resolveCoding` is called by
`negotiateEncoding` (`helpers.ts:704`) and by `Negotiator.encoding` (`Negotiator.ts:52`), so
its description names both callers rather than "both encoding doors"; `discoverPort` binds a
`preferred` port when given one and an ephemeral port otherwise (`helpers.ts:1522-1531`).

Voice sweeps over prose this unit owns: all-caps emphasis was lowered in every rewritten doc
block and throughout `guides/server.md` (the `## Contract` items, the Patterns prose, and the
Practices list); `above` was removed from the `### Types` trailing prose, `## Contract` item
6, and the Practices list, each replaced by the fact or by an anchored link; the counts "two
nested phases", "the two copies", "the three keys", "those two attributes", and "the two ways
the handle closes" were recast to name the members; `Both always resolve` became `stop` and
`destroy` always resolve. `MiddlewareHandler`s and `Content-Type`s lost their pluralized code
tokens. Extended comment lines were rewrapped to their block's width.

## Criterion 4 — the titled pair

`PATH=/opt/npm11/bin:$PATH npm run docs -- --to source` → `rows read: 1, disagreements found:
1, written: 1, reported: 0` (exit 0), run only after the summaries read zero disagreements.

The pair: the `@example` of `createNegotiator` in `src/server/factories.ts` — the primary
factory, the first `create*` the facts block lists — titled `Substrate direct use — tokens,
cookies, negotiation`, against the fence under `### Substrate direct use — tokens, cookies,
negotiation`, the first fence in the document that demonstrates `createNegotiator`. Every
other `@example` stays untitled.

Fence bodies read before choosing: the fence under that heading carries no three-backtick run
and no doc-comment terminator (`grep -n '```\|\*/'` over the section reports only the opening
and closing fence lines). `grep -n '^#\+ Substrate direct use' guides/server.md` reports one
heading. The heading is descriptive rather than structural, so Ruling 9 does not fire and no
heading was added and no fence moved. Ruling 14: the block demonstrated a strict subset of the
fence (one `negotiate` call), so the block took the fence's whole body and nothing was
deleted from either side; the block's `@src/server` import became the fence's
`@orkestrel/server` import, which is the specifier `.claude/rules/documentation.md` § Guide
examples requires of a guide fence.

Recorded ancillary decision: the brief fixes the primary factory as "the first `create*` the
facts block lists", which is `createNegotiator` rather than `createServer`; the resulting
titled example is the substrate fence, which demonstrates cookies, tokens, negotiation, and
decompression together.

## Criterion 5 — the tagline, the pitch, and the opening prose

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold:

```text
A typed HTTP server for the `@orkestrel` line: a node-bound `Server` lifecycle entity
that composes a middleware onion around a consumed `@orkestrel/router` dispatcher,
beside the `HTTPError` vocabulary and a shared substrate for cookies, WebCrypto
tokens, content negotiation, ETag and Range, security headers, Server-Sent Events,
and the body pipeline.
```

`README.md` carries that blockquote under its H1 with the same line breaks, so `docs` reports
no `pitch` row.

Displaced sentences folded into a new opening paragraph between the guide's blockquote and
`## Surface`, none restating a tagline clause: the router-consumption sentence (its `**`
emphasis dropped), a sentence carrying the upgrade seam, per-request connection-fact
injection, `discoverPort`, and the `node:http` binding through the router's adapter helpers,
and the `Source:` and barrel-alias pointers.

The README's opening paragraph keeps the onboarding it alone carries and drops the clauses the
tagline now states: "Hand `createServer` a dispatcher and a per-request state factory, call
`start()`, and call `stop()` when the process winds down." followed by the unchanged
sibling-package sentence and "Part of the `@orkestrel` line."

`## Tests` gained a `tests/guides.test.ts` entry naming the checks descriptively: the
`## Surface` ↔ `src/server` bijection, the interface ↔ implementing-class method bijections,
and the equality gate — every `Summary` cell against its declaration's description paragraph,
the titled `Substrate direct use — tokens, cookies, negotiation` fence against the `@example`
block of that title, and the README pitch against the guide's tagline. No SQ/MQ/EQ/RQ
identifier appears.

## Criterion 6 — the seed

```text
npm run docs                  → rows read: 1, disagreements found: 0                       (exit 0)
npm run docs -- --to guide    → rows read: 1, disagreements found: 0, written: 0, reported: 0 (exit 0)
npm run docs -- --to source   → rows read: 1, disagreements found: 0, written: 0, reported: 0 (exit 0)
```

## Criterion 7 — gates

Every command ran with `PATH=/opt/npm11/bin:$PATH`.

```text
npx oxfmt --check guides/server.md README.md src/server/*.ts tests/guides.test.ts   exit 0  (13 files)
npx oxlint --config .oxlintrc.json --deny-warnings src/server tests/guides.test.ts  exit 0
npm run check                                                                      exit 0
npm run test:guides    Test Files 1 passed (1)   Tests 36 passed (36)               exit 0
npm run test:policy    Test Files 1 passed (1)   Tests 90 passed | 1 skipped (91)   exit 0
```

Observation, not a criterion: `npm run test:src:server` → `Test Files 7 passed (7)`,
`Tests 263 passed | 1 skipped (264)`, duration 13.59s, exit 0. `tests/config.test.ts` was not
run.

The gate cases that were red under criterion 1 are the three of the 36 that now pass:
`pairs at least one example title across the guide and the source`,
`opens the README with the guide tagline`, and
`Server > keeps every compared summary and example equal to its source`.

## Criterion 8 — scope

```text
 M README.md
 M guides/server.md
 M src/server/Negotiator.ts
 M src/server/Server.ts
 M src/server/constants.ts
 M src/server/errors.ts
 M src/server/factories.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M tests/guides.test.ts
```

Owned files only. No code token moved: `git diff` over `src/**` touches comment lines alone.
`package.json` and `package-lock.json` are untouched and `@orkestrel/guide` stays at `^0.0.17`.
Instruments and logs are under `/home/user/fleet/server/tmp/d7n-server-converge/`, which git
ignores.

Diffstat: 10 files changed, 487 insertions(+), 338 deletions(-).

## The drop-in

`tests/guides.test.ts` matches the pilot byte for byte outside this package's constants,
imports, and fence transcriptions:
`diff <(sed -n '62,258p' /home/user/fleet/abort/tests/guides.test.ts) <(sed -n '71,267p'
tests/guides.test.ts)` reports no difference (exit 0). The header line reads "The constants
that follow are this package's own" (Ruling 13, amended); the `INTERNAL` doc block reads "the
assertion that follows it fails when a name here stops being stranded"; the equality case sits
directly after the methods loop and before `documents an example for every Surface function`.
`findDrift` is imported beside the existing readers, `GUIDE_SPEC` is `'guides/server.md'` and
is used at every site that reads the guide's path, and `ROOT_FILES` is
`Object.freeze(['AGENTS.md', 'README.md'])`.

## Reader and seed defects

None. Every `--to guide` and `--to source` write landed where the brief predicted, the
comparator's terms held (a `{@link}` tag compared as its target's code token, whitespace
collapsed), and no residual disagreement survived a doc-block rewrite.

## Wall clock

First command 2026-09-07T21:00Z (reading the brief and the bound rules) to last command
2026-09-07T21:19Z — about 19 minutes.

---

Orchestrator's annotation (2026-09-08, from the audit verdict): this report states counts in prose; the tree is authoritative and every cited line matched it on the audit's re-read (rater's converge report also misstates the pilot's header as still reading `below`, and its diffstat reads one insertion past the committed tree). The unit's instruments are retained under `instruments/d7/units/`.
