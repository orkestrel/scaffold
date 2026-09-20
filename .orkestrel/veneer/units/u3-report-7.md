# Unit U3 — report 7 (successor brief 9)

Every item of `u3-brief-9.md` is done. Every gate the brief names exits 0 on managed
Chromium, and `test:src:styles`, `test:src`, and `test:setup:browser` exit 0 on Edge. The built
cascade's SHA-256 is `8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1` before the
build, after it, and after the suite — the same digest the round-5 analyst read. Items 1 and 2 ran
red before their fix and green after; item 3's case was read red with the `@error` removed and green
with it restored. No deviation.

## Touched files

| File                        | Change over the report-6 baseline                                                                                                                                                                        | Lines       |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `guides/veneer.md`          | the `Source` legend table gained its introductory sentence; the Departures Token cells for `--vn-size-2` and `--vn-font-sans` became bare keys and their aliases moved into a sentence after the table; the either/or names one unit        | 398 → 403   |
| `src/styles/_tokens.scss`   | `$assets` carries `!default` and its comment records why                                                                                                                                                | 355 → 357   |
| `tests/setupStyles.ts`      | gained `SelectorEscape`, `readEscape`, `SelectorIdentifier`, and `readIdentifier`; `walkSelector` measures an escape through `readEscape`; `extractCompoundTags` reads its leading tag and its functional name through `readIdentifier` | 1149 → 1242 |
| `tests/setupStyles.test.ts` | cases for `readEscape`, `readIdentifier`, the walker's hexadecimal escape, the decoded tags, the case-insensitive functional name, the mandated-pair readings, and the asset guard; `compileString`, `readEscape`, and `readIdentifier` in the import and export lists | 578 → 641   |

`src/styles/_theme.scss` was planted and restored for item 3's failing-first proof and is
byte-identical to its report-6 state (`diff -q` against `tmp/u3/theme-before-9.scss` reports
nothing).

`git status --porcelain` at return lists report 6's set exactly. No file was added or removed.
Tracked diffstat:

```text
 README.md                         |    4 +-
 configs/src/vite.styles.config.ts |    3 +-
 guides/README.md                  |    8 +
 guides/veneer.md                  |  347 +++++++++++-
 src/core/index.ts                 |    2 +
 src/styles/_mixins.scss           |  124 +++++
 src/styles/_theme.scss            |   28 +-
 src/styles/_tokens.scss           |  355 ++++++++++++-
 src/styles/index.scss             |    2 +
 tests/distribution.test.ts        |    9 +-
 tests/setup.ts                    |   48 ++
 tests/setupBrowser.test.ts        |  212 +++++++-
 tests/setupBrowser.ts             |  293 +++++++++-
 tests/setupConformance.test.ts    |    8 +
 tests/setupConformance.ts         |   21 +-
 tests/setupStyles.test.ts         |  494 ++++++++++++++++-
 tests/setupStyles.ts              | 1063 ++++++++++++++++++++++++++++++++++++-
 tests/src/core/index.test.ts      |   53 +-
 tests/src/styles/index.test.ts    |   41 +-
 19 files changed, 3060 insertions(+), 55 deletions(-)
```

## Items 1 and 2 — the identifier reader and the functional name

