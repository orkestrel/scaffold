# Report — `d7n-router-converge`

Wall clock: 2026-09-07T15:50:51Z (first command) to 2026-09-07T16:13:28Z (last gate) in
`/home/user/fleet/router`, from baseline `4101a0b`.

## Criterion 1 — red-first on the unconverged tree

`npm run test:guides` after adding the equality case, the population pin, and the README case,
before any convergence:
`Test Files 1 failed (1); Tests 3 failed | 45 passed (48)`. Each failing case's first lines,
verbatim:

```text
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/router.md pairs: guide [\"Surface\",\"Groups and dedup\",\"Wildcard capture and precedence\",\"Method-dimensioned dispatch (auto-HEAD, auto-OPTIONS, 405)\",\"Observing dispatch outcomes\",\"Typing a route input at the registration site\",\"Introspection and reset\",\"Hash-mode navigation\",\"History mode with link interception\",\"Guarding navigation (auth walls)\",\"Basic server\",\"Converting requests and responses directly\",\"Observing client disconnect\"] source []",

 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
    125|  expect(pitch).not.toBeUndefined()

 FAIL  |guides| tests/guides.test.ts > Router > keeps every compared summary and example equal to its source
AssertionError: expected [ …(83) ] to deeply equal []
+   "guides/router.md function createRouter: guide \"Create a `RouterInterface<Meta>` — the shared matching + registry engine.\" source \"Creates a `RouterInterface` — the pure path-matching + registry engine shared by the browser `Navigator` and the core `Dispatcher`.\"",
```

## Criterion 2 — headers and class rows

`Behavior` renamed `Summary` in every `## Methods` table (`RouterInterface`,
`DispatcherInterface`, `NavigatorInterface`, `GroupInterface`, `DispatchGroupInterface`). The
`### Types` table gained `Summary` as its last column beside `Type | Kind | Shape`. Every
`## Surface` table already headed `Summary` beside `Kind` alone. `### Entities` became
`### Classes` — every row's `Kind` reads `class` (`Router`, `Group`, `Dispatcher`,
`DispatchGroup`, `Navigator`). `grep -n '^### `' guides/router.md` returns nothing, so the
guide documents no class under its own H3 and the `### Classes` table is the sole home for
those rows.

The `Shape` convention sentence sits above the `### Types` table, the position the accepted
pilot takes (`/home/user/fleet/abort/guides/abort.md`) and the position `writing.md`
§ Structure requires for a table introduction: "A `Shape` cell holds a type alias's value and
an interface's members, abbreviated with `…` where the declaration runs longer than the cell."

**Non-`Summary` cell comparison against `git show HEAD:guides/router.md`** (rows split on a
pipe not preceded by a backslash): the same tables before and after, and every differing
non-`Summary` cell sits in the `### Types` table's `Shape` column and nowhere else. The `API`/`Type` and
`Kind` columns, the `Returns` columns, and every other table's cells are byte-identical to the
baseline.

Rows whose baseline literal stayed in `Shape`, with only the clause after the em dash moved
out: `CompiledPath`, `RouteEntry`, `RouterMatch`, `AnswerHandler`, `RouterOptions`,
`RouterInterface`, `GroupInterface`, `Method`, `RouteContext`, `RouteHandler`, `RouteInput`,
`RouteRecord`, `DispatchResult`, `DispatcherEventMap`, `DispatcherOptions`,
`DispatcherInterface`, `DispatchGroupInterface`, `NavigatorEventMap`, `NavigatorOptions`,
`NavigatorInterface`, `RequestOptions`, `ListenerFunction`, `StateFunction`.

Rows whose baseline cell carried prose and no literal, so `Shape` took the declaration's own
value: `PathParams`, `PathParamsRaw`, `IdentifierStartChar`, `IdentifierChar`,
`TakeIdentifierTail`, `IdentifierHead`, `SegmentParam`.

## Criterion 3 — blocks rewritten by hand, then `--to guide`

Blocks rewritten because the guide cell carried information the block lacked:

- `METHOD_LIST` — the cell's "frozen, ordered literal tuple"; `METHODS` — the cell's
  `ReadonlySet` (`src/core/constants.ts`).
