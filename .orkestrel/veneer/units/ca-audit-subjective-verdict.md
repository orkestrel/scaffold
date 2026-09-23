I held the subjective lane: `reviewer` on Opus 5.5, read-only, clean context. I ran nothing, so every verdict below comes from reading source, logs, and retained instruments. The capture portfolio was not supplied, so every rendered-appearance question is marked NOT-EVIDENCED or referred. Paths below are relative to `/home/user/scaffold/.orkestrel/veneer/units/` unless they are absolute.

## Per-claim verdicts

**1. Delta and scope — CONFIRMED.**
- `ca-status.txt:1-4` lists exactly the four owned files as `??`, and nothing else.
- `ca-shared.patch` touches only files named in the brief's Shared row (`b-modal-ca-brief.md:36`):
  - `src/styles/index.scss`
  - `app/browser/constants.ts`, `Showcase.ts`, and `index.ts`
  - `tests/setup.ts`, `setupStyles.ts`, and `setupStyles.test.ts`
  - `integration.test.ts`, `Showcase.test.ts`, and `index.test.ts`
  - `conformance.test.ts` and `setupServer.test.ts`
  - `guides/veneer.md`
- It has no hunk in a vendored file, a sibling unit's file, `src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, `README.md`, or `ROADMAP.md`.
- Every `-` line sits in the two M8 paragraphs (`ca-shared.patch:604-611` and `:654-656`). That is 11 removed lines, which matches the report's `git apply --stat` line.

**2. The partial and the cascade — UNRESOLVED.**
- Held on source:
  - one `@layer components` block;
  - every transition written through the `transition` mixin (`ca.diff:47,86,111,187`);
  - the controls read `--vn-palette-white-base`, `--vn-motion-feedback`, and `--vn-ease-standard` (`ca.diff:105,111,118`);
  - the indicator inset reads `--vn-space-8` (`ca.diff:165`);
  - `.carousel-dark` reads `tokens.$dark` (`ca.diff:207-211`);
  - no `mask-image`;
  - the barrel line sits directly before `components/spinner` (`ca-shared.patch:7-8`);
  - a grep of `/home/user/veneer-ca/src/styles` finds carousel selectors only in `_carousel.scss`. `_mixins.scss:332-334` and `_tokens.scss` hold only the `theme` triple.
- Not settled: the expanded and minified rule-for-rule comparisons. They exist only as `ca-instruments/logs/gates/cascade-expanded.txt` and `cascade-built.txt`. Those logs were written by `cascade-check.mjs` (`ca-instruments/tools/gates.sh:24-25`), and that script was not retained (see F1). Without the instrument, its matching logic and its negative control cannot be checked.
- What settles it: the objective lane re-runs the comparison against a retained instrument that has a control.

**3. The cascade proof — BROKEN** (on the R19 matrix clause only).
- Held:
  - Failing-first: the barrel line absent gives `17 failed (17)`, and restoring it gives `17 passed (17)` (`ca-instruments/logs/mutations.log.txt:1-6`).
  - Every criterion-3 mutation ran red on its named case (`mutations.log.txt:7-129`; the edits are defined in `mutate.py:9-38`). Examples: `item-display-block` turns only the display case red; `control-literal-filter` turns the controls and dark-retune cases red, because a literal filter cannot give both `none` in light and `blur(1px)` under a consumer retune.
  - All nine section mutations turn their named case red (`section-mutations.log.txt:3-29`).
  - The ledger plant fails the ledger case on `carousel | .carousel-caption | bottom | — | 1.25rem | 1.3rem | declared` (`conf-mut.log.txt:12-21`).
- Broken: three matrix rows name a mutation that edits a different recorded rule from the row's own, and no mutation of the row's own declaration was run:
  - `.carousel-item-next` (`b-modal-ca-report.md:88`) and `.carousel-item-prev` (`:89`) name `next-guard-dropped` and `prev-guard-dropped`. Those edit the `:not(...)` transform guards (`mutate.py:10-11`). The row's own declaration, `display: block` in the `.carousel-item.active, .carousel-item-next, .carousel-item-prev` list, was never removed.
  - `.carousel-fade .carousel-item.active` (`:95`) names only the section mutation `fade-class-dropped`. That edits specimen markup (`mutate-section.py:16`), not the cascade rule.
  - The `.carousel-control-next { right: 0 }` half of row `:104` has no mutation; only `prev-left-dropped` ran.
