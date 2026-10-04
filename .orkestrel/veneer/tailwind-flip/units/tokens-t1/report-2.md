# tokens-t1 — second report

**Not done. Stopped under the brief's palette-conversion deviation contract before changing any tracked file.** The ported Node conversion equals Chromium on **278/288** installed-theme palette rows; **10/288** differ. Sass 1.105.1 independently produces the same ten differing hexes. No commits were made.

## Finding per item

| Item | Finding | Counts and evidence |
| --- | --- | --- |
| 1. Switches and functions | Not done | Neither switch nor function was added. |
| 2. Generated edit | Not done | 0/571 color sites rewritten; per-file counts below. 0 scale sites rewritten. Tracer and compiled-line equality not run. |
| 3. Writer and records | Not done | Conversion prerequisite measured on 288/288 installed-theme rows; 278 equal, 10 unequal. No writer test or fixture was created; 0 token rows and 0 palette rows written. |
| 4. Empty configuration | Not done | Bootstrap and Tailwind configuration unchanged; the new declarations and forwarding rows are absent. |
| 5. Node cases | Not done | 0 cases added and 0 controls executed. Bootstrap amount oracle not run: joined/unjoined counts unmeasured in this unit. T0's 97 joined and 8 unjoined are historical evidence, not this unit's result. |
| 6. Guards and readers | Not done | 0 types, guards, readers, or guard proofs added. |

Both appended rulings were read. Launch HEAD is `77c65cf`; the tuned digest is the launch ruling's `b946eefe…`, not the earlier brief value. The ownership extension authorizes the generated reset and utility edits; it is no longer a blocker. The first report is preserved.

## Required stop: expected, found, evidence, hypothesis

**Expected:** V §10 M9 says: “Chromium's serialization is the oracle: the writer's Node conversion is accepted only when it equals the recorded Chromium reading on all 288 rows”. The brief requires: “Stop and report … when … the writer's conversion cannot equal Chromium's on some row (name the rows and the arithmetic)”.

**Found:** the installed `node_modules/tailwindcss/theme.css` contains exactly the raw values carried by all 288 M9 rows. The ported conversion still disagrees on these ten rows, including both hexes amended by V §3.1. The probe refuses the prerequisite logically; it does not substitute copied oracle hexes for computed values.

| Row | Installed raw value | Node computed | Sass computed | Chromium required |
| --- | --- | --- | --- | --- |
| --color-orange-200 | oklch(90.1% 0.076 70.697) | #ffd6a7 | #ffd6a7 | #ffd7a8 |
| --color-orange-600 | oklch(64.6% 0.222 41.116) | #f54900 | #f54900 | #f54a00 |
| --color-green-100 | oklch(96.2% 0.044 156.743) | #dcfce7 | #dcfce7 | #dbfce7 |
| --color-green-500 | oklch(72.3% 0.219 149.579) | #00c950 | #00c950 | #00c951 |
| --color-teal-300 | oklch(85.5% 0.138 181.071) | #46ecd5 | #46ecd5 | #46edd5 |
| --color-cyan-400 | oklch(78.9% 0.154 211.53) | #00d3f2 | #00d3f2 | #00d3f3 |
| --color-sky-900 | oklch(39.1% 0.09 240.876) | #024a70 | #024a70 | #024a71 |
| --color-blue-950 | oklch(28.2% 0.091 267.935) | #162456 | #162456 | #162556 |
| --color-fuchsia-400 | oklch(74% 0.238 322.16) | #ed6aff | #ed6aff | #ed6bff |
| --color-zinc-700 | oklch(37% 0.013 285.805) | #3f3f46 | #3f3f46 | #3f3f47 |

**Evidence:** `node tmp/units/tokens-t1/convert.ts` completed with exit 0 as a diagnostic that records mismatches, not an acceptance test. Its full numeric output is `tmp/units/tokens-t1/conversion.json`. It parses the installed theme, checks every raw value against M9, runs the ported arithmetic, and independently compiles `sass:color` conversions to sRGB. It also tests an older LMS-to-XYZ-to-sRGB matrix hypothesis; that alternative agrees on only **262/288**, so it was rejected. No attempt achieves the required 288/288.

**Arithmetic:** normalize the lightness percentage to L/100, set a = C × cos(h × pi/180) and b = C × sin(h × pi/180), then:

```text
l = (L + 0.3963377774*a + 0.2158037573*b)^3
m = (L - 0.1055613458*a - 0.0638541728*b)^3
s = (L - 0.0894841775*a - 1.2914855480*b)^3
r =  4.0767416621*l - 3.3077115913*m + 0.2309699292*s
g = -1.2684380046*l + 2.6097574011*m - 0.3413193965*s
b = -0.0041960863*l - 0.7034186147*m + 1.7076147010*s
encoded(x) = sign(x) * (12.92*abs(x), if abs(x) <= 0.0031308;
                       1.055*abs(x)^(1/2.4)-0.055, otherwise)
byte = round(255 * clamp(encoded(x), 0, 1))
```

The following pre-clamp channel values expose the rounding thresholds; the Chromium column is the supplied M9 serialization.

