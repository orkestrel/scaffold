# B-PASSIVE-CLOSE-B (`bpb`) report

Both focus rules include the `forced-ring` mixin. Both proofs read the forced outline, and each ran
red before its include and green after it. The guide states the outline in the pagination and close
sections, and § Additions records the two declarations. Every gate in criteria 1, 2, 4, 5, and 6
exits 0, and criterion 3 has its failing run and its green run.

Deviation (resolved inside Owned, recorded): criterion 4 names the new § Additions row `close`. The
row landed as `btn-close`, because that is the component key the ledger measures. With `close`,
`npm run test:conformance` reported
`btn-close | .btn-close:focus { outline } | @media (forced-colors: active) | declaration` as
unrecorded and `close | … ` as stale, so the run failed 3 of 21 tests. The ledger's existing close
rows (the `btn-close` rows in the tokenization table, around guide line 3316) use the same key.
Criterion 4's literal text and criterion 6's gate cannot both hold. I chose the measured key, which
is the one that satisfies the Objective.

Positional choice (in the brief's deviation scope): the close state paragraph does not end with
"…the focus ring the button class wears." It continues with the `disabled` sentences. I placed the
close sentence directly after the focus sentence it qualifies, not at the paragraph's end.

## Diff summary

`git diff --stat` output:

```text
 guides/veneer.md                               | 10 ++++++++--
 src/styles/components/_close.scss              |  3 +++
 src/styles/components/_pagination.scss         |  1 +
 tests/src/styles/components/close.test.ts      | 24 ++++++++++++++++++++++++
 tests/src/styles/components/pagination.test.ts | 24 ++++++++++++++++++++++++
 5 files changed, 60 insertions(+), 2 deletions(-)
```

`git status --short` output (`tmp/` is gitignored):

```text
 M guides/veneer.md
 M src/styles/components/_close.scss
 M src/styles/components/_pagination.scss
 M tests/src/styles/components/close.test.ts
 M tests/src/styles/components/pagination.test.ts
```

What changed in each file:

- `src/styles/components/_pagination.scss`: `.page-link:focus` ends with `@include forced-ring;`.
  Every declaration it had is kept.
- `src/styles/components/_close.scss`: the file gains `@use '../mixins' as *;` (it imported no
  mixins before), and `.btn-close:focus` ends with `@include forced-ring;`. Every declaration it had
  is kept.
- `tests/src/styles/components/pagination.test.ts`: adds the case `outlines the focused page at the
  focus width under forced colors, where its shadow ring is not painted`.
- `tests/src/styles/components/close.test.ts`: adds the case `outlines the focused control at the
  focus width under forced colors, where its shadow ring is not painted`. The file imports
  `stageMedia` and `releaseMedia`, and its `afterEach` hook calls `releaseMedia` so a failed case
  cannot leak forced colors into later cases.
- `guides/veneer.md`: adds the two sentences and the two § Additions rows. The exact text is under
  "Guide text landed".

Each proof reuses its file's mount helper (`mountPagination` or `mountClose`). It then inserts the
`#focus-gauge` element (`width: var(--vn-focus-width)`) into the helper's host with
`insertAdjacentHTML`, so the component markup still has a single source.

## Measurements

These readings were taken under `stageMedia({ forced: true })` in Chromium, with the include in place:

- The gauge width is 3 px. The control's `outline-width` is 3 px. The control's `outline-color` is
  `rgba(5, 0, 73, 0.8)`. These came from a temporary probe assertion in `close.test.ts`, and the file
  was then restored byte for byte from a copy.
- `--vn-focus-width` compiles to `.1875rem` in `dist/src/styles/index.css`.
- The compiled rules are
  `@media (forced-colors:active){.page-link:focus{outline:var(--vn-focus-width) solid var(--vn-focus-highlight)}`
  and the same rule for `.btn-close:focus`.

## Criteria

1. Includes land and the styles build passes. `npm run build:src:styles` exit 0, run in the scoped
   commands under criteria 3 and 6. Compiling `src/styles/index.scss` with `npx sass` at `a56ca7e`
   and at the working tree, then diffing the output, shows only the two
   `@media (forced-colors: active) { .page-link:focus / .btn-close:focus { outline: … } }` blocks.
   No other rule changes.
2. Each proof gains one case. Each case has the gauge and the file's own way of reaching focus:
   `link.focus()` then `pressKeys('{ArrowRight}')` with `:focus-visible` for the page link, and
   `control.focus()` with `:focus` for the close control. Each case reads `outline-style` `none`,
   stages forced colors, reads `solid` and an `outline-width` equal to the gauge width, releases the
   media, and reads `none` again. Each case's comment carries the required clause verbatim (see the
   diff).