- `computeDispatchKey` — the cell's "canonical method-and-path key", now the block's
  `METHOD /path` (`src/core/helpers.ts`).
- `computeNavigationKey` — the cell's "canonical" key "used by a `Navigator`"
  (`src/browser/helpers.ts`). The cell's "nested-route key" is dropped: the function
  canonicalizes the entry's path and reads nothing nested. Recorded as a correction.

Blocks rewritten because the description carried all-caps emphasis that would land in a cell:
`canonicalizePath`, `classifySegment`, `computeSpecificity`, `compareSpecificity`,
`defineRoute` (`src/core/helpers.ts`); `Router` (`src/core/Router.ts`); `resolveLocationPath`
(`src/browser/helpers.ts`); `IdentifierStartChar`, `IdentifierChar`, `RouterMatch`,
`AnswerHandler`, `RouterInterface` (`src/core/types.ts`).

Blocks rewritten because the description used the `{@link import('./x.js').Y}` form, which the
P16 comparator renders as the literal code token `` `import('./x.js').Y` `` inside the cell:
`METHOD_LIST`, `METHODS`, `Method`, `Group`, `DispatchGroup`.

Blocks reflowed because a hyphen fell on a line wrap and the comparator collapses the newline
to a space, so the cell read `hyphen space word`: `createDispatcher` ("method- dimensioned"),
`RouterOptions` ("case- sensitivity"), `DispatchResult` ("path-matches-but-method- doesn't"),
`NavigatorInterface` ("behavioral- interface").

Block rewritten because its prose had gone stale: `Dispatcher`'s "the eventual server face"
became "the server face" — `src/server` ships.

Blocks written where none existed. Each of these read `source absent` at baseline, so no cell
could be written from them:

- `TakeIdentifierTail`, `IdentifierHead`, `SegmentParam` carried `//` line comments. Each
  gained a doc block whose description is the summary and whose `@remarks` keeps every
  sentence of the line comment.
- Every call-signature member of `RouterInterface`, `GroupInterface`, `DispatcherInterface`,
  `DispatchGroupInterface`, and `NavigatorInterface`, plus their `readonly` data members —
  the shape `/home/user/fleet/abort/src/core/types.ts:23-39` takes. The interface-level
  `@remarks` bullet list that restated each member is pruned per Ruling 7; what remains in
  each interface's `@remarks` is the fact no member carries (the guarded registration boundary
  against the guard-free hot path; the left-to-right prefix nesting; the rendering the
  navigator leaves to the consumer).

Runs:

```text
$ npm run docs -- --to guide     rows read: 1, disagreements found: 6, written: 4, reported: 2
$ npx oxfmt --config .oxfmtrc.json --write guides/router.md
$ npm run docs                   rows read: 1, disagreements found: 2
```

(The first `--to guide` attempt on this tree read `written: 79, reported: 3`; the defect it
exposed is under Reader and seed defects, and the run above is the one after the fix.)

## Criterion 4 — the titled pair

The pair is the `createListener` doc block in `src/server/handlers.ts` and the `### Basic
server` fence in `guides/router.md`. `createListener` is the first `create*` the facts block
lists, and the `### Basic server` fence is the first fence demonstrating it — `grep -n
'createListener' guides/router.md` returns the tagline, the Surface row, contract item 21, the
fence's import and call, the prose after it, a Practices bullet, and the § Tests line, and the
fence is the only occurrence inside a code block.

Heading uniqueness, heading-scoped:

```text
$ grep -c '^#\+ Basic server' guides/router.md
1
```

Fence body read before titling — the body alone (the lines between the fence markers) carries
neither a three-backtick run nor the doc-comment terminator:

```text
$ sed -n '566,581p' guides/router.md | grep -n -e '```' -e '\*/'
(no output; exit 1)
```

Both readings are re-taken against the tree this unit leaves, where the fence opens at line
565 and its body runs 566 to 581.

The title `Basic server` went onto the `@example` tag by hand, `--to guide` ran to zero
summary disagreements, then:

```text
$ npm run docs -- --to source    rows read: 1, disagreements found: 1, written: 1, reported: 0
$ npx oxfmt --config .oxfmtrc.json --write src/server/handlers.ts
```

The write replaced the block's body with the guide fence, so `createListener`'s example now
imports through `@orkestrel/router/server` and `@orkestrel/router` rather than `@src/server`
and `@src/core`. That is what Ruling 3 asks the seed to carry across; recorded because the
published-specifier form is a guide convention arriving in source. Every other `@example`
block stays untitled.

## Criterion 5 — the tagline, the pitch, and the displaced prose

The H1 blockquote, one noun phrase in plain text and code spans, no link and no bold:

```text
> The typed request router: a path-matching engine (`Router`) that compiles route patterns,
> extracts URL-decoded params, and resolves the most specific match, with a fetch-standard,
> method-dimensioned dispatcher (`Dispatcher`), a headless History or hash `Navigator`, and a
> `node:http` adapter all composing that same engine.
```

`diff <(sed -n '3,6p' guides/router.md) <(sed -n '3,6p' README.md)` is empty: the pitch is the
same text with the same line breaks.

The guide's opening prose after the blockquote carries the displaced sentences without
restating the tagline's clauses: the guide's coverage of every published face, the core's
purity (the vocabulary it speaks, and neither DOM nor `node:*`), the seams that live in the
engine rather than in a face and what that buys, the native-override condition, and the
`Source:` links with the barrel note.

The README's opening paragraph keeps the onboarding it alone carries — how to start
(`Router`, `Dispatcher`, `createNavigator`, `createListener`), the `@orkestrel` line, and the
`@orkestrel/contract`, `@orkestrel/emitter`, `@orkestrel/abort` dependencies.

Prose changed beyond the blockquote, each recorded as an ancillary decision:

- The paragraph under the README's `## Usage` fence opened by restating the tagline's clauses
  (`Router` as the shared engine both faces compose). That opening sentence is cut; the
  sentences the README alone carries stay, with `defineRoute()` written as "the `defineRoute`
  function" and `History/hash` as "History or hash".
- Each `#### <Interface>` paragraph in `## Methods` restated its table cell for cell. Each is
  now one sentence introducing the table, keeping only the fact the table lacks: a group holds
  no registry of its own, and the dispatcher's registration guard reaches every route a group
  registers.
- All-caps emphasis corrected in the guide's own prose: the contract invariants headed
  **Doc-to-source bijection**, **Doc-to-source method bijection**, **Wildcard trailing-slash
  capture is asymmetric with param folding**, **Fallback semantics**, **Guard + supersede
  semantics**, **Intercepted links carry pathname only**, **Only HTML `<a>` elements are
  intercepted**, and **Transport-level 500 is a last resort, not an error policy**; the
  `### Groups and dedup` paragraph; and the `### Typing a route input at the registration
  site` paragraphs. `DOC ↔ SOURCE` became `Doc-to-source`. The remaining all-caps hits in the
  file are `HTML`, `SVG`, `AGENTS.md`, and `README.md`.
