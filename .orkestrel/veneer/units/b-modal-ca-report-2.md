# Unit CAROUSEL (`ca`) round 2 report

`opus` on Opus 5.5, a native subagent, the sole writer in `/home/user/veneer-ca` (branch `unit/ca`,
uncommitted writes over `c3ac297`). Effective brief: `/home/user/scaffold/.orkestrel/veneer/units/ca-brief-2.md`. No bench lane ran,
so there is no journal.

## Outcome

- Every ruling the brief carries is closed: claim 3 (the added mutations and the matrix), claim 4
  (the height case), claim 8 (tokens, counts, and this report), CAROUSEL-COPY, F1 (the retained
  comparator with negative controls), R1, and R2.
- Every added mutation reddens its named case against the shipped proofs, and every unmutated
  control is green. No stop condition in § Deviation contract fired.
- Every gate the brief names exits 0 on the validation copy, and the revised patch
  `/home/user/scaffold/.orkestrel/veneer/units/ca-shared-2.patch` applies cleanly to `c3ac297`.
- `tmp/probe/` is deleted. Every script sits in `/home/user/scaffold/.orkestrel/veneer/units/ca-instruments-2/tools/`, and every log
  sits in `/home/user/scaffold/.orkestrel/veneer/units/ca-instruments-2/logs/`.

## Touched files

The owned files are untracked, so `git status --porcelain` lists each as `??`
(`/home/user/scaffold/.orkestrel/veneer/units/ca-2-status.txt`). `/home/user/scaffold/.orkestrel/veneer/units/ca-2.diff` concatenates
`git diff --no-index /dev/null <path>` for each owned file. The round-1 to round-2 delta of each
owned file is `ca-instruments-2/logs/round-delta.diff.txt`.

| File | Round-2 change |
| --- | --- |
| `src/styles/components/_carousel.scss` | The opening comment qualifies each class token with a noun (claim 8). No rule changed. |
| `tests/src/styles/components/carousel.test.ts` | The dark-retune comment and title drop the count (claim 8). The display and fade case comments name the mutations those cases catch. No assertion changed. |
| `app/browser/sections/CarouselSection.ts` | Unchanged. |
| `tests/app/browser/sections/CarouselSection.test.ts` | A dedicated height case covers every displayed slide in every specimen (claim 4). The contrast case reads every fill each captioned picture paints (R2). The advancing case drops its single-slide height assertion, because the height case covers that slide. |
| `/home/user/scaffold/.orkestrel/veneer/units/ca-shared-2.patch` | Replaces `ca-shared.patch` whole. Relative to round 1, only `app/browser/constants.ts` and `guides/veneer.md` changed. The `tests/setupStyles.ts` hunk splits at a different line and yields identical file bytes. |

Diffstat of the owned files, from `git diff --no-index --stat /dev/null <path>`:
`_carousel.scss` 207 insertions, `carousel.test.ts` 576 insertions, `CarouselSection.ts` 20
insertions, and `CarouselSection.test.ts` 255 insertions. `git apply --stat` on the patch reads
`13 files changed, 427 insertions(+), 11 deletions(-)`.

## Findings closed: site, before, after

**Claim 3 (the mutations and the matrix).**
- Site: `ca-instruments-2/tools/mutate.py`, `MUTATIONS`.
- Before: the table had no mutation for the incoming slides' `display: block`, for the
  `.carousel-fade .carousel-item.active` stacking rule, or for `.carousel-control-next { right: 0 }`.
- After: the table adds these mutations:
  - `next-display-dropped`: removes `.carousel-item-next` from the display list rule.
  - `prev-display-dropped`: removes `.carousel-item-prev` from the display list rule.
  - `fade-active-dropped`: removes `.carousel-fade .carousel-item.active,` from the z-index and
    opacity rule.
  - `next-right-dropped`: removes the `.carousel-control-next { right: 0 }` rule.
- Each one ran red on its named case (see § Mutation record). § R19 proof matrix is rewritten: the
  guard mutations name the advance case, and every row names the mutation that reddens its own case.

