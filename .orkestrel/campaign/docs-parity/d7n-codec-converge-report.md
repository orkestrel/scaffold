# Report — P.2 `d7n-codec-converge`

Every acceptance criterion reads green. No deviation. No reader or seed defect met: after the header rename the readers located every compared cell, `replaceCell` wrote each one with nothing reported, `replaceExample` carried the fence body in, and the pitch comparator read both blockquotes.

Wall clock: 2026-09-07T15:02:29Z to 2026-09-07T15:14:35Z (12m 6s).

## 1. Red-first, on the unconverged tree

`npm run test:guides` after the three cases landed and before any convergence — `Tests 2 failed | 26 passed (28)`, EXIT 1.

`Codec > keeps every compared summary and example equal to its source`, first lines verbatim:

```text
AssertionError: expected [ …(25) ] to deeply equal []
+   "guides/codec.md function encodeBase64: guide absent source \"Encodes a byte sequence as standard padded Base64.\"",
+   "guides/codec.md function decodeBase64: guide absent source \"Decodes canonical standard Base64 text into its bytes.\"",
+   "guides/codec.md function isBase64: guide absent source \"Checks whether a value is canonical standard Base64 text.\"",
```

`pairs at least one example title across the guide and the source`, the both-sides line verbatim:

```text
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/codec.md pairs: guide [\"Encode and decode a byte sequence\",\"Reach the url face\",\"Meet the canonical refusals\",\"Ask a value whether a decoder would take it\",\"Drive both laws\",\"Read the hex face\",\"Encode and decode through a charset\",\"Measure without producing the bytes\"] source []",
```

`opens the README with the guide tagline` **passed** on the unconverged tree. The brief's § What is fixed states the reason (objective correction 1): codec's pitch and tagline were already byte-equal, so both `not.toBeUndefined()` guards and the `toBe` held. The `undefined` reading the criterion names cannot arise on a tree whose README carries a blockquote. I took the case's red at the moment its subject diverged instead — the guide tagline rewritten, the README pitch not yet:

```text
FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected 'The fleet\'s byte-to-text codings, as…' to be 'The fleet\'s byte-to-text codings: so…' // Object.is equality
Expected: "The fleet's byte-to-text codings: sound `encode` / `decode` / guard triples over `string` and `Uint8Array` for RFC 4648 Base64, base64url, and hex and for the UTF-8, ISO-8859-1, Windows-1252, and UTF-16LE charsets, beside a `measure*` that answers a coding's byte-side size question without producing those bytes."
Received: "The fleet's byte-to-text codings, as sound `encode` / `decode` / guard triples over `string` and `Uint8Array` — RFC 4648 Base64, base64url, and hex, beside the UTF-8, ISO-8859-1, Windows-1252, and UTF-16LE charsets — and a `measure*` that answers a coding's byte-side size question without producing those bytes. Zero runtime dependencies, no error type, no options, no class. Source: `src/core`. Published through `@orkestrel/codec`."
 ❯ tests/guides.test.ts:143:16
Tests  1 failed | 27 passed (28)
```

The case reddens on its own subject, and the guards report before the comparison. Recorded as an ancillary decision, not a deviation.

## 2. The headers, the class rows, the `Shape` idiom

`| Behavior ` → `| Summary ` at `guides/codec.md:66`, `:93`, and `:109`. Every table now heads `Name | Kind | Signature | Summary`, and `Kind` and `Signature` are the only other columns. `grep -c 'Shape' guides/codec.md` reads 0, so the `Shape` idiom sentence has no table to sit under.

Ruling 5 is inert here, on evidence: `grep -rn 'export class' src/` returns nothing, the guide carries no `### Entities` heading, and no H3 documents a class. The `### ` headings are `Codings`, `Measures`, `Charsets`, `The charset doors`, `The BOM stance`, `Where this package parts from WHATWG`, and the `## Patterns` fences' own headings. A factory's preference has no site either: `grep -rn 'export function create' src/` returns nothing.

## 3. The doc blocks, then the propagation

Every row's cell carried information its block lacked — each block held a bare one-liner and the cell held the coding's contract — so all twenty-five description paragraphs were rewritten by hand, verb-first, with the symbol unnamed in the first sentence. Reference material moved to `@remarks` under Ruling 7, and each remark sentence the description now repeats was pruned.

