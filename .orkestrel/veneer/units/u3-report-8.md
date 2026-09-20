# Unit U3 — report 8 (successor brief 10)

Every item of `u3-brief-10.md` is done. Every gate the brief names exits 0 on managed
Chromium, and `test:src:styles`, `test:src`, and `test:setup:browser` exit 0 on Edge. The built
cascade's SHA-256 is `8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1` before the
build, after it, and after the suite — the digest the brief names. Items 2, 3, 4, and 6 each ran red
before their fix and green after; item 1 is a promotion of readings the round-6 lanes executed, so
it went green at once. The elements-layer pair assertion over the shipped cascade reads the same
list. No deviation.

## Touched files

| File                        | Change over the report-7 baseline                                                                                                                                                                                                                            | Lines       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `tests/setupStyles.ts`      | gained `matchesCSSWhitespace`, `trimCSSWhitespace`, `extractCompoundAlternatives`, `extractSelectorSubject`, and `scanUnreadForm`; `SelectorStep` gained `quoted`; `readIdentifier` refuses a quoted start; the escape terminator, the normalizer, the compound splitter, and the list trim read CSS whitespace; an alternative is read as a complex selector; `matchesLooseTagPair` throws on a refused form; the walker's TSDoc states the whole grammar and the scope-pattern carve-out | 1242 → 1387 |
| `tests/setupStyles.test.ts` | cases for the whitespace predicate and the trim, the no-break space, the quoted identifier boundary, the walker's `quoted` flag, the surrogate and past-range escapes, the alternatives and their subjects, the complex-alternative pairs, `scanUnreadForm`, and each refused form; the added exports in the import and export lists | 641 → 745   |

`tests/src/styles/index.test.ts` is byte-identical to its report-7 state: item 4 changed nothing the
pair rule reads there. `git diff --no-index` against `tmp/u3/indexTest-before-10.ts` reports nothing.

`git status --porcelain` at return lists report 7's set exactly, with no file added or removed. The
report and the instruments sit under the ignored `tmp/`. Diff against the report-7 snapshots:

```text
 tests/setupStyles.ts      | 287 ++++++++++++++++-----  216 insertions(+), 71 deletions(-)
 tests/setupStyles.test.ts | 104 +++++++++++++++++++++  104 insertions(+)
```

## Every reading, before and after

Taken by running the live functions through `tmp/probe/selector10.test.ts` in the `probe` project,
once against the readers as report 7 left them and once against the final tree. The probe covers
134 readings: this brief's, and every reading reports 4 to 7 and the round-6 analyst record. 20
moved and 114 are identical. The probe is retired to `tmp/u3/probe-selector-10.test.ts.txt`, outside
that project's include glob, because its inputs are promoted into `tests/setupStyles.test.ts`. In
the tables `\` is one backslash, `<A0>` is U+00A0, and `mLTP`, `eCT`, `nCS`, `sTC`, `sTL`, `rE`, and
`rI` name `matchesLooseTagPair`, `extractCompoundTags`, `normalizeComplexSelector`,
`splitTopLevelCompounds`, `splitTopLevelList`, `readEscape`, and `readIdentifier`.

**Item 1 — the unpromoted readings.** Each held before and after; the round-6 lanes executed them
and the defect was that none was a case. Each is now one.

| Reader | Input           | Required               | Before                 | After                  |
| ------ | --------------- | ---------------------- | ---------------------- | ---------------------- |
| mLTP   | `h1\64 p`       | `false`                | `false`                | `false`                |
| mLTP   | `h1\64x p`      | `true`                 | `true`                 | `true`                 |
| eCT    | `h1\+p`         | `['h1+p']`             | `['h1+p']`             | `['h1+p']`             |
| rE     | `\D800` at 0    | U+FFFD, span 5         | U+FFFD, span 5         | U+FFFD, span 5         |
| rE     | `\110000` at 0  | U+FFFD, span 7         | U+FFFD, span 7         | U+FFFD, span 7         |
| rE     | `\10FFFF` at 0  | U+10FFFF, span 7       | U+10FFFF, span 7       | U+10FFFF, span 7       |

**Item 2 — the quoted-text boundary.**

| Reader | Input              | Required    | Before               | After       |
| ------ | ------------------ | ----------- | -------------------- | ----------- |
| rI     | `[a="\64"]` at 4   | `undefined` | `{ text: 'd', end: 7 }` | `undefined` |
| rI     | `[a="d"]` at 4     | `undefined` | `undefined`          | `undefined` |
| rI     | `a"b"` at 0        | `{ text: 'a', end: 1 }` | `{ text: 'a', end: 1 }` | `{ text: 'a', end: 1 }` |

The control `a"b"` is the step that turns quoted mid-identifier: the identifier ends before the
quotation mark rather than running through it. The walker's `quoted` flag is what refuses the start,
and it is a case of its own: `[a="("]` reads `false, false, false, true, true, true, false` and
`h1\"p` reads `false` throughout, because an escaped quotation mark opens no string.

