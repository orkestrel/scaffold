# Verify lane: flip measurement round

Every lane output reproduces under a re-run on this host. Chromium 141.0.7390.37 (from `browser.version()`), tailwindcss 4.3.3, and dart-sass 1.105.1 were used. The repository was at 4929856 with a clean working tree. Of the reported findings, 2 are refuted in part and the rest are confirmed. The adversarial read found three method weaknesses: an enumeration that includes 6 Chromium shorthands, a precision loss in the CSSOM-serialized sheets that the sheets lane did not report, and 3334 extended "preflight" labels that rest on no row for their tag.

Set sizes, read independently by `/home/user/veneer/tmp/probes/flip/verify/probe-sheets.ts` into `/home/user/veneer/tmp/probes/flip/verify/sheets-check.json`:
- shared ∩ utilities is 192.
- shared ∩ components is 17: caption-top, col-1 to col-12, col-auto, collapse, container, and table.
- comparison.json `.shared` holds 209 names.
- The categories hold 608 components, 8 composables, 144 modifiers, and 1265 utilities, for 2025 unique names.
- No name sits in 2 categories, and no registry node is anything but an object or a string.

## Re-run method

To keep the other lanes' files untouched, each probe was copied to `/home/user/veneer/tmp/probes/flip/verify/rerun/<lane>/`, and only its output-directory constant was rewritten. The m2 and m3 copies still read their input sheets from `/home/user/veneer/tmp/probes/flip/sheets/`. Each copy ran with `node` and `/home/user/.wave/npm11/node_modules/.bin` first on PATH, in the order each lane used. All 14 runs exited 0. The following table compares each output to the lane's own copy.

| Lane | Probes re-run | Output comparison |
| --- | --- | --- |
| sheets | probe.ts, probe-checks.ts, probe-mismatch.ts, probe-textdelete.ts | All 14 `.css` files and checks.json, measurements.json, mismatch.json, and textdelete.json are byte-identical. manifest.json is identical after the output path is normalized. |
| m1-cascade | probe.ts, render.ts | output.json is byte-identical. report.md is identical after path normalization. |
| m2-bare | probe.ts, analyze.ts | rows.json, readings.json, and analysis.json are byte-identical. report.md is identical after path normalization. |
| m3-components | probe.ts, analyze.ts, peek.ts, peek2.ts | departures.json, elements.json, declared.json, control-text.json, and analysis.json are byte-identical. All 5 `.md` files are identical after path normalization. run.json differs only in `elapsedSeconds` (70.505 against 73.348). probe.log is identical except for the elapsed-seconds column. |

Re-run outputs: `/home/user/veneer/tmp/probes/flip/verify/rerun/{sheets,m1-cascade,m2-bare,m3-components}/`.

## Code defects checked

The following table rules on each defect class the brief named. Checks: `/home/user/veneer/tmp/probes/flip/verify/probe-sheets.ts` → `/home/user/veneer/tmp/probes/flip/verify/sheets-check.json`, and `/home/user/veneer/tmp/probes/flip/verify/probe-m3.ts` → `/home/user/veneer/tmp/probes/flip/verify/m3-check.json`.

