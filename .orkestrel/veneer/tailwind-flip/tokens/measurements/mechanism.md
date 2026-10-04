# Mechanism: the palette switch against a text substitution

The Sass switch rewrites 571 color occurrences across 27 partials into calls on a 125-key `$palette` map. With the default map, both entries compile byte-identical to the untouched source: `src/bootstrap/index.scss` gives SHA-256 `ef7b5845…` and `src/tailwindcss/index.scss` gives `4142d6d4…`, before and after the rewrite. Each compile also equals its built sheet after the link-2 round trip. A tracer map shows that the switch reaches every one of the 571 occurrences in the compiled sheet and leaves no original color literal behind. Compile time rises by 0 to 12% warm, which is inside the run-to-run spread, and the source grows by 13239 bytes (5.8%).

A text substitution over `dist/src/bootstrap/index.css` reproduces the Sass output only in one form: a single pass that matches hex at hex-digit boundaries and matches triplets only in a color position. Every naive form collides. `#fff` is a prefix of `#fff3cd`, and `0, 0, 0` matches inside `clip: rect(0, 0, 0, 0)`. A digit boundary misses the 5 `rgba%28` escapes, and a sequential replace chains through Tailwind's `#f9fafb`, which is also a Bootstrap key.

`rewrite.ts` and `mechanism.ts` in `/home/user/veneer/tmp/probes/tokens` compute every figure in this file and in `mechanism.json`. They ran on 2026-10-04 with Sass 1.105.1 and Node v22.22.2, on veneer `473edd6`, whose `src`, `configs`, and `tests` trees equal `600f8a1`. The commands are `node tmp/probes/tokens/rewrite.ts`, then `WARM=40 node tmp/probes/tokens/mechanism.ts`. Two runs of `rewrite.ts` produce the same copy tree and the same `rewrite.json`. Nothing under `/home/user/veneer/src` changed: `git status --porcelain` is empty.

## Mechanism under test

`rewrite.ts` copies `src/bootstrap` and `src/tailwindcss` to `tmp/probes/tokens/sass-copy/` and keeps a second, pristine copy under `sass-copy/pristine/`. A lexer splits each partial into code, quoted strings (interpolation inside a string counts as code), and comments. The rewrite then makes the following changes:

- It adds `bootstrap/_palette.scss`. The module declares `$palette` with `!default`: 125 keys, each a normalized lowercase six-digit hex, and each default value the same color as a Sass color literal in Bootstrap's spelling. `#000` and `#fff` stay short, and every other key is six-digit. The module defines three functions. `palette($key)` returns the color and refuses an unknown key or a non-color value through `@error`. `palette-rgb($key)` returns the rounded sRGB channels as `R, G, B`. `palette-escape($key)` returns `%23` followed by the value's spelling after the hash.
- It prepends `@forward 'palette';` to `bootstrap/_mixins.scss`. Every partial that carries a literal already loads `mixins`, so no partial gains an `@use` rule.
- It gives `bootstrap/_tokens.scss` the line `$palette: null !default;` beside the five switches and passes `$palette: $palette` to its configured `mixins` use. A `null` configuration leaves the module default in place. Calls inside `_tokens.scss` read `mixins.palette(...)`, because that file loads `mixins` under its namespace.

Each literal form becomes the call in the following table. The table quotes rewritten lines from the copy:

| Source form                                         | Rewritten form                                                    |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| `--bs-blue: #{'#0d6efd'}`                           | `--bs-blue: #{'#{mixins.palette("#0d6efd")}'}`                    |
| `--bs-primary-rgb: #{'13, 110, 253'}`               | `--bs-primary-rgb: #{'#{mixins.palette-rgb("#0d6efd")}'}`         |
| `#{'rgba(13, 110, 253, 0.25)'}`                     | `#{'rgba(#{mixins.palette-rgb("#0d6efd")}, 0.25)'}`               |
| `border-color: #86b7fe;` (code)                     | `border-color: palette('#86b7fe');`                               |
| `-webkit-tap-highlight-color: rgba(0, 0, 0, 0);`    | `-webkit-tap-highlight-color: #{"rgba(#{palette-rgb('#000000')}, 0)"};` |
| `color RGBA(10, 88, 202, var(--bs-link-opacity, 1))` | `color RGBA(#{palette-rgb('#0a58ca')}, var(--bs-link-opacity, 1))` |
| `stroke='%23fff'` in a data URI                     | `stroke='#{palette-escape('#ffffff')}'`                           |
| `fill='rgba%280, 0, 0, 0.25%29'` in a data URI      | `fill='rgba%28#{palette-rgb('#000000')}, 0.25%29'`                |

