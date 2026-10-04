# Tokens: the critic (R11, 2026-10-04)

The verdict cannot rule on the two syntheses as written. The judges contradict each other on the scale output form, the adopted color map has no durable measurement behind it, and three proof cases the map breaks are missing from both syntheses. The critic ranks 16 findings by severity in § 2, names the 9 measurements the verdict needs before it can rule in § 3, and asks the user 6 questions that no measurement settles in § 4.

## 1. Sources

The critic read the following inputs:

- The brief (`../brief.md`), the facts it lists (`../scout-distillate.md`, `../probe-report.md`, `../scales.json`, `../tailwind-theme.json`, `../nearest.json` grouped by family, `../inventory.json` grouped by kind and file), and the flip's `../../design-verdict.md` with every § 12 correction.
- The two judges (`judge-mechanism.md`, `judge-consumer.md`), the three proposals (`proposal-algebra.md`, `proposal-consumer.md`, `proposal-ramp.md`), and the measurements (`../measurements/contrast.md` and `.json`, `../measurements/mechanism.md` and `.json`).
- Veneer at `473edd6`, whose `src`, `configs`, and `tests` trees equal `600f8a1` (`mechanism.md`), read with `grep` and `sed` on 2026-10-04. The checkout carries uncommitted edits under `app/browser` and `tests/app/browser`; every line the critic cites sits in a file those edits leave as committed, or in `tests/app/browser/integration.test.ts` and `Showcase.test.ts`, read as they stand on disk.
- The law: `/home/user/scaffold/AGENTS.md` § Project model, `.claude/rules/styles.md`, `tests.md`, `writing.md`, and `names.md`.
- [K], the critic's spot check: `critic.cjs` in this session's scratchpad (`/tmp/claude-0/-home-user/4338f304-4fe6-5169-89e8-36562d885cad/scratchpad/`), Node v22.22.2, 2026-10-04. It computes WCAG 2 ratios with the lane's method (sRGB luminance, alpha composited over the background, Bootstrap's integer `mix` rounding half up). Its controls reproduce `#0d6efd` on white at 4.5008 (`contrast.md` reads 4.50), white on `#155dfc` at 5.246 ([J] reads 5.25), shade 15 of `#155dfc` as `#124fd6` ([J] reads the same), and the dark `mark` at 4.646 ([J] reads 4.65). [K] is a scratch script like [J]; the T0 probe must reproduce every [K] figure durably.

## 2. Findings, most severe first

### Blocking: the verdict cannot rule until each is resolved

1. **The judges contradict each other on the scale output form, and the evidence for references cannot be re-read.**
   - Evidence: `judge-mechanism.md` § 3 item 12 rules resolved literals for fonts, radii, and shadows and refuses `var(--TOKEN, FALLBACK)`. `judge-consumer.md` items 12, 13, 14, and 16 rule references, and its synthesis table writes them. The brief's fact says the opposite of [T]: "the tuned sheet cannot reference Tailwind's custom properties and must carry resolved literals" (`../brief.md` § Facts). [T] is a scratch compile of `@import 'tailwindcss'` beside a `@layer bootstrap` block, not of the recipe. Its script (`tw.mjs`) is absent from the scratchpad, which holds `clip.cjs` alone (listing at 2026-10-04 15:40). No case has read the effect on the flip's pin 4 (`../../design-verdict.md` § 3: the recipe compile, stripped of Tailwind's own blocks, equals the tuned sheet), on the theme-inventory case `pins theme values, reference flags, source census, and static emission` (`tests/conformance.test.ts:120`), or under `prefix(tw)`, where every reference falls back.
   - Fix: measurement M2 (§ 3), then the user's answer to question 1 (§ 4). The mechanism ground of each side holds only in part. A reference keeps the default rendering pinned by its fallback, so a later Tailwind release can move only the consumer-theme flow, never the default value. A literal hides a consumer `--font-sans` from body text (`judge-consumer.md` § Fonts).

