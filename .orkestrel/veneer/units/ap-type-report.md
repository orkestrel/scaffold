# AP-TYPE report

Unit: AP-TYPE, `opus` on Opus 5.5, native, worktree `/home/user/veneer-apt` (branch `unit/apt`, base `712ae72`).
Deviation state: no stop. Every acceptance criterion closed; see the gate table and the notes that follow it.

## Default viewport

The `src:styles` project renders at 414 x 896 CSS pixels. Vitest sets that default
(`node_modules/vitest/dist/chunks/coverage.DM_a_rWm.js`, `resolved.browser.viewport.width ??= 414`), and the
styles config sets no viewport. A probe run through the styles config read
`{ width: 414, height: 896, h1: '36px' }` before any source edit (`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-viewport-probe.log.txt`, instrument
`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-viewport-probe.test.ts` with `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-viewport-probe.config.ts`).

At 414 the rule moves every size above 1.25rem, so the pins that went red at rest after the source change were the
`h1`-`h3` and `.h1`-`.h3` sizes and lines, every `.display-*` size, `.fs-1`-`.fs-3` at the journey widths, every
heading and display retune row (all retunes sit above 1.25rem), the `display-1 fs-2` override (`30px`), and the
`.fs-3` layer-escape case (`24px`). The run: `npx vitest run --config configs/src/vite.styles.config.ts` after the
source edit, 34 failed / 1398 passed of 1432, all in `heading.test.ts`, `type.test.ts`, and `font.test.ts`
(`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-after-source-styles.log.txt`). The legend stayed green because the rule and the old hand formula
agree at the default token (23.4px at 1000, 24px at 1200). Each moved pin now reads at an explicit viewport through
the `visitBreakpoint` helper in `tests/setupBrowser.ts`, which drives `page.viewport` and restores the width.

## Changes by file

Owned:

- `src/styles/_mixins.scss`: adds the `fluid($size)` function, which emits
  `calc($size - max($size * 0.9 - 1.125rem, 0px) * (1 - 100vw / 1200px))` with the boundary interpolated from
  `breakpoint(xl)`, and the `font-size($size)` mixin, which emits the fluid declaration and a `breakpoint-up(xl)` cap
  of `$size`. The `heading-size` function is unchanged. The interpolation is load-bearing: without it, Sass divides
  `100vw / 1200px` itself and refuses the result (`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-sass-form-probe.log.txt`).
- `src/styles/elements/_heading.scss`: `h1` to `h6` include `font-size(heading-size($level))`.
- `src/styles/components/_type.scss`: `.h1` to `.h6` and `.display-1` to `.display-6` include the mixin. Weight and
  line-height rules are unchanged.
- `src/styles/elements/_fieldset.scss`: `legend` drops its hand formula and its separate cap block and includes
  `font-size(var(--vn-size-6))`.
- `src/styles/utilities/_font.scss`: `.fs-*` values are `fluid(heading-size($level))` through the `utility` mixin.
  The caps (`$caps`, each token) are written by `@include utility(fs, font-size, $caps)` inside one
  `breakpoint-up(xl)` block after the walk, so each cap carries `!important`.
- `tests/src/styles/elements/heading.test.ts`: the family case reads each tag at 390 and 1280 against the oracle,
  with lines at the recorded line-to-size ratio. Adds the threshold case over `TYPE_THRESHOLD_CASES`.
- `tests/src/styles/components/type.test.ts`: the `.h*` and `.display-*` cases read at 390 and 1280. The token-retune
  cases read the tag and the class at 390, 1199, 1200, and 1280, and bound the 1199-to-1200 step under 0.1px.
- `tests/src/styles/utilities/font.test.ts`: `.fs-*` reads at 390 and 1280 against the oracle and its heading class.
  The retune case reads at 390, 1199, 1200, and 1280 with the continuity bound. Adds the `<h1 class="fs-6">` case.
  Moves the `display-1 fs-2` and `.fs-3` layer-escape pins to an explicit 1280 viewport.
