# Tokens: the mechanism judge (R11, 2026-10-04)

The ranking is ramp first, algebra second, and consumer third, over the nine criteria of § 2. Ramp and algebra tie at 35 points, and determinism breaks the tie for ramp. The synthesis in § 4 takes ramp's mechanism in the form `measurements/mechanism.md` measured end to end: a value-keyed `$palette` lookup and a role-keyed `$scale` lookup in `src/bootstrap/_mixins.scss`. Each call carries Bootstrap's literal at its own site and returns that literal under an empty switch. A source lexer generates the calls over 571 color sites. The proof set comes from consumer and algebra: a per-occurrence record with an origin on every row, the function check, the origin evaluation over both base sets, a per-row theme pin, and the derivation case with a single-pass substitution. Every proposal inherits the probe's blind spot, which § 3 item 5 rules on: 24 uppercase `RGBA(` triplets in `components/_colored-links.scss`, and the encoded `rgba%28…%29` form at `components/_navbar.scss:20`, sit outside each proposal's generator or spelling list.

The judge rules on the mechanism and the proofs only. The map's policy, the families, the base steps, the contrast rule, and the scale choices belong to the other judge. A ruling in this file that touches them states the mechanism ground it rests on.

## 1. Sources

The judge read the following sources:

- The three proposals in this folder: `proposal-algebra.md`, `proposal-ramp.md`, and `proposal-consumer.md`.
- `../measurements/mechanism.md` and `mechanism.json`: `rewrite.ts` and `mechanism.ts` in `/home/user/veneer/tmp/probes/tokens`, run on 2026-10-04 with Sass 1.105.1 and Node v22.22.2 on veneer `473edd6`, whose `src`, `configs`, and `tests` trees equal `600f8a1`.
- `../measurements/contrast.md` and `contrast.json`: `contrast.ts` in the same folder, run on 2026-10-04.
- The facts listed in `../brief.md`, the flip's `../../design-verdict.md` with every § 12 correction, the law (`/home/user/scaffold/AGENTS.md` § Project model, `.claude/rules/styles.md`, `tests.md`, `writing.md`, `names.md`), and the veneer files the brief names.
- Code reads by the judge at veneer `473edd6`: `grep` counts of media conditions and encoded `rgba` in `src/bootstrap`, `guides/veneer.md:1200-1226`, `src/bootstrap/_tokens.scss:1-22`, `src/tailwindcss/index.scss`, `configs/src/vite.tailwindcss.config.ts`, and `tests/src/tailwindcss/index.test.ts:105-135`.
- The judge's oracle run (2026-10-04): `oracle.ts` in this session's scratchpad (`/tmp/claude-0/-home-user/4338f304-4fe6-5169-89e8-36562d885cad/scratchpad/`). It compiles `node_modules/bootstrap/scss/bootstrap.scss` with the installed Sass 1.105.1, and it touched no checkout. Two consecutive runs produced byte-identical output.

The oracle run measured the following:

- Under Bootstrap's own bases, Sass 1.105.1 serializes 123 mixed colors as `rgb()` percentages, not hex. After each channel is rounded half up, 104 of the 123 equal the Bootstrap 5.3.8 `dist/css/bootstrap.css` hex at the same selector and property, 19 differ by 1 channel unit, and none differ by more. The table-variant mixes are among the 19 (`.table-primary` `--bs-table-border-color` reads 165 against `#a6b5cc`'s 166 in red).
- With `$blue: #155dfc`, Bootstrap's own Sass gives `.btn-primary` `--bs-btn-hover-bg` as `rgb(7%, 31%, 84%)`, which rounds to `#124fd6`. It gives `--bs-btn-focus-shadow-rgb` as `56, 117, 252` and `--bs-primary-rgb` as `21, 93, 252`, the values algebra's § 2 and consumer's § 2 list.

## 2. Scores

Each criterion scores 1 to 5. The following table gives the scores, and the paragraphs after it give the evidence:

| Criterion | Algebra | Ramp | Consumer |
| --- | --- | --- | --- |
| Determinism | 4 | 5 | 3 |
| Byte identity of `./bootstrap` by default | 3 | 5 | 5 |
| Provability of the derivation step | 5 | 4 | 4 |
| Law | 4 | 4 | 3 |
| Cost of the edit | 3 | 4 | 2 |
| Maintenance on a Bootstrap or Tailwind version move | 4 | 3 | 4 |
| `%23` escapes, `-rgb` triplets, and the other spellings | 3 | 2 | 3 |
| Output form | 5 | 5 | 4 |
| Test shapes and controls | 4 | 3 | 5 |
| Total | 35 | 35 | 33 |