**Claim 4 (the height).**
- Site: `CarouselSection.test.ts`.
- Before: only the advancing specimen's incoming slide was asserted, inside the advancing case.
- After: the case `draws every displayed slide in every carousel exactly as tall as its picture`
  collects every `.carousel-item.active` and `.carousel-item-next` slide from every
  `CAROUSEL_SPECIMENS` entry. It then asserts:
  - every specimen contributes a slide;
  - every picture's box height is greater than zero;
  - the `{ name, height }` list of slide heights equals the same list of picture heights.
- The mutation `stray-block` (`<p>Tide table</p>` after the picture in the captioned specimen's
  resting slide) reddens it.

**Claim 8 (tokens and counts).**
- `_carousel.scss`, the opening comment:
  - Before: "`active` marks the resting slide, `carousel-item-next` and `carousel-item-prev` mark the
    incoming one, and `carousel-item-start` and `carousel-item-end` mark the direction a slide is
    heading."
  - After: "the `active` class marks the resting slide, the `carousel-item-next` and
    `carousel-item-prev` classes mark the incoming one, and the `carousel-item-start` and
    `carousel-item-end` classes mark the direction a slide is heading."
- `carousel.test.ts`, the dark-retune comment:
  - Before: "omits one of the three variables".
  - After: "omits one of its variables".
- `carousel.test.ts`, the dark-retune title:
  - Before: `retunes all three variables on the dark class and inside a dark island, and a light
    island restores them`.
  - After: `retunes every carousel variable on the dark class and inside a dark island, and a light
    island restores them`.
- `CAROUSEL_SPECIMENS` TSDoc, in the patch:
  - Before: "`active` marks the resting slide and its indicator".
  - After: "the `active` class marks the resting slide and its indicator". The phrase wraps after
    "its".
- Guide, the theme-scope paragraph:
  - Before: "declare the three `--bs-carousel-*` variables".
  - After: "declare the `--bs-carousel-*` variables".
- Guide, § Bootstrap variables Veneer retains:
  - Before: "measures the same three variables".
  - After: "measures the same variables".
- This report states no prose count, names no list item by position, and records the close proof's
  command and the scoped `oxfmt` and `oxlint` commands in § Gates.

**CAROUSEL-COPY (M14).**
- Site: `CAROUSEL_COPY.paragraph` in the patch.
- Before: "… each state set as a class in markup. Hover or focus a control to compare its states."
- After: "Compare a captioned carousel, a fading one, an inverted one over light pictures, and one
  caught advancing to its next slide, each state set as a class in markup, and hover or focus a
  control to compare its states."
- The contract case compares the rendered paragraph to `CAROUSEL_COPY.paragraph` and is green.

**F1 (the comparator).**
- Site: `ca-instruments-2/tools/cascade-check.mjs`, run by `cascade-runs.sh`.
- Before: `gates.sh` named `cascade-check.mjs`, and the script was not retained.
- After: the script is retained. Its clean runs are green, and each negative control reads red on
  the expanded compile and on the built cascade (§ Cascade comparator).

**R1 (the `visually-hidden` reason).**
- Site: the guide's class-section region pointer paragraph.
  - Before: "Each control is named by its `aria-label` attribute, because the visually hidden label
    the release's markup writes is a utility this cascade does not ship."
  - After: "Each control is named by its `aria-label` attribute." The sentence wraps after
    "`aria-label`".
- Site: the `CAROUSEL_SPECIMENS` remark.
  - Before: "…named by its `aria-label` attribute, because the visually hidden label the release
    writes is a utility this cascade does not ship, and each name is unique…"
  - After: "…named by its `aria-label` attribute, and each name is unique…".

**R2 (the contrast).**
- Site: `CarouselSection.test.ts`, the contrast case.
- Before: the case, titled `sets each caption over a picture it reads against, the inverted
  carousel over light pictures`, parsed the `<rect>` fill of each resting picture alone.
- After: the case `holds each caption to 4.5:1 against every fill its picture paints, the inverted
  carousel over light pictures` works as follows:
  - It reads every captioned slide in the `Captioned carousel` and `Inverted carousel` specimens.
  - It parses each `<rect>` and `<path>` `fill` from the decoded picture source.
  - It asserts that each picture's shape list reads `rect,path`.
  - It asserts that no slide's lowest ratio against the caption's computed color falls under 4.5.
- The mutation `path-lightened` (the captioned resting picture's path fill `#6c757d` raised to
  `#dee2e6`) reddens it.