Blocks rewritten by hand in `src/core/helpers.ts`: `encodeBase64`, `decodeBase64`, `encodeBase64URL`, `decodeBase64URL`, `encodeHex`, `decodeHex`, `measureBase64`, `measureBase64URL`, `measureHex`, `measureUTF8`, `encodeUTF8`, `decodeUTF8`, `encodeLatin1`, `decodeLatin1`, `encodeWindows1252`, `decodeWindows1252`, `encodeUTF16LE`, `decodeUTF16LE`. In `src/core/validators.ts`: `isBase64`, `isBase64URL`, `isHex`, `isUTF8`, `isLatin1`, `isWindows1252`, `isUTF16LE`.

Where a rewrite changed the split, and why:

- `encodeBase64` lost its `@remarks` entirely: the alphabet, the canonical-form clause, and the totality clause are the summary, and nothing else stood there.
- `decodeBase64`, `decodeBase64URL`, and `decodeHex` keep a remark stating the accepted grammar at a finer grain than the cell — the group boundary, the padding position, the trailing-bit rule — with the worked `'aa=='` / `'aQ=='` and `'AB'` / `'ab'` pairs.
- Each measure's remark keeps its sound-triple equation and the reason it repeats the grammar walk instead of asking its decoder; the description carries what the walk answers and what it refuses.
- `measureUTF8` kept its second description paragraph as a remark. A description paragraph is the block's whole text before the first tag, so the `computeBytes` divergence would otherwise have collapsed into the compared summary.
- Each guard's remark states that asking its coding's partial function is what keeps guard and function from drifting apart; the description carries the accepted set, the named refusals, and totality. The three RFC 4648 guards read distinctly: `isBase64URL` names the §4 refusals and `isHex` names the uppercase, odd-length, and prefix refusals, so no two rows carry one sentence.

No row's literal stayed in `Shape`: no table carries that column. No code token moved, and no signature, parameter, or return tag changed.

Then, in order:

```text
$ npx oxfmt --write src/core/helpers.ts src/core/validators.ts            EXIT 0
$ npx oxlint --config .oxlintrc.json --deny-warnings src/core/helpers.ts src/core/validators.ts   EXIT 0
$ npm run docs                    exit 1: rows read: 1, disagreements found: 25  (every row now a text difference; the cells read)
$ npm run docs -- --to guide      exit 0: rows read: 1, disagreements found: 25, written: 25, reported: 0
$ npx oxfmt --write guides/codec.md                                       EXIT 0
$ npm run docs                    exit 0: rows read: 1, disagreements found: 0
```

Nothing was reported by the write, so no cell resisted the replacer.

## 4. The titled pair

The pair is `encodeBase64`'s `@example` block and the first `## Patterns` fence, under the heading `Encode and decode a byte sequence`. codec exports no factory and no class, so the brief's fallback applies: the block belongs to the exported function that fence demonstrates. The fence imports `decodeBase64` and `encodeBase64` and opens on `encodeBase64(new Uint8Array([104, 105]))`, so `encodeBase64` is the demonstrated declaration and takes the title. Recorded as the ancillary choice between the two functions the fence names.

Checks before titling:

```text
$ grep -n '^#\+ Encode and decode a byte sequence' guides/codec.md
274:### Encode and decode a byte sequence
```

One heading carries the text. The nearest other heading, `### Encode and decode through a charset`, is a different string. The fence body read in full — the import line, the four calls with their value comments — carries no three-backtick run and no doc-comment terminator, so the fence is eligible and no next fence was needed.

Then, in order:

```text
$ (title added: `@example Encode and decode a byte sequence` on encodeBase64)
$ npm run docs                    exit 1: rows read: 1, disagreements found: 1
  guides/codec.md Encode and decode a byte sequence: guide "ts\nimport { decodeBase64, encodeBase64 } from '@orkestrel/codec'\n\nencodeBase64(new Uint8Array([104, 105])) // 'aGk='\ndecodeBase64('aGk=') // Uint8Array [104, 105]\nencodeBase64(new Uint8Array([])) // ''\ndecodeBase64('') // Uint8Array []" source "ts\nencodeBase64(new Uint8Array([104, 105])) // 'aGk='"
$ npm run docs -- --to source     exit 0: rows read: 1, disagreements found: 1, written: 1, reported: 0
$ npx oxfmt --write src/core/helpers.ts                                   EXIT 0
$ npm run docs                    exit 0: rows read: 1, disagreements found: 0
```