Ties break on the criteria in the order the task lists them, and determinism separates ramp (5) from algebra (4).

**Determinism.** Ramp's build is a lookup and runs no arithmetic: `swatch` returns the row's value in the literal's spelling (ramp § 4). Algebra runs integer channel mixing in Sass (`floor((a·w + b·(100 − w)) / 100 + 0.5)`) and Bootstrap's `color-contrast` over a verbatim copy of `$_luminance-list` (algebra § 4). Both are deterministic. The integer path is required: the oracle run reads 19 of 123 mixes 1 unit off Bootstrap's hex under `color.mix`. Consumer's colors use the same integer mix through `math.round`. Its scale references (`var(--radius-md, 0.375rem)`) leave the rendered value under the recipe to Tailwind's optimizer, which emits a referenced theme variable through `trackUsedVariables` in the minified `dist/lib.js`. That function is an internal of the compiler, not a documented contract. The build bytes stay deterministic, and the rendered radius, font, and shadow under the recipe follow whatever a later Tailwind release does with that internal.

**Byte identity of `./bootstrap` by default.** Ramp's `swatch($literal)` and `scale($role, $value)` return their literal argument under an empty switch (ramp § 4), so the default build is identical by construction. `mechanism.md` measures that shape over 571 sites: both entries compile to the same bytes before and after the rewrite (`ef7b5845…` and `4142d6d4…`), and each round trip equals its built sheet (`7932f7a5…` and `22f33114…`). Consumer's `tone($literal, …)` and `measure($literal, $key)` return `string.unquote($literal)` under empty switches (consumer § 3), so they hold by the same construction. Algebra computes every default: `tone(blue)` reads a private map of 21 spellings, and `shade-color(primary, 15%)` evaluates the integer algebra over Bootstrap's bases at 368 sites, plus 88 `color-contrast` calls (algebra § 2). Its byte identity therefore rests on every tag and every computed mix reproducing its literal. The algebra runs reproduce 13 hexes in Node and 6 values in Sass, not the 456 calls, and its own risk 1 names the drift. The digest gate catches a failure, so nothing wrong ships, but `./bootstrap` gains a dependency on the tuned build's arithmetic that R11 does not need.

**Provability of the derivation step.** `mechanism.md` measures the derivation step directly: a single regex pass that matches hex at hex-digit boundaries and triplets only in a color position equals the traced Sass output byte for byte, on the lifted sheet and on the tuned sheet. The same pass commutes with the withholding, moving, copying, restoring, and scoping. Any value-keyed map inherits that result. Algebra's record is a byte map (0 conflicts over 143 values, algebra § 3) whose every row carries an origin, and its case `evaluates every token record row as Bootstrap's algebra over both base sets` evaluates each origin. Ramp's map is also a byte map (0 conflicts in 123 rows, ramp § 1 Q2), but its rows carry no origin, so no case traces a substituted value to the role rule. Only the guide table pin checks a row. Consumer's map holds one split (`#ced4da` as `--bs-gray-400` and as `--bs-dark-bg-subtle`, consumer § 3), so its substitution must key that value by context, and no measurement has run such a substitution.

**Law.** All three keep every `!important` declaration where the flip put it: no proposal moves a declaration between layers. `mechanism.md` reads the tuned compile under a tracer map with an unchanged line count. All three keep TypeScript out of the faces, because each twin lives under `tests/`. The scores differ on the guide and on surface:

- Algebra's T6 names `$palette` and `$scale` in the guide's switch sentence (`guides/veneer.md:1207-1209` lists the five switches). Algebra also stores 21 base spellings in `_mixins.scss` maps. `styles.md` § Prohibitions allows a literal color only in `_tokens.scss` or where the pin declares it, and the pin declares none in `_mixins.scss`.
- Ramp keeps every literal at its pinned site. Its T6 writes a token sentence and a token table, and it names no switch sentence.
- Consumer keeps literals at their sites. It adds a law amendment that the law does not need (§ 3 item 13), and it forwards `$palette` and `$scale` from `src/tailwindcss/index.scss`, which publishes a Sass option on `./tailwindcss/scss` with no first consumer. `AGENTS.md` § Design laws (Minimal public API) refuses that, and R11 makes the map a build input of the tuned face.