**Guide sites held unchanged:** the § Showcase paragraph, and the class-section region pointer's
position and form. Inside that pointer paragraph, only the R1 sentence changed.

## R19 proof matrix

Cases are in `carousel.test.ts` unless marked "section", which means `CarouselSection.test.ts`. The
following list gives the short name each case takes in the tables, then its full title.

- `selector-set`: `writes the recorded carousel selectors and no other rule on their classes`
- `display`: `displays only the resting slide and the incoming slides`
- `track`: `lays every displayed slide over the track and clears the floats beneath it`
- `advance`: `moves the resting slide out and paints the incoming slide in place, in each direction`
- `lone-slide`: `holds a lone incoming slide one width to the side it arrives from`
- `pointer-event`: `restricts touch to vertical panning on a carousel carrying the pointer-event class`
- `fade`: `stacks the slides in place and crosses their opacity, holding the outgoing slide for the slide duration`
- `motion`: `collapses the slide, fade, control, and indicator transitions under the reduced-motion preference`
- `motion-factor`: `rescales the control transition with the published motion factor`
- `controls`: `pins each control to its side over the whole carousel and reads the filter from its variable`
- `marks`: `paints each control its own recorded mark at the recorded size`
- `states`: `moves a control from half to nine-tenths opacity under the pointer and on focus, and back`
- `forced-colors`: `keeps the focus opacity under forced colors, where the control draws no outline`
- `pips`: `lays the pips out as bars inside a taller transparent target, the current one at full strength`
- `density`: `rescales the strip inset with the published density factor`
- `caption`: `insets the caption over the lower part of the carousel and paints it from its variable`
- `dark-retune`: `retunes every carousel variable on the dark class and inside a dark island, and a light island restores them`
- section `contract`: `renders a captioned, a fading, an inverted, and an advancing carousel through the shared section contract`
- section `names`: `names every indicator and control and marks the current indicator in the captioned and inverted carousels`
- section `contrast`: `holds each caption to 4.5:1 against every fill its picture paints, the inverted carousel over light pictures`
- section `height`: `draws every displayed slide in every carousel exactly as tall as its picture`
- section `advancing`: `paints the incoming slide in the advancing carousel while the resting slide moves out`

The matrix follows. Each row names the case its mutation reddens.

