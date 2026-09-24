# UTIL-FRAMES (`fu`) report

Unit: UTIL-FRAMES, `opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-fu` (branch
`unit/fu` at `cf5e447`). Nothing committed, pushed, or installed.

## Outcome and deviation state

- **P9 (the `text-bg-*` label polarity): dropped.** The coordinator's mid-campaign decision moved it
  to the LABEL-CONTRAST design round. I had already edited `src/styles/utilities/_color-bg.scss` and
  `tests/src/styles/utilities/color-bg.test.ts`. I reverted exactly my own edit to each file by
  writing back its baseline text. I did not use git to restore it. `git status --short` lists
  neither file, so both match `cf5e447` byte for byte. I edited no ledger row. The dropped work's red
  and green logs are kept for the design round under `.orkestrel/veneer/units/fu-instruments/fu-p9-dropped/`. The red run was
  `2 failed | 4 passed`, and only the `info` and `warning` roles failed in both modes. The black
  label measured 3.586 to 1 on the `info` fill and 4.175 to 1 on the `warning` fill. The button
  table records white at 5.854 to 1 and 5.051 to 1.
- **P17 (frames): done, with one limit I could not close.** The light and dark role rings have no
  frame under focus (see "States left unframed").
- **P18 (§ Showcase and the § Tests link): done** in `fu-shared.patch`.
- **Overlap with FOCUS-FRAME.** I rewrote the existing focus ring journey case, the one that shoots
  the default ring and the role rings, from page frames to element frames. FOCUS-FRAME's brief
  converts the same case, so the three-way merge will conflict in that hunk.
- **Stopped for:** nothing.

## Rows

### Role-link hover and focus

- **Specimen:** `Role links` in `LINK_SPECIMENS`, which keeps every role link.
- **Scenarios:** `role-links-hover` and `role-links-focus`, driven on the `.link-primary` link.
- **Proof:** the link-state journey case, `tests/app/browser/integration.test.ts`, around line 2316:
  "drives a link of each link specimen to the pointer and to keyboard focus on its lifted specimen,
  and photographs each state".
  - It takes its population from the `DRIVEN_KEYS` rows whose subject `LINK_SPECIMENS` declares.
  - Each state is an element frame of the live specimen, lifted into a `p-2` wrapper and restored
    in a `finally` block.
  - Every placement carries the structural guard
    `expect(mounted.host.querySelector('main')?.contains(link)).toBe(false)`.
  - It checks that the state held while the frame was shot, reads the paint again after the shot,
    checks that the focus outline lies inside the frame, and checks that each link returns to its
    resting paint.
- **Red run:** `Tests 3 failed | 45 skipped (48)`, message `expected [] to not strictly equal []`
  (the case had no rows to drive).
- **Reading:** Veneer paints a role link the same at rest, under hover, and under focus. The guide's
  § Color utilities records this as a departure, so the hover frame matches the resting frame.

### `link-body-emphasis` hover (and focus)

- **Specimen:** the link moved out of `Role links` into a separate `Body emphasis link` specimen,
  because a scenario names one subject.
- **Scenarios:** `body-emphasis-link` (resting row, `.link-body-emphasis`, `color`),
  `body-emphasis-link-hover`, and `body-emphasis-link-focus`. The focus frame is an addition: the
  critic's list names it and the partial writes the rule.
- **Proofs:**
  - The link-state journey case.
  - `LinkSection.test.ts`, "renders the declared specimens and the complete link class families".
    It checks that the emphasis link is alone in its specimen, and it reads the specimen names from
    `LINK_SPECIMENS` in place of a literal list.
- **Red run:** `LinkSection` failed with `expected [ 9 ] to deeply equal [ 1 ]`.
- **Reading:** the hover paint moves to `rgba(0, 0, 0, 0.75)` in light mode.

### Link opacity, underline offsets, underline colors, and underline opacity

- **Specimens:** `Link opacity`, `Underline offsets`, and `Underline opacity` each write their
  resting steps on one line and their hover steps on the next. `Underline colors` is unchanged.
- **Resting rows:**
  - `link-opacity`: `.link-opacity-50`, `color`
  - `underline-offsets`: `.link-offset-2`, `text-underline-offset`
  - `underline-colors`: `.link-underline-danger`, `text-decoration-color`
  - `underline-opacity`: `.link-underline-opacity-50`, `text-decoration-color`