- The assertions would catch each missing mutation (the display case expects `block` for both incoming slides; the fade case expects `['1','1',…]` on the active slide; the controls case asserts `right === frame.right`), but none of them was run.
- Fix: add `next-display-dropped`, `prev-display-dropped`, `fade-active-dropped` (drop `.carousel-fade .carousel-item.active,` from the z-index and opacity rule), and `next-right-dropped` to `mutate.py`. Run each and record it red on its named case. Correct the matrix's mutation column to match.

**4. The section and the specimens — BROKEN** (on one clause).
- Held:
  - `CarouselSection` matches the `CloseSection` shape line for line (`ca.diff:810-818`).
  - The specimens are `Captioned carousel`, `Fading carousel`, `Inverted carousel`, and `Advancing carousel`: modifier first, as M14 requires.
  - The captioned and inverted carousels carry `data-bs-target`, `aria-current` on the first indicator, and uniquely named `aria-label` controls. Captions sit on every slide.
  - No `slide` class and no `style` attribute (`ca-shared.patch:51-66`). The `data-bs-slide` attributes are engine triggers, not the class.
  - Every slide is an `img.img-fluid` over an SVG data document.
- The rename is required, not a taste call:
  - `/home/user/veneer-ca/tests/setup.test.ts:92` rejects any `(?:^|-)(?:light|dark)(?:-|$)` scenario, so `dark-carousel` cannot exist.
  - "Inverted" matches the `Close inverted` precedent (`/home/user/veneer-ca/app/browser/constants.ts:1486`).
  - The name describes the effect the class produces (white marks, caption, and pips become black).
- The copy keeps the precedent voice: "Compare …" plus "Hover or focus a control to compare its states.", the form the DROPDOWN F1 ruling accepted.
- Broken: the claim says the section proof asserts that **every** displayed slide is as tall as its picture. The proof asserts it for one slide only, the advancing specimen's incoming slide (`ca.diff:1012`).
  - A stray block inside a captioned slide outside `.carousel-caption` would change that slide's height and pass every case.
  - The guide sentence at `ca-shared.patch:530-531` generalizes to "a slide", so the claim, not the report, is the part that overreaches (`b-modal-ca-report.md:32` states one slide).
- Fix: in the advancing case, or a dedicated case, loop over every `.carousel-item.active, .carousel-item-next` in every specimen and assert `slide.getBoundingClientRect().height === picture.getBoundingClientRect().height`. Run the stray-block mutation red on it.
- See also the referral on the caption-contrast reading (R2).

**5. The capture rows — CONFIRMED.**
- The four `CaptureSubject` members, the four resting rows appended at the registry's end, and the driven rows on `Captioned carousel` are present (`ca-shared.patch:100-103,126-149,157-158`). No `CaptureState` member was added.
- The driven stems are required by `/home/user/veneer-ca/tests/setup.test.ts:104-110`. A `carousel-control` stem would need a fifth subject.
- The decline remark in `tests/setup.ts` (`ca-shared.patch:111-117`) and the specimen remarks (`:40-45`) agree with the guide.
- Each row's selector resolves inside its own specimen's markup. The first `.carousel-caption` in each specimen sits in its `active` slide.
- The journey assertion is at `ca-shared.patch:394`. Mutation named: dropping `:hover` from the state rule leaves `hovered` at `'0.5'`. The `toStrictEqual(['0.5','0.9','0.9','0.5'])` assertion catches that, and `shotDuration` `'0s'` stops a frame from landing mid-transition.
- The frames themselves are not claimed and are not in evidence.