**Cost of the edit.** Ramp wraps 715 sites with two functions and writes 123 color rows and 29 scale rows (ramp § 1 Q4). `mechanism.md` measures the value-keyed color rewrite: 29 files, 725 lines added and 564 removed, Bootstrap Sass grows 13239 bytes (5.8%), and the compile time change sits inside the run-to-run spread (the pristine warm Bootstrap compile alone ranges from 207.1 to 344.4 ms). Algebra writes 456 color calls over 14 functions, including a Sass `color-contrast` and a copied luminance table. Consumer tags about 706 sites, each with an expression the writer chooses from the selector and property. 83 lifted literals carry more than one candidate origin (`inventory.json`), so the writer needs a classification table for those 83. Consumer's `tone` parses variadic, nested operations, and the proposal adds a scaffold law unit.

**Maintenance on a version move.** The scores weigh a Bootstrap move and a Tailwind move as follows:

- A Bootstrap move re-lifts the recreation, and every proposal regenerates its edit. Ramp's `@error` on a value with no row stops the tuned build loudly (ramp risk 8), but ramp's generator reads the probe's inventory positions, so a site the inventory misses stays Bootstrap's in silence (§ 3 item 5). Algebra's computed defaults fail the digest at every stale tag, which is loud and blocks `./bootstrap` itself. Consumer's Bootstrap-bases compile fails at a stale tag and leaves `./bootstrap` alone.
- A Tailwind move regenerates rows from `theme.css`. Algebra's input is 19 rows, and Sass recomputes the rest. Consumer's input is 50 colors and the role names. Ramp's input is 123 color rows, 29 scale rows, and the guide table, and its theme pin fails on any byte of `theme.css` (`443d7af3…`), including bytes no row reads. Consumer's scale references copy Tailwind's default value into each fallback, so a move must update both the reference and the fallback.

**`%23` escapes, `-rgb` triplets, and the other spellings.** `mechanism.md` counts 571 rewritten color sites in 7 forms: hex 424, whole-string triplet 45, `rgba(...)` 53, uppercase `RGBA(R, G, B, var(...))` 24, `%23` escape 20, encoded `rgba%28…%29` 5. The 2 `%23fff` escapes inside `/*rtl:url(...)*/` comments in `_carousel.scss` never reach the sheet. No proposal covers all 7:

- Algebra: `to-rgb`, `fade-color`, and `escape-color` cover hex, triplet, `rgba`, and `%23`, including `%23fff` through the stored spelling. It has no form for `rgba%28…%29`, and its generator reads inventory origins, which omit the 24 uppercase sites.
- Ramp: `swatch` parses `#rgb`, `#rrggbb`, `%23rrggbb`, triplet, and `rgba`. It omits the 3-digit escape `%23fff` (8 occurrences, scout § 1), `rgba%28…%29`, and the uppercase form. Its acceptance scan ports the probe's scanner, which reads 0 uppercase sites in `_colored-links.scss` where the lexer reads 24.
- Consumer: `tone` formats hex, `%23` plus hex, `rgba`, and triplet, and keeps the literal's spelling for an equal value (`#fff`). It omits `rgba%28…%29` and the uppercase form.

Of the 5 encoded sites, 4 are black or white with alpha (`_navbar.scss:442`, `:445`, `_form-check.scss:87`, `:131`). The fifth, `_navbar.scss:20` (`rgba%2833, 37, 41, 0.75%29`, the light toggler icon), derives from `$gray-900` and changes under every map.

**Output form.** All three emit resolved sRGB hex for colors, clipped per channel as `tailwind-theme.json` records. `mechanism.md` shows an `oklch()` value breaking the escape (`palette-escape()` returns `%23klch(54.6% 0.245 262.881deg)`) and splitting the hex and triplet forms of one role. Consumer emits a second form, `var(--TOKEN, FALLBACK)`, for fonts, radii, and shadows, which is the ground of its lower score.

**Test shapes and controls.** Every case in all three carries a control. The scores separate on the following ground:

- Consumer pins tags against Bootstrap: a compile with `$palette` set to Bootstrap's own colors equals the default byte for byte, with a planted mis-tag control. A pairwise-distinct palette separates expressions that agree under Bootstrap's bases. RFS conditions are pinned with a Chromium control at 1279 px. The witness, differs-by-table, and contrast cases each carry a planted control.
- Algebra adds a TypeScript twin of the algebra with a reversed-weight control, the origin evaluation with an off-by-one and a wrong-weight control, the palette-rule case, the infix agreement at four boundary pairs, and a unit that changes no output byte (T1). Its journeys add a `tuned` reading state, one more read per signature over 1665 signatures (verdict § 12).
- Ramp's scanner misses the uppercase form, so its two-way token case and its "no Bootstrap literal in the tuned compile" acceptance can pass with 24 sites unmapped. No case checks a row against its role.

## 3. Contradictions and rulings

Each item names the contradiction, then rules on it.

1. **What a color call is keyed by.** Ramp keys by the lifted value (`swatch('#0b5ed7')`). Algebra keys by the origin and computes the value (`shade-color(primary, 15%)`). Consumer keys by the literal plus an expression (`tone('#0b5ed7', shade, primary, 15)`). Ruling: key by value, with the literal at the site. The value-keyed form is the one measured end to end (571 sites reached, byte-identical default, single-pass equivalence, commutation with the structural steps). It carries no classification table, and each origin moves into the record and the Node proofs (§ 4.2). The mechanism refuses a split: the map must be a function of the lifted value, and the function check pins it. Consumer's `#ced4da` split goes back to the map's policy, which moves both roles or neither.
2. **What a call returns under an empty switch.** Ramp and consumer return the literal. Algebra computes the value from Bootstrap's bases. Ruling: return the literal. `./bootstrap` then depends on no arithmetic, and the origins are proved in the Node cases instead of in the shipped build.
3. **How a scale call is keyed.** Ramp's `scale($role, $value)` and consumer's `measure($literal, $key)` carry the literal and a role. Algebra's `breakpoint(NAME)` reads a private default map. Ruling: a role key and the literal at the site, as ramp writes it. Scales cannot key by value: `1200px` is both the `xl` breakpoint and the RFS cap, and `calc(1.375rem + 1.5vw)` is both `h1` and `.display-6` (ramp § 1 Q4). The 12 RFS conditions (6 in `_type.scss`, 5 in `_reset.scss`, 1 in `_utilities.scss`; the judge's `grep` reads 20 `(min-width: 1200px)` lines in all) and the modal widths stay unwrapped.
4. **Whether Sass recomputes `color-contrast`.** Algebra recomputes it at 88 sites over a copied `$_luminance-list`. Ramp and consumer keep the shipped `#fff` and `#000`. Ruling: keep the shipped text as identity rows, and prove Bootstrap's choice in TypeScript (algebra's `contrastColor` twin and its palette-rule case). Under a recomputing build, a base change flips a text color in silence (the `†` column of `contrast.md` marks 3 to 8 flips per candidate). Under identity rows, the same change fails a case.
5. **How many color sites exist, and who finds them.** All three cite 616 from `inventory.json` and generate the edit from the inventory's positions or origins. `mechanism.md` reads 571 rewritten sites: 616 − 69 `transparent` + 24 uppercase `RGBA(` triplets the probe's grammar misses. Ruling: 571 sites, plus 69 `transparent` and 8 `currentcolor` kept as written. A lexer over the Sass source generates the edit (code, strings, and comments split; interpolation inside a string read as code), as `rewrite.ts` does. Every scanner the proofs use matches `rgba(` and `rgba%28` case-insensitively.
6. **Which spellings a call writes.** The proposals list four or five spellings, and none lists the encoded or uppercase form. Ruling: the 7 forms of § 2. The encoded and uppercase forms wrap only the triplet: `rgba%28#{swatch('33, 37, 41')}, 0.75%29` and `RGBA(#{swatch('10, 88, 202')}, var(--bs-link-opacity, 1))`. A code-context `rgba()` goes whole through `swatch('rgba(13, 110, 253, 0.25)')`, because Sass refuses `rgba(#{...}, A)` in a plain context (`mechanism.md`). `%23fff` is a spelling `swatch` must parse.
7. **The record's grain.** Algebra writes one row per changed value with its origin. Ramp writes one row per literal value. Consumer writes one row per occurrence with its context. Ruling: one row per occurrence (file, selector, conditions, property, spelling, Bootstrap value, tuned value, origin, and the Tailwind token where one names the value). The two-way case counts every site from it, and the value table the Sass map and `mapReading` read derives from it.
8. **How a row's origin is proved.** Ramp proves none. Algebra evaluates each row's origin over both base sets with a TypeScript twin. Consumer compiles with Bootstrap's bases and with a distinct palette. Ruling: algebra's origin evaluation over both base sets, because a value-keyed build has no Sass tag to compile against. Consumer's two compile cases are moot without tags and are refused. When the verdict adopts the algebra policy, add one oracle case: Bootstrap's own Sass from `node_modules/bootstrap/scss`, compiled with the map's bases, agrees with every tuned row within 1 channel unit at the same selector and property. The tolerance follows from the 19 one-unit differences of the oracle run. Under a ramp policy, the origin is a role step, and the role table is the check.
9. **How the theme is pinned.** Ramp pins the digest of `theme.css` and converts each token. Algebra and consumer convert each row. Ruling: a per-row conversion pin, which names the row that moved. The digest stays in the record as provenance and gates nothing.
10. **The journey's component baseline.** Algebra adds a `tuned` reading state that swaps the face's style text, reads, and restores. Ramp and consumer map the `bootstrap`-face reading through the token table (`mapReading`). Ruling: `mapReading` keeps the journey at its reads. The integration case `differs from Bootstrap alone by the token table and nothing else` bridges it to the real sheet, because that case reads the tuned sheet alone against `./bootstrap` alone and pins the table `mapReading` applies.
11. **The paired engine states case.** Algebra rebases it on the `tuned` state. Ramp and consumer leave it unchanged. Ruling: unchanged. Verdict § 12 bounds that case to the engine's output, panel text, and visibility, and the map moves none of them.
12. **Scale output: literal or reference.** Algebra and ramp emit resolved literals. Consumer emits `var(--TOKEN, FALLBACK)` for fonts, radii, and shadows. Ruling: resolved literals. A reference leaves the recipe's rendered value to an internal of Tailwind's optimizer, duplicates each theme value in its fallback, and gives one sheet two output forms. The ruling does not rest on consumer's compile finding about emission, which no measurement lane reproduced. A later round can take references with consumer's two cases (`follows a consumer theme font, radius, and shadow…` and `emits exactly the referenced theme variables and no color variable`).
13. **A law amendment.** Consumer's T0 amends `styles.md` § Prohibitions. Algebra and ramp need none. Ruling: no amendment. `AGENTS.md` § Project model lets `src/tailwindcss` configure the partials "through their `_tokens.scss` switches". `styles.md` puts the `!default` switch in `_mixins.scss` and confines literal colors to `_tokens.scss`, where `src/tailwindcss/_tokens.scss` holds the map. The guide's switch sentence (`guides/veneer.md:1207-1209`) gains `$palette` and `$scale`, and the paragraph at `:1220`, which keeps Bootstrap's token values, gives way to the token rule.
14. **Publishing the palette.** Consumer forwards `$palette` and `$scale` on `./tailwindcss/scss`. Algebra refuses that, and ramp leaves the barrel unchanged. Ruling: refused, for the reasons in § 2 Law.
15. **Unit split.** Algebra lands the switch with no map first (T1: both builds byte-identical, then T2 the map). Ramp and consumer land the switch and the map in one unit. Ruling: algebra's split. The empty-map unit proves the generated edit alone, so a fault in the map cannot hide in the same diff.
16. **The contrast case's population.** Algebra and ramp read 121 pairings, consumer reads 93, and `contrast.md` reads 142. Ruling: the 142 pairings of `contrast.ts`, the one population a measurement lane ran twice with a byte comparison, under a count pin (ramp's control).
17. **Landing order.** Ramp lands after U7 and before U8. Algebra lands after U8 and before TF3's falsify round. Consumer lands after the flip reaches veneer `main`. The order is the verdict's call, outside the mechanism. Ruling on proof shape alone: the token units land before the falsify round that attacks the derivation case, because the tokens rewrite that case. `mechanism.md`'s commutation result keeps the structural steps attackable with the substitution step at the front.
18. **The home of the twins.** Algebra puts the algebra twin in `tests/setupStyles.ts`, consumer puts `deriveToken` there, and ramp puts `resolveThemeColor` in `tests/setup.ts`. Ruling: `substituteTokens`, `mapReading`, and `readContrast` read CSSOM and go in `tests/setupStyles.ts` (`styles.md` § Proofs). The algebra twin and the theme conversion feed Node cases and go in `tests/setup.ts`. Each instrument gets its proof in the mirrored setup test.

