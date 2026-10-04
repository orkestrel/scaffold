# tokens-t1 — report 3

Done: all six T1 items, with the three appended rulings applied. Both switches remain empty; both built sheets keep their launch bytes. No commit, install, publication, browser run, or out-of-scope tracked edit was made. Launch: `77c65cf`, branch `ccr-d15a48b1-yyyll6`; the launch tree was clean. This report replaces neither earlier report.

## Findings by item

1. **Done — switches and functions.** Added `$palette` and `$scale` beside the existing five switches, plus `swatch($literal, $context: null)` and `measure($role, $value)`. Private helpers parse and reconstruct the seven color spellings. Empty maps preserve literals, context falls back to the ordinary key, and populated maps refuse missing keys/roles with the name in the Sass error. Short identity hex stays short; RGB channels, URI escaping, alpha, capitalization, and variable tails retain their spelling. The mixins module emits no CSS and declares no literal color. Mapped scale strings are unquoted so they work in ordinary declarations as well as interpolation.

2. **Done — generated edit.** `generate.ts` ports the probe lexer and scale census into this unit; it does not import probe code. **571 color sites**, including all identities, and **90 scale sites** were rewritten. Scale sites comprise 64 conditions (39 grid minimums and 25 down conditions), 10 breakpoint-map values, 5 container widths, and 11 font/radius/shadow tokens. All 12 RFS conditions and four modal widths stay literal. The dark body split reaches the body hex/triplet and its secondary/tertiary alpha/triplet derivatives: **6 occurrences**. Other dark emphasis roles retain their ordinary map key. `npm run format` was run; the acceptance formatting check passes.

   The copy-only tracer reaches **571/571** Bootstrap occurrences with **126/126 distinct markers**, **0 missing keys**, and **0 original colors left**. The tuned copy has **572 marker occurrences**, reflecting its existing structural duplication of the transparent tap-highlight reset declaration; none is an original color. Empty-map scratch compiles are byte-identical to pristine copies. Expanded line counts remain **13,903 Bootstrap / 13,798 Tailwind** under both empty maps and tracer palettes. Evidence: `generated.json`, `scales.json`, `tracer.json`, and the two `tracer-*.css` files in this unit.

| Source file | Color sites | Scale sites |
| --- | ---: | ---: |
| `src/bootstrap/_reset.scss` | 1 | 0 |
| `src/bootstrap/_tokens.scss` | 150 | 11 |
| `src/bootstrap/_utilities.scss` | 2 | 5 |
| `src/bootstrap/components/_accordion.scss` | 5 | 0 |
| `src/bootstrap/components/_alert.scss` | 0 | 0 |
| `src/bootstrap/components/_badge.scss` | 1 | 0 |
| `src/bootstrap/components/_breadcrumb.scss` | 0 | 0 |
| `src/bootstrap/components/_button-group.scss` | 0 | 0 |
| `src/bootstrap/components/_buttons.scss` | 213 | 0 |
| `src/bootstrap/components/_card.scss` | 0 | 1 |
| `src/bootstrap/components/_carousel.scss` | 10 | 0 |
| `src/bootstrap/components/_clearfix.scss` | 0 | 0 |
| `src/bootstrap/components/_close.scss` | 3 | 0 |
| `src/bootstrap/components/_color-bg.scss` | 8 | 0 |
| `src/bootstrap/components/_colored-links.scss` | 24 | 0 |
| `src/bootstrap/components/_containers.scss` | 0 | 10 |
| `src/bootstrap/components/_dropdown.scss` | 12 | 5 |
| `src/bootstrap/components/_floating-labels.scss` | 1 | 0 |
| `src/bootstrap/components/_focus-ring.scss` | 0 | 0 |
| `src/bootstrap/components/_form-check.scss` | 13 | 0 |
| `src/bootstrap/components/_form-control.scss` | 2 | 0 |
| `src/bootstrap/components/_form-range.scss` | 8 | 0 |
| `src/bootstrap/components/_form-select.scss` | 4 | 0 |
| `src/bootstrap/components/_form-text.scss` | 0 | 0 |
| `src/bootstrap/components/_grid.scss` | 0 | 10 |
| `src/bootstrap/components/_icon-link.scss` | 0 | 0 |
| `src/bootstrap/components/_images.scss` | 0 | 0 |
| `src/bootstrap/components/_index.scss` | 0 | 0 |
| `src/bootstrap/components/_input-group.scss` | 0 | 0 |
| `src/bootstrap/components/_labels.scss` | 0 | 0 |
| `src/bootstrap/components/_list-group.scss` | 3 | 5 |
| `src/bootstrap/components/_modal.scss` | 1 | 8 |
| `src/bootstrap/components/_nav.scss` | 3 | 0 |
| `src/bootstrap/components/_navbar.scss` | 10 | 5 |
| `src/bootstrap/components/_offcanvas.scss` | 1 | 20 |
| `src/bootstrap/components/_pagination.scss` | 4 | 0 |
| `src/bootstrap/components/_placeholders.scss` | 6 | 0 |
| `src/bootstrap/components/_popover.scss` | 0 | 0 |
| `src/bootstrap/components/_position.scss` | 0 | 5 |
| `src/bootstrap/components/_progress.scss` | 5 | 0 |
| `src/bootstrap/components/_ratio.scss` | 0 | 0 |
| `src/bootstrap/components/_spinners.scss` | 0 | 0 |
| `src/bootstrap/components/_stacks.scss` | 0 | 0 |
| `src/bootstrap/components/_stretched-link.scss` | 0 | 0 |
| `src/bootstrap/components/_tables.scss` | 72 | 5 |
| `src/bootstrap/components/_text-truncation.scss` | 0 | 0 |
| `src/bootstrap/components/_toasts.scss` | 0 | 0 |
| `src/bootstrap/components/_tooltip.scss` | 0 | 0 |
| `src/bootstrap/components/_transitions.scss` | 0 | 0 |
| `src/bootstrap/components/_type.scss` | 1 | 0 |
| `src/bootstrap/components/_validation.scss` | 8 | 0 |
| `src/bootstrap/components/_visually-hidden.scss` | 0 | 0 |
| `src/bootstrap/components/_vr.scss` | 0 | 0 |
| **Total** | **571** | **90** |

