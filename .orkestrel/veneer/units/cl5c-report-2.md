# CL5c — report 2, the mark ruling closed

The mark ruling is closed in the two files brief 3 granted. No gate required a guide row, so
`guides/veneer.md` stays absent from the diff. Every gate exits 0 on managed Chromium and on Edge.
Everything briefs 1 and 2 closed is untouched.

## The mixin and its consumers

`mark-text` in `src/styles/_mixins.scss`, placed beside `heading-text` and `image-size`, the
twin-closing mixins CL5b landed:

```scss
@mixin mark-text {
	padding: 0 0.1875em;
	color: var(--vn-text-mark);
	background-color: var(--vn-surface-mark);
}
```

Its consumers are `mark` in `src/styles/elements/_mark.scss`, which gained
`@use '../mixins' as *;` the way `_heading.scss` carries it, and `.mark` in
`src/styles/components/_type.scss`. Each keeps its own selector and declares nothing else. No
existing mixin changed.

The name follows the file's subject-and-aspect vocabulary, and `code-text` already precedents a
`-text` mixin that emits padding beside colour.

The compiled cascade shows the pair emitting one treatment:

```css
mark{color:var(--vn-text-mark);background-color:var(--vn-surface-mark);padding:0 .1875em}
.mark{color:var(--vn-text-mark);background-color:var(--vn-surface-mark);padding:0 .1875em}
```

## The two registry leaves

`src/core/constants.ts` gained `mark: '--vn-text-mark'` after the `text` group's `highlight` leaf
and `mark: '--vn-surface-mark'` after the `surface` group's `highlight` leaf, and nothing else.

`src/styles/_tokens.scss` declares them at `:root` beside `--vn-text-heading`, carrying the system
colours `marktext` and `mark`. They sit there rather than in the theme closure because they are
mode-independent, and a comment records that a consumer retunes the mark highlight through them
rather than through `--bs-highlight-bg`.

## The tag's paint, before and after

Unchanged. `tests/src/styles/elements/mark.test.ts` and the `TEXT_MARK_CASES` table it reads are
each byte-identical to `4f817db`, so the table is the reading taken before the change and the run
is the reading taken after.

| Property               | Before, at `4f817db` | After              |
| ---------------------- | -------------------- | ------------------ |
| `padding-block-start`  | `0px`                | `0px`              |
| `padding-inline-start` | `2.625px`            | `2.625px`          |
| `color`                | `rgb(0, 0, 0)`       | `rgb(0, 0, 0)`     |
| `background-color`     | `rgb(255, 255, 0)`   | `rgb(255, 255, 0)` |

`npm run test:src:styles -- elements/mark.test` → exit 0, 1 file / 2 tests, unedited.

## The sweep

`npm run test:setup` → exit 0, **3 files / 138 tests**. The case
`carries no shared written declaration block across style partials` reports `shared` empty: each
partial's mark block holds one `@include` and no written declaration, so the scanner records no
block for either. This is the reading brief 2's scope could not reach, and it is green.

## The token proof

`npm run test:src:styles -- styles/tokens.test` → exit 0, 1 file / 30 tests, with
`tests/src/styles/tokens.test.ts` unedited. The `:root` partition equals the registry once the
registry carries the leaves, so the partition has one author.

## The comparison case and the mutation that reddens it

`tests/src/styles/components/type.test.ts`, case
`renders the mark class as the bare mark tag renders in $mode mode`. It mounts
`<mark>Tag</mark><span class="mark">Class</span>` in one host, reads padding and paint off each,
pins the span's readings against `TYPE_MARK_CASES`, then asserts the span's readings equal the
tag's.

The class sits on a span rather than on a `mark`. A class on a `mark` agrees with its tag whether
or not the class paints anything, because the user agent's highlight rule already reaches that
element; a span is the element that rule does not reach, so the reading proves the class carries
the treatment itself.

`TYPE_MARK_CASES` in `tests/setupStyles.ts` carries the readings the class takes —
`padding-block-start: 0px`, `padding-inline-start: 2.625px`, `color: rgb(0, 0, 0)`,
`background-color: rgb(255, 255, 0)` — replacing the highlight-token values it held. It stays a
separate table from `TEXT_MARK_CASES` rather than folding into it: two tables plus the live
comparison redden the side that drifted, where one shared table would carry a retuned tag reading
into the class's expectation with nothing red. A comment in the table says so.

Two plants, each built and run, each reverted:

| Plant                                      | Assertion that fired      | Result                                                                                      |
| ------------------------------------------ | ------------------------- | ------------------------------------------------------------------------------------------- |
| `padding-block: 0.1875em` added to `.mark` | the pin against the table | exit 1, **2 failed, 33 passed (35)**, `"padding-block-start"` read `2.625px` against `0px` |
| `padding-block: 0.1875em` added to `mark`  | the pair comparison       | exit 1, **2 failed, 33 passed (35)**, the span read `0px` where the tag read `2.625px`      |