| Defect class | Ruling | Evidence |
| --- | --- | --- |
| Category flatten rebuilds names | Absent | sheets, m1, m2, and m3 probe.ts and m3 analyze.ts collect only string leaf values. The independent recursive walk gives the same sizes. |
| Shared set is not comparison.json's 209 | Absent | All 4 lanes read `comparison.json .shared` and assert 192 and 17. |
| CSSOM deletion matches loosely or misses nested rules | Absent | The match is exact: `selectorText === '.' + CSS.escape(NAME)`. The walk recurses into @layer, @media, @supports, CSSGroupingRule, and nested style rules. The independent walk finds 199 exact rules in bootstrap-lifted.css (192 top-level, 7 in @layer bootstrap) and 0 in @media. It finds 0 rules whose selector carries a shared-utility token without matching it exactly, so there are 0 loose survivors. 0 exact rules remain in any of the 4 minus-shared files. For each `.text.css` alternate, original minus exact equals the output with 0 differing rows. For each CSSOM file, the only differing rule is `.spinner-border`. `CSS.escape` changes none of the 192 names. |
| Reboot region split drops or duplicates a rule | Absent | The lifted reboot region is top-level indices 2-6. Against the reboot-reset `@layer reset` block, both hold 75 style rules and 289 declarations, with 0 multiset differences on (media, selector, property, value, priority) and the selector order identical. Lifted outside 2-6 and reboot-reset outside the reset block each equal bootstrap-without-reboot.css: 0 differences, with or without the layer context. The 2 `!important` reboot declarations, `[hidden]` and `[list]...::-webkit-calendar-picker-indicator` `display: none`, sit in the reset block. |
| Tailwind exclusion is not 1833 names, or the input is not three lines | Absent | tailwind-flipped.input.css has 3 lines: the order statement, `@import 'tailwindcss';`, and `@source not inline("…")`. The quoted list holds 1833 distinct names. It equals all 2025 names minus the 192 shared utilities and includes all 17 shared components. No name contains `{`, `,`, `}`, `"`, `\`, or whitespace, so brace expansion cannot fire. No excluded name appears as a class token in tailwind-flipped.css. |
| `<style>` order puts the Tailwind compile after a Bootstrap sheet | Absent | In m2 (B, C, D) and m3 (D, C, Dt, Ct), the Tailwind compile is the first `<style>`. m1 uses no Tailwind compile; its first `<style>` is the order statement. No sheet contains `</style`, which m3 does not escape. |
| Longhand enumeration reads shorthands | Present, small | All lanes iterate the indexed names, as the brief and tests/setupStyles.ts:467 do. In Chromium 141 that list holds 406 names, and 6 of them expand to several longhands under `style.setProperty(name, 'inherit')`: background-position (2), contain-intrinsic-size (2), font-variant (7), mask-position (2), text-decoration (4), and -webkit-mask-box-image (5). Of these, contain-intrinsic-size, font-variant, text-decoration, and -webkit-mask-box-image are also enumerated as their longhands; background-position-x and mask-position-x are not enumerated. m2 has 0 rows on the 6. m3 has 32 rows on `text-decoration`, which double-count `text-decoration-line`: 27 component-class C-vs-A, 3 bare, and 2 bootstrap-other. |
| 'preflight' label without a matching row or a D-against-C difference | Strict: absent. Extended: present | Strict m3 labels 21904 occurrences preflight. Of these, 17115 have a row whose `preflight` value equals C, 242 have a row whose `preflight` value differs from C, and 4547 have no row and only D≠C (1155 of them box fields). Extended attribution adds 3334 preflight labels, all from the rule-1 div fallback, on tags with no row of their own: figcaption 1821, li 1315, nav 189, and form 9. Rule 2 (logical to physical) adds 0. m3 discloses rule 1 as a deviation. |
| Reading taken before the sheets applied | Absent | Every probe reads after `page.setContent` (m3 passes `waitUntil: 'load'`). `getComputedStyle` and `getBoundingClientRect` force style and layout synchronously. Sheets are inline, with no external fetch. The byte-identical re-runs show no timing variance. |

The sheets lane's serialization check misses a second loss. probe-checks.ts compares the cssText of a parse against a reparse, and that comparison cannot see precision rounding, because both serialize to the same rounded text. The following counts are of numeric tokens with 5 or more decimals, read by `grep -oE '[0-9]*\.[0-9]{5,}'` under `/home/user/veneer/tmp/probes/flip/sheets/`. The lost tokens are the col-*, offset-*, and row-cols percentages, for example `.col-4 { width: 33.33333333% }` → `33.3333%`.

| File | Count |
| --- | --- |
| bootstrap-lifted.css | 109 |
| bootstrap-lifted-cssom.css | 13 |
| bootstrap-lifted-minus-shared.css | 13 |
| bootstrap-lifted-minus-shared.text.css | 109 |

## Rulings on lane findings

### sheets

Probe `/home/user/veneer/tmp/probes/flip/sheets/probe.ts` (and checks, mismatch, textdelete); outputs `/home/user/veneer/tmp/probes/flip/sheets/{measurements,checks,mismatch,textdelete,manifest}.json`; re-run `/home/user/veneer/tmp/probes/flip/verify/rerun/sheets/`.

| # | Finding | Ruling | Value read |
| --- | --- | --- | --- |
| 1 | Set sizes 192/17/0; 2025 names (608/8/144/1265); 1833 excluded | CONFIRMED | Same |
| 2 | Chromium 141.0.7390.37, tailwindcss 4.3.3, dart-sass 1.105.1 | CONFIRMED | Same; the default launch fails (`chromium_headless_shell-1243` missing) |
| 3 | lifted differs from a fresh compile only at line 13903 `}/*$vite$:1*/` | CONFIRMED | Same; sha256 7932f7a573bb…, 332388 bytes |
| 4 | Top-level/style rules 1880/2614, 1875/2539, 1876/2614, 1/75; reboot 75/75, 2 !important, no @charset | CONFIRMED | Same |
| 5 | Lifted region indices 2-6 (54 + 1 + 11 + 8 + 1 = 75), first `*, ::before, ::after`, last `[hidden]`; reset block at index 1 with 75 rules | CONFIRMED | Same; the multiset check also passes |
| 6 | Order statement is CSSOM rule 0 once; text line 1 is @charset in source files; CSSOM files start with the order statement | CONFIRMED | Same |
| 7 | 199 deletions, 7 names twice, 0 in @media, 7 in @layer bootstrap (`--bs-*-opacity: 1` halves) | CONFIRMED | Same; the 7 in-layer rules are the opacity halves of bg-black, bg-transparent, bg-white, border-black, border-white, text-black, and text-white |
| 8 | CSSOM serialization loses the .spinner-border border (23 → 7 longhands, 8088 → 8072) | CONFIRMED, incomplete | Same, and 96 of the 109 high-precision percentages are also rounded (see the preceding counts table) |
| 9 | Text alternates 322412 bytes (2777f05b…) and 321677 bytes (ce9c1463…) equal the original minus the deleted rules, 2422 = 2422 | CONFIRMED | Same; the independent multiset check shows 0 differing rows |
| 10 | No produced file contains `@source` | CONFIRMED | 0 in all |
| 11 | The P1 reproduction equals recipe.json `.unexcluded` | CONFIRMED | `reproducedUnexcludedMatches: true` |
| 12 | tailwind-flipped.css 19736 bytes, sha256 845ee32e…, 244/206/206; control 261/223; the exclusion removes exactly the 17 shared components | CONFIRMED | Same |
| 13 | The theme file is byte-identical; no `--color-primary` emitted | CONFIRMED | Same; the theme control without the exclusion also removes `border-primary` (20 names, not 19) |
| 14 | M5 emitted and absent lists | CONFIRMED | Same |
| 15 | Rule bodies (.mt-3, .border-1, .rounded, .shadow, .w-25, .h-100, .top-50, .z-1, .order-1, .text-start, .float-start; .collapse absent) | CONFIRMED | Same text, each an exact selector in `@layer utilities` |

### m1-cascade

Probe `/home/user/veneer/tmp/probes/flip/m1-cascade/probe.ts`; output `/home/user/veneer/tmp/probes/flip/m1-cascade/output.json`; re-run `/home/user/veneer/tmp/probes/flip/verify/rerun/m1-cascade/output.json` (byte-identical).

| # | Finding | Ruling | Value read |
| --- | --- | --- | --- |
| 1 | 141.0.7390.37; 213 readings, fresh setContent each, statement first | CONFIRMED | 213 |
| 2 | Class set sizes | CONFIRMED | 209/192/17; 608/8/144/1265 |
| 3 | a.1, a.2 = 16px | CONFIRMED | 16px, 16px |
| 4 | b.1-b.4 = 12px | CONFIRMED | 12px ×4 |
| 5 | b.5, b.6 = 4px | CONFIRMED | 4px, 4px |
| 6 | c revert-layer !important: 0px in 10 layers, 12px in compat, both positions | CONFIRMED | Same, all 22 |
| 7 | c revert-layer normal: 16px in all 22 | CONFIRMED | Same |
| 8 | c revert/unset/initial !important: 0px in all 66 | CONFIRMED | Same |
| 9 | c inherit !important: 7px and rgb(7, 7, 7); controls 16px and rgb(16, 16, 16) | CONFIRMED | Same |
| 10 | d: rli 0/4/4/4/12px; rln 16px ×5 | CONFIRMED | Same |
| 11 | d3 compat rli 4px; rln 16px ×5 | CONFIRMED | d3: 0/4/4/4/4px; rln 16px ×5 |
| 12 | d2 rli 0/4/4/4/12px; rln 12/12/12/4/12px | CONFIRMED | Same |
| 13 | e 20/16/12px, both orders | CONFIRMED | Same |
| 14 | f 0px (reset), 8px (bootstrap), user agent 21.44px | CONFIRMED | Same |
| 15 | g layered none ×2; unlayered flex then none | CONFIRMED | Same |
| 16 | 0 mismatches against expectations | CONFIRMED | 26 expectations, 0 mismatches |

### m2-bare

Probe `/home/user/veneer/tmp/probes/flip/m2-bare/probe.ts` with analyze.ts; outputs `/home/user/veneer/tmp/probes/flip/m2-bare/{rows,readings,analysis}.json`; check `/home/user/veneer/tmp/probes/flip/verify/probe-m2.ts` → `/home/user/veneer/tmp/probes/flip/verify/m2-check.json`.

| # | Finding | Ruling | Value read |
| --- | --- | --- | --- |
| 1 | 141.0.7390.37 through "default chromium.launch()", 1280x720, 406 longhands, 192/17 | REFUTED in part | The version, viewport, 406, and 192/17 hold. The default `chromium.launch()` throws on this host (`chromium_headless_shell-1243` missing), so probe.ts's catch branch launched `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. |
| 2 | Exposure ::after, ::backdrop, ::before on all 61; 244 subjects; same under B, C, and D | CONFIRMED | `exposureDiff` is {} |
| 3 | 2792 rows; B 2594, C 2792, D 2594, each across 61 elements | CONFIRMED | Same |
| 4 | B = D on every row; C = D among rows that both move | CONFIRMED | 0 and 0 |
| 5 | C-only 198 rows over 25 elements; D-only 0 | CONFIRMED | 198, 25, 0 (84 of the 198 are pseudo rows) |
| 6 | C-only per-longhand counts | CONFIRMED | font-size 36, line-height 36, font-weight 24, margin-block-end/bottom 17, font-family 16, padding-inline-start/left 4, and the rest as stated |
| 7 | Typography values h1-h5, h1-h6, p, and similar | CONFIRMED | For example h1 40/40/16/40px, h1 line-height 48→19.2px, p margin-bottom 16→0px; hr has 6 border-style longhands none→solid (bottom, left, right, and logical) |
| 8 | Code font, code/kbd/pre 14→16px, small 14→12.8px | CONFIRMED | Same |
| 9 | kbd, mark, ul/ol, caption, fieldset/iframe | CONFIRMED | kbd 3px/6px → 0px, ul 32px → 0px, caption height 16px → 0px, fieldset/iframe none→solid |
| 10 | a[href] rgb(13, 110, 253) → rgb(33, 37, 41) under C; underline → none | CONFIRMED | A/B/C/D: rgb(13, 110, 253) / same / rgb(33, 37, 41) / rgb(13, 110, 253) |
| 11 | Witnesses moving under C and D | CONFIRMED | img/svg inline→block; ul disc→none; button and input values as stated; html "Times New Roman" → Tailwind `--font-sans` stack, normal → 24px |
| 12 | Unchanged witnesses | CONFIRMED | body family, h6 16px, sup -6px, sub 3px, dt 700, button radius 0px, and the rest as stated |
| 13 | div[hidden] none ×4; div[hidden].d-flex flex/none/none/none | CONFIRMED | Same |
| 14 | Picker display inline-block, not exposed | CONFIRMED | `exposed: "false"` under all 4 conditions |
| 15 | Record agreement 2568/14/16; row-rule-color missing | CONFIRMED | Same |
| 16 | 14 differing record rows (UA form metrics) | CONFIRMED | Same values |
| 17 | 12 rows move under B with no record row | CONFIRMED | html font-family ×4, table border-*-color ×8 |
| 18 | row-rule-color not enumerated; 347 of 406 in no record row | CONFIRMED | Same |

