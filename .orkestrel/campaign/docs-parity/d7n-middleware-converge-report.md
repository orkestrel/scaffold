# Report — P.2 `d7n-middleware-converge` (middleware under the equality gate)

`/home/user/fleet/middleware` is left dirty and uncommitted at branch `claude/orkestrel-npm-audit-deps-14ibta`, baseline `b9d08b6`. Every acceptance criterion reads green. Wall clock from the first command to the last: 21:21:47Z to 21:40:46Z on 2026-09-07, 18 minutes 59 seconds.

## Criterion 1 — red-first on the unconverged tree

The gate cases went in first, against the baseline tables and the baseline blockquote.

```text
$ npm run test:guides
 Test Files  1 failed (1)
      Tests  3 failed | 38 passed (41)
```

The first lines of each failing case, verbatim:

```text
FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/middleware.md pairs: guide [\"Surface\",\"Canonical onion — fetch-native runtime\",\"Canonical onion — behind @orkestrel/server\",\"Body: eager cache drive\",\"Session: control handle, header transport, injected store\",\"Session store seam — direct calls\",\"Session store seam — durable database-backed store\",\"Session transport seam — direct calls\",\"CSRF: session-bound double-submit\",\"Multipart: node face, sniffed-type allow-list\",\"Multipart limits — direct resolution\",\"Assets: in-memory source\",\"Static: SPA fallback\"] source []",

FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:111:20  expect(pitch).not.toBeUndefined()

FAIL  |guides| tests/guides.test.ts > Middleware > keeps every compared summary and example equal to its source
AssertionError: expected [ …(181) ] to deeply equal []
+   "guides/middleware.md function createBoundary: guide \"The outermost error-rendering battery — maps a downstream throw to a `Response`.\" source \"Creates the outermost error-rendering battery — catches a downstream throw and renders it as a `Response`.\"",
```

The full log is retained at `tmp/d7n-middleware-converge/red-first.log.txt` inside the checkout. No control was planted and none needed reversing: the cases read red against the tree as the baseline left it.

Drop-in state: `tests/guides.test.ts` is the pilot's text byte for byte outside its constants block and the flagship-fences block middleware does not carry. `diff` against `/home/user/fleet/abort/tests/guides.test.ts` reports only the constants (`GUIDE_SPEC`, `MODULES`, `INTERNAL`, the `@orkestrel/test` import list, the missing `createAbort` import) and the absent `flagship fences` describe. The header line reads "The constants that follow are this package's own" (Ruling 13 amended), the `INTERNAL` block reads "the assertion that follows it", `ROOT_FILES` reads "Root-level files these checks read." and carries `README.md`, and the equality case sits directly after the methods loop and before `documents an example for every Surface function`.

## Criterion 2 — headings and columns

Every header row now reads `Summary` beside only `Kind`, `Shape`, or `Returns`:

```text
$ python3 (header-row scan over guides/middleware.md)
 46 ['API', 'Kind', 'Summary']        # Middlewares — core
 66 ['API', 'Kind', 'Summary']        # Middlewares — node
 77 ['Type', 'Kind', 'Shape', 'Summary']
136 ['API', 'Kind', 'Shape', 'Summary']   # Constants
183 189 216 225 251 257 271 281 ['API', 'Kind', 'Summary']
300 310 323 336 348 ['Method', 'Returns', 'Summary']
```

