# Report — `d7n-codec-converge-fix`

Both items landed in `/home/user/fleet/codec` on `guides/codec.md` and `README.md`. Every acceptance
criterion reads green except the `oxlint` half of criterion 1, which exits 1 on the unedited baseline
for the same reason it exits 1 after the edit: `oxlint` matches no Markdown path. Evidence for the
baseline reading is in § Criteria.

## Item 1 — counts in the guide's prose (F7)

Every site is cited at its line in the tree this unit leaves. Sites the audit named are marked
`F7`; the rest came out of the sweep in § Sweep.

| Site                  | Before                                                             | After                                                                             |
| --------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `guides/codec.md:24`  | `both faces keep the same two laws` (F7)                            | `both faces keep the same laws`                                                     |
| `guides/codec.md:54`  | `the suite holds the two walks against each other`                  | `the suite holds its walk against the producing function's`                         |
| `guides/codec.md:106` | the written-out 0x80-0x9F table `both Windows-1252 functions` read | the written-out 0x80-0x9F table `encodeWindows1252` and `decodeWindows1252` read |
| `guides/codec.md:126` | `Each face keeps two laws, and the suite drives both as sweeps` (F7) | `Each face keeps the round-trip and canonical-form laws, and the suite drives both as sweeps` |
| `guides/codec.md:139` | `A measure keeps one law`                                           | `A measure keeps the sound-triple law`                                              |
| `guides/codec.md:151` | `a divergence between the two walks`                                | `a divergence between a measure's walk and its producer's`                          |
| `guides/codec.md:199` | `UTF-16LE closes on the two things the wire form can get wrong`     | `UTF-16LE closes on what the wire form can get wrong`                               |
| `guides/codec.md:219` | `The two codings agree`                                             | `The codings agree`                                                                 |
| `guides/codec.md:252` | `fail the last clause rather than the first`                        | `fail on the consumer needing the size before the bytes rather than on the coding being here` |
| `guides/codec.md:325` | `### Drive both laws`                                               | `### Drive the round-trip and canonical-form laws`                                  |
| `guides/codec.md:420` | `and a second walk over short hex texts`                            | `and another walk over short hex texts`                                             |
| `guides/codec.md:426` | `drives all three over a deterministic mutant population`           | `drives each RFC 4648 measure over a deterministic mutant population`               |
| `guides/codec.md:431` | `One case reads what the mutants actually reach`                    | `A case reads what the mutants actually reach`                                      |
| `guides/codec.md:437` | `run the same two laws in their own direction`                      | `run the round-trip and canonical-form laws in their own direction`                 |
| `guides/codec.md:439` | `both Windows-1252 bands`                                           | `the Windows-1252 bands`                                                            |
| `guides/codec.md:441` | `the exhaustive two-byte space on all four faces`                   | `the exhaustive two-byte space on every charset face`                               |
| `guides/codec.md:453` | `one assertion pins the label's disagreement`                       | `an assertion pins the label's disagreement`                                        |
| `guides/codec.md:461` | ``Both run against the same fatal `TextDecoder`.``                  | ``Each runs against the same fatal `TextDecoder`.``                                 |
| `guides/codec.md:463` | `carries a second reading that is not a platform decoder`           | `carries another reading that is not a platform decoder`                            |

Grounds per correction class:

- `two laws`, `one law`, `two walks`, `two things`, `two codings`, `all three`, `all four faces`,
  `both Windows-1252 bands`, `One case`, `one assertion` — each answers "how many" about a set a
  later change can add to, so each is replaced by the members' names where the sentence carries
  them and deleted where it does not.
- `the last clause rather than the first` names list items by position; the correction names the
  clauses by what they say.
- `a second walk`, `a second reading` — the ordinal carries no fact the word `another` loses.
- `### Drive both laws` is the heading over the fence that drives the round-trip law and the
  canonical-form law, which the fence's own comments name; the heading now names them too.
- `guides/codec.md:106` names `encodeWindows1252` and `decodeWindows1252` because those are the
  functions reading `WINDOWS_1252_HIGH` (`src/core/helpers.ts:562`, `:603`).

Wrapping: the paragraphs at `:126-128`, `:249-252`, `:426-435`, and `:437-446` were re-wrapped at
the repository's 100-column width because the replacement text no longer fits the old breaks. No
sentence outside the table changed.

The tagline blockquote (`guides/codec.md:3-6`) and every `Summary` cell are untouched, so the
equality gate compares the same text it compared before.

## Item 2 — the README skeleton (F9)

````diff
-# Codec
+# @orkestrel/codec
@@
 catch and nothing to configure. Source: [`src/core`](src/core). Part of the `@orkestrel` line.

+## Install
+
+```sh
+npm install @orkestrel/codec
+```
+
+## Requirements
+
+- Node.js >= 22.12.0, matching the `engines` field in `package.json`
+- ESM and CommonJS entry points, selected by the `exports` field in `package.json`
+- No runtime dependencies, so installing this package installs nothing else
+
 The RFC 4648 faces and their guards are the guide's [Codings](guides/codec.md#codings) section, and