3. **Done — writer and records.** `write-tokens.test.ts` and `TokenWriter.ts` port the probe mapping computation and use the installed theme plus Chromium's recorded palette. The project `tokens-t1-writers` in `vite.writers.config.ts` follows the flip convention by inheriting the root conformance configuration and collecting the ignored writer explicitly. Both successive writer runs pass; both resulting files compare byte-for-byte equal.

   `palette.json`: **288 rows**, `chromium: 141`, **288/288 raw values equal the installed theme**, **288/288 resolved hexes taken from the palette source**, and **288/288 Node conversions within one channel unit**. Node equality is exact on **278**; **10** carry `rounding: 'chromium'`: `--color-orange-200`, `--color-orange-600`, `--color-green-100`, `--color-green-500`, `--color-teal-300`, `--color-cyan-400`, `--color-sky-900`, `--color-blue-950`, `--color-fuchsia-400`, `--color-zinc-700`. The writer refuses raw changes, conversion errors greater than one, and inconsistent rounding labels; it never replaces a recorded Chromium hex with its own conversion.

   `tokens.json`: **126 palette rows** (125 ordinary keys plus `#dee2e6@dark`), **26 scale rows**, **27 kept rows**, **105 amount rows**, **0 unjoined rows**. The dark body context takes gray-200; dark secondary subtle background takes gray-900; blue-950 is `#162556` and green-100 is `#dbfce7`. Every derived origin is evaluated over both original and mapped bases. The independent Bootstrap Sass oracle joins **105/105** amount rows within one channel unit, including all eight formerly unjoined prefixed link-decoration rows via the unprefixed property. Records have stable ordering and no timestamps.

4. **Done — configuration.** Bootstrap tokens forward both default-empty maps to mixins. Tailwind tokens declare both empty maps and pass them in their existing `with` clause. No map is activated. The 56-row curation configuration, Tailwind barrel, build configurations, and package scripts are unchanged.

5. **Done — Node cases.** Added all eight cases listed below under `Tailwind compatibility recipe`, including their planted controls. Full conformance acceptance: **127 passed**, zero failed or skipped. Tests use scratch copies for mapped compiles; the built sheets remain the empty-map sheets. No Chromium case was added or run; the live version-gated serialization proof belongs to T2.

6. **Done — guards and readers.** Added `TokenRecord` / `PaletteRecord` types, guards, checked readers, color lexer/conversion, origin evaluator, palette resolver, and coverage/function readers to `tests/setup.ts`, following the existing record shape and reusing contract guards. Five setup cases cover malformed records, all spellings, wrong raw/hex provenance, invalid origins/reversed weights, and orphan/conflicting/changed kept rows. Full setup acceptance: **155 passed** across two files. Existing guide acceptance: **15 passed**.

## Acceptance

Commands ran in the prescribed sequence. The first tracer invocation failed on the scratch harness's absolute Sass import; only the ignored tracer was changed to use explicit `loadPaths`. Acceptance then resumed at the tracer, before either repeat writer run. No tracked file changed after the repository gates. Both launcher runs ended without a cap or signal; the first exit 1 was the recorded harness failure, and the continuation exited 0. Full output is in `acceptance-3.log`, `acceptance-3.err`, `acceptance-3-rest.log`, and `acceptance-3-rest.err`; machine-readable exits are in `acceptance.json`. Commands used the existing npm 11 executable on PATH.

