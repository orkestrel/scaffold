# LABEL (`lc`) report

`opus` on Opus 5.5, native, worktree `/home/user/veneer-lc` (branch `unit/lc` from `ac74459`). Nothing is
committed. The retained evidence sits under `/home/user/veneer-lc/tmp/units/`.

## Decision the Orchestrator must confirm

The L4 mechanism (`light-dark()`) fails at a root that carries no `data-bs-theme` attribute in the shipped
build, so I declared `color-scheme: light` on the `:root` selector in `src/styles/_theme.scss`.

- Cause: the styles build minifies with Lightning CSS, which lowers every `light-dark()` value into
  `var(--lightningcss-light, L) var(--lightningcss-dark, D)` and declares those two variables only beside a
  `color-scheme` declaration. Without one on the root, both fallbacks apply and the value is invalid.
- Probe (`lc-probe-1.log.txt`, Chromium 141, built cascade): with no root scheme, a root `.btn-primary`
  label read `oklch(0.208 0.042 265.755)`, the inherited body text. With the root scheme
  (`lc-probe-2.log.txt`), the root reads white, the dark island black, the nested light island white, and
  the button carrying its own light attribute white.
- The L4 guide sentence ("a consumer who sets `color-scheme` apart from `data-bs-theme` splits the label
  from the fill") is false in the shipped build. A wrapper with `color-scheme: dark` and no attribute
  keeps the white label (`lc-probe-2.log.txt`, `p4`). The guide states that behavior instead, and the
  island proof reads it.
- Cost: THEME-owned cases go red, and the ledger gains a `theme | :root { color-scheme }` addition row.
  The THEME edits are in `lc-theme-owned.patch`, and a scoped run with them applied passed
  (`lc-theme-owned-check.log.txt`: `Tests  2 passed | 42 skipped (44)`, exit 0).
- Alternative with no root change: emit the mode-varying labels through `@scope ([data-bs-theme=dark]) to
  ([data-bs-theme=light])` rules instead of `light-dark()`. That replaces the L4 mechanism, so I did not take it.

## Resolved label and direction

Every pick matches the verdict table. The built `.btn-primary` rule writes
`--bs-btn-color:var(--lightningcss-light,var(--vn-palette-white-base))var(--lightningcss-dark,var(--vn-palette-black-base))`.
Every other role writes one palette token. The browser readings come from the `lc-probe-4.log.txt` probe,
which read the built cascade in `[data-bs-theme]` islands. Ratios run from rest to hover to active.

| Role | Mode | Label | Label contrast, rest to hover to active | Fill direction |
| --- | --- | --- | --- | --- |
| primary | light | white | 7.132, 8.321, 9.468 | shade |
| primary | dark | black | 8.122, 8.945, 9.729 | tint |
| secondary | light | white | 7.564, 8.748, 9.878 | shade |
| secondary | dark | white | 4.689, 5.685, 6.713 | shade |
| tertiary | both | white | 5.881, 7.024, 8.169 | shade |
| success | both | white | 4.943, 5.990, 7.068 | shade |
| info | both | white | 5.854, 6.963, 8.071 | shade |
| warning | both | white | 5.051, 6.138, 7.258 | shade |
| danger | both | white | 6.420, 7.735, 9.052 | shade |
| light | both | black | 19.922, 15.279, 11.979 | shade, toward the label |
| dark | both | white | 15.426, 10.581, 7.509 | tint, toward the label |

- The `.text-bg-*` pairs carry the same labels: primary 7.108 in light and 8.112 in dark, info 5.856,
  warning 5.031 (white), success 4.945, danger 6.421, light 19.922 (black), and dark 15.426.
- The shade endpoint is the `$light` map's `state-mixer` value. The tint endpoint is the
  `var(--vn-palette-white-base)` token.
- A colored link moves 20% toward the endpoint that leads away from its label, with no exception for
  the `light` and `dark` roles, as the release's `_colored-links.scss` helper moves them.
- Boundary unknown: Sass computes the white ratio on the release `#0d6efd` fill as 4.5007827874. The fixture
  proof holds that ratio in [4.5, 4.501) and reads white.

## Files

- `src/styles/_mixins.scss`: adds the `luminance`, `ratio`, `contrast`, `scheme`, `label`, and `mixer`
  functions. The `theme-tokens` mixin takes `$retuned`, emits the fill, triplet, and `--bs-*` aliases of
  every role whose fill the mode map carries (primary and secondary), and runs the `$retuned` walk (F2).
  Its contract comment reads true.
- `src/styles/_tokens.scss`: the primary and secondary `-rgb` entries become Sass lists. Adds the `$channels`
  map, which the `:root` block emits from, the derived `$triplets` map (role to light and dark triplet), the
  `$candidates` map, the `$endpoints` map, and the `$extremes` list. Drops the `$retuned` walk and the
  `--bs-secondary` pair from the `:root` blocks. The F1 comments are rewritten.
- `src/styles/_theme.scss`: adds the root `color-scheme: light` rule. Each mode scope is the scheme plus one
  `theme-tokens` include.
- `src/styles/components/_button.scss`: the role loop reads the `label` function and the `mixer` function,
  passing `$toward` for the `light` and `dark` roles. The bare `.btn` veil is unchanged.
- `src/styles/utilities/_color-bg.scss`: `$dark-labels` is gone. Each pair `color` reads the `label`
  function and keeps its `!important` flag.
- `src/styles/utilities/_link.scss`: each `.link-{role}` rule nests a `:hover, :focus` rule whose color and
  underline color are `rgb(from color-mix(in srgb, <mixer> 20%, rgb(<triplet>)) r g b / <opacity variable>)`.
- `src/styles/components/_validation.scss`: the tooltip `color` reads the `label` function, which gives white
  for success and for danger.
- `tests/src/styles/fixtures/contrast.scss` (added): runs the `contrast` function over the release
  `$theme-colors` fills against its own `$color-contrast-light` and `$color-contrast-dark` labels, which it
  imports from `bootstrap/scss`, and writes the `scheme` function's two forms.
- `tests/src/styles/mixins.test.ts`: the contrast rule cases.
- `tests/src/styles/components/button.test.ts`: the floor, direction, island, and class-veil cases. The
  filled and outline cases read their labels from the `BUTTON_LABEL_CASES` table.
- `tests/src/styles/elements/button.test.ts`: the bare-element veil case.
- `tests/src/styles/utilities/color-bg.test.ts`: the fill case and the agreement-and-floor case.
- `tests/src/styles/utilities/link.test.ts`: the rest case and the direction-and-opacity case.
- `tests/src/styles/components/validation.test.ts`: the added tooltip label-and-floor case.

`git diff --stat` for the tracked files reads `13 files changed, 573 insertions(+), 165 deletions(-)`.
`tests/src/styles/fixtures/contrast.scss` is untracked. The diff is in `lc.diff`, and the status is in `lc-status.txt`.

## Byte comparisons

`lc-compare.mjs` compares the `ac74459` build (`lc-base-index.css`) with this build (`lc-compare-3.log.txt`).

- Triplets: every `--vn-color-*-rgb` declaration is byte-identical, in the same rule and in the same
  order.
- F2: the `[data-bs-theme=light]` and `[data-bs-theme=dark]` scopes each hold the same declaration set as
  the base, with no differing property. The declaration order inside each rule changed, which is recorded
  here rather than treated as a defect.
- The `:root` scope differs only by the root scheme decision: `color-scheme: light` and the
  `--lightningcss-light` and `--lightningcss-dark` pair.

## Proofs, red runs, and mutations

The red runs executed the owned proofs against the `ac74459` partials with this unit's tests
(`lc-red.sh`, `lc-red-*.log.txt`). Each mutation ran against the fixed tree (`lc-mutate.py`,
`lc-mutations.log.txt`, and one `lc-mutation-M*.log.txt` log per mutation).

- **The rule** (`mixins.test.ts`, contrast functions):
  - Red run without the fix: the fixture fails to compile, so the file imports no tests
    (`lc-red-styles-mixins.log.txt`).
  - M1, the rule tries the candidates in reverse order: red on the primary, success, and danger picks and
    on the boundary case.
  - M2, the rule minimum is raised to 4.6: red on the same cases.
  - M10, the `scheme` function writes a pair even where the modes agree: red on the scheme case.
- **The floor** ("keeps the {role} label legible over every filled and outline state in {mode} mode",
  reading rest, hover, active, outline hover, outline active, checked outline, and disabled; plus the pair
  case and the tooltip case):
  - Red run: the dark primary, secondary, tertiary, success, info, and warning cases fail (for example,
    the dark primary rest reading is 2.5856).
  - M3, the primary label is pinned to white: red on the dark primary floor, direction, island, filled,
    and outline cases.
  - M9, the tooltip label is pinned to black: red on the tooltip cases.
- **The direction** ("moves the {role} hover and active fills in {mode} mode the way its {label} label and
  {direction} direction name"):
  - Red run: every role but `dark` fails in dark mode, and the `dark` role fails in light mode.
  - M4, the variants read `--vn-state-mixer` again: red on the same set.
- **The agreement** ("carries the label its filled button carries in {mode} mode, at or above the contrast
  bar"):
  - Red run: both modes fail on the info and warning pairs, and the dark mode also fails on the primary
    pair.
  - M5, the `$dark-labels` list is restored: red in both modes.
- **The islands** ("reads the primary label in the island the button sits in, and never from a bare
  scheme"):
  - Red run: red.
  - M6, the dark pick is written for both modes: red.
- **The veil** (the `BUTTON_BARE_CASES` table is unedited and green; the step cases read the dark bare
  `button` element and the bare `.btn` class):
  - Red run: green, because this unit does not change the veil.
  - M7, the dark veil reads the black palette entry: red on both step cases and on the dark
    `BUTTON_BARE_CASES` row.
- **The colored links** ("moves the {role} hover and focus color away from its label, and scales it by the
  opacity variables"):
  - Red run: every role fails in both modes.
  - M8, the hover is written as the resting color: red on the same set.
- **The tooltip case** stays green in the red run, because its value does not change. M9 binds it.

## Ledger rows changed (in `lc-shared.patch`)

The Veneer cell changed in each of these rows, and each row keeps its `tokenized` status.

- `btn`:
  - `.btn-primary`: the `--bs-btn-color`, `-hover-color`, `-active-color`, and `-disabled-color` rows.
  - Every `.btn-{role}` rule: the `--bs-btn-hover-bg` and `-active-bg` rows.
  - `.btn-outline-primary`: the `--bs-btn-hover-color` and `-active-color` rows.
  - Every `.btn-outline-{role}` rule: the `--bs-btn-active-bg` row.
- `link`: every `.link-{role}:hover` and `:focus` row, `color` and `text-decoration-color`.
- `text`: the `color` row of `.text-bg-primary`, `.text-bg-info`, and `.text-bg-warning`.
- Additions: `theme | :root { color-scheme } | — | declaration`.

Prose changed in these guide sections:

- § Color modes: the root scheme and the `light-dark()` paragraph.
- § Semantic roles: the triplet as the rule's input.
- § Button states and bindings: the `--vn-state-mixer` alias cell, the base-class override cells, the
  filled-role paragraph, and the retune obligation.
- § Color utilities: the pair paragraph, the proof sentences, and the departure bullets.

The `link`, `text`, and Additions tables re-pad under the formatter because their widest cells grew. Expect
three-way merges there.

The shared patch also changes `tests/setupStyles.ts`:

- It adds the `BUTTON_LABEL_CASES` table.
- It drops `BUTTON_CONTRAST_FLOOR_CASES` and `BUTTON_CONTRAST_RATIO_CASES`.
- It re-reads the `BUTTON_FILLED_CASES` rows whose direction changed: the dark rows of the secondary,
  tertiary, success, info, warning, danger, and `light` roles, and the light row of the `dark` role.
- It adds a `step` field to the `BUTTON_BARE_VALUES` table.

`tests/setupStyles.test.ts` gets the export list edit and a table proof. `git apply --check` passes on
`ac74459` for `lc-shared.patch`.

## Files outside the owned set that the change makes false

1. `tests/src/styles/theme.test.ts`, "follows the selected mode with color-scheme, and leaves the scheme
   unset without the attribute" (THEME round 2). Edit: the two `.toBe('normal')` calls become
   `.toBe('light')`, and the title ends "and names the light scheme without the attribute"
   (`lc-theme-owned.patch`).
2. `tests/src/styles/tokens.test.ts`, "declares the canonical registry and the compatibility list at the
   document scope" (THEME round 2). Edit: permit the `--lightningcss-` names at the root, as the
   `index.test.ts` proof does (`lc-theme-owned.patch`):

   ```ts
   const lowered = declared.filter((name) => name.startsWith('--lightningcss-'))
   expect(declared.length).toBe(canonical.length + compatible.length + lowered.length)
   ```

3. `tests/setup.ts`, the `UNDER_BAR` list, read by the "measures the composed contrast of every variant
   and state against its control" case in `tests/app/browser/integration.test.ts`. Both files are
   off-limits and unrun under the scoped-test decision. This edit is derived from the specimens in
   `app/browser/constants.ts` and is not measured: every dark specimen classed `btn btn-primary` takes the
   black label (8.12 at rest, 9.73 active). Remove `'dark|Anchor|rest'`, `'dark|Blocked|disabled'`,
   `'dark|Label|rest'`, `'dark|Large|rest'`, `'dark|Pressed|pressed'`, `'dark|Pressed|rest'`,
   `'dark|Primary|rest'`, `'dark|Selected|rest'`, `'dark|Small|rest'`, and `'dark|Toggle|rest'`, and keep the
   outline rows and `'light|Outline light|rest'`. `npm run test:journey` settles it.
4. `tests/app/browser/integration.test.ts` in the UTIL-FRAMES version, the case "drives a link of each link
   specimen to the pointer and to keyboard focus on its lifted specimen, and photographs each state".
   Its role-link assertion pins the resting paint.
   - `lc-journey-link.patch` is written against `/home/user/veneer-fu/tests/app/browser/integration.test.ts`
     as it stands, because the case does not exist at `ac74459`.
   - The patch imports the `measureLuminance` and `parseCSSColor` helpers. Each role link's driven
     `text-decoration-color` must equal its driven `color`, and the driven color's luminance must move
     from rest by sign `-1` in light and `+1` in dark (`VARIANT === DARK`).
   - Unrun.

## Gates

- In the worktree (`/home/user/veneer-lc`):
  - `npx oxfmt --config .oxfmtrc.json --check` over the owned files: exit 0, "All matched files use the
    correct format." (`lc-gate-1.log.txt`; `lc-gate-11.log.txt` repeats it for the `_mixins.scss` file
    once more, for a comment edit).
- In the scratch copy (`tmp/probe/lc-scratch`, the worktree with `lc-shared.patch` applied; `lc-gates.sh`):
  - The same `npx oxfmt --check` command plus `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and
    `guides/veneer.md`: exit 0, "All matched files use the correct format." (gates 2, 12, 15).
  - `npm run lint:check`: exit 0. The copy is initialized as a repository root, because the worktree's
    ignore file hides `tmp/`. As a control, a planted `any` in a scratch source file reddened
    `npx oxlint --config .oxlintrc.json --deny-warnings .` there (exit 1). That output was read in the
    session and not retained, and the plant is removed.
  - `npm run check`: exit 0.
  - `npm run build:src`: exit 0.
  - `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot` with the owned test
    files: exit 0, `Tests  225 passed (225)`.
  - `npm run test:setup`: exit 0, `Tests  303 passed (303)` (gate 7). The gate run in
    `lc-gates-run-1.log.txt` timed out once in `tests/setupServer.test.ts` ("records and reads official
    control state…", 10100 ms), a file this unit does not touch. That is a timing observation.
  - `npm run test:conformance`: exit 0, `Tests  26 passed (26)` (gates 8, 13, 16).
  - `npm run test:guides`: exit 0, `Tests  20 passed (20)` (gates 9, 14, 17).
  - Styles acceptance reading, `npm run test:src:styles`, the whole styles project run once
    (`lc-styles-final.log.txt`): exit 1, `Tests  2 failed | 1407 passed (1409)`. The red cases are the
    THEME-owned cases in § Files outside the owned set, and no other.
- In the worktree without the shared patch, `npm run check` exits 2. Every error names
  `BUTTON_LABEL_CASES` or `BUTTON_BARE_VALUES.step`, which only the shared patch supplies (gate 10).

## Recorded choices and observations

- Names:
  - The mode pair function is `scheme`, and the per-role helpers are `label` and `mixer`.
  - The `_tokens.scss` partial adds the `$triplets` and `$endpoints` maps beside the `$channels` map,
    the `$candidates` map, and the `$extremes` list.
  - The rule fixture is `contrast.scss`.
  - The tooltip proof is an added case.
- The rule proof reads the release's pick from the `TEXT_BG_CASES` table. `tests/setupStyles.test.ts`
  binds that table to the inventory, and the conformance proof compares the installed `bootstrap.css`
  file with the digest the inventory records.
- The fixture's `@import` of `bootstrap/scss` prints Sass deprecation warnings during the styles run.
- `oxfmt` writes each triplet list one number per line.
- The guide's label prose has no gate comparing it to the `BUTTON_LABEL_CASES` table. `tests/guides.test.ts`
  is outside this unit.
- Deviation state: no stop. The root scheme is the recorded decision listed at the head of this report.

## Instruments

These instruments sit in `tmp/units/`, and each recreates the scratch copy it needs: `lc-sync.sh`,
`lc-run.sh`, `lc-red.sh`, `lc-mutate.py`, `lc-gates.sh`, `lc-compare.mjs`, and `lc-ledger.py`. Every probe
under `tmp/probe/` is deleted.