**Item 3 — CSS whitespace.**

| Reader | Input                  | Required            | Before          | After               |
| ------ | ---------------------- | ------------------- | --------------- | ------------------- |
| mLTP   | `det\61<A0>ils summary` | `true`              | `false`         | `true`              |
| mLTP   | `h1<A0>p`              | `false`             | `true`          | `false`             |
| mLTP   | `h1 p`                 | `true`              | `true`          | `true`              |
| nCS    | `h1<A0>p`              | `h1<A0>p`           | `h1 p`          | `h1<A0>p`           |
| sTC    | `h1<A0>p`              | `['h1<A0>p']`       | `['h1','p']`    | `['h1<A0>p']`       |
| eCT    | `det\61<A0>ils`        | `['deta<A0>ils']`   | `['details']`   | `['deta<A0>ils']`   |
| rE     | `det\61<A0>ils` at 3   | `a`, span 3         | `a`, span 4     | `a`, span 3         |
| rI     | `det\61<A0>ils` at 0   | `deta<A0>ils`, end 10 | `details`, end 10 | `deta<A0>ils`, end 10 |
| sTL    | `h1<A0>, p`            | `['h1<A0>','p']`    | `['h1','p']`    | `['h1<A0>','p']`    |

`matchesCSSWhitespace` names a space, a tab, a line feed, a carriage return, and a form feed, and
refuses U+00A0 and U+2028. `trimCSSWhitespace` takes `\f\t h1 \r\n` to `h1` and leaves
`<A0>h1<A0>` whole. The `sTL` row is beyond the brief's list: `splitTopLevelList` trimmed each item
with JavaScript's own `trim`, which strips a no-break space the identifier owns, so the one
predicate reaches that site too.

**Item 4 — complex alternatives.**

| Reader | Input                    | Required  | Before    | After     |
| ------ | ------------------------ | --------- | --------- | --------- |
| mLTP   | `:is(h1 p)`              | `true`    | `false`   | `true`    |
| mLTP   | `:is(.title > h1)+p`     | `true`    | `false`   | `true`    |
| mLTP   | `:where(.title > h1)+p`  | `true`    | `false`   | `true`    |
| mLTP   | `:is(details p) summary` | `true`    | `false`   | `true`    |
| mLTP   | `:is(details) summary`   | `false`   | `false`   | `false`   |
| mLTP   | `:is(h1,p)`              | `false`   | `false`   | `false`   |
| eCT    | `:is(details p)`         | `['p']`   | `['details']` | `['p']` |
| eCT    | `:is(.title > h1)`       | `['h1']`  | `[]`      | `['h1']`  |

`extractCompoundAlternatives(':is(h1, p):where(.title > h1)')` lists `h1`, `p`, and `.title > h1`,
and lists nothing for `:not(h1)` or `[title=':is(h1)']`. `extractSelectorSubject` reads `.title > h1`
as `['h1']`, `details p` as `['p']`, `h1` as `['h1']`, `h1 .x` as `[]`, and `h1 >` as `[]`.

**Item 6 — the refused forms.** Each throws, and the error names the form.

| Input                        | Before  | After                                                                            |
| ---------------------------- | ------- | -------------------------------------------------------------------------------- |
| `svg\|a + p`                 | `true`  | `matchesLooseTagPair reads no namespace separator: svg\|a + p`                   |
| `h1:has(p) + p`              | `true`  | `matchesLooseTagPair reads no :has() argument: h1:has(p) + p`                    |
| `li:nth-child(2n of .x) + p` | `true`  | `matchesLooseTagPair reads no of clause: li:nth-child(2n of .x) + p`            |
| `h1 /* c */ + p`             | `true`  | `matchesLooseTagPair reads no comment: h1 /* c */ + p`                          |