### m3-components

Probe `/home/user/veneer/tmp/probes/flip/m3-components/probe.ts` with analyze.ts; outputs `/home/user/veneer/tmp/probes/flip/m3-components/{departures,elements,control-text,analysis,run,declared}.json`; checks `/home/user/veneer/tmp/probes/flip/verify/probe-m3.ts` and `/home/user/veneer/tmp/probes/flip/verify/probe-m3b.ts` → `/home/user/veneer/tmp/probes/flip/verify/m3-check.json` and `/home/user/veneer/tmp/probes/flip/verify/m3-check-b.json`.

| # | Finding | Ruling | Value read |
| --- | --- | --- | --- |
| 1 | 141.0.7390.37; the default launch failed | CONFIRMED | Same |
| 2 | 209/192/17; all 192 have an exact rule; 206 tokens, 14 outside the shared set | CONFIRMED | Same 14 names; independent CSSOM token read gives 206 |
| 3 | 61 docs (55 + 6), 4882 elements, 406 longhands; labels 3197/530/573/582 | CONFIRMED | Same |
| 4 | D-vs-A 33985/7638/5781/4095 = 51499; C-vs-A 36598/8397/7289/6932 = 59216; 59241 rows; D≠C 4568/943/1988/2985 | CONFIRMED | Same |
| 5 | tab-size 8→4 on all 4882 elements; border-style none→solid on up to 3438 | CONFIRMED | tab-size 4882 under D and C; left 3438, right 3431, bottom 3376, top 3152 |
| 6 | Top visible values 357, 355, 314, 245, 199, 199, 174 | CONFIRMED | Same |
| 7 | 36598 occurrences, 11743 rows, 2943 tab-size/border-style; strict 21904/1643/2712/2/10337; extended 25238/4836/4210/2/2312 | CONFIRMED | Same. The extended preflight surplus of 3334 is entirely the div fallback, as the defect table shows. |
| 8 | Extended-unknown remainders 311 ×5, box y 138, ::marker tab-size 115 | CONFIRMED | Same, in analysis.json `unknownByProp` |
| 9 | card-body gap 225 each; card-footer figcaption 107; modal-title 35; offcanvas-title 29 each; list-group-item 25; offcanvas-header 25; ratio 18 each | CONFIRMED | Same; 225 = card-body rows grouped by the component classes carried (122 + 94 + 9 across class strings) |
| 10 | 4474 functional rows; 7 display rows; box >1px y 2083, height 1233, width 668, x 483 | CONFIRMED | Same |
| 11 | Top 5 fragments 3963 (2038), 2892 (1616), 2318 (1228), 1297, 1244; fewest 103, 127, 132 | CONFIRMED | Same |
| 12 | Census 1482 of 4005, 74 names, 118 of 192 on no element | CONFIRMED | Same; also 118 across both viewports |
| 13 | 171 control readings, all in departures.json; spinner-border border widths 3px under A; visually-hidden 54 rows; .col-4 33.3333% against 33.33333333%; 254.984px against 255px | REFUTED in part | 171, all 171 in departures (spinners 134, placeholders 17, offcanvas 20). visually-hidden accounts for 54 rows, the col-4 text is as stated, and `placeholder col-10` reads 254.984px against 255px. Under A, the 8 `.spinner-border` elements read border-top-width 4px and only the 2 `.spinner-border-sm` elements read 3px; all 10 read 0px under D and C. |

