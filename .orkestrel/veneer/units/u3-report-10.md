# Unit U3 — report 10 (successor brief 12)

Every item of `u3-brief-12.md` is done. `:is()` and `:where()` now leave the grammar:
`scanUnreadForm` names `functional list` for either, at any depth, in any case, decoded, outside
quotation, and `matchesLooseTagPair` throws on it. The expansion readers and their cases are gone.
Every gate the brief names exits 0 on managed Chromium, and `test:src:styles`, `test:src`, and
`test:setup:browser` exit 0 on Edge. The built cascade's SHA-256 is
`8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1` before the build, after it, and
after the suite — the digest the brief names. The elements-layer assertion reads the same list, and
`tests/src/styles/index.test.ts` is byte-identical to its report-9 state.

§ Deviations records one correction to the brief: its item 1 control `:not(h1)+p` reads `false`,
not the `true` the brief states, before and after this change. The reading is right and the brief's
expected value is wrong; `:not(h1)+p` false and `h1:not(p) + p` true are cases now.

## Touched files

| File                        | Change over the report-9 baseline                                                                                                                                                                                                                                                                                                                       | Lines       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `tests/setupStyles.ts`      | `scanUnreadForm` refuses the functional list; `extractCompoundTags` reads the compound's leading identifier and nothing else; `extractSelectorCompounds` carries the drop of a compound naming no tag again; `matchesLooseTagPair` reads `extractSelectorCompounds`; `extractCompoundAlternatives`, `extractSelectorSubject`, `extractBareTag`, `mergeCompoundTags`, `expandCompoundSelector`, `expandComplexSelector`, and `dropTaglessCompounds` deleted; `walkSelector`'s reader list closed and its grammar sentence rewritten; every TSDoc block re-wrapped to 100 columns | 1601 → 1405 |
| `tests/setupStyles.test.ts` | the refusal case and the fence's new rows; the readings of the deleted readers removed; every other `:is()`/`:where()` reading either a refusal case or rewritten over `:not()`, which the grammar still reads; `extractSelectorCompounds` cases for the middle drop; the deleted exports out of the import and inventory lists                    | 873 → 758   |

Diff against the report-9 snapshots `tmp/u3/setupStyles-before-12.ts` and
`tmp/u3/setupStylesTest-before-12.ts`:

```text
 tests/setupStyles.ts      | 466 ++++-------------  135 insertions(+), 331 deletions(-)
 tests/setupStyles.test.ts | 231 ++++--------------   58 insertions(+), 173 deletions(-)
```

`git status --porcelain` at return lists report 9's set exactly, with no file added or removed. The
report, the instruments, and the retired probes sit under the ignored `tmp/`.

## The export list

`tests/setupStyles.ts` exported, before this brief and after it, the same names except for these,
which are gone: `dropTaglessCompounds`, `expandComplexSelector`, `expandCompoundSelector`,
`extractBareTag`, `extractCompoundAlternatives`, `extractSelectorSubject`, and `mergeCompoundTags`.
The selector readers that remain are `matchesCSSWhitespace`, `trimCSSWhitespace`, `readEscape`,
`walkSelector`, `readIdentifier`, `extractSelectorIdentifiers`, `splitTopLevelList`,
`normalizeComplexSelector`, `splitTopLevelCompounds`, `findGroupEnd`, `extractCompoundTags`,
`extractSelectorCompounds`, `scanUnreadForm`, and `matchesLooseTagPair`, with the types
`SelectorCombinator`, `SelectorCompound`, `SelectorEscape`, `SelectorStep`, and
`SelectorIdentifier`. The full lists are `tmp/u3/exports-before-12.txt` and
`tmp/u3/exports-after-12.txt`, and the inventory case at `tests/setupStyles.test.ts:56` reads the
after list.

`dropTaglessCompounds` folded into `extractSelectorCompounds` rather than being renamed; § Ancillary
choices states why.

## Every reading, before and after