- Counts: `grep -niE '\b(two|three|…|dozen)\b' guides/router.md README.md` matches only an
  arity or a scenario rather than a tally of a growable set — "Compares two route paths" (the
  comparator's parameters), "Two matching routes compare left to right", and "two
  registrations differing only by a trailing slash". `grep -niE '\bboth\b'` returns hits that
  each name their members. Left as they are.
- Substitution-table sweep over `guides/router.md` and `README.md`, case-insensitive:
  `new` appears only inside `ts` fences as `new Request(...)` / `new Response(...)` (code, and
  data by the rule's own exemption); `once` appears only in the "compiled each path once" /
  "registered once" sense, which is numeric rather than temporal; `now` appeared once in the
  `NavigatorInterface` paragraph and went out with that paragraph's rewrite. No other banned
  row matched.

## § Tests

`guides/router.md` § Tests gained a `tests/guides.test.ts` bullet naming the checks
descriptively, with no SQ/MQ/EQ/RQ identifier: the `## Surface` to source bijection over
`src/core` / `src/browser` / `src/server`, the interface-to-class method bijection for `RouterInterface`,
`GroupInterface`, `DispatcherInterface`, `DispatchGroupInterface`, and `NavigatorInterface`,
and the equality gate — every `Summary` cell against its declaration's
description paragraph, the titled `Basic server` fence against the `@example` block of that
title (pinned so the titled pair cannot be retired silently), and the README pitch against the
guide's tagline — plus the flagship fences this project can execute.

## Criterion 6 — the seed at zero

```text
$ npm run docs                   rows read: 1, disagreements found: 0     (exit 0)
$ npm run docs -- --to guide     rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source    rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — gates

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/router.md README.md tests/guides.test.ts src/core src/browser src/server   exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings guides/router.md README.md tests/guides.test.ts src/core src/browser src/server   exit 0
$ npm run check                  exit 0
$ npm run test:guides            Test Files 1 passed (1); Tests 48 passed (48)     exit 0
$ npm run test:policy            Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)   exit 0
```

The cases that read red first are green in that run: `pairs at least one example title across
the guide and the source`, `opens the README with the guide tagline`, and `Router > keeps
every compared summary and example equal to its source`.

Observations, not criteria:

```text
$ npm run test:src:core          Test Files 7 passed (7); Tests 165 passed (165)
$ npm run test:src:browser       Test Files 3 passed (3); Tests 73 passed (73)
$ npm run test:src:server        Test Files 3 passed (3); Tests 27 passed (27)
$ npm run test:config            Test Files 1 passed (1); Tests 172 passed | 1 skipped (173)
$ npm run test:setup             Test Files 3 passed (3); Tests 9 passed (9)
```

`test:src:browser` printed `[vite] (client) Re-optimizing dependencies because lockfile has
changed` and took 16.63s; it passed. No file outside the owned set was touched, and
`package.json` and `package-lock.json` were not read for edit.

## Criterion 8 — the tree

```text
$ git status --short
 M README.md
 M guides/router.md
 M src/browser/helpers.ts
 M src/browser/types.ts
 M src/core/DispatchGroup.ts
 M src/core/Dispatcher.ts
 M src/core/Group.ts
 M src/core/Router.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/server/handlers.ts
 M tests/guides.test.ts
```

Owned files only. Diffstat: 14 files changed, 492 insertions(+), 323 deletions(-).

## Reader and seed defects met

**A doc block truncated by a `*/` inside a code span silently removes its declaration from
`createSource`, and `npm run docs` reports nothing for the cells that lose their source
side.** Writing `` `/^[A-Za-z_]\w*/` `` into the `IdentifierHead` description closed the
comment at that `*/`. `createSource(...).surface()` then returned `PathParams` with an
`undefined` summary and dropped `PathParamsRaw`, `IdentifierHead`, and `SegmentParam`
entirely. `findDrift` compares only a pair present on both sides, so those dropped keys never
entered the drift list. Measured on the converged tree by reintroducing the truncation:

```text
$ npm run docs
guides/router.md type PathParams: guide "Extracts `{ name: string }` param records from a path pattern at the type level — the typed half of the path grammar." source absent
rows read: 1, disagreements found: 1
$ npm run check
src/core/types.ts(143,59): error TS1005: ';' expected.
exit 2
```

So the seed under-reports: the `PathParamsRaw`, `IdentifierHead`, and `SegmentParam` cells
lost their source pair and the run still read one disagreement, while `npm run check` catches
the truncation at exit 2. The gate
chain holds because `check` runs; a `docs`-only reading does not. During this unit the same
defect appeared as the seed line `guides/router.md type PathParams: guide absent source
absent; the source side carries no text` on a `--to guide` run that read
`written: 79, reported: 3`, leaving the `PathParamsRaw`, `IdentifierHead`, and `SegmentParam`
cells blank. The truncation was removed by rewording
the remark away from the regex literal, and the file was restored from a scratch copy by
editing; `git status --short` and every gate after the restore are the readings recorded
earlier.

**The brief's embedded worklist is short of the baseline reading.** `npm run docs` at `4101a0b`
prints `rows read: 1, disagreements found: 84`, and the brief's § The first `docs` worklist
begins at `const TIER_LITERAL`. The rows it omits are the ones the command prints ahead of `TIER_LITERAL`:

```text
guides/router.md function createRouter: guide "Create a `RouterInterface<Meta>` — the shared matching + registry engine." source "Creates a `RouterInterface` — the pure path-matching + registry engine shared by the browser `Navigator` and the core `Dispatcher`."
guides/router.md function createDispatcher: guide "Create a `DispatcherInterface<TState>` over one internal `Router`." source "Creates a `DispatcherInterface` — the fetch-standard, method- dimensioned dispatch entity over one internal `Router<RouteRecord<TState>>`."
guides/router.md function createNavigator: guide "Create a `NavigatorInterface<Meta>` composing one core `Router`." source "Creates a `NavigatorInterface` — the headless History/hash navigation entity composing one core `Router<Meta>`."
guides/router.md const METHOD_LIST: guide "The registrable HTTP methods as a frozen, ordered literal tuple." source "Lists the HTTP methods a `import('./types.js').DispatcherInterface` registers routes under, in canonical order — the single source the `import('./types.js').Method` type, `METHODS`, and `parseMethod` are all derived from."
guides/router.md const METHODS: guide "The registrable HTTP methods (`GET`…`OPTIONS`) as a `ReadonlySet`." source "Holds the complete set of HTTP methods a `import('./types.js').DispatcherInterface` registers routes under — backs the registration guard (`add` rejects any `method` outside this set) and the auto-`OPTIONS` `Allow` derivation."
```

`/home/user/scaffold/tmp/units/d7n-router-prep-report.md` § Item 4 carries the full list. The
omission is in the brief's transcription, not in the seed.

**A `## Methods` row whose interface declares no member doc blocks reads `guide absent source
absent` and still counts as a disagreement.** At baseline every member row of
`RouterInterface`, `DispatcherInterface`, `NavigatorInterface`, `GroupInterface`, and
`DispatchGroupInterface` read that way, because the guide's compared column was `Behavior` and
the interface members carried no blocks. `computeDrift` treats a pair where neither side carries text as
drift, so renaming the header alone moves each row from `absent absent` to `guide <text>
source absent`, which `--to guide` reports as "the source side carries no text" rather than
writing. Every fleet package whose interfaces document members only in the interface's own
`@remarks` bullet list owes the same member-block work its P.2 unit owes here; the seed cannot
supply it in either direction.

**A `{@link import('./x.js').Y}` tag renders into the cell as the import expression.**
`normalizeSummary` rewrites the tag to its target's code token verbatim, so
`{@link import('./types.js').DispatcherInterface}` reaches the guide as
`` `import('./types.js').DispatcherInterface` ``. Router carried the form in `METHOD_LIST`,
`METHODS`, `Method`, `Group`, and `DispatchGroup`. Each needs a hand rewrite before
`--to guide`, and any fleet package using the import-path link form in a description owes the
same pass.

**A hyphen at a doc-block line wrap survives into the cell as `hyphen space word`.**
`normalizeSummary` collapses the newline to a space and keeps the hyphen, so
`method-\n * dimensioned` compares as `method- dimensioned`. Router carried it in
`createDispatcher`, `RouterOptions`, `DispatchResult`, and `NavigatorInterface`; each was
reflowed. Nothing in the gate names this, so the wrong text converges silently.

## Deviations

None. No stop condition fired: every cell the seed located after the header change was
written, the titled body fitted its block, no test outside `tests/guides.test.ts` reddened, no
vendored file needed an edit, and the residual disagreements closed under the P16 comparator.
No lint control was planted — the Orchestrator takes that reading after this unit exits.

Ancillary matters decided and recorded in place: the `Shape` convention sentence sits above
its table (the pilot's position); the titled pair is `createListener` and `### Basic server`;
`computeNavigationKey`'s cell dropped "nested-route"; the `## Methods` intro paragraphs were
cut back to one introducing sentence each; and the README paragraph under `## Usage` lost the
sentence that restated the tagline.