- **Hover rows:** `link-opacity-hover`, `underline-offsets-hover`, and `underline-opacity-hover`.
  Each is driven on the specimen's first link that carries a hover class.
- **Why the lines split:** at the 1280-wide variant the pointer cannot reach past about 915 CSS
  pixels (`.orkestrel/veneer/units/fu-instruments/fu-hover-reach.log.txt`):
  - `Hover link opacity 10%` (752 to 914) was hovered.
  - `Hover link opacity 25%` (919 to 1081) timed out after 4000 ms.
  - `Underline opacity 100%` (817 to 985) timed out.
  - `Hover underline opacity 0%` (977 to 1172) hung the case until the 120 s budget ran out.
- **Proof:** the link-state journey case. For each link that carries a hover class, it checks that a
  key the class's own rule writes moved: the `--bs-link-opacity` variable, the
  `--bs-link-underline-opacity` variable, the `text-underline-offset` property, or the icon's
  `transform` property. The color is left out of this check because the bare `a:hover` element
  rule repaints the color too.
- **Readings at light-1280:**
  - `--bs-link-opacity` variable: from empty to `0.1`
  - `text-underline-offset` property: from `auto` to `1.75px`
  - `--bs-link-underline-opacity` variable: from `1` to `0`

### Icon links at rest, hover, and focus

- **Rows:** `icon-links` (resting row, `.icon-link`, `column-gap`), `icon-links-hover`, and
  `icon-links-focus`, each driven on the `.icon-link-hover` link.
- **Proof:** the link-state journey case.
- **Reading:** the icon's `transform` property moves from `none` to `matrix(1, 0, 0, 1, 3.5, 0)`
  under both hover and focus.

### Every `focus-ring-<role>` under focus

- **Specimens:** `FOCUS_RING_SPECIMENS` is `Default focus ring` plus one specimen per role, from
  `Primary focus ring` to `Dark focus ring`. These replace the single `Focus ring roles` row
  specimen, because one element holds focus at a time and a scenario names one subject.
- **Resting rows:** `primary-focus-ring` through `danger-focus-ring`. Each reads the
  `--bs-focus-ring-color` property its role class writes at rest. They replace the `focus-ring-roles`
  row.
- **Focus rows:** `primary-focus-ring-focus` through `danger-focus-ring-focus`. They replace
  `focus-ring-roles-focus`.
- **Proofs:**
  - The focus ring journey case, around line 2207: "paints the default ring and each role ring under
    keyboard focus on its lifted specimen, and photographs each ring inside its frame". It checks
    one ring link per specimen, the state held at the shot, each ring inside its frame (shadow reach
    against the recorded region), no ring at rest or after blur, and distinct rings.
  - `FocusRingSection.test.ts`, "renders every declared ring specimen…", which checks one ring link
    per specimen.
- **Red runs:** the journey case and `FocusRingSection` both failed with
  `expected [ 1, 8 ] to … equal [ 1, 1 ]`.
- **Ring contrast readings at light-1280** (the `readRing` function): default 2.28, primary 2.28,
  secondary 2.13, success 1.94, info 2.05, warning 1.97, and danger 2.49.

### Default focus ring at rest

- **Row:** `default-focus-ring` (resting row, `.focus-ring`, `box-shadow`, which reads `none`).
- `tests/setup.test.ts` drops the `Default focus ring` exemption and its comment.
- The `CASCADE_KEYS` TSDoc paragraph that declined this frame is rewritten.
- **Red run:** `tests/setup.test.ts`, "names each driven row…", failed with
  `expected [ { …(2) } ] to strictly equal []`, which names the `default-focus-ring-focus` row.

### `.visually-hidden-focusable` revealed by `:focus-within`

- **Specimen:** a `Focusable container` specimen in `VISIBILITY_SPECIMENS`: a span carrying the
  class, holding a link.
- **Rows:** `focusable-container` (resting row,
  `.position-relative:has(> span.visually-hidden-focusable)`, `position`) and
  `focusable-container-focus`.
- **Proofs:**
  - The journey case around line 2495: "reveals the focusable container while its link holds
    keyboard focus…". It checks that the container matches `:focus-within` and not `:focus`, and it
    reads the container's width at rest, revealed, framed, and after blur: 1, then 393.08 at
    light-1280, then 393.08, then 1.
  - `VisibilitySection.test.ts`, "reveals the focusable container while the keyboard holds focus on
    the link inside it, and hides it again after".