Sass refuses a plain-context `rgba(#{...}, A)` with `$color: 13, 110, 253 is not a color`. The rewrite therefore wraps each of the 14 code-context `rgba()` calls whole in an interpolated string.

## Occurrences rewritten

The rewrite takes 571 occurrences in 7 forms. The following counts come from `rewrite.json`:

| Form                                     | Code | String | Total |
| ---------------------------------------- | ---: | -----: | ----: |
| Hex                                      |   32 |    392 |   424 |
| `-rgb` triplet (whole string)            |    0 |     45 |    45 |
| `rgba(R, G, B, A)`                       |   14 |     39 |    53 |
| `RGBA(R, G, B, var(...))` (uppercase)    |   24 |      0 |    24 |
| `%23` escape in a data URI               |    0 |     20 |    20 |
| `rgba%28R, G, B, A%29` in a data URI     |    0 |      5 |     5 |
| Total                                    |   70 |    501 |   571 |

The following table counts the occurrences per file and per form. The 29 Sass files absent from it carry no color literal:

| File                                        | Hex | Escape | `rgba` | `rgba%28` | `RGBA` | Triplet | Total |
| ------------------------------------------- | --: | -----: | -----: | --------: | -----: | ------: | ----: |
| `src/bootstrap/_reset.scss`                 |   0 |      0 |      1 |         0 |      0 |       0 |     1 |
| `src/bootstrap/_tokens.scss`                |  109 |     0 |     13 |         0 |      0 |      28 |   150 |
| `src/bootstrap/_utilities.scss`             |   0 |      0 |      2 |         0 |      0 |       0 |     2 |
| `components/_accordion.scss`                |   0 |      4 |      1 |         0 |      0 |       0 |     5 |
| `components/_badge.scss`                    |   1 |      0 |      0 |         0 |      0 |       0 |     1 |
| `components/_buttons.scss`                  | 178 |      0 |     18 |         0 |      0 |      17 |   213 |
| `components/_carousel.scss`                 |   8 |      2 |      0 |         0 |      0 |       0 |    10 |
| `components/_close.scss`                    |   1 |      1 |      1 |         0 |      0 |       0 |     3 |
| `components/_color-bg.scss`                 |   8 |      0 |      0 |         0 |      0 |       0 |     8 |
| `components/_colored-links.scss`            |   0 |      0 |      0 |         0 |     24 |       0 |    24 |
| `components/_dropdown.scss`                 |  11 |      0 |      1 |         0 |      0 |       0 |    12 |
| `components/_floating-labels.scss`          |   1 |      0 |      0 |         0 |      0 |       0 |     1 |
| `components/_form-check.scss`               |   5 |      5 |      1 |         2 |      0 |       0 |    13 |
| `components/_form-control.scss`             |   1 |      0 |      1 |         0 |      0 |       0 |     2 |
| `components/_form-range.scss`               |   6 |      0 |      2 |         0 |      0 |       0 |     8 |
| `components/_form-select.scss`              |   1 |      2 |      1 |         0 |      0 |       0 |     4 |
| `components/_list-group.scss`               |   3 |      0 |      0 |         0 |      0 |       0 |     3 |
| `components/_modal.scss`                    |   1 |      0 |      0 |         0 |      0 |       0 |     1 |
| `components/_nav.scss`                      |   2 |      0 |      1 |         0 |      0 |       0 |     3 |
| `components/_navbar.scss`                   |   3 |      0 |      4 |         3 |      0 |       0 |    10 |
| `components/_offcanvas.scss`                |   1 |      0 |      0 |         0 |      0 |       0 |     1 |
| `components/_pagination.scss`               |   3 |      0 |      1 |         0 |      0 |       0 |     4 |
| `components/_placeholders.scss`             |   4 |      0 |      2 |         0 |      0 |       0 |     6 |
| `components/_progress.scss`                 |   2 |      0 |      3 |         0 |      0 |       0 |     5 |
| `components/_tables.scss`                   |  72 |      0 |      0 |         0 |      0 |       0 |    72 |
| `components/_type.scss`                     |   1 |      0 |      0 |         0 |      0 |       0 |     1 |
| `components/_validation.scss`               |   2 |      6 |      0 |         0 |      0 |       0 |     8 |