## Skeptic objections

These are the three strongest objections to using these measurements as the basis of the design.

1. **One engine, and the load-bearing `revert-layer` readings have no cross-check.** Supporting evidence:
   - Every reading comes from Chromium 141.0.7390.37, launched from `/opt/pw-browsers/chromium-1194`, while the installed Playwright expects `chromium_headless_shell-1243`.
   - The preflight record was measured on Chromium 153, and m2 finds 14 record rows that differ from it (UA form-control metrics: input width 189px against 208px, select height 25px against 23px).
   - m1 reads `revert-layer !important` as 0px in all 10 statement layers and 12px only in `compat`. In d3 it lands on the 4px reset value and skips the unlayered Bootstrap 16px `!important`. m1 lists cross-engine behavior as unknown. No second engine is installed under `/opt/pw-browsers`.

   Weakening evidence: the a, b, e, f, and g cascade readings are the ordinary layer and importance ordering, and all 26 expected values match.
2. **The C and D sheets are probe constructions that carry serialization artifacts.** Supporting evidence:
   - The CSSOM-serialized minus-shared files drop the `.spinner-border` border (23 → 7 declared longhands; 8088 → 8072 sheet-wide).
   - They round 96 of the 109 high-precision percentages, for example `.col-4 { width: 33.3333% }`.
   - m3's departures.json carries 171 readings that exist only because of this (134 in spinners.html, 17 in placeholders.html, 20 in offcanvas.html), for example a spinner border-top-width of 4px → 0px.

   Weakening evidence: the `.text.css` alternates reproduce the original parse minus the 199 rules with 0 differing rows, and m3's Dt and Ct controls isolate all 171 readings, which are 171 of 59241 rows.