````

The H1 is now the package specifier, as `/home/user/fleet/abort/README.md:1`. The blockquote pitch
and the onboarding paragraph are byte-identical to what they were. The Node range is codec's own
`engines` field (`package.json:"engines": {"node": ">=22.12.0"}`), which matches the pilot's. The
runtime-dependency line is true against `package.json`, which declares no `dependencies` field and no
`peerDependencies` field. Everything after the inserted sections is unchanged.

## Sweep

Pattern, run over `guides/codec.md` and `README.md` outside fenced code and outside table rows:

```text
\b(both|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|dozen|twice|single|pair|couple|first|second|third|last|all \w+|[0-9]+)\b
```

Case-insensitive. Every surviving hit is ruled permitted, by class:

- **A value the reader needs.** A specification or code-page number (`RFC 4648`, `RFC 3629`,
  `ECMA-262`, `§4`, `§5`, `§8`, `ISO-8859-1`, `Windows-1252`, `UTF-8`, `UTF-16LE`), a code point or
  byte literal, a Node range (`22.12.0`), and a measurement reported as itself (`two digits` per
  byte, `two bytes` per code unit, the `three bytes` `TextEncoder` writes for the replacement
  character, `all 256` entries of a byte-wide index, octet prefixes `up to 24 bytes`, the
  `four-character` group boundary, the `two-byte` space, a `four-byte` code point).
- **`both` where the sentence names the members.** `guides/codec.md:126` (the round-trip and
  canonical-form laws), `:157-160` (the §4 and §5 faces), `:238` (`both-lawed`, whose gloss names
  the laws), `:446` (`both its decoder and its guard`), `:452` (the WHATWG index and this coding).
- **`both` over a fixed axis the domain supplies, not a growable set.** The encode and decode
  directions: `guides/codec.md:24`, `:147`, `:182`, `:434-435`, `:467`, `:481`; `README.md:40`.
  `guides/codec.md:24` also carries the wording item 1 of the brief prescribes.
- **Not a tally.** `single-spelled` and `single-byte` (an element's size), `byte pair` and
  `titled pair` (a data shape and a named pairing), `all of U+0080-U+009F` (a range),
  `closes on one side only` and `Every RFC 4648 face here has one` (the direction axis, and a
  pronoun for a measure), `normalizes first` and `closes last` (order of operation),
  `worth reading twice` (frequency), `exactly one canonical wire form per input` and
  `one byte per code unit` (a law and a rate).

## Criteria

Criterion 1, formatter:

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/codec.md README.md
All matched files use the correct format.
Finished in 1632ms on 2 files using 4 threads.
exit=0
```

Criterion 1, lint — **red, and red on the baseline too**:

```text
$ npx oxlint --config .oxlintrc.json --deny-warnings guides/codec.md README.md
No files found to lint. Please check your paths and ignore patterns.
exit=1
```

That reading was taken on the committed tip before either file was touched and again after both
edits; it is identical. `oxlint` matches no `.md` path, so the criterion cannot pass for a
Markdown-only change and reports nothing about this work.

Criterion 1, policy suite — the prose sweep reads both files:

```text
$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
exit=0
```

Criterion 2:

```text
$ npm run docs
rows read: 1, disagreements found: 0
exit=0

$ npm run test:guides
 Test Files  1 passed (1)
      Tests  28 passed (28)
exit=0
```

Criterion 3:

```text
$ git status --short
 M README.md
 M guides/codec.md

$ git diff --stat
 README.md       | 14 +++++++++-
 guides/codec.md | 83 +++++++++++++++++++++++++++++----------------------------
 2 files changed, 55 insertions(+), 42 deletions(-)
```

## Observations

- **The `oxlint` criterion is unreachable for this unit's file set.** Recorded with its baseline
  reading in § Criteria rather than treated as a defect in the edit. The settling command for a
  successor is the repository's own `npm run lint:check`, which the Orchestrator can run after this
  unit exits.
- **`README.md`'s doctrine prose now sits under `## Requirements` with no heading of its own.** The
  brief's skeleton stops at Install and Requirements and says every later section stays, and codec's
  later material carries no heading, so the guide-section pointers, the laws, the WHATWG divergence,
  the fence, and the closing guide link all read as Requirements content on the npm landing page. The
  pilot puts `## Usage` before its fence. Adding that heading, and deciding what precedes it, is a
  structure decision this unit's scope does not name; it belongs to whoever next owns `README.md`.
- **`tests/guides.test.ts:374` names its case `drives both laws`**, which no longer matches the guide
  heading `### Drive the round-trip and canonical-form laws`. Nothing reads the heading, so no gate
  reddens; the file is off-limits here. A successor owning `tests/` can rename the case for what it
  proves.

## Deviation state

None. No correction needed a file outside `guides/codec.md` and `README.md`.
