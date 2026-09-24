# Unit THEME (`ct`) report: briefs `b-cross-ct-brief.md` and `b-cross-ct-brief-2.md`

The `theme` key ships, and V10, V12, and V13 are fixed. V11 is stopped: a token-only fix darkens every
bare and ghost button's dark hover to a nearly invisible veil, and a regression-free fix needs the
`_button.scss` partials, which are off-limits. The V12 and V13 fixes break test files that no list
in either brief names, and the `ct-unscoped.patch` file carries their exact edits. Every acceptance
gate exits 0 on the scratch copy, which is a `2bf1142` extract with the `ct-shared.patch` file, the
`ct-unscoped.patch` file, and the owned files applied.

## Deviations

**Stop, V11: the dark pressed primary fill.** The fix needs an off-limits partial, which the brief's
deviation contract names as a stop condition.

- Expected: a dark active tier that darkens the way the release darkens each variant, fixed in the
  `_tokens.scss` and `_theme.scss` partials.
- Found: the hover and active tiers of the filled and outline variants mix the `--vn-state-mixer`
  token, and the bare `button` rule and the bare `.btn` rule use the same token for their
  transparent-ground veil. The guide's `Source` cell records that mixer as `elements` (the bare
  hover and active endpoints). In dark the mixer is white, so the veil lightens a ghost button and
  the variants lighten too. No token change can give the variants a mixer the bare buttons do not
  share.
- Evidence: the `ct-v11-probe.test.ts.txt` instrument measured each dark button's hover and active
  fill composited over the dark canvas. The log is `ct-v11-probe.log.txt`, and the table gives the
  WCAG contrast of the hover and active fills against the resting fill.

  | Specimen            | White mixer: hover, active | Black mixer: hover, active |
  | ------------------- | -------------------------- | -------------------------- |
  | bare `button`       | 1.421, 2.029               | 1.028, 1.050               |
  | bare `.btn`         | 1.421, 2.029               | 1.028, 1.050               |
  | `.btn-primary`      | 1.101, 1.198 (lighter)     | 1.276, 1.587 (darker)      |
  | `.btn-dark`         | 1.458, 2.054 (lighter)     | 1.055, 1.099 (darker)      |
  | `.btn-light`        | 1.006, 1.012               | 1.314, 1.688               |

  The release declares no button variable under a dark selector. Its `--bs-btn-active-bg` value
  darkens the `primary` variant (`#0a58ca`), the `secondary` variant (`#565e64`), the `success`
  variant (`#146c43`), the `danger` variant (`#b02a37`), and the `light` variant (`#c6c7c8`). It
  lightens the `info` variant (`#3dd5f3`), the `warning` variant (`#ffcd39`), and the `dark`
  variant (`#4d5154`). Its `--bs-btn-hover-bg` value moves each variant the same way. With a black
  dark mixer, the `.btn-dark` class darkens where the release lightens it, as it does in light
  already.
- Not done: no V11 edit ships, and the dark `state-mixer` entry is unchanged.
- Hypothesis: the variant hover and active mixes need a mixer of their own in the `_button.scss`
  partials, separate from the bare-button endpoint. That mixer is black, or white for the `dark`
  variant, and it needs a registry token under the `src/core/**` directory or a per-variant literal
  pair.

**Unscoped files.** The V12 and V13 fixes make these test files false, and neither brief lists
them. The `ct-unscoped.patch` file carries the exact edits. The `git apply --check` command passes
on the worktree for that patch, and every gate ran with it applied.

- `tests/src/styles/components/button.test.ts`: the `.btn-link` hover color is pinned in the case
  body as a literal, the old 80% black mix. The edit writes the 65% reading.
- `tests/src/styles/elements/a.test.ts`: the comment says the hover is "its sRGB black hover mix".
  The edit describes the hover moving toward black in light and toward white in dark.
- `tests/src/styles/components/alert.test.ts`: the contextual-role case first requires every other
  role's alias to resolve apart from this one. The release gives the `light` and `dark` roles one
  text emphasis in light mode (`#495057`), so that check was false. The edit exempts a pair the
  release itself writes alike, derived from the `THEME_GRAY_TIERS` table. The retune step in the
  same case still separates that routing.

**The `retuned` walk sits in the tokens and theme partials.** Each scope that includes the
`theme-tokens` mixin walks the `$retuned` map after it: the tokens partial's `:root` block and the
theme partial's mode scope. The styles rule moves a pattern that appears in at least two partials
into the `_mixins.scss` partial, which is off-limits here. The walk belongs inside the
`theme-tokens` mixin. A single emission from the theme partial into the `:root` selector is not an
option, because the minifier merges that block with the identical light block into the
`:root,[data-bs-theme=light]` selector list, and the scope readers stop matching the `:root`
selector.

**Scope note.** The family record gives THEME the breakpoint alias case (X8), and neither brief
names it. It is not carried.

## Release values and the values the cascade resolves

The release values come from `node_modules/bootstrap/dist/css/bootstrap.css`. The
`tests/setupStyles.test.ts` proof reads the `THEME_SECONDARY_CASE`, `THEME_LINK_CASES`, and
`THEME_GRAY_TIERS` tables back from that stylesheet through the `extractBootstrapVariables` reader.

**V10, the dark secondary role.** The release declares the `--bs-secondary` variable, `#6c757d`, at
its document scope alone, and its dark scope declares none, so a dark island paints `#6c757d` over
the dark `--bs-body-bg` value `#212529`. The dark scope's `--vn-color-secondary-base` token is
`var(--vn-gray-600)`, which resolves to `rgb(108, 117, 125)`, with the `108, 117, 125` triplet. The
light scope and the `:root` selector keep Elements' slate, `oklch(0.446 0.043 257.281)`. The mode scopes also
declare the `--bs-secondary` and `--bs-secondary-rgb` aliases, which the `THEME_DARK_ADDITIONS`
constant lists. The secondary label against the dark canvas measures 2.33 to 1 before the fix and
3.77 to 1 after it, where the release pair measures 3.29 to 1. These figures come from the
sRGB triplets through the `ct-color.mjs.txt` instrument, not from a browser reading. The browser proof asserts only
that Veneer's contrast is at least the release's. The re-read `BUTTON_CONTRAST_RATIO_CASES` row
gives white text on the filled dark `.btn-secondary` fill a contrast of 4.689 at rest, where the
slate gave 7.564.

**V11, the dark pressed primary.** Stopped; § Deviations gives the release values and the
measurements.

**V12, the link hover.** The release carries its hover 20% toward black in light (`#0d6efd` to
`#0a58ca`, a contrast step of 1.4305) and 20% toward white in dark (`#6ea8fe` to `#8bb9fe`, a step of
1.2039). The `link-hover` entry is `color-mix(in srgb, var(--vn-link-base) 65%, black)` in light and
`color-mix(in srgb, var(--vn-link-base) 65%, white)` in dark, with the triplets `8, 35, 112` and
`141, 210, 244`. The browser resolves the light hover to `color(srgb 0.0331634 0.138386 0.437272)`
and the dark hover to `color(srgb 0.552338 0.821735 0.955544)`. Before the fix, the light step read
1.2396674259830418 in the red run and the dark hover darkened. After it, the triplets give a light
step of 1.4408 and a dark step of 1.3255 (the `ct-color.mjs.txt` instrument). A 35% step is the smallest 5% step at
which the light hover reaches the release's own step.

**V13, the `light` and `dark` role tiers (brief 2).** The tokens resolve to the release values in each
mode. Every tier is a gray step except the `light` subtle tier in light, `#fcfcfd`, and the `dark`
subtle tier in dark, `#1a1d20`. No gray token holds either value, so each one is a literal in the
`_tokens.scss` partial, with a comment naming the release's derivation.

