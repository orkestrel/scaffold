# Report — P.2 `d7n-test-converge`

Wall clock: 2026-09-07T15:14:39Z → 2026-09-07T15:34:44Z.

## Mid-campaign correction

Both rules arrived after the writes they govern. Neither required an undo.

- **Rule 1 (`--to source` last).** It did not apply. `--to source` ran once, after `--to guide` had
  taken the summaries to zero: `rows read: 1, disagreements found: 2, written: 1, reported: 1` —
  the titled example alone, into `src/server/factories.ts`, with the pitch reported as hand-authored.
  Proof that no description was flattened: `git diff src/server/factories.ts` carries no deletion
  line, and a comparator over every doc block's description paragraph in every changed `src/**` file
  against `git show HEAD:<file>` names only my own hand edits (`CANVAS_COLOR`, `ElementOptions`,
  `FrameReading`, `PortfolioOptions`, `requireValue`, `RecorderInterface.clear`, `WaitOptions`). No
  `{@link X}` became a plain `X`, and no cell was copied over a block. A second `--to source` after
  the last block edits read `written: 0, reported: 0`.
- **Rule 2 (unescaped-pipe split).** It applied and was already satisfied. The rebuild split on
  `re.split(r'(?<!\\)\|', row)`. The baseline comparison is under Criterion 2.

## Criterion 1 — red-first on the unconverged tree

`npm run test:guides` → `Test Files 1 failed (1)`, `Tests 3 failed | 40 passed (43)`. Each failing
case's first lines, verbatim:

```text
 FAIL  |guides| tests/guides.test.ts > guides parity > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/test.md pairs: guide [\"Install\",\"Surface\",\"Record calls without a spy\", … ,\"Read a written frame back\"] source []",

 FAIL  |guides| tests/guides.test.ts > guides parity > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:285:21
    285|   expect(pitch).not.toBeUndefined()

 FAIL  |guides| tests/guides.test.ts > guides parity > Test > keeps every compared summary and example equal to its source
AssertionError: expected [ …(185) ] to deeply equal []
+   "guides/test.md function stagePane: guide \"Sets the viewport and renders the runner's tester pane at that size, unscaled.\" source \"Sets the tester's viewport and renders the runner's pane at the size that viewport claims.\"",
```

The equality case collects 185 lines where `npm run docs` reports 186: the seed compares the pitch
outside `findDrift`, and the README case owns it here.

`ROOT_FILES` does not exist in this file. `readInventory` takes named files beside walked
directories, and the drop-in's inventory already names `README.md`
(`readInventory(resolveRoot(import.meta), ['README.md', 'src', 'tests', 'guides'], …)`), so
`files['README.md']` is populated and the README case reads it directly. Recorded as the ancillary
substitution for that brief clause. The pin and the README case sit inside the file's own
`describe('guides parity')` block, outside the manifest loop, because this file wraps its
file-scope cases in that block; `GUIDE_SPEC` and `own` are file-scope constants.

## Criterion 2 — table headers and the class rows

`Behavior` → `Summary` in every `## Methods` table. Three `## Surface` Types tables gained `Summary`
as their last column. Header changes, read back from the tree:

```text
['Type', 'Kind', 'Shape']              → ['Type', 'Kind', 'Shape', 'Summary']    (core, browser, server Types)
['Method', 'Returns', 'Behavior']      → ['Method', 'Returns', 'Summary']        (every Methods table)
```

Every `## Surface` and `## Methods` table now heads `Summary` beside only `Kind`, `Shape`,
`Signature`, and `Returns`. The `## Voices` and `## Limits` tables sit outside both sections and are
untouched.

The class half is vacuous here and is recorded as such: `grep -rn 'export class' src/` matches
nothing, the guide carries no `### Entities` heading, and no class is documented under its own H3.
No `### Classes` table was added.

**Baseline cell comparison (correction 2).** A comparator over `git show HEAD:guides/test.md` and
the tree, splitting on `(?<!\\)\|`:

```text
rows compared: 238
rows missing now: []        rows added now: []
non-compared cell differences: 36
columns that changed: ['Shape']
every change is a truncation of the baseline cell: True
escaped pipes intact in the changed cells: True
```