- `tests/src/styles/elements/fieldset.test.ts`: the legend reads at 390, 1199, 1200, and 1280 against the oracle,
  with the continuity bound. Adds a `--vn-size-6: 40px` retune case. Uses the `visitBreakpoint` helper in place of
  the hand-driven `page.viewport` calls.
- `tests/src/styles/fixtures/mixins.scss`: adds `.vn-fixture-fluid`, which includes the `font-size` mixin over
  `var(--vn-size-probe)`.
- `tests/src/styles/mixins.test.ts`: adds the `fluid size mixin` case. It covers 3rem and 1rem at a 16px root and
  2.25rem at a 20px root, at 390, 1199, 1200, and 1280, with the continuity bound.

Shared, returned in `/home/user/scaffold/.orkestrel/veneer/units/apt-shared.patch` and edited in this worktree only:

- `tests/setupStyles.ts`: adds `computeFluidSize(size, width, root = 16)` (the TypeScript oracle), `FLUID_WIDTHS`
  (`[390, 1199, 1200, 1280]`), and `TYPE_THRESHOLD_CASES` (`h6` at `12px` over `--vn-size-3`, `h5` at `32px` over
  `--vn-size-4`). Updates the TSDoc of `TEXT_HEADING_CASES`, `TYPE_HEADING_CASES`, and `TYPE_DISPLAY_CASES` to say
  that their sizes are the readings from 1200px.
- `tests/setupStyles.test.ts`: registers the new exports, pins the oracle to the brief's literal table at 390 and 1280
  (plus 51.7925 for 101px, 24.71 for 32px, 12 for 12px, and the 20px-root case), and checks the threshold table's
  rows, its disjointness from the defaults, and its freezing.
- `guides/veneer.md`: replaces every ledger row the conformance run named stale. Each `—` base `font-size` row now
  carries the fluid expression. Each `@media (min-width: 1200px)` row that read `dropped` becomes a kept `tokenized`
  row at `@media (width >= 1200px)` with the token. The `legend` base row carries the fluid expression. The Additions
  table gains `h5 { font-size }`, `h6 { font-size }`, `.h5 { font-size }`, `.h6 { font-size }`,
  `.fs-5 { font-size }`, and `.fs-6 { font-size }` at `@media (width >= 1200px)`. The conformance run placed these
  cap rows in the Additions table, not the departure table, because the release records no cap for those selectors.
  The § Font utilities prose now states the rule and its 1.25rem floor, and the size-class departure bullet reads
  "The size classes follow the release's rule over Veneer's heading scale". oxfmt re-padded every table whose widest
  cell grew, including the whole `reboot` table.

## Proofs

Every proof reads a rendered `font-size` and compares it with `computeFluidSize` at a precision of 0.005px. The oracle
is pinned to the brief's literal figures in `tests/setupStyles.test.ts`. Final run:
`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-proofs.log.txt` (119 passed across the owned style files).