**6. The tables, the ledger, and the deferrals — CONFIRMED.**
- `CAROUSEL_SELECTORS`, `CAROUSEL_MARKS`, and `CAROUSEL_INVERSION` follow the `CLOSE_*` naming and are bound in `carousel case tables` (`ca-shared.patch:263-300`).
  - Mutation named: drop one selector from the table. The set-equality assertion catches it.
  - Mutation named: swap `prev` and `next`. The `normalizeDeclarationValue(prev) === CAROUSEL_MARKS.prev` assertion catches it.
- `carousel` is added to `listed`, `passiveNames`, and the expected order after `close` (`ca-shared.patch:470,478,486`), and to the component set (`:496`).
- No deferral row and no addition row.
- The `#### carousel` rows (`:634-645`) match the `DIFF` lines at `cascade-expanded.txt:40-51` one to one.
- `22 passed (22)` (`gates/summary.txt:8`).

**7. The guide content — CONFIRMED.**
- The pieces sit where the claim names them:
  - `### Carousel classes` sits between Close and Spinner (`ca-shared.patch:514-597`).
  - The M12 sentence appears verbatim (`:519-521`).
  - The M2 decline sentences are at `:583-588`.
  - The departure bullets are at `:564-576`.
  - The proof paragraph is at `:590-595`.
  - `#### carousel` follows `#### btn-close`.
  - The selector, variable, and plugin rows are present, with the plugin row naming `Swipe` and ending "Owner: J-ENGINE." (`:668-669,677`).
  - The § Files row follows `_close.scss` (`:506`).
  - The § Tests links sit in both lists (`:700,708`).
- The region pointer sits inside the class section in the Close form. Compare "The Carousel region renders…" (`:578`) with "The showcase's Close region carries…" (`/home/user/veneer-ca/guides/veneer.md:1595`).
- The added § Showcase paragraph (`:688-691`) is a decline pointer in the grow-spinner form (`veneer.md:4034-4038`), not a second region pointer.
- The M8 rewrites state what the `carousel` key measures, drop "no shipped component claims them", and put `mask-image` outside the baseline (`:612-622`). The outside-ledger sentence (`:657-660`) links correctly through "that `theme` vocabulary".
- R17: no sentence claims Veneer script behaviour. Engine behaviour appears only in the sentence M12 requires, in the § Compatibility pointer, and in the plugin row.
- The voice matches the Close, Badge, and List group sections.
- Optional polish, not a finding: "so no ledger row measures them there" (`:615-616`); the word "there" has no clear referent and can be deleted.

**8. Law and report — BROKEN.**
- Held:
  - No `any`, no `as` other than `as const`, no `!`, no suppression, no mock, and no nested function other than callbacks passed directly.
  - The SCSS uses no literal color other than the `transparent` keyword and the recorded data URIs.
  - The report bounds every deviation the claim names (`b-modal-ca-report.md:222-240`).
- Broken, by the same standard as the DROPDOWN claim 8 ruling (`dd-audit-verdict.md:23`):
  - **Bare class tokens.** `ca.diff:12-14`: "`active` marks the resting slide, `carousel-item-next` and `carousel-item-prev` mark …, and `carousel-item-start` and `carousel-item-end` mark …". `ca-shared.patch:29`: "`active` marks the resting slide and its indicator". Fix: "the `active` class marks…", "the `carousel-item-next` and `carousel-item-prev` classes mark…", "the `carousel-item-start` and `carousel-item-end` classes mark…".
  - **Counts.** `ca-shared.patch:558` "the three `--bs-carousel-*` variables" should be "the `--bs-carousel-*` variables". `:616` "the same three variables" should be "the same variables". `ca.diff:734` "omits one of the three variables" should be "omits one of its variables". `ca.diff:736`, the test title "retunes all three variables…", should be "retunes every carousel variable…".
