# AP-COLOR audit, round 1 — claims

Subject: the AP-COLOR change in `/home/user/veneer-apc` (branch `unit/apc`, uncommitted over Veneer `712ae72`), briefed
by `ap-color-brief.md` under the ruling `appearance-design-verdict.md`, and reported in `ap-color-report.md`. The owned
diff is `apc.diff`, the shared patch `apc-shared.patch`, the status `apc-status.txt`, and the logs, scripts, and probes
`apc-instruments/`, all under `/home/user/scaffold/.orkestrel/veneer/units/`. The worktree's compiled cascade is
`/home/user/veneer-apc/dist/src/styles/index.css`; the base cascade is `/home/user/veneer/dist/src/styles/index.css`
(built from the base's styles). The capture portfolio, when present, is
`/home/user/veneer-apc/tmp/capture/states/`. Each claim is falsifiable; rule every one.

1. **Scope and gates.** The status lists only the brief's owned and shared files. Each final gate log ends on exit 0 with
   the count the report states: `test:src:styles` 1447, `test:setup` 320, `test:conformance` 26, `test:guides` 20, and
   `format:check`, `lint:check`, and `check` clean.
2. **Population.** In the compiled cascade: `.text-primary` to `.text-danger` paint
   `rgb(from var(--bs-<role>-text-emphasis) r g b / var(--bs-text-opacity))`; `.text-light`, `.text-dark`, black, white,
   and body keep the channel form; `.link-<role>` outside `light` and `dark` paints the emphasis tier at rest and
   `color-mix(in srgb, var(--vn-text-emphasis-base) 20%, var(--vn-color-<role>-emphasis))` on hover and focus, each under
   its opacity variable; `.btn-outline-<role>` for every `$roles` member outside `light` and `dark`, `tertiary`
   included, sets `--bs-btn-color` and `--bs-btn-disabled-color` to the emphasis tier and keeps every border and state
   fill on the base; the `--vn-link-base` token reads `var(--vn-color-primary-emphasis)` in both modes; the light
   `--vn-form-valid` and `--vn-form-invalid` tokens read the success and danger emphasis tiers. No other emitted
   declaration differs from the base cascade except the ledger-recorded ones the diff names.
3. **One exclusion home.** `$neutrals` in `_tokens.scss` is the only source naming the roles that keep their channels;
   no changed walker names `light` or `dark` itself.
4. **Contrast proofs.** Each contrast proof reads `readContrast` against a scope painted with the mode's body
   background, in light and in dark, per role, at the bar 4.5, and covers `.text-<role>`, `.link-<role>` at rest and on
   hover, `.btn-outline-<role>` resting text with `tertiary`, the valid and invalid feedback, and a checked validation
   label. The tier-at-80-percent mutation and the danger-on-the-channel mutation each redden it, as their logs show.
5. **Identity and opacity.** A proof asserts `.text-<role>` equals `.text-<role>-emphasis` at the default opacity, and a
   proof asserts each `.text-opacity-*` step paints the tier's channels at that step's alpha; the bare `color-mix()`
   mutation reddens the opacity proof.
6. **Override contract.** The retune proof asserts that retuning `--vn-color-primary-base` at the theme-declaring scope
   moves `.text-primary` to the 70 percent oklab mix of the retuned color with `--vn-text-body-base`, that retuning
   `--vn-text-body-base` moves the partner, and that retuning `--vn-color-primary-rgb` alone leaves `.text-primary`
   unchanged while `.text-bg-primary` moves. Each assertion distinguishes `.text-primary` restored to the channel.
7. **Link hover.** A proof asserts each tier link's hover and focus color equals an independent sRGB 80 to 20 weighting of
   its resting tier and `--vn-text-emphasis-base`, and reads its contrast at or above both its resting contrast and
   4.5. The `.link-light` and `.link-dark` rules are byte-identical to the base cascade's.
8. **Triplets.** The dark `link-rgb` value `103, 191, 238` and `link-hover-rgb` value `156, 214, 244` are the sRGB
   renderings of the dark tier and its hover, and the unchanged triplet case in `tests/src/styles/tokens.test.ts` binds
   them: it read red on the source change before the triplets moved (`apc-after-source-styles.log.txt`).
9. **Validation.** A proof asserts the light and dark validated border, checked fill, and feedback read the role's
   tier, with a control asserting the tier differs from the fill; the light-valid-on-the-fill mutation reddens it.
10. **Baseline data.** `TEXT_COLOR_CASES` is unchanged; `TEXT_TIER_CASES` sits beside it; `tests/setupStyles.test.ts`
    asserts the tier and neutral split of `LINK_ROLES`, the tier keys inside `TEXT_COLOR_CASES`, and
    `BUTTON_TIER_ROLES` as the tier roles plus `tertiary`, frozen.
11. **Guide.** Every changed ledger row equals the conformance gate's reading; the departure sentence states that a
    channel retune leaves `.text-primary` unchanged and names the tokens that move it; the identity sentence states that
    a role class and its emphasis class paint one color at the default opacity; each is true against the code; the
    new prose states no count and uses no banned term.
12. **Law.** The diff adds no `any`, `as`, non-null assertion, suppression comment, nested function declaration,
    module-scope helper hidden in a test file, or helper duplicating an installed `@orkestrel/test` export; every new
    test is named for what it proves.
13. **Failing first.** The after-source log shows the reds the report names in seven files, 47 failed, and the final
    count exceeds the baseline's 1432 by the new tests the diff adds.

**Rendered surface.** The text-role, text-emphasis, text-opacity, link, outline-button, and validation frames in the
portfolio show role text legible on the page in each variant, the outline border on the fill and its label on the tier,
and no frame where a role's text blends into the canvas.
