# Unit U3 — report 9 (successor brief 11)

Every item of `u3-brief-11.md` is done. Every gate the brief names exits 0 on managed
Chromium, and `test:src:styles`, `test:src`, and `test:setup:browser` exit 0 on Edge. The built
cascade's SHA-256 is `8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1` before the
build, after it, and after the suite — the digest the brief names. Items 1, 2, and 3 each ran red
before their fix and green after; item 4 is prose and carries no case. The elements-layer assertion
over the shipped cascade reads the same list, and `tests/src/styles/index.test.ts` is byte-identical
to its report-8 state. No deviation.

## Touched files

| File                        | Change over the report-8 baseline                                                                                                                                                                                                                                                                                                                 | Lines       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `tests/setupStyles.ts`      | gained `extractBareTag`, `mergeCompoundTags`, `dropTaglessCompounds`, `expandCompoundSelector`, `expandComplexSelector`, and `extractSelectorIdentifiers`; `matchesLooseTagPair` judges the expansion; `extractCompoundTags` merges an alternative's subject into the compound's own tag; `trimCSSWhitespace` trims through the walk; `scanUnreadForm` reads the `of` keyword as an identifier; the walker's, the tag reader's, the subject reader's, the compound reader's, and the pair reader's TSDoc state the expansion rule, and the two sentences and the scope-path clause read as item 4 states | 1387 → 1601 |
| `tests/setupStyles.test.ts` | cases for the expansion, the compound that selects nothing, the bare tag and the merge, the drop, the two expansion readers, the `of` keyword in each spelling, the identifier reader, and the literal trim; the six added exports in the import and inventory lists                                                                                | 745 → 873   |

Diff against the report-8 snapshots `tmp/u3/setupStyles-before-11.ts` and
`tmp/u3/setupStylesTest-before-11.ts`:

```text
 tests/setupStyles.ts      | 362 ++++++++++++++-----  288 insertions(+), 74 deletions(-)
 tests/setupStyles.test.ts | 128 ++++++++++++++++++  128 insertions(+)
```

`git status --porcelain` at return lists report 8's set exactly, with no file added or removed. The
report, the instruments, and the retired probes sit under the ignored `tmp/`.

## Every reading, before and after

