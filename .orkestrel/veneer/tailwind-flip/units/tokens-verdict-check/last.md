1. Claim verification. Evidence uses the brief’s `V`, `R`, `MM`, `P`, and `TW` paths. JSON counts were recomputed with read-only Node commands.

| Claim | Verdict | Evidence |
|---|---|---|
| 1 | holds | `P/out/m1.json`: `rows.length = 223`; filtering `tuned < min(baseline, 4.5)` gives **37**: **34 separation, 1 judge, 2 prior**. Tertiary: **4.066830 → 3.940169**, split **4.492043**. Focus ring: **1.294518 → 1.233292**. Outline light: **1.054112 → 1.045026**. Recorded and independently recounted Node/Chromium disagreements at tolerance 0.001: **0**. |
| 2 | refuted | The 34 separation misses contain **33** readings ≥1.05; their minimum is **1.074529**. The sole miss is `light-bg-subtle-page-light`: **1.019043**, baseline **1.025309**. However, `max(baseline − tuned)` is **0.622409786**, exceeding 0.62: `warning-border-subtle-page-dark`, **3.565947801 − 2.943538015**. |
| 3 | holds | `P/out/m1.json`: independently filtering `split < floor` reproduces all **36** `splitBelow` rows. Comparing IDs with `below` removes only `tertiary-color-dark` and adds **0** rows. |
| 4 | holds | `controls.secondaryFill`: **1.162809093**, **1**, **1.134542732**. Independent WCAG luminance calculation for `#101828` against `#030712` gives **1.135** to three decimals. |
| 5 | holds | Filtering `rows` for non-separation groups, excluding the three named exceptions, finds **0** below-floor rows among **156** remaining pairings. |
| 6 | holds | `P/out/m2.json`: **3** recipe forms, each reporting **8119 original / 8119 compiled** declarations, equality true, and **0** differences. Recounted static emission: **409** variables. Consumer button radius: **12px**, versus **6px** alone; color remains `rgb(21, 93, 252)`. All **11** prefixed scale-reference readings equal the default readings. |
| 7 | holds | Source search finds unqualified `scale(0.85)` in [floating labels](/home/user/veneer/src/bootstrap/components/_floating-labels.scss:68), also at line 71. Searching both requested source trees finds **0** unqualified `measure(` or `swatch(` calls. To my knowledge, CSS defines neither `measure()` nor `swatch()`; that is a knowledge claim. V’s inconsistent naming is addressed in claim 16. |
| 8 | holds | `P/out/m4.json` records both exact claimed SHA-256 digests. Recounted `rows`: **571**; recorded tracer hits: **571**; missing keys: **0**; missing-key refusal: `"The palette carries no key #0d6efd"`. `MM:82` and its JSON reconciliation give **616 − 69 + 24 = 571**. The arithmetic closes. |
| 9 | holds | `P/out/m5.json`: **54** readings across **18** distinct widths; **25 + 25 = 50** fractional readings, **0** unmatched. At 1280, the tuned container is **1280px** and `.modal-xl` is **1140px**. Recounted departures: **5661**, across **17** names and **19** widths. [RELATION_WIDTHS](/home/user/veneer/tests/setup.ts:2020) contains **19** entries. |
| 10 | refuted | M6 records **1666** signature keys at each width; **2674 + 2672 = 5346** winner rows; **0** collisions and **0** mapping failures. The flip verdict records **1665** at line 158. The specified Git command returns only `ca2c90e Compact sticky showcase header with short face labels`. **The durations are absent from `m6.json`**: [durations.log](/home/user/veneer/tmp/probes/tokens2/durations.log:12), lines 12 and 25, records **33.248 s** and **34.794 s**, rounding to **33.2** and **34.8 s**. The numerical timings hold; their claimed JSON location does not. |
| 11 | holds | `P/out/m7.json`: **6** pairs. Subtracting their recorded pixel channels reproduces `[0, 0, 0]` for every pair. `profile` is `srgb`; `P/measure.ts:34` supplies `--force-color-profile=srgb`. |
| 12 | holds | `P/out/m8.json`: **105** rows; **97** joined; maximum absolute channel difference **1**; **0** exceed 1. All **8** unjoined rows have the stated prefixed property and hover/focus selectors. PostCSS inspection confirms adjacent unprefixed declarations for all eight in [the built sheet](/home/user/veneer/dist/src/bootstrap/index.css:6843), at lines **6844, 6857, 6870, 6883, 6896, 6909, 6922, 6935**. |
| 13 | refuted | M9 recount: **288** rows, **10** disagreements, including both claimed conversions. V:57 and V:60 contain the corrected hexes, and `tailwind-theme.json` retains both old hexes. However, **V:75 still contains `#dcfce7`** in the table-success background. `#162456` occurs **0** times in V; `#dcfce7` occurs **1** time. |
| 14 | holds | Extracted palette and scale names from V §3 and checked declarations in `TW`, including expanded breakpoint names. **No requested variable is missing.** The broader check, including comparison steps mentioned in explanations, checked **70** names with **0** missing. |
| 15 | refuted | Comparing **83** explicit bare-palette hex occurrences against M9 finds **1** mismatch: **V:75, table-success base background, `green-100`: `#dcfce7` → `#dbfce7`**. No other checked cell differs. |
| 16 | refuted | Exact `` `scale(` `` search: **0** hits. Exact `` `scale` `` search: **4** hits—V:96 rejects the name; V:106 adopts it for partials; V:162 adopts it for T1; V:179 describes the failed historical probe. V:104 additionally specifies `scale($role, $value)`, and V:105 specifies `mixins.scale(…)`. §§2 and 5 contain no conflicting function name; §4 does. |
| 17 | holds | `R:7–12` compared with `V:16–18,171`: all **6** decisions remain—consumer scale references subject to M2; pinned colors; containers equal breakpoints; optional dark-variant guide sentence; one law clause; no intervening release. Missing or altered defaults: **0**. |