| Command | Exit | Seconds |
| --- | ---: | ---: |
| `npm run check` | 0 | 55.999 |
| `npm run lint:check` | 0 | 1.654 |
| `npm run format:check` | 0 | 4.039 |
| `npm run build` | 0 | 22.174 |
| `sha256sum dist/src/bootstrap/index.css dist/src/tailwindcss/index.css` | 0 | 0.006 |
| `npm run test:setup` | 0 | 18.183 |
| `npm run test:conformance` | 0 | 59.245 |
| `npm run test:guides` | 0 | 2.734 |
| `node tmp/units/tokens-t1/tracer.ts` | 1 | 2.453 |
| `node tmp/units/tokens-t1/tracer.ts` | 0 | 3.192 |
| `npx vitest run --config tmp/units/tokens-t1/vite.writers.config.ts` | 0 | 2.603 |
| `npx vitest run --config tmp/units/tokens-t1/vite.writers.config.ts` | 0 | 2.388 |
| `cmp tmp/units/tokens-t1/tokens-first.json tests/fixtures/tailwindcss/tokens.json` | 0 | 0.004 |
| `cmp tmp/units/tokens-t1/palette-first.json tests/fixtures/tailwindcss/palette.json` | 0 | 0.003 |
| `git diff --check` | 0 | 0.015 |
| `git status --porcelain` | 0 | 0.005 |

Build diagnostics included the existing large app chunk warning and API Extractor's TypeScript-version advisory; neither prevented build success. During development, formatter normalization of two SVG radii caused a scratch byte comparison failure; the generator correction below restored exact bytes before this acceptance build.

## Digests before and after

The complete launch and final digests are identical. Line counts here count the final newline as the final empty line, consistently for both readings.

| Sheet | Before SHA-256 | After SHA-256 | Lines |
| --- | --- | --- | ---: |
| bootstrap | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` | 13903 → 13903 |
| tailwindcss | `b946eefe63628fa64183e8a1518cffb0b145ea6ccd083c69105ae1f6fe900662` | `b946eefe63628fa64183e8a1518cffb0b145ea6ccd083c69105ae1f6fe900662` | 13798 → 13798 |

## Added conformance cases and controls

- **maps every lifted color literal through the token record or keeps it, in both directions** — all 571 occurrences and all 126 rows; planted `#123456`, planted `RGBA(18, 52, 86, var(--bs-link-opacity, 1))`, a kept white changed to `#fafafa` in an independently mapped compile, and an orphan row each fail coverage.
- **reads the token record as a function of the lifted value** — names the sole `#dee2e6@dark` exception; a second conflicting `#ced4da` row is rejected.
- **evaluates every token record row's origin over Bootstrap's bases and over the map's bases** — palette origins and amount origins agree within one channel; a tuned value shifted by two, an invalid `shade-color(primary, 16%)` origin, and a changed mix amount are detected.
- **agrees every tuned amount row with Bootstrap's own Sass compiled from the map's bases within one channel unit** — independently compiles Bootstrap's installed Sass with mapped inputs, prints `joined: 105, unjoined: []`, and compares the unjoined list with the record; shifting a matched row by two is detected.
- **resolves every palette row from the installed Tailwind theme as Chromium serializes it** — asserts raw identity, recorded-hex identity, conversion tolerance, and the ten named rounding rows; blue-500 carrying blue-600's hex, blue-600's hex changed by one digit, and a fabricated raw theme value are refused. This is the Node source check required by the final ruling, not a claim to have re-read a live browser.
- **spells every swatch form and returns the Bootstrap literal under an empty palette** — scratch compiles cover the seven forms, empty/mapped/identity palettes, a data-URI attribute, context precedence and fallback; a reversed-channel palette produces reversed channels and fails the intended expectation; a missing set-map key stops Sass and names the key.
- **returns the literal under an empty scale and the row under a set scale, and refuses a missing role** — checks empty preservation, mapped interpolation and ordinary declaration output, and missing-role Sass refusal.
- **keeps the Bootstrap digest under empty switches and changes it under a one-row palette** — pins `7932f7a5…` and changes one row in a full identity palette on a scratch copy; the digest changes. A sparse one-key map cannot compile the whole sheet because the required missing-key behavior rejects the other keys.

Additional setup case titles:

- accepts the written records and refuses malformed fields and rows
- reads all color spellings and ignores comments and unrelated triplets
- reads recorded Chromium hexes and refuses changed raw values and conversion defects
- evaluates integer amounts over independent bases and rejects reversed weights and invalid origins
- reads the declared bases and identifies orphan, conflicting, and changed kept rows