2. **The adopted color map has no durable measurement, and it misses its own floor on one pairing.**
   - Evidence: `judge-consumer.md` § Measure states that the lane's candidates match no proposal. Every synthesis ratio, the 0 crossings, and the 2 recorded exceptions come from [J], whose script (`judge.cjs`) is absent from the scratchpad. The lane's population (142 pairings, `contrast.md`) omits `.dropdown-menu-dark`, where [J] reads the crossings. The two judges rule different populations: 142 (`judge-mechanism.md` § 3 item 16) and "the 141 pairings of [J] at least" (`judge-consumer.md` item 3).
   - Evidence, a miss [J] does not list: `--bs-tertiary-color` on the dark body reads 4.07 under Bootstrap alone and 3.94 under the synthesis ([K], unrounded composite of `rgba(209, 213, 220, 0.5)` over `#030712` against `rgba(222, 226, 230, 0.5)` over `#212529`). The judge's floor (the lesser of Bootstrap's ratio and 4.5:1) requires at least 4.07. The pairing reaches `.text-body-tertiary` on the dark body and `.dropdown-item.disabled`. The cause is the value key: `#dee2e6` occurs 8 times in both modes (`inventory.json`), as the light `--bs-border-color` and the dark `--bs-body-color`. The light border floor forces `gray-300` (`judge-consumer.md` item 6), and the function rule (`judge-mechanism.md` § 3 item 1) carries `gray-300` into the dark body text. With `gray-200` as the dark body text, the same pairing reads 4.49 ([K]).
   - Fix: measurement M1 over the union population, then one ruling on this row: a third recorded exception with both ratios, or a context split for `#dee2e6`, which `judge-mechanism.md` § 5 names as "a split the verdict's map needs".

3. **The integration partition case breaks under the map at 19 widths, and neither synthesis rebases it.**
   - Evidence: `partitions shared names, pins raw-composition incompatibility, and gives utilities to Tailwind and components to Bootstrap` (`tests/integration.test.ts:657-795`) compares the recipe's delta of each of the 17 shared component names with `./bootstrap` alone (`alone`, read from `[built]`) at `RELATION_WIDTHS` (`tests/setup.ts:2026-2028`: 0, 575, 576, 639, 640, 767, 768, 991, 992, 1023, 1024, 1199, 1200, 1279, 1280, 1399, 1400, 1535, 1536). Under the map, `.container` reads `none` against 540px at 576 and 639, 768px against 720px at 768, and 1280px against 1140px at 1280. `.table` reads `gray-300` borders against `#dee2e6`. The band widths change media state, which no value table expresses, so `mapReading` cannot repair this case.
   - Evidence, a second omission: the mechanism judge's Chromium list (§ 4.2) omits the integration witness case `keeps preflight declarations by value class and reboot declarations that preflight never writes` (`tests/integration.test.ts:389`). Its Bootstrap-alone clause reads body color, background, and heading color, which the map moves (`#212529` to `#030712`). `proposal-consumer.md` § 4 and `proposal-ramp.md` § 5 rebase it.
   - Fix: both cases read the 17 names and the reboot clause against the tuned sheet adopted alone. One added case pins the tuned sheet alone against `./bootstrap` alone at `RELATION_WIDTHS`, with every departing (name, width, longhand) listed as a map row or a band state. Its control is an identity map that reads `.container` at 540px at 576. The mechanism judge's `differs from Bootstrap alone by the token table and nothing else` reads 1280 only, so its "nothing else" claim must name its widths or move to this case.

### High

