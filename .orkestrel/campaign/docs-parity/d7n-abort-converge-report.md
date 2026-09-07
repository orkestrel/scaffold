# Report — A.2 `d7n-abort-converge` (the fleet pilot)

Every acceptance criterion is met. `npm run docs` exits 0 at `rows read: 1, disagreements found: 0`,
and every gate the brief names exits 0. Wall clock: 2026-09-07T13:38:55Z to 2026-09-07T13:48:48Z,
9m 53s from the first command to the last. No stop condition fired. The brief's fixed facts read
differently on this tree in the places § Reader and seed defects names, each with the seed's line.

## Criterion 1 — red-first on the unconverged tree

Command: `npm run test:guides`, run after the cases landed and before any convergence edit.

`Tests  3 failed | 22 passed (25)`

Each failing case's first lines, verbatim:

```text
FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/abort.md pairs: guide [\"Surface\",\"Create and abort\",\"Link to a parent (cascading cancellation)\",\"Race work against the signal\",\"Race work against the signal\"] source []",

FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:112:20
    112|  expect(pitch).not.toBeUndefined()

FAIL  |guides| tests/guides.test.ts > Abort > keeps every compared summary and example equal to its source
AssertionError: expected [ …(8) ] to deeply equal []
+   "guides/abort.md function createAbort: guide \"Create an `AbortInterface`, optionally with a trace `id` and a parent `signal`.\" source \"Creates a cancellation handle — a thin, traceable wrapper over a native `AbortController` whose `signal` can be linked to a parent signal.\"",
+   "guides/abort.md function validateAbortOptions: guide \"Validate once-read abort options and return a fresh copy omitting absent optional keys.\" source \"Validates and normalizes abort construction options.\"",
+   "guides/abort.md function linkSignal: guide \"Link an own `AbortSignal` to an optional parent signal, returning `AbortSignal.any([own, parent])` when a parent is given.\" source \"Links an own `AbortSignal` to an optional parent signal.\"",
+   "guides/abort.md function isAbortSignal: guide \"Total native-brand guard for `AbortSignal`; structural spoofs and hostile or revoked proxies fail safely.\" source \"Determines whether a value is a native `AbortSignal`.\"",
+   "guides/abort.md class Abort: guide \"A traceable `AbortController` wrapper whose `signal` can link to a parent.\" source \"Represents a cancellation handle — a thin, traceable wrapper over a native `AbortController` whose exposed `signal` can be linked to a parent signal.\"",
+   "guides/abort.md interface AbortOptions: guide absent source \"Represents the options for `createAbort` and `Abort` construction.\"",
+   "guides/abort.md interface AbortInterface: guide absent source \"Represents a cancellation handle — a thin, traceable wrapper over a native `AbortController` whose `signal` can be linked to a parent signal.\"",
+   "guides/abort.md AbortInterface.abort: guide absent source \"Aborts the handle, firing `signal`. Aborting is idempotent — the first reason sticks.\"",
```