The 36 changes are the em-dash clause leaving each Types-table `Shape` cell, plus the trailing period
on the three cells that carried a literal and no clause. No `Type`, `Kind`, `Method`, `Returns`,
`Signature`, or first-column cell moved. The cells carrying `\|` — `EventSubscriber`, `Result`,
`TeardownHandler`, `JSONValue` — kept their escapes, and no row was cut.

## Criterion 3 — the literals that stayed in `Shape`, and the blocks rewritten by hand

Every row of the three Types tables kept its type literal in `Shape` and took its description into
the new `Summary` cell:

- **core Types:** `WaitOptions`, `RetryOptions`, `EventSubscriber`, `RecorderInterface`,
  `EventSourceInterface`, `RecorderMap`, `Success`, `Failure`, `Result`, `SignalInterface`,
  `SignalRegistration`, `ResourceFactoryInterface`, `TeardownInterface`, `TeardownHandler`,
  `JSONValue`, `JSONSafe`, `HeadersSource`, `StateTransition`, `StateScenario`.
- **browser Types:** `Color`, `ElementOptions`, `FrameOptions`, `FrameReading`, `CaptureVariant`,
  `PortfolioOptions`, `PortfolioInterface`, `JournalStep`, `JournalInterface`.
- **server Types:** `ScratchInterface`, `ScratchIdentity`, `ScratchOptions`, `LoopbackInterface`,
  `CookieJarInterface`, `InventoryOptions`, `UpgradeOptions`, `UpgradeResult`.

A `Shape` idiom sentence sits under each table that carries the column, worded against the rows that
remain: the two Types tables in core and browser take "A `Shape` cell holds an interface's
`readonly` data members in braces and its call-signature members after `plus`, and a type alias's
own type"; the server Types table adds "whose arms are written with `or`" for `UpgradeResult`; the
server Constants table takes "A `Shape` cell holds the constant's declared type."

Blocks rewritten by hand, each because the guide cell carried what the block lacked:

| Declaration | File | What moved in |
| --- | --- | --- |
| `WaitOptions` | `src/core/types.ts` | Description takes the three bounds the trimmed clause named |
| `RetryOptions` | `src/core/types.ts` | Description takes the producer-call limit it adds to a wait |
| `EventSourceInterface` | `src/core/types.ts` | `@remarks`: the subscribe half is all it asks for |
| `Result` | `src/core/types.ts` | `@remarks`: `E` defaults to `Error` where `@orkestrel/contract` defaults it to `unknown` |
| `RecorderInterface.clear` | `src/core/types.ts` | `@remarks`: the list truncates in place, so an earlier `calls` reference empties too |
| `ResourceFactoryInterface.create` | `src/core/types.ts` | `@remarks`: the id counts allocations, never reissues, restarts at `1` after a clear |
| `ResourceFactoryInterface.destroy` | `src/core/types.ts` | `@remarks`: it records and nothing else, and accepts an id never created |
| `TeardownInterface.add` | `src/core/types.ts` | `@remarks`: registration order is what `destroy` reverses |
| `StateScenario.assert` | `src/core/types.ts` | `@remarks`: a throw is renamed with the row's name and rethrown |
| `decodeJSONLines` | `src/core/helpers.ts` | `@remarks`: an empty line contributes no value; a trailing carriage return is dropped |
| `requireValue` | `src/core/helpers.ts` | Description states the narrowing; `@throws` states the refusal the block never named |
| `CANVAS_COLOR` | `src/browser/constants.ts` | Description takes "opaque white", which the `Signature` column cannot carry |
| `typeAccessible` | `src/browser/helpers.ts` | `@remarks`: the text is escaped against the provider's key syntax |
| `ElementOptions` | `src/browser/types.ts` | Description takes the class list, text, and attributes |
| `FrameOptions` | `src/browser/types.ts` | Description takes where it writes, the viewport, and what it shoots |
| `FrameReading` | `src/browser/types.ts` | Description takes the device-pixel size and the bottom row's color |
| `CaptureVariant` | `src/browser/types.ts` | Description takes the document change the variant needs first |
| `PortfolioOptions` | `src/browser/types.ts` | Description takes the registry, matrix, variant, directory, and enablement |
| `JournalInterface.record` | `src/browser/types.ts` | `@remarks`: the step is frozen; a step outside a recording is not recorded |
| `ScratchInterface.destroy` | `src/server/types.ts` | `@remarks`: Idempotent, matching `LoopbackInterface.destroy` in the same file |
| `CookieJarInterface.capture` | `src/server/types.ts` | `@remarks`: a field carrying no `name=value` pair is read past and still returned |