| Recorded selector and condition | Distinguishing mutation → the case it reddens | Specimen | Capture scenario |
| --- | --- | --- | --- |
| `.carousel` | `carousel-position-dropped` → `controls`, `caption`, `pips`, `track` | every specimen | every carousel row |
| `.carousel.pointer-event` | `pointer-event-dropped` → `pointer-event` | none: declined (M2) | none |
| `.carousel-inner` | `track-overflow-dropped` → `track` | every specimen | every carousel row |
| `.carousel-inner::after` | `clearfix-dropped` → `track` | every specimen | every carousel row |
| `.carousel-item` | `item-display-block` → `display` | every specimen | every carousel row |
| `.carousel-item` under `@media (prefers-reduced-motion: reduce)` | `item-bare-transition` → `motion` | every specimen | none |
| `.carousel-item.active` | `active-display-dropped` → `display` | every specimen | every carousel row |
| `.carousel-item-next` | `next-display-dropped` → `display` (also `lone-slide` and `advance`) | `Advancing carousel` | `advancing-carousel` |
| `.carousel-item-prev` | `prev-display-dropped` → `display` (also `lone-slide` and `advance`) | none: backward advance declined | none |
| `.carousel-item-next:not(.carousel-item-start)` | `next-guard-dropped` → `advance` | none: lone slide declined (M2) | none |
| `.active.carousel-item-end` | `active-end-dropped` → `advance` (backward track) | none: declined | none |
| `.carousel-item-prev:not(.carousel-item-end)` | `prev-guard-dropped` → `advance` (backward track) | none: declined | none |
| `.active.carousel-item-start` | `active-start-dropped` → `advance` (forward track); section `advancing-direction-dropped` → section `advancing` | `Advancing carousel` | `advancing-carousel` |
| `.carousel-fade .carousel-item` | `fade-item-opacity-dropped` → `fade` | `Fading carousel` | `fading-carousel` |
| `.carousel-fade .carousel-item.active` | `fade-active-dropped` → `fade`; section `fade-class-dropped` → section `contrast` | `Fading carousel` | `fading-carousel` |
| `.carousel-fade .carousel-item-next.carousel-item-start` | `fade-incoming-dropped` → `fade` | none: declined | none |
| `.carousel-fade .carousel-item-prev.carousel-item-end` | `fade-prev-incoming-dropped` → `fade` | none: declined | none |
| `.carousel-fade .active.carousel-item-start` and `.carousel-fade .active.carousel-item-end` | `fade-delay-dropped` → `fade` | none: declined | none |
| the same pair under `@media (prefers-reduced-motion: reduce)` | `fade-bare-transition` → `motion` | none | none |
| `.carousel-control-prev` and `.carousel-control-next` | `control-literal-filter` → `controls`; `control-literal-duration` → `motion-factor` | `Captioned carousel`, `Fading carousel`, `Inverted carousel` | `captioned-carousel`, `inverted-carousel` |
| the same pair under `@media (prefers-reduced-motion: reduce)` | `control-bare-transition` → `motion` | the same | none |
| `.carousel-control-prev:hover` and `.carousel-control-next:hover` | `hover-dropped` → `states` | `Captioned carousel` | `captioned-carousel-hover` |
| `.carousel-control-prev:focus` and `.carousel-control-next:focus` | `focus-dropped` → `states` and `forced-colors` (M16) | `Captioned carousel` | `captioned-carousel-focus` |
| `.carousel-control-prev { left: 0 }` | `prev-left-dropped` → `controls` | `Captioned carousel`, `Fading carousel`, `Inverted carousel` | `captioned-carousel` |
| `.carousel-control-next { right: 0 }` | `next-right-dropped` → `controls` | the same | `captioned-carousel` |
| `.carousel-control-prev-icon` and `.carousel-control-next-icon` | `icons-swapped` → `marks`; the comparator's `swapped-uri` control | the same | `captioned-carousel`, `inverted-carousel` |
| `.carousel-indicators` | `indicator-literal-inset` → `density` | `Captioned carousel`, `Inverted carousel` | the same rows |
| `.carousel-indicators [data-bs-target]` | `indicator-border-box` → `pips`; section `indicator-target-dropped` → section `names` | the same | the same |
| the same under `@media (prefers-reduced-motion: reduce)` | `indicator-bare-transition` → `motion` | the same | none |
| `.carousel-indicators .active` | `active-pip-dropped` → `pips`; section `aria-current-dropped` → section `names` | the same | the same |
| `.carousel-caption` | `caption-literal-white` → `caption`; section `captions-dropped` → section `names` and `contrast` | the same | `captioned-carousel` |
| `.carousel-dark` | `dark-omits-filter` → `dark-retune`; section `inverted-class-dropped` → section `contrast` | `Inverted carousel` | `inverted-carousel` |
| the whole written set | `extra-rule` → `selector-set`; the comparator's `planted-rule` control | — | — |

The lone-slide case reddens under `next-display-dropped` and `prev-display-dropped`, and not under
the guard mutations. With a guard dropped, a slide with no direction class still matches the same
transform, so that case cannot tell the guard apart.

## Mutation record

**Styles proof command** (`tools/mutate.py`, driven by `tools/record.sh`):

```text
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/carousel.test.ts
```

- Each mutation edits the validation copy's partial, rebuilds with `npm run build:src:styles`, runs
  the command against the shipped `carousel.test.ts`, and restores the partial by SHA-256.
- Each log sits at `ca-instruments-2/logs/mutations/<name>.log.txt` and carries the exact edit, the
  command, the `RUN` line, the `Tests` line, the exit code, the red titles, and the full output.
- Every row's `RUN` line reads `RUN  v4.1.11 /home/user/veneer-ca/tmp/probe/base`.
- Rows the brief adds this round are marked "(added)".

