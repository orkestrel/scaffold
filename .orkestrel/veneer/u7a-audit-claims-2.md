# U7a audit round 2 claims (the fix round)

Subject: the fix round of unit U7a in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`),
written by `sol` on Astra under `units/u7a-brief-7.md` to `-10.md` (retained under
`.orkestrel/veneer/units/`), reports `units/u7a-report-7.md` to `-10.md`, over the round-1 tree
(reports 5 and 6). Evidence rendered by the Orchestrator: `units/u7a-diff-2.patch.txt` (`git diff
2bc922d` plus `--no-index` renderings of the untracked files), round 1's `units/u7a-diff.patch.txt`
over the same base for comparison, and `tmp/audit/u7a-status-2.txt`. Rule on the diff and the
live files, never on the reports' word alone. Scope: implementation only, by the user's ruling —
no wording, comment, doc-block, or guide-prose findings. Claims marked `[mechanical]` are the
checker's; every other lane rules on every claim. An extra finding is an implementation defect
the fix round introduced, with a site and a one-line failure scenario, numbered from 12.

1. Round-1 finding 17 closed: `--vn-state-mixer`, `--vn-state-hover`, and `--vn-state-active` are
   declared inside `theme-tokens` from the mode maps and nowhere by hand; the token parity and
   mode cases pass.
2. Round-1 finding 19 closed: `focus-ring` takes `$highlight` and `$reset` parameters defaulting
   to `--vn-focus-highlight` and `--vn-focus-reset` (in `TOKEN_NAMES.focus`, the mode maps, and
   `theme-tokens`); the button callers pass the button tokens; the mixin reads no `--vn-button-*`
   name itself.
3. Round-1 finding 25 closed as refuted: the light mixer stays the calibration literal
   `color(srgb 0.00742457 0.0232852 0.0925134)`; the retuning case is gone; the eleven light-mode
   calibration cases pass (`units/u7a-report-7.md` records the eleven reds when the token was
   substituted).
4. Round-1 finding 20 closed: the disabled rule reads `var(--bs-btn-box-shadow)`; the
   compatible-override case (a 5px shadow set before disabling) reads `[0, 0, 0, 5]`.
5. Round-1 finding 21 closed: no bare `.btn:active` selector remains; an unchecked `.btn-check`'s
   adjacent label held active keeps its resting fill and no active shadow (the case names the
   label through its button role and reads `:active`); `PLANT-CHECK` reddened it with
   `rgb(102, 51, 153) 0px 0px 0px 5px` and was restored.
6. Round-1 finding 16 closed as narrowed: the `light` role's text is bound to
   `var(--vn-palette-black-base)` for filled rest, hover, active, and disabled and for outline
   hover and active; the guide's binding rows for `--bs-btn-color`, `--bs-btn-hover-color`,
   `--bs-btn-active-color`, and `--bs-btn-disabled-color` name the light override; the contrast
   cases assert the 4.5 floor for the `light` role in both modes and pin every other role's
   measured ratio per state and mode with `toBeCloseTo(…, 2)` (report 9's table); `PLANT-LIGHT`
   reddened the light cases at 1.054 and was restored; no `expect` sits under a condition.
7. Round-1 finding 18 closed: no `userEvent` and no `vitest/browser` import remains in the two
   Button test files; keyboard, hover, and click go through `pressKeys`, `hoverAccessible`, and
   `clickAccessible`; the suite passes with the same readings.
8. Round-1 finding 23 closed: the mixin proof establishes pointer history (click, blur,
   `focus()`), sends a guarded keystroke through `pressKeys`, then asserts `:focus-visible`; the
   case reddened without the keystroke and passes with it.
9. Round-1 finding 24 and analyst claim 9 closed: for each outline role and mode, the held
   `:active` paint (fill, border, text) and the focus-visible ring (colour, `[0, 0, 0, 3]`
   spread, suppressed outline) are read against `BUTTON_OUTLINE_CASES`; a temporary active-fill
   mutation reddened 34 cases and a focus-shadow mutation 18, both restored.
10. `[mechanical]` Scope and law: the status shows only brief 7's owned set; `src/browser/**`,
    `app/**`, `tests/setupConformance*.ts`, `tests/fixtures/**`, `package.json`, `configs/**`,
    `vite.config.ts` absent from the diff; no `any`, no assertion outside `as const`, no
    non-null assertion, no suppression, no skip; every added module-scope function exported and
    tested; every case matrix an exported frozen table in `tests/setupStyles.ts` listed in the
    export-inventory case; no case named for a control; no `PLANT` residue; the presence
    partition still exhaustive with the rows `shipped` and `listed = ['btn']`.
11. The gates exit 0 (`format:check`, `lint:check`, `check`, `test:src:core`, `test:setup` over
    `setupStyles.test.ts`, `test:src:styles` on Chromium and Edge, `test:conformance`,
    `test:guides`); the verifier lane re-runs the whole chain on the host and its reading rules
    this claim.