The following gaps are shared by all three proposals, and the synthesis closes each:

- **A single pass.** No proposal states that `substituteTokens` applies the map in one pass. Tailwind gray-50 `#f9fafb` is also Bootstrap's `.link-light:hover` value (`RGBA(249, 250, 251, …)`), and `mechanism.md` measures a sequential replace chaining through it. A single pass per occurrence closes it.
- **The CSSOM spellings.** Only ramp names them. The derivation case reads the sheet through CSSOM (`tests/src/tailwindcss/index.test.ts:111` adopts both sheets), where a custom property keeps its hex text and a normal property serializes as `rgb()`. The substitution must map both spellings.

## 4. Synthesis

### 4.1 Mechanism

The synthesis mechanism takes the following shape:

- **`src/bootstrap/_mixins.scss`** declares `$palette: () !default;` and `$scale: () !default;` beside the five switches. `swatch($literal)` reads the 7 spellings of § 2 and returns the mapped value in the literal's spelling, keeping `#fff` short where the value is equal. It returns `string.unquote($literal)` when `$palette` is empty. When `$palette` is set and the normalized key has no row, it stops the compile with `@error`; `mechanism.md` measured that refusal (`The palette carries no key #0d6efd`). `scale($role, $value)` returns `$value` when `$scale` is empty and refuses a missing role the same way. Private `-key` and `-spell` helpers hold the parse. The file emits nothing and declares no literal color.
- **`src/bootstrap/_tokens.scss`** declares both switches beside the five and passes them through its `@use 'mixins' with (...)`. Its 150 literals become `#{mixins.swatch('…')}` inside the existing interpolation, and its radius, shadow, and font sites become `mixins.scale(…)` calls. `src/bootstrap/index.scss` keeps `@forward 'tokens' show $layered`.
- **The partials** take `swatch` at the 571 color sites and `scale` at the grid-tied breakpoint, `-down`, container, and type sites. The judge's `grep` reads 51 `min-width` px conditions and 25 `.98px` `max-width` conditions. The 12 RFS conditions and the modal widths stay literal. Identity rows (`#000`, `#fff`, and their alpha forms) go through `swatch` too, so the two-way case counts every site. `transparent` and `currentcolor` stay as written.
- **`src/tailwindcss/_tokens.scss`** declares `$palette` (resolved sRGB hex, one row per lifted value) and `$scale`, both written by the writer, and passes them through its existing `@use '../bootstrap/tokens' with (...)`. `src/tailwindcss/index.scss`, `configs/src/vite.tailwindcss.config.ts`, and `package.json` do not change.
- **The generator** is a TypeScript script under veneer's ignored `tmp/` that ports `rewrite.ts`'s lexer, and it is never committed. It is accepted when `./bootstrap` keeps SHA-256 `7932f7a5…` and the tuned compile is byte-identical under an empty map. A tracer map must reach all 571 sites with no original literal left, and `format:check` must pass.
- **The writer** is a Vitest file under `tmp/units/`, following the flip's record-writer convention. It computes each row from `node_modules/tailwindcss/theme.css` under the verdict's policy, then writes the Sass rows and `tests/fixtures/tailwindcss/tokens.json`.
- **The output** is resolved sRGB hex with the probe's per-channel clip. The pixel probe of algebra's risk 3 and ramp's P6 stays.

