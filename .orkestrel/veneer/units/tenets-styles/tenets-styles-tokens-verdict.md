**X-TENETS-STYLES: tokens lens verdict (subjective lane, Opus 5.5)**

I held the subjective lane, limited to the tokens lens: CSS-variable tokens as a customization and testing contract, and motion outside the panels. I ran nothing. Every ruling rests on source, the compiled cascade, the sweep log and the guide.

**5. BROKEN.** Four declared tokens have no reader. These are outside the three E-ID-MOTION tokens that the claim names as in flight.
- **Evidence from the sweep:** `/home/user/scaffold/.orkestrel/veneer/units/tenets-styles/sweep-0865c67.log.txt` lines 19–25 list the tokens with no `var()` reader in the cascade.
- **No browser reader:** a grep of `/home/user/veneer-probe/src/browser` for `--vn-|TOKEN_NAMES` finds only `Placement.ts:166`, which is an unrelated anchor name.
- **`--vn-focus-reset`:** its only read is the default argument of the `focus-ring` mixin (`src/styles/_mixins.scss:363`). Every caller overrides that argument with `$reset: var(--vn-button-shadow)`:
  - `src/styles/components/_button.scss:109`
  - `src/styles/components/_button.scss:211`
  - `src/styles/elements/_button.scss:60`

  So the token is emitted (`_mixins.scss:466`) and never read. The guide row at `guides/veneer.md:7188` still calls it the "shadow reset for the shared focus mixin", which is drift.
- **`--vn-color-tertiary-subtle` and `--vn-color-tertiary-border`:** the tertiary role answers no alias (`veneer.md:6969`). No shipped rule and no guide sentence names a consumer for these tiers. The only tests touching them are value and presence gates, not readers:
  - `tests/src/styles/tokens.test.ts:53` checks registry equality.
  - `tests/src/styles/tokens.test.ts:70` checks that the reference-map value resolves.
  - `tests/setupStyles.ts:4246-4251` holds calibrated values.
- **`--vn-color-tertiary-rgb`:** the triplet contract (`veneer.md:6994`) is exercised only through primary (`tests/src/styles/integration.test.ts:27,63-75`). `tokens.test.ts:171` compares the triplet with its fill, which is a value gate.
- **Mutation named:** deleting any of the four declarations reddens only the registry and value gates. No resolved property of any shipped consumer moves, so no reader proof can exist.
- **Smallest correct fix:** remove `--vn-focus-reset` and give the mixin a literal `none` default. Either give the tertiary subtle, border, and rgb tokens a shipped reader with a proof, or record a consumer contract for them under § Semantic roles with an executed reader.

**6. BROKEN.** Several registry groups that § Tokens documents have no proof that overrides the token and reads a shipped consumer moving.
- **`link` (§ Links, `veneer.md:7071-7095`):** no test overrides `--vn-link-base`, `--vn-link-hover-base`, or `--vn-link-decoration`.
  - The grep `vn-link-(base|hover|decoration)` over `tests/**` returns no override.
  - `tests/src/styles/elements/a.test.ts` contains no `setProperty` and no `scene.load` call. It compares against recorded readings.
- **`form` (`veneer.md:7189-7190`):** `tests/src/styles/components/validation.test.ts:48-57` reads the `--bs-form-*` alias beside the paint and never overrides `--vn-form-valid` or `--vn-form-invalid`.
- **`button` (`veneer.md:7240-7246`):** no test overrides any `--vn-button-*` token.
- **`state`:** `--vn-state-hover`, `--vn-state-active`, and `--vn-state-mixer` are never overridden. Only the stripe token is, in `tests/src/styles/components/table.test.ts:207`.
- **`weight` and `ease`:** these are only read, never overridden (`tests/src/styles/components/input-group.test.ts:355`, `tests/src/styles/components/form-select.test.ts:418`).
- **Mutation named:** repoint the `.btn-link` `--bs-btn-color` or the `.valid-feedback` color to a literal equal to its resolved value. No token-override proof reddens, because none exists for those groups.
- **Smallest correct fix:** for each of these groups, add a case that overrides the token on an ancestor and reads a shipped consumer's resolved property move:
  - `--vn-link-base` on `a` and `.btn-link`
  - `--vn-form-invalid` on the `.is-invalid` border and `.invalid-feedback`
  - `--vn-state-hover` on the `.btn:hover` fill
  - `--vn-button-opacity` on `.btn:disabled`
  - `--vn-weight-heading` on `h2`
  - `--vn-ease-standard` on the `.btn` timing function

  Pair each case with a control reading an element outside the override.