## Deviations and ruling applications

- **Staging authorized by this brief:** V §4 says the Tailwind face “declares `$palette` (resolved sRGB hex, one row per lifted value, plus the context row of § 3.1 if M1 requires it) and `$scale`, both written by the writer”; it also says the writer “writes the Sass rows and `tests/fixtures/tailwindcss/tokens.json`.” T1 explicitly overrides activation: this writer writes the records, while both Sass maps stay empty. T2 fills them. Likewise the guide, Chromium, journey, record-regeneration, and law/prose work in V §§5–7 remains assigned to T2–T4 and off-limits here.
- **Palette-source ruling applied:** the original brief item 3 sentence “the writer's own conversion must equal every row” and the former V §10 M9 equality sentence are superseded by the third appended ruling. Equality is 278/288 for Node arithmetic; all 288 palette hexes come from Chromium's record, and all 288 conversions are within one. No conversion stop remains. The currently read V §10 already incorporates this source ruling.
- **Count correction already settled by V §10 M3:** V §4 calls the sites “51 `min-width` px conditions and 25 `.98px` `max-width` conditions” while requiring “the 12 RFS conditions … stay literal.” The 51 includes those 12 RFS conditions. The generated edit therefore wraps 39 grid minimums plus 25 down conditions, exactly the 64 conditions M3 measured; it does not substitute the 12 RFS caps. The total scale census is exactly M3's 90.
- **Digest control clarification:** V §5 says “a one-row `$palette` changes the digest.” A whole-sheet compile with only one key contradicts V §4's required missing-key refusal. The control instead supplies a complete identity palette with exactly one changed row and proves the changed digest; the separate swatch case tests a genuinely one-key palette.
- **Formatter-preserving generated detail:** two validation SVG strings contained `r='.6'`. Once the color interpolation was inserted, the formatter changed these to `r='0.6'`, changing compiled bytes. The generator now spells the dot through a Sass hexadecimal escape in an interpolation, preserving exactly `.6` after formatting and compilation. This is an additional generated non-color interpolation beyond V §4's instruction that “the partials take `swatch` at the 571 color sites and `measure` at the grid-tied … sites.” It changes no CSS byte; both final digest and scratch equality proofs pass.
- **Launch and ownership rulings applied:** use the ruled tuned digest `b946eefe…`, 56 curation rows, and ownership of `_reset.scss` / `_utilities.scss`. Their 1+2 color sites and the five utility breakpoint values are included. No other ownership boundary was widened.

No unresolved deviation-contract condition remains. The tracer's import failure was a scratch harness defect, corrected and re-run; no product exception or browser assumption was used to pass it.

## Final git status

All 36 modified tracked files and both new fixtures are owned. Unit scripts, copies, records, logs, and this report are under ignored `tmp/units/tokens-t1/`. Nothing was staged or committed.

```text
 M src/bootstrap/_mixins.scss
 M src/bootstrap/_reset.scss
 M src/bootstrap/_tokens.scss
 M src/bootstrap/_utilities.scss
 M src/bootstrap/components/_accordion.scss
 M src/bootstrap/components/_badge.scss
 M src/bootstrap/components/_buttons.scss
 M src/bootstrap/components/_card.scss
 M src/bootstrap/components/_carousel.scss
 M src/bootstrap/components/_close.scss
 M src/bootstrap/components/_color-bg.scss
 M src/bootstrap/components/_colored-links.scss
 M src/bootstrap/components/_containers.scss
 M src/bootstrap/components/_dropdown.scss
 M src/bootstrap/components/_floating-labels.scss
 M src/bootstrap/components/_form-check.scss
 M src/bootstrap/components/_form-control.scss
 M src/bootstrap/components/_form-range.scss
 M src/bootstrap/components/_form-select.scss
 M src/bootstrap/components/_grid.scss
 M src/bootstrap/components/_list-group.scss
 M src/bootstrap/components/_modal.scss
 M src/bootstrap/components/_nav.scss
 M src/bootstrap/components/_navbar.scss
 M src/bootstrap/components/_offcanvas.scss
 M src/bootstrap/components/_pagination.scss
 M src/bootstrap/components/_placeholders.scss
 M src/bootstrap/components/_position.scss
 M src/bootstrap/components/_progress.scss
 M src/bootstrap/components/_tables.scss
 M src/bootstrap/components/_type.scss
 M src/bootstrap/components/_validation.scss
 M src/tailwindcss/_tokens.scss
 M tests/conformance.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
?? tests/fixtures/tailwindcss/palette.json
?? tests/fixtures/tailwindcss/tokens.json
```