4. **A dark-mode role vanishes.**
   - Evidence: the synthesis sends `--bs-secondary-bg-subtle` dark to `gray-950`, the dark page itself. The fill against the page drops from 1.163 to 1.000 ([K]). `judge-consumer.md` records it as intended ("the dark fill equals the dark page, and the border carries the edge"), but `.bg-secondary-subtle` carries no border, and `.alert-secondary`'s border falls from 1.62 to 1.37 against the page ([K]). No contrast rule in either judge covers an adjacent surface, and `contrast.md` measures none.
   - Fix: the dark secondary fill takes `gray-900`, which reads 1.135 against the page with `gray-300` text at 12.05 on it ([K]). `#161719` occurs 1 time (`inventory.json`), so the change couples no other role. The contrast case gains a separation clause: no fill that differs from its page under Bootstrap alone reads equal to it under the map. This row is the clause's control.

5. **`mapReading` has no key for scale readings, and a value key collides on the page.**
   - Evidence: the mechanism judge rules a value key for colors (§ 3 item 1) and leaves the scale readings unspecified. The partition case and the integration case compare Bootstrap winners through `mapReading`. At 1280, `.container` `max-width` moves from 1140px to 1280px, while `.modal-dialog.modal-xl` (`app/browser/sections/modal.html:366`) keeps 1140px, because the consumer judge keeps the modal widths. A value key maps both. `proposal-consumer.md` § 3 and `proposal-ramp.md` § 5 key the container rows by class; both judges drop that key.
   - Fix: `mapReading` keys a scale row by its selector role and longhand. Control: `.modal-xl` reads 1140px under both faces at 1280.

6. **The scale mechanism and the synthesized color function are unmeasured.**
   - Evidence: `mechanism.md` measures colors only, and in another shape than the synthesis. It measures `palette($key)` over a 125-key default map in an added `_palette.scss`. The synthesis adopts `swatch($literal)`, a 7-spelling parse that returns its argument under an empty switch (`judge-mechanism.md` § 4.1). That function's digest, reach, and the `%23fff`, `RGBA(`, and `rgba%28` spellings are not measured. The judge's sentence "takes ramp's mechanism in the form `measurements/mechanism.md` measured end to end" overstates the reading.
   - Evidence, the scale edit: no run reads its digest, reach, or size. The critic's `grep` of `src/bootstrap` reconciles the counts the proposals disagree on. 51 `min-width` px lines remain after excluding one `85px` condition, 20 of them at 1200px with 12 RFS (6 `components/_type.scss`, 5 `_reset.scss`, 1 `_utilities.scss:1056`). With the 25 `.98px` `max-width` lines, that gives 64 grid-tied conditions. The `$breakpoints` map adds 5 values (`_utilities.scss:1035-1040`), `--bs-breakpoint-*` adds 5 (`components/_grid.scss:5-10`), and the containers add 5 widths.
   - Evidence, two overlaps: the 4 shadow tokens (`_tokens.scss:141-144`) carry `rgba(0, 0, 0, …)` color sites among the 571, which a shadow scale row replaces whole. The two-way color count must say which map owns them. `judge-mechanism.md` § 4.1 wraps "type sites" in `scale`, while the consumer judge keeps the type scale with no rows. A wrapped site without a row stops the compile through `@error`.
   - Fix: measurements M3 and M4.

7. **Two proofs assert an implementation against itself.**
   - Evidence: `tests.md` § Proofs forbids comparing an answer with the mechanism that produced it. The writer converts each `theme.css` oklch with the same TypeScript the pin `resolves every palette row from the installed Tailwind theme` uses. The origin evaluation reads each row through the same algebra twin the writer uses. The independent oracle, Bootstrap's own Sass, is offered "under the algebra policy only" (`judge-mechanism.md` § 3 item 8). The adopted map derives the button states, table states, link hovers, focus border, range thumb, and 3 gray mixes by Bootstrap's amounts.
   - Fix: the oracle case covers every amount row. It compiles `node_modules/bootstrap/scss` with the bases, the role variables (`$primary-bg-subtle` and its neighbors are `!default`), and `$table-variants` set to the map's steps, and reads agreement within 1 channel unit. The conversion pin reads each oklch through Chromium's own `color-mix(in srgb, VALUE 100%, transparent)` computed serialization, then clips and rounds.