| Mutation | Log | `Tests` line | Red cases |
| --- | --- | --- | --- |
| `none` (control) | `mutations/none.log.txt` | `17 passed (17)`, exit 0 | none |
| `item-display-block` | `mutations/item-display-block.log.txt` | `1 failed \| 16 passed (17)` | `display` |
| `active-display-dropped` | `mutations/active-display-dropped.log.txt` | `4 failed \| 13 passed (17)` | `display`, `track`, `advance`, `selector-set` |
| `next-display-dropped` (added) | `mutations/next-display-dropped.log.txt` | `4 failed \| 13 passed (17)` | `display`, `lone-slide`, `advance`, `selector-set` |
| `prev-display-dropped` (added) | `mutations/prev-display-dropped.log.txt` | `4 failed \| 13 passed (17)` | `display`, `lone-slide`, `advance`, `selector-set` |
| `next-guard-dropped` | `mutations/next-guard-dropped.log.txt` | `2 failed \| 15 passed (17)` | `advance`, `selector-set` |
| `prev-guard-dropped` | `mutations/prev-guard-dropped.log.txt` | `2 failed \| 15 passed (17)` | `advance`, `selector-set` |
| `active-end-dropped` | `mutations/active-end-dropped.log.txt` | `2 failed \| 15 passed (17)` | `advance`, `selector-set` |
| `active-start-dropped` | `mutations/active-start-dropped.log.txt` | `2 failed \| 15 passed (17)` | `advance`, `selector-set` |
| `fade-item-opacity-dropped` | `mutations/fade-item-opacity-dropped.log.txt` | `1 failed \| 16 passed (17)` | `fade` |
| `fade-active-dropped` (added) | `mutations/fade-active-dropped.log.txt` | `2 failed \| 15 passed (17)` | `fade`, `selector-set` |
| `fade-incoming-dropped` | `mutations/fade-incoming-dropped.log.txt` | `2 failed \| 15 passed (17)` | `fade`, `selector-set` |
| `fade-prev-incoming-dropped` | `mutations/fade-prev-incoming-dropped.log.txt` | `2 failed \| 15 passed (17)` | `fade`, `selector-set` |
| `fade-delay-dropped` | `mutations/fade-delay-dropped.log.txt` | `2 failed \| 15 passed (17)` | `fade`, `motion` |
| `fade-bare-transition` | `mutations/fade-bare-transition.log.txt` | `1 failed \| 16 passed (17)` | `motion` |
| `item-bare-transition` | `mutations/item-bare-transition.log.txt` | `1 failed \| 16 passed (17)` | `motion` |
| `control-bare-transition` | `mutations/control-bare-transition.log.txt` | `1 failed \| 16 passed (17)` | `motion` |
| `indicator-bare-transition` | `mutations/indicator-bare-transition.log.txt` | `1 failed \| 16 passed (17)` | `motion` |
| `control-literal-duration` | `mutations/control-literal-duration.log.txt` | `1 failed \| 16 passed (17)` | `motion-factor` |
| `control-literal-filter` | `mutations/control-literal-filter.log.txt` | `2 failed \| 15 passed (17)` | `controls`, `dark-retune` |
| `prev-left-dropped` | `mutations/prev-left-dropped.log.txt` | `1 failed \| 16 passed (17)` | `controls` |
| `next-right-dropped` (added) | `mutations/next-right-dropped.log.txt` | `1 failed \| 16 passed (17)` | `controls` |
| `hover-dropped` | `mutations/hover-dropped.log.txt` | `2 failed \| 15 passed (17)` | `states`, `selector-set` |
| `focus-dropped` | `mutations/focus-dropped.log.txt` | `3 failed \| 14 passed (17)` | `forced-colors`, `states`, `selector-set` |
| `icons-swapped` | `mutations/icons-swapped.log.txt` | `1 failed \| 16 passed (17)` | `marks` |
| `indicator-border-box` | `mutations/indicator-border-box.log.txt` | `1 failed \| 16 passed (17)` | `pips` |
| `indicator-literal-inset` | `mutations/indicator-literal-inset.log.txt` | `1 failed \| 16 passed (17)` | `density` |
| `active-pip-dropped` | `mutations/active-pip-dropped.log.txt` | `2 failed \| 15 passed (17)` | `pips`, `selector-set` |
| `caption-literal-white` | `mutations/caption-literal-white.log.txt` | `2 failed \| 15 passed (17)` | `caption`, `dark-retune` |
| `dark-omits-filter` | `mutations/dark-omits-filter.log.txt` | `1 failed \| 16 passed (17)` | `dark-retune` |
| `pointer-event-dropped` | `mutations/pointer-event-dropped.log.txt` | `2 failed \| 15 passed (17)` | `pointer-event`, `selector-set` |
| `carousel-position-dropped` | `mutations/carousel-position-dropped.log.txt` | `5 failed \| 12 passed (17)` | `controls`, `caption`, `pips`, `track`, `selector-set` |
| `track-overflow-dropped` | `mutations/track-overflow-dropped.log.txt` | `1 failed \| 16 passed (17)` | `track` |
| `clearfix-dropped` | `mutations/clearfix-dropped.log.txt` | `2 failed \| 15 passed (17)` | `track`, `selector-set` |
| `extra-rule` | `mutations/extra-rule.log.txt` | `1 failed \| 16 passed (17)` | `selector-set` |