The second plant is the one that matters: the class still matched its table, and the comparison
against the tag is what caught the divergence. Reverted:
`npm run test:src:styles -- components/type.test elements/mark.test` → exit 0,
**2 files / 37 tests**.

## The guide row

No gate required one. `npm run test:guides` → exit 0, 1 file / 18 tests, and `test:guides` runs
inside `npm test`, which also passed. `guides/veneer.md` is absent from the diff.

The row is still owed by the guide's owner, and brief 1's report already listed it: under § Tokens,
`--vn-text-mark` and `--vn-surface-mark` carry the system colours the content calibration measured,
so a consumer retuning `--bs-highlight-bg` and `--bs-highlight-color` no longer moves the mark pair
— `.mark` read those aliases before this change and reads the Veneer tokens after it.

## Gates

Ordered chain from the checkout root, managed Chromium:

| Step                   | Exit | Final reading                                                                                                                         |
| ---------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` over 186 files                                                                            |
| `npm run lint:check`   | 0    | no diagnostics                                                                                                                        |
| `npm run check`        | 0    | root, src core, src browser, src styles, app browser                                                                                  |
| `npm run build`        | 0    | `✓ built in 521ms`                                                                                                                    |
| `npm test`             | 0    | every project passed; styles 50 files / 245 tests, app:browser 7 files / 20 tests, setup 3 files / 138 tests, guides 1 file / 18 tests |

Edge, `PLAYWRIGHT_CHANNEL=msedge`:

| Step                         | Exit | Final reading        |
| ---------------------------- | ---- | -------------------- |
| `npm run test:src:styles`    | 0    | 50 files / 245 tests |
| `npm run test:setup:browser` | 0    | 1 file / 33 tests    |
| `npm run test:app:browser`   | 0    | 7 files / 20 tests   |

## Status

```text
 M app/browser/index.ts
 M app/browser/sections/ContentSection.ts
 M app/browser/sections/MediaSection.ts
 M app/browser/sections/TypeSection.ts
 M app/browser/types.ts
 M src/core/constants.ts
 M src/styles/_mixins.scss
 M src/styles/_tokens.scss
 M src/styles/components/_type.scss
 M src/styles/elements/_mark.scss
 M tests/app/browser/index.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/components/image.test.ts
 M tests/src/styles/components/type.test.ts
?? app/browser/sections/SpecimenSection.ts
?? tests/app/browser/sections/SpecimenSection.test.ts
```

```text
 app/browser/index.ts                      |  1 +
 app/browser/sections/ContentSection.ts    | 31 ++--------------
 app/browser/sections/MediaSection.ts      | 31 ++--------------
 app/browser/sections/TypeSection.ts       | 31 ++--------------
 app/browser/types.ts                      |  8 ++++
 src/core/constants.ts                     |  2 +
 src/styles/_mixins.scss                   |  6 +++
 src/styles/_tokens.scss                   |  6 +++
 src/styles/components/_type.scss          |  4 +-
 src/styles/elements/_mark.scss            |  4 +-
 tests/app/browser/index.test.ts           |  6 ++-
 tests/setupStyles.test.ts                 | 16 ++++++++
 tests/setupStyles.ts                      | 22 +++++++----
 tests/src/styles/components/image.test.ts |  8 +++-
 tests/src/styles/components/type.test.ts  | 61 ++++++++++++++++++-------------
 15 files changed, 116 insertions(+), 121 deletions(-)
```

Every path is in briefs 1 to 3's owned set. `guides/veneer.md`, `tests/setupConformance.ts`,
`tests/fixtures/**`, `package.json`, `configs/**`, every other partial, and the vendored files are
absent.

## Acceptance criteria, brief 3

| Criterion                                                                                          | State |
| -------------------------------------------------------------------------------------------------- | ----- |
| 1 the class and the tag render the same paint and padding, proved by comparison, divergence reddens | met   |
| 2 the tag's paint unchanged from `4f817db`, its proof unedited                                      | met   |
| 3 `npm run test:setup` reports no shared declaration block                                          | met   |
| 4 the token proof passes with no edit to it                                                         | met   |
| 5 exactly two registry leaves and exactly one mixin                                                 | met   |
| 6 every gate exits 0 on managed Chromium and on Edge                                                | met   |
| 7 the status lists only the files briefs 1 to 3 own                                                 | met   |

## Deviation

None. Every stop condition brief 3 names stayed clear: the tag's paint did not move, the token
proof passed once the registry carried the leaves, and no file beyond the two granted was needed.

Ancillary choices settled here, as the contract scopes: the mixin's name (`mark-text`) and its
placement beside the CL5b twin-closing mixins; the comparison case's home, the mark case already in
`tests/src/styles/components/type.test.ts`, restated, and its use of a span; the token pair's
placement at `:root` beside `--vn-text-heading`; and keeping `TYPE_MARK_CASES` a table separate
from `TEXT_MARK_CASES`.