`readEscape(text, index)` returns a `SelectorEscape` — the character the escape stands for and the
span it occupies, the backslash counted. A `\` followed by one to six hexadecimal digits stands for
that code point, and a whitespace character after the digits ends the escape and belongs to it; a
`\` followed by anything else stands for that character; a code point of zero, a surrogate, or one
past the Unicode range stands for U+FFFD; a `\` ending the text stands for nothing.

`readIdentifier(steps, start)` returns a `SelectorIdentifier` — the identifier's decoded text and
the index it ends before — or `undefined` where no identifier begins at `start`. It reads letters,
digits, `-`, `_`, any character past U+007F, and escapes, and stops at a character the walker
reports as quoted or as syntax.

`walkSelector` and `extractCompoundTags` changed to use them. `walkSelector` measures a
backslash's literal run with `readEscape` instead of marking the backslash and one character after
it, so the whitespace ending a hexadecimal escape is literal and separates no compound. `extractCompoundTags` reads its leading
tag and its functional pseudo-class name through `readIdentifier`: the leading identifier becomes a
tag when its decoded text opens with an ASCII letter, and a `:` at the compound's own depth outside
quotation starts a name that is compared lowercased against `is` and `where`, with the group taken
only when the step at the name's end is a `(` at that same depth.

After this, the readers in `tests/setupStyles.ts` that read selector text are `findGroupEnd`,
`splitTopLevelList`, `splitTopLevelCompounds`, `normalizeComplexSelector`, `readIdentifier`, and
`extractCompoundTags`, and each reads `walkSelector`'s steps or takes an identifier from
`readIdentifier`, which reads the same steps. `walkSelector`'s TSDoc states that, and
`extractCompoundTags`'s TSDoc states that its leading tag and its functional name both come from
`readIdentifier`. The one pattern still applied to a selector is `BOOTSTRAP_SCOPE_PATTERNS[scope].test(...)` inside
`extractBootstrapVariables`: it matches a whole scope selector such as `:root` against
`normalizeSelectorText`'s output and reads no compound, combinator, or group. `splitTopLevelValues`
is still left alone for the reason report 6 records.

## Items 1 and 2 — every reading, before and after

Taken by running the live functions through `tmp/probe/selector9.test.ts` in the `probe` project,
once against the readers as report 6 left them and once against the readers as this brief leaves
them. The probe is retired to `tmp/u3/probe-selector-9.test.ts.txt`, outside that project's include glob,
because its inputs are promoted into `tests/setupStyles.test.ts`.

**The analyst's table, every row.** `\` is written as one backslash.

| Reader                | Input                  | Required            | Before      | After               |
| --------------------- | ---------------------- | ------------------- | ----------- | ------------------- |
| `matchesLooseTagPair` | `details-card summary` | `true`              | `false`     | `true`              |
| `matchesLooseTagPair` | `details summary`      | `false`             | `false`     | `false`             |
| `matchesLooseTagPair` | `detai\ls summary`     | `false`             | `true`      | `false`             |
| `matchesLooseTagPair` | `det\ails summary`     | `true`              | `true`      | `true`              |
| `matchesLooseTagPair` | `:IS(h1)+p`            | `true`              | `false`     | `true`              |
| `matchesLooseTagPair` | `:is(h1)+p`            | `true`              | `true`      | `true`              |
| `extractCompoundTags` | `details-card`         | `['details-card']`  | `['details']` | `['details-card']` |
| `extractCompoundTags` | `detai\ls`             | `['details']`       | `['detai']` | `['details']`       |
| `extractCompoundTags` | `det\ails`             | `['det\nils']`      | `['det']`   | `['det\nils']`      |
| `extractCompoundTags` | `:IS(h1)`              | `['h1']`            | `[]`        | `['h1']`            |

`det\ails` decodes as the analyst's reading states it: `\a` is the hexadecimal escape for U+000A,
and `i` is neither a hexadecimal digit nor whitespace, so the identifier is `det`, a line feed, and
`ils`.

**One reading the CSS escape grammar corrected beyond the analyst's table.** A hexadecimal escape's
trailing whitespace belongs to the escape, so it ends no compound. The control replaces the
whitespace-terminated escape with one the following character ends:

| Reader                | Input       | Required   | Before    | After      |
| --------------------- | ----------- | ---------- | --------- | ---------- |
| `extractCompoundTags` | `h1\64 p`   | `['h1dp']` | `['h1']`  | `['h1dp']` |
| `matchesLooseTagPair` | `h1\64 p`   | `false`    | `true`    | `false`    |
| `matchesLooseTagPair` | `h1\64x p`  | `true`     | `true`    | `true`     |
| `extractCompoundTags` | `h1\+p`     | `['h1+p']` | `['h1']`  | `['h1+p']` |

**Every earlier reading, unchanged.** The report-6 controls, re-run in the same probe:

| Reader                | Input                          | Required | Before  | After   |
| --------------------- | ------------------------------ | -------- | ------- | ------- |
| `matchesLooseTagPair` | `h1\+p`                        | `false`  | `false` | `false` |
| `matchesLooseTagPair` | `h1+p`                         | `true`   | `true`  | `true`  |
| `matchesLooseTagPair` | `:is(.title[title="("], h1)+p` | `true`   | `true`  | `true`  |
| `matchesLooseTagPair` | `h1[title="("], p`             | `false`  | `false` | `false` |
| `matchesLooseTagPair` | `details + summary`            | `true`   | `true`  | `true`  |
| `matchesLooseTagPair` | `details > summary`            | `false`  | `false` | `false` |
| `extractCompoundTags` | `h1`                           | `['h1']` | `['h1']` | `['h1']` |
| `extractCompoundTags` | `P.lead`                       | `['p']`  | `['p']` | `['p']` |
| `extractCompoundTags` | `:root`                        | `[]`     | `[]`    | `[]`    |
| `extractCompoundTags` | `.card:hover::after`           | `[]`     | `[]`    | `[]`    |

Every other reading reports 4, 5, and 6 record is a case in `tests/setupStyles.test.ts`, and the
`setup` project reports them all green: the `matchesLooseTagPair` list, the
`normalizeComplexSelector` list, the `splitTopLevelCompounds`, `splitTopLevelList`, and
`findGroupEnd` lists, and the `extractCompoundTags` inputs report 6 names. The walker's
own cases hold with the escape-span change, including `walkSelector("'a")` and
`findGroupEnd(':is(h1', 3)`.

**The cases this brief adds, as the suite runs them.** `readEscape`: `h1\+p` at 2 is `+` over 2 units;
`detai\ls` at 5 is `l` over 2; `det\ails` at 3 is a line feed over 2; `h1\64 p` at 2 is `d` over 4;
`h1\64x` at 2 is `d` over 3; `\0` at 0 is U+FFFD over 2; `h1\` at 2 is the empty string over 1.
`readIdentifier` over the walk: `details-card` at 0 is `details-card` ending at 12; `detai\ls` at 0
is `details` ending at 8; `det\ails` at 0 is `det`, a line feed, `ils` ending at 8; `h1\64 p` at 0
is `h1dp` ending at 7; `:is(h1)` at 1 is `is` ending at 3; `:IS(h1)` at 1 is `IS` ending at 3;
`.title` at 0 is `undefined`; `[a="x"]` at 4 is `undefined`.

**What the fix reaches in the shipped cascade today.** No rule in `dist/src/styles/index.css` holds
a backslash or a hyphenated leading identifier in its selector, so
`tests/src/styles/index.test.ts`'s pair assertion over the `elements` layer reads the same list
before and after. The misread is closed before a component partial writes a custom element name or
an escaped identifier, not after.

## Items 1 and 2 — the failing-first proof

With the brief-9 cases in place and the readers as report 6 left them, `npm run test:setup`
reported:

```text
Test Files  1 failed | 2 passed (3)
     Tests  6 failed | 67 passed (73)
```

By name:

- `exports the scanner, the predicates, the collectors, and the compatibility oracle, and nothing the document has to answer`
- `walks each character of a selector with the group depth it sits at and whether it is text rather than syntax`
- `decodes a hex escape with the whitespace that ends it, a literal escape, and an out-of-range code point`
- `reads an identifier through the hyphens, digits, and escapes it is written with, and none where one does not begin`
- `reads a hyphen, a digit, and an escape into the tag they belong to, and the functional name whatever its case`
- `judges a mandated pair by the tag each compound decodes to, and reads a functional name whatever its case`

After the fix the same command reported `Tests 73 passed (73)`.

## Item 3 — the guard's test

`src/styles/_tokens.scss` declares `$assets` with `!default` and nothing else there changed. The
case in `tests/setupStyles.test.ts` compiles the shipped partials through `sass`, loading from
`src/styles` and configuring `$assets` at the first `@use`, in a rejection reading and a control:

```ts
it('refuses an asset key the dark map does not declare, and declares the alias for one it does', () => {
	const absent = "@use 'tokens' with ($assets: ('probe-absent': '--vn-probe'));\n@use 'theme';\n"
	const present =
		"@use 'tokens' with ($assets: ('select-indicator': '--vn-probe'));\n@use 'theme';\n"
	expect(() => compileString(absent, { loadPaths: ['src/styles'] })).toThrow(/probe-absent/u)
	expect(compileString(present, { loadPaths: ['src/styles'] }).css).toContain(
		'--vn-probe: url("data:image/svg+xml,',
	)
})
```

The rejection names the key the map added, and the control proves the same `@each` emitted the
declaration from the configured map rather than from the shipped one, because the shipped map never
names `--vn-probe`.

**Read red with the guard removed.** `tmp/u3/plant9.mjs plant` deleted the `@if not map.has-key`
block from `src/styles/_theme.scss`, and `npm run test:setup` reported:

```text
Test Files  1 failed | 2 passed (3)
     Tests  1 failed | 73 passed (74)

FAIL  |setup| tests/setupStyles.test.ts > styles setup > refuses an asset key the dark map does not declare, and declares the alias for one it does
AssertionError: expected [Function] to throw an error
```

`tmp/u3/plant9.mjs` restored the partial from `tmp/u3/theme-before-9.scss`, `diff -q` reported them
identical, and the same command reported `Tests 74 passed (74)`.

## Item 4 — the legend sentence

The paragraph preceding the `Source` legend table in `guides/veneer.md` ends:

> The table lists every `Source` value a cell can carry, and gives in each row what that value
> names.

A pass over `guides/veneer.md` for a table row whose nearest preceding non-blank line is a heading
returns one hit, `#### \`ColorModeInterface\`` in § Methods, which the objective lane and the subjective lane of round 5 ruled
introduced from the sentence before its heading and outside § Tokens. Inside § Tokens every table
follows a sentence.

## Item 5 — the departures cells

The Token cells for `--vn-size-2` and `--vn-font-sans` are bare keys, so the column
holds keys throughout. The aliases moved into a sentence after the table:

> Bootstrap's `--bs-body-font-size` reads `--vn-size-2` and its `--bs-font-sans-serif` reads
> `--vn-font-sans`, so those rows are the departures a Bootstrap component meets through its own
> variable rather than through a Veneer token it names directly.

§ Reference map's type table is where each of those facts is already recorded: it gives
`--bs-body-font-size reads --vn-size-2` for the size rung and `--bs-font-sans-serif` as an alias of
`--vn-font-sans`.

## Item 6 — the either/or

`guides/veneer.md` § Showcase reads "what it interpolates is proved by the first unit that
animates a keyword length." No line of the guide names a disclosure or drawer unit.

## Item 7 — gates

Managed Chromium, Windows, 2026-09-20, from `tmp/u3/gates-9.log.txt`, run over the final tree.
`lint:check` and `check` print nothing on success:

```text
cascade digest before build  8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1
npm run format:check         All matched files use the correct format.                  exit=0
npm run lint:check           no diagnostics                                             exit=0
npm run check                no diagnostics                                             exit=0
npm run build                built in 329ms                                             exit=0
cascade digest after build   8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1
npm run test:src             Test Files  5 passed (5)    Tests  17 passed (17)          exit=0
npm run test:src:styles      Test Files  7 passed (7)    Tests  40 passed (40)          exit=0
npm run test:app             Test Files  2 passed (2)    Tests  3 passed (3)            exit=0
npm run test:journey         Test Files  4 passed (4)    Tests  32 passed | 4 skipped (36)   exit=0
npm run test:policy          Test Files  1 passed (1)    Tests  109 passed | 1 skipped (110) exit=0
npm run test:config          Test Files  1 passed (1)    Tests  173 passed | 1 skipped (174) exit=0
npm run test:setup           Test Files  3 passed (3)    Tests  74 passed (74)          exit=0
npm run test:setup:browser   Test Files  1 passed (1)    Tests  18 passed (18)          exit=0
npm run test:conformance     Test Files  1 passed (1)    Tests  7 passed (7)            exit=0
npm run test:guides          Test Files  1 passed (1)    Tests  18 passed (18)          exit=0
cascade digest after suite   8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1
```

Edge `msedge`, same host and date, from `tmp/u3/edge-9.log.txt`, run over the same final tree:

```text
PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles     Test Files  7 passed (7)  Tests  40 passed (40)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:src            Test Files  5 passed (5)  Tests  17 passed (17)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser  Test Files  1 passed (1)  Tests  18 passed (18)  exit=0
```

`npm run test:distribution` needs the registry and stays the Orchestrator's. `npm run format` and
`oxlint --fix` were not run; `npx oxfmt --write` was run over `guides/veneer.md` and
`tests/setupStyles.test.ts` alone, both owned. The chains are `tmp/u3/gates-9.sh` and
`tmp/u3/edge-9.sh`, each superseding its `-8` predecessor. The instruments this brief added are
`tmp/u3/patch9.mjs` (the identifier character class), `tmp/u3/plant9.mjs` (the guard plant and its
restore), `tmp/u3/sweep9.mjs` (the guide's bare-table and carried-finding sweep), and
`tmp/u3/prose9.mjs` (the writing sweep). The report-6 states of the files this brief edits are
`tmp/u3/setupStyles-before-9.ts`, `tmp/u3/setupStylesTest-before-9.ts`, and
`tmp/u3/theme-before-9.scss`.

## The writing sweep over what this brief added

Every line this brief added to `guides/veneer.md`, `src/styles/_tokens.scss`, and `tests/**` was
collected into `tmp/u3/added-9.txt` by `tmp/u3/prose9.mjs` and swept case-insensitively for every
unconditional row of the substitution table, for the judged rows `now`, `new`, `latest`, `once`,
`since`, `currently`, `soon`, and `master`, and for the tally terms `both`, `two`, `three`, `four`,
`five`, `six`, `seven`, `several`, and `multiple`. The unconditional rows and the judged rows return
no hit. The tally sweep returns these hits, each in a permitted sense:

- `one to six hexadecimal digits` — the CSS escape grammar's own limit on an escape's digits, a
  value the reader needs.
- `rather than joining two compounds` — the fixed arity a combinator joins, ruled permitted in
  report 5.
- `Both identifiers this reads — the compound's own, and the functional pseudo-class name` — the
  sentence names its members.

## Deviations

None. No gate went red after a fix inside owned files, no off-limits file was touched, and the
`sass` compile the guard case needs drove the shipped partials without a workaround.

## Ancillary choices settled under the deviation contract

- **`readEscape` and `SelectorEscape` are a reader of their own**, rather than decoding folded into
  the identifier reader. The walker needs the escape's span and the identifier reader needs its
  value, and one function answering both is what keeps the two from disagreeing about where an
  escape ends.
- **`walkSelector` measures the escape rather than assuming it spans one character.** The brief put
  the hexadecimal decoding in the identifier reader, and leaving the walker at a backslash plus one
  character would have split `h1\64 p` into two compounds at the whitespace the escape owns, so the
  identifier reader could never have seen that identifier whole. Every walker reading report 6
  records is unaffected, because the measurements differ only where an escape carries a second
  hexadecimal digit or a terminating whitespace.
- **`readIdentifier` takes the walk and a start index**, returning `text` and `end`. It takes steps
  rather than text because the caller has already walked, and because the walker's `literal` flag is
  what stops the read inside an attribute string. `end` is what `extractCompoundTags` needs to find
  the `(` a functional name opens, and no caller needs a `start` member the caller supplied.
- **A tag is an identifier whose decoded text opens with an ASCII letter.** An HTML tag name is
  ASCII, and the test keeps `_private` and `-custom` from reading as tags while letting
  `\64 etails` read as `details`.
- **`extractCompoundTags` iterates the `:` steps rather than the `(` steps.** The name is what
  decides whether the group is read, so reading it forward from its own `:` is what makes the
  comparison case-insensitive and escape-tolerant without a second scan backwards over the text.
- **The guard case configures `$assets` and not `$dark`.** The brief grants `!default` on `$assets`
  alone, so the control's key is `select-indicator`, which the shipped `$dark` declares, and the
  custom property the case and the control both configure is `--vn-probe`, which the shipped map
  never names.
- **The departures aliases went into a sentence after the table** rather than into a "reached
  through" cell, because the column's other rows are bare keys and a reader scanning for
  `--vn-size-2` meets the key first either way.

## Observations, outside this brief's items

- **`extractBootstrapVariables` still tests a scope pattern against `normalizeSelectorText`'s
  output.** It identifies a whole scope such as `:root` or `[data-bs-theme=dark]` and reads no
  compound, combinator, or group, so it carries no selector grammar of its own. Recorded here so
  the next audit rules it rather than discovering it.
- **`transition` and `forced-colors` still have no include under `src/styles/**`.** Reports 5 and 6
  record this and nothing in brief 9 changes it.
- **§ Showcase's second paragraph still carries published-surface facts**, which round 5 bound to
  the U-styles-guide unit rather than to this one. Item 6's edit sits in that paragraph and leaves
  its placement to that unit.