**Section proof command** (`tools/mutate-section.py`):

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/CarouselSection.test.ts
```

- Each mutation edits the validation copy's `app/browser/constants.ts`, runs the command against
  the shipped section proof, and restores the file by SHA-256.
- Each log sits at `ca-instruments-2/logs/section-mutations/<name>.log.txt`, in the same shape.
- Every row's `RUN` line reads `RUN  v4.1.11 /home/user/veneer-ca/tmp/probe/base`.

| Mutation | Log | `Tests` line | Red cases |
| --- | --- | --- | --- |
| `none` (control) | `section-mutations/none.log.txt` | `6 passed (6)`, exit 0 | none |
| `stray-block` (added) | `section-mutations/stray-block.log.txt` | `1 failed \| 5 passed (6)` | section `height` |
| `path-lightened` (added) | `section-mutations/path-lightened.log.txt` | `1 failed \| 5 passed (6)` | section `contrast` |
| `advancing-direction-dropped` | `section-mutations/advancing-direction-dropped.log.txt` | `1 failed \| 5 passed (6)` | section `advancing` |
| `inverted-class-dropped` | `section-mutations/inverted-class-dropped.log.txt` | `1 failed \| 5 passed (6)` | section `contrast` |
| `fade-class-dropped` | `section-mutations/fade-class-dropped.log.txt` | `1 failed \| 5 passed (6)` | section `contrast` |
| `slide-class-added` | `section-mutations/slide-class-added.log.txt` | `1 failed \| 5 passed (6)` | section `contract` |
| `inline-style-added` | `section-mutations/inline-style-added.log.txt` | `1 failed \| 5 passed (6)` | section `contract` |
| `aria-current-dropped` | `section-mutations/aria-current-dropped.log.txt` | `1 failed \| 5 passed (6)` | section `names` |
| `control-label-dropped` | `section-mutations/control-label-dropped.log.txt` | `1 failed \| 5 passed (6)` | section `names` |
| `indicator-target-dropped` | `section-mutations/indicator-target-dropped.log.txt` | `1 failed \| 5 passed (6)` | section `names` |
| `captions-dropped` | `section-mutations/captions-dropped.log.txt` | `2 failed \| 4 passed (6)` | section `names`, section `contrast` |

**Failing-first for the section proof.** `tools/round1-hole.sh` extracts round 1's section proof from
the retained `ca.diff` into `logs/round1-section-proof.ts.txt`, then runs the added section
mutations against it with the same command:

- `round1-section-hole/none.log.txt`: `Tests  5 passed (5)`, exit 0.
- `round1-section-hole/stray-block.log.txt`: `Tests  5 passed (5)`, exit 0.
- `round1-section-hole/path-lightened.log.txt`: `Tests  5 passed (5)`, exit 0.

Round 1's proof stays green under each mutation. The round-2 proof reads
`1 failed | 5 passed (6)` under each mutation, on the named case.

**Failing-first for the styles proof.** The added styles mutations reddened the shipped proof
without any assertion change. The audit finding there was the missing executed mutation, not a
missing assertion.

## Cascade comparator

`tools/cascade-check.mjs` takes `expanded` or `built` and a checkout root. It works as follows:

- The `expanded` mode compiles `src/styles/index.scss` with the installed `sass` compiler in expanded
  style, at the build's load paths. The `built` mode reads `dist/src/styles/index.css`.
- It groups every carousel-class block and every inventory `carousel` entry by selector and
  condition, in first-written order.
- It reads red on any of these:
  - a missing, extra, or reordered key;
  - a block outside the components layer;
  - a value that differs from the record, unless the guide's `#### carousel` table records that
    exact departure;
  - a moved declaration order, in `expanded` mode;
  - an icon URI that differs from the recorded URI after whitespace normalization;
  - a guide departure row that the cascade no longer writes.