| Tier | Light mode | Dark mode |
| --- | --- | --- |
| `--vn-color-light-emphasis` | `var(--vn-gray-700)`, `#495057` | `var(--vn-gray-100)`, `#f8f9fa` |
| `--vn-color-light-subtle` | `#fcfcfd` (no gray token) | `var(--vn-gray-800)`, `#343a40` |
| `--vn-color-light-border` | `var(--vn-gray-200)`, `#e9ecef` | `var(--vn-gray-700)`, `#495057` |
| `--vn-color-dark-emphasis` | `var(--vn-gray-700)`, `#495057` | `var(--vn-gray-300)`, `#dee2e6` |
| `--vn-color-dark-subtle` | `var(--vn-gray-400)`, `#ced4da` | `#1a1d20` (no gray token) |
| `--vn-color-dark-border` | `var(--vn-gray-500)`, `#adb5bd` | `var(--vn-gray-800)`, `#343a40` |

The alert text-to-fill contrast, read by the `readContrast` function in the `ct-v13-probe.test.ts.txt` instrument, moved as
follows. The "before" readings are in `ct-v13-before.log.txt` and the "after" readings are in
`ct-v13-after.log.txt`. Every "after" paint is the release's pair.

| Alert | Mode | Before | After |
| --- | --- | --- | --- |
| `alert-light` | light | 2.215 | 7.975 |
| `alert-dark` | light | 12.445 | 5.472 |
| `alert-light` | dark | 11.242 | 10.915 |
| `alert-dark` | dark | 2.467 | 13.000 |

## The `theme` key (X1, X2, X3, X11, X12)

- **X2 and X1.** The `theme` key joins the `listed` literal with a `theme | selector | … | — |
  shipped` row and no variable row. Its Obligation cell names the partials that write each record
  group. The presence gate passes with every recorded theme selector present. The `#### theme`
  table records every measured departure. Its `dropped` rows are the mode-independent names the
  release repeats in its light scope, and its lead sentence states that a light island inherits each
  of them from the `:root` selector. The dark component rules match the release and carry no row.
  The conformance case "measures the dark component rules under the theme key, and leaves them
  unmeasured while it is withheld" plants `none` on each dark component rule's recorded property. It
  reads the planted rows as theme departures with the key shipped and reads nothing with the key
  withheld. The Additions table gains the theme rows and the rewritten X4 reboot `:root` Reason.
- **X3.** The `collectAdditions` function takes a `registry` parameter and treats a registry name as
  recorded. The `collectLedger` function passes the `TOKEN_NAMES` registry by default. The plant
  `@layer theme { :root { --vn-palette-blue: #0d6efd; --vn-planted: 0 } }` yields only
  `theme | --vn-planted | — | property`, and an empty registry yields the canonical name and the planted name.
- **X11.** The `ColorModeSection` class renders the `Color modes` region from the `COLOR_MODE_COPY`
  and `COLOR_MODE_SPECIMENS` constants. The `Nested islands` specimen is a light surface holding a
  dark island that holds a nested light island. Each surface carries body text, a button, a select,
  a switch, a navbar toggler, and an accordion button, and has no id and no inline style. The
  capture registry adds a `nested-islands` row in the `CASCADE_KEYS` constant. The row names the
  dark island, `.bg-body[data-bs-theme='dark']`, and reads its `color-scheme` property, so the
  journey places it as an element frame over the lifted specimen, as the page-frame note requires.
  The region mounts last, after the Navbar region.
- **X12, the measurement.** The `collectValueGaps` property fallback was instrumented in the
  scratch copy with the `ct-x12-instrument.diff.txt` edit, then restored. With the `theme` key shipped, the
  shipped cascade's walk reached no fallback reading at all, so no reading reached a theme site
  (`ct-x12.json.txt`, an empty `reached` list). The reading was taken before the brief-2 row, which
  changes token values inside existing theme rules and adds no selector. The control plants
  `[data-bs-theme=dark] { --bs-carousel-indicator-active-bg: #111 }` and walks the `carousel` and
  `theme` keys. That walk records one fallback reading, and the existing claim check refuses it with
  `Components carousel and theme both claim [data-bs-theme=dark] | — | --bs-carousel-indicator-active-bg`
  (`ct-x12c.json.txt`). No collision was measured, and the existing check already raises the
  refusal message the verdict names, so no guard was added.

## Coverage matrix

Each proof and the mutation that reddens it. Each row names the mutation's failing cases, and the
full failing names are in `ct-mutations.log.txt`. That log records the final files; the first run
against the files before brief 2 is in `ct-mutations-round-1.log.txt`.

| Proof (file › case) | Mutation (site) | Red run (exit, summary) |
| --- | --- | --- |
| `theme.test.ts` › paints the secondary role in a dark island … at no less contrast; › resolves every role tier … over nested modes | M1: the dark `secondary` and `secondary-rgb` entries reverted to the slate (`_tokens.scss`) | 1, `Tests  2 failed \| 11 passed (13)` |
| `theme.test.ts` › moves the 'dark' link on hover the way the release does | M3: the dark hover mixed toward black (`_tokens.scss`) | 1, `Tests  1 failed \| 12 passed (13)` |
| `theme.test.ts` › moves the 'light' link on hover the way the release does | M4: the light hover back to the 80% step (`_tokens.scss`) | 1, `Tests  1 failed \| 12 passed (13)` |
| `theme.test.ts` › resolves in a light island nested in a dark one every compatibility name the light scope leaves to the document scope | M5: the dark scope declares `--bs-border-radius: 0` (`_theme.scss`) | 1, `Tests  1 failed \| 12 passed (13)` |
| `setupServer.test.ts` › records a name the token registry carries, and names the planted name beside it | M6: the registry checks removed from `collectAdditions` (`setupServer.ts`) | 1, `Tests  1 failed \| 301 passed (302)` |
| `conformance.test.ts` › carries every shipped component selector…; › reports an omitted dark component rule…; › measures the dark component rules under the theme key…; › names no addition…; › names no departure… | M7: the `theme` compatibility row removed (`guides/veneer.md`) | 1, `Tests  5 failed \| 21 passed (26)` |
| `theme.test.ts` › resolves each light and dark role tier to the value the release gives it; › reads the light and dark alerts in dark mode… | M8: the `dark` role's entries removed from `$retuned`, so its tiers return to the mix (`_tokens.scss`) | 1, `Tests  2 failed \| 11 passed (13)` |
| `ColorModeSection.test.ts` › nests a dark island…; › resolves each surface to its own mode… | S1: the dark island's attribute dropped (`constants.ts`) | 1, `Tests  2 failed \| 2 passed (4)` |
| `ColorModeSection.test.ts` › nests a dark island…; › resolves each surface to its own mode… | S2: the nested island's attribute dropped (`constants.ts`) | 1, `Tests  2 failed \| 2 passed (4)` |
| `ColorModeSection.test.ts` › nests a dark island… | S3: the nested island's toggler dropped (`constants.ts`) | 1, `Tests  1 failed \| 3 passed (4)` |
| `index.test.ts` › exports the showcase surface…; the `ColorModeSection.test.ts` file | S4: the section's barrel row removed (`index.ts`) | 1, `Tests  1 failed \| 4 passed (5)` |

The same log closes with the control runs. They cover the restored files: the build exits 0, the
theme proof reads `Tests  13 passed (13)`, the `npm run test:setup` command reads
`Tests  302 passed (302)`, the `npm run test:conformance` command reads `Tests  26 passed (26)`, and the section, showcase, and index
proofs read `Tests  9 passed (9)`. Every mutated file's restored digest matched its original.

Timing observations follow. In the first mutation run, the M6 run also timed out the Playwright
oracle case "records and reads official control state…" at its 10100 ms budget, and the in-script
controls of the `npm run test:setup` and `npm run test:conformance` commands failed; the
five-minute load average read 13.56 when the re-run started. Re-run alone, M6 reddened the named case alone (`ct-mutation-M6-registry-rule-2.log.txt`),
and the setup and conformance controls read green (`ct-control-setup.log.txt`, `ct-control-conformance.log.txt`). The
final mutation run shows none of these failures.

## Failing-first runs

Every added case ran red before the code it proves existed.

- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/theme.test.ts`,
  run on the scratch copy with the V10 and V12 cases and before the token edits: exit 1,
  `Tests  4 failed | 6 passed (10)`. The failing cases are the role tier case, the secondary case,
  and the light and dark link cases (`ct-red-theme.log.txt`). After the fix, the same command reads `Tests  10
  passed (10)` (`ct-fix-theme-1.log.txt`). The nested-island case for the dropped names passed
  from the start, because it proves a claim the cascade already met, and M5 is its red run.
- The same command with the V13 cases, before the V13 token edits: exit 1,
  `Tests  3 failed | 10 passed (13)`. The failing cases are the tier case and the light-mode and dark-mode alert cases
  (`ct-v13-red-theme.log.txt`). After the fix: `Tests  13 passed (13)`.
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup -t "token registry"`,
  run before the X3 rule: exit 1, `Tests  1 failed | 2 passed | 297 skipped (300)`, failing on
  "records a name the token registry carries…" (`ct-red-x3.log.txt`). The whole-project form of
  the same red is M6: `npm run test:setup`, `Tests  1 failed | 301 passed (302)`, and
  `Tests  302 passed (302)` with the rule in place.
- The conformance, section, and index cases have their red runs as M7 and S1 to S4.

## Gates

The `ct-gates.sh` script ran every command. Its record is `ct-gates.log.txt`, and each full log is
`ct-gate-<n>.log.txt`.

| # | Where | Command | Exit | Result line |
| --- | --- | --- | --- | --- |
| 1 | worktree | `npx oxfmt --config .oxfmtrc.json --check src/styles/_tokens.scss src/styles/_theme.scss tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/setupServer.ts tests/setupServer.test.ts app/browser/sections/ColorModeSection.ts tests/app/browser/sections/ColorModeSection.test.ts` | 0 | `Finished in 212ms on 8 files using 4 threads.` |
| 2 | worktree | `npm run lint:check` | 0 | none; oxlint prints nothing on a clean run |
| 3 | scratch copy | `npm run format:check` | 0 | `Finished in 19674ms on 463 files using 4 threads.` |
| 4 | scratch copy | `npm run lint:check` | 0 | none |
| 5 | scratch copy | `npm run check` | 0 | none; `tsc` and `vue-tsc` print nothing when clean |
| 6 | worktree | `npm run build:src` | 0 | `✓ built in 3.21s` |
| 7 | scratch copy | `npm run build:src` | 0 | `✓ built in 2.42s` |
| 8 | scratch copy | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts` | 0 | `Tests  44 passed (44)` |
| 9 | scratch copy | `npm run test:setup` | 0 | `Tests  302 passed (302)` |
| 10 | scratch copy | `npm run test:conformance` | 0 | `Tests  26 passed (26)` |
| 11 | scratch copy | `npm run test:guides` | 0 | `Tests  19 passed (19)` |
| 12 | scratch copy | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ColorModeSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | 0 | `Tests  9 passed (9)` |
| 13 | scratch copy (observation) | `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` |
| 14 | scratch copy (observation) | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot` | 0 | `Tests  1357 passed (1357)` |

These conditions affect how to read the gates:

- The scratch copy sat at `tmp/probe/ct-copy`. It was a `git archive 2bf1142` extract with a
  hard-linked `node_modules` directory and an empty `.git` directory, which makes the copy its own
  ignore root. A planted `any` and `debugger` in a copy-only file made the `npm run lint:check` command exit 1
  (`ct-lint-plant.log.txt`), so the linter can fail on the copy. The plant was removed.
- A second fresh extract, with the `ct-shared.patch` and `ct-unscoped.patch` files applied through
  `patch -p1` and the worktree's owned files copied in, was identical to the validated copy (`diff -rq`,
  excluding `node_modules`, `dist`, `tmp`, and `.git`). The `git apply --check` command passes on
  the worktree for each patch. The copies are deleted.
- A rerun of the `ct-patches.sh` script after the copies were deleted emptied the shared and unscoped patch files.
  The `ct-rebuild.py` replay rebuilt the copy, and the regenerated patches matched the validated
  ones byte for byte (SHA-256 `04ad9d29…142f3b` and `58e67ecb…651667`). The replay then applies a
  further edit, the `CALIBRATED_TIERS` remark that the brief-2 row made false. The gates in the
  preceding table ran after that edit. The mutation runs ran before it, and the files they read
  differ from the final files only in that comment. The `ct-patches.sh` script refuses to run while
  either tree is missing.
- The owned proofs run in the scratch copy only, because they import the `THEME_SECONDARY_CASE`,
  `THEME_LINK_CASES`, and `THEME_GRAY_TIERS` tables that the `ct-shared.patch` file adds.
- The journey, `npm run test:service`, and the capture runs are the Orchestrator's, and no run here
  took them.

## Touched files

The unit wrote these owned files in the worktree:

- `src/styles/_tokens.scss`: the `secondary`, `secondary-rgb`, and `light`/`dark` tier entries in
  the `$light` and `$dark` maps; the 65% link hover, toward black in light and toward white in dark,
  with the recomputed triplets; the `$retuned` map; and the `:root` walk of that map.
- `src/styles/_theme.scss`: the mode scopes written from one `@each` over the light and dark modes, each walking
  `$retuned` after the closure and declaring the `--bs-secondary` and `--bs-secondary-rgb` aliases.
- `tests/src/styles/theme.test.ts`: the V10, V12, V13, and dropped-names cases, and the role tier
  case's retuned roles.
- `tests/setupServer.ts`: the `registry` parameter of `collectAdditions` and `collectLedger`, and the
  rewritten `collectAdditions` remark. The `scanCompatibilityPresence` TSDoc was read, and no
  sentence there reads false.
- `tests/setupServer.test.ts`: the registry plant case; the `[]` registry on the planted-world
  `collectAdditions` calls; and `theme` in the Proof-dash set.
- `app/browser/sections/ColorModeSection.ts`: the section class.
- `tests/app/browser/sections/ColorModeSection.test.ts`: the section proof.

The `tests/src/styles/tokens.test.ts` proof needs no edit: the brief's rows make none of its cases false.

The `ct-shared.patch` file carries these edits against `2bf1142`:

- `tests/conformance.test.ts`: `theme` in the `listed` literal; the omitted dark component rule
  presence case; and the dark component rules' before-and-after plant.
- `tests/setupStyles.ts`: the `THEME_SECONDARY_CASE`, `THEME_LINK_CASES`, and `THEME_GRAY_TIERS`
  tables; `--bs-secondary` and `--bs-secondary-rgb` in `THEME_DARK_ADDITIONS`; the dark secondary
  rows removed from `CALIBRATED_TIERS`, with its remark rewritten for the release's secondary fill
  and the gray-step `light` and `dark` tiers; and the dark secondary rows of `BUTTON_FILLED_CASES`
  and `BUTTON_CONTRAST_RATIO_CASES` and the `TEXT_A_CASES` hovers re-read.
- `tests/setupStyles.test.ts`: the added tables in the export list, and their read-back cases.
- `tests/setup.ts`: the `Nested islands` subject, its `CASCADE_KEYS` row, and its remark paragraph.
  The `tests/setup.test.ts` proof needs no edit.
- `app/browser/constants.ts`, `app/browser/Showcase.ts`, and `app/browser/index.ts`: the constants,
  the section after the Navbar region, and the barrel row.
- `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, and
  `tests/app/browser/integration.test.ts`: the region, the exports, and the declared specimen list.
- `guides/veneer.md`: the `### Color modes` section; the secondary role row and its sentence; the
  `light` and `dark` roles moved after the Tier table, with their tier table (V13); the link hover
  row and paragraph; the retained-variable paragraphs; the `#### theme` table; the theme Additions
  rows and the reboot `:root` Reason (X4); the canonical-token and carousel sentences in
  § Outside the ledger; the `theme` compatibility row; the § Showcase paragraph; and the § Tests
  link. The guide edits are scripted in `ct-guide.py` and `ct-guide-2.py`, and the file is then
  formatted with the `oxfmt` formatter scoped to it.

## Diffstat

- Owned (`ct.diff`, SHA-256 `00ee59fd…35133`): by `git diff --stat`, `_tokens.scss` has 55 changed
  lines, `_theme.scss` 24, `theme.test.ts` 182, `setupServer.ts` 31, and `setupServer.test.ts` 28,
  for 288 insertions and 32 deletions. The added `ColorModeSection.ts` file has 20 lines and the
  added `ColorModeSection.test.ts` file has 153.