Taken by running the live functions through `tmp/probe/selector12.test.ts` in the `probe` project,
once against the readers as report 9 left them (`tmp/u3/before-12.txt`) and once against the final
tree (`tmp/u3/after-12.txt`). Every row that moved is tabled here; the two files are identical on
every other row. The probe is retired to `tmp/u3/probe-selector-12.test.ts.txt`, outside that
project's include glob, because its inputs are promoted into `tests/setupStyles.test.ts`. In the
tables `\` is one backslash, and `mLTP`, `eCT`, `eSC`, `sUF`, `sTL`, `nCS`, `sTC`, `fGE`, `wS`,
`rE`, `rI`, `eSI`, `tCW`, and `mCW` name `matchesLooseTagPair`, `extractCompoundTags`,
`extractSelectorCompounds`, `scanUnreadForm`, `splitTopLevelList`, `normalizeComplexSelector`,
`splitTopLevelCompounds`, `findGroupEnd`, `walkSelector`, `readEscape`, `readIdentifier`,
`extractSelectorIdentifiers`, `trimCSSWhitespace`, and `matchesCSSWhitespace`.

Every reading that moved carries an `:is()` or a `:where()` in its input, `:i\73(` included. No
other reading moved.

**The pair reader refuses what it used to judge.** Each of these throws
`matchesLooseTagPair reads no functional list: <selector>` after; the column is what it read
before.

| Input                            | Before                   |
| -------------------------------- | ------------------------ |
| `:is(h1, p)`                     | `false`                  |
| `:is(h1,p)`                      | `false`                  |
| `:where(h1)+p`                   | `true`                   |
| `:IS(h1)+p`                      | `true`                   |
| `:i\73(h1)+p`                    | `true`                   |
| `:not(:is(h1))+p`                | `false`                  |
| `:not(:IS(h1))+p`                | `false`                  |
| `:is(h1)+:is(p)`                 | `true`                   |
| `:is(.title,h1)+p`               | `true`                   |
| `:is(h1,:where(.title))+p`       | `true`                   |
| `:is(h1:not(.x), p) + p`         | `true`                   |
| `:where(h1, p)`                  | `false`                  |
| `:is(h1 p)`                      | `true`                   |
| `:is(.title > h1)+p`             | `true`                   |
| `:where(.title > h1)+p`          | `true`                   |
| `:is(details p) summary`         | `true`                   |
| `:is(details) summary`           | `false`                  |
| `:is(details .x) summary`        | `false`                  |
| `p:is(p, .lead)`                 | `false`                  |
| `h1:is(p) + p`                   | `false`                  |
| `h1:is(p) + p + span`            | `false`                  |
| `h1:is(.lead) + p`               | `true`                   |
| `:is(h1 .x) p`                   | `true`                   |
| `:is(h1 .x p)`                   | `true`                   |
| `h1 :is(.x p)`                   | `true`                   |
| `:is(h1)>:where(p)`              | `true`                   |
| `:is(.title[title="("], h1)+p`   | `true`                   |
| `:is(.title[title="x"], h1)+p`   | `true`                   |
| `:W\48 ERE(:IS(h1),:where(p))+p` | `true`                   |
| `details :is(summary\ )`         | `true`                   |
| `details :is(summary)`           | `false`                  |
| `:is(h1\ ,p)`                    | `false`                  |
| `:is(li:nth-child(2n OF.x)) + p` | throws, names `of clause` |

The last row is the one input whose refusal changed name rather than appearing: the walk reaches the
`:is(` before the `:nth-child(` argument, so the functional list is the first unread form it finds.

**The fence names the form.** `sUF` returns the name rather than reading on.

| Input                   | Before             | After              |
| ----------------------- | ------------------ | ------------------ |
| `:is(h1, p)`            | `undefined`        | `functional list`  |
| `:where(h1)`            | `undefined`        | `functional list`  |
| `:IS(h1)`               | `undefined`        | `functional list`  |
| `:i\73(h1)`             | `undefined`        | `functional list`  |
| `:not(:is(h1))`         | `undefined`        | `functional list`  |
| `:is(.title > h1) + p`  | `undefined`        | `functional list`  |
| `:is(h1:has(p)) + p`    | `:has() argument`  | `functional list`  |

**The compound reader reads the leading identifier and nothing else**, and the compound sequence
built on it follows.

| Input                        | Before          | After   |
| ---------------------------- | --------------- | ------- |
| `:is(h1)`                    | `['h1']`        | `[]`    |
| `:is(h1, p)`                 | `['h1','p']`    | `[]`    |
| `:where( p )`                | `['p']`         | `[]`    |
| `:is(.title,h1)`             | `['h1']`        | `[]`    |
| `:is(h1,:where(.title))`     | `['h1']`        | `[]`    |
| `:is(h1, :where(p, .title))` | `['h1','p']`    | `[]`    |
| `:is(h1:not(.x), p)`         | `['h1','p']`    | `[]`    |
| `:is(.title[title="("], h1)` | `['h1']`        | `[]`    |
| `:is(.title[title="x"], h1)` | `['h1']`        | `[]`    |
| `:IS(h1)`                    | `['h1']`        | `[]`    |
| `:WHERE(h1, p)`              | `['h1','p']`    | `[]`    |
| `:is(details p)`             | `['p']`         | `[]`    |
| `:is(.title > h1)`           | `['h1']`        | `[]`    |
| `:is(h1\ ,p)`                | `['h1 ','p']`   | `[]`    |
| `h1:is(p)`                   | `[]`            | `['h1']` |
| `eSC(':is(h1, p)')`          | one compound naming `h1` and `p` | no compound |
| `eSC(':is(.title,h1)+p')`    | `h1` joined to `p` by `+`        | the one compound `p` |

Both readers sit below the fence and still answer for any text, and `matchesLooseTagPair` refuses
the selector before either is reached. `h1:is(p)` moving to `['h1']` is the rule stated plainly:
the pseudo-class belongs to its compound and names no tag, so the compound names the tag it opens
with.

**Every retained reading holds.** These are identical in `tmp/u3/before-12.txt` and
`tmp/u3/after-12.txt`, and each is a case.

| Reader | Input                                                             | Reading                                       |
| ------ | ----------------------------------------------------------------- | --------------------------------------------- |
| mLTP   | `h1 + p`, `details + summary`, `h1+p`, `.card h1 ~ p`             | `true`                                        |
| mLTP   | `h1 .x p`, `h1 .x > p`, `h1:not(p) + p`, `h1:not(.lead) + p`      | `true`                                        |
| mLTP   | `h1:nth-child(2n) + p`, `li:nth-child(2n) + p`, `li:nth-child(2n+1) + p` | `true`                                 |
| mLTP   | `li:nth-of-type(2n) + p`, `li:nth-child(2n\ of .x)+p`             | `true`                                        |
| mLTP   | `li:nth-child(2n [a="of"])+p`, `:not(h1) + p + span`              | `true`                                        |
| mLTP   | `details-card summary`, `det\ails summary`, `det\61<NBSP>ils summary` | `true`                                    |
| mLTP   | `h1\64x p`, `h1\2b  p`, `h1[title="("] + p`, `h1[data-x=":is("] + p` | `true`                                     |
| mLTP   | `h1[title="\"),\|/*:has(p)"] + p`, `h1 p`                         | `true`                                        |
| mLTP   | `details summary`, `details > summary`, `h1, p`, `body`, `:root`, `html` | `false`                                |
| mLTP   | `:not(h1)+p`, `h1\+p`, `h1\64 p`, `h1\2b p`, `h1\/\*p`            | `false`                                       |
| mLTP   | `detai\ls summary`, `DETAILS SUMMARY`, `\64 etails s\75 mmary`    | `false`                                       |
| mLTP   | `\000064etails \000073ummary`, `h1<NBSP>p`, `h1\ ,p`              | `false`                                       |
| mLTP   | `details<TAB>summary`, `details<LF>summary`, `details<CR>summary`, `details<FF>summary`, `details<NBSP>summary` | `false`          |
| mLTP   | `[title\|="x"] + p`, `[title='a\|b'] + p`, `[title="a\" b"] p`    | `false`                                       |
| mLTP   | `h1[title="("], p`, `h1[title="x"], p`, `[title=':is(h1)'] + p`   | `false`                                       |
| mLTP   | `h1[title="+ ~ > , :IS(p)"]`, `h1[title=":is(p),x"]`              | `false`                                       |
| mLTP   | `details summary\ `, `details summary\<TAB>`, `details summary\<FF>` | `true`                                     |
| mLTP   | `svg\|a + p`, `*\|a + p`, `\|a + p`, `[svg\|href] + p`            | throws, names `namespace separator`           |
| mLTP   | `h1:has(p) + p`, `h1:h\61 s(p)+p`, `h1:has(>p)+p`                 | throws, names `:has() argument`               |
| mLTP   | `li:nth-child(2n of .x) + p`, `(2n \6f f .x)`, `(2n o\66 .x)`, `(2n \6f\66 .x)` | throws, names `of clause`        |
| mLTP   | `(2n of.x)`, `(2n of[x])`, `(2n of:not(.x))`, `(2n OF.x)`, `:not(li:nth-child(2n of.x))` | throws, names `of clause` |
| mLTP   | `h1/**/+p`, `h1/* ":has(p)" */+p`, `h1 /* c */ + p`               | throws, names `comment`                       |
| eCT    | `h1`, `P.lead`, `details`, `details-card`, `detai\ls`             | `['h1']`, `['p']`, `['details']`, `['details-card']`, `['details']` |
| eCT    | `det\ails`, `h1\64 p`, `h1\+p`, `h1\ `, `det\61<NBSP>ils`         | `['det\nils']`, `['h1dp']`, `['h1+p']`, `['h1 ']`, `['deta<NBSP>ils']` |
| eCT    | `h1:not(p)`, `h1:nth-child(2n)`, `h1::after`                      | `['h1']`                                      |
| eCT    | `:not(h1)`, `:NOT(h1)`, `:root`, `.card:hover::after`, `[data-bs-theme='dark']`, `[title=':is(h1)']` | `[]`        |
| eSC    | `h1 + p`, `details > summary`, `h1:not(p) + p`                    | the two compounds, joined by `+`, `>`, `+`    |
| eSC    | `html`                                                            | the one compound `html`                       |
| eSC    | `:root`, and `:not(h1) + p` reading the one compound `p`          | no pair to judge                              |
| eSC    | `.card h1 ~ p`, `h1 .x p`, `h1 .x > p`                            | `h1` joined to `p` by `~`, by ` `, by `>`     |
| sUF    | `svg\|a + p`, `h1:HAS(p) + p`, `li:nth-last-child(2n OF .x)`, `h1 /* c */ + p` | `namespace separator`, `:has() argument`, `of clause`, `comment` |
| sUF    | `[title\|="x"] + p`, `[title='a\|b /* c */ :has('] + p`, `h1\|a + p`, `li:nth-child(2n+1) + p`, `h1:not(p)`, `details summary` | `undefined` |
| sTL    | `h1\ ,p`, `[title="a,b"] p`, `rgba(0, 0, 0, 0.5) 0 1px 2px`, `h1<NBSP>, p` | the escaped space kept, each group whole |
| nCS    | `h1+p`, `h1\+p`, `h1<NBSP>p`, `[title="a  b"]`                    | `h1 + p`, and the other three unchanged       |
| sTC    | `.card h1 ~ p`, `[title='a b'] p`, `[title="a\" b"] p`, `h1\ p`, `h1\+p`, `h1<NBSP>p`, `  ` | the split reports 4 to 9 record |
| fGE    | `[title=')']` 0, `[title="a\"]"]` 0                               | `10`, `13`                                    |
| wS     | `h1[title="a,b"]`, `h1\(p`                                        | the depths reports 4 to 9 record              |
| rE     | `det\61<NBSP>ils` 3, `\64 p` 0, `\l` 0, `\+` 0, `\0 x` 0, `a\` 1  | `a`/3, `d`/4, `l`/2, `+`/2, U+FFFD/3, empty/1 |
| rI     | `[a="\64"]` 4, `details-card` 0, `a"b"` 0                         | `undefined`, the whole identifier, `a`        |
| eSI    | `2n of .x`, `2n\ of .x`, `2n \6f f .x`, `2n of.x`, `2n+1`, `[a="of"]`, `2n of:not(.x)` | the identifier lists reports 4 to 9 record, and `['2n','of','not','x']` |
| tCW    | `h1\ `, ` h1\<TAB> `, `\f\t h1 \r\n`, `<NBSP>h1<NBSP>`, `  `      | `h1\ `, `h1\<TAB>`, `h1`, unchanged, empty    |
| mCW    | the space, tab, line feed, carriage return, and form feed         | `true`; `<NBSP>`, U+2028, and `x` are `false` |

The readings the brief names as direct assertions are the ones this change makes reachable rather
than moves. `extractCompoundTags('h1:not(p)')` and `('h1:nth-child(2n)')` are `['h1']`, asserted at
`tests/setupStyles.test.ts:499`. `extractSelectorCompounds('h1 .x p')` is `h1` joined to `p` by the
descendant combinator, and `('h1 .x > p')` by the child combinator, asserted at `:533`.

## The failing-first proof

The command is `npm run test:setup`, run over the tree with the rewritten cases and the readers as
report 9 left them, then over the same cases with the fix.

| Item | Red                          | Failing cases                                                                                                                                                                                              | Green            |
| ---- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 1    | `3 failed \| 80 passed (83)` | `refuses a functional list wherever it is written, however it is spelled, and reads the same text quoted`; `names the construct a selector writes outside the grammar, and none for one inside it`; `exports the scanner, the predicates, the collectors, and the compatibility oracle, and nothing the document has to answer` | `83 passed (83)` |

The refusal case reported `expected [Function] to throw an error` on the pair reader's first row,
the fence case `expected undefined to be "functional list"` on `scanUnreadForm(':is(h1, p)')`, and
the inventory case the deleted exports the old tree still carried. Item 2 keeps readings rather
than changing them, so it carries no red; items 3 and 4 are prose and carry none either. Both probe
runs and the gate runs are over the same two files, swapped by `cp` from
`tmp/u3/setupStyles-before-12.ts` and `tmp/u3/setupStyles-after-12.ts`.

## The grammar sentence

`walkSelector`'s TSDoc now states the grammar as:

> The grammar is strings, escapes, groups, identifiers, combinators, and comma lists, and nothing
> else. A `"` or a `'` opens a string that the same mark closes, and every character of it, the
> marks included, is quoted and literal. A `\` and the escape it opens, as `readEscape` measures it,
> are literal wherever they appear, so an escaped quotation mark leaves its string open, an escaped
> `+` belongs to the identifier around it rather than joining two compounds, and the whitespace
> ending a hexadecimal escape separates nothing. A `(` or a `[` opens a group that a `)` or a `]`
> closes, groups nest, and `depth` counts the ones still open; a closer with no opener leaves
> `depth` at zero. An identifier runs over letters, digits, `-`, `_`, the characters past U+007F,
> and escapes, which `readIdentifier` decodes. A `>`, a `+`, or a `~` outside a group and outside
> quotation is a combinator, a run of the whitespace `matchesCSSWhitespace` names is the descendant
> combinator, and a comma outside a group separates complex selectors. Every pseudo-class and every
> pseudo-element reads as part of the compound it is written in and names no tag, so `h1:not(p)`
> names `h1` alone and `:not(h1)` names none.

The paragraph after it names the fence:

> A construct the grammar does not carry is a different matter, because a reader would answer from a
> misreading of it rather than from the text: `scanUnreadForm` names each one — the namespace
> separator, a `:has()` argument, an `of` clause, a comment, and the functional list an `:is()` or
> `:where()` argument writes — and `matchesLooseTagPair` refuses a selector carrying it.

## The reader list

`walkSelector`'s TSDoc names the readers as a closed list:

> This is the grammar every selector reader in this module reads through. The readers that read
> these steps are `findGroupEnd`, `trimCSSWhitespace`, `splitTopLevelList`,
> `splitTopLevelCompounds`, `normalizeComplexSelector`, `readIdentifier`,
> `extractSelectorIdentifiers`, `extractCompoundTags`, and `scanUnreadForm`, and that list is
> closed. A reader obtains an identifier from `readIdentifier`, which reads these same steps, and
> every other reader in it reads the steps themselves, so every one of them answers a given form the
> same way. Each remaining reader is built on those: `extractSelectorCompounds` reads a complex
> selector through `normalizeComplexSelector`, `splitTopLevelCompounds`, and `extractCompoundTags`;
> `matchesLooseTagPair` reads a selector list through `scanUnreadForm`, `splitTopLevelList`, and
> `extractSelectorCompounds`; and `extractShadowLayers` reads a declaration value through
> `splitTopLevelList` and `splitTopLevelValues`, which carries its own reading of a value's tokens.

The list is checked against the code rather than against the prose: every function whose body calls
`walkSelector` is named in it, which is `extractCompoundTags`, `extractSelectorIdentifiers`,
`findGroupEnd`, `normalizeComplexSelector`, `scanUnreadForm`, `splitTopLevelCompounds`,
`splitTopLevelList`, and `trimCSSWhitespace`, and the one name in the list that takes the steps as a
parameter instead is `readIdentifier`, which the sentence says. The round-8 finding was
`extractBareTag` missing from the list; that reader no longer exists.

## Prose

- Re-wrapped to `printWidth` 100: every TSDoc block this unit wrote, and the blocks of
  `EDGE_SHORTHANDS`, `matchesRadiusShorthand`, `BOOTSTRAP_SCOPE_PATTERNS`, `THEME_DARK_ADDITIONS`,
  and `SelectorEscape.text`, which ran past 100 columns from earlier rounds. No line of a TSDoc
  block in either owned file exceeds 100 columns now. `tests/setupStyles.test.ts` carries no comment
  at all; its lines past 100 columns are `it()` titles, which the formatter accepts as written.
- The negative sentence is positive: "so a form the grammar does not carry cannot pass as a
  permitted selector" now reads "so every selector it judges is one this grammar reads whole".
- "tagless" appears in neither file. The module says "a compound naming no tag" throughout.

## The shipped cascade

`dist/src/styles/index.css` writes two `elements`-layer rules, `html` and `body`. Neither is a pair,
so `tests/src/styles/index.test.ts`'s assertion reads the same empty list, and that file is
byte-identical to its report-9 state (`git diff --no-index` against `tmp/u3/indexTest-before-12.ts`
reports nothing). Read through the fence, no rule anywhere in the built cascade is refused:
`tmp/u3/probe-cascade-12.test.ts.txt` reports `elements-layer selectors: ["html","body"]`,
`loose pairs: []`, and `whole cascade refusals: []`. The cascade writes no `:is()` and no
`:where()`, so the stricter fence refuses nothing the package ships.

## Gates

Managed Chromium, Windows, 2026-09-20, from `tmp/u3/gates-12.log.txt`, run over the final tree.
`lint:check` and `check` print no diagnostic on success. The `npm test` row is the whole chained
suite; the project rows after it are the same projects run one at a time, because the chained run's
tail truncates every project but the last:

```text
cascade digest before build  8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1
npm run format:check         All matched files use the correct format.                  exit=0
npm run lint:check           no diagnostic printed                                      exit=0
npm run check                no diagnostic printed                                      exit=0
npm run build                built in 317ms                                             exit=0
cascade digest after build   8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1
npm run test:setup           Test Files  3 passed (3)    Tests  83 passed (83)          exit=0
npm run test:src:styles      Test Files  7 passed (7)    Tests  40 passed (40)          exit=0
npm run test:src             Test Files  5 passed (5)    Tests  17 passed (17)          exit=0
npm run test:setup:browser   Test Files  1 passed (1)    Tests  18 passed (18)          exit=0
npm run test:conformance     Test Files  1 passed (1)    Tests  7 passed (7)            exit=0
npm run test:guides          Test Files  1 passed (1)    Tests  18 passed (18)          exit=0
npm test                     Test Files  1 passed (1)    Tests  18 passed (18)          exit=0
npm run test:app             Test Files  2 passed (2)    Tests  3 passed (3)            exit=0
npm run test:journey         Test Files  4 passed (4)    Tests  32 passed | 4 skipped (36)   exit=0
npm run test:policy          Test Files  1 passed (1)    Tests  109 passed | 1 skipped (110) exit=0
npm run test:config          Test Files  1 passed (1)    Tests  173 passed | 1 skipped (174) exit=0
cascade digest after suite   8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1
```

Edge `msedge`, same host and date, from `tmp/u3/edge-12.log.txt`, over the same final tree:

```text
PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles     Test Files  7 passed (7)  Tests  40 passed (40)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:src            Test Files  5 passed (5)  Tests  17 passed (17)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser  Test Files  1 passed (1)  Tests  18 passed (18)  exit=0
```

`npm run test:distribution` needs the registry and stays the Orchestrator's. `npm run format` and
`oxlint --fix` were not run; `oxfmt --write` ran over `tests/setupStyles.ts` and
`tests/setupStyles.test.ts` alone, by path, once, and no file outside the two owned ones was
touched. The chains are `tmp/u3/gates-12.sh` and `tmp/u3/edge-12.sh`, each naming its own log in its
header. `setsid` does not resolve in this shell, so each chain ran as a harness-tracked background
command instead.

## The writing sweep over what this brief added

`tmp/u3/sweep12.mjs` collected the lines this brief added to the two owned files into
`tmp/u3/added-12.txt` and swept them case-insensitively for every unconditional row of the
substitution table, for the judged rows `now`, `new`, `latest`, `once`, `since`, `above`, `below`,
`master`, `currently`, and `soon`, and for the tally terms `both`, `two`, `three`, `four`, `five`,
`six`, `seven`, `several`, and `multiple`. The unconditional rows return `as soon as`, where the
match is the substring rather than the banned time adverb. The judged rows return nothing. The tally
sweep returns `joining two compounds`, `joins the same two`, and `joining two`, the fixed arity of a
combinator, and `four-value`, `four-token`, and `second and fourth`, the fixed arity of a CSS
shorthand — the sense report 5 ruled permitted. An earlier draft said "the readers above them",
which the substitution table's `above` row bans in that sense; it reads "Each remaining reader is
built on those" now.

## Deviations

**A correction to the brief rather than a stop.** Brief 12 item 1 names
`:not(h1)+p` as a control reading `true`. It reads `false`, before this change and after it, and the
reading is right: `:not(h1)` names no tag, so it is dropped, `p` becomes the first compound and
carries no combinator, and a selector carrying one tag-naming compound joins nothing. The measured
before and after rows are in `tmp/u3/before-12.txt` and `tmp/u3/after-12.txt`. None of the
deviation contract's stop conditions is met by it — no gate went red, no off-limits file is needed,
no shipped-cascade selector is refused, and item 2 keeps every reading it names — so the unit
implemented the reading the code gives and cased both sides of it:
`matchesLooseTagPair(':not(h1)+p')` is `false` and `matchesLooseTagPair('h1:not(p) + p')` is `true`,
at `tests/setupStyles.test.ts:557` and `:551`. The control's purpose is served either way: it shows
that a pseudo-class beside the refused ones is read rather than refused.

Nothing else. No gate went red after a fix inside owned files, no off-limits file was touched, no
shipped-cascade selector is refused by the new fence, and no retained reading item 2 names is one
this change cannot keep.

## Ancillary choices settled under the deviation contract

- **`dropTaglessCompounds` folded into `extractSelectorCompounds` rather than being renamed.** Item
  1 keeps it only where `extractSelectorCompounds` reads it and leaves the rename conditional on it
  staying. With the expansion gone that reader is its only consumer, the logic is a filter plus the
  first compound's combinator reset, and `AGENTS.md` § Design laws names folding trivial one-use
  logic into its caller as the alternative to exporting it. Folding also retires the coined word the
  round-8 reviewer flagged rather than replacing it with another coinage. The drop's readings stay
  cased through `extractSelectorCompounds`: `.card h1 ~ p` opens at `h1`, `h1 .x p` joins `h1` to
  `p` by the descendant combinator, `h1 .x > p` joins them by the child combinator, and `:root` and
  `:not(h1) + p` leave no pair to judge.
- **`extractCompoundTags` keeps its name and its list return.** Item 2 pins
  `extractCompoundTags('h1:not(p)')` to `['h1']`, and every `extractSelectorCompounds` reading
  reports 4 to 9 record carries `tags` as a list, so the shape stays. The reader absorbed
  `extractBareTag`'s body: the compound's leading identifier, a tag where the decoded text opens
  with an ASCII letter, lowercased.
- **A reading that the fence now refuses is a refusal case; a reading about groups, quotation, or
  escapes that merely used `:is()` as its example is rewritten over `:not()`.** `findGroupEnd`,
  `walkSelector`, `readIdentifier`, `splitTopLevelCompounds`, `splitTopLevelList`, and
  `normalizeComplexSelector` read below the fence and still answer for any text, so dropping their
  group-handling coverage with the refused spelling would have lost a proof the module needs.
  `:not()` is a functional pseudo-class the grammar still reads, so each of those cases keeps its
  meaning: `findGroupEnd(':not(h1,:not(.title))', 4)` is `20`, `splitTopLevelCompounds` splits
  `:not(h1, p) + p` into the argument, the combinator, and `p`,
  `normalizeComplexSelector(':not(h1,  p)+p')` keeps its own spacing, and
  `readIdentifier(walkSelector(':NOT(h1)'), 1)` is `NOT`.
- **The refusal reads the pseudo-class name through `readIdentifier`, beside `:has()`.** One line in
  the existing loop names the form, so the depth rule, the case rule, and the escape rule are the
  ones `:has()` already had, and `[title=':is(h1)']` stays text because the walk reports it quoted.
- **The `of`-clause case dropped its `:is()` spellings and kept what they proved.**
  `of:is(.x)` became `of:not(.x)` for the punctuation boundary, and `:is(li:nth-child(2n OF.x)) + p`
  became `li:nth-child(2n OF.x) + p` for the case fold. Both still throw naming `of clause`.
- **Case titles name what they prove.** The pair reader's decode case lost "and reads a functional
  name whatever its case", and the split case reads "keeping a functional argument and a quoted
  attribute whole", because the argument it keeps whole is now a `:not()`.

## Observations, outside this brief's items

- **A compound now names at most one tag, so `SelectorCompound.tags` and
  `extractCompoundTags` could collapse to one tag.** The list shape is what item 2 pins, so this
  change keeps it, and `matchesLooseTagPair` still reads both sides as lists. Collapsing it is a
  type change for a later brief to rule on.
- **The fence names `:is()` and `:where()` and not the legacy aliases** `:matches()` and
  `:-moz-any()`. Neither appears in the shipped cascade, and Sass emits neither, so nothing is
  refused or misread today; a partial writing one would be read as a pseudo-class naming no tag.
- **`:is (h1)` with a space between the name and the parenthesis is not refused.** The scanner
  requires the `(` at the step after the identifier, which is what CSS requires too: a functional
  pseudo-class is one function token, so a browser drops the rule as a parse error and the cascade
  never carries it.
- **A pair written inside a `:not()` argument is still not a pair of the selector.** That was the
  rule before this brief and it is unchanged; `:not()` names the elements a compound refuses.
- **`transition` and `forced-colors` still have no include under `src/styles/**`.** Reports 5 to 10
  record this and nothing in brief 12 changes it.

The instruments this brief added are `tmp/u3/region12.ts` and `tmp/u3/region12.test.ts` (the
replacement regions), `tmp/u3/splice12.ts` and `tmp/u3/spliceTest12.ts` (the spliced files as
written), `tmp/u3/sweep12.mjs` (the writing sweep), `tmp/u3/gates-12.sh` and `tmp/u3/edge-12.sh`
(the gate chains, with `tmp/u3/gates-12.log.txt` and `tmp/u3/edge-12.log.txt`), and the two retired
probes `tmp/u3/probe-selector-12.test.ts.txt` and `tmp/u3/probe-cascade-12.test.ts.txt`. The
report-9 states of the files this brief edits are `tmp/u3/setupStyles-before-12.ts`,
`tmp/u3/setupStylesTest-before-12.ts`, and `tmp/u3/indexTest-before-12.ts`, the fixed source is
`tmp/u3/setupStyles-after-12.ts`, and the readings are `tmp/u3/before-12.txt`,
`tmp/u3/after-12.txt`, and `tmp/u3/final-12.txt`, the last taken after the prose passes and
identical to `tmp/u3/after-12.txt`.