The controls hold on both sides: `[title|="x"] + p` reads `false`, because `|=` is the attribute
dash-match operator rather than a namespace separator; `[title='a|b'] + p` reads `false`, because a
quoted `|` is text; `li:nth-child(2n) + p` and `h1:not(p) + p` read `true`. `scanUnreadForm` is a
case of its own, and it names a form at any depth and in any case: `:is(h1:has(p)) + p` names
`:has() argument`, `h1:HAS(p) + p` the same, `li:nth-last-child(2n OF .x)` names `of clause`, and
`h1\|a + p`, `li:nth-child(2n+1) + p`, and `:is(.title > h1) + p` name none.

**Every other reading.** The remaining 114 are identical before and after, including every
`matchesLooseTagPair`, `normalizeComplexSelector`, `splitTopLevelCompounds`, `splitTopLevelList`,
`findGroupEnd`, `walkSelector`, `readEscape`, `readIdentifier`, and `extractCompoundTags` row
reports 4 to 7 record, and every attack the round-6 analyst executed and confirmed: `:i\73(h1)+p`
and `:W\48 ERE(:IS(h1),:where(p))+p` true, `\64 etails s\75 mmary` and `DETAILS SUMMARY` false,
`details_card summary` and `details\-card summary` true, `h1[title="+ ~ > , :IS(p)"]` false,
`:is([title="),>+~"],:where(h1))+p` true, `:not(:IS(h1))+p` false, `h1\ ,p` false,
`extractCompoundTags('\000064etails')` `['details']`, and `extractCompoundTags('h1\ ')` `['h1 ']`.

## The failing-first proofs

Each command is `npm run test:setup`, run in the tree the item was about to change.

| Item | Red                          | Failing case                                                                             | Green |
| ---- | ---------------------------- | ---------------------------------------------------------------------------------------- | ----- |
| 2    | `1 failed \| 74 passed (75)` | `begins no identifier inside a quoted string, and ends one the quotation opens`          | `75 passed (75)` |
| 3    | `1 failed \| 75 passed (76)` | `reads a no-break space as an identifier character rather than as a separator`           | `77 passed (77)` |
| 4    | `1 failed \| 77 passed (78)` | `reads a functional alternative as the complex selector it is, pairing through its subject` | `79 passed (79)` |
| 6    | `1 failed \| 79 passed (80)` | `refuses a selector carrying a construct the grammar does not read, naming the form`     | `81 passed (81)` |

Item 1's cases were added and passed at once, which is what a promotion of an executed reading must
do; the defect round 6 found was their absence, not their answer. The exports case reddened twice in
between, once for the item-3 predicates and once for `scanUnreadForm`, and each time the fix was to
list the export beside the others.

## The grammar sentence

`walkSelector`'s TSDoc now states the grammar as a closed list and carries the carve-out item 5
names:

> The grammar is strings, escapes, groups, identifiers, combinators, comma lists, and the
> alternatives an `:is()` or `:where()` argument lists, and nothing else.

and, of the readers:

> A reader wanting an identifier takes it from `readIdentifier`, which reads these same steps, and
> every other reader reads the steps themselves. The one selector test outside the walk is
> `BOOTSTRAP_SCOPE_PATTERNS` in `extractBootstrapVariables`, which matches a scope selector such as
> `:root` as a whole and reads no compound, combinator, or group of it.

The paragraph goes on to fix each construct: a string and its marks, an escape as `readEscape`
measures it, a group and its depth, an identifier over letters, digits, `-`, `_`, the characters
past U+007F, and escapes, a `>`, `+`, or `~` outside a group as a combinator, a run of the
whitespace `matchesCSSWhitespace` names as the descendant combinator, a comma outside a group as
the separator of complex selectors, an `:is()` or `:where()` argument as a list of complex
selectors, and every other pseudo-class and pseudo-element as part of the compound it is written in,
naming no tag. It closes on the fence: a construct the grammar does not carry is refused rather than
answered, `scanUnreadForm` names each one, and `matchesLooseTagPair` throws.