3. **Departure counts overstate visible change, and attribution is weakly grounded.** Supporting evidence:
   - Invisible changes dominate the counts. tab-size 8→4 moves on all 4882 elements, border-*-style none→solid moves on up to 3438 elements with 0 width, and 2943 of the 11743 distinct curation rows are those two kinds. `text-decoration` double-counts `text-decoration-line` in 32 rows.
   - Strict "preflight" rests on a row existing for the tag and longhand, not on a value match: 242 occurrences have a row whose value differs from C, and 4547 rest only on D≠C, which cannot separate the Tailwind preflight from the reboot's move into `reset`.
   - Extended attribution adds 3334 preflight labels on figcaption, li, nav, and form, none of which has a row of its own.
   - 10337 strict and 2312 extended occurrences stay unknown.
   - The fragments exercise 74 of the 192 shared utilities; 118 appear on no element.

   Weakening evidence: the functional reading on component-class elements is narrow. It finds 0 departures in visibility, opacity, pointer-events, position, overflow, or z-index, and 7 display rows (svg.bi and img inline→block from the preflight, and 1 Tailwind `grid`). m2's bare-element rows, which do not depend on attribution, give the exact reboot loss under C: 198 C-only rows on 25 elements.

## Host

`git -C /home/user/veneer status --porcelain` printed no line after all runs; tmp/ is gitignored. `npm run build` was not run, because dist/src/bootstrap/index.css exists.