The map carries 125 distinct keys. Hex or escape spellings name 117 of them. The other 8 occur only as triplets: the button focus shadows `#3184fd`, `#828a91`, `#3c996e`, `#0baccc`, `#d9a406`, `#e15361`, and `#1a1e21`, and the light link hover `#f9fafb`. No key has two source spellings. The heaviest keys are `#000000` with 93 occurrences, `#ffffff` with 86, `#0d6efd` with 42, `#212529` with 28, and `#dc3545` with 22.

### Reconciliation with the probe inventory

The rewrite count equals the inventory count after two corrections: 616 − 69 `transparent` + 24 uppercase `RGBA` = 571. Per file, the rewrite matches `inventory.json` minus its `transparent` rows in every file except `components/_colored-links.scss`. There the inventory reads 0 and the rewrite reads 24. Each `.link-VARIANT:hover` rule writes its color as uppercase `RGBA(R, G, B, var(...))` three times, which Sass leaves as plain CSS. The probe's color grammar misses that form. The 8 triplets are the link hover colors `10, 88, 202`, `86, 94, 100`, `20, 108, 67`, `61, 213, 243`, `255, 205, 57`, `176, 42, 55`, `249, 250, 251`, and `26, 30, 33`. The map must carry their keys, and the token proof must count them.

### Literals the rewrite leaves as written

The rewrite leaves the following text as written, and it finds no other color-shaped text in the partials:

- Two `%23fff` escapes sit inside `/*rtl:url(...)*/` comments within a declaration value in `components/_carousel.scss` at lines 122 and 126. Sass drops a comment inside a value, and `dist/src/bootstrap/index.css` carries 0 `rtl:url` comments, so the compiled sheet never contains these two.
- `clip: rect(0, 0, 0, 0)` appears in `components/_form-check.scss` at line 121 and in `components/_visually-hidden.scss` at line 13. It is not a color.
- `transparent` has 69 value occurrences and `currentcolor` has 8. Neither carries a palette value.

The partials contain no alpha hex (4 or 8 digits), no hex that is not a color, no color inside an SVG gradient, and no `hsl()`, `oklch()`, or `color-mix()` call. Every hex outside a string sits in a declaration value. A rewritten selector would have changed the compiled bytes, and they are identical.

## Byte identity of the default build

Under the default map, both entries compile to the same bytes before and after the rewrite. Each compile uses `compile(path, { style: 'expanded' })`, the call that `compileSass` in `tests/setupServer.ts` and the link-2 case in `tests/conformance.test.ts` make. The following table compares the outputs:

| Entry                        | Untouched source = pristine copy | Rewritten = pristine | SHA-256 (both)  | Round trip = built sheet |
| ---------------------------- | -------------------------------- | -------------------- | --------------- | ------------------------ |
| `bootstrap/index.scss`       | yes                              | yes                  | `ef7b5845…a109` | yes (`7932f7a5…`)        |
| `tailwindcss/index.scss`     | yes                              | yes                  | `4142d6d4…fc88` | yes (`22f33114…`)        |

The round trip is `roundTrip` from `tests/setupServer.ts`: a Sass CSS-syntax compile in compressed style, with comments removed. The Tailwind built sheet loses its `/*$vite$:1*/` marker first, as `tests/setup.test.ts` strips it. On each entry, appending `.planted { opacity: .5 }` to the rewritten compile makes the round trip differ from the built sheet.