Taken by running the live functions through `tmp/probe/selector11.test.ts` in the `probe` project,
once against the readers as report 8 left them and once against the final tree. The probe covers
230 readings: this brief's, and every reading reports 4 to 8 and the round-6 and round-7 analyst
records name. 22 moved, 26 answer where the reader did not yet exist, and 182 are identical. The
probe is retired to `tmp/u3/probe-selector-11.test.ts.txt`, outside that project's include glob,
because its inputs are promoted into `tests/setupStyles.test.ts`. In the tables `\` is one
backslash, `<TAB>` is a tab, and `mLTP`, `eCT`, `eCA`, `eSC`, `eXC`, `eXO`, `eSI`, `eBT`, `mCT`,
`dTC`, `sTL`, `sUF`, and `tCW` name `matchesLooseTagPair`, `extractCompoundTags`,
`extractCompoundAlternatives`, `extractSelectorCompounds`, `expandComplexSelector`,
`expandCompoundSelector`, `extractSelectorIdentifiers`, `extractBareTag`, `mergeCompoundTags`,
`dropTaglessCompounds`, `splitTopLevelList`, `scanUnreadForm`, and `trimCSSWhitespace`.

**Item 1 — alternatives by expansion.**

| Reader | Input                    | Required                          | Before          | After           |
| ------ | ------------------------ | --------------------------------- | --------------- | --------------- |
| mLTP   | `:is(h1 .x) p`           | `true`                            | `false`         | `true`          |
| mLTP   | `h1 .x p`                | `true`                            | `true`          | `true`          |
| eSC    | `h1 .x p`                | `h1` joined to `p` by ` `         | `h1`, `p` by ` ` | `h1`, `p` by ` ` |
| mLTP   | `:is(h1 p)`              | `true`                            | `true`          | `true`          |
| mLTP   | `:is(.title > h1)+p`     | `true`                            | `true`          | `true`          |
| mLTP   | `:where(.title > h1)+p`  | `true`                            | `true`          | `true`          |
| mLTP   | `:is(details p) summary` | `true`                            | `true`          | `true`          |
| mLTP   | `:is(details) summary`   | `false`                           | `false`         | `false`         |
| mLTP   | `:is(details .x) summary` | `false`                          | `false`         | `false`         |
| mLTP   | `:is(h1,p)`              | `false`                           | `false`         | `false`         |
| mLTP   | `p:is(p, .lead)`         | `false`                           | `false`         | `false`         |
| mLTP   | `h1:is(p) + p`           | `false`                           | `true`          | `false`         |
| mLTP   | `:is(h1 .x p)`           | `true`                            | `true`          | `true`          |
| mLTP   | `h1 :is(.x p)`           | `true`                            | `true`          | `true`          |
| mLTP   | `:is(h1)>:where(p)`      | `true`                            | `true`          | `true`          |

`eSC('h1 .x p')` is `[{ tags: ['h1'], combinator: undefined }, { tags: ['p'], combinator: ' ' }]`
before and after: the middle drop was already what the reader did, and the defect round 7 found was
that no case pinned it. The readings that hold on both sides are cases now; the two that moved are
`:is(h1 .x) p`, which the round-7 lanes found disagreeing with `h1 .x p`, and `h1:is(p) + p`, whose
compound selects no element.

Two readings beyond the brief's list moved with them, each a consequence of the same rule:
`eCT('h1:is(p)')` from `['h1','p']` to `[]`, because a compound selecting nothing names no tag; and
`mLTP('h1:is(p) + p + span')` from `true` to `false`, which is the neighbour that separates dropping
a dead compound from dropping the selector it kills. Both are cases.

The new readers answer where they did not exist before:

| Reader | Input                        | After                                                              |
| ------ | ---------------------------- | ------------------------------------------------------------------ |
| eBT    | `h1`, `P.lead`, `:is(h1)`    | `h1`, `p`, `undefined`                                             |
| mCT    | `([], ['h1'])`               | `['h1']`                                                           |
| mCT    | `(['h1'], ['p'])`            | `undefined`                                                        |
| mCT    | `(['h1'], ['h1','p'])`       | `['h1']`                                                           |
| dTC    | `[], h1 by ' ', p by '~'`    | `h1` first, `p` by `~`                                             |
| eXO    | `:is(details p)`             | one entry: `details`, then `p` by ` `                              |
| eXO    | `:is(h1 .x)`                 | one entry: `h1`, then a compound naming no tag by ` `              |
| eXO    | `h1:is(p)`                   | no entry                                                           |
| eXC    | `:is(h1 .x) p`               | identical to `eXC('h1 .x p')`                                      |
| eXC    | `:is(.title > h1)+p`         | no tag, then `h1` by `>`, then `p` by `+`                          |
| eXC    | `h1:is(p) + p`               | no entry                                                           |

**Item 2 — the `of` keyword.** Each input the brief names now throws naming `of clause`, where each
read as an ordinary selector before.

| Input                            | Before  | After                       |
| -------------------------------- | ------- | --------------------------- |
| `li:nth-child(2n \6f f .x) + p`  | `true`  | throws, names `of clause`   |
| `li:nth-child(2n o\66 .x) + p`   | `true`  | throws, names `of clause`   |
| `li:nth-child(2n \6f\66 .x)+p`   | `true`  | throws, names `of clause`   |
| `li:nth-child(2n of.x) + p`      | `true`  | throws, names `of clause`   |
| `li:nth-child(2n of[x])+p`       | `true`  | throws, names `of clause`   |
| `li:nth-child(2n of:is(.x))+p`   | `true`  | throws, names `of clause`   |
| `:is(li:nth-child(2n OF.x)) + p` | `true`  | throws, names `of clause`   |
| `:not(li:nth-child(2n of.x))`    | `false` | throws, names `of clause`   |

The message is `matchesLooseTagPair reads no of clause: <selector>`. The controls hold on both
sides: `li:nth-child(2n\ of .x)+p` is the one identifier `2n of` and reads `true` with no refusal,
`li:nth-child(2n) + p` and `li:nth-child(2n+1) + p` read `true`, and `li:nth-of-type(2n) + p` reads
`true` — its own name carries `of` and its argument does not. `sUF` reports the same finding
directly, and `eSI` is a case of its own: `2n of .x` lists `2n`, `of`, and `x`; `2n\ of .x` lists
`2n of` and `x`; `2n \6f f .x` lists `2n`, `of`, and `x`; `2n+1` lists `2n` and `1`; and
`[a="of"]` lists only `a`.

**Item 3 — the literal trim.**

| Reader | Input                     | Required          | Before   | After            |
| ------ | ------------------------- | ----------------- | -------- | ---------------- |
| sTL    | `h1\ ,p`                  | `['h1\ ', 'p']`   | `['h1\','p']` | `['h1\ ','p']` |
| eCT    | `:is(h1\ ,p)`             | `['h1 ', 'p']`    | `['h1','p']`  | `['h1 ','p']`  |
| mLTP   | `details summary\ `       | `true`            | `false`  | `true`           |
| mLTP   | `details summary\<TAB>`   | `true`            | `false`  | `true`           |
| mLTP   | `details :is(summary\ )`  | `true`            | `false`  | `true`           |
| mLTP   | `details :is(summary)`    | `false`           | `false`  | `false`          |
| tCW    | `h1\ `                    | unchanged text    | `h1\`    | `h1\ `           |
| tCW    | ` h1\<TAB> `              | `h1\<TAB>`        | `h1\`    | `h1\<TAB>`       |

`eCA(':is(h1\ ,p)')` moved with them, from `['h1\','p']` to `['h1\ ','p']`: the alternatives reader
splits through `splitTopLevelList`, so the escaped space reached it stripped. That reading is beyond
the brief's list and is recorded here rather than left for the next round to find. The earlier
readings of the same reader hold: `tCW('\f\t h1 \r\n')` is `h1` and `tCW('<U+00A0>h1<U+00A0>')` is
unchanged, because a no-break space is an identifier character and an escaped space is identifier
text.

**Every other reading.** The remaining 182 are identical before and after, including every
`matchesLooseTagPair`, `extractCompoundTags`, `extractSelectorCompounds`, `extractSelectorSubject`,
`extractCompoundAlternatives`, `scanUnreadForm`, `normalizeComplexSelector`,
`splitTopLevelCompounds`, `splitTopLevelList`, `findGroupEnd`, `walkSelector`, `readEscape`, and
`readIdentifier` row reports 4 to 8 record, and every attack the round-6 and round-7 analyst
executed: `:i\73(h1)+p` and `:W\48 ERE(:IS(h1),:where(p))+p` true, `\64 etails s\75 mmary` and
`DETAILS SUMMARY` false, `det\61<U+00A0>ils summary` true and `h1<U+00A0>p` false,
`h1[title="+ ~ > , :IS(p)"]` false, `:is([title="),>+~"],:where(h1))+p` true, `:not(:IS(h1))+p`
false, `h1\ ,p` false, `[title|="x"] + p` and `[title='a|b'] + p` false with no refusal,
`readIdentifier(walkSelector('[a="\64"]'), 4)` undefined, and the namespace, `:has()`, and comment
refusals with their messages.

The probe ran once more over the final tree after the two TSDoc passes: `tmp/u3/final-11.txt` is
identical to `tmp/u3/after-11.txt`, so no reading moved with the prose.

## The failing-first proofs

Each command is `npm run test:setup`, run in the tree the item was about to change.

| Item | Red                          | Failing case                                                                                  | Green            |
| ---- | ---------------------------- | --------------------------------------------------------------------------------------------- | ---------------- |
| 1    | `2 failed \| 81 passed (83)` | `reads an alternative as the selector it stands for, so a list and the selector it expands to agree`; `reads a compound whose own tag and whose alternative disagree as the nothing it selects` | `86 passed (86)` |
| 2    | `2 failed \| 86 passed (88)` | `reads the of keyword as the identifier it is, however it is written and whatever bounds it`; `lists each identifier a text writes, decoded, and none a quotation opens` | `88 passed (88)` |
| 3    | `1 failed \| 88 passed (89)` | `keeps the whitespace an escape owns, and trims only the whitespace the walk reads as syntax`  | `89 passed (89)` |

Item 1's first red named `expected false to be true` on `matchesLooseTagPair(':is(h1 .x) p')` and
`expected true to be false` on `matchesLooseTagPair('h1:is(p) + p')`. Between item 1's fix and its
green the export inventory reddened once, at `1 failed | 82 passed (83)`, and the fix was to list
the added exports beside the others; item 2's inventory entry reddened the same way. Item 4 is
prose, so it carries no case; the sentences are quoted in full in the next section.

## The expansion rule as the TSDoc states it

`expandComplexSelector` states it in its `@returns`:

> One entry per selector this one stands for, each listing every compound that selector writes in
> order, a compound naming no tag included, with the combinator reaching each and `undefined` on
> the first. A selector writing no alternative stands for itself, so it returns one entry.
> `X:is(A, B) Y` stands for `X·A Y` and `X·B Y`, where `·` merges the alternative's rightmost
> compound into `X` and the alternative's earlier compounds and combinators come before it, so
> `:is(h1 .x) p` stands for `h1 .x p` and reads the same pair. A selector matching nothing returns
> no entry.

`mergeCompoundTags` states what `·` does to the tags:

> The tags the merged compound names, or `undefined` where the merge selects no element at all. An
> element matches the merged compound when it matches each side, so a side naming no tag constrains
> nothing and the other side's tags stand, and two sides naming tags leave the tags they share.
> `h1:is(p)` is the case that shares none: no element is both an `h1` and a `p`, so the compound
> selects nothing and the selector around it reads as no pair.

`matchesLooseTagPair` states what it judges:

> An `:is()` or `:where()` alternative is judged as the selector it stands for, which
> `expandComplexSelector` writes out. A pair written inside an alternative is a pair, so
> `:is(h1 p)` is loose on its own; an alternative's earlier compounds reach the compounds around it,
> so `:is(h1 .x) p` is the selector `h1 .x p` and reads the same loose pair; and an alternative's
> subject is the element the enclosing compound selects, so `:is(details p) summary` is loose
> through `p` and `summary` while `:is(details) summary` is the mandated pair. A selector that
> selects nothing joins nothing, so `h1:is(p) + p` is no pair.

`dropTaglessCompounds` states the drop the brief requires inside an expansion as outside:

> A compound naming no tag is dropped, so the compounds on either side of it read as joined by the
> combinator that reaches the later one: `h1 .x p` reads as `h1` joined to `p` by the descendant
> combinator, and `.card h1 ~ p` opens at `h1`.

The walker's grammar paragraph now closes its `:is()` clause on the same rule: an `:is()` or
`:where()` argument lists complex selectors, and a compound writing one stands for the selectors
`expandComplexSelector` writes out — one per alternative, each with that alternative merged into the
compound — rather than for itself.

## Item 4 — the two sentences and the clause

`walkSelector`'s TSDoc reads:

> This is the grammar every selector reader in this module reads through — `findGroupEnd`,
> `trimCSSWhitespace`, `splitTopLevelList`, `splitTopLevelCompounds`, `normalizeComplexSelector`,
> `readIdentifier`, `extractSelectorIdentifiers`, `extractCompoundAlternatives`,
> `extractCompoundTags`, and `scanUnreadForm` — so every reader answers that form the same way. A
> reader obtains an identifier from `readIdentifier`, which reads these same steps, and every other
> reader reads the steps themselves. The one selector test outside the walk is
> `BOOTSTRAP_SCOPE_PATTERNS` in `extractBootstrapVariables`, which matches a scope selector such as
> `:root` as a whole and reads no compound, combinator, or group of it. That path compares the
> selector `normalizeSelectorText` in `tests/setup.ts` collapses, which drops every quotation mark
> and collapses JavaScript's own whitespace, so the rules this grammar fixes for a quoted character
> and for a no-break space govern every reader here and none of that match.

The double negative and the faculty the round-7 lanes named are gone, and the exception sentence now
names the reader that feeds the match and what it does to the text before the match sees it.

## The shipped cascade

`dist/src/styles/index.css` writes two `elements`-layer rules, `html` and `body`. Neither is a pair,
so `tests/src/styles/index.test.ts`'s assertion reads the same empty list, and that file is
byte-identical to its report-8 state (`git diff --no-index` against `tmp/u3/indexTest-before-11.ts`
reports nothing). Read through the fence, no rule anywhere in the built cascade is refused:
`tmp/u3/probe-cascade-11.test.ts.txt` reports `elements-layer selectors: ["html","body"]`,
`loose pairs: []`, and `whole cascade refusals: []`.

## Gates

Managed Chromium, Windows, 2026-09-20, from `tmp/u3/gates-11c.log.txt`, run over the final tree.
`lint:check` and `check` print nothing on success. The `npm test` row is the whole chained suite;
the project rows beneath it are the same projects run one at a time, because the chained run's tail
truncates every project but the last:

```text
cascade digest before build  8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1
npm run format:check         All matched files use the correct format.                  exit=0
npm run lint:check           no diagnostics                                             exit=0
npm run check                no diagnostics                                             exit=0
npm run build                built in 311ms                                             exit=0
cascade digest after build   8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1
npm run test:setup           Test Files  3 passed (3)    Tests  89 passed (89)          exit=0
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

Edge `msedge`, same host and date, from `tmp/u3/edge-11b.log.txt`, over the same final tree:

```text
PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles     Test Files  7 passed (7)  Tests  40 passed (40)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:src            Test Files  5 passed (5)  Tests  17 passed (17)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser  Test Files  1 passed (1)  Tests  18 passed (18)  exit=0
```

`npm run test:distribution` needs the registry and stays the Orchestrator's. `npm run format` and
`oxlint --fix` were not run; `oxfmt --write` ran over `tests/setupStyles.ts` alone, by path, three
times, and no file outside the two owned ones was touched. The chains are `tmp/u3/gates-11c.sh` and
`tmp/u3/edge-11b.sh`; each names its own log and what it supersedes in its header, and the runs it
supersedes (`gates-11.sh`, `gates-11b.sh`, `edge-11.sh`) are kept with their logs, each of them
green over the tree it ran against.

## The writing sweep over what this brief added

`tmp/u3/sweep11.mjs` collected the 416 lines this brief added to the two owned files into
`tmp/u3/added-11.txt` and swept them case-insensitively for every unconditional row of the
substitution table, for the judged rows `now`, `new`, `latest`, `once`, `since`, `above`, `below`,
`master`, `currently`, and `soon`, and for the tally terms `both`, `two`, `three`, `four`, `five`,
`six`, `seven`, `several`, and `multiple`. The unconditional rows return no hit. The judged rows
return `once` three times; one was the temporal sense the table bans and reads `after` now, and the
remaining hits are permitted: `X` and `A` select an element `at once`, and a compound `expands once
per alternative rather than once per combination`. The tally sweep returns `both` in `no element is
both an h1 and a p`, whose sentence names its members, and `two` in `two sides naming tags` and
`joining two`, the fixed arity of a merge and of a combinator, the sense report 5 ruled permitted.

A second sweep of the same lines found what the substitution table bans beyond that list:
`{@link expandComplexSelector}'s answer` and `{@link extractBareTag}'s tag` possessivize a code
token, `This is what {@link matchesLooseTagPair} judges` leaves a demonstrative with no noun, `and
writes no keyword at all` carries a filler phrase, and one sentence carried two `it`s with different
referents. `tmp/u3/prose11b.mjs` closed each. Both prose scripts are kept.

## Deviations

None. No gate went red after a fix inside owned files, no off-limits file was touched, no
shipped-cascade selector changed its pair reading, and no earlier reading is one the expansion rule
cannot keep.

## Ancillary choices settled under the deviation contract

- **The expansion reader is a pair, `expandCompoundSelector` and `expandComplexSelector`, returning
  compound sequences rather than selector text.** A merged compound has no text form — writing
  `p` into `p` yields the identifier `pp` — so the expansion is built out of `SelectorCompound`
  entries and the merge happens on the tags. The pair exists because a compound and a complex
  selector are different questions: one asks what an alternative leaves on the compound that writes
  it, the other asks what the whole selector stands for, and they recurse through each other.
- **The expansion keeps a compound naming no tag, and `dropTaglessCompounds` takes them out after.**
  The subject of `:is(h1 .x)` names no tag and is still the compound the merge reads, so dropping
  inside the expansion would merge `h1` into the host and read `h1:is(p .x) + q` as the pair it is
  not. The drop is one exported leaf, and `extractSelectorCompounds` and `matchesLooseTagPair` both
  take it, so one rule answers the middle drop wherever it is asked.
- **A compound writing more than one alternative list expands once per alternative rather than once
  per combination.** The combination's prefix is not expressible as one flat selector — an element
  cannot have two different ancestor chains in one written selector — so each list's context is read
  on its own, which reports a pair the combination would not. The subject's tag still meets every
  list's, because `extractCompoundTags` merges them all, so `h1:is(p):is(h1) + p` is judged on its
  tags rather than on one list at a time. `expandCompoundSelector`'s TSDoc states the limit rather
  than leaving it to be found.
- **`extractCompoundTags` keeps its name and its domain, and `extractSelectorSubject` keeps its
  body.** The merge is the only change to the tag reader, and the subject reader already answered
  what an alternative brings to its host, including the trailing-combinator case `h1 >` that the
  expansion alone cannot answer. Their TSDoc now names the expansion each feeds.
- **`extractSelectorCompounds` keeps its shape and its cases, and its production consumer moved to
  the expansion.** It answers what a selector writes, which is a different question from what a
  selector stands for, and the brief requires its middle-drop reading. `AGENTS.md` § Design laws
  fixes visibility on the capability rather than on the consumer count, so it stays exported with
  its TSDoc naming which reader answers which question.
- **`mergeCompoundTags` returns `undefined` for a compound that selects nothing.** A compound naming
  no tag and a compound selecting no element are different facts and the pair reader needs both: the
  first is dropped and joins its neighbours, the second kills the expansion. `undefined` is the
  absence `AGENTS.md` mandates, and `extractCompoundTags` reads it as no tag while
  `expandCompoundSelector` reads it as no expansion.
- **The `of` keyword reads through a new `extractSelectorIdentifiers` rather than inside
  `scanUnreadForm`.** Listing a text's identifiers is a question of its own with its own cases, and
  the scanner becomes one line that asks whether any of them case-folds to `of`. The reader is
  bounded exactly as the brief states: anything that is not an identifier character ends an
  identifier, so `of.x`, `of[x]`, and `of:is(.x)` each write the keyword and `2n\ of` writes one
  identifier that is not it.
- **`trimCSSWhitespace` itself became walk-aware, rather than `splitTopLevelList` growing a private
  trim.** The list splitter was the trim's only consumer, so a second trim would have left the
  exported one wrong for every later caller. The predicate `matchesCSSWhitespace` still answers for
  one character, and the trim answers for text where the walk says which of those characters is
  syntax.

## Observations, outside this brief's items

- **A compound selecting nothing is now dropped rather than read.** `h1:is(p)` reads as no tag and
  `h1:is(p) + p + span` as no pair, where the compound's neighbours would otherwise pair across it.
  The brief names the first and not the second; the second is a case, and it is what separates
  dropping a dead compound from dropping the selector it kills.
- **`extractCompoundAlternatives` and `extractCompoundTags` each moved on one input the brief does
  not name**, `:is(h1\ ,p)` and `h1:is(p)`. Both follow from items 3 and 1 and both are cases.
  Recorded so the next audit rules them rather than discovering them.
- **The CRLF reading the round-6 analyst recorded is unchanged.** A hexadecimal escape terminated by
  `\r\n` consumes the carriage return and leaves the line feed, because CSS input preprocessing
  settles the pair before a reader sees it and Sass rewrites it before the cascade does.
- **`readIdentifier` still rebuilds the whole text from the steps**, the round-6 bound the round-7
  reviewer carried forward as finding 14. Brief 11 carries no item for it and this report changes
  nothing there.
- **`transition` and `forced-colors` still have no include under `src/styles/**`.** Reports 5 to 8
  record this and nothing in brief 11 changes it.

The instruments this brief added are `tmp/u3/prose11.mjs` and `tmp/u3/prose11b.mjs` (the TSDoc
rewrites), `tmp/u3/sweep11.mjs` (the writing sweep), `tmp/u3/gates-11.sh`, `tmp/u3/gates-11b.sh`,
`tmp/u3/gates-11c.sh`, `tmp/u3/edge-11.sh`, and `tmp/u3/edge-11b.sh` (the gate chains), and the two
retired probes `tmp/u3/probe-selector-11.test.ts.txt` and `tmp/u3/probe-cascade-11.test.ts.txt`. The
report-8 states of the files this brief edits are `tmp/u3/setupStyles-before-11.ts`,
`tmp/u3/setupStylesTest-before-11.ts`, and `tmp/u3/indexTest-before-11.ts`, and the readings are
`tmp/u3/before-11.txt`, `tmp/u3/after-11.txt`, and `tmp/u3/final-11.txt`.
