# Test-paint audit claims

Subject: the Test-paint unit in the Test checkout (`C:/Users/mikes/WebstormProjects/test`),
written by `sol` on Astra under `units/test-paint-brief-2.md` (which carries
`units/test-paint-brief.md` except item 3's ring reading). Retained brief and report in the
scaffold checkout: `.orkestrel/veneer/units/test-paint-brief.md`,
`units/test-paint-brief-2.md`, `units/test-paint-report-2.md`. Evidence rendered by the
Orchestrator: `units/test-paint-diff.patch.txt` (`git diff ed9b102 -- . ':(exclude)tmp'` in the
Test checkout) and `tmp/audit/test-paint-status.txt` (`git status --porcelain`). Rule on the diff
and the live files, never on the report's word alone. A test is named for what it proves, never
for a control that specified it.

Every lane rules on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence
(file:line or exact text). A wording finding is a bound (the user's ruling: rounds focus on
implementation), recorded after the claims and numbered from 13, with its site; a finding that
forces a fix round says so and names the claim it breaks.

1. `parseColor` in `src/browser/helpers.ts` reads `oklch()`, `oklab()`, `lab()`, `lch()`, and
   `color()` for `srgb`, `srgb-linear`, `display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020`,
   `xyz`, `xyz-d50`, and `xyz-d65`, beside the `rgb()`/`rgba()` and `color(srgb …)` forms it read
   at `ed9b102`, with signed channels, percentage lightness, degree hues, scientific notation,
   and `none` components, and every other input still returns `undefined`.
2. Each conversion is exported under the `convert` prefix (`convertSRGB`, `convertLinearSRGB`,
   `convertXYZD65`, `convertXYZD50`, `convertOKLab`, `convertLab`, `convertDisplayP3`,
   `convertA98RGB`, `convertProPhotoRGB`, `convertRec2020`), reaches the browser barrel through
   the existing star export without a barrel edit, and each has a case in
   `tests/src/browser/helpers.test.ts` comparing its result with a browser sRGB control
   (`parseCSSColor` over a `color-mix()` or an equivalent mounted reading) within the
   `matchesColor` tolerance.
3. The conversions use the CSS Color 4 matrices (OKLab to linear sRGB, XYZ D65 to linear sRGB,
   the D50 to D65 adaptation for `lab`, `lch`, `xyz-d50`, and `prophoto-rgb`, the sRGB transfer)
   and clip each channel to 0–255 and alpha to 0–1 after conversion; no perceptual gamut mapping
   is performed and none is claimed.
4. `readLayers` throws an `Error` naming the element and its computed value when a painted
   background layer (a computed value the parser cannot read whose alpha is not explicitly zero)
   is met, and the refusal propagates through `readBackdrop`, `readContrast`, and `readRing`,
   each proven in `helpers.test.ts` over a mounted control the reader deliberately leaves unread.
5. A layer with an explicit zero alpha (`/ 0` or `/ none`) is skipped rather than refused, and
   an opaque layer ends the walk before a deeper unreadable ancestor is met; both are proven.
6. `readContrast` over `oklch(0.208 0.042 265.755)` on `rgb(255, 255, 255)` and over
   `oklch(0.929 0.013 255.508)` on `oklch(0.21 0.013 256)` returns the ratio the browser's own
   sRGB readings give, proven with `toBeCloseTo(…, 3)` against a browser-derived control.
7. `readRing` over a focused control whose ring is an `oklch()` `box-shadow` returns the contrast
   ratio that ring reaches against its backdrop, proven against a browser-derived control; the
   case reaches `:focus-visible` on the real element.
8. A `color-mix()` tint with an out-of-gamut channel reads and clips (the reported
   `[255, 0, 0, 1]` for `color-mix(in srgb, oklch(0.7 0.4 30) 90%, white)`), proven.
9. Every changed reader's doc block states what it reads, its clipping, and its refusal;
   `guides/test.md` § Surface rows for the ten conversions and the changed `parseColor` and
   `readLayers` summaries equal the doc-block description paragraphs (`npm run test:guides`
   green is the mechanical reading; the lane reads the rows against the blocks).
10. No dependency is added, `package.json` is untouched, `src/browser/types.ts` is untouched,
    and `git status --porcelain` shows only `guides/test.md`, `src/browser/helpers.ts`, and
    `tests/src/browser/helpers.test.ts`.
11. Every function in the diff conforms to the law: no `any`, no assertion, no non-null
    assertion, no nested function declaration outside the permitted callback forms, no hidden
    module-scope helper (every new module-scope function is exported and tested), `{verb}{Noun}`
    helper names, readonly returns, one concept one term, and no skip or expected-failure
    declaration added.
12. The red-then-green record holds: the targeted command
    `npm.cmd run test:src:browser -- tests/src/browser/helpers.test.ts -t "modern paint readings"`
    reported `17 failed | 1 passed` before and `18 passed` after; the boundary command reported
    one failure (`rgb(1 / 2 3)` accepted) before and green after; the gates in the report exit 0
    (the verifier lane re-runs `format:check`, `lint:check`, `check`, `test:src:browser`,
    `test:guides`, and `test:policy` on the host and its reading rules this claim).