## Reach of the switch

The tracer measurement maps each of the 125 keys to a unique sentinel (`#07XXf1`, with the triplet `7, XX, 241`). It compiles the rewritten Bootstrap entry under that map and counts the sentinels:

- The compiled sheet carries 571 sentinel occurrences: 424 hex, 20 escapes, and 127 triplets. That is one per source occurrence; no mixin multiplies a literal.
- Every key reaches at least one compiled occurrence.
- No original color literal survives in a color position, and the line count does not change.

A planted control then sets one key and keeps every other key at its default. `#0d6efd` maps to `#155dfc`, Tailwind blue-600 as resolved in `tailwind-theme.json`. The sheet then carries `#155dfc` 29 times and `21, 93, 252` 13 times, the tracer's counts for that key, with 0 of the original left. Swapping the two values back restores the pristine compile byte for byte. A map that lacks one key fails the compile with `The palette carries no key #0d6efd`.

The tuned face takes the map through its single configured use. In a third copy, `src/tailwindcss/_tokens.scss` adds `$palette: (tracer map)` to its `@use '../bootstrap/tokens' with (...)` rule. The tuned compile then carries 572 sentinel occurrences. The extra one is the reboot's `-webkit-tap-highlight-color: rgba(0, 0, 0, 0)`, which sits in `reset` and again as its curated copy in `bootstrap`.

### The `%23` escape inside `url()`

Interpolation inside the data URI keeps the `%23` escape intact in both shapes the partials use. 18 escapes sit in `#{"url(\"data:...\")"}` strings and 2 sit in bare `url("data:...")` values in `components/_carousel.scss`. Under the default map all 20 compile to the original bytes. Under the tracer map all 20 compile to `%2307XXf1` inside unchanged quotes. `palette-escape()` keeps the value's spelling, so the default `%23fff` stays short and a six-digit value gives `%23155dfc`.

A palette value in `oklch()` breaks the escape. Under `$palette: ('#0d6efd': oklch(54.6% 0.245 262.881))`, the three functions return different results:

- `palette()` returns `oklch(54.6% 0.245 262.881deg)` where Bootstrap writes hex.
- `palette-rgb()` returns `21, 93, 252`.
- `palette-escape()` returns `%23klch(54.6% 0.245 262.881deg)`.

The map must therefore carry resolved sRGB hex values, or `palette-escape()` must convert a value to hex first.

## Cost

The edit touches 29 files: the 27 rewritten partials, `_mixins.scss` (1 line), and the added `_palette.scss` (158 lines). `git diff --no-index --numstat` reads 725 lines added and 564 removed. The Bootstrap Sass grows from 227941 to 241180 bytes, 13239 bytes or 5.8%. `_tokens.scss` changes 150 of its 208 lines, and `components/_buttons.scss` changes 212 of its 389.

`mechanism.ts` times the compile in two ways. Warm runs make 40 interleaved compiles per side in one process and discard the first 3. Cold runs time the first compile in a fresh Node process, 5 times per side, without the module load. The following table gives the medians of the final run, in milliseconds:

| Entry                    | Warm pristine | Warm rewritten | Change          | Cold pristine | Cold rewritten | Change           |
| ------------------------ | ------------: | -------------: | --------------- | ------------: | -------------: | ---------------- |
| `bootstrap/index.scss`   |         232.4 |          255.6 | +23.2 (+10.0%)  |         643.1 |          708.2 | +65.1 (+10.1%)   |
| `tailwindcss/index.scss` |         315.0 |          339.8 | +24.8 (+7.9%)   |         781.3 |          901.5 | +120.2 (+15.4%)  |

The change is smaller than the noise. Two earlier runs on the same host read the Bootstrap warm median at +11.9% (12 compiles per side) and +2.4% (37 compiles per side), the Tailwind warm median at +4.9% and −0.9%, and the Bootstrap cold median at −5.8% and +8.3%. Within the final run, the pristine Bootstrap warm compile alone ranges from 207.1 to 344.4 ms.