### 4.2 Proofs

Each case carries the control named after it. The Node cases come first:

- `conformance`: `./bootstrap` keeps SHA-256 `7932f7a5…` under the default switches. Control: a one-row `$palette` changes the digest (algebra). The round-trip case `recreates the tuned built sheet from its Sass barrel after one round trip` stands.
- `maps every lifted color literal through the token record or keeps it, in both directions`: every one of the 571 occurrences, in the 7 spellings, is a record row, every row occurs, and every kept literal is equal on both sides. Controls: a planted lifted `#123456`, a planted lifted `RGBA(18, 52, 86, var(--bs-link-opacity, 1))`, a kept `#fff` read as `#fafafa`, and an orphan row (algebra and consumer, widened).
- `reads the token record as a function of the lifted value`: no Bootstrap value maps to two tuned values. Control: a planted second row for `#ced4da` with another value.
- `evaluates every token record row's origin over Bootstrap's bases and over the map's bases`. Controls: a tuned value off by one channel, and an origin of `shade-color(primary, 16%)` (algebra).
- Under the algebra policy only, `agrees every tuned row with Bootstrap's own Sass compiled from the map's bases within one channel unit`. Control: a row shifted by 2 units fails. T0 first proves that the selector and property keys of Bootstrap's own compile align with the lifted sheet's.
- `resolves every palette row from the installed Tailwind theme`: a per-row conversion, plus the policy's base rule computed with the `contrastColor` twin. Controls: a row naming `blue-500` that carries `blue-600`'s value, and a hex changed by one digit.
- `spells every swatch form and returns the Bootstrap literal under an empty palette`: a scratch compile over the 7 spellings with a one-row palette. Controls: reversed channels, and a set palette with a missing key, which must stop the compile.
- `pins the guide token table to the token record`. Controls: a planted guide row and a removed guide row (ramp).