| Proof | File | What it reads |
| --- | --- | --- |
| Heading family at each journey viewport, light and dark | `tests/src/styles/elements/heading.test.ts` | `h1`-`h6` size and line at 390 and 1280 (26.28, 23.925, 21.57, 20, 18, 16 / 36, 30, 24, 20, 18, 16), weight `600` |
| `h6` from a `12px` `--vn-size-3` retune | `heading.test.ts` | 12px at 390 and 1280 (the floor holds) |
| `h5` from a `32px` `--vn-size-4` retune | `heading.test.ts` | 24.71px at 390 (fluid), 32px at 1280 |
| `.h*` class to the size and line of its own tag at each journey viewport | `tests/src/styles/components/type.test.ts` | `.h1`-`.h6` at 390 and 1280, equal to the tag, weight `600` |
| `.display-*` from its own token at each journey viewport | `type.test.ts` | 43.55, 40.41, 37.27, 34.13, 30.99, 27.85 at 390; 80 to 40 at 1280; weight `300` |
| `h*` and `.h*` from the retuned token on each side of the boundary | `type.test.ts` | `h1`/`.h1` at `--vn-size-8: 101px`: 51.7925 at 390, 101 at 1280, 1199-to-1200 step under 0.1px; the same for `h2`-`h6` at 102-106px |
| `.display-*` from the retuned token on each side of the boundary | `type.test.ts` | 107-112px retunes at 390, 1199, 1200, and 1280 |
| `.fs-*` to its heading class at each journey viewport | `tests/src/styles/utilities/font.test.ts` | `.fs-1`-`.fs-6` at 390 and 1280, equal to `.h*` |
| `.fs-*` from the retuned token on each side of the boundary | `font.test.ts` | `.fs-1` at 101px: 51.7925 at 390, 101 at 1280, 1199-to-1200 step under 0.1px; `.fs-2`-`.fs-6` likewise |
| Size class on a heading tag | `font.test.ts` | `<h1 class="fs-6">` reads 16px at 390 and 1280, equal to `<p class="fs-6">` |
| Legend at each viewport, light and dark | `tests/src/styles/elements/fieldset.test.ts` | 21.57 at 390, 24 at 1280, 1199-to-1200 step under 0.1px |
| Legend under a `--vn-size-6: 40px` retune | `fieldset.test.ts` | 27.85 at 390, 40 at 1280 |
| Fluid size mixin at any root | `tests/src/styles/mixins.test.ts` | 3rem at 16px root (30.99 at 390, 48 at 1280); 1rem stays 16; 2.25rem at 20px root (32.85 at 390, 45 from 1200, no step) |
| Oracle against the brief's table | `tests/setupStyles.test.ts` | `computeFluidSize` over every default size at 390 and 1280, the 101px, 32px, 12px, and 20px-root cases |

Failing-first: `python3 /home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-baseline-proofs.py` restores the owned source partials to their `712ae72` bytes,
rebuilds, and runs the owned proofs. Result: 34 failed / 39 passed of 73 collected. `mixins.test.ts` failed to load
with `[sass] Undefined mixin`, because its fixture needs the mixin. The run then restored each partial with
`identical=True` (`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-baseline-proofs.log.txt`). By design, these proofs pass on the baseline source:
the default legend (the old formula agrees at the default token), the `h6` 12px retune (the baseline never scales),
and `<h1 class="fs-6">`. The guard mutation reddens all of them.

## Mutations

Each mutation run applies one edit, rebuilds, runs the owned style proofs, and restores the exact prior bytes. The
runner is `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-mutate.py <name>`, and each log ends with an `identical=True` digest check per file.

| Mutation | Proof that reddened (reading) | Log |
| --- | --- | --- |
| Literal size in place of the token: `heading-size(1)` returns `2.25rem` | `type.test.ts` and `font.test.ts` `h1` retune rows (`.h1`/`.fs-1` at 390 read 26.28, not 51.7925), plus the `heading-size` fixture proof in `mixins.test.ts`; 3 failed | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-mutation-literal.log.txt` |
| Literal size in the cap only (mixin cap and `$caps` level 1 write `2.25rem`) | `type.test.ts` `h1` retune (`.h1` at 1200 reads 36, not 101); `font.test.ts` `h1` retune (`.fs-1` at 1200 reads 36, not 101); 2 failed | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-mutation-literal-cap.log.txt` |
| Cap removed from the mixin | heading, `.h*`, `.display-*`, and legend proofs at 1280 (`.h1` reads 36.96, not 36; legend 24.24, not 24; `.h1` retune 105.86, not 101); 38 failed | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-mutation-cap.log.txt` |
| Boundary moved to `xxl` (function divisor, mixin cap, `.fs` caps) | every size proof, first at 390 (`h1` 25.6114, not 26.28); 40 failed | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-mutation-xxl.log.txt` |
| Boundary moved to `xxl` in the caps only | every size proof at 1280 (`.h1` and `.fs-1` read 36.96, not 36; `.display-1` 83.6, not 80); 40 failed | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-mutation-xxl-cap.log.txt` |
| `max()` guard removed | `heading.test.ts` `h6` 12px retune (390 reads 16.86, not 12), plus the default `h5`/`h6`, `.fs-5`/`.fs-6`, `<h1 class="fs-6">`, and the 1rem mixin row; 10 failed | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-mutation-guard.log.txt` |
| `.fs-*` caps without `!important` | `font.test.ts` `.fs-*` at 1280 (`.fs-1` reads 36.96, not 36), the retune rows at 1280, the `display-1 fs-2` override (30.6px), and the `.fs-3` layer escape (24.24px); 11 failed | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-mutation-important.log.txt` |

## Gates

The host `npm` is 10.9.7, and the project's `devEngines` refuses it. Every run therefore uses npm 11.19.1 from
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin`, with
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, as the Orchestrator's own gate scripts do (`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/env.sh`). Gate
runner: `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-gates.sh`.