| Row | Node encoded RGB ×255 before clipping/rounding | Chromium serialization |
| --- | --- | --- |
| --color-orange-200 | 255.113928950, 214.484381478, 167.492502232 | color(srgb 1.00035 0.841206 0.65694) |
| --color-orange-600 | 244.979899238, 73.488638369, -39.367100469 | color(srgb 0.960701 0.288282 -0.154371) |
| --color-green-100 | 219.524309716, 251.993818547, 230.697749805 | color(srgb 0.860771 0.988274 0.904785) |
| --color-green-500 | -49.494924952, 200.724682041, 80.483548232 | color(srgb -0.194493 0.787239 0.315708) |
| --color-teal-300 | 70.283232004, 236.495467739, 212.543699330 | color(srgb 0.275288 0.927525 0.833603) |
| --color-cyan-400 | -66.149663266, 210.977286903, 242.495968912 | color(srgb -0.259729 0.827446 0.951096) |
| --color-sky-900 | 1.722105713, 74.019127689, 112.481884566 | color(srgb 0.00659131 0.290335 0.441195) |
| --color-blue-950 | 22.251958675, 36.498735977, 85.601470935 | color(srgb 0.0872622 0.143184 0.335752) |
| --color-fuchsia-400 | 237.134306480, 106.479432196, 257.133473569 | color(srgb 0.929943 0.417662 1.00844) |
| --color-zinc-700 | 62.853650509, 62.844002095, 70.498550155 | color(srgb 0.246475 0.24649 0.276522) |

For example, blue-950's computed green is 36.498735977, rounding to 36; Chromium's recorded 0.143184 ×255 is 36.51192, rounding to 37. Green-100's computed red rounds from 219.524309716 to 220; Chromium's 0.860771 ×255 is 219.496605, rounding to 219. This is not resolved by changing a final rounding tie rule.

**One hypothesis:** Chromium 141's conversion uses a different matrix or transfer approximation before byte rounding. A verified reproduction of that arithmetic is needed; Sass's conversion and the probe's arithmetic do not establish it. This report does not claim that an exact reproduction is impossible.

## Per-file generated edit

All rewritten counts are zero. The expected column is the governing T0 M4 census, not a new source census or a tracer result. Files with no T0 color sites are included so every component partial is accounted for.

| File | T0 color sites | Sites rewritten |
| --- | ---: | ---: |
| src/bootstrap/_reset.scss | 1 | 0 |
| src/bootstrap/_tokens.scss | 150 | 0 |
| src/bootstrap/_utilities.scss | 2 | 0 |
| src/bootstrap/components/_accordion.scss | 5 | 0 |
| src/bootstrap/components/_alert.scss | 0 | 0 |
| src/bootstrap/components/_badge.scss | 1 | 0 |
| src/bootstrap/components/_breadcrumb.scss | 0 | 0 |
| src/bootstrap/components/_button-group.scss | 0 | 0 |
| src/bootstrap/components/_buttons.scss | 213 | 0 |
| src/bootstrap/components/_card.scss | 0 | 0 |
| src/bootstrap/components/_carousel.scss | 10 | 0 |
| src/bootstrap/components/_clearfix.scss | 0 | 0 |
| src/bootstrap/components/_close.scss | 3 | 0 |
| src/bootstrap/components/_color-bg.scss | 8 | 0 |
| src/bootstrap/components/_colored-links.scss | 24 | 0 |
| src/bootstrap/components/_containers.scss | 0 | 0 |
| src/bootstrap/components/_dropdown.scss | 12 | 0 |
| src/bootstrap/components/_floating-labels.scss | 1 | 0 |
| src/bootstrap/components/_focus-ring.scss | 0 | 0 |
| src/bootstrap/components/_form-check.scss | 13 | 0 |
| src/bootstrap/components/_form-control.scss | 2 | 0 |
| src/bootstrap/components/_form-range.scss | 8 | 0 |
| src/bootstrap/components/_form-select.scss | 4 | 0 |
| src/bootstrap/components/_form-text.scss | 0 | 0 |
| src/bootstrap/components/_grid.scss | 0 | 0 |
| src/bootstrap/components/_icon-link.scss | 0 | 0 |
| src/bootstrap/components/_images.scss | 0 | 0 |
| src/bootstrap/components/_index.scss | 0 | 0 |
| src/bootstrap/components/_input-group.scss | 0 | 0 |
| src/bootstrap/components/_labels.scss | 0 | 0 |
| src/bootstrap/components/_list-group.scss | 3 | 0 |
| src/bootstrap/components/_modal.scss | 1 | 0 |
| src/bootstrap/components/_nav.scss | 3 | 0 |
| src/bootstrap/components/_navbar.scss | 10 | 0 |
| src/bootstrap/components/_offcanvas.scss | 1 | 0 |
| src/bootstrap/components/_pagination.scss | 4 | 0 |
| src/bootstrap/components/_placeholders.scss | 6 | 0 |
| src/bootstrap/components/_popover.scss | 0 | 0 |
| src/bootstrap/components/_position.scss | 0 | 0 |
| src/bootstrap/components/_progress.scss | 5 | 0 |
| src/bootstrap/components/_ratio.scss | 0 | 0 |
| src/bootstrap/components/_spinners.scss | 0 | 0 |
| src/bootstrap/components/_stacks.scss | 0 | 0 |
| src/bootstrap/components/_stretched-link.scss | 0 | 0 |
| src/bootstrap/components/_tables.scss | 72 | 0 |
| src/bootstrap/components/_text-truncation.scss | 0 | 0 |
| src/bootstrap/components/_toasts.scss | 0 | 0 |
| src/bootstrap/components/_tooltip.scss | 0 | 0 |
| src/bootstrap/components/_transitions.scss | 0 | 0 |
| src/bootstrap/components/_type.scss | 1 | 0 |
| src/bootstrap/components/_validation.scss | 8 | 0 |
| src/bootstrap/components/_visually-hidden.scss | 0 | 0 |
| src/bootstrap/components/_vr.scss | 0 | 0 |
| **Total** | **571** | **0** |