- Shared (`ct-shared.patch`, SHA-256 `45cf7a0b…4bab53`): 827 insertions and 217 deletions by
  `git apply --stat`. That is `guides/veneer.md` with 792 changed lines, most of them the
  `#### theme` table and the Additions table realigned around the wider theme rows,
  `tests/setupStyles.ts` 96, `tests/setupStyles.test.ts` 62, `tests/conformance.test.ts` 43,
  `app/browser/constants.ts` 27, `tests/setup.ts` 13, and the app files 1 to 3 each.
- Unscoped (`ct-unscoped.patch`, SHA-256 `58e67ecb…651667`): 27 insertions and 8 deletions.
- `ct-status.txt`: the owned tracked files modified, the owned section files untracked, and
  nothing else.

## Evidence files

Every file is retained under `.orkestrel/veneer/units/`: the diff, status, and patches beside the report, and every other record under `ct-instruments/` (the intermediate whole-suite verbose logs are dropped; the gate run `ct-gate-14.log.txt` stays).

- The patches and the diff: `ct.diff`, `ct-status.txt`, `ct-shared.patch`, and `ct-unscoped.patch`.
- The mutation log: `ct-mutations.log.txt` (SHA-256 `7d1b77b2…ca675c`) and
  `ct-mutations-round-1.log.txt`. The instruments are `ct-mutations-4.sh`, `ct-mutations.sh`,
  `ct-mutations-2.sh`, and `ct-mutate.py`.
- The gates: `ct-gates.sh`, `ct-gates.log.txt`, and `ct-gate-<n>.log.txt`.
- The ledger: `ct-ledger-print.sh`, `ct-ledger-print.txt`, `ct-ledger-print-summary.txt`,
  `ct-ledger.test.ts.txt`, and `ct-ledger.json.txt`.
- X12: `ct-x12.test.ts.txt`, `ct-x12c.test.ts.txt`, `ct-x12-instrument.diff.txt`,
  `ct-x12.json.txt`, and `ct-x12c.json.txt`.
- V11 and V13 probes: `ct-v11-probe.test.ts.txt`, `ct-v11-probe.log.txt`,
  `ct-v13-probe.test.ts.txt`, `ct-v13-before.log.txt`, and `ct-v13-after.log.txt`.
- The guide scripts: `ct-guide.py` and `ct-guide-2.py`. The replay script `ct-rebuild.py` writes
  every shared and unscoped edit onto a fresh `2bf1142` extract, and its result with the owned files
  is identical to the validated copy.
- The first gate run, against the files before the `CALIBRATED_TIERS` remark edit:
  `ct-gates-round-1.log.txt` and `ct-gate-round-1-<n>.log.txt`.
- The contrast arithmetic: `ct-color.mjs.txt`.
- The failing-first logs: `ct-red-theme.log.txt`, `ct-v13-red-theme.log.txt`, and
  `ct-red-x3.log.txt`.

The `tmp/probe/` directory holds nothing the unit created.

## Ledger rows as the gate printed them

The `ct-ledger-print.sh` script removed every `theme` row from the scratch copy's guide, ran
`npm run test:conformance` (exit 1, `Tests  4 failed | 22 passed (26)`), and restored the guide
byte for byte. The rows follow, taken from the failures of the departure and addition recording
cases, the departures first. They match the `collectLedger` dump in `ct-ledger.json.txt`
row for row.