8. **The showcase contrast cases never read the map.**
   - Evidence: the journey's contrast subjects (`collectContrastSubjects`, `tests/setupBrowser.ts:554-563`) are read after `applyFace('bootstrap')` (`tests/app/browser/integration.test.ts:1042-1066`). The header case reads light mode under the default face only (`tests/app/browser/Showcase.test.ts:276-319`). Both judges report that the showcase's contrast cases pass under the map; they pass because they read no tuned value.
   - Fix: read the 4 contrast subjects under the `tailwindcss` face in both color modes, and read the header buttons in light mode under each face. The cost is 4 reads per face and variant, recorded against the journey's measured 449 s and 487 s (`../../design-verdict.md` § 12).

9. **Three judge measurements cannot be re-read.**
   - Evidence: [J] (`judge.cjs`), [T] (`tw.mjs`), and the mechanism judge's oracle (`oracle.ts`) sat in this session's scratchpad, and only `clip.cjs` remains there. The oracle's reading (19 of 123 `color.mix` results 1 unit off) is corroborated by `proposal-consumer.md` risk 1 and the probe's integer-mix check. The 141-pairing table and the reference emission rest on the missing scripts alone.
   - Fix: the T0 probe ports all three into `tmp/probes/tokens2/` and passes the acceptance rule of the flip's U1: each probe exits 0 twice with byte-identical output.

### Medium

10. **The journey reads `xl` on its boundary.**
    - Evidence: no Chromium run reads the alignment; the judges' readings are arithmetic. At 1280 the aligned `xl` holds only because `min-width: 80rem` is inclusive. The responsive rows depend on it: "Expands from xl" lists widths [390] alone, as does the `xl` drawer (`tests/setupBrowser.ts:4260-4318`). So does the scratch frame at 1280 (`tests/setupStyles.ts:1034`), and the curation fixed point reads at 1280x800.
    - Fix: measurement M5 at 1279, 1280, and 1281 beside the three showcase widths.

11. **The showcase story loses one specimen and misstates another.**
    - Evidence: the containers section captions state Bootstrap's widths ("Capped from sm: 540, 720, 960, 1140, then 1320 px", `app/browser/sections/containers.html`). Under the map, `.container` reads 1280px under `unexcluded` and `tailwindcss` alike, and its padding reads 12px under every face (`tests/setupBrowser.ts:323-334`). No `.container` longhand separates the middle face from the layer face, so the "Container, a name both systems declare" specimen shows no difference.
    - Evidence, an unreadable equality: `judge-consumer.md`'s readings table states that `.btn-primary` reads `rgb(21, 93, 252)`, "equal to `bg-blue-600`", and `proposal-consumer.md` § 4 reads both by computed style. Tailwind's `bg-blue-600` computes `oklch(0.546 0.245 262.881)`, so that comparison fails on serialization alone.
    - Fix: the captions take the face form the flip uses ("Bootstrap only: … Without the layer: … With the layer: …"). The guide states that aligned widths make Bootstrap's `.container` and Tailwind's agree. The equality reads pixels (M7).

12. **The derivation proof has no scale step.**
    - Evidence: `judge-mechanism.md` § 4.2 specifies `substituteTokens` for colors, in one pass and in the CSSOM spellings. It gives the scale rows no key and no CSSOM spelling: media `conditionText`, `var()` text in a custom property, and a shadow replaced whole. It gives them no control either. `proposal-ramp.md` § 5 keys them by context and by selector and property, with controls (an extra changed `--bs-gutter-x`, an `xl` rule left at 1200px).
    - Fix: adopt ramp's scale keys and controls in the derivation case, plus a planted RFS substitution (the 12 RFS conditions stay kept contexts).