2. Contradicted wording in V.

[V:97](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/design-verdict.md:97):

> **The separation floor** (settled by M1): an adjacent-surface pair (each bg-subtle and border-subtle against its page, each button hover against its base, each table state against its table) must stay distinct at a ratio of 1.05 or more, and the record carries Bootstrap's own ratio beside the tuned one; the floor is not Bootstrap's ratio, because Tailwind's 100 and 200 steps are lighter than Bootstrap's 80 % and 60 % tints and the adopted ramp lowers 33 of 34 measured separations by 0.001 to 0.62 while every one stays over 1.07.

Correction: all **34** below-floor separation rows decrease. Their drops range from **0.000248265** to **0.622409786**. **33** pass 1.05, with minimum **1.074529**; the remaining row reads **1.019043**.

[V:24](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/design-verdict.md:24):

> The following table is the adopted map; the hex columns are the writer's expected output and M1, M8, and M9 read them.

The table-success cell at V:75 still says:

> success `#dcfce7`, `#b0cab9`, `#d1efdb`, `#c6e3d0`, `#cce9d6`

Correction to its bare palette value: **`#dcfce7` → `#dbfce7`**. M1 and M8 used the earlier map, as detailed in item 3.

[V:104](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/design-verdict.md:104):

> `scale($role, $value)` returns `$value` when `$scale` is empty and refuses a missing role the same way.

Correction: **`measure($role, $value)`**.

[V:105](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/design-verdict.md:105):

> `src/bootstrap/_tokens.scss` declares both switches beside the five and passes them through its `@use 'mixins' with (...)`; its 150 literals become `#{mixins.swatch('…')}` inside the existing interpolation, and its radius, shadow, and font sites become `mixins.scale(…)` calls, which emit the `var(--TOKEN, LITERAL)` reference under the tuned configuration and the literal under the default.

Correction: **`mixins.measure(…)`**.

[V:106](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/design-verdict.md:106):

> The partials take `swatch` at the 571 color sites and `scale` at the grid-tied breakpoint, down-form, container, and type sites (51 `min-width` px conditions and 25 `.98px` `max-width` conditions); the 12 RFS conditions and the modal widths stay literal; identity rows (`#000`, `#fff`, and their alpha forms) go through `swatch` so the two-way case counts every site; `transparent` and `currentcolor` stay as written.

Correction to the function name: **`measure`**.

[V:162](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/design-verdict.md:162):

> **T1 mechanism**: the two switches, `swatch` and `scale`, the generated edit over the partials, the writer, `tokens.json`, `src/tailwindcss/_tokens.scss` configured.

Correction: the functions are **`swatch` and `measure`**; the switches are **`$palette` and `$scale`**.

Claim 10 contradicts the brief’s evidence location, not V’s timing figures: the log supports both rounded durations.

3. Measured statements lacking support as stated.

- **Measurements of the amended map — V:24,177.** `P/map.json` still maps `#031633` to `#162456` and `#d1e7dd` to `#dcfce7`. M1’s Chromium readings retain those old channels even under `split`. Consequently, V:56’s dark-primary ratio **8.15** and V:60’s light-success ratio **6.49** describe the earlier hexes. Recomputing WCAG contrast for the amended hexes gives **8.080737 → 8.08** and **6.483259 → 6.48**, respectively. No supplied browser output measures those amended pairings.
- **Universal text-floor statement — V:177:** “Every text pairing holds its floor under the context split” lacks support without its exceptions. Using claim 5’s non-separation population, **2** misses remain: focus ring **1.233292 < 1.294518** and outline-light label **1.045026 < 1.054112**.
- **Table minimum — V:75:** “lowest text 13.82” is unsupported for the listed table variants. M1’s `table-danger-active@red` reads **13.769333**, making the minimum **13.77**.
- **Adopted dark-body ratio — V:49:** “dark text 13.67” is measured for the unsplit map. M1’s adopted context-split reading is **16.262354 → 16.26**.