The baseline seed reading before the cases landed: `npm run docs` → exit 1,
`rows read: 1, disagreements found: 9` (P19's value, reproduced).

The pin read red on the `source []` side, so it fires on a missing `@example` title, which is the
population it exists to hold. The equality case collected its lines against the seed's because the
seed adds the pitch pair after the row loop and the case reads `findDrift` alone; the README case
covers the pitch.

## Criterion 2 — headers

`grep -n '^| API\|^| Type\|^| Method' guides/abort.md`:

```text
27:| API           | Kind     | Summary     …
33:| API                    | Kind     | Summary     …
40:| API             | Kind     | Summary       …
46:| API     | Kind  | Summary        …
52:| Type             | Kind      | Shape         | Summary   …
67:| Method  | Returns | Summary       …
```

Every table heads `Summary`. The only columns beside it are `Kind`, `Shape`, and `Returns`.
`### Entities` (`:42`) became `### Classes`, its one row's `Kind` being `class`.

Types gained a `Summary` column. `AbortOptions` keeps its type literal
`` `{ id?: string; signal?: AbortSignal }` `` in `Shape`; the clause after its em dash
("options for `createAbort` / the constructor.") needed no move, because the doc block already
carried it as "Represents the options for `createAbort` and `Abort` construction." `AbortInterface`
carried no em dash, so its `Shape` cell was the prose "`id` / `signal` / `aborted` data members +
the `abort` method."; it became the member listing `` `id` / `signal` / `aborted` / `abort` ``,
following the guide's own precedent that a `Shape` cell lists an interface's property names alone
(`/home/user/fleet/guide/guides/guide.md:24`). The data/method split the dropped prose carried is
stated in the sentence directly under the table and in the § Methods intro. Recorded as an ancillary
decision.

## Criterion 3 — the blocks rewritten by hand, then `--to guide`

Rewritten verb-first before any propagation, each because the guide cell carried information the
description paragraph lacked. Every `@remarks` sentence stayed put, per Ruling 7.

| Declaration | File | What the cell carried that the block did not |
| --- | --- | --- |
| `validateAbortOptions` | `src/core/helpers.ts:6` | the once-read read, the fresh copy, the omission of absent optional keys |
| `linkSignal` | `src/core/helpers.ts:84` | the returned `AbortSignal.any([own, parent])` when a parent is given |
| `isAbortSignal` | `src/core/validators.ts:2` | totality across structural spoofs and hostile or revoked proxies |
| `AbortInterface.abort` | `src/core/types.ts:30` | the `aborted` flip, and that every later call is a no-op |

Taken from the source unchanged, the block being the richer side: `createAbort`
(`src/core/factories.ts:5`), `Abort` (`src/core/Abort.ts:5`), `AbortOptions` and `AbortInterface`
(`src/core/types.ts:2` and `:16`).

Rows whose literal stayed in `Shape`: `AbortOptions` alone. `AbortInterface`'s `Shape` carries a
member listing rather than a literal, and it stayed in `Shape` too.

`npm run docs -- --to guide` → `rows read: 1, disagreements found: 10, written: 8, reported: 2`,
then `npx oxfmt --config .oxfmtrc.json --write guides/abort.md`. The reported rows are the titled
pair, held back with "the guide fence owns an example", and the pitch, held back with "the README
pitch is authored by hand". Each is the subject of the criterion that follows.

## Criterion 4 — the titled pair

The pair: `createAbort`'s create-and-abort `@example` (`src/core/factories.ts:20` on the
baseline) titled `Create and abort`, against the first fence under `### Create and abort` (`guides/abort.md:85` on
the baseline).