- Referred, not ruled: the report names no command for the close proof or for the scoped `oxfmt` and `oxlint` gates. `gates.sh:12-13,17` holds them.
- Counts the report states, listed for the record:
  - "two names the brief fixed" (`:13`) and "(§ Deviations, items 1 and 2)" (`:13`, which also names list items by position);
  - "all 37 recorded selector-and-condition entries" (`:50`);
  - the file sizes "206 lines", "574 lines", "20 lines", "214 lines", and "711 lines";
  - "`13 files changed, 430 insertions(+), 11 deletions(-)`";
  - "207px";
  - the run tallies `17 failed (17)`, `17 passed (17)`, `5 passed (5)`, `1 failed | 4 passed (5)`, `1 failed | 21 passed (22)`, `22 passed (22)`, `19 passed (19)`, `109 passed | 1 skipped (110)`, `253 passed (253)`, `70 passed (70)`, and `156 passed (156)`;
  - the per-mutation "1 failed" to "5 failed" column;
  - the deviations list numbered 1 to 7.

## Findings outside the claims

- **F1. An instrument was not retained.** `ca-instruments/tools/gates.sh:24-25` runs `node cascade-check.mjs`, but `ca-instruments/tools/` does not contain that script, and `tmp/probe/` was deleted. The built-cascade evidence behind claim 2 cannot be re-run, and its control cannot be checked. This breaks the retention rule "the exact executed script or instrument" (`.agents/orchestration.md` § Dispatch anatomy). Fix: the fix round re-authors the comparator, runs it with a negative control (plant one extra carousel rule), and the script is retained under `ca-instruments/tools/`.
- **F2. The report states counts and names list items by position.** Recorded under claim 8. The worst cases are "two names", "items 1 and 2", and "all 37 … entries". Fix: name the members instead ("the `Dark carousel` specimen name and the driven-row stems"), cite the deviations by their headings, and write "every recorded selector-and-condition entry".

## Attacked and held

- **Rename forced?** I checked whether the unit could have kept `Dark carousel`. It could not: the regex at `setup.test.ts:92` rejects it. A `carousel-control-*` stem would need a subject outside the four specimens.
- **Engine vocabulary.** I checked whether "the engine reads…" sentences overstep R17. Every one is the M12 sentence or a § Compatibility pointer. The plugin row states an obligation, not something Veneer does.
- **Decline reasoning.** I tested whether declining the backward-advance frame contradicts keeping the Advancing specimen. It does not: M2 admits `Advancing carousel` by name, and the backward frame duplicates the forward paint.
- **Vocabulary.** `pip` for each indicator button and `indicators` for the strip, `mark` for the icon (as in Close), and resting, incoming, and outgoing slide are each used for one concept throughout.
- **Test pattern precedent.** The `beforeAll` stylesheet import in the section proof follows `ButtonSection.test.ts:22` and `InputGroupSection.test.ts:15`. The "The mutation this catches" test comments follow `placeholder.test.ts`, `progress.test.ts`, and `spinner.test.ts`.
- **Position of the § Tests entries.** They keep alphabetical order in the application list and barrel order in the style list.

## Referrals

- **R1 (to the Orchestrator): a sentence that goes stale when `visually-hidden` ships.** "Each control is named by its `aria-label` attribute, because the visually hidden label … is a utility this cascade does not ship" (`ca-shared.patch:581-583`, and the remarks at `:33-35`). This becomes false when UTIL-PLACEMENT ships `visually-hidden` (M12). `/home/user/veneer/src/styles` has no `visually-hidden` yet. Name the unit that rewrites both sentences, and decides whether the specimens adopt the release's hidden-label markup, at whichever of CAROUSEL and UTIL-PLACEMENT lands second.
- **R2 (to the objective lane): the contrast proof reads the wrong colour.** The contrast case (`ca.diff:962-974`) measures the caption against the SVG `<rect>` fill parsed from the source. The caption text actually sits partly over the `<path>` layer: `#6c757d` behind white text measures about 4.69:1. A mutation that lightens only the path would not fail the case. Rule whether the assertion must read the backdrop under the caption box.
- **R3 (to the Orchestrator's capture-portfolio round): caption size at 390px is NOT-EVIDENCED.** At the 390 variant, the `Captioned carousel` caption (an `h5`, a `p`, `1.25rem` padding, and 70% width) may cover most of a slide about 180px tall. The release's own examples hide captions below `md` for this reason. Rule it on the `captioned-carousel` and `inverted-carousel` frames at 390.

VERDICT: FAIL 2, 3, 4, 8; outside the claims: F1, F2