3. Failing run, then green. The command is
   `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/pagination.test.ts tests/src/styles/components/close.test.ts`.
   - Before the include (baseline partials, proofs added): exit 1, `Tests  2 failed | 32 passed (34)`.
     The failures are exactly the two cases, both at the forced reading:
     `AssertionError: expected 'none' to be 'solid'` (`pagination.test.ts:181`,
     `close.test.ts:128`). Log: `tmp/units/bpb-red.log.txt`.
   - After the include: exit 0, `Tests  34 passed (34)`. Log: `tmp/units/bpb-green.log.txt`.
   - The mutation is removing `@include forced-ring;`. Under that mutation, forced colors leave the
     outline at `none`. The `outline-style` `solid` assertion separates the mutated rule from the
     passing one, and it is the assertion that failed.
4. Guide text lands, wrapped at 100 columns (see "Guide text landed"). The § Additions rows sit
   after the `form-range` row with the table's column padding. The component cell is `btn-close`,
   not `close` (see the deviation).
5. Formatting, lint, and type checks pass. `npx oxfmt --check` over the five owned files exit 0
   ("All matched files use the correct format."). `npm run format:check` exit 0 (287 files).
   `npm run lint:check` exit 0. `npm run check` exit 0.
6. Build, conformance, guides, and scoped styles runs pass. `npm run build:src` exit 0.
   `npm run test:conformance` exit 0, `Tests  21 passed (21)`. `npm run test:guides` exit 0,
   `Tests  18 passed (18)`. The scoped styles run over `pagination.test.ts` and `close.test.ts` exit
   0, `Tests  34 passed (34)` (`tmp/units/bpb-scoped.log.txt`).

Observations:

- The button partial's compile is unchanged. The sass diff in criterion 1 contains no `button` rule.
- The whole `npm run test:src` run exit 0: core and browser `Tests  77 passed (77)`, styles
  `Tests  749 passed (749)` (`tmp/units/bpb-test-src.log.txt`).

## Guide text landed

Pagination focus paragraph (`### Pagination classes`):

```markdown
The focus ring is the recorded quarter-rem shadow at a quarter of the palette blue, written as a mix
over that token because a partial declares no literal color. It replaces the native outline rather
than sitting beside it, which is why the rule clears the outline at the same site. Under forced
colors the focused page's rule also writes an outline in the system highlight color through the
`forced-ring` mixin, because forced colors paint no shadow ring. § Additions records it.
```

Close state paragraph (`### Close classes`):

```markdown
Each state reads its own opacity variable: `0.5` at rest, `0.75` under the pointer, `1` on focus,
and `0.25` when `disabled`. Focus removes the outline and paints the recorded shadow, which is what
separates this control from the focus ring the button class wears. Under forced colors the focused
control's rule also writes an outline in the system highlight color through the `forced-ring` mixin,
because forced colors paint no shadow ring. § Additions records it. A control is `disabled` through
the `disabled` attribute and through the `disabled` class alike, and each form removes pointer
events and text selection beside dimming the control.
```

§ Additions rows, after the `form-range` row:

```markdown
| `btn-close`    | `.btn-close:focus { outline }`                                | `@media (forced-colors: active)`                 | declaration | Under forced colors the ring is drawn as a system-color outline, because the shadow it is drawn with elsewhere is not painted there.                                       |
| `pagination`   | `.page-link:focus { outline }`                                | `@media (forced-colors: active)`                 | declaration | Under forced colors the ring is drawn as a system-color outline, because the shadow it is drawn with elsewhere is not painted there.                                       |
```

## Shared-file patches

None. `ROADMAP.md`, `tests/setupStyles.ts`, and `tests/setupServer.ts` are untouched. The
Orchestrator's roadmap fold of the carrier row is outside this unit.

## Deviation state

Complete. There is one recorded deviation: the § Additions component key is `btn-close` rather than
criterion 4's `close`, because the conformance gate measures `btn-close`. There is one positional
choice inside the brief's deviation scope: the close sentence follows the focus sentence rather than
ending the paragraph. Nothing was committed.