- The `built` mode undoes the minifier's notation rewrites before comparing, and names each one on a
  `NOTATION` line:
  - `translate`;
  - leading zeros;
  - `transparent` as `#0000`;
  - `background: 0 0`;
  - `flex: 0 auto`;
  - the dropped `ease`;
  - `:after`;
  - the condition's colon spacing;
  - the border shorthands, resolved per side.
- In `built` mode, a moved declaration order is a `NOTATION` line, because the minifier splits and
  merges rule blocks. The built run compares each property's resolved value instead.

`tools/cascade-runs.sh` drives the runs on the validation copy and writes
`logs/cascade/summary.txt`.

| Run | Log | Result |
| --- | --- | --- |
| Clean expanded compile | `cascade/clean-expanded.log.txt` | exit 0, `VERDICT green`; the only differences are the `DEPARTURE` lines matching the guide's `#### carousel` rows, and the `ICON` lines for the previous and the next mark read "equals the recorded URI" |
| Clean built cascade | `cascade/clean-built.log.txt` | exit 0, `VERDICT green`; the differences are `DEPARTURE` and `NOTATION` lines, with the same `ICON` readings |
| Planted rule (`.carousel-caption h5 { margin: 0 }`, `cascade/planted-rule.diff.txt`), expanded | `cascade/planted-rule-expanded.log.txt` | exit 1, `RED EXTRA-RULE .carousel-caption h5`, `VERDICT red` |
| Planted rule, rebuilt and built | `cascade/planted-rule-built.log.txt` | exit 1, `RED EXTRA-RULE .carousel-caption h5`, `VERDICT red` |
| Swapped URI (the previous mark's URI replaced by the next mark's, `cascade/swapped-uri.diff.txt`), expanded | `cascade/swapped-uri-expanded.log.txt` | exit 1, `RED DIFF .carousel-control-prev-icon { background-image }` and `RED ICON .carousel-control-prev-icon`, `VERDICT red` |
| Swapped URI, rebuilt and built | `cascade/swapped-uri-built.log.txt` | exit 1, the same red lines, `VERDICT red` |
| Restored expanded, after the partial's digest matched | `cascade/restored-expanded.log.txt` | exit 0, `VERDICT green` |
| Restored built, after a rebuild | `cascade/restored-built.log.txt` | exit 0, `VERDICT green` |

The clean expanded run reproduces round 1's `cascade-expanded.txt` reading. It lists the same keys
in the same order, and its `DEPARTURE` lines match round 1's `DIFF` lines one to one.

## Gates

- `tools/gates.sh` ran every gate on the validation copy, with the owned files copied in and the
  patch applied. It wrote one log per gate under `logs/gates/` and a summary in
  `logs/gates/summary.txt`.
- The validation copy came from
  `git -C /home/user/veneer-ca archive c3ac297 | tar -x -C tmp/probe/base`, plus
  `cp -al node_modules` and `git init`/`add`/`commit`.
- The `build:src` gate precedes the scoped runs.

