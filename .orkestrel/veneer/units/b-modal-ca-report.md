# Unit CAROUSEL (`ca`) report

`opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-ca` (branch `unit/ca` over `c3ac297`). Effective brief: `/home/user/veneer-ca/tmp/units/ca-brief.md`. No bench lane ran, so there is no journal.

The harness refused to let the unit write `tmp/units/ca-report.md` ("Subagents should return findings as text, not write report files"), so its final message is the report; the Orchestrator captured it to this file. The unit wrote `/home/user/veneer-ca/tmp/units/ca-shared.patch`, `/home/user/veneer-ca/tmp/units/ca.diff`, and `/home/user/veneer-ca/tmp/units/ca-status.txt` (retained as `ca-shared.patch`, `ca.diff`, `ca-status.txt`; its instruments and logs, written under the Orchestrator's scratchpad, are retained under `ca-instruments/`).

## Outcome

- **Shipped:** the `carousel` key ships in `src/styles/components/_carousel.scss`. It matches the pinned inventory exactly, except for the departures the ledger measured, which the guide records.
- **Written:** the owned files: the partial, both proofs, and the `CarouselSection` class.
- **Shared files:** every shared change is in the patch at the end. It is also written to `tmp/units/ca-shared.patch`.
- **Gates:** every gate that needs a shared file ran on the validation copy `tmp/probe/base`. That copy is the `c3ac297` archive with hardlinked `node_modules`, the owned files copied in, and the shared edits applied. `tmp/probe/` is deleted.
- **Renamed names:** two names the brief fixed would fail a registry law in `tests/setup.test.ts`, so I renamed them (§ Deviations, items 1 and 2):
  - The `Dark carousel` specimen is `Inverted carousel`.
  - The driven rows are `captioned-carousel-hover` and `captioned-carousel-focus`.

## Touched files (owned)

| File | Summary |
| --- | --- |
| `src/styles/components/_carousel.scss` (new, 206 lines) | Every recorded carousel rule in `@layer components`. Each transition goes through the `transition` mixin. The controls paint `--vn-palette-white-base` and use `--vn-motion-feedback`. The indicator inset is `--vn-space-8`. `.carousel-dark` reads `tokens.$dark`. The marks are the recorded data URIs without the `/*rtl:*/` comment. There is no `mask-image`. |
| `tests/src/styles/components/carousel.test.ts` (new, 574 lines) | The cascade proof. It reads selectors, display, track clearing and clip, both advance directions, the lone incoming slide, the fade, transitions at rest and under reduced motion, the motion and density factors, controls, marks, hover and focus, forced colors, pips, caption, swipe class, and the dark retune beside a dark island and a nested light island. |
| `app/browser/sections/CarouselSection.ts` (new, 20 lines) | A `SpecimenSection` subclass fed by `CAROUSEL_COPY` and `CAROUSEL_SPECIMENS`. |
| `tests/app/browser/sections/CarouselSection.test.ts` (new, 214 lines) | The section proof: region contract, no `[style]`, no `.slide`, images, indicator and control names, `aria-current`, caption contrast over its picture, the advancing slide painting, and destruction. |

- **Diffstat:** `git -C /home/user/veneer-ca diff c3ac297` is empty, because every owned file is untracked. The line counts in the table come from `git diff --no-index --numstat /dev/null <file>`.
- **Status:** `git status --porcelain` lists exactly the owned files as `??`. `tmp/units/ca.diff` and `tmp/units/ca-status.txt` hold both readings.
- **Shared patch:** `git apply --stat` reports `13 files changed, 430 insertions(+), 11 deletions(-)`.

## Unknowns, answered

- **Image baseline gap: none.** The elements layer writes `img { display: block }` (`src/styles/elements/_img.scss`). In a browser probe on the validation copy, every displayed slide measured 207px, the same as its picture. The section proof asserts that the incoming slide and its picture have the same height. No utility was added.
- **Shared Tailwind names: none for carousel.** A probe compiled `TAILWIND_PATHS.instrument` against the built cascade with carousel loaded. The candidate list `tmp/tailwind/candidates.txt` carried every carousel name. `collectSharedNames` returned `col-1` … `col-12`, `col-auto`, `container`, `table`, `caption-bottom`, and `caption-top`. That is the existing excluded set: no `carousel*` name, `pointer-event`, or `active`. Under M17, `test:service` stays an observation. I did not run it.

## Ledger rows the gate measured

Additions: none. Deferrals: none. No claim collision was thrown. The departures are under `#### carousel` in the patch:

- `.carousel-item`, `-webkit-backface-visibility`: `hidden` → `—` (dropped).
- `.carousel-control-prev` and `.carousel-control-next`, `color`: `#fff` → `var(--vn-palette-white-base)` (tokenized). The same row applies to each `:hover` and `:focus` twin.
- `.carousel-control-prev` and `.carousel-control-next`, `transition`: `opacity 0.15s ease` → `opacity var(--vn-motion-feedback) var(--vn-ease-standard)` (tokenized).
- `.carousel-indicators`, `margin-bottom`: `1rem` → `var(--vn-space-8)` (tokenized).
- `.carousel-dark`, `--bs-carousel-indicator-active-bg` and `--bs-carousel-caption-color`: `#000` → `var(--vn-palette-black-base)` (tokenized).

The ledger does not measure the `:root` and `[data-bs-theme]` triple, because it stays under `theme` (X1).

**Criterion 2, built cascade.**
- **Expanded compile** (the one the ledger reads): rule by rule against the inventory, every recorded selector and condition is present with its declarations, and the only differences are exactly the departure rows. No other rule names a carousel class.
- **Marks:** both icon URIs equal the recorded values after `normalizeDeclarationValue`, which trims the trailing space the release leaves.
- **Minified `dist/src/styles/index.css`:** it carries all 37 recorded selector-and-condition entries and no extra rule. The minifier rewrites notation only:
  - `translateX(±100%)` → `translate(±100%)`
  - `::after` → `:after`
  - `background: none` → `0 0`
  - the pip borders merged into `border: 10px solid #0000` plus `border-left: 0` and `border-right: 0`
  - `flex: 0 1 auto` → `0 auto`
  - leading zeros dropped

## Resting rows and subjects (`tests/setup.ts`, appended)

`CaptureSubject` adds `Captioned carousel`, `Fading carousel`, `Inverted carousel`, and `Advancing carousel`.

| Scenario | Subject | Selector | Property |
| --- | --- | --- | --- |
| `captioned-carousel` | `Captioned carousel` | `.carousel-caption` | `color` |
| `fading-carousel` | `Fading carousel` | `.carousel-fade .carousel-item.active` | `opacity` |
| `inverted-carousel` | `Inverted carousel` | `.carousel-dark .carousel-caption` | `color` |
| `advancing-carousel` | `Advancing carousel` | `.carousel-item-next.carousel-item-start` | `transform` |

- **Driven rows (`DRIVEN_KEYS`):** `captioned-carousel-hover` and `captioned-carousel-focus`, both with subject `Captioned carousel`. The journey case `drives a carousel control to hover and to focus and photographs each state` lifts the specimen and shoots both frames under reduced motion. The pointer leaves before focus, and the case asserts `[rest, hovered, focused, rested]` equals `['0.5', '0.9', '0.9', '0.5']`.
- **Declined frames (M2), recorded in the `CASCADE_KEYS` remarks, the `CAROUSEL_SPECIMENS` remarks, and the guide:**
  - A lone `carousel-item-next` rests outside its track, so its frame would be the resting frame.
  - `pointer-event` changes no paint.
  - The backward advance and the fade's outgoing slide leave the incoming slide at rest in the track, which is the paint of the advancing and fading frames.

## R19 proof matrix

Cases are in `carousel.test.ts` unless named. "Section" means `CarouselSection.test.ts`. The mutation names are the entries in § Failing-first and mutation record.

| Recorded selector and condition | Proof case | Distinguishing mutation | Specimen | Capture scenario |
| --- | --- | --- | --- | --- |
| `.carousel` | `pins each control to its side over the whole carousel and reads the filter from its variable`; `lays every displayed slide over the track and clears the floats beneath it` | `carousel-position-dropped` | every specimen | every carousel row |
| `.carousel.pointer-event` | `restricts touch to vertical panning on a carousel carrying the pointer-event class` | `pointer-event-dropped` | none: declined (M2) | none |
| `.carousel-inner` | the track case (`position`, `width`, `overflow`); `moves the resting slide out and paints the incoming slide in place, in each direction` | `track-overflow-dropped` | every specimen | every carousel row |
| `.carousel-inner::after` | the track case reads the `::after` box directly, because the hidden overflow also contains the floats | `clearfix-dropped` | every specimen | every carousel row |
| `.carousel-item` | `displays only the resting slide and the incoming slides`; the track case | `item-display-block` | every specimen | every carousel row |
| `.carousel-item` under `@media (prefers-reduced-motion: reduce)` | `collapses the slide, fade, control, and indicator transitions under the reduced-motion preference` | `item-bare-transition` | every specimen | none |
| `.carousel-item.active` | the display, track, and advance cases | `active-display-dropped` | every specimen | every carousel row |
| `.carousel-item-next` | the display case; `holds a lone incoming slide one width to the side it arrives from` | `next-guard-dropped` | `Advancing carousel` | `advancing-carousel` |
| `.carousel-item-prev` | the same two cases | `prev-guard-dropped` | none: backward advance declined | none |
| `.carousel-item-next:not(.carousel-item-start)` | the lone-slide case and the advance case | `next-guard-dropped` | none: lone slide declined (M2) | none |
| `.active.carousel-item-end` | the advance case, backward track | `active-end-dropped` | none: declined | none |
| `.carousel-item-prev:not(.carousel-item-end)` | the lone-slide case | `prev-guard-dropped` | none: declined | none |
| `.active.carousel-item-start` | the advance case, forward track; section `paints the incoming slide in the advancing carousel while the resting slide moves out` | `active-start-dropped`; section `advancing-direction-dropped` | `Advancing carousel` | `advancing-carousel` |
| `.carousel-fade .carousel-item` | `stacks the slides in place and crosses their opacity, holding the outgoing slide for the slide duration` | `fade-item-opacity-dropped` | `Fading carousel` | `fading-carousel` |
| `.carousel-fade .carousel-item.active` | the fade case; the section caption case (resting opacity `1`) | section `fade-class-dropped` | `Fading carousel` | `fading-carousel` |
| `.carousel-fade .carousel-item-next.carousel-item-start` | the fade case | `fade-incoming-dropped` | none: declined | none |
| `.carousel-fade .carousel-item-prev.carousel-item-end` | the fade case | `fade-prev-incoming-dropped` | none: declined | none |
| `.carousel-fade .active.carousel-item-start` and `-end` | the fade case (`opacity 0s 0.6s`, `z-index: 0`) | `fade-delay-dropped` | none: declined | none |
| the same pair under `@media (prefers-reduced-motion: reduce)` | the motion case | `fade-bare-transition` | none | none |
| `.carousel-control-prev` and `.carousel-control-next` | the controls case; `rescales the control transition with the published motion factor` | `control-literal-filter`; `control-literal-duration` | `Captioned carousel`, `Fading carousel`, `Inverted carousel` | `captioned-carousel`, `inverted-carousel` |
| the same pair under `@media (prefers-reduced-motion: reduce)` | the motion case | `control-bare-transition` | the same | none |
| `.carousel-control-prev:hover` and `.carousel-control-next:hover` | `moves a control from half to nine-tenths opacity under the pointer and on focus, and back` | `hover-dropped` | `Captioned carousel` | `captioned-carousel-hover` |
| `.carousel-control-prev:focus` and `.carousel-control-next:focus` | the same case; `keeps the focus opacity under forced colors, where the control draws no outline` (M16) | `focus-dropped` | `Captioned carousel` | `captioned-carousel-focus` |
| `.carousel-control-prev { left: 0 }` and `.carousel-control-next { right: 0 }` | the controls case (an inline start padding separates `left: 0` from the static position) | `prev-left-dropped` | `Captioned carousel`, `Fading carousel`, `Inverted carousel` | `captioned-carousel` |
| `.carousel-control-prev-icon` and `.carousel-control-next-icon` | `paints each control its own recorded mark at the recorded size`; `tests/setupStyles.test.ts` `derives each control mark and the dark filter from the official declarations` | `icons-swapped` | the same | `captioned-carousel`, `inverted-carousel` |
| `.carousel-indicators` | `lays the pips out as bars inside a taller transparent target, the current one at full strength`; `rescales the strip inset with the published density factor` | `indicator-literal-inset` | `Captioned carousel`, `Inverted carousel` | the same rows |
| `.carousel-indicators [data-bs-target]` | the pips case | `indicator-border-box`; section `indicator-target-dropped` | the same | the same |
| the same under `@media (prefers-reduced-motion: reduce)` | the motion case | `indicator-bare-transition` | the same | none |
| `.carousel-indicators .active` | the pips case | `active-pip-dropped`; section `aria-current-dropped` | the same | the same |
| `.carousel-caption` | `insets the caption over the lower part of the carousel and paints it from its variable`; the section caption case | `caption-literal-white`; section `captions-dropped` | the same | `captioned-carousel` |
| `.carousel-dark` | `retunes all three variables on the dark class and inside a dark island, and a light island restores them`; the section caption case | `dark-omits-filter`; section `inverted-class-dropped` | `Inverted carousel` | `inverted-carousel` |
| the whole written set | `writes the recorded carousel selectors and no other rule on their classes`; `tests/setupStyles.test.ts` `binds the carousel selector table to the official inventory, each name once` | `extra-rule` | — | — |

## Failing-first and mutation record (validation copy)

**Styles proof command:**

```text
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/carousel.test.ts
```

- **Failing-first:** with the barrel line absent, exit 1, `Tests 17 failed (17)`. With the line present, exit 0, `Tests 17 passed (17)`. Final green after restore: exit 0, `17 passed (17)`.
- **Method:** each mutation edited the partial, rebuilt with `build:src:styles`, ran the command, and restored the partial to a matching SHA-256.

Results (the red cases always include the named case):

| Mutation | Result | Red cases |
| --- | --- | --- |
| `item-display-block` | 1 failed | display case |
| `next-guard-dropped` | 2 failed | advance case, selector-set case |
| `prev-guard-dropped` | 2 failed | advance case, selector-set case |
| `active-end-dropped` | 2 failed | advance case, selector-set case |
| `active-start-dropped` | 2 failed | advance case, selector-set case |
| `active-display-dropped` | 4 failed | display, track, advance, and selector-set cases |
| `fade-delay-dropped` | 2 failed | fade case, motion case |
| `fade-item-opacity-dropped` | 1 failed | fade case |
| `fade-incoming-dropped` | 2 failed | fade case, selector-set case |
| `fade-prev-incoming-dropped` | 2 failed | fade case, selector-set case |
| `fade-bare-transition` | 1 failed | motion case |
| `item-bare-transition` | 1 failed | motion case |
| `control-bare-transition` | 1 failed | motion case |
| `indicator-bare-transition` | 1 failed | motion case |
| `control-literal-duration` | 1 failed | motion-factor case |
| `control-literal-filter` | 2 failed | controls case, dark retune case |
| `prev-left-dropped` | 1 failed | controls case |
| `carousel-position-dropped` | 5 failed | controls, caption, pips, track, and selector-set cases |
| `track-overflow-dropped` | 1 failed | track case |
| `icons-swapped` | 1 failed | marks case |
| `indicator-border-box` | 1 failed | pips case |
| `active-pip-dropped` | 2 failed | pips case, selector-set case |
| `indicator-literal-inset` | 1 failed | density case |
| `caption-literal-white` | 2 failed | caption case, dark retune case |
| `dark-omits-filter` | 1 failed | dark retune case |
| `pointer-event-dropped` | 2 failed | pointer-event case, selector-set case |
| `hover-dropped` | 2 failed | hover and focus case, selector-set case |
| `focus-dropped` | 3 failed | forced-colors case, hover and focus case, selector-set case |
| `clearfix-dropped` | 2 failed | track case, selector-set case |
| `extra-rule` | 1 failed | selector-set case |

**Section proof command:**

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/CarouselSection.test.ts
```

- The control run passed `5 passed (5)`. Each mutation edited `app/browser/constants.ts` and was restored by digest.
- Every mutation below failed `1 failed | 4 passed (5)` on its named case:
  - `advancing-direction-dropped` → the advancing case.
  - `inverted-class-dropped` → the caption case.
  - `fade-class-dropped` → the caption case.
  - `slide-class-added` → the contract case.
  - `inline-style-added` → the contract case.
  - `aria-current-dropped` → the names case.
  - `control-label-dropped` → the names case.
  - `indicator-target-dropped` → the names case.
  - `captions-dropped` → the names case.

**Ledger plant:** `npm run test:conformance` with the caption `bottom: 1.3rem` exits 1 with `1 failed | 21 passed (22)`. It prints `carousel | .carousel-caption | bottom | — | 1.25rem | 1.3rem | declared`.

**Baseline at `c3ac297`, in the worktree:**
- `npm run test:conformance`: exit 0, `22 passed (22)`.
- The close proof: exit 0, `17 passed (17)`.

## Gates

Worktree:
- `npm run format:check`: exit 0.
- `npm run lint:check`: exit 0.

Validation copy, final state (`gates.sh`):

| Gate | Result |
| --- | --- |
| `oxfmt --check` and `oxlint --deny-warnings`, scoped to the owned and shared files | exit 0 |
| `npm run check` | exit 0 |
| `npm run build:src` | exit 0 |
| carousel styles proof | exit 0, `17 passed (17)` |
| close proof | exit 0, `17 passed (17)` |
| section proof | exit 0, `5 passed (5)` |
| `npm run test:conformance` | exit 0, `22 passed (22)`, with `carousel` in `listed`, and the order case extended |
| `npm run test:guides` | exit 0, `19 passed (19)` |
| `npm run test:policy` | exit 0, `109 passed \| 1 skipped (110)` |
| `npm run test:setup` | exit 0, `253 passed (253)` |
| `npm run test:app` | exit 0, `70 passed (70)` |

- **Early `test:setup` failures:** an earlier `test:setup` run under host contention had `setupServer.test.ts` timeouts. The final run is green.
- **Journey (observation):** `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot` exited 0 with `Tests 156 passed (156)` at every registered variant, without `CAPTURE=1`. It ran before the final edits, which touched only comments (remarks in `constants.ts` and `setup.ts`) and the guide. The capture run is yours.
- **Patch checks:**
  - `git apply --check` of `ca-shared.patch` passes in the worktree and on a fresh `c3ac297` extraction.
  - `git apply -R --check` passes on the validation copy.
  - A fresh extraction with the owned files and `patch -p1` applied cleanly.

## Guide text (inside the patch)

- **§ Files:** a `_carousel.scss` row after `_close.scss`.
- **`### Carousel classes`:** between Close and Spinner, in barrel order. It includes the M12 sentence ("The engine reads the `slide` class to decide whether a change animates, and no Veneer rule reads it."), the M2 decline sentences, the departure bullets, and the proof paragraph.
- **The M8 rewrites:** `### Bootstrap variables Veneer retains` now states which declarations the `carousel` key measures, drops "no shipped component claims them", and records `mask-image` as outside the baseline. The carousel sentence in `### Outside the ledger` is rewritten to match.
- **Departures:** a `#### carousel` table after `#### btn-close`.
- **§ Compatibility:** `carousel | selector` and `carousel | variable` rows. The `engine | plugin` row for Carousel follows R8: it names the `Swipe` utility and ends "Owner: J-ENGINE.". The R8 sentence follows the table.
- **Links:** a § Showcase pointer paragraph with links, and § Tests links.

## Deviations

1. **`Dark carousel` renamed `Inverted carousel`.**
   - Expected: criterion 4's name.
   - Found: `tests/setup.test.ts` `carries no mode token in a scenario, because the variant names the mode` fails on it with `expected [ 'dark-carousel' ] to strictly equal []`.
   - Done: the specimen keeps `.carousel-dark` over light pictures, following the `Close inverted` precedent. The section proof, remarks, and guide say why.
2. **Driven rows `carousel-control-hover` and `-focus` became `captioned-carousel-hover` and `-focus`.**
   - Found: `names each driven row for its subject's stem and one state, on a specimen the resting registry photographs or one it exempts by name` requires the stem to be the subject's own, and the subject to have a resting row. A `carousel-control` stem would need a fifth specimen named `Carousel control`, outside criterion 4's specimen set.
   - Evidence: read from that case's code. I did not plant it.
3. **M8's "the variant loop iterates `tokens.$aliased`" has no subject in this key.** The release's carousel has no variant loop, so I wrote nothing for it.
4. **How I read criterion 3.** The installed `stageMedia` takes `MediaOptions`, so "`stageMedia(REDUCED_MOTION)`" is staged as `{ motion: false }`. `REDUCED_MOTION` is compared as the condition text on the declared rules. "Reads `none`" is `transition-property: none` with `0s`. The resolved dark filter reads `invert(1) grayscale(1)`, because Chromium clamps `grayscale(100)`, and the proof says so.
5. **Choices I settled inside the unit:**
   - `--vn-space-8` for the indicator inset under ruling 5. The caption's `1.25rem` stays literal, because no token matches.
   - `--vn-ease-standard` beside `--vn-motion-feedback`, following the form-check and icon-link precedent.
   - Specimen copy, names, and element ids.
   - The `:has()`-free selectors on the capture rows.
   - Row positions at the end of each table.
6. **Parallel collision.** At `c3ac297` there is no `plugin` row, so this patch adds the R8 sentence. ALERT may add the same sentence, so keep one copy at integration.
7. **Terrain against the tree.** The only disagreement is line drift: the retained-variables and outside-ledger paragraphs sit at about lines 2191 and 3781, not the lines the terrain gives.

`tests/setupBrowser.ts`, `ROADMAP.md`, the vendored files, and every off-limits file are untouched.

Instruments are retained under `/home/user/scaffold/.orkestrel/veneer/units/ca-instruments/` (`tools/`: `mutate.py`, `mutate-section.py`, `record.sh`, `gates.sh`, `apply-guide.py`, `specimens.py`, `make-patch.sh`, `row.py`, and `guide/*.md`; `logs/`: `mutations.log.txt`, `section-mutations.log.txt`, `gates/summary.txt`, `gates/cascade-*.txt`, `journey1.log.txt`, `conf-mut.log.txt`, and `baseline-*.log.txt`).

## Shared patch (`ca-shared.patch`, against `c3ac297`)

The exact patch is `ca-shared.patch`, 711 lines. It covers:
- `src/styles/index.scss`: `@use 'components/carousel';` directly before `components/spinner`.
- `app/browser/constants.ts`: `CAROUSEL_COPY`, and `CAROUSEL_SPECIMENS` with the captioned, fading, inverted, and advancing specimens.
- `app/browser/Showcase.ts`: the import, and the construction after `InputGroupSection`.
- `app/browser/index.ts`: the barrel row.
- `tests/setup.ts`: the subjects, the decline remark, the resting rows, and the driven rows.
- `tests/setupStyles.ts`: `CAROUSEL_SELECTORS`, `CAROUSEL_MARKS`, and `CAROUSEL_INVERSION`.
- `tests/setupStyles.test.ts`: the import, the export list, and the `carousel case tables` describe.
- `tests/app/browser/integration.test.ts`: the import, the driven carousel case, and the declared list.
- `tests/app/browser/Showcase.test.ts` and `tests/app/browser/index.test.ts`: the enumerations.
- `tests/conformance.test.ts`: `'carousel'` in `listed`, in `passiveNames`, and in the expected order after `close`.
- `tests/setupServer.test.ts`: the component set.
- `guides/veneer.md`: every change in § Guide text.

Apply it with `git -C /home/user/veneer-ca apply tmp/units/ca-shared.patch` after copying in the owned files.