Every other row's disagreement was a wording difference where the block already carried the cell's
substance in its description, `@param`, `@returns`, `@throws`, or `@remarks`, so `--to guide` carried
the block across. `npm run docs -- --to guide` read
`rows read: 1, disagreements found: 186, written: 185, reported: 1` (the pitch, hand-authored),
followed by `npx oxfmt --write guides/test.md`.

## Criterion 4 — the titled pair

The primary factory `createScratch` (`src/server/factories.ts`, the first `create*` the facts block
lists) carried no `@example` block at all — `src/server/factories.ts` is absent from the facts
block's per-file `@example` list, and `grep '@example' src/server/factories.ts` matched nothing on
the baseline. So the block was titled by authoring the tag, then the body was carried in.

- Heading uniqueness: `grep -n '^#\+ Own a temporary directory' guides/test.md` → one match.
- Fence eligibility, read from the first fence under that heading: language `ts`, 57 body lines,
  `contains */ : False`, `contains ``` : False`.
- Titling run: the `@example Own a temporary directory` tag added with a one-line placeholder body,
  then `npm run docs` → `rows read: 1, disagreements found: 2` (the new pair and the pitch).
- Carry run: `npm run docs -- --to source` → `wrote src/server/factories.ts`,
  `rows read: 1, disagreements found: 2, written: 1, reported: 1`, then
  `npx oxfmt --write src/server/factories.ts`.

`grep '@example' src/*/*.ts | grep -v '@example$'` matches exactly one line —
`src/server/factories.ts:38: * @example Own a temporary directory` — so every other block stays
untitled.

## Criterion 5 — the blockquote, the prose, and the pitch

The tagline is one noun phrase in plain text and code spans, with no link and no bold:

```text
> The test helpers the `@orkestrel` fleet kept rewriting, published once: families of what a test
> records, what it waits for, and what it owns, with a pair outside all of them and a browser
> journey layer beside them.
```

`diff <(sed -n '3,5p' guides/test.md) <(sed -n '3,5p' README.md)` is empty, and
`createGuide(...).tagline()` on each file returns the same string.

The displaced sentences fold into the guide's opening prose between the blockquote and `## Install`,
as ordinary paragraphs in the order the blockquote carried them: the three labelled family
paragraphs, the `resolveRoot` and `readInventory` pair, the paragraph placing `createHostileValues`,
the host-capability probes, `invokeUnchecked`, `readProperty`, and `flattenHeaders`, the journey
layer paragraph, the shipping rule with its `Limits` link and the `Source:` line, and the
zero-runtime-dependencies paragraph. The sentence the tagline now carries ("They read as families
of…") is gone from the prose, so no clause is restated.

The README's opening paragraph became the blockquote plus the onboarding it alone carries:

```text
Add it as a devDependency and import the core from `@orkestrel/test`. A helper ships here only when
enough packages had already written their own; the guide's [Limits](guides/test.md#limits) section
states that rule, what it excluded, and the one door the journey layer came through instead. Nothing
here runs in production code. Part of the `@orkestrel` line.
```

The member enumeration that duplicated the guide's families is gone; the README's
zero-runtime-dependencies paragraph, `## Usage`, and every later section stand.

§ Tests gained the equality gate named descriptively, with no identifier, inside the
`tests/guides.test.ts` entry: "It also runs the equality gate: every `Summary` cell against the
description paragraph of the declaration it documents, the titled fence against the `@example` block
of that title (pinned so the titled pair cannot be retired silently), and the README pitch against
this guide's tagline."

## Criterion 6 — the seed

```text
npm run docs                    → rows read: 1, disagreements found: 0                        exit 0
npm run docs -- --to guide      → rows read: 1, disagreements found: 0, written: 0, reported: 0
npm run docs -- --to source     → rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — the gates

Over the owned paths (`README.md guides/test.md src/browser/constants.ts src/browser/helpers.ts
src/browser/types.ts src/core/helpers.ts src/core/types.ts src/server/factories.ts
src/server/types.ts tests/guides.test.ts`):

```text
npx oxfmt --check <paths>                                     All matched files use the correct format.  exit 0
npx oxlint --config .oxlintrc.json --deny-warnings <paths>    no output                                  exit 0
npm run check                                                 no diagnostic from the root project or the three scoped projects  exit 0
npm run test:guides                                           Test Files 1 passed (1)   Tests 43 passed (43)
npm run test:policy                                           Test Files 1 passed (1)   Tests 90 passed | 1 skipped (91)
```

Observations, not criteria:

```text
npm run test:src:core     Test Files 3 passed (3)   Tests 107 passed (107)
npm run test:src:server   Test Files 2 passed (2)   Tests 144 passed | 8 skipped (152)
npm run test:setup        Test Files 3 passed (3)   Tests 24 passed (24)
npm run test:config       Test Files 1 passed (1)   Tests 172 passed | 1 skipped (173)
```

`npx oxlint` first reported `tests/guides.test.ts:446:9 warning eslint(no-shadow): 'own' is already
declared in the upper scope`: the file already bound a local `own` for its own file text inside the
fence-heading case. The file-scope `own` keeps the pilot's name for the package's own manifest row,
and the local was renamed `carrier`, which is the vocabulary that case already uses for the files
that carry a marker. Recorded as an ancillary decision.

No lint control was planted. The tree carries no probe and no instrument.

## Criterion 8 — the tree

```text
 M README.md
 M guides/test.md
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/server/factories.ts
 M src/server/types.ts
 M tests/guides.test.ts
```

Owned files only. `package.json`, `package-lock.json`, `guides/README.md`, every vendored file,
`tests/setup*.ts`, and `tests/src/**` are untouched.

```text
 README.md                |  19 +-
 guides/test.md           | 579 ++++++++++++++++++++++++-----------------------
 src/browser/constants.ts |   2 +-
 src/browser/helpers.ts   |   4 +
 src/browser/types.ts     |  16 +-
 src/core/helpers.ts      |   5 +-
 src/core/types.ts        |  24 +-
 src/server/factories.ts  |  61 +++++
 src/server/types.ts      |   4 +-
 tests/guides.test.ts     |  80 ++++++-
 10 files changed, 486 insertions(+), 308 deletions(-)
```

## Reader and seed defects met

None. Every write the seed made landed where the brief predicted, and every residual disagreement
closed under a doc-block rewrite. Two readings the fleet's other units may want:

- `replaceCell` writes into an empty `Summary` cell without disturbing the row, so a Types table can
  gain the column as blank cells and take its text from `--to guide` in one pass.
- The primary-factory branch of ruling 3 needs the `@example` tag authored first where the factory
  carries none. `replaceExample` refuses a block with no tag of that title, and `writeSource`
  reports `no doc block carries the key` in that case, so the tag with a placeholder body is the
  precondition for the `--to source` carry rather than an alternative to it.

## Deviations

None. Every stop condition in the deviation contract stayed clear: no cell resisted the seed after
the headers changed, the titled body fit its block, no test outside `tests/guides.test.ts` went red,
no vendored file needed an edit, no reader returned an undescribed shape, and no disagreement
survived a doc-block rewrite.

Ancillary matters decided and recorded: `README.md` reaches the README case through the drop-in's
existing named inventory target rather than a `ROOT_FILES` list this file does not have; the pin and
the README case sit inside the file's own `describe('guides parity')` block, outside the manifest
loop; the shadowed `own` was resolved by renaming the local to `carrier`; the `Result` row's
`[Limits](#limits)` pointer and the `@orkestrel/contract` divergence moved into the convention
sentence under the core Types table, so the link still resolves and the fact still reaches a guide
reader.


---

## Orchestrator annotation (test audit, 2026-09-07)

The audit read counts in this report's prose against the writing ban; every citation held against the tree. The report stands as the unit's evidence with this note.