## The shipped cascade

`dist/src/styles/index.css` writes two `elements`-layer rules, `html` and `body`. Neither is a pair
and neither carries a refused form, so `tests/src/styles/index.test.ts`'s assertion reads the same
empty list before and after, and `tmp/u3/cascade10.mjs` reports the same two selectors on both
sides. The misreads this brief closes are shut before a component partial writes a namespaced
selector, an `:is()` alternative with a combinator in it, or an identifier carrying a no-break
space, not after.

## Gates

Managed Chromium, Windows, 2026-09-20, from `tmp/u3/gates-10.log.txt` and `tmp/u3/rest-10.log.txt`,
both run over the final tree. `lint:check` and `check` print nothing on success. The `npm test` row
is the whole chained suite; the project rows beneath it are the same projects run one at a time,
because the chained run's tail truncates every project but the last:

```text
cascade digest before build  8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1
npm run format:check         All matched files use the correct format.                  exit=0
npm run lint:check           no diagnostics                                             exit=0
npm run check                no diagnostics                                             exit=0
npm run build                built in 335ms                                             exit=0
cascade digest after build   8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1
npm run test:setup           Test Files  3 passed (3)    Tests  81 passed (81)          exit=0
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

Edge `msedge`, same host and date, from `tmp/u3/edge-10.log.txt`, over the same final tree:

```text
PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles     Test Files  7 passed (7)  Tests  40 passed (40)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:src            Test Files  5 passed (5)  Tests  17 passed (17)  exit=0
PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser  Test Files  1 passed (1)  Tests  18 passed (18)  exit=0
```

`npm run test:distribution` needs the registry and stays the Orchestrator's. `npm run format` and
`oxlint --fix` were not run, and no file outside the two owned ones was touched. The chains are
`tmp/u3/gates-10.sh`, `tmp/u3/rest-10.sh`, and `tmp/u3/edge-10.sh`, each superseding its `-9`
predecessor; `rest-10.sh` is new, for the projects the chained `npm test` truncates.

## The writing sweep over what this brief added

Every line this brief added to `tests/setupStyles.ts` and `tests/setupStyles.test.ts` was collected
into `tmp/u3/added-10.txt` by `tmp/u3/prose10.mjs` and swept case-insensitively for every
unconditional row of the substitution table, for the judged rows `now`, `new`, `latest`, `once`,
`since`, `currently`, `soon`, and `master`, and for the tally terms `both`, `two`, `three`, `four`,
`five`, `six`, `seven`, `several`, and `multiple`. The unconditional rows return no hit. The judged
rows return one hit, `new` in `throw new Error(...)`, which is the operator and so a code
identifier. The tally sweep returns these, each in a permitted sense:

- `as two compounds` and `joining two compounds` — the fixed arity a combinator joins and the
  fixed result of the misreading, the sense report 5 ruled permitted.
- `one to six hexadecimal digits` — the CSS escape grammar's own limit, a value the reader needs.
- `Both identifiers this reads — the compound's own, and the functional pseudo-class name` — the
  sentence names its members.

## Deviations

None. No gate went red after a fix inside owned files, no off-limits file was touched, and no
shipped-cascade selector changed its pair reading.

## Ancillary choices settled under the deviation contract

- **`SelectorStep` gained a `quoted` member**, rather than `readIdentifier` inferring quotation from
  `literal`. It cannot: a backslash inside an attribute string and a backslash outside one are both
  literal, and the walk is the only reader that knows which is which. `quoted` and `literal` are a
  basis rather than a duplicate — neither follows from the other alone — and the flag the walk
  computes is the primitive, with `literal` its union with escape membership, which the member's
  own TSDoc states.
- **The predicates are `matchesCSSWhitespace` and `trimCSSWhitespace`.** `matches*` is the
  predicate prefix, the acronym keeps its case as `parseCSSColor` in `tests/setupBrowser.ts` does,
  and the trim is a second export rather than an inline loop because `splitTopLevelList` needs the
  whole operation and a reader elsewhere will need it next.