13. **Both judges leave five matters undecided.**
    - The `@custom-variant dark` line: `judge-consumer.md` item 21 adopts it "for the guide", while the flip verdict fixes the recipe at three lines (§ 3). The verdict must say whether the line joins the recipe, the showcase, and a proof (`proposal-consumer.md` § 4 writes one with a control), or stays an optional guide sentence. See question 4.
    - The records: no judge rules which ones regenerate. The proposals disagree on both `recipe.json` files, `app/browser/recipe.json`, `preflight.json`, `comparison.json`, `similar.json`, and `showcase/browser.html`. The verdict must list each one with its writer, or the reason it holds.
    - The units: the mechanism judge rules only the split of the switch (an empty map first) from the map, and the landing order on proof shape alone. The verdict must list each unit with its acceptance. No proposal gives a gate to the integration rebasing of finding 3, the captions of finding 11, the generator's durable copy (the flip keeps writers under `tailwind-flip/writers/`), or the guide's token table.
    - The landing order: the mechanism judge puts it before the flip's falsify round, `proposal-consumer.md` after the flip lands with a release hold, and `judge-consumer.md` item 23 forbids a release between them. See question 6.
    - The law: `styles.md` § Prohibitions names one derived-build change, the reset placement. The mechanism judge reads `AGENTS.md` § Project model ("configured through their `_tokens.scss` switches") as enough for token substitution. `proposal-consumer.md` T0 writes an amendment. See question 5.

### Low

14. **The gray map collapses two steps.**
    - Evidence: `--bs-gray-400` equals `--bs-gray-300` (`gray-300`), because `#ced4da` is both `--bs-gray-400` and the light `--bs-dark-bg-subtle` (`inventory.json`, 2 occurrences). The light `.alert-dark` fill then equals the light `--bs-border-color`, and its own border (`gray-400`, `#99a1af`) keeps the edge. The cost reaches only a consumer who reads `var(--bs-gray-400)` and `var(--bs-gray-300)` as two steps.
    - Fix: accept the collapse, and state it in the guide's token table.

15. **The wide-gamut clip is unread.**
    - Evidence: 17 of the 50 steps the consumer map uses lie outside sRGB (`proposal-consumer.md` finding 5). `clip.cjs` gives `yellow-500` the largest clip distance, OKLab 0.0225. On a wide-gamut display, Tailwind paints the oklch value and the tuned sheet paints the clipped hex.
    - Fix: measurement M7, and a guide sentence stating the residual.

16. **The rem down forms are unread at fractional zoom.**
    - Evidence: `39.99875rem` repeats Bootstrap's 0.02px gap (`proposal-algebra.md` risk 5). At 125% and 150% device scale, a width between the two conditions might match neither.
    - Fix: read the gap in M5.

## 3. Measurements the verdict needs before it can rule

Each measurement in the following table names the finding it settles and its acceptance. Every probe writes under veneer's ignored `tmp/probes/tokens2/`, exits 0 twice with byte-identical output, and leaves `git status --porcelain` unchanged.