## Text substitution over the built sheet

Each substitution variant applies the same 125 keys with the tracer values, in three forms: the hex spelling, the `%23` escape, and the triplet. Each runs over `dist/src/bootstrap/index.css` and over the pristine expanded compile. For every variant, both results agree after the round trip. Every variant hits all 424 hex and all 20 escapes; they differ only in triplet hits. The following table compares each variant's hits with the 571 occurrences the Sass switch reaches:

| Variant                                                     | Triplet hits | Total hits | Shared with Sass | Substitution only | Sass only | Equals the Sass output |
| ----------------------------------------------------------- | -----------: | ---------: | ---------------: | ----------------: | --------: | ---------------------- |
| Sequential `split`/`join`, keys in code-unit order          |          129 |        573 |              571 |                 2 |         0 | no                     |
| Sequential `split`/`join`, short spellings first            |          129 |        573 |              568 |                 5 |         3 | no                     |
| One regex pass, hex-digit and digit boundaries              |          124 |        568 |              566 |                 2 |         5 | no                     |
| One regex pass, boundaries plus a color position for triplets |        127 |        571 |              571 |                 0 |         0 | yes                    |

In the last variant, a triplet counts only after `rgba(`, `RGBA(`, `rgba%28`, or `-rgb: `, and only before `,`, `;`, `)`, or `%`. Its output equals the traced Sass compile byte for byte on the expanded compile, and after the round trip on the built sheet. Over the default tuned compile, the same pass equals the traced tuned compile byte for byte. The substitution therefore commutes with the withholding, moving, copying, restoring, and scoping the tuned build applies.

The other variants fail on the following collisions, each measured in the built sheet:

- **Hex prefix.** `#fff` (key `#ffffff`) is a prefix of `#fff3cd`, which occurs 3 times: `--bs-warning-bg-subtle`, `--bs-highlight-bg`, and `.table-warning`. A plain substring search finds `#fff` 64 times against 61 bounded hits. Run short spellings first, and it corrupts those 3 into `#XXXXXX3cd`. The code-unit order avoids the corruption only because `#fff3cd` sorts before `#ffffff`.
- **Triplet in an unrelated sequence.** `0, 0, 0` (key `#000000`) matches inside `clip: rect(0, 0, 0, 0)` twice, in `.btn-check` and in `.visually-hidden`, and rewrites a clip rectangle. Digit boundaries do not exclude it.
- **Escaped `rgba`.** A digit boundary before the triplet rejects the 5 `rgba%28R, G, B, A%29` forms, because `%28` ends in a digit. The data URIs in `.form-switch` and `.navbar-toggler-icon` keep Bootstrap's colors.
- **Chaining.** Three Tailwind theme colors equal a Bootstrap key: `#000000`, `#ffffff`, and `#f9fafb`. Tailwind gray-50 is `#f9fafb`, which is also Bootstrap's `.link-light:hover` color, `RGBA(249, 250, 251, …)`. Suppose a map sends `#f8f9fa` to gray-50 and `#f9fafb` elsewhere. A sequential replace in code-unit order rewrites `#f8f9fa` first and then rewrites its fresh `#f9fafb` output again, in the hex and the triplet forms alike. A single regex pass replaces each match one time and is immune.

No key's triplet is a substring of another key's triplet.

## Reading for question 4

Both mechanisms reach the same 571 occurrences when built correctly, and their outputs are byte-equal on both the lifted and the tuned sheet. The two mechanisms differ in the following respects:

- The Sass switch is the only form whose default the compiler proves byte-neutral. It is configured through `src/tailwindcss/_tokens.scss` like the five switches, and it refuses a missing key or a non-color value at compile time. It costs a 564-line generated edit, a 158-line module, and a compile time change inside the measured noise.
- The text substitution leaves the Sass untouched. Its correctness rests on the color-position rule for triplets and on a single pass, and three of the four variants measured here produce a wrong sheet without an error.
- A hybrid, Sass for the 150 literals of `_tokens.scss` and substitution for the 421 in the components, keeps the substitution's collision surface for 74% of the occurrences.
