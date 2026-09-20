<!-- Retained from test-paint-2-last.md (the exec's --output-last-message file). Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/test, journal test-paint-2.jsonl, thread 01a0c0e0-703a-7813-af36-724868193281, exit 0, 2026-09-20 18:28. Relative links in the body point at the unit's tmp/test-paint/ instruments in the Test checkout. -->

# Test-paint report 2

Implemented the corrected brief. Every required gate exits 0 on Windows with managed Chromium 153.0.8010.12. HEAD remains `ed9b102a4076d6fb9d70d8e9b726a22230e61976`. Work ran directly in this checkout without agents, installs, commits, builds, scaffold repair, tree-wide formatting, or lint fixes.

The effective brief is `test-paint-brief-2.md`, carrying `test-paint-brief.md` except for the corrected ring reading. This report supersedes the stopped baseline at `test-paint-report.md`.

**Diff per file.** The actual complete patch is [final.diff](../test-paint/final.diff).

- `src/browser/helpers.ts`: adds exported native-arithmetic conversion helpers; parses the required perceptual, RGB, and XYZ spaces with signed channels, percentage lightness, degree hues, scientific notation, and missing components; clips after conversion; refuses malformed or non-finite values. Background walks throw an error naming an unreadable painted layer and its computed value. Ring extraction recognizes modern color functions and returns contrast. Reader doc blocks state the conversions, clipping, and refusal behavior.
- `tests/src/browser/helpers.test.ts`: adds real-browser controls for every requested space, direct conversion proofs, calibrated contrast and ring cases, an out-of-gamut tint, parser boundaries, refusal propagation, transparent unreadable paint, occluded unreadable paint, and the background-image exclusion. Replaces the obsolete assertion that Lab is unsupported.
- `guides/test.md`: adds conversion surface rows, updates changed summaries, and documents supported spaces, clipping, unreadable layers, and the ring ratio.
- `src/browser/types.ts`: unchanged; the existing readonly `Color` contract suffices.
- `test-paint-report-2.md`: this report. Instruments and evidence remain under ignored `tmp/test-paint/`.

The conversion exports are `convertSRGB`, `convertLinearSRGB`, `convertXYZD65`, `convertXYZD50`, `convertOKLab`, `convertLab`, `convertDisplayP3`, `convertA98RGB`, `convertProPhotoRGB`, and `convertRec2020`. The existing browser barrel exports them without a barrel edit. The installed runtime dependency, `@orkestrel/contract`, supplies no matching color-conversion primitive.

**Chromium measurements.** The following declarations were mounted and read through `getComputedStyle` on 2026-09-20. The `color` and `background-color` serializations agreed. [computed.json](../test-paint/computed.json) also records each browser-produced sRGB control; [measure.mjs](../test-paint/measure.mjs) is the executed instrument.

| Declaration | Computed value |
| --- | --- |
| `oklch(0.208 0.042 265.755)` | `oklch(0.208 0.042 265.755)` |
| `oklab(60% -0.04 0.08 / 0.6)` | `oklab(0.6 -0.04 0.08 / 0.6)` |
| `lab(60% -10 20 / 0.6)` | `lab(60 -10 20 / 0.6)` |
| `lch(60% 30 260 / 0.6)` | `lch(60 30 260 / 0.6)` |
| `color(srgb 0.25 0.4 0.3 / 0.6)` | `color(srgb 0.25 0.4 0.3 / 0.6)` |
| `color(srgb-linear 0.25 0.4 0.3 / 0.6)` | `color(srgb-linear 0.25 0.4 0.3 / 0.6)` |
| `color(display-p3 0.25 0.4 0.3 / 0.6)` | `color(display-p3 0.25 0.4 0.3 / 0.6)` |
| `color(a98-rgb 0.25 0.4 0.3 / 0.6)` | `color(a98-rgb 0.25 0.4 0.3 / 0.6)` |
| `color(prophoto-rgb 0.25 0.4 0.3 / 0.6)` | `color(prophoto-rgb 0.25 0.4 0.3 / 0.6)` |
| `color(rec2020 0.25 0.4 0.3 / 0.6)` | `color(rec2020 0.25 0.4 0.3 / 0.6)` |
| `color(xyz 0.25 0.4 0.3 / 0.6)` | `color(xyz-d65 0.25 0.4 0.3 / 0.6)` |
| `color(xyz-d50 0.25 0.4 0.3 / 0.6)` | `color(xyz-d50 0.25 0.4 0.3 / 0.6)` |
| `color(xyz-d65 0.25 0.4 0.3 / 0.6)` | `color(xyz-d65 0.25 0.4 0.3 / 0.6)` |
| `hsl(210 30% 40%)` | `rgb(71, 102, 133)` |
| `hwb(210 20% 40%)` | `rgb(51, 102, 153)` |
| `light-dark(red, blue)` | `rgb(255, 0, 0)` |
| `rgb(from red r g b)` | `color(srgb 1 0 0)` |
| `oklch(none none none)` | `oklch(none none none)` |
| `color-mix(in srgb, oklch(0.7 0.4 30) 90%, white)` | `color(srgb 1.28764 -0.304819 -0.179053)` |
| `color(srgb calc(infinity) 0 0)` | `color(srgb calc(infinity) 0 0)` |
| `oklch(0.5 calc(infinity) 30)` | `oklch(0.5 calc(infinity) 30)` |
| `color(srgb calc(NaN) 0 0)` | `color(srgb 0 0 0)` |
| `contrast-color(red)` | `rgb(0, 0, 0)` |

Chromium rejected `device-cmyk(0 1 1 0)` and `color(--unread 0.2 0.3 0.4)` as declarations; neither provides a computed color space to implement. The measured legacy, relative, light/dark, and contrast-color forms resolve to supported RGB serializations.

**Red-then-green evidence.** The primary regression command was:

```text
npm.cmd run test:src:browser -- tests/src/browser/helpers.test.ts -t "modern paint readings"
```

Before the implementation, [red-final.log](../test-paint/red-final.log) reports `17 failed | 1 passed | 297 skipped (315)`. After the implementation, the same command exits 0 and [green-final.log](../test-paint/green-final.log) reports `18 passed | 310 skipped (328)`. The later suite population includes the direct conversion and boundary proofs.

The paired readings are recorded individually by the test names in those logs:

| Reading | Before | After |
| --- | --- | --- |
| OKLCH | Unreadable | Browser sRGB control agrees |
| OKLab | Unreadable | Browser sRGB control agrees |
| Lab | Unreadable | Browser sRGB control agrees |
| LCH | Unreadable | Browser sRGB control agrees |
| sRGB | Passed retained behavior | Passed |
| Linear sRGB | Unreadable | Browser sRGB control agrees |
| Display P3 | Unreadable | Browser sRGB control agrees |
| A98 RGB | Unreadable | Browser sRGB control agrees |
| ProPhoto RGB | Unreadable signed sRGB control | Browser sRGB control agrees |
| Rec. 2020 | Unreadable | Browser sRGB control agrees |
| XYZ alias | Unreadable | Browser sRGB control agrees |
| XYZ D50 | Unreadable signed sRGB control | Browser sRGB control agrees |
| XYZ D65 | Unreadable | Browser sRGB control agrees |
| Out-of-gamut mixed tint | Returned `undefined` | Returns `[255, 0, 0, 1]` |
| `oklch(0.208 0.042 265.755)` over white | Foreground refusal | Browser-derived contrast agrees |
| `oklch(0.929 0.013 255.508)` over `oklch(0.21 0.013 256)` | Foreground refusal | Browser-derived contrast agrees |
| Focused OKLCH box-shadow | Returned `undefined` | Browser-derived contrast agrees |
| Unreadable painted background | Silently skipped | Error names `div#unreadable-paint` and its computed color; backdrop, contrast, and ring readers propagate the refusal |

The direct exported-conversion cases compare translucent and signed inputs with mounted browser controls. They also check frozen results and black. Color comparisons use the existing `matchesColor` tolerance of 0.5 channel steps; contrast comparisons use `toBeCloseTo(..., 3)`.

The boundary command was:

```text
npm.cmd run test:src:browser -- tests/src/browser/helpers.test.ts -t "modern paint readings|paint parser boundaries|convert"
```

[boundary-red.log](../test-paint/boundary-red.log) reports `1 failed | 30 passed | 297 skipped (328)`: the parser accepted `rgb(1 / 2 3)`. After correcting slash placement, the same command exits 0; [narrow.log](../test-paint/narrow.log) reports `31 passed | 297 skipped (328)`.

**Required gates.** [gates.cmd](../test-paint/gates.cmd) runs the commands sequentially and stops on a nonzero exit. Its final execution exits 0. The final output lines are:

```text
npm.cmd run format:check — exit 0
All matched files use the correct format.
Finished in 1146ms on 60 files using 16 threads.

npm.cmd run lint:check — exit 0
npm notice run @orkestrel/test@0.0.18 lint:check
npm notice run oxlint --config .oxlintrc.json --deny-warnings .

npm.cmd run check — exit 0
npm notice run @orkestrel/test@0.0.18 check:src:server
npm notice run tsc --noEmit -p configs/src/tsconfig.server.json

npm.cmd run test:src:browser — exit 0
Test Files  2 passed (2)
Tests  380 passed | 2 expected fail (382)
Start at  18:23:54
Duration  28.36s (transform 0ms, setup 156ms, import 148ms, tests 26.95s, environment 0ms)

npm.cmd run test:guides — exit 0
Test Files  1 passed (1)
Tests  50 passed | 1 skipped (51)
Start at  18:24:23
Duration  1.24s (transform 110ms, setup 42ms, import 676ms, tests 375ms, environment 0ms)

npm.cmd run test:policy — exit 0
Test Files  1 passed (1)
Tests  109 passed | 1 skipped (110)
Start at  18:24:25
Duration  2.00s (transform 94ms, setup 41ms, import 251ms, tests 1.55s, environment 0ms)
```

The raw gate logs are `tmp/test-paint/format-check.log`, `lint-check.log`, `check.log`, `browser.log`, `guides.log`, and `policy.log`. No skip or expected-failure declaration was added. The initial lint run rejected an overprecise matrix literal; its representable replacement passes the rerun. [lint-red.log](../test-paint/lint-red.log) retains that diagnostic.

**Decisions and deviations.** No stopping deviation remains. The following ancillary decisions stayed within the brief's scope:

- Uses the [CSS Color 4 conversion matrices](https://www.w3.org/TR/css-color-4/#color-conversion-code), with Chromium's measured piecewise Rec. 2020 decoding. The referenced specification's sample decoder uses a different Rec. 2020 transfer curve; the browser-control contract determines this implementation.
- Deliberately leaves non-finite `calc(infinity)` color components unreadable. The mounted opaque control proves refusal without replacing browser behavior. Explicit zero alpha remains a skipped layer, and an opaque child ends the walk before unreadable ancestors.
- The initial ring fixture could not reach focus through Tab traversal in the targeted run. The final fixture uses the real element's `focus()` method and provider keyboard input, then asserts `:focus-visible` and the computed OKLCH shadow before measuring. The recorded regression red is the missing ratio, not the earlier traversal failure.
- Uses the brief-authorized browser regression workflow because `prove` is blocked. No receipt is claimed. No transport journal path or session id was supplied in the brief or identified in this checkout's `tmp/units` and `tmp/codex` inventory; this report claims no separate bench launch.

**Working tree.** The actual `git status --porcelain` output is:

```text
 M guides/test.md
 M src/browser/helpers.ts
 M tests/src/browser/helpers.test.ts
```

Git exits 0 and warns that `C:\Users\mikes/.config/git/ignore` is inaccessible. The report and instruments are under ignored `tmp/`, so ordinary porcelain output omits them. [final-status.txt](../test-paint/final-status.txt) preserves the output. `git diff --check` exits 0 with empty output. No off-limits file changed.