## Acceptance

The ordered acceptance sequence was not started: the mandatory stop occurred during the conversion prerequisite. No unrun check is represented as passing. The final digest and Git observations below are read-only stop evidence.

| Command or proof, in prescribed order | Exit | Result |
| --- | --- | --- |
| npm run check | — | Not run: required stop |
| npm run lint:check | — | Not run: required stop |
| npm run format:check | — | Not run: required stop |
| npm run build | — | Not run; dist was not rebuilt |
| sha256sum dist/src/bootstrap/index.css dist/src/tailwindcss/index.css | 0 | Both equal launch, observed after stop without a build |
| npm run test:setup | — | Not run: required stop |
| npm run test:conformance | — | Not run: required stop |
| npm run test:guides | — | Not run: required stop |
| Tracer compile and line-count equality on a copy | — | Not run; no generator edit exists |
| Writer twice; cmp both records | — | Not run; neither record exists from this unit |
| git diff --check | 0 | Clean |
| git status --porcelain | 0 | Empty |

`npm run format` was not run: there were no Sass edits to format.

## Digests before and after

| Sheet | Before | After stop |
| --- | --- | --- |
| dist/src/bootstrap/index.css | 7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f | 7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f |
| dist/src/tailwindcss/index.css | b946eefe63628fa64183e8a1518cffb0b145ea6ccd083c69105ae1f6fe900662 | b946eefe63628fa64183e8a1518cffb0b145ea6ccd083c69105ae1f6fe900662 |

## Case titles and controls

No case was added. All eight requested case groups remain outstanding:

| Required title or case | Outstanding controls |
| --- | --- |
| maps every lifted color literal through the token record or keeps it, in both directions | #123456; RGBA(18, 52, 86, var(--bs-link-opacity, 1)); kept white read as #fafafa; orphan row |
| reads the token record as a function of the lifted value | second #ced4da row |
| evaluates every token record row's origin over Bootstrap's bases and over the map's bases | tuned value off by two; shade-color(primary, 16%) |
| agrees every tuned amount row with Bootstrap's own Sass compiled from the map's bases within one channel unit | row shifted by two; normalized property joins and recorded unjoined set |
| resolves every palette row from the installed Tailwind theme as Chromium serializes it | blue-500 named with blue-600's value; changed hex digit |
| spells every swatch form and returns the Bootstrap literal under an empty palette | reversed channels; missing-key compile refusal |
| returns the literal under an empty scale and the row under a set scale, and refuses a missing role | missing role under a set scale |
| Bootstrap default digest case | one-row scratch palette changes digest |

## Deviations and unfinished V requirements

No alternate map, substituted oracle values, boundary extension, or implementation was adopted. These V requirements remain unfulfilled because the brief's stop rule took precedence:

- V §4: “`src/bootstrap/_mixins.scss` declares `$palette: () !default` and `$scale: () !default`.” The switches and both functions remain absent.
- V §8: “T1 mechanism: the switches `$palette` and `$scale`, the functions `swatch` and `measure`, the generated edit over the partials, the writer, `tokens.json`, `src/tailwindcss/_tokens.scss` configured.” None was implemented; their acceptance numbers are explicitly unmeasured above.
- V §6: “`tests/fixtures/tailwindcss/tokens.json`: the token record, one row per lifted value with its spellings, the Tailwind token, the resolved hex per color mode, and the origin; written by the writer.” No record was written.
- V §10 M9's all-288 equality sentence, quoted above, is the measured failure: 278 equal, 10 unequal.
- V §5's Node-case requirements, listed above with the brief's expanded titles and controls, remain unimplemented and unrun.
- The brief's guards, `palette.json`, formatting, and ordered acceptance requirements remain unperformed under its stop contract. The report path is `report-2.md` as the user's latest instruction requires, preserving `report.md`.

## Final Git status

`git status --porcelain` returned exit 0 and **no output**. `git diff --check` returned exit 0 and no output. Only ignored diagnostic/report files under `tmp/units/tokens-t1/` were written. No tracked files were changed and nothing was committed.