```text
theme | :root | --bs-blue | — | #0d6efd | var(--vn-palette-blue) | tokenized
theme | :root | --bs-indigo | — | #6610f2 | var(--vn-palette-indigo) | tokenized
theme | :root | --bs-purple | — | #6f42c1 | var(--vn-palette-purple) | tokenized
theme | :root | --bs-pink | — | #d63384 | var(--vn-palette-pink) | tokenized
theme | :root | --bs-red | — | #dc3545 | var(--vn-palette-red) | tokenized
theme | :root | --bs-orange | — | #fd7e14 | var(--vn-palette-orange) | tokenized
theme | :root | --bs-yellow | — | #ffc107 | var(--vn-palette-yellow) | tokenized
theme | :root | --bs-green | — | #198754 | var(--vn-palette-green) | tokenized
theme | :root | --bs-teal | — | #20c997 | var(--vn-palette-teal) | tokenized
theme | :root | --bs-cyan | — | #0dcaf0 | var(--vn-palette-cyan) | tokenized
theme | :root | --bs-black | — | #000 | var(--vn-palette-black-base) | tokenized
theme | :root | --bs-white | — | #fff | var(--vn-palette-white-base) | tokenized
theme | :root | --bs-gray | — | #6c757d | var(--vn-gray-600) | tokenized
theme | :root | --bs-gray-dark | — | #343a40 | var(--vn-gray-800) | tokenized
theme | :root | --bs-gray-100 | — | #f8f9fa | var(--vn-gray-100) | tokenized
theme | :root | --bs-gray-200 | — | #e9ecef | var(--vn-gray-200) | tokenized
theme | :root | --bs-gray-300 | — | #dee2e6 | var(--vn-gray-300) | tokenized
theme | :root | --bs-gray-400 | — | #ced4da | var(--vn-gray-400) | tokenized
theme | :root | --bs-gray-500 | — | #adb5bd | var(--vn-gray-500) | tokenized
theme | :root | --bs-gray-600 | — | #6c757d | var(--vn-gray-600) | tokenized
theme | :root | --bs-gray-700 | — | #495057 | var(--vn-gray-700) | tokenized
theme | :root | --bs-gray-800 | — | #343a40 | var(--vn-gray-800) | tokenized
theme | :root | --bs-gray-900 | — | #212529 | var(--vn-gray-900) | tokenized
theme | :root | --bs-primary | — | #0d6efd | var(--vn-color-primary-base) | tokenized
theme | :root | --bs-secondary | — | #6c757d | var(--vn-color-secondary-base) | tokenized
theme | :root | --bs-success | — | #198754 | var(--vn-color-success-base) | tokenized
theme | :root | --bs-info | — | #0dcaf0 | var(--vn-color-info-base) | tokenized
theme | :root | --bs-warning | — | #ffc107 | var(--vn-color-warning-base) | tokenized
theme | :root | --bs-danger | — | #dc3545 | var(--vn-color-danger-base) | tokenized
theme | :root | --bs-light | — | #f8f9fa | var(--vn-color-light-base) | tokenized
theme | :root | --bs-dark | — | #212529 | var(--vn-color-dark-base) | tokenized
theme | :root | --bs-primary-rgb | — | 13, 110, 253 | var(--vn-color-primary-rgb) | tokenized
theme | :root | --bs-secondary-rgb | — | 108, 117, 125 | var(--vn-color-secondary-rgb) | tokenized
theme | :root | --bs-success-rgb | — | 25, 135, 84 | var(--vn-color-success-rgb) | tokenized
theme | :root | --bs-info-rgb | — | 13, 202, 240 | var(--vn-color-info-rgb) | tokenized
theme | :root | --bs-warning-rgb | — | 255, 193, 7 | var(--vn-color-warning-rgb) | tokenized
theme | :root | --bs-danger-rgb | — | 220, 53, 69 | var(--vn-color-danger-rgb) | tokenized
theme | :root | --bs-light-rgb | — | 248, 249, 250 | var(--vn-color-light-rgb) | tokenized
theme | :root | --bs-dark-rgb | — | 33, 37, 41 | var(--vn-color-dark-rgb) | tokenized
theme | :root | --bs-primary-text-emphasis | — | #052c65 | var(--vn-color-primary-emphasis) | tokenized
theme | :root | --bs-secondary-text-emphasis | — | #2b2f32 | var(--vn-color-secondary-emphasis) | tokenized
theme | :root | --bs-success-text-emphasis | — | #0a3622 | var(--vn-color-success-emphasis) | tokenized
theme | :root | --bs-info-text-emphasis | — | #055160 | var(--vn-color-info-emphasis) | tokenized
theme | :root | --bs-warning-text-emphasis | — | #664d03 | var(--vn-color-warning-emphasis) | tokenized
theme | :root | --bs-danger-text-emphasis | — | #58151c | var(--vn-color-danger-emphasis) | tokenized
theme | :root | --bs-light-text-emphasis | — | #495057 | var(--vn-color-light-emphasis) | tokenized
theme | :root | --bs-dark-text-emphasis | — | #495057 | var(--vn-color-dark-emphasis) | tokenized
theme | :root | --bs-primary-bg-subtle | — | #cfe2ff | var(--vn-color-primary-subtle) | tokenized
theme | :root | --bs-secondary-bg-subtle | — | #e2e3e5 | var(--vn-color-secondary-subtle) | tokenized
theme | :root | --bs-success-bg-subtle | — | #d1e7dd | var(--vn-color-success-subtle) | tokenized
theme | :root | --bs-info-bg-subtle | — | #cff4fc | var(--vn-color-info-subtle) | tokenized
theme | :root | --bs-warning-bg-subtle | — | #fff3cd | var(--vn-color-warning-subtle) | tokenized
theme | :root | --bs-danger-bg-subtle | — | #f8d7da | var(--vn-color-danger-subtle) | tokenized
theme | :root | --bs-light-bg-subtle | — | #fcfcfd | var(--vn-color-light-subtle) | tokenized
theme | :root | --bs-dark-bg-subtle | — | #ced4da | var(--vn-color-dark-subtle) | tokenized
theme | :root | --bs-primary-border-subtle | — | #9ec5fe | var(--vn-color-primary-border) | tokenized
theme | :root | --bs-secondary-border-subtle | — | #c4c8cb | var(--vn-color-secondary-border) | tokenized
theme | :root | --bs-success-border-subtle | — | #a3cfbb | var(--vn-color-success-border) | tokenized
theme | :root | --bs-info-border-subtle | — | #9eeaf9 | var(--vn-color-info-border) | tokenized
theme | :root | --bs-warning-border-subtle | — | #ffe69c | var(--vn-color-warning-border) | tokenized
theme | :root | --bs-danger-border-subtle | — | #f1aeb5 | var(--vn-color-danger-border) | tokenized
theme | :root | --bs-light-border-subtle | — | #e9ecef | var(--vn-color-light-border) | tokenized
theme | :root | --bs-dark-border-subtle | — | #adb5bd | var(--vn-color-dark-border) | tokenized
theme | :root | --bs-white-rgb | — | 255, 255, 255 | var(--vn-palette-white-rgb) | tokenized
theme | :root | --bs-black-rgb | — | 0, 0, 0 | var(--vn-palette-black-rgb) | tokenized
theme | :root | --bs-font-sans-serif | — | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | var(--vn-font-sans) | tokenized
theme | :root | --bs-font-monospace | — | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | var(--vn-font-mono-base) | tokenized
theme | :root | --bs-gradient | — | linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0)) | var(--vn-surface-gradient) | tokenized
theme | :root | --bs-body-font-family | — | var(--bs-font-sans-serif) | var(--vn-font-sans) | tokenized
theme | :root | --bs-body-font-size | — | 1rem | var(--vn-size-2) | tokenized
theme | :root | --bs-body-font-weight | — | 400 | var(--vn-weight-body) | tokenized
theme | :root | --bs-body-line-height | — | 1.5 | var(--vn-line-body) | tokenized
theme | :root | --bs-body-color | — | #212529 | var(--vn-text-body-base) | tokenized
theme | :root | --bs-body-color-rgb | — | 33, 37, 41 | var(--vn-text-body-rgb) | tokenized
theme | :root | --bs-body-bg | — | #fff | var(--vn-surface-body-base) | tokenized
theme | :root | --bs-body-bg-rgb | — | 255, 255, 255 | var(--vn-surface-body-rgb) | tokenized
theme | :root | --bs-emphasis-color | — | #000 | var(--vn-text-emphasis-base) | tokenized
theme | :root | --bs-emphasis-color-rgb | — | 0, 0, 0 | var(--vn-text-emphasis-rgb) | tokenized
theme | :root | --bs-secondary-color | — | rgba(33, 37, 41, 0.75) | var(--vn-text-secondary) | tokenized
theme | :root | --bs-secondary-color-rgb | — | 33, 37, 41 | var(--vn-text-body-rgb) | tokenized
theme | :root | --bs-secondary-bg | — | #e9ecef | var(--vn-surface-secondary-base) | tokenized
theme | :root | --bs-secondary-bg-rgb | — | 233, 236, 239 | var(--vn-surface-secondary-rgb) | tokenized
theme | :root | --bs-tertiary-color | — | rgba(33, 37, 41, 0.5) | var(--vn-text-tertiary) | tokenized
theme | :root | --bs-tertiary-color-rgb | — | 33, 37, 41 | var(--vn-text-body-rgb) | tokenized
theme | :root | --bs-tertiary-bg | — | #f8f9fa | var(--vn-surface-tertiary-base) | tokenized
theme | :root | --bs-tertiary-bg-rgb | — | 248, 249, 250 | var(--vn-surface-tertiary-rgb) | tokenized
theme | :root | --bs-heading-color | — | inherit | var(--vn-text-heading, inherit) | tokenized
theme | :root | --bs-link-color | — | #0d6efd | var(--vn-link-base) | tokenized
theme | :root | --bs-link-color-rgb | — | 13, 110, 253 | var(--vn-link-rgb) | tokenized
theme | :root | --bs-link-decoration | — | underline | var(--vn-link-decoration) | tokenized
theme | :root | --bs-link-hover-color | — | #0a58ca | var(--vn-link-hover-base) | tokenized
theme | :root | --bs-link-hover-color-rgb | — | 10, 88, 202 | var(--vn-link-hover-rgb) | tokenized
theme | :root | --bs-code-color | — | #d63384 | var(--vn-text-code) | tokenized
theme | :root | --bs-highlight-color | — | #212529 | var(--vn-text-body-base) | tokenized
theme | :root | --bs-highlight-bg | — | #fff3cd | color-mix(in srgb, var(--vn-palette-white-base) 80%, var(--vn-color-warning-base)) | tokenized
theme | :root | --bs-border-width | — | 1px | var(--vn-border-width) | tokenized
theme | :root | --bs-border-style | — | solid | var(--vn-border-style) | tokenized
theme | :root | --bs-border-color | — | #dee2e6 | var(--vn-border-color) | tokenized
theme | :root | --bs-border-color-translucent | — | rgba(0, 0, 0, 0.175) | var(--vn-border-translucent) | tokenized
theme | :root | --bs-border-radius | — | 0.375rem | var(--vn-radius-base) | tokenized
theme | :root | --bs-border-radius-sm | — | 0.25rem | var(--vn-radius-small) | tokenized
theme | :root | --bs-border-radius-lg | — | 0.5rem | var(--vn-radius-large) | tokenized
theme | :root | --bs-border-radius-xl | — | 1rem | var(--vn-radius-xlarge) | tokenized
theme | :root | --bs-border-radius-xxl | — | 2rem | var(--vn-radius-xxlarge) | tokenized
theme | :root | --bs-border-radius-2xl | — | var(--bs-border-radius-xxl) | var(--vn-radius-xxlarge) | tokenized
theme | :root | --bs-border-radius-pill | — | 50rem | var(--vn-radius-pill) | tokenized
theme | :root | --bs-box-shadow | — | 0 0.5rem 1rem rgba(0, 0, 0, 0.15) | var(--vn-shadow-2) | tokenized
theme | :root | --bs-box-shadow-sm | — | 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) | var(--vn-shadow-1) | tokenized
theme | :root | --bs-box-shadow-lg | — | 0 1rem 3rem rgba(0, 0, 0, 0.175) | var(--vn-shadow-3) | tokenized
theme | :root | --bs-box-shadow-inset | — | inset 0 1px 2px rgba(0, 0, 0, 0.075) | var(--vn-shadow-inset) | tokenized
theme | :root | --bs-focus-ring-width | — | 0.25rem | var(--vn-focus-width) | tokenized
theme | :root | --bs-focus-ring-opacity | — | 0.25 | var(--vn-focus-opacity) | tokenized
theme | :root | --bs-focus-ring-color | — | rgba(13, 110, 253, 0.25) | var(--vn-focus-color) | tokenized
theme | :root | --bs-form-valid-color | — | #198754 | var(--vn-form-valid) | tokenized
theme | :root | --bs-form-valid-border-color | — | #198754 | var(--vn-form-valid) | tokenized
theme | :root | --bs-form-invalid-color | — | #dc3545 | var(--vn-form-invalid) | tokenized
theme | :root | --bs-form-invalid-border-color | — | #dc3545 | var(--vn-form-invalid) | tokenized
theme | [data-bs-theme=light] | --bs-blue | — | #0d6efd | — | dropped
theme | [data-bs-theme=light] | --bs-indigo | — | #6610f2 | — | dropped
theme | [data-bs-theme=light] | --bs-purple | — | #6f42c1 | — | dropped
theme | [data-bs-theme=light] | --bs-pink | — | #d63384 | — | dropped
theme | [data-bs-theme=light] | --bs-red | — | #dc3545 | — | dropped
theme | [data-bs-theme=light] | --bs-orange | — | #fd7e14 | — | dropped
theme | [data-bs-theme=light] | --bs-yellow | — | #ffc107 | — | dropped
theme | [data-bs-theme=light] | --bs-green | — | #198754 | — | dropped
theme | [data-bs-theme=light] | --bs-teal | — | #20c997 | — | dropped
theme | [data-bs-theme=light] | --bs-cyan | — | #0dcaf0 | — | dropped
theme | [data-bs-theme=light] | --bs-black | — | #000 | — | dropped
theme | [data-bs-theme=light] | --bs-white | — | #fff | — | dropped
theme | [data-bs-theme=light] | --bs-gray | — | #6c757d | — | dropped
theme | [data-bs-theme=light] | --bs-gray-dark | — | #343a40 | — | dropped
theme | [data-bs-theme=light] | --bs-gray-100 | — | #f8f9fa | — | dropped
theme | [data-bs-theme=light] | --bs-gray-200 | — | #e9ecef | — | dropped
theme | [data-bs-theme=light] | --bs-gray-300 | — | #dee2e6 | — | dropped
theme | [data-bs-theme=light] | --bs-gray-400 | — | #ced4da | — | dropped
theme | [data-bs-theme=light] | --bs-gray-500 | — | #adb5bd | — | dropped
theme | [data-bs-theme=light] | --bs-gray-600 | — | #6c757d | — | dropped
theme | [data-bs-theme=light] | --bs-gray-700 | — | #495057 | — | dropped
theme | [data-bs-theme=light] | --bs-gray-800 | — | #343a40 | — | dropped
theme | [data-bs-theme=light] | --bs-gray-900 | — | #212529 | — | dropped
theme | [data-bs-theme=light] | --bs-primary | — | #0d6efd | var(--vn-color-primary-base) | tokenized
theme | [data-bs-theme=light] | --bs-secondary | — | #6c757d | var(--vn-color-secondary-base) | tokenized
theme | [data-bs-theme=light] | --bs-success | — | #198754 | — | dropped
theme | [data-bs-theme=light] | --bs-info | — | #0dcaf0 | — | dropped
theme | [data-bs-theme=light] | --bs-warning | — | #ffc107 | — | dropped
theme | [data-bs-theme=light] | --bs-danger | — | #dc3545 | — | dropped
theme | [data-bs-theme=light] | --bs-light | — | #f8f9fa | — | dropped
theme | [data-bs-theme=light] | --bs-dark | — | #212529 | — | dropped
theme | [data-bs-theme=light] | --bs-primary-rgb | — | 13, 110, 253 | var(--vn-color-primary-rgb) | tokenized
theme | [data-bs-theme=light] | --bs-secondary-rgb | — | 108, 117, 125 | var(--vn-color-secondary-rgb) | tokenized
theme | [data-bs-theme=light] | --bs-success-rgb | — | 25, 135, 84 | — | dropped
theme | [data-bs-theme=light] | --bs-info-rgb | — | 13, 202, 240 | — | dropped
theme | [data-bs-theme=light] | --bs-warning-rgb | — | 255, 193, 7 | — | dropped
theme | [data-bs-theme=light] | --bs-danger-rgb | — | 220, 53, 69 | — | dropped
theme | [data-bs-theme=light] | --bs-light-rgb | — | 248, 249, 250 | — | dropped
theme | [data-bs-theme=light] | --bs-dark-rgb | — | 33, 37, 41 | — | dropped
theme | [data-bs-theme=light] | --bs-primary-text-emphasis | — | #052c65 | var(--vn-color-primary-emphasis) | tokenized
theme | [data-bs-theme=light] | --bs-secondary-text-emphasis | — | #2b2f32 | var(--vn-color-secondary-emphasis) | tokenized
theme | [data-bs-theme=light] | --bs-success-text-emphasis | — | #0a3622 | var(--vn-color-success-emphasis) | tokenized
theme | [data-bs-theme=light] | --bs-info-text-emphasis | — | #055160 | var(--vn-color-info-emphasis) | tokenized
theme | [data-bs-theme=light] | --bs-warning-text-emphasis | — | #664d03 | var(--vn-color-warning-emphasis) | tokenized
theme | [data-bs-theme=light] | --bs-danger-text-emphasis | — | #58151c | var(--vn-color-danger-emphasis) | tokenized
theme | [data-bs-theme=light] | --bs-light-text-emphasis | — | #495057 | var(--vn-color-light-emphasis) | tokenized
theme | [data-bs-theme=light] | --bs-dark-text-emphasis | — | #495057 | var(--vn-color-dark-emphasis) | tokenized
theme | [data-bs-theme=light] | --bs-primary-bg-subtle | — | #cfe2ff | var(--vn-color-primary-subtle) | tokenized
theme | [data-bs-theme=light] | --bs-secondary-bg-subtle | — | #e2e3e5 | var(--vn-color-secondary-subtle) | tokenized
theme | [data-bs-theme=light] | --bs-success-bg-subtle | — | #d1e7dd | var(--vn-color-success-subtle) | tokenized
theme | [data-bs-theme=light] | --bs-info-bg-subtle | — | #cff4fc | var(--vn-color-info-subtle) | tokenized
theme | [data-bs-theme=light] | --bs-warning-bg-subtle | — | #fff3cd | var(--vn-color-warning-subtle) | tokenized
theme | [data-bs-theme=light] | --bs-danger-bg-subtle | — | #f8d7da | var(--vn-color-danger-subtle) | tokenized
theme | [data-bs-theme=light] | --bs-light-bg-subtle | — | #fcfcfd | var(--vn-color-light-subtle) | tokenized
theme | [data-bs-theme=light] | --bs-dark-bg-subtle | — | #ced4da | var(--vn-color-dark-subtle) | tokenized
theme | [data-bs-theme=light] | --bs-primary-border-subtle | — | #9ec5fe | var(--vn-color-primary-border) | tokenized
theme | [data-bs-theme=light] | --bs-secondary-border-subtle | — | #c4c8cb | var(--vn-color-secondary-border) | tokenized
theme | [data-bs-theme=light] | --bs-success-border-subtle | — | #a3cfbb | var(--vn-color-success-border) | tokenized
theme | [data-bs-theme=light] | --bs-info-border-subtle | — | #9eeaf9 | var(--vn-color-info-border) | tokenized
theme | [data-bs-theme=light] | --bs-warning-border-subtle | — | #ffe69c | var(--vn-color-warning-border) | tokenized
theme | [data-bs-theme=light] | --bs-danger-border-subtle | — | #f1aeb5 | var(--vn-color-danger-border) | tokenized
theme | [data-bs-theme=light] | --bs-light-border-subtle | — | #e9ecef | var(--vn-color-light-border) | tokenized
theme | [data-bs-theme=light] | --bs-dark-border-subtle | — | #adb5bd | var(--vn-color-dark-border) | tokenized
theme | [data-bs-theme=light] | --bs-white-rgb | — | 255, 255, 255 | — | dropped
theme | [data-bs-theme=light] | --bs-black-rgb | — | 0, 0, 0 | — | dropped
theme | [data-bs-theme=light] | --bs-font-sans-serif | — | system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" | — | dropped
theme | [data-bs-theme=light] | --bs-font-monospace | — | SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace | — | dropped
theme | [data-bs-theme=light] | --bs-gradient | — | linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0)) | — | dropped
theme | [data-bs-theme=light] | --bs-body-font-family | — | var(--bs-font-sans-serif) | — | dropped
theme | [data-bs-theme=light] | --bs-body-font-size | — | 1rem | — | dropped
theme | [data-bs-theme=light] | --bs-body-font-weight | — | 400 | — | dropped
theme | [data-bs-theme=light] | --bs-body-line-height | — | 1.5 | — | dropped
theme | [data-bs-theme=light] | --bs-body-color | — | #212529 | var(--vn-text-body-base) | tokenized
theme | [data-bs-theme=light] | --bs-body-color-rgb | — | 33, 37, 41 | var(--vn-text-body-rgb) | tokenized
theme | [data-bs-theme=light] | --bs-body-bg | — | #fff | var(--vn-surface-body-base) | tokenized
theme | [data-bs-theme=light] | --bs-body-bg-rgb | — | 255, 255, 255 | var(--vn-surface-body-rgb) | tokenized
theme | [data-bs-theme=light] | --bs-emphasis-color | — | #000 | var(--vn-text-emphasis-base) | tokenized
theme | [data-bs-theme=light] | --bs-emphasis-color-rgb | — | 0, 0, 0 | var(--vn-text-emphasis-rgb) | tokenized
theme | [data-bs-theme=light] | --bs-secondary-color | — | rgba(33, 37, 41, 0.75) | var(--vn-text-secondary) | tokenized
theme | [data-bs-theme=light] | --bs-secondary-color-rgb | — | 33, 37, 41 | var(--vn-text-body-rgb) | tokenized
theme | [data-bs-theme=light] | --bs-secondary-bg | — | #e9ecef | var(--vn-surface-secondary-base) | tokenized
theme | [data-bs-theme=light] | --bs-secondary-bg-rgb | — | 233, 236, 239 | var(--vn-surface-secondary-rgb) | tokenized
theme | [data-bs-theme=light] | --bs-tertiary-color | — | rgba(33, 37, 41, 0.5) | var(--vn-text-tertiary) | tokenized
theme | [data-bs-theme=light] | --bs-tertiary-color-rgb | — | 33, 37, 41 | var(--vn-text-body-rgb) | tokenized
theme | [data-bs-theme=light] | --bs-tertiary-bg | — | #f8f9fa | var(--vn-surface-tertiary-base) | tokenized
theme | [data-bs-theme=light] | --bs-tertiary-bg-rgb | — | 248, 249, 250 | var(--vn-surface-tertiary-rgb) | tokenized
theme | [data-bs-theme=light] | --bs-heading-color | — | inherit | var(--vn-text-heading, inherit) | tokenized
theme | [data-bs-theme=light] | --bs-link-color | — | #0d6efd | var(--vn-link-base) | tokenized
theme | [data-bs-theme=light] | --bs-link-color-rgb | — | 13, 110, 253 | var(--vn-link-rgb) | tokenized
theme | [data-bs-theme=light] | --bs-link-decoration | — | underline | — | dropped
theme | [data-bs-theme=light] | --bs-link-hover-color | — | #0a58ca | var(--vn-link-hover-base) | tokenized
theme | [data-bs-theme=light] | --bs-link-hover-color-rgb | — | 10, 88, 202 | var(--vn-link-hover-rgb) | tokenized
theme | [data-bs-theme=light] | --bs-code-color | — | #d63384 | var(--vn-text-code) | tokenized
theme | [data-bs-theme=light] | --bs-highlight-color | — | #212529 | var(--vn-text-body-base) | tokenized
theme | [data-bs-theme=light] | --bs-highlight-bg | — | #fff3cd | color-mix(in srgb, var(--vn-palette-white-base) 80%, var(--vn-color-warning-base)) | tokenized
theme | [data-bs-theme=light] | --bs-border-width | — | 1px | — | dropped
theme | [data-bs-theme=light] | --bs-border-style | — | solid | — | dropped
theme | [data-bs-theme=light] | --bs-border-color | — | #dee2e6 | var(--vn-border-color) | tokenized
theme | [data-bs-theme=light] | --bs-border-color-translucent | — | rgba(0, 0, 0, 0.175) | var(--vn-border-translucent) | tokenized
theme | [data-bs-theme=light] | --bs-border-radius | — | 0.375rem | — | dropped
theme | [data-bs-theme=light] | --bs-border-radius-sm | — | 0.25rem | — | dropped
theme | [data-bs-theme=light] | --bs-border-radius-lg | — | 0.5rem | — | dropped
theme | [data-bs-theme=light] | --bs-border-radius-xl | — | 1rem | — | dropped
theme | [data-bs-theme=light] | --bs-border-radius-xxl | — | 2rem | — | dropped
theme | [data-bs-theme=light] | --bs-border-radius-2xl | — | var(--bs-border-radius-xxl) | — | dropped
theme | [data-bs-theme=light] | --bs-border-radius-pill | — | 50rem | — | dropped
theme | [data-bs-theme=light] | --bs-box-shadow | — | 0 0.5rem 1rem rgba(0, 0, 0, 0.15) | — | dropped
theme | [data-bs-theme=light] | --bs-box-shadow-sm | — | 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) | — | dropped
theme | [data-bs-theme=light] | --bs-box-shadow-lg | — | 0 1rem 3rem rgba(0, 0, 0, 0.175) | — | dropped
theme | [data-bs-theme=light] | --bs-box-shadow-inset | — | inset 0 1px 2px rgba(0, 0, 0, 0.075) | — | dropped
theme | [data-bs-theme=light] | --bs-focus-ring-width | — | 0.25rem | — | dropped
theme | [data-bs-theme=light] | --bs-focus-ring-opacity | — | 0.25 | — | dropped
theme | [data-bs-theme=light] | --bs-focus-ring-color | — | rgba(13, 110, 253, 0.25) | var(--vn-focus-color) | tokenized
theme | [data-bs-theme=light] | --bs-form-valid-color | — | #198754 | var(--vn-form-valid) | tokenized
theme | [data-bs-theme=light] | --bs-form-valid-border-color | — | #198754 | var(--vn-form-valid) | tokenized
theme | [data-bs-theme=light] | --bs-form-invalid-color | — | #dc3545 | var(--vn-form-invalid) | tokenized
theme | [data-bs-theme=light] | --bs-form-invalid-border-color | — | #dc3545 | var(--vn-form-invalid) | tokenized
theme | [data-bs-theme=dark] | --bs-body-color | — | #dee2e6 | var(--vn-text-body-base) | tokenized
theme | [data-bs-theme=dark] | --bs-body-color-rgb | — | 222, 226, 230 | var(--vn-text-body-rgb) | tokenized
theme | [data-bs-theme=dark] | --bs-body-bg | — | #212529 | var(--vn-surface-body-base) | tokenized
theme | [data-bs-theme=dark] | --bs-body-bg-rgb | — | 33, 37, 41 | var(--vn-surface-body-rgb) | tokenized
theme | [data-bs-theme=dark] | --bs-emphasis-color | — | #fff | var(--vn-text-emphasis-base) | tokenized
theme | [data-bs-theme=dark] | --bs-emphasis-color-rgb | — | 255, 255, 255 | var(--vn-text-emphasis-rgb) | tokenized
theme | [data-bs-theme=dark] | --bs-secondary-color | — | rgba(222, 226, 230, 0.75) | var(--vn-text-secondary) | tokenized
theme | [data-bs-theme=dark] | --bs-secondary-color-rgb | — | 222, 226, 230 | var(--vn-text-body-rgb) | tokenized
theme | [data-bs-theme=dark] | --bs-secondary-bg | — | #343a40 | var(--vn-surface-secondary-base) | tokenized
theme | [data-bs-theme=dark] | --bs-secondary-bg-rgb | — | 52, 58, 64 | var(--vn-surface-secondary-rgb) | tokenized
theme | [data-bs-theme=dark] | --bs-tertiary-color | — | rgba(222, 226, 230, 0.5) | var(--vn-text-tertiary) | tokenized
theme | [data-bs-theme=dark] | --bs-tertiary-color-rgb | — | 222, 226, 230 | var(--vn-text-body-rgb) | tokenized
theme | [data-bs-theme=dark] | --bs-tertiary-bg | — | #2b3035 | var(--vn-surface-tertiary-base) | tokenized
theme | [data-bs-theme=dark] | --bs-tertiary-bg-rgb | — | 43, 48, 53 | var(--vn-surface-tertiary-rgb) | tokenized
theme | [data-bs-theme=dark] | --bs-primary-text-emphasis | — | #6ea8fe | var(--vn-color-primary-emphasis) | tokenized
theme | [data-bs-theme=dark] | --bs-secondary-text-emphasis | — | #a7acb1 | var(--vn-color-secondary-emphasis) | tokenized
theme | [data-bs-theme=dark] | --bs-success-text-emphasis | — | #75b798 | var(--vn-color-success-emphasis) | tokenized
theme | [data-bs-theme=dark] | --bs-info-text-emphasis | — | #6edff6 | var(--vn-color-info-emphasis) | tokenized
theme | [data-bs-theme=dark] | --bs-warning-text-emphasis | — | #ffda6a | var(--vn-color-warning-emphasis) | tokenized
theme | [data-bs-theme=dark] | --bs-danger-text-emphasis | — | #ea868f | var(--vn-color-danger-emphasis) | tokenized
theme | [data-bs-theme=dark] | --bs-light-text-emphasis | — | #f8f9fa | var(--vn-color-light-emphasis) | tokenized
theme | [data-bs-theme=dark] | --bs-dark-text-emphasis | — | #dee2e6 | var(--vn-color-dark-emphasis) | tokenized
theme | [data-bs-theme=dark] | --bs-primary-bg-subtle | — | #031633 | var(--vn-color-primary-subtle) | tokenized
theme | [data-bs-theme=dark] | --bs-secondary-bg-subtle | — | #161719 | var(--vn-color-secondary-subtle) | tokenized
theme | [data-bs-theme=dark] | --bs-success-bg-subtle | — | #051b11 | var(--vn-color-success-subtle) | tokenized
theme | [data-bs-theme=dark] | --bs-info-bg-subtle | — | #032830 | var(--vn-color-info-subtle) | tokenized
theme | [data-bs-theme=dark] | --bs-warning-bg-subtle | — | #332701 | var(--vn-color-warning-subtle) | tokenized
theme | [data-bs-theme=dark] | --bs-danger-bg-subtle | — | #2c0b0e | var(--vn-color-danger-subtle) | tokenized
theme | [data-bs-theme=dark] | --bs-light-bg-subtle | — | #343a40 | var(--vn-color-light-subtle) | tokenized
theme | [data-bs-theme=dark] | --bs-dark-bg-subtle | — | #1a1d20 | var(--vn-color-dark-subtle) | tokenized
theme | [data-bs-theme=dark] | --bs-primary-border-subtle | — | #084298 | var(--vn-color-primary-border) | tokenized
theme | [data-bs-theme=dark] | --bs-secondary-border-subtle | — | #41464b | var(--vn-color-secondary-border) | tokenized
theme | [data-bs-theme=dark] | --bs-success-border-subtle | — | #0f5132 | var(--vn-color-success-border) | tokenized
theme | [data-bs-theme=dark] | --bs-info-border-subtle | — | #087990 | var(--vn-color-info-border) | tokenized
theme | [data-bs-theme=dark] | --bs-warning-border-subtle | — | #997404 | var(--vn-color-warning-border) | tokenized
theme | [data-bs-theme=dark] | --bs-danger-border-subtle | — | #842029 | var(--vn-color-danger-border) | tokenized
theme | [data-bs-theme=dark] | --bs-light-border-subtle | — | #495057 | var(--vn-color-light-border) | tokenized
theme | [data-bs-theme=dark] | --bs-dark-border-subtle | — | #343a40 | var(--vn-color-dark-border) | tokenized
theme | [data-bs-theme=dark] | --bs-heading-color | — | inherit | var(--vn-text-heading, inherit) | tokenized
theme | [data-bs-theme=dark] | --bs-link-color | — | #6ea8fe | var(--vn-link-base) | tokenized
theme | [data-bs-theme=dark] | --bs-link-hover-color | — | #8bb9fe | var(--vn-link-hover-base) | tokenized
theme | [data-bs-theme=dark] | --bs-link-color-rgb | — | 110, 168, 254 | var(--vn-link-rgb) | tokenized
theme | [data-bs-theme=dark] | --bs-link-hover-color-rgb | — | 139, 185, 254 | var(--vn-link-hover-rgb) | tokenized
theme | [data-bs-theme=dark] | --bs-code-color | — | #e685b5 | var(--vn-text-code) | tokenized
theme | [data-bs-theme=dark] | --bs-highlight-color | — | #dee2e6 | var(--vn-text-body-base) | tokenized
theme | [data-bs-theme=dark] | --bs-highlight-bg | — | #664d03 | color-mix(in srgb, var(--vn-palette-black-base) 60%, var(--vn-color-warning-base)) | tokenized
theme | [data-bs-theme=dark] | --bs-border-color | — | #495057 | var(--vn-border-color) | tokenized
theme | [data-bs-theme=dark] | --bs-border-color-translucent | — | rgba(255, 255, 255, 0.15) | var(--vn-border-translucent) | tokenized
theme | [data-bs-theme=dark] | --bs-form-valid-color | — | #75b798 | var(--vn-form-valid) | tokenized
theme | [data-bs-theme=dark] | --bs-form-valid-border-color | — | #75b798 | var(--vn-form-valid) | tokenized
theme | [data-bs-theme=dark] | --bs-form-invalid-color | — | #ea868f | var(--vn-form-invalid) | tokenized
theme | [data-bs-theme=dark] | --bs-form-invalid-border-color | — | #ea868f | var(--vn-form-invalid) | tokenized
theme | :root | --bs-breakpoint-xs | — | 0 | var(--vn-breakpoint-xs) | tokenized
theme | :root | --bs-breakpoint-sm | — | 576px | var(--vn-breakpoint-sm) | tokenized
theme | :root | --bs-breakpoint-md | — | 768px | var(--vn-breakpoint-md) | tokenized
theme | :root | --bs-breakpoint-lg | — | 992px | var(--vn-breakpoint-lg) | tokenized
theme | :root | --bs-breakpoint-xl | — | 1200px | var(--vn-breakpoint-xl) | tokenized
theme | :root | --bs-breakpoint-xxl | — | 1400px | var(--vn-breakpoint-xxl) | tokenized
theme | :root | --bs-carousel-indicator-active-bg | — | #fff | var(--vn-palette-white-base) | tokenized
theme | :root | --bs-carousel-caption-color | — | #fff | var(--vn-palette-white-base) | tokenized
theme | [data-bs-theme=light] | --bs-carousel-indicator-active-bg | — | #fff | var(--vn-palette-white-base) | tokenized
theme | [data-bs-theme=light] | --bs-carousel-caption-color | — | #fff | var(--vn-palette-white-base) | tokenized
theme | [data-bs-theme=dark] | --bs-carousel-indicator-active-bg | — | #000 | var(--vn-palette-black-base) | tokenized
theme | [data-bs-theme=dark] | --bs-carousel-caption-color | — | #000 | var(--vn-palette-black-base) | tokenized
theme | [data-bs-theme=light] { color-scheme } | — | declaration
theme | --bs-primary | — | property
theme | --bs-primary-rgb | — | property
theme | --bs-focus-ring-color | — | property
theme | --bs-secondary | — | property
theme | --bs-secondary-rgb | — | property
```