- **Red runs:** the journey case failed with `No specimen in the root is named "Focusable
  container"`, and the section proof failed with `No focusable container`.

## States left unframed

- **Light and dark role rings under focus.** The registry proof in `tests/setup.test.ts`, "carries
  no mode token in a scenario", refuses every stem that matches `/(?:^|-)(?:light|dark)(?:-|$)/u`.
  Both `light-focus-ring-focus` and `dark-focus-ring-focus` match it. The specimens render, and
  `tests/src/styles/components/focus-ring.test.ts` reads each role's ring under focus. This is
  recorded in the `CASCADE_KEYS` TSDoc and in the guide's § Showcase. Framing them needs a ruling
  on the registry law. I did not change that law.
- **The `xxl` step, print media, and scrollbars** are outside the journey's variants. This is
  recorded in the same two places.
  - I checked the scrollbar cause in the installed package:
    `node_modules/playwright-core/lib/coreBundle.js` launches headless Chromium with the
    `--hide-scrollbars` switch.
  - `display.test.ts` has a print-medium case, and `overflow.test.ts` reads each value.

## Frames

Every frame is under `/home/user/veneer-fu/tmp/capture/states/` as `<scenario>--light-1280.png` and
`<scenario>--dark-390.png`. I checked that every one exists and is non-empty. The scenarios are:

- **Resting:** `focusable-container`, `default-focus-ring`, `primary-focus-ring`,
  `secondary-focus-ring`, `success-focus-ring`, `info-focus-ring`, `warning-focus-ring`,
  `danger-focus-ring`, `body-emphasis-link`, `link-opacity`, `underline-offsets`,
  `underline-colors`, `icon-links`, `underline-opacity`
- **Driven:** `primary-focus-ring-focus`, `secondary-focus-ring-focus`,
  `success-focus-ring-focus`, `info-focus-ring-focus`, `warning-focus-ring-focus`,
  `danger-focus-ring-focus`, `role-links-hover`, `role-links-focus`, `body-emphasis-link-hover`,
  `body-emphasis-link-focus`, `link-opacity-hover`, `underline-offsets-hover`, `icon-links-hover`,
  `icon-links-focus`, `underline-opacity-hover`, `focusable-container-focus`
- **Converted to an element frame:** `default-focus-ring-focus`
- **Removed:** `focus-ring-roles` and `focus-ring-roles-focus`. No frame of either was written.

## Observations for other carriers

- **Dark-mode focus indicator on links (P2 class, FOCUS-FRAME).** On a focused link, the link-state
  case recorded the outline as `auto | 1px | 1px | rgb(16, 16, 16)` in both light-1280 and
  dark-390. The outline does not show on the dark canvas, for example in
  `role-links-focus--dark-390.png` and `focusable-container-focus--dark-390.png`. The readings are
  in `tmp/capture/dark-390.txt` under the `link states` reading.
- **`VISIBILITY_COPY` paragraph.** It names the other specimens and not the focusable container.
  The copy constant is outside my owned tables, so I left it unchanged.
- **First `npm run test:setup` run.** The `tests/setupServer.test.ts` case "records and reads
  official control state…" timed out at 10100 ms with a load average of about 12. The same command
  passed on the rerun. I do not own that file.

## Gates