| Measurement | Settles | Reading |
| --- | --- | --- |
| M1. Durable contrast and separation run over the adopted map | 2, 4, 9 | The union population: the 142 of `contrast.ts`, the [J] additions (the form-control border, secondary and tertiary text, `code`, `mark` in both modes, `.dropdown-menu-dark` header and item, 4 header readings, `.text-secondary` on the dark body), the dark tertiary text, and the adjacent surfaces (each bg-subtle and border-subtle against its page in both modes, each button hover against its base, each table state against its bg). Node first, then Chromium through `readContrast` under the tuned sheet alone. It must reproduce [J]'s 4 control ratios and the [K] figures. |
| M2. References in the full recipe | 1 | The recipe compile with the tuned sheet carrying references, read three ways: alone, under a consumer `@theme` (font, radius, shadow, `--color-blue-600`), and under `prefix(tw)`. It reports the theme block's emitted variables, pin 4's flattened equality, and `tests/conformance.test.ts:120` unchanged. |
| M3. The scale edit on a copy | 6 | Both entries keep their digests (`ef7b5845…`, `4142d6d4…`) under an empty `$scale`. A tracer reaches 64 conditions, 10 breakpoint values, 5 container widths, and the token sites, with the 12 RFS conditions untouched and the line count unchanged. The ownership of the 4 shadow color sites is stated. |
| M4. The synthesized `swatch` on a copy | 6 | The same digests and the 571-site tracer as `mechanism.md`, in the `swatch($literal)` shape, over all 7 spellings, including `%23fff`, `RGBA(`, and `rgba%28`. |
| M5. Breakpoint readings in Chromium | 3, 10, 16 | All three faces at 390, 768, 1279, 1280, 1281, 639, 640, 1023, 1024, 1535, and 1536. It reads the `NAVBAR_SCENARIOS` and `RESPONSIVE_OFFCANVAS_SCENARIOS` toggler states, `.container` and `.container-*`, `.modal-xl`, and `TAILWIND_READINGS`. It lists every (name, width, longhand) where the tuned sheet alone departs from `./bootstrap` alone at `RELATION_WIDTHS`, and the down-form gap at 125% and 150% scale. |
| M6. `mapReading` over the partition | 5, 8 | Over the 1665 signatures (`../../design-verdict.md` § 12), it lists every Bootstrap-winner longhand that carries a scale value and every value collision. It records the focused wall time against 53 s, and the journey's against 449 s and 487 s. |
| M7. Pixel reads | 11, 15 | A canvas read of `bg-blue-600` beside `.btn-primary`, and of `yellow-500`, `cyan-500`, `teal-400`, `red-600`, and `green-700` beside their components, on an sRGB profile. |
| M8. The oracle join for the amount rows | 7 | Bootstrap's own Sass with the role variables and `$table-variants` configured agrees with every amount row within 1 channel unit, and every unjoined row is listed (`judge-mechanism.md` § 5). |
| M9. Chromium's own conversion | 7 | Each palette row against `color-mix(in srgb, VALUE 100%, transparent)`, clipped and rounded. |

## 4. Questions for the user

No measurement settles these questions. Each one states the default that the two judges apply.

1. **Fonts, radii, and shadows: follow the consumer's `@theme`, or pin Tailwind 4.3.3's defaults?** Following the theme puts a consumer `--font-sans` on Bootstrap's body text and a consumer `--radius-md` on `.btn`. Pinning keeps one output form. The judges split (finding 1); M2 settles feasibility, not intent.
2. **Colors stay pinned to Tailwind's default palette, even when the consumer's `@theme` sets `--color-blue-600`. Confirm?** Bootstrap's `-rgb` triplets, mixes, and `%23` escapes need sRGB channels at build time, so a consumer color cannot reach `.btn-primary` through the CSS export. Both judges apply this default.
3. **Container widths: Tailwind's `max-width` equal to the breakpoint, or Bootstrap's offsets kept under the aligned breakpoints?** The default loses Bootstrap's 32px to 80px between each breakpoint and its container width (`_variables.scss:484-509`), and moves Bootstrap's documented layouts in the bands 576 to 639, 992 to 1023, 1200 to 1279, and 1400 to 1535px. The brief offered both; the judges took the first without comparing them.
4. **The `@custom-variant dark` line: in the recipe and the showcase, or an optional guide sentence?** Placing it in the recipe changes the three-line recipe the flip fixed (`../../design-verdict.md` § 3).
5. **The law: amend `styles.md` § Prohibitions to name token substitution in a derived build, or read `AGENTS.md` § Project model as enough?** The default applied by the mechanism judge is no amendment.
6. **Release order: may a veneer release ship between the flip and the tokens?** `judge-consumer.md` item 23 refuses one, so a consumer meets one visual change.