- **`splitTopLevelList`'s trim reads CSS whitespace too**, beyond the sites the brief lists. The
  brief's criterion is that no selector reader uses `\s`, and `trim` is the same defect wearing
  another name: it strips a no-break space the identifier owns, so `:is(h1,<A0>p)` read `p` as a
  tag where CSS reads an identifier opening with U+00A0 and no tag. `splitTopLevelValues` and
  `normalizeValueToken` still use `\s`; both read a declaration value rather than a selector, and
  report 6 records why the value reader stays separate.
- **`extractCompoundAlternatives` and `extractSelectorSubject` are readers of their own.** The
  alternative list is what `extractCompoundTags` and `matchesLooseTagPair` both need — one for the
  subject's tags, the other for the pair inside — and one function answering it is what keeps them
  from disagreeing about which group is an alternative list. The subject reader takes the last
  compound `splitTopLevelCompounds` returns rather than the last tag-naming compound
  `extractSelectorCompounds` returns, because a subject naming no tag must contribute none:
  `:is(h1 .x)` names nothing.
- **`matchesLooseTagPair` recurses through itself** for a pair inside an alternative, rather than
  through a second exported predicate over one complex selector. An alternative is a selector list
  of one, so the entry point already answers it, and recursing through the entry point applies the
  fence to the alternative as well.
- **`scanUnreadForm` returns the form's name as text**, in the shape `scanPhysicalDeclaration`
  already uses in this module: the finding, or `undefined`. `matchesLooseTagPair` composes the
  message, so the scanner stays usable by a caller that wants to ask rather than to fail.
- **The refused `of` clause is read through the module's own readers.** The argument of a
  pseudo-class whose name opens with `nth-` is normalized and split into compounds, and an `of`
  compound in any case refuses it, so `:nth-child(2n+1)` passes and `:nth-child(2n of .x)` does not.

## Observations, outside this brief's items

- **`extractCompoundTags(':is(h1 .x)')` moved from `['h1']` to `[]`**, and `:is(h1 .x) p` reads
  `false` where the ancestor `h1` and the descendant `p` are joined through the alternative's
  interior. The subject rule item 4 mandates is what produces it, and the brief's list does not
  name this input either way. Recorded so the next audit rules it rather than discovering it.
- **The CRLF reading the round-6 analyst recorded is unchanged.** A hexadecimal escape terminated
  by `\r\n` consumes the carriage return and leaves the line feed, because CSS input preprocessing
  settles the pair before a reader sees it and Sass rewrites it before the cascade does. The
  verdict bound it as an observation and this brief carries no item for it.
- **`transition` and `forced-colors` still have no include under `src/styles/**`.** Reports 5, 6,
  and 7 record this and nothing in brief 10 changes it.
- **The instrument record is honest about one detour.** `tmp/u3/reflow10.mjs`, `reflow10b.mjs`, and
  `reflow10c.mjs` rewrapped the TSDoc paragraphs this brief's edits left ragged, and the second and
  third mangled two of them — one split a `{@link}` tag across lines, one duplicated a line.
  `tmp/u3/reflow10d.mjs` and `tmp/u3/dedupe10.mjs` wrote those paragraphs by hand, and
  `format:check`, `lint:check`, `check`, and the whole suite ran green over the result. The earlier
  instruments are kept rather than deleted, so the record shows what ran.

The instruments this brief added are `tmp/u3/nbsp10.mjs` and `tmp/u3/escape10.mjs` (the no-break
space and the characters past U+007F written as escapes), `tmp/u3/nbsp-doc.mjs` (the same in one
TSDoc line), `tmp/u3/wire10.mjs` (the whitespace predicate into the readers),
`tmp/u3/alternatives10.mjs` (the alternative readers), `tmp/u3/fence10.mjs` (the scanner),
`tmp/u3/grammar10.mjs` (the walker's grammar), the reflow chain named earlier,
`tmp/u3/prose10.mjs` (the writing sweep), and `tmp/u3/cascade10.mjs` (the elements-layer
selectors). The report-7 states of the files this brief edits are `tmp/u3/setupStyles-before-10.ts`,
`tmp/u3/setupStylesTest-before-10.ts`, and `tmp/u3/indexTest-before-10.ts`, and the readings are
`tmp/u3/before-10.txt` and `tmp/u3/after-10.txt`.
