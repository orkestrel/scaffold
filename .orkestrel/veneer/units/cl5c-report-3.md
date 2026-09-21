# Unit CL5c — report 3 (brief 4)

Both findings closed. Every gate exits 0 on managed Chromium and on Edge. One deviation is
recorded under **Deviation**: the rename's annotation sites live in `app/browser/constants.ts`,
which brief 4 declares owned and which round 1's status did not list.

## Finding 1 — the mark tokens are read as retune points

`tests/setupStyles.ts` gains `TYPE_MARK_TOKEN_CASES`, pairing each painting property with the
token the treatment reads it from and a color neither system keyword resolves to:

| Property           | Token              | Retune value       |
| ------------------ | ------------------ | ------------------ |
| `color`            | `--vn-text-mark`   | `rgb(17, 34, 51)`  |
| `background-color` | `--vn-surface-mark` | `rgb(68, 85, 102)` |

`tests/src/styles/components/type.test.ts` gains the case `reads the mark paint from the mark
tokens on the tag and on the class`, after the comparison case. It mounts one host declaring both
tokens, then reads `color` and `background-color` from the bare `mark` tag and from the span
carrying the class, and requires each side to equal the retuned pair. Both sides are read because
one mixin serves both.

`tests/setupStyles.test.ts` registers the table in the export-name set, pins its property-to-token
rows, adds it to the freeze loop, and asserts its retune values are disjoint from the paint
`TYPE_MARK_CASES` carries by default. That last assertion is the invariant this unit already added
for the heading and display retune tables; I settled it into the same case rather than leaving the
mark rows' discriminating property unasserted.

### Red then green

The plant inlined the system color keywords into the `mark-text` mixin in `src/styles/_mixins.scss`
(`color: marktext; background-color: mark;`), which is the edit the finding names.

- Red: `npm run test:src:styles` → `Test Files 1 failed | 49 passed (50)`,
  `Tests 1 failed | 245 passed (246)`. The single failure is
  `tests/src/styles/components/type.test.ts:148:2 > type classes > reads the mark paint from the
  mark tokens on the tag and on the class`, reporting received
  `{ color: 'rgb(0, 0, 0)', 'background-color': 'rgb(255, 255, 0)' }` against the expected retuned
  pair. No other case moved.
- Green after restoring the two `var()` references: `npm run test:src:styles` →
  `Test Files 50 passed (50)`, `Tests 246 passed (246)`.

The plant is removed. `git diff src/styles/_mixins.scss` shows the mixin exactly as briefs 1 to 3
left it: `padding: 0 0.1875em; color: var(--vn-text-mark); background-color: var(--vn-surface-mark);`.

## Finding 2 — the shared row type renamed

`ContentSpecimen` is now `MarkupSpecimen`, named for the `markup` field the base renders and set
beside `ButtonSpecimen`, whose row carries a tag, classes, and attributes instead. No assertion's
meaning changed; the rename is type-level only. Sites:

- `app/browser/types.ts` — the interface declaration. Its doc block already read "one markup
  specimen" and is unchanged.
- `app/browser/constants.ts` — the type import, and the annotations on `CONTENT_SPECIMENS`,
  `TYPE_SPECIMENS`, and `MEDIA_SPECIMENS`.
- `app/browser/sections/SpecimenSection.ts` — the type import and the `specimens` parameter.
- `tests/app/browser/index.test.ts` — the comment naming the barrel's type exports.

`guides/veneer.md` never named the type, so no guide row follows it and the guide stays out of the
diff.

## Gate chain

Run from the checkout root by `cl5c-chain-3.sh`, logged to
`cl5c-chain-3.log.txt.txt`. The Edge runs carry `PLAYWRIGHT_CHANNEL=msedge`.

| Step | Exit | Final line |
| ---- | ---- | ---------- |
| `npm run format:check` | 0 | `Finished in 862ms on 186 files using 16 threads.` |
| `npm run lint:check` | 0 | no diagnostic output |
| `npm run check` | 0 | `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` |
| `npm run build` | 0 | `✓ built in 528ms` |
| `npm test` | 0 | `Tests 18 passed (18)` (`test:guides`, the chain's last suite) |
| `npm run test:src:styles` (Edge) | 0 | `Tests 246 passed (246)` |
| `npm run test:setup:browser` (Edge) | 0 | `Tests 33 passed (33)` |
| `npm run test:app:browser` (Edge) | 0 | `Tests 20 passed (20)` |

Inside `npm test` on managed Chromium, the styles suite reports `Tests 246 passed (246)`, the app
browser suite `Tests 20 passed (20)`, and the browser setup suite `Tests 33 passed (33)`.

## Deviation

Criterion 2 requires the three specimen table annotations to follow the rename, and those
annotations are in `app/browser/constants.ts`. Brief 4 states every site it names is in the owned
set, so I treated that file as granted for the rename alone and changed nothing else in it — its
diff is the type import and the three annotations. That makes `app/browser/constants.ts` one path
the status lists that round 1's status did not, which criterion 4 as written did not anticipate.
Criteria 2 and 4 cannot both hold as worded; I closed criterion 2 and record the addition here.
No other path changed.

## Status and diffstat

`git status --porcelain --untracked-files=all`:

```text
 M app/browser/constants.ts
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

`git diff --stat`:

```text
 app/browser/constants.ts                  |  8 +--
 app/browser/index.ts                      |  1 +
 app/browser/sections/ContentSection.ts    | 31 ++---------
 app/browser/sections/MediaSection.ts      | 31 ++---------
 app/browser/sections/TypeSection.ts       | 31 ++---------
 app/browser/types.ts                      | 10 +++-
 src/core/constants.ts                     |  2 +
 src/styles/_mixins.scss                   |  6 +++
 src/styles/_tokens.scss                   |  6 +++
 src/styles/components/_type.scss          |  4 +-
 src/styles/elements/_mark.scss            |  4 +-
 tests/app/browser/index.test.ts           |  6 ++-
 tests/setupStyles.test.ts                 | 32 ++++++++++++
 tests/setupStyles.ts                      | 42 ++++++++++++---
 tests/src/styles/components/image.test.ts |  8 ++-
 tests/src/styles/components/type.test.ts  | 87 ++++++++++++++++++++++---------
 16 files changed, 183 insertions(+), 126 deletions(-)
```
