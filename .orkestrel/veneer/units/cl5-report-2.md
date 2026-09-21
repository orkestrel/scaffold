# Unit CL5 — fix round report (brief 3)

Both findings are closed. No source file changed this round; the two fixes are test-side, and
`guides/veneer.md` is untouched.

## Finding 1 — the heading twin's colour assertion

`tests/src/styles/components/type.test.ts:38-52`. The assertion comparing the class against
`oklch(0.208 0.042 265.755)` is gone. The case now compares the class's colour against the tag's on
the default host, then mounts a second host declaring
`color: var(--vn-text-body-base); --bs-heading-color: rgb(20, 80, 140)`, the same control
`tests/src/styles/elements/heading.test.ts:35-42` uses on the tag, and reads both the tag and the
class through it. Only the `color: var(--bs-heading-color)` declaration can deliver that value,
because `--bs-heading-color` resolves through `--vn-text-heading` to `inherit`.

Red then green, from `npx vitest run --config configs/src/vite.styles.config.ts --no-cache
--reporter=dot tests/src/styles/components/type.test.ts`, each after `npm run build:src:styles`:

| Run | Tree state | Result |
| --- | ---------- | ------ |
| Red | `color: var(--bs-heading-color);` deleted from `src/styles/components/_type.scss:11` | `Tests  6 failed \| 12 passed (18)`, every `h1` through `h6` case failing with `expected 'oklch(0.208 0.042 265.755)' to be 'rgb(20, 80, 140)'` |
| Green | declaration restored | `Tests  18 passed (18)` |

## Finding 2 — the retune matrix

Two frozen tables in `tests/setupStyles.ts:748-778`: `TYPE_HEADING_TOKEN_CASES` carries
`h1`–`h6` against `--vn-size-8` down to `--vn-size-3`, and `TYPE_DISPLAY_TOKEN_CASES` carries
`display-1`–`display-6` against `--vn-display-1` through `--vn-display-6`. Each row names a
retune value no level resolves by default: 101px to 106px for the headings, 107px to 112px for the
displays.

`tests/src/styles/components/type.test.ts:69-99` replaces the single-level retune with two
`it.each` cases over those tables. Each heading case mounts a host declaring only that level's
token and reads the retuned value back from the tag and from the class; each display case does the
same for the class. A level naming a literal, or naming a sibling's token, resolves its default on
that host and reddens. Reading: `Tests  29 passed (29)`, up from 18.

I proved the matrix fires rather than resting on the design: appending `.h4 { font-size: 20px; }`
to `src/styles/components/_type.scss` — a literal equal to that level's default, which no
default-value case can see — gave `Tests  1 failed | 28 passed (29)`, failing
`reads the 'h4' size from the '--vn-size-5' token its own level names`. The plant was removed and
the run returned to `Tests  29 passed (29)`.

`tests/setupStyles.test.ts` carries the two names in its import and its export-name list, the
`[level, token]` rows of each table, and both tables in its frozen-table loop. Extending that case
beyond the bare export-name list is the one ancillary choice I settled: the sibling `TYPE_*` tables
are asserted there already, and a new exported table left unasserted beside them is drift.

## Plants removed

- `src/styles/components/_type.scss` colour declaration: restored, `grep` reads
  `11: color: var(--bs-heading-color);`.
- `src/styles/components/_type.scss` `.h4` literal block: removed.
- The file is byte-identical to its pre-round state; it does not appear in this round's changes.
- `guides/veneer.md` blob hash is `d014c9f826de017000c5221144fef3dee0df9d34` before and after this
  round.

## Gates

Managed Chromium, ordered chain from the checkout root:

| Step | Exit | Final reading |
| ---- | ---- | ------------- |
| `npm run format:check` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` | 0 | `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` |
| `npm run build` | 0 | `✓ built in 539ms` |
| `npm test` | 0 | `Test Files  1 passed (1)` / `Tests  18 passed (18)` on the last project; the styles project reads `Test Files  50 passed (50)` / `Tests  239 passed (239)` |

Edge, `PLAYWRIGHT_CHANNEL=msedge`:

| Step | Exit | Final reading |
| ---- | ---- | ------------- |
| `npm run test:src:styles` | 0 | `Test Files  50 passed (50)` / `Tests  239 passed (239)` |
| `npm run test:setup:browser` | 0 | `Test Files  1 passed (1)` / `Tests  33 passed (33)` |
| `npm run test:app:browser` | 0 | `Test Files  6 passed (6)` / `Tests  17 passed (17)` |

`npm run format:check` reported `tests/src/styles/components/type.test.ts` unformatted on its first
run; `oxfmt --write` on that one file converged it, and the rerun is the reading in the table.

## Tree

`git diff --stat`:

```text
 app/browser/Showcase.ts                           |   9 +-
 app/browser/constants.ts                          |  81 ++++++++++
 app/browser/index.ts                              |   2 +
 app/browser/types.ts                              |   4 +-
 guides/veneer.md                                  | 175 +++++++++++++---------
 src/styles/index.scss                             |   4 +
 tests/app/browser/Showcase.test.ts                |  16 +-
 tests/app/browser/index.test.ts                   |   6 +
 tests/app/browser/sections/ContentSection.test.ts |  48 ++++++
 tests/conformance.test.ts                         |  21 ++-
 tests/setupConformance.test.ts                    |  24 ++-
 tests/setupStyles.test.ts                         |  76 ++++++++++
 tests/setupStyles.ts                              | 130 ++++++++++++++++
 13 files changed, 517 insertions(+), 79 deletions(-)
```

`git status --porcelain --untracked-files=all`:

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M app/browser/types.ts
 M guides/veneer.md
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/sections/ContentSection.test.ts
 M tests/conformance.test.ts
 M tests/setupConformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/MediaSection.ts
?? app/browser/sections/TypeSection.ts
?? src/styles/components/_image.scss
?? src/styles/components/_list.scss
?? src/styles/components/_quote.scss
?? src/styles/components/_type.scss
?? tests/app/browser/sections/MediaSection.test.ts
?? tests/app/browser/sections/TypeSection.test.ts
?? tests/src/styles/components/image.test.ts
?? tests/src/styles/components/list.test.ts
?? tests/src/styles/components/quote.test.ts
?? tests/src/styles/components/type.test.ts
```

Every entry is a file briefs 1 and 2 own, plus `tests/app/browser/index.test.ts`, the barrel proof
already declared. This round's own changes are `tests/src/styles/components/type.test.ts`,
`tests/setupStyles.ts`, and `tests/setupStyles.test.ts`.

## Deviation state

None. No stop condition fired, and nothing outside the brief's scope was needed.