| Command, as run in `/home/user/veneer-fu` | Exit | Result line |
| --- | --- | --- |
| `npx oxfmt --check app/browser/constants.ts tests/setup.ts tests/setup.test.ts tests/app/browser/integration.test.ts tests/app/browser/sections/FocusRingSection.test.ts tests/app/browser/sections/LinkSection.test.ts tests/app/browser/sections/VisibilitySection.test.ts` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | oxlint printed no finding |
| `npm run check` | 0 | the last stage, `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`, printed no diagnostic |
| `npm run build:src` | 0 | `✓ built in 3.83s` (styles) |
| `npm run test:setup` (first run) | 1 | `Tests 1 failed \| 298 passed (299)`, the timeout noted in the observations |
| `npm run test:setup` (rerun) | 0 | `Tests 299 passed (299)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser` over `LinkSection`, `FocusRingSection`, `FloatSection`, `ObjectFitSection`, `OpacitySection`, `OverflowSection`, `DisplaySection`, `ShadowSection`, `PositionSection`, `BorderSection`, `SizingSection`, `FlexSection`, `SpacingSection`, `TextSection`, `ColorSection`, `BackgroundSection`, `InteractionSection`, `VisibilitySection` under `tests/app/browser/sections/`, and `tests/app/browser/Showcase.test.ts` | 0 | `Test Files 19 passed (19)`, `Tests 66 passed (66)` |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:light-1280*"` | 0 | `Tests 48 passed (48)` |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:dark-390*"` | 0 | `Tests 48 passed (48)` |
| `npm run test:guides`, in a scratch copy under `tmp/probe/` with `fu-shared.patch` applied by `patch -p1` to the `cf5e447` guide | 0 | `Tests 20 passed (20)` |

**Observations run in the same scratch copy:**

- `npx oxfmt --config .oxfmtrc.json --check guides/veneer.md` exited 0.
- `npm run test:policy` exited 0 with `Tests 109 passed | 1 skipped (110)`.

I removed the scratch copy and every probe under `tmp/probe/`. The logs are under `tmp/units/`
with the `fu-gate-`, `fu-capture-`, `fu-red-`, and `fu-scratch-` prefixes.

## Mutations

The log is `.orkestrel/veneer/units/fu-instruments/fu-mutations.log.txt`. It was produced by `.orkestrel/veneer/units/fu-instruments/fu-mutate.sh` with
`.orkestrel/veneer/units/fu-instruments/fu-mutate.py`, and it closes with
`restored: every owned file matches its pre-run digest`. Every mutation reddened its proof:

- **`role-rings-default`:** each role specimen's link drops its `focus-ring-<role>` class.
  - The focus ring journey case failed with `expected 1 to be 7`.
  - `FocusRingSection` failed with `2 failed | 1 passed`.
- **`ring-frame-unpadded`:** the focus ring case's wrapper loses its `p-2` padding. The
  ring-inside-frame check failed.
- **`link-state-undriven`:** the pointer and keyboard drive are removed. The held-state check failed
  with `[ 'role-links-hover', false ], …`.
- **`container-always-hidden`:** the container also carries the `visually-hidden` class. The
  journey case and the `VisibilitySection` reveal case each failed with
  `expected 1 to be greater than 1`.
- **`default-ring-unrested`:** the `default-focus-ring` resting row is removed. The
  `tests/setup.test.ts` driven-row case failed.
- **`emphasis-link-merged`:** the emphasis link rejoins `Role links`. `LinkSection` failed with
  `expected [ 9 ] to deeply equal [ 1 ]`.

The red-first runs from before the specimens and rows existed are appended to the same log.

## Touched files

- `app/browser/constants.ts`: the emphasis link has its own specimen, the scale specimens are split
  into a resting line and a hover line, there is one focus ring specimen per role, and the
  `Focusable container` specimen is added. The TSDoc is updated.
- `tests/setup.ts`: subject union members, resting and driven rows, and the `CASCADE_KEYS` TSDoc
  for the default ring, the unframed light and dark rings, and the states outside the variants.
- `tests/setup.test.ts`: the `Default focus ring` exemption is removed.
- `tests/app/browser/integration.test.ts`: the focus ring case is rewritten to element frames, and
  the link-state case and the focusable-container case are added.
- `tests/app/browser/sections/FocusRingSection.test.ts`,
  `tests/app/browser/sections/LinkSection.test.ts`, and
  `tests/app/browser/sections/VisibilitySection.test.ts`: specimen names are read from the tables,
  and the single-link checks, the container composition, and the container reveal case are added.

Diffstat: `7 files changed, 554 insertions(+), 83 deletions(-)`. The owned-file diff is
`.orkestrel/veneer/units/fu.diff`, and the status is `.orkestrel/veneer/units/fu-status.txt`.

## Shared patch

`/home/user/scaffold/.orkestrel/veneer/units/fu-shared.patch` applies to `guides/veneer.md` at `cf5e447`:

- **§ Showcase:** the helper-key paragraph is rewritten so each region appears once, in the order
  the showcase mounts them. This removes the repeated Flex clause and the repeated list clause.
- **§ Showcase:** the dangling Offcanvas run is folded into the list of specimens that render inside
  the `viewport` frame, in mount order.
- **§ Showcase:** paragraphs are added for the unframed light and dark rings and for the states
  outside the variants.
- **§ Tests:** the link classes link moves beside the color-and-background pairs companion.
- It changes no ledger row.