Checks the brief required before titling: the fence body carries no three-backtick run and no `*/`
(`sed -n '85,95p' guides/abort.md | grep '\*/\|```'` returns the fence's own opening and closing
runs at the body's boundary and nothing inside it); and `grep -n 'Create and abort' guides/abort.md
README.md` returns `guides/abort.md:85` alone, so the heading text occurs once in the document.

The fence bodies read, both under `## Patterns`:

- `### Create and abort` — imports `createAbort`, creates a handle, hands `abort.signal` to
  `openStream`, and calls `abort.abort('user navigated away')`.
- `### Link to a parent (cascading cancellation)` — imports `createAbort`, creates a parent and a
  child linked through `parent.signal`, and calls `parent.abort()`.

`npm run docs -- --to source` → `rows read: 1, disagreements found: 2, written: 1, reported: 1`,
`wrote src/core/factories.ts`, then the scoped format. The `Create and abort` body replaced the
`fetch` body the block carried. `createAbort`'s parent-link `@example`, which the
`### Link to a parent (cascading cancellation)` fence demonstrates, stays untitled, and so does
every block on `validateAbortOptions`, `linkSignal`, `isAbortSignal`, and `Abort`.

## Criterion 5 — the blockquote, the pitch, and the displaced sentences

The tagline is now one noun phrase in plain text and code spans, with no link and no bold run,
carried across the same lines in both files:

```text
> The cancellation primitive: a thin, traceable wrapper over a native `AbortController` that
> carries a trace `id`, exposes a standard `AbortSignal`, and links to a parent signal so one
> cancellation cascades through a tree of handles.
```

`diff <(sed -n '3,5p' guides/abort.md) <(sed -n '3,5p' README.md)` reports no difference, so both
blockquotes are byte-identical, line breaks included.

Sentences displaced from the guide's old blockquote and its paragraphs, all folded into one opening
paragraph directly after the blockquote and before `## Surface`, none deleted: the `Abort` handle's
`id` / `signal` / parent-link sentence with its bold run intact; "Async layers bound their work
against a `signal`."; "Deliberately thin." with the `does **not**` sentences; the native
observation-contract sentence; and "Source: [`src/core`](../src/core). Surfaced through the
`@src/core` barrel." The paragraph is one block rather than the pair the blockquote carried,
because that paragraph break sat inside a blockquote the tagline replaced; recorded as an
ancillary decision.

The README's opening paragraph was replaced, keeping only the onboarding it alone carries — what
async work links a handle into it for, the start it names, and the `@orkestrel` line membership:

```text
Async work — a fetch, a timeout, a queue task — links into one handle to observe
cancellation: hand `abort.signal` to anything that already accepts an
`AbortSignal`, call `abort()` to cancel, and pass a parent `signal` to cascade one
cancellation across every linked handle. Part of the `@orkestrel` line.
```

Dropped from that paragraph, because the tagline now carries each: "A typed **`AbortController`**
wrapper", "a stable, traceable `id`", the `AbortSignal.any` parent-link clause, and "idempotent
`abort()` that preserves whichever reason arrives first" — the last of which § Usage restates in
full at `README.md:38-42` and the guide's § Contract invariant 5 pins.

The guide's § Tests line for `tests/guides.test.ts` gained the equality gate: the `Summary` cells
against their declarations' description paragraphs, the titled `Create and abort` fence against the
`@example` block of that title with its pin, and the README pitch against the tagline. See
§ Decisions for why it names the checks in that file's own descriptive idiom rather than as SQ, MQ,
and EQ.

## Criterion 6 — the seed

```text
$ npm run docs                     → exit 0: rows read: 1, disagreements found: 0
$ npm run docs -- --to guide       → exit 0: rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source      → exit 0: rows read: 1, disagreements found: 0, written: 0, reported: 0
```

Both write directions are idempotent over the converged tree, and every reading is a non-zero
`rows read`.

## Criterion 7 — the gates

```text
$ npx oxfmt --config .oxfmtrc.json --check README.md guides/abort.md src/core/factories.ts \
    src/core/helpers.ts src/core/types.ts src/core/validators.ts tests/guides.test.ts
  → exit 0: All matched files use the correct format.
$ npx oxlint --config .oxlintrc.json --deny-warnings src/core/factories.ts src/core/helpers.ts \
    src/core/types.ts src/core/validators.ts tests/guides.test.ts        → exit 0, no diagnostic
$ npx oxlint --config .oxlintrc.json --deny-warnings src/core tests      → exit 0, no diagnostic
$ npm run check                                                          → exit 0
$ npm run test:guides   → exit 0: Test Files 1 passed (1);  Tests 25 passed (25)
$ npm run test:policy   → exit 0: Test Files 1 passed (1);  Tests 90 passed | 1 skipped (91)
```

The lint run prints nothing on success, so its green was proved against a control drawn from
outside the population: a file in the orchestrator scratchpad carrying a doc block that opens on a
noun, linted with the same config, returned
`error policy(no-malformed-summary): Open this description with a third-person verb ending in s`
and exit 1. The control file was deleted in the next command and never entered the checkout.

Observations, not criteria:

```text
$ npm run test:src:core → exit 0: Test Files 4 passed (4);  Tests 51 passed (51)
$ npm run test:config   → exit 0: Test Files 1 passed (1);  Tests 172 passed | 1 skipped (173)
$ npm run test:setup    → exit 0: Test Files 1 passed (1);  Tests 1 passed (1)
```

`test:config` and `test:setup` were run to confirm no test outside `tests/guides.test.ts` went red,
which the deviation contract makes a stop condition. Neither did.

## Criterion 8 — scope

`git status --short`:

```text
 M README.md
 M guides/abort.md
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
```

Owned files only. `package.json` and `package-lock.json` are untouched, and the range stays
`^0.0.17` against the installed `0.0.18` head start. `git diff --stat`: 126 insertions, 42
deletions across those files.

## Reader and seed defects met

No reader returned a shape the brief does not describe, and the seed refused nothing it was asked
to write. The brief's fixed facts read differently on this tree in the places named here. Each is a
brief-fact correction rather than a reader defect, and none changed what the unit had to do.

1. **`--to guide` read `written: 8, reported: 2`, not the brief's predicted
   `written: 6, reported: 3`.** § What is fixed (brief `:22`, citing P19) quotes that prediction as
   "the reported rows being the two Types rows without a `Summary` column and the pitch". P19 took
   that measurement after renaming the Methods header alone, and explicitly left the Types table at
   `Type | Kind | Shape` (`orchestrator-measurements.md` § P19, the `sed:` line). This unit added
   the `Summary` column to Types as criterion 2 requires, so the seed located each Types cell and
   wrote it: `rows read: 1, disagreements found: 10, written: 8, reported: 2`. The reported rows
   are the titled pair and the pitch, each held for the criterion that owns it. No cell went
   unlocated after the header change.

2. **The titled block is `createAbort`'s create-and-abort `@example`, not the block at
   `src/core/factories.ts:29`.** The brief names `:29` and, in the same sentence, names
   `### Create and abort` (`guides/abort.md:85`) as the heading whose first fence demonstrates it.
   Those do not name one block: the block at `:29` carries the parent-link example, which
   `### Link to a parent (cascading cancellation)` demonstrates. `--to source` writes the titled
   fence's body over the tagged block, so titling `:29` would have replaced the parent-link example
   with a duplicate of the create-and-abort one and left the fence at `:100` with no `@example`.
   The create-and-abort block (baseline `:20`) is the block the named fence demonstrates, so it
   took the title. The objective — one `@example` titled with a fence's heading and equal to its
   body — is met either way, and only this reading keeps both examples.

3. **The seed reports the pitch outside the drift rows, so the equality case cannot carry it.**
   `scripts/docs.ts:414-426` compares the README pitch with the tagline after the row loop, adding
   its line to the same worklist and incrementing the same `found` tally. `findDrift` never sees
   the pair. This is why the baseline seed's worklist carried a pitch line the equality case's did
   not, and it is why the brief's README case exists. Working as designed; recorded because the
   seed's tally and the equality case's worklist look like a disagreement and are not one.

Nothing else refused. `replaceCell` located every `Summary` cell after the header change,
`replaceExample` accepted the titled body, and `tagline()` read both blockquotes.

## Decisions recorded

1. **The § Tests line names the equality checks descriptively, not as SQ, MQ, and EQ.** The brief
   (`:27`) fixes that the paragraph "gains SQ, MQ, and EQ if it names checks". Those identifiers
   belong to the `@orkestrel/guide` check catalog, and abort's own copy of that guide is a stale
   mirror: `grep -c 'SQ' /home/user/fleet/abort/guides/guide.md` returns 0, and the catalog at
   `guides/guide.md:376` lists SB, MB, LI, TE, NV, FL, EX, and FI with no equality rows. Ruling 5
   defers the mirror refresh to phase B, so an identifier written into abort's § Tests today
   resolves to nothing a reader of this repository can open. The line also names its existing
   checks descriptively ("the `## Surface` ↔ `src/core` bijection") rather than as SB and MB, so
   the identifiers would not have matched the sentence they joined. The equality gate is stated in
   full instead. Re-dispatch this line if the campaign wants the identifiers regardless; the mirror
   refresh is its prerequisite.

2. **The pin's title filter is a local predicate named `isTitle`.** The brief fixes this shape so
   every package copies one drop-in, including the packages that cannot import `isNonEmptyString`.
   The comment above it names `@orkestrel/contract`'s export and says why the file declares its own,
   so a reader does not read it as an overlooked primitive. `.claude/rules/tests.md` § Shared test
   infrastructure carries the same shape for the vendored test set.

3. **`README.md` joined `ROOT_FILES`.** `readInventory` walks directories, so the root README was
   outside the inventory the readers reflect over and the README case had nothing to read. Its doc
   comment widened from "files this package's guides link to" to "files these checks read", which
   is what the constant now holds.

4. **`GUIDE_SPEC` replaced each `'guides/abort.md'` literal in the `flagship fences` block.**
   One term for one file, and the pin and the README case need the constant anyway.

## Findings outside this unit's scope

`guides/abort.md:57` reads "(Surface rows, above)". `.claude/rules/writing.md` § Code tokens,
references, and links requires `preceding`, `following`, `earlier`, or `later` and bans `above`.
The sentence predates this unit, sits directly under the Types table this unit changed, and neither
the prose sweep in `tests/policy.test.ts` nor `policy/no-banned-term` matches that row, so it is
green today. Left unfixed rather than reopening a closed scope; it belongs to whichever unit owns
abort's prose next.

## Touched files

| File | Change |
| --- | --- |
| `/home/user/fleet/abort/guides/abort.md` | the tagline as one noun-phrase blockquote, the displaced sentences as the opening paragraph, `### Classes`, the `Summary` header on Types and Methods, every `Summary` cell written from its block, the § Tests equality line |
| `/home/user/fleet/abort/README.md` | the same blockquote under the H1, the opening paragraph reduced to the onboarding it alone carries |
| `/home/user/fleet/abort/src/core/helpers.ts` | `validateAbortOptions` and `linkSignal` description paragraphs rewritten verb-first |
| `/home/user/fleet/abort/src/core/validators.ts` | `isAbortSignal` description paragraph rewritten verb-first |
| `/home/user/fleet/abort/src/core/types.ts` | `AbortInterface.abort` description paragraph rewritten verb-first |
| `/home/user/fleet/abort/src/core/factories.ts` | the create-and-abort `@example` titled `Create and abort`, its body carried in by `--to source` |
| `/home/user/fleet/abort/tests/guides.test.ts` | the equality case, the title pin, the README case, `findDrift`, `GUIDE_SPEC`, `isTitle`, `README.md` in `ROOT_FILES` |

## Deviation state

No deviation. No stop condition fired: every `Summary` cell was located after the header change,
the doc block held the titled body, no test outside `tests/guides.test.ts` went red, no vendored
file needed an edit, and no reader returned an undescribed shape. The brief-fact corrections
under § Reader and seed defects met are recorded for the Orchestrator; none of them required a
decision the brief had not already settled.

## A.3 corrections (the Orchestrator)

Citations read against the committed tree: `### Classes` sits at `guides/abort.md:44` and the `### Create and abort` heading at `:87` (the § Tests edit shifted both by two lines after the check ran); the `Shape` convention sentence sits at `/home/user/fleet/guide/guides/guide.md:28`. The uniqueness check is heading-scoped (`grep -n '^#\+ Create and abort'`), because the § Tests prose this unit added mentions the title. The lanes read counts in this report's prose (the class table's row, the paragraph pair); each is struck. The titling edit preceded the `--to guide` run whose `reported: 2` names the pair, and is recorded here as its own step.