- The `Behavior` header of every `## Methods` table became `Summary` (`AssetSourceInterface`, `SessionInterface`, `SessionControlInterface`, `SessionStoreInterface`, `SessionTransportInterface`).
- `### Entities` became `### Classes` (Ruling 5 / Ruling 16: every row's `Kind` is `class`). No class is documented under its own H3, so no row was added.
- `### Types` gained `Summary` as its last column; the type literal stayed in `Shape`, and every row was rewritten to Ruling 12's idiom with Ruling 15's convention sentence between the heading and the table.
- `### Constants` gained `Shape` between `Kind` and `Summary`, carrying the constant's declared type, with the sentence `A `Shape` cell holds the constant's declared type.` between the heading and the table (Ruling 18, template's form).

### Decisions recorded

- **The Constants `Shape` column was added.** Ruling 18 states that a `### Constants` table heads `Shape` with the constant's declared type, and every package converged after that ruling (template, router, table, websocket) carries it. The brief's fixed list names the header rather than the column's presence, so this is the wider reading, recorded for the Orchestrator to rule on.
- **A constant's `Shape` cell holds the widened declared type** (`string`, `number`, `readonly Encoding[]`, `ReadonlySet<string>`, `Readonly<Record<MultipartErrorCode, number>>`, `unique symbol`, `NonNullable<StaticOptions['dotfiles']>`), matching websocket's converged table, and the literal is named in the description per Ruling 18. Writing the inferred literal type instead would put the whole `DEFAULT_CSP` policy string in the cell.
- **`### Shapers` keeps `API | Kind | Summary`.** Its only row (`sessionColumns`) is a `const`, so neither Ruling 15's interface trigger nor Ruling 18's `### Constants` trigger fires, and no fleet-wide wording exists for a shaper table's second sentence.
- **`### Validators — core` keeps `API | Kind | Summary`.** Its rows are functions, so Ruling 15's trigger does not fire and no guard-table `Shape` column was invented.

### Rows whose literal stayed in `Shape`

Every `### Types` row keeps its literal in `Shape` and carries no prose there. The rows whose `Shape` cell is a type literal rather than a member list are `SecurityIdentifierOptions` (`{ trust? } \| false`), `ForwardedOptions` (`{ proxies } \| { trusted }`), `SessionRestoreFunction` (`(value: unknown) => SessionInterface \| undefined`), `MultipartErrorCode` (`'limit' \| 'malformed' \| 'rejected'`), and `UploadStatus` (`'staged' \| 'moved'`). The interface rows with no data member render as `{} plus …`: `SessionControlInterface`, `SessionStoreInterface`, `SessionTransportInterface`, `AssetSourceInterface`. Every `### Constants` row's literal moved into its declaration's description; none stayed in a cell.

### The hand rebuild, checked against the baseline

The `### Types` and `### Constants` tables were rebuilt row by row, splitting on a pipe not preceded by a backslash. Every non-`Summary` cell was then compared against `git show HEAD:guides/middleware.md`:

```text
$ python3 (row scan, split on (?<!\\)\|)
baseline rows 199 current rows 199
key+kind cells: identical, in order
```

The `Returns` cells of the `## Methods` tables are the second cell of their rows and are covered by that comparison. The only non-`Summary` cells that changed are the `### Types` `Shape` cells (rewritten to the idiom, listed by the script at `tmp/d7n-middleware-converge/tables.py`'s output) and the `### Constants` `Shape` cells (new).

## Criterion 3 — the blocks rewritten by hand, then propagated

Ruling 6's direction was followed: the block first, then `--to guide`.

**Constants naming their literal (Ruling 18), `src/core/constants.ts`:** `DEFAULT_COMPRESSION_THRESHOLD`, `DEFAULT_COMPRESSION_ENCODINGS`, `DEFAULT_FRAME_OPTIONS`, `DEFAULT_REFERRER_POLICY`, `DEFAULT_COOP`, `DEFAULT_CORP`, `DEFAULT_CLUSTER`, `DEFAULT_COEP`, `DEFAULT_HSTS`, `DEFAULT_IDENTIFIER_HEADER`, `DEFAULT_DEADLINE_STATUS`, `DEFAULT_BEARER_HEADER`, `DEFAULT_BEARER_SCHEME`, `DEFAULT_LIMITER_CAPACITY`, `DEFAULT_SESSION_CAPACITY`, `DEFAULT_SESSION_COOKIE`, `DEFAULT_SESSION_HEADER`, `DEFAULT_CSRF_COOKIE`, `DEFAULT_CSRF_HEADER`, `DEFAULT_CSRF_FIELD`, `DEFAULT_CSRF_SAFE_METHODS`. In `src/server/constants.ts`: `MULTIPART_STATUS`, `DEFAULT_STATIC_INDEX`, `DEFAULT_STATIC_FALLBACK_EXCLUDE`, `DEFAULT_STATIC_DOTFILES`, `NODE_COMPRESSION_ENCODINGS`, `DEFAULT_CONTENT_TYPE`, `DEFAULT_MULTIPART_FILE_SIZE`, `DEFAULT_MULTIPART_FILE_COUNT`, `DEFAULT_MULTIPART_FIELD_SIZE`, `DEFAULT_MULTIPART_FIELD_COUNT`, `DEFAULT_MULTIPART_TOTAL`, `MULTIPART_MAX_HEADER_BLOCK`, `MULTIPART_MAX_PREAMBLE`. Each literal sits in a code span, so no bare `A_B_C` identifier reaches a Markdown cell.

**Descriptions that gained a fact the guide cell carried and the block lacked** (`src/core/middlewares.ts` unless named): `createSecurity` (mints or echoes a request identifier), `createCors` (answers a preflight, reflects an allow-listed origin or serves the wildcard), `createForwarded` (walks `X-Forwarded-For` past the trusted hops), `createETag` (RFC 7232), `createBearer` (verifies with `verifyToken`), `createLimiter` (checks the budget before consuming, so a window admits exactly `max`), and `createStatic` in `src/server/middlewares.ts` (conditional, ranged, and SPA-fallback requests). Each claim was read against the implementation first: `createCors`'s preflight short-circuit and `reflecting` branch at `src/core/middlewares.ts:322-352`, `createBearer`'s `verifyToken` call, and `createLimiter`'s `bucket.budget.exhausted` check before `bucket.budget.consume(1)`.

Every other row's guide-only fact was already in its block's `@remarks` and needed no rewrite (`resolveKey`'s precedence, `isBufferingIneligible`'s skip list, `moveUploadedFile`'s `EXDEV` fallback, `computeFileETag`'s tag form, `isContainedPath`'s argument order, `createDeadline`'s signal link, `createAssets`'s shared ETag, `Session`'s state view).

**Member doc blocks written from scratch**, because the `Behavior` header hid them from the comparison and the rename exposed `source absent` on every one: `SessionInterface.set` / `.delete` / `.clear`, `SessionControlInterface.regenerate` / `.destroy`, `SessionStoreInterface.get` / `.set` / `.delete`, `SessionTransportInterface.read` / `.write` / `.clear` in `src/core/types.ts`. `AssetSourceInterface.read` in `src/server/types.ts` gained the identity-or-Brotli fact its cell carried.

**Voice sweep inside compared blocks** (all-caps emphasis, and one causal `since`): `only` and `except` in `src/core/middlewares.ts`, `MultipartLimits` in `src/server/types.ts`, `DEFAULT_CSP` in `src/core/constants.ts`, `resolveOptInHeader` / `resolveForwardedFor` / `isPreflight` in `src/core/helpers.ts`, `isSession` in `src/core/validators.ts` (`since` became `because`), `resolveStaticPath` / `isUnderPath` / `isContainedPath` in `src/server/helpers.ts`, and the node `createCompression` in `src/server/middlewares.ts`.

The runs:

```text
$ npm run docs -- --to guide          rows read: 1, disagreements found: 182, written: 181, reported: 1   (the pitch, authored by hand)
$ npx oxfmt --write guides/middleware.md
$ npm run docs                        rows read: 1, disagreements found: 1        (the pitch alone)
$ npm run docs -- --to guide          rows read: 1, disagreements found: 11, written: 11, reported: 0     (after the voice sweep in the blocks)
$ npm run docs -- --to guide          rows read: 1, disagreements found: 2, written: 2, reported: 0       (after the two lint-driven rewordings)
$ npm run docs                        rows read: 1, disagreements found: 0
```

## Criterion 4 — the titled pair

The titled declaration is `createBoundary`, the package's primary battery factory: the `## Surface` fence mounts it, the README's usage fence mounts it, and Contract §5 names it the renderer. The brief's mechanical parenthetical ("the first `create*` the facts block lists") resolves to `createUploadedFile`, which no fence demonstrates, so the block was chosen by content instead.

The fence that demonstrates it is the `## Surface` quick-start. It sat under a structural heading, so Ruling 9's heading went in directly above it, worded as the demonstration it shows:

```text
$ grep -n '^#\+ Mount a battery' guides/middleware.md
27:### Mount a battery
```

The fence body was read before titling: it carries no three-backtick run and no doc-comment terminator (`grep -c '\*/'` over the section returned 0). The `## Surface` intro sentence lost its trailing colon and now ends before the heading; no fence moved and `### Middlewares — core` still follows.

```text
$ npm run docs                        guides/middleware.md Mount a battery: guide "ts\nimport { createBoundary, createSecurity } …" source "ts\nconst boundary = createBoundary({ expose: false })"
                                      rows read: 1, disagreements found: 1
$ npm run docs -- --to source         rows read: 1, disagreements found: 1, written: 1, reported: 0
$ npx oxfmt --write src/core/middlewares.ts
$ npm run docs                        rows read: 1, disagreements found: 0
```

Ruling 14 holds: the block's original line `const boundary = createBoundary({ expose: false })` survives inside the written body, and nothing was deleted from either side. Every other `@example` stays untitled.

## Criterion 5 — the tagline, the pitch, and the displaced sentences

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold, and `README.md` carries the same bytes under its own H1 (a line-by-line comparison of the two blockquotes reports `identical: True`).

The displaced sentences fold into a new opening paragraph between the blockquote and `## Surface`, which the guide previously lacked entirely: the seam-and-substrate sentence, the never-re-implements sentence, the `Source:` links, and the barrel sentence, none of them restating a tagline clause. The former blockquote's guide-meta clause survives there as "This is the package's one guide, and it covers the core and the node face together."

The README's opening paragraph is onboarding it alone carries — mount the batteries the reader's threat model needs, the position-decides-visibility fact, the pointer to the ordering doctrine and the security acceptance bar, and the `@orkestrel` line sentence. Its former paragraph restated the tagline's battery list and is gone.

`## Tests` gained the `tests/guides.test.ts` row it lacked, naming the checks descriptively with no SQ/MQ/EQ/RQ identifier: the Surface bijection over `src/core` and `src/server`, the method bijections named by interface, and the equality gate — every `Summary` cell against its declaration's description paragraph, the titled `Mount a battery` fence against the `@example` block of that title, and the README pitch against the guide's tagline.

## Criterion 6 — the seed reads clean and idempotent

```text
$ npm run docs                        rows read: 1, disagreements found: 0    exit 0
$ npm run docs -- --to guide          rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source         rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — the gates

```text
$ npx oxfmt --check README.md guides/middleware.md <the owned .ts paths>   All matched files use the correct format.   exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>  EXIT=0
$ npm run check                                                            EXIT=0
$ npm run test:guides                 Test Files 1 passed (1)   Tests 41 passed (41)
$ npm run test:policy                 Test Files 1 passed (1)   Tests 90 passed | 1 skipped (91)
$ npm run test:src:core  (observation)  Test Files 7 passed (7)   Tests 268 passed (268)
```

`oxlint` first reported three `policy/no-malformed-summary` diagnostics, each caused by this unit's own edits, and each was fixed before the reading above:

- `src/server/middlewares.ts:440` — merging the node `createCompression` block into one sentence pulled the symbol's own name into the first sentence. Restored as two sentences.
- `src/core/middlewares.ts:874` and `:899` — lowercasing `ONLY` and `EXCEPT` for the caps sweep made the first sentence carry the bare symbol names `only` and `except`, which the rule matches case-sensitively on a word boundary (`configs/policy.ts:817`). Reworded to "Scopes a battery to a set of exact pathnames and nowhere else …" and "Scopes a battery to every pathname outside a set of exact ones …".

## Criterion 8 — the tree

```text
$ git status --short
 M README.md
 M guides/middleware.md
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/middlewares.ts
 M src/core/types.ts
 M src/core/validators.ts
 M src/server/constants.ts
 M src/server/helpers.ts
 M src/server/middlewares.ts
 M src/server/types.ts
 M tests/guides.test.ts

$ git diff --stat
 12 files changed, 515 insertions(+), 356 deletions(-)
```

Owned files only. `package.json`, `package-lock.json`, `guides/README.md`, every vendored file, `tests/setup*.ts`, and `tests/src/**` are untouched. Instruments live in `tmp/d7n-middleware-converge/` inside the checkout, which git ignores.

## Voice sweeps over the prose this unit owns

- **All-caps emphasis** was corrected everywhere it appeared in `guides/middleware.md` and in every doc block rewritten. A final scan over both files, skipping code fences and code spans and allowing acronyms, leaves `CVE-2025-27210` at `guides/middleware.md:178` and `:232` — an identifier, not emphasis — and nothing in `README.md`. The Contract section carried most of the sites (`OUTSIDE`, `INSIDE`, `BENEATH`, `NEVER`, `ALWAYS`, `BOTH`, `EXACTLY`, `SNIFFED`, `MID-STREAM`, `FAIL-CLOSED`, `fail-OPEN`, `RETURNED`, `TOTAL`, `REPLACES`, and the `DOC ↔ SOURCE` labels, which became `Guide ↔ source`).
- **`createETag` sits INNER of `createCompression`** became "sits inside `createCompression`", correcting the grammar the capitalisation was carrying.
- **Counts in prose:** a scan for count words over both files finds only `both` where the sentence names its members, which `AGENTS.md` § Writing keeps, and `two strings` in `equalsConstantTime`'s description, which names the function's arity rather than tallying a growable set. No count was introduced.

## Reader and seed defects met

**One reader defect.** Both faces export `createCompression`, and the manifest row's `source` spans `src/core` and `src/server`, so `findDrift` and `writeGuide` key both guide rows as `function createCompression` and read only the FIRST of them. The node-face row at `guides/middleware.md:71` is invisible to the equality gate whatever it says.

The seed line that produced it is the absent one: the first worklist run listed `guides/middleware.md function createCompression: guide "Response-body compression over feature-detected `CompressionStream` codings." source "Creates the response-body compression battery …"` once, with no second row for the node face, and `--to guide` reported `written: 181` while leaving `:71` untouched.

The reading that settles it, taken in this checkout and then reversed:

```text
$ (the node-face row's Summary cell replaced with the literal text PROBE-NODE-CELL)
$ npm run docs                        rows read: 1, disagreements found: 1     (the pitch alone; the planted cell is never read)
```

The cell was then written by hand to its declaration's description paragraph, so the row is honest even though no gate can check it. A guide unit that wants this closed needs `findDrift` to key a row by its declaring module as well as its name, or the seed to report a duplicated key rather than silently taking the first row.

**No seed defect.** `--to guide` re-rendered the four-column `### Types` and `### Constants` tables, their escaped pipes (`\|` inside every union literal), and their nested code spans without disturbing a cell outside the written column, which the baseline comparison in criterion 2 confirms. `oxfmt` restored the alignment on every run. The pitch row's `reported: 1` on the first write is the seed declining to author a README by hand, which is its documented behaviour rather than a defect.

## Deviation state

No deviation. Nothing in the deviation contract fired: every cell the seed had to locate was located after the header changes, the titled body fits its block, no test outside `tests/guides.test.ts` went red, no vendored file needed an edit, the readers returned the shapes the brief describes, and no residual disagreement survived a doc-block rewrite.

Ancillary matters decided and recorded in the sections above: the Constants `Shape` column and its widened declared types, the `### Shapers` and `### Validators — core` tables keeping three columns, the titled declaration being `createBoundary` rather than the brief's mechanical parenthetical, `### Mount a battery` as the Ruling 9 heading and its position after the section's intro sentence, and the node-face `createCompression` cell being written by hand to its block's description.

---

Orchestrator's annotation (2026-09-08, the audit): the audit ruled claim 12 FAIL on counts in this report's prose; every citation was verified against the tree except as the verdict names, and the tree is authoritative.