`grep -rn '@example \S' src/` returns `src/core/helpers.ts:30` alone. Every other block stays untitled.

## 5. The tagline, the pitch, and the displaced sentences

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold:

```text
> The fleet's byte-to-text codings: sound `encode` / `decode` / guard triples over `string` and
> `Uint8Array` for RFC 4648 Base64, base64url, and hex and for the UTF-8, ISO-8859-1,
> Windows-1252, and UTF-16LE charsets, beside a `measure*` that answers a coding's byte-side size
> question without producing those bytes.
```

`diff <(sed -n '3,6p' guides/codec.md) <(sed -n '3,6p' README.md)` is empty: the pitch is the same text under the same line breaks.

The guide's opening prose gained the displaced sentences as one clause at the end of its closing sentence, naming none of the tagline's clauses:

```text
… map values into a store, or read JSON. Source: [`src/core`](../src/core), published through
`@orkestrel/codec` with no runtime dependency.
```

The tagline's other displaced clauses — no error type, no options, no class — already stood in that paragraph ("codec ships no error type, no options bag, no class, and no type of its own") and were not restated.

The README gained an onboarding paragraph it alone carries, which folds the same displaced sentences from its own side:

```text
Import the face you need from `@orkestrel/codec` and call it: every export is a plain function over
`string` and `Uint8Array`, with no options bag, no class, no error type, and no runtime dependency.
A decoder reports refusal as `undefined` and a guard reports it as `false`, so there is nothing to
catch and nothing to configure. Source: [`src/core`](src/core). Part of the `@orkestrel` line.
```

Each copied Surface table is gone, replaced by a sentence linking the guide's section. The gate never read those copies, and a copy drifts on the first cell rewrite:

- the merged codings-and-measures table became `The RFC 4648 faces and their guards are the guide's [Codings](guides/codec.md#codings) section, and the byte-side sizes beside them are its [Measures](guides/codec.md#measures) section.`
- the charsets table became a clause on the charset paragraph already there: `… only the direction each is written in inverts. Those faces are the guide's [Charsets](guides/codec.md#charsets) section.`

Three prose sentences in the owned files also broke `AGENTS.md` § Writing, and each was corrected in place:

- `README.md`: `The two laws are unchanged` → `The laws are unchanged`. The README states three laws under that sentence, so the count was already false where the reader met it.
- `README.md`: `The charsets part from the platform's own codings in three places, each named in the guide:` → `The charsets part from the platform's own codings where the guide names it:`.
- `guides/codec.md`: `- **wanted** — a real consumer in the fleet needs it now.` → `- **wanted** — a real consumer in the fleet needs it.` (the banned temporal `now`; the present tense carries the same membership condition).
- `guides/codec.md`: `so the refusals do not read alike across the four faces.` → `… across the charset faces.`

The substitution-table sweep over both files, case-insensitive and inflected (`grep -nEi '\b(should|simply|eas(y|ier|iest|ily)|just|currently|utiliz|leverag|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|sanity.check|dumm(y|ies)|blacklist|whitelist|slave|master)\b' README.md guides/codec.md`), returns nothing. The permitted-sense sweep (`now|new|latest|once|since`, same paths, excluding `new Uint8Array`) leaves one hit, `guides/codec.md:154` `rules out every lenient door at once`, ruled permitted: the idiom means simultaneously, not `after`.

## 6. § Tests

`guides/codec.md:480-484` now names the equality gate descriptively, with no SQ/MQ/EQ/RQ identifier:

```text
- [`tests/guides.test.ts`](../tests/guides.test.ts) — this guide against the real surface, in both
  directions, plus the transcribed fences and the equality gate: every `Summary` cell against its
  declaration's description paragraph, the titled `Encode and decode a byte sequence` fence against
  the `@example` block of that title (pinned so the titled pair cannot be retired silently), and the
  README pitch against this guide's tagline.
```

## 7. The gate cases

`tests/guides.test.ts` carries, in its own header and helpers:

- `findDrift` imported beside the existing readers.
- `const GUIDE_SPEC = 'guides/codec.md'`, used by the pin, the README case, and the `specification` binding.
- `README.md` added to `ROOT_FILES`.
- `keeps every compared summary and example equal to its source`, inside the manifest loop's `describe(entry.concept)` block, collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` with `absent` for an undefined side.
- `pairs at least one example title across the guide and the source`, at file scope, in the inline form `fence.title !== undefined && titled.has(fence.title)` with no local predicate, failing on `${GUIDE_SPEC} pairs: guide [...] source [...]`.
- `opens the README with the guide tagline`, with `expect(pitch).not.toBeUndefined()` and `expect(tagline).not.toBeUndefined()` before the `toBe`.

Each is named for what it proves.

## 8. The final readings

Every command run in `/home/user/fleet/codec` after the last edit:

```text
$ npm run docs                                                     EXIT 0   rows read: 1, disagreements found: 0
$ npm run docs -- --to guide                                       EXIT 0   rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source                                      EXIT 0   rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npx oxfmt --config .oxfmtrc.json --check <owned paths>           EXIT 0   All matched files use the correct format.
$ npx oxlint --config .oxlintrc.json --deny-warnings <owned paths> EXIT 0   (no diagnostic; the exit code is the reading)
$ npm run check                                                    EXIT 0
$ npm run test:guides                                              EXIT 0   Tests  28 passed (28)
$ npm run test:policy                                              EXIT 0   Tests  90 passed | 1 skipped (91)
$ npm run test:src:core                                            EXIT 0   Tests 157 passed (157)   (observation)
```

The owned paths above are `README.md guides/codec.md src/core/helpers.ts src/core/validators.ts tests/guides.test.ts`.

`git status --short`:

```text
 M README.md
 M guides/codec.md
 M src/core/helpers.ts
 M src/core/validators.ts
 M tests/guides.test.ts
```

Diffstat:

```text
 README.md              |  57 +++++---------
 guides/codec.md        |  83 +++++++++++----------
 src/core/helpers.ts    | 198 ++++++++++++++++++++++++++-----------------------
 src/core/validators.ts |  67 ++++++++++-------
 tests/guides.test.ts   |  77 ++++++++++++++++++-
 5 files changed, 279 insertions(+), 203 deletions(-)
```

`package.json` and `package-lock.json` are untouched; the `@orkestrel/guide` range still reads `^0.0.17` with the `0.0.18` head start in `node_modules`. No vendored file, no `tests/setup*.ts`, no `tests/src/**`, no `guides/README.md`, and no `src/**` code outside a doc block was written. No lint control was planted anywhere.

## Touched files

- `/home/user/fleet/codec/guides/codec.md` — the three `Summary` headers, the twenty-five propagated cells, the noun-phrase tagline, the folded source sentence, the equality gate in § Tests, and two writing-rule corrections.
- `/home/user/fleet/codec/README.md` — the same pitch under the H1, a new onboarding paragraph, the two copied Surface tables replaced by guide links, and two writing-rule corrections.
- `/home/user/fleet/codec/src/core/helpers.ts` — eighteen description paragraphs rewritten with their `@remarks` re-split, and the one titled `@example` carrying the fence body.
- `/home/user/fleet/codec/src/core/validators.ts` — seven description paragraphs rewritten with their `@remarks` re-split.
- `/home/user/fleet/codec/tests/guides.test.ts` — the `findDrift` import, `GUIDE_SPEC`, `README.md` in `ROOT_FILES`, and the three gate cases.

## Shared-file patches

None. Every change landed in an owned file.

## Deviation state

None. Ancillary matters decided and recorded: the README case's red taken at the tagline divergence rather than on the baseline (§ 1); `encodeBase64` chosen over `decodeBase64` for the title (§ 4); the guide's displaced sentences folded as a clause on the opening paragraph's closing sentence and the README's as its own onboarding paragraph (§ 5); the four writing-rule corrections in owned prose (§ 5).


---

## Orchestrator annotation (slice 1 audit, 2026-09-07)

The audit read counts in this report's prose against the writing ban, and where it names a citation as stale against the tree the unit left (msg: `357:### Factories` for `guides/msg.md:358`; sse: `88:### Factories` for `guides/sse.md:86`), the tree is authoritative. The report stands as the unit's evidence with this note.