| Gate | Exit | Log |
| --- | --- | --- |
| `npm run format:check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-gate-format-check.log.txt`, rerun after the last guide edit `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-gate-format-check-2.log.txt` |
| `npm run lint:check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-gate-lint-check.log.txt` |
| `npm run check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-gate-check.log.txt` |
| `npm run test:src:styles` | 0 (115 files, 1439 passed; baseline 1432) | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-gate-test-src-styles.log.txt`, baseline `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-baseline-styles.log.txt` |
| `npm run test:setup` | 1, then 0 alone (320 passed) | first run `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-gate-test-setup.log.txt` (hook and test timeouts in `setupServer.test.ts` and `setupStyles.test.ts` at load average 16.9), rerun `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-gate-test-setup-2.log.txt` |
| `npm run test:conformance` | 0 (26 passed) | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-gate-test-conformance.log.txt`, rerun `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-gate-test-conformance-2.log.txt` |
| `npm run test:guides` | 0 (20 passed) | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-gate-test-guides.log.txt`, rerun `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-gate-test-guides-2.log.txt` |

- The first `test:setup` failure was timing only; the rerun alone was green. Per § Writing concurrency rule 10, the
  deciding run belongs to the Orchestrator.
- `test:conformance` reads the `dist/src/core/index.js` file, so it needs `npm run build:src` in this worktree first
  (`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-build-src.log.txt`). The first conformance run failed on that missing file and on the ledger rows
  (`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-conformance-pre-guide.log.txt`).
- `git diff 712ae72 --stat` names only owned and shared files (`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-diffstat.txt`).

## Artifacts

- `/home/user/scaffold/.orkestrel/veneer/units/apt.diff`: `git diff 712ae72` over the owned files.
- `/home/user/scaffold/.orkestrel/veneer/units/apt-shared.patch`: `git diff` over the shared files `tests/setupStyles.ts`, `tests/setupStyles.test.ts`,
  and `guides/veneer.md`.
- `/home/user/scaffold/.orkestrel/veneer/units/apt-status.txt`: `git status --short`.
- `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-ledger.py`: the ledger rewrite. It keys each row by cell content, not by padding.

## Notes for integration

- The guide hunk re-pads the whole `reboot` departure table. If AP-COLOR's patch touches that table, the textual
  patch will conflict on whitespace. The content-keyed route is: apply AP-COLOR, then rerun
  `python3 /home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-ledger.py` over this unit's recorded conformance output, and add the Additions rows as the
  patch shows. That script matches cells regardless of padding. Then run `npx oxfmt --config .oxfmtrc.json --write guides/veneer.md`.
- `npm run format -- <files>` expands to `oxfmt --write . <files>`, so my one invocation formatted the whole tree. It
  changed no file outside the owned and shared set (`/home/user/scaffold/.orkestrel/veneer/units/apt-status.txt`). Every later format used
  `npx oxfmt --config .oxfmtrc.json --write <file>`.
- Not run, per the brief: `npm run test:journey`, `npm run test:app`, and the whole `npm test` chain. The
  `tests/app/browser/sections/TypeSection.test.ts` file pins specimen markup, not sizes. The journey's `.fs-1`
  capture subject (`tests/setup.ts`, the `font-sizes` scenario) renders a fluid size at 390 after this change.
- The 1199-to-1200 continuity check is written inline in `type.test.ts`, `font.test.ts`, `fieldset.test.ts`, and `mixins.test.ts`. A shared reader for it would belong in
  `tests/setupBrowser.ts`, which this unit neither owns nor shares.
- The mixin is named `font-size` after the release's own responsive-font-size mixin, and the function is named
  `fluid` after the release's term.