The Chromium cases follow:

- `derives the tuned sequences by substituting tokens, withholding, moving, copying, restoring, and nothing else`: `substituteTokens` applies the record in one pass per occurrence, in the CSSOM spellings, before the structural steps. Controls: a planted `#0d6efe`, a removed record row, a kept literal read as `#fffffe`, an unwithheld `.mt-3`, and a chaining control in which `#f8f9fa` maps to `#f9fafb` and `#f9fafb` maps elsewhere, each changed exactly one time.
- `keeps the RFS cap at 1200px and aligns every grid condition to Tailwind's breakpoints`. Control: a planted RFS substitution reads `.h1` at 41.2 px at 1279 px (consumer).
- The contrast case over the 142 pairings of `contrast.ts`, under the tuned sheet alone and Bootstrap alone. Controls: a `blue-500` copy fails at 3.76, and the count pin.
- `pins every curation witness against the tuned sheet alone and rejects each removed repair`. Control: the lifted sheet as the baseline fails on a token-bearing witness (ramp).
- `differs from Bootstrap alone by the token table and nothing else`. Controls: `.card` padding changed in a tuned copy, and an identity map that fails on `.btn-primary` (consumer and ramp).
- `agrees every Bootstrap infix with its Tailwind variant at each aligned breakpoint`. Control: `./bootstrap` beside the unexcluded compile disagrees at 600 px (algebra).

The journeys keep their reads:

- The partition case compares a Bootstrap winner against `mapReading` of the same element under the `bootstrap` face. Control: an unmapped reading fails on `.btn-primary` `background-color`.
- The paired engine states case and `reads every header button at 4.5:1 or more, pressed or not, in both color modes` stay unchanged.
- `TAILWIND_READINGS` gains rows whose `unexcluded` column keeps Bootstrap's value, because that face loads `./bootstrap` (ramp § 1 Q6 and consumer finding 2 correct the brief's Q6).

### 4.3 Refused

The synthesis refuses the following:

- Text substitution in `configs/src/vite.tailwindcss.config.ts`, and the hybrid. `mechanism.md` reads 3 of 4 substitution variants writing a wrong sheet with no error (the `#fff` prefix of `#fff3cd`, `clip: rect(0, 0, 0, 0)`, the `rgba%28` digit boundary, and chaining through `#f9fafb`). The hybrid keeps that surface for 421 of 571 sites (74%). All three proposals refuse both.
- Computed defaults in the shipped build, Sass `color-contrast`, and the copied `$_luminance-list` (algebra).
- Context-keyed rows and consumer's tag compiles, both moot under a value key.
- Scale references, `$palette` forwarding, and the `styles.md` amendment (consumer).
- The `tuned` reading state (algebra).
- A digest gate on `theme.css` (ramp).

## 5. Open risks

The following risks stay open after the synthesis, each with the reading that settles it:

- **The oracle's key alignment.** The oracle case assumes that Bootstrap's own compile and the lifted sheet share selector and property keys for every mixed color. T0 reads the join and lists every unjoined row before T2 adopts the case.
- **A split the verdict's map needs.** If the policy requires two roles that share a Bootstrap value to diverge, the value key cannot express it. The function check fails at the writer, and the verdict rules on the map, not on the mechanism.
- **The clip against Chromium's paint.** 7 of 10 hue bases are out of sRGB as oklch (algebra § 2). The pixel probe of `bg-red-600` beside `.btn-danger` settles whether Chromium clips as the writer clips.