**7. CONFIRMED.**
- **Source partition:** the compiled cascade's `transition:` declarations outside the collapse, modal, offcanvas, and carousel-slide panels fall into two groups.
  - These read `var(--vn-motion-feedback)`, which is `calc(150ms * var(--vn-factor-motion))`: the bare `button`, `.btn`, both form-control transitions, `.form-select`, the switch, the range thumbs, `.fade`, the carousel controls, and the icon-link icon.
  - These keep a literal equal to the release's recorded value, so the ledger carries no row for them: the form-floating label `.1s`, nav and pagination `.15s ease-in-out`, the navbar toggler, the accordion button `.15s` and chevron `.2s`, the progress bar `.6s`, and the carousel indicators `.6s`.
- **Reduced motion:** every one of these transitions is followed by its `transition:none` twin in the compiled cascade.
- **Mutation named:** write any one of them as a bare declaration outside the `transition` mixin. The reduced-motion reading at that site reddens, because each asserts `0s` or `none` after `stageMedia({ motion: false })`:
  - `nav.test.ts:495-496`
  - `pagination.test.ts:365-366`
  - `navbar.test.ts:522-523`
  - `accordion.test.ts:489-491` (button and `::after`)
  - `progress.test.ts:188-189`
  - `form-floating.test.ts:360-363`
  - `form-check.test.ts:488-491`
  - `icon-link.test.ts:148-149`
  - `form-select.test.ts:427-432`
  - `form-control.test.ts:375-377`
  - `fade.test.ts:105-119`
  - `carousel.test.ts:217-241`
  - `components/button.test.ts:480-481`
  - `elements/button.test.ts:172-173`
- **Distinguishes:** yes. Each of those tests reads the same element at rest first.

**Findings outside the claims**
- **F-STACK-ROW.** Breaks the tenet "Make CSS-variable tokens a supported customization and testing contract", which asks for clear representations of the tokens.
  - `guides/veneer.md:7193` and `:7195` are two rows for the same tokens (`--vn-stack-popover`, `-hint`, `-toast`) with conflicting Alias cells. One says `--bs-toast-zindex`; the other says `--bs-popover-zindex`, `--bs-tooltip-zindex`.
  - The `collectReferenceRows` reader and `tokens.test.ts:70` compare values only, so the duplicate passes.
  - Fix: merge them into one row whose Alias cell names `--bs-popover-zindex`, `--bs-tooltip-zindex`, and `--bs-toast-zindex`.
- **F-MOTION-SCOPE.** Breaks the same tenet: the guide must show what changing a token does to actual consumers.
  - § Factors (`veneer.md:6926-6929`) says the motion factor multiplies "the durations" and names no boundary.
  - `veneer.md:5930-5931` states that a transition written outside the motion tokens "would ignore the motion factor the package publishes".
  - The form-floating label (`.1s`) and the progress bar (`.6s`) do exactly that. Their sections never record it (`veneer.md:4242-4271`, `:5178-5180`).
  - Failing input: `:root { --vn-factor-motion: 0 }` leaves a `.form-floating > label` or a `.progress-bar` transitioning at `0.1s` or `0.6s`. The engine proofs, for example `tests/src/browser/Alert.test.ts:123`, use exactly that setting to stop motion.
  - Fix: state in § Factors which transitions the motion factor reaches, and name the families that keep the release's literals. Record the literal in § Form floating classes and § Progress classes, as § Nav classes does at `veneer.md:4748`.

**Attacked and held**
- **Coverage that does exist:** these groups do have shipped-consumer override proofs:
  - Factors, through the component suites (for example `alert.test.ts:107`, `card.test.ts:302`, `form-control.test.ts:364`).
  - Palette (`integration.test.ts:76-144`) and roles (`list-group.test.ts:373`, `form-check.test.ts:200`).
  - Stacking (`toast.test.ts:204`, `dropdown.test.ts:505`) and containers (`container.test.ts:100`).
  - Breakpoints: the alias moves while the media condition holds (`tokens.test.ts:240-281`).
- **Adjacent and looks the same, but correct:**
  - The factor proofs in `tokens.test.ts:346-507` and the recipe proof in `integration.test.ts:20-62` read test-authored inline consumers, not shipped classes. Each group they cover also has a shipped-consumer proof elsewhere.
  - The form-range thumb's reduced-motion proof reads declared longhands (`form-range.test.ts:205-234`), because Chromium does not expose the thumb part's computed style.
- **Adjacent unproved gap:** the bare `button` transition's token read has no motion-factor case. The ledger does not compare its value, because it is an addition by selector (`veneer.md:10102`). That rule is E-ID-BUTTON-CASCADE's in-flight subject.

VERDICT: FAIL 5, 6; outside the claims: F-STACK-ROW, F-MOTION-SCOPE