| Gate | Command | Result |
| --- | --- | --- |
| Scoped format | `npx oxfmt --config .oxfmtrc.json --check <owned and shared files>` | exit 0 |
| Scoped lint | `npx oxlint --config .oxlintrc.json --deny-warnings <owned and shared .ts files>` | exit 0 |
| Format | `npm run format:check` | exit 0 |
| Lint | `npm run lint:check` | exit 0 |
| Types | `npm run check` | exit 0 |
| Build | `npm run build:src` | exit 0 |
| Carousel and close styles proofs | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/carousel.test.ts tests/src/styles/components/close.test.ts` | exit 0, `Tests  34 passed (34)` |
| Section, showcase, and barrel proofs | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/CarouselSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | exit 0, `Tests  11 passed (11)` |
| Guides | `npm run test:guides` | exit 0, `Tests  19 passed (19)` |
| Policy | `npm run test:policy` | exit 0, `Tests  109 passed \| 1 skipped (110)` |
| Setup | `npm run test:setup` | exit 0, `Tests  253 passed (253)` |
| Conformance | `npm run test:conformance` | exit 0, `Tests  22 passed (22)` |

In the worktree, `npx oxfmt --config .oxfmtrc.json --check` and
`npx oxlint --config .oxlintrc.json --deny-warnings` over the owned files each exit 0.

## Patch

`tools/make-patch.sh` writes `git -C tmp/probe/base diff -- <Shared row>` to
`/home/user/scaffold/.orkestrel/veneer/units/ca-shared-2.patch`, then proves the patch applies. `logs/patch.log.txt` records each
step:

- The file list equals the Shared row: `src/styles/index.scss`, `app/browser/constants.ts`,
  `app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/setup.ts`, `tests/setupStyles.ts`,
  `tests/setupStyles.test.ts`, `tests/app/browser/integration.test.ts`,
  `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`,
  `tests/conformance.test.ts`, `tests/setupServer.test.ts`, and `guides/veneer.md`.
- `git -C /home/user/veneer-ca/tmp/probe/base apply -R /home/user/scaffold/.orkestrel/veneer/units/ca-shared-2.patch`
  exits 0. `git diff --quiet` over the shared files then exits 0, so the copy is back at `c3ac297`.
- `git -C /home/user/veneer-ca/tmp/probe/base apply --check /home/user/scaffold/.orkestrel/veneer/units/ca-shared-2.patch`
  exits 0.
- Re-applying the patch exits 0, and the shared files return to their patched digests.
- In the worktree, `git -C /home/user/veneer-ca apply --check /home/user/scaffold/.orkestrel/veneer/units/ca-shared-2.patch`
  exits 0.

The patch path is absolute because `git -C` resolves a relative patch path from the directory it
changes into.

Apply it with `git -C /home/user/veneer-ca apply tmp/units/ca-shared-2.patch`. It carries every
round-1 hunk plus the round-2 edits in `app/browser/constants.ts` and `guides/veneer.md`.

## Deviations and settled choices

- **Deviation state:** none. No added mutation failed to redden its named case, no negative control
  read green, and every guide site the ruling names was located.
- **Height case shape:** a dedicated case rather than a loop inside the advancing case. It covers
  every specimen, so it does not belong to the advancing specimen.
- **Contrast parsing:** the case reads every `<rect>` and `<path>` `fill` from the decoded picture
  source with one regular expression, and fails any slide whose shapes do not read `rect,path`.
  It covers every captioned slide, not only the resting one, because every caption in those
  specimens is a caption the engine can display.
- **Comparator order in `built` mode:** a moved declaration order is reported as `NOTATION`, not
  failed. The clean built log shows the minifier moving distinct properties within a key (for
  example, the `.carousel-caption` properties). The expanded run enforces declaration order.
- **Paragraph wrapping:** each edited guide paragraph and the edited TSDoc remark are refilled at
  100 columns. For that reason, "the `active` class marks the resting slide and its indicator" and
  "Each control is named by its `aria-label` attribute." each span a line break in the patch.
- **Comment rewording:** the display and fade case comments name the mutations those cases catch,
  so each comment matches the matrix.
- **Log layout:** styles mutations under `logs/mutations/`, section mutations under
  `logs/section-mutations/`, round 1's section hole under `logs/round1-section-hole/`, comparator
  runs under `logs/cascade/`, gates under `logs/gates/`, and the patch steps in
  `logs/patch.log.txt`.
- **Interrupted runs:** I stopped the mutation driver with `SIGINT` before it finished in these
  runs:
  - the run under a 1500-second cap, which host load would have exceeded;
  - the run that started before the display case comment's final rewrap.

  Each stop restored the partial through the driver's `finally` clause, and the partial's bytes
  matched the worktree's afterwards. Every row in § Mutation record comes from the complete run that
  followed, against the final owned files.

## Observations

- The journey and `CAPTURE=1` did not run. They belong to the Orchestrator at landing, and so does
  R3, the caption's size at 390. The round-2 patch leaves `tests/app/browser/integration.test.ts`
  and `tests/setup.ts` byte-identical to round 1's hunks.
- `tests/setupBrowser.ts`, the vendored files, `ROADMAP.md`, `README.md`, `package.json`, and every
  sibling unit's file are untouched.
